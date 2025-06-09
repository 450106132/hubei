
(function() {
    ///////////////////////连云港的十三幺牌型（传说中的大乱）/////////////////////////
    var p133 = [
        [1, 4, 7],[2, 5, 8],[3, 6, 9],
        [11, 14, 17],[12, 15, 18],[13, 16, 19],
        [21, 24, 27],[22, 25, 28],[23, 26, 29]
    ];
    var p131 = [31, 41, 51, 61, 71, 81, 91, 200];
    ///////////////////////////////////////////////////////////////////////////
    var majiang = {};
    /**
     * 标准十三幺牌型（连云港的十三幺不是这样的）
     * 　1饼、9饼、1索、9索、1万、9万、东、南、西、北、中、发、白十三种牌统称幺九牌。
     * 	 这十三种牌某一种有两枚，而另十二种各一枚，共计十四枚，即构成十三幺。
     */
    // var s13 = [1, 9, 11, 19, 21, 29, 31, 41, 51, 61, 71, 81, 91];
    var flowerArray = [];//花的列表，根据不同来设置

    // function checkLink(a, b)
    // {
    //     return (a + 1 == b || a == b);
    // }

    // //克隆牌
    // function cloneCard(cds) {
    //     var arr = [];
    //     for (var i = 0; i < cds.length; i++) {
    //         arr.push(cds[i]);
    //     }
    //     return arr;
    // }

    // // 比对3
    // function checkMath3(cds, i)
    // {
    //     if(i + 2 >= cds.length)
    //     {
    //         return false;
    //     }

    //     var pat = [[0, 0, 0], [0, 1, 2]];
    //     for(var j = 0; j < pat.length; j++)
    //     {
    //         var pj = pat[j];
    //         for(var k = 0; k < pj.length; k++)
    //         {
    //             if(pj[k] + cds[i] != cds[k + i])
    //             {
    //                 break;
    //             }

    //             if(k == pj.length - 1)
    //             {
    //                 return true;
    //             }
    //         }
    //     }

    //     return false;
    // }



    // //比对6
    // function checkMath6(cds, i)
    // {
    //     if(i + 5 >= cds.length)
    //     {
    //         return false;
    //     }

    //     var pat = [[0, 0, 1, 1, 2, 2], [0, 1, 1, 2, 2, 3], [0, 1, 1, 1, 1, 2]];
    //     for(var j = 0; j < pat.length; j++)
    //     {
    //         var pj = pat[j];
    //         for(var k = 0; k < pj.length; k++)
    //         {
    //             if(pj[k] + cds[i] != cds[k + i])
    //             {
    //                 break;
    //             }

    //             if(k == pj.length - 1)
    //             {
    //                 return true;
    //             }
    //         }
    //     }

    //     return false;
    // }



    // //比对9
    // function checkMath9(cds, i)
    // {
    //     if(i + 8 >= cds.length)
    //     {
    //         return false;
    //     }

    //     var pat = [[0, 1, 1, 2, 2, 2, 3, 3, 4], [0, 1, 1, 1, 2, 2, 2, 3, 3], [0, 0, 1, 1, 1, 2, 2, 2, 3]];
    //     for(var j = 0; j < pat.length; j++)
    //     {
    //         var pj = pat[j];
    //         for(var k = 0; k < pj.length; k++)
    //         {
    //             if(pj[k] + cds[i] != cds[k + i])
    //             {
    //                 break;
    //             }

    //             if(k == pj.length - 1)
    //             {
    //                 return true;
    //             }
    //         }
    //     }

    //     return false;
    // }


    // // 比对12
    // function checkMath12(cds, i)
    // {
    //     if(i + 11 >= cds.length)
    //     {
    //         return false;
    //     }

    //     var pat = [[0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5], [0,1,1,2,2,2,2,3,3,3,4,4], [0,0,1,1,1,2,2,2,2,3,3,4]];
    //     for(var j = 0; j < pat.length; j++)
    //     {
    //         var pj = pat[j];
    //         for(var k = 0; k < pj.length; k++)
    //         {
    //             if(pj[k] + cds[i] != cds[k + i])
    //             {
    //                 break;
    //             }

    //             if(k == pj.length - 1)
    //             {
    //                 return true;
    //             }
    //         }
    //     }

    //     return false;
    // }


    // //是否是2，5，8
    // function isCard258(card)
    // {
    //     switch(card)
    //     {
    //         case 2:
    //         case 12:
    //         case 22:
    //         case 5:
    //         case 15:
    //         case 25:
    //         case 8:
    //         case 18:
    //         case 28:
    //             return true;
    //     }

    //     return false;
    // }






    // var MJPAI_HUNMAX = 4;//混子数量
    // var needMinHunNum = MJPAI_HUNMAX;
    // //计算成为一个顺子或者刻字需要的混子数量
    // function calBePuHunNum(typeVec, needNum)
    // {
    //     var p1, p2, p3;
    //     if(needMinHunNum == 0)
    //     {
    //         return;
    //     }

    //     if(needNum >= needMinHunNum)
    //     {
    //         return;
    //     }

    //     var vSize = typeVec.length;
    //     if(vSize == 0)
    //     {
    //         needMinHunNum = needNum > needMinHunNum ? needMinHunNum : needNum;
    //         return;
    //     }

    //     else if(vSize == 1)
    //     {
    //         needMinHunNum = (needNum + 2) > needMinHunNum ? needMinHunNum : (needNum + 2);
    //         return;
    //     }

    //     else if(vSize == 2)
    //     {
    //         p1 = typeVec[0];
    //         p2 = typeVec[1];

    //         if(p2 - p1 < 3)
    //         {
    //             needMinHunNum = (needNum + 1) > needMinHunNum ? needMinHunNum : (needNum + 1);
    //         }
    //         else
    //         {
    //             needMinHunNum = (needNum + 4) > needMinHunNum ? needMinHunNum : (needNum + 4);
    //         }

    //         return;
    //     }


    //     //大于等于3张牌
    //     p1 = typeVec[0];
    //     p2 = typeVec[1];
    //     p3 = typeVec[2];
    //     var k2 = 1;
    //     var k3 = 2;

    //     //第一个自己一扑
    //     if(needNum + 2 < needMinHunNum)
    //     {
    //         typeVec.splice(0, 1);
    //         calBePuHunNum(typeVec, needNum + 2);
    //         typeVec.splice(0, 0, p1);
    //     }

    //     //第一个跟其它的一个一扑
    //     if(needNum + 1 < needMinHunNum)
    //     {
    //         for(var i = 1; i < typeVec.length; i++)
    //         {
    //             if(needNum + 1 >= needMinHunNum)
    //             {
    //                 break;
    //             }

    //             p2 = typeVec[i];
    //             k2 = i;
    //             //455567这里可结合的可能为 45 46 否则是45 45 45 46
    //             //如果当前的value不等于下一个value则和下一个结合避免重复
    //             if(i + 1 != typeVec.length)
    //             {
    //                 p3 = typeVec[i + 1];
    //                 k3 = i + 1;
    //                 if(p3 == p2)
    //                 {
    //                     continue;
    //                 }
    //             }

    //             if(p2 - p1 < 3)
    //             {
    //                 typeVec.splice(0, 1);
    //                 typeVec.splice(k2 - 1, 1);

    //                 calBePuHunNum(typeVec, needNum + 1);
    //                 typeVec.splice(k2 - 1, 0, p2);
    //                 typeVec.splice(0, 0, p1);
    //             }
    //             else
    //             {
    //                 break;
    //             }
    //         }
    //     }

    //     //第一个和其它两个一扑
    //     //后面间隔两张张不跟前面一张相同222234
    //     //可能性为222 234
    //     for(var ii = 1; ii < typeVec.length; ii++)
    //     {
    //         if(needNum >= needMinHunNum)
    //         {
    //             break;
    //         }

    //         p2 = typeVec[ii];
    //         k2 = ii;
    //         if(ii + 2 < typeVec.length)
    //         {
    //             if(typeVec[ii + 2] == p2)
    //             {
    //                 continue;
    //             }
    //         }

    //         for(var j = ii + 1; j < typeVec.length; j++)
    //         {
    //             if(needNum >= needMinHunNum)
    //             {
    //                 break;
    //             }

    //             p3 = typeVec[j];
    //             k3 = j;

    //             if(j + 1 < typeVec.length)
    //             {
    //                 if(p3 == typeVec[j + 1])
    //                 {
    //                     continue;
    //                 }
    //             }

    //             var tempSeg = [p1, p2, p3];
    //             if(checkMatchSeq(tempSeg))
    //             {
    //                 typeVec.splice(0, 1);
    //                 typeVec.splice(k2 - 1, 1);
    //                 typeVec.splice(k3 - 2, 1);

    //                 calBePuHunNum(typeVec, needNum);
    //                 typeVec.splice(k3 - 2, 0, p3);
    //                 typeVec.splice(k2 - 1, 0, p2);
    //                 typeVec.splice(0, 0, p1);
    //             }
    //         }
    //     }
    // }


    // function checkHunHu(hunNum, m_HuPaiVec, with258)
    // {
    //     var huSize = m_HuPaiVec.length;
    //     if(huSize <= 0)
    //     {
    //         if(hunNum >= 2)
    //         {
    //             return true;
    //         }
    //         else
    //         {
    //             return false;
    //         }
    //     }

    //     var huPaiCopy = [];
    //     for(var i = 0; i < m_HuPaiVec.length; i++)
    //     {
    //         huPaiCopy.push(m_HuPaiVec[i]);
    //     }

    //     for(var it = 0; it < huPaiCopy.length; it++)
    //     {
    //         if(it == huPaiCopy.length - 1)
    //         {
    //             if(hunNum > 0)
    //             {
    //                 hunNum = hunNum - 1;
    //                 var pairCard = huPaiCopy[it];
    //                 m_HuPaiVec.splice(it, 1);
    //                 needMinHunNum = MJPAI_HUNMAX;
    //                 calBePuHunNum(m_HuPaiVec, 0);
    //                 if (needMinHunNum <= hunNum)
    //                 {
    //                     if (with258)
    //                     {
    //                         if(isCard258(pairCard))
    //                         {
    //                             return true;
    //                         }
    //                     }
    //                     else
    //                     {
    //                         return true;
    //                     }
    //                 }

    //                 hunNum = hunNum + 1;
    //                 m_HuPaiVec.splice(it, 0, pairCard);
    //             }
    //         }
    //         else
    //         {
    //             if((it + 2 == huPaiCopy.length) || (huPaiCopy[it] != huPaiCopy[it + 2]))
    //             {
    //                 if(huPaiCopy[it] == huPaiCopy[it + 1])
    //                 {
    //                     var pair1 = m_HuPaiVec[it];
    //                     var pair2 = m_HuPaiVec[it + 1];
    //                     m_HuPaiVec.splice(it, 1);
    //                     m_HuPaiVec.splice(it, 1);

    //                     needMinHunNum = MJPAI_HUNMAX;
    //                     calBePuHunNum(m_HuPaiVec, 0);
    //                     if (needMinHunNum <= hunNum)
    //                     {
    //                         if(with258)
    //                         {
    //                             if(isCard258(pair1))
    //                             {
    //                                 return true;
    //                             }
    //                         }
    //                         else
    //                         {
    //                             return true;
    //                         }
    //                     }

    //                     m_HuPaiVec.splice(it, 0, pair2);
    //                     m_HuPaiVec.splice(it, 0, pair1);
    //                 }
    //             }

    //             if(hunNum > 0 && (huPaiCopy[it] != huPaiCopy[it + 1]))
    //             {
    //                 hunNum = hunNum - 1;
    //                 var pair3 = m_HuPaiVec[it];
    //                 m_HuPaiVec.splice(it, 1);
    //                 needMinHunNum = MJPAI_HUNMAX;
    //                 calBePuHunNum(m_HuPaiVec, 0);
    //                 if(needMinHunNum <= hunNum)
    //                 {
    //                     if(with258)
    //                     {
    //                         if(isCard258(pair3))
    //                         {
    //                             return true;
    //                         }
    //                     }
    //                     else
    //                     {
    //                         return true;
    //                     }
    //                 }

    //                 hunNum = hunNum + 1;
    //                 m_HuPaiVec.splice(it, 0, pair3);
    //             }
    //         }
    //     }

    //     return false;
    // }



    // function checkMatchSeq(seg)
    // {
    //     var matchOK = true;
    //     for(var m = 0; m < seg.length;)
    //     {
    //         if (checkMath12(seg, m))      m += 12;
    //         else if (checkMath9(seg, m))  m += 9;
    //         else if (checkMath6(seg, m))  m += 6;
    //         else if (checkMath3(seg, m))  m += 3;
    //         else
    //         {
    //             matchOK = false;
    //             break;
    //         }
    //     }

    //     return matchOK;
    // }



    // //是否是条
    // function isCardTiao(card)
    // {
    //     if(card >= 1 && card <= 9)
    //     {
    //         return true;
    //     }

    //     return false;
    // }



    // //是否是筒
    // function isCardTong(card)
    // {
    //     if(card >= 11 && card <= 19)
    //     {
    //         return true;
    //     }

    //     return false;
    // }



    // //是否是万
    // function isCardWan(card)
    // {
    //     if(card >= 21 && card <= 29)
    //     {
    //         return true;
    //     }

    //     return false;
    // }



    // //是否是风(需要特殊处理)
    // function isCradFeng(card)
    // {
    //     //如果花牌里有这个牌，就不是风
    //     if(majiang.isCardFlower(card))
    //     {
    //         return false;
    //     }

    //     if(card >= 31 && card <= 91)
    //     {
    //         return true;
    //     }

    //     return false;
    // }


    //是否是花
    majiang.isCardFlower = function(card)
    {
        if(flowerArray.length == 0)
            return false;
        var flowerIndex = flowerArray.indexOf(card);
        if(flowerIndex >= 0)
        {
            return true;
        }

        return false;
    }


    //设置花，参数是[]，必须设置
    majiang.setFlower = function(flower)
    {
        flowerArray = flower;
    }


    // majiang.isCanHunHu3and7dui = function(hunArr, mjHand)
    // {
    //     var tempCds = mjHand.slice(0);
    //     var hunCard = hunArr[0];
    //     var index = tempCds.indexOf(hunCard);
    //     tempCds.splice(index, 3);
    //     var Equalcount = 0;
    //     for(var i = 0;i < tempCds.length;i++)
    //     {
    //         var cdsCheck = tempCds[i];
    //         var star = tempCds.indexOf(cdsCheck);
    //         var end = tempCds.lastIndexOf(cdsCheck);
    //         if(star != end && end != -1)
    //         {
    //             Equalcount++;
    //         }
    //     }

    //     return (hunArr.length == 3 && (Equalcount == 10 || Equalcount == 11));
    // }



    // majiang.isCanHunHu4and7dui = function (hunArr,mjHand)
    // {
    //     var tempCds = mjHand.slice(0);
    //     var hunCard = hunArr[0];
    //     var index =  tempCds.indexOf(hunCard);
    //     tempCds.splice(index, 4);
    //     var Equalcount = 0;
    //     for(var i = 0; i < tempCds.length;i++)
    //     {
    //         var cdsCheck = tempCds[i];
    //         var star = tempCds.indexOf(cdsCheck);
    //         var end = tempCds.lastIndexOf(cdsCheck);
    //         if(star != end && end != -1)
    //         {
    //             Equalcount++;
    //         }
    //     }

    //     return (hunArr.length == 4 && Equalcount == 8);
    // }



    //是否是混子
    majiang.isEqualHunCard = function(card)
    {
        return card == 200;
        // if(hunCardArray.length <= 0)
        // {
        //     return false;
        // }
        //
        // var hunCard = hunCardArray[0];
        //
        // var hun = 0;
        // if(hunCard >= 31 && hunCard <= 61)
        // {
        //     if (hunCard == 61)
        //     {
        //         hun = 31;
        //     }
        //     else
        //     {
        //         hun = hunCard + 10;
        //     }
        //
        //     if (hun == card)
        //     {
        //         return true;
        //     }
        //
        //     return false;
        // }
        //
        // else if(hunCard >= 71 && hunCard <= 91)
        // {
        //     if(hunCard == 91)
        //     {
        //         hun = 71;
        //     }
        //     else
        //     {
        //         hun = hunCard + 10;
        //     }
        //
        //     if(hun == card)
        //     {
        //         return true;
        //     }
        //
        //     return false;
        // }
        // else
        // {
        //     if(hunCard % 10 == 9)
        //     {
        //         hun = Math.floor(hunCard / 10) * 10 + 1;
        //     }
        //     else
        //     {
        //         hun = hunCard + 1;
        //     }
        //
        //     if(hun == card)
        //     {
        //         return true;
        //     }
        //
        //     return false;
        // }
    }

    //是否有花8版
    majiang.isFlower8 = function (card) {
        switch (card) {
            case 111:
            case 121:
            case 131:
            case 141:
            case 151:
            case 161:
            case 171:
            case 181:
                return true;
        }
        return false;
    };
    //是否有花20版
    majiang.isFlower20 = function (card) {
        switch (card) {
            case 71:
            case 81:
            case 91:
            case 111:
            case 121:
            case 131:
            case 141:
            case 151:
            case 161:
            case 171:
            case 181:
                return true;
        }
        return false;
    };

    // //胡牌判断，基础胡牌逻辑
    // majiang.canHu = function(cds, cd)
    // {
    //     var no7 = false;
    //     var withHun = false;
    //     var with258 = false;
    //     if(withHun)
    //     {
    //         // 逻辑需求走有混子的算法
    //         if(!no7)
    //         {
    //             // 如果可以7对
    //             if(majiang._can7Hu(cds, cd, withHun, with258))
    //             {
    //                 return true;
    //             }
    //         }

    //         if(majiang._canHuHun(cds, cd))
    //         {
    //             return true;
    //         }

    //         return false;
    //     }
    //     else
    //     {
    //         if(majiang._canHuNoHun(no7, cds, cd, with258) > 0)
    //         {
    //             return true;
    //         }

    //         return false;
    //     }

    //     return false;
    // }

    //胡牌判断，基础胡牌逻辑
    majiang.canHu = function(cards, cd)
    {
        if (is7Dui(cards, cd)) {
            return true;
        }
        if (this.isShiSanPao(cards, cd)) {
            return true;
        }
        return canHuLaizi(cards, cd);
    }

    //听牌函数，判断手牌能否听牌
    majiang.canTing = function (cards) {
        return this.canHu(cards, 200);
    }


    // // 是否能胡7对
    // majiang._can7Hu = function(cds, cd, withHun, with258)
    // {
    //     var tmp = [];
    //     for(var i = 0; i < cds.length; i++)
    //     {
    //         tmp.push(cds[i]);
    //     }

    //     if(cd)
    //     {
    //         tmp = tmp.concat(cd);
    //     }

    //     cds = tmp;
    //     cds.sort(function (a, b)
    //     {
    //         return a - b
    //     });

    //     if(cds.length != 14)
    //     {
    //         return false;
    //     }

    //     var oddCards = [];
    //     var pairs = [];
    //     var hunCards = [];
    //     var isodd258 = false;
    //     var ispair258 = false;

    //     for(i = 0; i < cds.length; i++)
    //     {
    //         if(withHun)
    //         {
    //             if(majiang.isEqualHunCard(cds[i]))
    //             {
    //                 hunCards.push(cds[i]);
    //                 continue;
    //             }
    //         }

    //         if(i == cds.length - 1)
    //         {
    //             oddCards.push(cds[i]);
    //         }
    //         else if(cds[i] != cds[i + 1])
    //         {
    //             oddCards.push(cds[i]);
    //             if(with258 && isCard258(cds[i]))
    //             {
    //                 isodd258 = true;
    //             }
    //         }
    //         else
    //         {
    //             if(with258 && isCard258(cds[i]))
    //             {
    //                 ispair258 = true;
    //             }

    //             pairs.push(cds[i]);
    //             i++;
    //         }
    //     }

    //     if(oddCards.length > 0)
    //     {
    //         //有单牌
    //         if(withHun)
    //         {
    //             if(hunCards.length == oddCards.length)
    //             {
    //                 //单牌数 = 混子数量
    //                 if(with258 && (ispair258 || isodd258))
    //                 {
    //                     return true;
    //                 }
    //                 else
    //                 {
    //                     return true;
    //                 }
    //             }
    //         }
    //     }
    //     else
    //     {
    //         if(hunCards.length == 2 || hunCards.length == 4)
    //         {
    //             return true;
    //         }
    //         else if(with258)
    //         {
    //             if(ispair258)
    //             {
    //                 return true;
    //             }
    //         }
    //         else
    //         {
    //             return true;
    //         }
    //     }

    //     if(majiang.isCanHunHu3and7dui(hunCards, cds))
    //     {
    //         return true;
    //     }
    //     else if(majiang.isCanHunHu4and7dui(hunCards, cds))
    //     {
    //         return true;
    //     }
    //     else
    //     {
    //         return false;
    //     }

    //     return false;
    // }



    // 有混子的胡的算法
    // majiang._canHuHun = function(cds, cd)
    // {
    //     var MjCdType =
    //     {
    //         tiao:0,
    //         tong:1,
    //         wan:2,
    //         feng:3,
    //         hun:4
    //     };

    //     //分牌，按类型：条，筒，万，风，混
    //     var allCards = [];
    //     allCards[MjCdType.tiao] = [];
    //     allCards[MjCdType.tong] = [];
    //     allCards[MjCdType.wan] = [];
    //     allCards[MjCdType.feng] = [];
    //     allCards[MjCdType.hun] = [];

    //     var tmp = [];
    //     for(var i = 0; i < cds.length; i++)
    //     {
    //         tmp.push(cds[i]);
    //     }

    //     if(cd)
    //     {
    //         tmp = tmp.concat(cd);
    //     }

    //     cds = tmp;
    //     cds.sort(function(a, b)
    //     {
    //         return a - b
    //     });

    //     for(var i = 0; i < cds.length; i++)
    //     {
    //         if(majiang.isEqualHunCard(cds[i]))
    //         {
    //             allCards[MjCdType.hun].push(cds[i]);
    //         }

    //         else if(isCardTiao(cds[i]))
    //         {
    //             allCards[MjCdType.tiao].push(cds[i]);
    //         }

    //         else if(isCardTong(cds[i]))
    //         {
    //             allCards[MjCdType.tong].push(cds[i]);
    //         }
    //         else if(isCardWan(cds[i]))
    //         {
    //             allCards[MjCdType.wan].push(cds[i]);
    //         }
    //         else if(isCradFeng(cds[i]))
    //         {
    //             allCards[MjCdType.feng].push(cds[i]);
    //         }
    //     }

    //     needMinHunNum = MJPAI_HUNMAX;
    //     calBePuHunNum(allCards[MjCdType.wan], 0);
    //     var wanToPuNeedNum = needMinHunNum;

    //     needMinHunNum = MJPAI_HUNMAX;
    //     calBePuHunNum(allCards[MjCdType.tong], 0);
    //     var tongToPuNeedNum = needMinHunNum;

    //     needMinHunNum = MJPAI_HUNMAX;
    //     calBePuHunNum(allCards[MjCdType.tiao], 0);
    //     var tiaoToPuNeedNum = needMinHunNum;

    //     needMinHunNum = MJPAI_HUNMAX;
    //     calBePuHunNum(allCards[MjCdType.feng], 0);
    //     var fengToPuNeedNum = needMinHunNum;

    //     var hasNum = 0;
    //     var isHu = false;
    //     var curHunNum = allCards[MjCdType.hun].length;

    //     //如果需要的混小于等于当前的则计算将需要的混的个数

    //     //将在万中
    //     var needHunNum = tongToPuNeedNum + tiaoToPuNeedNum + fengToPuNeedNum;
    //     if(needHunNum <= curHunNum)
    //     {
    //         hasNum = curHunNum - needHunNum;
    //         isHu = checkHunHu(hasNum, allCards[MjCdType.wan]);
    //         console.log("将在万中 isHu:" + isHu);
    //         if(isHu)
    //         {
    //             return true;
    //         }
    //     }

    //     //将在饼中
    //     needHunNum = wanToPuNeedNum + tiaoToPuNeedNum + fengToPuNeedNum;
    //     if(needHunNum <= curHunNum)
    //     {
    //         hasNum = curHunNum - needHunNum;
    //         isHu = checkHunHu(hasNum, allCards[MjCdType.tong]);
    //         console.log("将在饼中 isHu:" + isHu);
    //         if(isHu)
    //         {
    //             return true;
    //         }
    //     }

    //     //将在条中
    //     needHunNum = wanToPuNeedNum + tongToPuNeedNum + fengToPuNeedNum;
    //     if(needHunNum <= curHunNum)
    //     {
    //         hasNum = curHunNum - needHunNum;
    //         isHu = checkHunHu(hasNum, allCards[MjCdType.tiao]);
    //         console.log("将在条中 isHu:"+isHu);
    //         if(isHu)
    //         {
    //             return true;
    //         }
    //     }

    //     //将在风中
    //     needHunNum = wanToPuNeedNum + tongToPuNeedNum + tiaoToPuNeedNum;
    //     if(needHunNum <= curHunNum)
    //     {
    //         hasNum = curHunNum - needHunNum;
    //         isHu = checkHunHu(hasNum, allCards[MjCdType.feng]);
    //         console.log("将在风中 isHu:" + isHu);
    //         if(isHu)
    //         {
    //             return true;
    //         }
    //     }

    //     return false;
    // }


    //去掉重复的牌
    majiang.ruleOutByArr = function(cds)
    {
        var dict = {};
        var arr = [];
        for(var i = 0; i < cds.length; i++)
        {
            if(!dict[cds[i]])
            {
                dict[cds[i]] = "";
            }
        }

        var objDict = Object.keys(dict);
        for(var i = 0; i < objDict.length; i++)
        {
            arr.push(parseInt(objDict[i]));
        }

        return arr;
    }


    // majiang.canTing_13P_card = function (cds)
    // {
    //     for(var i=0; i < p133.length; i++)
    //     {
    //         var chil = p133[i];
    //         for(var k=0; k < chil.length; k++)
    //         {
    //             if (majiang.isShiSanPao(cds, chil[k])) return true;
    //         }
    //     }

    //     for(var i=0; i < p131.length; i++)
    //     {
    //         var card = p131[i];
    //         if (majiang.isShiSanPao(cds, card)) return true;
    //     }

    //     return false;
    // }


    // majiang.calTingSet13P = function (cds)
    // {
    //     if (majiang.canTing_13P_card(cds))
    //     {
    //         var allSet = {}; // 找出大乱所有可能听的牌
    //         for (var i = 0; i < p133.length; i++) {
    //             for (var j = 0; j < p133[i].length; j++) {
    //                 allSet[p133[i][j]] = 1;
    //             }
    //         }
    //         for (var j = 0; j < p131.length; j++) {
    //             allSet[p131[j]] = 1;
    //         }
    //         var tingSet = {};
    //         for(var tingCard in allSet) {
    //             var card = Number(tingCard);
    //             if (cds.indexOf(card) < 0 && majiang.isShiSanPao(cds, card)) {
    //                 tingSet[card] = 1;
    //             }
    //         }
    //         return tingSet;
    //     }
    //     return {}
    // }


    // //听牌函数，判断14张牌能否听牌
    // majiang.canTing = function (cds) {
    //     if (canHuLaizi(cds, 200)) 
    //         return true;

    //     if (majiang.canTing_13P_card(cds)) {
    //         return true;
    //     }

    //     // 七小对监测
    //     if (cds.length != 13) 
    //         return false;
    //     var cardSet = {};
    //     for (var i = 0; i < cds.length; i++) {
    //         var temp = cardSet[cds[i]];
    //         cardSet[cds[i]] = temp ? temp + 1 : 1;
    //     }
    //     var singleCount = 0;
    //     for (var i in cardSet) {
    //         if (cardSet[i] % 2 == 1) {
    //             singleCount++;
    //         }
    //     }
    //     return singleCount == 1;
    //     return false;
    // }

    // // 没有混子的胡的算法
    // majiang._canHuNoHun = function(no7, cds, cd, with258)
    // {
    //     var tmp = [];
    //     for(var i = 0; i < cds.length; i++)
    //     {
    //         tmp.push(cds[i]);
    //     }

    //     if(cd)
    //     {
    //         tmp = tmp.concat(cd);
    //     }

    //     cds = tmp;
    //     cds.sort(function (a, b)
    //     {
    //         return a - b
    //     });

    //     var pair = {};

    //     //做将
    //     var isWith258 = false;
    //     if(with258)
    //     {
    //         for(var i = 0; i < cds.length; i++)
    //         {
    //             if(i < cds.length - 1 && cds[i] == cds[i + 1])
    //             {
    //                 switch(cds[i])
    //                 {
    //                     case 2:
    //                     case 12:
    //                     case 22:
    //                     case 5:
    //                     case 15:
    //                     case 25:
    //                     case 8:
    //                     case 18:
    //                     case 28:
    //                     {
    //                         pair[cds[i]] = cds[i];
    //                         isWith258 = true;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     else
    //     {
    //         for(var i = 0; i < cds.length; i++)
    //         {
    //             if(i < cds.length - 1 && cds[i] == cds[i + 1])
    //             {
    //                 pair[cds[i]] = cds[i];
    //             }
    //         }
    //     }

    //     if(Object.keys(pair).length == 0)
    //     {
    //         return -1;//没有将，不能胡，my
    //     }

    //     for(var pairKey in pair)
    //     {
    //         var pcd = pair[pairKey];
    //         var left = [];//除掉两个将牌以外的其他牌，my
    //         var pnum = 0;
    //         for(var i = 0; i < cds.length; i++)
    //         {
    //             if(cds[i] == pcd && pnum < 2)
    //             {
    //                 pnum++;
    //             }
    //             else
    //             {
    //                 left.push(cds[i]);
    //             }
    //         }

    //         if(left.length == 0)
    //         {
    //             return 1;//单钓一张将，my
    //         }

    //         if(left.length == 12)
    //         {
    //             var is13 = true, off13 = 0;
    //             for(var i = 0; i + off13 < s13.length; i++)
    //             {
    //                 if(pcd == s13[i])
    //                 {
    //                     off13++;
    //                 }

    //                 if(left[i] != s13[i + off13])
    //                 {
    //                     is13 = false;
    //                     break;
    //                 }
    //             }

    //             if(off13 == 1 && is13)
    //             {
    //                 return 13;//十三幺
    //             }

    //             var is7 = true;
    //             if (no7)
    //             {
    //                 is7 = false;
    //             }
    //             else
    //             {
    //                 for(var i = 0; i < left.length; i += 2)
    //                 {
    //                     if(left[i] != left[i + 1])
    //                     {
    //                         is7 = false;
    //                         break;
    //                     }
    //                 }
    //             }

    //             if(is7)
    //             {
    //                 if(with258)
    //                 {
    //                     if(isWith258)
    //                     {
    //                         return 7;//七小对带258做将，my
    //                     }
    //                     else
    //                     {
    //                         return 0;
    //                     }
    //                 }
    //                 else
    //                 {
    //                     return 7;//七小对，my
    //                 }
    //             }
    //         }

    //         var segs = [];
    //         var seg = [left[0]];
    //         for(var i = 1; i < left.length; i++)
    //         {
    //             if(checkLink(left[i - 1], left[i]))
    //             {
    //                 seg.push(left[i]);
    //             }
    //             else
    //             {
    //                 segs.push(seg);
    //                 seg = [left[i]];
    //             }
    //         }

    //         if(seg.length > 0)
    //         {
    //             segs.push(seg);
    //         }

    //         var matchOK = true;
    //         for(var i = 0; i < segs.length; i++)
    //         {
    //             seg = segs[i];
    //             if(seg.length % 3 != 0)
    //             {
    //                 matchOK = false;//只要不是3的倍数，则必然不是刻子或顺子
    //                 break;
    //             }

    //             for(var m = 0; m < seg.length;)
    //             {
    //                 if(checkMath12(seg, m))
    //                 {
    //                     m += 12;
    //                 }
    //                 else if(checkMath9(seg, m))
    //                 {
    //                     m += 9;
    //                 }
    //                 else if(checkMath6(seg, m))
    //                 {
    //                     m += 6;
    //                 }
    //                 else if(checkMath3(seg, m))
    //                 {
    //                     m += 3;
    //                 }
    //                 else
    //                 {
    //                     matchOK = false;
    //                     break;
    //                 }
    //             }
    //         }

    //         if(matchOK)
    //         {
    //             return 1;//可以胡，my
    //         }
    //     }

    //     return 0;
    // }

    majiang.canGangWhenTing = function(hand, card)
    {
        var hangAfterGang = [];
        for(var i = 0; i < hand.length; i++)
        {
            if(card != hand[i])
            {
                hangAfterGang.push(hand[i]);
            }
        }
        //若听牌状态下，去掉所杠的牌不能再听则不能杠
        if (!majiang.canTing(hangAfterGang)) {
            return false;
        }
        //求出之前听的牌
        var tingSet1 = calTingSet(hand);
        //求出杠之后听的牌
        var tingSet2 = calTingSet(hangAfterGang);
        //对比前后听的牌
        if (Object.keys(tingSet1).length != Object.keys(tingSet2).length){
            return false;
        }
        for(var tingCard in tingSet1) {
            if (!(tingCard in tingSet2)) {
                return false;
            }
        }
        //听牌不变可以杠
        return true;
    }

    //是否可以杠
    majiang.canGang1 = function(peng, hand, isTing)
    {
        var rtn = [];
        for(var i = 0; i < peng.length; i++)
        {
            //过杠不能杠
            if(hand.indexOf(peng[i]) >= 0 && (!isTing || majiang.canGangWhenTing(hand, peng[i])))
            {
                //手牌里的牌Push到rtn中
                rtn.push(peng[i]);
            }
        }

        var cnum = {};
        for(var i = 0; i < hand.length; i++)
        {
            var cd = hand[i];
            if(majiang.isEqualHunCard(cd))
            {
                continue;
            }

            var num = cnum[cd];
            if(!num)
            {
                num = 0;
            }

            num++;
            cnum[cd] = num;
            if(num == 4 && (!isTing || majiang.canGangWhenTing(hand, cd)))
            {
                rtn.push(cd);
            }
        }

        return rtn;
    };



    //是否可以明杠
    majiang.canGang0 = function(hand, cd, isTing)
    {
        if(majiang.isEqualHunCard(cd))//混牌不能杠
        {
            return false;
        }

        var num = 0;
        for (var i = 0; i < hand.length; i++) {
            if (hand[i] == cd) num++;
        }
        return num == 3 && (!isTing || majiang.canGangWhenTing(hand, cd));
    };



    //是否可以碰
    majiang.canPeng = function(hand, cd)
    {
        var num = 0;
        if(majiang.isEqualHunCard(cd))//混牌不能碰
        {
            return false;
        }

        for(var i = 0; i < hand.length; i++)
        {
            if(hand[i] == cd)
            {
                num++;
            }
        }

        return num >= 2;
    };



    //是否可以吃
    majiang.canChi = function(hand, cd)
    {
        var num = [0, 0, 0, 0, 0];
        var rtn = [];
        for(var i = 0; i < hand.length; i++)
        {
            var dif = hand[i] - cd;
            switch (dif)
            {
                case -2:
                case -1:
                case 1:
                case 2:
                    if(!majiang.isEqualHunCard(hand[i]) && !majiang.isEqualHunCard(cd))
                    {
                        num[dif + 2]++;
                    }
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



    majiang.CardCount = function (pl)
    {
        var rtn = (pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length) * 3 + pl.mjchi.length;
        if(pl.mjhand)
        {
            rtn += pl.mjhand.length;
        }

        return rtn;
    };

    majiang.getAllCardsTotal = function ()
    {
        var tData = MjClient.data.sData.tData;
        var wuWanFeng = tData.areaSelectMode.wuWanFeng;
        if(wuWanFeng) //无风万字
        {
            return 72;
        }else{
            return 136;
        }
    };

    majiang.setFlowerImg = function (node, pl)
    {
        
    };
    majiang.setJiaZhuNum = function (node, pl)
    {

    };


    // // 对对胡
    // // @param cardsChi 吃过的牌
    // // @param cardsHand 手中的牌 14张
    // majiang.isDuiDuiHu = function(mjchi, mjhand)
    // {
    //     //有吃牌
    //     if(mjchi.length > 0)
    //     {
    //         return 0;
    //     }

    //     var laiziNums = 0;
    //     var cds = mjhand.slice();

    //     var count1 = 0;
    //     var count2 = 0;
    //     var count3 = 0;
    //     var count4 = 0;

    //     //计算各牌的数量
    //     var PAI = {};
    //     var tempCD = 0;
    //     for(var i = 0; i < cds.length; i++)
    //     {
    //         tempCD = cds[i];
    //         if(this.isEqualHunCard(tempCD))
    //         {
    //             laiziNums++;
    //             continue;
    //         }

    //         if(PAI[tempCD])
    //         {
    //             PAI[tempCD]++;
    //         }
    //         else
    //         {
    //             PAI[tempCD] = 1;
    //         }
    //     }

    //     var tempCount = 0;
    //     for(var i in PAI)
    //     {
    //         tempCount = PAI[i];
    //         if(tempCount == 1) count1++;
    //         else if(tempCount == 2) count2++;
    //         else if(tempCount == 3) count3++;
    //         else if(tempCount == 4) count4++;
    //     }

    //     var needNums = count1 * 2 + count2 + count4 * 2 - 1;
    //     if(needNums <= laiziNums)
    //     {
    //         return 1;
    //     }

    //     return 0;
    // }


    // //混子牌数量
    // majiang.getTotalHunNum = function(mjhand)
    // {
    //     var card = mjhand.slice();
    //     var count = 0;
    //     card.sort(function (a,b)
    //     {
    //         return a - b
    //     });

    //     for(var i = 0; i < card.length; i++)
    //     {
    //         if(majiang.isEqualHunCard(card[i]))
    //         {
    //             count++;
    //         }
    //     }

    //     return count;
    // }


    // //获取table里面value的数量
    // majiang.getTableValueNum = function(tableList, value)
    // {
    //     var count = 0;
    //     for(var index = 0; index < tableList.length; index++)
    //     {
    //         if(tableList[index] == value)
    //         {
    //             count = count + 1;
    //         }
    //     }

    //     return count;
    // }



    //十三炮，连云港玩法
    majiang.isShiSanPao = function(cds,cd)
    {
        // cc.log("=====MajiangLYG=====isShiSanPao----cds=" + cds);
        var tmp = cds.slice();

        if(cd)
        {
            tmp.push(cd);
        }

        tmp.sort(function(a,b)
        {
            return a-b;
        });

        tmp = this.ruleOutByArr(tmp);

        if(tmp.length != 14)
        {
            // cc.log("=====MajiangLYG=====isShiSanPao----return tmp.length != 14--" + tmp);
            return false;
        }
        // cc.log("---isShiSanPao----11111--");
        var f3cards = [];
        var f1cards = [];
        // cc.log("=====MajiangLYG=====isShiSanPao----555555--");
        for(var k=0; k < tmp.length; k++)
        {
            var card = tmp[k];
            //this.GLog("---isShiSanPao----444444--");
            for(var i=0; i < p133.length; i++)
            {
                // this.GLog("---isShiSanPao----22222--");
                var chil = p133[i];
                if (chil.indexOf(card) >= 0) f3cards.push(chil);
            }
            // this.GLog("---isShiSanPao----3333--");
            if (p131.indexOf(card) >= 0) f1cards.push(card);
        }

        // this.GLog("---isShiSanPao----return tf1cards.length != 5 || f3cards.length < 9--");
        if (f1cards.length < 5) return false;//风牌是可以为6张或者7张的

        //判断条万筒三门齐
        var hTiao = 0;
        var hTong = 0;
        var hWan  = 0;
        for(var k=0; k < f3cards.length; k++)
        {
            var fit = f3cards[k][0];
            // this.GLog("==MajiangLYG==isShiSanPao==fit:" + fit);
            if (fit >= 1 && fit <= 9){
                if (hTiao != fit % 10 && hTiao > 0) return false;
                hTiao = fit % 10;
            }
            else if (fit >= 11 && fit <= 19){
                if (hWan != fit % 10 && hWan > 0) return false;
                hWan = fit % 10;
            }
            else if (fit >= 21 && fit <= 29){
                if (hTong != fit % 10 && hTong > 0) return false;
                hTong = fit % 10;
            }
        }

        cc.log("=====MajiangLYG=====isShiSanPao=====hTiao || hWan || hTong--" + hTiao + hWan + hTong);
        if (!hTiao || !hWan || !hTong) {
            if (f1cards.length < 8) { // 修复七字牌缺一门不提示听牌
                return false;
            }
        }
        if (hTiao == hWan || hWan == hTong || hTong == hTiao) return false;
        cc.log("=====MajiangLYG=====isShiSanPao=====last--");
        return true;

    }


    //================test算法==================
    //function DoTest() {

        // var pl = {
        //     name: "player3",
        //     winType: WinType.pickNormal,
        //     winone: 0,
        //     mjdesc: [],
        //     uid: 103,
        //     mjliang: [],
        //     // 漏算对倒+1的牌型
        //     // mjhand: [25,25,26,26,1,1,3,5,9,9,5],
        //     // mjhand: [5,5,6,27,27,28,28,15],
        //     // mjhand: [25,25,26,26,1,1,3,5,9,9,5],
        //     // mjhand:[41,51,22,22,18],
        //     // mjhand:[4,4,5,1,1,61,61,1],
        //     //漏算卡+1的牌型
        //     // mjhand:[12,13,26,27,28,28,31,27],
        //     mjhand:[18,18,91,91,71,71,91,16],
        //     // mjhand:[4,4,4,5,5,16,17,31,41,51,71,81,91,5],
        //     mjchi:[],
        //     mjpeng:[],
        //     mjgang0:[],
        //     mjgang1:[],
        //     mjflower:[],
        //     mjBaiban:[],
        //     robGangPlayer:0,
        //     dianPaoPlayer:0,
        // };
        // hunCard = 91;
        // gameType = GAME_TYPE.TAI_ZHOU;
        // myObject = {
        //     tData:{
        //         hunCard:hunCard,
        //         gameType:gameType,
        //         isHunNum7:false,
        //         canHu7:false,
        //         canHuWith258:false,
        //         withZhong:true,
        //         MAX_HUN_NUM:6,
        //
        //     }
        //     // tData:{
        //     // 	"tState":3,
        //     // 	"initCoin":1000,
        //     // 	"roundNum":4,
        //     // 	"roundAll":4,
        //     // 	"fanNum":8,
        //     // 	"uids":[100074,100077,100076,100075],
        //     // 	"owner":100074,
        //     // 	"cardNext":54,
        //     // 	"winner":-1,
        //     // 	"curPlayer":0,
        //     // 	"zhuang":0,
        //     // 	"lastPutPlayer":0,
        //     // 	"putType":0,
        //     // 	"lastPut":-1,
        //     // 	"tableid":"686789",
        //     // 	"canEatHu":false,
        //     // 	"delEnd":0,
        //     // 	"firstDel":0,
        //     // 	"caipiaoPlayer":[],
        //     // 	"isFirst":false,
        //     // 	"gameType":1,
        //     // 	"hunCard":25,
        //     // 	"zhuangPlayer":[0],
        //     // 	"curRingWind":0,
        //     // 	"tai":4,
        //     // 	"isHunNum7":true,
        //     // 	"isWaitFlower":false,
        //     // 	"isCheckChengBao":true,
        //     // 	"isChengBao":false,
        //     // 	"selectUids":[],
        //     // 	"noPlayUids":[],
        //     // 	"withWind":true,
        //     // 	"canEat":true,
        //     // 	"canHu7":true,
        //     // 	"canHuWith258":false,
        //     // 	"withZhong":true
        //     // }
        //
        // };
        // // print("result:"+majiang.isModaCard(pl.mjhand)+",card:"+pl.mjhand);
        // // print("result:"+majiang.danDiaoCardHu(pl.mjhand, pl.mjhand[pl.mjhand.length - 1])+",card:"+pl.mjhand);
        // // print("result:"+ majiang.isDuiDaoHu(pl,!myObject.tData.canHu7,myObject.tData.canHuWith258, myObject.tData.withZhong)+",card:"+pl.mjhand);
        // // print("result:"+majiang.getThreeWindArray(pl.mjhand)+",card:"+pl.mjhand);
        // // print("result:"+majiang.canHu(!myObject.tData.canHu7, pl.mjhand, 0, myObject.tData.canHuWith258, myObject.tData.withZhong)+",card:"+pl.mjhand);
        // // TestCardHu();
        // print("result:"+  majiang.isDuiDaoHu(pl,!myObject.tData.canHu7,myObject.tData.canHuWith258, myObject.tData.withZhong));

    //}

    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_lyg = majiang;
    }
    else
    {
        module.exports = majiang;
        //DoTest();
    }
})();
