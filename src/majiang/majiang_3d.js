/**
 *	是否能切换3D,之前函数叫isCanChangTo3D //todo.... 暂时不开放3D功能
 **/
majiang_panel.prototype.isCanSwitch3D = function(){
	return true;
};

/**
 *	获得3D状态,之前的is3DUI
 **/
majiang_panel.prototype.is3DStyle = function(){
    if(MjClient.rePlayVideo !== -1) {
    	return false;
    }

    if(this.isCanSwitch3D() && this.get3DType()){

        return true;
    }
    return false;
};

/**
 * 某些个别的地区的玩法，3D的情况下要保持原来的UI显示方式，主要是剩余张数，剩余局数
 * 原来的函数名叫isSpecialRoomUI
 */
majiang_panel.prototype.isKeepOldUIStyle = function(){
    return false;
};

/**
 *  改变麻将风格之后，刷新牌背、牌面以及牌面坐标调整
 **/
majiang_panel.prototype.updateChiGangCards3D = function(cardNode, cardTag){
    this.setCardSprite3D(cardNode, cardTag);
    var cardImg = cardNode.getChildByName("cardImg");
    if(cardImg){
        var size = cardNode.getContentSize();
        cardImg.setPosition(size.width / 2, size.height * 0.6);
    }   
};

/**
 *  设置麻将
 *  cardNode:  麻将节点
 *  cardTag:  
 *  cardIndex: cardNode在所有麻将中的索引
 **/
majiang_panel.prototype.setCardSprite3D = function(cardNode, cardTag){
    var playerNode = cardNode.getParent();
    var offIndex = 0;
    if(playerNode){
        offIndex = this.getNodeIndexDefaultByName(playerNode.getName());
        offIndex = offIndex == -1 ? 0 : offIndex;
    }
    if(offIndex == 2 && this.isCardRotationOfTopPlayer(cardNode)) offIndex = 0;
    var cardImg = this.getCardFaceImg3D(cardTag);
    cardImg.setRotation(-90 * offIndex);
    if (cc.sys.isObjectValid(cardImg) && !cardTag) {
        cardImg.tag = cardTag;
    }
    cardNode.removeAllChildren();
    cardNode.addChild(cardImg);
    this.updateAfterChangeMjBg3D(cardNode, this.getMaJiangBgType(), offIndex);
    this.addLaiZiIcon3D(cardNode);
};

/**
 *  获得牌面
 **/
majiang_panel.prototype.getCardFaceImg3D = function(cardTag){
    var imgNames = ["Bamboo_", "Character_", "Dot_", "Wind_east", "Wind_south", "Wind_west", "Wind_north", "Red", "Green", "White"];
    var cardImg = new ccui.ImageView();
    cardImg.setName("cardImg");
    var imgName = "";
    if(cardTag < 30){//条，筒，万
        imgName = imgNames[Math.floor(cardTag / 10)] + cardTag % 10;
    }else if (cardTag <= 91){   //东南西北中发白
        imgName = imgNames[Math.floor(cardTag / 10)];//东南西北中发白
    }else if (cardTag <= 181){
        imgName = "flower_" + cardTag;
    }
    var is3D = this.is3DStyle();
    var cardTypeList = this.getCardFrontList(is3D);
    var mjBgType = this.getMaJiangBgType();
    cardImg.loadTexture(cardTypeList[mjBgType]  + "/" + imgName + ".png");
    return cardImg;
};

/**
 *  改变麻将风格之后，刷新牌背、牌面以及牌面坐标调整
 **/
majiang_panel.prototype.updateAfterChangeMjBg3D = function(cardNode, mjBgType, nodeIndex){
    nodeIndex = nodeIndex === undefined ? 0 : nodeIndex;
    mjBgType = mjBgType === undefined ? this.getMaJiangBgType() : mjBgType;
    
    var playerNode = cardNode.getParent();
    if(playerNode.getName() == "node_down"){
        if(cardNode.getName() == this.HandleCardType.Hand){
            var templetCard = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
            cardNode.setScale(templetCard.scale * 1.3 * 1.2);
            cardNode.ignoreContentAdaptWithSize(true);
            if(mjBgType == 0){
                cardNode.loadTexture("playing/MJ3D/downCard/handCard.png");
            }else if(mjBgType == 1){
                cardNode.loadTexture("playing/MJ3D/downCard/handCard_liuxing.png");
            }
        }
    }else if(playerNode.getName() == "node_right"){
        if(cardNode.getName() == this.HandleCardType.Hand){
            cardNode.loadTexture("playing/MJ3D/rightCard/rightStand.png");
        }
    }else if(playerNode.getName() == "node_top"){
        if(cardNode.getName() == this.HandleCardType.Hand){
            cardNode.loadTexture("playing/MJ3D/top/handCard.png");
        }
    }else if(playerNode.getName() == "node_left"){
        if(cardNode.getName() == this.HandleCardType.Hand){
            cardNode.loadTexture("playing/MJ3D/left/leftStand.png");
        }
    }

    var cardImg = cardNode.getChildByName("cardImg");
    if(!cardImg){
        return;
    }

    var cardFacePosArr = this.getCardFacePositon3D(mjBgType, cardNode.getName());
    var cardFrontName = this.sliceLastWithSep(cardImg.getRenderFile().file, "/");
    var cardFrontList = this.getCardFrontList(true);
    cardImg.loadTexture(cardFrontList[mjBgType] + "/" + cardFrontName);

    var copyNode = cardNode;
    if(cardNode.getName() == this.HandleCardType.Put){
        copyNode = playerNode.getChildByName(this.CsdDefaultCardType.PutCardOne);
    }else if(cardNode.getName() == this.HandleCardType.Chi || 
        cardNode.getName() == this.HandleCardType.Peng ||
        cardNode.getName() == this.HandleCardType.MingGang ||
        cardNode.getName() == this.HandleCardType.PengGang ||
        cardNode.getName() == this.HandleCardType.AnGang )
    {
        copyNode = playerNode.getChildByName(this.CsdDefaultCardType.EatCardFront);
    }
    copyNode = copyNode ? copyNode : cardNode;
    var pos_x = cardFacePosArr[nodeIndex][0] * copyNode.width;
    var pos_y = cardFacePosArr[nodeIndex][1] * copyNode.height;
    cardImg.setPosition(pos_x, pos_y);    
};

/**
 *  获得牌面的坐标(提出来方便重写)
 *  mjBgType: 麻将牌背类型
 *  return {Array}
 **/
majiang_panel.prototype.getCardFacePositon3D = function(mjBgType, cardTypeName){
    cardTypeName = cardTypeName === undefined ? this.HandleCardType.Hand : cardTypeName;
    var offSets = this.getHandCardFacePosition3D(mjBgType);
    switch(cardTypeName){
        case this.HandleCardType.Hand:
            offSets = this.getHandCardFacePosition3D(mjBgType);
            break;
        case this.HandleCardType.Chi:
        case this.HandleCardType.Peng:
        case this.HandleCardType.AnGang:
        case this.HandleCardType.MingGang:
        case this.HandleCardType.PengGang:
        case this.HandleCardType.Put:
            offSets = this.getPutCardFacePosition3D(mjBgType);
            break;
    }
    return offSets;
};

/**
 *  获得手牌的牌牌背和牌面对应的坐标
 **/
majiang_panel.prototype.getHandCardFacePosition3D = function(mjBgType){
    var offSets = [[0.5, 0.43], [60, 66], [50, 104], [60, 66], [52, 68], [53, 64], [19, 25]];
    return offSets;
};

/**
 *  添加癞子标识
 **/
majiang_panel.prototype.addLaiZiIcon3D = function(cardNode){
    if(!this.isCanAddLaiZiIcon(cardNode.tag)){
        return;
    }
    var offIndex = this.getNodeIndexDefaultByName(cardNode.getParent().getName());
    offIndex = offIndex == -1 ? 0 : offIndex;
    var laiZiPosArr = this.getCardFacePositon3D();
    var laiZiNode = this.getLaiZiIcon2D(cardNode.tag);
    var pos_x = laiZiPosArr[offIndex][0] * cardNode.width;
    var pos_y = laiZiPosArr[offIndex][1] * cardNode.height;
    laiZiNode.setPosition(pos_x, pos_y);
    laiZiNode.setRotation(-90 * offIndex);
    cardNode.addChild(laiZiNode);
};

/**
 *  获得打出的牌牌背和牌面对应的坐标
 **/
majiang_panel.prototype.getPutCardFacePosition3D = function(mjBgType){
    var offSets = [[0.4, 0.5], [0.48, 0.66], [0.5, 0.5], [0.48, 0.66]];
    return offSets;
};

/**
 *  刷新牌
 **/
