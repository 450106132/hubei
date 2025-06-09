/**
 * 斗地主手牌组件
 */
var PokerCardNode_Doudizhu = cc.Node.extend({
    node: null,
    ctor: function (off, scale) {
        this._super();
        // 加载csb资源
        var csbNode = ccs.load(res.Doudizhu_CardNode_json).node;
        this.node = csbNode;
        this.NOR_HAND_NAME = "pkhand";
        this.REP_HAND_NAME = "pkhand_replay";
        this.OUT = "out";
        this.SCALE = scale;
        this.stand = csbNode.getChildByName("stand");
        this.stand.visible = false;
        this.off = off;
        this.standPosY = this.stand.y;
        this.standSize = this.stand.getSize();
        this.standScale = this.stand.scale;
    }
});

// =========================[[ 流程方法 ]] ================================

//添加手牌
PokerCardNode_Doudizhu.prototype.initHandCards = function () {
    var pl = getUIPlayer(this.off);
    if (pl == null || pl.mjhand == null) {
        return;
    }
    if (MjClient.rePlayVideo == -1 && this.off > 0) {
        return;
    }// 表示正常游戏, 只初始化自己的手牌
    var name = this.off == 0 ? this.NOR_HAND_NAME : this.REP_HAND_NAME;
    this.createHandCards(pl.mjhand, name);
    this.cardLayoutRestoreForPlay();
};

// 打牌的摆放
PokerCardNode_Doudizhu.prototype.cardLayoutRestoreForPlay = function () {
    var pl = getUIPlayer(this.off);
    if (pl == null || pl.mjhand == null) {
        return;
    }
    var isZhuang = this.isZhuangByOff();
    this.cardLayoutRestore(pl.mjhand, isZhuang);
};

// =========================[[ 操作手牌方法 ]] =============================
PokerCardNode_Doudizhu.prototype.getSelectCardsIdx = function (worldSp) {
    var children = this.node.children;
    var locationInNode = this.node.convertToNodeSpace(worldSp);
    var lastMouseIn = -1;
    for (var i = 0; i < children.length; i++) {
        if (children[i].name == this.NOR_HAND_NAME) {
            var _boundingBox = children[i].getBoundingBox();
            if (this.getLastCardX() != parseInt(children[i].x)) {
                _boundingBox.width -= (_boundingBox.width * 0.56);
            }
            if (cc.rectContainsPoint(_boundingBox, locationInNode)) {
                children[i].setColor(MjClient.grayColor);
                lastMouseIn = i;
                break;
            }
        }
    }
    return lastMouseIn;
};

// 处理滑动手牌的颜色
PokerCardNode_Doudizhu.prototype.handleTouchMoveOutOfRange = function (posSt, posEnd) {
    var st = posSt > posEnd ? posEnd : posSt;
    var end = posSt > posEnd ? posSt : posEnd;
    var children = this.node.children;
    for (var i = 0; i < children.length; i++) {
        if (i >= st && i <= end) {
            children[i].setColor(MjClient.grayColor);
        } else {
            children[i].setColor(MjClient.whiteColor);
        }
    }
};

// 更新点击／滑动的手牌
PokerCardNode_Doudizhu.prototype.updatePostionInMoveRange = function (posSt, posEnd) {
    var st = posSt > posEnd ? posEnd : posSt;
    var end = posSt > posEnd ? posSt : posEnd;
    var children = this.node.children;
    for (var i = 0; i < children.length; i++) {
        if (i >= st && i <= end) {
            if (children[i].y > this.stand.y) {
                this.putCardNodeDown(children[i]);
            } else {
                this.putCardNodeUp(children[i]);
            }
        }
    }
};

// 提起手牌
PokerCardNode_Doudizhu.prototype.putCardNodeUp = function (nodeCard,replacement) {
    if (!cc.sys.isObjectValid(nodeCard)) return;
    if (nodeCard.name != this.NOR_HAND_NAME) {
        return;
    }
    var cardY = this.standSize.width * this.standScale * 1.5; //一张牌的长度
    var cardOut = parseInt(cardY / 4);//点击牌弹起的高度,以前是20像素
    nodeCard.setColor(MjClient.whiteColor);
    nodeCard.y = this.standPosY + cardOut;

    if (replacement && nodeCard.tag != replacement)
        nodeCard.replacement = replacement;
    else
        nodeCard.replacement = null;
}

