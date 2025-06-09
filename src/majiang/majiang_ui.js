/******************************************************
 *			       游戏UI相关方法					  *
 *		          add by zhenggang 					  *
 *			          2019.3.8						  *
 ******************************************************/

/**
 *  根据off获得player信息
 *  非UI节点下获得自己的信息使用这个方法
 *  off: 节点偏移
 *  return {Object}
 **/
majiang_panel.prototype.getPlayerInfoByOff = function(off){
    var sData = MjClient.data.sData;
    off = off === undefined ? 0 : off;
    if (off >= Object.keys(sData.players).length){
        return null;
    }
    var nodeName = this.NodeNameArray[off];
    return this.getPlayerInfoByName(nodeName);
};

/**
 *  根据节点名字获得对应的player信息
 *  尽量根据nodeName获得玩家数量(不需要针对不同的玩家转化off值，在initGameData中设置好对应的值即可)
 *  nodeName: 节点名
 *  return {Object}
 **/
majiang_panel.prototype.getPlayerInfoByName = function(nodeName){
    var offIndex = this.getIndexWithSelfByName(nodeName);
    var sData = MjClient.data.sData;
    var uids = sData.tData.uids;
    return sData.players[uids[offIndex]];
};

/**
 *  相对于自己，nodeName对应的off
 **/
majiang_panel.prototype.getIndexWithSelfByName = function(nodeName){
    var nodeIndex = this.getNodeIndexByName(nodeName);
    var selfIndex = this.getUidIndex(this.getSelfUid());
    var maxPlayer = this.getMaxPlayer();
    var offIndex = (nodeIndex + selfIndex) % maxPlayer;
    return offIndex;	
};

/**
 *	根据节点名字获得节点偏移量off(实际方位节点数)
 *	return {Number}
 **/
majiang_panel.prototype.getNodeIndexByName = function(nodeName){
	var nodeIndex = this.NodeNameArray.indexOf(nodeName);
	return nodeIndex;
};

/**
 *	根据节点名字获得节点偏移量off(4个方位节点数)
 *	return {Number}
 **/
majiang_panel.prototype.getNodeIndexDefaultByName = function(nodeName){
	var nodeIndex = this.DefaultNodeNameArray.indexOf(nodeName);
	return nodeIndex;	
};

/**
 *  根据uidIndex获得该玩家对应的结点
 **/
majiang_panel.prototype.getUIBind = function(uidIndex) {
    var uid = MjClient.data.sData.tData.uids[uidIndex];
    var uiOff = this.getOffIndexWithSelf(uid);

    return this.getNodeByOff(uiOff);
};

/**
 *  根据玩家uid获得该玩家对应的结点
 **/
majiang_panel.prototype.getNodeByUid = function (uid) {
    var nodeNameArr = this.NodeNameArray;
    for(var i = 0; i < nodeNameArr.length; i++) {
        var player = this.getPlayerInfoByName(nodeNameArr[i]);
        if(player && player.info.uid === uid){
            return this.getNodeByName(nodeNameArr[i]);
        }
    }
};


/**
 *  根据uidIndex获得该玩家对应的结点的名称
 **/
majiang_panel.prototype.getNodeNameByIndex = function(uidIndex) {
    return this.getUIBind(uidIndex).getName();
};

/**
 *  根据off获得对应的节点
 *  off: 相对于down的偏移量
 *  return {node(down、right、top、left)}
 **/
majiang_panel.prototype.getNodeByOff = function(off){
    off = off === undefined ? 0 : off;
    var nodeName = this.NodeNameArray[off];
    return this.getNodeByName(nodeName);
};

/**
 *  根据name获得节点
 *  name: 节点名
 *  return {node}
 **/
majiang_panel.prototype.getNodeByName = function(nodeName){
    for(var i = 0;i < this.playerNodeArr.length;i++){
    	var playerNode = this.playerNodeArr[i];
    	if(playerNode.getName() == nodeName){
    		return playerNode;
    	}
    }
    return null;
};

/**
 *  设置麻将背景
 *  is3DTo2D:是否使用3D资源，2D排版
 **/
majiang_panel.prototype.setCardSprite = function(cardNode, cardTag, is3DTo2D){
    var is3D = this.is3DStyle();
    if(is3D && !is3DTo2D){
        this.setCardSprite3D(cardNode, cardTag);
    }else{
        this.setCardSprite2D(cardNode, cardTag);
    }
};

/**
 *  刷新吃、碰、杠、手牌
 **/
majiang_panel.prototype.resetCardLayout = function(node){
    var is3D = this.is3DStyle();
    if(is3D){
        this.resetCardLayout3D(node);
    }else{
        this.resetCardLayout2D(node);
    }
    // this.initCardTouchData();
};

/**
 *  刷新打出的牌
 **/
majiang_panel.prototype.resetPutCards = function(node){
    if(!this.isInGame()){
        return;
    }
    //fix by lixu   出牌层级设置后再查找最后打的牌
    var callback = function(){
        this.setLastPutCardNode();
        this.addPutCardTip();
    };
    var is3D = this.is3DStyle();
    if(is3D){
        this.resetPutCards3D(node, callback.bind(this));
    }else{
        this.resetPutCards2D(node, callback.bind(this));
    }  
};

/**
 *  刷新麻将背景
 **/
majiang_panel.prototype.updateAfterChangeMjBg = function(cardNode, mjBgType, nodeIndex){
    var is3D = this.is3DStyle();
    if(is3D){
        this.updateAfterChangeMjBg3D(cardNode, mjBgType);
    }else{
        this.updateAfterChangeMjBg2D(cardNode, mjBgType, nodeIndex);
    }
};

/**
 *  添加打出去的牌
 **/
majiang_panel.prototype.addPutCard = function(cardNode, callback, isPut){
    this.lastPutCardNode = cardNode;
    var is3D = this.is3DStyle();
    if(is3D){
        this.addPutCard3D(cardNode, callback, isPut);
    }else{
        this.addPutCard2D(cardNode, callback, isPut);
    }   
};

/**
 *  刷新多个吃杠的牌
 **/
majiang_panel.prototype.updateChiGangCards = function(cardNode, cardTag){
    var is3D = this.is3DStyle();
    if(is3D){
        this.updateChiGangCards3D(cardNode, cardTag);
    }else{
        this.setCardSprite2D(cardNode, cardTag);
    }      
};

/**
 *  吃碰杠之后的处理
 **/
majiang_panel.prototype.handlerAfterChiPengGang = function(cardNode){
    //根据情况是否需要分2 3D处理
};

/**
 *  修改游戏背景
 *  bgImg: 游戏背景  bgType: 背景类型
 *  return {void}
 **/
majiang_panel.prototype.changeGameBackGround = function(bgImg, bgType){
    bgType = bgType === undefined ? this.getGameBgType() : bgType;
    var bgList = this.getGameBgList(this.is3DStyle());
    var file = bgList[bgType];
    if(!file){
        file = bgList[0];
    }
    bgImg.loadTexture(file);
};

/**
 *  判断是否是需要换背景的麻将
 **/
majiang_panel.prototype.isMaJiangValid = function(cardName){
    for (var type in this.HandleCardType) {
        if (this.HandleCardType[type] === cardName) {
            return true;
        }
    }
};

/**
 *  是否准备
 *  return {Boolean}
 **/
majiang_panel.prototype.isReady = function(nodeNme){
    if (!this.isTableFull()){
        return false;
    }

    var tData = MjClient.data.sData.tData;
    var pl = this.getPlayerInfoByName(nodeNme);
    if (pl && pl.mjState === TableState.isReady && tData.tState != TableState.waitJoin){
        return true;
    }
    return false;
};

/**
 *	隐藏吃、碰、杠等操作按钮
 *	return {void}
 **/
majiang_panel.prototype.hideEatNodeChildren = function(){
	var eatArr = MjClient.playui.jsBind.node_eat;
	for(var key in eatArr){
        if(eatArr[key]._node)
		  eatArr[key]._node.setVisible(false);
	}
};

majiang_panel.prototype.resetCardName = function(dirctionNode, copyNodeName){
    if(MjClient.rePlayVideo != -1 && copyNodeName == this.CsdDefaultCardType.HandCard && dirctionNode.getName() != "node_down"
        && dirctionNode.getName() != "layout_infoData"){ // 小结算不更改名字
        copyNodeName = this.CsdDefaultCardType.PutCardOne;
    }
    return copyNodeName;  
};

/**
 *	获得新牌
 *	directionNode: 方位节点(node_down、node_top等)
 *	copyNodeName: 要复制节点的名字(img_handCard)
 *	cardName、cardTag
 *  is3DTo2D:是否是使用3D资源，然后使用2D排版
 **/
majiang_panel.prototype.createCard = function (dirctionNode, copyNodeName, cardName, cardTag, is3DTo2D){
    copyNodeName = this.resetCardName(dirctionNode, copyNodeName);

    var copyNode = dirctionNode.getChildByName(copyNodeName);
    var cardNode = util.clone(copyNode);
    cardNode.visible = true;
    cardNode.name = cardName;
    dirctionNode.addChild(cardNode);
    if(!dirctionNode.hasOwnProperty("countUp")){
        dirctionNode["countUp"] = 0;
    }

    //每个玩家节点增加一个计数器，每个麻将新家之后,计数器加一
    dirctionNode.countUp += 1;
    cardNode.upIdx = dirctionNode.countUp;


    if(cardTag > 0){
        //创建一个带有麻将信息的麻将 cp为创建后的麻将
        cardNode.tag = cardTag;
        this.setCardSprite(cardNode, cardTag, is3DTo2D);
        if(cardName == this.HandleCardType.Hand && !this.setLaiZiColor(cardNode)){
            this.setTouchCardHandler(copyNode, cardNode);
        }
    }else{
        cardNode.tag = 0;
        if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb() ) {
            cardNode.loadTexture(copyNode._textureFile);
        } else {
            this.updateAfterChangeMjBg(cardNode);
        }
    }

    return cardNode;
};


/**
 *  针对癞子牌的处理
 *  设置癞子牌的颜色，是否能打出(直接设置不能点击)
 **/
majiang_panel.prototype.setLaiZiColor = function(cardNode){
    var tData = MjClient.data.sData.tData;
    var isLaiZi = false;
    if(MjClient.majiang.isHunCard){
        isLaiZi = MjClient.majiang.isHunCard(cardNode.tag, tData.hunCard);
    }
    if(isLaiZi){
        cardNode.setColor(cc.color(255,255,63));
    }
    return isLaiZi;
};

/**
 *	手牌点击事件
 **/
majiang_panel.prototype.setTouchCardHandler = function (templateHandCard, handCard){
	var self = this;
    handCard.addTouchEventListener(function(cardNode, eventType){
        if(MjClient.playui.checkWhenTouchBegan(cardNode)){
            return;
        }
        if(eventType == ccui.Widget.TOUCH_BEGAN){
        	self.handlerWhenCardTouchBegan(cardNode);
            self.playEffect("cardClick");
            MjClient.movingCard = cardNode;
            MjClient.selectedCard = cardNode;
            self.cardBeginPos = cardNode.getPosition();
            self.cardBeginScale = cardNode.getScale();
            self.cardBeginZIndex = cardNode.zIndex;
            self.cardIsPut = true;
            self.cardValidMoved = false;
            handCard.zIndex = self.cardBeginZIndex + 100;
        }else if(eventType == ccui.Widget.TOUCH_MOVED){
            if (MjClient.movingCard == null || !self.isTurnMe()){
                return;
            }

            var movePos = cardNode.getTouchMovePosition();
            movePos.x = movePos.x < 0 ? 0 : movePos.x > MjClient.size.width ? MjClient.size.width : movePos.x;
            movePos.y = movePos.y < 0 ? 0 : movePos.y > MjClient.size.height ? MjClient.size.height : movePos.y;
            var dis_y = movePos.y - self.cardBeginPos.y;

            if(!self.cardValidMoved && dis_y < templateHandCard.height / 2){
            	cardNode.setPosition(self.cardBeginPos);
            }else{
            	self.cardIsPut = true;
            	self.cardValidMoved = true;
	            cardNode.setPosition(movePos);
	            cardNode.scale = self.cardBeginScale;

	            if(dis_y < templateHandCard.height / 2){
	            	self.cardIsPut = false;
	            }
            }
        }
        else if(eventType === ccui.Widget.TOUCH_ENDED || eventType === ccui.Widget.TOUCH_CANCELED){
            self.cardValidMoved = false;
            if (MjClient.movingCard == null || !cc.sys.isObjectValid(MjClient.movingCard)){
                return;
            }
            if(!self.isTurnMe()){
                MjClient.movingCard = null;
                self.updateColoeAfterSelectCard();
                return;
            }
            cardNode.scale = self.cardBeginScale;
            cardNode.zIndex  = self.cardBeginZIndex;
            var dis_endY = Math.round(cardNode.y - templateHandCard.y);
            //点击杠按钮，命令没回来之前不能点击牌(self.hasClickBtn防止按钮和牌的多点触控导致的多牌)
            if(!self.cardIsPut || dis_endY < 20 || self.hasClickBtn){
                MjClient.movingCard = null;
                cardNode.setPosition(self.cardBeginPos);
                cardNode.y = templateHandCard.y + 20;
                return;
            }
            self.handlerWhenCardTouchEnded(cardNode, cardNode.tag);
        }
    }, handCard);
};

