/**
 *  设置牌面以及癞子标识(其实这里的牌最好能以数字代替)
 *  (打牌过程中的牌:手牌、吃,碰,杠牌、打的牌   多个吃或者杠显示的牌  小结算展示的牌)
 **/
majiang_panel.prototype.setCardSprite2D = function(cardNode, cardTag){
    var playerNode = cardNode.getParent();
    var offIndex = 0;
    if(playerNode){
        offIndex = this.getNodeIndexDefaultByName(playerNode.getName());
        offIndex = offIndex == -1 ? 0 : offIndex;
    }
    
    if(offIndex == 2 && this.isCardRotationOfTopPlayer(cardNode)) offIndex = 0;
    var cardImg = this.getCardFaceImg2D(cardTag);
    cardImg.setRotation(-90 * offIndex);
    if (cc.sys.isObjectValid(cardImg) && !cardTag) {
        cardImg.tag = cardTag;
    }
    cardNode.removeAllChildren();
    this.updateCardNodeScale(cardNode);
    cardNode.addChild(cardImg);
    this.updateAfterChangeMjBg2D(cardNode, this.getMaJiangBgType(), offIndex);
    this.addLaiZiIcon2D(cardNode);
};

/**
 * 根据麻将类型进行缩放
 */
majiang_panel.prototype.updateCardNodeScale = function(cardNode){
    var mjBgType = this.getMaJiangBgType();
    if(mjBgType == 3 && !cardNode.isScale) {
        var scale = cardNode.getScale();
        cardNode.setScale(0.95 * scale);
        cardNode.isScale = true;
    }

    if (mjBgType != 3 && cardNode.isScale) {
        var scale = cardNode.getScale();
        cardNode.setScale(scale / 0.95);
        cardNode.isScale = false;
    }
};

/**
 *  获得牌面
 **/
majiang_panel.prototype.getCardFaceImg2D = function(cardTag){
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
    cardImg.loadTexture("playing/MJ/" + imgName + ".png");
    return cardImg;
};

/**
 *  改变麻将风格之后，刷新牌背、牌面以及牌面坐标调整
 **/
majiang_panel.prototype.updateAfterChangeMjBg2D = function(cardNode, mjBgType, nodeInex){
    nodeInex = nodeInex === undefined ? 0 : nodeInex;
    mjBgType = mjBgType === undefined ? this.getMaJiangBgType() : mjBgType;

    var cardFacePosArr = this.getCardFacePositon2D(mjBgType, cardNode);
    var cardImgName = this.sliceLastWithSep(cardNode.getRenderFile().file, "/");
    var cardBgList = this.getCardBgList(this.is3DStyle());
    cardNode.loadTexture(cardBgList[mjBgType] + "/" + cardImgName);

    var imageNode = cardNode.getChildByName("cardImg");
    if (!imageNode) {
        return;
    }

    var scale = this.getScaleByMjType2D(mjBgType);
    imageNode.setScale(scale);  

    var cardFrontName = this.sliceLastWithSep(imageNode.getRenderFile().file, "/");
    var cardFrontList = this.getCardFrontList(this.is3DStyle());
    imageNode.loadTexture(cardFrontList[mjBgType] + "/" + cardFrontName);

    imageNode.setPosition(cardFacePosArr[nodeInex][0], cardFacePosArr[nodeInex][1]);
};

/**
 *  根据麻将背景类型获得对应的缩放比
 **/
majiang_panel.prototype.getScaleByMjType2D = function(mjBgType){
    mjBgType = mjBgType === undefined ? this.getMaJiangBgType() : mjBgType;
    var scale = 1;
    if (mjBgType == 1){
        scale = 1.2;
    }else if(mjBgType == 2){
        scale = 1.2;
    }else if(mjBgType == 3){
        scale = 1.2;
    }
    return scale;
};

/**
 *  获得牌面的坐标(提出来方便重写)
 *  mjBgType: 麻将牌背类型
 *  return {Array}
 **/
