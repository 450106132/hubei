// 通城个子牌
var playPanel_tongChengGeZiPai = playPanel_huBeiHuaPai.extend({
    ctor: function() {
        var pls = MjClient.data.sData.tData.maxPlayer;
        var jsonFile = pls == 4 ? "Play_tongChengGeZiPai4.json" : "Play_tongChengGeZiPai.json";
        playLayer_ziPai.prototype.ctor.apply(this, [jsonFile]);
        this.changeLayout(this._downNode.parent);

        // 一列最多的牌
        this.colMaxNum = 7;

        // 新进牌信息.解决摸牌入列时会闪的问题
        this.newCardInfo = {
            card:-1,
            col:-1,
            row:-1
        } 

        // 和后台约定的杠牌规则
        this.gangType = {
            zhao :{name:'zhao', eatFlag:4, type:0, data:'mjgang0'},        //招
            hua: {name:'hua', eatFlag:4, type:1, data:'mjgang0'},          //滑
            guan: {name:'guan', eatFlag:16, type:2, data:'mjgang1'},       //观生
        }
    },
    getJsBind: function() {
        var pBind = this._super();
        var jsBind = {
            img_banner: {
                _layout: [[402/1280, 0.35], [0.5, 1], [0, 0]],
            },
            img_wanFa: {
                _layout: [[220/1280, 0], [0.7616, 0.88], [0, 0]],
            },
            img_gameName: {
                _layout: [[0.16, 0], [0.5, 0.82], [0, 0]],
            },
            layout_cardNum: {
                _layout: [[0.085, 0.085], [0.5, 0.74], [0, 0]],
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
                            this.y = img_card.getChildrenCount() * 0.8 - 20;
                        };
                        this.refreshText();
                    },
                }
            },
            node_down: {
                sp_ready: {
                    _layout: [[0.07, 0.07], [0.5, 280/720], [0, 0]],
                },
                img_waitJiaZhu: {
                    _visible: false,
                    _layout: [[0.12, 0.12], [0.5, 280/720], [0, 0]],
                    _event: {
                        initSceneData: function() {
                            MjClient.playui.checkPiaoFenOptVisible(this);
                        },
                        waitJiazhu: function() {
                            MjClient.playui.checkPiaoFenOptVisible(this);
                        },
                        MJJiazhu: function() {
                            MjClient.playui.checkPiaoFenOptVisible(this);
                        },
                        mjhand: function() {
                            this.visible = false;
                        },
                        clearCardUI: function() {
                            this.visible = false;
                        }
                    }
                },
                layout_head: {
                    _layout: [[0.1, 0.1], [1146/1280, 42/720], [0, 0], true],
                    text_huXiNum: {
                        _event: {
                            clearCardUI: function() {
                                this.setString('');
                                this.parent.getChildByName('img_huXi').visible = false;
                            }
                        }
                    },
                    img_paoFen: {
                        _visible:false,
                        _event: {
                            initSceneData: function() {
                                MjClient.playui.checkPiaoFenVisible(this);
                            },
                            MJJiazhu: function() {
                                MjClient.playui.checkPiaoFenVisible(this);
                            },
                            mjhand: function() {
                                MjClient.playui.checkPiaoFenVisible(this);
                            },
                            clearCardUI: function() {
                                this.visible = false;
                            }
                        }
                    }
                },
                img_putCard: {
                    _layout: [[0.38, 0.38], [640/1280, 380/720], [0, 0]],
                },
                layout_eatDisplay: {
                    _run: function() {
                        if (MjClient.playui.isAniParallel()) {
                            setWgtLayout(this, [0.2, 0.2], [0.45, 300/720], [0, 0]);
                        } else {
                            setWgtLayout(this, [0.12, 0.12], [0.95, 0.91], [0, 0]);
                        }
                    },
                }
            },
            node_left: {
                sp_ready: {
                    _layout: [[0.07, 0.07], [163/1280, 440/720], [0, 0]],
                },
                img_waitJiaZhu: {
                    _visible: false,
                    _layout: [[0.12, 0.12], [163/1280, 440/720], [0, 0]],
                    _event: {
                        initSceneData: function() {
                            MjClient.playui.checkPiaoFenOptVisible(this);
                        },
                        waitJiazhu: function() {
                            MjClient.playui.checkPiaoFenOptVisible(this);
                        },
                        MJJiazhu: function() {
                            MjClient.playui.checkPiaoFenOptVisible(this);
                        },
                        mjhand: function() {
                            this.visible = false;
                        },
                        clearCardUI: function() {
                            this.visible = false;
                        }
                    }
                },
                layout_head: {
                    _layout: [[0.1, 0.1], [isIPhoneX() ? 120 / 1280 : 86/1280, isIPhoneX() ? 520/720 : 540/720], [0, 0], true],
                    text_huXiNum: {
                        _event: {
                            clearCardUI: function() {
                                this.setString('');
                                this.parent.getChildByName('img_huXi').visible = false;
                            }
                        }
                    },
                    img_paoFen: {
                        _visible:false,
                        _event: {
                            initSceneData: function() {
                                MjClient.playui.checkPiaoFenVisible(this);
                            },
                            MJJiazhu: function() {
                                MjClient.playui.checkPiaoFenVisible(this);
                            },
                            mjhand: function() {
                                MjClient.playui.checkPiaoFenVisible(this);
                            },
                            clearCardUI: function() {
                                this.visible = false;
                            }
                        }
                    }
                },
                img_putCard: {
                    _layout: [[0.38, 0.38], [269/1280, 450/720], [0, 0]],
                },
                layout_replayCards: {
                    _layout: [[0.1, 0.1], [140/1280, 450/720], [0, 0]],
                },
                layout_eatDisplay: {
                    _run: function() {
                        if (MjClient.playui.isAniParallel()) {
                            setWgtLayout(this, [0.2, 0.2], [142/1280, 446/720], [0, 0]);
                        } else {
                            setWgtLayout(this, [0.12, 0.12], [0.95, 0.91], [0, 0]);
                        }
                    },
                }
            },
            node_right: {
                sp_ready: {
                    _layout: [[0.07, 0.07], [0.5, 574/720], [0, 0]],
                    _run:function() {
                        if (MjClient.playui.getPlayersNum() == 3) {
                            setWgtLayout(this, [0.07, 0.07], [1070/1280, 440/720], [0, 0])
                        }
                    }
                },
                img_waitJiaZhu: {
                    _visible: false,
                    _layout: [[0.12, 0.12], [0.5, 574/720], [0, 0]],
                    _run:function() {
                        if (MjClient.playui.getPlayersNum() == 3) {
                            setWgtLayout(this, [0.12, 0.12], [1070/1280, 440/720], [0, 0])
                        }
                    },
                    _event: {
                        initSceneData: function() {
                            MjClient.playui.checkPiaoFenOptVisible(this);
                        },
                        waitJiazhu: function() {
                            MjClient.playui.checkPiaoFenOptVisible(this);
                        },
                        MJJiazhu: function() {
                            MjClient.playui.checkPiaoFenOptVisible(this);
                        },
                        mjhand: function() {
                            this.visible = false;
                        },
                        clearCardUI: function() {
                            this.visible = false;
                        }
                    }
                },
                layout_head: {
                    _layout: [[0.1, 0.1], [1226/1280, isIPhoneX() ? 540/720 : 550/720], [0, 0], true],
                    _run: function() {
                        var tData = MjClient.data.sData.tData;
                        if (tData.maxPlayer == 4) {
                            setWgtLayout(this, [0.1, 0.1], [274/1280, isIPhoneX() ? 640/720 : 650/720], [0, 0], true);
                        }
                        this.setTouchEnabled(true);
                    },
                    text_huXiNum: {
                        _event: {
                            clearCardUI: function() {
                                this.setString('');
                                this.parent.getChildByName('img_huXi').visible = false;
                            }
                        }
                    },
                    img_paoFen: {
                        _visible:false,
                        _event: {
                            initSceneData: function() {
                                MjClient.playui.checkPiaoFenVisible(this);
                            },
                            MJJiazhu: function() {
                                MjClient.playui.checkPiaoFenVisible(this);
                            },
                            mjhand: function() {
                                MjClient.playui.checkPiaoFenVisible(this);
                            },
                            clearCardUI: function() {
                                this.visible = false;
                            }
                        }
                    }
                },
                img_putCard: {
                    _layout: [[0.38, 0.38], [1046/1280, 450/720], [0, 0]],
                    _run: function() {
                        var tData = MjClient.data.sData.tData;
                        if (tData.maxPlayer == 4) {
                            setWgtLayout(this, [0.46, 0.46], [640/1280, 663/720], [0, 0]);
                        }
                        var userData = {
                            scale: this.getScale(),
                            pos: this.getPosition()
                        };
                        this.setUserData(userData);
                        MjClient.playui.changePutCardLayout(this);
                    }
                },
                layout_replayCards: {
                    _layout: [[0.1, 0.1], [1120/1280, 490/720], [0, 0]],
                    _run: function() {
                        if (MjClient.playui.getPlayersNum() == 4) {
                            setWgtLayout(this, [0.1, 0.1], [430/1280, 530/720], [0, 0])
                        }
                    }
                },
                layout_eatDisplay: {
                    _run: function() {
                        if (MjClient.playui.isAniParallel()) {
                            if (MjClient.playui.getPlayersNum() == 4) {
                                setWgtLayout(this, [0.2, 0.2], [355/1280, 590/720], [0, 0]);
                            } else {
                                setWgtLayout(this, [0.2, 0.2], [1012/1280, 514/720], [0, 0]);
                            }
                        } else {
                            setWgtLayout(this, [0.12, 0.12], [0.95, 0.91], [0, 0]);
                        }
                    },
                }
            },
            node_xing: {
                sp_ready: {
                    _layout: [[0.07, 0.07], [1070/1280, 440/720], [0, 0]],
                },
                img_waitJiaZhu: {
                    _visible: false,
                    _layout: [[0.12, 0.12], [1070/1280, 440/720], [0, 0]],
                    _event: {
                        initSceneData: function() {
                            MjClient.playui.checkPiaoFenOptVisible(this);
                        },
                        waitJiazhu: function() {
                            MjClient.playui.checkPiaoFenOptVisible(this);
                        },
                        MJJiazhu: function() {
                            MjClient.playui.checkPiaoFenOptVisible(this);
                        },
                        clearCardUI: function() {
                            this.visible = false;
                        }
                    }
                },
                layout_head: { 
                    _layout: [[0.1, 0.1], [1226/1280, isIPhoneX() ? 540/720 : 550/720], [0, 0], true],
                    text_huXiNum: {
                        _event: {
                            clearCardUI: function() {
                                this.setString('');
                                this.parent.getChildByName('img_huXi').visible = false;
                            }
                        }
                    },
                    img_paoFen: {
                        _visible:false,
                        _event: {
                            initSceneData: function() {
                                MjClient.playui.checkPiaoFenVisible(this);
                            },
                            MJJiazhu: function() {
                                MjClient.playui.checkPiaoFenVisible(this);
                            },
                            mjhand: function() {
                                MjClient.playui.checkPiaoFenVisible(this);
                            },
                            clearCardUI: function() {
                                this.visible = false;
                            }
                        }
                    }
                },
                img_putCard: {
                    _layout: [[0.38, 0.38], [1046/1280, 450/720], [0, 0]],
                },
                layout_replayCards: {
                    _layout: [[0.1, 0.1], [1120/1280, 490/720], [0, 0]],
                },
                layout_eatDisplay: {
                    _run: function() {
                        if (MjClient.playui.isAniParallel()) {
                            setWgtLayout(this, [0.2, 0.2], [1012/1280, 490/720], [0, 0]);
                        } else {
                            setWgtLayout(this, [0.12, 0.12], [0.95, 0.91], [0, 0]);
                        }
                    },
                }
            },
            node_eatChoice: {
                btn_guo: {
                    _layout: [[0, 0.1], [965/1280, 376/720], [0, 0]],
                },
                btn_jian: {
                    _visible: false,
                    _layout: [[0, 0.1], [870/1280, 380/720], [0, 0]],
                    bg_img: {
                        _run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _click: function() {
                        var tData = MjClient.data.sData.tData;
                        var msg = {
                            cmd:'MJChi',
                            eatCards: [tData.lastPutCard],
                            cardNext: tData.cardNext,
                            card: tData.lastPutCard
                        }
                        if ((MjClient.data.sData.players[SelfUid()].eatFlag & 32) > 0) {
                            MjClient.showMsg('捡牌后视为过胡，确定捡吗？', function() {
                                MjClient.playui.hideEatBtns();
                                MjClient.gamenet.request("pkroom.handler.tableMsg", msg);
                            }, function() {}, "1");
                        } else {
                            MjClient.playui.hideEatBtns();
                            MjClient.gamenet.request("pkroom.handler.tableMsg", msg);
                        }
                    }
                },
                btn_peng: {
                    _layout: [[0, 0.1], [767/1280, 380/720], [0, 0]],
                },
                btn_zhao: {
                    _layout: [[0, 0.1], [664/1280, 380/720], [0, 0]],
                },
                btn_hua: {
                    _visible: false,
                    _layout: [[0, 0.1], [561/1280, 380/720], [0, 0]],
                    bg_img: {
                        _run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _click: function() {
                        MjClient.playui.showSelectCards(MjClient.playui.gangType.hua);
                    }
                },
                btn_guan: {
                    _visible: false,
                    _layout: [[0, 0.1], [458/1280, 380/720], [0, 0]],
                    bg_img: {
                        _run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _click: function() {
                        MjClient.playui.showSelectCards(MjClient.playui.gangType.guan);
                    }
                },
                btn_hu: {
                    _layout: [[0, 0.1], [355/1280, 380/720], [0, 0]],
                },
                btn_cancel: {
                    _layout: [[0, 0.16], [0.9, 0.3], [0, 1.12]],
                    _run: function() {
                        this.changeLayout = function() {
                            return;
                        }
                    }
                }
            },
            btn_chat: {
                _layout: [[72 / 1280, 0], [0.96, 0.4], [0, 0]],
            },
            btn_voice: {
                _layout: [[72 / 1280, 0], [0.96, 0.25], [0, 0]],
            },
            btns_piao: {
                _visible: false,
                _layout: [[5/1280, 0], [0.5, 0.5], [0, 0]],
                _run:function() {
                    this.btns = [
                        this.getChildByName('btn_piao0'),
                        this.getChildByName('btn_piao1'),
                        this.getChildByName('btn_piao2'),
                        this.getChildByName('btn_piao3')
                    ];
                    this.btnsInitX = [
                        this.btns[0].x, this.btns[1].x, this.btns[2].x, this.btns[3].x
                    ];
                    this.adjustLayout = function() {
                        var mode = MjClient.data.sData.tData.areaSelectMode;
                        if (mode.piaoType == 0) {
                            //带跑重新布局
                            switch(mode.piaoFen) {
                                case 1:
                                    this.btns[2].visible = false;
                                    this.btns[3].visible = false;
                                    this.btns[0].x = this.btnsInitX[1];
                                    this.btns[1].x = this.btnsInitX[2];
                                    break;
                                case 2:
                                    var gap = this.btnsInitX[1] - this.btnsInitX[0] - this.btns[0].width;
                                    var offX = this.btns[0].width / 2 + gap / 2; 
                                    this.btns[3].visible = false;
                                    this.btns[0].x += offX;
                                    this.btns[1].x += offX;
                                    this.btns[2].x += offX;
                                    break;
                            }
                        } else {
                            //定跑检测置灰
                            var pl = MjClient.data.sData.players[SelfUid()];
                            if (pl.lastPiaoFen == undefined) {
                                return;
                            }
                            for (var i = 0; i < pl.lastPiaoFen; i++) {
                                this.btns[i].setEnabled(false);
                            }
                        }
                    }.bind(this);
                },
                _event: {
                    initSceneData: function() {
                        MjClient.playui.checkPaoBtnsVisible(this);
                    },
                    waitJiazhu: function() {
                        this.visible = true;
                        this.adjustLayout();
                    },
                    MJJiazhu: function(msg) {
                        MjClient.playui.checkPaoBtnsVisible(this, msg);
                    },
                    clearCardUI: function() {
                        this.visible = false;
                    },
                },
                btn_piao0: {
                    _click: function(node) {
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "MJJiazhu",
                            piaoFen: 0,
                        });
                    }
                },
                btn_piao1: {
                    _click: function(node) {
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "MJJiazhu",
                            piaoFen: 1,
                        });
                    }
                },
                btn_piao2: {
                    _click: function(node) {
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "MJJiazhu",
                            piaoFen: 2,
                        });
                    }
                },
                btn_piao3: {
                    _click: function(node) {
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "MJJiazhu",
                            piaoFen: 3,
                        });
                    }
                }
            },
            img_waitZha: {
                _event: {
                    mjhand:function() {
                        this.visible = false;
                    }
                }
            },
            btn_putCard: {
                _run:function () {
                    setWgtLayout(this, [0.185, 0.143], [0.75, 0.6], [0, 0], true);
                },
                _event: {
                    HZChiCard: function() {
                        MjClient.playui.checkPutCardBtnVisible(this);
                    }
                }
            }
        }

        util.assign(jsBind, pBind); 
        return jsBind;
    },
});