/**
 *  began事件时的验证 
 **/
majiang_panel.prototype.checkWhenTouchBegan = function(cardNode){
    if(MjClient.movingCard !== null && MjClient.movingCard != cardNode){
        return true;
    } 
    var handCount = this.getCardNodeCountByName(cardNode.getParent(), this.HandleCardType.Hand);
    if(!(handCount % 3 == 2 && this.isTurnMe() || handCount % 3 == 1 && !this.isTurnMe())){
        return true;
    }
    // 自动摸打
    var player = MjClient.playui.getPlayerInfoByName("node_down");
    if (player.tPutCard && this.isTurnMe()) {
        if (!MjClient.Scene.ToastNodeArray || MjClient.Scene.ToastNodeArray.length == 0) {
            MjClient.showToast("出牌请先取消自动摸打");
        }
        return true;
    }

    return false;
};

/**
 *  began事件的处理
 **/
majiang_panel.prototype.handlerWhenCardTouchBegan = function(selectCard){
    postEvent(this.PlayEventType.SELECT_HAND_CARD, selectCard);
    //还原之前选中牌的位置
    if(MjClient.selectedCard && cc.sys.isObjectValid(MjClient.selectedCard) && MjClient.selectedCard != selectCard){
        var downNode = this.getNodeByOff();
        var handCard = downNode.getChildByName(this.CsdDefaultCardType.HandCard);
        MjClient.selectedCard.setPositionY(handCard.getPositionY());
    }
};

/**
 * 选中某张手牌之后，改变其颜色
 **/
majiang_panel.prototype.updateColoeAfterSelectCard = function(selectCardNode){
    for(var i = 0;i < this.playerNodeArr.length;i++){
        var playNode = this.playerNodeArr[i];
        var children = playNode.children;
        for(var k = 0;k < children.length;k++){
            var cardNode = children[k];
            if(cardNode.name != this.HandleCardType.Chi && 
                cardNode.name != this.HandleCardType.Peng && 
                cardNode.name != this.HandleCardType.Put)
            {
                continue;
            }
            cardNode.setColor(cc.color(255, 255, 255));
            if(selectCardNode && cardNode.tag == selectCardNode.tag){
                cardNode.setColor(cc.color(170, 170, 170));
            }
        }
    }
};

/**
 *  end事件的处理
 **/
majiang_panel.prototype.handlerWhenCardTouchEnded = function(cardNode, cardTag){
    if(this.isNeedSkipHuTip())
        this.showPassHuTips();
    this.putOutCard(cardNode, cardTag);
}; 
// 出牌放大
majiang_panel.prototype.playPutOutCardAnima = function(copyNode, startPos){
    var endPoint = copyNode.getPosition(); 
    var osc = copyNode.scale;
    var origin_zIndex = copyNode.zIndex;
    copyNode.zIndex += 50;
    copyNode.scale += 0.2; 
    copyNode.setPosition(cc.p(startPos));
    var self = this;
    var spa = cc.spawn( cc.moveTo(0.2,cc.p(endPoint)), cc.scaleTo(0.2,osc) );
    var seq = cc.sequence( spa,cc.callFunc(function(){
        self.addPutCardTip(copyNode);
        copyNode.zIndex = origin_zIndex;
    }) );
    copyNode.runAction(seq);
};


/**
 *	出牌(默认前端先行)
 *  autoput: 自动摸打的时候，防止重复出牌
 **/
majiang_panel.prototype.putOutCard = function (cardNode, cardTag, autoput){
    if (MjClient.rePlayVideo != -1 || !this.isTurnMe()){
        return;
    }
    //打出去的是新摸的这张牌
    if(cardNode.isNew){
        this.newCardNode = null;
        cardNode.isNew = false;
    }

    var playerNode = cardNode.getParent();
    var children = playerNode.children;
    var handCount = 0;
    for(var i = 0; i < children.length; i++){
        if(children[i].name == this.HandleCardType.Hand){
            handCount++;
        }
    }

    var player = this.getPlayerInfoByOff();
    if(handCount != player.mjhand.length){
    	return;
    }

    //如果已经听牌了，打出去的牌必定是莫的那张
    if(player.isTing){
        this.newCardNode = null;
        cardNode.isNew = false;
    }
    this.sendPutToServer(cardTag);
    //前端先行
    if(!this.isFrontFirst() || autoput === false){
    	return;
    }
    this.hideEatNodeChildren();
    
    var startPos = cardNode.getPosition();
    cardNode.removeFromParent(true);

    var copyNode = this.createCard(playerNode, this.CsdDefaultCardType.PutCardOne, this.HandleCardType.Put, cardTag);
    //设置为隐藏是为了可以在显示之前，进行一些其他操作
    copyNode.visible = false;
    //自己出牌时前端先行
    this.putOutSelfFirst(cardTag);
    if(MjClient.rePlayVideo == -1){
    	player.isNew = false;
        this.doBeforeAddPutOutCard(copyNode);
        var self = this;
        this.addPutCard(copyNode, function(){
            if(self.isOpenPutOutCardAnima() && MjClient.playui.getPutCardScaleConfig()){
                self.playPutOutCardAnima(copyNode,startPos);
            }else{
                self.addPutCardTip(copyNode);
            } 
        }, true);
        if(!player.isTing && !this.clickTing && this.isCanInsertcard() && this.getInsertCardAniConfig()){
            this.insertCardAnimation();
        }else{
            this.resetCardLayout(playerNode);
        }

        this.doEndAddPutOutCard(copyNode);
        this.updateColoeAfterSelectCard();
        this.updateCardColorAfterTing();
    }
};

/**
 * 前端先行加载手牌做的事情
 * @param copyNode
 */
majiang_panel.prototype.doBeforeAddPutOutCard = function(copyNode){
   
};

/**
 * 前端先结束的时候要做的事
 * @param copyNode
 */
majiang_panel.prototype.doEndAddPutOutCard = function(copyNode){
    if(this.newCardNode){
        delete this.newCardNode;
        this.newCardNode = null;
    }
};


/**
 * 自己出牌时前端先行的操作
 */
majiang_panel.prototype.putOutSelfFirst = function(cardTag){
    //自己打出的牌立即播放声音
    if(!MjClient.majiang.isCardFlower(cardTag)) {
        this.playEffect("give");
        this.playEffectInPlay(cardTag);
    }

    //方位指向下家,倒计时计时
    var playerNode = this.getNodeByOff();
    var arrowNode = playerNode.getChildByName("img_arrow2DBackGround");
    if (this.is3DStyle()){
        arrowNode = playerNode.getChildByName("img_arrow3DBackGround");
    }
    if (cc.sys.isObjectValid(arrowNode)){
        var tData = MjClient.data.sData.tData;
        var maxPlayer = this.getMaxPlayer();
        var nextPlayer = (tData.uids.indexOf(this.getSelfUid()) + 1 + maxPlayer) % maxPlayer;
        if(!this.is3DStyle()){
            this.updateArrowRotation2D(arrowNode, nextPlayer);
        }else{
            this.updateArrowRotation3D(arrowNode, nextPlayer);
        }

        var textTime = arrowNode.getChildByName("atlas_timeNum");
        if (textTime){
            textTime.stopAllActions();
            this.stopEffect(this.playTimeUpEff);
            this.playTimeUpEff = null;
        }
    }
};

/**
 *  听牌之后，自动摸打  
 **/
majiang_panel.prototype.autoPutAfterTing = function(){
    var player = this.getPlayerInfoByOff();
    if(!player.isTing){
        return;
    }
    if(player.trust || player.tPutCard){
        return;// 托管优先
    }
    if(!this.isTurnMe()){
        return;
    }

    var newCardTag = null;
    if(player.mjhand && player.mjhand.length % 3 == 2 && player.isNew){
        newCardTag = player.mjhand[player.mjhand.length - 1];
    }

    var cardNode = null;
    var node = this.getNodeByOff(0);
    var children = node.children;
    for(var i = 0;i < children.length;i++){
        var child = children[i];
        if(child.name == this.HandleCardType.Hand || (child.name == this.HandleCardType.Chi && child.isCut)){
            if(child.tag == newCardTag){
                cardNode  = child;
                break;
            }
        }
    }

    if(!cardNode){
        return;
    }

    if(this.isTurnMe() && player.isTing && !(player.eatFlag & 8) && !this.checkGangBtn(player)){
        this.runAction(cc.sequence(cc.delayTime(0.6),
            cc.callFunc(function(){
                if(!cc.sys.isObjectValid(cardNode)) return;
                MjClient.playui.putOutCard(cardNode, cardNode.tag);
            })));
    }
};



/**
 *  听牌之后，刷新手牌的颜色
 *  isInitScene： 判断是否是断线重连，如果是则不需要将没有听牌箭头的牌置灰
 **/
majiang_panel.prototype.updateCardColorAfterTing = function(isInitScene){
    var player = this.getPlayerInfoByOff();
    var playerNode = this.getNodeByOff();
    var color = cc.color(190, 190, 190);
    var standNode = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
    var children = playerNode.children;
    if(player.isTing){
        for(let i = 0;i < children.length;i++){
            var cardNode = children[i];
            if(cardNode.name === this.HandleCardType.Hand){
                // 修复开杠情况下 牌没有置灰的bug
                if(this.newCardNode && this.newCardNode == cardNode && !MjClient.playui.isKaiGang){
                   continue;
                }
                cardNode.isGray = true;
                cardNode.setColor(color);
                cardNode.addTouchEventListener(function () {});
                cardNode.y = standNode.y;
            }
        }
        return;
    }

    if(!this.isTurnMe() || isInitScene){
        return;
    }

    var unTingCards = [], handCount = 0;
    for(let i = 0;i < children.length;i++){
        var child = children[i];
        var tingSign = child.getChildByName("tingSign");
        if(child.name === this.HandleCardType.Hand){
            handCount++;

            if(!cc.sys.isObjectValid(tingSign) || (tingSign && !tingSign.visible)){
                unTingCards.push(child);
            }
            child.y = standNode.y;
        }
    }

    if(unTingCards.length < handCount && MjClient.playui.clickTing){
        for(var k = 0;k < unTingCards.length;k++){
            var cardNode = unTingCards[k];
            cardNode.setColor(color);
            cardNode.addTouchEventListener(function () {});
        }
    }
};

/**
 * 取消听按钮
 */
majiang_panel.prototype.updataClickCancelTingBtn = function(){
    var player = this.getPlayerInfoByOff();

    if(player.isTing){
        return;
    }

    if(!this.isTurnMe()){
        return;
    }

    var playerNode = this.getNodeByOff();
    var copyNode = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
    var children = playerNode.children;
    for(var i = 0;i < children.length;i++){
        var cardNode = children[i];
        if(cardNode.name === this.HandleCardType.Hand){
            var tingSign = cardNode.getChildByName("tingSign");
            if(!cc.sys.isObjectValid(tingSign) || (tingSign && !tingSign.visible)){
                if(!(MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(cardNode.tag, MjClient.data.sData.tData.hunCard)))
                    cardNode.setColor(cc.color(255,255,255));
                this.setTouchCardHandler(copyNode, cardNode);
            }
        }
    }
};

/**
 *  更新听牌
 **/
majiang_panel.prototype.setTingCardSprite = function(cardNode, cardTag){
    var cardImg = this.getCardFaceImg2D(cardTag);
    cardImg.setContentSize(cardNode.getContentSize());
    var imgScale = cardNode.width / cardImg.width;
    cardImg.setScale(imgScale - 0.1);
    cardImg.setPosition(cardNode.width / 2, cardNode.height / 2);
    cardNode.removeChildByName("cardImg");
    cardNode.addChild(cardImg);

    var tData = MjClient.data.sData.tData;
    if(MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(cardTag, tData.hunCard)){
        var laiZiNode = this.getLaiZiIcon2D();
        var laiZiScale = cardNode.width / laiZiNode.width;
        laiZiNode.setScale(laiZiScale);
        laiZiNode.setAnchorPoint(1, 1);
        laiZiNode.setPosition(cardNode.width, cardNode.height);
        cardNode.addChild(laiZiNode);
    }
};

/**
 *  金币场添加金币，金币图标
 *  headNode：玩家头像节点
 **/
majiang_panel.prototype.showJinBiAndJinBiIcon = function(headNode) {
    var player = this.getPlayerInfoByName(headNode.getParent().getName());
    if(!player || !MjClient.isInGoldField()){
    	headNode.removeChildByName("jinbiIcon");
    	headNode.removeChildByName("jinbi");
    	return;
    }

	var tData = MjClient.data.sData.tData;
	var coinLabel = headNode.getChildByName("atlas_score");
    var jinbi = headNode.getChildByName("jinbi");
    var jinbiIcon = headNode.getChildByName("jinbiIcon");
    if (!jinbiIcon){
        if(MjClient.getGoldFiledType() == 1){
            jinbiIcon = ccui.ImageView("goldCommon/icon_jinbi.png");
        }else{
            jinbiIcon = ccui.ImageView("playing/gameTable/jinbi.png");
        }
        jinbiIcon.setAnchorPoint(0.5,0.5);
        jinbiIcon.setPosition(coinLabel.getPositionX() - 46, coinLabel.getPositionY());
        jinbiIcon.setName("jinbiIcon");
        headNode.addChild(jinbiIcon);
    }
    if (!jinbi){
        jinbi = new ccui.Text();
        jinbi.setFontSize(20);
        jinbi.setAnchorPoint(0.5,0.5);
        jinbi.setPosition(coinLabel.getPositionX() + 9, coinLabel.getPositionY());
        jinbi.setName("jinbi");
        headNode.addChild(jinbi);
    }
    jinbi.ignoreContentAdaptWithSize(true);
    if (tData.fieldFee){
        if(tData.roundNum <= 0){//结算后台费已经扣了不用再减去台费
            jinbi.setString(MjClient.simplifyGoldNumStr(Number(pl.info.gold)));
        }else{
            jinbi.setString(MjClient.simplifyGoldNumStr(Number(pl.info.gold-tData.fieldFee)));
        }
    }else{
        jinbi.setString(MjClient.simplifyGoldNumStr(pl.info.gold));
    }
    jinbiIcon.setPositionX(jinbi.getPositionX()-jinbi.width/2-jinbiIcon.width/2-10);
};

