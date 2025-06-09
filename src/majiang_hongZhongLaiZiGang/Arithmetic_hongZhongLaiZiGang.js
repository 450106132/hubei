
(function() {
    var majiang = {};
    var flowerArray = [];//花的列表，根据不同来设置
    var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9,11, 12, 13, 14, 15, 16, 17, 18, 19,21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 41, 51, 61, 71, 81, 91];

    //是否是花
    majiang.isCardFlower = function(card)
    {
        return flowerArray.indexOf(card) >= 0;
    }

    //设置花，参数是[]，必须设置
    majiang.setFlower = function(flower)
    {
        flowerArray = flower || [];
    }
    majiang.canChi = function(hand, cd)
    {
        if(cd == MjClient.data.sData.tData.hunCard) //混牌不能吃
        {
            return [];
        }
        var num = [0, 0, 0, 0, 0];
        var rtn = [];
        for(var i = 0; i < hand.length; i++)
        {

            if(hand[i] == MjClient.data.sData.tData.hunCard)//混牌不能吃
            {
                continue;
            }
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
    //是否是混子
    majiang.isEqualHunCard = function(card)
    {
        return card == 200;
    }
    majiang.isHunCard = function(card,huncard){
        return card == huncard;
    }
    // 判断是否有中 发牌
    majiang.hasZhongFa = function(cards){
        if(cards.indexOf(71) >= 0 || cards.indexOf(81) >= 0){
            return true;
        }

        return false;
    }

    //是否可以胡
    majiang.canHu = function(cards, cd, pl) {
        //手牌中有中发不可胡
        if(this.hasZhongFa(cards)){
            return false;
        }
        var handCards = cards.slice();
        if(cd){
            handCards.push(cd);
        }
        if(this.isAllJiangColor(handCards.concat(pl.mjchi).concat(pl.mjpeng).concat(pl.mjgang0).concat(pl.mjgang1))){//将一色
            return true;
        }

        if(this.isAllFengColor(handCards.concat(pl.mjchi).concat(pl.mjpeng).concat(pl.mjgang0).concat(pl.mjgang1))){//风一色
            return true;
        }

        if(this.isSameColor(handCards,pl.mjchi, pl.mjpeng, pl.mjgang0, pl.mjgang1) && this.canHuLaizi(cards, cd, false)){ //清一色可任意将
            return true;
        }

        if(isDuiDuiHu(pl.mjchi, handCards)){
            return true;
        }
        //小胡 需要二五八将
        return this.canHuLaizi(cards, cd,true) && this.getHunCount(handCards) <= 1;
    }
    majiang.getHunCount = function (cards) {
        var count = 0;
        for (var i = 0; i < cards.length; i++) {
            if (this.isEqualHunCard(cards[i])) {
                count++;
            }
        }
        return count;
    };
    majiang.canHuLaizi = function(oCards, cd, isNeed258) {
        var cards = [];
        var laizi = 0;

        for (var i = 0; i < oCards.length; i++) {
            if (oCards[i] == 200) {
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
        if ((cards.length + laizi + 1) % 3 != 0) {
            return false;
        }
        cards.sort(function(a, b) {
            return a - b;
        })

        // 依次删除一对牌做将，其余牌全部成扑则可胡
        for (var i = 0; i < cards.length; i++) {
            if (i > 0 && cards[i] == cards[i - 1]){
                continue; // 和上一次是同样的牌，略过不计算
            }
            // 小胡，需2、5、8做将
            var yu = cards[i] % 10;
            if (yu != 2 && yu != 5 && yu != 8 && isNeed258)
                continue;
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
    }

    // 将一色
    majiang.isAllJiangColor = function (cards) {
        var jiangCards = [2, 5, 8];

        for (var i = 0; i < cards.length; i++) {
            if (this.isEqualHunCard(cards[i])) { // 除去混牌
                continue;
            }
            if (jiangCards.indexOf(cards[i] % 10) < 0) {
                return false;
            }
        }
        return true;
    };

    // 风一色
    majiang.isAllFengColor = function(cards) {
        var fengCards = [31, 41, 51, 61, 91];
        for (var i = 0; i < cards.length; i++) {
            if (this.isEqualHunCard(cards[i])) { // 除去混牌
                continue;
            }
            if (fengCards.indexOf(cards[i]) < 0) {
                return false;
            }
        }
        return true;
    };

     //求出所有听牌的合集，oSet已经听的牌
    majiang.calTingSet = function(oCds, hun)
    {
        if(cc.isUndefined(oCds))
        {
            return {};
        }

        var tingSet = {};
        var cds = oCds.slice();
        if ((oCds.length + 1) % 3 == 0) { // 14、11、8、5、2张牌
            cds = oCds.slice(0, -1);
        }

        for (var i = 0; i < allCardsArray.length; i++) {
            if (this.isCanHu(cds, allCardsArray[i], hun)) {
                var count = 0;
                for (var j = 0; j < cds.length; j++) {
                    if (cds[j] == allCardsArray[i]) {
                        count++;
                    }
                }
                if (hun || count < 4) {
                    tingSet[allCardsArray[i]] = 1;
                }
            }
        }
        return tingSet;
    }

  
    majiang.canTing = function (cds, hun) {
        return false;
    };

    majiang.canGangWhenTing = function (hand, card) {
        return true;
    };

    //是否可以杠
    majiang.canGang1 = function (peng, hand, skipGang) {
        if(MjClient.majiang.getAllCardsTotal(MjClient.data.sData.tData) - MjClient.data.sData.tData.cardNext <= (MjClient.MaxPlayerNum + 10)){
            return false;
        }
        var rtn = [];
        for(var i = 0; i < peng.length; i++)
        {
            if(hand.indexOf(peng[i]) >= 0)
            {
                rtn.push(peng[i]);
            }
        }
        var cnum = {};
        for(var i = 0; i < hand.length; i++)
        {
            var cd = hand[i];
            if(cd == MjClient.data.sData.tData.hunCard || cd == 81 || cd == 71) continue;
            var num = cnum[cd];
            if(!num)
            {
                num = 0;
            }
            num++;
            cnum[cd] = num;
            if(num == 4)
            {
                rtn.push(cd);
            
            }
        }
        return rtn;
    };

    //是否可以明杠
    majiang.canGang0 = function (hand, cd, isTing) {
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
    majiang.canPeng = function (hand, cd) {
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

    majiang.CardCount = function (pl) {
        var rtn = (pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length) * 3 + pl.mjchi.length;
        if(pl.mjhand)
        {
            rtn += pl.mjhand.length;
        }
        return rtn;
    };

    majiang.getAllCardsTotal = function (tData) {
        var tData = MjClient.data.sData.tData;
        if(tData.areaSelectMode.playType == 1){
            return 120;
        }else {
            return 112;
        }
    };
    // 混子牌统一替换为200
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
    };
    majiang.isSameColor = function(mjhand, mjchi, mjpeng, mjgang0, mjgang1)
    {
        var cardList = [mjhand, mjpeng, mjgang0, mjgang1, mjchi];
        var color = -1;
        for(var i = 0; i < cardList.length; i++)
        {
            var cds = cardList[i];
            for(var j = 0; j < cds.length; j++)
            {
                var cd = cds[j];
                if(this.isEqualHunCard(cd))
                {
                    continue;
                }

                if(color == -1)
                {
                    // 第一次找牌色,找到了就记录,以后按照这个处理
                    color = Math.floor(cd / 10);
                }
                else if(color != Math.floor(cd / 10))
                {
                    return false;
                }
            }
        }

        return true;
    };
    majiang.isPlayerKaiKou = function(pl){
        var isNotKaiKou = pl.mjchi.length + pl.mjpeng.length + pl.mjgang0.length <= 0;
        if(isNotKaiKou) {
            return false;
        }
        return true;
    }
    // 获取胡的类型, 返回true还是false
    majiang.isCanHu = function (oCards,cd) {
        var pl = MjClient.playui.getPlayerInfoByOff();
        var tData = MjClient.data.sData.tData;
        //未开口不可胡
        if(!this.isPlayerKaiKou(pl) && !tData.areaSelectMode["buKaiKou"]){
            return false;
        }

        if(!this.canHuByHunCard(oCards, pl, cd)){
            return false;
        }

        var allRate = this.getPlRateInfo(pl, true, oCards,cd).rate;
        for(var off = 1; off < MjClient.MaxPlayerNum; off ++) {
            var player = MjClient.playui.getPlayerInfoByOff(off);
            allRate += this.getPlRateInfo(player, false).rate;
        }

        if(allRate >= 5){
            return true;
        }
        return false;
    };
    //获取玩家番数信息
    majiang.getPlRateInfo = function(pl, iswinner, oCards,card){
        var tData = MjClient.data.sData.tData;
        var rateInfo = {
            rate: 0,
            rateDesc: '',
            huTypeInfo: null
        }
        var strDesc = '';
        var rateGangList = pl.mjPiZiGang;
        var fcGangRate = 0;
        var hzGangRate = 0;
        var lzGangRate = 0;

        for (var i = 0; i < rateGangList.length; i++) {
            if (rateGangList[i] == 71) {
                hzGangRate++;
            }else if(rateGangList[i] == 81){
                fcGangRate++;
            }else if(rateGangList[i] == tData.hunCard){
                lzGangRate += 2;
            }
        }

        strDesc += hzGangRate > 0 ? '红中杠+' + hzGangRate : '';
        strDesc += fcGangRate > 0 ? '发财杠+' + fcGangRate : '';
        strDesc += lzGangRate > 0 ? '癞子杠+' + lzGangRate : '';

        var mingGangRate = pl.mjgang0.length;
        var anGangRate = pl.mjgang1.length * 2;

        rateInfo.rate = hzGangRate + fcGangRate + lzGangRate + mingGangRate + anGangRate;
        rateInfo.rateDesc = strDesc;

        if(iswinner){//赢家
            var huTypeInfo = this.getHuType(oCards,pl,card);
            rateInfo.huTypeInfo = huTypeInfo;
            //自摸或者炮胡 加一番
            rateInfo.rate += 1;
            //牌型番数
            rateInfo.rate += huTypeInfo.rate;
            //小胡杠开加一番
            if(pl.putType == 4 && !huTypeInfo.isDaHu){
                rateInfo.rate += 1;
                rateInfo.rateDesc += '杠开+1';
            }
            //硬胡加一番
            if(this.calYingMo(pl, card)){
                rateInfo.rate += 1;
                rateInfo.rateDesc += '硬胡+1';
            }
        }else{//输家
            //输家开口加一番
            if(this.isPlayerKaiKou(pl)){
                rateInfo.rate += 1;
                rateInfo.rateDesc += '开口+1';
            }
        }

        //庄加番
        var zhuangPl = MjClient.data.sData.players[tData.uids[tData.zhuang] + ""];
        if(tData.areaSelectMode["zhuangJiaFan"] == 1 && zhuangPl.info.uid == pl.info.uid){
            rateInfo.rate += 1;
            rateInfo.rateDesc += '庄加番+1';
        }

        return rateInfo;
    };

    majiang.calYingMo = function(pl, cd) {
        var tData = MjClient.data.sData.tData;
        var cardssrc = pl.mjhand.slice();
        var hunNum = 0;
        for (var i = 0; i < cardssrc.length; i++) {
            if (cardssrc[i] == tData.hunCard) {
                hunNum++;
            }
        }
        var cards = pl.mjhand.slice(0, -1);
        if(cd){
            cards.push(cd);
        }

        var isYingMo = false;
        var Yingcards = cards;
        var YingtingSet = Object.keys(this.yingCalTingSet(Yingcards, pl));
        if(YingtingSet.length > 0 && YingtingSet.indexOf(String(tData.lastPutCard)) >= 0 && hunNum >= 0){
            isYingMo = true;
        }else{
            isYingMo =false;
        }
        return isYingMo;
    };
    //求出所有听牌的合集，oSet已经听的牌
    majiang.yingCalTingSet = function (oCds, pl, oSet, hun) {
        var tingSet = oSet || {};
        var cds = oCds.slice();
        if ((oCds.length + 1) % 3 == 0) { // 14、11、8、5、2张g牌
            cds = oCds.slice(0, -1);
        }
        for (var i = 0; i < allCardsArray.length; i++) {
            if (this.canHu(cds, allCardsArray[i], pl)) {
                tingSet[allCardsArray[i]] = 1;
            }
        }
        return tingSet;
    };
    //是否可以胡
    majiang.canHuByHunCard = function (oCards,pl,cd) {
        var tData = MjClient.data.sData.tData;
        var oCards = this.transformCards(oCards, tData.hunCard);
        if(cd == tData.hunCard){
            cd = 200;
        }
        return this.canHu(oCards, cd, pl);
    };
    majiang.getHuType = function(oCards,pl, card) {
        var tData = MjClient.data.sData.tData;

        var huTypeInfo = {
            rate: 0,          // 番数
            strInfo: '',      // 信息
            isDaHu: false,    // 是否是大胡
            isYiSe: false,    // 是否是一色牌型
            isQuanQiu: false  // 是否是全求人
        }

        var mjhand = oCards.slice();
        if (card) {
            mjhand.push(card);
        }
        // 癞子牌统一替换为 200
        var handCards = this.transformCards(mjhand, tData.hunCard);

        var qingYiSe = this.isSameColor(handCards, pl.mjchi, pl.mjpeng, pl.mjgang0, pl.mjgang1);
        var jiangYiSe = this.isAllJiangColor(handCards.concat(pl.mjchi).concat(pl.mjpeng).concat(pl.mjgang0).concat(pl.mjgang1));
        var fengYiSe = this.isAllFengColor(handCards.concat(pl.mjchi).concat(pl.mjpeng).concat(pl.mjgang0).concat(pl.mjgang1));
        var pengPengHu = isDuiDuiHu(pl.mjchi, handCards);
        var quanQiuRen = this.quanQiuRen(tData, pl, handCards);

        if(qingYiSe == true){
            huTypeInfo.rate += 1;
            huTypeInfo.strInfo += huTypeInfo.strInfo == '' ? '清一色' : ',清一色';
            huTypeInfo.isDaHu = true;
            huTypeInfo.isYiSe = true;
        }

        if(jiangYiSe == true){
            huTypeInfo.rate += 1;
            huTypeInfo.strInfo += huTypeInfo.strInfo == '' ? '将一色' : ',将一色';
            huTypeInfo.isDaHu = true;
            huTypeInfo.isYiSe = true;
        }

        if(pengPengHu == true){
            huTypeInfo.rate += 1;
            huTypeInfo.strInfo += huTypeInfo.strInfo == '' ? '碰碰胡' : ',碰碰胡';
            huTypeInfo.isDaHu = true;
        }

        if(quanQiuRen == true){
            huTypeInfo.rate += 1;
            huTypeInfo.strInfo += huTypeInfo.strInfo == '' ? '全求人' : ',全求人';
            huTypeInfo.isDaHu = true;
            huTypeInfo.isQuanQiu = true;
        }

        if(huTypeInfo.strInfo == ''){
            huTypeInfo.strInfo = '平胡'
        }
        return huTypeInfo;
    };
    //全求人
    majiang.quanQiuRen = function(tData, pl, ocards){

        var jiangCards = [2, 5, 8];
        for (var i = 0; i < ocards.length; i++) {
            if (this.isEqualHunCard(ocards[i])) { // 除去混牌
                continue;
            }
            if (jiangCards.indexOf(ocards[i] % 10) < 0) {
                return false;
            }
        }

        if(tData.uids[tData.curPlayer] == pl.uid || ocards.length != 2 || pl.mjgang1.length > 0){
            return false;
        }

        return true;
    }
    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_hongZhongLaiZiGang = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
