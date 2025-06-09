/***
 * 无奈之举，重写一堆和牌桌，麻将子的摆放相关的一些方法
 * Data: 2019.12.9
 * Author: Tom
 */

/****************************************    刷新玩家手牌   *******************************************************/
majiang_panel_xiaoGanKaiWuXing.prototype.updatePlayerCards = function (node) {
    if(!node) {
        return;
    }
    var player = this.getPlayerInfoByName(node.getName());
    if(!player){
        return;
    }

    this.removeAllCards(node);
    this.removePutCardTip();
    if (!this.isInGame()){
        return;
    }

    var i, j;

    //添加自己扑牌跟断线重连
    if(player.anKe && player.anKe.length > 0) {
        for(i = 0; i < player.anKe.length; i++){
            for (var j = 0; j < 3; j++) {
                if(node.getName() === "node_down"){
                    cc.log(" player.anKe  ",player.anKe[i]);
                    this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.PuCard, player.anKe[i]);
                }else{
                    this.createCard(node, this.CsdDefaultCardType.EatCardBack, this.HandleCardType.PuCard);
                }
            }
        }
    }
    //添加别人扑牌
    if(player.anKeNum && (!player.anKe || player.anKe.length <= 0)) {
        for(i = 0; i < player.anKeNum; i++){
            for (var j = 0; j < 3; j++) {
                if(node.getName() != "node_down"){
                    this.createCard(node, this.CsdDefaultCardType.EatCardBack, this.HandleCardType.PuCard);
                }
            }
        }
    }

    //添加暗杠
    for(i = 0; i < player.mjgang1.length; i++){
        for(j = 0; j < 4; j++){
            this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.AnGang, player.mjgang1[i]);
        }
    }
    //添加明杠
    for(i = 0; i < player.mjgang0.length; i++){
        for(j = 0; j < 4; j++){
            this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.MingGang, player.mjgang0[i]);
        }
    }

    //添加碰杠
    if(player.mjgang2) {
        for(i = 0; i < player.mjgang2.length; i++){
            for(j = 0; j < 4; j++){
                this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.PengGang, player.mjgang2[i]);
            }
        }
    }

    //添加碰
    for(i = 0; i < player.mjpeng.length; i++){
        for(j = 0; j < 3; j++)        {
            this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Peng, player.mjpeng[i]);
        }
    }
    //吃
    for(i = 0; i < player.mjchi.length; i++){
        this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Chi, player.mjchi[i]);
    }
    //添加打出的牌
    for(i = 0; i < player.mjput.length; i++){
        this.createCard(node, this.CsdDefaultCardType.PutCardOne, this.HandleCardType.Put, player.mjput[i]);
    }
    //添加手牌

    if(MjClient.rePlayVideo == -1){
        var handCardNodeArr = [];
        if(player.mjhand && this.NodeNameArray.indexOf(node.getName()) == 0){
            var showHandCards = player.mjhand;
            showHandCards = MjClient.majiang.getMjhandAfterCut(showHandCards,player);
            for(i = 0; i < showHandCards.length; i++){
                var cardNode = this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand, showHandCards[i]);
                handCardNodeArr.push(cardNode);
            }
        }else{
            var CardCount = 0;
            var needNewCard = false;
            var tData = MjClient.data.sData.tData;
            if(tData.tState == TableState.waitPut && tData.uids[tData.curPlayer] == player.info.uid){
                CardCount = 14;
                needNewCard = true;
                
            }else {
                CardCount = 13;
            }
            var anKeNum = 0;
            if (player.anKeNum && (!player.anKe || player.anKe.length <= 0)) anKeNum = player.anKeNum;
            CardCount = CardCount - ((player.mjpeng.length + player.mjgang0.length + player.mjgang1.length + anKeNum) * 3 + player.mjchi.length);
            if(player.liangCards) CardCount -= player.liangCards.length;
            if (player.anKe) CardCount -= player.anKe.length * 3;
            if (player.liangCards && player.liangCards.length > 0 && player.isTing) {
                if (tData.areaSelectMode.quanLiang) CardCount = 0;
                for(i = 0; i < player.liangCards.length; i++){
                    var cardNode = this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Chi,player.liangCards[i]);
                    cardNode.isCut = true;
                    cardNode.isLiang = true;
                    if (!cardNode.tag || cardNode.tag <= 0) cardNode.removeFromParent();
                }
                for(i = 0; i < CardCount; i++){
                    var cardNode = this.createCard(node, this.CsdDefaultCardType.EatCardBack, this.HandleCardType.Chi);
                    cardNode.isCut = true;
                    cardNode.isLiang = true;
                }
                cc.log(" needNewCard ",needNewCard);
                if (needNewCard) {
                    this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand);
                }
            }else{
                for(i = 0; i < CardCount; i++){
                    this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand);
                }
            }
        }
    }else if(player.mjhand){
        for (i = 0; i < player.mjhand.length; i++) {
            this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand, player.mjhand[i]);
        }
    }

    this.switchUpdate2DAnd3D(node);
};


