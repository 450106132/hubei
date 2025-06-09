// 湖北花牌
var playPanel_huBeiHuaPai = playPanel_dangYangFanJing.extend({
    ctor: function() {
        playLayer_ziPai.prototype.ctor.apply(this, ["Play_huBeiHuaPai.json"]);

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
            fan: {name:'fan', eatFlag:4, type:1, data:'mjgang0'},          //贩
            zha4: {name:'zha4', eatFlag:16, type:2, data:'mjgang1'},       //扎4
            zha5: {name:'zha5', eatFlag:16, type:3, data:'mjgang1'},       //扎5
            huanZha: {name:'zha', eatFlag:16, type:4, data:'mjgang1'}      //换扎暂未做
        }
    },
    getJsBind: function() {
        var pBind = this._super();
        var jsBind = {
            node_down: {
                layout_head: {
                    img_cang: {
                        _visible:false,
                        _event: {
                            initSceneData:function() {
                                MjClient.playui.setZhaNum(this);
                            },
                            mjhand:function() {
                                MjClient.playui.setZhaNum(this);
                            },
                            HZLiuCard:function() {
                                MjClient.playui.setZhaNum(this);
                            },
                            clearCardUI:function() {
                                //this.getChildByName('img_num').setString(0);
                                MjClient.playui.setZhaNum(this);
                            }
                        }
                    }
                },
                img_putCard: {
                    _layout: [[0.46, 0.46], [0.5, 0.535], [0, 0]],
                },
                img_nieFlag: {
                    _visible:false,
                }
            },
            node_left: {
                layout_head: {
                    img_cang: {
                        _visible:false,
                        _event: {
                            initSceneData:function() {
                                MjClient.playui.setZhaNum(this);
                            },
                            mjhand:function() {
                                MjClient.playui.setZhaNum(this);
                            },
                            HZLiuCard:function() {
                                MjClient.playui.setZhaNum(this);
                            },
                            clearCardUI:function() {
                                //this.getChildByName('img_num').setString(0);
                                MjClient.playui.setZhaNum(this);
                            }
                        }
                    }
                },
                img_putCard: {
                    _layout: [[0.46, 0.46], [0.3, 0.8], [0, 0]],
                },
                layout_replayCards: {
                    _layout: [[0.1, 0.1], [0.25, 0.81], [0, 0]],
                },
                img_nieFlag: {
                    _visible:false,
                }
            },
            node_right: {
                layout_head: {
                    img_cang: {
                        _visible:false,
                        _event: {
                            initSceneData:function() {
                                MjClient.playui.setZhaNum(this);
                            },
                            mjhand:function() {
                                MjClient.playui.setZhaNum(this);
                            },
                            HZLiuCard:function() {
                                MjClient.playui.setZhaNum(this);
                            },
                            clearCardUI:function() {
                                //this.getChildByName('img_num').setString(0);
                                MjClient.playui.setZhaNum(this);
                            }
                        }
                    }
                },
                img_putCard: {
                    _layout: [[0.46, 0.46], [0.7, 0.8], [0, 0]],
                },
                layout_replayCards: {
                    _layout: [[0.1, 0.1], [0.75, 0.81], [0, 0]],
                },
                img_nieFlag: {
                    _visible:false,
                }
            },
            node_xing: {
                layout_head: {
                    img_cang: {
                        _visible:false,
                        _event: {
                            initSceneData:function() {
                                MjClient.playui.setZhaNum(this);
                            },
                            mjhand:function() {
                                MjClient.playui.setZhaNum(this);
                            },
                            HZLiuCard:function() {
                                MjClient.playui.setZhaNum(this);
                            },
                            clearCardUI:function() {
                                //this.getChildByName('img_num').setString(0);
                                MjClient.playui.setZhaNum(this);
                            }
                        }
                    }
                },
                img_putCard: {
                    _layout: [[0.46, 0.46], [0.73, 0.6], [0, 0]],
                },
                img_nieFlag: {
                    _visible:false,
                }
            },
            node_eatChoice: {
                btn_peng: {
                    _layout: [[0, 0.1], [0.7, 0.1], [3, 2.5]],
                },
                btn_zhao: { 
                    _visible: false,
                    _layout: [[0, 0.1], [0.7, 0.1], [0, 2.5]],
                    bg_img: {
                        _run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _click: function() {
                        var pl = MjClient.data.sData.players[SelfUid()];
                        if (!pl.liuCards || !pl.liuCards.zhao || pl.liuCards.zhao.length == 0)
                            return;
                        MjClient.playui.doLiuCard(MjClient.playui.gangType.zhao, pl.liuCards.zhao[0]);
                    }
                },
                btn_fan: {
                    _visible: false,
                    _layout: [[0, 0.1], [0.7, 0.1], [-3, 2.5]],
                    bg_img: {
                        _run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _click: function() {
                        MjClient.playui.showSelectCards(MjClient.playui.gangType.fan);
                    }
                },
                btn_zha4: {
                    _visible: false,
                    _layout: [[0, 0.1], [0.7, 0.1], [-6, 2.5]],
                    bg_img: {
                        _run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _click: function() {
                        MjClient.playui.showSelectCards(MjClient.playui.gangType.zha4);
                    }
                },
                btn_zha5: {
                    _visible: false,
                    _layout: [[0, 0.1], [0.7, 0.1], [-9, 2.5]],
                    bg_img: {
                        _run: function() {
                            MjClient.playui.doBtnLightAction(this);
                        }
                    },
                    _click: function() {
                        MjClient.playui.showSelectCards(MjClient.playui.gangType.zha5);
                    }
                },
                btn_hu: {
                    _layout: [[0, 0.1], [0.7, 0.1], [-12, 2.5]],
                },
                img_gangSelect: {
                    _visible: false,
                    _run: function() {
                        setWgtLayout(this, [0, 0.2], [0.5, 0.76], [0, 0]);
                        this.initBgSize = this.getContentSize();
                        this.initBgScale = this.scale;
                    }
                }
            },
            img_tongCang: {
                _visible:false,
                _layout: [[0.15, 0.15], [0.5, 0.56], [0, 0]],
                _event: {
                    HZUpdateEatFlag:function() {
                        MjClient.playui.checkZhaTipsVisible(this);
                    },
                    initSceneData:function() {
                        MjClient.playui.checkZhaTipsVisible(this);
                    },
                    MJPut:function() {
                        this.visible = false;
                    },
                    waitPut:function() {
                        this.visible = false;
                    },
                    roundEnd:function() {
                        this.visible = false;
                    }
                }
            },
            img_waitZha: {
                _visible:false,
                _layout: [[0.26, 0.26], [0.5, 0.56], [0, 0]],
                _event: {
                    HZUpdateEatFlag:function() {
                        MjClient.playui.checkZhaTipsVisible(this);
                    },
                    initSceneData:function() {
                        MjClient.playui.checkZhaTipsVisible(this);
                    },
                    mjhand:function() {
                        this.visible = true;
                    },
                    MJPut:function() {
                        this.visible = false;
                    },
                    waitPut:function() {
                        this.visible = false;
                    },
                    roundEnd:function() {
                        this.visible = false;
                    }
                }
            },
            btn_putCard:{
                _visible: false,
                _run:function () {
                    if(MjClient.data.sData.tData.maxPlayer == 4){
                        setWgtLayout(this, [0.185, 0.143], [0.5, isIPhoneX() ? 0.6 : 0.5], [0, 0], true)
                    }else{
                        setWgtLayout(this, [0.185, 0.143], [0.75, 0.6], [0, 0], true)
                    }
                },
                _click: function() {
                    if (MjClient.selectCard_paohuzi !== null && cc.sys.isObjectValid(MjClient.selectCard_paohuzi)){
                        if (MjClient.selectCard_paohuzi.putCardCb){
                            MjClient.selectCard_paohuzi.putCardCb();
                        }
                        MjClient.selectCard_paohuzi = null;
                    }
                },
                _event: {
                    EZP_chuPai:function () {
                        MjClient.playui.checkPutCardBtnVisible(this);
                        if (MjClient.playui.getChuPaiType() == 0){
                            MjClient.playui.refreshHandCard(0);
                        }
                    },
                    initSceneData: function() {
                        MjClient.playui.checkPutCardBtnVisible(this);
                    },
                    MJPeng: function() {
                        MjClient.playui.checkPutCardBtnVisible(this);
                    },
                    HZLiuCard: function() {
                        MjClient.playui.checkPutCardBtnVisible(this);
                    },
                    MJPass: function() {
                        MjClient.playui.checkPutCardBtnVisible(this);
                    },
                    MJPut:function () {
                        MjClient.playui.checkPutCardBtnVisible(this);
                    },
                    waitPut:function() {
                        MjClient.playui.checkPutCardBtnVisible(this);
                    },
                    clearCardUI:function() {
                        MjClient.playui.checkPutCardBtnVisible(this);
                    }
                },
            },
            btn_nie: {
                _visible:false
            }
        }

        util.assign(jsBind, pBind); 
        return jsBind;
    },
});

playPanel_huBeiHuaPai.prototype.setZhaNum = function(node) {
    node.visible = false;
    if (!this.isInPlay()) {
        return; //非打牌过程不显示
    }
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl)
        return;
    node.visible = true;
    var text = node.getChildByName('img_num');
    text.setString(pl.mjgang1.length);
};

playPanel_huBeiHuaPai.prototype.checkZhaTipsVisible = function(node) {
    var tData = MjClient.data.sData.tData;
    var name = node.getName();
    var imgTongCang = name == 'img_tongCang' ? node : node.parent.getChildByName('img_tongCang');
    var imgWaitZha = name == 'img_waitZha' ? node : node.parent.getChildByName('img_waitZha');
    imgTongCang.visible = false;
    imgWaitZha.visible = false;
    var pl = this.getUIPlayer(0);
    if (!pl)
        return;
    if(tData.isLastDraw && tData.tState == TableState.waitEat) {
        if (pl.eatFlag & 16) {
            imgTongCang.visible = true;
        } else {
            imgWaitZha.visible = true;
        }
    }
};

playPanel_huBeiHuaPai.prototype.getSkipHuTips = function(optType) {
    var cnOpt = ['招', '贩', '扎', '扎'][optType];
    var tips = cnOpt + "牌后视为过胡，确定" + cnOpt + "吗？";
    return tips;
}

playPanel_huBeiHuaPai.prototype.doLiuCard = function(opt, card) {
    var msg = {
        cmd: 'HZLiuCard',
        card: card,
        optFlag: opt.eatFlag,
        type: opt.type
    }
    if ((MjClient.data.sData.players[SelfUid()].eatFlag & 32) > 0) {
        MjClient.showMsg(MjClient.playui.getSkipHuTips(opt.type), function() {
            MjClient.playui.hideEatBtns();
            MjClient.gamenet.request("pkroom.handler.tableMsg", msg);
        }, function() {}, "1");
    } else {
        MjClient.playui.hideEatBtns();
        MjClient.gamenet.request("pkroom.handler.tableMsg", msg);
    }
}

playPanel_huBeiHuaPai.prototype.getSelectCnName = function(optType) {
    return ['招\n牌', '贩\n牌', '扎\n牌', '扎\n牌'][optType];
}

//param.操作类型
playPanel_huBeiHuaPai.prototype.showSelectCards = function (opt) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = sData.players[SelfUid()];

    //test
    //opt = {name:'fan', type:1}
    //pl.liuCards = {fan:[21]};
    
    var liuData = pl.liuCards;
    var liuCards = [];
    if (liuData && liuData[opt.name] && liuData[opt.name].length > 0) {
        liuCards = liuData[opt.name];
    } 

    if (liuCards.length == 0) {
        return;
    }

    this.hideEatBtns();
    MjClient.playui.jsBind.node_eatChoice.btn_cancel._node.visible = true;

    var selectBg = MjClient.playui.jsBind.node_eatChoice.img_gangSelect._node;
    selectBg.visible = true;
    var tempBtn = selectBg.getChildByName('btn_select');
    tempBtn.visible = false;
    var children = selectBg.getChildren();
    for (var i = children.length - 1; i >= 0; i--) {
        if (children[i].getName() == 'btn_select' ||
            children[i].getName() == 'text_Title') {
            continue;
        }
        children[i].removeFromParent();
    }

    var nameNode = selectBg.getChildByName('text_Title');
    nameNode.setString(this.getSelectCnName(opt.type));

    //宽度适配
    var xGap = 18;
    selectBg.width = selectBg.initBgSize.width + (liuCards.length - 1) * (xGap + tempBtn.width * tempBtn.scaleX);

    //坐标
    nameNode.x = 30;

    var btnStartX = nameNode.x + nameNode.width + xGap;
    for (var i = 0; i < liuCards.length; i++) {
        var btn = tempBtn.clone();
        btn.visible = true;
        btn.tag = liuCards[i];
        btn.x = btnStartX + btn.width*btn.scaleX/2 + i * (btn.width * btn.scaleX + xGap);
        btn.loadTextureNormal(this.getCardFilePath() + 'out' + liuCards[i] + '.png');
        btn.addClickEventListener(function(sender) {
            MjClient.playui.doLiuCard(opt, sender.tag);
            sender.parent.visible = false;
        })
        btn.setName('gangCard');
        selectBg.addChild(btn);
    }
}

