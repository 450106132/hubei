var majiang_jsBind = {
    _event: {
        mjhand: function() {
            if(MjClient.endoneui && cc.sys.isObjectValid(MjClient.endoneui)){
                MjClient.endoneui.removeFromParent(true);
                MjClient.endoneui = null;
            }
            MjClient.playui.lastPutCardNode = null;
            ScanCheatLayer.showStartOnce();
        },
        LeaveGame: function() {
            MjClient.addHomeView();
            MjClient.playui.removeFromParent(true);
            delete MjClient.playui;
            delete MjClient.endoneui;
            delete MjClient.endallui;
            cc.audioEngine.stopAllEffects();
        },
        endRoom: function(msg) {
            if (msg.showEnd) {
                this.addChild(MjClient.playui.createGameOverPanel(),500);
            }else{
                MjClient.Scene.addChild(new StopRoomView());
            }
        },
        roundEnd: function() {
            MjClient.playui.handleRoundEnd();
            MjClient.playui.removePutCardTip();
        },
        initSceneData: function() {
            if(MjClient.rePlayVideo != -1) return; //回放的时候，不弹解散窗口
            var tData = MjClient.data.sData.tData;
            if(tData.delEnd != 0 && !MjClient.delroomui){
                MjClient.Scene.addChild(new RemoveRoomView());
                if (MjClient.webViewLayer != null){
                    MjClient.webViewLayer.close();
                }
            }else if(tData.delEnd == 0 && MjClient.delroomui){
                MjClient.delroomui.removeFromParent(true);
                delete MjClient.delroomui;
            }
            if(MjClient.gemewaitingui && cc.sys.isObjectValid(MjClient.gemewaitingui)){
                MjClient.gemewaitingui.removeFromParent(true);
                delete MjClient.gemewaitingui;
            }
            if(MjClient.playerChatLayer && cc.sys.isObjectValid(MjClient.playerChatLayer)){
                MjClient.playerChatLayer.removeFromParent(true);
                delete MjClient.playerChatLayer;
            }
            MjClient.playui.resetPlayerHeadLayout();
            MjClient.playui.updateGPSData();
        },
        moveHead: function() {
            // 移动头像前重置位置
            // MjClient.playui.resetPlayerHeadLayout();
            MjClient.playui.updateGPSData();
        },
        addPlayer:function () {
            MjClient.playui.updateGPSData();
        },
        logout: function() {
            if(!MjClient.playui || cc.sys.isObjectValid(MjClient.playui)){
                return;
            }

            MjClient.addHomeView();
            MjClient.playui.removeFromParent(true);
            delete MjClient.playui;
            delete MjClient.endoneui;
            delete MjClient.endallui;

        },
        changeMJBgEvent: function() {
            var nodeNameArr = MjClient.playui.NodeNameArray;
            for(var i = 0;i < nodeNameArr.length;i++){
                var nodeName  = nodeNameArr[i];
                var playerNode = MjClient.playui.getNodeByName(nodeName);
                MjClient.playui.updatePlayerCards(playerNode);
            }
            MjClient.playui.updateTingTips();
        },
        DelRoom: function() {
            var sData = MjClient.data.sData;
            if(sData.tData.delEnd != 0 && !MjClient.delroomui){
                MjClient.Scene.addChild(new RemoveRoomView());
                if (MjClient.webViewLayer != null){
                    MjClient.webViewLayer.close();
                }
            }else if(sData.tData.delEnd == 0 && MjClient.delroomui){
                MjClient.delroomui.removeFromParent(true);
                delete MjClient.delroomui;
            }
            if(MjClient.gemewaitingui && cc.sys.isObjectValid(MjClient.gemewaitingui)){
                MjClient.gemewaitingui.removeFromParent(true);
                delete MjClient.gemewaitingui;
            }
        },
        switch2Dor3D: function(){
            if(!MjClient.playui.isInGame()){
                return;
            }
            CommonPool.drainAllPools();
            // 重置头像位置
            MjClient.playui.resetPlayerHeadLayout(); 
        },
        loadOther:function(msg){
            var uids = msg.uids;
            for(var i = 0 ; i < uids.length;i++){
                var uid = uids[i];
                if(uid == MjClient.playui.getSelfUid()){
                    MjClient.showToast("等待其他玩家操作！！！");
                    MjClient.playui.updatePlayerEatBtn();
                }
            }
        },
        selectHandCard: function(selectedCard){
            MjClient.playui.updateColoeAfterSelectCard(selectedCard);
        },
        onlinePlayer: function(data){
            if(!data.isTrust){
                return;
            }
            var player = MjClient.playui.getPlayerInfoByName("node_down");
            if(player.info.uid != data.uid){
                return;
            }
            postEvent("clearCardUI");
            if(MjClient.endoneui && cc.sys.isObjectValid(MjClient.endoneui)){
                MjClient.endoneui.removeFromParent(true);
                MjClient.endoneui = null;
            }
            MjClient.playui.hideEatNodeChildren();
            var playerNodeArr = MjClient.playui.playerNodeArr;
            for (var k = 0; k < playerNodeArr.length; k++) {
                MjClient.playui.removeAllCards(playerNodeArr[k]);
            }
        },
        MJShuffle: function(eD){    //码牌
            if (MjClient.rePlayVideo != -1) return; // 回放时候不播

            MjClient.playui.shuffleList.push(eD.uid);
            MjClient.playui.playShuffleEffect();
        },
    }
};

/**
 *  游戏背景
 **/
majiang_jsBind.node_back = {
    node_backGround: {
        _layout:[[1, 1], [0.5, 0.5], [0, 0], true],
        _run: function(){
            MjClient.playui.changeGameBackGround(this);
        },
        _event: {
            changeGameBgEvent: function() {
                MjClient.playui.changeGameBackGround(this);
            }
        }
    },

    img_rightBottom: {
        _layout: [[0.1, 0.1], [0.97, 0.05], [0, 0]]
    },

    img_rightTop: {
        _layout: [[0.1, 0.1], [0.97, 0.95], [0, 0]]
    },

    img_leftTop: {
        _layout: [[0.1, 0.1], [0.03, 0.95], [0, 0]]
    },

    img_leftBottom: {
        _layout: [[0.1, 0.1], [0.03, 0.045], [0, 0]]
    }
};

/**
 *  游戏名
 **/
majiang_jsBind.img_gameName = {
    _layout: [[0.16, 0.16],[0.5, 0.62],[0, 1.2]],
    _run: function(){
        var tData = MjClient.data.sData.tData;
        this.loadTexture(GameBg[tData.gameType]);
    }
};

/**
 *  房间信息2D
 **/
majiang_jsBind.img_roomInfo2D = {
    _layout: [[0.5, 0.5], [0.5, 1], [0, 0]],
    _run: function() {
        this.visible = !MjClient.playui.is3DStyle();
    },
    text_gameName: {
        _run: function() {
            this.setString(GameCnName[MjClient.gameType]);
            this.ignoreContentAdaptWithSize(true);
        }
    },
    text_tableId: {
        _run: function() {
            this.setString(MjClient.data.sData.tData.tableid);
            this.ignoreContentAdaptWithSize(true);
        }
    },
    layout_timeBg: {
        _run: function() {
            var text = new ccui.Text();
            text.setFontName(MjClient.fzcyfont);
            text.setFontSize(18);
            text.setTextColor(cc.color(171,220,208,255));
            text.setAnchorPoint(0.5, 0.5);
            text.setPosition(20, 9);
            this.addChild(text);
            var that = this;
            var func = function(){ that.getSystemTime(text);};
            text.runAction(cc.repeatForever(cc.sequence(cc.callFunc(func), cc.delayTime(1))));
        },
        getSystemTime: function(text) {
            var time = MjClient.getCurrentTime();
            var timeArr = [this.formatTime(time[3], 2), this.formatTime(time[4], 2)];
            text.setString(timeArr.join(":"));
        },
        formatTime: function(num, length) {
            return (Array(length).join(0) + num).slice(-length);
        }
    },
    loadBar_power: {
        _run: function() {
            var callNative = MjClient.native.NativeBattery;
            this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callNative), cc.delayTime(30))));
        },
        _event: {
            nativePower: function(d) {
                this.setPercent(Number(d));
            }
        }
    },
    img_wifi: {
        _run: function() {
            var that = this;
            var callFunction = function(){
                var path = "playing/gameTable/";
                var ms = MjClient.reqPingPong / 1000.0;
                if (ms < 0.2) {
                    that.loadTexture(path + "WIFI_1.png");
                } else if (ms < 0.4) {
                    that.loadTexture(path + "WIFI_2.png");
                } else if (ms < 0.6) {
                    that.loadTexture(path + "WIFI_3.png");
                } else {
                    that.loadTexture(path + "WIFI_4.png");
                } 
            };
            this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callFunction), cc.delayTime(5))));
        }
    },
    node_hunPai:{
        _run: function(){
            this.visible = MjClient.playui.isHunCardShow();
        },
        img_hunIcon: {
            _visible: false
        },
        img_hunCard: {
            _run: function(){
                this.visible = MjClient.playui.isInGame();
            },
            _event: {
                mjhand: function(){
                    this.cardAction();
                },
                initSceneData: function(){
                    this.cardAction();
                },
                switch2Dor3D: function () {
                    this.cardAction();
                }
            },
            cardAction: function(){
                this.visible = false;
                var hunCard = MjClient.playui.getHunCard();
                if (hunCard <= 0 || !MjClient.playui.isInGame()){
                    return;
                }
                this.visible = true;
                this.tag = parseInt(hunCard);
                MjClient.playui.setCardSprite(this, parseInt(hunCard), true);
                this.runAction(cc.sequence(cc.delayTime(1), cc.spawn(cc.scaleTo(0.6,0.5))));
            }
        },
        img_hunBg: {
            _visible: false,
            img_light: {
                _run: function(){
                    this.runAction(cc.sequence(cc.fadeOut(1), cc.fadeIn(0.5)).repeatForever());
                }
            },
            _event: {
                mjhand: function(){
                    this.visible = this.lightAction();
                },
                initSceneData: function(){
                    this.visible = this.lightAction();
                }
            },
            lightAction: function(){
                var hunCard = MjClient.playui.getHunCard();
                if (hunCard <= 0 || !MjClient.playui.isInGame()){
                    return false;
                }
                return true;
            }
        }
    },
    _event: {
        switch2Dor3D: function(){
            this.visible = !MjClient.playui.is3DStyle();
        }
    }
};

/**
 *  房间信息3D
 **/
majiang_jsBind.img_roomInfo3D = {
    _layout: [[0.125, 0.125], [0.001, 0.996], [0, 0]],
    _run: function() {
        this.visible = MjClient.playui.is3DStyle();
        this.zIndex = 500;
    },
    text_gameName: {
        _run: function() {
            this.setString(GameCnName[MjClient.gameType]);
            this.ignoreContentAdaptWithSize(true);
        }
    },
    text_tableId: {
        _run: function() {
            this.setString(MjClient.data.sData.tData.tableid);
            this.ignoreContentAdaptWithSize(true);
        }
    },
    img_timeBg: {
        _run: function() {
            var text = new ccui.Text();
            text.setFontName(MjClient.fzcyfont);
            text.setFontSize(18);
            text.setTextColor(cc.color(171,220,208,255));
            text.setAnchorPoint(0.5, 0.5);
            text.setPosition(25, 13);
            this.addChild(text);
            var that = this;
            var func = function () { that.getSystemTime(text);};
            text.runAction(cc.repeatForever(cc.sequence(cc.callFunc(func), cc.delayTime(1))));
        },
        getSystemTime: function(text) {
            var time = MjClient.getCurrentTime();
            var timeArr = [this.formatTime(time[3], 2), this.formatTime(time[4], 2)];
            text.setString(timeArr.join(":"));
        },
        formatTime: function(num, length) {
            return (Array(length).join(0) + num).slice(-length);
        }
    },
    loadBar_power: {
        _run: function() {
            var callNative = MjClient.native.NativeBattery;
            this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callNative), cc.delayTime(30))));
        },
        _event: {
            nativePower: function(d) {
                this.setPercent(Number(d));
            }
        }
    },
    img_wifi: {
        _run: function() {
            var that = this;
            var callFunction = function(){
                var path = "playing/gameTable/WIFI3D/";
                var ms = MjClient.reqPingPong / 1000.0;
                if (ms < 0.2) {
                    that.loadTexture(path + "WIFI_1.png");
                } else if (ms < 0.4) {
                    that.loadTexture(path + "WIFI_2.png");
                } else if (ms < 0.6) {
                    that.loadTexture(path + "WIFI_3.png");
                } else {
                    that.loadTexture(path + "WIFI_4.png");
                } 
            };
            this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callFunction), cc.delayTime(5))));
        }
    },
    img_hunpaiBg: {
        _run: function() {
            this.visible = false;
        },
        _event: {
            clearCardUI: function() {
                this.visible = false;
            },
            initSceneData: function() {
                this.setBaiDaCard3D();
            },
            mjhand: function() {
                this.setBaiDaCard3D();
            },
            changeMJBgEvent: function() {
                this.setBaiDaCard3D();
            },
            switch2Dor3D: function() {
                this.setBaiDaCard3D();
            },
        },
        setBaiDaCard3D: function() {
            var isShowHunCard = MjClient.playui.isHunCardShow3D();
            var hunCard = MjClient.playui.getHunCard();
            if (!isShowHunCard || hunCard <= 0) {
                this.visible = false;
                return;
            }

            this.visible = true;
            var hunCardNode = this.getChildByName("img_hunCard");
            hunCardNode.tag = parseInt(hunCard);
            MjClient.playui.setCardSprite(hunCardNode, hunCard, true);
        }
    },
    _event: {
        switch2Dor3D: function(){
            this.visible = MjClient.playui.is3DStyle();
        }
    }
};

/**
 *  游戏局数和剩余牌数2D
 **/
majiang_jsBind.layout_roundInfo2D = {
    _run: function() {
        this.visible = !MjClient.playui.is3DStyle();
    },
    img_roundNum: {
        _layout: [[0.086, 0.042], [0.5, 0.5], [-1.4, 1.0]],
        _visible: true,
        text_roundNum: {
            _run: function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _event: {
                mjhand: function(){
                    this.setString(this.getRoundInfo());
                },
                initSceneData: function(){
                    this.setString(this.getRoundInfo());
                }
            },
            getRoundInfo: function(){
                var tData = MjClient.data.sData.tData;
                var extraNum = tData.extraNum ? tData.extraNum:0;
                if (tData) {
                    return "第" + (tData.roundAll - tData.roundNum + 1 + extraNum) + "/" + tData.roundAll + "局";
                }
                return "";
            }
        }
    },
    img_cardNum: {
        _layout: [[0.3, 0.042], [0.5, 0.5], [1.4, 1.0]],
        _visible: true,
        text_cardNum: {
            _run: function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _event: {
                waitPut: function() {
                    this.setString(this.getCardNum());
                },
                initSceneData: function(){
                    this.setString(this.getCardNum());
                },
                showAllCardNum: function () {
                    var tData = MjClient.data.sData.tData;
                    this.setString(MjClient.majiang.getAllCardsTotal(tData));
                }
            },
            getCardNum: function(){
                var tData = MjClient.data.sData.tData;
                if (tData) {
                    return MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext;
                }
                return 0;
            }
        }
    },
    _event: {
        switch2Dor3D: function(){
            this.visible = !MjClient.playui.is3DStyle();
        }
    }
};

/**
 *  游戏局数和剩余牌数3D
 **/
