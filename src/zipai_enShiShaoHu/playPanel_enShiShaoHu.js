var playPanel_enShiShaoHu = playLayer_ziPai.extend({
    ctor: function() {
        this._super("Play_enShiShaoHu.json");
    },
    getJsBind: function() {
        var jsBind = {
            img_gameName: {
                _layout: [[0.12, 0], [0.5, 653 / 720], [0, 0]],
            },
            node_backGround:{
                img_col_0:{
                    _layout: [[88 / 1280, 0], [420 / 1280, 155 / 720], [0, 0]],
                },
                img_col_1:{
                    _layout: [[88 / 1280, 0], [510 / 1280, 155 / 720], [0, 0]],
                },
                img_col_2:{
                    _layout: [[88 / 1280, 0], [600 / 1280, 155 / 720], [0, 0]],
                },
                img_col_3:{
                    _layout: [[88 / 1280, 0], [690 / 1280, 155 / 720], [0, 0]],
                },
                img_col_4:{
                    _layout: [[88 / 1280, 0], [780 / 1280, 155 / 720], [0, 0]],
                },
                img_col_5:{
                    _layout: [[88 / 1280, 0], [870 / 1280, 155 / 720], [0, 0]],
                },
                img_col_6:{
                    _layout: [[88 / 1280, 0], [960 / 1280, 155 / 720], [0, 0]],
                },
                img_col_7:{
                    _layout: [[88 / 1280, 0], [1050 / 1280, 155 / 720], [0, 0]],
                }
            },
            text_roundInfo: {
                _run: function () {
                    this.visible = false;
                },
            },
            img_banner: {
                btn_wanFa: {
                    _click: function(sender) {
                        MjClient.playui.showWanFaUi(true);
                    }
                },
                btn_setting: {
                    _click: function() {
                        MjClient.Scene.addChild(new setting_enShiShaoHu(), 6000);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi", {uid:SelfUid(),gameType:MjClient.gameType});
                    }
                },
                btn_changeBg: {
                    _run: function () {
                        //this.loadTextureNormal("playing/ziPaiBanner/huaPai/wenhao.png");
                        this.setContentSize(this.getNormalTextureSize());
                        this.visible = false;
                    },
                    _click: function () {
                        //postEvent("EZP_rule");
                    }
                },
            },
            btn_chat: {
                _layout: [[72 / 1280, 0], [0.96, 0.32], [0, 0]],
                _run: function() {
                    this.changeLayout = function() {
                        return;
                    }
                },
            },
            btn_voice: {
                _layout: [[72 / 1280, 0], [0.96, 0.18], [0, 0]],
                _run: function() {
                    initVoiceData(); // 公用代码todo
                    cc.eventManager.addListener(getTouchListener(), this);
                    if (MjClient.isShenhe) this.visible = false;
                    this.changeLayout = function() {
                        return;
                    }
                },
            },
            layout_cardNum: {
                _layout: [[0.085, 0.085], [640 / 1280, 424 / 720], [0, 0]],
                img_card: {
                    _run: function() {
                        this.refreshCardsTotal = function(isRemove) {
                            var tData = MjClient.data.sData.tData;
                            var next = MjClient.majiang.getAllCardsTotal() - tData.cardNext;
                            if(next <= 0) {
                                this.visible = false;
                            }
                            else {
                                this.visible = true;
                                if(isRemove) {
                                    var children = this.getChildren();
                                    var childNum = this.getChildrenCount();
                                    if(childNum > 0 && childNum + 1 > next && next < 20) {
                                        //少于20张时开始减高度
                                        children[childNum - 1].removeFromParent(true);
                                    }
                                }
                                else {
                                    this.removeAllChildren();
                                    next = next > 20 ? 20 : next;
                                    for(var i = 1; i <= next; i++) {
                                        var child = ccui.ImageView("playing/ziPaiTable/enShiShaoHu/paidui.png");
                                        child.setPosition(cc.p(this.width/2, this.height/2 + i * 0.8));
                                        this.addChild(child);
                                    }
                                }
                            }
                        }
                    },
                    _event: {
                        initSceneData: function() {
                            this.refreshCardsTotal();
                        },
                        mjhand: function() {
                            this.refreshCardsTotal();
                        },
                        HZNewCardDelay: function() {
                            this.refreshCardsTotal(true);
                        }
                    }
                },
                text_cardNum: {
                    _run: function() {
                        this.ignoreContentAdaptWithSize(true);
                        this.refreshText = function() {
                            var tData = MjClient.data.sData.tData;
                            if (tData) {
                                var num = MjClient.majiang.getAllCardsTotal() - tData.cardNext;
                                this.setString(num > 0 ? num : "");
                            }

                            var img_card = this.getParent().getChildByName("img_card");
                            this.y = 40 + img_card.getChildrenCount() * 0.8;
                        };
                        this.refreshText();
                    },
                }
            },
            node_down: {
                layout_head: {
                    _layout: [[0.1, 0.1], [65 / 1280, 110 / 720], [0, 0], true],
                },
                layout_eatCards: {
                    _layout: [[0.14, 0.14], [123 / 1280, 30 / 720], [0, 0]],
                    _run: function() {
                    },
                },
                layout_outCards: {
                    _layout: [[0.14, 0.14], [25 / 1280, 210 / 720], [0, 0]],
                    _run: function() {

                    },
                },
                layout_putCards: {
                    _layout: [[350 / 1280, 40 / 720], [503 / 1280 + (isIPhoneX() ? 0.02 : 0), 561 / 720], [0, 0]],
                },
                layout_eatDisplay: {
                    img_eat: {
                        _visible: false,
                    }
                },
                img_arrow: {
                    _visible: false,
                    _layout: [[0.1, 0.1], [640 / 1280, 364 / 720], [0, 0]],
                    _event: {
                        initSceneData: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        HZNewCard: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        HZChiCard: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        MJPeng: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        HZLiuCard: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        roundEnd: function() {
                            MjClient.playui.checkArrowVisible(this);
                        }
                    }
                }
            },
            node_left: {
                layout_head: {
                    _layout: [[0.1, 0.1], [65 / 1280, 520 / 720], [0, 0], true],
                },
                layout_eatCards: {
                    _layout: [[0.14, 0.14], [123 / 1280, 570 / 720], [0, 0]],
                    _run: function() {
                    },
                },
                layout_outCards: {
                    _layout: [[0.14, 0.14], [25 / 1280, 315 / 720], [0, 0]],
                    _run: function() {

                    },
                },
                layout_putCards: {
                    _layout: [[350 / 1280, 40 / 720], [503 / 1280 + (isIPhoneX() ? 0.02 : 0), 512 / 720], [0, 0]],
                },
                layout_replayCards: {
                    _layout: [[0.14, 0.14], [21 / 1280, 720 / 720], [0, 0]],
                },
                layout_eatDisplay: {
                    img_eat: {
                        _visible: false,
                    }
                },
                img_arrow: {
                    _visible: false,
                    _layout: [[0.1, 0.1], [459 / 1280, 424 / 720], [0, 0]],
                    _event: {
                        initSceneData: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        HZNewCard: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        HZChiCard: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        MJPeng: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        HZLiuCard: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        roundEnd: function() {
                            MjClient.playui.checkArrowVisible(this);
                        }
                    }
                }
            },
            node_right: {
                layout_head: {
                    _layout: [[0.1, 0.1], [1208 / 1280, 520 / 720], [0, 0], true],
                },
                layout_eatCards: {
                    _layout: [[0.14, 0.14], [1154 / 1280, 570 / 720], [0, 0]],
                    _run: function() {
                    },
                },
                layout_outCards: {
                    _layout: [[0.14, 0.14], [1248 / 1280, 285 / 720], [0, 0]],
                    _run: function() {

                    },
                },
                layout_putCards: {
                    _layout: [[350 / 1280, 40 / 720], [503 / 1280 + (isIPhoneX() ? 0.02 : 0), 608 / 720], [0, 0]],
                },
                layout_replayCards: {
                    _layout: [[0.14, 0.14], [1253 / 1280, 720 / 720], [0, 0]],
                },
                layout_eatDisplay: {
                    img_eat: {
                        _visible: false,
                    }
                },
                img_arrow: {
                    _visible: false,
                    _layout: [[0.1, 0.1], [819 / 1280, 424 / 720], [0, 0]],
                    _event: {
                        initSceneData: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        HZNewCard: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        HZChiCard: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        MJPeng: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        HZLiuCard: function() {
                            MjClient.playui.checkArrowVisible(this);
                        },
                        roundEnd: function() {
                            MjClient.playui.checkArrowVisible(this);
                        }
                    }
                }
            },
            img_out:{
                _layout: [[417 / 1280, 146 / 720], [658 / 1280, 558 / 720], [0, 0]],
                layout_putCards_s:{
                    _event:{
                        clearCardUI: function() {
                            this.removeAllChildren();
                        }
                    }
                },
                layout_putCards_b:{
                    _event:{
                        clearCardUI: function() {
                            this.removeAllChildren();
                        }
                    }
                },
                layout_putCards_x:{
                    _event:{
                        clearCardUI: function() {
                            this.removeAllChildren();
                        }
                    }
                }
            },
            node_eatChoice:{
                btn_di: {
                    _visible: false,
                    _layout: [[0, 0.1], [0.5, 0], [1.3, 3.8]],
                    bg_img: {
                        run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _click: function() {
                        MjClient.playui.commitEatCard(MjClient.majiang.getChiCards());
                    }
                },
                btn_wai: {
                    _visible: false,
                    _layout: [[0, 0.1], [0.5, 0], [1.3, 3.8]],
                    bg_img: {
                        run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _click: function() {
                        var tData = MjClient.data.sData.tData;
                        MjClient.playui.hideEatBtns();
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "HZTieCard",
                            cardNext: tData.cardNext,
                            card: tData.lastPutCard
                        });
                    }
                },
                btn_zhua: {
                    _visible: false,
                    _layout: [[0, 0.1], [0.5, 0], [1.3, 3.8]],
                    bg_img: {
                        run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _click: function() {
                        var tData = MjClient.data.sData.tData;
                        var msg = {
                            cmd: 'HZLiuCard',
                            card: tData.lastPutCard,
                            optFlag: 16,
                        }
                        MjClient.playui.hideEatBtns();
                        MjClient.gamenet.request("pkroom.handler.tableMsg", msg);
                    }
                },
            },
            img_wanFa: {
                _layout: [[220/1280, 0], [0.87, 0.88], [0, 0]],
                _run:function() {
                    this.visible = false;
                    this.iScaleX = this.getScaleX();
                    this.iScaleY = this.getScaleY();
                    //初始化文本
                    MjClient.playui.setWanFaUi(this);
                    this.addTouchEventListener(function(sender, event) {
                        if(event == ccui.Widget.TOUCH_ENDED) {
                            MjClient.playui.showWanFaUi(false);
                        }
                    })
                },
                img_up: {
                    _run:function() {
                        this.visible = true;
                        this.addTouchEventListener(function(sender, event) {
                            if(event == ccui.Widget.TOUCH_ENDED) {
                                MjClient.playui.showWanFaUi(false);
                            }
                        })
                    }
                }
            }
        }
        return jsBind;
    },
});

playPanel_enShiShaoHu.prototype.isShowLongCard = function() {
    return true;
};

playPanel_enShiShaoHu.prototype.createGameOverLayer = function(type) {
    return new GameOverLayer_dangYangFanJing();
};

playPanel_enShiShaoHu.prototype.createEndOneLayer = function(type) {
    return new EndOneView_enShiShaoHu();
};

playPanel_enShiShaoHu.prototype.getDefaultSetting = function() {
    return {
        layout: 0,
        bg: 0,
        pai: 0,
        fastEat: 0,
        huXi: 1,
        xuXian: 0,
        suDu: 0,
        size: 0,
        voice: 1,
        ting: 0,
        chuBtn: 0,
        dblClick: 1,
        chuGuide:0,
    };
};

playPanel_enShiShaoHu.prototype.getGameBgList = function() {
    return ["playing/ziPaiTable/enShiShaoHu/bg.png"];
};

playPanel_enShiShaoHu.prototype.isCheckTingStats = function() {
    return true;
}

playPanel_enShiShaoHu.prototype.getTingStats = function(putCard) {
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];
    return MjClient.majiang.getTingStats(sData, pl, putCard);
}

