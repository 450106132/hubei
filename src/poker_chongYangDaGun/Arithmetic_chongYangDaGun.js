// 崇阳打滚算法类
(function() {
    function PokerChongYangDaGun() {
        this.handCount = 0; // 置为零，为了自主发牌
    }
    
    var LAI_ZI_SIGN = 100;
    var RED_JOKER = 54;
    var BLACK_JOKER = 53;
    var HUA_CARD = 55;
    var MIN_POINT = 3;
    var KPOINT = 13;
    var APOINT = 14;
    var TWO_POINT = 16;
    var LAI_ZI_POINT = 18;
    var MAX_POINT = TWO_POINT; 

    // 牌型排序优先级 和 id
    var CARDTPYE = {
        zhadan: 130,
        f_510k:120,
        z_510k:110,
        big: 100, // 大牌分界线
        sanshun:5,
        liandui:4,
        sanzhang:3,
        duizi:2,
        danpai:1
    };

    PokerChongYangDaGun.prototype.CARDTPYE = CARDTPYE;

    var CARDCOUNT = {};
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
    PokerChongYangDaGun.prototype.randomCards = function(areaSelectMode, tData) {
        var cards = [];

        //两副牌
        for (var i = 1; i <= 54; i++) {
            cards.push(i);
            cards.push(i);
        }

        // 加入花牌
        for (var i = 0; i < areaSelectMode.huaCardNum; i++) {
            cards.push(HUA_CARD);
        }

        // 切牌
        cards = shuffleArray(cards);

        return cards;
    };

    PokerChongYangDaGun.prototype.isLaizi = function(card) {
        card = this.removeLaiziSign(card);
        return card == RED_JOKER || card == BLACK_JOKER || card == HUA_CARD;
    };

    PokerChongYangDaGun.prototype.isHuaCard = function(card) {
        card = this.removeLaiziSign(card);
        return card == HUA_CARD;
    };

    PokerChongYangDaGun.prototype.isWang = function(card) {
        card = this.removeLaiziSign(card);
        return card == RED_JOKER || card == BLACK_JOKER;
    };
    
    /**
     * 计算牌点数
     * @param {number} num
     * @return {number}
     */
    PokerChongYangDaGun.prototype.calPoint = function(num) {
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
    PokerChongYangDaGun.prototype.calFlower = function(num) {
        num = this.removeLaiziSign(num);
        return (num + 3) % 4;
    }
    
    /**
     * 判断是否为3顺  : 555666 , 555666777
     * @param  {array} oCards 按点数排序好的牌
     * @return {boll} 
     */
    PokerChongYangDaGun.prototype.isSanShun = function(oCards) { //cards有序
        if (!oCards) {
            return false;
        }

        var cardCount = oCards.length;
        if (cardCount < CARDCOUNT[CARDTPYE.sanshun] || cardCount % 3 != 0 || this.calPoint(oCards[oCards.length - 1]) >= TWO_POINT) {
            return false; // 非6张、有大小王或2不会是顺子
        }

        var pointCounts = {};
        for (var i = 0; i < cardCount; i++) {
            increaseByKey(pointCounts, this.calPoint(oCards[i]));
        }

        // 补充逻辑
        for (var point in pointCounts) {
            // 每个点数的牌的张数不等于3
            if (pointCounts[point] != 3)
                return false;
        }
            
        var numCount = Object.keys(pointCounts).length;
        return numCount == cardCount / 3 && this.calPoint(oCards[0]) + numCount - 1 == this.calPoint(oCards[oCards.length - 1]);
    };
    
    /**
     * 判断是否是同花
     * @param {array} oCards 按点数排好序的牌
     * @return {bool}
     */
    PokerChongYangDaGun.prototype.isTongHua = function(oCards) {
        if (!oCards || oCards.length <= 0)
            return false;
    
        var flower = this.calFlower(oCards[0]);
        for (var i = 0; i < oCards.length; i++) {
            if (this.calFlower(oCards[i]) != flower)
                return false;
        }
    
        return true;
    };
    
    /**
     * 判断是否是5,10,k
     * @param {array} oCards 按点数排好序的牌
     * @return {bool}
     */
    PokerChongYangDaGun.prototype.is510K = function(oCards) {
        if (!oCards || oCards.length != 3)
            return false;
    
        var targets = [5, 10, KPOINT];
        var points = [];

        for (var i = 0; i < oCards.length; i++)
        {
            points.push(this.calPoint(oCards[i]));
        }
        for(var i = 0; i < targets.length; i++)
        {
            if (points.indexOf(targets[i]) < 0) 
                return false;
        }
    
        return true;
    };
    
    /**
     * 判断是否是同花5,10,k
     * @param {array} oCards 按点数排好序的牌
     * @return {bool}
     */
    PokerChongYangDaGun.prototype.isTongHua510K = function(oCards) {
        return this.is510K(oCards) && this.isTongHua(oCards);
    };

    /**
     * 判断是否是连对
     * @param {array} oCards 按点数排好序的牌
     * @return {bool}
     */
    PokerChongYangDaGun.prototype.isLiandui = function(oCards) { //oCards有序
        var cardNum = CARDCOUNT[CARDTPYE.liandui];// 连对最小牌数

        if (!oCards || oCards.length < cardNum || oCards.length % 2 != 0)
            return false;
        
        var cardCount = oCards.length;
        var points = [];
        for (var i = 0; i < oCards.length; i++) {
            points.push(this.calPoint(oCards[i]));
        }

        for (var i = 0; i < cardCount - 2; i += 2) {
            var abs = Math.abs(points[i] - points[i + 2]);
            if ( abs != 1 || (points[i + 1] != points[i]) ||  (points[i + 2] != points[i + 3]) )  return false;
        }

        return true;
    };

    /**
     * 计算牌型
     * @param {array} cards 按点数排好序的牌
     * @return {CARDTPYE} 牌型，-1 = 不成型
     */
    PokerChongYangDaGun.prototype.calType = function(oCards) {
        if (!oCards)
            return -1;

        var cards = oCards.slice();
        cards.sort(this.cardValueCmp.bind(this));

        var cardCount = cards.length;
        var allSame = this.calPoint(cards[0]) == this.calPoint(cards[cards.length - 1]);
    
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
        var maxCount = 0; // 最多有几张点数最多的牌
        for (var p in pointCounts) {
            if (maxCount < pointCounts[p]) {
                maxCount = pointCounts[p];
            }
        }
    
        //3顺
        if(cardCount >= CARDCOUNT[CARDTPYE.sanshun] && maxCount == 3 && this.isSanShun(cards)){
            return CARDTPYE.sanshun;
        }
    
        // 同花510k
        if (cardCount == CARDCOUNT[CARDTPYE.f_510k] && maxCount == 1 && this.isTongHua510K(cards))
            return CARDTPYE.f_510k;
    
        // 510k
        if (cardCount == CARDCOUNT[CARDTPYE.z_510k] && maxCount == 1 && this.is510K(cards))
            return CARDTPYE.z_510k;
    
    
        // 连对，2对起
        if (cardCount >= CARDCOUNT[CARDTPYE.liandui] && maxCount == 2 && this.isLiandui(cards))
            return CARDTPYE.liandui;
    
        //炸弹
        if (cardCount >= CARDCOUNT[CARDTPYE.zhadan] && allSame)
            return CARDTPYE.zhadan;
    
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
    
    PokerChongYangDaGun.prototype.cardsType = function(cards) {
        return this.calType(cards)
    }
    
    // 计算牌型点数
    PokerChongYangDaGun.prototype.calCardsValue = function (oCards) {
        if (!oCards)
            return -1;

        var cardCount = oCards.length;
        if (oCards.length == 0) {
            return -1;
        }

        // 癞子单出的点数
        if (cardCount <= 2) {
            var allLaizi = true;

            for (var i = 0; i < oCards.length; i++) {
                if (!this.isLaizi(oCards[i])) {
                    allLaizi = false;
                    break;
                }
            }

            if (allLaizi)
                return MIN_POINT;
        }

        return this.calPoint(oCards[cardCount - 1]);
    };
    
    // 牌点比较函数（从小到大）
    PokerChongYangDaGun.prototype.cardValueCmp = function(a, b) {
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
    PokerChongYangDaGun.prototype.transformAndGetLaizi = function(oCards, cards) {
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
    PokerChongYangDaGun.prototype.canPut = function(oCards, oLastCards) {
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
                // 相同牌型，张数相等，比大小
                return this.calCardsValue(cards) > this.calCardsValue(lastCards);
            } else if (cardType == CARDTPYE.zhadan) {
                // 炸弹，张数多的大
                return cards.length > lastCards.length;
            }
        }
        else if (cardType > CARDTPYE.big && cardType > lastCardType) {
            return true;
        }

        return false;
    }; 
    
    // 检查是否能出牌
    PokerChongYangDaGun.prototype.checkPut = function (oHands, oCards, lastPutCard) {
        if (oCards && typeof(oCards)!='undefined' && oCards.length == 0) return null;

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

        if (this.canPut(oCards, lastPutCard)) {
            return hands; // 能打得过上家的牌
        }

        return null;
    };
    
    /**
     * 对手牌排序
     * @param {array} 
     * @param {number} sortType 1 = 花色排序, 2 = 张数排序, 0 ==普通牌型
     */
    PokerChongYangDaGun.prototype.sortHandCards = function(oCards, sortType) {
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
                var p = this.calPoint(cards[i]);
                if (pointCounts[p])
                    pointCounts[p] ++;
                else
                    pointCounts[p] = 1;
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
    PokerChongYangDaGun.prototype.findNSameCard = function (hands, point, n) {
        for (var i = 0; i < hands.length; i++) {
            if (this.calPoint(hands[i]) == point && this.calPoint(hands[i + n - 1]) == point) {
                return hands.slice(i, i + n);
            }
        }
        return null;
    };
    
    PokerChongYangDaGun.prototype.findAllSameCard = function(hands, point) {
        var sameCards = []

        for (var i = 0; i < hands.length; i++) {
            var curPoint = this.calPoint(hands[i]);

            if (curPoint == point)
                sameCards.push(hands[i])
            else if (curPoint > point)
                break;
        }

        return sameCards;
    };
    
    PokerChongYangDaGun.prototype.indexOfCards = function(cardList, cards) {
        for(var i = 0; i < cardList.length; i++) {
            var tmpCards = cardList[i];
            if( this.isSameCards(tmpCards, cards) )
                return true;
        }
        return false;
    }
    
    PokerChongYangDaGun.prototype.isSameCards = function(cards1, cards2) {
        if(cards1.length != cards2.length) return false;
    
        for(var i in cards1){
            if(cards1[i] != cards2[i])
                return false;
        }
    
        return true;
    }

    /**
     * 列举集合里面 num 个元素的所有组合
     * @param  {array} parr 集合数组
     * @param  {number} num 元素个数
     * @return {array} num个元素的所有组合
     */
    PokerChongYangDaGun.prototype.lieju = function(parr, num){
        var tmps = [];
        var zhuhe = function(srcArr, eleNum, tagArr){
            if (eleNum == 0) 
                return tagArr;

            var newZhuHe = [];

            if (!tagArr) {
                tagArr = [];
                tagArr.push(srcArr[0]);
                newZhuHe.push(tagArr);
            } else {
                for (var i = 0; i < tagArr.length; i++){
                    for(var j = i; j < srcArr.length; j++){
                        newZhuHe.push(tagArr[i].concat(srcArr[j]));
                    }
                }
            }

            return zhuhe(srcArr.slice(1, srcArr.length), --eleNum, newZhuHe);
        }.bind(this);

        for (var i = 0; i < parr.length-num+1; i++){
            var tmp = zhuhe(parr.slice(i, parr.length), num) ;
            if(tmp) 
                tmps = tmps.concat(tmp);
        }

        return tmps;
    }
    
    /** 
     * 用laizi张癞子去拼出type牌型的牌
     * @param {array} hands 按点数按好序的牌
     * @param {array} laizis 所使用的癞子
     * @param {CARDTPYE} type 要拼出的牌型
     * @param {number} cardCount 目的牌张数
     */
    PokerChongYangDaGun.prototype.findCardByType = function(hands, laizis, type, cardCount) {
        var rets = [];
        var laizi = laizis.length;

        var minCardCount = CARDCOUNT[type];

        if ((type == CARDTPYE.duizi || type == CARDTPYE.danpai || type == CARDTPYE.sanzhang || type == CARDTPYE.z_510k || type == CARDTPYE.f_510k) 
            && cardCount != minCardCount)
            return rets;

        if (laizi > cardCount || laizi + hands.length < cardCount || cardCount < minCardCount) {
            return rets;
        }

        if (laizi >= 3 && cardCount == laizi) {
            // 大于等于3张的癞子必须配其他牌。
            return rets;
        }

        // 癞子用作510K牌型（杂，纯）时，只能使用1张癞子。
        if ((type == CARDTPYE.f_510k || type == CARDTPYE.z_510k) && laizi >= 2)
            return rets;

        // 对结果挑拣、去重
        var pointsCache = {};
        var pushRets = function(rets, cards) {
            if (cards.length != cardCount)
                return;

            var ret = cards.slice();
            cards.sort(this.cardValueCmp.bind(this));

            var pointStr = ""
            for (var j = 0; j < ret.length; j++) {
                pointStr += this.calPoint(ret[j]) + "_";
            }

            if (pointsCache[pointStr])
                return;

            pointsCache[pointStr] = true;

            rets.push(cards);
        }.bind(this);

        if (type == CARDTPYE.zhadan || type == CARDTPYE.duizi || type == CARDTPYE.sanzhang) { 
            if (type == CARDTPYE.duizi && laizi == 2) {
                // 癞子单出，作为一对3
                pushRets(rets,laizis.slice());
            }
            else {
                for (var i = MIN_POINT; i <= MAX_POINT; i++) {
                    var find = this.findNSameCard(hands, i, cardCount - laizi);

                    if (find) {
                        if (laizi > 0) {
                            var cardsTransfered = [];

                            for (var j = 0; j < laizi; j++) {
                                cardsTransfered.push(this.replaceLaizi(laizis[j],i,find));
                            }

                            pushRets(rets,cardsTransfered.concat(find));
                        } else
                            pushRets(rets,find);
                    }
                }
            }
        }
        else if (type == CARDTPYE.liandui) {
            var findLianDui = function(rets,newHands) {
                for (var i = MIN_POINT; i <= APOINT - cardCount/2 + 1; i++) // 连对首张
                {
                    var ldCount = 0;
                    var ret = [];

                    for (var j = 0; j < cardCount/2; j++) 
                    {
                        var p = i + j;

                        for (var k = 0; k < newHands.length - 1; k++) 
                        {
                            var point1 = this.calPoint(newHands[k]);
                            var point2 = this.calPoint(newHands[k + 1]);

                            if (point1 != p || point2 != p)
                                continue;

                            ldCount += 2;
                            ret.push(newHands[k]);
                            ret.push(newHands[k + 1]);

                            break;
                        }
                    }

                    if (ldCount == cardCount) {
                        pushRets(rets,ret);
                    }
                }
            }.bind(this)
            
            if (laizi > 0) {
                var minPoint = Math.max(this.calPoint(hands[0]) - Math.floor(laizi/2),MIN_POINT);
                var maxPoint = Math.min(this.calPoint(hands[hands.length - 1]) + Math.floor(laizi/2),APOINT);

                // 最长的连对的点数
                var lianDuiPoints = [];
                for (var i = minPoint; i <= maxPoint; i++) {
                    lianDuiPoints.push(i);
                    lianDuiPoints.push(i);
                }

                // 形成最长连对所缺的点数
                for (var i = 0; i < hands.length; i++ ) {
                    var index = lianDuiPoints.indexOf(this.calPoint(hands[i]));

                    if (index >= 0)
                        lianDuiPoints.splice(index,1);
                }

                // 列举出laizi个癞子所能替换的所有点数
                var laiziPoints = this.lieju(lianDuiPoints,laizi);
                var pointsFilted = [] // 去重
                for (var i = 0; i < laiziPoints.length; i++) {
                    if (!this.indexOfCards(pointsFilted,laiziPoints[i]))
                        pointsFilted.push(laiziPoints[i]);
                }

                var newHands = hands.slice();
                for (var i = 0; i < pointsFilted.length; i++) {
                    for (var j = 0; j < newHands.length;) {
                        if (this.haveLaiziSign(newHands[j]))
                            newHands.splice(j,1);
                        else
                            j++;
                    }

                    for (var j = 0; j < laizi; j++) {
                        newHands.push(this.replaceLaizi(laizis[j],pointsFilted[i][j],newHands));
                    }

                    newHands.sort(this.cardValueCmp.bind(this));
                    findLianDui(rets,newHands);
                }
            } else
                findLianDui(rets,hands);
        }
        else if(type == CARDTPYE.sanshun)
        {
            var findSanShun = function(rets,newHands) {
                for (var i = MIN_POINT; i <= APOINT - cardCount/3 + 1; i++) // 连对首张
                {
                    var ldCount = 0;
                    var ret = [];

                    for (var j = 0; j < cardCount/3; j++) 
                    {
                        var p = i + j;

                        for (var k = 0; k < newHands.length - 1; k++) 
                        {
                            var point1 = this.calPoint(newHands[k]);
                            var point2 = this.calPoint(newHands[k + 1]);
                            var point3 = this.calPoint(newHands[k + 2]);

                            if (point1 != p || point2 != p || point3 != p)
                                continue;
        
                            ldCount += 3;
                            ret.push(newHands[k]);
                            ret.push(newHands[k + 1]);
                            ret.push(newHands[k + 2]);

                            break;
                        }
                    }

                    if (ldCount == cardCount) {
                        pushRets(rets,ret);
                    }
                }
            }.bind(this)

            if (laizi > 0) {
                var minPoint = Math.max(this.calPoint(hands[0]) - Math.floor(laizi/3),MIN_POINT);
                var maxPoint = Math.min(this.calPoint(hands[hands.length - 1]) + Math.floor(laizi/3),APOINT);

                // 最长的三顺的点数
                var lianSanZhangPoints = [];
                for (var i = minPoint; i <= maxPoint; i++) {
                    lianSanZhangPoints.push(i);
                    lianSanZhangPoints.push(i);
                    lianSanZhangPoints.push(i);
                }

                // 形成最长三顺所缺的点数
                for (var i = 0; i < hands.length; i++ ) {
                    var index = lianSanZhangPoints.indexOf(this.calPoint(hands[i]));

                    if (index >= 0)
                        lianSanZhangPoints.splice(index,1);
                }

                // 列举出laizi个癞子所能替换的所有点数
                var laiziPoints = this.lieju(lianSanZhangPoints,laizi);
                var pointsFilted = [] // 去重
                for (var i = 0; i < laiziPoints.length; i++) {
                    if (!this.indexOfCards(pointsFilted,laiziPoints[i]))
                        pointsFilted.push(laiziPoints[i]);
                }

                var newHands = hands.slice();
                for (var i = 0; i < pointsFilted.length; i++) {
                    for (var j = 0; j < newHands.length;) {
                        if (this.haveLaiziSign(newHands[j]))
                            newHands.splice(j,1);
                        else
                            j++;
                    }

                    for (var j = 0; j < laizi; j++) {
                        newHands.push(this.replaceLaizi(laizis[j],pointsFilted[i][j],newHands));
                    }

                    newHands.sort(this.cardValueCmp.bind(this));
                    findSanShun(rets,newHands);
                }
            } else
                findSanShun(rets,hands);
        } 
        else if(type == CARDTPYE.z_510k)
        {
            var replaceLaizi = function(point,flower,laiziValue) {
                return this.addLaiziSign(point * 4 - 3 + flower,laiziValue);
            }.bind(this);

            var cards510k = [[],[],[]];
            for (var i = 0; i < hands.length; i++) {
                var curPoint = this.calPoint(hands[i]);

                if (curPoint == 5)
                    cards510k[0].push(hands[i]);
                else if (curPoint == 10)
                    cards510k[1].push(hands[i]);
                else if (curPoint == KPOINT)
                    cards510k[2].push(hands[i]);
            }

            if (cards510k[0].length <= 0 && cards510k[1].length <= 0 && cards510k[2].length <= 0) {
                // 没有5、10、k
                return rets;
            }

            if (laizi == 2) {
                var replacePoints = [[10,KPOINT],[5,KPOINT],[5,10]];
                for (var i = 0; i < cards510k.length; i++) {
                    if (cards510k[i].length <= 0)
                        continue;

                    var flowers = [0,1,2,3];
                    flowers.splice(flowers.indexOf(this.calFlower(cards510k[i][0])),1);
                    pushRets(rets,[cards510k[i][0],replaceLaizi(replacePoints[i][0],flowers[Math.floor(Math.random() * 3) % 3],laizis[0]),replaceLaizi(replacePoints[i][1],flowers[Math.floor(Math.random() * 3) % 3],laizis[1])]);
                    
                    break;
                }
            } else if (laizi == 1) {
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

                pushRets(rets,[cards510k[(replaceIndex + 1) % 3][0],cards510k[(replaceIndex + 2) % 3][0],replaceLaizi(replacePoint,flowers[Math.floor(Math.random() * flowers.length) % flowers.length],laizis[0])]);
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
                                pushRets(rets,[cards510k[0][i], cards510k[1][j], cards510k[2][k]]);
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
        }
        else if(type == CARDTPYE.f_510k)
        {
            var replaceLaizi = function(point,flower,laiziValue) {
                return this.addLaiziSign(point * 4 - 3 + flower,laiziValue);
            }.bind(this);

            var cards510k = [[],[],[]];
            for (var i = 0; i < hands.length; i++) {
                var curPoint = this.calPoint(hands[i]);

                if (curPoint == 5)
                    cards510k[0].push(hands[i]);
                else if (curPoint == 10)
                    cards510k[1].push(hands[i]);
                else if (curPoint == KPOINT)
                    cards510k[2].push(hands[i]);
            }

            if (cards510k[0].length <= 0 && cards510k[1].length <= 0 && cards510k[2].length <= 0) {
                // 没有5、10、k
                return rets;
            }

            if (laizi == 2) {
                var replacePoints = [[10,KPOINT],[5,KPOINT],[5,10]];
                for (var i = 0; i < cards510k.length; i++) {
                    if (cards510k[i].length <= 0)
                        continue;

                    var flower = this.calFlower(cards510k[i][0]);
                    pushRets(rets,[cards510k[i][0],replaceLaizi(replacePoints[i][0],flower,laizis[0]),replaceLaizi(replacePoints[i][1],flower,laizis[1])]);
                    
                    break;
                }
            } else if (laizi == 1) {
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
                            pushRets(rets,[cards510k[searchIndex_0][i], cards510k[searchIndex_1][j], replaceLaizi(replacePoint,flower_0,laizis[0])]);
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
                                pushRets(rets,[cards510k[0][i], cards510k[1][j], cards510k[2][k]]);
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
        }
        else if (type == CARDTPYE.danpai) {
            if (laizi < 1) {
                for (var i = MIN_POINT; i <= MAX_POINT; i++) 
                {
                    for (var j = 0; j < hands.length; j++) {
                        if (this.calPoint(hands[j]) == i) {
                            rets.push([hands[j]]);
                            break;
                        }
                    }
                }
            } else {
                pushRets(rets,[laizis[0]]);
            }
        }
    
        return rets;
    };

    PokerChongYangDaGun.prototype.findFirstPutCards = function(oHands) {
        var handCount = oHands.length;

        if (handCount == 1) {
            // 一张直接出
            return oHands.slice();
        }

        var cards = [];
        var laizis = this.transformAndGetLaizi(oHands,cards);

        // 如果只剩癞子
        if (laizis.length == oHands.length) {
            return laizis.slice(0,laizis.length >= 2 ? 2 : 1);
        }

        // 两张以上找其他可能

        // 如果癞子+手牌能全部组合，就一手出完，如果不能再剔除癞子。
        var findTypes = [];
        if (handCount >= 4) {
            findTypes.push(CARDTPYE.zhadan);
            findTypes.push(CARDTPYE.sanshun);
            findTypes.push(CARDTPYE.liandui);
        } else if (handCount == 3) {
            findTypes.push(CARDTPYE.f_510k);
            findTypes.push(CARDTPYE.z_510k);
            findTypes.push(CARDTPYE.sanzhang);
        } else
            findTypes.push(CARDTPYE.duizi);
        
        for (var i = 0; i < findTypes.length; i++) {
            var rets = this.findCardByType(cards, laizis, findTypes[i], handCount);

            if (rets.length > 0) {
                return rets[0];
            }
        }

        // 癞子剔除后，存在510K，则把510K的组合剔除后，其余牌不拆牌检查剩余牌型组合。单张>对子>三张>连对>飞机>510K>炸弹

        var typeRets = {};
        findTypes = [
            CARDTPYE.f_510k,CARDTPYE.z_510k,CARDTPYE.zhadan,
            CARDTPYE.sanshun,CARDTPYE.liandui,CARDTPYE.sanzhang,
            CARDTPYE.duizi,CARDTPYE.danpai
        ];

        var deleteRetsFromCards = function(ret) {
            for (var i = 0; i < ret.length; i++) {
                var index = cards.indexOf(ret[i]);

                if (index < 0)
                    continue;

                cards.splice(index,1);
            }
        }

        // 计算所有可出的牌型
        for (var l = 0; l < findTypes.length; l++) {
            var curType = findTypes[l];

            typeRets[curType] = [];

            if (curType == CARDTPYE.f_510k || curType == CARDTPYE.z_510k) {
                // 剔除纯色、杂色成组合510K
                var rets = this.findCardByType(cards, [], curType, 3);
                while (rets.length > 0) {
                    typeRets[curType] = typeRets[curType].concat(rets);

                    deleteRetsFromCards(rets[0]);

                    rets = this.findCardByType(cards, [], curType, 3);
                }
            } else if (curType == CARDTPYE.zhadan) {
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

                var validCounts = [];
                for (var p in pointCounts) {
                    if (pointCounts[p] >= 4 && validCounts.indexOf(pointCounts[p]) < 0)
                        validCounts.push(pointCounts[p]);
                }
                validCounts.sort(function(a,b) {
                    return a - b;
                });

                var tempRets = [];
                for (var j = 0; j < validCounts.length; j++) {
                    tempRets = this.findCardByType(cards, [], curType, validCounts[j]);
                    for (var k = 0; k < tempRets.length; k++) {
                        if (pointCounts[this.calPoint(tempRets[k][0])] > validCounts[j]) {
                            // 存在该点数更长的炸弹，则丢弃短的结果
                            continue;
                        }
                        typeRets[curType].push(tempRets[k]);

                        // 剔除炸弹所用牌
                        deleteRetsFromCards(tempRets[k]);
                    }
                }
            } else if (curType == CARDTPYE.sanshun || curType == CARDTPYE.liandui) {
                var cardCount = 0;
                var step = 0;

                if (curType == CARDTPYE.sanshun) {
                    cardCount = 6;
                    step = 3;
                } else {
                    cardCount = 4;
                    step = 2;
                }
                
                var rets = this.findCardByType(cards, [], curType, cardCount);
                while (rets.length > 0) {
                    typeRets[curType] = rets.concat(typeRets[curType]);

                    cardCount += step;
                    rets = this.findCardByType(cards, [], curType, cardCount);
                }

                // 剔除三顺所占用牌
                for (var i = 0; i < typeRets[curType].length; i++) {
                    deleteRetsFromCards(typeRets[curType][i]);
                }
            } else if (curType == CARDTPYE.sanzhang || curType == CARDTPYE.duizi) {
                typeRets[curType] = this.findCardByType(cards, [], curType, curType == CARDTPYE.sanzhang ? 3 : 2);

                // 剔除三张所占用牌
                for (var i = 0; i < typeRets[curType].length; i++) {
                    deleteRetsFromCards(typeRets[curType][i]);
                }
            } else
                typeRets[curType] = this.findCardByType(cards, [], curType, 1);
        }

        findTypes.unshift(findTypes.splice(2,1)[0]);

        // 从单牌开始，依次查找不拆更复杂牌型组合的牌组
        for (var i = findTypes.length - 1; i >= 0; i--) {
            if (typeRets[findTypes[i]].length > 0)
                return typeRets[findTypes[i]][0];
        }

        // 实在没有找到，返回一个最小牌
        return [cards[0]];
    }

    // 压牌提示
    PokerChongYangDaGun.prototype.findTipsForBackHand = function(oHands,oLastCards) {
        var hands = [];
        var handLaizis = this.transformAndGetLaizi(oHands, hands);

        // 如果只剩下癞子
        if (handLaizis.length == oHands.length) {
            return [];
        }

        var pointCounts = {};
        for (var i = 0; i < hands.length; i++) {
            var p = this.calPoint(hands[i]);
            if (pointCounts[p]) {
                pointCounts[p]++;
            }
            else {
                pointCounts[p] = 1;
            }
        }

        var lastCardsType = this.calType(oLastCards);
        var findRets = function(laizis) {
            var rets = [];
            var tempRets = [];

            var laizi = laizis.length;

            if (lastCardsType != CARDTPYE.zhadan && lastCardsType != CARDTPYE.f_510k) {
                var findTypes = [lastCardsType,CARDTPYE.z_510k,CARDTPYE.f_510k];

                if (lastCardsType == CARDTPYE.z_510k) {
                    findTypes.splice(0,1);
                    findTypes.splice(0,1);
                }

                for (var i = 0; i < findTypes.length; i++) {
                    var curType = findTypes[i];
                    var cardCount = oLastCards.length;

                    if (curType == CARDTPYE.z_510k || curType == CARDTPYE.f_510k) {
                        cardCount = 3;
                    }

                    // 如果提出可出牌后，只剩下癞子，则不用找了
                    if (handLaizis.length - laizi > 0 && cardCount == hands.length + laizi)
                        continue;

                    tempRets = this.findCardByType(hands, laizis, curType, cardCount);
                    for (var j = 0; j < tempRets.length; j++) {
                        if (this.canPut(tempRets[j], oLastCards)) {

                            if (laizi > 0) {
                                // 有癞子，仅给一套带癞子能压过，且牌力最低的组合
                                return [tempRets[j]];
                            } else
                                rets.push(tempRets[j]);
                        }
                    }
                }
            } 

            // 不带癞子的炸弹
            var cardCount = 4;
            if (lastCardsType == CARDTPYE.zhadan)
                cardCount = oLastCards.length;
            
            var validCounts = [];
            for (var p in pointCounts) {
                var newCount = pointCounts[p] + laizi;
                if (newCount >= cardCount && validCounts.indexOf(newCount) < 0)
                    validCounts.push(newCount);
            }

            validCounts.sort(function(a,b) {
                return a - b;
            });

            for (var j = 0; j < validCounts.length; j++) {
                // 如果提出可出牌后，只剩下癞子，则不用找了
                if (handLaizis.length - laizi > 0 && validCounts[j]  == hands.length + laizi)
                    continue;

                tempRets = this.findCardByType(hands, laizis, CARDTPYE.zhadan, validCounts[j]);
                for (var i = 0; i < tempRets.length; i++) {
                    if (pointCounts[this.calPoint(tempRets[i][0])] + laizi > validCounts[j]) {
                        // 存在该点数更长的炸弹，则丢弃短的结果
                        continue;
                    }

                    if (this.canPut(tempRets[i], oLastCards)) {
                        if (laizi > 0) {
                            // 有癞子，仅给一套带癞子能压过，且牌力最低的组合
                            return [tempRets[i]];
                        } else
                            rets.push(tempRets[i]);
                    }
                }
            }

            if (rets.length > 0) {
                // 若用户不使用癞子时，即可压过上家，则提示库里不提示带癞子的组合。
                return rets;
            }

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
    PokerChongYangDaGun.prototype.tipCards = function(oHands, oLastCards) {
        if (!oHands || oHands.length <= 0)
            return [];

        if (!oLastCards || oLastCards.length <= 0) {
            // 先手
            return [this.findFirstPutCards(oHands)];
        } else
            return this.findTipsForBackHand(oHands,oLastCards);
    };

    /**
     * 从一组提示中找到由癞子代替的牌
     * @param {array} ret 一组结果
     */
    PokerChongYangDaGun.prototype.getLaiziCardsFromRet = function(ret) {
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
    PokerChongYangDaGun.prototype.getRealLaizi = function(laiziCard) {
        if (!laiziCard)
            return -1;

        if (!this.haveLaiziSign(laiziCard))
            return -1;

        var muti = Math.floor(laiziCard / LAI_ZI_SIGN);
        if (muti == 4)
            return RED_JOKER;
        else if (muti == 3)
            return BLACK_JOKER;
        else if (muti == 2)
            return HUA_CARD;

        laiziCard = this.removeLaiziSign(laiziCard);

        var modValue = laiziCard % 4;
        if (modValue == 0)
            return BLACK_JOKER;
        else if (modValue == 3)
            return RED_JOKER;
        else if (modValue == 2)
            return HUA_CARD;

        return -1;
    };

    /**
     * 对双癞子查找结果去重
     * @param {array} rets 结果
     */
     PokerChongYangDaGun.prototype.removeSameResults = function(rets) {
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
     */
    PokerChongYangDaGun.prototype.addLaiziSign = function(cardValue,laiziValue) {
        if (laiziValue == RED_JOKER)
            return cardValue + 4 * LAI_ZI_SIGN;
        else if (laiziValue == BLACK_JOKER)
            return cardValue + 3 * LAI_ZI_SIGN;
        else if (laiziValue == HUA_CARD)
            return cardValue + 2 * LAI_ZI_SIGN;

        return cardValue + LAI_ZI_SIGN;
    }

    /**
     * 给牌值去掉癞子标记
     * @cardValue {number} 
     */
    PokerChongYangDaGun.prototype.removeLaiziSign = function(cardValue) {
        return cardValue % LAI_ZI_SIGN;
    }

    /**
     * 是否带有癞子标记
     * @cardValue {number} 
     */
    PokerChongYangDaGun.prototype.haveLaiziSign = function(cardValue) {
        
        return cardValue > LAI_ZI_SIGN;
    }

    /**
     * 将癞子替换为牌值
     * @laiziValue {number} 癞子值，大小王、花牌
     * @point {number} 想要替换的目的点数
     * @cards {array} 包含目的点数的牌组，用于区分已有目的点数的花色
     */
    PokerChongYangDaGun.prototype.replaceLaizi = function(laiziValue,point,cards) {
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
        else if (laiziValue == HUA_CARD)
            return this.addLaiziSign(point * 4 - 2);

        return -1;
    }
    
    
    if(typeof(module)!="undefined" && module.exports)    
        module.exports = PokerChongYangDaGun;
    
    if(typeof(MjClient)!="undefined")
        MjClient.majiang_PokerChongYangDaGun = new PokerChongYangDaGun();
    
})();