playPanel_huBeiHuaPai.prototype.changeEatBtnLayout = function(btnNode, len, idx) {
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

playPanel_huBeiHuaPai.prototype.getEatLabel = function(eatType, msg) {
    var img = {mjpeng:'dui', mjgang0:'zhao', mjgang1:'zha', hu:'hu', dianPao:'dianChong'};
    if (eatType == 'mjgang0' && msg.type == 1) {
        img.mjgang0 = 'fan';
    }
    if (eatType in img) {
        return 'playing/ziPaiTable/huaPai/' + img[eatType] + '.png';
    }
    return null;
};

// 节点是否扎牌列
playPanel_huBeiHuaPai.prototype.getCurNodeZhaCards = function(node, mjgang1, idx) {
    if (!cc.sys.isObjectValid(node) || node.children.length < 4 || 
        !mjgang1 || mjgang1.length == 0) {
        return;
    }
    if (idx >= mjgang1.length || idx < 0) {
        return;
    }
    var cards = [];
    var children = node.children;
    var zha = mjgang1[idx];
    for (var i = 0; i < children.length; i++) {
        var tag = children[i].tag;
        if (zha.indexOf(tag) >= 0) {
            cards.push(tag);
        }
    }
    if (cards.length == zha.length) {
        return zha;
    }
}

// 添加扎牌角标
playPanel_huBeiHuaPai.prototype.addZhaNumIcon = function(node, cards) {
    if (!cc.sys.isObjectValid(node) || !cards) {
        return;
    }

    cards = cards.slice();
    function addIcon(card, num) {
        var icon = ccui.ImageView.create('playing/ziPaiTable/huaPai/icon_' + num + '.png');
        icon.x = icon.width/2;
        icon.y = card.height - icon.height/2;
        icon.setName('zhaIcon');
        card.addChild(icon);
    }

    var children = node.getChildren();
    var len = children.length;
    var cnt = cards.length;
    for (var i = 0; i < len; i++) {
        var card = children[i];
        var idx = cards.indexOf(card.tag);
        if (!card.getChildByName('zhaIcon') && idx >= 0) {
            addIcon(card, cnt);
            cards.splice(idx, 1);
        }
        if (cards.length == 0) {
            break;
        }
    }
};

playPanel_huBeiHuaPai.prototype.updateHandCardByEat = function(node, eatType, msg) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurEatPlayer(msg, off)) {
        return;
    }

    eatType = this.apartGangType(eatType, msg);
    //如果是扎牌
    if (eatType == 'mjgang1') {
        var pl = MjClient.playui.getUIPlayer(off);
        if (off == 0) {
            MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand, pl.mjgang1);
        } else if (MjClient.rePlayVideo != -1) {
            MjClient.OtherHandArr[off] = MjClient.majiang.sortCardForOtherReplay(pl.mjhand, pl.mjgang1);
        }
    } else {
        var cardArr = [msg.cards];//this.getEatCardArr(eatType, off); //返回的是二维数组
        this.removeEatArrFromHand(eatType, cardArr[0], msg, off);
    }

    this.refreshHandCard(off);
};