majiang_panel.prototype.resetCardLayout3D = function(node){
    var player = this.getPlayerInfoByName(node.getName());
    if(!player){
        return;
    }
    if(MjClient.rePlayVideo != -1 && !player.mjhand) {
        return;
    }
    
    var newCardTag = null;
    var handCount = this.getCardNodeCountByName(node, this.HandleCardType.Hand);
    if(player.mjhand && handCount % 3 == 2 && MjClient.rePlayVideo == -1 && player.isNew || //正常牌局
        player.mjhand && handCount % 3 == 2 && MjClient.rePlayVideo != -1 ||                //回放
        player.mjhand && player.mjhand.length % 3 == 2 && player.isZiMo)                    //倒牌(只有自摸才隔开)
    {
        newCardTag = player.mjhand[player.mjhand.length - 1];
    }

    var cardArray = this.getCardSortArray3D(node, newCardTag);
    if(cardArray.length == 0){
        return;
    }
    this.switchUpdate3D(node, cardArray);
};

/**
 *  所有的牌进行排序
 **/
majiang_panel.prototype.getCardSortArray3D = function(node, newCardTag){
    var tData = MjClient.data.sData.tData;
    var handArr = [], anGangArr = [], mingGangArr = [], pengArr = [], chiArr = [], laiZiArr = [];
    var children = node.children;
    var i, newCard = null;
    if(newCardTag > 0 ){
        this.newCardNode  = null;
    }

    for(i = 0;i < children.length;i++){
        var child = children[i];
        if(child.name == this.HandleCardType.Hand || (child.name == this.HandleCardType.Chi && child.isCut)){
            if(!newCard && child.tag == newCardTag && !child.isGray){
                newCard = child;
                this.newCardNode  = child;
                this.newCardNode.isNew = true;
                continue;
            }
            if(MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(child.tag, tData.hunCard)){
                laiZiArr.push(child);
                continue;
            }
            handArr.push(child);
        }else if(child.name == this.HandleCardType.AnGang){
            anGangArr.push(child);
        }else if(child.name == this.HandleCardType.MingGang){
            mingGangArr.push(child);
        }else if(child.name == this.HandleCardType.PengGang){
            mingGangArr.push(child);
        }else if(child.name == this.HandleCardType.Peng){
            pengArr.push(child);
        }else if(child.name == this.HandleCardType.Chi){
            chiArr.push(child);
        }
    }

    var sortArray = function(cardArray){
        cardArray.sort(function(a, b){
            return a.tag - b.tag;
        });
        return cardArray;
    };
    handArr = sortArray(handArr);
    pengArr = sortArray(pengArr);
    anGangArr = sortArray(anGangArr);
    mingGangArr = sortArray(mingGangArr);

    if(newCard){
        handArr.push(newCard);
    }
    laiZiArr.sort(function(a, b){
        return a.tag - b.tag;
    });    
    for(i = 0;i < laiZiArr.length;i++){
        handArr.unshift(laiZiArr[i]);
    }

    var cardArray = [].concat(anGangArr, mingGangArr, pengArr, chiArr, handArr);
    var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
    if(nodeIndex == 1 || nodeIndex == 2){
        cardArray.reverse();
    }    
    return cardArray;
};

/**
 *  3D吃、碰、杠、手牌刷新
 **/
majiang_panel.prototype.switchUpdate3D = function(node, cardArray){
    var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
    switch(nodeIndex){
        case 0:
            this.updateDownEatAndHandCards3D(cardArray);
            break;
        case 1:
            this.updateRightEatAndHandCards3D(cardArray);
            break;
        case 2:
            this.updateTopEatAndHandCards3D(cardArray);
            break;
        case 3:
            this.updateLeftEatAndHandCards3D(cardArray);
            break;
    }
};

//获取吃碰杠和手牌的癞子图标位置偏移比
majiang_panel.prototype.getEatAndHandCardsLaiZiIconPosSpcae3D = function(){
    return cc.p(1.1, 1.1);
}

//获取3d玩家吃碰杠手牌的起始位置
majiang_panel.prototype.getEatAndHandCardsStartPos3D = function(node_name, firstCardType){
    if(node_name == "node_down"){
        if(firstCardType == this.HandleCardType.Hand){
            return cc.p(cc.winSize.width * 0.05, 0);
        }
        return cc.p(cc.winSize.width * 0.07, 0);
    }
    return cc.p(0, 0);
};

//获取吃碰杠的最后一张牌和手牌第一张的间距比例
majiang_panel.prototype.getHandAndEatCardSpcae3D = function(){
    return 1.20;
};


// 获得3D癞子牌标签位置
majiang_panel.prototype.getLaiZiIconPosition3D = function (cardNode) {
    if(!cardNode) return;
    var cardName = cardNode.getName();
    var size = cardNode.getContentSize();
    var pos;
    switch (cardName) {
        case this.HandleCardType.Hand:
            pos = cc.p(size.width * 0.58, size.height * 0.48);
            break;
        case this.HandleCardType.Chi:
        case this.HandleCardType.Peng:
        case this.HandleCardType.AnGang:
        case this.HandleCardType.MingGang:
        case this.HandleCardType.PengGang:
        case this.HandleCardType.Put:
            pos = cc.p(size.width * 0.58, size.height * 0.68);
            break;
        default:
            pos = cc.p(size.width * 0.58, size.height * 0.48);
            break;
    }

    // 倒牌标签位置
    if(cardNode.isCut) {
        pos = cc.p(size.width * 0.58, size.height * 0.62);
    }
    return pos;
};

/**
 *  node_down节点刷新
 **/
