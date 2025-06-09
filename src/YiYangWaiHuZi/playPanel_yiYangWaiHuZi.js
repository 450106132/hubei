var playLayer_yiYangWaiHuZi = playLayer_ziPai.extend({
    getJsBind: function(){
        var jsBind = {
            _event:{
                roundEnd:function () {
                    var self = this;

                    var sData = MjClient.data.sData;
                    var tData = sData.tData;

                    if (sData.tData.roundNum <= 0){
                        var layer = MjClient.playui.createGameOverLayer();
                        layer.setVisible(false);
                        self.addChild(layer,500);
                    }
                    if(!MjClient.endoneui){
                        var layer = MjClient.playui.createEndOneLayer();
                        layer.setVisible(false);
                        self.addChild(layer,500);
                    }

                    function delayExe(){
                        if(MjClient.endoneui && cc.sys.isObjectValid(MjClient.endoneui)){
                            MjClient.endoneui.visible = true;
                        }
                    }
                    var showShen = function () {
                        var layout_shenResult = MjClient.playui.jsBind.layout_shenResult;
                        layout_shenResult._node.zOrder = 400;
                        layout_shenResult._node.visible = true;

                        var img_card = layout_shenResult._node.getChildByName("img_card");
                        var img_huangZhuang = layout_shenResult._node.getChildByName("img_huangZhuang");
                        if(tData.shenJudge == -1){
                            img_card.visible = false;
                            img_huangZhuang.visible = true;
                        }else{
                            img_card.visible = true;
                            img_huangZhuang.visible = false;

                            img_card.loadTexture(MjClient.playui.getCardSrc("put", tData.shenCard));

                            var img_shenFlag = img_card.getChildByName("img_shenFlag");
                            var shenSound = ["meishen", "youshen"];
                            var fileName = ["wushen" , "youshen"];
                            img_shenFlag.loadTexture("playing/waihuzi/" + fileName[tData.shenJudge] + ".png");
                            playEffectInPlay(shenSound[tData.shenJudge]);
                        }
                    }.bind(this);
                    if(MjClient.isDismiss){
                        delayExe();
                    }else{
                        this._delayExeAction = this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(showShen), cc.delayTime(1.0), cc.callFunc(delayExe)));
                    }
                }
            },
            text_roundInfo: {
                _run: function () {
                    if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
                        this.visible = false;
                    }
                },
            },
            layout_cardNum:{
                img_shenType:{
                    _visible:false,
                    _event:{
                        initSceneData:function(){
                            MjClient.playui.checkShenTypeVisible(this);
                        },
                        HZCheckRaise:function () {
                            MjClient.playui.checkShenTypeVisible(this);
                        },
                        roundEnd:function () {
                            this.visible = false;
                        }
                    }
                }
            },
            node_left:{
                layout_head: {
                    img_chuiTips: {
                         _run: function() {
                            MjClient.playui.setChuiTips(this);
                        },
                        _event:{
                            initSceneData: function() {
                                MjClient.playui.setChuiTips(this);
                            },
                            MJJiazhu: function(msg) {
                                var pl = MjClient.playui.getUIPlayer(MjClient.playui.getUIOffByNode(this));
                                if (pl.info.uid == msg.uid) {
                                    MjClient.playui.setChuiTips(this);
                                }
                            },
                            mjhand: function() {
                                this.visible = false;
                            },
                            startShuffleCards:function () {
                                MjClient.playui.setChuiTips(this);
                            }
                        }
                    },
                    img_siShou:{
                        _visible:false,
                        _event:{
                            initSceneData:function () {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            MJPeng: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            HZChiCard: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            HZLiuCard: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            HZWeiCard: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            MJPut: function(eD){
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            roundEnd: function(eD){
                                this.visible = false;
                            }
                        }
                    },
                }
            },
            node_right:{
                layout_head: {
                    img_chuiTips: {
                         _run: function() {
                            MjClient.playui.setChuiTips(this);
                        },
                        _event:{
                            initSceneData: function() {
                                MjClient.playui.setChuiTips(this);
                            },
                            MJJiazhu: function(msg) {
                                var pl = MjClient.playui.getUIPlayer(MjClient.playui.getUIOffByNode(this));
                                if (pl.info.uid == msg.uid) {
                                    MjClient.playui.setChuiTips(this);
                                }
                            },
                            mjhand: function() {
                                this.visible = false;
                            },
                            startShuffleCards:function () {
                                MjClient.playui.setChuiTips(this);
                            }
                        }
                    },
                    img_siShou:{
                        _visible:false,
                        _event:{
                            initSceneData:function () {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            MJPeng: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            HZChiCard: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            HZLiuCard: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            HZWeiCard: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            MJPut: function(eD){
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            roundEnd: function(eD){
                                this.visible = false;
                            }
                        }
                    },
                }
            },
            node_xing:{
                layout_head: {
                    img_chuiTips: {
                         _run: function() {
                            MjClient.playui.setChuiTips(this);
                        },
                        _event:{
                            initSceneData: function() {
                                MjClient.playui.setChuiTips(this);
                            },
                            MJJiazhu: function(msg) {
                                var pl = MjClient.playui.getUIPlayer(MjClient.playui.getUIOffByNode(this));
                                if (pl.info.uid == msg.uid) {
                                    MjClient.playui.setChuiTips(this);
                                }
                            },
                            mjhand: function() {
                                this.visible = false;
                            },
                            startShuffleCards:function () {
                                MjClient.playui.setChuiTips(this);
                            }
                        }
                    },
                    img_siShou:{
                        _visible:false,
                        _event:{
                            initSceneData:function () {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            MJPeng: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            HZChiCard: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            HZLiuCard: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            HZWeiCard: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            MJPut: function(eD){
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            roundEnd: function(eD){
                                this.visible = false;
                            }
                        }
                    },
                }
            },
            node_down:{
                _event: {
                    EZP_cardType: function(eD) {
                        MjClient.playui.changeHandCardSize(this.getChildByName("img_handCard"));
                        var layoutHand = this.getChildByName("layout_handCards");
                        if (layoutHand) {
                            layoutHand.removeAllChildren();
                        }
                        MjClient.playui.refreshHandCard(0);
                        MjClient.playui.changeCardFrame(this, eD.type);
                    }
                },
                layout_head: {
                    img_chuiTips: {
                         _run: function() {
                            MjClient.playui.setChuiTips(this);
                        },
                        _event:{
                            initSceneData: function() {
                                MjClient.playui.setChuiTips(this);
                            },
                            MJJiazhu: function(msg) {
                                var pl = MjClient.playui.getUIPlayer(MjClient.playui.getUIOffByNode(this));
                                if (pl.info.uid == msg.uid) {
                                    MjClient.playui.setChuiTips(this);
                                }
                            },
                            mjhand: function() {
                                this.visible = false;
                            },
                            startShuffleCards:function () {
                                MjClient.playui.setChuiTips(this);
                            }
                        }
                    },
                    img_siShou:{
                        _visible:false,
                        _event:{
                            initSceneData:function () {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            MJPeng: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            HZChiCard: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            HZLiuCard: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            HZWeiCard: function(eD) {
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            MJPut: function(eD){
                                MjClient.playui.checkSiShouVisible(this);
                            },
                            roundEnd: function(eD){
                                this.visible = false;
                            }
                        }
                    },
                },
                img_putCard: {
                    _layout: [[0.35, 0.35], [0.65, 0.6], [0, 0]],
                },
            },
            img_banner:{
                btn_setting: {
                    _click: function() {
                        cc.log("btn_setting");
                        MjClient.Scene.addChild(new settingPanel_yiYangWaiHuZi(), 6000);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi", {uid:SelfUid(),gameType:MjClient.gameType});
                    }
                },
                btn_changeBg: {
                    _run: function () {
                        if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
                            this.loadTextureNormal("playing/ziPaiBanner/wenhao.png");
                            this.setContentSize(this.getNormalTextureSize());
                        } else {
                            this.visible = !MjClient.playui.isCoinField();
                        }
                    },
                    _click: function () {
                        if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
                            postEvent("EZP_rule");
                        } else {
                            MjClient.playui.changeGameBgToNext();
                        }
                    }
                },
            },
            node_eatChoice: {
                btn_wai:{
                    _visible: false,
                    _layout: [[0, 0.1],[0.5, 0],[0, 2.5]],
                    bg_img:{
                        _run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _touch: function(btn, eT) {
                        console.log(">>>> lf，点击歪按钮");
                        if (eT == 2){
                            MjClient.playui.hideEatBtns();
                            MjClient.gamenet.request("pkroom.handler.tableMsg", {
                                cmd: "HZWeiCard"
                            });
                        }
                    }
                },
                btn_liu:{
                    _visible: false,
                    _layout: [[0, 0.1],[0.5, 0],[0, 2.5]],
                    bg_img:{
                        _run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _touch: function(btn, eT) {
                        console.log(">>>> lf，点击溜按钮");
                        if (eT == 2){
                            MjClient.playui.showSelectCards("liu");
                        }
                    }
                },
                btn_piao:{
                    _visible: false,
                    _layout: [[0, 0.1],[0.5, 0],[0, 2.5]],
                    bg_img:{
                        _run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _touch: function(btn, eT) {
                        console.log(">>>> lf，点击飘按钮");
                        if (eT == 2){
                            MjClient.playui.showSelectCards("piao");
                        }
                    }
                },
                img_liuSelect: {
                    _visible: false,
                    _run: function() {
                        setWgtLayout(this, [0, 0.38], [0.5, 0.76], [0, 0]);
                        this.initLiuBgSize = this.getContentSize();
                        this.initLiuBgScale = this.scale;
                    }
                },
            },
            btns_piao:{
                _visible:false,
                _layout: [[0.006, 0.006], [0.5, 0.5], [0, 0]],
                _run:function() {
                },
                _event: {
                    initSceneData: function() {
                       MjClient.playui.showPiaoBtns(this);
                    },
                    waitJiazhu:function (msg) {
                        var pl = MjClient.playui.getUIPlayer(0);
                        pl.piaoFen = -1;
                        MjClient.playui.showPiaoBtns(this);
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
                        var pl = MjClient.playui.getUIPlayer(0);
                        MjClient.playui.paioFenToServer(0);
                    },
                },
                btn_piao1: {
                    _click:function() {
                        var pl = MjClient.playui.getUIPlayer(0);
                        MjClient.playui.paioFenToServer(1);
                    },
                },
                btn_piao2: {
                    _click:function() {
                        var pl = MjClient.playui.getUIPlayer(0);
                        MjClient.playui.paioFenToServer(2);
                    },
                },
                btn_piao3: {
                    _click:function() {
                        var pl = MjClient.playui.getUIPlayer(0);
                        MjClient.playui.paioFenToServer(3);
                    },
                },
            },
            btn_chat: {
                _run: function() {
                    //重载
                    this.changeLayout = function() {
                        if (MjClient.playui.getPlayersNum() == 4) {return;}
                        setWgtLayout(this, [55 / 1280, 0], [0.97, 0.187], [0, 0]);
                    }

                },
            },
            btn_voice: {
                _run: function() {
                    this.visible = !MjClient.playui.isCoinField();
                    initVoiceData();
                    cc.eventManager.addListener(getTouchListener(), this);
                    if (MjClient.isShenhe) this.visible = false;

                    //重载
                    this.changeLayout = function() {
                        if (MjClient.playui.getPlayersNum() == 4) {return;}
                        setWgtLayout(this, [43 / 1280, 0], [0.91, 0.1875], [0, 0]);
                    }
                }
            },
            btn_sort:{
                _click: function() {
                    if (!MjClient.playui.isInPlay()) {
                        return;
                    }
                    MjClient.HandCardArr = MjClient.majiang.sortByUser();
                    MjClient.playui.refreshHandCard(0);
                },
            },
            layout_shenResult:{
                _layout: [[1, 0], [0.5, 0.5], [0, 0]],
                _visible:false,
                _run: function(){
                    this.zIndex = 100;
                },
                _event:{
                    clearCardUI: function() {
                        this.visible = false;
                    },
                    initSceneData:function () {
                        this.visible = false;
                    },
                    mjhand:function () {
                        this.visible = false;
                    }
                }
            },
        };
        return jsBind;
    },
    ctor: function() {
        this._super("Play_ZiPaiYiYangWaiHuZi.json");

        if (MjClient.data.sData.tData.areaSelectMode["convertible"] && MjClient.rePlayVideo == -1){
            addFreeNumberBtn([0.5, 0.4]);
        }

        if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
            MjClient.playui.jsBind._node.addChild(new roundRule_ziPai(roundRule_ziPai.getRoundRules()));
        }
        return true;
    },
});

playLayer_yiYangWaiHuZi.prototype.initSettingData = function() {
    MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT = MjClient.gameType + "_KEY_ZI_PAI_PLAY_UI_LAYOUT";   //字牌布局
    MjClient.KEY_ZI_PAI_GAME_BG_TYPE = MjClient.gameType + "_KEY_ZI_PAI_GAME_BG_TYPE";   //字牌游戏背景类型
    MjClient.KEY_ZI_PAI_ZI_PAI_TYPE = MjClient.gameType + "_KEY_ZI_PAI_ZI_PAI_TYPE";   //字牌游戏字体类型
    MjClient.KEY_ZI_PAI_VOICE_TYPE = MjClient.gameType + "_KEY_ZI_PAI_VOICE_TYPE"; // 字牌游戏语音

    MjClient.KEY_ZI_PAI_FAST_EAT_TYPE = MjClient.gameType + "_KEY_ZI_PAI_FAST_EAT_TYPE";   //字牌游戏快速吃牌类型
    MjClient.KEY_ZI_PAI_XU_XIAN_TYPE = MjClient.gameType + "_KEY_ZI_PAI_XU_XIAN_TYPE";   //字牌游戏 虚线位置
    MjClient.KEY_ZI_PAI_SU_DU_TYPE = MjClient.gameType + "_KEY_ZI_PAI_SU_DU_TYPE";   //字牌游戏 动画速度
    MjClient.KEY_ZI_PAI_CARD_SIZE = MjClient.gameType + "_KEY_ZI_PAI_CARD_SIZE"; // 字牌大小
    MjClient.KEY_ZI_PAI_PLAY_TING_PAI = MjClient.gameType + "_KEY_ZI_PAI_PLAY_TING_PAI";   //听牌提示
    MjClient.KEY_ZI_PAI_HU_XI_TYPE = MjClient.gameType + "_KEY_ZI_PAI_HU_XI_TYPE";   //胡息显示
    MjClient.KEY_ZI_PAI_CHU_PAI_TYPE = MjClient.gameType + "_KEY_ZI_PAI_CHU_PAI_TYPE";   //字牌出牌按钮
    MjClient.KEY_ZI_PAI_CHU_PAI_GUIDE = MjClient.gameType + "_KEY_ZI_PAI_CHU_PAI_GUIDE";   //字牌出牌提示
};

//Override
playLayer_yiYangWaiHuZi.prototype.createGameOverLayer = function(type) {
    return new GameOverLayer_YiYangWaiHuZi();
};

//Override
playLayer_yiYangWaiHuZi.prototype.createEndOneLayer = function(type) {
    return new EndOneView_YiYangWaiHuZi();
};

//Override
playLayer_yiYangWaiHuZi.prototype.getGameBgList = function() {
    return ["playing/paohuziTable/beijing_1.jpg", "playing/paohuziTable/beijing_2.jpg", "playing/paohuziTable/beijing_3.jpg", "playing/paohuziTable/beijing_4.jpg"];
};

//飘分
playLayer_yiYangWaiHuZi.prototype.paioFenToServer = function(index) {
    var tData = MjClient.data.sData.tData;
    if (tData.areaSelectMode.piaoFen == 0){
        return;
    }
    var piaoFen = [[0,1,2,3],[0,2,3,5]][tData.areaSelectMode.piaoFen - 1][index];
    if (piaoFen == undefined){
        piaoFen = 0;
    }
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJJiazhu",
        piaoFen: piaoFen,
    });
}

//飘风操作的提示显示
playLayer_yiYangWaiHuZi.prototype.setChuiTips = function(node) {
    node.visible = false;
    var tData = MjClient.data.sData.tData;
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl || pl.piaoFen == undefined  || pl.piaoFen < 0 || tData.areaSelectMode.piaoFen == 0) {
        return;
    }

    if (tData.tState == TableState.waitJiazhu) {
        node.visible = true;
        node.loadTexture("playing/chenzhouzipai/xian_piao" + pl.piaoFen + ".png");
    }
};

//显示飘风按钮
playLayer_yiYangWaiHuZi.prototype.showPiaoBtns = function(node) {
    node.visible = false;
    var tData = MjClient.data.sData.tData;
    var pl = this.getUIPlayer(0);
    if (!pl) {return;}
    
    if (tData.tState == TableState.waitJiazhu && pl.piaoFen == -1 && tData.areaSelectMode.piaoFen > 0) {
        node.visible = true;
        var piaoRes = [[1,2,3],[2,3,5]][tData.areaSelectMode.piaoFen - 1];
        for (var i = 0; i < 3; ++ i){
            var btn = node.getChildByName("btn_piao" + (i + 1));
            if (btn){
                btn.loadTextureNormal("playing/chenzhouzipai/piao" + piaoRes[i] + ".png");
                btn.loadTexturePressed("playing/chenzhouzipai/piao" + piaoRes[i] + "_s.png");
            }
        }
    }
};

//Override
playLayer_yiYangWaiHuZi.prototype.checkChuiFlagVisible = function(node) {
    node.visible = false;
    var tData = MjClient.data.sData.tData;
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);

    if (!pl || pl.piaoFen == undefined  || pl.piaoFen < 0 || tData.areaSelectMode.piaoFen == 0) {
        return;
    }

    if (tData.tState == TableState.waitCard || tData.tState == TableState.waitEat || tData.tState == TableState.waitPut || tData.tState == TableState.waitShuffle) {
        node.visible = true;
        if(pl.piaoFen > 0) {
            node.loadTexture("playing/ziPaiBanner/piao" + pl.piaoFen + ".png");
        }else{
            node.loadTexture("playing/ziPaiBanner/bupiao.png");
        }
    }
};

playLayer_yiYangWaiHuZi.prototype.getInitDiPaiCount = function() {
    var tData = MjClient.data.sData.tData;
    return MjClient.majiang.getAllCardsTotal() -  tData.maxPlayer * 20;
};

playLayer_yiYangWaiHuZi.prototype.is34Mask = function() {
    return false;
};

playLayer_yiYangWaiHuZi.prototype.checkCardCanPut = function(pl, card) {
    var tData  = MjClient.data.sData.tData;
    return (!pl.canNotPutCard || ((pl.canNotPutCard.indexOf(card) == -1 && !tData.areaSelectMode.isSiShou) || tData.areaSelectMode.isSiShou) || MjClient.majiang.getCanPutCardNum(pl) == 0)
};

playLayer_yiYangWaiHuZi.prototype.checkPutSpecil = function () {
    var pl = this.getUIPlayer(0);
    var tData  = MjClient.data.sData.tData;
    return ((pl.eatFlag & 16) || (pl.eatFlag & 4)) && pl.mjhand.length % 3 == 2 && !(MjClient.majiang.getCanPutCardNum(pl) == 0) && tData.tState == TableState.waitEat && pl.mjState == TableState.waitEat;
};

//字牌字体列表
playLayer_yiYangWaiHuZi.prototype.getCardFontList = function() {
    return ["playing/paohuzi", "playing/paohuzi/MJBg1", "playing/paohuzi/MJBg2", "playing/paohuzi/MJBg5"];
};

//字牌资源路径
playLayer_yiYangWaiHuZi.prototype.getCardFilePath = function() {
    var fontList = this.getCardFontList();
    var fontIdx = this.getCardFontIdx();

    return fontList[fontIdx] + "/";
};

// 改变手牌大小
playLayer_yiYangWaiHuZi.prototype.changeHandCardSize = function(handCard) {
    var src = this.getCardSrc("hand", 1)
    //handCard.loadTexture(src, this.getResType());
    this.loadCardTexture(handCard, src, this.getResType());
    var wFactor = [98, 95, 100, 103][ziPai.getZiPaiType()] * [[0.89, 0.77, 0.97], [0.92, 0.79, 1], [0.87, 0.75, 0.95], [0.84, 0.73, 0.92]][ziPai.getZiPaiType()][ziPai.getCardSize()];
    setWgtLayout(handCard, [wFactor / 1280, 0],[0.27,0.75],[0,0]);
};

playLayer_yiYangWaiHuZi.prototype.getDefaultSetting = function() {
    return {
        layout: 0,
        bg: 1,
        pai: 1,
        fastEat: 0,
        huXi: 1,
        xuXian: 0,
        suDu: 0,
        size: 0,
        voice: 0,
        ting: 0,
        chuBtn: 0,
        dblClick: 1,
        chuGuide:0,
    };
};

playLayer_yiYangWaiHuZi.prototype.getMaxColumnCount = function(card){
    return 11;
};

playLayer_yiYangWaiHuZi.prototype.getPutCardBg = function (putType) {
    return putType == 0 ? "playing/paohuzi/mopai_bj.png" : "playing/paohuzi/mopai_bj_no_effect.png";
};

playLayer_yiYangWaiHuZi.prototype.getHandCardSize = function()
{
    var handCard = this.getUINode(0).getChildByName("img_handCard");
    var size = handCard.getVirtualRendererSize();
    if (this.getCardFontIdx() == 2) {
        size.width = 100;
    }
    return size;
}

playLayer_yiYangWaiHuZi.prototype.getOffYByCard = function(card){
    if (this.getCardFontIdx() == 2) {
        return card.height * card.scaleY - card.height / 7 * card.scaleY;
    }
    return card.height * card.scaleY - card.height / 4 * card.scaleY;
}

// 获取操作按钮数组
playLayer_yiYangWaiHuZi.prototype.getShowEatNodes = function() {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var eat = MjClient.playui.jsBind.node_eatChoice;
    var pl = sData.players[SelfUid() + ""];
    if (!pl) {
        return;
    }

    if (tData.tState == TableState.roundFinish) {
        return [];
    }

    var vnode = [];

    if (pl.eatFlag & 1) { // 吃
        vnode.push(eat.btn_chi._node);
    }

    //飘
    if(pl.eatFlag & 4){
        vnode.push(eat.btn_piao._node);
    }

    //溜
    if(pl.eatFlag & 16){
        vnode.push(eat.btn_liu._node);
    }

    //歪
    if(pl.eatFlag & 8){
        vnode.push(eat.btn_wai._node);
    }

    if (pl.eatFlag & 32) { // 胡
        vnode.push(eat.btn_hu._node);
    }

    if (pl.eatFlag & 2) { // 碰
        vnode.push(eat.btn_peng._node);
    }

    if(vnode.length > 0
        && !((pl.eatFlag & 8) && (pl.eatFlag & 32) && tData.areaSelectMode.isKaWai)
        && !(!tData.areaSelectMode.isSiShou && ((pl.eatFlag & 16) || (pl.eatFlag & 4)) && pl.mjhand.length % 3 == 2 && MjClient.majiang.getCanPutCardNum(pl) == 0)){
        vnode.push(eat.btn_guo._node);
    }

    return vnode;
};

playLayer_yiYangWaiHuZi.prototype.getChiCards = function () {
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];
    var putCard = sData.tData.lastPutCard;
    return MjClient.majiang.getChiList(pl, putCard);
};

