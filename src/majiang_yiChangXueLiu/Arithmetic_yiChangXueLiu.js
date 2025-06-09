
(function() {
    var majiang = {};
    var allCardsArray = [
         1,  2,  3,  4,  5,  6,  7,  8,  9,
        11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 23, 24, 25, 26, 27, 28, 29
    ];


    //是否可以胡
    majiang.canHu = function(oCards, cd) {
        return this.canHuLaizi(oCards, cd);
    };

    majiang.canHuLaizi = function(oCards, cd) {
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
        if (cd == 200) {
            laizi++;
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

        //单吊癞子时算听牌计算量太大会导致卡顿
        if (laizi >= 1) {
            var cardsCopy = cards.slice();
            cardsCopy.splice(cardsCopy.indexOf(cd), 1);
            if (isPu(cardsCopy, laizi - 1)) {
                return true;
            }
        }

        // 依次删除一对牌做将，其余牌全部成扑则可胡
        for (var i = 0; i < cards.length; i++) {
            if (i > 0 && cards[i] == cards[i - 1]){
                continue; // 和上一次是同样的牌，略过不计算
            }
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

    //听牌函数，判断手牌能否听牌
    majiang.canTing = function (cards) {
        var tingSet = this.calTingSet(cards);
        return Object.keys(tingSet).length > 0;
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
            if (laizi == 0 || !isPu(cards, laizi - 1)) { // 无红中、或者杠后非全听牌
                rtn.splice(i, 1);
            }
        }
    };

    //是否可以杠
    majiang.canGang1 = function(peng, hand) {
        var rtn = [];
        var tData = MjClient.data.sData.tData;
        if(MjClient.playui.checkIsWaitHuanPai() || MjClient.playui.checkIsWaitPuPai()) return [];
        if(majiang.getAllCardsTotal() - tData.cardNext === 0) return [];
        var pl = MjClient.playui.getPlayerInfoByOff();
        //补杠
        for(var i = 0; i < peng.length; i++) {
            if(hand.indexOf(peng[i]) > -1 && (!pl.isTing || this.canGangWhenTing(hand, peng[i], pl))) {
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
            if (num === 4 && (!pl.isTing || this.canGangWhenTing(hand, cd, pl))) {
                rtn.push(cd);
            }

        }
        return rtn;
    };
    

    majiang.canGangWhenTing = function(mjhand, card, pl){
        var hangAfterGang = [];
        for(var i = 0; i < mjhand.length; i++) {
            if(card !== mjhand[i]) {
                hangAfterGang.push(mjhand[i]);
            }
        }
        //若听牌状态下，去掉所杠的牌不能再听则不能杠
        if (!this.canTing(hangAfterGang)) {
            return false;
        }
        //求出之前听的牌
        var tingSet1 = this.calTingSet(mjhand);
        //求出杠之后听的牌
        var tingSet2 = this.calTingSet(hangAfterGang);
        //对比前后听的牌(允许听口缩小)

        for(var tingCard in tingSet2) {
            if (!(tingCard in tingSet1)) {
                return false;
            }
        }
        // 杠后听的牌必须包含所有已经胡过的牌
        var huCards = pl.huCards.slice();
        for(var j = 0; j < huCards.length; j ++){
            if (!(huCards[j] in tingSet2)) {
                return false;
            }
        }

        return true;
    };

    majiang.CardCount = function (pl) {
        var rtn = (pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length) * 3 + pl.mjchi.length;
        if(pl.mjhand) {
            rtn += pl.mjhand.length;
        }
        return rtn;
    };

    majiang.getAllCardsTotal = function () {
        return allCardsArray.length * 4;
    };

    // 有三种花色就是花猪
    majiang.isHuaZhu = function (handCards) {
        var dict = {};
        var player = MjClient.playui.getPlayerInfoByOff();
        if(!player) return false;
        if(!MjClient.playui.isInGame()) return false;
        var handCard = handCards || player.mjhand;
        var cards = [].concat(handCard).concat(player.mjpeng).concat(player.mjgang0).concat(player.mjgang1);
        for(var i = 0; i < cards.length; i++){
            var color = Math.floor(cards[i]/10);
            dict[color] = dict[color] ? dict[color] + 1 : 1;
        }
        return Object.keys(dict).length === 3;
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
        if(this.isHuaZhu(handCards)) return tingSet;
        var cds = handCards.slice();
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

    majiang.getRecommendHuanPaiArr = function (handCards) {
        var analyzeInfo = [
            {type: 0, cards: [], num: 0}, // 条
            {type: 1, cards: [], num: 0}, // 万
            {type: 2, cards: [], num: 0}, // 筒
        ];

        handCards.sort(function (a, b) {
            return a - b;
        });

        for(var i = 0; i < handCards.length; i ++) {
            var cd = handCards[i];
            var ten = Math.floor(cd / 10);
            analyzeInfo[ten].num ++;
            analyzeInfo[ten].cards.push(cd);
        }

        analyzeInfo.sort(function(a, b) {
            return a.num - b.num;
        });

        var cards = [];
        for(var j = 0; j < analyzeInfo.length; j ++) {
            if(analyzeInfo[j].num > 2) {
                cards = analyzeInfo[j].cards.splice(0, 3).slice();
                break;
            }
        }
        return cards;
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

    majiang.isHunCard = function (cd) {
        return false;
    };


    if (typeof(MjClient) != "undefined") {
        MjClient.majiang_yiChangXueLiu = majiang;
    } else {
        module.exports = majiang;
    }
})();
