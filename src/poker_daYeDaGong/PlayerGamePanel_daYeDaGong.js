
var GameOverLayer_DaYeDaGong =  GameOverLayer_Poker.extend({
    ctor: function() {
        this._super();
    },
    getPlayInfo: function(){
        var tData = MjClient.data.sData.tData;
        var str = "";
        
        str += tData.areaSelectMode.showHandCount ? "显示手牌数," : "" ;
        str += tData.areaSelectMode.catPartnerCards  ? "可看队友手牌," : "" ;
        str += tData.areaSelectMode.laiziPoint == 2 ? "癞子为2," : "癞子为3," ;

        str += ("积分底分x" + tData.areaSelectMode.jieSuanDiFen) ; 
        
        if (str.charAt(str.length - 1) == ",")
            str = str.substring(0, str.length - 1);

        return str;
    },
    setListInfo: function(node, _listInfo){
        var listView = node;
        var pl = _listInfo.pl;

        var max = -9999999999;
        var all = 0;
        var loseCount = 0;
        var winCount = 0;
        for(var i = 0; i < pl.roomStatistics.length ; i ++){
            
            if(pl.roomStatistics[i] != null && typeof(pl.roomStatistics[i]) != "undefined"){
                if(pl.roomStatistics[i] > max){
                    max = pl.roomStatistics[i];
                }

                if(pl.roomStatistics[i] > 0 ){
                    winCount++;
                }

                if(pl.roomStatistics[i] < 0){
                    loseCount++;
                }

                all += pl.roomStatistics[i];
            }
        }
          
        for(var i = 0;i < 3;i++){
            listView.pushBackDefaultItem();
            var children = listView.children;
            var insertItem = children[children.length-1];

            insertItem.getChildByName("title").setString("第" + (i+1) + "局");
            var scoreLabel = insertItem.getChildByName("score");
            scoreLabel.ignoreContentAdaptWithSize(true);
            insertItem.getChildByName("title").ignoreContentAdaptWithSize(true);

            if(i == 0)
            {
                insertItem.getChildByName("title").setString("牌局输赢");
                scoreLabel.setString(all);
            }
            else if(i == 1)
            {
                insertItem.getChildByName("title").setString("单局最高");
                scoreLabel.setString(max);
            }
            else if(i == 2)
            {
                insertItem.getChildByName("title").setString("胜负局数");
                scoreLabel.setString(winCount + "赢" +  loseCount + "输");
            }
        }
    },
    
});

//初始化玩家金币和名字
function InitUserCoinAndName_DaYeDaGong(node, off)
{
    var pl = getUIPlayer(off);
    if(!pl)
    {
        return;
    }
    var bind =
        {
            head:
                {
                    name:
                        {
                            _text: function()
                            {
                                var _nameStr = unescape(pl.info.nickname );
                                return getNewName(_nameStr);
                            }
                        },
                    coin:
                        {

                            _text:function ()
                            {
                                //node.setString(count);
                                return ""+pl.winall;
                            }
                        }
                }
        }

    //add by sking
    var name = node.getChildByName("head").getChildByName("name");
    name.ignoreContentAdaptWithSize(true);
    var coin=node.getChildByName("head").getChildByName("coin");

    //coin.ignoreContentAdaptWithSize(false);
    coin.setContentSize(100,21);
    BindUiAndLogic(node, bind);
}

// off 是四个位置，根据off 显示四个位置的信息 by sking
function SetUserVisible_DaYeDaGong(node, off)
{
    var pl = getUIPlayer(off);
    var head = node.getChildByName("head");
    var name = head.getChildByName("name");
    var nobody = head.getChildByName("nobody");
    var coin = head.getChildByName("coin");
    var offline = head.getChildByName("offline");
    var name_bg = head.getChildByName("name_bg");
    var score_bg = head.getChildByName("score_bg");
    var zhua_bg = head.getChildByName("zhua_bg");
    var zhua = head.getChildByName("zhua");

    var flyScore_0 = head.getChildByName("flyScore_0");
    var flyScore_1 = head.getChildByName("flyScore_1");
    flyScore_0.visible = false;
    flyScore_1.visible = false;

    if(pl)
    {
        name.visible = true;
        coin.visible = true;
        offline.visible = true;
        coin.visible = true;
        zhua.visible = true;
        // name_bg.visible = true;
        score_bg.visible = true;
        zhua_bg.visible = true;
        MjClient.loadWxHead(pl.info.uid, pl.info.headimgurl);
        setUserOffline(node, off);
        InitUserHandUI_DaYeDaGong(node, off);
    }
    else
    {
        name.visible = false;
        coin.visible = false;
        offline.visible = false;
        coin.visible = false;
        zhua.visible = false;
        // name_bg.visible = false;
        score_bg.visible = false;
        zhua_bg.visible = false;

        var WxHead = nobody.getChildByName("WxHead");
        if(WxHead)
            WxHead.removeFromParent(true);
    }
}


function InitUserHandUI_DaYeDaGong(node, off)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = getUIPlayer(off);

    if(!pl)
    {
        return;
    }

    //初始化玩家金币和名称
    InitUserCoinAndName_DaYeDaGong(node, off);
    setAreaTypeInfo(true);
    currentLeftCardCount_NiuShiBie(off);

    //几游标签
    var uiYou = node.getChildByName("head").getChildByName("icon_you");
    if (pl.rank > 0)
    {
        uiYou.visible = true;
        uiYou.loadTexture("playing/damazi/ui_you" + pl.rank + ".png");        
    }
    else
        uiYou.visible = false;



    //initSortUI();

    if(
        tData.tState != TableState.waitPut &&
        tData.tState != TableState.waitEat &&
        tData.tState != TableState.waitCard && 
        tData.tState != TableState.waitBaoXi && 
        tData.tState != TableState.waitJiazhu && 
        tData.tState != TableState.waitTouXiang
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

                if( tData.zhuang >= 0 && (SelfUid() != tData.uids[tData.zhuang])){
                    MjClient.playui.addJiPaiTag(card); 
                }
                
            }

            // if (tData.areaSelectMode.fangZuoBi && tData.lastPutPlayer == -1 && tData.curPlayer != getPlayerIndex(0))
            // {
            //     MjClient.playui.isShowHandCardBeiMain = true;
            //     MjClient.playui.showHandCardBeiMian();
            // }
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

    MjClient.playui.CardLayoutRestore(node, off);
}

function isMyTurnToBaoxi(curBaoxi)
{
    if (curBaoxi == null || cc.isUndefined(curBaoxi))
        return false;

    var tData = MjClient.data.sData.tData;
    return SelfUid() == tData.uids[curBaoxi];
}

function isMyTurnToQiang(curPlayer)
{
    if (curPlayer == null || cc.isUndefined(curPlayer))
        return false;

    var tData = MjClient.data.sData.tData;
    return SelfUid() == tData.uids[curPlayer];
}