playLayer_yiYangWaiHuZi.prototype.addOutFrame = function (outCard, pl, index) {
    if(pl.mjputType[index] == 0){
        var frame = new ccui.ImageView("playing/paohuziTable/putCardFrame.png");
        frame.x = outCard.width / 2;
        frame.y = outCard.height / 2;
        outCard.addChild(frame);
    }
}

playLayer_yiYangWaiHuZi.prototype.showSelectEatCards = function () {
   this.showSelectCards("chi");
}

playLayer_yiYangWaiHuZi.prototype.addSelectEatBtns = function(type, selectBg, selectCards) {
    var selectBtns = [];
    var children = selectBg.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].getName() == "cloneBtn") {
            children[i].removeFromParent(true);
        }
    }

    var off_x = 5;
    var selectBtn = selectBg.getChildByName("btn_select");
    var startPos = selectBtn.getPosition();

    var initChiBgSize = type == "chi" ? MjClient.playui.jsBind.node_eatChoice.img_chiSelect._node.initChiBgSize : MjClient.playui.jsBind.node_eatChoice.img_liuSelect._node.initLiuBgSize;
    var off_width = (initChiBgSize.width - selectBtn.width) / 2;
    selectBg.width = selectBtn.width * selectCards.length + (selectCards.length - 1) * off_x + off_width * 2;

    for (var i = 0; i < selectCards.length; i++) {
        var cardList = this.sortSelectEatCards(selectCards[i]);
        var cloneBtn = selectBtn.clone();
        cloneBtn.visible = true;
        cloneBtn.setName("cloneBtn");
        for (var k = 0; k < cardList.length; k++) {
            var card = cardList[k];
            var cardNode = cloneBtn.getChildByName("img_card" + k);
            cardNode.visible = true;
            var src = this.getCardSrc("hand", card)
            //cardNode.loadTexture(src, this.getResType());
            this.loadCardTexture(cardNode, src, this.getResType());
            cardNode.zIndex = cardList.length - k;
            if(k == cardList.length - 1 && type == "chi") {
                cardNode.setColor(cc.color(170, 170, 170));
            }
        }

        cloneBtn.setPosition(cc.p(startPos.x + (cloneBtn.width + off_x) * i, startPos.y));
        selectBg.addChild(cloneBtn);
        selectBtns.push(cloneBtn);
    }
    return selectBtns;
};

