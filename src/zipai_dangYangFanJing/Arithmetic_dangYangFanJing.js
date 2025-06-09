(function() {
    function DangYangFanJing() {
        this.handCount = 19;   //庄闲各19张

        var menZiList = [];
        for(var i = 0; i < 8; i++){
            for(var j = 1; j < 4; j++){
                menZiList.push([i * 10 + j, i * 10 + j, i * 10 + j]);
            }
            menZiList.push([i * 10 + 1, i * 10 + 2, i * 10 + 3]);
        }
        this.menZiList = menZiList;
    };

    DangYangFanJing.prototype.randomCards = function(areaSelectMode, tData, tb) {
        var cards = [
            1,2,3, 1,2,3, 1,2,3, 1,2,3,                     //上大人
            11,12,13, 11,12,13, 11,12,13, 11,12,13,         //丘乙己
            21,22,23, 21,22,23, 21,22,23, 21,22,23,         //化三千
            31,32,33, 31,32,33, 31,32,33, 31,32,33,         //七十土
            41,42,43, 41,42,43, 41,42,43, 41,42,43,         //尔小生
            51,52,53, 51,52,53, 51,52,53, 51,52,53,         //八九子
            61,62,63, 61,62,63, 61,62,63, 61,62,63,         //佳作人
            71,72,73, 71,72,73, 71,72,73, 71,72,73          //福禄寿
        ];

        shuffleArray(cards);

        return cards;
    };

    DangYangFanJing.prototype.getPlAllCards = function (pl, card) {
        var cards = [];
        for(var i = 0; i < pl.mjchi.length; i++){
            var eatCards = pl.mjchi[i].eatCards;
            cards = cards.concat(eatCards);
        }
        for(var i = 0; i < pl.mjpeng.length; i++){
            cards.push(pl.mjpeng[i], pl.mjpeng[i], pl.mjpeng[i]);
        }
        for(var i = 0; i < pl.mjgang0.length; i++){
            cards.push(pl.mjgang0[i], pl.mjgang0[i], pl.mjgang0[i], pl.mjgang0[i]);
        }

        for(var i = 0; i < pl.mjgang1.length; i++){
            cards.push(pl.mjgang1[i], pl.mjgang1[i], pl.mjgang1[i], pl.mjgang1[i]);
        }
        cards = cards.concat(pl.mjhand);
        if(card){
            cards.push(card);
        }
        return cards;
    };

    DangYangFanJing.prototype.isJingCard = function (tb, card) {
        var tData = tb.tData;
        return (tData.standardJing == card || tData.changedJing == card);
    };

    DangYangFanJing.prototype.getJingCardXi = function (tb, card) {
        if(card == tb.tData.standardJing){
            return tb.tData.areaSelectMode.isShangBaHu ? 8 : 4;
        }else if(card == tb.tData.changedJing){
            return 8;
        }
    };

    DangYangFanJing.prototype.getSortHuxi = function (tb, pl) {
        var huXi = 0;
        for(var i = 0; i < pl.mjchi.length; i++){
            var eatCards = pl.mjchi[i].eatCards;
            for(var j = 0; j < eatCards.length; j++){
                if(this.isJingCard(tb, eatCards[j])){
                    huXi += this.getJingCardXi(tb, eatCards[j]);
                }
            }
        }

        for(var i = 0; i < pl.mjpeng.length; i++){
            if(!this.isJingCard(tb, pl.mjpeng[i])){
                huXi += 2;
            }else{
                huXi += this.getJingCardXi(tb, pl.mjpeng[i]) * 3;
            }
        }
        for(var i = 0; i < pl.mjgang0.length; i++){
            if(!this.isJingCard(tb, pl.mjgang0[i])){
                huXi += 6;
            }else{
                huXi += this.getJingCardXi(tb, pl.mjgang0[i]) * 4;
            }
        }
        for(var i = 0; i < pl.mjgang1.length; i++){
            if(!this.isJingCard(tb, pl.mjgang1[i])){
                huXi += 6;
            }else{
                huXi += this.getJingCardXi(tb, pl.mjgang1[i]) * 4;
            }
        }
        return huXi;
    };

    DangYangFanJing.prototype.getJingInfo = function (tb, pl, card) {
        var cards = this.getPlAllCards(pl, card);
        var info = {standardJing : 0, changedJing : 0, jingXi:0};
        for(var i = 0; i < cards.length; i++){
            if(cards[i] == tb.tData.standardJing){
                info.standardJing++;
                info.jingXi += this.getJingCardXi(tb, cards[i]);
            }else if(cards[i] == tb.tData.changedJing){
                info.changedJing++;
                info.jingXi += this.getJingCardXi(tb, cards[i]);;
            }
        }
        return info;
    };

    DangYangFanJing.prototype.getHandJingInfo = function (tb, pl, card) {
        var cards = [];
        cards = cards.concat(pl.mjhand);
        if(card){
            cards.push(card);
        }
        var info = {standardJing : 0, changedJing : 0, jingXi:0};
        for(var i = 0; i < cards.length; i++){
            if(cards[i] == tb.tData.standardJing){
                info.standardJing++;
                info.jingXi += this.getJingCardXi(tb, cards[i]);
            }else if(cards[i] == tb.tData.changedJing){
                info.changedJing++;
                info.jingXi += this.getJingCardXi(tb, cards[i]);
            }
        }
        return info;
    };

    DangYangFanJing.prototype.canHu = function(tb, pl, card, putType) {
        var huInfo = {canHu : false, matrix : [], huXi : 0};
        var hand = pl.mjhand.slice();
        if(card){
            hand.push(card);
        }
        if(hand.length % 3 != 2){
            return huInfo;
        }
        var hu = function (mjhand, index, matrix, allHuXi) {
            if(mjhand.length == 2){
                if(Math.floor(mjhand[0] / 10) == Math.floor(mjhand[1] / 10) && allHuXi >= tb.tData.minHuxi){
                    huInfo.canHu = true;
                    matrix.push([mjhand[0], mjhand[1]]);
                    console.log(matrix);
                    if(allHuXi > huInfo.huXi){
                        huInfo.matrix = this.convertHuMatrix(matrix, card, putType);
                        huInfo.huXi = allHuXi;
                    }
                }
            }else{
                for(var i = index; i < this.menZiList.length; i++){
                    var row = this.menZiList[i].slice();
                    var curHand = mjhand.slice();
                    var j;
                    for(j = 0; j < row.length; j++){
                        var idx = curHand.indexOf(row[j]);
                        if(idx >= 0){
                            curHand.splice(idx, 1);
                        }else{
                            break;
                        }
                    }
                    if(j == row.length){
                        var curMatrix = matrix.slice();
                        curMatrix.push(row);
                        var curAllHuXi = allHuXi;
                        if(row[0] == row[1] && row[1] == row[2] && !this.isJingCard(tb, row[0])){
                            if(card == row[0] && putType == 0){
                                curAllHuXi += 2;
                            }else{
                                curAllHuXi += 4;
                            }
                        }
                        hu(curHand, i, curMatrix, curAllHuXi);
                    }
                }
            }
        }.bind(this);
        var sortHuxi = this.getSortHuxi(tb, pl);
        var handJingInfo = this.getHandJingInfo(tb, pl, card);
        hu(hand, 0, [], sortHuxi + handJingInfo.jingXi);
        return huInfo;
    };

    DangYangFanJing.prototype.getHandLink = function (tb, pl, putCard) {
        var hand = pl.mjhand.slice();
        if(putCard){
            hand.splice(hand.indexOf(putCard), 1);
        }

        var dict = {};
        for(var i = 0; i < hand.length; i++){
            var c = hand[i];
            dict[c] = dict[c] ? dict[c] + 1 : 1;
        }

        var link = [];
        for(var i = 0; i < 8; i++){
            for(var j = 1; j <= 3; j++){
                if(dict[i * 10 + j] > 0){
                    link.push(i * 10 + 1, i * 10 + 2, i * 10 + 3);
                    break;
                }
            }
        }
        return link;
    };

    DangYangFanJing.prototype.getTingStats = function(tb, pl, putCard){
        if (pl.canNotPutCard && pl.canNotPutCard.indexOf(putCard) >= 0) {
            return {};
        }
        var stats = {};
        for (var uid in tb.players) {
            function add(cd, num) {
                stats[cd] = stats[cd] ? stats[cd] + num : num;
            }

            var p = tb.players[uid];

            for (var i = 0; i < p.mjgang0.length; i++) {
                add(p.mjgang0[i], 4);
            }

            for (var i = 0; i < p.mjgang1.length; i++) {
                add(p.mjgang1[i], 4);
            }

            for (var i = 0; i < p.mjpeng.length; i++) {
                add(p.mjpeng[i], 3);
            }

            for (var i = 0; i < p.mjwei.length; i++) {
                add(p.mjwei[i], 3);
            }

            for (var i = 0; i < p.mjchi.length; i++) {
                var chiRow = p.mjchi[i].eatCards;
                for (var x = 0; x < 3; x++) {
                    add(chiRow[x], 1);
                }

                var biCards = p.mjchi[i].biCards;
                if (biCards) {
                    for (var j = 0; j < biCards.length; j++) {
                        var biRow = biCards[j];
                        for (var x = 0; x < 3; x++) {
                            add(biRow[x], 1);
                        }
                    }
                }
            }

            var tData = tb.tData;
            for (var i = 0; i < p.mjput.length; i++) {
                if (tData.tState == TableState.waitEat) { // 牌在展示阶段
                    if (p.info.uid == tData.uids[tData.curPlayer] && i == p.mjput.length - 1 && p.info.uid != pl.info.uid) {
                        continue;
                    }
                }
                add(p.mjput[i], 1);
            }

            if (p.info.uid == pl.info.uid) {
                for (var i = 0; i < p.mjhand.length; i++) {
                    add(p.mjhand[i], 1);
                }
            }
        }

        var tingStats = {};
        var link = this.getHandLink(tb, pl, putCard);
        var hand = pl.mjhand.slice();
        if(putCard){
            pl.mjhand.splice(pl.mjhand.indexOf(putCard), 1);
        }
        for(var i = 0; i < link.length; i++){
            var card = link[i];
            if(this.canHu(tb, pl, card).canHu){
                var count = 4 - (stats[card] || 0);
                if(count > 0){
                    tingStats[card] = count;
                }
            }
        }
        pl.mjhand = hand;
        return tingStats;
    };

    DangYangFanJing.prototype.getChiList = function(pl, putCard, tb){
        var idx = Math.floor(putCard / 10);
        var row = [idx * 10 + 1, idx * 10 + 2, idx * 10 + 3];
        for(var i = 0; i < row.length; i++){
            if(putCard == row[i]){
                continue;
            }
            if(!(pl.mjhand.indexOf(row[i]) >= 0)){
                return [];
            }
        }
        return row;
    };

    DangYangFanJing.prototype.getLiuCardsInHand = function (pl, tb) {
        var liuCards = [];
        var dict = {};
        for(var i = 0; i < pl.mjhand.length; i++){
            var card = pl.mjhand[i];
            dict[card] = dict[card] ? dict[card] + 1 : 1;
            if(dict[card] == 4){
                liuCards.push(card);
            }
        }
        return liuCards;
    };

    DangYangFanJing.prototype.getHandCardCount = function(pl, card) {
        return this.getCardCount(pl.mjhand, card);
    }

    //支持二维数组
    DangYangFanJing.prototype.getCardCount = function(cards, card) {
        var count = 0;
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].length){
                count += this.getCardCount(cards[i], card);
            }else if (cards[i] == card) {
                count++;
            }
        }
        return count;
    };

    DangYangFanJing.prototype.cardsCount = function(tb) {
        return 96;
    };

    DangYangFanJing.prototype.getRgb = function(pl, card) {
        var rgb = {r:0, g: 0, b: 0};
        var cards = this.getPlAllCards(pl, card);
        for(var i = 0; i < cards.length; i++){
            switch(cards[i] % 10){
                case 1:
                    rgb.r++;
                    break;
                case 2:
                    rgb.g++;
                    break;
                case 3:
                    rgb.b++;
                    break;
                default:
                    break
            }
        }

        return rgb;
    };

    DangYangFanJing.prototype.getMk = function(pl, matrix) {
        var mk = {m:0, k: 0};
        mk.m = pl.mjgang0.length + pl.mjgang1.length;
        for(var i = 0; i < matrix.length; i++){
            if(matrix[i].length == 3 && matrix[i][0] == matrix[i][1] && matrix[i][1] == matrix[i][2]){
                mk.k++;
            }
        }
        return mk;
    };

    DangYangFanJing.prototype.convertHuMatrix = function(matrix, card, putType){
        var handSort = [];
        for(var i = 0; i < matrix.length; i++){
            var cards = matrix[i];
            if(cards.length == 2){
                handSort.push({cards:matrix[i], name : "men"});
            }else if(cards.length == 3){
                var name = "men";
                if(cards[0] == cards[1] && cards[1] == cards[2]){
                    if(cards[0] == card && putType == 0){
                        name = "peng";
                    }else{
                        name = "kan";
                    }
                }
                handSort.push({cards:matrix[i], name : name});
            }
        }
        return handSort;
    };

    DangYangFanJing.prototype.getHuInfo = function(pl, tb, card, putType) {
        var huInfo = this.canHu(tb, pl, card, putType);
        var hzdesc = {};
        var rgb = this.getRgb(pl, card);
        var score = 0;

        score += Math.ceil(Math.min(huInfo.huXi, 50) / 10) - 1;
        hzdesc.huXi = huInfo.huXi + "胡" + score + "分";
        if(rgb.r > 0){
            score += 1;
            hzdesc.daiHong = "带红1分";
        }
        if(tb.tData.areaSelectMode.isMaoKan){
            var mk = this.getMk(pl, huInfo.matrix);

            score += mk.m * 2;
            hzdesc.daiMao = "带毛" + mk.m * 2 + "分";

            score += mk.k * 1;
            hzdesc.daiKan = "带坎" + mk.m * 1 + "分";
        }
        if(tb.tData.areaSelectMode.isHaiDiLao && tb.tData.cardNext >= this.cardsCount(tb) - tb.tData.maxPlayer){
            score += 1;
            hzdesc.haiDiLao = "海底捞1分";
        }

        if(pl.winType = WinType.eatPut){
            hzdesc.dianChong = "点铳";
        }else{
            hzdesc.ziMo = "自摸";
        }

        return {handSort: this.convertHuMatrix(huInfo.matrix, card, putType), totalHuxi: huInfo.huXi, hzdesc: hzdesc, score:score};
    };

    //-----------------前端新增接口start--------------
    /*
        手牌排序
        固定8+1, 1 = 新摸的牌占1列
        param.isLastDraw 最后一张牌是否刚摸上来的
    */
    DangYangFanJing.prototype.sortCard = function(hand, isLastDraw) {
        if (!hand || hand.length <= 0) {
            return [];
        }

        hand = hand.slice();
        var last;
        if (isLastDraw) {
            last = hand.pop();
        }

        hand.sort(function(a, b) {
            return a - b;
        })

        var group = {};
        for (var i = 0; i < 9; i++) {
            group[i] = [];
        }
        for (var i = 0; i < hand.length; i++) {
            var key = Math.floor(hand[i] / 10);
            group[key].push(hand[i]);
        }
        
        if (last) {
            group[8].push(last);
        }

        var matrix = [];
        //列内排序
        for (var k in group) {
            group[k].sort(function(a, b) {
                return a - b;
            })
            matrix.push(group[k]);
        }

        return matrix;
    };

    // 回放时.非自己手牌排序
    DangYangFanJing.prototype.sortCardForOtherReplay = function(hand) {
        if (!hand || hand.length <= 0) {
            return [];
        }

        hand = hand.slice();
        hand.sort(function(a, b) {
            return a - b;
        })

        var group = {};
        for (var i = 0; i < hand.length; i++) {
            var key = Math.floor(hand[i] / 10);
            group[key] = group[key] ? group[key] : [];
            group[key].push(hand[i]);
        }
        
        var matrix = [];
        //列内排序
        for (var k in group) {
            group[k].sort(function(a, b) {
                return a - b;
            })
            matrix.push(group[k]);
        }

        return matrix;
    };

    //删手牌重排序
    DangYangFanJing.prototype.sortByUser = function(arr) {
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

        return this.sortCard(tmpArr);
    }

    //排序.小结算用
    DangYangFanJing.prototype.sortEndCard = function(arr) {
        arr = arr.slice();
        arr.sort(function(a, b) {
            return a - b;
        })
        var group = {};
        for (var i = 0; i < 8; i++) {
            group[i] = [];
        }
        for (var i = 0; i < arr.length; i++) {
            var key = Math.floor(arr[i] / 10);
            group[key].push(arr[i]);
        }

        //获取一列的张数统计
        var getCntDict = function(list) {
            var dict = {};
            for(var i = 0; i < list.length; i++){
                var c = list[i];
                dict[c] = dict[c] ? dict[c] + 1 : 1;
            }
            return dict;
        }

        // 删除
        var delCard = function(src, dst) {
            for (var i = 0; i < dst.length; i++) {
                src.splice(src.indexOf(Number(dst[i])), 1);
            }
        }

        // 提取4/3张
        var calKan = function(dict) {
            for (var t in dict) {
                if (dict[t] >= 3) {
                    var kan = Array.apply(null, {length:dict[t]}).map(()=>Number(t));
                    delCard(group[k], kan);
                    kanList.push(kan);
                }
            }
        }

        // 提取句子
        var calJu = function(list) {
            if (list.length == 0) {
                return;
            }
            var t = Math.floor(list[0] / 10);
            var cards = [t * 10 + 1, t * 10 + 2, t * 10 + 3];
            if (list.indexOf(cards[0]) && list.indexOf(cards[1]) && list.indexOf(cards[2])) {
                juList.push(cards);
                delCard(list, cards);
                calJu(list);
            }
        }

        // 凑散牌.口
        var calKou = function(list) {
            if (list.length <= 3) {
                sanList.push(list);
                return;
            }
            var san = [list[0], list[1], list[2]];
            sanList.push(san);
            delCard(list, san);
            calKou(list);
        }

        var kanList = [];
        var juList = [];
        var sanList = [];

        for (var k in group) {
            //张数统计
            var list = group[k];
            if (list.length == 0) {
                continue;
            }
            var dict = getCntDict(list);
            calKan(dict);
            calJu(group[k]);
        }


        // 剩下的全部算单牌, 每3个凑一列.统一标注为口
        var san = [];
        for (var k in group) {
            san = san.concat(group[k]);
        }
        calKou(san);

        // 4/3排序
        kanList.sort(function(a, b) {
            if (a.length < b.length) {
                return b - a;
            }
            return a[0] - b[0];
        })

        var obj = {kan:kanList, ju:juList, san:sanList};

        // 整理成和后台给赢家手牌数据一样的格式
        var ret = [];
        for (var k in obj) {
            var list = obj[k];
            for (var t = 0; t < list.length; t++) {
                var row = {};
                row.name = k;
                row.cards = list[t];
                ret.push(row);
            }
        }

        return ret;
    }

    DangYangFanJing.prototype.getAllCardsTotal = function() {
        return 96;
    }

    DangYangFanJing.prototype.hintPutCardsToTing = function() {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = sData.players[SelfUid()];
        if (tData.tState != TableState.waitPut || tData.uids[tData.curPlayer] != pl.info.uid) {
            return [];
        }

        var hand = pl.mjhand.slice();

        var dict = {};
        for (var i = 0; i < hand.length; i++) {
            dict[hand[i]] = dict[hand[i]] ? dict[hand[i]] + 1 : 1;
        }

        var putList = [];
        for (var k in dict) {
            var card = Number(k);
            if (pl.canNotPutCard && pl.canNotPutCard.indexOf(card) >= 0) {
                continue;
            }
            var tingList = this.getTingStats(sData, pl, card);
            for(var key in tingList) {
                if (tingList[key] > 0) {
                    putList.push(card);
                    break;   //只要有一个可听的牌，此牌贴角标
                }
            }
        }

        return putList;
    };

    DangYangFanJing.prototype.getTingCards = function(tb, pl, putCard) {
        var tingCards = [];
        var stats = this.getTingStats(tb, pl, putCard);
        for (var k in stats) {
            if (stats[k] > 0) {
                tingCards.push(Number(k));
            }
        }
        return tingCards;
    };
    //-----------------前端新增接口end----------------


    if (typeof(MjClient) != "undefined") {
        MjClient.majiang_dangYangFanJing = new DangYangFanJing();
    } 

    //var hand = [31,33,31,32,61,32,11,52,23,41,63,1,13,33,2,53,21,13,2];
    //var hand = [31,21,31,21,61,21,43,52,13,3,22,1,71,31,12,61,23];
    //var arith = new DangYangFanJing();
    //var ret = arith.sortEndCard(hand);
    //console.log('排序结果=', JSON.stringify(ret));

    /*
    var text = function () {
        var dangYangFanJing = new DangYangFanJing();
        //console.log(dangYangFanJing.menZiList);

        var tb  = {tData : {standardJing : 71, changedJing : 72, minHuxi : 0}};
        var pl = {mjhand :[1, 1, 3, 2, 1], mjchi : [], mjpeng:[/!*11, 12*!/], mjgang0 : [/!*21, 22*!/], mjgang1 : [/!*31*!/]};
        console.log(dangYangFanJing.canHu(tb, pl));
        return;
        pl.mjhand = [];
        var cards = [
            1,2,3, 1,2,3, 1,2,3, 1,2,3,                     //上大人
            11,12,13, 11,12,13, 11,12,13, 11,12,13,         //丘乙己
            21,22,23, 21,22,23, 21,22,23, 21,22,23,         //化三千
            31,32,33, 31,32,33, 31,32,33, 31,32,33,         //七十土
            41,42,43, 41,42,43, 41,42,43, 41,42,43,         //尔小生
            51,52,53, 51,52,53, 51,52,53, 51,52,53,         //八九子
            61,62,63, 61,62,63, 61,62,63, 61,62,63,         //佳作人
            71,72,73, 71,72,73, 71,72,73, 71,72,73          //福禄寿
        ];
        for(var i = 0; i < 1000000; i++){
            var count = 19;//Math.floor(Math.random() * 6) * 3 + 1;

            shuffleArray = function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var randIndex = i + Math.floor(Math.random() * (arr.length - i));
                    var temp = arr[i];
                    arr[i] = arr[randIndex];
                    arr[randIndex] = temp;
                }
                for (var i = 0; i < arr.length; i++) {
                    var randIndex = i + Math.floor(Math.random() * (arr.length - i));
                    var temp = arr[i];
                    arr[i] = arr[randIndex];
                    arr[randIndex] = temp;
                }
                return arr;
            };
            var cardsCopy = shuffleArray(cards.slice());
            pl.mjhand = cardsCopy.slice(0, count);
            var card = cardsCopy[count];
            var info = dangYangFanJing.canHu(tb, pl, card);
            if(info.canHu){
                console.log(pl.mjhand);
                console.log(card);
                console.log(info);
            }

        }
    };
    text();*/
})();

