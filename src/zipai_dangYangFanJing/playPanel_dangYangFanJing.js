// 当阳翻精
var playPanel_dangYangFanJing = playLayer_ziPai.extend({
    ctor: function() {
        this._super("Play_dangYangFanJing.json");
        
        //自由人数
        if (MjClient.data.sData.tData.areaSelectMode["convertible"] && MjClient.rePlayVideo == -1)
            addFreeNumberBtn([0.5, 0.4]);

        // 维护一个数组标记各列的压缩状态
        this.compressState = Array.apply(null, {length:9}).map(()=>false);
    },
    getJsBind: function() {
        var jsBind = {
            img_gameName: {
                _layout: [[0.16, 0], [0.5, 0.87], [0, 0]],
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
                        MjClient.Scene.addChild(new setting_dangYangFanJing(), 6000);
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
            layout_cardNum: {
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
                                        var child = ccui.ImageView("playing/ziPaiBanner/paidui_huaPai.png");
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
            btn_sort: {
                _visible: false,
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
            node_down: {
                layout_head: {
                    _layout: [[0.1, 0.1], [0.044, 0.06], [0, 0], true],
                },
                layout_eatCards: {
                    _layout: [[0.14, 0.14], [0.005, 0.23], [0, 0]],
                    _event: {
                        roundEnd : function() {
                            this.removeAllChildren();
                            MjClient.playui.initEatCard(this, true);
                            var pl = MjClient.playui.getUIPlayer(0);
                            if(!pl) {
                                return
                            }

                            var sData = MjClient.data.sData;
                            if(sData && sData.tData.currCard == -1) {
                                //跑胡 偎胡
                                MjClient.playui.refreshHandCard(0, true);
                            }
                        }
                    }
                },
                layout_handCards: {
                    _event: {
                        clearCardUI: function() {
                            this.removeAllChildren();
                        },
                    }
                },
                img_putCard: {
                    _layout: [[0.15, 0.15], [0.5, 0.535], [0, 0]],
                    _event: {
                        HZAddCards: function(eD) {
                            MjClient.playui.updatePutCardByAdd(this, eD);
                        }
                   }
                },
                layout_eatDisplay: {
                    img_eat: {
                        _visible: false,
                    }
                },
                img_arrow: {
                    _visible: false,
                    _layout: [[0.1, 0.1], [0.5, 0.64], [0, 0]],
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
                    _layout: [[0.1, 0.1], [0.956, 0.8], [0, 0], true]
                },
                layout_eatDisplay: {
                    img_eat: {
                        _visible: false,
                    }
                },
                img_putCard: {
                    _layout: [[0.15, 0.15], [0.7, 0.8], [0, 0]],
                    _event: {
                        HZAddCards: function(eD) {
                            MjClient.playui.updatePutCardByAdd(this, eD);
                        }
                   }
                },
                img_arrow: {
                    _visible: false,
                    _layout: [[0.1, 0.1], [0.62, 0.75], [0, 0]],
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
                    _layout: [[0.1, 0.1], [0.044, 0.8], [0, 0], true],
                },
                layout_eatDisplay: {
                    img_eat: {
                        _visible: false,
                    }
                },
                img_putCard: {
                    _layout: [[0.15, 0.15], [0.3, 0.8], [0, 0]],
                    _event: {
                        HZAddCards: function(eD) {
                            MjClient.playui.updatePutCardByAdd(this, eD);
                        }
                   }
                },
                img_arrow: {
                    _visible: false,
                    _layout: [[0.1, 0.1], [0.38, 0.75], [0, 0]],
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
            node_xing: {
                layout_eatDisplay: {
                    img_eat: {
                        _visible: false,
                    }
                },
                img_putCard: {
                    _layout: [[0.15, 0.15], [0.73, 0.6], [0, 0]],
                    _event: {
                        HZAddCards: function(eD) {
                            MjClient.playui.updatePutCardByAdd(this, eD);
                        }
                   }
                },
            },
            node_eatChoice: {
                btn_guo: {
                    _layout: [[0, 0.1], [0.7, 0.1], [4.6, 2.5]],
                },
                btn_hu: {
                    _layout: [[0, 0.1], [0.7, 0.1], [-6, 2.5]],
                },
                btn_mao: {
                    _visible: false,
                    _layout: [[0, 0.1], [0.7, 0.1], [-3, 2.5]],
                    bg_img: {
                        _run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _click: function() {
                        MjClient.playui.showSelectCards();
                    }
                },
                btn_peng: {
                    _layout: [[0, 0.1], [0.7, 0.1], [0, 2.5]],
                    _click: function() {
                        if (MjClient.data.sData.players[SelfUid()].eatFlag & 32) {
                            MjClient.showMsg("选择对后视为过胡，确定对吗？", function() {
                                MjClient.playui.hideEatBtns();
                                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                                    cmd: "MJPeng"
                                });
                            }, function() {}, "1");
                        } else {
                            MjClient.playui.hideEatBtns();
                            MjClient.gamenet.request("pkroom.handler.tableMsg", {
                                cmd: "MJPeng"
                            });
                        }
                    }
                },
                btn_chi: {
                    _layout: [[0, 0.1], [0.7, 0.1], [1.3, 3.8]],
                    _click: function() {
                        var sData = MjClient.data.sData;
                        var pl = MjClient.playui.getUIPlayer(0);
                        var eatCards = MjClient.majiang.getChiList(pl, sData.tData.lastPutCard, sData);
                        MjClient.playui.commitEatCard(eatCards);
                    }
                },
                btn_cancel: {
                    _run: function() {
                        this.changeLayout = function() {
                            if (MjClient.playui.getPlayersNum() == 4) {
                                return;
                            }
                            var type = MjClient.playui.getLayoutType();
                            switch (type) {
                                case 0: //偏右
                                    setWgtLayout(this, [0, 0.16], [0.78, 0.3], [0, 1.12]);
                                    break;
                                case 1: //传统
                                    setWgtLayout(this, [0, 0.16], [0.9, 0.3], [0, 1.12]);
                                    break;
                            }

                        }
                        this.changeLayout();
                    },
                }
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

playPanel_dangYangFanJing.prototype.updateRoundLabel = function(node) {
    node.visible = false;
    var tData = MjClient.data.sData.tData;
    if (MjClient.playui.isCoinField()) {
        return;
    }

    if (!this.isInPlay() && tData.tState != TableState.roundFinish) {
        return;
    }

    node.visible = true;
    var extraNum = tData.extraNum ? tData.extraNum:0;
    var curRound = tData.roundAll - tData.roundNum + 1 + extraNum;
    node.setString(curRound + "/" + tData.roundAll + "局");
    this.curRound = curRound;
};

// 不需要隐藏按钮
playPanel_dangYangFanJing.prototype.checkSortBtnVisible = function(node) {
    node.visible = false; 
}

playPanel_dangYangFanJing.prototype.checkArrowVisible = function(node) {
    node.zIndex = -1;
    node.visible = false;
    var tData = MjClient.data.sData.tData;
    if (tData.tState == TableState.waitReady || tData.tState == TableState.roundFinish) {
        return;
    }

    var off = this.getUIOffByNode(node);
    if (off == -1) {
        return;
    }
    node.visible = this.isCurPlayer(off);
}

playPanel_dangYangFanJing.prototype.changeEatBtnLayout = function(btnNode, len, idx) {
    var type = this.getLayoutType();
    switch (type) {
        case 1:
            setWgtLayout(btnNode, [0, 0.18], [0.86 - 0.06*(len-2), 0.2], [(idx - (len - 1) / 2) * 1.1, 1.8], false, false);
            break;
        case 0:
            setWgtLayout(btnNode, [0, 0.20], [0.88 - (len - 1 - idx) * 0.12, 0.11], [0, 1.8], false, false);
            break;
    }
};

playPanel_dangYangFanJing.prototype.addSelectEatBtns = function(type, selectBg, selectCards) {
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

    var initChiBgSize = MjClient.playui.jsBind.node_eatChoice.img_chiSelect._node.initChiBgSize;
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
            /*
            if(k == cardList.length - 1 && type == "chi") {
                cardNode.setColor(cc.color(170, 170, 170));
            }
            */
        }

        cloneBtn.setPosition(cc.p(startPos.x + (cloneBtn.width + off_x) * i, startPos.y));
        selectBg.addChild(cloneBtn);
        selectBtns.push(cloneBtn);
    }
    return selectBtns;
};

playPanel_dangYangFanJing.prototype.showSelectCards = function () {
    var self = this;
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = sData.players[SelfUid()];

    this.hideEatBtns();
    MjClient.playui.jsBind.node_eatChoice.btn_cancel._node.visible = true;

    var selectBgArr = {
        "chi": MjClient.playui.jsBind.node_eatChoice.img_chiSelect._node,
        //"liu": MjClient.playui.jsBind.node_eatChoice.img_liuSelect._node,
        //"piao": MjClient.playui.jsBind.node_eatChoice.img_liuSelect._node,
    };

    var bShowEatCardsScaleAction = false; //是否执行缩放动画

    //添加一组可以吃或比的牌
    var addSelectEatCardsRow = function() {
        var selectBg = selectBgArr['chi'];
        selectBg.visible = true;
        selectBg.x = cc.winSize.width * 0.5;
        var liuCards = [];
        if (pl.liuCards && pl.liuCards.length > 0) {
            liuCards = pl.liuCards;
        } else {
            liuCards = MjClient.majiang.getLiuCardsInHand(pl, sData);
        }
        if(liuCards.length <= 0 && tData.lastPutCard != -1){
            liuCards.push(tData.lastPutCard);
        }
        var optionCards = [];
        for(var i = 0; i < liuCards.length; i++){
            optionCards.push(Array.apply(null, Array(4)).map(() => liuCards[i]));
        }
        if (!optionCards || optionCards.length == 0) {
            return;
        }

        var optionBtns = self.addSelectEatBtns('chi', selectBg, optionCards);
        for (var i = 0; i < optionBtns.length; ++i) {
            var btn = optionBtns[i];
            (function(cards) {
                btn.addClickEventListener(function(btn) {
                    if ((MjClient.data.sData.players[SelfUid()].eatFlag & 32) > 0) {
                        MjClient.showMsg("毛牌后视为过胡，确定吃吗？", function() {
                            MjClient.playui.hideEatBtns();
                            MjClient.gamenet.request("pkroom.handler.tableMsg", {
                                cmd: "HZLiuCard",
                                card: cards[0],
                                optFlag: (MjClient.playui.getSelfEatFlag() & 4) || (MjClient.playui.getSelfEatFlag() & 16)
                            });
                        }, function() {}, "1");
                    } else {
                        MjClient.playui.hideEatBtns();
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "HZLiuCard",
                            card: cards[0],
                            optFlag: (MjClient.playui.getSelfEatFlag() & 4) || (MjClient.playui.getSelfEatFlag() & 16)
                        });
                    }
                });
            })(optionCards[i]);
        }
        var bgArr = [];
        bgArr.push(selectBgArr['chi'])
        self.doSelectEatAction(bgArr, bShowEatCardsScaleAction);
    };
    addSelectEatCardsRow();
}

playPanel_dangYangFanJing.prototype.getEatLabel = function(eatType) {
    var img = {mjchi: 'chi', mjpeng:'dui', mjgang:'mao', hu:'hu', mjgang0:'mao', mjgang1:'mao'};
    if (eatType in img) {
        return 'playing/ziPaiTable/huaPai/' + img[eatType] + '.png';
    }
    return null;
};

playPanel_dangYangFanJing.prototype.displayEatLabel = function(node, eatType, msg) {
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

//吃牌 
playPanel_dangYangFanJing.prototype.commitEatCard = function(eatCards) {
    var self = this;
    var tData = MjClient.data.sData.tData;
    var msg = {
        cmd: "MJChi",
        eatCards: eatCards,
        cardNext: tData.cardNext,
        card: tData.lastPutCard
    };

    if (MjClient.data.sData.players[SelfUid()].eatFlag & 32) {
        MjClient.showMsg("吃牌后视为过胡，确定吃吗？", function() {
            self.hideEatBtns();
            MjClient.gamenet.request("pkroom.handler.tableMsg", msg);
        }, function() {}, "1");
    } else {
        self.hideEatBtns();
        MjClient.gamenet.request("pkroom.handler.tableMsg", msg);
    }
};

// 是否需要切牌动画
playPanel_dangYangFanJing.prototype.isNeedShuffle = function() {
    return false;
};

// 是否放偎
playPanel_dangYangFanJing.prototype.isOtherWei = function(card) {
    return false;
};

// 胡息
playPanel_dangYangFanJing.prototype.updateHuXi = function(node) {
    node.ignoreContentAdaptWithSize(true);
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
    var huXi = this.calculateHuXi(off);
    node.setString(huXi);
};

playPanel_dangYangFanJing.prototype.getTableHuXi = function(off) {
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return 0;
    }
    return MjClient.majiang.getSortHuxi(MjClient.data.sData, pl);
};

playPanel_dangYangFanJing.prototype.calculateHuXi = function(off) {
    return this.getTableHuXi(off);
};


// 获取桌面牌的显示类型, 翻精全部显示正面
playPanel_dangYangFanJing.prototype.getCardShowType = function(card, off) {
    return 2; 
};

// 翻精.所有门牌按顺序排列 + 全部显示正面
playPanel_dangYangFanJing.prototype.getEatCardShowType = function(eatType, card, cardIndex, off) {
    var showType = 2;
    if (eatType == "mjchi") {
        showType = cardIndex < 2 ? 2 : 3;
    }
    return showType;
};

// 添加精牌、毛牌角标
playPanel_dangYangFanJing.prototype.addJingIcon = function(node, isHand) {
    if (!cc.sys.isObjectValid(node)) {
        return;
    }
    var sData = MjClient.data.sData;
    var children = node.getChildren();
    for (var i = 0; i < children.length; i++) {
        var card = children[i];
        if (card.getName() == 'head') { //兼容小结算
            continue;
        }
        var path = null;
        var isJingCard = MjClient.majiang.isJingCard(sData, card.tag);
        var head = node.getChildByName('head');
        //优先判断毛
        if (head) {
            // 小结算
            if (children.length == 6 && i == 2) {
                path = "playing/ziPaiTable/huaPai/icon_mao.png";
            } else if (isJingCard) {
                path = "playing/ziPaiTable/huaPai/icon_jing.png";
            }
        } else {
            if (isHand) {
                // 手牌
                if (isJingCard) {
                    path = "playing/ziPaiTable/huaPai/icon_jing.png";
                }
            } else {
                // 门牌
                if (children.length == 4) {
                    path = "playing/ziPaiTable/huaPai/icon_mao.png";
                } else if (isJingCard) {
                    path = "playing/ziPaiTable/huaPai/icon_jing.png";
                }
            }
        }
        
        if (path) {
            var icon = ccui.ImageView.create(path);
            icon.scale = isHand ? 1.2 : 0.8;
            icon.x = icon.width * icon.scale / 2 + (isHand ? 2 : -4);
            icon.y = card.height - icon.height * icon.scale / 2 + (isHand ? 0 : 1);
            card.addChild(icon);
        }
    }
}

// 添加箭头
playPanel_dangYangFanJing.prototype.addFromIcon = function(node, eatType, off, from) {
    if (!cc.sys.isObjectValid(node)) {
        return;
    }
    if (off == undefined || off == -1 || from == undefined || from == -1) {
        return; //参数无效
    }
    if (eatType == 'mjgang1' || off == from) {
        return; //毛自己手牌不需要箭头
    }

    //当前头像节点
    var curHead = this.getUINode(off).getChildByName('layout_head');
    //来源头像节点
    var fromHead = this.getUINode(from).getChildByName('layout_head');
    
    //箭头指向判定
    var disX = Math.abs(fromHead.x - curHead.x);
    var disY = Math.abs(fromHead.y - curHead.y);
    var cpX = MjClient.size.width / 2;
    var cpY = MjClient.size.height / 2;
    var angel = 0; //图默认指向右边

    if (disX > cpX) {
        if (disY > cpY) {
            //right & down 
            angel = fromHead.y > curHead.y ? 0 : 90;
        } else {
            //right & left
            angel = fromHead.x > curHead.x ? 0 : 180;
        }
    } else {
        //left & down
        angel = fromHead.y > curHead.y ? -90 : 90;
    }

    var children = node.getChildren().slice();
    children.sort(function(a, b) {
        return a.zIndex - b.zIndex;
    })
    var card = children[children.length-1];
    var fromIcon = ccui.ImageView.create('playing/ziPaiTable/huaPai/img_from.png');
    fromIcon.setRotation(angel);
    fromIcon.x = card.width / 2;
    fromIcon.y = 0;
    card.addChild(fromIcon);
}

playPanel_dangYangFanJing.prototype.getEatCardNode = function(eatType, cardArr, off, from) {
    var eatCardNode = playLayer_ziPai.prototype.getEatCardNode.apply(this, [eatType, cardArr, off]);
    //添加精牌角标
    this.addJingIcon(eatCardNode);
    //添加箭头
    this.addFromIcon(eatCardNode, eatType, off, from);
    return eatCardNode;
};

// 门牌排序.固定
playPanel_dangYangFanJing.prototype.sortEatCard = function(list) {
    /*for (var k in list) {
        list[k].sort(function(a, b) {
            return b - a;
        })
    }*/
}

playPanel_dangYangFanJing.prototype.updateEatCard = function(node, eatType, msg) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurEatPlayer(msg, off)) {
        return;
    }
    eatType = this.apartGangType(eatType, msg);
    var cardArr = this.getEatCardArr(eatType, off);
    this.sortEatCard(cardArr);
    var from = this.getUIOffByUid(MjClient.data.sData.tData.uids[msg.from]);
    var eatCardNode = this.getEatCardNode(eatType, cardArr, off, from);
    var lastLineCount = this.getLastEatNodeLineCount(cardArr.length, off);
    this.dislpayEatCardNode(eatCardNode, lastLineCount, false, eatType, off);
};

playPanel_dangYangFanJing.prototype.initEatCard = function(node, isRoundEndMsg) {
    if ((MjClient.rePlayVideo != -1 || !this.isInPlay()) && !isRoundEndMsg) {
        return;
    }

    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    var lastLineCount = 0;

    //跑胡需要走这里 但游戏未开始时需要规避
    if (!pl || !pl.mjsort) {return;}
    var tData = MjClient.data.sData.tData;
    for (var i = 0; i < pl.mjsort.length; i++) {
        var mjSort = pl.mjsort[i];
        var cardArr = this.getEatCardArr(mjSort.name, off, mjSort.pos);
        this.sortEatCard(cardArr);
        var from = this.getUIOffByUid(tData.uids[mjSort.from]);
        var eatCardNode = this.getEatCardNode(mjSort.name, cardArr, off, from);
        this.dislpayEatCardNode(eatCardNode, lastLineCount, true, mjSort.name, off);
        lastLineCount += cardArr.length;
    }
};

// 翻精.对(碰)牌不会变成毛, 不存在替换
playPanel_dangYangFanJing.prototype.dislpayEatCardNode = function(eatCardNode, lastLineCount, isInit, eatType, off) {
    var layout_eatCards = this.getUINode(off).getChildByName("layout_eatCards");
    var point = this.getEatCardPoint(off);
    var targetY = point.y;
    var targetX = point.x + point.dx * lastLineCount * eatCardNode.cardWidth;
    
    eatCardNode.x = eatCardNode.targetX = targetX;
    eatCardNode.y = targetY;
    layout_eatCards.addChild(eatCardNode);

    if (!isInit) {
        var aniTime = this.getAniTimeByType("eat");
        if (this.isAniParallel()) { // 1段
            eatCardNode.x = targetX + point.dx * 3 * eatCardNode.cardWidth;
            eatCardNode.runAction(cc.moveTo(aniTime, targetX, targetY));
        } else { // 3段动画
            var card = eatCardNode.children[0];
            var targetScale = card.scale;
            for (var i = 0; i < eatCardNode.children.length; i++) {
                card = eatCardNode.children[i];
                card.scale = targetScale * 1.7;
                card.runAction(cc.scaleTo(aniTime[0], targetScale));
            }

            eatCardNode.x = point.x + point.dx * 7.5 * eatCardNode.cardWidth;
            var action = cc.sequence(
                cc.delayTime(aniTime[0] + aniTime[1]),
                cc.moveTo(aniTime[2], targetX, targetY).easing(cc.easeSineIn())
            );
            eatCardNode.runAction(action);
        }
    }
};

// 新增.回放非自己玩家进牌数据处理
playPanel_dangYangFanJing.prototype.hzNewCardForOtherReplay = function(node, card) {
    if (!card)
        return;
    var off = MjClient.playui.getUIOffByNode(node);
    if(MjClient.playui.isCurPlayer(off)){
        var mjhand = [];
        for(var i = 0; i < MjClient.OtherHandArr[off].length; i++){
            mjhand = mjhand.concat(MjClient.OtherHandArr[off][i]);
        }
        mjhand.push(card);
        MjClient.OtherHandArr[off] = MjClient.majiang.sortCardForOtherReplay(mjhand);
    }
}

// 翻精.毛完补牌 弃用.改为展示收入动画
playPanel_dangYangFanJing.prototype.updateHandCardByAdd = function(node, msg) {
    /*
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl || msg.uid != pl.info.uid) {
        return;
    }

    // 牌局中别人补牌
    if (MjClient.rePlayVideo == -1 && off != 0) {
        return;
    }

    // 补牌不能排序!!!只能插到最后一列
    if (off == 0) { 
        MjClient.HandCardArr[8].push(msg.newCard); //写法需要优化 todo
    } else {
        MjClient.OtherHandArr[off][8].push(msg.newCard);
    }
    this.refreshHandCard(off);
    */
};

playPanel_dangYangFanJing.prototype.checkHandCardByPut = function(off) {
    if (off != 0 || MjClient.rePlayVideo != -1) {
        return false;
    }
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return false;
    }
    var cardHandArr = [];
    if (MjClient.HandCardArr) {
        for (var i = 0; i < MjClient.HandCardArr.length; i++) {
            /*for (var j = 0; j < MjClient.HandCardArr[i].length; j++) {
                cardHandArr.push(MjClient.HandCardArr[i][j]);
            }*/
            cardHandArr = cardHandArr.concat(MjClient.HandCardArr[i]);
        }
    }
    var cardHand = [];
    if (pl.mjhand) {
        cardHand = pl.mjhand.slice();
    }
    cardHandArr.sort(function(a, b) {return a - b});
    pl.mjhand.sort(function(a, b) {return a - b});
    cc.log('多牌检测==', JSON.stringify(cardHandArr), JSON.stringify(pl.mjhand));
    if (cardHandArr.length == cardHand.length) {
        cardHandArr.sort(function(a, b) {
            return a - b;
        });
        cardHand.sort(function(a, b) {
            return a - b;
        });

        for (var i = 0; i < cardHandArr.length; i++) {
            if (cardHandArr[i] != cardHand[i]) {
                if (MjClient.majiang.sortCard) {
                    MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || []);
                }
                return true;
            }
        }
    }else{
        if (MjClient.majiang.sortCard) {
            MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || []);
        }
        return true;
    }
    return false;
};

