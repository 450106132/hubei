
var GameOverLayer_PaoDeKuaiHBTY =  GameOverLayer_Poker.extend({
    ctor: function() {
        this._super();
    },


    getPlayInfo: function(){
        var str = "";
    
        // var sData=MjClient.data.sData;
        // var tData=sData.tData;
    
        // str += tData.areaSelectMode.fan == 0 ? "可反," : "不可反,";
        // str += tData.areaSelectMode.showHandCount ? "显示手牌数," : "";
        // str += tData.areaSelectMode.selectCardByPlayer ? "手动选择底牌," : "";
        // str += tData.areaSelectMode.singleJokerIsBomb ? "比牌时单王算炸弹," : "";
        // str += tData.areaSelectMode.hunShuiRule == 0 ? "门清玩法一," : "门清玩法二,";
        // str += tData.areaSelectMode.diFen ? "底分X" + tData.areaSelectMode.diFen + "," : "";
    
    
        return str;
    },
    
    setListInfo: function(node, _listInfo){
        var listView = node;
        var pl = _listInfo.pl;
        var winCount = _listInfo.winCount;
        var loseCount = _listInfo.loseCount;
        var loseScore = _listInfo.loseScore;
        var winScore = _listInfo.winScore;
    
        var infoAfy = [];
        infoAfy.push({title : "胜利次数：", value : winCount+ "" });
        infoAfy.push({title : "炸弹次数：", value : (pl.roomStatistics[1] > 0 ? pl.roomStatistics[1] + "" : "0")});
        infoAfy.push({title : "单局最高：", value : (pl.roomStatistics[2] > 0 ? pl.roomStatistics[2] + "" : "")});
        infoAfy.push({title : "被关春天：", value : (pl.roomStatistics[3] > 0 ? pl.roomStatistics[3] + "" : "0")});
        infoAfy.push({title : "扎鸟次数：", value : (pl.roomStatistics[4] > 0 ? pl.roomStatistics[4] + "" : "0")});

        for(var i = 0 ; i < infoAfy.length; i++)
        {
            listView.pushBackDefaultItem();
            var children = listView.children;
            var insertItem = children[children.length-1];
            insertItem.getChildByName("title").setString(infoAfy[i].title);
            var scoreLabel = insertItem.getChildByName("score");
            scoreLabel.ignoreContentAdaptWithSize(true);
            scoreLabel.setString(infoAfy[i].value);
        }
    },
    
});




