//跑得快算法类
(function() {
function Paodekuai() {
    PaodekuaiBase.apply(this,arguments);

    this.XIAOWANG = 53;
    this.DAWANG = 54;
    this.HONG_TAO_3 = 11;
    this.PDK_CARDCOUNT[this.CARDTPYE.feiji] = 6;
    this.cardCfg.firstOutCard = this.cardCfg.hx[3]

}

Paodekuai.prototype = Object.create(PaodekuaiBase.prototype);
Paodekuai.prototype.constructor = Paodekuai

// 扑克牌1——52分别为：方片A、梅花A、红心A、黑桃2、黑桃A……红心K
// 跑得快需要的牌数：一副扑克牌去掉大小王、三张2和黑桃A，一共就是48张牌。
Paodekuai.prototype.randomCards = function(areaSelectMode, tData) {
    var cards = [];
    /// 发47张牌， 去掉 大小王， 3张2， 黑桃A, 红桃3
    for (var i = 1; i <= 54; i++) {
        if(i==this.DAWANG || i==this.XIAOWANG 
            || i==(2-1)*4+1 || i==(2-1)*4+2 || i==(2-1)*4+3 
            || i==4 || i==this.HONG_TAO_3)
        {
            continue;
        }

        cards.push(i);
    }
    shuffleArray(cards);
    // 如果是两人玩， 取前31张牌
    if(tData && tData.maxPlayer == 2){
        cards = cards.slice(0, 31);
    }
    // 将红桃三查放入牌堆，再次洗牌
    cards.push(this.HONG_TAO_3);
    shuffleArray(cards);
    return cards;
};

Paodekuai.prototype.formatFeiJiType = function(oCards){
    // 记录所有3张的数值
    var sanSameList = [];
    // 记录散牌
    var sanPaiList = [];
    var sanShunAndSanPai = this.getSanShunAndSanPai(oCards);

    sanSameList = sanShunAndSanPai[0];
    sanPaiList = sanShunAndSanPai[1];

    // 将3张里的 最大数量的3顺 整理出来
    var maxCountShunIndex1 = 0;     // 最大数量的3顺 的数组下表始值
    var maxCountShunIndex2 = -3;    // 最大数量的3顺 的数组下表终值
    var countSanShun = 0;         // 3顺最大数量的
    var tempCountSanShun = 0;
    for(var i=0; i<sanSameList.length/3; i++){
        if(i==0){
            tempCountSanShun++;
            continue;
        }    
        
        var cardPoint1 = this.calPoint(sanSameList[i*3]);
        var cardPoint2 = this.calPoint(sanSameList[i*3-1]);
        var isLastCount = i==(sanSameList.length/3 - 1);    // 此3张是否为最后3张
        var isSanShun = (cardPoint1-cardPoint2) <= 1;       // 此3张和前3张是否为顺

        // 如果是 3顺， 顺数量+1
        if( isSanShun )   tempCountSanShun++;

        // 如果不是 3顺， 顺的数量 比 前面顺的数量多 (数量最大的顺作为 飞机)
        // 如果和前3张组成3顺， 且是最后的3张， 
        if(  (!isSanShun || isSanShun && isLastCount )
            && countSanShun <= tempCountSanShun){
            maxCountShunIndex2 = (i+1)*3 - 1;
            countSanShun = tempCountSanShun;
        }

    }
    maxCountShunIndex1 = maxCountShunIndex2 - countSanShun*3 + 1

    var sanShunList = []
    for(var i in sanSameList){
        if(i>=maxCountShunIndex1 && i<=maxCountShunIndex2){
            sanShunList.push(sanSameList[i]);
            
        }else{
            sanPaiList.push(sanSameList[i]);
        }
    }

    var feijiInfo = {}
    feijiInfo.BU_SHI_FEI_JI = 0 // 飞机类型: 不是飞机
    feijiInfo.DAI_CHI_BANG = 1; // 飞机类型: 带翅膀
    feijiInfo.DAN_ZHANG_CHI_BANG = 2;// 飞机类型: 带单张的翅膀
    feijiInfo.NO_CHI_BANG = 3;  // 飞机类型: 不带翅膀
    feijiInfo.value = 0;    // 飞机的牌值
    feijiInfo.type = feijiInfo.BU_SHI_FEI_JI; // 飞机类型


    // 包含四张同样的牌不算飞机
    for(var i=0; i < oCards.length; i++){
        var cardValue = this.calPoint(oCards[i]);
        var findCards = this.findNSameCard(oCards, cardValue, 4);
        if(findCards) return feijiInfo;
    }


    if(0 == sanShunList.length) return feijiInfo;

    // 飞机带翅膀
    // var duiNum = this.countDuiNum(sanPaiList);
    // if(sanShunList.length/3 == duiNum) // 翅膀需要是对子  333-444555-6   333444-6789  
    // if(feijiInfo.type == feijiInfo.BU_SHI_FEI_JI && sanShunList.length/3 >= sanPaiList.length/2 && oCards.length % 5 == 0) // 翅膀任意牌
    //     feijiInfo.type = feijiInfo.DAI_CHI_BANG;

    // 带对应单张的飞机
    // 如果是 用3张作翅膀的牌型: 555666777888  333444555666777888999101010 
    if(feijiInfo.type == feijiInfo.BU_SHI_FEI_JI && 0 == sanShunList.length % 12 && 0 == sanPaiList.length)
        feijiInfo.type = feijiInfo.DAN_ZHANG_CHI_BANG;
    // 如果飞机和翅膀数量相等
    if(feijiInfo.type == feijiInfo.BU_SHI_FEI_JI && sanPaiList.length == sanShunList.length/3)
        feijiInfo.type = feijiInfo.DAN_ZHANG_CHI_BANG;

    // 不带翅膀 的飞机
    if(sanShunList.length > 0 && sanPaiList.length == 0)
    // if(feijiInfo.type == feijiInfo.BU_SHI_FEI_JI && sanShunList.length > 0 && sanPaiList.length <= sanShunList.length/3*2) // 任意翅膀数量的飞机
        feijiInfo.type = feijiInfo.NO_CHI_BANG;

    if(feijiInfo.type != feijiInfo.BU_SHI_FEI_JI){
        feijiInfo.value = sanShunList[sanShunList.length-1];
    }

    // console.log('sanSameList', sanSameList.toString());
    // console.log('sanShunList', sanShunList.toString());
    // console.log('sanPaiList', sanPaiList.toString());
    return feijiInfo;
}

Paodekuai.prototype.isZhaDan = function(oCards, areaSelectMode) {
    if(!oCards || oCards.length ==0) return false;

    var cardType = this.calType(oCards, areaSelectMode);

    // 四炸
    if( cardType == this.CARDTPYE.sizha
        || cardType == this.CARDTPYE.sangeA)
    {
        return true;
    } else {
        return false;
    }
}

// 是否包含炸弹， 例: 55556 包含炸弹 5555不算包含炸弹
Paodekuai.prototype.isHadZhaDan = function(cards) {
    for(var i=0; i < cards.length; i++){
        var cardValue = this.calPoint(cards[i]);
        var isHadZhaDan = this.findNSameCard(cards, cardValue, 4);
        if(isHadZhaDan && cards.length > 4) return true;
    }

    if(this.findNSameCard(cards, this.PDK_APOINT, 3) && cards.length > 3)
        return true;

    return false;
}

// 是否拆散了炸弹牌型
Paodekuai.prototype.isChaiZhaDan = function(handCards, putCards, areaSelectMode){
     // 炸弹不可拆 但是可以 四带2 四代3 等四张一块出
    for(var i=0; i < putCards.length; i++){
        var cardValue = this.calPoint(putCards[i]);
        var findHand = this.findNSameCard(handCards, cardValue, 4);
        var findCards = this.findNSameCard(putCards, cardValue, 4);
        // putCards 有属于炸弹的牌， 而且 没有包含完整的炸弹牌型
        if(findHand && !findCards) {
            return true;
        }

        var isPutA = this.findNSameCard(putCards, this.PDK_APOINT, 1);
        if(isPutA) {
            // 3A的炸弹
            var findHand3A = this.findNSameCard(handCards, this.PDK_APOINT, 3);
            var findCards3A = this.findNSameCard(putCards, this.PDK_APOINT, 3);
            // 如果拆了3个A
            if(findHand3A && !findCards3A) {
                return true;
            } 
        }
    }

    return false;
}

/**
 * 计算牌型
 * @param {array} cards 按点数排好序的牌
 * @return {this.CARDTPYE} 牌型，-1 = 不成型
 */
Paodekuai.prototype.calType = function(pCards) {
    var maxSameCard = 0;
    var cards = pCards.slice();
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
            maxSameCard = p;
        }
    }

    // 三个A  和三顺牌型相似， 避免判断为三顺， 放到三顺前
    if (cardCount == 3 && allSame && this.calPoint(cards[0]) == this.PDK_APOINT)
        return this.CARDTPYE.sangeA || -1;

    // 飞机
    if(cardCount >= 6 && maxCount >= 3 && this.isFeiJi(cards)!=0 ){
        return this.CARDTPYE.feiji || -1;
    }

    // 3顺
    if(cardCount >= 3 && maxCount == 3 && this.isSanShun(cards)){
        return this.CARDTPYE.sanshun || -1;
    }

    // 顺子，5张起
    if (cardCount >= 5 && maxCount == 1 && this.isShun(cards))
        return this.CARDTPYE.shunzi || -1;

    // 连对，2对起
    if (cardCount >= 4 && maxCount == 2 && this.isLiandui(cards))
        return this.CARDTPYE.liandui || -1;

    //四带二
    if (cardCount == 6 && maxCount == 4 )
        return this.CARDTPYE.sidaier || -1;

    //三带一
    if (cardCount == 4 && maxCount == 3 )
        return this.CARDTPYE.sandaiyi || -1;

    //四炸
    if (cardCount == 4 && allSame)
        return this.CARDTPYE.sizha || -1;

    // 三张
    if (cardCount == 3 && allSame)
        return this.CARDTPYE.sanzhang || -1;

    // 对子
    if (cardCount == 2 && allSame)
        return this.CARDTPYE.duizi || -1;

    // 单牌
    if (cardCount == 1)
        return this.CARDTPYE.danpai || -1;

    return -1;
};

