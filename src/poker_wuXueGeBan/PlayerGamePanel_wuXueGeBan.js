var actionZindex = 1000;

var GameOverLayer_wuXueGeBan =  GameOverLayer_Poker.extend({
    ctor: function() {
        this._super();
    },
    
});

// off 是四个位置，根据off 显示四个位置的信息 by sking
function SetUserVisible_WuXueGeBan(node, off)
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
        InitUserHandUI_WuXueGeBan(node, off);
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
}

function InitUserHandUI_WuXueGeBan(node, off, needSort)
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

    initSortUI();

    if(
        tData.tState != TableState.waitJiazhu &&
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

    MjClient.playui.CardLayoutRestore(node, off, needSort);
}

var PlayLayer_WuXueGeBan = cc.Layer.extend({
    _btnPutCard:null,
    jsBind: {
        _run: function() {
            if (MjClient.playui._spriteSingle) {
                setWgtLayout(MjClient.playui._spriteSingle, [MjClient.playui._spriteSingle.width / 1280, MjClient.playui._spriteSingle.height / 720], [0.4, 0.18], [0, 0]);
            }
        },
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
                MjClient.playui.resetJiaZhuNum(this);
                if (tData.roundNum != tData.roundAll) return;
                var pls = sData.players;
                var ip2pl = {};
                for (var uid in pls) {
                    var pi = pls[uid];
                    pi.geState = -1;
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
            // changePosition: function(msg) {
            //     /*
            //        换位置
            //   */
            //     var currentSelectCard = msg.selectedCard;
            //     var change_uids  = msg.uids;
            //     var sData = MjClient.data.sData;
            //     var tData = sData.tData;
            //     var current_uids = tData.uids;

            //     cc.log("changePosition change_uids = " + JSON.stringify(change_uids));
            //     cc.log("changePosition current_uids = " + JSON.stringify(current_uids));


            //     //初始化手牌张数
            //     if (msg.handCounts) {
            //         var sData = MjClient.data.sData;
            //         for (var uid in msg.handCounts) {
            //             var pl = sData.players[uid];
            //             pl.handCount = msg.handCounts[uid];
            //             //cc.log("初始化手牌张数 .handCount =" + pl.handCount);
            //         }
            //     }

            //     for(var i = 0;i < MjClient.MaxPlayerNum;i++)
            //     {
            //         currentLeftCardCount_paodekuai(i);
            //     }

            //     //回放的时候
            //     if(MjClient.rePlayVideo != -1)
            //     {
            //         tData.uids = msg.uids;//要更新uid位置
            //         resetPlayerHead();
            //         MjClient.playui._positionCard.visible = false;
            //     }
            //     else
            //     {
            //         //牌的翻的效果,正常打牌
            //         cardRollAction(currentSelectCard,function(){

            //             var _toNodePos = [];
            //             for(var i = 0;i < change_uids.length; i++)
            //             {
            //                 var _toNode   = getNode_cards(i).getChildByName("head");
            //                 _toNodePos.push(_toNode.getPosition());
            //             }

            //             for(var i = 0;i < change_uids.length; i++)
            //             {

            //                 var change_UIoff = card_getUiOffByUid(change_uids[i],change_uids);

            //                 var current_UIoff = card_getUiOffByUid(change_uids[i],current_uids);

            //                 if(change_UIoff != current_UIoff)
            //                 {
            //                     changePositionByUIoff(current_UIoff, _toNodePos[change_UIoff]);
            //                 }
            //             }
            //             tData.uids = msg.uids;//要更新uid位置
            //             MjClient.playui.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
            //                 resetPlayerHead();
            //             })));
            //         });
            //     }
            // },
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
                if (msg.showEnd) this.addChild(new GameOverLayer_wuXueGeBan(),500);
                else
                    MjClient.Scene.addChild(new StopRoomView());
                //选择飘分时候解散房间，清除飘分选择页面
                var layer = MjClient.playui.getChildByName("JiaZhu");
                if (layer) { layer.removeFromParent();}
            },
            roundEnd: function() {
                MjClient.selectTipCardsArray = null;

                if (MjClient.rePlayVideo == -1 && MjClient.playui.isShowHandCardBeiMain) {
                    MjClient.playui.isShowHandCardBeiMain = false;
                    MjClient.playui.hideHandCardBeiMian();
                }
                
                if( MjClient.rePlayVideo != -1){ //回访
                    for(var i = 0; i < 3; i++ ){
                        if(MjClient.playui.isShowBeiMainList[i]){
                            MjClient.playui.isShowBeiMainList[i] = false;
                            MjClient.playui.hideHandCardBeiMian(i);
                        }
                    }
                }

                var self = this;
                function delayExe()
                {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    
                    //resetEatActionAnim();
                    
                    if (sData.tData.roundNum <= 0) {
                        if(!tData.matchId) {
                            self.addChild(new GameOverLayer_wuXueGeBan(), 500);
                        }else {
                            self.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                                self.addChild(new GameOverLayer_wuXueGeBan(),500);
                            })))
                        }
                    }
                    self.addChild(new EndOneView_WuXueGeBan(),500);

                    tData.geState = -1;
                    MjClient.playui.reSetData(null, null);
                }

                // 普通场需要展示其他玩家剩余手牌
                if (MjClient.rePlayVideo == -1) {
                    this.runAction(cc.sequence(cc.DelayTime(0.6), cc.callFunc(function(){
                        for (var off = 0; off <= 2; off++) {
                            MjClient.playui.showAllHandCardsLayer(off);
                        }
                    })));
                }

                var time =  1;//
                this.runAction(cc.sequence(cc.DelayTime(time),cc.callFunc(delayExe)));

                // if(MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ)
                // {
                //     MjClient.playui.reConectHeadLayout_paodekuaiTY(this);
                // }
            },
            moveHead: function() {
                postEvent("returnPlayerLayer");
                MjClient.playui._jiazhuWait.visible = false;

                
                tableStartHeadMoveAction_card(this);
                
                // MjClient.playui.reConectHeadLayout_paodekuaiTY(this);
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
                

                //初始化桌子的客户端数据
                MjClient.playui.InitC_Data();

                reConectHeadLayout_card(this);
                
                // MjClient.playui.showJiaZhu_PaodekuaiTY()
                MjClient.playui.resetJiaZhuNum(this);
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
                // if (IsTurnToMe()) {
                //     // 如果提示只有一手牌， 自动提起
                //     // 如果提示只有一手牌， 且是我全部的手牌数量， 自动打出
                //     AutoPutLastCard_card_ty();
                // }
                //重新加载下操作按钮资源
                //MjClient.playui.reLoadOptBtnRes();

                MjClient.playui.dealDiCards(null, null, 3, true, true, null);
            },
            onlinePlayer: function() {
                //if(msg.uid == SelfUid()){
                    reConectHeadLayout_card(this);
                //}
                //MjClient.playui.reConectHeadLayout_paodekuaiTY(this);
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
            changePKImgEvent: function() {
                changePKImg(this, getCurrentPKImgType());

                var sData = MjClient.data.sData;
                var tData = sData.tData;

                if(tData.tState == TableState.waitReady || tData.tState == TableState.roundFinish){
                    MjClient.playui.reSetData(null, null);
                }
                
            },
            
            clearCardUI: function(eD) {
                if (MjClient.playui._spriteSingle) {
                    MjClient.playui._spriteSingle.visible = false;
                }

                //MjClient.playui.reSetData(null, null);
            },
            PKPut: function(eD) {
                MjClient.clockNode.visible = false;
            },
            PKPass:function(eD)
            {
                MjClient.clockNode.visible = false;
            },
            waitReady: function(){
                reConectHeadLayout_card(this);
            },
            waitPut: function() {
                //重新加载下操作按钮资源
                //MjClient.playui.reLoadOptBtnRes();
            },
            s2cDispatchDiCards:function(eD){
                var sData = MjClient.data.sData;
                var tData = sData.tData;

                MjClient.playui.dealDiCards(eD.uid, eD.part, 3, true, true, eD.gaiPaiUid);
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
        // info:
        // {
        //     _layout: [
        //         [0.16, 0.16],
        //         [0.01, 0.935],
        //         [0, 0]
        //     ]
        // },
        gameName:{
            _run:function()
            {
                this.loadTexture(GameBg[MjClient.gameType]);
                setWgtLayout(this,[0.12, 0.06],[0.5, 0.6],[0, 0]);
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
        jiazhuWait: {
            _visible: false,
            _layout: [
                [0.2, 0.2],
                [0.5, 0.7],
                [0, 0]
            ],
            _event:{ 
                waitGeFan:function(msg)
                {
                    var tData = MjClient.data.sData.tData;
                    var _visi = tData.uids[msg.curPlayer] != SelfUid() &&(msg.geState == 1 ||
                        msg.geState == 2 || msg.geState == 3) ;
                    this.setVisible(_visi);
                },
                waitPut:function(){
                    this.setVisible(false);
                },
                initSceneData: function()
                {
                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer(0);

                    this.visible = !IsTurnToMe() && tData.tState == TableState.waitJiazhu &&
                    (tData.geState == 1 || tData.geState == 2 || (tData.geState == 3 && tData.areaSelectMode.selectCardByPlayer)) 
                    && pl.mjState == TableState.waitJiazhu;
                },
                roundEnd:function(){
                    this.setVisible(false);
                },
            }
        },
        banner: {
            _layout: [
                [0.45, 0.4],
                [0.5, 0.98],
                [0, 0]
            ],
            
            bg_time:{
                 _run:function() {
                    MjClient.playui.BgTime_run(this);
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
                    
                    return true;
                },
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
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
                        this.setString("房间号：" + MjClient.data.sData.tData.tableid);
                    }
                }
            },
            Text_status:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
                _event: {
                    initSceneData: function() {
                        this.ignoreContentAdaptWithSize(true);
                        
                        this.setString(MjClient.playui.setBannerGeFanStatus().str);
                    },
                    waitPut: function(){
                        
                        this.setString(MjClient.playui.setBannerGeFanStatus().str);
                    },
                    clearCardUI: function(){
                        cc.log("----------7777------", MjClient.playui.setBannerGeFanStatus().str)
                        this.setString(MjClient.playui.setBannerGeFanStatus().str);
                    }
                }
            },
            Text_difen:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
                _event: {
                    initSceneData: function() {
                        
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        cc.log("-------------dfdf--------",tData.areaSelectMode)
                        this.setString(tData.areaSelectMode.diFen);
                    }
                }
            },
            Text_mult:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
                _event: {
                    initSceneData: function() {
                        
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        
                        this.setString(MjClient.playui.setBannerGeFanStatus().mult);
                    },
                    waitPut: function(){
                        this.setString(MjClient.playui.setBannerGeFanStatus().mult);
                    },
                    clearCardUI: function(){
                        cc.log("-----------888-----Text_mult---", MjClient.playui.setBannerGeFanStatus().mult)
                        this.setString(MjClient.playui.setBannerGeFanStatus().mult);
                    }
                }
            },
            setting: {
                _click: function() {
                    var settringLayer = new SettingView();
                    settringLayer.setName("PlayLayerClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi", {uid:SelfUid(),gameType:MjClient.gameType});
                },
            },
            changeBg: {
                _click: function() {
                    setCurrentGameBgTypeToNext();
                    postEvent("changeGameBgEvent");
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Pifu",{uid:SelfUid(),gameType:MjClient.gameType});
                },
            },
            gps_btn: {
                _run: function() {
                    this.setVisible(true);
                    
                    var banner = this.parent;
                    var waitNode = MjClient.playui.getChildByName("playUINode").getChildByName("wait");
                    var delroom = waitNode.getChildByName("delroom");
                    var backHomebtn = waitNode.getChildByName("backHomebtn");
                    var distanceX = banner.getChildByName("setting").getPositionX() - banner.getChildByName("changeBg").getPositionX();

                    delroom.setScale(banner.scaleX,banner.scaleY);
                    backHomebtn.setScale(banner.scaleX,banner.scaleY);
                    
                    if(isIPhoneX())
                    {
                        setWgtLayout(delroom, [0.11, 0.11],[0.1, 0.45],[0, 0]);
                        setWgtLayout(backHomebtn, [0.11, 0.11],[0.1, 0.6],[0, 0]);
                    }else{
                        setWgtLayout(delroom, [0.11, 0.11],[0.05, 0.45],[0, 0]);
                        setWgtLayout(backHomebtn, [0.11, 0.11],[0.05, 0.6],[0, 0]);
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
            
            // duty_btn: {
            //     _run: function () {
            //         if (MjClient.isInGoldField())
            //             this.setVisible(true);
            //         else {
            //             this.setVisible(false);
            //             return;
            //         }

            //         ShowDayTaskTips(this);
            //     },
            //     _click: function () {
            //         MjClient.Scene.addChild(new GoldTaskLayer());
            //     },
            //     Image_hongdian:{
            //         _run: function () {
            //             this.visible = MjClient._GoldFuli;
            //         },
            //         _event: {
            //             refresh_mission: function() {
            //                 this.visible = MjClient._GoldFuli;
            //             }
            //         }
            //     }
            // },

            Button_1: {
                _visible : true,
                _click: function() {
                    MjClient.openWeb({url:MjClient.GAME_TYPE.PAO_DE_KUAI,help:true});
                }
            },
            // hunPai:{
            //     baidaBg:{
            //         small:{
            //           _run:function() {
            //               this.runAction(cc.sequence(cc.fadeOut(1), cc.fadeIn(0.5)).repeatForever());
            //           },
            //           _event:{
            //               mjhand:function()
            //               {
            //                   this.visible = true;
            //               }
            //           }
            //         },
            //         _run:function()
            //         {
            //             //baidaBg = this;
            //             this.setVisible(true);
            //         },
            //         _event: {
            //             mjhand:function()
            //             {
            //                 this.visible = true;
            //             },
            //             roundEnd:function (eD) {
            //                 this.visible = false;
            //             }
            //         },
            //     },
            //     baidaImg: {
            //         _run:function()
            //         {
            //             //baidaOject = this;
            //             this.setVisible(false);
            //         },
            //         _event: {
            //             mjhand:function()
            //             {
            //                 this.visible = true;
            //                 this.setScale(1);
            //                 this.setPosition(-296,-280);
            //                 var HuncardMsg = MjClient.data.sData.tData.hunCard;

            //                 var func = cc.callFunc(function(){
            //                     playEffect("hunCardFly");
            //                 })
            //                 setCardSprite(this, parseInt(HuncardMsg), 4);
            //                 this.runAction(cc.sequence(cc.delayTime(1),
            //                     cc.spawn(cc.scaleTo(0.6,0.5),cc.moveTo(0.6,6.6,1.86)).easing(cc.easeQuinticActionOut()),
            //                     func));
            //             },
            //             initSceneData:function()
            //             {
            //                 this.visible = true;
            //                 var HuncardMsg = MjClient.data.sData.tData.hunCard;
            //                 if(HuncardMsg)
            //                 {
            //                     setCardSprite(this, parseInt(HuncardMsg), 4);
            //                 }
            //             },
            //             roundEnd:function (eD) {
            //                 this.visible = false;
            //             }
            //         },
            //     },
            //     baidaText: {
            //         _run:function()
            //         {
            //             //baidaOject = this;
            //             this.setVisible(true);
            //         },
            //         _event: {
            //             mjhand:function(){
            //               this.visible = true;
            //             },
            //             roundEnd:function (eD) {
            //                 this.visible = false;
            //             }
            //         },
            //     },
            //     _event:{
            //         clearCardUI: function(eD) {
            //             this.visible = false;
            //         },
            //         mjhand:function()
            //         {
            //             this.visible = true;
            //         },
            //         initSceneData:function()
            //         {
            //             this.visible = true;
            //             var sData = MjClient.data.sData;
            //             var tData = sData.tData;
            //             //cc.log(" tData.tState  ------------sking = " + tData.tState );
            //             if(tData.tState != TableState.waitPut &&
            //                 tData.tState != TableState.waitEat &&
            //                 tData.tState != TableState.waitCard
            //             )
            //             {
            //                 this.visible = false;
            //             }else{
            //                 this.visible = true;
            //             }
            //         }
            //     }
            // },
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
        BtnReset:{ //add by  sking for put card button
            _run: function () {
                this.visible = false;

                if(isIPhoneX())
                    setWgtLayout(this,[0.15, 0.14], [0.52, 0.46], [0, 0.26]);
                else
                    setWgtLayout(this,[0.15, 0.14], [0.52, 0.39], [0, 0.26]);

                this.srcX = this.x;
            },
            _click: function(btn) {
                postEvent("CloseSelectPutCardsPanel");

                MjClient.selectCards_card = [];
                MjClient.colloctionCurrentSelcetUIArray = [];
                setCardToNormalPos();
                UpdataCurrentPutCard();
            },
            _event:{
                PKPut: function(eD) {
                    this.visible = false;
                },
                waitPut: function() {
                    this.visible = IsTurnToMe() && MjClient.data.sData.tData.tState == TableState.waitPut;
                },
                initSceneData: function()
                {
                    this.visible = IsTurnToMe() && MjClient.data.sData.tData.tState == TableState.waitPut;
                }
            }
        },//end of add by sking
        BtnReady: {
            _visible: false,
            _run: function() {
                setWgtLayout(this,[0.16, 0], [0.5, 0.4], [0, 0]);
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

                this.srcX = this.x;
            },
            _click: function(btn) {
                PKPassConfirmToServer_card({cmd: "PKPass", Opt : 2/*点不出过*/});
                btn.visible = false;
            },
            _event:{
                PKPut: function(eD) {
                    this.visible = false;
                },
                waitPut: function() {
                    var tData = MjClient.data.sData.tData;
                    this.visible = IsTurnToMe() && tData.tState == TableState.waitPut && tData.lastPutPlayer != tData.curPlayer && tData.lastPutPlayer != -1;
                },
                initSceneData: function()
                {
                    var tData = MjClient.data.sData.tData;
                    this.visible = IsTurnToMe() && tData.tState == TableState.waitPut && tData.lastPutPlayer != tData.curPlayer && tData.lastPutPlayer != -1;
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
                PKPut: function(eD) {
                    //cc.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PKPut by sking");
                    this.visible = false;
                },
                waitPut: function() {
                    var tData = MjClient.data.sData.tData;
                    this.visible = IsTurnToMe() && tData.tState == TableState.waitPut;
                },
                initSceneData: function()
                {
                    var tData = MjClient.data.sData.tData;
                    this.visible = IsTurnToMe() && tData.tState == TableState.waitPut;
                }
            }
        },//
        BtnGe:{
            _run: function () {
                this.visible = false;
                if(isIPhoneX())
                        setWgtLayout(this,[0.15, 0.14], [0.52, 0.46], [0.55, 0.26]);
                    else
                        setWgtLayout(this,[0.15, 0.14], [0.52, 0.39], [0.55, 0.26]);
            },
            _click: function(btn) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "c2sGeFan", geState:1});
                btn.visible = false;
                btn.getParent().getChildByName("BtnNoGe").setVisible(false);
                //MjClient.playui._btnNoPut.setTouchEnabled(false);
            },
            _event:{
                PKPut: function(eD) {
                    this.visible = false;
                },
                waitPut: function() {
                    this.visible = false;
                },
                initSceneData: function()
                {
                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer(0);

                    this.visible = IsTurnToMe() && tData.tState == TableState.waitJiazhu &&
                    tData.geState == 1 && pl.mjState == TableState.waitJiazhu;
                },
                waitGeFan: function(msg){
                    var tData = MjClient.data.sData.tData;
                    //var off = getOffByIndex(msg.curPlayer);
                    
                    this.visible = tData.uids[msg.curPlayer] == SelfUid() && msg.geState == 1;
                },
                roundEnd:function(){
                    if(MjClient.rePlayVideo != -1){
                        this.setVisible(false);
                    }
                },
                
            },
        },
        BtnNoGe:{
            _run: function () {
                this.visible = false;
                if(isIPhoneX())
                    setWgtLayout(this,[0.15, 0.14], [0.525, 0.46], [-0.8, 0.26]);
                else
                    setWgtLayout(this,[0.15, 0.14], [0.52, 0.39], [-0.8, 0.26]);
            },
            _click: function(btn) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "c2sGeFan", geState:0});
                btn.visible = false;
                btn.getParent().getChildByName("BtnGe").setVisible(false);
                //MjClient.playui._btnNoPut.setTouchEnabled(false);
            },
            _event:{
                PKPut: function(eD) {
                    this.visible = false;
                },
                waitPut: function() {
                    this.visible = false;
                },
                initSceneData: function()
                {
                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer(0);

                    this.visible = IsTurnToMe() && tData.tState == TableState.waitJiazhu &&
                    tData.geState == 1 && pl.mjState == TableState.waitJiazhu;
                },
                waitGeFan: function(msg){
                    var tData = MjClient.data.sData.tData;
                    this.visible = tData.uids[msg.curPlayer] == SelfUid() && msg.geState == 1;
                },
                roundEnd:function(){
                    if(MjClient.rePlayVideo != -1){
                        this.setVisible(false);
                    }
                },
            },
        },
        BtnFan:{
            _run: function () {
                this.visible = false;
                if(isIPhoneX())
                        setWgtLayout(this,[0.15, 0.14], [0.52, 0.46], [0.55, 0.26]);
                    else
                        setWgtLayout(this,[0.15, 0.14], [0.52, 0.39], [0.55, 0.26]);
            },
            _click: function(btn) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "c2sGeFan", geState:2});
                btn.visible = false;
                btn.getParent().getChildByName("BtnNoFan").setVisible(false);
            },
            _event:{
                PKPut: function(eD) {
                    this.visible = false;
                },
                waitPut: function() {
                    this.visible = false;
                },
                initSceneData: function()
                {
                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer(0);

                    this.visible = IsTurnToMe() && tData.tState == TableState.waitJiazhu &&
                    tData.geState == 2 && pl.mjState == TableState.waitJiazhu;
                },
                waitGeFan: function(msg){
                    var tData = MjClient.data.sData.tData;
                    cc.log("---fanfanfnafnan----xxx---",msg.curPlayer,tData.uids[msg.curPlayer], tData.uids[msg.curPlayer] == SelfUid() && msg.geState == 2)
                    this.visible = tData.uids[msg.curPlayer] == SelfUid() && msg.geState == 2;
                },
            },
        },
        BtnNoFan:{
            _run: function () {
                this.visible = false;
                if(isIPhoneX())
                    setWgtLayout(this,[0.15, 0.14], [0.525, 0.46], [-0.8, 0.26]);
                else
                    setWgtLayout(this,[0.15, 0.14], [0.525, 0.39], [-0.8, 0.26]);
            },
            _click: function(btn) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "c2sGeFan", geState:0});
                btn.visible = false;
                btn.getParent().getChildByName("BtnFan").setVisible(false);
                //MjClient.playui._btnNoPut.setTouchEnabled(false);
            },
            _event:{
                PKPut: function(eD) {
                    this.visible = false;
                },
                waitPut: function() {
                    this.visible = false;
                },
                initSceneData: function()
                {
                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer(0);

                    this.visible = IsTurnToMe() && tData.tState == TableState.waitJiazhu &&
                    tData.geState == 2 && pl.mjState == TableState.waitJiazhu;
                },
                waitGeFan: function(msg){
                    var tData = MjClient.data.sData.tData;
                    cc.log("---fanfanfnafnan--+++-----",msg.curPlayer,tData.uids[msg.curPlayer], tData.uids[msg.curPlayer] == SelfUid() && msg.geState == 2)
                    this.visible = tData.uids[msg.curPlayer] == SelfUid() && msg.geState == 2;
                },
                // s2cGeFan: function(msg){

                // }
            },
        },
        block_selectCard:{
            _layout:[
                [1, 1],
                [0.5, 0.5],
                [0, 0],
                true
            ],
            _run: function() {
                this.getChildByName("Text_1").ignoreContentAdaptWithSize(true);
                this.visible = false;
                this.zIndex = 500;
            },
            btn_selectCard_1:{
                _touch:function (btn, eT) {
                    if (eT == 2) {
                        cc.log("---------btn_selectCard_1-")
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "c2sDispatchDiCards", part:0},function (rtn) {
                            cc.log("---------setVisible-gggggg-")
                            btn.getParent().setVisible(false);
                        });
                    }
                }
            },
            btn_selectCard_2:{
                _touch:function (btn, eT) {
                    if (eT == 2) {
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "c2sDispatchDiCards", part:1},function (rtn) {
                            btn.getParent().setVisible(false);
                        });
                    }
                }
            },
            _event:{
                waitGeFan:function (msg) {
                    var tData = MjClient.data.sData.tData;
                    this.visible = tData.uids[msg.curPlayer] == SelfUid() && msg.geState == 3
                    && tData.areaSelectMode.selectCardByPlayer ;
                },
                
                initSceneData:function (msg) {
                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer(0);

                    this.visible = IsTurnToMe() && tData.tState == TableState.waitJiazhu &&
                    tData.geState == 3 && pl.mjState == TableState.waitJiazhu && tData.areaSelectMode.selectCardByPlayer;
                },
                waitPut:  function(){
                    if(MjClient.rePlayVideo != -1){
                        this.setVisible(false);
                    }
                },
                roundEnd:function(){
                    if(MjClient.rePlayVideo != -1){
                        this.setVisible(false);
                    }
                },
            }
        },

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
                // changePosition: function(msg)
                // {
                //     this.visible = true;
                // }
            }
        },//end of add by sking
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
                    this.visible = false;
                },
                waitPut: function() {
                    this.checkVisible();
                    this.visible = false;
                },
            }
        },
        flyCard:{
            _run: function() {
                this.visible = false;
            },
            _event:{
                waitPut:function(eD){
                    var tData = MjClient.data.sData.tData;
                    if (tData.roundNum == tData.roundAll && tData.lastPutPlayer == -1) {
                        setWgtLayout(this,[0.036, 0], [0.5, 0.75], [0, 0]);
                        //MjClient.playui.shwoFlyCardAnim(this);
                    }
                }
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
                geFanIcon:{
                    _run:function () {
                        this.visible = false;
                    },
                    _event:{
                        clearCardUI: function(){
                            cc.log("---------333xx--------")
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
                head_bottom:{_visible:false},
                name_bottom:{_visible:false},
                icon_bottom:{_visible:false}, 
            },
            play_tips: {
                _layout: [[0.08, 0.14], [0.5, 0.25], [0, 0.5]],
                _run: function () {
                    this.zIndex = actionZindex;
                },
                _visible:false,
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
                    [0.5, 0.03],
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
            geFanState: {
                _run:function()
                {
                    this.setScale(MjClient.size.width/1280);
                    this.setPosition(MjClient.playui._downNode.getChildByName("deskCard").getPosition());
                },
                _event:{
                    s2cGeFan: function(msg){
                        MjClient.playui.setGeBanTagVisi(msg, 0);
                        
                    },

                    initSceneData: function() {
                        MjClient.playui.setGeBanTagVisi(null, 0);
                        
                    },
                    waitPut: function() {
                        this.visible = false;
                    },
                    roundEnd:function(){
                        this.visible = false;
                    },
                    
                },
                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    clearCardUI_card(this, 0);
                },
                initSceneData: function(eD) {
                    SetUserVisible_WuXueGeBan(this, 0);
                    reConnectShowDeskCard();
                    delete MjClient.playui.isFaPai;
                    MjClient.playui.CardLayoutRestore(this, 0);
                },
                addPlayer: function(eD) {
                    SetUserVisible_WuXueGeBan(this, 0);
                },
                removePlayer: function(eD) {
                    SetUserVisible_WuXueGeBan(this, 0);
                },
                mjhand: function(eD) {
                    InitUserHandUI_WuXueGeBan(this, 0);
                    // 先排序 再发牌 上面的这个函数可能不走排序的代码段
                    delete MjClient.playui.isFaPai;
                    MjClient.playui.CardLayoutRestore(this, 0);
                    var tData = MjClient.data.sData.tData;
                    var pl = getUIPlayer(0);

                    if (tData.matchId ||(pl && pl.trust))
                    {
                        // 托管状态下，不播放发牌动画 
                    }
                    else
                    {
                        showPostCardAnimation();
                    } 

                    MjClient.playui.isWaitAniEnd = true;
                },
                roundEnd: function() {
                    InitUserCoinAndName(this, 0);
                    //setTaiInfo("");
                },
                updateInfo:function (d) {
                    if(MjClient.isInGoldField() && d && d.gold){
                        InitUserCoinAndName(this,0);
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
                    DealMJPut_card(this,eD, 0);
                    setUserOffline(this, 0);
                    
                    // 解决异常情况下，手牌结点没有移除
                    correctPKPut(eD, 0);
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
                            //AutoPutLastCard_card_ty();
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
                waitJiazhu: function(msg) {
                    // var tData = MjClient.data.sData.tData;
                    // var layer = new JiaZhu_PaodekuaiTY(tData.areaSelectMode.piaofen,function(){
                    //     //弹窗等待
                    //     MjClient.playui._jiazhuWait.visible = true;
                    // });
                    // layer.setName("JiaZhu");
                    // cc.log("_jiazhuWait===================2222");
                    // MjClient.playui.addChild(layer, 99);
                },
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
                geFanIcon:{
                    _run:function () {
                        this.visible = false;
                    },
                    _event:{
                        clearCardUI: function(){
                            cc.log("---------333xx--------")
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
                    _visible:false,
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
                        // changePosition:function()
                        // {
                        //     this.visible = true;
                        // }
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
                _run: function() {
                    setWgtLayout(this, [this.width / 1280, this.height / 720], [0.5, 0.5], [2, 0]);
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
                _visible: false
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
            geFanState: {
                _run:function()
                {
                    var tData = MjClient.data.sData.tData;
                    var pos = MjClient.playui._rightNode.getChildByName("deskCard").getPosition();
                    if (MjClient.isInGoldField())pos.y -= 20;
                    this.setScale(MjClient.size.width/1280);
                    this.setPosition(pos);
                },
                _event:{
                    s2cGeFan: function(msg){
                        MjClient.playui.setGeBanTagVisi(msg, 1);
                        // var tData = MjClient.data.sData.tData;
                        // var _realImg = "playing/paodekuaiTable_new/buge.png";

                        // if(tData.geState == 1){
                        //     if(msg.geState == 1){
                        //         _realImg = "playing/paodekuaiTable_new/geban.png";
                        //     }
                        // }else if(tData.geState == 2 ){
                        //     _realImg = "playing/paodekuaiTable_new/bufan.png";
                        //     if(msg.geState == 1){
                        //         _realImg = "playing/paodekuaiTable_new/fan.png";
                        //     }
                        // }
                        
                        // this.loadTexture(_realImg);
                        // this.visible = getUIPlayer(1) && (msg.uid == getUIPlayer(1).info.uid) 
                        // && (msg.geState == 1 || msg.geState == 2 || msg.geState == 0);
                    },
                    initSceneData: function() {
                        MjClient.playui.setGeBanTagVisi(null, 1);
                        // var tData = MjClient.data.sData.tData;
                        // var pl = getUIPlayer(1);

                        // var _realImg = "playing/paodekuaiTable_new/buge.png";

                        // if(tData.geState == 1){
                        //     if(pl.geState == 1){
                        //         _realImg = "playing/paodekuaiTable_new/geban.png";
                        //     }
                        // }else if(tData.geState == 2 ){
                        //     _realImg = "playing/paodekuaiTable_new/bufan.png";
                        //     if(pl.geState == 1){
                        //         _realImg = "playing/paodekuaiTable_new/fan.png";
                        //     }
                        // }
                        
                        // this.loadTexture(_realImg);
                        // this.visible = (tData.geState == 1 || tData.geState == 2) && (pl.geState > -1) ;
                    },
                    waitPut: function() {
                        this.visible = false;
                    },
                    roundEnd:function(){
                        this.visible = false;
                    },
                    
                },
                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    clearCardUI_card(this, 1);
                },
                initSceneData: function(eD) {
                    SetUserVisible_WuXueGeBan(this, 1);
                },
                addPlayer: function(eD) {
                    SetUserVisible_WuXueGeBan(this, 1);
                },
                removePlayer: function(eD) {
                    SetUserVisible_WuXueGeBan(this, 1);
                },
                mjhand: function(eD) {
                    InitUserHandUI_WuXueGeBan(this, 1);
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
                geFanIcon:{
                    _run:function () {
                        this.visible = false;
                    },
                    _event:{
                        clearCardUI: function(){
                            cc.log("-------geFanIcon--333xx--------")
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
                    _visible:false,
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
                        // changePosition:function()
                        // {
                        //     this.visible = true;
                        // }
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
                _run: function() {
                    setWgtLayout(this, [this.width / 1280, this.height / 720], [0.5, 0.5], [-2, 0]);
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
                _visible: false,
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
            geFanState: {
                _run:function()
                {
                    var tData = MjClient.data.sData.tData;
                    var pos = MjClient.playui._topNode.getChildByName("deskCard").getPosition();
                    if (MjClient.isInGoldField())pos.y -= 20;
                    this.setScale(MjClient.size.width/1280);
                    this.setPosition(pos);
                },
                _event:{
                    s2cGeFan: function(msg){
                        MjClient.playui.setGeBanTagVisi(msg, 2);

                    },
                    initSceneData: function() {
                        MjClient.playui.setGeBanTagVisi(null, 2);
                    },
                    waitPut: function() {
                    this.visible = false;
                    },
                    roundEnd:function(){
                        this.visible = false;
                    },
                    
                },

                _visible: false
            },
            _event: {
                clearCardUI: function() {
                    clearCardUI_card(this, 2);
                },
                initSceneData: function(eD) {
                    SetUserVisible_WuXueGeBan(this, 2);
                },
                addPlayer: function(eD) {
                    SetUserVisible_WuXueGeBan(this, 2);
                },
                removePlayer: function(eD) {
                    SetUserVisible_WuXueGeBan(this, 2);
                },
                mjhand: function(eD) {
                    InitUserHandUI_WuXueGeBan(this, 2);
                },
                roundEnd: function() {
                    InitUserCoinAndName(this, 2);
                },
                waitPut: function(eD) {
                    DealWaitPut_card(this, eD, 2);
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
                }
            }
        },
        left: {
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
                            if ((MjClient.isInGoldField()) && !MjClient.data.sData.tData.lastPutCard){
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
                        if (!MjClient.isInGoldField()){
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
                setWgtLayout(this, [0.05, 0.05], [0.965, 0.22+0.08], [0, 3.5]); 
            },
            _click: function() {
                var chatlayer = new ChatLayer();
                MjClient.Scene.addChild(chatlayer);
                // var tData = MjClient.data.sData.tData;测试代码
                // MjClient.majiang.checkshuffleArray(tData.areaSelectMode , tData)
            }
        },
        voice_btn: {
            _run: function() {
                setWgtLayout(this, [0.08, 0.08], [0.965, 0.25+0.06], [0, 3.5]);

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
        bg_sort: {
            _layout: [
                [0.5, 0.5],
                [0.5, 0],
                [0, 0]
            ],
            _run: function() {
                this.visible = false;
            },
        },
        btn_sortClass: {
            _layout: [
                [0.14, 0.14],
                [0.78, 0.92],
                [0, 0]
            ],
            _run: function() {
                this.visible = false;
            },
        },
        // block_selectCard:{
        //     _layout:[
        //         [1, 1],
        //         [0.5, 0.5],
        //         [0, 0],
        //         true
        //     ],
        //     _run: function() {
        //         this.visible = false;
        //     },
        //     btn_selectCard_1:{
        //         _touch:function (btn, eT) {
        //             if (eT == 2) {
        //                 MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "cancelTrust"},function (rtn) {
        //                     btn.getParent().setVisible(false);
        //                 });
        //             }
        //         }
        //     },
        //     btn_selectCard_2:{
        //         _touch:function (btn, eT) {
        //             if (eT == 2) {
        //                 MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "cancelTrust"},function (rtn) {
        //                     btn.getParent().setVisible(false);
        //                 });
        //             }
        //         }
        //     },
        //     Text_1:{
        //         _run: function() {
        //             this.ignoreContentAdaptWithSize(true);
        //         },
        //     },
        //     _event:{
        //         beTrust:function (msg) {
        //             cc.log("wxd........beTrust......."+JSON.stringify(msg));
        //             if(getUIPlayer(0)&&getUIPlayer(0).info.uid == msg.uid){
        //                 if(MjClient.movingCard){
        //                     MjClient.movingCard.setTouchEnabled(false);
        //                     MjClient.movingCard.setScale(cardBeginScale);
        //                     MjClient.movingCard.setTouchEnabled(true);
        //                 }
        //                 this.visible = true;
        //             }
        //         },
        //         cancelTrust:function (msg) {
        //             if(getUIPlayer(0)&&getUIPlayer(0).info.uid == msg.uid) {
        //                 this.visible = false;
        //             }
        //         },
        //         initSceneData:function (msg) {
        //             var pl = getUIPlayer(0);
        //             if(pl.trust){
        //                 this.visible = true;
        //             }else {
        //                 this.visible = false;
        //             }
        //         },
        //     }
        // }
    },
    _downNode:null,
    _rightNode:null,
    _topNode:null,
    _leftNode:null,
    ctor: function() {
        this._super();
        var playui = ccs.load(res.Play_WuXueGeBan_json);

        cc.log("MjClient.data.pinfo = " + JSON.stringify(MjClient.data.pinfo));

        this.srcMaxPlayerNum = MjClient.MaxPlayerNum;
        MjClient.MaxPlayerNum = parseInt(MjClient.data.sData.tData.maxPlayer);

        playMusic("bgFight_paodekuai");
        this._downNode  = playui.node.getChildByName("down");
        this._rightNode = playui.node.getChildByName("right");
        this._topNode   = playui.node.getChildByName("top");
        this._leftNode  = playui.node.getChildByName("left");
        this._tingCardsNode = this._downNode.getChildByName("tingCardsNode");
        this._tingCardNumNode = this._downNode.getChildByName("tingCardNumNode");

        this._positionCard = playui.node.getChildByName("positionCard");
        this._btnPutCard   = playui.node.getChildByName("BtnPutCard");
        this._btnReset      = playui.node.getChildByName("BtnReset");
        this._btnNoPut     = playui.node.getChildByName("BtnNoPut");
        this._bg_sort    = playui.node.getChildByName("bg_sort");

        MjClient.playui = this;
        MjClient.playui._AniNode =  playui.node.getChildByName("eat");
        MjClient.playui._jiazhuWait = playui.node.getChildByName("jiazhuWait");
        MjClient.playui._clock = playui.node.getChildByName("clock");
        MjClient.playui._btn_tuoguan =  playui.node.getChildByName("block_selectCard");
        this.sortType     = MjClient.sortType.normal;
        this.nextSortType = MjClient.sortType.count;

        this._spriteSingle = playui.node.getChildByName("sprite_single");

        MjClient.sortClassType = 0;//util.localStorageEncrypt.getNumberItem(MjClient.sortClassKey,MjClient.sortClassType);
        MjClient.playui.sortType = MjClient.sortType.normal;

        if(MjClient.rePlayVideo != -1)// 表示回放
        {
            MjClient.sortClassType = 0;
            MjClient.playui.sortType = MjClient.sortType.normal;


            MjClient.playui.isShowBeiMainList = [];
            for(var i = 0; i < 3; i++ ){
                MjClient.playui.isShowBeiMainList[i] = false;
            }
        }

        this.top_banner = playui.node.getChildByName("banner");


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

        MjClient.playui._jiazhuWait = playui.node.getChildByName("jiazhuWait");

        MjClient.lastMJTick = Date.now();

        this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function() {
                        if (MjClient.game_on_show) MjClient.tickGame(0);
        }), cc.delayTime(7))));

        // initSceneFunc()
        // 在亲友圈房间中添加邀请亲友圈牌有一起对局
        //addClubYaoqingBtn();

        // 俱乐部返回大厅功能：by_jcw
        addClub_BackHallBtn(true, [[0.115, 0.115], [0.56,0.93], [0,0]], [[0.12, 0.12], [0.56,0.92], [0,0]],"playing/paodekuaiTable_new/delroom1.png");

        // 回看
        if(MjClient.rePlayVideo == -1 && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) && !MjClient.isInGoldField()){
            this._viewLookBack = COMMON_UI.createPokerLookbackView()
            playui.node.addChild(this._viewLookBack);
            this._viewLookBack.setPosition(MjClient.size.width / 2,MjClient.size.height / 2);
            this._viewLookBack.setContentSize(MjClient.size.width, MjClient.size.height);
        }
        // 切牌
        // if(MjClient.rePlayVideo == -1){
        //     this._viewPlayerShuffle = COMMON_UI.createPokerPlayerShuffleView()
        //     playui.node.addChild(this._viewPlayerShuffle);
        //     this._viewPlayerShuffle.setPosition(MjClient.size.width / 2,MjClient.size.height / 2);
        //     this._viewPlayerShuffle.setContentSize(MjClient.size.width, MjClient.size.height);
        // }

        // var delayExe = function(){
        //     cc.log("-------------delayExevisi-")
        //     // this._downNode.setVisible(false)
        //     // this._rightNode.setVisible(false)
        //     // this._topNode.setVisible(false)
        //     this._leftNode.setVisible(false)
            

        //     // this._positionCard.setVisible(false)
        //     // this._btnPutCard.setVisible(false)
        //     // this._btnHimt.setVisible(false)
        //     // this._btnNoPut.setVisible(false)
        //     // this._bg_sort.setVisible(false)
        //     // this.top_banner.setVisible(false)
        //     // playui.node.getChildByName("back").setVisible(false);

        //     for(var i = 0; i < MjClient.data.sData.tData.maxPlayer; i++){
        //         var node = getNode_cards(i);
        
        //         var item = node.getChildByName('ready');
        //         item.setVisible(false);
        //         item.removeFromParent(true);
        //     }
        // }.bind(this);
        // this.scheduleOnce(delayExe, 3);
        
        

        //this.initFieldIdUI(playui.node)
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
PlayLayer_WuXueGeBan.prototype.InitC_Data = function() {
    if (!MjClient.data.c_Data)
        MjClient.data.c_Data = {};
    cc.log("InitC_Data===========================")
    //出牌是否动画
    MjClient.data.c_Data.bPutCardAnim =  true;
    //是发采用老的牌型动画
    MjClient.data.c_Data.bPutCardAnimOld = true;
    //牌型动画是否是文字图片
    MjClient.data.c_Data.bTxtAnim = false;
}

PlayLayer_WuXueGeBan.prototype.clockNumberUpdate = function(node, endFunc)
{
    return arrowbkNumberUpdate(node, endFunc);
}

PlayLayer_WuXueGeBan.prototype.updateClockPosition = function(arrowNode)
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
PlayLayer_WuXueGeBan.prototype.getGameInfoString = function(param)
{
    var tData = MjClient.data.sData.tData;
    var str = "";

    str += tData.areaSelectMode.fan == 0 ? "可反," : "不可反,";
    str += tData.areaSelectMode.showHandCount ? "显示手牌数," : "";
    str += tData.areaSelectMode.selectCardByPlayer ? "手动选择底牌," : "";
    str += tData.areaSelectMode.singleJokerIsBomb ? "比牌时单王算炸弹," : "";
    str += tData.areaSelectMode.hunShuiRule == 0 ? "门清玩法一," : "门清玩法二,";
    str += tData.areaSelectMode.diFen ? "底分X" + tData.areaSelectMode.diFen + "," : "";

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

    if (str.charAt(str.length - 1) == ",")
        str = str.substring(0, str.length - 1);

    return str;
};

PlayLayer_WuXueGeBan.prototype.shwoFlyCardAnim = function(flyNode)
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
PlayLayer_WuXueGeBan.prototype.showOffenseAnim = function()
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

PlayLayer_WuXueGeBan.prototype.showHandCardBeiMian = function(uid)
{   
    if(MjClient.rePlayVideo != -1 ){ //回访
        var pl = getUIPlayerByUID (uid);
        var _off = getUiOffByUid(uid);

        MjClient.playui.isShowBeiMainList[_off] = true

        var playerNode = getNode_cards(_off);
        var childrens = playerNode.getChildren();
        for (var i = 0; i < childrens.length; i++)
        {
            var _name = "mjhand";
            if(_off != 0){
                _name = "mjhand_replay";
            }
            if (childrens[i].name != _name)
                continue;

            var beiMain = new cc.Sprite("playing/cardPic2/beimian_puke.png");
            beiMain.setName("beiMain");
            beiMain.setScale(childrens[i].width/beiMain.width, childrens[i].height/beiMain.height);
            beiMain.setPosition(childrens[i].width/2, childrens[i].height/2);
            childrens[i].addChild(beiMain, 111);
        }

        return;
    }

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

PlayLayer_WuXueGeBan.prototype.hideHandCardBeiMian = function(UIoff)
{

    if(MjClient.rePlayVideo != -1 ){ //回访
        var playerNode = getNode_cards(UIoff);
        var childrens = playerNode.getChildren();
        for (var i = 0; i < childrens.length; i++)
        {
            var _name = "mjhand";
            if(UIoff != 0){
                _name = "mjhand_replay";
            }
            if (childrens[i].name != _name)
                continue;

            childrens[i].removeChildByName("beiMain");
        }

        return;
    }


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
//金币场每局获取分数的动画
PlayLayer_WuXueGeBan.prototype.showGetScoreAni_filedQuick = function (off)
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


PlayLayer_WuXueGeBan.prototype.showAllHandCardsLayer = function (off)
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

    MjClient.majiang.sortCards(pl.mjhand, false, true, true);


    //展示手牌
    var _deskCard = node.getChildByName("deskCard");
    var _showCards = [];
    for(var i = 0; i < pl.mjhand.length;i++)
    {
        var out = _deskCard.clone();
        out.setScale(out.getScale()*1.3);
        out.visible = true;
        setCardSprite_card(out, pl.mjhand[i], 0,true);
        out.name = "out";
        node.addChild(out);
        _showCards.push(out);
    }

    // var sort = function (node)
    // {
    //     var pointCounts = {};
    //     for (var i = 0; i < node.length; i++) {
    //         var p = MjClient.majiang.calPoint(node[i].tag);
    //         if (pointCounts[p])
    //             pointCounts[p] ++;
    //         else
    //             pointCounts[p] = 1;
    //     }

    //     var commonCmp = function (a, b) {
    //         var c1 = pointCounts[MjClient.majiang.calPoint(a.tag)];
    //         var c2 = pointCounts[MjClient.majiang.calPoint(b.tag)];
    //         if (c1 == c2)
    //             return MjClient.majiang.cardValueCmp(a.tag, b.tag);
    //         else
    //             return c1 - c2;
    //     }

    //     node.sort(function(a, b) { return -commonCmp(a, b);});
    // }

    // sort(_showCards);

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
}

PlayLayer_WuXueGeBan.prototype.CardLayoutRestore = function(node, off, needSort)
{
    cc.log("PlayLayer_WuXueGeBan11==============");
    
    // 如果正在发牌 不排序
    if (MjClient.playui.isFaPai) return;

    if (cc.isUndefined(needSort))
        needSort = true;
    
    cc.log("PlayLayer_WuXueGeBan22==============");

    //先停止手牌的动作，在重排
    StopHandCardAnim(node);

    if(MjClient.sortClassType == 0 || true)
    {
        cc.log("横向排序");
        MjClient.playui.horSort(node, off, needSort);
    }
    else
    {
        cc.log("纵向排序");
        MjClient.playui.verSort(node, off, needSort);
    }
};

PlayLayer_WuXueGeBan.prototype.getIsNeedReSort = function(putCards){
    var _card_type = MjClient.majiang.calType(putCards);
    var _haveA = false;
    var _haveK = false;

    var _needChangeAKPos = false;

    var ret = {};

    for(var i = 0; i < putCards.length; i++){
        if(MjClient.majiang.calPoint(putCards[i] == 1) ){
            _haveA = true;
        }

        if(MjClient.majiang.calPoint(putCards[i] == 13) ){
            _haveK = true;
        }
    }

    if(MjClient.majiang.CARDTPYE.shunzi == _card_type){

        if(_haveA){
            if(putCards.length == 13 && _haveK){
                _needChangeAKPos = true;
            }
        }
    }else if(MjClient.majiang.CARDTPYE.liandui == _card_type){
        if(_haveA && _haveK){
            _needChangeAKPos = true;
        }

    }else if(MjClient.majiang.CARDTPYE.wang382a == _card_type){

    }

    ret._needChangeAKPos = _needChangeAKPos
    ret._card_type = _card_type;

    return ret;
};


PlayLayer_WuXueGeBan.prototype.CardLayoutDesk = function(node,cards,off)
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
    for (var i = 0; i < children.length; i++) {
        var ci = children[i];

        if (ci.name != "out")
            continue;

        var found = laiziCards.indexOf(MjClient.majiang.addLaiziSign(ci.tag));
        if (found < 0)
            continue;

        laiziCards.splice(found,1);

        var signLaizi = new cc.Sprite("playing/paodekuaiTable_new/sign_laizi.png");
        signLaizi.setName("signLaizi");
        signLaizi.setAnchorPoint(0, 0);
        signLaizi.setPosition(0, 0);
        ci.addChild(signLaizi);
    }
};

//横向摆放《正常》
PlayLayer_WuXueGeBan.prototype.horSort = function(node, off, needSort)
{
    var pl; //player 信息
    pl = getUIPlayer(off);//获取玩家信息.off 为0 ，就是自己得信息，能看到自己摸牌 by sking
    if(!pl) return;

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
            
            var _cardType = ci.getChildByName("cardType");
            var _smallFlower = _cardType && _cardType.getChildByName("smallFlower");
            if(_smallFlower)
            {
                _smallFlower.setPosition(22,35)
            }
        }
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

    for(var i = 0; i < children.length; i++) //children 为 "down" 节点下的字节点
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
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

    cc.log("---------------pro_rankType-----", pro_rankType)
    //理牌后剩下其他的牌
    var mjhandPai = mjhandCopy.slice();
    if (needSort)
        tempMaJiang.sortCards(mjhandPai, false, true, true);

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
    
    if(off == 0)//自己或者对家
    {
        var cardWidth = orders[0] ? orders[0].width * orders[0].scale : 0;
        var screenScale = MjClient.size.width/1280;
        var areaWidth = MjClient.size.width - screenScale * 30;
        var width = (areaWidth - cardWidth) / (19 - 1) + (19 - orders.length) * 1 * screenScale ;
        var startX = screenScale * 20 + (areaWidth - width * (orders.length - 1))/2;


        for(var i = 0; i < orders.length; i++)
        {
            var ci = orders[i];
            ci.x = startX;
            startX += width;
            ci.zIndex = i;

            ci.showWidth = i < orders.length - 1 ? width : cardWidth;
        }
    }
    else if (off == 1)//右侧的
    {
        for(var i = orders.length - 1; i >= 0; i --)
        {
            var ci = orders[i];
            //if(ci.name == orders[i - 1].name)
            {
                if (ci.name == "mjhand_replay") {
                    if (i != orders.length - 1) {
                        ci.y = orders[i + 1].y - upSize.width * upS * 0.3 - (27 - orders.length) * 0.3;//调牌的距离的，todo...
                    }
                    else {
                        ci.y = start.y - upSize.width * upS * 0.2 - ((27 - orders.length) * upSize.width * upS * 0.3) / 3;
                    }
                }
            }
        }

        for(var i = 0; i < orders.length; i++)
        {
            orders[i].zIndex = i;
        }
    }
    else if (off == 2)//左侧的
    {
        for(var i = 0; i < orders.length; i++)
        {
            var ci = orders[i];
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
PlayLayer_WuXueGeBan.prototype.verSort = function(node, off, needSort)
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
    var mjhandPai = null;
    if (needSort)
        mjhandPai = tempMaJiang.sortHandCards(mjhandCopy,pro_rankType);
    else
        mjhandPai = mjhandCopy.slice();

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

PlayLayer_WuXueGeBan.prototype.showJiaZhu_PaodekuaiTY = function()
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = getUIPlayer(0);
    MjClient.playui._jiazhuWait.visible = false;
    if (tData.tState == TableState.waitJiazhu && SelfUid() == pl.info.uid) {
        if (pl.mjState == TableState.waitJiazhu ) {

            //清除飘分选择页面
            var layer = MjClient.playui.getChildByName("JiaZhu");
            if (layer) { return;}
            var layer = new JiaZhu_PaodekuaiTY(tData.areaSelectMode.piaofen,function(){
                //弹窗等待
                MjClient.playui._jiazhuWait.visible = true;
            });
            layer.setName("JiaZhu");
            cc.log("_jiazhuWait====================1111");
            MjClient.playui.addChild(layer, 99);
        }
        else {
            //弹窗等待其他玩家加注
            MjClient.playui._jiazhuWait.visible = true;
        }
    }
}

 PlayLayer_WuXueGeBan.prototype.resetJiaZhuNum = function(node)
{
    var directions = ["down","top","left","right"];

    for (var i = 0; i < directions.length; i++) {
        this.setJiaZhuNum(node.getChildByName(directions[i]), getUIPlayer(i));
    }
}

PlayLayer_WuXueGeBan.prototype.setJiaZhuNum = function (node, pl)
{
    if(!pl) return;
    var icountNode = node.getChildByName("head").getChildByName("jiaZhu");
    if (!icountNode) return;
    var tData = MjClient.data.sData.tData;
    cc.log("===========飘分 = " + pl.jiazhuNum);
    if(pl.jiazhuNum > 0) {
        icountNode.visible = true;
        icountNode.ignoreContentAdaptWithSize(true);
        icountNode.setAnchorPoint(cc.p(1, 0.5))
        icountNode.setString("飘" + pl.jiazhuNum + "分");
    }else{
        icountNode.setString("");
    }
}

//头像位置
PlayLayer_WuXueGeBan.prototype.reConectHeadLayout_paodekuaiTY = function (node)
{
    var sData = MjClient.data.sData;
    
    reConectHeadLayout_card(node);
}

//时间节点设置
PlayLayer_WuXueGeBan.prototype.BgTime_run = function (node)
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

//////////////////////////金币场UI调整//////////////////////////////////////////////////////////////////////////////////////
// PlayLayer_WuXueGeBan.prototype.reConectHeadLayout_PaoDeKuai_fieldId= function (node)
// {
//     var down = node.getChildByName("down").getChildByName("head");
//     var top = node.getChildByName("top").getChildByName("head");
//     var right = node.getChildByName("right").getChildByName("head");

//     setWgtLayout(right, [0.13, 0.13], [1, 1.0], [-0.6, -2.0], false, false);
//     if (isIPhoneX()) {
//         setWgtLayout(down, [0.13, 0.13], [0.00, 0.0], [0.6, 0.65], false, false);       
//         setWgtLayout(top, [0.13, 0.13], [0.00, 1.0], [0.6, -2.0], false, false);
//     }else{
//         setWgtLayout(down, [0.13, 0.13], [0, 0.0], [0.6, 0.65], false, false);
//         setWgtLayout(top, [0.13, 0.13], [0, 1.0], [0.6, -2.0], false, false);
//     }

//     var sData = MjClient.data.sData;
//     var tData = sData.tData;
//     if (!MjClient.isInGoldField() || (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) )
//     {
//         var head_bottom = down.getChildByName("head_bottom");
//         var coinbg = down.getChildByName("coinbg");
//         if (!head_bottom || !coinbg)return;
//         head_bottom.visible = false;
//         coinbg.visible = true;
//     }
// }

// PlayLayer_WuXueGeBan.prototype.initFieldIdUI = function (node)
// {
//     var sData = MjClient.data.sData;
//     var tData = sData.tData;
//     var fieldNode = node.getChildByName("FieldNode");
//     if (!fieldNode) return;
//     if (MjClient.isInGoldField())
//     {
//         fieldNode.visible=true;
//     }
//     else{
//         fieldNode.visible=false;
//         return;
//     }


//     //隐藏金币场不需要的节点
//     node.getChildByName("banner").visible = false;
//     node.getChildByName("voice_btn").visible = false;
//     node.getChildByName("chat_btn").visible = false;

//     //金币场节点位置调整
//     var bottonBG = fieldNode.getChildByName("bottonBG");
//     var offH = bottonBG.height*bottonBG.scaleY;

//     node.getChildByName("BtnReady").y += offH;
//     node.getChildByName("BtnNoPut").y += offH;
//     node.getChildByName("BtnPutCard").y += offH;
//     node.getChildByName("BtnHimt").y += offH;

//     var down = node.getChildByName("down");
//     down.getChildByName("play_tips").y += offH;
//     down.getChildByName("ready").y += offH;
//     down.getChildByName("stand").y += (offH + 10 * bottonBG.scaleY);
//     down.getChildByName("deskCard").y += offH;
//     down.getChildByName("noPutTag").y += offH;

//     var block_tuoguan = node.getChildByName("block_tuoguan");
//     block_tuoguan.getChildByName("btn_tuoguan").y += offH;
//     block_tuoguan.getChildByName("Text_1").y += offH;

//     MjClient.clockNode.srcPosition.y += offH;
// }

// 更新wifi信号 3张图片
PlayLayer_WuXueGeBan.prototype.updateWifiState_field = function(node)
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

PlayLayer_WuXueGeBan.prototype.reLoadOptBtnRes = function() {
    //出牌按钮
    if(this._btnPutCard) this._btnPutCard.loadTextures("playing/paodekuaiTable_new/chupai.png", null, "playing/paodekuaiTable_new/chupai_2.png");
    //提示按钮  
    if(this._btnReset) this._btnReset.loadTextures("playing/paodekuaiTable_new/tishi.png", null, "playing/paodekuaiTable_new/tishi_s.png");
     //不出按钮   
    if(this._btnNoPut) this._btnNoPut.loadTextures("playing/paodekuaiTable_new/buchu.png", null, "playing/paodekuaiTable_new/buchu_s.png");
}

PlayLayer_WuXueGeBan.prototype.dealHandCardLayer = function (uid) {
    var pl = getUIPlayer(0);
    var _node = getNode_cards(0);

    if(MjClient.rePlayVideo == -1 ){
        
        if(uid != null){
            if(uid == pl.info.uid && pl.mjhand ){
                MjClient.playui.isShowHandCardBeiMain = true;
                MjClient.playui.showHandCardBeiMian();
            }
        }
        else{ //断线重连的
            if(pl.gaiPai){
                MjClient.playui.isShowHandCardBeiMain = true;
                MjClient.playui.showHandCardBeiMian();
            }
        }
    }else{ //回访

        if(uid != null){
            MjClient.playui.showHandCardBeiMian(uid);

        }
    }

}

PlayLayer_WuXueGeBan.prototype.handleDiCards = function (diCards, part) {
    var cards = diCards;
    //var isShow = cards != null && cards.length > 0;
    var diCardsNum = 3;

    if(part == null){
        part = 0;
        diCardsNum = 6;
    }

    for (var i = 0; i < diCardsNum; i++) {

        var isShow = diCards[i] != null;
        cc.log("------dizhuCards_--------", "dizhuCards_" + (i + (part*3)))
        var cardNode = this.top_banner.getChildByName("dizhuCards_" + (i + (part*3) ));
        cardNode.tag = -1;
        if (!isShow) {
            cardNode.removeAllChildren();
            cardNode.loadTexture("playing/cardPic2/beimian_puke.png");
        } else {
            setCardSprite_card(cardNode, cards[i], false);
        }
    }
}

PlayLayer_WuXueGeBan.prototype.dealDiCards = function (uid, part, handCounts, isAddCards, isIconMove, gaiPaiUid) {
    var tData = MjClient.data.sData.tData;
    //tData.zhuang = ;
    var zhuang = tData.zhuang;
    //tData.diCards = diCards == null ? [] : diCards;
    // var zhuangOff = getOffByIndex(zhuang);
    // if (isAddCards) {
    //     MjClient.playui.addDiCardsToZhuang(zhuangOff);
    // }

    var diCards = [];

    if(part != null){
        if(gaiPaiUid != null){
            MjClient.playui.dealHandCardLayer(gaiPaiUid);
        }
        
        for(var i = 0; i < 3 ; i++){
            diCards.push(tData.diCards[part*3 + i]);
            cc.log("--------------dizhuCardsvalue", tData.diCards[part*3 + i])
        }

        //if(MjClient.rePlayVideo == -1)// 表示正常游戏
        //{
            var pl = getUIPlayer(0);
            var _node = getNode_cards(0);

            if (uid == pl.info.uid && pl.mjhand) {//只初始化自己的手牌
                var vcard = [];
                for (var i = 0; i < diCards.length; i++) {
                    
                    var card = getNewCard_card(_node, "stand", "mjhand", diCards[i], 0);
                    var index = vcard.indexOf(diCards[i]);//区分2张一样的牌
                    if(index >= 0)
                    {
                        card.setUserData(1);
                    }
                    else
                    {
                        card.setUserData(0);
                    }
                    vcard.push(diCards[i]);
                }
                MjClient.playui.CardLayoutRestore(_node, 0, true);
            }

            if(MjClient.rePlayVideo != -1){
                var pl = getUIPlayerByUID (uid);
                var _off = getUiOffByUid(uid);
                var _node = getNode_cards(_off);

                refreshHandCardForReplay(_off)

                // if (uid == pl.info.uid && pl.mjhand && _off != 0) {
                //     var vcard = [];
                //     for (var i = 0; i < diCards.length; i++) {
                        
                //         var card = getNewCard_card(_node, "stand", "mjhand_replay", diCards[i], _off);
                //         var index = vcard.indexOf(diCards[i]);//区分2张一样的牌
                //         if(index >= 0)
                //         {
                //             card.setUserData(1);
                //         }
                //         else
                //         {
                //             card.setUserData(0);
                //         }
                //         vcard.push(diCards[i]);
                //     }
                //     MjClient.playui.CardLayoutRestore(_node, _off, true);
                // }
            }

        //}
    }
    else{

        MjClient.playui.dealHandCardLayer(null);

        var _indexs = tData.mingIndexs;
        cc.log("--------tData.mingIndexs-----", tData.mingIndexs)

        var count = 2;
        if(tData.mingIndexs != null){
            count = tData.mingIndexs.length;
        }

        for(var i = 0; i < count; i++){
            var index = (_indexs != null && _indexs[i] != null) ?  _indexs[i] : i ;
            cc.log("------------index----i---", index, i)
            for(var j = 0; j < 3; j++){
                var _value = null;
                
                if(tData.diCards && ( tData.diCards[j + index*3] != null)){
                    cc.log("----------+++----dizhuCardsvalue", tData.diCards[j + index*3])
                    _value = tData.diCards[j + index*3];
                }

                if(tData.tState == TableState.roundFinish || tData.tState == TableState.isReady){
                    _value = null
                }
                diCards[j + index*3] = _value;
                //diCards.push(_value);
            }
        }
    }

    MjClient.playui.handleDiCards(diCards, part);
    //MjClient.playui.handleDifen();
    //MjClient.clockNode.visible = false;
    // for (var i = 0; i < this.headOffLen; i++) {
    //     var off = this.headOffArr[i];
    //     MjClient.playui.dealQiangDizhuText(off, false);
    //     var pl = getUIPlayer(off);
    //     var isZhuang = false;
    //     if (pl) {
    //         isZhuang = tData.uids[tData.zhuang] == pl.info.uid;
    //         pl.handCount = handCounts[pl.info.uid] ? handCounts[pl.info.uid] : pl.handCount;
    //     }
    //     this.headNode[off].showCurrentLeftCardCount(off != 0 ? pl : null, tData.areaSelectMode.showHandCount);
    //     this.headNode[off].setIconDiZhu(isZhuang);
    //     if (!isIconMove || zhuangOff != off) {
    //         continue;
    //     }
    //     var node = getNode_cards(off);
    //     var centerPos = node.convertToNodeSpace(cc.p(MjClient.size.width / 2, MjClient.size.height / 2));
    //     this.headNode[off].iconMoveToDiZhu(off, centerPos);
    // }
}

PlayLayer_WuXueGeBan.prototype.setGeBanTagVisi = function(msg, off){
    var tData = MjClient.data.sData.tData;
    var _realImg = "playing/paodekuaiTable_new/buge.png";

    if(msg){
        cc.log("-------------tData.geState -----------msg.geState----", tData.geState, msg.geState)
        if(tData.geState == 1){
            if(msg.geState == 1){
                _realImg = "playing/paodekuaiTable_new/geban.png";
            }
        }else if(tData.geState == 2 ){
            _realImg = "playing/paodekuaiTable_new/bufan.png";
            if(msg.geState == 2){
                _realImg = "playing/paodekuaiTable_new/fan.png";
            }
        }

        

        var node = getNode_cards(off).getChildByName("geFanState");

        if(node.visible && msg.uid != getUIPlayer(off).info.uid){
            return
        }

        var _sp = cc.Sprite(_realImg);
        node.setSpriteFrame(_sp.getSpriteFrame());
        
        var _visible = getUIPlayer(off) && (msg.uid == getUIPlayer(off).info.uid) 
        && (msg.geState == 1 || msg.geState == 2 || msg.geState == 0);

        node.visible = _visible;

        if(_visible){
            var icon = getNode_cards(off).getChildByName("head").getChildByName("geFanIcon");
            if(tData.geState == 1 && msg.geState == 1){
                icon.loadTexture("playing/paodekuaiTable_new/ge_an.png");
            }
            
            if(tData.geState == 2 && msg.geState == 2 ){
                icon.loadTexture("playing/paodekuaiTable_new/fan_an.png");
            }

            icon.setVisible(true);
            if(msg.geState == 0){
                icon.setVisible(false);
            }
        }

    }else{


        var pl = getUIPlayer(off);
        if(!pl){
            return
        }

        var _realImg = "playing/paodekuaiTable_new/buge.png";

        if(tData.geState == 1){
            if(pl.geState == 1){
                _realImg = "playing/paodekuaiTable_new/geban.png";
            }
        }else if(tData.geState == 2 ){
            _realImg = "playing/paodekuaiTable_new/bufan.png";
            if(pl.geState == 2){
                _realImg = "playing/paodekuaiTable_new/fan.png";
            }
        }
        
        var node = getNode_cards(off).getChildByName("geFanState");
        var _sp = cc.Sprite(_realImg);
        node.setSpriteFrame(_sp.getSpriteFrame());

        cc.log("----off----pl.geState---tData.geState---", off, pl.geState, tData.geState)

        var _visible = pl.geState >= 0 //tData.geState 1 开始叫隔  2 开始叫反  3 手动选择底牌 4 无人反 5 一人反  6 两人反
        node.visible = _visible && (tData.geState == 1 || tData.geState == 2 || tData.geState == 3);

        if(tData.tState == TableState.roundFinish || tData.tState == TableState.isReady || (pl.geState == -1) ){
            node.visible = false;
            return;
        }

        if(_visible){

            var icon = getNode_cards(off).getChildByName("head").getChildByName("geFanIcon");
            if(pl.geState == 1){ //隔
                icon.loadTexture("playing/paodekuaiTable_new/ge_an.png");
                node.setSpriteFrame((cc.Sprite("playing/paodekuaiTable_new/geban.png")).getSpriteFrame() );
            }else if(pl.geState == 2){ //反
                
                node.setSpriteFrame((cc.Sprite("playing/paodekuaiTable_new/fan.png")).getSpriteFrame() );
            }else if(pl.geState == 0){
                //不隔不反 pl-1未开始选
                if( (tData.geState == 2) ){
                    var _geIndex = -1;

                    for(var i= 0; i <= 2; i++){
                        var _pl = getUIPlayer(i);
                        if(_pl && _pl.geState == 1){
                            _geIndex = i;
                            break;
                        }
                    }

                    var _preIndex = -1;
                    if(_geIndex == 0){
                        _preIndex = 2;
                    }else if(_geIndex == 1 ){
                        _preIndex = 0;
                    }else if( _geIndex == 2){
                        _preIndex = 1
                    }
                    var _prePl = getUIPlayer(_preIndex); 
                    if(_prePl && _prePl.geState == 0 && off == _preIndex){
                         node.setSpriteFrame((cc.Sprite("playing/paodekuaiTable_new/buge.png")).getSpriteFrame() );
                    }
                   
                }
            }


            icon.setVisible(true);

            if(pl.geState == 0 || pl.geState == -1 ){
                icon.setVisible(false);
            }
        }
    }
    
}

PlayLayer_WuXueGeBan.prototype.checkPut = function (oHands, oCards, lastPutCard) {
    var tData = MjClient.data.sData.tData;

    if (!IsTurnToMe() || tData.tState != TableState.waitPut)
        return null;

    var screenScale = Math.min(MjClient.size.width/1280,MjClient.size.height/720); 

    this._btnPutCard.visible = true;
    if ((tData.lastPutPlayer == tData.curPlayer || tData.lastPutPlayer == -1)) {
        this._btnNoPut.visible = false;
        this._btnReset.x = this._btnNoPut.srcX + 100 * screenScale;
        this._btnPutCard.x = this._btnPutCard.srcX - 100 * screenScale;
    } else {
        this._btnNoPut.visible = true;
        this._btnNoPut.x = this._btnNoPut.srcX;
        this._btnReset.x = this._btnReset.srcX;
        this._btnPutCard.x = this._btnPutCard.srcX;
    }

    if (oCards && typeof(oCards)!='undefined' && oCards.length == 0) return null;

    var cards = [];
    var laizis = MjClient.majiang.transformAndGetLaizi(oCards, cards);

    if (laizis.length <= 0 || laizis.length == 1 && oCards.length == 1) {
        // 要出的牌中没有大小王牌值，或者只有單王，可以直接调用算法类checkPut
        return MjClient.majiang.checkPut(oHands, oCards, lastPutCard);
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

        // 如果是天剑，直接返回
        if (laizis.length == 2 && oCards.length == 2) {
            return true;
        }

        // 从要出的牌组中查找炸弹
        var CARDTPYE = MjClient.majiang.CARDTPYE;
        var findTypes = [CARDTPYE.wang382a,CARDTPYE.zhadan];
        if (oCards.length != 5) {
            findTypes.splice(0,1);
        }

        var tempRets = [];
        for (var i = 0; i < findTypes.length; i++) {
            tempRets = MjClient.majiang.findCardByType(cards, laizis, findTypes[i], oCards.length);

            if (tempRets.length > 0) {
                if (!lastPutCard || lastPutCard == -1) {
                    // 先手，找到可出牌型立即返回
                    return this.findMoreProbabilities(oHands, oCards, lastPutCard);
                }

                for (var j = 0; j < tempRets.length; j++) {
                    if (MjClient.majiang.canPut(tempRets[j], lastPutCard)) {
                        // 压牌，找到可压牌立即返回
                        return this.findMoreProbabilities(oHands, oCards, lastPutCard);
                    }
                }
            }
        }

        if (!lastPutCard || lastPutCard == -1) {
            // 先手，找适当可出牌即可
            var cardsLength = oCards.length;
            var findTypes = [];

            if (cardsLength >= 4) {
                findTypes.push(CARDTPYE.liandui);
                findTypes.push(CARDTPYE.shunzi);
            } else if (cardsLength == 3) {
                findTypes.push(CARDTPYE.shunzi);
            } else if (cardsLength == 2) {
                findTypes.push(CARDTPYE.duizi);
            } else
                findTypes.push(CARDTPYE.danpai);

            for (var i = 0; i < findTypes.length; i++) {
                tempRets = MjClient.majiang.findCardByType(cards, laizis, findTypes[i], cardsLength);

                if (tempRets.length > 0) {
                    return this.findMoreProbabilities(oHands, oCards, lastPutCard);
                }
            }
        } else {
            // 压牌，从要出的牌组中查找相同牌型的可出牌组
            var lastCardsType = MjClient.majiang.calType(lastPutCard);
            tempRets = MjClient.majiang.findCardByType(cards, laizis, lastCardsType, oCards.length);

            for (var i = 0; i < tempRets.length; i++) {
                if (MjClient.majiang.canPut(tempRets[i], lastPutCard)) {
                    // 压牌，找到可压牌立即返回
                    return this.findMoreProbabilities(oHands, oCards, lastPutCard);
                }
            }
        }

        return null;
    }
};

PlayLayer_WuXueGeBan.prototype.findMoreProbabilities = function(oHands,oCards,lastPutCard) {
    var cards = [];
    var laizis = MjClient.majiang.transformAndGetLaizi(oCards, cards);
    var results = [];

    if (laizis.length <= 0) {
        // 没有癞子，直接出牌
        return results;
    }

    // 有癞子，查找其他出牌的可能

    var tData = MjClient.data.sData.tData;
    var tempRets = [];
    var CARDTPYE = MjClient.majiang.CARDTPYE;

    var sortWang382A = function(ret_1,ret_2) {
        var ret_copy_1 = ret_1.slice();
        var ret_copy_2 = ret_2.slice();

        ret_copy_1.sort(MjClient.majiang.cardValueCmp.bind(MjClient.majiang));
        ret_copy_2.sort(MjClient.majiang.cardValueCmp.bind(MjClient.majiang));

        return ret_copy_2[ret_copy_2.length - 1] > ret_copy_1[ret_copy_1.length - 1];
    }

    var sortZhaDanRets = function(ret_1,ret_2) {
        if (ret_1.length == ret_2.length) {
            return MjClient.majiang.calCardsValue(ret_2, CARDTPYE.zhadan) - MjClient.majiang.calCardsValue(ret_1, CARDTPYE.zhadan);
        } else { 
            // 炸弹张数多的较大
            return ret_2.length - ret_1.length;
        }
    }

    var sortNormal = function(rets,cardType) {
        var sortFunc = function(ret_1,ret_2) {
            return MjClient.majiang.calCardsValue(ret_2, cardType) - MjClient.majiang.calCardsValue(ret_1, cardType);
        }

        rets.sort(sortFunc);
    }

    if (!lastPutCard || lastPutCard == -1) {
        // 先手
        // 炸弹>顺子>连对>对子
        var findTypes = [
            CARDTPYE.wang382a,
            CARDTPYE.zhadan,
            CARDTPYE.shunzi,
            CARDTPYE.liandui,
            CARDTPYE.duizi,
            CARDTPYE.danpai
        ];

        for (var i = 0; i < findTypes.length; i++) {
            tempRets = MjClient.majiang.findCardByType(cards, laizis, findTypes[i], oCards.length);

            if (laizis.length > 0 && tempRets.length >= 2) {
                // 有癞子，结果需要去重
                MjClient.majiang.removeSameResults(tempRets);
            }

            if (tempRets.length > 1) {
                // 对相同牌型牌组排序（大的排前边）
                if (findTypes[i] == CARDTPYE.wang382a)
                    tempRets.sort(sortWang382A);
                else if (findTypes[i] == CARDTPYE.zhadan)
                    tempRets.sort(sortZhaDanRets);
                else
                    sortNormal(tempRets,findTypes[i]);
            }

            results = results.concat(tempRets);
        }
    } else {
        // 压牌

        var lastCardsType = MjClient.majiang.calType(lastPutCard);

        if (lastCardsType != CARDTPYE.wang382a) {
            var findTypes = [CARDTPYE.wang382a,CARDTPYE.zhadan];  // 炸弹是必须要找的

            if (lastCardsType != CARDTPYE.zhadan) {
                // 找同牌型牌组
                findTypes.push(lastCardsType);
            }
        } else
            var findTypes = [CARDTPYE.wang382a];  // 炸弹是必须要找的

        for (var i = 0; i < findTypes.length; i++) {
            tempRets = MjClient.majiang.findCardByType(cards, laizis, findTypes[i], oCards.length);

            if (laizis.length > 0 && tempRets.length >= 2) {
                // 有癞子，结果需要去重
                MjClient.majiang.removeSameResults(tempRets);
            }

            for (var j = 0; j < tempRets.length;) {
                if (MjClient.majiang.canPut(tempRets[j], lastPutCard))
                    j++;
                else
                    tempRets.splice(j,1);
            }

            if (tempRets.length > 1) {
                // 对相同牌型牌组排序（大的排前边）
                if (findTypes[i] == CARDTPYE.wang382a)
                    tempRets.sort(sortWang382A);
                else if (findTypes[i] == CARDTPYE.zhadan)
                    tempRets.sort(sortZhaDanRets);
                else
                    sortNormal(tempRets,findTypes[i]);
            }

            results = results.concat(tempRets);
        }
    }

    var screenScale = Math.min(MjClient.size.width/1280,MjClient.size.height/720); 

    this._btnPutCard.visible = false;
    if (this._btnNoPut.isVisible()) {
        this._btnReset.x = this._btnPutCard.srcX - 100 * screenScale;
        this._btnNoPut.x = this._btnNoPut.srcX + 100 * screenScale;
    }
    else
        this._btnReset.x = this._btnReset.srcX;

    MjClient.playui.addChild(new SelectPutCardsLayer_wuXueGeBan(results), 99);

    return results;
};

PlayLayer_WuXueGeBan.prototype.RemoveNodeBack = function(node, name, num, tag) {
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

PlayLayer_WuXueGeBan.prototype.findNodesBack = function(node, name, tags) {
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

PlayLayer_WuXueGeBan.prototype.setBannerGeFanStatus = function() {
    var tData = MjClient.data.sData.tData;
    var ret = {};
    var str = "无隔";
    var mult = 1;

    
    if(tData.geState == 4 ){
        str = "隔无反";
        mult = 1;
    }else if(tData.geState == 5){
        str = "隔反";
        mult = 4;

    }else if(tData.geState == 6){
        str = "反反";
        mult = 8;
    }

    if(tData.tState == TableState.roundFinish || tData.tState == TableState.isReady){
        str = "无隔";
        mult = 1;
    }

    ret.str = str;
    ret.mult = mult;

    return ret;
};

PlayLayer_WuXueGeBan.prototype.reSetData = function() {
    var tData = MjClient.data.sData.tData;
    tData.diCards = [];

    MjClient.playui.handleDiCards(tData.diCards, null);
};

PlayLayer_WuXueGeBan.prototype.cardsSort = function(cards)
{
    var CARDTPYE = MjClient.majiang.CARDTPYE;
    var cardType = MjClient.majiang.cardsType(cards);

    if (cardType == CARDTPYE.danpai)
        return;

    // 只针对连对、顺子排序（从大到小）
    if (cardType == CARDTPYE.duizi || cardType == CARDTPYE.zhadan || 
        cardType == CARDTPYE.wang382a || cardType == CARDTPYE.tianjian) {

        MjClient.majiang.sortCards(cards,false,true,true);
    } else if (cardType == CARDTPYE.liandui || cardType == CARDTPYE.shunzi) {
        MjClient.majiang.sortCards(cards,true,false,true);

        if (MjClient.majiang.calPoint(cards[0]) == MjClient.majiang.KPOINT && 
            MjClient.majiang.calPoint(cards[cards.length - 1]) == MjClient.majiang.APOINT) {
            cards.unshift(cards.splice(cards.length - 1,1)[0]);

            if (cardType == CARDTPYE.liandui)
                cards.unshift(cards.splice(cards.length - 1,1)[0]);
        }
    }
}