majiang_panel.prototype.getCardFacePositon2D = function(mjBgType, cardNode){
    var cardTypeName = cardNode.getName();
    cardTypeName = cardTypeName === undefined ? this.HandleCardType.Hand : cardTypeName;
    if(MjClient.rePlayVideo != -1 && cardNode.getParent() && cardNode.getParent().getName() == "node_top" && cardTypeName == this.HandleCardType.Hand){
        cardTypeName = this.HandleCardType.Put;
    }
    var offSets = this.getHandCardFacePosition2D(mjBgType);
    switch(cardTypeName){
        case this.HandleCardType.Hand:
            offSets = this.getHandCardFacePosition2D(mjBgType);
            break;
        case this.HandleCardType.Chi:
        case this.HandleCardType.Peng:
        case this.HandleCardType.AnGang:
        case this.HandleCardType.MingGang:
        case this.HandleCardType.PengGang:
        case this.HandleCardType.Put:
        case this.HandleCardType.PuCard:
        case this.HandleCardType.HuCard:
        case this.HandleCardType.LiangCard:
        case this.HandleCardType.GDGangCard:
            offSets = this.getPutCardFacePosition2D(mjBgType);
            break;
    }
    return offSets;
};

/**
 *  获得手牌的牌牌背和牌面对应的坐标
 **/
majiang_panel.prototype.getHandCardFacePosition2D = function(mjBgType){
    var offSets = [[50, 65], [60, 66], [50, 104], [60, 66], [52, 68], [53, 64], [19, 25]];
    if (mjBgType == 1){
        offSets = [[52, 70], [65, 68], [52, 100], [65, 68], [52, 66], [53, 64], [19, 25]];
    }else if(mjBgType == 2){
        offSets = [[52, 74], [55, 70], [52, 90], [70, 70], [50, 76], [53, 64], [19, 25]];
    }else if(mjBgType == 3){
        offSets = [[52, 70], [65, 68], [52, 100], [65, 68], [50, 66], [53, 64], [19, 25]];
    }
    return offSets;
};

/**
 *  获得打出的牌牌背和牌面对应的坐标
 **/
majiang_panel.prototype.getPutCardFacePosition2D = function(mjBgType){
    var offSets = [[50, 100], [60, 70], [50, 104], [60, 70], [52, 68], [53, 64], [19, 25]];
    if (mjBgType == 1){
        offSets = [[52, 100], [65, 68], [52, 100], [65, 68], [52, 66], [53, 64], [19, 25]];
    }else if(mjBgType == 2){
        offSets = [[52, 105], [55, 70], [52, 90], [70, 70], [50, 76], [53, 64], [19, 25]];
    }else if(mjBgType == 3){
        offSets = [[52, 98], [65, 68], [52, 100], [65, 68], [50, 66], [53, 64], [19, 25]];
    }
    return offSets;
};

/**
 *  添加癞子标识
 **/
majiang_panel.prototype.addLaiZiIcon2D = function(cardNode){
    if(!this.isCanAddLaiZiIcon(cardNode.tag)){
        return;
    }

    var playerNodeName = cardNode.getParent().getName();
    var offIndex = this.getNodeIndexDefaultByName(playerNodeName);
    offIndex = offIndex == -1 ? 0 : offIndex;
    var laiZiPosArr = this.getHunIconPosition2D();
    var laiZiNode = this.getLaiZiIcon2D(cardNode.tag);
    laiZiNode.setPosition(laiZiPosArr[offIndex][0], laiZiPosArr[offIndex][1]);
    laiZiNode.setRotation(-90 * offIndex);
    cardNode.addChild(laiZiNode);
};

/**
 *  获得癞子标识的坐标
 *  return {Array}
 **/
majiang_panel.prototype.getHunIconPosition2D = function(){
    return [[60, 107], [52, 70], [40, 84], [74, 68], [61, 78], [61, 78], [22, 30]];
};

/**
 *  获得癞子标识
 **/
majiang_panel.prototype.getLaiZiIcon2D = function(){
    var laiZiNode = new ccui.ImageView();
    laiZiNode.setName("laiZi");
    laiZiNode.loadTexture("playing/MJ/chao.png");
    return laiZiNode;
};

/**
 *  刷新牌
 **/
majiang_panel.prototype.resetCardLayout2D = function(node){
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
    var sortArr = this.getCardSortArray2D(node, newCardTag);
    if(sortArr.length == 0){
        return;
    }
    this.updateCardPosition2D(node, sortArr);
};

