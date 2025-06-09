
(function() {
    var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 41, 51, 61, 71, 81, 91];
    var majiang = {};
    var flowerArray = [];//花的列表，根据不同来设置
    var hunCard = -1;//混子列表

    //是否是花
    majiang.isCardFlower = function(card)
    {
        if(flowerArray.length == 0)
            return false;
        var flowerIndex = flowerArray.indexOf(card);
        if(flowerIndex >= 0)
        {
            return true;
        }
        return false;
    }

    //设置花，参数是[]，必须设置
    majiang.setFlower = function(flower)
    {
        flowerArray = flower;
    }

    //设置混，参数是[]，必须设置
    majiang.setHun = function(hun)
    {
        hunCard = hun;
    }

    //是否是混子
    majiang.isEqualHunCard = function(card)
    {
        return card == 200;
    }

    //胡牌判断，基础胡牌逻辑
    majiang.canHu = function(oCards, cd, hun)
    {
        var cards = this.transformCards(oCards, hun);
        if (is7Dui(cards, cd)) {
            return true;
        }
        if (this.isShiSanPao(cards, cd)) {
            return true;
        }
        return canHuLaizi(cards, cd);
    }

    //听牌函数，判断14张牌能否听牌
    majiang.canTing = function (cds) {
        return this.canHu(cds, 200, MjClient.data.sData.tData.hunCard);
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
            //过杠不能杠
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
        return 136;
    };

    majiang.setFlowerImg = function (node, pl)
    {
        
    };

    majiang.setJiaZhuNum = function (node, pl)
    {
        var icountNode = node.getChildByName("head").getChildByName("jiaZhu");
        var tData = MjClient.data.sData.tData;
        cc.log("===========拉庄 = " + JSON.stringify(MjClient.data.sData));
        if(pl && pl.jiazhuNum && tData.uids[tData.zhuang] != pl.info.uid) {
            icountNode.visible = true;
            icountNode.ignoreContentAdaptWithSize(true);
            icountNode.setString("拉庄");
        }else{
            icountNode.setString("");
        }
    };

    //十三炮，连云港玩法
    majiang.isShiSanPao = function(cards, cd)
    {
        var cds = cards.slice();
        if (cd) {
            cds.push(cd);
        }
        if (cds.length != 14) {
            return false;
        }
        cds.sort(function(a, b) {
            return a - b; 
        });
        for (var i = 1; i < cds.length; i++) {
            if (cds[i] 
                && !this.isEqualHunCard(cds[i]) // 非百搭牌
                && Math.floor(cds[i] / 10) == Math.floor(cds[i - 1] / 10) // 同色
                && cds[i] - cds[i - 1] <= 2) { //相邻二以内或相同的牌
                return false;
            }
        }
        return true;
    }

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
    }

    DoTest = function()
    {
        // var beginTime = +new Date;
        // var cards = [
        //     1, 2, 3, 4, 5, 6, 7, 8, 9,
        //     1, 2, 3, 4, 5, 6, 7, 8, 9,
        //     1, 2, 3, 4, 5, 6, 7, 8, 9,
        //     1, 2, 3, 4, 5, 6, 7, 8, 9,
        //     11, 12, 13, 14, 15, 16, 17, 18, 19,
        //     11, 12, 13, 14, 15, 16, 17, 18, 19,
        //     11, 12, 13, 14, 15, 16, 17, 18, 19,
        //     11, 12, 13, 14, 15, 16, 17, 18, 19,
        //     21, 22, 23, 24, 25, 26, 27, 28, 29,
        //     21, 22, 23, 24, 25, 26, 27, 28, 29,
        //     21, 22, 23, 24, 25, 26, 27, 28, 29,
        //     21, 22, 23, 24, 25, 26, 27, 28, 29,
        //     31, 41, 51, 61, 71, 81, 91,
        //     31, 41, 51, 61, 71, 81, 91,
        //     31, 41, 51, 61, 71, 81, 91,
        //     31, 41, 51, 61, 71, 81, 91
        // ];
        // for (var i = 0; i < 100000; i++) {
        //     cards.sort(function (a, b) {
        //         return .5 - Math.random();
        //     });
        //     var laizi = cards[cards.length - 1];
        //     // var hands = majiang.transformCards(cards.slice(0, 14), laizi);
        //     var hands = cards.slice(0, 14);
        //     // var _canHuHunResult = majiang._canHuHun(hands);
        //     var _canHuHunResult = MjClient.majiang_shuyang._canHuNoHun(false, hands) > 0;
        //     var canHuLaiziResult = canHuLaizi(hands);
        //     if (_canHuHunResult != canHuLaiziResult) {
        //         hands.sort(function(a,b){return a-b;});
        //         cc.log(hands, '_canHuHunResult=', _canHuHunResult, '   canHuLaiziResult=', canHuLaiziResult)
        //     }
        // }
        // // var canHuLaiziResult = majiang.canHuLaizi([4,5,6,7,8,9,11,11,14,15,16,21,71,200]);
        // // cc.log("结果",canHuLaiziResult);
        // cc.log("测试时间 = " + (new Date - beginTime));
    }

    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_suqian = majiang;
        DoTest();
    }
    else
    {
        module.exports = majiang;
    }
})();
