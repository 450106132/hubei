/**
 * Created by Administrator on 2017/3/9.
 */
// var cdsNums = 0;
// var windPos = [];
// var windObj = [];
// var roundnumImgObj;
var actionZindex = 1000;
var btnOff_x = 0;
//向服务器发送 过消息
// MjClient.MJPass2NetForleiyang = function(){
//     cc.log("====================send======pass=====");
//     var sData = MjClient.data.sData;
//     var tData = sData.tData;
//
//     if(IsTurnToMe() && tData.tState == TableState.waitPut){
//         var eat = MjClient.playui.jsBind.eat;
//         eat.hu._node.visible = false;
//         eat.guo._node.visible = false;
//         eat.cancel._node.visible = false;
//     }else{
//         HZPassConfirmToServer_leiyang();
//     }
// };

// 这个没看懂干嘛的
// off 是四个位置，根据off 显示四个位置的信息 by sking
function SetUserVisible_LiuHuQiang(node, off){
    var pl = getUIPlayer_leiyang(off);
    cc.log("====================off======================" + off);
    var head = node.getChildByName("head");
    var name = head.getChildByName("name");
    var nobody = head.getChildByName("nobody");
    var coin = head.getChildByName("coin");
    var offline = head.getChildByName("offline");
    var name_bg = head.getChildByName("name_bg");
    var score_bg = head.getChildByName("score_bg");
    var huxi = head.getChildByName("huxi");
    if(pl){
        name.visible = true;
        coin.visible = true;
        offline.visible = true;
        nobody.visible = true;
        name_bg.visible = false;
        score_bg.visible = false;
        MjClient.loadWxHead(pl.info.uid, pl.info.headimgurl);
        setUserOffline_leiyang(node, off);
        // InitUserHandUI_LiuHuQiang(node, off);
        // cc.log("pl.info.uid = "+pl.info.uid);
    }else{
        name.visible = false;
        coin.visible = false;
        offline.visible = false;
        huxi.visible = false;
        nobody.visible = false;
        var WxHead = nobody.getChildByName("WxHead");
        if(WxHead){
            WxHead.removeFromParent(true);
        }
    }
}

//设置玩家牌桌上的信息(只有自己才设置手牌，其他玩家不需要设置)
function InitUserHandUI_LiuHuQiang(node, off){
    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer_leiyang(off);

    if(!pl){
        return;
    }

    //初

    setAreaTypeInfo(true);

    if (pl.jiazhuNum == 2 && MjClient.rePlayVideo == -1)
    {
        if (SelfUid() == pl.info.uid) {
            var layer = new laZhangLayer();
            MjClient.playui.addChild(layer, 99);
            if (MjClient.webViewLayer != null) {
                MjClient.webViewLayer.close();
            }
        }
        else
        {
            MjClient.playui._jiazhuWait.visible = true;
        }
    }else if(pl.jiazhuNum == 1){
        MjClient.majiang.setJiaZhuNum(node, getUIPlayer_leiyang(off));
    }

    if (MjClient.rePlayVideo != -1) {
         MjClient.playui._jiazhuWait.visible = false;
    }

    if(tData.tState != TableState.waitPut && tData.tState != TableState.waitEat && tData.tState != TableState.waitCard && tData.tState != TableState.waitJiazhu){
        return;
    }

    //添加手牌
    if(MjClient.rePlayVideo == -1){
        //表示正常游戏
        if(pl.mjhand && off == 0){
            cc.log("pl.mjhand====:" + pl.mjhand);
            MjClient.HandCardArr = MjClient.majiang.sortHandCardSpecial(pl.mjhand);
        }
    }else{
        /*
            播放录像
         */
        cc.log("_________________mjhand_replay_______________"+JSON.stringify(pl.mjhand));
        if (pl.mjhand){
            if(off == 0){
                MjClient.HandCardArr = MjClient.majiang.sortHandCardSpecial(pl.mjhand);
            }else{
                if(!MjClient.OtherHandArr){
                    MjClient.OtherHandArr = {};
                }
                if(!MjClient.OtherHandArr[off]){
                    MjClient.OtherHandArr[off] = MjClient.majiang.sortHandCardSpecial(pl.mjhand);
                }
            }
        }

    }
    MjClient.playui.CardLayoutRestore(node,off);
}

var getRightNodeOff_ER = function(){
    var tData = MjClient.data.sData.tData;
    var off = 1;
    if(tData.maxPlayer == 2){
        off = 1;
    }else{
        off = tData.maxPlayer - 2;
    }
    return off;
}

