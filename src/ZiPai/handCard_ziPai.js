// 字牌玩法 手牌刷新相关

/**
 * 刷新手牌时监测手牌数据异常
 * @param off 方位信息
 */
playLayer_ziPai.prototype.checkHandCard = function(off) {
    if (off != 0 || MjClient.rePlayVideo != -1) {
        return;
    }
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return;
    }
    var cardHandArr = [];
    if (MjClient.HandCardArr) {
        for (var i = 0; i < MjClient.HandCardArr.length; i++) {
            for (var j = 0; j < MjClient.HandCardArr[i].length; j++) {
                cardHandArr.push(MjClient.HandCardArr[i][j]);
            }
        }
    }
    var cardHand = [];
    if (pl.mjhand) {
        cardHand = pl.mjhand.slice();
    }
    if (cardHandArr.length > cardHand.length) {
        cardHandArr.sort(function(a, b) {
            return a - b;
        });
        cardHand.sort(function(a, b) {
            return a - b;
        });
        var tData = MjClient.data.sData.tData;
        MjClient.gamenet.request("pkroom.handler.tableMsg", {
            cmd: "recordErrorCard",
            cardHandArr: MjClient.HandCardArr,
            cardHand: cardHand,
            tableid: tData.tableid,
            roundNum: tData.roundNum,
            cardNext: tData.cardNext,
            lastPutCard: tData.lastPutCard,
            tState: tData.tState,
            curPlayer: tData.curPlayer
        });

        for (var i = 0; i < cardHandArr.length; i++) {
            if (cardHandArr[i] != cardHand[i]) {
                this.removeHandCard(cardHandArr[i], off);
                cardHandArr.splice(i, 1);
                i--;
            }
        }
    }
};

/**
 * 打牌兼容处理
 * @param off
 */
playLayer_ziPai.prototype.checkHandCardByPut = function(off) {
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
                    MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], 1);
                }
                return true;
            }
        }
    }else{
        if (MjClient.majiang.sortCard) {
            MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], 1);
        }
        return true;
    }
    return false;
};

/**
 * 获取空列id
 * @param cardArray
 * @returns {Array}
 */
playLayer_ziPai.prototype.getEmptyIndex = function(cardArray) {
    var empty = [];
    for (var i = 0; i < cardArray.length; i++) {
        if (cardArray[i].length == 0) {
            empty.push(i);
        }
    }
    return empty;
}

playLayer_ziPai.prototype.isZiPaiCard = function (card) {
    return ((card >= 1 && card <= 10) || (card >= 21 && card <= 30) || card == 91);
};
/**
 * 刷新手牌前处理数据
 * @param off 位置偏移
 */