playPanel_huBeiHuaPai.prototype.hzNewCardForOtherReplay = function(node, card) {
    if (!card)
        return;
    var off = MjClient.playui.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if(MjClient.playui.isCurPlayer(off)){
        var mjhand = [];
        for(var i = 0; i < MjClient.OtherHandArr[off].length; i++){
            mjhand = mjhand.concat(MjClient.OtherHandArr[off][i]);
        }
        mjhand.push(card);
        MjClient.OtherHandArr[off] = MjClient.majiang.sortCardForOtherReplay(mjhand, pl.mjgang1);
    }
};

playPanel_huBeiHuaPai.prototype.apartGangType = function(eatType, msg) {
    var eatType = eatType;
    if (eatType == "mjgang") {
        if (msg.type == 0 || msg.type == 1) {
            eatType = "mjgang0";
        } else {
            eatType = "mjgang1";
        }
    }
    return eatType;
};

playPanel_huBeiHuaPai.prototype.removeEatArrFromHand = function(eatType, cardArr, msg, off) {
    var tData = MjClient.data.sData.tData;
    var arr = cardArr.slice();
    if (eatType == 'mjpeng') {
        arr.splice(arr.indexOf(tData.lastPutCard), 1);
    } else if(eatType == 'mjgang0') {
        if (msg.type == 0) {
            //招.删手上3张
            arr.splice(arr.indexOf(tData.lastPutCard), 1);
        } else if (msg.type == 1) {
            //贩.手上该牌全删.arr不变
        }
    } else if (eatType == 'mjgang1') {
        //扎牌不删手牌
        arr = [];
    }

    this.removeExtendFromHand(arr, off);
};