var PlayLayer_PaoDeKuaiHBTY = PlayLayer_PaoDeKuaiTY.extend({
    getJsBind: function(){
        return {
            _event: {
                endRoom: function(msg) {
                    mylog(JSON.stringify(msg));
                    if (msg.showEnd) this.addChild(new GameOverLayer_PaoDeKuaiHBTY(),500);
                    else
                        MjClient.Scene.addChild(new StopRoomView());
                    //选择飘分时候解散房间，清除飘分选择页面
                    var layer = MjClient.playui.getChildByName("JiaZhu");
                    if (layer) { layer.removeFromParent();}

                    // 洗牌牌局未开始，解散房间需提示金额返还
                    if (!msg.showEnd) {
                        return;
                    }

                    var mySelf = getUIPlayer(0);
                    if (mySelf.shuffled && mySelf.shuffled > 0)
                        MjClient.showToast("因牌局解散，系统已返还洗牌费用");
                    
                },
                roundEnd: function() {
                    MjClient.selectTipCardsArray = null;

                    var self = this;
                    function delayExe()
                    {
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;

                        if(tData.tState && tData.tState !=TableState.roundFinish){
                            return 
                        }
                        
                        //resetEatActionAnim();
                        if(MjClient.isInGoldFieldNormal()){//金币场普通场
                            self.addChild(new GoldEndOneLayer_PDK(),500);
                            if(cc.sys.isObjectValid(MjClient.ActiveGoldPlayingLayer)
                                && MjClient.ActiveGoldPlayingLayer.btn_hongbao.truePosition){
                                MjClient.playui.setHongBaoPos(MjClient.ActiveGoldPlayingLayer.btn_hongbao)
                            }
                        }else if(MjClient.isInGoldFieldQuick()){//金币场快速赛
                            if (sData.tData.roundNum <= 0) {//全部打完
                                self.addChild(new GoldMatchOverLayer(), 500);
                            }else{
                                //self.showGetScoreAni_filedQuick();
                                for (var off = 0; off <= 2; off++) {
                                    MjClient.playui.showGetScoreAni_filedQuick(off);
                                }
                            }
                        }else{//普通约牌局
                            if (sData.tData.roundNum <= 0) {
                                if(!tData.matchId) {
                                    self.addChild(new GameOverLayer_PaoDeKuaiHBTY(), 500);
                                }else {
                                    self.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                                        self.addChild(new GameOverLayer_PaoDeKuaiHBTY(),500);
                                    })))
                                }
                            }

                            if (tData.tState && tData.tState ==TableState.roundFinish){
                                
                                if(self.getChildByTag(650)){
                                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ){
                                        var _lay = self.getChildByTag(650);
                                        if(_lay){
                                            _lay.removeFromParent(true);
                                            _lay = null;
                                        }
                                    }
                                }

                                self.addChild(MjClient.playui.GetEndOneViewObj(),500, 650);
                            }
                            
                        }
                    }
                    var _needShow = false;
                    if( !MjClient.isInGoldFieldNormal() && !MjClient.isInGoldFieldQuick() 
                        && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) ){
                        _needShow = true;
                    }

                    // 金币场普通场需要展示其他玩家剩余手牌
                    if ( (_needShow || MjClient.isInGoldFieldNormal()) && MjClient.rePlayVideo == -1) {
                        this.runAction(cc.sequence(cc.DelayTime(0.6), cc.callFunc(function(){
                            for (var off = 0; off <= 2; off++) {
                                MjClient.playui.cardLayoutRestore_endfiled(off);
                            }
                        })));
                    }
                    //金币场快速赛 清除牌桌已出的牌 并且添加得分动画
                    if (MjClient.isInGoldFieldQuick() && MjClient.rePlayVideo == -1) {
                        MjClient.playui._btn_tuoguan.visible = false;
                        this.runAction(cc.sequence(cc.DelayTime(1), cc.callFunc(function(){
                            for (var off = 0; off <= 2; off++) {
                                MjClient.playui.cardLayoutRestore_endfiledQuick(off);
                            }
                            //添加动画
                        })));
                    }

                    var time = MjClient.isInGoldFieldNormal() ? 2 : 1;//金币场需要延迟2秒到小结算
                    if(_needShow){
                        time = 2.1;
                    }
                    
                    this.runAction(cc.sequence(cc.DelayTime(time),cc.callFunc(delayExe)));

                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
                    {
                        MjClient.playui.reConectHeadLayout_paodekuaiTY(this);
                    }
                },
                moveHead: function() {
                    postEvent("returnPlayerLayer");
                    MjClient.playui._jiazhuWait.visible = false;

                    // 跑得快不再播放头像移动动画
                    //tableStartHeadMoveAction_card(this);
                    
                    MjClient.playui.reConectHeadLayout_paodekuaiTY(this);
                    sendGPS();
                    MjClient.checkChangeLocationApp();
                },
                initSceneData: function() {
                    var self = this;
                    if(MjClient.endoneui != null && cc.sys.isObjectValid(MjClient.endoneui))
                    {
                        MjClient.endoneui.removeFromParent(true);
                    }
                    MjClient.endoneui = null;
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if(MjClient.isInGoldField() && tData.redPacketInfo && MjClient._redPacketInfo && isGoldActivityOpen()){
                        var activeGoldPlaying = self.getChildByName("activeGoldPlaying");
                        if(activeGoldPlaying == null){
                            activeGoldPlaying = new ActiveGoldPlaying();
                            if(activeGoldPlaying.btn_hongbao){
                                if(!activeGoldPlaying.btn_hongbao.truePosition){
                                    activeGoldPlaying.btn_hongbao.truePosition = activeGoldPlaying.btn_hongbao.getPosition();
                                }
                                MjClient.playui.setHongBaoPos(activeGoldPlaying.btn_hongbao)
                                //activeGoldPlaying.btn_hongbao.setPositionX(activeGoldPlaying.btn_hongbao.x-80);
                            }
                            activeGoldPlaying.setName("activeGoldPlaying")
                            self.addChild(activeGoldPlaying,501);
                        }
                    }else{
                        self.removeChildByName("activeGoldPlaying");
                    }

                    //初始化桌子的客户端数据
                    MjClient.playui.InitC_Data();

                    MjClient.playui.reConectHeadLayout_paodekuaiTY(this);
                    MjClient.playui.showJiaZhu_Paodekuai();
                    // MjClient.playui.resetJiaZhuNum(this);
                    CheckRoomUiDelete();


                    if(tData.tState == TableState.waitPut )
                    {
                        UpdataCurrentPutCard();
                    }

                    for(var i = 0;i < MjClient.MaxPlayerNum;i++)
                    {
                        currentLeftCardCount_paodekuai(i);
                    }

                    if(tData.tState <= TableState.waitReady)
                    {
                        sendGPS();
                        MjClient.checkChangeLocationApp();
                    }
                    if (IsTurnToMe()) {
                        // 如果提示只有一手牌， 自动提起
                        // 如果提示只有一手牌， 且是我全部的手牌数量， 自动打出
                        AutoPutLastCard_card_ty();
                    }
                    //重新加载下操作按钮资源
                    MjClient.playui.reLoadOptBtnRes();
                },
                onlinePlayer: function(msg) {
                    // MjClient.playui.reConectHeadLayout_paodekuaiTY(this);

                    // 全局托管，自动准备移除小结算
                    var mySelf = getUIPlayer(0);
                    if (!mySelf)
                        return;

                    if (!msg.isTrust){
                        return;
                    }

                    if (mySelf.info.uid != msg.uid)
                        return;

                    postEvent("clearCardUI");

                    if(MjClient.endoneui && cc.sys.isObjectValid(MjClient.endoneui)){
                        MjClient.endoneui.removeFromParent(true);
                        MjClient.endoneui = null;
                    }

                    if (MjClient.rePlayVideo >= 0 && MjClient.replayui && !MjClient.endallui) {
                        MjClient.replayui.replayEnd();
                    }
                   
                    if (MjClient.arrowbkNode && cc.sys.isObjectValid( MjClient.arrowbkNode )) {
                        MjClient.arrowbkNode.setVisible(false);
                    }
                },
                waitPut: function() {
                    //重新加载下操作按钮资源
                    MjClient.playui.reLoadOptBtnRes();
                }
            },
            gameName:{
                _run:function()
                {
                    this.loadTexture(GameBg[MjClient.gameType]);
                    setWgtLayout(this,[0.12, 0.06],[0.5, 0.6],[0, 0]);
                }
            },
            jiazhuWait: {
                _visible: false,
                _layout: [
                    [0.2, 0.2],
                    [0.5, 0.7],
                    [0, 0]
                ]
            },
            banner: {
                _layout: [
                    [0.5, 0.5],
                    [0.53, 1],
                    [0, 0]
                ],
                bg_time:{
                     _run:function() {
                        MjClient.playui.BgTime_run(this);
                    }
                },
                roundnumAtlas:{
                    _visible : function () {
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if (tData){
                            if(MjClient.isInGoldField()) {//金币场显示场次名称
                                return false;
                            }
                        }
                        return true;
                    },
                    _text: function() {
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        var extraNum = tData.extraNum ? tData.extraNum:0;
                        if (tData) return "第" + (tData.roundAll-tData.roundNum + 1 + extraNum)+"/"+tData.roundAll + "局";
                    },
                    _event: {
                        mjhand: function() {
                            var sData = MjClient.data.sData;
                            var tData = sData.tData;
                            var extraNum = tData.extraNum ? tData.extraNum:0;
                            if (tData) return this.setString("第" + (tData.roundAll-tData.roundNum + 1 + extraNum)+"/"+tData.roundAll + "局");
                        }
                        ,
                        initSceneData: function() {
                            var sData = MjClient.data.sData;
                            var tData = sData.tData;
                            var extraNum = tData.extraNum ? tData.extraNum:0;
                            if (tData) return this.setString("第" + (tData.roundAll-tData.roundNum + 1 + extraNum)+"/"+tData.roundAll + "局");
                        },
                    }
                },
                tableid: {
                    _run: function() {
                        this.ignoreContentAdaptWithSize(true);
                        if(MjClient.data.sData && MjClient.data.sData.tData && MjClient.isInGoldFieldNormal()){//金币场显示场次名称
                            this.setString(MjClient.data.sData.tData.fieldTitle+"   底分"+getJinbiStr(MjClient.data.sData.tData.fieldBase)+"金币");
                        }
                    },
                    _event: {
                        initSceneData: function() {
                            this.ignoreContentAdaptWithSize(true);
                            if(MjClient.isInGoldFieldNormal()){//金币场显示场次名称
                                this.setString(MjClient.data.sData.tData.fieldTitle+"   底分"+getJinbiStr(MjClient.data.sData.tData.fieldBase)+"金币");
                            }else if(MjClient.isInGoldFieldQuick() && MjClient._GOLD_FIELD_MATCH){//金币场快速场
                                for(var i in MjClient._GOLD_FIELD_MATCH){
                                    if (MjClient._GOLD_FIELD_MATCH[i].fieldId == MjClient._LAST_FIELD.fieldId){
                                        localGoldMatch = MjClient._GOLD_FIELD_MATCH[i];
                                        break;
                                    }
                                }
                                if (localGoldMatch){
                                    this.setString(localGoldMatch.content);
                                }else{
                                    this.setString("");
                                }
                            }else{
                                this.setString("房间号：" + MjClient.data.sData.tData.tableid);
                            }

                        }
                    }
                },
                gps_btn: {
                    _run: function() {
                        this.setVisible((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) && MjClient.MaxPlayerNum != 2 && !MjClient.isInGoldField());
                        
                        var banner = this.parent;
                        var waitNode = MjClient.playui.getChildByName("playUINode").getChildByName("wait");
                        var delroom = waitNode.getChildByName("delroom");
                        var backHomebtn = waitNode.getChildByName("backHomebtn");
                        var distanceX = banner.getChildByName("setting").getPositionX() - banner.getChildByName("changeBg").getPositionX();

                        delroom.setScale(banner.scaleX,banner.scaleY);
                        backHomebtn.setScale(banner.scaleX,banner.scaleY);

                        // var scaleAdjusted = Math.min(MjClient.size.width/1280,MjClient.size.height/720);
                        // var settingButton = banner.getChildByName("setting");
                        // var changeBgButton = banner.getChildByName("changeBg");
                        // var gpsButton = banner.getChildByName("gps_btn");

                        // settingButton.setScale(scaleAdjusted/banner.scaleX,scaleAdjusted/banner.scaleY);
                        // changeBgButton.setScale(scaleAdjusted/banner.scaleX,scaleAdjusted/banner.scaleY);
                        // gpsButton.setScale(scaleAdjusted/banner.scaleX,scaleAdjusted/banner.scaleY);
                        // delroom.setScale(scaleAdjusted,scaleAdjusted);
                        // backHomebtn.setScale(scaleAdjusted,scaleAdjusted);

                        if (this.isVisible()) {
                            delroom.setPosition(waitNode.convertToNodeSpace(banner.convertToWorldSpace(cc.p(this.getPositionX() - distanceX,this.getPositionY()))))
                            backHomebtn.setPosition(waitNode.convertToNodeSpace(banner.convertToWorldSpace(cc.p(this.getPositionX() - 2*distanceX,this.getPositionY()))))
                        }
                        else {
                            delroom.setPosition(waitNode.convertToNodeSpace(banner.convertToWorldSpace(this.getPosition())))
                            backHomebtn.setPosition(waitNode.convertToNodeSpace(banner.convertToWorldSpace(cc.p(this.getPositionX() - distanceX,this.getPositionY()))))
                        }
                    },
                    _click: function() {
                        if (MjClient.MaxPlayerNum == 3) {
                            MjClient.Scene.addChild(new showDistance3PlayerLayer());
                        } else if (MjClient.MaxPlayerNum == 4) {
                            MjClient.Scene.addChild(new showDistanceLayer());
                        }
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dingwei", {uid: SelfUid(),gameType:MjClient.gameType});
                    }
                },
                tuoguan_btn:{
                    _run:function () {
                        this.setVisible(MjClient.isInGoldField());
                    },
                    _click: function() {
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "beTrust"});
                    },
                    _event:{
                        beTrust:function (msg) {
                            if(msg.uid == SelfUid()){
                                this.enabled = false;
                            }
                        },
                        cancelTrust:function (msg) {
                            if(msg.uid == SelfUid()){
                                this.enabled = true;
                            }
                        },
                        initSceneData:function (msg) {
                            var pl = getUIPlayer(0);
                            if(pl.trust){
                                this.enabled = false;
                            }else {
                                this.enabled = true;
                            }
                        },
                    },
                },
                duty_btn: {
                    _run: function () {
                        if (MjClient.isInGoldField())
                            this.setVisible(true);
                        else {
                            this.setVisible(false);
                            return;
                        }

                        ShowDayTaskTips(this);
                    },
                    _click: function () {
                        MjClient.Scene.addChild(new GoldTaskLayer());
                    },
                    Image_hongdian:{
                        _run: function () {
                            this.visible = MjClient._GoldFuli;
                        },
                        _event: {
                            refresh_mission: function() {
                                this.visible = MjClient._GoldFuli;
                            }
                        }
                    }
                },
                get_gold_btn:{
                    _run:function () {
                        if(MjClient._GOLD_RECHARGE && MjClient.isInGoldField()){
                            this.setVisible(true);
                        }else {
                            this.setVisible(false);
                        }

                        // 隐藏按钮，暂不开放
                        this.setVisible(false);
                    },
                    _click: function() {
                        MjClient.Scene.addChild(new goldStoreLayer());
                    }
                },
            },
            bg_temp:{
                _run: function() {
                    changeGameBg(this);
                },
                _layout: [
                    [1, 1],
                    [0.5, 0.5],
                    [0, 0], true
                ],
            },
            wait: {
                _run:function() {
                    this.visible = true;
                },
                getRoomNum: {
                    _run:function(){
                        setWgtLayout(this, [0.18, 0.18],[0.5, 0.35],[0, 0]);
                    },
                    _visible:function()
                    {
                        if( MjClient.isInGoldField() )return false;
                        return !MjClient.remoteCfg.guestLogin;
                    },
                    _click: function() {
                        getPlayingRoomInfo(1);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fuzhifangjianxinxi", {uid:SelfUid(), gameType:MjClient.gameType});

                    }
                },
                wxinvite: {
                    _layout: [[0.2, 0.2],[0.5, 0.4],[0, 0]],
                    _click: function() {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Yaoqingweixinhaoyou", {uid:SelfUid(), gameType:MjClient.gameType});

                        getPlayingRoomInfo(2);
                    },
                    _visible:function()
                    {
                        if (MjClient.isInGoldField()) return false;
                        return !MjClient.remoteCfg.guestLogin;
                    }
                },
                delroom: {
                    _run:function(){
                        // if (isIPhoneX()) {
                        //     setWgtLayout(this, [0.11, 0.11],[0.1, 0.45],[0, 0]);
                        // }
                        // else {
                        //     setWgtLayout(this, [0.11, 0.11],[0.05, 0.45],[0, 0]);
                        // }
                    },
                    _click: function() {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Jiesanfangjian", {uid:SelfUid(), gameType:MjClient.gameType});

                        MjClient.delRoom(true);
                    },
                    _event: {
                        waitReady: function() {
                            this.visible = true;
                        }
                    }
                },
                backHomebtn: {
                    _run:function(){
                        // if (isIPhoneX()) {
                        //     setWgtLayout(this, [0.11, 0.11],[0.1, 0.6],[0, 0]);
                        // }
                        // else {
                        //     setWgtLayout(this, [0.11, 0.11], [0.05, 0.6], [0, 0]);
                        // }
                    },
                    _click: function(btn) {
                        var sData = MjClient.data.sData;
                        if (sData) {
                            if (IsRoomCreator()) {
                                MjClient.showMsg("确定要退出房间吗？",
                                    function() {
                                        MjClient.leaveGame();
                                    },
                                    function() {});
                            } else {
                                MjClient.showMsg("确定要退出房间吗？",
                                    function() {
                                        MjClient.leaveGame();
                                    },
                                    function() {});
                            }
                        }

                    },
                    _event: {
                        waitReady: function() {
                            this.visible = true;
                        }
                    }
                },
                _event: {
                    onlinePlayer: function() {
                        if( IsAllPlayerReadyState() ) {
                            this.getChildByName('delroom').visible = false;
                            this.getChildByName('backHomebtn').visible = false;
                        } 
                    },
                    initSceneData: function(eD) {
                        var isWaitReady = eD.tData.tState == TableState.waitReady;
                        this.getChildByName('getRoomNum').visible = false;//IsInviteVisible();
                        this.getChildByName('wxinvite').visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
                        this.getChildByName('delroom').visible = IsInviteVisible() || isWaitReady;
                        this.getChildByName('backHomebtn').visible = IsInviteVisible() || isWaitReady;
                    },
                    addPlayer: function(eD) {
                        var isWaitReady = eD.tData.tState == TableState.waitReady;
                        console.log(">>>>>> play add player >>>>");
                        this.getChildByName('getRoomNum').visible = false;//IsInviteVisible();
                        this.getChildByName('wxinvite').visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
                        this.getChildByName('delroom').visible = IsInviteVisible() || isWaitReady;
                        this.getChildByName('backHomebtn').visible = IsInviteVisible() || isWaitReady;
                    },
                    removePlayer: function(eD) {
                        var isWaitReady = eD.tData.tState == TableState.waitReady;
                        this.getChildByName('getRoomNum').visible = false;//IsInviteVisible();
                        this.getChildByName('wxinvite').visible = !MjClient.remoteCfg.guestLogin;
                        this.getChildByName('delroom').visible = IsInviteVisible() || isWaitReady;
                        this.getChildByName('backHomebtn').visible = IsInviteVisible() || isWaitReady;
                    }
                }
            },
            BtnHimt:{ //add by  sking for put card button
                _run: function () {
                    this.visible = false;
                    if (MjClient.data.sData.tData.areaSelectMode.mustPut)
                    {
                        if(isIPhoneX())
                            setWgtLayout(this,[0.15, 0.14], [0.52, 0.46], [-0.8, 0.26]);
                        else
                            setWgtLayout(this,[0.15, 0.14], [0.52, 0.39], [-0.8, 0.26]);
                    }
                    else
                    {
                        if(isIPhoneX())
                            setWgtLayout(this,[0.15, 0.14], [0.52, 0.46], [0, 0.26]);
                        else
                            setWgtLayout(this,[0.15, 0.14], [0.52, 0.39], [0, 0.26]);
                    }
                },
            },//end of add by sking
            BtnReady: {
                _visible: false,
                _run: function() {
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                        setWgtLayout(this,[0.16, 0], [0.5, 0.4], [0, 0]);
                    }
                    else {
                        setWgtLayout(this,[0.2, 0.2], [0.5, 0.4], [0, 0]);
                    }  
                },
                _click: function(_this) {
                    PKPassConfirmToServer_card();
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zhunbei", {uid: SelfUid(), gameType:MjClient.gameType});
                },
                _event: {
                    waitReady: function() {
                        this.visible = true;
                    },
                    mjhand: function() {
                        this.visible = false;
                    },
                    initSceneData: function() {
                        this.visible = false;
                        var tData = MjClient.data.sData.tData;
                        var pl = getUIPlayer(0);
                        this.visible = tData.roundNum == tData.roundAll && tData.tState == TableState.waitReady && pl.mjState == TableState.waitReady && !IsInviteVisible();
                    },
                    PKPass: function() {
                        this.visible = false;
                    },
                    removePlayer: function(eD) {
                        this.visible = false;
                    },
                    onlinePlayer: function(msg) {
                        if (msg.uid == SelfUid()) {
                            this.visible = false;
                        }
                    },
                }
            },
            BtnNoPut:{
                _run: function () {
                    this.visible = false;
                    if(isIPhoneX())
                        setWgtLayout(this,[0.15, 0.14], [0.525, 0.46], [-1.3, 0.26]);
                    else
                        setWgtLayout(this,[0.15, 0.14], [0.525, 0.39], [-1.3, 0.26]);
                },
            },
            BtnPutCard:{
                _run: function () {
                    this.visible = false;
                    if (MjClient.data.sData.tData.areaSelectMode.mustPut)
                    {
                        if(isIPhoneX())
                            setWgtLayout(this,[0.15, 0.14], [0.5, 0.46], [0.8, 0.32]);
                        else
                            setWgtLayout(this,[0.15, 0.14], [0.5, 0.39], [0.8, 0.32]);
                    }          
                    else
                    {
                        if(isIPhoneX())
                            setWgtLayout(this,[0.15, 0.14], [0.515, 0.46], [1.3, 0.32]);
                        else
                            setWgtLayout(this,[0.15, 0.14], [0.515, 0.39], [1.3, 0.32]); 
                    }
                },
            },//end of add by skin
            baoDanMaxTip: {
                _run: function() {
                    this.visible = false;
                    setWgtLayout(this, [0.56, 0], [0.5, 0.1], [0, 0]);

                    this.checkVisible = function() {
                        var tData = MjClient.data.sData.tData;
                        var plNext = getUIPlayer(1);

                        // 下家报单,单牌请出最大牌
                        if (IsTurnToMe() && tData.tState == TableState.waitPut && plNext && plNext.handCount == 1) {
                            this.visible = tData.lastPutPlayer == tData.curPlayer || tData.lastPutCard.length == 1;
                        }
                    }
                },
                _event: {
                    clearCardUI: function() {
                        this.visible = false;
                    },
                    mjhand: function() {
                        this.visible = false;
                    },
                    PKPut: function(eD) {
                        this.visible = false;
                    },
                    initSceneData: function(eD) {
                        this.checkVisible();
                    },
                    waitPut: function() {
                        this.checkVisible();
                    },
                }
            },
            flyCard:{
                _event:{
                    waitPut:function(eD){
                        return;
                        var tData = MjClient.data.sData.tData;
                        if (tData.roundNum == tData.roundAll && tData.lastPutPlayer == -1) {
                            setWgtLayout(this,[0.036, 0], [0.5, 0.75], [0, 0]);
                            MjClient.playui.shwoFlyCardAnim(this);
                        }
                    }
                }
            },
            down: {
                head: {
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
                    head_bottom:{_visible:false},
                    name_bottom:{_visible:false},
                    icon_bottom:{_visible:false},
                },
                ready: {
                    _run: function() {
                        setWgtLayout(this, [this.width / 1280, this.height / 720], [0.5, 0.5], [0, -1.5]);
                        GetReadyVisible(this, 0);
                        //this.visible = true;
                    },
                },
                _event: {
                    updateInfo:function (d) {
                        if(MjClient.isInGoldField() && d && d.gold){
                            InitUserCoinAndName(this,0);
                        }
                    },
                    PKPut: function(eD) {
                        //cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PKPut---------------");
                        var pl = getUIPlayer(0);
                        if(pl && pl.trust || eD.uid != SelfUid() ||  MjClient.rePlayVideo != -1)
                            DealMJPut_card(this,eD, 0);
                        // var pl = getUIPlayer(0);
                        // cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PKPut---------------" + pl.isTing);
                        // if (eD.uid == SelfUid() && pl.isTing)
                        // {
                        //     var _tingCards = this.getChildByName("tingCardsNode");
                        //     var tingSet = calTingSet(pl.mjhand, MjClient.data.sData.tData.hunCard);
                        //     setTingCards(_tingCards,tingSet);
                        // }
                        setUserOffline(this, 0);

                        // 解决异常情况下，手牌结点没有移除
                        correctPKPut(eD, 0);
                    },
                    waitPut:function(eD){
                        cc.log(">>>>>>>>>>>>>>>>down>>>>>>>>>>>>>>>waitPut");

                        var tData = MjClient.data.sData.tData;
                        if (MjClient.playui.isShowHandCardBeiMain && (tData.curPlayer == getPlayerIndex(0) || tData.lastPutPlayer != -1)) {
                            MjClient.playui.isShowHandCardBeiMain = false;
                            MjClient.playui.hideHandCardBeiMian();
                        }

                        // 发牌时暂时不计算牌型提示
                        if (!MjClient.playui.isFaPai)
                        {
                            if (MjClient.playui.isWaitAniEnd)
                            {
                                delete MjClient.playui.isWaitAniEnd;
                                MjClient.playui.showOffenseAnim();
                            }

                            DealWaitPut_card(this, eD, 0);
                            UpdataCurrentPutCard();
                            // 跑得快 自动出牌
                            if (IsTurnToMe()) {
                                // 如果提示只有一手牌， 自动提起
                                // 如果提示只有一手牌， 且是我全部的手牌数量， 自动打出
                                AutoPutLastCard_card_ty();
                            }
                        }
                    },
                    PostCardsEnded: function()
                    {
                        // 发牌完毕处理正常牌逻辑
                        if(!MjClient.playui.isFaPai && 
                            MjClient.data.sData.tData.tState == TableState.waitPut && 
                            MjClient.playui.isWaitAniEnd)
                        {
                            delete MjClient.playui.isWaitAniEnd;
                            MjClient.playui.showOffenseAnim();

                            DealWaitPut_card(this, null, 0);
                            UpdataCurrentPutCard();
                            // 跑得快 自动出牌
                            if (IsTurnToMe()) {
                                // 如果提示只有一手牌， 自动提起
                                // 如果提示只有一手牌， 且是我全部的手牌数量， 自动打出
                                AutoPutLastCard_card_ty();
                            }
                        }
                    },
                    onlinePlayer: function(eD) {
                        setUserOffline(this, 0);
                    },
                    playerStatusChange: function(eD) {
                        setUserOffline(this, 0);
                    },
                    waitJiazhu: function(msg) {
                        var tData = MjClient.data.sData.tData;
                        var layer = new JiaZhu_PaodekuaiTY(tData.areaSelectMode.piaofen,function(){
                            //弹窗等待
                            MjClient.playui._jiazhuWait.visible = true;
                        });
                        layer.setName("JiaZhu");
                        cc.log("_jiazhuWait===================2222");
                        MjClient.playui.getChildByName("playUINode").addChild(layer, 99);
                    },
                }
            },
            right: {
                head: {
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
                    head_bottom:{_visible:false},
                    name_bottom:{_visible:false},
                    icon_bottom:{_visible:false},
                    tingCard:{
                        _run: function () {
                            var tData = MjClient.data.sData.tData;
                            if(MjClient.isInGoldField()) this.y = -10;
                            else if (isIPhoneX() && MjClient.rePlayVideo != -1)
                                this.setPositionX(-24);
                        },
                    },

                },
                ready: {
                    _run: function() {
                        setWgtLayout(this, [this.width / 1280, this.height / 720], [0.5, 0.5], [2, 0]);
                        GetReadyVisible(this, 1);
                    },
                },
                stand: {
                    _run: function() {
                        if (isIPhoneX() && !MjClient.isInGoldField())
                            setWgtLayout(this,[0, 0.13],[1, 1],[-2.1, 0]);
                        else
                            setWgtLayout(this,[0, 0.13],[1, 1],[-2.5, 0]);

                        this.visible = false;
                    }
                },
                deskCard: {
                    // _layout: [
                    //     [0.1, 0.15],
                    //     [1, 0.55],
                    //     [-3, 0]
                    // ],
                    _run:function()
                    {
                        if(MjClient.rePlayVideo == -1)// 表示正常游戏
                            setWgtLayout(this,[0.052, 0],[1, 0.65],[-3.5, 0.5]);
                        else if (isIPhoneX() && MjClient.rePlayVideo != -1 && !MjClient.isInGoldField())
                            setWgtLayout(this,[0.052, 0],[1, 0.65],[-4.25, 0.5]);
                        else
                            setWgtLayout(this,[0.052, 0],[1, 0.65],[-4.2, 0.5]);
                    },
                },
                noPutTag: {
                    _run:function()
                    {
                        var tData = MjClient.data.sData.tData;
                        var pos = MjClient.playui._rightNode.getChildByName("deskCard").getPosition();
                        if (MjClient.isInGoldField())pos.y -= 20;
                        this.setScale(MjClient.size.width/1280);
                        this.setPosition(pos);
                    },
                },
            },
            top: {
                head: {
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
                    head_bottom:{_visible:false},
                    name_bottom:{_visible:false},
                    icon_bottom:{_visible:false},
                    tingCard:{
                        _run: function () {
                            var tData = MjClient.data.sData.tData;
                            if(MjClient.isInGoldField()) this.y = -10;
                            else if (isIPhoneX() && MjClient.rePlayVideo != -1)
                                this.setPositionX(151);
                        },
                    },
                },
                ready: {
                    _run: function() {
                        setWgtLayout(this, [this.width / 1280, this.height / 720], [0.5, 0.5], [-2, 0]);
                        GetReadyVisible(this, 2);
                    },
                },
                stand: {
                    _run: function() {
                        if (isIPhoneX() && !MjClient.isInGoldField())
                            setWgtLayout(this,[0, 0.13],[0, 1],[3.15, 0]);
                        else
                            setWgtLayout(this,[0, 0.13],[0, 1],[2.5, 0]);

                        this.visible = false;
                    }
                },
                deskCard: {
                    // _layout: [
                    //     [0.12, 0.15],
                    //     [0.16, 0.55],
                    //     [0, 0.1]
                    // ],
                    _run:function()
                    {
                        if(MjClient.rePlayVideo == -1)// 表示正常游戏
                            setWgtLayout(this,[0.052, 0],[0.16, 0.65],[0.5, 0.5]);
                        else if (isIPhoneX() && MjClient.rePlayVideo != -1 && !MjClient.isInGoldField())
                            setWgtLayout(this,[0.052, 0],[0.16, 0.65],[1.6, 0.5]);
                        else
                            setWgtLayout(this,[0.052, 0],[0.16, 0.65],[1.2, 0.5]);
                    },
                },
                noPutTag: {
                    _run:function()
                    {
                        var tData = MjClient.data.sData.tData;
                        var pos = MjClient.playui._topNode.getChildByName("deskCard").getPosition();
                        if (MjClient.isInGoldField())pos.y -= 20;
                        this.setScale(MjClient.size.width/1280);
                        this.setPosition(pos);
                    },
                },
            },
            clock: {
                _run:function () {
                    if(MjClient.data.sData.tData.areaSelectMode.mustPut == true)
                    {
                        if(isIPhoneX())
                            setWgtLayout(this,[0.065, 0.14],[0.25,0.49],[0,0]);
                        else
                            setWgtLayout(this,[0.065, 0.14],[0.25,0.42],[0,0]);
                    }
                    else
                    {
                        if(isIPhoneX())
                            setWgtLayout(this,[0.065, 0.14],[0.17,0.49],[0,0]);
                        else
                            setWgtLayout(this,[0.065, 0.14],[0.17,0.42],[0,0]);
                    }
                    
                    MjClient.clockNode = this;
                    this.visible = false;
                    this.zIndex = 100;
                    this.srcPosition = this.getPosition();
                },
                number: {
                    _event: {
                        initSceneData: function() {
                            if (MjClient.data.sData.tData.tState == TableState.waitPut)
                            {
                                MjClient.clockNode.visible = true;
                                if ((MjClient.isInGoldField()) && !MjClient.data.sData.tData.lastPutCard){
                                    stopEffect(playTimeUpEff);
                                    MjClient.playui.clockNumberUpdate(this);
                                }else{
                                    this.setString("0");
                                }

                                MjClient.playui.updateClockPosition(MjClient.clockNode);
                            }
                        },
                        onlinePlayer: function() {
                            if (!MjClient.isInGoldField()){
                                MjClient.clockNode.visible = false;
                            }
                        },
                    }
                },
            },
            chat_btn: {
                _run: function() {
                    setWgtLayout(this, [0.05, 0.05], [0.965, 0.22], [0, 3.5]); 
                },
            },
            block_tuoguan:{
                Text_1:{
                    _run: function() {
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            BtnYesVieGuan:{
                _run: function () {
                    this.visible = false;
                    if (MjClient.data.sData.tData.areaSelectMode.mustPut)
                    {
                        if(isIPhoneX())
                            setWgtLayout(this,[0.15, 0.14], [0.5, 0.46], [0.8, 0.32]);
                        else
                            setWgtLayout(this,[0.15, 0.14], [0.5, 0.39], [0.8, 0.32]);
                    }          
                    else
                    {
                        if(isIPhoneX())
                            setWgtLayout(this,[0.15, 0.14], [0.515, 0.46], [1.3, 0.32]);
                        else
                            setWgtLayout(this,[0.15, 0.14], [0.515, 0.39], [1.3, 0.32]); 
                    }
                },
                _click: function(btn) {
                    btn.visible = false;
                    MjClient.playui.BtnNoVieGuan.visible = false;
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "pkVieGuan",
                        vieGuanState: 1,//1.抢关，2不抢
                    });
                },
                _event:{
                    pkVieGuan:function(msg)
                    {
                        this.visible = false;
                    },        
                    waitVieGuan:function(msg)
                    {
                        if (SelfUid() != msg.uid)return;
                        this.visible = true;
                    },
                    initSceneData: function()
                    {
                        var tData = MjClient.data.sData.tData;
                        this.visible = tData.tState == TableState.waitVieGuan && tData.curPlayer == getPlayerIndex(0);
                    }
                }
            },
            BtnNoVieGuan:{
                _run: function () {
                    this.visible = false;
                    if(isIPhoneX())
                        setWgtLayout(this,[0.15, 0.14], [0.525, 0.46], [-1.3, 0.26]);
                    else
                        setWgtLayout(this,[0.15, 0.14], [0.525, 0.39], [-1.3, 0.26]);
                },
                _click: function(btn) {
                    btn.visible = false;
                    MjClient.playui.BtnYesVieGuan.visible = false;
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "pkVieGuan",
                        vieGuanState: 2,//1.抢关，2不抢
                    });
                },
                _event:{
                    pkVieGuan:function(msg)
                    {
                        this.visible = false;
                    },
                    waitVieGuan:function(msg)
                    {
                        if (SelfUid() != msg.uid)return;
                        this.visible = true;
                    },
                    initSceneData: function()
                    {
                        var tData = MjClient.data.sData.tData;
                        this.visible = tData.tState == TableState.waitVieGuan && tData.curPlayer == getPlayerIndex(0);
                    }
                }
            },

        };
    },
    ctor: function(json) {
        var resJson = json || res.Play_PaoDeKuaiHBTY_json;
        var playui = this._super(resJson);

        MjClient.playui._btn_tuoguan =  playui.node.getChildByName("block_tuoguan");

        //金币场进来加载先用临时图遮挡ui
        this.bg_temp = playui.node.getChildByName("bg_temp");
        this.top_banner = playui.node.getChildByName("banner");
        this.BtnNoVieGuan  = playui.node.getChildByName("BtnNoVieGuan");
        this.BtnYesVieGuan  = playui.node.getChildByName("BtnYesVieGuan");

        if (this.bg_temp){
            if(MjClient.rePlayVideo == -1 && MjClient.data && MjClient.data.sData && MjClient.data.sData.tData && MjClient.isInGoldField()){
                this.bg_temp.visible = true;
                this.top_banner.zIndex = 1000;
                this.bg_temp.zIndex = 1000;
                this.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function() {
                    MjClient.playui.bg_temp.zIndex = -1;
                    MjClient.playui.top_banner.zIndex = 0;
                    MjClient.playui.bg_temp.visible = false;
                })));
            }else{
                this.bg_temp.zIndex = -1;
                this.bg_temp.visible = false;
            }
        }

        // 在亲友圈房间中添加邀请亲友圈牌有一起对局
        addClubYaoqingBtn(2);

        // 俱乐部返回大厅功能：by_jcw
        addClub_BackHallBtn(true, [[0.115, 0.115], [0.56,0.93], [0,0]], [[0.12, 0.12], [0.56,0.92], [0,0]],"playing/paodekuaiTable_new/delroom1.png");

        // 回看
        if(MjClient.rePlayVideo == -1 && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) && !MjClient.isInGoldField()){
            this._viewLookBack = COMMON_UI.createPokerLookbackView()
            playui.node.addChild(this._viewLookBack);
            this._viewLookBack.setPosition(MjClient.size.width / 2,MjClient.size.height / 2);
            this._viewLookBack.setContentSize(MjClient.size.width, MjClient.size.height);
        }

        this.initFieldIdUI(playui.node);

        if (MjClient.isInGoldFieldNormal())
            MjClient.playui.createJiPaiQiPanel();

        return true;
    }
    
});

