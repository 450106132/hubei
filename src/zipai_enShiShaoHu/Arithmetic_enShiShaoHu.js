(function() {

    function PaoHuZiEnShiShaoHu() {
        this.handCount = 21;
    };

    //胡息.ps.歪,口的胡息按荤牌个数计算 dan.字段
    var HuXiDict = {
        dan:{su:0, hun:1},
        di:{su:0, hun:3},
        peng:{su:1, hun:3},
        shao:{su:3, hun:6},
        zhua:{suAn:6, hunAn:12, suMing:5, hunMing:10},
        banKua:{suAn:6, hunAn:13, suMing:5, hunMing:11},
        manKua:{suAn:6, hunAn:14, suMing:5, hunMing:12}
    }

    var QiangDict = {
        peng:1, shao:2, mingZhua:3, anZhua:4 //见红抢/夹夹枪
    }

    PaoHuZiEnShiShaoHu.prototype.randomCards = function(areaSelectMode) {
        var cards = [
            1,2,3, 1,2,3, 1,2,3, 1,2,3,                     //上大人
            11,12,13, 11,12,13, 11,12,13, 11,12,13,         //丘乙己
            21,22,23, 21,22,23, 21,22,23, 21,22,23,         //化三千

            31,32,33, 31,32,33, 31,32,33, 31,32,33,         //七十贤
            41,42,43, 41,42,43, 41,42,43, 41,42,43,         //尔小生
            51,52,53, 51,52,53, 51,52,53, 51,52,53,         //八九子
            61,62,63, 61,62,63, 61,62,63, 61,62,63,         //佳作美
            71,72,73, 71,72,73, 71,72,73, 71,72,73          //可知礼
        ];

        shuffleArray(cards);
        return cards;
    };

    PaoHuZiEnShiShaoHu.prototype.cardsCount = function(tb) {
        return 96;
    };

    PaoHuZiEnShiShaoHu.prototype.getHandCardCount = function(pl, card) {
        if (!pl || !pl.mjhand) {
            return 0;
        }

        var count = 0;
        for (var i = 0; i < pl.mjhand.length; i++) {
            if (pl.mjhand[i] == card)
                count++;
        }
        return count;
    };

    //荤牌
    PaoHuZiEnShiShaoHu.prototype.isHun = function(card) {
        return card < 30;
    }

    //枪分相关
    PaoHuZiEnShiShaoHu.prototype.isRed = function(card) {
        return card % 10 == 1;
    }

    //上七八可
    PaoHuZiEnShiShaoHu.prototype.isSpecQiangCard = function(card) {
        return card == 1 || card == 31 || card == 51 || card == 71;
    }

    PaoHuZiEnShiShaoHu.prototype.isQiangCard = function(tb, card) {
        var mode = tb.tData.areaSelectMode;
        if (mode.hongQiangType >= 1) {
            return this.isRed(card);
        }

        return this.isSpecQiangCard(card);
    }

    //组ID
    PaoHuZiEnShiShaoHu.prototype.getGroupIdx = function(card) {
        return Math.floor(card / 10);
    }

    PaoHuZiEnShiShaoHu.prototype.isSameGroup = function(card1, card2) {
        return this.getGroupIdx(card1) == this.getGroupIdx(card2);
    }

    PaoHuZiEnShiShaoHu.prototype.canPutCard = function(pl, card) {
        if (pl.mjhand.indexOf(card) < 0) {
            return false;
        }

        var cnt1 = this.getCardsCount(pl.mjhand, card);
        var cnt2 = this.getCardsCount(pl.canNotPutCard, card);
        return cnt1 > cnt2;
    };

    PaoHuZiEnShiShaoHu.prototype.getGroupCards = function(hand) {
        var groupCards = {};
        for (var i = 0; i < 8; i++) {
            groupCards[i] = {};
            groupCards[i][i*10 + 1] = [];
            groupCards[i][i*10 + 2] = [];
            groupCards[i][i*10 + 3] = [];
        }
        for (var i = 0; i < hand.length; i++) {
            var c = hand[i];
            var idx = this.getGroupIdx(c);
            groupCards[idx][c].push(c);
        }
        return groupCards;
    }

    PaoHuZiEnShiShaoHu.prototype.getCardsCount = function(list, card) {
        var cnt = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i] == card) {
                cnt++;
            }
        }
        return cnt;
    }

    /*
        不可打出的牌
        1.手中三个以上相同的牌
        2.成完整一句话的牌
        3.3+2+2 全暗
        4.4+2+2 = 4暗+1暗1明+1暗1明 凑满垮的暗
        5.3+3+2 2张的不暗
        6.4+3+2 = 4暗3暗2明
        7.4+4+2 = 4暗4暗2明
    */
    PaoHuZiEnShiShaoHu.prototype.getCanNotPutCard = function(mjhand) {
        var anCards = [];
       
        var hand = mjhand.slice();
        var groupCards = this.getGroupCards(hand);

        for (var k in groupCards) {
            var idx = Number(k) * 10 + 1;
            var dict = groupCards[k];
            var cnt1 = dict[idx].length;
            var cnt2 = dict[idx+1].length;
            var cnt3 = dict[idx+2].length;
            if (dict[idx].length >= 3) {
                anCards = anCards.concat(Array.apply(null, {length:dict[idx].length}).map(()=>idx));
                dict[idx] = 0;
            }
            if (dict[idx+1].length >= 3) {
                anCards = anCards.concat(Array.apply(null, {length:dict[idx+1].length}).map(()=>(idx+1)));
                dict[idx + 1] = 0;
            }
            if (dict[idx+2].length >= 3) {
                anCards = anCards.concat(Array.apply(null, {length:dict[idx+2].length}).map(()=>(idx+2)));
                dict[idx + 2] = 0;
            }

            if (cnt1 == 0 || cnt2 == 0 || cnt3 == 0) {
                continue;
            }

            //成一句话的.最多两句话
            for (var j = 0; j < 2; j++) {
                if (dict[idx].length > 0 && dict[idx+1].length > 0 && dict[idx+2].length > 0) {
                    anCards.push(idx, idx+1, idx+2);
                    dict[idx].pop();
                    dict[idx+1].pop();
                    dict[idx+2].pop();
                }
            }

            //3+2+2
            if (cnt1 == 3 && cnt2 == 2 && cnt3 == 2) {
                anCards.push(idx+1, idx+1, idx+2, idx+2);
            } else if (cnt1 == 2 && cnt2 == 3 && cnt3 == 2) {
                anCards.push(idx, idx, idx+2, idx+2);
            } else if (cnt1 == 2 && cnt2 == 2 && cnt3 == 3) {
                anCards.push(idx, idx, idx+1, idx+1);
            }

            //4+2+2
            if (cnt1 == 4 && cnt2 == 2 && cnt3 == 2) {
                anCards.push(idx+1, idx+2);
            } else if (cnt1 == 2 && cnt2 == 4 && cnt3 == 2) {
                anCards.push(idx, idx+2);
            } else if (cnt1 == 2 && cnt2 == 2 && cnt3 == 4) {
                anCards.push(idx, idx+1);
            }
        }
        return anCards;
    }

    //是否死手了
    PaoHuZiEnShiShaoHu.prototype.isDead = function(pl) {
        var not = pl.canNotPutCard.slice();
        var hand = pl.mjhand.slice();
        var compared = []; //已经比过的不用再比了
        for (var i = 0; i < hand.length; i++) {
            if (compared.indexOf(hand[i]) >= 0) {
                continue;
            }
            if (not.indexOf(hand[i]) < 0) {
                return false;
            } else {
                //比数量
                var cnt1 = this.getCardsCount(hand, hand[i]);
                var cnt2 = this.getCardsCount(not, hand[i]);
                if (cnt1 > cnt2) {
                    return false;
                }
            }
            compared.push(hand[i]);
        }
        return true;
    }

    // 判定一组吃牌是否补垮(当抵变垮时,此时eat其中一张牌起手下抓了), param.card 吃的那张牌
    PaoHuZiEnShiShaoHu.prototype.getDiToKuaCard = function(pl, eat, card) {
        if (pl.mjgang1.length == 0) {
            return 0;
        }
        var cards = eat.slice();
        cards.splice(cards.indexOf(card), 1);
        var que = 0;
        if (pl.mjhand.indexOf(cards[0]) < 0) {
            que = cards[0];
        } else if (pl.mjhand.indexOf(cards[1]) < 0) {
            que = cards[1];
        }
        if (que == 0) 
            return 0;
        for (var i = 0; i < pl.mjgang1.length; i++) {
            var info = pl.mjgang1[i];
            if (info.ex.length > 0) 
                continue;
            if (info.gang[0] == que) 
                return que;
        }
        return 0;
    }

    //碰绍释放该组不足3张的暗牌
    PaoHuZiEnShiShaoHu.prototype.releaseGroupAnCards = function(pl, card) {
        var k = this.getGroupIdx(card);
        var idx = Number(k) * 10 + 1;
        for (var i = pl.canNotPutCard.length - 1; i >= 0 ; i--) {
            var cd = pl.canNotPutCard[i];
            var num = this.getCardsCount(pl.canNotPutCard, cd);
            if (num >= 3) {
                continue; //3张及以上不释放
            }
            if (cd == idx || cd == idx + 1 || cd == idx + 2) {
                pl.canNotPutCard.splice(i, 1);
            }
        }
    }

    //吃牌检测释放暗牌.优先吃明牌
    PaoHuZiEnShiShaoHu.prototype.releaseAnCardsByChi = function(pl, card) {
        var k = this.getGroupIdx(card);
        var idx = Number(k) * 10 + 1;
        var cards = [idx, idx+1, idx+2];
        cards.splice(cards.indexOf(card), 1);
        
        var delAnCard = function(cd) {
            var num1 = this.getCardsCount(pl.mjhand, cd);
            var num2 = this.getCardsCount(pl.canNotPutCard, cd);

            if (num1 == num2 && num1 > 0) {
                pl.canNotPutCard.splice(pl.canNotPutCard.indexOf(cd), 1); 
            }
        }.bind(this);

        delAnCard[cards[0]];
        delAnCard[cards[1]];
    }

    //垮牌检测释放暗牌.优先垮暗牌
    PaoHuZiEnShiShaoHu.prototype.releaseAnCardsByKua = function(pl, gangInfo) {
        if (!gangInfo) {
            return;
        }
        var delAnCard = function(cd) {
            var idx = pl.canNotPutCard.indexOf(cd);
            if (idx >= 0) {
                pl.canNotPutCard.splice(idx, 1); 
            }
        };

        for (var i = 0; i < 4; i++) {
            delAnCard[gangInfo.gang[0]];
        }

        if (!gangInfo.ex) {
            return;
        }

        var ex = gangInfo.ex;
        for (var i = 0; i < ex.length; i++) {
            delAnCard[ex[i]];
        }
    }

    PaoHuZiEnShiShaoHu.prototype.getWai = function(tb, pl, card) {
        if (!card || card < 0) {
            return;
        }

        var tData = tb.tData; 
        if (pl.uid != tData.uids[tData.curPlayer] && pl.uid != tData.uids[(tData.curPlayer + 1) % tData.maxPlayer]) {
            return; //只能抵自己翻的和上家翻的
        }

        var hand = pl.mjhand.slice();
        //hand.push(card);
        var groupCards = this.getGroupCards(hand);
        var k = this.getGroupIdx(card);
        var group = groupCards[k];
        var idx = Number(k) * 10 + 1;

        var cards = [idx, idx+1, idx+2];
        cards.splice(cards.indexOf(card), 1);

        //不能歪
        if (group[card].length > 1) {
            return;
        }

        var cnt = group[cards[0]].length + group[cards[1]].length;
        if (group[cards[0]].length + group[cards[1]].length == 0) {
            return;
        }

        if (group[cards[0]].length > 2) {
            if (group[cards[1]].length == 0 || group[cards[1]].length > 2) {
                return;
            }
        }

        if (group[cards[1]].length > 2) {
            if (group[cards[0]].length == 0 || group[cards[0]].length > 2) {
                return;
            }
        }

        //成吃的牌型
        if (group[cards[0]].length == group[cards[1]].length) {
            return;
        }

        var other = null;
        if (group[cards[0]].length == 0 || group[cards[0]].length > 2) {
            other = cards[1];
        } else {
            other = cards[0];
        }

        //other全是暗牌时不能歪
        var num1 = this.getCardsCount(pl.canNotPutCard, other);
        var num2 = this.getCardsCount(pl.mjhand, other);
        if (num1 >= num2) {
            return;
        }

        var waiCards = [other, card];
        return waiCards;
    }

    PaoHuZiEnShiShaoHu.prototype.getDi = function(tb, pl, card) {
        if (!card || card < 0) {
            return;
        }

        var tData = tb.tData; 
        if (pl.uid != tData.uids[tData.curPlayer] && pl.uid != tData.uids[(tData.curPlayer + 1) % tData.maxPlayer]) {
            return; //只能抵自己翻的和上家翻的
        }

        //抵有个特殊情况.有对应起手抓的牌时，2张也是抵
        var hand = pl.mjhand.slice();
        hand.push(card);

        var findZhuaCard = function(cd) {
            if (pl.mjgang1.length == 0) { //抵变抓时.只有起手抓有可能出现，牌局中的抓能带直接带下去了
                return;
            }
            for (var i = 0; i < pl.mjgang1.length; i++) {
                if (pl.mjgang1[i].ex.length == 0 &&
                    this.isSameGroup(pl.mjgang1[i].gang[0], cd)) {
                    return pl.mjgang1[i].gang[0];
                }
            }
        }.bind(this);

        var groupCards = this.getGroupCards(hand);
        var k = this.getGroupIdx(card);
        var group = groupCards[k];
        var idx = Number(k) * 10 + 1;
        var bMustDi = false;
        //不能吃
        if (group[idx].length > 2 || group[idx + 1].length > 2 || group[idx + 2].length > 2) {
            return;
        }

        //不能吃
        if (group[idx].length == 0 || group[idx + 1].length == 0 || group[idx + 2].length == 0) {
            //查找起手抓可吃一张变满垮的情况
            var cards = [idx, idx+1, idx+2];
            var zhuaCard = findZhuaCard(card);
            if (zhuaCard && card != zhuaCard) { //防止配牌超过4张
                cards.splice(cards.indexOf(card), 1);
                cards.splice(cards.indexOf(zhuaCard), 1);
                if (group[cards[0]].length == 0) {
                    return;
                }
                bMustDi = true;
            } else {
                return;
            }
        }

        var diCards = [idx, idx+1, idx+2];

        diCards.splice(diCards.indexOf(card), 1);
        diCards.push(card);

        // 抵的牌全是亮牌时.必须抵
        if (!bMustDi) {
            bMustDi = true;

            var other = diCards.slice();
            other.pop();
            //检测这两张吃牌是否全亮
            if (pl.canNotPutCard.indexOf(other[0]) >= 0 ||
                pl.canNotPutCard.indexOf(other[1]) >= 0) {
                bMustDi = false;
            }
        }

        return {cards:diCards, bMustDi:bMustDi};
    }

    PaoHuZiEnShiShaoHu.prototype.getPeng = function(tb, pl, card) {
        if (!card || card < 0) {
            return;
        }
        var cnt = 0;
        for (var i = 0; i < pl.mjhand.length; i++) {
            if (pl.mjhand[i] == card) {
                cnt++;
            }
        }

        if (cnt != 2) {
            return;
        }

        return [card, card, card];
    }

    PaoHuZiEnShiShaoHu.prototype.getShao = function(tb, pl, card) {
        if (!card || card < 0) {
            return;
        }
        var tData = tb.tData;
        if (tData.uids[tData.curPlayer] != pl.uid) {
            //自己摸的牌才能绍
            return;
        }
        var cnt = 0;
        for (var i = 0; i < pl.mjhand.length; i++) {
            if (pl.mjhand[i] == card) {
                cnt++;
            }
        }

        if (cnt != 2) {
            return;
        }

        return [card, card, card];
    }

    PaoHuZiEnShiShaoHu.prototype.getZhua = function(pl, card) {
        var zhua = [];
        var hand = pl.mjhand.slice();
        if (card > 0) {
            hand.push(card);
        }
        var groupCards = this.getGroupCards(hand);
        function ctorGang(cur, other1, other2) {
            var info = null;
            if (cur.length == 4) {
                info = {gang:[], ex:[]};
                info.gang.push(cur[0], cur[0], cur[0], cur[0]);
                if (other1.length > 0 && other1.length < 3) {
                    info.ex.push(other1[0]);
                }
                if (other2.length > 0 && other2.length < 3) {
                    info.ex.push(other2[0]);
                }
            }
            if (info) {
                zhua.push(info);
            }
        }

        for (k in groupCards) {
            var idx = Number(k) * 10 + 1;
            var dict = groupCards[k];
            ctorGang(dict[idx], dict[idx+1], dict[idx+2]);
            ctorGang(dict[idx+1], dict[idx], dict[idx+2]);
            ctorGang(dict[idx+2], dict[idx], dict[idx+1]);
        }
        if (zhua.length == 0) {
            return;
        }
        return zhua;
    }

    // param. card=补垮对应的那张杠牌
    PaoHuZiEnShiShaoHu.prototype.getBuKua = function(pl, card) {
        var hand = pl.mjhand.slice();
        var groupCards = this.getGroupCards(hand);
        var k = this.getGroupIdx(card);
        var group = groupCards[k];
        var idx = Number(k) * 10 + 1;

        function findEx(other1, other2) {
            if (group[other1].length >= 3 || group[other2].length >= 3) {
                return; //补垮不拆3张
            } 
            if (group[other1].length == 0 || group[other2].length == 0){
                return; //必须补满跨
            }
            return [other1, other2];
        }

        if (card == idx) {
            return findEx(idx+1, idx+2);
        } else if (card == idx+1) {
            return findEx(idx, idx+2);
        } else if (card == idx+2) {
            return findEx(idx, idx+1);
        }
    }

    //是否必须抵
    PaoHuZiEnShiShaoHu.prototype.isMustDi = function(tb, pl, card) {
        var diInfo = this.getDi(tb, pl, card);
        if (diInfo) {
            return diInfo.bMustDi;
        }
        return false;
    }

    PaoHuZiEnShiShaoHu.prototype.delCards = function(src, del) {
        for (var i = 0; i < del.length; i++) {
            var idx = src.indexOf(del[i]);
            if (idx >= 0) {
                src.splice(idx, 1);
            }
        }
    }

    //桌面口
    PaoHuZiEnShiShaoHu.prototype.getTableKou = function(pl) {
        var kou = [];
        for (var i = 0; i < pl.mjtie.length; i++) {
            var info = this.calMergeToKua(pl, pl.mjtie[i]);
            if (info.idx == -1) {
                kou.push(pl.mjtie[i].slice());
            }
        }
        return kou;
    }

    /*
        以下3点和产品确认过.
        1.补垮时，能胡优先胡.不补垮 
        2.必须抵时不能胡 由于非必须抵时句子一定是暗牌，暗句不可拆。相当于算胡牌时不拆句子
        3.胡牌逻辑在所有人起手抓的流程之后
        4.能满垮能胡时.4张按抓算，另两张算口(因为垮完可能口不够)
    */
    PaoHuZiEnShiShaoHu.prototype.getAllHuMatrix = function(pl, card) {
        if (this.isMustDi(pl, card)) {
            return [];
        }
        var kou = this.getTableKou(pl).length;
        //console.log('桌面口==', kou);

        var matrix = [];
        var hand = pl.mjhand.slice();
        if (card > 0) {
            hand.push(card);
        }

        var groupCards = this.getGroupCards(hand);
        //console.log(JSON.stringify(groupCards));

        for (k in groupCards) {
            var idx = Number(k) * 10 + 1;
            var dict = groupCards[k];
            for (var t in dict) {
                var c = Number(t);
                if (dict[c].length >= 3) { 
                    matrix.push(dict[c]); 
                    dict[c] = [];
                }
            }

            var cnt1 = dict[idx].length; 
            var cnt2 = dict[idx + 1].length;
            var cnt3 = dict[idx + 2].length;
            var cnt = cnt1 + cnt2 + cnt3;
            if (cnt == 1) { 
                return [];   //牌不成型
            } else if (cnt == 2) {
                //成口.对子也是口
                matrix.push([].concat(dict[idx]).concat(dict[idx + 1]).concat(dict[idx + 2]));
                kou++;
            } else if (cnt == 3) {
                if (cnt1 * cnt2 * cnt3 == 0) {
                    return []; //对+单=牌不成型 
                } 
                //成句
                matrix.push([].concat(dict[idx]).concat(dict[idx + 1]).concat(dict[idx + 2]));
            } else if (cnt == 4) {
                if (cnt1 * cnt2 * cnt3 > 0) {
                    return []; //2单+1对.由于产品要求不拆句.因此落单不成型
                }
                //两对口
                var que = [].concat(dict[idx]).concat(dict[idx + 1]).concat(dict[idx + 2]);
                //去重
                que.splice(1, 2);
                matrix.push(que);
                matrix.push(que);
                kou += 2;
            } else if (cnt == 5) {
                //一句+一口
                var menZi = [idx, idx+1, idx+2];
                matrix.push(menZi);
                dict[idx].splice(0, 1);
                dict[idx + 1].splice(0, 1);
                dict[idx + 2].splice(0, 1);
                var que = [];
                que = [].concat(dict[idx]).concat(dict[idx + 1]).concat(dict[idx + 2]);
                matrix.push(que);
                kou++;
            } else if (cnt > 0) {
                //两句
                var menZi = [idx, idx+1, idx+2];
                matrix.push(menZi);
                matrix.push(menZi);
            }
        }

        if (kou != 2) {
            return [];
        }
        return matrix;
    }

    //获取胡的详细信息
    PaoHuZiEnShiShaoHu.prototype.getHuInfo = function(tb, pl) {
        var card = tb.tData.currCard;
        var cardType = pl.uid == tb.tData.uids[tb.tData.curPlayer] ? 1 : 0;
        var tData = tb.tData;
        var matrix = this.getAllHuMatrix(pl, card);

        var huInfo = {
            huCard:card,
            hardHuXi:0, //胡息
            score:0,
            qiangNum:0,
            handSort:[],
            hzdesc:[],  
        };

        huInfo.hardHuXi = this.getMatrixHuXi(matrix, card, cardType);
        huInfo.hardHuXi += this.getTableHuXi(pl);

        huInfo.handSort = this.getHandSort(tb, matrix, !!cardType);
        huInfo.qiangNum = this.getQiangNum(tb, pl, huInfo.handSort);
        huInfo.hzdesc = this.getHzdesc(tb, pl, matrix, huInfo.hardHuXi);
        huInfo.score = this.getHuScore(tb, pl, matrix, huInfo.hardHuXi, huInfo.qiangNum);
        
        return huInfo;
    };

    PaoHuZiEnShiShaoHu.prototype.getHzdesc = function(tb, pl, matrix, huxi){
        var hzdesc = [];
        if (this.isDaHu(tb, pl, huxi)) {
            hzdesc.push({name:'大胡', desc: ""});
        } else if (this.isSuDaHu(pl, matrix)) {
            hzdesc.push({name:'素大胡', desc: ""});
        }
        return hzdesc;
    };

    PaoHuZiEnShiShaoHu.prototype.getHandSort = function(tb, matrix, isZiMo) {
        var handSort = [];
        var keZiNum = 0;
        function isZhua(cards) {
            if (cards.length != 4) {
                return false;
            }
            return cards[0] == cards[1] && cards[0] == cards[2] && cards[0] == cards[3];
        }
        function isKan(cards) {
            if (cards.length != 3) {
                return false;
            }
            if (cards[0] == cards[1] && cards[0] == cards[2]) {
                if (cards[0] == tb.tData.currCard) {
                    return isZiMo;
                }
                return true;
            }
            return false;
        }
        function isPeng(cards) {
            if (cards.length != 3) {
                return false;
            }
            if (cards[0] == cards[1] && cards[0] == cards[2]
                && cards[0] == tb.tData.currCard && !isZiMo) {
                return true;
            }
            return false;
        }
        function isJu(cards) {
            if (cards.length != 3) {
                return false;
            }
            cards.sort(function(a, b) {
                return a - b;
            })
            return cards[0] == (cards[1] - 1) && cards[0] == (cards[2] - 2);
        }
        function isKou(cards) {
            if (cards.length != 2) {
                return false;
            }
            return Math.abs(cards[1] - cards[0]) <= 2;
        }
        function isKeZi(cards) {
            if (!isZiMo || !isKan(cards)) {
                return false;
            }
            if (cards.indexOf(tb.tData.currCard) >= 0 && keZiNum == 0) {
                keZiNum++;
                return true;
            }
            return false;
        }
        for (var i = 0; i < matrix.length; i++) {
            if (isZhua(matrix[i])) {
                var name = tb.tData.curPlayer == 
                handSort.push({cards:matrix[i], name:(isZiMo ? 'anZhua' : 'mingZhua')});
            } else if (isKeZi(matrix[i])) {
                handSort.push({cards:matrix[i], name:'keZi'}); 
            } else if (isKan(matrix[i])) {
                handSort.push({cards:matrix[i], name:'kan'});
            } else if (isPeng(matrix[i])) {
                handSort.push({cards:matrix[i], name:'mjpeng'});
            } else if (isJu(matrix[i])) {
                handSort.push({cards:matrix[i], name:'ju'});
            } else if (isKou(matrix[i])) {
                handSort.push({cards:matrix[i], name:'kou'});
            }
        }
        return handSort;
    };

    //枪分
    PaoHuZiEnShiShaoHu.prototype.getQiangNum = function(tb, pl, hansSort) {
        var tData = tb.tData;
        var qiangType = tData.areaSelectMode.hongQiangType;
        var qiangNum = 0;

        function calQiangNum(name, isSpecQiang) {
            if (qiangType == 1) { //1是见红枪
                qiangNum += QiangDict[name];
            } else if (qiangType == 2) { //2是夹夹枪
                qiangNum += isSpecQiang ? QiangDict[name] * 2 : QiangDict[name];
            } else if (qiangType == 0) { //0是上七八可
                qiangNum += QiangDict[name] * 2;
            }
        }

        for (var i = 0; i < pl.mjpeng.length; i++) {
            if (this.isQiangCard(tb, pl.mjpeng[i])) {
                calQiangNum('peng', this.isSpecQiangCard(pl.mjpeng[i]));
            }            
        }

        for (var i = 0; i < pl.mjwei.length; i++) {
            if (this.isQiangCard(tb, pl.mjwei[i])) {
                calQiangNum('shao', this.isSpecQiangCard(pl.mjwei[i]));
            }
        }

        for (var i = 0; i < pl.mjgang0.length; i++) {
            if (this.isQiangCard(tb, pl.mjgang0[i].gang[0])) {
                calQiangNum('mingZhua', this.isSpecQiangCard(pl.mjgang0[i].gang[0]));
            }
        }

        for (var i = 0; i < pl.mjgang1.length; i++) {
            if (this.isQiangCard(tb, pl.mjgang1[i].gang[0])) {
                calQiangNum('anZhua', this.isSpecQiangCard(pl.mjgang1[i].gang[0]));
            }
        }

        // 手牌中的碰绍抓也要计算
        if (handSort) {
            for (var i = 0; i < handSort.length; i++) {
                var v = handSort[i];
                if (v.name == 'mjpeng') {
                    if (this.isQiangCard(tb, v.cards[0])) {
                        calQiangNum('peng', this.isSpecQiangCard(v.cards[0]));
                    }
                } else if (v.name == 'kan' || v.name == 'keZi') {
                    if (this.isQiangCard(tb, v.cards[0])) {
                        calQiangNum('shao', this.isSpecQiangCard(v.cards[0]));
                    }
                } else if (v.name == 'anZhua' || v.name == 'mingZhua') {
                    if (this.isQiangCard(tb, v.cards[0])) {
                        calQiangNum(v.name, this.isSpecQiangCard(v.cards[0]));
                    }
                }
            } 
        }

        return qiangNum;
    };

    PaoHuZiEnShiShaoHu.prototype.getHuScore = function(tb, pl, matrix, huxi, qiangNum){
        var score = 0;
        if (this.isDaHu(tb, pl, huxi) || this.isSuDaHu(pl, matrix)) {
            score = 5;
        } else {
            score = 1;
            var remain = huxi - this.getMinHuXi(tb, pl);
            score += Math.floor(remain/5);
        }

        var rate = 1; //1枪1分
        score += qiangNum * rate;
        return score;
    };

    // 判断素大胡
    PaoHuZiEnShiShaoHu.prototype.isSuDaHu = function(pl, matrix) {
        var hasHun = function(list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                for (var j = 0; j < row.length; j++) {
                    if (this.isHun(list[i])) {
                        return true;
                    }
                }
            }
        }.bind(this)

        if (hasHun(pl.mjtie) || hasHun(pl.mjchi) || hasHun(pl.mjpeng) || hasHun(pl.mjpeng)) {
            return false;
        }

        for (var i = 0; i < pl.mjgang0.length; i++) {
            var info = pl.mjgang0[i];
            if (hasHun([info.gang]) || hasHun([info.ex])) {
                return false;
            }
        }

        for (var i = 0; i < pl.mjgang1.length; i++) {
            var info = pl.mjgang1[i];
            if (hasHun([info.gang]) || hasHun([info.ex])) {
                return false;
            }
        }

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix.length; j++) {
                if (this.isHun(matrix[i][j])) {
                    return false; //不能有荤牌
                }
            }
            if (matrix[i].length == 2) {
                if (matrix[i][0] == matrix[i][1]) {
                    return false; //素大胡.口不能是对子
                }
            }
        }
        return true;
    }

    // 判断大胡
    PaoHuZiEnShiShaoHu.prototype.isDaHu = function(tb, pl, huxi) {
        var tData = tb.tData;
        if (tData.uids[tData.zhuang] == pl.uid) {
            //庄家.胡息在27以上. 闲家26
            return huxi >= 27;
        } 
        return huxi >= 26;
    }

    // 起胡胡息
    PaoHuZiEnShiShaoHu.prototype.getMinHuXi = function(tb, pl, isSuDaHu) {
        if (isSuDaHu) {
            return 0; //素大胡无起胡限制.满足牌型即可胡
        }
        var tData = tb.tData;
        if (tData.uids[tData.zhuang] == pl.uid) {
            return 12;
        }
        return 11;
    }

    //param.card.胡的那张牌 cardType.翻牌类型
    PaoHuZiEnShiShaoHu.prototype.getMatrixHuXi = function(matrix, card, cardType) {
        var huxi = 0;
        for (var i = 0; i < matrix.length; i++) {
            var row = matrix[i];
            if (row.length == 4) { //手里最多一组4张同牌
                huxi += this.getKuaHuXi(cardType == 0 ? 'mjgang0' : 'mjgang1', {gang:row, ex:[]}); //按抓算分
            } else if (row.length == 3) {
                if (row[0] == row[1]) {
                    if (row[0] == card) { //胡的那张牌
                        if (cardType == 0) {
                            huxi += this.isHun(row[0]) ? HuXiDict.peng.hun : HuXiDict.peng.su;
                        } else {
                            huxi += this.isHun(row[0]) ? HuXiDict.shao.hun : HuXiDict.shao.su;
                        }
                    } else {
                        huxi += this.isHun(row[0]) ? HuXiDict.shao.hun : HuXiDict.shao.su;
                    }
                } else {
                    huxi += this.isHun(row[0]) ? HuXiDict.di.hun : HuXiDict.di.su;
                }
            } else if (row.length == 2) {
                huxi += this.isHun(row[0]) ? HuXiDict.dan.hun : HuXiDict.dan.su;
                huxi += this.isHun(row[1]) ? HuXiDict.dan.hun : HuXiDict.dan.su;
            }
        }
        return huxi;
    };

    //判断可胡 cardType:1自己摸出 0别人摸出
    PaoHuZiEnShiShaoHu.prototype.canHu = function(tb, pl, card, cardType) {
        var matrix = this.getAllHuMatrix(pl, card);
        if (matrix.length == 0) {
            return false;
        }

        var huxi = this.getTableHuXi(pl) + this.getMatrixHuXi(matrix, card, cardType);
        var isSuDaHu = this.isSuDaHu(pl, matrix);
        return huxi >= this.getMinHuXi(tb, pl, isSuDaHu);
    };

    //荤牌数量
    PaoHuZiEnShiShaoHu.prototype.getHunNum = function(cards) {
        if (!cards || cards.length == 0) {
            return 0;
        }
        var num = 0;
        for (var i = 0; i < cards.length; i++) {
            if (this.isHun(cards[i])) {
                num++;
            }
        }
        return num;
    }

    //计算歪和抓组成垮的情况.能组则返回抓的idx  param.一组歪
    PaoHuZiEnShiShaoHu.prototype.calMergeToKua = function(pl, cards) {
        var mergeInfo = {from:null, idx:-1, ex:[]};
        var calMerge = function(name, list) {
            for (var i = 0; i < list.length; i++) {
                var zhua = list[i];
                if (zhua.ex.length == 0 && this.isSameGroup(zhua.gang[0], cards[0])) {
                    mergeInfo.from = name;
                    mergeInfo.idx = i;
                    mergeInfo.ex = cards.slice();
                    return i;
                }
            }
            return -1;
        }.bind(this)

        var idx = calMerge('mjgang0', pl.mjgang0);
        if (idx == -1) {
            calMerge('mjgang1', pl.mjgang1);
        }
        return mergeInfo;
    }

    //获取垮的胡息 param.from=mjgang0||mjgang1  info={cards:[], ex:[]}
    PaoHuZiEnShiShaoHu.prototype.getKuaHuXi = function(from, info) {
        var isHun = this.isHun(info.gang[0]);
        var name = '';
        if (from == 'mjgang0') {
            name = isHun ? 'hunMing' : 'suMing';
        } else {
            name = isHun ? 'hunAn' : 'suAn';
        }
        var opt = ['zhua', 'banKua', 'manKua'][info.ex.length];
        return HuXiDict[opt][name];
    }

    PaoHuZiEnShiShaoHu.prototype.getTableHuXi = function(pl) {
        var huxi = 0;
        var merges = [];
        var isRepeatMerge = function(info) {
            for (var i = 0; i < merges.length; i++) {
                if (merges[i].idx == info.idx && merges[i].from == info.from) {
                    return true;
                }
            }
            return false;
        }
        for (var i = 0; i < pl.mjtie.length; i++) {
            //是否能组成垮
            var info = this.calMergeToKua(pl, pl.mjtie[i]);
            if (info.idx >= 0 && !isRepeatMerge(info)) { //fix.防止重复合并成满垮
                merges.push(info);
                continue;
            }
            huxi += this.getHunNum(pl.mjtie[i]) * HuXiDict.dan.hun;
        }

        for (var i = 0; i < pl.mjchi.length; i++) {
            var row = pl.mjchi[i].eatCards;
            huxi += this.isHun(row[0]) ? HuXiDict.di.hun : HuXiDict.di.su;
        }

        for (var i = 0; i < pl.mjpeng.length; i++) {
            huxi += this.isHun(pl.mjpeng[i]) ? HuXiDict.peng.hun : HuXiDict.peng.su;
        }

        for (var i = 0; i < pl.mjwei.length; i++) {
            huxi += this.isHun(pl.mjwei[i]) ? HuXiDict.shao.hun : HuXiDict.shao.su;
        }

        var calKuaHuXi = function(from) {
            for (var i = 0; i < pl[from].length; i++) {
                var info = pl[from][i];
                var isMerged = false;
                for (var j = 0; j < merges.length; j++) {
                    if (merges[j].from == from && merges[j].idx == i) {
                        huxi += this.getKuaHuXi(from, {gang:info.gang, ex:merges[j].ex})
                        isMerged = true;
                        break;
                    }
                }
                if (!isMerged) {
                    huxi += this.getKuaHuXi(from, info);
                }
            }
        }.bind(this)
        calKuaHuXi('mjgang0');
        calKuaHuXi('mjgang1');
        return huxi;
    };

    //-----------------前端新增接口start--------------
    PaoHuZiEnShiShaoHu.prototype.sortCard = function(hand, sortType) {
        if (!hand || hand.length <= 0) {
            return [];
        }

        hand = hand.slice();
        hand.sort(function (a, b) {
            return a - b;
        });

        var matrix = [];
        for(var i = 0; i < 8; i++){
            matrix[i] = [];
        }

        for(var i = hand.length - 1; i >= 0; i--){
            var d = Math.floor(hand[i] / 10);
            matrix[d].push(hand[i]);
        }
        return matrix;
    };

    PaoHuZiEnShiShaoHu.prototype.getChiCards = function () {
        var tData = MjClient.data.sData.tData;
        var chiCard = tData.lastPutCard;
        var d = Math.floor(tData.lastPutCard / 10);
        var chiCards = [d * 10 + 1, d * 10 + 2, d * 10 + 3];
        chiCards.splice(chiCards.indexOf(chiCard), 1);
        chiCards.push(chiCard);
        return chiCards;
    };

    //排序.小结算用
    PaoHuZiEnShiShaoHu.prototype.sortEndCard = function(hand, sortLen) {
        var matrix = this.sortCard(hand);
        for(var i = matrix.length - 1; i >= 0; i--){
            if(matrix[i].length == 0){
                matrix.splice(i, 1);
            }else if(matrix[i].length > 6){
                var copy = matrix[i].slice(6, matrix[i].length);
                matrix[i] = matrix[i].slice(0, 6);
                matrix.push(copy);
            }
        }
        while(matrix.length + sortLen > 8){
            var dst = -1;
            var src = -1;
            for(var i = 0; i < matrix.length; i++){
                if(matrix[i].length <= 2){
                    dst = i;
                    break;
                }
            }
            for(var i = matrix.length - 1; i >= 0; i--){
                if(matrix[i].length <= 2){
                    src = i;
                    break;
                }
            }
            if(dst == -1 || src == -1 || dst == src){
                break;
            }else{
                matrix[dst] = matrix[dst].concat(matrix[src]);
                matrix.splice(src, 1);
            }
        }
        matrix.sort(function (a, b) {
            return Math.floor(a[0] / 10) - Math.floor(b[0] / 10);
        });
        var handSort = [];
        for(var i = 0; i < matrix.length; i++){
            handSort.push({name : "kou", cards : matrix[i]});
        }
        return handSort;
    };

    PaoHuZiEnShiShaoHu.prototype.isHunCard = function (card) {
        return [1, 2, 3, 11, 12, 13, 21, 22, 23].indexOf(card) >= 0;
    };

    PaoHuZiEnShiShaoHu.prototype.getAllCardsTotal = function() {
        return 96;
    }

    PaoHuZiEnShiShaoHu.prototype.hintPutCardsToTing = function() {
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
            /*if (pl.canNotPutCard && pl.canNotPutCard.indexOf(card) >= 0) {
                continue;
            }*/
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

    PaoHuZiEnShiShaoHu.prototype.getTingCards = function(tb, pl, putCard) {
        var tingCards = [];
        var stats = this.getTingStats(tb, pl, putCard);
        for (var k in stats) {
            if (stats[k] > 0) {
                tingCards.push(Number(k));
            }
        }
        return tingCards;
    };

    PaoHuZiEnShiShaoHu.prototype.getHandLink = function (tb, pl, putCard) {
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

    PaoHuZiEnShiShaoHu.prototype.getTingStats = function(tb, pl, putCard){
        /*if (pl.canNotPutCard && pl.canNotPutCard.indexOf(putCard) >= 0) {
            return {};
        }*/
        var stats = {};
        for (var uid in tb.players) {
            function add(cd, num) {
                stats[cd] = stats[cd] ? stats[cd] + num : num;
            }

            var p = tb.players[uid];

            for (var i = 0; i < p.mjgang0.length; i++) {
                var cards = p.mjgang0[i].gang.concat(p.mjgang0[i].ex);
                for (var x = 0; x < cards.length; x++) {
                    add(cards[x], 1);
                }
            }

            for (var i = 0; i < p.mjgang1.length; i++) {
                var cards = p.mjgang1[i].gang.concat(p.mjgang1[i].ex);
                if(p.info.uid == pl.info.uid || cards.length > 4){
                    for (var x = 0; x < cards.length; x++) {
                        add(cards[x], 1);
                    }
                }
            }

            if(p.info.uid == pl.info.uid){

                for (var i = 0; i < p.mjwei.length; i++) {
                    add(p.mjwei[i], 3);
                }
            }

            for (var i = 0; i < p.mjpeng.length; i++) {
                add(p.mjpeng[i], 3);
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

            for (var i = 0; i < p.mjtie.length; i++) {
                var chiRow = p.mjtie[i];
                for (var x = 0; x < chiRow.length; x++) {
                    add(chiRow[x], 1);
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
            if(this.canHu(tb, pl, card, 1)){
                var count = 4 - (stats[card] || 0);
                if(count > 0){
                    tingStats[card] = count;
                }
            }
        }
        pl.mjhand = hand;
        return tingStats;
    };
    //-----------------前端新增接口end----------------


    if (typeof(MjClient) != "undefined") {
        MjClient.majiang_enShiShaoHu = new PaoHuZiEnShiShaoHu();
    } 

    //var hand = [31,33,31,32,61,32,11,52,23,41,63,1,13,33,2,53,21,13,2];
    //var hand = [31,21,31,21,61,21,43,52,13,3,22,1,71,31,12,61,23];
    //var arith = new EnShiShaoHu();
    //var ret = arith.sortEndCard(hand);
    //console.log('排序结果=', JSON.stringify(ret));

    /*
    var text = function () {
        var EnShiShaoHu = new EnShiShaoHu();
        //console.log(EnShiShaoHu.menZiList);

        var tb  = {tData : {standardJing : 71, changedJing : 72, minHuxi : 0}};
        var pl = {mjhand :[1, 1, 3, 2, 1], mjchi : [], mjpeng:[/!*11, 12*!/], mjgang0 : [/!*21, 22*!/], mjgang1 : [/!*31*!/]};
        console.log(EnShiShaoHu.canHu(tb, pl));
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
            var info = EnShiShaoHu.canHu(tb, pl, card);
            if(info.canHu){
                console.log(pl.mjhand);
                console.log(card);
                console.log(info);
            }

        }
    };
    text();*/
})();