majiang_jsBind.layout_roundInfo3D = {
    _layout: [[0.09, 0.09], [0.8, 0.95], [0, 0]],
    _run: function() {
        this.visible = MjClient.playui.is3DStyle();
        this.zIndex = 100;
        if(MjClient.playui.isIPad()) {
            setWgtLayout(this, [0.07, 0.079], [0.84, 0.95], [0, 0]);
        }
    },
    image_cardNumBg: {
        text_surplus: {
            _run: function() {
                this.setString("剩余");
                this.ignoreContentAdaptWithSize(true);
            }
        },
        text_cardNum: {
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
            },
            _event: {
                waitPut: function() {
                    this.setString(this.getCardNum());
                },
                initSceneData: function() {
                    this.setString(this.getCardNum());
                },
                showAllCardNum: function () {
                    var tData = MjClient.data.sData.tData;
                    this.setString(MjClient.majiang.getAllCardsTotal(tData));
                }
            },
            getCardNum: function() {
                var tData = MjClient.data.sData.tData;
                if (tData) {
                    return MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext;
                }
                return 0;
            }
        }
    },
    image_roundBg: {
        text_roundTxt: {
            _run: function() {
                this.setString("局数");
                this.ignoreContentAdaptWithSize(true);
            }
        },
        text_roundNum: {
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
            },
            _event: {
                mjhand: function() {
                    this.setString(this.getRoundInfo());
                },
                initSceneData: function() {
                    this.setString(this.getRoundInfo());
                }
            },
            getRoundInfo: function() {
                var tData = MjClient.data.sData.tData;
                var extraNum = tData.extraNum ? tData.extraNum:0;
                if (tData) {
                    return (tData.roundAll - tData.roundNum + 1 + extraNum) + "/" + tData.roundAll;
                }
                return "";
            }
        }
    },
    _event: {
        switch2Dor3D: function(){
            this.visible = MjClient.playui.is3DStyle();
        }
    }
};

/**
 *  2D指示器
 **/
majiang_jsBind.img_arrow2DBackGround = {
    _layout: [[0.129, 0.229], [0.5, 0.5], [0, 0.25]],
    _run: function(){
        this.visible = MjClient.playui.isInGame() && !MjClient.playui.is3DStyle();
        MjClient.playui.updateArrowIconDirection(this);
        MjClient.playui.updateArrowRotation2D(this);
    },
    _event: {
        switch2Dor3D: function(data){
            //设置界面的事件
            this.visible = !data.is3D && MjClient.playui.isInGame();
            MjClient.playui.updateArrowRotation2D(this);
        },
        initSceneData: function(){
            this.visible = MjClient.playui.isInGame() && !MjClient.playui.is3DStyle();
            MjClient.playui.updateArrowIconDirection(this);
            MjClient.playui.updateArrowRotation2D(this);
        },
        mjhand:function(){
            this.visible = MjClient.playui.isInGame() && !MjClient.playui.is3DStyle();
            MjClient.playui.updateArrowRotation2D(this);
        },
        waitPut:function(){
            MjClient.playui.updateArrowRotation2D(this);
            MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
            MjClient.playui.playTimeUpEff = null;
        },
        MJPeng:function(){
            MjClient.playui.updateArrowRotation2D(this);
            MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
            MjClient.playui.playTimeUpEff = null;
        },
        MJChi:function(){
            MjClient.playui.updateArrowRotation2D(this);
            MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
            MjClient.playui.playTimeUpEff = null;
        },
        MJGang:function(){
            MjClient.playui.updateArrowRotation2D(this);
            MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
            MjClient.playui.playTimeUpEff = null;
        },
        MJPut:function(msg){
            if (msg.uid == MjClient.playui.getSelfUid()){
                MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
                MjClient.playui.playTimeUpEff = null;
            }
        },
        MJFlower:function(){
            MjClient.playui.updateArrowRotation2D(this);
        },
        roundEnd:function(){
            this.visible = MjClient.playui.isInGame() && !MjClient.playui.is3DStyle();
            MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
            MjClient.playui.playTimeUpEff = null;
        },
        LeaveGame:function(){
            MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
            MjClient.playui.playTimeUpEff = null;
        }
    },
    atlas_timeNum: {
        _run: function(){
            this.setString("00");
            this.ignoreContentAdaptWithSize(true);
        },
        _event: {
            waitPut:function(){
                this.stopAllActions();
                MjClient.playui.updateArrowNumber(this);
            },
            MJGang: function(){
                this.stopAllActions();
                MjClient.playui.updateArrowNumber(this);
            },
            MJPeng:function(){
                this.stopAllActions();
                MjClient.playui.updateArrowNumber(this);
            },
            MJChi:function(){
                this.stopAllActions();
                MjClient.playui.updateArrowNumber(this);
            },
            MJPut:function(msg){
                if (msg.uid == MjClient.playui.getSelfUid()){
                    this.stopAllActions();
                    this.setString("00");
                }
            },
            roundEnd:function(){
                this.stopAllActions();
            },
            LeaveGame:function(){
                this.stopAllActions();
            }
        }
    }
};

/**
 *  3D指示器
 **/
majiang_jsBind.img_arrow3DBackGround = {
    _layout: [[0.129, 0.229], [0.5, 0.5], [0, 0.25]],
    _run: function(){
        this.visible = MjClient.playui.isInGame() && MjClient.playui.is3DStyle();
        MjClient.playui.updateArrowIconDirection(this);
        MjClient.playui.updateArrowRotation3D(this);
    },
    _event: {
        switch2Dor3D: function(data){
            //设置界面的事件
            this.visible = data.is3D && MjClient.playui.isInGame();
            MjClient.playui.updateArrowRotation3D(this);
        },
        initSceneData: function(){
            this.visible = MjClient.playui.isInGame() && MjClient.playui.is3DStyle();
            MjClient.playui.updateArrowRotation3D(this);
        },
        mjhand:function(){
            this.visible = MjClient.playui.isInGame() && MjClient.playui.is3DStyle();
            MjClient.playui.updateArrowRotation3D(this);
        },
        waitPut:function(){
            MjClient.playui.updateArrowRotation3D(this);
            MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
            MjClient.playui.playTimeUpEff = null;
        },
        MJPeng:function(){
            MjClient.playui.updateArrowRotation3D(this);
            MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
            MjClient.playui.playTimeUpEff = null;
        },
        MJChi:function(){
            MjClient.playui.updateArrowRotation3D(this);
            MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
            MjClient.playui.playTimeUpEff = null;
        },
        MJGang:function(){
            MjClient.playui.updateArrowRotation3D(this);
        },
        MJPut:function(msg){
            if (msg.uid == MjClient.playui.getSelfUid()){
                MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
                MjClient.playui.playTimeUpEff = null;
            }
        },
        MJFlower:function(){
            MjClient.playui.updateArrowRotation3D(this);
        },
        roundEnd:function(){
            this.visible = MjClient.playui.isInGame() && !MjClient.playui.is3DStyle();
            MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
            MjClient.playui.playTimeUpEff = null;
        },
        LeaveGame:function(){
            MjClient.playui.stopEffect(MjClient.playui.playTimeUpEff);
            MjClient.playui.playTimeUpEff = null;
        }
    },
    atlas_timeNum: {
        _run: function(){
            this.setString("00");
            MjClient.playui.playTimeUpEff = null;
            this.ignoreContentAdaptWithSize(true);
        },
        _event: {
            waitPut:function(){
                this.stopAllActions();
                MjClient.playui.updateArrowNumber(this);
            },
            MJGang: function(){
                this.stopAllActions();
                MjClient.playui.updateArrowNumber(this);
            },
            MJPeng:function(){
                this.stopAllActions();
                MjClient.playui.updateArrowNumber(this);
            },
            MJChi:function(){
                this.stopAllActions();
                MjClient.playui.updateArrowNumber(this);
            },
            MJPut:function(msg){
                if (msg.uid == MjClient.playui.getSelfUid()){
                    this.stopAllActions();
                    this.setString("00");
                }
            },
            roundEnd:function(){
                this.stopAllActions();
            },
            LeaveGame:function(){
                this.stopAllActions();
            }
        }
    }
};

/**
 *  房间操作按钮
 **/
