
var PlayLayer_PaoDeKuaiTY = PlayLayer_PDK.extend({
    getJsBind: function(){
        return {
            _event: {
                endRoom: function(msg) {
                    mylog(JSON.stringify(msg));
                    if (msg.showEnd) this.addChild(new GameOverLayer(),500);
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
                                    self.addChild(new GameOverLayer(), 500);
                                }else {
                                    self.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                                        self.addChild(new GameOverLayer(),500);
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
            }
        };
    },
    ctor: function(json) {
        var resJson = json || res.Play_PaoDeKuaiTY_json;
        var playui = this._super(resJson);

        MjClient.playui._btn_tuoguan =  playui.node.getChildByName("block_tuoguan");

        //金币场进来加载先用临时图遮挡ui
        this.bg_temp = playui.node.getChildByName("bg_temp");
        this.top_banner = playui.node.getChildByName("banner");
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

        return playui;
    }
    
});

PlayLayer_PaoDeKuaiTY.prototype.GetEndOneViewObj = function()
{
    return new EndOneView_PaoDeKuaiTY();
}

// add...................   Greene
//初始化桌子上的客户端数据c_data..各个游戏的自身数据可以在这里初始，
//尽量不要在外部公共代码判断游戏类型，而是在c_data里初始化数据。
//在PlayLayer的_event 的 initSceneData调用
PlayLayer_PaoDeKuaiTY.prototype.InitC_Data = function() {
    if (!MjClient.data.c_Data)
        MjClient.data.c_Data = {};
    cc.log("InitC_Data===========================")
    //出牌是否动画
    MjClient.data.c_Data.bPutCardAnim =  MjClient.data.sData.tData.areaSelectMode.playSpeed != 0;
    //是发采用老的牌型动画
    MjClient.data.c_Data.bPutCardAnimOld = MjClient.data.sData.tData.areaSelectMode.playSpeed == 0;
    //牌型动画是否是文字图片
    MjClient.data.c_Data.bTxtAnim = MjClient.data.sData.tData.areaSelectMode.playSpeed == 0;
}

// off 是四个位置，根据off 显示四个位置的信息 by sking
PlayLayer_PaoDeKuaiTY.prototype.setUserVisiblePaoDeKuai = function (node, off)
{
    var pl = getUIPlayer(off);
    var head = node.getChildByName("head");
    var name = head.getChildByName("name");
    var nobody = head.getChildByName("nobody");
    var coin = head.getChildByName("coin");
    var offline = head.getChildByName("offline");
    var name_bg = head.getChildByName("name_bg");
    var score_bg = head.getChildByName("score_bg");
    var head_bottom = head.getChildByName("head_bottom");
    var name_bottom = head.getChildByName("name_bottom");
    var icon_bottom = head.getChildByName("icon_bottom");

    if(pl)
    {
        name.visible = true;
        coin.visible = true;
        offline.visible = true;
        coin.visible = true;
        // name_bg.visible = true;
        // score_bg.visible = true;
        
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        if (MjClient.isInGoldField() && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ))
        {   
            if (name_bottom) {
                name_bottom.visible = true;
            }
            if (icon_bottom) {
                icon_bottom.visible = true;
            }
            
        }else if (head_bottom) {
            head_bottom.visible = true;
        }
        MjClient.loadWxHead(pl.info.uid, pl.info.headimgurl);
        setUserOffline(node, off);
        MjClient.playui.initUserHandUIPaoDeKuai(node, off);
    }
    else
    {
        name.visible = false;
        coin.visible = false;
        offline.visible = false;
        coin.visible = false;
        var WxHead = nobody.getChildByName("WxHead");
        if(WxHead)
            WxHead.removeFromParent(true);
    }
};

PlayLayer_PaoDeKuaiTY.prototype.initUserHandUIPaoDeKuai = function (node, off, needSort)
{
    if (cc.isUndefined(needSort))
        needSort = true;

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = getUIPlayer(off);

    if(!pl)
    {
        return;
    }

    //初始化玩家金币和名称
    InitUserCoinAndName(node, off);
    setAreaTypeInfo(true);
    currentLeftCardCount_paodekuai(off);

    if(
        tData.tState != TableState.waitPut &&
        tData.tState != TableState.waitEat &&
        tData.tState != TableState.waitCard &&
        tData.tState != TableState.waitVieGuan
    )
    {
        return;
    }

    //添加手牌
    if(MjClient.rePlayVideo == -1)// 表示正常游戏
    {
        if (pl.mjhand && off == 0) {//只初始化自己的手牌
            var vcard = [];
            for (var i = 0; i < pl.mjhand.length; i++) {

                var card = getNewCard_card(node, "stand", "mjhand", pl.mjhand[i], off);
                var index = vcard.indexOf(pl.mjhand[i]);//区分2张一样的牌
                if(index >= 0)
                {
                    card.setUserData(1);
                }
                else
                {
                    card.setUserData(0);
                }
                vcard.push(pl.mjhand[i]);
            }

            if (tData.areaSelectMode.fangZuoBi && tData.lastPutPlayer == -1 && tData.curPlayer != getPlayerIndex(0))
            {
                MjClient.playui.isShowHandCardBeiMain = true;
                MjClient.playui.showHandCardBeiMian(true);
            }
        }
        else if (off > 0) {

        }
    }
    else
    {
        /*
            播放录像
        */
        if (pl.mjhand)
        {
            if(off == 0)
            {
                for (var i = 0; i < pl.mjhand.length; i++) {
                    getNewCard_card(node, "stand", "mjhand", pl.mjhand[i], off);
                }
            }
            else
            {
                for (var i = 0; i < pl.mjhand.length ; i++) {
                    getNewCard_card(node, "stand", "mjhand_replay", pl.mjhand[i], off);
                }
            }
        }
    }

    MjClient.playui.CardLayoutRestore(node, off, needSort);

    MjClient.playui.setJiaZhuNum(node,pl);
};


