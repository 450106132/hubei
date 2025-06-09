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
MjClient.MJPass2NetForpaohuzi = function(){
    cc.log("====================send======pass=====");
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    if(IsTurnToMe() && tData.tState == TableState.waitPut){
        var eat = MjClient.playui.jsBind.eat;
        eat.hu._node.visible = false;
        eat.guo._node.visible = false;
        eat.cancel._node.visible = false;
    }else{
        HZPassConfirmToServer_paohuzi();
    }
};

// 这个没看懂干嘛的
// off 是四个位置，根据off 显示四个位置的信息 by sking
function SetUserVisible_paohuzi_SR(node, off){
    cc.log("====================off======================" + off);
    var pl = getUIPlayer_paohuzi(off);
    var head = node.getChildByName("head");
    var name = head.getChildByName("name");
    var nobody = head.getChildByName("nobody");
    var coin = head.getChildByName("coin");
    var offline = head.getChildByName("offline");
    var name_bg = head.getChildByName("name_bg");
    var score_bg = head.getChildByName("score_bg");
    var huxi = head.getChildByName("huxi");
    var timeImg = head.getChildByName("timeImg");
    if(pl){
        name.visible = true;
        coin.visible = true;
        offline.visible = true;
        nobody.visible = true;
        name_bg.visible = false;
        score_bg.visible = false;
        var WxHead = nobody.getChildByName("WxHead");
        if(WxHead){
            WxHead.removeFromParent(true);
        }
        MjClient.loadWxHead(pl.info.uid, pl.info.headimgurl);
        setUserOffline_paohuzi(node, off);
        InitUserHandUI_paohuzi_SR(node, off);
    }else{
        name.visible = false;
        coin.visible = false;
        offline.visible = false;
        huxi.visible = false;
        nobody.visible = false;
        name_bg.visible = false;
        score_bg.visible = false;
        timeImg.visible = false;
        var WxHead = nobody.getChildByName("WxHead");
        if(WxHead){
            WxHead.removeFromParent(true);
        }
    }
}

//设置玩家牌桌上的信息(只有自己才设置手牌，其他玩家不需要设置)
function InitUserHandUI_paohuzi_SR(node, off){
    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer_paohuzi(off);

    if(!pl){
        return;
    }
    //初始化玩家金币、名称、胡息
    InitUserCoinAndName_paohuzi(node, off);
    setAreaTypeInfo(true);

    if(tData.tState != TableState.waitPut && tData.tState != TableState.waitEat && tData.tState != TableState.waitCard){
        return;
    }

    //添加手牌
    if(MjClient.rePlayVideo == -1){
        //表示正常游戏,只有自己才会显示手牌
        if(pl.mjhand){
            if(off == 0){
                var handArr = pl.mjhand.slice();
                if(tData.uids[tData.curPlayer] == pl.info.uid && tData.currCard != -1 && 
                        tData.currCard != 91 && pl.wangStatus)
                {
                    var index = handArr.indexOf(tData.currCard);
                    if(index >= 0){
                        handArr.splice(index,1);
                    }
                }
                MjClient.HandCardArr = MjClient.majiang.sortHandCardMax(handArr);
            }
            var selfIndex = tData.uids.indexOf(SelfUid());
            if(off == 0 && selfIndex == tData.xingPlayer){
                node = MjClient.playui._downNode;
            } 
        }
    }else{
        /*
            播放录像
         */
        cc.log("_________________mjhand_replay_______________", off, JSON.stringify(pl.mjhand));
        if (pl.mjhand){
            if(off == 0){
                MjClient.HandCardArr = MjClient.majiang.sortHandCardMax(pl.mjhand);
                node = MjClient.playui._downNode;
            }else{
                if(!MjClient.OtherHandArr){
                    MjClient.OtherHandArr = {};
                }
                if(!MjClient.OtherHandArr[off]){
                    MjClient.OtherHandArr[off] = MjClient.majiang.sortHandCardMax(pl.mjhand);
                }
            }
        }

    }
    MjClient.playui.CardLayoutRestore(node,off);
}

