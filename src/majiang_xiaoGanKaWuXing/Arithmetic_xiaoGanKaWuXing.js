
(function() {
    var majiang = {};
    var flowerArray = [];//花的列表，根据不同来设置
    var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 41, 51, 61, 71, 81, 91];

    //是否是花
    majiang.isCardFlower = function(card)
    {
        return flowerArray.indexOf(card) >= 0;
    }

    //设置花，参数是[]，必须设置
    majiang.setFlower = function(flower)
    {
        flowerArray = flower || [];
    }

    //是否是混子
    majiang.isEqualHunCard = function(card)
    {
        return card == 200;
    }
    majiang.isHunCard = function(card,huncard){
        return card == huncard;
    }

    //是否可以胡
    majiang.canHu = function(oCards, cd, hunCard)
    {   

        var cards = this.transformCards(oCards, hunCard);
        if (is7Dui(cards, cd)) {
            return true;
        }
        return canHuLaizi(cards, cd);
    }

     //求出所有听牌的合集，oSet已经听的牌
    majiang.calTingSet = function(oCds, hun)
    {
        if(cc.isUndefined(oCds))
        {
            return {};
        }

        var tingSet = {};
        var cds = oCds.slice();
        if ((oCds.length + 1) % 3 == 0) { // 14、11、8、5、2张牌
            cds = oCds.slice(0, -1);
        }

        for (var i = 0; i < allCardsArray.length; i++) {
            if (this.canHu(cds, allCardsArray[i], hun)) {
                var count = 0;
                for (var j = 0; j < cds.length; j++) {
                    if (cds[j] == allCardsArray[i]) {
                        count++;
                    }
                }
                if (hun || count < 4) {
                    tingSet[allCardsArray[i]] = 1;
                }
            }
        }
        return tingSet;
    }

    majiang.calAnKe = function(cds,hunCard){
        var cardsSet = {};
        var oCds = cds.slice();
        var tData = MjClient.data.sData.tData;
        var anKeArray = [];
        //找到手牌中的暗刻
        for (var i = 0; i < oCds.length; i++) {
            if (cardsSet[oCds[i]]) {
                cardsSet[oCds[i]] ++;
            }else{
                cardsSet[oCds[i]] = 1;
            }
            if (anKeArray.indexOf(oCds[i]) < 0 && cardsSet[oCds[i]] >= 3) {
                anKeArray.push(oCds[i]);
            }
        }

        //依次删掉三张刻子判断是否能听;
        var realAnKeCards = [];
        for (var i = 0; i < anKeArray.length; i++) {
            var calCards = oCds.slice();
            for (var j = 0; j < 3; j++) {
                calCards.splice(calCards.indexOf(anKeArray[i]),1);
            }
            for (var j = 0; j < calCards.length; j++) {
                var cardsAfterPut = calCards.slice(0);
                cardsAfterPut.splice(j,1); //依次去掉某张牌看能不能听
                if (this.canTing(cardsAfterPut,hunCard)) {
                    realAnKeCards.push(anKeArray[i]);
                }
            }
        }

        return realAnKeCards;
    }

    majiang.getMjhandAfterCut = function(mjhand,player){
        var cards = mjhand.slice();
        for (var i = 0; i < player.anKe.length; i++) {
            for (var j = 0; j < 3; j++) {
                cards.splice(cards.indexOf(player.anKe[i]),1);
            }
        }
        return cards;
    }
  
    majiang.canTing = function (cds,hunCard) {
        var tingSet = this.calTingSet(cds,hunCard);
        var tData = MjClient.data.sData.tData;
        if (this.getAllCardsTotal() - tData.cardNext <= 12) return false;

        return Object.keys(tingSet).length > 0;
    }

    majiang.canGangWhenTing = function (hand, card) {
         var hangAfterGang = [];
        for(var i = 0; i < hand.length; i++)
        {
            if(card != hand[i])
            {
                hangAfterGang.push(hand[i]);
            }
        }
        //若听牌状态下，去掉所杠的牌不能再听则不能杠
        var tData = MjClient.data.sData.tData;
        if (!this.canTing(hangAfterGang, tData.hunCard)) {
            return false;
        }
        //求出之前听的牌
        var tingSet1 = this.calTingSet(hand, tData.hunCard);
        //求出杠之后听的牌
        var tingSet2 = this.calTingSet(hangAfterGang, tData.hunCard);
        //对比前后听的牌
        if (Object.keys(tingSet1).length != Object.keys(tingSet2).length){
            return false;
        }
        for(var tingCard in tingSet1) {
            if (!(tingCard in tingSet2)) {
                return false;
            }
        }
        //听牌不变可以杠
        return true;
    };

    //是否可以杠
    majiang.canGang1 = function (peng, hand,pl) {
        var rtn = [];
        var skipGang = pl.skipGang;
        if (!skipGang)  skipGang = [];
        for(var i = 0; i < peng.length; i++)
        {
            if(hand.indexOf(peng[i]) >= 0 && skipGang.indexOf(peng[i]) < 0 && (!pl.isTing || this.canGangWhenTing(hand,peng[i])))
            {
                rtn.push(peng[i]);
            }
        }
        var cnum = {};
        for(var i = 0; i < hand.length; i++)
        {
            var cd = hand[i];
            if(cd == MjClient.data.sData.tData.hunCard) continue;
            var num = cnum[cd];
            if(!num)
            {
                num = 0;
            }
            num++;
            cnum[cd] = num;
            if(num == 4 && (!pl.isTing || pl.anKe.indexOf(cd) >= 0))
            {
                rtn.push(cd);
            
            }
        }
        return rtn;
    };

    //是否可以明杠
    majiang.canGang0 = function (hand, cd, isTing) {
        if(majiang.isEqualHunCard(cd))//混牌不能杠
        {
            return false;
        }
        var num = 0;
        for (var i = 0; i < hand.length; i++) {
            if (hand[i] == cd) num++;
        }
        return num == 3 && (!isTing || majiang.canGangWhenTing(hand, cd));
    };

    //是否可以碰
    majiang.canPeng = function (hand, cd) {
        var num = 0;
        if(majiang.isEqualHunCard(cd))//混牌不能碰
        {
            return false;
        }
        for(var i = 0; i < hand.length; i++)
        {
            if(hand[i] == cd)
            {
                num++;
            }
        }
        return num >= 2;
    };

    majiang.CardCount = function (pl) {
        var rtn = (pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length) * 3 + pl.mjchi.length;
        if(pl.mjhand)
        {
            rtn += pl.mjhand.length;
        }
        return rtn;
    };

    majiang.getAllCardsTotal = function (tData) {
        var tData = MjClient.data.sData.tData;
        var cardNum = 56;
        if (tData.areaSelectMode.maxPlayer == 3) {
            if (!tData.areaSelectMode.quBaJiu) {
                cardNum += 16;
            }
            if (!tData.areaSelectMode.buDaiFen) {
                cardNum += 12;
            }
        }else if (tData.areaSelectMode.maxPlayer == 2){
            if (!tData.areaSelectMode.baSiZhang) {
                cardNum += 28;
            }
        }
        return cardNum;
        //去风牌
    };
    // 混子牌统一替换为200
    majiang.transformCards = function(oCards, hun) {
        if (!hun || hun == -1) {
            return oCards;
        }
        var cards = oCards.slice();
        for (var i = 0; i < cards.length; i++) {
            if (cards[i] == hun) {
                cards[i] = 200; 
            }
        }
        return cards;
    };

    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_xiaoGanKaWuXing = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
