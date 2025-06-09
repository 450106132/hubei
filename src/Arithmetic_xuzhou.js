
(function() {
    var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 41, 51, 61, 71, 81, 91];
    var majiang = {};
    var flowerArray = [];//花的列表，根据不同来设置
    var hunCard = -1;//混子列表

    //是否是花
    majiang.isCardFlower = function(card)
    {
        // if(flowerArray.length == 0)
        //     return false;
        // var flowerIndex = flowerArray.indexOf(card);
        // if(flowerIndex >= 0)
        // {
        //     return true;
        // }
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
    };

    //胡牌判断，基础胡牌逻辑
    majiang.canHu = function(oCards, card, hun)
    {   
        var cardArr = oCards.slice();
        if(card){
            cardArr.push(card);
        }else{
            card = cardArr[cardArr.length-1];
        }
        cardArr = this.transformCards(cardArr, hun);

        if (this.isShiSanPao(cardArr,hun)) {
        return true;
    }
        cardArr = this.transformWhite(cardArr,hun);
        if(card != 91 && card!=hun && (card%10<4 || card%10>8)){
            return false;
        }
        if(card == 91 && card != hun && (hun%10 <4 || hun%10 >8)){
            return false;
        }
        if(this.isPaoPei7Dui(cardArr,0,hun)){
            return true;
        }
        if(this.isPaoPeiOther(cardArr,0,hun)){
            return true;
        }else{
            if(is7Dui(cardArr,0)){
                var singleCard = this.single7DuiCard(cardArr,0,hun);
                var currCard = card;
                if(currCard == 91){
                    currCard = hun;
                }
                cc.log(singleCard.indexOf(currCard)>=0);
                if(singleCard.length>0 && (singleCard.indexOf(currCard + "")>=0 || currCard==hun)){
                    return true;
                }
            }
            var tingSet = {};
            var hunCount = 0;
            cardArr.splice(cardArr.length-1,1);
            for(var index=0,length=cardArr.length;index<length;index++){
                if(cardArr[index]==200){
                    hunCount++;
                }
            }
            for(var i=0;i<allCardsArray.length;i++){
                var hunCardCount = hunCount;
                var cardList = cardArr.slice();
                var currCard = allCardsArray[i];
                if(currCard == 91){
                    currCard = hun;
                }
                if(currCard%10>=4 && currCard%10<=8){
                    var lastCard = currCard-1;
                    if(cardList.indexOf(lastCard)<0){
                        hunCardCount--;
                        if(hunCardCount<0){
                            continue;
                        }else{
                            cardList.splice(cardList.indexOf(200),1);
                        }
                    }else{
                        cardList.splice(cardList.indexOf(lastCard),1);
                    }
                    var nextCard = currCard+1;
                    if(cardList.indexOf(nextCard)<0){
                        hunCardCount--;
                        if(hunCardCount<0){
                            continue;
                        }else{
                           cardList.splice(cardList.indexOf(200),1); 
                        }
                    }else{
                        cardList.splice(cardList.indexOf(nextCard),1);
                    }
                    if(canHuLaizi(cardList,0)){
                        tingSet[currCard] = 1;
                    }
                }
            }
            if(card == hun && Object.keys(tingSet).length>0){
                return true;
            }
            if(card != hun){
                if(card == 91){
                    card = hun;
                }
                if(tingSet[card]>0){
                    return true;
                }
            }
            return false;                  
        }
        return true;
    };

    majiang.single7DuiCard = function (cards,cd,hunCard){
        var cardArr = cards.slice();
        if(!cd){
            cardArr.splice(cardArr.length-1,1);
        }
        cardArr.sort(function(a,b){
            return a-b;
        });

        var diffDic = {};
        for (var i = 0; i < cardArr.length; i++) {
            var card = cardArr[i]
            if(!this.isEqualHunCard(card)) {
                if(!diffDic[card]){
                    diffDic[card] = 1;
                }else{
                    diffDic[card]++;
                }
            }
        }
        var singleCard = [];
        for(var card in diffDic){
            if(diffDic[card]%2==1 && card%10>=4 && card%10<=8){
                singleCard.push(card);
            }
        }
        return singleCard;
    };

    //听牌函数，判断14张牌能否听牌
    majiang.canTing = function (cds,hunCard) {
        // var canHu = this.canHu(cds,0,hunCard);

        var pl = getUIPlayer(0);
        if(pl && pl.mjput.length == 0){
            //只能天听
            var tingSet = calTingSet(cds,hunCard);
            return Object.keys(tingSet).length>0;
        }
        return false;
    };

    majiang.canChi = function(hand, cd,hunCard)
    {
        //将白板转为配子牌
        var num = [0, 0, 0, 0, 0];
        var rtn = [];
        if(cd == hunCard){
            return rtn;
        }
        for(var i = 0; i < hand.length; i++)
        {
            var currCard = hand[i];
            if(currCard ==hunCard){
                continue;
            }
            var ttCard = currCard;
            if(currCard == 91){
                ttCard = hunCard;
            }

            var ttCard1 = cd;
            if(ttCard1 == 91){
                ttCard1 = hunCard;
            }
            var dif = ttCard - ttCard1;
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
        if (!majiang.canTing(hangAfterGang, MjClient.data.sData.tData.hunCard)) {
            return false;
        }
        //求出之前听的牌
        var tingSet1 = calTingSet(hand, MjClient.data.sData.tData.hunCard);
        //求出杠之后听的牌  
        var tingSet2 = calTingSet(hangAfterGang, MjClient.data.sData.tData.hunCard);
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
    };

    //是否可以杠
    majiang.canGang1 = function(peng, hand, isTing,hunCard)
    {   
        var rtn = [];
        var lastCard = hand[hand.length-1];
        // if(lastCard == hunCard){
        //     return rtn;
        // }
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
            if(cd == hunCard)
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
        return 135; //本来136 开始删除了一张
    };

    majiang.setFlowerImg = function (node, pl)
    {
        
    };

    majiang.setJiaZhuNum = function (node, pl)
    {
        if(!pl) return;
        var icountNode = node.getChildByName("head").getChildByName("jiaZhu");
        var icount = pl.jiazhuNum;
        if(icountNode != null) {
            icountNode.visible = true;
            icountNode.ignoreContentAdaptWithSize(true);
            if (icount > 0)
            {
                icountNode.setString("下" + icount + "嘴");
            }
            else
            {
                icountNode.setString("不下嘴");
            }
        }
    };

    majiang.transformWhite = function(cards,hunCard){
        for(var i=0,length=cards.length;i<length;i++){
            if(cards[i]==91){
                cards[i] = hunCard;
            }
        }
        return cards;
    };

    //十三炮，徐州玩法
    majiang.isShiSanPao = function(cards,hunCard)
    {
        var cardSet = cards.slice();
        // if(card){
        //     cardSet.push(card);
        // }
        if(cardSet.length!=14){
            return false;
        }
        cardSet = this.transformCards(cardSet,hunCard);
        var whiteCount = 0;
        var hunCount = 0;
        var fengCount = 0;
        var cardDirt = {};
        var p131 = [31, 41, 51, 61, 71, 81];
        for(var length=cardSet.length,i=length-1;i>=0;i--){
            var cd = cardSet[i]
            if(this.isEqualHunCard(cd)){
                hunCount++;
                cardSet.splice(cardSet.indexOf(cd),1);
            }else if(cd==91){
                whiteCount++;
                cardSet.splice(cardSet.indexOf(cd),1);
            }else{
                if(cd>=31 && cd<=81){
                    fengCount++;
                    cardSet.splice(cardSet.indexOf(cd),1);
                    p131.splice(p131.indexOf(cd),1);
                }
                if(!cardDirt[cd]){
                    cardDirt[cd] = 1;
                }else{
                    cardDirt[cd]++;
                }
            }
        }
        //logger.debug("十三幺-------------------------------------0");
        if((whiteCount==0 && fengCount+hunCount<5) || (whiteCount>=2 && fengCount+hunCount<3)){
            return false;
        }
        //cc.log("十三幺-------------------------------------cards = " + JSON.stringify(cards));
        if(whiteCount > 2 )//配子数超过2个以上不能胡十三幺.add by sking
        {
            return false;
        }

        //除了白板，白板可以2个以下，要两两不相同
        for(var cd in cardDirt){
            if(cd == 91)
            {
                if(cardDirt[cd] > 2){
                    return false;
                }
            }
            else
            {
                if(cardDirt[cd]>1){
                    return false;
                }
            }
        }
        //logger.debug("十三幺-------------------------------------3");
        for(;whiteCount>0;whiteCount--){
            if(!cardDirt[91]){
                cardDirt[91] = 1;
                fengCount ++;
            }else{
                if(cardSet.indexOf(hunCard)<0)
                {
                    if(p131.indexOf(hunCard) < 0)
                    {
                        cardSet.push(hunCard);
                    }
                }else{
                    return false;
                }
            }
        }
        //logger.debug("十三幺-------------------------------------4");
        cardSet.sort(function(a,b){
            return a-b;
        });

        //logger.debug("十三幺-------------------------------------cardSet = " + cardSet);
        var colorArr = {};
        for(var i=0;i<cardSet.length;i++){
            var cd = cardSet[i];
            var color = Math.floor(cd/10);
            var cType = cd % 10;


            for(var c in colorArr){
                if(colorArr[c].indexOf(cType) >= 0){
                    //logger.debug("十三幺------------------------0000");
                    return false;
                }
                var first = colorArr[c][0];
                if(color != Number(c) && Math.abs(cType - first)%3 == 0){
                    // logger.debug("十三幺------------------------c " + c);
                    // logger.debug("十三幺------------------------color" + color);
                    // logger.debug("十三幺------------------------cType" + cType);
                    // logger.debug("十三幺------------------------first" + first);
                    return false;
                }
            }
            if(!colorArr[color]){
                colorArr[color] =[];
            }
            colorArr[color].push(cType);
        }
        //logger.debug("十三幺-------------------------------------5");
        var needHunCount = 0;
        for(var c in colorArr){
            var array = colorArr[c];
            if(array.length > 1){
                for(var i = 0;i < array.length;i++){
                    if(i + 1 < array.length){
                        if(Math.abs(array[i] - array[i+1])%3 != 0){
                            return false;
                        }
                    }
                }
            }
        }
        //logger.debug("十三幺-------------------------------------6");
        return true;

    };

    //跑配7对
    majiang.isPaoPei7Dui = function(cards,card,hunCard){
        var cardArr = cards.slice();
        if(card){
            cardArr.push(card);
        }

        if (cardArr.length != 14) {
            return false;
        }
        cardArr.splice(cardArr.length-1,1);

        cardArr.sort(function(a, b) {
            return a - b; 
        });

        var diffDic = {};
        var hunCount = 0;
        for (var i = 0; i < cardArr.length; i++) {
            var cd = cardArr[i]
            if(this.isEqualHunCard(cd)) {
                hunCount++;
            }
            else{
                if(!diffDic[cd]){
                    diffDic[cd] = 1;
                }else{
                    diffDic[cd]++;
                }
            }
        }

        var duiCount = 0;
        var singleCount = 0;
        for(var cd in diffDic){
            if(diffDic[cd]%2==1){
                singleCount++;
            }
            duiCount += Math.floor(diffDic[cd]/2);
        }

        return duiCount + hunCount >= 7 && singleCount<hunCount;
    }

    majiang.isPaoPeiOther = function(cards,card,hunCard){
        var cardArr = cards.slice()
        if(!card){
            cardArr.splice(cardArr.length-1,1);
        }
        var hunCount = 0;
        for (var i = 0; i < cardArr.length; i++) {
            if(this.isEqualHunCard(cardArr[i])) {
                hunCount++;
            }
        }
        if(hunCount<2){
            return false;
        }

        for(var i=0;i<2;i++){
            cardArr.splice(cardArr.indexOf(200),1);
        }
        cardArr = this.transformWhite(cardArr,hunCard);

        return canHuLaizi(cardArr,0);
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
        MjClient.majiang_xuzhou = majiang;
        DoTest();
    }
    else
    {
        module.exports = majiang;
    }
})();