playPanel_enShiShaoHu.prototype.removeHandCard = function(card, off) {
    if (MjClient.rePlayVideo == -1 && off != 0) {
        return;
    }

    var cardArr = MjClient.HandCardArr;
    if (off != 0) {
        cardArr = MjClient.OtherHandArr[off];
    }

    for (var i = 0; i < cardArr.length; i++) {
        var groupList = cardArr[i];
        for (var k = 0; k < groupList.length; k++) {
            if (groupList[k] == card) {
                groupList.splice(k, 1);
                if (off != 0 && MjClient.rePlayVideo != -1 && groupList.length == 0) {
                    cardArr.splice(i, 1);
                }
                return;
            }
        }
    }
};

playPanel_enShiShaoHu.prototype.checkSortBtnVisible = function(node) {
    node.visible = false;
};

playPanel_enShiShaoHu.prototype.setWanFaUi = function(node) {
    var collect = roundRule_ziPai.getRoundRules();

    //设置UI
    var maxW = node.width - 32;
    var gapX = 20;
    var gapY = 5;
    var curW = 0;
    var curLine = 0;

    var text = node.getChildByName("text");
    text.setVisible(false);
    for(var i = 0; i < collect.length; i++) {
        if(collect[i] == "换行") {
            curLine++;
            curW = 0;
            continue;
        }
        var mt = text.clone();
        mt.setVisible(true);
        mt.ignoreContentAdaptWithSize(true);
        mt.setString(collect[i]);
        if(curW + mt.width + gapX <= maxW) {
            mt.x += (curW + (curW == 0 ? 0 : gapX));
            curW += ((curW == 0 ? 0 : gapX) + mt.width);
        } else {
            curLine++;
            curW = mt.width;
        }
        mt.y -= curLine * (mt.height + gapY);
        node.addChild(mt);
    }
    //自适应文本高度
    var oldY = node.height;
    node.height = mt.height * (curLine+1) + gapY * curLine + 2*14;
    var children = node.getChildren();
    for(var c in children) {
        var child = children[c];
        if(child.getName() == "img_up")
            continue;
        child.y += node.height - oldY;
    }
}