playPanel_huBeiHuaPai.prototype.removeExtendFromHand = function(cardArr, off) {
    for (var i = 0; i < cardArr.length; i++) {
        this.removeHandCard(cardArr[i], off);
    }
};

playPanel_huBeiHuaPai.prototype.getLastEatNodeLineCount = function(curLineCount, off) {
    var indexInUids = this.getIndexInUids(off);
    var pl = MjClient.data.sData.players[MjClient.data.sData.tData.uids[indexInUids]];
    var totalLinesCount = pl.mjpeng.length + pl.mjgang0.length;
    return totalLinesCount - curLineCount;
};

playPanel_huBeiHuaPai.prototype.updateEatCard = function(node, eatType, msg) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurEatPlayer(msg, off)) {
        return;
    }
    eatType = this.apartGangType(eatType, msg);
    if (eatType == 'mjchi' || eatType == 'mjgang1') { 
        //扎牌.不刷新桌面
        return;
    }

    var cardArr = [msg.cards];//this.getEatCardArr(eatType, off);
    this.sortEatCard(cardArr);
    //var from = this.getUIOffByUid(MjClient.data.sData.tData.uids[msg.from]);
    var eatCardNode = this.getEatCardNode(eatType, cardArr, off);
    var lastLineCount = this.getLastEatNodeLineCount(cardArr.length, off);

    this.dislpayEatCardNode(eatCardNode, lastLineCount, false, eatType, off);
};

playPanel_huBeiHuaPai.prototype.initEatCard = function(node, isRoundEndMsg) {
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
        if (mjSort.name == 'mjgang1' ||
            mjSort.name == 'mjchi') {
            continue; //扎牌不放桌面
        }
        var cardArr = this.getEatCardArr(mjSort.name, off, mjSort.pos);
        this.sortEatCard(cardArr);
        var from = this.getUIOffByUid(tData.uids[mjSort.from]);
        var eatCardNode = this.getEatCardNode(mjSort.name, cardArr, off, from);
        this.dislpayEatCardNode(eatCardNode, lastLineCount, true, mjSort.name, off);
        lastLineCount += cardArr.length;
    }
};

