
(function() {
    var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 91];
    var majiang = {};
    var hunCard = -1;//混子列表
    var sortType = 1;//排序方式

    //设置混，参数是[]，必须设置
    majiang.setHun = function(hun){
        hunCard = hun;
    };

    majiang.hunCard = function(){
        return 91;
    };

    //是否是混子
    majiang.isEqualHunCard = function(card){
        return card == 91;
    };

    majiang.setJiaZhuNum = function (node, pl)
    {
        if(!pl) return;
        var icountNode = node.getChildByName("head").getChildByName("jiaZhu");
        var tData = MjClient.data.sData.tData;
        cc.log("===========举手 = " + pl.jiazhuNum);
        if(pl.jiazhuNum == 1) {
            icountNode.visible = true;
            icountNode.ignoreContentAdaptWithSize(true);
            icountNode.setString("举手");  
        }else{
            icountNode.setString("");
        }
    };

    majiang.remove34Left = function(hand) {
        var cardNum = {};
        for (var i = 0; i < hand.length; i++) {
            var card = hand[i];
            cardNum[card] = cardNum[card] ? cardNum[card] + 1 : 1;
        }

        var count = 0;
        for (var k in cardNum) {
            if (cardNum[k] < 3) {
                count += cardNum[k];
            }
        }
        return count;
    }

    majiang.getChiCards = function(mjhand, card) {
        var tData = MjClient.data.sData.tData; // todo
        var chiSet = [];
        var handArr = mjhand.slice();
        var chiRules = [[-1,1],[1,2],[-1,-2]];
        for(var i=0;i<chiRules.length;i++){
            var rule = chiRules[i];
            var firstCard = card + rule[0];
            var secCard = card + rule[1];
            if(handArr.indexOf(firstCard)>=0 && majiang.cardHandCount(handArr,firstCard)<=2 && 
                handArr.indexOf(secCard)>=0 && majiang.cardHandCount(handArr,secCard)<=2)
            {
                var set = [card,firstCard,secCard];
                set.sort(function(a,b){
                    return a-b;
                });
                chiSet.push(set);
            }
        }

        var otherRules = [[2,7,10],[22,27,30]];
        if (tData && tData.areaSelectMode.isYiwushi) {
            otherRules.push([1, 5, 10], [21, 25, 30]);
        }
        for(var k = 0;k<otherRules.length;k++){
            var other = otherRules[k];
            var cardIndex = other.indexOf(card);
            if(cardIndex>=0){
                var ss = true;
                for(var i=0;i<other.length;i++){
                    if(other[i] == card){
                        continue;
                    }
                    if(handArr.indexOf(other[i])<0 || this.cardHandCount(handArr,other[i])>2){
                        ss = false;
                    }
                }
                if(ss){
                    chiSet.push(other);
                }
            }
        }


        var type = Math.ceil(card/10);
        var another = type==1?card+20:card-20;
        var anotherCount = majiang.cardHandCount(handArr,another);
        var cardCount = majiang.cardHandCount(handArr,card);
        if(anotherCount<=2 && cardCount<=2 && (anotherCount+cardCount)>=2){
            var set = null;
            console.log(anotherCount);
            if(anotherCount == 2){
                set = [card,another,another];
                set.sort(function(a,b){
                    return a-b;
                });
                chiSet.push(set);
                if(cardCount > 0){
                    set = [card,card,another];
                    set.sort(function(a,b){
                        return a-b;
                    });
                    chiSet.push(set);
                }
            }
            if(anotherCount == 1 && cardCount > 0){
                set = [card,card,another];
                set.sort(function(a,b){
                    return a-b;
                });
                chiSet.push(set);
            }            
        }

        // console.log("chiSet@@ " + JSON.stringify(chiSet));

        var indexArr = [];
        for(var i = 0;i < chiSet.length;i++){
            var tmpSet = chiSet[i];
            var tmpCardArr = tmpSet.slice();
            tmpCardArr.splice(tmpCardArr.indexOf(card),1);

            var baseArr = mjhand.slice();
            for(var k = 0;k < tmpCardArr.length;k++){
                baseArr.splice(baseArr.indexOf(tmpCardArr[k]),1);
            }
            if(baseArr.indexOf(card) >= 0){
                // baseArr.splice(baseArr.indexOf(card),1);
                // console.log("取第一次比 baseArr@@ " + JSON.stringify(baseArr));
                var biCards = this.checkBi(baseArr, card, tData);
                // console.log("biCards@@ " + JSON.stringify(biCards));
                // 耒阳吃牌死手规避
                if(biCards.length == 0 || this.remove34Left(baseArr) <= 3) {
                    if(indexArr.indexOf(i) < 0){
                       indexArr.push(i); 
                    }
                }else{
                    var failCount = 0;              //判断比牌中不满足需求的个数
                    for(var k = 0;k < biCards.length;k++){  
                        var tmpBiSet = biCards[k];
                        // tmpBiSet.splice(tmpBiSet.indexOf(card),1);
                        var array = baseArr.slice();
                        for(var m = 0;m < tmpBiSet.length;m++){
                            array.splice(array.indexOf(tmpBiSet[m]),1);
                        }
                        if(array.indexOf(card) >= 0){
                            // array.splice(array.indexOf(card),1); // ??
                            // console.log("array@@@ " +JSON.stringify(array));
                            var secBiCards = this.checkBi(array, card, tData);
                            // console.log("secBiCards@@ " + JSON.stringify(secBiCards));
                            if(secBiCards.length == 0 || this.remove34Left(array) <= 3){
                                failCount ++;
                            }
                        }
                    }
                    if(failCount == biCards.length){
                        if(indexArr.indexOf(i) < 0){
                           indexArr.push(i); 
                        }
                    } 
                }
            }
        }
        for(var t = indexArr.length-1;t >= 0;t--){
            chiSet.splice(indexArr[t],1);
        }    
        return this.sortChiBiCards(chiSet);
    };

    majiang.getBiCards = function(cardArr, card) {
        var tData = MjClient.data.sData.tData;
        var biSet = this.checkBi(cardArr,card, tData);
        //多次比牌的判断
        var indexArr = [];
        for(var i = 0;i < biSet.length;i++){
            var tmpCardArr = cardArr.slice();
            var tmpBiArr = biSet[i];
            for(var k = 0;k < tmpBiArr.length;k++){
                tmpCardArr.splice(tmpCardArr.indexOf(tmpBiArr[k]),1);
            }

            if(tmpCardArr.indexOf(card) >= 0){
                var tmpSet = this.checkBi(tmpCardArr, card, tData);
                // console.log("第二次比 tmpCardArr@@"　+ JSON.stringify(tmpCardArr));
                if(tmpSet.length == 0 || this.remove34Left(tmpCardArr) <= 3){
                    indexArr.push(i);
                }else{

                }
            }
        }
        for(var i = indexArr.length-1;i >= 0 ;i--){
            biSet.splice(i,1);
        }
        return this.sortChiBiCards(biSet);
    };

    majiang.checkBi = function(cardArr,card, tData){
        var chiSet = [];
        var chiRules = [[-1,1],[1,2],[-1,-2]];
        for(var i=0;i<chiRules.length;i++){
            var rule = chiRules[i];
            var firstCard = card + rule[0];
            var secCard = card + rule[1];
            if(cardArr.indexOf(firstCard)>=0 && majiang.cardHandCount(cardArr,firstCard)<=2 && 
                        cardArr.indexOf(secCard)>=0 && majiang.cardHandCount(cardArr,secCard)<=2)
            {
                var set = [card,firstCard,secCard];
                set.sort(function(a,b){
                    return a-b;
                });
                chiSet.push(set);
            }
        }

        var otherRules = [[2,7,10],[22,27,30]];
        if (tData.areaSelectMode.isYiwushi) {
            otherRules.push([1, 5, 10], [21, 25, 30]);
        }
        for(var k = 0;k<otherRules.length;k++){
            var other = otherRules[k];
            var cardIndex = other.indexOf(card);
            if(cardIndex>=0){
                var ss = true;
                for(var i=0;i<other.length;i++){
                    if(cardArr.indexOf(other[i])<0 || majiang.cardHandCount(cardArr,other[i])>2){
                        ss = false;
                    }
                }
                if(ss){
                    chiSet.push(other);
                }
            }
        }

        var type = Math.ceil(card/10);
        var another = type==1?card+20:card-20;
        var anotherCount = majiang.cardHandCount(cardArr,another);
        var cardCount = majiang.cardHandCount(cardArr,card);
        var tmpCardCount = cardCount == 0?1:cardCount;
        if(anotherCount<=2 && tmpCardCount<=2 && (anotherCount+tmpCardCount)>=3){
            var set = null;
            if(anotherCount == 2){
                set = [card,another,another];
                set.sort(function(a,b){
                    return a-b;
                });
                chiSet.push(set);
                if(cardCount == 2){
                    set = [card,card,another];
                    set.sort(function(a,b){
                        return a-b;
                    });
                    chiSet.push(set);
                }
            }
            if(anotherCount == 1 && cardCount > 0){
                set = [card,card,another];
                set.sort(function(a,b){
                    return a-b;
                });
                chiSet.push(set);
            }            
        }
        return chiSet;
    };

    majiang.cardHandCount = function (cardArr,card){
        var cardCount = 0;
        for(var i=0,length=cardArr.length;i<length;i++){
            if(cardArr[i] == card){
                cardCount ++ ;
            }
        }
        return cardCount;
    };

    majiang.getAllCardsTotal = function (){
        if(MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI){
            return 40;
        }
        //邵阳二人玩有20张埋牌
        if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI && 
            MjClient.data.sData.tData.areaSelectMode.isMaiPai && MjClient.data.sData.tData.maxPlayer == 2){
            return 80 - MjClient.data.sData.tData.areaSelectMode.maiPaiNum;
        }
        //埋牌选项
        var maiPaiGameTypes = [
            MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI,
            MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI,
            MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO
        ];
        
        if( maiPaiGameTypes.indexOf(MjClient.gameType)>=0 && 
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ &&
            MjClient.data.sData.tData.areaSelectMode.maiPaiNum && 
            MjClient.data.sData.tData.maxPlayer == 2){
            return 80 - MjClient.data.sData.tData.areaSelectMode.maiPaiNum;
        }

        if (MjClient.data.sData.tData.areaSelectMode.isMaiPai){
            if (MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI){
                return 60;
            }
        }
        return 80;
    };

    majiang.sortByUser = function(arr) {
        if (!MjClient.HandCardArr) {
            return [];
        }
        var cardArr = MjClient.HandCardArr;
        if (arr) {
            cardArr = arr;
        }

        var tmpArr = [];
        for (var i = 0; i < cardArr.length; i++) {
            for (var k = 0; k < cardArr[i].length; k++) {
                tmpArr.push(cardArr[i][k]);
            }
        }

        var tData = MjClient.data.sData.tData;


        if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI || 
            MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI ||
            MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI || 
            ((MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) && 
                (MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
                    MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
                    MjClient.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO)))
        {

            return MjClient.huzi.sortCard(tmpArr);
        }

        return this.sortCard(tmpArr, null, tData);
    };

    majiang.sortHandCardSpecial = function(handArr) {
        var tData = MjClient.data.sData.tData;

        if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI || 
            MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI ||
            MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO){

            return MjClient.huzi.sortCard(handArr, 1);
        }
        return this.sortCard(handArr, null, tData);
    };

    majiang.getRelateCount = function(hand, cd) {
        // 牌点少2，牌点少1，牌点等于，牌点大1，牌点大2，牌点一样 大小相反，组成2-7-10的其余牌 牌点较小的，组成2-7-10的其余牌 牌点较大的，组成1-5-10的其余牌 牌点较小的，组成1-5-10的其余牌 牌点较大的
        var num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (cd == 2 || cd == 7 || cd == 10 || cd == 22 || cd == 27 || cd == 30 || cd == 1 || cd == 5 || cd == 21 || cd == 25) {
            switch (cd) {
                case 1:
                    for (var i in hand) {
                        if (hand[i] == 5) num[8]++;
                        if (hand[i] == 10) num[9]++;
                    }
                    break;
                case 2:
                    for (var i in hand) {
                        if (hand[i] == 7) num[6]++;
                        if (hand[i] == 10) num[7]++;
                    }
                    break;
                case 5:
                    for (var i in hand) {
                        if (hand[i] == 1) num[8]++;
                        if (hand[i] == 10) num[9]++;
                    }
                    break;
                case 7:
                    for (var i in hand) {
                        if (hand[i] == 2) num[6]++;
                        if (hand[i] == 10) num[7]++;
                    }
                    break;
                case 10:
                    for (var i in hand) {
                        if (hand[i] == 2) num[6]++;
                        if (hand[i] == 7) num[7]++;
                        if (hand[i] == 1) num[8]++;
                        if (hand[i] == 5) num[9]++;
                    }
                    break;
                case 21:
                    for (var i in hand) {
                        if (hand[i] == 25) num[8]++;
                        if (hand[i] == 30) num[9]++;
                    }
                    break;
                case 22:
                    for (var i in hand) {
                        if (hand[i] == 27) num[6]++;
                        if (hand[i] == 30) num[7]++;
                    }
                    break;
                case 25:
                    for (var i in hand) {
                        if (hand[i] == 21) num[8]++;
                        if (hand[i] == 30) num[9]++;
                    }
                    break;
                case 27:
                    for (var i in hand) {
                        if (hand[i] == 22) num[6]++;
                        if (hand[i] == 30) num[7]++;
                    }
                    break;
                case 30:
                    for (var i in hand) {
                        if (hand[i] == 22) num[6]++;
                        if (hand[i] == 27) num[7]++;
                        if (hand[i] == 21) num[8]++;
                        if (hand[i] == 25) num[9]++;
                    }
                    break;
            }
        }

        for (var i = 0; i < hand.length; i++) {
            var dif = hand[i] - cd;
            switch (dif) {
                case -2:
                case -1:
                case 0:
                case 1:
                case 2:
                    num[dif + 2]++;
                    break;
                case 20:
                case -20:
                    num[5]++;
                    break;
            }
        }

        return num;
    };

    function delCard(cardList, card, num) {
        num = num ? num : 1;
        for (var j in cardList) {
            if (cardList[j] == card) {
                cardList.splice(j, num);
                break;
            }
        }
    }

    majiang.sortCard = function(hand, maxColNum) {
        var tData = MjClient.data.sData.tData;
        maxColNum = maxColNum || 10;
        var cardMatrix = [];

        var cardNum = {};
        for (var k = 0; k < hand.length; k++) {
            if (cardNum[hand[k]])
                cardNum[hand[k]]++;
            else
                cardNum[hand[k]] = 1;
        }

        var handTmp = [].concat(hand);
        handTmp.sort(function(a, b) {
            if (a % 20 == b % 20)
                return b - a;
            return a % 20 - b % 20;
        })

        var kanMatrix = [];
        // //两张及以上的牌
        // for (var k in cardNum) {
        //     if (cardNum[k] >= 2) {
        //         if (cardNum[k] >= 3) {
        //             var cardRow = [];
        //             for (var i = 0; i < cardNum[k]; i++)
        //                 cardRow[i] = parseInt(k);
        //             kanMatrix.push(cardRow);
        //         }

        //         delCard(handTmp, k, cardNum[k]);
        //     }
        // }

        // 坎
        for (var k in cardNum) {
            if (cardNum[k] >= 3) {
                var cardRow = [];
                for (var i = 0; i < cardNum[k]; i++) {
                    cardRow[i] = parseInt(k);
                }
                kanMatrix.push(cardRow);
                delCard(handTmp, k, cardNum[k]);
            }
        }

        // 带胡息一句话
        var huxiList = [[2, 7, 10], [1, 2, 3], [22, 27, 30], [21, 22, 23]];
        if (tData.haveFiveTypeRow) {
            huxiList.push([1, 5, 10], [21, 25, 30]);
        }
        
        for (var i = 0; i < huxiList.length;) {
            var row = huxiList[i].slice(); // 拷贝 不能引用！！！
            if (handTmp.indexOf(row[0]) >= 0 && handTmp.indexOf(row[1]) >= 0 && handTmp.indexOf(row[2]) >= 0) {
                cardMatrix.push(row);
                for (var j = 0; j < 3; j++) {
                    var card = row[j];
                    cardNum[card]--;
                    delCard(handTmp, card, 1);
                }
            } else {
                i++;
            }
        }

        // 对
        for (var k in cardNum) {
            if (cardNum[k] == 2) {
                delCard(handTmp, k, cardNum[k]);
            }
        }

        var handTmp2 = handTmp.slice();
        // 能组成一句话的牌
        function getWordRow(card) {
            if (handTmp2.length >= 2) {
                var num = majiang.getRelateCount(handTmp2, card);
                if (num[6] > 0 && num[7] > 0) { // 2-7-10
                    delCard(handTmp2, card, 1);
                    delCard(handTmp, card, 1);
                    switch (card) {
                        case 2:
                            delCard(handTmp2, 7, 1);
                            delCard(handTmp2, 10, 1);
                            delCard(handTmp, 7, 1);
                            delCard(handTmp, 10, 1);
                            var cardRow = [2, 7, 10];
                            cardMatrix.push(cardRow);
                            break;
                        case 22:
                            delCard(handTmp2, 27, 1);
                            delCard(handTmp2, 30, 1);
                            delCard(handTmp, 27, 1);
                            delCard(handTmp, 30, 1);
                            var cardRow = [22, 27, 30];
                            cardMatrix.push(cardRow);
                            break;
                    }
                } else if (num[8] > 0 && num[9] > 0 && tData && tData.areaSelectMode.isYiwushi) { // 1-5-10
                    delCard(handTmp2, card, 1);
                    delCard(handTmp, card, 1);
                    switch (card) {
                        case 1:
                            delCard(handTmp2, 5, 1);
                            delCard(handTmp2, 10, 1);
                            delCard(handTmp, 5, 1);
                            delCard(handTmp, 10, 1);
                            var cardRow = [1, 5, 10];
                            cardMatrix.push(cardRow);
                            break;
                        case 21:
                            delCard(handTmp2, 25, 1);
                            delCard(handTmp2, 30, 1);
                            delCard(handTmp, 25, 1);
                            delCard(handTmp, 30, 1);
                            var cardRow = [21, 25, 30];
                            cardMatrix.push(cardRow);
                            break;
                    }
                } else if (num[3] > 0 && num[4] > 0) { // 顺子
                    delCard(handTmp2, card, 1);
                    delCard(handTmp2, card + 1, 1);
                    delCard(handTmp2, card + 2, 1);

                    delCard(handTmp, card, 1);
                    delCard(handTmp, card + 1, 1);
                    delCard(handTmp, card + 2, 1);

                    var cardRow = [card, card + 1, card + 2];
                    cardMatrix.push(cardRow);
                } else {
                    handTmp2.splice(handTmp2.indexOf(card), 1);
                }
                getWordRow(handTmp2[0]);
            }
        }
        getWordRow(handTmp2[0]);

        for (var k in cardNum) { // 绞牌 一对
            if (cardNum[k] == 2) {
                var card = Number(k);
                var card_opposite = card < 20 ? card + 20 : card - 20;
                if (handTmp.indexOf(card_opposite) >= 0) {
                    handTmp.splice(handTmp.indexOf(card_opposite), 1);
                    if (card < 20) {
                        cardMatrix.push([card_opposite, card, card]);
                    } else {
                        cardMatrix.push([card, card, card_opposite]);
                    }
                } else {
                    cardMatrix.push([card, card]);
                }
            }
        }

        // 能连接的牌
        function getLinkRow(card) {
            if (handTmp.length > 0) {
                var num = majiang.getRelateCount(handTmp, card);
                if (num[6] > 0) { // 2-7
                    switch (card) {
                        case 2:
                            delCard(handTmp, 2, 1);
                            delCard(handTmp, 7, 1);
                            cardMatrix.push([2, 7]);
                            break;
                        case 22:
                            delCard(handTmp, 22, 1);
                            delCard(handTmp, 27, 1);
                            cardMatrix.push([22, 27]);
                            break;
                    }
                } else if (num[7] > 0) { // 2 - 10
                    switch (card) {
                        case 2:
                            delCard(handTmp, 2, 1);
                            delCard(handTmp, 10, 1);
                            cardMatrix.push([2, 10]);
                            break;
                        case 22:
                            delCard(handTmp, 22, 1);
                            delCard(handTmp, 30, 1);
                            cardMatrix.push([22, 30]);
                            break;
                        case 7:
                            delCard(handTmp, 7, 1);
                            delCard(handTmp, 10, 1);
                            cardMatrix.push([7, 10]);
                            break;
                        case 27:
                            delCard(handTmp, 27, 1);
                            delCard(handTmp, 30, 1);
                            cardMatrix.push([27, 30]);
                            break;
                    }
                } else if (tData.haveFiveTypeRow && num[8] > 0) { // 1 - 5
                    switch (card) {
                        case 1:
                            delCard(handTmp, 1, 1);
                            delCard(handTmp, 5, 1);
                            cardMatrix.push([1, 5]);
                            break;
                        case 21:
                            delCard(handTmp, 21, 1);
                            delCard(handTmp, 25, 1);
                            cardMatrix.push([21, 25]);
                            break;
                    }
                } else if (tData.haveFiveTypeRow && num[9] > 0) { // 1-10  5-10
                    switch (card) {
                        case 1:
                            delCard(handTmp, 1, 1);
                            delCard(handTmp, 10, 1);
                            cardMatrix.push([1, 10]);
                            break;
                        case 21:
                            delCard(handTmp, 21, 1);
                            delCard(handTmp, 30, 1);
                            cardMatrix.push([21, 30]);
                            break;
                        case 5:
                            delCard(handTmp, 5, 1);
                            delCard(handTmp, 10, 1);
                            cardMatrix.push([5, 10]);
                            break;
                        case 25:
                            delCard(handTmp, 25, 1);
                            delCard(handTmp, 30, 1);
                            cardMatrix.push([25, 30]);
                            break;
                    }
                } else if (num[3] > 0) {
                    delCard(handTmp, card, 1);
                    delCard(handTmp, card + 1, 1);

                    cardMatrix.push([card, card + 1]);
                } else if (num[5] > 0) { //贰 2
                    var anotherCard = card + card < 20 ? (card + 20) : (card - 20);
                    delCard(handTmp, card, 1);
                    delCard(handTmp, anotherCard, 1);

                    if (card < 20)
                        cardMatrix.push([card + 20, card]);
                    else
                        cardMatrix.push([card, card - 20]);
                } else if (num[4] > 0) { // 2 4
                    delCard(handTmp, card, 1);
                    delCard(handTmp, card + 2, 1);

                    cardMatrix.push([card, card + 2]);
                } else {
                    delCard(handTmp, card, 1);
                    cardMatrix.push([card]);
                }
                getLinkRow(handTmp[0]);
            }
        }
        getLinkRow(handTmp[0]);

        // 最大列数 处理
        if (cardMatrix.length > maxColNum) {
            for (var i = 1; i <= cardMatrix.length - maxColNum; i++) {
                for (var j = 0; j < cardMatrix.length; j++) {
                    if (cardMatrix[j].length == 1) {
                        for (var k = j + 1; k < cardMatrix.length; k++) {
                            if (cardMatrix[k].length == 1) {
                                cardMatrix[j] = cardMatrix[j].concat(cardMatrix[k]);
                                cardMatrix.splice(k, 1);
                                break;
                            }
                        }
                    }
                }
            }
        }

        kanMatrix.sort(function(a, b) {
            if (a[0] % 20 == b[0] % 20) {
                return b[0] - a[0];
            }

            return a[0] % 20 - b[0] % 20;
        })

        cardMatrix.sort(function(a, b) {
            if (a[0] % 20 == b[0] % 20) {
                return b[0] - a[0];
            }

            return a[0] % 20 - b[0] % 20;
        })

        return kanMatrix.concat(cardMatrix);
    }
    
    var LimitHuType = {
        ka: 0, // 卡胡 无胡(如果选了)
        black: 1, // 黑胡 一点红(如果选了)
        red: 2 // 红胡
    }

    var putCard2LimitHu = {
        1: LimitHuType.ka, // 吃4打1
        21: LimitHuType.ka,
        2: LimitHuType.black, // 吃5打2
        22: LimitHuType.black,
        7: LimitHuType.black, // 吃4打7
        27: LimitHuType.black,
        4: LimitHuType.red, // 吃7打4
        24: LimitHuType.red,
        5: LimitHuType.red, // 吃2打5
        25: LimitHuType.red
    }

    // 限胡类型tip
    majiang.getLimitHuDesc = function(putCard, tData) {
        var desc = "";
        switch (putCard2LimitHu[putCard]) {
            case LimitHuType.ka:
                desc = "卡胡";
                if (!tData.areaSelectMode.budaihu) {
                    desc += ",无胡";
                }
                break;
            case LimitHuType.black:
                desc = "黑胡";
                if (!tData.areaSelectMode.budaiyihong) {
                    desc += ",一点红";
                }
                break;
            case LimitHuType.red:
                desc = "红胡";
                break;
            default:
                break;
        }

        return desc;
    }

    // 手牌排列胡息
    majiang.getHandHuxi = function(handMatrix) {
        var huxi = 0;
        for (var i = 0; i < handMatrix.length; i++) {
            if (handMatrix[i].length == 4) {
                if (handMatrix[i][0] == handMatrix[i][1] && handMatrix[i][0] == handMatrix[i][2] && handMatrix[i][0] == handMatrix[i][3]) {
                    huxi += handMatrix[i][0] > 20 ? 12 : 9;
                }
            }
            else if (handMatrix[i].length == 3) {
                if (handMatrix[i][0] == handMatrix[i][1] && handMatrix[i][0] == handMatrix[i][2]) {
                    huxi += handMatrix[i][0] > 20 ? 6 : 3;
                } else {
                    var row = [].concat(handMatrix[i]);
                    row.sort(function(a, b) {return a - b});

                    if (row[0] == 1 && row[1] == 2 && row[2] == 3) {
                        huxi += 3;
                    }
                    else if (row[0] == 21 && row[1] == 22 && row[2] == 23) {
                        huxi += 6;
                    }
                    else if (row[0] == 2 && row[1] == 7 && row[2] == 10) {
                        huxi += 3;
                    } 
                    else if (row[0] == 22 && row[1] == 27 && row[2] == 30) {
                        huxi += 6;
                    } 
                    else if (row[0] == 1 && row[1] == 5 && row[2] == 10) {
                        huxi += 3;
                    }
                    else if (row[0] == 21 && row[1] == 25 && row[2] == 30) {
                        huxi += 6;
                    }
                }
            }
        }
        return huxi;
    }

    // 获取能打牌的数量
    majiang.getCanPutCardNum = function(pl, usedCards) {
        usedCards = usedCards || [];
        var hand = [].concat(pl.mjhand);

        var cardNum = {};
        for (var i = 0; i < hand.length; i++) {
            var card = hand[i];
            cardNum[card] = cardNum[card] ? cardNum[card] + 1 : 1;
        }

        // 删除3张及以上牌
        for (var k in cardNum) {
            if (cardNum[k] >= 3) {
                for (var i = 0; i < cardNum[k]; i++) {
                    hand.splice(hand.indexOf(Number(k)), 1);
                }
            }
        }

        // 删除需要用掉的牌
        for (var i = 0; i < usedCards.length; i++) {
            var card = usedCards[i];
            var idx = hand.indexOf(card);
            if (idx >= 0) {
                hand.splice(idx, 1);
            }
        }

        var num = 0;
        var canNotPutCard = pl.canNotPutCard || [];
        for (var i = 0; i < hand.length; i++) {
            var card = hand[i];
            if (canNotPutCard.indexOf(card) < 0) {
                num++;
            }
        }

        return num;
    }

    // 提 偎牌展示方式 0.隐藏牌(非提偎牌玩家) 1.隐藏牌(提偎牌玩家自己展示)  2.展示 
    majiang.getCardShowType = function(uid, card) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = sData.players[uid];
        // 展示
        if (!(pl.mjHide && pl.mjHide.indexOf(card) >= 0)) {
            return 2;
        }

        // 隐藏牌 提偎牌玩家自己展示
        if (uid == SelfUid()) {
            return 1;
        }

        return 0;
    }

    majiang.sortChiBiCards = function(arr){
        var arr = arr.concat();
        arr.sort(function(a1, a2){
            var isSame1 = (a1[0] % 10 == a1[1] % 10) && (a1[1] % 10  == a1[2] % 10);
            var isSame2 = (a2[0] % 10 == a2[1] % 10) && (a2[1] % 10  == a2[2] % 10);
            if(isSame1 && isSame2){
                return 0;
            }else if(isSame1){
                return -1;
            }else{
                return 1;
            }
        });
        return arr;
    }

    if (typeof(MjClient) != "undefined") {
        MjClient.majiang_hengyang = majiang;
    } else {
        module.exports = majiang;
    }

    // var mjhand = [1, 5, 10, 1, 5, 10, 21, 21, 22, 22];
    // var card = 1;
    // var MjClient = {GAME_TYPE : {ZP_LY_CHZ: 2017028}};
    // MjClient.gameType = 2017028;
    // MjClient.data = {sData: {tData: {areaSelectMode: {isYiwushi: true}}}};

    // var chiSet = majiang.getChiCards(mjhand, card);
    // console.log(chiSet);
    // for (var i = 0; i < chiSet.length; i++) {
    //     var hand2 = mjhand.slice();
    //     var chiRow = chiSet[i];
    //     console.log("吃牌 chiRow@@" + JSON.stringify(chiRow));
    //     for (var j = 0; j < chiRow.length; j++) {
    //         if (chiRow[j] != card) {
    //             hand2.splice(hand2.indexOf(chiRow[j]), 1);
    //         }
    //     }

    //     console.log("hand2@@ " + hand2);
    //     var biSet1 = majiang.getBiCards(hand2,card)
    //     console.log(biSet1);

    // }

    // var hand2 = [1,1,1,2,2,2,3,3,3,4,4,4,27,27,7,7,8,9];
    // hand2 = [27, 27, 7, 7, 8, 9];
    // console.log(majiang.getBiCards(hand2, 7));

    // var allCardList = [];
    // for (var i = 1; i <= 10; i++) {
    //     allCardList.push(i, i + 20);
    // }

    // var hand = [];
    // for (var i = 0; i < 20; i++) {
    //     hand.push(allCardList[Math.floor(Math.random() * allCardList.length)]);
    // }
    // console.log(majiang.sortCard(hand));
})();
