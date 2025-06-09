// 潜江千分算法类
(function() {
    function PokerQianJiangQianFen() {
        this.handCount = 0; // 置为零，为了自主发牌
    }

    var LAI_ZI_SIGN = 100;
    var RED_JOKER = 54;
    var BLACK_JOKER = 53;
    var MIN_POINT = 3;
    var KPOINT = 13;
    var APOINT = 14;
    var TWO_POINT = 16;
    var BLACK_JOKER_POINT = 18;
    var RED_JOKER_POINT = 19;
    var MAX_POINT = TWO_POINT;

    // 牌型排序优先级 和 id
    var CARDTPYE = {
        wangzha: 104,
        zhadan: 103,
        f_510k:102,
        z_510k:101,
        big: 100, // 大牌分界线
        // liandui:4,
        // shunzi:3,
        duizi:2,
        danpai:1
    };

    PokerQianJiangQianFen.prototype.CARDTPYE = CARDTPYE;

    var CARDCOUNT = {};
    CARDCOUNT[CARDTPYE.wangzha] = 2;
    CARDCOUNT[CARDTPYE.zhadan] = 4;
    CARDCOUNT[CARDTPYE.z_510k] = 3;
    CARDCOUNT[CARDTPYE.f_510k] = 3;
    // CARDCOUNT[CARDTPYE.liandui] = 6;
    // CARDCOUNT[CARDTPYE.shunzi] = 3;
    CARDCOUNT[CARDTPYE.duizi] = 2;
    CARDCOUNT[CARDTPYE.danpai] = 1;

    var print = function(){
        var str = '';
        for (var i=0; i<arguments.length; i++){
            str  = str + arguments[i] + ' ';
        }
        console.log(str);
    }

    //两副牌，4人，每人27张
    PokerQianJiangQianFen.prototype.randomCards = function(areaSelectMode, tData) {
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
    //是否是炸弹
    PokerQianJiangQianFen.prototype.isZhaDan = function(cards, areaSelectMode) {
        var oCards = cards.slice();
        return this.calType(oCards, areaSelectMode) > CARDTPYE.big;
    };

    PokerQianJiangQianFen.prototype.isLaizi = function(card) {
        card = this.removeLaiziSign(card);
        return card == RED_JOKER || card == BLACK_JOKER;
    };

    /**
     * 计算牌点数
     * @param {number} num
     * @return {number}
     */
    PokerQianJiangQianFen.prototype.calPoint = function(num) {
        if (!num) { return -1; }

        num = this.removeLaiziSign(num);

        if (num == BLACK_JOKER)
            return BLACK_JOKER_POINT;
        else if (num == RED_JOKER)
            return RED_JOKER_POINT;

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
    PokerQianJiangQianFen.prototype.calFlower = function(num) {
        num = this.removeLaiziSign(num);
        return (num + 3) % 4;
    }

    // /**
    //  * 判断是否是顺子
    //  * @param {array} oCards 按点数排好序的牌
    //  * @return {bool}
    //  */
    // PokerQianJiangQianFen.prototype.isShun = function(oCards) {
    //     if (!oCards || oCards.length < 3)
    //         return false;

    //     var cardCount = oCards.length;
    //     var points = [];
    //     for (var i = 0; i < oCards.length; i++) {
    //         points.push(this.calPoint(oCards[i]));
    //     }

    //     for (var i = 0; i <= cardCount - 2; i ++) {
    //         if (points[i] != points[i + 1] - 1)
    //             return false;
    //     }

    //     return true;
    // };

    /**
     * 判断是否是同花
     * @param {array} oCards 按点数排好序的牌
     * @return {bool}
     */
    PokerQianJiangQianFen.prototype.isTongHua = function(oCards) {
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
    PokerQianJiangQianFen.prototype.is510K = function(oCards) {
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
    PokerQianJiangQianFen.prototype.isTongHua510K = function(oCards) {
        return this.is510K(oCards) && this.isTongHua(oCards);
    };

    // /**
    //  * 判断是否是连对
    //  * @param {array} oCards 按点数排好序的牌
    //  * @return {bool}
    //  */
    // PokerQianJiangQianFen.prototype.isLiandui = function(oCards) { //oCards有序
    //     var cardNum = CARDCOUNT[CARDTPYE.liandui];// 连对最小牌数

    //     if (!oCards || oCards.length < cardNum || oCards.length % 2 != 0)
    //         return false;

    //     var cardCount = oCards.length;
    //     var points = [];
    //     for (var i = 0; i < oCards.length; i++) {
    //         points.push(this.calPoint(oCards[i]));
    //     }

    //     for (var i = 0; i < cardCount - 2; i += 2) {
    //         var abs = Math.abs(points[i] - points[i + 2]);
    //         if ( abs != 1 || (points[i + 1] != points[i]) ||  (points[i + 2] != points[i + 3]) )  return false;
    //     }

    //     return true;
    // };

    /**
     * 判断是否都是癞子
     * @param {array} oCards 按点数排好序的牌
     * @return {bool}
     */
    PokerQianJiangQianFen.prototype.isAllLaizi = function(oCards) { //oCards有序
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
    PokerQianJiangQianFen.prototype.calType = function(oCards, areaSelectMode) {
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

        if(this.isAllLaizi(cards)){
            if(cardCount >= 4){//天王炸
                return CARDTPYE.wangzha;
            }

            if(areaSelectMode && areaSelectMode.biDa){
                if((areaSelectMode.shuangWangKeZha && cardCount >= 2) || cardCount >= 3){
                    return CARDTPYE.wangzha;
                }
            }
        }

        // // 顺子
        // if (cardCount >= CARDCOUNT[CARDTPYE.shunzi] && maxCount == 1 && this.isShun(cards))
        //     return CARDTPYE.shunzi;

        // 同花510k
        if (cardCount == CARDCOUNT[CARDTPYE.f_510k] && maxCount == 1 && this.isTongHua510K(cards))
            return CARDTPYE.f_510k;

        // 510k
        if (cardCount == CARDCOUNT[CARDTPYE.z_510k] && maxCount == 1 && this.is510K(cards))
            return CARDTPYE.z_510k;

        // // 连对，3对起
        // if (cardCount >= CARDCOUNT[CARDTPYE.liandui] && maxCount == 2 && this.isLiandui(cards))
        //     return CARDTPYE.liandui;

        //炸弹
        if (cardCount >= CARDCOUNT[CARDTPYE.zhadan] && allSame)
            return CARDTPYE.zhadan;

        // 对子
        if (cardCount == CARDCOUNT[CARDTPYE.duizi] && allSame)
            return CARDTPYE.duizi;

        // 单牌
        if (cardCount == CARDCOUNT[CARDTPYE.danpai])
            return CARDTPYE.danpai;

        return -1;
    };

    PokerQianJiangQianFen.prototype.cardsType = function(cards, areaSelectMode) {
        return this.calType(cards, areaSelectMode)
    }

    // 计算牌型点数
    PokerQianJiangQianFen.prototype.calCardsValue = function (oCards) {
        if (!oCards || oCards.length == 0) {
            return -1;
        }

        return this.calPoint(oCards[oCards.length - 1]);
    };

    // 牌点比较函数（从小到大）
    PokerQianJiangQianFen.prototype.cardValueCmp = function(a, b) {
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
    PokerQianJiangQianFen.prototype.transformAndGetLaizi = function(oCards, cards) {
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
    //根据玩家选项 获取大牌的点数列表
    PokerQianJiangQianFen.prototype.bigCardTypeOrder = function(areaSelectMode){
        if(areaSelectMode.biDa){//必打
            if(areaSelectMode.f510kYa4 && areaSelectMode.shuangWangKeZha){
                return [
                    {cardType: CARDTPYE.z_510k,cardCount: 3,point: 1},
                    {cardType: CARDTPYE.zhadan,cardCount: 4,point: 2},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 0,point: 3},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 1,point: 4},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 2,point: 5},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 3,point: 6},
                    {cardType: CARDTPYE.wangzha,cardCount: 2,flower: 1,point: 7},
                    {cardType: CARDTPYE.zhadan,cardCount: 5,point: 8},
                    {cardType: CARDTPYE.wangzha,cardCount: 2,flower: 2,point: 9},
                    {cardType: CARDTPYE.zhadan,cardCount: 6,point: 10},
                    {cardType: CARDTPYE.wangzha,cardCount: 2,flower: 3,point: 11},
                    {cardType: CARDTPYE.zhadan,cardCount: 7,point: 12},
                    {cardType: CARDTPYE.wangzha,cardCount: 3,point: 13},
                    {cardType: CARDTPYE.zhadan,cardCount: 8,point: 14},
                    {cardType: CARDTPYE.wangzha,cardCount: 4,point: 15},
                ];
            }else if(areaSelectMode.f510kYa4){
                return [
                    {cardType: CARDTPYE.z_510k,cardCount: 3,point: 1},
                    {cardType: CARDTPYE.zhadan,cardCount: 4,point: 2},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 0,point: 3},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 1,point: 4},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 2,point: 5},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 3,point: 6},
                    {cardType: CARDTPYE.zhadan,cardCount: 5,point: 7},
                    {cardType: CARDTPYE.zhadan,cardCount: 6,point: 8},
                    {cardType: CARDTPYE.zhadan,cardCount: 7,point: 9},
                    {cardType: CARDTPYE.wangzha,cardCount: 3,point: 10},
                    {cardType: CARDTPYE.zhadan,cardCount: 8,point: 11},
                    {cardType: CARDTPYE.wangzha,cardCount: 4,point: 12},
                ];
            }else if(areaSelectMode.shuangWangKeZha){
                return [
                    {cardType: CARDTPYE.z_510k,cardCount: 3,point: 1},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 0,point: 2},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 1,point: 3},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 2,point: 4},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 3,point: 5},
                    {cardType: CARDTPYE.zhadan,cardCount: 4,point: 6},
                    {cardType: CARDTPYE.wangzha,cardCount: 2,flower: 1,point: 7},
                    {cardType: CARDTPYE.zhadan,cardCount: 5,point: 8},
                    {cardType: CARDTPYE.wangzha,cardCount: 2,flower: 2,point: 9},
                    {cardType: CARDTPYE.zhadan,cardCount: 6,point: 10},
                    {cardType: CARDTPYE.wangzha,cardCount: 2,flower: 3,point: 11},
                    {cardType: CARDTPYE.zhadan,cardCount: 7,point: 12},
                    {cardType: CARDTPYE.wangzha,cardCount: 3,point: 13},
                    {cardType: CARDTPYE.zhadan,cardCount: 8,point: 14},
                    {cardType: CARDTPYE.wangzha,cardCount: 4,point: 15},
                ];
            }else{
                return [
                    {cardType: CARDTPYE.z_510k,cardCount: 3,point: 1},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 0,point: 2},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 1,point: 3},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 2,point: 4},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 3,point: 5},
                    {cardType: CARDTPYE.zhadan,cardCount: 4,point: 6},
                    {cardType: CARDTPYE.zhadan,cardCount: 5,point: 7},
                    {cardType: CARDTPYE.zhadan,cardCount: 6,point: 8},
                    {cardType: CARDTPYE.zhadan,cardCount: 7,point: 9},
                    {cardType: CARDTPYE.wangzha,cardCount: 3,point: 10},
                    {cardType: CARDTPYE.zhadan,cardCount: 8,point: 11},
                    {cardType: CARDTPYE.wangzha,cardCount: 4,point: 12},
                ];
            }
        }else{//非必打
            if(areaSelectMode.f510kYa4){//勾选纯510K压4炸
                return [
                    {cardType: CARDTPYE.z_510k,cardCount: 3,point: 1},
                    {cardType: CARDTPYE.zhadan,cardCount: 4,point: 2},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 0, point: 3},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 1, point: 4},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 2, point: 5},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 3, point: 6},
                    {cardType: CARDTPYE.zhadan,cardCount: 5,point: 7},
                    {cardType: CARDTPYE.zhadan,cardCount: 6,point: 8},
                    {cardType: CARDTPYE.zhadan,cardCount: 7,point: 9},
                    {cardType: CARDTPYE.wangzha,cardCount: 4,point: 10},
                    {cardType: CARDTPYE.zhadan,cardCount: 8,point: 11},
                ];
            }else{
                return [
                    {cardType: CARDTPYE.z_510k,cardCount: 3,point: 1},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 0, point: 2},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 1, point: 3},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 2, point: 4},
                    {cardType: CARDTPYE.f_510k,cardCount: 3,flower: 3, point: 5},
                    {cardType: CARDTPYE.zhadan,cardCount: 4,point: 6},
                    {cardType: CARDTPYE.zhadan,cardCount: 5,point: 7},
                    {cardType: CARDTPYE.zhadan,cardCount: 6,point: 8},
                    {cardType: CARDTPYE.zhadan,cardCount: 7,point: 9},
                    {cardType: CARDTPYE.wangzha,cardCount: 4,point: 10},
                    {cardType: CARDTPYE.zhadan,cardCount: 8,point: 11},
                ];
            }
        }
    };

    //根据大牌的点数列表 获取点数
    PokerQianJiangQianFen.prototype.getBigCardPointByOrder = function(cards, cardType, bigCardOrder){
        var wangZhaFlower = null;
        if(cardType == CARDTPYE.wangzha && cards.length == 2){//双王算炸时 判断类型
            if(cards[0] != cards[1]){
                wangZhaFlower = 1;
            }else if(cards[0] == BLACK_JOKER){
                wangZhaFlower = 2;
            }else{
                wangZhaFlower = 3;
            }
        }

        for (var i = 0; i < bigCardOrder.length; i++) {
            var bigCardInfo = bigCardOrder[i];
            if(cards.length == bigCardInfo.cardCount && cardType == bigCardInfo.cardType && (!wangZhaFlower || wangZhaFlower == bigCardInfo.flower)){
                return bigCardInfo.point;
            }
        }

        return 0;
    }

    /**
     * 牌是否能压上
     * @param {array} oCards 按点数排好序的牌/选择了的手牌
     * @param {array} [oLastCards] 按点数排好序的牌/最后打出的牌
     * @param {number} [handsNum] 手牌数量
     */
    PokerQianJiangQianFen.prototype.canPut = function(oCards, oLastCards, areaSelectMode) {
        var cards = oCards.slice();

        cards.sort(this.cardValueCmp.bind(this));
        var cardType = this.calType(cards, areaSelectMode);

        if (cardType == -1)
            return false;

        if (!oLastCards || oLastCards == -1 || oLastCards.length == 0) {
            return true; // 没有上次打的牌，三家过自己再出牌
        }

        // if ((cardType == CARDTPYE.shunzi || cardType == CARDTPYE.liandui) && oCards.length != oLastCards.length)
        //     return false;

        var lastCards = oLastCards.slice();
        lastCards.sort(this.cardValueCmp.bind(this));
        var lastCardType = this.calType(lastCards, areaSelectMode);

        if (cardType == lastCardType) {
            if (cardType == CARDTPYE.f_510k) {
                // 黑>红>梅>方
                return this.calFlower(cards[0]) > this.calFlower(lastCards[0]);
            } else if (cards.length == lastCards.length) {
                // 相同牌型，张数相等，比大小
                return this.calCardsValue(cards) > this.calCardsValue(lastCards);
            } else if (cardType == CARDTPYE.zhadan || cardType == CARDTPYE.wangzha) {
                // 炸弹，张数多的大
                return cards.length > lastCards.length;
            }
        } else if (cardType > CARDTPYE.big) {
            if (lastCardType < CARDTPYE.big)
                return true;

            var bigCardOrder = this.bigCardTypeOrder(areaSelectMode);
            var cardBigPoint = this.getBigCardPointByOrder(cards, cardType, bigCardOrder);
            var lastCardBigPoint = this.getBigCardPointByOrder(oLastCards, lastCardType, bigCardOrder);

            return cardBigPoint > lastCardBigPoint;

            // if (cardType == CARDTPYE.wangzha && lastCardType <= CARDTPYE.f_510k)
            //     return true;

            // if (cardType == CARDTPYE.f_510k && lastCardType == CARDTPYE.z_510k)
            //     return true;

            // if (areaSelectMode.laiziOption == 0) {
            //     // 不带癞子

            //     if (cardType == CARDTPYE.wangzha) {
            //         // 王炸跟炸弹比较
            //         return cards.length - lastCards.length >= -4;
            //     } else if (cardType == CARDTPYE.zhadan) {
            //         if (lastCardType >= CARDTPYE.z_510k && lastCardType <= CARDTPYE.f_510k) {
            //         // 炸弹跟510K比较
            //         return cards.length >= 6;
            //         } else {
            //             // 炸弹跟王炸比较
            //             return cards.length - lastCards.length >= 5;
            //         }
            //     } else if (cardType >= CARDTPYE.z_510k && lastCardType == CARDTPYE.zhadan) {
            //         // 炸弹跟510K比较
            //         return lastCards.length <= 5;
            //     }
            // }
        }

        return false;
    };

    PokerQianJiangQianFen.prototype.getAllMaxCard = function(oCards){
        var sortHands = oCards.slice();
        sortHands.sort(this.cardValueCmp.bind(this));
        var maxCard = sortHands[sortHands.length - 1];

        var rets = []
        for(var i in sortHands){
            var ret = []
            if(this.calPoint(maxCard) == this.calPoint(sortHands[i])){
                ret.push(sortHands[i]);
                rets.push(ret);
            }
        }

        return rets;
    }

    // 检查是否能出牌
    PokerQianJiangQianFen.prototype.checkPut = function (oHands, oCards, lastPutCard, areaSelectMode, nextPlayerCardNum) {
        if (oCards && typeof(oCards)!='undefined' && oCards.length == 0) return null;

        if(areaSelectMode.baoShuangDingDa){//报警顶最大
            var sortHand = oHands.slice();
            sortHand.sort(this.cardValueCmp.bind(this));
            if(nextPlayerCardNum == 1 && oCards.length == 1){
                // 如果 下家报单 提起的一张牌 不是最大的牌
                var maxCards = this.getAllMaxCard(oHands);
                if(this.calPoint(maxCards[0]) != this.calPoint(oCards[0]) ){
                    return null;
                }
            }else if(nextPlayerCardNum == 2 && this.calType(oCards, areaSelectMode) == CARDTPYE.duizi){
                // 如果 下家报双 提起的是对子 不是最大的牌
                var allDuiZi = this.findCardByType(sortHand, [], CARDTPYE.duizi, 2, areaSelectMode);
                if(this.calPoint(allDuiZi[allDuiZi.length - 1][0]) != this.calPoint(oCards[0]) ){
                    return null;
                }
            }
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
    PokerQianJiangQianFen.prototype.sortHandCards = function(oCards, sortType) {
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
    PokerQianJiangQianFen.prototype.findNSameCard = function (hands, point, n) {
        for (var i = 0; i < hands.length; i++) {
            if (this.calPoint(hands[i]) == point && this.calPoint(hands[i + n - 1]) == point) {
                return hands.slice(i, i + n);
            }
        }
        return null;
    };

    PokerQianJiangQianFen.prototype.findAllSameCard = function(hands, point) {
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

    PokerQianJiangQianFen.prototype.indexOfCards = function(cardList, cards) {
        for(var i = 0; i < cardList.length; i++) {
            var tmpCards = cardList[i];
            if( this.isSameCards(tmpCards, cards) )
                return true;
        }
        return false;
    }

    PokerQianJiangQianFen.prototype.isSameCards = function(cards1, cards2) {
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
    PokerQianJiangQianFen.prototype.lieju = function(parr, num){
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
    PokerQianJiangQianFen.prototype.findCardByType = function(hands, laizis, type, cardCount, areaSelectMode, extras) {
        var rets = [];

        if (areaSelectMode.laiziOption == 0 && type != CARDTPYE.danpai && type != CARDTPYE.wangzha) {
            // 不带癞子玩法
            laizis = [];
        }

        var laizi = laizis.length;
        var minCardCount = CARDCOUNT[type];

        if ((type == CARDTPYE.duizi || type == CARDTPYE.danpai || type == CARDTPYE.z_510k || type == CARDTPYE.f_510k) && cardCount != minCardCount)
            return rets;

        // if (laizi > cardCount || laizi + hands.length < cardCount || cardCount < minCardCount) {
        //     return rets;
        // }

        // if (type != CARDTPYE.danpai && type != CARDTPYE.wangzha && cardCount == laizi) {
        //     // 非找单牌及王炸的癞子必须配其他牌。
        //     return rets;
        // }

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

        if (type == CARDTPYE.wangzha) {
            var handLaizis = this.transformAndGetLaizi(hands, []);
            handLaizis.sort(this.cardValueCmp.bind(this));
            if(cardCount == 2 && extras && extras.flower == 1){//一大一下
                if(handLaizis.indexOf(BLACK_JOKER) >= 0 && handLaizis.indexOf(RED_JOKER) >= 0){
                    pushRets(rets, [BLACK_JOKER, RED_JOKER]);
                }
            }else if(cardCount == 2 && extras && extras.flower == 2){//双小王
                var find = this.findNSameCard(handLaizis, BLACK_JOKER, 2);
                if(find){
                    pushRets(rets, find);
                }
            }else if(cardCount == 2 && extras && extras.flower == 3){//双大王
                var find = this.findNSameCard(handLaizis, RED_JOKER, 2);
                if(find){
                    pushRets(rets, find);
                }
            }else if(cardCount >= 3 && handLaizis.length >= cardCount){
                pushRets(rets, handLaizis.slice(0,cardCount));
            }
        } else if (type == CARDTPYE.zhadan || type == CARDTPYE.duizi) {
            for (var i = MIN_POINT; i <= MAX_POINT; i++) {
                var find = this.findNSameCard(hands, i, cardCount - laizi);

                if (!find)
                    continue;

                if (laizi > 0) {
                    for (var j = 0; j < laizi; j++) {
                        find.push(this.replaceLaizi(laizis[j],i,find));
                    }
                }
                pushRets(rets,find);
            }
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
            var pushCard = function(array510K,card) {
                if (extras && typeof(extras.flower) == "number" && this.calFlower(card) != extras.flower) {
                    return;
                }

                array510K.push(card);
            }.bind(this);
            for (var i = 0; i < hands.length; i++) {
                var curPoint = this.calPoint(hands[i]);

                if (curPoint == 5)
                    pushCard(cards510k[0],hands[i]);
                else if (curPoint == 10)
                    pushCard(cards510k[1],hands[i]);
                else if (curPoint == KPOINT)
                    pushCard(cards510k[2],hands[i]);
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
                            break;
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
                                break;
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
            } else if (areaSelectMode.laiziOption == 0) {
                pushRets(rets,[laizis[0]]);
            }
        }

        return rets;
    };

    // PokerQianJiangQianFen.prototype.findFirstPutCards = function(oHands,areaSelectMode) {
    //     var handCount = oHands.length;

    //     if (handCount == 1) {
    //         if (areaSelectMode.laiziOption > 0 && this.isLaizi(oHands[0]))
    //             return null;

    //         // 一张直接出
    //         return oHands.slice();
    //     }

    //     var cards = [];
    //     var laizis = this.transformAndGetLaizi(oHands,cards);

    //     // 如果只剩癞子
    //     if (laizis.length == oHands.length) {
    //         return laizis.slice();
    //     }

    //     // 两张以上找其他可能

    //     // 如果癞子+手牌能全部组合，就一手出完，如果不能再剔除癞子。
    //     var findTypes = [
    //         CARDTPYE.zhadan,
    //         //CARDTPYE.liandui,
    //         CARDTPYE.f_510k,
    //         CARDTPYE.z_510k,
    //         //CARDTPYE.shunzi,
    //         CARDTPYE.duizi,
    //     ];
    //     for (var i = 0; i < findTypes.length; i++) {
    //         var rets = this.findCardByType(cards, laizis, findTypes[i], handCount, areaSelectMode);

    //         if (rets.length > 0) {
    //             return rets[0];
    //         }
    //     }

    //     // 癞子剔除后，存在510K，则把510K的组合剔除后，其余牌不拆牌检查剩余牌型组合。单张>对子>顺子>连对>510K>炸弹

    //     var typeRets = {};
    //     findTypes = [
    //         CARDTPYE.f_510k,
    //         CARDTPYE.z_510k,
    //         CARDTPYE.zhadan,
    //         //CARDTPYE.liandui,
    //         //CARDTPYE.shunzi,
    //         CARDTPYE.duizi,
    //         CARDTPYE.danpai
    //     ];
    //     var deleteRetsFromCards = function(ret) {
    //         for (var i = 0; i < ret.length; i++) {
    //             var index = cards.indexOf(ret[i]);
    //             if (index < 0)
    //                 continue;
    //             cards.splice(index,1);
    //         }
    //     }

    //     // 计算所有可出的牌型
    //     for (var l = 0; l < findTypes.length; l++) {
    //         var curType = findTypes[l];

    //         typeRets[curType] = [];

    //         if (curType == CARDTPYE.f_510k || curType == CARDTPYE.z_510k) {
    //             // 剔除纯色、杂色成组合510K
    //             var rets = this.findCardByType(cards, [], curType, 3, areaSelectMode);
    //             while (rets.length > 0) {
    //                 typeRets[curType] = typeRets[curType].concat(rets);

    //                 deleteRetsFromCards(rets[0]);

    //                 rets = this.findCardByType(cards, [], curType, 3, areaSelectMode);
    //             }
    //             if (curType == CARDTPYE.f_510k) {
    //                 // 根据花色排序
    //                 typeRets[curType].sort(function(ret_1,ret_2) {
    //                     return this.calFlower(ret_1[0]) - this.calFlower(ret_2[0]);
    //                 }.bind(this));
    //             }
    //         } else if (curType == CARDTPYE.zhadan) {
    //             var pointCounts = {};
    //             for (var i = 0; i < cards.length; i++) {
    //                 var p = this.calPoint(cards[i]);
    //                 if (pointCounts[p]) {
    //                     pointCounts[p]++;
    //                 }
    //                 else {
    //                     pointCounts[p] = 1;
    //                 }
    //             }

    //             var validCounts = [];
    //             for (var p in pointCounts) {
    //                 if (pointCounts[p] >= 3 && validCounts.indexOf(pointCounts[p]) < 0)
    //                     validCounts.push(pointCounts[p]);
    //             }

    //             validCounts.sort(function(a,b) {
    //                 return a - b;
    //             });

    //             var tempRets = [];
    //             for (var j = 0; j < validCounts.length; j++) {
    //                 tempRets = this.findCardByType(cards, [], curType, validCounts[j], areaSelectMode);
    //                 for (var k = 0; k < tempRets.length; k++) {
    //                     if (pointCounts[this.calPoint(tempRets[k][0])] > validCounts[j]) {
    //                         // 存在该点数更长的炸弹，则丢弃短的结果
    //                         continue;
    //                     }

    //                     typeRets[curType].push(tempRets[k]);
    //                     // 剔除炸弹所用牌
    //                     deleteRetsFromCards(tempRets[k]);
    //                 }
    //             }
    //         }
    //         // else if (curType == CARDTPYE.shunzi || curType == CARDTPYE.liandui) {
    //         //     var cardCount = 0;
    //         //     var step = 0;

    //         //     if (curType == CARDTPYE.shunzi) {
    //         //         cardCount = 3;
    //         //         step = 1;
    //         //     } else {
    //         //         cardCount = 6;
    //         //         step = 2;
    //         //     }

    //         //     var rets = this.findCardByType(cards, [], curType, cardCount, areaSelectMode);
    //         //     while (rets.length > 0) {
    //         //         typeRets[curType] = rets.concat(typeRets[curType]);

    //         //         cardCount += step;
    //         //         rets = this.findCardByType(cards, [], curType, cardCount, areaSelectMode);
    //         //     }
    //         //     // 剔除三顺所占用牌
    //         //     for (var i = 0; i < typeRets[curType].length; i++) {
    //         //         deleteRetsFromCards(typeRets[curType][i]);
    //         //     }
    //         // }
    //         else if (curType == CARDTPYE.duizi) {
    //             typeRets[curType] = this.findCardByType(cards, [], curType, 2, areaSelectMode);
    //             // 剔除对子所占用牌
    //             for (var i = 0; i < typeRets[curType].length; i++) {
    //                 deleteRetsFromCards(typeRets[curType][i]);
    //             }
    //         } else
    //             typeRets[curType] = this.findCardByType(cards, [], curType, 1, areaSelectMode);
    //     }

    //     // 根据首个炸弹长短决定先出顺序
    //     if (typeRets[CARDTPYE.zhadan].length > 0 && typeRets[CARDTPYE.zhadan][0].length > (areaSelectMode.laiziOption <= 1 ? 5 : 7)) {
    //             findTypes.unshift(findTypes.splice(2,1)[0]);
    //     }

    //     // 从单牌开始，依次查找不拆更复杂牌型组合的牌组
    //     for (var i = findTypes.length - 1; i >= 0; i--) {
    //         if (typeRets[findTypes[i]].length > 0)
    //             return typeRets[findTypes[i]][0];
    //     }

    //     // 实在没有找到，返回一个最小牌
    //     return [cards[0]];
    // }

    // 压牌提示
    PokerQianJiangQianFen.prototype.findTipsForBackHand = function(oHands,oLastCards,areaSelectMode) {
        var hands = [];
        var handLaizis = this.transformAndGetLaizi(oHands, hands);
        var handCards = oHands.slice();
        handCards.sort(this.cardValueCmp.bind(this));
        // 如果只剩下癞子
        if (handLaizis.length == oHands.length) {
            if (handLaizis.length == 1 && areaSelectMode.laiziOption > 0)
                return []
            var ret = handLaizis.slice();
            if (this.canPut(ret, oLastCards, areaSelectMode))
                return [ret];
            else
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

        var lastCardType = this.calType(oLastCards, areaSelectMode);
        var laiziCards = this.getLaiziCardsFromRet(oLastCards);

        // 不带癞子特殊处理
        if (areaSelectMode.laiziOption == 0) {
            var laizi = handLaizis.length;
            var rets = [];
            var tempRets = [];
            var minZhaDanCount = 4;
            if (lastCardType < CARDTPYE.big) {
                tempRets = this.findCardByType(handCards, [], lastCardType, oLastCards.length, areaSelectMode);
                for (var j = 0; j < tempRets.length; j++) {
                    if (this.canPut(tempRets[j], oLastCards, areaSelectMode)) {
                        rets.push(tempRets[j]);
                    }
                }
            }
            if (lastCardType == CARDTPYE.danpai && laizi > 0) {
                handLaizis.sort(function(laizi_1,laizi_2) {
                    return laizi_1 - laizi_2;
                });
                tempRets = this.findCardByType(handCards, [handLaizis[0]], lastCardType, 1, areaSelectMode);
                for (var j = 0; j < tempRets.length; j++) {
                    if (this.canPut(tempRets[j], oLastCards, areaSelectMode)) {
                        rets.push(tempRets[j]);
                    }
                }
            }

            var bigCardOrder = this.bigCardTypeOrder(areaSelectMode);
            var lastCardBigPoint = this.getBigCardPointByOrder(oLastCards, lastCardType, bigCardOrder);
            var putOrder = [];

            for (var i = 0; i < bigCardOrder.length; i++) {
                if(bigCardOrder[i].point >= lastCardBigPoint){
                    putOrder.push(bigCardOrder[i]);
                }
            }
            if (putOrder.length > 0) {
                // 保留炸弹套牌及排除不能压牌的炸弹出牌项
                var validCounts = [];
                for (var p in pointCounts) {
                    if (pointCounts[p] >= minZhaDanCount)
                        validCounts.push(pointCounts[p]);
                }
                for (var i = putOrder.length - 1; i >= 0; i--) {
                    if (putOrder[i].cardType == CARDTPYE.zhadan && validCounts.indexOf(putOrder[i].cardCount) < 0)
                        putOrder.splice(i,1);
                }
                var f510KFound = false;
                putOrder.sort(function(a, b) {
                    return a.point - b.point;
                });

                for (var i = 0; i < putOrder.length; i++) {
                    var curType = putOrder[i].cardType;
                    var cardCount = putOrder[i].cardCount;
                    if (curType == CARDTPYE.f_510k && f510KFound)
                        continue;
                    tempRets = this.findCardByType(handCards, [], curType, cardCount, areaSelectMode, putOrder[i].flower == undefined ?  null : {flower: putOrder[i].flower});
                    for (var j = 0; j < tempRets.length; j++) {
                        if (curType == CARDTPYE.zhadan && pointCounts[this.calPoint(tempRets[j][0])] > cardCount) {
                            // 存在该点数更长的炸弹，则丢弃短的结果
                            continue;
                        }
                        if (this.canPut(tempRets[j], oLastCards, areaSelectMode)) {
                            rets.push(tempRets[j]);
                            if (curType == CARDTPYE.f_510k) {
                                f510KFound = true;
                                break;
                            }
                        }
                    }
                }
            }
            return rets;
        }
    }

    /**
     * 提示可出的牌
     * @param  {array} oHands 我的手牌
     * @param  {array} oLastCards 上家出的牌
     * @return {array} 提示的牌
     */
    PokerQianJiangQianFen.prototype.tipCards = function(oHands, oLastCards, areaSelectMode) {
        if (!oHands || oHands.length <= 0)
            return [];

        if (!oLastCards || oLastCards.length <= 0) {
            // 先手
            //return [this.findFirstPutCards(oHands, areaSelectMode)];
            return [];
        } else
            return this.findTipsForBackHand(oHands,oLastCards,areaSelectMode);
    };

    /**
     * 从一组提示中找到由癞子代替的牌
     * @param {array} ret 一组结果
     */
    PokerQianJiangQianFen.prototype.getLaiziCardsFromRet = function(ret) {
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
    PokerQianJiangQianFen.prototype.getRealLaizi = function(laiziCard) {
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
     * 对双癞子查找结果去重
     * @param {array} rets 结果
     */
    PokerQianJiangQianFen.prototype.removeSameResults = function(rets) {
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
    PokerQianJiangQianFen.prototype.addLaiziSign = function(cardValue,laiziValue) {
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
    PokerQianJiangQianFen.prototype.removeLaiziSign = function(cardValue) {
        return cardValue % LAI_ZI_SIGN;
    }

    /**
     * 是否带有癞子标记
     *
     * @cardValue {number}
     */
    PokerQianJiangQianFen.prototype.haveLaiziSign = function(cardValue) {
        return cardValue > LAI_ZI_SIGN;
    }

    /**
     * 将癞子替换为牌值
     * @laiziValue {number} 癞子值，大小王、花牌
     * @point {number} 想要替换的目的点数
     * @cards {array} 包含目的点数的牌组，用于区分已有目的点数的花色
     */
    PokerQianJiangQianFen.prototype.replaceLaizi = function(laiziValue,point,cards) {
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


    if(typeof(module)!="undefined" && module.exports)
        module.exports = PokerQianJiangQianFen;

    if(typeof(MjClient)!="undefined")
        MjClient.majiang_PokerQianJiangQianFen = new PokerQianJiangQianFen();

})();