playPanel_dangYangFanJing.prototype.removeHandCard = function(card, off) {
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

playPanel_dangYangFanJing.prototype.getPutCardBg = function (putType) {
    return "playing/ziPaiTable/huaPai/chuPai_bg.png";
};

// 计算进牌时应落在手里的相对位置 TODO
playPanel_dangYangFanJing.prototype.getNewHandCardPos = function(node, off) {
    var uiNode = this.getUINode(off);
    var layout_handCards = uiNode.getChildByName("layout_handCards");

    //回放其它玩家飞头像.TODO
    var pos = {x:0, y:0};
    if (off == 0) {
        var parent = layout_handCards.getChildByTag(8); //进牌固定放入最后一列最上面
        if (cc.sys.isObjectValid(parent)) {
            var temp = this.getNewCard("hand", 1, 0);
            var offY = this.getOffYByCard(temp, parent.bCompress);
            var y = parent.getChildrenCount() * offY;
            //坐标转换
            var wPos = parent.convertToWorldSpace(cc.p(0, y));
            var nPos = node.parent.convertToNodeSpace(wPos);
            pos.x = nPos.x + node.anchorX * node.scaleX * node.width - temp.anchorX * temp.scaleX * temp.width * 0.21;
            pos.y = nPos.y + node.anchorY * node.scaleY * node.height + temp.anchorY * temp.scaleY * temp.height * 0.5;
        }
    } else {
        pos = uiNode.getChildByName("layout_head").getPosition();
    }
    return pos;
}

// 收入亮张动画
playPanel_dangYangFanJing.prototype.showPickCardAnimation = function(node) {
    node.stopAllActions();
    var off = this.getUIOffByNode(node);
    if (!this.isCurPlayer(off)) {
        return;
    }

    // 往对应位置飞
    var pos = this.getNewHandCardPos(node, off);
    node.isPick = true;
    node.runAction(cc.sequence(
        cc.DelayTime(0.5),
        cc.spawn(cc.scaleTo(this.getActionTime(), 0.5 * MjClient.size.width/640), cc.moveTo(this.getActionTime(), pos.x, pos.y)).easing(cc.easeCubicActionOut()), 
        cc.callFunc(()=>{
            node.opacity = 0;
            node.isPick = false;
            MjClient.playui.refreshHandCard(off);
    })));
};

playPanel_dangYangFanJing.prototype.updatePutCardByAdd = function(node, msg) {
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if(!this.isInPlay() || pl.info.uid != msg.uid){
        return;
    }

    if(off == 0){
        this.addNewCardToHandArr(msg.cardList[0]);
    }else if(MjClient.rePlayVideo != -1){
        this.hzNewCardForOtherReplay(node, msg.cardList[0]);
    }

    node.loadTexture(this.getPutCardBg(1));
    node.visible = true;
    node.opacity = 255;

    var putCard = node.getChildByName("img_card"); // 牌
    var src = this.getCardSrc("put", msg.cardList[0], false);

    putCard.loadTexture(src, 0);

    var showPickCardAnimation = function (node) {
        node.stopAllActions();
        var off = this.getUIOffByNode(node);

        var pos = this.getNewHandCardPos(node, off);
        node.runAction(cc.sequence(
            cc.DelayTime(0.5),
            cc.spawn(cc.scaleTo(this.getActionTime(), 0.5 * MjClient.size.width/640), cc.moveTo(this.getActionTime(), pos.x, pos.y)).easing(cc.easeCubicActionOut()),
            cc.callFunc(()=>{
                node.opacity = 0;
                MjClient.playui.refreshHandCard(off);
            })));
    }.bind(this);

    var showPutCardAnimation = function (node) {
        var off = this.getUIOffByNode(node);
        var pos = MjClient.playui.jsBind.layout_cardNum._node.getPosition();

        var actTime = this.getAniTimeByType("send");
        node.setPosition(pos);
        node.stopAllActions();
        node.setScale(0);
        var seq = cc.sequence(
            cc.DelayTime(0.05),
            cc.spawn(cc.scaleTo(actTime, node.getUserData().scale), cc.moveTo(actTime, node.getUserData().pos)),

            cc.callFunc(function() {
                if (off == 0) {
                    showPickCardAnimation(node);
                }
            })
        );
        node.runAction(seq);
    }.bind(this);

    showPutCardAnimation(node);
};

playPanel_dangYangFanJing.prototype.showOutCardAnimation = function (node) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if(tData.cardNext > MjClient.majiang.cardsCount(sData) - tData.maxPlayer + 1){
        return;
    }
    playLayer_ziPai.prototype.showOutCardAnimation.apply(this, [node]);
};