majiang_panel.prototype.updateDownEatAndHandCards3D = function(cardArray){
    var tData = MjClient.data.sData.tData;
    var playerNode = cardArray[0].getParent();
    var templetEatCard = playerNode.getChildByName(this.CsdDefaultCardType.EatCardFront);
    var templetHandCard = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
    var player = this.getPlayerInfoByName(playerNode.getName());

    var cardIndex = 0, pengIndex = 0, gangIndex = 0, chiIndex = 0, children, i, k, child, add_x;
    var startPos = this.getEatAndHandCardsStartPos3D("node_down", cardArray[0].getName());
    var start_x = startPos.x;
    var handCount = this.getCardNodeCountByName(playerNode, this.HandleCardType.Hand);
    var isPlayAct = false;
    var laiZiPosSpace = this.getEatAndHandCardsLaiZiIconPosSpcae3D();
    for(i = 0;i < cardArray.length;i++){
        var offSet_x = 0, offSet_y = 0;
        var cardNode = cardArray[i];
        cardNode.visible = true;
        if(cardNode.getName() == this.HandleCardType.Hand){
            cardNode.stopAllActions();
            cardNode.ignoreContentAdaptWithSize(true);
            cardNode.setScale(templetHandCard.scale * 1.2 * 1.3);

            children = cardNode.children;
            for(k = 0; k < children.length; k++){
                child = children[k];
                if(child.ignoreContentAdaptWithSize) {
                    child.ignoreContentAdaptWithSize(true);
                }
                if(child.getName() != "tingSign"){
                    child.setPosition(cardNode.width * 0.5, cardNode.height * 0.43);
                }
                if(child.getName() == "laiZi"){
                    child.setPosition(child.x * laiZiPosSpace.x, child.y * laiZiPosSpace.y);
                }
            }

            if(cardArray[i - 1] && cardArray[i - 1].name != this.HandleCardType.Hand){
                var lastCardNode = cardArray[i - 1];
                if(cardArray[i - 1].name == this.HandleCardType.MingGang || cardArray[i - 1].name == this.HandleCardType.AnGang || cardArray[i - 1].name == this.HandleCardType.PengGang){
                    lastCardNode = cardArray[i - 2];
                }
                cardNode.x = lastCardNode.x + templetHandCard.getScale() * templetHandCard.width * this.getHandAndEatCardSpcae3D();
            }else  if(i != 0){
                if(handCount % 3 == 2  && i == cardArray.length - 1 && player.mjState == TableState.waitPut){
                    var cardNodeX = cardArray[i - 1].x + templetHandCard.getScale() * templetHandCard.width * 1.80;
                    isPlayAct = this.playNewCardAction("node_down", cardNode, cc.p(cardNodeX, templetHandCard.y));
                    if (!isPlayAct) {
                        cardNode.x = cardNodeX;
                    }
                }else {
                    cardNode.x = cardArray[i - 1].x + templetHandCard.getScale() * templetHandCard.width * 1.26;
                }
            }else if(i == 0){
                cardNode.x = start_x;
            }
            cardNode.zIndex = 200 + i;
            if (!isPlayAct) {
                cardNode.y = templetHandCard.y;
            }

            //吃碰杠之后，设置this.newCardNode
            if(handCount % 3 == 2 && player.info.uid == tData.uids[tData.curPlayer] && player.mjState == TableState.waitPut && !player.isNew){
                this.newCardNode = cardNode;
            }
            continue;
        }
        if (cardNode.name == this.HandleCardType.Chi && cardNode.isCut){
            //倒牌
            cardIndex++;
            cardIndex = cardIndex >= 12 ? 12 : cardIndex;
            cardNode.loadTexture("playing/MJ3D/downCard/eat" + cardIndex + ".png");
            if(i == 0){
                cardNode.x = cc.winSize.width * 0.15;
            }else if(cardArray[i - 1].name != this.HandleCardType.Chi || 
                (cardArray[i - 1].name == this.HandleCardType.Chi && !cardArray[i - 1].isCut))
            {
                cardNode.x = cardArray[i - 1].x + templetEatCard.getScale() * templetEatCard.width * 2.3;
            }else if(player.mjhand && player.mjhand.length % 3 == 2 && i == cardArray.length - 1 &&player.isZiMo == true){
                cardNode.x = cardArray[i - 1].x + templetEatCard.getScale() * templetEatCard.width * 1.4;
            }else {
                cardNode.x = cardArray[i - 1].x + templetEatCard.getScale() * templetEatCard.width * 0.9;
            }
            cardNode.zIndex = 100 + i;
        }else if(cardNode.getName() == this.HandleCardType.MingGang || cardNode.getName() == this.HandleCardType.PengGang){
            gangIndex++;
            gangIndex = gangIndex == 4 ? 0 : gangIndex;
            if(gangIndex == 0){
                cardNode.loadTexture("playing/MJ3D/downCard/eat" + (cardIndex - 1) + ".png");
                this.setCardArrow3D(cardNode, player, 0);
            }else{
                cardIndex++;
                cardNode.loadTexture("playing/MJ3D/downCard/eat" + cardIndex + ".png");
            }

            if(i == 0){
                cardNode.x = start_x;
            }else if(gangIndex == 0){
                if(cardIndex <= 6){
                    cardNode.x = cardArray[i - 2].x * 0.99;
                }else{
                    cardNode.x = cardArray[i - 2].x;
                }
                offSet_y = 0.5;
            }else if(cardArray[i - 1] && cardArray[i - 1].getName() != this.HandleCardType.MingGang && cardArray[i - 1].getName() != this.HandleCardType.PengGang){
                cardNode.x = cardArray[i - 2].x + cardArray[i - 2].getScale() * cardArray[i - 1].width;
            }else if (gangIndex == 1) {
                cardNode.x = cardArray[i - 2].x + cardArray[i - 2].getScale() * cardArray[i - 1].width * 0.9;
            }else {
                add_x = 0;
                if(cardIndex == 2){
                    add_x -= 0.05;
                }else if(cardIndex == 3){
                    add_x -= 0.05;
                }else if(cardIndex == 5){
                    add_x -= 0.01;
                }else if(cardIndex == 6){
                    add_x -= 0.01;
                }
                cardNode.x = cardArray[i - 1].x + cardArray[i - 1].getScale() * cardArray[i - 1].width * (0.75 + add_x);
            }

        }else if(cardNode.getName() == this.HandleCardType.AnGang){
            gangIndex++;
            gangIndex = gangIndex == 4 ? 0 : gangIndex;
            if(gangIndex == 0){
                cardNode.removeAllChildren();
                if(cardIndex == 3){
                    cardNode.loadTexture("playing/MJ3D/downCard/eat21.png");
                    offSet_y = 0.5;
                }else  if(cardIndex == 6){
                    cardNode.loadTexture("playing/MJ3D/downCard/eat51.png");
                    offSet_y = 0.43;
                    offSet_x = -0.01;
                }else if(cardIndex == 9){
                    cardNode.loadTexture("playing/MJ3D/downCard/eat81.png");
                    offSet_y = 0.58;
                    offSet_x = -0.01;
                }else if(cardIndex == 12){
                    cardNode.loadTexture("playing/MJ3D/downCard/eat111.png");
                    offSet_y = 0.5;
                }
            }else{
                cardIndex++;
                cardNode.loadTexture("playing/MJ3D/downCard/eat" + cardIndex + ".png");
            }

            if(i == 0){
                cardNode.x = start_x;
            }else if(gangIndex == 0){
                if(cardIndex < 6){
                    cardNode.x = cardArray[i - 2].x * (0.97 + offSet_x);
                }else{
                    cardNode.x = cardArray[i - 2].x * (1 + offSet_x);
                }
            }else if(gangIndex == 1){
                cardNode.x = cardArray[i - 2].x + cardArray[i - 2].getScale() * cardArray[i - 1].width*0.9;
            }else{
                add_x = 0;
                if(cardIndex == 2){
                    add_x -= 0.05;
                }else if(cardIndex == 3){
                    add_x -= 0.05;
                }else if(cardIndex == 5){
                    add_x -= 0.01;
                }else if(cardIndex == 6){
                    add_x -= 0.01;
                }
                cardNode.x = cardArray[i - 1].x + cardArray[i - 1].getScale() * cardArray[i - 1].width * (0.75 + add_x);
            }

        }else if(cardNode.getName() == this.HandleCardType.Chi || cardNode.getName() == this.HandleCardType.Peng){
            cardIndex++;
            pengIndex++;
            pengIndex = pengIndex == 3 ? 0 : pengIndex;
            cardNode.loadTexture("playing/MJ3D/downCard/eat" + cardIndex + ".png");

            if(i == 0){
                cardNode.x = start_x;
            }else if(cardArray[i - 1].name != this.HandleCardType.Chi && cardArray[i - 1].name != this.HandleCardType.Peng){
                cardNode.x = cardArray[i - 1].x + templetEatCard.getScale() * templetEatCard.width * 2.3;
            }else if(pengIndex == 1) {
                cardNode.x = cardArray[i - 1].x + templetEatCard.getScale() * templetEatCard.width * 1.3;
            }else {
                cardNode.x = cardArray[i - 1].x + templetEatCard.getScale() * templetEatCard.width * 0.95;
            }

            if(cardNode.getName() == this.HandleCardType.Chi){
                chiIndex++;
            }
            if(pengIndex == 2){
                this.setCardArrow3D(cardNode, player, chiIndex);
            }
        }

        cardNode.ignoreContentAdaptWithSize(true);
        cardNode.setScale(templetEatCard.scale * 1.2 * 1.5);
        cardNode.setPositionY(templetEatCard.y * (1.3 + offSet_y));

        var skewArray = [17, 16, 14, 10, 9, 8, 4, 2, 0, -3, -5, -6];
        var posOffSetArray =  [0.48, 0.48, 0.48, 0.48, 0.48, 0.48, 0.46, 0.47, 0.49, 0.49, 0.49, 0.49];
        if(cardNode.isCut){
            skewArray = [17, 16, 14, 10, 9, 8, 4, 2, 0, -3, -5, -6, -6.5, -8];
            posOffSetArray = [0.48, 0.48, 0.48, 0.48, 0.48, 0.48, 0.46, 0.47, 0.49, 0.49, 0.49, 0.49, 0.49, 0.49];
        }

        children = cardNode.children;
        for(k = 0; k < children.length; k++){
            child = children[k];
            if (child.ignoreContentAdaptWithSize) {
                child.ignoreContentAdaptWithSize(true);
            }
            
            child.setScale(0.61);
            child.setPosition(cardNode.width * posOffSetArray[cardIndex - 1], cardNode.height * 0.66);

            if(cardIndex > 0){
                child.setSkewX(skewArray[cardIndex - 1]);
            }

            if(child.getName() == "laiZi"){
                var pos = this.getLaiZiIconPosition3D(cardNode);
                child.setPosition(pos);
            }
            if(child.getName() == "arrow"){
                child.setSkewX(0);
            }
        }
    }
};

/**
 *  node_right节点刷新
 **/
