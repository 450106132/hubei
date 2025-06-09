/**
 * Created by Administrator on 2017/3/9.
 */
// var cdsNums = 0;
// var windPos = [];
// var windObj = [];
// var roundnumImgObj;
var actionZindex = 1000;
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
//         HZPassConfirmToServer_YueYangWaiHuZi();
//     }
// };

// 这个没看懂干嘛的
// off 是四个位置，根据off 显示四个位置的信息 by sking
function SetUserVisible_YueYangWaiHuZi(node, off){
    var pl = getUIPlayer_YueYangWaiHuZi(off);
    cc.log("====================off======================" + off);
    var head = node.getChildByName("head");
    var name = head.getChildByName("name");
    var nobody = head.getChildByName("nobody");
    var headBox = head.getChildByName("headBox");
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
        headBox.visible = true;
        name_bg.visible = false;
        score_bg.visible = false;
        MjClient.loadWxHead(pl.info.uid, pl.info.headimgurl);
        setUserOffline_YueYangWaiHuZi(node, off);
        // InitUserHandUI_YueYangWaiHuZi(node, off);
        // cc.log("pl.info.uid = "+pl.info.uid);
    }else{
        name.visible = false;
        coin.visible = false;
        offline.visible = false;
        huxi.visible = false;
        nobody.visible = false;
        headBox.visible = false;
        var WxHead = nobody.getChildByName("WxHead");
        if(WxHead){
            WxHead.removeFromParent(true);
        }
    }
}

//设置玩家牌桌上的信息(只有自己才设置手牌，其他玩家不需要设置)
function InitUserHandUI_YueYangWaiHuZi(node, off){
    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer_YueYangWaiHuZi(off);

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
        MjClient.majiang.setJiaZhuNum(node, getUIPlayer_YueYangWaiHuZi(off));
    }

    if (MjClient.rePlayVideo != -1) {
         MjClient.playui._jiazhuWait.visible = false;
    }

    if(tData.tState != TableState.waitPut && tData.tState != TableState.waitEat && tData.tState != TableState.waitCard){
        return;
    }

    //添加手牌
    if(MjClient.rePlayVideo == -1){
        //表示正常游戏
        if(pl.mjhand && off == 0){
            cc.log("pl.mjhand====:" + pl.mjhand);
            MjClient.HandCardArr = MjClient.majiang.sortCard3(pl.mjhand, 2);
        }
    }else{
        /*
            播放录像
         */
        cc.log("_________________mjhand_replay_______________"+JSON.stringify(pl.mjhand));
        if (pl.mjhand){
            if(off == 0){
                MjClient.HandCardArr = MjClient.majiang.sortCard3(pl.mjhand, 2);
            }else{
                if(!MjClient.OtherHandArr){
                    MjClient.OtherHandArr = {};
                }
                if(!MjClient.OtherHandArr[off]){
                    MjClient.OtherHandArr[off] = MjClient.majiang.sortCard3(pl.mjhand, 2);
                }
            }
        }

    }
    MjClient.playui.CardLayoutRestore(node,off);
}