/**
 *  设置微信头像
 **/
majiang_panel.prototype.setWxHead = function(headNode) {
    var player = this.getPlayerInfoByName(headNode.getParent().getName());
    var headBg = headNode.getChildByName("img_headBg");
    headBg.removeChildByName("wxHead");
    if (!player) {
        return;
    }

    cc.loader.loadImg(player.info.headimgurl, function(err, texture) {
        if (err) {
            texture = "png/default_headpic.png";
        }   
        if(!(headNode && cc.sys.isObjectValid(headNode))) return;
        var wxHead = new cc.Sprite(texture);
        wxHead.setName("wxHead");
        headBg.addChild(wxHead);
        setWgtLayout(wxHead, [0.91, 0.91], [0.5, 0.5], [0, 0], false, true);
    });
    COMMON_UI.addNobleHeadFrame(headBg,player)
};

/**
 *  设置游戏中离线头像
 **/
majiang_panel.prototype.setUserOfflineInPlayGame = function(offLineBg, playerNodeName) {
    // 金币场和自己不显示离线状态
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    offLineBg.visible = false;
    if (tData && tData.fieldId) {
        return;
    }

    var player = this.getPlayerInfoByName(playerNodeName);
    if (player && player.onLine == false) {
        var timeNode = this.setUserOfflineTime(offLineBg, 0.8);
        offLineBg.zIndex = 100;
        offLineBg.visible = true;
        offLineBg.unscheduleAllCallbacks();
        offLineBg.schedule(function(){
            if (player.offLineTime) {
                var currentTime = new Date().getTime();
                var showTime = currentTime - player.offLineTime;
                if(showTime < 0) showTime = 0;
                timeNode.setString(MjClient.dateFormat(new Date(showTime),"mm:ss"));
            } else {
                timeNode.setString("");
            }
        });
    }
};

/**
 *  设置游戏结束离线头像
 **/
majiang_panel.prototype.setUserOfflineInWinGame = function(headNode, player) {
    if (!player || player.onLine == true || MjClient.rePlayVideo != -1) {
        return;
    }

    var offLineBg = headNode.getChildByName("offLineBg");
    if (!offLineBg) {
        offLineBg = new ccui.ImageView("gameOver/Z_offline.png");
        offLineBg.setName("offLineBg");
        offLineBg.setPosition(cc.p(headNode.getContentSize().width / 2, headNode.getContentSize().height / 2));
        headNode.addChild(offLineBg);
    }
    
    var timeNode = this.setUserOfflineTime(offLineBg, 0.6);
    offLineBg.zIndex = 99;

    if (player.lastOffLineTime) {
        var showTime = (MjClient.data.sData.serverTime - player.lastOffLineTime);
        if (showTime < 0) {
            offLineBg.visible = false;
            showTime = 0;
        }
        timeNode.setString(MjClient.dateFormat(new Date(showTime),"mm:ss"));

    } else {
        timeNode.setString("");
    }
};

/**
 *  设置离线时间
 *  offLineBg: 离线背景图片
 *  posY：离线时间的显示高度
 **/
majiang_panel.prototype.setUserOfflineTime = function(offLineBg, posY) {
    var offLineTime = offLineBg.getChildByName("offLineTime");
    if (!offLineTime) {
        offLineTime = new ccui.Text();
        offLineTime.setFontName("fonts/lanting.TTF");
        offLineTime.setName("offLineTime");
        offLineTime.setFontSize(26);
        offLineTime.x = offLineBg.getContentSize().width / 2;
        offLineTime.y = offLineBg.getContentSize().height * posY;
        offLineBg.addChild(offLineTime);
    } else {
        offLineTime.visible = true;
    }

    return offLineTime;
};

/**
 *  初始化房主的标识
 **/
majiang_panel.prototype.updateFangZhuIconStatus = function(headNode){
    var tData = MjClient.data.sData.tData;
    var player = this.getPlayerInfoByName(headNode.getParent().getName());
    if (!player || tData.owner != player.info.uid) {
        headNode.removeChildByName("fangIcon");
        return;
    }

    var fangIcon = headNode.getChildByName("fangIcon");
    if (!fangIcon) {
        var sp = new cc.Sprite("playing/gameTable/fangzhu.png");
        sp.setPosition(40, headNode.getContentSize().height - 17);
        sp.setAnchorPoint(1,0);
        sp.setName("fangIcon");
        headNode.addChild(sp, 100);
    } else {
        fangIcon.visible = true;
    }
 };

/**
 *	获得玩家是否是庄的状态
 **/
majiang_panel.prototype.getZhuangStatus = function(playerNodeName){
	if(!this.isBeganGame()){
		return false;
	}
	var tData = MjClient.data.sData.tData;
	var player = this.getPlayerInfoByName(playerNodeName);
	if(!player || tData.tState == TableState.waitJiazhu){
		return false;
	}

	if(player.info.uid == tData.uids[tData.zhuang]){
		return true;
	}
	return false;
};

 /**
 *  弹框显示玩家信息
 *  playerNodeName：玩家结点的名字
 **/
majiang_panel.prototype.showPlayerInfo = function(playerNodeName) {
    var player = this.getPlayerInfoByName(playerNodeName);
    if (player) {
        if (player.info.uid == SelfUid()){
            MjClient.showPlayerInfo(player.info, false, true);
        }else{
            MjClient.showPlayerInfoPlaying(player.info);
        }
    }
};

/**
 * 播放投砸道具动画
 * @param  {number} startOff 使用道具的位置
 * @param  {number} endOff 被使用道具的位置
 * @param  {number} kind 道具类型
 * @return {null} null
 */
majiang_panel.prototype.playChatAni = function(startOff,endOff,kind) {
    var startPlayerNode = this.getNodeByOff(startOff);
    var endPlayerNode = this.getNodeByOff(endOff);
    if (!MjClient.playui || !startPlayerNode || !endPlayerNode) {
        return;
    }

    //道具的运动轨迹
    var startHeadNode = startPlayerNode.getChildByName("layout_head");
    var endHeadNode = endPlayerNode.getChildByName("layout_head");

    if(kind >= 10000){
        //贵族互动道具
        playChatAniGuizu(MjClient.playui.jsBind.node_eat._node,startHeadNode,endHeadNode,kind);
        return;
    }

    var distance = cc.pDistance(startHeadNode.getPosition(), endHeadNode.getPosition());
    var costTime = 0.4;
    var midX = (endHeadNode.getPositionX() - startHeadNode.getPositionX()) / 2 + startHeadNode.getPositionX();
    if (Math.abs(endHeadNode.getPositionX() - startHeadNode.getPositionX()) < 10) {
        midX += distance / 5;
    }
    var midY = Math.max(startHeadNode.getPositionY(), endHeadNode.getPositionY());
    if (Math.abs(endHeadNode.getPositionY() - startHeadNode.getPositionY()) < 10) {
        midY += distance / 5;
    }
    var bezierRound = cc.bezierTo(costTime, [startHeadNode.getPosition(), cc.p(midX, midY), endHeadNode.getPosition()]);
    if (kind == 2) {
        bezierRound = cc.spawn(bezierRound, cc.rotateBy(costTime,360*2));
    } else if (kind == 6) {
        bezierRound = cc.spawn(bezierRound, cc.rotateBy(costTime,360));
    }

    //道具声音和动画
    var delayTime = [0, 0.1, 0, 0.1, 0.1, 0.1, 0];
    var sound = ["ie_flower", "ie_diamond", "ie_egg", "ie_boom", "ie_kiss", "ie_cheer", "ie_tomato"];
    var aniImg = ["info_n_send_0", "info_n_send_1", "info_n_send_2", "info_n_send_3", "info_n_send_4_0", "info_n_send_5_0", "info_n_send_6_0"];
    var animate = this.setChatAnimate(kind);
    var moveSoundFunc = cc.callFunc(function(){
        this.playEffect("chatFlyEffect");
    });
    var playSoundFunc = cc.callFunc(function(){
        this.playEffect(sound[kind]);
    });

    //添加道具精灵并播放动画
    var aniSprite = new cc.Sprite("playing/other/" + aniImg[kind] + ".png");
    aniSprite.setPosition(startHeadNode.getPosition());
    aniSprite.setScale(MjClient.size.height / 800);
    aniSprite.runAction(cc.sequence(moveSoundFunc, bezierRound, cc.delayTime(delayTime[kind]), playSoundFunc, animate, cc.removeSelf()));
    MjClient.playui.jsBind.node_eat._node.addChild(aniSprite, 10000);
};

/**
 * 设置投砸道具动画
 * @param  {number} kind 道具类型
 * @return animate
 */
majiang_panel.prototype.setChatAnimate = function(kind) {
    cc.spriteFrameCache.addSpriteFrames("playing/other/emj.plist","playing/other/emj.png");
    var fc = cc.spriteFrameCache;
    var frames = [];
    var frameTime = [0.08, 0.1, 0.08, 0.08, 0.12, 0.12, 0.08];
    var frameNum = [15, 15, 10, 15, 15, 15, 15];
    var prefix = "info_n_send_" + kind + "_";
    
    for (var i = 1; i < frameNum[kind]; i++) {
        var name = prefix + i + ".png";
        var f = fc.getSpriteFrame(name);
        if (f) {
            frames.push(f);
        }
    }

    return cc.animate(new cc.Animation(frames, frameTime[kind], 1));
};

/**
 *  显示玩家关于互动的信息
 *  node：玩家的聊天内容结点（text_voiceContent）
 *  playerNodeName：玩家结点的名字
 **/
majiang_panel.prototype.showUserChat = function(node, playerNodeName, msg) {
    var pl = this.getPlayerInfoByName(playerNodeName);
    var type = msg.type;
    var message = msg.msg;
    var num = msg.num;

    if (pl && msg.uid == pl.info.uid) {
        switch (type) {
            case 0:
                //展示玩家聊天信息
                this.showPlayerChatMessage(node, msg);
                break;
            case 1:
                //展示游戏内置聊天信息
                this.showGameSoundChatMessage(node, playerNodeName, msg);
                break;
            case 2:
                //播放表情
                this.playEmojiAct(node, msg.num);
                break;
            case 3:
                //播放录音
                this.playRecord(node, num, msg);
                break;
            case 5:
                // 转运道具            
                this.playZhuanYunPropAct(node, msg.num);
                break;
            default:
                break;                                                
        }
    }
};

/**
 *  玩家距离检查
 **/
majiang_panel.prototype.checkDistanceOfPlayer = function(node, playerNodeName, msg) {
	if(msg.type != 4 || playerNodeName != "node_down"){
		return;
	}

    var tData = MjClient.data.sData.tData;
    if(tData.maxPlayer <= 2 || MjClient.tableid == tData.tableid ||　tData.roundNum != tData.roundAll){
    	return;
    }
    var distanceData = [];
    for (var i = 0; i < tData.uids.length; i++) {
        var pl = MjClient.data.sData.players[tData.uids[i]];
        if (pl && pl.locationMsg) {
            distanceData.push(pl.locationMsg);
        }
    }

    if(distanceData.length != tData.maxPlayer){
    	return;
    }

    MjClient.tableid = tData.tableid;
    var displayCount = 0;
    for (var k = 0; k < distanceData.length; k++) {
        for (var j = k + 1; j < distanceData.length; j++) {
            var playerOneArr = distanceData[k].split(";");
            var playerTwoArr = distanceData[j].split(";");

            var playerOne = this.getUIPlayerByUID(playerOneArr[3]);
            var firstLatitude = playerOne.info.location.latitude;
            var firstLongitude = playerOne.info.location.longitude;
            if (!firstLatitude) {
                firstLatitude = playerOneArr[0];
            }
            if (!firstLongitude) {
                firstLongitude =  playerOneArr[1];
            } 

            var playerTwo = this.getUIPlayerByUID(playerTwoArr[3]);
            var secLatitude = playerTwo.info.location.latitude;
            var secLongitude = playerTwo.info.location.longitude;
            if (!secLatitude) {
                secLatitude = playerTwoArr[0];
            }
            if (!secLongitude) {
                secLongitude =  playerTwoArr[1];
            }

            var distance = MjClient.native.CalculateLineDistance(firstLatitude, firstLongitude, secLatitude, secLongitude);
            if (distance <= 50 && distance >=0) {
                displayCount++;
                break;
            }
        }

        if (displayCount > 0) {
            break;
        }
    }

    //add by sking 当有人距离小于50米 时候提示
    // if (displayCount >= 1 && !tData.matchId) {
    //     if (tData.maxPlayer == 4) {
    //         MjClient.Scene.addChild(new showDistanceLayer());
    //     } else {
    //         MjClient.Scene.addChild(new showDistance3PlayerLayer(tData.maxPlayer));
    //     }
    // }
};