majiang_jsBind.node_wait = {
    //邀请
    btn_invite: {
        _layout: [[0.13, 0.13], [0.8, 0.28], [0, 0]],
        _visible: false,
        _click: function(){
            MjClient.playui.inviteFriends(2);
        },
        _event: {
            initSceneData: function(){
                this.visible = !MjClient.playui.isTableFull();
            },
            addPlayer: function(){
                this.visible = !MjClient.playui.isTableFull();
            },
            removePlayer: function(){
                this.visible = !MjClient.playui.isTableFull();
            }
        },        
    },
    //复制房间信息
    btn_copy: {
        _layout: [[0.16, 0.16], [0.8, 0.18], [0, 0]],
        _visible: false,
        _run: function(){
            this.ignoreContentAdaptWithSize(true);
            // var tempSize = getImageRealSize("playing/gameTable/fuzhi.png");
            // this.setContentSize(tempSize.w, tempSize.h);
        },
        _click: function(){
            MjClient.playui.inviteFriends(1);
        },
        _event: {
            // initSceneData: function(){
            //     this.visible = !MjClient.playui.isTableFull();
            // },
            // addPlayer: function(){
            //     this.visible = !MjClient.playui.isTableFull();
            // },
            // removePlayer: function(){
            //     this.visible = !MjClient.playui.isTableFull();
            // }
        }
    },
    //俱乐部邀请牌友
    btn_inviteClub: {
        _layout: [[0.13, 0.13], [0.8, 0.12], [0, 0]],
        _visible: false,
        _click: function(){
            var tData = MjClient.data.sData.tData;
            var clubInfoTable = getClubInfoInTable();
            MjClient.Scene.addChild(new FriendCard_yaoqingMember(clubInfoTable.clubId, tData.tableid, unescape(clubInfoTable.clubTitle)));
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Yaoqingpaiyou", {uid:SelfUid(), gameType:MjClient.gameType});
        },
        _event: {
            initSceneData: function(){
                if (!MjClient.data || !MjClient.data.sData || !MjClient.data.sData.tData || !getClubInfoInTable() || !MjClient.playui) {
                    return ;
                }
                this.visible = !MjClient.playui.isTableFull();
            },
            addPlayer: function(){
                if (!MjClient.data || !MjClient.data.sData || !MjClient.data.sData.tData || !getClubInfoInTable() || !MjClient.playui) {
                    return ;
                }

                this.visible = !MjClient.playui.isTableFull();
            },
            removePlayer: function(){
                if (!MjClient.data || !MjClient.data.sData || !MjClient.data.sData.tData || !getClubInfoInTable() || !MjClient.playui) {
                    return ;
                }
                
                this.visible = !MjClient.playui.isTableFull();
            }
        }
    },
    //准备按钮
    btn_ready: {
        _visible: false,
        _layout: [[0.16, 0], [0.5, 0.4], [0, 0]],
        _click: function(){
            var sendMsg = {
                uid: MjClient.playui.getSelfUid(),
                gameType:MjClient.gameType
            };
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zhunbei", sendMsg);
            MjClient.playui.sendPassToServer();
            this.visible = false;
        },
        _event: {
            initSceneData: function(){
                this.visible = this.isShowReady();
            },
            waitReady: function(){
                this.visible = true;
            },
            onlinePlayer: function(data){
                if(data.uid  == MjClient.playui.getSelfUid()){
                    this.visible = false;
                }
            },
            removePlayer: function(){
                this.visible = false;
            }
        },
        isShowReady: function(){
            if(!MjClient.playui.isTableFull()){
                return false;
            }
            var player = MjClient.playui.getPlayerInfoByOff();
            if(player && player.mjState == TableState.waitReady){
                return true;
            }
            return false;
        }
    },
    //解散房间
    btn_delete: {
        _visible: false,
        _run: function(){
            if (MjClient.playui.isIPhoneX()){
                setWgtLayout(this, [0.11, 0.11], [0.1, 0.45], [0, 0]);
            }else{
                setWgtLayout(this, [0.11, 0.11],[0.05, 0.45],[0, 0]);
            }            
        },
        _click: function(){
            var sendMsg = {
                uid: MjClient.playui.getSelfUid(),
                gameType:MjClient.gameType
            };
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Jiesanfangjian", sendMsg);
            MjClient.delRoom(true);
        },
        _event: {
            onlinePlayer: function(){
                var player = MjClient.playui.getPlayerInfoByOff();
                if(!player){
                    this.visible = false;
                }
                var tData = MjClient.data.sData.tData;
                this.visible = (player.mjState != TableState.isReady && tData.tState == TableState.waitReady);
            },
            mjhand: function(){
                this.visible = !this.getDeleteBtnStatus();
            },
            initSceneData: function(){
                //具体的实现看需求(有的需要在人满之后就要消失、有的需要在发牌之后才消失)
                this.visible = !this.getDeleteBtnStatus();
            },
            addPlayer: function(){
                this.visible = !this.getDeleteBtnStatus();
            },
            removePlayer: function(){
                this.visible = !this.getDeleteBtnStatus();
            }   
        },
        getDeleteBtnStatus: function(){
            return MjClient.playui.isBeganGame();
        },
    },
    //返回主界面
    btn_backHome: {
        _run: function(){
            if (MjClient.playui.isIPhoneX()){
                setWgtLayout(this, [0.11, 0.11], [0.1, 0.6], [0, 0]);
            }else{
                setWgtLayout(this, [0.11, 0.11], [0.05, 0.6], [0, 0]);
            }            
        },
        _visible: false,
        _click: function(btn) {
            var sendMsg = {
                uid: MjClient.playui.getSelfUid(),
                gameType:MjClient.gameType
            };
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Likaifangjian", sendMsg);

            var content = "确定要退出房间吗？";
            var tData = MjClient.data.sData.tData;
            if(tData.owner == MjClient.playui.getSelfUid()){
                content = "返回大厅房间仍然保留\n赶快去邀请好友吧";
            }
            MjClient.showMsg(content, function(){
                MjClient.leaveGame();
            }, function(){});
        },
        _event: {
            onlinePlayer: function(){
                var player = MjClient.playui.getPlayerInfoByOff();
                if(!player){
                    this.visible = false;
                }
                var tData = MjClient.data.sData.tData;
                this.visible = (player.mjState != TableState.isReady && tData.tState == TableState.waitReady);
            },
            mjhand: function(){
                this.visible = !this.getBackBtnStatus();
            },
            initSceneData: function(){
                //具体的实现看需求(有的需要在人满之后就要消失、有的需要在发牌之后才消失)
                this.visible = !this.getBackBtnStatus();
            },
            addPlayer: function(){
                this.visible = !this.getBackBtnStatus();
            },
            removePlayer: function(){
                this.visible = !this.getBackBtnStatus();
            }   
        },
        getBackBtnStatus: function(){
            return MjClient.playui.isBeganGame();
        },
    },
    btn_backClub: {
        _run: function(){
            if (MjClient.playui.isIPhoneX()){
                setWgtLayout(this, [0.11, 0.11], [0.1, 0.75], [0, 0]);
            }else{
                setWgtLayout(this, [0.11, 0.11], [0.05, 0.75], [0, 0]);
            }            
        },    
        _visible: false,
        _click: function(btn) {
            var sendMsg = {
                uid: MjClient.playui.getSelfUid(),
                gameType:MjClient.gameType
            };
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Likaifangjian", sendMsg);

            var sData = MjClient.data.sData;
            if(sData) {
                onClickBackHallBtn();
            }
        },
        _event: {
            mjhand: function(){
                this.visible = !this.getBackClubBtnStatus();
            },
            initSceneData: function(){
                //具体的实现看需求(有的需要在人满之后就要消失、有的需要在发牌之后才消失)
                this.visible = !this.getBackClubBtnStatus();
            },
            addPlayer: function(){
                this.visible = !this.getBackClubBtnStatus();
            },
            removePlayer: function(){
                this.visible = !this.getBackClubBtnStatus();
            }   
        },
        getBackClubBtnStatus: function(){
            return MjClient.playui.isTableFull() || MjClient.remoteCfg.guestLogin || !getClubInfoInTable();
        },    
    },
    btn_gps: {
        _layout: [[0.09, 0.09], [0.97, 0.0], [0, 3.7]],
        _run: function() {
            this.visible = MjClient.playui.getMaxPlayer() != 2;
        },
        _click: function() {
            if (MjClient.playui.getMaxPlayer() == 3) {
                MjClient.Scene.addChild(new showDistance3PlayerLayer());
            } else if (MjClient.playui.getMaxPlayer() == 4) {
                MjClient.Scene.addChild(new showDistanceLayer());
            }
        }
    },
    btn_chat: {
        _layout: [[0.09, 0.09], [0.97, 0.1], [0, 3.7]],
        _click: function() {
            var chatlayer = new ChatLayer();
            MjClient.Scene.addChild(chatlayer);
        }
    },
    btn_voice: {
        _layout: [[0.09, 0.09], [0.97, 0.2], [0, 3.7]],
        _run: function() {
            if(MjClient.isShenhe) {
                this.visible=false;
                return;
            }
            this.recordTime = null;
            this.recordLayer = null;
            this.recordMessage = {};
            MjClient.atRecord = false;
            MjClient.downAndPlayVoiceMessageQueue = [];
        },
        _touch: function(btn, eventType) {
            // 点击开始录音 松开结束录音,并且上传至服务器, 然后通知其他客户端去接受录音消息, 播放
            if (eventType == ccui.Widget.TOUCH_BEGAN) {
                this.startRecordVoice();
            } else if (eventType == ccui.Widget.TOUCH_ENDED) {
                this.endRecordVoice();
            } else if (eventType == ccui.Widget.TOUCH_CANCELED) {
                this.cancelRecordVoice();
            }
        },
        startRecordVoice: function(){
            var clubData = getClubInfoInTable();
            if(clubData && clubData.isForbVoice){
                return;
            }

            this.recordTime = new Date();
            MjClient.atRecord = true;
            MjClient.playui.pauseMusicAndAllEffects();
            MjClient.native.StartRecord(jsb.fileUtils.getWritablePath(), "recordFile" + SelfUid());
            if (!this.recordLayer){
                this.recordLayer = MjClient.playui.getVoiceLayer();
            }
            this.recordLayer.runStartRecord();       
        },
        endRecordVoice: function(){
            var clubData = getClubInfoInTable();
            if(clubData && clubData.isForbVoice){
                MjClient.showToast("盟主（会长）已禁用语音功能");
                return;
            }

            this.recordTime = (new Date().getTime()) - this.recordTime.getTime();
            MjClient.atRecord = false;
            MjClient.playui.resumeMusicAndAllEffects();

            if(this.recordTime > 1000){
                this.recordLayer.runStopRecord();
                MjClient.native.EndRecord("uploadRecord");
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fasongshishiyuyin", {uid: SelfUid()});
            }else{
                this.recordTime = 0;
                this.recordLayer.runShortRecord();
                MjClient.native.EndRecord("cancelRecord");
            }
        },
        cancelRecordVoice: function(){
            var clubData = getClubInfoInTable();
            if(clubData && clubData.isForbVoice){
                return;
            }

            this.recordTime = 0;
            MjClient.atRecord = false;
            MjClient.playui.resumeMusicAndAllEffects();
            MjClient.native.EndRecord("cancelRecord");
            this.recordLayer.runCancelRecord();
        },
        _event: {
            cancelRecord: function() {
                MjClient.native.HelloOC("cancelRecord !!!");
            },
            uploadRecord: function(filePath) {
                if (!filePath){
                    MjClient.native.HelloOC("No voice file update");
                    return;
                }
                MjClient.native.HelloOC("upload voice file");
                MjClient.native.UploadFile(filePath, MjClient.remoteCfg.voiceUrl, "sendVoice");
            },
            sendVoice: function(fullFilePath) {
                if (!fullFilePath) {
                    return;
                }

                var getFileName = /[^\/]+$/;
                var extensionName = getFileName.exec(fullFilePath);
                var fileName = extensionName[extensionName.length - 1];

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "downAndPlayVoice",
                    uid: SelfUid(),
                    type: 3,
                    msg: fileName,
                    num: this.recordTime//录音时长
                });
                MjClient.native.HelloOC("download file");
            },
            downAndPlayVoice: function(msg) {
                MjClient.native.HelloOC("downloadPlayVoice ok");
                MjClient.data._tempMessage = msg;
                MjClient.native.HelloOC("mas is" + JSON.stringify(msg));
                MjClient.playui.downAndPlayVoice(msg.uid, msg.msg);
            }
        }
    },
    btn_setting: {
        _layout: [[0.09, 0.09], [0.97, 0.92], [0, 0]],
        _click: function(){
            var settingLayer = MjClient.playui.createSettingView();
            settingLayer.setName("PlayLayerClick");
            MjClient.Scene.addChild(settingLayer);
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi", {uid:SelfUid(),gameType:MjClient.gameType});
        }
    },
    btn_gameRule: {
        _layout: [[0.09, 0.09], [0.91, 0.92], [0, 0]],
        _click: function(btn,et){
            btn.getChildByName("img_ruleBg").showAndConcealRuleInfo();
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Wanfa", {uid: SelfUid()});
        },
        _run: function() {
            var img_ruleBg = this.getChildByName("img_ruleBg");
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: false,
                onTouchBegan: function(touch, event) {
                    if (img_ruleBg.isVisible()) {
                        img_ruleBg.showAndConcealRuleInfo();
                        return true;
                    } else {
                        return false;
                    }
                },
            }, img_ruleBg);
        },
        img_ruleBg: {
            _visible: true,
            _run: function() {
                var that = this;
                that.runAction(cc.sequence(
                    cc.scaleTo(0.2, 1.7).easing(cc.easeBackOut()),
                    cc.delayTime(5),
                    cc.scaleTo(0.2, 0).easing(cc.easeBackIn()),
                    cc.callFunc(function(){
                        that.visible = false;
                    })
                ).repeat(1));
            },
            scrollView_ruleList: {
                _visible: true,
                _run: function() {
                    //处理规则，生成规则text，并保存在数组 ruleArr 中
                    var text_rule = this.getChildByName("text_rule");
                    var img_ruleBg = this.getParent();
                    var maxWidth = img_ruleBg.width;      //默认框宽度，超过则自动增长
                    var ruleGap = text_rule.height / 2;       //间隙宽度
                    var ruleInfo = MjClient.playui.getGameDesc().split(",");
		    
		    // 房卡房间的房间等级名称
                    var fangkaRoomLevelName = FriendCard_Common.getFangkaRoomLevelName();
                    if (fangkaRoomLevelName)
                        ruleInfo.push(fangkaRoomLevelName + "房间");
			
                    for (var i = 0; i < ruleInfo.length; i++) {
                        if (ruleInfo[i].length <= 12) {
                            continue;
                        }
                        var tempStr = ruleInfo[i];
                        ruleInfo[i] = tempStr.substr(0, 12);
                        ruleInfo.splice(i, 0, tempStr.substr(12));
                    }
                    var ruleInfoNum = ruleInfo.length;
                    var size = ruleInfoNum > 19 ? 14 : text_rule.getFontSize();
                    var ruleArr = [];
                    for (var i = 0; i < ruleInfo.length; i++) {
                        var text_ruleCopy = text_rule.clone();
                        text_ruleCopy.setFontSize(size);
                        text_ruleCopy.setVisible(true);
                        text_ruleCopy.ignoreContentAdaptWithSize(true);
                        text_ruleCopy.setString(ruleInfo[i]);  
                        ruleArr.push(text_ruleCopy);
                        maxWidth = text_ruleCopy.getContentSize().width > maxWidth ? text_ruleCopy.getContentSize().width : maxWidth;
                    }

                    //根据规则的最大尺寸调整规则背景尺寸
                    img_ruleBg.width = maxWidth * 1.05;
                    var innerHeight = text_ruleCopy.getContentSize().height * (ruleInfoNum + 1) * 1.25;
                    var maxHeight = text_rule.height * 24;
                    if (innerHeight < maxHeight) {
                        maxHeight = innerHeight;
                    }

                    img_ruleBg.height = maxHeight;

                    //根据规则的最大尺寸调整滑动容器尺寸
                    this.setScrollBarOpacity(0);
                    this.setPosition(img_ruleBg.width / 2, maxHeight - 16);
                    this.setContentSize(img_ruleBg.width, maxHeight - 16);
                    this.setInnerContainerSize(cc.size(img_ruleBg.width, innerHeight - 16));

                    //将生成的规则text添加到调整好尺寸的容器中
                    for (var i = 0; i < ruleArr.length; i++) {
                        ruleArr[i].x = this.width / 2;
                        ruleArr[i].y = ruleGap + ruleArr[i].getContentSize().height * i * 1.25;
                        this.addChild(ruleArr[i]);
                    }
                }
            },
            showAndConcealRuleInfo: function() {
                var that = this;
                if (this.visible) {
                    this.runAction(cc.sequence(
                        cc.scaleTo(0.2, 0).easing(cc.easeBackIn()),
                        cc.callFunc(function(){
                            that.visible = false;
                        })
                    ));
                } else {
                    this.runAction(cc.sequence(
                        cc.scaleTo(0.2, 1.7).easing(cc.easeBackOut()),
                        cc.callFunc(function() {
                            that.visible = true;
                        })
                    ));
                }
            }
        }
    },
    checkBox_autoPut: {
        _layout: [[0.1,0.1],[0.5,0.05],[0,0]],
        _visible: false,
        _run: function(){
            this.zIndex = 1000;
            this.addEventListener(function(sender,type){
                if(MjClient.movingCard && cc.sys.isObjectValid(MjClient.movingCard)){
                    return;
                }
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_zidongmoda_kai", {uid:SelfUid()});
                        MjClient.playui.sendAutoPutToServer(true);
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_zidongmoda_guan", {uid:SelfUid()});
                        MjClient.playui.sendAutoPutToServer(false);
                        break;
                }
            }, this);
        },
        _event: {
            initSceneData: function(){
                this.showAutoPut();
            },
            mjhand: function(){
                this.showAutoPut();
            },
            MJPut: function(msg){
                this.showAutoPut(msg);
            },
            MJChi: function(msg) {
                this.showAutoPut(msg);
            },
            MJPeng: function(msg) {
                this.showAutoPut(msg);
            },
            MJGang: function(msg) {
                this.showAutoPut(msg);
            },
            MJHu: function(msg) {
                this.showAutoPut(msg);
            },
            MJTing: function(msg){
                this.showAutoPut(msg);
            },
            MJPass: function(msg) {
                if (msg.touchCard && msg.uid == MjClient.playui.getSelfUid() && MjClient.playui.isTurnMe()) {
                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                    if(!player || !player.mjhand){
                        this.visible = false;
                        this.setSelected(false);
                        return;
                    }
                    var lastCard = player.mjhand[player.mjhand.length - 1];
                    MjClient.playui.sendPutToServer(lastCard);
                }
            },
            MJTouchPutCard:function(msg){
                if(msg.uid == MjClient.playui.getSelfUid()){
                    var player = MjClient.playui.getUIPlayerByUID(msg.uid);
                    this.setSelected(player.tPutCard);
                }
            },
            newCard: function(){
                var player = MjClient.playui.getPlayerInfoByName("node_down");
                this.setSelected(player.tPutCard);
            },
            roundEnd: function(){
                this.visible = false;
            }
        },
        showAutoPut: function(msg){
            if(!MjClient.playui.isCanAutoPut()){
                return;
            }
            if(!MjClient.playui.isInGame()){
                this.visible = false;
                return;
            }
            var player = MjClient.playui.getPlayerInfoByName("node_down");
            if(!player || !player.mjhand || player.isTing){
                this.visible = false;
                return;
            }
            if (msg && msg.uid != player.info.uid) {
                return;
            }
            var tingCards = {};
            if(player.mjhand.length % 3 == 1){
                var tData = MjClient.data.sData.tData;
                var handCards = player.mjhand.slice();
                tingCards = MjClient.majiang.calTingSet(handCards, tData.hunCard);  
            }
            if(player.tPutCard || Object.keys(tingCards).length > 0){
                this.visible = true;
            }else{
                this.visible = false;
            }
            this.setSelected(player.tPutCard);
        }
    }
};

/**
 *  down节点信息
 **/
