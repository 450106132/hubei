// 大冶打拱算法类
(function() {
    function PokerDaYeDaGong() {
        this.handCount = 0; // 置为零，为了自主发牌
    }
    
    var LAI_ZI_SIGN = 100;
    var RED_JOKER = 54;
    var BLACK_JOKER = 53;
    var MIN_POINT = 3;
    var KPOINT = 13;
    var APOINT = 14;
    var TWO_POINT = 16;
    var LAI_ZI_POINT = 18;
    var MAX_POINT = TWO_POINT; 

    // 牌型排序优先级 和 id
    var CARDTPYE = {
        wangzha: 108,
        eightxigunlong: 107,
        eightxi: 106,
        gunlong: 105,
        sevenxi: 104,
        zhadan: 103,
        f_510k:102,
        z_510k:101,
        big: 100, // 大牌分界线
        sanshun:5,
        liandui:4,
        sanzhang:3,
        duizi:2,
        danpai:1
    };

    PokerDaYeDaGong.prototype.CARDTPYE = CARDTPYE;

    var CARDCOUNT = {};
    CARDCOUNT[CARDTPYE.wangzha] = 4;
    CARDCOUNT[CARDTPYE.eightxigunlong] = 16;
    CARDCOUNT[CARDTPYE.eightxi] = 8;
    CARDCOUNT[CARDTPYE.gunlong] = 8;
    CARDCOUNT[CARDTPYE.sevenxi] = 7;
    CARDCOUNT[CARDTPYE.zhadan] = 4;
    CARDCOUNT[CARDTPYE.z_510k] = 3;
    CARDCOUNT[CARDTPYE.f_510k] = 3;
    CARDCOUNT[CARDTPYE.sanshun] = 6;
    CARDCOUNT[CARDTPYE.liandui] = 4;
    CARDCOUNT[CARDTPYE.sanzhang] = 3;
    CARDCOUNT[CARDTPYE.duizi] = 2;
    CARDCOUNT[CARDTPYE.danpai] = 1;

    var print = function(){
        var str = '';
        for (var i=0; i<arguments.length; i++){
            str  = str + arguments[i] + ' ';
        }
        console.log(str);
    }
    var increaseByKey = function(dict, key, incr) {
        if (dict[key]) {
            dict[key] += (incr || 1);
        }
        else {
            dict[key] = (incr || 1);
        }
    };
    
    //两副牌，4人，每人27张
    PokerDaYeDaGong.prototype.randomCards = function(areaSelectMode, tData) {
        var cards = [];

        //两副牌
        for (var i = 1; i <= 54; i++) {
            cards.push(i);
            cards.push(i);
        }

        // 切牌
        cards = shuffleArray(cards);

        return cards;
    };

    PokerDaYeDaGong.prototype.isLaizi = function(card) {
        card = this.removeLaiziSign(card);
        return card == RED_JOKER || card == BLACK_JOKER;
    };
    
    /**
     * 计算牌点数
     * @param {number} num
     * @return {number}
     */
    PokerDaYeDaGong.prototype.calPoint = function(num) {
        if (!num) { return -1; }

        num = this.removeLaiziSign(num);

        if (this.isLaizi(num))
            return LAI_ZI_POINT;

        var ceilNum = Math.ceil(num / 4);
        if (ceilNum == 2) {
            return TWO_POINT;
        } else if (ceilNum == 1) {
            return APOINT;
        } else {
            return ceilNum;
        }
    };
    
    /**
     * 计算牌花色
     * @param {number} num
     * @return {number}
     */
    PokerDaYeDaGong.prototype.calFlower = function(num) {
        num = this.removeLaiziSign(num);
        return (num + 3) % 4;
    }

    /**
     * 判断是否为滚龙  : 55556666 , 555566667777
     * @param  {array} oCards 按点数排序好的牌
     * @return {boll} 
     */
    PokerDaYeDaGong.prototype.isGunLong = function(oCards) { //cards有序
        if (!oCards) {
            return false;
        }

        var cardCount = oCards.length;
        if (this.calPoint(oCards[oCards.length - 1]) >= TWO_POINT) {
            return false;
        }

        var pointCounts = {};
        for (var i = 0; i < cardCount; i++) {
            increaseByKey(pointCounts, this.calPoint(oCards[i]));
        }

        var maxCount = 0; // 最多有几张点数最多的牌
        for (var i in pointCounts) {
            if (maxCount < pointCounts[i]) {
                maxCount = pointCounts[i];
            }
        }

        for (var i in pointCounts) {
            if (pointCounts[i] != maxCount)
                return false;
        }
            
        var numCount = Object.keys(pointCounts).length;

        if (numCount <= 1)
            return false;

        return numCount == cardCount / maxCount && this.calPoint(oCards[0]) + numCount - 1 == this.calPoint(oCards[oCards.length - 1]);
    };

    /**
     * 判断是否为510K滚龙
     * @param  {array} oCards 按点数排序好的牌
     * @return {boll} 
     */
    PokerDaYeDaGong.prototype.is510KGunLong = function(oCards) { //cards有序
        if (!oCards) {
            return false;
        }

        var cardCount = oCards.length;
        if (this.calPoint(oCards[oCards.length - 1]) >= APOINT) {
            return false;
        }

        var pointCounts = {};
        for (var i = 0; i < cardCount; i++) {
            increaseByKey(pointCounts, this.calPoint(oCards[i]));
        }

        var maxCount = 0; // 最多有几张点数最多的牌
        for (var i in pointCounts) {
            var pNum = Number(i);

            if (pNum != 5 && pNum != 10 && pNum != KPOINT)
                return false;

            if (maxCount < pointCounts[i]) {
                maxCount = pointCounts[i];
            }
        }

        for (var i in pointCounts) {
            if (pointCounts[i] != maxCount)
                return false;
        }

        return Object.keys(pointCounts).length == 3;
    };

    /**
     * 判断是否都是癞子
     * @param {array} oCards 按点数排好序的牌
     * @return {bool}
     */
    PokerDaYeDaGong.prototype.isAllLaizi = function(oCards) { //oCards有序
        if (!oCards || oCards.length <= 0)
            return false;
        
        for (var i = 0; i < oCards.length; i++) {
            if (!this.isLaizi(oCards[i]))
                return false;
        }

        return true;
    };

    /**
     * 计算牌型
     * @param {array} cards 按点数排好序的牌
     * @return {CARDTPYE} 牌型，-1 = 不成型
     */
    PokerDaYeDaGong.prototype.calType = function(oCards) {
        if (!oCards)
            return -1;

        var cards = oCards.slice();
        cards.sort(this.cardValueCmp.bind(this));

        var cardCount = cards.length;
        var allSame = this.calPoint(cards[0]) == this.calPoint(cards[cards.length - 1]);
        var pointCounts = {};
        for (var i = 0; i < cards.length; i++) {
            increaseByKey(pointCounts, this.calPoint(cards[i]));
        }

        var maxCount = 0; // 最多有几张点数最多的牌
        for (var i in pointCounts) {
            if (maxCount < pointCounts[i]) {
                maxCount = pointCounts[i];
            }
        }

        //王炸
        if (cardCount >= CARDCOUNT[CARDTPYE.wangzha] && this.isAllLaizi(cards))
            return CARDTPYE.wangzha;

        // 滚龙
        if(cardCount >= CARDCOUNT[CARDTPYE.gunlong] && maxCount >= 4 && this.isGunLong(cards)){
            pointCounts = this.pointCountsExceptLaizi(cards);

            for (var i in pointCounts) {
                if (pointCounts[i] == 8)
                    return CARDTPYE.eightxigunlong;
            }

            return CARDTPYE.gunlong;
        }

        //3顺
        if(cardCount >= CARDCOUNT[CARDTPYE.sanshun] && maxCount == 3 && this.isGunLong(cards)){
            return CARDTPYE.sanshun;
        }

        // 连对，2对起
        if (cardCount >= CARDCOUNT[CARDTPYE.liandui] && maxCount == 2 && this.isGunLong(cards))
            return CARDTPYE.liandui;

        // 510k
        if(cardCount == CARDCOUNT[CARDTPYE.f_510k] && maxCount == 1 && this.is510KGunLong(cards)) {
            var bTongHua = true;
            if (this.calFlower(oCards[0]) != this.calFlower(oCards[1]) || this.calFlower(oCards[0]) != this.calFlower(oCards[2])) {
                bTongHua = false;
            }

            if (bTongHua)
                return CARDTPYE.f_510k;
            else
                return CARDTPYE.z_510k;
        }
    
        //炸弹
        if (cardCount >= CARDCOUNT[CARDTPYE.zhadan] && allSame) {
            pointCounts = this.pointCountsExceptLaizi(cards);

            maxCount = 0;
            for (var i in pointCounts) {
                if (maxCount < pointCounts[i]) {
                    maxCount = pointCounts[i];
                }
            }

            if (maxCount == 8)
                return CARDTPYE.eightxi;
            else if (maxCount == 7)
                return CARDTPYE.sevenxi;

            return CARDTPYE.zhadan;
        }
    
        // 三张
        if (cardCount == CARDCOUNT[CARDTPYE.sanzhang] && allSame)
            return CARDTPYE.sanzhang;
    
        // 对子
        if (cardCount == CARDCOUNT[CARDTPYE.duizi] && allSame)
            return CARDTPYE.duizi;
    
        // 单牌
        if (cardCount == CARDCOUNT[CARDTPYE.danpai])
            return CARDTPYE.danpai;
    
        return -1;
    };
    
    PokerDaYeDaGong.prototype.cardsType = function(cards) {
        return this.calType(cards)
    }
    
    // 计算牌型点数
    PokerDaYeDaGong.prototype.calCardsValue = function (oCards,areaSelectMode) {
        if (!oCards)
            return -1;

        var cardCount = oCards.length;
        if (oCards.length == 0) {
            return -1;
        }

        // 癞子单出的点数
        if (cardCount <= 3) {
            var allLaizi = true;

            for (var i = 0; i < oCards.length; i++) {
                if (!this.isLaizi(oCards[i])) {
                    allLaizi = false;
                    break;
                }
            }

            if (allLaizi)
                return this.getLaiziPoint(areaSelectMode);
        }

        return this.calPoint(oCards[cardCount - 1]);
    };
    
    // 牌点比较函数（从小到大）
    PokerDaYeDaGong.prototype.cardValueCmp = function(a, b) {
        var pa = this.calPoint(a);
        var pb = this.calPoint(b);
        if (pa == pb)
            return this.removeLaiziSign(a) - this.removeLaiziSign(b);
        
        return pa - pb;
    };
    
    /** 剔除癞子
     * @param {array} oCards [in] 
     * @param {array} cards [out] 剔除癞子后的按点数据序的牌
     * @return {number} 返回癞子数
     */
    PokerDaYeDaGong.prototype.transformAndGetLaizi = function(oCards, cards) {
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
     * 牌是否能压上
     * @param {array} oCards 按点数排好序的牌/选择了的手牌
     * @param {array} [oLastCards] 按点数排好序的牌/最后打出的牌
     * @param {number} [handsNum] 手牌数量
     */
    PokerDaYeDaGong.prototype.canPut = function(oCards, oLastCards, areaSelectMode) {
        var cards = oCards.slice();

        cards.sort(this.cardValueCmp.bind(this));
        var cardType = this.calType(cards);

        if (cardType == -1)
            return false;

        if (!oLastCards || oLastCards == -1 || oLastCards.length == 0) {
            return true; // 没有上次打的牌，三家过自己再出牌
        }

        if ((cardType == CARDTPYE.sanshun || cardType == CARDTPYE.liandui) && oCards.length != oLastCards.length)
            return false;

        var lastCards = oLastCards.slice();
        lastCards.sort(this.cardValueCmp.bind(this));
        var lastCardType = this.calType(lastCards);

        if (cardType == lastCardType) {
            if (cards.length == lastCards.length) {
                if (cardType < CARDTPYE.big || cardType == CARDTPYE.sevenxi || cardType == CARDTPYE.eightxi) {
                    // 常规牌型点数大的大
                    return this.calCardsValue(cards,areaSelectMode) > this.calCardsValue(lastCards,areaSelectMode);
                } else if (cardType == CARDTPYE.f_510k) {
                    // 比花色
                    return this.calFlower(cards[0]) > this.calFlower(lastCards[0]);
                } else if (cardType == CARDTPYE.zhadan) {
                    var laiziCards_1 = this.getLaiziCardsFromRet(cards);
                    var laiziCards_2 = this.getLaiziCardsFromRet(lastCards);

                    if ((laiziCards_1.length == 0 && laiziCards_2.length == 0) || 
                        laiziCards_1.length > 0 && laiziCards_2.length > 0) {
                        // 同硬同软
                        return this.calCardsValue(cards,areaSelectMode) > this.calCardsValue(lastCards,areaSelectMode);
                    } else {
                        // 一硬一软
                        return laiziCards_1.length == 0;
                    }
                } else if (cardType == CARDTPYE.gunlong || cardType == CARDTPYE.eightxigunlong) {
                    var diff_1 = this.calPoint(cards[cards.length - 1]) - this.calPoint(cards[0]);
                    var diff_2 = this.calPoint(lastCards[lastCards.length - 1]) - this.calPoint(lastCards[0]);

                    if (diff_1 != diff_2) {
                        // 张数一样，最大同张数，张数越多越大
                        return diff_2 > diff_1;
                    } else {
                        var laiziCards_1 = this.getLaiziCardsFromRet(cards);
                        var laiziCards_2 = this.getLaiziCardsFromRet(lastCards);

                        if ((laiziCards_1.length == 0 && laiziCards_2.length == 0) || 
                            laiziCards_1.length > 0 && laiziCards_2.length > 0) {
                            // 同硬同软
                            return this.calCardsValue(cards,areaSelectMode) > this.calCardsValue(lastCards,areaSelectMode);
                        } else {
                            // 一硬一软
                            return laiziCards_1.length == 0;
                        }
                    }
                }
            } else if (cardType == CARDTPYE.zhadan || cardType == CARDTPYE.sevenxi || 
                cardType == CARDTPYE.eightxi || cardType == CARDTPYE.wangzha) {
                // 炸弹、七八喜、王炸，张数多的大
                return cards.length > lastCards.length;
            } else if (cardType == CARDTPYE.gunlong || cardType == CARDTPYE.eightxigunlong) {
                // 滚龙先比最大同张数，张数越多越大。再比连滚长度，长度越长越大

                var maxCount_1 = 0;
                var maxCount_2 = 0;

                for (var i = 0; i < cards.length; i++) {
                    if (this.calPoint(cards[i]) == this.calPoint(cards[i+1]))
                        maxCount_1++;
                    else
                        break;
                }
                maxCount_1++;

                for (var i = 0; i < lastCards.length; i++) {
                    if (this.calPoint(lastCards[i]) == this.calPoint(lastCards[i+1]))
                        maxCount_2++;
                    else
                        break;
                }
                maxCount_2++;

                if (maxCount_1 != maxCount_2)
                    return maxCount_1 > maxCount_2;
                else
                    return cards.length > lastCards.length;
            }
        }
        else if (cardType > CARDTPYE.big && cardType > lastCardType) {
            return true;
        }

        return false;
    }; 
    
    // 检查是否能出牌
    PokerDaYeDaGong.prototype.checkPut = function (oHands, oCards, lastPutCard, areaSelectMode) {
        if (oCards && typeof(oCards)!='undefined' && oCards.length == 0) return null;

        if(!areaSelectMode && cc ) {
            areaSelectMode = MjClient.data.sData.tData.areaSelectMode;
        }

        var hands = oHands.slice();
        for (var i = 0; i < oCards.length; i++) {
            var p = hands.indexOf(oCards[i]);

            if (p >= 0) {
                hands.splice(p, 1);
            }
            else {
                p = hands.indexOf(this.getRealLaizi(oCards[i]));

                if (p >= 0) {
                    // 癞子
                    hands.splice(p, 1);
                }
                else
                    return null; // 手里没有这些牌
            }
        }

        if (this.canPut(oCards, lastPutCard, areaSelectMode)) {
            return hands; // 能打得过上家的牌
        }

        return null;
    };
    
    /**
     * 对手牌排序
     * @param {array} 
     * @param {number} sortType 1 = 花色排序, 2 = 张数排序, 0 ==普通牌型
     */
    PokerDaYeDaGong.prototype.sortHandCards = function(oCards, sortType) {
        var cards = oCards.slice();
        var commonCmp = this.cardValueCmp.bind(this);
        var cardValueCmp = this.cardValueCmp.bind(this);
        if (sortType == 1) { // 花色排序
            commonCmp = function (a, b) {
                var c1 = (a + 3) % 4;
                var c2 = (b + 3) % 4;
                if (c1 == c2)
                    return cardValueCmp(a, b);
                else
                    return c1 - c2;
            }.bind(this);
        }
        else if (sortType == 2) { // 张数排序
            var pointCounts = {};
            for (var i = 0; i < cards.length; i++) {
                increaseByKey(pointCounts, this.calPoint(cards[i]));
            }

            commonCmp = function (a, b) {
                var c1 = pointCounts[this.calPoint(a)];
                var c2 = pointCounts[this.calPoint(b)];
                if (c1 == c2)
                    return cardValueCmp(a, b);
                else
                    return c1 - c2;
            }.bind(this);
        }

        cards.sort(function(a, b) {
            return -commonCmp(a, b);
        });
        return cards;
    };
    
    // 找N张点数一样的牌
    PokerDaYeDaGong.prototype.findNSameCard = function (hands, point, n) {
        if (n <= 0)
            return [];

        for (var i = 0; i < hands.length; i++) {
            if (this.calPoint(hands[i]) == point && this.calPoint(hands[i + n - 1]) == point) {
                return hands.slice(i, i + n);
            }
        }
        return null;
    };
    
    /** 
     * 用laizi张癞子去拼出type牌型的牌
     * @param {array} hands 按点数按好序的牌
     * @param {array} laizis 所使用的癞子
     * @param {CARDTPYE} type 要拼出的牌型
     * @param {number} cardCount 目的牌张数
     */
    PokerDaYeDaGong.prototype.findCardByType = function(hands, laizis, type, cardCount, extras) {
        var rets = [];
        var laizi = laizis.length;

        var minCardCount = CARDCOUNT[type];

        if ((type == CARDTPYE.duizi || type == CARDTPYE.danpai || type == CARDTPYE.sanzhang || type == CARDTPYE.z_510k || type == CARDTPYE.f_510k) 
            && cardCount != minCardCount)
            return rets;

        if (laizi > cardCount || laizi + hands.length < cardCount || cardCount < minCardCount) {
            return rets;
        }

        if (cardCount == laizi) {
            if (type == CARDTPYE.danpai || type == CARDTPYE.duizi || type == CARDTPYE.sanzhang || type == CARDTPYE.wangzha)
                rets.push(laizis.slice());

            return rets;
        }

        // 癞子用作510K牌型（杂，纯）时，只能使用1张癞子。
        if ((type == CARDTPYE.f_510k || type == CARDTPYE.z_510k) && laizi > cardCount / 3)
            return rets;

        if (type == CARDTPYE.zhadan || type == CARDTPYE.duizi || type == CARDTPYE.sanzhang || 
            type == CARDTPYE.eightxi || type == CARDTPYE.sevenxi) { 

            var find78Xi = (type == CARDTPYE.eightxi || type == CARDTPYE.sevenxi);

            if (find78Xi && hands.length < minCardCount) {
                // 7、8喜要保证非癞子手牌张数足够
                return rets;
            }

            for (var i = MIN_POINT; i <= MAX_POINT; i++) {
                if (find78Xi && cardCount - laizi != minCardCount) {
                    // 7、8喜要保证找到指定张数的非癞子牌
                    continue;
                }

                if (!find78Xi && (cardCount - laizi == CARDCOUNT[CARDTPYE.sevenxi] || cardCount - laizi == CARDCOUNT[CARDTPYE.eightxi])) {
                    // 不找7、8喜，非癞子牌张数等于喜牌张数，放弃查找
                    continue;
                }

                var find = this.findNSameCard(hands, i, cardCount - laizi);

                if (!find)
                    continue;

                if (laizi > 0) {
                    for (var j = 0; j < laizi; j++) {
                        find.push(this.replaceLaizi(laizis[j],i,find));
                    }
                }
                rets.push(find);
            }
        }
        else if (type == CARDTPYE.liandui || type == CARDTPYE.sanshun || type == CARDTPYE.gunlong || type == CARDTPYE.eightxigunlong) {
            var step = 2;
            if (type == CARDTPYE.sanshun)
                step = 3;
            else if (type == CARDTPYE.gunlong) {
                extras = extras || {};
                step = extras.step || 4;
                step = Math.max(4,step);
            } else if (type == CARDTPYE.eightxigunlong) {
                extras = extras || {};
                step = extras.step || 8;
                step = Math.max(8,step);
            }

            if (cardCount % step != 0)
                return rets;

            var findEightGunLong = (type == CARDTPYE.eightxigunlong);

            if (findEightGunLong && hands.length < 12)
                return rets;

            var pointCounts = {};
            for (var i = 0; i < hands.length; i++) {
                increaseByKey(pointCounts, this.calPoint(hands[i]));
            }
            for (var i = MIN_POINT; i <= TWO_POINT; i++) {
                if (!pointCounts[i])
                    pointCounts[i] = 0;
            }

            if (findEightGunLong) {
                // 8喜滚龙要保证至少有一个相同点数的牌为8张
                var bEnough = false;
                for (var i in pointCounts) {
                    if (pointCounts[i] >= 8) {
                        bEnough = true;
                        break
                    }
                }

                if (!bEnough)
                    return rets;
            }

            for (var i = MIN_POINT; i <= APOINT - cardCount / step + 1; i++) {
                var ret = [];
                var laizisCopy = laizis.slice();
                var laiziUsed = 0;
                var bEnough = !findEightGunLong;

                for (var j = 0; j < cardCount / step; j++) {
                    var p = i + j;

                    laiziUsed = step - pointCounts[p];
                    laiziUsed = Math.max(0,laiziUsed);

                    if (laiziUsed > laizisCopy.length) {
                        // 癞子不够
                        break;
                    }

                    if (!bEnough && pointCounts[p] >= 8)
                        bEnough = true;

                    var find = this.findNSameCard(hands, p, step - laiziUsed);
                    if (laiziUsed > 0) {
                        for (var k = 0; k < laiziUsed; k++) {
                            find.push(this.replaceLaizi(laizisCopy[k],p,find));
                        }

                        laizisCopy.splice(0,laiziUsed);
                    }
                    ret = ret.concat(find);
                }

                if (ret.length == cardCount && laizisCopy.length == 0 && bEnough) {
                    rets.push(ret);
                }
            }
        }
        else if(type == CARDTPYE.z_510k)
        {
            var replaceLaizi = function(point,flower,laiziValue) {
                return this.addLaiziSign(point * 4 - 3 + flower,laiziValue);
            }.bind(this);

            var findZ510K = function(newHands,newLaizis) {
                var rets = [];
                var cards510k = [[],[],[]];

                for (var i = 0; i < newHands.length; i++) {
                    var curPoint = this.calPoint(newHands[i]);

                    if (curPoint == 5)
                        cards510k[0].push(newHands[i]);
                    else if (curPoint == 10)
                        cards510k[1].push(newHands[i]);
                    else if (curPoint == KPOINT)
                        cards510k[2].push(newHands[i]);
                }

                if (cards510k[0].length <= 0 && cards510k[1].length <= 0 && cards510k[2].length <= 0) {
                    // 没有5、10、k
                    return rets;
                }

                if (newLaizis.length == 2) {
                    var replacePoints = [[10,KPOINT],[5,KPOINT],[5,10]];
                    for (var i = 0; i < cards510k.length; i++) {
                        if (cards510k[i].length <= 0)
                            continue;

                        var flowers = [0,1,2,3];
                        flowers.splice(flowers.indexOf(this.calFlower(cards510k[i][0])),1);
                        rets.push([cards510k[i][0],replaceLaizi(replacePoints[i][0],flowers[Math.floor(Math.random() * 3) % 3],newLaizis[0]),replaceLaizi(replacePoints[i][1],flowers[Math.floor(Math.random() * 3) % 3],newLaizis[1])]);
                        
                        break;
                    }
                } else if (newLaizis.length == 1) {
                    var replacePoints = [5,10,KPOINT];

                    for (var i = 0; i < cards510k.length; i++) {
                        if (cards510k[i].length > 0)
                            replacePoints.splice(replacePoints.indexOf(this.calPoint(cards510k[i][0])),1);
                    }

                    if (replacePoints.length >= 2) 
                        return rets;

                    if (replacePoints.length == 1)
                        var replacePoint = replacePoints[0];
                    else
                        var replacePoint = KPOINT;

                    replacePoints = [5,10,KPOINT];
                    var replaceIndex = replacePoints.indexOf(replacePoint);
                    var flowers = [0,1,2,3];
                    flowers.splice(flowers.indexOf(this.calFlower(cards510k[(replaceIndex + 1) % 3][0])),1);

                    var index = flowers.indexOf(this.calFlower(cards510k[(replaceIndex + 2) % 3][0]));
                    if (index >= 0)
                        flowers.splice(index,1);

                    rets.push([cards510k[(replaceIndex + 1) % 3][0],cards510k[(replaceIndex + 2) % 3][0],replaceLaizi(replacePoint,flowers[Math.floor(Math.random() * flowers.length) % flowers.length],newLaizis[0])]);
                } else if (cards510k[0].length > 0 && cards510k[1].length > 0 && cards510k[2].length > 0) {
                    // 无癞子
                    for (var i = 0; i < cards510k[0].length; i++)
                    {
                        var flower_0  = this.calFlower(cards510k[0][i]);

                        for (var j = 0; j < cards510k[1].length; j++)
                        {
                            var flower_1  = this.calFlower(cards510k[1][j]);

                            for (var k = 0; k < cards510k[2].length; k++)
                            {
                                if (flower_0 != flower_1 || flower_1 != this.calFlower(cards510k[2][k])) {
                                    rets.push([cards510k[0][i], cards510k[1][j], cards510k[2][k]]);
                                    break
                                }
                            }

                            if (rets.length > 0)
                                break;
                        }

                        if (rets.length > 0)
                            break;
                    }
                }

                return rets;
            }.bind(this);
            
            rets = findZ510K(hands,laizis);
        }
        else if(type == CARDTPYE.f_510k)
        {
            var replaceLaizi = function(point,flower,laiziValue) {
                return this.addLaiziSign(point * 4 - 3 + flower,laiziValue);
            }.bind(this);

            var findF510K = function(newHands,newLaizis) {
                var cards510k = [[],[],[]];
                var rets = [];

                for (var i = 0; i < newHands.length; i++) {
                    var curPoint = this.calPoint(newHands[i]);

                    if (curPoint == 5)
                        cards510k[0].push(newHands[i]);
                    else if (curPoint == 10)
                        cards510k[1].push(newHands[i]);
                    else if (curPoint == KPOINT)
                        cards510k[2].push(newHands[i]);
                }

                if (cards510k[0].length <= 0 && cards510k[1].length <= 0 && cards510k[2].length <= 0) {
                    // 没有5、10、k
                    return rets;
                }

                if (newLaizis.length == 2) {
                    var replacePoints = [[10,KPOINT],[5,KPOINT],[5,10]];
                    for (var i = 0; i < cards510k.length; i++) {
                        if (cards510k[i].length <= 0)
                            continue;

                        var flower = this.calFlower(cards510k[i][0]);
                        rets.push([cards510k[i][0],replaceLaizi(replacePoints[i][0],flower,newLaizis[0]),replaceLaizi(replacePoints[i][1],flower,newLaizis[1])]);
                        
                        break;
                    }
                } else if (newLaizis.length == 1) {
                    var replacePoints = [5,10,KPOINT];

                    for (var i = 0; i < cards510k.length; i++) {
                        if (cards510k[i].length > 0)
                            replacePoints.splice(replacePoints.indexOf(this.calPoint(cards510k[i][0])),1);
                    }

                    if (replacePoints.length >= 2) 
                        return rets;

                    if (replacePoints.length == 1)
                        var replacePoint = replacePoints[0];
                    else
                        var replacePoint = KPOINT;

                    replacePoints = [5,10,KPOINT];
                    var replaceIndex = replacePoints.indexOf(replacePoint);
                    var searchIndex_0 = (replaceIndex + 1) % 3;
                    var searchIndex_1 = (replaceIndex + 2) % 3;

                    for (var i = 0; i < cards510k[searchIndex_0].length; i++)
                    {
                        var flower_0  = this.calFlower(cards510k[searchIndex_0][i]);

                        for (var j = 0; j < cards510k[searchIndex_1].length; j++)
                        {
                            if (flower_0 == this.calFlower(cards510k[searchIndex_1][j])) {
                                rets.push([cards510k[searchIndex_0][i], cards510k[searchIndex_1][j], replaceLaizi(replacePoint,flower_0,newLaizis[0])]);
                                break
                            }
                        }

                        if (rets.length > 0)
                            break;
                    }
                } else if (cards510k[0].length > 0 && cards510k[1].length > 0 && cards510k[2].length > 0) {
                    // 无癞子
                    for (var i = 0; i < cards510k[0].length; i++)
                    {
                        var flower_0  = this.calFlower(cards510k[0][i]);

                        for (var j = 0; j < cards510k[1].length; j++)
                        {
                            var flower_1  = this.calFlower(cards510k[1][j]);

                            for (var k = 0; k < cards510k[2].length; k++)
                            {
                                if (flower_0 == flower_1 && flower_1 == this.calFlower(cards510k[2][k])) {
                                    rets.push([cards510k[0][i], cards510k[1][j], cards510k[2][k]]);
                                    break
                                }
                            }

                            if (rets.length > 0)
                                break;
                        }

                        if (rets.length > 0)
                            break;
                    }
                }

                return rets;
            }.bind(this);

            rets = findF510K(hands,laizis);
        }
        else if (type == CARDTPYE.danpai) {
            for (var i = MIN_POINT; i <= MAX_POINT; i++) 
            {
                for (var j = 0; j < hands.length; j++) {
                    if (this.calPoint(hands[j]) == i) {
                        rets.push([hands[j]]);
                        break;
                    }
                }
            }
        }
    
        return rets;
    };

    // 压牌提示
    PokerDaYeDaGong.prototype.findTipsForBackHand = function(oHands,oLastCards,areaSelectMode) {
        var hands = [];
        var handLaizis = this.transformAndGetLaizi(oHands, hands);
        var lastCardType = this.calType(oLastCards);

        // 如果只剩下癞子
        if (handLaizis.length == oHands.length) {
            if (handLaizis.length >= 4) {
                return [handLaizis.slice()];
            } else if ((lastCardType == CARDTPYE.sanzhang || lastCardType == CARDTPYE.duizi || lastCardType == CARDTPYE.danpai) && 
                handLaizis.length >= oLastCards.length) {
                var ret = handLaizis.slice(0,oLastCards.length);

                if (this.canPut(ret, oLastCards, areaSelectMode))
                    return [ret];
            }

            return [];
        }

        var lastCards = oLastCards.slice();
        lastCards.sort(this.cardValueCmp.bind(this));

        var pointCounts = {};
        for (var i = 0; i < hands.length; i++) {
            increaseByKey(pointCounts, this.calPoint(hands[i]));
        }

        var laiziCards = this.getLaiziCardsFromRet(oLastCards);
        var findRets = function(laizis) {
            var rets = [];
            var tempRets = [];
            var laizi = laizis.length;

            var putOrder = [
                {cardType: CARDTPYE.z_510k,cardCount: 3},
                {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 0},
                {cardType: CARDTPYE.zhadan,cardCount: 4},
                {cardType: CARDTPYE.sevenxi,cardCount: 7},
                {cardType: CARDTPYE.gunlong,cardCount: 8,step: 4},
                {cardType: CARDTPYE.eightxi,cardCount: 8},
                {cardType: CARDTPYE.eightxigunlong,cardCount: 16,step: 8},
            ];

            // 王炸
            if (laizi >= 4)
                putOrder.push({cardType: CARDTPYE.wangzha,cardCount: 4});

            if (lastCardType < CARDTPYE.big) {
                putOrder.unshift({cardType: lastCardType,cardCount: oLastCards.length});
            } else {
                var typeIndex = -1;
                for (var i = 0; i < putOrder.length; i++) {
                    if (putOrder[i].cardType == lastCardType) {
                        typeIndex = i;
                        break
                    }
                }

                if (lastCardType == CARDTPYE.z_510k) {
                    putOrder = putOrder.slice(typeIndex + 1);

                } else if (lastCardType == CARDTPYE.f_510k) {
                    putOrder = putOrder.slice(typeIndex);
                    putOrder[0].flower = this.calFlower(oLastCards[0]) + 1;

                } else if (lastCardType == CARDTPYE.zhadan || lastCardType == CARDTPYE.sevenxi || lastCardType == CARDTPYE.eightxi) {
                    putOrder = putOrder.slice(typeIndex);
                    putOrder[0].cardCount = (laizi > 0 && laiziCards.length <= 0 ? oLastCards.length + 1 : oLastCards.length);

                } else if (lastCardType == CARDTPYE.gunlong || lastCardType == CARDTPYE.eightxigunlong) {
                    var diff = this.calPoint(lastCards[lastCards.length - 1]) - this.calPoint(lastCards[0]) + 1;

                    putOrder = putOrder.slice(typeIndex);
                    putOrder[0].step = oLastCards.length / diff;
                    putOrder[0].cardCount = putOrder[0].step * (diff + (laizi > 0 && laiziCards.length <= 0 ? 1 : 0));
                } else if (lastCardType == CARDTPYE.wangzha)
                    putOrder = [];
            }

            for (var i = 0; i < putOrder.length; i++) {
                var orderItem = putOrder[i];

                if (orderItem.cardType < CARDTPYE.big) {
                    tempRets = this.findCardByType(hands, laizis, orderItem.cardType, orderItem.cardCount);

                    for (var j = 0; j < tempRets.length; j++) {
                        if (this.canPut(tempRets[j], oLastCards, areaSelectMode)) {
                            if (laizi > 0)
                                return [tempRets[j]];

                            rets.push(tempRets[j]);
                        }
                    }
                } else if (orderItem.cardType == CARDTPYE.z_510k) {
                    tempRets = this.findCardByType(hands, laizis, orderItem.cardType, orderItem.cardCount);

                    if (tempRets.length > 0) {
                        if (laizi > 0)
                            return [tempRets[0]];

                        rets.push(tempRets[0]);
                    }
                } else if (orderItem.cardType == CARDTPYE.f_510k) {
                    while (orderItem.flower <= 3) {
                        tempRets = this.findCardByType(hands, laizis, orderItem.cardType, orderItem.cardCount, {flower: orderItem.flower});

                        if (tempRets.length > 0) {
                            if (laizi > 0)
                                return [tempRets[0]];

                            rets.push(tempRets[0]);
                            break;
                        } else {
                            orderItem.flower++;
                        }
                    }
                } else if (orderItem.cardType == CARDTPYE.zhadan || orderItem.cardType == CARDTPYE.sevenxi || orderItem.cardType == CARDTPYE.eightxi) {
                    var find78Xi = orderItem.cardType == CARDTPYE.sevenxi || orderItem.cardType == CARDTPYE.eightxi;
                    var validCounts = [];

                    for (var p in pointCounts) {
                        // 找7、8喜，非癞子牌数不等于7或8，丢弃
                        if (find78Xi && pointCounts[p] != CARDCOUNT[orderItem.cardType])
                            continue;

                        // 找一般炸弹，非癞子牌数等于7或8，丢弃
                        if (!find78Xi && (pointCounts[p] == CARDCOUNT[CARDTPYE.sevenxi] || pointCounts[p] == CARDCOUNT[CARDTPYE.eightxi]))
                            continue;

                        // 保证炸弹只提取套牌
                        var newCount = pointCounts[p] + laizi;
                        if (newCount >= orderItem.cardCount && validCounts.indexOf(newCount) < 0)
                            validCounts.push(newCount);
                    }

                    validCounts.sort(function(a,b) {
                        return a - b;
                    });

                    for (var j = 0; j < validCounts.length; j++) {
                        tempRets = this.findCardByType(hands, laizis, orderItem.cardType, validCounts[j]);

                        for (var k = 0; k < tempRets.length; k++) {
                            if (pointCounts[this.calPoint(tempRets[k][0])] + laizi > validCounts[j]) {
                                // 存在该点数更长的炸弹，则丢弃短的结果
                                continue;
                            }

                            if (this.canPut(tempRets[k], oLastCards, areaSelectMode)) {
                                if (laizi > 0)
                                    return [tempRets[k]];

                                rets.push(tempRets[k]);
                            }
                        }
                    }
                } else if (orderItem.cardType == CARDTPYE.gunlong || orderItem.cardType == CARDTPYE.eightxigunlong) {
                    var breakFinding = false;
                    var lianAdded = (orderItem.cardCount / orderItem.step > 2);
                    
                    while (true) {
                        tempRets = this.findCardByType(hands, laizis, orderItem.cardType, orderItem.cardCount, {step: orderItem.step});

                        if (tempRets.length > 0) {
                            for (var j = 0; j < tempRets.length; j++) {
                                if (this.canPut(tempRets[j], oLastCards, areaSelectMode)) {
                                    if (laizi > 0)
                                        return [tempRets[j]];

                                    rets.push(tempRets[j]);
                                    breakFinding = true;
                                    break;
                                }
                            }

                            if (breakFinding) {
                                // 滚龙系列只取最小的一组结果，找到能压的，就结束
                                break;
                            } else {
                                // 找到的滚龙打不动被压牌，增加连数继续找
                                orderItem.cardCount += orderItem.step;
                                lianAdded = true;
                            }
                        } else if (lianAdded) {
                            // 滚龙连数增加引起的找不到，则增加相同点数的张数，重新找
                            orderItem.step += 1;
                            orderItem.cardCount = 2 * orderItem.step;
                            lianAdded = false;
                        } else {
                            // 不是滚龙增加连数引起的找不到，则立即结束
                            break;
                        }
                    }
                } else if (orderItem.cardType == CARDTPYE.wangzha) {
                    return [laizis.slice()];
                }
            }

            if (rets.length > 0)
                return rets;

            return null;
        }.bind(this);

        // 先找不带癞子的结果
        var found = findRets([]);
        if (found)
            return found;

        // 使用最少的癞子找到满足挑拣的结果
        for (var i = 0; i < handLaizis.length; i++) {
            found = findRets(handLaizis.slice(0,i+1));
            if (found)
                return found;
        }

        return [];
    }
    
    /**
     * 提示可出的牌
     * @param  {array} oHands 我的手牌
     * @param  {array} oLastCards 上家出的牌
     * @return {array} 提示的牌
     */
    PokerDaYeDaGong.prototype.tipCards = function(oHands, oLastCards, areaSelectMode) {
        if (!oHands || oHands.length <= 0)
            return [];

        if (!oLastCards || oLastCards.length <= 0) {
            // 先手
            return [];
        } else {
            return this.findTipsForBackHand(oHands,oLastCards,areaSelectMode);
        }
    };

    /**
     * 从一组提示中找到由癞子代替的牌
     * @param {array} ret 一组结果
     */
    PokerDaYeDaGong.prototype.getLaiziCardsFromRet = function(ret) {
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
    PokerDaYeDaGong.prototype.getRealLaizi = function(laiziCard) {
        if (!laiziCard)
            return -1;

        if (!this.haveLaiziSign(laiziCard))
            return -1;

        var muti = Math.floor(laiziCard / LAI_ZI_SIGN);
        if (muti == 4)
            return RED_JOKER;
        else if (muti == 3)
            return BLACK_JOKER;

        laiziCard = this.removeLaiziSign(laiziCard);

        var modValue = laiziCard % 4;
        if (modValue == 0)
            return BLACK_JOKER;
        else if (modValue == 3)
            return RED_JOKER;

        return -1;
    };

    /**
     * 给牌值加上癞子标记
     * @cardValue {number} 
     */
    PokerDaYeDaGong.prototype.addLaiziSign = function(cardValue,laiziValue) {
        if (laiziValue == RED_JOKER)
            return cardValue + 4 * LAI_ZI_SIGN;
        else if (laiziValue == BLACK_JOKER)
            return cardValue + 3 * LAI_ZI_SIGN;

        return cardValue + LAI_ZI_SIGN;
    }

    /**
     * 给牌值去掉癞子标记
     * @cardValue {number} 
     */
    PokerDaYeDaGong.prototype.removeLaiziSign = function(cardValue) {
        return cardValue % LAI_ZI_SIGN;
    }

    /**
     * 是否带有癞子标记
     * @cardValue {number} 
     */
    PokerDaYeDaGong.prototype.haveLaiziSign = function(cardValue) {
        return cardValue > LAI_ZI_SIGN;
    }

    /**
     * 将癞子替换为牌值
     * @laiziValue {number} 癞子值，大小王、花牌
     * @point {number} 想要替换的目的点数
     * @cards {array} 包含目的点数的牌组，用于区分已有目的点数的花色
     */
    PokerDaYeDaGong.prototype.replaceLaizi = function(laiziValue,point,cards) {
        var realPoint = function(originalPoint) {
            if (originalPoint == APOINT)
                return 1;
            else if (originalPoint == TWO_POINT)
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
                return this.addLaiziSign(point * 4 - 3 + flowers[Math.floor(Math.random() * flowers.length) % flowers.length],laiziValue);
            }
        }

        // 大王返回红桃、小王返回黑桃、花牌返回梅花
        if (laiziValue == RED_JOKER)
            return this.addLaiziSign(point * 4 - 1);
        else if (laiziValue == BLACK_JOKER)
            return this.addLaiziSign(point * 4);

        return -1;
    }

    /**
     * 返回癞子单出的点数
     */
    PokerDaYeDaGong.prototype.getLaiziPoint = function(areaSelectMode) {
        if (areaSelectMode.laiziPoint == 1)
            return APOINT;
        else if (areaSelectMode.laiziPoint == 2)
            return TWO_POINT;

        return areaSelectMode.laiziPoint;
    }

    PokerDaYeDaGong.prototype.pointCountsExceptLaizi = function(cards) {
        var pointCounts = {};

        for (var i = 0; i < cards.length; i++) {
            if (this.haveLaiziSign(cards[i]))
                continue;

            increaseByKey(pointCounts, this.calPoint(cards[i]));
        }

        return pointCounts;
    }
    
    
    if(typeof(module)!="undefined" && module.exports)    
        module.exports = PokerDaYeDaGong;
    
    if(typeof(MjClient)!="undefined")
        MjClient.majiang_PokerDaYeDaGong = new PokerDaYeDaGong();
    
})();