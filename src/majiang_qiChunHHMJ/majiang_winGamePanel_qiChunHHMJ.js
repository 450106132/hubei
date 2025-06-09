
var majiang_winGamePanel_qiChunHHMJ = majiang_winGamePanel_hubei.extend({

    jsBind:{},

    ctor: function () {
        var jsonFile = "endOne_maJiang.json";
        this._super(jsonFile);
    },

    // override 无抓鸟
    showAddBird: function (back, tData) {
        // 修改显示
        var img_bridTips = back.getChildByName("img_bridTips");
        img_bridTips.visible = false;
    },

});


/**
 *  Override
 *  获取小结算手牌排序过的数组 【明杠,1，暗杠，1，碰，吃，赖子，手牌】 数组内容带1 增加间隔
 **/
majiang_winGamePanel_qiChunHHMJ.prototype.createEndSortCardArr = function(pl, infoImg){
    //明杠
    var i, j, cardNode, arry = [];
    for (i = 0; i < pl.mjgang0.length; i++) {
        for (j = 0; j < 4; j++) {
            cardNode = MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.EatCardFront, 
                MjClient.playui.HandleCardType.MingGang, pl.mjgang0[i], true);
            arry.push(cardNode);
        }
        arry.push(1); // 标志多移动一点
    }
    //添加暗杠
    for (i = 0; i < pl.mjgang1.length; i++) {
        for (j = 0; j < 4; j++) { 
            // 给牌背
            var handleCardType = j == 2 ? MjClient.playui.CsdDefaultCardType.EatCardBack : MjClient.playui.CsdDefaultCardType.EatCardFront;
            var cardTag = j == 2 ? null : pl.mjgang1[i];
            cardNode = MjClient.playui.createCard(infoImg, handleCardType, MjClient.playui.HandleCardType.AnGang, cardTag, true);
            arry.push(cardNode);
        }
        arry.push(1); // 标志多移动一点
    }
    //添加碰
    for (i = 0; i < pl.mjpeng.length; i++) {
        for (j = 0; j < 3; j++) {
            cardNode= MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.EatCardFront, 
                MjClient.playui.HandleCardType.Peng, pl.mjpeng[i], true);
            arry.push(cardNode);
        }
        arry.push(1); // 标志多移动一点
    }
    //添加吃
    for (i = 0; i < pl.mjchi.length; i++) {
        cardNode = MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.EatCardFront, 
            MjClient.playui.HandleCardType.Chi, pl.mjchi[i], true);
        arry.push(cardNode);
        if(i != 0 && (i + 1) % 3 == 0) arry.push(1); // 标志多移动一点
    } 
    arry.push(1); // 标志多移动一点 ;

     
    var isSeparate = false; // 是否需要隔开最后一张-
    if (pl.mjhand && pl.mjhand.length > 0){
        var count = MjClient.majiang.CardCount(pl);
        isSeparate = (count == 14); 
    }  
    var sortHandCard = this.getHandSort(pl.mjhand, isSeparate);
    if(!sortHandCard) return MjClient.endoneui.removeFromParent(true);
    //添加手牌
    for (i = 0; i < sortHandCard.length; i++) {
        if( isSeparate && i == (sortHandCard.length - 1)){
            arry.push(1); // 标志多移动一点
        }
        cardNode = MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.HandCard, 
            MjClient.playui.HandleCardType.Hand, sortHandCard[i], true);
        arry.push(cardNode);

    } 
    return arry;
};