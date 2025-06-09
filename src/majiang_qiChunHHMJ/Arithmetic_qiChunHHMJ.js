
(function() {
    var majiang = {};
    var flowerArray = [];//花的列表，根据不同来设置

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

    majiang.isHunCard = function(card, hunCard){
        return card == hunCard;
    };


    majiang.canChi = function (hand, cd, hunCard) {
        //将白板转为配子牌
        var num = [0, 0, 0, 0, 0];
        var rtn = [];
        // if(cd == hunCard){
        //     return rtn;
        // }
        for(var i = 0; i < hand.length; i++)
        {
            var currCard = hand[i];
            // if(currCard == hunCard){
            //     continue;
            // }
            var dif = currCard - cd;
            switch (dif)
            {
                case -2:
                case -1:
                case 1:
                case 2:
                    num[dif + 2]++;
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

    // 是否可以胡
    majiang.canHu = function (oCards, cd, hun) {
        var cards = oCards.slice();
        if (cd) {
            cards.push(cd);
        }
        cards = this.transformCards(cards, hun);
        var hunCounts = 0;
        for(var i = 0; i < cards.length; i++){
            if(cards[i] == 200){
                hunCounts++;
            }
        }
        var pl = MjClient.playui.getPlayerInfoByOff();
        var isMenQing = pl.mjchi.length + pl.mjpeng.length + pl.mjgang0.length == 0; // 门清
        //两个癞子以上时只能门清自摸
        if(hunCounts >= 2){
            if(isMenQing){
                return canHuLaizi(cards);
            }else {
                return false
            }
        }
        return canHuLaizi(cards);
    };


    //听牌函数，判断手牌能否听牌
    majiang.canTing = function (cds,hun) {
        return this.canHu(cds, 200, hun);
    }

    majiang.canGangWhenTing = function(mjhand, card)
    {
        var hangAfterGang = [];
        for (var i = 0; i < mjhand.length; i++) {
            if (card != mjhand[i]) {
                hangAfterGang.push(mjhand[i]);
            }
        }
        //若听牌状态下，去掉所杠的牌不能再听则不能杠
        if (!this.canTing(hangAfterGang, MjClient.data.sData.tData.hunCard)) {
            return false;
        }

        //求出之前听的牌 手牌要去掉最后一张补上来的牌
        var cards = mjhand.slice(0, mjhand.length - 1);
        var tingSet1 = this.calTingSet(cards, MjClient.data.sData.tData.hunCard, true);
        //求出杠之后听的牌
        var tingSet2 = this.calTingSet(hangAfterGang, MjClient.data.sData.tData.hunCard, true);
 
        return (Object.keys(tingSet2).length <= Object.keys(tingSet1).length);
    }

    //是否可以杠
    majiang.canGang1 = function(peng, hand, putCount)
    {
        if(MjClient.majiang.getAllCardsTotal(MjClient.data.sData.tData) - MjClient.data.sData.tData.cardNext <= (MjClient.MaxPlayerNum + 10)){
            return false;
        }
        var rtn = [];

        var pl = MjClient.data.sData.players[SelfUid()];

        // 最后一张牌不能杠
        if (this.getAllCardsTotal() - MjClient.data.sData.tData.cardNext == 0) {
            return rtn;
        }

        for (var i = 0; i < peng.length; i++) {
            // 听的状态没有选报听暗杠才能补杠
            if (pl.mjhand.indexOf(peng[i]) >= 0) {
                //手牌里的牌Push到rtn中
                rtn.push(peng[i]);
            }
        }
        var cnum = {};
        for (var i = 0; i < hand.length; i++) {
            var cd = hand[i];
            if (majiang.isEqualHunCard(cd)) {
                continue;
            }
            var num = cnum[cd];
            if (!num) {
                num = 0;
            }
            num++;
            cnum[cd] = num;
            if (num == 4) {
                rtn.push(cd);
            }
        }
        return rtn;
    };

    // 是否可以明杠
    majiang.canGang0 = function (hand, cd, isTing) {
        if(majiang.isEqualHunCard(cd))//混牌不能杠
        {
            return false;
        }
        var num = 0;
        for (var i = 0; i < hand.length; i++) {
            if (hand[i] == cd) num++;
        }
        return num == 3;
    };

    // 是否可以碰
    majiang.canPeng = function (hand, cd) {
        var num = 0;
        if (majiang.isEqualHunCard(cd)) { // 混牌不能碰
            return false;
        }
        for (var i = 0; i < hand.length; i++) {
            if (hand[i] == cd) {
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

    majiang.getAllCardsTotal = function () {
        return 120;
    };

    majiang.setFlowerImg = function (node, pl) {

        var icountNode = node.getChildByName("head").getChildByName("huaCount");
        if(icountNode != null) {
            var icount = pl.mjflower.length;
            icountNode.visible = true;
            cc.log("set flower ------ icount = " + icount);
            changeAtalsForLabel(icountNode,icount);
        }
    };

    majiang.setJiaZhuNum = function (node, pl) {

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

     majiang.getCheckTingHuCards = function (selectCard, mjhandCard, isReturn) {
        var hunCard = MjClient.data.sData.tData.hunCard;
        // if(this.isHunCard(selectCard, hunCard)){
        //     return {};
        // }
        if(mjhandCard === undefined){
            return {};
        }
        isReturn = isReturn || false;
        var cp = mjhandCard.slice();
        var index = cp.indexOf(selectCard);  //排除当前选择的一张牌
        cp.splice(index, 1);
        var tingSet = null;
        tingSet = this.calTingSet(cp, MjClient.data.sData.tData.hunCard, isReturn);
        return tingSet;
    };
    
    majiang.calTingSet  = function (oCds, hun, isReturn) {
        if(cc.isUndefined(oCds))
        {
            return {};
        }

        var tData = MjClient.data.sData;
        var sData = MjClient.data.sData;
        var pl = sData.players[SelfUid()+ ""];
        var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 71, 81, 91];
        var tingSet = {};
        for (var i = 0; i < allCardsArray.length; i++) {
            var cds = oCds.slice();
            if(allCardsArray[i])
                cds.push(allCardsArray[i]);
            if (this.canHu(oCds, allCardsArray[i],MjClient.data.sData.tData.hunCard)) {
                tingSet[allCardsArray[i]] = 1;
                if(isReturn){
                    return tingSet;
                }
            } 
        }
        return tingSet;
    };

    // 检测是否有人手中存在 中发白 的牌
    majiang.onCheckHasLiangCard = function (pl) {
        if (!pl) return;
        var cards = pl.mjhand.slice();
        if (cards.indexOf(71) >= 0 && cards.indexOf(81) >= 0 && cards.indexOf(91) >= 0) {
            return true;
        }
        return false;
    }


    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_qiChunHHMJ = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