playLayer_yiYangWaiHuZi.prototype.showSelectCards = function (type) {
    var self = this;
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];

    this.hideEatBtns();
    MjClient.playui.jsBind.node_eatChoice.btn_cancel._node.visible = true;

    var selectBgArr = {
        "chi": MjClient.playui.jsBind.node_eatChoice.img_chiSelect._node,
        "liu": MjClient.playui.jsBind.node_eatChoice.img_liuSelect._node,
        "piao": MjClient.playui.jsBind.node_eatChoice.img_liuSelect._node,
    };

    var bShowEatCardsScaleAction = false; //是否执行缩放动画

    //添加一组可以吃或比的牌
    var addSelectEatCardsRow = function() {
        var selectBg = selectBgArr[type];
        selectBg.visible = true;
        selectBg.x = cc.winSize.width * 0.5;

        if (type == "chi") {
            var optionCards = self.getChiCards();
        } else if (type == "liu"){
            var optionCards = [];
            if(pl.liuCards.length <= 0 && tData.lastPutCard != -1){
                pl.liuCards.push(tData.lastPutCard);
            }
            for(var i = 0; i < pl.liuCards.length; i++){
                optionCards.push(Array.apply(null, Array(4)).map(() => pl.liuCards[i]));
            }
        }else{
            var optionCards = [];
            if(pl.piaoCards.length <= 0 && tData.lastPutCard != -1){
                pl.piaoCards.push(tData.lastPutCard);
            }
            for(var i = 0; i < pl.piaoCards.length; i++){
                optionCards.push(Array.apply(null, Array(4)).map(() => pl.piaoCards[i]));
            }
        }
        if (!optionCards || optionCards.length == 0) {
            return;
        }

        var optionBtns = self.addSelectEatBtns(type, selectBg, optionCards);
        for (var i = 0; i < optionBtns.length; ++i) {
            var btn = optionBtns[i];
            (function(cards) {
                btn.addClickEventListener(function(btn) {
                    if(type == "chi"){
                        self.commitEatCard(cards);
                    }else{
                        if ((MjClient.data.sData.players[SelfUid()].eatFlag & 32) > 0) {
                            MjClient.showMsg({liu : "溜", piao : "飘"}[type] + "牌后视为过胡，确定吃吗？", function() {
                                MjClient.playui.hideEatBtns();
                                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                                    cmd: "HZLiuCard",
                                    card: cards[0],
                                    optFlag:(type == "liu" ? 16 : 4)
                                });
                            }, function() {}, "1");
                        } else {
                            MjClient.playui.hideEatBtns();
                            MjClient.gamenet.request("pkroom.handler.tableMsg", {
                                cmd: "HZLiuCard",
                                card: cards[0],
                                optFlag:(type == "liu" ? 16 : 4)
                            });
                        }
                    }
                });
            })(optionCards[i]);
        }
        var bgArr = [];
        bgArr.push(selectBgArr[type])
        self.doSelectEatAction(bgArr, bShowEatCardsScaleAction);
    };
    addSelectEatCardsRow();
}