playPanel_enShiShaoHu.prototype.showWanFaUi = function(isShow) {
    var imgWanFa = MjClient.playui.jsBind.img_wanFa._node;
    if(isShow && imgWanFa.isVisible()) {
        return;
    }

    if(imgWanFa.tId) {
        clearInterval(imgWanFa.tId);
        imgWanFa.tId = null;
    }
    var hide = function(ref) {
        if(!cc.sys.isObjectValid(ref)) {
            return;
        }
        ref.runAction(cc.sequence(cc.scaleTo(0.2, ref.iScaleX, 0.000001).easing(cc.easeSineOut()),
            cc.callFunc(function(sender) {
                sender.visible = false;
            })));
    }
    if(isShow) {
        imgWanFa.setScaleY(0.000001);
        imgWanFa.visible = true;
        imgWanFa.runAction(cc.sequence(cc.scaleTo(0.2, imgWanFa.iScaleX, imgWanFa.iScaleY).easing(cc.easeSineIn()),
            cc.callFunc(function(sender) {
                //开启5s定时器
                sender.tId = setInterval(function() {
                    hide(sender);
                    clearInterval(sender.tId);
                    sender.tId = null;
                }, 5*1000);
            })));
    }else {
        hide(imgWanFa);
    }
}

playPanel_enShiShaoHu.prototype.checkArrowVisible = function(node) {
    node.zIndex = -1;
    var tData = MjClient.data.sData.tData;
    node.visible = false;
    if (tData.tState == TableState.waitReady || tData.tState == TableState.roundFinish) {
        return;
    }

    var off = this.getUIOffByNode(node);
    if (off == -1) {
        return;
    }
    node.visible = this.isCurPlayer(off);
}

playPanel_enShiShaoHu.prototype.changeLayout = function(uiNode) {

}

playPanel_enShiShaoHu.prototype.getEmptyIndex = function(cardArray) {
    return [];
}

playPanel_enShiShaoHu.prototype.isZiPaiCard = function (card) {
    var d = Math.floor(card / 10);
    var g = card % 10
    return (d >= 0 && d <= 7 && g >= 1 && g <= 3);
};

playPanel_enShiShaoHu.prototype.getCardFilePath = function() {
    var sizeList = this.getCardSizeList();
    var fontList = this.getCardFontList();
    var sizeIdx = 0;
    var fontIdx = this.getCardFontIdx();

    return "playing/huaPai/enShiShaoHu/" + sizeList[sizeIdx] + "/" + fontList[fontIdx] + "/";
};

playPanel_enShiShaoHu.prototype.refreshHandCard = function(off, isRefresh) {
    if (!this.isInPlay() && !isRefresh) {
        return;
    }

    if(off == 0){
        var pl = this.getUIPlayer(off);
       pl.canNotPutCardCopy = (pl.canNotPutCard || []).slice();
    }
    var uiNode = this.getUINode(off);
    if (MjClient.rePlayVideo == -1) {
        if (off == 0) {
            if (MjClient.movingCard_paohuzi !== null && cc.sys.isObjectValid(MjClient.movingCard_paohuzi)) {
                MjClient.movingCard_paohuzi.removeFromParent(true);
            }
            this.checkHandCard(off);
            var layout_handCards = uiNode.getChildByName("layout_handCards");
            layout_handCards.visible = true;
            this.handleHandCardBeforeRefresh(off);
            layout_handCards.removeAllChildren();
            var cardArr = MjClient.HandCardArr;
            //清理空数组
            for (var k = 0; k < cardArr.length; k++) {
                var groupList = cardArr[k];
                //即使没有牌也要创建空列
                var cardParent = layout_handCards.getChildByTag(k);
                if (!cardParent) {
                    cardParent = this.getCardRoot(layout_handCards.cardRoot, k);
                    if (!cardParent) {
                        cardParent = new cc.Node();
                        cardParent.tag = k;
                        cardParent.width = MjClient.playui.jsBind.node_backGround._node.getChildByName("img_col_" + k).width;
                        layout_handCards.addChild(cardParent);
                    } else {
                        layout_handCards.addChild(cardParent);
                    }
                    cardParent.zIndex = 0;
                }
                for (var j = 0; j < groupList.length; j++) {
                    this.addOneHandCard(k, j, groupList[j], off);
                }
            }
            this.releaseHandCardNode(off);

            this.addTingSign(); // 添加听牌角标
            for (var i = 0; i < cardArr.length; i++) {
                var addNode = layout_handCards.getChildByTag(i);
                this.showHandHuXi(addNode);
                var bg = MjClient.playui.jsBind.node_backGround._node.getChildByName("img_col_" + i);
                addNode.setPosition(cc.p(bg.x - bg.width * bg.scale / 2, 0));
            }
            postEvent("LY_addHandHuXi");
        }
    } else {
        //回放
        var handNode = null;
        var cardArr = null;
        var handCard = null;
        if (off == 0) {
            if (this.getPlayersNum() == 4) {
                handNode = uiNode.getChildByName("layout_replayCards");
            } else {
                handNode = uiNode.getChildByName("layout_handCards");
            }
            cardArr = MjClient.HandCardArr;
        } else {
            handNode = uiNode.getChildByName("layout_replayCards");
            cardArr = MjClient.OtherHandArr[off];
        }
        handNode.visible = true;
        handNode.removeAllChildren();

        //清理空数组
        if (!cardArr) {
            return;
        }
        if(off != 0){
            for (var k = cardArr.length - 1; k >= 0; k--) {
                if (cardArr[k].length == 0) {
                    cardArr.splice(k, 1);
                }
            }
        }

        for (var k = 0; k < cardArr.length; k++) {
            var groupList = cardArr[k];
            if(off == 0){
                var cardParent = handNode.getChildByTag(k);
                if (!cardParent) {
                    cardParent = new cc.Node();
                    cardParent.tag = k;
                    cardParent.width = MjClient.playui.jsBind.node_backGround._node.getChildByName("img_col_" + k).width;
                    handNode.addChild(cardParent);
                }
                cardParent.zIndex = 0;
            }
            for (var j = 0; j < groupList.length; j++) {
                if (off == 0) {
                    if (this.getPlayersNum() == 4) {
                        this.addHandCardReplay(k, j, groupList[j], off);
                    } else {
                        this.addHandCard(k, j, groupList[j], off);
                    }
                } else {
                    this.addHandCardReplay(k, groupList.length - 1 - j, groupList[groupList.length - 1 - j], off);
                }
            }
        }

        if (off == 0 && this.getPlayersNum() != 4) {
            for (var i = 0; i < cardArr.length; i++) {
                var addNode = handNode.getChildByTag(i);
                var bg = MjClient.playui.jsBind.node_backGround._node.getChildByName("img_col_" + i);
                addNode.setPosition(cc.p(bg.x - bg.width * bg.scale / 2, 0));
            }
        }
        postEvent("LY_addHandHuXi");
    }
};

