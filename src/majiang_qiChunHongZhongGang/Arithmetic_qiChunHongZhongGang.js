
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

    // 将将胡 全是2，5，8
    majiang.isJJHu = function (mjhand, mjchi, mjpeng, mjgang0, mjgang1) {
        var cardList = [mjhand, mjpeng, mjgang0, mjgang1, mjchi];
        for (var i = 0; i < cardList.length; i++) {
            var cds = cardList[i];
            for (var j = 0; j < cds.length; j++) {
                var cd = cds[j];
                if (this.isEqualHunCard(cd)) {
                    continue;
                }

                var value = cd % 10;
                if (value != 2 && value != 5 && value != 8) {
                    return false;
                }
            }
        }
        return true;
    };

    // 清一色
    majiang.isSameColor = function(mjhand, mjchi, mjpeng, mjgang0, mjgang1)
    {
        var cardList = [mjhand, mjpeng, mjgang0, mjgang1, mjchi];
        var color = -1;
        for(var i = 0; i < cardList.length; i++)
        {
            var cds = cardList[i];
            for(var j = 0; j < cds.length; j++)
            {
                var cd = cds[j];
                if(this.isEqualHunCard(cd))
                {
                    continue;
                }

                if(color == -1)
                {
                    // 第一次找牌色,找到了就记录,以后按照这个处理
                    color = Math.floor(cd / 10);
                }
                else if(color != Math.floor(cd / 10))
                {
                    return false;
                }
            }
        }

        return true;
    };

    //风一色
    majiang.isAllWind = function(mjhand, mjchi, mjpeng, mjgang0, mjgang1){
        var cardList = [mjhand, mjpeng, mjgang0, mjgang1, mjchi];
        var color = -1;
        for(var i = 0; i < cardList.length; i++)
        {
            var cds = cardList[i];
            for(var j = 0; j < cds.length; j++)
            {
                var cd = cds[j];
                if(this.isEqualHunCard(cd))
                {
                    continue;
                }

                var color = Math.floor(cd / 10);
                var value = cd % 10;
                if(color < 3 || value != 1 || color == 7){
                    return false;
                }
            }
        }

        return true;
    };

    //对对胡(飘胡)
    majiang.isDuiDuiHu = function(mjchi, mjhand)
    {
        //有吃牌
        if(mjchi.length > 0)
        {
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
        for(var i = 0; i < cds.length; i++)
        {
            tempCD = cds[i];
            if(this.isEqualHunCard(tempCD))
            {
                laiziNums++;
                continue;
            }

            if(PAI[tempCD])
            {
                PAI[tempCD]++;
            }
            else
            {
                PAI[tempCD] = 1;
            }
        }

        var tempCount = 0;
        for(var i in PAI)
        {
            tempCount = PAI[i];
            if(tempCount == 1) count1++;
            else if(tempCount == 2) count2++;
            else if(tempCount == 3) count3++;
            else if(tempCount == 4) count4++;
        }

        var needNums = count1 * 2 + count2 + count4 * 2 - 1;
        if(needNums <= laiziNums)
        {
            return 1;
        }

        return 0;
    };

    //全求人
    majiang.quanQiuRen = function(tData, pl, ocards){
        if(tData.uids[tData.curPlayer] != pl.uid && ocards.length == 2 && pl.mjgang1.length == 0){
            var laiziCount = 0;
            if(this.isEqualHunCard(ocards[0])) laiziCount += 1;
            if(this.isEqualHunCard(ocards[1])) laiziCount += 1;
            var minCard = Math.min(ocards[0], ocards[1]);
            if(tData.areaSelectMode.playStyle == 0 && (laiziCount == 0 && ocards[0] == ocards[1] && (ocards[0] % 10 == 2 || ocards[0] % 10 == 5 || ocards[0] % 10 == 8 ))
                || (laiziCount == 1 && ( minCard % 10 == 2 || minCard % 10 == 5 || minCard % 10 == 8)))
                return true;
            
            if(tData.areaSelectMode.playStyle == 1 && ((laiziCount == 0 && ocards[0] == ocards[1])
                || laiziCount >= 1))
                return true;
        }

        return false;
    }

    //是否可以胡
    majiang.canHu = function(oCards, cd, hun)
    {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var cards = oCards.slice();
        if (cd) {
            cards.push(cd);
        }

        // 有痞子不能胡
        if (cards.indexOf(tData.piZiCard) >= 0  || cards.indexOf(71) >= 0) {
            return false;
        }

        var tAllCards = this.transformCards(cards, tData.hunCard);
        var laiziCount = 0;
        for(var i = 0; i < tAllCards.length; i++){
            if(this.isEqualHunCard(tAllCards[i]))
                laiziCount += 1;
        }

        var pl = sData.players[SelfUid()];
        var canHuLaizi = this.canHuLaizi(tAllCards, 0);
        var qiDuiType = this.get7DuiType(tAllCards, tData.hunCard);
        var isJiangYiSe = this.isJJHu(tAllCards, pl.mjchi, pl.mjpeng, pl.mjgang0, pl.mjgang1);
        if(!canHuLaizi && qiDuiType == 0 && !isJiangYiSe)
            return false;
            
        var isDaHu = false;
        var isXiaoHu = false;
        var isSameColor = false;
        var isFengYiSe = false;
        if(this.isSameColor(tAllCards, pl.mjchi, pl.mjpeng, pl.mjgang0, pl.mjgang1)){
            isSameColor = true;
        }

        if(this.isAllWind(tAllCards, pl.mjchi, pl.mjpeng, pl.mjgang0, pl.mjgang1)){
            isFengYiSe = true
        }

        if(qiDuiType > 0){
            isDaHu = true;
        }

        if(isJiangYiSe){
            isDaHu = true;
        }

        if(this.isDuiDuiHu(pl.mjchi, tAllCards)){
            isDaHu = true;
        }

        if(!isDaHu && canHuLaizi && (isSameColor || isFengYiSe)){
            isDaHu = true;
        }

        if(!isDaHu && canHuLaizi && this.quanQiuRen(tData, pl, tAllCards)){
            isDaHu = true;
        }

        if(!isDaHu && ((tData.areaSelectMode.playStyle == 1 && canHuLaizi) || (tData.areaSelectMode.playStyle == 0 && this.canHuLaizi( tAllCards, 0, true)))){
            var isMenQing = (pl.mjchi.length + pl.mjpeng.length + pl.mjgang0.length) == 0;
            if((!isMenQing && laiziCount <= 1)){
                isXiaoHu = true;
            }

            if(isMenQing){
                isXiaoHu = true;
            }
        }

        return isDaHu || isXiaoHu;
    };

    majiang.canHuLaizi = function(oCards, cd, isNeed258Jiang){
        var tData = MjClient.data.sData.tData;
        var isNeed258Jiang = (!isNeed258Jiang) ? false : true;
        var cards = [];
        var laizi = 0;
    
        for (var i = 0; i < oCards.length; i++) {
            if (this.isEqualHunCard(oCards[i])) {
                laizi++;
            }
            else {
                cards.push(oCards[i]);
            }
        }
        if (this.isEqualHunCard(cd)) {
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
    
        // 依次删除一对牌做将，其余牌全部成扑则可胡
        for (var i = 0; i < cards.length; i++) {
            if (i > 0 && cards[i] == cards[i - 1]){
                continue; // 和上一次是同样的牌，略过不计算
            }

            if(isNeed258Jiang && cards[i] % 10 != 2 && cards[i] % 10 != 5 && cards[i] % 10 != 8)
                continue;

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
        var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 41, 51, 61, 71, 81, 91];

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
        var tData = MjClient.data.sData.tData;
        var rtn = [];
        for(var i = 0; i < peng.length; i++)
        {
            if(hand.indexOf(peng[i]) >= 0 )
            {
                //手牌里的牌Push到rtn中
                rtn.push(peng[i]);
            }
        }
        var cnum = {};
        for(var i = 0; i < hand.length; i++)
        {
            var cd = hand[i];
            if(cd == tData.hunCard || cd == tData.piZiCard || cd == 71)
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
            if(num == 4 && cd != MjClient.playui.getPiZiCard() && cd != MjClient.playui.getHunCard() && cd != 71)
            {
                rtn.push(cd);
            }
        }
        return rtn;
    };

    //是否可以明杠
    majiang.canGang0 = function(hand, cd, isTing)
    {   
        var tData = MjClient.data.sData.tData;
        if(cd == tData.hunCard || cd == 71 || cd == MjClient.playui.getPiZiCard())//混牌不能杠
        {
            return false;
        }
        var num = 0;
        for (var i = 0; i < hand.length; i++) {
            if (hand[i] == cd) num++;
        }
        return num == 3;
    };

    //是否可以碰
    majiang.canPeng = function(hand, cd)
    {   
        var tData = MjClient.data.sData.tData;
        var num = 0;
        if(cd == tData.hunCard || cd == 71 || cd == MjClient.playui.getPiZiCard())//混牌不能碰
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

    majiang.canChi = function(hand, cd,hunCard){
        //将白板转为配子牌
        var piZiCard = MjClient.data.sData.tData.piZiCard;
        var laiZiCard =  MjClient.data.sData.tData.hunCard;
        var num = [0, 0, 0, 0, 0];
        var rtn = [];
        //痞子牌不能吃碰
        if(cd == piZiCard){
            return rtn;
        }
        //癞子牌打出去不能吃碰
        if(cd == laiZiCard){
            return rtn;
        }

        if(cd == 71){
            return rtn;
        }

        for(var i = 0; i < hand.length; i++)
        {
            var currCard = hand[i];
            if(currCard == piZiCard || currCard == laiZiCard || currCard == 71){
                continue;
            }
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

    majiang.gangWhenZimo = function(hand, rtn, hun)
    {
       
    }


    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_qiChunHongZhongGang = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
