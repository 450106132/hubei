//掼蛋算法类
(function() {
function Tuantuanzhuan() {
    this.handCount = 27;
    this.laiziCard = 7;
}

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
    tianwangzha: 112,
    shizha: 111,
    jiuzha: 110,
    bazha: 109,
    qizha: 108,
    liuzha: 107,
    tonghuashun: 106,
    wuzha: 105,
    sizha: 104,
    big: 100, // 大牌分界线
    gangban: 7,
    liandui: 6,
    sandaier: 5,
    shunzi: 4,
    sanzhang: 3,
    duizi: 2,
    danpai: 1,
};
Tuantuanzhuan.prototype.CARDTPYE = CARDTPYE;
var CARDCOUNT = {};
CARDCOUNT[CARDTPYE.tianwangzha] = 4;
CARDCOUNT[CARDTPYE.shizha] = 10;
CARDCOUNT[CARDTPYE.jiuzha] = 9;
CARDCOUNT[CARDTPYE.bazha] = 8;
CARDCOUNT[CARDTPYE.qizha] = 7;
CARDCOUNT[CARDTPYE.liuzha] = 6;
CARDCOUNT[CARDTPYE.tonghuashun] = 5;
CARDCOUNT[CARDTPYE.wuzha] = 5;
CARDCOUNT[CARDTPYE.sizha] = 4;
CARDCOUNT[CARDTPYE.gangban] = 6;
CARDCOUNT[CARDTPYE.liandui] = 6;
CARDCOUNT[CARDTPYE.sandaier] = 5;
CARDCOUNT[CARDTPYE.shunzi] = 5;
CARDCOUNT[CARDTPYE.sanzhang] = 3;
CARDCOUNT[CARDTPYE.duizi] = 2;
CARDCOUNT[CARDTPYE.danpai] = 1;

// 随机牌
// 扑克牌1——54分别为：方片A、梅花A、红心A、黑桃A、方片2……黑桃K、小王、大王
Tuantuanzhuan.prototype.randomCards = function(withWind) {
    var cards = [];
    for (var i = 1; i <= DAWANG; i++) {
        cards.push(i);
        cards.push(i);
    }
    cards.sort(function (a, b) {
        return .5 - Math.random();
    });
    return cards;
};

function calPoint(num) {
    if (!num) {
        return -1;
    }
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

Tuantuanzhuan.prototype.isShun = function(oCards, laizi) { //oCards有序
    if (!oCards) {
        return false;
    }
    var cardCount = oCards.length + laizi;
    if (cardCount != CARDCOUNT[CARDTPYE.shunzi] || oCards[oCards.length - 1] >= XIAOWANG) {
        return false; // 非5张、有大小王不会是顺子
    }
    var cards = [];
    for (var i = 0; i < oCards.length; i++) {
        cards.push(Math.ceil(oCards[i] / 4)); // 只考虑点数
    }
    // 特殊顺子检测10JQKA
    var specialShunCount = cards[cards.length - 1] == 1 ? 1 : 0; // 最后一张手牌是否A
    for (var i = KPOINT; i >= KPOINT + 2 - cardCount; i--) {
        if (cards.indexOf(i) >= 0) {
            specialShunCount++;
        }
    }
    if (specialShunCount + laizi == cardCount) {
        return true;
    }
    // 普通顺子检测
    for (var first = 1; first <= KPOINT + 1 - cardCount; first++) {
        var shunCount = 0;
        for (var j = 0; j < CARDCOUNT[CARDTPYE.shunzi]; j++) {
            if (cards.indexOf(first + j) >= 0) {
                shunCount++;
            }
        }
        if (shunCount + laizi == cardCount) {
            return true;
        }
    }
    return false;
};

// 同花顺
Tuantuanzhuan.prototype.isTonghuashun = function(cards, laizi) {
    if (!cards || cards.length == 0) {
        return false;
    }
    var color = cards[0] % 4;
    for (var i = 1; i < cards.length; i++) {
        if (cards[i] % 4 != color) {
            return false; //花色不同
        }
    }
    return this.isShun(cards, laizi);
};

Tuantuanzhuan.prototype.isLiandui = function(oCards, laizi) { //oCards有序
    if (!oCards) {
        return false;
    }
    var cardCount = oCards.length + laizi;
    if (cardCount != CARDCOUNT[CARDTPYE.liandui] || oCards[oCards.length - 1] >= XIAOWANG) {
        return false; // 非6张、有大小王不会是顺子
    }
    var cards = [];
    for (var i = 0; i < oCards.length; i++) {
        cards.push(Math.ceil(oCards[i] / 4)); // 只考虑点数
    }
    cards.sort(function (a, b) {return a - b;}); // 按牌面排序，修复112233和223344三连对无法出牌
    // 特殊连对检测QQKKAA
    var QQKKAA = [12, 12, 13, 13, 1, 1];
    var specialCount = 0;
    for (var i = cards.length - 1; i >= 0; i--) {
        var p = QQKKAA.indexOf(cards[i]);
        if (p >= 0) {
            specialCount++;
            QQKKAA.splice(p, 1);
        }
    }
    if (specialCount + laizi == cardCount) {
        return true;
    }
    // 普通连对检测
    var common = [cards[0], cards[0], cards[0] + 1, cards[0] + 1, cards[0] + 2, cards[0] + 2];
    var lianduiCount = 0;
    for (var i = cards.length - 1; i >= 0 ; i--) {
        var p = common.indexOf(cards[i]);
        if (p >= 0) {
            lianduiCount++;
            common.splice(p, 1);
        }
    }
    if (lianduiCount + laizi == cardCount) {
        return true;
    }
    return false;
};

Tuantuanzhuan.prototype.isSandaier = function(cards, laizi) {
    var cardCount = cards.length + laizi;
    if (cardCount != CARDCOUNT[CARDTPYE.sandaier]) {
        return false; // 非5张
    }
    var cardSet = {};
    for (var i = 0; i < cards.length; i++) {
        cardSet[calPoint(cards[i])] = 1;
    }
    var numCount = Object.keys(cardSet).length;
    if (cards[cards.length - 1] >= XIAOWANG && cards[cards.length - 2] < XIAOWANG && laizi == 2) {
        return false; // 含一张王两个癞子不算三带二
    }
    return numCount == 2 || numCount == 1 && laizi == 2;
};

// 计算牌型
Tuantuanzhuan.prototype.calType = function(cards, laizi) {
    var cardCount = cards.length + laizi;
    if (cardCount == 4 && laizi == 0 && cards[0] == XIAOWANG) {
        return CARDTPYE.tianwangzha;
    }
    var allSame = calPoint(cards[0]) == calPoint(cards[cards.length - 1]);
    var pointCounts = {};
    for (var i = 0; i < cards.length; i++) {
        var p = calPoint(cards[i]);
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
    var numCount = Object.keys(pointCounts).length;
    // 炸弹：第一张牌与最后一张牌点数一样
    if (cardCount >= 4 && allSame) {
        var bombType = CARDTPYE.big + cardCount;
        if (cardCount >= 6) {
            bombType++;
        }
        return bombType;
    }
    if (cardCount == 6) {
        if (numCount == 2 && (maxCount == 2 && laizi == 2 || maxCount == 3)) {
            if (calPoint(cards[0]) + 1 == calPoint(cards[cards.length - 1])
                || calPoint(cards[0]) == 3 && calPoint(cards[cards.length - 1]) == ZHUPOINT) {
                return CARDTPYE.gangban;
            }
        }
        if (maxCount == 2 && this.isLiandui(cards, laizi)) {
            return CARDTPYE.liandui;
        }
    }
    else if (cardCount == 5) {
        if (maxCount == 1 && this.isTonghuashun(cards, laizi)) {
            return CARDTPYE.tonghuashun;
        }
        if (maxCount == 1 && this.isShun(cards, laizi)) {
            return CARDTPYE.shunzi;
        }
        if (maxCount >= 2 && maxCount <= 3 && this.isSandaier(cards, laizi)) {
            return CARDTPYE.sandaier;
        }
    }
    else if (cardCount == 3) {
        if (laizi > 0 && cards[0] >= XIAOWANG) {
            // 癞子和王，没这样的牌
        }
        else if (allSame) {
            return CARDTPYE.sanzhang;
        }
    }
    else if (cardCount == 2) {
        if (laizi > 0 && cards[0] >= XIAOWANG) {
            // 癞子和王，没这样的牌
        }
        else if (laizi == 2 || allSame) {
            return CARDTPYE.duizi;
        }
    }
    else if (cardCount == 1) {
        return CARDTPYE.danpai;
    }
    return -1;
};

// 计算牌型点数，一般为较大那张牌，特殊牌型特殊处理
Tuantuanzhuan.prototype.calCardsValue = function(cards, laizi, type) {
    if (!cards || cards.length + laizi == 0) {
        return -1;
    }
    if (cards.length == 0) {
        if (laizi > 0) {
            return ZHUPOINT;
        }
        else {
            logger.error("牌型错误", cards, laizi, type);
            return -1;
        }
    }
    if (!type) {
        type = this.calType(cards, laizi);
    }
    var lastCard = cards[cards.length - 1];
    var valueCard = lastCard;
    if (type == CARDTPYE.shunzi || type == CARDTPYE.tonghuashun) {
        var firstPoint = Math.ceil(cards[0] / 4);
        var lastPoint = Math.ceil(lastCard / 4);
        if (lastPoint == 1 && firstPoint > 5 || firstPoint > 9 && laizi > 0) {
            return APOINT; // 10JQKA
        }
        if (firstPoint <= 5 && lastPoint <= 5) {
            if (calPoint(cards[cards.length - 2]) == APOINT || calPoint(cards[cards.length - 1]) == APOINT) {
                return 5; // 345A2
            }
            return 6; // 34562
        }
        else {
            return calPoint(cards[0]) + 4; // 34567
        }
    }
    else if (type == CARDTPYE.sandaier) {
        if (lastCard >= XIAOWANG) {
            return calPoint(cards[0]);
        }
        return calPoint(cards[2]);
    }
    else if (type == CARDTPYE.gangban) {
        if (calPoint(lastCard) == ZHUPOINT) {
            if (cards[0] <= 4) {
                return 2; // AAA222为最小钢板
            }
            return calPoint(cards[0]); 
        }
    }
    else if (type == CARDTPYE.liandui) {
        if (calPoint(lastCard) == ZHUPOINT) {
            for (var i = cards.length - 1; i >= 0; i--) {
                if (calPoint(cards[i]) == APOINT) {
                    return 3; // 33AA22为最小连对
                }
            }
            return 4; 
        }
        if (laizi >= 2) {
            if (calPoint(lastCard) == APOINT && calPoint(cards[0]) == 3) {
                return 3; // 33AA22为最小连对
            }
            return calPoint(cards[0]) + 2;
        }
    }
    return calPoint(valueCard);
};

// 牌点比较函数
Tuantuanzhuan.prototype.cardValueCmp = function(a, b) {
    var pa = calPoint(a);
    var pb = calPoint(b);
    if (pa == pb) {
        return a - b;
    }
    return pa - pb;
};

// 剔除癞子、返回癞子数
Tuantuanzhuan.prototype.transformAndGetLaizi = function(oCards, cards) {
    var laizi = 0;
    if(!oCards) return 0;
    
    for (var i = 0; i < oCards.length; i++) {
        if (oCards[i] == this.laiziCard) {
            laizi++; // 红心二是癞子
        }
        else {
            cards.push(oCards[i]);
        }
    }
    cards.sort(this.cardValueCmp);
    return laizi;
};

// 牌是否能压上
Tuantuanzhuan.prototype.canPut = function(oCards, oLastCards) {
    var cards = [];
    var laizi = this.transformAndGetLaizi(oCards, cards);
    var cardsType = this.calType(cards, laizi);
    if (cardsType == -1) {
        return false;
    }
    if (!oLastCards) {
        return true; // 没有上次打的牌，三家过自己再出牌
    }
    var lastCards = [];
    var lastLaizi = this.transformAndGetLaizi(oLastCards, lastCards);
    var lastCardsType = this.calType(lastCards, lastLaizi);
    if (cardsType == lastCardsType) {
        var typeValue = this.calCardsValue(cards, laizi, cardsType);
        var lastTypeValue = this.calCardsValue(lastCards, lastLaizi, lastCardsType);
        return typeValue > lastTypeValue;
    }
    else if (cardsType > CARDTPYE.big && cardsType > lastCardsType) {
        return true;
    }
    return false;
};

// 检查是否能出牌
Tuantuanzhuan.prototype.checkPut = function(oHands, cards, lastCards) {
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
    if (this.canPut(cards, lastCards)) {
        return hands; // 能打得过上家的牌
    }
    return null;
};

// 对手牌排序，普通牌型和同花顺优先排序
Tuantuanzhuan.prototype.sortHandCards = function(oCards, sortType) {
    var cards = oCards.slice();
    var cmp = this.cardValueCmp;
    var commonCmp = this.cardValueCmp;
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
            var p = calPoint(cards[i]);
            if (pointCounts[p]) {
                pointCounts[p]++;
            }
            else {
                pointCounts[p] = 1;
            }
        }
        commonCmp = function (a, b) {
            var c1 = pointCounts[calPoint(a)];
            var c2 = pointCounts[calPoint(b)];
            if (c1 == c2) {
                return cmp(a, b);
            }
            return c1 - c2;
        }
    }
    cards.sort(function(a, b) {
        return -commonCmp(a, b);
    });
    return cards;
};

// 找N张点数一样的牌
Tuantuanzhuan.prototype.findNSameCard = function(hands, point, n) { 
    if (point == XIAOWANGPOINT) {
        point = XIAOWANG;
    }
    if (point == DAWANGPOINT) {
        point = DAWANG;
    }
    for (var i = 0; i < hands.length; i++) {
        if (calPoint(hands[i]) == point && calPoint(hands[i + n - 1]) == point) {
            return hands.slice(i, i + n);
        }
    }
    return null;
};

// 用laizi张癞子去拼出type牌型的牌
Tuantuanzhuan.prototype.findCardByType = function(hands, laizi, type) { 
    var rets = [];
    var laizis = [];
    var cardCount = CARDCOUNT[type];
    if (laizi > cardCount || laizi + hands.length < cardCount) {
        return rets;
    }
    for (var i = 0; i < laizi; i++) {
        laizis.push(this.laiziCard);
    }
    if (type == CARDTPYE.tianwangzha) {
        if (laizi == 0 && hands[hands.length - 4] == XIAOWANG) {
            rets.push(hands.slice(-4));
        }
    }
    else if (type == CARDTPYE.tonghuashun) {
        for (var i = 1; i <= 10; i++) { // 顺子首张
            for (var cl = 0; cl < 4; cl++) { // 花色
                var shun = laizis.slice();
                for (var j = 0; j < cardCount; j++) { // 顺子五张牌
                    var card = (i + j) * 4 - cl;
                    if (card >= XIAOWANG) {
                        card = 4 - cl;
                    }
                    if (hands.indexOf(card) >= 0) {
                        shun.push(card);
                        if (shun.length == cardCount) {
                            rets.push(shun);
                            break;
                        }
                    }
                }
            }
        }
    }
    else if (type >= CARDTPYE.sizha && type <= CARDTPYE.shizha || type == CARDTPYE.sanzhang) {
        for (var i = MINPOINT; i <= ZHUPOINT; i++) {
            var find = this.findNSameCard(hands, i, cardCount - laizi);
            if (find) {
                rets.push(laizis.concat(find));
            }
        }
    }
    else if (type == CARDTPYE.gangban) {
        for (var aLaizi = 0; aLaizi <= laizi; aLaizi++) {
            for (var i = MINPOINT; i <= ZHUPOINT; i++) {
                var temp1 = this.findNSameCard(hands, i, 3 - aLaizi);
                if (temp1) {
                    var next = i == ZHUPOINT ? 3 : i + 1;
                    var temp2 = this.findNSameCard(hands, next, 3 - (laizi - aLaizi));
                    if (temp2) {
                        rets.push(laizis.concat(temp1).concat(temp2));
                    }
                }
            }
        }
    }
    else if (type == CARDTPYE.liandui) {
        for (var i = MINPOINT; i <= ZHUPOINT; i++) { // 连对首张
            if (i == KPOINT) continue;
            var ldCount = 0;
            var ret = laizis.slice();
            for (var j = 0; j < 3; j++) {
                var p = i + j;
                if (p > ZHUPOINT) {
                    p -= KPOINT;
                }
                for (var k = 0; k < hands.length; k++) {
                    if (calPoint(hands[k]) == p) {
                        ldCount++;
                        ret.push(hands[k]);
                        if (calPoint(hands[k + 1]) == p) {
                            ldCount++;
                            ret.push(hands[k + 1]);
                        }
                        break;
                    }
                }
            }
            if (ldCount + laizi == cardCount) {
                rets.push(ret);
            }
        }
    }
    else if (type == CARDTPYE.sandaier) {
        for (var aLaizi = 0; aLaizi <= laizi; aLaizi++) {
            for (var i = MINPOINT; i <= ZHUPOINT; i++) {
                var temp1 = this.findNSameCard(hands, i, 3 - aLaizi);
                if (temp1) {
                    if(2 - (laizi - aLaizi) > 0) {
                        for (var j = MINPOINT; j <= DAWANGPOINT; j++) {
                            if (i != j) {
                                var temp2 = this.findNSameCard(hands, j, 2 - (laizi - aLaizi));
                                if (temp2) {
                                    rets.push(laizis.concat(temp1).concat(temp2));
                                }
                            }
                        }
                    }
                    else {
                        rets.push(laizis.concat(temp1));
                    }
                }
            }
        }
    }
    else if (type == CARDTPYE.shunzi) {
        for (var i = MINPOINT; i <= ZHUPOINT; i++) { // 顺子首张
            var shun = laizis.slice();
            for (var j = 0; j < cardCount; j++) { // 顺子五张牌
                var p = i + j;
                if (p > ZHUPOINT) {
                    p -= KPOINT;
                }
                var find = this.findNSameCard(hands, p, 1);
                if (find) {
                    shun = shun.concat(find);
                }
            }
            if (shun.length == cardCount) {
                rets.push(shun);
            }
        }
    }
    else if (type == CARDTPYE.duizi) {
        for (var i = MINPOINT; i <= DAWANGPOINT; i++) {
            var find = this.findNSameCard(hands, i, cardCount - laizi);
            if (find) {
                rets.push(laizis.concat(find));
            }
        }
    }
    else if (type == CARDTPYE.danpai) {
        if (laizis.length == 1) {
            rets.push(laizis.slice());
        }
        else {
            for (var i = MINPOINT; i <= DAWANGPOINT; i++) {
                var find = this.findNSameCard(hands, i, 1);
                if (find) {
                    rets.push(find);
                }
            }
        }
    }
    return rets;
};

// 同花顺提示
Tuantuanzhuan.prototype.tipTonghuashuns = function(oHands) {
    var hands = [];
    var handLaizi = this.transformAndGetLaizi(oHands, hands);
    var rets = [[], [], [], []];
    for (var laizi = 0; laizi <= handLaizi; laizi++) {
        var tonghuashuns = this.findCardByType(hands, laizi, CARDTPYE.tonghuashun);
        for (var i = 0; i < tonghuashuns.length; i++) {
            var cards = tonghuashuns[i];
            var color = cards[cards.length - 1] % 4;
            rets[color].push(cards);
        }
    }
    return rets;
};

// 求解提示出牌
Tuantuanzhuan.prototype.tipCards = function(oHands, oLastCards) {
    var hands = [];
    var handLaizi = this.transformAndGetLaizi(oHands, hands);
    var lastCards = [];
    var lastLaizi = this.transformAndGetLaizi(oLastCards, lastCards);
    var lastCardsType = this.calType(lastCards, lastLaizi);
    var rets = [];
    for (var laizi = 0; laizi <= handLaizi; laizi++) {
        var sameTypeCards = this.findCardByType(hands, laizi, lastCardsType);
        for (var i = 0; i < sameTypeCards.length; i++) {
            if (this.canPut(sameTypeCards[i], oLastCards)) {
                rets.push(sameTypeCards[i]);
            }
        }
        for (var type = Math.max(CARDTPYE.sizha, lastCardsType + 1); type <= CARDTPYE.tianwangzha; type++) {
            var bombCards = this.findCardByType(hands, laizi, type);
            rets = rets.concat(bombCards)
        }
    }
    return rets;
};

// 求出牌型
Tuantuanzhuan.prototype.cardsType = function(oCards) {
    if (oCards) {
        var cards = [];
        var laizi = this.transformAndGetLaizi(oCards, cards);
        return this.calType(cards, laizi);
    }
    return -1;
};

if(typeof(module)!="undefined" && module.exports)    
    module.exports = Tuantuanzhuan;
if(typeof(MjClient)!="undefined")
    MjClient.majiang_tuantuanzhuan = new Tuantuanzhuan();

})();