playPanel_tongChengGeZiPai.prototype.setZhaNum = function(node) {
    node.visible = false;
};

playPanel_tongChengGeZiPai.prototype.checkZhaTipsVisible = function(node) {
    var name = node.getName();
    var imgTongCang = name == 'img_tongCang' ? node : node.parent.getChildByName('img_tongCang');
    var imgWaitZha = name == 'img_waitZha' ? node : node.parent.getChildByName('img_waitZha');
    imgTongCang.visible = false;
    imgWaitZha.visible = false;
    return;
};

playPanel_tongChengGeZiPai.prototype.getSkipHuTips = function(optType) {
    var cnOpt = ['招', '滑', '观生'][optType];
    var tips = cnOpt + "牌后视为过胡，确定" + cnOpt + "吗？";
    return tips;
}

playPanel_tongChengGeZiPai.prototype.getSelectCnName = function(optType) {
    return ['招\n牌', '滑\n牌', '观\n生'][optType];
}

playPanel_tongChengGeZiPai.prototype.getEatLabel = function(eatType, msg) {
    var img = {mjchi:'jian', mjpeng:'peng', mjgang0:'zhao', mjgang1:'guan', hu:'hu'};
    if (eatType == 'mjgang0' && msg.type == 1) {
        img.mjgang0 = 'hua';
    }
    if (eatType in img) {
        return 'playing/ziPaiTable/huaPai/' + img[eatType] + '.png';
    }
    return null;
};

