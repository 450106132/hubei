// 潜江晃晃麻将

var majiang_panel_qianJiangHHMJ;
(function() {
    majiang_panel_qianJiangHHMJ = majiang_panel_hubei.extend({

        _huanPaiUpNum: 0,

        getJsBind: function(){
            var jsBind = {
                img_roomInfo3D:{
                    img_chaopaiBg: {
                        _run: function() {
                            this.visible = false;
                        },
                        _event: {
                            clearCardUI: function() {
                                this.visible = false;
                            },
                            initSceneData: function() {
                                this.setChaoCard3D();
                            },
                            mjhand: function() {
                                this.setChaoCard3D();
                            },
                            changeMJBgEvent: function() {
                                this.setChaoCard3D();
                            },
                        },
                        setChaoCard3D: function() {
                            var isShowHunCard = MjClient.playui.isHunCardShow3D();
                            var chaoCard = MjClient.playui.getChaoCard();
                            if (!isShowHunCard || chaoCard <= 0) {
                                this.visible = false;
                                return;
                            }

                            this.visible = true;
                            var chaoCardNode = this.getChildByName("img_chaoCard");
                            chaoCardNode.tag = parseInt(chaoCard);
                            MjClient.playui.setCardSprite(chaoCardNode, chaoCard, true);
                        }
                    },
                },
                node_down: {
                    layout_head: {
                        text_shuai: {
                            _run: function () {
                                MjClient.playui.setShuaiLaiZiShow(this, "node_down");
                            }
                        },
                    },
                    _event: {
                        waitHuanPai: function () {
                            MjClient.playui._huanPaiUpNum = 0;
                            MjClient.movingCard = null;
                            MjClient.playui.hideEatNodeChildren();
                        },
                        MJHuanPai: function(data) {
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.HUAN);
                        },
                        MJHuanPaiFinish: function(data) {
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.HUANFINISH);
                            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
                            if (player.mjhand.length % 3 == 2) {
                                if (data.eatFlag > 0) {
                                    player.eatFlag = data.eatFlag;
                                    MjClient.playui.updatePlayerEatBtn();
                                }
                                MjClient.playui.hasClickBtn = false;
                                MjClient.playui.resetCardLayout(this);
                                MjClient.playui.searchAllTingCards();
                                MjClient.playui.updateTingTips();
                            }
                        },
                        MJPut:function (data) {
                            MjClient.playui.clickGangPass = false;
                            MjClient.playui.clickTingPass = false;
                            MjClient.playui.clickTing = false;
                            MjClient.playui.dealPut(this, data);
                            if (data.uid == MjClient.playui.getSelfUid()) {
                                MjClient.playui.checkHandCards(this);
                                MjClient.playui.checkPutCards(this);
                                MjClient.playui.updateTingTips();
                            }
                            MjClient.playui.addChengLaiZiAni(this, data);
                        },
                    }
                },
                node_right: {
                    layout_head: {
                        text_shuai: {
                            _run: function () {
                                MjClient.playui.setShuaiLaiZiShow(this, "node_right");
                            }
                        },
                    },
                    _event: {
                        MJHuanPai: function(data) {
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.HUAN);
                        },
                        MJHuanPaiFinish: function(data) {
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.HUANFINISH);
                        },
                        MJPut:function (data) {
                            MjClient.playui.dealPut(this, data);
                            MjClient.playui.addChengLaiZiAni(this, data);
                        },
                    }
                },
                node_top: {
                    layout_head: {
                        text_shuai: {
                            _run: function () {
                                MjClient.playui.setShuaiLaiZiShow(this, "node_top");
                            }
                        },
                    },
                    _event: {
                        MJHuanPai: function(data) {
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.HUAN);
                        },
                        MJHuanPaiFinish: function(data) {
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.HUANFINISH);
                        },
                        MJPut:function (data) {
                            MjClient.playui.dealPut(this, data);
                            MjClient.playui.addChengLaiZiAni(this, data);
                        },
                    }
                },
                node_left: {
                    layout_head: {
                        text_shuai: {
                            _run: function () {
                                MjClient.playui.setShuaiLaiZiShow(this, "node_left");
                            }
                        },
                    },
                    _event: {
                        MJHuanPai: function(data) {
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.HUAN);
                        },
                        MJHuanPaiFinish: function(data) {
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.HUANFINISH);
                        },
                        MJPut:function (data) {
                            MjClient.playui.dealPut(this, data);
                            MjClient.playui.addChengLaiZiAni(this, data);
                        },
                    }
                },
                img_huanPaiTip: {
                    _layout:[[0.35, 0.35], [0.5, 0.34], [0, 0]],
                    _visible: false,
                    _event: {
                        hideHuanPai: function () {
                            this.visible = false;
                        },
                        waitHuanPai: function () {
                            this.visible = true;
                        },
                        initSceneData: function () {
                            var player = MjClient.playui.getPlayerInfoByOff();
                            if(player.mjState == TableState.waitHuanPai) {
                                this.visible = true;
                            }
                        },
                    },
                    btnOK: {
                        _click: function (btnOk) {
                            var upCardArr = MjClient.playui.getUpHandCardNode();
                            if(upCardArr.length === 3) {
                                postEvent("hideHuanPai");
                                MjClient.playui.sendHuanPaiToServer(upCardArr);
                                var player = MjClient.playui.getPlayerInfoByOff();
                                player.tState = TableState.waitPut;
                            }
                            else {
                                MjClient.showToast("请选择3张需要交换的牌！");
                            }
                        }
                    }
                },
                node_eat: {
                    node_showCards: {
                        img_showCardsBg: {
                            showGangCards: function(){
                                this.showCards();
                                this.visible = true;
                                var cardArr = MjClient.playui.gangCardArray;
                                this.updateSize(cardArr.length, 4);
                                var startPos = this.getStartPos(cardArr.length, 4);
                                var templatCard = this.getChildByName("img_card");
                                var self = this;
                                for(var i = 0;i < cardArr.length;i++){
                                    var length = 4;
                                    if (cardArr[i] == MjClient.playui.getChaoCard()) length = 3;
                                    for (var j = 0; j < length; j ++){
                                        var card = util.clone(templatCard);
                                        card.visible = true;
                                        card.setName(MjClient.playui.HandleCardType.Put);
                                        card.tag = cardArr[i];
                                        var x = startPos.x + j * templatCard.width * templatCard.scale * 0.97;
                                        var y = startPos.y + i * templatCard.height * templatCard.scale;
                                        card.setPosition(x, y);
                                        this.addChild(card);
                                        MjClient.playui.updateChiGangCards(card, cardArr[i]);

                                        card.addTouchEventListener(function(sender, eventType){
                                            if(eventType == ccui.Widget.TOUCH_BEGAN){
                                                MjClient.playui.hasClickBtn = true;
                                            }
                                            if(eventType == ccui.Widget.TOUCH_CANCELED){
                                                MjClient.playui.hasClickBtn = false;
                                            }
                                            if(eventType == ccui.Widget.TOUCH_ENDED){
                                                MjClient.playui.sendGangToServer(sender.tag);
                                                MjClient.playui.hideEatNodeChildren();
                                                self.getParent().visible = false;
                                            }
                                        }, card);
                                    }
                                }
                            }
                        }
                    }
                }
            };
            return jsBind;
        },

        ctor: function() {
            this._super(majiang_panel_qianJiangHHMJ, "Play_majiang_qianJiangHHMJ.json");
            return true;
        },

        /**
         *  @Override
         *  游戏中状态
         **/
        isInGame: function () {
            var tData = MjClient.data.sData.tData;
            if (!tData){
                return false;
            }
            return tData.tState === TableState.waitPut ||
                tData.tState === TableState.waitEat ||
                tData.tState === TableState.waitCard ||
                tData.tState === TableState.waitHuanPai;
        },

        /**
         *  @Override
         *  游戏开始状态
         **/
        isBeganGame: function () {
            var tData = MjClient.data.sData.tData;
            if (!tData){
                return false;
            }
            return tData.tState === TableState.waitPut ||
                tData.tState === TableState.waitEat ||
                tData.tState === TableState.waitCard ||
                tData.tState === TableState.waitSelect ||
                tData.tState === TableState.roundFinish ||
                tData.tState === TableState.waitJiazhu ||
                tData.tState === TableState.waitHuanPai;
        },

        checkIsWaitHuanPai: function () {
            var tData = MjClient.data.sData.tData;
            return tData.tState === TableState.waitHuanPai;
        },

        /**
         *  @Override
         *  吃碰杠的动画类型
         **/
        initAnimationType: function(){
            this._super();
            this.AnimationType["HUAN"] = "huan"; // 换牌动画
            this.AnimationType["HUANFINISH"] = "huanFinish"; // 换牌结束动画
        },

        getUpHandCardNode: function () {
            var res = [];
            var playerNode = this.getNodeByOff();
            var children = playerNode.children;
            var handCard = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
            for(var k = 0; k < children.length; k++) {
                var cardNode = children[k];
                if(cardNode.name === this.HandleCardType.Hand && cardNode.y > handCard.getPositionY()) {
                    res.push(cardNode.tag);
                }
            }
            return res;
        },

        /**
         *  小结算
         **/
        createEndOnePanel: function () {
            return new majiang_winGamePanel_qianJiangHHMJ();
        },
    });
    
    /**
     *  Override
     *  是否显示癞子牌
     **/
    majiang_panel_qianJiangHHMJ.prototype.isHunCardShow = function () {
        return true;
    };
    
    /**
     *  获取朝牌
     **/
    majiang_panel_qianJiangHHMJ.prototype.getChaoCard = function () {
        return MjClient.data.sData.tData.chaoTianCard;
    };

    /**
     *  Override
     *  是否能添加癞子标识
     **/
    majiang_panel_qianJiangHHMJ.prototype.isCanAddLaiZiIcon = function (cardTag) {
        var tData = MjClient.data.sData.tData;
        if(cardTag == this.getHunCard() || cardTag == this.getChaoCard()){
            return true;
        }
        return false;
    };

    /**
     *  Override
     *  获得癞子标识
     **/
    majiang_panel_qianJiangHHMJ.prototype.getLaiZiIcon2D = function (cardTag) {
        var laiZiNode = new ccui.ImageView();
        laiZiNode.setName("laiZi");

        var texturePath;
        if (cardTag == this.getHunCard()) {
            texturePath = "playing/MJ/lai.png";
        } else if (cardTag == this.getChaoCard()) {
            texturePath = "playing/MJ/pizi.png";
        }
           
        laiZiNode.loadTexture(texturePath);
        return laiZiNode;
    };

    majiang_panel_qianJiangHHMJ.prototype.sendHuanPaiToServer = function (arr) {
        if (MjClient.rePlayVideo !== -1){
            return;
        }
        var sendMsg = {
            cmd: "MJHuanPai",
            arr: arr,
        };
        cc.log("----------------   sendHuanPaiToServer  ===== " + JSON.stringify(sendMsg));
        MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
    };

    /**
     *  Override
     *  手牌点击事件
     **/
    majiang_panel_qianJiangHHMJ.prototype.setTouchCardHandler = function (templateHandCard, handCard) {
        var self = this;
        handCard.addTouchEventListener(function(cardNode, eventType){
            if(MjClient.playui.checkWhenTouchBegan(cardNode)){
                return;
            }
            if(eventType === ccui.Widget.TOUCH_BEGAN){
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
            }else if(eventType === ccui.Widget.TOUCH_MOVED){
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

                if(!self.isTurnMe() && !self.checkIsWaitHuanPai()) {
                    MjClient.movingCard = null;
                    self.updateColoeAfterSelectCard();
                    return;
                }
                
                cardNode.scale = self.cardBeginScale;
                cardNode.zIndex  = self.cardBeginZIndex;
                var dis_endY = Math.round(cardNode.y - templateHandCard.y);
                //点击杠按钮，命令没回来之前不能点击牌(self.hasClickBtn防止按钮和牌的多点触控导致的多牌)
                if (!self.cardIsPut || dis_endY < 20 || self.hasClickBtn) {
                    MjClient.movingCard = null;
                    cardNode.setPosition(self.cardBeginPos);
                    cardNode.y = templateHandCard.y + 20;
                    if (self.checkIsWaitHuanPai()) {
                        self._huanPaiUpNum++;
                    }
                    return;
                }
                self.recoverUpCardForHuanPai(cardNode);
                self.handlerWhenCardTouchEnded(cardNode, cardNode.tag);
            }
        }, handCard);
    };

    majiang_panel_qianJiangHHMJ.prototype.recoverUpCardForHuanPai = function () {
        var downNode = this.getNodeByOff();
        var handCard = downNode.getChildByName(this.CsdDefaultCardType.HandCard);
        if(this.checkIsWaitHuanPai()) {
            if(MjClient.selectedCard && cc.sys.isObjectValid(MjClient.selectedCard)) {
                MjClient.selectedCard.setPositionY(handCard.getPositionY());
                this._huanPaiUpNum--;
            }
        }
    };

    majiang_panel_qianJiangHHMJ.prototype.handlerWhenCardTouchBegan = function (selectCard) {
        postEvent(this.PlayEventType.SELECT_HAND_CARD, selectCard);
        //还原之前选中牌的位置
        var downNode = this.getNodeByOff();
        var handCard = downNode.getChildByName(this.CsdDefaultCardType.HandCard);
        var icCanPro = MjClient.selectedCard && cc.sys.isObjectValid(MjClient.selectedCard) && MjClient.selectedCard !== selectCard;
        if (this.checkIsWaitHuanPai()) {
            if(this._huanPaiUpNum === 3 && icCanPro && selectCard.y === handCard.getPositionY()) {
                MjClient.selectedCard.setPositionY(handCard.getPositionY());
                this._huanPaiUpNum --;
            }
        }
        else {
            if(icCanPro) {
                MjClient.selectedCard.setPositionY(handCard.getPositionY());
            }
        }
    };

    majiang_panel_qianJiangHHMJ.prototype.checkWhenTouchBegan = function (cardNode){
        var player = MjClient.playui.getPlayerInfoByName("node_down");
        // 换牌前
        if(this.checkIsWaitHuanPai() && player.tState == TableState.waitHuanPai) return true;
        if(this.checkIsWaitHuanPai()) return false;
        
        if(MjClient.movingCard !== null && MjClient.movingCard != cardNode){
            return true;
        } 
        var handCount = this.getCardNodeCountByName(cardNode.getParent(), this.HandleCardType.Hand);
        if(!(handCount % 3 == 2 && this.isTurnMe() || handCount % 3 == 1 && !this.isTurnMe())){
            return true;
        }

        // 自动摸打
        if (player.tPutCard && this.isTurnMe()) {
            if (!MjClient.Scene.ToastNodeArray || MjClient.Scene.ToastNodeArray.length == 0) {
                MjClient.showToast("出牌请先取消自动摸打");
            }
            return true;
        }

        return false;
    };

    /**
     *  撑癞子动画
     **/
    majiang_panel_qianJiangHHMJ.prototype.addChengLaiZiAni = function (playerNode, msg) {
        var player = this.getPlayerInfoByName(playerNode.getName());
        if (msg && msg.uid && msg.uid != player.info.uid) {
            return;
        }
        if (msg.putType == 5) {
            var delayTime = 2;
            var animateNode = playerNode.getChildByName("node_animation");
            var callback = function (){
                animateNode.visible = false;
            };

            var projNode = new cc.Sprite("spine/bu/chenglaizi.png");
            projNode.setScale(0.0);
            projNode.runAction(cc.sequence(cc.scaleTo(0.2, 1.2), cc.scaleTo(0.3, 1.0)));

            animateNode.visible = true;
            animateNode.removeAllChildren();
            animateNode.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            animateNode.addChild(projNode);
        }
    };


    /**
     *  甩癞子次数提示
     **/
    majiang_panel_qianJiangHHMJ.prototype.setShuaiLaiZiShow = function (node, dir) {
        node.visible = false;
        node.ignoreContentAdaptWithSize(true);

        var that = this;
        function showNum (dir) {
            var player = MjClient.playui.getPlayerInfoByName(dir);
            var tData = MjClient.data.sData.tData;
            if (!that.isInGame() || !player) {
                node.visible = false;
                return;
            }
            node.visible = true;
            var num = 0;
            for (var i = 0; i < player.mjput.length; i++) {
                if (player.mjput[i] == tData.hunCard) num++;
            }
            node.setString("甩癞子" + num + "次");
        }

        UIEventBind(null, node, "initSceneData", function(){
            showNum(dir);
        });

        UIEventBind(null, node, "roundEnd", function(){
            node.visible = false;
        });

        UIEventBind(null, node, "MJPut", function(ed){
            showNum(dir);
        });
    };


}());



