playLayer_ziPai.prototype.handleHandCardBeforeRefresh = function(off) {
    var uiNode = this.getUINode(off);
    //根据牌的类型获得需要添加的节点
    var layout_handCards = uiNode.getChildByName("layout_handCards");


    //root列节点 card 牌节点
    layout_handCards.cardRoot = [];
    layout_handCards.cardList = [];

    //获取所有的牌节点
    var children1 = layout_handCards.getChildren();
    //cc.log("chow children1", JSON.stringify(children1, null, "  ") + "");
    if (children1) {
        for (var i = 0; i < children1.length; i++) {
            var children2 = children1[i].getChildren();
            //cc.log("chow children2", JSON.stringify(children2, null, "  ") + "");
            if (children2) {
                for (var j = 0; j < children2.length; j++) {
                    if (children2[j]) {
                        layout_handCards.cardList.push(children2[j]);
                    }
                }
            }
        }
    }
    //去除非卡牌节点,例如胡息显示
    function clearNotNumber(cardList) {
        if (cardList) {
            for (var i = cardList.length - 1; i >= 0; i--) {
                if (!this.isZiPaiCard(cardList[i].tag)) {
                    var node = cardList.splice(i, 1);
                    node[0].removeFromParent();
                }
            }
        }
    }
    clearNotNumber.call(this, layout_handCards.cardList);
    if (layout_handCards.cardList.length == 0) {
        return;
    }
    //按列从下而上排序 与上一次数据一一对应起来
    layout_handCards.cardList.sort(function(a, b) {
            if (a.parent.tag < b.parent.tag) {
                return -1;
            } else if (a.parent.tag == b.parent.tag) {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name == b.name) {
                    return 0;
                } else {
                    return 1;
                }
            } else {
                return 1;
            }
        })
        /*for(var k = 0; k < layout_handCards.cardList.length; k++){
         cc.log("chow", "cleanCardNode cardList: k = " + k + " tag = " + layout_handCards.cardList[k].tag + " name = " + layout_handCards.cardList[k].name + " parentTag =" + layout_handCards.cardList[k].parent.tag);
         }*/
        //查找当前移动的牌 并更新移动位置
    if (MjClient.moveCard) {
        cc.log("chow", "cleanCardNode" + " moveCard curCIndex = " + MjClient.moveCard.curCIndex + " curRIndex = " + MjClient.moveCard.curRIndex + " nexCIndex = " + MjClient.moveCard.nexCIndex + " nexRIndex = " + MjClient.moveCard.nexRIndex);

        var oldIndex = layout_handCards.cardList.length;
        //var moveCard;
        //查找当前移动牌
        for (var i = 0; i < layout_handCards.cardList.length; i++) {
            if (layout_handCards.cardList[i].parent.tag == MjClient.moveCard.curCIndex && layout_handCards.cardList[i].name == MjClient.moveCard.curRIndex) {
                //cc.log("chow", "cleanCardNode" + " layout_handCards i = " + i + " tag = " + layout_handCards.cardList[i].parent.tag + " name = " + layout_handCards.cardList[i].name);
                oldIndex = i;
                //moveCard = layout_handCards.cardList.splice(i, 1);
                break;
            }
        }
        if (oldIndex != layout_handCards.cardList.length) {
            //转化成当前坐标
            //moveCard[0].setPosition(moveCard[0].parent.convertToNodeSpace(MjClient.moveCard.curPosition));
            layout_handCards.cardList[oldIndex].setPosition(layout_handCards.cardList[oldIndex].parent.convertToNodeSpace(MjClient.moveCard.curPosition));

            if (MjClient.moveCard.curCIndex != MjClient.moveCard.nexCIndex || MjClient.moveCard.curRIndex != MjClient.moveCard.nexRIndex) {
                var moveCard = layout_handCards.cardList.splice(oldIndex, 1);
                //cc.log("chow", "cleanCardNode" + " moveCard tag = " + moveCard[0].tag + " name = " + moveCard[0].name);
                var newIndex = layout_handCards.cardList.length;
                //查到当前移动牌移动的目标位置
                for (var i = 0; i < layout_handCards.cardList.length; i++) {
                    //cc.log("chow", "cleanCardNode" + " layout_handCards.cardList tag = " + layout_handCards.cardList[i].parent.tag + " name = " + layout_handCards.cardList[i].name);
                    if (layout_handCards.cardList[i].parent.tag == MjClient.moveCard.nexCIndex && layout_handCards.cardList[i].name >= MjClient.moveCard.nexRIndex || layout_handCards.cardList[i].parent.tag > MjClient.moveCard.nexCIndex) {
                        newIndex = i;
                        break;
                    }
                }
                cc.log("chow", "cleanCardNode" + " newIndex = " + newIndex);
                if (newIndex == layout_handCards.cardList.length) {
                    layout_handCards.cardList.push(moveCard[0]);
                } else {
                    layout_handCards.cardList.splice(newIndex, 0, moveCard[0]);
                }
            }
            // else {
            //     //00位置移动到00位置
            //     layout_handCards.cardList.unshift(moveCard[0]);
            // }
        }
    }
    //将按数据排序好的牌复用 后续直接取
    // cc.log("chow cleanCardNode cardList.length = ", layout_handCards.cardList.length + "");
    /*for(var k = 0; k < layout_handCards.cardList.length; k++){
     cc.log("chow", "cleanCardNode cardList: k = " + k + " tag = " + layout_handCards.cardList[k].tag + " name = " + layout_handCards.cardList[k].name + " parentTag =" + layout_handCards.cardList[k].parent.tag);
     }*/
    //cc.log("chow", JSON.stringify(layout_handCards.cardList, null, "  ") + "");
    for (var k = 0; k < layout_handCards.cardList.length; k++) {
        layout_handCards.cardList[k].lastPosition = layout_handCards.cardList[k].parent.convertToWorldSpace(layout_handCards.cardList[k].getPosition());
        layout_handCards.cardList[k].isSelect = false;
        layout_handCards.cardList[k].retain();
        layout_handCards.cardList[k].removeFromParent(false);
        // cc.log("chow", "cleanCardNode cardList: k = " + k + " tag = " + layout_handCards.cardList[k].tag + " pos = " + JSON.stringify(layout_handCards.cardList[k].lastPosition), null, "  ");
    }

    //获取所有的列节点 按照数据顺序0-X
    for (var i = 0; i < layout_handCards.childrenCount; i++) {
        layout_handCards.cardRoot.push(layout_handCards.getChildByTag(i));
    }
    if (layout_handCards.cardRoot.length == 0) {
        return;
    }
    //复用列节点 ,后续直接查找使用
    // cc.log("chow cleanCardNode cardRoot.length = ", layout_handCards.cardRoot.length + "");
    for (var k = 0; k < layout_handCards.cardRoot.length; k++) {
        //cc.log("chow", "cleanCardNode cardRoot: k = " + k + " : " + layout_handCards.cardRoot[k].tag);
        layout_handCards.cardRoot[k].retain();
        layout_handCards.cardRoot[k].removeFromParent(false);

        //layout_handCards.cardRoot[k].lastPosition = layout_handCards.cardRoot[k].getPosition();
        //cc.log("chow", JSON.stringify(layout_handCards.cardRoot[k].lastPosition), null, "  ");
    }
    //查找数据中被删除的列索引
    // cc.log("chow", "cleanCardNode : MjClient.HandCardArr = "  + JSON.stringify(MjClient.HandCardArr));
    var empty = this.getEmptyIndex(MjClient.HandCardArr);
    for (var i = 0; i < empty.length; i++) {
        // cc.log("chow", "cleanCardNode empty[" + i + "] = " + empty[i]);
    }

    //区分左右新建列和无变化
    // cc.log("chow", "cleanCardNode addGroupIndex:" + MjClient.addGroupIndex);
    if (MjClient.addGroupIndex == 0) {
        //最左边新建
        if (empty.length == 0) {
            //新增列，新增一个列结点插入最前面
            var cardParent = new cc.Node();
            cardParent.width = layout_handCards.cardList[0].width;
            cardParent.retain();
            cardParent.setPosition(cc.p(layout_handCards.cardRoot[0].x - layout_handCards.cardRoot[0].width / 2, layout_handCards.cardRoot[0].y));

            layout_handCards.cardRoot.unshift(cardParent);
        } else {
            //只有当列数大于1时才取出设置 否则不用移动
            if (layout_handCards.cardRoot.length > 1) {
                //移动列，取出移动列插入到最前面
                var cardParent = layout_handCards.cardRoot.splice(empty[0] - 1, 1); //这里需要减去前面新增的一个位置
                cardParent[0].setPosition(cc.p(layout_handCards.cardRoot[0].x - layout_handCards.cardRoot[0].width / 2, layout_handCards.cardRoot[0].y));
                layout_handCards.cardRoot.unshift(cardParent[0]);
            }
        }
    } else if (MjClient.addGroupIndex == MjClient.HandCardArr.length - 1) {
        //最右边新建
        if (empty.length == 0) {
            //新增列，新增一个列结点插入最后面
            var cardParent = new cc.Node();
            cardParent.width = layout_handCards.cardList[0].width;
            cardParent.retain();
            cardParent.setPosition(cc.p(layout_handCards.cardRoot[layout_handCards.cardRoot.length - 1].x + layout_handCards.cardRoot[layout_handCards.cardRoot.length - 1].width / 2, layout_handCards.cardRoot[layout_handCards.cardRoot.length - 1].y));

            layout_handCards.cardRoot.push(cardParent);
        } else {
            //只有当列数大于1时才取出设置 否则不用移动
            if (layout_handCards.cardRoot.length > 1) {
                //移动列，取出移动列插入到最后面
                var cardParent = layout_handCards.cardRoot.splice(empty[0], 1);
                cardParent[0].setPosition(cc.p(layout_handCards.cardRoot[layout_handCards.cardRoot.length - 1].x + layout_handCards.cardRoot[layout_handCards.cardRoot.length - 1].width / 2, layout_handCards.cardRoot[layout_handCards.cardRoot.length - 1].y));
                layout_handCards.cardRoot.push(cardParent[0]);
            }
        }
    } else {
        //删除无数据列
        for (var i = empty.length - 1; i >= 0; i--) {
            var cardParent = layout_handCards.cardRoot.splice(empty[i], 1);
            if (layout_handCards.cardRoot.length > 0) {
                cardParent[0].setPosition(cc.p(layout_handCards.cardRoot[layout_handCards.cardRoot.length - 1].x + layout_handCards.cardRoot[layout_handCards.cardRoot.length - 1].width / 2, layout_handCards.cardRoot[layout_handCards.cardRoot.length - 1].y));
            }
            layout_handCards.cardRoot.push(cardParent[0]);
        }
        //刷新时导致列数不够需要先补齐列数
        if (layout_handCards.cardRoot.length > 0) {
            var addRootCount = MjClient.HandCardArr.length - layout_handCards.cardRoot.length;
            // cc.log("chow", "cleanCardNode" + " addRootCount = " + addRootCount);
            for (var i = 0; i < addRootCount; i++) {
                var cardParent = new cc.Node();
                cardParent.width = layout_handCards.cardList[0].width;
                cardParent.retain();
                cardParent.setPosition(cc.p(layout_handCards.cardRoot[layout_handCards.cardRoot.length - 1].x + layout_handCards.cardRoot[layout_handCards.cardRoot.length - 1].width / 2, layout_handCards.cardRoot[layout_handCards.cardRoot.length - 1].y));

                layout_handCards.cardRoot.push(cardParent);
            }
        }
    }
    //排好顺序的列节点，重置顺序Id
    for (var k = 0; k < layout_handCards.cardRoot.length; k++) {
        layout_handCards.cardRoot[k].tag = k;
        layout_handCards.cardRoot[k].lastPosition = layout_handCards.cardRoot[k].getPosition();
        // cc.log("chow", JSON.stringify(layout_handCards.cardRoot[k].lastPosition), null, "  ");
    }
};