PlayLayer_PaoDeKuaiTY.prototype.updateClockPosition = function(arrowNode)
{
    var tData = MjClient.data.sData.tData;
    var uids = tData.uids;
    var curPlayerIndex = (tData.curPlayer + MjClient.MaxPlayerNum - tData.uids.indexOf(SelfUid())) % MjClient.MaxPlayerNum;

    var curPlayerNode = null;
    var deskCardPosOffset = {
        x: 44,
        y:-34
    }
    if (curPlayerIndex == 1)
        curPlayerNode = this._rightNode;
    else if (curPlayerIndex == 2) {
        curPlayerNode = this._topNode;
        deskCardPosOffset.x = 0 - deskCardPosOffset.x;
    }

    if (curPlayerNode != null){
        var deskCardPos = curPlayerNode.getChildByName("deskCard").getPosition();
        if (!MjClient.isInGoldField())
        {
            if (isIPhoneX() && MjClient.rePlayVideo != -1) {
                deskCardPos.x += 41 * Math.min(MjClient.size.width/1280,MjClient.size.height/720) * (curPlayerIndex == 1 ? 2 : -1);
            } else {
                deskCardPos.y += deskCardPosOffset.y;
                deskCardPos.x += deskCardPosOffset.x; 
            }      
        }
        else{
            deskCardPos.x += 80 * (cc.director.getWinSize().width/1280) * (curPlayerIndex == 2? -1:1);
            deskCardPos.y += 30* (cc.director.getWinSize().height/720) ;
        }
        
        arrowNode.setPosition(deskCardPos);
    }
    else if (isIPhoneX() && MjClient.rePlayVideo != -1 && !MjClient.isInGoldField()) {
        var deskCardPos = this._topNode.getChildByName("deskCard").getPosition();
        deskCardPos.x -= 41 * Math.min(MjClient.size.width/1280,MjClient.size.height/720);
        deskCardPos.y = arrowNode.srcPosition.y;
        arrowNode.setPosition(deskCardPos);
    }
    else
        arrowNode.setPosition(arrowNode.srcPosition);

    if (curPlayerNode != null && (tData.curPlayer !== tData.lastPutPlayer) )
    {
        var children = curPlayerNode.children;
        for (var i = 0; i < children.length; i++)
        {
            var ni = children[i];
            if(ni.name == "out")
                ni.removeFromParent(true);
        }
    }
}

/**
 * 拼接游戏玩法及付费信息
 * @function
 * @return {String}
 */
