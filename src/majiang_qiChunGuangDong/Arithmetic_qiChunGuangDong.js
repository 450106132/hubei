
(function() {
    var majiang = {};
    var flowerArray = [];//花的列表，根据不同来设置

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

    majiang.get7DuiType = function (cards, hunCard) {
        if(cards.length != 14){
            return 0;
        }
        var count1 = 0, count2 = 0; count3 = 0; count4 = 0, laizi = 0;
        var cardArr = [];
        for(var i = 0;i < cards.length;i++){
            var card = cards[i];
            if(this.isEqualHunCard(card)){
                laizi++;
                continue;
            }
            cardArr[card] = cardArr[card] ? cardArr[card] + 1 : 1;
        }
        for(var card in cardArr){
            if(cardArr[card] == 1){
                count2++;
                laizi--;
            }
            if(cardArr[card] == 2){
                count2++;
            }
            if(cardArr[card] == 3){
                count4++;
                laizi--;
            }
            if(cardArr[card] == 4){
                count4++;
            }
        }

        var is7dui = laizi >= 0;

        var type = 0;
        if (is7dui) {
            var count = count4 + Math.floor(laizi / 2);
            if (count >= 3) {
                type = 4;
            }
            else if (count == 2) {
                type = 3;
            } else if (count == 1) {
                type = 2;
            } else {
                type = 1;
            }
        }

        return type;
    };

    //是否可以胡
    majiang.canHu = function(oCards, cd, hun)
    {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var cards = oCards.slice();
        
        if (cd) {
            cards.push(cd);
        }

        cards = this.transformCards(cards, tData);
        if((tData.areaSelectMode.isQiDui || tData.areaSelectMode.daHu) && this.get7DuiType(cards, tData) > 0){
            return true;
        }

       //是否13幺
        if(this.is13Yao(cards)){
            return true;
        }

        return canHuLaizi(cards, 0);
    };

    //十三幺
    majiang.is13Yao = function(mjhand){
        var cards = mjhand.slice()
    
        if(cards.length != 14) return false;

        var yaoCards = [1, 9, 11, 19, 21, 29, 31, 41, 51, 61, 71, 81, 91];
        var goalObjArr = [];
        var jiangCard = 0;
        var laiZiCount = 0;
        for(var i = 0; i < cards.length; i++){
            if(this.isEqualHunCard(cards[i])){
                laiZiCount += 1;
                continue;
            }

            if(yaoCards.indexOf(cards[i]) == -1){
                return false;
            }

            if(goalObjArr.indexOf(cards[i]) == -1){
                goalObjArr.push(cards[i]);
                continue;
            }
            if(jiangCard != 0){
                return false;
            }
            jiangCard = cards[i];
        }

        goalObjArr.sort(function(a, b){
            return a - b;
        });

        return (laiZiCount == 0 && JSON.stringify(goalObjArr) == JSON.stringify(yaoCards) && jiangCard != 0) 
            || (jiangCard == 0 && (yaoCards.length - goalObjArr.length == (laiZiCount - 1) && laiZiCount >= 1)) 
            || (jiangCard != 0 && yaoCards.length - goalObjArr.length == laiZiCount);
    };

    majiang.calTingSet  = function (oCds, hun, isReturn)
    {
        if(cc.isUndefined(oCds))
        {
            return {};
        }

        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = sData.players[SelfUid()+ ""];
        var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29];

        var tingSet = {};
        var cds = oCds.slice();
        if ((oCds.length + 1) % 3 == 0) { // 14、11、8、5、2张牌
            cds = oCds.slice(0, -1);
        }

        for (var i = 0; i < allCardsArray.length; i++) {
            if (this.canHu(cds, allCardsArray[i], hun)) {
                tingSet[allCardsArray[i]] = 1;
                if(isReturn){
                    return tingSet;
                }
            } 
        }

        return tingSet;
    };

    //听牌函数，判断手牌能否听牌
    majiang.canTing = function (cds) {
        return false;
    }

    majiang.canGangWhenTing = function(hand, card)
    {
        return true;
    }

    //是否可以杠
    majiang.canGang1 = function(peng, hand, isTing)
    {
        var rtn = [];
        for(var i = 0; i < peng.length; i++)
        {
            if(hand.indexOf(peng[i]) >= 0)
            {
                //手牌里的牌Push到rtn中
                rtn.push(peng[i]);
            }
        }
        var cnum = {};
        for(var i = 0; i < hand.length; i++)
        {
            var cd = hand[i];
            var num = cnum[cd];
            if(!num)
            {
                num = 0;
            }
            num++;
            cnum[cd] = num;
            if(num == 4 && (!isTing || majiang.canGangWhenTing(hand, cd)))
            {
                rtn.push(cd);
            }
        }
        return rtn;
    };

    //是否可以明杠
    majiang.canGang0 = function(hand, cd, isTing)
    {
        var num = 0;
        for (var i = 0; i < hand.length; i++) {
            if (hand[i] == cd) num++;
        }
        return num == 3 && (!isTing || majiang.canGangWhenTing(hand, cd));
    };

    //是否可以碰
    majiang.canPeng = function(hand, cd)
    {
        var num = 0;
        for(var i = 0; i < hand.length; i++)
        {
            if(hand[i] == cd)
            {
                num++;
            }
        }
        return num >= 2;
    };

    majiang.CardCount = function (pl)
    {
        var rtn = (pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length) * 3 + pl.mjchi.length;
        if(pl.mjhand)
        {
            rtn += pl.mjhand.length;
        }
        return rtn;
    };

    majiang.getAllCardsTotal = function (tData)
    {
        if(tData.areaSelectMode.windCard)
            return 136;
        else if(tData.areaSelectMode.hunType == 3)
            return 112;
        return 108;
    };

    majiang.setFlowerImg = function (node, pl)
    {
        if (!pl) return;
        var icountNode = node.getChildByName("head").getChildByName("huaCount");
        if(icountNode != null) {
            var icount = pl.mjflower.length;
            icountNode.visible = true;
            cc.log("set flower ------ icount = " + icount);
            changeAtalsForLabel(icountNode,icount);
        }
    };

    majiang.setJiaZhuNum = function (node, pl)
    {

    };

    // 混子牌统一替换为200
    majiang.transformCards = function(oCards, tData) {
        if(tData.areaSelectMode.hunType == 0)
            return oCards;
        
        var hunCards = [];
        if(tData.areaSelectMode.hunType >= 1){
            hunCards.push(tData.hunCard);
            if(tData.areaSelectMode.hunType == 2){
                hunCards.push(tData.hunCard1);
            }
        } 
        var cards = oCards.slice();
        for (var i = 0; i < cards.length; i++) {
            if (hunCards.indexOf(cards[i]) != -1) {
                cards[i] = 200; 
            }
        }
        return cards;
    };

    majiang.isHunCard = function(card, hun){
        var tData = MjClient.data.sData.tData;
       

        var hunCards = [];
        if(tData.areaSelectMode.hunType >= 1){
            hunCards.push(tData.hunCard);
            if(tData.areaSelectMode.hunType == 2){
                hunCards.push(tData.hunCard1);
            }
        }
        return hunCards.indexOf(card) != -1;
    };

    majiang.canChi = function(hand, cd,hunCard){
        //将白板转为配子牌
        var num = [0, 0, 0, 0, 0];
        var rtn = [];
        return rtn;
    };

    majiang.gangWhenZimo = function(hand, rtn, hun)
    {
       
    }


    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_qiChunGuangDong = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