/**
 * 获取数据中的节点
 * @param cardList
 * @param cardNum
 * @returns {*}
 */
playLayer_ziPai.prototype.getCardNodeFromList = function(cardList, cardNum) {
    for (var i = 0; i < cardList.length; i++) {
        //防止拖动卡牌时点击刷新或者吃碰导致优先使用了克隆的结点,所以取非透明度结点
        if (cardList[i].tag == cardNum && cardList[i].isSelect == false && cardList[i].opacity == 255) {
            cardList[i].isSelect = true;
            //cc.log("chow", "getCardNode : " + i);
            return cardList[i];
        }
    }
    return null;
};

/**
 * 获取列节点
 * @param cardRoot
 * @param col
 * @returns {*}
 */
playLayer_ziPai.prototype.getCardRoot = function(cardRoot, col) {
    for (var i = 0; i < cardRoot.length; i++) {
        if (cardRoot[i].tag == col) {
            //cc.log("chow", "getCardRoot : " + i);
            return cardRoot[i];
        }
    }
    return null;
};

/**
 * 是否显示长牌(点击手牌)
 * @returns {boolean}
 */
playLayer_ziPai.prototype.isShowLongCard = function() {
    return false;
};

playLayer_ziPai.prototype.isShowCloneCard = function (){ // 点击牌是否添加残影
    return false;
}