/**
 *  所有的牌进行排序
 **/
majiang_panel.prototype.getCardSortArray2D = function(node, newCardTag){
    var tData = MjClient.data.sData.tData;
    var handArr = [], anGangArr = [], mingGangArr = [], pengGangArr = [],pengArr = [], chiArr = [], laiZiArr = [],huArr = [];
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
            pengGangArr.push(child);
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
    pengGangArr = sortArray(pengGangArr);
    if(this.getNodeIndexDefaultByName(node.getName()) == 1){
        //右边玩家的zIndex需要做处理
        chiArr.reverse();
    }
    if(newCard){
        handArr.push(newCard);
    }
    laiZiArr.sort(function(a, b){
        return a.tag - b.tag;
    });    
    for(i = 0;i < laiZiArr.length;i++){
        handArr.unshift(laiZiArr[i]);
    }
    return [].concat(anGangArr, mingGangArr, pengGangArr,pengArr, chiArr, handArr);
};

/**
 *  刷新牌的坐标
 **/
majiang_panel.prototype.updateCardPosition2D = function(node, sortArr){
    var handCard = node.getChildByName("img_handCard");
    var eatFrontCard = node.getChildByName("img_eatFrontCard");

    var nodeName = node.getName();
    var nodeIndex = this.getNodeIndexDefaultByName(nodeName);
    var hasCutDownDis = true;
    var start_x = sortArr[0].name == this.HandleCardType.Hand ? handCard.x : eatFrontCard.x;
    var start_y = sortArr[0].name == this.HandleCardType.Hand ? handCard.y : eatFrontCard.y;
    if(sortArr[0].name == this.HandleCardType.Chi && sortArr[0].isCut){
        //倒牌位置设置
        var changePos = this.updateStartPosWhenCutDown(node, sortArr);
        start_x = changePos.x == 0 ? start_x : changePos.x;
        start_y = changePos.y == 0 ? start_y : changePos.y;
        hasCutDownDis = false;
    }   
    var chiFirstIndex = -1;
    for(var j = 0;j < sortArr.length;j++){
        if(chiFirstIndex == -1 && sortArr[j].name == this.HandleCardType.Chi && !sortArr[j].isCut){
            chiFirstIndex = j;
            break;
        }
    }
    
    var dir = this.getDirectByNodeIndex(nodeIndex);
    for(var i = 0;i < sortArr.length;i++){
        var cardNode = sortArr[i];
        cardNode.visible = true;
        cardNode.zIndex = 100 + (nodeIndex != 1 ? i : sortArr.length - i);

        var add_offSet = this.getMoveDistance2D(node, sortArr, i, chiFirstIndex);
        add_offSet *= dir;

        //自己视角下有吃碰牌时胡牌倒牌的手牌与吃碰牌的距离
        if (hasCutDownDis && nodeIndex == 0 && sortArr[i].name == this.HandleCardType.Chi && sortArr[i].isCut) {
            hasCutDownDis = false;
            start_x += this.getDisScaleOfFirstCutDownBetweenEatCard2D() * add_offSet;
        }

        if(nodeIndex % 2 == 0){
            start_y = cardNode.name == this.HandleCardType.Hand ? handCard.y : eatFrontCard.y;
            start_x += add_offSet;
        }else{
            start_x = cardNode.name == this.HandleCardType.Hand ? handCard.x : eatFrontCard.x;
            start_y += add_offSet;            
        }
        this.switchUpdate2D(node, sortArr, cc.p(start_x, start_y), i, chiFirstIndex);
    }
};

 //获取自己视角下有吃碰牌时胡牌倒牌的手牌与吃碰牌的距离比例
majiang_panel.prototype.getDisScaleOfFirstCutDownBetweenEatCard2D = function(){
    return 2.5;
};

/**
 *  倒牌时，修改起始坐标
 **/
majiang_panel.prototype.updateStartPosWhenCutDown = function(node, sortArr){
    var firstCardNode = sortArr[0];
    var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
    var handCard = node.getChildByName("img_handCard");
    var winSize = MjClient.size;
    var startPos = cc.p(0,0);
    if(nodeIndex == 0){
        startPos.x = (winSize.width - firstCardNode.width * firstCardNode.scale * sortArr.length) / 2;
    }else if(nodeIndex == 1){

    }else if(nodeIndex == 2){
        startPos.x = handCard.x;
    }else if(nodeIndex == 3){
        startPos.y = handCard.y;
    }
    return startPos;
};