/**
 *  展示玩家聊天信息
 *  node：玩家的聊天结点
 **/
majiang_panel.prototype.showPlayerChatMessage = function(node, message) {
    node.getParent().visible = true;
    node.setString(message.msg);
    var callback = function() {
        node.getParent().visible = false;
    };

    node.getParent().width = node.getString().length * node.getFontSize() + 72;
    node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
};

/**
 *  展示游戏内置聊天信息
 *  node：玩家的聊天结点
 **/
majiang_panel.prototype.showGameSoundChatMessage = function(node, playerNodeName, msg) {
    node.getParent().visible = true;
    var message = msg.msg;
    var text = message.text;
    node.setString(text);
    var callback = function() {
        node.getParent().visible = false;
    };

    var musicNum = msg.num + 1;
    node.getParent().width = node.getString().length * node.getFontSize() + 72;

    var player = this.getPlayerInfoByName(playerNodeName);
    var voiceType = message.voiceType == 0 ? "normal" : MjClient.gameType;
    var content = GameSound4Chat[voiceType];
    if (content) {
        this.playEffect(GameSound4Chat[voiceType][this.getRandomRange(0,content.length-1)] + musicNum, false, player.info.sex);
    }
    node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
};

/**
 *  播放表情
 *  node：玩家的聊天结点
 **/
majiang_panel.prototype.playEmojiAct = function(node, num) {

    var em_node = node.getParent().getParent().getChildByName("img_emoji");
    if(num >= 10000){
        PlayEmojiActGuizu(em_node,num);
        return;
    }
    var framename, arry = [], delaytime = 0, playCount = 1;

    var emojiInfo = this.getEmojiInfo();
    var scale = emojiInfo.scale;
    var infoList = emojiInfo.infoList;

    var obj = infoList[num];
    if(obj){
        framename = obj.framename;
        delaytime = obj.delaytime;
        playCount = obj.playCount;
    }

    var length = infoList.length;
    for(var i = 0; i < length; i++){
        var frame = cc.spriteFrameCache.getSpriteFrame(framename + i + ".png");
        if(frame){
            arry.push(frame);
        }
    }

    var firstFrame = new cc.Sprite();
    firstFrame.initWithSpriteFrame(arry[0]);
    firstFrame.setPosition(em_node.getPosition());
    firstFrame.setScale(em_node.getScale());
    if(scale > 0){
        firstFrame.setScale(scale);
    }
    em_node.getParent().addChild(firstFrame);
    var animate = cc.animate(new cc.Animation(arry, delaytime, playCount));
    firstFrame.runAction(cc.sequence(animate,cc.removeSelf()));

    var url = "chat/" + framename;
    this.playEffect(url);
};

/**
 *  得到要播放的表情
 *  
 **/
majiang_panel.prototype.getEmojiInfo = function() {
    var emojiInfo = {};
    emojiInfo.scale = 2;
    emojiInfo.infoList = [
        {framename : "bb", delaytime : 0.1, playCount : 2},
        {framename : "daku", delaytime : 0.15, playCount : 2},
        {framename : "fennu_", delaytime : 0.2, playCount : 2},
        {framename : "guzhang", delaytime : 0.2, playCount : 8},
        {framename : "kaiqiang", delaytime : 0.2, playCount : 2},
        {framename : "kaixin", delaytime : 0.2, playCount : 2},
        {framename : "keshui", delaytime : 0.2, playCount : 2},
        {framename : "pp", delaytime : 0.2, playCount : 2},
        {framename : "tuxue", delaytime : 0.2, playCount : 2},
        {framename : "caishen", delaytime : 0.15, playCount : 1},
        {framename : "xishou", delaytime : 0.15, playCount : 1}
    ];

    return emojiInfo;
};

/**
 *  播放录音
 *  node：玩家的聊天结点
 **/
majiang_panel.prototype.playRecord = function(node, num, msg) {
    var message = msg.msg;
    if (this.getSpeakVolume() != 0) {
        this.pauseMusicAndAllEffects();
        MjClient.isPlayRecord = true;
    }

    if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb()) {
        h5.weixinHelper.playRecord(message);
    } else {
        cc.audioEngine.unloadEffect(message);
    }

    node.getParent().setVisible(true);
    node.setString(" ");
    node.getParent().width = node.getString().length * node.getFontSize() + 72;

    var voicebg = node.getParent().getChildByName("sprite_voiceIcon");
    voicebg.stopAllActions();
    voicebg.setVisible(true);

    this.reallyPlayEffect(message, false, true);

    var callback = function() {
        node.getParent().setVisible(false);
        voicebg.setVisible(false);
        voicebg.stopAllActions();
        MjClient.downAndPlayVoiceMessageQueue = MjClient.downAndPlayVoiceMessageQueue || [];
        if (MjClient.downAndPlayVoiceMessageQueue.length == 0) {
            MjClient.isPlayRecord = false;
            this.resumeMusicAndAllEffects();
        }
    };

    var _tempRecordVoiceAnimate = createAnimation("animate/voice/", 4, cc.rect(0, 0, 23, 30));
    voicebg.runAction(cc.repeatForever(_tempRecordVoiceAnimate));
    var time = Number(num / 1000);
    if (!time) time = 1;
    node.runAction(cc.sequence(cc.delayTime(time < 1 ? 1 : time), cc.callFunc(callback)));
};

/**
 *  转运道具
 **/
majiang_panel.prototype.playZhuanYunPropAct = function(node, index){
    var em_node = node.getParent().getParent().getChildByName("img_emoji");
    var props = ["CaiShendao", "JinBIquan", "ZhuanYunfengche", "JuBaopen"];
    if (!cc.sys.isObjectValid(em_node) || index < 0 || index >= props.length)
        return;

    cc.spriteFrameCache.addSpriteFrames("fangKa/prop/" + props[index] + "/" + props[index] + "0.plist", "fangKa/prop/" + props[index] + "/" + props[index] + "0.png");
    ccs.armatureDataManager.addArmatureFileInfo("fangKa/prop/" + props[index] + "/" + props[index] + ".ExportJson");
    var armature = new ccs.Armature(props[index]);
    armature.animation.play(props[index], -1, 0);
    armature.setPosition(em_node.getPosition());
    armature.setScale(em_node.getScale());
    em_node.getParent().addChild(armature);
};

/**
 *	动画生成
 *	path: 图片路径 count:帧动画数量
 *	rect: 显示范围 time:持续事件
 *	return {Action}
 **/
majiang_panel.prototype.createAnimationAction = function(path, count, rect, time){
    var frames = [];
    var prefix = path;
    for(var i = 0; i < count; i++){
        var fileName = prefix + i + ".png";
        var frame = new cc.SpriteFrame(fileName, rect);
        frames.push(frame);
    }
    time = time === undefined ? 0.25 : time;
    var animation = new cc.Animation(frames, time);
    var action = new cc.Animate(animation);
    return action;
};

/**
 *	获取语音Layer
 *
 **/
majiang_panel.prototype.getVoiceLayer = function(){
    var size = cc.winSize;
    var voiceLayer = new cc.Layer();
    cc.director.getRunningScene().addChild(voiceLayer);

    var voiceBackGround = new ccui.Scale9Sprite("animate/startRecord/voiceBackGround.png");
    var layerSize = voiceBackGround.getContentSize();
    layerSize = cc.size(layerSize.width, layerSize.height * 1.25);

    voiceBackGround.setContentSize(layerSize);
    voiceBackGround.setPosition(size.width * 0.5, size.height * 0.55);
    voiceLayer.addChild(voiceBackGround);
    var height = cc.winSize.height / 3 / voiceBackGround.getContentSize().height;
    voiceBackGround.setScale(height);

    var voiceStatusIcon = new cc.Sprite("animate/startRecord/0.png");
    voiceStatusIcon.setPosition(layerSize.width * 0.675, layerSize.height * 0.55);
    voiceBackGround.addChild(voiceStatusIcon);

    var voiceIcon = new cc.Sprite("animate/startRecord/recordIcon.png");
    voiceIcon.setPosition(layerSize.width * 0.325, layerSize.height * 0.55);
    voiceBackGround.addChild(voiceIcon);

    var voiceCancel = new cc.Sprite("animate/startRecord/cancel.png");
    voiceCancel.setPosition(layerSize.width * 0.5, layerSize.height * 0.55);
    voiceBackGround.addChild(voiceCancel);

    var voiceShort = new cc.Sprite("animate/startRecord/timeShort.png");
    voiceShort.setPosition(layerSize.width * 0.5, layerSize.height * 0.55);
    voiceBackGround.addChild(voiceShort);

    var tipsLabel = new cc.LabelTTF("手指上滑 , 取消发送","", 20);
    tipsLabel.setPosition(layerSize.width * 0.5, layerSize.height * 0.15);
    voiceBackGround.addChild(tipsLabel);

    var animationAction = this.createAnimationAction("animate/startRecord/", 7, cc.rect(0,0,44,82));
    voiceStatusIcon.runAction(cc.repeatForever(animationAction));

    var callback = function (){
        voiceLayer.setVisible(false);
    };

    voiceLayer.runCancelRecord = function (){
        voiceIcon.setVisible(false);
        voiceStatusIcon.setVisible(false);
        voiceShort.setVisible(false);
        voiceCancel.setVisible(true);
        tipsLabel.setString("取消发送");
        voiceLayer.scheduleOnce(callback, 0.5);
    };

    voiceLayer.runStartRecord = function (){
        voiceIcon.setVisible(true);
        voiceStatusIcon.setVisible(true);
        voiceCancel.setVisible(false);
        voiceShort.setVisible(false);
        tipsLabel.setString("手指上滑 , 取消发送");

        voiceLayer.setVisible(true);
        voiceLayer.unschedule(callback);
    };

    voiceLayer.runToCancelRecord = function (){
        voiceIcon.setVisible(false);
        voiceStatusIcon.setVisible(false);
        voiceCancel.setVisible(true);
        voiceShort.setVisible(false);
        tipsLabel.setString("松开手指 , 取消发送");

        voiceLayer.setVisible(true);
    };

    voiceLayer.runStopRecord = function (){
        voiceIcon.setVisible(true);
        voiceStatusIcon.setVisible(true);
        voiceCancel.setVisible(false);
        voiceShort.setVisible(false);

        voiceLayer.unschedule(callback);
        callback();
    };

    voiceLayer.runShortRecord = function (){
        voiceIcon.setVisible(false);
        voiceStatusIcon.setVisible(false);
        voiceCancel.setVisible(false);
        voiceShort.setVisible(true);
        tipsLabel.setString("录音时间太短");

        voiceLayer.scheduleOnce(callback, 0.5);
    };
    return voiceLayer;
};

/**
 * 吃碰杠的麻将加箭头
 * cardNode: 麻将牌
 * from: 吃碰牌的来源,uids中的索引
 * to: 操作的玩家,uids中的索引
 **/
majiang_panel.prototype.setCardArrow = function (cardNode, from, to){
	if (this.isShowCardArrow()){
		return;
	}

    var arrowIcon = cardNode.getChildByName("arrow");
    if(arrowIcon && cc.sys.isObjectValid(arrowIcon)){
        arrowIcon.removeFromParent(true);
    }

    var arrowPos = this.getArrowPosition(cardNode);
    arrowIcon = new cc.Sprite("playing/other/arrow.png");
    arrowIcon.setScale(1.2);
    arrowIcon.setPosition(arrowPos);
    arrowIcon.setName("arrow");
    cardNode.addChild(arrowIcon);

    var rotation = this.getArrowRotation(cardNode, from, to);
    arrowIcon.setRotation(rotation);
};

/**
 *	获得指示箭头的坐标
 **/
majiang_panel.prototype.getArrowPosition = function(cardNode){
	var playerNode = cardNode.getParent();
	var nodeIndex = this.getNodeIndexDefaultByName(playerNode.getName());
	var pos_x = cardNode.width / 2;
	var pos_y = cardNode.height / 2 + 10;
	return cc.p(pos_x, pos_y);
};

/**
 *	获得指向的旋转角度(默认向右,补杠指向自己,暗杠不需要指向)
 *	cardNode: 麻将牌
 *	from: 吃碰牌的来源,uids中的索引
 *	to: 操作的玩家,uids中的索引
 **/
majiang_panel.prototype.getArrowRotation = function(cardNode, from, to){
	var tData = MjClient.data.sData.tData;
	var directNode = cardNode.getParent();
	var nodeName = directNode.getName();
	//默认四人玩法中节点的index
	var cardNodeIndex = this.getNodeIndexDefaultByName(nodeName);
	var fromOffIndex = this.getOffIndexWithSelf(tData.uids[from]);
	var fromNodeIndex = this.getNodeIndexDefaultByName(this.NodeNameArray[fromOffIndex]);
	var toOffIndex = this.getOffIndexWithSelf(tData.uids[to]);
	var toNodeIndex = this.getNodeIndexDefaultByName(this.NodeNameArray[toOffIndex]);
	var offSet = fromNodeIndex - toNodeIndex;

	var modify = -offSet * 90;
	var rotation = 360 - cardNodeIndex * 90 + 90;
	//offSet=0指向自己
	rotation = offSet == 0 ? rotation : rotation + modify;
	return rotation;
};