/**
 * 手牌动作
 * @param node 节点
 * @param targetPos 目标位置
 */
playLayer_ziPai.prototype.doMoveToAction = function(node, targetPos) {
    node.stopAllActions();
    var action = cc.moveTo(0.15, targetPos);
    node.runAction(action);
};

//获取听的牌
playLayer_ziPai.prototype.getTingCards = function(sData, pl, putCard) {
    if(!this.isNeedShowTing()) return [];
    return MjClient.majiang.getTingCards(sData, pl, putCard);
};

/**
 * 听牌显示
 * @param putCard
 */
playLayer_ziPai.prototype.checkTingCards = function(putCard) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if (tData.tState == TableState.waitPut && this.isCurPlayer(0) && putCard === undefined) {
        postEvent("showTingLayer", []);
        return;
    }
    if (putCard && (!this.isCurPlayer(0) || tData.tState != TableState.waitPut)) {
        putCard = undefined;
    }
    var pl = sData.players[SelfUid()];
    var cards = [];
    if (pl.mjhand) {
        cards = this.getTingCards(sData, pl, putCard);
    }
    postEvent("showTingLayer", cards);
};

/**
 * 新听牌显示
 * @param putCard
 */
playLayer_ziPai.prototype.checkTingCardsNew = function(putCard) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    if (tData.tState != TableState.waitPut) {
        return;
    }

    if (tData.tState == TableState.waitPut && this.isCurPlayer(0) && putCard === undefined) {
        postEvent("showTingLayer", []);
        postEvent("showNewTingLayer", []);
        return;
    }

    if (putCard && (!this.isCurPlayer(0) || tData.tState != TableState.waitPut)) {
        putCard = undefined;
    }

    if (!this.isCurPlayer(0))
        return;

    var pl = sData.players[SelfUid()];
    var textData = MjClient.majiang.getTingStats(sData, pl, putCard);
    postEvent("showNewTingLayer", textData);
}