playPanel_dangYangFanJing.prototype.addNewCardToHandArr = function(card) {
    if (!card || !MjClient.HandCardArr)
        return;
    MjClient.HandCardArr[8].push(card);
}

// 更新展示牌(背光跟牌)
playPanel_dangYangFanJing.prototype.updatePutCard = function(node, msg, isReconnect) {
    var tData = MjClient.data.sData.tData;
    var putType = tData.putType;
    var card = tData.currCard;

    if(node.isPick){
        delete node.isPick;
    }

    var off = this.getUIOffByNode(node);
    if (!this.isCurPlayer(off) || card == -1 || !this.isInPlay()) {
        return;
    }

    // 断线重连不显示进牌
    if (putType == 1 && isReconnect) {
        node.visible = false;
        return;
    }

    if(putType == 1 && !isReconnect){
        if(off == 0){
            this.addNewCardToHandArr(msg.newCard);
        }else if(MjClient.rePlayVideo != -1){
            this.hzNewCardForOtherReplay(node, msg.newCard);
        }
    }

    // 摸牌时只有自己才显示
    if (putType == 1 && off != 0 && MjClient.rePlayVideo == -1) {
        node.visible = false;
        return;
    }

    // 牌局中自己手动出牌
    if (putType == 0 && off == 0 && MjClient.rePlayVideo == -1 && !this.isInTrust(SelfUid()) && !isReconnect) {
        if(!node.visible){
            node.visible = true;
        }
        return;
    }

    node.loadTexture(this.getPutCardBg(putType));
    node.visible = true;
    node.opacity = 255;

    var putCard = node.getChildByName("img_card"); // 牌
    var src = this.getCardSrc("put", card, false);

    putCard.loadTexture(src, 0);

    this.showPutCardAnimation(node);
};

