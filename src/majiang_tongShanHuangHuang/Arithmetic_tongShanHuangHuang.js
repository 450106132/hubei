
(function() {
    var majiang = {};

    majiang.getAllCardsArray = function () {
        return [
            1,  2,  3,  4,  5,  6,  7,  8,  9,
            11, 12, 13, 14, 15, 16, 17, 18, 19,
            21, 22, 23, 24, 25, 26, 27, 28, 29
        ]
    };

    //是否可以胡
    majiang.canHu = function(oCards, cd, hun) {
        var tData = MjClient.data.sData.tData;
        var roomSelect = tData.areaSelectMode;
        var roomIs258Jiang = roomSelect.jiangId === 0;
        var player = MjClient.playui.getPlayerInfoByOff();
        var hands = oCards.slice();
        if(!player) return false;
        if(cd) hands.push(cd);
        hands = this.transformCards(hands, hun);

        // 点炮不能癞子调杠
        if(player.mjhand.length % 3 === 1 && this.isLaiZiDiaojiang(hands)) {
            return false;
        }

        if(is7Dui(hands)) {
            return true;
        }

        if(this.isJiangYiSe(hands, player)) {
            return true;
        }

        if(isDuiDuiHu(player.mjchi, hands) || this.isSameColor(hands, player.mjchi, player.mjpeng, player.mjgang0, player.mjgang1)) {
            return this.canHuLaizi(hands);
        }

        return this.canHuLaizi(hands, 0, roomIs258Jiang);
    };

    majiang.transformCards = function (oCards, hun) {
        if (!hun || hun == -1) return oCards;
        var cards = oCards.slice();
        for (var i = 0; i < cards.length; i++) {
            if (cards[i] === Number(hun)) {
                cards[i] = 200;
            }
        }
        return cards;
    };

    majiang.cardIs258 = function(cd) {
        if(cd === -1) return;
        return [2, 5, 8].indexOf(cd % 10) > -1;
    };

    majiang.isLaiZiDiaojiang = function(oCards) {
        var tData = MjClient.data.sData.tData;
        var cards = this.transformCards(oCards, tData.hunCard);
        if (cards.length % 3 === 2) {
            cards.pop();
        }
        cards.sort(function (a, b) {
            return a - b;
        });
        var lastCard = cards.pop();
        if (!this.isEqualHunCard(lastCard)) {
            return false;
        }
        if (is7Dui(cards.concat([1,1]))) {
            return true;
        }
        var laizi = 0;
        while(cards.length > 0 && this.isEqualHunCard(cards[cards.length - 1])) {
            laizi++;
            cards.pop();
        }
        return isPu(cards, laizi);
    };

    majiang.canHuLaizi = function (oCards, cd, roomIs258Jiang) {
        var cards = [];
        var laizi = 0;
        for (var i = 0; i < oCards.length; i++) {
            if (oCards[i] === 200) {
                laizi++;
            }
            else {
                cards.push(oCards[i]);
            }
        }
        if (cd === 200) {
            laizi ++;
        }
        else if (cd) {
            cards.push(cd);
        }
        if ((cards.length + laizi + 1) % 3 !== 0) {
            return false;
        }
        cards.sort(function(a, b) {
            return a - b;
        });

        // 依次删除一对牌做将，其余牌全部成扑则可胡
        for (var i = 0; i < cards.length; i++) {
            if (i > 0 && cards[i] === cards[i - 1]){
                continue; // 和上一次是同样的牌，略过不计算
            }
            if ((i + 1 < cards.length && cards[i] === cards[i + 1]) || laizi > 0) {
                var jiangCard = cards[i];
                if (roomIs258Jiang && !majiang.cardIs258(jiangCard)) {
                    continue;
                }
                var puCards = cards.slice();
                var puLaizi = laizi;
                puCards.splice(i, 1);
                if (puCards[i] === cards[i]) {
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

    majiang.canTing = function (cards) {
        var tingSet = this.calTingSet(cards);
        return Object.keys(tingSet).length > 0;
    };

    majiang.isJiangYiSe = function(hands, pl) {
        var hand = hands.concat(pl.mjpeng).concat(pl.mjgang0).concat(pl.mjgang1).concat(pl.mjchi);
        for(var i = 0; i < hand.length; i++) {
            var cd = hand[i];
            if(cd === 200) continue;
            if([2, 5, 8].indexOf(cd % 10) < 0) {
                return false;
            }
        }
        return true;
    };

    majiang.isSameColor = function(mjhand, mjpeng, mjgang0, mjgang1, mjchi) {
        var cardList = [mjhand, mjpeng, mjgang0, mjgang1, mjchi];
        var color = -1;
        for(var i = 0; i < cardList.length; i++) {
            var cds = cardList[i];
            for(var j = 0; j < cds.length; j++) {
                var cd = cds[j];
                if(this.isEqualHunCard(cd))
                    continue;

                // 第一次找牌色,找到了就记录,以后按照这个处理
                if(color === -1) {
                    color = Math.floor(cd / 10);
                }
                else if(color !== Math.floor(cd / 10)) {
                    return false;
                }
            }
        }
        return true;
    };


    majiang.gangWhenZimo = function(hand, rtn, hun) {
        for (var i = rtn.length - 1; i >= 0; i--) {
            var cards = [];
            for (var j = 0; j < hand.length; j++) {
                if (hand[j] != rtn[i]) {
                    cards.push(hand[j]);
                }
            }
            cards.sort(function(a,b) {
                return a-b;
            });
            for (var laizi = 0; this.isEqualHunCard(cards[cards.length - 1]); laizi++) {
                cards.pop();
            }
            if (laizi === 0 || !isPu(cards, laizi - 1)) { // 无红中、或者杠后非全听牌
                rtn.splice(i, 1);
            }
        }
    };

    majiang.canChi = function(hand, cd) {
        var num = [0, 0, 0, 0, 0];
        var rtn = [];
        for(var i = 0; i < hand.length; i++) {
            var dif = hand[i] - cd;
            switch (dif) {
                case -2:
                case -1:
                case 1:
                case 2:
                    if(!this.isEqualHunCard(hand[i]) && !this.isEqualHunCard(cd)) {
                        num[dif + 2]++;
                    }
                    break;
            }
        }

        if(num[3] > 0 && num[4] > 0) {
            rtn.push(0);
        }

        if(num[1] > 0 && num[3] > 0) {
            rtn.push(1);
        }

        if(num[0] > 0 && num[1] > 0) {
            rtn.push(2);
        }
        return rtn;
    };


    //是否可以暗杠
    majiang.canGang1 = function(peng, hand) {
        var tData = MjClient.data.sData.tData;
        var hunCard = tData.hunCard;
        var rtn = [];
        //补杠
        for(var i = 0; i < peng.length; i++) {
            if(hand.indexOf(peng[i]) > -1) {
                rtn.push(peng[i]);
            }
        }

        // 暗杠
        var cnum = {};
        for(var j = 0; j < hand.length; j++) {
            var cd = hand[j];
            var num = cnum[cd];
            if (!num) {
                num = 0;
            }
            num++;
            cnum[cd] = num;
            if (num === 4 && cd !== hunCard) {
                rtn.push(cd);
            }

        }
        return rtn;
    };

    majiang.CardCount = function (pl) {
        var rtn = (pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length) * 3 + pl.mjchi.length;
        if(pl.mjhand) {
            rtn += pl.mjhand.length;
        }
        return rtn;
    };

    majiang.getAllCardsTotal = function () {
        return majiang.getAllCardsArray().length * 4 - 1;
    };

    //玩家杠后是否可以胡
    majiang.canHuAfterGang = function(oCards, gangCard, hun){
        var cardArr = [].concat(oCards);
        for(var i = 0;i < cardArr.length;i++){
            if(cardArr[i] === gangCard){
                cardArr.splice(i, 1);
                i--;
            }
        }
        return this.canHu(cardArr, 101, hun);
    };

    majiang.calTingSet = function (handCards, hunCard) {
        var tingSet = {};
        if(cc.isUndefined(handCards)) return tingSet;
        var cds = handCards.slice();
        var allCardsArray = majiang.getAllCardsArray();
        if ((handCards.length + 1) % 3 === 0) {         // 14、11、8、5、2张牌
            cds = handCards.slice(0, -1);
        }
        for (var i = 0; i < allCardsArray.length; i++) {
            if (this.canHu(cds, allCardsArray[i], hunCard)) {
                var count = 0;
                for (var j = 0; j < cds.length; j++) {
                    if (Number(cds[j]) === Number(allCardsArray[i])) {
                        count++;
                    }
                }
                if (hunCard || count < 4) {
                    tingSet[allCardsArray[i]] = 1;
                }
            }
        }
        return tingSet;
    };

    majiang.isSameColorCard = function (cardArr) {
        var dict = {};
        for(var i = 0; i < cardArr.length; i ++) {
            var cd = cardArr[i];
            var ten = Math.floor(cd / 10);
            dict[ten] = dict[ten] ? dict[ten] + 1 : 1;
        }
        return Object.keys(dict).length === 1;
    };

    majiang.isCardFlower = function (cd) {
        return false;
    };

    majiang.isHunCard = function (cd, hun) {
        return cd === Number(hun);
    };

    majiang.isEqualHunCard = function (cd) {
        return cd === 200;
    };

    majiang.analyzeHandCards = function (cards) {
        var dict = {};
        for (var i = 0; i < cards.length; i++) {
            dict[cards[i]] = dict[cards[i]] ? dict[cards[i]] + 1 : 1;
        }
        return dict;
    };

    majiang.isAllHandCardsIsHunCard = function (cards, hun) {
        for (var i = 0; i < cards.length; i++) {
            if(cards[i] !== Number(hun)) {
                return false;
            }
        }
        return true;
    };


    if (typeof(MjClient) != "undefined") {
        MjClient.majiang_tongShanHuangHuang = majiang;
    } else {
        module.exports = majiang;
    }
})();