/**
 *  根据牌的类型获得牌与牌之间的距离
 **/
majiang_panel.prototype.getMoveDistance2D = function(node, cardArr, index, chiFirstIndex){
    if(index == 0){
        return 0;
    }
    var handCard = node.getChildByName("img_handCard");
    var eatFrontCard = node.getChildByName("img_eatFrontCard");
    var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
    var cardNode = cardArr[index];
    var offSetScale = this.getCardOffSetScaleByType(cardNode.getParent());
    var handCardSpaceScale = this.getHandCardSpaceScale();
    var add_offSet = cardNode.name == this.HandleCardType.Hand ? 
                    handCard.width * handCard.scale * handCardSpaceScale : eatFrontCard.width * eatFrontCard.scale * offSetScale;
    if(nodeIndex % 2 != 0){
        add_offSet = (cardNode.name == this.HandleCardType.Hand && MjClient.rePlayVideo == -1) ? 
                    handCard.height * handCard.scale * 0.4 : eatFrontCard.height * eatFrontCard.scale * offSetScale;        
    }

    var eatCardSpace = this.getEatCardSpace();        //获得吃碰杠的间距
    if(cardNode.getName() == this.HandleCardType.AnGang || cardNode.getName() == this.HandleCardType.MingGang || cardNode.getName() == this.HandleCardType.PengGang){
        if(cardArr[index + 1] && cardArr[index + 1].tag != cardNode.tag){
            add_offSet = 0;
        }
        if(cardArr[index - 1] && cardArr[index - 1].tag != cardNode.tag){
            add_offSet += eatCardSpace;
        }
    }else if(cardNode.getName() == this.HandleCardType.Peng){
        if(cardArr[index - 1] && cardArr[index - 1].tag != cardNode.tag){
            add_offSet += eatCardSpace;
        }        
    }else if(cardNode.getName() == this.HandleCardType.Hand || (cardNode.name == this.HandleCardType.Chi && cardNode.isCut)){
        var mult = nodeIndex % 2 == 0 ? 1 : nodeIndex == 1 ? 3 : 2;
        if(cardArr[index - 1] && cardArr[index - 1].name != cardNode.name){
            add_offSet += eatCardSpace * mult;
        }           
    }else if(cardNode.getName() == this.HandleCardType.Chi){
        if((cardArr[index - 1] && cardArr[index - 1].name != cardNode.name) ||
            (chiFirstIndex != -1 && (index - chiFirstIndex) % 3 == 0))
        {
            add_offSet += eatCardSpace;
        }

    } 
    return add_offSet;  
};

/**
 *  根据麻将背景
 **/
majiang_panel.prototype.getCardOffSetScaleByType = function(playerNode){
    var mjBgType = this.getMaJiangBgType();
    var nodeIndex = this.getNodeIndexDefaultByName(playerNode.getName());
    var offSetScale = 0.97;
    switch(playerNode.getName()){
        case "node_down":
            offSetScale = this.getDownAndTopNodeEatCardScale(mjBgType);
            break;
        case "node_right":
            offSetScale = this.getRightAndLeftNodeEatCardScale(mjBgType);
            break;
        case "node_top":
            offSetScale = this.getDownAndTopNodeEatCardScale(mjBgType);
            break;
        case "node_left":
            offSetScale = this.getRightAndLeftNodeEatCardScale(mjBgType);
            break;
    }
    return offSetScale;
};

/**
 * 每组吃牌，牌与牌之间的缩放比
 **/
majiang_panel.prototype.getDownAndTopNodeEatCardScale = function(mjBgType){
    var scale = 0.95;
    if(mjBgType == 0){
        scale = 0.965;
    }else if(mjBgType == 1){
        
    }else if(mjBgType == 2){
        scale = 0.94;
    }else if(mjBgType == 3){
        scale = 0.93;
    }
    return scale;
};

/**
 * 每组吃牌，牌与牌之间的缩放比
 **/