/**
 *  获得特定类型的牌的数量
 **/
majiang_panel.prototype.getCardNodeCountByName = function(node, typeName){
    var count = 0;
    var children = node.children;
    for(var i = 0;i < children.length;i++){
        var child = children[i];
        if(child.getName() == typeName){
            count++;
        }
    }
    return count;
};

/**
 *  移除所有操作的牌
 **/
majiang_panel.prototype.removeAllCards = function(node){
    var children = node.children;
    for(var i = 0;i < children.length;i++){
        var child = children[i];
        for(var key in this.HandleCardType){
            if(child.getName() == this.HandleCardType[key]){
                child.removeFromParent(true);
                break;
            }
        }
    }
};

/**
 *  移除特定类型的牌
 **/
majiang_panel.prototype.removeCardsByName = function(node, cardName){
    var children = node.children;
    for(var i = 0;i < children.length;i++){
        var child = children[i];
        if(child.getName() == cardName){
            child.removeFromParent(true);
        }
    }
};

/**
 * 移除牌
 * cardName: 要移除牌的名字
 * playerNode: 要移除牌的玩家
 * cardTag: 要移除的牌
 * removeNum: 要移除牌的数量
 **/
majiang_panel.prototype.removeCard = function (playerNode, cardName, cardTag, removeNum) {
    removeNum = removeNum ? removeNum : 1;
    for (var i = 0; i < removeNum; i++) {
        var children = playerNode.children;
        for (var j = children.length - 1; j >= 0; j--) {
            var child = children[j];
            if (child && child.name == cardName && (!cardTag || child.tag == cardTag)) {
                child.removeFromParent(true);
                break;
            }
        }
    }
};

/**
 *  根据名字获取对应的节点
 **/
majiang_panel.prototype.getCardNodeByName = function(playerNode, cardName){
    var cardArray = [];
    var children = playerNode.children;
    for(var i = 0;i < children.length;i++){
        var child = children[i];
        if(child.getName() == cardName){
            cardArray.push(child);
        }
    }
    return cardArray;
};

/**
 *	处理等待出牌(非自己的玩家会调用)
 **/
majiang_panel.prototype.dealWaitPut = function(playerNode, msg){
    var tData = MjClient.data.sData.tData;
    var player = this.getPlayerInfoByName(playerNode.getName());
    if(player.info.uid == tData.uids[tData.curPlayer]){
        var cardTag = MjClient.rePlayVideo != -1 ? player.mjhand[player.mjhand.length-1] : null;
        this.createCard(playerNode, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand, cardTag);
    }
    this.resetCardLayout(playerNode);	
};

/**
 *	处理出牌
 **/
majiang_panel.prototype.dealPut = function(playerNode, msg){
    var tData = MjClient.data.sData.tData;
    var selfUid = this.getSelfUid();
    var player = this.getPlayerInfoByName(playerNode.getName());
    if(this.isFrontFirst() && tData.uids[tData.curPlayer] == selfUid && MjClient.rePlayVideo == -1 && !player.trust && !player.tPutCard){
        return;
    }

    if((player.trust || player.tPutCard) && tData.uids[tData.curPlayer] == selfUid){
        //自己打出的牌立即播放声音
        if(!MjClient.majiang.isCardFlower(msg.card)) {
            this.playEffect("give");
            this.playEffectInPlay(msg.card);
        }
    }

    if(player.info.uid != msg.uid){
    	return;
    }

    if(MjClient.rePlayVideo == -1 && tData.uids[tData.curPlayer] != selfUid){ //托管的时候，手牌不删
        this.removeCard(playerNode, this.HandleCardType.Hand);
    }else{
        this.removeCard(playerNode, this.HandleCardType.Hand, msg.card);
    }
    var cardNode = this.createCard(playerNode, this.CsdDefaultCardType.PutCardOne, this.HandleCardType.Put, msg.card);
    var self = this;
    this.addPutCard(cardNode, function(){
        self.addPutCardTip(cardNode, msg);
    }, true);
    
    this.resetCardLayout(playerNode);
};

/**
 *  移除打出去牌的指示箭头
 **/
majiang_panel.prototype.removePutCardTip = function(){
    var tipNode = this.getChildByName("putTip");
    if(tipNode && cc.sys.isObjectValid(tipNode)){
        tipNode.visible = false;
    }
};

/**
 *  添加当前打出去牌的指示箭头
 **/
majiang_panel.prototype.addPutCardTip = function (cardNode, netData){
    this.removePutCardTip();
    if(!this.isInGame()){
        return;
    }
    cardNode = cardNode || this.lastPutCardNode;
    if(!cardNode || !cc.sys.isObjectValid(cardNode)){
        return;
    }
    var tipNode = this.getChildByName("putTip");
    if(!tipNode){
        var downNode = this.getNodeByOff();
        var putCard = downNode.getChildByName(this.CsdDefaultCardType.PutCardOne);
        var scale = putCard.getScale();

        tipNode = new cc.Sprite("playing/other/sign.png");
        tipNode.setName("putTip");
        tipNode.setScale(scale * 1.5);
        this.addChild(tipNode, 100);

        var actionOne = cc.moveBy(0.5, 0, 10).easing(cc.easeCubicActionOut());
        var actionTwo = cc.moveBy(0.5, 0, -10).easing(cc.easeCubicActionIn());
        tipNode.runAction(cc.sequence(actionOne, actionTwo).repeatForever());
    }
    tipNode.visible = true;
    var pos_x = cardNode.x;
    var pos_y = cardNode.y + cardNode.height * cardNode.scale / 2 + 5;
    tipNode.setPosition(pos_x, pos_y);
};


/**
 *  获得上一张打的牌(正常打牌、断线重连)
 *  断线重连、23D切换
 **/
majiang_panel.prototype.setLastPutCardNode = function(){
    var tData = MjClient.data.sData.tData;
    var player = this.getUIPlayerByUID(tData.uids[tData.curPlayer]);
    if(player && player.mjState == TableState.waitPut && player.isNew){
        var lastPutPlayer = (tData.curPlayer - 1 + tData.maxPlayer) % tData.maxPlayer;
        player = this.getUIPlayerByUID(tData.uids[lastPutPlayer])
    }
    
    if(!player) {
        return;
    }
    
    var mjput = player.mjput;
    if(!mjput || mjput.length == 0){
        return;
    }
    
    var lastPutCard = tData.lastPutCard;
    if(mjput[mjput.length - 1] != lastPutCard){
        return;
    }
    
    var playerNode = this.getUIBind(tData.uids.indexOf(player.info.uid));
    
    if(playerNode.lastPutCardNode && cc.sys.isObjectValid(playerNode.lastPutCardNode) && playerNode.lastPutCardNode.tag == lastPutCard)
        this.lastPutCardNode = playerNode.lastPutCardNode;   
};

/**
 *  处理麻将吃、碰、杠
 **/
majiang_panel.prototype.handleCommand = function(playerNode, msg, type){
    var tData = MjClient.data.sData.tData;
    var player = this.getPlayerInfoByName(playerNode.getName());
    if(msg && msg.uid && msg.uid != player.info.uid){
        return;
    }
    if(msg && msg.cpginfo && msg.cpginfo.id != player.info.uid){
        return;
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
    }
    MjClient.movingCard = null;
    this.checkPutCards(playerNode);
};

/**
 *  处理其他玩家打出的牌
 **/
majiang_panel.prototype.handleOtherPlayerCards = function(msg){
	if(!msg || msg.from === undefined){
		return;
	}
	var tData = MjClient.data.sData.tData;
    var fromNode = this.getUIBind(msg.from);
    this.removePutCardTip();
    if(this.lastPutCardNode && cc.sys.isObjectValid(this.lastPutCardNode)){
        this.lastPutCardNode.removeFromParent(true);
        this.lastPutCardNode = null;
    }
};

/**
 *  处理麻将吃牌
 **/
majiang_panel.prototype.dealChi = function(playerNode, msg) {
    var chiCard = msg.mjchiCard[msg.mjchiCard.length - 1];
    var cards = msg.mjchi;

    //处理所吃的牌所放的位置(目前放在中间)
    this.dealChiCardPos(chiCard, cards);
    var player = this.getPlayerInfoByName(playerNode.getName());
    for (var i = 0; i < cards.length; i++) {
        this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Chi, cards[i]);
        if (cards[i] == chiCard) {
            continue;
        }
        if (MjClient.rePlayVideo != -1 || playerNode.getName() == "node_down") {
            this.removeCard(playerNode, this.HandleCardType.Hand, cards[i]);
        } else {
            this.removeCard(playerNode, this.HandleCardType.Hand);
        }
    }

    this.resetCardLayout(playerNode);
    this.showEatActionAnim(playerNode, this.AnimationType.CHI);
};

/** 
 *  麻将吃的那张牌所放位置
 **/
majiang_panel.prototype.dealChiCardPos = function(chiCard, cards) {
    cards.sort(function(a, b) {
        return a - b;
    });
    var chiCardIndex = cards.indexOf(chiCard);
    if (chiCardIndex >= 0) {
        cards.splice(chiCardIndex,1);
        cards.splice(cards.length / 2, 0, chiCard);
    }
};

/**
 *  处理麻将听牌
 **/
majiang_panel.prototype.dealTing = function(playerNode, msg) {
    this.showEatActionAnim(playerNode, this.AnimationType.TING);
};

/**
 *  处理麻将碰牌
 **/
majiang_panel.prototype.dealPeng = function(playerNode, msg) {
	var tData = MjClient.data.sData.tData;
	var pengCard = tData.lastPutCard;
    if (MjClient.rePlayVideo != -1 || playerNode.getName() == "node_down") {
        this.removeCard(playerNode, this.HandleCardType.Hand, pengCard, 2);
    } else {
        this.removeCard(playerNode, this.HandleCardType.Hand, null, 2);
    }

    for (var i = 0; i < 3; i++) {
        this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Peng, pengCard); 
    }

    this.resetCardLayout(playerNode);
    this.showEatActionAnim(playerNode, this.AnimationType.PENG);

};

/**
 *  处理麻将杠牌
 **/
majiang_panel.prototype.dealGang = function(playerNode, msg) {
    switch (msg.gang) {
        case 1:
            this.dealMingGang(playerNode, msg);
            break;
        case 2:
            this.dealPengGang(playerNode, msg);
            break;
        case 3:
            this.dealAnGang(playerNode, msg);
            break;
        default:
            break;
    }
};

/**
 *  处理麻将明杠
 **/
majiang_panel.prototype.dealMingGang = function(playerNode, msg) {
    var gangCard = msg.card;
    
    if (MjClient.rePlayVideo != -1 || playerNode.getName() == "node_down") {
        this.removeCard(playerNode, this.HandleCardType.Hand, gangCard, 3);
    } else {
        this.removeCard(playerNode, this.HandleCardType.Hand, null, 3);
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
majiang_panel.prototype.dealAnGang = function(playerNode, msg) {
    var gangCard = msg.card;
    
    if (MjClient.rePlayVideo != -1 || playerNode.getName() == "node_down") {
        this.removeCard(playerNode, this.HandleCardType.Hand, gangCard, 4);
    } else {
        this.removeCard(playerNode, this.HandleCardType.Hand, null, 4);
    }

    for (var i = 0; i < 4; i++) {
        this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.AnGang, gangCard);
    }

    this.resetCardLayout(playerNode);
    this.showEatActionAnim(playerNode, this.AnimationType.GANG);
};

/**
 *  处理麻将碰杠
 **/
majiang_panel.prototype.dealPengGang = function(playerNode, msg) {
    var gangCard = msg.card;
    
    if (MjClient.rePlayVideo != -1 || playerNode.getName() == "node_down") {
        this.removeCard(playerNode, this.HandleCardType.Hand, gangCard);
        this.removeCard(playerNode, this.HandleCardType.Peng, gangCard, 3);
    } else {
        this.removeCard(playerNode, this.HandleCardType.Hand);
        this.removeCard(playerNode, this.HandleCardType.Peng, gangCard, 3);
    }

    for (var i = 0; i < 4; i++) {
        this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.PengGang, gangCard);
    }

    this.resetCardLayout(playerNode);
    this.showEatActionAnim(playerNode, this.AnimationType.GANG);
};

/**
 *  是否添加3D吃碰牌特效功能
 **/
majiang_panel.prototype.isNeedEatActionEffect3D = function() {
    return false;
}

/**
 *  吃碰杠胡动画
 **/
majiang_panel.prototype.showEatActionAnim = function(playerNode, actType) {
    var delayTime = 2;
    var animateNode = playerNode.getChildByName("node_animation");
    var nodeName = playerNode.getName();
    var callback = function (){
        animateNode.visible = false;
    };

    var isOpenEffect = this.get3DTeXiaoType();
    var projNode = null;
    var _scale = 1;
    if (isOpenEffect == 1 || !this.isNeedEatActionEffect3D()) {
        projNode = this.getEatSpineNode(actType);
        _scale = cc.winSize.height / 1280; //根据当前的屏幕的高度动态算缩放大小
    } else {
        projNode = this.getEatSpineNode3D(actType, nodeName);
        _scale = cc.winSize.height / 640;
        delayTime = 0.8;
    }
    projNode.setScale(_scale);

    animateNode.visible = true;
    animateNode.removeAllChildren();
    animateNode.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
    animateNode.addChild(projNode);
};