playPanel_enShiShaoHu.prototype.addOneHandCard = function(col, row, cardNum, off) {
    var uiNode = this.getUINode(off);
    //根据牌的类型获得需要添加的节点
    var layout_handCards = uiNode.getChildByName("layout_handCards");
    //取一个对应的牌节点
    var newCard = this.getCardNodeFromList(layout_handCards.cardList, cardNum);
    if (!newCard) {
        // cc.log("chow", "newCard");
        newCard = this.getNewCard("hand", cardNum, off);
    } else {
        // cc.log("chow", "getCard");
    }
    var scale_y = newCard.scaleY;

    var cardParent = layout_handCards.getChildByTag(col);
    if (!cardParent) {
        cardParent = this.getCardRoot(layout_handCards.cardRoot, col);
        if (!cardParent) {
            // cc.log("chow", "newRoot");
            cardParent = new cc.Node();
            cardParent.tag = col;
            cardParent.width = newCard.width;
            layout_handCards.addChild(cardParent);
        } else {
            // cc.log("chow", "getRoot from list");
            layout_handCards.addChild(cardParent);
        }
        cardParent.zIndex = 0;
    } else {
        // cc.log("chow", "getRoot from parent");
    }

    if (MjClient.movingCard_paohuzi == newCard) {
        if (this.isShowLongCard()) {
            var src = this.getCardSrc("hand", newCard.tag, false);
            //newCard.loadTexture(src, this.getResType());
            this.changeHandCardSize(newCard);
            this.loadCardTexture(newCard, src, this.getResType());
            //newCard.scale = cc.director.getWinSize().width / 1280;
        }
    }

    var beginPoint = cc.p(0, 0);
    var off_y = this.getOffYByCard(newCard);
    var cardCount = cardParent.childrenCount;

    newCard.setName(row);
    newCard.zIndex = 12 - row;
    newCard.anchorX = 0;
    newCard.anchorY = 0;
    //newCard.x = beginPoint.x;
    //newCard.y = beginPoint.y + cardCount * off_y;
    cardParent.addChild(newCard);
    if (newCard.lastPosition) {
        newCard.setPosition(cardParent.convertToNodeSpace(newCard.lastPosition));
        this.doMoveToAction(newCard, cc.p(beginPoint.x, beginPoint.y + cardCount * off_y));
    } else {
        newCard.x = beginPoint.x;
        newCard.y = beginPoint.y + cardCount * off_y;
    }
    //newCard.opacity = 255;
    this.setCardTouchHandler(newCard, off);

    var pl = this.getUIPlayer(off);
    newCard.isMove = true;
    if (this.checkCanNotPutCardMask()) {
        var index = pl.canNotPutCardCopy.indexOf(cardNum);
        if(index >= 0){
            newCard.setColor(cc.color(170, 170, 170));
            pl.canNotPutCardCopy.splice(index, 1);
            newCard.isMove = false;
        }else{
            newCard.setColor(cc.color(255, 255, 255));
        }
    }
    if(newCard.isMove){
        newCard.setTouchEnabled(true);
        newCard.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function() {
            if (!newCard.isRunning()) {
                newCard.setTouchEnabled(false);
            }
            if (!newCard.isTouchEnabled()) {
                newCard.setTouchEnabled(true);
            }
            cc.director.getEventDispatcher().resumeTarget(newCard);
        })));
    }else{
        newCard.setTouchEnabled(false);
    }
};