majiang_panel.prototype.getRightAndLeftNodeEatCardScale = function(mjBgType){
    var scale = 0.65;
    if(mjBgType == 0){
        scale = 0.7;
    }else if(mjBgType == 1){
        scale = 0.75;
    }else if(mjBgType == 2){
        scale = 0.725;
    }else if(mjBgType == 3){
        scale = 0.735;
    }
    return scale;
};

/**
 *  获得手牌之间的缩放比
 **/
majiang_panel.prototype.getHandCardSpaceScale = function(){
    var mjBgType = this.getMaJiangBgType();
    var scale = 0.95;
    if(mjBgType == 0){

    }else if(mjBgType == 1){

    }else if(mjBgType == 2){
        scale = 0.94;
    }else if(mjBgType == 3){
        
    }
    return scale;
};

/**
 *  不同类型的牌设置坐标
 **/
majiang_panel.prototype.switchUpdate2D = function(node, sortArr, pos, index, chiFirstIndex){
    var cardNode = sortArr[index];
    if(cardNode.getName() == this.HandleCardType.Chi && cardNode.isCut){
        this.setHandPosition2D(node, sortArr, pos, index);
    }else if(cardNode.getName() == this.HandleCardType.AnGang){

        this.setAnGangPosition2D(node, sortArr, pos, index);
    }else if(cardNode.getName() == this.HandleCardType.MingGang ){
        this.setMingGangPosition2D(node, sortArr, pos, index);
    }else if(cardNode.getName() == this.HandleCardType.PengGang ){
        this.setPengGangPosition2D(node, sortArr, pos, index);
    }else if(cardNode.getName() == this.HandleCardType.Peng){

        this.setPengPosition2D(node, sortArr, pos, index);
    }else if(cardNode.getName() == this.HandleCardType.Chi){

        this.setChiPosition2D(node, sortArr, pos, index, chiFirstIndex);
    }else if(cardNode.getName() == this.HandleCardType.Hand){
        cardNode.stopAllActions();
        this.setHandPosition2D(node, sortArr, pos, index);
    }
};

/**
 *  暗杠牌的坐标
 **/
majiang_panel.prototype.setAnGangPosition2D = function(node, cardArr, pos, index){
    var cardNode = cardArr[index];
    var nextNode = cardArr[index + 1];
    if(nextNode && nextNode.tag != cardNode.tag){
        var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
        var dir = this.getDirectByNodeIndex(nodeIndex);
        var secondNodePos = cardArr[index - 2].getPosition();
        if(nodeIndex % 2 == 0){
            pos = cc.p(secondNodePos.x, secondNodePos.y + 16 * (1 - nodeIndex / 4));
        }else{
            pos = cc.p(secondNodePos.x, secondNodePos.y + cc.winSize.height / 55.38);
        }
        cardNode.zIndex = cardArr[index - 2].zIndex + 1;
        cardNode.removeChildByName("cardImg");
        var cardBackNode = node.getChildByName(this.CsdDefaultCardType.EatCardBack);
        cardNode.loadTexture(cardBackNode.getRenderFile().file);
        this.updateAfterChangeMjBg2D(cardNode);

    }
    cardNode.setPosition(pos);
};

/**
 *  明杠牌的坐标
 **/
majiang_panel.prototype.setMingGangPosition2D = function(node, cardArr, pos, index){
    var cardNode = cardArr[index];
    var nextNode = cardArr[index + 1];
    if(nextNode && nextNode.tag != cardNode.tag){
        var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
        var dir = this.getDirectByNodeIndex(nodeIndex);
        cardNode.zIndex = cardArr[index - 2].zIndex + 1;
        var secondNodePos = cardArr[index - 2].getPosition();
        if(nodeIndex % 2 == 0){
            pos = cc.p(secondNodePos.x, secondNodePos.y + 16 * (1 - nodeIndex / 4));
        }else{
            pos = cc.p(secondNodePos.x, secondNodePos.y + cc.winSize.height / 55.38);
        }
        var player = this.getPlayerInfoByName(node.getName());
        this.setCardArrow(cardNode, this.getOperateFrom(node, cardNode.tag), this.getUidIndex(player.info.uid));
        this.handlerAfterChiPengGang(cardNode);
    }
    cardNode.setPosition(pos);
};