/**
 *  获取吃碰杠的骨骼动画
 **/
majiang_panel.prototype.getEatSpineNode = function(actType) { 
    var atlasSrc = "spine/" + actType + "/" + actType + ".atlas";
    var jsonSrc = "spine/" + actType + "/" + actType + ".json";

    // 输出的文件类型有两种，下面这种特意处理通用
    if(!jsb.fileUtils.isFileExist(atlasSrc)){
        atlasSrc = "spine/" + actType + "/skeleton.atlas";
        jsonSrc = "spine/" + actType + "/skeleton.json";
    }
    var projNode = createSpine(jsonSrc, atlasSrc);
    projNode.setAnimation(0, "idle", false);
    projNode.setTimeScale(1);
    projNode.setScale(0.5);
    return projNode;
};

/**
 *  获取3D吃碰杠的特效动画
 **/
majiang_panel.prototype.getEatSpineNode3D = function(actType, nodeName) { 
    cc.spriteFrameCache.addSpriteFrames("spine/new_chipengganghu/chipenggang0.plist", "spine/new_chipengganghu/chipenggang0.png");
    cc.spriteFrameCache.addSpriteFrames("spine/new_chipengganghu/chipenggang1.plist", "spine/new_chipengganghu/chipenggang1.png");
    ccs.armatureDataManager.addArmatureFileInfo("spine/new_chipengganghu/chipenggang.ExportJson");

    var projNode = new ccs.Armature("chipenggang");
    var action = (actType == MjClient.playui.AnimationType.HU || actType == MjClient.playui.AnimationType.ZIMO) ? MjClient.playui.AnimationType.HU : actType;
    if (action == MjClient.playui.AnimationType.HU) {
        if (nodeName === "node_down") {
            playEffect("shangdian_mic"); 
        } else {
            action = "huw";
        }
    }
    projNode.animation.play(action, -1, 0);
    return projNode;
};


/**
 * 切换23D的时候，有些数据需要处理
 */
majiang_panel.prototype.updata2DTo3DData = function(){
    MjClient.movingCard = null;
    this.hasClickBtn = false;
    this.lastPutCardNode = null;
};

/**
 *	刷洗听牌小箭头
 **/
majiang_panel.prototype.updateTingTips = function (){
	if(!this.isShowTingCards()){
		return;
	}

	var i, child, tingSign;
	var directNode = this.getNodeByOff();
	var children = directNode.children;
	for(i = 0;i < children.length;i++){
		child = children[i];
		tingSign = child.getChildByName("tingSign");
		if(child.name == this.HandleCardType.Hand && tingSign){
			tingSign.visible = false;
		}
	}


	if(!this.isTurnMe()){
		return;
	}
    
    var player = this.getPlayerInfoByName(directNode.getName());

	if(player.isTing) return;
    var maxTingCards = this.getMaxTingHandCards();
    for (i = 0; i < children.length; i++){
    	child = children[i];
    	if(child.name != this.HandleCardType.Hand){
    		continue;
    	}

        var tingCards = this.tingCardsArray[child.tag] ? this.tingCardsArray[child.tag] : {};
        if(Object.keys(tingCards).length == 0){
        	continue;
        }

        tingSign = child.getChildByName("tingSign");
        var cardSize = child.getContentSize();
        var tingSignFile = "playing/MJ/ting_tips.png";
        if(maxTingCards.indexOf(child.tag) >= 0){
            tingSignFile = "playing/other/tingcardmost.png";
        }
        if(tingSign){
            tingSign.loadTexture(tingSignFile);
        	tingSign.visible = true;
            tingSign.setPosition(cc.p(cardSize.width / 2, cardSize.height * 1.1));
        	continue;
        }

        tingSign = new ccui.ImageView(tingSignFile);
        tingSign.setName("tingSign");
        tingSign.setPosition(cc.p(cardSize.width / 2, cardSize.height * 1.1));
        child.addChild(tingSign, 10);
    }
};

/**
 *	处理结算
 **/
majiang_panel.prototype.handleRoundEnd = function(){
    var tData = MjClient.data.sData.tData;
    var niaoCards = tData.mopai;
    var self = this;
    if(MjClient.playui.isInGame()) return;
    var showEndCards = function(){
        if(niaoCards && niaoCards.length > 0){
            MjClient.Scene.addChild(self.getShowBirdView(niaoCards)); 
        }else {
            self.showBalanceLayer();
        }
    };

    var action = cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
        self.showMjhandBeforeEndOne();
    }),cc.delayTime(0.5),cc.callFunc(showEndCards));
    action.setTag(1179);
    self.runAction(action);

    UIEventBind(null, this, "initSceneData", function(){
        self.stopActionByTag(1179);
    });
    UIEventBind(null, this, "LeaveGame", function(){
        self.stopActionByTag(1179); 
    });
};

//创建翻鸟view
majiang_panel.prototype.getShowBirdView = function(niaoCards){
    var self = this;
    return new majiang_showBird(niaoCards,function(){
        self.showBalanceLayer();
    });
}

/**
 *  小结算之前手牌倒牌入口
 **/
majiang_panel.prototype.showMjhandBeforeEndOne = function(mjHuPlayerNodeName){
    if (mjHuPlayerNodeName) {
        this.cutDownCards(mjHuPlayerNodeName);
        return;
    } 

    for (var index = 0; index < this.NodeNameArray.length; index++) {

        var name = this.NodeNameArray[index];
        var player = this.getPlayerInfoByName(name);
        if(player.winType >0) continue; // 胡牌的人已经倒过牌了
        this.cutDownCards(name);
    }
};

majiang_panel.prototype.cutDownCards = function(playerNodeName){
    if (this.is3DStyle()) {
        this.showMjhandBeforeEndOne3D(playerNodeName);
    } else {
        this.showMjhandBeforeEndOne2D(playerNodeName);
    }
};

/**
 *  倒牌之后切换23D
 **/
majiang_panel.prototype.cutDownCardsBeforEndOneWhen23D = function(playerNode){
    var playerNodeName = playerNode.getName();
    var player = this.getPlayerInfoByName(playerNodeName);
    if(!player){
        return;
    }
    if(player.mjState !== TableState.roundFinish){
        return;
    }
    this.cutDownCards(playerNodeName);
};

/**
 *	显示小结算/大结算界面
 **/
majiang_panel.prototype.showBalanceLayer = function(){

    var tData = MjClient.data.sData.tData;
    var self = this;
    if (tData.roundNum <= 0){
        if(!tData.matchId){
            self.addChild(this.createGameOverPanel());
        }else{
            self.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                self.addChild(this.createGameOverPanel());
            })));
        }
    }
    self.addChild(this.createEndOnePanel());
};

/**
 * [createEndOnePanel 创建小结算界面]
 */
majiang_panel.prototype.createEndOnePanel = function(){
    return new majiang_winGamePanel();
};

/**
 * [createGameOverPanel 创建大结算界面]
 */
majiang_panel.prototype.createGameOverPanel = function(){
    return new majiang_gameOver();
};

/**
 * 设置东南西北的方位
 * @param arrowNode
 * @param isVisible
 */
majiang_panel.prototype.updateArrowIconDirection = function(arrowNode){
    var path = "playing/gameTable/dir_normal_";
    if (this.is3DStyle()) {
        path = "playing/gameTable/dir/dir_normal_";
    }
    var iconArray = ["img_east", "img_south", "img_west", "img_north"];
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var playerIndex = tData.uids.indexOf(this.getSelfUid());
    var playerNodeName = this.NodeNameArray[playerIndex];
    var defaultNodeIndex = this.DefaultNodeNameArray.indexOf(playerNodeName);
    var length = this.DefaultNodeNameArray.length;
    for(var i = 0;i < length;i++){
        var iconIndex = (i + defaultNodeIndex) % length;
        var arrowIcon = arrowNode.getChildByName(iconArray[i]);
        arrowIcon.loadTexture(path + iconIndex + ".png");
    }
};

/**
 *	显示计时器
 **/
majiang_panel.prototype.updateArrowNumber = function(node, tikNum){
    node.ignoreContentAdaptWithSize(true);
    if (MjClient.data.sData && MjClient.data.sData.tData.fieldCountdown){
        node.setString(""+MjClient.data.sData.tData.fieldCountdown);
    }else if (tikNum){
        node.setString("" + tikNum);
    }else{
        node.setString("10");
    }

    var tData = MjClient.data.sData.tData;
    var self = this;
    var scheduleCallFunc = function(){
        if(node.getString() == 0){
            node.stopAllActions();
        }else{
            var number = node.getString() - 1;
            var content = (Array(2).join(0) + number).slice(-2);
            node.setString(content);
            if(number == 0){
            	if(tData.uids[tData.curPlayer] == self.getSelfUid()){
                    self.playTimeUpEff = self.playEffect("loop_alarm", false);
                    MjClient.native.NativeVibrato();
            	}else{
            		postEvent("startOperWait");
            	}
            }
        }
    };
    node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1.0), cc.callFunc(scheduleCallFunc, node))));
};

/**
 *  点过的时候验证
 *  return {Boolean}
 **/
majiang_panel.prototype.checkWhenPass = function(){
    //todo 比如"有胡必胡"
    // var pl = this.getPlayerInfoByOff(0);
    // if(pl.mustHu){
    //     MjClient.showToast("有胡必胡");
    //     return true;
    // }
    return false;
};

/**
 *  发送过的命令给服务器
 *  return {void}
 **/
majiang_panel.prototype.clickPass = function(){
	var that = this;
    if (that.checkWhenPass()){
        return;
    }
    var player = that.getPlayerInfoByOff(0);
    if (that.isTurnMe()){
        var msg = "确认过 ";
        if (that.checkGangBtn(player)){
            msg += "杠 ";
        }
        if (player.eatFlag & 8){
            msg += "胡 ";
        }
        msg += "吗?";
        MjClient.showMsg(msg, function(){
            that.showPassHuTips();
            that.hideEatNodeChildren();
            that.sendPassToServer();
            if(that.checkGangBtn(player)){
                that.clickGangPass = true;
            }
        }, function() {}, "1");
    }else{
        if(player.eatFlag & 8){
            MjClient.showMsg("确认不胡吗?", function(){
                that.showPassHuTips();
                that.hideEatNodeChildren();
                that.sendPassToServer();
            }, function() {}, "1");
        }else{
            that.hideEatNodeChildren();
            that.sendPassToServer();
        }
    }
};

//过胡提示
majiang_panel.prototype.showPassHuTips = function(){
    var player = this.getPlayerInfoByName("node_down");
    var btn_hu = MjClient.playui.jsBind.node_eat.btn_hu._node;
    if((player.eatFlag & 8) > 0  && btn_hu.visible){
        MjClient.showToast("你选择了过，暂时放弃胡牌");
    }
};

/**
 *  根据nodeIndex获得麻将添加方向
 **/
majiang_panel.prototype.getDirectByNodeIndex = function(nodeIndex){
    var dir = 1;
    if(nodeIndex >= 2){
        dir = -1;
    }
    return dir;
};

/**
 *  获得吃、碰、杠的来源
 **/
majiang_panel.prototype.getOperateFrom = function(node, cardTag){
    var player = this.getPlayerInfoByName(node.getName());
    var index = this.getUidIndex(player.info.uid);
    var pengchigang = player.pengchigang;
    if(!pengchigang){
        return index;
    }
    for(var key in pengchigang){
        var valueArr = pengchigang[key];
        for(var i = 0;i < valueArr.length;i++){
            var value = valueArr[i];
            if(key == "pgang" && value.card == cardTag){
                return index;
            }
            if(value.card == cardTag){
                return value.pos;
            }            
        }
    }
    return index;
};

/**
 *  点炮添加闪电效果
 **/
majiang_panel.prototype.addLightEffect = function(netData){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uidIndex = tData.uids.indexOf(netData.uid);
    var playerNode = this.getUIBind(uidIndex);
    var player = sData.players[netData.uid];
    if(netData.huWord != "zimo" && cc.sys.isObjectValid(this.lastPutCardNode)){
        var lastPutCard = this.lastPutCardNode;
        lastPutCard.setVisible = true;
        var projNode2 = createSpine("spine/dianpao/skeleton.json", "spine/dianpao/skeleton.atlas");
        projNode2.setAnimation(0, 'idle', false);
        projNode2.setPosition(30,70);
        projNode2.setTimeScale(0.35);
        projNode2.setScale(1.5);
        lastPutCard.addChild(projNode2, 999999);
    }
};