playPanel_enShiShaoHu.prototype.setCardTouchHandler = function(card, off) {
    var self = this;
    var pl = this.getUIPlayer(off);
    var cloneCard = null;
    card.addTouchEventListener(function(btn, eventType) {
        if (MjClient.movingCard_paohuzi !== null && cc.sys.isObjectValid(MjClient.movingCard_paohuzi) && MjClient.movingCard_paohuzi !== btn) {
            return;
        }

        if (MjClient.isRefreshNodeing || MjClient.isDealing) {
            return;
        }

        if(!IsTurnToMe()){
            return;
        }

        if (eventType == ccui.Widget.TOUCH_BEGAN) {
            MjClient.movingCard_paohuzi = btn;
            if (MjClient.playui.isShowCloneCard()) { // 添加残影
                if (cc.sys.isObjectValid(cloneCard)) {
                    cloneCard.removeFromParent(true);
                }

                cloneCard = btn.clone();
                cloneCard.opacity = 100;
                cloneCard.setTouchEnabled(false);
                var src = MjClient.playui.getCardSrc("hand", btn.tag, false);
                //cloneCard.loadTexture(src, MjClient.playui.getResType());
                MjClient.playui.loadCardTexture(cloneCard, src, MjClient.playui.getResType());
                btn.parent.addChild(cloneCard);
            }

            btn.parent.zIndex = 1;
            btn.zIndex = 15;
            btn.setAnchorPoint(0.5, 0.5);
            btn.x += btn.width * btn.scaleX * 0.5;
            btn.y += btn.height * btn.scaleY * 0.5;
            // updateBtnMovedPosition_hengYang(btn, eventType);
            if (Array.isArray(MjClient.hintPutList_ziPai) && MjClient.hintPutList_ziPai.indexOf(btn.tag) >= 0) {
                if (MjClient.playui.hasTingByPut()) {
                    MjClient.playui.checkTingCardsNew(btn.tag);
                }else if(MjClient.playui.isCheckTingStats()){
                    MjClient.playui.checkTingStats(btn.tag);
                } else {
                    MjClient.playui.checkTingCards(btn.tag);
                }
            }

            if (MjClient.playui.isShowLongCard()) { // 显示长牌
                var alignWidth = btn.scale * btn.width;
                var src = MjClient.playui.getCardSrc("put", btn.tag, false);
                btn.loadTexture(src, 0);
                btn.scale = alignWidth / btn.width;
                var tingSign = btn.getChildByName("tingSign");
                if (cc.sys.isObjectValid(tingSign) && tingSign.isVisible()) {
                    tingSign.y = btn.getContentSize().height;
                }
            }
        }

        if (eventType == ccui.Widget.TOUCH_MOVED) {
            btn.setPosition(cc.pSub(btn.getTouchMovePosition(), btn.parent.getPosition()));
            // updateBtnMovedPosition_hengYang(btn, eventType);
        }

        if (eventType == ccui.Widget.TOUCH_ENDED || eventType == ccui.Widget.TOUCH_CANCELED) {
            MjClient.movingCard_paohuzi = null;
            // updateBtnMovedPosition_hengYang(btn, eventType);
            MjClient.moveCard = {};
            MjClient.moveCard.curPosition = btn.parent.convertToWorldSpace(cc.p(btn.x - btn.anchorX * btn.width * btn.scaleX, btn.y - btn.anchorY * btn.height * btn.scaleY));
            var col = MjClient.moveCard.curCIndex = MjClient.moveCard.nexCIndex = btn.parent.tag;
            var row = MjClient.moveCard.curRIndex = MjClient.moveCard.nexRIndex = btn.name;
            var pos = btn.getTouchEndPosition();
            var card = btn.tag;

            if (cc.sys.isObjectValid(cloneCard)) {
                cloneCard.removeFromParent(true);
            }

            if (MjClient.playui.isShowLongCard()) {
                var src = MjClient.playui.getCardSrc("hand", btn.tag, false);
                //btn.loadTexture(src, MjClient.playui.getResType());
                // MjClient.playui.changeHandCardSize(btn);
                MjClient.playui.loadCardTexture(btn, src, MjClient.playui.getResType());
                btn.scale = cc.director.getWinSize().width / 1280;
            }

            if (!Array.isArray(MjClient.HandCardArr[col]) || MjClient.HandCardArr[col][row] != card) {
                if(MjClient.playui.isCheckTingStats()){
                    MjClient.playui.checkTingStats();
                }else{
                    MjClient.playui.checkTingCards();
                }
                MjClient.playui.refreshHandCard(0);
                delete MjClient.moveCard;
                return;
            }

            var tData = MjClient.data.sData.tData;


            // 出牌
            var isPutCommon = tData.tState == TableState.waitPut;
            var isPutSpecil = MjClient.playui.checkPutSpecil();
            if (IsTurnToMe() && (isPutCommon || isPutSpecil) && MjClient.playui.checkCardCanPut(pl, card) && !MjClient.hasPut && pos.y > MjClient.playui.jsBind.img_cutLine._node.y) {
                if (self.isOtherWei(card)) {
                    MjClient.showMsg("放偎之后这局将不能再吃碰，是否确定？", function() {
                        MjClient.playui.doPut(card, btn, col, row);
                        MjClient.playui.refreshHandCard(0);
                        delete MjClient.moveCard;
                    }, function() {
                        btn.setAnchorPoint(0, 0);
                        if(MjClient.playui.isCheckTingStats()){
                            MjClient.playui.checkTingStats();
                        }else{
                            MjClient.playui.checkTingCards();
                        }
                        MjClient.playui.refreshHandCard(0);
                        delete MjClient.moveCard;
                    }, "1");

                    return;
                } else {
                    MjClient.playui.doPut(card, btn, col, row);
                }
            } else {
                btn.setAnchorPoint(0, 0);
            }

            //还原大小
            if(btn && cc.sys.isObjectValid(btn) && MjClient.playui.isShowLongCard()) {
                MjClient.playui.changeHandCardSize(btn);
                var src = MjClient.playui.getCardSrc("hand", btn.tag, false);
                MjClient.playui.loadCardTexture(btn, src, MjClient.playui.getResType());
            }


            if (MjClient.playui.hasTingByPut()) {
                MjClient.playui.checkTingCardsNew();
            } else if(MjClient.playui.isCheckTingStats()){
                MjClient.playui.checkTingStats();
            }else{
                MjClient.playui.checkTingCards();
            }
            MjClient.playui.refreshHandCard(0);

            MjClient.addGroupIndex = -1;
            delete MjClient.moveCard;
        }
    });
};

playPanel_enShiShaoHu.prototype.addHandCardReplay = function(col, row, cardNum, off) {
    var uiNode = this.getUINode(off);
    var layout_replayCards = uiNode.getChildByName("layout_replayCards");
    //设置牌
    var type = 2;
    var newCard = this.getNewCard("out", cardNum, off);
    var scale_y = newCard.scaleY;
    var parentCount = layout_replayCards.childrenCount;
    //首先根据name判断cpNode中是否已经添加
    var cardParent = layout_replayCards.getChildByTag(col);
    if (!cardParent) {
        cardParent = new cc.Node();
        cardParent.tag = col;
        if (uiNode.getName() == "node_down") {
            cardParent.x = parentCount * newCard.width * newCard.scale;
            cardParent.y = 0;
        } else if (uiNode.getName() == "node_right") {
            cardParent.x = layout_replayCards.width - parentCount * newCard.width * newCard.scale;
            cardParent.y = layout_replayCards.height;
        } else if (uiNode.getName() == "node_left") {
            cardParent.x = parentCount * newCard.width * newCard.scale;
            cardParent.y = layout_replayCards.height;
        } else if (uiNode.getName() == "node_xing") {
            cardParent.x = layout_replayCards.width - parentCount * newCard.width * newCard.scale;
            cardParent.y = 0;
        }
        layout_replayCards.addChild(cardParent);
    }
    var off_y = 0;
    if (uiNode.getName() == "node_down" || uiNode.getName() == "node_left") {
        off_y = newCard.height * newCard.scale;
        newCard.anchorX = 0;
        newCard.anchorY = 0;
        if(uiNode.getName() == "node_left"){
            newCard.anchorY = 1;
        }
    } else if (uiNode.getName() == "node_right" || uiNode.getName() == "node_xing") {
        off_y = newCard.height * newCard.scale;
        newCard.anchorX = 1;
        newCard.anchorY = 0;
        if(uiNode.getName() == "node_right"){
            newCard.anchorY = 1;
        }
    }
    var cardCount = cardParent.childrenCount;
    newCard.zIndex = 12 - cardCount;
    newCard.x = 0;
    newCard.y = cardCount * off_y * 0.5;
    if(uiNode.getName() == "node_right" || uiNode.getName() == "node_left"){
        newCard.y *= -1;
        newCard.zIndex = cardCount;
    }

    cardParent.addChild(newCard);
}

playPanel_enShiShaoHu.prototype.isOtherWei = function(card) {
    return false;
};

playPanel_enShiShaoHu.prototype.getOffYByCard = function(card){
    return card.height * card.scaleY - card.height * 5 / 12 * card.scaleY;
}

playPanel_enShiShaoHu.prototype.getOutCardType = function(pl, index) {
    return pl.mjputType[index];
}