majiang_jsBind.node_down = {
    layout_head: {
        _run: function(){
            this.visible = false; 
            this.zIndex = 1000;
            MjClient.playui.setInGameHeadLayout("node_down",this); 
        },
        _click: function(btn) {
            MjClient.playui.showPlayerInfo("node_down");
        },
        atlas_tuoGuanTime:{
            _run:function () {
                this.visible = false;
                this.ignoreContentAdaptWithSize(true);
            },
            _event:{
                trustTip:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_down");
                    if(!pl || pl.info.uid != msg.uid){
                        return;
                    }
                    
                    this.visible = true;
                    this.setString(msg.tipCountDown);
                    var tipCountDown = msg.tipCountDown;
                    var self = this;
                    this.schedule(function () {
                        self.setString(tipCountDown);
                        if (tipCountDown > 0) {
                            tipCountDown--;
                        }else {
                            self.setVisible(false);
                            self.unscheduleAllCallbacks();
                        }
                    }, 1, cc.REPEAT_FOREVER, 0);
                },
                MJPut:function (msg) {
                    this.visible = false;
                }
            }
        },
        img_tuoGuanIcon: {
            _run:function () {
                this.visible = false;
            },
            _event:{
                beTrust:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_down");
                    if (pl && pl.info.uid == msg.uid) {
                        this.visible = true;
                    }
                },
                cancelTrust:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_down");
                    if (pl && pl.info.uid == msg.uid) {
                        this.visible = false;
                    }
                },
                initSceneData:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_down");
                    if (pl && pl.trust){
                        this.visible = true;
                    }else {
                        this.visible = false;
                    }
                }
            }
        },
        img_zhuang: {
            _visible: false,
            _event: {
                mjhand: function() {
                    this.visible = MjClient.playui.getZhuangStatus("node_down");
                },
                initSceneData: function() {
                    this.visible = MjClient.playui.getZhuangStatus("node_down");
                }
            },
            img_count: {
                _visible: false,
                _event: {
                    mjhand: function() {
                        this.updateLinkCount();
                    },
                    initSceneData: function() {
                        this.updateLinkCount();
                    }                    
                },
                updateLinkCount: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                    this.visible = false;
                    if(!player){
                        return;
                    }
                    var path = "playing/gameTable/shuzi/shuzi_" + player.linkZhuang + ".png";
                    this.loadTexture(path);
                    this.setVisible(player.linkZhuang > 0);
                }
            }
        },
        img_offlineBg: {
            _visible: false,
        },
        img_voiceBg: {
            _visible: false,
            text_voiceContent: {
                _event: {
                    MJChat: function(msg) {
                        MjClient.playui.showUserChat(this, "node_down", msg);
                    },
                    playVoice: function(voicePath) {
                        MjClient.data._tempMessage.msg = voicePath;
                        MjClient.playui.showUserChat(this, "node_down", MjClient.data._tempMessage);
                    }
                }
            }
        },
        img_scoreBg: {
            _visible: true
        },
        atlas_score: {
            _visible: true,
            _event: {
                addPlayer: function(){
                    if(this.updateScore()){
                        this.visible = true;
                    }
                },
                removePlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                    if (!player) {
                        this.visible = false;
                        changeAtalsForLabel(this, "");
                    }
                },
                roundEnd: function(){
                    this.updateScore();
                },
                initSceneData: function(){
                    this.updateScore();
                },
                mjhand: function(){
                    this.updateScore();
                }
            },
            updateScore: function(){
                var player = MjClient.playui.getPlayerInfoByName("node_down");
                if (!player) {
                    return false;
                }

                changeAtalsForLabel(this, player.winall);
                return true;              
            },
        },
        img_nameBg: {
            _visible:true
        },
        text_name: {
            _visible: true,
            _run: function(){
                this.setString("");
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _event: {
                addPlayer: function(){
                    this.updateUserName();
                },
                removePlayer: function(){
                    this.updateUserName();
                },
                initSceneData: function(){
                    this.updateUserName();
                }
            },
            updateUserName: function(){
                var player = MjClient.playui.getPlayerInfoByName("node_down");
                if(!player){
                    this.setString("");
                    return;
                }
                this.ignoreContentAdaptWithSize(true);
                var formatName = MjClient.playui.formatUserName(unescape(player.info.nickname), 5, false);
                this.setString(formatName);  
                
            }
        },
        layout_flower: {
            _visible:false
        },
        img_tingCard: {
            _visible:false
        },
        img_tingIcon: {
            _visible:false,
            _event: {
                initSceneData: function(){
                    this.visible = false;
                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                    if (!MjClient.playui.isInGame() || !player) {
                        return;
                    }

                    if (player.isTing || player.isTianting) {
                        this.visible = true;
                    }
                },
                MJTing: function(msg){
                    var uid = msg.uid;
                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                    if (!player) {
                        return;
                    }

                    if (player.info.uid === uid && (player.isTing || player.isTianting)) {
                        //添加听的标志图片
                        this.visible = true;
                    }
                },
                roundEnd: function(){
                    this.visible = false;
                },
                mjhand: function(){
                    this.visible = false;
                }
            },
        },
        img_skipHuIcon: {
            _visible:false,
            _event: {
                newCard: function() {
                    this.resetSkilpHu();
                },
                roundEnd: function() {
                    this.resetSkilpHu();
                },
                initSceneData: function(){
                    this.setSkipHuStatus();
                },
                MJPut: function () {
                    this.setSkipHuStatus();
                },
                MJPass:function(){
                    this.setSkipHuStatus();
                }
            },
            resetSkilpHu:function(){
                this.visible = false;
                var pl = MjClient.playui.getPlayerInfoByName("node_down");
                pl.skipHu = null;                
            },
            setSkipHuStatus: function(){
                this.visible = false;
                var pl = MjClient.playui.getPlayerInfoByName("node_down");
                if (pl && pl.skipHu && MjClient.playui.isInGame()){
                    if ((cc.isArray(pl.skipHu) && pl.skipHu.length > 0) || !cc.isArray(pl.skipHu)){
                        this.visible = true;
                    }
                }
            }
        },
        img_skipPengIcon: {
            _visible:false,
            _event: {
                newCard: function() {
                    this.visible = false;
                    var pl = MjClient.playui.getPlayerInfoByName("node_down");
                    pl.skipPeng = null;
                },
                MJPeng: function(msg) {
                    if(msg.cpginfo.id == MjClient.playui.getSelfUid()){
                        var pl = MjClient.playui.getPlayerInfoByName("node_down");
                        pl.skipPeng = null;
                    }
                },
                roundEnd: function() {
                    this.visible = false;
                    var pl = MjClient.playui.getPlayerInfoByName("node_down");
                    pl.skipPeng = null;
                },
                initSceneData:function(){
                    this.visible = false;
                    var pl = MjClient.playui.getPlayerInfoByName("node_down");
                    if (pl && pl.skipPeng && pl.skipPeng.length > 0 && MjClient.playui.isInGame()) {
                        this.visible = true;
                    }
                },
                MJPass:function(){
                    var pl = MjClient.playui.getPlayerInfoByName("node_down");
                    if (pl.skipPeng) {
                        if (pl.skipPeng.length > 0) this.visible = true;
                    }
                }
            } 
        },
        text_piao: {
            //每个麻将的实现方式不一样，每个麻将按照下面的模板重写
            _visible: false,
            _event: {
                initSceneData: function(){
                    this.updatePiaoContent();
                },
                MJJiazhu: function(data){
                    this.updatePiaoContent(data);
                },
                mjhand: function(){
                    this.updatePiaoContent();
                },
                clearCardUI:function(){
                    this.visible = false;
                }
            },
            updatePiaoContent: function(data){
                if(!MjClient.playui.isShowPiao()) return;
                var player = MjClient.playui.getPlayerInfoByName("node_down");
                if(!player || !(player.hasOwnProperty("jiazhuNum")) || player.jiazhuNum < 0){
                    return;
                }
                
                this.visible = MjClient.playui.isShowTextPiao();
                var content = player.jiazhuNum == 0 ? "不飘" : "飘" + player.jiazhuNum;
                this.setString(content);
            }
        },
        _event: {
            moveHead: function() {
                var endPos = [0, 0]
                if (MjClient.playui.is3DStyle()) {
                    endPos = this.getUserData().endPos3D;
                } else {
                    endPos = this.getUserData().endPos;
                }
                this.runAction(cc.moveTo(0.3, endPos).easing(cc.easeCubicActionOut()));
            },
            addPlayer: function() {
                MjClient.playui.setWxHead(this);
                MjClient.playui.updateFangZhuIconStatus(this);
            },
            removePlayer: function() {
                MjClient.playui.setWxHead(this);
                MjClient.playui.updateFangZhuIconStatus(this);
            },
            initSceneData: function(){
                this.visible = true;
                MjClient.playui.setWxHead(this);
                MjClient.playui.updateFangZhuIconStatus(this);
                MjClient.playui.showJinBiAndJinBiIcon(this);
            }
        }
    },
    sprite_ready:{
        _layout: [[0.06, 0.06], [0.5, 0.5], [1.6 - 0.5, -2.5 - 1]],
        _event: {
            mjhand: function(){
                this.visible = false;
            },
            moveHead: function(){
                this.visible = false;
            },
            addPlayer: function(){
                this.visible = MjClient.playui.isReady("node_down");
            },
            removePlayer: function(){
                this.visible = MjClient.playui.isReady("node_down");
            },
            waitJiazhu: function(){
                this.visible = MjClient.playui.isReady("node_down");
            },
            onlinePlayer: function(){
                this.visible = MjClient.playui.isReady("node_down");
            },
            initSceneData: function(){
                this.visible = MjClient.playui.isReady("node_down");
            }
        }
    },
    img_eatFrontCard:{
        _run: function(){
            MjClient.playui.updateOtherCardSize(this);
        },
        _visible: false,
        _event: {
            switch2Dor3D: function(){
                MjClient.playui.updateOtherCardSize(this);
            }
        }
    },
    img_eatBackCard: {
        _layout: [[0.05, 0], [0, 0], [3.5, 1]],
        _visible: false
    },
    img_handCard: {
        _run: function(){
            MjClient.playui.updateHandCardSize(this);
        },
        _visible: false,
        _event: {
            switch2Dor3D: function(){
                MjClient.playui.updateHandCardSize(this);       
            }
        }
    },
    img_putCardOne: {
        _run: function(){
            MjClient.playui.updateOtherCardSize(this);
        },
        _visible: false,
        _event: {
            switch2Dor3D: function(){
                MjClient.playui.updateOtherCardSize(this);              
            }
        }
    },
    node_animation: {
        _visible: false,
        _run: function() {
            this.zIndex = 1000;
            this.setPositionX(cc.winSize.width * 0.5);
            this.setPositionY(cc.winSize.height * 0.25);
        },
        _event: {
            MJHu: function(data){
                var player = MjClient.playui.getPlayerInfoByName("node_down");
                if(player.info.uid != data.uid){
                    return;
                }
                MjClient.playui.showEatActionAnim(this.getParent(), MjClient.playui.AnimationType.HU);
            }
        }
    },
    img_tingCardsWithNum: {
        _layout: [[0.25, 0.12], [0.12, 0.25], [0,0.8]],
        _visible: false,
        _run: function() {
            this.zIndex = 500;
            var originalPosY = this.getPositionY();
            var originalHeight = this.getContentSize().height;
            var originalScale = this.getScale();
            this.setAnchorPoint(cc.p(0,0));
            var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
            if(tingLightBtn && cc.sys.isObjectValid(tingLightBtn)){
                if(MjClient.playui.isShowTingLight()){
                    var pos = this.getPosition();
                    var size = tingLightBtn.getContentSize();
                    this.setPosition(pos.x + size.width * tingLightBtn.scale, pos.y);
                }
            }else{
                this.setPositionY(originalPosY - originalHeight * originalScale /2 );
            }
        },
        img_tingCard: {
            _visible: false
        },
        _event: {
            roundEnd: function() {
                this.visible = false;
            },
            MJPut: function() {
                this.visible = false;
            },
            initSceneData: function(){
                this.visible = false; 
            },
            selectHandCard: function(selectCard){
                this.setTingCardsWithNum(selectCard.tag);
            },
            clickTingLight: function(){
                // this.setTingCardsWithNum();
                var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
                this.visible = tingLightBtn.isClick && MjClient.playui.isTurnMe();
            }
        },
        cleanTingCards: function(){
            var children = this.children;
            for(var i = 0;i < children.length;i++){
                var child = children[i];
                if(child && child.getName() == "tingCard"){
                    child.removeFromParent(true);
                }
            }
        },
        setTingCardsWithNum: function(cardTag){
            if(!MjClient.playui.isTurnMe()){
                this.visible = false;
                return;
            }

            var tingCards = MjClient.playui.getLimitTingCards(cardTag);
            var formatCards = MjClient.playui.removeLimitTingCards(tingCards);
            var keysArray = Object.keys(formatCards);
            if (keysArray.length == 0){
                this.visible = false;
                return;
            }

            var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
            if(tingLightBtn && cc.sys.isObjectValid(tingLightBtn)){
                //位置适配听牌灯泡的位置
                this.setPositionY(tingLightBtn.getPositionY() + tingLightBtn.getContentSize().height * tingLightBtn.getScale() * 0.1);
            }
            
            this.cleanTingCards();
            this.visible = true;
            var img_tingCard = this.getChildByName("img_tingCard");
            var boxSize = img_tingCard.getContentSize();
            var startPos = img_tingCard.getPosition();
            var col_max = 7, row = 0, col = 0, row_space = 3, col_space = 50;
            for (var i = 0; i < keysArray.length; i++) {
                col = i % col_max;
                row = Math.floor(i / col_max);

                var card = keysArray[i];
                var cardNode = util.clone(img_tingCard);
                cardNode.visible = true;
                cardNode.setPositionX(startPos.x + col * (boxSize.width * img_tingCard.scale + col_space));
                cardNode.setPositionY(startPos.y + row * (boxSize.height * img_tingCard.scale + row_space));
                cardNode.setName("tingCard");
                MjClient.playui.setTingCardSprite(cardNode, card);
                this.addChild(cardNode);

                var countLabel = cardNode.getChildByName("text_tingCardCount");
                countLabel.setString(tingCards[card]);
            }
            var factMaxCol = row > 0 ? col_max : col + 1;
            var layerHeight = boxSize.height * img_tingCard.scale * (row + 1) + row_space * (row + 4);
            var layerWidth = img_tingCard.x + boxSize.width * img_tingCard.scale * factMaxCol + factMaxCol* col_space;
            ccui.helper.seekWidgetByName(this,"img_tingIcon").setPositionY(layerHeight/2);
            this.setContentSize(layerWidth, layerHeight);
        }
    },
    img_tingCards: {
        _layout: [[0.25, 0.12], [0.2, 0.25], [0, 0.1]],
        _visible: false,
        _run: function() {
            this.zIndex = 500;
            if(MjClient.playui.isIPhoneX())
                setWgtLayout(this,[0.25, 0.12], [0.2, 0.25], [0, 0.2]);

            var originalPosY = this.getPositionY();
            var originalHeight = this.getContentSize().height;
            var originalScale = this.getScale();
            this.setAnchorPoint(cc.p(0,0));
            var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
            if(!tingLightBtn || !cc.sys.isObjectValid(tingLightBtn)){
                this.setPositionY(originalPosY - originalHeight * originalScale /2 );
            }
        },
        img_tingCard: {
            _visible: false
        },
        _event: {
            newCard: function(){
                var player = MjClient.playui.getPlayerInfoByOff();
                if(!player.isTing) this.visible = false;
            },
            roundEnd: function() {
                this.visible = false;
            },
            MJPut: function(data){
                if(data.uid == MjClient.playui.getSelfUid()){
                    this.setTingCards(data.card);
                }
            },
            showTingCards: function() {
                this.setTingCards();
            },
            MJSelect:function(){
                this.setTingCards(); //选了定缺后，需要重新刷一下听牌
            },
            selectHandCard: function(selectCard){
                if(MjClient.playui.isTurnMe()){
                    this.visible = false;
                    return;
                }
            },
            clickTingLight: function(){
                // this.setTingCards();
                var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
                this.visible = tingLightBtn.isClick && !MjClient.playui.isTurnMe();
            }
        },
        getTingDesc: function(lastTingNode){
            var player = MjClient.playui.getPlayerInfoByOff();
            if(!player.isTing || !lastTingNode){
                return;
            }
            var descLabel = new cc.LabelTTF("听牌自动摸打...", MjClient.fzcyfont, 25);
            descLabel.setColor(cc.color(255,220,74));
            descLabel.setAnchorPoint(0,0.5);
            descLabel.setPosition(lastTingNode.getContentSize().width ,lastTingNode.getContentSize().height / 2);
            lastTingNode.addChild(descLabel);
            return descLabel;
        },
        cleanTingCards: function(){
            var children = this.children;
            for(var i = 0;i < children.length;i++){
                var child = children[i];
                if(child && (child.getName() == "tingCard" || child.getName() == "tingAllCards")){
                    child.removeFromParent(true);
                }
            }
        },
        tingAllCards: function(){
            var allDescLabel = this.getChildByName("tingAllCards");
            if(allDescLabel){
                allDescLabel.visible = true;
                return;
            }

            allDescLabel = new cc.LabelTTF("听任意牌...", MjClient.fzcyfont, 25);
            allDescLabel.setColor(cc.color(255,220,74));
            allDescLabel.setAnchorPoint(0,0.5);
            var img_tingCard = this.getChildByName("img_tingCard");
            var size = img_tingCard.getContentSize();
            allDescLabel.setPosition(img_tingCard.getPosition().x + size.width / 2 ,size.height / 2);
            allDescLabel.setName("tingAllCards");
            this.addChild(allDescLabel);            
        },
        setTingCards: function(cardTag){
            var tingCards = MjClient.playui.getLimitTingCards(cardTag);
            var formatCards = MjClient.playui.removeLimitTingCards(tingCards);
            var keysArray = Object.keys(formatCards);
            var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
            
            if (keysArray.length == 0){
                if(tingLightBtn){
                    tingLightBtn.visible = false;
                }
                this.visible = false;
                return;
            }

            if(tingLightBtn && cc.sys.isObjectValid(tingLightBtn)){
                //位置适配听牌灯泡的位置
                this.setPositionY(tingLightBtn.getPositionY() + tingLightBtn.getContentSize().height * tingLightBtn.getScale() * 0.1);
            }
            
            if(MjClient.playui.isShowTingLight())
                tingLightBtn && (tingLightBtn.visible = true);
            this.visible = true;
            if(tingLightBtn && !tingLightBtn.isClick){
                this.visible = false;
            }
            this.cleanTingCards();
            if(MjClient.playui.isTingAllCards(tingCards)){
                this.tingAllCards();
                return;
            }
            var img_tingCard = this.getChildByName("img_tingCard");
            var startPos = img_tingCard.getPosition();
            var col_max = 17, row = 0, col = 0, row_space = 3;
            var lastTingNode = null;
            for(var i = 0;i < keysArray.length;i++){
                var card = keysArray[i];
                var cardNode = util.clone(img_tingCard);
                lastTingNode = cardNode;
                cardNode.visible = true;
                cardNode.setName("tingCard");
                cardNode.setPositionX(img_tingCard.x + col * img_tingCard.width * img_tingCard.scale);
                cardNode.setPositionY(img_tingCard.y + row * img_tingCard.height * img_tingCard.scale + row_space * row);
                MjClient.playui.setTingCardSprite(cardNode, card);
                this.addChild(cardNode);

                col++;
                row = Math.floor((i + 1) / col_max);
                col = col % col_max;
            }
            var factMaxCol = row > 0 ? col_max : col;
            var descLabel = this.getTingDesc(lastTingNode);
            var layerHeight = img_tingCard.height * (row + 1) + row_space * (row + 2);
            var layerWidth = img_tingCard.x + img_tingCard.width * (factMaxCol + 2);
            var addWidth = 0;
            if (descLabel){
                addWidth = row == 0 ? descLabel.width : (descLabel.width > (col_max - factMaxCol) * img_tingCard.width) ? 
                           descLabel.width : (col_max - factMaxCol) * img_tingCard.width;
            }
            ccui.helper.seekWidgetByName(this, "img_tingIcon").setPositionY(layerHeight/2);
            this.setContentSize(layerWidth + addWidth, layerHeight);
        }       
    },
    btn_tingLight: {
        //为了兼容之前的老版本，按钮是否显示通过img_tingCards控制
        _layout: [[0.09, 0.09], [0.12, 0.25], [0,-0.2]],
        _run: function(){
            this.zIndex = 501;
            this.isClick = true;
            if(MjClient.playui.isIPhoneX()){
                setWgtLayout(this, [0.09, 0.09], [0.12, 0.25], [0,0.34]);
            }
            var posY = this.getPositionY();
            var height = this.getContentSize().height * this.getScale();
            this.setAnchorPoint(cc.p(0,0));
            this.setPositionY(posY - height/2);
        },
        _click: function(sender, eventType){
            if(eventType === ccui.Widget.TOUCH_ENDED){
                sender.isClick = !sender.isClick;
                var tingCardsImg = sender.getParent().getChildByName("img_tingCards");
                tingCardsImg.visible = sender.isClick;
                postEvent(MjClient.playui.PlayEventType.CLICK_TING_LIGHT);
            }
        },
        _event:{
            clearCardUI:function(){
                this.visible = false;
            }
        }
    },
    _event: {
        switch2Dor3D: function(){
            if(!MjClient.playui.isInGame()){
                return;
            }
            MjClient.playui.updata2DTo3DData();
            MjClient.playui.updatePlayerCards(this);
            MjClient.playui.updateCardColorAfterTing();
            MjClient.playui.updateTingTips();
            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);
        },
        MJChat: function(data){
            MjClient.playui.checkDistanceOfPlayer(this, "node_down", data);
        },
        mjhand: function() {
            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
            player.isZiMo = false;
            MjClient.playui.initGameData();
            MjClient.playui.updatePlayerEatBtn();
            MjClient.playui.updatePlayerCards(this);
            MjClient.playui.searchAllTingCards();
            postEvent(MjClient.playui.PlayEventType.SHOW_TING_CARDS);
        },
        newCard: function(data) {
            var tData = MjClient.data.sData.tData;
            var playerNode = MjClient.playui.getNodeByName("node_down");

            var cardNode = MjClient.playui.createCard(playerNode, MjClient.playui.CsdDefaultCardType.HandCard, 
                        MjClient.playui.HandleCardType.Hand, data.newCard);
            cardNode.visible = false;
            MjClient.playui.searchAllTingCards();
            if(MjClient.movingCard && cc.sys.isObjectValid(MjClient.movingCard)){
                MjClient.movingCard = null;
            }
        },
        waitPut: function(data){
            var tData = MjClient.data.sData.tData;
            var player = MjClient.playui.getPlayerInfoByName("node_down");
            if(tData.uids[tData.curPlayer] == player.info.uid){
                MjClient.playui.updateColoeAfterSelectCard();
                MjClient.playui.resetCardLayout(this);
                MjClient.playui.updateTingTips();
                MjClient.playui.autoPutAfterTing();
            }
        },
        MJPut: function(data) {
            MjClient.playui.clickGangPass = false;
            MjClient.playui.clickTingPass = false;
            MjClient.playui.clickTing = false;
            MjClient.playui.dealPut(this, data);
            if(data.uid == MjClient.playui.getSelfUid()){
                MjClient.playui.checkHandCards(this);
                MjClient.playui.checkPutCards(this);
                MjClient.playui.updateTingTips();
            }
        },
        MJChi: function(data) {
            MjClient.playui.hasClickBtn = false;
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.CHI);
            MjClient.playui.searchAllTingCards();
            MjClient.playui.updateTingTips();
        },
        MJGang: function(data) {
            MjClient.playui.hasClickBtn = false;
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.GANG);
            MjClient.playui.searchAllTingCards();
            MjClient.playui.updateTingTips();
        },
        MJPeng: function(data) {
            MjClient.playui.hasClickBtn = false;
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.PENG);
            MjClient.playui.searchAllTingCards();
            MjClient.playui.updateTingTips();

        },
        MJPass: function(data){
            MjClient.playui.hasClickBtn = false;
            MjClient.playui.updateTingTips();
        },
        MJHu: function(data) {
            if(MjClient.playui.getSelfUid() == data.uid){
                MjClient.playui.hideEatNodeChildren();
            }
        },
        roundEnd: function(){
            MjClient.playui.updatePlayerEatBtn();
        },
        MJTing: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.TING);
            MjClient.playui.resetCardLayout(this);
            MjClient.playui.updateCardColorAfterTing();
        },
        initSceneData: function(){
            //一炮多响的倒牌
            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
            if(player.mjState != TableState.roundFinish){
                player.isZiMo = false;
            }
            //初始化所有数据
            MjClient.playui.initGameData();
            MjClient.playui.updatePlayerCards(this);
            MjClient.playui.updataClickCancelTingBtn();
            MjClient.playui.updateCardColorAfterTing(true);
            MjClient.playui.updatePlayerEatBtn();
            //听牌
            MjClient.playui.searchAllTingCards();
            postEvent(MjClient.playui.PlayEventType.SHOW_TING_CARDS);
            MjClient.playui.updateTingTips();

            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);
        },
        onlinePlayer: function(data){
            //清理手牌
            var tData = MjClient.data.sData.tData;
            var player = MjClient.playui.getPlayerInfoByOff();
            if(tData.tState == TableState.roundFinish && data.uid == player.info.uid &&
                (player.mjState == TableState.isReady || player.mjState == TableState.waitJiazhu))
            {
                MjClient.playui.removeAllCards(this);
                MjClient.playui.removePutCardTip();
            }
        }
    }
};

