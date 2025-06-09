//蕲春红中杠麻将小结算
var majiang_winGamePanel_qiChunHongZhongGang = majiang_winGamePanel_hubei.extend({
    jsonFile: "endOne_qiChunHongZhongGang.json",
    DING_TYPE: {
        NONE: 0,//不封顶
        SUPER_JIN_DING: 1,//超金顶
        JIN_DING: 2,    //金顶
        DOUBLE_DING: 3, //边顶
        SINGLE_DING: 4, //封顶
    },
    jsBind:{
        back: {
            img_bridTips:{
                _visible: false,
            }
        }
    },
    ctor: function(){
        this._super(this.jsonFile);
    }
});

//override 小结算显示痞子牌和癞子牌
majiang_winGamePanel_qiChunHongZhongGang.prototype.showAddBird = function (back, tData) {
    var laiCardNode = back.getChildByName("img_lai").getChildByName("img_eatFrontCard");
    var piCardNode = back.getChildByName("img_pi").getChildByName("img_eatFrontCard");

    var hunCard = MjClient.playui.getHunCard();
    var piCard = MjClient.playui.getPiZiCard();

    laiCardNode.setName(MjClient.playui.HandleCardType["Chi"]);
    laiCardNode.setTag(hunCard);
    MjClient.playui.setCardSprite(laiCardNode, hunCard, true);
    var laiZiIcon = laiCardNode.getChildByName("laiZi");
    laiZiIcon.setPosition(cc.pAdd(laiZiIcon.getPosition(), cc.p(-15, 0)));

    piCardNode.setName(MjClient.playui.HandleCardType["Chi"]);
    piCardNode.setTag(piCard);
    MjClient.playui.setCardSprite(piCardNode, piCard, true);
    var piZiIcon = piCardNode.getChildByName("laiZi");
    piZiIcon.setPosition(cc.pAdd(piZiIcon.getPosition(), cc.p(-15, 0)));
};

//Override 设置到各玩家面板数据
majiang_winGamePanel_qiChunHongZhongGang.prototype.setEndOneUserUI = function(infoImg,off){
    var itemNode = infoImg;
    majiang_winGamePanel.prototype.setEndOneUserUI.call(this, infoImg, off);
    //设置封顶和金鼎
    this.setFengDingIcon(itemNode, off);
};

majiang_winGamePanel_qiChunHongZhongGang.prototype.setFengDingIcon = function(infoImg,off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var pl = MjClient.playui.getPlayerWithIndex(off);
    if(!pl)return;
    infoImg = infoImg.getChildByName("layout_infoData");
    var jinDingIcon = infoImg.getChildByName("img_jinDing");
    jinDingIcon.setVisible(pl.fengDingType == this.DING_TYPE.JIN_DING);
    var fengDingIcon = infoImg.getChildByName("img_fengDing");
    fengDingIcon.setVisible(pl.fengDingType == this.DING_TYPE.SINGLE_DING);
    var bianDingIcon = infoImg.getChildByName("img_bianDing");
    bianDingIcon.setVisible(pl.fengDingType == this.DING_TYPE.DOUBLE_DING);
    var chaoJinDingIcon = infoImg.getChildByName("img_chaoJinDing");
    chaoJinDingIcon.setVisible(pl.fengDingType == this.DING_TYPE.SUPER_JIN_DING);

    var textFan = infoImg.getChildByName("text_fanShu");
    textFan.setString(pl.curFanCount + "番");
};


// 获取小结算手牌排序过的数组 【明杠,1，暗杠，1，碰，吃，赖子，手牌】 数组内容带1 增加间隔
majiang_winGamePanel_qiChunHongZhongGang.prototype.createEndSortCardArr = function(pl, infoImg){
    var cardNodeArr = majiang_winGamePanel.prototype.createEndSortCardArr.call(this, pl, infoImg) || [];
	return cardNodeArr;
};

// Override 返回手牌排序结果 【痞子牌，赖子牌，手牌，胡的牌】
majiang_winGamePanel_qiChunHongZhongGang.prototype.getHandSort = function(handCards, isHu){
    if(!handCards) return MjClient.endoneui.removeFromParent(true);
	var cardsArr = handCards.slice();
    var hunCard = MjClient.data.sData.tData.hunCard;
    var piZiCard = MjClient.data.sData.tData.piZiCard;
	var handArr = [], laiZiArr = [], piZiCardArr = [], hongZhongCardArr = [];
	var huCard = isHu ? cardsArr.pop() : 0;
	for(var i = 0;i < cardsArr.length;i++){
		var card = cardsArr[i];
		if(card && card == hunCard){
			laiZiArr.push(card);
			continue;
        }
        
        if(card && card == piZiCard){
            piZiCardArr.push(card);
            continue;
        }

        if(card && card == 71){
            hongZhongCardArr.push(card);
            continue;
        }
		handArr.push(card);
	}
	handArr.sort(function(a, b){
		return a - b;
	});
	var sortArr = [].concat(hongZhongCardArr, piZiCardArr, laiZiArr, handArr);
	if(huCard){
		sortArr.push(huCard);
	}
	return sortArr;
};