var PlayLayer_paohuzi_SR = cc.Layer.extend({
    jsBind: {
        _event: {
            startShuffleCards:function (d) {
                checkCanShowDistance();
            },
            mjhand: function() {
                clearMJHandCardUI_paohuzi();
                if(MjClient.endoneui != null && cc.sys.isObjectValid(MjClient.endoneui))
                {
                    MjClient.endoneui.removeFromParent(true);
                }
                MjClient.endoneui = null;
                //MjClient.movingCard_paohuzi = null;
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
                        ip2pl[ip].push(unescape(pi.info.nickname));
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
                    //AlertSameIP(ipmsg.join("\n"));
                }
                mylog("ipmsg " + ipmsg.length);

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
            MJChat : function(data){
                if(data.type == 4){
                    //距离位置显示
                    checkCanShowDistance();
                }
            },
            endRoom: function(msg) {
                mylog(JSON.stringify(msg));
                if (msg.showEnd){
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){  
                        this.addChild(new GameOverLayer_syZiPai(),500);
                    }else{
                        this.addChild(new GameOverLayer_paohuzi(),500);
                    } 
                }else{
                    MjClient.Scene.addChild(new StopRoomView());
                }    
            },
            roundEnd: function() {
                var self = this;

                var sData = MjClient.data.sData;
                var tData = sData.tData;
                var time = 0.2;
                if(!MjClient.isDismiss && tData.hunCard && tData.hunCard != -1){
                    time = 1.8;
                    var actionType = tData.areaSelectMode.isGenXing ? ActionType_paohuzi.GENXING : ActionType_paohuzi.FANXING;
                    var hunCard = tData.hunCard;
                    if(!tData.areaSelectMode.isGenXing){
                        hunCard = tData.cards[tData.cardNext] ? tData.cards[tData.cardNext] : tData.lastPutCard;
                    }                    
                    ShowEatActionAnim_paohuzi(MjClient.playui._downNode, actionType, 0);
                    DealFanXingNewCard_paohuzi(hunCard);
                }

                function delayExe(){
                    var sData = MjClient.data.sData;
                    resetEatActionAnim_paohuzi();
                    if (sData.tData.roundNum <= 0){
                        var layer = null;
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){ 
                            layer = new GameOverLayer_syZiPai();
                        }else{
                            layer = new GameOverLayer_paohuzi();
                        } 
                        layer.setVisible(false);
                        self.addChild(layer,500);
                    }
                    if(!MjClient.endoneui){
                        self.addChild(new EndOneView_paohuzi(),500);
                    }

                    var putNode = MjClient.playui._downNode.getChildByName("xingPai");
                    putNode.removeAllChildren();
                    putNode.setVisible(false);
                }
                this._delayExeAction = this.runAction(cc.sequence(cc.delayTime(time),cc.callFunc(delayExe)));
            },
            moveHead: function() {
                postEvent("returnPlayerLayer");
                //tableStartHeadMoveAction_paohuzi(this);   //不涉及到头像移动动作
            },
            initSceneData: function() {
                if (this._delayExeAction && cc.sys.isObjectValid(this._delayExeAction)){
                    this.stopAction(this._delayExeAction);
                    delete this._delayExeAction;
                }
                reConectHeadLayout_paohuzi(this);        //不涉及到头像移动动作
                CheckRoomUiDelete();
                tableStartHeadMoveAction_paohuzi(this);   //不涉及到头像移动动作

                //距离位置显示
                checkCanShowDistance();
            },
            addPlayer:function () {
                tableStartHeadMoveAction_paohuzi(this);   //不涉及到头像移动动作
            },
            removePlayer: function(eD) {
                //距离位置显示
                checkCanShowDistance();                 
            },
            onlinePlayer: function() {
                reConectHeadLayout_paohuzi(this);        //不涉及到头像移动动作
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
        },
        cardNumImg: {
            _run:function () {
                MjClient.cardNumImgNode = this;
                setWgtLayout(this,[0.085, 0.085], [0.5, 0.77], [0, 0]);
            },
            _event: {
                initSceneData: function(eD) {
                    this.visible = IsArrowVisible_paohuzi();
                },
                mjhand: function(eD) {
                    this.visible = IsArrowVisible_paohuzi();
                },
                onlinePlayer: function(eD) {
                    //this.visible = IsArrowVisible();
                }
            },
            cardNumImg:{
                _run: function(){
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    this.cardLastNum = MjClient.majiang.getAllCardsTotal() - tData.maxPlayer * 20;
                },
                _event:{
                    initSceneData:function(){
                        if(!IsArrowVisible_paohuzi()){
                            return;
                        }
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
                },
                _text: function() {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData) return MjClient.majiang.getAllCardsTotal() - tData.cardNext;
                },
                _event: {
                    mjhand: function(){
                        this.visible = true;
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if (tData) this.setString(MjClient.majiang.getAllCardsTotal() - tData.cardNext);
                    },
                    HZNewCard: function(){
                        this.visible = true;
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if (tData) this.setString(MjClient.majiang.getAllCardsTotal() - tData.cardNext);
                    },
                    initSceneData: function(){
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if(tData && tData.tState == TableState.waitPut || tData.tState == TableState.waitEat || tData.tState == TableState.waitCard){
                            this.visible = true;
                            this.setString(MjClient.majiang.getAllCardsTotal() - tData.cardNext);
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
                if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR){
                    str += (tData.areaSelectMode.kingNum == 0) ? "无王," : (tData.areaSelectMode.kingNum == 1) ? "单王," : (tData.areaSelectMode.kingNum == 2) ? "双王," : "三王," ;
                }else if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King){
                    str += "四王," ;
                    var value = tData.areaSelectMode.isKing;
                    str += (value == 0) ? "按王限胡," : (value == 1) ? "按番限胡," : "不限胡,";
                }
                str += (tData.areaSelectMode.isFanXing == 1) ? "单醒," : "双醒," ;
                str += (tData.areaSelectMode.isGenXing == true) ? "跟醒" : "翻醒" ;
                str += (tData.areaSelectMode.hongZhuan == true) ? ",红转朱黑" : "";
                str += ("起胡" + tData.areaSelectMode.qihuTun + "囤");
                str += (tData.areaSelectMode.fengDing == -1) ? "无上限," : tData.areaSelectMode.fengDing + "分封顶,";
                str += (tData.areaSelectMode.fengDing == -1) ? "" : (tData.areaSelectMode.baodi == -1) ? ",不保底," : ",保底" + tData.areaSelectMode.baodi + "分,";
                str += tData.areaSelectMode.jieSuanDiFen && tData.areaSelectMode.jieSuanDiFen > 0 ? "积分底分" + tData.areaSelectMode.jieSuanDiFen + "," : ""; 
                str += tData.areaSelectMode.isManualCutCard == 1 ? "手动切牌," : tData.areaSelectMode.isManualCutCard == 0 ? "系统切牌," : "";
                this.ignoreContentAdaptWithSize(true);
                var str5 = ",四人场";
                this.setString(str + str5);
            }
        },
        jiazhuWait:{
            _visible:false,
            _layout: [[0.2, 0.2],[0.5, 0.5],[0, 0]]
        },
        banner: {
            _layout: [[0.4, 0.4],[0.5, 1],[0, 0]],
            _run: function() {
                    // if (getCurrentGameBgType() != 0)
                    //     changeGameTitleBg(this);
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
            bg_time:{
                //  _run:function()
                // {
                //     var text = new ccui.Text();
                //     text.setFontName("fonts/fzcy.ttf");
                //     text.setFontSize(20);
                    
                //     text.setAnchorPoint(0.5,0.5);
                //     text.setPosition(28.5, 12);
                //     this.addChild(text);
                //     text.schedule(function(){
                        
                //         var time = MjClient.getCurrentTime();
                //         var str = (time[3]<10?"0"+time[3]:time[3])+":"+
                //             (time[4]<10?"0"+time[4]:time[4]);
                //         this.setString(str);
                //     });
                // }

            },
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
                    var str1 = "四人场(坐醒),";
                    var str2 = "";
                    if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR){
                        str2 += (tData.areaSelectMode.kingNum == 0) ? "无王," : (tData.areaSelectMode.kingNum == 1) ? "单王," : (tData.areaSelectMode.kingNum == 2) ? "双王," : "三王," ;
                    }else if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King){
                        str2 += "四王," ;
                        var value = tData.areaSelectMode.isKing;
                        str += (value == 0) ? "按王限胡," : (value == 1) ? "按番限胡," : "不限胡,";
                    }
                    var str3 = (tData.areaSelectMode.isFanXing == 1) ? "单醒," : "双醒," ;
                    str3 += (tData.areaSelectMode.isGenXing == true) ? "跟醒," : "翻醒," ;
                    str3 += (tData.areaSelectMode.hongZhuan == true) ? "红转朱黑," : "";
                    str3 += ("起胡" + tData.areaSelectMode.qihuTun + "囤");
                    str3 += (tData.areaSelectMode.fengDing == -1) ? "无上限," : (tData.areaSelectMode.fengDing == 300)?"300分封顶,":"600分封顶,";
                    str3 += (tData.areaSelectMode.baodi == -1) ? "" : "保底" + tData.areaSelectMode.baodi + "分,";
                    str3 += tData.areaSelectMode.isManualCutCard == 1 ? "手动切牌," : tData.areaSelectMode.isManualCutCard == 0 ? "系统切牌," : "";
                    var sData = MjClient.data.sData;
                    var str7 = "  三缺一";
                    if((MjClient.MaxPlayerNum_paohuzi - Object.keys(sData.players).length) == 2){
                        str7 = "  二缺二";
                    }
                    if((MjClient.MaxPlayerNum_paohuzi - Object.keys(sData.players).length) == 3){
                        str7 = "  一缺三";
                    }
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
                    GLog(str1+str2+str3+str6);
                    MjClient.native.doCopyToPasteBoard("房间号:[" + tData.tableid + "]\n" + str1+str2+str6);
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
                   var settringLayer = null;
                    if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
                        settringLayer = new ZiPaiSettingView();
                    }else{
                        settringLayer = new SettingView("setting_ziPai.json");
                    }
                    settringLayer.setName("PlayLayerClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_shezhi", {uid:SelfUid(),gameType:MjClient.gameType});
                }
            },
            changeBg: {
                _click: function() {
                    setCurrentGameBgTypeToNext();
                    postEvent("changeGameBgEvent");
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Pifu", {uid:SelfUid(),gameType:MjClient.gameType});
                }
            },
            gps_btn: {
                //_layout: [[0.09, 0.09],[0.38, 0.93],[0, 0]],
                _click: function() {
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dingwei", {uid: SelfUid()});
                    if(MjClient.MaxPlayerNum_paohuzi == 3){
                        MjClient.Scene.addChild(new showDistance3PlayerLayer());
                    }else if(MjClient.MaxPlayerNum_paohuzi == 4){
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
                    //setWgtLayout(this,[0.1, 0.1], [0.5, 0.62], [0, 0]);
                },
                _event: {
                    initSceneData: function(eD) {
                        this.visible = IsArrowVisible_paohuzi();
                    },
                    mjhand: function(eD) {
                        this.visible = IsArrowVisible_paohuzi();
                    },
                    onlinePlayer: function(eD) {
                        this.visible = IsArrowVisible_paohuzi();
                    }
                },
                roundnumAtlas: {
                    _run:function () {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function() {
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if (tData) {
                            if (MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
                                return ((tData.roundAll - tData.roundNum + 1).toString()+"/"+tData.roundAll.toString()+"局");
                            } else {
                                return ((tData.roundNum - 1).toString()+"/"+tData.roundAll.toString()+"局");
                            }
                        }
                    },
                    _event: {
                        mjhand: function() {
                            var sData = MjClient.data.sData;
                            var tData = sData.tData;
                            if (tData) {
                                if (MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
                                    return this.setString((tData.roundAll - tData.roundNum + 1).toString()+"/"+tData.roundAll.toString()+"局");
                                } else {
                                    return this.setString((tData.roundNum - 1).toString()+"/"+tData.roundAll.toString()+"局");
                                }
                            }
                        },
                        initSceneData:function(){
                            var sData = MjClient.data.sData;
                            var tData = sData.tData;
                            if (tData) {
                                if (MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
                                    return this.setString((tData.roundAll - tData.roundNum + 1).toString()+"/"+tData.roundAll.toString()+"局");
                                } else {
                                    return this.setString((tData.roundNum - 1).toString()+"/"+tData.roundAll.toString()+"局");
                                }
                            }
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
            //         var str1 = "四人场(坐醒),";
            //         var str2 = (tData.areaSelectMode.kingNum == 2) ? "双王," : "三王,";
            //         var str3 = (tData.areaSelectMode.isFanXing == 1) ? "单醒," : "双醒," ;
            //         var sData = MjClient.data.sData;
            //         var str7 = "  三缺一";
            //         if((MjClient.MaxPlayerNum_paohuzi - Object.keys(sData.players).length) == 2){
            //             str7 = "  二缺二";
            //         }
            //         if((MjClient.MaxPlayerNum_paohuzi - Object.keys(sData.players).length) == 3){
            //             str7 = "  一缺三";
            //         }
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
            //         GLog(str1+str2+str3+str6);
            //         MjClient.native.doCopyToPasteBoard("房间号:[" + tData.tableid + "]\n" + str1+str2+str6);
            //         MjClient.showMsg("已复制房间号，请不要返回大厅。打开微信后粘贴房间信息。", function(){
            //             MjClient.native.openWeixin();
            //         });
            //     }
            // },
            wxinvite: {
                _visible: false,
                _layout: [[219/1280, 0],[0.697, 0.12],[0, 0]],
                _click: function() {
                    // var tData = MjClient.data.sData.tData;
                    // var str1 = "四人场(坐醒),";
                    // var str2 = "";
                    // if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR){
                    //     str2 += (tData.areaSelectMode.kingNum == 0) ? "无王," : (tData.areaSelectMode.kingNum == 1) ? "单王," : (tData.areaSelectMode.kingNum == 2) ? "双王," : "三王," ;
                    // }else if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King){
                    //     str2 += "四王," ;
                    //     str2 += (tData.areaSelectMode.isKing == true) ? "按王限胡," : "按番限胡," ;
                    // }
                    // var str3 = (tData.areaSelectMode.isFanXing == 1) ? "单醒," : "双醒," ;
                    // str3 += (tData.areaSelectMode.isGenXing == true) ? "跟醒," : "翻醒," ;
                    // str3 += (tData.areaSelectMode.hongZhuan == true) ? "红转朱黑," : "";
                    // str3 += (tData.areaSelectMode.fengDing == -1) ? "无上限," : (tData.areaSelectMode.fengDing == 300)?"300分封顶,":"600分封顶,";
                    // str3 += (tData.areaSelectMode.baodi == -1) ? "" : "保底" + tData.areaSelectMode.baodi + "分,";
                    // var txt_club = tData.clubId ? "(亲友圈:" + tData.clubId + ")" : "";
                    // var str6 = tData.roundNum + "局," + "点击立即加入牌局>>>";
                    // GLog(str1+str2+str3+str6);
                    // var sData = MjClient.data.sData;
                    // var str7 = "  三缺一";
                    // if((MjClient.MaxPlayerNum_paohuzi - Object.keys(sData.players).length) == 2){
                    //     str7 = "  二缺二";
                    // }
                    // if((MjClient.MaxPlayerNum_paohuzi - Object.keys(sData.players).length) == 3){
                    //     str7 = "  一缺三";
                    // }
                    // str7 +=  txt_club;
                    // GLog(str7 + str1 + str2 + str3 + str6 );
                    // MjClient.native.wxShareUrl(MjClient.remoteCfg.entreRoomUrl+"?vipTable="+tData.tableid, GameCnName[MjClient.gameType] + "  房间号:" + tData.tableid + str7,
                    //     str1+str2+str3+str6);
                    getPlayingRoomInfo_paohuzi(2);
                },
                _visible:function(){
                    return !MjClient.remoteCfg.guestLogin;
                }
            },
            delroom: {
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
        xing: {
            _run: function() {
                this.visible = false;
            }, 
            ready: {
                _layout: [[0.07, 0.07],[0.5, 0.25],[2.5, 2.5]],
                _run: function() {
                    GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(2));
                },
                _event: {
                    startShuffleCards:function (d) {
                        GetReadyVisible_paohuzi(this, -1);
                    },
                    moveHead: function() {
                        GetReadyVisible_paohuzi(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(2));
                    },
                    removePlayer: function() {
                        GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(2));
                    },
                    onlinePlayer: function() {
                        GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(2));
                    }
                }
            },    
            head: {
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function(){
                            var index = getXingPlayerIndex_paohuzi();
                            if(index != -1){
                                this.visible = true;
                            }
                        },
                        initSceneData: function(){
                            var index = getXingPlayerIndex_paohuzi();
                            if(index != -1){
                                this.visible = true;
                            }
                        },
                        mjhand: function(){
                            var index = getXingPlayerIndex_paohuzi();
                            if(index != -1){
                                this.visible = true;
                            }
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
                                var index = getXingPlayerIndex_paohuzi();
                                if(index != -1){
                                    showUserChat_paohuzi(this, index, msg);
                                }
                            },
                            playVoice: function(voicePath) {
                                var index = getXingPlayerIndex_paohuzi();
                                if(index != -1){
                                    MjClient.data._tempMessage.msg = voicePath;
                                    showUserChat_paohuzi(this, index, MjClient.data._tempMessage);
                                }
                            }
                        }
                    }
                },
                _click: function(btn) {
                    var index = getXingPlayerIndex_paohuzi();
                    cc.log("22222222222222222222222:" + index);
                    if(index != -1){
                        showPlayerInfo_paohuzi(index, btn);
                    }
                },
                _event: {
                    loadWxHead: function(d) {
                        var index = getXingPlayerIndex_paohuzi();
                        if(index != -1){
                            setWxHead_paohuzi(this, d, index);
                        }
                    },
                    removePlayer: function(eD) {
                        var index = getXingPlayerIndex_paohuzi();
                        if(index != -1)
                            showFangzhuTagIcon_paohuzi(this,index);                      
                    },
                    initSceneData: function(eD){
                        var index = getXingPlayerIndex_paohuzi();
                        if(index != -1)
                            showFangzhuTagIcon_paohuzi(this,index);   
                    },
                    mjhand: function(eD){
                        var index = getXingPlayerIndex_paohuzi();
                        if(index != -1)
                            showFangzhuTagIcon_paohuzi(this,index);   
                    },
                },
                score_bg:{_visible:true},
                huxi:{_visible: false},
                name_bg:{_visible:true},
                timeImg:{_visible:false}
            },
            _event:{
                removePlayer: function(eD) {
                    var index = getXingPlayerIndex_paohuzi();
                    if(index != -1){
                        this.visible = true;
                        SetUserVisible_paohuzi_SR(this,index); 
                    }
                },
                initSceneData: function(eD){
                    var index = getXingPlayerIndex_paohuzi();
                    if(index != -1){
                        this.visible = true;
                        SetUserVisible_paohuzi_SR(this,index);
                        InitUserCoinAndName_paohuzi(this, index);
                    }
                },
                mjhand: function(eD){
                    var index = getXingPlayerIndex_paohuzi();
                    if(index != -1){
                        this.visible = true;
                        SetUserVisible_paohuzi_SR(this,index);
                        InitUserCoinAndName_paohuzi(this, index);
                    }
                },
                addPlayer: function(eD){
                    var index = getXingPlayerIndex_paohuzi();
                    if(index != -1){
                        this.visible = true;
                        SetUserVisible_paohuzi_SR(this,index);
                        InitUserCoinAndName_paohuzi(this, index);
                    }
                },
                onlinePlayer: function(eD) {
                    var index = getXingPlayerIndex_paohuzi();
                    if(index != -1){
                        this.visible = true;
                        setUserOffline_paohuzi(this,index);
                    }
                },
                MJPut: function(eD) {
                    var index = getXingPlayerIndex_paohuzi();
                    DealXingPlayerPutCard_paohuzi(MjClient.playui._downNode,eD,index);

                    // var xing_off = getXingPlayerIndex_paohuzi();
                    // if (xing_off == 0) { // 自己是省家
                    //     DealXingPlayerPutCard_paohuzi(MjClient.playui._downNode, eD, 0);
                    // }
                },
                HZNewCard: function(eD) {
                    if (typeof(eD) == "number") {
                        eD = {newCard: eD};
                    }
                    var index = getXingPlayerIndex_paohuzi();
                    DealXingPlayerNewCard_paohuzi(this,eD,index);
                },
                HZChiCard: function(eD) {
                    var index = getXingPlayerIndex_paohuzi();
                    DealXingPlayerChiCard_paohuzi(MjClient.playui._downNode, eD, index);
                },
                HZWeiCard: function(eD){
                    var index = getXingPlayerIndex_paohuzi();
                    DealXingPlayerWeiCard_paohuzi(MjClient.playui._downNode,eD,index);
                },
                HZGangCard: function(eD) {
                    var index = getXingPlayerIndex_paohuzi();
                    DealXingPlayerGangCard_paohuzi(MjClient.playui._downNode, eD, index);
                },
                MJPeng: function(eD) {
                    var index = getXingPlayerIndex_paohuzi();
                    DealXingPlayerPengCard_paohuzi(MjClient.playui._downNode, eD, index);
                }, 
                roundEnd: function() {
                    var index = getXingPlayerIndex_paohuzi();
                    InitUserCoinAndName_paohuzi(this, index);
                    //setTaiInfo("");
                },       
            }
        },
        BtnReady:{
            _run: function () {
                this.visible = false;
                //setWgtLayout(this,[0.135, 0.128], [0.5, 0.40], [0.0, 0.26]);
                setWgtLayout(this, [219/1280, 0],[0.5, 0.12],[0, 0]);
            },
            _click: function(btn) {
                cc.log("-----------叫地主-------");
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zhunbei", {uid: SelfUid(), gameType:MjClient.gameType});
                //sendQiangdizhu(true);
                HZPassConfirmToServer_paohuzi();
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
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function(){
                            showUserZhuangLogo_paohuzi(this, getOffByXing_paohuzi(0));
                        },
                        initSceneData: function(){
                            if (IsArrowVisible_paohuzi()){
                                showUserZhuangLogo_paohuzi(this, getOffByXing_paohuzi(0));
                            }
                        },
                        mjhand: function(){
                            if (IsArrowVisible_paohuzi()){
                                showUserZhuangLogo_paohuzi(this, getOffByXing_paohuzi(0));
                            }
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
                                showUserChat_paohuzi(this, getOffByXing_paohuzi(0), msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat_paohuzi(this, getOffByXing_paohuzi(0), MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    cc.log("1111111111111111111:" + getOffByXing_paohuzi(0));
                    cc.log(MjClient.data.sData.tData.uids);
                    showPlayerInfo_paohuzi(getOffByXing_paohuzi(0), btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead_paohuzi(this, d, getOffByXing_paohuzi(0));
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon_paohuzi(this,getOffByXing_paohuzi(0));
                    },
                    mjhand: function(eD){
                        showFangzhuTagIcon_paohuzi(this,getOffByXing_paohuzi(0)); 
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon_paohuzi(this,getOffByXing_paohuzi(0));
                    }
                },
                _run: function () {
                    showFangzhuTagIcon_paohuzi(this,getOffByXing_paohuzi(0));
                },
                score_bg:{_visible:false},
                huxi:{
                    _visible: false,
                    _event:{
                        clearCardUI: function(){
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
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(0));
                            if(!IsArrowVisible_paohuzi()){
                                huXi = 0;
                            }
                            return this.setString(huXi + "胡息");
                        },
                        mjhand:function(){
                            this.visible = true;
                        },
                        HZChiCard:function(){
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(0));
                            return this.setString(huXi + "胡息");
                        },
                        MJPeng:function(){
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(0));
                            return this.setString(huXi + "胡息");
                        },
                        HZGangCard:function(){
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(0));
                            return this.setString(huXi + "胡息");
                        },
                        HZWeiCard:function(){
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(0));
                            return this.setString(huXi + "胡息");
                        }
                    }
                },
                name_bg:{_visible:false},
                timeImg:{
                    _visible:false,
                    _event:{
                        initSceneData: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0));
                        },
                        mjhand: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0));
                        },
                        onlinePlayer: function(eD) {
                            // this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0));
                        },
                        waitPut: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0));
                        },
                        HZNewCard: function(ed){
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0));
                        },
                        MJPeng: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0));
                        },
                        HZChiCard: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0));
                        },
                        HZGangCard: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0));
                        },
                        HZWeiCard: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0));
                        },
                        MJPut: function(eD){
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0));
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
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0))){
                                    arrowbkNumberUpdate(this);
                                    this.setString("00");
                                }
                            },
                            mjhand: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPeng: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZNewCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZGangCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZChiCard: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZWeiCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPut: function(msg) {
                                if (curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0))) {
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
                                var pl = getUIPlayer_paohuzi(getOffByXing_paohuzi(0));
                                if(pl && pl.onLine && curPlayerIsMe_paohuzi(getOffByXing_paohuzi(0))){
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
                            this.visible = false;
                            var pl = getUIPlayer_paohuzi(getOffByXing_paohuzi(0));
                            //cc.log("====================initSceneData=============== pl.isQiHu = " + pl.isQiHu);
                            if (pl && pl.isQiHu) {
                                this.visible = true;
                            }
                        },                        
                        mjhand: function(){
                            this.visible = false;
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
                    GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(0));
                },
                _event: {
                    startShuffleCards:function (d) {
                        GetReadyVisible_paohuzi(this, -1);
                    },
                    moveHead: function() {
                        GetReadyVisible_paohuzi(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(0));//根据状态设置ready 是否可见 add by sking
                    },
                    removePlayer: function() {
                        GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(0));
                    },
                    onlinePlayer: function() {
                        GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(0));
                    }
                }
            },
            handNode: {
                _visible: false
            },
            eatNode: {
                _visible: true,
                _layout : [[0.12, 0.12], [0.02, 0.23], [0, 0]],
                _run:function()
                {
                    if(isIPhoneX()){
                        setWgtLayout(this, [0.12, 0.12], [0.04, 0.23], [0, 0]);
                    }else{
                        setWgtLayout(this, [0.12, 0.12], [0.02, 0.23], [0, 0]);
                    }
                    var userData = {scale:this.getScale(), pos:this.getPosition()};
                    this.setUserData(userData);
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
                _layout : [[0.12, 0.12], [0.7, 0.5], [0, 0]],
            },
            handCard: {
                _visible: false,
                _layout: [[0.185, 0.17],[0.27,0.75],[0,0]]
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
                    clearCardUI_paohuzi(this, getOffByXing_paohuzi(0));
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
                    RemovePutCardOut_paohuzi(true);
                },
                initSceneData: function(eD) {
                    var putNode = this.getChildByName("put");
                    putNode && putNode.stopAllActions();

                    SetUserVisible_paohuzi_SR(this, getOffByXing_paohuzi(0));
                    MjClient.hasPut = false; // 重连回来重置打掉牌标志（打牌时候断线)
                    if (MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
                        ShowPutCardIcon_new();
                    } else {
                        ShowPutCardIcon();
                    }
                    DealOffLineCard_paohuzi(this,getOffByXing_paohuzi(0));
                },
                addPlayer: function(eD) {
                    SetUserVisible_paohuzi_SR(this, getOffByXing_paohuzi(0));
                },
                removePlayer: function(eD) {
                    SetUserVisible_paohuzi_SR(this, getOffByXing_paohuzi(0));
                },
                mjhand: function(eD) {
                    InitUserHandUI_paohuzi_SR(this, getOffByXing_paohuzi(0));
                    SetUserVisible_paohuzi_SR(this, getOffByXing_paohuzi(0));
                    var tData = MjClient.data.sData.tData;
                    if(tData.areaSelectMode.isManualCutCard && MjClient.playui.playuiNode.cutCardView){
                        MjClient.playui.playuiNode.cutCardView.cutCardsEffect(this);
                    }
                },
                roundEnd: function() {
                    InitUserCoinAndName_paohuzi(this, getOffByXing_paohuzi(0));
                    //setTaiInfo("");
                },
                HZNewCard: function(eD) {
                    console.log("客户端发牌组合...... ");
                    if (typeof(eD) == "number") {
                        eD = {newCard: eD};
                    }
                    DealNewCard_paohuzi(this,eD,getOffByXing_paohuzi(0));
                },
                MJPut: function(eD) {
                    DealPutCard_paohuzi(this,eD,getOffByXing_paohuzi(0));
                },
                HZChiCard: function(eD) {
                    DealChiCard_paohuzi(this, eD, getOffByXing_paohuzi(0));
                },
                HZWeiCard: function(eD){
                    DealWeiCard_paohuzi(this,eD,getOffByXing_paohuzi(0));
                },
                HZGangCard: function(eD) {
                    DealGangCard_paohuzi(this, eD, getOffByXing_paohuzi(0));
                },
                MJPeng: function(eD) {
                    DealPengCard_paohuzi(this, eD, getOffByXing_paohuzi(0));
                },
                MJHu: function(eD) {
                    DealHu_paohuzi(this, eD, getOffByXing_paohuzi(0));
                },
                HZWangChuang: function(eD){
                    DealWangChuang_paohuzi(this, eD, getOffByXing_paohuzi(0));
                },
                HZWangChuangShow:function(eD){
                    DealWangChuang_paohuzi(this, eD, getOffByXing_paohuzi(0));
                },
                onlinePlayer: function(eD) {
                    resetHandAfterBegin_paohuzi();
                    setUserOffline_paohuzi(this, getOffByXing_paohuzi(0));
                },
                playerStatusChange: function(eD) {
                    setUserOffline_paohuzi(this, getOffByXing_paohuzi(0));
                },
                MJFlower: function(eD) {
                    HandleMJFlower(this, eD, getOffByXing_paohuzi(0));
                },
                MJTing: function (eD) {
                    HandleMJTing(this, eD, getOffByXing_paohuzi(0));
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
                            showUserZhuangLogo_paohuzi(this, getOffByXing_paohuzi(1));
                        },
                        initSceneData: function() {
                            if (IsArrowVisible_paohuzi()) showUserZhuangLogo_paohuzi(this, getOffByXing_paohuzi(1));
                        },
                        mjhand: function(){
                            if (IsArrowVisible_paohuzi()) showUserZhuangLogo_paohuzi(this, getOffByXing_paohuzi(1));
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
                                showUserChat_paohuzi(this, getOffByXing_paohuzi(1), msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat_paohuzi(this, getOffByXing_paohuzi(1), MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    showPlayerInfo_paohuzi(getOffByXing_paohuzi(1), btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead_paohuzi(this, d, getOffByXing_paohuzi(1));
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon_paohuzi(this,getOffByXing_paohuzi(1));
                    },
                    mjhand: function(eD){
                        showFangzhuTagIcon_paohuzi(this,getOffByXing_paohuzi(1)); 
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon_paohuzi(this,getOffByXing_paohuzi(1));
                    }
                },
                _run: function () {
                    showFangzhuTagIcon_paohuzi(this,getOffByXing_paohuzi(1));
                },
                score_bg:{_visible:false},
                huxi:{
                    _visible: false,
                    _event:{
                        clearCardUI: function(){
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
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(1));
                            if(!IsArrowVisible_paohuzi()){
                                huXi = 0;
                            }
                            return this.setString(huXi + "胡息");
                        },
                        mjhand:function(){
                            this.visible = true;
                        },
                        HZChiCard:function(){
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(1));
                            return this.setString(huXi + "胡息");
                        },
                        MJPeng:function(){
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(1));
                            return this.setString(huXi + "胡息");
                        },
                        HZGangCard:function(){
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(1));
                            return this.setString(huXi + "胡息");
                        },
                        HZWeiCard:function(){
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(1));
                            return this.setString(huXi + "胡息");
                        }
                    }
                },
                name_bg:{_visible:false},
                timeImg:{
                    _visible:false,
                    _event:{
                        initSceneData: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1));
                        },
                        mjhand: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1));
                        },
                        onlinePlayer: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1)) && IsArrowVisible_paohuzi();
                        },
                        waitPut: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1));
                        },
                        HZNewCard: function(ed){
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1));
                        },
                        MJPeng: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1));
                        },
                        HZChiCard: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1));
                        },
                        HZGangCard: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1));
                        },
                        HZWeiCard: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1));
                        },
                        MJPut: function(eD){
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1));
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
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1))){
                                    arrowbkNumberUpdate(this);
                                    this.setString("00");
                                }
                            },
                            mjhand: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPeng: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZNewCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZGangCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZChiCard: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZWeiCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPut: function(msg) {
                                if (curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1))) {
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
                                var pl = getUIPlayer_paohuzi(getOffByXing_paohuzi(1));
                                if(pl && pl.onLine && curPlayerIsMe_paohuzi(getOffByXing_paohuzi(1))){
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
                    GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(1));
                },
                _event: {
                    startShuffleCards:function (d) {
                        GetReadyVisible_paohuzi(this, -1);
                    },
                    moveHead: function() {
                        GetReadyVisible_paohuzi(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(1));
                    },
                    removePlayer: function() {
                        GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(1));
                    },
                    onlinePlayer: function() {
                        GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(1));
                    }
                }
            },
            replayNode:{
                _visible: true,
                _layout : [[0.1, 0.1], [0.85, 0.81], [0, 0]]
            },
            eatNode: {
                _visible: true,
                _layout : [[0.12, 0.12], [0.98, 0.74], [0, 0]],
                _run:function()
                {
                    setWgtLayout(this, [0.12, 0.12], [0.98, 0.74], [0, 0]);
                    var userData = {scale:this.getScale(), pos:this.getPosition()};
                    this.setUserData(userData);
                }
            },
            outNode: {
                _visible: true,
                _layout : [[0.12, 0.12], [0.88, 0.82], [0, 0]]
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
                    clearCardUI_paohuzi(this, getOffByXing_paohuzi(1));
                },
                clearCardArr: function(){
                    var eatNode = this.getChildByName("eatNode");
                    eatNode.removeAllChildren();
                    var outNode = this.getChildByName("outNode");
                    outNode.removeAllChildren();
                    RemovePutCardOut_paohuzi(true);
                },
                initSceneData: function(eD) {
                    SetUserVisible_paohuzi_SR(this, getOffByXing_paohuzi(1));
                    DealOffLineCard_paohuzi(this,getOffByXing_paohuzi(1));
                },
                addPlayer: function(eD) {
                    SetUserVisible_paohuzi_SR(this, getOffByXing_paohuzi(1));
                },
                removePlayer: function(eD) {
                    SetUserVisible_paohuzi_SR(this, getOffByXing_paohuzi(1));
                },
                mjhand: function(eD) {
                    InitUserHandUI_paohuzi_SR(this, getOffByXing_paohuzi(1));
                    SetUserVisible_paohuzi_SR(this, getOffByXing_paohuzi(1));
                },
                HZNewCard: function(eD) {
                    console.log("客户端发牌组合...... ");
                    if (typeof(eD) == "number") {
                        eD = {newCard: eD};
                    }
                    DealNewCard_paohuzi(this,eD,getOffByXing_paohuzi(1));
                },
                roundEnd: function() {
                    InitUserCoinAndName_paohuzi(this, getOffByXing_paohuzi(1));
                    MjClient.playui.ResetEatCardsEnd(this, getOffByXing_paohuzi(1));
                },
                waitPut: function(eD) {
                    DealWaitPut(this, eD, getOffByXing_paohuzi(1));
                },
                MJPut: function(eD) {
                    DealPutCard_paohuzi(this, eD, getOffByXing_paohuzi(1));
                },
                HZChiCard: function(eD) {
                    DealChiCard_paohuzi(this, eD, getOffByXing_paohuzi(1));
                },
                HZGangCard: function(eD) {
                    DealGangCard_paohuzi(this, eD, getOffByXing_paohuzi(1));
                },
                MJPeng: function(eD) {
                    DealPengCard_paohuzi(this, eD, getOffByXing_paohuzi(1));
                },
                HZWeiCard: function(eD){
                    DealWeiCard_paohuzi(this, eD, getOffByXing_paohuzi(1));
                },
                MJHu: function(eD) {
                    DealHu_paohuzi(this, eD, getOffByXing_paohuzi(1));
                },
                HZWangChuang: function(eD){
                    DealWangChuang_paohuzi(this, eD, getOffByXing_paohuzi(1));
                },
                HZWangChuangShow:function(eD){
                    DealWangChuang_paohuzi(this, eD, getOffByXing_paohuzi(1));
                },
                onlinePlayer: function(eD) {
                    setUserOffline_paohuzi(this, getOffByXing_paohuzi(1));
                },
                playerStatusChange: function(eD) {
                    setUserOffline_paohuzi(this, getOffByXing_paohuzi(1));
                },
                MJFlower: function(eD) {
                    HandleMJFlower(this, eD, getOffByXing_paohuzi(1));
                },
                MJTing: function (eD) {
                    HandleMJTing(this, eD, getOffByXing_paohuzi(1));
                },
                waitJiazhu:function (msg) {
                    postEvent("returnPlayerLayer");
                    /*
                     弹窗加注
                     */
                    var layer = new jiaZhuXuzhouLayer(function(){
                        //弹窗等待
                        MjClient.playui._jiazhuWait.visible = true;
                        //if(MjClient.playui._waitLayer == null)
                        //{
                        //    MjClient.playui._jiazhuWait.visible = true;
                        //    //MjClient.playui._waitLayer = new UnclosedTipLayer("等待其他玩家加注!");
                        //    //MjClient.Scene.addChild(MjClient.playui._waitLayer,99);
                        //}
                    });
                    MjClient.playui.addChild(layer,99);
                    if (MjClient.webViewLayer != null)
                    {
                        MjClient.webViewLayer.close();
                    }
                }
            }
        },
        left: {
            head: {
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function() {
                            showUserZhuangLogo_paohuzi(this, getOffByXing_paohuzi(3));
                        },
                        initSceneData: function() {
                            if (IsArrowVisible_paohuzi()) showUserZhuangLogo_paohuzi(this, getOffByXing_paohuzi(3));
                        },
                        mjhand: function(){
                            if (IsArrowVisible_paohuzi()) showUserZhuangLogo_paohuzi(this, getOffByXing_paohuzi(3));
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
                                showUserChat_paohuzi(this, getOffByXing_paohuzi(3), msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat_paohuzi(this, getOffByXing_paohuzi(3), MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    showPlayerInfo_paohuzi(getOffByXing_paohuzi(3), btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead_paohuzi(this, d, getOffByXing_paohuzi(3));
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon_paohuzi(this,getOffByXing_paohuzi(3));
                    },
                    mjhand: function(eD){
                        showFangzhuTagIcon_paohuzi(this,getOffByXing_paohuzi(3)); 
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon_paohuzi(this,getOffByXing_paohuzi(3));
                    }
                },
                _run: function () {
                    showFangzhuTagIcon_paohuzi(this,getOffByXing_paohuzi(3));
                },
                score_bg:{_visible:false},
                huxi:{
                    _visible: false,
                    _event:{
                        clearCardUI: function(){
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
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(3));
                            if(!IsArrowVisible_paohuzi()){
                                huXi = 0;
                            }
                            return this.setString(huXi + "胡息");
                        },
                        mjhand:function(){
                            this.visible = true;
                        },
                        HZChiCard:function(){
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(3));
                            return this.setString(huXi + "胡息");
                        },
                        MJPeng:function(){
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(3));
                            return this.setString(huXi + "胡息");
                        },
                        HZGangCard:function(){
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(3));
                            return this.setString(huXi + "胡息");
                        },
                        HZWeiCard:function(){
                            var huXi = UpdateHuXi_paohuzi(getOffByXing_paohuzi(3));
                            return this.setString(huXi + "胡息");
                        },
                    }
                },
                name_bg:{_visible:false},
                timeImg:{
                    _visible:false,
                    _event:{
                        initSceneData: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3));
                        },
                        mjhand: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3));
                        },
                        onlinePlayer: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3)) && IsArrowVisible_paohuzi();
                        },
                        waitPut: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3));
                        },
                        HZNewCard: function(ed){
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3));
                        },
                        MJPeng: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3));
                        },
                        HZChiCard: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3));
                        },
                        HZGangCard: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3));
                        },
                        HZWeiCard: function(eD) {
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3));
                        },
                        MJPut: function(eD){
                            this.visible = curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3));
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
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3))){
                                    arrowbkNumberUpdate(this);
                                    this.setString("00");
                                }
                            },
                            mjhand: function(eD) {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPeng: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZNewCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZGangCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZChiCard: function() {
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            HZWeiCard: function(){
                                this.stopAllActions();
                                stopEffect(playTimeUpEff);
                                playTimeUpEff = null;
                                if(curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3))){
                                    arrowbkNumberUpdate(this);
                                }
                            },
                            MJPut: function(msg) {
                                if (curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3))) {
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
                                var pl = getUIPlayer_paohuzi(getOffByXing_paohuzi(3));
                                if(pl && pl.onLine && curPlayerIsMe_paohuzi(getOffByXing_paohuzi(3))){
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
                    GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(3));
                },
                _event: {
                    startShuffleCards:function (d) {
                        GetReadyVisible_paohuzi(this, -1);
                    },
                    moveHead: function() {
                        GetReadyVisible_paohuzi(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(3));
                    },
                    removePlayer: function() {
                        GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(3));
                    },
                    onlinePlayer: function() {
                        GetReadyVisible_paohuzi(this, getOffByXing_paohuzi(3));
                    }
                }
            },
            replayNode:{
                _visible: true,
                _layout : [[0.1, 0.1], [0.15, 0.81], [0, 0]]
            },
            eatNode: {
                _visible: false,
                _layout : [[0.12, 0.12], [0.02, 0.74], [0, 0]],
                _run:function()
                {
                    if(isIPhoneX()){
                        setWgtLayout(this, [0.12, 0.12], [0.04, 0.74], [0, 0]);
                    }else{
                        setWgtLayout(this, [0.12, 0.12], [0.02, 0.74], [0, 0]);
                    }
                    var userData = {scale:this.getScale(), pos:this.getPosition()};
                    this.setUserData(userData);
                }
            },
            outNode: {
                _visible: false,
                _layout : [[0.12, 0.12], [0.12, 0.82], [0, 0]]
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
                    clearCardUI_paohuzi(this, getOffByXing_paohuzi(3));
                },
                clearCardArr: function(){
                    var eatNode = this.getChildByName("eatNode");
                    eatNode.removeAllChildren();
                    var outNode = this.getChildByName("outNode");
                    outNode.removeAllChildren();
                    RemovePutCardOut_paohuzi(true);
                },
                initSceneData: function(eD) {
                    SetUserVisible_paohuzi_SR(this, getOffByXing_paohuzi(3));
                    DealOffLineCard_paohuzi(this,getOffByXing_paohuzi(3));
                },
                addPlayer: function(eD) {
                    SetUserVisible_paohuzi_SR(this, getOffByXing_paohuzi(3));
                },
                removePlayer: function(eD) {
                    SetUserVisible_paohuzi_SR(this, getOffByXing_paohuzi(3));
                },
                mjhand: function(eD) {
                    InitUserHandUI_paohuzi_SR(this, getOffByXing_paohuzi(3));
                    SetUserVisible_paohuzi_SR(this, getOffByXing_paohuzi(3));
                },
                HZNewCard: function(eD) {
                    console.log("客户端发牌组合...... ");
                    if (typeof(eD) == "number") {
                        eD = {newCard: eD};
                    }
                    DealNewCard_paohuzi(this,eD,getOffByXing_paohuzi(3));
                },
                roundEnd: function() {
                    InitUserCoinAndName_paohuzi(this, getOffByXing_paohuzi(3));
                    MjClient.playui.ResetEatCardsEnd(this, getOffByXing_paohuzi(3));
                },
                MJPut: function(eD) {
                    DealPutCard_paohuzi(this, eD, getOffByXing_paohuzi(3));
                },
                HZChiCard: function(eD) {
                    DealChiCard_paohuzi(this, eD, getOffByXing_paohuzi(3));
                },
                HZPaoCard: function(eD) {
                    DealPaoCard_paohuzi(this, eD, getOffByXing_paohuzi(3));
                },
                HZGangCard: function(eD) {
                    DealGangCard_paohuzi(this, eD, getOffByXing_paohuzi(3));
                },
                MJPeng: function(eD) {
                    DealPengCard_paohuzi(this, eD, getOffByXing_paohuzi(3));
                },
                HZWeiCard: function(eD){
                    DealWeiCard_paohuzi(this, eD, getOffByXing_paohuzi(3));
                },
                MJHu: function(eD) {
                    DealHu_paohuzi(this, eD, getOffByXing_paohuzi(3));
                },
                onlinePlayer: function(eD) {
                    setUserOffline_paohuzi(this, getOffByXing_paohuzi(3));
                },
                playerStatusChange: function(eD) {
                    setUserOffline_paohuzi(this, getOffByXing_paohuzi(3));
                },
                HZWangChuang: function(eD){
                    DealWangChuang_paohuzi(this, eD, getOffByXing_paohuzi(3));
                },
                HZWangChuangShow:function(eD){
                    DealWangChuang_paohuzi(this, eD, getOffByXing_paohuzi(3));
                },
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
                        showSelectEatCards_paohuzi(this,btn.tag);
                        // MJChiCardchange_paohuzi();
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
                        HZPengToServer_paohuzi();
                        setChiVisible_paohuzi();
                    }
                }
            },
            guo: {
                _visible: false,
                _layout: [[0, 0.1],[0.5, 0],[4.6, 2.5]],
                _touch: function(btn, eT) {
                    if (eT == 2){
                        MjClient.MJPass2NetForpaohuzi();
                        setChiVisible_paohuzi();//add by maoyu
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
                        MJHuToServer_paohuzi();
                        setChiVisible_paohuzi();//add by maoyu
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
                        resetChiParam_paohuzi();
                        MjClient.playui.EatVisibleCheck();
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
                        HZWangChuangToServer_paohuzi(1);
                        setChiVisible_paohuzi();//add by maoyu
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
                        HZWangChuangToServer_paohuzi(2);
                        setChiVisible_paohuzi();//add by maoyu
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
                        HZWangChuangToServer_paohuzi(4);
                        setChiVisible_paohuzi();//add by maoyu
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
                    setQiHuState_paohuzi_SR();
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
                    setQiHuState_paohuzi_SR();
                    //放在每个方向节点上去做，因为摸到王霸牌的时候，有个显示动作，动作显示完之后
                    //在显示各种操作按钮
                    if(eD.isCommon && eD.newCard){
                        MjClient.playui.EatVisibleCheck();
                    }
                },
                HZGangCard: function(eD) {
                    console.log("HHH :HZGangCard------");
                    setQiHuState_paohuzi_SR();
                    MjClient.playui.EatVisibleCheck();
                },
                MJPut: function(eD) {
                    console.log("HHH :，MJPut------");
                    setQiHuState_paohuzi_SR();
                    MjClient.playui.EatVisibleCheck();
                },
                MJPeng: function(eD) {
                    console.log("HHH :，MJPeng------");
                    setQiHuState_paohuzi_SR();
                    MjClient.playui.EatVisibleCheck();
                },
                HZChiCard: function(eD) {
                    console.log("HHH :HZChiCard------");
                    setQiHuState_paohuzi_SR();
                    MjClient.playui.EatVisibleCheck();
                },
                HZWeiCard: function(eD) {
                    console.log("HHH :HZWeiCard------");
                    setQiHuState_paohuzi_SR();
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
                setWgtLayout(this,[0.18, 0.18], [0.75, 0.3], [0.7, -0.1]);
            },
            _event:{
                MJHu:function(){
                    this.visible = false;
                }
            }
        },
        li_btn: {
            // _visible:false,
            _layout: [[0.09, 0.09],[0.06, 0.5],[0, -0.2]],
            _run: function () {
                if(isIPhoneX()){
                    setWgtLayout(this,[0.09, 0.09],[0.07, 0.5],[0, -0.2]);
                }
            },
            _click: function() {
                var tData = MjClient.data.sData.tData;
                if(tData.tState != TableState.waitEat && tData.tState != TableState.waitCard &&　tData.tState != TableState.waitPut)
                {
                    return;
                }
                MjClient.HandCardArr = MjClient.majiang.sortByUser();
                MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);
            },
            _event: {
                mjhand:function (eD) {
                    this.setVisible(true);
                },
                initSceneData: function(eD) {
                    var tData = MjClient.data.sData.tData;
                    if(tData.tState != TableState.waitPut && tData.tState != TableState.waitEat && tData.tState != TableState.waitCard){
                        return;
                    }
                    this.setVisible(true);
                },
            }
        },
        chat_btn: {
            _layout: [[0.09, 0.09],[0.97, 0.35],[0, -0.2]],
            _click: function() {
                var chatlayer = new ChatLayer();
                MjClient.Scene.addChild(chatlayer);
            }
        },
        voice_btn: {
            _layout: [[0.09, 0.09],[0.97, 0.5],[0, -0.2]],
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
                    downAndPlayVoice_paohuzi(msg.uid, msg.msg);
                }
            }
        },
        cutLine:{
            _visible: false,
            _run: function () {
                setWgtLayout(this,[1, 0.3], [0.5, 0.53], [0, -2]);
            },
            _event: {
                mjhand: function(eD){
                    if (MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
                        ShowPutCardIcon_new();
                    } else {
                        ShowPutCardIcon();
                    }
                },
                HZNewCard: function(eD){
                    if (MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
                        ShowPutCardIcon_new();
                    } else {
                        ShowPutCardIcon();
                    }
                },                
                HZChiCard: function(eD) {
                    if (MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
                        ShowPutCardIcon_new();
                    } else {
                        ShowPutCardIcon();
                    }
                },
                MJPeng: function(eD) {
                    if (MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
                        ShowPutCardIcon_new();
                    } else {
                        ShowPutCardIcon();
                    }
                },
                MJPut:function(eD) {
                    if (MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
                        ShowPutCardIcon_new();
                    } else {
                        ShowPutCardIcon();
                    }
                },
                MJPass:function(eD) {
                    if (MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
                        ShowPutCardIcon_new();
                    } else {
                        ShowPutCardIcon();
                    }
                },
                MJHu:function(eD){
                    this.visible = false;
                }
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
        var playui = ccs.load("Play_paohuzi.json");
        playMusic("bgFight");

        var tData = MjClient.data.sData.tData;
        MjClient.MaxPlayerNum_paohuzi = tData.maxPlayer;
        cc.log(MjClient.MaxPlayerNum_paohuzi);

        this._downNode  = playui.node.getChildByName("down");
        this._rightNode = playui.node.getChildByName("right");
        this._topNode  = playui.node.getChildByName("left");
        this._xingNode = playui.node.getChildByName("xing");
        MjClient.HandCardArr = [];
        MjClient.OtherHandArr = {};
        MjClient.playui = this;
        MjClient.playui._AniNode =  playui.node.getChildByName("eat");
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
PlayLayer_paohuzi_SR.prototype.ResetHandCard = function(posNode,off, needAction, isDelay){
    needAction = needAction === undefined ? false : needAction;

    if(off == 0){

        //todo 千千
        if(!needAction && !isDelay && MjClient.addGroupIndex != 0){
            refreshNode_paohuzi(posNode,off,needAction);

            this.scheduleOnce(function(){
                this.ResetHandCard(posNode,off,needAction,true);
            }.bind(this), 0.35);
            return;
        }

        checkCard_paohuzi(posNode, off);
        //if(MjClient.movingCard_paohuzi && MjClient.movingCard_paohuzi.getParent()){
        //    MjClient.movingCard_paohuzi.removeFromParent(true);
        //    MjClient.movingCard_paohuzi = null;
        //}
        //if(MjClient.cloneCard && MjClient.cloneCard.getParent()){
        //    MjClient.cloneCard.removeFromParent(true);
        //    MjClient.cloneCard = null;
        //}
        var handNode = posNode.getChildByName("handNode");
        if (!handNode) return;
        handNode.visible = true;
        handNode.removeAllChildren();
        var cardArr = MjClient.HandCardArr;
        //清理空数组
        for(var k = cardArr.length - 1;k >=0;k--){
            if(cardArr[k].length == 0){
                cardArr.splice(k,1);
            }
        }
        for(var k = 0;k < cardArr.length;k++){
            var groupList = cardArr[k];
            for(var j = 0;j < groupList.length;j++){
                addHandCard_paohuzi(k,j,groupList[j],off);
            }
        }

        var handCard = posNode.getChildByName("handCard");
        var scale_x = handCard.scaleX;
        var winSize = MjClient.size;
        var totalWidth = handCard.width * cardArr.length * scale_x;
        for(var i = 0;i < cardArr.length;i++){
            var addNode = handNode.getChildByTag(i);
            // addNode.setPosition(cc.p((winSize.width - totalWidth)/2 + i * handCard.width * scale_x,0));

            if(needAction){
                addNode.x = winSize.width * 0.5;
                addNode.y = 0;
                this._doMovetoAction(addNode, cc.p((winSize.width - totalWidth)/2 + i * handCard.width * scale_x,0));
            }else{
                addNode.setPosition(cc.p((winSize.width - totalWidth)/2 + i * handCard.width * scale_x,0));    
            }
        }
    }else if(MjClient.rePlayVideo != -1 && off != 0){
        cc.log(posNode.getName());
        var handNode = posNode.getChildByName("replayNode");

        var cardArr = MjClient.OtherHandArr[off];
        if(!cardArr || !handNode){
            return;
        }

        handNode.visible = true;
        handNode.removeAllChildren();

        var indexByXing = getXingPlayerIndex_paohuzi();
        var selfIsXing = (0 == indexByXing);
        if(selfIsXing)
            off = getOffByXing_paohuzi(off);

        //清理空数组
        for(var k = cardArr.length - 1;k >=0;k--){
            if(cardArr[k].length == 0){
                cardArr.splice(k,1);
            }
        }
        for(var k = 0;k < cardArr.length;k++){
            var groupList = cardArr[k];
            for(var j = 0;j < groupList.length;j++){
                addHandCardReplay_paohuzi(k,j,groupList[j],off);
            }
        }       
    }
};

PlayLayer_paohuzi_SR.prototype._doMovetoAction = function(node,endP){
    var ac = cc.moveTo(0.3,endP);
    node.runAction(ac);
}

PlayLayer_paohuzi_SR.prototype.ResetEatCardsEnd = function(posNode,off){
    var pl = getUIPlayer_paohuzi(off);
    if (!pl) return;
    //提、偎牌的特殊处理
    var callback = function(childList){
        for(var i = 0;i < childList.length;i++){
            var child = childList[i];
            var mjNum = child.tag;
            child.loadTexture(MjClient.cardPath_paohuzi+"out" + mjNum + ".png");
            var shade = new cc.Sprite("playing/paohuzi/huxiBG1.png");
            shade.opacity = 100;
            shade.x = shade.width/2;
            shade.y = shade.height/2;
            child.addChild(shade);
        }
    };
    //找出是否有王霸+偎的组合
    var mjSortArr = pl.mjsort.slice();
    var handSortArr = pl.handSort.slice();
    var weiCard = 0;
    for(var i = 0; i < handSortArr.length; i++){
        var handSort = handSortArr[i];
        if(handSort.name == "ti"){
            var cards = handSort.cards;
            if(pl.mjwei.indexOf(cards[0]) >= 0 && cards[0] == cards[1] && cards[1] == cards[2] && cards[2] != cards[3]){
                weiCard = cards[0];
                break;
            } 
        }
    }

    var eatNode = posNode.getChildByName("eatNode");
    var children = eatNode.children;
    var weiIndex = -1;
    for(var i = 0;i < children.length;i++){
        var child = children[i];
        var childName = child.getName();
        if(childName.indexOf("mjwei") >= 0){
            var childArr = child.children;
            var mjNum = childArr[0].tag;
            if(mjNum == weiCard){
                weiIndex = i;
                break;
            }
        }
    }

    this.ResetOtherCard(posNode,off);
    if(weiCard != 0){
        for(var i = 0;i < 3;i++){
            addEatCard_paohuzi(posNode,"mjwei" + 10,weiCard,off);
        }

        var weiParentNode = eatNode.getChildByName("mjwei" + 10);
        var childArr = weiParentNode.children;
        var skipPeng = pl.skipPeng;
        if(!skipPeng || skipPeng.indexOf(weiCard) < 0){
            callback(childArr);
        }else{
            for(var i = 0;i < childArr.length;i++){
                var child = childArr[i];
                if(posNode.getName() == "right" || posNode.getName() == "left"){
                    if(i != 0){
                        child.loadTexture("playing/paohuzi/huxiBG.png");
                    }
                }else{
                    if(i != childArr.length-1){
                        child.loadTexture("playing/paohuzi/huxiBG.png");
                    }
                }
            }
        }
    }
    // if(weiIndex != -1){
    //     eatNode = posNode.getChildByName("eatNode");
    //     children = eatNode.children;
    //     var weiPos = 0;
    //     for(var k = weiIndex;k < children.length;k++){
    //         var childNode = children[k];
    //         var width = childNode.children[0].width;
    //         if (posNode.getName() == "right" || posNode.getName() == "xing"){
    //             width = -width;
    //         }
    //         var pos = childNode.getPosition();
    //         if(k == weiIndex){
    //             weiPos = pos;
    //         }
    //         childNode.setPosition(cc.p(pos.x + width,pos.y));
    //     }

    //     for(var i = 0;i < 3;i++){
    //         addEatCard_paohuzi(posNode,"mjwei",weiCard,off);
    //     }

    //     var weiParentNode = eatNode.getChildByName("mjwei");
    //     var childArr = weiParentNode.children;
    //     if(weiPos != 0){
    //         weiParentNode.setPosition(weiPos);
    //     }
        
    //     var skipPeng = pl.skipPeng;
    //     if(!skipPeng || skipPeng.indexOf(weiCard) < 0){
    //         callback(childArr);
    //     }else{
    //         for(var i = 0;i < childArr.length;i++){
    //             var child = childArr[i];
    //             if(i != childArr.length-1){
    //                 child.loadTexture("playing/paohuzi/huxiBG.png");
    //             }
    //         }
    //     }
    // }
};

PlayLayer_paohuzi_SR.prototype.ResetOtherCard = function(posNode,off){
    //添加吃、碰、跑、偎、提
    var sData = MjClient.data.sData;
    var tData = null;
    if(sData){
        tData = sData.tData;
    }

    var eatNode = posNode.getChildByName("eatNode");
    if(!eatNode){
        return;
    }
    eatNode.visible = true;

    var indexByXing = getXingPlayerIndex_paohuzi();
    var selfIsXing = (0 == indexByXing);
    if(selfIsXing && 0==off && MjClient.rePlayVideo != -1){
        off = getOffByXing_paohuzi(off);
    }

    var pl = getUIPlayer_paohuzi(off);
    if (!pl) return;
    cc.log("ResetOtherCard off:" + off + "------:" + posNode.getName());
    cc.log(pl.info.uid);
    var mjSortArr = pl.mjsort;
    if(mjSortArr && mjSortArr.length > 0){
        cc.log(mjSortArr);
        eatNode.removeAllChildren();
        var childArr = null;
        
        //提/偎牌的特殊处理
        var tData = MjClient.data.sData.tData;
        var selfIndex = tData.uids.indexOf(SelfUid());
        var callback = function(childList){
            for(var i = 0;i < childList.length;i++){
                var child = childList[i];
                if(pl.info.uid == SelfUid() || (tData.xingPlayer == selfIndex && tData.uids.indexOf(pl.info.uid) == tData.zhuang) || (tData && TableState.roundFinish == tData.tState)){
                    var shade = new cc.Sprite("playing/paohuzi/huxiBG1.png");
                    shade.opacity = 100;
                    shade.x = shade.width/2;
                    shade.y = shade.height/2;
                    child.addChild(shade);
                }else{
                    child.loadTexture("playing/paohuzi/huxiBG.png");
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
                    addEatCard_paohuzi(posNode,"mjgang1" + k,cardNum,off);
                }

                var tiParentNode = eatNode.getChildByName("mjgang1" + k);
                var childArr = tiParentNode.children;
                callback(childArr);
            }
            //偎
            if(name == "mjwei"){
                var cardNum = pl.mjwei[pos];
                for(var i = 0;i < 3;i++){
                    addEatCard_paohuzi(posNode,"mjwei" + k,cardNum,off);
                }

                var weiParentNode = eatNode.getChildByName("mjwei" + k);
                var childArr = weiParentNode.children;
                var skipPeng = pl.skipPeng;
                if(!skipPeng || skipPeng.indexOf(cardNum) < 0){
                    callback(childArr);
                }else{
                    for(var i = 0;i < childArr.length;i++){
                        var child = childArr[i];
                        if(posNode.getName() == "right" || posNode.getName() == "left"){
                            if(i != 0){
                                child.loadTexture("playing/paohuzi/huxiBG.png");
                            }
                        }else{
                            if(i != childArr.length-1){
                                child.loadTexture("playing/paohuzi/huxiBG.png");
                            }
                        }
                    }
                }
            }
            //跑
            if(name == "mjgang0"){
                var cardNum = pl.mjgang0[pos];
                for(var i = 0;i < 4;i++){
                    addEatCard_paohuzi(posNode,"mjgang0" + k,cardNum,off);
                }
            }
            //碰
            if(name == "mjpeng"){
                var cardNum = pl.mjpeng[pos];
                for(var i = 0;i < 3;i++){
                    addEatCard_paohuzi(posNode,"mjpeng" + k,cardNum,off);
                }
            }
            //吃
            if(name == "mjchi"){
                var mjchiCardArr = pl.mjchiCard;
                var chiCard = mjchiCardArr[pos];

                var eatCards = pl.mjchi[pos].eatCards;
                eatCards.splice(eatCards.indexOf(chiCard), 1);
                eatCards.push(chiCard);
                if(posNode.getName() == "down" || posNode.getName() == "xing"){
                    for(var i = 0;i < eatCards.length;i++){
                        addEatCard_paohuzi(posNode,"mjchi" + k,eatCards[i],off);
                    }
                }else{
                    for(var i = eatCards.length - 1;i >= 0;i--){
                        addEatCard_paohuzi(posNode,"mjchi" + k,eatCards[i],off);
                    }                    
                }
                var biCards = pl.mjchi[pos].biCards;
                if(biCards && biCards.length > 0){
                    for(var i = 0;i < biCards.length;i++){
                        var biArr = biCards[i];
                        biArr.splice(biArr.indexOf(chiCard), 1);
                        biArr.push(chiCard);
                        if(posNode.getName() == "down" || posNode.getName() == "xing"){
                            for(var m = 0;m < biArr.length;m++){
                                addEatCard_paohuzi(posNode,"mjbi" + k + i,biArr[m],off);
                            }
                        }else{
                            for(var m = biArr.length - 1;m >= 0;m--){
                                addEatCard_paohuzi(posNode,"mjbi" + k + i,biArr[m],off);
                            }                    
                        }
                    }        
                }

                var chiParentNode = eatNode.getChildByName("mjchi" + k);
                if(chiParentNode){
                    var childArr = chiParentNode.children;
                    if(posNode.getName() == "down" || posNode.getName() == "xing"){
                        for(var i = childArr.length - 1;i >= 0;i--){
                            if(childArr[i].tag == mjchiCardArr[pos]){
                                childArr[i].setColor(cc.color(170, 170, 170));
                                break;
                            }
                        } 
                    }else{
                        for(var i = 0;i < childArr.length;i++){
                            if(childArr[i].tag == mjchiCardArr[pos]){
                                childArr[i].setColor(cc.color(170, 170, 170));
                                break;
                            }
                        }                   
                    }  
                }

                if(biCards && biCards.length > 0){
                    for(var i = 0;i < biCards.length;i++){
                        var chiParentNode = eatNode.getChildByName("mjbi" + k + i);
                        if(chiParentNode){
                            var childArr = chiParentNode.children;
                            if(posNode.getName() == "down" || posNode.getName() == "xing"){
                                for(var m = childArr.length - 1;m >= 0;m--){
                                    if(childArr[m].tag == mjchiCardArr[pos]){
                                        childArr[m].setColor(cc.color(170, 170, 170));
                                        break;
                                    }
                                } 
                            }else{
                                for(var m = 0;m < childArr.length;m++){
                                    if(childArr[m].tag == mjchiCardArr[pos]){
                                        childArr[m].setColor(cc.color(170, 170, 170));
                                        break;
                                    }
                                }                   
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
    //    var outCard = getNewCard_paohuzi(pl.mjput[i], 2, off);
    //    if(posNode.getName() == "down"){
    //        outCard.anchorX = 1;
    //        outCard.anchorY = 0;
    //        outCard.x = outNode.width - childCount * outCard.width;
    //        outCard.y = 0;
    //    }else if(posNode.getName() == "right"){
    //        outCard.anchorX = 1;
    //        outCard.anchorY = 1;
    //        outCard.x = outNode.width - childCount * outCard.width;
    //        outCard.y = outNode.height;
    //    }else if(posNode.getName() == "left"){
    //        outCard.anchorX = 0;
    //        outCard.anchorY = 1;
    //        outCard.x = childCount * outCard.width;
    //        outCard.y = outNode.height;
    //    }
    //    outNode.addChild(outCard);
    //}
};

PlayLayer_paohuzi_SR.prototype.ResetPutCard = function(posNode,off){
    //添加打出的牌
    var pl = getUIPlayer_paohuzi(off);
    if (!pl) return;
    var outNode = posNode.getChildByName("outNode");
    if (!outNode) return;
    outNode.visible = true;
    outNode.removeAllChildren();
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var curUId = tData.uids[tData.curPlayer];
    for(var i = 0; i < pl.mjput.length; i++){
        if(curUId == pl.info.uid && i == pl.mjput.length - 1 && tData.currCard == pl.mjput[i]){
            continue;
        }
        var childCount = outNode.childrenCount;
        var outCard = getNewCard_paohuzi(pl.mjput[i], 2, off);
        if(posNode.getName() == "down"){
            outCard.anchorX = 1;
            outCard.anchorY = 0;
            outCard.x = outNode.width - childCount * outCard.width;
            outCard.y = 0;
        }else if(posNode.getName() == "right"){
            outCard.anchorX = 1;
            outCard.anchorY = 1;
            outCard.x = outNode.width - childCount * outCard.width;
            outCard.y = outNode.height;
        }else if(posNode.getName() == "left"){
            outCard.anchorX = 0;
            outCard.anchorY = 1;
            outCard.x = childCount * outCard.width;
            outCard.y = outNode.height;
        }
        outNode.addChild(outCard);
    }
};

//重置牌的顺序
PlayLayer_paohuzi_SR.prototype.CardLayoutRestore = function(posNode,off){
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
PlayLayer_paohuzi_SR.prototype.EatVisibleCheck = function(off){
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
    // if(pl.mjState == TableState.waitEat || pl.mjState == TableState.waitPut && tData.uids[tData.curPlayer] == SelfUid()){

    // }else{
    //     return;
    // }

    //自摸getUIPlayer_paohuzi
    if(tData.tState != TableState.roundFinish && pl.mjState != TableState.roundFinish){
        if(IsTurnToMe()){
            cc.log("自己===================eatFlag====================" + pl.eatFlag);
            //王炸
            if(pl.wangType == 4 && !pl.wangStatus && !(pl.eatFlag & 32)){
                vnode.push(eat.wangZha._node);
            }
            //王闯
            if(pl.wangType == 2 && !pl.wangStatus && !(pl.eatFlag & 32)){
                vnode.push(eat.wangChuang._node);
            }
            //王钓
            if(pl.wangType == 1 && !pl.wangStatus && !(pl.eatFlag & 32)){
                vnode.push(eat.wangDiao._node);
            }
            //提
            if(pl.eatFlag & 16){
                HZGangToServer_paohuzi(1);
                return;
            }
            //偎
            if(pl.eatFlag & 8){
                HZWeiToServer_paohuzi();
                return;
            }
            //胡
            if(pl.eatFlag & 32){
                if(pl.wangType !=0 && pl.wangStatus){
                    pl.wangType = 0;
                    MJHuToServer_paohuzi();
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
                    HZGangToServer_paohuzi(2);
                    return;
                }
            }
            //吃
            if(pl.eatFlag & 1){
                // var eatpos = mj.getChiCards(pl.mjhand, tData.lastPutCard);
                // MjClient.eatpos = eatpos;
                // if (eatpos.length > 0){
                    vnode.push(eat.chi._node);
                // }
            } 

            if(vnode.length > 0){
                vnode.push(eat.guo._node);
                isCheckedTing = false;
            }
        }
    // }
    //别人点
    // else if(tData.tState == TableState.waitEat){
        // cc.log("diao pao hu-=================================================");
        if(!IsTurnToMe()){
            cc.log("别人点===================eatFlag====================" + pl.eatFlag);
            //王炸
            if(pl.wangType == 4 && !pl.wangStatus){
                vnode.push(eat.wangZha._node);
            }
            //王闯
            if(pl.wangType == 2 && !pl.wangStatus){
                vnode.push(eat.wangChuang._node);
            }
            //王钓
            if(pl.wangType == 1 && !pl.wangStatus){
                vnode.push(eat.wangDiao._node);
            }
            //胡
            if(pl.eatFlag & 32){
                vnode.push(eat.hu._node);
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
                    HZGangToServer_paohuzi(2);
                    return;
                }
            }
            //碰
            if(pl.eatFlag & 2){
                vnode.push(eat.peng._node);
            }
            //吃
            if(pl.eatFlag & 1){
                // var eatpos = mj.getChiCards(pl.mjhand, tData.lastPutCard);
                // MjClient.eatpos = eatpos;
                // if (eatpos.length > 0){
                    vnode.push(eat.chi._node);
                // }
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
            setWgtLayout(vnode[i], [0, 0.20], [0.5, 0.18], [(1 - vnode.length) / 1.6+ i * 1.3 + moveOff_x, 1.8], false, false);
            if(vnode[i] == eat.hu._node){
                var x = MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ? 0.48 : 0.5; 
                setWgtLayout(vnode[i], [0, 0.25], [x, 0.10], [(1 - vnode.length) / 1.6+ i * 1.3 + moveOff_x, 1.8], false, false);
            }
        }
    }
};