var PlayLayer_LiuHuQiang = cc.Layer.extend({
    jsBind: {
        _event: {
            startShuffleCards:function (d) {
                checkCanShowDistance();
            },
            mjhand: function() {
                if(MjClient.endoneui != null)
                {
                    cc.log("=======mjhand====endoneui====" + typeof (MjClient.endoneui) );
                    MjClient.endoneui.removeFromParent(true);
                    MjClient.endoneui = null;
                }
                MjClient.hasPut = false;
                var sData = MjClient.data.sData;
                var tData = sData.tData;
                if (tData.roundNum != tData.roundAll) return;
                
                // var pls = sData.players;
                // var ip2pl = {};
                // for (var uid in pls) {
                //     var pi = pls[uid];
                //     var ip = pi.info.remoteIP;
                //     if (ip) {
                //         if (!ip2pl[ip]) ip2pl[ip] = [];
                //         ip2pl[ip].push(unescape(pi.info.nickname));
                //     }
                // }
                // var ipmsg = [];
                // for (var ip in ip2pl) {
                //     var ips = ip2pl[ip];
                //     if (ips.length > 1) {
                //         ipmsg.push("玩家:" + ips.join("，") + "为同一IP地址。")
                //     }
                // }
                // if (ipmsg.length > 0) {
                //     AlertSameIP(ipmsg.join("\n"));
                // }
                // mylog("ipmsg " + ipmsg.length);

                //距离位置显示
                checkCanShowDistance();

            },
            LeaveGame: function() {
                if (this._delayExeAction && cc.sys.isObjectValid(this._delayExeAction)){
                    this.stopAction(this._delayExeAction);
                    delete this._delayExeAction;
                }
                MjClient.addHomeView();
                MjClient.playui.removeFromParent(true);
                stopEffect(playTimeUpEff);
                playTimeUpEff = null;
                delete MjClient.playui;
                delete MjClient.endoneui;
                delete MjClient.endallui;
                cc.audioEngine.stopAllEffects();
                playMusic("bgMain");
            },
            endRoom: function(msg) {
                mylog(JSON.stringify(msg));
                if (msg.showEnd){
                    this.addChild(new GameOverLayer_paohuzi(),500);
                }else{
                    MjClient.Scene.addChild(new StopRoomView());
                }    
            },
            roundEnd: function() {
                var self = this;

                var sData = MjClient.data.sData;
                var tData = sData.tData;
                var time = 0.2;
                if(!MjClient.isDismiss && tData.hunCard && tData.hunCard != -1 && tData.areaSelectMode.xingType!=0){
                    time = 1.8;
                    var actionType = tData.areaSelectMode.xingType == 1 ? ActionType_paohuzi.GENXING : ActionType_paohuzi.FANXING;
                    var hunCard = tData.hunCard;
                    // if(!tData.areaSelectMode.isGenXing){
                    //     hunCard = sData.cards[tData.cardNext] ? sData.cards[tData.cardNext] : tData.lastPutCard;
                    // }
                    ShowEatActionAnim_leiyang(MjClient.playui._downNode, actionType, 0);
                    DealFanXingNewCard_leiyang(hunCard);
                }

                function delayExe(){
                    var sData = MjClient.data.sData;
                    resetEatActionAnim_leiyang();
                    if (sData.tData.roundNum <= 0){
                        var layer = new GameOverLayer_paohuzi();
                        layer.setVisible(false);
                        self.addChild(layer,500);
                    }
                    if(!MjClient.endoneui){
                        self.addChild(new EndOneView_zplychz(),500);
                    }

                    var putNode = MjClient.playui._downNode.getChildByName("xingPai");
                    putNode.removeAllChildren();
                    putNode.setVisible(false);
                }
                this._delayExeAction = this.runAction(cc.sequence(cc.delayTime(time),cc.callFunc(delayExe)));
            },
            moveHead: function() {
                postEvent("returnPlayerLayer");
                //tableStartHeadMoveAction_leiyang(this);   //不涉及到头像移动动作
            },
            initSceneData: function() {
                if (this._delayExeAction && cc.sys.isObjectValid(this._delayExeAction)){
                    this.stopAction(this._delayExeAction);
                    delete this._delayExeAction;
                }
                reConectHeadLayout_leiyang(this);        //不涉及到头像移动动作
                CheckRoomUiDelete();
                tableStartHeadMoveAction_leiyang(this);   //不涉及到头像移动动作

                //距离位置显示
                checkCanShowDistance();
            },
            MJChat : function(data){
                if(data.type == 4){
                    //距离位置显示
                    checkCanShowDistance();
                }
            }, 
            addPlayer:function () {
                tableStartHeadMoveAction_leiyang(this);   //不涉及到头像移动动作
            },
            removePlayer: function(eD) {
                //距离位置显示
                checkCanShowDistance();
            },
            onlinePlayer: function() {
                reConectHeadLayout_leiyang(this);        //不涉及到头像移动动作
            },
            logout: function() {
                if (MjClient.playui) {
                    MjClient.addHomeView();
                    MjClient.playui.removeFromParent(true);
                    delete MjClient.playui;
                    delete MjClient.endoneui;
                    delete MjClient.endallui;
                }
            },
            DelRoom: function() {
                CheckRoomUiDelete();
            },
            changeMJBgEvent: function() {
                changeMJBg_leiyang(this, getCurrentMJBgType());
            },
        },
        cardNumImg: {
            _run:function () {
                MjClient.cardNumImgNode = this;
                setWgtLayout(this,[0.085, 0.085], [0.5, 0.77], [0, 0]);
            },
            _event: {
                initSceneData: function(eD) {
                    this.visible = IsArrowVisible_leiyang();
                },
                mjhand: function(eD) {
                    this.visible = IsArrowVisible_leiyang();
                },
                onlinePlayer: function(eD) {
                    //this.visible = IsArrowVisible();
                }
            },
            cardNumImg:{
                _run: function(){
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    this.cardLastNum = MjClient.majiang.getAllCardsTotal() - tData.maxPlayer * 14;
                },
                _event:{
                    initSceneData:function(){
                        if(!IsArrowVisible_leiyang()){
                            return;
                        }
                        var sData = MjClient.data.sData;
                        var tData = sData.tData; 
                        var next = MjClient.majiang.getAllCardsTotal() - tData.cardNext;
                        if(next <= 0){
                            this.visible = false;
                        }else if(next > 1){
                            this.visible = true; //隐藏
                            // return;
                           this.removeAllChildren();
                           var total = next > 20 ? 20 : next;
                           for(var i = 1;i <= total;i++){
                                var child = ccui.ImageView("playing/paohuzi/fapai_pai.png");
                                child.setPosition(cc.p(this.width/2,this.height/2 + i * 0.8));
                                this.addChild(child);
                           }
                        } 
                    },
                    mjhand:function(){
                        var sData = MjClient.data.sData;
                        var tData = sData.tData; 
                        var next = MjClient.majiang.getAllCardsTotal() - tData.cardNext;
                        if(next <= 0){
                            this.visible = false;
                        }else if(next > 1){
                            this.visible = true;
                            // return;
                           this.removeAllChildren();
                           var total = next > 20 ? 20 : next;
                           for(var i = 1;i <= total;i++){
                                var child = ccui.ImageView("playing/paohuzi/fapai_pai.png");
                                child.setPosition(cc.p(this.width/2,this.height/2 + i * 0.8));
                                this.addChild(child);
                           }
                        }                     
                    },
                    HZNewCard:function(){
                        var sData = MjClient.data.sData;
                        var tData = sData.tData; 
                        var next = MjClient.majiang.getAllCardsTotal() - tData.cardNext;
                        if(next <= 0){
                            this.visible = false;
                        }else if(next > 1){
                            var children = this.getChildren();
                            var childNum = this.getChildrenCount();
                            var factRemoveCount = (this.cardLastNum - next)/(this.cardLastNum/20);
                            if(Math.floor(childNum + factRemoveCount) > 20){
                                children[childNum - 1].removeFromParent(true);
                            }
                        } 
                    },
                    roundEnd: function(){
                        this.visible = false;
                    }                    
                }
            },
            cardnumAtlas: {
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                    this.ignoreContentAdaptWithSize(true);
                    this.maiPaiNum = 0;
                    var sData = MjClient.data.sData;
                    var areaSelectMode = sData.tData.areaSelectMode;
                    if(areaSelectMode.isMaiPai){
                        this.maiPaiNum = 20;
                    }
                },
                _text: function() {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData) return MjClient.majiang.getAllCardsTotal() - tData.cardNext - this.maiPaiNum;
                },
                _event: {
                    mjhand: function() {
                        this.visible = true;
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if (tData) this.setString(MjClient.majiang.getAllCardsTotal() - tData.cardNext - this.maiPaiNum);
                    },
                    HZNewCard: function() {
                        this.visible = true;
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if (tData) this.setString(MjClient.majiang.getAllCardsTotal() - tData.cardNext - this.maiPaiNum);
                    },
                    HZCardNum: function() {
                        this.visible = true;
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if (tData) this.setString(MjClient.majiang.getAllCardsTotal() - tData.cardNext - this.maiPaiNum);
                    },
                    initSceneData: function(){
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if(tData && tData.tState == TableState.waitPut || tData.tState == TableState.waitEat || tData.tState == TableState.waitCard){
                            this.visible = true;
                            this.setString(MjClient.majiang.getAllCardsTotal() - tData.cardNext - this.maiPaiNum);
                        }else{
                            this.visible = false;
                        }
                    },
                    // waitPut: function() {
                    //     var sData = MjClient.data.sData;
                    //     var tData = sData.tData;
                    //     if (tData) this.setString(MjClient.majiang.getAllCardsTotal() - tData.cardNext);
                    //     cc.log(MjClient.majiang.getAllCardsTotal() + "-----------------waitPut------------------" + tData.cardNext);
                    // }
                    roundEnd: function(){
                        this.visible = false;
                    }
                }
            }
        },
        back: {
            back: {
                _run: function() {
                    changeGameBg(this);
                },
                _event: {
                    changeGameBgEvent: function() {
                        changeGameBg(this);
                    }
                },
                _layout: [[1, 1],[0.5, 0.5],[0, 0], true],
            },
            LeftBottom:{
                _layout: [[0.1, 0.1],[0.03, 0.045],[0, 0]],
            },
            RightBottom:{
                _layout: [[0.1, 0.1],[0.97,0.05],[0, 0]],
            },
            RightTop:{
                _layout: [[0.1, 0.1],[0.97,0.95],[0, 0]],
            },
            leftTop:{
                _layout: [[0.1, 0.1],[0.03,0.95],[0,0]],
                // _run:function()
                // {
                //     var text = new ccui.Text();
                //     text.setFontName("fonts/fzcy.ttf");
                //     text.setFontSize(20);
                //     text.setRotation(-90);
                //     text.setAnchorPoint(0,0.5);
                //     text.setPosition(23.5, 20.5);
                //     this.addChild(text);
                //     text.schedule(function(){
                //         var time = MjClient.getCurrentTime();
                //         var str = time[0]+"/"+time[1]+"/"+ time[2]+" "+
                //             (time[3]<10?"0"+time[3]:time[3])+":"+
                //             (time[4]<10?"0"+time[4]:time[4])+":"+
                //             (time[5]<10?"0"+time[5]:time[5]);
                //         this.setString(str);
                //     });
                // }
            }
        },
        info:{
            _layout: [[0.16, 0.16],[0.01, 0.935],[0, 0]]
        },
        // gameName:{
        //     _layout: [[0.16, 0.16],[0.5, 0.68],[0, 0]]
        // },
        roundInfo:{
            _layout: [[0.11, 0.11],[0.5, 0.7],[0, 0]],
            _run:function(){
                var tData = MjClient.data.sData.tData;
                var str = "";
                str += (tData.areaSelectMode.xiNum == 6) ? "6息," : (tData.areaSelectMode.xiNum == 9) ? "9息," : "15息," ;
                str += (tData.areaSelectMode.suanfenType == 0) ? "" : (tData.areaSelectMode.suanfenType == 1) ? "底分2分," : "1息1囤,";                  str += (tData.areaSelectMode.isMingwei) ? "明偎," : "" ;
                str += (tData.areaSelectMode.isYiwushi) ? "一五十," : "" ;
                str += (tData.areaSelectMode.isHongheidian) ? "红黑点," : "" ;
                str += (tData.areaSelectMode.isTiandihu) ? "天地胡," : "" ;
                str += (tData.areaSelectMode.isTianhu) ? "天胡," : "" ;
                str += (tData.areaSelectMode.isDihu) ? "地胡," : "" ;
                str += (tData.areaSelectMode.is21Zhang) ? "21张," : "" ;
                str += (tData.areaSelectMode.isMaiPai) ? "埋牌20张," : "" ;
                str += (tData.areaSelectMode.xingType == 0) ? "不带醒" : (tData.areaSelectMode.xingType == 2) ? "翻醒" : "随醒" ;
                str += tData.areaSelectMode.isManualCutCard == 1 ? "手动切牌," : tData.areaSelectMode.isManualCutCard == 0 ? "系统切牌," : "";
                this.ignoreContentAdaptWithSize(true);
                var strPayWay = "";
                var str5 = strPayWay;
                this.setString(str + str5);
            }
        },
        jiazhuWait:{
            _visible:false,
            _layout: [[0.45, 0.12],[0.5, 0.5],[0, 0]]
        },
        banner: {
            _layout: [[0.4, 0.4],[0.5, 1],[0, 0]],
            _run: function() {
                    // if (getCurrentGameBgType() != 0)
                        // changeGameTitleBg(this);
                },
            _event: {
                changeGameBgEvent: function() {
                    // changeGameTitleBg(this);
                }
            },
            gameName:{
                _run: function () {
                    if(isIPhoneX()){
                        this.y += this.height / 4;
                    }
                },
            },
            wifi: {
                _run: function() {
                    updateWifiState(this);
                }
            },
            // bg_time:{
            //      _run:function()
            //     {
            //         var text = new ccui.Text();
            //         text.setFontName("fonts/fzcy.ttf");
            //         text.setFontSize(20);
                    
            //         text.setAnchorPoint(0.5,0.5);
            //         text.setPosition(28.5, 12);
            //         this.addChild(text);
            //         text.schedule(function(){
                        
            //             var time = MjClient.getCurrentTime();
            //             var str = (time[3]<10?"0"+time[3]:time[3])+":"+
            //                 (time[4]<10?"0"+time[4]:time[4]);
            //             this.setString(str);
            //         });
            //     }

            // },
            timeTxt: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                    this.schedule(function(){
                        var time = MjClient.getCurrentTime();
                        var str = (time[3]<10?"0"+time[3]:time[3])+":"+
                            (time[4]<10?"0"+time[4]:time[4]);
                        this.setString(str);
                    });
                }
            },
            powerBar: {
                _run: function() {
                    updateBattery(this);
                },
                _event: {
                    nativePower: function(d) {
                        this.setPercent(Number(d));
                    }
                }
            },
            tableid: {
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
                _event: {
                    initSceneData: function() {
                        this.ignoreContentAdaptWithSize(true);
                        this.setString(MjClient.data.sData.tData.tableid);
                    }
                }
            },
            getRoomNum: {
                // _run:function(){
                //     if (MjClient.remoteCfg.guestLogin){
                //         setWgtLayout(this, [0.18, 0.18],[0.5, 0.3],[0, 0]);
                //     }else{
                //         setWgtLayout(this, [0.18, 0.18],[0.5, 0.2],[0, 0]);
                //     }
                // },
                // _visible:function(){
                //     return !MjClient.remoteCfg.guestLogin;
                // },
                _click: function() {
                    /*
                     复制房间号-----------------------
                     */
                    var tData = MjClient.data.sData.tData;

                    var str = "";
                    str += (tData.areaSelectMode.xiNum == 6) ? "6息," : (tData.areaSelectMode.xiNum == 9) ? "9息," : "15息," ;
                    str += (tData.areaSelectMode.xingType == 0) ? "不带醒," : (tData.areaSelectMode.xingType == 2) ? "翻醒," : "随醒," ;
                    str += (tData.areaSelectMode.suanfenType == 0) ? "" : (tData.areaSelectMode.suanfenType == 1) ? "底分2分," : "1息1囤,";
                    str += (tData.areaSelectMode.isMingwei) ? "明偎," : "" ;
                    str += (tData.areaSelectMode.isYiwushi) ? "一五十," : "" ;
                    str += (tData.areaSelectMode.isHongheidian) ? "红黑点," : "" ;
                    str += (tData.areaSelectMode.isTiandihu) ? "天地胡," : "" ;
                    str += (tData.areaSelectMode.isTianhu) ? "天胡," : "" ;
                    str += (tData.areaSelectMode.isDihu) ? "地胡," : "" ;
                    str += (tData.areaSelectMode.is21Zhang) ? "21张," : "" ;
                    str += (tData.areaSelectMode.isMaiPai) ? "埋牌20张," : "" ;
                    str += tData.areaSelectMode.isManualCutCard == 1 ? "手动切牌," : tData.areaSelectMode.isManualCutCard == 0 ? "系统切牌," : "";

                    var sData = MjClient.data.sData;
                    var str7 = "  二缺一";
                    if(MjClient.MaxPlayerNum_leiyang == 3){
                        if((MjClient.MaxPlayerNum_leiyang - Object.keys(sData.players).length) == 2){
                            str7 = "  一缺二";
                        }
                    }else if(MjClient.MaxPlayerNum_leiyang == 4){
                        if((MjClient.MaxPlayerNum_leiyang - Object.keys(sData.players).length) == 3){
                            str7 = "  一缺三";
                        }else if((MjClient.MaxPlayerNum_leiyang - Object.keys(sData.players).length) == 2){
                            str7 = "二缺二";
                        }else  if((MjClient.MaxPlayerNum_leiyang - Object.keys(sData.players).length) == 1){
                            str7 = "三缺一";
                        }
                    }

                    // var _nameStr = unescape(pl.info.nickname );
                    str7 += "(";
                    var index = 0;
                    for(var uid in sData.players){
                        var pl = sData.players[uid + ""];
                        if (!pl) continue;
                        str7 += unescape(pl.info.nickname );
                        if(index < Object.keys(sData.players).length - 1){
                            str7 += ",";
                        }
                        index ++;
                    }
                    str7 += ")";
                    var str6 = tData.roundNum + "局,"+str7+",速度加入【"+AppCnName[MjClient.getAppType()]+"】\n" + "(复制此消息打开游戏可直接进入该房间)";
                    cc.log(str+str6);
                    MjClient.native.doCopyToPasteBoard("房间号:[" + tData.tableid + "]\n" + str+str6);
                    MjClient.showMsg("已复制房间号，请不要返回大厅。打开微信后粘贴房间信息。", function(){
                        MjClient.native.openWeixin();
                    }, function(){});
                },
                // _event: {
                //     initSceneData: function(eD) {
                //         this.visible = IsInviteVisible();
                //     },
                //     addPlayer: function(eD) {
                //         console.log(">>>>>> play add player >>>>");
                //         this.visible = IsInviteVisible();
                //     },
                //     removePlayer: function(eD) {
                //         this.visible = IsInviteVisible();
                //     }
                // }
            },
            setting: {
                _run:function () {
                    if(MjClient.data.sData.tData.maxPlayer == 2){
                        this.x += 50;
                    }
                },
                _click: function() {
                    var settringLayer = new SettingView("setting_ziPai.json");
                    settringLayer.setName("PlayLayerClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_shezhi", {uid:SelfUid(),gameType:MjClient.gameType});
                }
            },
            changeBg: {
                _run:function () {
                    if(MjClient.data.sData.tData.maxPlayer == 2){
                        this.x += 50;
                    }
                },
                _click: function() {
                    setCurrentGameBgTypeToNext();
                    postEvent("changeGameBgEvent");
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Pifu", {uid:SelfUid(),gameType:MjClient.gameType});
                }
            },
            gps_btn: {
                //_layout: [[0.09, 0.09],[0.38, 0.93],[0, 0]],
                _run:function () {
                    if(MjClient.data.sData.tData.maxPlayer <= 2){
                        this.visible = false;
                    }
                },
                _click: function() {
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dingwei", {uid: SelfUid()});
                    if(MjClient.MaxPlayerNum_leiyang == 3){
                        MjClient.Scene.addChild(new showDistance3PlayerLayer());
                    }else if(MjClient.MaxPlayerNum_leiyang == 4){
                        MjClient.Scene.addChild(new showDistanceLayer());
                    }
                }
            },
            back_btn: {
                //_layout: [[0.09, 0.09],[0.38, 0.93],[0, 0]],
                _click: function() {
                    if (!IsRoomCreator() &&
                        (MjClient.data.sData.tData.tState == TableState.waitJoin || MjClient.data.sData.tData.tState == TableState.waitReady))
                    {
                        MjClient.showMsg("确定要退出房间吗？",
                            function() {
                                MjClient.leaveGame();
                                if (!MjClient.enterui && !getClubInfoInTable())
                                    MjClient.Scene.addChild(new EnterRoomLayer());
                            },
                            function() {});
                    }
                    else {
                        MjClient.showMsg("是否解散房间？", function () {
                            MjClient.delRoom(true);
                        }, function(){}, 1);
                    }
                }
            },
            Button_1: {
                _visible : true,
                _click: function() {
                    MjClient.openWeb({url:MjClient.GAME_TYPE.SU_QIAN,help:true});
                }
            },
            roundnumImg: {
                _run:function () {
                    MjClient.roundnumImgNode = this;
                    //setWgtLayout(this,[0.1, 0.1], [0.5, 0.57], [0, 0]);
                },
                _event: {
                    initSceneData: function(eD) {
                        this.visible = IsArrowVisible_leiyang();
                    },
                    mjhand: function(eD) {
                        this.visible = IsArrowVisible_leiyang();
                    },
                    onlinePlayer: function(eD) {
                        this.visible = IsArrowVisible_leiyang();
                    }
                },
                roundnumAtlas: {
                    _run:function () {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function() {
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        var extraNum = tData.extraNum ? tData.extraNum:0;
                        if (tData) return ((tData.roundNum - 1 + extraNum).toString()+"/"+tData.roundAll.toString()+"局");
                    },
                    _event: {
                        mjhand: function() {
                            var sData = MjClient.data.sData;
                            var tData = sData.tData;
                            var extraNum = tData.extraNum ? tData.extraNum:0;
                            if (tData) return this.setString((tData.roundNum - 1 + extraNum).toString()+"/"+tData.roundAll.toString()+"局");
                        }
                    }
                }
            },
        },
        wait: {
            // getRoomNum: {
            //     _run:function(){
            //         if (MjClient.remoteCfg.guestLogin){
            //             setWgtLayout(this, [0.18, 0.18],[0.5, 0.3],[0, 0]);
            //         }else{
            //             setWgtLayout(this, [0.18, 0.18],[0.5, 0.2],[0, 0]);
            //         }
            //     },
            //     _visible:function(){
            //         return !MjClient.remoteCfg.guestLogin;
            //     },
            //     _click: function() {
            //         /*
            //          复制房间号-----------------------
            //          */
            //         var tData = MjClient.data.sData.tData;
            //         var str1 = "扯胡子,";
            //         var str2 = (tData.areaSelectMode.kingNum == 2) ? "双王," : "三王,";
            //         var str3 = (tData.areaSelectMode.isFanXing == 1) ? "单醒," : "双醒,";
            //         str3 += (tData.areaSelectMode.fengDing == -1) ? "无上限," : (tData.areaSelectMode.fengDing == 300)?"300分封顶,":"600分封顶,";
            //         var str5 = "三人场,";
            //         var sData = MjClient.data.sData;
            //         var str7 = "  二缺一";
            //         if((MjClient.MaxPlayerNum_leiyang - Object.keys(sData.players).length) == 2){
            //             str7 = "  一缺二";
            //         }
            //         // var _nameStr = unescape(pl.info.nickname );
            //         str7 += "(";
            //         var index = 0;
            //         for(var uid in sData.players){
            //             var pl = sData.players[uid + ""];
            //             str7 += unescape(pl.info.nickname );
            //             if(index < Object.keys(sData.players).length - 1){
            //                 str7 += ",";
            //             }
            //             index ++;
            //         }
            //         str7 += ")";
            //         var str6 = tData.roundNum + "局,"+str7+",速度加入【"+AppCnName[MjClient.getAppType()]+"】\n" + "(复制此消息打开游戏可直接进入该房间)";
            //         MjClient.native.doCopyToPasteBoard("房间号:[" + tData.tableid + "]\n" + str1+str2+str3+str5+str6);
            //         MjClient.showMsg("已复制房间号，请不要返回大厅。打开微信后粘贴房间信息。", function(){
            //             MjClient.native.openWeixin();
            //         });
            //     }
            // },
            wxinvite: {
                _layout: [[219/1280, 0],[0.697, 0.12],[0, 0]],
                _click: function() {
                    // var tData = MjClient.data.sData.tData;

                    // var str = "";
                    // str += (tData.areaSelectMode.xiNum == 6) ? "6息," : (tData.areaSelectMode.xiNum == 9) ? "9息," : "15息," ;
                    // str += (tData.areaSelectMode.xingType == 0) ? "不带醒," : (tData.areaSelectMode.xingType == 2) ? "翻醒," : "随醒," ;
                    // str += (tData.areaSelectMode.suanfenType == 0) ? "" : (tData.areaSelectMode.suanfenType == 1) ? "底分2分," : "1息1囤,";
                    // str += (tData.areaSelectMode.isMingwei) ? "明偎," : "" ;
                    // str += (tData.areaSelectMode.isYiwushi) ? "一五十," : "" ;
                    // str += (tData.areaSelectMode.isHongheidian) ? "红黑点," : "" ;
                    // str += (tData.areaSelectMode.isTiandihu) ? "天地胡," : "" ;
                    // str += (tData.areaSelectMode.isTianhu) ? "天胡," : "" ;
                    // str += (tData.areaSelectMode.isDihu) ? "地胡," : "" ;
                    // str += tData.roundNum + "局," + "点击立即加入牌局>>>";

                    // var sData = MjClient.data.sData;
                    // var str7 = "  二缺一";
                    // if(MjClient.MaxPlayerNum_leiyang == 3){
                    //     if((MjClient.MaxPlayerNum_leiyang - Object.keys(sData.players).length) == 2){
                    //         str7 = "  一缺二";
                    //     }
                    // }else if(MjClient.MaxPlayerNum_leiyang == 4){
                    //     if((MjClient.MaxPlayerNum_leiyang - Object.keys(sData.players).length) == 3){
                    //         str7 = "  一缺三";
                    //     }else if((MjClient.MaxPlayerNum_leiyang - Object.keys(sData.players).length) == 2){
                    //         str7 = "二缺二";
                    //     }else  if((MjClient.MaxPlayerNum_leiyang - Object.keys(sData.players).length) == 1){
                    //         str7 = "三缺一";
                    //     }
                    // }
                    // var txt_club = tData.clubId ? "(亲友圈:" + tData.clubId + ")" : "";
                    // cc.log("str=" + str + " str7=" + str7);

                    // var gameName = GameCnName[MjClient.gameType];
                    // if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                    //     gameName = "六胡抢";
                    // }
                    // GLog( gameName + "  房间号:" + tData.tableid + str7+txt_club, str);
                    // MjClient.native.wxShareUrl(MjClient.remoteCfg.entreRoomUrl+"?vipTable="+tData.tableid, gameName + "  房间号:" + tData.tableid + str7+txt_club, str);
                    getPlayingRoomInfo_paohuzi(2);
                },
                _visible:function(){
                    return !MjClient.remoteCfg.guestLogin;
                }
            },
            delroom: {
                _visible: false,
                _run:function(){
                    if (MjClient.remoteCfg.guestLogin){
                        setWgtLayout(this, [0.11, 0.11],[0.05, 0.5],[0, 0]);
                    }else{
                        setWgtLayout(this, [0.11, 0.11],[0.05, 0.5],[0, 0]);
                    }
                },
                _click: function() {
                    MjClient.delRoom(true);
                }
            },
            backHomebtn: {
                _run:function(){
                    if (MjClient.remoteCfg.guestLogin){
                        setWgtLayout(this, [219/1280, 0],[0.30, 0.12],[0, 0]);
                    }else{
                        setWgtLayout(this, [219/1280, 0],[0.30, 0.12],[0, 0]);
                    }
                },
                _click: function(btn) {
                    var sData = MjClient.data.sData;
                    if (sData) {
                        if (IsRoomCreator()) {

                            if(!isAgent()){
                                //如果不是代理直接解散房间
                                MjClient.delRoom(true);
                                return;
                            }

                            MjClient.showMsg("返回大厅房间仍然保留\n赶快去邀请好友吧",
                                function() {
                                    MjClient.leaveGame();
                                    if (!MjClient.enterui && !getClubInfoInTable())
                                        MjClient.Scene.addChild(new EnterRoomLayer());
                                },
                                function() {});
                        } else {
                            MjClient.showMsg("确定要退出房间吗？",
                                function() {
                                    MjClient.leaveGame();
                                    if (!MjClient.enterui && !getClubInfoInTable())
                                        MjClient.Scene.addChild(new EnterRoomLayer());
                                },
                                function() {});
                        }
                    }
                },
                _event: {
                    returnPlayerLayer: function() {
                        MjClient.playui.visible = true;
                    },
                    initSceneData: function(eD) {
                        this.visible = IsInviteVisible();
                    },
                    addPlayer: function(eD) {
                        this.visible = IsInviteVisible();
                    },
                    removePlayer: function(eD) {
                        this.visible = IsInviteVisible();
                    }
                }
            },
            waitFriends:{
                _layout: [[0.06, 0.06],[0.5, 0.5],[0, -4]],
                _run:function () {
                    for(var i=0 ; i<9 ; i++){
                        var imgZi = this.getChildByName("waitFriend_" + i);

                        var hei = 20;
                        if(i>=6){
                            hei = 10;
                        }
                        if(imgZi){
                            imgZi.runAction(cc.repeatForever(cc.sequence(
                                cc.delayTime(i*0.3),
                                cc.moveBy(0.3, 0, hei),
                                cc.moveBy(0.3, 0, -hei),
                                cc.delayTime(3 - i*0.3)
                            )));
                        }
                    }
                },
            },
            _event: {
                initSceneData: function(eD) {
                    this.visible = IsInviteVisible();
                },
                addPlayer: function(eD) {
                    console.log(">>>>>> play add player >>>>");
                    this.visible = IsInviteVisible();
                },
                removePlayer: function(eD) {
                    this.visible = IsInviteVisible();
                }
            }
        },
        BtnReady:{
            _run: function () {
                this.visible = false;
                //setWgtLayout(this,[0.135, 0.128], [0.5, 0.40], [0.0, 0.26]);
                setWgtLayout(this, [219/1280, 0],[0.5, 0.12],[0, 0]);
            },
            _click: function(btn) {
                cc.log("-----------准备-------");
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zhunbei", {uid: SelfUid(), gameType:MjClient.gameType});
                //sendQiangdizhu(true);
                HZPassConfirmToServer_leiyang();
            },
            _event:{
                waitReady:function()
                {
                    this.visible = true;
                },
                mjhand: function() {

                    this.visible = false;
                },
                initSceneData: function() {
                    this.visible = false;
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData.roundNum != tData.roundAll) {
                        return;
                    }

                    if (Object.keys(sData.players).length < tData.maxPlayer) {
                        return;
                    }

                    var pl = getUIPlayer(0);
                    if(tData.tState == TableState.waitReady && pl.mjState == TableState.waitReady)
                    {
                        this.visible = true;
                    }
                },
                PKPass:function () {
                    this.visible = false;
                },
                onlinePlayer: function(msg) {
                    if(msg.uid  == SelfUid())  // ?
                    {
                        this.visible = false;
                    }
                },
                removePlayer: function() {
                    this.visible = false;
                }
            }
        },        
        down: {
            head: {
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function(){
                            showUserZhuangLogo_leiyang(this, 0);
                        },
                        initSceneData: function(){
                            if (IsArrowVisible_leiyang()) showUserZhuangLogo_leiyang(this, 0);
                        },
                        mjhand: function(){
                            if (IsArrowVisible_leiyang()) showUserZhuangLogo_leiyang(this, 0);
                        }
                    }
                },
                chatbg: {
                    _run: function() {
                        this.getParent().zIndex = 600;
                    },
                    chattext: {
                        _event: {

                            MJChat: function(msg) {

                                showUserChat_leiyang(this, 0, msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat_leiyang(this, 0, MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    showPlayerInfo_leiyang(0, btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead_leiyang(this, d, 0);
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon_leiyang(this,0);
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon_leiyang(this,0);
                    }
                },
                _run: function () {
                    showFangzhuTagIcon_leiyang(this,0);
                },
                score_bg:{_visible:false},
                huxi:{
                    _visible: false,
                    _event:{
                        clearCardUI: function(){
                            this.setVisible(false);
                            return this.setString("0胡息");
                        },
                        addPlayer: function(){
                            return this.setString("0胡息");
                        },
                        removePlayer: function(){
                            this.visible = false;
                        },
                        initSceneData:function(){
                            this.visible = true;
                            var huXi = UpdateHuXi_leiyang(0);
                            if(!IsArrowVisible_leiyang()){
                                huXi = 0;
                            }
                            return this.setString(huXi + "胡息");
                        },
                        mjhand:function(){
                            this.visible = true;
                        },
                        HZChiCard:function(){
                            var huXi = UpdateHuXi_leiyang(0);
                            return this.setString(huXi + "胡息");
                        },
                        MJPeng:function(){
                            var huXi = UpdateHuXi_leiyang(0);
                            return this.setString(huXi + "胡息");
                        },
                        HZGangCard:function(){
                            var huXi = UpdateHuXi_leiyang(0);
                            return this.setString(huXi + "胡息");
                        },
                        HZWeiCard:function(){
                            var huXi = UpdateHuXi_leiyang(0);
                            return this.setString(huXi + "胡息");
                        },
                        LY_addHandHuXi:function () {
                            var huXi = UpdateHuXi_leiyang(0);
                            return this.setString(huXi + "胡息");
                        }
                    }
                },
                jiaZhu: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        clearCardUI: function(eD) {
                            this.visible = false;
                        }
                    }
                },
                jiaZhuTip: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        clearCardUI: function(eD) {
                            this.visible = false;
                        }
                    }
                },
                name_bg:{_visible:false},
                timeImg:{
                    _visible:false,
                    _event:{
                        initSceneData: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(0);
                        },
                        mjhand: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(0);
                        },
                        onlinePlayer: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(0) && IsArrowVisible_leiyang();
                        },
                        waitPut: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(0);
                        },
                        HZNewCard: function(ed){
                            this.visible = curPlayerIsMe_leiyang(0);
                        },
                        MJPeng: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(0);
                        },
                        HZChiCard: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(0);
                        },
                        HZGangCard: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(0);
                        },
                        HZWeiCard: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(0);
                        },
                        MJPut: function(eD){
                            this.visible = curPlayerIsMe_leiyang(0);
                        },
                        roundEnd: function(eD){
                            this.visible = false;
                        }
                    },
                    time:{
                        _run: function() {
                            this.setString("00");
                        },
                        _event: {
                            initSceneData: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(0)){
                                    arrowbkNumberUpdate(this);
                                    this.setString("00");
                                }
                            },
                            mjhand: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPeng: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZNewCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZGangCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZChiCard: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZWeiCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPut: function(msg) {
                                if (curPlayerIsMe_leiyang(0)) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    this.setString("00");
                                }
                            },
                            onlinePlayer: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                var pl = getUIPlayer_leiyang(0);
                                if(pl && pl.onLine && curPlayerIsMe_leiyang(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            roundEnd: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                            }
                        }
                    }
                },
                skipHuIconTag: {
                    _visible:false,
                    _event: {
                        clearCardUI: function(eD) {
                            this.visible = false;
                        },
                        initSceneData:function(eD)
                        {
                            var pl = getUIPlayer_leiyang(0);
                            //cc.log("====================initSceneData=============== pl.isQiHu = " + pl.isQiHu);
                            if (pl && pl.isQiHu) {
                                this.visible = true;
                            }
                        }
                    }
                },
            },
            play_tips: {
                _layout: [[0.2, 0.2], [0.5, 0.45], [0, 0.5]],
                _run: function () {
                    this.zIndex = actionZindex;
                },
                _visible:false,
            },
            tai_layout:{
                _layout: [[0.018, 0.018],[0, 0],[0, 0.2]],
                tai_info:{
                    _visible:true,
                    _run: function () {
                        this.setString("");
                    }
                },
            },
            ready: {
                _layout: [[0.07, 0.07],[0.5, 0.5],[-2.5, -2.5]],
                _run: function() {
                    GetReadyVisible_leiyang(this, 0);
                },
                _event: {
                    startShuffleCards:function (d) {
                        GetReadyVisible_paohuzi(this, -1);
                    },
                    moveHead: function() {
                        GetReadyVisible_leiyang(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible_leiyang(this, 0);//根据状态设置ready 是否可见 add by sking
                    },
                    removePlayer: function() {
                        this.visible = false;
                        // GetReadyVisible_leiyang(this, 0);
                    },
                    onlinePlayer: function() {
                        GetReadyVisible_leiyang(this, 0);
                    }
                }
            },
            handNode: {
                _visible: false
            },
            replayNode:{
                _visible:true,
                _layout:[[0.1, 0.1], [0.15, 0.05], [0, 0]]
            },
            eatNode: {
                _visible: true,
                _layout : [[0.14, 0.14], [0.02, 0.23], [0, 0]],
                _run:function()
                {
                    if(isIPhoneX()){
                        setWgtLayout(this, [0.12, 0.12], [0.04, 0.23], [0, 0]);
                    }else{
                        setWgtLayout(this, [0.12, 0.12], [0.02, 0.23], [0, 0]);
                    }
                    var layoutType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_QXYZ_LAYOUT_SELECT,1);
                    if(layoutType == 0){
                        btnOff_x = 3;
                    }else{
                        btnOff_x = 0;
                    }
                },
                _event:{
                    EZP_layout:function(){
                        var layoutType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_QXYZ_LAYOUT_SELECT,1);
                        if(layoutType == 0)
                        {
                            btnOff_x = 3;
                        }else{
                            btnOff_x = 0;
                        }
                        MjClient.playui.EatVisibleCheck();
                    }
                }
            },
            outNode: {
                _visible: true,
                _layout : [[0.14, 0.14], [0.7, 0.5], [0, 0]],
            },
            handCard: {
                _run:function () {
                    if(getCurrentMJBgType() == 0){
                        setWgtLayout(this, [0.185, 0.17],[0.27,0.75],[0,0]);
                    }else if(getCurrentMJBgType() == 1){
                        setWgtLayout(this, [0.16, 0.146],[0.27,0.75],[0,0]);
                    }else {
                        setWgtLayout(this, [0.185, 0.17],[0.27,0.75],[0,0]);
                    }
                },
                _visible: false,
                _event:{
                    changeMJBgEvent: function() {
                        if(getCurrentMJBgType() == 0){
                            setWgtLayout(this, [0.185, 0.17],[0.27,0.75],[0,0]);
                        }else if(getCurrentMJBgType() == 1){
                            setWgtLayout(this, [0.16, 0.146],[0.27,0.75],[0,0]);
                        }else {
                            setWgtLayout(this, [0.185, 0.17],[0.27,0.75],[0,0]);
                        }
                        MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);
                    }
                }
            },
            put: {
                _visible: false,
                //_layout : [[0.35, 0.35], [0.5, 0.6], [0, 0]],
                _run:function()
                {
                    setWgtLayout(this, [0.35, 0.35], [0.5, 0.6], [0, 0]);
                    var userData = {scale:this.getScale(), pos:this.getPosition()};
                    this.setUserData(userData);
                },

                _event:{
                    MJPut: function(eD) {
                        this.loadTexture("playing/paohuzi/chupai_bj.png");
                    },
                    HZNewCard: function(eD){
                        this.loadTexture("playing/paohuzi/mopai_bj.png");
                    }
                }
            },
            xingPai: {
                _visible: false,
                _run:function()
                {
                    setWgtLayout(this, [0.35, 0.35], [0.5, 0.6], [0, 0]);
                    var userData = {scale:this.getScale(), pos:this.getPosition()};
                    this.setUserData(userData);
                },
                _event:{
                    MJPass: function(){
                        this.removeAllChildren(true);
                    }
                }
            },
            out0: {
                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    clearCardUI_leiyang(this, 0);
                },
                clearCardArr: function(){
                    var handNode = this.getChildByName("handNode");
                    handNode.removeAllChildren();
                    var eatNode = this.getChildByName("eatNode");
                    eatNode.removeAllChildren();
                    var outNode = this.getChildByName("outNode");
                    outNode.removeAllChildren();
                    var putNode = this.getChildByName("xingPai");
                    putNode.removeAllChildren();
                    putNode.setVisible(false);
                    RemovePutCardOut_leiyang(true);
                },
                initSceneData: function(eD) {
                    SetUserVisible_LiuHuQiang(this, 0);
                    InitUserHandUI_LiuHuQiang(this, 0);
                    InitUserCoinAndName_leiyang(this, 0);
                    MjClient.hasPut = false; // 重连回来重置打掉牌标志（打牌时候断线)
                    ShowPutCardIcon();
                    DealOffLineCard_leiyang(this,0);
                },
                addPlayer: function(eD) {
                    SetUserVisible_LiuHuQiang(this, 0);
                    InitUserCoinAndName_leiyang(this, 0);
                },
                removePlayer: function(eD) {
                    SetUserVisible_LiuHuQiang(this, 0);
                    InitUserCoinAndName_leiyang(this, 0);
                },
                mjhand: function(eD) {
                    InitUserHandUI_LiuHuQiang(this, 0);
                    InitUserCoinAndName_leiyang(this, 0);

                    var uid = getUIPlayer_leiyang(0).info.uid;
                    if (eD.jiazhuNums)
                    {
                        for (var key in eD.jiazhuNums)
                        {
                            if (key != uid && eD.jiazhuNums[key] == 2)
                                MjClient.playui._jiazhuWait.visible = true;
                        }
                    }
                    var tData = MjClient.data.sData.tData;
                    if(tData.areaSelectMode.isManualCutCard && MjClient.playui.playuiNode.cutCardView){
                        MjClient.playui.playuiNode.cutCardView.cutCardsEffect(this);
                    }
                },
                roundEnd: function() {
                    InitUserCoinAndName_leiyang(this, 0);
                },
                HZNewCard: function(eD) {
                    if (typeof(eD) == "number") {
                        eD = {newCard: eD};
                    }
                    DealNewCard_leiyang(this,eD,0);
                },
                MJPut: function(eD) {
                    DealPutCard_leiyang(this,eD,0);
                },
                HZChiCard: function(eD) {
                    DealChiCard_leiyang(this, eD, 0);
                },
                HZWeiCard: function(eD){
                    DealWeiCard_leiyang(this,eD,0);
                },
                HZGangCard: function(eD) {
                    DealGangCard_leiyang(this, eD, 0);
                },
                MJPeng: function(eD) {
                    DealPengCard_leiyang(this, eD, 0);
                },
                MJHu: function(eD) {
                    DealHu_leiyang(this, eD, 0);
                },
                onlinePlayer: function(eD) {
                    resetHandAfterBegin_leiyang();
                    setUserOffline_leiyang(this, 0);
                },
                playerStatusChange: function(eD) {
                    setUserOffline_leiyang(this, 0);
                },
                MJFlower: function(eD) {
                    HandleMJFlower(this, eD, 0);
                },
                MJTing: function (eD) {
                    HandleMJTing(this, eD, 0);
                },
                MJJiazhu: function(msg) {
                    ShowPutCardIcon();
                    MjClient.playui.EatVisibleCheck();
                    MjClient.playui._jiazhuWait.visible = false;
                    MjClient.playui.resetJiaZhuTip();
                    MjClient.majiang.setJiaZhuNum(MjClient.playui._downNode, getUIPlayer_leiyang(0));
                    MjClient.majiang.setJiaZhuNum(MjClient.playui._rightNode, getUIPlayer_leiyang(1));
                    MjClient.majiang.setJiaZhuNum(MjClient.playui._topNode, getUIPlayer_leiyang(2));
                },
                HZPickCard:function (eD) {
                    var pl = getUIPlayer_leiyang(0);
                    if(eD.uid == pl.info.uid) {
                        MjClient.HandCardArr = MjClient.majiang.sortHandCardSpecial(pl.mjhand)
                    }
                    RemovePutCardOut_leiyang(true);
                    MjClient.playui.ResetHandCard(this,0);
                },
                HZAddCards:function (eD) {
                    DealAddCard_leiyang(this,eD, 0);
                },
                HZCheckRaise:function (msg) {
                    ShowPutCardIcon();
                    MjClient.playui.EatVisibleCheck();

                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer_leiyang(0);
                    if(!pl){
                        return;
                    }
                    if (pl.jiazhuNum == 2 && MjClient.rePlayVideo == -1)
                    {
                        if (SelfUid() == pl.info.uid) {
                            var layer = new laZhangLayer();
                            MjClient.playui.addChild(layer, 99);
                            if (MjClient.webViewLayer != null) {
                                MjClient.webViewLayer.close();
                            }
                        }
                        else
                        {
                            MjClient.playui._jiazhuWait.visible = true;
                        }
                    }else if(pl.jiazhuNum == 1){
                        MjClient.majiang.setJiaZhuNum(node, getUIPlayer_leiyang(off));
                    }
                },
            }
        },
        xing: {
            _run:function () {
                if(MjClient.MaxPlayerNum_leiyang == 3 || MjClient.MaxPlayerNum_leiyang == 2){
                    this.setVisible(false);
                }
            },
            head: {
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function() {
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                showUserZhuangLogo_leiyang(this, 1);
                            }
                        },
                        initSceneData: function() {
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                if (IsArrowVisible_leiyang()) showUserZhuangLogo_leiyang(this, 1);
                            }
                        },
                        mjhand: function(){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                if (IsArrowVisible_leiyang()) showUserZhuangLogo_leiyang(this, 1);
                            }
                        }
                    }
                },
                chatbg: {
                    _run: function() {
                        this.getParent().zIndex = 500;
                    },
                    chattext: {
                        _event: {
                            MJChat: function(msg) {
                                if(MjClient.MaxPlayerNum_leiyang == 4) {
                                    showUserChat_leiyang(this, 1, msg);
                                }
                            },
                            playVoice: function(voicePath) {
                                if(MjClient.MaxPlayerNum_leiyang == 4) {
                                    MjClient.data._tempMessage.msg = voicePath;
                                    showUserChat_leiyang(this, 1, MjClient.data._tempMessage);
                                }
                            }
                        }
                    }
                },
                _click: function(btn) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        showPlayerInfo_leiyang(1, btn);
                    }
                },
                _event: {
                    loadWxHead: function(d) {
                        if(MjClient.MaxPlayerNum_leiyang == 4) {
                            setWxHead_leiyang(this, d, 1);
                        }
                    },
                    addPlayer: function(eD) {
                        if(MjClient.MaxPlayerNum_leiyang == 4) {
                            showFangzhuTagIcon_leiyang(this, 1);
                        }
                    },
                    removePlayer: function(eD) {
                        if(MjClient.MaxPlayerNum_leiyang == 4) {
                            showFangzhuTagIcon_leiyang(this, 1);
                        }
                    }
                },
                _run: function () {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        showFangzhuTagIcon_leiyang(this, 1);
                    }
                },
                score_bg:{_visible:false},
                huxi:{
                    _visible: false,
                    _event:{
                        clearCardUI: function(){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.setVisible(false);
                                return this.setString("0胡息");
                            }
                        },
                        addPlayer: function(){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                return this.setString("0胡息");
                            }
                        },
                        removePlayer: function(){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = false;
                            }
                        },
                        initSceneData:function(){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = true;
                                var huXi = UpdateHuXi_leiyang(1);
                                if (!IsArrowVisible_leiyang()) {
                                    huXi = 0;
                                }
                                return this.setString(huXi + "胡息");
                            }
                        },
                        mjhand:function(){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = true;
                            }
                        },
                        HZChiCard:function(){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                var huXi = UpdateHuXi_leiyang(1);
                                return this.setString(huXi + "胡息");
                            }
                        },
                        MJPeng:function(){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                var huXi = UpdateHuXi_leiyang(1);
                                return this.setString(huXi + "胡息");
                            }
                        },
                        HZGangCard:function(){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                var huXi = UpdateHuXi_leiyang(1);
                                return this.setString(huXi + "胡息");
                            }
                        },
                        HZWeiCard:function(){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                var huXi = UpdateHuXi_leiyang(1);
                                return this.setString(huXi + "胡息");
                            }
                        }
                    }
                },
                name_bg:{_visible:false},
                timeImg:{
                    _visible:false,
                    _event:{
                        initSceneData: function(eD) {
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = curPlayerIsMe_leiyang(1);
                            }
                        },
                        mjhand: function(eD) {
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = curPlayerIsMe_leiyang(1);
                            }
                        },
                        onlinePlayer: function(eD) {
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = curPlayerIsMe_leiyang(1) && IsArrowVisible_leiyang();
                            }
                        },
                        waitPut: function(eD) {
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = curPlayerIsMe_leiyang(1);
                            }
                        },
                        HZNewCard: function(ed){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = curPlayerIsMe_leiyang(1);
                            }
                        },
                        MJPeng: function(eD) {
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = curPlayerIsMe_leiyang(1);
                            }
                        },
                        HZChiCard: function(eD) {
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = curPlayerIsMe_leiyang(1);
                            }
                        },
                        HZGangCard: function(eD) {
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = curPlayerIsMe_leiyang(1);
                            }
                        },
                        HZWeiCard: function(eD) {
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = curPlayerIsMe_leiyang(1);
                            }
                        },
                        MJPut: function(eD){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = curPlayerIsMe_leiyang(1);
                            }
                        },
                        roundEnd: function(eD){
                            if(MjClient.MaxPlayerNum_leiyang == 4) {
                                this.visible = false;
                            }
                        }
                    },
                    time:{
                        _run: function() {
                            this.setString("00");
                        },
                        _event: {
                            initSceneData: function(eD) {
                                if(MjClient.MaxPlayerNum_leiyang == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_leiyang(1)) {
                                        arrowbkNumberUpdate(this);
                                        this.setString("00");
                                    }
                                }
                            },
                            mjhand: function(eD) {
                                if(MjClient.MaxPlayerNum_leiyang == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_leiyang(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            MJPeng: function() {
                                if(MjClient.MaxPlayerNum_leiyang == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_leiyang(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            HZNewCard: function(){
                                if(MjClient.MaxPlayerNum_leiyang == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_leiyang(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            HZGangCard: function(){
                                if(MjClient.MaxPlayerNum_leiyang == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_leiyang(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            HZChiCard: function() {
                                if(MjClient.MaxPlayerNum_leiyang == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_leiyang(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            HZWeiCard: function(){
                                if(MjClient.MaxPlayerNum_leiyang == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_leiyang(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            MJPut: function(msg) {
                                if(MjClient.MaxPlayerNum_leiyang == 4) {
                                    if (curPlayerIsMe_leiyang(1)) {
                                        this.stopAllActions();
                                        stopEffect(playTimeUpEff);
                                        playTimeUpEff = null;
                                        this.setString("00");
                                    }
                                }
                            },
                            onlinePlayer: function(){
                                if(MjClient.MaxPlayerNum_leiyang == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    var pl = getUIPlayer_leiyang(1);
                                    if (pl && pl.onLine && curPlayerIsMe_leiyang(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            roundEnd: function() {
                                if(MjClient.MaxPlayerNum_leiyang == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                }
                            }
                        }
                    }
                }
            },
            play_tips: {
                _layout: [[0.2, 0.2], [0.8, 0.25], [0, 0.5]],
                _run: function () {
                    this.zIndex = actionZindex;
                },
                _visible:false,
            },
            ready: {
                _layout: [[0.07, 0.07],[0.5, 0.5],[2.5, -2.5]],
                _run: function() {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        GetReadyVisible_leiyang(this, 1);
                    }
                },
                _event: {
                    startShuffleCards:function (d) {
                        GetReadyVisible_paohuzi(this, -1);
                    },
                    moveHead: function() {
                        if(MjClient.MaxPlayerNum_leiyang == 4) {
                            GetReadyVisible_leiyang(this, -1);
                        }
                    },
                    addPlayer: function() {
                        if(MjClient.MaxPlayerNum_leiyang == 4) {
                            GetReadyVisible_leiyang(this, 1);
                        }
                    },
                    removePlayer: function() {
                        if(MjClient.MaxPlayerNum_leiyang == 4) {
                            // GetReadyVisible_leiyang(this, 1);
                            this.visible = false;
                        }
                    },
                    onlinePlayer: function() {
                        if(MjClient.MaxPlayerNum_leiyang == 4) {
                            GetReadyVisible_leiyang(this, 1);
                        }
                    }
                }
            },
            replayNode:{
                _visible: true,
                _layout:[[0.1, 0.1], [0.85, 0.05], [0, 0]]
            },
            eatNode: {
                _visible: true,
                _layout : [[0.14, 0.14], [0.98, 0.23], [0, 0]]
            },
            outNode: {
                _visible: true,
                _layout : [[0.14, 0.14], [0.88, 0.18], [0, 0]]
            },
            put: {
                _visible: false,
                //_layout : [[0.35, 0.35],[0.73, 0.6],[0, 0]],
                _run:function()
                {
                    setWgtLayout(this, [0.35, 0.35],[0.73, 0.6],[0, 0]);
                    var userData = {scale:this.getScale(), pos:this.getPosition()};
                    this.setUserData(userData);
                },

                _event:{
                    MJPut: function(eD) {
                        this.loadTexture("playing/paohuzi/chupai_bj.png");
                    },
                    HZNewCard: function(eD){
                        this.loadTexture("playing/paohuzi/mopai_bj.png");
                    }
                }
            },
            out0: {
                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        clearCardUI_leiyang(this, 1);
                    }
                },
                clearCardArr: function(){
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        var eatNode = this.getChildByName("eatNode");
                        eatNode.removeAllChildren();
                        var outNode = this.getChildByName("outNode");
                        outNode.removeAllChildren();
                        RemovePutCardOut_leiyang(true);
                    }
                },
                initSceneData: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        SetUserVisible_LiuHuQiang(this, 1);
                        InitUserHandUI_LiuHuQiang(this, 1);
                        InitUserCoinAndName_leiyang(this, 1);
                        DealOffLineCard_leiyang(this, 1);
                    }
                },
                addPlayer: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        SetUserVisible_LiuHuQiang(this, 1);
                        InitUserCoinAndName_leiyang(this, 1);
                    }
                },
                removePlayer: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        SetUserVisible_LiuHuQiang(this, 1);
                        InitUserCoinAndName_leiyang(this, 1);
                    }
                },
                mjhand: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        InitUserHandUI_LiuHuQiang(this, 1);
                        InitUserCoinAndName_leiyang(this, 1);
                    }
                },
                HZNewCard: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        if (typeof(eD) == "number") {
                            eD = {newCard: eD};
                        }
                        DealNewCard_leiyang(this, eD, 1);
                    }
                },
                roundEnd: function() {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        InitUserCoinAndName_leiyang(this, 1);
                        MjClient.playui.ResetOtherCard(this, 1);
                    }
                },
                waitPut: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        DealWaitPut(this, eD, 1);
                    }
                },
                MJPut: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        DealPutCard_leiyang(this, eD, 1);
                    }
                },
                HZChiCard: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        DealChiCard_leiyang(this, eD, 1);
                    }
                },
                HZGangCard: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        DealGangCard_leiyang(this, eD, 1);
                    }
                },
                MJPeng: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        DealPengCard_leiyang(this, eD, 1);
                    }
                },
                HZWeiCard: function(eD){
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        DealWeiCard_leiyang(this, eD, 1);
                    }
                },
                MJHu: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        DealHu_leiyang(this, eD, 1);
                    }
                },
                onlinePlayer: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        setUserOffline_leiyang(this, 1);
                    }
                },
                playerStatusChange: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        setUserOffline_leiyang(this, 1);
                    }
                },
                MJFlower: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        HandleMJFlower(this, eD, 1);
                    }
                },
                MJTing: function (eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        HandleMJTing(this, eD, 1);
                    }
                },
                waitJiazhu:function (msg) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        postEvent("returnPlayerLayer");
                        /*
                         弹窗加注
                         */
                        var layer = new jiaZhuXuzhouLayer(function () {
                            //弹窗等待
                            MjClient.playui._jiazhuWait.visible = true;
                        });
                        MjClient.playui.addChild(layer, 99);
                        if (MjClient.webViewLayer != null) {
                            MjClient.webViewLayer.close();
                        }
                    }
                },
                HZPickCard:function (eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        if (MjClient.rePlayVideo != -1) {
                            var pl = getUIPlayer_leiyang(1);
                            if (eD.uid == pl.info.uid) {
                                MjClient.OtherHandArr[1] = MjClient.majiang.sortHandCardSpecial(pl.mjhand)
                            }
                        }

                        RemovePutCardOut_leiyang(true);
                        MjClient.playui.ResetHandCard(this, 1);
                    }
                },
                HZAddCards:function (eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        DealAddCard_leiyang(this, eD, 1);
                    }
                },
                HZCheckRaise:function (msg) {
                    if(MjClient.MaxPlayerNum_leiyang == 4) {
                        ShowPutCardIcon();
                        //MjClient.playui.EatVisibleCheck();

                        var tData = MjClient.data.sData.tData;
                        var pl = getUIPlayer_leiyang(1);
                        if (!pl) {
                            return;
                        }
                        if (pl.jiazhuNum == 2 && MjClient.rePlayVideo == -1) {
                            if (SelfUid() == pl.info.uid) {
                                var layer = new laZhangLayer();
                                MjClient.playui.addChild(layer, 99);
                                if (MjClient.webViewLayer != null) {
                                    MjClient.webViewLayer.close();
                                }
                            }
                            else {
                                MjClient.playui._jiazhuWait.visible = true;
                            }
                        } else if (pl.jiazhuNum == 1) {
                            MjClient.majiang.setJiaZhuNum(node, getUIPlayer_leiyang(off));
                        }
                    }
                }
            }
        },
        right: {
            head: {
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function() {
                            showUserZhuangLogo_leiyang(this, getRightNodeOff_ER());
                        },
                        initSceneData: function() {
                            if (IsArrowVisible_leiyang()) showUserZhuangLogo_leiyang(this, getRightNodeOff_ER());
                        },
                        mjhand: function(){
                            if (IsArrowVisible_leiyang()) showUserZhuangLogo_leiyang(this, getRightNodeOff_ER());
                        }
                    }
                },
                chatbg: {
                    _run: function() {
                        this.getParent().zIndex = 500;
                    },
                    chattext: {
                        _event: {
                            MJChat: function(msg) {
                                showUserChat_leiyang(this, getRightNodeOff_ER(), msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat_leiyang(this, getRightNodeOff_ER(), MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    showPlayerInfo_leiyang(getRightNodeOff_ER(), btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead_leiyang(this, d, getRightNodeOff_ER());
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon_leiyang(this,getRightNodeOff_ER());
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon_leiyang(this,getRightNodeOff_ER());
                    }
                },
                _run: function () {
                    showFangzhuTagIcon_leiyang(this,getRightNodeOff_ER());
                },
                score_bg:{_visible:false},
                huxi:{
                    _visible: false,
                    _event:{
                        clearCardUI: function(){
                            this.setVisible(false);
                            return this.setString("0胡息");
                        },
                        addPlayer: function(){
                            return this.setString("0胡息");
                        },
                        removePlayer: function(){
                            this.visible = false;
                        },
                        initSceneData:function(){
                            this.visible = true;
                            var huXi = UpdateHuXi_leiyang(getRightNodeOff_ER());
                            if(!IsArrowVisible_leiyang()){
                                huXi = 0;
                            }
                            return this.setString(huXi + "胡息");
                        },
                        mjhand:function(){
                            this.visible = true;
                        },
                        HZChiCard:function(){
                            var huXi = UpdateHuXi_leiyang(getRightNodeOff_ER());
                            return this.setString(huXi + "胡息");
                        },
                        MJPeng:function(){
                            var huXi = UpdateHuXi_leiyang(getRightNodeOff_ER());
                            return this.setString(huXi + "胡息");
                        },
                        HZGangCard:function(){
                            var huXi = UpdateHuXi_leiyang(getRightNodeOff_ER());
                            return this.setString(huXi + "胡息");
                        },
                        HZWeiCard:function(){
                            var huXi = UpdateHuXi_leiyang(getRightNodeOff_ER());
                            return this.setString(huXi + "胡息");
                        }
                    }
                },
                jiaZhu: {
                   _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        clearCardUI: function(eD) {
                            this.visible = false;
                        }
                    }
                },
                jiaZhuTip: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        clearCardUI: function(eD) {
                            this.visible = false;
                        }
                    }
                },
                name_bg:{_visible:false},
                timeImg:{
                    _visible:false,
                    _event:{
                        initSceneData: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(getRightNodeOff_ER());
                        },
                        mjhand: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(getRightNodeOff_ER());
                        },
                        onlinePlayer: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(getRightNodeOff_ER()) && IsArrowVisible_leiyang();
                        },
                        waitPut: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(getRightNodeOff_ER());
                        },
                        HZNewCard: function(ed){
                            this.visible = curPlayerIsMe_leiyang(getRightNodeOff_ER());
                        },
                        MJPeng: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(getRightNodeOff_ER());
                        },
                        HZChiCard: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(getRightNodeOff_ER());
                        },
                        HZGangCard: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(getRightNodeOff_ER());
                        },
                        HZWeiCard: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(getRightNodeOff_ER());
                        },
                        MJPut: function(eD){
                            this.visible = curPlayerIsMe_leiyang(getRightNodeOff_ER());
                        },
                        roundEnd: function(eD){
                            this.visible = false;
                        }
                    },
                    time:{
                        _run: function() {
                            this.setString("00");
                        },
                        _event: {
                            initSceneData: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(getRightNodeOff_ER())){
                                    arrowbkNumberUpdate(this);
                                    this.setString("00");
                                }
                            },
                            mjhand: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(getRightNodeOff_ER())){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPeng: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(getRightNodeOff_ER())){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZNewCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(getRightNodeOff_ER())){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZGangCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(getRightNodeOff_ER())){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZChiCard: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(getRightNodeOff_ER())){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZWeiCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(getRightNodeOff_ER())){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPut: function(msg) {
                                if (curPlayerIsMe_leiyang(getRightNodeOff_ER())) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    this.setString("00");
                                }
                            },
                            onlinePlayer: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                var pl = getUIPlayer_leiyang(getRightNodeOff_ER());
                                if(pl && pl.onLine && curPlayerIsMe_leiyang(getRightNodeOff_ER())){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            roundEnd: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                            }
                        }
                    }
                }
            },
            play_tips: {
                _layout: [[0.2, 0.2], [0.8, 0.7], [0, 0.5]],
                _run: function () {
                    this.zIndex = actionZindex;
                },
                _visible:false,
            },
            ready: {
                _layout: [[0.07, 0.07],[0.5, 0.5],[2.5, 2.5]],
                _run: function() {
                    GetReadyVisible_leiyang(this, getRightNodeOff_ER());
                },
                _event: {
                    startShuffleCards:function (d) {
                        GetReadyVisible_paohuzi(this, -1);
                    },
                    moveHead: function() {
                        GetReadyVisible_leiyang(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible_leiyang(this, getRightNodeOff_ER());
                    },
                    removePlayer: function() {
                        // GetReadyVisible_leiyang(this, getRightNodeOff_ER());
                        this.visible = false;
                    },
                    onlinePlayer: function() {
                        GetReadyVisible_leiyang(this, getRightNodeOff_ER());
                    }
                }
            },
            replayNode:{
                _visible: true,
                _layout : [[0.1, 0.1], [0.85, 0.81], [0, 0]]
            },
            eatNode: {
                _visible: true,
                _layout : [[0.14, 0.14], [0.98, 0.74], [0, 0]]
            },
            outNode: {
                _visible: true,
                _layout : [[0.14, 0.14], [0.88, 0.82], [0, 0]],
                _run : function(){
                    if(MjClient.data.sData.tData.maxPlayer == 2){
                        setWgtLayout(this, [0.14, 0.14], [0.24, 0.82], [0, 0]);
                    }
                }
            },
            put: {
                _visible: false,
                //_layout : [[0.35, 0.35],[0.73, 0.75],[0, 0]],
                _run:function()
                {
                    setWgtLayout(this, [0.35, 0.35],[0.73, 0.75],[0, 0]);
                    var userData = {scale:this.getScale(), pos:this.getPosition()};
                    this.setUserData(userData);
                },

                _event:{
                    MJPut: function(eD) {
                        this.loadTexture("playing/paohuzi/chupai_bj.png");
                    },
                    HZNewCard: function(eD){
                        this.loadTexture("playing/paohuzi/mopai_bj.png");
                    }
                }
            },
            out0: {
                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    clearCardUI_leiyang(this, getRightNodeOff_ER());
                },
                clearCardArr: function(){
                    var eatNode = this.getChildByName("eatNode");
                    eatNode.removeAllChildren();
                    var outNode = this.getChildByName("outNode");
                    outNode.removeAllChildren();
                    RemovePutCardOut_leiyang(true);
                },
                initSceneData: function(eD) {
                    SetUserVisible_LiuHuQiang(this, getRightNodeOff_ER());
                    InitUserHandUI_LiuHuQiang(this, getRightNodeOff_ER());
                    InitUserCoinAndName_leiyang(this, getRightNodeOff_ER());
                    DealOffLineCard_leiyang(this,getRightNodeOff_ER());
                },
                addPlayer: function(eD) {
                    SetUserVisible_LiuHuQiang(this, getRightNodeOff_ER());
                    InitUserCoinAndName_leiyang(this, getRightNodeOff_ER());
                },
                removePlayer: function(eD) {
                    SetUserVisible_LiuHuQiang(this, getRightNodeOff_ER());
                    InitUserCoinAndName_leiyang(this, getRightNodeOff_ER());
                },
                mjhand: function(eD) {
                    InitUserHandUI_LiuHuQiang(this, getRightNodeOff_ER());
                    InitUserCoinAndName_leiyang(this, getRightNodeOff_ER());
                },
                HZNewCard: function(eD) {
                    if (typeof(eD) == "number") {
                        eD = {newCard: eD};
                    }
                    DealNewCard_leiyang(this,eD,getRightNodeOff_ER());
                },
                roundEnd: function() {
                    InitUserCoinAndName_leiyang(this, getRightNodeOff_ER());
                    MjClient.playui.ResetOtherCard(this, getRightNodeOff_ER());
                },
                waitPut: function(eD) {
                    DealWaitPut(this, eD, getRightNodeOff_ER());
                },
                MJPut: function(eD) {
                    DealPutCard_leiyang(this, eD, getRightNodeOff_ER());
                },
                HZChiCard: function(eD) {
                    DealChiCard_leiyang(this, eD, getRightNodeOff_ER());
                },
                HZGangCard: function(eD) {
                    DealGangCard_leiyang(this, eD, getRightNodeOff_ER());
                },
                MJPeng: function(eD) {
                    DealPengCard_leiyang(this, eD, getRightNodeOff_ER());
                },
                HZWeiCard: function(eD){
                    DealWeiCard_leiyang(this, eD, getRightNodeOff_ER());
                },
                MJHu: function(eD) {
                    DealHu_leiyang(this, eD, getRightNodeOff_ER());
                },
                onlinePlayer: function(eD) {
                    setUserOffline_leiyang(this, getRightNodeOff_ER());
                },
                playerStatusChange: function(eD) {
                    setUserOffline_leiyang(this, getRightNodeOff_ER());
                },
                MJFlower: function(eD) {
                    HandleMJFlower(this, eD, getRightNodeOff_ER());
                },
                MJTing: function (eD) {
                    HandleMJTing(this, eD, getRightNodeOff_ER());
                },
                waitJiazhu:function (msg) {
                    postEvent("returnPlayerLayer");
                    /*
                     弹窗加注
                     */
                    var layer = new jiaZhuXuzhouLayer(function(){
                        //弹窗等待
                        MjClient.playui._jiazhuWait.visible = true;
                    });
                    MjClient.playui.addChild(layer,99);
                    if (MjClient.webViewLayer != null)
                    {
                        MjClient.webViewLayer.close();
                    }
                },
                HZPickCard:function (eD) {
                    if(MjClient.rePlayVideo != -1){
                        var pl = getUIPlayer_leiyang(getRightNodeOff_ER());
                        if(eD.uid == pl.info.uid) {
                            MjClient.OtherHandArr[getRightNodeOff_ER()] = MjClient.majiang.sortHandCardSpecial(pl.mjhand)
                        }
                    }

                    RemovePutCardOut_leiyang(true);
                    MjClient.playui.ResetHandCard(this,getRightNodeOff_ER());
                },
                HZAddCards:function (eD) {
                    DealAddCard_leiyang(this,eD, getRightNodeOff_ER());
                },
                HZCheckRaise:function (msg) {
                    ShowPutCardIcon();
                    //MjClient.playui.EatVisibleCheck();

                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer_leiyang(getRightNodeOff_ER());
                    if(!pl){
                        return;
                    }
                    if (pl.jiazhuNum == 2 && MjClient.rePlayVideo == -1)
                    {
                        if (SelfUid() == pl.info.uid) {
                            var layer = new laZhangLayer();
                            MjClient.playui.addChild(layer, 99);
                            if (MjClient.webViewLayer != null) {
                                MjClient.webViewLayer.close();
                            }
                        }
                        else
                        {
                            MjClient.playui._jiazhuWait.visible = true;
                        }
                    }else if(pl.jiazhuNum == 1){
                        MjClient.majiang.setJiaZhuNum(node, getUIPlayer_leiyang(off));
                    }
                }
            }
        },
        left: {
            _run:function () {
                if(MjClient.data.sData.tData.maxPlayer <= 2){
                    this.visible = false;
                }
            },
            head: {
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function() {
                            showUserZhuangLogo_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                        },
                        initSceneData: function() {
                            if (IsArrowVisible_leiyang()) showUserZhuangLogo_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                        },
                        mjhand: function(){
                            if (IsArrowVisible_leiyang()) showUserZhuangLogo_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                        }
                    }
                },
                chatbg: {
                    _run: function() {
                        this.getParent().zIndex = 500;
                    },
                    chattext: {
                        _event: {
                            MJChat: function(msg) {
                                showUserChat_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1, msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1, MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    showPlayerInfo_leiyang(MjClient.MaxPlayerNum_leiyang - 1, btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead_leiyang(this, d, MjClient.MaxPlayerNum_leiyang - 1);
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon_leiyang(this,MjClient.MaxPlayerNum_leiyang - 1);
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon_leiyang(this,MjClient.MaxPlayerNum_leiyang - 1);
                    }
                },
                _run: function () {
                    showFangzhuTagIcon_leiyang(this,MjClient.MaxPlayerNum_leiyang - 1);
                },
                score_bg:{_visible:false},
                huxi:{
                    _visible: false,
                    _event:{
                        clearCardUI: function(){
                            this.setVisible(false);
                            return this.setString("0胡息");
                        },
                        addPlayer: function(){
                            return this.setString("0胡息");
                        },
                        removePlayer: function(){
                            this.visible = false;
                        },
                        initSceneData:function(){
                            this.visible = true;
                            var huXi = UpdateHuXi_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                            if(!IsArrowVisible_leiyang()){
                                huXi = 0;
                            }
                            return this.setString(huXi + "胡息");
                        },
                        mjhand:function(){
                            this.visible = true;
                        },
                        HZChiCard:function(){
                            var huXi = UpdateHuXi_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                            return this.setString(huXi + "胡息");
                        },
                        MJPeng:function(){
                            var huXi = UpdateHuXi_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                            return this.setString(huXi + "胡息");
                        },
                        HZGangCard:function(){
                            var huXi = UpdateHuXi_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                            return this.setString(huXi + "胡息");
                        },
                        HZWeiCard:function(){
                            var huXi = UpdateHuXi_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                            return this.setString(huXi + "胡息");
                        },
                    }
                },
                jiaZhu: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        clearCardUI: function(eD) {
                            this.visible = false;
                        }
                    }
                },
                jiaZhuTip: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        clearCardUI: function(eD) {
                            this.visible = false;
                        }
                    }
                },
                name_bg:{_visible:false},
                timeImg:{
                    _visible:false,
                    _event:{
                        initSceneData: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                        },
                        mjhand: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                        },
                        onlinePlayer: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1) && IsArrowVisible_leiyang();
                        },
                        waitPut: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                        },
                        HZNewCard: function(ed){
                            this.visible = curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                        },
                        MJPeng: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                        },
                        HZChiCard: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                        },
                        HZGangCard: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                        },
                        HZWeiCard: function(eD) {
                            this.visible = curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                        },
                        MJPut: function(eD){
                            this.visible = curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                        },
                        roundEnd: function(eD){
                            this.visible = false;
                        }
                    },
                    time:{
                        _run: function() {
                            this.setString("00");
                        },
                        _event: {
                            initSceneData: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1)){
                                    arrowbkNumberUpdate(this);
                                    this.setString("00");
                                }
                            },
                            mjhand: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPeng: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZNewCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZGangCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZChiCard: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZWeiCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPut: function(msg) {
                                if (curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1)) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    this.setString("00");
                                }
                            },
                            onlinePlayer: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                var pl = getUIPlayer_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                                if(pl && pl.onLine && curPlayerIsMe_leiyang(MjClient.MaxPlayerNum_leiyang - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            roundEnd: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                            }
                        }
                    }
                }
            },
            play_tips: {
                _layout: [[0.2, 0.2], [0.2, 0.7], [0, 0.5]],
                _run: function () {
                    this.zIndex = actionZindex;
                },
                _visible:false,
            },
            ready: {
                _layout: [[0.07, 0.07],[0.5, 0.5],[-2.5, 2.5]],
                _run: function() {
                    GetReadyVisible_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                },
                _event: {
                    startShuffleCards:function (d) {
                        GetReadyVisible_paohuzi(this, -1);
                    },
                    moveHead: function() {
                        GetReadyVisible_leiyang(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                    },
                    removePlayer: function() {
                        // GetReadyVisible_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                        this.visible = false;
                    },
                    onlinePlayer: function() {
                        GetReadyVisible_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                    }
                }
            },
            replayNode:{
                _visible: true,
                _layout : [[0.1, 0.1], [0.15, 0.81], [0, 0]]
            },
            eatNode: {
                _visible: false,
                _layout : [[0.14, 0.14], [0.02, 0.74], [0, 0]],
                _run:function()
                {
                    if(isIPhoneX()){
                        setWgtLayout(this, [0.12, 0.12], [0.04, 0.74], [0, 0]);
                    }else{
                        setWgtLayout(this, [0.12, 0.12], [0.02, 0.74], [0, 0]);
                    }
                },
            },
            outNode: {
                _visible: false,
                _layout : [[0.14, 0.14], [0.12, 0.82], [0, 0]]
            },
            put: {
                _visible: false,
                //_layout: [[0.35, 0.35],[0.27,0.75],[0,0]],
                _run:function()
                {
                    setWgtLayout(this, [0.35, 0.35],[0.27,0.75],[0,0]);
                    var userData = {scale:this.getScale(), pos:this.getPosition()};
                    this.setUserData(userData);
                },

                _event:{
                    MJPut: function(eD) {
                        this.loadTexture("playing/paohuzi/chupai_bj.png");
                    },
                    HZNewCard: function(eD){
                        this.loadTexture("playing/paohuzi/mopai_bj.png");
                    }
                }
            },
            out0: {
                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    clearCardUI_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                },
                clearCardArr: function(){
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    var eatNode = this.getChildByName("eatNode");
                    eatNode.removeAllChildren();
                    var outNode = this.getChildByName("outNode");
                    outNode.removeAllChildren();
                    RemovePutCardOut_leiyang(true);
                },
                initSceneData: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    SetUserVisible_LiuHuQiang(this, MjClient.MaxPlayerNum_leiyang - 1);
                    InitUserHandUI_LiuHuQiang(this, MjClient.MaxPlayerNum_leiyang - 1);
                    InitUserCoinAndName_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                    DealOffLineCard_leiyang(this,MjClient.MaxPlayerNum_leiyang - 1);
                },
                addPlayer: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    SetUserVisible_LiuHuQiang(this, MjClient.MaxPlayerNum_leiyang - 1);
                    InitUserCoinAndName_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                },
                removePlayer: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    SetUserVisible_LiuHuQiang(this, MjClient.MaxPlayerNum_leiyang - 1);
                    InitUserCoinAndName_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                },
                mjhand: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    InitUserHandUI_LiuHuQiang(this, MjClient.MaxPlayerNum_leiyang - 1);
                    InitUserCoinAndName_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                },
                HZNewCard: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    console.log("客户端发牌组合...... ");
                    if (typeof(eD) == "number") {
                        eD = {newCard: eD};
                    }
                    DealNewCard_leiyang(this,eD,MjClient.MaxPlayerNum_leiyang - 1);
                },
                roundEnd: function() {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    InitUserCoinAndName_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                    MjClient.playui.ResetOtherCard(this, MjClient.MaxPlayerNum_leiyang - 1);
                },
                waitPut: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    DealWaitPut(this, eD, MjClient.MaxPlayerNum_leiyang - 1);
                },
                MJPut: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    DealPutCard_leiyang(this, eD, MjClient.MaxPlayerNum_leiyang - 1);
                },
                HZChiCard: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    DealChiCard_leiyang(this, eD, MjClient.MaxPlayerNum_leiyang - 1);
                },
                HZPaoCard: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    DealPaoCard_leiyang(this, eD, MjClient.MaxPlayerNum_leiyang - 1);
                },
                HZGangCard: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    DealGangCard_leiyang(this, eD, MjClient.MaxPlayerNum_leiyang - 1);
                },
                MJPeng: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    DealPengCard_leiyang(this, eD, MjClient.MaxPlayerNum_leiyang - 1);
                },
                HZWeiCard: function(eD){
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    DealWeiCard_leiyang(this, eD, MjClient.MaxPlayerNum_leiyang - 1);
                },
                MJHu: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    DealHu_leiyang(this, eD, MjClient.MaxPlayerNum_leiyang - 1);
                },
                onlinePlayer: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    setUserOffline_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                },
                playerStatusChange: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    setUserOffline_leiyang(this, MjClient.MaxPlayerNum_leiyang - 1);
                },
                MJFlower: function(eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    HandleMJFlower(this, eD, MjClient.MaxPlayerNum_leiyang - 1);
                },
                MJTing: function (eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    HandleMJTing(this, eD, MjClient.MaxPlayerNum_leiyang - 1);
                },
                HZPickCard:function (eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    if(MjClient.rePlayVideo != -1) {
                        var pl = getUIPlayer_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                        if(eD.uid == pl.info.uid){
                            MjClient.OtherHandArr[MjClient.MaxPlayerNum_leiyang - 1] = MjClient.majiang.sortHandCardSpecial(pl.mjhand)
                        }
                    }
                    RemovePutCardOut_leiyang(true);
                    MjClient.playui.ResetHandCard(this,MjClient.MaxPlayerNum_leiyang - 1);
                },
                HZAddCards:function (eD) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    DealAddCard_leiyang(this,eD, MjClient.MaxPlayerNum_leiyang - 1);
                },
                HZCheckRaise:function (msg) {
                    if(MjClient.MaxPlayerNum_leiyang == 2){
                        return;
                    }
                    ShowPutCardIcon();
                    //MjClient.playui.EatVisibleCheck();

                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer_leiyang(MjClient.MaxPlayerNum_leiyang - 1);
                    if(!pl){
                        return;
                    }
                    if (pl.jiazhuNum == 2 && MjClient.rePlayVideo == -1)
                    {
                        if (SelfUid() == pl.info.uid) {
                            var layer = new laZhangLayer();
                            MjClient.playui.addChild(layer, 99);
                            if (MjClient.webViewLayer != null) {
                                MjClient.webViewLayer.close();
                            }
                        }
                        else
                        {
                            MjClient.playui._jiazhuWait.visible = true;
                        }
                    }else if(pl.jiazhuNum == 1){
                        MjClient.majiang.setJiaZhuNum(node, getUIPlayer_leiyang(off));
                    }
                }
            }
        },
        eat: {
            chi: {
                _visible: false,
                _layout: [[0, 0.1],[0.5, 0],[1.3, 3.8]],
                bg_img:{
                    _run:function(){
                        var _Image_light_scale = this.getScale();
                        
                        var a = cc.scaleTo(0.5,_Image_light_scale*1.0);
                        var aa = cc.fadeIn(0.5);
                        var a1 = cc.scaleTo(1,_Image_light_scale*1.3);
                        var a2 = cc.fadeOut(1);
                        var a3 = cc.callFunc(function(){
                            //this.setOpacity(255);
                            this.setScale(_Image_light_scale*0.95);
                        }.bind(this));
            
                        this.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2).easing(cc.easeCubicActionOut()),a3,cc.delayTime(0.2)).repeatForever());
                    
                    }

                },
                _touch: function(btn, eT) {
                    if (eT == 2){
                        showSelectEatCards_leiyang(this,btn.tag);
                        // MJChiCardchange_leiyang();
                    }
                }
            },
            noTing : {
                _visible : false,
                _layout: [[0, 0.1],[0.5, 0],[4.6, 2.5]],
                _touch: function(btn, eT) {
                    if (eT == 2){
                        // hideTingBtn();
                    }
                }
            },
            peng: {
                _visible: false,
                _layout: [[0, 0.1],[0.5, 0],[0, 2.5]],
                bg_img:{
                    _run:function(){
                        var _Image_light_scale = this.getScale();
                        
                        var a = cc.scaleTo(0.5,_Image_light_scale*1.0);
                        var aa = cc.fadeIn(0.5);
                        var a1 = cc.scaleTo(1,_Image_light_scale*1.3);
                        var a2 = cc.fadeOut(1);
                        var a3 = cc.callFunc(function(){
                            //this.setOpacity(255);
                            this.setScale(_Image_light_scale*0.95);
                        }.bind(this));
            
                        this.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2).easing(cc.easeCubicActionOut()),a3,cc.delayTime(0.2)).repeatForever());
                    
                    }

                },
                _touch: function(btn, eT) {
                        console.log(">>>> lf，点击碰按钮");
                        if (eT == 2){
                            HZPengToServer_leiyang();
                            setChiVisible_leiyang();
                        }
                }
            },
            guo: {
                _visible: false,
                _layout: [[0, 0.1],[0.5, 0],[4.6, 2.5]],
                _touch: function(btn, eT) {
                    if (eT == 2){
                        cc.log("11111111111111111111:");
                        MjClient.MJPass2NetForleiyang();
                        setChiVisible_leiyang();//add by maoyu
                    }
                }
            },
            hu: {
                _visible: false,
                _layout: [[0, 0.1],[0.5, 0],[-3, 2.5]],
                bg_img:{
                    _run:function(){
                        var _Image_light_scale = this.getScale();
                        
                        var a = cc.scaleTo(0.5,_Image_light_scale*1.0);
                        var aa = cc.fadeIn(0.5);
                        var a1 = cc.scaleTo(1,_Image_light_scale*1.3);
                        var a2 = cc.fadeOut(1);
                        var a3 = cc.callFunc(function(){
                            //this.setOpacity(255);
                            this.setScale(_Image_light_scale*0.95);
                        }.bind(this));
            
                        this.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2).easing(cc.easeCubicActionOut()),a3,cc.delayTime(0.2)).repeatForever());
                    
                    }

                },
                _touch: function(btn, eT) {
                    if (eT == 2) {
                        MJHuToServer_leiyang();
                        setChiVisible_leiyang();//add by maoyu
                    }
                }
            },
            cancel: {
                _visible: false,
                _layout: [
                    [0, 0.16],
                    [0.78, 0.1],
                    [0, 1.12]
                ],
                _touch: function(btn, eT) {
                    if (eT == 2) {
                        btn.visible = false;
                        var parent = btn.getParent();
                        parent.getChildByName("chiSelect").visible = false;
                        parent.getChildByName("biSelect").visible = false;
                        parent.getChildByName("biSelect1").visible = false;
                        resetChiParam_leiyang();
                        MjClient.playui.EatVisibleCheck();
                        // MjClient.playui.CardLayoutRestore(MjClient.playui._downNode, 0);
                    }
                }
            },
            wangDiao:{
                _visible: false,
                _layout: [[0, 0.1],[0.5, 0],[0, 2.5]],
                bg_img:{
                    _run:function(){
                        var _Image_light_scale = this.getScale();
                        
                        var a = cc.scaleTo(0.5,_Image_light_scale*1.0);
                        var aa = cc.fadeIn(0.5);
                        var a1 = cc.scaleTo(1,_Image_light_scale*1.3);
                        var a2 = cc.fadeOut(1);
                        var a3 = cc.callFunc(function(){
                            //this.setOpacity(255);
                            this.setScale(_Image_light_scale*0.95);
                        }.bind(this));
            
                        this.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2).easing(cc.easeCubicActionOut()),a3,cc.delayTime(0.2)).repeatForever());
                    
                    }

                },
                _touch: function(btn, eT) {
                    console.log(">>>> lf，点击碰按钮");
                    if (eT == 2) {
                        HZWangChuangToServer_leiyang(1);
                        setChiVisible_leiyang();//add by maoyu
                    }
                }
            },
            wangChuang:{
                _visible: false,
                _layout: [[0, 0.1],[0.5, 0],[0, 2.5]],
                bg_img:{
                    _run:function(){
                        var _Image_light_scale = this.getScale();
                        
                        var a = cc.scaleTo(0.5,_Image_light_scale*1.0);
                        var aa = cc.fadeIn(0.5);
                        var a1 = cc.scaleTo(1,_Image_light_scale*1.3);
                        var a2 = cc.fadeOut(1);
                        var a3 = cc.callFunc(function(){
                            //this.setOpacity(255);
                            this.setScale(_Image_light_scale*0.95);
                        }.bind(this));
            
                        this.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2).easing(cc.easeCubicActionOut()),a3,cc.delayTime(0.2)).repeatForever());
                    
                    }

                },
                _touch: function(btn, eT) {
                    console.log(">>>> lf，点击碰按钮");
                    if (eT == 2) {
                        HZWangChuangToServer_leiyang(2);
                        setChiVisible_leiyang();//add by maoyu
                    }
                }
            },
            wangZha:{
                _visible: false,
                _layout: [[0, 0.1],[0.5, 0],[0, 2.5]],
                bg_img:{
                    _run:function(){
                        var _Image_light_scale = this.getScale();
                        
                        var a = cc.scaleTo(0.5,_Image_light_scale*1.0);
                        var aa = cc.fadeIn(0.5);
                        var a1 = cc.scaleTo(1,_Image_light_scale*1.3);
                        var a2 = cc.fadeOut(1);
                        var a3 = cc.callFunc(function(){
                            //this.setOpacity(255);
                            this.setScale(_Image_light_scale*0.95);
                        }.bind(this));
            
                        this.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2).easing(cc.easeCubicActionOut()),a3,cc.delayTime(0.2)).repeatForever());
                    
                    }

                },
                _touch: function(btn, eT) {
                    console.log(">>>> lf，点击碰按钮");
                    if (eT == 2) {
                        HZWangChuangToServer_leiyang(4);
                        setChiVisible_leiyang();//add by maoyu
                    }
                }
            },
            chiSelect: {
                _visible: false,
                _layout: [[0.3,0.3],[0.5,0.72],[0,0]],
            },
            biSelect: {
                _visible: false,
                _layout: [[0.3,0.3],[0.5,0.72],[0,0]],
            },
            biSelect1: {
                _visible: false,
                _layout: [[0.3,0.3],[0.5,0.72],[0,0]],
            },
            _event: {
                clearCardUI: function() {
                    //add by sking
                    cc.log("ting yu no ting hide --------by sking");
                    MjClient.playui.EatVisibleCheck();
                },
                MJPass: function(eD) {
                    console.log("HHH :，MJPass------");
                    setQiHuState_leiyang();
                    MjClient.playui.EatVisibleCheck();
                },
                mjhand: function(eD) {
                    console.log("HHH :，mjhand------");
                    MjClient.playui.EatVisibleCheck();
                },
                waitPut: function(eD) {
                    console.log("HHH :，waitPut------");
                    MjClient.playui.EatVisibleCheck();
                },
                HZNewCard: function(eD) {
                    console.log("HHH :HZNewCard------");
                    setQiHuState_leiyang();
                    //放在每个方向节点上去做，因为摸到王霸牌的时候，有个显示动作，动作显示完之后
                    //在显示各种操作按钮
                    if(eD.isCommon && eD.newCard){
                        MjClient.playui.EatVisibleCheck();
                    }
                },
                HZGangCard: function(eD) {
                    console.log("HHH :HZGangCard------");
                    setQiHuState_leiyang();
                    MjClient.playui.EatVisibleCheck();
                },
                MJPut: function(eD) {
                    console.log("HHH :，MJPut------");
                    setQiHuState_leiyang();
                    MjClient.playui.EatVisibleCheck();
                },
                MJPeng: function(eD) {
                    console.log("HHH :，MJPeng------");
                    setQiHuState_leiyang();
                    MjClient.playui.EatVisibleCheck();
                },
                HZChiCard: function(eD) {
                    console.log("HHH :HZChiCard------");
                    setQiHuState_leiyang();
                    MjClient.playui.EatVisibleCheck();
                },
                HZWeiCard: function(eD) {
                    console.log("HHH :HZWeiCard------");
                    setQiHuState_leiyang();
                },
                roundEnd: function(eD) {
                    console.log("HHH :，roundEnd------");
                    MjClient.playui.EatVisibleCheck();
                },
                initSceneData: function(eD) {
                    function delayExe()
                    {
                        cc.log("MjClient.playui == >");
                        cc.log(MjClient.playui);
                        MjClient.playui.EatVisibleCheck();
                    }
                    this.runAction(cc.sequence(cc.delayTime(0.1),cc.callFunc(delayExe)));
                },
                HZWang:function(eD){
                    console.log("HHH :HZWang------");
                    MjClient.playui.EatVisibleCheck();                    
                },
                HZWangChuang:function(eD){
                    console.log("HHH :HZWangChuang------");
                    console.log("HHH :HZWangChuang------");
                    if(MjClient.rePlayVideo != -1){
                        MjClient.playui.EatVisibleCheck();
                    }                   
                },
            }
        },
        finger:{
            _visible: false,
            _run: function () {
                setWgtLayout(this,[0.18, 0.18], [0.68, 0.3], [0.7, -0.1]);
            },
            _event:{
                MJHu:function(){
                    this.visible = false;
                }
            }
        },
        li_btn: {
            _layout: [[0.09, 0.09],[0.94, 0.23],[0, -0.2]],
            _run: function () {
                if(isIPhoneX()){
                    setWgtLayout(this,[0.09, 0.09],[0.07, 0.5],[0, -0.2]);
                }
            },
            _click: function() {
                var tData = MjClient.data.sData.tData;
                if(tData.tState != TableState.waitPut && tData.tState != TableState.waitEat && tData.tState != TableState.waitCard){
                    return;
                }
                MjClient.HandCardArr = MjClient.majiang.sortByUser();
                MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);
            },
            _event: {
                mjhand:function (eD) {
                    this.setVisible(true);
                    if(MjClient.MaxPlayerNum_leiyang == 4){
                        this.setVisible(false);
                    }
                },
                initSceneData: function(eD) {
                    var tData = MjClient.data.sData.tData;
                    if(tData.tState != TableState.waitPut && tData.tState != TableState.waitEat && tData.tState != TableState.waitCard){
                        return;
                    }
                    this.setVisible(true);
                    if(MjClient.MaxPlayerNum_leiyang == 4){
                        this.setVisible(false);
                    }
                },
            }
        },
        chat_btn: {
            _layout: [[0.09, 0.09],[0.97, 0.5],[0, -0.2]],
            _click: function() {
                var chatlayer = new ChatLayer();
                MjClient.Scene.addChild(chatlayer);
            }
        },
        voice_btn: {
            _layout: [[0.09, 0.09],[0.91, 0.5],[0, -0.2]],
            _run: function() {
                initVoiceData();
                cc.eventManager.addListener(getTouchListener(), this);
                if(MjClient.isShenhe) this.visible=false;
            },
            _touch: function(btn, eT) {
                // 点击开始录音 松开结束录音,并且上传至服务器, 然后通知其他客户端去接受录音消息, 播放
                if (eT == 0) {
                    startRecord();
                } else if (eT == 2) {
                    endRecord();
                } else if (eT == 3) {
                    cancelRecord();
                }
            },
            _event: {
                cancelRecord: function() {
                    MjClient.native.HelloOC("cancelRecord !!!");
                },
                uploadRecord: function(filePath) {
                    if (filePath) {
                        MjClient.native.HelloOC("upload voice file");
                        MjClient.native.UploadFile(filePath, MjClient.remoteCfg.voiceUrl, "sendVoice");
                    } else {
                        MjClient.native.HelloOC("No voice file update");
                    }
                },
                sendVoice: function(fullFilePath) {
                    if (!fullFilePath) {
                        console.log("sendVoice No fileName");
                        return;
                    }

                    var getFileName = /[^\/]+$/;
                    var extensionName = getFileName.exec(fullFilePath);
                    var fileName = extensionName[extensionName.length - 1];
                    console.log("sfileName is:" + fileName);

                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "downAndPlayVoice",
                        uid: SelfUid(),
                        type: 3,
                        msg: fileName,
                        num: MjClient.data._JiaheTempTime//录音时长
                    });
                    MjClient.native.HelloOC("download file");
                },
                downAndPlayVoice: function(msg) {
                    MjClient.native.HelloOC("downloadPlayVoice ok");
                    MjClient.data._tempMessage = msg;
                    MjClient.native.HelloOC("mas is" + JSON.stringify(msg));
                    downAndPlayVoice_leiyang(msg.uid, msg.msg);
                }
            }
        },
        cutLine:{
            _visible: false,
            _run: function () {
                setWgtLayout(this,[1, 0.3], [0.5, 0.6], [0, -2]);
            },
            _event: {
                mjhand: function(eD){
                    ShowPutCardIcon();
                },
                HZNewCard: function(eD){
                    ShowPutCardIcon();
                },                
                HZChiCard: function(eD) {
                    ShowPutCardIcon();
                },
                MJPeng: function(eD) {
                    ShowPutCardIcon();
                },
                MJPut:function(eD) {
                    ShowPutCardIcon();
                },
                MJPass:function(eD) {
                    ShowPutCardIcon();
                },
                MJHu:function(eD){
                    this.visible = false;
                },
                // HZGangCard:function(eD){
                //     ShowPutCardIcon();
                // },
                // HZWeiCard:function(eD){
                //     ShowPutCardIcon();
                // },
            },
        },
    },
    _downNode:null,
    _rightNode:null,
    _topNode:null,
    ctor: function() {
        this._super();
        var playui = ccs.load("Play_LiuHuQiang.json");
        playMusic("bgFight");
        var tData = MjClient.data.sData.tData;
        MjClient.MaxPlayerNum_leiyang = tData.maxPlayer;
        MjClient.MaxPlayerNum_paohuzi = tData.maxPlayer; //这里有坑 建议直接用tData.maxPlayer
        cc.log(MjClient.MaxPlayerNum_leiyang);

        this._downNode  = playui.node.getChildByName("down");
        this._rightNode = playui.node.getChildByName("right");
        this._topNode  = playui.node.getChildByName("left");
        this._xingNode = playui.node.getChildByName("xing");
        MjClient.HandCardArr = [];
        MjClient.OtherHandArr = {};
        MjClient.playui = this;
        MjClient.playui._AniNode =  playui.node.getChildByName("eat");
        MjClient.playui._jiazhuWait = playui.node.getChildByName("jiazhuWait");
        MjClient.playui._jiazhuWait.visible = false;
        BindUiAndLogic(playui.node, this.jsBind);
        this.addChild(playui.node);

        MjClient.lastMJTick = Date.now();
        this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function() {
            if (MjClient.game_on_show) MjClient.tickGame(0);
        }), cc.delayTime(7))));

        // 切牌
        this.playuiNode = playui.node;
        if(MjClient.rePlayVideo == -1){
            this.playuiNode.cutCardView = COMMON_UI.createZiPaiCutCardView();
            playui.node.addChild(this.playuiNode.cutCardView);
        }

        // 在亲友圈房间中添加邀请亲友圈牌有一起对局
        addClubYaoqingBtn(2);

        // 俱乐部返回大厅功能：by_jcw
        addClub_BackHallBtn("changeBg","left","setting");

        return true;
    },

    resetJiaZhuTip: function()
    {
        var tData = MjClient.data.sData.tData;
        if (!tData.areaSelectMode.jushou)
            return;
        var nodes = [this._downNode, this._rightNode, this._topNode, this._leftNode];
        for (var i = 0; i < MjClient.MaxPlayerNum_leiyang; i ++)
        {
            var pl = getUIPlayer_leiyang(i);
            if (!pl) 
                continue;

            cc.log("resetJiaZhuTip jiazhuNum = " + pl.jiazhuNum);
            if (pl.jiazhuNum != 1 && pl.jiazhuNum != 0)
                continue;

            var node = nodes[i];
            var tipNode = node.getChildByName("head").getChildByName("jiaZhuTip");
            var playTipNode = node.getChildByName("play_tips");
            var point = playTipNode.convertToWorldSpace(playTipNode.getChildByName("hu").getPosition());
            tipNode.setPosition(tipNode.parent.convertToNodeSpace(point));
            tipNode.visible = true;
            tipNode.opacity = 255;
            tipNode.ignoreContentAdaptWithSize(true);
            tipNode.setString(pl.jiazhuNum == 1 ? "举手做声" : "");
            tipNode.runAction(cc.sequence(cc.delayTime(1), cc.fadeOut(0.5), cc.callFunc(function(){ this.visible = false;}, tipNode)));
        }
    },

    /*
        判断当前是否可以出牌，add by sking
     */
    isCanPutCard:function(){
        var bPut = false;
        var downNode = MjClient.playui._downNode;
        var standUI = downNode.getChildByName("stand");
        var children = downNode.children;
        for(var i = 0; i < children.length; i++){
            if(children[i].name == "mjhand"){
                if(children[i].y > standUI.y + 10){
                    bPut = true;
                    break;
                }
            }
        }
        return bPut;
    }
});