/**
 * 计算牌型点数
 * @param {array} cards 按点数排好序的牌
 * @return {number}
 */
Paodekuai.prototype.calCardsValue = function(cards, type) {

    if (!cards || cards.length == 0)
        return -1;
    
    if (!type)
        type = this.calType(cards);
    
    var lastCard = cards[cards.length - 1];
    
    if (type == this.CARDTPYE.sandaiyi)
        return this.calPoint(cards[2]);
    
    if (type == this.CARDTPYE.sidaier)
        return this.calPoint(cards[3]);
    
    if (type == this.CARDTPYE.feiji)
        return   this.calPoint( this.isFeiJi(cards) );

    // 单牌，对子，三张，顺子，连对，四炸，三个A
    return this.calPoint(lastCard);
};

/** 
 * 牌是否能压上
 * @param {array} oCards 按点数排好序的牌/选择了的手牌
 * @param {array} [oLastCards] 按点数排好序的牌/最后打出的牌
 * @param {number} [handsNum] 手牌数量
 */
Paodekuai.prototype.canPut = function(oCards, oLastCards, handsNum) {
    var cardsType = this.calType(oCards);

    if (cardsType == -1)
        return false;

    // 不能出3张 或 3顺不能出
    if (cardsType == this.CARDTPYE.sanzhang){
        if( oCards.length == handsNum && !oLastCards) {// 如果最后一手牌是3张或3顺
            return true;
        } else {
            return false;
        
        }
    }

    if( cardsType == this.CARDTPYE.feiji ) {
        var feijiInfo = this.formatFeiJiType(oCards);
        if(feijiInfo.type == feijiInfo.NO_CHI_BANG){
            if ( oCards.length == handsNum && !oLastCards) {
                return true;
            } else {
                return false;
            }
        }
    }


    // 没有上次打的牌，三家过自己再出牌
    if (!oLastCards || oLastCards.length==0 || oLastCards=='undefined')
        return true;

    if ((cardsType == this.CARDTPYE.shunzi || cardsType == this.CARDTPYE.liandui) && oCards.length != oLastCards.length)
        return false;

    oCards.sort(this.cardValueCmp.bind(this));
    oLastCards.sort(this.cardValueCmp.bind(this));

    var lastCardsType = this.calType(oLastCards);
    if (cardsType == lastCardsType && oCards.length == oLastCards.length) {
        var typeValue = this.calCardsValue(oCards, cardsType);
        var lastTypeValue = this.calCardsValue(oLastCards, lastCardsType);
        return typeValue > lastTypeValue;
    }
    else if(this.PDK_CARD_VALUE[cardsType]) {
        var last_card_value = this.PDK_CARD_VALUE[lastCardsType] || 0;
        return this.PDK_CARD_VALUE[cardsType] > last_card_value;
    }

    return false;
};

