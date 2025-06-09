
(function() {
    var majiang = {};
    var shuyangflowerArray = [31, 41, 51, 61, 111, 121, 131, 141, 151, 161, 171, 181];//花的列表，根据不同来设置

    //是否是花
    majiang.isCardFlower = function(card)
    {
        return shuyangflowerArray.indexOf(card) >= 0;
    }

    // //设置花，参数是[]，必须设置
    // majiang.setFlower = function(flower)
    // {
    //     flowerArray = flower || [];
    // }

    //是否是混子
    majiang.isEqualHunCard = function(card)
    {
        return card == 200;
    }

    //胡牌判断，基础胡牌逻辑
    majiang.canHu = function(cards, cd)
    {
        if (is7Dui(cards, cd)) {
            return true;
        }
        return canHuLaizi(cards, cd);
    };


    // majiang.canTing = function (cds) {
    //     var tingSet = calTingSet(cds, 200);
    //     tingSet = deleteTingSet(cds, tingSet);
    //     if(MjClient.clickTing){
    //         return Object.keys(tingSet).length === 1;
    //     }else{
    //         return Object.keys(tingSet).length > 0;
    //     }
    // };

    majiang.canTing = function (cds) {
        var tingSet = calTingSet(cds, 200);
        // tingSet = deleteTingSet(cds, tingSet);
        return Object.keys(tingSet).length === 1;
    };


    majiang.canGangWhenTing = function(hand, card)
    {
        var hangAfterGang = [];
        for(var i = 0; i < hand.length; i++)
        {
            if(card != hand[i])
            {
                hangAfterGang.push(hand[i]);
            }
        }
        //若听牌状态下，去掉所杠的牌不能再听则不能杠
        if (!majiang.canTing(hangAfterGang)) {
            return false;
        }
        //求出之前听的牌
        var tingSet1 = calTingSet(hand);
        //求出杠之后听的牌
        var tingSet2 = calTingSet(hangAfterGang);
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
    }

    //是否可以杠
    majiang.canGang1 = function(peng, hand, isTing)
    {
        var rtn = [];
        for(var i = 0; i < peng.length; i++)
        {
            if(hand.indexOf(peng[i]) >= 0 && (!isTing || majiang.canGangWhenTing(hand, peng[i])))
            {
                //手牌里的牌Push到rtn中
                rtn.push(peng[i]);
            }
        }
        var cnum = {};
        for(var i = 0; i < hand.length; i++)
        {
            var cd = hand[i];
            if(majiang.isEqualHunCard(cd))
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
        return 120;
    };

    majiang.setFlowerImg = function (node, pl)
    {
        //设置头像下的花的显示
        var icountNode = node.getChildByName("head").getChildByName("huaCount");
        if(icountNode != null && pl) {
            var icount = pl.mjflower.length;
            icountNode.visible = true;
            changeAtalsForLabel(icountNode,icount);
        }
    };

    majiang.setJiaZhuNum = function (node, pl)
    {

    };

    majiang.isDapie = function (cds, mjpeng, mjgang0, mjgang1)
    {
        var cards = cds.concat(mjpeng).concat(mjgang0).concat(mjgang1)
        var colorSet = {}
        for (var i = 0; i < cards.length; i++) {
            colorSet[Math.floor(cards[i] / 10)] = 1;
        }
        return Object.keys(colorSet).length <= 2;
    };

    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_shuyang = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