// 节点是否扎牌列
playPanel_tongChengGeZiPai.prototype.getCurNodeZhaCards = function(node, mjgang1, idx) {
    return;
}

// 移除一张捡牌.新的产品规则下, 删捡牌数据
playPanel_tongChengGeZiPai.prototype.removeJianData = function(pl, card, jianInfo, node) {
    //删除指定的该张捡牌数据
    var cd = jianInfo ? jianInfo.card : card;
    var idx = pl.mjchiCard.indexOf(cd);
    if (idx >= 0) {
        pl.mjchiCard.splice(idx, 1);
    }

    if (pl.info.uid == SelfUid() && jianInfo) {
        var parent = node.getChildByTag(jianInfo.col);
        var btn = parent.children[jianInfo.row];
        btn.lastPosition = null; //刷UI时不做移动表现
        btn.removeChildByName('JIAN');
    }
}

// 移除一张捡牌
playPanel_tongChengGeZiPai.prototype.removeJianCard = function(node, pl, card) {
    //删除该张捡牌数据.UI也要同步去掉一张捡的角标(和产品确认.花精和素精等同处理)
    var idx = pl.mjchiCard.indexOf(card);
    if (idx >= 0) {
        pl.mjchiCard.splice(idx, 1);
        this.removeJianIcon(node, card);
    }
    /*
     else {
        var another = card < 100 ? (card + 100) : (card - 100);
        idx = pl.mjchiCard.indexOf(another);
        if (idx >= 0) {
            pl.mjchiCard.splice(idx, 1); 
            this.removeJianIcon(node, another);
        }
    }
    */
}

// 添加捡牌角标 .param isRefresh.拖动手牌时不需要(也不能)重复添加捡牌角标传false
playPanel_tongChengGeZiPai.prototype.addJianIcon = function(node, mjchiCard, isRefresh) {
    if (!isRefresh) {
        return;
    }
    if (!cc.sys.isObjectValid(node) || !mjchiCard || mjchiCard.length == 0) {
        return;
    }

    mjchiCard = mjchiCard.slice();
    var isSelf = node.getName() == 'layout_handCards';
    
    function addIcon(card) {
        var icon = ccui.ImageView.create('playing/ziPaiTable/tongChengGeZi/icon_jian.png');
        icon.scale = isSelf ? 1.4 : 0.9;
        icon.x = icon.width * icon.scale/2;
        icon.y = card.height - icon.height * icon.scale/2;
        icon.setName('JIAN');
        card.addChild(icon);
    }

    var col = node.getChildrenCount();

    //检查该张牌是否需要添加角标.花精和素精等同处理
    function isNeedAddJian(card) {
        //var another = card < 100 ? (card + 100) : (card - 100);
        var cnt = 0;
        for (var i = 0; i < mjchiCard.length; i++) {
            // if (mjchiCard[i] == card ||
            //     mjchiCard[i] == another) 
            //     cnt++;

            if (mjchiCard[i] == card) 
                cnt++;
        }
        if (cnt == 0) {
            return false;
        }
        for (var i = col - 1; i >= 0; i--) {
            var cardParent = node.getChildByTag(i);
            if (!cardParent)
                continue;
            var row = cardParent.getChildren();
            for (var j = 0; j < row.length; j++) {
                // if ((row[j].tag == card || row[j].tag == another) && row[j].getChildByName('JIAN')) {
                //     cnt--;
                // }
                if (row[j].tag == card && row[j].getChildByName('JIAN')) {
                    cnt--;
                }
            }
        }
        return cnt > 0; //有没添加角标又需要添加角标的牌存在
    }

    //反向遍历node节点.优先在后面的节点上添加捡角标
    for (var i = col - 1; i >= 0; i--) {
        var cardParent = node.getChildByTag(i);
        if (!cardParent)
            continue;
        var row = cardParent.getChildren();
        for (var j = 0; j < row.length; j++) {
            if (isNeedAddJian(row[j].tag) && !row[j].getChildByName('JIAN')) {
                addIcon(row[j]);
            }
        }
    }
};