/**
 *  碰杠牌的坐标，与明杠一样
 **/
majiang_panel.prototype.setPengGangPosition2D = function(node, cardArr, pos, index){
    this.setMingGangPosition2D(node, cardArr, pos, index);
};

/**
 *  吃牌的坐标
 **/
majiang_panel.prototype.setChiPosition2D = function(node, cardArr, pos, index, chiFirstIndex){
    var cardNode = cardArr[index];
    var chiCardIndex = Math.floor((index - chiFirstIndex) / 3);
    var player = this.getPlayerInfoByName(node.getName());
    var pengchigang = player.pengchigang;
    if(pengchigang && Object.keys(pengchigang).length > 0){
        var chiData = pengchigang.chi[chiCardIndex];
        if(chiData && Math.floor((index - chiFirstIndex) % 3) == 1){
            this.setCardArrow(cardNode, chiData.pos, this.getUidIndex(player.info.uid));            
        }
        this.handlerAfterChiPengGang(cardNode);
    }
    cardNode.setPosition(pos);
};

/**
 *  碰牌的坐标
 **/
majiang_panel.prototype.setPengPosition2D = function(node, cardArr, pos, index){
    var cardNode = cardArr[index];
    var lastCard = cardArr[index - 1];
    var nextCard  = cardArr[index + 1];
    if(lastCard && nextCard && cardNode.tag == lastCard.tag && cardNode.tag == nextCard.tag && lastCard.name == nextCard.name){
        var player = this.getPlayerInfoByName(node.getName());
        this.setCardArrow(cardNode, this.getOperateFrom(node, cardNode.tag), this.getUidIndex(player.info.uid));
        this.handlerAfterChiPengGang(cardNode);
    }
    cardNode.setPosition(pos);
};

/**
 *  手牌的坐标
 **/
majiang_panel.prototype.setHandPosition2D = function(node, cardArr, pos, index){
    var cardNode = cardArr[index];
    var nextCard = cardArr[index + 1];
    var lastCard = cardArr[index - 1];
    var isPlayAct = false;
    if(!nextCard && lastCard && (lastCard.name != cardNode.name || index == cardArr.length - 1)){
        var nodeName = node.getName();
        var player = this.getPlayerInfoByName(nodeName);
        var tData = MjClient.data.sData.tData;
        var handCount = this.getCardNodeCountByName(node, this.HandleCardType.Hand);
        var newCardSpace = this.getNewCardSpace();
        if((handCount % 3 == 2 && player.info.uid == tData.uids[tData.curPlayer] && player.mjState == TableState.waitPut) ||
            (player.mjhand && player.mjhand.length % 3 == 2 && player.isZiMo))
        {
            var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
            var dir = this.getDirectByNodeIndex(nodeIndex);
            var pos_x = nodeIndex % 2 == 0 ? pos.x + newCardSpace * dir : pos.x;
            var pos_y = nodeIndex % 2 == 0 ? pos.y : pos.y + newCardSpace * dir;
            pos = cc.p(pos_x, pos_y);
            isPlayAct = this.playNewCardAction(nodeName, cardNode, pos);
        }
        //吃碰杠之后，设置this.newCardNode
        if(handCount % 3 == 2 && player.info.uid == tData.uids[tData.curPlayer] && player.mjState == TableState.waitPut && !player.isNew){
            this.newCardNode = cardNode;
            this.newCardNode.isNew = true;
        }
    }

    if (!isPlayAct) {
        cardNode.setPosition(pos);
    }
};

/**
 *  添加打出去的牌
 **/
