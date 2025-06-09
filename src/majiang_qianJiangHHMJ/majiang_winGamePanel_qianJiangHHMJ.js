
var majiang_winGamePanel_qianJiangHHMJ = majiang_winGamePanel_hubei.extend({

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
 *  显示手牌内容
 **/
majiang_winGamePanel_qianJiangHHMJ.prototype.showHandCard = function(pl, infoImg){
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