playPanel_enShiShaoHu.prototype.getOutCardPos = function(off, putType) {
    var pos = cc.p(0, 0);
    var uiNode = this.getUINode(off);
    var outCard = uiNode.getChildByName("img_outCard");
    if(putType == 1){
        var layout_outCards = uiNode.getChildByName("layout_outCards");
        var childNum = layout_outCards.getChildrenCount();

        pos.x = (childNum % 6 + 0.5) * (outCard.width + 5) * outCard.scale;
        pos.y = (Math.floor(childNum / 6) + 0.5) * outCard.height * outCard.scale;
        if(uiNode.getName() == "node_right"){
            pos.x *= -1;
            pos.x += layout_outCards.width;
        }
    }else{
        var layout_putCards;
        if(uiNode.getName() == "node_right"){
            layout_putCards = MjClient.playui.jsBind.img_out.layout_putCards_x._node;
        }else if(uiNode.getName() == "node_down"){
            layout_putCards = MjClient.playui.jsBind.img_out.layout_putCards_b._node;
        }else if(uiNode.getName() == "node_left"){
            layout_putCards = MjClient.playui.jsBind.img_out.layout_putCards_s._node;
        }else{
            layout_putCards = uiNode.getChildByName("layout_putCards");
        }
        var childNum = layout_putCards.getChildrenCount();
        pos.x = (childNum + 0.5) * (outCard.width + 5) * outCard.scale;
        pos.y = 0.5 * outCard.height * outCard.scale;
    }
    return pos;
};

playPanel_enShiShaoHu.prototype.getCardSrc = function(name, tag, isTurn) {
    var path = this.getCardFilePath();
    if(this.getResType() == 1 && name != "put"){
        path = path.replace("playing/ziPai/", "");
    }
    if (isTurn) {
        switch (name) {
            case "out":
                return path + "huxiBG.png";
            case "put":
                return path + "normalBG.png";
        }
    }
    if(name == "out"){
        name = "hand";
    }

    return (path + name + tag + ".png");
};

playPanel_enShiShaoHu.prototype.initOutCard = function(node) {
    if (!this.isInPlay()) return;
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    node.removeAllChildren();
    var putLen = pl.mjput.length;
    if (this.isCurPlayer(off) && pl.mjput.length > 0 && MjClient.data.sData.tData.currCard == pl.mjput[pl.mjput.length - 1]) {
        putLen -= 1;
    }
    for (var i = 0; i < putLen; i++) {
        var pos = this.getOutCardPos(off, this.getOutCardType(pl, i));
        var outCard = this.getNewCard("out", pl.mjput[i], off, false);
        outCard.setPosition(pos);
        outCard.visible = true;
        if(this.getOutCardType(pl, i) == 0){
            var layout_putCards;
            if(node.parent.getName() == "node_right"){
                layout_putCards = MjClient.playui.jsBind.img_out.layout_putCards_x._node;
            }else if(node.parent.getName() == "node_down"){
                layout_putCards = MjClient.playui.jsBind.img_out.layout_putCards_b._node;
            }else if(node.parent.getName() == "node_left"){
                layout_putCards = MjClient.playui.jsBind.img_out.layout_putCards_s._node;
            }else{
                layout_putCards = node.parent.getChildByName("layout_putCards");
            }
            layout_putCards.addChild(outCard);
        }else{
            node.addChild(outCard);
        }
    }
};

playPanel_enShiShaoHu.prototype.showOutCardAnimation = function(node) {
    if(node.isPick){
        delete node.isPick;
        return;
    }
    var off = this.getUIOffByNode(node);
    var tData = MjClient.data.sData.tData;
    if (this.getIndexInUids(off) != (tData.curPlayer - 1 + tData.maxPlayer) % tData.maxPlayer) { // 不是发牌玩家上家
        return;
    }

    var pl = this.getUIPlayer(off);
    var uiNode = this.getUINode(off);

    if (!node.isVisible()) { // 没有展示牌
        return;
    }

    if (pl.mjput.length <= 0) {
        return;
    }

    var endPos = this.getOutCardPos(off, this.getOutCardType(pl, pl.mjput.length - 1));
    var outLayout = uiNode.getChildByName("layout_outCards");
    if(this.getOutCardType(pl, pl.mjput.length - 1) == 0){
        if(uiNode.getName() == "node_right"){
            outLayout = MjClient.playui.jsBind.img_out.layout_putCards_x._node;
        }else if(uiNode.getName() == "node_down"){
            outLayout = MjClient.playui.jsBind.img_out.layout_putCards_b._node;
        }else if(uiNode.getName() == "node_left"){
            outLayout = MjClient.playui.jsBind.img_out.layout_putCards_s._node;
        }else{getca
            outLayout = uiNode.getChildByName("layout_putCards");
        }
    }
    var outCard = this.getNewCard("out", pl.mjput[pl.mjput.length - 1], off, false);
    outCard.setPosition(endPos);
    outLayout.addChild(outCard);

    var anmEndPos = outLayout.convertToWorldSpace(cc.p(endPos.x, endPos.y)); // 动画结束坐标
    var actTime = this.getAniTimeByType("land");
    outCard.setOpacity(0);
    outCard.setScale(0);
    var spa = cc.spawn(cc.fadeIn(0.05), cc.scaleTo(0.05, 0.45));
    outCard.runAction(cc.sequence(cc.delayTime(actTime - 0.05), spa, cc.callFunc(function() {
        outCard.visible = true;
        this.addOutFrame(outCard, pl, pl.mjput.length - 1);
    }.bind(this))));

    // 播放缩小动画到outcard的所在位置
    var scy = (outCard.height * outCard.scaleY) / node.height;
    var spa = cc.spawn(cc.scaleTo(actTime, scy), cc.fadeTo(actTime, 255 * 0.6), cc.moveTo(actTime, cc.p(anmEndPos)))
    var seq = cc.sequence(spa, cc.callFunc(function() {
        node.setOpacity(255);
        node.visible = false;

    }));

    node.stopAllActions();
    node.runAction(seq);

    this.outCardExp(pl, outCard, pl.mjput.length - 1);
};

playPanel_enShiShaoHu.prototype.initEatCard = function(node, isRoundEndMsg) {
    if ((MjClient.rePlayVideo != -1 || !this.isInPlay()) && !isRoundEndMsg) {
        return;
    }

    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    var lastLineCount = 0;

    if (!pl || !pl.mjsort) {return;}

    for (var i = 0; i < pl.mjsort.length; i++) {
        var mjSort = pl.mjsort[i];
        var cardArr = this.getEatCardArr(mjSort.name, off, mjSort.pos);
        var eatCardNode = this.getEatCardNode(mjSort.name, cardArr, off);
        for(var j = 0; j < eatCardNode.getChildrenCount(); j++){
            eatCardNode.children[j].y *= 0.7;
        }
        this.dislpayEatCardNode(eatCardNode, lastLineCount, true, mjSort.name, off);
        lastLineCount += cardArr.length;
    }
};