majiang_panel.prototype.updateRightEatAndHandCards3D = function(cardArray){
    var playerNode = cardArray[0].getParent();
    var templetEatCard = playerNode.getChildByName(this.CsdDefaultCardType.EatCardFront);
    var templetHandCard = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
    var player = this.getPlayerInfoByName(playerNode.getName());

    var handScale = templetHandCard.scale*0.85;
    var cardIndex = 0, pengIndex = 0, gangIndex = 0, handIndex = 0, chiIndex = 0, children, i, k, child;

    //根据分辨率计算左右两侧的倾斜度
    var ratio = cc.winSize.width / cc.winSize.height;
    var formatRatio = (1.78 / ratio) * 0.012;
    var offSet_scale = 0.98, distance_x = 0.12, angle_dis = formatRatio;
    var angle_x = handScale * 1.1 * templetHandCard.width;
    var start_y = cc.winSize.height * 0.33;
    var start_x = cc.winSize.width * 0.85;

    for(i = cardArray.length - 1;i >= 0;i--){
        var offSet_x = 0;
        var cardNode = cardArray[i];
        cardNode.visible = true;
        if(cardNode.name == this.HandleCardType.Hand){
            start_x = cc.winSize.width * 0.792;
            if(i == cardArray.length - 1){
                cardNode.y = start_y;
            }

            handIndex++;
            if(!cardArray[i + 1] || cardArray[i + 1].name != this.HandleCardType.Hand){
                cardNode.y = start_y;
            }else{
                cardNode.y = cardArray[i + 1].y +  cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.397;
            }

            distance_x = cardNode.getScale() * cardNode.width * 1.7;
            cardNode.setPositionX(start_x + 13 * angle_x *0.2 - handIndex * angle_x * 0.2);
            cardNode.ignoreContentAdaptWithSize(true); 

            cardNode.setScale(handScale * 1.1 * 2 * (1.08 - handIndex * 0.015));
            cardNode.zIndex = 200 + i;//手牌的层级要比吃碰杠的层级高
            continue;
        }else if (cardNode.name == this.HandleCardType.Chi && cardNode.isCut){
            //倒牌
            start_x = cc.winSize.width * 0.75;
            cardIndex++;
            cardNode.loadTexture("playing/MJ3D/common/1-8.png");
            offSet_x = 0.1;
            if(cardArray[i + 1] && (cardArray[i + 1].name != this.HandleCardType.Chi || 
                (cardArray[i + 1].name == this.HandleCardType.Chi && !cardArray[i + 1].isCut)))
            {
                cardNode.y = start_y;
            }else if(player.mjhand && player.mjhand.length % 3 == 2 && i == 0 && player.isZiMo == true){
                cardNode.y = cardArray[i + 1].y + cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.8;
            }else if(i != cardArray.length - 1){
                cardNode.y = cardArray[i + 1].y + cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.5;
            }
            cardNode.zIndex = 100 + i;
        }else if(cardNode.name == this.HandleCardType.MingGang || cardNode.name == this.HandleCardType.PengGang){
            start_x = cc.winSize.width * 0.85;
            if(i == cardArray.length - 1){
                cardNode.y = start_y * 0.8;
            }

            if(cardNode.getChildByName("arrow")){
                cardNode.getChildByName("arrow").removeFromParent(true);
            }

            gangIndex++;
            gangIndex = gangIndex == 4 ? 0 : gangIndex;
            if(gangIndex == 1){
                offSet_x  = -0.009;
                this.setCardArrow3D(cardNode, player, 0);
            }else {
                cardIndex++;
            }

            cardNode.loadTexture("playing/MJ3D/common/1-8.png");
            if(cardArray[i + 1] && cardArray[i + 1].name != this.HandleCardType.MingGang && cardArray[i + 1].name != this.HandleCardType.PengGang){
                cardNode.y = cardArray[i + 1].y + cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.5;
            }else  if(i < cardArray.length - 1){
                cardNode.y = cardArray[i + 1].y + cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.5;
            }

            if(gangIndex == 3){
                cardArray[i + 2].y = cardNode.y + cardNode.getScale() * cardNode.height * 0.3;
            }
        }else if(cardNode.name == this.HandleCardType.AnGang){
            start_x = cc.winSize.width * 0.85;
            if(i == cardArray.length - 1){
                cardNode.y = start_y * 0.8;
            }

            gangIndex++;
            gangIndex = gangIndex == 4 ? 0 : gangIndex;
            if(gangIndex == 1){
                offSet_x  = -0.009;
                cardNode.loadTexture("playing/MJ3D/common/2-8.png");
            }else{
                cardIndex++;
                cardNode.loadTexture("playing/MJ3D/common/1-8.png");
            }

            if(i < cardArray.length - 1){
                cardNode.y = cardArray[i + 1].y + cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.5;
            }

            if(cardNode.getChildByName("cardImg")){
                cardNode.getChildByName("cardImg").visible = true;
            }
            if(gangIndex == 3){
                cardArray[i + 2].y = cardNode.y + cardNode.getScale() * cardNode.height * 0.3;
                if(cardArray[i + 2].getChildByName("cardImg")){
                    cardArray[i + 2].getChildByName("cardImg").visible = false;
                }
            }
        }else if(cardNode.name == this.HandleCardType.Chi || cardNode.name == this.HandleCardType.Peng){
            start_x = cc.winSize.width * 0.85;
            if(i == cardArray.length - 1){
                cardNode.y = start_y;
            }

            if(cardNode.getChildByName("arrow")){
                cardNode.getChildByName("arrow").removeFromParent(true);
            }

            cardIndex++;
            pengIndex++;
            pengIndex = pengIndex == 3 ? 0 : pengIndex; 
            cardNode.loadTexture("playing/MJ3D/common/1-8.png");

            if(cardArray[i + 1] && cardArray[i + 1].name != this.HandleCardType.Chi && cardArray[i + 1].name != this.HandleCardType.Peng){
                cardNode.y = cardArray[i + 1].y + cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.9;
            }else if(i != cardArray.length - 1){
                if(pengIndex == 1){
                    distance_x -= 0.005;
                    cardNode.y = cardArray[i + 1].y + cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.9;
                }else{
                    cardNode.y = cardArray[i + 1].y + cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.5;
                }
            }
            if(cardNode.getName() == this.HandleCardType.Chi){
                chiIndex++;
            }
            if(pengIndex == 2){
                this.setCardArrow3D(cardNode, player, chiIndex);
            }
        }
        cardNode.zIndex = 100 + i;
        cardNode.ignoreContentAdaptWithSize(true);
        cardNode.setScale(templetEatCard.scale * 1.2 * 3 * (Math.pow(offSet_scale, cardIndex)));
        cardNode.setPositionX(start_x * (1 - cardIndex * angle_dis + distance_x + offSet_x));

        children = cardNode.children;

        for(k = 0; k < children.length; k++){
            child = children[k];
            if (child.ignoreContentAdaptWithSize) {
                child.ignoreContentAdaptWithSize(true);
            }
            child.setScale(0.39);
            child.setPosition(cardNode.width * 0.56, cardNode.width * 0.55);
            
            child.setSkewY(20);
            if(child.getName() == "arrow"){
                var angle = child.getRotation() % 360;
                if(angle == 0 || angle == 180) child.setSkewY(0);
            }
    
            if(child.getName() == "laiZi"){
                child.setPosition(this.getLaiZiIconPosition3DOfRight(cardNode));
            }
        }
    }

    var isPlayAct = false;
    if(handIndex % 3 === 2){
        var firstCard = cardArray[0];
        var firstCardX = firstCard.x - firstCard.scale * firstCard.width * 0.09;
        var firstCardY = firstCard.y + firstCard.scale * firstCard.height * 0.28;
        isPlayAct = this.playNewCardAction("node_right", firstCard, cc.p(firstCardX, firstCardY));
        if (!isPlayAct) {
            firstCard.x = firstCardX;
            firstCard.y = firstCardY;
        }
    }
};

majiang_panel.prototype.getLaiZiIconPosition3DOfRight = function(cardNode){
    return cc.p(cardNode.width * 0.56, cardNode.width * 0.55);
};

/**
 *  node_top节点刷新
 **/