PlayLayer_PaoDeKuaiHBTY.prototype.GetEndOneViewObj = function()
{
    return new EndOneView_PaoDeKuaiHBTY();
}

/**
 * 拼接游戏玩法及付费信息
 * @function
 * @return {String}
 */
PlayLayer_PaoDeKuaiHBTY.prototype.getGameInfoString = function(param)
{
    var tData = MjClient.data.sData.tData;
    var str = "";

    if (param != "roundInfo")
        str += MjClient.MaxPlayerNum == 3 ? "三人玩," : "两人玩,";
    str += tData.areaSelectMode.cardNumIndex == 0 ? "16张," : "15张,";
    str += tData.areaSelectMode.mustPut ? "" : "非必管,";
    str += tData.areaSelectMode.zhaDanBuChai ? "炸弹不可拆," : "";
    var firstOutRuleStr = "";
    switch (tData.areaSelectMode.firstPutRule){
        case 1:{
            firstOutRuleStr = "幸运翻牌,";
            break;
        }
        case 2:{
            firstOutRuleStr = "红桃3,";
            break;
        }
        case 3:{
            firstOutRuleStr = "红桃3首出,";
            break;
        }

        default:{
            firstOutRuleStr = ""
            break
        }
    };

    switch (tData.areaSelectMode.piaofen){
        case 1:{ str += "飘123,"; break; }
        case 2:{ str += "飘235,"; break; }
        case 3:{ str += "飘258,"; break; }
        case 4:{ str += "每局飘1,"; break; }
        case 5:{ str += "每局飘2,"; break; }
        default:{ str += ""; break }
    };

    // str += tData.areaSelectMode.firstHeiTao3 ? "首局先出黑桃三," : "";
    str += firstOutRuleStr;
    str += tData.areaSelectMode.can4dai2 ? "四带二," : "";
    str += tData.areaSelectMode.can4dai3 ? "四带三," : "";
    str += tData.areaSelectMode.can3dai1 ? "三带一," : "";    
    str += tData.areaSelectMode.hongTao10Niao ? "红桃10扎鸟," : "";
    str += tData.areaSelectMode.hongTao10JiaFen ? "红桃10加5分," :"";
    str += tData.areaSelectMode.can3aZhaDan ? "3个A算炸弹," : "";
    str += tData.areaSelectMode.isPlayerShuffle == 1 ? "手动切牌," : "系统切牌,";

    if (typeof(tData.areaSelectMode.fengDing) == "number") {
        switch (tData.areaSelectMode.fengDing)
        {
            case 1:
                str += "30/32分封顶,";
                break;
            case 2:
                str += "60/64分封顶,";
            case 3:
                str += "120/128分封顶,"; 
                break;
        }
    }

    str += tData.areaSelectMode.paodekuaiTY_difen ? "底分X" + tData.areaSelectMode.paodekuaiTY_difen + ","  : "";
    str += tData.areaSelectMode.fangQiangGuan ? "防强关," : "";

    if (param != "roundInfo")
    {
        str += tData.areaSelectMode.fangZuoBi ? "防作弊," : "";
        str += tData.areaSelectMode.showCardNumber ? "显示牌数," : "";
    }

    if(tData.areaSelectMode.fanBei == 1)
    {
        str += "小于" + tData.areaSelectMode.fanBeiScore + "分翻倍,";
    } 

    if (param != "roundInfo")
    {
        switch (tData.areaSelectMode.payWay)
        {
            case 0:
                str += "房主付";
                break;
            case 1:
                str += "AA付";
                break;
            case 2:
                str += "大赢家付";
                break;
        }
    }

    if(tData.areaSelectMode.trustTime > 0)
    {
        str += Math.floor(tData.areaSelectMode.trustTime/60) + "分钟,";
    } 

    if(tData.areaSelectMode.isTrustWhole && tData.areaSelectMode.trustWay >= 0)
    {
        str += ["托管当局,", "托管当局+下一局,", "整场托管,"][tData.areaSelectMode.trustWay] || "";
    } 


    if (str.charAt(str.length - 1) == ",")
        str = str.substring(0, str.length - 1);

    //比赛场
    var BSStr = "";
    if(tData.matchId){
        BSStr = ",10秒出牌";
        str += BSStr;
        str = GameCnName[MjClient.gameType]+","+str;
    }

    if(MjClient.isInGoldField())
    {
        str = "";
        str += tData.areaSelectMode.cardNumIndex == 0 ? "16张" : "15张";
        str += tData.areaSelectMode.paodekuaiTY_difen ? ",底分X" + tData.fieldBase: "";
    }
    return str;
};