/**
 *  right节点信息
 **/
majiang_jsBind.node_right = {
    layout_head: {
        _run: function(){
            this.visible = false;
            this.zIndex = 1000;
            MjClient.playui.setInGameHeadLayout("node_right",this); 
        },
        _click: function(btn) {
            MjClient.playui.showPlayerInfo("node_right");
        },
        atlas_tuoGuanTime:{
            _run:function () {
                this.visible = false;
                this.ignoreContentAdaptWithSize(true);
            },
            _event:{
                trustTip:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_right");
                    if(!pl || pl.info.uid != msg.uid){
                        return;
                    }

                    this.visible = true;
                    this.setString(msg.tipCountDown);
                    var tipCountDown = msg.tipCountDown;
                    var self = this;
                    this.schedule(function () {
                        self.setString(tipCountDown);
                        if (tipCountDown > 0) {
                            tipCountDown--;
                        }else {
                            self.setVisible(false);
                            self.unscheduleAllCallbacks();
                        }
                    }, 1, cc.REPEAT_FOREVER, 0);
                },
                MJPut:function (msg) {
                    this.visible = false;
                }
            }
        },
        img_tuoGuanIcon: {
            _run:function () {
                this.visible = false;
            },
            _event:{
                beTrust:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_right");
                    if (pl && pl.info.uid == msg.uid) {
                        this.visible = true;
                    }
                },
                cancelTrust:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_right");
                    if (pl && pl.info.uid == msg.uid) {
                        this.visible = false;
                    }
                },
                initSceneData:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_right");
                    if (pl && pl.trust){
                        this.visible = true;
                    }else {
                        this.visible = false;
                    }
                }
            }
        },
        img_zhuang: {
            _visible: false,
            _event: {
                mjhand: function() {
                    this.visible = MjClient.playui.getZhuangStatus("node_right");
                },
                initSceneData: function() {
                    this.visible = MjClient.playui.getZhuangStatus("node_right");
                }
            },
            img_count: {
                _visible: false,
                _event: {
                    mjhand: function() {
                        this.updateLinkCount();
                    },
                    initSceneData: function() {
                        this.updateLinkCount();
                    }                    
                },
                updateLinkCount: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                    this.visible = false;
                    if(!player){
                        return;
                    }
                    var path = "playing/gameTable/shuzi/shuzi_" + player.linkZhuang + ".png";
                    this.loadTexture(path);
                    this.setVisible(player.linkZhuang > 0);
                }
            }
        },
        img_voiceBg: {
            _visible: false,
            text_voiceContent: {
                _event: {
                    MJChat: function(msg) {
                        MjClient.playui.showUserChat(this, "node_right", msg);
                    },
                    playVoice: function(voicePath) {
                        MjClient.data._tempMessage.msg = voicePath;
                        MjClient.playui.showUserChat(this, "node_right", MjClient.data._tempMessage);
                    }
                }
            }
        },
        img_offlineBg: {
            _visible: false,
            _event: {
                onlinePlayer: function(){
                    MjClient.playui.setUserOfflineInPlayGame(this, "node_right");
                },
                playerStatusChange: function(){
                    MjClient.playui.setUserOfflineInPlayGame(this, "node_right");
                },
                initSceneData: function(){
                    MjClient.playui.setUserOfflineInPlayGame(this, "node_right");
                }
            }
        },
        img_scoreBg:{
            _visible:false,
            _event: {
                addPlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                    this.visible = player ? true : false;
                },
                removePlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                    this.visible = player ? true : false;
                },
                initSceneData: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                    this.visible = player ? true : false;
                }
            }
        },
        atlas_score: {
            _visible: true,
            _run: function(){
                this.setString("");
            },
            _event: {
                addPlayer: function(){
                    if(this.updateScore()){
                        this.visible = true;
                    }
                },
                removePlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                    if (!player) {
                        this.visible = false;
                        changeAtalsForLabel(this, "");
                    }
                },
                roundEnd: function(){
                    this.updateScore();
                },
                initSceneData: function(){
                    this.updateScore();
                },
                mjhand: function(){
                    this.updateScore();
                }
            },
            updateScore: function(){
                var player = MjClient.playui.getPlayerInfoByName("node_right");
                if (!player) {
                    return false;
                }

                changeAtalsForLabel(this, player.winall);
                return true;              
            }
        },
        img_nameBg:{
            _visible:false,
            _event: {
                addPlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                    this.visible = player ? true : false;                    
                },
                removePlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                    this.visible = player ? true : false;
                },
                initSceneData: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                    this.visible = player ? true : false;
                }
            }
        },
        text_name: {
            _visible: true,
            _run: function(){
                this.setString("");
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _event: {
                addPlayer: function(){
                    this.updateUserName();
                },
                removePlayer: function(){
                    this.updateUserName();
                },
                initSceneData: function(){
                    this.updateUserName();
                }
            },
            updateUserName: function(){
                var player = MjClient.playui.getPlayerInfoByName("node_right");
                if(!player){
                    this.setString("");
                    return;
                }
                this.ignoreContentAdaptWithSize(true);
                var formatName = MjClient.playui.formatUserName(unescape(player.info.nickname), 5, false);
                this.setString(formatName); 
                              
            }
        },
        layout_flower: {
            _visible:false
        },
        img_tingCard: {
            _visible:false
        },
        img_tingIcon: {
            _visible:false,
            _event: {
                initSceneData: function(){
                    this.visible = false;
                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                    if (!MjClient.playui.isInGame() || !player) {
                        return;
                    }

                    if (player.isTing || player.isTianting) {
                        this.visible = true;
                    }
                },
                MJTing: function(msg){
                    var uid = msg.uid;
                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                    if (!player) {
                        return;
                    }

                    if (player.info.uid == uid && (player.isTing || player.isTianting)) {
                        //添加听的标志图片
                        this.visible = true;
                    }
                },
                roundEnd: function(){
                    this.visible = false;
                },
                mjhand: function(){
                    this.visible = false;
                }
            },
        },
        text_piao: {
            //每个麻将的实现方式不一样，每个麻将按照下面的模板重写
            _visible: false,
            _event: {
                initSceneData: function(){
                    this.updatePiaoContent();
                },
                MJJiazhu: function(data){
                    this.updatePiaoContent(data);
                },
                mjhand: function(){
                    this.updatePiaoContent();
                },
                clearCardUI:function(){
                    this.visible = false;
                }
            },
            updatePiaoContent: function(data){
                if(!MjClient.playui.isShowPiao()) return;
                var player = MjClient.playui.getPlayerInfoByName("node_right");
                if(!player || !(player.hasOwnProperty("jiazhuNum")) || player.jiazhuNum < 0){
                    return;
                }

                this.visible = MjClient.playui.isShowTextPiao();
                var content = player.jiazhuNum == 0 ? "不飘" : "飘" + player.jiazhuNum;
                this.setString(content);
            }
        },
        _event: {
            moveHead: function() {
                var endPos = [0, 0]
                if (MjClient.playui.is3DStyle()) {
                    endPos = this.getUserData().endPos3D;
                } else {
                    endPos = this.getUserData().endPos;
                }
                this.runAction(cc.moveTo(0.3, endPos).easing(cc.easeCubicActionOut()));
            },
            addPlayer: function() {
                MjClient.playui.setWxHead(this);
                MjClient.playui.updateFangZhuIconStatus(this);
            },
            removePlayer: function() {
                MjClient.playui.setWxHead(this);
                MjClient.playui.updateFangZhuIconStatus(this);
            },
            initSceneData: function(){
                this.visible = true;
                MjClient.playui.setWxHead(this);
                MjClient.playui.updateFangZhuIconStatus(this);
                MjClient.playui.showJinBiAndJinBiIcon(this);
            }
        },
    },
    sprite_ready:{
        _layout: [[0.06, 0.06], [0.5, 0.5], [1.6 - 0.5, 4]],
        _event: {
            mjhand: function(){
                this.visible = false;
            },
            moveHead: function(){
                this.visible = false;
            },
            addPlayer: function(){
                this.visible = MjClient.playui.isReady("node_right");
            },
            removePlayer: function(){
                this.visible = MjClient.playui.isReady("node_right");
            },
            waitJiazhu: function(){
                this.visible = MjClient.playui.isReady("node_right");
            },
            onlinePlayer: function(){
                this.visible = MjClient.playui.isReady("node_right");
            },
            initSceneData: function(){
                this.visible = MjClient.playui.isReady("node_right");
            }
        }
    },
    img_eatFrontCard:{
        _run:function(){
            setWgtLayout(this, [0, 0.058], [1, 0], [-3.5, 4]);
        },
        _visible: false,
    },
    img_eatBackCard: {
        _run: function(){
            setWgtLayout(this, [0, 0.058], [1, 0], [-3.5, 3.7]);
        },
        _visible: false
    },
    img_handCard: {
        _visible: false,
        _run: function(){
            if(MjClient.playui.isIPad())
                setWgtLayout(this, [0, 0.085], [1, 0], [-4.5, 3.5]);
            else
                setWgtLayout(this, [0, 0.1], [1, 0], [-5.5, 3]);

            this.setFlippedX(false);
            this.setFlippedY(false);
            this.setRotation(0);
            var is3D = MjClient.playui.is3DStyle();
            if(!is3D){
                this.setFlippedX(true);
            }
        },
        _event: {
            switch2Dor3D: function(data){
                var flipX = this.isFlippedX();
                var is3D = data.is3D;
                if((is3D && flipX) || (!is3D && !flipX)){
                    this.setFlippedX(!flipX);
                }
            }
        }
    },
    img_putCardOne: {
        _visible: false,
        _run: function(){
            MjClient.playui.updateOtherCardSize(this);
        },
        _event: {
            switch2Dor3D: function(){
                MjClient.playui.updateOtherCardSize(this);              
            }
        }
    },
    node_animation: {
        _visible: false,
        _run: function() {
            this.zIndex = 1000;
            this.setPositionX(cc.winSize.width * 0.75);
            this.setPositionY(cc.winSize.height * 0.5);
        },
        _event: {
            MJHu: function(data){
                var player = MjClient.playui.getPlayerInfoByName("node_right");
                if(player.info.uid != data.uid){
                    return;
                }
                MjClient.playui.showEatActionAnim(this.getParent(),MjClient.playui.AnimationType.HU);
            }
        }
    },
    _event: {
        switch2Dor3D: function(){
            if(!MjClient.playui.isInGame()){
                return;
            }
            MjClient.playui.updatePlayerCards(this);
            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);
        },
        mjhand: function() {
            MjClient.playui.updatePlayerCards(this);
        },
        waitPut: function(data){
            MjClient.playui.dealWaitPut(this, data);
        },
        MJPut: function(data) {
            MjClient.playui.dealPut(this, data);
        },
        MJChi: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.CHI);
        },
        MJGang: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.GANG);
        },
        MJPeng: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.PENG);
        },
        MJTing: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.TING);
        },
        MJHu: function(data) {

        },
        initSceneData: function(){
            MjClient.playui.updatePlayerCards(this);
            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);
        }
    }
};

/**
 *  top节点信息
 **/