var PlayLayer_YueYangWaiHuZi = cc.Layer.extend({
    jsBind: {
        _event: {
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
                var pls = sData.players;
                var ip2pl = {};
                for (var uid in pls) {
                    var pi = pls[uid];
                    var ip = pi.info.remoteIP;
                    if (ip) {
                        if (!ip2pl[ip]) ip2pl[ip] = [];
                        ip2pl[ip].push(unescape(pi.info.nickname ));
                    }
                }
                var ipmsg = [];
                for (var ip in ip2pl) {
                    var ips = ip2pl[ip];
                    if (ips.length > 1) {
                        ipmsg.push("玩家:" + ips.join("，") + "为同一IP地址。")
                    }
                }
                if (ipmsg.length > 0) {
                    // AlertSameIP(ipmsg.join("\n"));
                }
                mylog("ipmsg " + ipmsg.length);

                //距离位置显示
                // checkCanShowDistance(); //todo qq

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
                    this.addChild(new GameOverLayer_YueYangWaiHuZi(),500);
                }else{
                    MjClient.Scene.addChild(new StopRoomView());
                }    
            },
            roundEnd: function() {
                var self = this;

                var sData = MjClient.data.sData;
                var tData = sData.tData;
                var time = 0.2;
                if(!MjClient.isDismiss && tData.hunCard && tData.hunCard != -1 && tData.areaSelectMode.xingType==2){
                    time = 1.8;
                    var hunCard = sData.cards[tData.cardNext];
                    if(!hunCard){
                        hunCard = tData.lastPutCard;
                    }
                    ShowEatActionAnim_YueYangWaiHuZi(MjClient.playui._downNode, ActionType_paohuzi.FANXING, 0);
                    DealFanXingNewCard_YueYangWaiHuZi(hunCard);
                }

                function delayExe(){
                    var sData = MjClient.data.sData;
                    resetEatActionAnim_YueYangWaiHuZi();
                    if (sData.tData.roundNum <= 0){
                        var layer = new GameOverLayer_YueYangWaiHuZi();
                        layer.setVisible(false);
                        self.addChild(layer,500);
                    }
                    if(!MjClient.endoneui){
                        self.addChild(new EndOneView_YueYangWaiHuZi(),500);
                    }

                    var putNode = MjClient.playui._downNode.getChildByName("xingPai");
                    putNode.removeAllChildren();
                    putNode.setVisible(false);
                }
                this._delayExeAction = this.runAction(cc.sequence(cc.delayTime(time),cc.callFunc(delayExe)));
                MjClient.playui.showAndHideHeadEffect();
            },
            moveHead: function() {
                postEvent("returnPlayerLayer");
                //tableStartHeadMoveAction_YueYangWaiHuZi(this);   //不涉及到头像移动动作
            },
            initSceneData: function() {
                if (this._delayExeAction && cc.sys.isObjectValid(this._delayExeAction)){
                    this.stopAction(this._delayExeAction);
                    delete this._delayExeAction;
                }
                reConectHeadLayout_YueYangWaiHuZi(this);        //不涉及到头像移动动作
                CheckRoomUiDelete();
                tableStartHeadMoveAction_YueYangWaiHuZi(this);   //不涉及到头像移动动作

                //距离位置显示
                // checkCanShowDistance();
                MjClient.playui.showAndHideHeadEffect();
            },
            MJChat : function(data){
                if(data.type == 4){
                    //距离位置显示
                    // checkCanShowDistance();
                }
            }, 
            addPlayer:function () {
                tableStartHeadMoveAction_YueYangWaiHuZi(this);   //不涉及到头像移动动作
            },
            removePlayer: function(eD) {
                //距离位置显示
                // checkCanShowDistance();
            },
            onlinePlayer: function() {
                reConectHeadLayout_YueYangWaiHuZi(this);        //不涉及到头像移动动作
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
                changeMJBg_YueYangWaiHuZi(this, ziPai.getZiPaiType());
            },
            MJPeng: function() {
                MjClient.playui.showAndHideHeadEffect();
            },
            HZNewCard: function(){
                MjClient.playui.showAndHideHeadEffect();
            },
            HZCheckRaise:function () {
                MjClient.playui.showAndHideHeadEffect();
            },
            HZLiuCard: function(){
                MjClient.playui.showAndHideHeadEffect();
            },
            HZChiCard: function() {
                MjClient.playui.showAndHideHeadEffect();
            },
            HZWeiCard: function(){
                MjClient.playui.showAndHideHeadEffect();
            },
            MJPut: function(msg) {
                MjClient.playui.showAndHideHeadEffect();
            },
            waitPut: function(eD) {
                MjClient.playui.showAndHideHeadEffect();
            },
            EZP_layout : function(){
                if(MjClient.data.sData.tData.maxPlayer < 4){
                    ziPai.changePlayUILayout(MjClient.playui.playuiNode);
                    if(IsArrowVisible_YueYangWaiHuZi()){
                        MjClient.playui.ResetPutCard(MjClient.playui._downNode, 0);
                        MjClient.playui.ResetPutCard(MjClient.playui._rightNode, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        MjClient.playui.ResetPutCard(MjClient.playui._topNode, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    }
                }

            }
        },
        cardNumImg: {
            _run:function () {
                MjClient.cardNumImgNode = this;
                setWgtLayout(this,[0.085, 0.085], [0.5, 0.75], [0, 0]);
            },
            _event: {
                initSceneData: function(eD) {
                    this.visible = IsArrowVisible_YueYangWaiHuZi();
                },
                mjhand: function(eD) {
                    this.visible = IsArrowVisible_YueYangWaiHuZi();
                },
                onlinePlayer: function(eD) {
                    //this.visible = IsArrowVisible();
                }
            },
            cardNumImg:{
                _event:{
                    initSceneData:function(){
                        setCardNumImage_YueYangWaiHuZi(this);
                    },
                    mjhand:function(){
                        setCardNumImage_YueYangWaiHuZi(this);
                    },
                    HZNewCard:function(){
                        setCardNumImage_YueYangWaiHuZi(this);
                    },
                    roundEnd: function(){
                        this.visible = false;
                    }                    
                }
            },
            cardnumAtlas: {
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function() {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData) return MjClient.majiang.getAllCardsTotal(sData) - tData.cardNext;
                },
                _event: {
                    initSceneData:function(){
                        this.visible = true;
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if (tData) this.setString(MjClient.majiang.getAllCardsTotal(sData) - tData.cardNext);
                    },
                    mjhand: function() {
                        this.visible = true;
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if (tData) this.setString(MjClient.majiang.getAllCardsTotal(sData) - tData.cardNext);
                    },
                    HZNewCard: function() {
                        this.visible = true;
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if (tData) this.setString(MjClient.majiang.getAllCardsTotal(sData) - tData.cardNext);
                    },
                    HZCardNum: function() {
                        this.visible = true;
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if (tData) this.setString(MjClient.majiang.getAllCardsTotal(sData) - tData.cardNext);
                    },
                    // waitPut: function() {
                    //     var sData = MjClient.data.sData;
                    //     var tData = sData.tData;
                    //     if (tData) this.setString(MjClient.majiang.getAllCardsTotal(sData) - tData.cardNext);
                    //     cc.log(MjClient.majiang.getAllCardsTotal(sData) + "-----------------waitPut------------------" + tData.cardNext);
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
                //     text.setFontName(MjClient.fzcyfont);
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
        gameName:{
            _layout: [[0.12, 0],[0.5, 0.8292],[0, 0]]
        },
        operateWait: {
            _visible: false,
            _layout: [[0.37, 0.09], [0.5, 0.88], [0.13, 0]],
            _run: function () {
                var i = 1;
                var str = "";
                var str2 = "提示：对方可能正在思考，请等待";

                var callback = function () {
                    switch (i) {
                        case 1:
                            str = ".";
                            i++;
                            break;
                        case 2:
                            str = "..";
                            i++;
                            break;
                        case 3:
                            str = "...";
                            i = 1;
                            break;
                    }
                    this.setString(str2 + str);
                }.bind(this);
                var action = cc.callFunc(callback);

                this.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.7), action)));
            },
            _event: {
                initSceneData: function (eD) {
                    if (MjClient.playui.jsBind.left.head.timeImg.time._node.getString() == "0" && curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1) ||
                        MjClient.playui.jsBind.right.head.timeImg.time._node.getString() == "0" && curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2) && MjClient.MaxPlayerNum_YueYangWaiHuZi != 2) {
                        //this.visible = true;
                    }
                },
                mjhand: function (eD) {
                    this.visible = false;
                },
                onlinePlayer: function (eD) {
                    if (MjClient.playui.jsBind.left.head.timeImg.time._node.getString() == "0" && curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1) ||
                        MjClient.playui.jsBind.right.head.timeImg.time._node.getString() == "0" && curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2) && MjClient.MaxPlayerNum_YueYangWaiHuZi != 2) {
                        //this.visible = true;
                    }
                },
                waitPut: function (eD) {
                    //this.visible = false;
                },
                HZNewCard: function (ed) {
                    //this.visible = false;
                },
                MJPeng: function (eD) {
                    //this.visible = false;
                },
                HZChiCard: function (eD) {
                    //this.visible = false;
                },
                HZLiuCard: function (eD) {
                    //this.visible = false;
                },
                HZWeiCard: function (eD) {
                    //this.visible = false;
                },
                MJPut: function (eD) {
                    //this.visible = false;
                },
                roundEnd: function (eD) {
                    //this.visible = false;
                },
                startOperWait: function () {
                    //this.visible = true;
                }
            }
        },
        roundInfo:{
            _layout: [[0.11, 0.11],[0.5, 0.7],[0, 0]],
            _run:function () {
                if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
                    this.visible = false;
                }
            },
        },
        jiazhuWait:{
            _visible:false,
            _layout: [[0.45, 0.12],[0.5, 0.5],[0, 0]]
        },
        banner: {
            _layout: [[0.35, 0.35],[0.5, 1],[0, 0]],
            _run: function() {
                    //changeGameTitleBg(this);
                },
            _event: {
                changeGameBgEvent: function() {
                    //changeGameTitleBg(this);
                }
            },
            wifi: {
                _run: function() {
                    updateWifiState(this);
                }
            },
            timeTxt:{
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
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fuzhifangjianxinxi", {uid:SelfUid(), gameType:MjClient.gameType});

                    /*
                     复制房间号-----------------------
                     */
                    var tData = MjClient.data.sData.tData;

                    var str = "";
                    str += tData.areaSelectMode.maxPlayer + "人,";
                    str += tData.areaSelectMode.minRedNum + "红起胡,";
                    str += ["无", "一", "二", "三", "四"][tData.areaSelectMode.kingNum] + "王";
                    str += tData.areaSelectMode.isShuangHe ? ",双合翻倍" : "";


                    str += tData.areaSelectMode.isDaHu ? ",大胡10分" : "";
                    str += tData.areaSelectMode.isPengPengHu ? ",碰碰胡" : "";
                    str += tData.areaSelectMode.isYiGuaBian ? ",一挂匾" : "";
                    str += tData.areaSelectMode.isHuDieFei ? ",蝴蝶飞" : "";
                    str += tData.areaSelectMode.isSiPeng ? ",四碰单吊" : "";
                    str += tData.areaSelectMode.isManTangHong ? ",满堂红" : "";
                    str += tData.areaSelectMode.isBanBanHu ? ",板板胡" : "";
                    str += tData.areaSelectMode.isShiErHong ? ",十二红" : "";
                    str += tData.areaSelectMode.isShiYiiHong ? ",十一红" : "";
                    str += tData.areaSelectMode.isFengDing  ? ",80分封顶" : "";
                    str += tData.areaSelectMode.isJuJuHong ? ",句句红" : "";
                    

                    // if(tData.areaSelectMode.isBanBanHu){
                    //     str += [",闲家胡桌面第一张牌",",闲家胡自己摸的第一张牌"][tData.areaSelectMode.banBanHuType];
                    // }

                    var sData = MjClient.data.sData;
                    var str7 = "  二缺一";
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 3){
                        if((MjClient.MaxPlayerNum_YueYangWaiHuZi - Object.keys(sData.players).length) == 2){
                            str7 = "  一缺二";
                        }
                    }else if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4){
                        if((MjClient.MaxPlayerNum_YueYangWaiHuZi - Object.keys(sData.players).length) == 3){
                            str7 = "  一缺三";
                        }else if((MjClient.MaxPlayerNum_YueYangWaiHuZi - Object.keys(sData.players).length) == 2){
                            str7 = "二缺二";
                        }else  if((MjClient.MaxPlayerNum_YueYangWaiHuZi - Object.keys(sData.players).length) == 1){
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
                    var str6 = str7+",速度加入【"+AppCnName[MjClient.getAppType()]+"】\n" + "(复制此消息打开游戏可直接进入该房间)";
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
                _click: function() {
                    var settringLayer = new ZiPaiSettingView();
                    settringLayer.setName("PlayLayerClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi", {uid:SelfUid(),gameType:MjClient.gameType});
                }
            },
            changeBg: {
                _run: function() {
                    if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
                        this.loadTextureNormal("playing/ziPaiBanner/wenhao.png");
                        this.setContentSize(this.getNormalTextureSize());
                    }
                },
                _click: function() {
                    if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
                        postEvent("EZP_rule");
                    }else {
                        ziPai.setCurrentGameBgTypeToNext();
                        postEvent("changeGameBgEvent", {});
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Pifu", {uid:SelfUid(),gameType:MjClient.gameType});
                    }
                }
            },
            gps_btn: {
                //_layout: [[0.09, 0.09],[0.38, 0.93],[0, 0]],
                _run:function () {
                    //this.visible = MjClient.MaxPlayerNum_YueYangWaiHuZi >= 3 ? true : false;
                    this.setVisible(MjClient.MaxPlayerNum_YueYangWaiHuZi >= 3);
                },
                _click: function() {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 3){
                        MjClient.Scene.addChild(new showDistance3PlayerLayer());
                    }else if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4){
                        MjClient.Scene.addChild(new showDistanceLayer());
                    }
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dingwei", {uid: SelfUid(),gameType:MjClient.gameType});
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
                                //if (!MjClient.enterui && !getClubInfoInTable())
                                //    MjClient.Scene.addChild(new EnterRoomLayer());
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
                        this.visible = IsArrowVisible_YueYangWaiHuZi();
                    },
                    mjhand: function(eD) {
                        this.visible = IsArrowVisible_YueYangWaiHuZi();
                    },
                    onlinePlayer: function(eD) {
                        this.visible = IsArrowVisible_YueYangWaiHuZi();
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
                        if (tData) return ((tData.roundAll - tData.roundNum + 1 + extraNum).toString()+"/"+tData.roundAll.toString()+"局");
                    },
                    _event: {
                        mjhand: function() {
                            var sData = MjClient.data.sData;
                            var tData = sData.tData;
                            var extraNum = tData.extraNum ? tData.extraNum:0;
                            if (tData) return this.setString((tData.roundAll - tData.roundNum + 1 + extraNum).toString()+"/"+tData.roundAll.toString()+"局");
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
            //         if((MjClient.MaxPlayerNum_YueYangWaiHuZi - Object.keys(sData.players).length) == 2){
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
                    getPlayingRoomInfo(2);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Yaoqingweixinhaoyou", {uid:SelfUid(), gameType:MjClient.gameType});

                    // var tData = MjClient.data.sData.tData;

                    // var str = "";
                    // str += tData.areaSelectMode.maxPlayer + "人,";
                    // str += tData.areaSelectMode.minRedNum + "红起胡,";
                    // str += ["无", "一", "二", "三", "四"][tData.areaSelectMode.kingNum] + "王";
                    // str += tData.areaSelectMode.isShuangHe ? ",双合翻倍" : "";
                    // str += tData.areaSelectMode.isDaHu ? ",大胡10分" : "";
                    // str += tData.areaSelectMode.isPengPengHu ? ",碰碰胡" : "";
                    // str += tData.areaSelectMode.isYiGuaBian ? ",一挂匾" : "";
                    // str += tData.areaSelectMode.isHuDieFei ? ",蝴蝶飞" : "";
                    // str += tData.areaSelectMode.isSiPeng ? ",四碰单吊" : "";
                    // str += tData.areaSelectMode.isManTangHong ? ",满堂红" : "";
                    // str += tData.areaSelectMode.isBanBanHu ? ",板板胡" : "";
                    // str += tData.areaSelectMode.isShiErHong ? ",十二红" : "";
                    // str += tData.areaSelectMode.isShiYiiHong ? ",十一红" : "";
                    // str += tData.areaSelectMode.isFengDing  ? ",80分封顶" : "";
                    // str += tData.areaSelectMode.isJuJuHong ? ",句句红" : "";

                    // // if(tData.areaSelectMode.isBanBanHu){
                    // //     str += [",闲家胡桌面第一张牌",",闲家胡自己摸的第一张牌"][tData.areaSelectMode.banBanHuType];
                    // // }
                    // str += "点击立即加入牌局>>>";

                    // var sData = MjClient.data.sData;
                    // var str7 = "  二缺一";
                    // if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 3){
                    //     if((MjClient.MaxPlayerNum_YueYangWaiHuZi - Object.keys(sData.players).length) == 2){
                    //         str7 = "  一缺二";
                    //     }
                    // }else if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4){
                    //     if((MjClient.MaxPlayerNum_YueYangWaiHuZi - Object.keys(sData.players).length) == 3){
                    //         str7 = "  一缺三";
                    //     }else if((MjClient.MaxPlayerNum_YueYangWaiHuZi - Object.keys(sData.players).length) == 2){
                    //         str7 = "二缺二";
                    //     }else  if((MjClient.MaxPlayerNum_YueYangWaiHuZi - Object.keys(sData.players).length) == 1){
                    //         str7 = "三缺一";
                    //     }
                    // }
                    // var txt_club = tData.clubId ? " 亲友圈(" + tData.clubId + ")" : "";
                    // cc.log("str=" + str + " str7=" + str7);
                    // MjClient.native.wxShareUrl(MjClient.remoteCfg.entreRoomUrl+"?vipTable="+tData.tableid, GameCnName[MjClient.gameType] + "  房间号:" + tData.tableid + str7+txt_club, str);
                },
                _visible:function(){
                    return !MjClient.remoteCfg.guestLogin;
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
            delroom: {
                _run:function(){
                    if (isIPhoneX()) {
                        setWgtLayout(this, [0.11, 0.11],[0.1, 0.5],[0, 0]);
                    }
                    else {
                        setWgtLayout(this, [0.11, 0.11],[0.05, 0.5],[0, 0]);
                    }
                    this.visible = false;
                },
                _click: function() {
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Jiesanfangjian", {uid:SelfUid(), gameType:MjClient.gameType});

                    MjClient.delRoom(true);
                },
                _event: {
                    initSceneData: function(eD) {
                        //this.visible = isShowBackBtn_YueYangWaiHuZi();
                    },
                    removePlayer: function(eD) {
                        //this.visible = isShowBackBtn_YueYangWaiHuZi();
                    },
                    mjhand: function(){
                        //this.visible = false;
                    },
                    waitReady:function()
                    {
                        //this.visible = true;
                    },
                }
            },
            backHomebtn: {
                _run:function(){
                    setWgtLayout(this, [219/1280, 0],[0.30, 0.12],[0, 0]);
                },
                _click: function(btn) {
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Likaifangjian", {uid:SelfUid(), gameType:MjClient.gameType});

                    var sData = MjClient.data.sData;
                    if (sData) {
                        if (IsRoomCreator()) {
                            MjClient.showMsg("返回大厅房间仍然保留\n赶快去邀请好友吧",
                                function() {
                                    MjClient.leaveGame();
                                    //if (!MjClient.enterui && !getClubInfoInTable())
                                    //    MjClient.Scene.addChild(new EnterRoomLayer());
                                },
                                function() {});
                        } else {
                            MjClient.showMsg("确定要退出房间吗？",
                                function() {
                                    MjClient.leaveGame();
                                    //if (!MjClient.enterui && !getClubInfoInTable())
                                    //    MjClient.Scene.addChild(new EnterRoomLayer());
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
                        this.visible = isShowBackBtn_YueYangWaiHuZi();
                    },
                    removePlayer: function(eD) {
                        this.visible = isShowBackBtn_YueYangWaiHuZi();
                    },
                    startShuffleCards:function () {
                        this.visible = false;
                    },
                    mjhand: function(){
                        this.visible = false;
                    },
                    waitReady:function()
                    {
                        this.visible = true;
                    },
                    PKPass:function () {
                        this.visible = false;
                    },
                    onlinePlayer: function(msg) {
                        if(msg.uid  == SelfUid())
                        {
                            this.visible = false;
                        }
                    },
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
        btns_piao:{
            _visible:false,
            _layout: [[0.006, 0.006], [0.5, 0.5], [0, 0]],
            _run:function() {
            },
            _event: {
                initSceneData: function() {
                    this.visible = false;
                    var pl = getUIPlayer_YueYangWaiHuZi(0);
                    var tData = MjClient.data.sData.tData;
                    if(!pl) return;
                    if (tData.tState == TableState.waitJiazhu && pl.piaoFen == -1 && tData.areaSelectMode.piaoFen > 0) {
                        this.visible = true;
                        var piaoRes = [[1,2,3],[2,3,5]][tData.areaSelectMode.piaoFen - 1];
                        for (var i = 0; i < 3; ++ i){
                            var btn = this.getChildByName("btn_piao" + (i + 1));
                            if (btn){
                                btn.loadTextureNormal("playing/chenzhouzipai/piao" + piaoRes[i] + ".png");
                                btn.loadTexturePressed("playing/chenzhouzipai/piao" + piaoRes[i] + "_s.png");
                            }
                        }
                    }
                },
                waitJiazhu:function (msg) {
                    var tData = MjClient.data.sData.tData;
                    if ( tData.tState == TableState.waitJiazhu && tData.areaSelectMode.piaoFen > 0) {
                        this.visible = true;
                        var piaoRes = [[1,2,3],[2,3,5]][tData.areaSelectMode.piaoFen - 1];
                        for (var i = 0; i < 3; ++ i){
                            var btn = this.getChildByName("btn_piao" + (i + 1));
                            if (btn){
                                btn.loadTextureNormal("playing/chenzhouzipai/piao" + piaoRes[i] + ".png");
                                btn.loadTexturePressed("playing/chenzhouzipai/piao" + piaoRes[i] + "_s.png");
                            }
                        }
                    }
                    if (MjClient.webViewLayer != null)
                    {
                        MjClient.webViewLayer.close();
                    }
                },
                MJJiazhu: function(msg) {
                    if(!msg.uid || msg.piaoFen == undefined)
                        return;
                    if (msg.piaoFen != -1 && msg.uid == SelfUid()) {
                        this.setVisible(false);
                    }
                },
                mjhand: function(eD) {
                    this.visible = false;
                },
            },
            btn_piao0: {
                _click:function() {
                    var pl = getUIPlayer_YueYangWaiHuZi(0);
                    pl.piaoFen = -1;
                    paioFenToServer_YueYangWaiHuZi(0);
                },
            },
            btn_piao1: {
                _click:function() {
                    var pl = getUIPlayer_YueYangWaiHuZi(0);
                    pl.piaoFen = -1;
                    paioFenToServer_YueYangWaiHuZi(1);
                },
            },
            btn_piao2: {
                _click:function() {
                    var pl = getUIPlayer_YueYangWaiHuZi(0);
                    pl.piaoFen = -1;
                    paioFenToServer_YueYangWaiHuZi(2);
                },
            },
            btn_piao3: {
                _click:function() {
                    var pl = getUIPlayer_YueYangWaiHuZi(0);
                    pl.piaoFen = -1;
                    paioFenToServer_YueYangWaiHuZi(3);
                },
            },
        },
        BtnReady:{
            _run: function () {
                this.visible = false;
                //setWgtLayout(this,[0.135, 0.128], [0.5, 0.40], [0.0, 0.26]);
                setWgtLayout(this,[219/1280, 0],[0.697, 0.12],[0, 0]);
            },
            _click: function(btn) {
                cc.log("-----------准备-------");
                //sendQiangdizhu(true);
                HZPassConfirmToServer_YueYangWaiHuZi();
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zhunbei", {uid: SelfUid(), gameType:MjClient.gameType});
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
                    if(msg.uid  == SelfUid())
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
                chuizi_tips : {
                    _run: function(){
                        setJiachuiImgTips_YueYangWaiHuZi(this, 0);
                    },
                    _event: {
                        initSceneData: function() {
                            setJiachuiImgTips_YueYangWaiHuZi(this, 0);
                        },
                        mjhand: function() {
                            setJiachuiImgTips_YueYangWaiHuZi(this, 0);
                        },
                        roundEnd: function() {
                            // this.visible = false;
                        },
                        waitJiazhu: function() {
                            this.visible = false;
                        },
                        startShuffleCards:function () {
                            setJiachuiImgTips_YueYangWaiHuZi(this, 0);
                        }
                    }
                },
                jiachuiText_tips : {
                    _run: function() {
                        setJiachuiTextTips_YueYangWaiHuZi(this, 0);
                    },
                    _event:{
                        initSceneData: function() {
                            setJiachuiTextTips_YueYangWaiHuZi(this, 0);
                        },
                        MJJiazhu: function(msg) {
                            var pl = getUIPlayer_YueYangWaiHuZi(0);
                            if (msg.uid == pl.info.uid) {
                                setJiachuiTextTips_YueYangWaiHuZi(this, 0);
                            }
                        },
                        mjhand: function() {
                            this.visible = false;
                        },
                        startShuffleCards:function () {
                            setJiachuiTextTips_YueYangWaiHuZi(this, 0);
                        }
                    }
                },
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function(){
                            showUserZhuangLogo_YueYangWaiHuZi(this, 0);
                        },
                        initSceneData: function(){
                            if (IsArrowVisible_YueYangWaiHuZi()) showUserZhuangLogo_YueYangWaiHuZi(this, 0);
                        },
                        mjhand: function(){
                            if (IsArrowVisible_YueYangWaiHuZi()) showUserZhuangLogo_YueYangWaiHuZi(this, 0);
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

                                showUserChat_YueYangWaiHuZi(this, 0, msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat_YueYangWaiHuZi(this, 0, MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    showPlayerInfo_YueYangWaiHuZi(0, btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead_YueYangWaiHuZi(this, d, 0);
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon_YueYangWaiHuZi(this,0);
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon_YueYangWaiHuZi(this,0);
                    }
                },
                _run: function () {
                    showFangzhuTagIcon_YueYangWaiHuZi(this,0);
                },
                score_bg:{_visible:false},
                huxi:{
                    _run:function () {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _visible: false,
                    _event:{
                        clearCardUI: function(){
                            this.setVisible(false);
                            return this.setString("胡息:0");
                        },
                        addPlayer: function(){
                            return this.setString("胡息:0");
                        },
                        removePlayer: function(){
                            this.visible = false;
                        },
                        initSceneData:function(){
                            this.visible = true;
                            var huXi = UpdateHuXi_YueYangWaiHuZi(0);
                            if(!IsArrowVisible_YueYangWaiHuZi()){
                                huXi = 0;
                                this.visible = false;
                            }
                            return this.setString("胡息:" + huXi);
                        },
                        mjhand:function(){
                            this.visible = true;
                        },
                        HZChiCard:function(){
                            var huXi = UpdateHuXi_YueYangWaiHuZi(0);
                            return this.setString("胡息:" + huXi);
                        },
                        MJPeng:function(){
                            var huXi = UpdateHuXi_YueYangWaiHuZi(0);
                            return this.setString("胡息:" + huXi);
                        },
                        HZLiuCard:function(){
                            var huXi = UpdateHuXi_YueYangWaiHuZi(0);
                            return this.setString("胡息:" + huXi);
                        },
                        HZWeiCard:function(){
                            var huXi = UpdateHuXi_YueYangWaiHuZi(0);
                            return this.setString("胡息:" + huXi);
                        },
                        LY_addHandHuXi:function () {
                            var huXi = UpdateHuXi_YueYangWaiHuZi(0);
                            return this.setString("胡息:" + huXi);
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
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(0);
                        },
                        onlinePlayer: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(0) && IsArrowVisible_YueYangWaiHuZi();
                        },
                        waitPut: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(0);
                        },
                        HZNewCard: function(ed){
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(0);
                        },
                        MJPeng: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(0);
                        },
                        HZChiCard: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(0);
                        },
                        HZLiuCard: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(0);
                        },
                        HZWeiCard: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(0);
                        },
                        MJPut: function(eD){
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(0);
                        },
                        roundEnd: function(eD){
                            //this.visible = false;
                        }
                    },
                    time:{
                        _run: function() {
                            this.setString("0");
                        },
                        _event: {
                            initSceneData: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(0)){
                                    arrowbkNumberUpdate(this);
                                    this.setString("0");
                                }
                            },
                            mjhand: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPeng: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZNewCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZLiuCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZChiCard: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZWeiCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(0)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPut: function(msg) {
                                if (curPlayerIsMe_YueYangWaiHuZi(0)) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    this.setString("0");
                                }
                            },
                            onlinePlayer: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                var pl = getUIPlayer_YueYangWaiHuZi(0);
                                if(pl && pl.onLine && curPlayerIsMe_YueYangWaiHuZi(0)){
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
                            var pl = getUIPlayer_YueYangWaiHuZi(0);
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
                    GetReadyVisible_YueYangWaiHuZi(this, 0);
                },
                _event: {
                    startShuffleCards:function () {
                        GetReadyVisible_YueYangWaiHuZi(this, 0);
                    },
                    initSceneData:function () {
                        GetReadyVisible_YueYangWaiHuZi(this, 0);
                    },
                    moveHead: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, 0);//根据状态设置ready 是否可见 add by sking
                    },
                    waitJiazhu:function () {
                        GetReadyVisible_YueYangWaiHuZi(this, 0);
                    },
                    removePlayer: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, 0);
                    },
                    onlinePlayer: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, 0);
                    }
                }
            },
            handNode: {
                _visible: false,
                _event:  {
                    initSceneData: function() {
                        calculateHintPutList_YueYangWaiHuZi();
                    },
                    mjhand:function () {
                        calculateHintPutList_YueYangWaiHuZi();
                    },
                    HZPickCard: function() {
                        calculateHintPutList_YueYangWaiHuZi();
                    },
                    HZAddCards: function() {
                        calculateHintPutList_YueYangWaiHuZi();
                    },
                    HZChiCard: function() {
                        calculateHintPutList_YueYangWaiHuZi();
                    },
                    MJPeng: function() {
                        calculateHintPutList_YueYangWaiHuZi();
                    },
                    MJPut: function() {
                        calculateHintPutList_YueYangWaiHuZi();
                    },
                    HZWeiCard: function() {
                        calculateHintPutList_YueYangWaiHuZi();
                    },
                    HZLiuCard: function() {
                        calculateHintPutList_YueYangWaiHuZi();
                    },
                    MJPass: function() { // 天胡 提 偎 跑后过胡
                        calculateHintPutList_YueYangWaiHuZi();
                        addTingSign_YueYangWaiHuZi(MjClient.playui._downNode);
                    },
                    HZCheckRaise: function() {
                        calculateHintPutList_YueYangWaiHuZi();
                        addTingSign_YueYangWaiHuZi(MjClient.playui._downNode);
                    },
                    waitPut:function () {
                        calculateHintPutList_YueYangWaiHuZi();
                        addTingSign_YueYangWaiHuZi(MjClient.playui._downNode);
                    },
                }
            },
            replayNode:{
                _visible:true,
                _layout:[[0.1, 0.1], [0.15, 0.05], [0, 0]]
            },
            eatNode: {
                _visible: true,
                _layout : [[0.14, 0.14], [0.02, 0.23], [0, 0]]
            },
            outNode: {
                _visible: true,
                _layout : [[0.14, 0.14], [0.7, 0.5], [0, 0]]
            },
            handCard: {
                _run:function () {
                    this.ignoreContentAdaptWithSize(true);
                    //ziPai.setWgtLayoutHandCard(this);
                    var oldFile = this.getRenderFile().file;
                    var newFile = getNewMJBgFile_YueYangWaiHuZi(oldFile, ziPai.getZiPaiType());
                    this.loadTexture(newFile);
                    var wFactor = [98, 95, 100, 103][ziPai.getZiPaiType()] * [[0.89, 0.77, 0.97], [0.92, 0.79, 1], [0.87, 0.75, 0.95], [0.84, 0.73, 0.92]][ziPai.getZiPaiType()][ziPai.getCardSize()];
                    setWgtLayout(this, [wFactor / 1280, 0],[0.27,0.75],[0,0]);
                    var file = this.getRenderFile().file;
                    cc.log("handCard _run", " file = " + file + " scaleX = " + this.scaleX);
                },
                _visible: false,
                _event:{
                    changeMJBgEvent: function() {
                       //ziPai.setWgtLayoutHandCard(this);
                        var oldFile = this.getRenderFile().file;
                        var newFile = getNewMJBgFile_YueYangWaiHuZi(oldFile, ziPai.getZiPaiType());
                        this.loadTexture(newFile);
                        var wFactor = [98, 115, 100, 103][ziPai.getZiPaiType()] * [[0.89, 0.77, 0.97], [0.75, 0.65, 0.83], [0.87, 0.75, 0.95], [0.84, 0.73, 0.92]][ziPai.getZiPaiType()][ziPai.getCardSize()];
                        setWgtLayout(this, [wFactor / 1280, 0],[0.27,0.75],[0,0]);
                        var file = this.getRenderFile().file;
                        cc.log("handCard changeMJBgEvent", " file = " + file + " scaleX = " + this.scaleX);
                        if(MjClient.debug_YueYangWaiHuZi){
                            var handNode = MjClient.playui._downNode.getChildByName("handNode");
                            if(handNode){
                                handNode.removeAllChildren();
                            }
                        }
                        MjClient.playui.ResetHandCard(MjClient.playui._downNode,0,false,true);
                    },
                    EZP_tingPai:function (index) {
                        MjClient.playui.ResetHandCard(MjClient.playui._downNode,0,false,true);
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
                        this.loadTexture("playing/paohuzi/mopai_bj.png");
                    },
                    HZNewCard: function(eD){
                        this.loadTexture("playing/paohuzi/mopai_bj_no_effect.png");
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
                }
            },
            out0: {
                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    clearCardUI_YueYangWaiHuZi(this, 0);
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
                    RemovePutCardOut_YueYangWaiHuZi(true);
                },
                initSceneData: function(eD) {
                    SetUserVisible_YueYangWaiHuZi(this, 0);
                    InitUserHandUI_YueYangWaiHuZi(this, 0);
                    InitUserCoinAndName_YueYangWaiHuZi(this, 0);
                    MjClient.hasPut = false; // 重连回来重置打掉牌标志（打牌时候断线)
                    ShowPutCardIcon_YueYangWaiHuZi();
                    DealOffLineCard_YueYangWaiHuZi(this,0);
                    resetHandAfterBegin_YueYangWaiHuZi();
                },
                addPlayer: function(eD) {
                    SetUserVisible_YueYangWaiHuZi(this, 0);
                    InitUserCoinAndName_YueYangWaiHuZi(this, 0);
                },
                removePlayer: function(eD) {
                    SetUserVisible_YueYangWaiHuZi(this, 0);
                    InitUserCoinAndName_YueYangWaiHuZi(this, 0);
                },
                mjhand: function(eD) {
                    InitUserHandUI_YueYangWaiHuZi(this, 0);
                    InitUserCoinAndName_YueYangWaiHuZi(this, 0);

                    var uid = getUIPlayer_YueYangWaiHuZi(0).info.uid;
                    if (eD.jiazhuNums)
                    {
                        for (var key in eD.jiazhuNums)
                        {
                            if (key != uid && eD.jiazhuNums[key] == 2)
                                MjClient.playui._jiazhuWait.visible = true;
                        }
                    }
                    if(MjClient.playui.playuiNode.cutCardView){
                        MjClient.playui.playuiNode.cutCardView.cutCardsEffect(this);
                    }
                },
                roundEnd: function() {
                    InitUserCoinAndName_YueYangWaiHuZi(this, 0);
                },
                HZNewCard: function(eD) {
                    if (typeof(eD) == "number") {
                        eD = {newCard: eD};
                    }
                    DealNewCard_YueYangWaiHuZi(this,eD,0);
                },
                MJPut: function(eD) {
                    DealPutCard_YueYangWaiHuZi(this,eD,0);
                },
                HZChiCard: function(eD) {
                    DealChiCard_YueYangWaiHuZi(this, eD, 0);
                    ShowPutCardIcon_YueYangWaiHuZi();
                },
                HZWeiCard: function(eD){
                    DealWeiCard_YueYangWaiHuZi(this,eD,0);
                },
                HZLiuCard: function(eD) {
                    DealGangCard_YueYangWaiHuZi(this, eD, 0);
                },
                MJPeng: function(eD) {
                    DealPengCard_YueYangWaiHuZi(this, eD, 0);
                    ShowPutCardIcon_YueYangWaiHuZi();
                },
                MJHu: function(eD) {
                    DealHu_YueYangWaiHuZi(this, eD, 0);
                },
                onlinePlayer: function(eD) {
                    resetHandAfterBegin_YueYangWaiHuZi();
                    setUserOffline_YueYangWaiHuZi(this, 0);
                },
                playerStatusChange: function(eD) {
                    setUserOffline_YueYangWaiHuZi(this, 0);
                },
                MJFlower: function(eD) {
                    HandleMJFlower(this, eD, 0);
                },
                MJTing: function (eD) {
                    HandleMJTing(this, eD, 0);
                },
                MJJiazhu: function(msg) {
                    ShowPutCardIcon_YueYangWaiHuZi();
                    MjClient.playui.EatVisibleCheck();
                    MjClient.playui._jiazhuWait.visible = false;
                    MjClient.playui.resetJiaZhuTip();
                    MjClient.majiang.setJiaZhuNum(MjClient.playui._downNode, getUIPlayer_YueYangWaiHuZi(0));
                    MjClient.majiang.setJiaZhuNum(MjClient.playui._rightNode, getUIPlayer_YueYangWaiHuZi(1));
                    MjClient.majiang.setJiaZhuNum(MjClient.playui._topNode, getUIPlayer_YueYangWaiHuZi(2));
                },
                HZPickCard:function (eD) {
                    var pl = getUIPlayer_YueYangWaiHuZi(0);
                    if(eD.uid == pl.info.uid) {
                        MjClient.HandCardArr = MjClient.majiang.sortCard3(pl.mjhand, 2)
                    }
                    RemovePutCardOut_YueYangWaiHuZi(true);
                    MjClient.playui.ResetHandCard(this,0);

                    ShowPutCardIcon_YueYangWaiHuZi();
                },
                HZAddCards:function (eD) {
                    DealAddCard_YueYangWaiHuZi(this,eD, 0);
                },
                HZCheckRaise:function (msg) {
                    ShowPutCardIcon_YueYangWaiHuZi();
                    MjClient.playui.EatVisibleCheck();

                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer_YueYangWaiHuZi(0);
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
                        MjClient.majiang.setJiaZhuNum(node, getUIPlayer_YueYangWaiHuZi(off));
                    }
                },
            }
        },
        xing: {
            _run:function () {
                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 3 || MjClient.MaxPlayerNum_YueYangWaiHuZi == 2){
                    this.setVisible(false);
                }
            },
            head: {
                chuizi_tips : {
                    _run: function(){
                        if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                            setJiachuiImgTips_YueYangWaiHuZi(this, 1);
                        }
                    },
                    _event: {
                        initSceneData: function() {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                setJiachuiImgTips_YueYangWaiHuZi(this, 1);
                            }
                        },
                        mjhand: function() {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                setJiachuiImgTips_YueYangWaiHuZi(this, 1);
                            }
                        },
                        roundEnd: function() {
                            // this.visible = false;
                        },
                        waitJiazhu: function() {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                this.visible = false;
                            }
                        },
                        startShuffleCards:function () {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                setJiachuiImgTips_YueYangWaiHuZi(this, 1);
                            }
                        }
                    }
                },
                jiachuiText_tips : {
                    _run:function() {
                        if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                            setJiachuiTextTips_YueYangWaiHuZi(this, 1);
                        }
                    },
                    _event:{
                        initSceneData: function() {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                setJiachuiTextTips_YueYangWaiHuZi(this, 1);
                            }
                        },
                        MJJiazhu: function(msg) {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                var pl = getUIPlayer_YueYangWaiHuZi(1)
                                if (msg.uid == pl.info.uid) {
                                    setJiachuiTextTips_YueYangWaiHuZi(this, 1);
                                }
                            }
                        },
                        mjhand: function() {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                this.visible = false;
                            }
                        },
                        startShuffleCards:function () {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                setJiachuiTextTips_YueYangWaiHuZi(this, 1);
                            }
                        }
                    }
                },
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function() {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                showUserZhuangLogo_YueYangWaiHuZi(this, 1);
                            }
                        },
                        initSceneData: function() {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                if (IsArrowVisible_YueYangWaiHuZi()) showUserZhuangLogo_YueYangWaiHuZi(this, 1);
                            }
                        },
                        mjhand: function(){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                if (IsArrowVisible_YueYangWaiHuZi()) showUserZhuangLogo_YueYangWaiHuZi(this, 1);
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
                                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                    showUserChat_YueYangWaiHuZi(this, 1, msg);
                                }
                            },
                            playVoice: function(voicePath) {
                                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                    MjClient.data._tempMessage.msg = voicePath;
                                    showUserChat_YueYangWaiHuZi(this, 1, MjClient.data._tempMessage);
                                }
                            }
                        }
                    }
                },
                _click: function(btn) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        showPlayerInfo_YueYangWaiHuZi(1, btn);
                    }
                },
                _event: {
                    loadWxHead: function(d) {
                        if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                            setWxHead_YueYangWaiHuZi(this, d, 1);
                        }
                    },
                    addPlayer: function(eD) {
                        if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                            showFangzhuTagIcon_YueYangWaiHuZi(this, 1);
                        }
                    },
                    removePlayer: function(eD) {
                        if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                            showFangzhuTagIcon_YueYangWaiHuZi(this, 1);
                        }
                    }
                },
                _run: function () {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        showFangzhuTagIcon_YueYangWaiHuZi(this, 1);
                    }
                },
                score_bg:{_visible:false},
                huxi:{
                    _visible: false,
                    _event:{
                        clearCardUI: function(){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                this.setVisible(false);
                                return this.setString("0胡息");
                            }
                        },
                        addPlayer: function(){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                return this.setString("0胡息");
                            }
                        },
                        removePlayer: function(){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                this.visible = false;
                            }
                        },
                        initSceneData:function(){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                // this.visible = true;
                                var huXi = UpdateHuXi_YueYangWaiHuZi(1);
                                if (!IsArrowVisible_YueYangWaiHuZi()) {
                                    huXi = 0;
                                }
                                return this.setString(huXi + "胡息");
                            }
                        },
                        mjhand:function(){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                // this.visible = true;
                            }
                        },
                        HZChiCard:function(){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                var huXi = UpdateHuXi_YueYangWaiHuZi(1);
                                return this.setString(huXi + "胡息");
                            }
                        },
                        MJPeng:function(){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                var huXi = UpdateHuXi_YueYangWaiHuZi(1);
                                return this.setString(huXi + "胡息");
                            }
                        },
                        HZLiuCard:function(){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                var huXi = UpdateHuXi_YueYangWaiHuZi(1);
                                return this.setString(huXi + "胡息");
                            }
                        },
                        HZWeiCard:function(){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                var huXi = UpdateHuXi_YueYangWaiHuZi(1);
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
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                //this.visible = curPlayerIsMe_YueYangWaiHuZi(1);
                            }
                            // MjClient.playui.refreshHeadLight(true);
                        },
                        onlinePlayer: function(eD) {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                //this.visible = curPlayerIsMe_YueYangWaiHuZi(1) && IsArrowVisible_YueYangWaiHuZi();
                            }
                        },
                        waitPut: function(eD) {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                //this.visible = curPlayerIsMe_YueYangWaiHuZi(1);
                            }
                            // MjClient.playui.refreshHeadLight(true);
                        },
                        HZNewCard: function(ed){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                //this.visible = curPlayerIsMe_YueYangWaiHuZi(1);
                            }
                            // MjClient.playui.refreshHeadLight(true);
                        },
                        MJPeng: function(eD) {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                //this.visible = curPlayerIsMe_YueYangWaiHuZi(1);
                            }
                            // MjClient.playui.refreshHeadLight(true);
                        },
                        HZChiCard: function(eD) {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                //this.visible = curPlayerIsMe_YueYangWaiHuZi(1);
                            }
                            // MjClient.playui.refreshHeadLight(true);
                        },
                        HZLiuCard: function(eD) {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                //this.visible = curPlayerIsMe_YueYangWaiHuZi(1);
                            }
                            // MjClient.playui.refreshHeadLight(true);
                        },
                        HZWeiCard: function(eD) {
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                //this.visible = curPlayerIsMe_YueYangWaiHuZi(1);
                            }
                            // MjClient.playui.refreshHeadLight(true);
                        },
                        MJPut: function(eD){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                //this.visible = curPlayerIsMe_YueYangWaiHuZi(1);
                            }
                            // MjClient.playui.refreshHeadLight(true);
                        },
                        roundEnd: function(eD){
                            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                //this.visible = false;
                            }
                            // MjClient.playui.refreshHeadLight(false);
                        }
                    },
                    time:{
                        _run: function() {
                            this.setString("0");
                        },
                        _event: {
                            initSceneData: function(eD) {
                                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_YueYangWaiHuZi(1)) {
                                        arrowbkNumberUpdate(this);
                                        this.setString("0");
                                    }
                                }
                            },
                            mjhand: function(eD) {
                                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_YueYangWaiHuZi(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            MJPeng: function() {
                                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_YueYangWaiHuZi(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            HZNewCard: function(){
                                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_YueYangWaiHuZi(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            HZLiuCard: function(){
                                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_YueYangWaiHuZi(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            HZChiCard: function() {
                                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_YueYangWaiHuZi(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            HZWeiCard: function(){
                                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    if (curPlayerIsMe_YueYangWaiHuZi(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            MJPut: function(msg) {
                                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                    if (curPlayerIsMe_YueYangWaiHuZi(1)) {
                                        this.stopAllActions();
                                        stopEffect(playTimeUpEff);
                                        playTimeUpEff = null;
                                        this.setString("0");
                                    }
                                }
                            },
                            onlinePlayer: function(){
                                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    var pl = getUIPlayer_YueYangWaiHuZi(1);
                                    if (pl && pl.onLine && curPlayerIsMe_YueYangWaiHuZi(1)) {
                                        arrowbkNumberUpdate(this);
                                    }
                                }
                            },
                            roundEnd: function() {
                                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
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
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        GetReadyVisible_YueYangWaiHuZi(this, 1);
                    }
                },
                _event: {
                    startShuffleCards:function () {
                        if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                            GetReadyVisible_YueYangWaiHuZi(this, -1);
                        }
                    },
                    moveHead: function() {
                        if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                            GetReadyVisible_YueYangWaiHuZi(this, -1);
                        }
                    },
                    addPlayer: function() {
                        if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                            GetReadyVisible_YueYangWaiHuZi(this, 1);
                        }
                    },
                    waitJiazhu: function() {
                        if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                            GetReadyVisible_YueYangWaiHuZi(this, 1);
                        }
                    },
                    removePlayer: function() {
                        if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                            GetReadyVisible_YueYangWaiHuZi(this, 1);
                        }
                    },
                    onlinePlayer: function() {
                        if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                            GetReadyVisible_YueYangWaiHuZi(this, 1);
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
                        this.loadTexture("playing/paohuzi/mopai_bj.png");
                    },
                    HZNewCard: function(eD){
                        this.loadTexture("playing/paohuzi/mopai_bj_no_effect.png");
                    }
                }
            },
            out0: {
                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        clearCardUI_YueYangWaiHuZi(this, 1);
                    }
                },
                clearCardArr: function(){
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        var eatNode = this.getChildByName("eatNode");
                        eatNode.removeAllChildren();
                        var outNode = this.getChildByName("outNode");
                        outNode.removeAllChildren();
                        RemovePutCardOut_YueYangWaiHuZi(true);
                    }
                },
                initSceneData: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        SetUserVisible_YueYangWaiHuZi(this, 1);
                        InitUserHandUI_YueYangWaiHuZi(this, 1);
                        InitUserCoinAndName_YueYangWaiHuZi(this, 1);
                        DealOffLineCard_YueYangWaiHuZi(this, 1);
                    }
                },
                addPlayer: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        SetUserVisible_YueYangWaiHuZi(this, 1);
                        InitUserCoinAndName_YueYangWaiHuZi(this, 1);
                    }
                },
                removePlayer: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        SetUserVisible_YueYangWaiHuZi(this, 1);
                        InitUserCoinAndName_YueYangWaiHuZi(this, 1);
                    }
                },
                mjhand: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        InitUserHandUI_YueYangWaiHuZi(this, 1);
                        InitUserCoinAndName_YueYangWaiHuZi(this, 1);
                    }
                },
                HZNewCard: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        if (typeof(eD) == "number") {
                            eD = {newCard: eD};
                        }
                        DealNewCard_YueYangWaiHuZi(this, eD, 1);
                    }
                },
                roundEnd: function() {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        InitUserCoinAndName_YueYangWaiHuZi(this, 1);
                        MjClient.playui.ResetOtherCard(this, 1);
                    }
                },
                waitPut: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        DealWaitPut(this, eD, 1);
                    }
                },
                MJPut: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        DealPutCard_YueYangWaiHuZi(this, eD, 1);
                    }
                },
                HZChiCard: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        DealChiCard_YueYangWaiHuZi(this, eD, 1);
                    }
                },
                HZLiuCard: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        DealGangCard_YueYangWaiHuZi(this, eD, 1);
                    }
                },
                MJPeng: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        DealPengCard_YueYangWaiHuZi(this, eD, 1);
                    }
                },
                HZWeiCard: function(eD){
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        DealWeiCard_YueYangWaiHuZi(this, eD, 1);
                    }
                },
                MJHu: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        DealHu_YueYangWaiHuZi(this, eD, 1);
                    }
                },
                onlinePlayer: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        setUserOffline_YueYangWaiHuZi(this, 1);
                    }
                },
                playerStatusChange: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        setUserOffline_YueYangWaiHuZi(this, 1);
                    }
                },
                MJFlower: function(eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        HandleMJFlower(this, eD, 1);
                    }
                },
                MJTing: function (eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        HandleMJTing(this, eD, 1);
                    }
                },
                waitJiazhu:function (msg) {
                    /*if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        postEvent("returnPlayerLayer");
                        /!*
                         弹窗加注
                         *!/
                        var layer = new jiaZhuXuzhouLayer(function () {
                            //弹窗等待
                            MjClient.playui._jiazhuWait.visible = true;
                        });
                        MjClient.playui.addChild(layer, 99);
                        if (MjClient.webViewLayer != null) {
                            MjClient.webViewLayer.close();
                        }
                    }*/
                },
                HZPickCard:function (eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        if (MjClient.rePlayVideo != -1) {
                            var pl = getUIPlayer_YueYangWaiHuZi(1);
                            if (eD.uid == pl.info.uid) {
                                MjClient.OtherHandArr[1] = MjClient.majiang.sortCard3(pl.mjhand, 2)
                            }
                        }

                        RemovePutCardOut_YueYangWaiHuZi(true);
                        MjClient.playui.ResetHandCard(this, 1);
                    }
                },
                HZAddCards:function (eD) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        DealAddCard_YueYangWaiHuZi(this, eD, 1);
                    }
                },
                HZCheckRaise:function (msg) {
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4) {
                        ShowPutCardIcon_YueYangWaiHuZi();
                        //MjClient.playui.EatVisibleCheck();

                        var tData = MjClient.data.sData.tData;
                        var pl = getUIPlayer_YueYangWaiHuZi(1);
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
                            MjClient.majiang.setJiaZhuNum(node, getUIPlayer_YueYangWaiHuZi(off));
                        }
                    }
                }
            }
        },
        right: {
            _run:function () {
                if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 2){
                    this.visible = false;
                }
            },
            head: {
                chuizi_tips : {
                    _run: function(){
                        setJiachuiImgTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    },
                    _event: {
                        initSceneData: function() {
                            setJiachuiImgTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        mjhand: function() {
                            setJiachuiImgTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        roundEnd: function() {
                            // this.visible = false;
                        },
                        waitJiazhu: function() {
                            this.visible = false;
                        },
                        startShuffleCards:function () {
                            setJiachuiImgTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        }
                    }
                },
                jiachuiText_tips : {
                    _run:function() {
                        setJiachuiTextTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    },
                    _event:{
                        initSceneData: function() {
                            setJiachuiTextTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        MJJiazhu: function(msg) {
                            var pl = getUIPlayer_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2)
                            if (msg.uid == pl.info.uid) {
                                setJiachuiTextTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                            }
                        },
                        mjhand: function() {
                            this.visible = false;
                        },
                        startShuffleCards:function () {
                            setJiachuiTextTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        }
                    }
                },
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function() {
                            showUserZhuangLogo_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        initSceneData: function() {
                            if (IsArrowVisible_YueYangWaiHuZi()) showUserZhuangLogo_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        mjhand: function(){
                            if (IsArrowVisible_YueYangWaiHuZi()) showUserZhuangLogo_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
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
                                showUserChat_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2, msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2, MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    showPlayerInfo_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2, btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead_YueYangWaiHuZi(this, d, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon_YueYangWaiHuZi(this,MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon_YueYangWaiHuZi(this,MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    }
                },
                _run: function () {
                    showFangzhuTagIcon_YueYangWaiHuZi(this,MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                score_bg:{_visible:false},
                huxi:{
                    _run:function () {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _visible: false,
                    _event:{
                        clearCardUI: function(){
                            this.setVisible(false);
                            return this.setString("胡息:0");
                        },
                        addPlayer: function(){
                            return this.setString("胡息:0");
                        },
                        removePlayer: function(){
                            this.visible = false;
                        },
                        initSceneData:function(){
                            this.visible = true;
                            var huXi = UpdateHuXi_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                            if(!IsArrowVisible_YueYangWaiHuZi()){
                                huXi = 0;
                                this.visible = false;
                            }
                            return this.setString("胡息:" + huXi);
                        },
                        mjhand:function(){
                            this.visible = true;
                        },
                        HZChiCard:function(){
                            var huXi = UpdateHuXi_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                            return this.setString("胡息:" + huXi);
                        },
                        MJPeng:function(){
                            var huXi = UpdateHuXi_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                            return this.setString("胡息:" + huXi);
                        },
                        HZLiuCard:function(){
                            var huXi = UpdateHuXi_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                            return this.setString("胡息:" + huXi);
                        },
                        HZWeiCard:function(){
                            var huXi = UpdateHuXi_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                            return this.setString("胡息:" + huXi);
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
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        onlinePlayer: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2) && IsArrowVisible_YueYangWaiHuZi();
                        },
                        waitPut: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        HZNewCard: function(ed){
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        MJPeng: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        HZChiCard: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        HZLiuCard: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        HZWeiCard: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        MJPut: function(eD){
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        },
                        roundEnd: function(eD){
                            //this.visible = false;
                        }
                    },
                    time:{
                        _run: function() {
                            this.setString("0");
                        },
                        _event: {
                            initSceneData: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2)){
                                    arrowbkNumberUpdate(this);
                                    this.setString("0");
                                }
                            },
                            mjhand: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPeng: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZNewCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZLiuCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZChiCard: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZWeiCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPut: function(msg) {
                                if (curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2)) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    this.setString("0");
                                }
                            },
                            onlinePlayer: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                var pl = getUIPlayer_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                                if(pl && pl.onLine && curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2)){
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
                    GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                _event: {
                    startShuffleCards:function () {
                        GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    },
                    initSceneData:function () {
                        GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    },
                    moveHead: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    },
                    waitJiazhu: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    },
                    removePlayer: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    },
                    onlinePlayer: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
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
                _layout : [[0.14, 0.14], [0.88, 0.82], [0, 0]]
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
                        this.loadTexture("playing/paohuzi/mopai_bj.png");
                    },
                    HZNewCard: function(eD){
                        this.loadTexture("playing/paohuzi/mopai_bj_no_effect.png");
                    }
                }
            },
            out0: {
                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    clearCardUI_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                clearCardArr: function(){
                    var eatNode = this.getChildByName("eatNode");
                    eatNode.removeAllChildren();
                    var outNode = this.getChildByName("outNode");
                    outNode.removeAllChildren();
                    RemovePutCardOut_YueYangWaiHuZi(true);
                },
                initSceneData: function(eD) {
                    SetUserVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    InitUserHandUI_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    InitUserCoinAndName_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    DealOffLineCard_YueYangWaiHuZi(this,MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                addPlayer: function(eD) {
                    SetUserVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    InitUserCoinAndName_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                removePlayer: function(eD) {
                    SetUserVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    InitUserCoinAndName_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                mjhand: function(eD) {
                    InitUserHandUI_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    InitUserCoinAndName_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                HZNewCard: function(eD) {
                    if (typeof(eD) == "number") {
                        eD = {newCard: eD};
                    }
                    DealNewCard_YueYangWaiHuZi(this,eD,MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                roundEnd: function() {
                    InitUserCoinAndName_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                    MjClient.playui.ResetOtherCard(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                waitPut: function(eD) {
                    //DealWaitPut(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                MJPut: function(eD) {
                    DealPutCard_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                HZChiCard: function(eD) {
                    DealChiCard_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                HZLiuCard: function(eD) {
                    DealGangCard_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                MJPeng: function(eD) {
                    DealPengCard_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                HZWeiCard: function(eD){
                    DealWeiCard_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                MJHu: function(eD) {
                    DealHu_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                onlinePlayer: function(eD) {
                    setUserOffline_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                playerStatusChange: function(eD) {
                    setUserOffline_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                MJFlower: function(eD) {
                    HandleMJFlower(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                MJTing: function (eD) {
                    HandleMJTing(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                waitJiazhu:function (msg) {
                    /*postEvent("returnPlayerLayer");
                    /!*
                     弹窗加注
                     *!/
                    var layer = new jiaZhuXuzhouLayer(function(){
                        //弹窗等待
                        MjClient.playui._jiazhuWait.visible = true;
                    });
                    MjClient.playui.addChild(layer,99);
                    if (MjClient.webViewLayer != null)
                    {
                        MjClient.webViewLayer.close();
                    }*/
                },
                HZPickCard:function (eD) {
                    if(MjClient.rePlayVideo != -1){
                        var pl = getUIPlayer_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                        if(eD.uid == pl.info.uid) {
                            MjClient.OtherHandArr[MjClient.MaxPlayerNum_YueYangWaiHuZi - 2] = MjClient.majiang.sortCard3(pl.mjhand, 2)
                        }
                    }

                    RemovePutCardOut_YueYangWaiHuZi(true);
                    MjClient.playui.ResetHandCard(this,MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                HZAddCards:function (eD) {
                    DealAddCard_YueYangWaiHuZi(this,eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
                },
                HZCheckRaise:function (msg) {
                    ShowPutCardIcon_YueYangWaiHuZi();
                    //MjClient.playui.EatVisibleCheck();

                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 2);
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
                        MjClient.majiang.setJiaZhuNum(node, getUIPlayer_YueYangWaiHuZi(off));
                    }
                }
            }
        },
        left: {
            head: {
                chuizi_tips : {
                    _run: function(){
                        setJiachuiImgTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    },
                    _event: {
                        initSceneData: function() {
                            setJiachuiImgTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        mjhand: function() {
                            setJiachuiImgTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        roundEnd: function() {
                            // this.visible = false;
                        },
                        waitJiazhu: function() {
                            this.visible = false;
                        },
                        startShuffleCards:function () {
                            setJiachuiImgTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        }
                    }
                },
                jiachuiText_tips : {
                    _visible:false,
                    _run:function() {
                        setJiachuiTextTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    },
                    _event:{
                        initSceneData: function() {
                            setJiachuiTextTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        MJJiazhu: function(msg) {
                            var pl = getUIPlayer_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1)
                            if (msg.uid == pl.info.uid) {
                                setJiachuiTextTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                            }
                        },
                        mjhand: function() {
                            this.visible = false;
                        },
                        startShuffleCards:function () {
                            setJiachuiTextTips_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        }
                    }
                },
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function() {
                            showUserZhuangLogo_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        initSceneData: function() {
                            if (IsArrowVisible_YueYangWaiHuZi()) showUserZhuangLogo_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        mjhand: function(){
                            if (IsArrowVisible_YueYangWaiHuZi()) showUserZhuangLogo_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
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
                                showUserChat_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1, msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1, MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    showPlayerInfo_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1, btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead_YueYangWaiHuZi(this, d, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon_YueYangWaiHuZi(this,MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon_YueYangWaiHuZi(this,MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    }
                },
                _run: function () {
                    showFangzhuTagIcon_YueYangWaiHuZi(this,MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                score_bg:{_visible:false},
                huxi:{
                    _run:function () {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _visible: false,
                    _event:{
                        clearCardUI: function(){
                            this.setVisible(false);
                            return this.setString("胡息:0");
                        },
                        addPlayer: function(){
                            return this.setString("胡息:0");
                        },
                        removePlayer: function(){
                            this.visible = false;
                        },
                        initSceneData:function(){
                            this.visible = true;
                            var huXi = UpdateHuXi_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                            if(!IsArrowVisible_YueYangWaiHuZi()){
                                huXi = 0;
                                this.visible = false;
                            }
                            return this.setString("胡息:" + huXi);
                        },
                        mjhand:function(){
                            this.visible = true;
                        },
                        HZChiCard:function(){
                            var huXi = UpdateHuXi_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                            return this.setString("胡息:" + huXi);
                        },
                        MJPeng:function(){
                            var huXi = UpdateHuXi_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                            return this.setString("胡息:" + huXi);
                        },
                        HZLiuCard:function(){
                            var huXi = UpdateHuXi_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                            return this.setString("胡息:" + huXi);
                        },
                        HZWeiCard:function(){
                            var huXi = UpdateHuXi_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                            return this.setString("胡息:" + huXi);
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
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        onlinePlayer: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1) && IsArrowVisible_YueYangWaiHuZi();
                        },
                        waitPut: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        HZNewCard: function(ed){
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        MJPeng: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        HZChiCard: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        HZLiuCard: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        HZWeiCard: function(eD) {
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        MJPut: function(eD){
                            //this.visible = curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        },
                        roundEnd: function(eD){
                            //this.visible = false;
                        }
                    },
                    time:{
                        _run: function() {
                            this.setString("0");
                        },
                        _event: {
                            initSceneData: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1)){
                                    arrowbkNumberUpdate(this);
                                    this.setString("0");
                                }
                            },
                            mjhand: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPeng: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZNewCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZLiuCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZChiCard: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZWeiCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1)){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPut: function(msg) {
                                if (curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1)) {
                                    this.stopAllActions();
                                    stopEffect(playTimeUpEff);
                                    playTimeUpEff = null;
                                    this.setString("0");
                                }
                            },
                            onlinePlayer: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                var pl = getUIPlayer_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                                if(pl && pl.onLine && curPlayerIsMe_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1)){
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
                    GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                _event: {
                    startShuffleCards:function () {
                        GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    },
                    initSceneData:function () {
                        GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    },
                    moveHead: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    },
                    waitJiazhu: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    },
                    removePlayer: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    },
                    onlinePlayer: function() {
                        GetReadyVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    }
                }
            },
            replayNode:{
                _visible: true,
                _layout : [[0.1, 0.1], [0.15, 0.81], [0, 0]]
            },
            eatNode: {
                _visible: false,
                _layout : [[0.14, 0.14], [0.02, 0.74], [0, 0]]
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
                        this.loadTexture("playing/paohuzi/mopai_bj.png");
                    },
                    HZNewCard: function(eD){
                        this.loadTexture("playing/paohuzi/mopai_bj_no_effect.png");
                    }
                }
            },
            out0: {
                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    clearCardUI_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                clearCardArr: function(){
                    var eatNode = this.getChildByName("eatNode");
                    eatNode.removeAllChildren();
                    var outNode = this.getChildByName("outNode");
                    outNode.removeAllChildren();
                    RemovePutCardOut_YueYangWaiHuZi(true);
                },
                initSceneData: function(eD) {
                    SetUserVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    InitUserHandUI_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    InitUserCoinAndName_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    DealOffLineCard_YueYangWaiHuZi(this,MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                addPlayer: function(eD) {
                    SetUserVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    InitUserCoinAndName_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                removePlayer: function(eD) {
                    SetUserVisible_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    InitUserCoinAndName_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                mjhand: function(eD) {
                    InitUserHandUI_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    InitUserCoinAndName_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                HZNewCard: function(eD) {
                    console.log("客户端发牌组合...... ");
                    if (typeof(eD) == "number") {
                        eD = {newCard: eD};
                    }
                    DealNewCard_YueYangWaiHuZi(this,eD,MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                roundEnd: function() {
                    InitUserCoinAndName_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                    MjClient.playui.ResetOtherCard(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                waitPut: function(eD) {
                    //DealWaitPut(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                MJPut: function(eD) {
                    DealPutCard_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                HZChiCard: function(eD) {
                    DealChiCard_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                HZPaoCard: function(eD) {
                    DealPaoCard_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                HZLiuCard: function(eD) {
                    DealGangCard_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                MJPeng: function(eD) {
                    DealPengCard_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                HZWeiCard: function(eD){
                    DealWeiCard_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                MJHu: function(eD) {
                    DealHu_YueYangWaiHuZi(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                onlinePlayer: function(eD) {
                    setUserOffline_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                playerStatusChange: function(eD) {
                    setUserOffline_YueYangWaiHuZi(this, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                MJFlower: function(eD) {
                    HandleMJFlower(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                MJTing: function (eD) {
                    HandleMJTing(this, eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                HZPickCard:function (eD) {
                    if(MjClient.rePlayVideo != -1) {
                        var pl = getUIPlayer_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                        if(eD.uid == pl.info.uid){
                            MjClient.OtherHandArr[MjClient.MaxPlayerNum_YueYangWaiHuZi - 1] = MjClient.majiang.sortCard3(pl.mjhand, 2)
                        }
                    }
                    RemovePutCardOut_YueYangWaiHuZi(true);
                    MjClient.playui.ResetHandCard(this,MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                HZAddCards:function (eD) {
                    DealAddCard_YueYangWaiHuZi(this,eD, MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
                },
                HZCheckRaise:function (msg) {
                    ShowPutCardIcon_YueYangWaiHuZi();
                    //MjClient.playui.EatVisibleCheck();

                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer_YueYangWaiHuZi(MjClient.MaxPlayerNum_YueYangWaiHuZi - 1);
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
                        MjClient.majiang.setJiaZhuNum(node, getUIPlayer_YueYangWaiHuZi(off));
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

                        if(ziPai.getHasFastEat()){
                            // 快速吃牌
                            var sData = MjClient.data.sData;
                            var tData = sData.tData;
                            var putCard = tData.lastPutCard;
                            var pl = sData.players[SelfUid()];
                            var chiList = MjClient.majiang.getChiList(pl, putCard);
                            if (chiList.length == 1) {
                                commitEatCards_YueYangWaiHuZi(chiList[0], null);
                                return;
                            }
                        }
                        
                        showSelectEatCards_YueYangWaiHuZi(this,btn.tag);

                        // var eat = MjClient.playui.jsBind.eat;
                        // eat.chi._node.visible = false;
                        // eat.guo._node.visible = false;
                        // eat.peng._node.visible = false;
                        // eat.hu._node.visible = false;
                        // eat.cancel._node.visible = false;

                        // eat.chi._node.setTouchEnabled(false);
                        // eat.guo._node.setTouchEnabled(false);
                        // eat.peng._node.setTouchEnabled(false);
                        // eat.hu._node.setTouchEnabled(false);
                        // postEvent("showChiLayout");

                        // MJChiCardchange_YueYangWaiHuZi();
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
                            if ((MjClient.data.sData.players[SelfUid()].eatFlag & 32) > 0) {
                                MjClient.showMsg("选择碰后视为过胡，确定碰吗？", function() {
                                    HZPengToServer_YueYangWaiHuZi();
                                setChiVisible_YueYangWaiHuZi();
                                }, function() {}, "1");
                            } else {
                                HZPengToServer_YueYangWaiHuZi();
                                setChiVisible_YueYangWaiHuZi(); 
                            }
                        }
                }
            },
            wai:{
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
                    console.log(">>>> lf，点击歪按钮");
                    if (eT == 2){
                        if ((MjClient.data.sData.players[SelfUid()].eatFlag & 32) > 0) {
                            MjClient.showMsg("选择歪后视为过胡，确定歪吗？", function() {
                                HZWaiToServer_YueYangWaiHuZi();
                                setChiVisible_YueYangWaiHuZi();
                            }, function() {}, "1");
                        } else {
                            HZWaiToServer_YueYangWaiHuZi();
                            setChiVisible_YueYangWaiHuZi();
                        }
                    }
                }
            },
            liu:{
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
                    console.log(">>>> lf，点击溜按钮");
                    if (eT == 2){
                        showSelectLiuCards_YueYangWaiHuZi(this,btn.tag);
                    }
                }
            },
            guo: {
                _visible: false,
                _layout: [[0, 0.1],[0.5, 0],[4.6, 2.5]],
                _touch: function(btn, eT) {
                    if (eT == 2){
                        if ((MjClient.data.sData.players[SelfUid()].eatFlag & 32) > 0) {
                            MjClient.showMsg("确定过胡吗？", function() {
                                HZPassConfirmToServer_YueYangWaiHuZi(); // todo 
                                setChiVisible_YueYangWaiHuZi();//add by maoyu
                            }, function() {}, "1");
                        } else {
                            HZPassConfirmToServer_YueYangWaiHuZi(); // todo 
                            setChiVisible_YueYangWaiHuZi();//add by maoyu
                        } 
                        
                    }
                }
            },
            hu: {
                _visible: false,
                _layout: [[0, 0.1],[0.5, 0],[-3, 2.5]],
                typeBG:{
                    _visible:false,
                },
                huTypeText:{
                    _visible:false,
                },
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
                        MJHuToServer_YueYangWaiHuZi();
                        setChiVisible_YueYangWaiHuZi();//add by maoyu
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
                        resetChiParam_YueYangWaiHuZi();
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
                        HZWangChuangToServer_YueYangWaiHuZi(1);
                        setChiVisible_YueYangWaiHuZi();//add by maoyu
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
                        HZWangChuangToServer_YueYangWaiHuZi(2);
                        setChiVisible_YueYangWaiHuZi();//add by maoyu
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
                        HZWangChuangToServer_YueYangWaiHuZi(4);
                        setChiVisible_YueYangWaiHuZi();//add by maoyu
                    }
                }
            },
            chiSelect: {
                _visible: false,
                _layout: [[0,0.38],[0.5,0.76],[0,0]],
            },
            biSelect: {
                _visible: false,
                _layout: [[0,0.38],[0.5,0.76],[0,0]],
            },
            biSelect1: {
                _visible: false,
                _layout: [[0,0.38],[0.5,0.76],[0,0]],
            },
            chiBg: {
                _visible: false,
                _layout: [[1, 0], [0.5, 404 / 720], [0, 0]],
                _run: function() {
                    var width = 0;
                    var cards_select = [];
                    var cards_option = [];
                    this.reset = function() {
                        width = 0;
                        cards_select = [];
                        cards_option = [];
                    }

                    this.calculateOptionCards = function() {
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        var pl = sData.players[SelfUid()];
                        var putCard = tData.lastPutCard;
                        // console.log("cards_select.length@@" + cards_select.length);
                        switch (cards_select.length) {
                            case 0:
                                cards_option = MjClient.majiang.getChiCards(pl.mjhand, putCard);
                                break;
                            case 1:
                            case 2:
                            case 3:
                                var hand = pl.mjhand.concat();
                                hand.push(putCard);
                                for (var i = 0; i < cards_select.length; i++) {
                                    var row = cards_select[i];
                                    for (var j = 0; j < row.length; j++) {
                                        hand.splice(hand.indexOf(row[j]), 1);
                                    }
                                }

                                if (hand.indexOf(putCard) < 0) {
                                    cards_option = [];
                                } else {
                                    cards_option = MjClient.majiang.getBiCards(hand, putCard);
                                }
                                break;
                        }

                        for (var i = 0; i < cards_option.length; i++) {
                            var row = cards_option[i];
                            row.splice(row.indexOf(putCard), 1);
                            row.sort(function(a, b) {
                                if (a % 20 == b % 20) {
                                    return b - a;
                                }

                                return a - b;
                            });
                            row.push(putCard);
                        }
                    }

                    this.adaptChiLayout = function() {
                        this.calculateOptionCards();
                        if (cards_option.length == 0) { // 吃牌选好了
                            if ((MjClient.data.sData.players[SelfUid()].eatFlag & 32) > 0) {
                                MjClient.showMsg("选择吃后视为过胡，确定吃吗？", function() {
                                    var biCards = cards_select.length > 1 ? cards_select.slice(1) : null;
                                    HZChiToServer_YueYangWaiHuZi(cards_select[0], biCards);
                                    this.visible = false;
                                }.bind(this), function() {
                                    cards_select.pop();
                                    this.adaptChiLayout();
                                }.bind(this), "1");
                            } else {
                                var biCards = cards_select.length > 1 ? cards_select.slice(1) : null;
                                HZChiToServer_YueYangWaiHuZi(cards_select[0], biCards);
                                this.visible = false;
                            }

                            return;
                        } 

                        this.visible = true;
                        var chiLayout = this.getChildByName("chiLayout");
                        chiLayout.removeAllChildren();
                        width = (cards_select.length + 1) * 205 + cards_option.length * 75;
                        if (cards_option.length >= 2) {
                            width += 15 * (cards_option.length - 1);
                        }

                        // cc.log("width@@ " + width);
                        // console.log("cards_select@@ " + JSON.stringify(cards_select));
                        // console.log("cards_option@@ " + JSON.stringify(cards_option));
                        var pos_x = 1280 / 2 - width / 2;
                        if (pos_x < 210) {
                            pos_x = 1280 - 210 - width;
                        }

                        // 添加已选择的吃牌
                        for (var i = 0; i < cards_select.length; i++) {
                            var chiTipImg = this.getChildByName("chiTipImg").clone();
                            var src = i == 0 ? "playing/paohuzi/chiTip.png" : "playing/paohuzi/biTip.png";
                            chiTipImg.loadTexture(src);
                            chiTipImg.visible = true;
                            chiTipImg.x = pos_x + 130 / 2;
                            chiLayout.addChild(chiTipImg);
                            pos_x += 130;

                            var row = cards_select[i];
                            var highlightImg = this.getChildByName("highlightImg").clone();
                            highlightImg.visible = true;
                            highlightImg.x = pos_x + 75 / 2;
                            highlightImg.y = 142;
                            chiLayout.addChild(highlightImg);
                            for (var j = 0; j < row.length; j++) {
                                var chiCardImg = this.getChildByName("chiCardImg").clone();
                                chiCardImg.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "out" + row[j] + ".png");
                                chiCardImg.visible = true;
                                chiCardImg.x = pos_x + 75 / 2;
                                chiCardImg.y = 70 * j + 72;
                                if (j == 2) {
                                    chiCardImg.setColor(cc.color(170, 170, 170));
                                }
                                chiLayout.addChild(chiCardImg);
                                (function(tag) {
                                    chiCardImg.setTouchEnabled(true);
                                    chiCardImg.addTouchEventListener(function(sender, type) {
                                        if (type == 2) {
                                            // cc.log("回到第 " + (tag + 1) + "步");
                                            cards_select = cards_select.slice(0, tag);
                                            this.adaptChiLayout();
                                        }
                                    }.bind(this));
                                }.bind(this)(i));
                            }
                                
                            pos_x += 75;
                        }

                        // 添加当前可选吃牌
                        var chiTipImg = this.getChildByName("chiTipImg").clone();
                        var src = cards_select.length == 0 ? "playing/paohuzi/chiTip.png" : "playing/paohuzi/biTip.png";
                        chiTipImg.loadTexture(src);
                        chiTipImg.visible = true;
                        chiTipImg.x = pos_x + 130 / 2;
                        chiLayout.addChild(chiTipImg);
                        pos_x += 130;
                        for (var i = 0; i < cards_option.length; i++) {
                            var row = cards_option[i];
                            for (var j = 0; j < row.length; j++) {
                                var chiCardImg = this.getChildByName("chiCardImg").clone();
                                chiCardImg.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "out" + row[j] + ".png");
                                chiCardImg.visible = true;
                                chiCardImg.x = pos_x + 75 / 2;
                                chiCardImg.y = 70 * j + 72;
                                if (j == 2) {
                                    chiCardImg.setColor(cc.color(170, 170, 170));
                                }
                                chiLayout.addChild(chiCardImg);
                                (function(tag) {
                                    chiCardImg.setTouchEnabled(true);
                                    chiCardImg.addTouchEventListener(function(sender, type) {
                                        if (type == 2) {
                                            // console.log("选择吃@@ ");
                                            cards_select.push(cards_option[tag]);
                                            this.adaptChiLayout();
                                        }
                                    }.bind(this));
                                }.bind(this)(i));
                            }

                            pos_x += 90;
                        }
                    }
                },
                _event: {
                    showChiLayout: function() {
                        this.reset();
                        this.adaptChiLayout();
                    }
                },
                chiTipImg: {
                    _visible: false
                },
                highlightImg: {
                    _visible: false
                },
                chiCardImg: {
                    _visible: false,
                    _run: function() {
                        this.scale = 70 / this.getContentSize().width;
                    }
                },
                cancleBtn: {
                    _run: function() {
                        this.x = 1136;
                    },
                    _click: function(sender, et) {
                        sender.parent.visible = false;
                        MjClient.playui.EatVisibleCheck();
                    }
                }

            },
            liuSelect: {
                _visible: false,
                _layout: [[0,0.38],[0.5,0.76],[0,0]],
            },
            _event: {
                clearCardUI: function() {
                    //add by sking
                    cc.log("ting yu no ting hide --------by sking");
                    MjClient.playui.EatVisibleCheck();
                },
                MJPass: function(eD) {
                    console.log("HHH :，MJPass------");
                    setQiHuState_YueYangWaiHuZi();
                    MjClient.playui.EatVisibleCheck();
                },
                mjhand: function(eD) {
                    console.log("HHH :，mjhand------");
                    MjClient.playui.EatVisibleCheck();
                },
                waitPut: function(eD) {
                    console.log("HHH :，waitPut------");
                    //MjClient.playui.EatVisibleCheck();
                },
                HZNewCard: function(eD) {
                    console.log("HHH :HZNewCard------");
                    setQiHuState_YueYangWaiHuZi();
                    //放在每个方向节点上去做，因为摸到王霸牌的时候，有个显示动作，动作显示完之后
                    //在显示各种操作按钮
                    if(eD.isCommon && eD.newCard){
                        MjClient.playui.EatVisibleCheck();
                    }
                },
                HZLiuCard: function(eD) {
                    console.log("HHH :HZLiuCard------");
                    setQiHuState_YueYangWaiHuZi();
                    MjClient.playui.EatVisibleCheck();
                },
                waitLiu:function () {
                    console.log("HHH :waitLiu------");
                    setQiHuState_YueYangWaiHuZi();
                    MjClient.playui.EatVisibleCheck();
                },
                MJPut: function(eD) {
                    console.log("HHH :，MJPut------");
                    setQiHuState_YueYangWaiHuZi();
                    MjClient.playui.EatVisibleCheck();
                },
                MJPeng: function(eD) {
                    console.log("HHH :，MJPeng------");
                    setQiHuState_YueYangWaiHuZi();
                    MjClient.playui.EatVisibleCheck();
                },
                HZChiCard: function(eD) {
                    console.log("HHH :HZChiCard------");
                    setQiHuState_YueYangWaiHuZi();
                    MjClient.playui.EatVisibleCheck();
                },
                HZWeiCard: function(eD) {
                    console.log("HHH :HZWeiCard------");
                    setQiHuState_YueYangWaiHuZi();
                    MjClient.playui.EatVisibleCheck();
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
                },
                EZP_chuPaiGuide:function () {
                    ShowPutCardIcon_YueYangWaiHuZi();
                }
            }
        },
        li_btn: {
            _layout: [[0.07, 0.07],[0.04, 0.18],[0, 0]],
            _run: function(){
                this.zIndex = 99;
            },
            _click: function() {
                // MjClient.HandCardArr = MjClient.majiang.sortByUser();
                // MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);  
                var sData = MjClient.data.sData;
                var tData = sData.tData;  
                if(tData.tState != TableState.waitPut && tData.tState != TableState.waitEat && tData.tState != TableState.waitCard){
                    return;
                }
                var pl = sData.players[MjClient.data.pinfo.uid];
                MjClient.HandCardArr = MjClient.majiang.sortByUser();//MjClient.majiang.sortCard3(pl.mjhand);
                MjClient.playui.ResetHandCard(MjClient.playui._downNode,0); 
            },
            _event: {
                mjhand:function (eD) {
                    var tData = MjClient.data.sData.tData;
                    if(tData.tState != TableState.waitPut && tData.tState != TableState.waitEat && tData.tState != TableState.waitCard){
                        return;
                    }
                    this.setVisible(true)
                     
                    // if(MjClient.MaxPlayerNum_leiyang == 4){
                    //     this.setVisible(false);
                    // }
                },
                initSceneData: function(eD) {

                    var tData = MjClient.data.sData.tData;
                    if(tData.tState != TableState.waitPut && tData.tState != TableState.waitEat && tData.tState != TableState.waitCard){
                        return;
                    }
                    this.setVisible(true);
                    // if(MjClient.MaxPlayerNum_leiyang == 4){
                    //     this.setVisible(false);
                    // }
                },
            } 
             
        },
        chat_btn: {
            _layout: [[55/1280, 0],[0.97, 0.5-0.007],[0, -0.2]],
            _run: function() {
                this.zIndex = 99;
            },
            _click: function() {
                var chatlayer = new ChatLayer();
                MjClient.Scene.addChild(chatlayer);

                // MjClient.Scene.addChild(new EndOneView_YueYangWaiHuZi(),500);
                // MjClient.Scene.addChild(new GameOverLayer_YueYangWaiHuZi(),500);
            }
        },
        voice_btn: {
            _layout: [[43/1280, 0],[0.91, 0.5],[0, -0.2]],
            _run: function() {
                initVoiceData();
                cc.eventManager.addListener(getTouchListener(), this);
                if(MjClient.isShenhe) this.visible=false;
                this.zIndex = 99;
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
                    // downAndPlayVoice_YueYangWaiHuZi(msg.uid, msg.msg);
                    downAndPlayVoice(msg.uid, msg.msg);
                }
            }
        },
        cutLine:{
            _visible: false,
            _run: function () {
                setWgtLayout(this,[1, 0.3], [0.5, 0.6], [0, -2]);
                ziPai.setWgtLayoutCutLine(this);
            },
            _event: {
                mjhand: function(eD){
                    ShowPutCardIcon_YueYangWaiHuZi();
                },
                waitPut:function (eD) {
                    ShowPutCardIcon_YueYangWaiHuZi();
                },
                HZNewCard: function(eD){
                    ShowPutCardIcon_YueYangWaiHuZi();
                },                
                // HZChiCard: function(eD) {
                //     ShowPutCardIcon_YueYangWaiHuZi();
                // },
                // MJPeng: function(eD) {
                //     ShowPutCardIcon_YueYangWaiHuZi();
                // },
                MJPut:function(eD) {
                    ShowPutCardIcon_YueYangWaiHuZi();
                },
                MJPass:function(eD) {
                    ShowPutCardIcon_YueYangWaiHuZi();
                },
                MJHu:function(eD){
                    this.visible = false;
                },
                EZP_xuXian : function(){
                    ziPai.setWgtLayoutCutLine(this);
                }
                // HZLiuCard:function(eD){
                //     ShowPutCardIcon_YueYangWaiHuZi();
                // },
                // HZWeiCard:function(eD){
                //     ShowPutCardIcon_YueYangWaiHuZi();
                // },
            },
        },
    },
    _downNode:null,
    _rightNode:null,
    _topNode:null,

    ctor: function() {
        this._super();
        ziPai.initZiPaiData();
        var playui = ccs.load("Play_YueYangWaiHuZi.json");
        playMusic("bgHongZi");
        var tData = MjClient.data.sData.tData;
        MjClient.MaxPlayerNum_YueYangWaiHuZi = tData.maxPlayer;
        cc.log(MjClient.MaxPlayerNum_YueYangWaiHuZi);

        this._downNode  = playui.node.getChildByName("down");
        this._rightNode = playui.node.getChildByName("right");
        this._topNode  = playui.node.getChildByName("left");
        this._xingNode = playui.node.getChildByName("xing");
        this._finger = playui.node.getChildByName("finger");
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

        this.newTingLayer = new YueYangWaiHuZiNewTingLayer();
        playui.node.addChild(this.newTingLayer);

        this.tingLayer = new YueYangWaiHuZiPhzTingLayer();
        playui.node.addChild(this.tingLayer);

        this.tingLayer.setLocalZOrder(15);
        this.newTingLayer.setLocalZOrder(15);
        this._downNode.setLocalZOrder(11);
        this._xingNode.setLocalZOrder(12);
        this._finger.setLocalZOrder(13);
        MjClient.playui.jsBind.btns_piao._node.setLocalZOrder(20);
        MjClient.playui._AniNode.setLocalZOrder(20);
        this.playuiNode = playui.node;

        // 切牌
        if(MjClient.rePlayVideo == -1){
            this.playuiNode.cutCardView = COMMON_UI.createZiPaiCutCardView();
            playui.node.addChild(this.playuiNode.cutCardView, 21);
        }

        // 在亲友圈房间中添加邀请亲友圈牌有一起对局
        addClubYaoqingBtn(5);

        // 俱乐部返回大厅功能：by_jcw
        addClub_BackHallBtn(true, [[0.036, 0], [0.84, 0.95], [0, 0]], [[0.036, 0], [0.84, 0.95], [0, 0]]);

        if(MjClient.data.sData.tData.maxPlayer < 4){
            ziPai.changePlayUILayout(playui.node);
        }

        if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
            MjClient.playui.jsBind._node.addChild(new roundRule_ziPai(roundRule_ziPai.getRoundRules()));
        }
        
        return true;
    },

    resetJiaZhuTip: function()
    {
        var tData = MjClient.data.sData.tData;
        if (!tData.areaSelectMode.jushou)
            return;
        var nodes = [this._downNode, this._rightNode, this._topNode, this._leftNode];
        for (var i = 0; i < MjClient.MaxPlayerNum_YueYangWaiHuZi; i ++)
        {
            var pl = getUIPlayer_YueYangWaiHuZi(i);
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

    refreshHeadLight:function(visible)
    {
        // 黄色头像框，现在产品又取消了
        // for (var i = 0; i < 4; i ++)
        // {
        //     var node = getNode(i);
        //     if (!node)
        //         continue;

        //     var light = node.getChildByName("head").getChildByName("light");
        //     var index = getPlayerIndex(i);
        //     light.setVisible(visible && MjClient.data.sData.tData.curPlayer == index);
        // }
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
PlayLayer_YueYangWaiHuZi.prototype.ResetHandCard = function(posNode,off, needAction, isDelay){
    if(off == 0 && posNode.getName() != "down"){
        return;//2人玩法right节点同为玩家节点
    }
    needAction = needAction === undefined ? false : needAction;
    // needAction = false;
    var changeCardSize = 1;//ziPai.getCardSize() == 0 ? 1 : 0.8;// 手牌大小修改
    if(MjClient.rePlayVideo == -1){
        if(MjClient.debug_YueYangWaiHuZi){
            resetHandCard_YueYangWaiHuZi(posNode,off);
        }else{
            if (off == 0) {
                if (!needAction && !isDelay && MjClient.addGroupIndex != 0) {
                    refreshNode_YueYangWaiHuZi(posNode, off, needAction);

                    this.scheduleOnce(function () {
                        if (!MjClient.playui.isShufffling) {
                            this.ResetHandCard(posNode, off, needAction, true);
                        }
                    }.bind(this), 0.35);
                    return;
                }
                checkCard_YueYangWaiHuZi(posNode, off);
                var handNode = posNode.getChildByName("handNode");
                handNode.visible = true;
                handNode.removeAllChildren();
                var cardArr = [];
                for (var i = 0; i < MjClient.HandCardArr.length; i++) {
                    cardArr.push(MjClient.HandCardArr[i]);
                }
                cc.log("wxd.............MjClient.HandCardArr..............." + JSON.stringify(cardArr));
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
                        addHandCard_YueYangWaiHuZi(k, j, groupList[j], off);
                    }
                }

                addTingSign_YueYangWaiHuZi(posNode); // 添加听牌角标

                var handCard = posNode.getChildByName("handCard");
                var type = ziPai.getZiPaiType();
                var sizeArr = [98, 95, 100, 103];
                var width = sizeArr[type] * changeCardSize; // handCard.getVirtualRendererSize().width;

                var scale_x = handCard.scaleX;
                var winSize = MjClient.size;
                var totalWidth = width * cardArr.length * scale_x;
                for (var i = 0; i < cardArr.length; i++) {
                    var addNode = handNode.getChildByTag(i);
                    // addNode.setPosition(cc.p((winSize.width - totalWidth)/2 + i * width * scale_x,0));

                    if (needAction) {
                        addNode.x = winSize.width * 0.5;
                        addNode.y = 100;
                        this._doMovetoAction(addNode, cc.p((winSize.width - totalWidth) / 2 + i * width * scale_x, 0));
                    } else {
                        addNode.setPosition(cc.p((winSize.width - totalWidth) / 2 + i * width * scale_x, 0));
                    }
                }
                postEvent("LY_addHandHuXi");
            }
        }
    }else{
        //回放
        var handNode = null;
        var cardArr = null;
        var handCard = null;
        if(off == 0){
            if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 3 || MjClient.MaxPlayerNum_YueYangWaiHuZi == 2){
                handNode = posNode.getChildByName("handNode");
                handCard = posNode.getChildByName("handCard");
            }else if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4){
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

        //if(MjClient.movingCard_YueYangWaiHuZi && MjClient.movingCard_YueYangWaiHuZi.getParent()){
        //    MjClient.movingCard_YueYangWaiHuZi.removeFromParent(true);
        //    MjClient.movingCard_YueYangWaiHuZi = null;
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
                    if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 3 || MjClient.MaxPlayerNum_YueYangWaiHuZi == 2){
                        addHandCard_YueYangWaiHuZi(k,j,groupList[j],off);
                    }else if(MjClient.MaxPlayerNum_YueYangWaiHuZi == 4){
                        addHandCardReplay_YueYangWaiHuZi(k,j,groupList[j],off);
                    }
                }else {
                    addHandCardReplay_YueYangWaiHuZi(k,j,groupList[j],off);
                }
            }
        }

        if(off == 0 && (MjClient.MaxPlayerNum_YueYangWaiHuZi == 3 || MjClient.MaxPlayerNum_YueYangWaiHuZi == 2)) {
            var type = ziPai.getZiPaiType();
            var sizeArr = [98,95,100,103];
            var width =sizeArr[type] * changeCardSize; // handCard.getVirtualRendererSize().width;

            var scale_x = handCard.scaleX;
            var winSize = MjClient.size;
            var totalWidth = width * cardArr.length * scale_x;
            for(var i = 0;i < cardArr.length;i++){
                var addNode = handNode.getChildByTag(i);
                addNode.setPosition(cc.p((winSize.width - totalWidth)/2 + i * width * scale_x,0));
            }
        }
        cc.log("================off:" + off +"----------"+JSON.stringify(cardArr));
    }
};

PlayLayer_YueYangWaiHuZi.prototype._doMovetoAction = function(node,endP){
    node.stopAllActions();
    var ac = cc.moveTo(0.3,endP);
    node.runAction(ac);
};

PlayLayer_YueYangWaiHuZi.prototype.ResetOtherCard = function(posNode, off) {
    // 添加吃、碰、跑、偎、提
    var sData = MjClient.data.sData;
    var tData = null;
    if (sData) {
        tData = sData.tData;
    }

    var eatNode = posNode.getChildByName("eatNode");
    eatNode.visible = true;
    eatNode.removeAllChildren();
    var pl = getUIPlayer_YueYangWaiHuZi(off);
    if (!pl) return;
    var mjSortArr = pl.mjsort;
    cc.log("=====off=====:" + off + "mjSortArr:" + JSON.stringify(mjSortArr));
    if (mjSortArr) {
        var childArr = null;

        // 提/偎牌的特殊处理
         var callback = function(childList) {
             var cardNum = pl.mjwei[pos];
             var skipPeng = pl.skipPeng;
             for (var i = 0; i < childList.length; i++) {
                 var child = childList[i];
                 // var maxPlayer = MjClient.data.sData.tData.maxPlayer;
                 // if ((i == 0 && maxPlayer - off <= 2) || (i == childList.length - 1 && maxPlayer - off > 2)) {

                 // } else {
                 //     child.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "huxiBG.png");
                 // }

                 var chiTip = childList.length == 3 ? "wei" : "ti";
                 if (i != getShowCardIdx_YueYangWaiHuZi(posNode, chiTip)) {
                     child.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "huxiBG.png");
                 }

             }
         };

         var callback1 = function(childList) {
             var cardNum = pl.mjwei[pos];
             var skipPeng = pl.skipPeng;
             for (var i = 0; i < childList.length; i++) {
                 var child = childList[i];
                 if (off == 0) {
                     var shade = new cc.Sprite("playing/paohuzi/huxiBG1.png");
                     shade.opacity = 100;
                     shade.x = shade.width / 2;
                     shade.y = shade.height / 2;
                     child.addChild(shade);
                 } else {
                     child.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "huxiBG.png");
                 }
             }
         };

        for (var k = 0; k < mjSortArr.length; k++) {
            var mjsort = mjSortArr[k];
            var pos = mjsort.pos;
            var name = mjsort.name;
            //提
             if (name == "mjgang1") {
                 var cardNum = pl.mjgang1[pos];
                 for (var i = 0; i < 4; i++) {
                     addEatCard_YueYangWaiHuZi(posNode, "mjgang1" + k, cardNum, off);
                 }

                 var tiParentNode = eatNode.getChildByName("mjgang1" + k);
                 var childArr = tiParentNode.children;
                 /*if (MjClient.majiang.getCardShowType(pl.info.uid, cardNum) == 2) {
                     callback(childArr);
                 } else {
                     callback1(childArr);
                 }*/
                 if(pl.info.uid == SelfUid()){
                     callback(childArr);
                 }else{
                     for (var i = 0; i < childArr.length; i++) {
                         var child = childArr[i];
                         child.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "huxiBG.png");
                     }
                 }
             }
            //偎
             if (name == "mjwei") {
                 var cardNum = pl.mjwei[pos];
                 for (var i = 0; i < 3; i++) {
                     addEatCard_YueYangWaiHuZi(posNode, "mjwei" + k, cardNum, off);
                 }

                 var weiParentNode = eatNode.getChildByName("mjwei" + k);
                 var childArr = weiParentNode.children;
                 var skipPeng = pl.skipPeng;
                 cc.log("MjClient.majiang.getCardShowType(pl.info.uid, cardNum)@@ " + MjClient.majiang.getCardShowType(pl.info.uid, cardNum));
                 if (MjClient.majiang.getCardShowType(pl.info.uid, cardNum) == 2) {
                     callback(childArr);
                     // if(!skipPeng || skipPeng.indexOf(cardNum) < 0){
                     //     callback(childArr);
                     // }else{
                     //     for(var i = 0;i < childArr.length;i++){
                     //         var child = childArr[i];
                     //         if(i != childArr.length-1){
                     //             child.loadTexture(MjClient.cardPath_YueYangWaiHuZi+"huxiBG.png");
                     //         }
                     //     }
                     // }
                 } else {
                     if (!skipPeng || skipPeng.indexOf(cardNum) < 0) { //不是臭偎
                         callback1(childArr);
                     } else {
                         for (var i = 0; i < childArr.length; i++) {
                             var child = childArr[i];
                             if (i != childArr.length - 1) {
                                 child.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "huxiBG.png");
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
                 //             child.loadTexture(MjClient.cardPath_YueYangWaiHuZi+"huxiBG.png");
                 //         }
                 //     }
                 // }
             }
            //跑
            if (name == "mjgang0") {
                var cardNum = pl.mjgang0[pos];
                for (var i = 0; i < 4; i++) {
                    addEatCard_YueYangWaiHuZi(posNode, "mjgang0" + k, cardNum, off);
                }
                var paoParentNode = eatNode.getChildByName("mjgang0" + k);
                var childArr = paoParentNode.children;
                for (var i = 0; i < childArr.length; i++) {
                    var child = childArr[i];
                    if(i == 3 && SelfUid() == pl.info.uid || i == 0 && SelfUid() != pl.info.uid){

                    }else{
                        child.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "huxiBG.png");
                    }

                }
            }
            //碰
            if (name == "mjpeng") {
                var cardNum = pl.mjpeng[pos];
                for (var i = 0; i < 3; i++) {
                    addEatCard_YueYangWaiHuZi(posNode, "mjpeng" + k, cardNum, off);
                }
            }
            //吃
            if (name == "mjchi") {
                var cardNum = pl.mjchi[pos];
                var eatCards = pl.mjchi[pos].eatCards;
                for (var i = 0; i < eatCards.length; i++) {
                    addEatCard_YueYangWaiHuZi(posNode, "mjchi" + k, eatCards[i], off);
                }
                var biCards = pl.mjchi[pos].biCards;
                if (biCards && biCards.length > 0) {
                    for (var i = 0; i < biCards.length; i++) {
                        var biArr = biCards[i];
                        for (var m = 0; m < biArr.length; m++) {
                            addEatCard_YueYangWaiHuZi(posNode, "mjbi" + k + i, biArr[m], off);
                        }
                    }
                }

                var mjchiCardArr = pl.mjchiCard;
                var chiParentNode = eatNode.getChildByName("mjchi" + k);
                if (chiParentNode) {
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

                if (biCards && biCards.length > 0) {
                    for (var i = 0; i < biCards.length; i++) {
                        var chiParentNode = eatNode.getChildByName("mjbi" + k + i); // "mjbi32"
                        if (chiParentNode) {
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
    //    var outCard = getNewCard_YueYangWaiHuZi(pl.mjput[i], 2, off);
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

PlayLayer_YueYangWaiHuZi.prototype.ResetPutCard = function(posNode,off){
    cc.log("======ResetPutCard======= " + off + " posNode = " + posNode.getName());
    if(off == 0 && posNode.getName() != "down"){
        return;//2人玩法right节点同为玩家节点
    }
    //添加打出的牌
    var pl = getUIPlayer_YueYangWaiHuZi(off);
    if (!pl) return;
    var outNode = posNode.getChildByName("outNode");
    outNode.visible = true;
    outNode.removeAllChildren();
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var curUId = tData.uids[tData.curPlayer];

    var type = ziPai.getUiLayoutType();
    if(type == 0 && MjClient.data.sData.tData.maxPlayer < 4){
        //新布局 偏右
        for(var i = 0; i < pl.mjput.length; i++){
            if(curUId == pl.info.uid && i == pl.mjput.length - 1 && tData.currCard == pl.mjput[i]){
                continue;
            }
            var offestX = Math.floor(i % 6);
            var offestY = Math.floor(i / 6);

            var outCard = getNewCard_YueYangWaiHuZi(pl.mjput[i], 2, off);
            if(off == 0){
                outCard.anchorX = 1;
                outCard.anchorY = 0;
                outCard.x = outNode.width - offestX * outCard.width;
                outCard.y = offestY * outCard.height;
            }else if(off == 1){
                if(MjClient.data.sData.tData.maxPlayer == 2){
                    outCard.anchorX = 0;
                    outCard.anchorY = 1;
                    outCard.x = offestX * outCard.width;
                    outCard.y = outNode.height + offestY * outCard.height;
                }else{
                    outCard.anchorX = 1;
                    outCard.anchorY = 1;
                    outCard.x = outNode.width - offestX * outCard.width;
                    outCard.y = outNode.height + offestY * outCard.height;
                }

            }else if(off == 2){
                outCard.anchorX = 0;
                outCard.anchorY = 1;
                outCard.x = offestX * outCard.width;
                outCard.y = outNode.height + offestY * outCard.height;
            }
            outNode.addChild(outCard);
            addPutFrame_YueYangWaiHuZi(outCard, pl.mjputType[i]);
        }
    }else{
        for(var i = 0; i < pl.mjput.length; i++){
            if(curUId == pl.info.uid && i == pl.mjput.length - 1 && tData.currCard == pl.mjput[i]){
                continue;
            }

            var offestX = Math.floor(i % 6);
            var offestY = Math.floor(i / 6);

            var outCard = getNewCard_YueYangWaiHuZi(pl.mjput[i], 2, off);
            if(off == 0){
                outCard.anchorX = 1;
                outCard.anchorY = 0;
                outCard.x = outNode.width - offestX * outCard.width;
                outCard.y = offestY * outCard.height;
            }else if(off == 1){
                if(MjClient.data.sData.tData.maxPlayer == 2){
                    outCard.anchorX = 0;
                    outCard.anchorY = 1;
                    outCard.x = i * outCard.width;
                    outCard.y = outNode.height;
                }else {
                    outCard.anchorX = 1;
                    outCard.anchorY = 1;
                    outCard.x = outNode.width - i * outCard.width;
                    outCard.y = outNode.height;
                }
            }else if(off == 2){
                outCard.anchorX = 0;
                outCard.anchorY = 1;
                outCard.x = i * outCard.width;
                outCard.y = outNode.height;
            }
            outNode.addChild(outCard);
            addPutFrame_YueYangWaiHuZi(outCard, pl.mjputType[i]);
        }
    }
};

//重置牌的顺序
PlayLayer_YueYangWaiHuZi.prototype.CardLayoutRestore = function(posNode,off){
    if(MjClient.rePlayVideo == -1){
        this.ResetHandCard(posNode,off);
    }else{
        //回放时不执行发牌动画
        this.ResetHandCard(posNode,off);
    }
    this.ResetOtherCard(posNode,off);
    this.ResetPutCard(posNode,off);
};

PlayLayer_YueYangWaiHuZi.prototype.ShowHuTypeText = function(){
    var pl = getUIPlayer_YueYangWaiHuZi(0);
    cc.log("test . log ----------------------");   

    if(pl){
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var huData = MjClient.majiang.getHuInfo(sData,pl,tData.currCard);

        var nameObj = {heiHu:"黑胡", dianHu: "点胡", shiHong: "十红", manTangHong: "满堂红", xiaoYiSe: "小一色", 
                        daYiSe: "大一色", qiDui: "7对", pengPengHu: "碰碰胡", juJuHong: "句句红", yiGuaBian: "一挂匾",
                        huDieFei: "蝴蝶飞", banBanHu: "板板胡",siPengDanDiao: "四碰单吊", shuangHe:"双合",shiErHong:"十二红",
                        shiYiHong: "十一红", fengDing: "80分封顶"}; 
        var str = ""; 
        var hzdescNum = 0; // 番型的种类  
        for (var k in huData.hzdesc) {
            str += (nameObj[k] + " " + huData.hzdesc[k] + "分" );
            hzdescNum++;
            var text = huData.hzdesc[k];  
        }

        cc.log(JSON.stringify(huData));
        if(str.length <= 0){ 
            str = "小胡 " + huData.score + "分";
        }else if(hzdescNum > 1){
            str = "大胡 " + huData.score + "分";
        }
        var eat = MjClient.playui.jsBind.eat;
        var huText = eat.hu._node.getChildByName("huTypeText");   
        huText.setString(str);

    }

};


// 判断吃、碰、跑、偎、提、胡的状态
PlayLayer_YueYangWaiHuZi.prototype.EatVisibleCheck = function(off){
    var eat = MjClient.playui.jsBind.eat;
    //sk 为啥要隐藏掉？   //因为一开始是不可见的，隐藏根节点 by sking
    // MjClient.playui.jsBind.eat.changeui.changeuibg._node.visible = false;
    var sData = MjClient.data.sData;
    var tData = sData.tData;

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
    eat.chiBg._node.visible = false;
    eat.wai._node.visible = false;
    eat.liu._node.visible = false;
    eat.liuSelect._node.visible = false;

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
    eat.wai._node.setTouchEnabled(false);
    eat.liu._node.setTouchEnabled(false);
    eat.liuSelect._node.setTouchEnabled(false);

    var pl = sData.players[SelfUid() + ""];
    if (!pl) return;
    MjClient.gangCards = [];
    MjClient.eatpos = [];
    var mj = MjClient.majiang;
    //吃碰杠胡node
    var vnode = [];
    //自摸getUIPlayer_YueYangWaiHuZi
    if(tData.tState != TableState.roundFinish && pl.mjState != TableState.roundFinish){
        if(IsTurnToMe()){ 
            //胡
            if(pl.eatFlag & 32) {
                vnode.push(eat.hu._node); 
                //MjClient.playui.ShowHuTypeText();
            }

            // 碰
            if (pl.eatFlag & 2) {
                vnode.push(eat.peng._node);
            }

            //吃
            if(pl.eatFlag & 1){
                vnode.push(eat.chi._node);
            }

            //歪
            if(pl.eatFlag & 8){
                vnode.push(eat.wai._node);
            }

            //溜
            if(pl.eatFlag & 16){
                vnode.push(eat.liu._node);
            }

            if(vnode.length > 0
                && !((pl.eatFlag & 8) && (pl.eatFlag & 32) && tData.areaSelectMode.isKaWai)
                && !((pl.eatFlag & 16) && pl.mjhand.length % 3 == 2 && MjClient.majiang.getCanPutCardNum(pl) == 0)){
                vnode.push(eat.guo._node);
                isCheckedTing = false;
            }
        }
        if(!IsTurnToMe()){
            //胡
            if(pl.eatFlag & 32){
                vnode.push(eat.hu._node);  
                //MjClient.playui.ShowHuTypeText();
            } 
            //碰
            if(pl.eatFlag & 2){
                vnode.push(eat.peng._node);
            }
            //吃
            if(pl.eatFlag & 1){
                    vnode.push(eat.chi._node);
            }

            //歪
            if(pl.eatFlag & 8){
                vnode.push(eat.wai._node);
            }

            //溜
            if(pl.eatFlag & 16){
                vnode.push(eat.liu._node);
            }

            if(vnode.length > 0
                && !((pl.eatFlag & 8) && (pl.eatFlag & 32) && tData.areaSelectMode.isKaWai)
                && !((pl.eatFlag & 16) && pl.mjhand.length % 3 == 2 && MjClient.majiang.getCanPutCardNum(pl) == 0)){
                vnode.push(eat.guo._node);
                isCheckedTing = false;
            }
        }
    }
    cc.log("chow", "vnode.length = " + vnode.length);
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
            /*if(btnName == "peng" || btnName == "chi0" || btnName == "gang0"){
                vnode[i].loadTextureNormal(btnImgs[btnName][0]);
                vnode[i].loadTexturePressed(btnImgs[btnName][1]);
            }*/

            if(i == 0){
                var cardVal = 0;
                if (vnode[i].getChildByName("bgimg")) {
                    vnode[i].getChildByName("bgimg").visible = false;
                }

                /*if (btnName == "peng" || btnName == "chi0" || btnName == "gang0") {
                    vnode[i].loadTextureNormal(btnImgs[btnName][0]);
                    vnode[i].loadTexturePressed(btnImgs[btnName][1]);
                }*/

                if (btnName == "peng") {
                    cardVal = tData.lastPutCard;
                } else if (btnName == "chi0") {
                    if (MjClient.eatpos.length == 1) {
                        cardVal = tData.lastPutCard;
                    }
                } else if (btnName == "gang0") {
                    if (MjClient.gangCards.length == 1) {
                        cardVal = MjClient.gangCards[0];
                    }
                } else if (btnName == "hu") {
                    if (IsTurnToMe()) {
                        cardVal = pl.mjhand[pl.mjhand.length - 1];
                    } else {
                        cardVal = tData.lastPutCard;
                    }
                }

                if (cardVal && cardVal > 0) {
                    // setCardSprite(vnode[0].getChildByName("card1"), cardVal, 0);
                    // vnode[0].getChildByName("card1").visible = true;
                }

                if (vnode[0].getChildByName("bgground")) {
                    vnode[0].getChildByName("bgground").zIndex = -1;
                    vnode[0].getChildByName("bgground").visible = true;
                }

                //屏蔽到 碰 ，杠 的显示牌 add by sking
                if (vnode[0].getChildByName("bgground")) {
                    vnode[0].getChildByName("bgground").visible = false;
                }
                if (vnode[i].getChildByName("card1")) {
                    vnode[i].getChildByName("card1").visible = false;
                }
            }
            setWgtLayout(vnode[i], [0, 0.20], [0.5, 0.18], [(i - (vnode.length - 1) / 2) * 1.3, 1.8], false, false);
            if(ziPai.getUiLayoutType() == 0){
                //setWgtLayout(vnode[i], [0, 0.20], [0.75, 0.11], [ (i - (vnode.length - 1) / 2) * 1, 1.8], false, false);
                setWgtLayout(vnode[i], [0, 0.20], [0.95, 0.11], [ (i - (vnode.length - 1)) * 1.2, 1.8], false, false);
            }
        }
    }
};
PlayLayer_YueYangWaiHuZi.prototype.showAndHideHeadEffect = function(){
    var arr = [this._downNode, this._rightNode, this._topNode];
    if (MjClient.MaxPlayerNum_YueYangWaiHuZi == 4)
    {
        arr = [this._downNode, this._xingNode, this._rightNode, this._topNode];
    }else if (MjClient.MaxPlayerNum_YueYangWaiHuZi == 2)
    {
        arr = [this._downNode, this._topNode];
    }

    var tData = MjClient.data.sData.tData;
    var uids = tData.uids;

    var curPlayerNode = null;
    if (curPlayerIsMe_YueYangWaiHuZi(0)){
        curPlayerNode = arr[0].getChildByName("head");
    }
    else if (curPlayerIsMe_YueYangWaiHuZi(1)){
        curPlayerNode = arr[1].getChildByName("head");
    }else if (curPlayerIsMe_YueYangWaiHuZi(2)){
        curPlayerNode = arr[2].getChildByName("head");
    }else if (curPlayerIsMe_YueYangWaiHuZi(3)){
        curPlayerNode = arr[3].getChildByName("head");
    }

    var tag = 2018322;
    this._downNode.getChildByName("head").removeChildByTag(tag, true);
    this._topNode.getChildByName("head").removeChildByTag(tag, true);
    this._rightNode.getChildByName("head").removeChildByTag(tag, true);
    this._xingNode.getChildByName("head").removeChildByTag(tag, true);
    if (curPlayerNode)
    {
        var _armature = curPlayerNode.getChildByTag(tag);
        if(_armature && cc.sys.isObjectValid(_armature)){
            _armature.stopAllActions();
            _armature.removeFromParent(true);
            _armature = null;
        }

        if (MjClient.data.sData.tData.tState == TableState.waitReady || MjClient.data.sData.tData.tState == TableState.roundFinish){
            return;
        }

        cc.spriteFrameCache.addSpriteFrames("playing/paohuzi/effect/djs/djs0.plist","playing/paohuzi/effect/djs/djs0.png");
        ccs.armatureDataManager.addArmatureFileInfo("playing/paohuzi/effect/djs/djs.ExportJson");
        var _armature = new ccs.Armature("djs");
        _armature.scale = curPlayerNode.getChildByName("headBox").width / _armature.width;
        _armature.animation.play("Animation1");
        _armature.setPosition(curPlayerNode.width/2, curPlayerNode.height/2 + 15);
        _armature.setTag(tag);
        _armature.getAnimation().setSpeedScale(0.5);
        curPlayerNode.addChild(_armature);
    }
};