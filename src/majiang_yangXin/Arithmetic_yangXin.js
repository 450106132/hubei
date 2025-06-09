
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
        var tData = MjClient.data.sData.tData;
        return card == tData.hunCard;
    }

    majiang.getWindCards = function() {
        return [71, 81, 91];
    }

    majiang.get7DuiType = function (cards, hunCard) {
        if(cards.length != 14){
            return 0;
        }
        var count1 = 0, count2 = 0; count3 = 0; count4 = 0, laizi = 0;
        var cardArr = [];
        for(var i = 0;i < cards.length;i++){
            var card = cards[i];
            if(hunCard != 0 && card == hunCard || this.isEqualHunCard(card)){
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

    //对对胡(飘胡)
    majiang.isDuiDuiHu = function(mjchi, mjhand) {
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

    // 处理有仰的吃牌
    majiang.dealMjChiCards = function(tData, mjchi) {
        if (!tData.areaSelectMode.canDaHu) {
            return mjchi;
        }

        var mjchiCp = [];
        var windCards = this.getWindCards();
        for (var card of mjchi) {
            if (windCards.indexOf(card) == -1) {
                mjchiCp.push(card);
            }
        }
        return mjchiCp;
    };

    //是否可以胡
    majiang.canHu = function(oCards, cd, hun)
    {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var isNeedJiang = Number(tData.areaSelectMode.huType) == 0;
        var cards = oCards.slice();
        if (cd) {
            cards.push(cd);
        }

        var qiDuiType = this.get7DuiType(cards, tData.hunCard);
        if (qiDuiType > 0) {
            return true;
        }

        var pl = sData.players[SelfUid()];
        var mjchiCp = this.dealMjChiCards(tData, pl.mjchi);

        if (isNeedJiang && this.isJJHu(cards, mjchiCp, pl.mjpeng, pl.mjgang0, pl.mjgang1)){
            return true;
        }

        if (tData.areaSelectMode.pengPengHu && this.isDuiDuiHu(mjchiCp, cards)) {
            return true;
        }

        return this.canHuLaizi(cards, 0, isNeedJiang);
    }

    majiang.canHuLaizi = function(oCards, cd, isNeedJiang) {
        var cards = [];
        var laizi = 0;
        isNeedJiang = isNeedJiang === undefined ? false : isNeedJiang;
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
        });
        // 依次删除一对牌做将，其余牌全部成扑则可胡
        for (var i = 0; i < cards.length; i++) {
            if (i > 0 && cards[i] == cards[i - 1]){
                continue; // 和上一次是同样的牌，略过不计算
            }

            if(isNeedJiang && cards[i] % 10 != 2 && cards[i] % 10 != 5 && cards[i] % 10 != 8) {
                continue;
            }

            if ((i + 1 < cards.length && cards[i] == cards[i + 1]) || laizi > 0) {
                var puCards = cards.slice();
                var puLaizi = laizi;
                puCards.splice(i, 1);
                if (puCards[i] == cards[i] ) {
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
        var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 71, 81, 91];

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
            if(num == 4 && cd != MjClient.playui.getHunCard() && (!isTing || majiang.canGangWhenTing(hand, cd)))
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
        if (!pl) return;
        var icountNode = node.getChildByName("head").getChildByName("huaCount");
        if(icountNode != null) {
            var icount = pl.mjflower.length;
            icountNode.visible = true;
            changeAtalsForLabel(icountNode,icount);
        }
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
        var laiZiCard =  MjClient.data.sData.tData.hunCard;
        var num = [0, 0, 0, 0, 0];
        var rtn = [];
        //癞子牌不能吃碰
        if(cd == laiZiCard){
            return rtn;
        }

        for(var i = 0; i < hand.length; i++)
        {
            var currCard = hand[i];
            if(currCard == laiZiCard){
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
        MjClient.majiang_yangXin = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