// 设置游戏中，结束位置的头像
majiang_panel.prototype.setInGameHeadLayout = function(nodeName, layout_head){ 
    if(!layout_head || !nodeName) return;

    var addValue = 0;
    var headSize = [0.13,0.13];
    if(this.isIPhoneX()){
        addValue = 0.035;
    }

    if(this.isIPad()){
        headSize = [0.09,0.09];
    }

    var endPos = [0, 0];
    var endPos3D = [0, 0];

    // 游戏中位置
    if (nodeName == "node_down") {
        setWgtLayout(layout_head, headSize, [0 + addValue, 0], [0.6, 3], false, false);
        endPos3D = layout_head.getPosition();
        //3d
        setWgtLayout(layout_head, headSize, [0, 0], [1, 2.8], false, false);
        endPos = layout_head.getPosition();
    }else if(nodeName == "node_right"){
        setWgtLayout(layout_head, headSize, [1, 0.5], [-0.6, 1.7], false, false);
        endPos3D = layout_head.getPosition();
        //3d
        setWgtLayout(layout_head, headSize, [0.98, 0.5], [-0.6, 1.7], false, false);
        endPos = layout_head.getPosition();
    }else if(nodeName == "node_top"){
        var topheadPos = [0.28, 1];
        if(this.is3DStyle() && this.isIPad()){
            topheadPos = [0.22, 1];
        }
        setWgtLayout(layout_head, headSize, topheadPos, [0, -0.65], false, false);
        endPos3D = layout_head.getPosition();

        //3d
        setWgtLayout(layout_head,headSize, [0.26, 1], [0, -0.65], false, false);
        endPos = layout_head.getPosition();
    }else if(nodeName == "node_left"){
        setWgtLayout(layout_head, headSize, [0 + addValue, 0.5], [0.6, 1.7], false, false);
        endPos3D = layout_head.getPosition();
        //3d
        setWgtLayout(layout_head, headSize, [0, 0.5], [0.9, 2.35], false, false);
        endPos = layout_head.getPosition();
    }

    if (this.is3DStyle()) {
        layout_head.setPosition(endPos3D);
    }

    layout_head.setUserData({endPos: endPos, endPos3D: endPos3D});
};

// 设置初始值头像位置
majiang_panel.prototype.setInitHeadLayout = function(nodeName,layout_head) { 
    if(!layout_head || !nodeName) return;
    var headSize = [0.13,0.13];
    if(this.isIPad()){
        headSize = [0.09,0.09];
    }

   // 初始位置
    if (nodeName == "node_down") {
        setWgtLayout(layout_head, headSize, [0.5, 0.5], [2.3, -1.4], false, false);
    }else if(nodeName == "node_right"){
        setWgtLayout(layout_head, headSize, [0.5, 0.5], [2.3, 2], false, false);
    }else if(nodeName == "node_top"){
        setWgtLayout(layout_head, headSize, [0.5, 0.5], [-2.3, 2], false, false);
    }else if(nodeName == "node_left"){
        setWgtLayout(layout_head,headSize, [0.5, 0.5], [-2.3, -1.4], false, false);
    }
};

/**
 *  重置头像所在位置(初始位置)
 **/
majiang_panel.prototype.resetPlayerHeadLayout = function() { 
    for (var i = 0; i < this.NodeNameArray.length; i++) { 
        var node = this.getNodeByName(this.NodeNameArray[i]);
        var layout_head = node.getChildByName("layout_head");
        if(this.isInGame() || MjClient.rePlayVideo != -1){
            // 游戏中位置
            this.setInGameHeadLayout(node.getName(),layout_head); 
        }else{
            // 初始位置
            this.setInitHeadLayout(node.getName(),layout_head); 
        }
    }
};

/**
 *  摸牌及摸牌后动画
 **/
majiang_panel.prototype.playNewCardAction = function(nodeName, cardNode, pos){
    var player = this.getPlayerInfoByName(nodeName);
    if (!this.isCanPlayNewCardAction() || MjClient.rePlayVideo != -1 || !cardNode || (nodeName == "node_down" && !player.isNew)) {
        return false;
    }

    var cardNodeHeight = cardNode.getScale() * cardNode.getSize().height;
    var action = null;
    if (nodeName == "node_down") {
        cardNode.setPositionX(pos.x);
        cardNode.setPositionY(pos.y + 20);
        action = cc.sequence(cc.moveBy(0.1, cc.p(0, -20)), cc.callFunc(function() {
            cardNode.setPositionY(pos.y);
        }));
    } else {
        cardNode.setPosition(pos);
        var a1 = cc.moveBy(0.2, cc.p(0, cardNodeHeight * 0.15));
        var a2 = cc.moveBy(0.1, cc.p(0, -cardNodeHeight * 0.15));
        var a3 = cc.moveBy(0.2, cc.p(0, cardNodeHeight * 0.1));
        var a4 = cc.moveBy(0.2, cc.p(0, -cardNodeHeight* 0.1));
        action = cc.sequence(cc.delayTime(2), a1, a2, a3, a4).repeatForever();
    }
    action.setTag(1);
    cardNode.runAction(action);

    //防止出牌或者暗杠时删除的不是摸的牌，所以出牌时要停止其动画
    UIEventBind(null, cardNode, "MJPut", function (eD) {
        cardNode.stopActionByTag(1);
    });
    UIEventBind(null, cardNode, "MJGang", function (eD) {
        cardNode.stopActionByTag(1);
    });

    return true;
};

/**
 *  计算打牌插牌位置
 **/
majiang_panel.prototype.getInsertCardPosIndex = function (handcardUI, index) {
    var tagValue = handcardUI[index].tag;
    if(this.newCardNode && this.isHunCard(this.newCardNode.tag)){
        return 0;
    }

    if(this.newCardNode && tagValue >= this.newCardNode.tag && !this.isHunCard(tagValue)){
        return index;
    }

    return -1;
}

/**
 *  打牌插牌动画
 **/
majiang_panel.prototype.insertCardAnimation = function(){
    var nodeName = this.NodeNameArray[0];
    var node = this.getNodeByName(nodeName);
    if(!this.newCardNode || !cc.sys.isObjectValid(this.newCardNode) || MjClient.playui.clickTing){
        this.resetCardLayout(node);
        return;
    }

    var children = node.children, i;
    var handcardUI = [];
    for(i = 0; i < children.length; i++){
        var ci = children[i];
        if(ci.name == this.HandleCardType.Hand){
            handcardUI.push(ci);
        }
    }

    handcardUI.sort(function (a, b) {
        return (a.x  - b.x);
    });

    var emptyIdx = 0, emptyX = 0, newCardPosIdx = 0;
    for(i = 0; i < handcardUI.length; i++){
        if(handcardUI[i].x >= this.cardBeginPos.x){
            emptyIdx = i;
            emptyX = handcardUI[i].x;
            break;
        }
    }

    for(i = 0; i < handcardUI.length; i++){
        var posIndex = this.getInsertCardPosIndex(handcardUI, i);
        if (posIndex >= 0) {
            newCardPosIdx = posIndex;
            break;
        }
    }

    //移牌位置
    var templateHandCard = node.getChildByName(this.HandleCardType.Hand);
    var scale = 1;
    if(!this.is3DStyle()){
        scale = this.getHandCardSpaceScale();
    }
    var oneCardWidth  = this.newCardNode.width * this.newCardNode.scale * scale;
    var oneCardHeight = this.newCardNode.height * this.newCardNode.scale * 1.2;

    var moveDis = handcardUI[newCardPosIdx].x;
    if(newCardPosIdx > emptyIdx){
        moveDis = handcardUI[newCardPosIdx - 1].x;
    }else if(newCardPosIdx == emptyIdx){
        moveDis = this.cardBeginPos.x;
    }

    for(i = 0; i < handcardUI.length; i++){
        if(newCardPosIdx > emptyIdx){
            if(i >= emptyIdx && i < newCardPosIdx){
                handcardUI[i].runAction(cc.moveBy(0.3, cc.p(-oneCardWidth, 0)));
            }
        }else if(newCardPosIdx < emptyIdx){
            if(i < emptyIdx && i >= newCardPosIdx){
                handcardUI[i].runAction(cc.moveBy(0.3,cc.p(oneCardWidth,0)));
            }
        }
    }

    var moveDistance = Math.abs(moveDis - this.newCardNode.x);
    var moveTime =  (moveDistance / oneCardWidth ) * 0.05; //移过一张牌的时间为0.1秒 ,为了能均速

    var upAction   = cc.moveBy(0.1, cc.p(0, oneCardHeight));
    var moveAction =  cc.moveTo(0.3, cc.p(moveDis, templateHandCard.y + oneCardHeight));
    var downAction =  cc.moveTo(0.1, cc.p(moveDis, templateHandCard.y));
    var lastCardNode = handcardUI[handcardUI.length - 1];
    lastCardNode.isNew = false;
    lastCardNode.stopAllActions();
    //最后一个位置时，不用提上来，再放下去，直接横移过去
    if(newCardPosIdx == (handcardUI.length - 1)){
        moveTime =  0.5;//如果这个时间比上面的0.1秒还小的话，就会出现重叠的情况 remarked by sking
        moveAction =  cc.moveTo(moveTime, cc.p(moveDis, templateHandCard.y));
        lastCardNode.runAction(cc.sequence(moveAction, cc.delayTime(0.3),cc.callFunc(function () {
            MjClient.playui.resetCardLayout(node);
        })));
    }
    // 插牌动画需要倾斜
    else if(this.isNeedCardRotateAction()){
        var leftRotationAction = cc.rotateBy(0.1, 10);
        var rightRotationAction = cc.rotateBy(0.1, -10);
        var zorder = lastCardNode.getLocalZOrder();
        lastCardNode.setLocalZOrder(300);
        lastCardNode.runAction(cc.sequence(
            cc.spawn(leftRotationAction, upAction), moveAction, rightRotationAction, downAction,
            cc.callFunc(function () {
                lastCardNode.setLocalZOrder(zorder);
                MjClient.playui.resetCardLayout(node);
        })));
    }else{
        var currentZorder = lastCardNode.getLocalZOrder();
        lastCardNode.setLocalZOrder(300);
        lastCardNode.runAction(cc.sequence(upAction,moveAction,downAction,cc.delayTime(0.3),cc.callFunc(function () {
            lastCardNode.setLocalZOrder(currentZorder);
            MjClient.playui.resetCardLayout(node);
        })));
    }

    //摸牌时，停止所有动作
    UIEventBind(null, lastCardNode, "newCard", function () {
        lastCardNode.setRotation(0);
        lastCardNode.stopAllActions();
    });
};


/**
 * 添加出牌放大动画
 */
majiang_panel.prototype.putCardScaleAni = function(cardNode, off, endPoint, endCallBack) {
    var palyerNode = cardNode.getParent();
    var anim = palyerNode.getChildByName("node_animation");
    var is3D = MjClient.playui.is3DStyle();
    var mjType = this.getMaJiangBgType();
    var downNode = MjClient.playui.getNodeByName("node_down");
    var cardTag = cardNode.tag;
    var scaleNum = is3D ? 1 : 2;
    var showCard = this.createCard(downNode, this.CsdDefaultCardType.PutCardOne, "showCardd", cardTag);

    //3D麻将需要更新背景贴图
    if(is3D) {
        var url = "playing/MJ/MJBg3D" + (mjType + 1) + "/Mj_01.png";
        showCard.loadTexture(url);
    }
    var scale = cardNode.getScale();
    var zorder = cardNode.getZOrder();
    var showPos = anim.getPosition();
    var imageNode = showCard.getChildByName("cardImg");
    imageNode.setPositionPercent({x: 0.5, y: 0.6});

    if(!is3D) showCard.setLocalZOrder(500);
    showCard.setPosition(showPos);
    showCard.setScale(scaleNum * scale);
    showCard.setVisible(true);

    if(!is3D) cardNode.setLocalZOrder(500);
    cardNode.setPosition(showPos);
    cardNode.setScale(scaleNum * scale);
    cardNode.setVisible(false);

    showCard.runAction(cc.sequence(
        cc.delayTime(0.5),
        cc.callFunc(function () {
            if(showCard){
                showCard.setVisible(false);
                showCard.removeFromParent(true);
            }
        })
    ));

    cardNode.runAction(cc.sequence(
        cc.delayTime(0.5),
        cc.callFunc(function () {
            if(cardNode && cc.sys.isObjectValid(cardNode)){
                cardNode.visible = true;
            }
        }),
        cc.moveTo(0.1, endPoint), cc.scaleTo(0.1, scale),
        cc.callFunc(function () {
            if(cardNode && cc.sys.isObjectValid(cardNode)){
                cardNode.zIndex = zorder;
            }
            if(endCallBack) endCallBack();
        })
    ));
};



/**
 *  获得所有能看到的牌(所有玩家吃、碰、杠、打出去的牌以及自己的手牌)
 **/
majiang_panel.prototype.getAllTouchCards = function(){
    var i, j, cardArr = {};
    for(i = 0;i < this.NodeNameArray.length;i++){
        var nodeName = this.NodeNameArray[i];
        var player = this.getPlayerInfoByName(nodeName);
        if(!player) continue;
        var mjchi = player.mjchi;
        if(mjchi && mjchi.length > 0){
            for(j = 0;j < mjchi.length;j++){
                cardArr[mjchi[j]] = cardArr[mjchi[j]] ? cardArr[mjchi[j]] + 1 : 1;
            }
        }
        var mjpeng = player.mjpeng;
        if(mjpeng && mjpeng.length > 0){
            for(j = 0;j < mjpeng.length;j++){
                cardArr[mjpeng[j]] = cardArr[mjpeng[j]] ? cardArr[mjpeng[j]] + 3 : 3;
            }
        }
        var anGang = player.mjgang1;
        if(anGang && anGang.length > 0){
            for(j = 0;j < anGang.length;j++){
                cardArr[anGang[j]] = cardArr[anGang[j]] ? cardArr[anGang[j]] + 4 : 4;
            }
        }
        var mingGang = player.mjgang0;
        if(mingGang && mingGang.length > 0){
            for(j = 0;j < mingGang.length;j++){
                cardArr[mingGang[j]] = cardArr[mingGang[j]] ? cardArr[mingGang[j]] + 4 : 4;
            }
        }
        var mjput = player.mjput;
        if(mjput && mjput.length > 0){
            for(j = 0;j < mjput.length;j++){
                cardArr[mjput[j]] = cardArr[mjput[j]] ? cardArr[mjput[j]] + 1 : 1;
            }
        }
    }
    var selfPlayer = this.getPlayerInfoByOff();
    var handCards = selfPlayer.mjhand;
    for(i = 0;i < handCards.length;i++){
        cardArr[handCards[i]] = cardArr[handCards[i]] ? cardArr[handCards[i]] + 1 : 1;
    }
    return cardArr;
};

