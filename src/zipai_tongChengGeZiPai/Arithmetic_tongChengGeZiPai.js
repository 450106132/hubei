// 通城个子牌算法
(function() {
    var TongChengGeZiPai = function() {
        this.handCount = 19;
        this.handColNum = 9;    //固定9列

        /*给牌定义一组有序的key 
            上大人，可知礼，孔乙己，化三千，七十土，八九子，
            三四五、四五六、五六七、六七八、七八九、八九十
        */
        this.orderCards = [
            357, //别杠最上面
            21, 22, 23, 31, 32, 33,        //上大人 可知礼
            41, 42, 43, 51, 3, 52,         //孔乙己  化三千
            7, 10, 61, 8, 9, 71,           //七十土  八九子
            4, 5, 6,                    
            2,  //2不参与构成句子, 放最后
        ];
        this.orderJu = [
            [21, 22, 23],   //上大人
            [31, 32, 33],   // 可知礼
            [41, 42, 43],   //孔乙己
            [51, 3, 52],    //化三千
            [7, 10, 61],    //七十土
            [8, 9, 71],     //八九子
            [3, 4, 5],      //三四五
            [4, 5, 6],      //四五六
            [5, 6, 7],      //五六七
            [6, 7, 8],      //六七八
            [7, 8, 9],      //七八九
            [8, 9, 10],     //八九十
        ];
        this.huaJing = [
            103, 105, 107, 109, 142
        ]
    };

    var menziList = []; // 所有可能牌型组合

    //坎
    for (var i = 2; i <= 10; i++) {
        menziList.push([i, i, i]);
    }
    for(var i = 21; i<= 23; i++) {
        menziList.push([i, i, i], 
                       [i + 10, i + 10, i + 10],
                       [i + 20, i + 20, i + 20]);
    }
    menziList.push([51, 51, 51], [52, 52, 52], [61, 61, 61], [71, 71, 71]);

    //3-10的顺子
    for (var i = 3; i <= 8; i++) {
        menziList.push([i, i + 1, i + 2]);
    }
                    //上大人      可知礼         孔乙己 
    menziList.push([21, 22, 23], [31, 32, 33], [41, 42, 43],
                    //化(三)千   (七十)土     (八九)子
                   [51, 3, 52], [7, 10, 61], [8, 9, 71]);

    TongChengGeZiPai.prototype.randomCards = function(areaSelectMode) {
        var cards = [
            2, 3, 4, 5, 6, 7, 8, 9, 10, //2--10
            2, 3, 4, 5, 6, 7, 8, 9, 10,
            2, 3, 4, 5, 6, 7, 8, 9, 10,
            2, 103, 4, 105, 6, 107, 8, 109, 10, //103 105 107 109 为带花的牌
            2, 103, 4, 105, 6, 107, 8, 109, 10,
            21, 22, 23, //上大人
            21, 22, 23,              
            21, 22, 23,              
            21, 22, 23,
            21, 22, 23,              
            31, 32, 33, //可知礼
            31, 32, 33,              
            31, 32, 33,              
            31, 32, 33,              
            31, 32, 33,              
            41, 42, 43, //孔乙己 142 为带花的乙
            41, 42, 43,              
            41, 42, 43,              
            41, 142, 43,               
            41, 142, 43,              
            51, 52,    //化(三)千 51, 3, 52
            51, 51, 51, 51, 52, 52, 52, 52,
            61, 61, 61, 61, 61, //(七十)土 7, 10, 61
            71, 71, 71, 71, 71  //(八九)子 8, 9, 71
        ];

        shuffleArray(cards);
        return cards;
    };

    TongChengGeZiPai.prototype.excludeChiCards = function(hand, chiCards) {
        for(var i = 0; i < chiCards.length; i++){
            var index = hand.indexOf(chiCards[i]);
            if(index >= 0){
                hand.splice(index, 1);
            }
        }
        return hand;
    };

    TongChengGeZiPai.prototype.excludeGuanCards = function(hand, mjgang1) {
        for(var i = 0; i < mjgang1.length; i++) {
            var gang = mjgang1[i];
            for(var j = 0; j < gang.length; j++) {
                var idx = hand.indexOf(gang[j]);
                if(idx >= 0) {
                    hand.splice(idx, 1);
                }
            }
        }
        return hand;
    };

    TongChengGeZiPai.prototype.getHandCardCount = function(pl, card, hand) {
        if(!hand){
            hand = pl.mjhand.slice();
        }else{
            hand = hand.slice();
        }
        this.excludeChiCards(hand, pl.mjchiCard);
        this.excludeGuanCards(hand, pl.mjgang1);
        return this.getCardCount(hand, card);
    };

    TongChengGeZiPai.prototype.getHandCardCountExcludeChi = function(pl, card, hand) {
        if(!hand){
            hand = pl.mjhand.slice();
        }else{
            hand = hand.slice();
        }
        this.excludeChiCards(hand, pl.mjchiCard);
        return this.getCardCount(hand, card);
    };

    TongChengGeZiPai.prototype.getCardCount = function(hand, card) {
        var count = 0;
        for (var i = 0; i < hand.length; i++) {
            if (hand[i] % 100 == card % 100) {
                count++;
            }
        }
        return count;
    };

    TongChengGeZiPai.prototype.getMjgangDict = function(mjgang) {
        var dict = {};
        for(var i = 0; i < mjgang.length; i++){
            var c = mjgang[i][0] % 100;
            dict[c] = dict[c] ? dict[c] + 1 : 1;
        }
        //console.log("getMjgangDict" + " mjgang = " + JSON.stringify(mjgang) + " dict = " + JSON.stringify(dict));
        return dict;
    };

    //优先找花牌再普通牌
    TongChengGeZiPai.prototype.delHandCard = function(hand, card) {
        var index = hand.indexOf(card % 100 + 100);
        if(index >= 0){
            return hand.splice(index, 1)[0];
        }
        index = hand.indexOf(card % 100);
        if(index >= 0){
            return hand.splice(index, 1)[0];
        }
        return null;
    };

    TongChengGeZiPai.prototype.delMjsort = function(mjsort, name, idx, isUpdata) {
        var pos = -1;
        for(var i = mjsort.length - 1; i >= 0; i--) {
            var obj = mjsort[i];
            if(obj.name == name && obj.pos == idx) {
                mjsort.splice(i, 1);
                pos = i;
            }else if (isUpdata && obj.name == name && obj.pos > idx) {
                mjsort[i].pos--;
            }
        }
        return pos;
    };

    TongChengGeZiPai.prototype.delHandCards = function (hand, cards) {
        for(var i = 0; i < cards.length; i++){
            var index = hand.indexOf(cards[i]);
            if(index >= 0){
                hand.splice(index, 1);
            }else{
                logger.debug("delHandCard error", + " hand = " + hand + " cards = " + cards);
            }
        }
    }

    TongChengGeZiPai.prototype.getHandCardsByNum = function(pl, card, num, hand) {
        if(!hand){
            hand = pl.mjhand.slice();
        }
        this.excludeChiCards(hand, pl.mjchiCard);

        var hua = card % 100 + 100;
        var list = [];
        var huaList = [];
        for(var i = 0; i < hand.length; i++) {
            var c = hand[i];
            if(c == hua){
                huaList.push(c);
            }
            else if(c == card % 100){
                list.push(c);
            }
        }
        
        list = huaList.concat(list);

        var cards = list.splice(0, num);
        if(cards.length < num) {
            console.log("getHandCardsByNum error", + " hand = " + hand + " card = " + card + " num = " + num);
        }

        return cards;
    };

    TongChengGeZiPai.prototype.isRed = function(card) {
        return [21, 22, 23, 31, 32, 33, 3, 5, 7, 103, 105, 107].indexOf(card) >= 0;
    };

    TongChengGeZiPai.prototype.isSuJing = function(card) {
        return [42, 3, 5, 7, 9].indexOf(card) >= 0;
    };

    TongChengGeZiPai.prototype.isHuaJing = function(card) {
        return [142, 103, 105, 107, 109].indexOf(card) >= 0;
    };

    TongChengGeZiPai.prototype.isJingCard = function(card) {
        return this.isSuJing(card) || this.isHuaJing(card);
    };

    TongChengGeZiPai.prototype.getJingScoreInCards = function (cards) {
        var jingScore = 0;
        for(var j = 0; j < cards.length; j++) {
            var c = cards[j];
            if(this.isHuaJing(c)){
                jingScore += this.isRed(c) ? 2 : 1;
            }else if(this.isSuJing(c)){
                jingScore += this.isRed(c) ? 1 : 0;
            }
        }
        return jingScore;
    };

    TongChengGeZiPai.prototype.getMenScore = function(cards) {
        var score = 0;
        if(cards.toString() == [21, 22, 23].toString() || cards.toString() == [31, 32, 33].toString()) {
            score += 1;
        }
        return score + this.getJingScoreInCards(cards);
    };

    TongChengGeZiPai.prototype.getPengScore = function(cards) {
        return (this.isRed(cards[0]) ? 1 : 0) + this.getJingScoreInCards(cards);
    };

    TongChengGeZiPai.prototype.getKanScore = function(cards) {
        return (this.isRed(cards[0]) ? 3 : 1) + this.getJingScoreInCards(cards);
    };

    TongChengGeZiPai.prototype.getZhaoScore = function(cards) {
        return (this.isRed(cards[0]) ? 4 : 2) + this.getJingScoreInCards(cards);
    };

    TongChengGeZiPai.prototype.getHuaScore = function(cards) {
        return (this.isRed(cards[0]) ? 5 : 3) + this.getJingScoreInCards(cards);
    };

    TongChengGeZiPai.prototype.getLiuCardsInHand = function (pl, tb) {
        var hand = pl.mjhand.slice();
        this.excludeChiCards(hand, pl.mjchiCard);

        var mjgang1Dict = this.getMjgangDict(pl.mjgang1);

        var liuCards = {"guan":[], "zhao":[], "hua":[]};
        var dict = {};
        for(var i = 0; i < hand.length; i++) {
            var c = hand[i] % 100;
            dict[c] = dict[c] ? dict[c] + 1 : 1;
        }
        for(var c in dict){
            if (dict[c] == 5 && pl.brokenGuan.indexOf(c) < 0) {//先观再滑
                if (!mjgang1Dict[c]) {
                    liuCards["guan"].push(c);
                } else {
                    liuCards["hua"].push(c);
                }
            }
            if (dict[c] == 4 && !mjgang1Dict[c] && pl.brokenGuan.indexOf(c) < 0) {
                liuCards["guan"].push(c);
            }
        }
        return liuCards;
    };

    TongChengGeZiPai.prototype.getAchv = function(tb, pl, matrix, card, putType) {
        var score = 0;
        var desc = {};
        for(var i = 0; i < matrix.length; i++) {
            var arr = matrix[i];
            if(arr.length == 4){
                score += this.getZhaoScore(arr);
            }else if(arr[0] % 100 == arr[1] % 100 && arr[1] % 100 == arr[2] % 100) {
                //坎
                if(arr[0] % 100 == card % 100 && putType === 0) {
                    score += this.getPengScore(arr);
                }else {
                    score += this.getKanScore(arr);
                }
            }else {
                //句子 两张
                score += this.getMenScore(arr);
            }
        }
        for(var i = 0; i < pl.mjpeng.length; i++) {
            var arr = pl.mjpeng[i];
            score += this.getPengScore(arr);
        }
        for(var i = 0; i < pl.mjgang0.length; i++) {
            var arr = pl.mjgang0[i];
            score += arr.length == 4 ? this.getZhaoScore(arr) : this.getHuaScore(arr);
        }
        for(var i = 0; i < pl.mjgang1.length; i++) {
            var arr = pl.mjgang1[i];
            score += this.getZhaoScore(arr);
        }
        return {score: score, desc: desc};
    };

    TongChengGeZiPai.prototype.canDepend = function (c1, c2) {
        var len = menziList.length;
        for(var i = 0; i < len; i++) {
            var menzi = menziList[i];
            if(menzi.indexOf(c1 % 100) >= 0 && menzi.indexOf(c2 % 100) >= 0) {
                return true;
            }
        }
        return false;
    };

    TongChengGeZiPai.prototype.canHu = function(tb, pl, card, putType) {
        var tData = tb.tData;

        var hand = pl.mjhand.slice();

        this.excludeGuanCards(hand, pl.mjgang1);

        if(card){
            hand.push(card);
        }

        var hu = function(hand, idx, matrix) {
            var list = menziList;
            if (hand.length == 2) {
                if(this.canDepend(hand[0], hand[1])) {
                    matrix.push([hand[0], hand[1]]);
                    if (this.getAchv(tb, pl, matrix, card, putType).score >= tData.minHuxi) {
                        return true;
                    }
                }
                return false;
            }else {
                for (var i = idx; i < list.length; i++) {
                    var menzi = list[i];
                    var copy = hand.slice();
                    var flag = true;
                    var row = [];
                    for (var j = 0; j < menzi.length; j++) {
                        var cd = menzi[j];
                        var idx = copy.indexOf(cd);
                        if (idx >= 0) {
                            copy.splice(idx, 1);
                            row.push(cd);
                        } else {
                            var idx1 = copy.indexOf(cd % 100 + 100);
                            if(idx1 >= 0){
                                copy.splice(idx1, 1);
                                row.push(cd % 100 + 100);
                            }else {
                                flag = false;
                                break;
                            }
                        }
                    }
                    //捡的牌不能当坎或者对
                    if(row[0] == menzi[1] && menzi[1] == menzi[2] && this.getHandCardCountExcludeChi(pl, row[0], hand) < 3){
                        flag = false;
                    }
                    if (flag) {
                        var hand_copy = hand.slice();
                        var matrix_copy = matrix.slice();

                        matrix_copy.push(row);
                        for (var j = 0; j < row.length; j++) {
                            var cd = row[j];
                            hand_copy.splice(hand_copy.indexOf(cd), 1);
                        }

                        if (hu(hand_copy, i, matrix_copy)) {
                            return true;
                        }
                    }
                }
                return false;
            }
        }.bind(this);
        var huHand = function (hand, matrixHold) {
            var dict = {};
            for(var i = 0; i < hand.length; i++){
                var c = hand[i] % 100;
                dict[c] = dict[c] ? dict[c] + 1 : 1;
            }
            for(var i in dict){
                if(dict[i] >= 3 && this.getHandCardCountExcludeChi(pl, Number(i), hand) >= 3){//捡的牌不能当坎或者对
                    var row = [];
                    for(var j = 0; j < 3; j++){
                        var index = hand.indexOf(Number(i));
                        if(index >= 0){
                            row = row.concat(hand.splice(index, 1));
                        }else{
                            index = hand.indexOf(Number(i) + 100);
                            row = row.concat(hand.splice(index, 1));
                        }
                    }
                    matrixHold.push(row);
                }

            }
            return hu(hand, 0, matrixHold);
        }.bind(this);

        if(hand.length % 3 != 2){
            if((hand.length - 4) % 3 != 2){
                return false;
            }
            var dict = {};
            for(var i = 0; i < hand.length; i++){
                var c = hand[i] % 100;
                dict[c] = dict[c] ? dict[c] + 1 : 1;
            }
            for(var i in dict){
                if(dict[i] >= 4 && this.getHandCardCount(pl, Number(i), hand) >= 4){
                    var hand_copy = hand.slice();
                    var cards = this.getHandCardsByNum(pl, Number(i), 4, hand_copy);
                    this.delHandCards(hand_copy, cards);
                    if(huHand(hand_copy, [cards])){
                        return true;
                    }
                }
            }
            return false;
        }else{
            return huHand(hand, []);
        }
    };

    TongChengGeZiPai.prototype.getJingDict = function (tb, pl, card) {
        var cards = [];
        for(var i = 0; i < pl.mjpeng.length; i++){
            cards = cards.concat(pl.mjpeng[i]);
        }
        for(var i = 0; i < pl.mjgang0.length; i++){
            cards = cards.concat(pl.mjgang0[i]);
        }
        cards = cards.concat(pl.mjhand);
        if(card){
            cards.push(card);
        }

        var jingDict = {huaCount : 0, dict:{}, score : 0};
        for(var i = 0; i < cards.length; i++){
            if(this.isHuaJing(cards[i])){
                jingDict.huaCount++;
                jingDict.dict[cards[i]] = jingDict.dict[cards[i]] ? jingDict.dict[cards[i]] + 1 : 1;
            }
        }
        if(jingDict.huaCount > 0){
            jingDict.score =  tb.tData.areaSelectMode.huaType == 0 ? jingDict.huaCount : 1;
        }
        return jingDict;
    }

    TongChengGeZiPai.prototype.getHuInfo = function(tb, pl, card, putType) {
        var hand = pl.mjhand.slice();

        this.excludeGuanCards(hand, pl.mjgang1);

        if(card) {
            hand.push(card);
        }

        var maxHuInfo = {
            score: 0,
            handSort: [],
            matrix: [],
            hzdesc:{},
        }

        var hu = function(hand, idx, matrix) {
            var list = menziList;
            if (hand.length == 2) {
                var matrix_copy = matrix.slice();
                if(this.canDepend(hand[0], hand[1])) {
                    matrix_copy.push([hand[0], hand[1]]);
                    var achv = this.getAchv(tb, pl, matrix_copy, card, putType);
                    var score = achv.score;
                    if (score > maxHuInfo.score) {
                        maxHuInfo.score = score;
                        maxHuInfo.matrix = matrix_copy;
                        maxHuInfo.hzdesc = achv.desc;
                    }
                }
            }else {
                for (var i = idx; i < list.length; i++) {
                    var menzi = list[i];
                    var copy = hand.slice();
                    var flag = true;
                    var row = [];
                    for (var j = 0; j < menzi.length; j++) {
                        var cd = menzi[j];
                        var idx = copy.indexOf(cd);
                        if (idx >= 0) {
                            copy.splice(idx, 1);
                            row.push(cd);
                        } else {
                            var idx1 = copy.indexOf(cd % 100 + 100);
                            if(idx1 >= 0){
                                copy.splice(idx1, 1);
                                row.push(cd % 100 + 100);
                            }else {
                                flag = false;
                                break;
                            }
                        }
                    }
                    //捡的牌不能当坎或者对
                    if(row[0] == menzi[1] && menzi[1] == menzi[2] && this.getHandCardCountExcludeChi(pl, row[0], hand) < 3){
                        flag = false;
                    }
                    if (flag) {
                        var hand_copy = hand.slice();
                        var matrix_copy = matrix.slice();
                        matrix_copy.push(row);
                        for (var j = 0; j < row.length; j++) {
                            var cd = row[j];
                            hand_copy.splice(hand_copy.indexOf(cd), 1);
                        }

                        hu(hand_copy, i, matrix_copy);
                    }
                }
            }
        }.bind(this);
        var huHand = function (hand, matrixHold) {
            var dict = {};
            for(var i = 0; i < hand.length; i++){
                var c = hand[i] % 100;
                dict[c] = dict[c] ? dict[c] + 1 : 1;
            }
            for(var i in dict){
                if(dict[i] >= 3 && this.getHandCardCountExcludeChi(pl, Number(i), hand) >= 3){
                    var row = [];
                    for(var j = 0; j < 3; j++){
                        var index = hand.indexOf(Number(i));
                        if(index >= 0){
                            row = row.concat(hand.splice(index, 1));
                        }else{
                            index = hand.indexOf(Number(i) + 100);
                            row = row.concat(hand.splice(index, 1));
                        }
                    }
                    matrixHold.push(row);
                }

            }

            hu(hand, 0, matrixHold); // 构成胡牌组合胡
        }.bind(this);

        if(hand.length % 3 != 2){
            if((hand.length - 4) % 3 != 2){
                return maxHuInfo;
            }
            var dict = {};
            for(var i = 0; i < hand.length; i++){
                var c = hand[i] % 100;
                dict[c] = dict[c] ? dict[c] + 1 : 1;
            }
            for(var i in dict){
                if(dict[i] >= 4 && this.getHandCardCount(pl, Number(i), hand) >= 4){
                    var hand_copy = hand.slice();
                    var cards = this.getHandCardsByNum(pl, Number(i), 4, hand_copy);
                    this.delHandCards(hand_copy, cards);
                    huHand(hand_copy, [cards])
                }
            }
        }else{
            huHand(hand, [])
        }

        var handSort = [];
        var matrix = JSON.parse(JSON.stringify(maxHuInfo.matrix));
        for(var i = 0; i < matrix.length; i++){
            var cards = matrix[i];
            if(cards.length == 2){
                handSort.push({cards:matrix[i], name : "kou"});
            }else if(cards.length == 3){
                var name = "ju";
                if(cards[0] % 100 == cards[1] % 100 && cards[1] % 100 == cards[2] % 100){
                    if(cards[0] % 100 == card % 100 && tb.tData.putType === 0){
                        name = "dui";
                    }else{
                        name = "kan";
                    }
                }
                handSort.push({cards:matrix[i], name : name});
            }else if(cards.length == 4){
                var name = "guan";
                if(cards[0] % 100 == card % 100 && tb.tData.putType === 0){
                    name = "zhao";
                }
                handSort.push({cards:matrix[i], name : name});
            }
        }
        maxHuInfo.handSort = handSort;
        delete maxHuInfo.matrix;
        maxHuInfo.totalHuxi = maxHuInfo.score;
        maxHuInfo.hzdesc.jingDict = this.getJingDict(tb, pl, card);
        maxHuInfo.score = Math.max(1, Math.floor(maxHuInfo.score / 10)) + maxHuInfo.hzdesc.jingDict.score;

        return maxHuInfo;
    };

    TongChengGeZiPai.prototype.cardsCount = function(tb) {
        return 110;
    };

    TongChengGeZiPai.prototype.getHandLink = function (tb, pl, putCard) {
        var hand = pl.mjhand.slice();

        if(putCard){
            hand.splice(hand.indexOf(putCard), 1);
        }

        var dict = {};
        for(var i = 0; i < hand.length; i++){
            var c = hand[i] % 100;
            dict[c] = dict[c] ? dict[c] + 1 : 1;
        }

        var link = [357];
        for(var i = 0; i < menziList.length; i ++) {
            var menzi = menziList[i];
            for(var j = 0; j < menzi.length; j++) {
                if(dict[menzi[j] % 100] > 0 && dict[menzi[j] % 100] < 3){
                    for(var k = 0; k < menzi.length; k++) {
                        if(link.indexOf(menzi[k] % 100) < 0) {
                            link.push(menzi[k] % 100);
                        }
                    }
                    break;
                }
            }
        }
        // console.log(link);
        return link;
    };

    TongChengGeZiPai.prototype.getTingStats = function(tb, pl, putCard){
        if (pl.canNotPutCard && pl.canNotPutCard.indexOf(putCard) >= 0) {
            return {};
        }
        var stats = {};
        var add = function (c, num) {
            stats[c] = stats[c] ? stats[c] + num : num;
        }

        for (var uid in tb.players) {
            var p = tb.players[uid];
            for (var i = 0; i < p.mjgang0.length; i++) {
                add(p.mjgang0[i][0], p.mjgang0[i].length);
            }

            /*for (var i = 0; i < p.mjgang1.length; i++) {
                add(p.mjgang1[i][0], p.mjgang1[i].length);
            }*/

            for (var i = 0; i < p.mjpeng.length; i++) {
                add(p.mjpeng[i][0], p.mjpeng[i].length);
            }

            var tData = tb.tData;
            for (var i = 0; i < p.mjput.length; i++) {
                if (tData.tState == TableState.waitEat) {
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
            if(this.canHu(tb, pl, card)){
                var allNum = 5;
                var count = allNum - (stats[card] || 0);
                if(count > 0){
                    tingStats[card] = count;
                }
            }
        }
        pl.mjhand = hand;
        return tingStats;
    };

    //-----------------前端新增接口start--------------
    //乙，三，无，七，九等价处理
    TongChengGeZiPai.prototype.replaceHuaJing = function(arr) {
        var hua = [142, 103, 105, 107, 109];
        var replaces = []; //返回替换了哪些牌
        for (var i = 0; i < arr.length; i++) {
            if(hua.indexOf(arr[i]) >= 0) {
                replaces.push(arr[i]);
                arr[i] -= 100;
            }
        }
        return replaces;
    };

    /*
        5/4/3张优先

        剩下按句子顺序按对子散牌排
        1.一组句存在1对+2单 或者 2对+1单 单独成列    ex.上上大人 或 上上大大人
        2.一组句存在2对或3对 单独成列                ex.上上大大 或 上上大大人人
        
        上面两种不成立的情况: 
        3.一句话中的单牌分离出去放后面按散牌排       ex.上上人 保留对子上上  单牌人放后面按散牌排
        4.连续两组句存在情况3则两组句的对子放一起    ex.上上人 可可知 排成 上上可可 人知放后面按散牌排 
        5.特殊.A组上上 B组可知礼满足1,2可单独成列 A组按顺序找出同样的对组列
          ex.上上孔孔 可可知礼    这里孔乙己同上大人的情况一样只有孔孔一对
             如果找不到对子和上上组对，则上上 或 上上人单独成列，这种情况一定可以摆的下所有牌

        单牌.
        按句子顺序找最近的4~6张
            ex.上大人可知礼  上大可知礼  上可知礼  上可孔化...
        
        别杠.
        默认放第8列单独成列, 如第8列有其它牌, 别杠放最上

        进牌.
        第9列
    */
    TongChengGeZiPai.prototype.sortCard = function(hand, mjgang1, isLastDraw) {
        if (!hand || hand.length <= 0 || !mjgang1) {
            return [];
        }

        //console.log('排序数量', hand.length, hand);
        hand = hand.slice();
        mjgang1 = mjgang1.slice();

        //1.弹出最后一张
        var last;
        if (isLastDraw) {
            last = hand.pop();
        }

        function delCards(src, dst) {
            for (var i = 0; i < dst.length; i++) {
                src.splice(src.indexOf(dst[i]), 1);
            }
        }

        //扎牌特殊处理
        if (mjgang1.length > 0) {
            for (var i = 0; i < mjgang1.length; i++) {
                delCards(hand, mjgang1[i]);
            }
        }

        //2.提取别杠
        var maxKingCnt = MjClient.data.sData.tData.areaSelectMode.bieGangNum;
        //var maxKingCnt = 1;  //test
        var king = [];
        for (var i = 0; i < maxKingCnt; i++) {
            var kIdx = hand.indexOf(this.KING);
            if (kIdx >= 0) {
                king.push(this.KING);
                hand.splice(kIdx, 1);
            } else {
                break;
            }
        }

        //3.花精牌等价处理
        var huaJing = this.replaceHuaJing(hand);

        var order = this.orderCards;
        var sortRow = function(list) {
            list.sort(function(a, b) {
                return order.indexOf(a) - order.indexOf(b);
            })
        }

        sortRow(hand);
        //4.排序
        var kanList = [];   //坎
        var duiList = [];   //对
        var sanList = [];   //散
        var dict = {};
        for(var i = 0; i < hand.length; i++){
            var c = hand[i];
            dict[c] = dict[c] ? dict[c] + 1 : 1;
        }

        //a.提取5/4/3张
        function calKan(cnt) {
            cnt = cnt || 5;
            for (var k in dict) {
                if (dict[k] == cnt) {
                    var kan = Array.apply(null, {length:dict[k]}).map(()=>Number(k));
                    kanList.push(kan);
                    delCards(hand, kan);
                }
            }
            if (cnt > 3) {
                calKan(--cnt);
            }
        }
        calKan();
        //排序
        kanList.sort(function(a, b) {
            if (a.length == b.length) {
                return order.indexOf(a) - order.indexOf(b);
            }
            return b.length - a.length;
        })

        //b.提取有对子的列
        var dui = [];
        for (var k in dict) {
            var cd = Number(k);
            if (dict[k] == 2 && cd != 2) { //一对2按单牌处理
                dui.push(cd); 
                delCards(hand, [cd, cd]);
            }
        }
        sortRow(dui);
        
        function searchDan(dan) {
            var ret = [];
            for (var i = 0; i < dan.length; i++) {
                if (hand.indexOf(dan[i]) >= 0) {
                    ret.push(dan[i]);
                }
            }
            return ret;
        }

        // 能成列句子
        for (var i = 0; i < this.orderJu.length; i++) {
            var temp = [];
            var ju = this.orderJu[i];
            var dan = ju.slice();
            if (dui.indexOf(ju[0]) >= 0) {
                temp.push(ju[0]);
                dan.splice(dan.indexOf(ju[0]), 1);
            }
            if (dui.indexOf(ju[1]) >= 0) {
                temp.push(ju[1]);
                dan.splice(dan.indexOf(ju[1]), 1);
            }
            if (dui.indexOf(ju[2]) >= 0) {
                temp.push(ju[2]);
                dan.splice(dan.indexOf(ju[2]), 1);
            }

            if (temp.length == 0) {
                continue;
            } else if (temp.length == 1) {
                //计算该句中的单牌
                var ret = searchDan(dan);
                if (ret.length >= 2) {
                    //单独成列
                    var row = [temp[0], temp[0]].concat(ret);
                    sortRow(row);
                    duiList.push(row);
                    delCards(hand, ret);
                    delCards(dui, temp);
                }
            } else if (temp.length == 2) {
                //成列
                var ret = searchDan(dan);
                var row = [temp[0], temp[0], temp[1], temp[1]].concat(ret); //保持有序
                sortRow(row);
                duiList.push(row);
                delCards(hand, ret);
                delCards(dui, temp);
            } else if (temp.length == 3) {
                //成列
                var row = [temp[0], temp[0], temp[1], temp[1], temp[2], temp[2]]; //保持有序
                duiList.push(row);
                delCards(dui, temp);
            }
        }

        //剩下的对子按顺序两两组合成列
        function calDuiRow() {
            if (dui.length == 0) {
                return;
            } else if (dui.length == 1) {
                duiList.push([dui[0], dui[0]]); //此时的一对单独成列
                dui = [];
                return;
            } else {
                duiList.push([dui[0], dui[0], dui[1], dui[1]]);
                dui.splice(0, 2);
            }
            calDuiRow();
        }
        calDuiRow();

        //c.剩下散牌分列
        var temp = [];
        for (var i = 0; i < this.orderJu.length; i++) {
            var ju = this.orderJu[i];
            var dan = [];
            if (hand.indexOf(ju[0]) >= 0) {
                dan.push(ju[0]);
            }
            if (hand.indexOf(ju[1]) >= 0) {
                dan.push(ju[1]);
            }
            if (hand.indexOf(ju[2]) >= 0) {
                dan.push(ju[2])
            }
            temp = temp.concat(dan);       
            delCards(hand, dan);
            if (temp.length >= 4) {
                sanList.push(temp);
                temp = [];
            }
        }
        temp = temp.concat(hand); //剩下的单和hand中剩下的2组列
        if (temp.length > 0) {
            sanList.push(temp);
        }

        //矩阵
        var matrix = [].concat(kanList).concat(duiList).concat(sanList);

        //5.花精牌还原
        for (var i = 0; i < huaJing.length; i++) {
            for (var j = 0; j < matrix.length; j++) {
                var idx = matrix[j].indexOf(huaJing[i] - 100);
                if (idx >= 0) {
                    matrix[j].splice(idx, 1, huaJing[i]);
                    break;
                }
            }
        }

        //越是后面扎的越放在左边
        for (var i = 0; i < mjgang1.length; i++) {
            matrix.unshift(mjgang1[i].slice());
        }
        matrix = [].concat(matrix);

        //补充空列
        var len = matrix.length;
        for (var i = len; i < this.handColNum; i++) {
            matrix.push([]);
        }
        matrix[7] = matrix[7].concat(king);
        if (last) {
            matrix[8].push(last);
        }

        //test
        /*
        var num = 0;
        for (var i = 0; i < matrix.length; i++) {
            num += matrix[i].length;
        }
        console.log('排序后总数=', num, JSON.stringify(matrix), JSON.stringify(mjgang1));
        */
        return matrix;
    };

    // 回放时.非自己手牌排序
    TongChengGeZiPai.prototype.sortCardForOtherReplay = function(hand, mjgang1) {
        mjgang1 = mjgang1 || [];
        var matrix = this.sortCard(hand, mjgang1);
        var ret = [];
        //剔除空列
        for (var i = 0; i < matrix.length; i++) {
            if (matrix.length > 0) {
                ret.push(matrix[i]);
            }
        }
        return ret;
    };

    //删手牌重排序
    TongChengGeZiPai.prototype.sortByUser = function(arr) {
        return [];
    }

    //排序.小结算用
    TongChengGeZiPai.prototype.sortEndCard = function(arr, mjgang1) {
        if (!arr || !mjgang1)
            return [];
        arr = arr.slice();
        //非赢家手牌中的扎牌不能重复计算显示
        for (var i = 0;i < mjgang1.length; i++) {
            for (var j = 0; j < mjgang1[i].length; j++) {
                var idx = arr.indexOf(mjgang1[i][j]);
                if (idx >= 0) {
                    arr.splice(idx, 1);
                }
            }
        }
        var matrix = this.sortCard(arr, []);
        var order = this.orderJu;
        // 整理成和后台给赢家手牌数据一样的格式 
        var isZha = function(idx) {
            return idx < mjgang1.length;
        }

        var isKan = function(list) {
            if (list.length < 3)
                return false;
            var card = list[0];
            for (var i = 0; i < list.length; i++) {
                if (list[i] != card) {
                    return false;
                }
            }
            return true;
        }

        var isJu = function(list) {
            if (list.length != 3)
                return false;
            list.sort(function(a, b) {
                return a - b;
            })
            for (var i = 0; i < order.length; i++) {
                var val0 = Math.abs(list[0] - order[i][0]);
                var val1 = Math.abs(list[1] - order[i][1]);
                var val2 = Math.abs(list[2] - order[i][2]);
                if ((val0 == 0 || val0 == 100) &&
                    (val1 == 0 || val1 == 100) &&
                    (val2 == 0 || val2 == 100)) {
                    return true;
                }
            }
            return false;
        }

        var ret = [];
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[i].length == 0)
                continue;
            var row = {name:'dan'};
            if (isZha(i)) {
                row.name = 'zha';
            } else if (isKan(matrix[i])) {
                row.name = 'kan';
            } else if (isJu(matrix[i])) {
                row.name = 'ju';
            }
            row.cards = matrix[i];
            ret.push(row);
        }

        return ret;
    }

    //一列手牌的排序
    TongChengGeZiPai.prototype.sortRowCards = function(arr) {
        if (!arr || arr.length == 0) 
            return arr;

        var order = this.orderCards;
        var huaJing = this.replaceHuaJing(arr);
        arr.sort(function(a, b) {
            return order.indexOf(a) - order.indexOf(b);
        })
        for (var i = 0; i < huaJing.length; i++) {
            var idx = arr.indexOf(huaJing[i] - 100);
            if (idx >= 0) {
                arr[idx] = huaJing[i];
            }
        }
        return arr;
    }

    //给牌定义一组有序的key
    TongChengGeZiPai.prototype.orderCards = [

    ];

    TongChengGeZiPai.prototype.getAllCardsTotal = function() {
        return 110;
    }

    TongChengGeZiPai.prototype.hintPutCardsToTing = function() {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = sData.players[SelfUid()];
        if (tData.tState != TableState.waitPut || tData.uids[tData.curPlayer] != pl.info.uid) {
            return [];
        }

        var hand = pl.mjhand.slice();

        var dict = {};
        for (var i = 0; i < hand.length; i++) {
            if(hand[i] == this.KING){
                continue;
            }
            var c = hand[i] % 100;
            dict[c] = dict[c] ? dict[c] + 1 : 1;
        }

        var putList = [];
        for (var k in dict) {
            var card = Number(k);
            if (pl.canNotPutCard && pl.canNotPutCard.indexOf(card) >= 0) {
                continue;
            }
            cc.log("hintPutCardsToTing" + JSON.stringify(dict));
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

    TongChengGeZiPai.prototype.getTingCards = function(tb, pl, putCard) {
        var tingCards = [];
        var stats = this.getTingStats(tb, pl, putCard);
        for (var k in stats) {
            if (stats[k] > 0) {
                tingCards.push(Number(k));
            }
        }
        return tingCards;
    };

    TongChengGeZiPai.prototype.getSortHuxi = function(tb, pl) {
        if (!pl)
            return 0;

        var score = 0;
        for (var i = 0; i < pl.mjpeng.length; i++) {
            score += this.getPengScore(pl.mjpeng[i]);
        }
        for (var i = 0; i < pl.mjgang0.length; i++) {
            var cards = pl.mjgang0[i];
            if (cards.length == 4) {
                score += this.getZhaoScore(cards);
            } else {
                score += this.getHuaScore(cards);
            }
        }
        return score;
    }
    //-----------------前端新增接口end----------------

    if (typeof(MjClient) != "undefined") {
        MjClient.majiang_tongChengGeZiPai = new TongChengGeZiPai();
    } 

    //var hand = [3,5,5,7,22,22,22,22,23,32,32,52,61,103,103,105,107];
    //var hand = [2,4,9,9,10,10,10,21,21,23,23,31,32,33,33,42,52,52,71,71,105,105,107,142,357];
    //var hand = [9,10,2,103,4,105,6,107,8,109,10,2,103,4,105,6,107,8,109,10,109,10,21,22,23];
    //var mjgang1 = [[3,3,103,103], [5, 5, 5, 5]];
    //var hand = [31,21,31,21,61,21,43,52,13,3,22,1,71,31,12,61,23];
    //var arith = new TongChengGeZiPai();
    //var ret = arith.sortEndCard(hand);
    //var ret = arith.sortCard(hand, mjgang1);
    //console.log('排序结果=', JSON.stringify(ret));
}());