var PlayLayer_DaYeDaGong = cc.Layer.extend({
    _btnPutCard:null,
    jsBind: {
        _event: {
            mjhand: function() {
                if (MjClient.endoneui != null && cc.sys.isObjectValid(MjClient.endoneui)) {
                    cc.log("=======mjhand====endoneui====" + typeof (MjClient.endoneui) );
                    MjClient.endoneui.removeFromParent(true);
                    MjClient.endoneui = null;
                }

                var sData = MjClient.data.sData;
                var tData = sData.tData;
                // resetFlowerNum(this);
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
                    if(cc.sys.OS_WINDOWS != cc.sys.os)
                    {
                        //AlertSameIP(ipmsg.join("\n"));
                    }
                }
                
                mylog("ipmsg " + ipmsg.length);

            },
            LeaveGame: function() {
                MjClient.addHomeView();
                MjClient.playui.removeFromParent(true);
                delete MjClient.playui;
                delete MjClient.endoneui;
                delete MjClient.endallui;
                cc.audioEngine.stopAllEffects();
                playMusic("bgMain");
            },
            endRoom: function(msg) {
                mylog(JSON.stringify(msg));
                if (msg.showEnd) this.addChild(new GameOverLayer_DaYeDaGong(),500);
                else
                    MjClient.Scene.addChild(new StopRoomView());
            },
            roundEnd: function() {
                MjClient.selectTipCardsArray = null;

                var self = this;
                function delayExe()
                {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;

                    MjClient.playui.curQiang = null;

                    if(tData.tState && tData.tState !=TableState.roundFinish){
                        return;
                    }

                    //resetEatActionAnim();
                    if(!sData.tData.fieldId){
                        if (sData.tData.roundNum <= 0) {
                            if(!tData.matchId) {
                                
                            }else {
                                self.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                                    self.addChild(new GameOverLayer_DaYeDaGong(),500);
                                })))
                            }
                        }
                    }


                    var _lay = self.getChildByTag(650);
                    if(_lay){
                        _lay.removeFromParent();
                    }

                    self.addChild(new EndOneView_daYeDaGong(),500,650);
                    // cc.log("-------tData.zhuangPartner------tData.chickenCard---tData.zhuangPartnerHidden", tData.zhuangPartner, tData.chickenCard,
                    //     tData.zhuangPartnerHidden)
                    MjClient.playui.resetRoundData();
                }
                delayExe();
                //this.runAction(cc.sequence(cc.DelayTime(1.0),cc.callFunc(delayExe)));
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
                {
                    reConectHeadLayout_card(this);
                }

                

                //MjClient.playui.setDownMenusEnabled();
            },
            moveHead: function() {
                postEvent("returnPlayerLayer");
                
                reConectHeadLayout_card(this);
                sendGPS();
                MjClient.checkChangeLocationApp();
            },
            initSceneData: function() {
                if(MjClient.endoneui != null && cc.sys.isObjectValid(MjClient.endoneui))
                {
                    MjClient.endoneui.removeFromParent(true);
                }
                MjClient.endoneui = null;
                //初始化桌子的客户端数据
                MjClient.playui.InitC_Data();

                reConectHeadLayout_card(this);
                CheckRoomUiDelete();

                var sData = MjClient.data.sData;
                var tData = sData.tData;

                // 创建投降UI
                if (tData.tState == TableState.waitTouXiang && !MjClient.touxiangUI)
                    MjClient.playui.createTouXiangView(sData.TouXiangData)
                
                if (!MjClient._LAST_FIELD && tData.fieldId){
                    MjClient._LAST_FIELD = {fieldId:tData.fieldId};
                }
                if(tData.tState == TableState.waitPut )
                {
                    UpdataCurrentPutCard();
                }

                for(var i = 0;i < MjClient.MaxPlayerNum;i++)
                {
                    currentLeftCardCount_NiuShiBie(i);
                }

                if(tData.tState <= TableState.waitReady)
                {
                    sendGPS();
                    MjClient.checkChangeLocationApp();
                }
                if (IsTurnToMe()) {
                    // 如果提示只有一手牌， 自动提起
                    // 如果提示只有一手牌， 且是我全部的手牌数量， 自动打出
                    //AutoPutLastCard_card_ty();
                }

                if(tData.tState === TableState.waitJoin || tData.tState === TableState.waitReady || tData.tState === TableState.roundFinish)
                {
                    MjClient.playui.resetRoundData()
                }

                //MjClient.playui.UpdataDaMaZiTips();

                //MjClient.playui.setDownMenusEnabled();

                MjClient.playui.onClickLiPai();

                //重新加载下操作按钮资源
                MjClient.playui.reLoadOptBtnRes();

                MjClient.playui.dealZhuangMing();
                MjClient.playui.showIdentityIcon(null);
                MjClient.playui.setChickenCardIcon(null);

                for(var i = 0 ; i < MjClient.MaxPlayerNum; i++){
                    MjClient.playui.showQiangZhuangTag(i, null);
                }
            },
            onlinePlayer: function(msg) {
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
            TouXiang: function(msg) {
                // 创建投降UI
                var stateArray = msg.stateAry;
                var result = 0;
                for (var uid in stateArray) {
                    result += stateArray[uid];
                }
                if (!MjClient.touxiangUI && result == -1)
                {
                    MjClient.playui.createTouXiangView(msg)
                }
            },
            changePKImgEvent: function() {
                changePKImg(this, getCurrentPKImgType());
            },
            beTrust:function (msg) {//{uid: pl.uid};
                var sData = MjClient.data.sData;
                var pl = sData.players[msg.uid];
                if(pl){
                    pl.trust = true;
                }
            },
            cancelTrust:function (msg) {
                var sData = MjClient.data.sData;
                var pl = sData.players[msg.uid];
                if(pl){
                    pl.trust = false;
                }
            },
            PKPut: function(eD) {
                if (eD.uid == SelfUid())
                {
                    //MjClient.playui.UpdataDaMaZiTips();
                }
                cc.log("----------------55555dfgdfgdfgdfg-------")
                MjClient.playui.showIdentityIcon(eD); 
                MjClient.playui.setChickenCardIcon(eD); 

                MjClient.clockNode.visible = false;
            },
            PKPass:function(eD)
            {
                MjClient.clockNode.visible = false;
            },
            PostCardsEnded: function()
            {
                //MjClient.playui.setDownMenusEnabled();
                MjClient.playui.onClickLiPai();
            },
            Baoxi: function(eD) {
                MjClient.playui.showBaoxiAnimation(eD);
            },
            clearCardUI: function() {
                clearPostingCards();
            },
            waitPut: function() {
                //重新加载下操作按钮资源
                MjClient.playui.reLoadOptBtnRes();

                for(var i = 0 ; i < MjClient.MaxPlayerNum; i++){
                    MjClient.playui.showQiangZhuangTag(i, null);
                }
            },
            waitBaoxi: function(msg) {
                //重新加载下操作按钮资源
                MjClient.playui.reLoadOptBtnRes();
            },
            s2cQiangZhuang: function(msg) {
                MjClient.playui.showMingAnim(msg);
            },
            partnerJieFeng: function(msg){
                MjClient.playui.showJieFengAnim(msg);
            },
            updatePlayerZhuaFen: function(msg){
                MjClient.playui.showFlyZhuaFenAnim(msg);
            },
            playerXiFen: function(msg){
                MjClient.playui.showXiFenAnim(msg);
            },
            
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
                _layout: [
                    [1, 1],
                    [0.5, 0.5],
                    [0, 0], true
                ],
            },
        },
        info:
        {
            _layout: [
                [0.16, 0.16],
                [0.01, 0.935],
                [0, 0]
            ]
        },
        gameName:{
            _run:function()
            {
                this.visible =true
                this.loadTexture(GameBg[MjClient.gameType]);
                setWgtLayout(this,[0.249, 0.104],[0.5, 0.58],[0, 0]);
            }
        },
        roundInfo:{
            _run:function()
            {
                setWgtLayout(this,[0.12, 0.12],[0.5, 0.52],[0, 0]);

                var tData = MjClient.data.sData.tData;
                var str = MjClient.playui.getGameInfoString("roundInfo");
                this.setString(str);
                this.ignoreContentAdaptWithSize(true);

                if(tData.matchId && tData.matchInfo){
                    if(MjClient.matchRank){
                        showPlayUI_matchInfo("排名："+MjClient.matchRank+"/"+tData.matchInfo.userCount+"\n前"+tData.matchInfo.jingjiCount+"名晋级");
                    }else {
                        showPlayUI_matchInfo("排名："+tData.matchInfo.userCount+"/"+tData.matchInfo.userCount+"\n前"+tData.matchInfo.jingjiCount+"名晋级");
                    }
                }
            },
            _event:{
                mjhand:function()
                {
                    var tData = MjClient.data.sData.tData;
                    var str = MjClient.playui.getGameInfoString("roundInfo");
                    this.setString(str);
                },
            }
        },
        deskScoreBg:{
            _run:function()
            {
                setWgtLayout(this,[this.width/1280, this.height/720],[0.5, 0.65],[0, 0]);
            },
            deskScore:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                    this.setString("0");
                },
                _event:{
                    updateRoundZhuaFen:function(msg){
                        
                        var tData = MjClient.data.sData.tData;
                        if( msg.roundZhuaFen != null){
                            this.setString("" + msg.roundZhuaFen);
                        }
                        
                    },
                    waitPut:function()
                    {
                        var tData = MjClient.data.sData.tData;
                        this.setString("" + (tData.roundZhuaFen ? tData.roundZhuaFen : 0 ));
                    },
                    initSceneData: function() {
                        var tData = MjClient.data.sData.tData;
                        this.setString("" + (tData.roundZhuaFen ? tData.roundZhuaFen : 0));
                    },
                    mjhand:function()
                    {
                        this.setString("0");
                    }
                }
            },
        },
        banner: {
            _layout: [
                [0.5, 0.5],
                [0.53, 1],
                [0, 0]
            ],
            bg_time:{
                 _run:function()
                {
                    var text = new ccui.Text();
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
                        text.setFontName("fonts/lanting.TTF");
                    }else{
                        text.setFontName(MjClient.fzcyfont);
                    }
                    text.setFontSize(18);
                    text.setTextColor(cc.color(222,226,199));
                    text.setAnchorPoint(0.5,0.5);
                    text.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
                    this.addChild(text);
                    text.schedule(function(){
                        
                        var time = MjClient.getCurrentTime();
                        var str = (time[3]<10?"0"+time[3]:time[3])+":"+
                            (time[4]<10?"0"+time[4]:time[4]);
                        this.setString(str);
                    });
                }

            },
            wifi: {
                _run: function() {
                    updateWifiState_new(this);
                }
            },
            roundnumAtlas:{
                _visible : function () {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData){
                        if(tData.fieldId) {//金币场显示场次名称
                            return false;
                        }
                    }
                    return true;
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
            powerBar: {
                _run: function() {
                    //cc.log("powerBar_run");
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
                    if(MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId){//金币场显示场次名称
                        this.setString(MjClient.data.sData.tData.fieldTitle+"   底分"+getJinbiStr(MjClient.data.sData.tData.fieldBase)+"金币");
                    }
                },
                _event: {
                    initSceneData: function() {
                        this.ignoreContentAdaptWithSize(true);
                        if(MjClient.data.sData.tData.fieldId){//金币场显示场次名称
                            this.setString(MjClient.data.sData.tData.fieldTitle+"   底分"+getJinbiStr(MjClient.data.sData.tData.fieldBase)+"金币");
                        }else{
                            this.setString("房间号：" + MjClient.data.sData.tData.tableid);
                        }

                    }
                }
            },
            setting: {
                _click: function() {
                    var settringLayer = new NiuShiBieSetting();
                    settringLayer.setName("PlayLayerClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi", {uid:SelfUid(),gameType:MjClient.gameType});
                },
            },
            gps_btn: {
                _run: function() {
                    this.setVisible((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) && MjClient.MaxPlayerNum != 2 && !MjClient.data.sData.tData.fieldId);
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
            youPai_top:{
                _run: function() {
                    this.visible = false;
                },
                _event:{
                    waitPut:function()
                    {   
                        var tData = MjClient.data.sData.tData;

                        //this.visible = tData.chickenCard != -1 && tData.chickenCard != null;
                    },
                    initSceneData: function(){
                        var tData = MjClient.data.sData.tData;

                        this.visible = (tData.chickenCard != -1  && tData.chickenCard != null);
                        MjClient.playui.showYouPai();

                        if( tData.tState == TableState.isReady || tData.tState == TableState.roundFinish || tData.tState == TableState.waitJiazhu){
                            this.visible = false;
                        }
                    },
                    roundEnd: function(){
                        this.visible = false;
                    }
                    
                }   
            },

            tongji: {
                _run: function() {
                    this.visible = false;
                },
                ourSide: {
                    _run: function() {
                        this.setString("0");
                    },
                    // _event: {
                    //     waitPut: function() {
                    //         MjClient.playui.setPlayerZhuaFen(this,0,2);
                    //     },
                    //     roundEnd: function() {
                    //         MjClient.playui.setPlayerZhuaFen(this,0,2);
                    //     },
                    //     initSceneData: function() {
                    //         MjClient.playui.setPlayerZhuaFen(this,0,2);
                    //     },
                    //     mjhand: function() {
                    //         MjClient.playui.setPlayerZhuaFen(this,0,2);
                    //     }
                    // }
                },
                oppositeSide: {
                    _run: function() {
                        this.setString("0");
                    },
                    // _event: {
                    //     waitPut: function() {
                    //         MjClient.playui.setPlayerZhuaFen(this,1,3);
                    //     },
                    //     roundEnd: function() {
                    //         MjClient.playui.setPlayerZhuaFen(this,1,3);
                    //     },
                    //     initSceneData: function() {
                    //         MjClient.playui.setPlayerZhuaFen(this,1,3);
                    //     },
                    //     mjhand: function() {
                    //         MjClient.playui.setPlayerZhuaFen(this,1,3);
                    //     }
                    // }
                },
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
                    if( MjClient.data.sData.tData.fieldId)return false;
                    return !MjClient.remoteCfg.guestLogin;
                },
                _click: function() {
                    getPlayingRoomInfo(1);
                }
            },
            wxinvite: {
                _layout: [[0.2, 0.2],[0.5, 0.4],[0, 0]],
                _click: function() {
                    getPlayingRoomInfo(2);
                },
                _visible:function()
                {
                    if( MjClient.data.sData.tData.fieldId)return false;
                    return !MjClient.remoteCfg.guestLogin;
                }
            },
            _event: {
                onlinePlayer: function() {
                    if( IsAllPlayerReadyState() ) {
                    } 
                },
                initSceneData: function(eD) {
                    var isWaitReady = eD.tData.tState == TableState.waitReady;
                    this.getChildByName('getRoomNum').visible = false;//IsInviteVisible();
                    this.getChildByName('wxinvite').visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
                },
                addPlayer: function(eD) {
                    var isWaitReady = eD.tData.tState == TableState.waitReady;
                    console.log(">>>>>> play add player >>>>");
                    this.getChildByName('getRoomNum').visible = false;//IsInviteVisible();
                    this.getChildByName('wxinvite').visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
                },
                removePlayer: function(eD) {
                    var isWaitReady = eD.tData.tState == TableState.waitReady;
                    this.getChildByName('getRoomNum').visible = false;//IsInviteVisible();
                    this.getChildByName('wxinvite').visible = !MjClient.remoteCfg.guestLogin;
                }
            }
        },
        BtnHimt:{ //add by  sking for put card button
            _run: function () {
                this.visible = false;

                if(isIPhoneX())
                    setWgtLayout(this,[0.15, 0.14], [0.535, 0.46], [0, 0.26]);
                else
                    setWgtLayout(this,[0.15, 0.14], [0.535, 0.39], [0, 0.26]);

                this.srcX = this.x;
            },
            _click: function(btn) {
                postEvent("CloseSelectPutCardsPanel");

                putOutCardTips();
                playEffect("guandan/tishi");
            },
            _event:{
                //拿到一张牌的时候，出牌按钮亮起，其他状态隐藏，by sking
                PKPut: function(eD) {
                    //cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PKPut by sking");
                    this.visible = false;
                },
                waitPut: function() {
                    var tData = MjClient.data.sData.tData;
                    if(!IsTurnToMe() || tData.tState != TableState.waitPut || MjClient.playui.isFaPai)
                    {
                        this.visible = false;
                    }
                    else
                    {
                        this.visible = true;
                    }
                },
                initSceneData: function()
                {
                    var tData = MjClient.data.sData.tData;
                    if(!IsTurnToMe() || tData.tState != TableState.waitPut || MjClient.playui.isFaPai)
                    {
                        this.visible = false;
                    }
                    else
                    {
                        this.visible = true;
                    }
                },
                PostCardsEnded: function()
                {
                    var tData = MjClient.data.sData.tData;
                    if(IsTurnToMe() && tData.tState == TableState.waitPut && !MjClient.playui.isFaPai)
                    {
                        this.visible = true;
                    }
                }
            }
        },
        BtnReady: {
            _visible: false,
            _run: function() {
                setWgtLayout(this,[0.2, 0.2], [0.5, 0.4], [0, 0]);
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
                    setWgtLayout(this,[0.15, 0.14], [0.555, 0.46], [-1.3, 0.26]);
                else
                    setWgtLayout(this,[0.15, 0.14], [0.555, 0.39], [-1.3, 0.26]);

                this.srcX = this.x;
            },
            _click: function(btn) {
                PKPassConfirmToServer_card({cmd: "PKPass",Opt : 2/*点不出过*/});
                btn.visible = false;
            },
            _event:{
                // 不出按钮 可以过牌的时候亮
                PKPut: function(eD) {
                    this.visible = false;
                },
                waitPut: function() {
                    var tData = MjClient.data.sData.tData;
                    this.visible = (IsTurnToMe() && tData.tState == TableState.waitPut && !MjClient.playui.isFaPai && 
                                            tData.lastPutPlayer != tData.curPlayer && tData.lastPutPlayer != -1);
                },
                initSceneData: function()
                {
                    var tData = MjClient.data.sData.tData;
                    this.visible = (IsTurnToMe() && tData.tState == TableState.waitPut && !MjClient.playui.isFaPai && 
                                            tData.lastPutPlayer != tData.curPlayer && tData.lastPutPlayer != -1);
                },
                PostCardsEnded: function()
                {
                    var tData = MjClient.data.sData.tData;
                    this.visible = (IsTurnToMe() && tData.tState == TableState.waitPut && !MjClient.playui.isFaPai && 
                                            tData.lastPutPlayer != tData.curPlayer && tData.lastPutPlayer != -1);
                }
            }
        },
        BtnPutCard:{
            _run: function () {
                this.visible = false;

                if(isIPhoneX())
                    setWgtLayout(this,[0.15, 0.14], [0.515, 0.46], [1.3, 0.32]);
                else
                    setWgtLayout(this,[0.15, 0.14], [0.515, 0.39], [1.3, 0.32]);

                this.srcX = this.x;
            },
            _click: function(btn) {
                MjClient.playui.cardsSort(MjClient.selectCards_card);
                PutOutCard_card(); //可以出牌
                btn.visible = false;
            },
            _event:{
                //拿到一张牌的时候，出牌按钮亮起，其他状态隐藏，by sking
                PKPut: function(eD) {
                    //cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PKPut by sking");
                    this.visible = false;
                },

                waitPut: function() {
                    var tData = MjClient.data.sData.tData;
                    this.visible = IsTurnToMe() && tData.tState == TableState.waitPut && !MjClient.playui.isFaPai;
                },
                initSceneData: function()
                {
                    var tData = MjClient.data.sData.tData;
                    this.visible = IsTurnToMe() && tData.tState == TableState.waitPut && !MjClient.playui.isFaPai;
                },
                PostCardsEnded: function()
                {
                    var tData = MjClient.data.sData.tData;
                    this.visible = IsTurnToMe() && tData.tState == TableState.waitPut && !MjClient.playui.isFaPai;
                }
            }
        },//end of add by sking
        noPutTips:{ //add by  sking for put card button
            _run: function () {
                this.visible = false;
                setWgtLayout(this,[0.39, 0], [0.5, 0.1], [0, 0]);
            },
            _event:{
                clearCardUI:function()
                {
                    this.visible = false;
                },
                mjhand:function()
                {
                    this.visible = false;
                },
            }
        },
        PartnerTips:{ 
            _run: function () {
                this.visible = false;
                setWgtLayout(this,[0.39, 0], [0.5, 0.1], [0, 0]);
            },
        },

        flyCard:{
            _run: function() {
                this.visible = false;
            },
            _event:{
                changePosition:function(msg) {
                    setWgtLayout(this,[0.036, 0], [0.5, 0.75], [0, 0]);

                    // if(!MjClient.playui.isFaPai)
                    //     MjClient.playui.changePosition(msg,this)
                    // else {
                    //     MjClient.playui.positionChangedMsg = msg;
                    //     MjClient.playui.positionOriginalUids = MjClient.data.sData.tData.uids.slice();
                    // }
                },
                PostCardsEnded: function()
                {
                    // if(!MjClient.playui.isFaPai)
                    // {
                    //     MjClient.playui.changePosition(MjClient.playui.positionChangedMsg,this,MjClient.playui.positionOriginalUids)
                    //     MjClient.playui.positionChangedMsg = null;
                    //     MjClient.playui.positionOriginalUids = null;
                    // }
                },
            }
        },

        youPai_centre:{
            _run: function() {
                this.visible = false;
                this.zIndex = 499;
                setWgtLayout(this,[0.25, 0.25], [0.5, 0.65], [0, 0]);

                MjClient.playui.srcPos.youPai_centre = this.getPosition();
            },
            _event:{
                waitPut:function()
                {   

                    var tData = MjClient.data.sData.tData;
                    var _show = (tData.chickenCard != -1 && tData.chickenCard != null);
                    if(_show && tData.lastPutPlayer == -1 ){

                        MjClient.playui.youPai_centre.setPosition(MjClient.playui.srcPos.youPai_centre);

                        MjClient.playui.showYouPaiAnim(this, tData.chickenCard);
                    }
                },
            }   
        },

        flyIcon_ming:{
            _run: function() {
                this.visible = false;
                this.zIndex = 499;
                setWgtLayout(this,[0.05, 0.106], [0.5, 0.75], [0, 0]);

                MjClient.playui.srcPos.flyIcon_ming = this.getPosition();
            },
            _event:{
                waitPut:function()
                {   
                },
            }   
        },

        flyZhuaFen:{
            _run: function() {
                this.visible = false;
                this.zIndex = 499;
                setWgtLayout(this,[0.1, 0.1], [0.5, 0.7], [0, 0]);

                MjClient.playui.srcPos.flyZhuaFen = this.getPosition();
            },
            _event:{
                waitPut:function()
                {   
                },
            }   
        },

        chickenAnim:{
            _run: function() {
                this.visible = false;
                this.zIndex = 499;
                setWgtLayout(this,[0.1257, 0.2583], [0.5, 0.63], [0, 0]);
                MjClient.playui.srcPos.chickenAnim = this.getPosition();
            }, 
        },

        Node_Anim:{
            _run: function() {
                this.visible = false;
            }, 
        },
        Panel_Anim:{
            _run: function() {
                this.visible = true;
                this.zIndex = 9999;

                for(var i = this.children.length - 1; i >= 0; i--){
                    setWgtLayout(this.children[i], [this.children[i].width / 1280, this.children[i].height / 720], [0.5, 0.5], [0, 0]);
                    this.children[i].setVisible(false);
                }
            }, 
        },


        gameStart:{
            _run: function() {
                this.visible = false;
                this.zIndex = 499;
                setWgtLayout(this,[0.5, 0.5], [0.5, 0.63], [0, 0]);   
            }, 
            _event:{
                mjhand: function(msg) {
                    //delete MjClient.playui.isFaPai;
                    //MjClient.playui.isFaPai = 1;

                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    this.zIndex = 9999;
                    this.visible = true;
                    this.getChildByName("round_number").setString((tData.roundAll-tData.roundNum + 1));
                    
                    this.runAction( cc.sequence(cc.fadeIn(0.1), cc.fadeOut(1), cc.callFunc(function() {
                        // var pl = getUIPlayer(0);
                        // if ((pl && pl.trust))
                        // {
                        //     // 托管状态下，不播放发牌动画 
                        // }
                        // else
                        // {
                        //     showPostCardAnimation();
                        // } 
                        
                    }) ));
                },
            }
        },

        Button_mingqiang:{
            _run: function () {
                this.visible = false;
                
                if(isIPhoneX())
                    setWgtLayout(this,[0.15, 0.14], [0.525, 0.46], [-1.3, 0.26]);
                else
                    setWgtLayout(this,[0.15, 0.14], [0.515, 0.39], [-0.8, 0.26]);
            },
            _click: function(btn) {
                btn.visible = false;
                var _btn = btn.getParent().getChildByName("Button_buqiang");
                _btn.setVisible(false);

                // postEvent("BaoxiClicked");
                // delete MjClient.playui.curBaoxi;
                
                //delete MjClient.playui.curQiang;
                MjClient.playui.curQiang = null;

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "c2sQiangZhuang",
                    qiang : 1
                });
            },
            _event:{
                waitQiang: function(msg) {
                    MjClient.playui.curQiang = msg.curPlayer;
                    var myTurn = isMyTurnToQiang(msg.curPlayer);

                    if (myTurn) {
                        cc.log("---------waitQiang-----MjClient.playui.isFaPai-------", msg.curPlayer)
                        if (MjClient.playui.isFaPai) {

                            //MjClient.playui.curQiang = msg.curPlayer;
                        }
                        else if (MjClient.rePlayVideo == -1)
                            this.visible = true;
                    }

                    //MjClient.playui.setDownMenusEnabled();
                },
                initSceneData: function()
                {
                    
                    this.visible = isMyTurnToQiang(MjClient.data.sData.tData.curPlayer) && 
                        MjClient.data.sData.tData.tState == TableState.waitJiazhu && 
                        !MjClient.playui.isFaPai && 
                        MjClient.rePlayVideo == -1;
                },
                PostCardsEnded: function()
                {
                    cc.log("---------waitQiang-----PostCardsEnded-------", MjClient.playui.curQiang, isMyTurnToQiang(MjClient.playui.curQiang))

                    this.visible = isMyTurnToQiang(MjClient.playui.curQiang) && !MjClient.playui.isFaPai;
                    //this.visible = isMyTurnToQiang(MjClient.playui.curBaoxi) && !MjClient.playui.isFaPai;
                },
                s2cQiangZhuang: function() {
                    this.visible = false;
                }
            }
        },
        Button_buqiang:{
            _run: function () {
                this.visible = false;

                if(isIPhoneX())
                    setWgtLayout(this,[0.15, 0.14], [0.515, 0.46], [1.3, 0.32]);
                else
                    setWgtLayout(this,[0.15, 0.14], [0.515, 0.39], [0.8, 0.32]); 
            },
            _click: function(btn) {
                btn.visible = false;
                var _btn = btn.getParent().getChildByName("Button_mingqiang");
                _btn.setVisible(false);
                
                MjClient.playui.curQiang = null;

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "c2sQiangZhuang",
                    qiang: 0
                });
            },
            _event:{
                waitQiang: function(msg) {
                    var myTurn = isMyTurnToQiang(msg.curPlayer);

                    if (myTurn) {
                        if (MjClient.playui.isFaPai) {
                            //MjClient.playui.curQiang = msg.curPlayer;
                        }
                        else if (MjClient.rePlayVideo == -1)
                            this.visible = true;
                    }
                },
                initSceneData: function()
                {
                    this.visible = isMyTurnToQiang(MjClient.data.sData.tData.curPlayer) && 
                        MjClient.data.sData.tData.tState == TableState.waitJiazhu && 
                        !MjClient.playui.isFaPai && 
                        MjClient.rePlayVideo == -1;
                },
                PostCardsEnded: function()
                {
                    this.visible = isMyTurnToQiang(MjClient.playui.curQiang) && !MjClient.playui.isFaPai;
                },
                s2cQiangZhuang: function() {
                    this.visible = false;
                }
            }
        },
        Btn_WatchSwitch:{
            _run: function () {
                this.visible = false;
                this.watchTag = false;
                this.zIndex = 555;
                this.loadTextureNormal("playing/damazi/watch.png");

                if(isIPhoneX())
                    setWgtLayout(this,[0.15, 0.14], [0.5, 0.05], [0, 0.32]);
                else
                    setWgtLayout(this,[0.15, 0.14], [0.5, 0.03], [0, 0.32]); 
            },
            _click: function(btn) {
                btn.watchTag = !btn.watchTag;
                
                btn.loadTextureNormal("playing/damazi/watch.png");

                if(btn.watchTag){
                   btn.loadTextureNormal("playing/damazi/cancel_watch.png");
                }

                MjClient.playui.dealSwitchWatch(btn.watchTag, MjClient.playui.partnerCardsData);
            },
            _event:{

                initSceneData: function(eD)
                {
                    this.watchTag = false;
                    this.loadTextureNormal("playing/damazi/watch.png");
                    cc.log("------666*****", eD.partnerCards)
                    MjClient.playui.showWatchPanel(this, eD.partnerCards); 
                },
                partnerCards: function(msg){
                    MjClient.playui.showWatchPanel(this, msg.partnerCards);
                },
                roundEnd:function()
                {
                    this.visible = false;
                }

            }
        },

        Button_baoxi:{
            _run: function () {
                this.visible = false;

                if(isIPhoneX())
                    setWgtLayout(this,[0.15, 0.14], [0.525, 0.46], [-1.3, 0.26]);
                else
                    setWgtLayout(this,[0.15, 0.14], [0.525, 0.39], [-1.3, 0.26]);
            },
            _click: function(btn) {
                btn.visible = false;
                postEvent("BaoxiClicked");
                delete MjClient.playui.curBaoxi;

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "Baoxi",
                    isBaoxi: true
                });
            },
            _event:{
                waitBaoxi: function(msg) {
                    var myTurn = isMyTurnToBaoxi(msg.curBaoxi);

                    if (myTurn) {
                        if (MjClient.playui.isFaPai)
                            MjClient.playui.curBaoxi = msg.curBaoxi;
                        else if (MjClient.rePlayVideo == -1)
                            this.visible = true;
                    }

                    //MjClient.playui.setDownMenusEnabled();
                },
                initSceneData: function()
                {
                    this.visible = isMyTurnToBaoxi(MjClient.data.sData.tData.curPlayer) && 
                        MjClient.data.sData.tData.tState == TableState.waitBaoXi && 
                        !MjClient.playui.isFaPai && 
                        MjClient.rePlayVideo == -1;
                },
                PostCardsEnded: function()
                {
                    this.visible = isMyTurnToBaoxi(MjClient.playui.curBaoxi) && !MjClient.playui.isFaPai;
                },
                BaoxiClicked: function()
                {
                    this.visible = false;
                },
            }
        },
        Button_no_baoxi:{
            _run: function () {
                this.visible = false;

                if(isIPhoneX())
                    setWgtLayout(this,[0.15, 0.14], [0.515, 0.46], [1.3, 0.32]);
                else
                    setWgtLayout(this,[0.15, 0.14], [0.515, 0.39], [1.3, 0.32]); 
            },
            _click: function(btn) {
                btn.visible = false;
                postEvent("BaoxiClicked");
                delete MjClient.playui.curBaoxi;

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "Baoxi",
                    isBaoxi: false
                });
            },
            _event:{
                waitBaoxi: function(msg) {
                    var myTurn = isMyTurnToBaoxi(msg.curBaoxi);

                    if (myTurn) {
                        if (MjClient.playui.isFaPai) {
                        }
                        else if (MjClient.rePlayVideo == -1)
                            this.visible = true;
                    }
                },
                initSceneData: function()
                {
                    this.visible = isMyTurnToBaoxi(MjClient.data.sData.tData.curPlayer) && 
                        MjClient.data.sData.tData.tState == TableState.waitBaoXi && 
                        !MjClient.playui.isFaPai && 
                        MjClient.rePlayVideo == -1;
                },
                PostCardsEnded: function()
                {
                    this.visible = isMyTurnToBaoxi(MjClient.playui.curBaoxi) && !MjClient.playui.isFaPai;
                },
                BaoxiClicked: function()
                {
                    this.visible = false;
                },
            }
        },
        down: {
            head: {
                countDownBg:{//托管倒计时
                    _run:function () {
                        this.visible = false;
                        this.getChildByName("TG_CountDown").ignoreContentAdaptWithSize(true);
                    },
                    _event:{
                        trustTip:function (msg) {
                            setTuoGuanCountDown(msg,this,0);
                        },
                        PKPut:function (msg) {
                            this.visible = false;
                        },
                        roundEnd:function()
                        {
                            this.visible = false;
                        }
                    }
                },
                tuoguan: {
                    _run:function () {
                        this.visible = false;
                    },
                    _event:{
                        beTrust:function (msg) {
                            if(getUIPlayer(0)&&getUIPlayer(0).info.uid == msg.uid){
                                this.visible = true;
                            }
                        },
                        cancelTrust:function (msg) {
                            if(getUIPlayer(0)&&getUIPlayer(0).info.uid == msg.uid){
                                this.visible = false;
                            }
                        } ,
                        initSceneData:function (msg) {
                            var pl = getUIPlayer(0);
                            if(pl && pl.trust){
                                this.visible = true;
                            }else {
                                this.visible = false;
                            }
                        },
                    }
                },
                identityIcon:{
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {

                        PKPut: function() {
                            //showUserZhuangLogo_card(this, 0);
                        },
                        initSceneData: function() {
                            //if (IsArrowVisible()) showUserZhuangLogo_card(this, 0);
                        },
                        roundEnd: function(){
                            this.visible = false;
                        }
                    }

                },
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function() {
                            //showUserZhuangLogo_card(this, 0);
                        },
                        initSceneData: function() {
                            //if (IsArrowVisible()) showUserZhuangLogo_card(this, 0);
                        },
                        roundEnd: function(){
                            this.visible = false;
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

                                showUserChat(this, 0, msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat(this, 0, MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    showPlayerInfo(0, btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead(this, d, 0);
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon(this,0);
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon(this,0);
                    }

                },
                _run: function () {
                    //this.zIndex = 600;
                    showFangzhuTagIcon(this,0);
                },
                score_bg:{_visible:false},
                name_bg:{_visible:false},
                zhua_bg:{_visible:false},
                zhua:{
                    _run: function () {
                        this.setString("0");
                    },
                    _event: {
                        // updatePlayerZhuaFen: function(msg){
                        //     if(msg.uid == getUIPlayer(0).info.uid){
                        //         MjClient.playui.setPlayerZhuaFen(this,0);
                        //     }
                        // },
                        waitPut: function() {
                            MjClient.playui.setPlayerZhuaFen(this,0);
                        },
                        roundEnd: function() {
                            MjClient.playui.setPlayerZhuaFen(this,0);
                        },
                        initSceneData: function() {
                            MjClient.playui.setPlayerZhuaFen(this,0);
                        },
                        mjhand: function() {
                            MjClient.playui.setPlayerZhuaFen(this,0);
                        }
                    }
                },
                icon_you:
                {
                    _run: function () {
                        this.visible = false;
                        this.scale = 1.095;
                    },
                    _event: {
                        onlinePlayer: function(eD) {
                        },
                        PKPut: function(eD) {
                            cc.log("===============you", eD);
                            var pl = getUIPlayer(0)
                            if (pl.info.uid == eD.uid && eD.rank > 0)
                            {
                                this.visible = true;
                                this.loadTexture("playing/damazi/ui_you" + eD.rank + ".png");
                            }
                        },
                    }
                }
            },
            ready: {
                _run: function() {
                    setWgtLayout(this, [this.width / 1280, this.height / 720], [0.5, 0.5], [0, -1.5]);
                    GetReadyVisible(this, 0);
                    //this.visible = true;
                },
                _event: {
                    showPlayerShuffleView:function () {
                        GetReadyVisible(this, -1);
                    },
                    moveHead: function() {
                        GetReadyVisible(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible(this, 0);//根据状态设置ready 是否可见 add by sking
                    },
                    removePlayer: function() {
                        GetReadyVisible(this, 0);
                    },
                    onlinePlayer: function() {

                        cc.log("============online player=======1063======");
                        GetReadyVisible(this, 0);
                    }
                }
            },
            stand: {
                _layout: [
                    [0.090, 0],
                    [0.5, 0.08],
                    [0, 0.55]
                ],
                _visible: false,
                _run: function () {
                     this.zIndex = 600;
                },
            },
            deskCard: {
                // _layout: [
                //     [0.1, 0.15],
                //     [0.6, 0],
                //     [-1.8, 2]
                // ],
                _run:function()
                {
                    setWgtLayout(this,[0.052, 0],[0.5, 0.06],[0, 3.3]);
                },
                _visible: false
            },
            noPutTag: {
                _run:function()
                {
                    this.setScale(MjClient.size.width/1280);
                    this.setPosition(MjClient.playui._downNode.getChildByName("deskCard").getPosition());
                },
                _event:{
                  PKPass:function(eD)
                  {
                      cc.log("=====PKPASS=========" + JSON.stringify(eD));
                      var UIoff = getUiOffByUid(eD.uid);
                      if(UIoff == 0)
                      {
                          DealPKPass_card(UIoff);
                      }
                  }
                },
                _visible: false
            },
            buQiangTag :{
                _run:function()
                {
                    this.visible = false;
                    this.setScale(MjClient.size.width/1280);
                    this.setPosition(MjClient.playui._downNode.getChildByName("deskCard").getPosition());
                },
                _event:{
                    initSceneData: function(eD) {
                        MjClient.playui.showQiangZhuangTag(0);
                    },
                    s2cQiangZhuang:function(eD)
                    {
                        MjClient.playui.showQiangZhuangTag(0, eD);
                        // var _qiang = eD.qiang;
                        // var UIoff = getUiOffByUid(eD.uid);
                        // cc.log("---down++---eD.uid------eD.qiang", eD.uid, eD.qiang)
                        // if(UIoff == 0)
                        // {
                        //     if(eD.qiang == 1 ){ //抢
                                
                        //         this.visible = false;
                        //     }
                        //     this.visible = true;
                        // }
                    }
                },
            },

            _event: {
                clearCardUI: function() {
                    clearCardUI_card(this, 0);
                },
                initSceneData: function(eD) {
                    MjClient.playui.setMajiangXiCard();

                    SetUserVisible_DaYeDaGong(this, 0);

                    if (eD.MinPai && eD.MinPai.MingPai )
                        MjClient.playui.dealMingPai(this,eD.MinPai.MingPai,0);

                    reConnectShowDeskCard();
                    delete MjClient.playui.isFaPai;
                    MjClient.playui.CardLayoutRestore(this, 0);
                },
                addPlayer: function(eD) {
                    SetUserVisible_DaYeDaGong(this, 0);
                },
                removePlayer: function(eD) {
                    SetUserVisible_DaYeDaGong(this, 0);
                },
                mjhand: function(eD) {
                    InitUserHandUI_DaYeDaGong(this, 0);
                    // 先排序 再发牌 上面的这个函数可能不走排序的代码段
                    delete MjClient.playui.isFaPai;
                    MjClient.playui.CardLayoutRestore(this, 0);
                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer(0);
                    //MjClient.playui.UpdataDaMaZiTips();

                    if ((pl && pl.trust))
                    {
                        // 托管状态下，不播放发牌动画 
                    }
                    else
                    {
                        showPostCardAnimation();
                        //playPostCardAnim();
                        
                    } 
                },
                roundEnd: function() {
                    InitUserCoinAndName_DaYeDaGong(this, 0);
                    //setTaiInfo("");
                },
                updateInfo:function (d) {
                    if(MjClient.data.sData.tData.fieldId && d && d.gold){
                        InitUserCoinAndName_DaYeDaGong(this,0);
                    }
                },
                newCard: function(eD) {
                    // cdsNums++;
                    console.log("客户端发牌组合...... ");
                    //cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>newCard---------------");
                    //var putButtn = this.getChildByName("BtnPutCard");
                    //putButtn.visible = true;
                    //MjClient.playui._btnPutCard.visible = true;
                    if (typeof(eD) == "number") {
                        eD = {newCard: eD};
                    }

                    //掼蛋不需要发牌
                    //DealNewCard(this,eD.newCard,0);// checkCanTing(eD);
                },
                PKPut: function(eD) {
                    //cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PKPut---------------");
                    DealMJPut_card(this,eD, 0);

                    setUserOffline(this, 0);
                },
                waitPut:function(eD){
                    cc.log(">>>>>>>>>>>>>>>>down>>>>>>>>>>>>>>>waitPut");

                    var tData = MjClient.data.sData.tData;
                    // if (MjClient.playui.isShowHandCardBeiMain && (tData.curPlayer == getPlayerIndex(0) || tData.lastPutPlayer != -1)) {
                    //     MjClient.playui.isShowHandCardBeiMain = false;
                    //     MjClient.playui.hideHandCardBeiMian();
                    // }

                    // 发牌时暂时不计算牌型提示
                    if (!MjClient.playui.isFaPai)
                    {
                        DealWaitPut_card(this, eD, 0);
                        UpdataCurrentPutCard();
                        // 跑得快 自动出牌
                        if (IsTurnToMe()) {
                            // 如果提示只有一手牌， 自动提起
                            // 如果提示只有一手牌， 且是我全部的手牌数量， 自动打出
                            //AutoPutLastCard_card_ty();
                        }
                    }

                    //如果curplayer == lastputplayer 新的一轮开始。
                    if (tData.curPlayer == tData.lastPutPlayer)
                        MjClient.playui.clearDeskCard(this);

                    //MjClient.playui.setDownMenusEnabled();
                },
                PostCardsEnded: function()
                {
                    // 发牌完毕处理正常牌逻辑
                    if(!MjClient.playui.isFaPai && 
                        MjClient.data.sData.tData.tState == TableState.waitPut)
                    {
                        DealWaitPut_card(this, null, 0);
                        UpdataCurrentPutCard();
                        // 跑得快 自动出牌
                        if (IsTurnToMe()) {
                            // 如果提示只有一手牌， 自动提起
                            // 如果提示只有一手牌， 且是我全部的手牌数量， 自动打出
                            //AutoPutLastCard_card_ty();
                        }
                    }
                },
                onlinePlayer: function(eD) {
                    setUserOffline(this, 0);
                },
                playerStatusChange: function(eD) {
                    setUserOffline(this, 0);
                },
                PKMingPai: function(eD) {
                    MjClient.playui.dealMingPai(this,eD,0,true);
                },
                Baoxi: function(eD) {
                    if (eD.uid == 0)
                        return;

                    InitUserCoinAndName_DaYeDaGong(this, 0);
                }
            }
        },
        right: {
            head: {
                countDownBg:{//托管倒计时
                    _run:function () {
                        this.visible = false;
                        this.getChildByName("TG_CountDown").ignoreContentAdaptWithSize(true);
                    },
                    _event:{
                        trustTip:function (msg) {
                            setTuoGuanCountDown(msg,this,1);
                        },
                        PKPut:function (msg) {
                            this.visible = false;
                        },
                        roundEnd:function()
                        {
                            this.visible = false;
                        }
                    }
                },
                tuoguan: {
                    _run:function () {
                        this.visible = false;
                    },
                    _event:{
                        beTrust:function (msg) {
                            if(getUIPlayer(1)&&getUIPlayer(1).info.uid == msg.uid){
                                this.visible = true;
                            }
                        },
                        cancelTrust:function (msg) {
                            if(getUIPlayer(1)&&getUIPlayer(1).info.uid == msg.uid){
                                this.visible = false;
                            }
                        },
                        initSceneData:function (msg) {
                            var pl = getUIPlayer(1);
                            if(pl && pl.trust){
                                this.visible = true;
                            }else {
                                this.visible = false;
                            }
                        },
                    }
                },
                identityIcon:{
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        roundEnd: function() {
                            this.visible = false;
                        },
                    }
                },
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function() {
                            //showUserZhuangLogo_card(this, 1);
                        },
                        initSceneData: function() {
                            //if (IsArrowVisible()) showUserZhuangLogo_card(this, 1);
                        },
                        roundEnd: function(){
                            this.visible = false;
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
                                showUserChat(this, 1, msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat(this, 1, MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    showPlayerInfo(1, btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead(this, d, 1);
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon(this,1);
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon(this,1);
                    }
                },
                _run: function () {
                    // this.zIndex = 600;
                    showFangzhuTagIcon(this,1);
                },
                score_bg:{_visible:false},
                name_bg:{_visible:false},
                zhua_bg:{_visible:false},
                zhua:{
                    _run: function () {
                        this.setString("0");
                    },
                    _event: {
                        // updatePlayerZhuaFen: function(msg){
                        //     if(msg.uid == getUIPlayer(1).info.uid){
                        //         MjClient.playui.setPlayerZhuaFen(this,1);
                        //     }
                        // },
                        waitPut: function() {
                            MjClient.playui.setPlayerZhuaFen(this,1);
                        },
                        roundEnd: function() {
                            MjClient.playui.setPlayerZhuaFen(this,1);
                        },
                        initSceneData: function() {
                            MjClient.playui.setPlayerZhuaFen(this,1);
                        },
                        mjhand: function() {
                            MjClient.playui.setPlayerZhuaFen(this,1);
                        }
                    }
                },
                tingCard:{
                    _visible:false,
                    _event:{
                        clearCardUI:function()
                        {
                            this.visible = false;
                        },
                        roundEnd: function() {
                            this.visible = false;
                        },
                    }
                },
                icon_you:
                {
                    _run: function () {
                        this.visible = false;
                        this.scale = 1.095;
                    },
                    _event: {
                        onlinePlayer: function(eD) {
                        },
                        PKPut: function(eD) {
                            var pl = getUIPlayer(1)
                            if (pl.info.uid == eD.uid && eD.rank > 0)
                            {
                                this.visible = true;
                                this.loadTexture("playing/damazi/ui_you" + eD.rank + ".png");
                            }
                        },
                    }
                }

            },
            ready: {
                _run: function() {
                    setWgtLayout(this, [this.width / 1280, this.height / 720], [0.5, 0.5], [4, 0.7]);
                    GetReadyVisible(this, 1);
                },
                _event: {
                    showPlayerShuffleView:function () {
                        GetReadyVisible(this, -1);
                    },
                    moveHead: function() {
                        GetReadyVisible(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible(this, 1);
                    },
                    removePlayer: function() {
                        GetReadyVisible(this, 1);
                    },
                    onlinePlayer: function() {
                        GetReadyVisible(this, 1);
                    }
                }
            },
            stand: {
                _run:function()
                {
                    setWgtLayout(this, [this.width/1280*0.9, this.height/720*0.9], [1, 0.6], [-0.6, 1.1]);
                },
                _visible: false
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
                        setWgtLayout(this,[0.052, 0],[1, 0.5],[-3.5, 0.65]);
                    else
                        setWgtLayout(this,[0.052, 0],[1, 0.5],[-4.2, 0.65]);
                },
                _visible: false
            },
            noPutTag: {
                _run:function()
                {
                    this.setScale(MjClient.size.width/1280);
                    this.setPosition(MjClient.playui._rightNode.getChildByName("deskCard").getPosition());
                },
                _event:{
                    PKPass:function(eD)
                    {
                        var UIoff = getUiOffByUid(eD.uid);
                        if(UIoff == 1)
                        {
                            DealPKPass_card(UIoff);
                        }
                    }
                },
                _visible: false
            },

            buQiangTag :{
                _run:function()
                {
                    this.visible = false;
                    this.setScale(MjClient.size.width/1280);
                    this.setPosition(MjClient.playui._rightNode.getChildByName("deskCard").getPosition());
                },
                _event:{
                    initSceneData: function(eD) {
                        MjClient.playui.showQiangZhuangTag(1);
                    },
                    s2cQiangZhuang:function(eD)
                    {
                        MjClient.playui.showQiangZhuangTag(1, eD);
                        // var _qiang = eD.qiang;
                        // var UIoff = getUiOffByUid(eD.uid);
                        // cc.log("---right++---eD.uid------eD.qiang", eD.uid, eD.qiang)
                        // if(UIoff == 1)
                        // {
                        //     if(eD.qiang == 1 ){ //抢
                        //         this.visible = false;
                        //     }
                        //     this.visible = true;
                        // }
                    }
                },
            },

            _event: {
                clearCardUI: function() {
                    clearCardUI_card(this, 1);
                },
                initSceneData: function(eD) {
                    SetUserVisible_DaYeDaGong(this, 1);

                    if (eD.MinPai && eD.MinPai.MingPai)
                        MjClient.playui.dealMingPai(this,eD.MinPai.MingPai,1);
                },
                addPlayer: function(eD) {
                    SetUserVisible_DaYeDaGong(this, 1);
                },
                removePlayer: function(eD) {
                    SetUserVisible_DaYeDaGong(this, 1);
                },
                mjhand: function(eD) {
                    InitUserHandUI_DaYeDaGong(this, 1);
                },
                roundEnd: function() {
                    InitUserCoinAndName_DaYeDaGong(this, 1);
                },
                waitPut: function(eD) {
                    DealWaitPut_card(this, eD, 1);
                    var tData = MjClient.data.sData.tData;
                    //如果curplayer == lastputplayer 新的一轮开始。
                    if (tData.curPlayer == tData.lastPutPlayer)
                        MjClient.playui.clearDeskCard(this);
                },
                PKPut: function(eD) {
                    DealMJPut_card(this, eD, 1);
                    if(eD.uid != SelfUid())
                    {

                    }
                    setUserOffline(this, 1);
                },
                onlinePlayer: function(eD) {
                    setUserOffline(this, 1);
                },
                playerStatusChange: function(eD) {
                    setUserOffline(this, 1);
                },
                PKMingPai: function(eD) {
                    MjClient.playui.dealMingPai(this,eD,1,true);
                },
                Baoxi: function(eD) {
                    if (eD.uid == 0)
                        return;

                    InitUserCoinAndName_DaYeDaGong(this, 1);
                }
            }
        },
        top: {
            _run:function() {
                this.visible = MjClient.MaxPlayerNum >= 3;
            },
            head: {

                countDownBg:{//托管倒计时
                    _run:function () {
                        this.visible = false;
                        this.getChildByName("TG_CountDown").ignoreContentAdaptWithSize(true);
                    },
                    _event:{
                        trustTip:function (msg) {
                            setTuoGuanCountDown(msg,this,2);
                        },
                        PKPut:function (msg) {
                            this.visible = false;
                        },
                        roundEnd:function()
                        {
                            this.visible = false;
                        }
                    }
                },
                tuoguan: {
                    _run:function () {
                        this.visible = false;
                    },
                    _event:{
                        beTrust:function (msg) {
                            if(getUIPlayer(2)&&getUIPlayer(2).info.uid == msg.uid){
                                this.visible = true;
                            }
                        },
                        cancelTrust:function (msg) {
                            if(getUIPlayer(2)&&getUIPlayer(2).info.uid == msg.uid){
                                this.visible = false;
                            }
                        },
                        initSceneData:function (msg) {
                            var pl = getUIPlayer(2);
                            if(pl && pl.trust){
                                this.visible = true;
                            }else {
                                this.visible = false;
                            }
                        },

                    }
                },
                identityIcon:{
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        roundEnd: function() {
                            this.visible = false;
                        },
                    }
                },
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function() {
                            //showUserZhuangLogo_card(this, 2);
                        },
                        initSceneData: function() {
                            //if (IsArrowVisible()) showUserZhuangLogo_card(this, 2);
                        },
                        roundEnd: function(){
                            this.visible = false;
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
                                showUserChat(this, 2, msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat(this, 2, MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    showPlayerInfo(2, btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead(this, d, 2);
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon(this,2);
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon(this,2);
                    }
                },
                _run: function () {
                    // this.zIndex = 600;
                    showFangzhuTagIcon(this,2);
                },
                score_bg:{_visible:false},
                name_bg:{_visible:false},
                zhua_bg:{_visible:false},
                zhua:{
                    _run: function () {
                        this.setString("0");
                    },
                    _event: {
                        // updatePlayerZhuaFen: function(msg){
                        //     if(msg.uid == getUIPlayer(2).info.uid){
                        //         MjClient.playui.setPlayerZhuaFen(this, 2);
                        //     }
                        // },
                        waitPut: function() {
                            MjClient.playui.setPlayerZhuaFen(this,2);
                        },
                        roundEnd: function() {
                            MjClient.playui.setPlayerZhuaFen(this,2);
                        },
                        initSceneData: function() {
                            MjClient.playui.setPlayerZhuaFen(this,2);
                        },
                        mjhand: function() {
                            MjClient.playui.setPlayerZhuaFen(this,2);
                        }
                    }
                },
                tingCard:{
                    _visible:false,
                    _event:{
                        clearCardUI:function()
                        {
                            this.visible = false;
                        },
                        roundEnd: function() {
                            this.visible = false;
                        },
                    }
                },
                icon_you:
                {
                    _run: function () {
                        this.visible = false;
                        this.scale = 1.095;
                    },
                    _event: {
                        onlinePlayer: function(eD) {
                        },
                        PKPut: function(eD) {
                            var pl = getUIPlayer(2)
                            if (pl.info.uid == eD.uid && eD.rank > 0)
                            {
                                this.visible = true;
                                this.loadTexture("playing/damazi/ui_you" + eD.rank + ".png");
                            }
                        },
                    }
                }
            },
            ready: {
                _run: function() {
                    setWgtLayout(this, [this.width / 1280, this.height / 720], [0.5, 0.5], [0, 3.5]);
                    GetReadyVisible(this, 2);
                },
                _event: {
                    showPlayerShuffleView:function () {
                        GetReadyVisible(this, -1);
                    },
                    moveHead: function() {
                        GetReadyVisible(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible(this, 2);
                    },
                    removePlayer: function() {
                        GetReadyVisible(this, 2);
                    },
                    onlinePlayer: function() {
                        GetReadyVisible(this, 2);
                    }
                }
            },
            stand: {
                _run:function()
                {
                    setWgtLayout(this, [this.width/1280*0.9, this.height/720*0.9], [0.515, 1], [0.4, -0.5]);
                },
                _visible: false,
            },
            deskCard: {
                // _layout: [
                //     [0.12, 0.15],
                //     [0.16, 0.55],
                //     [0, 0.1]
                // ],
                _run:function()
                {
                    setWgtLayout(this,[0.052, 0],[0.5, 0.65],[0, 0.85]);
                },
                _visible: false,
            },
            noPutTag: {
                _run:function()
                {
                    this.setScale(MjClient.size.width/1280);
                    this.setPosition(MjClient.playui._topNode.getChildByName("deskCard").getPosition());
                },
                _event:{
                    PKPass:function(eD)
                    {
                        var UIoff = getUiOffByUid(eD.uid);
                        if(UIoff == 2)
                        {
                            DealPKPass_card(UIoff);
                        }
                    }
                },
                _visible: false
            },

            buQiangTag :{
                _run:function()
                {
                    this.visible = false;
                    this.setScale(MjClient.size.width/1280);
                    this.setPosition(MjClient.playui._topNode.getChildByName("deskCard").getPosition());
                },
                _event:{
                    initSceneData: function(eD) {
                        MjClient.playui.showQiangZhuangTag(2);
                    },

                    s2cQiangZhuang:function(eD)
                    {
                        MjClient.playui.showQiangZhuangTag(2, eD);
                        // var _qiang = eD.qiang;
                        // var UIoff = getUiOffByUid(eD.uid);
                        // cc.log("---top++---eD.uid------eD.qiang", eD.uid, eD.qiang)
                        // if(UIoff == 2)
                        // {
                        //     if(eD.qiang == 1 ){ //抢
                        //         this.visible = false;
                        //     }
                        //     this.visible = true;
                        // }
                    }
                },
            },

            _event: {
                clearCardUI: function() {
                    clearCardUI_card(this, 2);
                },
                initSceneData: function(eD) {
                    SetUserVisible_DaYeDaGong(this, 2);

                    if (eD.MinPai && eD.MinPai.MingPai)
                        MjClient.playui.dealMingPai(this,eD.MinPai.MingPai,2);
                },
                addPlayer: function(eD) {
                    SetUserVisible_DaYeDaGong(this, 2);
                },
                removePlayer: function(eD) {
                    SetUserVisible_DaYeDaGong(this, 2);
                },
                mjhand: function(eD) {
                    InitUserHandUI_DaYeDaGong(this, 2);
                },
                roundEnd: function() {
                    InitUserCoinAndName_DaYeDaGong(this, 2);
                },
                waitPut: function(eD) {
                    DealWaitPut_card(this, eD, 2);
                    var tData = MjClient.data.sData.tData;
                    //如果curplayer == lastputplayer 新的一轮开始。
                    if (tData.curPlayer == tData.lastPutPlayer)
                        MjClient.playui.clearDeskCard(this);  
                },
                PKPut: function(eD) {
                    DealMJPut_card(this, eD, 2);
                    setUserOffline(this, 2);
                },
                onlinePlayer: function(eD) {
                    setUserOffline(this, 2);
                },
                playerStatusChange: function(eD) {
                    setUserOffline(this, 2);
                },
                MJFlower: function(eD) {
                    HandleMJFlower(this, eD, 2);
                },
                MJTing: function (eD) {
                    HandleMJTing(this, eD, 2);
                },
                PKMingPai: function(eD) {
                    MjClient.playui.dealMingPai(this,eD,2,true);
                },
                Baoxi: function(eD) {
                    if (eD.uid == 0)
                        return;

                    InitUserCoinAndName_DaYeDaGong(this, 2);
                }
            }
        },
        left: {
            head: {
                countDownBg:{//托管倒计时
                    _run:function () {
                        this.visible = false;
                        this.getChildByName("TG_CountDown").ignoreContentAdaptWithSize(true);
                    },
                    _event:{
                        trustTip:function (msg) {
                            setTuoGuanCountDown(msg,this,3);
                        },
                        PKPut:function (msg) {
                            this.visible = false;
                        },
                        roundEnd:function()
                        {
                            this.visible = false;
                        }
                    }
                },
                tuoguan: {
                    _run:function () {
                        this.visible = false;
                    },
                    _event:{
                        beTrust:function (msg) {
                            if(getUIPlayer(3)&&getUIPlayer(3).info.uid == msg.uid){
                                this.visible = true;
                            }
                        },
                        cancelTrust:function (msg) {
                            if(getUIPlayer(3)&&getUIPlayer(3).info.uid == msg.uid){
                                this.visible = false;
                            }
                        },
                        initSceneData:function (msg) {
                            var pl = getUIPlayer(3);
                            if(pl && pl.trust){
                                this.visible = true;
                            }else {
                                this.visible = false;
                            }
                        },

                    }
                },
                identityIcon:{
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        roundEnd: function() {
                            this.visible = false;
                        },
                    }
                },

                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        waitPut: function() {
                            //showUserZhuangLogo_card(this, 1);
                        },
                        initSceneData: function() {
                            //if (IsArrowVisible()) showUserZhuangLogo_card(this, 1);
                        },
                        roundEnd: function(){
                            this.visible = false;
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
                                showUserChat(this, 3, msg);
                            },
                            playVoice: function(voicePath) {
                                MjClient.data._tempMessage.msg = voicePath;
                                showUserChat(this, 3, MjClient.data._tempMessage);
                            }
                        }
                    }
                },
                _click: function(btn) {
                    showPlayerInfo(3, btn);
                },
                _event: {
                    loadWxHead: function(d) {
                        setWxHead(this, d, 3);
                    },
                    addPlayer: function(eD) {
                        showFangzhuTagIcon(this,3);
                    },
                    removePlayer: function(eD) {
                        showFangzhuTagIcon(this,3);
                    }
                },
                _run: function () {
                    // this.zIndex = 600;
                    showFangzhuTagIcon(this,3);
                },
                score_bg:{_visible:false},
                name_bg:{_visible:false},
                zhua_bg:{_visible:false},
                zhua:{
                    _run: function () {
                        this.setString("0");
                    },
                    _event: {
                        // updatePlayerZhuaFen: function(msg){
                        //     if(msg.uid == getUIPlayer(3).info.uid){
                        //         MjClient.playui.setPlayerZhuaFen(this, 3);
                        //     }
                        // },
                        waitPut: function() {
                            MjClient.playui.setPlayerZhuaFen(this,3);
                        },
                        roundEnd: function() {
                            MjClient.playui.setPlayerZhuaFen(this,3);
                        },
                        initSceneData: function() {
                            MjClient.playui.setPlayerZhuaFen(this,3);
                        },
                        mjhand: function() {
                            MjClient.playui.setPlayerZhuaFen(this,3);
                        }
                    }
                },
                tingCard:{
                    _visible:false,
                    _event:{
                        clearCardUI:function()
                        {
                            this.visible = false;
                        },
                        roundEnd: function() {
                            this.visible = false;
                        },
                    }
                },
                icon_you:
                {
                    _run: function () {
                        this.visible = false;
                        this.scale = 1.095;
                    },
                    _event: {
                        onlinePlayer: function(eD) {
                        },
                        PKPut: function(eD) {
                            var pl = getUIPlayer(3)
                            if (pl.info.uid == eD.uid && eD.rank > 0)
                            {
                                this.visible = true;
                                this.loadTexture("playing/damzi/ui_you" + eD.rank + ".png");
                            }
                        },
                    }
                }

            },
            ready: {
                _run: function() {
                    setWgtLayout(this, [this.width / 1280, this.height / 720], [0.5, 0.5], [-4, 0.7]);
                    GetReadyVisible(this, 3);
                },
                _event: {
                    showPlayerShuffleView:function () {
                        GetReadyVisible(this, -1);
                    },
                    moveHead: function() {
                        GetReadyVisible(this, -1);
                    },
                    addPlayer: function() {
                        GetReadyVisible(this, 3);
                    },
                    removePlayer: function() {
                        GetReadyVisible(this, 3);
                    },
                    onlinePlayer: function() {
                        GetReadyVisible(this, 3);
                    }
                }
            },
            stand: {
                _run:function()
                {
                    if (isIPhoneX()) {
                        setWgtLayout(this, [this.width/1280*0.9, this.height/720*0.9], [0.05, 0.6], [0.6, 1.1]);
                    }else{
                        setWgtLayout(this, [this.width/1280*0.9, this.height/720*0.9], [0, 0.6], [0.6, 1.1]);
                    }
                },
                _visible: false
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
                        setWgtLayout(this,[0.052, 0],[0.16, 0.5],[0.5, 0.65]);
                    else
                        setWgtLayout(this,[0.052, 0],[0.16, 0.5],[1.2, 0.65]);
                },
                _visible: false
            },
            noPutTag: {
                _run:function()
                {
                    this.setScale(MjClient.size.width/1280);
                    this.setPosition(MjClient.playui._leftNode.getChildByName("deskCard").getPosition());
                },
                _event:{
                    PKPass:function(eD)
                    {
                        var UIoff = getUiOffByUid(eD.uid);
                        if(UIoff == 3)
                        {
                            DealPKPass_card(UIoff);
                        }
                    }
                },
                _visible: false
            },
            buQiangTag :{
                _run:function()
                {
                    this.visible = false;
                    this.setScale(MjClient.size.width/1280);
                    this.setPosition(MjClient.playui._leftNode.getChildByName("deskCard").getPosition());
                },
                _event:{
                    initSceneData: function(eD) {
                        MjClient.playui.showQiangZhuangTag(3);
                    },
                    s2cQiangZhuang:function(eD)
                    {
                        MjClient.playui.showQiangZhuangTag(3, eD);
                        // var _qiang = eD.qiang;
                        // var UIoff = getUiOffByUid(eD.uid);
                        // cc.log("---left++---eD.uid------eD.qiang", eD.uid, eD.qiang)
                        // if(UIoff == 3)
                        // {
                        //     if(eD.qiang == 1 ){ //抢
                        //         this.visible = false;
                        //     }
                        //     this.visible = true;
                        // }
                    }
                },
            },
            _event: {
                clearCardUI: function() {
                    clearCardUI_card(this, 3);
                },
                initSceneData: function(eD) {
                    SetUserVisible_DaYeDaGong(this, 3);

                    if (eD.MinPai && eD.MinPai.MingPai)
                    {
                        MjClient.playui.dealMingPai(this,eD.MinPai.MingPai,3);
                    }
                },
                addPlayer: function(eD) {
                    SetUserVisible_DaYeDaGong(this, 3);
                },
                removePlayer: function(eD) {
                    SetUserVisible_DaYeDaGong(this, 3);
                },
                mjhand: function(eD) {
                    InitUserHandUI_DaYeDaGong(this, 3);
                },
                roundEnd: function() {
                    InitUserCoinAndName_DaYeDaGong(this, 3);
                },
                waitPut: function(eD) {
                    DealWaitPut_card(this, eD, 3);
                    var tData = MjClient.data.sData.tData;
                    //如果curplayer == lastputplayer 新的一轮开始。
                    if (tData.curPlayer == tData.lastPutPlayer)
                        MjClient.playui.clearDeskCard(this);
                },
                PKPut: function(eD) {
                    DealMJPut_card(this, eD, 3);
                    if(eD.uid != SelfUid())
                    {

                    }
                    setUserOffline(this, 3);
                },
                onlinePlayer: function(eD) {
                    setUserOffline(this, 3);
                },
                playerStatusChange: function(eD) {
                    setUserOffline(this, 3);
                },
                PKMingPai: function(eD) {
                    MjClient.playui.dealMingPai(this,eD,3,true);
                },
                Baoxi: function(eD) {
                    if (eD.uid == 0)
                        return;
                    
                    InitUserCoinAndName_DaYeDaGong(this, 3);
                }
            }
        },
        partner: {
            stand: {
                _layout: [
                    [0.090, 0],
                    [0.5, 0.08],
                    [0, 0.55]
                ],
                _visible: false,
            },
            partner_cards_mask: {
                _visible: false,
                _run: function () {
                    this.setSize(cc.director.getWinSize().width,260);
                    setWgtLayout(this, [0, this.height/720], [0.5, 0], [0, 0]);
                    this.setScaleX(1);

                    this.zIndex = 1000;
                },
            },
            partner_cards_tips: {
                _visible: false,
                _run: function () {
                    setWgtLayout(this,[this.width/1280, this.height/720], [0.5, 0.15], [0, 0.12]);

                    this.zIndex = 1001;
                },
            },
            _event: {
                clearCardUI: function() {
                    MjClient.playui.clearPartnerUI(this);
                },
                initSceneData: function(eD) {
                    MjClient.playui.partnerCardsData = eD.partnerCards;
                },
                partnerCards: function(msg){
                    MjClient.playui.partnerCardsData = msg.partnerCards;
                },
                PKPut: function(eD) {
                    //MjClient.playui.dealPKPutCards(this, eD, 0);
                    MjClient.playui.dealPKPutCards(this, eD, 2);
                },
            }
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
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
                _event: {
                    initSceneData: function() {
                        if (MjClient.data.sData.tData.tState == TableState.waitPut)
                        {
                            MjClient.clockNode.visible = true;
                            if (MjClient.data.sData.tData.fieldId && !MjClient.data.sData.tData.lastPutCard){
                                stopEffect(playTimeUpEff);
                                MjClient.playui.clockNumberUpdate(this);
                            }else{
                                this.setString("0");
                            }

                            MjClient.playui.updateClockPosition(MjClient.clockNode);
                        }
                    },
                    waitPut: function() {
                        this.stopAllActions();
                        var tData = MjClient.data.sData.tData;
                        var haveTip = (tData.hadTipCards !== false);
                        // 必出且不能管
                        var isNewOut = (tData.curPlayer === tData.lastPutPlayer);
                        var isClockVisible = (isNewOut || haveTip) ? true : false;
                        MjClient.clockNode.visible = isClockVisible;
                        stopEffect(playTimeUpEff);
                        MjClient.playui.clockNumberUpdate(this);
                        MjClient.playui.updateClockPosition(MjClient.clockNode);
                    },
                    PKPut: function(msg) {
                        if (msg.uid == SelfUid()) {
                            this.stopAllActions();
                            stopEffect(playTimeUpEff);
                            playTimeUpEff = null;
                            //MjClient.playui.clockNumberUpdate(this);
                            this.setString("0");
                        }
                    },
                    roundEnd: function() {
                        this.stopAllActions();
                        stopEffect(playTimeUpEff);
                        playTimeUpEff = null;
                    },
                    onlinePlayer: function() {
                        if (!MjClient.data.sData.tData.fieldId){
                            MjClient.clockNode.visible = false;
                        }
                    },
                    LeaveGame: function() {
                        this.stopAllActions();
                        stopEffect(playTimeUpEff);
                        playTimeUpEff = null;
                    }
                }
            },
        },
        chat_btn: {
            _run: function() {
                this.visible = true
                setWgtLayout(this, [0.044, 0.091], [0.9650, 0.04], [0.24, 2.5]); 
            },
            _click: function() {
                var chatlayer = new ChatLayer();
                MjClient.Scene.addChild(chatlayer);
            }
        },
        voice_btn: {
            _run: function() {
                setWgtLayout(this, [0.044, 0.091], [0.965, 0.14], [0.24, 2.5]);

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
                    downAndPlayVoice(msg.uid, msg.msg);
                }
            }
        },
        bg_menu: {
            _run: function() {
                this.setSize(cc.director.getWinSize().width,this.height);
                setWgtLayout(this, [0, this.height/720], [0.5, 0], [0, 0]);
                this.setScaleX(1);
            },
        },
        block_tuoguan:{
            _layout:[
                [1, 1],
                [0.5, 0.5],
                [0, 0],
                true
            ],
            _run: function() {
                this.visible = false;
                this.zIndex = 500;
            },
            btn_tuoguan:{
                _touch:function (btn, eT) {
                    if (eT == 2) {
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "cancelTrust"},function (rtn) {
                            btn.getParent().setVisible(false);
                        });
                    }
                }
            },
            Text_1:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
            },
            _event:{
                beTrust:function (msg) {
                    cc.log("wxd........beTrust......."+JSON.stringify(msg));
                    if(getUIPlayer(0)&&getUIPlayer(0).info.uid == msg.uid){
                        if(MjClient.movingCard){
                            MjClient.movingCard.setTouchEnabled(false);
                            MjClient.movingCard.setScale(cardBeginScale);
                            MjClient.movingCard.setTouchEnabled(true);
                        }
                        this.visible = true;
                    }
                },
                cancelTrust:function (msg) {
                    if(getUIPlayer(0)&&getUIPlayer(0).info.uid == msg.uid) {
                        this.visible = false;
                    }
                },
                initSceneData:function (msg) {
                    var pl = getUIPlayer(0);
                    if(pl.trust){
                        this.visible = true;
                    }else {
                        this.visible = false;
                    }
                },
            }
        },
        // Button_kuaijie: {
        //     _run: function() {
        //         setWgtLayout(this, [this.width/1280, this.height/720], [0.92, 0], [0, 0]);
        //     },
        //     _click: function(btn) {
        //         var pos = btn.getPosition();
        //         MjClient.Scene.addChild(new DaMaZiQuickChatLayer(pos));
        //     }
        // },
        // Button_touxiang: {
        //     _run: function() {
        //         setWgtLayout(this, [this.width/1280, this.height/720], [0.79, 0], [0, 0]);
        //     },
        //     _click: function() {
        //         if (MjClient.playui.isFaPai) return;
                
        //         MjClient.showMsg("您确定投降（投降输" + MjClient.data.sData.tData.areaSelectMode.damazi_difen + "分）？", function () {
        //             MjClient.gamenet.request("pkroom.handler.tableMsg", {
        //                 cmd: "TouXiang",
        //                 isTouXiang: 2
        //             });
        //         }, function(){}, 1);
        //     }
        // },
        // Button_sort: {
        //     _run: function() {
        //         setWgtLayout(this, [this.width/1280, this.height/720], [0.66, 0], [0, 0]);
        //     },
        //     _click: function(btn) {
        //         if (MjClient.playui.isFaPai) return;
        //         MjClient.playui.onClickLiPai();
        //     }
        // },
        // Button_mingpai: {
        //     _run: function() {
        //         setWgtLayout(this, [this.width/1280, this.height/720], [0.53, 0], [0, 0]);
        //     },
        //     _click: function() {
        //         if (MjClient.playui.isFaPai) return;

        //         var mySelf = getUIPlayer(0);
        //         if(mySelf.selfMingCard) 
        //         {
        //             MjClient.showToast("您已明过牌");
        //             return;
        //         }
                
        //         var pl = getUIPlayer(2);//对家是队友
        //         if(pl.isMingCard) 
        //         {
        //             MjClient.showToast("每队只能有一个玩家“明牌”");
        //             return;
        //         }
        //         if(pl.handCount <= 0) 
        //         {
        //             MjClient.showToast("您的队友已出完牌，不能“明牌”");
        //             return;
        //         }

        //         if (mySelf.handCount <= 0 || mySelf.mjhand.length <= 0)
        //         {
        //             MjClient.showToast("您已出完牌，不能“明牌”");
        //             return;
        //         }
        //         if(mySelf.handCount > 20 || mySelf.mjhand.length > 20) 
        //         {
        //             MjClient.showToast("牌数少于20张（含20）才能“明牌”");
        //             return;
        //         }

        //         MjClient.showMsg("确定要“明牌”？", function () {
        //             MjClient.gamenet.request("pkroom.handler.tableMsg", {
        //                 cmd: "PKMingPai"
        //             });
        //         }, function(){}, 1);
        //     }
        // },
        // Button_score: {
        //     _run: function() {
        //         setWgtLayout(this, [this.width/1280, this.height/720], [0.40, 0], [0, 0]);
        //     },
        //     _click: function() {
        //         MjClient.Scene.addChild(new NiuShiBieFenPaiLayer());
        //     }
        // }
    },
    _downNode:null,
    _rightNode:null,
    _topNode:null,
    _leftNode:null,
    _btn_rank:null,
    _partner:null,

    // 下方菜单
    _btnScanScore:null,
    _btnMingPai:null,
    _btnTouXiang:null,
    _btnKuaiJie:null,
    _btnLiPai:null,

 ///牛十别专有提示
    _510kTipsAry:[],
    _TongHuaShunTipsAry:[],
    _510kTipsIndex:0,
    _TongHuaShunTipsIndex:0,
