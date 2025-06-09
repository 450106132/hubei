var playLayer_yueYangWaiHuZi = playLayer_ziPai.extend({
    getJsBind: function(){
        var jsBind = {
            text_roundInfo: {
                _run: function () {
                    if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
                        this.visible = false;
                    }
                },
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
                },
                img_putCard: {
                    _layout: [[0.35, 0.35], [0.65, 0.6], [0, 0]],
                }
            },
            img_banner:{
                btn_setting: {
                    _click: function() {
                        cc.log("btn_setting");
                        MjClient.Scene.addChild(new settingPanel_yueYangWaiHuZi(), 6000);
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
                            if ((MjClient.data.sData.players[SelfUid()].eatFlag & 32) > 0) {
                                MjClient.showMsg("选择歪后视为过胡，确定歪吗？", function() {
                                    MjClient.playui.hideEatBtns();
                                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                                        cmd: "HZWeiCard"
                                    });
                                }, function() {}, "1");
                            } else {
                                MjClient.playui.hideEatBtns();
                                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                                    cmd: "HZWeiCard"
                                });
                            }
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
        };
        return jsBind;
    },
    ctor: function() {
        this._super("Play_ZiPaiYueYangWaiHuZi.json");
        if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
            MjClient.playui.jsBind._node.addChild(new roundRule_ziPai(roundRule_ziPai.getRoundRules()));
        }
        return true;
    },
});

playLayer_yueYangWaiHuZi.prototype.initSettingData = function() {
    MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT_YUE_YANG_WAI_HU_ZI";   //字牌布局
    MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE_YUE_YANG_WAI_HU_ZI";   //字牌游戏背景类型
    MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE_YUE_YANG_WAI_HU_ZI";   //字牌类型
    MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE_YUE_YANG_WAI_HU_ZI";   //字牌游戏 动画速度
    MjClient.KEY_ZI_PAI_PLAY_TING_PAI  = "KEY_ZI_PAI_PLAY_TING_PAI_YUE_YANG_WAI_HU_ZI";   //听牌提示
    MjClient.KEY_ZI_PAI_VOICE_TYPE = "KEY_ZI_PAI_VOICE_TYPE_YUE_YANG_WAI_HU_ZI"; // 字牌游戏语音
    MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE_YUE_YANG_WAI_HU_ZI"; // 字牌大小
    MjClient.KEY_ZI_PAI_CHU_PAI_GUIDE = "KEY_ZI_PAI_CHU_PAI_GUIDE_YUE_YANG_WAI_HU_ZI"; // 出牌提示
};

//Override
playLayer_yueYangWaiHuZi.prototype.createGameOverLayer = function(type) {
    return new GameOverLayer_YueYangWaiHuZi();
};

//Override
playLayer_yueYangWaiHuZi.prototype.createEndOneLayer = function(type) {
    return new EndOneView_YueYangWaiHuZi();
};

//Override
playLayer_yueYangWaiHuZi.prototype.getGameBgList = function() {
    return ["playing/paohuziTable/beijing_1.jpg", "playing/paohuziTable/beijing_2.jpg", "playing/paohuziTable/beijing_3.jpg", "playing/paohuziTable/beijing_4.jpg"];
};

