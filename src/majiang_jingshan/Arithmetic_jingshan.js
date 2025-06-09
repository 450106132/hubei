
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
        if (isDuiDuiHu(cards, cd)) {
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

  
    majiang.canTing = function (cds, hun) {
        return false;
    };

    majiang.canGangWhenTing = function (hand, card) {
        return true;
    };

    //是否可以杠
    majiang.canGang1 = function (peng, hand, skipGang) {
        var rtn = [];
        if (!skipGang)  skipGang = [];
        for(var i = 0; i < peng.length; i++)
        {
            if(hand.indexOf(peng[i]) >= 0 && skipGang.indexOf(peng[i]) < 0)
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
            if(num == 4)
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
        var cardNum = 96 ;
        if (tData.areaSelectMode["quFeng"] > 0) cardNum -= 16;
        
        if (tData.randomPoint > 0) cardNum -= tData.randomPoint * 2;
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
        MjClient.majiang_jingshan = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