//牛十别专有排序
    _sortType:0,//0,正常排序，1，同花顺前面，2，510k前面
    _LiPaiCards:[],
 //
    ctor: function() {
        this._super();

        var playui = ccs.load(res.Play_daYeDaGong_json);

        this.srcMaxPlayerNum = MjClient.MaxPlayerNum;
        MjClient.MaxPlayerNum = parseInt(MjClient.data.sData.tData.maxPlayer);

        playMusic("bgFight_niushibie");
        this._downNode  = playui.node.getChildByName("down");
        this._rightNode = playui.node.getChildByName("right");
        this._topNode   = playui.node.getChildByName("top");
        this._leftNode  = playui.node.getChildByName("left");
        this._partner  = playui.node.getChildByName("partner");

        // this._btnScanScore = playui.node.getChildByName("Button_score");
        // this._btnMingPai = playui.node.getChildByName("Button_mingpai");
        // this._btnTouXiang = playui.node.getChildByName("Button_touxiang");
        // this._btnKuaiJie = playui.node.getChildByName("Button_kuaijie");
        // this._btnLiPai = playui.node.getChildByName("Button_sort");

        this._tingCardsNode = this._downNode.getChildByName("tingCardsNode");
        this._tingCardNumNode = this._downNode.getChildByName("tingCardNumNode");

        this._btnPutCard   = playui.node.getChildByName("BtnPutCard");
        this._btnHimt      = playui.node.getChildByName("BtnHimt");
        this._btnNoPut     = playui.node.getChildByName("BtnNoPut");
        this._btnBaoxi      = playui.node.getChildByName("Button_baoxi");
        this._btnNo_Baoxi    = playui.node.getChildByName("Button_no_baoxi");

        this.flyIcon_ming = playui.node.getChildByName("flyIcon_ming");
        this.node_PartnerTips = playui.node.getChildByName("PartnerTips");
        this.chickenAnim = playui.node.getChildByName("chickenAnim");
        this._partnerUI = playui.node.getChildByName("partner");
        this.flyZhuaFen = playui.node.getChildByName("flyZhuaFen");
        this.youPai_centre = playui.node.getChildByName("youPai_centre");
        this.Node_Anim = playui.node.getChildByName("Panel_Anim");

        this._noPutTips    = playui.node.getChildByName("noPutTips");
        this._bg_menu    = playui.node.getChildByName("bg_menu");

        MjClient.playui = this;
        MjClient.playui._clock = playui.node.getChildByName("clock");
        this.sortType     = MjClient.sortType.normal;
        this.nextSortType = MjClient.sortType.count;
        MjClient.playui._AniNode =  playui.node.getChildByName("eat");

        MjClient.sortClassType = 0;//util.localStorageEncrypt.getNumberItem(MjClient.sortClassKey,MjClient.sortClassType);
        MjClient.playui.sortType = MjClient.sortType.normal;

        MjClient.playui.srcPos = {};
        MjClient.playui.partnerCardsData = null;
        MjClient.playui.myFriendUid = null;

        MjClient.playui.msg_Cache = [];
        MjClient.playui.isRuned = false;

        if(MjClient.rePlayVideo != -1)// 表示回放
        {
            MjClient.sortClassType = 0;
            MjClient.playui.sortType = MjClient.sortType.normal;
        }

        //金币场进来加载先用临时图遮挡ui
        this.bg_temp = playui.node.getChildByName("bg_temp");
        this.top_banner = playui.node.getChildByName("banner");
        if (this.bg_temp){
            if(MjClient.rePlayVideo == -1 && MjClient.data && MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId){
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


        this.addChild(playui.node,0,"playUINode");
        BindUiAndLogic(playui.node, this.jsBind);
        

        //this._back  = playui.node.getChildByName("back");

        //触摸事件监听注册
        cc.eventManager.addListener(cc.EventListener.create(getTouchListener_card()),this._rightNode);

        // //添加滚动通知 by sking
        // var _laba_bg =  playui.node.getChildByName("banner").getChildByName("laba_bg");
        // _laba_bg.visible = false;
        // var _scroll =  playui.node.getChildByName("banner").getChildByName("scroll");
        // _scroll.visible = false;

        MjClient.lastMJTick = Date.now();

        this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function() {
                        if (MjClient.game_on_show) MjClient.tickGame(0);
        }), cc.delayTime(7))));

        // 在亲友圈房间中添加邀请亲友圈牌有一起对局
        addClubYaoqingBtn(2);

        // 俱乐部返回大厅功能：by_jcw
        addClub_BackHallBtn();

        // 回看
        // if(MjClient.rePlayVideo == -1 && MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
        //     this._viewLookBack = COMMON_UI.createPokerLookbackView()
        //     playui.node.addChild(this._viewLookBack);
        //     this._viewLookBack.setPosition(MjClient.size.width / 2,MjClient.size.height / 2);
        //     this._viewLookBack.setContentSize(MjClient.size.width, MjClient.size.height);
        // }
        // 切牌
        if(MjClient.rePlayVideo == -1){
            this._viewPlayerShuffle = COMMON_UI.createPokerPlayerShuffleView()
            playui.node.addChild(this._viewPlayerShuffle);
            this._viewPlayerShuffle.setPosition(MjClient.size.width / 2,MjClient.size.height / 2);
            this._viewPlayerShuffle.setContentSize(MjClient.size.width, MjClient.size.height);
        }

        // 预加载游戏背景
        // for (var i = 0; true; i ++)
        // {
        //     var file = getGameBgFile(i);

        //     if (file != "")
        //         cc.textureCache.addImageAsync(file);
        //     else
        //         break;
        // }
        
        return true;
    },
    onEnterTransitionDidFinish : function()
    {
        //this.setTouchEnabled(true);
        //cc.log("-----------init touch ---- ")
        this._super();
    },

    onExit:function()
    {
        this._super();
        MjClient.MaxPlayerNum = this.srcMaxPlayerNum;
    },

});