//动画执行时间
playPanel_dangYangFanJing.prototype.getActionTime = function() {
    return 0.25;
};

// 展示牌动画
playPanel_dangYangFanJing.prototype.showPutCardAnimation = function(node) {
    var off = this.getUIOffByNode(node);
    var putType = MjClient.data.sData.tData.putType;

    var pos; // 起始位置
    if (putType == 1) { // 摸牌
        pos = MjClient.playui.jsBind.layout_cardNum._node.getPosition();
    } else if (putType == 0) { // 出牌
        if (off == 0) {
            pos = cc.p(cc.winSize.width / 2, cc.winSize.height / 2 - 120);
        } else {
            pos = this.getUINode(off).getChildByName("layout_head").getPosition();
        }
    } else {
        return;
    }

    var actTime = this.getAniTimeByType("send");
    node.setPosition(pos);
    node.stopAllActions();
    node.setScale(0);
    var seq = cc.sequence(
        cc.DelayTime(0.05),
        cc.spawn(cc.scaleTo(actTime, node.getUserData().scale), cc.moveTo(actTime, node.getUserData().pos)),
        
        cc.callFunc(function() {
            if (MjClient.playui.isCurPlayer(off) && putType == 1) {
                MjClient.playui.showPickCardAnimation(node);
            }
        })
    );
    node.runAction(seq);
};