playPanel_huBeiHuaPai.prototype.getEatCardArr = function(eatType, off, pos) {
    var pl = this.getUIPlayer(off);
    var pos = typeof(pos) == "undefined" ? (pl[eatType].length - 1) : pos;
    return [pl[eatType][pos]];
};

playPanel_huBeiHuaPai.prototype.getEatCardNode = function(eatType, cardArr, off) {
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
            eatCardNode.cardWidth = eatCardNode.cardWidth || card.width * card.scaleX;
        }
    }
    return eatCardNode;
};

playPanel_huBeiHuaPai.prototype.dislpayEatCardNode = function(eatCardNode, lastLineCount, isInit, eatType, off) {
    var layout_eatCards = this.getUINode(off).getChildByName("layout_eatCards");
    var point = this.getEatCardPoint(off);
    var targetY = point.y;
    var targetX = point.x + point.dx * lastLineCount * eatCardNode.cardWidth;
    if (!isInit && eatType == "mjgang0") {
        //var card = this.getEatCard(eatType, off)[0];
        var card = eatCardNode.children[0].tag;
        var children = layout_eatCards.children;
        for (var i = 0; i < children.length; i++) {
            var cardParent = children[i];
            var tag = cardParent.children[0].tag;
            if (tag % 100 == card % 100) { //特别注意.目前该玩法没有吃可以这样判断
                targetX = cardParent.targetX != undefined ? cardParent.targetX : cardParent.x;
                break;
            }
        }
    }

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

playPanel_huBeiHuaPai.prototype.getPutCardBg = function (putType) {
    return "playing/ziPaiTable/huaPai/chuPai_bg2.png";
};

// 计算进牌时应落在手里的相对位置 
playPanel_huBeiHuaPai.prototype.getNewHandCardPos = function(node, off) {
    var uiNode = this.getUINode(off);
    var layout_handCards = uiNode.getChildByName("layout_handCards");

    //回放其它玩家飞头像.TODO
    var pos = {x:0, y:0};
    if (off == 0) {
        var handCard = uiNode.getChildByName("img_handCard");
        // 从右往左遍历节点，找到未满7张的牌列
        var parent = layout_handCards.getChildByTag(8); //进牌固定放入最后一列最上面
        var idx = 7;
        while(parent.children.length >= this.colMaxNum && idx >= 0) {
            parent = layout_handCards.getChildByTag(idx);
            idx--;
        }
        if (cc.sys.isObjectValid(parent)) {
            var temp = this.getNewCard("hand", 1, 0);
            var offY = this.getOffYByCard(temp, parent.children.length + 1);
            var y = handCard.y - parent.getChildrenCount() * offY;
            //坐标转换
            var wPos = parent.convertToWorldSpace(cc.p(0, y));
            var nPos = node.parent.convertToNodeSpace(wPos);
            pos.x = nPos.x + node.anchorX * node.scaleX * node.width - temp.anchorX * temp.scaleX * temp.width * 0.35;
            pos.y = nPos.y + node.anchorY * node.scaleY * node.height;
        }
    } else {
        pos = uiNode.getChildByName("layout_head").getPosition();
    }
    return pos;
}

// 获取操作按钮数组
playPanel_huBeiHuaPai.prototype.getShowEatNodes = function() {
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
        if (liuCards.fan && liuCards.fan.length > 0) {
            vnode.push(eat.btn_fan._node);  // 贩
        }
    }

    if (pl.eatFlag & 16) {
        if (liuCards.zha4 && liuCards.zha4.length > 0) {
            vnode.push(eat.btn_zha4._node); //扎4
        } 
        if (liuCards.zha5 && liuCards.zha5.length > 0) {
            vnode.push(eat.btn_zha5._node); //扎5
        }
    }

    if (pl.eatFlag & 32) { // 胡
        vnode.push(eat.btn_hu._node);
    }

    if (vnode.length > 0) { // 过
        vnode.push(eat.btn_guo._node);
    }

    return vnode;
};

playPanel_huBeiHuaPai.prototype.addNewCardToHandArr = function(card) {
    if (!card || !MjClient.HandCardArr)
        return;
    for (var i = 8; i >= 0; i--) {
        if (MjClient.HandCardArr[i].length < this.colMaxNum) {
            MjClient.HandCardArr[i].push(card);
            this.newCardInfo.card = card;
            this.newCardInfo.col = i;
            this.newCardInfo.row = MjClient.HandCardArr[i].length - 1;
            break;
        }
    }
}

playPanel_huBeiHuaPai.prototype.checkHandCardByPut = function(off) {
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
                    MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], pl.mjgang1 || []);
                }
                return true;
            }
        }
    }else{
        if (MjClient.majiang.sortCard) {
            MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], pl.mjgang1 || []);
        }
        return true;
    }
    return false;
};

playPanel_huBeiHuaPai.prototype.initHandCards = function(node, msg) {
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
        MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], pl.mjgang1 || [], this.isLastDraw(pl));
    }
    this.refreshHandCard(off);
};