//重置手牌的顺序
PlayLayer_LiuHuQiang.prototype.ResetHandCard = function(posNode,off, needAction, isDelay){

    // needAction = needAction === undefined ? false : needAction;
    needAction = false;

    if(MjClient.rePlayVideo == -1){
        if(off == 0) {

            //todo 千千
            // if(!needAction && !isDelay && MjClient.addGroupIndex != 0){
            //     refreshNode_paohuzi(posNode,off,needAction);

            //     this.scheduleOnce(function(){
            //         this.ResetHandCard(posNode,off,needAction,true);
            //     }.bind(this), 0.35);
            //     return;
            // }

            //if(MjClient.movingCard_leiyang && MjClient.movingCard_leiyang.getParent()){
            //    MjClient.movingCard_leiyang.removeFromParent(true);
            //    MjClient.movingCard_leiyang = null;
            //}
            //if(MjClient.cloneCard && MjClient.cloneCard.getParent()){
            //    MjClient.cloneCard.removeFromParent(true);
            //    MjClient.cloneCard = null;
            //}
            checkCard_paohuzi(posNode, off);
            var handNode = posNode.getChildByName("handNode");
            handNode.visible = true;
            handNode.removeAllChildren();
            var cardArr = MjClient.HandCardArr;
            cc.log("wxd.............MjClient.HandCardArr..............." + JSON.stringify(MjClient.HandCardArr));
            //清理空数组
            for (var k = cardArr.length - 1; k >= 0; k--) {
                if (cardArr[k].length == 0) {
                    cardArr.splice(k, 1);
                }
            }
            for (var k = 0; k < cardArr.length; k++) {
                var groupList = cardArr[k];
                for (var j = 0; j < groupList.length; j++) {
                    addHandCard_leiyang(k, j, groupList[j], off);
                }
            }

            var handCard = posNode.getChildByName("handCard");
            var scale_x = handCard.scaleX;
            var winSize = MjClient.size;
            var totalWidth = handCard.width * cardArr.length * scale_x;
            for (var i = 0; i < cardArr.length; i++) {
                var addNode = handNode.getChildByTag(i);
                // addNode.setPosition(cc.p((winSize.width - totalWidth)/2 + i * handCard.width * scale_x,0));

                if (needAction) {
                    addNode.x = winSize.width * 0.5;
                    addNode.y = 0;
                    this._doMovetoAction(addNode, cc.p((winSize.width - totalWidth) / 2 + i * handCard.width * scale_x, 0));
                } else {
                    addNode.setPosition(cc.p((winSize.width - totalWidth) / 2 + i * handCard.width * scale_x, 0));
                }
            }
            postEvent("LY_addHandHuXi");
        }
    }else{
        //回放
        var handNode = null;
        var cardArr = null;
        var handCard = null;
        if(off == 0){
            if(MjClient.MaxPlayerNum_leiyang == 3 || MjClient.MaxPlayerNum_leiyang == 2){
                handNode = posNode.getChildByName("handNode");
                handCard = posNode.getChildByName("handCard");
            }else if(MjClient.MaxPlayerNum_leiyang == 4){
                handNode = posNode.getChildByName("replayNode");
                handCard = posNode.getChildByName("out0");
            }
            cardArr = MjClient.HandCardArr;
        }else {
            handNode = posNode.getChildByName("replayNode");
            handCard = posNode.getChildByName("out0");
            cardArr = MjClient.OtherHandArr[off];
        }
        handNode.visible = true;
        handNode.removeAllChildren();

        //if(MjClient.movingCard_leiyang && MjClient.movingCard_leiyang.getParent()){
        //    MjClient.movingCard_leiyang.removeFromParent(true);
        //    MjClient.movingCard_leiyang = null;
        //}
        //if(MjClient.cloneCard && MjClient.cloneCard.getParent()){
        //    MjClient.cloneCard.removeFromParent(true);
        //    MjClient.cloneCard = null;
        //}

        //清理空数组
        if(!cardArr){
            return;
        }
        for(var k = cardArr.length - 1;k >=0;k--){
            if(cardArr[k].length == 0){
                cardArr.splice(k,1);
            }
        }
        for(var k = 0;k < cardArr.length;k++){
            var groupList = cardArr[k];
            for(var j = 0;j < groupList.length;j++){
                if(off == 0){
                    if(MjClient.MaxPlayerNum_leiyang == 3 || MjClient.MaxPlayerNum_leiyang == 2){
                        addHandCard_leiyang(k,j,groupList[j],off);
                    }else if(MjClient.MaxPlayerNum_leiyang == 4){
                        addHandCardReplay_leiyang(k,j,groupList[j],off);
                    }
                }else {
                    addHandCardReplay_leiyang(k,j,groupList[j],off);
                }
            }
        }

        if(off == 0 && (MjClient.MaxPlayerNum_leiyang == 3 || MjClient.MaxPlayerNum_leiyang == 2)) {
            var scale_x = handCard.scaleX;
            var winSize = MjClient.size;
            var totalWidth = handCard.width * cardArr.length * scale_x;
            for(var i = 0;i < cardArr.length;i++){
                var addNode = handNode.getChildByTag(i);
                addNode.setPosition(cc.p((winSize.width - totalWidth)/2 + i * handCard.width * scale_x,0));
            }
        }
        cc.log("================off:" + off +"----------"+JSON.stringify(cardArr));
    }
};