/****************************************     3D相关   *******************************************************/
majiang_panel_xiaoGanKaiWuXing.prototype.getCardSortArray3D = function (node, newCardTag) {
    var tData = MjClient.data.sData.tData;
    var handArr = [], anGangArr = [], mingGangArr = [], pengArr = [], chiArr = [], laiZiArr = [], puCardsArr = [], huCardsArr = [],liangCardsArr = [];
    var children = node.children;
    var i, j, newCard = null;
    if(newCardTag > 0 ){
        this.newCardNode  = null;
    }
    for(i = 0; i < children.length; i++){
        var child = children[i];
        if(child.name == this.HandleCardType.Hand){
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
        }else if (child.name == this.HandleCardType.Chi && child.isCut) {
            liangCardsArr.push(child);
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
        }else if(child.name == this.HandleCardType.PuCard){
            puCardsArr.push(child);
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
    liangCardsArr = sortArray(liangCardsArr);

    if(newCard){
        handArr.push(newCard);
    }
    handArr = handArr.concat(liangCardsArr);
    laiZiArr.sort(function(a, b){
        return a.tag - b.tag;
    });
    for(i = 0;i < laiZiArr.length;i++){
        handArr.unshift(laiZiArr[i]);
    }
    var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
    var cardArray = [].concat(puCardsArr, anGangArr, mingGangArr, pengArr, chiArr, handArr);
    if(nodeIndex == 1 || nodeIndex == 2){
        cardArray.reverse();
    }
    return cardArray;
};

majiang_panel_xiaoGanKaiWuXing.prototype.updateDownEatAndHandCards3D = function (cardArray) {
    var tData = MjClient.data.sData.tData;
    var playerNode = cardArray[0].getParent();
    var templetEatCard = playerNode.getChildByName(this.CsdDefaultCardType.EatCardFront);
    var templetHandCard = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
    var player = this.getPlayerInfoByName(playerNode.getName());

    var cardIndex = 0, pengIndex = 0, gangIndex = 0, chiIndex = 0, huIndex = 0, anKeIndex = 0, children, i, k, child, add_x;
    var start_x = cardArray[0].getName() === this.HandleCardType.Hand ? cc.winSize.width * 0.05 : cc.winSize.width * 0.07;
    var handCount = this.getCardNodeCountByName(playerNode, this.HandleCardType.Hand);
    var isPlayAct = false;
    var laiZiPosSpace = this.getEatAndHandCardsLaiZiIconPosSpcae3D();
    var huanAfter = player.huanAfter ? player.huanAfter.slice() : [];
    var huanIconCount = 0;
    for(i = 0; i < cardArray.length; i++){
        var offSet_x = 0, offSet_y = 0;
        var cardNode = cardArray[i];
        cardNode.visible = true;
        if(cardNode.getName() === this.HandleCardType.Hand){
            if(huanIconCount < 3 && huanAfter.indexOf(cardNode.tag) > -1) {
                huanAfter.splice(huanAfter.indexOf(cardNode.tag), 1);
                var huanIcon = new ccui.ImageView("playing/yiChangXueLiuMaJiang/huan.png");
                huanIcon.setScale(1.5);
                huanIcon.setName("huanIcon");
                cardNode.addChild(huanIcon);
                huanIconCount ++;
            }
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
                if(child.getName() === "huanIcon"){
                    child.setPosition(cardNode.width * 0.75, cardNode.height * 0.71);
                }
            }

            if(cardArray[i - 1] && cardArray[i - 1].name != this.HandleCardType.Hand){
                var lastCardNode = cardArray[i - 1];
                if(cardArray[i - 1].name == this.HandleCardType.MingGang || cardArray[i - 1].name == this.HandleCardType.AnGang || cardArray[i - 1].name == this.HandleCardType.PengGang){
                    lastCardNode = cardArray[i - 2];
                }
                cardNode.x = lastCardNode.x + templetHandCard.getScale() * templetHandCard.width * 1.20;
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
        if(cardNode.name == this.HandleCardType.Chi && cardNode.isCut){
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
        }
        else if(cardNode.getName() == this.HandleCardType.MingGang || cardNode.getName() == this.HandleCardType.PengGang){
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
            }else if(gangIndex == 0) {
                if (cardIndex <= 6) {
                    cardNode.x = cardArray[i - 2].x * 0.99;
                } else {
                    cardNode.x = cardArray[i - 2].x;
                }
                offSet_y = 0.5;
            }
            else if(cardArray[i - 1] && cardArray[i - 1].getName() === this.HandleCardType.PuCard) {
                cardNode.x = cardArray[i - 1].x + cardArray[i - 1].getScale() * cardArray[i - 1].width;
            }
            else if(cardArray[i - 1] && cardArray[i - 1].getName() !== this.HandleCardType.MingGang && cardArray[i - 1].getName() != this.HandleCardType.PengGang){
                cardNode.x = cardArray[i - 2].x + cardArray[i - 2].getScale() * cardArray[i - 1].width;
            }
            else if(gangIndex === 1){
                cardNode.x = cardArray[i - 2].x + cardArray[i - 2].getScale() * cardArray[i - 1].width;
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

        }
        else if(cardNode.getName() == this.HandleCardType.AnGang){
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
            }else if(gangIndex == 0) {
                if(cardIndex < 6) {
                    cardNode.x = cardArray[i - 2].x * (0.97 + offSet_x);
                }else{
                    cardNode.x = cardArray[i - 2].x * (1 + offSet_x);
                }
            }
            else if(gangIndex == 1){
                cardNode.x = cardArray[i - 2].x + cardArray[i - 2].getScale() * cardArray[i - 1].width*0.9;
                if(cardArray[i - 1] && cardArray[i - 1].getName() === this.HandleCardType.PuCard) {
                    cardNode.x = cardArray[i - 1].x + cardArray[i - 1].getScale() * cardArray[i - 1].width*0.95;
                }
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

        }
        else if(cardNode.getName() == this.HandleCardType.Chi || cardNode.getName() == this.HandleCardType.Peng){
            cardIndex++;
            pengIndex++;
            pengIndex = pengIndex == 3 ? 0 : pengIndex;
            cardNode.loadTexture("playing/MJ3D/downCard/eat" + cardIndex + ".png");

            if(i == 0){
                cardNode.x = start_x;
            }else if(cardArray[i - 1].name != this.HandleCardType.Chi && cardArray[i - 1].name != this.HandleCardType.Peng && cardArray[i - 1].name != this.HandleCardType.PuCard){
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
        else if(cardNode.getName() === this.HandleCardType.PuCard){
            cardIndex++;
            anKeIndex++;
            cardNode.loadTexture("playing/MJ3D/downCard/eat" + cardIndex + ".png");
            if(i === 0) {
                cardNode.x = start_x;
            }else{
                if (anKeIndex % 3 == 1 && anKeIndex > 1) {
                    cardNode.x = cardArray[i - 1].x + templetEatCard.getScale() * templetEatCard.width * 1.3;
                }else{
                    cardNode.x = cardArray[i - 1].x + templetEatCard.getScale() * templetEatCard.width * 0.95;
                }
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
            if(child.getName() === "laiZi"){
                child.setPosition(child.x * 1.2,child.y * 1.05);
            }
            if(child.getName() === "arrow"){
                child.setSkewX(0);
            }
            if (child.getName() === "huIcon") {
                child.setPosition(cardNode.width * 0.5, cardNode.height * 0.3);
                child.setScale(1.3);
                child.setSkewX(0);
            }
        }
    }
};

majiang_panel_xiaoGanKaiWuXing.prototype.updateRightEatAndHandCards3D = function (cardArray) {
    var playerNode = cardArray[0].getParent();
    var templetEatCard = playerNode.getChildByName(this.CsdDefaultCardType.EatCardFront);
    var templetHandCard = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
    var player = this.getPlayerInfoByName(playerNode.getName());
    var handScale = templetHandCard.scale*0.85;
    var cardIndex = 0, pengIndex = 0, gangIndex = 0, handIndex = 0, chiIndex = 0, huIndex = 0, anKeIndex = 0, children, i, k, child;
    var handNodeArr = [];
    var liangCardsindex = 0;

    //根据分辨率计算左右两侧的倾斜度
    var ratio = cc.winSize.width / cc.winSize.height;
    var formatRatio = (1.78 / ratio) * 0.012;
    var offSet_scale = 0.98, distance_x = 0.12, angle_dis = formatRatio;
    var angle_x = handScale * 1.1 * templetHandCard.width;
    var start_y = cc.winSize.height * 0.33;
    var start_x = cc.winSize.width * 0.85;
    var startLiangCard_y = start_y;

    for(i = cardArray.length - 1;i >= 0;i--){
        var offSet_x = 0;
        var cardNode = cardArray[i];
        cardNode.visible = true;
        if(cardNode.name == this.HandleCardType.Hand){
            handNodeArr.push(cardNode);
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
        }else if (cardNode.name == this.HandleCardType.Chi && cardNode.isLiang) {
            start_x = cc.winSize.width * 0.792;
            if (cardNode.tag > 0) {
                cardNode.loadTexture("playing/MJ3D/common/1-8.png");
            }else{
                cardNode.loadTexture("playing/MJ3D/common/2-8.png");
            }
            distance_x = 0.12;
            if(i == cardArray.length - 1){
                cardNode.y = start_y;
            }
            cardIndex++;
            liangCardsindex ++;
            if(liangCardsindex == 1){
                cardNode.y = start_y;
                if (cardArray[i + 1] && cardArray[i + 1].name == this.HandleCardType.Hand) {
                    cardArray[i + 1].y = start_y - templetHandCard.height * handScale * 0.4;
                    start_x = cardArray[i + 1].x;
                }
            }else{
                cardNode.y = cardArray[i + 1].y + cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.5;
            }
        }else if (cardNode.name == this.HandleCardType.Chi && cardNode.isCut && !cardNode.isLiang){
            //倒牌
            start_x = cc.winSize.width * 0.75;
            cardIndex++;
            distance_x = 0.12;
            if (cardNode.tag > 0) {
                cardNode.loadTexture("playing/MJ3D/common/1-8.png");
            }else{
                cardNode.loadTexture("playing/MJ3D/common/2-8.png");
            }
            offSet_x = 0.1;
            if(cardArray[i + 1] && (cardArray[i + 1].name != this.HandleCardType.Chi ||
                (cardArray[i + 1].name == this.HandleCardType.Chi && !cardArray[i + 1].isCut)))
            {
                cardNode.y = startLiangCard_y * 0.8;
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

            if(cardArray[i + 1] && cardArray[i + 1].name != this.HandleCardType.Chi && cardArray[i + 1].name != this.HandleCardType.Peng && cardArray[i + 1].name !== this.HandleCardType.PuCard){
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
        else if(cardNode.name === this.HandleCardType.PuCard) {
            start_x = cc.winSize.width * 0.85;
            cardIndex++;
            anKeIndex++;
            if(i === cardArray.length - 1){
                cardNode.y = start_y;
            }

            cardNode.ignoreContentAdaptWithSize(true);
            cardNode.loadTexture("playing/MJ3D/common/2-8.png");

            if(i < cardArray.length - 1){
                if (anKeIndex % 3 == 1 && anKeIndex > 1) {
                    cardNode.y = cardArray[i + 1].y + cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.9;
                }else{
                    cardNode.y = cardArray[i + 1].y + cardArray[i + 1].getScale() * cardArray[i + 1].height * 0.5;
                }
            }
        }
        cardNode.zIndex = 100 + i;
        cardNode.ignoreContentAdaptWithSize(true);
        cardNode.setScale(templetEatCard.scale * 1.2 * 3 * (Math.pow(offSet_scale, cardIndex)));
        cardNode.setPositionX(start_x * (1 - cardIndex * angle_dis + distance_x + offSet_x));
        cc.log(" ")

        children = cardNode.children;
        for(k = 0; k < children.length; k++){
            child = children[k];
            if (child.ignoreContentAdaptWithSize) {
                child.ignoreContentAdaptWithSize(true);
            }
            child.setScale(0.39);
            child.setPosition(cardNode.width * 0.56, cardNode.width * 0.55);
            child.setSkewY(20);

            if (child.getName() === "huIcon") {
                child.setPosition(cardNode.width * 0.8, cardNode.height * 0.66);
                child.setSkewY(0);
                child.setScale(1.3);
            }

            if(child.getName() == "arrow"){
                var angle = child.getRotation() % 360;
                if(angle == 0 || angle == 180) child.setSkewY(0);
            }
        }
    }

    var isPlayAct = false;
    if(player.isNew && handNodeArr.length > 0){
        var firstCard = handNodeArr[handNodeArr.length - 1];
        var firstCardX = firstCard.x - firstCard.scale * firstCard.width * 0.09;
        var firstCardY = firstCard.y + firstCard.scale * firstCard.height * 0.18;
        isPlayAct = this.playNewCardAction("node_right", firstCard, cc.p(firstCardX, firstCardY));
        if (!isPlayAct) {
            firstCard.x = firstCardX;
            firstCard.y = firstCardY;
        }
    }
};

majiang_panel_xiaoGanKaiWuXing.prototype.updateTopEatAndHandCards3D = function (cardArray) {
    var playerNode = cardArray[0].getParent();
    var templetEatCard = playerNode.getChildByName(this.CsdDefaultCardType.EatCardFront);
    var player = this.getPlayerInfoByName(playerNode.getName());

    var cardIndex = 0, pengIndex = 0, gangIndex = 0, handIndex = 0, chiIndex = 0, puCardIndex = 0, huIndex = 0, children, i, k, child, oneCardWith;
    var start_x = cc.winSize.width * (this.isIPad() ? 0.77 : 0.74);
    var handNodeArr = [];
    var liangCardsindex = 0;
    var startLiang_x = start_x;

    var setCardSpirteTop = function (cardNode, index) {
        var index_nor = index;
        if(index <= 0) index_nor = 1;
        if(index >= 12) index_nor = 12;
        if (cardNode.tag > 0) {
            cardNode.loadTexture("playing/MJ3D/top/top" + (13 - index_nor) + ".png");
        }else{
            cardNode.loadTexture("playing/MJ3D/top/top5-1.png");
        }
    };

    //计算当前的手牌张数
    var currentHandCount = 0;
    for (i = cardArray.length - 1;i >= 0;i--) {
        if(cardArray[i] && cardArray[i].getName() === this.HandleCardType.Hand) {
            currentHandCount++;
        }
    }

    //如果是轮到自己出牌，排除新摸的这张牌，这张牌另外固定放置位置，防止整个手牌位置移来移去的
    if(currentHandCount % 3 === 2) {
        currentHandCount -= 1;
    }

    for (i = cardArray.length - 1; i >= 0; i--) {
        var cardNode = cardArray[i];
        cardNode.visible = true;
        if (cardNode.getName() === this.HandleCardType.Hand) {
            handNodeArr.push(cardNode);
            if (oneCardWith === undefined) {
                oneCardWith = cardNode.getScale() * cardNode.width * 0.82;
            }

            handIndex++;
            if(handIndex === 1){
                var handStartX = cc.winSize.width * (this.isIPad()? 0.3 : 0.37) + oneCardWith * currentHandCount;
                //优化手牌排列方式，根据当前的牌的张数来显示,从左对齐
                cardNode.x = handStartX;
                if (cardArray[i + 1] && cardArray[i + 1].name == this.HandleCardType.Chi) {
                    cardNode.x = cardArray[i + 1].x - oneCardWith;
                }

            }else{
                cardNode.x = cardArray[i + 1].x - oneCardWith * 0.98;
            }
            cardNode.y = cc.winSize.height * 0.93;
            startLiangCard_x = cardNode.x;
            continue;
        }else if (cardNode.name === this.HandleCardType.Chi && cardNode.isLiang) {
            cardIndex++;
            liangCardsindex ++;
            //最右边的那张牌
            if (liangCardsindex === 1){
                cardNode.x = startLiang_x;
                if (true) {}
            }else{
                cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.7;
            }
            cardNode.y = templetEatCard.y;
            setCardSpirteTop(cardNode, cardIndex);

        }else if (cardNode.name === this.HandleCardType.Chi && cardNode.isCut && !cardNode.isLiang) {
            cardIndex++;
            //最右边的那张牌
            if (cardIndex === 1){
                cardNode.x = start_x * 0.75;
            }
            cardNode.y = templetEatCard.y;
            setCardSpirteTop(cardNode, cardIndex);
            if(cardArray[i + 1] && (cardArray[i + 1].name !== this.HandleCardType.Chi ||
                (cardArray[i + 1].name === this.HandleCardType.Chi && !cardArray[i + 1].isCut)))
            {
                cardNode.x = cardArray[i + 1].x -  cardArray[i + 1].getScale() * cardArray[i + 1].width * 1.1;
            }else if(player.mjhand && player.mjhand.length % 3 === 2 && i === 0 && player.isZiMo){
                cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width;
            }else  if(i < cardArray.length - 1 && cardIndex !== 1){
                cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.7;
            }
        } else if (cardNode.getName() === this.HandleCardType.MingGang || cardNode.getName() === this.HandleCardType.PengGang) {
            gangIndex++;
            gangIndex = gangIndex === 4 ? 0 : gangIndex;
            if(gangIndex === 1){

            }else{
                cardIndex++;
            }
            setCardSpirteTop(cardNode, cardIndex);
            cardNode.y = templetEatCard.y;
            //最右边的那张牌
            if(cardIndex === 1){
                cardNode.x = start_x;
            }

            if(cardArray[i + 1] && cardArray[i + 1].name !== this.HandleCardType.MingGang && cardArray[i + 1].name !== this.HandleCardType.PengGang){
                cardNode.x = cardArray[i + 1].x -  cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.2;
                startLiang_x = cardNode.x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.95;
            }else  if(i < cardArray.length - 1 && cardIndex != 1){
                if(gangIndex === 1){
                    cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.3;
                    startLiang_x = cardNode.x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.95;
                }else{
                    cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.7;
                    startLiang_x = cardNode.x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.95;
                }
            }

            if(cardNode.getChildByName("arrow")){
                cardNode.removeChildByName("arrow");
            }
            if(gangIndex === 0){
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
                 startLiang_x = cardNode.x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.95;
            }else  if(i < cardArray.length - 1 && cardIndex != 1){
                if(gangIndex == 1) {
                    cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.2;
                     startLiang_x = cardNode.x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.95;
                }else{
                    cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.7;
                     startLiang_x = cardNode.x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.95;
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
        } else if (cardNode.name === this.HandleCardType.Peng || cardNode.name === this.HandleCardType.Chi) {
            cardIndex++;
            pengIndex++;
            pengIndex = pengIndex == 3 ? 0 : pengIndex;
            //最右边的那张牌
            if(cardIndex == 1){
                cardNode.x = start_x;
            }

            setCardSpirteTop(cardNode, cardIndex);

            if(cardArray[i + 1] && cardArray[i + 1].name != this.HandleCardType.Chi && cardArray[i + 1].name != this.HandleCardType.Peng && cardArray[i + 1].name != this.HandleCardType.PuCard){
                cardNode.x = cardArray[i + 1].x -  cardArray[i + 1].getScale() * cardArray[i + 1].width * 1.1;
                startLiang_x = cardNode.x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.95;
            }else  if(i < cardArray.length - 1 && cardIndex != 1){
                if(pengIndex == 1){
                    cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 1.1;
                    startLiang_x = cardNode.x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.95;
                }else {
                    cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.7;
                    startLiang_x = cardNode.x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.95;
                }
            }
            if(cardNode.getName() == this.HandleCardType.Chi){
                chiIndex++;
            }
            if(pengIndex == 2){
                this.setCardArrow3D(cardNode, player, chiIndex);
            }
        } else if(cardNode.name === this.HandleCardType.PuCard) {
            cardIndex ++;
            puCardIndex++;
            cardNode.x = start_x;
            cardNode.y = cc.winSize.height * 0.92;

            if(puCardIndex % 3 == 1){
                cardNode.loadTexture("playing/MJ3D/top/top8-1.png");
            }else if(puCardIndex % 3 == 2){
                cardNode.loadTexture("playing/MJ3D/top/top8-1.png");
            }else if(puCardIndex % 3 == 0){
                cardNode.loadTexture("playing/MJ3D/top/top5-1.png");
            }

            if((cardArray[i + 1] && cardArray[i + 1].name !== this.HandleCardType.PuCard) || (puCardIndex % 3 == 1 && puCardIndex > 1)){
                cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.95;
            }else if(i < cardArray.length - 1 && cardIndex !== 1){
                cardNode.x = cardArray[i + 1].x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.7;
                startLiang_x = cardNode.x - cardArray[i + 1].getScale() * cardArray[i + 1].width * 0.95;
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
            if (cardIndex === 0) {
                skewValue = skewArray[1];
            }

            try{
                child.setSkewX(skewValue);
            }catch(e){
                cc.log(" warning error : " + e);
            }

            if (child.getName() === "arrow") {
                child.setSkewX(0);
            }

            if (child.getName() === "huIcon") {
                child.setPosition(cardNode.width * 0.6, cardNode.height * 0.25);
                child.setSkewY(0);
                child.setScale(0.8);
            }
        }
    }

    // 新牌隔开
    var isPlayAct = false;
    if(player.isNew && handNodeArr.length > 0){
        var firstCard = handNodeArr[handNodeArr.length - 1];
        var cardWith = firstCard.scale * firstCard.width;
        var firstCardX = firstCard.x - cardWith * 0.5;
        var firstCardY = firstCard.y;
        isPlayAct = this.playNewCardAction("node_top", firstCard, cc.p(firstCardX, firstCardY));
        if (!isPlayAct) {
            firstCard.x = firstCardX;
            firstCard.y = firstCardY;
        }
    }
};

majiang_panel_xiaoGanKaiWuXing.prototype.updateLeftEatAndHandCards3D = function (cardArray) {
    var playerNode = cardArray[0].getParent();
    var templetEatCard = playerNode.getChildByName(this.CsdDefaultCardType.EatCardFront);
    var templetHandCard = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
    var player = this.getPlayerInfoByName(playerNode.getName());

    var cardIndex = 0, pengIndex = 0, gangIndex = 0, handIndex = 0, chiIndex = 0, huIndex = 0, cutDownIndex = 0, anKeIndex = 0;
    var i, k, child, children;
    var liangCardsindex = 0;

    //根据分辨率计算左右两侧的倾斜度
    var ratio = cc.winSize.width / cc.winSize.height;
    var formatRatio = (1.78 / ratio) * 0.038;
    var offSet_scale = 1.02, distance_x = -0.25, angle_dis =  formatRatio;

    var handNodeArr = [];
    var handScale = templetHandCard.scale * 0.85;
    var angle_x = handScale * 1.1 * templetHandCard.width;
    var angle_y = handScale * 1.1 * templetHandCard.height;
    var start_y = cardArray[0].getName() === this.HandleCardType.Hand ? cc.winSize.height * 0.785 : cc.winSize.height * 0.83;
    var start_x = cc.winSize.width * 0.215;
    var startLiangCard_y = start_y;

    for(i = 0; i < cardArray.length; i++){
        var offSet_x = 0;
        var cardNode = cardArray[i];
        cardNode.visible = true;
        cc.log(" cardNode",cardNode.name);
        if(cardNode.name === this.HandleCardType.Hand){
            handIndex++;
            handNodeArr.push(cardNode);
            if(!cardArray[i - 1] || cardArray[i - 1].name !== this.HandleCardType.Hand){
                cardNode.y = start_y;
            }else{
                cardNode.y = cardArray[i - 1].y -  cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.41;
            }

            cardNode.setScale(handScale * 1.1 * 1.8 * (1 + handIndex * 0.01));
            cardNode.setPositionX(start_x - handIndex * angle_x * 0.2);
            cardNode.ignoreContentAdaptWithSize(true);

            cardNode.zIndex = 100 + i;
            startLiangCard_y = cardNode.y;
            continue;
        }
        else if (cardNode.name === this.HandleCardType.Chi && cardNode.isLiang) {
            cutDownIndex++;
            cardNode.zIndex = cutDownIndex;
            liangCardsindex ++;
            if(liangCardsindex == 1){
                cardNode.y = start_y;
                if (cardArray[i - 1] && cardArray[i - 1].name == this.HandleCardType.Hand) {
                    cardArray[i - 1].y = start_y + templetHandCard.height * handScale * 1.4;
                }
            }else{
                cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.5;
            }

            cardNode.ignoreContentAdaptWithSize(true);
            cardNode.setScale(handScale * 2 * (Math.pow(offSet_scale, cutDownIndex)));
            cardNode.setPositionX(start_x - cutDownIndex * angle_x * 0.25);
            if (cardNode.tag > 0) {
                cardNode.loadTexture("playing/MJ3D/common/1-1.png");
            }else{
                cardNode.loadTexture("playing/MJ3D/common/2-1.png");
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
            }
            continue;

        }else if(cardNode.name === this.HandleCardType.Chi && cardNode.isCut && !cardNode.isLiang){
            cutDownIndex++;
            cardNode.zIndex = cutDownIndex;
            if(i == 0){
                cardNode.y = start_y * 0.9;
            }else{
                if(cardArray[i - 1].name != this.HandleCardType.Chi ||
                    (cardArray[i - 1].name == this.HandleCardType.Chi && !cardArray[i - 1].isCut))
                {
                    cardNode.y = startLiangCard_y;
                }else if(player.mjhand && player.mjhand.length % 3 == 2 && i == cardArray.length - 1 && player.isZiMo == true){
                    cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.8;
                }else {
                    cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.5;
                }
            }
            cardNode.ignoreContentAdaptWithSize(true);
            cardNode.setScale(handScale * 2 * (Math.pow(offSet_scale, cutDownIndex)));
            cardNode.setPositionX(start_x - cutDownIndex * angle_x * 0.25);
            if (cardNode.tag > 0) {
                cardNode.loadTexture("playing/MJ3D/common/1-1.png");
            }else{
                cardNode.loadTexture("playing/MJ3D/common/2-1.png");
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
            }
            continue;
        }
        else if(cardNode.name === this.HandleCardType.MingGang || cardNode.name === this.HandleCardType.PengGang){
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
                cardNode.y = cardArray[i - 1].y - angle_y * 0.7;
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

        }
        else if(cardNode.name === this.HandleCardType.AnGang){
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
        else if(cardNode.name === this.HandleCardType.Chi || cardNode.name === this.HandleCardType.Peng){
            cardIndex++;
            pengIndex++;
            cardNode.zIndex = cardIndex;
            if(i == 0){
                cardNode.y = start_y;
            }else{
                if(cardArray[i - 1].name != this.HandleCardType.Peng && cardArray[i - 1].name != this.HandleCardType.Chi && cardArray[i - 1].name != this.HandleCardType.PuCard)
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
        else if(cardNode.name === this.HandleCardType.PuCard) {
            cardIndex++;
            anKeIndex++;
            cardNode.zIndex = cardIndex;
            if(i === 0){
                cardNode.y = start_y;
            }else{ 
                if (anKeIndex % 3 == 1 && anKeIndex > 1) {
                    cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.8;
                }else{
                    cardNode.y = cardArray[i - 1].y - cardArray[i - 1].getScale() * cardArray[i - 1].height * 0.5;
                }
            }

            cardNode.ignoreContentAdaptWithSize(true);
            cardNode.loadTexture("playing/MJ3D/common/2-1.png");
        }

        cardNode.setScale(templetEatCard.scale * 1.2 * 2.6 * (Math.pow(offSet_scale, cardIndex)));
        var iphonXX =  this.isIPhoneX() ? cc.winSize.width * 0.015 : 0; //iphone x 的位置优化
        cardNode.setPositionX(start_x * (1 - cardIndex * angle_dis +  distance_x + offSet_x) + iphonXX);

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

            if (child.getName() === "huIcon") {
                child.setPosition(cardNode.width * 0.2, cardNode.height * 0.7);
                child.setSkewY(0);
                child.setScale(1.3);
            }
        }

    }

    // 新牌隔开
    var isPlayAct = false;
    if(player.isNew && handNodeArr.length > 0){
        cc.log("handNodeArr ",handNodeArr.length);
        var lastCard = handNodeArr[handNodeArr.length - 1];
        var lastCardX = lastCard.x - lastCard.scale * lastCard.width * 0.09;
        var lastCardY = lastCard.y - lastCard.scale * lastCard.height * 0.4;
        lastCard.zIndex += 100 + cardArray.length;
        isPlayAct = this.playNewCardAction("node_left", lastCard, cc.p(lastCardX, lastCardY));
        if (!isPlayAct) {
            lastCard.x = lastCardX;
            lastCard.y = lastCardY;
        }
    }
};

/****************************************     2D相关   *******************************************************/
majiang_panel_xiaoGanKaiWuXing.prototype.getCardSortArray2D = function(node, newCardTag){
    var tData = MjClient.data.sData.tData;
    var handArr = [], anGangArr = [], mingGangArr = [], pengGangArr = [],pengArr = [], chiArr = [], laiZiArr = [], puCardsArr = [];
    var children = node.children;
    var i, j, newCard = null;
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
        }else if(child.name == this.HandleCardType.PuCard){
            puCardsArr.push(child);
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

    if(this.getNodeIndexDefaultByName(node.getName()) === 1){
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
    return [].concat(puCardsArr, anGangArr, mingGangArr, pengGangArr,pengArr, chiArr, handArr);
};

majiang_panel_xiaoGanKaiWuXing.prototype.updateCardPosition2D = function(node, sortArr) {
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

    var player = this.getPlayerInfoByName(nodeName);
    var huanAfter = player.huanAfter ? player.huanAfter.slice() : [];
    var dir = this.getDirectByNodeIndex(nodeIndex);
    var huanIconCount = 0;
    for(var i = 0;i < sortArr.length;i++){
        var cardNode = sortArr[i];
        cardNode.visible = true;
        cardNode.zIndex = 100 + (nodeIndex != 1 ? i : sortArr.length - i);

        var add_offSet = this.getMoveDistance2D(node, sortArr, i, chiFirstIndex);
        add_offSet *= dir;

        //自己视角下有吃碰牌时胡牌倒牌的手牌与吃碰牌的距离
        if (hasCutDownDis && nodeIndex == 0 && sortArr[i].name == this.HandleCardType.Chi && sortArr[i].isCut) {
            hasCutDownDis = false;
            start_x += 2.5 * add_offSet;
        }

        if(nodeIndex % 2 == 0){
            start_y = cardNode.name == this.HandleCardType.Hand ? handCard.y : eatFrontCard.y;
            start_x += add_offSet;
        }else{
            start_x = cardNode.name == this.HandleCardType.Hand ? handCard.x : eatFrontCard.x;
            start_y += add_offSet;
        }

        //添加换的标签
        if(cardNode.name === this.HandleCardType.Hand) {
            if(huanIconCount < 3 && huanAfter.indexOf(cardNode.tag) > -1) {
                huanAfter.splice(huanAfter.indexOf(cardNode.tag), 1);
                var huanIcon = new ccui.ImageView("playing/yiChangXueLiuMaJiang/huan.png");
                huanIcon.setScale(1.5);
                huanIcon.setPosition(cardNode.getContentSize().width*0.8,cardNode.getContentSize().height*0.65);
                huanIcon.setName("huanIcon");
                cardNode.addChild(huanIcon);
                huanIconCount++;
            }
        }
        
        this.switchUpdate2D(node, sortArr, cc.p(start_x, start_y), i, chiFirstIndex);
    }
};

majiang_panel_xiaoGanKaiWuXing.prototype.switchUpdate2D = function(node, sortArr, pos, index, chiFirstIndex){
    var cardNode = sortArr[index];
    if(cardNode.getName() === this.HandleCardType.Chi && cardNode.isCut){
        this.setHandPosition2D(node, sortArr, pos, index);
    }else if(cardNode.getName() === this.HandleCardType.AnGang){
        this.setAnGangPosition2D(node, sortArr, pos, index);
    }else if(cardNode.getName() === this.HandleCardType.MingGang ){
        this.setMingGangPosition2D(node, sortArr, pos, index);
    }else if(cardNode.getName() === this.HandleCardType.PengGang ){
        this.setPengGangPosition2D(node, sortArr, pos, index);
    }else if(cardNode.getName() === this.HandleCardType.Peng){
        this.setPengPosition2D(node, sortArr, pos, index);
    }else if(cardNode.getName() === this.HandleCardType.Chi){
        this.setChiPosition2D(node, sortArr, pos, index, chiFirstIndex);
    }else if(cardNode.getName() === this.HandleCardType.PuCard){
        this.setPuPosition2D(node, sortArr, pos, index, chiFirstIndex);
    }else if(cardNode.getName() === this.HandleCardType.Hand){
        cardNode.stopAllActions();
        this.setHandPosition2D(node, sortArr, pos, index);
    }
};

majiang_panel_xiaoGanKaiWuXing.prototype.setHandPosition2D = function(node, cardArr, pos, index) {
    var cardNode = cardArr[index];
    var nextCard = cardArr[index + 1];
    var lastCard = cardArr[index - 1];
    var isPlayAct = false;
    if((!nextCard && lastCard && (lastCard.name != cardNode.name || index == cardArr.length - 1))){
        var tData = MjClient.data.sData.tData;
        var nodeName = node.getName();
        var player = this.getPlayerInfoByName(nodeName);
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

majiang_panel_xiaoGanKaiWuXing.prototype.setPuPosition2D = function(node, cardArr, pos, index, chiFirstIndex){
    var cardNode = cardArr[index];
    cardNode.setPosition(pos);
};

/**
 *  处理麻将明杠
 **/
majiang_panel_xiaoGanKaiWuXing.prototype.dealMingGang = function(playerNode, msg) {
    var gangCard = msg.card;
    var sData = MjClient.data.sData;
    var player = sData.players[msg.uid];
    if (MjClient.rePlayVideo != -1 || playerNode.getName() == "node_down") {
        if (player && player.anKe && player.anKe.indexOf(gangCard) >= 0) {
            this.removeCard(playerNode, this.HandleCardType.PuCard, gangCard, 3);
        }else{
            this.removeCard(playerNode, this.HandleCardType.Hand, gangCard, 3);
        }
    } else {
        if (player && (!player.anKeNum || player.anKeNum <= 0)) {
            this.removeCard(playerNode, this.HandleCardType.PuCard, null, 3);
        }else{
            this.removeCard(playerNode, this.HandleCardType.Hand, null, 3);
        }
    }

    for (var i = 0; i < 4; i++) {
        this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.MingGang, gangCard); 
    }

    this.resetCardLayout(playerNode);
    this.showEatActionAnim(playerNode, this.AnimationType.GANG);
};

/**
 *  处理麻将暗杠
 **/
majiang_panel_xiaoGanKaiWuXing.prototype.dealAnGang = function(playerNode, msg) {
    var gangCard = msg.card;
    var sData = MjClient.data.sData;
    var player = sData.players[msg.uid];
    if (MjClient.rePlayVideo != -1 || playerNode.getName() == "node_down") {
        if (player && player.anKe && player.anKe.indexOf(gangCard) >= 0) {
            this.removeCard(playerNode, this.HandleCardType.PuCard, gangCard, 3);
            this.removeCard(playerNode, this.HandleCardType.Hand, gangCard, 1);
        }else{
            this.removeCard(playerNode, this.HandleCardType.Hand, gangCard, 4);
        }
    } else {
        cc.log(" player.anKe ",player.anKe,gangCard);
        if (player && (!player.anKeNum || player.anKeNum <= 0)) {
            this.removeCard(playerNode, this.HandleCardType.PuCard, null, 3);
            this.removeCard(playerNode, this.HandleCardType.Hand, null, 1);
        }else{
            this.removeCard(playerNode, this.HandleCardType.Hand, null, 4);
        }
    }

    for (var i = 0; i < 4; i++) {
        this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.AnGang, gangCard);
    }

    this.resetCardLayout(playerNode);
    this.showEatActionAnim(playerNode, this.AnimationType.GANG);
};
majiang_panel_xiaoGanKaiWuXing.prototype.showMjhandBeforeEndOne3D = function(nodeName){
    var player = this.getPlayerInfoByName(nodeName);
    if (!player || !player.mjhand || MjClient.rePlayVideo !== -1) return;
    //删除手牌，重新添加手牌(以吃牌作为模板，然后重新刷新)
    var playerNode = this.getNodeByName(nodeName);
    this.removeCardsByName(playerNode, this.HandleCardType.Hand);
    this.removeCutCards(playerNode);

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
majiang_panel_xiaoGanKaiWuXing.prototype.showMjhandBeforeEndOne2D = function(playerNodeName) {
    var playerNode = this.getNodeByName(playerNodeName);
    var player = this.getPlayerInfoByName(playerNodeName);
    if (!playerNode || !player || !player.mjhand || MjClient.rePlayVideo !== -1) {
        return;
    }
    this.removeCardsByName(playerNode, this.HandleCardType.Hand);
    this.removeCutCards(playerNode);
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
majiang_panel_xiaoGanKaiWuXing.prototype.removeCutCards = function(node) {
    var children = node.children;
    for(var i = 0;i < children.length;i++){
        var child = children[i];
        if(child.getName() == this.HandleCardType.PuCard || (child.getName() == this.HandleCardType.Chi && child.isCut)){
            child.removeFromParent(true);
        }
    }
};
majiang_panel_xiaoGanKaiWuXing.prototype.dealTing = function(playerNode, msg) {
    this.showEatActionAnim(playerNode, this.AnimationType.Liang);
    var animateNode = playerNode.getChildByName("node_animation");
    var nodeName = playerNode.getName();
    var callback = function (){
        animateNode.visible = false;
    };
    var scaleTo = 0.7;
    var scaleTo2= 0.5;
    var delayTime = 0.8;
    var projNode = new cc.Sprite("playing/xiaoGanKaWuXing/liang.png");
    projNode.setScale(0.0);
    projNode.runAction(cc.sequence(cc.scaleTo(0.2, scaleTo), cc.scaleTo(0.3, scaleTo2)) );

    animateNode.visible = true;
    animateNode.removeAllChildren();
    animateNode.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
    animateNode.addChild(projNode);
};
majiang_panel_xiaoGanKaiWuXing.prototype.getIsZhongBird = function(cd){
    return false;
};