playLayer_yiYangWaiHuZi.prototype.calculateHuXi = function(off) {
    return UpdateHuXi_YiYangWaiHuZi(off)
};

playLayer_yiYangWaiHuZi.prototype.getShowCardIndex = function(eatType, off) {
    var uiNode = this.getUINode(off);
    var index = 0;
    if (uiNode.getName() == "node_down" || uiNode.getName() == "node_xing") {
        if (eatType == "mjwei") {
            index = 2;
        } else if (eatType == "mjgang1" || eatType == "mjgang2") {
            index = 3;
        }
    }
    return index;
};

playLayer_yiYangWaiHuZi.prototype.getEatCardShowType = function(eatType, card, cardIndex, off) {
    var showType = 2;
    if (eatType == "mjchi") {
        showType = cardIndex < 2 ? 2 : 3;
    } else if (eatType == "mjwei") {
        showType = this.getShowCardIndex(eatType, off) == cardIndex ? 2 : 0;
    }else if (eatType == "mjgang1") {
        var pl = this.getUIPlayer(off);
        showType = this.getShowCardIndex(eatType, off) == cardIndex ? 2 : 0;
    }else if (eatType == "mjgang2") {
        var pl = this.getUIPlayer(off);
        showType = (pl.info.uid == SelfUid() && this.getShowCardIndex(eatType, off) == cardIndex) ? 2 : 0;
    }
    return showType;
};