PlayLayer_LiuHuQiang.prototype._doMovetoAction = function(node,endP){
    node.stopAllActions();
    var ac = cc.moveTo(0.3,endP);
    node.runAction(ac);
};

PlayLayer_LiuHuQiang.prototype.ResetOtherCard = function(posNode,off){
    //添加吃、碰、跑、偎、提
    var sData = MjClient.data.sData;
    var tData = null;
    if(sData){
        tData = sData.tData;
    }

    var eatNode = posNode.getChildByName("eatNode");
    eatNode.visible = true;
    eatNode.removeAllChildren();
    var pl = getUIPlayer_leiyang(off);
    if (!pl) return;
    var mjSortArr = pl.mjsort;
    cc.log("=====off=====:" + off + "mjSortArr:" + JSON.stringify(mjSortArr));
    if(mjSortArr){
        var childArr = null;
        
        //提/偎牌的特殊处理
        var callback = function(childList){
            var cardNum = pl.mjwei[pos];
            var skipPeng = pl.skipPeng;
            for(var i = 0;i < childList.length;i++){
                var child = childList[i];
                var maxPlayer = MjClient.data.sData.tData.maxPlayer || 3;
                //if(pl.info.uid == SelfUid() || (tData && TableState.roundFinish == tData.tState) || i==0){
                // if((i==0 && off != 0)||(i==childList.length - 1 && off == 0)){
                if ((i == 0 && maxPlayer - off <= 2) || (i == childList.length - 1 && maxPlayer - off > 2)) {
                    // var shade = new cc.Sprite("playing/paohuzi/huxiBG1.png");
                    // shade.opacity = 100;
                    // shade.x = shade.width/2;
                    // shade.y = shade.height/2;
                    // child.addChild(shade);
                }else{
                    child.loadTexture(MjClient.cardPath_leiyang+"huxiBG.png");
                }
            }
        };

        var callback1 = function(childList){
            var cardNum = pl.mjwei[pos];
            var skipPeng = pl.skipPeng;
            for(var i = 0;i < childList.length;i++){
                var child = childList[i];
                //if(pl.info.uid == SelfUid() || (tData && TableState.roundFinish == tData.tState) || i==0){
                if(off == 0){
                    var shade = new cc.Sprite("playing/paohuzi/huxiBG1.png");
                    shade.opacity = 100;
                    shade.x = shade.width/2;
                    shade.y = shade.height/2;
                    child.addChild(shade);
                }else{
                    child.loadTexture(MjClient.cardPath_leiyang+"huxiBG.png");
                }
            }
        };

        for(var k = 0;k < mjSortArr.length;k++){
            var mjsort = mjSortArr[k];
            var pos = mjsort.pos;
            var name = mjsort.name;
            //提
            if(name == "mjgang1"){
                var cardNum = pl.mjgang1[pos];
                for(var i = 0;i < 4;i++){
                    addEatCard_leiyang(posNode,"mjgang1" + k,cardNum,off);
                }

                var tiParentNode = eatNode.getChildByName("mjgang1" + k);
                var childArr = tiParentNode.children;
                if(MjClient.majiang.getCardShowType(pl.info.uid, cardNum) == 2) {
                    callback(childArr);
                }else {
                    callback1(childArr);
                }
            }
            //偎
            if(name == "mjwei"){
                var cardNum = pl.mjwei[pos];
                for(var i = 0;i < 3;i++){
                    addEatCard_leiyang(posNode,"mjwei" + k,cardNum,off);
                }

                var weiParentNode = eatNode.getChildByName("mjwei" + k);
                var childArr = weiParentNode.children;
                var skipPeng = pl.skipPeng;
                if(MjClient.majiang.getCardShowType(pl.info.uid, cardNum) == 2){
                    callback(childArr);
                    // if(!skipPeng || skipPeng.indexOf(cardNum) < 0){
                    //     callback(childArr);
                    // }else{
                    //     for(var i = 0;i < childArr.length;i++){
                    //         var child = childArr[i];
                    //         if(i != childArr.length-1){
                    //             child.loadTexture(MjClient.cardPath_leiyang+"huxiBG.png");
                    //         }
                    //     }
                    // }
                }else {
                    if(!skipPeng || skipPeng.indexOf(cardNum) < 0){//不是臭偎
                        callback1(childArr);
                    }else{
                        for(var i = 0;i < childArr.length;i++){
                            var child = childArr[i];
                            if(i != childArr.length-1){
                                child.loadTexture(MjClient.cardPath_leiyang+"huxiBG.png");
                            }
                        }
                    }
                }
                // if(!skipPeng || skipPeng.indexOf(cardNum) < 0){
                //     callback(childArr);
                // }else{
                //     for(var i = 0;i < childArr.length;i++){
                //         var child = childArr[i];
                //         if(i != childArr.length-1){
                //             child.loadTexture(MjClient.cardPath_leiyang+"huxiBG.png");
                //         }
                //     }
                // }
            }
            //跑
            if(name == "mjgang0"){
                var cardNum = pl.mjgang0[pos];
                for(var i = 0;i < 4;i++){
                    addEatCard_leiyang(posNode,"mjgang0" + k,cardNum,off);
                }
            }
            //碰
            if(name == "mjpeng"){
                var cardNum = pl.mjpeng[pos];
                for(var i = 0;i < 3;i++){
                    addEatCard_leiyang(posNode,"mjpeng" + k,cardNum,off);
                }
            }
            //吃
            if(name == "mjchi"){
                var cardNum = pl.mjchi[pos];
                var eatCards = pl.mjchi[pos].eatCards;
                for(var i = 0;i < eatCards.length;i++){
                    addEatCard_leiyang(posNode,"mjchi" + k,eatCards[i],off);
                }
                var biCards = pl.mjchi[pos].biCards;
                if(biCards && biCards.length > 0){
                    for(var i = 0;i < biCards.length;i++){
                        var biArr = biCards[i];
                        for(var m = 0;m<biArr.length;m++){
                            addEatCard_leiyang(posNode,"mjbi" + k + i,biArr[m],off);
                        }
                    }        
                }

                var mjchiCardArr = pl.mjchiCard;
                var chiParentNode = eatNode.getChildByName("mjchi" + k);
                if(chiParentNode){
                    var childArr = chiParentNode.children;
                    // for(var i = 0;i < childArr.length;i++){
                    //     if(childArr[i].tag == mjchiCardArr[pos] && ){
                    //         childArr[i].setColor(cc.color(170, 170, 170));
                    //         break;
                    //     }
                    // }
                    // 耒阳吃牌放在最上面一张
                    if (childArr.length > 0 && childArr[childArr.length - 1].tag == mjchiCardArr[pos]) {
                        childArr[childArr.length - 1].setColor(cc.color(170, 170, 170));
                    }
                }

                if(biCards && biCards.length > 0){
                    for(var i = 0;i < biCards.length;i++){
                        var chiParentNode = eatNode.getChildByName("mjbi" + k + i); // "mjbi32"
                        if(chiParentNode){
                            var childArr = chiParentNode.children;
                            // for(var m = 0;m < childArr.length;m++){
                            //     if(childArr[m].tag == mjchiCardArr[pos]){
                            //         childArr[m].setColor(cc.color(170, 170, 170));
                            //         break;
                            //     }
                            // }

                            // 比牌放在最上面一张
                            if (childArr.length > 0 && childArr[childArr.length - 1].tag == mjchiCardArr[pos]) {
                                childArr[childArr.length - 1].setColor(cc.color(170, 170, 170));
                            }
                        }                        
                    }
                }
            }
        }        
    }

    //添加打出的牌
    //var outNode = posNode.getChildByName("outNode");
    //outNode.visible = true;
    //outNode.removeAllChildren();
    //var sData = MjClient.data.sData;
    //var tData = sData.tData;
    //var curUId = tData.uids[tData.curPlayer];
    //for(var i = 0; i < pl.mjput.length; i++){
    //    if(curUId == pl.info.uid && i == pl.mjput.length - 1 && tData.currCard == pl.mjput[i]){
    //        continue;
    //    }
    //    var childCount = outNode.childrenCount;
    //    var outCard = getNewCard_leiyang(pl.mjput[i], 2, off);
    //    if(off == 0){
    //        outCard.anchorX = 1;
    //        outCard.anchorY = 0;
    //        outCard.x = outNode.width - childCount * outCard.width;
    //        outCard.y = 0;
    //    }else if(off == 1){
    //        outCard.anchorX = 1;
    //        outCard.anchorY = 1;
    //        outCard.x = outNode.width - childCount * outCard.width;
    //        outCard.y = outNode.height;
    //    }else if(off == 2){
    //        outCard.anchorX = 0;
    //        outCard.anchorY = 1;
    //        outCard.x = childCount * outCard.width;
    //        outCard.y = outNode.height;
    //    }
    //    outNode.addChild(outCard);
    //}
};