PlayLayer_PaoDeKuaiTY.prototype.getGameInfoString = function(param)
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
            firstOutRuleStr = tData.areaSelectMode.isPreRoundFirstRule==true?  "每局先出黑桃3,":"首局先出黑桃3,"
            break;
        }
        case 2:{
            firstOutRuleStr = ""
            break;
        }
        case 3:{
            firstOutRuleStr = tData.areaSelectMode.isPreRoundFirstRule==true?  "每局先出黑桃3,":"首局先出黑桃3,"
            break;
        }
        case 4:{
            firstOutRuleStr = tData.areaSelectMode.isPreRoundFirstRule==true?  "每局随机先手,":"首局随机先手,"
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

PlayLayer_PaoDeKuaiTY.prototype.shwoFlyCardAnim = function(flyNode)
{
    var tData = MjClient.data.sData.tData;
    var off = getOffByIndex(tData.curPlayer);
    var playerNode = getNode_cards(off);
    if (!playerNode)
        return;

    if(4 == tData.areaSelectMode.firstPutRule)     // 2人完 随机先手，可以不出3，不播放黑桃3加入手牌的动画
        return;

    var headNode = playerNode.getChildByName("head");
    var point = headNode.convertToWorldSpace(cc.p(headNode.width/2, headNode.height/2));
    point = flyNode.getParent().convertToNodeSpace(point);
    setCardSprite_card(flyNode, 12, false);
    flyNode.setVisible(true);
    flyNode.setScale(flyNode.getScale() * 1.5);
    flyNode.runAction(cc.sequence(cc.delayTime(0.2), cc.spawn(cc.moveTo(1.0, point), cc.scaleTo(1.0, flyNode.getScale()/1.5)), cc.callFunc(function() {
        flyNode.setVisible(false);

        if(!MjClient.playui.isFaPai)
        {
            postCardsEnded();
        }
    })));
}

// 播放先手标识动画
PlayLayer_PaoDeKuaiTY.prototype.showOffenseAnim = function()
{
    var tData = MjClient.data.sData.tData;
    var off = getOffByIndex(tData.curPlayer);
    var playerNode = getNode_cards(off);
    if (!playerNode)
        return;

    var first = new cc.Sprite("playing/paodekuaiTable_new/i_am_first.png");
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

//金币场每局获取分数的动画
PlayLayer_PaoDeKuaiTY.prototype.showGetScoreAni_filedQuick = function (off)
{   
    var headNode = getNode_cards(off).getChildByName('head');
    if(headNode.getChildByName('scoreText')){
        headNode.removeChildByName('scoreText');
    }
    var scoreText = new ccui.Text();
    var pl = getUIPlayer(off);
    if(pl.winone < 0){
        scoreText.setString(pl.winone);
        scoreText.setColor(cc.color("#ffffff"));
    }else{
        scoreText.setString('+' + pl.winone);
        scoreText.setColor(cc.color("#fff000"));
    }
    scoreText.setFontName("fonts/lanting.ttf");
    scoreText.setName("scoreText");
    scoreText.setFontSize(40);
    scoreText.setOpacity(0.5);
    if(off == 0 || off == 2){
        scoreText.setPosition(200,  0);
    }else if(off == 1){
        scoreText.setPosition(-70,  0);
    }
    headNode.addChild(scoreText);

    scoreText.runAction(cc.sequence(cc.fadeTo(0.3, 255), cc.delayTime(0.8), cc.fadeTo(0.2, 0), cc.callFunc(function () {
        scoreText.removeFromParent();
    }.bind(this))));

}
//处理金币场快速赛牌局结束时布局
PlayLayer_PaoDeKuaiTY.prototype.cardLayoutRestore_endfiledQuick = function (off)
{
    var node = getNode_cards(off);
    //隐藏牌数标记
    var tingCard = node.getChildByName('head').getChildByName("tingCard");
    if(tingCard){
        tingCard.visible = false;
    }

    //隐藏报警器
    this._spriteSingle.visible = false;

    //清除牌桌打出的牌和手牌
    var children = node.children;
    for (var i = 0; i < children.length; i++)
    {
        var ni = children[i];
        if(ni.name == "out" || ni.name == "mjhand")
        {
            ni.removeFromParent(true);
        }
    }
}
//处理金币场牌局结束时布局
PlayLayer_PaoDeKuaiTY.prototype.cardLayoutRestore_endfiled = function (off)
{
    var node = getNode_cards(off);
    //隐藏牌数标记
    var tingCard = node.getChildByName('head').getChildByName("tingCard");
    if(tingCard){
        tingCard.visible = false;
    }

    //清除牌桌打出的牌
    var children = node.children;
    for (var i = 0; i < children.length; i++)
    {
        var ni = children[i];
        if(ni.name == "out")
        {
            ni.removeFromParent(true);
        }
    }

    if(off == 0){//自己不用展示手牌
        return;
    }

    var pl = getUIPlayer(off);
    if(!pl || !pl.mjhand || pl.mjhand.length <= 0)
    {
        return;
    }

    //展示手牌
    var _deskCard = node.getChildByName("deskCard");
    var _showCards = [];
    for(var i = 0; i < pl.mjhand.length;i++)
    {
        var out = _deskCard.clone();
        out.setScale(out.getScale()*1.3);
        out.visible = true;
        if( !MjClient.isInGoldFieldNormal() && !MjClient.isInGoldFieldQuick() 
            && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) ){
            out.name = "out";
        }
        setCardSprite_card(out, pl.mjhand[i], 0,true);
        node.addChild(out);
        _showCards.push(out);
    }

    var sort = function (node)
    {
        var pointCounts = {};
        for (var i = 0; i < node.length; i++) {
            var p = MjClient.majiang.calPoint(node[i].tag);
            if (pointCounts[p])
                pointCounts[p] ++;
            else
                pointCounts[p] = 1;
        }

        var commonCmp = function (a, b) {
            var c1 = pointCounts[MjClient.majiang.calPoint(a.tag)];
            var c2 = pointCounts[MjClient.majiang.calPoint(b.tag)];
            if (c1 == c2)
                return MjClient.majiang.cardValueCmp(a.tag, b.tag);
            else
                return c1 - c2;
        }

        node.sort(function(a, b) { return -commonCmp(a, b);});
    }

    sort(_showCards);

    var outSize = _showCards[0].getSize();
    var outScale = _showCards[0].scale;
    var width = outSize.width * outScale * 0.4;
    var height = outSize.height * outScale * 0.55;
    var initPosX = 0;
    var areaWidth = (_showCards.length - 1) * width + outSize.width * outScale;
    if(_showCards.length > 10){
        areaWidth = 9 * width + outSize.width * outScale;
    }
    switch (off)
    {
        case 1:
            initPosX = _deskCard.x - areaWidth + outSize.width * outScale;
            break;
        case 2:
            initPosX = _deskCard.x;
            break;
    }

    var startX = initPosX;
    var startY = _deskCard.y;
    for(var i = 0; i < _showCards.length; i++)
    {
        _showCards[i].x = startX;
        _showCards[i].y = startY;
        _showCards[i].zIndex = i*2;
        startX += width;
        if(i == 9){
            startX = initPosX;
            startY = _deskCard.y - height;
        }
    }

    if(pl.mjdesc3 == "大关" || pl.mjdesc3 == "小关"){
        var _spPosX = initPosX + areaWidth / 2 - 50;
        var _spPosY  = startY - 15;

        if(MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN){
            _spPosY += 30;
        }

        var _index = (_showCards.length >= 10) ? (_showCards.length - 2)/2 : (_showCards.length/2 - 1);
        var _path = "gameOver/xiaoguan.png";
        if(pl.mjdesc3 == "大关"){
            _path = "gameOver/daguan.png";
        }

        if (!jsb.fileUtils.isFileExist(_path)){
            return;
        }

        var _image = new ccui.ImageView(_path);
        _image.setName("guan_Info");
        _image.setScale(0.8 * Math.min(MjClient.size.width/1280,MjClient.size.height/720));

        _image.zIndex = 9999;
        _image.setPosition(_spPosX, _spPosY);
        node.addChild(_image)
    }
}


PlayLayer_PaoDeKuaiTY.prototype.CardLayoutDesk = function(node,cards,off)
{
    //if(off != 0) return;
    var children = node.children;
    var initDesk_y = node.getChildByName("deskCard").y;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "out")
            ci.y = initDesk_y;
    }

    var outStand = node.getChildByName("deskCard");
    outStand.visible = false;

    var uiOut = [];
    var uiHun = [];//癞子牌在最左边

    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name != "out")
            continue;

        if(MjClient.data.sData.tData.hunCard == ci.tag)
            uiHun.push(ci);
        else
            uiOut.push(ci);
    }

    if (uiHun.length + uiOut.length == 0)
        return;

    var sort = function (node)
    {
        var pointCounts = {};
        for (var i = 0; i < node.length; i++) {
            var p = MjClient.majiang.calPoint(node[i].tag);
            if (pointCounts[p])
                pointCounts[p] ++;
            else
                pointCounts[p] = 1;
        }

        var commonCmp = function (a, b) {
            var c1 = pointCounts[MjClient.majiang.calPoint(a.tag)];
            var c2 = pointCounts[MjClient.majiang.calPoint(b.tag)];
            if (c1 == c2)
                return MjClient.majiang.cardValueCmp(a.tag, b.tag);
            else
                return c1 - c2;
        }

        node.sort(function(a, b) { return -commonCmp(a, b);});
    }

    sort(uiOut);

    if(uiHun.length > 0) //是否有柰子，有则放在最前面 by sking
    {
        for(var i = 0; i < uiHun.length; i++)
        {
            uiOut.unshift(uiHun[i]); //向数组开头添加一个元素 unshift
        }
    }

    var cards = [];
    for (var i = 0; i < uiOut.length; i ++)
    {
        cards[i] = uiOut[i].tag;
    }

    var outSize = uiOut[0].getSize();
    var outScale = uiOut[0].scale;

    var cardType = MjClient.majiang.cardsType(cards, MjClient.data.sData.tData.areaSelectMode);
    var width = outSize.width * outScale * 0.4;
   
    var x = 0;

    var areaWidth = (uiOut.length - 1) * width + outSize.width * outScale;
    if (cardType == MjClient.majiang.CARDTPYE.sandaiyi || cardType == MjClient.majiang.CARDTPYE.sidaier)
        areaWidth += outSize.width * outScale * 1.05;

    switch (off)
    {
        case 0:
            x = outStand.x - areaWidth/2 + outSize.width * outScale / 2;
            break;
        case 1:
            x = outStand.x - areaWidth + outSize.width * outScale;
            if(MjClient.rePlayVideo == -1)  // 表示正常游戏
            {
                if (uiOut.length >= 7)
                    x += width;
            }
            break;
        case 2:
            x = outStand.x;
            x = outStand.x + outSize.width/2 * outScale;
            if(MjClient.rePlayVideo == -1)  // 表示正常游戏
            {
                if (uiOut.length >= 6)
                    x -= width;
            }
            break;
        case 3:
            x = outStand.x;
            break;
    }

    //设置麻将大小
    for(var i = 0; i < uiOut.length; i++)
    {
        uiOut[i].x = x;
        uiOut[i].zIndex = i*2;

        if ((cardType == MjClient.majiang.CARDTPYE.sandaiyi && i == 2) || (cardType == MjClient.majiang.CARDTPYE.sidaier && i == 3))
            x += outSize.width * outScale * 1.05;
        else
            x += width;
    }
    MjClient.initDesk_y = "undefined";
};