// 放下手牌
PokerCardNode_Doudizhu.prototype.putCardNodeDown = function (nodeCard) {
    if (!cc.sys.isObjectValid(nodeCard)) return;
    if (nodeCard.name != this.NOR_HAND_NAME) {
        return;
    }
    nodeCard.setColor(MjClient.whiteColor);
    nodeCard.y = this.standPosY;

    nodeCard.replacement = null;
};

// 清除手牌提起状态
PokerCardNode_Doudizhu.prototype.clearCardsUpStatus = function () {
    var children = this.node.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].name == this.NOR_HAND_NAME) {
            this.putCardNodeDown(children[i]);
        }
    }
};

// 根据牌值,提起手牌
PokerCardNode_Doudizhu.prototype.liftCardUp = function (valueArr) {
    var children = this.node.children;
    var tmpArr = valueArr.slice();
    for (var i = 0; i < children.length; i++) {
        if (children[i].name == this.NOR_HAND_NAME) {
            for (var j = 0; j < tmpArr.length; j++) {
                if (children[i].tag == tmpArr[j] || MjClient.majiang.getRealLaizi && children[i].tag == MjClient.majiang.getRealLaizi(tmpArr[j])) {
                    this.putCardNodeUp(children[i],tmpArr[j]);
                    tmpArr.splice(j, 1);
                    break;
                }
            }
        }
    }
};

// =========================[[ 手牌属性方法 ]] =============================

//获取提起的牌值，返回牌值数组(有序)
PokerCardNode_Doudizhu.prototype.getUpCardArr = function () {
    var children = this.node.children;
    var selectCards = [];
    for (var i = 0; i < children.length; i++) {
        if (children[i].name == this.NOR_HAND_NAME && children[i].y > this.stand.y) {
            selectCards.push(children[i].replacement ? children[i].replacement : children[i].tag);
        }
    }
    return MjClient.majiang.sortHandCards(selectCards, MjClient.sortType.normal);
};

PokerCardNode_Doudizhu.prototype.getLastCardX = function () {
    var children = this.node.children;
    var lastX = 0;
    for (var i = 0; i < children.length; i++) {
        if (children[i].name == this.NOR_HAND_NAME) {
            if (children[i].x > lastX) {
                lastX = children[i].x;
            }
        }
    }
    return parseInt(lastX);
};
PokerCardNode_Doudizhu.prototype.cardLayoutRestore = function (oCards, isZhuang, isOutPut, isRoundEnd) {
    if (cc.isUndefined(oCards) || oCards.length == 0) {
        return;
    }
    if (isOutPut) {
        this.deskCardLayoutRestore(oCards, isZhuang, isRoundEnd);
        return ;
    }
    var cards = oCards.slice();
    cards = MjClient.majiang.sortHandCards(cards, MjClient.sortType.normal);
    var orders = this.getNodeByValues(cards);
    if (orders.length == 0) {
        return;
    }
    var startX = this.getStartX(orders,isRoundEnd);
    var wgtSacle = MjClient.size.width / 137 * this.SCALE;
    var cardWidth = orders[0].width * wgtSacle;
    var screenScale = MjClient.size.width / 1280;
    var areaWidth = MjClient.size.width - screenScale * 120;
    var _count = orders.length >17 ? 19: 16;
    var width = (areaWidth - cardWidth) / (_count - 1) + (_count - orders.length) * 1 * screenScale;
    //todo wgtScale 为缩放比例
    for (var i = 0; i < orders.length; i++) {
        var ci = orders[i];
        //todo 因为父节点进行缩放，子节点要相应除以原来缩放比例，才会得到对应的位置。
        ci.x = startX / wgtSacle;
        ci.y = this.standPosY;
        startX += width;
        ci.zIndex = 600 + i;
        ci.getChildByName("dizhuTag").visible = isZhuang && (i == orders.length - 1);
    }
};
PokerCardNode_Doudizhu.prototype.deskCardLayoutRestore = function (oCards, isZhuang, isRoundEnd) {
    var cards = oCards.slice();
    cards = MjClient.majiang.sortHandCards(cards, MjClient.sortType.normal);
    var orders = this.getNodeByValues(cards);
    if (orders.length == 0) {
        return;
    }
    var startX = this.getDeskCardStartX(orders, isRoundEnd), initPosX, startY;
    initPosX = startX;
    startY = this.standPosY;
    var cardWidth = orders[0].width;
    var cardHeight = orders[0].height;
    var width = cardWidth * 0.42;
    for (var i = 0; i < orders.length; i++) {
        var ci = orders[i];
        ci.x = startX ;
        ci.y = startY;
        startX += width;
        if (isRoundEnd && i == 9) { //游戏结束把所有牌展示在桌面上，牌太多容易被遮盖，每9张换行
            startX = initPosX;
            startY = this.standPosY - cardHeight * 0.55;
        }
        ci.zIndex = 600 + i;
        ci.getChildByName("dizhuTag").visible = isZhuang && (i == orders.length - 1);
    }
};

