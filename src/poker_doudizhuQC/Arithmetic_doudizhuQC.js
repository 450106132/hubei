//斗地主算法类
(function () {
    function DoudizhuQC() {
        this.handCount = 17;
        this.laiziPoint = -10;  // 默认无癞子
    }

    var LAI_ZI_SIGN = 100;
    var ZHUPAI = 2;
    var XIAOWANG = 53;
    var DAWANG = 54;
    var MINPOINT = 3;
    var KPOINT = 13;
    var APOINT = 14;
    var ZHUPOINT = 15;
    var XIAOWANGPOINT = 16;
    var DAWANGPOINT = 17;
    var CARDTPYE = {
        huojian: 105,
        zhadan: 104,
        big: 100, // 大牌分界线
        sidaier: 11,
        feiji2: 10,
        feiji: 9,
        sanshun: 8,
        liandui: 7,
        shunzi: 6,
        sandaier: 5,
        sandaiyi: 4,
        sanzhang: 3,
        duizi: 2,
        danpai: 1,
    };
    DoudizhuQC.prototype.CARDTPYE = CARDTPYE;
    var CARDCOUNT = {};
    CARDCOUNT[CARDTPYE.huojian] = 2;
    CARDCOUNT[CARDTPYE.zhadan] = 4;
    CARDCOUNT[CARDTPYE.sidaier] = 6;
    CARDCOUNT[CARDTPYE.feiji2] = 10;
    CARDCOUNT[CARDTPYE.feiji] = 8;
    CARDCOUNT[CARDTPYE.sanshun] = 6;
    CARDCOUNT[CARDTPYE.liandui] = 6;
    CARDCOUNT[CARDTPYE.shunzi] = 5;
    CARDCOUNT[CARDTPYE.sandaier] = 5;
    CARDCOUNT[CARDTPYE.sandaiyi] = 4;
    CARDCOUNT[CARDTPYE.sanzhang] = 3;
    CARDCOUNT[CARDTPYE.duizi] = 2;
    CARDCOUNT[CARDTPYE.danpai] = 1;

    // 随机牌
    // 扑克牌1——54分别为：方片A、梅花A、红心A、黑桃A、方片2……黑桃K、小王、大王
    DoudizhuQC.prototype.randomCards = function () {
        var cards = [];
        for (var i = 1; i <= DAWANG; i++) {
            cards.push(i);
        }
        cards.sort(function (a, b) {
            return .5 - Math.random();
        });
        return cards;
    };

    DoudizhuQC.prototype.calPoint = function(num) {
        if (!num) {
            return -1;
        }
        num = this.removeLaiziSign(num);
        var ceilNum = Math.ceil(num / 4);
        if (ceilNum == 1) {
            return APOINT; // A记为14
        }
        if (ceilNum == ZHUPAI) {
            return ZHUPOINT; // 主牌记为15
        }
        if (ceilNum > KPOINT) {
            return num; // 大小王原数字返回53、54
        }
        return ceilNum;
    };

    DoudizhuQC.prototype.isShun = function (oCards) { //oCards有序
        if (!oCards) {
            return false;
        }
        var cardCount = oCards.length;
        if (cardCount < CARDCOUNT[CARDTPYE.shunzi] || this.calPoint(oCards[oCards.length - 1]) >= ZHUPOINT) {
            return false; // 小于5张、有大小王或2不会是顺子
        }
        var cards = [];
        for (var i = 0; i < oCards.length; i++) {
            cards.push(this.calPoint(oCards[i])); // 只考虑点数
            if (i > 0 && cards[i - 1] != cards[i] - 1) {
                return false;
            }
        }
        return true;
    };

    DoudizhuQC.prototype.isLiandui = function (oCards) { //oCards有序
        if (!oCards) {
            return false;
        }
        var cardCount = oCards.length;
        if (cardCount < CARDCOUNT[CARDTPYE.liandui] || cardCount % 2 != 0 || this.calPoint(oCards[oCards.length - 1]) >= ZHUPOINT) {
            return false; // 非6张、有大小王或2不会是顺子
        }
        var cards = [];
        for (var i = 0; i < oCards.length; i++) {
            cards.push(this.calPoint(oCards[i])); // 只考虑点数
            if (i == 0) continue;
            if (i % 2 == 1) {
                if (cards[i - 1] != cards[i]) {
                    return false;
                }
            }
            else if (cards[i - 1] != cards[i] - 1) {
                return false;
            }
        }
        return true;
    };

    DoudizhuQC.prototype.isSanshun = function (cards) { //cards有序
        if (!cards) {
            return false;
        }
        var cardCount = cards.length;
        if (cardCount < CARDCOUNT[CARDTPYE.sanshun] || cardCount % 3 != 0 || this.calPoint(cards[cards.length - 1]) >= ZHUPOINT) {
            return false; // 非6张、有大小王或2不会是顺子
        }
        var pointCounts = {};
        for (var i = 0; i < cards.length; i++) {
            increaseByKey(pointCounts, this.calPoint(cards[i]));
        }

        // 补充逻辑
        for (var point in pointCounts) {
            // 每个点数的牌的张数不等于3
            if (pointCounts[point] != 3)
                return false;
        }
        
        var numCount = Object.keys(pointCounts).length;
        return numCount == cardCount / 3 && this.calPoint(cards[0]) + numCount - 1 == this.calPoint(cards[cards.length - 1]);
    };

    DoudizhuQC.prototype.isFeiji2 = function (oCards) { //cards有序
        if (!oCards) {
            return false;
        }
        var cards = oCards.slice();
        var cardCount = cards.length;
        if (cardCount < CARDCOUNT[CARDTPYE.sanshun] || cardCount % 5 != 0) {
            return false;
        }
        var pointCounts = {};
        for (var i = 0; i < cards.length; i++) {
            increaseByKey(pointCounts, this.calPoint(cards[i]));
        }
        var sanshuns = [];
        for (var p in pointCounts) {
            if (pointCounts[p] == 3) {
                sanshuns = sanshuns.concat(this.findNSameCard(cards, Number(p), 3));
            }
            else if (pointCounts[p] % 2 != 0) {
                return false;
            }
        }
        return sanshuns.length == cardCount * 3 / 5 && this.isSanshun(sanshuns);
    };

    DoudizhuQC.prototype.isFeiji = function (oCards) { //cards有序
        if (!oCards) {
            return false;
        }
        var cards = oCards.slice();
        var cardCount = cards.length;
        if (cardCount < CARDCOUNT[CARDTPYE.sanshun] || cardCount % 4 != 0) {
            return false;
        }
        var pointCounts = {};
        for (var i = 0; i < cards.length; i++) {
            increaseByKey(pointCounts, this.calPoint(cards[i]));
        }
        var sanshuns = [];
        for (var p in pointCounts) {
            if (pointCounts[p] > 3 && !this.isLaiziPoint(Number(p)))
                return false;
            if (pointCounts[p] >= 3) {
                sanshuns = sanshuns.concat(this.findNSameCard(cards, Number(p), 3));
            }
        }
        return sanshuns.length == cardCount * 3 / 4 && this.isSanshun(sanshuns);
    };

    // 计算牌型
    DoudizhuQC.prototype.calType = function (cards) {
        var cardCount = cards.length;
        if (cardCount == CARDCOUNT[CARDTPYE.huojian] && cards[0] == XIAOWANG) {
            return CARDTPYE.huojian;
        }
        var allSame = this.calPoint(cards[0]) == this.calPoint(cards[cards.length - 1]);
        var pointCounts = {};
        for (var i = 0; i < cards.length; i++) {
            increaseByKey(pointCounts, this.calPoint(cards[i]));
        }
        var maxCount = 0; // 最多有几张点数最多的牌
        for (var p in pointCounts) {
            if (maxCount < pointCounts[p]) {
                maxCount = pointCounts[p];
            }
        }
        if (cardCount == CARDCOUNT[CARDTPYE.zhadan] && allSame) {
            return CARDTPYE.zhadan;
        }
        if (cardCount >= CARDCOUNT[CARDTPYE.shunzi] && maxCount == 1 && this.isShun(cards)) {
            return CARDTPYE.shunzi;
        }
        if (cardCount >= CARDCOUNT[CARDTPYE.liandui] && maxCount == 2 && this.isLiandui(cards)) {
            return CARDTPYE.liandui;
        }
        if (cardCount >= CARDCOUNT[CARDTPYE.sanshun] && maxCount == 3 && this.isSanshun(cards)) {
            return CARDTPYE.sanshun;
        }
        if (cardCount >= CARDCOUNT[CARDTPYE.feiji2] && maxCount >= 3 && this.isFeiji2(cards)) {
            return CARDTPYE.feiji2;
        }
        if (cardCount >= CARDCOUNT[CARDTPYE.feiji] && maxCount >= 3 && this.isFeiji(cards)) {
            return CARDTPYE.feiji;
        }
        if (cardCount == CARDCOUNT[CARDTPYE.sidaier] && maxCount == 4) {
            return CARDTPYE.sidaier;
        }
        if (cardCount == CARDCOUNT[CARDTPYE.sandaier] && maxCount == 3 && this.calPoint(cards[0]) == this.calPoint(cards[1]) && this.calPoint(cards[3]) == this.calPoint(cards[4])) {
            return CARDTPYE.sandaier;
        }
        if (cardCount == CARDCOUNT[CARDTPYE.sandaiyi] && maxCount == 3) {
            return CARDTPYE.sandaiyi;
        }
        if (cardCount == CARDCOUNT[CARDTPYE.sanzhang] && allSame) {
            return CARDTPYE.sanzhang;
        }
        if (cardCount == CARDCOUNT[CARDTPYE.duizi] && allSame) {
            return CARDTPYE.duizi;
        }
        if (cardCount == CARDCOUNT[CARDTPYE.danpai]) {
            return CARDTPYE.danpai;
        }
        return -1;
    };

    // 计算牌型点数，一般为较大那张牌，特殊牌型特殊处理
    DoudizhuQC.prototype.calCardsValue = function (cards, type) {
        if (!cards || cards.length == 0) {
            return -1;
        }
        if (cards.length == 0) {
            logger.error("牌型错误", cards, type);
            return -1;
        }
        if (!type) {
            type = this.calType(cards);
        }
        var valueCard = cards[cards.length - 1];
        if (type == CARDTPYE.sandaier) {
            return this.calPoint(cards[2]);
        }
        if (type == CARDTPYE.sandaiyi) {
            return this.calPoint(cards[1]);
        }
        if (type == CARDTPYE.sidaier) {
            return this.calPoint(cards[3]);
        }
        if (type == CARDTPYE.feiji2) {
            for (var i = cards.length - 1; i >= 2; i--) {
                var p = this.calPoint(cards[i]);
                if (p == this.calPoint(cards[i - 3])) {
                    i -= 3;
                }
                else if (p == this.calPoint(cards[i - 2])) {
                    return p;
                }
            }
        }
        if (type == CARDTPYE.feiji) {
            for (var i = cards.length - 1; i >= 2; i--) {
                var p = this.calPoint(cards[i]);
                if (p == this.calPoint(cards[i - 2])) {
                    return p;
                }
            }
        }
        return this.calPoint(valueCard);
    };

    // 牌点比较函数
    DoudizhuQC.prototype.cardValueCmp = function (a, b) {
        var pa = this.calPoint(a);
        var pb = this.calPoint(b);
        if (pa == pb) {
            return this.removeLaiziSign(a) - this.removeLaiziSign(b);
        }
        return pa - pb;
    };

    // 牌是否能压上
    DoudizhuQC.prototype.canPut = function (oCards, oLastCards, areaSelectMode) {
        var cards = oCards.slice();
        cards.sort(this.cardValueCmp.bind(this));
        var cardsType = this.calType(cards);
        if (cardsType == -1) {
            return false;
        }
        if (!oLastCards) {
            return true; // 没有上次打的牌，三家过自己再出牌
        }
        var lastCards = oLastCards.slice();
        lastCards.sort(this.cardValueCmp.bind(this));
        var lastCardsType = this.calType(lastCards);
        if (cardsType == lastCardsType && cards.length == lastCards.length) {
            if (cardsType == CARDTPYE.zhadan && areaSelectMode.useLaizi) {
                // 纯癞子炸弹大
                if (this.isLaizi(cards[0]))
                    return true;
                else if (this.isLaizi(lastCards[0]))
                    return false;
                if (areaSelectMode.yingZhaBigger) {
                    // 硬炸管软炸
                    var laiziCards_1 = this.getLaiziCardsFromRet(cards);
                    var laiziCards_2 = this.getLaiziCardsFromRet(lastCards);
                    if (laiziCards_1.length == 0 && laiziCards_2.length > 0 || laiziCards_1.length > 0 && laiziCards_2.length == 0)
                        return laiziCards_2.length > 0;
                }
            }
            var typeValue = this.calCardsValue(cards, cardsType);
            var lastTypeValue = this.calCardsValue(lastCards, lastCardsType);
            return typeValue > lastTypeValue;
        }
        else if (cardsType > CARDTPYE.big && cardsType > lastCardsType) {
            return true;
        }
        return false;
    };

    // 检查是否能出牌
    DoudizhuQC.prototype.checkPut = function (oHands, oCards, lastCards, areaSelectMode) {
        var hands = oHands.slice();
        var cards = oCards.slice();
        for (var i = 0; i < cards.length; i++) {
            var p = hands.indexOf(cards[i]);
            if (p >= 0) {
                hands.splice(p, 1);
            }
            else {
                p = hands.indexOf(this.getRealLaizi(cards[i]));
                if (p >= 0) {
                    // 癞子
                    hands.splice(p, 1);
                }
                else
                return null; // 手里没有这些牌
            }
        }
        if(!areaSelectMode && cc ) {
            areaSelectMode = MjClient.data.sData.tData.areaSelectMode;
        }
        if (this.canPut(cards, lastCards, areaSelectMode)) {
            return hands; // 能打得过上家的牌
        }
        return null;
    };
    // 检查是否是一次可以出完(炸弹不拆，不拼四带xx)
    DoudizhuQC.prototype.checkPutByOneTimes = function (oHands) {
        var cType = this.cardsType(oHands);
        if (cType == -1 || cType == CARDTPYE.sidaier || cType == CARDTPYE.sidaier2) {
            return false;
        } else if (cType == CARDTPYE.feiji || cType == CARDTPYE.feiji2) {
            // 飞机要检查是否包含炸弹
            var cards = oHands.slice();
            cards.sort(this.cardValueCmp.bind(this));
            var len = cards.length;
            var lastPoint = -1;
            for (var i = 0; i < len; i++) {
                var point = this.calPoint(cards[i]);
                if (point == lastPoint) { continue; }
                if (point == DAWANG && lastPoint == XIAOWANG) { return false; } // 王炸不能出
                if (this.calPoint(cards[i + CARDCOUNT[CARDTPYE.zhadan] - 1]) == point && !this.isLaiziPoint(point)) { // 炸弹
                    return false;
                }
                lastPoint = point;
            }
        }
        return true;
    };
    // 对手牌排序，普通牌型和同花顺优先排序
    DoudizhuQC.prototype.sortHandCards = function (oCards, sortType) {
        var cards = oCards.slice();
        var cmp = this.cardValueCmp.bind(this);
        var commonCmp = this.cardValueCmp.bind(this);
        if (sortType == 1) { // 花色排序
            commonCmp = function (a, b) {
                var c1 = (a + 3) % 4;
                var c2 = (b + 3) % 4;
                if (a >= XIAOWANG || b >= XIAOWANG || c1 == c2) {
                    return cmp(a, b);
                }
                return c1 - c2;
            }
        }
        else if (sortType == 2) { // 张数排序
            var pointCounts = {};
            for (var i = 0; i < cards.length; i++) {
                increaseByKey(pointCounts, this.calPoint(cards[i]));
            }
            commonCmp = function (a, b) {
                var c1 = pointCounts[this.calPoint(a)];
                var c2 = pointCounts[this.calPoint(b)];
                if (c1 == c2) {
                    return cmp(a, b);
                }
                return c1 - c2;
            }.bind(this);
        }
        cards.sort(function (a, b) {
            return -commonCmp(a, b);
        });
        return cards;
    };

    // 找N张点数一样的牌
    DoudizhuQC.prototype.findNSameCard = function (hands, point, n) {
        if (n == 0)
            return [];
        if (point == XIAOWANGPOINT) {
            point = XIAOWANG;
        }
        if (point == DAWANGPOINT) {
            point = DAWANG;
        }
        for (var i = 0; i < hands.length; i++) {
            if (this.calPoint(hands[i]) == point && this.calPoint(hands[i + n - 1]) == point) {
                return hands.slice(i, i + n);
            }
        }
        return null;
    };

    // 提示牌依次暗条件后移
    var filters = [CARDTPYE.duizi, CARDTPYE.sanzhang, CARDTPYE.shunzi, CARDTPYE.zhadan];
    DoudizhuQC.prototype.filterSort = function (hands, cardsArray, type) {
        var cards = [];
        var laizis = this.transformAndGetLaizi(hands,cards);
        var laizi = laizis.length;
        // 统计点数数量
        var pointCounts = {};
        for (var i = 0; i < cards.length; i++) {
            var p = this.calPoint(cards[i]);
            if (pointCounts[p]) {
                pointCounts[p]++;
            }
            else {
                pointCounts[p] = 1;
            }
        }
        for (var i = MINPOINT; i <= ZHUPOINT; i++) {
            if (!pointCounts[i])
                pointCounts[i] = 0;
        }
        for (var i = 0; i < filters.length; i++) {
            if (filters[i] > type) {
                var deleteCards = [];
                if (filters[i] == CARDTPYE.shunzi) {
                    var shunzis = this.findCardByType(hands, CARDTPYE.shunzi, CARDCOUNT[filters[i]]);
                    for (var j = cardsArray.length - 1; j >= 0; j--) {
                        var p = this.calPoint(cardsArray[j][0]);
                        if (this.isLaiziPoint(p)) {
                            if (laizi >= CARDCOUNT[type] + 1) {
                                // 有同样的多张牌保留
                                continue;
                            }
                        } else {
                            var laiziNum = 0;
                            for (var k = 0; k < cardsArray[j].length; k++) {
                                if (this.haveLaiziSign(cardsArray[j][k]))
                                    laiziNum++;
                            }
                            if (pointCounts[p] + laiziNum >= CARDCOUNT[type] + 1) {
                                // 有同样的多张牌保留
                                continue; 
                            }
                        }
                        for (var k = 0; k < shunzis.length; k++) {
                            if (this.calPoint(shunzis[k][4]) >= p && p >= this.calPoint(shunzis[k][0])) {
                                var ss = cardsArray.splice(j, 1);
                                deleteCards.splice(0, 0, ss[0]);
                                break;
                            }
                        }
                    }
                }
                else {
                    for (var j = cardsArray.length - 1; j >= 0; j--) {
                        var p = this.calPoint(cardsArray[j][0]);
                        var bDelete = false;
                        if (this.isLaiziPoint(p)) {
                            if (laizi >= CARDCOUNT[filters[i]]) {
                                bDelete = true;
                            }
                        } else if (pointCounts[p] >= CARDCOUNT[filters[i]]) {
                            bDelete = true;
                        }
                        if (bDelete) {
                            var ss = cardsArray.splice(j, 1);
                            if (type < CARDTPYE.big && filters[i] > CARDTPYE.big) {
                                // 不是炸弹的，不拆炸弹
                                continue
                            }
                            deleteCards.splice(0, 0, ss[0]);
                        }
                    }
                }
                for (var j = 0; j < deleteCards.length; j++) {
                    cardsArray.push(deleteCards[j]);
                }
            }
        }
        // 王炸
        if (type == CARDTPYE.danpai && hands.indexOf(XIAOWANG) >= 0 && hands.indexOf(DAWANG) >= 0) {
            for (var j = cardsArray.length - 1; j >= 0; j--) {
                if (cardsArray[j][0] == XIAOWANG) {
                    cardsArray.splice(j, 1);
                    break;
                }
            }
            for (var j = cardsArray.length - 1; j >= 0; j--) {
                if (cardsArray[j][0] == DAWANG) {
                    cardsArray.splice(j, 1);
                    break;
                }
            }
        }
    };

    // 找出type牌型的牌
    DoudizhuQC.prototype.findCardByType = function (hands, type, cardCount) {
        var rets = [];

        if (hands.length < cardCount) {
            return rets;
        }
        if (type == CARDTPYE.huojian) {
            if (hands[hands.length - cardCount] == XIAOWANG) {
                rets.push(hands.slice(-cardCount));
            }
            return rets;
        } else if (type == CARDTPYE.danpai) {
            for (var i = MINPOINT; i <= DAWANGPOINT; i++) {
                var find = this.findNSameCard(hands, i, 1);
                if (find) {
                    rets.push(find);
                }
            }
            return rets;
        }

        // // 对结果挑拣、去重
        // var pointsCache = {};
        // var pushRets = function(rets, cards) {
        //     if (cards.length != cardCount)
        //         return;
        //     var ret = cards.slice();
        //     cards.sort(this.cardValueCmp.bind(this));
        //     var pointStr = ""
        //     for (var j = 0; j < ret.length; j++) {
        //         pointStr += this.calPoint(ret[j]) + "_";
        //     }
        //     if (pointsCache[pointStr])
        //         return;
        //     pointsCache[pointStr] = true;
        //     rets.push(cards);
        // }.bind(this);
        // 剔除癞子
        var cards = [];
        var laizis = this.transformAndGetLaizi(hands,cards);
        var laizi = laizis.length;
        // 统计点数数量
        var pointCounts = {};
        for (var i = 0; i < cards.length; i++) {
            var p = this.calPoint(cards[i]);
            if (pointCounts[p]) {
                pointCounts[p]++;
            }
            else {
                pointCounts[p] = 1;
            }
        }
        for (var i = MINPOINT; i <= ZHUPOINT; i++) {
            if (!pointCounts[i])
                pointCounts[i] = 0;
        }

        if (type >= CARDTPYE.zhadan || type == CARDTPYE.sanzhang || type == CARDTPYE.duizi) {
            if (laizi == hands.length && laizi == cardCount)
                rets.push(laizis);
            else {
                var laiziUsed = 0;
                for (var i = MINPOINT; i <= ZHUPOINT; i++) {
                    if (!pointCounts[i] && !this.isLaiziPoint(i)) {
                        // 结果不能全是癞子
                        continue;
                    }
                    laiziUsed = cardCount - pointCounts[i];
                    laiziUsed = Math.max(0,laiziUsed);
                    if (laiziUsed > laizi) {
                        // 癞子不够
                        continue
                    }
                    if (this.isLaiziPoint(i)) {
                        // 癞子本身
                        rets.push(laizis.slice(0,laiziUsed));
                        continue;
                    }
                    var find = this.findNSameCard(cards, i, cardCount - laiziUsed);
                    if (laiziUsed > 0) {
                        for (var j = 0; j < laiziUsed; j++) {
                            find.push(this.replaceLaizi(laizis[j],i,find));
                        }
                    }
                    rets.push(find);
                }
            }
        }
        else if (type == CARDTPYE.feiji2) {
            var shunCount = cardCount / 5;
            for (var i = MINPOINT; i <= APOINT - shunCount + 1; i++) {
                var ret = [];
                var laizisCopy = laizis.slice();
                var laiziUsed = 0;
                for (var j = 0; j < shunCount; j++) {
                    var curPoint = i + j;
                    laiziUsed = 3 - pointCounts[curPoint];
                    laiziUsed = Math.max(0,laiziUsed);

                    if (laiziUsed > laizisCopy.length) {
                        // 癞子不够
                        break;
                    }
                    if (this.isLaiziPoint(curPoint)) {
                        // 癞子本身
                        ret = ret.concat(laizisCopy.splice(0,laiziUsed));
                    } else {
                        var temp = this.findNSameCard(cards, curPoint, 3 - laiziUsed);
                        if (laiziUsed > 0) {
                            for (var k = 0; k < laiziUsed; k++) {
                                temp.push(this.replaceLaizi(laizisCopy[k],curPoint,temp));
                            }

                            laizisCopy.splice(0,laiziUsed);
                        }
                        ret = ret.concat(temp);
                    }
                }
                if (ret.length == shunCount * 3) {
                    var find4s = [];
                    for (var j = MINPOINT; j <= ZHUPOINT && ret.length < cardCount; j++) {
                        if (i <= j && j < i + shunCount) {
                            continue;
                        }
                        if (!pointCounts[j] && !this.isLaiziPoint(j)) {
                            // 带牌不能全是癞子
                            continue;
                        }
                        laiziUsed = 4 - pointCounts[j];
                        laiziUsed = Math.max(0,laiziUsed);

                        if (laiziUsed > laizisCopy.length) {
                            // 癞子不够，找对子
                            laiziUsed = 2 - pointCounts[j];
                            laiziUsed = Math.max(0,laiziUsed);
                            if (laiziUsed > laizisCopy.length) {
                                // 癞子不够
                                continue;
                            }
                            if (this.isLaiziPoint(j)) {
                                // 癞子本身
                                ret = ret.concat(laizisCopy.splice(0,laiziUsed));
                            } else {
                                var find = this.findNSameCard(cards, j, 2 - laiziUsed);
                                if (laiziUsed > 0) {
                                    for (var k = 0; k < laiziUsed; k++) {
                                        find.push(this.replaceLaizi(laizisCopy[k],j,find));
                                    }
                                    laizisCopy.splice(0,laiziUsed);
                                }
                                ret = ret.concat(find);
                            }
                        } else {
                            if (this.isLaiziPoint(j)) {
                                find4s = find4s.concat(laizisCopy.splice(0,laiziUsed));
                            } else {
                                var find4 = this.findNSameCard(cards, j, 4 - laiziUsed);
                                if (laiziUsed > 0) {
                                    for (var k = 0; k < laiziUsed; k++) {
                                        find4.push(this.replaceLaizi(laizisCopy[k],j,find4));
                                    }
                                    laizisCopy.splice(0,laiziUsed);
                                }
                                find4s = find4s.concat(find4);
                            }
                        }
                    }
                    if (cardCount > ret.length && find4s.length >= cardCount - ret.length) {
                        ret = ret.concat(find4s.slice(0, cardCount - ret.length));
                    }
                    if (ret.length == cardCount) {
                        rets.push(ret);
                    }
                }
            }
        }
        else if (type == CARDTPYE.feiji) {
            var shunCount = cardCount / 4;
            for (var i = MINPOINT; i <= APOINT - shunCount + 1; i++) {
                var ret = [];
                var laizisCopy = laizis.slice();
                var laiziUsed = 0;
                for (var j = 0; j < shunCount; j++) {
                    var curPoint = i + j;
                    laiziUsed = 3 - pointCounts[curPoint];
                    laiziUsed = Math.max(0,laiziUsed);

                    if (laiziUsed > laizisCopy.length) {
                        // 癞子不够
                        break;
                    }
                    if (this.isLaiziPoint(curPoint)) {
                        // 癞子本身
                        ret = ret.concat(laizisCopy.splice(0,laiziUsed));
                    } else {
                        var temp = this.findNSameCard(cards, curPoint, 3 - laiziUsed);
                        if (laiziUsed > 0) {
                            for (var k = 0; k < laiziUsed; k++) {
                                temp.push(this.replaceLaizi(laizisCopy[k],curPoint,temp));
                            }

                            laizisCopy.splice(0,laiziUsed);
                        }
                        ret = ret.concat(temp);
                    }
                }
                if (ret.length == shunCount * 3) {
                    var newCards = cards;
                    if (laizisCopy.length > 0) {
                        // 加入癞子
                        newCards = newCards.concat(laizisCopy);
                        newCards.sort(this.cardValueCmp.bind(this));
                    }
                    for (var j = 0; j < newCards.length; j++) {
                        if (ret.indexOf(newCards[j]) < 0 && ret.length < cardCount) {
                            ret.push(newCards[j]);
                        }
                    }
                    if (ret.length == cardCount) {
                        rets.push(ret);
                    }
                }
            }
        }
        else if (type == CARDTPYE.sanshun || type == CARDTPYE.liandui || type == CARDTPYE.shunzi) {
            var step = 1;
            if (type == CARDTPYE.sanshun)
                step = 3;
            else if (type == CARDTPYE.liandui)
                step = 2;
            for (var i = MINPOINT; i <= APOINT - cardCount / step + 1; i++) {
                var ret = [];
                var laizisCopy = laizis.slice();
                var laiziUsed = 0;
                for (var j = 0; j < cardCount / step; j++) {
                    var curPoint = i + j;
                    laiziUsed = step - pointCounts[curPoint];
                    laiziUsed = Math.max(0,laiziUsed);

                    if (laiziUsed > laizisCopy.length) {
                        // 癞子不够
                        break;
                    }
                    if (this.isLaiziPoint(curPoint)) {
                        // 癞子本身
                        ret = ret.concat(laizisCopy.splice(0,laiziUsed));
                    } else {
                        var temp = this.findNSameCard(cards, curPoint, step - laiziUsed);
                        if (laiziUsed > 0) {
                            for (var k = 0; k < laiziUsed; k++) {
                                temp.push(this.replaceLaizi(laizisCopy[k],curPoint,temp));
                            }

                            laizisCopy.splice(0,laiziUsed);
                        }
                        ret = ret.concat(temp);
                    }
                }
                if (ret.length == cardCount && !this.isRetAllLaizi(ret)) {
                    rets.push(ret);
                }
            }
        }
        else if (type == CARDTPYE.sidaier) {
            for (var i = MINPOINT; i <= ZHUPOINT; i++) {
                if (!pointCounts[i] && !this.isLaiziPoint(i)) {
                    // 主牌不能全是癞子
                    continue;
                }
                var ret = [];
                var laizisCopy = laizis.slice();
                var laiziUsed = 4 - pointCounts[i];
                laiziUsed = Math.max(0,laiziUsed);

                if (laiziUsed > laizisCopy.length) {
                    // 癞子不够
                    continue;
                }
                if (this.isLaiziPoint(i)) {
                    // 癞子本身
                    ret = ret.concat(laizisCopy.splice(0,laiziUsed));
                } else {
                    var temp = this.findNSameCard(cards, i, 4 - laiziUsed);
                    if (laiziUsed > 0) {
                        for (var k = 0; k < laiziUsed; k++) {
                            temp.push(this.replaceLaizi(laizisCopy[k],i,temp));
                        }
                        laizisCopy.splice(0,laiziUsed);
                    }
                    ret = ret.concat(temp);
                }

                var newCards = cards;
                if (laizisCopy.length > 0) {
                    // 加入癞子
                    newCards = newCards.concat(laizisCopy);
                    newCards.sort(this.cardValueCmp.bind(this));
                }

                for (var j = 0; j < newCards.length; j++) {
                    if (ret.indexOf(newCards[j]) < 0 && ret.length < cardCount) {
                        ret.push(newCards[j]);
                        }
                    }
                    if (ret.length == cardCount) {
                        rets.push(ret);
                }
            }
        }
        else if (type == CARDTPYE.sandaier) {
            for (var i = MINPOINT; i <= ZHUPOINT; i++) {
                if (!pointCounts[i] && !this.isLaiziPoint(i)) {
                    // 结果不能全是癞子
                    continue;
                }

                var ret = [];
                var laizisCopy = laizis.slice();
                var laiziUsed = 3 - pointCounts[i];
                laiziUsed = Math.max(0,laiziUsed);

                if (laiziUsed > laizisCopy.length) {
                    // 癞子不够
                    continue;
                }

                if (this.isLaiziPoint(i)) {
                    // 癞子本身
                    ret = ret.concat(laizisCopy.splice(0,laiziUsed));
                } else {
                    var temp = this.findNSameCard(cards, i, 3 - laiziUsed);
                    if (laiziUsed > 0) {
                        for (var k = 0; k < laiziUsed; k++) {
                            temp.push(this.replaceLaizi(laizisCopy[k],i,temp));
                        }

                        laizisCopy.splice(0,laiziUsed);
                    }
                    ret = ret.concat(temp);
                }

                var cardsArray = [];
                for (var j = MINPOINT; j <= ZHUPOINT; j++) {
                    if (i == j)
                        continue;
                    laiziUsed = 2 - pointCounts[j];
                    laiziUsed = Math.max(0,laiziUsed);

                    if (laiziUsed > laizisCopy.length) {
                        // 癞子不够
                        continue;
                    }

                    if (this.isLaiziPoint(j)) {
                        // 癞子本身
                        cardsArray.push(laizisCopy.slice(0,laiziUsed));
                    } else {
                        var temp = this.findNSameCard(cards, j, 2 - laiziUsed);
                        if (laiziUsed > 0) {
                            for (var k = 0; k < laiziUsed; k++) {
                                temp.push(this.replaceLaizi(laizisCopy[k],j,temp));
                            }
                        }

                        cardsArray.push(temp);
                    }
                }
                this.filterSort(hands, cardsArray, CARDTPYE.duizi);
                if (cardsArray.length > 0) {
                    // var find = this.findNSameCard(hands, calPoint(cardsArray[0][0]), 2);
                    // rets.push(ret.concat(find));

                    rets.push(ret.concat(cardsArray[0]));
                }
            }
        }
        else if (type == CARDTPYE.sandaiyi) {
            for (var i = MINPOINT; i <= ZHUPOINT; i++) {
                if (!pointCounts[i] && !this.isLaiziPoint(i)) {
                    // 结果不能全是癞子
                    continue;
                }

                var ret = [];
                var laizisCopy = laizis.slice();
                var laiziUsed = 3 - pointCounts[i];
                laiziUsed = Math.max(0,laiziUsed);
                if (laiziUsed > laizisCopy.length) {
                    // 癞子不够
                    continue;
                }

                if (this.isLaiziPoint(i)) {
                    // 癞子本身
                    ret = ret.concat(laizisCopy.splice(0,laiziUsed));
                } else {
                    var temp = this.findNSameCard(cards, i, 3 - laiziUsed);
                    if (laiziUsed > 0) {
                        for (var k = 0; k < laiziUsed; k++) {
                            temp.push(this.replaceLaizi(laizisCopy[k],i,temp));
                        }
                        laizisCopy.splice(0,laiziUsed);
                    }
                    ret = ret.concat(temp);
                }

                var cardsArray = [];
                for (var j = MINPOINT; j <= DAWANGPOINT; j++) {
                    if (i == j) {
                        continue;
                    }

                    var temp2 = null;
                    if (this.isLaiziPoint(j)) {
                        // 癞子本身，三张和带牌不能全是癞子
                        if (!this.isLaiziPoint(ret[0]))
                            temp2 = laizisCopy.slice(0,1);
                    } else
                        temp2 = this.findNSameCard(cards, j, 1);
                    
                    if (temp2 && temp2.length > 0)
                        cardsArray.push(temp2);
                }

                this.filterSort(hands, cardsArray, CARDTPYE.danpai);
                if (cardsArray.length > 0) {
                    // var find = this.findNSameCard(hands, calPoint(cardsArray[0][0]), 1);
                    // rets.push(ret.concat(find));

                    rets.push(ret.concat(cardsArray[0]));
                }
            }
        }
        return rets;
    };
// 求解提示出牌
    DoudizhuQC.prototype.tipCards = function (oHands, oLastCards, areaSelectMode) {
        if(!areaSelectMode && cc ) {
            areaSelectMode = MjClient.data.sData.tData.areaSelectMode;
        }

        var rets = [];
        var hands = oHands.slice();
        hands.sort(this.cardValueCmp.bind(this));
        
        if (!oLastCards || !oLastCards.length) {
            rets = this.getAutoPutCardWithFirstOut(hands);
        } else {
            var lastCards = oLastCards.slice();
            lastCards.sort(this.cardValueCmp.bind(this));
            var lastCardsType = this.calType(lastCards);
            var sameTypeCards = this.findCardByType(hands, lastCardsType, lastCards.length);
            for (var i = 0; i < sameTypeCards.length; i++) {
                if (this.canPut(sameTypeCards[i], oLastCards, areaSelectMode)) {
                    rets.push(sameTypeCards[i]);
                }
            }
            if (lastCardsType == CARDTPYE.duizi || lastCardsType == CARDTPYE.danpai) {
                this.filterSort(hands, rets, lastCardsType);
            }
            for (var type = Math.max(CARDTPYE.zhadan, lastCardsType + 1); type <= CARDTPYE.huojian; type++) {
                var bombCards = this.findCardByType(hands, type, CARDCOUNT[type]);
                rets = rets.concat(bombCards)
            }
        }

        if (!areaSelectMode.useLaizi)
            return rets;

        // 对带癞子的提示去重
        var retsCache = [];
        for (var i = rets.length - 1; i >= 0; i--) {
            var retTransformed = this.transRetToNormal(rets[i]);

            if (this.indexOfCards(retsCache,retTransformed))
                rets.splice(i,1);
            else {
                retsCache.push(retTransformed);
            }
        }

        return rets;
    };

    // 求出牌型
    DoudizhuQC.prototype.cardsType = function (oCards) {
        if (oCards) {
            var cards = oCards.slice();
            cards.sort(this.cardValueCmp.bind(this));
            return this.calType(cards);
        }
        return -1;
    };

// ==========================[[ 斗地主提牌 ]] ===================================

// 是否是三张系列
    DoudizhuQC.prototype.is3ZhangType = function (cType) {
        return cType == CARDTPYE.sanzhang || cType == CARDTPYE.sandaiyi || cType == CARDTPYE.sandaier || cType == CARDTPYE.sanshun || cType == CARDTPYE.feiji || cType == CARDTPYE.feiji2;
    }

// 返回值，牌的下标，value真实的值
// 例如 红桃8梅花8方块8 出 88, tipCardsArray 仅有 方块8和梅花8，出红桃8梅花8
    DoudizhuQC.prototype.findSelectCardForAutoUp = function (tipCards, selectValue) {
        var idx = tipCards.indexOf(selectValue);
        if (idx > 0 && this.calPoint(tipCards[idx]) == this.calPoint(tipCards[0])) {
            return 0;
        }
        if (idx == -1) {
            var point = this.calRealPoint(selectValue);
            var maxValue = point * 4;
            for (var i = 0; i <= 3; i++) {
                if (maxValue - i == selectValue) {
                    continue;
                }
                idx = tipCards.indexOf(maxValue - i);
                if (idx > -1) {
                    break;
                }
            }
        }
        return idx;
    };

// 更换牌值
    DoudizhuQC.prototype.changeSelectCardForAuto = function (tipCards, idx, selectValue) {
        tipCards[idx] = selectValue;
        return tipCards;
    }

// 有足够的三张牌组
    DoudizhuQC.prototype.isEnough3SameCards = function (upSelectCards, groupNum) {
        var start = false;
        var tmpCards = [];

        for (var i = 0; i < upSelectCards.length; i++) {
            var p = this.calPoint(upSelectCards[i]);
            var find = this.findNSameCard(upSelectCards, p, 3);
            if (find) {
                start = true;
                tmpCards = tmpCards.concat(find);
            } else if (start) {
                break;
            }
        }

        return (tmpCards.length / 3) >= groupNum
    };

// 不足3张的牌组，是否能在手牌找到合法的3张
    DoudizhuQC.prototype.findEnough3SameCard = function (oHands, upSelectCards, groupNum, zhadanMap) {
        var tmpSelect = [];
        var lastPoint = -1;
        for (var i = 0; i < upSelectCards.length; i++) {
            var point = this.calPoint(upSelectCards[i]);
            if (lastPoint == point) {
                continue;
            }
            lastPoint = point;
            if (zhadanMap[point]) {
                return null;
            }
            var find = this.findNSameCard(oHands, point, 3);
            if (find) {
                tmpSelect = tmpSelect.concat(find);
            } else {
                return null;
            }
        }
        if (tmpSelect.length != groupNum * 3) {
            return null;
        }
        tmpSelect.sort(this.cardValueCmp.bind(this));
        return tmpSelect;
    };

// 找三张配合的牌
    DoudizhuQC.prototype.findDaiCardsWithSanZhang = function (oHands, upSelectCards, cType, groupNum, zhadanMap) {
        var findNum = (cType == CARDTPYE.sandaier || cType == CARDTPYE.feiji2) ? 2 : 1;
        var pointCounts = {};
        for (var i = 0; i < upSelectCards.length; i++) {
            increaseByKey(pointCounts, this.calPoint(upSelectCards[i]));
        }
        var num = 0;
        for (var i = 0; i < oHands.length; i++) {
            var point = this.calPoint(oHands[i]);
            if (zhadanMap[point] != null) {
                continue;
            }
            if (pointCounts[point] != null) {
                if (pointCounts[point] == 3) {
                    continue;
                }
                if (upSelectCards.indexOf(oHands[i]) > -1) {
                    continue;
                }
            }
            if (point == XIAOWANG && i == (oHands.length - 2)) {
                break;
            } // 过滤火箭

            var find = this.findNSameCard(oHands.slice(i), point, findNum);
            if (find) {
                upSelectCards = upSelectCards.concat(find);
                num++;
                i = i + findNum - 1;
            }
            if (groupNum == num) {
                break;
            }
        }
        if (groupNum == num) {
            upSelectCards.sort(this.cardValueCmp.bind(this));
            return upSelectCards;
        } else {
            return null;
        }
    };

// 自动提牌-划动-三张系列
    DoudizhuQC.prototype.handleAutoByTouchMoveSanZhang = function (upSelectCards, cType, oLastCards, oHands) {
        var groupNum = 1;
        if (cType == CARDTPYE.sanshun) {
            groupNum = oLastCards.length / 3;
        } else if (cType == CARDTPYE.feiji) {
            groupNum = oLastCards.length / 4;
        } else if (cType == CARDTPYE.feiji2) {
            groupNum = oLastCards.length / 5;
        }
        var zhadanMap = this.getZhaDanMapByCards(oHands);
        // 判断主体部分是否足够
        if (!this.isEnough3SameCards(upSelectCards, groupNum)) {
            // 主体部分不足，判断选的牌是否可以和手牌凑够主体
            upSelectCards = this.findEnough3SameCard(oHands, upSelectCards, groupNum, zhadanMap);
            if (upSelectCards == null) {
                return null;
            }
        }
        if (cType != CARDTPYE.sanzhang && cType != CARDTPYE.sanshun) { // 3+N
            // 主体部分足够，找主体配合的牌
            upSelectCards = this.findDaiCardsWithSanZhang(oHands, upSelectCards, cType, groupNum, zhadanMap);
            if (upSelectCards == null) {
                return null;
            }
        }
        // 查找合适的牌组
        return this.findTheRightTouchMoveCards(upSelectCards, cType, oLastCards);
    };

    DoudizhuQC.prototype.findTheRightTouchMoveCards = function (upSelectCards, cType, oLastCards, areaSelectMode) {
        if(!areaSelectMode && cc ) {
            areaSelectMode = MjClient.data.sData.tData.areaSelectMode;
        }
        var sameTypeCards = this.findCardByType(upSelectCards, cType, oLastCards.length);
        for (var i = 0; i < sameTypeCards.length; i++) {
            if (this.canPut(sameTypeCards[i], oLastCards, areaSelectMode)) {
                return sameTypeCards[i];
            }
        }
        return null;
    }

    DoudizhuQC.prototype.findZhadanTouchMoveCards = function (upSelectCards) {
        var tCards = [];
        var lastPoint = -1;
        var zhadanMap = this.getZhaDanMapByCards(upSelectCards);
        if (Object.keys(zhadanMap) <= 0) {
            return null;
        }

        for (var i = 0; i < upSelectCards.length; i++) {
            var point = this.calPoint(upSelectCards[i]);
            if (lastPoint == point) {
                continue;
            }
            if (zhadanMap[point] != null) {
                return this.findNSameCard(upSelectCards, point, CARDCOUNT[CARDTPYE.zhadan]);
            }
            lastPoint = point;
        }
        return null;
    }

// 自动提牌-划牌
    DoudizhuQC.prototype.handleAutoByTouchMove = function (bTouchMove, upSelectCards, cType, tipCardsArray, oLastCards, oHands) {
        //划牌第0步，类型是对子和三张的，判断划的牌是否有炸弹
        var tCards = null;
        if (cType == CARDTPYE.duizi || cType == CARDTPYE.sanzhang || cType == CARDTPYE.sandaiyi || cType == CARDTPYE.sandaier) {
            tCards = this.findZhadanTouchMoveCards(upSelectCards);
            if (tCards != null) {
                return tCards;
            }
        }

        // 划牌第一步：划的牌拥有可以出的牌型，返回第一个可以出的牌组，否则进行第一步
        tCards = this.findTheRightTouchMoveCards(upSelectCards, cType, oLastCards);
        if (tCards != null) {
            return tCards;
        }

        // 划牌第二步：划的牌不满足出牌，氛围两种处理方式
        if (cType == CARDTPYE.shunzi || cType == CARDTPYE.liandui) {
            // 2-1: 顺子、连对，划牌的最小的牌，找到合适的提示
            tCards = this.handleAutoByFirstCard(tipCardsArray, upSelectCards[0], cType);
        } else if (this.is3ZhangType(cType)) {
            // 2-2：三张系列
            tCards = this.handleAutoByTouchMoveSanZhang(upSelectCards, cType, oLastCards, oHands);
        } else if (cType == CARDTPYE.zhadan || cType == CARDTPYE.sidaier || cType == CARDTPYE.sidaier2) {
            tCards = this.handleAutoByFirstCard(tipCardsArray, upSelectCards[0], cType);
        }
        if (tCards) {
            return tCards;
        }

        // 第三步，找到划牌种的炸弹
        for (var type = Math.max(CARDTPYE.zhadan, cType + 1); type <= CARDTPYE.huojian; type++) {
            var bombCards = this.findCardByType(upSelectCards, type, CARDCOUNT[type]);
            if (bombCards.length > 0) {
                return bombCards[0];
            }
        }
        return null;
    };

// 自动提牌-点牌
    DoudizhuQC.prototype.handleAutoByFirstCard = function (tipCardsArray, upSelectCard, cType) {
        var tipLen = tipCardsArray.length;
        var tmpArr = null;
        for (var i = 0; i < tipLen; i++) {
            var idx = this.findSelectCardForAutoUp(tipCardsArray[i], upSelectCard);
            if (idx == -1) {
                continue;
            }
            if (idx == 0) {
                tmpArr = tipCardsArray[i];
            } else if (tmpArr == null) {
                tmpArr = this.changeSelectCardForAuto(tipCardsArray[i], idx, upSelectCard);
            }
            if (tmpArr != null && (cType == CARDTPYE.sidaier || cType == CARDTPYE.sidaier2)) {
                if (this.calType(tmpArr) == cType) {
                    tmpArr = null;
                    continue;
                }
            }
            if (idx == 0) {
                return tmpArr;
            }
        }
        return tmpArr;
    };

// 计算斗地主划牌结果
    DoudizhuQC.prototype.calAutoPutCards = function (bTouchMove, tipCardsArray, upSelectCards, oLastCards, oHands) {
        var data = {hasCardToUp: false};
        if (oHands == null) {
            return data;
        }
        var cType = this.calType(oLastCards);
        upSelectCards.sort(this.cardValueCmp.bind(this));
        var hands = oHands.slice();
        hands.sort(this.cardValueCmp.bind(this));
        if (bTouchMove && upSelectCards.length > 1) {
            data.tSelectCards = this.handleAutoByTouchMove(bTouchMove, upSelectCards, cType, tipCardsArray, oLastCards, hands);
        } else if (upSelectCards.length == 1) {
            data.tSelectCards = this.handleAutoByFirstCard(tipCardsArray, upSelectCards[0], cType);
        }
        data.hasCardToUp = data.tSelectCards != null;
        return data;
    };

    DoudizhuQC.prototype.getFindCardForFirstPut = function (cards, cType, count) {
        var realCards = null;
        var rateType = {};
        rateType[CARDTPYE.shunzi] = 1;
        rateType[CARDTPYE.feiji2] = 5;
        rateType[CARDTPYE.feiji] = 4;
        rateType[CARDTPYE.liandui] = 2;

        if (count < CARDCOUNT[cType] || rateType[cType] == null) {
            return realCards;
        }
        if (count % rateType[cType] == 0) {
            var rets = this.findCardByType(cards, cType, count);
            if (rets.length > 0) {
                realCards = rets[0];
            }
        }

        return realCards;
    };

// 计算斗地主，首出牌划牌的结果(首出提示：顺子 > 飞机2 > 飞机 > 连对)
    DoudizhuQC.prototype.calAutoPutCardWithFirstOut = function (upSelectCards, hands) {
        var data = {hasCardToUp: false};
        var minLen = CARDCOUNT[CARDTPYE.shunzi];
        if (upSelectCards.length < minLen) {
            return data;
        } // 选择的牌不够

        var select = this.calSelectWithoutZhadan(upSelectCards, this.getZhaDanMapByCards(hands));
        var selectLen = select.length;
        var shunZiSelect = null;
        var feiJi2Select = null;
        var feiJiSelect = null;
        var lianDuiSelect = null;
        for (var i = selectLen; i >= minLen; i--) {
            shunZiSelect = this.getFindCardForFirstPut(select, CARDTPYE.shunzi, i);
            if (shunZiSelect != null) {
                break;
            }

            if (feiJi2Select == null) {
                feiJi2Select = this.getFindCardForFirstPut(select, CARDTPYE.feiji2, i);
            }
            if (feiJi2Select != null) {
                continue;
            }

            if (feiJiSelect == null) {
                feiJiSelect = this.getFindCardForFirstPut(select, CARDTPYE.feiji, i);
            }
            if (feiJiSelect != null) {
                continue;
            }

            if (lianDuiSelect != null) {
                continue;
            }
            lianDuiSelect = this.getFindCardForFirstPut(select, CARDTPYE.liandui, i);
        }

        if (shunZiSelect != null) {
            data.tSelectCards = shunZiSelect;
        } else if (feiJi2Select != null) {
            data.tSelectCards = feiJi2Select;
        } else if (feiJiSelect != null) {
            data.tSelectCards = feiJiSelect;
        } else if (lianDuiSelect != null) {
            data.tSelectCards = lianDuiSelect;
        }

        data.hasCardToUp = data.tSelectCards != null;
        return data;
    };

// 计算选择的牌,排除炸弹
    DoudizhuQC.prototype.calSelectWithoutZhadan = function (upSelectCards, zhadanMap) {
        var cards = upSelectCards.slice();
        cards.sort(this.cardValueCmp.bind(this));
        var select = [];
        var len = upSelectCards.length;
        for (var i = 0; i < len; i++) {
            var point = this.calPoint(cards[i]);
            if (zhadanMap[point]) {
                continue;
            }
            select.push(cards[i]);
        }
        return select;
    };

// 计算牌组的炸弹
    DoudizhuQC.prototype.getZhaDanMapByCards = function (oHands) {
        var hands = oHands.slice();
        hands.sort(this.cardValueCmp.bind(this));
        var zhadanCardsNum = CARDCOUNT[CARDTPYE.zhadan];
        var zhadanMap = {}
        var lastPoint = -1;
        for (var i = 0; i < hands.length; i++) {
            var point = this.calPoint(hands[i]);
            if (lastPoint == point) {
                continue;
            }
            if (this.calPoint(hands[i + zhadanCardsNum - 1]) == point) {
                zhadanMap[point] = 1;
                i = i + zhadanCardsNum - 1;
            } else if (lastPoint == XIAOWANG && point == DAWANG) {
                zhadanMap[XIAOWANG] = 1;
                zhadanMap[DAWANG] = 1;
            }
            lastPoint = point;
        }
        return zhadanMap;
    }
// 计算真实的点
    DoudizhuQC.prototype.calRealPoint = function (num) {
        if (!num) {
            return -1;
        }
        var ceilNum = Math.ceil(num / 4);

        if (ceilNum > KPOINT) {
            return num; // 大小王原数字返回53、54
        }
        return ceilNum;
    };

    // ==========================[[ 首出提示  ]] ====================================
    // 如果最小的牌是炸弹，返回最小炸弹和第二最小牌，否则仅返回最小牌
    DoudizhuQC.prototype.findMinPointAndMinZhaDanByHands = function (hands) {
        var cards = hands.slice();
        cards.sort(this.cardValueCmp.bind(this));
        var data = { minPoint: -1, minZhaDan: -1 };
        var len = cards.length;
        for (var i = 0; i < len; i++) {
            var point = this.calPoint(cards[i]);
            if (i + 1 < len && cards[i] == XIAOWANG && cards[i + 1] == DAWANG) {
                data.minZhaDan = data.minZhaDan == -1 ? point : data.minZhaDan;
                break;
            }
            if (i + 3 < len && point == this.calPoint(cards[i + 3])) {
                data.minZhaDan = data.minZhaDan == -1 ? point : data.minZhaDan;
                i = i + 3;
                continue;
            }

            data.minPoint = point;
            break;
        }
        return data;
    };

    // 找最小牌的顺子/连对
    DoudizhuQC.prototype.findCardsByMinPointAndType = function (cardsMap, len, minPoint, cType) {
        var count = CARDCOUNT[cType];
        var rate = cType == CARDTPYE.shunzi ? 1 : 2;
        if (len < count || (minPoint + count / rate - 1) > APOINT) {
            return null;
        }

        var cards = [];
        for (var i = minPoint; i < ZHUPOINT; i++) {
            if (cardsMap[i] == null || cardsMap[i].length < rate) { break; }
            var tmpCards = cardsMap[i].slice(0, rate)
            cards = cards.concat(tmpCards);
        }
        return cards.length >= count ? cards : null;
    };

    // 找最小牌的三张 3+N (最小的找三张，剩余的最小找对子或单张)
    DoudizhuQC.prototype.findSanZhangByMinPoint = function (cardsMap, len, minPoint) {
        if (len < CARDCOUNT[CARDTPYE.sandaiyi] || cardsMap[minPoint] == null || cardsMap[minPoint].length < 3) { return null; }

        var cards = [];
        var duiZi = [];
        var danPai = [];
        var status = 0; // 0 : 三连张 1 : 最小有对子 2： 仅带单牌
        for (var i = minPoint; i < ZHUPOINT; i++) {
            if (status == 0) {
                status = (cardsMap[i] != null && cardsMap[i].length >= 3) ? 0 : 1;
            } else if (status == 1 && danPai.length > 0 && duiZi.length == 0) {
                status = 2;
            }
            if (cardsMap[i] == null) { continue; }
            if (status == 0) {
                var tmpCards = cardsMap[i].slice(0, 3);
                cards = cards.concat(tmpCards);
            } else {
                if (status == 1 && cardsMap[i].length > 1) {
                    var tDuiZi = cardsMap[i].slice(0, 2);
                    duiZi = duiZi.concat(tDuiZi);
                }
                var tDan = cardsMap[i].length == 4 ? cardsMap[i].slice(0, 3) : cardsMap[i].slice();
                danPai = danPai.concat(tDan);
            }
        }

        if (cards.length == 0) { return null; }
        var count = cards.length / 3;
        if (duiZi.length / 2 >= count) {
            return cards.concat(duiZi.slice(0, count * 2));
        }
        if (cardsMap[XIAOWANG] != null) {
            danPai.push(XIAOWANG);
        } else if (cardsMap[DAWANG] != null) {
            danPai.push(DAWANG);
        }

        if (danPai.length >= count) {
            return cards.concat(danPai.slice(0, count));
        }
        return cards;
    };

    // 找最小牌的对子
    DoudizhuQC.prototype.findDuiZiByMinPoint = function (cardsMap, len, minPoint) {
        var count = CARDCOUNT[CARDTPYE.duizi];
        if (cardsMap[minPoint] != null && cardsMap[minPoint].length >= count) {
            return cardsMap[minPoint].slice(0, count);
        }
        return null;
    };

    DoudizhuQC.prototype.changeCardsToMap = function (hands, isExcludeZhaDan) {
        var cardsMap = {}
        for (var i = 0; i < hands.length; i++) {
            var p = this.calPoint(hands[i]);
            if (cardsMap[p] == null) {
                cardsMap[p] = [];
            }
            cardsMap[p].push(hands[i]);
            if (isExcludeZhaDan && cardsMap[p].length == 4) { delete cardsMap[p]; }
        }
        if (isExcludeZhaDan && cardsMap[XIAOWANG] != null && cardsMap[DAWANG] != null) {
            delete cardsMap[XIAOWANG];
            delete cardsMap[DAWANG];
        }
        return cardsMap;
    };

    // 首出逻辑
    DoudizhuQC.prototype.getAutoPutCardWithFirstOut = function (hands) {
        // 1. 从小到大出牌
        // 2. 顺子>连对> 飞机 3+N (三张主体越多优先级越高)>对子>单张 (炸弹跳过)
        // 3. 仅有炸弹，炸弹出最小
        var len = hands.length;
        var minData = this.findMinPointAndMinZhaDanByHands(hands);
        if (minData.minPoint == -1) { // 仅有炸弹
            var cards = this.findNSameCard(hands, minData.minZhaDan, CARDCOUNT[CARDTPYE.zhadan]);
            return cards != null ? [cards] : [];
        }
        var minPoint = minData.minPoint;
        var cardsList = [];
        var cardsMap = this.changeCardsToMap(hands, true);
        // 顺子
        var shunZi = this.findCardsByMinPointAndType(cardsMap, len, minPoint, CARDTPYE.shunzi);
        if (shunZi != null) { cardsList.push(shunZi); }
        // 连对
        var lianDui = this.findCardsByMinPointAndType(cardsMap, len, minPoint, CARDTPYE.liandui);
        if (lianDui != null) { cardsList.push(lianDui); }
        // 3+N飞机、三顺、三带N
        var sanzhang = this.findSanZhangByMinPoint(cardsMap, len, minPoint);
        if (sanzhang != null) { cardsList.push(sanzhang); }
        // 对子
        var duiZi = this.findDuiZiByMinPoint(cardsMap, len, minPoint);
        if (duiZi != null) { cardsList.push(duiZi); }

        // 单张
        cardsList.push([cardsMap[minPoint][0]]);
        return cardsList;
    };

    // ==========================[[ 斗地主提牌 ]] ===================================

    /*************************************癞子相关****************************************************/
    /** 剔除癞子
     * @param {array} oCards [in] 
     * @param {array} cards [out] 剔除癞子后的按点数据序的牌
     * @return {number} 返回癞子数
     */
    DoudizhuQC.prototype.transformAndGetLaizi = function(oCards, cards) {
        var laizis = [];
        for (var i = 0; i < oCards.length; i++) {
            if (this.isLaizi(oCards[i]))
                laizis.push(oCards[i]);
            else
                cards.push(oCards[i]);
        }
        cards.sort(this.cardValueCmp.bind(this));
        return laizis;
    };
    /**
     * 计算牌花色
     * @param {number} num
     * @return {number}
     */
    DoudizhuQC.prototype.calFlower = function(num) {
        num = this.removeLaiziSign(num);
        return (num + 3) % 4;
    }
    /**
     * 设置癞子点数
     * @param {numer}
     */
    DoudizhuQC.prototype.setLaiziPoint = function(point) {
        this.laiziPoint = point;
    }
    /**
     * 是否是癞子点数
     * @param {numer}
     */
    DoudizhuQC.prototype.isLaiziPoint = function(point) {
        if (point == APOINT)
            point = 1;
        else if (point == ZHUPOINT)
            point = 2;
        return this.laiziPoint == point;
    }
    /**
     * 是否是癞子
     * @param {numer}
     */
    DoudizhuQC.prototype.isLaizi = function(cardValue) {
        return this.isLaiziPoint(this.calPoint(cardValue));
    }
    /**
     * 从一组提示中找到由癞子代替的牌
     * @param {array} ret 一组结果
     */
    DoudizhuQC.prototype.getLaiziCardsFromRet = function(ret) {
        if (!ret || ret.length <= 0)
            return [];
        var laiziCards = [];
        for (var i = 0; i < ret.length; i++) {
            if (this.haveLaiziSign(ret[i]))
                laiziCards.push(ret[i]);
        }
        return laiziCards;
    };
    /**
     * 由癞子代替的牌，返回真正的癞子
     * @param {number} laiziCard 牌值
     */
    DoudizhuQC.prototype.getRealLaizi = function(laiziCard) {
        if (!laiziCard)
            return -1;
        if (!this.haveLaiziSign(laiziCard))
            return -1;
        var muti = Math.floor(laiziCard / LAI_ZI_SIGN);
        if (muti > 0)
            return (this.laiziPoint - 1) * 4 + muti;
        return -1;
    };
    /**
     * 对双癞子查找结果去重
     * @param {array} rets 结果
     */
     DoudizhuQC.prototype.removeSameResults = function(rets) {
        var pointsCache = {};
        for (var i = 0; i < rets.length;) {
            var ret = rets[i].slice();
            ret.sort(this.cardValueCmp.bind(this));
            var pointStr = ""
            for (var j = 0; j < ret.length; j++) {
                pointStr += this.calPoint(ret[j]) + "_";
            }
            if (pointsCache[pointStr])
                rets.splice(i,1);
            else {
                i++;
                pointsCache[pointStr] = true;
            }
        }
    };
    /**
     * 给牌值加上癞子标记
     * @cardValue {number} 
     * @laiziFlower {number} 癞子的花色
     */
    DoudizhuQC.prototype.addLaiziSign = function(cardValue,laiziFlower) {
        if (cardValue == XIAOWANG || cardValue == DAWANG)
            return cardValue;
        return cardValue + (laiziFlower + 1) * LAI_ZI_SIGN;
    }
    /**
     * 给牌值去掉癞子标记
     * @cardValue {number} 
     */
    DoudizhuQC.prototype.removeLaiziSign = function(cardValue) {
        return cardValue % LAI_ZI_SIGN;
    }
    /**
     * 是否带有癞子标记
     * @cardValue {number} 
     */
    DoudizhuQC.prototype.haveLaiziSign = function(cardValue) {
        return cardValue > LAI_ZI_SIGN;
    }
    /**
     * 将癞子替换为牌值
     * @laiziValue {number} 癞子值
     * @point {number} 想要替换的目的点数
     * @cards {array} 包含目的点数的牌组，用于区分已有目的点数的花色
     */
    DoudizhuQC.prototype.replaceLaizi = function(laiziValue,point,cards) {
        var laiziFlower = this.calFlower(laiziValue);
        var realPoint = function(originalPoint) {
            if (originalPoint == APOINT)
                return 1;
            else if (originalPoint == ZHUPOINT)
                return 2;
            return originalPoint;
        };
        point = realPoint(point);
        if (cards && cards.length > 0) {
            var flowers = [0,1,2,3];
            for (var i = 0; i < cards.length; i++) {
                if (realPoint(this.calPoint(cards[i])) != point)
                    continue;
                var index = flowers.indexOf(this.calFlower(cards[i]));
                if (index >= 0)
                    flowers.splice(index,1);
            }
            if (flowers.length > 0 && flowers.length != 4) {
                // 随机一个花色
                return this.addLaiziSign(point * 4 - 3 + flowers[Math.floor(Math.random() * flowers.length) % flowers.length],laiziFlower);
            }
        }
        return this.addLaiziSign(point * 4 - 3 + laiziFlower,laiziFlower);
    }
    DoudizhuQC.prototype.isRetAllLaizi = function(ret) {
        for (var i = 0; i < ret.length; i++) {
            if (!this.isLaizi(ret[i]) && !this.haveLaiziSign(ret[i]))
                return false;
        }
        return true;
    }

    DoudizhuQC.prototype.indexOfCards = function(cardList, cards) {
        for(var i in cardList) {
            var tmpCards = cardList[i];
            if( this.isSameCards(tmpCards, cards) )
                return true;
        }
        return false;
    }

    DoudizhuQC.prototype.isSameCards = function(cards1, cards2) {
        if(cards1.length != cards2.length) return false;

        // var cds1 = cards1.slice();
        // var cds2 = cards2.slice();

        var cds1 = cards1;
        var cds2 = cards2;
        cds1.sort(this.cardValueCmp.bind(this));
        cds2.sort(this.cardValueCmp.bind(this));

        for(var i in cds1){
            if(cds1[i] != cds2[i])
                return false;
        }

        return true;
    }

    DoudizhuQC.prototype.transRetToNormal = function(ret) {
        var cards = ret.slice();
        for (var i = 0; i < cards.length; i++) {
            var realLaizi = this.getRealLaizi(cards[i]);

            if (realLaizi != -1)
                cards[i] = realLaizi;
        }

        return cards;
    }

    if (typeof (module) != "undefined" && module.exports)
        module.exports = DoudizhuQC;
    if (typeof (MjClient) != "undefined")
        MjClient.doudizhu_QC = new DoudizhuQC();
})();