//头像位置
PlayLayer_PaoDeKuaiTY.prototype.reConectHeadLayout_paodekuaiTY = function (node)
{
    var sData = MjClient.data.sData;
    if(MjClient.isInGoldField())
        this.reConectHeadLayout_PaoDeKuai_fieldId(node);
    else
        reConectHeadLayout_card(node);
}

//时间节点设置
PlayLayer_PaoDeKuaiTY.prototype.BgTime_run = function (node)
{
    var text = new ccui.Text();
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
        text.setFontName("fonts/lanting.TTF");
    }else{
        text.setFontName(MjClient.fzcyfont);
    }
    text.setFontSize(18);
    text.setTextColor(cc.color(222,226,199));
    text.setAnchorPoint(0.5,0.5);
    text.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
    node.addChild(text);
    text.schedule(function(){
        
        var time = MjClient.getCurrentTime();
        var str = (time[3]<10?"0"+time[3]:time[3])+":"+
            (time[4]<10?"0"+time[4]:time[4]);
        this.setString(str);
    });
}

//设置红包活动按钮位置
PlayLayer_PaoDeKuaiTY.prototype.setHongBaoPos = function (hongbaoBtn)
{
    if (!MjClient.playui.RightTopBG || !hongbaoBtn) return;
    hongbaoBtn.x = (1280 -  MjClient.playui.RightTopBG.width-50)
}

