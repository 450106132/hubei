var ShuffleCards = ccui.Widget.extend({

    ctor : function(){
        this._super();
        this.setContentSize(1280, 720);
        this._time = 0.1;

        // this.initCards();
        // this.doMoveEffect();
        // this.doMoveCopyEffect();

        this.setTouch(true);
    },
    setTouch : function(flg){
        if(cc.sys.isObjectValid(this)){
            this.setTouchEnabled(flg);
            this.setSwallowTouches(flg);
        }  
    },
    initCards : function(){
        this.removeAllChildren();

        this.cards1 = [];
        this.cards2 = [];
        this.cards3 = [];
        this.allCards = [];
        var arr = [this.cards1, this.cards2, this.cards3];

        //阴影
        var sp = new cc.Sprite("playing/ziPaiCut/paibeyi.png");
        sp.setAnchorPoint(0,1);
        sp.setOpacity(80);
        sp.x = this.width * 0.5 - sp.width * 0.5;
        sp.y = this.height * 0.5 + sp.height * 0.5 - 10;
        this.addChild(sp);
        this.allCards.push(sp);

        for(var i = 0; i < 33; i++) {
            var sp = new cc.Sprite("playing/ziPaiCut/normalBG.png");
            sp.setAnchorPoint(0,1);
            sp.x = this.width * 0.5 - sp.width * 0.5;
            sp.y = i*2.5 + this.height * 0.5 + sp.height * 0.5;
            // sp.x = this.width * 0.5 ;
            // sp.y = i*2 + this.height * 0.5;
            this.addChild(sp);
            this.allCards.push(sp);
        }

        this._mohuSp1 = new cc.Sprite("playing/ziPaiCut/mohu.png");
        this._mohuSp1.x = this.width * 0.5 - 100;
        this._mohuSp1.y = this.height * 0.5 + 30;
        this._mohuSp1.rotation = -8;
        this.addChild(this._mohuSp1, 0);

        this._mohuSp2 = new cc.Sprite("playing/ziPaiCut/mohu.png");
        this._mohuSp2.x = this.width * 0.5 + 100;
        this._mohuSp2.y = this.height * 0.5 + 30;
        this._mohuSp2.rotation = -35;
        this.addChild(this._mohuSp2, 0);
        this._mohuSp1.visible = false;
        this._mohuSp2.visible = false;
    },

    copyCards : function(cards){
        var len = cards.length;
        var arr = [];
        for(var i = 0; i < len; i++){
            var c = cards[i];
            var tempC = new cc.Sprite("playing/ziPaiCut/normalBG.png");
            this.addChild(tempC);
            tempC.x = c.x;
            tempC.y = c.y;
            tempC.setOpacity(10);
            arr.push(tempC);
        }
        return arr;
    },

    doMoveCopyEffect : function () {
        this.moveCards(this.cCards1,this._time, cc.p(0, 10));
        this.moveCards(this.cCards2,this._time, cc.p(0, 10));
        
        this.scheduleOnce(function(){
            this.moveCards(this.cCards1,this._time + 0.1, cc.p(80, 10));
        }, (this._time + 0.1) * 1);

        this.scheduleOnce(function(){
            this.moveCards(this.cCards1,this._time + 0.1, cc.p(0, -10));
            this.moveCards(this.cCards2,this._time + 0.1, cc.p(0, 10));
        }, (this._time + 0.1) * 2);

        this.scheduleOnce(function(){
            this.moveCards(this.cCards1,this._time + 0.1, cc.p(-80, -10));
            this.changeOrder(this.cCards2,1);
            this.moveCards(this.cCards2,this._time + 0.1, cc.p(0, 10));
        }, (this._time + 0.1) * 3);

        this.scheduleOnce(function(){
            var temp = this.cCards1;
            this.cCards1 = this.cCards2;
            this.cCards2 = temp;

            this.moveCards(this.cCards1,this._time + 0.1, cc.p(80, 10));
        }, (this._time + 0.1) * 4);
        this.scheduleOnce(function(){
            this.moveCards(this.cCards1,this._time + 0.1, cc.p(-80, -10));
            this.changeOrder(this.cCards2,1);
            this.moveCards(this.cCards2,this._time + 0.1, cc.p(0, 10));
        }, (this._time + 0.1) * 5);
        // return;
        // this.scheduleOnce(function(){
        //     this.moveCards(this.cCards1,this._time + 0.1, cc.p(-100, 0));
        //     this.moveCards(this.cCards2,this._time + 0.1, cc.p(100, -5));
        //     this.rotationCards(this.cCards1,this._time + 0.1, -15);
        //     this.rotationCards(this.cCards2,this._time + 0.1, 15);
        // }, (this._time) * 6);

        this.scheduleOnce(function(){
            this.moveGapCards(this.cCards1,this._time + 0.1, 0.4);
            this.moveGapCards(this.cCards2,this._time + 0.1, 0.4);
        }, (this._time + 0.1) * 7);
        //
        //
        // this.scheduleOnce(function(){
        //     this.rotationCards(this.cards1,this._time, 15);
        //     this.rotationCards(this.cards2,this._time, -15);
        // }, 2);

        this.scheduleOnce(function(){
            this.removeCards(this.cCards1);
            this.removeCards(this.cCards2);
        }, (this._time + 0.1) * 6);
    },

    doMoveEffect : function(cb, isAuto){
        this.initCards();

        isAuto = isAuto === undefined ? true : isAuto;
        this.cards1 = this.allCards.slice(22,34);
        this.cards2 = this.allCards.slice(11,22);

        this._yinY1 = new cc.Sprite("playing/ziPaiCut/paibeyi.png");
        this._yinY1.setAnchorPoint(0, 1);
        this._yinY1.setOpacity(100);
        this._yinY1.setLocalZOrder(-10);
        this._yinY1.x = this.cards1[0].x;
        this._yinY1.y = this.cards1[0].y - 15;
        this.addChild(this._yinY1);
        this.cards1.push(this._yinY1);

        this._yinY2 = new cc.Sprite("playing/ziPaiCut/paibeyi.png");
        this._yinY2.setAnchorPoint(0, 1);
        this._yinY2.setOpacity(100);
        this._yinY2.setLocalZOrder(-10);
        this._yinY2.x = this.cards2[0].x;
        this._yinY2.y = this.cards2[0].y - 15;
        this.addChild(this._yinY2);
        this.cards2.push(this._yinY2);

        // this.cCards1 = this.copyCards(this.cards1);
        // this.cCards2 = this.copyCards(this.cards2);

        this.moveCards(this.cards1,this._time, cc.p(0, 10));
        this.moveCards(this.cards2,this._time, cc.p(0, 10));
        this.setCascadeOpacityEnabled(true);

        this.scheduleOnce(function(){
            this.moveCards(this.cards1,this._time, cc.p(80, 20));
        }, this._time);

        this.scheduleOnce(function(){
            this.moveCards(this.cards1,this._time, cc.p(0, -20));
            this.moveCards(this.cards2,this._time, cc.p(0, 20));
        }, this._time * 2);

        this.scheduleOnce(function(){
            this.moveCards(this.cards1,this._time, cc.p(-80, -20));
            this.changeOrder(this.cards2,1);
            this.moveCards(this.cards2,this._time, cc.p(0, 20));
        }, this._time * 3);

        this.scheduleOnce(function(){
            var temp = this.cards1;
            this.cards1 = this.cards2;
            this.cards2 = temp;

            this.moveCards(this.cards1,this._time, cc.p(80, 20));
        }, this._time * 4);

        this.scheduleOnce(function(){
            this.moveCards(this.cards1,this._time, cc.p(0, -20));
            this.moveCards(this.cards2,this._time, cc.p(0, 20));
        }, this._time * 5);

        this.scheduleOnce(function(){
            this.moveCards(this.cards1,this._time, cc.p(-80, -20));
            this.changeOrder(this.cards2,1);
            this.moveCards(this.cards2,this._time, cc.p(0, 20));
        }, this._time * 6);

        this.scheduleOnce(function(){
            this.moveCards(this.cards1,this._time, cc.p(0, -30));
            this.moveCards(this.cards2,this._time, cc.p(0, -30));

            this.cards1 = [];
            this.cards2 = [];
            var arr = [this.cards1, this.cards2];
            for(var i = 0; i < this.allCards.length; i++) {
                var sp = this.allCards[i];
                sp.setLocalZOrder(i);
                if(i != 0){
                    sp.y -= i*1;
                }
                var cards = arr[i % 2];
                cards.push(sp);
            }

            this._yinY2.stopAllActions();
            this._yinY2.x = this.cards2[0].x;
            this._yinY2.y = this.cards2[0].y - 10;
            this.cards2.unshift(this._yinY2);
            this.allCards.unshift(this._yinY2);
        }, this._time * 7);

        this.scheduleOnce(function(){
            this.moveCards(this.cards1,this._time, cc.p(-100, 0));
            this.moveCards(this.cards2,this._time, cc.p(100, 17));
            this.rotationCards(this.cards1,this._time, -15);
            this.rotationCards(this.cards2,this._time, 15);
            this._yinY1.removeFromParent(true);
            // this._yinY2.removeFromParent(true);
        }, this._time * 8);

        this.scheduleOnce(function(){
            this.moveGapCards(this.cards1,this._time, 1.6);
            this.moveGapCards(this.cards2,this._time, 1.6);
        }, this._time * 9);

        this.scheduleOnce(function(){
            var t = this._time * 2;
            // this.rotationCards(this.cards1, t, 15, true);
            // this.rotationCards(this.cards2,t, -15,true);
            //
            // this.moveCards(this.cards1,t, cc.p(50, 30));
            // this.moveCards(this.cards2,t, cc.p(-50, -8));

            this.doSpawnCards(this.cards1, [cc.rotateTo(t,15), cc.moveBy(t, cc.p(50, 30))]);
            this.doSpawnCards(this.cards2, [cc.rotateTo(t,-15), cc.moveBy(t, cc.p(-50, -8))]);
        }, this._time * 10);

        this.scheduleOnce(function(){
            var t = 0.2;
            this.moveCards(this.cards1,t, cc.p(50, 0));
            this.moveCards(this.cards2,t, cc.p(-50, 20));
            // this.rotationCards(this.cards1,t, 10);
            // this.rotationCards(this.cards2,t, -10);
            // return;

            t += 0.4;
            this._mohuSp1.visible = true;
            this._mohuSp2.visible = true;
            this.moveCards([this._mohuSp1],t, cc.p(100, 15), true);
            this.moveCards([this._mohuSp2],t, cc.p(-100, 20), true);
            this.rotationCards([this._mohuSp1],t, this._mohuSp1.rotation - 13);
            this.rotationCards([this._mohuSp2],t, this._mohuSp2.rotation + 18);
        }, this._time * 13);
        // return;

        this.scheduleOnce(function(){
            var t = 0.2;

            this.rotationCards(this.cards1,t, 0);
            this.rotationCards(this.cards2,t, 0);
            // this.moveCards(this.cards2,t, cc.p(0, 20), true);
        }, this._time * 13 + 0.1);

        

        if(isAuto){
            this.scheduleOnce(function(){
                this._mohuSp1.removeFromParent(true);
                this._mohuSp2.removeFromParent(true);
                if(cb){
                    cb();
                }
                // this.visible = false;
            }, this._time * 13 + 0.5);
            this.schedule(this._delCard,0,cc.REPEAT_FOREVER,this._time * 13 + 0.5 + 0.1);
        }else{
            this.scheduleOnce(function(){
                this._mohuSp1.visible = false;
                this._mohuSp2.visible = false;
                
                var p = this.convertToNodeSpace(cc.p(MjClient.size.width * 0.1, MjClient.size.height * 0.44 + 223 * 0.5));
                var ac1 = cc.moveTo(0.2, p);
                var ac2 = cc.scaleTo(0.2, 0.8);
                this.doSpawnCards(this.allCards,[ac1, ac2]);
            }, this._time * 13 + 0.5);

            this.scheduleOnce(function(){
                if(cb){
                    cb();
                }
            }, this._time * 13 + 0.8);
        }
    },

    sendCardEffect : function(){
        this.initCards();
        this.schedule(this._delCard,0,cc.REPEAT_FOREVER);
    },

    _delCard : function(){
        var card = this.allCards.pop();
        if(!card){
            this.unschedule(this._delCard);
            return;
        }
        card.removeFromParent(true);
        card = null;
    },
    setCardsAnchorPoint : function(cards, aP){
        var len = cards.length;
        for(var i = 0; i < len; i++){
            var sp = cards[i];
            sp.setAnchorPoint(aP);
        }
    },

    changeOrder : function(cards,zOrder){
        var len = cards.length;
        for(var i = 0; i < len; i++){
            var sp = cards[i];
            if(sp == this._yinY1 || sp == this._yinY2){
                break;
            }
            sp.setLocalZOrder(zOrder);
        }
    },

    moveToCards : function(cards, dt, tP, isSpeed){
        var len = cards.length;
        for(var i = 0; i < len; i++){
            var sp = cards[i];
            if(isSpeed){
                sp.runAction(cc.moveTo(dt, tP).easing(cc.easeIn(dt)));
            }else{
                sp.runAction(cc.moveTo(dt, tP));
            }

        }
    },

    moveCards : function(cards, dt, tP, isSpeed){
        var len = cards.length;
        for(var i = 0; i < len; i++){
            var sp = cards[i];
            if(isSpeed){
                sp.runAction(cc.moveTo(dt,cc.p(sp.x + tP.x, sp.y + tP.y)).easing(cc.easeIn(dt)));
            }else{
                sp.runAction(cc.moveTo(dt,cc.p(sp.x + tP.x, sp.y + tP.y)));
            }

        }
    },
    rotationCards : function(cards, dt, angle, isSpeed){
        var len = cards.length;
        for(var i = 0; i < len; i++){
            var sp = cards[i];
            if(isSpeed){
                sp.runAction(cc.rotateTo(dt, angle).easing(cc.easeIn(dt)));
            }else {
                sp.runAction(cc.rotateTo(dt, angle));
            }
        }
    },

    moveGapCards : function(cards, dt, gap){
        var len = cards.length;
        for(var i = 0; i < len; i++){
            var sp = cards[i];
            sp.runAction(cc.moveTo(dt, cc.p(sp.x, sp.y + (i*gap))));
        }
    },

    removeCards : function(cards){
        var len = cards.length;
        for(var i = 0; i < len; i++){
            var sp = cards[i];
            sp.removeFromParent(true);
        }
    },
    
    doSpawnCards : function (cards, actions) {
        var len = cards.length;
        for(var i = 0; i < len; i++){
            var sp = cards[i];
            var acList = [];
            for(var j = 0; j < actions.length; j++){
                acList.push(actions[j].clone());
            }
            sp.runAction(cc.spawn(acList));
        }
    }
});