majiang_panel.prototype.updateTopEatAndHandCards3D = function(cardArray){
    var playerNode = cardArray[0].getParent();
    var templetEatCard = playerNode.getChildByName(this.CsdDefaultCardType.EatCardFront);
    var templetHandCard = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
    var player = this.getPlayerInfoByName(playerNode.getName());

    var cardIndex = 0, pengIndex = 0, gangIndex = 0, handIndex = 0, chiIndex = 0, children, i, k, child, add_x, oneCardWith;
    var offSet_scale = 0.98, distance_x = 0.12, angle_dis = this.isIPad()? 0.012 : 0.00915;
    var angle_x = templetHandCard.scale * 1.1 * templetHandCard.width;
    var start_y = cc.winSize.height * 0.94;
    var start_x = cc.winSize.width * (this.isIPad() ? 0.77 : 0.74);

    var setCardSpirteTop = function (cardNode, index) {
        if(index <= 0) index = 1;
        if(index >= 12) index = 12;
        cardNode.loadTexture("playing/MJ3D/top/top" + (13 - index) + ".png");
    };

    //计算当前的手牌张数
    var currentHandCount = 0;
    for (i = cardArray.length - 1;i >= 0;i--) {
        if(cardArray[i] && cardArray[i].getName() == this.HandleCardType.Hand) {
            currentHandCount++;
        }
    }

    //如果是轮到自己出牌，排除新摸的这张牌，这张牌另外固定放置位置，防止整个手牌位置移来移去的
    if(currentHandCount % 3 === 2) {
        currentHandCount -= 1;
    }

    for (i = cardArray.length - 1;i >= 0;i--) {
        var cardNode = cardArray[i];
        cardNode.visible = true;
        if (cardNode.getName() == this.HandleCardType.Hand) {
            if (oneCardWith === undefined) {
                oneCardWith = cardNode.getScale() * cardNode.width * 0.82;
            }

            handIndex++;
            if(handIndex == 1){
                var handStartX = cc.winSize.width * (this.isIPad()? 0.3 : 0.37) + oneCardWith * currentHandCount;
                //优化手牌排列方式，根据当前的牌的张数来显示,从左对齐
                cardNode.x = handStartX;

            }else{
                cardNode.x = cardArray[i + 1].x - oneCardWith * 0.98;
            }
            cardNode.y = start_y;
            continue;
        } else if (cardNode.name == this.HandleCardType.Chi && cardNode.isCut) {
            cardIndex++;
            //最右边的那张牌
            if(cardIndex == 1){
                cardNode.x = start_x * 0.9;
            }

            setCardSpirteTop(cardNode, cardIndex);

            if(cardArray[i + 1] && (cardArray[i + 1].name != this.HandleCardType.Chi ||
                (cardArray[i + 1].name == this.HandleCardType.Chi && !cardArray[i + 1].isCut)))
            {
                cardNode.x = cardArray[i + 1].x -  cardArray[i + 1].getScale() * cardArray[i + 1].width * 1.1;
            }else if(player.mjhand && player.mjhand.length % 3 == 2 && i == 0 && player.isZiMo == true){
                cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 1.0;
            }else  if(i < cardArray.length - 1 && cardIndex != 1){
                cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.7;
            }            
        } else if (cardNode.getName() == this.HandleCardType.MingGang || cardNode.getName() == this.HandleCardType.PengGang) {
            gangIndex++;
            gangIndex = gangIndex == 4 ? 0 : gangIndex;
            if(gangIndex == 1){
                
            }else{
                cardIndex++;
            }
            setCardSpirteTop(cardNode, cardIndex);
            cardNode.y = templetEatCard.y;
            //最右边的那张牌
            if(cardIndex == 1){
                cardNode.x = start_x;
            }

            if(cardArray[i + 1] && cardArray[i + 1].name != this.HandleCardType.MingGang && cardArray[i + 1].name != this.HandleCardType.PengGang){
                cardNode.x = cardArray[i + 1].x -  cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.2;
            }else  if(i < cardArray.length - 1 && cardIndex != 1){
                if(gangIndex == 1){
                    cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.3;
                }else{
                    cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.7;
                }
            }
            
            if(cardNode.getChildByName("arrow")){
                cardNode.removeChildByName("arrow");
            }
            if(gangIndex == 0){
                cardArray[i + 3].x = cardArray[i + 1].x;
                cardArray[i + 3].y +=  cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.25;
                cardArray[i + 3].zIndex = cardArray[i + 1].zIndex + 10;
                this.setCardArrow3D(cardArray[i + 3], player, chiIndex);
                if(cardArray[i + 3].getChildByName("arrow")){
                    cardArray[i + 3].getChildByName("arrow").setScale(0.28);
                }
            }
        } else if (cardNode.getName() == this.HandleCardType.AnGang) {
            gangIndex++;
            gangIndex = gangIndex == 4 ? 0 : gangIndex;
            if(gangIndex == 1){
                if(cardIndex == 0){
                    cardNode.loadTexture("playing/MJ3D/top/top11-1.png");
                }else  if(cardIndex == 3){
                    cardNode.loadTexture("playing/MJ3D/top/top8-1.png");
                }else if(cardIndex == 6){
                    cardNode.loadTexture("playing/MJ3D/top/top5-1.png");
                }else if(cardIndex == 9){
                    cardNode.loadTexture("playing/MJ3D/top/top2-1.png");
                }
            }else{
                cardIndex++;
                setCardSpirteTop(cardNode, cardIndex);
            }
            cardNode.y = templetEatCard.y;
            //最右边的那张牌
            if(cardIndex == 1){
                cardNode.x = start_x;
            }
            if(cardArray[i + 1] && cardArray[i + 1].name != this.HandleCardType.AnGang){
                cardNode.x = cardArray[i + 1].x -  cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.2;
            }else  if(i < cardArray.length - 1 && cardIndex != 1){
                if(gangIndex == 1) {
                    cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.2;
                }else{
                    cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.7;
                }
            }
            if(cardNode.getChildByName("cardImg")){
                cardNode.getChildByName("cardImg").visible = true;
            }
            if(gangIndex === 0){
                cardArray[i + 3].x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.01;
                cardArray[i + 3].y += cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.25;
                cardArray[i + 3].zIndex = cardArray[i + 1].zIndex + 10;
                if(cardArray[i + 3].getChildByName("cardImg")){
                    cardArray[i + 3].getChildByName("cardImg").visible = false;
                }
            }
            cardNode.zIndex = 100 + i;
        } else if (cardNode.name == this.HandleCardType.Chi || cardNode.name == this.HandleCardType.Peng) {
            cardIndex++;
            pengIndex++;
            pengIndex = pengIndex == 3 ? 0 : pengIndex;
            //最右边的那张牌
            if(cardIndex == 1){
                cardNode.x = start_x;
            }

            setCardSpirteTop(cardNode, cardIndex);

            if(cardArray[i + 1] && cardArray[i + 1].name != this.HandleCardType.Chi && cardArray[i + 1].name != this.HandleCardType.Peng){
                cardNode.x = cardArray[i + 1].x -  cardArray[i + 1].getScale() * cardArray[i + 1].width * 1.1;
            }else  if(i < cardArray.length - 1 && cardIndex != 1){
                if(pengIndex == 1){
                    cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 1.1;
                }else {
                    cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.7;
                }
            }
            if(cardNode.getName() == this.HandleCardType.Chi){
                chiIndex++;
            }
            if(pengIndex == 2){
                this.setCardArrow3D(cardNode, player, chiIndex);
            }
        }

        cardNode.ignoreContentAdaptWithSize(true);
        cardNode.setScale(templetEatCard.scale * 1.2 * 3.2);

        //平行四边形拉伸度
        var skewArray = [-14, -13, -12,-11, -9, -8, -6, -5, -4, 0, 1, 2];
        if (cardNode.isCut) {
            skewArray = [-14, -13, -12,-11, -9, -8, -6, -5, -4, 0, 1, 2, 2, 2];
        }
        children = cardNode.children;
        for (k = 0; k < children.length; k++) {
            child = children[k];
            if (child.ignoreContentAdaptWithSize) {
                child.ignoreContentAdaptWithSize(true);
            }
            child.setScale(0.28);
            child.setPosition(cardNode.width * 0.5, cardNode.height * 0.645);

            var skewValue = skewArray[cardIndex - 1];
            if (cardIndex == 0) {
                skewValue = skewArray[1];
            }
            
            if(child.getName() == "laiZi"){
                child.setPosition(this.getLaiZiIconPosition3DOfTop(cardNode));
            }
            
            try{
                child.setSkewX(skewValue);
            }catch(e){
                cc.log(" warning error : " + e);
            }

            if (child.getName() == "arrow") {
                child.setSkewX(0);
            }
        }
    }

    // 新牌隔开
    var isPlayAct = false;
    if(handIndex % 3 === 2){
        var cardWith = cardArray[handIndex - 1].scale * cardArray[handIndex - 1].width;
        var firstCard = cardArray[0];
        var firstCardX = firstCard.x - cardWith * 0.5;
        var firstCardY = start_y;
        isPlayAct = this.playNewCardAction("node_top", firstCard, cc.p(firstCardX, firstCardY));
        if (!isPlayAct) {
            firstCard.x = firstCardX;
            firstCard.y = firstCardY;
        }
    }
};

majiang_panel.prototype.getLaiZiIconPosition3DOfTop = function(cardNode){
    return cc.p(cardNode.width * 0.5, cardNode.height * 0.645);
};

/**
 *  node_left节点刷新
 **/