PlayLayer_LiuHuQiang.prototype.ResetPutCard = function(posNode,off){
    //添加打出的牌
    var pl = getUIPlayer_leiyang(off);
    if (!pl) return;
    var outNode = posNode.getChildByName("outNode");
    outNode.visible = true;
    outNode.removeAllChildren();
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var curUId = tData.uids[tData.curPlayer];
    for(var i = 0; i < pl.mjput.length; i++){
        // if(curUId == pl.info.uid && i == pl.mjput.length - 1 && tData.currCard == pl.mjput[i]){
        //     continue;
        // }
        // var out = getNewCard_leiyang(pl.mjput[i], 2, off);
        // setPutCardPos_leiyang(outNode, out, i, off);
        // out.visible = true;
        // outNode.addChild(out);
        // var childCount = outNode.childrenCount;
        // var outCard = getNewCard_leiyang(pl.mjput[i], 2, off);
        // if(off == 0){
        //     outCard.anchorX = 1;
        //     outCard.anchorY = 0;
        //     outCard.x = outNode.width - childCount * outCard.width;
        //     outCard.y = 0;
        //     // outCard.y = outNode.height;
        //     if(childCount>= 15){
        //         outCard.x = outNode.width - (childCount-15) * outCard.width;
        //         outCard.y = outCard.height;
        //     }
        //     // outCard.y = 0;
        // }else if(off == 1){
        //     outCard.anchorX = 1;
        //     outCard.anchorY = 0;
        //     outCard.x = outNode.width - childCount * outCard.width;
        //     outCard.y = 0;
        //     if(MjClient.MaxPlayerNum_leiyang == 3){
        //         outCard.anchorX = 1;
        //         outCard.anchorY = 1;
        //         outCard.x = outNode.width - childCount * outCard.width;
        //         outCard.y = outNode.height;
        //         if(childCount>= 8){
        //             outCard.x = outNode.width - (childCount-8) * outCard.width;
        //             outCard.y = outNode.height+outCard.height;
        //         }
        //     }
        // }else if(off == 2){
        //     outCard.anchorX = 1;
        //     outCard.anchorY = 1;
        //     outCard.x = outNode.width - childCount * outCard.width;
        //     outCard.y = outNode.height;
        //     if(MjClient.MaxPlayerNum_leiyang == 3){
        //         outCard.anchorX = 0;
        //         outCard.anchorY = 1;
        //         outCard.x = childCount * outCard.width;
        //         outCard.y = outNode.height;
        //         if(childCount>= 8){
        //             outCard.x = childCount * outCard.width - 8 * outCard.width;
        //             outCard.y = outNode.height+outCard.height;
        //         }
        //     }
        // }else if(off == 3){
        //     outCard.anchorX = 0;
        //     outCard.anchorY = 1;
        //     outCard.x = childCount * outCard.width;
        //     outCard.y = outNode.height;
        // }
        // outNode.addChild(outCard);

        var outCard = getNewCard_leiyang(pl.mjput[i], 2, off);
        outNode.addChild(outCard);
        setPutCardPos_leiyang(outNode, outCard, i, off);

        // 当前展示的牌 弃牌中先添加,隐藏
        if (curUId == pl.info.uid && i == pl.mjput.length - 1 && tData.currCard == pl.mjput[i]) {
            outCard.visible = false;
            var tmpNode = new cc.Node();
            outCard.addChild(tmpNode);

            var jsBind = { // 有人要移除 没人要显示
                _event: {
                    HZPickCard: function() {
                        outCard.removeFromParent(true);
                    },
                    HZChiCard: function() {
                        outCard.removeFromParent(true);
                    },
                    MJPeng: function() {
                        outCard.removeFromParent(true);
                    },
                    HZWeiCard: function() {
                        outCard.removeFromParent(true);
                    },
                    HZGangCard: function(eD) {
                        if (eD.type == 1 && eD.isGangHand) {
                            return;
                        }
                        outCard.removeFromParent(true);
                    },
                    HZNewCard: function() {
                        this.removeFromParent(true);
                    },
                }
            };
            BindUiAndLogic(tmpNode, jsBind);
        }
    }
};

