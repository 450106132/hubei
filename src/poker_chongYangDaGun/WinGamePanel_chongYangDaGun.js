function SetEndOneUserUI_chongYangDaGun(node, off) {

    var pl = getUIPlayer(off);
    if (!pl) {
        node.setVisible(false);
        return;
    }
    setUserOfflineWinGamePanel(node,pl);
    var tData = MjClient.data.sData.tData;
    var isZhuan = pl.info.uid == tData.uids[tData.zhuang];

    addWxHeadToEndUI(node.getChildByName("image_head"), getPlayerIndex(off));
    //CircularCuttingHeadImg(node.getChildByName("image_head"), pl);

    node.getChildByName("text_shuyingfen").ignoreContentAdaptWithSize(true);
    node.getChildByName("text_hua").ignoreContentAdaptWithSize(true);
    node.getChildByName("text_xi").ignoreContentAdaptWithSize(true);

    node.getChildByName("dissText").setVisible(false);

    var text_name = node.getChildByName("text_name");
    text_name.ignoreContentAdaptWithSize(true);
    text_name.setString(getNewName(unescape(pl.info.nickname ) + ""));

    var image_ji = node.getChildByName("image_ji");
    image_ji.setVisible(false);  
    if(tData.chickenCard != -1 && tData.chickenCard != null ){
        if( tData.zhuangPartner >= 0 && pl.info.uid == tData.uids[tData.zhuangPartner] ){
            image_ji.visible = true;
        }

        if(tData.zhuangPartnerHidden >= 0 && pl.info.uid == tData.uids[tData.zhuangPartnerHidden] ){
            image_ji.visible = true;
        }
    }

    var image_zhuang = node.getChildByName("image_zhuang");
    image_zhuang.setVisible(false);  

    if(pl.info.uid == tData.uids[tData.zhuang]){
        image_zhuang.setVisible(true); 
    }

    var image_you = node.getChildByName("image_you");
    image_you.setVisible(false);   
    if(pl.rank > 0 ){
        image_you.visible = true;
        image_you.loadTexture("playing/damazi/ui_you" + pl.rank + ".png"); 
    }

    var image_state_score = node.getChildByName("image_state").getChildByName("score");
    image_state_score.ignoreContentAdaptWithSize(true);
    image_state_score.setString( pl.zhuaFen  + "");  


    var Node_shuying = node.getChildByName("Node_shuying");
    var _shuying0 = Node_shuying.getChildByName("score_0");
    var _shuying1 = Node_shuying.getChildByName("score_1");
    _shuying0.ignoreContentAdaptWithSize(true);
    _shuying1.ignoreContentAdaptWithSize(true);
    _shuying0.setVisible(pl.winOrLose < 0 );
    _shuying1.setVisible(pl.winOrLose >= 0);
    _shuying0.setString("/" + pl.winOrLose  + "");
    _shuying1.setString("/" + pl.winOrLose  + "");


    var Node_huapaifen = node.getChildByName("Node_huapaifen");
    var _huapai0 = Node_huapaifen.getChildByName("score_0");
    var _huapai1 = Node_huapaifen.getChildByName("score_1");
    _huapai0.ignoreContentAdaptWithSize(true);
    _huapai1.ignoreContentAdaptWithSize(true);
    _huapai0.setVisible(pl.huaCardFen < 0 );
    _huapai1.setVisible(pl.huaCardFen >= 0);
    _huapai0.setString("/" + pl.huaCardFen  + "");
    _huapai1.setString("/" + pl.huaCardFen  + "");



    
    var Node_xifen = node.getChildByName("Node_xifen");
    var _xifen0 = Node_xifen.getChildByName("score_0");
    var _xifen1 = Node_xifen.getChildByName("score_1");
    _xifen0.ignoreContentAdaptWithSize(true);
    _xifen1.ignoreContentAdaptWithSize(true);
    _xifen0.setVisible(pl.xiFen  < 0 );
    _xifen1.setVisible(pl.xiFen  >= 0);
    _xifen0.setString("/" + pl.xiFen  + "");
    _xifen1.setString("/" + pl.xiFen  + "");
    
    var text_addScore = node.getChildByName("text_addScore");
    var text_subScore = node.getChildByName("text_subScore");
    
    text_addScore.setVisible(pl.winone >= 0);
    text_subScore.setVisible(pl.winone < 0);
    text_addScore.ignoreContentAdaptWithSize(true);
    text_subScore.ignoreContentAdaptWithSize(true);
    text_addScore.setString("+" + pl.winone + "");
    text_subScore.setString( pl.winone + "");
}

