/**
 * Created by Administrator on 2017/3/9.
 */

var actionZindex = 1000;

// 这个没看懂干嘛的
// off 是四个位置，根据off 显示四个位置的信息 by sking
function SetUserVisible_NN(node, off)
{
    //var sData = MjClient.data.sData;
    //return;
    cc.log("====================off======================" + off);
    var pl = getUIPlayer(off);
    var head = node.getChildByName("head");
    var name = head.getChildByName("name");
    var nobody = head.getChildByName("nobody");
    var coin = head.getChildByName("coin");
    var offline = head.getChildByName("offline");
    var name_bg = head.getChildByName("name_bg");
    var score_bg = head.getChildByName("score_bg");
    if(pl)
    {
        name.visible = true;
        coin.visible = true;
        offline.visible = true;
        coin.visible = true;
        name_bg.visible = true;
        score_bg.visible = true;
        MjClient.loadWxHead(pl.info.uid, pl.info.headimgurl);
        setUserOffline(node, off);
        InitUserHandUI_NN(node, off);
        //GLog("pl.info.uid = "+pl.info.uid);
    }
    else
    {
        name.visible = false;
        coin.visible = false;
        offline.visible = false;
        coin.visible = false;
        var WxHead = nobody.getChildByName("WxHead");
        if(WxHead)
        {
            WxHead.removeFromParent(true);
        }
    }
}

function InitUserHandUI_NN(node, off)
{
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
    if(tData.tState == TableState.waitJiazhu || tData.tState == TableState.waitCard || tData.tState == TableState.roundFinish)
    {
        showUserZhuangLogo_NN(tData.zhuang);
    }


    //add by sking 为了断线重连能弹出加注的界面
    if(tData.tState == TableState.waitJiazhu && SelfUid() == pl.info.uid)
    {
        if(pl.mjState == TableState.waitJiazhu && tData.uids[tData.zhuang] != SelfUid())
        {
            var _timeNode = MjClient.playui._arrowbkNode.getChildByName("number");
            arrowbkNumberUpdate_NN(_timeNode);

            if(MjClient.playui._JiaZhuNode == null)
            {
                MjClient.playui._JiaZhuNode = new jiaZhu_NNLayer(function(xiaZhuNum){

                    var pl = getUIPlayer(0);
                    pl.jiazhuNum = xiaZhuNum;
                    MjClient.majiang.setJiaZhuNum(MjClient.playui._downNode,pl);

                    MjClient.playui._JiaZhuNode = null;
                    _timeNode.stopAllActions();
                    _timeNode.setString("00");
                    MjClient.playui._jiazhuWait.visible = true;

                    stopEffect(playTimeUpEff);
                    playTimeUpEff = null;
                });
                MjClient.playui.addChild(MjClient.playui._JiaZhuNode);
            }


            if (MjClient.webViewLayer != null)
            {
                MjClient.webViewLayer.close();
            }
        }
        else
        {
            //弹窗等待其他玩家加注
            MjClient.playui._jiazhuWait.visible = true;
        }

    }




    if(tData.tState != TableState.waitCard)
    {
        return;
    }


    //setHunNodeVisible(false);
    cc.log("pl.mjhand = "  + JSON.stringify(pl.mjhand));
    cc.log("pl.mjhand = "  + off);
    //添加手牌
    if (off == 0 && pl.mjhand) {
        for (var i = 0; i < pl.mjhand.length; i++) {
            getNewCard_NN(node, "stand", "mjhand", pl.mjhand[i], off);
        }
    }
    else if (off > 0) {
        for (var i = 0; i < 5; i++) {
            getNewCard_NN(node, "stand", "standPri");
        }
    }

    MjClient.playui.CardLayoutRestore(node, off);
}


function CheckSameIP_NN()
{
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
        //if(cc.sys.OS_WINDOWS != cc.sys.os)
        {
            //AlertSameIP(ipmsg.join("\n"));
        }
    }
    mylog("ipmsg " + ipmsg.length);
}