playLayer_ziPai.prototype.isCheckTingStats = function() {
    return false;
}

playLayer_ziPai.prototype.getTingStats = function(putCard) {
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];
    return MjClient.huzi.getTingStats(sData, pl, putCard);
}

playLayer_ziPai.prototype.checkTingStats = function(putCard) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = sData.players[SelfUid()];
    if(!pl.mjhand){
        postEvent("showTingStats", {});
        return;
    }
    if (tData.tState == TableState.waitPut && this.isCurPlayer(0) && putCard === undefined) {
        postEvent("showTingStats", {});
        return;
    }
    if (putCard && (!this.isCurPlayer(0) || tData.tState != TableState.waitPut)) {
        putCard = undefined;
    }
    postEvent("showTingStats", this.getTingStats(putCard));
}

/**
 * 坎判断
 * @param arr
 * @returns {boolean}
 */
playLayer_ziPai.prototype.isKan = function(arr) {
    if (arr) {
        var len = arr.length;
        if (len < 3) {
            return false;
        }

        var count = 1;
        var temTag = arr[0];
        for (var i = 1; i < len; i++) {
            var tag = arr[i];
            if (tag == temTag) {
                count += 1;
            }
        }
        if (count >= 3) {
            return true;
        }
    }
    return false;
};

/**
 * 数据插入
 * @param arr
 * @param cardNum
 * @param card
 * @param isDiffColumn  是否不同列
 */
playLayer_ziPai.prototype.fixArrIndex = function(arr, cardNum, card, isDiffColumn) {
    if (arr) {
        if (this.isKan(arr)) {
            arr.push(cardNum);
            MjClient.moveCard.nexRIndex = 3;
        } else {
            var off_y = card.height / 4 * card.scaleY;
            var maxH = card.height * card.scaleY * 3 - off_y * 2;

            if(isDiffColumn && this.isHandMoveToTopDiffColumn()){
                arr.push(cardNum);
                MjClient.moveCard.nexRIndex = arr.length - 1;
                return;
            }

            if (card.y > maxH) {
                arr.push(cardNum);
                MjClient.moveCard.nexRIndex = 3;
            } else if (card.y > card.height * card.scaleY * 2 - off_y) {
                arr.splice(2, 0, cardNum);
                MjClient.moveCard.nexRIndex = 2;
            } else if (card.y > card.height * card.scaleY) {
                arr.splice(1, 0, cardNum);
                MjClient.moveCard.nexRIndex = 1;
            } else {
                arr.splice(0, 0, cardNum);
                MjClient.moveCard.nexRIndex = 0;
            }
        }
    }
};

