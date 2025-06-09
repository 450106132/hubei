var Shuffle_ZiPai  = cc.Layer.extend({
    jsBind:{
        _event:{
            initSceneData:function (d){
                if (d.tData.tState == TableState.waitShuffle){
                    cc.log("chow", "createZiPaiCutCardView initSceneData");
                    this.initView();
                }else{
                    this._showOrHideHandCards(true);
                    this.visible = false;
                }
            },
            startShuffleCards:function (d) {
                cc.log("chow", "createZiPaiCutCardView startShuffleCards");
                this.initView();
            },
            select_shuffle_index:function (d) {
                this.updateViewByIndex(d.index);
            },
            endShuffleCards:function (d) {
                this.shuffleCards.stopAllActions();
                this.shuffleCards.unscheduleAllCallbacks();
                this.cutCardsByIndex(d.index);
            },
            HZPickCard: function() {
                MjClient.playui.refreshHandCard(0);
                this.unscheduleAllCallbacks();
                this._showOrHideHandCards(true);
            }
        }
    },
    jsBind2:{
        _event:{
            initSceneData:function (d){
                this._showOrHideHandCards(true);
            },
            HZPickCard: function() {
                MjClient.playui.refreshHandCard(0);
                this.unscheduleAllCallbacks();
                this._showOrHideHandCards(true);
            }
        }
    },
    ctor:function () {
        this._super();

        var tData = MjClient.data.sData.tData;
        if(tData.areaSelectMode.isManualCutCard){
            // this.setVisible(false);
            BindUiAndLogic(this, this.jsBind);
        }else{
            BindUiAndLogic(this, this.jsBind2);
            this.initShuffleCards();
            // this.cutCardsEffect(nodeDown);
        }
        
        this.cardsInfo = {width : 62 / 1280 * MjClient.size.width, height : 180 / 1280 * MjClient.size.width, space: 12 / 1280 * MjClient.size.width};
    },

    initShuffleCards : function(){
        this.shuffleCards = new ShuffleCards();
        this.shuffleCards.setAnchorPoint(0.5,0.5);
        this.shuffleCards.visible = false;
        this.addChild(this.shuffleCards);
        setWgtLayout(this.shuffleCards,[1,1],[0.5,0.5],[0,0]);
    },

    initView:function () {
        this.removeAllChildren();
        this.initShuffleCards();
        this.setVisible(true);
        this.isShuffler = SelfUid() == MjClient.data.sData.tData.uids[MjClient.data.sData.tData.shuffler];
        this.cardCount = MjClient.majiang.getAllCardsTotal(MjClient.data.sData.tData) ;
        this.shuffler = MjClient.data.sData.players[MjClient.data.sData.tData.uids[MjClient.data.sData.tData.shuffler]];
        cc.log("chow", "createZiPaiCutCardView initView" + " isShuffler = " + this.isShuffler + " cardCount = " + this.cardCount);

        if(this.isShuffler){
            this.initCutCardButton();
        }else{
            this.initCutCardTip();
        }
        this.initCardsAndHand();
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function(touch, event)
            {
                return this.onTouchBegan(touch, event);
            }.bind(this),
            onTouchMoved: function (touch, event) {
                this.onTouchMoved(touch, event);
            }.bind(this),
            onTouchEnded: function (touch, event) {

            }
        });
        cc.eventManager.addListener(this.listener, this);

        this.handCutCardsPre();
    },
    initCutCardButton:function() {
        this.cutCardButton = new ccui.Button();
        this.cutCardButton.setTouchEnabled(true);
        this.cutCardButton.setPressedActionEnabled(true);
        this.cutCardButton.loadTextures("playing/ziPaiCut/cutCard_btn.png", "playing/ziPaiCut/cutCard_btn.png", "playing/ziPaiCut/cutCard_btn.png");
        this.addChild(this.cutCardButton);
        setWgtLayout(this.cutCardButton,[172 / 1280,72 / 720],[0.5,0.2],[0,0],true);

        this.cutCardButton.addTouchEventListener(function (sender,eventType) {
            if(eventType == ccui.Widget.TOUCH_ENDED){
                //发送切牌消息
                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "ZPEndShuffleCards",
                    index:this.targetIndex
                });
            }
        }.bind(this));

        this.cutCardButton.visible = false;
    },
    initCutCardTip:function() {
        this.cutCardTip = new ccui.Text();
        this.cutCardTip.setFontSize(30);
        this.addChild(this.cutCardTip);
        this.cutCardTip.setString("等待‘"+ unescape(this.shuffler.info.nickname) +"’切牌");
        setWgtLayout(this.cutCardTip,[this.cutCardTip.getContentSize().width / 1280,this.cutCardTip.getContentSize().height / 720],[0.5,0.2],[0,0],true);
    },
    initCardsAndHand:function() {
        this.cardsNode = new cc.Node();
        this.cardsNode.setAnchorPoint(0, 0);
        this.addChild(this.cardsNode);
        this.cardList = [];

        for(var i = 0; i < this.cardCount; i++){
            var card = new cc.Sprite("playing/ziPaiCut/cutCard_card.png");
            card.setScale(this.cardsInfo.width / card.getContentSize().width);
            this.cardsNode.addChild(card);
            card.setAnchorPoint(0, 0);
            card.setPosition(cc.p((i - 1) * this.cardsInfo.space, 0));
            card.visible = false;

            this.cardList.push(card);
        }
        this.cardsNode.setPosition(cc.p((MjClient.size.width - (this.cardCount - 1) * this.cardsInfo.space - this.cardsInfo.width) / 2, MjClient.size.height / 2));
        this.cardRect = new cc.rect(this.cardsNode.x, this.cardsNode.y , (this.cardCount - 1) * this.cardsInfo.space + this.cardsInfo.width, this.cardsInfo.height);
        cc.log("chow", "x = " + this.cardsNode.x + " y = " + this.cardsNode.y);
        this.finger = new cc.Sprite("playing/ziPaiCut/cutCard_finger.png");
        this.finger.setAnchorPoint(0.2, 1);
        this.finger.setScale(MjClient.size.width / 1280/*, MjClient.size.height / 720*/);
        this.addChild(this.finger);
        this.finger.setPosition(cc.p(this.cardsNode.x, this.cardsNode.y));
        this.finger.visible = false;

        this.indexTip = new ccui.Text();
        this.indexTip.setAnchorPoint(0.5, 0);
        this.indexTip.setFontSize(30);
        this.indexTip.setScale(MjClient.size.width / 1280/*, MjClient.size.height / 720*/);
        this.addChild(this.indexTip);
        this.indexTip.setPosition(cc.p(this.cardsNode.x, this.cardsNode.y + this.cardsInfo.height));

        this.targetIndex = 0;
        this.updateViewByIndex(this.targetIndex);
    },
    onTouchBegan:function (touch, event) {
        if(!this.isShuffler || MjClient.data.sData.tData.tState != TableState.waitShuffle){
            return false;
        }
        var point = touch.getLocation();
        if(cc.rectContainsPoint(this.finger.getBoundingBox(), point)){
            return true;
        }else if(cc.rectContainsPoint(this.cardRect, point)){
            this.updateViewByIndex(this.getIndexByPoint(point));
            return true;
        }
        return false;
    },
    onTouchMoved:function (touch, event) {
        var point = touch.getLocation();
        this.updateViewByIndex(this.getIndexByPoint(point));
    },
    getIndexByPoint:function(point){
        if(point.x < this.cardsNode.x || point.x > this.cardsNode.x + this.cardRect.width - this.cardsInfo.width){
            return -1;
        }
        return Math.floor((point.x - this.cardsNode.x) / this.cardsInfo.space);
    },
    updateViewByIndex: function(index){
        if(index < 0 || index > this.cardCount){
            return;
        }
        this.targetIndex = index;

        this.indexTip.setString("第" + (index + 1) + "张");
        this.indexTip.x = this.cardsNode.x + index * this.cardsInfo.space;

        this.finger.x = this.cardsNode.x + index * this.cardsInfo.space;

        for(var i = 0; i < this.cardList.length; i++){
            if(i <= index){
                this.cardList[i].setColor(MjClient.grayColor);
            }else{
                this.cardList[i].setColor(MjClient.whiteColor);
            }
        }
    },
    cutCardsByIndex:function(index){
        this.targetIndex = index;
        this.indexTip.runAction(cc.fadeOut(0.1));
        this.finger.runAction(cc.fadeOut(0.1));
        if(this.isShuffler){
            this.cutCardButton.runAction(cc.fadeOut(0.1));
        }
        if(!this.isShuffler){
            this.cutCardTip.runAction(cc.fadeOut(0.1));
        }
        for(var i = 0; i < this.cardList.length; i++){
            if(i <= index){
                this.cardList[i].runAction(cc.sequence(cc.moveBy(0.1, cc.p(-100 / 1280 * MjClient.size.width, 0)),cc.callFunc(function () {
                    this.runAction(cc.fadeOut(0.2));
                }.bind(this.cardList[i]))));
            }else{
                this.cardList[i].runAction(cc.sequence(cc.moveBy(0.1, cc.p(50 / 1280 * MjClient.size.width, 0)), cc.callFunc(function () {
                    this.runAction(cc.fadeOut(0.2));
                }.bind(this.cardList[i]))));
            }
        }
        this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
            this.cardScaleByIndex();
        }.bind(this))));
    },
    cardScaleByIndex:function () {
        cc.eventManager.removeListener(this.listener);
        for(var i = 0; i < this.targetIndex; i++){
            this.cardList[i].runAction(cc.sequence(cc.moveTo(0.4, this.cardList[this.targetIndex].getPosition()).easing(cc.easeOut(0.4)), cc.callFunc(function () {
                this.removeFromParent();
            }.bind(this.cardList[i]))));
        }
        this.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(function () {
            this.removeAllChildren();
        }.bind(this))));
    },

    cutCardsEffect : function(){
        // if(MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA == MjClient.gameType){
        //     return;
        // }

        if(!this.shuffleCards || !cc.sys.isObjectValid(this.shuffleCards)){
            return;
        }

        this._showOrHideHandCards(false);
        if(this.shuffleCards && cc.sys.isObjectValid(this.shuffleCards)){
            this.shuffleCards.visible = true;
        }

        var sData = MjClient.data.sData;
        var tData = sData.tData;
        if(tData.areaSelectMode.isManualCutCard){
            this.handCutCards();
        }else{
            if((MjClient.playui.isChargeShuffle && MjClient.playui.isChargeShuffle()) ||
                MjClient.GAME_TYPE.SHAO_YANG_BO_PI == MjClient.gameType ||
                MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI == MjClient.gameType ||
                MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA == MjClient.gameType ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ &&
                (MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || 
                 MjClient.gameType === MjClient.GAME_TYPE.PAO_HU_ZI || 
                 MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
                 MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR ||
                 MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King ||  
                 MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King ||  
                 MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King)){
                //小结算洗牌
                this.shuffleCutCards();
            }else {
                this.autoCutCards();
            }
        }
    },

    playSound : function(src){
        reallyPlayEffect(src,false);
    },

    //系统自动发牌
    shuffleCutCards : function(){
        var cb = function(){
            this.playSound("sound/shuffler/faPai.mp3");
            var num = MjClient.playui.getPlayersNum();
            for(var i = 0; i < num; i++){
                var node = MjClient.playui.getUINode(i);
                if(node.getName() == "node_down"){
                    this._showDealHandCardsEffect(node);
                }else{
                    if(MjClient.data.sData.tData.areaSelectMode.zuoXing && node.getName() == "node_xing"){
                        //坐醒不发牌
                        continue;
                    }
                    this._showDealHandCardsEffectOther(node);
                }
                
            }
        }.bind(this);

        cb();
    },

    //系统自动发牌
    autoCutCards : function(){
        var cb = function(){
            this.playSound("sound/shuffler/faPai.mp3");
            var num = MjClient.playui.getPlayersNum();
            for(var i = 0; i < num; i++){
                var node = MjClient.playui.getUINode(i);
                if(node.getName() == "node_down"){
                    this._showDealHandCardsEffect(node);
                }else{
                    if(MjClient.data.sData.tData.areaSelectMode.zuoXing && node.getName() == "node_xing"){
                        //坐醒不发牌
                        continue;
                    }
                    this._showDealHandCardsEffectOther(node);
                }
                
            }
        }.bind(this);
        this.shuffleCards.setTouch(true);
        this.shuffleCards.doMoveEffect(cb);
    },

    //手动切牌前
    handCutCardsPre : function(){
        this.shuffleCards.visible = true;
        var cb = function(){
            this.shuffleCards.visible = false;
            this.playSound("sound/shuffler/qiePai.mp3");

            var handSp = new cc.Sprite("playing/ziPaiCut/shou1.png");
            this.cardsNode.addChild(handSp);
            setWgtLayout(handSp,[135/1280,0],[0,0],[0,0]);
            handSp.setAnchorPoint(0.5,0);
            var card = this.cardList[0];
            handSp.x = card.x;
            handSp.y = card.y;
            card = this.cardList[this.cardList.length - 1];
            handSp.runAction(cc.moveTo(0.2, cc.p(card.x, handSp.y)));
            handSp.schedule(function(){
                // handSp.x += 25;
                if(!handSp || !cc.sys.isObjectValid(handSp)) {
                    return;
                }
                for(var i = 0; i < this.cardList.length; i++){
                    var c = this.cardList[i];
                    if(!c || !cc.sys.isObjectValid(c)) {
                        break;
                    }
                    if(c.x <= handSp.x){
                        c.visible = true;
                    }
                }
                if(handSp.x >= card.x){
                    handSp.unscheduleAllCallbacks();
                    handSp.scheduleOnce(function(){
                        handSp.removeFromParent(true);
                        handSp = null;
                        this.finger.visible = true;
                        if(this.cutCardButton && cc.sys.isObjectValid(this.cutCardButton)){
                            this.cutCardButton.visible = true;
                        }
                    }.bind(this),0.2);
                }
            }.bind(this),0, cc.REPEAT_FOREVER);

        }.bind(this);

        // if(MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA == MjClient.gameType){
            // cb();
        // }else{
           this.shuffleCards.doMoveEffect(cb, false); 
        // }
        
    },
    //手动切牌后 发牌动画
    handCutCards : function(posNode){
        var cb = function(){
            this.playSound("sound/shuffler/faPai.mp3");
            var num = MjClient.playui.getPlayersNum();
            for(var i = 0; i < num; i++){
                var node = MjClient.playui.getUINode(i);
                if(node.getName() == "node_down"){
                    this._showDealHandCardsEffect(node);
                }else{
                    if(MjClient.data.sData.tData.areaSelectMode.zuoXing && node.getName() == "node_xing"){
                        //坐醒不发牌
                        continue;
                    }
                    this._showDealHandCardsEffectOther(node);
                }
                
            }
        }.bind(this);
        this.shuffleCards.sendCardEffect();
        cb();
    },

    //其他玩家的手牌发牌效果
    _showDealHandCardsEffectOther : function(posNode){
        var len = 5;
        var cNodeList = [];
        var winSize = MjClient.size;
        var p = this.convertToNodeSpace(cc.p(winSize.width * 0.5, winSize.height * 0.8));
        for(var i = 0; i < len; i++){
            var cNode = new MoveShadowSprite("playing/ziPaiCut/normalBG.png");
            this.addChild(cNode);
            setWgtLayout(cNode,[cNode.width / 1280,0],[0.5,0.6],[0,0]);
            cNode.y = p.y;
            cNode.x = p.x;
            cNode.visible = false;
            cNodeList.push(cNode);
        }

        var idx = 0;
        var allT = 0.5;
        var t = 0.03;
        var moveEffect = function(){
            try {
                if(idx >= cNodeList.length){
                    this.unschedule(moveEffect);
                    return;
                }
                var cNode = cNodeList[idx];
                var wP = posNode.getParent().convertToWorldSpace(posNode.getChildByName("layout_head").getPosition());
                var endP =  this.convertToNodeSpace(wP);
                var gapX = 50;
                if(endP.x > cNode.x){
                    endP.x -= gapX;
                }else{
                    endP.x += gapX;
                }

                cNode.visible = true;
                cNode.setOpacity(100 - idx * 2);
                cNode.setCascadeOpacityEnabled(true);
                var dt = allT - t * idx;
                var ac1 = cc.moveTo( dt,endP);
                var ac2 = cc.scaleTo(dt, 0.1);
                var cB = cc.callFunc(function(){
                    this.removeFromParent(true);
                }.bind(cNode));
                cNode.runAction(cc.sequence(cc.spawn([ac1, ac2]), cB));
                idx += 1;
            } catch (e) {
                for(var i = 0; i < cNodeList.length; i++) {
                    var cNode = cNodeList[i];
                    if(cNode && cc.sys.isObjectValid(cNode)) {
                        cNode.removeFromParent(true);
                    }
                }
                this.unschedule(moveEffect);
            }
            
        }

        this.schedule(moveEffect, t);
    },

    //是否显示手牌
    _showOrHideHandCards : function(isShow){
        cc.log("_showOrHideHandCards  = " + isShow);
        MjClient.playui.isShufffling = !isShow;
        var cardNumImg = MjClient.playui.jsBind._node.getChildByName("layout_cardNum");
        var btn_sort = MjClient.playui.jsBind._node.getChildByName("btn_sort");
        var nodeDown = MjClient.playui.jsBind.node_down._node;
        var huxiTxt = nodeDown.getChildByName("layout_head").getChildByName("text_huXiNum");
        var cardArr = MjClient.HandCardArr || [];

        if(isShow){
            if(cardNumImg.oldScale){
                cardNumImg.setScale(cardNumImg.oldScale);
            }
            btn_sort.setTouchEnabled(true);
            huxiTxt.visible = true;
            if(this.shuffleCards){
                this.shuffleCards.setTouch(false);
            }

        }else{
            cardNumImg.oldScale = cardNumImg.getScale();
            cardNumImg.setScale(0);
            btn_sort.setTouchEnabled(false);
            huxiTxt.visible = false;
        } 
    },

    //自己的手牌发牌效果
    // _showDealHandCardsEffect : function(posNode){
    //     var layout_handCards = posNode.getChildByName("layout_handCards");
    //     // layout_handCards.visible = false;
    //     var handCard = posNode.getChildByName("img_handCard");
    //     var cardArr = MjClient.HandCardArr;
    //     var width = handCard.getVirtualRendererSize().width;
    //     var scale_x = handCard.scaleX;
    //     var winSize = MjClient.size;
    //     var totalWidth = width * cardArr.length * scale_x;
    //     var cNodeList = [];
    //     for(var i = 0; i < cardArr.length; i++){
    //         var addNode = layout_handCards.getChildByTag(i);
    //         if(!addNode) continue;
    //         var children = addNode.getChildren();
    //         cNodeList = cNodeList.concat(addNode.getChildren());
    //         for(var j = 0; j < children.length; j++){
    //             var cNode = children[j];
    //             cNode.setOpacity(0);
    //         }
    //     }
    //     cNodeList.sort(function(c1, c2){
    //         return c1.y - c2.y;
    //     });

    //     var idx = 0;
    //     var self = this;
    //     var moveEffect = function(){
    //         var cNode = cNodeList[idx];
    //         if(idx >= cNodeList.length || !cNode || !cc.sys.isObjectValid(cNode)){
    //             this.unschedule(moveEffect);
                
    //             self._showOrHideHandCards(true);
    //             return;
    //         }
            
    //         try {
    //             var endP = cNode.getPosition();
    //             var p = cNode.getParent().convertToNodeSpace(cc.p(winSize.width * 0.5, winSize.height * 0.8));
    //             cNode.y = p.y;
    //             cNode.x = p.x;
    //             cNode.setOpacity(0);
    //             cNode.setCascadeOpacityEnabled(true);
    //             var ac = cc.moveTo(0.15,endP);
    //             var ac1 = cc.fadeIn(0.15);
    //             cNode.runAction(cc.spawn([ac, ac1]));
    //             idx += 1;
    //         } catch (e) {
    //             MjClient.playui.refreshHandCard(0);
    //             self.unschedule(moveEffect);
    //             self._showOrHideHandCards(true);
    //         }
            
    //     }

    //     this.schedule(moveEffect, 0.02);
    // },


    _copyHandCards : function(posNode) {
        var layout_handCards = posNode.getChildByName("layout_handCards");
        var layout_handCards_temp = posNode.getChildByName("layout_handCards_temp");
        var cardArr = MjClient.HandCardArr;
        for(var i = 0; i < cardArr.length; i++){
            var addNode = layout_handCards.getChildByTag(i);
            if(!addNode) continue;
            var node = new cc.Node();
            node.width = addNode.width;
            node.x = addNode.x;
            node.y = addNode.y;
            node.tag = addNode.tag;
            layout_handCards_temp.addChild(node);

            var children = addNode.getChildren();
            for(var j = 0; j < children.length; j++){
                var cNode = children[j];
                if(!cNode.clone){
                    //胡息节点（cc.sprite);
                    continue;
                }
                var tempC = cNode.clone();
                var src = MjClient.playui.getCardSrc("hand", tempC.tag, false);
                tempC.setTouchEnabled(false);
                MjClient.playui.loadCardTexture(tempC, src, MjClient.playui.getResType());
                node.addChild(tempC);
            }
        }
    },

    //自己的手牌发牌效果
    _showDealHandCardsEffect : function(posNode){
        this._copyHandCards(posNode);
        var layout_handCards = posNode.getChildByName("layout_handCards_temp");
        var cardArr = MjClient.HandCardArr;

        var cNodeList = [];
        for(var i = 0; i < cardArr.length; i++){
            var addNode = layout_handCards.getChildByTag(i);
            if(!addNode) continue;
            var children = addNode.getChildren();
            cNodeList = cNodeList.concat(addNode.getChildren());
            for(var j = 0; j < children.length; j++){
                var cNode = children[j];
                cNode.setOpacity(0);
            }
        }
        cNodeList.sort(function(c1, c2){
            return c1.y - c2.y;
        });

        var idx = 0;
        var self = this;
        var moveEffect = function(){
            var cNode = cNodeList[idx];
            if(idx >= cNodeList.length || !cNode || !cc.sys.isObjectValid(cNode)){
                this.unschedule(moveEffect);
                
                self._showOrHideHandCards(true);
                return;
            }
            
            try {
                var endP = cNode.getPosition();
                var winSize = MjClient.size;
                var p = cNode.getParent().convertToNodeSpace(cc.p(winSize.width * 0.5, winSize.height * 0.8));
                cNode.y = p.y;
                cNode.x = p.x;
                cNode.setOpacity(0);
                cNode.setCascadeOpacityEnabled(true);
                var ac = cc.moveTo(0.15,endP);
                var ac1 = cc.fadeIn(0.15);
                cNode.runAction(cc.spawn([ac, ac1]));
                idx += 1;
            } catch (e) {
                cc.log(e);
                MjClient.playui.refreshHandCard(0);
                self.unschedule(moveEffect);
                self._showOrHideHandCards(true);
            }
            
        }

        this.schedule(moveEffect, 0.02);
    }
});