majiang_panel.prototype.updateLeftEatAndHandCards3D = function(cardArray){
    var playerNode = cardArray[0].getParent();
    var templetEatCard = playerNode.getChildByName(this.CsdDefaultCardType.EatCardFront);
    var templetHandCard = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
    var player = this.getPlayerInfoByName(playerNode.getName());

    var cardIndex = 0, pengIndex = 0, gangIndex = 0, handIndex = 0, chiIndex = 0, cutDownIndex = 0;
    var i, k, child, add_x, oneCardWith, children;

    //根据分辨率计算左右两侧的倾斜度
    var ratio = cc.winSize.width / cc.winSize.height;
    var formatRatio = (1.78 / ratio) * 0.038;
    var offSet_scale = 1.02, distance_x = -0.25, angle_dis =  formatRatio;

    var handScale = templetHandCard.scale * 0.85;
    var angle_x = handScale * 1.1 * templetHandCard.width;
    var angle_y = handScale * 1.1 * templetHandCard.height;
    var start_y = cardArray[0].getName() == this.HandleCardType.Hand ? cc.winSize.height * 0.785 : cc.winSize.height * 0.83;
    var start_x = cc.winSize.width * 0.215;

    for(i = 0;i < cardArray.length;i++){
        var offSet_x = 0;
        var cardNode = cardArray[i];
        cardNode.visible = true;
        if(cardNode.name == this.HandleCardType.Hand){
            handIndex++;
            if(!cardArray[i - 1] || cardArray[i - 1].name != this.HandleCardType.Hand){
                cardNode.y = start_y;
            }else{
                cardNode.y = cardArray[i - 1].y -  cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.41;
            }

            cardNode.setScale(handScale * 1.1 * 1.8 * (1 + handIndex * 0.01));
            cardNode.setPositionX(start_x - handIndex * angle_x * 0.2);
            cardNode.ignoreContentAdaptWithSize(true);

            cardNode.zIndex = 100 + i;
            continue;
        }else if(cardNode.name == this.HandleCardType.Chi && cardNode.isCut){
            cutDownIndex++;
            cardNode.zIndex = cutDownIndex;
            if(i == 0){
                cardNode.y = start_y * 0.9;
            }else{
                if(cardArray[i - 1].name != this.HandleCardType.Chi || 
                    (cardArray[i - 1].name == this.HandleCardType.Chi && !cardArray[i - 1].isCut))
                {
                    cardNode.y = start_y;
                }else if(player.mjhand && player.mjhand.length % 3 == 2 && i == cardArray.length - 1 && player.isZiMo == true){
                    cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.8;
                }else {
                    cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.5;
                }
            }
            cardNode.ignoreContentAdaptWithSize(true);
            cardNode.setScale(handScale * 2 * (Math.pow(offSet_scale, cutDownIndex)));
            cardNode.setPositionX(start_x - cutDownIndex * angle_x * 0.25);
            cardNode.loadTexture("playing/MJ3D/common/1-1.png");

            children = cardNode.children;
            for(k = 0; k < children.length; k++){
                child = children[k];
                if (child.ignoreContentAdaptWithSize) {
                    child.ignoreContentAdaptWithSize(true);
                }
                child.setScale(0.39);
                child.setPosition(cardNode.width * 0.48, cardNode.width * 0.55);
                child.setSkewY(-15);
            }
            continue;
        }else if(cardNode.name == this.HandleCardType.MingGang || cardNode.name == this.HandleCardType.PengGang){
            gangIndex++;
            gangIndex = gangIndex == 4 ? 0 : gangIndex;
            if(gangIndex == 0){
                offSet_x  = 0.005;
                this.setCardArrow3D(cardNode, player, chiIndex);
            }else{
                cardIndex++;
            }
            cardNode.zIndex = cardIndex;
            cardNode.ignoreContentAdaptWithSize(true);
            cardNode.loadTexture("playing/MJ3D/common/1-1.png");

            if(i == 0){
                cardNode.y = start_y;
            }else if(cardArray[i - 1] && cardArray[i - 1].name != this.HandleCardType.MingGang && cardArray[i - 1].name != this.HandleCardType.PengGang){
                cardNode.y = cardArray[i - 2].y - angle_y * 0.7;
            }else{
                cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.5;
                if(gangIndex == 0){
                    cardNode.y = cardArray[i - 2].y + cardArray[i - 2].getScale() * cardArray[i - 2].height * 0.3;
                }

                if(gangIndex == 1 && cardArray[i - 1] && (cardArray[i - 1].name == this.HandleCardType.MingGang ||cardArray[i - 1].name == this.HandleCardType.PengGang))
                {
                    cardNode.y = cardArray[i - 1].y -  cardArray[i - 1].getScale() * cardArray[i - 1].height * 1.6;
                }
            }

            if(gangIndex == 1){
                distance_x -= 0.02;
            }

        }else if(cardNode.name == this.HandleCardType.AnGang){
            gangIndex++;
            gangIndex = gangIndex == 4 ? 0 : gangIndex;
            var cardImg = cardNode.getChildByName("cardImg");
            cardImg.visible = false;
            if(gangIndex == 0){
                offSet_x  = 0.005;
                cardNode.y *= 1.01;
                cardNode.loadTexture("playing/MJ3D/common/2-1.png");
            }else{
                cardIndex++;
                cardImg.visible = true;
                cardNode.loadTexture("playing/MJ3D/common/1-1.png");
            }

            cardNode.ignoreContentAdaptWithSize(true);
            cardNode.zIndex = cardIndex;
            if(i == 0){
                cardNode.y = start_y;
            }else if(cardArray[i - 1] && cardArray[i - 1].name != this.HandleCardType.AnGang){
                cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i- 1].height * 1.5;
            }else{
                cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.5;
                if(gangIndex == 0){
                    cardNode.y = cardArray[i - 2].y + cardArray[i - 2].getScale() * cardArray[i - 2].height * 0.3;
                }

                if(gangIndex == 1 && cardArray[i - 1] && cardArray[i - 1].name == this.HandleCardType.AnGang)
                {
                    cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 1.6;
                }

                if(gangIndex == 1){
                    distance_x -= 0.02;
                }
            }
        }
        else if(cardNode.name == this.HandleCardType.Chi || cardNode.name == this.HandleCardType.Peng){
            cardIndex++;
            pengIndex++;
            cardNode.zIndex = cardIndex;
            if(i == 0){
                cardNode.y = start_y;
            }else{
                if(cardArray[i - 1].name != this.HandleCardType.Peng && cardArray[i - 1].name != this.HandleCardType.Chi)
                {
                    cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 1.5;
                }else {
                    if(pengIndex == 1){
                        cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.8;
                        distance_x += 0.013;
                    }else {
                        cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.5;
                    }
                }

                if(pengIndex == 1){
                    distance_x -= 0.02;
                }
            }

            pengIndex = pengIndex == 3 ? 0 : pengIndex;
            if(cardNode.getName() == this.HandleCardType.Chi){
                chiIndex++;
            }
            if(pengIndex == 2){
                this.setCardArrow3D(cardNode, player, chiIndex);
            }
            cardNode.ignoreContentAdaptWithSize(true);
            cardNode.loadTexture("playing/MJ3D/common/1-1.png");
        }

        children = cardNode.children;
        for(k = 0; k < children.length; k++){
            child = children[k];
            if (child.ignoreContentAdaptWithSize) {
                child.ignoreContentAdaptWithSize(true);
            }
            child.setScale(0.39);
            child.setPosition(cardNode.width * 0.48, cardNode.width * 0.55);
            child.setSkewY(-15);
            if(child.getName() == "arrow"){
                var angle = child.getRotation() % 360;
                if(angle == 0 || angle == 180) child.setSkewY(0);
            }

            if(child.getName() == "laiZi"){
                child.setPosition(this.getLaiZiIconPosition3DOfLeft(cardNode));
            }
        }


        cardNode.setScale(templetEatCard.scale * 1.2 * 2.6 * (Math.pow(offSet_scale, cardIndex)));
        var iphonXX =  this.isIPhoneX() ? cc.winSize.width * 0.015 : 0; //iphone x 的位置优化
        cardNode.setPositionX(start_x * (1 - cardIndex * angle_dis +  distance_x + offSet_x) + iphonXX);
    }

    // 新牌隔开
    var isPlayAct = false;
    if(handIndex % 3 === 2){
        var lastCard = cardArray[cardArray.length - 1];
        var lastCardX = lastCard.x - lastCard.scale * lastCard.width * 0.09;
        var lastCardY = lastCard.y - lastCard.scale * lastCard.height * 0.28;
        lastCard.zIndex += 100 + cardArray.length;
        isPlayAct = this.playNewCardAction("node_left", lastCard, cc.p(lastCardX, lastCardY));
        if (!isPlayAct) {
            lastCard.x = lastCardX;
            lastCard.y = lastCardY;
        }
    }
};

majiang_panel.prototype.getLaiZiIconPosition3DOfLeft = function(cardNode){
    return cc.p(cardNode.width * 0.48, cardNode.width * 0.55);
};

majiang_panel.prototype.setCardArrow3D = function(cardNode, player, chiIndex){
    var playerNode = cardNode.getParent();
    if(cardNode.getName() == this.HandleCardType.MingGang || cardNode.getName() == this.HandleCardType.PengGang){
        this.setCardArrow(cardNode, this.getOperateFrom(playerNode, cardNode.tag), this.getUidIndex(player.info.uid));
    }else if(cardNode.getName() == this.HandleCardType.Peng){
        this.setCardArrow(cardNode, this.getOperateFrom(playerNode, cardNode.tag), this.getUidIndex(player.info.uid));
    }else if(cardNode.getName() == this.HandleCardType.Chi && player.mjchi.length > 0){
        var chiCount = Math.floor(chiIndex / 3); 
        var chiPengGang = player.pengchigang;
        var chiData = chiPengGang["chi"][chiCount];
        this.setCardArrow(cardNode, chiData.pos, this.getUidIndex(player.info.uid));
    }
};

/**
 *  添加打出去的牌
 **/
majiang_panel.prototype.addPutCard3D = function(cardNode, callback, isPut){
    var playerNode = cardNode.getParent();
    var putNodeArray = [];
    var children = playerNode.children;
    for(var i = 0; i < children.length; i++){
        if(children[i].name == this.HandleCardType.Put){
            putNodeArray.push(children[i]);
        }
    }
    //打出去的牌对应的每一列对应的牌的张数
    var lineCardCount = [8, 10, 10, 10]; 
    if (this.getMaxPlayer() == 2){
        lineCardCount = [12, 14, 16, 16];
    }

    var row = 0, col = putNodeArray.length - 1;
    for(var k = 0;k < lineCardCount.length;k++){
        var lineCount = lineCardCount[k];
        if(col < lineCount){
            break;
        }
        row++;
        col -= lineCount;
    }
    var templetCard = playerNode.getChildByName(this.CsdDefaultCardType.PutCardOne);
    var scale = templetCard.getScale() * 1.3;
    cardNode.ignoreContentAdaptWithSize(true);
    cardNode.setScale(scale * 2.2);    
    this.switchUpdatePutCards3D(cardNode, col, row, callback, isPut);
};

/**
 * 刷新打出的牌(断线重连)
 */
