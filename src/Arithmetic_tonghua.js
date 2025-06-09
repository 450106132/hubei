
(function() {
    var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 41, 51, 61, 71, 81, 91];
    var majiang = {};
    var flowerArray = [];//花的列表，根据不同来设置
    var hunCard = -1;//混子列表

    //是否是花
    majiang.isCardFlower = function(card)
    {
        return false;
    }

    //设置花，参数是[]，必须设置
    majiang.setFlower = function(flower)
    {
        flowerArray = flower;
    }

    majiang.setJiaZhuNum = function (node, pl)
    {
    }

    //设置混，参数是[]，必须设置
    majiang.setHun = function(hun)
    {
        hunCard = hun;
    }

    //癞子的上一张牌(这里也叫上滚)
    majiang.getShanGunCard = function(hunCard) 
    {
        var ret = 0;

        //条万筒
        if (hunCard < 30)
        {
            if (hunCard == 1)
                ret = 9;
            else if(hunCard == 11)
                ret = 19;
            else if(hunCard == 21)
                ret = 29;
            else
                ret = hunCard - 1;
        }
        else if(hunCard <= 61)//东南西北
        {
            if(hunCard == 31)
                ret = 61;
            else
                ret = hunCard - 10;
        }
        else if (hunCard <= 91)//中发白
        {
            if(hunCard == 71)
                ret = 91
            else
                ret = hunCard - 10;
        }

        return ret;
    };

    majiang.isJieGuangCard = function(card)
    {
        var players = MjClient.data.sData.players;
        for (var uid in players)
        {
            var p = players[uid];
            for (var j = 0; j < p.mjTeshuGang1.length; j ++)
            {
                cc.log("p.mjTeshuGang1[j]=" + p.mjTeshuGang1[j]);
                for (var k = 0; k < p.mjTeshuGang1[j].length; k ++)
                {
                    if (p.mjTeshuGang1[j][k] == card)
                        return true;
                }
            }
        }

        return false;
    }

    //是否是混子
    majiang.isEqualHunCard = function(card)
    {
        return card == 200;
    };

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
            if(tempCD == 200)
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

        if (cds.length == 2 && laiziNums == 2)
            return 0;

        if (cds.length == 5 && laiziNums == 4)
            return 0;

        var needNums = count1 * 2 + count2 + count4 * 2 - 1;
        if(needNums <= laiziNums)
        {
            return 1;
        }
        return 0;
    }
	
	// 通化麻将胡牌算法
	majiang.canHuLaizi_tonghua = function(oCards, cd, data) {
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

        var lastPutCard = cards[cards.length - 1];

	    cards.sort(function(a, b) {
	        return a - b;
	    })

	    // 依次删除一对牌做将，其余牌全部成扑则可胡
	    for (var i = 0; i < cards.length; i++) {
	        if (i > 0 && cards[i] == cards[i - 1]){
	            continue; // 和上一次是同样的牌，略过不计算
	        }

            // 没选择飘胡，不能胡单吊，也就是lastPutCard不能做将
            //if (!data.tData.areaSelectMode["piaohu"] && cards[i] == lastPutCard && cards.length != 2) {
            //    continue;
            //}

	        data.cards = [];
			data.sunziNum = 0;

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
				data.cards.push(cards[i]);
				data.cards.push(cards[i]);

	            if (this.isPu_tonghua(puCards, puLaizi, data))
				    return true;
			
				data.cards.pop();
				data.cards.pop();
		    }
		}

	    //data.cards = cards.concat(71, 71);
	    //if (laizi >= 2 && this.isPu_tonghua(cards, laizi - 2, data))
	    //   return true;

		//data.cards.pop();
		//data.cards.pop();

	    return false;
	}

	majiang.isPu_tonghua = function(cards, laizi, data){
	    if (cards.length == 0) {
			// 检测幺九牌，字牌（中、发、白）顶幺九，会（癞子）顶幺九
	        if (!this.checkYaojiupai(data.cards, data.pl, data.tData))
			{
				cc.log("没有幺九牌:" + data.cards);
				return false;
			}

            // 胡牌时必须有刻或杠
            if (data.keziNum <= 0 && !this.checkKezi(data.cards, data.pl))
            {
                cc.log("没有刻或杠:" + data.cards);
                return false;
            }
			
			if (!data.tData.areaSelectMode["piaohu"])
	    	{
				// 排除对对胡
				if (data.sunziNum <= 0 && isDuiDuiHu(data.pl.mjchi, data.cards))
                {
                    cc.log("排除对对胡:" + data.cards);
	                return false;
                }
				
				// 排除单吊胡
		        //if (this.isDanDiaoHu(data.cards, null, null, true))
                //{
                //    cc.log("排除单吊胡:" + data.cards);
		        //	return false;
                //}
	    	}

	        cc.log("可胡牌型：" + data.cards);
			return true;
		}
	    // 若第一张是顺子中的一张
	    for (var first = cards[0] - 2; first <= cards[0]; first++) {
        	if(first % 10 > 7 || (laizi == 0 && first < cards[0]) || cards[0] > 30) {
	            continue;
	        }
	        var shunCount = 0;
	        for (var i = 0; i < 3; i++) {
	            if (cards.indexOf(first + i) >= 0) {
	                shunCount++;
	            }
	       }
	       if (shunCount == 3 || shunCount + laizi >= 3) {
	            var puCards = cards.slice();
	            var puLaizi = laizi;
	            for (var i = 0; i < 3; i++) {
	                var deletePos = puCards.indexOf(first + i);
	                if (deletePos >= 0) {
	                    puCards.splice(deletePos, 1);
	                }
	                else {
	                    puLaizi--;
	                }
                	data.cards.push(first + i);
	            }
                data.sunziNum ++;
	            if (this.isPu_tonghua(puCards, puLaizi, data))
	               return true;
            
	            data.cards.pop();
	            data.cards.pop();
	            data.cards.pop();
				data.sunziNum --;
	       }
	    }
	    // 若第一张是刻子中的一张
	    var keziCount = 1;
	    var keziCard = cards[0];
	    if (cards[1] == keziCard) {
	        keziCount++;
	    }
	    if (cards[2] == keziCard) {
	        keziCount++;
	    }
	    if (keziCount == 3 || keziCount + laizi >= 3) {
	        var puCards = cards.slice();
	        var puLaizi = laizi;
	        for (var i = 0; i < 3; i++) {
	            var deletePos = puCards.indexOf(keziCard);
	            if (deletePos >= 0) {
	               puCards.splice(deletePos, 1);
	            }
	            else {
	               puLaizi--;
	            }
                data.cards.push(keziCard);
	        }
            data.keziNum ++;
	        if (this.isPu_tonghua(puCards, puLaizi, data))
	           return true;

	        data.cards.pop();
	        data.cards.pop();
	        data.cards.pop();
            data.keziNum --;
	    }
	    return false;
	}

	// 检测三门齐
	majiang.checkSanmenqi = function(cards, pl, tData)
	{ 
	    if (tData.areaSelectMode["duanmenhu"])
	        return true;
    
        var cardArray = cards.concat(pl.mjchi, pl.mjpeng, pl.mjgang0, pl.mjgang1);
        for (var i = 0; i < pl.mjTeshuGang0.length; i ++)
        {
            cardArray = cardArray.concat(pl.mjTeshuGang0[i]);
        }
        for (var i = 0; i < pl.mjTeshuGang1.length; i ++)
        {
            cardArray = cardArray.concat(pl.mjTeshuGang1[i]);
        }

	    var men = [false, false, false];
	    for (var i = 0; i < cardArray.length; i ++)
	    {
	        if (cardArray[i] == 200)
	            continue;

	        if (cardArray[i]/10 < 1)
	            men[0] = true;
	        else if (cardArray[i]/10 < 2)
	            men[1] = true;
	        else if (cardArray[i]/10 < 3)
	            men[2] = true;
	    }
	    return (men[0] && men[1] && men[2]);
	}

	/* 检测幺九牌:
	胡牌时必须要有幺或者九牌，也可以专胡幺九（软幺）。风牌（东南西北）字牌（中发白）顶幺九，会（癞子）顶幺九（七对和飘胡不需要幺九）。
	（手牌或者吃碰杠的牌，有一张1或者9或字牌或会即可，最终成牌时必须要有1或者9，如果这时有一个会，但是会变成的牌不是1或者9也不能胡）
	*/
	majiang.checkYaojiupai = function(cards, pl, tData)
	{
	    var cardArray = cards.concat(pl.mjchi, pl.mjpeng, pl.mjgang0, pl.mjgang1);
        for (var i = 0; i < pl.mjTeshuGang0.length; i ++)
        {
            cardArray = cardArray.concat(pl.mjTeshuGang0[i]);
        }
        for (var i = 0; i < pl.mjTeshuGang1.length; i ++)
        {
            cardArray = cardArray.concat(pl.mjTeshuGang1[i]);
        }

	    for (var i = 0; i < cardArray.length; i ++)
	    {
        	var card = cardArray[i];
        	if (card > 30 || card%10 == 1 || card%10 == 9)
                return true;
	    }

	    return false;
	}

	/* 胡牌时必须有刻（明刻暗刻都算）或杠（各种杠都行），一张中发白顶刻（意思是如果没有刻或者杠，但有两张红中、发财和白板也可以胡牌）。
	 （两张中发白指的是一对）七对、飘胡不受此规则限制
	 */
	majiang.checkKezi = function(cards, pl)
	{
	    if (pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length + pl.mjTeshuGang0.length + pl.mjTeshuGang1.length > 0)
	        return true;

        // 只检测中发白对子，手牌刻子这里检测无效，在外面有检测
	    var nums = {};
	    for (var i = 0; i < cards.length; i ++)
	    {
	        if (nums[cards[i]])
	            nums[cards[i]] ++;
	        else
	            nums[cards[i]] = 1;
	    }

	    for (var i in nums)
	    {
	        if ((i == 71 || i == 81 || i == 91) && nums[i] >= 2)
	           return true;
	    }

	    return false;
	}

    // 检测单吊胡，前提参数不能有癞子，通过了canHuLaizi检测
    majiang.isDanDiaoHu = function(cards, cd)
    {
        var _calTingSet = function(oCds, oSet) {
            //先求出所有可能听的牌 set(手牌，顺一位的牌)
            var allSet = {}; 
            var tingSet = oSet || {};
            var cds = oCds.slice();
            if ((oCds.length + 1) % 3 == 0) { // 14、11、8、5、2张牌
                cds = oCds.slice(0, -1);
            }
            for (var i = 0; i < cds.length; i++) {
                var card = cds[i];
                allSet[card] = 1;
                if (card < 29) {
                    if ((card + 1) % 10 > 0)  {
                        allSet[card + 1] = 1;
                    }
                    if ((card - 1) % 10 > 0)  {
                        allSet[card - 1] = 1;
                    }
                }
            }
            //求出能听多少牌
            for(var tingCard in allSet) {
                if (canHuLaizi(cards, Number(tingCard))) { // 此处调用的是公用的canHuLaizi，计算更简单。
                    tingSet[tingCard] = 1;
                }
            }
            return tingSet;
        };

        cards = cards.slice();
        if (!cd)
            cd = cards.pop();

        //if (cards.length <= 1)
        //    return false;

        var set = _calTingSet(cards);
        var keys = Object.keys(set);

        cc.log("isDanDiaoHu: 去掉最后一张牌后可胡的牌 keys, hunCard",keys);
        
        // keys = keys.splice(hunCard,1);

        if (keys.length != 1)
            return false;

        var index = cards.indexOf(Number(keys[0]));
        if (index != -1)
        { 
            cards.splice(index, 1);
            return isPu(cards, 0);
        }
        return false;
    }

    //胡牌判断，基础胡牌逻辑
    majiang.canHu = function(oCards, card, hun)
    {
		cc.log("canHu:oCards=" + oCards + ", card=" + card + ", hun=" + hun);

        var tData = MjClient.data.sData.tData;
        var pl = getUIPlayer(0);

        var cards = this.transformCards(oCards, hun);
        if (card && card == hun)
            card = 200;
			
		var allCards = cards.slice();
    	if (card)
        	allCards.push(card);

		if (tData.areaSelectMode["qidui"])
		{
        	// 七对
        	if (is7Dui(cards, card))
            {
                cc.log("canHu:七对");
            	return true;
            }
		}

		if (tData.areaSelectMode["piaohu"])
		{
	        // 对对胡
	        if (this.isDuiDuiHu(pl.mjchi, allCards))
            {
                cc.log("canHu:对对胡");
	            return true;
            }
		}
        
		// 检测三门齐，必须有条万筒才能胡，会（癞子）不算色。（七对和飘胡不用三门齐）
	    if (!this.checkSanmenqi(allCards, pl, tData))
	    {
	        cc.log("canHu:没有三门齐");
	        return false;
	    }

		 var data = {};
		data.pl = pl;
		data.tData = tData;
		data.cards = [];
		data.sunziNum = 0;
        data.keziNum = 0;
    
	    if (!this.canHuLaizi_tonghua(allCards, null, data))
	        return false;
        
        cc.log("---------------");
        return true;
    };

    majiang.canChi = function(hand, cd,hunCard)
    {
        if (this.getCardCount(hand, hunCard) == (hand.length - 2) )
            return [];

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
            var ttCard1 = cd;
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

    //是否可以暗杠或补杠
    majiang.canGang1 = function(pl, tData)
    {   
        var peng = pl.mjpeng;
        var hand = pl.mjhand;
        var rtn = [];

        // 旋风杠
        // 处理旋风杠
        if (pl.putCount == 0 || tData.areaSelectMode["sanmingsian"] || tData.areaSelectMode["zangang"])
        {
            // 东南西北旋风杠
            if (hand.indexOf(31) != -1 && hand.indexOf(41) != -1 && hand.indexOf(51) != -1 && hand.indexOf(61) != -1)
               rtn.push([31, 41, 51, 61]);

            // 中发白旋风杠
            if (hand.indexOf(71) != -1 && hand.indexOf(81) != -1 && hand.indexOf(91) != -1)
            {
                if (pl.putCount == 0 || tData.areaSelectMode["sanmingsian"])
                    rtn.push([71, 81, 91]);
                
                // 中中发白
                if (this.getCardCount(hand, 71) >= 2)
                    rtn.push([71, 71, 81, 91]);

                // 中发发白
                if (this.getCardCount(hand, 81) >= 2)
                    rtn.push([71, 81, 81, 91]);

                // 中发白白
                if (this.getCardCount(hand, 91) >= 2)
                    rtn.push([71, 81, 91, 91]);
            }
        }

        // 中发白+中/发/白 补杠
        if (tData.areaSelectMode["sanmingsian"])
        {
            for (var i = 0; i < pl.mjTeshuGang1.length; i++)
            {
                var cards = pl.mjTeshuGang1[i];
                if (cards.length == 3 && cards[0] == 71 && cards[1] == 81 && cards[2] == 91)
                {
                    if (hand.indexOf(71) >= 0)
                        rtn.push([71]);

                    if (hand.indexOf(81) >= 0)
                        rtn.push([81]);

                    if (hand.indexOf(91) >= 0)
                        rtn.push([91]);

                    break;
                }
            }
        }

        // 瘸腿杠
        if (tData.areaSelectMode["quetuigang"])
        {
            var shanGunCard = this.getShanGunCard(tData.hunCard);
            if (this.getCardCount(hand, shanGunCard) == 3)
                rtn.push([shanGunCard, shanGunCard, shanGunCard]);
        }

        // 借光杠
        if (tData.areaSelectMode["jieguanggang"])
        {
            var array = [31, 41, 51, 61, 71, 81, 91];
            for (var i = 0; i < array.length; i ++)
            {
                if (this.isJieGuangCard(array[i]) && this.getCardCount(hand, array[i]) == 3)
                {
                    rtn.push([array[i], array[i], array[i]]);
                    break;
                }
            }
        }

        // 补杠
        for (var i = 0; i < peng.length; i++)
        {
            if (hand.indexOf(peng[i]) >= 0)
            {
                rtn.push(peng[i]);
            }
        }

        // 暗杠
        var cnum = {};
        for (var i = 0; i < hand.length; i++)
        {
            var cd = hand[i];
            cnum[cd] ? cnum[cd] ++ : cnum[cd] = 1;
            if(cnum[cd] == 4)
                rtn.push(cd);
        }

        cc.log("canGang1 = " + rtn);
        return rtn;
    };

    // 中发白+中/发/白 补杠
    majiang.sortXuanFengGang = function (gangCards)
    {
        if (gangCards.length != 4)
            return gangCards;

        // 中中发白
        if (gangCards[0] == 71 && gangCards[1] == 71 && gangCards[2] == 81 && gangCards[3] == 91)
        {
            return [81, 71, 91, 71];
        }   // 中发发白
        else if (gangCards[0] == 71 && gangCards[1] == 81 && gangCards[2] == 81 && gangCards[3] == 91)
        {
            return [71, 81, 91, 81];
        }   // 中发白白
        else if (gangCards[0] == 71 && gangCards[1] == 81 && gangCards[2] == 91 && gangCards[3] == 91)
        {
            return [71, 91, 81, 91];
        }
        return gangCards;
    };

    majiang.CardCount = function (pl)
    {
        var rtn = (pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length + pl.mjTeshuGang0.length + pl.mjTeshuGang1.length) * 3 + pl.mjchi.length;

        if(pl.mjhand)
        {
            rtn += pl.mjhand.length;
        }
        return rtn;
    };

    majiang.getCardCount = function(cards, card)
    {
        var ret = 0;
        for (var i = 0; i < cards.length; i ++)
        {
            if (cards[i] == card)
                ret ++;
        }
        return ret;
    };

    majiang.getAllCardsTotal = function ()
    {
        return 136 - 1; // 移除了一张上滚牌
    };

    majiang.setFlowerImg = function (node, pl)
    {
        
    };

    DoTest = function()
    {
    }

    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_tonghua = majiang;
        DoTest();
    }
    else
    {
        module.exports = majiang;
    }
})();