/**
 *  检测打出去的牌
 **/
majiang_panel.prototype.checkPutCards = function(playerNode){
    var cardArray = this.getCardNodeByName(playerNode, this.HandleCardType.Put);
    var player = this.getPlayerInfoByName(playerNode.getName());
    if(!player || !player.mjput || player.mjput.length == 0){
        return;
    }
    var i = 0;
    if(cardArray.length != player.mjput.length){
        this.removeCardsByName(playerNode, this.HandleCardType.Put);
        for(i = 0; i < player.mjput.length; i++){
            this.createCard(playerNode, this.CsdDefaultCardType.PutCardOne, this.HandleCardType.Put, player.mjput[i]);
        } 
        this.resetPutCards(playerNode);
        return;
    }
    
    var copyPuts = player.mjput.slice();
    for(i = 0;i < cardArray.length;i++){
        var cardTag = cardArray[i].tag;
        var index = copyPuts.indexOf(cardTag);
        if(index == -1){
            this.resetPutCards(playerNode);
            break;
        }
        if(index > -1){
            copyPuts.splice(index, 1);
        }
    }
};

/**
 *  检测手牌
 **/
majiang_panel.prototype.checkHandCards = function(playerNode){
    var cardArray = this.getCardNodeByName(playerNode, this.HandleCardType.Hand);
    var player = this.getPlayerInfoByName(playerNode.getName());
    if(!player || !player.mjhand || player.mjhand.length == 0){
        return;
    }
    var self = this, i = 0;
    var resetHandCards = function(){
        var children = playerNode.children;
        for (i = 0; i < children.length; i++) {
            if (children[i].name == self.HandleCardType.Hand) {
                children[i].removeFromParent();
            }
        }     
        for(i = 0; i < player.mjhand.length; i++){
            self.createCard(playerNode, self.CsdDefaultCardType.HandCard, self.HandleCardType.Hand, player.mjhand[i]);
        }
        self.resetCardLayout(playerNode);
        self.updateCardColorAfterTing(true);        
    };

    if(cardArray.length != player.mjhand.length){
        resetHandCards();
        return;
    }

    var copyHand = player.mjhand.slice();
    for(i = 0;i < cardArray.length;i++){
        var cardTag = cardArray[i].tag;
        var index = copyHand.indexOf(cardTag);
        if(index == -1){
            resetHandCards();
            break;
        }
        if(index > -1){
            copyHand.splice(index, 1);
        }
    }
};

/**
 * 点击听按钮的时候调用
 */
majiang_panel.prototype.clickTingBtn = function(){
    this.clickTing = true;
    var downNode = MjClient.playui.getNodeByOff(0);
    MjClient.playui.hideEatNodeChildren();
    var btn_cancel = MjClient.playui.jsBind.node_eat.btn_cancel._node;
    btn_cancel.visible = true; //点了听按钮后，要显示取消按钮
    downNode.getChildByName("img_tingCardsWithNum").visible = false;
    downNode.getChildByName("img_tingCards").visible = false;
    MjClient.playui.updateCardColorAfterTing();
};

/**
 * 实例化设置界面
 */
majiang_panel.prototype.createSettingView =  function(){
    return new setting_maJiang();
};

/**
 *  刷新手牌大小
 **/
majiang_panel.prototype.updateHandCardSize = function(node){
    var playNode = node.getParent();
    var is3D = this.is3DStyle();
    var maxPlayer = MjClient.playui.getMaxPlayer();
    var sizeType = this.getCardSizeType();
    if(playNode.getName() == "node_down"){
        if (sizeType == 0) {
            if (!is3D) {
                setWgtLayout(node, [0.069, 0], [0.05, 0], [0, 0.55]);
            } else {
                setWgtLayout(node, [0.053, 0], [0.5, 0], [8, 0.72]);
            }
        } else {
            if (!is3D) {
                setWgtLayout(node, [0.07, 0], [0.05, 0], [0, 0.55]);
            } else {
                setWgtLayout(node, [0.054, 0], [0.5, 0], [8, 0.72]);
            }
        } 
    }else if(playNode.getName() == "node_top"){
        if(!is3D){
            if(this.isIPad())
                setWgtLayout(node, [0, 0.07], [0.5, 1], [8, -1.3]);
            else
                setWgtLayout(node, [0, 0.09], [0.5, 1], [8, -1.3]);
        }else{
            if(maxPlayer == 4){
                setWgtLayout(node, [0, 0.07], [0.45, 0.98], [-6, -0.8]);
            }else if(maxPlayer == 2){
                setWgtLayout(node, [0, 0.07], [0.5, 1.04], [6, -1.4]);
            } 
        }
    }   
};

/**
 *  设置其他牌大小
 **/
majiang_panel.prototype.updateOtherCardSize = function(node){
    var is3D = MjClient.playui.is3DStyle();
    var maxPlayer = MjClient.playui.getMaxPlayer();
    var playNode = node.getParent();
    var _ds = 0;
    if(playNode.getName() == "node_down"){
        if(node.getName() == "img_eatFrontCard"){
            if(!is3D){
                setWgtLayout(node, [0.05, 0], [0.05, 0], [0, 0.55]);
            }else{
                setWgtLayout(node, [0.05, 0], [0, 0], [0.8, 0.5]);
            }
        }
        if(node.getName() == "img_putCardOne"){
            if(!is3D){
                if(MjClient.size.width / MjClient.size.height >= 1.5){
                    setWgtLayout(node, [0, 0.088], [0.506, 0], [-5, 3.3]);
                }else if(this.isIPad()){
                    setWgtLayout(node, [0, 0.075], [0.506, 0], [-6, 2.7]);
                }else{
                    setWgtLayout(node, [0, 0.08], [0.506, 0], [-1, 3.3]);
                }
            }else{
                _ds = this.isIPad() ? -0.01 : -0.005;
                if(maxPlayer == 4){
                    setWgtLayout(node, [0.0, 0.076 + _ds], [0.58, -0.07], [-7, 6.1]);
                }else if(maxPlayer == 3){
                    setWgtLayout(node, [0.0, 0.076 + _ds], [0.577, -0.03], [-7, 6.1]);
                }else if(maxPlayer == 2){
                    setWgtLayout(node, [0.0, 0.076 + _ds], [0.506, -0.03], [-7, 6.1]);
                } 
            } 
        }
    }
    if(playNode.getName() == "node_right"){
        if(node.getName() == "img_putCardOne"){
            if(!is3D){
                if(MjClient.size.width / MjClient.size.height >= 1.5){
                    setWgtLayout(node, [0, 0.063], [1, 0.5], [-5.8, -3.5]);
                }else if(this.isIPad()){
                    setWgtLayout(node, [0, 0.053], [1, 0.5], [-5.8, -4.5]);
                }else{
                    setWgtLayout(node, [0, 0.058], [1, 0.5], [-5.8, -4.5]);
                }
            }else{
                _ds = this.isIPad() ? -0.01 : 0;
                if(maxPlayer == 4){
                    setWgtLayout(node, [0, 0.056+ _ds], [0.9, 0.645], [-5.2, -4.0]);
                }else if(maxPlayer == 3){
                    setWgtLayout(node, [0, 0.056+ _ds], [0.839, 0.742], [-5.2, -4.0]);
                } 
            }
        }        
    }
    if(playNode.getName() == "node_top"){
        if(node.getName() == "img_eatFrontCard"){
            if(!is3D){
                setWgtLayout(node, [0, 0.08], [0.5, 1], [10, -1.4]);
            }else{
                if(maxPlayer == 4){
                    setWgtLayout(node, [0, 0.07], [0.5, 1.015], [6, -1.4]);
                }else if(maxPlayer == 2){
                    setWgtLayout(node, [0, 0.07], [0.5, 1.033], [6, -1.4]);
                }
            }            
        }
        if(node.getName() == "img_putCardOne"){
            if(!is3D){
                if(MjClient.size.width / MjClient.size.height >= 1.5){
                    setWgtLayout(node, [0, 0.088], [0.5, 1], [6, -2.6]);
                }else if(MjClient.playui.isIPad()){
                    setWgtLayout(node, [0, 0.075], [0.55, 1], [4.8, -2.3]);
                }else{
                    setWgtLayout(node, [0, 0.08], [0.5, 1], [4.8, -2.6]);
                }  
            }else{
                _ds = MjClient.playui.isIPad() ? -0.01 : 0;
                if(maxPlayer == 4){
                    setWgtLayout(node, [0, 0.07 + _ds], [0.51, 1.02], [4.1, -4.1]);
                }else if(maxPlayer == 2){
                    setWgtLayout(node, [0, 0.07 + _ds], [0.57, 0.98 ], [4.1, -4.1]);
                } 
            }
        } 
    }
    if(playNode.getName() == "node_left"){
        if(node.getName() == "img_eatFrontCard"){
            if(!is3D){
                setWgtLayout(node, [0, 0.058], [0.011, 1], [3.5, -1]); 
            }else{
                _ds = this.isIPad() ? -0.01 : 0;
                if(maxPlayer == 4){
                    setWgtLayout(node, [0, 0.056 + _ds], [0.125, 0.493], [5.2, 4.2]);
                }else if(maxPlayer == 3){
                    setWgtLayout(node, [0, 0.056 + _ds], [0.182, 0.592], [5.2, 4.2]);
                }                     
            }           
        }
        if(node.getName() == "img_putCardOne"){
            if(!is3D){
                if(MjClient.size.width / MjClient.size.height >= 1.5){
                    setWgtLayout(node, [0, 0.063], [0.05, 0.5], [4.8, 4.2]);
                }else if(this.isIPad()){
                    setWgtLayout(node, [0, 0.053], [0.05, 0.55], [4.8, 4.2]);
                }else{
                    setWgtLayout(node, [0, 0.058], [0.05, 0.5], [4.8, 4.2]);
                } 
            }else{
                _ds = this.isIPad() ? -0.01 : 0;
                if(maxPlayer == 4){
                    setWgtLayout(node, [0, 0.056+ _ds], [0.125, 0.493], [5.2, 4.2]);
                }else if(maxPlayer == 3){
                    setWgtLayout(node, [0, 0.056+ _ds], [0.182, 0.592], [5.2, 4.2]);
                }                    
            }
        } 
    }
};

/**
 * 3D牌桌添加吃、碰、杠、胡等按钮光晕特效
 * @param off
 */
majiang_panel.prototype.addLightAniEatBtns = function(){
    var isTexiao = this.get3DTeXiaoType();  // isTexiao 3D麻将特效：0代表开，1代表关
    if (isTexiao == 0) {
        // 新版动画 (吃/碰/杠/胡/过/听等等)
        cc.spriteFrameCache.addSpriteFrames("spine/new_chipengganghuBtn/chipengganganniu0.plist", "spine/new_chipengganghuBtn/chipengganganniu0.png");
        ccs.armatureDataManager.addArmatureFileInfo("spine/new_chipengganghuBtn/chipengganganniu.ExportJson");
    }
    var btnNameArray = ["btn_chi", "btn_peng", "btn_gang", "btn_ting", "btn_hu","btn_gang1"];
    var btnAniDict = 
    {
        "btn_chi" : "huang",
        "btn_peng" : "huang",
        "btn_gang" : "huang",
        "btn_ting" : "lv",
        "btn_hu" : "hong",
        "btn_gang1" : "huang"
    };
    var eatArr = MjClient.playui.jsBind.node_eat;
    for (var key in eatArr) {
        var eatNode = eatArr[key]._node;
        if(!eatNode){
            continue;
        }

        var eatNodeName = eatNode.name;
        if(btnNameArray.indexOf(eatNodeName) < 0){
            continue;
        }

        var showStatus = isTexiao == 0;
        var lightNode = eatNode.getChildByName("lightAni");
        if (lightNode) {
            lightNode.visible = showStatus;
            continue;
        }

        if(isTexiao == 1){
            continue;
        }

        var guangAni = new ccs.Armature("chipengganganniu");
        guangAni.name = "lightAni";
        guangAni.animation.play(btnAniDict[eatNodeName]);
        guangAni.setPosition(cc.p(eatNode.width/2, eatNode.height/2));
        eatNode.addChild(guangAni, 9999);
    }
};

/***
 * 播放筛子帧动画
 * @param node
 */
majiang_panel.prototype.addShaiZiAnimation = function (node) {
    var atlasSrc = "spine/shaizi/skeleton.atlas";
    var jsonSrc = "spine/shaizi/skeleton.json";
    var projNode = createSpine(jsonSrc, atlasSrc);
    projNode.setAnimation(0, "animation", false);
    projNode.setTimeScale(1);
    projNode.setScale(0.5);
    projNode.setPosition(cc.p(node.width/2, node.height/2));
    node.addChild(projNode);
};