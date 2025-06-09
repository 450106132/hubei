
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
        var tData = MjClient.data.sData.tData;
        
        var cards = oCards.slice();
        if (cd) {
            cards.push(cd);
        }

        for (var i = 0; i < cards.length; i++) {
            if (tData.areaSelectMode["gudinggangType"] == 0 && 71 == cards[i]
                || tData.areaSelectMode["gudinggangType"] == 1 && [71, 81].indexOf(cards[i]) >= 0) {
                return false;
            }
        }

        // 番数限制
        var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
        // 胡牌的牌型分
        var paixingScore = this.huScoreNumber(tData, player, cards);
        // 番数限制
        var fan = this.fanNumber(player);
        fan = Math.pow(2, fan);
        var score = paixingScore * fan;
        // 底分
        var difen = Number(tData.areaSelectMode["difen"] || 1);
        if ((tData.areaSelectMode["gudinggangType"] == 0 && score/difen < 10) 
            || (tData.areaSelectMode["gudinggangType"] == 1 && score/difen < 16)) {
            return false;
        }

        hun = hun || tData.hunCard;
        cards = this.transformCards(cards, hun);

        // 七对
        if (is7Dui(cards)) {
            return true;
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

        var sData = MjClient.data.sData;
        var pl = sData.players[SelfUid()+ ""];
        var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 71, 81, 91];
        var tingSet = {};
        for (var i = 0; i < allCardsArray.length; i++) {
            var cds = oCds.slice();
            if(allCardsArray[i])
                cds.push(allCardsArray[i]);
            if (this.canHu(oCds, allCardsArray[i])) {
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
    };

    // 过胡计算胡分大小
    majiang.huScoreNumber = function (tData, pl, cards) {
        if (!pl) return 0;
        // 没选亮牌可大胡，则胡牌后一定是平胡
        if (pl.liangCards.length > 0 && !tData.areaSelectMode.liangpaikedahu) return 3;

        var mjhand = cards || pl.mjhand.slice();

        // 计算胡得分
        var score = 0;
        // 是否成牌型的胡
        // var canHu = this.canHuByHunCard(pl, cd, tData);
        // 癞子牌统一替换为 200
        var mjHandCards = this.transformCards(mjhand.slice(), tData.hunCard);
        // 胡牌牌型
        var qidui = this.get7DuiType(tData, mjHandCards); // 七对类型
        var qingyise = this.isSameColor(mjHandCards, pl.mjchi, pl.mjpeng, pl.mjgang0, pl.mjgang1); // 清一色
        var jiangyise = this.isAllJiangColor(mjHandCards.concat(pl.mjchi).concat(pl.mjpeng).concat(pl.mjgang0).concat(pl.mjgang1)); // 将一色
        var isDuiDuiHu = this.isDuiDuiHu(pl.mjchi, mjHandCards); // 碰碰胡

        if (qidui >= 3) {
            if (jiangyise) {
                score += 60;
            }
            else if (qingyise) {
                score += 60;
            }
            else {
                score += 40;
            }
        }
        else if (qidui == 2) {
            if (jiangyise) {
                score += 40;
            }
            else if (qingyise) {
                score += 40;
            }
            else {
                score += 20;
            }
        }
        else if (qidui == 1) {
            if (jiangyise) {
                score += 20;
            }
            else if (qingyise) {
                score += 20;
            }
            else {
                score += 10;
            }
        }
        else if (qidui == 0) {
            if (isDuiDuiHu) {
                if (jiangyise) {
                    score += 20;
                }
                else if (qingyise) {
                    score += 20;
                }
                else {
                    score += 10;
                }
            }
            else {
                if (jiangyise) {
                    score += 10;
                }
                else if (qingyise) {
                    score += 10;
                }
                else {
                    score += 3; // 平胡另外算
                }
            }
        }
        return score;
    };

    // 计算番数
    majiang.fanNumber = function (pl) {
        if (!pl) return 0;

        var tData = MjClient.data.sData.tData;

        // 计算番
        var fanNum = 0;

        // 亮牌
        if (pl.liangCards && pl.liangCards.length > 0) {
            fanNum += [71, 81, 91].indexOf(tData.hunCard) >= 0 ? pl.liangCards.length * 2 : pl.liangCards.length;
        }

        // 固定杠
        var hongzhong = 0, facai = 0;
        if (pl.gangCards) {
            for (var i = 0; i < pl.gangCards.length; i++) {
                if (pl.gangCards[i] == 71) {
                    hongzhong++;
                }
                if (pl.gangCards[i] == 81) {
                    facai++;
                }
            }
            if (hongzhong > 0) {
                fanNum += hongzhong;
            }
            if (facai > 0) {
                fanNum += facai;
            }
        }

        // 吃（带癞子）
        var laiNum = 0
        for (var i = 0; i < pl.mjchi.length; i++) {
            if (pl.mjchi[i] == tData.hunCard) laiNum++;
        }
        if (laiNum > 0) {
            fanNum += laiNum * 2;
        }
        // 碰（带癞子）
        if (pl.mjpeng.length > 0 && pl.mjpeng.indexOf(tData.hunCard) >= 0) {
            fanNum += 2;
        }

        // 明杠
        var minggangNum = 0;
        for (var i = 0; i < pl.mjgang0.length; i++) {
            if (pl.mjgang0[i] == tData.hunCard) {
                fanNum += 2;
            }
            else {
                minggangNum++;
            }
        }
        if (minggangNum > 0) {
            fanNum += minggangNum;
        }

        // 暗杠
        var angangNum = 0;
        for (var i = 0; i < pl.mjgang1.length; i++) {
            if (pl.mjgang1[i] == tData.hunCard) {
                fanNum += 4;
            }
            else {
                angangNum++;
            }
        }
        if (angangNum > 0) {
            fanNum += angangNum * 2;
        }

        // 开口
        var kaikouNum = Math.floor(pl.mjchi.length / 3) + pl.mjpeng.length + pl.mjgang0.length;
        if (kaikouNum == 4) {
            fanNum += 2;
        }
        else if (kaikouNum == 3) {
            fanNum += 1;
        }

        return fanNum;
    };

    // 0:没有7小对 1:普通7小对  2:豪华7小对 3超豪华7小对 4超超豪华七对
    majiang.get7DuiType = function (tData, cards, hunCard) {
        if (cards.length != 14) return 0;

        var count2 = 0; count4 = 0, laizi = 0;
        var cardArr = [];
        for (var i = 0;i < cards.length;i++) {
            var card = cards[i];
            if (hunCard != 0 && card == hunCard || this.isEqualHunCard(card)) {
                laizi++;
                continue;
            }
            cardArr[card] = cardArr[card] ? cardArr[card] + 1 : 1;
        }
        for (var card in cardArr) {
            if (cardArr[card] == 1) {
                count2++;
                laizi--;
            }
            if (cardArr[card] == 2) {
                count2++;
            }
            if (cardArr[card] == 3) {
                count4++;
                laizi--;
            }
            if (cardArr[card] == 4) {
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
            }
            else if (count == 1) {
                type = 2;
            }
            else {
                type = 1;
            }
        }
        return type;
    };

    // 将一色
    var jiangCards = [2, 5, 8];
    majiang.isAllJiangColor = function (cards) {
        for (var i = 0; i < cards.length; i++) {
            if (this.isEqualHunCard(cards[i])) { // 除去混牌
                continue;
            }
            if (jiangCards.indexOf(cards[i] % 10) < 0) {
                return false;
            }
        }
        return true;
    };

    // 清一色
    majiang.isSameColor = function (mjhand, mjchi, mjpeng, mjgang0, mjgang1) {
        var cardList = [mjhand, mjpeng, mjgang0, mjgang1, mjchi];
        var color = -1;
        for (var i = 0; i < cardList.length; i++) {
            var cds = cardList[i];
            for (var j = 0; j < cds.length; j++) {
                var cd = cds[j];
                if (this.isEqualHunCard(cd)) {
                    continue;
                }
                if (color == -1) {
                    // 第一次找牌色,找到了就记录,以后按照这个处理
                    color = Math.floor(cd / 10);
                }
                else if (color != Math.floor(cd / 10)) {
                    return false;
                }
            }
        }
        return true;
    };

    //对对胡(飘胡)
    majiang.isDuiDuiHu = function (mjchi, mjhand) {
        //有吃牌
        if (mjchi.length > 0) {
            return 0;
        }

        var laiziNums = 0;
        var cds = mjhand.slice();

        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        var count4 = 0;

        //计算各牌的数量
        var PAI = {};
        var tempCD = 0;
        for (var i = 0; i < cds.length; i++) {
            tempCD = cds[i];
            if (this.isEqualHunCard(tempCD)) {
                laiziNums++;
                continue;
            }
            if (PAI[tempCD]) {
                PAI[tempCD]++;
            }
            else {
                PAI[tempCD] = 1;
            }
        }

        var tempCount = 0;
        for (var i in PAI) {
            tempCount = PAI[i];
            if (tempCount == 1) count1++;
            else if (tempCount == 2) count2++;
            else if (tempCount == 3) count3++;
            else if (tempCount == 4) count4++;
        }

        var needNums = count1 * 2 + count2 + count4 * 2 - 1;
        if (needNums <= laiziNums) {
            return 1;
        }
        return 0;
    };

    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_huangShiHHMJ = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
