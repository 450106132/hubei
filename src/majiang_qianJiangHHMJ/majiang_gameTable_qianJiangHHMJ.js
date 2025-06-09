/***
 * 在原有基础添加 换牌操作 因此重写麻将牌布局的相关函数
 * Data: 2019.1.6
 * Author: Jcw
 */

/****************************************     朝天杠牌时的处理相关   *******************************************************/
 
/**
 *  Override
 *  初始化玩家牌局信息
 **/
majiang_panel_qianJiangHHMJ.prototype.updatePlayerCards = function (node){

    var tData = MjClient.data.sData.tData;

    var player = this.getPlayerInfoByName(node.getName());
    if(!player){
        return;
    }

    this.removeAllCards(node);
    this.removePutCardTip();
    if (!this.isInGame()){
        return;
    }

    var i,j;
    // 添加暗杠
    for(i = 0; i < player.mjgang1.length; i++){
        var length = player.mjgang1[i] == tData.chaoTianCard ? 3 : 4;
        for(j = 0; j < length; j++){
            if (length == 3) {
                this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Peng, player.mjgang1[i]);
            }
            else {
                this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.AnGang, player.mjgang1[i]);
            }
        }
    }
    // 添加明杠
    for(i = 0; i < player.mjgang0.length; i++){
        var length = player.mjgang0[i] == tData.chaoTianCard ? 3 : 4;
        for(j = 0; j < length; j++){
            if (length == 3) {
                this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Peng, player.mjgang0[i]);
            }
            else {
                this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.MingGang, player.mjgang0[i]);
            }
        }
    }

    // 添加碰杠
    if(player.mjgang2)
    {
        for(i = 0; i < player.mjgang2.length; i++){
            for(j = 0; j < 4; j++){
                this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.PengGang, player.mjgang2[i]);
            }
        }
    }

    // 添加碰
    for(i = 0; i < player.mjpeng.length; i++){
        for(j = 0; j < 3; j++)        {
            this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Peng, player.mjpeng[i]);
        }
    }
    // 吃
    for(i = 0; i < player.mjchi.length; i++){
        this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Chi, player.mjchi[i]);
    }
    // 添加打出的牌
    for(i = 0; i < player.mjput.length; i++){
        this.createCard(node, this.CsdDefaultCardType.PutCardOne, this.HandleCardType.Put, player.mjput[i]);
    }
    // 添加手牌
    if(MjClient.rePlayVideo == -1){
        if(player.mjhand && this.NodeNameArray.indexOf(node.getName()) == 0){
            for(i = 0; i < player.mjhand.length; i++){
                this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand, player.mjhand[i]);
            }
        }else{
            var CardCount = 0;
            var tData = MjClient.data.sData.tData;
            if(tData.tState == TableState.waitPut && tData.uids[tData.curPlayer] == player.info.uid){
                CardCount = 14;
            }else {
                CardCount = 13;
            }

            CardCount = CardCount - ((player.mjpeng.length + player.mjgang0.length + player.mjgang1.length) * 3 + player.mjchi.length);
            for(i = 0; i < CardCount; i++){
                this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand);
            }
        }
    }else if(player.mjhand){
        for (i = 0; i < player.mjhand.length; i++) {
            this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand, player.mjhand[i]);
        }
    }

    this.switchUpdate2DAnd3D(node);
};


/**
 *  Override
 *  处理麻将明杠
 **/
majiang_panel_qianJiangHHMJ.prototype.dealMingGang = function(playerNode, msg) {
    var gangCard = msg.card;
    
    if (MjClient.rePlayVideo != -1 || playerNode.getName() == "node_down") {
        this.removeCard(playerNode, this.HandleCardType.Hand, gangCard, 3);
    } else {
        this.removeCard(playerNode, this.HandleCardType.Hand, null, 3);
    }

    var tData = MjClient.data.sData.tData;
    var length = gangCard == tData.chaoTianCard ? 3 : 4;
    for (var i = 0; i < length; i++) {
        if (length == 3) {
            this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Peng, gangCard);
        }
        else {
            this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.MingGang, gangCard);
        }
    }

    this.resetCardLayout(playerNode);
    this.showEatActionAnim(playerNode, this.AnimationType.GANG);
};