// 最后一张牌是否新进的牌.TODO待验证
playPanel_dangYangFanJing.prototype.isLastDraw = function(pl) {
    var tData = MjClient.data.sData.tData;
    return tData.putType == 1 && tData.curPlayer == tData.uids.indexOf(pl.info.uid);
    /*
    if (!pl || pl.mjState != TableState.waitPut)
        return false;
    if (tData.curPlayer >= 0) {
        return tData.lastDrawPlayer == tData.curPlayer && tData.uids[tData.curPlayer] == pl.info.uid;
    }
    return false;
    */
}

playPanel_dangYangFanJing.prototype.initHandCards = function(node, msg) {
    var tData = MjClient.data.sData.tData;
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);

    if (!pl || !this.isInPlay()) {
        return;
    }
    if (MjClient.rePlayVideo != -1 && off != 0) {
        if (!MjClient.OtherHandArr) {
            MjClient.OtherHandArr = {};
        }
        if(msg){
            //禁止重排.往最后一列插
            var arr = MjClient.OtherHandArr[off];
            arr[arr.length - 1].push(msg.card);
        }else{
            MjClient.OtherHandArr[off] = MjClient.majiang.sortCardForOtherReplay(pl.mjhand || []);
        }
    }
    //数据在NetCallBack中处理，此处为容错处理
    if (MjClient.rePlayVideo == -1 && off == 0 && (!MjClient.HandCardArr || MjClient.HandCardArr.length == 0)) {
        MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], this.isLastDraw(pl));
    }
    this.refreshHandCard(off);
};

// 获取操作按钮数组
playPanel_dangYangFanJing.prototype.getShowEatNodes = function() {
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

    if (pl.eatFlag & 2) { // 碰
        vnode.push(eat.btn_peng._node);
    }

    if ((pl.eatFlag & 4) || (pl.eatFlag & 16)) {
        vnode.push(eat.btn_mao._node);
    }

    if (pl.eatFlag & 32) { // 胡
        vnode.push(eat.btn_hu._node);
    }

    if (vnode.length > 0) { // 过
        vnode.push(eat.btn_guo._node);
    }

    return vnode;
};

/***************手牌相关****************/

playPanel_dangYangFanJing.prototype.is34Mask = function() {
    return false;
};

playPanel_dangYangFanJing.prototype.is34ColorGrey = function() {
    return false;
};

// 触摸收/张牌 param1=牌的父节点, param2=当前触摸的牌
playPanel_dangYangFanJing.prototype.switchHandCardRow = function(cardRoot) {
    if (!cc.sys.isObjectValid(cardRoot))
        return;
    var children = cardRoot.getChildren();
    if (children.length <= 1) {
        return;
    }

    children.sort(function(a, b) {
        return b.zIndex - a.zIndex;
    })

    var offY = this.getOffYByCard(children[0], cardRoot.bCompress);
    for (var i = children.length - 1; i >= 1; --i) {
        children[i].y = i * offY;
    }
}

