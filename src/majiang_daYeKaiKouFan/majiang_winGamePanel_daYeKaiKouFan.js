//麻将小结算
var majiang_winGamePanel_daYeKaiKouFan  = majiang_winGamePanel_hubei.extend({
    jsonFile: "endOne_daYeKaiKouFan.json",
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
// 显示麻将小结算底牌
majiang_winGamePanel_daYeKaiKouFan.prototype.showFinalCard = function (_back) {
    var finalView = _back.getChildByName("listiew_finalView");
    var cardItem = _back.getChildByName("img_eatFrontCard");
    cardItem.setVisible(false);

    var dipaiCard = MjClient.data.sData.cards;
    if (dipaiCard) {

        var cardSize = cc.size(cardItem.width * cardItem.scale, cardItem.height * cardItem.scale );
        var backLayout = new ccui.Layout();
        backLayout.setContentSize(cc.size(cardSize.width * dipaiCard.length,cardSize.height));
        finalView.pushBackCustomItem(backLayout);

        for (var i = 0; i < dipaiCard.length; i ++) {
            var cardNode = MjClient.playui.createCard(_back, MjClient.playui.CsdDefaultCardType.EatCardFront,
                MjClient.playui.HandleCardType.Chi, dipaiCard[i], true);
            cardNode.removeFromParent();
            cardNode.visible = true;
            cardNode.x = (cardSize.width /2) + i * cardSize.width;
            cardNode.y = backLayout.height / 2;
            backLayout.addChild(cardNode);
        }
        finalView.forceDoLayout();
    }
};
//Override 设置到各玩家面板数据
majiang_winGamePanel_daYeKaiKouFan.prototype.setEndOneUserUI = function(infoImg,off){
    var itemNode = infoImg;
    majiang_winGamePanel.prototype.setEndOneUserUI.call(this, infoImg, off);
    //设置封顶和承包
    this.setEndOneUserInfo(itemNode, off);
};
majiang_winGamePanel_daYeKaiKouFan.prototype.setGameOverPanelPlayerState = function(stateNode, pl){
    var fileName = "";
    var cardCount = MjClient.majiang.CardCount(pl);

    if (pl.winType == 3 && cardCount == 14){
        fileName = "gameOver/ico_zimo.png";

    } else if (pl.winType > 0 && cardCount == 14){
        fileName = "gameOver/ico_hu-0.png";

    } else if (pl.isChengBao){
        stateNode.visible = true;
        fileName = "gameOver/bg_chengbao.png";
    } else if (((pl.mjdesc + "").indexOf("点炮") >= 0 || (pl.mjdesc + "").indexOf("放炮") >= 0) && cardCount == 13){
        stateNode.visible = true;
        fileName = "gameOver/ico_dianpao.png";
    }

    if (fileName != ""){
        stateNode.loadTexture(fileName);
        stateNode.ignoreContentAdaptWithSize(true);
    } else {
        stateNode.visible = false;
    }
}
majiang_winGamePanel_daYeKaiKouFan.prototype.setEndOneUserInfo = function(infoImg,off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    
    var winnerUid;
    for(var i = 0; i < tData.uids.length; i++){
        var player = sData.players[tData.uids[i]];
        if(player.winone > 0){
            winnerUid = tData.uids[i];
            break;
        }
    }

    var pl = MjClient.playui.getPlayerWithIndex(off);
    if(!pl) return;
    infoImg = infoImg.getChildByName("layout_infoData");
    var jinDingIcon = infoImg.getChildByName("img_jinDing");
    jinDingIcon.visible = (pl.info.uid != winnerUid && pl.fengDingType == 2);
    var yangGuangDing = infoImg.getChildByName("img_yangGuangDing");
    yangGuangDing.visible = (pl.info.uid != winnerUid && pl.fengDingType == 3);
    var sanYang = infoImg.getChildByName("img_sanYang");
    sanYang.visible = (pl.info.uid != winnerUid && pl.fengDingType == 4);

    var textFanShu = infoImg.getChildByName("text_fanShu");
    textFanShu.ignoreContentAdaptWithSize(true);
    textFanShu.setString(pl.rate + "番");
};

majiang_winGamePanel_daYeKaiKouFan.prototype.showAddBird =function(){
    return false;
}
// 获取小结算手牌排序过的数组 【明杠,1，暗杠，1，碰，吃，赖子，手牌】 数组内容带1 增加间隔
majiang_winGamePanel_daYeKaiKouFan.prototype.createEndSortCardArr = function(pl, infoImg){
    var cardNodeArr = majiang_winGamePanel.prototype.createEndSortCardArr.call(this, pl, infoImg) || [];
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
majiang_winGamePanel_daYeKaiKouFan.prototype.getHandSort = function(handCards, isHu){
    if(!handCards) return MjClient.endoneui.removeFromParent(true);
	var cardsArr = handCards.slice();
	var handArr = [], laiZiArr = [];
	var huCard = isHu ? cardsArr.pop() : 0;
	for(var i = 0;i < cardsArr.length;i++){
		var card = cardsArr[i];
        if(this.isSpecialGang(card)){
            laiZiArr.push(card);
            continue;
        }
		handArr.push(card);
	}
	handArr.sort(function(a, b){
		return a - b;
	});
    laiZiArr.sort(function(a, b){
        if(a.tag == MjClient.data.sData.tData.hunCard || b.tag == MjClient.data.sData.tData.hunCard){
            return a.tag - b.tag;
        }
        return b.tag - a.tag;
    });
    var sortArr = [].concat(laiZiArr, handArr);
	if(huCard){
		sortArr.push(huCard);
	}
	return sortArr;
};
majiang_winGamePanel_daYeKaiKouFan.prototype.isSpecialGang = function(card){
    if(card == 71 || card == 81 || card == MjClient.data.sData.tData.hunCard){
        return true;
    }
    return false;
};