majiang_panel.prototype.addPutCard2D = function(cardNode, callback){
    var playerNode = cardNode.getParent();
    var putNodeArray = [];
    var children = playerNode.children;
    for(var i = 0; i < children.length; i++){
        if(children[i].name == this.HandleCardType.Put){
            putNodeArray.push(children[i]);
        }
    }
    var nodeIndex = this.getNodeIndexDefaultByName(playerNode.getName());
    var dir = this.getDirectByNodeIndex(nodeIndex);

    var templetCard = playerNode.getChildByName(this.CsdDefaultCardType.PutCardOne);
    var endPoint = null; 
    // 计算结束位置
    var putOutCardScale = this.getPutOutCardScale(playerNode);
    var width = templetCard.width * templetCard.scale * putOutCardScale.scale_x;
    var height = templetCard.height * templetCard.scale * putOutCardScale.scale_y;

    var move_x = width * dir;
    var move_y = height * dir * 0.8;  

    var putOutMaxRow = this.getOutCardMaxRow();
    var row = Math.floor(putNodeArray.length / putOutMaxRow);
    var mul = putNodeArray.length % putOutMaxRow;
    row = mul == 0 ? row - 1 : row;
    var col = putNodeArray.length - row * putOutMaxRow - 1;
    var count = col;

    var pos_x = templetCard.x + count  * move_x;
    var pos_y = templetCard.y + row * move_y;
    if(nodeIndex % 2 != 0){
        pos_x = templetCard.x + row * move_x;
        pos_y = templetCard.y + count * move_y * 0.9;
    }
    endPoint = cc.p(pos_x, pos_y);
   

    // 设置麻将层级 和 增加箭头
    var that = this;
    var setCardIndexAndAddTip = function () {
        cardNode.zIndex = 50 - putNodeArray.length;
        if(dir < 0){
            cardNode.zIndex = 200 + putNodeArray.length;
        }
        cardNode.visible = true;
        cardNode.setPosition(endPoint);
        if(callback){
            callback();
        }
    };

    if(nodeIndex !== 0 && MjClient.playui.getPutCardScaleConfig()){
        this.putCardScaleAni(cardNode, nodeIndex, endPoint, setCardIndexAndAddTip);
    }else{
        setCardIndexAndAddTip();
    }
};

/**
 *  获得打出去牌的缩放比
 **/
majiang_panel.prototype.getPutOutCardScale = function(playerNode){
    var mjBgType = this.getMaJiangBgType();
    var scale = {scale_x : 1,scale_y : 1};
    switch(playerNode.getName()){
        case "node_down":
        case "node_top":
            scale = this.getDownAndTopPutOutCardScale(mjBgType);
            break;
        case "node_left":
        case "node_right":
            scale = this.getRightAndLeftPutOutCardScale(mjBgType);
            break;        
    }
    return scale;
};

majiang_panel.prototype.getDownAndTopPutOutCardScale = function(mjBgType){
    var scale_x = 0.95, scale_y = 0.95;
    if(mjBgType == 1){
        scale_x = 0.95;
        scale_y = 0.97;
    }else if(mjBgType == 2){
        scale_x = 0.945;
        scale_y = 0.95;
    }else if(mjBgType == 3){
        scale_x = 0.92;
        scale_y = 0.91;
    }
    return {scale_x : scale_x, scale_y : scale_y};
};

majiang_panel.prototype.getRightAndLeftPutOutCardScale = function(mjBgType){
    var scale_x = 0.95, scale_y = 0.95;
    if(mjBgType == 1){
        scale_x = 0.93;
        scale_y = 1;
    }else if(mjBgType == 2){
        scale_x = 0.90;
        scale_y = 0.95;
    }else if(mjBgType == 3){
        scale_x = 0.93;
        scale_y = 1;
    }
    return {scale_x : scale_x, scale_y : scale_y};
};

/**
 *  刷新打出的牌(断线重连)
 **/
majiang_panel.prototype.resetPutCards2D = function(node, callback){
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

    var col = 0, row = 0;
    var templetCard = node.getChildByName(this.CsdDefaultCardType.PutCardOne);
    var putOutCardScale = this.getPutOutCardScale(node);
    var width = templetCard.width * templetCard.scale * putOutCardScale.scale_x;
    var height = templetCard.height * templetCard.scale * putOutCardScale.scale_y;

    var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
    var dir = this.getDirectByNodeIndex(nodeIndex);
    var move_x = width * dir;
    var move_y = height * dir * 0.8;
    var putOutMaxRow = this.getOutCardMaxRow();
    for(var k = 0;k < putCardArray.length;k++){
        var putCard = putCardArray[k];
        putCard.zIndex = 50 - k;
        if(dir < 0){
            putCard.zIndex = k;
        }
        putCard.visible = true;
        var pos_x = templetCard.x + col * move_x;
        var pos_y = templetCard.y + row * move_y;
        if(nodeIndex % 2 != 0){
            pos_x = templetCard.x + row * move_x;
            pos_y = templetCard.y + col * move_y * 0.9;
        }
        putCard.setPosition(pos_x, pos_y);
        col++;
        row = Math.floor((k + 1) / putOutMaxRow);
        col = col >= putOutMaxRow ? col - putOutMaxRow : col;

        if(k == putCardArray.length - 1){
            node.lastPutCardNode = putCard;
        }
    }

    if(callback){
        callback();
    }
};