majiang_jsBind.node_top = {
    layout_head: {
        _run: function(){
            this.visible = false;
            this.zIndex = 1000;
            MjClient.playui.setInGameHeadLayout("node_top",this); 
        },
        _click: function(btn) {
            MjClient.playui.showPlayerInfo("node_top");
        },
        atlas_tuoGuanTime:{
            _run:function () {
                this.visible = false;
                this.ignoreContentAdaptWithSize(true);
            },
            _event:{
                trustTip:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_top");
                    if(!pl || pl.info.uid != msg.uid){
                        return;
                    }

                    this.visible = true;
                    this.setString(msg.tipCountDown);
                    var tipCountDown = msg.tipCountDown;
                    var self = this;
                    this.schedule(function () {
                        self.setString(tipCountDown);
                        if (tipCountDown > 0) {
                            tipCountDown--;
                        }else {
                            self.setVisible(false);
                            self.unscheduleAllCallbacks();
                        }
                    }, 1, cc.REPEAT_FOREVER, 0);
                },
                MJPut:function (msg) {
                    this.visible = false;
                }
            }
        },
        img_tuoGuanIcon: {
            _run:function () {
                this.visible = false;
            },
            _event:{
                beTrust:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_top");
                    if (pl && pl.info.uid == msg.uid) {
                        this.visible = true;
                    }
                },
                cancelTrust:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_top");
                    if (pl && pl.info.uid == msg.uid) {
                        this.visible = false;
                    }
                },
                initSceneData:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_top");
                    if (pl && pl.trust){
                        this.visible = true;
                    }else {
                        this.visible = false;
                    }
                }
            }
        },
        img_zhuang: {
            _visible: false,
            _event: {
                mjhand: function() {
                    this.visible = MjClient.playui.getZhuangStatus("node_top");
                },
                initSceneData: function() {
                    this.visible = MjClient.playui.getZhuangStatus("node_top");
                }
            },
            img_count: {
                _visible: false,
                _event: {
                    mjhand: function() {
                        this.updateLinkCount();
                    },
                    initSceneData: function() {
                        this.updateLinkCount();
                    }                    
                },
                updateLinkCount: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                    this.visible = false;
                    if(!player){
                        return;
                    }
                    var path = "playing/gameTable/shuzi/shuzi_" + player.linkZhuang + ".png";
                    this.loadTexture(path);
                    this.setVisible(player.linkZhuang > 0);
                }
            }
        },
        img_voiceBg: {
            _visible: false,
            text_voiceContent: {
                _event: {
                    MJChat: function(msg) {
                        MjClient.playui.showUserChat(this, "node_top", msg);
                    },
                    playVoice: function(voicePath) {
                        MjClient.data._tempMessage.msg = voicePath;
                        MjClient.playui.showUserChat(this, "node_top", MjClient.data._tempMessage);
                    }
                }
            }
        },
        img_offlineBg: {
            _visible: false,
            _event: {
                onlinePlayer: function(){
                    MjClient.playui.setUserOfflineInPlayGame(this, "node_top");
                },
                playerStatusChange: function(){
                    MjClient.playui.setUserOfflineInPlayGame(this, "node_top");
                },
                initSceneData: function(){
                    MjClient.playui.setUserOfflineInPlayGame(this, "node_top");
                }
            }
        },
        img_scoreBg:{
            _visible:false,
            _event: {
                addPlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                    this.visible = player ? true : false;
                },
                removePlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                    this.visible = player ? true : false;
                },
                initSceneData: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                    this.visible = player ? true : false;
                }
            }
        },
        atlas_score: {
            _visible: true,
            _run: function(){
                this.setString("");
            },
            _event: {
                addPlayer: function(){
                    if(this.updateScore()){
                        this.visible = true;
                    }
                },
                removePlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                    if (!player) {
                        this.visible = false;
                        changeAtalsForLabel(this, "");
                    }
                },
                roundEnd: function(){
                    this.updateScore();
                },
                initSceneData: function(){
                    this.updateScore();
                },
                mjhand: function(){
                    this.updateScore();
                }
            },
            updateScore: function(){
                var player = MjClient.playui.getPlayerInfoByName("node_top");
                if (!player) {
                    return false;
                }

                changeAtalsForLabel(this, player.winall);
                return true;              
            }
        },
        img_nameBg: {
            _visible:false,
            _event: {
                addPlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                    this.visible = player ? true : false;                    
                },
                removePlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                    this.visible = player ? true : false;
                },
                initSceneData: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                    this.visible = player ? true : false;
                }
            }
        },
        text_name: {
            _visible: true,
            _run: function(){
                this.setString("");
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _event: {
                addPlayer: function(){
                    this.updateUserName();
                },
                removePlayer: function(){
                    this.updateUserName();
                },
                initSceneData: function(){
                    this.updateUserName();
                }
            },
            updateUserName: function(){
                var player = MjClient.playui.getPlayerInfoByName("node_top");
                if(!player){
                    this.setString("");
                    return;
                }
                this.ignoreContentAdaptWithSize(true);
                var formatName = MjClient.playui.formatUserName(unescape(player.info.nickname), 5, false);
                this.setString(formatName); 
                              
            }
        },
        layout_flower: {
            _visible:false
        },
        img_tingCard: {
            _visible:false
        },
        img_tingIcon: {
            _visible:false,
            _event: {
                initSceneData: function(){
                    this.visible = false;
                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                    if (!MjClient.playui.isInGame() || !player) {
                        return;
                    }

                    if (player.isTing || player.isTianting) {
                        this.visible = true;
                    }
                },
                MJTing: function(msg){
                    var uid = msg.uid;
                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                    if (!player) {
                        return;
                    }

                    if(player.info.uid == uid && (player.isTing || player.isTianting))
                    {
                        //添加听的标志图片
                        this.visible = true;
                    }
                },
                roundEnd: function(){
                    this.visible = false;
                },
                mjhand: function(){
                    this.visible = false;
                }
            },
        },
        text_piao: {
            //每个麻将的实现方式不一样，每个麻将按照下面的模板重写
            _visible: false,
            _event: {
                initSceneData: function(){
                    this.updatePiaoContent();
                },
                MJJiazhu: function(data){
                    this.updatePiaoContent(data);
                },
                mjhand: function(){
                    this.updatePiaoContent();
                },
                clearCardUI:function(){
                    this.visible = false;
                }
            },
            updatePiaoContent: function(data){
                if(!MjClient.playui.isShowPiao()) return;
                var player = MjClient.playui.getPlayerInfoByName("node_top");

                if(!player || !(player.hasOwnProperty("jiazhuNum")) || player.jiazhuNum < 0){
                    return;
                }
                                this.visible = MjClient.playui.isShowTextPiao();
                var content = player.jiazhuNum == 0 ? "不飘" : "飘" + player.jiazhuNum;
                this.setString(content);
            }
        },
        _event: {
            moveHead: function() {
                var endPos = [0, 0]
                if (MjClient.playui.is3DStyle()) {
                    endPos = this.getUserData().endPos3D;
                } else {
                    endPos = this.getUserData().endPos;
                }
                this.runAction(cc.moveTo(0.3, endPos).easing(cc.easeCubicActionOut()));
            },
            addPlayer: function() {
                MjClient.playui.setWxHead(this);
                MjClient.playui.updateFangZhuIconStatus(this);
            },
            removePlayer: function() {
                MjClient.playui.setWxHead(this);
                MjClient.playui.updateFangZhuIconStatus(this);
            },
            initSceneData: function(){
                this.visible = true;

                MjClient.playui.setWxHead(this);
                MjClient.playui.updateFangZhuIconStatus(this);
                MjClient.playui.showJinBiAndJinBiIcon(this);
            }
        },
    },
    sprite_ready:{
        _layout: [[0.06, 0.06], [0.5, 0.5], [-1.6 + 0.5, 4]],
        _event: {
            mjhand: function(){
                this.visible = false;
            },
            moveHead: function(){
                this.visible = false;
            },
            addPlayer: function(){
                this.visible = MjClient.playui.isReady("node_top");
            },
            removePlayer: function(){
                this.visible = MjClient.playui.isReady("node_top");
            },
            waitJiazhu: function(){
                this.visible = MjClient.playui.isReady("node_top");
            },
            onlinePlayer: function(){
                this.visible = MjClient.playui.isReady("node_top");
            },
            initSceneData: function(){
                this.visible = MjClient.playui.isReady("node_top");
            }
        }
    },
    img_eatFrontCard:{
        _run: function(){
            MjClient.playui.updateOtherCardSize(this);
        },
        _visible: false,
        _event: {
            switch2Dor3D: function(){
                MjClient.playui.updateOtherCardSize(this);
            }
        }
    },
    img_eatBackCard: {
        _layout: [[0, 0.08], [0.5, 1], [10, -1.4]],
        _visible: false
    },
    img_handCard: {
        _run: function(){
            MjClient.playui.updateHandCardSize(this);
        },
        _visible: false,
        _event: {
            switch2Dor3D: function(){
                MjClient.playui.updateHandCardSize(this);              
            }
        }
    },
    img_putCardOne: {
        _run: function(){
            MjClient.playui.updateOtherCardSize(this);
        },
        _visible: false,
        _event: {
            switch2Dor3D: function(){
                MjClient.playui.updateOtherCardSize(this);                
            }
        }
    },
    node_animation: {
        _visible: false,
        _run: function() {
            this.zIndex = 1000;
            this.setPositionX(cc.winSize.width * 0.5);
            this.setPositionY(cc.winSize.height * 0.75);
        },
        _event: {
            MJHu: function(data){
                var player = MjClient.playui.getPlayerInfoByName("node_top");
                if(player.info.uid != data.uid){
                    return;
                }
                MjClient.playui.showEatActionAnim(this.getParent(),MjClient.playui.AnimationType.HU);
            }
        }
    },
    _event: {
        switch2Dor3D: function(){
            if(!MjClient.playui.isInGame()){
                return;
            }
            MjClient.playui.updatePlayerCards(this);
            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);
        },
        mjhand: function() {
            MjClient.playui.updatePlayerCards(this);
        },
        waitPut: function(data){
            MjClient.playui.dealWaitPut(this, data);
        },
        MJPut: function(data) {
            MjClient.playui.dealPut(this, data);
        },
        MJChi: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.CHI);
        },
        MJGang: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.GANG);
        },
        MJPeng: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.PENG);
        },
        MJTing: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.TING);
        },
        MJHu: function(data) {

        },
        initSceneData: function(){
            MjClient.playui.updatePlayerCards(this);
            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);
        }
    }
};

/**
 *  left节点信息
 **/
majiang_jsBind.node_left = {
    layout_head: {
        _run: function(){
            this.visible = false;  
            this.zIndex = 1000;
            MjClient.playui.setInGameHeadLayout("node_left",this); 
        },
        _click: function(btn) {
            MjClient.playui.showPlayerInfo("node_left");
        },
        atlas_tuoGuanTime:{
            _run:function () {
                this.visible = false;
                this.ignoreContentAdaptWithSize(true);
            },
            _event:{
                trustTip:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_left");
                    if(!pl || pl.info.uid != msg.uid){
                        return;
                    }

                    this.visible = true;
                    this.setString(msg.tipCountDown);
                    var tipCountDown = msg.tipCountDown;
                    var self = this;
                    this.schedule(function () {
                        self.setString(tipCountDown);
                        if (tipCountDown > 0) {
                            tipCountDown--;
                        }else {
                            self.setVisible(false);
                            self.unscheduleAllCallbacks();
                        }
                    }, 1, cc.REPEAT_FOREVER, 0);
                },
                MJPut:function (msg) {
                    this.visible = false;
                }
            }
        },
        img_tuoGuanIcon: {
            _run:function () {
                this.visible = false;
            },
            _event:{
                beTrust:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_left");
                    if (pl && pl.info.uid == msg.uid) {
                        this.visible = true;
                    }
                },
                cancelTrust:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_left");
                    if (pl && pl.info.uid == msg.uid) {
                        this.visible = false;
                    }
                },
                initSceneData:function (msg) {
                    var pl = MjClient.playui.getPlayerInfoByName("node_left");
                    if (pl && pl.trust){
                        this.visible = true;
                    }else {
                        this.visible = false;
                    }
                }
            }
        },
        img_zhuang: {
            _visible: false,
            _event: {
                mjhand: function() {
                    this.visible = MjClient.playui.getZhuangStatus("node_left");
                },
                initSceneData: function() {
                    this.visible = MjClient.playui.getZhuangStatus("node_left");
                }
            },
            img_count: {
                _visible: false,
                _event: {
                    mjhand: function() {
                        this.updateLinkCount();
                    },
                    initSceneData: function() {
                        this.updateLinkCount();
                    }                    
                },
                updateLinkCount: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                    this.visible = false;
                    if(!player){
                        return;
                    }
                    var path = "playing/gameTable/shuzi/shuzi_" + player.linkZhuang + ".png";
                    this.loadTexture(path);
                    this.setVisible(player.linkZhuang > 0);
                }
            }
        },
        img_voiceBg: {
            _visible: false,
            text_voiceContent: {
                _event: {
                    MJChat: function(msg) {
                        MjClient.playui.showUserChat(this, "node_left", msg);
                    },
                    playVoice: function(voicePath) {
                        MjClient.data._tempMessage.msg = voicePath;
                        MjClient.playui.showUserChat(this, "node_left", MjClient.data._tempMessage);
                    }
                }
            }
        },
        img_offlineBg: {
            _visible: false,
            _event: {
                onlinePlayer: function(){
                    MjClient.playui.setUserOfflineInPlayGame(this, "node_left");
                },
                playerStatusChange: function(){
                    MjClient.playui.setUserOfflineInPlayGame(this, "node_left");
                },
                initSceneData: function(){
                    MjClient.playui.setUserOfflineInPlayGame(this, "node_left");
                }
            }
        },
        img_scoreBg:{
            _visible:false,
            _event: {
                addPlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                    this.visible = player ? true : false;
                },
                removePlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                    this.visible = player ? true : false;
                },
                initSceneData: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                    this.visible = player ? true : false;
                }
            }
        },
        atlas_score: {
            _visible: true,
            _run: function(){
                this.setString("");
            },
            _event: {
                addPlayer: function(){
                    if(this.updateScore()){
                        this.visible = true;
                    }
                },
                removePlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                    if (!player) {
                        this.visible = false;
                        changeAtalsForLabel(this, "");
                    }
                },
                roundEnd: function(){
                    this.updateScore();
                },
                initSceneData: function(){
                    this.updateScore();
                },
                mjhand: function(){
                    this.updateScore();
                }
            },
            updateScore: function(){
                var player = MjClient.playui.getPlayerInfoByName("node_left");
                if (!player) {
                    return false;
                }

                changeAtalsForLabel(this, player.winall);
                return true;              
            }
        },
        img_nameBg: {
            _visible:false,
            _event: {
                addPlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                    this.visible = player ? true : false;                    
                },
                removePlayer: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                    this.visible = player ? true : false;
                },
                initSceneData: function(){
                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                    this.visible = player ? true : false;
                }
            }
        },
        text_name: {
            _visible: true,
            _run: function(){
                this.setString("");
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _event: {
                addPlayer: function(){
                    this.updateUserName();
                },
                removePlayer: function(){
                    this.updateUserName();
                },
                initSceneData: function(){
                    this.updateUserName();
                }
            },
            updateUserName: function(){
                var player = MjClient.playui.getPlayerInfoByName("node_left");
                if(!player){
                    this.setString("");
                    return;
                }
                this.ignoreContentAdaptWithSize(true);
                var formatName = MjClient.playui.formatUserName(unescape(player.info.nickname), 5, false);
                this.setString(formatName);                
            }
        },
        layout_flower: {
            _visible:false
        },
        img_tingCard: {
            _visible:false
        },
        img_tingIcon: {
            _visible:false,
            _event: {
                initSceneData: function(){
                    this.visible = false;
                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                    if (!MjClient.playui.isInGame() || !player) {
                        return;
                    }

                    if (player.isTing || player.isTianting) {
                        this.visible = true;
                    }
                },
                MJTing: function(msg){
                    var uid = msg.uid;
                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                    if (!player) {
                        return;
                    }

                    if(player.info.uid == uid && (player.isTing || player.isTianting))
                    {
                        //添加听的标志图片
                        this.visible = true;
                    }
                },
                roundEnd: function(){
                    this.visible = false;
                },
                mjhand: function(){
                    this.visible = false;
                }
            },
        },
        text_piao: {
            //每个麻将的实现方式不一样，每个麻将按照下面的模板重写
            _visible: false,
            _event: {
                initSceneData: function(){
                    this.updatePiaoContent();
                },
                MJJiazhu: function(data){
                    this.updatePiaoContent(data);
                },
                mjhand: function(){
                    this.updatePiaoContent();
                },
                clearCardUI:function(){
                    this.visible = false;
                }
            },
            updatePiaoContent: function(data){
                if(!MjClient.playui.isShowPiao()) return;
                var player = MjClient.playui.getPlayerInfoByName("node_left");
                if(!player || !(player.hasOwnProperty("jiazhuNum")) || player.jiazhuNum < 0){
                    return;
                }

                this.visible = MjClient.playui.isShowTextPiao();
                var content = player.jiazhuNum == 0 ? "不飘" : "飘" + player.jiazhuNum;
                this.setString(content);
            }
        },
        _event: {
            moveHead: function() {
                var endPos = [0, 0]
                if (MjClient.playui.is3DStyle()) {
                    endPos = this.getUserData().endPos3D;
                } else {
                    endPos = this.getUserData().endPos;
                }
                this.runAction(cc.moveTo(0.3, endPos).easing(cc.easeCubicActionOut()));
            },
            addPlayer: function() {
                MjClient.playui.setWxHead(this);
                MjClient.playui.updateFangZhuIconStatus(this);
            },
            removePlayer: function() {
                MjClient.playui.setWxHead(this);
                MjClient.playui.updateFangZhuIconStatus(this);
            },
            initSceneData: function(){
                this.visible = true; 

                MjClient.playui.setWxHead(this);
                MjClient.playui.updateFangZhuIconStatus(this);
                MjClient.playui.showJinBiAndJinBiIcon(this);
            }
        },
    },
    sprite_ready:{
        _layout: [[0.06, 0.06], [0.5, 0.5], [-1.6 + 0.5, -2.5 - 1]],
        _event: {
            mjhand: function(){
                this.visible = false;
            },
            moveHead: function(){
                this.visible = false;
            },
            addPlayer: function(){
                this.visible = MjClient.playui.isReady("node_left");
            },
            removePlayer: function(){
                this.visible = MjClient.playui.isReady("node_left");
            },
            waitJiazhu: function(){
                this.visible = MjClient.playui.isReady("node_left");
            },
            onlinePlayer: function(){
                this.visible = MjClient.playui.isReady("node_left");
            },
            initSceneData: function(){
                this.visible = MjClient.playui.isReady("node_left");
            }
        }
    },
    img_eatFrontCard:{
        _visible: false,
        _run: function(){
            MjClient.playui.updateOtherCardSize(this);
        },
        _event: {
            switch2Dor3D: function(){
                MjClient.playui.updateOtherCardSize(this);
            }
        }
    },
    img_eatBackCard: {
        _layout: [[0, 0.058], [0, 1], [3.5, -0.5]],
        _visible: false
    },
    img_handCard: {
        _run:function(){
            if(MjClient.playui.isIPad())
                setWgtLayout(this, [0, 0.085], [0, 1], [5, -2.6]);
            else
                setWgtLayout(this, [0, 0.1], [0, 1], [6, -1.5]);
        },
        _visible: false
    },
    img_putCardOne: {
        _visible: false,
        _run: function(){
            MjClient.playui.updateOtherCardSize(this);
        },
        _event: {
            switch2Dor3D: function(){
                MjClient.playui.updateOtherCardSize(this);
            }
        }
    },
    node_animation: {
        _visible: false,
        _run: function() {
            this.zIndex = 1000;
            this.setPositionX(cc.winSize.width * 0.25);
            this.setPositionY(cc.winSize.height * 0.5);
        },
        _event: {
            MJHu: function(data){
                var player = MjClient.playui.getPlayerInfoByName("node_left");
                if(player.info.uid != data.uid){
                    return;
                }
                MjClient.playui.showEatActionAnim(this.getParent(),MjClient.playui.AnimationType.HU);
            }
        }
    },
    _event: {
        switch2Dor3D: function(){
            if(!MjClient.playui.isInGame()){
                return;
            }
            MjClient.playui.updatePlayerCards(this);
            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);
        },
        mjhand: function() {
            MjClient.playui.updatePlayerCards(this);
        },
        waitPut: function(data){
            MjClient.playui.dealWaitPut(this, data);
        },
        MJPut: function(data) {
            MjClient.playui.dealPut(this, data);
        },
        MJChi: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.CHI);
        },
        MJGang: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.GANG);
        },
        MJPeng: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.PENG);
        },
        MJTing: function(data) {
            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.TING);
        },
        MJHu: function(data) {

        },
        initSceneData: function(){
            MjClient.playui.updatePlayerCards(this);
            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);
        }
    }
};