// add...................   Greene
//初始化桌子上的客户端数据c_data..各个游戏的自身数据可以在这里初始，
//尽量不要在外部公共代码判断游戏类型，而是在c_data里初始化数据。
//在PlayLayer的_event 的 initSceneData调用
PlayLayer_DaYeDaGong.prototype.InitC_Data = function() {
    if (!MjClient.data.c_Data)
        MjClient.data.c_Data = {};
    cc.log("InitC_Data===========================")
    //出牌是否动画

    MjClient.data.c_Data.bPutCardAnim =  false;
    // //是发采用老的牌型动画
    // MjClient.data.c_Data.bPutCardAnimOld = MjClient.data.sData.tData.areaSelectMode.playSpeed == 0;
    //牌型动画是否是文字图片
    MjClient.data.c_Data.bTxtAnim = false;//MjClient.data.sData.tData.areaSelectMode.playSpeed == 0;
}

PlayLayer_DaYeDaGong.prototype.clockNumberUpdate = function(node, endFunc)
{
    return arrowbkNumberUpdate(node, endFunc, 20);
}




PlayLayer_DaYeDaGong.prototype.updateClockPosition = function(arrowNode)
{
    var tData = MjClient.data.sData.tData;
    var uids = tData.uids;
    var curPlayerIndex = (tData.curPlayer + MjClient.MaxPlayerNum - tData.uids.indexOf(SelfUid())) % MjClient.MaxPlayerNum;

    var curPlayerNode = null;
    if (curPlayerIndex == 1)
        curPlayerNode = this._rightNode;
    else if (curPlayerIndex == 2)
        curPlayerNode = this._topNode;
    else if (curPlayerIndex == 3)
        curPlayerNode = this._leftNode;

    if (curPlayerNode != null)
        arrowNode.setPosition(curPlayerNode.getChildByName("deskCard").getPosition());
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
PlayLayer_DaYeDaGong.prototype.getGameInfoString = function(param)
{
    var tData = MjClient.data.sData.tData;
    var str = "";
    
    str += tData.areaSelectMode.showHandCount ? "显示手牌数," : "" ;
    str += tData.areaSelectMode.catPartnerCards  ? "可看队友手牌," : "" ;
    str += tData.areaSelectMode.laiziPoint == 2 ? "癞子为2," : "癞子为3," ;


    str += ("积分底分x" + tData.areaSelectMode.jieSuanDiFen) ; 
    
    if (str.charAt(str.length - 1) == ",")
        str = str.substring(0, str.length - 1);

    return str;
};

PlayLayer_DaYeDaGong.prototype.isChickenPlayer = function(){

};

PlayLayer_DaYeDaGong.prototype.showQiangZhuangTag = function(off, eD){
    var tData = MjClient.data.sData.tData;
    var node = getNode_cards(off).getChildByName("buQiangTag");

    if(tData.tState == TableState.waitJiazhu){

        if(!eD){
            var pl = getUIPlayer(off);

            if(pl && pl.qiang == 0){
                node.visible = true;
            }
        }else{
            var UIoff = getUiOffByUid(eD.uid);

            if(UIoff == off && eD.qiang == 0){
                node.visible = true;
            }
        }
        
    }
    else{
        node.visible = false;
    }
}

PlayLayer_DaYeDaGong.prototype.checkPartnerIsConfirm = function(){
    var tData = MjClient.data.sData.tData;
    var ret = true;

    if( tData.chickenCard == -1 || tData.chickenCard == null || typeof(tData.zhuangPartner) == "undefined" || tData.zhuangPartner < 0  || tData.zhuang == -1 
        || tData.tState == TableState.isReady || tData.tState == TableState.roundFinish || tData.tState == TableState.waitJiazhu ){
        ret = false;
    }

    return ret ;
};

PlayLayer_DaYeDaGong.prototype.addJiPaiTag = function(node){
    var tData = MjClient.data.sData.tData;

    if( !node || !(tData.chickenCard > 0) || !(tData.zhuang >= 0) || 
        tData.tState == TableState.isReady || tData.tState == TableState.roundFinish || tData.tState == TableState.waitJiazhu ||
        tData.tState == TableState.waitCard ){
        return
    }

    if(!node.getChildByName("jipaiTag") && node.tag == tData.chickenCard )
    {
        var _cardTag = new ccui.ImageView("playing/damazi/mingji-2.png");
        _cardTag.setAnchorPoint(0, 0.5)
        _cardTag.setPosition(0, node.height/3);
        _cardTag.setName("jipaiTag");
        node.addChild(_cardTag);
    }

};


PlayLayer_DaYeDaGong.prototype.addChickenCardIcon = function(off){
    var pl = getUIPlayer(off);
    var node = getNode_cards(off);

    if(!pl || !node){
        return;
    }

    function _addTagIcon(name){
        var children = node.children;
        var _max = -9999;
        var _endCard = null;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == name){
                if(ci.zIndex > _max){
                    _max = ci.zIndex
                    _endCard = ci;
                }

                var _tag = ci.getChildByName("chickenTag");
                if(_tag){
                    _tag.removeFromParent();
                }
            }
        }
        
        if(_endCard){
            var _cardTag = new ccui.ImageView(_path);
            if(name == "out"){
                _cardTag.setScale(1.8)
            }
            var _scale = _cardTag.getScale();
            _cardTag.setPosition(_endCard.width - _scale*_cardTag.width/2, _endCard.height - _scale*_cardTag.height/2);
            _cardTag.setName("chickenTag");
            _endCard.addChild(_cardTag);
        }
    }

    MjClient.playui.CardLayoutRestore(getNode_cards(off), off);
    var _path = "playing/damazi/jiaobiao-mingji.png";
    if(off === 0)
    {
        _addTagIcon("mjhand");
        _addTagIcon("out");
        //手牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "mjhand")
            {
                MjClient.playui.addJiPaiTag(ci);
            }
        }

        //打出去的牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "out")
            {
                MjClient.playui.addJiPaiTag(ci);
            }
        }
    }
    else
    {
        _addTagIcon("out");
        //打出去的牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "out")
            {
                MjClient.playui.addJiPaiTag(ci);
            }
        }
    }
};