/**
 * 中间的小转盘，刷新
 * @param arrowbkNode
 * @param name
 */
majiang_panel.prototype.updateArrowRotation2D = function(arrowNode, nextPlayer){
    if(!this.isInGame()){
        return;
    }
    var tData = MjClient.data.sData.tData;
    var playerNode = this.getUIBind(tData.curPlayer);
    if(nextPlayer != null && !cc.isUndefined(nextPlayer)){
        playerNode = this.getUIBind(nextPlayer);
    }

    var arrowArray = ["img_eastArrow", "img_southArrow", "img_westArrow", "img_northArrow"];
    var iconArray = ["img_east", "img_south", "img_west", "img_north"];

    var iconPressPath = "playing/gameTable/dir_press_";
    var iconNormalPath = "playing/gameTable/dir_normal_";
    var arrowPath = "playing/gameTable/arrow_";
    for(var i = 0;i < arrowArray.length;i++){
    	var arrow = arrowNode.getChildByName(arrowArray[i]);
    	arrow.visible = false;
    	arrow.stopAllActions();
    	var icon = arrowNode.getChildByName(iconArray[i]);
    	var textureFile = icon.getRenderFile().file;
    	textureFile = textureFile.replace("normal", "press");
    	icon.loadTexture(textureFile);
    }

    var selectIndex = this.DefaultNodeNameArray.indexOf(playerNode.getName());
    var playerIndex = tData.uids.indexOf(this.getSelfUid());
    var playerNodeName = this.NodeNameArray[playerIndex];
    var playerNodeIndex = this.DefaultNodeNameArray.indexOf(playerNodeName);
    playerNodeIndex = (playerNodeIndex + selectIndex) % this.DefaultNodeNameArray.length;
    
    var selectArrow = arrowNode.getChildByName(arrowArray[selectIndex]);
    selectArrow.visible = true;
    selectArrow.loadTexture(arrowPath + playerNodeIndex + ".png");
    selectArrow.runAction(cc.sequence(cc.fadeOut(0.75), cc.fadeIn(0.75)).repeatForever());

    var selectIcon = arrowNode.getChildByName(iconArray[selectIndex]);
    selectIcon.loadTexture(iconNormalPath + playerNodeIndex + ".png");
};

/**
 *  2d小结算之前手牌倒牌
 **/
majiang_panel.prototype.showMjhandBeforeEndOne2D = function(playerNodeName) {
    var playerNode = this.getNodeByName(playerNodeName);
    var player = this.getPlayerInfoByName(playerNodeName);
    if (!playerNode || !player || !player.mjhand || MjClient.rePlayVideo !== -1) {
        return;
    }
    this.removeCardsByName(playerNode, this.HandleCardType.Hand);
    /**
     * 点炮时，不显示点炮的牌
     * 1、一炮多响:正常牌局的状态(玩家、牌桌都是roundFinish,断线重连时，玩家为waitEat,牌桌偎roundFinish)
     * 2、截胡：正常牌局和断线重连都是roundFinish
     **/
     var mjhand = player.mjhand.slice();
    if ((MjClient.data.sData.tData.tState === TableState.waitEat || MjClient.data.sData.tData.tState === TableState.roundFinish) && 
        mjhand.length % 3 === 2 && !player.isZiMo) 
    {
        mjhand = mjhand.slice(0, mjhand.length - 1);
    }
    for(var k = 0;k < mjhand.length;k++){
        var cardNode = this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Chi, mjhand[k]);
        cardNode.isCut = true;
    }

    this.resetCardLayout2D(playerNode);
};