playPanel_enShiShaoHu.prototype.getEatCardNode = function(eatType, cardArr, off) {
    var uiNode = this.getUINode(off);
    var orientation = this.getEatCardOrientation(off);

    var eatCardNode = new cc.Node();
    for (var i = 0; i < cardArr.length; i++) {
        for (var j = 0; j < cardArr[i].length; j++) {
            var showType = this.getEatCardShowType(eatType, cardArr[i][j], j, off, cardArr[i].length);
            var card = this.getNewCard("out", cardArr[i][j], off, showType == 0);
            if (showType == 1) {
                this.addShaderForCard(card);
            } else if (showType == 3) {
                card.setColor(cc.color(170, 170, 170));
            }

            if (orientation.dy == -1 && eatType != "mjchi") {
                eatCardNode.addChild(card);
            } else {
                eatCardNode.addChild(card, cardArr[i].length - j);
            }

            //card.anchorX = orientation.anchorX;
            //card.anchorY = orientation.anchorY;
            card.x = orientation.dx * (i + 0.5) * card.width * card.scaleX;
            card.y = orientation.dy * (this.getEatCardOffest(eatType, cardArr[i].length - 1, j, off) + 0.5) * card.height * card.scaleY;
            eatCardNode.cardWidth = eatCardNode.cardWidth || card.width * card.scaleX;
        }
    }
    return eatCardNode;
};

playPanel_enShiShaoHu.prototype.updateEatCard = function(node, eatType, msg) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurEatPlayer(msg, off)) {
        return;
    }
    eatType = this.apartGangType(eatType, msg);
    var cardArr = this.getEatCardArr(eatType, off);
    var eatCardNode = this.getEatCardNode(eatType, cardArr, off);
    for(var i = 0; i < eatCardNode.getChildrenCount(); i++){
        eatCardNode.children[i].y *= 0.7;
    }
    var lastLineCount = this.getLastEatNodeLineCount(cardArr.length, off);
    this.dislpayEatCardNode(eatCardNode, lastLineCount, false, eatType, off);
};

playPanel_enShiShaoHu.prototype.getLastEatNodeLineCount = function(curLineCount, off) {
    var count = playLayer_ziPai.prototype.getLastEatNodeLineCount.apply(this, [curLineCount, off]);

    var indexInUids = this.getIndexInUids(off);
    var pl = MjClient.data.sData.players[MjClient.data.sData.tData.uids[indexInUids]];
    count += pl.mjtie.length;
    return count;
};

playPanel_enShiShaoHu.prototype.getEatCardArr = function(eatType, off, pos) {
    var pl = this.getUIPlayer(off);
    var pos = typeof(pos) == "undefined" ? (pl[eatType].length - 1) : pos;
    if(eatType == "mjgang0" || eatType == "mjgang1"){
        var cards = pl[eatType][pos].gang.concat(pl[eatType][pos].ex);
        return [cards];
    }else if(eatType == "mjtie"){
        return [pl.mjtie[pos]];
    }else{
        return playLayer_ziPai.prototype.getEatCardArr.apply(this, [eatType, off, pos]);
    }
};

playPanel_enShiShaoHu.prototype.getEatCardShowType = function(eatType, card, cardIndex, off, cardCount) {
    var showType = 2;
    if (eatType == "mjchi") {
        showType = cardIndex < 2 ? 2 : 3;
    } else if (eatType == "mjwei" || eatType == "mjgang1") {
        var pl = this.getUIPlayer(off);
        if(pl.info.uid == SelfUid() || cardCount > 4){
            showType = 0 != cardIndex ? 2 : 0;
        }else{
            showType =  0;
        }
    }
    return showType;
};

playPanel_enShiShaoHu.prototype.removeEatArrFromHand = function(eatType, cardArr, msg, off) {
    var tData = MjClient.data.sData.tData;
    var arr = cardArr[0].slice();
    if ((eatType != "mjgang1" && eatType != "mjgang0") || (arr.length > 4 && msg.isDiToKua)) {
        arr.splice(arr.indexOf(tData.lastPutCard), 1);
    }
    for (var i = 0; i < arr.length; i++) {
        this.removeHandCard(arr[i], off);
    }
};

playPanel_enShiShaoHu.prototype.getEatCard = function(eatType, off, pos) {
    var pl = this.getUIPlayer(off);
    var eatAll = {
        mjchi: pl.mjchiCard,
        mjpeng: pl.mjpeng,
        mjwei: pl.mjwei,
        mjgang0: pl.mjgang0,
        mjgang1: pl.mjgang1,
    };
    var pos = typeof(pos) == "undefined" ? (eatAll[eatType].length - 1) : pos;
    if(eatType == "mjgang0" || eatType == "mjgang1"){
        var gang = eatAll[eatType][pos].gang;
        return gang[0];
    }else{
        return eatAll[eatType][pos];
    }
};

playPanel_enShiShaoHu.prototype.apartGangType = function(eatType, msg) {
    var eatType = eatType;
    if (eatType == "mjgang") {
        if (msg.type == 0) {
            eatType = "mjgang0";
        } else {
            eatType = "mjgang1";
        }
    }
    return eatType;
};

playPanel_enShiShaoHu.prototype.displayEatLabel = function(node, eatType, msg) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurEatPlayer(msg, off)) {
        return;
    }
    var eatType = this.apartGangType(eatType, msg);
    var uiNode = this.getUINode(off);
    var layout_eatCards = uiNode.getChildByName("layout_eatDisplay");
    var eatLabel = layout_eatCards.getChildByName("img_eat");
    eatLabel.visible = true;

    if(this.getEatLabel(eatType, msg)){
        eatLabel.loadTexture(this.getEatLabel(eatType, msg));
    }

    if (this.isAniParallel()) {
        eatLabel.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
            eatLabel.visible = false;
        })));
    } else {
        if (eatLabel.getUserData()) {
            eatLabel.scale = eatLabel.getUserData().scale;
        } else {
            eatLabel.setUserData({
                scale: eatLabel.scale
            });
        }

        var initScale = eatLabel.scale;
        eatLabel.runAction(cc.sequence(cc.scaleTo(0.3, initScale * 1.5), cc.delayTime(0.5), cc.scaleTo(0.3, initScale), cc.callFunc(() => {
            eatLabel.visible = false;
        })));
    }
};

playPanel_enShiShaoHu.prototype.getEatLabel = function(eatType, msg) {
    var img = {mjchi: 't_di', mjpeng:'t_peng', mjwei: 't_shao', hu:'t_hu', mjgang0:'t_zhua', mjgang1:'t_zhua', mjtie : "t_wai"};
    if(eatType == "mjgang0" || eatType == "mjgang1" && msg.gangInfo.ex.length > 0){
        if (eatType in img) {
            return 'playing/ziPaiTable/enShiShaoHu/t_kua.png';
        }
    }else{
        return 'playing/ziPaiTable/enShiShaoHu/' + img[eatType] + '.png';
    }
    return null;
};