PlayLayer_DaYeDaGong.prototype.setChickenCardIcon = function(eD)
{
    if(true){
        setChickenCardIcon(eD);
        return
    }
    
    var tData = MjClient.data.sData.tData;

    var _isZhuangPut = false;
    var _isZhuangPartnerWrong = false;
    var _isZhuangPartnerPut = false;

    if(eD){
        _isZhuangPut = eD.uid == tData.uids[tData.zhuang];
        _isZhuangPartnerWrong =(eD.zhuangPartner == null || eD.zhuangPartner < 0);

        if(_isZhuangPartnerWrong){ //首次才有zhuangPartner；
            _isZhuangPartnerWrong = typeof(tData.zhuangPartner) == "undefined" ||  tData.zhuangPartner < 0 || tData.zhuangPartner == null;
        }
        
        var _zhuangPartnerUid = eD.zhuangPartner;
        if(_zhuangPartnerUid >= 0){
            _zhuangPartnerUid = tData.uids[eD.zhuangPartner];
        }
        
        if(typeof(_zhuangPartnerUid) ==  "undefined" && tData.zhuangPartner >= 0){
            _zhuangPartnerUid = tData.uids[tData.zhuangPartner];
        }

        if( (_zhuangPartnerUid > 0) && (!(tData.zhuangPartner >= 0)) ){
            tData.zhuangPartner = tData.uids.indexOf(_zhuangPartnerUid);
        }
    }
    else{
        _isZhuangPut = tData.lastPutPlayer == tData.zhuang; 
        _isZhuangPartnerWrong = (typeof(tData.zhuangPartner) == "undefined" || tData.zhuangPartner < 0); 
        _isZhuangPartnerPut = tData.lastPutPlayer == tData.zhuangPartner;

        if(_isZhuangPut){
            _isZhuangPut = false;//重连忽略
        }
    }

    _isZhuangPartnerPut = (eD ? (eD.uid == _zhuangPartnerUid ) : true) ;//重连忽略

    if( tData.chickenCard == -1 || tData.chickenCard == null || tData.zhuang == -1 || _isZhuangPut || _isZhuangPartnerWrong || !_isZhuangPartnerPut
        || tData.tState == TableState.isReady || tData.tState == TableState.roundFinish || tData.tState == TableState.waitJiazhu ){
        return
    }

    if(!eD ){ //(tData.lastPutPlayer > 0 && (tData.lastPutPlayer ==  tData.zhuangPartner) )
        if(tData.lastPutPlayer == tData.zhuang){
            _isZhuangPut = true;
        }

        if(tData.uids[tData.zhuang] == SelfUid() && _isZhuangPut){
            return ;
        }

        if( tData.uids[tData.zhuangPartner] == tData.uids[tData.lastPutPlayer]) {

            MjClient.playui.addChickenCardIcon(getUiOffByUid(tData.uids[tData.lastPutPlayer]));
        }else{
            if(SelfUid() == tData.uids[tData.zhuangPartner] ){
                MjClient.playui.addChickenCardIcon(0);
            }
        }

        return ;
    }

    var off = getUiOffByUid(tData.uids[tData.lastPutPlayer]) ;
    if(eD){
        off = getUiOffByUid(eD.uid);
        MjClient.playui.addChickenCardIcon(off);
    }
};

PlayLayer_DaYeDaGong.prototype.showJieFengAnim = function(msg)
{
    var off = getOffByIndex(msg.curPlayer);
    var playerNode = getNode_cards(off);
    if (!playerNode)
        return;

    var _jiefeng = new cc.Sprite("playing/damazi/wz-woyaojiefeng.png");
    _jiefeng.setAnchorPoint(cc.p(0.5,0.5));
    MjClient.playui.addChild(_jiefeng,10);

    var headNode = playerNode.getChildByName("head");
    var offLine = headNode.getChildByName("offline");
    var point = offLine.convertToWorldSpace(cc.p(offLine.width/2, offLine.height/2));
    var winSize = cc.director.getWinSize();

    if (point.x < winSize.width/2) {
        // 上边、下边的玩家
        setWgtLayout(_jiefeng, [_jiefeng.width / 1280, _jiefeng.height / 720], [0, point.y/winSize.height], [-0.5, 0]);

        _jiefeng.runAction(cc.sequence( cc.moveBy(1, point.x + headNode.getBoundingBox().width/2 + _jiefeng.getBoundingBox().width, 0).easing(cc.easeBackOut()), 
            cc.callFunc(function() {
            _jiefeng.removeFromParent();
        })));
    } else {
        // 右边的玩家
        setWgtLayout(_jiefeng, [_jiefeng.width / 1280, _jiefeng.height / 720], [1, point.y/winSize.height], [0.5, 0]);

        _jiefeng.runAction(cc.sequence(cc.moveBy(1, -(winSize.width - point.x + headNode.getBoundingBox().width/2 + _jiefeng.getBoundingBox().width), 0).easing(cc.easeBackOut()), cc.callFunc(function() {
            _jiefeng.removeFromParent();
        })));
    }
}

//身份识别后播鸡的动画
PlayLayer_DaYeDaGong.prototype.showChickenAnim = function(index){
    var tData = MjClient.data.sData.tData;
    var UIoff =  getUiOffByUid(tData.uids[index]);

    var playerNode = getNode_cards(UIoff);
    if (!playerNode )
        return;

    MjClient.playui.chickenAnim.setPosition(MjClient.playui.srcPos.chickenAnim);

    var flyNode = MjClient.playui.chickenAnim;
    var headNode = playerNode.getChildByName("head");
    var point = headNode.convertToWorldSpace(cc.p(headNode.width/2, headNode.height/2));
    point = flyNode.getParent().convertToNodeSpace(point);
    
    flyNode.setVisible(true);
    flyNode.setScale(flyNode.getScale() * 1.5);
    flyNode.runAction(cc.sequence(cc.delayTime(1),cc.spawn(cc.moveTo(1.0, point), cc.scaleTo(1.0, flyNode.getScale()/1.5)), cc.callFunc(function() {
        //MjClient.playui.showZhuangIcon(UIoff, true);
        flyNode.setVisible(false);
    })));

};

//亮身份
PlayLayer_DaYeDaGong.prototype.showIdentityIcon = function(eD){
    var tData = MjClient.data.sData.tData;

    var _isZhuangPut = false;
    var _isZhuangPartnerWrong = false;

    if(eD){
        _isZhuangPut = eD.uid == tData.uids[tData.zhuang];
        _isZhuangPartnerWrong = eD.zhuangPartner == null || eD.zhuangPartner < 0;
    }
    else{
        _isZhuangPut = tData.lastPutPlayer == tData.zhuang; 
        _isZhuangPartnerWrong = (typeof(tData.zhuangPartner) == "undefined" || tData.zhuangPartner < 0); 

        if(_isZhuangPut){
            _isZhuangPut = false;
        }  
    }
    cc.log("-----_isZhuangPut----_isZhuangPartnerWrong----", _isZhuangPut, _isZhuangPartnerWrong)
    if( tData.chickenCard == -1 || tData.chickenCard == null || tData.zhuang == -1 || _isZhuangPut || _isZhuangPartnerWrong
        || tData.tState == TableState.isReady || tData.tState == TableState.roundFinish || tData.tState == TableState.waitJiazhu ){
        return
    }
    cc.log("----showIdentityIcon--------")
    var isMyselfHideGuy = false;


    if((eD ? eD.uid : tData.uids[tData.zhuangPartner]) == SelfUid()){
        isMyselfHideGuy = true;
    }

    var _mySelfIsZhuang = false;
    if( tData.uids[tData.zhuang] == SelfUid() ){
        _mySelfIsZhuang = true;
    }

    for(var i = 1; i < MjClient.MaxPlayerNum; i++){

        var _node = getNode_cards(i).getChildByName("head").getChildByName("identityIcon");

        if(isMyselfHideGuy){

            if( getPlayerIndex(i) == tData.zhuang ){ //friend
                _node.loadTexture("playing/damazi/icon-youren.png");

                MjClient.playui.myFriendUid = getUIPlayer(i).info.uid;
            }
            else{
                _node.loadTexture("playing/damazi/icon-diren.png");
            }
        }
        else{
            if( !_mySelfIsZhuang ){
                if( getUIPlayer(i).info.uid == (eD ? eD.uid : tData.uids[tData.zhuang] ) ||
                    getUIPlayer(i).info.uid == (eD ? tData.uids[eD.zhuangPartner] : tData.uids[tData.zhuangPartner]) || 
                    getUIPlayer(i).info.uid == (tData.uids[tData.zhuang] ) ){ //enemy
                    _node.loadTexture("playing/damazi/icon-diren.png");
                }
                else{
                    _node.loadTexture("playing/damazi/icon-youren.png");

                    MjClient.playui.myFriendUid = getUIPlayer(i).info.uid;
                }
            }else{
                if( getUIPlayer(i).info.uid == (eD ? eD.uid :tData.uids[tData.zhuangPartner]) ){
                    _node.loadTexture("playing/damazi/icon-youren.png");

                    MjClient.playui.myFriendUid = getUIPlayer(i).info.uid;
                }else{
                    _node.loadTexture("playing/damazi/icon-diren.png");
                }
            }
            
        }

        _node.setVisible(true);
    }

    if(eD && eD.zhuangPartner != null && eD.zhuangPartner != -1 ){
        MjClient.playui.showChickenAnim(eD.zhuangPartner);
    }
}


PlayLayer_DaYeDaGong.prototype.showPartnerTips = function(){
    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer(0);

    if(tData.chickenCard == -1 || tData.chickenCard == null || !pl){
        return;
    }

    cc.log("---------showPartnerTips----------", tData.zhuang)
    var _isZhuang = tData.uids[tData.zhuang] == SelfUid();
    var isZhuangFriend = false;

    if(_isZhuang){
        MjClient.playui.node_PartnerTips.loadTexture("playing/damazi/wenzi-2.png");
    }
    else{
        for(var i = 0 ; i < pl.mjhand.length; i++){
            if(pl.mjhand[i] == tData.chickenCard){
                isZhuangFriend = true;
                break;
            }
        }

        if(isZhuangFriend){
            MjClient.playui.node_PartnerTips.loadTexture("playing/damazi/wenzi-1.png")
        }else{
            MjClient.playui.node_PartnerTips.loadTexture("playing/damazi/wenzi-3.png")
        }
    }

    MjClient.playui.node_PartnerTips.setVisible(true);

    MjClient.playui.node_PartnerTips.scheduleOnce(function(){
        MjClient.playui.node_PartnerTips.setVisible(false);
    }, 2);

}


PlayLayer_DaYeDaGong.prototype.showYouPai = function(){
    var tData = MjClient.data.sData.tData;
    if(tData.chickenCard == -1 || tData.chickenCard == null ){
        return;
    }

    var node  = MjClient.playui.top_banner.getChildByName("youPai_top").getChildByName("card");
    setCardSprite_card(node, tData.chickenCard, false, "mjhand_you");
    node.getParent().setVisible(true);

    var UIoff = getUiOffByUid(tData.uids[tData.zhuang]);
    cc.log("--------------normal---UIoff----tData.zhuang----",UIoff, tData.zhuang)

    MjClient.playui.showZhuangIcon(UIoff, false);
}

PlayLayer_DaYeDaGong.prototype.showYouPaiAnim = function(flyNode, cardValue ){

    var _destNode = MjClient.playui.top_banner.getChildByName("youPai_top");
    var point = _destNode.convertToWorldSpace(cc.p(_destNode.width/2, _destNode.height/2));
    point = flyNode.getParent().convertToNodeSpace(point);
    setCardSprite_card(flyNode.getChildByName("card"), cardValue, false);
    flyNode.setVisible(true);
    flyNode.setScale(flyNode.getScale() * 1.1);
    flyNode.runAction(cc.sequence(cc.delayTime(0.1),cc.spawn(cc.moveTo(0.8, point), cc.scaleTo(0.8, flyNode.getScale()/1.5)), cc.callFunc(function() {
        MjClient.playui.showYouPai();
        MjClient.playui.showPartnerTips();
        MjClient.playui.CardLayoutRestore(getNode_cards(0), 0);
        flyNode.setVisible(false);
    })));
}

//重连
PlayLayer_DaYeDaGong.prototype.dealZhuangMing = function(){
    var tData = MjClient.data.sData.tData;

    if(tData.tState == TableState.isReady || tData.tState == TableState.roundFinish 
        || tData.tState == TableState.waitJiazhu || tData.zhuang == -1 || tData.tState == TableState.waitCard ){
        return
    }

    var UIoff = getUiOffByUid(tData.uids[tData.zhuang]);
    cc.log("--------------duan---UIoff----tData.zhuang----",UIoff, tData.zhuang)

    var _isMing = (tData.chickenCard == -1);
    if(_isMing){
        
        // for(var i = 0; i < MjClient.MaxPlayerNum; i++){
        //     var pl = getUIPlayer(UIoff);
        //     cc.log("------pl.qiang------i-", pl.qiang, i);
        //     if(pl && pl.qiang == 1){
        //         UIoff = i;
        //         break
        //     }
        // }
    } 

   MjClient.playui.showZhuangIcon(UIoff, _isMing)
}


//明抢了
PlayLayer_DaYeDaGong.prototype.showMingAnim = function(msg){

    var UIoff =  getUiOffByUid(msg.uid);
    var _qiang = msg.qiang;

    var playerNode = getNode_cards(UIoff);
    if (!playerNode || _qiang != 1)
        return;
    
    MjClient.playui.flyIcon_ming.setPosition(MjClient.playui.srcPos.flyIcon_ming) ;

    var flyNode = MjClient.playui.flyIcon_ming;
    var headNode = playerNode.getChildByName("head");
    var point = headNode.convertToWorldSpace(cc.p(headNode.width/2, headNode.height/2));
    point = flyNode.getParent().convertToNodeSpace(point);
    
    flyNode.setVisible(true);
    flyNode.setScale(flyNode.getScale() * 1.5);
    flyNode.runAction(cc.sequence(cc.delayTime(1),cc.spawn(cc.moveTo(1.0, point), cc.scaleTo(1.0, flyNode.getScale()/1.5)), cc.callFunc(function() {
        cc.log("-----showming---")
        MjClient.playui.showZhuangIcon(UIoff, true);
        flyNode.setVisible(false);
    })));
}


