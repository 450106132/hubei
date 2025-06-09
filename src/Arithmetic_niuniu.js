//牛牛算法类
function Niuniu(){
	this.handCount = 5;
	this.mjcards = [
		//筒
		21, 22, 23, 24, 25, 26, 27, 28, 29,
		21, 22, 23, 24, 25, 26, 27, 28, 29,
		21, 22, 23, 24, 25, 26, 27, 28, 29,
		21, 22, 23, 24, 25, 26, 27, 28, 29,
		//白板
		91, 91, 91, 91
	];
	//各个牌型倍数
	this.rates = [1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 4, 5, 6]; 
}

// 随机牌
Niuniu.prototype.randomCards = function(withWind){
	var cards = this.mjcards.slice();
	cards.sort(function (a, b) {
	    return .5 - Math.random();
	});
	return cards;
};

// 牌点数
Niuniu.prototype.cardValue = function(card){
	if (card == 91) {
		return 10;
	}
	return card % 10;
};

// 是否特殊牌型 cards有序
Niuniu.prototype.special = function(cards, totalValue) {
	if (cards && cards.length == 5) {
		if (totalValue <= 10 && this.cardValue(cards[4]) < 5) {
			return 1200 + cards[4]; //五小牛
		}
		if (cards[0] == cards[3] || cards[1] == cards[4]) {
			return 1100 + cards[2]; //炸弹
		}
	}
	return null;
};

// 判断有牛
Niuniu.prototype.hasNiu = function(cards, selectedCards) {
	if (!selectedCards || selectedCards.length != 3){
		return false;
	}
	var totalValue = 0;
	for (var i = 0; i < selectedCards.length; i++) {
		if (cards.indexOf(selectedCards[i]) < 0) { //没有这张牌
			return false;
		}
		totalValue += this.cardValue(selectedCards[i]);
	}
	return totalValue % 10 == 0;
};

// oCards：所有手牌，selectedCards：拼牛的三张牌
// 返回分数：牌型X100加上最大的一张牌
Niuniu.prototype.calHandScore = function(oCards, selectedCards){
	var cards = oCards.slice().sort(function(a, b) {
		return a - b; 
	});
	var totalValue = 0;
	for (var i = 0; i < cards.length; i++) {
		totalValue += this.cardValue(cards[i]);
	}
	// 特殊牌型判断
	var special = this.special(cards, totalValue);
	if (special) {
		return special;
	}
	// 没拼出牛
	if (!this.hasNiu(cards, selectedCards)) {
		return cards[cards.length - 1];
	}
	// 计算点数
	for (var i = 0; i < selectedCards.length; i++) {
		totalValue -= this.cardValue(selectedCards[i]);
		cards.splice(cards.indexOf(selectedCards[i]), 1);
	}
	if (totalValue % 10 == 0) {
		return 1000 + cards[cards.length - 1]; // 牛牛
	}
	return (totalValue % 10) * 100 + cards[cards.length - 1];
};

// 牌型点数 0：没牛、1：牛丁、2：牛二……10：牛牛、11：炸弹、12五小牛
Niuniu.prototype.handPoint = function(score){
	return Math.floor(score/100);
}

// 计算赔率
Niuniu.prototype.calRate = function(score){
	return this.rates[this.handPoint(score)];
}

Niuniu.prototype.setJiaZhuNum = function (node, pl)
{
	if(!pl) return;
    var icountNode = node.getChildByName("head").getChildByName("jiaZhu");
    var goldIconNode = node.getChildByName("head").getChildByName("gold_icon");
    var icount = pl.jiazhuNum;
    var tData = MjClient.data.sData.tData;
    if(icountNode != null && tData.uids[tData.zhuang] != pl.info.uid) {
        icountNode.visible = true;
        goldIconNode.visible = true;
        cc.log("set jiazhuNum ------ icount = " + icount);
        icountNode.ignoreContentAdaptWithSize(true);
        icountNode.setString(icount);

        var tData = MjClient.data.sData.tData;
        var _diZhu= tData.areaSelectMode.diZhu;

        var _idx = parseInt(icount/_diZhu);

        switch (_idx)
        {
            case 1:
                goldIconNode.loadTexture("niuniu/img_coin_0.png");
                break;
            case 2:
                goldIconNode.loadTexture("niuniu/img_coin_1.png");
                break;
            case 3:
                goldIconNode.loadTexture("niuniu/img_coin_2.png");
                break;
            case 4:
			case 5:
                goldIconNode.loadTexture("niuniu/img_coin_3.png");
                break;
            default:
                goldIconNode.loadTexture("niuniu/img_coin_3.png");
                break;

        }
    }
};

MjClient.majiang_niuniu = new Niuniu();