// 检查是否能出牌
/**
 * 检测是否能出牌
 * @param  {Array} oHands 手牌
 * @param  {Array} cards 提起的牌/选择了的牌
 * @param  {Array} lastCards 上次出的牌/打在桌面上的牌
 * @param  {bool}  mustPutHongTaoSan   必须出红桃三
 * @param  {bool}  isNextPlayerOneCard 下家是否为报单
 * @return {Array} 返回可以出的牌
 */
Paodekuai.prototype.checkPut = function(oHands, cards, lastCards, mustPutHongTaoSan, isNextPlayerOneCard) {
    if(cards && typeof(cards)!='undefined' && cards.length == 0) return null;

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

    // 选择 红桃三先出时 有红桃三必须出
    if (mustPutHongTaoSan && cards.indexOf(this.HONG_TAO_3)<0 && oHands.indexOf(this.HONG_TAO_3)>=0){
        return null;
    }

    // 如果 下家报单 提起的一张牌 不是最大的牌
    var sortHand = oHands.slice();
    sortHand.sort(this.cardValueCmp.bind(this));
    var maxCards = this.getAllMaxCard(oHands);

    if(isNextPlayerOneCard && cards.length==1 && this.calPoint(maxCards[0]) != this.calPoint(cards[0]) )
        return null;


    var sortCards = cards;
    var sortLastCards = lastCards;

    if (typeof(sortLastCards) == "number")
        sortLastCards = null;

    if (sortCards){
        sortCards = sortCards.slice();
        sortCards.sort(this.cardValueCmp.bind(this));
    }
    if (sortLastCards){
        sortLastCards = sortLastCards.slice(),
        sortLastCards.sort(this.cardValueCmp.bind(this));
    }

    if (this.canPut(sortCards, sortLastCards, oHands.length)) {
        return hands; // 能打得过上家的牌
    }
    return null;
};

/**
 * 对手牌排序
 * @param {array} 
 * @param {number} sortType 1 = 花色排序, 2 = 张数排序, 0 ==普通牌型
 */
Paodekuai.prototype.sortHandCards = function(oCards, sortType) {
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
        }
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
        }
    }

    cards.sort(function(a, b) {
        return -commonCmp(a, b);
    });
    return cards;
};