//删除一张指定数值牌的捡牌角标
playPanel_tongChengGeZiPai.prototype.removeJianIcon = function(node, card) {
    var another = card < 100 ? (card + 100) : (card - 100);
    var col = node.getChildrenCount();
    //反向遍历node节点.优先在后面的节点上移除捡角标
    for (var i = col - 1; i >= 0; i--) {
        var cardParent = node.getChildByTag(i);
        if (!cardParent)
            continue;
        var row = cardParent.getChildren();
        for (var j = 0; j < row.length; j++) {
            if (row[j].getChildByName('JIAN') && 
                (row[j].tag == card || row[j].tag == another)) {
                row[j].removeChildByName('JIAN');
                return;
            }
        }
    }
}

playPanel_tongChengGeZiPai.prototype.getEatCardOrientation = function(off) {
    var uiNode = this.getUINode(off);
    var orientation = {
        dx: 1,
        dy: 1,
        anchorX: 0,
        anchorY: 0
    };

    var cnt = this.getPlayersNum();
    if (uiNode.getName() == "node_left") {
        orientation.dy = -1;
        orientation.anchorY = 1;
    } else if (uiNode.getName() == "node_right") {
        orientation.dx = cnt == 3 ? -1 : 1;
        orientation.dy = -1;
        orientation.anchorX = cnt == 3 ? 1 : 0;
        orientation.anchorY = 1;
    } else if (uiNode.getName() == "node_xing") {
        orientation.dx = -1;
        orientation.dy = -1;
        orientation.anchorX = 1;
        orientation.anchorY = 1;
    }
    return orientation;
};

playPanel_tongChengGeZiPai.prototype.getEatCardNode = function(eatType, cardArr, off) {
    var uiNode = this.getUINode(off);
    var orientation = this.getEatCardOrientation(off);

    var eatCardNode = new cc.Node();
    for (var i = 0; i < cardArr.length; i++) {
        for (var j = 0; j < cardArr[i].length; j++) {
            var showType = this.getEatCardShowType(eatType, cardArr[i][j], j, off);
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
            card.y -= orientation.dy * card.height * card.scaleY * 0.5 * j; //堆叠效果
            eatCardNode.cardWidth = eatCardNode.cardWidth || card.width * card.scaleX;
        }
    }
    return eatCardNode;
};

playPanel_tongChengGeZiPai.prototype.initEatCard = function(node, isRoundEndMsg) {
    if ((MjClient.rePlayVideo != -1 || !this.isInPlay()) && !isRoundEndMsg) {
        return;
    }

    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    var lastLineCount = 0;

    //跑胡需要走这里 但游戏未开始时需要规避
    if (!pl || !pl.mjsort) {return;}
    /*
    if (pl.info.uid != 1000183) {
        //return;
    }
    //test....
    pl.mjsort = [
        {name:'mjpeng', pos:0, from:1}, 
        {name:'mjpeng', pos:1, from:1},
        {name:'mjgang0', pos:0, from:1},
        {name:'mjpeng', pos:2, from:1},
        {name:'mjgang0', pos:1, from:1},
        {name:'mjgang0', pos:2, from:1},
        {name:'mjgang1', pos:0, from:1},
    ]
    pl.mjpeng = [
        [21,21,21],
        [22,22,22],
        [23,23,23]
    ]
    pl.mjgang0 = [
        [31,31,31,31],
        [32,32,32,32,32],
        [33,33,33,33,33]
    ]
    */
    var tData = MjClient.data.sData.tData;
    for (var i = 0; i < pl.mjsort.length; i++) {
        var mjSort = pl.mjsort[i];
        if (mjSort.name == 'mjgang1' ||
            mjSort.name == 'mjchi') {
            continue; //捡牌/观生不放桌面
        }
        var cardArr = this.getEatCardArr(mjSort.name, off, mjSort.pos);
        this.sortEatCard(cardArr);
        var from = this.getUIOffByUid(tData.uids[mjSort.from]);
        var eatCardNode = this.getEatCardNode(mjSort.name, cardArr, off, from);
        this.dislpayEatCardNode(eatCardNode, lastLineCount, true, mjSort.name, off);
        lastLineCount += cardArr.length;
    }
};

playPanel_tongChengGeZiPai.prototype.getPutCardBg = function (putType) {
    return "playing/ziPaiTable/huaPai/chuPai_bg2.png";
};

// 获取操作按钮数组
playPanel_tongChengGeZiPai.prototype.getShowEatNodes = function() {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var eat = MjClient.playui.jsBind.node_eatChoice;
    var pl = sData.players[SelfUid() + ""];

    //test
    //pl.liuCards = {"zha4":[21],"zha5":[22],"zhao":[31],"fan":[21,22,23,41]}
    //pl.eatFlag = 4+16+2

    var liuCards = pl.liuCards;
    if (!pl || !pl.liuCards) {
        return;
    }

    if (tData.tState == TableState.roundFinish) {
        return [];
    }

    var vnode = [];

    if (pl.eatFlag & 2) { // 碰
        vnode.push(eat.btn_peng._node);
    }

    if (pl.eatFlag & 4) {
        if (liuCards.zhao && liuCards.zhao.length > 0) {
            vnode.push(eat.btn_zhao._node); //招
        } 
        if (liuCards.hua && liuCards.hua.length > 0) {
            vnode.push(eat.btn_hua._node);  //滑
        }
    }

    if (pl.eatFlag & 16) {
        if (liuCards.guan && liuCards.guan.length > 0) {
            vnode.push(eat.btn_guan._node); //观
        } 
    }

    if (pl.eatFlag & 1) {
        vnode.push(eat.btn_jian._node); //捡
    }

    if (pl.eatFlag & 32) { // 胡
        vnode.push(eat.btn_hu._node);
    }

    if (vnode.length > 0) { // 过
        vnode.push(eat.btn_guo._node);
    }

    return vnode;
};

