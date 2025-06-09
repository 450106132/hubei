//三打哈算法类
(function() {
function PokerHuaQuanJiao() {
    // this.handCount = 21;
    this.laiziCard = -1;

    this.cardCfg = {};
    // key:常主牌值  value:相对主牌的牌值大小 14:小王 15:大王
    this.cardCfg.changZhuByPoint = {2:1, 7:2, 14:3, 15:4};
    this.cardCfg.fk = {};
    this.cardCfg.mh = {};
    this.cardCfg.hx = {};
    this.cardCfg.ht = {};
    this.cardCfg.jokerBlack = 53;
    this.cardCfg.jokerRed = 54;
    for(var i=1; i<=52; i++ ){
        // 0:方块  1:梅花  2:梅花  3:黑桃
        var cardType = (i + 3) % 4;
        // 牌值 1 - 13
        var cardValue = Math.ceil(i / 4);
        if(0 == cardType) this.cardCfg.fk[cardValue] = i;
        if(1 == cardType) this.cardCfg.mh[cardValue] = i;
        if(2 == cardType) this.cardCfg.hx[cardValue] = i;
        if(3 == cardType) this.cardCfg.ht[cardValue] = i;
    }

    this.fkZhu = 0;
    this.mhZhu = 1;
    this.hxZhu = 2;
    this.htZhu = 3;
    this.wuZhu = 4;
}

if(typeof(cc)=='undefined') {
    var cc = function(){}
    cc.log = function(){
        var str = '';
        for (var i=0; i<arguments.length; i++){
            str  = str + arguments[i] + ' ';
        }
    }
}

var CARDTYPE = {
    huochepi: 4,
    liandui: 3,
    duizi: 2,
    danpai: 1,
};
PokerHuaQuanJiao.prototype.CARDTPYE = CARDTYPE;
var CARDCOUNT = {};
CARDCOUNT[CARDTYPE.huochepi] = 6;
CARDCOUNT[CARDTYPE.liandui] = 4;
CARDCOUNT[CARDTYPE.duizi] = 2;
CARDCOUNT[CARDTYPE.danpai] = 1;

// 1 - 52  方块A:1 梅花A:2 红心A:3 黑桃A:4 -- 黑桃王:52
// 1.16张玩法为现有的没有大小王、只有一个2、三个A的玩法 一共48张
// 2.15张玩法：在16张的基础上，再去掉两个A（剩红桃A）、一个K（去掉黑桃K），一共45张
PokerHuaQuanJiao.prototype.randomCards = function(areaSelectMode, tData) {
    var cards = [];

    // 去掉3、4
    for (var i = 1; i <= 54; i++) {
        var point = this.calPoint(i);

        if (point == 3 || point == 4)
            continue;

        cards.push(i);
        cards.push(i);
    }

    // 洗牌
    shuffleArray(cards);

    return cards;
};

PokerHuaQuanJiao.prototype.cardlog = function(cards, zhuColorType) {
    var col = ["a", "b", "c", "d"]; // 方块 梅花 红心 黑桃
    var str = "";
    for(var i in cards) {
        var card = cards[i];
        var color = this.calColor(card);
        var pointsdh = this.calPointBySdh(card, zhuColorType);
        var point = this.calPoint(card);
        str += col[color] + point + " ";
    }
    // console.log(cards);
    // console.log(str);
}

/**
 * 计算成立类型
 * @param  {number} jiaofen 庄家叫分
 * @param  {array} PfenPaiArr 分牌
 * @param  {Boolean} isTouXiang [是否投降]
 * @param  {[number]} Pkoudifen [扣底得分 可为空]
 * @return {[number]} [] winType < 0 庄家赢        winType > 0 闲家赢
 */
PokerHuaQuanJiao.prototype.countWinType = function(jiaofen, PfenPaiArr, isTouXiang, Pkoudifen, fengDing) {
    if( isTouXiang ) {
        return -4;
    }

    var xiaoFen = 5;
    if (jiaofen >= 65 && jiaofen <= 90)
        xiaoFen = 40;
    else if (jiaofen >= 50 && jiaofen <= 60)
        xiaoFen = 30;

    Pkoudifen = Pkoudifen || 0;
    var defen = this.getAllCardFen( PfenPaiArr ) + Pkoudifen;
    var difffen = defen - jiaofen;
    var winType = 0;

    if(difffen < 0 && defen == 0) { // 大削 每个闲家-3
        winType = -3;
    } else if ( difffen < 0 && defen >= xiaoFen) { // 保小削 每个闲家-1
        winType = -1;
    } else if ( difffen < 0) { // 小削 每个闲家-2
        winType = -2;
    } else if( difffen >= 0 ) { //
        winType = Math.floor(difffen / 40) + 1;

        if (fengDing && typeof(fengDing) == "number")
            winType = Math.min(winType,fengDing);
    }

    return winType;
}

// 是否有主牌
PokerHuaQuanJiao.prototype.isHaveZhuCards = function (cards, zhuColorType) {
    for (var i = 0; i < cards.length; i++) {
        if (this.calColorSdh(cards[i], zhuColorType)==4) {
            return true;
        }
    }

    return false;
};

// 计算牌点数 1 2 3 4 5 6 7 8 9 10 11 12 13   14:小王  15:大王
PokerHuaQuanJiao.prototype.calPoint = function(num) {
    if (!num) return -1;
    var point = Math.ceil(num / 4);
    if(num == this.cardCfg.jokerRed) point = 15;
    if(num == this.cardCfg.jokerBlack) point = 14;
    return point;
};

// zhuColorType 主花花色，没选主花时为-1， 不为空时， 牌值根据zhuColorType计算大小(0:方块  1：梅花 2：红心 3：黑桃)
PokerHuaQuanJiao.prototype.calPointBySdh = function(num, zhuColorType) {
    if (!num) 
        return -1;

    var point = this.calPoint(num);
    var color = this.calColor(num);
    var pointToSdh = {3:1, 4:2, 5:3, 6:4, 8:5, 9:6, 10:7, 11:8, 12:9, 13:10, 1:11, 2:[12, 13], 7:[14, 15], 14:16, 15:17};
    var sdhPoint = pointToSdh[point];

    // 如果是2，7主牌， 区分副主和选主
    if(point == 2 || point == 7) {
        // 如果是选主
        if(color == zhuColorType) {
            sdhPoint = sdhPoint[1];
        } else {
            sdhPoint = sdhPoint[0];
        }
    }

    // 主花点数比非主花大
    if(color == zhuColorType || this.cardCfg.changZhuByPoint[point]) {
        sdhPoint += 100;
    }

    return sdhPoint;
}


// 牌的花色
PokerHuaQuanJiao.prototype.calColor = function(num) {
    if (!num) return -1;
    // 0:方块  1:梅花  2:梅花  3:黑桃
    var cardType = (num + 3) % 4;
    return cardType;
}

// 返回此牌花色， 如果是主花， 返回主花(不返回原花色)
PokerHuaQuanJiao.prototype.calColorSdh = function(num, zhuColorType) {
    if (!num) return -1;
    // 0:方块  1:梅花  2:红心  3:黑桃 4:主花
    var cardType = -1;
    if(this.isZhuCard(num, zhuColorType)) {
        cardType = 4;
    } else {
        cardType = (num + 3) % 4;
    }
    return cardType;
}

// 判断此牌是否是主花
PokerHuaQuanJiao.prototype.isZhuCard = function(num, zhuColorType) {
    var point = this.calPoint(num);
    var color = this.calColor(num);

    if( color == zhuColorType || this.cardCfg.changZhuByPoint[point] )
    {
        return true;
    } else {
        return false;
    }
}

PokerHuaQuanJiao.prototype.getRoundFirstCards = function(putCardsRecord, uid, maxPlayNum) {
    if(!putCardsRecord || typeof putCardsRecord == 'undefined') {
        return null;
    }

    var roundPutCards = putCardsRecord[putCardsRecord.length - 1];

    if(!roundPutCards || typeof roundPutCards == 'undefined') {
        return null;
    }
    if(Object.keys(roundPutCards).length == maxPlayNum) {
        return null;
    }
    return roundPutCards[uid];
}

PokerHuaQuanJiao.prototype.getRoundCardsByUid = function(putCardsRecord, uid, maxPlayNum) {
    if(!putCardsRecord || typeof putCardsRecord == 'undefined') {
        return null;
    }

    var roundPutCards = putCardsRecord[putCardsRecord.length - 1];

    if(!roundPutCards || typeof roundPutCards == 'undefined') {
        return null;
    }

    return roundPutCards[uid];
}

// 获取本轮最大的牌， 同点数先出比后出的大
PokerHuaQuanJiao.prototype.getMaxCardPlayerUid = function(roundPutCards, firstPutUid, uids, zhuColorType) {
    var frontUid = -1;
    if(!roundPutCards || typeof roundPutCards == 'undefined') {
        return frontUid;
    }

    var index = uids.indexOf(firstPutUid);
    for(var i=0; i<uids.length; i++) {
        index = index % uids.length;
        var uid = uids[index];
        if(frontUid > 0) {
            var tmpcards = roundPutCards[frontUid];
            var cards = roundPutCards[uid];
            if(cards && tmpcards && this.isBigger(tmpcards, cards, zhuColorType) > 0) {
                frontUid = parseInt(uid);
            }
        } else {
            frontUid = parseInt(uid);
        }
        index++
    }

    return frontUid;
}

PokerHuaQuanJiao.prototype.getAllCardFen = function( fenPaiArr ) {
    var fen = 0;
    for(var i in fenPaiArr) {
        var card = fenPaiArr[i];
        fen += this.getCardFen(card);
    }
    return fen;
}

// 获得牌的分  非分牌返回0分 
PokerHuaQuanJiao.prototype.getCardFen = function(num) {
    var cardValue = this.calPoint(num);
    var cfg = {'5': 5,  '10': 10,  '13': 10}
    return cfg[cardValue] || 0;
}

// 获取所有对应牌数的拖拉机组合
PokerHuaQuanJiao.prototype.getLianDuiCards = function(oCards, cardNum, zhuColorType) {
    if(oCards.length < cardNum) return false;
    var resCards = [];
    for(var i=0; i < oCards.length - cardNum + 1; i++) {
        var cards = oCards.slice(i, i + cardNum);
        if( this.isLiandui(cards, zhuColorType) ) 
            resCards.push(cards);
    }

    if(resCards.length > 0) {
        return resCards;
    } else {
        return false;
    }
}

// 获取所有对应牌数的拖拉机组合
PokerHuaQuanJiao.prototype.getDuiZis = function(oCards, zhuColorType) {
    if(oCards.length < 2) return false;
    var resCards = [];
    for(var i=0; i < oCards.length - 1; i++) {
        var cards = oCards.slice(i, i + 2);
        if( this.isDuizi(cards) ) 
            resCards.push(cards);
    }

    if(resCards.length > 0) {
        return resCards;
    } else {
        return false;
    }
}

PokerHuaQuanJiao.prototype.countDuiNum = function(oCards, zhuColorType) {
    var num = 0;
    var cardNumByValue = {};
    for(var i in oCards){
        var cardValue = this.calPointBySdh(oCards[i], zhuColorType);
        var cardValue = oCards[i];
        if(!cardNumByValue[cardValue]){
            cardNumByValue[cardValue] = 1;  
        } else {
            cardNumByValue[cardValue]++;
            if(cardNumByValue[cardValue] % 2 == 0)
                num++;
        }
    }

    return num;
}

/**
 * 判断是否是连对
 * @param {array} oCards 按点数排好序的牌
 * @return {bool}
 */
PokerHuaQuanJiao.prototype.isLiandui = function(oCards, zhuColorType) { //oCards有序
    var cardNum = CARDCOUNT[CARDTYPE.liandui];// 连对最小牌数

    if (!oCards || oCards.length < cardNum || oCards.length % 2 != 0)
        return false;

    var cardCount = oCards.length;
    var points = [];
    var colors = [];
    var colorsSdh = [];
    for (var i = 0; i < oCards.length; i++) {
        points.push(this.calPointBySdh(oCards[i], zhuColorType));
        colors.push(this.calColor(oCards[i]));
        colorsSdh.push(this.calColorSdh(oCards[i], zhuColorType));
    }

    for(var i=0; i < cardCount - 1; i++) {
        // 判断花色
        if( colorsSdh[i] != colorsSdh[i+1] ) return false;
        // 判断对子
        if (i % 2 == 0 && (points[i] != points[i + 1] || colors[i] != colors[i + 1] )) {
            return false; 
        }

        // 判断连对
        if(i % 2 == 1 && Math.abs(points[i] - points[i+1]) != 1 ){
            return false;
        }
    }

    return true;
};

PokerHuaQuanJiao.prototype.isDuizi = function(oCards) {
    if(oCards.length == 2 && oCards[0] == oCards[1] ) {
        return true;
    } else {
        return false;
    }
}

/**
 * 计算牌型
 * @param {array} cards 按点数排好序的牌
 * @return {CARDTYPE} 牌型，-1 = 不成型
 */
PokerHuaQuanJiao.prototype.calType = function(cards, zhuColorType) {
    var cardCount = cards.length;

    // 拖拉机，2对
    if (cardCount == CARDCOUNT[CARDTYPE.liandui]  && this.isLiandui(cards, zhuColorType))
        return CARDTYPE.liandui;

    // 火车皮，3对起
    if (cardCount >= CARDCOUNT[CARDTYPE.huochepi]  && this.isLiandui(cards, zhuColorType))
        return CARDTYPE.huochepi;

    // 对子
    if (cardCount == 2 && this.isDuizi(cards) )
        return CARDTYPE.duizi;

    // 单牌
    if (cardCount == 1)
        return CARDTYPE.danpai;

    return -1;
};

/**
 * 计算牌型点数
 * @param {array} cards 按点数排好序的牌
 * @return {number}
 */
PokerHuaQuanJiao.prototype.calCardsValue = function(cards, zhuColorType) {
    if (!cards || cards.length == 0)
        return -1;

    var lastCard = cards[cards.length - 1];

    return this.calPointBySdh(lastCard, zhuColorType);
};

// // 牌点比较函数
PokerHuaQuanJiao.prototype.cardValueCmp = function(a, b, zhuColorType) {
    var pa = this.calPointBySdh(a, zhuColorType);
    var pb = this.calPointBySdh(b, zhuColorType);
    if (pa == pb)
        return a - b;
    
    return pa - pb;
};

/** 
 * 牌是否能压上
 * @param {array} oCards 被压的牌，可以组成牌型的牌
 * @param {array} [oLastCards] 按点数排好序的牌/最后打出的牌
 * @return {number} -1:oCards比oLastCard小  0:相等  1:大
 */
PokerHuaQuanJiao.prototype.isBigger = function(beiYaCards, oLastCards, zhuColorType) {

    var cardsType = this.calType(beiYaCards, zhuColorType);
    if (cardsType == -1){
        return -1;
    } else if ( !oLastCards || typeof oLastCards == 'undefined' || oLastCards.length == 0) {
        return 1;
    }

    // 同花色 或 是主牌 才能比较点数
    var beiYaCardsColor = this.calColorSdh(beiYaCards[0], zhuColorType);
    var oLastCardsColor1 = this.calColorSdh(oLastCards[0], zhuColorType);
    var oLastCardsColor2 = this.calColorSdh(oLastCards[oLastCards.length - 1], zhuColorType);
    // 如果提起的牌 花色不全相同  或 和被压牌不相同 并 不是主牌 点数比被压牌小
    if(oLastCardsColor1 != oLastCardsColor2 || (oLastCardsColor1 != beiYaCardsColor && oLastCardsColor1 != 4) ) {
        return -1;
    }

    var lastCardsType = this.calType(oLastCards, zhuColorType);
    if (cardsType == lastCardsType ) {
        var beiYaTypeValue = this.calCardsValue(beiYaCards, zhuColorType);
        var lastTypeValue = this.calCardsValue(oLastCards, zhuColorType);
        if(lastTypeValue > beiYaTypeValue) {
            return 1;
        }else if(lastTypeValue == beiYaTypeValue) {
            return 0;
        }else {
            return -1;
        }
    }

    return -1;
};  


PokerHuaQuanJiao.prototype.checkPut = function(oHands, cards) {
    if(!cards || typeof(cards)=='undefined' || cards.length == 0) return null;
    if(!oHands || typeof(oHands)=='undefined' || oHands.length == 0) return null;

    var hands = oHands.slice();
    for (var i = 0; i < cards.length; i++) {
        var p = hands.indexOf(cards[i]);
        if (p >= 0) {
            hands.splice(p, 1);
        }
        else {
            return null; // 手里没有这些牌
        }
    }

    return hands;
};

/**
 * 检测是否能出牌
 * @param  {Array} oHands 手牌
 * @param  {Array} outCards 提起的牌/选择了的牌
 * @param  {Array} oBeiYaCard 被压的牌
 * @return {Array} 返回可以出的牌
 */
PokerHuaQuanJiao.prototype.checkPutSdh = function(oHands, pOutCards, oBeiYaCard, zhuColorType, isCanShuaiPai, tData) {
    if(!pOutCards || typeof(pOutCards)=='undefined' || pOutCards.length == 0) return null;
    if(!oHands || typeof(oHands)=='undefined' || oHands.length == 0) return null;


    var outCards = pOutCards.slice();
    var outCards = this.sortHandCards(outCards, zhuColorType);
    var hands = this.checkPut(oHands, outCards);

    if(hands == null)
        return null;

    // 首出牌， 同花色的 单张， 对子 连对
    if(!oBeiYaCard || oBeiYaCard.length <= 0) {
        var color = this.calColorSdh(outCards[0], zhuColorType);
        var colorcards = this.getColorCards(outCards, [color], zhuColorType);
        // 花色不是全部相同，不能打出
        if(colorcards.length != outCards.length) {
            return null;
        }

        // 甩牌 只能甩主牌
        if(isCanShuaiPai && color == 4) {
            return hands;
        }

        var outCardType = this.calType(outCards, zhuColorType);
        if( outCardType < 0) return null;

    // 检测是否打出同花色的牌
    } else if( oBeiYaCard && oBeiYaCard.length > 0 ) {
        var beiyaColor = this.calColorSdh(oBeiYaCard[0], zhuColorType);
        var handColorSameCards = this.getColorCards(oHands, [beiyaColor], zhuColorType);
        var handColorSameNum = handColorSameCards.length;
        var outCardsSameColorNum = this.getColorCards(outCards, [beiyaColor], zhuColorType).length;

        // 如果选择的牌是同花色， 有相同牌型需要打相同牌型， 牌型不够需要补牌， 没有牌型才能随意出
        if(outCards.length <= handColorSameNum &&  outCardsSameColorNum == outCards.length) {
            var oBeiYaType = this.calType(oBeiYaCard, zhuColorType);
            var outCardType = this.calType(outCards, zhuColorType);
            // 被压的是拖拉机， 
            if(outCardType != oBeiYaType && (oBeiYaType == CARDTYPE.liandui || oBeiYaType == CARDTYPE.huochepi)) {
                var needPutLianDui = false;
                var needPutDuiZi = false;

                var handColorSameCards = this.sortHandCards(handColorSameCards, zhuColorType);

                if (this.getLianDuiCards(handColorSameCards, oBeiYaCard.length, zhuColorType)) {
                    if (!this.isLiandui(outCards, zhuColorType)) {
                        // 同花色的牌有拖拉机， 但是提起的不是拖拉机， 不能打出
                        needPutLianDui = true;
                    }
                }

                if (!needPutLianDui && !needPutDuiZi) {
                    // 同花色的牌有对子， 但是没有提起对应的对子， 不能打出
                    var duiNum = this.countDuiNum(handColorSameCards, zhuColorType);
                    var needPutDuiZiNum = duiNum*2 > oBeiYaCard.length ? oBeiYaCard.length/2 : duiNum;
                    var outDuiNum = this.countDuiNum(outCards, zhuColorType);
                    if( outDuiNum < needPutDuiZiNum)
                        needPutDuiZi = true;
                }

                if(needPutLianDui || needPutDuiZi)
                    return null;
            }

            // 被压的是对子
            if(outCardType != oBeiYaType && oBeiYaType == CARDTYPE.duizi ) {
                // 同花色的牌有对子， 但是提起的不是对子， 不能打出
                if( this.countDuiNum(handColorSameCards, zhuColorType) > 0 && !this.isDuizi(outCards))
                    return null;
            }

        }

        // 如果同花色的牌足够 
        if(outCards.length <= handColorSameNum &&  outCardsSameColorNum < outCards.length) {
            return null;
        }
        // 如果同花色的牌不够  没有提起所有花色， 不能出牌
        if(outCards.length > handColorSameNum && outCardsSameColorNum < handColorSameNum) {
            return null;
        }

        if( oBeiYaCard.length != outCards.length ) {
            return null;
        }

    } else {
        return null;
    }

    var sortCards = this.sortHandCards(outCards, zhuColorType)
    var sortLastCards = this.sortHandCards(oBeiYaCard, zhuColorType)

    return hands;

}



PokerHuaQuanJiao.prototype.findCardByType = function(oHands, oBeiYaCard, zhuColorType) {
    if(!oBeiYaCard || typeof(oBeiYaCard)=='undefined') return [];

    var firstCardColor = this.calColorSdh(oBeiYaCard[0], zhuColorType);
    var handsColorCards = this.getColorCards(oHands, [firstCardColor], zhuColorType);

    if( handsColorCards.length >= oBeiYaCard.length ) {
        return handsColorCards;
    } else {
        return oHands;
    }

};


/**
 * 提示可出的牌
 * @param  {array} oHands 用来压牌的手牌
 * @param  {array} oBeiYaCard 被压的牌
 * @return {array} 提示的牌
 */
PokerHuaQuanJiao.prototype.tipCards = function(oHands, oBeiYaCard, zhuColorType) {
    // cc.log("----------------tipCards", oHands)
    // cc.log("----------------tipCards", oBeiYaCard)
    // cc.log("----------------tipCards", zhuColorType)
    // 如果不需要压牌， 可以任意出牌
    if(!oBeiYaCard) {
        return [oHands];
    } else {
        var firstCardColor = this.calColorSdh(oBeiYaCard[0], zhuColorType);
        var handsColorCards = this.getColorCards(oHands, [firstCardColor], zhuColorType);
        oBeiYaCard = this.sortHandCards(oBeiYaCard, zhuColorType);
        handsColorCards = this.sortHandCards(handsColorCards, zhuColorType).reverse();
        var beiyaType = this.calType(oBeiYaCard, zhuColorType);
        var tiparr = [];
        var cardNum = oBeiYaCard.length;
        this.cardlog(handsColorCards, zhuColorType);
        if( handsColorCards.length >= cardNum ) {

            // 压拖拉机 
            if(beiyaType == CARDTYPE.liandui || beiyaType == CARDTYPE.huochepi) {
                // 有拖拉机出拖拉机 

                // 补充逻辑：拖拉机去除单牌，解决类似两个黑桃2和两个梅花2中间夹一个红桃2不是拖拉机的问题
                var sourceCards = handsColorCards.slice();
                for (var i = 0; i < sourceCards.length;) {
                    if (i % 2 == 0 && sourceCards[i] != sourceCards[i + 1]) {
                        sourceCards.splice(i,1);
                        continue;
                    }
                    
                    i++;
                }

                var lianduis = this.getLianDuiCards(sourceCards, cardNum, zhuColorType);
                if( lianduis ) {
                    tiparr = tiparr.concat(lianduis);
                } else {

                    // 没有拖拉机出对子  
                    var duizis = this.getDuiZis(handsColorCards, zhuColorType);
                    if( duizis ) {
                        if(duizis.length * 2 >= cardNum) {
                            for(var i = 0; i < (duizis.length - cardNum/2 + 1); i++) {
                                var tmpduizi = []
                                for(var j = 0; j < cardNum/2; j++) {
                                    tmpduizi = tmpduizi.concat(duizis[i+j]);
                                }
                                tiparr.push(tmpduizi);
                            }

                        // 对子不够 用单牌 (全同花色)
                        } else {
                            var tmpduizi = []
                            for(var i = 0; i < duizis.length; i++) {
                                tmpduizi = tmpduizi.concat(duizis[i]);
                            }
                            var delcard = this.delCards(handsColorCards, tmpduizi);
                            var needNum = cardNum - tmpduizi.length;
                            for(var i=0; i < delcard.length - needNum + 1; i++) {
                                var sanpai = delcard.slice(i, i + needNum);
                                tiparr.push(tmpduizi.concat(sanpai));
                            }
                        }

                    // 没有对子 用单牌
                    } else {
                        for(var i=0; i < handsColorCards.length - cardNum + 1; i++) {
                            var sanpai = handsColorCards.slice(i, i + cardNum);
                            tiparr.push(sanpai);
                        }
                    }
                }

            // 压对子 有对子出对子 没有对子出单牌 (全同花色)
            } else if (beiyaType == CARDTYPE.duizi) {
                var duizis = this.getDuiZis(handsColorCards, zhuColorType);
                if( duizis ) {
                    tiparr = tiparr.concat(duizis);
                } else {
                    for(var i=0; i < handsColorCards.length; i++) {
                        if (handsColorCards[i + 1])
                            tiparr.push([handsColorCards[i], handsColorCards[i+1]]);
                    }
                }

            // 有单牌 (全同花色)
            } else if(beiyaType == CARDTYPE.danpai) {
                for(var i = 0; i < handsColorCards.length; i++) {
                    if (i == 0 || tiparr[tiparr.length-1][0] != handsColorCards[i]) tiparr.push([handsColorCards[i]])
                }
            }
            return tiparr;

        // 同花色不够 用其他花色凑
        } else {
            var needNum = cardNum - handsColorCards.length;

            var delcard = this.delCards(oHands, handsColorCards);
            delcard = this.sortHandCards(delcard, zhuColorType).reverse();
            var lastSanPai = null;
            for(var i=0; i < delcard.length - needNum + 1; i++) {
                var sanpai = delcard.slice(i, i + needNum);
                if (lastSanPai && JSON.stringify(lastSanPai) == JSON.stringify(sanpai))
                    continue;
                tiparr.push(handsColorCards.concat(sanpai));
                lastSanPai = sanpai;
            }
            return tiparr;
        }
            
    }
};

/**
 * 对手牌从大到小排序
 * @param {array} 
 * @param {number} zhuColorType 主牌花色
 */
PokerHuaQuanJiao.prototype.sortHandCards = function(oCards, zhuColorType) {
    if( !oCards || typeof oCards != 'object' ) return [];
    var cards = oCards.slice();
    var sortColors = []
    sortColors[0] = [0, 3, 2, 1];    // 主花为方：方黑红梅
    sortColors[1] = [1, 2, 3, 0];    // 主花为梅：梅红黑方
    sortColors[2] = [2, 3, 0, 1];    // 主花为红：红黑方梅
    sortColors[3] = [3, 2, 1, 0];    // 主花为黑：黑红梅方

    var fs = function(a, b) {
        var ca = this.calColor(a);
        var cb = this.calColor(b);
        var cza = this.calColorSdh(a, zhuColorType);
        var czb = this.calColorSdh(b, zhuColorType);

        if(cza != czb )
        {
            // 如果有选主，非主牌的排序 主牌==4
            if (cza != 4 && czb != 4){
                var sortcol = sortColors[zhuColorType];
                return sortcol.indexOf(ca) - sortcol.indexOf(cb);

            // 主牌排序
            } else {
                return czb - cza;
            }
        }

        var pa = this.calPointBySdh(a, zhuColorType);
        var pb = this.calPointBySdh(b, zhuColorType);

        if(pa == pb) {
            return cb - ca;
        } else {
            return pb - pa;
        }


    }.bind(this)

    cards.sort(fs);
    return cards;
};

/** 
 * 找N张点数一样的牌
 * @param {array} hands 按点数排好序的牌 
 * @param {number} points
 * @param {number}
 * @return {array}
 */
PokerHuaQuanJiao.prototype.findNSameCard = function(hands, point, n, zhuColorType) {
    var newh = this.sortHandCards(hands, zhuColorType);
    for (var i = 0; i < newh.length; i++) {
        var pa = this.calPointBySdh(newh[i], zhuColorType);
        var pb = this.calPointBySdh(newh[i + n - 1], zhuColorType);
        if (pa == point && pb == point)
            return newh.slice(i, i + n);
    }
    return null;
};

// 删除相应牌值(不算花色)
PokerHuaQuanJiao.prototype.delPoint = function(hands, points){
    var arr = hands.slice();
    for(var i=0; i < points.length; i++){
        for (var j = 0; j < arr.length; j++) {
            var jp = this.calPointBySdh(arr[j], zhuColorType);
            if( jp == points[i] ){
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

// 删除相同的牌(花色相同，牌值相同)
PokerHuaQuanJiao.prototype.delCards = function(hands, cards) {
    var arr = hands.slice();
    for(var i=0; i < cards.length; i++){
        for (var j = 0; j < arr.length; j++) {
            if( arr[j] == cards[i] ){
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

// 从牌组中获取指定花色
PokerHuaQuanJiao.prototype.getColorCards = function(cards, colors, zhuColorType) {
    var arr = [];
    for(var i=0; i < cards.length; i++) {
        var num = cards[i];
        var color = this.calColorSdh(num, zhuColorType);
        if(colors.indexOf(color) >= 0) {
            arr.push(num);
        }
    }
    return arr;
}

PokerHuaQuanJiao.prototype.formatCards = function(oCards, zhuColorType) {
    var info = {};
    // key:牌值  value:数量  (10有3张）
    info.mValueToNum = {};
    // key:数量  value:牌值  (3张的牌有10, K, 4)
    info.mNumToValue = {};

    var cds = this.sortHandCards(oCards, zhuColorType);
    info.cds = cds;

    for(var i in cds){
        var value = this.calPointBySdh(cds[i]);
        if( !info.mValueToNum[value] ) info.mValueToNum[value] = [];

        info.mValueToNum[value].push(cds[i]);
    }

    for(var i in cds){
        var value = this.calPointBySdh(cds[i]);
        var num = info.mValueToNum[value].length;

        if( !info.mNumToValue[num] ) info.mNumToValue[num] = [];

        if( info.mNumToValue[num].indexOf(value) < 0 )
            info.mNumToValue[num].push(value);
    }

    return info;
}

PokerHuaQuanJiao.prototype.isSameCards = function(cards1, cards2, zhuColorType) {
    if(cards1.length != cards2.length) return false;
    var cds1 = this.sortHandCards(cards1, zhuColorType);
    var cds2 = this.sortHandCards(cards2, zhuColorType);

    for(var i in cds1){
        if(cds1[i] != cds2[i])
            return false;
    }

    return true;
}

PokerHuaQuanJiao.prototype.isAllZhuCard = function(cards, zhuColorType) {
    for (var i = 0; i < cards.length; i++) {
        if(!this.isZhuCard(cards[i], zhuColorType)){
            return false;
		}
        
    }
    return true;
}

// 求出牌型
PokerHuaQuanJiao.prototype.cardsType = function(oCards, zhuColorType) {
    if (oCards) {
        return this.calType(oCards, zhuColorType);
    }
    return -1;
};

// 检查是否是一次可以出完
PokerHuaQuanJiao.prototype.checkPutByOneTimes = function (oHands, zhuColorType) {
    var cards = this.sortHandCards(oHands.slice(), zhuColorType);
    return this.cardsType(cards, zhuColorType) != -1;
};


if(typeof(module)!="undefined" && module.exports)    
    module.exports = PokerHuaQuanJiao;

if(typeof(MjClient)!="undefined")
    MjClient.poker_HuaQuanJiao = new PokerHuaQuanJiao();

})();