/**
 * 坎/龙是否不可操作
 * @returns {boolean}
 */
playLayer_ziPai.prototype.is34Mask = function() {
    return true;
};

/**
 * 坎/龙是否置灰
 * @returns {boolean}
 */
playLayer_ziPai.prototype.is34ColorGrey = function() {
    return true;
};

/**
 * 判断牌是否可以打出
 * @param pl
 * @param card
 * @returns {boolean}
 */
playLayer_ziPai.prototype.checkCardCanPut = function(pl, card) {
    return true;
};

/**
 * 特命状态下出牌条件
 * @param pl
 * @param card
 * @returns {boolean}
 */
playLayer_ziPai.prototype.checkPutSpecil = function () {
    return false;
};

/**
 * 手牌交换时，不同列交换是否移动到顶部
 */
playLayer_ziPai.prototype.isHandMoveToTopDiffColumn = function () {
    return false;
};

/**
 * 添加手牌监听
 * @param card 手牌节点
 * @param off 位置偏移
 * @constructor
 */
playLayer_ziPai.prototype.setCardTouchHandler = function(card, off) {
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
            btn.zIndex = 5;
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
            } else { // 移动手牌
                // cc.log("pos.x@@ ", pos.x, " btn.parent.x@@ ", btn.parent.x);
                var dstCol = col + Math.round((pos.x - btn.parent.x) / (btn.parent.width * btn.scaleX) - 0.5); // 目的列
                // cc.log("dstCol@@ ", dstCol);
                if (dstCol == col) { // 列未变
                    MjClient.HandCardArr[col].splice(parseInt(row), 1);
                    MjClient.playui.fixArrIndex(MjClient.HandCardArr[dstCol], card, btn, false);
                } else if (dstCol >= 0 && dstCol < MjClient.HandCardArr.length) { // 当前有手牌列
                    if (MjClient.HandCardArr[dstCol].length < 4) { // 插牌
                        MjClient.moveCard.nexCIndex = dstCol;
                        MjClient.HandCardArr[col].splice(row, 1);
                        MjClient.playui.fixArrIndex(MjClient.HandCardArr[dstCol], card, btn, true);
                    }
                } else if (MjClient.HandCardArr.length < MjClient.playui.getMaxColumnCount()) { // 最前或最后 新增一列
                    MjClient.HandCardArr[col].splice(parseInt(row), 1);
                    if (dstCol < 0) {
                        MjClient.HandCardArr.unshift([card]);
                        MjClient.addGroupIndex = 0;
                    } else if (dstCol >= MjClient.HandCardArr.length) {
                        MjClient.HandCardArr.push([card]);
                        MjClient.addGroupIndex = MjClient.HandCardArr.length - 1;
                    }

                    MjClient.moveCard.nexCIndex = MjClient.addGroupIndex;
                    MjClient.moveCard.nexRIndex = 0;
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

playLayer_ziPai.prototype.doPut = function(card, btn, col, row) {
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

    // tood 背光

    btn.removeFromParent(true);
    if (!Array.isArray(MjClient.HandCardArr[col]) || MjClient.HandCardArr[col][row] != card) {
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

    MjClient.hasPut = true;
    MjClient.HandCardArr[col].splice(row, 1);
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPut",
        card: card
    });
    MjClient.playui.checkCutLineVisible();
}

//获取手牌一列的行距差
playLayer_ziPai.prototype.getOffYByCard = function(card){
    return card.height * card.scaleY - card.height / 4 * card.scaleY;
}

/**
 * 获取手牌最大列数
 * @param card
 * @returns {number}
 */
playLayer_ziPai.prototype.getMaxColumnCount = function(card){
    return 10;
}

playLayer_ziPai.prototype.checkCanNotPutCardMask = function(){
    return true;
}

/**
 * 添加手牌
 * @param col 列
 * @param row 行
 * @param cardNum 牌
 * @param off 位置偏移
 */
playLayer_ziPai.prototype.addOneHandCard = function(col, row, cardNum, off) {
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
    newCard.zIndex = 4 - row;
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

/**
 * 添加回放手牌
 * @param col
 * @param row
 * @param cardNum
 * @param off
 */
playLayer_ziPai.prototype.addHandCardReplay = function(col, row, cardNum, off) {
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
            cardParent.x = parentCount * newCard.width;
            cardParent.y = 0;
        } else if (uiNode.getName() == "node_right") {
            cardParent.x = layout_replayCards.width - parentCount * newCard.width;
            cardParent.y = 0;
        } else if (uiNode.getName() == "node_left") {
            cardParent.x = parentCount * newCard.width;
            cardParent.y = 0;
        } else if (uiNode.getName() == "node_xing") {
            cardParent.x = layout_replayCards.width - parentCount * newCard.width;
            cardParent.y = 0;
        }
        layout_replayCards.addChild(cardParent);
    }
    var off_y = 0;
    if (uiNode.getName() == "node_down" || uiNode.getName() == "node_left") {
        off_y = newCard.height;
        newCard.anchorX = 0;
        newCard.anchorY = 0;
    } else if (uiNode.getName() == "node_right" || uiNode.getName() == "node_xing") {
        off_y = newCard.height;
        newCard.anchorX = 1;
        newCard.anchorY = 0;
    }
    var cardCount = cardParent.childrenCount;
    newCard.zIndex = 4 - cardCount;
    newCard.x = 0;
    newCard.y = cardCount * off_y;

    cardParent.addChild(newCard);
}