//第一个参数修改.传目的列索引
playPanel_huBeiHuaPai.prototype.fixArrIndex = function(col, cardNum, card, isDiffColumn) {
    var arr = MjClient.HandCardArr[col];
    arr.push(cardNum);
    if(isDiffColumn && this.isHandMoveToTopDiffColumn()) {
        MjClient.moveCard.nexRIndex = arr.length - 1;
        return;
    }

    // 插入的列内位置计算.以牌值计算位置
    arr = MjClient.majiang.sortRowCards(arr);
    MjClient.moveCard.nexRIndex = arr.indexOf(cardNum);  
};

playPanel_huBeiHuaPai.prototype.showCardTingSign = function(card, isShow) {
    if (isShow) {
        if (cc.sys.isObjectValid(card.getChildByName('zhaIcon'))) {
            card.removeChildByName("tingSign"); //扎牌不加听角标
            return;
        }
        var tingSign = card.getChildByName("tingSign");
        if (!tingSign) {
            tingSign = new ccui.ImageView("playing/ziPaiTable/huaPai/ting.png");
            tingSign.setName("tingSign");
            card.addChild(tingSign)
        }
        tingSign.visible = true;
        tingSign.setPosition(card.width, card.height);
        tingSign.setAnchorPoint(1, 1);
    } else {
        card.removeChildByName("tingSign");
    }
};