PlayLayer_DaYeDaGong.prototype.showZhuangIcon = function (UIoff, isMing) {
    var tData = MjClient.data.sData.tData;

    if(tData.tState == TableState.isReady || tData.tState == TableState.roundFinish 
        || tData.tState == TableState.waitJiazhu ){
        return
    }
    
    var pl = getUIPlayer(UIoff);

    if( getNode_cards(UIoff) && pl)
    {   
        var node = getNode_cards(UIoff).getChildByName("head").getChildByName("zhuang");
        node.zIndex = 99;

        if(isMing){
            node.loadTexture("playing/damazi/icon-ming-2.png");
        }else{
            node.loadTexture("playing/damazi/icon-zhuang.png"); 
        }

        node.visible = true;
        var linkZhuang = node.getChildByName("linkZhuang");
        linkZhuang.setVisible(false);
    }
}


PlayLayer_DaYeDaGong.prototype.showFlyCardAnim = function(flyNode,cardValue,UIoff)
{
    var playerNode = getNode_cards(UIoff);
    if (!playerNode)
        return;

    var headNode = playerNode.getChildByName("head");
    var point = headNode.convertToWorldSpace(cc.p(headNode.width/2, headNode.height/2));
    point = flyNode.getParent().convertToNodeSpace(point);
    setCardSprite_card(flyNode, cardValue, false);
    flyNode.setVisible(true);
    flyNode.setScale(flyNode.getScale() * 1.5);
    flyNode.runAction(cc.sequence(cc.delayTime(1),cc.spawn(cc.moveTo(1.0, point), cc.scaleTo(1.0, flyNode.getScale()/1.5)), cc.callFunc(function() {
        flyNode.setVisible(false);
    })));
}

PlayLayer_DaYeDaGong.prototype.showHandCardBeiMian = function()
{
    cc.log("showHandCardBeiMian");
    var playerNode = getNode_cards(0);
    var childrens = playerNode.getChildren();
    for (var i = 0; i < childrens.length; i++)
    {
        if (childrens[i].name != "mjhand")
            continue;

        var beiMain = new cc.Sprite("playing/cardPic2/beimian_puke.png");
        beiMain.setName("beiMain");
        beiMain.setScale(childrens[i].width/beiMain.width, childrens[i].height/beiMain.height);
        beiMain.setPosition(childrens[i].width/2, childrens[i].height/2);
        childrens[i].addChild(beiMain, 111);
    }
}

PlayLayer_DaYeDaGong.prototype.hideHandCardBeiMian = function()
{
    cc.log("hideHandCardBeiMian");
    var playerNode = getNode_cards(0);
    var childrens = playerNode.getChildren();
    for (var i = 0; i < childrens.length; i++)
    {
        if (childrens[i].name != "mjhand")
            continue;

        childrens[i].removeChildByName("beiMain");
    }
}

PlayLayer_DaYeDaGong.prototype.CardLayoutRestore = function(node, off)
{
    cc.log("PlayLayer_DaYeDaGong11==============");
    
    // 如果正在发牌 不排序
    if (MjClient.playui.isFaPai) return;
    
    cc.log("PlayLayer_DaYeDaGong22==============");

    //先停止手牌的动作，在重排
    StopHandCardAnim(node);

    if(MjClient.sortClassType == 0)
    {
        cc.log("横向排序");
        MjClient.playui.horSort(node, off);
    }
    else
    {
        cc.log("纵向排序");
        MjClient.playui.verSort(node, off);
    }
};

PlayLayer_DaYeDaGong.prototype.CardLayoutDesk = function(node,cards,off)
{
    var tData = MjClient.data.sData.tData;

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

        if(tData.hunCard == ci.tag)
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
    var width = outSize.width * outScale * 0.4;
    var x = 0;
    var areaWidth = (uiOut.length - 1) * width + outSize.width * outScale;

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
        x += width;
    }
    MjClient.initDesk_y = "undefined";

    // 打出牌添加癞子角标
    if (!tData.lastPutCard)
        return;

    var laiziCards = MjClient.majiang.getLaiziCardsFromRet(tData.lastPutCard);
    var indexOfLaiziCards = function(tag) {
        for (var i = 0; i < laiziCards.length; i++) {
            if (MjClient.majiang.removeLaiziSign(laiziCards[i]) == tag)
                return i;
        }

        return -1;
    }
    for (var i = 0; i < children.length; i++) {
        var ci = children[i];

        if (ci.name != "out")
            continue;

        var found = indexOfLaiziCards(ci.tag);
        if (found < 0)
            continue;

        laiziCards.splice(found,1);

        var signLaizi = new cc.Sprite("playing/paodekuaiTable_new/sign_laizi.png");
        signLaizi.setName("signLaizi");
        signLaizi.setAnchorPoint(0, 0);
        signLaizi.setPosition(0, 0);
        ci.addChild(signLaizi);
    }

    if(tData.zhuang >= 0 && (getPlayerIndex(off) == tData.zhuang)){
        setZhuangPaiIcon(off);
    }
};

//横向摆放《正常》
PlayLayer_DaYeDaGong.prototype.horSort = function(node, off)
{
    var pl; //player 信息
    pl = getUIPlayer(off);//获取玩家信息.off 为0 ，就是自己得信息，能看到自己摸牌 by sking
    if(!pl) return;

    if(MjClient.rePlayVideo != -1)// 表示回放
    {
        MjClient.sortClassType = 0;
        MjClient.playui.sortType = MjClient.sortType.normal;
    }
    var tData = MjClient.data.sData.tData;

    var children = node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {

            if((typeof MjClient.init_y) == 'undefined')
            {
                MjClient.init_y = ci.y;
            }
            
            var _cardType = ci.getChildByName("cardType");
            var _smallFlower = _cardType && _cardType.getChildByName("smallFlower");
            if(_smallFlower)
            {
                _smallFlower.setPosition(22,35)
            }

            
            if(off == 0 && tData.zhuang >= 0 && (SelfUid() != tData.uids[tData.zhuang]) ){
                MjClient.playui.addJiPaiTag(ci);
            }
        }
    }


    //up stand 是2种麻将的图。
    var stand = node.getChildByName("stand");
    stand.visible = false;
    var start = stand;
    var uistand = [];
    var tempMaJiang = MjClient.majiang;

    for(var i = 0; i < children.length; i++) //children 为 "down" 节点下的字节点
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            if (!ci.cannotOut)
                ci.setColor(cc.color(255,255,255));
            uistand.push(ci);
        }
        else if(ci.name == "mjhand_replay" || ci.name == "mjhand_ming")
        {
            uistand.push(ci);
        }
    }

    var playerHands = pl.mjhand;

    // 明牌特殊处理
    if (pl.isMingCard) {
        playerHands = [];

        for(var j = 0;j <uistand.length;j++ )
        {
            playerHands.push(uistand[j].tag);   
        }
    }

    var pro_rankType = MjClient.playui.sortType;
    if(!playerHands || cc.isUndefined(playerHands))
    {
        return;
    }

    //排除理牌的牌
    var mjhandCopy = playerHands.concat();//手牌值
    var mySortui = [];
///////////////////////////////////////////////////////////////////////////////////////

    if (pl.info.uid == SelfUid())
    {//只有自己处理理牌逻辑
        //删除手牌值里理牌的牌
        for(var i = 0; i < this._LiPaiCards.length; i++)
        {
            for(var j = 0; j < mjhandCopy.length; j++)
            {
                if( mjhandCopy[j] == this._LiPaiCards[i] ){
                    mjhandCopy.splice(j, 1);
                    break;
                }
            }
        } 
        for(var i = 0; i < this._LiPaiCards.length; i++)
        {
            for(var j = 0; j < uistand.length; j++)
            {
                if( uistand[j].tag == this._LiPaiCards[i] ){
                    mySortui.push(uistand[j]);
                    uistand.splice(j, 1);
                    break;
                }
            }
        }        
    }
///////////////////////////////////////////////////////////////////////////////

    //理牌后剩下其他的牌
    var mjhandPai = tempMaJiang.sortHandCards(mjhandCopy,pro_rankType);
    var myUiStand = []; //重新排序后
    for(var j = 0;j < mjhandPai.length;j++)
    {
        for (var i = 0; i < uistand.length; )
        {
            if (uistand[i].tag == mjhandPai[j])//这张牌，有可能是，理牌里面的牌，也有可能是没理牌的牌
            {
                myUiStand.push(uistand[i]);
                uistand.splice(i,1);
            }
            else
            {
                i++;
            }
        }
    }
    uistand = myUiStand;

    var uiOrder = [mySortui, uistand];
    var orders = []; //重新排序后装到数组里 by sking
    //不需要理牌的手牌
    for(var j = 0; j < uiOrder.length; j++)
    {
        var uis = uiOrder[j];
        for(var i = 0; i < uis.length; i++)
        {
            uis[i].zIndex = 0;
            orders.push(uis[i]);
        }
    }

    //设置麻将位置
    
    if(off == 0)//自己
    {
        var cardWidth = orders[0] ? orders[0].width * orders[0].scale : 0;
        var screenScale = MjClient.size.width/1280;
        var areaWidth = MjClient.size.width - screenScale * (isIPhoneX() ? 100 : 80);
        var width = (areaWidth - cardWidth) / (27 - 1) + (27 - orders.length) * 1 * screenScale;
        var startX = screenScale * (isIPhoneX() ? 30 : 10) + (areaWidth - width * (orders.length - 1))/2;

        for(var i = 0; i < orders.length; i++)
        {
            var ci = orders[i];
            ci.x = startX;
            startX += width;
            ci.zIndex = i;

            ci.showWidth = i < orders.length - 1 ? width : cardWidth;

            if( i == orders.length - 1 && tData.zhuang >= 0 && (SelfUid() == tData.uids[tData.zhuang]) ){
                setZhuangPaiIcon(0)
            }
        }
    }
    else if (off == 1)//右侧的
    {   
        var cardWidth = orders[0] ? orders[0].width * orders[0].scale : 0;
        var cardHeight = orders[0] ? orders[0].height * orders[0].scale : 0;
        var screenScale = MjClient.size.width/1280;
        var width = cardWidth - 5*screenScale;
        var height = cardHeight - 5*screenScale;
        var baseX = null;
        if (orders.length <= 14)
            baseX = start.x - (orders.length - 1) * width;
        else if (orders.length % 2 != 0) {
            baseX = start.x - Math.floor(orders.length/2)*width;
        } else {
            baseX = start.x - (orders.length/2 - 1) * width;
        }

        var startX = baseX;
        
        for(var i = 0; i <= orders.length - 1; i ++)
        {
            var ci = orders[i];

            if (ci.name == "mjhand_replay" || ci.name == "mjhand_ming") {
                if (orders.length <= 14) {
                    ci.y = start.y;
                } else if (orders.length % 2 != 0) {
                    if (i < Math.ceil(orders.length/2))
                        ci.y = start.y + height;
                    else
                        ci.y = start.y;

                    if (i == Math.ceil(orders.length/2))
                        startX = baseX;
                } else {
                    if (i < orders.length/2)
                        ci.y = start.y + height;
                    else
                        ci.y = start.y;

                    if (i == orders.length/2)
                        startX = baseX;
                }

                ci.x = startX;
                startX += width;

                orders[i].zIndex = i;
            }
        }
    }
    else if (off == 2) { // 上边的
        var cardWidth = orders[0] ? orders[0].width * orders[0].scale : 0;
        var cardHeight = orders[0] ? orders[0].height * orders[0].scale : 0;
        var screenScale = MjClient.size.width/1280;
        var width = cardWidth - 5*screenScale;
        var height = cardHeight - 5*screenScale;
        var startX = start.x;

        for(var i = 0; i < orders.length; i++)
        {
            var ci = orders[i];

            if (ci.name == "mjhand_replay" || ci.name == "mjhand_ming") {

                if (orders.length <= 12) {
                    ci.y = start.y;
                } else if (orders.length % 2 != 0) {
                    if (i >= Math.ceil(orders.length/2))
                        ci.y = start.y - height;
                    else
                        ci.y = start.y;

                    if (i == Math.ceil(orders.length/2))
                        startX = start.x;
                } else {
                    if (i >= orders.length/2)
                        ci.y = start.y - height;
                    else
                        ci.y = start.y;

                    if (i == orders.length/2)
                        startX = start.x;
                }

                ci.x = startX;
                startX += width;

                ci.zIndex = i;
            }
        }
    }
    else if (off == 3)//左侧的
    {
        var cardWidth = orders[0] ? orders[0].width * orders[0].scale : 0;
        var cardHeight = orders[0] ? orders[0].height * orders[0].scale : 0;
        var screenScale = MjClient.size.width/1280;
        var width = cardWidth - 5*screenScale;
        var height = cardHeight - 5*screenScale;
        var startX = start.x;
        
        for(var i = 0; i < orders.length; i++)
        {
            var ci = orders[i];

            if (ci.name == "mjhand_replay" || ci.name == "mjhand_ming") {
                if (orders.length <= 14) {
                    ci.y = start.y;
                } else if (orders.length % 2 != 0) {
                    if (i < Math.ceil(orders.length/2))
                        ci.y = start.y + height;
                    else
                        ci.y = start.y;

                    if (i == Math.ceil(orders.length/2))
                        startX = start.x;
                } else {
                    if (i < orders.length/2)
                        ci.y = start.y + height;
                    else
                        ci.y = start.y;

                    if (i == orders.length/2)
                        startX = start.x;
                }

                ci.x = startX;
                startX += width;

                ci.zIndex = i;
            }
        }
    }
}

//纵向摆放
PlayLayer_DaYeDaGong.prototype.verSort = function(node, off)
{
    if(off != 0)
    {
        return;
    }
    var pl = getUIPlayer(off);//获取玩家信息.off 为0 ，就是自己得信息，能看到自己摸牌 by sking

    MjClient.playui.sortType = MjClient.sortType.normal;

    var mjhandNum = 0;
    var children = node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            mjhandNum++;
            if((typeof MjClient.init_y) == 'undefined')
            {
                MjClient.init_y = ci.y;
            }

            ci.y = MjClient.init_y;
            //ci.isGray = false;
            var _smallFlower = ci.getChildByName("cardType").getChildByName("smallFlower");
            if(_smallFlower)
            {
                _smallFlower.setPosition(65,80);
            }
        }
    }

    var tempMaJiang = MjClient.majiang; //麻将的各种方法判断，是否可以杠，是否可以吃... by sking

    //up stand 是2种麻将的图。
    var up = node.getChildByName("up");
    var stand = node.getChildByName("stand");
    stand.visible = false;
    var start = stand;

    var upSize = start.getSize();
    var upS = start.scale;
    var uistand = [];
    var uisort = [];
    var uihun = [];//癞子牌在最左边

    for(var i = 0; i < children.length; i++) //children 为 "down" 节点下的字节点
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            //ci.setColor(cc.color(255,255,255));

            uistand.push(ci);
        }
        else if(ci.name == "mjhand_replay")
        {
            uistand.push(ci);
        }
    }


    /*
     排序方式
     */
    var pro_rankType = 1;
    if(off == 0)
    {
        pro_rankType = MjClient.playui.sortType;
    }

    if(!pl.mjhand || cc.isUndefined(pl.mjhand))
    {
        return;
    }


    //排除理牌的牌
    var mjhandCopy = pl.mjhand.concat();
    var copyuistand = uistand.concat();
    for(var i = 0;i< MjClient.colloctionCardsUIArray.length;i++) {
        var colloctionUI = []; //重新排序后
        var _colloctionUICards = MjClient.colloctionCardsUIArray[i].concat();
        for(var j = 0;j < _colloctionUICards.length;j++) {
            for (var k = 0; k < copyuistand.length; k++) {
                if (copyuistand[k].tag == _colloctionUICards[j].tag &&
                    copyuistand[k].getUserData() == _colloctionUICards[j].getUserData()){//这里保存的有可能是我当前选中的牌，这里应该排除我当前选的牌
                    if(!checkUINodeHave(uisort,copyuistand[k]))
                    {
                        colloctionUI.push(copyuistand[k]);//有可能第二次装的数组还是，前一个值，ui节点是同一个。
                        break;
                    }
                    break;
                }
            }
        }
        uisort[i] = colloctionUI;//保存理牌数组
        mjhandCopy = getExcludeCards(mjhandCopy,MjClient.colloctionCardsArray[i]);
    }

    cc.log("MjClient.colloctionCardsArray = " + JSON.stringify(MjClient.colloctionCardsArray));


    //理牌的牌，装进数组 mySortui
    var mySortui = [];
    for(var j = 0; j < uisort.length; j++)
    {
        var uiss = uisort[j];
        for(var i = 0; i < uiss.length; i++)
        {
            uiss[i].zIndex = 50;
            cc.log("理牌的牌 = " + uiss[i].tag);
            mySortui.push(uiss[i]);
        }
    }

    //理牌后剩下其他的牌
    var mjhandPai = tempMaJiang.sortHandCards(mjhandCopy,pro_rankType);

    //移除已选牌的UI
    var newuiStand = [];
    for(var j = 0;j <uistand.length;j++ )
    {
        var bExsit = false;
        for(var i = 0 ;i < mySortui.length;i++)
        {
            if(mySortui[i].tag == uistand[j].tag  && mySortui[i].getUserData() == uistand[j].getUserData())
            {
                if(!checkUINodeHave(newuiStand,uistand[j]))
                {
                    bExsit = true;
                    break;
                }
            }
        }

        if(!bExsit)
        {
            newuiStand.push(uistand[j]);
        }
    }
    uistand = newuiStand;


    //重新排序后的牌
    var myUiStand = [];
    for(var j = 0;j < mjhandPai.length;j++)
    {
        for (var i = 0; i < uistand.length; )
        {
            if (uistand[i].tag == mjhandPai[j])//这张牌，有可能是，理牌里面的牌，也有可能是没理牌的牌
            {
                myUiStand.push(uistand[i]);
                uistand.splice(i,1);
            }
            else
            {
                i++;
            }
        }
    }
    uistand = myUiStand;


    /*
        纵向排序
    */

    //没有理牌的牌，按照牌分别存贮在各个数组里
    var afterSortUI = [];
    var lashCardValue = -1;
    var icount = 0;
    var _length = 0;
    for(var i = 0;i<uistand.length;i++)
    {
        var _value = getCardValueByID(uistand[i].tag);

        if(lashCardValue != _value)
        {
            icount = 0;
            lashCardValue = _value;
            _length = afterSortUI.length;
            afterSortUI[_length] = [];
        }
        uistand[i].zIndex = 100;
        afterSortUI[_length][icount] = uistand[i];
        icount++;
    }


    /*
        清除空牌堆
    */
    var _afterSortUI = [];
    for(var i =  0;i < afterSortUI.length;i++)
    {
        var _uiArray = afterSortUI[i];
        if(_uiArray.length > 0)
        {
            _afterSortUI.push(_uiArray);
        }
    }
    afterSortUI = _afterSortUI;

    var _uisort = [];
    for(var i =  0;i < uisort.length;i++)
    {
        var _uiArray = uisort[i];
        if(_uiArray.length > 0)
        {
            _uisort.push(_uiArray);
        }
    }
    uisort = _uisort;




    //初始化排序的出数值
    var _cardPileLength = afterSortUI.length;//其他牌堆个数
    var _sortPileLength = uisort.length ;//理牌堆的个数
    if(uisort.length > 0)//有理牌堆
    {
        _cardPileLength += _sortPileLength;
    }
    MjClient.currentCardPileCount = _cardPileLength;
    var screenX = MjClient.size.width;//屏幕宽度
    var cardX = upSize.width * upS*1.28;//一张牌的宽度
    var oneX = upSize.width * upS * 1.28;//牌间距
    var dy = upSize.width * upS*0.55;//竖着的间隙
    var StartX = screenX/2 - _cardPileLength*cardX/2 + cardX/2;
    var StartY = start.y;

    if(_cardPileLength <= 13)
    {
        oneX = cardX;
    }
    else
    {
        oneX =  cardX - (cardX/13)*(_cardPileLength - 13);//满屏13张牌，每多一张牌，减除一张牌的宽度
        StartX = screenX/2 - _cardPileLength*oneX/2 + oneX/2;
    }


    /*
      1 先排序理牌的牌
    */
    for(var i = 0;i < uisort.length;i++)
    {
        var _sortuiArray = uisort[i];
        var x = StartX + oneX*i;
        var y = StartY;
        for(var j = 0;j < _sortuiArray.length;j++)
        {
            var ci = _sortuiArray[j];
            cc.log("理牌 tag = " + ci.tag);
            ci.x  = x;
            ci.y  = y + j*dy;
            ci.zIndex -= j*3;
            ci.zIndex += i*2;
        }
    }

    /*
       2 排序其他的牌
    */
    StartX += oneX*_sortPileLength;
    for(var i =  0;i < afterSortUI.length;i++)
    {
        var x = StartX + oneX*i;
        var y = StartY;
        var _uicard = afterSortUI[i];

        for(var j = 0;j < _uicard.length;j++)
        {
            var ci = _uicard[j];
            ci.x  = x;
            ci.y  = y + j*dy;
            ci.zIndex -= j*2;
            ci.zIndex += i*2;
        }
    }
}

