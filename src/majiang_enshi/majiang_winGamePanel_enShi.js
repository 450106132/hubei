//恩施麻将小结算
var majiang_winGamePanel_enShi = majiang_winGamePanel_hubei.extend({
    jsonFile: "endOne_enShi.json",
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
majiang_winGamePanel_enShi.prototype.showAddBird = function (back, tData) {
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
majiang_winGamePanel_enShi.prototype.setEndOneUserUI = function(infoImg,off){
    var itemNode = infoImg;
    majiang_winGamePanel.prototype.setEndOneUserUI.call(this, infoImg, off);
    //设置封顶和金鼎
    this.setFengDingIcon(itemNode, off);
};

majiang_winGamePanel_enShi.prototype.setFengDingIcon = function(infoImg,off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    
    var winnerUid;
    var fengDingPlayerCount = 0;
    for(var i = 0; i < tData.uids.length; i++){
        var player = sData.players[tData.uids[i]];
        if(player.winone > 0){
            winnerUid = tData.uids[i];
            continue;
        }
        if(player.isFengDing == true){
            fengDingPlayerCount += 1;
        }
    }

    var pl = MjClient.playui.getPlayerWithIndex(off);
    if(!pl)return;
    infoImg = infoImg.getChildByName("layout_infoData");
    var jinDingIcon = infoImg.getChildByName("img_jinDing");
    jinDingIcon.visible = (fengDingPlayerCount == tData.maxPlayer - 1 && pl.info.uid != winnerUid && pl.isFengDing);
    var fengDingIcon = infoImg.getChildByName("img_fengDing");
    fengDingIcon.visible = (fengDingPlayerCount != tData.maxPlayer - 1 && pl.info.uid != winnerUid && pl.isFengDing);
};


// 获取小结算手牌排序过的数组 【明杠,1，暗杠，1，碰，吃，赖子，手牌】 数组内容带1 增加间隔
majiang_winGamePanel_enShi.prototype.createEndSortCardArr = function(pl, infoImg){
    var cardNodeArr = majiang_winGamePanel.prototype.createEndSortCardArr.call(this, pl, infoImg) || [];
    // //痞子杠
    // var cardNode;
    // if(pl.mjPiZiGang && pl.mjPiZiGang.length > 0){
    //     for(var i = 0 , len = pl.mjPiZiGang.length; i < len; i++){
    //         cardNode= MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.EatCardFront, 
    //             pl.mjPiZiGang[i] == MjClient.playui.getPiZiCard() ? MjClient.playui.HandleCardType.PiZiGang : MjClient.playui.HandleCardType.LaiiZiGang
    //            , pl.mjPiZiGang[i], true);
    //         cardNodeArr.unshift(cardNode);
    //     }
    // }

	return cardNodeArr;
};

// Override 返回手牌排序结果 【痞子牌，赖子牌，手牌，胡的牌】
majiang_winGamePanel_enShi.prototype.getHandSort = function(handCards, isHu){
    if(!handCards) return MjClient.endoneui.removeFromParent(true);
	var cardsArr = handCards.slice();
    var hunCard = MjClient.data.sData.tData.hunCard;
    var piZiCard = MjClient.data.sData.tData.piZiCard;
	var handArr = [], laiZiArr = [], piZiCardArr = [];
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
		handArr.push(card);
	}
	handArr.sort(function(a, b){
		return a - b;
	});
	var sortArr = [].concat(piZiCardArr, laiZiArr, handArr);
	if(huCard){
		sortArr.push(huCard);
	}
	return sortArr;
};
