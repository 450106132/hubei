// 武穴隔板
(function () {
    function WuXueGeBan() {
        this.handCount = 16;
    }

    var LAI_ZI_SIGN = 100;
    var WANG_POINT = 22;  // 大小王
    var THREE_POINT = 20; // 3
    var EIGHT_POINT = 18; // 8
    var TWO_POINT = 16; // 2
    var APOINT = 14; // A
    var KPOINT = 13; // K
    var MIN_POINT = 3; // 最小的牌
    var MAX_POINT = TWO_POINT; 
    var XIAO_WANG = 53;
    var DA_WANG = 54;
    var CARDTPYE = {
        tianjian: 112,  // 天剑
        wang382a: 111,  // 王三八二A
        zhadan: 110,
        big: 100, // 大牌分界线
        shunzi: 5,
        liandui: 4,
        duizi: 2,
        danpai: 1
    };

    WuXueGeBan.prototype.CARDTPYE = CARDTPYE;
    WuXueGeBan.prototype.APOINT = APOINT;
    WuXueGeBan.prototype.KPOINT = KPOINT;

    var CARDCOUNT = {};
    CARDCOUNT[CARDTPYE.tianjian] = 2;
    CARDCOUNT[CARDTPYE.wang382a] = 5;
    CARDCOUNT[CARDTPYE.zhadan] = 3;
    CARDCOUNT[CARDTPYE.shunzi] = 3;
    CARDCOUNT[CARDTPYE.liandui] = 4;
    CARDCOUNT[CARDTPYE.duizi] = 2;
    CARDCOUNT[CARDTPYE.danpai] = 1;

    var print = function(){
        var str = '';
        for (var i=0; i<arguments.length; i++){
            str  = str + arguments[i] + ' ';
        }

        console.log(str);
    }

    WuXueGeBan.prototype.calPoint = function(num, adjustA2, adjust38) {
        if (!num) { return -1; }

        num = this.removeLaiziSign(num);

        if (this.isLaizi(num))
            return WANG_POINT;

        var ceilNum = Math.ceil(num / 4);
        if (ceilNum == 2 && !adjustA2) {
            return TWO_POINT;
        } else if (ceilNum == 1 && !adjustA2) {
            return APOINT;
        } else if (ceilNum == 3 && adjust38) {
            return THREE_POINT;
        } else if (ceilNum == 8 && adjust38) {
            return EIGHT_POINT;
        } else {
            return ceilNum;
        }
    };

    WuXueGeBan.prototype.randomCards = function (areaSelectMode, tData) {
        var cards = [];

        // 全副54张牌
        for (var i = 1; i <= DA_WANG; i++) {
            cards.push(i);
        }

        shuffleArray(cards);

        return cards;
    };

    WuXueGeBan.prototype.isLaizi = function(card) {
        card = this.removeLaiziSign(card);
        return card == XIAO_WANG || card == DA_WANG;
    };

    /**
     * 判断是否是顺子
     * @param {array} oCards 按点数排好序的牌
     * @return {bool}
     */
    WuXueGeBan.prototype.isShun = function(oCards) {
        if (!oCards || oCards.length < 3)
            return false;

        var cardCount = oCards.length;

        var maxPoint = this.calPoint(oCards[cardCount - 1]);

        if (maxPoint > TWO_POINT)
            return false;

        if (maxPoint == this.calPoint(oCards[cardCount - 2]))
            return false;

        var cards = oCards;
        if (maxPoint == TWO_POINT) {
            // 最大值为2，将2挪到前边
            cards = cards.slice();
            cards.unshift(cards.splice(cardCount - 1,1)[0]);

            if (this.calPoint(cards[cardCount - 1]) == APOINT && this.calPoint(cards[cardCount - 2]) != KPOINT) {
                // 最大牌是A且没有K，则将A也挪到前边
                cards.unshift(cards.splice(cardCount - 1,1)[0]);
            }
        }

        var points = [];
        var minPoint = this.calPoint(cards[0],true,false);
        for (var i = 0; i < cardCount; i++) {
            points.push(this.calPoint(cards[i],minPoint + i < 3,false));
        }
        
        for (var i = 0; i <= cardCount - 2; i ++) {
            if (points[i] != points[i + 1] - 1)
                return false;
        }

        return true;
    };

    /**
     * 判断是否是连对
     * @param {array} oCards 按点数排好序的牌
     * @return {bool}
     */
    WuXueGeBan.prototype.isLiandui = function(oCards) { //oCards有序
        var cardNum = CARDCOUNT[CARDTPYE.liandui];// 连对最小牌数

        if (!oCards || oCards.length < cardNum || oCards.length % 2 != 0)
            return false;

        var cardCount = oCards.length;

        // 判断牌中是否有2，有2需要校正A、2的点数
        var adjustA2 = false;
        for (var i = cardCount - 1; i >= 0; i--) {
            if (this.calPoint(oCards[i]) == TWO_POINT) {
                adjustA2 = true;
                break;
            }
        }

        var cards = oCards;
        if (adjustA2) {
            // 有2需要重排牌
            cards = cards.slice();
            this.sortCards(cards,adjustA2,false);
        }

        var points = [];
        for (var i = 0; i < cardCount; i++) {
            points.push(this.calPoint(cards[i],adjustA2,false));
        }

        for (var i = 0; i < cardCount - 2; i += 2) {
            var abs = Math.abs(points[i] - points[i + 2]);
            if ( abs != 1 || (points[i + 1] != points[i]) ||  (points[i + 2] != points[i + 3]) )  return false;
        }

        return true;
    };

    /**
     * 判断是否是王三八二A
     * @param {array} oCards 按点数排好序的牌
     * @return {bool}
     */
    WuXueGeBan.prototype.isWang382A = function(oCards) { //oCards有序
        if (!oCards || oCards.length != CARDCOUNT[CARDTPYE.wang382a])
            return false;

        var cards = oCards.slice();
        this.sortCards(cards,false,true);

        var cardCount = cards.length;
        var targets = [APOINT,TWO_POINT,EIGHT_POINT,THREE_POINT,WANG_POINT];
        for (var i = 0; i < cardCount; i++) {
            if (this.calPoint(cards[i],false,true) != targets[i])
                return false;
        }

        return true;
    };

    /** 剔除癞子
     * @param {array} oCards [in] 
     * @param {array} cards [out] 剔除癞子后的按点数据序的牌
     * @return {number} 返回癞子数
     */
    WuXueGeBan.prototype.transformAndGetLaizi = function(oCards, cards) {
        var laizis = [];
        for (var i = 0; i < oCards.length; i++) {
            if (this.isLaizi(oCards[i]))
                laizis.push(oCards[i]);
            else
                cards.push(oCards[i]);
        }
        cards.sort(this.cardValueCmp.bind(this));
        return laizis;
    };

    /** 
     * 用laizi张癞子去拼出type牌型的牌
     * @param {array} hands 按点数按好序的牌
     * @param {array} laizis 所使用的癞子
     * @param {CARDTPYE} type 要拼出的牌型
     * @param {number} 目的牌张数
     */
    WuXueGeBan.prototype.findCardByType = function(hands, laizis, type, cardCount) {
        var rets = [];
        var laizi = laizis.length;

        if ((type == CARDTPYE.duizi || type == CARDTPYE.danpai || type == CARDTPYE.wang382a) && cardCount != CARDCOUNT[type])
            return rets;

        if (type == CARDTPYE.zhadan && cardCount != CARDCOUNT[type] && cardCount != CARDCOUNT[type] + 1)
            return rets;

        if (laizi > cardCount || laizi + hands.length < cardCount || cardCount < CARDCOUNT[type]) {
            return rets;
        }

        var pushRets = function(rets, cards) {
            if (cards.length != cardCount)
                return;

            if (this.transformAndGetLaizi(cards,[]).length + this.getLaiziCardsFromRet(cards).length != laizi)
                return;

            for (var i = 0; i < rets.length; i++) {
                var j = 0;
                for (; j < cards.length; j++) {
                    if (rets[i].indexOf(cards[j]) < 0)
                        break;
                }
                if (j == cards.length)
                    return;
            }

            rets.push(cards);
        }.bind(this);

        if (type == CARDTPYE.tianjian) { 
            if (laizi == 2 && cardCount == 2) {
                // 天剑
                pushRets(rets,laizis.slice());
            }
        }
        else if (type == CARDTPYE.wang382a) {
            if (laizi == 0)
                return rets;

            var findWang382A = function(rets,wang,newHands) {
                var ret = [wang];

                var targets = [3,8,TWO_POINT,APOINT];

                for (var i = 0; i < targets.length; i++) {
                    var find = this.findNSameCard(newHands, targets[i], 1);

                    if (!find)
                        return;

                    ret = ret.concat(find);
                }

                pushRets(rets,ret);

            }.bind(this); 

            if (laizi == 1) {
                findWang382A(rets,laizis[0],hands);
            } else {
                var replacePoints = [3,8,2,1];
                var xiaoWang = Math.min(laizis[0],laizis[1]);
                var daWang = Math.max(laizis[0],laizis[1]);

                for (var m = 0; m < laizi; m++) {
                    var firstWang = m == 0 ? xiaoWang : daWang;
                    var secondWang = m == 0 ? daWang : xiaoWang;

                    for (var n = 0; n < replacePoints.length; n++) {
                        var newHands = hands.slice();

                        if (secondWang == XIAO_WANG)
                            newHands.push(this.addLaiziSign(replacePoints[n] * 4));
                        else
                            newHands.push(this.addLaiziSign(replacePoints[n] * 4 - 1));

                        newHands.sort(this.cardValueCmp.bind(this));

                        findWang382A(rets,firstWang,newHands);
                    }
                }
            }
        }
        else if (type == CARDTPYE.zhadan || type == CARDTPYE.duizi) { 
            if (type == CARDTPYE.duizi && laizi == 2)
                return rets;

            for (var i = 4; i <= THREE_POINT; i++) {
                var find = this.findNSameCard(hands, i, cardCount - laizi, false, true);

                if (find) {
                    if (laizi > 0) {
                        var cardsTransfered = [];

                        for (var j = 0; j < laizi; j++) {
                            var realPoint = i;

                            if (realPoint == APOINT)
                                realPoint = 1;
                            else if (realPoint == TWO_POINT)
                                realPoint = 2;
                            else if (realPoint == EIGHT_POINT)
                                realPoint = 8;
                            else if (realPoint == THREE_POINT)
                                realPoint = 3;

                            if (laizis[j] == XIAO_WANG)
                                cardsTransfered.push(this.addLaiziSign(realPoint * 4));
                            else
                                cardsTransfered.push(this.addLaiziSign(realPoint * 4 - 1));
                        }

                        pushRets(rets,cardsTransfered.concat(find));
                    } else
                        pushRets(rets,find);
                }
            }
        }
        else if (type == CARDTPYE.liandui) {
            var findLianDui = function(rets,newHands,aCountLimit) {
                for (var i = 1; i <= APOINT - cardCount/2 + 1; i++) // 连对首张
                {
                    var ldCount = 0;
                    var ret = [];
                    var aCount = 0;

                    for (var j = 0; j < cardCount/2; j++) 
                    {
                        var p = i + j;

                        for (var k = 0; k < newHands.length - 1; k++) 
                        {
                            var point1 = this.calPoint(newHands[k],p < 3,false);
                            var point2 = this.calPoint(newHands[k + 1],p < 3,false);

                            if (point1 != p || point2 != p)
                                continue;

                            if (p == 1 || p == APOINT) {
                                if (aCount + 2 > aCountLimit)
                                    continue;
                                else
                                    aCount += 2;
                            }

                            ldCount += 2;
                            ret.push(newHands[k]);
                            ret.push(newHands[k + 1]);

                            break;
                        }
                    }

                    if (ldCount == cardCount) {
                        pushRets(rets,ret);
                    }
                }
            }.bind(this);

            var addAArrayToLast = function(newHands) {
                // 如果有A，再将A放后边
                if (this.calPoint(newHands[0]) == APOINT) {
                    var aArray = [newHands[0]];

                    for (var k = 1; k < newHands.length; k++) {
                        if (this.calPoint(newHands[k]) == APOINT)
                            aArray.push(newHands[k]);
                        else
                            break;
                    }

                    newHands = newHands.concat(aArray);

                    return aArray.length;
                }

                return 0;
            }.bind(this);
            
            // 1、2排前边
            var handsCopy = hands.slice();
            this.sortCards(handsCopy,true,false);

            if (laizi > 0) {
                var minPoint = Math.max(this.calPoint(handsCopy[0],true,false) - 1,1);
                var maxPoint = Math.min(this.calPoint(handsCopy[handsCopy.length - 1],false,false) + 1,APOINT);

                if (laizi == 1) {
                    // 一个癞子
                    for (var m = minPoint; m <= maxPoint; m++) {
                        var newHands = hands.slice();
                        var realPoint = m == APOINT ? 1 : m;

                        newHands.push(laizis[0] == XIAO_WANG ? this.addLaiziSign(realPoint * 4) : this.addLaiziSign(realPoint * 4 - 1));

                        this.sortCards(newHands,true,false);
                        findLianDui(rets,newHands,addAArrayToLast(newHands));
                    }
                } else {
                    // 两个癞子
                    for (var m = minPoint; m <= maxPoint; m++) {
                        for (var n = minPoint; n <= maxPoint; n++) {
                            var newHands = hands.slice();

                            newHands.push(this.addLaiziSign((m == APOINT ? 1 : m) * 4));
                            newHands.push(this.addLaiziSign((n == APOINT ? 1 : n) * 4 - 1));

                            this.sortCards(newHands,true,false);
                            findLianDui(rets,newHands,addAArrayToLast(newHands));
                        }
                    }
                }
            } else {
                findLianDui(rets,handsCopy,addAArrayToLast(handsCopy));
            }
        }
        else if (type == CARDTPYE.shunzi) {
            var findCardByPoint = function(newHands,point,adjustA2, adjust38) {
                for (var i = 0; i < newHands.length; i++) {
                    if (this.calPoint(newHands[i], adjustA2, adjust38) == point) {
                        return newHands.splice(i,1)[0];
                    }
                }

                return null
            }.bind(this);

            var findShunZi = function(rets,newHands,aCountLimit) {
                for (var i = 1; i <= APOINT - cardCount + 1; i++) { // 顺子首张
                    var shun = [];
                    var aCount = 0;
                    var handsCopy = newHands.slice();

                    for (var j = 0; j < cardCount; j++) {
                        var p = i + j;

                        var find = findCardByPoint(handsCopy, p, p < 3, false);

                        // if ((p-1) == KPOINT)  // 如果上张牌是K ,需要考虑计算A
                        //     find = this.findCardByPoint(newHands, APOINT);

                        if (!find)
                            continue;

                        if (p == 1 || p == APOINT) {
                            if (aCount + 1 > aCountLimit)
                                continue;
                            else
                                aCount += 1;
                        }

                        shun.push(find);
                    }

                    if (shun.length == cardCount)
                        pushRets(rets,shun);
                }
            }.bind(this);

            var addAArrayToLast = function(newHands) {
                // 如果有A，再将A放后边
                if (this.calPoint(newHands[0]) == APOINT) {
                    var aArray = [newHands[0]];

                    for (var k = 1; k < newHands.length; k++) {
                        if (this.calPoint(newHands[k]) == APOINT)
                            aArray.push(newHands[k]);
                        else
                            break;
                    }

                    newHands = newHands.concat(aArray);

                    return aArray.length;
                }

                return 0;
            }.bind(this);

            // 1、2排前边
            var handsCopy = hands.slice();
            this.sortCards(handsCopy,true,false);
            
            if (laizi > 0) {
                var minPoint = Math.max(this.calPoint(handsCopy[0],true,false) - laizi,1);
                var maxPoint = Math.min(this.calPoint(handsCopy[handsCopy.length - 1],false,false) + laizi,APOINT);

                if (laizi == 1) {
                    // 一个癞子
                    for (var m = minPoint; m <= maxPoint; m++) {
                        var newHands = hands.slice();
                        var realPoint = m == APOINT ? 1 : m;

                        newHands.push(laizis[0] == XIAO_WANG ? this.addLaiziSign(realPoint * 4) : this.addLaiziSign(realPoint * 4 - 1));

                        this.sortCards(newHands,true,false);
                        findShunZi(rets,newHands,addAArrayToLast(newHands));
                    }
                } else {
                    // 两个癞子
                    for (var m = minPoint; m <= maxPoint; m++) {
                        for (var n = minPoint; n < maxPoint; n++) {
                            var newHands = hands.slice();

                            newHands.push(this.addLaiziSign((m == APOINT ? 1 : m) * 4));
                            newHands.push(this.addLaiziSign(n * 4 - 1));

                            this.sortCards(newHands,true,false);
                            findShunZi(rets,newHands,addAArrayToLast(newHands));
                        }
                    }
                }
            } else {
                findShunZi(rets,handsCopy,addAArrayToLast(handsCopy));
            }
        }
        else if (type == CARDTPYE.danpai) {
            if (laizi < 1) {
                var newHands = hands.slice();
                this.sortCards(newHands,false,true);

                for (var i = 4; i <= THREE_POINT; i++) 
                {
                    for (var j = 0; j < newHands.length; j++) {
                        if (this.calPoint(newHands[j],false,true) == i) {
                            pushRets(rets,[newHands[j]]);
                            break;
                        }
                    }
                }
            } else {
                pushRets(rets,[laizis[0]]);
            }
        }

        return rets;
    };

    WuXueGeBan.prototype.calType = function (oCards) {
        if (!oCards) {
            return -1;
        }

        var cards = oCards.slice();
        cards.sort(this.cardValueCmp.bind(this));

        var cardCount = cards.length;
        var allSame = this.calPoint(cards[0]) == this.calPoint(cards[cards.length - 1]);

        var pointCounts = {};
        for (var i = 0; i < cards.length; i++) {
            var p = this.calPoint(cards[i]);
            if (pointCounts[p]) {
                pointCounts[p]++;
            }
            else {
                pointCounts[p] = 1;
            }
        }
        var maxCount = 0; // 最多有几张点数最多的牌
        for (var p in pointCounts) {
            if (maxCount < pointCounts[p]) {
                maxCount = pointCounts[p];
            }
        }

        // 顺子
        if (cardCount >= CARDCOUNT[CARDTPYE.shunzi] && this.isShun(cards))
            return CARDTPYE.shunzi;

        // 连对
        if (cardCount >= CARDCOUNT[CARDTPYE.liandui] && maxCount == 2 && this.isLiandui(cards))
            return CARDTPYE.liandui;

        // 炸弹
        if (cardCount >= CARDCOUNT[CARDTPYE.zhadan] && allSame)
            return CARDTPYE.zhadan;

        // 王三八二A
        if (cardCount == 5 && maxCount == 1 && this.isWang382A(cards))
            return CARDTPYE.wang382a;

        // 天剑
        if (cardCount == 2 && this.isLaizi(cards[0]) && this.isLaizi(cards[1]))
            return CARDTPYE.tianjian;

        // 对子
        if (cardCount == 2 && allSame)
            return CARDTPYE.duizi;

        // 单牌
        if (cardCount == 1)
            return CARDTPYE.danpai;

        return -1;
    };

    WuXueGeBan.prototype.cardsType = function(oCards) {
        return this.calType(oCards);
    }

    // 计算牌型点数
    WuXueGeBan.prototype.calCardsValue = function (oCards,cardType) {
        if (!oCards || oCards.length == 0) {
            return -1;
        }

        if (cardType == CARDTPYE.zhadan || cardType == CARDTPYE.danpai || cardType == CARDTPYE.duizi) {
            return this.calPoint(oCards[oCards.length - 1],false,true);
        } 
        else if (cardType == CARDTPYE.liandui) {
            // 判断牌中是否有2，有2需要校正A、2的点数
            var adjustA2 = false;
            for (var i = oCards.length - 1; i >= 0; i--) {
                if (this.calPoint(oCards[i]) == TWO_POINT) {
                    adjustA2 = true;
                    break;
                }
            }

            var cards = oCards;
            if (adjustA2) {
                cards = cards.slice();
                this.sortCards(cards,adjustA2,false);
            }
            
            return this.calPoint(cards[cards.length - 1],adjustA2,false);
        } else if (cardType == CARDTPYE.shunzi) {
            var cardCount = oCards.length;
            var maxPoint = this.calPoint(oCards[cardCount - 1]);

            if (maxPoint == TWO_POINT) {
                // 最大值为2，将2挪到前边
                var cards = oCards.slice();
                cards.unshift(cards.splice(cardCount - 1,1)[0]);

                if (this.calPoint(cards[cardCount - 1]) == APOINT && this.calPoint(cards[cardCount - 2]) != KPOINT) {
                    // 最大牌是A且没有K，则将A也挪到前边
                    cards.unshift(cards.splice(cardCount - 1,1)[0]);
                }

                return this.calPoint(cards[cardCount - 1]);
            }
        }

        return this.calPoint(oCards[oCards.length - 1]);
    };

    // 牌点比较函数
    WuXueGeBan.prototype.cardValueCmp = function (a, b) {
        var pa = this.calPoint(a);
        var pb = this.calPoint(b);

        if (pa == pb) {
            return this.removeLaiziSign(a) - this.removeLaiziSign(b);
        }
        return pa - pb;
    };

    // 牌点比较函数（从小到大）
    WuXueGeBan.prototype.sortCards = function (oCards, adjustA2, adjust38, bReverse) {
        var sortFunc = function (a, b) {
            var pa = this.calPoint(a,adjustA2,adjust38);
            var pb = this.calPoint(b,adjustA2,adjust38);

            if (pa == pb) {
                return this.removeLaiziSign(a) - this.removeLaiziSign(b);
            }
            return pa - pb;
        }.bind(this);

        if (bReverse) {
            oCards.sort(function(a, b) {
                return -sortFunc(a, b);
            });
        }
        else
            oCards.sort(sortFunc);
    };

    // 牌是否能压上
    WuXueGeBan.prototype.canPut = function (oCards, oLastCards) {
        var cards = oCards.slice();

        cards.sort(this.cardValueCmp.bind(this));
        var cType = this.calType(cards);

        if (cType == -1) {
            return false;
        }

        if (!oLastCards || oLastCards == -1) {
            return true; // 没有上次打的牌，三家过自己再出牌
        }

        if ((cType == CARDTPYE.shunzi || cType == CARDTPYE.liandui) && oCards.length != oLastCards.length)
            return false;
        
        var lastCards = oLastCards.slice();
        lastCards.sort(this.cardValueCmp.bind(this));
        var lastCType = this.calType(lastCards);

        if (cType == lastCType) {
            if (cards.length == lastCards.length) {
                if (cType == CARDTPYE.wang382a || (cType == CARDTPYE.danpai && (this.isLaizi(cards[0]) || this.isLaizi(lastCards[0]))))
                    return cards[cards.length - 1] > lastCards[lastCards.length - 1];
                else
                    return this.calCardsValue(cards,cType) > this.calCardsValue(lastCards,cType);
            } else if (cType == CARDTPYE.zhadan) { // 炸弹张数多的较大
                return cards.length > lastCards.length;
            }
        } else if (cType > CARDTPYE.big && cType > lastCType) {
            return true;
        }

        return false;
    };

    // 检查是否能出牌
    WuXueGeBan.prototype.checkPut = function (oHands, oCards, lastPutCard) {
        if (oCards && typeof(oCards)!='undefined' && oCards.length == 0) return null;

        var hands = oHands.slice();
        for (var i = 0; i < oCards.length; i++) {
            var p = hands.indexOf(oCards[i]);

            if (p >= 0) {
                hands.splice(p, 1);
            }
            else {
                p = hands.indexOf(this.getRealLaizi(oCards[i]));

                if (p >= 0) {
                    // 癞子
                    hands.splice(p, 1);
                }
                else
                    return null; // 手里没有这些牌
            }
        }

        if (this.canPut(oCards, lastPutCard)) {
            return hands; // 能打得过上家的牌
        }

        return null;
    };

    // 找N张点数一样的牌
    WuXueGeBan.prototype.findNSameCard = function (hands, point, n, adjustA2, adjust38) {
        for (var i = 0; i < hands.length; i++) {
            if (this.calPoint(hands[i], adjustA2, adjust38) == point && 
                this.calPoint(hands[i + n - 1], adjustA2, adjust38) == point) {
                return hands.slice(i, i + n);
            }
        }
        return null;
    };

    /**
     * 对手牌排序
     * @param {array} 
     * @param {number} sortType 1 = 花色排序, 2 = 张数排序, 0 ==普通牌型
     */
    WuXueGeBan.prototype.sortHandCards = function(oCards, sortType) {
        var cards = oCards.slice();
        var commonCmp = this.cardValueCmp.bind(this);
        var cardValueCmp = this.cardValueCmp.bind(this);
        if (sortType == 1) { // 花色排序
            commonCmp = function (a, b) {
                var c1 = (a + 3) % 4;
                var c2 = (b + 3) % 4;
                if (c1 == c2)
                    return cardValueCmp(a, b);
                else
                    return c1 - c2;
            }.bind(this);
        }
        else if (sortType == 2) { // 张数排序
            var pointCounts = {};
            for (var i = 0; i < cards.length; i++) {
                var p = this.calPoint(cards[i]);
                if (pointCounts[p])
                    pointCounts[p] ++;
                else
                    pointCounts[p] = 1;
            }

            commonCmp = function (a, b) {
                var c1 = pointCounts[this.calPoint(a)];
                var c2 = pointCounts[this.calPoint(b)];
                if (c1 == c2)
                    return cardValueCmp(a, b);
                else
                    return c1 - c2;
            }.bind(this);
        }

        cards.sort(function(a, b) {
            return -commonCmp(a, b);
        });
        return cards;
    };

    WuXueGeBan.prototype.tipCards = function(oHands, oLastCards) {
        return [];
    };

    /**
     * 从一组提示中找到由癞子代替的牌
     * @param {array} ret 一组结果
     */
    WuXueGeBan.prototype.getLaiziCardsFromRet = function(ret) {
        if (!ret || ret.length <= 0)
            return [];

        var laiziCards = [];

        for (var i = 0; i < ret.length; i++) {
            if (this.haveLaiziSign(ret[i]))
                laiziCards.push(ret[i]);
        }

        return laiziCards;
    };

    /**
     * 由癞子代替的牌，返回真正的癞子
     * @param {number} laiziCard 牌值
     */
    WuXueGeBan.prototype.getRealLaizi = function(laiziCard) {
        if (!laiziCard)
            return -1;

        if (!this.haveLaiziSign(laiziCard))
            return -1;

        laiziCard = this.removeLaiziSign(laiziCard);

        if (laiziCard % 4 == 0)
            return XIAO_WANG;
        else if (laiziCard % 4 == 3)
            return DA_WANG;

        return -1;
    };

    /**
     * 对双癞子查找结果去重
     * @param {array} rets 结果
     */
     WuXueGeBan.prototype.removeSameResults = function(rets) {
        var pointsCache = {};
        for (var i = 0; i < rets.length;) {
            var ret = rets[i].slice();

            ret.sort(this.cardValueCmp.bind(this));

            var pointStr = ""
            for (var j = 0; j < ret.length; j++) {
                pointStr += this.calPoint(ret[j]) + "_";
            }

            if (pointsCache[pointStr])
                rets.splice(i,1);
            else {
                i++;

                pointsCache[pointStr] = true;
            }
        }
    };

    /**
     * 给牌值加上癞子标记
     * @cardValue {number} 
     */
    WuXueGeBan.prototype.addLaiziSign = function(cardValue) {
        return cardValue + LAI_ZI_SIGN;
    }

    /**
     * 给牌值去掉癞子标记
     * @cardValue {number} 
     */
    WuXueGeBan.prototype.removeLaiziSign = function(cardValue) {
        return cardValue % LAI_ZI_SIGN;
    }

    /**
     * 是否带有癞子标记
     * @cardValue {number} 
     */
    WuXueGeBan.prototype.haveLaiziSign = function(cardValue) {
        if (cardValue <= 0)
            return false;

        return cardValue > LAI_ZI_SIGN;
    }

    if (typeof (module) != "undefined" && module.exports)
        module.exports = WuXueGeBan;
    if (typeof (MjClient) != "undefined")
        MjClient.majiang_WuXueGeBan = new WuXueGeBan();
})();