//飘分
playLayer_yueYangWaiHuZi.prototype.paioFenToServer = function(index) {
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
playLayer_yueYangWaiHuZi.prototype.setChuiTips = function(node) {
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
playLayer_yueYangWaiHuZi.prototype.showPiaoBtns = function(node) {
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
playLayer_yueYangWaiHuZi.prototype.checkChuiFlagVisible = function(node) {
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

playLayer_yueYangWaiHuZi.prototype.getInitDiPaiCount = function() {
    var tData = MjClient.data.sData.tData;
    return MjClient.majiang.getAllCardsTotal() -  tData.maxPlayer * 20;
};

playLayer_yueYangWaiHuZi.prototype.is34Mask = function() {
    return false;
};

playLayer_yueYangWaiHuZi.prototype.checkCardCanPut = function(pl, card) {
    return (!pl.canNotPutCard || pl.canNotPutCard.indexOf(card) == -1 || MjClient.majiang.getCanPutCardNum(pl) == 0);
};

playLayer_yueYangWaiHuZi.prototype.checkPutSpecil = function () {
    var pl = this.getUIPlayer(0);
    var tData  = MjClient.data.sData.tData;
    return (pl.eatFlag & 16) && pl.mjhand.length % 3 == 2 && !(MjClient.majiang.getCanPutCardNum(pl) == 0) && tData.tState == TableState.waitEat && pl.mjState == TableState.waitEat;
};

//字牌字体列表
playLayer_yueYangWaiHuZi.prototype.getCardFontList = function() {
    return ["playing/paohuzi", "playing/paohuzi/MJBg1", "playing/paohuzi/MJBg2", "playing/paohuzi/MJBg3"];
};

//字牌资源路径
playLayer_yueYangWaiHuZi.prototype.getCardFilePath = function() {
    var fontList = this.getCardFontList();
    var fontIdx = this.getCardFontIdx();

    return fontList[fontIdx] + "/";
};

// 改变手牌大小
playLayer_yueYangWaiHuZi.prototype.changeHandCardSize = function(handCard) {
    var src = this.getCardSrc("hand", 1)
    //handCard.loadTexture(src, this.getResType());
    this.loadCardTexture(handCard, src, this.getResType());
    var wFactor = [98, 95, 100, 103][ziPai.getZiPaiType()] * [[0.89, 0.77, 0.97], [0.92, 0.79, 1], [0.87, 0.75, 0.95], [0.84, 0.73, 0.92]][ziPai.getZiPaiType()][ziPai.getCardSize()];
    setWgtLayout(handCard, [wFactor / 1280, 0],[0.27,0.75],[0,0]);
};

playLayer_yueYangWaiHuZi.prototype.getDefaultSetting = function() {
    return {
        layout: 0,
        bg: 0,
        pai: 1,
        fastEat: 1,
        huXi: 1,
        xuXian: 0,
        suDu: 1,
        size: 2,
        voice: 0,
        ting: 0,
        chuBtn: 0,
        dblClick: 1,
        chuGuide:0,
    };
};

playLayer_yueYangWaiHuZi.prototype.getMaxColumnCount = function(card){
    return 11;
};

playLayer_yueYangWaiHuZi.prototype.getPutCardBg = function (putType) {
    return putType == 0 ? "playing/paohuzi/mopai_bj.png" : "playing/paohuzi/mopai_bj_no_effect.png";
};

playLayer_yueYangWaiHuZi.prototype.getHandCardSize = function()
{
    var handCard = this.getUINode(0).getChildByName("img_handCard");
    var size = handCard.getVirtualRendererSize();
    if (this.getCardFontIdx() == 2) {
        size.width = 100;
    }
    return size;
}

playLayer_yueYangWaiHuZi.prototype.getOffYByCard = function(card){
    if (this.getCardFontIdx() == 2) {
        return card.height * card.scaleY - card.height / 7 * card.scaleY;
    }
    return card.height * card.scaleY - card.height / 4 * card.scaleY;
}

// 获取操作按钮数组
playLayer_yueYangWaiHuZi.prototype.getShowEatNodes = function() {
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

    if (pl.eatFlag & 32) { // 胡
        vnode.push(eat.btn_hu._node);
    }

    if (pl.eatFlag & 2) { // 碰
        vnode.push(eat.btn_peng._node);
    }

    if (pl.eatFlag & 1) { // 吃
        vnode.push(eat.btn_chi._node);
    }

    //歪
    if(pl.eatFlag & 8){
        vnode.push(eat.btn_wai._node);
    }

    //溜
    if(pl.eatFlag & 16){
        vnode.push(eat.btn_liu._node);
    }

    if(vnode.length > 0
        && !((pl.eatFlag & 8) && (pl.eatFlag & 32) && tData.areaSelectMode.isKaWai)
        && !((pl.eatFlag & 16) && pl.mjhand.length % 3 == 2 && MjClient.majiang.getCanPutCardNum(pl) == 0)){
        vnode.push(eat.btn_guo._node);
    }

    return vnode;
};

playLayer_yueYangWaiHuZi.prototype.getChiCards = function () {
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];
    var putCard = sData.tData.lastPutCard;
    return MjClient.majiang.getChiList(pl, putCard);
};

playLayer_yueYangWaiHuZi.prototype.addOutFrame = function (outCard, pl, index) {
    if(pl.mjputType[index] == 0){
        var frame = new ccui.ImageView("playing/paohuziTable/putCardFrame.png");
        frame.x = outCard.width / 2;
        frame.y = outCard.height / 2;
        outCard.addChild(frame);
    }
}

playLayer_yueYangWaiHuZi.prototype.showSelectEatCards = function () {
   this.showSelectCards("chi");
}

playLayer_yueYangWaiHuZi.prototype.addSelectEatBtns = function(type, selectBg, selectCards) {
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

playLayer_yueYangWaiHuZi.prototype.showSelectCards = function (type) {
    var self = this;
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];

    this.hideEatBtns();
    MjClient.playui.jsBind.node_eatChoice.btn_cancel._node.visible = true;

    var selectBgArr = {
        "chi": MjClient.playui.jsBind.node_eatChoice.img_chiSelect._node,
        "liu": MjClient.playui.jsBind.node_eatChoice.img_liuSelect._node,
    };

    var bShowEatCardsScaleAction = false; //是否执行缩放动画

    //添加一组可以吃或比的牌
    var addSelectEatCardsRow = function() {
        var selectBg = selectBgArr[type];
        selectBg.visible = true;
        selectBg.x = cc.winSize.width * 0.5;

        if (type == "chi") {
            var optionCards = self.getChiCards();
        } else {
            var optionCards = [];
            if(pl.liuCards.length <= 0 && tData.lastPutCard != -1){
                pl.liuCards.push(tData.lastPutCard);
            }
            for(var i = 0; i < pl.liuCards.length; i++){
                optionCards.push(Array.apply(null, Array(4)).map(() => pl.liuCards[i]));
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
                            MjClient.showMsg("溜牌后视为过胡，确定吃吗？", function() {
                                MjClient.playui.hideEatBtns();
                                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                                    cmd: "HZLiuCard",
                                    card: cards[0]
                                });
                            }, function() {}, "1");
                        } else {
                            MjClient.playui.hideEatBtns();
                            MjClient.gamenet.request("pkroom.handler.tableMsg", {
                                cmd: "HZLiuCard",
                                card: cards[0]
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

playLayer_yueYangWaiHuZi.prototype.calculateHuXi = function(off) {
    return UpdateHuXi_YueYangWaiHuZi(off)
};

playLayer_yueYangWaiHuZi.prototype.getShowCardIndex = function(eatType, off) {
    var uiNode = this.getUINode(off);
    var index = 0;
    if (uiNode.getName() == "node_down" || uiNode.getName() == "node_xing") {
        if (eatType == "mjwei") {
            index = 2;
        } else if (eatType == "mjgang1" || eatType == "mjgang0") {
            index = 3;
        }
    }
    return index;
};

playLayer_yueYangWaiHuZi.prototype.getEatCardShowType = function(eatType, card, cardIndex, off) {
    var showType = 2;
    if (eatType == "mjchi") {
        showType = cardIndex < 2 ? 2 : 3;
    } else if (eatType == "mjwei") {
        showType = this.getShowCardIndex(eatType, off) == cardIndex ? 2 : 0;
    }else if (eatType == "mjgang1") {
        var pl = this.getUIPlayer(off);
        showType = (pl.info.uid == SelfUid() && this.getShowCardIndex(eatType, off) == cardIndex) ? 2 : 0;
    }else if (eatType == "mjgang0") {
        showType = this.getShowCardIndex(eatType, off) == cardIndex ? 2 : 0;
    }
    return showType;
};

playLayer_yueYangWaiHuZi.prototype.getEatLabel = function(eatType) {
    return {mjwei : "playing/paohuzi/t_wai.png", mjgang0 : "playing/paohuzi/t_liu.png", mjgang1 : "playing/paohuzi/t_liu.png"}[eatType];
};

playLayer_yueYangWaiHuZi.prototype.hasTingByPut = function() {
    return true;
};

playLayer_yueYangWaiHuZi.prototype.apartGangType = function(eatType, msg) {
    var eatType = eatType;
    if (eatType == "mjgang") {
        var sData =  MjClient.data.sData;
        var tData = sData.tData;
        var pl = sData.players[tData.uids[tData.curPlayer]];
        if(pl.mjgang1.indexOf(msg.newCard) >= 0){
            eatType = "mjgang1";
        }else{
            eatType = "mjgang0";
        }
    }
    return eatType;
};

playLayer_yueYangWaiHuZi.prototype.isCheckTingStats = function() {
    return true;
}

playLayer_yueYangWaiHuZi.prototype.getTingStats = function(putCard) {
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];
    return MjClient.majiang.getTingStats(sData, pl, putCard);
}

playLayer_yueYangWaiHuZi.prototype.changeCardFrame = function(node, type) {
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

playLayer_yueYangWaiHuZi.prototype.isOtherWei = function(card){
    return false;
}