//param.btn=打的那张牌 node=牌的根节点
playPanel_tongChengGeZiPai.prototype.getPutJian = function(btn, node) {
    if (btn.getChildByName('JIAN')) {
        return; //已经是捡牌
    }

    var card = btn.tag;
    var another = card < 100 ? (card + 100) : (card - 100);
    var cnt = node.getChildrenCount();
    //反向遍历node节点.优先在后面的节点上移除捡角标
    for (var i = cnt - 1; i >= 0; i--) {
        var cardParent = node.getChildByTag(i);
        if (!cardParent)
            continue;
        var row = cardParent.getChildren().slice(); //按zOrder顺序返回
        //保持和handCardArr顺序一致
        if (i == btn.col) {
            for (var k = 0; k < row.length; k++) {
                if (row[k].oldZindex != null && row[k].oldZindex != undefined) {
                    row[k].zIndex = row[k].oldZindex; 
                    break;
                }
            }
        }
        row.sort(function(a, b) {
            return a.zIndex - b.zIndex;
        })
        for (var j = 0; j < row.length; j++) {
            if (row[j].getChildByName('JIAN') && 
                (row[j].tag == card || row[j].tag == another)) {
                return {col:i, row:j, card:row[j].tag};
            }
        }
    }
}

//优先出捡牌.产品的意思是出牌的时候, 非捡牌保留原位置(不是弹回)
playPanel_tongChengGeZiPai.prototype.doPut = function(card, btn, col, row) {
    var handNode = btn.parent.parent;
    //检测优先出捡牌
    var putJianInfo = this.getPutJian(btn, handNode);
    if (putJianInfo) {
        card = putJianInfo.card;
        col = putJianInfo.col;
        row = putJianInfo.row;
    }
    var putNode = MjClient.playui.getUINode(0).getChildByName("img_putCard");
    putNode.stopAllActions();
    putNode.visible = true;
    putNode.opacity = 255;
    var src = MjClient.playui.getCardSrc("put", card, false);
    putNode.getChildByName("img_card").loadTexture(src, 0); // todo
    putNode.loadTexture(MjClient.playui.getPutCardBg(0)/*"playing/paohuzi/chupai_bj.png"*/);

    if (MjClient.playui.isShowLongCard()) {
        var pos = putNode.getUserData().pos;
        putNode.setScale(putNode.getUserData().scale);
        var p = btn.parent.convertToWorldSpace(cc.p(btn.x + (0.5 - btn.anchorX) * btn.width * btn.scaleX, btn.y + (0.5 - btn.anchorY) * btn.height * btn.scaleY));
        putNode.setPosition(putNode.parent.convertToNodeSpace(p));
        putNode.runAction(cc.moveTo(MjClient.playui.getActionTime(), pos.x, pos.y));
    }else{
        var pos = putNode.getUserData().pos;
        putNode.setScale(0);
        putNode.setPosition(cc.p(pos.x ,pos.y - 200));
        var actTime = MjClient.playui.getActionTime();
        putNode.runAction(cc.spawn(cc.scaleTo(actTime, putNode.getUserData().scale), cc.moveTo(actTime, putNode.getUserData().pos)));
    }

    
    if (!Array.isArray(MjClient.HandCardArr[col]) || MjClient.HandCardArr[col][row] != card) {
        btn.removeFromParent(true);
        putNode.visible = false;
        if(MjClient.playui.isCheckTingStats()){
            MjClient.playui.checkTingStats();
        }else{
            MjClient.playui.checkTingCards();
        }
        MjClient.playui.refreshHandCard(0);
        delete MjClient.moveCard;
        return;
    }

    this.removeJianData(this.getUIPlayer(0), card, putJianInfo, handNode); //btn remove前执行

    MjClient.hasPut = true;
    btn.removeFromParent(true);
    
    MjClient.HandCardArr[col].splice(row, 1);
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPut",
        card: putJianInfo ? putJianInfo.card : card,
    });
    MjClient.playui.checkCutLineVisible();
}

