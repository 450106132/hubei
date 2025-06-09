
(function() {
    var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 91];
    var majiang = {};
    var hunCard = -1;//混子列表
    var sortType = 1;//排序方式

    var ROW_TYPE = {
        xi: 0,
        noXi: 1,
        jiao: 2,
        dui: 3
    };

    // 有胡息组合 // todo 1-5-10
    var xiList = [
        [2, 7, 10, ],
        [22, 27, 30],
        [1, 2, 3],
        [21, 22, 23]
    ];

    // 绞牌
    var jiaoList = []; 
    for (var i = 1; i <= 10; i++) {
        jiaoList.push([i + 20, i, i], [i + 20, i + 20, i]);
    }

    // 无胡息组合(绞牌除外)
    var noXiList = []; 
    for (var i = 2; i <= 8; i++) {
        noXiList.push([i, i + 1, i + 2], [i + 20, i + 21, i + 22]);
    }

    // 对子
    var duiList = [];
    for (var i = 1; i <= 10; i++) {
        duiList.push([i, i], [i + 20, i + 20]);
    }

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

    majiang.getChiCards = function(mjhand,card){
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
                var biCards = this.checkBi(baseArr,card);
                // 耒阳吃牌死手规避
                if(biCards.length == 0 || (MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ && this.remove34Left(baseArr) <= 3)) {
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
                            var secBiCards = this.checkBi(array,card);
                            if(secBiCards.length == 0 || (MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ && this.remove34Left(baseArr) <= 2)){
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
        return chiSet;
    };

    majiang.getBiCards = function(cardArr,card){
        var biSet = this.checkBi(cardArr,card);
        //多次比牌的判断
        var indexArr = [];
        for(var i = 0;i < biSet.length;i++){
            var tmpCardArr = cardArr.slice();
            var tmpBiArr = biSet[i];
            for(var k = 0;k < tmpBiArr.length;k++){
                tmpCardArr.splice(tmpCardArr.indexOf(tmpBiArr[k]),1);
            }

            if(tmpCardArr.indexOf(card) >= 0){
                var tmpSet = this.checkBi(tmpCardArr,card);
                // console.log("第二次比 tmpCardArr@@"　+ JSON.stringify(tmpCardArr));
                if(tmpSet.length == 0 || (MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ && this.remove34Left(baseArr) <= 2)){
                    indexArr.push(i);
                }else{

                }
            }
        }
        for(var i = indexArr.length-1;i >= 0 ;i--){
            biSet.splice(i,1);
        }
        return biSet;
    };

    majiang.checkBi = function(cardArr,card){
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
        var tData = MjClient.data.sData.tData;
        if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King)
        {
            return 84;
        }else{
            return 80 + Number(tData.areaSelectMode.kingNum);
        }
    };

    majiang.sortByUser = function(){
        if(!MjClient.HandCardArr){
            return [];
        }
        var cardArr = MjClient.HandCardArr;
        var tmpArr = [];
        for(var i = 0;i < cardArr.length;i++){
            for(var k = 0;k<cardArr[i].length;k++){
                tmpArr.push(cardArr[i][k]);
            }
        }
        
        if(this.isShaoYang()){
            sortType = sortType % 3 + 1;
            if(sortType == 1){
                return this.sortCardYZ(tmpArr);
            }else if(sortType == 2){
                return this.sortHandCardSpecial(tmpArr);
            }else if(sortType == 3){
                return this.sortHandCardMax(tmpArr);
            } 
        }else{
            sortType = sortType % 2 + 1;
            if(sortType == 1){
                return this.sortHandCardMax(tmpArr);
            }else if(sortType == 2){
                return this.sortHandCardSpecial(tmpArr);
            }
        } 
    };

    majiang.getHandHuxi = function(HandCardArr){
        return 0;
    };

    // 获取一列牌胡息
    majiang.getRowHuxi_hand = function(row, tData) {
        row = row.slice();
        if(row.length == 0) return 0;
        row.sort(function(a, b) {return a - b});

        var getWangCount = function(cardArr){
            if(!cardArr || !(cardArr instanceof Array)) return 0;
            
            var hunCount = 0;
            for(var i = 0, len = cardArr.length; i < len; i++){
                if(cardArr[i] == 91) hunCount += 1;
            }
            return hunCount;
        }

        var huxi = 0;
        var wangCount = getWangCount(row);
	    if (row.length == 4) {
            if ((row[0] == row[1] && row[0] == row[2] && row[0] == row[3]) 
                || (wangCount == 1 && row[0] == row[1] && row[0] == row[2])
                || (wangCount == 2 && row[0] == row[1])
                || (wangCount == 3)) {
	            huxi += row[0] > 20 ? 12 : 9;
	        }
	    } else if (row.length == 3) {
            if ((row[0] == row[1] && row[0] == row[2])
                || (wangCount == 1 && row[0] == row[1])
                || (wangCount == 2)) {
	            huxi += row[0] > 20 ? 6 : 3;
	        } else {
                if ((row[0] == 1 && row[1] == 2 && row[2] == 3)
                    || (row[0] == 2 && row[1] == 7 && row[2] == 10)
                    || (wangCount == 1 && ((row[0] == 1 && row[1] == 2) ||
                                            (row[0] == 1 && row[1] == 3) ||
                                            (row[0] == 2 && row[1] == 3) ||
                                            (row[0] == 2 && row[1] == 7) ||
                                            (row[0] == 2 && row[1] == 10) ||
                                            (row[0] == 7 && row[1] == 10))
                )) {
	                huxi += 3;
                }else if((row[0] == 21 && row[1] == 22 && row[2] == 23)
                        || (row[0] == 22 && row[1] == 27 && row[2] == 30)
                        || (wangCount == 1 && ((row[0] == 21 && row[1] == 22) ||
                                                (row[0] == 21 && row[1] == 23) ||
                                                (row[0] == 22 && row[1] == 23) ||
                                                (row[0] == 22 && row[1] == 27) ||
                                                (row[0] == 22 && row[1] == 30) ||
                                                (row[0] == 27 && row[1] == 30))
                    )) {
	                huxi += 6;
	            }
	        }
	    }
    	return huxi;
    };

    majiang.sortHandCardMax = function(handArr){
        var mjhand = handArr.slice();
        mjhand.sort(function(a,b){
            return b - a;
        });
        // cc.log("mjhand:::::" + mjhand);
        var i = 0,k = 0;
        var handDir = {};
        for(i = 0;i < mjhand.length;i++){
            var hCard = mjhand[i];
            if(!handDir[hCard]){
                handDir[hCard] = 1;
            }else{
                handDir[hCard]++;
            }
        }
        //根据牌的个数分组
        var arr1 = [],arr2 = [],arr3 = [], arr4 = [], arr5 = [];
        for(var hjCard in handDir){
            var nmHjCard = Number(hjCard);
            if(nmHjCard == 91){
                var count = handDir[hjCard];
                while(count--){
                    arr5.push(nmHjCard);
                }
                continue;
            }
            if(handDir[hjCard] == 4){
                arr4.push([nmHjCard,nmHjCard,nmHjCard,nmHjCard]);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                delete handDir[hjCard];
            }
            if(handDir[hjCard] == 3){
                arr3.push([nmHjCard,nmHjCard,nmHjCard]);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                delete handDir[hjCard];
            }
            if(handDir[hjCard] == 2){
                arr2.push([nmHjCard,nmHjCard]);
            }
            if(handDir[hjCard] == 1){
                arr1.push(nmHjCard);
            }
        }
        arr4.sort(function(a,b){
            return b[0] - a[0];
        });
        arr3.sort(function(a,b){
            return b[0] - a[0];
        });
        arr2.sort(function(a,b){
            return b[0] - a[0];
        });
        arr1.sort(function(a,b){
            return a - b;
        }); 
        //计算是否存在2710
        var spArr = [[22,27,30],[2,7,10]];
        for(i = 0;i < spArr.length;i++){
            var spArray = spArr[i];
            var ttArray = [];
            for(var k = 0;k < spArray.length;k++){
                var spCard = spArray[k];
                if(arr1.indexOf(spCard) > 0){
                    ttArray.push(spCard);
                }
            }
            if(ttArray.length == 2){
                if(arr5.length > 0){
                    ttArray.push(arr5[0]);
                    arr5.splice(0,1);
                }
            }
            if(ttArray.length == 3){
                arr3.push(ttArray);
                for(k = 0;k < ttArray.length;k++){
                    var ttCard = ttArray[k];
                    if(ttArray[k] == 91){
                        continue;
                    }
                    arr1.splice(arr1.indexOf(ttCard),1);
                    delete handDir[ttCard];
                }
            }
        }
        //判断是否有123句子
        var tmpArr1 = arr1.slice();
        for(i = 0;i < tmpArr1.length;i++){
            var card = tmpArr1[i];
            if(arr1.indexOf(card) < 0){
                continue;
            }
            if(card % 10 == 1 || card % 10 == 2 || card % 10 == 3){
                var cardType = Math.floor(card/10);
                var card1,card2;
                if(card % 10 == 1){
                    card1 = 2;card2 = 3;
                }
                if(card % 10 == 2){
                    card1 = 1;card2 = 3;
                }
                if(card % 10 == 3){
                    card1 = 1;card2 = 2;
                }
                card1 = cardType * 10 + card1;
                card2 = cardType * 10 + card2;
                var needHunCount = 0;
                needHunCount = arr1.indexOf(card1) >= 0?needHunCount:needHunCount+1;
                needHunCount = arr1.indexOf(card2) >= 0?needHunCount:needHunCount+1;
                if(needHunCount <= arr5.length && needHunCount == 1){
                    var ttArray = [];
                    ttArray.push(card);
                    if(handDir[card1] > 0 && arr1.indexOf(card1) > 0){
                        ttArray.push(card1);
                        handDir[card1] --;
                        if(handDir[card1] == 0){
                            arr1.splice(arr1.indexOf(card1),1);
                            delete handDir[card1];
                        }                    
                    }else{
                        ttArray.push(arr5[0]);
                        arr5.splice(0,1);
                    }
                    if(handDir[card2] > 0 && arr1.indexOf(card2) > 0){
                        ttArray.push(card2);
                        handDir[card2] --;
                        if(handDir[card2] == 0){
                            arr1.splice(arr1.indexOf(card2),1);
                            delete handDir[card2];
                        }
                    }else{
                        ttArray.push(arr5[0]);
                        arr5.splice(0,1);
                    }
                    arr1.splice(arr1.indexOf(card),1);
                    ttArray.sort(function(a,b){
                        return a- b;
                    });
                    arr3.push(ttArray);
                }
            }
        }
        //计算单牌中的普通顺子
        arr1.sort(function(a,b){
            return a - b;
        });
        var tpArr = arr1.slice();
        for(i = 0;i < tpArr.length;i++){
            var mCard = tpArr[i];
            var cardIndex = arr1.indexOf(mCard);
            if(cardIndex < 0){
                continue;
            }
            if(arr1.indexOf(mCard+1) >= 0 && arr1.indexOf(mCard+2) >= 0){
                var ttArray = [mCard,mCard+1,mCard+2];
                arr3.push(ttArray);
                for(var k = 0;k < ttArray.length;k++){
                    arr1.splice(arr1.indexOf(ttArray[k]),1);
                }
            }
        }
        //计算绞牌
        removeArr = [];
        for(i = 0;i < arr2.length;i++){
            var doubleArr = arr2[i];
            if(doubleArr[0] != doubleArr[1]){
                continue;
            }
            var card = doubleArr[0];
            var mType = Math.ceil(card/10);
            var another = mType==1?card+20:card-20;
            if(arr1.indexOf(another) >= 0){
                doubleArr.push(another);
                removeArr.push(i);
                arr3.push(doubleArr);
                arr1.splice(arr1.indexOf(another),1);
                delete handDir[another];
            }else if(arr5.length > 0){
                //如果有王霸牌，算坎牌
                removeArr.push(i);
                doubleArr.push(91);
                arr3.push(doubleArr);
                arr5.splice(0,1);
            }
        }
        for(i = removeArr.length - 1;i >= 0;i--){
            delete handDir[arr2[removeArr[i]][0]];
            arr2.splice(removeArr[i],1);
        }
        //计算单个牌中连续的
        var tmpArr = arr1.slice();
        for(i = 0;i < tmpArr.length;i++){
            if(i + 1 < tmpArr.length){
                if(arr1.indexOf(tmpArr[i]) >= 0 && arr1.indexOf(tmpArr[i + 1]) >= 0){
                    if(tmpArr[i + 1] - tmpArr[i] <= 2){
                        arr2.push([tmpArr[i],tmpArr[i + 1]]);
                        arr1.splice(arr1.indexOf(tmpArr[i]), 1);
                        arr1.splice(arr1.indexOf(tmpArr[i + 1]), 1);
                    }
                }
            }
        }
        //计算单个的牌，如果能满足绞牌的规则，则放在一起
        tmpArr = arr1.slice();
        for(i = 0;i < tmpArr.length; i++){
            var tCard = tmpArr[i];
            if(arr1.indexOf(tCard) < 0){
                continue;
            }
            if(arr1.indexOf(tCard+1) >= 0){
                arr2.push([tCard,tCard+1]);
                arr1.splice(arr1.indexOf(tCard),1);
                arr1.splice(arr1.indexOf(tCard + 1),1);
                continue;
            }
            if(arr1.indexOf(tCard+2) >= 0){
                arr2.push([tCard,tCard+2]);
                arr1.splice(arr1.indexOf(tCard),1);
                arr1.splice(arr1.indexOf(tCard + 2),1);
                continue;                
            }
            var mType = Math.ceil(tCard/10);
            var another = mType==1?tCard+20:tCard-20;
            if(arr1.indexOf(another) >= 0){
                arr2.push([tCard,another]);
                arr1.splice(arr1.indexOf(tCard),1);
                arr1.splice(arr1.indexOf(another),1);
            }
        }
        //如果王霸牌还有多余的，则重新计算牌数为2的牌,计算个数为2的牌之后，还有多余的，则计算个数为1的
        var callback = function(){
            var total = arr1.length + arr2.length + arr3.length + arr4.length + arr5.length;
            if(total > 10 && arr1.length >= 2){
                arr2.push([arr1[0],arr1[1]]);
                arr1.splice(1,1);
                arr1.splice(0,1);
                callback();
            }
        };
        callback();
        while(arr5.length > 0){
            for(i = arr2.length - 1;i >= 0;i--){
                var doubleArr = arr2[i];
                if(arr5.length > 0){
                    doubleArr.push(arr5[0]);
                    arr3.push(doubleArr);
                    arr5.splice(0,1);    
                    arr2.splice(i,1);           
                }
            }
            for(i = arr1.length - 1;i >=0;i--){
                if(arr5.length > 0){
                    var tmpArr = [];
                    tmpArr.push(arr1[i]);
                    tmpArr.push(arr5[0]);
                    arr5.splice(0,1);
                    arr1.splice(i,1);
                    if(arr5.length > 0){
                        tmpArr.push(arr5[0]);
                        arr5.splice(0,1);
                    }
                    if(tmpArr.length == 2){
                        arr2.push(tmpArr);
                    }else if(tmpArr.length == 3){
                        arr3.push(tmpArr);
                    }
                }
            }
            if(arr2.length == 0 && arr1.length == 0){
                break;
            }
            if(arr5.length == 0){
                break;
            }
        }
        var arr = [];
        arr = arr.concat(arr4).concat(arr3).concat(arr2);
        for(i = 0;i < arr1.length;i++){
            arr.push([arr1[i]]);
        }
        if(arr5.length > 0){
            var hunArr = [];
            if(arr5.length == 4){
                hunArr.push([arr5[0],arr5[0],arr5[0],arr5[0]]);
            }else if(arr5.length == 3){
                hunArr.push([arr5[0],arr5[0],arr5[0]]);
            }else if(arr5.length == 2){
                hunArr.push([arr5[0],arr5[0]]);
            }else{
                hunArr.push([arr5[0]]);
            }
            arr = arr.concat(hunArr);
        }
        // cc.log("=================:" + JSON.stringify(arr));
        return arr;     
    };

    majiang.isShaoYang = function(){
        return MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ;
    };

    majiang.sortCard = function(handArr){
        if(this.isShaoYang()){
            return this.sortCardYZ(handArr);
        }else{
            return this.sortHandCardMax(handArr);
        }
    };

    majiang.sortHandCardSpecial = function(handArr){
        var mjhand = handArr.slice();
        mjhand.sort(function(a,b){
            return b - a;
        });
        var i = 0,k = 0;
        var handDir = {};
        for(i = 0;i < mjhand.length;i++){
            var hCard = mjhand[i];
            if(!handDir[hCard]){
                handDir[hCard] = 1;
            }else{
                handDir[hCard]++;
            }
        }
        //根据牌的个数分组
        var arr1 = [],arr2 = [],arr3 = [], arr4 = [], arr5 = [];
        for(var hjCard in handDir){
            var nmHjCard = Number(hjCard);
            if(MjClient.majiang.isEqualHunCard(nmHjCard)){
                var count = handDir[hjCard];
                while(count--){
                    arr5.push(nmHjCard);
                }
                continue;
            }
            if(handDir[hjCard] == 4){
                arr4.push([nmHjCard,nmHjCard,nmHjCard,nmHjCard]);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                delete handDir[hjCard];
            }
            if(handDir[hjCard] == 3){
                arr3.push([nmHjCard,nmHjCard,nmHjCard]);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                mjhand.splice(mjhand.indexOf(nmHjCard),1);
                delete handDir[hjCard];
            }
            if(handDir[hjCard] == 2){
                arr2.push([nmHjCard,nmHjCard]);
            }
            if(handDir[hjCard] == 1){
                arr1.push(nmHjCard);
            }
        }
        arr4.sort(function(a,b){
            return b[0] - a[0];
        });
        arr3.sort(function(a,b){
            return b[0] - a[0];
        });
        arr2.sort(function(a,b){
            return b[0] - a[0];
        });
        //计算绞牌
        var removeArr = [];
        for(i = 0;i < arr2.length;i++){
            var doubleArr = arr2[i];
            var card = doubleArr[0];
            if(handDir[card] == 1){
                arr1.push(card);
                removeArr.push(i);
                continue;
            }
            var mType = Math.ceil(card/10);
            var another = mType==1?card+20:card-20;
            if(handDir[another] > 0){
                doubleArr.push(another);
                removeArr.push(i);
                arr3.push(doubleArr);
                if(handDir[another] == 1){
                    arr1.splice(arr1.indexOf(another),1);
                }
                handDir[another] --;
                if(handDir[another] == 0){
                    delete handDir[another];
                }
            }else{
                if(arr5.length > 0){
                    doubleArr.push(arr5[0]);
                    removeArr.push(i);
                    arr3.push(doubleArr);
                    arr5.splice(0,1);
                }
            }
        }
        for(i = removeArr.length - 1;i >= 0;i--){
            arr2.splice(removeArr[i],1);
        }
        //计算单牌中是否存在2710
        arr1.sort(function(a,b){
            return a - b;
        });
        tpArr = arr1.slice();
        var spArr = [[22,27,30],[2,7,10]];
        for(i = 0;i < spArr.length;i++){
            var spArray = spArr[i];
            var ttArray = [];
            for(k = 0;k < spArray.length;k++){
                var spCard = spArray[k];
                if(arr1.indexOf(spCard) >= 0){
                    ttArray.push(spCard);
                }
            }
            if(ttArray.length == 2){
                if(arr5.length > 0){
                    ttArray.push(arr5[0]);
                    arr5.splice(0,1);
                }else{
                    ttArray = [];
                }
            }else if(ttArray.length == 1){
                ttArray = [];
            }
            if(ttArray.length > 0){
                arr3.push(ttArray);
                for(k = 0;k < ttArray.length;k++){
                    if(ttArray[k] == 91){
                        continue;
                    }
                    arr1.splice(arr1.indexOf(ttArray[k]),1);
                }
            }
        }
        //计算单牌中的普通顺子
        var tpArr = arr1.slice();
        for(i = 0;i < tpArr.length;i++){
            var mCard = tpArr[i];
            var cardIndex = arr1.indexOf(mCard);
            if(cardIndex < 0){
                continue;
            }
            if(arr1.indexOf(mCard+1) >= 0 && arr1.indexOf(mCard+2) >= 0){
                var ttArray = [mCard,mCard+1,mCard+2];
                arr3.push(ttArray);
                for(var k = 0;k < ttArray.length;k++){
                    arr1.splice(arr1.indexOf(ttArray[k]),1);
                }
            }
        }
        //判断单个牌中是否有2710
        for(i = 0;i < spArr.length;i++){
            var spArray = spArr[i];
            var ttArray = [];
            for(k = 0;k < spArray.length;k++){
                var spCard = spArray[k];
                if(arr1.indexOf(spCard) >= 0){
                    ttArray.push(spCard);
                }
            }
            if(ttArray.length == 2){
                arr2.push(ttArray);  
                for(k = 0;k < ttArray.length;k++){
                    arr1.splice(arr1.indexOf(ttArray[k]),1);
                }              
            }
        }
        //计算单个的牌，如果能满足绞牌的规则，则放在一起
        var tmpArr = arr1.slice();
        for(i = 0;i < tmpArr.length; i++){
            var tCard = tmpArr[i];
            if(arr1.indexOf(tCard) < 0){
                continue;
            }
            var mType = Math.ceil(tCard/10);
            var another = mType==1?tCard+20:tCard-20;
            if(arr1.indexOf(another) >= 0){
                arr2.push([tCard,another]);
                arr1.splice(arr1.indexOf(tCard),1);
                arr1.splice(arr1.indexOf(another),1);
                continue;
            }
            if(arr1.indexOf(tCard+1) >= 0){
                arr2.push([tCard,tCard+1]);
                arr1.splice(arr1.indexOf(tCard),1);
                arr1.splice(arr1.indexOf(tCard + 1),1);
                continue;
            }
            if(arr1.indexOf(tCard+2) >= 0){
                arr2.push([tCard,tCard+2]);
                arr1.splice(arr1.indexOf(tCard),1);
                arr1.splice(arr1.indexOf(tCard + 2),1);                
            }
        }
        //如果王霸牌还有多余的，则重新计算牌数为2的牌,计算个数为2的牌之后，还有多余的，则计算个数为1的
        var callback = function(){
            var total = arr1.length + arr2.length + arr3.length + arr4.length + arr5.length;
            if(total > 10 && arr1.length >= 2){
                arr2.push([arr1[0],arr1[1]]);
                arr1.splice(1,1);
                arr1.splice(0,1);
                callback();
            }
        };
        callback();
        while(arr5.length > 0){
            for(i = arr2.length - 1;i >= 0;i--){
                var doubleArr = arr2[i];
                if(arr5.length > 0){
                    doubleArr.push(arr5[0]);
                    arr3.push(doubleArr);
                    arr5.splice(0,1);    
                    arr2.splice(i,1);           
                }
            }
            for(i = arr1.length - 1;i >=0;i--){
                if(arr5.length > 0){
                    var tmpArr = [];
                    tmpArr.push(arr1[i]);
                    tmpArr.push(arr5[0]);
                    arr5.splice(0,1);
                    arr1.splice(i,1);
                    if(arr5.length > 0){
                        tmpArr.push(arr5[0]);
                        arr5.splice(0,1);
                    }
                    if(tmpArr.length == 2){
                        arr2.push(tmpArr);
                    }else if(tmpArr.length == 3){
                        arr3.push(tmpArr);
                    }
                }
            }
            if(arr2.length == 0 && arr1.length == 0){
                break;
            }
            if(arr5.length == 0){
                break;
            }
        }
        var arr = [];
        arr = arr.concat(arr4).concat(arr3).concat(arr2);
        for(i = 0;i < arr1.length;i++){
            arr.push([arr1[i]]);
        }
        if(arr5.length > 0){
            var hunArr = [];
            if(arr5.length == 4){
                hunArr.push([arr5[0],arr5[0],arr5[0],arr5[0]]);
            }else if(arr5.length == 3){
                hunArr.push([arr5[0],arr5[0],arr5[0]]);
            }else if(arr5.length == 2){
                hunArr.push([arr5[0],arr5[0]]);
            }else{
                hunArr.push([arr5[0]]);
            }
            arr = arr.concat(hunArr);
        }
        return arr;     
    };

    //邵阳永州字牌的默认理牌方式
    majiang.sortCardYZ = function(hand){
        var maxColNum = 10; // todo

        hand = hand.slice();
        hand.sort(function(a, b){
            return a - b;
        });
        var dict = {};
        var laiziCount = 0;
        for (var i = 0; i < hand.length; i++) {
            if(hand[i] == 91){
                laiziCount++;
                continue;
            }
            dict[hand[i]] = dict[hand[i]] ? dict[hand[i]] + 1 : 1;
        }

        // 坎
        var tiMatrix = [];
        var kanMatrix = [];
        var duiArr = [];
        for (var k in dict) {
            var card = Number(k);
            if(dict[k] < 2){
                continue;
            }
            var row = [], count = dict[k];
            for (var i = 0; i < count; i++) {
                row.push(card);
            }  
            if(count == 4){
                tiMatrix.push(row);
            }else if(count == 3){
                kanMatrix.push(row);
            }else if(count == 2){
                duiArr.push(card);
            }   
            delete dict[k];
        }

        if(laiziCount == 4){
            tiMatrix.push([91, 91, 91, 91]);
            laiziCount = 0;
        }else if(laiziCount == 3){
            kanMatrix.push([91, 91, 91]);
            laiziCount = 0;
        }

        var matrix = [];
        function getRow(rowType) { // 取组合
            var list = [];
            switch (rowType) {
                case ROW_TYPE.xi:
                    list = xiList;
                    break;
                case ROW_TYPE.noXi:
                    list = noXiList;
                    break;
                case ROW_TYPE.jiao: 
                    list = jiaoList;
                    break;
                case ROW_TYPE.dui: 
                    list = jiaoList;
                    break;
            }

            if(rowType == ROW_TYPE.dui){
                for(var k = 0;k < duiArr.length;k++){
                    var card = duiArr[k];
                    var otherCard = card >= 20 ? card % 20 : card + 20;
                    if(dict[otherCard] > 0){
                        matrix.push([card, card, otherCard]);
                        delete dict[otherCard];
                    }else if(laiziCount > 0){
                        matrix.push([card, card, 91]);
                        laiziCount--;
                    }else{
                        matrix.push([card, card]);
                    }
                }
                return;
            }

            for (var i = 0; i < list.length; i++) {
                var row = list[i].slice();
                var dict2 = {};
                for (var j = 0; j < row.length; j++) {
                    dict2[row[j]] = dict2[row[j]] ? dict2[row[j]] + 1 : 1;
                }

                var cardArray = [];
                for (var k in dict2) {
                    var factCount = dict[k] === undefined ? 0 : dict[k];
                    if (factCount == dict2[k]) { // dict[k]可能为undefined 用非判断
                        cardArray.push(Number(k));
                    }
                }

                if (cardArray.length == 2 && laiziCount > 0 || cardArray.length == 3) {
                    for(var k in cardArray){
                        delete dict[cardArray[k]];
                    }
                    if(cardArray.length == 2){
                        laiziCount--;
                        cardArray.push(91);
                    }
                    matrix.push(cardArray);
                }
            }
        }

        function getLink(rowType) { // 取连接的牌
            var list = [];
            switch (rowType) {
                case ROW_TYPE.xi:
                    list = xiList;
                    break;
                case ROW_TYPE.noXi:
                    list = noXiList;
                    break;
                case ROW_TYPE.jiao: 
                    list = jiaoList;
                    break;
                default:
                    break;
            }

            for (var i = 0; i < list.length; i++) {
                var row = list[i].slice();
                var tmp = [];
                for (var j = 0; j < 3; j++) {
                    if (j > 0 && row[j] == row[j - 1]) {
                        continue;
                    }

                    if (dict[row[j]] > 0) {
                        tmp.push(row[j]);
                    }
                }

                if (tmp.length >= 2) {
                    for(var k in tmp){
                        delete dict[tmp[k]];
                    }
                    if(tmp.length == 2 && laiziCount > 0){
                        laiziCount--;
                        tmp.push(91);
                    }
                    matrix.push(tmp);
                }
            }
        }

        // 四/三张——绞牌/对子——有息一句话——无息一句话——相关连的牌(优先大小字)
        //手上同时三张王牌则王牌组成一列，放置在四/三张之后；两张放在对子、相关牌上（可以拆开，尽量与其它牌组成一门牌）
        getRow(ROW_TYPE.dui); 
        // getRow(ROW_TYPE.jiao); 
        getRow(ROW_TYPE.xi);
        getRow(ROW_TYPE.noXi);

        getLink(ROW_TYPE.jiao);
        getLink(ROW_TYPE.xi);
        getLink(ROW_TYPE.noXi);

        for(var k in dict){
            var tmp = [], card = Number(k);
            tmp.push(card);
            var needCount = 0;
            for(var i = 0; i < laiziCount;i++){
                needCount++;
                tmp.push(91);
            }
            laiziCount -= needCount;
            matrix.push(tmp);
        }

        for(var k = 0;k < laiziCount;k++){
            var tmp = [];
            tmp.push(91);
            matrix.push(tmp);
        }

        // 最大列数 处理
        if (matrix.length + kanMatrix.length + tiMatrix.length > maxColNum) {
            var total = tiMatrix.length + matrix.length + kanMatrix.length - maxColNum;
            for (var i = 1; i <= total; i++) {
                for (var j = 0; j < matrix.length; j++) {
                    if (matrix[j].length == 1) {
                        for (var k = j + 1; k < matrix.length; k++) {
                            if (matrix[k].length == 1) {
                                matrix[j] = matrix[j].concat(matrix[k]);
                                matrix.splice(k, 1);
                                j = matrix.length;
                                break;
                            }
                        }
                    }
                }
            }
        }

        // for(var i = 0;i < matrix.length;i++){
        //  if(matrix[i].length >= 2){
        //      matrix[i].sort(function(a, b){
        //          return a - b;
        //      });
        //  }
        // }

        return [].concat(tiMatrix, kanMatrix, matrix);      
    };

    DoTest = function(){
        
    };

    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_paohuzi = majiang;
        DoTest();
    }
    else
    {
        module.exports = majiang;
    }

    // var cards = 
    // [
    //     //小写
    //     1,2,3,4,5,6,7,8,9,10,
    //     1,2,3,4,5,6,7,8,9,10,
    //     1,2,3,4,5,6,7,8,9,10,
    //     1,2,3,4,5,6,7,8,9,10,
    //     //大写
    //     21,22,23,24,25,26,27,28,29,30,
    //     21,22,23,24,25,26,27,28,29,30,
    //     21,22,23,24,25,26,27,28,29,30,
    //     21,22,23,24,25,26,27,28,29,30,

    //     91,91,91,91
    // ];

    // var funcId = null;
    // function test(number){
    //     var tmpArr = cards.slice();
    //     var handArr = [];
    //     for(var i = 0;i < 21;i++){
    //         var idx = Math.floor(Math.random()*tmpArr.length);
    //         var card = tmpArr[idx];
    //         handArr.push(card);
    //         tmpArr.splice(idx,1);
    //     }

    //     var sortArr =  majiang.sortHandCardMax(handArr);
    //     // console.log(sortArr);
    //     var tmpHandArr = handArr.slice();
    //     for(var k = 0;k < sortArr.length;k++){
    //         var sort = sortArr[k];
    //         for(var m = 0;m < sort.length;m++){
    //             if(tmpHandArr.indexOf(sort[m]) < 0){
    //                 clearTimeout(funcId);
    //                 console.log("整理牌出错:" + JSON.stringify(handArr));
    //                 JSON.stringify(sort);
    //                 break;
    //             }else{
    //                 tmpHandArr.splice(tmpHandArr.indexOf(sort[m]), 1);
    //             }
    //         }
    //     }
    //     number++;
    //     funcId = timeout(number);
    // }

    // function timeout(number){
    //     return setTimeout(function(){
    //         test(number);
    //     },0.5);
    // }

    // funcId = timeout(1);
})();