PokerCardNode_Doudizhu.prototype.getNodeByValues = function (cards) {
    var cardLength = cards.length;
    var orders = []; //排序后的牌节点
    for (var i = 0; i < cardLength; i++) {
        for (var j = 0; j < this.node.children.length; j++) {
            var ci = this.node.children[j];
            if ((ci.name == this.NOR_HAND_NAME || ci.name == this.REP_HAND_NAME || ci.name == this.OUT) && 
                (ci.tag == cards[i] || MjClient.majiang.removeLaiziSign && MjClient.majiang.removeLaiziSign(cards[i]) == ci.tag)) {
                orders.push(ci);
            }
        }
    }
    return orders;
}

PokerCardNode_Doudizhu.prototype.getDeskCardStartX = function (orders, bRoundEnd) {
    var startX;
    var cardWidth = orders[0].width ;
    var parent = orders[0].getParent().getParent();
    var pScaleX = parent.getScaleX();
    var areaWidth =  MjClient.size.width / pScaleX;
    var width = cardWidth * 0.42;
    if (this.off == 1) {
            startX = -width * (bRoundEnd && orders.length > 8 ? 8 : orders.length);
    } else if (this.off == 2) {
            startX = 0;
    } else if (this.off == 0) {
            startX = (areaWidth - width * (orders.length - 1) + cardWidth) / 2;
    } else {//存在第四个玩家
        startX = 0;
    }
    return startX;
}

PokerCardNode_Doudizhu.prototype.getStartX = function (orders, bRoundEnd) {
    var startX;
    //todo this.SCALE为playgamePanel传进来的nodestand的缩放比例，137为nodestand的宽度
    var wgtSacle = MjClient.size.width / 137 * this.SCALE;
    var cardWidth = orders[0].width * wgtSacle;
    var screenScale = MjClient.size.width / 1280;
    var areaWidth = MjClient.size.width - screenScale * 120;
    var width = cardWidth * 0.55;
    var _count = orders.length >17 ? 19: 16;
    if (this.off == 1) {
        startX = -width * (bRoundEnd && orders.length > 8 ? 8 : orders.length); // 420
    } else if (this.off == 2) {
        startX = 0;
    } else if (this.off == 0) {
        width = (areaWidth - cardWidth) / (_count - 1) + (_count - orders.length) * 1 * screenScale;
        startX = screenScale * 60 + (areaWidth - width * (orders.length - 1)) / 2;
    } else {//存在第四个玩家
        startX = 0;
    }
    return startX;
}

// =========================[[ 手牌创建删除方法 ]] ==========================

//创建一组手牌, 创建手牌先清理手牌
PokerCardNode_Doudizhu.prototype.createHandCards = function (cardValueArr, name) {
    //this.clearHandCard();
    this.removeAllCards();
    for (var i = 0; i < cardValueArr.length; i++) {
        var nodeCard = this.createOneCardNode(cardValueArr[i], name);
        this.node.addChild(nodeCard);
    }
};

// 增加手牌
PokerCardNode_Doudizhu.prototype.addCardsForHand = function (cardValueArr) {
    if (cardValueArr == null || cardValueArr.length == 0) {
        return;
    }
    for (var i = 0; i < cardValueArr.length; i++) {
        var nodeCard = this.createOneCardNode(cardValueArr[i], this.NOR_HAND_NAME);
        this.node.addChild(nodeCard);
    }
    this.cardLayoutRestoreForPlay();
};

// 创建一张手牌
PokerCardNode_Doudizhu.prototype.createOneCardNode = function (value, name, scale) {
    var cpnode = this.stand.clone();
    cpnode.setName(name);
    cpnode.visible = true;
    cpnode.setUserData(0);
    cpnode.setSwallowTouches(true);
    this.setSpriteCard(cpnode, value, getCurrentPKImgType());
    this.createDiZhuCorner(cpnode);
    return cpnode;
};