playPanel_tongChengGeZiPai.prototype.setCardTouchHandler = function(card, off) {
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
    card.addTouchEventListener(function(btn, eventType) {
        if (MjClient.movingCard_paohuzi !== null && cc.sys.isObjectValid(MjClient.movingCard_paohuzi) && MjClient.movingCard_paohuzi !== btn) {
            return;
        }

        if (MjClient.isRefreshNodeing || MjClient.isDealing) {
            return;
        }

        if (eventType == ccui.Widget.TOUCH_BEGAN) {
            MjClient.selectCard_paohuzi = null;
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
            btn.col = btn.parent.tag; //记录.为找捡牌提高效率
            btn.oldZindex = btn.zIndex; //记录下.拖动时会改变zIndex导致算优先捡牌遍历节点时和HandCardArr对不上
            btn.zIndex = MjClient.playui.colMaxNum * 2;
            btn.setAnchorPoint(0.5, 0.5);
            btn.x += btn.width * btn.scaleX * 0.5;
            btn.y += btn.height * btn.scaleY * 0.5;
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

        if (eventType == ccui.Widget.TOUCH_MOVED) {
            btn.setPosition(cc.pSub(btn.getTouchMovePosition(), btn.parent.getPosition()));
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

            // 出牌条件判定. 取 isCanPut && isOverLine;
            var isPutCommon = tData.tState == TableState.waitPut;
            var isPutSpecil = MjClient.playui.checkPutSpecil();
            var isTurnPut =  IsTurnToMe() && (isPutCommon || isPutSpecil) && !MjClient.hasPut;
            var isOverLine = pos.y > MjClient.playui.jsBind.img_cutLine._node.y; //是否达到了出牌虚线坐标

            //该张牌是否被禁了
            var isBan = !MjClient.playui.checkCardCanPut(pl, card);
            var isCanPut = isTurnPut && !isBan;

            var resetPos = function() {
                btn.col = null;
                btn.oldZindex = null;
                var w = btn.parent.width;
                var gap = 5.78*MjClient.size.width/640;
                var dstCol = col + Math.round((pos.x - btn.parent.x) / (w + gap) - 0.5); // 目的列
                if (dstCol == col) { 
                    // 列未变 同列归位
                } else if (dstCol >= 0 && dstCol < MjClient.HandCardArr.length 
                           && MjClient.HandCardArr[dstCol].length < MjClient.playui.colMaxNum) { // 当前有手牌列 ps.满7张不可再叠
                    // 插牌
                    MjClient.moveCard.nexCIndex = dstCol;
                    MjClient.HandCardArr[col].splice(row, 1);
                    MjClient.playui.fixArrIndex(dstCol, card, btn, true);
                    // 新的行列
                    col = MjClient.moveCard.nexCIndex;
                    row = MjClient.moveCard.nexRIndex;
                } else {
                    //超出9列横向范围归位
                }
                btn.setAnchorPoint(0, 0);
            }

            var putCardCb = function() {
                if (isCanPut) {
                    var cardsLayout = btn.parent.parent;
                    MjClient.playui.doPut(card, btn, col, row); 
                    //MjClient.playui.removeJianCard(cardsLayout, pl, card); //此方法是检查移除捡角标.暂时保留待产品确定规则
                } else {
                    if ((isOverLine || MjClient.selectCard_paohuzi == btn) && isBan) {
                        //提示
                        MjClient.showToast("本轮与捡的相同的牌不能打出");
                    }
                    resetPos();
                }
                MjClient.playui.refreshHandCard(0, !isCanPut);
            }

            if (isOverLine) {
                putCardCb();
            } else {
                resetPos();
                MjClient.playui.refreshHandCard(0, true);
                if (MjClient.playui.getChuPaiType() == 0 && isCanPut) {
                    MjClient.selectCard_paohuzi = btn;
                    MjClient.selectCard_paohuzi.setColor(cc.color(170, 170, 170));
                    MjClient.selectCard_paohuzi.putCardCb = putCardCb;
                }
            }

            if (MjClient.playui.hasTingByPut()) {
                MjClient.playui.checkTingCardsNew();
            } else if(MjClient.playui.isCheckTingStats()){
                MjClient.playui.checkTingStats();
            }else{
                MjClient.playui.checkTingCards();
            }

            MjClient.addGroupIndex = -1;
            delete MjClient.moveCard;
        }
    });
};

playPanel_tongChengGeZiPai.prototype.checkCardCanPut = function(pl, card) {
    return pl && pl.canNotPutCard.indexOf(card % 100) < 0;
}

//总结算面板
playPanel_tongChengGeZiPai.prototype.createGameOverLayer = function(type) {
    return new GameOverLayer_huBeiHuaPai();
};

//小结算面板
playPanel_tongChengGeZiPai.prototype.createEndOneLayer = function(type) {
    return new EndOneView_tongChengGeZiPai();
};

//字牌资源路径
playPanel_tongChengGeZiPai.prototype.getCardFilePath = function() {
    var sizeList = this.getCardSizeList();
    var fontList = this.getCardFontList();
    var sizeIdx = 0;
    var fontIdx = this.getCardFontIdx();

    return "playing/huaPai/tongChengGeZiPai/" + sizeList[sizeIdx] + "/" + fontList[fontIdx] + "/";
};

// 获取牌资源路径
playPanel_tongChengGeZiPai.prototype.getCardSrc = function(name, tag, isTurn) {
    var path = this.getCardFilePath();
    if(this.getResType() == 1 && name != "put"){
        path = path.replace("playing/huaPai/tongChengGeZiPai/", ""); 
    }

    //put用hand
    if (name == 'put') {
        name = 'hand';
    }
    return (path + name + tag + ".png");
};

//手牌张数 
playPanel_tongChengGeZiPai.prototype.getHandCount = function() {
    return 19;
};

// 改变布局.花牌固定使用传统布局
playPanel_tongChengGeZiPai.prototype.changeLayout = function(uiNode) {
    var downNode = uiNode.getChildByName("node_down");
    var rightNode = uiNode.getChildByName("node_right");
    var leftNode = uiNode.getChildByName("node_left");
    var xingNode = uiNode.getChildByName("node_xing");

    var type = this.getLayoutType();
    // 间距
    var ipxX = isIPhoneX() ? 0.01 : 0;
    var cnt = this.getPlayersNum();

    // 弃牌坐标
    var layoutOutD = downNode.getChildByName("layout_outCards");
    setWgtLayout(layoutOutD, [0.16, 0.16], [0.482, 0.59], [0, 0]);

    var layoutOutL = leftNode.getChildByName("layout_outCards");
    setWgtLayout(layoutOutL, [0.16, 0.16], [0.47, 0.95], [0, 0]);

    var layoutOutR = rightNode.getChildByName("layout_outCards");
    if (cnt == 3) {
        setWgtLayout(layoutOutR, [0.16, 0.16], [0.62 - (isIPhoneX() ? ipxX : 0), 0.95], [0, 0]);
    } else {
        setWgtLayout(layoutOutR, [0.16, 0.16], [0.39 + (isIPhoneX() ? ipxX : 0), 0.75], [0, 0]);
    }

    if (cnt == 4) {
        var layoutOutX = xingNode.getChildByName("layout_outCards");
        setWgtLayout(layoutOutX, [0.16, 0.16], [0.62 - (isIPhoneX() ? ipxX : 0), 0.95], [0, 0]);
    } 


    // 门牌坐标
    var layoutEatD = downNode.getChildByName("layout_eatCards");
    setWgtLayout(layoutEatD, [0.16, 0.16], [0.005, 0.01], [0, 0]);

    var layoutEatL = leftNode.getChildByName("layout_eatCards");
    setWgtLayout(layoutEatL, [0.16, 0.16], [0.005 + (isIPhoneX() ? 0.042 : 0), 0.62 - (isIPhoneX() ? 0.04 : 0)], [0, 0]);

    var layoutEatR = rightNode.getChildByName("layout_eatCards");
    if (cnt == 3) {
        setWgtLayout(layoutEatR, [0.16, 0.16], [0.99, 0.63 - (isIPhoneX() ? 0.04 : 0)], [0, 0]);
    } else {
        setWgtLayout(layoutEatR, [0.16, 0.16], [0.73, 0.98], [0, 0]);
    }

    if (cnt == 4) {
        var layoutEatX = xingNode.getChildByName("layout_eatCards");
        setWgtLayout(layoutEatX, [0.16, 0.16], [0.99, 0.8 - (isIPhoneX() ? 0.04 : 0)], [0, 0]);
    }
};

// 收入亮张动画
playPanel_tongChengGeZiPai.prototype.showPickCardAnimation = function(node) {
    node.stopAllActions();
    var off = this.getUIOffByNode(node);
    if (!this.isCurPlayer(off)) {
        return;
    }

    // 往对应位置飞
    var w = 70; //牌宽
    var scale = w*1.2 / (w*0.78); 
    if (MjClient.rePlayVideo != -1 && off != 0) {
        //非自己飞往头像时, 缩小
        scale = 0.2;
    }
    
    var pos = this.getNewHandCardPos(node, off);
    node.isPick = true;
    var actTime = this.getActionTime();
    var spawnActiton = null;
    if (MjClient.rePlayVideo == -1) {
        //牌局自己进牌
        spawnActiton = cc.spawn(
        cc.rotateBy(actTime, -90), 
        cc.scaleTo(actTime, scale*MjClient.size.width/1280), 
        cc.moveTo(actTime, pos.x, pos.y)).easing(cc.easeCubicActionOut());
        node.isRotated = true;
    } else {
        //回放 自己和醒家才做旋转
        var name = node.parent.getName();
        if (off == 0 || (MjClient.data.sData.tData.maxPlayer == 4 && name == 'node_right')) {
            spawnActiton = cc.spawn(
            cc.rotateBy(actTime, -90), 
            cc.scaleTo(actTime, scale*MjClient.size.width/1280), 
            cc.moveTo(actTime, pos.x, pos.y)).easing(cc.easeCubicActionOut());
            node.isRotated = true;
        } else {
            spawnActiton = cc.spawn(
            cc.scaleTo(actTime, scale*MjClient.size.width/1280), 
            cc.moveTo(actTime, pos.x, pos.y)).easing(cc.easeCubicActionOut());
            node.isRotated = false;
        }
    }
    node.runAction(cc.sequence(
        cc.DelayTime(0.5),
        spawnActiton, 
        cc.callFunc(()=>{
            if (node.isRotated) {
                node.setRotation(90);
            }
            node.opacity = 0;
            node.isPick = false;
            MjClient.playui.refreshHandCard(off);
    })));
};

playPanel_tongChengGeZiPai.prototype.getRowCardsStartPos = function(handCard, parent, card) {
    return cc.p(0, parent.height - card.height * card.scaleY);
};

playPanel_tongChengGeZiPai.prototype.refreshHandCard = function(off, isRefresh) {
    cc.log('牌堆==', JSON.stringify(MjClient.HandCardArr));

    if (!this.isInPlay() && !isRefresh) {
        return;
    }

    var pl = this.getUIPlayer(off);
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

            var handCard = uiNode.getChildByName("img_handCard");
            var width = handCard.width * handCard.scaleX + 5.78*MjClient.size.width/640;

            var cardArr = MjClient.HandCardArr;
            //todo.写法优化
            for (var k = 0; k < cardArr.length; k++) {
                var groupList = cardArr[k];
                //即使没有牌也要创建空列
                var cardParent = layout_handCards.getChildByTag(k);
                if (!cardParent) {
                    cardParent = this.getCardRoot(layout_handCards.cardRoot, k);
                    if (!cardParent) {
                        cardParent = new cc.Sprite('playing/ziPaiTable/tongChengGeZi/bg_cards.png');
                        cardParent.tag = k;
                        cardParent.width = handCard.width * handCard.scaleX;
                        cardParent.height = 306 * MjClient.size.height/360 * 0.6;
                        cardParent.setAnchorPoint(cc.p(0, 0));
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
            
            var scale_x = handCard.scaleX;
            var winSize = MjClient.size;
            var totalWidth = width * cardArr.length;
            var nodeY = 0 - handCard.height * handCard.scaleY * 0.2;
            if (isIPhoneX())
                nodeY += handCard.height * 0.05; 
            var startX = (winSize.width - totalWidth) / 2;
            for (var i = 0; i < cardArr.length; i++) {
                var addNode = layout_handCards.getChildByTag(i);
                this.showHandHuXi(addNode);

                if (addNode.lastPosition) {
                    addNode.setPosition(addNode.lastPosition);
                    this.doMoveToAction(addNode, cc.p(startX + i * width, nodeY));
                } else {
                    addNode.setPosition(cc.p(startX + i * width, nodeY));
                } 
            }
            this.addJianIcon(layout_handCards, pl.mjchiCard, !isRefresh);
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
                cardParent = new cc.Sprite('playing/ziPaiTable/tongChengGeZi/bg_cards.png');
                cardParent.tag = col;
                cardParent.width = handCard.width * handCard.scaleX;
                cardParent.height = 306 * MjClient.size.height/360 * 0.6;
                cardParent.setAnchorPoint(cc.p(0, 0));
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
                    this.addHandCard(k, j, groupList[j], off);
                } else {
                    this.addHandCardReplay(k, j, groupList[j], off);
                }
            }
        }

        if (off == 0) {
            this.addTingSign(); // 添加听牌角标
            var width = handCard.width * handCard.scaleX + 5.78*MjClient.size.width/640;
            //牌的宽度是缩小到0.86的
            //width /= 0.91;
            var scale_x = handCard.scaleX;
            var winSize = MjClient.size;
            var totalWidth = width * cardArr.length;
            var nodeY = 0 - handCard.height * handCard.scaleY * 0.2;
            if (isIPhoneX())
                nodeY += handCard.height * 0.05;
            var startX = (winSize.width - totalWidth) / 2;
            for (var i = 0; i < cardArr.length; i++) {
                var addNode = handNode.getChildByTag(i);
                addNode.setPosition(cc.p(startX + i * width, nodeY));
            }
        }

        this.addJianIcon(handNode, pl.mjchiCard, true);

        postEvent("LY_addHandHuXi");
        cc.log("================off:" + off + "----------" + JSON.stringify(cardArr));
    }
};

