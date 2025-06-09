
(function() {
    var majiang = {};
    var flowerArray = [];//花的列表，根据不同来设置
    var allCardsArray = [
         1,  2,  3,  4,  5,  6,  7,  8,  9,
        11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 71
    ];

    //是否是花
    majiang.isCardFlower = function(card)
    {
        return flowerArray.indexOf(card) >= 0;
    };

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

    //是否可以胡
    majiang.canHu = function(oCards, cd, hun)
    {
        if (cd == hun) {
            cd = 200;
        }

        if (allCardsArray.indexOf(cd) < 0 && cd != 200) {
            return false;
        }
        var cards = this.transformCards(oCards, hun);
        if (MjClient.data.sData.tData.areaSelectMode["qidui"] && is7Dui(cards, cd)) {
            return true;
        }
        return this.canHuLaizi(cards, cd);
    }

    majiang.canHuLaizi = function(oCards, cd) {
        var cards = [];
        var laizi = 0;

        for (var i = 0; i < oCards.length; i++) {
            if (oCards[i] == 200) {
                laizi++;
            }
            else {
                cards.push(oCards[i]);
            }
        }
        if (cd == 200) {
            laizi++;
        }
        else if (cd) {
            cards.push(cd);
        }
        if ((cards.length + laizi + 1) % 3 != 0) {
            return false;
        }
        cards.sort(function(a, b) {
            return a - b;
        })

        //单吊癞子时算听牌计算量太大会导致卡顿
        if ((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) && laizi >= 1) {
            var cardsCopy = cards.slice();
            cardsCopy.splice(cardsCopy.indexOf(cd), 1);
            if (isPu(cardsCopy, laizi - 1)) {
                return true;
            }
        }

        // 依次删除一对牌做将，其余牌全部成扑则可胡
        for (var i = 0; i < cards.length; i++) {
            if (i > 0 && cards[i] == cards[i - 1]){
                continue; // 和上一次是同样的牌，略过不计算
            }
            if ((i + 1 < cards.length && cards[i] == cards[i + 1]) || laizi > 0) {
                var puCards = cards.slice();
                var puLaizi = laizi;
                puCards.splice(i, 1);
                if (puCards[i] == cards[i]) {
                    puCards.splice(i, 1);
                }
                else {
                    puLaizi--;
                }
                if (isPu(puCards, puLaizi)) {
                    return true;
                }
            }
        }
        if (laizi >= 2 && isPu(cards, laizi - 2)) {
            return true;
        }
        return false;
    }

    //听牌函数，判断手牌能否听牌
    majiang.canTing = function (cds, hun) {
        return this.canHu(cds, 200, hun);
    }

    majiang.canGangWhenTing = function(hand, card)
    {
        return true;
    }

    majiang.gangWhenZimo = function(hand, rtn, hun)
    {
        for (var i = rtn.length - 1; i >= 0; i--) {
            var cards = [];
            for (var j = 0; j < hand.length; j++) {
                if (hand[j] != rtn[i]) {
                    cards.push(hand[j]);
                }
            }
            cards = this.transformCards(cards, hun);
            cards.sort(function(a,b) {
                return a-b;
            })
            for (var laizi = 0; this.isEqualHunCard(cards[cards.length - 1]); laizi++) {
                cards.pop();
            }
            if (laizi == 0 || !isPu(cards, laizi - 1)) { // 无红中、或者杠后非全听牌
                rtn.splice(i, 1);
            }
        }
    }

    //是否可以杠
    majiang.canGang1 = function(peng, hand, putCount)
    {
        var rtn = [];
        for(var i = 0; i < peng.length; i++)
        {
            // if(hand.indexOf(peng[i]) >= 0)
            if(hand[hand.length - 1] == peng[i])
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
            if(num == 4)
            {
                // if (putCount === 0 || cd == hand[hand.length - 1]) 
                {
                    rtn.push(cd);
                }
            }
        }
        return rtn;
    };

    //是否可以明杠
    majiang.canGang0 = function(hand, cd, isTing)
    {
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
    majiang.canPeng = function(hand, cd)
    {
        var num = 0;
        if(majiang.isEqualHunCard(cd))//混牌不能碰
        {
            return false;
        }
        for(var i = 0; i < hand.length; i++)
        {
            if(hand[i] === cd)
            {
                num++;
            }
        }
        return num >= 2;
    };

    majiang.CardCount = function (pl) {
        var rtn = (pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length) * 3 + pl.mjchi.length;
        if(pl.mjhand) {
            rtn += pl.mjhand.length;
        }
        return rtn;
    };

    majiang.getAllCardsTotal = function () {
        var tData = MjClient.data.sData.tData;
        var queYiMen = tData.areaSelectMode.queYiMen && tData.maxPlayer == 2;

        if (tData.areaSelectMode["hongzhong8"]) {
            return 116 - (queYiMen ? 36 : 0);
        } 
        return 112 - (queYiMen ? 36 : 0);
    };

    majiang.getAllCardsTypeTotal = function () {
        return 28;
    };


    majiang.setFlowerImg = function (node, pl) {

    };


    //玩家杠后是否可以胡
    majiang.canHuAfterGang = function(oCards, gangCard, hun){
        var cardArr = [].concat(oCards);
        for(var i = 0;i < cardArr.length;i++){
            if(cardArr[i] === gangCard){
                cardArr.splice(i, 1);
                i--;
            }
        }
        return this.canHu(cardArr, 101, hun);
    };


    majiang.setJiaZhuNum = function (node, pl) {
        if(!pl) return;
        var icountNode = node.getChildByName("head").getChildByName("jiaZhu");
        var tData = MjClient.data.sData.tData;
        if(pl.jiazhuNum > 0) {
            icountNode.visible = true;
            icountNode.ignoreContentAdaptWithSize(true);
            if (tData.areaSelectMode.piaoniao)
                icountNode.setString("鸟+" + pl.jiazhuNum);
            else
                icountNode.setString("飘" + pl.jiazhuNum + "分");
        }else{
            icountNode.setString("");
        }
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



    majiang.calTingSet = function (handCards, hunCard) {
        //求出所有听牌的合集，oSet已经听的牌
        if(cc.isUndefined(handCards)) return {};
        var tingSet = {};
        var cds = handCards.slice();
        if ((handCards.length + 1) % 3 === 0) {         // 14、11、8、5、2张牌
            cds = handCards.slice(0, -1);
        }
        for (var i = 0; i < allCardsArray.length; i++) {
            if (this.canHu(cds, allCardsArray[i], hunCard)) {
                var count = 0;
                for (var j = 0; j < cds.length; j++) {
                    if (Number(cds[j]) === Number(allCardsArray[i])) {
                        count++;
                    }
                }
                if (hunCard || count < 4) {
                    tingSet[allCardsArray[i]] = 1;
                }
            }
        }
        return tingSet;
    };


    majiang.isHunCard = function(cd, hun){
        if(cc.isNumber(hun) && cd == hun){
            return true;
        }
        if(cc.isArray(hun) && hun.indexOf(cd) >= 0){
            return true;
        }
        return false;
    };



    if (typeof(MjClient) != "undefined") {
        MjClient.majiang_MLHZ = majiang;
    } else {
        module.exports = majiang;
    }
})();