PlayLayer_DaYeDaGong.prototype.changePosition = function(msg,flyNode,oldUids)
{
    if (!msg)return;
    var currentSelectCard = msg.selectedCard;
    var change_uids  = msg.uids;
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var current_uids = tData.uids;

    if (oldUids)
        current_uids = oldUids;

    cc.log("changePosition change_uids = " + JSON.stringify(change_uids));
    cc.log("changePosition current_uids = " + JSON.stringify(current_uids));

    //初始化手牌张数
    if (msg.handCounts) {
        var sData = MjClient.data.sData;
        for (var uid in msg.handCounts) {
            var pl = sData.players[uid];
            pl.handCount = msg.handCounts[uid];
            //cc.log("初始化手牌张数 .handCount =" + pl.handCount);
        }
    }

    for(var i = 0;i < MjClient.MaxPlayerNum;i++)
    {
        currentLeftCardCount_NiuShiBie(i);
    }

    //回放的时候
    if(MjClient.rePlayVideo != -1)
    {
        tData.uids = msg.uids;//要更新uid位置
        resetPlayerHead();
    }
    else
    {
        var _toNodePos = [];
        for(var i = 0;i < change_uids.length; i++)
        {
            var _toNode   = getNode_cards(i).getChildByName("head");
            _toNodePos.push(_toNode.getPosition());
        }

        for(var i = 0;i < change_uids.length; i++)
        {

            var change_UIoff = card_getUiOffByUid(change_uids[i],change_uids);

            var current_UIoff = card_getUiOffByUid(change_uids[i],current_uids);

            if(change_UIoff != current_UIoff)
            {
                changePositionByUIoff(current_UIoff, _toNodePos[change_UIoff]);
            }
        }
        tData.uids = msg.uids;//要更新uid位置
        MjClient.playui.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
            resetPlayerHead();

            MjClient.playui.showFlyCardAnim(flyNode,currentSelectCard,getUiOffByUid(msg.zhuang));
        })));
    }
}


PlayLayer_DaYeDaGong.prototype.showXiFenAnim = function(msg){
    if(msg == null){
        return;
    }
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var typeArr = ["1_animIcon.png", "6_animIcon.png", "11_animIcon.png", "12_animIcon.png"];

    var _exe = function(msg){

        (function(msg){

            for(var i = 0; i < MjClient.MaxPlayerNum; i++ ){
                (function(i) {
                    var _uid = tData.uids[i];
                    var _off = getUiOffByUid(_uid);
                    var k = _uid.toString();
                    var _score = msg[k];
                    var _type = msg.xiFenType; //1:4副纯510K   2:4王+其他牌    3:4王+1花   4:4王+2花   5:7喜   6:8喜 

                    var nodeLose = getNode_cards(_off).getChildByName("head").getChildByName("flyScore_0");
                    var nodeWin = getNode_cards(_off).getChildByName("head").getChildByName("flyScore_1");
                    nodeLose.ignoreContentAdaptWithSize(true);
                    nodeWin.ignoreContentAdaptWithSize(true);

                    var pos = {};
                    pos.win = nodeWin.getPosition();
                    pos.lose = nodeLose.getPosition();

                    if(_type >= 1 && _type <= 12 && i == 0){

                        var _showNode = MjClient.playui.Node_Anim.getChildByName("flyXifenNode");
                        if(_showNode){
                            _showNode.removeFromParent();
                        }        
                        
                        _showNode = new cc.Sprite("playing/tongShanDaGong/" + typeArr[_type-1]);
                        _showNode.setPosition(cc.p(cc.director.getWinSize().width * 0.5, cc.director.getWinSize().height * 0.5 + 50));
                        _showNode.setScale(Math.min(MjClient.size.width/1280,MjClient.size.height/720));
                        MjClient.playui.Node_Anim.addChild(_showNode, 9999, "flyXifenNode");

                        _showNode.runAction(cc.sequence( cc.fadeIn(0.1), cc.fadeOut(1.4), cc.removeSelf()) );

                        // _showNode.runAction(cc.sequence( cc.fadeIn(0.1), cc.fadeOut(1.4), cc.callFunc(function(){
                        //     //this.setVisible(false)
                        //     //this.removeFromParent()
                        // }.bind(_showNode))  ));
                    }
                    var _nodeLose = nodeLose;
                    var _nodeWin = nodeWin;

                    //(function(_nodeWin, _nodeLose, pos){
                    _nodeLose.setScale(1.8);
                    _nodeWin.setScale(1.8);
                    _nodeLose.zIndex = 999;
                    _nodeWin.zIndex = 999;

                    if(_score >= 0 ){
                        _nodeWin.setString("/" + _score);
                        _nodeWin.setVisible(true);
                        //cc.fadeOut(1.5),  cc.moveBy(0.8, cc.p(0,-20))
                        _nodeWin.runAction(cc.sequence( cc.moveBy(0.2, cc.p(0,20)), cc.delayTime(1.3), cc.callFunc(function(){

                            _nodeWin.setPosition(pos.win);
                            _nodeWin.setVisible(false);
                        })  ));
                    }else{
                        _nodeLose.setVisible(true);
                        _nodeLose.setString("/" + _score);

                        _nodeLose.runAction(cc.sequence( cc.moveBy(0.2, cc.p(0,20)), cc.fadeOut(1.3),  cc.callFunc(function(){
                            
                            _nodeLose.setPosition(pos.lose);
                            _nodeLose.setVisible(false);
                        })  ));
                    }
                }.bind(this))(i); //(nodeWin, nodeLose, pos);
            }

            //MjClient.playui.msg_Cache.shift();
            //MjClient.playui.isRuned = false;

        }.bind(this))(msg); 
    
    }.bind(this);

    MjClient.playui.msg_Cache.push(msg);

    var _delay = function(){
        if( MjClient.playui.isRuned ){
            return
        }

        MjClient.playui.isRuned = true;

        var _count = 0;
        for(var j=0; j < MjClient.playui.msg_Cache.length; j++){

            (function(data){
                MjClient.playui.scheduleOnce(function(){
                    _exe(data);

                }, j*0.8);
                
            }.bind(this))(MjClient.playui.msg_Cache[j]);

            _count++;
        }

        for(var i = 0; i < _count; i++){
            if(MjClient.playui.msg_Cache.length > 0){
                MjClient.playui.msg_Cache.shift();
            }
        }
        MjClient.playui.isRuned = false;
    }.bind(this);

    MjClient.playui.scheduleOnce(_delay, 1);
};

//处理明牌
PlayLayer_DaYeDaGong.prototype.dealMingPai = function(node, msgary, UIOff, needSound)
{   
    // 回放情形下，不需展示明牌
    if (MjClient.rePlayVideo != -1)
        return;

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var _node = null;
    var off = UIOff;
    var uids = tData.uids;
    var playerIndex = getPlayerIndex(off);

    for(var i in msgary)
    {
        var msg = msgary[i];
        _node = null;

        if (SelfUid() == msg.uid && off == 0) {
            _node = getNode_cards(2);
            off = 2;

            var pl = getUIPlayer(0);
            pl.selfMingCard = true;
        } else if(uids[playerIndex] == msg.uid) {
            _node = node;
        }
    
        if (_node) {
            var pl = getUIPlayer(off);
            pl.isMingCard = true;
    
            var children = node.children;
            for(var i = children.length - 1; i >= 0; i--)
            {
                var ci = children[i];
                if(ci.name == "mjhand_ming")
                {
                    ci.removeFromParent(true);
                }
            }
    
            var vcard = [];
            for (var i = 0; i < msg.mjhand.length; i++) {
                var card = getNewCard_card(_node, "stand", "mjhand_ming", msg.mjhand[i], off);
    
                var index = vcard.indexOf(msg.mjhand[i]);//区分2张一样的牌
                if(index >= 0)
                {
                    card.setUserData(1);
                }
                else
                {
                    card.setUserData(0);
                }
                vcard.push(msg.mjhand[i]);
            }
    
            MjClient.playui.CardLayoutRestore(_node, off);

            if (needSound)
                playEffectInPlay("mingpai");
        }
    }
}

PlayLayer_DaYeDaGong.prototype.showWatchPanel = function(node, cards){
    cc.log("---showWatchPanel------1111------", MjClient.playui.checkPartnerIsConfirm(), cards)
    if (MjClient.rePlayVideo != -1 || !MjClient.playui.checkPartnerIsConfirm() || cards == null){
        node.setVisible(false);
        return;
    }
    cc.log("---showWatchPanel--------")
    node.setVisible(true);
};

PlayLayer_DaYeDaGong.prototype.dealSwitchWatch = function(watch, cards){
    if(!watch){
        MjClient.playui._partnerUI.setVisible(false);
        return;
    }

    MjClient.playui.showPartnerHandCards(MjClient.playui._partnerUI, cards);
};

//展示队友手牌
PlayLayer_DaYeDaGong.prototype.showPartnerHandCards = function(node, cards)
{   
    // 回放情形下，不需展示
    if (MjClient.rePlayVideo != -1 || !MjClient.playui.checkPartnerIsConfirm() || cards == null){
        node.setVisible(false);
        return;
    }

    node.getChildByName("partner_cards_mask").visible = true;
    node.getChildByName("partner_cards_tips").visible = true;
    var children = node.children;

    node.setVisible(true);
    for(var i = children.length - 1; i >=0 ; i--){
        var ci = children[i];

        if(ci.name == "mjhand_partner"){
            ci.removeFromParent(true);
            ci = null;
        }
    }
                    
    var vcard = [];
    for (var i = 0; i < cards.length; i++) {
        var card = getNewCard_card(node, "stand", "mjhand_partner", cards[i]);

        var index = vcard.indexOf(cards[i]);//区分2张一样的牌
        if(index >= 0)
        {
            card.setUserData(1);
        }
        else
        {
            card.setUserData(0);
        }
        vcard.push(cards[i]);
    }

    MjClient.playui.CardLayoutPartnerCards(node);
}

PlayLayer_DaYeDaGong.prototype.dealPartnerPutCards = function(node, putCards)
{   
    // if (!node.getChildByName("partner_cards_mask").isVisible())
    //     return;

    for (var i = 0; i < putCards.length; i++)
    {
        var _realCard = putCards[i];
        if(MjClient.majiang.haveLaiziSign(_realCard) ){
            _realCard = MjClient.majiang.getRealLaizi(putCards[i]);
        }
        var _index = MjClient.playui.partnerCardsData.indexOf(_realCard);
        if(_index > -1){
            MjClient.playui.partnerCardsData.splice(_index, 1);
        }
        
        RemoveNodeBack(node, "mjhand_partner", 1, putCards[i])
    }

    

    MjClient.playui.CardLayoutPartnerCards(node);

    if (!node.getChildByName("mjhand_partner"))
    {
        node.getChildByName("partner_cards_mask").visible = false;
        node.getChildByName("partner_cards_tips").visible = false;
    }
}

PlayLayer_DaYeDaGong.prototype.dealPKPutCards = function(node, msg)
{
    cc.log("---------dealPKPutCards--------", msg.card)
    // 回放情形下，不需处理
    if (MjClient.rePlayVideo != -1 || !MjClient.playui.checkPartnerIsConfirm() 
        || (msg.card == null  || MjClient.playui.partnerCardsData == null) ||
        MjClient.playui.myFriendUid == -1 || MjClient.playui.myFriendUid == null){

        return;
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var putCards = msg.card;
    //var playerIndex = getPlayerIndex(UIOff);
    //MjClient.playui._partnerUI.visible &&
    //
    //uids[tData.zhuangPartner];

    if( msg.uid == MjClient.playui.myFriendUid ){
      MjClient.playui.dealPartnerPutCards(node, putCards);  
    }

}

PlayLayer_DaYeDaGong.prototype.CardLayoutPartnerCards = function(node)
{
    if(MjClient.rePlayVideo != -1)// 表示回放
    {
        MjClient.sortClassType = 0;
        MjClient.playui.sortType = MjClient.sortType.normal;
    }

    var tempMaJiang = MjClient.majiang; //麻将的各种方法判断，是否可以杠，是否可以吃... by sking

    //up stand 是2种麻将的图。
    var stand = node.getChildByName("stand");
    stand.visible = false;
    var start = stand;

    var upSize = start.getSize();
    var upS = start.scale;
    var uistand = [];
    var uisort = [];
    var uihun = [];//癞子牌在最左边
    var playerHands = [];

    var children = node.children;
    for(var i = 0; i < children.length; i++) //children 为 "down" 节点下的字节点
    {
        if (children[i].name == "mjhand_partner") {
            uistand.push(children[i]);
            playerHands.push(children[i].tag);
        } 
    }

    var pro_rankType = MjClient.playui.sortType;

    if(!playerHands || cc.isUndefined(playerHands))
    {
        return;
    }

    //理牌后剩下其他的牌
    var mjhandPai = tempMaJiang.sortHandCards(playerHands,pro_rankType);

    var myUiStand = []; //重新排序后
    for(var j = 0;j < mjhandPai.length;j++)
    {
        for (var i = 0; i < uistand.length; )
        {
            if (uistand[i].tag == mjhandPai[j])//这张牌，有可能是，理牌里面的牌，也有可能是没理牌的牌
            {
                myUiStand.push(uistand[i]);
                uistand.splice(i,1);
            }
            else
            {
                i++;
            }
        }
    }
    uistand = myUiStand;

    var uiOrder = [uistand];
    var orders = []; //重新排序后装到数组里 by sking
    //不需要理牌的手牌
    for(var j = 0; j < uiOrder.length; j++)
    {
        var uis = uiOrder[j];
        for(var i = 0; i < uis.length; i++)
        {
            uis[i].zIndex = 0;
            orders.push(uis[i]);
        }
    }

    var cardWidth = orders[0] ? orders[0].width * orders[0].scale : 0;
    var screenScale = MjClient.size.width/1280;
    var areaWidth = MjClient.size.width - screenScale * 80;
    var width = (areaWidth - cardWidth) / (27 - 1) + (27 - orders.length) * 1 * screenScale;
    var startX = screenScale * 10 + (areaWidth - width * (orders.length - 1))/2;

    for(var i = 0; i < orders.length; i++)
    {
        var ci = orders[i];
        ci.x = startX;
        startX += width;
        ci.zIndex = i;
    }
}

PlayLayer_DaYeDaGong.prototype.clearPartnerUI = function(node)
{
    // 回放情形下，不需处理
    if (MjClient.rePlayVideo != -1)
        return;

    node.getChildByName("partner_cards_mask").visible = false;
    node.getChildByName("partner_cards_tips").visible = false;

    var children = node.children;
    for(var i = children.length - 1; i >= 0; i--)
    {
        var ci = children[i];
        if(ci.name == "mjhand_partner")
        {
            ci.removeFromParent(true);
        }
    }
}

PlayLayer_DaYeDaGong.prototype.showFlyZhuaFenAnim = function(msg){
    var UIoff =  getUiOffByUid(msg.uid);
    var _score= msg.zhuaFen;

    var playerNode = getNode_cards(UIoff);
    if (!playerNode || _score == null )
        return;

    MjClient.playui.flyZhuaFen.setPosition(MjClient.playui.srcPos.flyZhuaFen);

    var flyNode = MjClient.playui.flyZhuaFen;
    flyNode.setString(_score);
    var headNode = playerNode.getChildByName("head").getChildByName("zhua");
    var point = headNode.convertToWorldSpace(cc.p(headNode.width/2, headNode.height/2));
    point = flyNode.getParent().convertToNodeSpace(point);

    flyNode.setString(_score - parseInt(headNode.getString())); 

    flyNode.setVisible(true);
    flyNode.setScale(flyNode.getScale() * 1.5);
    flyNode.runAction(cc.sequence(cc.spawn(cc.moveTo(0.5, point), cc.scaleTo(0.5, flyNode.getScale()/1.5)), cc.callFunc(function() {
       // MjClient.playui.setPlayerZhuaFen(headNode, UIoff);
        headNode.setString(_score);
        flyNode.setVisible(false);
    })));

}


PlayLayer_DaYeDaGong.prototype.setPlayerZhuaFen = function(node,off_1)
{
    if (arguments.length < 2) {
        node.setString("0");
        return;
    }

    var totalScore = 0;
    for (var i = 1; i < arguments.length; i++) {
        var player = getUIPlayer(arguments[i]);

        if (player && player.zhuaFen) {
            totalScore += player.zhuaFen;
        }
    }

    node.setString(totalScore);
}


PlayLayer_DaYeDaGong.prototype.UpdataDaMaZiTips = function(){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pSelf = getUIPlayer(0);
    if (!pSelf.mjhand || pSelf.mjhand.length <= 0) return;
    MjClient.playui._510kTipsAry = MjClient.majiang.findCardByType(pSelf.mjhand, 0, MjClient.majiang.CARDTPYE.z_510k, null, tData.areaSelectMode);
    var _510kTipsAry = MjClient.majiang.findCardByType(pSelf.mjhand, 0, MjClient.majiang.CARDTPYE.f_510k, null, tData.areaSelectMode); 
    for(var i = 0 ; i < _510kTipsAry.length; i++)
    {
        MjClient.playui._510kTipsAry.push(_510kTipsAry[i]);
    }
    MjClient.playui._TongHuaShunTipsAry = MjClient.majiang.findCardByType(pSelf.mjhand, 0, MjClient.majiang.CARDTPYE.tonghuashun, null, tData.areaSelectMode);
    MjClient.playui._510kTipsIndex = 0;
    MjClient.playui._TongHuaShunTipsIndex = 0;
}

PlayLayer_DaYeDaGong.prototype.clearDeskCard = function(node)
{
    var children = node.children;
    for (var i = 0; i < children.length; i++)
    {
        var ni = children[i];
        if(ni.name == "out")
        {
            ni.removeFromParent(true);
        }
    }
}

//cardType---PDK_CARDTPYE.f_510k,,,,PDK_CARDTPYE.tonghuashun
PlayLayer_DaYeDaGong.prototype.putDaMaZiTips = function(cardType){

    var tipsCard = cardType != MjClient.majiang.CARDTPYE.tonghuashun ? MjClient.playui._510kTipsAry:MjClient.playui._TongHuaShunTipsAry;
    var tipsIndex = cardType != MjClient.majiang.CARDTPYE.tonghuashun ? MjClient.playui._510kTipsIndex:MjClient.playui._TongHuaShunTipsIndex;

    var tipsLength = tipsCard.length;
    if(cc.isUndefined(tipsCard) || tipsLength <= 0)
    {
        MjClient.selectCards_card = [];
        if(MjClient.sortClassType == 0) {
            setCardToNormalPos();
        }
        else {
            setCardToNormalColor();
        }
        UpdataCurrentPutCard();
        return tipsLength;
    }

    if(tipsIndex < 0 || tipsIndex >= tipsLength || !tipsCard[tipsIndex])
    {
        tipsIndex = 0;
    }
    var tipsCardArray = tipsCard[tipsIndex].slice();

    //cc.log("------tipsCardArray----- = "+ JSON.stringify(MjClient.tipCardsArray));

    selectUICards(tipsCardArray);

    //待出的牌
    MjClient.selectCards_card = tipsCard[tipsIndex].slice();
    cc.log("------MjClient.selectCards_card----- = "+ JSON.stringify(MjClient.selectCards_card));
    UpdataCurrentPutCard();
    tipsIndex++;

    if (cardType == MjClient.majiang.CARDTPYE.tonghuashun)
        MjClient.playui._TongHuaShunTipsIndex = tipsIndex;
    else
        MjClient.playui._510kTipsIndex = tipsIndex;

    return tipsLength;
}

PlayLayer_DaYeDaGong.prototype.onClickLiPai = function()
{
    MjClient.playui._sortType += 1;
    if (MjClient.playui._sortType>1)MjClient.playui._sortType = 0;

    var fCard = [];
    while(1)
    {
        if (MjClient.playui._sortType == 0 && (!MjClient.selectCards_card || MjClient.selectCards_card.length==0))
            break;
        fCard = MjClient.playui._sortCardByType();
        if (fCard.length > 0)break;
        MjClient.playui._sortType += 1;
        if (MjClient.playui._sortType>1)MjClient.playui._sortType = 0;
 
    }

    MjClient.playui._LiPaiCards = fCard;
    MjClient.playui.CardLayoutRestore(this._downNode, 0);
    UpdataCurrentPutCard();

    var sData = MjClient.data.sData;
    var tData = sData.tData;

    if(IsTurnToMe() && tData.tState == TableState.waitPut)
    {
        var pl = getUIPlayer(0);
        MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, tData.lastPutCard, tData.areaSelectMode);
        MjClient.tipsIdx = 0;
    }
}