// 删除相应牌值
Paodekuai.prototype.delPoint = function(hands, points, values){
    var arr = hands.slice();
    var delitems = points || values;
    for(var i=0; i < delitems.length; i++){
        for (var j = 0; j < arr.length; j++) {
            if( points && this.calPoint(arr[j]) == delitems[i] ){
                arr.splice(j, 1);
                j--;
            }else if( values && arr[j] == delitems[i] ){
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

/** 
 * 用laizi张癞子去拼出type牌型的牌
 * @param {array} hands 按点数按好序的牌
 * @param {number} laizi 所使用的癞子数
 * @param {this.CARDTPYE} type 要拼出的牌型
 * @param {array} lastCards 最后一手牌
 * @param {array} 拼好的 
 */
Paodekuai.prototype.findCardByType = function(hands, laizi, type, lastCards, buChaiTypes) {
    var rets = [];
    var laizis = [];
    var cardNum = typeof(lastCards)!='undefined' ? lastCards.length : null;
    var cardCount = this.PDK_CARDCOUNT[type];

    if (cardNum && (type == this.CARDTPYE.liandui || type == this.CARDTPYE.shunzi))
        cardCount = cardNum;

    if (laizi > cardCount || laizi + hands.length < cardCount) {
        return rets;
    }

    for (var i = 0; i < laizi; i++) {
        laizis.push(this.laiziCard);
    }

    if (type == this.CARDTPYE.feiji && hands.length >= cardCount) {
        var handFeiji = this.getSanShunAndSanPai(hands);
        var handCardSanZhangNum = handFeiji[0].length/3;
        var handCardSanPaiNum = handFeiji[1].length;

        if (handCardSanZhangNum >= 2)
        {
            if (lastCards && lastCards != -1 && lastCards.length > 0)
            {
                var lastCardsFeiji = this.getSanShunAndSanPai(lastCards);
                var lastCardSanZhangNum = lastCardsFeiji[0].length/3;
                var lastCardSanPaiNum = lastCardsFeiji[1].length;

                if(handCardSanZhangNum >= lastCardSanZhangNum){
                    var sanShun = [];
                    var sanpai = [];
                    for(var i=0; i<handCardSanZhangNum; i++){
                        var startSanIndex = i*3;
                        var lastSanIndex = i*3+lastCardSanZhangNum*3;
                        sanShun = handFeiji[0].slice(startSanIndex, lastSanIndex)
                        if(sanShun.length != lastCardsFeiji[0].length) continue;
                        var feiJiValue_a = this.formatFeiJiType(handFeiji[0]).value;
                        var feiJiValue_b = this.formatFeiJiType(lastCardsFeiji[0]).value;
                        if(feiJiValue_a < feiJiValue_b) continue;
                        sanpai = handFeiji[0].slice(0, startSanIndex);
                        sanpai = sanpai.concat(handFeiji[0].slice(lastSanIndex, handFeiji[0].length));
                        sanpai = sanpai.concat(handFeiji[1]);

                        if (lastCardSanPaiNum > 0) {
                            var allSanPaiZhuHe = [];
                            if (this.useNewTip) {
                                allSanPaiZhuHe = this.findDaiPai(sanpai, this.CARDTPYE.feiji, lastCardSanPaiNum, false, buChaiTypes);

                            } else {
                                allSanPaiZhuHe = this.lieju(sanpai, lastCardSanPaiNum);   // 列举所有散牌组合
                            }

                            for(var j in allSanPaiZhuHe){
                                var ret = sanShun.concat( allSanPaiZhuHe[j] );
                                if (this.isFeiJi(ret) != 0){
                                    rets.push(ret);
                                }
                            }

                        } else {
                            var ret = sanShun.concat(sanpai)
                            rets.push(ret);
                        }
                    }
                }
            }
            else
            {
                // 首次出牌或者其他玩家过牌

                // var lastCardSanZhangNum = 0;
                // var lastCardSanPaiNum = 0;
                // for(var k = handCardSanZhangNum; k >= 2; k--)
                // {
                //     lastCardSanZhangNum = k;

                //     for(var m = lastCardSanZhangNum; m >= 0; m--)
                //     {
                //         lastCardSanPaiNum = Math.min(handCardSanPaiNum,m*2);

                //         if(handCardSanZhangNum >= lastCardSanZhangNum)
                //         {
                //             var sanShun = [];
                //             var sanpai = [];

                //             for(var i=0; i<handCardSanZhangNum; i++)
                //             {
                //                 var startSanIndex = i*3;
                //                 var lastSanIndex = i*3+lastCardSanZhangNum*3;

                //                 sanShun = handFeiji[0].slice(startSanIndex, lastSanIndex)
                //                 sanpai = handFeiji[0].slice(0, startSanIndex);
                //                 sanpai = sanpai.concat(handFeiji[0].slice(lastSanIndex, handFeiji[1].length-lastSanIndex));
                //                 sanpai = sanpai.concat(handFeiji[1]);

                //                 if (lastCardSanPaiNum > 0) {
                //                     var allSanPaiZhuHe = [];

                //                     if (this.useNewTip) 
                //                     {
                //                         allSanPaiZhuHe = this.findDaiPai(sanpai, this.CARDTPYE.feiji, lastCardSanPaiNum, false, buChaiTypes);
                //                     } 
                //                     else 
                //                     {
                //                         allSanPaiZhuHe = this.lieju(sanpai, lastCardSanPaiNum);   // 列举所有散牌组合
                //                     }

                //                     for(var j in allSanPaiZhuHe)
                //                     {
                //                         var ret = sanShun.concat( allSanPaiZhuHe[j] );

                //                         ret.sort(this.cardValueCmp.bind(this));

                //                         if(this.isFeiJi(ret) != 0)
                //                         {
                //                             rets.push(ret);
                //                         }
                //                     }
                //                 }
                //                 else
                //                 {
                //                      var ret = sanShun.concat(sanpai)
                //                      rets.push(ret);
                //                 }
                //             }
                //         }
                //     }
                // }
            }
        }
        
    }else if (type == this.CARDTPYE.sangeA) {
        if (laizi == 0)
        {
            var find = this.findNSameCard(hands, this.PDK_APOINT, 3);
            if (find)
                rets.push(find);
        }
    }
    else if (type == this.CARDTPYE.sizha  || type == this.CARDTPYE.duizi || type == this.CARDTPYE.sanzhang) { 
        for (var i = this.PDK_MINPOINT; i <= this.PDK_MAXPOINT; i++) {
            var find = this.findNSameCard(hands, i, cardCount - laizi);
            if (find) {
                rets.push(laizis.concat(find));
            }
        }
    }
    else if (type == this.CARDTPYE.liandui) {
        for (var i = this.PDK_MINPOINT; i <= this.PDK_APOINT - cardCount/2 + 1; i++) // 连对首张
        {
            var ldCount = 0;
            var ret = laizis.slice();
            for (var j = 0; j < cardCount/2; j++) 
            {
                var p = i + j;
                for (var k = 0; k < hands.length - 1; k++) 
                {
                    var point1 = this.calPoint(hands[k]);
                    var point2 = this.calPoint(hands[k + 1]);
                    if (point1 != p || point2 != p)
                        continue;

                    ldCount += 2;
                    ret.push(hands[k]);
                    ret.push(hands[k + 1]);
                    break;
                }
            }
            if (ldCount + laizi == cardCount) {
                rets.push(ret);
            }
        }
    }
    else if (type == this.CARDTPYE.sandaiyi) {
        for (var aLaizi = 0; aLaizi <= laizi; aLaizi++) 
        {
            for (var i = this.PDK_MINPOINT; i <= this.PDK_MAXPOINT; i++) 
            {
                var temp1 = this.findNSameCard(hands, i, 3 - aLaizi);
                if (!temp1)
                    continue;

                if(1 - (laizi - aLaizi) <= 0) 
                {
                    rets.push(laizis.concat(temp1));
                    continue;
                }
                
                if (this.useNewTip) {
                    var newHands = this.delPoint(hands, [i]);
                    var findCards = this.findDaiPai(newHands, type, 1, false, buChaiTypes);
                    for (var j in findCards) {
                        var ret = laizis.concat(temp1);
                        ret = ret.concat(findCards[j]);
                        rets.push(ret);
                    }
                }
                else {
                    for( var j in hands)
                    {
                        var cardPoint = this.calPoint(hands[j]);
                        if(cardPoint != i){
                            rets.push(laizis.concat(temp1).concat(hands[j])); 
                        }
                    }
                }
            }
        }
    }
    else if (type == this.CARDTPYE.shunzi) {
        for (var i = this.PDK_MINPOINT; i <= this.PDK_APOINT - cardCount + 1; i++) { // 顺子首张
            var shun = laizis.slice();

            for (var j = 0; j < cardCount; j++) {
                var p = i + j;
                var find = this.findNSameCard(hands, p, 1);
                if( (p-1)==this.PDK_KPOINT )  // 如果上张牌是K ,需要考虑计算A
                    find = this.findNSameCard(hands, this.PDK_APOINT, 1);

                if (find)
                    shun = shun.concat(find);
            }
            if (shun.length == cardCount)
                rets.push(shun);
        }
    }
    else if (type == this.CARDTPYE.danpai) {
        if (laizis.length == 1) {
            rets.push(laizis.slice());
        }
        else {
            var handsCopy = hands.slice();
            handsCopy.sort(this.cardValueCmp.bind(this));

            for (var i = this.PDK_MINPOINT; i <= this.PDK_MAXPOINT; i++) 
            {
                //cc.log("hands " + hands + " i = " + i);
                // 效率太低，废弃
                // var find = this.findNSameCard(hands, i, 1);
                // if (find)
                //     rets.push(find);

                for (var j = 0; j < handsCopy.length; j++) {
                    if (this.calPoint(handsCopy[j]) == i) {
                        rets.push([handsCopy[j]]);
                        break;
                    }
                }
            }
        }
    }
    else if (type == this.CARDTPYE.sidaier){
        for (var i = this.PDK_MINPOINT; i <= this.PDK_MAXPOINT; i++)
        {
            var find = this.findNSameCard(hands, i, 4);
            if(!find)
                continue;

            if (this.useNewTip) {
                var newHands = this.delPoint(hands, [i]);
                var findCards = this.findDaiPai(newHands, type, 2, false, buChaiTypes);
                for (var j in findCards) {
                    var ret = laizis.concat(find);
                    ret = ret.concat(findCards[j]);
                    rets.push(ret);
                }
            } else {
                for (var k = 0; k < hands.length - 1; k++) 
                {   
                    var cardPoint1 = this.calPoint(hands[k]);

                    if(cardPoint1==i) continue;

                    for (var j = 0; j < hands.length - 1; j++) 
                    {   
                        var cardPoint2 = this.calPoint(hands[j]);
                        if(cardPoint2==i || j==k) continue;
                        
                        var ret = laizis.slice();
                        ret = ret.concat(find);
                        ret.push(hands[k]);
                        ret.push(hands[j]);
                        rets.push(ret);
                    }
                }  
            }
        }
    }

    return rets;
};

// 此函数只供提示出牌调用
Paodekuai.prototype.findCardByType_fast = function(hands, laizi, type, lastCards, buChaiTypes) {
    if (!this.findCardByTypeCache)
        this.findCardByTypeCache = [];
    
    var argumentsStr = JSON.stringify(arguments);
    for (var i = 0; i < this.findCardByTypeCache.length; i ++) {
        if (this.findCardByTypeCache[i].argumentsStr == argumentsStr)
            return JSON.parse(this.findCardByTypeCache[i].retValueStr);
    }
    
    var retValue = this.findCardByType(hands, laizi, type, lastCards, buChaiTypes);
    this.findCardByTypeCache.push({argumentsStr: argumentsStr, retValueStr: JSON.stringify(retValue)});
    return retValue;
}

Paodekuai.prototype.initCanPutTypes = function(hands, includeCard) {
    if (!this.canPutTypesCache)
        this.canPutTypesCache = [];
    
    var argumentsStr = JSON.stringify(arguments);
    for (var i = 0; i < this.canPutTypesCache.length; i ++) {
        if (this.canPutTypesCache[i].argumentsStr == argumentsStr)
            return JSON.parse(this.canPutTypesCache[i].retValueStr);
    }

    var info = this.formatCards(hands);
    info.mValueToCards = info.mValueToNum;
    var tempHands = hands.slice();
    if (includeCard > 0)
        tempHands.splice(tempHands.indexOf(includeCard), 1);

    var getNumFunc = function(hands, value, type, thxCards, sameNum, haveNum) {
        if (haveNum < sameNum)
            return 0;

        var cards = this.findCardByType_fast(hands, 0, type);
        var num = 0;
        for (var i = 0; i < cards.length; i++) {
            for (var j = 0; j < cards[i].length; j++) {
                if (this.calPoint(cards[i][j]) != value)
                    continue;

                var newHands = hands.slice();
                for (var k = 0; k < cards[i].length; k++) {
                    newHands.splice(newHands.indexOf(cards[i][k]), 1);
                }
                var ret = getNumFunc(newHands, value, type, thxCards, sameNum, haveNum - sameNum);
                if (num < ret + sameNum)
                    num = ret + sameNum;
                break;
            }
        }

        if (this.CARDTPYE.sztonghua && this.CARDTPYE.sztonghua == type) {
            for (var i = 0; i < cards.length; i++) {
                for (var j = 0; j < cards[i].length; j++) {
                    if (thxCards.indexOf(cards[i][j]) < 0)
                        thxCards.push(cards[i][j]);
                }
            }
        }

        return num;
    }.bind(this);

    var valueToCanTypes = {};
    var thxCards = [];
    for (var value in info.mValueToCards) {
        value = Number(value);
        valueToCanTypes[value] = [];
    }

    for (var index = 0; index < this.pdk_allBuChaiType.length; index++) {
        var type = this.pdk_allBuChaiType[index];
        if (!type)
            continue;

        var cards = this.findCardByType_fast(tempHands, 0, type);
        if (cards.length <= 0 || this.calType(cards[0]) != type)
            continue;

        var allValues = [];
        for (var i = 0; i < cards.length; i++) {
            for (var j = 0; j < cards[i].length; j++) {
                var value = this.calPoint(cards[i][j])
                allValues[value] = 1;
            }
        }

        var sameNum = 1;
        var point = this.calPoint(cards[0][0]);
        for (var i = 1; i < cards[0].length; i ++) {
            if (this.calPoint(cards[0][i]) == point)
                sameNum ++;
        }

        for (var value in allValues) {
            if (info.mValueToCards[value] >= sameNum*2)
                valueToCanTypes[value][type] = getNumFunc(tempHands, value, type, thxCards, sameNum, info.mValueToCards[value]);
            else    
                valueToCanTypes[value][type] = sameNum;
        }
    }

    info.mValueToCanTypes = valueToCanTypes;
    info.thxCards = thxCards;

    this.canPutTypesCache.push({argumentsStr: argumentsStr, retValueStr: JSON.stringify(info)});

    return info;
}

/**
 * 提示可出的牌
 * @param  {array} oHands 我的手牌
 * @param  {array} oLastCards 上家出的牌
 * @param  {Boolean} isNextPlayerOneCard 下家是否报单
 * @param  {Boolean} isFirstRound 是否第一局
 * @param  {array} [putOrder] 提示优先级规则
 * @return {array} 提示的牌
 */
Paodekuai.prototype.findPutTipCards = function(hands, lastCards, isMustPutHongTaoSan, isNextPlayerOneCard, putOrder, allBuChaiTypes) {
    //cc.log("hands=" + JSON.stringify(hands) + " lastCards=" + JSON.stringify(lastCards));

    var startTime = new Date().getTime();
    hands = hands.slice();
    hands.sort(this.cardValueCmp.bind(this));

    var rets = [];
    var lastType = 0;
    if (!lastCards || lastCards == -1)
        lastCards = [];
    
    //  红桃/黑桃3先手提示
    var includeCard = -1;

    //当勾“先出红桃三”选项时，提示出红桃三
    if (isMustPutHongTaoSan && hands.indexOf(this.HONG_TAO_3) >=0){
        lastType = 99;
        includeCard = this.HONG_TAO_3;
    } else if (lastCards.length > 0) {
        lastType = this.calType(lastCards);
    }
    if (!putOrder)
        putOrder = this.pdk_putOrder[lastType];
    if (!putOrder)
        return rets;

    putOrder = putOrder.slice();

    var info = this.initCanPutTypes(hands, includeCard);

    var getBuChaiTypes = function(buChaiTypes, allBuChaiTypes) {
        buChaiTypes = buChaiTypes.slice();
        // 不拆牌型中可能还包函数组（为了好配置）
        for (var j = 0; j < buChaiTypes.length; j ++) {
            if (buChaiTypes[j] && typeof(buChaiTypes[j]) !== "number") {
                buChaiTypes = buChaiTypes.concat(buChaiTypes[j]);
                buChaiTypes.splice(j, 1);
                j --;
            }
        }
        if (allBuChaiTypes) {
            for (var j = 0; j < allBuChaiTypes.length; j ++) {
                if (buChaiTypes.indexOf(allBuChaiTypes[j]) < 0)
                    buChaiTypes.push(allBuChaiTypes[j]);
            }
        }
        return buChaiTypes;
    }.bind(this);

    // 排除不满足不拆牌型后剩下的牌值-数量对
    var getCanPutValueNums = function(type, buChaiTypes) {
        var canPutValueNums = [];
        for (var value in info.mValueToCards) {
            value = Number(value);
            var canUseNum = info.mValueToCards[value].length; // 不拆牌后的数量
            var canTypes = info.mValueToCanTypes[value].slice();

            if (canTypes[type]) {
                canTypes[type] = 0;
            }
            if (this.pdk_cardTypeSub[type]) {
                for (var i = 0; i < this.pdk_cardTypeSub[type].length; i++) {
                    if (canTypes[this.pdk_cardTypeSub[type][i]])
                        canTypes[this.pdk_cardTypeSub[type][i]] = 0;
                }
            }

            for (var i in canTypes) {
                i = Number(i);
                if (!canTypes[i] || buChaiTypes.indexOf(i) < 0)
                    continue;

                canUseNum -= canTypes[i];
            }

            if (canUseNum > 0) {
                canPutValueNums[value] = canUseNum;
            }
        }
        return canPutValueNums;
    }.bind(this);

    var isHaveCards = function(rets, cards) {
        var cardsStr = cards.slice().sort().toString();
        for (var i = 0; i < rets.length; i++) {
            if (rets[i].slice().sort().toString() == cardsStr)
                return true;
        }
        return false;
    }.bind(this);

    var replaceIncludeCard = function(includeCard, cards) {
        for (var i = cards.length - 1; i >= 0; i--) {
            if (cards[i].indexOf(includeCard) >= 0) 
                continue;
            
            var includeValue = this.calPoint(includeCard);
            for (var j = cards[i].length - 1; j >= 0; j--) {
                if (this.calPoint(cards[i][j]) == includeValue) {
                    cards[i][j] = includeCard;
                    break;
                }
            }

            if (cards[i].indexOf(includeCard) >= 0)
                continue;

            cards.splice(i, 1);
        }
        return cards;
    }.bind(this);

    var isTypeValid = function(type,putOrder)
    {
        if (!type || !putOrder)
            return true;

        for (var order = 0; order < putOrder.length; order++) {
            var typeArray = typeof(putOrder[order][0]) === "number" ? [putOrder[order][0]] : putOrder[order][0];
            for (var typeIndex = 0; typeIndex < typeArray.length; typeIndex++) {
                if (type == typeArray[typeIndex])
                    return true;
            }
        }

        return false;
    }.bind(this);

    var originalPutOrder = this.pdk_putOrder[lastType];
    if (lastType != 99 && lastType != 0 && !originalPutOrder) {
        originalPutOrder = [
            [lastType, []],
            [this.pdk_daiPaiOrder, []],
        ];
    }
    for (var order = 0; order < putOrder.length; order++) {
        var typeArray = typeof(putOrder[order][0]) === "number" ? [putOrder[order][0]] : putOrder[order][0];
        for (var typeIndex = 0; typeIndex < typeArray.length; typeIndex++) {
            if (!typeArray[typeIndex])
                continue;

            var type = typeArray[typeIndex];

            // 检查type有效性，避免无效且费力的查找
            if (lastType != 99 && lastType != 0 && !isTypeValid(type,originalPutOrder))
                continue;
            
            if (allBuChaiTypes && allBuChaiTypes.indexOf(type) >= 0)
                continue;

            var buChaiTypes = getBuChaiTypes(putOrder[order][1], allBuChaiTypes);
            var canPutValueNums = getCanPutValueNums(type, buChaiTypes); // 排除不满足不拆牌型后剩下的牌值-数量对
            
            var cards = this.findCardByType_fast(hands, 0, type, lastCards, buChaiTypes);

            // 下家报单强制出最大
            if (isNextPlayerOneCard && type == this.CARDTPYE.danpai) {
                cards = this.getAllMaxCard(hands);
            }

            // 顺子、连对、同花顺尝试更多数量的牌
            if (lastCards.length <= 0 && cards.length > 0 && (type == this.CARDTPYE.shunzi || type == this.CARDTPYE.liandui || (this.CARDTPYE.sztonghua && type == this.CARDTPYE.sztonghua))) {
                var addNum = type == this.CARDTPYE.shunzi || type == this.CARDTPYE.sztonghua ? 1 : 2;
                for (var i = cards[0].length + addNum; true; i += addNum) {
                    var tempCards = this.findCardByType_fast(hands, 0, type, new Array(i));
                    if (tempCards.length > 0 && tempCards[0].length == i)
                        cards = tempCards.concat(cards);
                    else
                        break;
                }
            }

            // 必须包函指定牌
            if (includeCard > 0) {
                cards = replaceIncludeCard(includeCard, cards);
            }

            for (var i = 0; i < cards.length; i++) {
                var exist = true;
                var nums = canPutValueNums.slice();
                for (var j = 0; j < cards[i].length; j++) {
                    var value = this.calPoint(cards[i][j]);
                    if (!nums[value]) {
                        exist = false;
                        break;
                    }
                    nums[value] --;
                }

                // 如果只有一个单牌2，则放到后面提示。
                if (putOrder[order][2] && putOrder[order][2].buchuOnly2 && 
                    cards[i].length == 1 && this.calPoint(cards[i][0]) == this.PDK_MAXPOINT)
                    continue;
                
                if (!exist || isHaveCards(rets, cards[i]))
                    continue;

                if (this.canPut(cards[i], lastCards, hands.length))
                    rets.push(cards[i]);
            }
        }
    }

    if (!allBuChaiTypes) {
        //cc.log("智能提示用时：" + (new Date().getTime() - startTime) + "ms");
        //cc.log("rets=" + JSON.stringify(rets));
    }

    if (!allBuChaiTypes)
        this.findCardByTypeCache = [];

    return rets;
}

/**
 * 提示可出的牌
 * @param  {array} oHands 我的手牌
 * @param  {array} oLastCards 上家出的牌
 * @param  {Boolean} isMustPutHongTaoSan 是否必须出红桃三
 * @param  {Boolean} isNextPlayerOneCard 下家是否报单
 * @return {array} 提示的牌
 */
Paodekuai.prototype.tipCards = function(oHands, oLastCards, isMustPutHongTaoSan, isNextPlayerOneCard, isSmartTip) {
    if(isSmartTip) {
        this.canPutTypesCache = [];

        this.useNewTip = true;
        var ret = this.findPutTipCards(oHands, oLastCards, isMustPutHongTaoSan, isNextPlayerOneCard);
        this.useNewTip = false;
        if (ret.length > 0) return ret;
    }
    
    //当勾“先出红桃三”选项时，提示出红桃三
    if (isMustPutHongTaoSan && oHands.indexOf(this.HONG_TAO_3) >=0){
           return [[this.HONG_TAO_3]]
    }

    // 第一个出牌时，提示出最大的
    var isFirstPlayerPut = (!oLastCards || oLastCards == -1 || oLastCards.length == 0);
    if(isFirstPlayerPut)
    {
        var sortHands = oHands.slice();
        sortHands.sort(this.cardValueCmp.bind(this));
        return [[sortHands[sortHands.length - 1]]];
    }
    
    var hands = [];
    var handLaizi = this.transformAndGetLaizi(oHands, hands);
    var lastCardsType = this.calType(oLastCards);
    var rets = [];
    for (var laizi = 0; laizi <= handLaizi; laizi++) {
        if(lastCardsType ==  this.CARDTPYE.sizha) break;
        
        var sameTypeCards = this.findCardByType(hands, laizi, lastCardsType, oLastCards);
        for (var i = 0; i < sameTypeCards.length; i++) {
            if (this.canPut(sameTypeCards[i], oLastCards, oHands.length)) {
                rets.push(sameTypeCards[i]);
            }
        }
    }

    if(isNextPlayerOneCard){
        // 如果上家出牌且是一张，  才使用报单提示
        if(rets.length>0 && oLastCards && oLastCards.length <= 1 ){
            rets = this.getAllMaxCard(oHands);
        // 如果上家没有出牌， 使用报单提示
        }else if(rets.length>0 && !oLastCards || oLastCards == -1 ){
            rets = this.getAllMaxCard(oHands);
        }
    }

    var booms = this.findCardByType(hands, 0, this.CARDTPYE.sizha);
    for (var i = 0; i < booms.length; i++) {
        if (this.canPut(booms[i], oLastCards, oHands.length)) {
            rets.push(booms[i]);
        }
    }

    rets = rets.concat(this.findCardByType(hands, 0, this.CARDTPYE.sangeA) );
    return rets;
};

/**
 * 如果是有效牌型，剔除带牌
 * @param  {array} Cards 牌组
 * @param  {Boolean} areaSelectMode 创建房间的选项
 */
Paodekuai.prototype.delDaipai = function(Cards, areaSelectMode)
{
    var cardtype = this.calType(Cards, areaSelectMode);

    if (cardtype == this.CARDTPYE.sanshun ||
        cardtype == this.CARDTPYE.sangeA ||
        cardtype == this.CARDTPYE.sange3 ||
        cardtype == this.CARDTPYE.sizha ||
        cardtype == this.CARDTPYE.liandui ||
        cardtype == this.CARDTPYE.shunzi ||
        cardtype == this.CARDTPYE.sanzhang ||
        cardtype == this.CARDTPYE.duizi ||
        cardtype == this.CARDTPYE.danpai)
        return Cards;

    var point = this.calCardsValue(Cards, cardtype, areaSelectMode)
    if( cardtype == this.CARDTPYE.sandaiyi)
        Cards = this.findNSameCard(Cards, point, 3);
    else if(cardtype == this.CARDTPYE.sidaier)
        Cards = this.findNSameCard(Cards, point, 4);
    else if(cardtype == this.CARDTPYE.feiji)
    {
        var feiji  = this.formatFeiJiType(Cards,areaSelectMode);
        Cards = feiji.sanZhangCards;
    }

    return Cards;
}

if(typeof(module)!="undefined" && module.exports)    
    module.exports = Paodekuai;

if(typeof(MjClient)!="undefined")
    MjClient.majiang_paodekuai = new Paodekuai();


})();