majiang_panel.prototype.resetPutCards3D = function(node, callback){
    delete node.lastPutCardNode;//删除当前玩家节点上临时标记的最后一张牌
    var player = this.getPlayerInfoByName(node.getName());
    if(!player || !player.mjput || player.mjput.length == 0){
        if(callback) callback();
        return;
    }

    var tData = MjClient.data.sData.tData;
    var putCardArray = [];
    var children = node.children;
    for(var i = 0;i < children.length;i++){
        var child = children[i];
        if(child.getName() == this.HandleCardType.Put){
            putCardArray.push(child);
        }
    }

    //打出去的牌对应的每一列对应的牌的张数
    var lineCardCount = [8, 10, 10, 10]; 
    if (this.getMaxPlayer() == 2){
        lineCardCount = [12, 14, 16, 16];
    }

    var col = 0, row = 0;
    var templetCard = node.getChildByName(this.CsdDefaultCardType.PutCardOne);
    var scale = templetCard.getScale() * 1.3;
    var lineMaxCount = lineCardCount[row];
    var skewValue, posOffSet;
    
    for(var k = 0;k < putCardArray.length;k++){
        var putCard = putCardArray[k];
        putCard.ignoreContentAdaptWithSize(true);
        putCard.setScale(scale * 2.2);
        this.switchUpdatePutCards3D(putCard, col, row);
        
        col++;
        col = col % lineMaxCount;
        if(col == 0){
            row++;
        }
        lineMaxCount = lineCardCount[row];
        if(k == putCardArray.length - 1){
            node.lastPutCardNode = putCard;
        }
    }

    if(callback){
        callback();
    }
};

majiang_panel.prototype.switchUpdatePutCards3D = function(cardNode, col, row, callback, isPut){
    var playerNode = cardNode.getParent();
    cardNode.visible = true;
    var nodeIndex = this.getNodeIndexDefaultByName(playerNode.getName());
    switch(nodeIndex){
        case 0:
            this.updateDownPutCards3D(cardNode, col, row, callback, isPut);
            break;
        case 1:
            this.updateRightPutCards3D(cardNode, col, row, callback, isPut);
            break;
        case 2:
            this.updateTopPutCards3D(cardNode, col, row, callback, isPut);
            break;
        case 3:
            this.updateLeftPutCards3D(cardNode, col, row, callback, isPut);
            break;
    }
};

/**
 *  刷新node_down节点打出去的牌
 **/
majiang_panel.prototype.updateDownPutCards3D = function(cardNode, col, row, callback, isPut){
    //打出去的牌对应的每一列对应的牌的张数
    var lineCardCount = [8, 10, 10, 10]; 
    //cardNode
    var textureIndexArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //平行四边形拉伸度
    var skewArray = [5, 4, 3, 2, 1, -2, -4, -5, -6,-7];
    //x 位置偏移度
    var posOffSetArr =  [0.52, 0.53, 0.53,0.52, 0.55, 0.55, 0.55, 0.57, 0.57, 0.52];

    if (this.getMaxPlayer() == 2){
        lineCardCount = [12, 14, 16, 16];
        textureIndexArray = [11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16];
        skewArray = [11, 7, 6, 5, 4, 3, 1, 0, -3, -4, -5, -7, -8, -8, -8, -8];        
        posOffSetArr =  [0.52, 0.52, 0.52, 0.52, 0.52, 0.52, 0.52, 0.53, 0.55, 0.56, 0.57, 0.58, 0.59, 0.6, 0.6, 0.6];
    }
    var textureIndex = textureIndexArray[col];
    if(row == 0){
        textureIndex = this.getMaxPlayer() == 2 ? textureIndexArray[col + 3] : textureIndexArray[col + 2];
    }else if(row == 1 && this.getMaxPlayer() == 2){
        textureIndex = textureIndexArray[col + 2];
    }
    cardNode.loadTexture("playing/MJ3D/downCard/out2-" + textureIndex + ".png");

    var playerNode = cardNode.getParent();
    var templetCard = playerNode.getChildByName(this.CsdDefaultCardType.PutCardOne);
    var offSet_x = 0, offSet_y = 0;
    if(row != 0){
        var count = 1;
        for(var i = 1;i < row;i++){
            if(lineCardCount[i] != lineCardCount[i - 1]){
                count++;
            }
        }
        offSet_x = -templetCard.width * templetCard.scale* 1.3 * 0.95 * count;
        offSet_y = -templetCard.height * templetCard.scale * 0.85 * count;
    }


    var pos_x = offSet_x + templetCard.x + templetCard.width * templetCard.scale * 1.3 * col * 0.95;
    var pos_y = offSet_y + templetCard.y;
    cardNode.setPosition(pos_x, pos_y);
    cardNode.zIndex = 100 * (row + 1) + col * (col > lineCardCount[row] / 2 ? -1 : 1);

    var skewValue = row == 0 ? skewArray[col + 1] : skewArray[col];
    var posValue = row == 0 ? posOffSetArr[col + 1] : posOffSetArr[col];
    var children = cardNode.children;
    for(var k = 0; k < children.length; k++){
        var child = children[k];
        if (child.ignoreContentAdaptWithSize) {
            child.ignoreContentAdaptWithSize(true);
        }
        child.setScale(0.45);
        child.setSkewX(skewValue);
        if(child.getName() == "laiZi"){
            child.setPosition(this.getPutCardsLaiZiIconPosSpcae3D(cardNode));
        }
        if(child.name == "cardImg"){
            child.setPosition(cardNode.width * 0.9 * posValue, 45);
        }
    }
    if(callback){
        callback();
    }
};

/**
 *  刷新node_right节点打出去的牌
 **/
majiang_panel.prototype.updateRightPutCards3D = function(cardNode, col, row, callback, isPut){
    var playerNode = cardNode.getParent();
    var templetCard = playerNode.getChildByName(this.CsdDefaultCardType.PutCardOne);

    var rowIndex = 5 + row;
    if(rowIndex > 7) rowIndex = 7; //图片的引索只有3列，如果大于3列的，第四列还是用第三列的图片 marked by sking
    cardNode.loadTexture("playing/MJ3D/rightCard/1-" + rowIndex + ".png");

    cardNode.setScale(cardNode.getScale() * (1 - 0.02 * col));
    var changePos_x = 1 - (row == 0 ? 0.0035 * col : row == 1 ? 0.0048 * col : 0.0055 * col);
    var changePos_y = 1 - (0.0001 + col / (row == 0 ? 2000 : 3000)) * col;
    var offSet_x = 0, offSet_y = 0;
    if(row != 0){
        offSet_x = templetCard.width * templetCard.scale * 1.35 * row;
        offSet_y = -templetCard.height * templetCard.scale;
    }

    var _ex = offSet_x + templetCard.x * changePos_x;
    var _ey = offSet_y + templetCard.y * changePos_y + cardNode.height * cardNode.scale * col * 0.65;
    var _endPonit = cc.p(_ex,_ey);


    var setEndData = function(){
        cardNode.setPosition(_endPonit);
        cardNode.zIndex = 100 - (col + row);
        if(callback){
            callback();
        }
    };

    if(MjClient.playui.getPutCardScaleConfig() && isPut){
        cardNode.zIndex = 1000;
        this.putCardScaleAni(cardNode,1,_endPonit,function(){
            setEndData();
        });
    }else{
        setEndData();
    }

    var children = cardNode.children;
    for(var i = 0;i < children.length;i++){
        var child = children[i];
        if (child.ignoreContentAdaptWithSize) {
            child.ignoreContentAdaptWithSize(true);
        }
        child.setScale(0.45);
        child.setSkewY((row == 0 ? 6 : 7));
        if(child.name == "laiZi"){
            child.setPosition(this.getPutCardsLaiZiIconPosSpcae3D(cardNode));
        }
        if(child.name == "cardImg"){
            var pos_x = (row == 0 ? child.x * 0.56 : child.x * 0.57);
            var pos_y = (row == 0 ? child.y * 0.48 : child.y * 0.5);
            child.setPosition(pos_x, pos_y);
        }     
    }
};

//获取出牌的癞子图标的位置偏移
//cardNode 牌节点
majiang_panel.prototype.getPutCardsLaiZiIconPosSpcae3D = function(cardNode){
    var parentName = cardNode.getParent().getName();
    if(parentName == "node_down"){
        return cc.p(cardNode.width * 0.6, 45)
    }else if(parentName == "node_right"){
        return cc.p(28, 35);
    }else if(parentName == "node_top"){
        return cc.p(cardNode.width * 0.45, 45);
    }else if(parentName == "node_left"){
        return cc.p(38, 35);
    }
    return cc.p(0, 0);
}

/**
 *  刷新node_top节点打出去的牌
 **/