playPanel_huBeiHuaPai.prototype.setCardTouchHandler = function(card, off) {
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
            var isZhaCard = cc.sys.isObjectValid(btn.getChildByName('zhaIcon'));
            var isCanPut =  IsTurnToMe() && (isPutCommon || isPutSpecil) && !isZhaCard && MjClient.playui.checkCardCanPut(pl, card) && !MjClient.hasPut;
            var isOverLine = pos.y > MjClient.playui.jsBind.img_cutLine._node.y; //是否达到了出牌虚线坐标

            var resetPos = function() {
                var w = btn.parent.width;
                var dstCol = col + Math.round((pos.x - btn.parent.x) / (w) - 0.5); // 目的列
                if (btn.getChildByName('zhaIcon')) {
                    //扎牌归位
                } else if (dstCol == col) { 
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
                    MjClient.playui.doPut(card, btn, col, row);
                    MjClient.playui.checkPutCardBtnVisible();
                } else {
                    resetPos();
                }
                MjClient.playui.refreshHandCard(0);
            }

            if (isOverLine) {
                putCardCb();
            } else {
                resetPos();
                MjClient.playui.refreshHandCard(0);
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

playPanel_huBeiHuaPai.prototype.checkCardCanPut = function(pl, card) {
    return card != MjClient.majiang.KING;
}

playPanel_huBeiHuaPai.prototype.doPut = function(card, btn, col, row) {
    playLayer_ziPai.prototype.doPut.apply(this, [card, btn, col, row]);
    this.checkPutCardBtnVisible();
};

//移动最后一列的一张牌(如果有)到对应列.湖北花牌不需要
playPanel_huBeiHuaPai.prototype.moveLastCardToRow = function() {
    
}

playPanel_huBeiHuaPai.prototype.showOutCardAnimation = function (node) {
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

    var endPos = this.getOutCardPos(off);
    var outLayout = uiNode.getChildByName("layout_outCards");
    var outCard = this.getNewCard("out", pl.mjput[pl.mjput.length - 1], off, false);
    outCard.setPosition(endPos);
    outLayout.addChild(outCard);

    var anmEndPos = outLayout.convertToWorldSpace(cc.p(endPos.x, endPos.y)); // 动画结束坐标
    var actTime = this.getAniTimeByType("land");
    outCard.setOpacity(0);
    var initScale = outCard.scale;
    outCard.setScale(0.4);
    var spa = cc.spawn(cc.fadeIn(0.05), cc.scaleTo(0.05, initScale));
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

//获取标准状态手牌一列的行距差. param2 = 该列的牌数量
playPanel_huBeiHuaPai.prototype.getOffYByCard = function(card, cnt){
    var comRate = 1280/720; //标准比率
    var rate = MjClient.size.width/MjClient.size.height;
    var offY = card.height * card.scaleY - card.height / 1.28 * card.scaleY;
    offY *= (comRate/rate);
    //标准(5张)状态下总间距
    var totalOff = offY * 4;
    if (cnt > 5) { //超过5张进行间距压缩
        offY = totalOff/(cnt-1);
    }
    return offY; //逆向摆
};

playPanel_huBeiHuaPai.prototype.isZiPaiCard = function (card) {
    var cards  = MjClient.majiang.orderCards.concat(MjClient.majiang.huaJing);
    return cards.indexOf(card) != -1;
};

playPanel_huBeiHuaPai.prototype.changeHandCardSize = function(handCard) {
    var src = this.getCardSrc("hand", 1)
    //handCard.loadTexture(src, this.getResType());
    this.loadCardTexture(handCard, src, this.getResType());
    var w = handCard.width * handCard.scaleX;
    var idx = this.getCardSizeIdx();
    switch (idx) {
        case 0:
            setWgtLayout(handCard, [w / 1280, 0], [0.33, 0.185], [0, 0]);
            break;
        case 1:
            setWgtLayout(handCard, [70 / 1280, 0], [0.27, 0.75], [0, 0]);
            break;
        case 2:
            setWgtLayout(handCard, [70 / 1280, 0], [0.27, 0.75], [0, 0]);
            break;
    }
};

//每列牌在父节点中的起始坐标 param.1.父节点. 2.添加的牌 3.csd中的模板牌 TODO.后续优化
playPanel_huBeiHuaPai.prototype.getRowCardsStartPos = function(handCard, parent, card) {
    return cc.p(0, handCard.y);
};

playPanel_huBeiHuaPai.prototype.addOneHandCard = function(col, row, cardNum, off) {
    var uiNode = this.getUINode(off);
    //根据牌的类型获得需要添加的节点
    var layout_handCards = uiNode.getChildByName("layout_handCards");
    var handCard = uiNode.getChildByName("img_handCard");
    //取一个对应的牌节点
    var newCard = null;
    if (this.newCardInfo.card == cardNum &&
        this.newCardInfo.col == col &&
        this.newCardInfo.row == row) {
        //此时新建一张card.重置
        this.newCardInfo = { card:-1, col:-1, row:-1 };
    } else {
        newCard = this.getCardNodeFromList(layout_handCards.cardList, cardNum);
    }
    
    if (!newCard) {
        // cc.log("chow", "newCard");
        newCard = this.getNewCard("hand", cardNum, off);
    } else {
        // cc.log("chow", "getCard");
        newCard.removeChildByName('zhaIcon');
    }
    var scale_y = newCard.scaleY;

    var cardParent = layout_handCards.getChildByTag(col);
    if (!cardParent) {
        cardParent = this.getCardRoot(layout_handCards.cardRoot, col);
        if (!cardParent) {
            // cc.log("chow", "newRoot");
            cardParent = new cc.Node();
            cardParent.tag = col;
            cardParent.width = 95//handCard.width * handCard.scaleX;
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

    var beginPoint = this.getRowCardsStartPos(handCard, cardParent, newCard);
    var off_y = this.getOffYByCard(newCard, MjClient.HandCardArr[col].length);
    var cardCount = cardParent.getChildrenCount();

    newCard.setName(row);
    newCard.zIndex = this.colMaxNum + row;
    newCard.anchorX = 0;
    newCard.anchorY = 0;
    //newCard.x = beginPoint.x;
    //newCard.y = beginPoint.y + cardCount * off_y;
    cardParent.addChild(newCard);
    if (newCard.lastPosition) {
        newCard.setPosition(cardParent.convertToNodeSpace(newCard.lastPosition));
        this.doMoveToAction(newCard, cc.p(beginPoint.x, beginPoint.y - cardCount * off_y));
        //newCard.setPosition(cc.p(beginPoint.x, beginPoint.y - cardCount * off_y));
    } else {
        newCard.x = beginPoint.x;
        newCard.y = beginPoint.y - cardCount * off_y;
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

playPanel_huBeiHuaPai.prototype.refreshHandCard = function(off, isRefresh) {
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
                        cardParent = new cc.Node();
                        cardParent.tag = k;
                        cardParent.width = width;
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
            var nodeY = 0 - handCard.height * handCard.scaleY * 0.34;
            if (isIPhoneX())
                nodeY -= handCard.height * 0.07; 
            var startX = (winSize.width - totalWidth) / 2 + 39*winSize.width/640; //背景图决定了牌不摆在中间，因此做个偏移
            var zhaIdx = pl.mjgang1.length - 1;
            for (var i = 0; i < cardArr.length; i++) {
                var addNode = layout_handCards.getChildByTag(i);
                this.showHandHuXi(addNode);

                if (addNode.lastPosition) {
                    addNode.setPosition(addNode.lastPosition);
                    this.doMoveToAction(addNode, cc.p(startX + i * width, nodeY));
                } else {
                    addNode.setPosition(cc.p(startX + i * width, nodeY));
                }
                //扎牌角标
                var zhaCards = this.getCurNodeZhaCards(addNode, pl.mjgang1, zhaIdx);
                if (zhaCards) {
                    this.addZhaNumIcon(addNode, zhaCards);
                    --zhaIdx;
                }
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
                cardParent.width = handCard.width * handCard.scaleX;
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
            var nodeY = 0 - handCard.height * handCard.scaleY * 0.34;
            if (isIPhoneX())
                nodeY -= handCard.height * 0.07;
            var startX = (winSize.width - totalWidth) / 2 + 39*winSize.width/640; //背景图决定了牌不摆在中间，因此做个偏移
            var zhaIdx = pl.mjgang1.length - 1;
            for (var i = 0; i < cardArr.length; i++) {
                var addNode = handNode.getChildByTag(i);
                addNode.setPosition(cc.p(startX + i * width, nodeY));
                var zhaCards = this.getCurNodeZhaCards(addNode, pl.mjgang1, zhaIdx);
                if (zhaCards) {
                    this.addZhaNumIcon(addNode, zhaCards);
                    --zhaIdx;
                }
            }
        }

        if (off != 0) {
            for (var i = 0; i < cardArr.length; i++) {
                var addNode = handNode.getChildByTag(i);
                if (i < pl.mjgang1.length) {
                    this.addZhaNumIcon(addNode, pl.mjgang1[pl.mjgang1.length - i - 1]);
                }
            }
        }

        postEvent("LY_addHandHuXi");
        cc.log("================off:" + off + "----------" + JSON.stringify(cardArr));
    }
};

playPanel_huBeiHuaPai.prototype.addHandCard = function(col, row, cardNum, off) {
    var uiNode = this.getUINode(off);
    //根据牌的类型获得需要添加的节点
    var layout_handCards = uiNode.getChildByName("layout_handCards");
    var handCard = uiNode.getChildByName("img_handCard");

    //设置牌
    var newCard = this.getNewCard("hand", cardNum, off);
    var scale_y = newCard.scaleY;
    //首先根据name判断cpNode中是否已经添加
    var cardParent = layout_handCards.getChildByTag(col);
    if (!cardParent) {
        cardParent = new cc.Node();
        cardParent.tag = col;
        cardParent.width = newCard.width * newCard.scaleX;
        layout_handCards.addChild(cardParent);
    }

    //var beginPoint = cc.p(0, 0);
    var beginPoint = this.getRowCardsStartPos(handCard, cardParent, newCard);
    //var off_y = newCard.height * scale_y - newCard.height / 4 * scale_y;
    var off_y = this.getOffYByCard(newCard, MjClient.HandCardArr[col].length);

    var cardCount = cardParent.childrenCount;
    newCard.setName(row);
    newCard.zIndex = this.colMaxNum + row;
    newCard.anchorX = 0;
    newCard.anchorY = 0;
    newCard.x = beginPoint.x;
    newCard.y = beginPoint.y - cardCount * off_y; //往下添加
    cardParent.addChild(newCard);
};

//总结算面板
playPanel_huBeiHuaPai.prototype.createGameOverLayer = function(type) {
    return new GameOverLayer_huBeiHuaPai();
};

//小结算面板
playPanel_huBeiHuaPai.prototype.createEndOneLayer = function(type) {
    return new EndOneView_huBeiHuaPai();
};

//字牌资源路径
playPanel_huBeiHuaPai.prototype.getCardFilePath = function() {
    var sizeList = this.getCardSizeList();
    var fontList = this.getCardFontList();
    var sizeIdx = 0;
    var fontIdx = this.getCardFontIdx();

    return "playing/huaPai/huBeiHuaPai/" + sizeList[sizeIdx] + "/" + fontList[fontIdx] + "/";
};

// 获取牌资源路径
playPanel_huBeiHuaPai.prototype.getCardSrc = function(name, tag, isTurn) {
    var path = this.getCardFilePath();
    if(this.getResType() == 1 && name != "put"){
        path = path.replace("playing/huaPai/huBeiHuaPai/", ""); 
    }

    //put用hand
    if (name == 'put') {
        name = 'hand';
    }
    return (path + name + tag + ".png");
};

//手牌张数 
playPanel_huBeiHuaPai.prototype.getHandCount = function() {
    return 25;
};

// 改变布局.花牌固定使用传统布局
playPanel_huBeiHuaPai.prototype.changeLayout = function(uiNode) {
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
        setWgtLayout(layoutEat, [0.14, 0.14], [0.09 + des, 0.89 + ipxPosY], [0, 0]);

        var layoutEat = rightNode.getChildByName("layout_eatCards");
        setWgtLayout(layoutEat, [0.14, 0.14], [0.91 - des, 0.89 + ipxPosY], [0, 0]);
    }
};

// 收入亮张动画
playPanel_huBeiHuaPai.prototype.showPickCardAnimation = function(node) {
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
    node.runAction(cc.sequence(
        cc.DelayTime(0.5),
        cc.spawn(cc.scaleTo(this.getActionTime(), scale*MjClient.size.width/1280), cc.moveTo(this.getActionTime(), pos.x, pos.y)).easing(cc.easeCubicActionOut()), 
        cc.callFunc(()=>{
            node.opacity = 0;
            node.visible = false;
            node.isPick = false;
            MjClient.playui.refreshHandCard(off);
    })));
};

// 设置
playPanel_huBeiHuaPai.prototype.getDefaultSetting = function() {
    var set = playPanel_dangYangFanJing.prototype.getDefaultSetting.apply(this, []);
    set.chuBtn = 0;
    return set;
};

//出牌按钮
playPanel_huBeiHuaPai.prototype.checkPutCardBtnVisible = function(node) {
    node = node || MjClient.playui.jsBind.btn_putCard._node;
    var pl = this.getUIPlayer(0);
    node.visible = !MjClient.hasPut && this.getChuPaiType() == 0 && 
                    (IsTurnToMe() && MjClient.data.sData.tData.tState == TableState.waitPut &&
                     pl.mjState == TableState.waitPut);
};

playPanel_huBeiHuaPai.prototype.checkBtnWithPlayerFlag = function(){
    return;
};