// 播放先手标识动画
PlayLayer_PaoDeKuaiHBTY.prototype.showOffenseAnim = function()
{
    var tData = MjClient.data.sData.tData;
    var off = getOffByIndex(tData.curPlayer);
    var playerNode = getNode_cards(off);
    if (!playerNode)
        return;

    var first = new cc.Sprite("playing/paodekuaiTable_new/i_am_luckfirst.png");
    first.setAnchorPoint(cc.p(0.5,0.5));
    MjClient.playui.addChild(first,10);

    var headNode = playerNode.getChildByName("head");
    var offLine = headNode.getChildByName("offline");
    var point = offLine.convertToWorldSpace(cc.p(offLine.width/2, offLine.height/2));
    var winSize = cc.director.getWinSize();

    if (point.x < winSize.width/2) {
        // 上边、下边的玩家
        setWgtLayout(first, [first.width / 1280, first.height / 720], [0, point.y/winSize.height], [-0.5, 0]);

        first.runAction(cc.sequence(cc.moveBy(1, point.x + headNode.getBoundingBox().width/2 + first.getBoundingBox().width, 0).easing(cc.easeBackOut()), cc.callFunc(function() {
            first.removeFromParent();
        })));
    } else {
        // 右边的玩家
        setWgtLayout(first, [first.width / 1280, first.height / 720], [1, point.y/winSize.height], [0.5, 0]);

        first.runAction(cc.sequence(cc.moveBy(1, -(winSize.width - point.x + headNode.getBoundingBox().width/2 + first.getBoundingBox().width), 0).easing(cc.easeBackOut()), cc.callFunc(function() {
            first.removeFromParent();
        })));
    }
}