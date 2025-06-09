
(function() {
    var majiang = {};

    //东南西北中发白，春夏秋冬，梅兰竹菊
    //var flowerArray = [31, 41, 51, 61, 71, 81, 91,111, 121, 131, 141, 151, 161, 171, 181];//花的列表，根据不同来设置

    var flowerArray = [71, 81, 91,111, 121, 131, 141, 151, 161, 171, 181];
    //var tData = MjClient.data.sData.tData;

    if(MjClient.data)
    {
        var tData = MjClient.data.sData.tData;
        if (tData.areaSelectMode.flowerCount == 36)
        {
            flowerArray = [31, 41, 51, 61, 71, 81, 91,111, 121, 131, 141, 151, 161, 171, 181];
        }
    }

    //是否是花
    majiang.isCardFlower = function(card)
    {
        if(MjClient.data)
        {
            var tData = MjClient.data.sData.tData;
            if (tData.areaSelectMode.flowerCount == 36)
            {
                flowerArray = [31, 41, 51, 61, 71, 81, 91,111, 121, 131, 141, 151, 161, 171, 181];
            }
        }

        return flowerArray.indexOf(card) >= 0;
    }

    //设置花，参数是[]，必须设置
    majiang.setFlower = function(flower)
    {
        if(MjClient.data)
        {
            var tData = MjClient.data.sData.tData;
            if (tData.areaSelectMode.flowerCount == 36)
            {
                flowerArray = [31, 41, 51, 61, 71, 81, 91,111, 121, 131, 141, 151, 161, 171, 181];
            }
        }

        flowerArray = flower || [];
    }

    //是否是混子
    majiang.isEqualHunCard = function(card)
    {
        return card == 200;
    }

    //是否可以胡
    majiang.canHu = function(cards, cd)
    {
        if (is7Dui(cards, cd)) {
            return true;
        }
        return canHuLaizi(cards, cd);
    }

    //听牌函数，判断手牌能否听牌
    majiang.canTing = function (cds) {
        var tingSet = calTingSet(cds);

        return Object.keys(tingSet).length > 0;
    }

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
            if(hand[i] === cd)
            {
                num++;
            }
        }
        return num >= 2;
    };


    //是否可以吃
    majiang.canChi = function(hand, cd)
    {
        var num = [0, 0, 0, 0, 0];
        var rtn = [];
        for(var i = 0; i < hand.length; i++)
        {
            var dif = hand[i] - cd;
            switch (dif)
            {
                case -2:
                case -1:
                case 1:
                case 2:
                    if(!majiang.isEqualHunCard(hand[i]) && !majiang.isEqualHunCard(cd))
                    {
                        num[dif + 2]++;
                    }
                    break;
            }
        }

        if(num[3] > 0 && num[4] > 0)
        {
            rtn.push(0);
        }

        if(num[1] > 0 && num[3] > 0)
        {
            rtn.push(1);
        }

        if(num[0] > 0 && num[1] > 0)
        {
            rtn.push(2);
        }

        return rtn;
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
        var tData = MjClient.data.sData.tData;
        var _flowerCount = tData.areaSelectMode.flowerCount;
        if(_flowerCount == 20)
        {
            return 128;
        }
        return 144;
    };

    majiang.setFlowerImg = function (node, pl)
    {

        var icountNode = node.getChildByName("head").getChildByName("huaCount");
        if(pl && icountNode != null) {
            var icount = pl.mjflower.length;
            icountNode.visible = true;
            cc.log("set flower ------ icount = " + icount);
            changeAtalsForLabel(icountNode,icount);
        }
    };

    majiang.setJiaZhuNum = function (node, pl)
    {

    };


    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_ganyu = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
