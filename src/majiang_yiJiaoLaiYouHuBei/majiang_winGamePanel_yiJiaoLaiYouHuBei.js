
var majiang_winGamePanel_yiJiaoLaiYouHuBei = majiang_winGamePanel_hubei.extend({

    jsBind:{},

    ctor: function () {
        var jsonFile = "endOne_maJiang.json";
        this._super(jsonFile);
    },


    /**
     *  override
     *  小结算显示买马内容
     **/
    showAddBird : function (back, tData) {
        // 修改显示
        var img_bridTips = back.getChildByName("img_bridTips");
        img_bridTips.loadTexture("playing/yijiaolaiyou/maima.png");
        img_bridTips.ignoreContentAdaptWithSize(true);

        var listViewBirds = img_bridTips.getChildByName("listview_niao");
        var countNode = img_bridTips.getChildByName("text_count");
        var cardnode = img_bridTips.getChildByName(MjClient.playui.CsdDefaultCardType["EatCardFront"]);
        listViewBirds.visible = false;
        countNode.visible = false;
        cardnode.visible = false;
        
        var cards = tData.mopai;
        if (cards.length > 0) {
            img_bridTips.visible = true;

            // MjClient.playui.setCardSprite(cardnode, cards[0], true);
            var cardNode = MjClient.playui.createCard(back, MjClient.playui.CsdDefaultCardType.EatCardFront,
                            MjClient.playui.HandleCardType.Chi, cards[0], true);
            cardNode.removeFromParent();
            cardNode.visible = true; 
            cardNode.x = cardnode.x;
            cardNode.y = img_bridTips.height/2;
            img_bridTips.addChild(cardNode);
        }
        else {
            img_bridTips.visible = false;
        }
    },


});


/**
 *  Override
 *  显示手牌内容
 **/
majiang_winGamePanel_yiJiaoLaiYouHuBei.prototype.showHandCard = function(pl, infoImg){
    var arry = this.createEndSortCardArr(pl, infoImg);
    var posx = 0;
    var gangNum = 0; // 杠要叠牌
    for (var i = 0; i < arry.length; i++) {
        if(arry[i] === 1){
            posx += 8;
            continue;
        }

        if(!arry[i]){
            MjClient.showToast("报错了！！！");
            continue;
        }

        arry[i].visible = true;
        arry[i].enabled = false;
        arry[i].setScale(arry[i].getScale());
        if(arry[i].name == "anGang" || arry[i].name == "mingGang"){
            gangNum++;
            if(gangNum % 3 == 0 && gangNum != 0){
                posx -= arry[i].width * arry[i].getScale();
                arry[i].y += 8; 

                // 小结算对朝杠显示处理
                if (MjClient.playui.getChaoCard() == arry[i].tag || MjClient.playui.getChaoCard() == arry[i-1].tag && arry[i].tag == 0) {
                    arry[i].y -= 8; 
                }

            }else if(gangNum == 4){
                gangNum = 0;
            } 
        }else{
            gangNum = 0;
        }
        arry[i].x += posx;
        posx += arry[i].width * arry[i].getScale() * 0.97; 
    }
};