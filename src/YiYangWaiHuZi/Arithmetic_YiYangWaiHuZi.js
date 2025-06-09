// 汨罗红字 客户端算法
(function() {
    var menziList = []; // 所有可能牌型组合
    var duiList = [];
    for (var i = 1; i <= 10; i++) {
        menziList.push([i, i, i], [i + 20, i + 20, i + 20]);
        duiList.push([i, i], [i + 20, i+ 20]);
    }

    for (var i = 1; i <= 8; i++) {
        menziList.push([i, i + 1, i + 2]);
        menziList.push([i + 20, i + 21, i + 22]);
    }

    menziList.push([2, 7, 10], [22, 27, 30]);

    var c2m = {}; // 牌对应的门子idx集合
    for (var i = 0; i < menziList.length; i++) {
        var row = menziList[i];
        for (var j = 0; j < row.length; j++) {
            var cd = row[j];
            if (!c2m[cd]) {
                c2m[cd] = [];
            }

            if (c2m[cd].indexOf(i) < 0) {
                c2m[cd].push(i);
            }
        }
    }

    var KING = 91;

    var MaJiangYiYangWaiHuZi = function() {
        this.KING = 91;
        this.handCount = 13;
        this.sortType = 1;
    };

    MaJiangYiYangWaiHuZi.prototype.getCardShowType = function(uid, card) {
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

    MaJiangYiYangWaiHuZi.prototype.getAllCardsTotal = function(tb) {
        //return 80 - (MjClient.data.sData.tData.areaSelectMode.isMaiPai && MjClient.data.sData.tData.maxPlayer == 2 ? 20 : 0);
        var tData = MjClient.data.sData.tData;
        return 80 - (tData.maxPlayer == 2 ? tData.areaSelectMode.maiPaiNum : 0);
    };

    MaJiangYiYangWaiHuZi.prototype.isEqualHunCard = function(card) {
        return card == KING;
    };

    // 理牌
    MaJiangYiYangWaiHuZi.prototype.sortCardTemp = function(hand, sortType) {
        hand = hand.slice();

        sortType = sortType || this.sortType % 2 + 1;
        this.sortType = sortType;

        var matrix = [];
        var dict = {};
        for (var i = 0; i < hand.length; i++) {
            dict[hand[i]] = dict[hand[i]] ? dict[hand[i]] + 1 : 1;
        }

        if (dict[KING] > 0) {
            for (var i = 0; i < dict[KING]; i++) {
                hand.splice(hand.indexOf(KING), 1);
            }
        }

        function del(card, num) {
            for (var i = 0; i < num; i++) {
                hand.splice(hand.indexOf(card), 1);
                dict[card]--;
            }
        }

        // 2.坎 一句话 对子
        // 1.坎 对子 一句话

        if (sortType == 2) {
            // 取一句话
            for (var i = 0; i < menziList.length; i++) {
                var row = menziList[i].slice(); // 此处需要拷贝！ 防止外部修改
                if (i < 20) { 
                    if (dict[row[0]] >= 3) {
                        if(dict[row[0]] == 3){
                            matrix.push(row);
                            del(row[0], 3);
                        }else if(dict[row[0]] == 4){
                            row.push(row[0]);
                            matrix.push(row);
                            del(row[0], 4);
                        }
                    }
                } else {
                    if (dict[row[0]] >= 1 && dict[row[1]] >= 1 && dict[row[2]] >= 1) {
                        matrix.push(row);
                        del(row[0], 1);
                        del(row[1], 1);
                        del(row[2], 1);
                        i--;
                    }
                }
            }

            // 取对
            for (var k in dict) {
                var cd = Number(k);
                if (cd != KING && dict[k] == 2) {
                    matrix.push([cd, cd]);
                    del(cd, 2);
                }
            }
        } else if (sortType == 1) {
            for (var i = 0; i < 20; i++) {
                var row = menziList[i].slice(); // 此处需要拷贝！ 防止外部修改
                if (dict[row[0]] >= 3) {
                    if(dict[row[0]] == 3){
                        matrix.push(row);
                        del(row[0], 3);
                    }else if(dict[row[0]] == 4){
                        row.push(row[0]);
                        matrix.push(row);
                        del(row[0], 4);
                    }
                }
            }

            // 取对
            for (var k in dict) {
                var cd = Number(k);
                if (cd != KING && dict[k] == 2) {
                    matrix.push([cd, cd]);
                    del(cd, 2);
                }
            }

            for (var i = 20; i < menziList.length; i++) {
                var row = menziList[i].slice(); // 此处需要拷贝！ 防止外部修改
                if (dict[row[0]] >= 1 && dict[row[1]] >= 1 && dict[row[2]] >= 1) {
                    matrix.push(row);
                    del(row[0], 1);
                    del(row[1], 1);
                    del(row[2], 1);
                    i--;
                }
            }
        }
        
        hand.sort();
        var copy = hand.slice();
        // 相连的牌
        function getLink() { // todo 是否加入王
            if (copy.length <= 0) {
                return;
            }

            var card = copy[0];
            if (card == KING) {
                return;
            }

            var linkList = [];
            // 2-7-10
            if (card % 10 == 2) {
                linkList.push(card + 5, card + 8);
            } else if (card % 10 == 7) {
                linkList.push(card + 3);
            }

            // 顺子
            linkList.push(card + 1, card + 2);
            
            var flag = false;
            for (var i = 0; i < linkList.length; i++) {
                var card2 = linkList[i];
                if (dict[card2] > 0) {
                    del(card, 1);
                    del(card2, 1);
                    copy.splice(copy.indexOf(card2), 1);
                    matrix.push([card, card2]);
                    break;
                }
            }
            copy.splice(copy.indexOf(card), 1);
            getLink();
        }
        getLink();
        for (var i = 0; i < hand.length; i++) {
            matrix.push([hand[i]]);
        }

        if (dict[KING] == 4) {
            matrix.push([KING, KING, KING], [KING]);
        } else if (dict[KING] > 0) {
            var row = [];
            for (var i = 0; i < dict[KING]; i++) {
                row.push(KING);
            }
            matrix.push(row);
        }

        for (var i = 0; i < matrix.length; i++) {
            var row = matrix[i];
            row.sort(function(a, b) {
                return a - b;
            })
        }

        matrix.sort(function(a, b) {
            return a[0] - b [0];
        })


        return matrix;
    };

    MaJiangYiYangWaiHuZi.prototype.sortByUser = function (arr) {
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
    };

    MaJiangYiYangWaiHuZi.prototype.sortCard3 = function (hand, sortType) {
        return this.sortCard(hand, sortType);
    }

    MaJiangYiYangWaiHuZi.prototype.sortCard = function (hand, sortType) {
        var handArr = this.sortCardTemp(hand, sortType);
        var singleSmall =[];
        var singleBig = [];
        for(var i = handArr.length - 1; i >= 0 ; i--){
            if(handArr[i].length == 1){
                var card = handArr[i][0];
                if(card < 20 ){
                    singleSmall.unshift(card);
                }else{
                    singleBig.unshift(card);
                }
                handArr.splice(i, 1);
            }
        }
        function getSingleHandArrs(singleCards) {
            var singleHandArrs = [];
            var singleArr = [];
            for(var i = 0; i < singleCards.length; i++){
                singleArr.push(singleCards[i]);
                if(singleArr.length == 3){
                    singleHandArrs.push(singleArr);
                    singleArr = [];
                }
            }
            if(singleArr.length > 0){
                singleHandArrs.push(singleArr);
            }
            return singleHandArrs;
        }
        if(singleSmall.length > 0){
            var i = 0;
            for(; i < handArr.length; i++){
                if(handArr[i][0] > 20){
                    break;
                }
            }
            if(i == 0){
                handArr = getSingleHandArrs(singleSmall).concat(handArr);
            }else if(i == handArr.length){
                handArr = handArr.concat(getSingleHandArrs(singleSmall));
            }else{
                handArr = handArr.slice(0, i).concat(getSingleHandArrs(singleSmall)).concat(handArr.slice(i));
            }
        }
        if(singleBig.length > 0){
            handArr = handArr.concat(getSingleHandArrs(singleBig));
        }
        /*while(handArr && handArr.length > 11){
            var src = -1;
            for(var i = handArr.length - 1; i >= 0; i--){
                if(handArr[i].length == 1){
                    src = i;
                    break
                }
            }
            var dst = -1;
            var offest = 100;
            for(var i = src - 1; i >= 0; i--){
                if(handArr[i].length < 3){
                    dst = i;
                    for(var j = 0; j < handArr[i].length; j++){
                        offest = Math.min(Math.abs(handArr[i][j] - handArr[src][0]), offest);
                    }
                    break;
                }
            }
            for(var i = src + 1; i < handArr.length - 1; i++){
                if(handArr[i].length < 3){
                    for(var j = 0; j < handArr[i].length; j++){
                        if(Math.abs(handArr[i][j] - handArr[src][0]) < offest){
                            dst = i;
                            break
                        }
                    }
                    break;
                }
            }
            if(src != -1 && dst != -1){
                if(dst > src){
                    handArr[dst] = handArr[src].concat(handArr[dst]);
                }else{
                    handArr[dst] = handArr[dst].concat(handArr[src]);
                }
                handArr.splice(src, 1);
            }else{
                break;
            }
        }*/
        return handArr;
    }

    MaJiangYiYangWaiHuZi.prototype.sortCard2 = function (handArr) {
        while(handArr && handArr.length > 10){
            var src = -1;
            var dst = -1;
            for(var i = handArr.length - 1; i >= 0; i--){
                if(handArr[i].length == 1){
                    if(src == -1){
                        src = i;
                    }else if(dst == -1){
                        dst = i;
                    }
                    if(src != -1 && dst != -1){
                        break;
                    }
                }
            }
            if(src != -1 && dst != -1){
                handArr[dst] = handArr[dst].concat(handArr[src]);
                handArr.splice(src, 1);
            }else{
                break;
            }
        }
    }

    MaJiangYiYangWaiHuZi.prototype.cardHandCount = function (cardArr,card){
        var cardCount = 0;
        for(var i=0,length=cardArr.length;i<length;i++){
            if(cardArr[i] == card){
                cardCount ++ ;
            }
        }
        return cardCount;
    };

    // 吃牌组合列表
    MaJiangYiYangWaiHuZi.prototype.getChiList = function(pl, card) {
        var hand = pl.mjhand.slice();
        hand.push(card);
        var chiList = [];
        for (var i = 20; i < menziList.length; i++) { // 前20为坎 写死20！
            var row = menziList[i].slice(); // 此处需要拷贝！ 防止外部修改
            if (row.indexOf(card) >= 0) {
                var flag = true;
                for (var j = 0; j < 3; j++) {
                    if (hand.indexOf(row[j]) < 0) {
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    if(MjClient.data.sData.tData.areaSelectMode.isSiShou){
                        chiList.push(row);
                    }else{
                        var copy = hand.slice();
                        copy.splice(copy.indexOf(row[0]), 1);
                        copy.splice(copy.indexOf(row[1]), 1);
                        copy.splice(copy.indexOf(row[2]), 1);

                        var isPush = false;
                        for (var j = 0; j < copy.length; j++) {
                            var rowCopy = row.slice();
                            rowCopy.splice(rowCopy.indexOf(card), 1);
                            rowCopy.push(copy[j]);

                            if (copy[j] != KING && copy[j] != card && pl.canNotPutCard.indexOf(copy[j]) < 0
                                && !isShun(rowCopy)) {
                                chiList.push(row);
                                isPush = true;
                                break;
                            }
                        }
                        if(!isPush && canLiu(pl, copy)){
                            chiList.push(row);
                        }
                    }
                }
            }
        }
        function canLiu(pl, cards) {
            var dict = {};
            for(var i = 0; i < cards.length; i++) {
                dict[cards[i]] = dict[cards[i]] ? dict[cards[i]] + 1 : 1;
            }
            for(var card in dict){
                if(pl.mjwei.indexOf(Number(card)) >= 0 || pl.mjpeng.indexOf(Number(card)) >= 0 || dict[card] == 4){
                    return true;
                }
            }
            return false;
        }
        function isShun(cards) {
            if(cards.length != 3){
                return false;
            }
            var cardTemp = cards.slice();
            cardTemp.sort(function (a, b) {
                return a - b;
            });
            return (cardTemp[0] == cardTemp[1] - 1 && cardTemp[0] == cardTemp[2] - 2)
                || (cardTemp[0] == 2 && cardTemp[1] == 7 && cardTemp[0] == 10)
                || (cardTemp[0] == 22 && cardTemp[1] == 27 && cardTemp[0] == 30);
        }
        if(pl.giveupChis){
            for(var i = chiList.length - 1; i >= 0; i--){
                var row = chiList[i];
                var rowCopy = row.slice();
                rowCopy.splice(rowCopy.indexOf(card), 1);
                for(var j = 0; j < pl.giveupChis.length; j++){
                    var rowNew = rowCopy.slice();
                    rowNew.push(pl.giveupChis[j]);
                    if(isShun(rowNew)){
                        chiList.splice(i, 1);
                        break;
                    }
                }
            }
        }

        return chiList;
    };

    // 获取能打牌的数量
    MaJiangYiYangWaiHuZi.prototype.getCanPutCardNum = function(pl) {
        var num = 0;
        var hand = pl.mjhand;
        var canNotPutCard = pl.canNotPutCard || [];
        var hand = pl.mjhand;
        for (var i = 0; i < hand.length; i++) {
            var card = hand[i];
            if (canNotPutCard.indexOf(card) < 0 && card != KING) {
                num++;
            }
        }

        return num;
    };

    MaJiangYiYangWaiHuZi.prototype.isRed = function(card) {
        return [2, 7, 10, 22, 27, 30].indexOf(card) >= 0;
    };

    MaJiangYiYangWaiHuZi.prototype.isQiDui = function(pl, card) {
        var hand = pl.mjhand.slice();
        hand.push(card);

        if (hand.length != this.handCount + 1) {
            return false;
        }

        var dict = {};
        dict[KING] = 0;
        for (var i = 0; i < hand.length; i++) {
            dict[hand[i]] = dict[hand[i]] ? dict[hand[i]] + 1 : 1;
        }
        for (var k in dict) {
            if (Number(k) == KING) {
                continue;
            }

            if (dict[k] != 2 && dict[k] != 4) {
                dict[KING]--;
                if (dict[KING] < 0) {
                    return false;
                }
            }
        }

        return true;
    };

    // 红字 大字 王数量统计
    MaJiangYiYangWaiHuZi.prototype.stats = function(pl, card) {
        var hand = pl.mjhand.slice();
        hand.push(card);

        var redNum = 0;
        var bigNum = 0;
        var kingNum = 0;
        for (var i = 0; i < pl.mjpeng.length; i++) {
            if (this.isRed(pl.mjpeng[i])) {
                redNum += 3;
            }

            if (pl.mjpeng[i] >= 21) {
                bigNum += 3;
            }
        }

        for (var i = 0; i < pl.mjchi.length; i++) {
            var row = pl.mjchi[i].eatCards;
            for (var j = 0; j < 3; j++) {
                if (this.isRed(row[j])) {
                    redNum++;
                }

                if (row[j] >= 21) {
                    bigNum++;
                }
            }
        }

        for (var i = 0; i < hand.length; i++) {
            if (this.isRed(hand[i])) {
                redNum++;
            }

            if (hand[i] != KING && hand[i] >= 21) {
                bigNum++;
            }

            if (hand[i] == KING) {
                kingNum++;
            }
        }

        return {redNum: redNum, bigNum: bigNum, kingNum: kingNum};
    };

    MaJiangYiYangWaiHuZi.prototype.canHuBanBan = function(tb, pl) {
        var tData = tb.tData;
        if (!tData.areaSelectMode.isBanBanHu || !pl.isInitHandAllBlack || pl.mjchi.length + pl.mjpeng.length != 0) {
            return false;
        }

        if (tData.areaSelectMode.banBanHuType == 0) {
            if (tData.drawCardIdx == 0 && pl.info.uid == tData.uids[tData.zhuang]) {
                return true;
            }

            if (tData.drawCardIdx == 1 && pl.info.uid != tData.uids[tData.zhuang]) {
                return true;
            }
        } else if (tData.areaSelectMode.banBanHuType == 1) {
            if (pl.isFirstDraw && pl.info.uid == tData.uids[tData.lastDrawPlayer]) {
                return true;
            }
        }

        return false;
    };

    MaJiangYiYangWaiHuZi.prototype.getAchv = function(tb, pl, matrix, be, stats) {
        var tData = tb.tData;
        var redNum = stats.redNum;
        var bigNum = stats.bigNum;
        var kingNum = stats.kingNum;
        matrix = JSON.parse(JSON.stringify(matrix));

        var score = 0;
        var desc = {};
        if (be.length > 0) { // 王替换
            var idx = 0;
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    if (KING == matrix[i][j]) {
                        matrix[i][j] = be[idx++];
                    }
                }
            }
        }

        var isHuByBanBan = false; // 板板不成牌胡
        if (matrix[matrix.length - 1][0] == 50) {
            isHuByBanBan = true;
        }

        var isHuBySiHuDie = false; // 4蝴蝶不成牌胡
        if (matrix[matrix.length - 1][0] == 60) {
            isHuBySiHuDie = true;
        }

        var redNum_be = 0;
        for (var i = 0; i < be.length; i++) {
            if (this.isRed(be[i])) {
                redNum_be++;
                redNum++;
            }

            if (be[i] >= 21) {
                bigNum++;
            }
        }

        // 蝴蝶飞
        if (kingNum == 4 && tData.areaSelectMode.isHuDieFei) {
            // 除胡别人的蝴蝶 算蝴蝶飞
            if (!(tData.lastPutCard == KING && pl.info.uid != tData.uids[tData.lastDrawPlayer])) {
                score += 20;
                desc.huDieFei = "+20";
            }
        }

        // 板板胡
        if (this.canHuBanBan(tb, pl) && redNum == 0) {
            score += 10;
            desc.banBanHu = "+10";
        }

        if (!isHuByBanBan && !isHuBySiHuDie) {
            var isQiDui = false;
            if (matrix.length == 7) { // 7对
                isQiDui = true;
                for (var i = 0; i < matrix.length; i++) {
                    if (matrix[i].length != 2) {
                        isQiDui = false;
                        break;
                    }

                    if (matrix[i][0] != matrix[i][1]) {
                        isQiDui = false;
                        break;
                    }
                }
            }

            if (isQiDui) {
                score += 20;
                desc.qiDui = "+20";
            }

            if (redNum == 0) { // 黑胡
                score += 20;
                desc.heiHu = "+20";
            } else if (redNum == 1) { // 点胡
                score += 10;
                desc.dianHu = "+10";
            } else if (redNum == 10) { // 十红
                score += 20;
                desc.shiHong = "+20";
            } else if (redNum == 14 && tData.areaSelectMode.isManTangHong) { // 满堂红
                score += 40;
                desc.manTangHong = "+40";
            } else if (redNum == 12 && tData.areaSelectMode.isShiErHong) { // 十二红
                score += 20;
                desc.shiErHong = "+20";
            } else if (redNum == 11 && tData.areaSelectMode.isShiYiHong) { // 十一红
                score += 20;
                desc.shiYiHong = "+20";
            }

            if (bigNum == 0) { // 小一色
                score += 20;
                desc.xiaoYiSe = "+20";
            } else if (bigNum == 14) { // 大一色
                score += 20;
                desc.daYiSe = "+20";
            }

            // 碰碰胡
            if (pl.mjchi.length == 0 && matrix.length <= 5) {
                var isAllPeng = true;
                for (var i = 0; i < matrix.length; i++) {
                    var row = matrix[i];
                    if (row.length == 3) {
                        if (row[0] != row[1] || row[0] != row[2]) {
                            isAllPeng = false;
                            break;
                        }
                    }
                }

                if (tData.areaSelectMode.isSiPeng && isAllPeng && matrix.length == 1) {
                    score += 40;
                    desc.siPengDanDiao = "+40";
                } else if (tData.areaSelectMode.isPengPengHu && isAllPeng) { 
                    score += 20;
                    desc.pengPengHu = "+20";
                }
            }

            // 句句红
            if (tData.areaSelectMode.isJuJuHong && matrix.length >= 1 && matrix.length < 7 && pl.mjpeng.length == 0) {
                var isAllOneRed = true;
                for (var i = 0; i < pl.mjchi.length; i++) {
                    var row = pl.mjchi[i].eatCards.slice();
                    var redNumInRow = 0;
                    for (var j = 0; j < row.length; j++) {
                        if (this.isRed(row[j])) {
                            redNumInRow++;
                        }
                    }

                    if (redNumInRow != 1) {
                        isAllOneRed = false;
                        break;
                    }
                }

                for (var i = 0; i < matrix.length; i++) {
                    var row = matrix[i];
                    var redNumInRow = 0;
                    for (var j = 0; j < row.length; j++) {
                        if (this.isRed(row[j])) {
                            redNumInRow++;
                        }
                    }

                    if ((row.length == 2 && redNumInRow != 2) || (row.length == 3 && redNumInRow != 1)) {
                        isAllOneRed = false;
                        break;
                    }
                }

                if (isAllOneRed) {
                    score += 10;
                    desc.juJuHong = "+10";
                }
            }

            // 一挂匾
            if (tData.areaSelectMode.isYiGuaBian) {
                var bianNum = 0;
                for (var i = 0; i < pl.mjchi.length; i++) {
                    var row = pl.mjchi[i].eatCards.slice();
                    row.sort(function(a, b) {return a - b});
                    if (row.toString() == [2, 7, 10].toString() || row.toString() == [22, 27, 30].toString()) {
                        bianNum++;
                    }
                }

                for (var i = 0; i < matrix.length; i++) {
                    var row = matrix[i];
                    if (row.toString() == [2, 7, 10].toString() || row.toString() == [22, 27, 30].toString()) {
                        bianNum++;
                    }
                }

                if (bianNum == 1 && stats.redNum + redNum_be == 3) {
                    score += 10;
                    desc.yiGuaBian = "+10";
                }
            }
        }

        if (tData.areaSelectMode.isDaHu) {
            if (Object.keys(desc).length > 0) {
                score = 0;
                for (var k in desc) {
                    switch (k) {
                        case "manTangHong":
                            score += 40;
                            break;
                        case "shiErHong":
                            score += 20;
                            break;
                        default:
                            desc[k] = "+10";
                            score += 10;
                            break;
                    }
                }
            }
        }
        
        if (!tData.areaSelectMode.isShuangHe && Object.keys(desc).length >= 2) {
            var desc_max = "";
            var score_max = 0;
            for (var k in desc) {
                var num = Number(desc[k].substr(1));
                if (num > score_max) {
                    score_max = num;
                    desc_max = k;
                }
            }

            for (var k in desc) {
                if (k != desc_max) {
                    delete desc[k];
                }
            }

            score = score_max;
        }

        if (tData.areaSelectMode.isFengDing) { // 封顶80分
            score = Math.min(80, score);
        }

        if (score == 0 && stats.redNum + redNum_be >= tb.tData.minRedNum) {
            score = stats.redNum + redNum_be;
        }

        return {score: score, desc: desc};
    };

    // 1、溜（四张）：4息；
    // 2、歪（三张）：4息；
    // 3、坎（三张）：3息；
    // 4、碰（三张）：1息；
    // 5、飘（4张）：1息
    // 6、二七十（贰柒拾）：1息；
    // 7、门子中的对子和2710中的两张也记一分：1息
    MaJiangYiYangWaiHuZi.prototype.getPutCardHuxi = function(pl){
        var score = {xiaoHu:0};
        score.xiaoHu += pl.mjgang0.length * 1;
        score.xiaoHu += pl.mjgang1.length * 4;
        if (pl.mjgang2){
            score.xiaoHu += pl.mjgang2.length * 4;
        }
        score.xiaoHu += pl.mjwei.length * 4;
        score.xiaoHu += pl.mjpeng.length * 1;

        for (var i = 0; i < pl.mjchi.length; ++i){
            var chiRow = [].concat(pl.mjchi[i].eatCards);
            chiRow.sort(function(a, b) {
                return a - b;
            });
            if (chiRow[0] == 2 && chiRow[1] == 7) {
                score.xiaoHu += 1;
            } else if (chiRow[0] == 22 && chiRow[1] == 27) {
                score.xiaoHu += 1;
            }
        }
        return score;
    }

    //支持二维数组
    MaJiangYiYangWaiHuZi.prototype.getCardCount = function(cards, card) {
        var count = 0;
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].length){
                count += this.getCardCount(cards[i], card);
            }else if (cards[i] == card) {
                count++;
            }
        }
        return count;
    }

    //return -1不成将 0普通顺子的两张 1对子或者 2 7 10其中两张：即平胡中算胡息的门子
    MaJiangYiYangWaiHuZi.prototype.jiangType = function(c1, c2){
        if (c1 == c2){
            return 1;
        }else if (Math.abs(c1 - c2) <= 2){
            return 0;
        }else if (([2,7,10].indexOf(c1) >= 0 && [2,7,10].indexOf(c2) >= 0) ||
            ([22,27,30].indexOf(c1) >= 0 && [22,27,30].indexOf(c2) >= 0)){
            return 1;
        }
        return -1;
    }

    MaJiangYiYangWaiHuZi.prototype.canHu = function(tb, pl, card, cardType) {
        var needHuxi = tb.tData.minHuxi;
        if (tb.tData.areaSelectMode.isHuJiaYiXi){
            needHuxi -= 1;
        }
        needHuxi -= this.getPutCardHuxi(pl).xiaoHu;
        var hand = pl.mjhand.slice();
        if (card && card > 0){
            hand.push(card);
        }

        var hu = function(hand, idx, matrix, needHx) {
            if (hand.length == 2) {
                var jiangType = this.jiangType(hand[0], hand[1]);
                //单歪：4息（低息）。其他牌皆成牌单吊的牌型，胡自己摸出那张组成对子胡牌。算了单歪后不能重复计算门子那1息。
                if (card && card == hand[0] && hand[0] == hand[1] && cardType == 1){
                    jiangType = 4;
                }

                if (jiangType >= 0 && needHx - jiangType <= 0){
                    return true;
                }else{
                    return false;
                }
            }else if (hand.length < 2){
                return false;
            }

            var list = menziList;
            for (var i = idx; i < list.length; i++){
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
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    var hand_copy = copy;
                    var matrix_copy = matrix.slice();
                    matrix_copy.push(row);
                    var needHx_copy = needHx;
                    if (row[0] == row[1] && row[1] == row[2]){
                        if (card && card == row[0]){
                            //作歪
                            if (cardType == 1){
                                needHx_copy -= 4;
                            }else{
                                //作碰
                                if (this.getCardCount(hand, card) < 4){
                                    needHx_copy -= 1;
                                    //做坎
                                }else{
                                    needHx_copy -= 3;
                                }
                            }
                            //做坎
                        }else{
                            needHx_copy -= 3;
                        }
                    }else if (row[0] % 10 == 2 && row[1] % 10 == 7){
                        needHx_copy -= 1;
                    }
                    if (hu(hand_copy, i, matrix_copy, needHx_copy)) {
                        return true;
                    }
                }
            }
            return false;
        }.bind(this);
        return hu(hand, 0, [], needHuxi);
    };

    MaJiangYiYangWaiHuZi.prototype.getHuInfo = function(tb, pl, card) {
        hand = pl.mjhand.slice();
        hand.push(card);
        var record = card; // 记录
        var maxHuInfo = {
            score: 0,
            matrix: [],
            be: [],
        }
        var tData = tb.tData;
        var stats = this.stats(pl, card);
        // console.log("stats@@ " + JSON.stringify(stats));

        if (this.canHuBanBan(tb, pl) && !this.isRed(record)) { // 板板不成牌胡
            // 这里card已经改了 不是参数card！
            var matrix = this.sortCardTemp(hand);
            var be = [];
            for (var i = 0; i < stats.kingNum.length; i++) {
                be.push(1);
            }

            matrix.push([50]); // 表示非正常成牌胡！
            var achv = this.getAchv(tb, pl, matrix, be, stats);
            matrix.pop();
            var score = achv.score;
            if (score > maxHuInfo.score) {
                maxHuInfo.score = score;
                maxHuInfo.matrix = matrix;
                maxHuInfo.be = be;
                maxHuInfo.hzdesc = achv.desc;
            }
        }

        if (record == KING && pl.info.uid != tData.uids[tData.lastDrawPlayer]) { // 胡别人的蝴蝶牌 不计算成牌
            var handSort = [];
            for (var i = 0; i < maxHuInfo.matrix.length; i++) {
                var name = maxHuInfo.matrix[i].length == 2 ? "dui" : "chi";
                handSort.push({card: maxHuInfo.matrix[i], name : name});
            }
            maxHuInfo.handSort = handSort;
            delete maxHuInfo.matrix;
            
            return maxHuInfo;
        }

        if (stats.kingNum >= 4 && tData.areaSelectMode.isHuDieFei) { // 四蝴蝶不成牌胡
            var matrix = this.sortCardTemp(hand);
            var be = [];
            for (var i = 0; i < stats.kingNum.length; i++) {
                be.push(1);
            }

            matrix.push([60]); // 表示非正常成牌胡！
            var achv = this.getAchv(tb, pl, matrix, be, stats);
            matrix.pop();
            var score = achv.score;
            if (score > maxHuInfo.score) {
                maxHuInfo.score = score;
                maxHuInfo.matrix = matrix;
                maxHuInfo.be = be;
                maxHuInfo.hzdesc = achv.desc;
            }
        }
        
        if (this.isQiDui(pl, card)) { // 七对
            var dict = {};
            dict[KING] = 0;
            for (var i = 0; i < hand.length; i++) {
                dict[hand[i]] = dict[hand[i]] ? dict[hand[i]] + 1 : 1;
            }

            var matrix = [];
            var be = [];
            for (var k in dict) {
                var card = Number(k);
                if (card == KING) {
                    continue;
                }

                switch (dict[k]) {
                    case 1:
                        matrix.push([card, KING]);
                        be.push(card);
                        dict[KING]--;
                        break;
                    case 2:
                        matrix.push([card, card]);
                        break;
                    case 3:
                        matrix.push([card, card], [card, KING]);
                        be.push(card);
                        dict[KING]--;
                        break;
                    case 4:
                        matrix.push([card, card], [card, card]);
                        break;
                }
            }

            if (dict[KING] == 0) {
                var achv = this.getAchv(tb, pl, matrix, be, stats);
                var score = achv.score;;
                if (score > maxHuInfo.score) {
                    maxHuInfo.score = score;
                    maxHuInfo.matrix = matrix;
                    maxHuInfo.be = be;
                    maxHuInfo.hzdesc = achv.desc;
                }
            } else if (dict[KING] == 2) {
                var matrix_copy = matrix.slice(); // 二维数组这样拷贝 改变数组中一列的值会影响原二维数组
                matrix_copy.push([KING, KING]);
                for (var i = 0; i < duiList.length; i++) {
                    var be_copy = be.slice();
                    be_copy.push(duiList[i][0], duiList[i][0]);

                    var achv = this.getAchv(tb, pl, matrix_copy, be_copy, stats);
                    var score = achv.score;;
                    if (score > maxHuInfo.score) {
                        maxHuInfo.score = score;
                        maxHuInfo.matrix = matrix_copy;
                        maxHuInfo.be = be_copy;
                        maxHuInfo.hzdesc = achv.desc;
                    }
                }
            } else if (dict[KING] == 4) { // 不用处理,会算做碰碰胡
            }
        }

        var hu = function(hand, idx, matrix, be, isDui) {
            if (hand.length == 0) {
                return;
            }

            var list;
            if (hand.length % 3 == 2) { // 取对
                list = duiList;
            } else if (hand.length % 3 == 0) { // 取一句话
                list = menziList;
            }

            if (matrix.length == 1) {
                idx = 0;
            }

            for (var i = idx; i < list.length; i++) {
                var menzi = list[i];
                var copy = hand.slice();
                var flag = true;
                var row = [];
                var be2 = [];
                for (var j = 0; j < menzi.length; j++) {
                    var cd = menzi[j];
                    var idx = copy.indexOf(cd);
                    if (idx >= 0) {
                        copy.splice(idx, 1);
                        row.push(cd);
                    } else {
                        var idx2 = copy.indexOf(KING);
                        if (idx2 >= 0) { // 王牌替代
                            copy.splice(idx2, 1);
                            row.push(KING);
                            be2.push(cd);
                        } else {
                            flag = false;
                            break;
                        }
                    } 
                }

                if (flag) {
                    var hand_copy = hand.slice();
                    var matrix_copy = matrix.slice();
                    var be_copy = be.slice();

                    matrix_copy.push(row);
                    be_copy = be_copy.concat(be2);
                    for (var j = 0; j < row.length; j++) {
                        var cd = row[j];
                        hand_copy.splice(hand_copy.indexOf(cd), 1);
                    }

                    if (hand_copy.length == 0) {
                        // console.log("huMatrix@@ ", matrix_copy);
                        // console.log("be@@ ", be_copy);
                        // console.log(JSON.stringify(this.getAchv(tb, pl, matrix_copy, be_copy, stats)));

                        var achv = this.getAchv(tb, pl, matrix_copy, be_copy, stats);
                        var score = achv.score;
                        // var score = 0;
                        // if (achv.score > 0) {
                        //     score = achv.score;
                        // } else if (stats.redNum > 3) {
                        //     score = stats.redNum;
                        // }

                        if (score > maxHuInfo.score) {
                            maxHuInfo.score = score;
                            maxHuInfo.matrix = matrix_copy;
                            maxHuInfo.be = be_copy;
                            maxHuInfo.hzdesc = achv.desc;
                        }
                    }

                    hu(hand_copy, i, matrix_copy, be_copy);
                }
            }
        }.bind(this);
        hu(hand, 0, [], []); // 构成胡牌组合胡

        var handSort = [];
        for (var i = 0; i < maxHuInfo.matrix.length; i++) {
            var name = maxHuInfo.matrix[i].length == 2 ? "dui" : "chi";
            handSort.push({card: maxHuInfo.matrix[i], name : name});
        }
        maxHuInfo.handSort = handSort;
        delete maxHuInfo.matrix;

        return maxHuInfo;
    };

    // 获取听牌
    MaJiangYiYangWaiHuZi.prototype.getTingCards = function(tb, pl, putCard) {
        var copy = pl.mjhand.slice();
        var tingCards = [];
        if (putCard != undefined) {
            var idx = pl.mjhand.indexOf(putCard);
            if (idx < 0) {
                return [];
            }
            pl.mjhand.splice(idx, 1);
        } 
        // 牌数量合法判断
        if (pl.mjhand.length % 3 != 1) {
            return [];
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
                /*if(pl.info.uid == p.info.uid){
                    add(p.mjgang1[i], 4);
                }*/
                add(p.mjgang1[i], 4);
            }

            for (var i = 0; i < p.mjgang2.length; i++) {
                if(pl.info.uid == p.info.uid){
                    add(p.mjgang2[i], 4);
                 }
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
                    if (p.info.uid == tData.uids[tData.curPlayer] && i == p.mjput.length - 1) {
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

        var dict = {};
        dict[KING] = 0;
        for (var i = 1; i <= 10; i++) {
            dict[i] = 0;
            dict[i + 20] = 0;
        }

        for (var i = 0; i < pl.mjhand.length; i++) {
            dict[pl.mjhand[i]]++;
        }

        var list = []; // 相关联的牌
        for (var i = 1; i <= 10; i++) { // 初步过滤
            if (dict[KING] > 0) {
                list.push(i, i + 20);
                continue;
            }

            if (dict[i - 2] > 0 || dict[i - 1] > 0 || dict[i] > 0 || dict[i + 1] > 0 || dict[i + 2] > 0) {
                list.push(i);
            }

            if (dict[i + 18] > 0 || dict[i + 19] > 0 || dict[i + 20] > 0 || dict[i + 21] > 0 || dict[i + 22] > 0) {
                list.push(i + 20);
            }

            if ([2, 7, 10].indexOf(i) >= 0 && list.indexOf(i) < 0) {
                if (dict[2] > 0 || dict[7] > 0 || dict[10] > 0) {
                    list.push(i);
                }
            }

            if ([22, 27, 30].indexOf(i + 20) >= 0 && list.indexOf(i + 20) < 0) {
                if (dict[22] > 0 || dict[27] > 0 || dict[30] > 0) {
                    list.push(i + 20);
                }
            }
        }

        for (var i = 0; i < list.length; i++) {
            var card = list[i];
            var time1 = +new Date();
            if (this.canHu(tb, pl, card/*, 1*/)) {
                tingCards.push(card);
            }
        }
        
        if (tingCards.length > 0 && tb.tData.areaSelectMode.kingNum - (stats[KING] || 0) > 0) {
            tingCards.push(KING);
        }

        for (var i = 0; i < tingCards.length; i++) {
            if (stats[tingCards[i]] >= 4) {
                tingCards.splice(i, 1);
                i--;
            }
        }
        tingCards.sort(function(a, b) {return a - b});

        pl.mjhand = copy; 
        return tingCards;
    };

    // 获取听牌统计
    MaJiangYiYangWaiHuZi.prototype.getTingStats = function(tb, pl, putCard) {
        if(!pl.canNotPutCard) return {}; 

        if (pl.canNotPutCard.indexOf(putCard) >= 0 || putCard == KING) {
            return {};
        }

        var tingCards = this.getTingCards(tb, pl, putCard);

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
                /*if(pl.info.uid == p.info.uid){
                    add(p.mjgang1[i], 4);
                }*/
                add(p.mjgang1[i], 4);
            }

            for (var i = 0; i < p.mjgang2.length; i++) {
                if(pl.info.uid == p.info.uid){
                    add(p.mjgang2[i], 4);
                 }
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
                    if (p.info.uid == tData.uids[tData.curPlayer] && i == p.mjput.length - 1) {
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
        for (var i = 0; i < tingCards.length; i++) {
            var card = tingCards[i];
            var totalNum = 4;
            if (card == KING) {
                totalNum = tb.tData.areaSelectMode.kingNum;
            }
            tingStats[card] = totalNum - (stats[card] || 0);
        }

        return tingStats;
    };

    MaJiangYiYangWaiHuZi.prototype.canTing = function(tb, pl, putCard) {
        var copy = pl.mjhand.slice();
        var tingCards = [];
        if (putCard != undefined) {
            var idx = pl.mjhand.indexOf(putCard);
            if (idx < 0) {
                return false;
            }
            pl.mjhand.splice(idx, 1);
        } 
        // 牌数量合法判断
        if (pl.mjhand.length % 3 != 1) {
            pl.mjhand = copy;
            return false;
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
                /*if(pl.info.uid == p.info.uid) {
                    add(p.mjgang1[i], 4);
                }*/
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
                    if (p.info.uid == tData.uids[tData.curPlayer] && i == p.mjput.length - 1) {
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

        var dict = {};
        dict[KING] = 0;
        for (var i = 1; i <= 10; i++) {
            dict[i] = 0;
            dict[i + 20] = 0;
        }

        for (var i = 0; i < pl.mjhand.length; i++) {
            dict[pl.mjhand[i]]++;
        }

        var list = []; // 相关联的牌
        for (var i = 1; i <= 10; i++) { // 初步过滤
            if (dict[KING] > 0) {
                list.push(i, i + 20);
                continue;
            }

            if (dict[i - 2] > 0 || dict[i - 1] > 0 || dict[i] > 0 || dict[i + 1] > 0 || dict[i + 2] > 0) {
                list.push(i);
            }

            if (dict[i + 18] > 0 || dict[i + 19] > 0 || dict[i + 20] > 0 || dict[i + 21] > 0 || dict[i + 22] > 0) {
                list.push(i + 20);
            }

            var row = [2, 7, 10];
            if(row.indexOf(i) >= 0 && (dict[row[0]] > 0 || dict[row[1]] > 0 || dict[row[2]] > 0)){
                list.push(i);
            }
            var row = [22, 27, 30];
            if(row.indexOf(i + 20) >= 0 && (dict[row[0]] > 0 || dict[row[1]] > 0 || dict[row[2]] > 0)){
                list.push(i + 20);
            }
        }
        var tingFlag = false;
        for (var i = 0; i < list.length; i++) {
            var card = list[i];
            var time1 = +new Date();
            if (this.canHu(tb, pl, card/*, 1*/)) {
                tingFlag = true;
                if (!(stats[card] >= 4)) {
                    pl.mjhand = copy; 
                    return true;
                }
            }
        }

        if (tingFlag && tb.tData.areaSelectMode.kingNum - (stats[KING] || 0) > 0) {
            pl.mjhand = copy; 
            return true;
        }

        pl.mjhand = copy;
        return false;
    }

    // 提示打后可听的牌
    MaJiangYiYangWaiHuZi.prototype.hintPutCardsToTing = function() {
        var tb = sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = sData.players[SelfUid()];
        if (tData.tState != TableState.waitPut || tData.uids[tData.curPlayer] != pl.info.uid) {
            return [];
        }

        var hand = pl.mjhand.slice();
        if (hand.length % 3 != 2) {
            return [];
        }


        var dict = {};
        for (var i = 0; i < hand.length; i++) {
            dict[hand[i]] = dict[hand[i]] ? dict[hand[i]] + 1 : 1;
        }


        var putList = [];
        for (var k in dict) {
            var card = Number(k);
            if (card == KING || pl.canNotPutCard.indexOf(card) >= 0) {
                continue;
            }

            if (this.canTing(tb, pl, card)) {
                putList.push(card);
            }
        }
        return putList;
    }

    // 打的牌 -->  听牌统计
    MaJiangYiYangWaiHuZi.prototype.put2TingStats = function(tb, pl) {
        if (pl.mjhand.length % 3 != 2) {
            return [];
        }

        var stats = {
            21: {
                23: 2,
                24: 1,
            }
        };

        stats = {};

        var dict = {};
        for (var i = 0; i < pl.mjhand.length; i++) {
            var card = pl.mjhand[i];
            if (card == KING) {
                continue;
            }

            dict[card] = true;
        }

        for (var k in dict) {
            var card = Number(k);
            var time1 = +new Date();
            var tingCards = this.getTingCards(tb, pl, card);
            if (tingCards.length > 0) {
                var time2 = +new Date();
                console.log('card@@ ', time2 - time1);
                stats[card] = {
                };
                for (var i = 0; i < tingCards.length; i++) {
                    
                    stats[card][tingCards[i]] = 1;
                }
            }
        }

        return stats;
    } 

    if (typeof(MjClient) != "undefined") {
        MjClient.majiang_YiYangWaiHuZi = new MaJiangYiYangWaiHuZi();
    }   

    function test() {
        var a = new MaJiangYiYangWaiHuZi();
        var tb = {tData: {minRedNum: 3, areaSelectMode : true}};
        var pl = {};
        var hand = [8, 9, 27, 21, 4, 27, 26, 5, 2, 3, 91, 91, 91, 91];
        var hand = [2,2,2,7,7,7,22,27,30,24,25,26,21,21];
        pl.mjhand = hand;
        pl.mjpeng = [];
        pl.mjchi = [
        // {
        //     eatCards: [7, 2, 10]
        // },
        ];
        pl.mjchi = [];
        pl.canNotPutCard = [];
        var time1 = + new Date();
        console.log(a.getTingStats(tb, pl, 30));
        // console.log(a.canHu(tb, pl, 2));
        // console.log(JSON.stringify(a.getHuInfo(tb, pl, 2)));

        // console.log(a.put2TingStats(tb, pl));
        // console.log(a.hintPutCardsToTing(tb, pl));
        // console.log(a.put2TingStats(tb, pl));
        // console.log(+ new Date() - time1);
        // console.log(a.sortCardTemp(pl.mjhand));
        // console.log(JSON.stringify(a.stats(pl, 2)));
        // console.log(a.canHu(tb, pl, 7));
        // console.log(JSON.stringify(a.getHuInfo(tb, pl, 7)));
        // var time1 = +new Date();
        // console.log(JSON.stringify(a.getTingCards(tb, pl)));
        // console.log(+new Date() - time1);
        // console.log(a.getChiList(pl, 22));
    }
    // test();
})();