playPanel_enShiShaoHu.prototype.getShowEatNodes = function() {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var eat = MjClient.playui.jsBind.node_eatChoice;
    var pl = sData.players[SelfUid() + ""];
    if (!pl || (pl.eatFlag & 8) || (pl.eatFlag & 2) || (pl.eatFlag & 32)) {
        return;
    }

    if (tData.tState == TableState.roundFinish) {
        return [];
    }

    var vnode = [];
    if (pl.eatFlag & 1) { // 抵
        vnode.push(eat.btn_di._node);
    }

    if (pl.eatFlag & 4) { //歪
        vnode.push(eat.btn_wai._node);
    }

    if (pl.eatFlag & 16) { //zhua
        vnode.push(eat.btn_zhua._node);
    }

    if (vnode.length > 0 && !(pl.eatFlag & 16) && !(pl.eatFlag & 256)) { // 过
        vnode.push(eat.btn_guo._node);
    }

    return vnode;
};

playPanel_enShiShaoHu.prototype.getPutCardBg = function (putType) {
    return "playing/ziPaiTable/enShiShaoHu/chupai_bj.png";
};

playPanel_enShiShaoHu.prototype.updatePutCard = function(node, msg, isReconnect) {
    playLayer_ziPai.prototype.updatePutCard.apply(this, [node, msg, isReconnect]);
    var card = node.getChildByName("img_card");
    var img_putType = card.getChildByName("img_putType");
    if(!img_putType) {
        img_putType = new ccui.ImageView();
        img_putType.name = "img_putType";
        img_putType.anchorX = 1;
        img_putType.anchorY = 1;
        card.addChild(img_putType);
    }

    if(MjClient.data.sData.tData.putType == 0) {
        img_putType.loadTexture("playing/ziPaiTable/enShiShaoHu/icon_da.png");
    } else {
        img_putType.loadTexture("playing/ziPaiTable/enShiShaoHu/icon_ban.png");
    }
    img_putType.x = card.width;
    img_putType.y = card.height;
};

// 胡息
playPanel_enShiShaoHu.prototype.updateHuXi = function(node) {
    node.setString("");
    if (!this.isInPlay()) {
        return;
    }

    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return;
    }
    
    node.setVisible(true);
    var huXi = MjClient.majiang.getTableHuXi(pl);
    node.setString("" + huXi);
    node.ignoreContentAdaptWithSize(true)
};

playPanel_enShiShaoHu.prototype.isNeedShuffle = function() {
    return false;
};

playPanel_enShiShaoHu.prototype.setPlayerHead = function(node, pl) {
    var url = pl.info.headimgurl;
    if(!url) url = "png/default_headpic.png";
    cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
    {
        if(!err && texture && cc.sys.isObjectValid(node))
        {
            var head = new cc.Sprite(texture);
            head.setScale(node.width / head.width * 0.92);
            head.x = node.width / 2;
            head.y = node.height / 2;
            node.addChild(head);
            //遮罩框
            var hideblock = new cc.Sprite("gameOver/huaPai/bg_head.png");
            hideblock.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
            node.addChild(hideblock);
        }
    });
};

// 大小结算设置离线
playPanel_enShiShaoHu.prototype.setOffLine = function(node, pl) {
    if(!pl || pl.onLine == true)
    {
        return;
    }
    if(MjClient.rePlayVideo != -1){
        return;
    }
    var offlineTime = pl.offLineTime ? (new Date().getTime() - pl.offLineTime) : 0;
    if(offlineTime < 0){
        return;
    }

    var offlineImage = new ccui.ImageView("gameOver/huaPai/Z_offline.png");
    node.addChild(offlineImage);
    offlineImage.x = node.width / 2;
    offlineImage.y = node.height / 2;

    var offlineTimeText = new ccui.Text();
    offlineTimeText.setFontName("fonts/lanting.TTF");
    offlineTimeText.setFontSize(30);
    node.addChild(offlineTimeText);
    offlineTimeText.x = node.width / 2;
    offlineTimeText.y = node.height * 0.8;
    offlineTimeText.setString(offlineTime ? MjClient.dateFormat(new Date(parseInt(offlineTime)),"mm:ss") : "");
}

playPanel_enShiShaoHu.prototype.checkBtnWithPlayerFlag = function(){

};

playPanel_enShiShaoHu.prototype.updateRoundLabel = function(node) {
    playLayer_ziPai.prototype.updateRoundLabel.apply(this, [node]);
    var tData = MjClient.data.sData.tData;
    var curRound = tData.roundAll - tData.roundNum + 1;
    this.curRound = curRound;
};

playPanel_enShiShaoHu.prototype.addTingSign = function() {
    if(!this.isNeedShowTing()) return;
    var layout_handCards = this.getUINode(0).getChildByName("layout_handCards");
    var hintPutList = MjClient.hintPutList_ziPai;
    if (this.getTingPaiType() == 0 && hintPutList.length > 0) {
        var colParentArr = layout_handCards.getChildren();
        for (var i = 0; i < colParentArr.length; i++) {
            var colParent = colParentArr[i].getChildren();
            for (var j = 0; j < colParent.length; j++) {
                var card = colParent[j];
                if (hintPutList.indexOf(card.tag) >= 0 && card.isMove) {
                    this.showCardTingSign(card, true);
                } else {
                    this.showCardTingSign(card, false);
                }
            }
        }
    }
};

playPanel_enShiShaoHu.prototype.addHandCard = function(col, row, cardNum, off) {
    var uiNode = this.getUINode(off);
    //根据牌的类型获得需要添加的节点
    var layout_handCards = uiNode.getChildByName("layout_handCards");

    //设置牌
    var newCard = this.getNewCard("hand", cardNum, off);
    var scale_y = newCard.scaleY;
    //首先根据name判断cpNode中是否已经添加
    var cardParent = layout_handCards.getChildByTag(col);
    if (!cardParent) {
        cardParent = new cc.Node();
        cardParent.tag = col;
        cardParent.width = newCard.width;
        layout_handCards.addChild(cardParent);
    }

    var beginPoint = cc.p(0, 0);
    var off_y = newCard.height * scale_y - newCard.height * 5 / 12 * scale_y;

    var cardCount = cardParent.childrenCount;
    newCard.setName(row);
    newCard.zIndex = 4 - row;
    newCard.anchorX = 0;
    newCard.anchorY = 0;
    newCard.x = beginPoint.x;
    newCard.y = beginPoint.y + cardCount * off_y;
    cardParent.addChild(newCard);

    var pl = this.getUIPlayer(off);
    if (pl && pl.canNotPutCard) {
        if (pl.canNotPutCard.indexOf(cardNum) != -1) {
            newCard.setColor(cc.color(170, 170, 170));
        }
    }
    cc.log("chow", "addHandCard_hengYang: name=" + newCard.getName() + " num=" + newCard.num + " tag =" + newCard.tag);
};