/**
 *  eat节点信息
 **/
majiang_jsBind.node_eat = {
    btn_hu: {
        _visible: false,
        _touch: function(sender, eventType) {
            if(eventType == ccui.Widget.TOUCH_ENDED){
                MjClient.playui.hideEatNodeChildren();
                MjClient.playui.sendHuToServer();
            }
        }
    },
    btn_gang: {
        _visible: false,
        _touch: function(sender, eventType) {
            if(eventType == ccui.Widget.TOUCH_BEGAN){
                MjClient.playui.hasClickBtn = true;
            }
            if(eventType == ccui.Widget.TOUCH_CANCELED){
                MjClient.playui.hasClickBtn = false;
            }
            if(eventType == ccui.Widget.TOUCH_ENDED){
                if(sender.checkGang()){
                    return;
                }

                if(MjClient.playui.gangCardArray.length > 1){
                    var showCardsNode = MjClient.playui.jsBind.node_eat.node_showCards._node;
                    showCardsNode.getChildByName("img_showCardsBg").showGangCards();
                    return;
                }
                MjClient.playui.sendGangToServer(MjClient.playui.gangCardArray[0]);
                MjClient.playui.hideEatNodeChildren();
            }
        },
        checkGang: function(){
            return false;
        }       
    },
    btn_peng: {
        _visible: false,
        _touch: function(sender, eventType) {
            if(eventType == ccui.Widget.TOUCH_ENDED){
                if(sender.checkPeng()){
                    return;
                }
                MjClient.playui.sendPengToServer();
                MjClient.playui.hideEatNodeChildren();
            }
        },
        checkPeng: function(){
            return false;
        }
    },
    btn_chi: {
        _visible: false,
        _touch: function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                if(sender.checkChi()){
                    return;
                }

                if(MjClient.playui.eatCardArray.length > 1){
                    var showCardsNode = MjClient.playui.jsBind.node_eat.node_showCards._node;
                    showCardsNode.getChildByName("img_showCardsBg").showEatCards();
                    return;
                }
                MjClient.playui.sendChiToServer(MjClient.playui.eatCardArray[0]);
                MjClient.playui.hideEatNodeChildren();
            }
        },
        checkChi: function(){
            return false;
        }
    },
    btn_ting: {
        _visible: false,
        _touch: function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                MjClient.playui.clickTingBtn();
            }
        }
    },
    btn_guo: {
        _visible: false,
        _touch: function(sender, eventType) {
            if(eventType != ccui.Widget.TOUCH_ENDED){
                return;
            }
            MjClient.playui.clickPass();
        }
    },
    btn_cancel: {
        _visible: false,
        _layout: [[0.12, 0.12], [0.8, 0.32], [0, 0], true],
        _touch: function (sender, type) {
            if(type === 2){
                MjClient.playui.clickTing = false;
                MjClient.playui.updataClickCancelTingBtn();
                MjClient.playui.updatePlayerEatBtn();
            }
        },
    },
    node_showCards: {
        _visible: true,
        img_showCardsBg: {
            _layout: [[0.3, 0.3], [0.5, 0.3], [0, 0]],
            _event: {
                changeMJBgEvent: function(){
                    var children = this.children;
                    var mjBgType = MjClient.playui.getMaJiangBgType();
                    for(var i = 0;i < children.length;i++){
                        var child = children[i];
                        if(child.name == MjClient.playui.HandleCardType.Put){
                            MjClient.playui.updateAfterChangeMjBg(child, mjBgType, 0);
                        }
                    }                    
                }
            },
            img_card: {
                _visible: false
            },
            btn_pass:{
                _visible: false
            },
            btn_back: {
                _touch: function(sender, eventType){
                    if(eventType != ccui.Widget.TOUCH_ENDED){
                        return;
                    }
                    sender.getParent().visible = false;
                    MjClient.playui.hasClickBtn = false;
                    MjClient.playui.updatePlayerEatBtn();        
                }
            },
            updateSize: function(row, col){
                var templatCard = this.getChildByName("img_card");
                var factSize = this.getContentSize();
                var width = templatCard.width * templatCard.scale * col;
                var height = templatCard.height * templatCard.scale * row;
                width = width > factSize.width ? width : factSize.width;
                height = height > factSize.height ? height : factSize.height;
                this.setContentSize(width, height);
            },
            getStartPos: function(row, col){
                var templatCard = this.getChildByName("img_card");
                var factSize = this.getContentSize();
                var width = templatCard.width * templatCard.scale * col;
                var height = templatCard.height * templatCard.scale * row;
                var space_w = (factSize.width - width) / 2;
                var space_h = (factSize.height - height) / 2;
                var start_x = space_w + templatCard.width * templatCard.scale / 2;
                var start_y = space_h + templatCard.height * templatCard.scale / 2;
                return cc.p(start_x, start_y);
            },
            showCards: function(){
                var children = this.children;
                for(var i = 0;i < children.length;i++){
                    var child = children[i];
                    if(child.name == MjClient.playui.HandleCardType.Put){
                        child.removeFromParent(true);
                    }
                }
                MjClient.playui.hideEatNodeChildren();
                this.getParent().visible = true;
            },
            hideCards: function(){
                this.getParent().visible = false;
                MjClient.playui.updatePlayerEatBtn();
            },
            showEatCards: function(){
                this.showCards();
                this.visible = true;
                var cardArr = MjClient.playui.eatCardArray;
                this.updateSize(cardArr.length, 3);
                var startPos = this.getStartPos(cardArr.length, 3);
                var templatCard = this.getChildByName("img_card");
                var lastPutCard = MjClient.data.sData.tData.lastPutCard;
                var self = this;
                for(var i = 0;i < cardArr.length;i++){
                    for (var j = 0; j < 3; j ++){
                        var card = util.clone(templatCard);
                        if (cardArr[i] == j){
                            card.color = cc.color(255, 255, 0);
                        }
                        card.visible = true;
                        card.setName(MjClient.playui.HandleCardType.Put);
                        card.tag = lastPutCard - cardArr[i] + j;
                        var x = startPos.x + j * templatCard.width * templatCard.scale * 0.97;
                        var y = startPos.y + i * templatCard.height * templatCard.scale;
                        card.setPosition(cc.p(x, y));
                        this.addChild(card);
                        MjClient.playui.updateChiGangCards(card, card.tag);

                        card.addTouchEventListener(function(sender, eventType){
                            if(eventType == ccui.Widget.TOUCH_ENDED){
                                MjClient.playui.sendChiToServer(this);
                                MjClient.playui.hideEatNodeChildren();
                                self.visible = false;
                            }
                        }.bind(cardArr[i]), card);
                    }
                }
            },
            showGangCards: function(){
                this.showCards();
                this.visible = true;
                var cardArr = MjClient.playui.gangCardArray;
                this.updateSize(cardArr.length, 4);
                var startPos = this.getStartPos(cardArr.length, 4);
                var templatCard = this.getChildByName("img_card");
                var self = this;
                for(var i = 0;i < cardArr.length;i++){
                    for (var j = 0; j < 4; j ++){
                        var card = util.clone(templatCard);
                        card.visible = true;
                        card.setName(MjClient.playui.HandleCardType.Put);
                        card.tag = cardArr[i];
                        var x = startPos.x + j * templatCard.width * templatCard.scale * 0.97;
                        var y = startPos.y + i * templatCard.height * templatCard.scale;
                        card.setPosition(x, y);
                        this.addChild(card);
                        MjClient.playui.updateChiGangCards(card, cardArr[i]);

                        card.addTouchEventListener(function(sender, eventType){
                            if(eventType == ccui.Widget.TOUCH_BEGAN){
                                MjClient.playui.hasClickBtn = true;
                            }
                            if(eventType == ccui.Widget.TOUCH_CANCELED){
                                MjClient.playui.hasClickBtn = false;
                            }
                            if(eventType == ccui.Widget.TOUCH_ENDED){
                                MjClient.playui.sendGangToServer(sender.tag);
                                MjClient.playui.hideEatNodeChildren();
                                self.getParent().visible = false;
                            }
                        }, card);
                    }
                }
            }
        }
    },
    _event: {
        waitPut: function(){
            var tData = MjClient.data.sData.tData;
            var player = MjClient.playui.getPlayerInfoByName("node_down");
            if(tData.uids[tData.curPlayer] == player.info.uid){
                MjClient.playui.updatePlayerEatBtn();
            }
        },
        MJPut: function(){
            MjClient.playui.updatePlayerEatBtn();
        },
        MJChi: function(){
            MjClient.playui.updatePlayerEatBtn();
        },
        MJGang: function(){
            MjClient.playui.updatePlayerEatBtn();
        },
        MJPeng: function(){
            MjClient.playui.updatePlayerEatBtn();
        },
        MJPass: function(){
            var pl = MjClient.playui.getPlayerInfoByName("node_down");
            if(pl && pl.passHu && MjClient.playui.isNeedSkipHuTip() && MjClient.rePlayVideo != -1){
                MjClient.showToast("你选择了过，暂时放弃胡牌");
            }
            MjClient.playui.updatePlayerEatBtn();
        },
        switch2Dor3D: function(){
            if(!MjClient.playui.isInGame()){
                return;
            }
            MjClient.playui.updatePlayerEatBtn();
        },
        setEatBtnTeXiao: function(){
            MjClient.playui.updatePlayerEatBtn();
        }
    }
};
/**
* 托管节点
**/
majiang_jsBind.layout_tuoguan = {
    _layout:[
        [1, 0],
        [0.5, 0],
        [0, 0],
        true
    ],
    _run: function() {
        if (MjClient.playui.isIPad()) {
            this.height *= 1.4;
        }
        this.visible = false;
        if(this.getParent() != MjClient.playui.getChildByName("playui")){
            this.getParent().visible = false;
        }
    },
    btn_tuoguan:{
        _touch:function (btn, eT) {
            if (eT == 2) {
                MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "cancelTrust"},function (rtn) {
                    btn.getParent().setVisible(false);
                    var parent = btn.getParent();
                    if(parent.getParent() != MjClient.playui.getChildByName("playui")){
                        parent.getParent().setVisible(false);
                    }
                });
            }
        }
    },
    
    _event:{
        beTrust:function (msg) {
            var pl = MjClient.playui.getPlayerInfoByName("node_down");

            if(pl&&pl.info.uid == msg.uid){
                if(MjClient.movingCard && cc.sys.isObjectValid(MjClient.movingCard)){
                    MjClient.movingCard.setTouchEnabled(false);
                    MjClient.movingCard.setPosition(MjClient.playui.cardBeginPos)
                    MjClient.movingCard.setScale(MjClient.playui.cardBeginScale);
                    MjClient.movingCard.setLocalZOrder(MjClient.playui.cardBeginZIndex);
                    MjClient.movingCard.setTouchEnabled(true);
                    MjClient.playui.initCardTouchData();
                    MjClient.movingCard = null;
                }
                this.visible = true;
                if(this.getParent() != MjClient.playui.getChildByName("playui")){
                    this.getParent().setVisible(true);
                }
            }
        },
        cancelTrust:function (msg) {
            var pl = MjClient.playui.getPlayerInfoByName("node_down");
            if(pl&&pl.info.uid == msg.uid) {
                this.visible = false;
                if(this.getParent() != MjClient.playui.getChildByName("playui")){
                    this.getParent().setVisible(false);
                }
            }
        },
        initSceneData:function (msg) { 
            var pl = MjClient.playui.getPlayerInfoByName("node_down");
            if(pl&&pl.trust){
                this.visible = true;
                if(this.getParent() != MjClient.playui.getChildByName("playui")){
                    this.getParent().setVisible(true);
                }
            }else {
                this.visible = false;
                if(this.getParent() != MjClient.playui.getChildByName("playui")){
                    this.getParent().setVisible(false);
                }
            }
        },
        roundEnd: function(msg){
            var tData = MjClient.data.sData.tData;
            if(tData.roundNum <= 0 || MjClient.rePlayVideo != -1){
                this.visible = false;
                if(this.getParent() != MjClient.playui.getChildByName("playui")){
                    this.getParent().setVisible(false);
                }
            }
            
        }
    }
};

