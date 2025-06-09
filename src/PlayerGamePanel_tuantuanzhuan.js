/**
 * Created by Administrator on 2017/3/9.
 */

var actionZindex = 1000;
//向服务器发送 过消息
// MjClient.PKPass2NetFortuantuanzhuan = function()
// {
//     cc.log("====================send======pass=====");
//     var sData = MjClient.data.sData;
//     var tData = sData.tData;
//     if(IsTurnToMe() && tData.tState == TableState.waitPut)
//     {
//
//         PKPassConfirmToServer_card();
//     }
// }



// 这个没看懂干嘛的
// off 是四个位置，根据off 显示四个位置的信息 by sking
function SetUserVisible_tuantuanzhuan(node, off)
{
    //var sData = MjClient.data.sData;
    //return;
    //cc.log("====================off======================" + off);
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
        InitUserHandUI_tuantuanzhuan(node, off);
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


function InitUserHandUI_tuantuanzhuan(node, off)
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
    currentLeftCardCount(off);

    initSortUI();
    //检查同花顺
    checkTongHuaShun();

    // if(vnPos.indexOf(off) == -1)
    // {
    //     vnPos.push(off);
    // }

    if(tData.tState == TableState.waitJiazhu && SelfUid() == pl.info.uid)
    {
        if(pl.mjState == TableState.waitJiazhu)
        {
            var layer = new jiaZhutuantuanzhuanLayer();
            MjClient.playui.addChild(layer,99);
            if (MjClient.webViewLayer != null)
            {
                MjClient.webViewLayer.close();
            }
        }
        else
        {
            //弹窗等待其他玩家加注
            MjClient.playui._jiazhuWait.visible = true;
            //if(MjClient.playui._waitLayer == null)
            //{
            //    MjClient.playui._waitLayer = new UnclosedTipLayer("等待其他玩家加注!");
            //    MjClient.Scene.addChild(MjClient.playui._waitLayer,99);
            //}
        }

    }

    if(
        tData.tState != TableState.waitPut &&
        tData.tState != TableState.waitEat &&
        tData.tState != TableState.waitCard
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


var PlayLayer_tuantuanzhuan = cc.Layer.extend({
    _btnPutCard:null,
    jsBind: {
        _event: {
            mjhand: function() {
                if(MjClient.endoneui != null)
                {
                    cc.log("=======mjhand====endoneui====" + typeof (MjClient.endoneui) );
                    MjClient.endoneui.removeFromParent(true);
                    MjClient.endoneui = null;
                }

                var sData = MjClient.data.sData;
                var tData = sData.tData;
                // resetFlowerNum(this);
                // resetJiaZhuNum(this);
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
            changePosition: function(msg) {
                /*
                   换位置
              */
                var currentSelectCard = msg.selectedCard;
                var change_uids  = msg.uids;
                var sData = MjClient.data.sData;
                var tData = sData.tData;
                var current_uids = tData.uids;

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
                    currentLeftCardCount(i);
                }

                //回放的时候
                if(MjClient.rePlayVideo != -1)
                {
                    tData.uids = msg.uids;//要更新uid位置
                    resetPlayerHead();
                    MjClient.playui._positionCard.visible = false;
                }
                else
                {
                    //牌的翻的效果,正常打牌
                    cardRollAction(currentSelectCard,function(){

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
                        })));
                    });
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
                if (msg.showEnd) this.addChild(new GameOverLayer(),500);
                else
                    MjClient.Scene.addChild(new StopRoomView());
            },
            roundEnd: function() {
                var self = this;
                function delayExe()
                {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    //resetEatActionAnim();
                    if (sData.tData.roundNum <= 0) {
                        if(!tData.matchId){
                            self.addChild(new GameOverLayer(),500);
                        }else{
                            self.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                                self.addChild(new GameOverLayer(),500);
                            })))
                        }
                    }
                    self.addChild(new EndOneView_tuantuanzhuan(),500);
                }
                this.runAction(cc.sequence(cc.DelayTime(0.2),cc.callFunc(delayExe)));
            },
            moveHead: function() {
                postEvent("returnPlayerLayer");
                //MjClient.playui._jiazhuWait.visible = false;
                tableStartHeadMoveAction_card(this);
            },
            initSceneData: function() {
                reConectHeadLayout_card(this);
                CheckRoomUiDelete();
                var sData = MjClient.data.sData;
                var tData = sData.tData;
                if(tData.tState == TableState.waitPut )
                {
                    UpdataCurrentPutCard();
                }
            },
            onlinePlayer: function() {
                reConectHeadLayout_card(this);
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
        info:
        {
            _layout: [
                [0.16, 0.16],
                [0.01, 0.935],
                [0, 0]
            ]
        },
        gameName:{
            _layout: [
                [0.16, 0.16],
                [0.5, 0.7],
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
                this.ignoreContentAdaptWithSize(true);
                str += "剩余"+(tData.roundNum - 1)+"局,";
                this.setString(str );
            },
            _event:{
                mjhand:function()
                {
                    var tData = MjClient.data.sData.tData;
                    var str = "";
                    this.ignoreContentAdaptWithSize(true);
                    var strPayWay = "";
                    str += "剩余"+(tData.roundNum - 1)+"局,";
                    // switch (tData.areaSelectMode.payWay)
                    // {
                    //     case 0:
                    //         strPayWay = "房主付";
                    //         break;
                    //     case 1:
                    //         strPayWay = "AA付";
                    //         break;
                    //     case 2:
                    //         strPayWay = "大赢家付";
                    //         break;
                    // }
                    var str5 = strPayWay;
                    this.setString(str + str5);
                },
            }
        },
        banner: {
            _layout: [
                [0.5, 0.5],
                [0.5, 1],
                [0, 0]
            ],
            bg_time:{
                 _run:function()
                {
                    var text = new ccui.Text();
                    text.setFontName(MjClient.fzcyfont);
                    text.setFontSize(26);

                    text.setAnchorPoint(1,0.5);
                    text.setPosition(66, 15);
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
                    updateWifiState(this);
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
                    MjClient.openWeb({url:MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN,help:true});
                }
            },
            hunPai:{
                baidaBg:{
                    small:{
                      _run:function() {
                          this.runAction(cc.sequence(cc.fadeOut(1), cc.fadeIn(0.5)).repeatForever());
                      },
                      _event:{
                          mjhand:function()
                          {
                              this.visible = true;
                          }
                      }
                    },
                    _run:function()
                    {
                        //baidaBg = this;
                        this.setVisible(true);
                    },
                    _event: {
                        mjhand:function()
                        {
                            this.visible = true;
                        },
                        roundEnd:function (eD) {
                            this.visible = false;
                        }
                    },
                },
                baidaImg: {
                    _run:function()
                    {
                        //baidaOject = this;
                        this.setVisible(false);
                    },
                    _event: {
                        mjhand:function()
                        {
                            this.visible = true;
                            this.setScale(1);
                            this.setPosition(-296,-280);
                            var HuncardMsg = MjClient.data.sData.tData.hunCard;

                            var func = cc.callFunc(function(){
                                playEffect("hunCardFly");
                            })
                            setCardSprite(this, parseInt(HuncardMsg), 4);
                            this.runAction(cc.sequence(cc.delayTime(1),
                                cc.spawn(cc.scaleTo(0.6,0.5),cc.moveTo(0.6,0,1.86)).easing(cc.easeQuinticActionOut()),
                                func));
                        },
                        initSceneData:function()
                        {
                            this.visible = true;
                            var HuncardMsg = MjClient.data.sData.tData.hunCard;
                            if(HuncardMsg)
                            {
                                setCardSprite(this, parseInt(HuncardMsg), 4);
                            }
                        },
                        roundEnd:function (eD) {
                            this.visible = false;
                        }
                    },
                },
                baidaText: {
                    _run:function()
                    {
                        //baidaOject = this;
                        this.setVisible(true);
                    },
                    _event: {
                        mjhand:function(){
                          this.visible = true;
                        },
                        roundEnd:function (eD) {
                            this.visible = false;
                        }
                    },
                },
                _event:{
                    clearCardUI: function(eD) {
                        this.visible = false;
                    },
                    mjhand:function()
                    {
                        this.visible = true;
                    },
                    initSceneData:function()
                    {
                        this.visible = true;
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        //cc.log(" tData.tState  ------------sking = " + tData.tState );
                        if(tData.tState != TableState.waitPut &&
                            tData.tState != TableState.waitEat &&
                            tData.tState != TableState.waitCard
                        )
                        {
                            this.visible = false;
                        }else{
                            this.visible = true;
                        }
                    }
                }
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
                    this.visible = IsArrowVisible();
                    SetArrowRotation(this)
                },
                mjhand: function(eD) {
                    this.visible = IsArrowVisible();
                    SetArrowRotation(this);
                },
                onlinePlayer: function(eD) {
                    //this.visible = IsArrowVisible();
                   // cc.log("============online player=======565======");
                },
                waitPut: function(eD) {
                    SetArrowRotation(this)
                },
            },
            number: {
                _run: function() {
                    this.setString("00");
                    //arrowbkNumberUpdate(this);
                    this.ignoreContentAdaptWithSize(true);
                },
                _event: {
                    waitPut: function() {
                        this.stopAllActions();
                        stopEffect(playTimeUpEff);
                        arrowbkNumberUpdate(this);
                    },
                    PKPut: function(msg) {
                        if (msg.uid == SelfUid()) {
                            this.stopAllActions();
                            stopEffect(playTimeUpEff);
                            playTimeUpEff = null;
                            //arrowbkNumberUpdate(this);
                            this.setString("00");
                        }
                    },
                    roundEnd: function() {
                        this.stopAllActions();
                        stopEffect(playTimeUpEff);
                        playTimeUpEff = null;
                    },
                    LeaveGame: function() {
                        this.stopAllActions();
                        stopEffect(playTimeUpEff);
                        playTimeUpEff = null;
                    }

                }
            },
        },
        wait: {
            getRoomNum: {
                _run:function(){
                    setWgtLayout(this, [0.18, 0.18],[0.8, 0.16],[0, 0]);
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
                    getPlayingRoomInfo(1);
                }
            },
            wxinvite: {
                _layout: [
                    [0.18, 0.18],[0.8, 0.3],[0, 0]
                ],
                _click: function() {
                    getPlayingRoomInfo(2);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Yaoqingweixinhaoyou", {uid:SelfUid(), gameType:MjClient.gameType});

                },
                _visible:function()
                {
                    return !MjClient.remoteCfg.guestLogin;
                }
            },
            delroom: {
                _run:function(){
                    setWgtLayout(this, [0.11, 0.11],[0.05, 0.45],[0, 0]);
                },
                _click: function() {
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Jiesanfangjian", {uid:SelfUid(), gameType:MjClient.gameType});

                    MjClient.delRoom(true);
                }
            },
            backHomebtn: {
                _run:function(){
                    setWgtLayout(this, [0.11, 0.11],[0.05, 0.6],[0, 0]);
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
        BtnNoPut:{ //add by  sking for put card button
            _run: function () {
                this.visible = false;
                setWgtLayout(this,[0.18, 0.18], [0.82, 0.47], [-3, 0.26]);
            },
            _click: function(btn) {
                //cc.log("BtnNoPut");
                //var sData = MjClient.data.sData;
                //cc.log("sData.tState == " + sData.tState);
                var downNode = MjClient.playui._downNode;
                this.visible = false;
                PKPassConfirmToServer_card();
            },
            _event:{
                //拿到一张牌的时候，出牌按钮亮起，其他状态隐藏，by sking
                mjhand: function() {
                    var tData = MjClient.data.sData.tData;
                    if(!IsTurnToMe() || tData.tState != TableState.waitPut)
                    {
                        this.visible = false;
                    }
                    else
                    {
                        this.visible = true;
                    }
                },
                newCard: function(eD)
                {
                    //cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>newCard by sking");
                    this.visible = true;
                    //setWgtLayout(this, [0.1, 0.1],[0.7, 0.2],[0, 0]);
                },
                PKPut: function(eD) {
                    //cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PKPut by sking");
                    this.visible = false;
                },
                PKPass: function(eD) {
                    console.log("HHH :，PKPass------");
                    //MjClient.playui.EatVisibleCheck();
                },
                waitPut: function() {
                    var tData = MjClient.data.sData.tData;
                    if(!IsTurnToMe() || tData.tState != TableState.waitPut)
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
                    if(!IsTurnToMe() || tData.tState != TableState.waitPut)
                    {
                        this.visible = false;
                    }
                    else
                    {
                        this.visible = true;
                    }
                }
            }
        },//end of add by sking
        BtnHimt:{ //add by  sking for put card button
            _run: function () {
                this.visible = false;
                setWgtLayout(this,[0.18, 0.18], [0.82, 0.47], [-1.75, 0.26]);
            },
            _click: function(btn) {
                //cc.log("BtnHimt");
                if(putOutCardTips() == 0)
                {
                    PKPassConfirmToServer_card();
                }
                playEffect("guandan/tishi");
            },
            _event:{
                //拿到一张牌的时候，出牌按钮亮起，其他状态隐藏，by sking
                mjhand: function() {
                    var tData = MjClient.data.sData.tData;
                    if(!IsTurnToMe() || tData.tState != TableState.waitPut)
                    {
                        this.visible = false;
                    }
                    else
                    {
                        this.visible = true;
                    }
                },
                newCard: function(eD)
                {
                    //cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>newCard by sking");
                    this.visible = true;
                    //setWgtLayout(this, [0.1, 0.1],[0.7, 0.2],[0, 0]);
                },
                PKPut: function(eD) {
                    //cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PKPut by sking");
                    this.visible = false;
                },
                waitPut: function() {
                    var tData = MjClient.data.sData.tData;
                    if(!IsTurnToMe() || tData.tState != TableState.waitPut)
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
                    if(!IsTurnToMe() || tData.tState != TableState.waitPut)
                    {
                        this.visible = false;
                    }
                    else
                    {
                        this.visible = true;
                    }
                }
            }
        },//end of add by sking
        BtnPutCard:{ //add by  sking for put card button
            _run: function () {
                this.visible = false;
                setWgtLayout(this,[0.18, 0.18], [0.82, 0.47], [-0.5, 0.26]);
            },
            _click: function(btn) {
                //cc.log("BtnPutCard");
                PutOutCard_card(); //可以出牌
                this.visible = false;
            },
            _event:{
                //拿到一张牌的时候，出牌按钮亮起，其他状态隐藏，by sking
                mjhand: function() {
                    //cc.log("============mjhand=========== btnPutCard");
                    var tData = MjClient.data.sData.tData;
                    if(!IsTurnToMe() || tData.tState != TableState.waitPut)
                    {
                        this.visible = false;
                    }
                    else
                    {
                        this.visible = true;
                    }
                },
                newCard: function(eD)
                {
                    //cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>newCard by sking");
                    this.visible = true;
                    //setWgtLayout(this, [0.1, 0.1],[0.7, 0.2],[0, 0]);
                },
                PKPut: function(eD) {
                    //cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PKPut by sking");
                    this.visible = false;
                },

                waitPut: function() {
                    var tData = MjClient.data.sData.tData;
                    if(!IsTurnToMe() || tData.tState != TableState.waitPut)
                    {
                        this.visible = false;
                    }
                    else
                    {
                        this.visible = true;
                    }

                    // var pl = getUIPlayer(0);
                    // var eat = MjClient.playui.jsBind.eat;
                    // if (IsTurnToMe() && pl.isTing && !eat.hu._node.visible && !eat.gang0._node.visible && !eat.gang1._node.visible && !eat.gang2._node.visible) {
                    //     cc.log("*********自动出牌*********");
                    //     this.runAction(cc.sequence(cc.delayTime(0.8),
                    //         cc.callFunc(MjClient.playui.jsBind.BtnPutCard._click)));
                    // }else{
                    //     if(MjClient.playui.isCanPutCard())
                    //     {
                    //         cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>isCanPutCard");
                    //         this.visible = true;
                    //     }
                    // }
                },
                initSceneData: function()
                {
                    var tData = MjClient.data.sData.tData;
                    if(!IsTurnToMe() || tData.tState != TableState.waitPut)
                    {
                        this.visible = false;
                    }
                    else
                    {
                        this.visible = true;
                    }
                }
            }
        },//end of add by sking
        positionCard:{ //add by  sking for put card button
            _run: function () {
                this.visible = false;
                setWgtLayout(this,[0.18, 0.18], [0.5, 0.5], [0, 0]);
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
                changePosition: function(msg)
                {
                    this.visible = true;
                }
            }
        },//end of add by sking
        noPutTips:{ //add by  sking for put card button
            _run: function () {
                this.visible = false;
                setWgtLayout(this,[0.36, 0.36], [0.5, 0.1], [0, 0]);
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
        },//end of add by sking
        down: {
            head: {
                tuoguan: {
                    _run:function () {
                        this.visible = false;
                    },
                    _event:{
                        beTrust:function (msg) {
                            if(getUIPlayer(0)&&getUIPlayer(0)&&getUIPlayer(0).info.uid == msg.uid){
                                this.visible = true;
                            }
                        },
                        cancelTrust:function (msg) {
                            if(getUIPlayer(0)&&getUIPlayer(0)&&getUIPlayer(0).info.uid == msg.uid){
                                this.visible = false;
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
                            showUserZhuangLogo_card(this, 0);
                        },
                        initSceneData: function() {
                            if (IsArrowVisible()) showUserZhuangLogo_card(this, 0);
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
            },
            play_tips: {
                _layout: [[0.08, 0.14], [0.5, 0.25], [0, 0.5]],
                _run: function () {
                    this.zIndex = actionZindex;
                },
                _visible:false,
            },
            ready: {
                _layout: [
                    [0.07, 0.07],
                    [0.5, 0.5],
                    [0, -1.5]
                ],
                _run: function() {
                    GetReadyVisible(this, 0);
                    //this.visible = true;
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

                        cc.log("============online player=======1063======");
                        GetReadyVisible(this, 0);
                    }
                }
            },
            stand: {
                _layout: [
                    [0.057, 0],
                    [0.5, 0],
                    [-7.8, 0.7]
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
                    if(MjClient.rePlayVideo == -1)// 表示正常游戏
                    {
                        setWgtLayout(this,[0.1, 0.15],[0.6, 0],[-1.8, 2]);
                    }
                    else
                    {
                        setWgtLayout(this,[0.1, 0.15],[0.6, 0],[-1.8, 2]);
                    }
                },
                _visible: false
            },
            noPutTag: {
                _run:function()
                {
                    if(MjClient.rePlayVideo == -1)// 表示正常游戏
                    {
                        setWgtLayout(this,[0.12, 0.12],[0.5, 0.15],[0, 1]);
                    }
                    else
                    {
                        setWgtLayout(this,[0.12, 0.12],[0.5, 0.15],[0, 1]);
                    }
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
            _event: {
                clearCardUI: function() {
                    clearCardUI_card(this, 0);
                },
                initSceneData: function(eD) {
                    SetUserVisible_tuantuanzhuan(this, 0);
                    reConnectShowDeskCard();
                },
                addPlayer: function(eD) {
                    SetUserVisible_tuantuanzhuan(this, 0);
                },
                removePlayer: function(eD) {
                    SetUserVisible_tuantuanzhuan(this, 0);
                },
                mjhand: function(eD) {
                    InitUserHandUI_tuantuanzhuan(this, 0);
                },
                roundEnd: function() {
                    InitUserCoinAndName(this, 0);
                    //setTaiInfo("");
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
                    DealMJPut_card(this,eD,0);
                    // var pl = getUIPlayer(0);
                    // cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PKPut---------------" + pl.isTing);
                    // if (eD.uid == SelfUid() && pl.isTing)
                    // {
                    //     var _tingCards = this.getChildByName("tingCardsNode");
                    //     var tingSet = calTingSet(pl.mjhand, MjClient.data.sData.tData.hunCard);
                    //     setTingCards(_tingCards,tingSet);
                    // }
                    setUserOffline(this, 0);
                },
                waitPut:function(eD){
                    cc.log(">>>>>>>>>>>>>>>>down>>>>>>>>>>>>>>>waitPut");
                    UpdataCurrentPutCard();
                    DealWaitPut_card(this, eD,0);
                },
                onlinePlayer: function(eD) {
                    setUserOffline(this, 0);
                },
                playerStatusChange: function(eD) {
                    setUserOffline(this, 0);
                }
            }
        },
        right: {

            head: {
                tuoguan: {
                    _run:function () {
                        this.visible = false;
                    },
                    _event:{
                        beTrust:function (msg) {
                            if(getUIPlayer(1)&&getUIPlayer(1)&&getUIPlayer(1).info.uid == msg.uid){
                                this.visible = true;
                            }
                        },
                        cancelTrust:function (msg) {
                            if(getUIPlayer(1)&&getUIPlayer(1)&&getUIPlayer(1).info.uid == msg.uid){
                                this.visible = false;
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
                            showUserZhuangLogo_card(this, 1);
                        },
                        initSceneData: function() {
                            if (IsArrowVisible()) showUserZhuangLogo_card(this, 1);
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
                tingCard:{
                    _event:{
                        initSceneData: function(eD)
                        {
                            var pl = getUIPlayer(1);
                            if(pl && pl.handCount)
                            {
                                this.visible = true;
                            }
                            else
                            {
                                this.visible = false;
                            }

                        },
                        clearCardUI:function()
                        {
                            this.visible = false;
                        },
                        changePosition:function()
                        {
                            this.visible = true;
                        }
                    }
                },

            },
            play_tips: {
                _layout: [[0.08, 0.14], [0.75, 0.5], [0, 0.5]],
                _run: function () {
                    this.zIndex = actionZindex;
                },
                _visible:false,
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
                    [0.13, 0.13],
                    [1, 1],
                    [-2.5, -0.5]
                ],
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
                    {
                        setWgtLayout(this,[0.1, 0.15],[1, 0.55],[-3, 0]);
                    }
                    else
                    {
                        //cc.log("=====right --- layout desk---");
                        setWgtLayout(this,[0.1, 0.15],[1, 0.55],[-3.7, 0]);
                    }
                },
                _visible: false
            },
            noPutTag: {
                _run:function()
                {
                    if(MjClient.rePlayVideo == -1)// 表示正常游戏
                    {
                        //setWgtLayout(this,[0.12, 0.12],[0.5, 0.15],[0, 1]);
                        setWgtLayout(this,[0.12, 0.12],[0.8, 0.55],[0, 0]);
                    }
                    else
                    {
                        //cc.log("=====right --- layout desk---");
                        setWgtLayout(this,[0.12, 0.12],[0.7, 0.55],[0, 0]);
                    }
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
            _event: {
                clearCardUI: function() {
                    clearCardUI_card(this, 1);
                },
                initSceneData: function(eD) {
                    SetUserVisible_tuantuanzhuan(this, 1);
                },
                addPlayer: function(eD) {
                    SetUserVisible_tuantuanzhuan(this, 1);
                },
                removePlayer: function(eD) {
                    SetUserVisible_tuantuanzhuan(this, 1);
                },
                mjhand: function(eD) {
                    InitUserHandUI_tuantuanzhuan(this, 1);
                },
                roundEnd: function() {
                    InitUserCoinAndName(this, 1);
                },
                waitPut: function(eD) {
                    DealWaitPut_card(this, eD, 1);
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
                }
            }
        },
        top: {
            head: {
                tuoguan: {
                    _run:function () {
                        this.visible = false;
                    },
                    _event:{
                        beTrust:function (msg) {
                            if(getUIPlayer(2)&&getUIPlayer(2)&&getUIPlayer(2).info.uid == msg.uid){
                                this.visible = true;
                            }
                        },
                        cancelTrust:function (msg) {
                            if(getUIPlayer(2)&&getUIPlayer(2)&&getUIPlayer(2).info.uid == msg.uid){
                                this.visible = false;
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
                            showUserZhuangLogo_card(this, 2);
                        },
                        initSceneData: function() {
                            if (IsArrowVisible()) showUserZhuangLogo_card(this, 2);
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
                tingCard:{
                    _event:{
                        initSceneData: function(eD)
                        {
                            var pl = getUIPlayer(2);
                            if(pl && pl.handCount)
                            {
                                this.visible = true;
                            }
                            else
                            {
                                this.visible = false;
                            }

                        },
                        clearCardUI:function()
                        {
                            this.visible = false;
                        },
                        changePosition:function()
                        {
                            this.visible = true;
                        }
                    }
                },
            },
            play_tips: {
                _layout: [[0.08, 0.14], [0.5, 0.75], [0, 0]],
                _run: function () {
                    this.zIndex = actionZindex;
                },
                _visible:false,
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
                    [0.1, 0.15],
                    [0.3, 1],
                    [0, -1.2]
                ],
                _visible: false
            },
            deskCard: {
                // _layout: [
                //     [0.12, 0.15],
                //     [0.5, 0.72],
                //     [-0.1, 0]
                // ],
                _run:function()
                {
                    if(MjClient.rePlayVideo == -1)// 表示正常游戏
                    {
                        setWgtLayout(this,[0.12, 0.15],[0.5, 0.72],[-0.1, 0]);
                    }
                    else
                    {
                        setWgtLayout(this,[0.1, 0.15],[0.5, 0.67],[-0.1, 0]);
                    }
                },
                _visible: false
            },
            noPutTag: {
                _run:function()
                {
                    if(MjClient.rePlayVideo == -1)// 表示正常游戏
                    {
                        setWgtLayout(this,[0.12, 0.12],[0.5, 0.8],[-0.1, 0]);
                    }
                    else
                    {
                        setWgtLayout(this,[0.12, 0.12],[0.5, 0.7],[-0.1, -0.5]);
                    }
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
            _event: {
                clearCardUI: function() {
                    clearCardUI_card(this, 2);
                },
                initSceneData: function(eD) {
                    SetUserVisible_tuantuanzhuan(this, 2);
                },
                addPlayer: function(eD) {
                    SetUserVisible_tuantuanzhuan(this, 2);
                },
                removePlayer: function(eD) {
                    SetUserVisible_tuantuanzhuan(this, 2);
                },
                mjhand: function(eD) {
                    InitUserHandUI_tuantuanzhuan(this, 2);
                },
                roundEnd: function() {
                    InitUserCoinAndName(this, 2);
                },
                waitPut: function(eD) {
                    DealWaitPut_card(this, eD, 2);
                },
                PKPut: function(eD) {
                    DealMJPut_card(this, eD, 2);
                    if(eD.uid != SelfUid())
                    {
                    }
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
                }
            }
        },
        left: {
            head: {
                tuoguan: {
                    _run:function () {
                        this.visible = false;
                    },
                    _event:{
                        beTrust:function (msg) {
                            if(getUIPlayer(3)&&getUIPlayer(3)&&getUIPlayer(3).info.uid == msg.uid){
                                this.visible = true;
                            }
                        },
                        cancelTrust:function (msg) {
                            if(getUIPlayer(3)&&getUIPlayer(3)&&getUIPlayer(3).info.uid == msg.uid){
                                this.visible = false;
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
                            showUserZhuangLogo_card(this, 3);
                        },
                        initSceneData: function() {
                            if (IsArrowVisible()) showUserZhuangLogo_card(this, 3);
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
                tingCard:{
                    _event:{
                        initSceneData: function(eD)
                        {
                            var pl = getUIPlayer(3);
                            if(pl && pl.handCount)
                            {
                                this.visible = true;
                            }
                            else
                            {
                                this.visible = false;
                            }

                        },
                        clearCardUI:function()
                        {
                            this.visible = false;
                        },
                        changePosition:function()
                        {
                            this.visible = true;
                        }
                    }
                },
            },
            play_tips: {
                _layout: [[0.08, 0.14], [0.25, 0.5], [0, 0.5]],
                _run: function () {
                    this.zIndex = actionZindex;
                },
                _visible:false,
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
            stand: {
                _layout: [
                    [0.13, 0.13],
                    [0, 1],
                    [2.5, -0.5]
                ],
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
                    if(MjClient.rePlayVideo == -1)// 表示正常游戏
                    {
                        setWgtLayout(this,[0.12, 0.15],[0.16, 0.55],[0, 0.1]);
                    }
                    else
                    {
                        setWgtLayout(this,[0.1, 0.15],[0.16, 0.55],[1, 0]);
                    }
                },
                _visible: false,
            },
            noPutTag: {
                _run:function()
                {
                    if(MjClient.rePlayVideo == -1)// 表示正常游戏
                    {
                        setWgtLayout(this,[0.12, 0.12],[0.12, 0.55],[0.6, 0.1]);
                    }
                    else
                    {
                        setWgtLayout(this,[0.12, 0.12],[0.22, 0.55],[0.6, 0.1]);
                    }
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
            _event: {
                clearCardUI: function() {
                    clearCardUI_card(this, 3);
                },
                initSceneData: function(eD) {
                    SetUserVisible_tuantuanzhuan(this, 3);
                },
                addPlayer: function(eD) {
                    SetUserVisible_tuantuanzhuan(this, 3);
                },
                removePlayer: function(eD) {
                    SetUserVisible_tuantuanzhuan(this, 3);
                },
                mjhand: function(eD) {
                    InitUserHandUI_tuantuanzhuan(this, 3);
                },
                roundEnd: function() {
                    InitUserCoinAndName(this, 3);
                },
                waitPut: function(eD) {
                    DealWaitPut_card(this, eD, 3);
                },
                PKPut: function(eD) {
                    DealMJPut_card(this, eD, 3);
                    setUserOffline(this, 3);
                },
                onlinePlayer: function(eD) {
                    setUserOffline(this, 3);
                },
                playerStatusChange: function(eD) {
                    setUserOffline(this, 3);
                }
            },
        },
        chat_btn: {
            _layout: [
                [0.09, 0.09],
                [0.95, 0.1],
                [0, 3.8]
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
                [0, 4.2]
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
        btn_rank: {
            _layout: [
                [0.1, 0.1],
                [0.95, 0],
                [0, 3]
            ],
            _run: function() {
                this.opacity = 255;
                this.visible = true;
                this.loadTextureNormal("playing/cardTable/putongpaixu.png");
                MjClient.playui.nextSortType = MjClient.sortType.count;
                this.ignoreContentAdaptWithSize(true);
            },
            _touch: function(btn, eT) {
                if (eT == 2) {
                    //排序方式
                    MjClient.playui.sortType = MjClient.playui.nextSortType;
                    this.ignoreContentAdaptWithSize(true);
                    switch (MjClient.playui.sortType)
                    {
                        case MjClient.sortType.normal:
                            this.loadTextureNormal("playing/cardTable/putongpaixu.png");
                            MjClient.playui.nextSortType = MjClient.sortType.count;
                            break;
                        case MjClient.sortType.count:
                            this.loadTextureNormal("playing/cardTable/zhangshu.png");
                            MjClient.playui.nextSortType = MjClient.sortType.flower;
                            break;
                        case MjClient.sortType.flower:
                            this.loadTextureNormal("playing/cardTable/huase.png");
                            MjClient.playui.nextSortType = MjClient.sortType.normal;
                            break;
                    }

                    //点击排序要清除数组
                    MjClient.selectCards_card = [];
                    MjClient.cardIdx = 0;
                    MjClient.playui.CardLayoutRestore(MjClient.playui._downNode, 0);
                    UpdataCurrentPutCard();
                }
            }
        },
        bg_sort: {
            _layout: [
                [0.5, 0.5],
                [0.5, 0],
                [0, 0]
            ],
            _run: function() {
                if(MjClient.rePlayVideo != -1)// 表示回放
                {
                    this.visible = false;
                    this.setTouchEnabled(false);
                }
                else
                {
                    this.visible = true;
                    this.setTouchEnabled(true);
                }
            },
        },
        btn_sortClass: {
            _layout: [
                [0.14, 0.14],
                [0.78, 0.92],
                [0, 0]
            ],
            _run: function() {

                if(MjClient.rePlayVideo != -1)// 表示回放
                {
                    this.visible = false;
                    this.setTouchEnabled(false);
                }
                else
                {
                    this.visible = true;
                    this.setTouchEnabled(true);
                }

                MjClient.playui._btn_rank.ignoreContentAdaptWithSize(true);

                if(MjClient.sortClassType == 0)
                {
                    MjClient.nextSortClassType = 1;
                    this.loadTextureNormal("playing/cardTable/hengxiang.png");
                    MjClient.playui._btn_rank.visible = true;
                    MjClient.playui._btn_rank.setTouchEnabled(true);
                }
                else
                {
                    MjClient.nextSortClassType = 0;
                    MjClient.playui._btn_rank.visible = false;
                    MjClient.playui._btn_rank.setTouchEnabled(false);
                    this.loadTextureNormal("playing/cardTable/zongxiang.png");
                }

                //点击排序要清除数组
                clearSortData();
                MjClient.playui.CardLayoutRestore(MjClient.playui._downNode, 0);
                UpdataCurrentPutCard();
            },
            _touch: function(btn, eT) {
                if (eT == 2) {
                    //排序方式
                    MjClient.playui._btn_rank.ignoreContentAdaptWithSize(true);
                    if(MjClient.nextSortClassType == 0 )
                    {
                        MjClient.sortClassType = 0;
                        MjClient.nextSortClassType = 1;
                        this.loadTextureNormal("playing/cardTable/hengxiang.png");
                        MjClient.playui._btn_rank.visible = true;
                        MjClient.playui._btn_rank.setTouchEnabled(true);

                    }
                    else
                    {
                        MjClient.sortClassType = 1;
                        MjClient.nextSortClassType = 0;
                        MjClient.playui._btn_rank.visible = false;
                        MjClient.playui._btn_rank.setTouchEnabled(false);
                        this.loadTextureNormal("playing/cardTable/zongxiang.png");
                    }
                    //点击排序要清除数组
                    clearSortData();
                    util.localStorageEncrypt.setNumberItem(MjClient.sortClassKey,MjClient.sortClassType);
                    MjClient.playui.CardLayoutRestore(MjClient.playui._downNode, 0);
                    UpdataCurrentPutCard();
                }
            }
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
                initSceneData:function (msg) {
                    var pl = getUIPlayer(0);
                    if(pl.trust){
                        this.visible = true;
                    }else {
                        this.visible = false;
                    }
                },
            }
        }
    },
    _downNode:null,
    _rightNode:null,
    _topNode:null,
    _leftNode:null,
    _btn_rank:null,
    ctor: function() {
        this._super();
        var playui = ccs.load(res.Play_tuantuanzhuan_json);
        playMusic("guandan/bgFight_guandan");
        this._downNode  = playui.node.getChildByName("down");
        this._rightNode = playui.node.getChildByName("right");
        this._topNode   = playui.node.getChildByName("top");
        this._leftNode  = playui.node.getChildByName("left");
        this._tingCardsNode = this._downNode.getChildByName("tingCardsNode");
        this._tingCardNumNode = this._downNode.getChildByName("tingCardNumNode");

        this._positionCard = playui.node.getChildByName("positionCard");
        this._btnPutCard   = playui.node.getChildByName("BtnPutCard");
        this._btnHimt      = playui.node.getChildByName("BtnHimt");
        this._btnNoPut     = playui.node.getChildByName("BtnNoPut");
        this._btnNoPut     = playui.node.getChildByName("BtnNoPut");
        this._noPutTips    = playui.node.getChildByName("noPutTips");
        this._btn_rank     = playui.node.getChildByName("btn_rank");
        this._bg_sort    = playui.node.getChildByName("bg_sort");
        MjClient.playui = this;
        MjClient.playui._AniNode =  playui.node.getChildByName("eat");
        this.sortType     = MjClient.sortType.normal;
        this.nextSortType = MjClient.sortType.count;



        MjClient.sortClassType = util.localStorageEncrypt.getNumberItem(MjClient.sortClassKey,MjClient.sortClassType);

        if(MjClient.rePlayVideo != -1)// 表示回放
        {
            MjClient.sortClassType = 0;
            MjClient.playui.sortType = MjClient.sortType.normal;
        }



        BindUiAndLogic(playui.node, this.jsBind);
        this.addChild(playui.node);

        //this._back  = playui.node.getChildByName("back");

        //触摸事件监听注册
        cc.eventManager.addListener(cc.EventListener.create(getTouchListener_card()),this._rightNode);

        // //添加滚动通知 by sking
        // var _laba_bg =  playui.node.getChildByName("banner").getChildByName("laba_bg");
        // _laba_bg.visible = false;
        // var _scroll =  playui.node.getChildByName("banner").getChildByName("scroll");
        // _scroll.visible = false;

        MjClient.playui._jiazhuWait = playui.node.getChildByName("jiazhuWait");

        MjClient.lastMJTick = Date.now();
        this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function() {
            if (MjClient.game_on_show) MjClient.tickGame(0);
        }), cc.delayTime(7))));

        if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXJSMJ)
        {
            MJ_setWaitBtn();
        }
        else {
            // 俱乐部返回大厅功能：by_jcw
            addClub_BackHallBtn();
        }

        MJ_setReadyBtn(PKPassConfirmToServer_card);
        // 在亲友圈房间中添加邀请亲友圈牌有一起对局
        addClubYaoqingBtn();


        return true;
    },
    onEnterTransitionDidFinish : function()
    {
        //this.setTouchEnabled(true);
        //cc.log("-----------init touch ---- ")
        this._super();
    },

});

PlayLayer_tuantuanzhuan.prototype.CardLayoutRestore = function(node, off)
{
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

PlayLayer_tuantuanzhuan.prototype.CardLayoutDesk = function(node,cards,off)
{
    //if(off != 0) return;
    var children = node.children;
    var initDesk_y = node.getChildByName("deskCard").y;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "out")
        {
            ci.y = initDesk_y;
            var cardType = ci.getChildByName("cardType");
            if(cardType) {
                var _smallFlower = cardType.getChildByName("smallFlower");
                if(_smallFlower) {
                    _smallFlower.setPosition(22,35)
                }
            }
        }
    }

    //排序麻将的位置 by sking
    if (off == 0 && cards.length > 0)
    {
        cards.sort(function(a, b)
        {
            return a - b;
        });
    }

    //up stand 是2种麻将的图。
    var outStand = node.getChildByName("deskCard");
    outStand.visible = false;
    var start, offui;
    start = outStand;
    var upSize = start.getSize();
    var upS = start.scale;
    var uistand = [];
    var uiOut = [];
    var uihun = [];//癞子牌在最左边

    for(var i = 0; i < children.length; i++) //children 为 "down" 节点下的字节点
    {
        var ci = children[i];
        if(ci.name == "out")
        {
            //cc.log("CardLayoutDesk out = "+ ci.name);
            if(MjClient.data.sData.tData.hunCard == ci.tag)
            {
                uihun.push(ci);
            }
            else
            {
                uiOut.push(ci);
            }
        }
    }

    uiOut.sort(TagOrder);

    if(uihun.length > 0) //是否有柰子，有则放在最前面 by sking
    {
        for(var i = 0; i < uihun.length; i++)
        {
            uiOut.unshift(uihun[i]); //向数组开头添加一个元素 unshift
        }
    }


    var uiOrder = [uiOut, uistand];

    var orders = []; //重新排序后装到数组里 by sking
    for(var j = 0; j < uiOrder.length; j++)
    {
        var uis = uiOrder[j];
        for(var i = 0; i < uis.length; i++)
        {
            orders.push(uis[i]);
        }
    }

    //设置麻将大小
    for(var i = 0; i < orders.length; i++)
    {
        var ci = orders[i];
        //if(off == 0)//自己或者对家
        {
            if(i != 0)
            {
                if(ci.name == "out")
                {
                    ci.x = orders[i - 1].x + upSize.width * upS *0.4;//调牌的距离的，todo...
                }
            }
            else
            {
                ci.x = start.x + upSize.width * upS * 0.1;
                switch (off)
                {
                    case 0:
                        ci.x = start.x + upSize.width * upS * 0.1 - ((orders.length - 1)*upSize.width * upS*1.4)/6;
                        break;
                    case 1:
                        ci.x = start.x - upSize.width * upS * 0.4*(orders.length - 1);// - (orders.length - 1)*upSize.width * upS *0.6;
                        break;
                    case 2:
                        ci.x = start.x + upSize.width * upS * 0.1 - ((orders.length - 1)*upSize.width * upS*1.2)/6;
                        break;
                    case 3:
                        ci.x = start.x;
                        break;
                }
            }
            ci.zIndex = i;
        }
    }
    MjClient.initDesk_y = "undefined";
};

//横向摆放《正常》
PlayLayer_tuantuanzhuan.prototype.horSort = function(node, off)
{
    var pl; //player 信息
    pl = getUIPlayer(off);//获取玩家信息.off 为0 ，就是自己得信息，能看到自己摸牌 by sking

    if(MjClient.rePlayVideo != -1)// 表示回放
    {
        MjClient.sortClassType = 0;
        MjClient.playui.sortType = MjClient.sortType.normal;
    }

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
            //ci.y = MjClient.init_y;
            var cardType = ci.getChildByName("cardType");
            if(cardType) {
                var _smallFlower = cardType.getChildByName("smallFlower");
                if(_smallFlower) {
                    _smallFlower.setPosition(22,35)
                }
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
            ci.setColor(cc.color(255,255,255));
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
    // var pro_rankType = 1;
    // if(off == 0)
    // {
    //     pro_rankType = MjClient.playui.sortType;
    // }

    var pro_rankType = MjClient.playui.sortType;

    if(!pl.mjhand || cc.isUndefined(pl.mjhand))
    {
        return;
    }


    //排除理牌的牌
    var mjhandCopy = pl.mjhand.concat();
    var copyuistand = uistand.concat();
    for(var i = 0;i< MjClient.colloctionCardsUIArray.length;i++) {
        var colloctionUI = []; //重新排序后
        cc.log("--重新排序后--");
        var _colloctionUICards = MjClient.colloctionCardsUIArray[i].concat();
        for(var j = 0;j < _colloctionUICards.length;j++) {
            for (var k = 0; k < copyuistand.length; k++) {
                if (copyuistand[k].tag == _colloctionUICards[j].tag &&
                    copyuistand[k].getUserData() == _colloctionUICards[j].getUserData() ){//这里保存的有可能是我当前选中的牌，这里应该排除我当前选的牌
                    if(!checkUINodeHave(uisort,copyuistand[k]))
                    {
                        colloctionUI.push(copyuistand[k]);//有可能第二次装的数组还是，前一个值，ui节点是同一个。
                        break;
                    }
                }
            }
        }
        uisort[i] = colloctionUI;//保存理牌数组
        mjhandCopy = getExcludeCards(mjhandCopy,MjClient.colloctionCardsArray[i]);
    }


    //理牌的牌，装进数组 mySortui
    var mySortui = [];
    for(var j = 0; j < uisort.length; j++)
    {
        var uiss = uisort[j];
        for(var i = 0; i < uiss.length; i++)
        {
            uiss[i].zIndex = 0;
            cc.log("理牌的牌 = " + uiss[i].tag);
            uiss[i].setColor(cc.color(190,190,190));
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
    for(var i = 0; i < orders.length; i++)
    {
        var ci = orders[i];
        if(off == 0 || off == 2)//自己或者对家
        {
            if(i != 0)
            {
                if(ci.name == orders[i - 1].name)
                {
                    if(ci.name == "mjhand")
                    {
                        if(off == 0)
                        {
                            ci.x = orders[i - 1].x + upSize.width * upS *0.6 + (27 -orders.length)*0.4;//调牌的距离的，todo...
                        }
                        else//这个地方不是对家的手牌，下面的代码好像没用
                        {
                            ci.x = orders[i - 1].x + upSize.width * upS * 1.8;
                        }
                    }
                    else if(ci.name == "mjhand_replay")
                    {
                        ci.x = orders[i - 1].x + upSize.width * upS *0.3 + (27 -orders.length)*0.2;//调牌的距离的，todo...
                    }
                }
                else
                {
                    ci.x = orders[i - 1].x + upSize.width * upS * 1.3;
                }
            }
            else
            {
                //ci.setColor(cc.color(255,0,255));
                if(ci.name == "mjhand")
                {
                    ci.x = start.x + upSize.width * upS * 0.1 + ((27 -orders.length)*upSize.width * upS * 0.8)/3;
                }
                else if(ci.name == "mjhand_replay")
                {
                    ci.x = start.x + upSize.width * upS * 0.1 + ((27 -orders.length)*upSize.width * upS * 0.4)/3;
                }
            }
            ci.zIndex = i;
        }
        else //左右两侧的
        {
            //if(ci.name == orders[i - 1].name)
            {
                if (ci.name == "mjhand_replay") {
                    if (i != 0) {
                        ci.y = orders[i - 1].y - upSize.width * upS * 0.3 - (27 - orders.length) * 0.3;//调牌的距离的，todo...
                    }
                    else {
                        ci.y = start.y - upSize.width * upS * 0.2 - ((27 - orders.length) * upSize.width * upS * 0.3) / 3;
                    }

                    ci.zIndex = i;
                }
            }
        }
    }
}

//纵向摆放
PlayLayer_tuantuanzhuan.prototype.verSort = function(node, off)
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
            var cardType = ci.getChildByName("cardType");
            if(cardType) {
                var _smallFlower = cardType.getChildByName("smallFlower");
                if(_smallFlower) {
                    _smallFlower.setPosition(65,80)
                }
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
                if ( cc.sys.isObjectValid(copyuistand[k]) && cc.sys.isObjectValid(_colloctionUICards[j]) &&
                    copyuistand[k].tag == _colloctionUICards[j].tag &&
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
