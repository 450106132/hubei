//跑得快算法类
(function() {
function PaodekuaiHBTY() {
    PaodekuaiBase.apply(this,arguments)

    this.cardCfg.firstOutCard = this.cardCfg.hx[3];
}
PaodekuaiHBTY.prototype = Object.create(PaodekuaiBase.prototype);
PaodekuaiHBTY.prototype.constructor = PaodekuaiHBTY

PaodekuaiHBTY.prototype.deleteChaiZhanDanArr = function(oHands, rets, areaSelectMode){
    if(!rets || !oHands || !areaSelectMode || !areaSelectMode.zhaDanBuChai ){return;}

    for(var i = rets.length - 1; i >= 0; i--){
        if ( this.isChaiZhaDan(oHands, rets[i], areaSelectMode) ){
            rets.splice(i, 1);
        }
    }
};


// 1 - 52  方块A:1 梅花A:2 红心A:3 黑桃A:4 -- 黑桃王:52
// 1.16张玩法为现有的没有大小王、只有一个2、三个A的玩法 一共48张
// 2.15张玩法：在16张的基础上，再去掉两个A（剩红桃A）、一个K（去掉黑桃K），一共45张
// 不选【首局先出黑桃三】时,随机发牌(包括黑桃三),首局随机先手（首局必定发黑桃三且先手）
PaodekuaiHBTY.prototype.randomCards = function(areaSelectMode, tData) {
    var cards = [];
    var handCardNum = 0 == areaSelectMode['cardNumIndex'] ? 16 : 15;
    this.handCount = handCardNum;   // GameCode runStartGame 发牌用到
    // 首出规则
    //1、幸运翻牌（选项）：第一局出牌前，系统随机翻一张牌，归属为谁谁先出牌. 之后是赢家先出牌. 
    //2、红桃3（选项）：第一局发到红桃3玩家为庄家，庄家先出手出牌，后面每局都为上一局赢家.
    //3、红桃3首出（勾选了红桃3后才有）：首轮出牌，必须包含红桃3的牌型.
    var firstPutRuleNum = tData.areaSelectMode.firstPutRule;

    var allHandCardNum = handCardNum * tData.maxPlayer;
    // 没有大小王的 52 张牌
    for (var i = 1; i <= 52; i++) {
        cards.push(i);
    }

    // 去掉 方块2 梅花2 红心2
    cards.splice( cards.indexOf(this.cardCfg.fk[2]), 1 );
    cards.splice( cards.indexOf(this.cardCfg.mh[2]), 1 );
    cards.splice( cards.indexOf(this.cardCfg.hx[2]), 1 );

    // 去跳黑桃A
    cards.splice( cards.indexOf(this.cardCfg.ht[1]), 1 );

    // 15张玩法 
    if(15 == handCardNum){
        // 去掉 方块A 梅花A
        cards.splice( cards.indexOf(this.cardCfg.fk[1]), 1 );
        cards.splice( cards.indexOf(this.cardCfg.mh[1]), 1 );
        // 去掉 黑桃K
        cards.splice( cards.indexOf(this.cardCfg.ht[13]), 1 );
    }

    // 红桃3 必须发到手上
    if(1 != firstPutRuleNum) {
        // 红桃3先去掉, 确定人数后再放进牌堆， 保证红桃3发到玩家手上, 拿红桃3的先出
        cards.splice( cards.indexOf(this.cardCfg.firstOutCard), 1 );
        // 洗牌
        // cards.sort(function (a, b) {
        //     return .5 - Math.random();
        // });
        cards = shuffleArray(cards);

        // 2人玩法 记录没 发出去的牌
        tData.otherCards = cards.slice(allHandCardNum - 1, cards.length);
        tData.otherCards.sort(this.cardValueCmp.bind(this))
        // 取得对应人数的牌数 - 1
        cards = cards.slice(0, allHandCardNum - 1);
        // 红桃3放进洗牌堆
        cards.push(this.cardCfg.firstOutCard);
        // 洗牌
        // cards.sort(function (a, b) {
        //     return .5 - Math.random();
        // });
        cards = shuffleArray(cards);

    // 红桃3 可以不发到手上
    } else {
        // 洗牌
        cards = shuffleArray(cards);
        // 2人玩法 记录没 发出去的牌
        tData.otherCards = cards.slice(allHandCardNum, cards.length);
        tData.otherCards.sort(this.cardValueCmp.bind(this))

        // 取得对应人数的牌数 - 1
        cards = cards.slice(0, allHandCardNum);
    }

    if (areaSelectMode.havezhadan == false )
        this.noZhadan(cards, tData.maxPlayer, handCardNum)
    
    return cards;
};



/** 
 * 牌是否能压上
 * @param {array} oCards 按点数排好序的牌/选择了的手牌
 * @param {array} [oLastCards] 按点数排好序的牌/最后打出的牌
 * @param {number} [handsNum] 手牌数量
 */
PaodekuaiHBTY.prototype.canPut = function(oCards, oLastCards, handsNum, areaSelectMode) {

    var cardsType = this.calType(oCards, areaSelectMode);

    // cc.log("PaodekuaiBase.prototype.canPut oCards:", oCards );
    // cc.log("oLastCards" , oLastCards );
    // cc.log("handsNum" , handsNum );
    // cc.log("canPut cardsType", cardsType)
    // 如果客户端调用时 没有 传areaSelectMode

    if (cardsType == -1)
        return false;

    // 最后一手出不完整的飞机， 3带1 3张 检测
    var checkPutType = [];
    checkPutType.push(this.CARDTPYE.sanzhang);
    // if (areaSelectMode.can3dai1 == false && oCards.length == handsNum)
	checkPutType.push(this.CARDTPYE.sandaiyi);
    var canPutLastType = false;
    var canPutAnyType = [];     // 最后一手同类牌比较
    if( checkPutType.indexOf(cardsType) >= 0 ){
        if( oCards.length == handsNum && oLastCards && oLastCards.length > 0 && areaSelectMode.canPutAnySanZhang_Jie) {
            canPutAnyType.push(this.CARDTPYE.sandaiyi);
            canPutAnyType.push(this.CARDTPYE.sandaier);
            canPutAnyType.push(this.CARDTPYE.sanzhang);
            canPutLastType = true;

        } else if ( oCards.length == handsNum && (!oLastCards ||  oLastCards.length == 0) && areaSelectMode.canPutAnySanZhang_Chu) {
            return true;
        } else {
            if(this.CARDTPYE.sandaiyi == cardsType && areaSelectMode.can3dai1){}
            else
                return false;
        }
    } 

    if( cardsType == this.CARDTPYE.feiji ) {
        var feijiInfo = this.formatFeiJiType(oCards,areaSelectMode);
        if(feijiInfo.type != feijiInfo.DAI_CHI_BANG){
            if( areaSelectMode.canPutAnyFeiji && oLastCards ) {
                canPutLastType = true;
                canPutAnyType.push(this.CARDTPYE.feiji);
            }else if ( oCards.length == handsNum && !oLastCards) {
                return true;
            } else {
                return false;
            }
        }
    }

    // 最后一手牌
    if( canPutLastType ){
        if (oCards.length == handsNum )
        {
            if (!oLastCards || oLastCards.length==0 || oLastCards=='undefined')
                return true;

            var lastCardsType = this.calType(oLastCards, areaSelectMode);
            if(canPutAnyType.indexOf(lastCardsType) >= 0 && oCards.length <= oLastCards.length) {
                var typeValue = this.calCardsValue(oCards, cardsType, areaSelectMode);
                var lastTypeValue = this.calCardsValue(oLastCards, lastCardsType, areaSelectMode);
                return typeValue > lastTypeValue;
            } else {
                return false;
            }

        } else {
            return false;
        }
    }

    // 没有上次打的牌，三家过自己再出牌
    if (!oLastCards || oLastCards.length==0 || oLastCards=='undefined')
        return true;

    if ((cardsType == this.CARDTPYE.shunzi || cardsType == this.CARDTPYE.liandui) && oCards.length != oLastCards.length)
        return false;

    oCards.sort(this.cardValueCmp.bind(this));
    oLastCards.sort(this.cardValueCmp.bind(this));

    var lastCardsType = this.calType(oLastCards, areaSelectMode);
    if (cardsType == lastCardsType && oCards.length == oLastCards.length) {
        var typeValue = this.calCardsValue(oCards, cardsType, areaSelectMode);
        var lastTypeValue = this.calCardsValue(oLastCards, lastCardsType, areaSelectMode);
        return typeValue > lastTypeValue;
    }
    else if(this.PDK_CARD_VALUE[cardsType]) {
        var last_card_value = this.PDK_CARD_VALUE[lastCardsType] || 0;
        return this.PDK_CARD_VALUE[cardsType] > last_card_value;
    }
    return false;
}; 


/**
 * 是否首手必须先出红桃/黑桃3
 * @param  {array} oHands 我的手牌
 * @param  {object} areaSelectMode 创建房间的选项
 * @param  {Boolean} isFirstRound 是否第一局
 * @return {Boolean} 
 */
PaodekuaiHBTY.prototype.isMustPutCard3 = function(oHands, areaSelectMode, isFirstRound) {
    isFirstRound = areaSelectMode.isPreRoundFirstRule? true : isFirstRound;
    return (isFirstRound && (areaSelectMode && areaSelectMode.firstHongTao3)) && oHands.indexOf(this.cardCfg.firstOutCard)>=0;
}

// 检查是否能出牌
/**
 * 检测是否能出牌
 * @param  {Array} oHands 手牌
 * @param  {Array} cards 提起的牌/选择了的牌
 * @param  {Array} lastCards 上次出的牌/打在桌面上的牌
 * @param  {object}  areaSelectMode 玩法选项 
 * @param  {bool}  isNextPlayerOneCard 下家是否为报单
 * @param  {bool}  isFirstRound 是否第一局
 * @return {Array} 返回可以出的牌
 */
PaodekuaiHBTY.prototype.checkPut = function(oHands, cards, lastCards, areaSelectMode, isNextPlayerOneCard, isFirstRound) {
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
    
    if(!areaSelectMode && cc ) {
        areaSelectMode = MjClient.data.sData.tData.areaSelectMode;
    }

    // 第一局 黑桃三先出时 有黑桃三必须出
    isFirstRound = areaSelectMode.isPreRoundFirstRule? true : isFirstRound;
    if (isFirstRound && areaSelectMode && areaSelectMode.firstHongTao3 && cards.indexOf(this.cardCfg.firstOutCard)<0 && oHands.indexOf(this.cardCfg.firstOutCard)>=0){
        return null;
    }




    var cardType = this.calType(cards, areaSelectMode);
    var pthis = this;

    // 炸弹不可拆 但是可以 四带2 四代3 等四张一块出
    if(areaSelectMode && areaSelectMode.zhaDanBuChai && this.isChaiZhaDan(oHands, cards, areaSelectMode) ){
        return null;
    }

    // 四带二
    if(cardType == this.CARDTPYE.sidaier && areaSelectMode && !areaSelectMode.can4dai2){
        return null
    }

    // 四带三
    if(cardType == this.CARDTPYE.sidaisan && areaSelectMode && !areaSelectMode.can4dai3){
        return null
    }

    // 三带一
    if (oHands.length == 4 && cardType == this.CARDTPYE.sandaiyi)
    {

    }
    else if(cardType == this.CARDTPYE.sandaiyi && areaSelectMode && !areaSelectMode.can3dai1){
        return null
    }

    // 如果 下家报单 提起的一张牌 不是最大的牌
    var sortHand = oHands.slice();
    sortHand.sort(this.cardValueCmp.bind(this));
    var maxCards = this.getAllMaxCard(oHands);
    if(isNextPlayerOneCard && cards.length==1 && this.calPoint(maxCards[0]) != this.calPoint(cards[0]) ){
        return null;
    }


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

    if (this.canPut(sortCards, sortLastCards, oHands.length, areaSelectMode)) {
        return hands; // 能打得过上家的牌
    }
    return null;
};

if(typeof(module)!="undefined" && module.exports)    
    module.exports = PaodekuaiHBTY;

if(typeof(MjClient)!="undefined")
    MjClient.majiang_PaodekuaiHBTY = new PaodekuaiHBTY();


})();