//////////////////////////金币场UI调整//////////////////////////////////////////////////////////////////////////////////////
PlayLayer_PaoDeKuaiTY.prototype.reConectHeadLayout_PaoDeKuai_fieldId= function (node)
{
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");

    setWgtLayout(right, [0.13, 0.13], [1, 1.0], [-0.6, -2.0], false, false);
    if (isIPhoneX()) {
        setWgtLayout(down, [0.13, 0.13], [0.00, 0.0], [0.6, 0.65], false, false);       
        setWgtLayout(top, [0.13, 0.13], [0.00, 1.0], [0.6, -2.0], false, false);
    }else{
        setWgtLayout(down, [0.13, 0.13], [0, 0.0], [0.6, 0.65], false, false);
        setWgtLayout(top, [0.13, 0.13], [0, 1.0], [0.6, -2.0], false, false);
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if (!MjClient.isInGoldField() || (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) )
    {
        var head_bottom = down.getChildByName("head_bottom");
        var coinbg = down.getChildByName("coinbg");
        if (!head_bottom || !coinbg)return;
        head_bottom.visible = false;
        coinbg.visible = true;
    }
}

PlayLayer_PaoDeKuaiTY.prototype.initFieldIdUI = function (node)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var fieldNode = node.getChildByName("FieldNode");
    if (!fieldNode) return;
    if (MjClient.isInGoldField())
    {
        fieldNode.visible=true;
    }
    else{
        fieldNode.visible=false;
        return;
    }
    MjClient.playui.RightTopBG = fieldNode.getChildByName("RightTopBG");
    this.BindFieldIdUI(fieldNode);

    //隐藏金币场不需要的节点
    node.getChildByName("banner").visible = false;
    node.getChildByName("voice_btn").visible = false;
    node.getChildByName("chat_btn").visible = false;

    //金币场节点位置调整
    var bottonBG = fieldNode.getChildByName("bottonBG");
    var offH = bottonBG.height*bottonBG.scaleY;

    node.getChildByName("noPutTips").y += offH;
    node.getChildByName("BtnReady").y += offH;
    node.getChildByName("BtnNoPut").y += offH;
    node.getChildByName("BtnPutCard").y += offH;
    node.getChildByName("BtnHimt").y += offH;

    var down = node.getChildByName("down");
    down.getChildByName("play_tips").y += offH;
    down.getChildByName("ready").y += offH;
    down.getChildByName("stand").y += (offH + 10 * bottonBG.scaleY);
    down.getChildByName("deskCard").y += offH;
    down.getChildByName("noPutTag").y += offH;

    var block_tuoguan = node.getChildByName("block_tuoguan");
    block_tuoguan.getChildByName("btn_tuoguan").y += offH;
    block_tuoguan.getChildByName("Text_1").y += offH;

    MjClient.clockNode.srcPosition.y += offH;
}