var COMMON_UI = COMMON_UI || {};
//邵阳APP会覆盖这个方法
COMMON_UI.createZiPaiCutCardView = function () {
    var cutCardLayer  = cc.Layer.extend({
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
                }
            }
        },
        jsBind2:{
            _event:{
                initSceneData:function (d){
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
                // this.cutCardsEffect(MjClient.playui._downNode);
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

        cutCardsEffect : function(posNode){
            if(MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA == MjClient.gameType){
                return;
            }

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
                this.handCutCards(posNode);
            }else{
                this.autoCutCards(posNode);
            }
        },

        playSound : function(src){
            reallyPlayEffect(src,false);
        },

        //系统自动发牌
        autoCutCards : function(posNode){
            var cb = function(){
                this._showDealHandCardsEffect(posNode);
                this.playSound("sound/shuffler/faPai.mp3");

                var tData = MjClient.data.sData.tData;
                if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI && tData.areaSelectMode.zuoXing){
                    var arr = [null, MjClient.playui._xingNode, MjClient.playui._rightNode, MjClient.playui._topNode];
                    for(var i = 0; i < arr.length; i++){
                        var pl = getUIPlayer_hengYang(i);
                        if(tData.uids[tData.xingPlayer] != pl.info.uid && arr[i]){
                            //醒节点不发牌
                            this._showDealHandCardsEffectOther(arr[i]);
                        }
                    }
                    
                }else{
                    if(MjClient.playui._topNode && MjClient.playui._topNode.visible){
                        this._showDealHandCardsEffectOther(MjClient.playui._topNode);
                    }
                    if(MjClient.playui._rightNode && MjClient.playui._rightNode.visible){
                        this._showDealHandCardsEffectOther(MjClient.playui._rightNode);
                    }
                    if(MjClient.playui._leftNode && MjClient.playui._leftNode.visible){
                        this._showDealHandCardsEffectOther(MjClient.playui._leftNode);
                    }
                    if(MjClient.playui._xingNode && MjClient.playui._xingNode.visible){

                        if(!MjClient.data.sData.tData.areaSelectMode.zuoXing){
                            this._showDealHandCardsEffectOther(MjClient.playui._xingNode);
                        }
                    }
                }
                
            }.bind(this);
            this.shuffleCards.setTouch(true);
            this.shuffleCards.doMoveEffect(cb);
        },

        //手动切牌前
        handCutCardsPre : function(posNode){
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

            if(MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA == MjClient.gameType){
                cb();
            }else{
               this.shuffleCards.doMoveEffect(cb, false); 
            }
            
        },
        //手动切牌后 发牌动画
        handCutCards : function(posNode){
            var cb = function(){
                this.playSound("sound/shuffler/faPai.mp3");
                this._showDealHandCardsEffect(posNode);
                if(MjClient.playui._topNode && MjClient.playui._topNode.visible){
                    this._showDealHandCardsEffectOther(MjClient.playui._topNode);
                }
                if(MjClient.playui._rightNode && MjClient.playui._rightNode.visible){
                    this._showDealHandCardsEffectOther(MjClient.playui._rightNode);
                }
                if(MjClient.playui._leftNode && MjClient.playui._leftNode.visible){
                    this._showDealHandCardsEffectOther(MjClient.playui._leftNode);
                }
                if(MjClient.playui._xingNode && MjClient.playui._xingNode.visible){

                    if(!MjClient.data.sData.tData.areaSelectMode.zuoXing){
                        this._showDealHandCardsEffectOther(MjClient.playui._xingNode);
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
                if(idx >= cNodeList.length){
                    this.unschedule(moveEffect);
                    return;
                }
                var cNode = cNodeList[idx];
                var wP = posNode.getParent().convertToWorldSpace(posNode.getChildByName("head").getPosition());
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
            }

            this.schedule(moveEffect, t);
        },

        //是否显示手牌
        _showOrHideHandCards : function(isShow){
            cc.log("_showOrHideHandCards  = " + isShow);
            MjClient.playui.isShufffling = !isShow;
            var cardNumImg = MjClient.playui.playuiNode.getChildByName("cardNumImg");
            var li_btn = MjClient.playui.playuiNode.getChildByName("li_btn");
            var handNode = MjClient.playui._downNode.getChildByName("handNode");
            var handCard = MjClient.playui._downNode.getChildByName("handCard");
            var huxiTxt = MjClient.playui._downNode.getChildByName("head").getChildByName("huxi");
            var cardArr = MjClient.HandCardArr;

            if(isShow){
                if(cardNumImg.oldScale){
                    cardNumImg.setScale(cardNumImg.oldScale);
                }
                li_btn.setTouchEnabled(true);

                var scale_x = handCard.scaleX;
                for(var i = 0; i < cardArr.length; i++){
                    var addNode = handNode.getChildByTag(i);
                    if(!addNode) continue;
                    var tag = 180501;
                    var huxi = addNode.getChildByTag(tag);
                    if(huxi){
                        huxi.visible = true;
                        if((MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA)
                            && util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE,0) === 0){
                            huxi.visible = false;
                        }
                    }
                    var children = addNode.getChildren();
                    for(var j = 0; j < children.length; j++){
                        var cNode = children[j];
                        cNode.setOpacity(255);
                    }
                }

                huxiTxt.visible = true;
                if(this.shuffleCards){
                    this.shuffleCards.setTouch(false);
                }

            }else{
                cardNumImg.oldScale = cardNumImg.getScale();
                cardNumImg.setScale(0);
                li_btn.setTouchEnabled(false);

                var scale_x = handCard.scaleX;
                for(var i = 0; i < cardArr.length; i++){
                    var addNode = handNode.getChildByTag(i);
                    if(!addNode) continue;
                    var tag = 180501;
                    var huxi = addNode.getChildByTag(tag);
                    if(huxi){
                        huxi.visible = false;
                    }
                    var children = addNode.getChildren();
                    for(var j = 0; j < children.length; j++){
                        var cNode = children[j];
                        cNode.setOpacity(0);
                    }
                }

                huxiTxt.visible = false;
            } 
        },

        //自己的手牌发牌效果
        _showDealHandCardsEffect : function(posNode){
            var handNode = posNode.getChildByName("handNode");
            // handNode.visible = false;
            var handCard = posNode.getChildByName("handCard");
            var cardArr = MjClient.HandCardArr;
            var width = handCard.getVirtualRendererSize().width;
            var scale_x = handCard.scaleX;
            var winSize = MjClient.size;
            var totalWidth = width * cardArr.length * scale_x;
            var cNodeList = [];
            for(var i = 0; i < cardArr.length; i++){
                var addNode = handNode.getChildByTag(i);
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
                
                var endP = cNode.getPosition();
                var p = cNode.getParent().convertToNodeSpace(cc.p(winSize.width * 0.5, winSize.height * 0.8));
                cNode.y = p.y;
                cNode.x = p.x;
                cNode.setOpacity(0);
                cNode.setCascadeOpacityEnabled(true);
                var ac = cc.moveTo(0.15,endP);
                var ac1 = cc.fadeIn(0.15);
                cNode.runAction(cc.spawn([ac, ac1]));
                idx += 1;
            }

            this.schedule(moveEffect, 0.02);
        }
    });
    return new (cutCardLayer);
}