/**
 * 释放手牌节点数据
 * @param off
 */
playLayer_ziPai.prototype.releaseHandCardNode = function(off) {
    var uiNode = this.getUINode(off);
    //根据牌的类型获得需要添加的节点
    var layout_handCards = uiNode.getChildByName("layout_handCards");
    // cc.log("chow resetCardNode cardList.length", addNode.cardList.length + "");
    for (var i = 0; i < layout_handCards.cardList.length; i++) {
        layout_handCards.cardList[i].release();
    };

    // cc.log("chow resetCardNode cardRoot.length", addNode.cardRoot.length + "");
    for (var i = 0; i < layout_handCards.cardRoot.length; i++) {
        layout_handCards.cardRoot[i].release();
    }
};


/**
 * 计算听牌提示
 */
playLayer_ziPai.prototype.calculateHintPutList = function() {
    if(this.isNeedShowTing())
        MjClient.hintPutList_ziPai = MjClient.majiang.hintPutCardsToTing();
};

/**
 * 显示隐藏听牌角标
 * @param card
 * @param isShow
 */
playLayer_ziPai.prototype.showCardTingSign = function(card, isShow) {
    if (isShow) {
        var tingSign = card.getChildByName("tingSign");
        if (!tingSign) {
            tingSign = new ccui.ImageView("playing/paohuzi/ting.png");
            tingSign.setName("tingSign");
            card.addChild(tingSign)
        }
        tingSign.visible = true;
        tingSign.setPosition(0, card.getContentSize().height);
        tingSign.setAnchorPoint(0, 1);
    } else {
        card.removeChildByName("tingSign");
    }
};

/**
 * 添加听牌标志
 * @param off 位置偏移
 */
playLayer_ziPai.prototype.addTingSign = function() {
    if(!this.isNeedShowTing()) return;
    var layout_handCards = this.getUINode(0).getChildByName("layout_handCards");
    var hintPutList = MjClient.hintPutList_ziPai;
    if (this.getTingPaiType() == 0 && hintPutList.length > 0) {
        var colParentArr = layout_handCards.getChildren();
        for (var i = 0; i < colParentArr.length; i++) {
            var colParent = colParentArr[i].getChildren();
            for (var j = 0; j < colParent.length; j++) {
                var card = colParent[j];
                if (hintPutList.indexOf(card.tag) >= 0) {
                    this.showCardTingSign(card, true);
                } else {
                    this.showCardTingSign(card, false);
                }
            }
        }
    }
};