PlayLayer_PaoDeKuaiTY.prototype.BindFieldIdUI = function (node)
{
    var uibind = {
        bottonBG:
        {
            _run: function() {
                setWgtLayout(this, [this.width/1280, 0], [0.0, 0.0], [0, 0]);
            },
            chat_btn: {
                _click: function() {
                    var chatlayer = new ChatLayer();
                    MjClient.Scene.addChild(chatlayer);
                }
            },
            roundnumAtlas:{
                _visible : function () {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData){
                        if(MjClient.isInGoldFieldQuick()) {//金币场显示场次名称
                            return true;
                        }
                    }
                    return false;
                },
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function() {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData) return "第" + (tData.roundAll-tData.roundNum + 1)+"/"+tData.roundAll + "局";
                },
                _event: {
                    mjhand: function() {
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if (tData) return this.setString("第" + (tData.roundAll-tData.roundNum + 1)+"/"+tData.roundAll + "局");
                    }
                }
            },
            jipai_btn: {
                _run: function() {
                    this.visible = false;
                },
                _click: function() {
                    var jiPaiQiPanel = MjClient.playui.getChildByName("jiPaiQiPanel");

                    // postEvent("jiPaiQiOperation",!jiPaiQiPanel.isJiPaiQiShowing());

                    if (jiPaiQiPanel.isJiPaiQiShowing()) {
                        postEvent("jiPaiQiOperation",false);
                    } else if (MjClient.playui.isUsingJiPaiQi()) {
                        postEvent("jiPaiQiOperation",true);
                    } else {
                        var useJipaiqi = function () {
                            cc.log("this is in useJipaiqi");

                            // 使用记牌器
                            MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "useJipaiqi"}, 
                                function(rtn) {
                                    if (rtn.code == 0) {
                                        // postEvent("jiPaiQiOperation",true);
                                    } else if (rtn.message) {
                                        MjClient.showToast(rtn.message);
                                    }
                                }
                            );
                        }
                        if (MjClient.data.pinfo.jipaiqi1 > 0 || MjClient.data.pinfo.jipaiqi2 > 0) {
                            // 直接使用
                            useJipaiqi();
                        } else {
                            // 先购买
                            MjClient.gamenet.request("pkplayer.handler.getRechargeLadder", {type: "jipaiqi"}, 
                                function(rtn) {
                                    if (rtn.code == 0) {
                                        var validCommoditys = MjClient.playui.checkJiPaiQiListValid(rtn.data);

                                        if (validCommoditys)
                                            MjClient.playui.showJiPaiQiBuyingPanel(validCommoditys,useJipaiqi)
                                        else
                                            MjClient.showToast("无可用记牌器");
                                    } else if (rtn.message) {
                                        MjClient.showToast(rtn.message);
                                    }
                                }
                            );
                        }
                    }
                },
                _event:{
                    mjhand: function() {
                        MjClient.playui.setJiPaiQiEnabled(this);
                        MjClient.playui.checkJiPaiQiButtonVisible(this);
                    },
                    waitPut: function() {
                        MjClient.playui.setJiPaiQiEnabled(this);
                    },
                    initSceneData: function()
                    {
                        MjClient.playui.setJiPaiQiEnabled(this);
                        MjClient.playui.checkJiPaiQiButtonVisible(this);
                    },
                    PostCardsEnded: function()
                    {
                        MjClient.playui.setJiPaiQiEnabled(this);
                    }
                },
                jiPaiQiNum: {
                    _run: function() {
                        MjClient.playui.setJiPaiQiNum(this);
                    },
                    _event: {
                        updateInfo: function() {
                            MjClient.playui.setJiPaiQiNum(this);
                        }
                    }
                }
            },
        },
        LeftTopBG:
        {
            _run: function() {
                setWgtLayout(this, [this.width/1280, 0], [0.0, 1.0], [0, 0]);
            },
            bg_time:{
                _run:function() {
                    MjClient.playui.BgTime_run(this);
               }
            },

            wifi: {
                _run: function() {
                    MjClient.playui.updateWifiState_field(this);
                }
            }
        },
        RightTopBG:
        {
            _run: function() {
                setWgtLayout(this, [this.width/1280, 0], [1.0, 1.0], [0, 0]);
            },
            setting: {
                _click: function() {
                    var settringLayer = new SettingView();
                    settringLayer.setName("PlayLayerClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi", {uid:SelfUid(),gameType:MjClient.gameType});
                },
            },
            get_gold_btn:{
                _run: function() {
                    this.setVisible(false);
                },
                _click: function() {
                    MjClient.Scene.addChild(new goldStoreLayer());
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
                    {
                        this.setVisible(true);
                    }
                    else {
                        this.setVisible(false);
                        return;
                    }

                    var that = this
                    ShowDayTaskTips(this)
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
        }
    }
    BindUiAndLogic(node, uibind);
}

// 更新wifi信号 3张图片
PlayLayer_PaoDeKuaiTY.prototype.updateWifiState_field = function(node)
{
    var callback = function()
    {
        var ms = MjClient.reqPingPong / 1000.0;
        if(ms < 0.3)
            node.loadTexture("playing/pdkfield/wf.png");
        else if(ms < 0.6)
            node.loadTexture("playing/pdkfield/wf3.png");
        else
            node.loadTexture("playing/pdkfield/wf4.png");
    };
    node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callback), cc.delayTime(5))));
}
PlayLayer_PaoDeKuaiTY.prototype.isUsingJiPaiQi = function()
{
    var jipaiqi = MjClient.data.sData.tData.jipaiqi;
    return jipaiqi && jipaiqi.indexOf(SelfUid()) >= 0;
}