var majiang_panel = cc.Layer.extend({
    getJsBind: function(){
        return {};
    },

    ctor: function(subObj, jsonFile){
        this._super();
        cc.log("-------------------adolf majiang_pannel load json:", jsonFile);
        var playui = ccs.load(jsonFile);
        playui.node.setName("playui");
        this.addChild(playui.node);
        MjClient.playui = this;

        subObj.jsBind = subObj.prototype.getJsBind();
        util.assign(subObj.jsBind, majiang_jsBind); // 拷贝base jsBind
        this.jsBind = subObj.jsBind;

        MjClient.lastMJTick = Date.now();
        this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function() {
            if (MjClient.game_on_show) MjClient.tickGame(0);
        }), cc.delayTime(7))));


        if (MjClient.data.sData.tData.areaSelectMode["convertible"] && MjClient.rePlayVideo == -1) {
            addFreeNumberBtn();
        }
        return true;
    }
});

/**
 * 绑定PlayUI
 * 全部在子类调用(所有内容绑定完成之后在调用)
 */
majiang_panel.prototype.bindPlayUI = function(){
    var playuiNode = this.getChildByName("playui");
    var playerNodeArr = [];
    for(var k = 0;k < this.NodeNameArray.length;k++){
        playerNodeArr.push(playuiNode.getChildByName(this.NodeNameArray[k]));
    }
    this.playerNodeArr = playerNodeArr;

    for(var i = 0;i < this.DefaultNodeNameArray.length;i++){
        var initName = this.DefaultNodeNameArray[i];
        var nodeName = this.NodeNameArray.indexOf(initName);
        if(nodeName == -1){
            playuiNode.removeChildByName(this.DefaultNodeNameArray[i]);
            delete this.jsBind[this.DefaultNodeNameArray[i]];
        }
    }

    //历史遗留原因，在此处将托管层剥离成一个独立的layer
    var tuoGuanBindCp = {};
    util.assign(tuoGuanBindCp, this.jsBind.layout_tuoguan);
    delete this.jsBind["layout_tuoguan"];
    this.detachTuoGuanLayer(playuiNode.getChildByName("layout_tuoguan"), tuoGuanBindCp);

    util.bindUiAndLogicMajiang(playuiNode, this.jsBind);    
};

/**
 * 初始化游戏数据(其他界面用到的游戏数据尽量绑定到playui下面)
 * 全部在子类调用(所有内容绑定完成之后在调用)
 * return {void}
 **/
majiang_panel.prototype.initData = function(){
    this.initDirctionNode();
    this.initCardTouchData();
    this.initCardTypeName();
    this.initGameData();
    this.initAnimationType();
    this.initEventType();
    this.initSettingData();
};

/**
 *  初始化方位信息
 **/
majiang_panel.prototype.initDirctionNode = function(){
    var nodeNameArr = ["node_down", "node_right", "node_top", "node_left"];
    this.DefaultNodeNameArray = nodeNameArr;
    if(this.getMaxPlayer() == 3){
        nodeNameArr = ["node_down", "node_right", "node_left"];
    }else if (this.getMaxPlayer() == 2){
        nodeNameArr = ["node_down", "node_top"];
    }
    this.NodeNameArray = nodeNameArr;
};

/**
 *  初始化麻将点击数据
 **/
majiang_panel.prototype.initCardTouchData = function(){
    this.cardBeginPos = null;
    this.cardBeginScale = null;
    this.cardBeginZIndex = null;
    this.cardIsPut = false;
    this.cardValidMoved = false;
};

/**
 *  常量定义
 **/
majiang_panel.prototype.initCardTypeName = function(){
    var CsdDefaultCardType = {
        "HandCard"      : "img_handCard",               //手牌模板
        "PutCardOne"    : "img_putCardOne",             //打出的第一行牌的模板
        "EatCardBack"   : "img_eatBackCard",            //吃、碰、杠翻过来的牌的模板
        "EatCardFront"  : "img_eatFrontCard"            //吃、碰、杠牌的模板
    };
    this.CsdDefaultCardType = CsdDefaultCardType;

    var HandleCardType = {
        "Put"           : "put",                        //打出去的牌
        "Chi"           : "chi",                        //吃
        "Peng"          : "peng",                       //碰
        "Hand"          : "hand",                       //手牌
        "AnGang"        : "anGang",                     //暗杠
        "MingGang"      : "mingGang",                   //明杠
        "PengGang"      : "pengGang"                    //碰杠
    };
    this.HandleCardType = HandleCardType;
};

/**
 *  吃碰杠的动画类型
 **/
majiang_panel.prototype.initAnimationType = function(){
    var AnimationType = {
        "CHI"     : "chi",              //吃牌
        "PENG"    : "peng",             //碰牌
        "GANG"    : "gang",             //杠牌
        "HU"      : "hu",               //胡牌
        "ZIMO"    : "zimo",             //自摸胡牌
        "TING"    : "ting",             //听牌
        "KAIGANG" : "kaigang",          //杠牌
        "BU"      : "bu",               //杠牌
    };
    this.AnimationType = AnimationType;
};

/**
 * 牌局内的事件
 **/
majiang_panel.prototype.initEventType = function(){
    var eventType = {
        "SELECT_HAND_CARD"  : "selectHandCard",     //选中某张手牌
        "SHOW_TING_CARDS"   : "showTingCards",      //显示听牌
        "SET_EATBTN_TEXIAO" : "setEatBtnTeXiao",    //设置eat按钮特效显示
        "CLICK_TING_LIGHT"  : "clickTingLight",     //点击听牌灯牌
    };
    this.PlayEventType = eventType;
};

/**
 *  初始化游戏数据
 **/
majiang_panel.prototype.initGameData = function(){
    this.clickTing = false;
    this.gangCardArray = [];             //能杠的牌
    this.eatCardArray = [];              //能吃的牌
    this.playTimeUpEff = null;           //倒计时音效
    this.newCardNode  = null;
    this.clickGangPass = false;              //补杠、暗杠是否过杠
    this.clickTingPass = false;              //天听、是否过天听
    this.lastPutCardNode = null;            //上一家出的牌
    this.tingCardsArray = {};               //听牌数据
    this.hasClickBtn = false;               //是否点击操作按钮(补杠、暗杠时，不能点击出牌)
    this.shuffleList = [];                  //码牌的玩家ID列表
    MjClient.lastMJTick = 0;                //上一次的心跳时间
    MjClient.movingCard = null;
    MjClient.selectedCard = null;
};

/**
 *  初始化玩家牌局信息
 *
 **/
majiang_panel.prototype.updatePlayerCards = function (node){
    var player = this.getPlayerInfoByName(node.getName());
    if(!player){
        return;
    }

    this.removeAllCards(node);
    this.removePutCardTip();
    if (!this.isInGame()){
        return;
    }

    var i,j;
    //添加暗杠
    for(i = 0; i < player.mjgang1.length; i++){
        for(j = 0; j < 4; j++){
            this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.AnGang, player.mjgang1[i]);
        }
    }
    //添加明杠
    for(i = 0; i < player.mjgang0.length; i++){
        for(j = 0; j < 4; j++){
            this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.MingGang, player.mjgang0[i]);
        }
    }

    //添加碰杠
    if(player.mjgang2)
    {
        for(i = 0; i < player.mjgang2.length; i++){
            for(j = 0; j < 4; j++){
                this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.PengGang, player.mjgang2[i]);
            }
        }
    }

    //添加碰
    for(i = 0; i < player.mjpeng.length; i++){
        for(j = 0; j < 3; j++)        {
            this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Peng, player.mjpeng[i]);
        }
    }
    //吃
    for(i = 0; i < player.mjchi.length; i++){
        this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Chi, player.mjchi[i]);
    }
    //添加打出的牌
    for(i = 0; i < player.mjput.length; i++){
        this.createCard(node, this.CsdDefaultCardType.PutCardOne, this.HandleCardType.Put, player.mjput[i]);
    }
    //添加手牌
    if(MjClient.rePlayVideo == -1){
        if(player.mjhand && this.NodeNameArray.indexOf(node.getName()) == 0){
            for(i = 0; i < player.mjhand.length; i++){
                this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand, player.mjhand[i]);
            }
        }else{
            var CardCount = 0;
            var tData = MjClient.data.sData.tData;
            if(tData.tState == TableState.waitPut && tData.uids[tData.curPlayer] == player.info.uid){
                CardCount = 14;
            }else {
                CardCount = 13;
            }

            CardCount = CardCount - ((player.mjpeng.length + player.mjgang0.length + player.mjgang1.length) * 3 + player.mjchi.length);
            for(i = 0; i < CardCount; i++){
                this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand);
            }
        }
    }else if(player.mjhand){
        for (i = 0; i < player.mjhand.length; i++) {
            this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand, player.mjhand[i]);
        }
    }

    this.switchUpdate2DAnd3D(node);
};

majiang_panel.prototype.switchUpdate2DAnd3D = function(node){
    this.resetCardLayout(node);
    this.resetPutCards(node);
};

/**
 *  刷新玩家操作按钮
 **/
majiang_panel.prototype.updatePlayerEatBtn = function(){
    this.hideEatNodeChildren();
    
    var sData = MjClient.data.sData;
    var player = sData.players[this.getSelfUid()];

    if(!this.isTurnMe() && player.mjState != TableState.waitEat){
        return;
    }

    var eatNodeArr = this.getPlayerEatNode();
    var btnScale = this.isIPad() ? 0.12 : 0.18;
    // var spaceScale = this.isIPad() ? 1.4 : 1.5;
    var off_y = this.isIPad() ? 1.7 : 2.0;

    var bigWidth = 0;
    for(var i = 0;i < eatNodeArr.length;i++){ 
        var eatBtn = eatNodeArr[i];
        if(eatBtn.width * btnScale > bigWidth){
            bigWidth = eatBtn.width * btnScale;
        }
    }
    
    var space = MjClient.size.width / 10;
    var totalSpace = (eatNodeArr.length - 1) * space;
    var totaWidth = bigWidth * eatNodeArr.length + totalSpace;
    var firstPos_x = (MjClient.size.width - totaWidth) / 2;
    for(var k = 0;k < eatNodeArr.length;k++){
        var btn = eatNodeArr[k];
        btn.visible = true;
        var pct = (firstPos_x + k * (space + bigWidth)) / MjClient.size.width;
        setWgtLayout(btn, [0, btnScale], [pct, 0], [0, off_y], false, false);
    }
    MjClient.playui.addLightAniEatBtns(); // 设置麻将的吃碰杠按钮特效
    this.checkBtnWithPlayerFlag();
};

/**
 *  获得玩家可操作按钮
 **/
majiang_panel.prototype.getPlayerEatNode = function(){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var player = sData.players[this.getSelfUid()];
    var eat = MjClient.playui.jsBind.node_eat;
    var nodeArr = [];
    this.gangCardArray = [];
    if(this.isTurnMe()){
        //胡
        if (player.eatFlag & 8) {
            nodeArr.push(eat.btn_hu._node);
        }

        //杠
        if(this.checkGangBtn(player) && !this.clickGangPass){
            nodeArr.push(eat.btn_gang._node);
        }
    }else{
        if (player.eatFlag & 8) {
            nodeArr.push(eat.btn_hu._node);
        }
        if (player.eatFlag & 4) {
            nodeArr.push(eat.btn_gang._node);
            this.gangCardArray.push(tData.lastPutCard);
        }
        if (player.eatFlag & 2) {
            nodeArr.push(eat.btn_peng._node);
        }
        if (player.eatFlag & 1){
            nodeArr.push(eat.btn_chi._node);
            this.eatCardArray = MjClient.majiang.canChi(player.mjhand, tData.lastPutCard, tData.hunCard);
        }

    }

    if(nodeArr.length > 0){
        nodeArr.push(eat.btn_guo._node);
    }
    this.reloadBtnTexture(nodeArr);
    return nodeArr;
};

majiang_panel.prototype.reloadBtnTexture = function(showEatNodes) {
    if(showEatNodes.length == 0){
        return;
    }
    for (var i = 0; i < showEatNodes.length; i++) {
        var btnNode = showEatNodes[i];
        if(btnNode && cc.sys.isObjectValid(btnNode)) {
            var obj = btnNode.getNormalFile();
            if(obj && obj.file) {
                btnNode.loadTextureNormal(obj.file);
            }
        }
    }
};

/**
 *  检查杠的按钮
 **/
majiang_panel.prototype.checkGangBtn = function(player){
    var tData = MjClient.data.sData.tData;
    this.gangCardArray = player.gangList || [];
    if (this.gangCardArray.length > 0) {
        MjClient.majiang.gangWhenZimo(player.mjhand, this.gangCardArray, tData.hunCard);
        player.isCanGang = true;
        return true;
    }else{
        this.gangCardArray = MjClient.majiang.canGang1(player.mjpeng, player.mjhand, player.putCount);
        if(this.gangCardArray.length > 0){
            return true;
        }
    }
    return false;
};

//验证按钮显示与玩家eatFlag是否能对应上
majiang_panel.prototype.checkBtnWithPlayerFlag = function(){
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid() + ""];
    if(!pl){
        return;
    }
    var btnArray = [];
    if (pl.eatFlag & 1) {
        btnArray.push("btn_chi");
    }
    if (pl.eatFlag & 2) {
        btnArray.push("btn_peng");
    }
    if (pl.eatFlag & 8) {
        btnArray.push("btn_hu");
    }
    var eat = MjClient.playui.jsBind.node_eat;
    for(var i = 0;i < btnArray.length;i++){
        var btnName = btnArray[i];
        if(!eat[btnName]._node.visible){
            MjClient.gamenet.request("pkroom.handler.tableMsg", {
                cmd: "checkBtnWithFlag",
                mjState: pl.mjState,
                eatFlag: pl.eatFlag
            });   
            break;          
        }
    }
};

//码牌动画
majiang_panel.prototype.playShuffleEffect = function(){
    if(this.isPlayShuffle || this.shuffleList.length <= 0) {
        return;
    }
    this.isPlayShuffle = true;
    var shuffleNode = this.getShuffleEffectNode();
    this.jsBind._node.addChild(shuffleNode, 499);
};

//构造码牌动画层
majiang_panel.prototype.getShuffleEffectNode = function(){
    var self = this;
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uid = this.shuffleList[0];
    this.shuffleList.splice(0, 1);

    var layer = new majiang_mapai_Layer(MjClient.majiang.getAllCardsTotal(tData), sData.players[uid], function(){
        self.isPlayShuffle = false;
        self.playShuffleEffect();
    });

    return layer;
};

//剥离托管层
majiang_panel.prototype.detachTuoGuanLayer = function(node, jsBind){
    var tuoGuanLayer = new cc.Layer();
    tuoGuanLayer.setName("tuoGuanLayer");
    tuoGuanLayer.setLocalZOrder(100);
    node.removeFromParent(true);
    var listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function(){
            return tuoGuanLayer.isVisible();
        },
    });
    cc.eventManager.addListener(listener, tuoGuanLayer);
    tuoGuanLayer.addChild(node);


    var btnTuoGuan = node.getChildByName("btn_tuoguan");
    btnTuoGuan.removeFromParent(true);
    var file = btnTuoGuan.getVirtualRenderer().getTexture().getPath();
    var pos  = btnTuoGuan.getPosition();
    var scale = btnTuoGuan.getScale();
    var btn = new ccui.Button(file, "", "");
    btn.setName("btn_tuoguan");
    btn.setPosition(pos);
    btn.setScale(scale);
    node.addChild(btn);

    this.addChild(tuoGuanLayer);
    this.tuoGuanLayer = tuoGuanLayer;
    BindUiAndLogic(node, jsBind);
};

//获取托管层层级，用于将所有其他层放在托管层下面
majiang_panel.prototype.getTuoGuanLayerZIndex = function(node){
    return this.getChildByName("tuoGuanLayer").getLocalZOrder();
};