playPanel_dangYangFanJing.prototype.setCardTouchHandler = function(card, off) {
    var self = this;
    var pl = this.getUIPlayer(off);
    var dict = {};
    for (var i = 0; i < pl.mjhand.length; i++) {
        var cd = pl.mjhand[i];
        dict[cd] = dict[cd] ? dict[cd] + 1 : 1;
    }

    if (dict[card.tag] >= 3 && this.is34Mask()) {
        if (this.is34ColorGrey()) {
            card.setColor(cc.color(170, 170, 170));
        }
        card.addTouchEventListener(null);
        card.setTouchEnabled(false);
        if (MjClient.movingCard_paohuzi == card) {
            MjClient.movingCard_paohuzi = null;
        }
        return;
    }

    card.setColor(cc.color(255, 255, 255));

    var cloneCard = null;
    var isSwitch = true; //是否切换压缩状态
    card.addTouchEventListener(function(btn, eventType) {
        if (MjClient.movingCard_paohuzi !== null && cc.sys.isObjectValid(MjClient.movingCard_paohuzi) && MjClient.movingCard_paohuzi !== btn) {
            return;
        }

        if (MjClient.isRefreshNodeing || MjClient.isDealing) {
            return;
        }

        var dis = 5; //拖动判定的位移临界值
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
            
            btn.bIndex = btn.zIndex;
            btn.bPIndex = btn.parent.zIndex;
            btn.bPos = {x:btn.x, y:btn.y};

            //btn.parent.zIndex = 1;
            //btn.zIndex = 5;
            btn.setAnchorPoint(0.5, 0.5);
            btn.x += btn.width * btn.scaleX * 0.5;
            btn.y += btn.height * btn.scaleY * 0.5;

            btn.beginPos = {x:btn.x, y:btn.y};
        }

        if (eventType == ccui.Widget.TOUCH_MOVED) {
            var mPos = btn.getTouchMovePosition();
            btn.setPosition(cc.pSub(mPos, btn.parent.getPosition()));
            if (Math.abs(btn.x - btn.beginPos.x) > dis ||
                Math.abs(btn.y - btn.beginPos.y) > dis) {
                bSwitch = false; //一旦曾经超出此范围即判定非切换
                btn.parent.zIndex = 1;
                btn.zIndex = 20;
                //拖动超过临界位移=非收张, 检测听牌
                if (Array.isArray(MjClient.hintPutList_ziPai) && MjClient.hintPutList_ziPai.indexOf(btn.tag) >= 0) {
                    if (MjClient.playui.hasTingByPut()) {
                        MjClient.playui.checkTingCardsNew(btn.tag);
                    }else if(MjClient.playui.isCheckTingStats()){
                        MjClient.playui.checkTingStats(btn.tag);
                    } else {
                        MjClient.playui.checkTingCards(btn.tag);
                    }
                }
            }
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

            if (Math.abs(btn.x - btn.beginPos.x) <= dis &&
                Math.abs(btn.y - btn.beginPos.y) <= dis && isSwitch) {
                //收张
                if(MjClient.playui.isCheckTingStats()){
                    MjClient.playui.checkTingStats();
                }else{
                    MjClient.playui.checkTingCards();
                }
                //还原大小.花牌目前不需要
                if(btn && cc.sys.isObjectValid(btn) && MjClient.playui.isShowLongCard()) {
                    MjClient.playui.changeHandCardSize(btn);
                    var src = MjClient.playui.getCardSrc("hand", btn.tag, false);
                    MjClient.playui.loadCardTexture(btn, src, MjClient.playui.getResType()); 
                }
                btn.x = btn.bPos.x;
                btn.y = btn.bPos.y;
                btn.zIndex = btn.bIndex;
                btn.parent.zIndex = btn.bPIndex;
                btn.setAnchorPoint(0, 0);
                btn.parent.bCompress = !btn.parent.bCompress; //间距状态切换
                MjClient.playui.compressState[btn.parent.tag] = btn.parent.bCompress;
                MjClient.playui.switchHandCardRow(btn.parent);
                isSwitch = true;
                delete MjClient.moveCard;
                return;
            }

            isSwitch = true;
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
            } else { // 移动手牌
                // cc.log("pos.x@@ ", pos.x, " btn.parent.x@@ ", btn.parent.x);
                var w = btn.width*btn.scaleX/0.91;
                var dstCol = col + Math.round((pos.x - btn.parent.x) / (w) - 0.5); // 目的列
                // cc.log("dstCol@@ ", dstCol);
                if (dstCol == col) { // 列未变
                    MjClient.HandCardArr[col].splice(parseInt(row), 1);
                    MjClient.playui.fixArrIndex(dstCol, card, btn, false);
                } else if (dstCol >= 0 && dstCol < MjClient.HandCardArr.length) { // 当前有手牌列
                     // 插牌 插牌无限制
                    MjClient.moveCard.nexCIndex = dstCol;
                    MjClient.HandCardArr[col].splice(row, 1);
                    MjClient.playui.fixArrIndex(dstCol, card, btn, true);
                } else {
                    //超出9列横向范围归位
                }
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

//移动最后一列的一张牌(如果有)到对应列
playPanel_dangYangFanJing.prototype.moveLastCardToRow = function() {
    if (!MjClient.HandCardArr || !MjClient.HandCardArr[8] || MjClient.HandCardArr[8].length == 0) {
        return;
    }
    var cd = MjClient.HandCardArr[8].shift();
    var idx = Math.floor(cd / 10);
    var list = MjClient.HandCardArr[idx]; 
    var pos = list.indexOf(cd);
    if (pos < 0) {
        list.push(cd);  //没相同牌放最上面
    } else {
        list.splice(pos, 0, cd); //该张牌放到相同牌一起
    }
}

playPanel_dangYangFanJing.prototype.doPut = function(card, btn, col, row) {
    playLayer_ziPai.prototype.doPut.apply(this, [card, btn, col, row]);
    //this._super(card, btn, col, row);
    // 最后一列最下面的一张牌移动到对应列.坑
    this.moveLastCardToRow();
    MjClient.playui.refreshHandCard(0);
};

playPanel_dangYangFanJing.prototype.updateHandCardByPut = function(node) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurPlayer(off)) {
        return;
    }

    if (off == 0) {
        this.removeTingSign();
    }

    // 牌局中别人出牌
    if (MjClient.rePlayVideo == -1 && off != 0) {
        return;
    }

    MjClient.hasPut = false; // todo
    // 牌局中自己手动出牌
    if (MjClient.rePlayVideo == -1 && off == 0 && !this.isInTrust(SelfUid())) {
        if(this.checkHandCardByPut(off)){
            this.refreshHandCard(off);
        }
        return;
    }

    // 移除手牌
    this.removeHandCard(MjClient.data.sData.tData.currCard, off);
    if (MjClient.rePlayVideo != -1 && off == 0) {
        //自己回放时，出牌后最后一列牌(如果有)要移动一张到对应列
        this.moveLastCardToRow();
    }
    this.checkHandCardByPut(off);
    this.refreshHandCard(off);
};

//获取标准状态手牌一列的行距差. param2=是否压缩状态
playPanel_dangYangFanJing.prototype.getOffYByCard = function(card, bCompress){
    if (bCompress) {
        return card.height * card.scaleY - card.height / 1.3 * card.scaleY;
    }
    return card.height * card.scaleY - card.height / 1.8 * card.scaleY;
}

playPanel_dangYangFanJing.prototype.checkCanNotPutCardMask = function(){
    return false;
}

playPanel_dangYangFanJing.prototype.isZiPaiCard = function (card) {
    return (card >= 1 && card <= 73);
};

playPanel_dangYangFanJing.prototype.getEmptyIndex = function(cardArray) {
    return [];
}

playPanel_dangYangFanJing.prototype.addOneHandCard = function(col, row, cardNum, off) {
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
    var off_y = this.getOffYByCard(newCard, cardParent.bCompress);
    var cardCount = cardParent.childrenCount;

    newCard.setName(row);
    newCard.zIndex = 20 - row;
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
    if (this.checkCanNotPutCardMask() && pl && pl.canNotPutCard) {
        if (pl.canNotPutCard.indexOf(cardNum) != -1) {
            newCard.setColor(cc.color(170, 170, 170));
        }
    }
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
    //cc.log("chow", "addOrAdjustHandCard_hengYang: name=" + newCard.getName() + " num=" + newCard.num + " tag =" + newCard.tag);
};

playPanel_dangYangFanJing.prototype.refreshHandCard = function(off, isRefresh) {
    cc.log('牌堆==', JSON.stringify(MjClient.HandCardArr));
    if (!this.isInPlay() && !isRefresh) {
        return;
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
            //todo.写法优化
            for (var k = 0; k < cardArr.length; k++) {
                var groupList = cardArr[k];
                //即使没有牌也要创建空列
                var cardParent = layout_handCards.getChildByTag(k);
                if (!cardParent) {
                    cardParent = this.getCardRoot(layout_handCards.cardRoot, k);
                    if (!cardParent) {
                        cardParent = new cc.Node();
                        cardParent.tag = k;
                        cardParent.width = 95;//newCard.width;
                        layout_handCards.addChild(cardParent);
                    } else {
                        layout_handCards.addChild(cardParent);
                    }
                    cardParent.bCompress = this.compressState[k]; //压缩状态
                    cardParent.zIndex = 0;
                }
                for (var j = 0; j < groupList.length; j++) {
                    this.addOneHandCard(k, j, groupList[j], off);
                }
            }

            this.releaseHandCardNode(off);
            this.addTingSign(); // 添加听牌角标
            var handCard = uiNode.getChildByName("img_handCard");
            var width = this.getHandCardSize().width;
            //牌的宽度是缩小到0.86的
            width /= 0.91;
            var scale_x = handCard.scaleX;
            var winSize = MjClient.size;
            var totalWidth = width * cardArr.length * scale_x;
            var nodeY = 0 - handCard.height * handCard.scaleY * 0.35; 
            for (var i = 0; i < cardArr.length; i++) {
                var addNode = layout_handCards.getChildByTag(i);
                this.showHandHuXi(addNode);

                if (addNode.lastPosition) {
                    addNode.setPosition(addNode.lastPosition);
                    this.doMoveToAction(addNode, cc.p((winSize.width - totalWidth) / 2 + i * width * scale_x + 38.5*winSize.width/640, nodeY));
                } else {
                    addNode.setPosition(cc.p((winSize.width - totalWidth) / 2 + i * width * scale_x + 38.5 * winSize.width/640, nodeY));
                }
                //列内间距压缩状态
                this.addJingIcon(addNode, true);
            }
            postEvent("LY_addHandHuXi");
        }
    } else {
        //回放
        var handNode = null;
        var cardArr = null;
        var handCard = null;
        if (off == 0) {
            handNode = uiNode.getChildByName("layout_handCards");
            handCard = uiNode.getChildByName("img_handCard");
            cardArr = MjClient.HandCardArr;
        } else {
            handNode = uiNode.getChildByName("layout_replayCards");
            handCard = uiNode.getChildByName("layout_replayCards");
            cardArr = MjClient.OtherHandArr[off];
        }
        handNode.visible = true;
        handNode.removeAllChildren();

        //清理空数组
        if (!cardArr) {
            return;
        }
        if (off != 0) {
            for (var k = cardArr.length - 1; k >= 0; k--) {
                if (cardArr[k].length == 0) {
                    cardArr.splice(k, 1);
                }
            }
        }

        function createCdParent(col) {
            var cardParent = handNode.getChildByTag(col);
            if (!cardParent) {
                cardParent = new cc.Node();
                cardParent.tag = col;
                cardParent.width = 95;
                handNode.addChild(cardParent);
            }
        }

        for (var k = 0; k < cardArr.length; k++) {
            var groupList = cardArr[k];
            //即使没有牌也要创建空列
            if (off == 0) {
                createCdParent(k);
            }
            for (var j = 0; j < groupList.length; j++) {
                if (off == 0) {
                    if (this.getPlayersNum() == 4) {
                        this.addHandCardReplay(k, j, groupList[j], off); 
                    } else {
                        this.addHandCard(k, j, groupList[j], off);
                    }
                } else {
                    this.addHandCardReplay(k, j, groupList[j], off);
                }
            }
        }

        if (off == 0) {
            this.addTingSign(); // 添加听牌角标
            var width = this.getHandCardSize().width;
            //牌的宽度是缩小到0.86的
            width /= 0.91;
            var scale_x = handCard.scaleX;
            var winSize = MjClient.size;
            var totalWidth = width * cardArr.length * scale_x;
            var nodeY = 0 - handCard.height * handCard.scaleY * 0.35;
            for (var i = 0; i < cardArr.length; i++) {
                var addNode = handNode.getChildByTag(i);
                addNode.setPosition(cc.p((winSize.width - totalWidth) / 2 + i * width * scale_x + 38.5 * winSize.width/640, nodeY));
                this.addJingIcon(addNode, true);
            }
        }
        postEvent("LY_addHandHuXi");
        cc.log("================off:" + off + "----------" + JSON.stringify(cardArr));
    }
};