majiang_panel.prototype.updateTopPutCards3D = function(cardNode, col, row, callback, isPut){
    //打出去的牌对应的每一列对应的牌的张数
    var lineCardCount = [8, 10, 10, 10]; 
    //cardNode
    var textureIndexArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //平行四边形拉伸度
    var skewArray = [-6, -4.5, -2.5, -2, -1, 0, 3, 3, 5, 5];
    //x 位置偏移度
    var posOffSetArr =  [0.55, 0.55, 0.55, 0.55, 0.55, 0.58, 0.58, 0.58, 0.57, 0.58, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55];
    if (this.getMaxPlayer() == 2){
        lineCardCount = [12, 14, 16, 16];
        textureIndexArray = [11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16];
        skewArray = [-12, -10, -8, -5, -5, -4, -2, 0, 0, 4, 5, 5, 8, 8, 8, 10];        
        posOffSetArr =  [0.55 ,0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.57, 0.59, 0.6, 0.61, 0.63];
    } 
    var textureIndex = lineCardCount[2] - col - 1;
    if(row == 0){
        textureIndex = this.getMaxPlayer() == 2 ? (lineCardCount[2] - col - 3) : (lineCardCount[2] - col - 2);
    }
    cardNode.loadTexture("playing/MJ3D/downCard/out2-" + textureIndexArray[textureIndex] + ".png");

    var playerNode = cardNode.getParent();
    var templetCard = playerNode.getChildByName(this.CsdDefaultCardType.PutCardOne);
    var offSet_x = 0, offSet_y = 0;
    if(row != 0){
        var count = 1;
        for(var i = 1;i < row;i++){
            if(lineCardCount[i] != lineCardCount[i - 1]){
                count++;
            }
        }
        offSet_x = templetCard.width * templetCard.scale* 1.3 * 0.95 * count;
        offSet_y = templetCard.height * templetCard.scale * 0.88 * count;
    }

    var _ex = offSet_x + templetCard.x - templetCard.width * templetCard.scale * 1.3 * col * 0.95;
    var _ey = offSet_y + templetCard.y;
    var _endPonit = cc.p(_ex,_ey);

    var setEndData = function(){
        cardNode.setPosition(_endPonit);
        cardNode.zIndex = 100 * (5 - row) + col * (col > lineCardCount[row] / 2 ? -1 : 1);
        if(callback){
            callback();
        }
    };

    if(MjClient.playui.getPutCardScaleConfig() && isPut){
        cardNode.zIndex = 1000;
        this.putCardScaleAni(cardNode,2,_endPonit,function(){
            setEndData();
        });
    }else{
        setEndData();
    }

    var skewValue = row == 0 ? skewArray[col + 1] : skewArray[col];
    var children = cardNode.children;
    for(var k = 0; k < children.length; k++){
        var child = children[k];
        if (child.ignoreContentAdaptWithSize) {
            child.ignoreContentAdaptWithSize(true);
        }
        child.setScale(0.45);
        child.setSkewX(skewValue);
        if(child.getName() == "laiZi"){
            child.setPosition(this.getPutCardsLaiZiIconPosSpcae3D(cardNode));
        }
        if(child.name == "cardImg"){
            if(textureIndex >= textureIndexArray.length ) {
                textureIndex = textureIndexArray.length - 1;
            }
            child.setPosition(50 * posOffSetArr[textureIndex], 45);
        }
    }
};

/**
 *  刷新node_left节点打出去的牌
 **/
majiang_panel.prototype.updateLeftPutCards3D = function(cardNode, col, row, callback, isPut){
    var lineCardCount = [8, 10, 10, 10]; 
    var playerNode = cardNode.getParent();
    var templetCard = playerNode.getChildByName(this.CsdDefaultCardType.PutCardOne);

    var rowIndex = (4 - row);
    if(rowIndex < 2) rowIndex = 2; //图片的引索只有3列，如果大于3列的，第四列还是用第三列的图片 marked by sking
    cardNode.loadTexture("playing/MJ3D/left/1-" + rowIndex + ".png");

    var changeScale = 1 - (lineCardCount[row] - col) * (row == 0 ? 0.01 : 0.02);
    cardNode.setScale(cardNode.getScale() * changeScale);

    var offSet_x = 0, offSet_y = 0;
    if(row != 0){
        offSet_x = -templetCard.width * templetCard.scale * row;
        offSet_y = templetCard.height * templetCard.scale * 0.7;
    }
    var changePos_x = 1 - (row == 0 ? 0.0058 * col : row == 1 ? 0.009 * col : 0.0135 * col);

    var _ex = offSet_x + templetCard.x * changePos_x;
    var _ey = offSet_y + templetCard.y - cardNode.height * cardNode.scale * col * (0.65 - col * 0.008 );
    var _endPonit = cc.p(_ex,_ey);

    var setEndData = function(){
        cardNode.setPosition(_endPonit);
        cardNode.zIndex = 100 * (5 - row) + col;
        if(callback){
            callback();
        }
    };

    if(MjClient.playui.getPutCardScaleConfig() && isPut){
        cardNode.zIndex = 1000;
        this.putCardScaleAni(cardNode,3,_endPonit,function(){
            setEndData();
        });
    }else{
        setEndData();
    }


    var children = cardNode.children;
    for(var i = 0;i < children.length;i++){
        var child = children[i];
        if (child.ignoreContentAdaptWithSize) {
            child.ignoreContentAdaptWithSize(true);
        }
        child.setScale(0.45);
        child.setSkewY((row == 0 ? -6 : -7));
        if(child.name == "laiZi"){
            child.setPosition(this.getPutCardsLaiZiIconPosSpcae3D(cardNode));
        }
        if(child.name == "cardImg"){
            child.setPosition(child.x * 0.5, child.y * 0.5);
        }     
    }
};

/**
 * 设置中间轮盘转动
 * @param arrowNode
 * @param nextPlayer
 * @returns {undefined}
 * @constructor
 */
majiang_panel.prototype.updateArrowRotation3D =  function(arrowNode, nextPlayer){
    if(!this.isInGame()){
        return;
    }

    var tData = MjClient.data.sData.tData;
    var curPlayerNode = this.getUIBind(tData.curPlayer);
    if(nextPlayer != null && !cc.isUndefined(nextPlayer)){
        curPlayerNode = this.getUIBind(nextPlayer);
    }
    var selfUidIndex = tData.uids.indexOf(this.getSelfUid());
    var selfArrowName = this.NodeNameArray[selfUidIndex];
    var selfArrowIndex = this.DefaultNodeNameArray.indexOf(selfArrowName);
    var selectIndex = this.DefaultNodeNameArray.indexOf(curPlayerNode.getName());
    var selectArrowIndex = (selfArrowIndex + selectIndex) % this.DefaultNodeNameArray.length;

    var arrowArray = ["img_eastArrow", "img_southArrow", "img_westArrow", "img_northArrow"];
    var iconArray = ["img_east", "img_south", "img_west", "img_north"];
    var normalPath = "playing/gameTable/dir/dir_normal_";
    for(var i = 0;i < arrowArray.length;i++){
        var arrow = arrowNode.getChildByName(arrowArray[i]);
        arrow.visible = false;
        arrow.stopAllActions();
        var icon = arrowNode.getChildByName(iconArray[i]);
        var textureFile = "playing/gameTable/dir/dir_normal_" + (selfArrowIndex + i) % this.DefaultNodeNameArray.length + ".png";
        icon.loadTexture(textureFile);
    }

    var selectArrow = arrowNode.getChildByName(arrowArray[selectIndex]);
    selectArrow.visible = true;
    selectArrow.runAction(cc.sequence(cc.fadeOut(0.75), cc.fadeIn(0.75)).repeatForever());
    var arrowIcon = arrowNode.getChildByName(iconArray[selectIndex]);
    var arrowPath = "playing/gameTable/dir/dir_" + selectIndex + "_" + selectArrowIndex + ".png";
    arrowIcon.loadTexture(arrowPath);
};

/**
 * 3D小结算之前的摊牌效果
 * @param off
 */
majiang_panel.prototype.showMjhandBeforeEndOne3D = function(nodeName){
    var player = this.getPlayerInfoByName(nodeName);
    if (!player || !player.mjhand || MjClient.rePlayVideo !== -1) return;
    //删除手牌，重新添加手牌(以吃牌作为模板，然后重新刷新)
    var playerNode = this.getNodeByName(nodeName);
    this.removeCardsByName(playerNode, this.HandleCardType.Hand);

    var mjhand = player.mjhand.slice();
    //当点炮时，不显示点炮的牌
    if ((MjClient.data.sData.tData.tState === TableState.waitEat || MjClient.data.sData.tData.tState === TableState.roundFinish) && 
        mjhand.length % 3 === 2 && !player.isZiMo) 
    {
        mjhand = mjhand.slice(0, mjhand.length - 1);
    }
    //因为会重新刷新，因此之前的吃碰杠的缩放需要还原
    var templetEatCard = playerNode.getChildByName(this.CsdDefaultCardType.EatCardFront);
    var children = playerNode.children;
    for(var k = 0;k < children.length;k++){
        var child = children[k];
        if(child.name == this.HandleCardType.Chi || child.name == this.HandleCardType.Peng ||
            child.name == this.HandleCardType.MingGang || child.name == this.HandleCardType.AnGang || child.name == this.HandleCardType.PengGang)
        {
            child.setScale(templetEatCard.scale);
        }
    }

    for(var i = 0;i < mjhand.length;i++){
        var cardNode = this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Chi, mjhand[i]);
        cardNode.isCut = true;
    }

    this.resetCardLayout3D(playerNode);
};