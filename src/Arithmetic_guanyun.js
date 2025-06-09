
(function() {
    var majiang = {};
    var flowerArray = [31, 41, 51, 61, 71, 81, 91];//花的列表，根据不同来设置
    var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 41, 51, 61, 71, 81, 91];

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
        var tingSet = calTingSet(cds, -2);     // 为了不去掉四张的牌加个-2
        tingSet = deleteTingSet(cds, tingSet);
        if(MjClient.clickTing){
            return Object.keys(tingSet).length === 1;
        }else{
            return Object.keys(tingSet).length > 0;
        }
    };

        //听牌函数，判断手牌能否听牌
    majiang.canTingSplice = function (cds) {
        var tingSet = this.calTingSetsplice(cds, -2);     // 为了不去掉四张的牌加个-2
        tingSet = deleteTingSet(cds, tingSet);
        if(MjClient.clickTing){
            return Object.keys(tingSet).length === 1;
        }else{
            return Object.keys(tingSet).length > 0;
        }
    };
    majiang.calTingSetsplice = function(oCds, hun)
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
            if (MjClient.majiang.canHu(cds, allCardsArray[i], hun)) {

                if(MjClient.majiang.isCardFlower && MjClient.majiang.isCardFlower(allCardsArray[i])) continue; //听牌花牌要排除，东南西北，中发白有可能是花
                var sData = MjClient.data.sData;
                var pl = sData.players[SelfUid()];
                if (is7Dui(cds, allCardsArray[i]) && !pl.isTing) {
                    continue;
                }
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
    };
        //求出，听牌时，选择一张牌能胡的牌的张数 by sking
    majiang.getCheckTingHuCardsSplice = function(selectCard,mjhandCard) {
        var copyhand = mjhandCard.slice();
        if (selectCard && selectCard > 0) {
            var index = copyhand.indexOf(selectCard);//排除当前选择的一张牌
            copyhand.splice(index,1);
        }
        var tingSet = null;
        tingSet = this.calTingSetsplice(copyhand, MjClient.data.sData.tData.hunCard);

        for (var card in tingSet) {
            var count = 0;
            for (var i = 0; i < mjhandCard.length; i++) {
                if (mjhandCard[i] === Number(card)) {
                    count ++;
                }
            }
            if (count === 4) {
                delete tingSet[card];
            }
        }

        return tingSet;
    };

    majiang.canTingForTingBtn = function (cds) {
        var tingSet = calTingSet(cds, -2);  
        cc.log("canTingForTingBtn",JSON.stringify(tingSet));   // 为了不去掉四张的牌加个-2
        tingSet = deleteTingSet(cds, tingSet);
        cc.log("canTingForTingBtn",JSON.stringify(tingSet));
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
        var tingSet1 = calTingSet(hand, -2);
        //求出杠之后听的牌
        var tingSet2 = calTingSet(hangAfterGang, -2);
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
        var tData = MjClient.data.sData.tData;
        switch (tData.areaSelectMode.flowerType)
        {
            case WithFlowerType.zFlower4:
                return 112;
            case WithFlowerType.dnxbzFlower20:
                return 128;
            case WithFlowerType.dnxbzfbFlower28:
                return 136;
        }
        return 0;
    };

    majiang.setFlowerImg = function (node, pl)
    {

        var icountNode = node.getChildByName("head").getChildByName("huaCount");
        if(icountNode != null && pl) {
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
        MjClient.majiang_guanyun = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