PlayLayer_PaoDeKuaiTY.prototype.createJiPaiQiPanel = function()
{
    var jiPaiQiPanel = null;
    var JiPaiQiPanel = cc.Layer.extend({
        jsBind:{
            jiPaiQiBg:{
                _run: function() {
                    setWgtLayout(this, [this.width/1280, this.height/720], [0.5, 1.0], [0, 0.5]);
                },
                _event:{
                    PKPut: function(msg) {
                        if (msg.uid == SelfUid())
                            return;

                        if (!MjClient.playui.isUsingJiPaiQi())
                            return;
                        
                        // 去除本次打出的牌
                        for (var i = 0; i < msg.card.length; i++) {
                            jiPaiQiPanel.cardsFormated[MjClient.majiang.calPoint(msg.card[i])]--;
                        }

                        jiPaiQiPanel.updateJiPaiQi(this);
                    },
                    roundEnd: function() {
                        jiPaiQiPanel.showOrHideJiPaiQi(this,false);
                    },
                    initSceneData: function(msg) {
                        if (!MjClient.playui.isUsingJiPaiQi())
                            return;

                        jiPaiQiPanel.formatCards(msg.leftCards);

                        var selfPlayer = getUIPlayer(0);

                        // 去除己方手牌
                        for (var i = 0; i < selfPlayer.mjhand.length; i++) {
                            jiPaiQiPanel.cardsFormated[MjClient.majiang.calPoint(selfPlayer.mjhand[i])]--;
                        }

                        jiPaiQiPanel.updateJiPaiQi(this);

                        if (MjClient.data.sData.tData.tState == TableState.roundFinish) {
                            jiPaiQiPanel.showOrHideJiPaiQi(this,false);
                        }
                    },
                    initJiPaiQi: function(msg) {
                        jiPaiQiPanel.formatCards(msg.leftCards);

                        // 在位置未定的情况下这样查找己方较为准确
                        var sData = MjClient.data.sData;
                        var players = sData.players;
                        var selfPlayer = null;
                        for (var uid in players) {
                            if (SelfUid() == uid)
                            {
                                selfPlayer = players[uid];
                                break;
                            }
                        }

                        // 去除己方手牌
                        for (var i = 0; i < selfPlayer.mjhand.length; i++) {
                            jiPaiQiPanel.cardsFormated[MjClient.majiang.calPoint(selfPlayer.mjhand[i])]--;
                        }

                        jiPaiQiPanel.updateJiPaiQi(this);
                        jiPaiQiPanel.showOrHideJiPaiQi(this,true);
                    },
                    jiPaiQiOperation: function(bShow) {
                        jiPaiQiPanel.showOrHideJiPaiQi(this,bShow);
                    }
                }
            }
        },
        ctor: function () {
            this._super();

            var panelUi = ccs.load("JiPaiQiPanel.json");
            BindUiAndLogic(panelUi.node,this.jsBind);
            this.addChild(panelUi.node);
        },
        formatCards: function(leftCards) {
            this.cardsFormated = {};
            var keys = [16,14,13,12,11,10,9,8,7,6,5,4,3];
            var cardsCount = keys.length;

            for (var i = 0; i < cardsCount; i++) {
                this.cardsFormated[keys[i]] = 0;
            }

            cardsCount = leftCards.length;
            for (var i = 0; i < cardsCount; i++) {
                if (leftCards[i])
                    this.cardsFormated[MjClient.majiang.calPoint(leftCards[i])]++;
            }
        },
        updateJiPaiQi: function(jiPaiQiBg) {
            var textColors = [cc.color(221,86,31),cc.color(151,151,151)];

            for (var key in this.cardsFormated) {
                var cardCount = this.cardsFormated[key];
                var textNode = jiPaiQiBg.getChildByName(parseInt(key));

                if (!textNode)
                    continue;

                textNode.setString(cardCount);
                textNode.setColor(cardCount > 0 ? textColors[0] : textColors[1]);
            }
        },
        showOrHideJiPaiQi: function(jiPaiQiBg,bShow) {
            this.jiPaiQiShowing = bShow;

            jiPaiQiBg.stopAllActions();

            if (bShow)
                jiPaiQiBg.runAction(cc.sequence(cc.moveTo(0.3, MjClient.size.width/2, MjClient.size.height - (jiPaiQiBg.getContentSize().height/2 + 10) * jiPaiQiBg.getScale()).easing(cc.easeSineOut())));
            else
                jiPaiQiBg.runAction(cc.sequence(cc.moveTo(0.3, MjClient.size.width/2, MjClient.size.height + jiPaiQiBg.getContentSize().height * jiPaiQiBg.getScale() / 2).easing(cc.easeSineIn())));
        },
        isJiPaiQiShowing: function() {
            return this.jiPaiQiShowing;
        }
    });

    jiPaiQiPanel = new JiPaiQiPanel();
    MjClient.playui.addChild(jiPaiQiPanel,600,"jiPaiQiPanel");
}