//移除听牌标识
playLayer_ziPai.prototype.removeTingSign = function() {
    var layout_handCards = this.getUINode(0).getChildByName("layout_handCards");
    var children = layout_handCards.getChildren();
    for (var i = 0; i < children.length; i++) {
        var addNode = children[i];
        for (var j = 0; j < addNode.getChildren().length; j++) {
            var card = addNode.getChildren()[j];
            this.showCardTingSign(card, false);
        }
    }
}


/**
 * 添加手牌
 * @param col
 * @param row
 * @param cardNum
 * @param off
 */
playLayer_ziPai.prototype.addHandCard = function(col, row, cardNum, off) {
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
    var off_y = newCard.height * scale_y - newCard.height / 4 * scale_y;

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

/**
 * 刷新手牌显示
 * @param off
 */
playLayer_ziPai.prototype.refreshHandCard = function(off, isRefresh) {
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
            //清理空数组
            for (var k = cardArr.length - 1; k >= 0; k--) {
                if (cardArr[k].length == 0) {
                    cardArr.splice(k, 1);
                }
            }
            for (var k = 0; k < cardArr.length; k++) {
                var groupList = cardArr[k];
                for (var j = 0; j < groupList.length; j++) {
                    this.addOneHandCard(k, j, groupList[j], off);
                }
            }
            this.releaseHandCardNode(off);

            this.addTingSign(); // 添加听牌角标
            var handCard = uiNode.getChildByName("img_handCard");
            var width = this.getHandCardSize().width;
            var scale_x = handCard.scaleX;
            var winSize = MjClient.size;
            var totalWidth = width * cardArr.length * scale_x;
            for (var i = 0; i < cardArr.length; i++) {
                var addNode = layout_handCards.getChildByTag(i);
                this.showHandHuXi(addNode);

                if (addNode.lastPosition) {
                    addNode.setPosition(addNode.lastPosition);
                    this.doMoveToAction(addNode, cc.p((winSize.width - totalWidth) / 2 + i * width * scale_x, 0));
                } else {
                    addNode.setPosition(cc.p((winSize.width - totalWidth) / 2 + i * width * scale_x, 0));
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
            if (this.getPlayersNum() == 4) {
                handNode = uiNode.getChildByName("layout_replayCards");
                handCard = uiNode.getChildByName("img_out");
            } else {
                handNode = uiNode.getChildByName("layout_handCards");
                handCard = uiNode.getChildByName("img_handCard");
            }
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
        for (var k = cardArr.length - 1; k >= 0; k--) {
            if (cardArr[k].length == 0) {
                cardArr.splice(k, 1);
            }
        }
        for (var k = 0; k < cardArr.length; k++) {
            var groupList = cardArr[k];
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

        if (off == 0 && this.getPlayersNum() != 4) {
            var scale_x = handCard.scaleX;
            var winSize = MjClient.size;
            var totalWidth = this.getHandCardSize().width * cardArr.length * scale_x;
            for (var i = 0; i < cardArr.length; i++) {
                var addNode = handNode.getChildByTag(i);
                addNode.setPosition(cc.p((winSize.width - totalWidth) / 2 + i * handCard.width * scale_x, 0));
            }
        }
        postEvent("LY_addHandHuXi");
        cc.log("================off:" + off + "----------" + JSON.stringify(cardArr));
    }
};

/**
 * 是否需要听听牌提示
 * @returns {boolean}
 */
playLayer_ziPai.prototype.hasTingByPut = function() {
    return false;
};

/**
 * 获取手牌尺寸
 */
playLayer_ziPai.prototype.getHandCardSize = function() 
{
    var uiNode = this.getUINode(0);
    var handCard = uiNode.getChildByName("img_handCard");
    return handCard.getVirtualRendererSize();
}