/**
 *  Override
 *  处理麻将暗杠
 **/
majiang_panel_qianJiangHHMJ.prototype.dealAnGang = function(playerNode, msg) {
    var gangCard = msg.card;
    
    if (MjClient.rePlayVideo != -1 || playerNode.getName() == "node_down") {
        this.removeCard(playerNode, this.HandleCardType.Hand, gangCard, 4);
    } else {
        this.removeCard(playerNode, this.HandleCardType.Hand, null, 4);
    }

    var tData = MjClient.data.sData.tData;
    var length = gangCard == tData.chaoTianCard ? 3 : 4;
    for (var i = 0; i < length; i++) {
        if (length == 3) {
            this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Peng, gangCard);
        }
        else {
            this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.AnGang, gangCard);
        }
    }

    this.resetCardLayout(playerNode);
    this.showEatActionAnim(playerNode, this.AnimationType.GANG);
};

/****************************************     后台返回换牌时的处理相关   *******************************************************/

/**
 *  @override
 *  处理麻将吃、碰、杠
 **/
majiang_panel_qianJiangHHMJ.prototype.handleCommand = function(playerNode, msg, type){
    var tData = MjClient.data.sData.tData;
    var player = this.getPlayerInfoByName(playerNode.getName());
    if (!msg.huanFinish) {
	    if (msg && msg.uid && msg.uid != player.info.uid) {
	        return;
	    }
	    if (msg && msg.cpginfo && msg.cpginfo.id != player.info.uid) {
	        return;
	    }
    }
    this.handleOtherPlayerCards(msg);

    switch(type){
        case this.AnimationType.CHI:
            this.dealChi(playerNode, msg);
            break;
        case this.AnimationType.PENG:
            this.dealPeng(playerNode, msg);
            break;
        case this.AnimationType.GANG:
            this.dealGang(playerNode, msg);
            break;
        case this.AnimationType.TING:
            this.dealTing(playerNode, msg);
            break;
        case this.AnimationType.HUAN:
            this.dealHuan(playerNode, msg);
            break;
        case this.AnimationType.HUANFINISH:
            this.dealHuanFinish(player, playerNode, msg);
            break;
    }
    MjClient.movingCard = null;
    this.checkPutCards(playerNode);
};

/**
 *  处理麻将换牌
 **/
majiang_panel_qianJiangHHMJ.prototype.dealHuan = function(playerNode, msg) {
    for (var i = 0; i < msg.huanBefore.length; i++) {
        var huanCard = msg.huanBefore[i];
        // 从手牌中删除
        if (MjClient.rePlayVideo != -1 || playerNode.getName() == "node_down") {
            this.removeCard(playerNode, this.HandleCardType.Hand, huanCard);
        } else {
            this.removeCard(playerNode, this.HandleCardType.Hand);
        }
    }
    this.resetCardLayout(playerNode);
    // this.showEatActionAnim(playerNode, this.AnimationType.HUAN);
};

/**
 *  处理麻将换牌结束
 **/
majiang_panel_qianJiangHHMJ.prototype.dealHuanFinish = function(player, playerNode, msg) {
	var huanAfter = msg.backData[player.info.uid].huanAfter;
    for (var i = 0; i < huanAfter.length; i++) {
        var huanCard = huanAfter[i];
        // 创建一个换的牌
        if (MjClient.rePlayVideo != -1 || playerNode.getName() == "node_down") {
        	this.createCard(playerNode, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand, huanCard);
        } else {
            this.createCard(playerNode, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand);
        }
        
    }
    this.resetCardLayout(playerNode);
    // this.showEatActionAnim(playerNode, this.AnimationType.HUANFINISH);
};