//重置牌的顺序
PlayLayer_LiuHuQiang.prototype.CardLayoutRestore = function(posNode,off){
    if(MjClient.rePlayVideo == -1){
        this.ResetHandCard(posNode,off,true);
    }else{
        //回放时不执行发牌动画
        this.ResetHandCard(posNode,off);
    }
    this.ResetOtherCard(posNode,off);
    this.ResetPutCard(posNode,off);
};

// 判断吃、碰、跑、偎、提、胡的状态
PlayLayer_LiuHuQiang.prototype.EatVisibleCheck = function(off){
    var eat = MjClient.playui.jsBind.eat;
    //sk 为啥要隐藏掉？   //因为一开始是不可见的，隐藏根节点 by sking
    // MjClient.playui.jsBind.eat.changeui.changeuibg._node.visible = false;
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var leftCard = MjClient.majiang.getAllCardsTotal() - tData.cardNext;

    eat.chi._node.visible = false;
    eat.peng._node.visible = false;
    eat.hu._node.visible = false;
    eat.guo._node.visible = false;
    eat.cancel._node.visible = false;
    eat.wangDiao._node.visible = false;
    eat.wangChuang._node.visible = false;
    eat.wangZha._node.visible = false;
    eat.chiSelect._node.visible = false;
    eat.biSelect._node.visible = false;
    eat.biSelect1._node.visible = false;

    eat.chi._node.setTouchEnabled(false);
    eat.peng._node.setTouchEnabled(false);
    eat.hu._node.setTouchEnabled(false);
    eat.guo._node.setTouchEnabled(false);
    eat.cancel._node.setTouchEnabled(false);
    eat.wangDiao._node.setTouchEnabled(false);
    eat.wangChuang._node.setTouchEnabled(false);
    eat.wangZha._node.setTouchEnabled(false);
    eat.chiSelect._node.setTouchEnabled(false);
    eat.biSelect._node.setTouchEnabled(false);
    eat.biSelect1._node.setTouchEnabled(false);
    
    var pl = sData.players[SelfUid() + ""];
    if (!pl) return;
    MjClient.gangCards = [];
    MjClient.eatpos = [];
    var mj = MjClient.majiang;
    //吃碰杠胡node
    var vnode = [];
    //自摸getUIPlayer_leiyang
    if(tData.tState != TableState.roundFinish && pl.mjState != TableState.roundFinish){
        if(IsTurnToMe()){
            //王炸
            if(pl.wangType == 4 && !(pl.eatFlag & 32)){
                vnode.push(eat.wangZha._node);
            }
            //王闯
            if(pl.wangType == 2 && !(pl.eatFlag & 32)){
                vnode.push(eat.wangChuang._node);
            }
            //王钓
            if(pl.wangType == 1 && !(pl.eatFlag & 32)){
                vnode.push(eat.wangDiao._node);
            }
            //提
            if(pl.eatFlag & 16) {
                return;
            }
            //偎
            if(pl.eatFlag & 8){
                return;
            }
            //胡
            if(pl.eatFlag & 32){
                if(pl.wangType !=0 && pl.wangStatus){
                    pl.wangType = 0;
                    MJHuToServer_leiyang();
                    return;
                }else if(!pl.wangStatus){
                    vnode.push(eat.hu._node);
                }
            }
            //跑牌
            if(pl.eatFlag & 4){
                //其他玩家不能胡的情况下才能跑
                var canHu = false;
                for(var uid in sData.players){
                    if(pl.uid != uid){
                        var p = sData.players[uid + ""];
                        if(p.eatFlag & 32){
                            canHu = true;
                        }
                    }
                }
                if(!canHu){
                    // HZGangToServer_leiyang(2);
                    return;
                }
            }
            //吃
            if(pl.eatFlag & 1){
                vnode.push(eat.chi._node);
            } 

            if(vnode.length > 0){
                vnode.push(eat.guo._node);
                isCheckedTing = false;
            }
        }
        if(!IsTurnToMe()){
            //胡
            if(pl.eatFlag & 32){
                vnode.push(eat.hu._node);
            }
            //碰
            if(pl.eatFlag & 2){
                vnode.push(eat.peng._node);
            }
            //吃
            if(pl.eatFlag & 1){
                    vnode.push(eat.chi._node);
            } 
            //如果，有跑，碰，吃。 这出现过的UI. 否则玩家状态为等待
            if(vnode.length > 0){
                vnode.push(eat.guo._node);
                isCheckedTing = false;
            }
        }
    }

    var layoutType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_QXYZ_LAYOUT_SELECT, 1);
    var moveOff_x = btnOff_x;
    if(layoutType == 0 && vnode.length >= 2){
        if(vnode.length == 2){
            moveOff_x -= 0.6;
        }else if(vnode.length == 3){
            moveOff_x -= 1.2;
        }else if(vnode.length > 3){
            moveOff_x  -= 1.8;
        }
    }

    //吃碰杠胡过处理
    if(vnode.length > 0){
        var btnImgs ={
            "peng": ["playing/paohuzi/youxizhong-27.png", "playing/paohuzi/youxizhong-27.png"],
            "gang": ["playing/gameTable/youxizhong-2_55.png", "playing/gameTable/youxizhong-2_05.png"],
            "chi": ["playing/paohuzi/youxizhong-274.png", "playing/paohuzi/youxizhong-274.png"],
        }

        for(var i = 0; i < vnode.length; i++){
            vnode[i].visible = true;
            vnode[i].setTouchEnabled(true);
            vnode[i].setBright(true);
            if(vnode[i].getChildByName("card1")){
                vnode[i].getChildByName("card1").visible = false;
            }

            if(vnode[i].getChildByName("bgground")){
                vnode[i].getChildByName("bgground").visible = false;
            }

            if(vnode[i].getChildByName("bgimg")){
                vnode[i].getChildByName("bgimg").visible = true;
            }

            var btnName = vnode[i].name;
            if(btnName == "peng" || btnName == "chi0" || btnName == "gang0"){
                vnode[i].loadTextureNormal(btnImgs[btnName][0]);
                vnode[i].loadTexturePressed(btnImgs[btnName][1]);
            }

            if(i == 0){
                var cardVal = 0;
                if(vnode[i].getChildByName("bgimg")){
                    vnode[i].getChildByName("bgimg").visible = false;
                }

                if(btnName == "peng" || btnName == "chi0" || btnName == "gang0"){
                    vnode[i].loadTextureNormal(btnImgs[btnName][0]);
                    vnode[i].loadTexturePressed(btnImgs[btnName][1]);
                }

                if(btnName == "peng"){
                    cardVal = tData.lastPutCard;
                }
                else if(btnName == "chi0"){
                    if(MjClient.eatpos.length == 1){
                        cardVal = tData.lastPutCard;
                    }
                }
                else if(btnName == "gang0"){
                    if(MjClient.gangCards.length == 1){
                        cardVal = MjClient.gangCards[0];
                    }
                }
                else if(btnName == "hu"){
                    if(IsTurnToMe()){
                        cardVal = pl.mjhand[pl.mjhand.length - 1];
                    }else{
                        cardVal = tData.lastPutCard;
                    }
                }

                if(cardVal && cardVal > 0){
                    // setCardSprite(vnode[0].getChildByName("card1"), cardVal, 0);
                    // vnode[0].getChildByName("card1").visible = true;
                }

                if(vnode[0].getChildByName("bgground")){
                    vnode[0].getChildByName("bgground").zIndex = -1;
                    vnode[0].getChildByName("bgground").visible = true;
                }

                //屏蔽到 碰 ，杠 的显示牌 add by sking
                if(vnode[0].getChildByName("bgground")){
                    vnode[0].getChildByName("bgground").visible = false;
                }
                if(vnode[i].getChildByName("card1")){
                    vnode[i].getChildByName("card1").visible = false;
                }
            }
            // setWgtLayout(vnode[i], [0, 0.16], [0.5, 0.3], [(1 - vnode.length) / 1.6 + i * 1.6, 1.8], false, false);
            setWgtLayout(vnode[i], [0, 0.20], [0.5, 0.18], [ (i - (vnode.length - 1) / 2) * 1.3 + moveOff_x, 1.8], false, false);
            if(vnode[i] == eat.hu._node){
                setWgtLayout(vnode[i], [0, 0.25], [0.5, 0.10], [(1 - vnode.length) / 1.6+ i * 1.3 + moveOff_x, 1.8], false, false);
            }
        }
    }
};