playLayer_yiYangWaiHuZi.prototype.getEatLabel = function(eatType) {
    return {mjwei : "playing/paohuzi/t_wai.png", mjgang0 : "playing/paohuzi/t_piao.png", mjgang1 : "playing/paohuzi/t_liu.png", mjgang2 : "playing/paohuzi/t_liu.png"}[eatType];
};

playLayer_yiYangWaiHuZi.prototype.hasTingByPut = function() {
    return true;
};

playLayer_yiYangWaiHuZi.prototype.apartGangType = function(eatType, msg) {
    var eatType = eatType;
    if (eatType == "mjgang") {
        if (msg.type == 1) {
            if(msg.liuType == 2){
                eatType = "mjgang2";
            }else{
                eatType = "mjgang1";
            }
        } else {
            eatType = "mjgang0";
        }
    }
    return eatType;
};

playLayer_yiYangWaiHuZi.prototype.isCheckTingStats = function() {
    return true;
}

playLayer_yiYangWaiHuZi.prototype.getTingStats = function(putCard) {
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];
    return MjClient.majiang.getTingStats(sData, pl, putCard);
}

playLayer_yiYangWaiHuZi.prototype.changeCardFrame = function(node, type) {
    var childArray = node.getChildren();
    var len = childArray.length;
    for (var i = 0; i < len; i++) {
        var child = childArray[i];
        this.changeCardFrame(child, type);
    }

    if (node.toString() != "[object ImageView]") {
        return;
    }

    var oldFile = node.getRenderFile().file;

    var list = this.getCardFontList();
    var idx = this.getCardFontIdx();

    var newFile = oldFile;
    for (var i = list.length - 1; i >= 0; i--) {
        if (oldFile.indexOf(list[i]) != -1) {
            newFile = oldFile.replace(list[i], list[idx]);
            break;
        }
    }

    if (newFile != oldFile && ((jsb.fileUtils.isFileExist(newFile) && this.getResType() == 0) || this.getResType() == 1)) {
        //node.loadTexture(newFile, (node.getParent().getName() == "img_putCard" || (this.isShowLongCard() && node == MjClient.movingCard_paohuzi)) ? 0 : this.getResType());
        this.loadCardTexture(node, newFile, (node.getParent().getName() == "img_putCard" || (this.isShowLongCard() && node == MjClient.movingCard_paohuzi)) ? 0 : this.getResType())
    }
};

playLayer_yiYangWaiHuZi.prototype.isOtherWei = function(card){
    return false;
}

playLayer_yiYangWaiHuZi.prototype.checkShenTypeVisible = function(node){
    var tData = MjClient.data.sData.tData;
    if(!this.isInPlay()){
        return;
    }
    node.visible = true;
    if(tData.shenType == 0){
        node.loadTexture("playing/waihuzi/shuangshen.png");
    }else{
        node.loadTexture("playing/waihuzi/danshen.png");
    }
}

playLayer_yiYangWaiHuZi.prototype.checkSiShouVisible = function(node){
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    node.visible = false;
    if(!this.isInPlay()){
        return;
    }
    if(pl && pl.isDead){
        node.visible = true;
    }
}

playLayer_yiYangWaiHuZi.prototype.checkCanNotPutCardMask = function(){
    return !MjClient.data.sData.tData.areaSelectMode.isSiShou;
}

playLayer_yiYangWaiHuZi.prototype.isShowLongCard = function(){
    return true
}