playPanel_dangYangFanJing.prototype.addHandCard = function(col, row, cardNum, off) {
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
    //var off_y = newCard.height * scale_y - newCard.height / 4 * scale_y;
    var off_y = this.getOffYByCard(newCard, cardParent.bCompress);

    var cardCount = cardParent.childrenCount;
    newCard.setName(row);
    newCard.zIndex = 20 - row;
    newCard.anchorX = 0;
    newCard.anchorY = 0;
    newCard.x = beginPoint.x;
    newCard.y = beginPoint.y + cardCount * off_y;
    cardParent.addChild(newCard);
};

//总结算面板
playPanel_dangYangFanJing.prototype.createGameOverLayer = function(type) {
    return new GameOverLayer_dangYangFanJing();
};

//小结算面板
playPanel_dangYangFanJing.prototype.createEndOneLayer = function(type) {
    return new EndOneView_dangYangFanJing();
};

/*************设置相关**************/
playPanel_dangYangFanJing.prototype.getDefaultSetting = function() {
    return {
        layout: 1,
        bg: 0,
        pai: 0,
        fastEat: 1,
        huXi: 1, 
        xuXian: 0,
        suDu: 1,
        size: 0,
        voice: 1,
        ting: 0,
        chuBtn: 1,
        dblClick: 1,
        chuGuide:0,
    };
};

playPanel_dangYangFanJing.prototype.getMaxColumnCount = function(card){
    return 9;
}

//第一个参数修改.传目的列索引
playPanel_dangYangFanJing.prototype.fixArrIndex = function(col, cardNum, card, isDiffColumn) {
    var arr = MjClient.HandCardArr[col];
    if(isDiffColumn && this.isHandMoveToTopDiffColumn()) {
        arr.push(cardNum);
        MjClient.moveCard.nexRIndex = arr.length - 1;
        return;
    }

    
    // 插入的列内位置计算
    var uiNode = this.getUINode(0);
    // 只能通过拖动的位置和其余节点位置比较来计算
    var layout_handCards = uiNode.getChildByName("layout_handCards");
    var parent = layout_handCards.getChildByTag(col);
    if (!parent) {
        cc.log('有问题'); //todo
        return;
    }

    var idx = 0;
    if (isDiffColumn) {
        // 跨列拖动放到最上层
        idx = parent.getChildrenCount();
    } else {
        var children = parent.getChildren().slice();
        // 非同步帧渲染时的顺序和arr数组互逆
        children.reverse();
        var wPos = card.parent.convertToWorldSpace(cc.p(card.x - card.anchorX * card.width * card.scaleX, card.y - card.anchorY * card.height * card.scaleY));
        var nPos = parent.convertToNodeSpace(wPos);
        for (var i = 0; i < children.length; i++) {
            if (nPos.y >= children[i].y) {
                idx++;
            }
        }
    }

    arr.splice(idx, 0, cardNum);
    MjClient.moveCard.nexRIndex = idx;  
};

//字牌字体列表 TODO.等美术出图
playPanel_dangYangFanJing.prototype.getCardFontList = function() {
    //return ["type1", "type2", "type3"];
    return ["type1", "type1", "type1"]; 
};

//字牌资源路径
playPanel_dangYangFanJing.prototype.getCardFilePath = function() {
    var sizeList = this.getCardSizeList();
    var fontList = this.getCardFontList();
    var sizeIdx = 0;
    var fontIdx = this.getCardFontIdx();

    return "playing/huaPai/" + sizeList[sizeIdx] + "/" + fontList[fontIdx] + "/";
};

// 获取牌资源路径
playPanel_dangYangFanJing.prototype.getCardSrc = function(name, tag, isTurn) {
    var path = this.getCardFilePath();
    if(this.getResType() == 1 && name != "put"){
        path = path.replace("playing/huaPai/", "");
    }

    return (path + name + tag + ".png");
};

playPanel_dangYangFanJing.prototype.getGameBgList = function() {
    return ["playing/ziPaiTable/huaPai/bg_1.jpg", "playing/ziPaiTable/huaPai/bg_2.jpg", "playing/ziPaiTable/huaPai/bg_3.jpg"];
};

playPanel_dangYangFanJing.prototype.isShowLongCard = function() {
    return false;
};

//手牌张数 
playPanel_dangYangFanJing.prototype.getHandCount = function() {
    return 19;
};

playPanel_dangYangFanJing.prototype.loadCardTexture = function (node, src, type) {
    if (node.toString() != "[object ImageView]") {
        return;
    }
    //cc.log("chow loadCardTexture", "src = " + src + " type = " + type);
    if(type == 1){
        if(src.indexOf("playing/huaPai/") >= 0){
            src = src.replace("playing/huaPai/", "");
        }
        if(cc.spriteFrameCache.getSpriteFrame(src)){
            node.loadTexture(src, 1);
            //cc.log("chow loadCardTexture 11111 = " + node.getRenderFile().file);
        }else{
            /*if(src.indexOf("playing/ziPai/") < 0){
                node.loadTexture("playing/ziPai/" + src);
            }else{
                node.loadTexture(src);
            }*/
            node.loadTexture("playing/huaPai/" + src);
            //cc.log("chow loadCardTexture 22222 = ", node.getRenderFile().file);
        }
    }else{
        node.loadTexture(src);
        //cc.log("chow loadCardTexture 33333 = ", node.getRenderFile().file);
    }
};