var PlayLayer_niuniu = cc.Layer.extend({
    jsBind: {
        _event: {
            mjhand: function() {
                if(MjClient.endoneui != null)
                {
                    cc.log("=======mjhand====endoneui====" + typeof (MjClient.endoneui) );
                    MjClient.endoneui.removeFromParent(true);
                    MjClient.endoneui = null;
                }

                resetJiaZhuNum(this);

                if (MjClient.rePlayVideo == -1)//正常游戏
                {
                    CheckSameIP_NN();
                }
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
                if (msg.showEnd) MjClient.playui.addChild(new GameOverLayer(),500);
                else
                    MjClient.Scene.addChild(new StopRoomView());
            },
            roundEnd: function() {
                var seqAction = [];
                var sData = MjClient.data.sData;

                if (!MjClient.isDismiss)
                {
                    function showCards(off) {
                        var node;
                        switch (off)
                        {
                            case 0:
                                node = MjClient.playui._downNode;
                                break;
                            case 1:
                                node = MjClient.playui._rightNode;
                                break;
                            case 2:
                                node = MjClient.playui._topNode;
                                break;
                            case 3:
                                node = MjClient.playui._leftNode;
                                break;
                        }


                        var pl = getUIPlayer(off);
                        if(!pl) return;
                        if (off == 0)
                        {
                            RemoveFrontNode(node, "mjhand", 5);
                        }
                        else
                        {
                            RemoveFrontNode(node, "standPri", 5);
                        }
                        var selectedCards = pl.selectedCards.concat();
                        for(var i = 0; i < 5; i++)
                        {
                            var isheng = false;
                            for (var j=0; j<selectedCards.length; j++)
                            {
                                if (selectedCards[j] == pl.mjhand[i])
                                {
                                    if (off == 0)
                                        getNewCard_NN(node, "stand", "mjhand", pl.mjhand[i], off, "heng");
                                    else
                                        getNewCard_NN(node, "up", "mjhand_replay", pl.mjhand[i], off, "heng");
                                    selectedCards.splice(j,1);
                                    isheng = true;
                                    break;
                                }
                            }

                            if (!isheng)
                            {
                                if (off == 0)
                                    getNewCard_NN(node, "stand", "mjhand", pl.mjhand[i], off);
                                else
                                    getNewCard_NN(node, "up", "mjhand_replay", pl.mjhand[i], off);
                            }
                        }
                        MjClient.playui.CardLayoutRestore(node, off);

                        showNiuCount_NN(off);
                    }
                    var getNode = function(off)
                    {
                        var _node = null;
                        switch (off)
                        {
                            case 0:
                                _node = MjClient.playui._downNode;
                                cc.log("1----");
                                break;
                            case 1:
                                cc.log("2----");
                                _node = MjClient.playui._rightNode;
                                break;
                            case 2:
                                cc.log("3----");
                                _node = MjClient.playui._topNode;
                                break;
                            case 3:
                                cc.log("4----");
                                _node = MjClient.playui._leftNode;
                                break;
                            default:
                                break;
                        }
                        return _node;
                    }
                    //飞金币
                    function showCoins(startOff,endOff)
                    {
                        var StarNode = getNode(startOff).getChildByName("head");
                        var EndNode  = getNode(endOff).getChildByName("head");
                        var distance = cc.pDistance(StarNode.getPosition(), EndNode.getPosition());
                        var costTime = distance/1000;
                        if (costTime > 0.5)
                        {
                            costTime = 0.5;
                        }
                        else  if (costTime < 0.3)
                        {
                            costTime = 0.3;
                        }
                        var midX = (EndNode.getPositionX()-StarNode.getPositionX())/2+StarNode.getPositionX();
                        if (Math.abs(EndNode.getPositionX()-StarNode.getPositionX())<10)
                        {
                            midX += distance/5;
                        }
                        var midY = Math.max(StarNode.getPositionY(), EndNode.getPositionY());
                        if (Math.abs(EndNode.getPositionY()-StarNode.getPositionY())<10)
                        {
                            midY += distance/5;
                        }

                        var move = cc.bezierTo(costTime, [StarNode.getPosition(), cc.p(midX, midY), EndNode.getPosition()]);

                        for(var i =  0; i < 10 ; i++)
                        {
                            var goldIcon = new cc.Sprite("niuniu/img_gold.png");
                            var action = cc.sequence(cc.delayTime(i*costTime/10),move.clone(),cc.removeSelf());
                            goldIcon.runAction(action);
                            goldIcon.setPosition(StarNode.getPosition());
                            MjClient.playui._AniNode.addChild(goldIcon,100);
                        }

                        playEffectInPlay("flyMoney");
                    }

                    //飘分数
                    function showScores(off,score)
                    {
                        var _Node = getNode(off).getChildByName("head");

                        var fontFile = "niuniu/bm_font_6.fnt";
                        var text = score.toString();
                        if (score<0)
                        {
                            fontFile = "niuniu/bm_font_7.fnt";
                        }
                        else
                        {
                            text = "+" + text;
                        }
                        var _score = new ccui.TextBMFont(text, fontFile);
                        _score.setScale(0);
                        _score.runAction(cc.sequence(cc.scaleTo(0.1, 1), cc.delayTime(1), cc.spawn(cc.moveBy(1, 0, 50), cc.fadeOut(1)), cc.removeSelf() ));
                        _score.setPosition(_Node.getPosition().x, _Node.getPosition().y-50);
                        MjClient.playui._AniNode.addChild(_score,100);
                    }



                    var createCbShowCards = function(index) {
                        return function () {
                            showCards(index);
                        };
                    };
                    var createCbShowCoins = function(startOff,endOff) {
                        return function () {
                            showCoins(startOff,endOff);
                        };
                    };
                    var createCbShowScores = function(off,score) {
                        return function () {
                            showScores(off,score);
                        };
                    };

                    cc.log("==========sData.tData.uids = " + JSON.stringify(sData.tData.uids));

                    for (var i=1; i<=4; i++)
                    {
                        var selfIndex = sData.tData.uids.indexOf(SelfUid());
                        selfIndex = (sData.tData.zhuang + 4 - selfIndex) % 4;
                        var index = (selfIndex+i)%4;
                        var pl = getUIPlayer(index);
                        if(!pl)
                            continue;
                        seqAction.push(cc.delayTime(1));
                        cc.log("==========createCbShowCards = " + index);
                        seqAction.push(cc.callFunc(createCbShowCards(index)));
                    }

                    seqAction.push(cc.delayTime(1));
                    for (var i=0; i<4; i++)
                    {
                        var selfIndex = sData.tData.uids.indexOf(SelfUid());
                        var zhuangOff = (sData.tData.zhuang + 4 - selfIndex) % 4;

                        if (sData.tData.zhuang != i)
                        {
                            var iOff = (i + 4 - selfIndex) % 4;
                            var iPl = getUIPlayer(iOff);
                            if (iPl && iPl.winone < 0)
                            {
                                seqAction.push(cc.callFunc(createCbShowCoins(iOff, zhuangOff)));
                                seqAction.push(cc.callFunc(createCbShowScores(iOff, iPl.winone)));
                            }
                        }
                    }



                    seqAction.push(cc.delayTime(1.5));
                    for (var i=0; i<4; i++)
                    {
                        var selfIndex = sData.tData.uids.indexOf(SelfUid());
                        var zhuangOff = (sData.tData.zhuang + 4 - selfIndex) % 4;

                        var iOff = (i + 4 - selfIndex) % 4;
                        var iPl = getUIPlayer(iOff);
                        if (sData.tData.zhuang != i)
                        {
                            if (iPl && iPl.winone > 0)
                            {
                                seqAction.push(cc.callFunc(createCbShowCoins(zhuangOff, iOff)));
                                seqAction.push(cc.callFunc(createCbShowScores(iOff, iPl.winone)));
                            }
                        }
                        else
                        {
                            if(iPl)
                            {
                                seqAction.push(cc.callFunc(createCbShowScores(iOff, iPl.winone)));
                            }
                        }
                    }


                    seqAction.push(cc.delayTime(2));
                }

                seqAction.push(cc.callFunc(function(){
                    if (MjClient.rePlayVideo != -1 && MjClient.replayui) {
                        //MjClient.replayui.replayEnd();
                    }
                    else
                    {
                        postEvent("clearCardUI");
                        if (sData.tData.roundNum <= 0)
                        {
                            MjClient.playui.addChild(new GameOverLayer(),500);
                        }
                        else
                        {
                            MJPassConfirmToServer_NN();
                        }
                    }
                }));

                this.runAction(cc.sequence(seqAction));
            },
            moveHead: function() {
                postEvent("returnPlayerLayer");
                tableStartHeadMoveAction_NN(this);
            },
            initSceneData: function() {
                reConectHeadLayout_NN(this);
                CheckRoomUiDelete();

                if (MjClient.rePlayVideo != -1)//回放
                {
                    CheckSameIP_NN();
                }
            },
            onlinePlayer: function() {
                reConectHeadLayout_NN(this);
            },
            waitJiazhu: function() {
                reConectHeadLayout_NN(this);
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
                changeMJBg(this, getCurrentMJBgType());
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
                _layout: [
                    [1, 1],
                    [0.5, 0.5],
                    [0, 0], true
                ],
            },
            LeftBottom:{
                _layout: [
                    [0.1, 0.1],
                    [0.03, 0.045],
                    [0, 0]
                ],
            },
            RightBottom:{
                _layout: [
                    [0.1, 0.1],
                    [0.97,0.05],
                    [0, 0]
                ],
            },
            RightTop:{
                _layout: [
                    [0.1, 0.1],
                    [0.97,0.95],
                    [0, 0]
                ],
            },
            leftTop:{
                _layout: [
                    [0.1, 0.1],
                    [0.03,0.95],
                    [0,0]
                ],
                _run:function()
                {
                    var text = new ccui.Text();
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
                        text.setFontName("fonts/lanting.TTF");
                    }else{
                        text.setFontName(MjClient.fzcyfont);
                    }
                    text.setFontSize(20);
                    text.setRotation(-90);
                    text.setAnchorPoint(0,0.5);
                    text.setPosition(23.5, 20.5);
                    this.addChild(text);
                    text.schedule(function(){
                        var time = MjClient.getCurrentTime();
                        var str = time[0]+"/"+time[1]+"/"+ time[2]+" "+
                            (time[3]<10?"0"+time[3]:time[3])+":"+
                            (time[4]<10?"0"+time[4]:time[4])+":"+
                            (time[5]<10?"0"+time[5]:time[5]);
                        this.setString(str);
                    });
                }
            }
        },
        gameName:{
            _layout: [
                [0.16, 0.16],
                [0.5, 0.62],
                [0, 0]
            ]
        },
        roundInfo:{
            _layout: [
                [0.12, 0.12],
                [0.5, 0.38],
                [0, 0]
            ],
            _run:function()
            {
                var tData = MjClient.data.sData.tData;
                var str = "";
                switch (tData.areaSelectMode.zhuangType)
                {
                    case 0:
                        str = "轮庄,";
                        break;
                    case 1:
                        str = "随庄,";
                        break;
                    case 2:
                        str = "牛牛抢庄,";
                        break;
                    case 3:
                        str = "房主坐庄,";
                        break;
                }
                str += "底注"+tData.areaSelectMode.diZhu + ",";
                str += "剩余"+(tData.roundNum - 1)+"局";
                var strPayWay = "";
                switch (tData.areaSelectMode.payWay)
                {
                    case 0:
                        strPayWay = ",房主付";
                        break;
                    case 1:
                        strPayWay = ",AA付";
                        break;
                    case 2:
                        strPayWay = ",大赢家付";
                        break;
                }
                var str5 = strPayWay;
                this.ignoreContentAdaptWithSize(true);
                this.setString(str + str5);
            },
            _event: {
                clearCardUI: function() {
                    var tData = MjClient.data.sData.tData;
                    var str = "";
                    switch (tData.areaSelectMode.zhuangType)
                    {
                        case 0:
                            str = "轮庄,";
                            break;
                        case 1:
                            str = "随庄,";
                            break;
                        case 2:
                            str = "牛牛抢庄,";
                            break;
                        case 3:
                            str = "房主坐庄,";
                            break;
                    }

                    var strPayWay = "";
                    switch (tData.areaSelectMode.payWay)
                    {
                        case 0:
                            strPayWay = ",房主付";
                            break;
                        case 1:
                            strPayWay = ",AA付";
                            break;
                        case 2:
                            strPayWay = ",大赢家付";
                            break;
                    }

                    str += "底注"+tData.areaSelectMode.diZhu + ",";
                    str += "剩余"+(tData.roundNum - 1)+"局";
                    str += strPayWay;
                    this.ignoreContentAdaptWithSize(true);
                    this.setString(str);
                },
                mjhand:function()
                {
                    var tData = MjClient.data.sData.tData;
                    var str = "";
                    switch (tData.areaSelectMode.zhuangType)
                    {
                        case 0:
                            str = "轮庄,";
                            break;
                        case 1:
                            str = "随庄,";
                            break;
                        case 2:
                            str = "牛牛抢庄,";
                            break;
                        case 3:
                            str = "房主坐庄,";
                            break;
                    }

                    var strPayWay = "";
                    switch (tData.areaSelectMode.payWay)
                    {
                        case 0:
                            strPayWay = ",房主付";
                            break;
                        case 1:
                            strPayWay = ",AA付";
                            break;
                        case 2:
                            strPayWay = ",大赢家付";
                            break;
                    }

                    str += "底注"+tData.areaSelectMode.diZhu + ",";
                    str += "剩余"+(tData.roundNum - 1)+"局";
                    str += strPayWay;
                    this.ignoreContentAdaptWithSize(true);
                    this.setString(str);
                }
            }
        },
        banner: {
            _layout: [
                [0.5, 0.5],
                [0.5, 1],
                [0, 0]
            ],
            wifi: {
                _run: function() {
                    updateWifiState(this);
                }
            },
            powerBar: {
                _run: function() {
                    cc.log("powerBar_run");
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
            setting: {
                _click: function() {
                    var settringLayer = new SettingView();
                    settringLayer.setName("PlayLayerClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi", {uid:SelfUid(),gameType:MjClient.gameType});
                }
            },
            Button_1: {
                _visible : true,
                _click: function() {
                    MjClient.openWeb({url:MjClient.GAME_TYPE.NIU_NIU,help:true});
                }
            },
            hunPai:{
                baidaBg:{
                    _run:function()
                    {
                        //baidaBg = this;
                        this.setVisible(false);
                    },
                    _event: {
                        roundEnd:function (eD) {
                            this.visible = false;
                        }
                    },
                },
                baidaText: {
                    _run:function()
                    {
                        //baidaOject = this;
                        this.setVisible(false);
                    },
                    _event: {
                        roundEnd:function (eD) {
                            this.visible = false;
                        }
                    },
                },

            },
        },
        arrowbk: {
            _layout: [
                [0.2, 0.2],
                [0.5, 0.5],
                [0, 0]
            ],
            _run:function () {
                MjClient.arrowbkNode = this;
                setDirVisible(this, true);
                setArrowFengDir(this);
            },
            _event: {
                initSceneData: function(eD) {
                    this.visible = true;
                },
                waitJiazhu: function(eD) {
                    this.visible = true;
                }

            },
            number: {
                _run: function() {
                    this.setString("00");
                    this.ignoreContentAdaptWithSize(true);
                },
                _event: {
                    roundEnd: function() {
                        this.stopAllActions();
                        stopEffect(playTimeUpEff);
                        playTimeUpEff = null;
                    },
                    LeaveGame: function() {
                        this.stopAllActions();
                        stopEffect(playTimeUpEff);
                        playTimeUpEff = null;
                    },
                    endRoom: function() {
                        this.stopAllActions();
                        stopEffect(playTimeUpEff);
                        playTimeUpEff = null;
                    },
                    MJPinniu:function(msg)
                    {
                        var pl = getUIPlayer(0);
                        if (pl.info.uid == msg.uid)
                        {
                            this.stopAllActions();
                            stopEffect(playTimeUpEff);
                            playTimeUpEff = null;
                            this.setString("00");
                        }
                    },
                    mjhand:function(){
                        arrowbkNumberUpdate_NN(this);
                    }

                }
            },
            arrow: {
                _visible:false,
                _event: {
                    clearCardUI: function() {
                        this.visible = false;
                    },
                    waitJiazhu:function(msg){
                        var tData = MjClient.data.sData.tData;
                        var that = this;

                        function callback()
                        {
                            cc.log("=====callback  show zhuang ==== " );
                            showUserZhuangLogo_NN(msg.zhuang);
                            var _timeNode = MjClient.playui._arrowbkNode.getChildByName("number");

                            if (tData.uids[msg.zhuang] != SelfUid())
                            {
                                arrowbkNumberUpdate_NN(_timeNode);

                                if(MjClient.playui._JiaZhuNode == null)
                                {
                                    MjClient.playui._JiaZhuNode = new jiaZhu_NNLayer(function(xiaZhuNum){
                                        cc.log("=====牛牛 加注 111= " + xiaZhuNum);

                                        var pl = getUIPlayer(0);
                                        pl.jiazhuNum = xiaZhuNum;
                                        MjClient.majiang.setJiaZhuNum(MjClient.playui._downNode,pl);

                                        MjClient.playui._JiaZhuNode = null;
                                        _timeNode.stopAllActions();
                                        _timeNode.setString("00");
                                        MjClient.playui._jiazhuWait.visible = true;

                                        stopEffect(playTimeUpEff);
                                        playTimeUpEff = null;
                                    });
                                    MjClient.playui.addChild(MjClient.playui._JiaZhuNode);
                                }
                            }
                            else
                            {
                                _timeNode.stopAllActions();
                                _timeNode.setString("00");
                                MjClient.playui._jiazhuWait.visible = true;
                            }
                        }

                        var readyLayer = new readyLayer_niuniu(function ()
                        {
                            readyLayer.removeFromParent();
                            if (tData.areaSelectMode.zhuangType == 1)//随庄
                            {
                                that.visible = true;
                                randomArrowAction(that,msg.zhuang, callback);
                            }
                            else
                            {
                                callback();
                            }
                        });
                        MjClient.playui.addChild(readyLayer, 500);
                        playEffectInPlay("gameStart");


                    }
                }
            },
        },
        jiazhuWait:{
            _visible:false,
            _layout: [
                [0.4, 0.4],
                [0.5, 0.5],
                [0, 0]
            ],
            _event:{
                moveHead:function()
                {
                    this.visible = false;
                }
            }
        },
        wait: {
            getRoomNum: {
                _run:function(){
                    if (MjClient.remoteCfg.guestLogin)
                    {
                        setWgtLayout(this, [0.18, 0.18],[0.3, 0.5],[0, 0]);
                    }
                    else
                    {
                        setWgtLayout(this, [0.18, 0.18],[0.3, 0.5],[0.6, 0.7]);
                    }
                },
                _visible:function()
                {
                    return !MjClient.remoteCfg.guestLogin;
                },
                _click: function() {
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fuzhifangjianxinxi", {uid:SelfUid(), gameType:MjClient.gameType});

                    /*
                     复制房间号-----------------------
                     */
                    var tData = MjClient.data.sData.tData;
                    var str1 = "牛牛,";
                    var str2 = "";
                    switch (tData.areaSelectMode.zhuangType)
                    {
                        case 0:
                            str2 = "轮庄,";
                            break;
                        case 1:
                            str2 = "随庄,";
                            break;
                        case 2:
                            str2 = "牛牛抢庄,";
                            break;
                        case 3:
                            str2 = "房主坐庄,";
                            break;
                    }
                    var str3 = "底注"+tData.areaSelectMode.diZhu + ",";
                    var str4 = (tData.areaSelectMode.maxPlayer == 3 ) ? "3人房," : "4人房,";
                    var strPayWay = "";
                    switch (tData.areaSelectMode.payWay)
                    {
                        case 0:
                            strPayWay = "房主付,";
                            break;
                        case 1:
                            strPayWay = "AA付,";
                            break;
                        case 2:
                            strPayWay = "大赢家付,";
                            break;
                    }
                    var str5 = strPayWay;
                    var str6 = tData.roundNum + "局," + ((tData.areaSelectMode.maxPlayer == 3 ) ? "二缺一":"三缺一")+",速度加入【"+AppCnName[MjClient.getAppType()]+"】\n" + "(复制此消息打开游戏可直接进入该房间)";
                    GLog(str1+str2+str3+str4 + str5+str6);
                    MjClient.native.doCopyToPasteBoard("房间号:[" + tData.tableid + "]\n" + str1+str2+str3+str4 + str5+str6);
                    MjClient.showMsg("已复制房间号，请不要返回大厅。打开微信后粘贴房间信息。", function(){
                        MjClient.native.openWeixin();
                    }, function(){});
                }
            },
            wxinvite: {
                _layout: [
                    [0.18, 0.18],
                    [0.3, 0.5],
                    [0.6, -0.35]
                ],
                _click: function() {
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Yaoqingweixinhaoyou", {uid:SelfUid(), gameType:MjClient.gameType});

                    var tData = MjClient.data.sData.tData;
                    var str1 = "";
                    var str2 = "";
                    switch (tData.areaSelectMode.zhuangType)
                    {
                        case 0:
                            str2 = "轮庄,";
                            break;
                        case 1:
                            str2 = "随庄,";
                            break;
                        case 2:
                            str2 = "牛牛抢庄,";
                            break;
                        case 3:
                            str2 = "房主坐庄,";
                            break;
                    }
                    var str3 = "底注"+tData.areaSelectMode.diZhu + ",";
                    var str4 = (tData.areaSelectMode.maxPlayer == 3 ) ? "3人房," : "4人房,";
                    var strPayWay = "";
                    switch (tData.areaSelectMode.payWay)
                    {
                        case 0:
                            strPayWay = "房主付,";
                            break;
                        case 1:
                            strPayWay = "AA付,";
                            break;
                        case 2:
                            strPayWay = "大赢家付,";
                            break;
                    }
                    var str5 = strPayWay;
                    var str6 = tData.roundNum + "局," + "速度加入【"+AppCnName[MjClient.getAppType()]+"】";
                    GLog(str1+str2+str3 + str4 +str5+str6);

                    var url = MjClient.remoteCfg.entreRoomUrl+"?vipTable="+tData.tableid;

                    MjClient.getInviteUrl(function (url) {
                        MjClient.native.wxShareUrl(url, GameCnName[MjClient.gameType] + "  " + tData.tableid + ((tData.areaSelectMode.maxPlayer == 3 ) ? "  二缺一":"  三缺一") + "  点击加入>>>",
                            str1+str2+str3+ str4 +str5+str6);
                    });

                },
                _visible:function()
                {
                    return !MjClient.remoteCfg.guestLogin;
                }
            },
            delroom: {
                _run:function(){
                    if (MjClient.remoteCfg.guestLogin)
                    {
                        setWgtLayout(this, [0.18, 0.18],[0.5, 0.5],[-0.05, 0]);
                    }
                    else
                    {
                        setWgtLayout(this, [0.18, 0.18],[0.5, 0.5],[0.508, 0.69]);
                    }
                },
                _click: function() {
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Jiesanfangjian", {uid:SelfUid(), gameType:MjClient.gameType});

                    MjClient.delRoom(true);
                }
            },
            backHomebtn: {
                _run:function(){
                    if (MjClient.remoteCfg.guestLogin)
                    {
                        setWgtLayout(this, [0.18, 0.18],[0.65, 0.5],[0.2, 0]);
                    }
                    else
                    {
                        setWgtLayout(this, [0.18, 0.18],[0.7, 0.5],[-0.6, -0.35]);
                    }
                },
                _click: function(btn) {
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Likaifangjian", {uid:SelfUid(), gameType:MjClient.gameType});

                    var sData = MjClient.data.sData;
                    if (sData) {
                        if (IsRoomCreator()) {
                            MjClient.showMsg("返回大厅房间仍然保留\n赶快去邀请好友吧",
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
        down: {
            head: {
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        //initSceneData: function() {
                        //    var pl = getUIPlayer(0);
                        //    if(pl &&TableState.isReady != pl.mjState)
                        //    {
                        //        showUserZhuangLogo(this, 0);
                        //    }
                        //
                        //},
                        clearCardUI: function () {
                            this.visible = false;
                        },
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
                    // this.zIndex = 600;
                    showFangzhuTagIcon(this,0);
                },
                score_bg:{_visible:false},
                name_bg:{_visible:false},
                jiaZhu:{
                    _run:function(){
                        this.visible = false;
                        this.setString("0");
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _event:{
                        clearCardUI: function(eD) {
                            this.visible = false;
                            this.setString("0");
                        }
                    }
                },
                gold_icon:{
                    _run:function(){
                        this.visible = false;
                    },
                    _event:{
                        clearCardUI: function(eD) {
                            this.visible = false;
                            cc.log("--------gold_icongold_icongold_icongold_icongold_icongold_icon---------");
                        }
                    }
                }
            },
            play_tip_NN: {
                _layout: [[0.2, 0.2], [0.5, 0.25], [0, 0.2]],
                _run: function () {
                    //this.zIndex = actionZindex;
                },
                _visible:false,
                _event:{
                    clearCardUI: function() {
                        this.visible = false;
                    },
                    mjhand: function(eD)
                    {
                        //this.visible = true;
                    },
                    initSceneData: function(eD) {
                        var pl = getUIPlayer(0);
                        showNiuFinished(this,pl);
                    },
                    MJPinniu:function(msg) {
                        //点击有牛，无牛按钮后的服务器返回
                        var pl = getUIPlayer(0);
                        if (pl && pl.info.uid == msg.uid) {
                            cc.log("=================down ============= ");
                            showNiuFinished(this,pl,true);
                        }
                    },
                    roundEnd: function() {
                        this.visible = false;
                    },
                }
            },
            ready: {
                _layout: [
                    [0.07, 0.07],
                    [0.5, 0.5],
                    [0, -1.5]
                ],
                _run: function() {
                    GetReadyVisible(this, 0);
                },
                _event: {
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
                        GetReadyVisible(this, 0);
                    }
                }
            },
            stand: {
                _layout: [
                    [0.057, 0],
                    [0.5, 0],
                    [-2.5, 0.68]
                ],
                _visible: false,
                _run: function () {
                    // this.zIndex = 500;
                },
            },
            BtnHaveNiu:{
                _visible: false,
                _layout: [[0.25, 0.12], [0.8, 0.25], [0.5, 0.2]],
                _click: function(btn) {
                    cc.log("有牛");
                    playEffectInPlay("complete");
                    var selectCards = MjClient.selectCards_NN;

                    DealWithMJPinNiu(selectCards);
                },
                _event:{
                    clearCardUI: function() {
                        this.visible = false;
                    },
                    mjhand: function(eD)
                    {
                        if(MjClient.rePlayVideo != -1)
                        {
                            this.visible = false;
                        }
                        else
                        {
                            this.visible = true;
                        }

                        var pl = getUIPlayer(0);
                        var _cardType = MjClient.majiang.calHandScore(pl.mjhand);
                        if(_cardType > 1000)
                        {
                            //特出牌牌型
                            this.setBright(true);
                            this.setTouchEnabled(true);
                        }
                        else
                        {
                            this.setBright(false);
                            this.setTouchEnabled(false);
                        }

                    },
                    initSceneData: function(eD) {
                        var pl = getUIPlayer(0);
                        if(pl && pl.mjState == TableState.waitCard && MjClient.rePlayVideo == -1)
                        {
                            this.visible = true;
                            var _cardType = MjClient.majiang.calHandScore(pl.mjhand);
                            if(_cardType > 1000)
                            {
                                //特出牌牌型
                                this.setBright(true);
                                this.setTouchEnabled(true);
                            }
                            else
                            {
                                this.setBright(false);
                                this.setTouchEnabled(false);
                            }
                        }
                        else{
                            this.visible = false;
                        }
                    }
                }
            },
            BtnNoNiu:{
                _visible: false,
                _layout: [[0.25, 0.12], [0.8, 0.25], [0.5, -0.9]],
                _click: function(btn) {
                    cc.log("无牛");
                    playEffectInPlay("complete");
                    var selectCards = [];
                    DealWithMJPinNiu(selectCards);
                },
                _event:{
                    clearCardUI: function() {
                        //UpdataCurrentNiuShow_NN();
                    },
                    mjhand: function(eD)
                    {
                        this.visible = true;
                        if(MjClient.rePlayVideo != -1)//回放
                        {
                            this.visible = false;
                        }
                        else
                        {
                            this.visible = true;
                        }
                    },
                    initSceneData: function(eD) {
                        var pl = getUIPlayer(0);
                        if(pl && pl.mjState == TableState.waitCard && MjClient.rePlayVideo == -1)
                        {
                            this.visible = true;
                        }
                        else{
                            this.visible = false;
                        }
                    },
                }

            },
            _event: {
                clearCardUI: function() {
                    clearCardUI_NN(this, 0);
                },
                initSceneData: function(eD) {
                    SetUserVisible_NN(this, 0);
                },
                addPlayer: function(eD) {
                    SetUserVisible_NN(this, 0);
                },
                removePlayer: function(eD) {
                    SetUserVisible_NN(this, 0);
                },
                mjhand: function(eD) {
                    InitUserHandUI_NN(this, 0);
                },
                roundEnd: function() {
                    InitUserCoinAndName(this, 0);
                    //setTaiInfo("");
                },
                onlinePlayer: function(eD) {
                    setUserOffline(this, 0);
                },
                playerStatusChange: function(eD) {
                    setUserOffline(this, 0);
                },
                waitJiazhu:function()
                {

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
                        //initSceneData: function() {
                        //    var pl = getUIPlayer(1);
                        //    if(pl && TableState.isReady != pl.mjState)
                        //    {
                        //        showUserZhuangLogo(this, 1);
                        //    }
                        //},
                        clearCardUI: function () {
                            this.visible = false;
                        },
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
                jiaZhu:{
                    _run:function(){
                        this.visible = false;
                        this.setString("0");
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _event:{
                        clearCardUI: function(eD) {
                            this.visible = false;
                            this.setString("0");
                        }
                    }
                },
                gold_icon:{
                    _run:function(){
                        this.visible = false;
                    },
                    _event:{
                        clearCardUI: function(eD) {
                            this.visible = false;
                        }
                    }
                }
            },
            play_tip_NN: {
                _layout: [[0.18, 0.18], [0.8, 0.5], [-0.3, 0.5]],
                _run: function () {
                    this.zIndex = this.zIndex + 6;
                },
                _visible:false,
                _event:{
                    clearCardUI: function() {
                        this.visible = false;
                    },
                    mjhand: function(eD)
                    {
                        //this.visible = true;
                    },
                    initSceneData: function(eD) {
                        var pl = getUIPlayer(1);
                        showNiuFinished(this,pl);;
                    },
                    MJPinniu:function(msg) {
                        //点击有牛，无牛按钮后的服务器返回
                        var pl = getUIPlayer(1);
                        if (pl && pl.info.uid == msg.uid) {
                            cc.log("=================rgiht ==== ");
                            showNiuFinished(this,pl,true);
                        }
                    },
                    roundEnd: function() {
                        this.visible = false;
                    },
                }
            },
            ready: {
                _layout: [
                    [0.07, 0.07],
                    [0.5, 0.5],
                    [2, 0]
                ],
                _run: function() {
                    GetReadyVisible(this, 1);
                },
                _event: {
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
                _layout: [
                    [0, 0.08],
                    [1, 1],
                    [-5.7, -4.2]
                ],
                _visible: false
            },
            up: {
                _layout: [
                    [0, 0.05],
                    [1, 0],
                    [-3.5, 6]
                ],
                _visible: false
            },

            _event: {
                clearCardUI: function() {
                    clearCardUI_NN(this, 1);
                },
                initSceneData: function(eD) {
                    SetUserVisible_NN(this, 1);
                },
                addPlayer: function(eD) {
                    SetUserVisible_NN(this, 1);
                },
                removePlayer: function(eD) {
                    SetUserVisible_NN(this, 1);
                },
                mjhand: function(eD) {
                    InitUserHandUI_NN(this, 1);
                },
                roundEnd: function() {
                    InitUserCoinAndName(this, 1);
                },
                onlinePlayer: function(eD) {
                    setUserOffline(this, 1);
                },
                playerStatusChange: function(eD) {
                    setUserOffline(this, 1);
                }
            }
        },
        top: {
            head: {
                zhuang: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        //initSceneData: function() {
                        //    var pl = getUIPlayer(2);
                        //    if(pl &&TableState.isReady != pl.mjState)
                        //    {
                        //        showUserZhuangLogo(this, 2);
                        //    }
                        //},
                        clearCardUI: function () {
                            this.visible = false;
                        },
                    },

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
                jiaZhu:{
                    _run:function(){
                        this.visible = false;
                        this.setString("0");
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _event:{
                        clearCardUI: function(eD) {
                            this.visible = false;
                            this.setString("0");
                        }
                    }
                },
                gold_icon:{
                    _run:function(){
                        this.visible = false;
                    },
                    _event:{
                        clearCardUI: function(eD) {
                            this.visible = false;
                        }
                    }
                }
            },
            play_tip_NN: {
                _layout: [[0.18, 0.18], [0.5, 0.7], [0, 0]],
                _run: function () {
                    this.zIndex = actionZindex;
                },
                _visible:false,
                _event: {
                    clearCardUI: function () {
                        this.visible = false;
                    },
                    mjhand: function (eD) {
                        //this.visible = true;
                    },
                    initSceneData: function (eD) {
                        var pl = getUIPlayer(2);
                        showNiuFinished(this,pl);
                    },
                    MJPinniu:function(msg) {
                        //点击有牛，无牛按钮后的服务器返回
                        var pl = getUIPlayer(2);
                        if (pl && pl.info.uid == msg.uid) {
                            cc.log("=================top ==== ");
                            showNiuFinished(this,pl,true);
                        }
                    },
                    roundEnd: function() {
                        this.visible = false;
                    },
                }
            },
            ready: {
                _layout: [
                    [0.07, 0.07],
                    [0.5, 0.5],
                    [0, 1.5]
                ],
                _run: function() {
                    GetReadyVisible(this, 2);
                },
                _event: {
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
                _layout: [
                    [0, 0.07],
                    [0.5, 1],
                    [-4, -2.5]
                ],
                _visible: false
            },
            up: {
                _layout: [
                    [0, 0.07],
                    [0.5, 1],
                    [6, -2.5]
                ],
                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    clearCardUI_NN(this, 2);
                },
                initSceneData: function(eD) {
                    SetUserVisible_NN(this, 2);
                },
                addPlayer: function(eD) {
                    SetUserVisible_NN(this, 2);
                },
                removePlayer: function(eD) {
                    SetUserVisible_NN(this, 2);
                },
                mjhand: function(eD) {
                    InitUserHandUI_NN(this, 2);
                },
                roundEnd: function() {
                    InitUserCoinAndName(this, 2);

                },
                onlinePlayer: function(eD) {
                    setUserOffline(this, 2);
                },
                playerStatusChange: function(eD) {
                    setUserOffline(this, 2);
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
                        //initSceneData: function() {
                        //    var pl = getUIPlayer(3);
                        //    if(pl &&TableState.isReady != pl.mjState)
                        //    {
                        //        showUserZhuangLogo(this, 3);
                        //    }
                        //},
                        clearCardUI: function () {
                            this.visible = false;
                        },
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
                jiaZhu:{
                    _run:function(){
                        this.visible = false;
                        this.setString("0");
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _event:{
                        clearCardUI: function(eD) {
                            this.visible = false;
                            this.setString("0");
                        }
                    }
                },
                gold_icon:{
                    _run:function(){
                        this.visible = false;
                    },
                    _event:{
                        clearCardUI: function(eD) {
                            this.visible = false;
                        }
                    }
                }
            },
            play_tip_NN: {
                _layout: [[0.18, 0.18], [0.2, 0.5], [0.35, 0.5]],
                _run: function () {
                    this.zIndex = actionZindex;
                },
                _visible:false,
                _event: {
                    clearCardUI: function () {
                        this.visible = false;
                    },
                    mjhand: function (eD) {
                        //this.visible = true;
                    },
                    initSceneData: function (eD) {
                        var pl = getUIPlayer(3);
                        showNiuFinished(this,pl);
                    },
                    MJPinniu:function(msg) {
                        //点击有牛，无牛按钮后的服务器返回
                        var pl = getUIPlayer(3);
                        if (pl && pl.info.uid == msg.uid) {
                            cc.log("=================left ==== ");
                            showNiuFinished(this,pl,true);
                        }
                    },
                    roundEnd: function() {
                        this.visible = false;
                    },
                }
            },
            ready: {
                _layout: [
                    [0.07, 0.07],
                    [0.5, 0.5],
                    [-2, 0]
                ],
                _run: function() {
                    GetReadyVisible(this, 3);
                },
                _event: {
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
            up: {
                _layout: [
                    [0, 0.05],
                    [0, 0.7],
                    [3.5, -2.0]
                ],
                _visible: false
            },
            stand: {
                _layout: [
                    [0, 0.08],
                    [0, 0],
                    [5.7, 8]
                ],
                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    clearCardUI_NN(this, 3);
                },
                initSceneData: function(eD) {
                    SetUserVisible_NN(this, 3);
                },
                addPlayer: function(eD) {
                    SetUserVisible_NN(this, 3);
                },
                removePlayer: function(eD) {
                    SetUserVisible_NN(this, 3);
                },
                mjhand: function(eD) {
                    InitUserHandUI_NN(this, 3);
                },
                roundEnd: function() {
                    InitUserCoinAndName(this, 3);
                },
                onlinePlayer: function(eD) {
                    setUserOffline(this, 3);
                }
            }
        },
        eat: {
            scoreBg: {
                _layout: [
                    [0.5, 0.5],
                    [0.5, 0.3],
                    [0, -0.1]
                ],
                _visible:false,
                Image_niu: {
                    _visible:false,
                    _run:function()
                    {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _event:{
                        clearCardUI: function() {
                            this.visible = false;
                        },
                    }
                },
                Text_0:{
                    _text:function () {
                        return "";
                    },
                    _event:{
                        clearCardUI: function() {
                            this.setString("");
                        },
                    }
                },
                Text_1:{
                    _text:function () {
                        return "";
                    },
                    _event:{
                        clearCardUI: function() {
                            this.setString("");
                        },
                    }
                },
                Text_2:{
                    _text:function () {
                        return "";
                    },
                    _event:{
                        clearCardUI: function() {
                            this.setString("");
                        },
                    }
                },
                Text_3:{
                    _text:function () {
                        return "";
                    },
                    _event:{
                        clearCardUI: function() {
                            this.setString("");
                        },
                    }
                },
                _event: {
                    clearCardUI: function() {
                        this.visible = false;
                    },
                    mjhand: function(eD) {
                        this.visible = true;
                        if(MjClient.rePlayVideo != -1)
                        {
                            this.visible = false;
                        }
                    },
                    MJPinniu: function(msg) {
                        var pl = getUIPlayer(0);
                        if (pl && pl.info.uid == msg.uid)
                        {
                            this.visible = false;
                        }
                    },
                    initSceneData: function(eD) {
                        //showNiuCount_NN(this);
                        var pl = getUIPlayer(0);
                        if(pl && pl.mjState == TableState.waitCard && MjClient.rePlayVideo == -1)
                        {
                            this.visible = true;
                        }
                        else{
                            this.visible = false;
                        }
                    }
                }

            }
        },
        chat_btn: {
            _layout: [
                [0.09, 0.09],
                [0.95, 0.1],
                [0, 3.8 + 3.5]
            ],
            _click: function() {
                var chatlayer = new ChatLayer();
                MjClient.Scene.addChild(chatlayer);
            }
        },
        voice_btn: {
            _layout: [
                [0.09, 0.09],
                [0.95, 0.2],
                [0, 4.2 + 3.5]
            ],
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
                    downAndPlayVoice(msg.uid, msg.msg);
                }
            }
        },
    },
    _downNode:null,
    _rightNode:null,
    _topNode:null,
    _leftNode:null,
    _JiaZhuNode:null,
    _arrowbkNode:null,
    _jiazhuWait:null,
    ctor: function() {
        this._super();
        var playui = ccs.load(res.Play_niuniu_json);
        playMusic("niuniu/bgFight_niuniu");
        this._downNode  = playui.node.getChildByName("down");
        this._rightNode = playui.node.getChildByName("right");
        this._topNode   = playui.node.getChildByName("top");
        this._leftNode  = playui.node.getChildByName("left");
        this._arrowbkNode  = playui.node.getChildByName("arrowbk");
        this._jiazhuWait = playui.node.getChildByName("jiazhuWait");
        MjClient.playui = this;
        MjClient.playui._AniNode =  playui.node.getChildByName("eat");
        BindUiAndLogic(playui.node, this.jsBind);
        this.addChild(playui.node);

        //加载plist图
        cc.spriteFrameCache.addSpriteFrames("niuniu/plist_2.plist","niuniu/plist_2.png");

        //添加滚动通知 by sking
        var _laba_bg =  playui.node.getChildByName("banner").getChildByName("laba_bg");
        _laba_bg.visible = false;
        var _scroll =  playui.node.getChildByName("banner").getChildByName("scroll");
        _scroll.visible = false;


        MjClient.lastMJTick = Date.now();
        this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function() {
            if (MjClient.game_on_show) MjClient.tickGame(0);
        }), cc.delayTime(7))));

        changeMJBg(this, getCurrentMJBgType());
        // 在亲友圈房间中添加邀请亲友圈牌有一起对局
        addClubYaoqingBtn();

        return true;
    }
});

PlayLayer_niuniu.prototype.CardLayoutRestore = function(node, off)
{

    var pl; //player 信息
    pl = getUIPlayer(off);//获取玩家信息.off 为0 ，就是自己得信息，能看到自己摸牌 by sking
    if(!pl) return;//如果没有数据

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
        }
    }

    //up stand 是2种麻将的图。
    var up = node.getChildByName("up");
    var stand = node.getChildByName("stand");
    var start, offui;
    switch (off)
    {
        case 0:
            start = stand;
            break;
        case 1:
            start = stand;
            break;
        case 2:
            start = stand;
            break;
        case 3:
            start = stand;
            break;
    }

    var upSize = start.getSize();
    var upS = start.scale;

    var uiheng = [];
    var uinormal = [];

    for(var i = 0; i < children.length; i++) //children 为 "down" 节点下的字节点
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            if(ci.heng == true)
            {
                uiheng.push(ci);
            }
            else
            {
                uinormal.push(ci);
            }
        }
        else if(ci.name == "standPri")
        {
            if(ci.heng == true)
            {
                uiheng.push(ci);
            }
            else
            {
                uinormal.push(ci);
            }
        }
        else if(ci.name == "mjhand_replay")
        {
            if(ci.heng == true)
            {
                uiheng.push(ci);
            }
            else
            {
                uinormal.push(ci);
            }
        }

    }



    uiheng.sort(TagOrder);
    uinormal.sort(TagOrder);

    var uistand = [];
    uistand = uiheng.concat(uinormal);

    var uiOrder = [uistand];
    if(off == 1 || off == 2)
    {
        uiOrder.reverse();//颠倒顺序
    }

    var orders = []; //重新排序后装到数组里 by sking
    for(var j = 0; j < uiOrder.length; j++)
    {
        var uis = uiOrder[j];
        for(var i = 0; i < uis.length; i++)
        {
            orders.push(uis[i]);
        }
    }


    for(var i = 0; i < orders.length; i++)
    {
        var ci = orders[i];


        if(off % 2 == 0)//自己或者对家
        {
            if(i != 0)
            {
                if(ci.name == "mjhand")
                {
                    ci.x = orders[i - 1].x + upSize.width * upS *1.2//1.08;
                }
                else
                {
                    ci.x = orders[i - 1].x + upSize.width * upS * 1.42;//对家的手牌
                }
            }
            else
            {
                if (off == 0)
                {
                    ci.x = start.x + upSize.width * upS * 0.1;
                }
                else
                {
                    ci.x = start.x + upSize.width * upS;
                }
            }
        }
        else
        {
            if(i != 0)
            {
                if(ci.name == "standPri")
                {
                    ci.y = orders[i - 1].y - upSize.height * upS * 0.7;
                }
                else
                {
                    ci.y = orders[i - 1].y - upSize.height * upS * 0.65;
                }
                ci.zIndex = orders[i - 1].zIndex + 1;//调整每张牌的层级
            }
            else
            {
                ci.y = start.y - upSize.height * upS * 0.2;
                ci.y += 10;
                ci.zIndex = start.zIndex;//第一张牌的层级
            }
        }

        if(ci.heng) {
            setCardLayoutTag(ci);
        }
    }
};