// 记牌器购买面板
PlayLayer_PaoDeKuaiTY.prototype.showJiPaiQiBuyingPanel = function(commoditys,purchaseCallback) {
    var buyingPanel = null;
    var JiPaiQiBuyingPanel = cc.Layer.extend({
        jsBind:{
            block:{
                _event:{
                    roundEnd:function(){
                        buyingPanel.removeFromParent();
                    },
                    initSceneData: function(){
                        buyingPanel.removeFromParent();
                    }
                }
            }
        },
        ctor: function () {
            this._super();

            var panelUi = ccs.load("JiPaiQiBuyingPanel.json");
            BindUiAndLogic(panelUi.node,this.jsBind);
            this.addChild(panelUi.node);

            var _block = panelUi.node.getChildByName("block");
            setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

            var _back = panelUi.node.getChildByName("back");
            setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);

            var btn_close = _back.getChildByName("btn_close");
            btn_close.addTouchEventListener(function(sender,type){
                switch (type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        this.removeFromParent();
                        break;
                    default :
                        break;
                }
            },this);

            var confirmCallBack = function(commodityID) {
                // 发送购买消息

                //MjClient.block();

                MjClient.gamenet.request("pkplayer.handler.purchaseCardHolder", {id: commodityID}, 
                    function(rtn) {
                        //MjClient.unblock();
                        if(!sys.isObjectValid(buyingPanel)){
                            return;
                        }

                        if (rtn.code == 0) {
                            buyingPanel.removeFromParent();

                            purchaseCallback();
                        } else if (rtn.message) {
                            cc.log("rtn.message rtn.message = " + rtn.message);
                            MjClient.showToast(rtn.message);
                        }
                    }
                );
            }

            var itemList = _back.getChildByName("itemList");
            var firstItem = itemList.getChildByName("item");
            var commoditysCount = commoditys.length;
            for (var i = 0; i < commoditysCount; i++) {
                var item = i == 0 ? firstItem : firstItem.clone();
                if (i != 0)
                    itemList.insertCustomItem(item, i);
                this.itemsBind(item, commoditys[i], confirmCallBack);
            }
        },
        itemsBind: function(item, commodity, confirmCallBack) {
            var bind = {
                btnBuy: {
                    _click: function() {
                        if (MjClient.data.pinfo.gold < commodity.lowerLimit) {
                            MjClient.showToast("金币大于" + commodity.lowerLimit + "才可购买");
                            return;
                        }

                        if (MjClient.data.pinfo.gold < commodity.amount) {
                            MjClient.showToast("金币不足");
                            return;
                        }

                        var content;
                        if (commodity.os == "jipaiqi1")
                            content = "确定使用" + commodity.amount + "金币购买记牌器" + commodity.money + "个吗？"
                        else
                            content = "确定使用" + commodity.amount + "金币购买记牌器" + commodity.money + "天吗？"
                       
                        MjClient.showMsg(content, function () {
                            confirmCallBack(commodity.id);
                        }, function(){}, 1);
                    }
                }
            }

            BindUiAndLogic(item, bind);

            cc.log("commodity commodity " + JSON.stringify(commodity));

            item.getChildByName("costLabel").setString(getJinbiStrEx(commodity.amount));
            item.getChildByName("itemTitle").setString(commodity.title);
        },
    });

    var buyingPanel = new JiPaiQiBuyingPanel();
    MjClient.playui.addChild(buyingPanel,500);
}

PlayLayer_PaoDeKuaiTY.prototype.setJiPaiQiEnabled = function(node) {
    var tData = MjClient.data.sData.tData;
    var enabled = tData.tState != TableState.waitJoin && 
        tData.tState != TableState.roundFinish && 
        tData.tState != TableState.waitReady && 
        tData.tState != TableState.waitCard &&
        !MjClient.playui.isFaPai;

    node.setBright(enabled);
    node.setTouchEnabled(enabled);
}

PlayLayer_PaoDeKuaiTY.prototype.setJiPaiQiNum = function(node) {
    if (MjClient.data.pinfo.jipaiqi2 > 0)
        node.setString(MjClient.data.pinfo.jipaiqi2 + "天");
    else if (MjClient.data.pinfo.jipaiqi1 > 0)
        node.setString(MjClient.data.pinfo.jipaiqi1 + "个");
    else
        node.setString("0个");
}

PlayLayer_PaoDeKuaiTY.prototype.checkJiPaiQiListValid = function(commoditys) {
    if (!commoditys || commoditys.length <= 0)
        return null;

    var validCommoditys = [];
    for (var i = 0; i < commoditys.length; i++) {
        if (commoditys[i].money && commoditys[i].money > 0)
            validCommoditys.push(commoditys[i]);
    }

    if (validCommoditys[0])
        return validCommoditys;
    else
        return null;
}

PlayLayer_PaoDeKuaiTY.prototype.checkJiPaiQiButtonVisible = function(node) {
    if (MjClient.isInGoldFieldQuick()) {
        node.visible = false;
        return;
    }

    if (MjClient.playui.isUsingJiPaiQi() || 
        MjClient.data.pinfo.jipaiqi1 > 0 || 
        MjClient.data.pinfo.jipaiqi2 > 0)
        node.visible = true;
    else {
        node.visible = false;

        // 根据是否配置了记牌器商品显隐记牌器按钮
        MjClient.gamenet.request("pkplayer.handler.getRechargeLadder", {type: "jipaiqi"}, 
            function(rtn) {
                this.visible = (rtn.code == 0 && MjClient.playui.checkJiPaiQiListValid(rtn.data));
            }.bind(node)
        );
    }
}

PlayLayer_PaoDeKuaiTY.prototype.reLoadOptBtnRes = function() {
    //出牌按钮
    if(this._btnPutCard) this._btnPutCard.loadTextures("playing/paodekuaiTable_new/chupai.png", null, "playing/paodekuaiTable_new/chupai_2.png");
    //提示按钮  
    if(this._btnHimt) this._btnHimt.loadTextures("playing/paodekuaiTable_new/tishi.png", null, "playing/paodekuaiTable_new/tishi_s.png");
     //不出按钮   
    if(this._btnNoPut) this._btnNoPut.loadTextures("playing/paodekuaiTable_new/buchu.png", null, "playing/paodekuaiTable_new/buchu_s.png");
}