//pl.piaoFen = -2(无飘分)  -1(待飘分)  ...
playPanel_tongChengGeZiPai.prototype.checkPaoBtnsVisible = function(node, msg) {
    if (msg && msg.uid != SelfUid()) {
        return;
    }
    node.visible = false;
    var tData = MjClient.data.sData.tData;
    var pl = this.getUIPlayer(0);
    if (tData.tState != TableState.waitJiazhu ||
        pl.mjState != TableState.waitJiazhu || pl.piaoFen != -1) {
        return;
    }
    node.visible = true;
    node.adjustLayout();
};

//头像上跑分状态
playPanel_tongChengGeZiPai.prototype.checkPiaoFenVisible = function(node) {
    node.visible = false;
    if (!this.isTableFull()) {
        return;
    }
    var tData = MjClient.data.sData.tData;
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl || (!this.isInPlay() && tData.tState != TableState.waitJiazhu)) {
        return;
    }
    if (pl.piaoFen > 0) {
        node.loadTexture("playing/ziPaiTable/tongChengGeZi/paoFen_" + pl.piaoFen + ".png");
        node.visible = true;
    }
};

//点击跑分按钮后的临时展示
playPanel_tongChengGeZiPai.prototype.checkPiaoFenOptVisible = function(node) {
    node.visible = false;
    if (!this.isTableFull()) {
        return;
    }
    var tData = MjClient.data.sData.tData;
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl || tData.tState != TableState.waitJiazhu)
        return;
    
    //是否自己
    if (off == 0) {
        if (pl.piaoFen >= 0)  {
            node.loadTexture("playing/ziPaiTable/tongChengGeZi/qingDengDai.png");
            node.visible = true;
        }
    } else {
        if (pl.piaoFen == -1) {
            node.loadTexture("playing/ziPaiTable/tongChengGeZi/caoZuoZhong.png");
            node.visible = true;
        } else if (pl.piaoFen >= 0) {
            node.loadTexture("playing/ziPaiTable/tongChengGeZi/yiXuanDing.png");
            node.visible = true;
        }
    }
};

playPanel_tongChengGeZiPai.prototype.updateHuXi = function(node) {
    node.ignoreContentAdaptWithSize(true);
    node.setString("");
    var img = node.parent.getChildByName('img_huXi');
    img.visible = false;
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
    img.visible = true;
};

playPanel_tongChengGeZiPai.prototype.updateHandCardByEat = function(node, eatType, msg) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurEatPlayer(msg, off)) {
        return;
    }

    eatType = this.apartGangType(eatType, msg);
    var pl = MjClient.playui.getUIPlayer(off);
    //如果是观牌
    if (eatType == 'mjgang1') {
        if (off == 0) {
            MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand, pl.mjgang1);
        } else if (MjClient.rePlayVideo != -1) {
            var mjhand = [];
            for(var i = 0; i < MjClient.OtherHandArr[off].length; i++){
                mjhand = mjhand.concat(MjClient.OtherHandArr[off][i]);
            }
            MjClient.OtherHandArr[off] = MjClient.majiang.sortCardForOtherReplay(mjhand, pl.mjgang1);
        }
    } else if(eatType == 'mjchi') {
        //捡牌插入最后一列
        if (off == 0) {
            //MjClient.HandCardArr[8].push(msg.mjchiCard[msg.mjchiCard.length-1]); //取最后一张
            this.addNewCardToHandArr(msg.mjchiCard[msg.mjchiCard.length-1]);
        } else if (MjClient.rePlayVideo != -1) {
            var mjhand = [];
            for(var i = 0; i < MjClient.OtherHandArr[off].length; i++){
                mjhand = mjhand.concat(MjClient.OtherHandArr[off][i]);
            }
            mjhand.push(msg.mjchiCard[msg.mjchiCard.length-1]);
            MjClient.OtherHandArr[off] = MjClient.majiang.sortCardForOtherReplay(mjhand, pl.mjgang1);
        }
    } else {
        var cardArr = [msg.cards];//this.getEatCardArr(eatType, off); //返回的是二维数组
        this.removeEatArrFromHand(eatType, cardArr[0], msg, off);
    }

    this.refreshHandCard(off);
};