var EndOneView_chongYangDaGun = cc.Layer.extend({
    jsBind: {
        block: {
            _layout: [
                [1, 1],
                [0.5, 0.5],
                [0, 0], true
            ]
        },
        back: {
            // _layout: [
            //     [1, 1],
            //     [0.5, 0.5],
            //     [0, 0]
            // ],
            _run:function(){
                if(isIPhoneX())
                    setWgtLayout(this, [0.85,0.85],[0.5,0.5],[0,0.05], false);
                else
                    setWgtLayout(this, [1,0.84],[0.5,0.5],[0,0.05], false);
            },
            // huangzhuang: {
            //     _visible: function() {
            //         var pl = getUIPlayer(0);
            //         if (pl) {
            //             //playEffect("win");
            //             return pl.winone == 0;
            //         }
            //         return false;
            //     }
            // },
            dissType: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setVisible(MjClient.isDismiss);
                    if (MjClient.isDismiss)
                    {
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;

                        var id = tData.firstDel;
                        var pl = sData.players[id];
                        var delStr = "";
                        if(pl) {
                            var name  =  unescape(pl.info.nickname );
                            delStr = name + pl.mjdesc[0];
                        } else {
                            delStr = tData.dissolveWay == -1? '系统停服自动解散房间':'会长或管理员解散房间';
                        }
                        this.setString("" + delStr) ;
                    }
                }
            },
            // wintitle: {
            //     _visible: function() {
            //         var pl = getUIPlayer(0);
            //         if (pl) {
            //             //playEffect("win");
            //             return pl.winone >= 1;
            //         }
            //         return false;
            //     }
            // },
            // losetitle: {
            //     _visible: function() {
            //         var pl = getUIPlayer(0);
            //         if (pl) {
            //             //playEffect("lose");
            //             return pl.winone < 0;
            //         }
            //         return false;
            //     }
            // },
            // pingju: {
            //     _visible: function() {

            //         var pl = getUIPlayer(0);

            //         if (pl) {
            //             //playEffect("lose");
            //             return pl.winone == 0 && MjClient.isDismiss;
            //         }
            //         return false;
            //     },
            //     _run: function() {
            //         if (MjClient.isDismiss) {
            //             this.loadTexture("gameOver_sanDaHa/jiesan.png");
            //         }
            //     }
            // },
            shareBtn: {
                _click:function(btn,eT){
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Xiaojiesuanjiemian_Fenxiang", {uid:SelfUid()});
                    
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                    {
                        postEvent("capture_screen");
                        MjClient.endoneui.capture_screen = true;
                        btn.setTouchEnabled(false);
                    });
                }
                ,_event:{
                    captureScreen_OK: function () {
                        if (MjClient.endoneui.capture_screen != true)
                            return;
                        MjClient.endoneui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                    }
                }
            },
            readyBtn: {
                _click: function (btn, eT) {

                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if(!tData.fieldId){
                        if (sData.tData.roundNum <= 0)
                            MjClient.endoneui.getParent().addChild(new GameOverLayer_ChongYangDaGun(),500);
                    }
                    if(!tData.fieldId){
                        postEvent("clearCardUI");
                        MjClient.endoneui.removeFromParent(true);
                        MjClient.endoneui = null;
                    }
                    if (MjClient.rePlayVideo >= 0 && MjClient.replayui) {
                        MjClient.replayui.replayEnd();
                    }
                    else {
                        if (tData.fieldId){
                            // leaveGameClearUI();
                            // MjClient.Scene.addChild(new goldMatchingLayer({matching:false,gameType:tData.gameType}));
                            // MjClient.goldfieldEnter(tData.fieldId,tData.gameType);
                            // return;
                        }else{
                            PKPassConfirmToServer_card();
                        }
                    }
                    if (MjClient.arrowbkNode && cc.sys.isObjectValid( MjClient.arrowbkNode )) {
                        MjClient.arrowbkNode.setVisible(false);
                    }
                }
            },
            text_rule: {
                _run: function() {
                    //this.ignoreContentAdaptWithSize(true);
                    var tData = MjClient.data.sData.tData;
                    var str = "";
                    
                    str += tData.areaSelectMode.showHandCount == 1 ? "显示手牌数," : "" ;
                    str += (tData.areaSelectMode.huaCardNum + "张花牌,") ;
                    str += tData.areaSelectMode.fourPure510K ? "4副纯510K," : "" ;
                    str += tData.areaSelectMode.fourJokerCombination ? "4王," : "" ;
                    str += tData.areaSelectMode.fourJokerHuaCard ? "4王+花," : "" ;

                    str += tData.areaSelectMode.sevenXi ? "七喜," : "" ;
                    str += tData.areaSelectMode.eightXi ? "八喜," : "" ;

                    str += ("底分x" + tData.areaSelectMode.diFen) ; 
                    
                    if (str.charAt(str.length - 1) == ",")
                        str = str.substring(0, str.length - 1);

                    // if (rule.charAt(rule.length - 1) == ",")
                    //     rule = rule.substring(0, rule.length - 1);
                    this.setString(str);
                }
            },
            image_player_myself: {
                _run: function() {
                    SetEndOneUserUI_chongYangDaGun(this, MjClient.endoneui.offs[0]);
                }
            },
            image_player_1: {
                _run: function() {
                    SetEndOneUserUI_chongYangDaGun(this, MjClient.endoneui.offs[1]);
                },
            },
            image_player_2: {
                _run: function() {
                    SetEndOneUserUI_chongYangDaGun(this, MjClient.endoneui.offs[2]);
                }
            },
            image_player_3: {
                _run: function() {
                    SetEndOneUserUI_chongYangDaGun(this, MjClient.endoneui.offs[3]);
                }
            },
        }
    },
    ctor: function() {
        this._super();
        MjClient.endoneui = this;

        var endoneui = ccs.load("endOne_ChongYangDaGun.json");

        var offs = [];
        var tData = MjClient.data.sData.tData;
        for (var i = 0; i < MjClient.MaxPlayerNum; i ++)
        {
            var pl = getUIPlayer(i);
            if (!pl) { continue ; }

            offs.push(i);
        }
        MjClient.endoneui.offs = offs;

        BindUiAndLogic(endoneui.node, this.jsBind);
        this.addChild(endoneui.node);

        return true;
    }
});