PokerCardNode_Doudizhu.prototype.setSpriteCard = function (node, cd, type) {
    if (MjClient.majiang && MjClient.majiang.removeLaiziSign)
        cd = MjClient.majiang.removeLaiziSign(cd);

    var cardvalue = node.getChildByName("value");
    var small = node.getChildByName("small");
    var big = node.getChildByName("big");
    var Rsmall = node.getChildByName("Rsmall");
    var Rvalue = node.getChildByName("Rvalue");
    var joker = node.getChildByName("joker");
    var path;
    cardvalue.ignoreContentAdaptWithSize(true);
    Rvalue.ignoreContentAdaptWithSize(true);
    var tmp;
    cardvalue.setScale(tmp = type == 0 ? 1 : 1);
    Rvalue.setScale(tmp = type == 0 ? 1 : 1);
    small.setScale(tmp = type == 0 ? 0.34 : 0.25);
    Rsmall.setScale(tmp = type == 0 ? 0.34 : 0.25);
    Rsmall.visible = (tmp = type == 0 ? false : true);
    Rvalue.visible = (tmp = type == 0 ? false : true);
    big.visible = (tmp = type == 0 ? true : false);
    if((MjClient.isInGoldField() && MjClient.getGoldFiledType() == 1) || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ){
        path = (tmp = type == 0 ? "playing/cardPic2/" : "playing/cardPic6/");
    }else{
        path = (tmp = type == 0 ? "playing/cardPic2/" : "playing/cardPic3/");
    }

    var cardType = Math.ceil(cd / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
    var flowerType = cd % 4;// 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃
    var isJoker = false;
    if (cd == 53 || cd == 54)//小王， 大王
    {
        isJoker = true;
    }
    if (!isJoker) {
        //小花
        big.loadTexture(path + "flower_" + flowerType + ".png");
        small.loadTexture(path + "flower_" + flowerType + ".png");
        Rsmall.loadTexture(path + "flower_" + flowerType + ".png");
        if (flowerType == 0 || flowerType == 2) {
            cardvalue.loadTexture(path + "hei_" + cardType + ".png");
            Rvalue.loadTexture(path + "hei_" + cardType + ".png");
        } else {
            cardvalue.loadTexture(path + "hong_" + cardType + ".png");
            Rvalue.loadTexture(path + "hong_" + cardType + ".png");
        }
        joker.visible = false;
        small.visible = true;
    } else {
        joker.loadTexture(tmp = cd == 53 ? (path + "xiaowang_hua.png") : (path + "dawang_hua.png"));
        cardvalue.loadTexture(tmp = cd == 53 ? (path + "joker_xiao.png") : (path + "joker_da.png"));
        Rvalue.loadTexture(tmp = cd == 53 ? (path + "joker_xiao.png") : (path + "joker_da.png"));
        joker.visible = true;
        big.visible = false;
        small.visible = false;
    }
    node.tag = cd;
}

PokerCardNode_Doudizhu.prototype.changPkImageBack = function (type) {
    var children = this.node.children;
    for (var i = 0; i < children.length; i++) {
        var ci = children[i];
        if (ci.name == this.NOR_HAND_NAME) {
            this.setSpriteCard(ci, ci.tag, type);
        }
    }
}


//删除，根据牌值数组删除对应的牌
PokerCardNode_Doudizhu.prototype.removeHandCardByValueArr = function (valueArr) {
    for (var i = 0; i < valueArr.length; i++) {
        var children = this.node.children;
        for (var j = 0; j < children.length; j++) {
            if (!cc.sys.isObjectValid(children[j])) continue;
            if (children[j].name != this.NOR_HAND_NAME && children[j].name != this.REP_HAND_NAME) continue;
            if (children[j].tag == valueArr[i] || MjClient.majiang.getRealLaizi && MjClient.majiang.getRealLaizi(valueArr[i]) == children[j].tag) {
                children[j].removeFromParent(true);
                break;
            }
        }
    }
    this.cardLayoutRestoreForPlay();
};

//删除所有
PokerCardNode_Doudizhu.prototype.removeAllCards = function () {
    var children = this.node.children;
    var len = children.length;
    for (var i = len - 1; i >= 0; i--) {
        if (!cc.sys.isObjectValid(children[i])) continue;
        var ci = children[i];
        if (ci.name != this.NOR_HAND_NAME && ci.name != this.REP_HAND_NAME && ci.name != this.OUT) {
            continue;
        }
        ci.removeFromParent(true);
    }
};

// 创建地主角标
PokerCardNode_Doudizhu.prototype.createDiZhuCorner = function (parent) {
    if (!parent.getChildByName("dizhuTag")) {
        var path = "playing/cardPic2/dizhu_biao.png";
        var corner = new ccui.ImageView(path);
        corner.setPosition(parent.width - corner.width / 2, parent.height - corner.height / 2);
        corner.setName("dizhuTag");
        parent.addChild(corner);
        corner.visible = false;
    }
};

//添加打出去的牌
PokerCardNode_Doudizhu.prototype.addPutCards = function (putCards, bRoundEnd) {
    this.removeAllCards();

    var useLaizi = MjClient.majiang && MjClient.majiang.haveLaiziSign;

    for (var i = 0; i < putCards.length; i++) {
        var scale = MjClient.rePlayVideo == -1 ? 1.3 : 1;
        var deskCard = this.createOneCardNode(putCards[i], this.OUT, scale);
        this.node.addChild(deskCard);
        
        if (useLaizi && MjClient.majiang.haveLaiziSign(putCards[i])) {
            var signLaizi = new cc.Sprite("playing/paodekuaiTable_new/sign_laizi.png");
            signLaizi.setName("signLaizi");
            signLaizi.setAnchorPoint(0, 0);
            signLaizi.setPosition(0, 0);
            deskCard.addChild(signLaizi);
        }
    }
    var isZhuang = this.isZhuangByOff();
    this.cardLayoutRestore(putCards, isZhuang, true, bRoundEnd); // 返回摆放手牌
};

PokerCardNode_Doudizhu.prototype.isZhuangByOff = function () {
    var pl = getUIPlayer(this.off);
    var tData = MjClient.data.sData.tData;
    var isZhuang = pl != null && tData.uids[tData.zhuang] == pl.info.uid;
    return isZhuang;
}

PokerCardNode_Doudizhu.prototype.countCards = function () {
    var cnt = 0;
    var children = this.node.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].name == this.NOR_HAND_NAME) {
            cnt += 1;
        }
    }
    return cnt;
}