playPanel_dangYangFanJing.prototype.checkBiCards = function () {
  return false;
};

playPanel_dangYangFanJing.prototype.isCheckTingStats = function() {
    return true;
}

playPanel_dangYangFanJing.prototype.getTingStats = function(putCard) {
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];
    return MjClient.majiang.getTingStats(sData, pl, putCard);
}

playPanel_dangYangFanJing.prototype.getOutCardOrientation = function(off, isOutCard) {
    var uiNode = this.getUINode(off);
    var orientation = {
        dx: 1,
        dy: 1,
        anchorX: 0,
        anchorY: 0
    };

    if (uiNode.getName() == "node_left") {
        orientation.dy = -1;
        orientation.anchorY = 1;
    } else if (uiNode.getName() == "node_right") {
        orientation.dx = -1;
        orientation.dy = -1;
        orientation.anchorX = 1;
        orientation.anchorY = 1;
    } else if (uiNode.getName() == "node_xing") {
        orientation.dx = -1;
        orientation.anchorX = 1;
        orientation.anchorY = 1;
    } else if (isOutCard) {
        orientation = {
            dx: -1,
            dy: 1,
            anchorX: 0,
            anchorY: 0
        };
    }

    if (uiNode.getName() == "node_down") {
        orientation.dx = 1;
    }
    return orientation;
};

// 获取落牌位置
playPanel_dangYangFanJing.prototype.getOutCardPos = function(off) {
    var pos = cc.p(0, 0);
    var orientation = this.getOutCardOrientation(off, true);
    var uiNode = this.getUINode(off);
    var layout_outCards = uiNode.getChildByName("layout_outCards");
    var childNum = layout_outCards.getChildrenCount();

    var type = this.getLayoutType();
    var outCard = uiNode.getChildByName("img_outCard");

    // 设置一行的数量
    function setMultiNum(num) {
        pos.x += (childNum % num + 0.5) * outCard.width * outCard.scaleX * orientation.dx;
        pos.y += (Math.floor(childNum / num) + 0.5) * outCard.height * outCard.scaleY * orientation.dy;
        if (uiNode.getName() == "node_left") {
            pos.y += layout_outCards.height - outCard.height;
        } else if (uiNode.getName() == "node_right") {
            pos.x += layout_outCards.width;
            pos.y += layout_outCards.height - outCard.height;
        } else if (uiNode.getName() == "node_xing") {
            pos.x += layout_outCards.width;
        } else {
            pos.x += layout_outCards.width;
        }
    }

    // 每行的数量
    //var lineNum = (type == 0 || off == 0) ? 6 : 30;
    lineNum = 10;
    setMultiNum(lineNum);

    return pos;
};

// 改变布局.花牌固定使用传统布局
playPanel_dangYangFanJing.prototype.changeLayout = function(uiNode) {
    var downNode = uiNode.getChildByName("node_down");
    var rightNode = uiNode.getChildByName("node_right");
    var leftNode = uiNode.getChildByName("node_left");

    var type = this.getLayoutType();
    // 间距
    var des = 0.005;

    var ipxSpace = isIPhoneX() ? 0.04 : 0; //ipx 增加间距
    if (type == 0) { //偏右
        var layoutOut = downNode.getChildByName("layout_outCards");
        setWgtLayout(layoutOut, [0.14, 0.14], [1 - des, des], [0, 0]);

        var layoutOut = leftNode.getChildByName("layout_outCards");
        if (this.getPlayersNum() == 2) {
            setWgtLayout(layoutOut, [0.14, 0.14], [des + ipxSpace, 270 / 720], [0, 0]);
        } else {
            setWgtLayout(layoutOut, [0.14, 0.14], [des + ipxSpace, 320 / 720], [0, 0]);
        }

        var layoutOut = rightNode.getChildByName("layout_outCards");
        if (this.getPlayersNum() == 2) {
            setWgtLayout(layoutOut, [0.14, 0.14], [1 - des, 270 / 720], [0, 0]);
        } else {
            setWgtLayout(layoutOut, [0.14, 0.14], [1 - des, 320 / 720], [0, 0]);
        }

        var layoutEat = downNode.getChildByName("layout_eatCards");
        var ipxPosY = isIPhoneX() ? 50 : 0; // 公用代码todo
        setWgtLayout(layoutEat, [0.14, 0.14], [533 / 1280, (330 + ipxPosY) / 720], [-0.2, 0]);
        var layoutEat = leftNode.getChildByName("layout_eatCards");
        setWgtLayout(layoutEat, [0.14, 0.14], [des + ipxSpace, 0.82], [0, 0]);

        var layoutEat = rightNode.getChildByName("layout_eatCards");
        setWgtLayout(layoutEat, [0.14, 0.14], [1 - des, 0.82], [0, 0]);
    } else { //传统
        var layoutOut = downNode.getChildByName("layout_outCards");
        setWgtLayout(layoutOut, [0.14, 0.14], [0.338, 0.5], [0, 0]);

        var layoutOut = leftNode.getChildByName("layout_outCards");
        setWgtLayout(layoutOut, [0.14, 0.14], [ipxSpace + des, 0.72 - des], [0, 0]);

        var layoutOut = rightNode.getChildByName("layout_outCards");
        if (this.getPlayersNum() == 2) {
            setWgtLayout(layoutOut, [0.14, 0.14], [1 - des, 0.72 - des], [0, 0]);
        } else {
            setWgtLayout(layoutOut, [0.14, 0.14], [1 - des, 0.72 - des], [0, 0]);
        }

        var ipxPosY = isIPhoneX() ? 0.01 : 0;

        var layoutEat = downNode.getChildByName("layout_eatCards");
        setWgtLayout(layoutEat, [0.14, 0.14], [des + ipxSpace, 0.2 - ipxPosY], [0, 0]);
        if (this.getPlayersNum() == 2) {
            setWgtLayout(layoutEat, [0.14, 0.14], [des + ipxSpace, 0.2 - ipxPosY], [0, 0]);
        }

        var layoutEat = leftNode.getChildByName("layout_eatCards");
        setWgtLayout(layoutEat, [0.14, 0.14], [0.09 + des + ipxSpace, 0.89 + ipxPosY], [0, 0]);

        var layoutEat = rightNode.getChildByName("layout_eatCards");
        setWgtLayout(layoutEat, [0.14, 0.14], [0.91 - des, 0.89 + ipxPosY], [0, 0]);
    }
};

playPanel_dangYangFanJing.prototype.showCardTingSign = function(card, isShow) {
    if (isShow) {
        var tingSign = card.getChildByName("tingSign");
        if (!tingSign) {
            tingSign = new ccui.ImageView("playing/ziPaiTable/huaPai/ting.png");
            tingSign.setName("tingSign");
            card.addChild(tingSign)
        }
        tingSign.visible = true;
        tingSign.setPosition(card.width - 4, card.height - 4);
        tingSign.setAnchorPoint(1, 1);
    } else {
        card.removeChildByName("tingSign");
    }
};

playPanel_dangYangFanJing.prototype.setWanFaUi = function(node) {
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

playPanel_dangYangFanJing.prototype.showWanFaUi = function(isShow) {
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

// 大小结算设置头像
playPanel_dangYangFanJing.prototype.setPlayerHead = function(node, pl) {
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
playPanel_dangYangFanJing.prototype.setOffLine = function(node, pl) {
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

playPanel_dangYangFanJing.prototype.isShowCardBack = function(msg, node, isReconnect) {
    return (msg && SelfUid() != msg.uid);
};