PlayLayer_DaYeDaGong.prototype._sortCardByType = function(){

    function __findCardByType(tmpHand, type, areaSelectMode)
    {
        var ret =[]
        while(1)
        {
            var findcardAry = MjClient.majiang.findCardByType(tmpHand, 0, type, null, areaSelectMode);
            if (!findcardAry||findcardAry.length==0)break;
            var curAry = findcardAry[findcardAry.length-1];
            for(var i = 0; i < curAry.length; i++)
            {
                for (var j = 0; j < tmpHand.length; j++) {
                    if( tmpHand[j] == curAry[i] ){
                        tmpHand.splice(j, 1);
                        break;
                    }
                }
                ret.push(curAry[i])
            }
        }       
        return ret;     
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var fCard = [];
    var pSelf = getUIPlayer(0);
    if (!pSelf.mjhand)return fCard;
    var tmpHand = pSelf.mjhand.slice();
    if(MjClient.selectCards_card && MjClient.selectCards_card.length>0)
    {//先看有没有提起的牌
        this._sortType = -1;
        fCard = MjClient.selectCards_card.slice();
        for(var i = 0; i < fCard.length; i++)
        {
            for (var j = 0; j < tmpHand.length; j++) {
                if( tmpHand[j] == fCard[i] ){
                    tmpHand.splice(j, 1);
                    break;
                }
            }
        }
        MjClient.selectCards_card = [];
        if(MjClient.sortClassType == 0) {
            setCardToNormalPos();
        }
        else {
            setCardToNormalColor();
        }
    }
    else if (this._sortType == 1)
    {//
        // zhadan8:21,
        // zhadan7:20,
        // zhadan6:19,          
        // zhadan:18,
        // wangzha:17,
        // sanwang:16,
        // b_2wang:15,
        // s_2wang:14,
        // //tonghuashun:15,
        // z_510k:13,
        // f_510k:12,
        for (var i = MjClient.majiang.CARDTPYE.zhadan8; i >= MjClient.majiang.CARDTPYE.z_510k; i--)
        {
            var booms =  __findCardByType(tmpHand,i, tData.areaSelectMode);
            fCard = fCard.concat(booms);
        }
    }

    return fCard;
}

PlayLayer_DaYeDaGong.prototype.resetRoundData = function()
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    MjClient.playui.partnerCardsData = null;
    MjClient.playui.myFriendUid = null;
    tData.chickenCard = null ;
    tData.zhuangPartner = undefined;
    tData.zhuang = -1;
    tData.zhuangPartnerHidden = -1;

    MjClient.playui.msg_Cache = [];
    MjClient.playui.isRuned = false;

    //客户端数据
    MjClient.playui._510kTipsAry=[];
    MjClient.playui._TongHuaShunTipsAry=[];
    MjClient.playui._510kTipsIndex=0;
    MjClient.playui._TongHuaShunTipsIndex=0;
    MjClient.playui._sortType=0;//0,正常排序，1，同花顺前面，2，510k前面
    MjClient.playui._LiPaiCards=[];

    MjClient.playui._btnNoPut.visible = false;
    MjClient.playui._btnPutCard.visible = false;
    MjClient.playui._btnHimt.visible = false;

    MjClient.playui._downNode.getChildByName("noPutTag").visible=false;
    MjClient.playui._rightNode.getChildByName("noPutTag").visible=false;
    MjClient.playui._topNode.getChildByName("noPutTag").visible=false;
    MjClient.playui._leftNode.getChildByName("noPutTag").visible=false;

    //玩家数据

    var pls = sData.players;
    for (var uid in pls) {
        pi = pls[uid];
        //牛十别，发牌时清理游数
        pi.rank = 0;
        pi.zhuaFen = 0;
        pi.MingPai = false;
        pi.isMingCard = false;
        pi.selfMingCard = false;
        pi.xiCard = [];
        pi.huaCardFen = 0;
        pi.xiFen  = 0;
        pi.mult  = 0;
        pi.qiang = -1;

        // if (uid == SelfUid() && MjClient.majiang.setXiCards)
        //     MjClient.majiang.setXiCards(pi.xiCard);
    }

}

PlayLayer_DaYeDaGong.prototype.ClearLiPai = function(uid, putcards)
{
    if (uid != SelfUid())return;
    //删除理牌的对应牌值
    for(var i=0; i < putcards.length; i++){
        for (var j = 0; j < MjClient.playui._LiPaiCards.length; j++) {
            if( MjClient.playui._LiPaiCards[j] == putcards[i] ){
                MjClient.playui._LiPaiCards.splice(j, 1);
                break;
            }
        }
    }
    //MjClient.playui.CardLayoutRestore(MjClient.playui._downNode, 0);
}

PlayLayer_DaYeDaGong.prototype.setDownMenusEnabled = function()
{
    var tData = MjClient.data.sData.tData;
    var enabled = !(tData.tState == TableState.waitJoin || 
        tData.tState == TableState.roundFinish || 
        tData.tState == TableState.waitReady || 
        tData.tState == TableState.waitBaoXi || 
        MjClient.playui.isFaPai);

    if (MjClient.playui._btnScanScore.isTouchEnabled() == enabled)
        return;

    var downMenus = [
        MjClient.playui._btnScanScore,
        MjClient.playui._btnMingPai,
        MjClient.playui._btnTouXiang,
        MjClient.playui._btnKuaiJie,
        MjClient.playui._btnLiPai
    ];

    for (var i = downMenus.length - 1; i >= 0; i--) {
        downMenus[i].setBright(enabled);
        downMenus[i].setTouchEnabled(enabled);
    }
}

// 展示报喜动画
PlayLayer_DaYeDaGong.prototype.showBaoxiAnimation = function(msg)
{   
    cc.log("The msg = " + JSON.stringify(msg));

    if (msg.uid == 0)
        return;

    var majiang = MjClient.majiang;
    var uiOff = getUiOffByUid(msg.uid);
    var node = getNode_cards(uiOff);
    var realXiCard = msg.realXiCard.slice();

    var container = new cc.Node();
    MjClient.playui.addChild(container,500);

    var xiTitle = new cc.Sprite("playing/damazi/bg_youxi.png");
    xiTitle.setScale(Math.min(MjClient.size.width/1280,MjClient.size.height/720));
    container.addChild(xiTitle,10);

    realXiCard.sort(majiang.cardValueCmp.bind(majiang));

    var orders = {};
    var xiCardCount = 0;
    var deskCard = node.getChildByName("deskCard");
    for (var i = 0; i < realXiCard.length; i++) {
        var newCard = deskCard.clone();
        newCard.name = "xiCard";
        newCard.visible = true;
        setCardSprite_card(newCard, realXiCard[i], false, "xiCard");
        container.addChild(newCard);

        var value = majiang.calPoint(realXiCard[i]);
        if (value == majiang.cardCfg.jokerBlack)
            value = majiang.cardCfg.jokerRed

        if (!orders[value]) 
        {
            orders[value] = [];
            xiCardCount++;
        }

        orders[value].push(newCard);
    }

    var offsetRatio = 0.6;
    var firstXiCard = orders[msg.xiCard[0]][0];
    var cardWidth = (firstXiCard.width - 10) * firstXiCard.scale;
    var cardHeight = firstXiCard.height * firstXiCard.scale;
    var containerWidth = (xiTitle.getContentSize().width - 145) * xiTitle.getScale();
    var containerHeight = (xiTitle.getContentSize().height - 35) * xiTitle.getScale() + (xiCardCount - 1) * cardHeight * offsetRatio + cardHeight;

    container.setContentSize(cc.size(containerWidth,containerHeight));

    xiTitle.setAnchorPoint(cc.p(0.5,1));
    xiTitle.setPosition(cc.p(containerWidth/2,containerHeight));

    var startY = containerHeight - (xiTitle.getContentSize().height - 35) * xiTitle.getScale() - cardHeight/2;
    for (var cardValue in orders) {
        var lineCards = orders[cardValue];
        var width = (containerWidth - cardWidth) / (lineCards.length - 1);

        if (width > cardWidth)
            width = cardWidth;

        var startX = (containerWidth - (lineCards.length - 1) * width - cardWidth) / 2 + cardWidth/2;

        for (var i = 0; i < lineCards.length; i++) {
            lineCards[i].x = startX;
            lineCards[i].y = startY;
            startX += width;
        }

        startY -= cardHeight*offsetRatio;
    }
    
    var targetPosition = deskCard.getPosition();

    if (uiOff == 0)
        targetPosition.y += (isIPhoneX() ? 20 : 30) * xiTitle.getScale();
    else if (uiOff == 1)
        targetPosition.x -= (isIPhoneX() ? 20 : 40) * xiTitle.getScale();
    else if (uiOff == 2)
        targetPosition.y -= (isIPhoneX() ? 80 : 50) * xiTitle.getScale();
    else
        targetPosition.x += (isIPhoneX() ? 70 : 40) * xiTitle.getScale();

    container.setAnchorPoint(cc.p(0.5,0.5));
    container.setPosition(targetPosition);

    var callBack = function() {
        this.removeFromParent();
    }.bind(container);
    container.runAction(cc.Sequence.create(cc.moveBy(0.5, 0, 30*xiTitle.getScale()).easing(cc.easeBounceOut()), 
        cc.delayTime(2.5), 
        cc.callFunc(callBack)
        ));

    MjClient.playui.addChild(new PiaoFenView_DaYeDaGong(msg.score,uiOff),500);
}

// 设置己方喜牌数据
PlayLayer_DaYeDaGong.prototype.setMajiangXiCard = function()
{   
    if (!MjClient.majiang.setXiCards)
        return;

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

    if (selfPlayer.xiCard && selfPlayer.xiCard.length > 0)
        MjClient.majiang.setXiCards(selfPlayer.xiCard);
    else
        MjClient.majiang.setXiCards([]);
}

// 创建投降UI
PlayLayer_DaYeDaGong.prototype.createTouXiangView = function(touXiangData)
{   
    //回放的时候，不弹投降窗口
    // if(MjClient.rePlayVideo != -1) 
    //     return;

    MjClient.playui.addChild(new TouXiangApplicationView(touXiangData),500);
}

PlayLayer_DaYeDaGong.prototype.reLoadOptBtnRes = function() {
    //出牌按钮
    if(this._btnPutCard) this._btnPutCard.loadTextures("playing/damazi/an-chupai.png", 
                                                        "playing/damazi/an-chupai-1.png", 
                                                        "playing/damazi/an-chupai-2.png");
     //不出按钮   
    if(this._btnNoPut) this._btnNoPut.loadTextures("playing/damazi/an-buyao.png", 
                                                    "playing/damazi/an-buyao-1.png", 
                                                    "playing/damazi/an-buyao-2.png");

    if(this._btnHimt) this._btnHimt.loadTextures("playing/damazi/an-tishi.png", 
                                                "playing/damazi/an-tishi-1.png", 
                                                "playing/damazi/an-tishi-2.png");
    //报喜按钮  
    if(this._btnBaoxi) this._btnBaoxi.loadTextures("playing/damazi/btn_baoxi.png", 
                                                    "playing/damazi/btn_baoxi.png", 
                                                    "playing/damazi/btn_baoxi.png");
    //不报喜按钮  
    if(this._btnNo_Baoxi) this._btnNo_Baoxi.loadTextures("playing/damazi/btn_no_baoxi.png", 
                                                    "playing/damazi/btn_no_baoxi.png", 
                                                    "playing/damazi/btn_no_baoxi.png");
}

//弹出选择的牌
PlayLayer_DaYeDaGong.prototype.selectUICards = function(_tipsCardArray)
{
    cc.log("tipsCardArray selectUICards= " + JSON.stringify(_tipsCardArray));

    var tipsCardArray = _tipsCardArray.concat();

    if(!tipsCardArray)
    {
        return;
    }

    var downNode = MjClient.playui._downNode;
    var standUI = downNode.getChildByName("stand");
    var children = downNode.getChildren();
    var upSize = standUI.getSize();
    var upS = standUI.scale;
    var cardY = upSize.width * upS*1.5; //一张牌的长度
    var cardOut = parseInt(cardY/4);//点击牌弹起的高度,以前是20像素

    if(MjClient.sortClassType == 0)
    {
        setCardToNormalPos();
    }
    else
    {
        setCardToNormalColor();
    }

    MjClient.colloctionCurrentSelcetUIArray = [];

    //var _children = children.concat();

    var specialType = (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA || 
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA);

    for(var m = 0; m < children.length; m++)
    {
        for(var n = 0;n < tipsCardArray.length;n++)
        {
            if(children[m].name == "mjhand")
            {
                if(children[m].tag == tipsCardArray[n] || children[m].tag == MjClient.majiang.getRealLaizi(tipsCardArray[n]))
                {
                    if(checkUIHave(MjClient.colloctionCurrentSelcetUIArray,children[m]))
                    {
                        break;
                    }

                    if (children[m].tag != tipsCardArray[n]) {
                        // 癞子转化的牌值，需要标记
                        children[m].replacement = tipsCardArray[n];
                    }
                    
                    tipsCardArray[n] = -1;
                    cc.log("======弹出选择的牌===== colloctionCurrentSelcetUIArray = " + children[m].tag);
                    MjClient.colloctionCurrentSelcetUIArray.push(children[m]);
                    if(MjClient.sortClassType == 0)
                    {
                        var pos = children[m].getPosition();
                        var dy = Math.round(pos.y - standUI.y);
                        if(dy < standUI.y+cardOut && specialType)
                        {
                            if(children[m].isUp) children[m].setPositionY(standUI.y*2 + cardOut);
                            else children[m].setPositionY(standUI.y + cardOut);
                            break;
                        }
                        else{
                            if(dy < cardOut)
                            {
                                children[m].setPositionY(standUI.y + cardOut);
                                break;
                            }
                        }

                    }
                    else
                    {
                        if(!children[m].isGray)
                        {
                            children[m].isGray = true;
                            children[m].setColor(MjClient.grayColor);
                        }
                    }
                }
            }
        }
    }
}

PlayLayer_DaYeDaGong.prototype.checkPut = function (oHands, oCards, lastPutCard) {
    var tData = MjClient.data.sData.tData;

    if (!IsTurnToMe() || tData.tState != TableState.waitPut)
        return null;

    this._btnPutCard.visible = true;

    if ((tData.lastPutPlayer == tData.curPlayer || tData.lastPutPlayer == -1)) {
        this._btnNoPut.visible = false;
        this._btnPutCard.x = cc.winSize.width * 0.5;
    } else {
        this._btnNoPut.visible = true;
        
        // this._btnNoPut.x = this._btnNoPut.srcX;
        // this._btnPutCard.x = this._btnPutCard.srcX;
        if (this._btnHimt.isVisible()) {
            this._btnNoPut.x = this._btnNoPut.srcX;
            this._btnPutCard.x = this._btnPutCard.srcX;
            this._btnHimt.x = this._btnHimt.srcX;
        } else {
            cc.log("------this._btnHimt.srcX--", this._btnHimt.srcX)
            this._btnNoPut.x = this._btnHimt.srcX;
            this._btnPutCard.visible = false;
            return null;
        }
    }

    if (oCards && typeof(oCards)!='undefined' && oCards.length == 0) return null;

    var cards = [];
    var laizis = MjClient.majiang.transformAndGetLaizi(oCards, cards);
    var laiziCards = MjClient.majiang.getLaiziCardsFromRet(cards);
    var otherLaizis = [];

    for (var i = 0; i < laiziCards.length; i++) {
        otherLaizis.push(MjClient.majiang.getRealLaizi(laiziCards[i]));
    }

    laizis = laizis.concat(otherLaizis);

    if (laizis.length <= 0) {
        return MjClient.majiang.checkPut(oHands, oCards, lastPutCard, tData.areaSelectMode);
    } else {
        // 先判断要出的牌组中有无手牌中没有的牌
        var hands = oHands.slice();
        for (var i = 0; i < oCards.length; i++) {
            var p = hands.indexOf(oCards[i]);

            if (p >= 0) {
                hands.splice(p, 1);
            }
            else {
                p = hands.indexOf(MjClient.majiang.getRealLaizi(oCards[i]));

                if (p >= 0) {
                    // 癞子
                    hands.splice(p, 1);
                }
                else {
                    return null; // 手里没有这些牌
                }
            }
        }

        // 进一步剔除癞子
        for (var i = 0; i < laiziCards.length; i++) {
            cards.splice(cards.indexOf(laiziCards[i]),1);
        }

        var CARDTPYE = MjClient.majiang.CARDTPYE;
        var results = [];
        var tempRets = [];
        var extras = {};
        var eightxigunlongFound = false;
        var xiFound = false;

        var sortRets = function(ret_1,ret_2) {
            return MjClient.majiang.calCardsValue(ret_2) - MjClient.majiang.calCardsValue(ret_1);
        }

        var findResults = function(findTypes,bFirstPut) {
            for (var i = 0; i < findTypes.length; i++) {
                if(findTypes[i] == CARDTPYE.gunlong || findTypes[i] == CARDTPYE.eightxigunlong) {
                    if (eightxigunlongFound && findTypes[i] == CARDTPYE.gunlong) {
                        // 找到了8喜滚龙，普通滚龙不用找了
                        continue;
                    }

                    tempRets = [];

                    var lianNum = 2;
                    var minStep = findTypes[i] == CARDTPYE.gunlong ? 4 : 8;

                    while (oCards.length / lianNum >= minStep) {
                        if (oCards.length % lianNum != 0) {
                            lianNum++;
                            continue;
                        }
                        
                        extras.step = oCards.length / lianNum;
                        tempRets = MjClient.majiang.findCardByType(cards, laizis, findTypes[i], oCards.length, extras);

                        if (tempRets.length > 0) {
                            eightxigunlongFound = findTypes[i] == CARDTPYE.eightxigunlong;
                            break;
                        } else
                            lianNum++;
                    }
                
                } else {
                    if (xiFound && (findTypes[i] == CARDTPYE.sevenxi || findTypes[i] == CARDTPYE.zhadan)) {
                        // 找到了8喜，7喜、炸弹不用找了；找到了7喜，炸弹不用找了
                        continue;
                    }

                    tempRets = MjClient.majiang.findCardByType(cards, laizis, findTypes[i], oCards.length);

                    if (tempRets.length > 0) {
                        xiFound = (findTypes[i] == CARDTPYE.eightxi || findTypes[i] == CARDTPYE.sevenxi);
                    }
                }

                if (!bFirstPut) {
                    for (var j = 0; j < tempRets.length;) {
                        if (MjClient.majiang.canPut(tempRets[j], lastPutCard, tData.areaSelectMode))
                            j++;
                        else
                            tempRets.splice(j,1);
                    }
                }

                if (tempRets.length > 1) {
                    // 对相同牌型牌组排序（大的排前边）
                    tempRets.sort(sortRets);
                }

                if (tempRets.length > 0) {
                    results.push(tempRets[0]);
                }
            }
        }

        if (!lastPutCard || lastPutCard == -1) {
            // 先手
            // 炸弹>510K>三顺>连对>三张>对子
            var findTypes = [
                CARDTPYE.wangzha,
                CARDTPYE.eightxigunlong,
                CARDTPYE.eightxi,
                CARDTPYE.gunlong,
                CARDTPYE.sevenxi,
                CARDTPYE.zhadan,
                CARDTPYE.f_510k,
                CARDTPYE.z_510k,
                CARDTPYE.sanshun,
                CARDTPYE.liandui,
                CARDTPYE.sanzhang,
                CARDTPYE.duizi,
                CARDTPYE.danpai
            ];
            
            findResults(findTypes,true);
        } else {
            // 压牌

            var lastCardsType = MjClient.majiang.calType(lastPutCard);
            var zhaDanTypes = [
                CARDTPYE.wangzha,
                CARDTPYE.eightxigunlong,
                CARDTPYE.eightxi,
                CARDTPYE.gunlong,
                CARDTPYE.sevenxi,
                CARDTPYE.zhadan,
                CARDTPYE.f_510k,
                CARDTPYE.z_510k
            ];

            var findTypes = [];
            if (lastCardsType < CARDTPYE.big) {
                findTypes = zhaDanTypes.slice();
                findTypes.push(lastCardsType);
            } else {
                var typeIndex = zhaDanTypes.indexOf(lastCardsType);

                if (typeIndex > 0)
                    findTypes = zhaDanTypes.slice(0,typeIndex + 1);
            }

            findResults(findTypes);
        }

        if (results.length <= 0) {
            return null;
        }

        this._btnPutCard.visible = false;
        // if (this._btnNoPut.isVisible()) {
        //     this._btnNoPut.x = cc.winSize.width * 0.5;
        // }

        MjClient.playui.addChild(new SelectPutCardsLayer_wuXueGeBan(results), 99);

        return true;
    }
};

PlayLayer_DaYeDaGong.prototype.RemoveNodeBack = function(node, name, num, tag) {
    var _delCount = 0; //标记是否有删除的牌 add by sking 2018.9.17
    var children = node.children;
    for(var i = children.length - 1; i >= 0 && num > 0; i--)
    {
        var ci = children[i];
        if(ci.name == name && (!(tag > 0) || ci.tag == tag || MjClient.majiang.getRealLaizi(tag) == ci.tag))
        {
            //删除手牌之前先把手牌存在Pool里 by sking 2018.10.17
            if(ci.name == "putOutCard")
            {
                ci.name = "mjhand";
            }

            _delCount++;
            //CommonPool.putInPool(ci);
            ci.removeFromParent(true);

            num--;
        }
    }

    if (num != 0)
    {
        cc.log(node.name + " RemoveNodeBack fail " + name + " " + tag);
    }
    return _delCount;
};

PlayLayer_DaYeDaGong.prototype.findNodesBack = function(node, name, tags) {
    tags = tags.slice();

    for (var i = 0; i < tags.length; i++) {
        var realLaizi = MjClient.majiang.getRealLaizi(tags[i]);
        if (realLaizi != -1)
            tags[i] = realLaizi;
    }

    var retNodes = [];
    var children = node.children;
    for(var i = children.length - 1; i >= 0; i--)
    {
        var ci = children[i];
        if(ci.name != name)
            continue;
        var index = tags.indexOf(ci.tag);
        if (index < 0)
            continue;

        tags[index] = -1;
        retNodes[index] = ci;
    }

    for (var i = 0; i < tags.length; i ++) {
        if (!retNodes[i])
            mylog(node.name + " findNodesBack fail " + name + " " + tags[i]);
    }
    return retNodes;
}

PlayLayer_DaYeDaGong.prototype.cardsSort = function(cards)
{
    var pointCounts = {};
    for (var i = 0; i < cards.length; i++) {
        var p = MjClient.majiang.calPoint(cards[i]);
        if (pointCounts[p])
            pointCounts[p] ++;
        else
            pointCounts[p] = 1;
    }

    var commonCmp = function (a, b) {
        var c1 = pointCounts[MjClient.majiang.calPoint(a)];
        var c2 = pointCounts[MjClient.majiang.calPoint(b)];
        if (c1 == c2)
            return MjClient.majiang.cardValueCmp(a, b);
        else
            return c1 - c2;
    }

    cards.sort(function(a, b) { return -commonCmp(a, b);});
}