PokerCardNode_Doudizhu.prototype.getMiddleCardsPos = function () {
    var children = this.node.children;
    var x1 = 0, x2 = 0, y1 = 0;
    for (var i = 0; i < children.length; i++) {
        if (children[i].name != "out")
            continue;
        if (y1 == 0) {
            y1 = children[i].y;
        }
        if (children[i].x < x1 || x1 == 0)
            x1 = children[i].x;
        if (children[i].x > x2 || x2 == 0)
            x2 = children[i].x;
    }
    var pos = cc.p((x1 + x2) / 2, y1);
    return pos;
}
PokerCardNode_Doudizhu.prototype.postCardAni = function () {
    // 先设置自己发牌的动画
    var children = this.node.children;
    // 对牌进行x的位置关系进行排序
    children.sort(function(n1, n2) {
        if (n1.x > n2.x) return -1;
        else return 1;
    });
    // 剔除不是牌的child
    children = children.filter(function(node) {
        return node.name == "pkhand";
    });
    // 发牌初始的位置
    var initPos = cc.p(cc.director.getWinSize().width * 0.5, cc.director.getWinSize().height * 0.5 + 100);
    // 执行一系列的动作
    for(var i = 0; i < children.length; i++)
    {
        var card = children[i];
        var nowPosX = card.getPositionX();
        card.setPosition(initPos);
        card.setOpacity(0);
        var dt = cc.delayTime(i * 0.03);
        var sp = cc.spawn(
            cc.moveTo(0.25, cc.p(nowPosX, this.standPosY)),
            cc.fadeIn(0.25)
        )
        if (children.length - 1 == i) {
            card.runAction(cc.sequence(
                dt,sp,
                cc.callFunc(function () {
                    postEvent("PostCardsEnded");
                })
            ));
        } else {
            card.runAction(cc.sequence(dt,sp));
        }
    }
}
PokerCardNode_Doudizhu.prototype.getOff = function () {
    return this.off;
}
