// 晃晃麻将（原泗阳晃晃）【基本规则】：
// 牌型万字1-9，筒子1-9，条子1-9，红中4张，共计112张。
// 红中为百搭牌，无其他字牌和花牌，不可以平胡，必须自摸,无需提示叫听按钮。
// 红中不可出，也不可以碰
// 自摸胡牌后在补花的位置连抓4张牌，4张牌内含有(1,5,9)条，筒，万就算分，这边方言叫:码。

(function() {
    var majiang = {};
    var flowerArray = [];//花的列表，根据不同来设置
    var cardArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29,71];

    //是否是花
    majiang.isCardFlower = function(card)
    {
        return flowerArray.indexOf(card) >= 0;
    };

    //设置花，参数是[]，必须设置
    majiang.setFlower = function(flower)
    {
        flowerArray = flower || [];
    };

    //是否是混子
    majiang.isEqualHunCard = function(card)
    {
        return card == 200;
    };

    //是否可以胡
    majiang.canHu = function(oCards, cd, hun)
    {
        var cards = this.transformCards(oCards, hun);
        if(cd == hun){
            cd = 200;
        }
        return canHuLaizi(cards, cd);
    };

    //听牌函数，判断手牌能否听牌 晃晃麻将（原泗阳晃晃）不用听
    majiang.canTing = function (cds,hun) {
        var tingSet = calTingSet(cds,hun);
        return Object.keys(tingSet).length>0;
    };

    majiang.canGangWhenTing = function(hand, card)
    {
        return true;
    };

    //是否可以杠
    majiang.canGang1 = function(peng, peng4, hand, isTing,hun)
    {
        var rtn = [];
        for(var i = 0; i < peng.length; i++)
        {
            if(peng4.indexOf(peng[i]) < 0 && hand.indexOf(peng[i]) >= 0 && (!isTing || majiang.canGangWhenTing(hand, peng[i])))
            // if(hand[hand.length-1] == peng[i] && (!isTing || majiang.canGangWhenTing(hand, peng[i])))
            {
                //手牌里的牌Push到rtn中
                rtn.push(peng[i]);
            }
        }
        var cnum = {};
        for(var i = 0; i < hand.length; i++)
        {
            var cd = hand[i];
            if(cd == hun)
            {
                continue;
            }
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

    majiang.getAllCardsTotal = function ()
    {
        return 112;
    };

    majiang.setFlowerImg = function (node, pl)
    {

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
        MjClient.majiang_siyanghh = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