playPanel_tongChengGeZiPai.prototype.updateHandCardByPut = function(node) {
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

    MjClient.hasPut = false; 

    // 牌局中自己手动出牌
    if (MjClient.rePlayVideo == -1 && off == 0 && !this.isInTrust(SelfUid())) {
        if(this.checkHandCardByPut(off)){
            this.refreshHandCard(off);
        }
        return;
    }

    var curCard = MjClient.data.sData.tData.currCard;

    // 移除手牌
    this.removeHandCard(curCard, off);

    // 回放时检测移除捡牌角标和捡牌数据.
    if (MjClient.rePlayVideo != -1) {
        var pl = this.getUIPlayer(off);
        this.removeJianCard(node, pl, curCard); 
    }

    if (MjClient.rePlayVideo != -1 && off == 0) {
        //自己回放时，出牌后最后一列牌(如果有)要移动一张到对应列
        this.moveLastCardToRow();
    }
    this.checkHandCardByPut(off);
    this.refreshHandCard(off);
};

playPanel_tongChengGeZiPai.prototype.updatePutCardByAdd = function(node, msg) {
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

        var w = 70; //牌宽
        var scale = w*1.2 / (w*0.78);
        var pos = this.getNewHandCardPos(node, off);
        var actTime = this.getActionTime();
        var spawnActiton = null;
        if (MjClient.rePlayVideo == -1) {
            //牌局自己进牌
            spawnActiton = cc.spawn(
            cc.rotateBy(actTime, -90), 
            cc.scaleTo(actTime, scale*MjClient.size.width/1280), 
            cc.moveTo(actTime, pos.x, pos.y)).easing(cc.easeCubicActionOut());
            node.isRotated = true; 
        } else {
            //回放 自己和醒家才做旋转
            var name = node.parent.getName();
            if (off == 0 || (MjClient.data.sData.tData.maxPlayer == 4 && name == 'node_right')) {
                spawnActiton = cc.spawn(
                cc.rotateBy(actTime, -90), 
                cc.scaleTo(actTime, scale*MjClient.size.width/1280), 
                cc.moveTo(actTime, pos.x, pos.y)).easing(cc.easeCubicActionOut());
                node.isRotated = true;
            } else {
                spawnActiton = cc.spawn(
                cc.scaleTo(actTime, scale*MjClient.size.width/1280), 
                cc.moveTo(actTime, pos.x, pos.y)).easing(cc.easeCubicActionOut());
                node.isRotated = false;
            }
        }
        node.runAction(cc.sequence(
            cc.DelayTime(0.5),
            spawnActiton,
            cc.callFunc(()=>{
                if (node.isRotated) {
                    node.setRotation(90);
                }
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

playPanel_tongChengGeZiPai.prototype.getOutCardPos = function(off) {
    var pos = cc.p(0, 0);
    var orientation = this.getOutCardOrientation(off, true);
    var uiNode = this.getUINode(off);
    var name = uiNode.getName();
    var childNum = uiNode.getChildByName("layout_outCards").getChildrenCount();
    var outCard = uiNode.getChildByName("img_outCard");
    var scaleX = outCard.scaleX;
    var scaleY = outCard.scaleY;

    //每行数量
    var lineNum = 8;

    //按行摆
    function setCardPosByRow(num) {
        pos.x += (childNum % num + 0.5) * outCard.width * scaleX * orientation.dx;
        pos.y += (Math.floor(childNum / num) + 0.5) * outCard.height * scaleY * orientation.dy;

        //坐标修正
        //pos.x -= (outCard.width * scaleX - 23) * (childNum % num - 1); //美术给定的偏移值
        pos.y -= (outCard.height * scaleY - 28) * Math.floor(childNum/num) * orientation.dy;
    }

    //按列摆
    function setCardPosByCol(num) {
        var n = (Math.floor(childNum / num) + 0.5)
        pos.x += n * outCard.width * scaleX * orientation.dx;
        pos.y += (childNum % num + 0.5) * outCard.height * scaleY * orientation.dy;

        //坐标修正
        //pos.x -= (outCard.width * scaleX - 23) * (n-1); //美术给定的偏移值
        pos.y += (outCard.height * scaleY - 28) * (childNum % num); 
    }

    //人数
    var cnt = this.getPlayersNum();
    if (name == 'node_down' ||
        (name == 'node_right' && cnt == 4)) {
        //按排摆.每排8个
        lineNum = 8;
        setCardPosByRow(lineNum);
    } else if (name == 'node_left' || name == 'node_xing' ||
        (name == 'node_right' && cnt == 3)) {
        //按列摆.每列5个
        lineNum = 5;
        setCardPosByCol(lineNum);
    }

    return pos;
};

playPanel_tongChengGeZiPai.prototype.getOutCardOrientation = function(off, isOutCard) {
    var cnt = this.getPlayersNum();
    var name = this.getUINode(off).getName();
    var orientation = {
        dx: 1,
        dy: 1,
        anchorX: 0,
        anchorY: 0
    };

    if (name == 'node_down') {
        orientation.dy = -1;
        orientation.anchorY = 1;
    } else if (name == "node_left") {
        orientation.dx = -1;
        orientation.dy = -1;
        orientation.anchorY = 1;
        orientation.anchorX = 1;
    } else if (name == "node_right") {
        if (cnt == 3) {
            orientation.dy = -1;
            orientation.anchorY = 1;
        }
    } else if (name == "node_xing") {
        orientation.dy = -1;
        orientation.anchorX = 1;
    }

    return orientation;
};

playPanel_tongChengGeZiPai.prototype.checkArrowVisible = function(node) {
    node.visible = false;
};

playPanel_tongChengGeZiPai.prototype.changeEatBtnLayout = function(btnNode, len, idx) {
    setWgtLayout(btnNode, [100/1280, 0], [0.86 - 0.06*(len-2), 0.26], [(idx - (len - 1) / 2) * 1.1, 1.8], false, false);
};

playPanel_tongChengGeZiPai.prototype.changePutCardLayout = function(node) {
    return;
}

//4人玩法调整right节点弃牌的zOrder
playPanel_tongChengGeZiPai.prototype.outCardExp = function(pl, outCard, i) {
    if (this.getPlayersNum() != 4)
        return;
    if (!pl || !cc.sys.isObjectValid(outCard)) {
        return;
    }
    var off = this.getUIOffByUid(pl.info.uid);
    var uiNode = this.getUINode(off);
    if (uiNode.getName() == 'node_right') {
        outCard.zIndex = 100 - i;
    }
}

playPanel_tongChengGeZiPai.prototype.getGameBgList = function() {
    return [
        "playing/ziPaiTable/beijing_2.jpg",
        "playing/ziPaiTable/tongChengGeZi/bg_1.png",
        "playing/ziPaiTable/beijing_1.jpg"
    ];
};