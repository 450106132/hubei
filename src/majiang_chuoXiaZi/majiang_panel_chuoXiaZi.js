/***
 * 新框架牌桌逻辑
 * @type {void | Class | *}
 */

var majiang_panel_chuoXiaZi;
(function () {

    majiang_panel_chuoXiaZi = majiang_panel_hubei.extend({

        getJsBind: function () {
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
                node_down:{
                    layout_head: {
                        atlas_score: {
                            _event: {
                                initSceneData: function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (!player) return;
                                    changeAtalsForLabel(this, player.winall + player.gangScore);
                                },
                            },
                        },
                    },
                    atlas_gangScore: {
                        _run:function () {
                            this.visible = false;
                            this.zIndex = 1000;
                            this.setPositionX(cc.winSize.width * 0.5);
                            this.setPositionY(cc.winSize.height * 0.25);
                        },
                        _event: {
                            MJGangScore: function (data) {
                                MjClient.playui.newUpdateGangScore(this, data, "node_down");
                            }
                        }
                    },
                    _event:{
                        waitPut: function (data) {
                            var tData = MjClient.data.sData.tData;
                            var player = MjClient.playui.getPlayerInfoByName("node_down");
                            if(tData.uids[tData.curPlayer] == player.info.uid){
                                MjClient.playui.updateColoeAfterSelectCard();
                                MjClient.playui.resetCardLayout(this);
                                MjClient.playui.updateTingTips();
                                MjClient.playui.autoPutAfterTing();
                            }

                            var num = MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext;
                            if (num == 4 && tData.areaSelectMode.gemogehu) {
                                mylog("剩余牌 ========= " + num);
                                MjClient.showToast("本局还剩余4张牌, 各摸各胡不能打生张!");
                            }
                            // 刷新生牌
                            MjClient.playui.updateCardColorIsSheng();
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
                        MJHu: function (data) {
                            MjClient.playui.showEndInfo(this, data, "node_down");
                            if (MjClient.playui.getSelfUid() == data.uid) {
                                MjClient.playui.hideEatNodeChildren();
                            }
                        },
                        initSceneData: function () {
                            //一炮多响的倒牌
                            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
                            if(player.mjState != TableState.roundFinish){
                                player.isZiMo = false;
                            }
                            //初始化所有数据
                            MjClient.playui.initGameData();
                            MjClient.playui.updatePlayerCards(this);
                            MjClient.playui.updataClickCancelTingBtn();
                            MjClient.playui.updateCardColorAfterTing(true);
                            MjClient.playui.updatePlayerEatBtn();
                            //听牌
                            MjClient.playui.searchAllTingCards();
                            postEvent(MjClient.playui.PlayEventType.SHOW_TING_CARDS);
                            MjClient.playui.updateTingTips();

                            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);

                            // 刷新生牌
                            MjClient.playui.updateCardColorIsSheng();
                        },
                    }
                },
                node_top:{
                    layout_head: {
                        atlas_score: {
                            _event: {
                                initSceneData: function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (!player) return;
                                    changeAtalsForLabel(this, player.winall + player.gangScore);
                                },
                            },
                        },
                    },
                    atlas_gangScore: {
                        _run:function () {
                            this.visible = false;
                            this.zIndex = 1000;
                            this.setPositionX(cc.winSize.width * 0.5);
                            this.setPositionY(cc.winSize.height * 0.75);
                        },
                        _event: {
                            MJGangScore: function (data) {
                                MjClient.playui.newUpdateGangScore(this, data, "node_top");
                            }
                        }
                    },
                    _event:{
                        MJPut:function (data) {
                            MjClient.playui.dealPut(this, data);
                            MjClient.playui.addChengLaiZiAni(this, data);
                        },
                        MJHu: function (data) {
                            MjClient.playui.showEndInfo(this, data, "node_top");
                        },
                    }
                },
                node_right:{
                    layout_head: {
                        atlas_score: {
                            _event: {
                                initSceneData: function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (!player) return;
                                    changeAtalsForLabel(this, player.winall + player.gangScore);
                                },
                            },
                        },
                    },
                    atlas_gangScore: {
                        _run:function () {
                            this.visible = false;
                            this.zIndex = 1000;
                            this.setPositionX(cc.winSize.width * 0.75);
                            this.setPositionY(cc.winSize.height * 0.5);
                        },
                        _event: {
                            MJGangScore: function (data) {
                                MjClient.playui.newUpdateGangScore(this, data, "node_right");
                            }
                        }
                    },
                    _event:{
                        MJPut:function (data) {
                            MjClient.playui.dealPut(this, data);
                            MjClient.playui.addChengLaiZiAni(this, data);
                        },
                        MJHu: function (data) {
                            MjClient.playui.showEndInfo(this, data, "node_right");
                        },
                    }
                },
                node_left:{
                    layout_head: {
                        atlas_score: {
                            _event: {
                                initSceneData: function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (!player) return;
                                    changeAtalsForLabel(this, player.winall + player.gangScore);
                                },
                            },
                        },
                    },
                    atlas_gangScore: {
                        _run:function () {
                            this.visible = false;
                            this.zIndex = 1000;
                            this.setPositionX(cc.winSize.width * 0.25);
                            this.setPositionY(cc.winSize.height * 0.5);
                        },
                        _event: {
                            MJGangScore: function (data) {
                                MjClient.playui.newUpdateGangScore(this, data, "node_left");
                            }
                        }
                    },
                    _event:{
                        MJPut:function (data) {
                            MjClient.playui.dealPut(this, data);
                            MjClient.playui.addChengLaiZiAni(this, data);
                        },
                        MJHu: function (data) {
                            MjClient.playui.showEndInfo(this, data, "node_left");
                        },
                    }
                },
                endCard: {
                    _run: function () {
                        MjClient.playui._endCard = this;
                    }
                },
                gameOver:{
                    _run: function() {
                        this.visible = false;
                        MjClient.playui._gameOver = this;
                    }
                },
                showTip_sanzhang: {
                    _layout: [[0.25, 0.25], [0.5, 0.55], [0, 0]],
                    _visible: false,
                    _run: function () {
                        if (!MjClient.playui.isInGame()) return;
                        var tData = MjClient.data.sData.tData;
                        var num = MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext;
                        if (num < 4) {
                            this.visible = true;
                            var jinPengGangNode = this.getChildByName("jinPengGang");
                            jinPengGangNode.visible = tData.areaSelectMode.mosanzhangbupenggang;
                        }
                        var cardNumNode = this.getChildByName("cardNum");
                        cardNumNode.setString(num + "");
                    },
                    _event:{
                        waitPut: function () {
                            var tData = MjClient.data.sData.tData;
                            var num = MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext;
                            var cardNumNode = this.getChildByName("cardNum");
                            if (num < 4) {
                                this.visible = true;
                                var jinPengGangNode = this.getChildByName("jinPengGang");
                                jinPengGangNode.visible = tData.areaSelectMode.mosanzhangbupenggang;
                                cardNumNode.setScale(1);
                                cardNumNode.runAction(cc.sequence(
                                    cc.spawn(cc.fadeOut(1).easing(cc.easeSineOut()), cc.scaleTo(0.5, 1.2).easing(cc.easeSineOut())),
                                    cc.fadeIn(0),
                                    cc.callFunc(function(){
                                        cardNumNode.setString(num + "");
                                    })
                                ));
                            }
                        },
                        roundEnd: function () {
                            this.visible = false;
                        }
                    },
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


        ctor: function () {
            this._super(majiang_panel_chuoXiaZi, "Play_majiang_chuoXiaZi.json");
            return true;
        },

        
        /**
         *  Override
         *  添加常量
         **/
        initCardTypeName: function () {
            this._super();
            this.HandleCardType["ChaoGang"] = "ChaoGang"; // 朝天牌的杠
        },


        /**
         *  及时刷新杠分显示
         **/
        newUpdateGangScore: function (node, msg, dir) {
            var player = MjClient.playui.getPlayerInfoByName(dir);
            if (!player) {
                return;
            }

            var score = msg.scoreArr[player.info.uid + ""];
            if(!score || score == 0){
                return;
            }

            node.visible = true;
            player.winall = player.winall || 0;

            var scoreFileName = score > 0 ? "playing/yijiaolaiyou/zi_ying.png" : "playing/yijiaolaiyou/zi_shu.png";
            var str = score > 0 ? "+" + score : score;
            node.setProperty(str, scoreFileName, 32, 43, "+");
            node.ignoreContentAdaptWithSize(true);

            var moveAction = cc.moveBy(0.5, cc.p(0, 10));
            var callFunc = cc.callFunc(function(){
                var headScore = node.parent.getChildByName("layout_head").getChildByName("atlas_score");
                changeAtalsForLabel(headScore, player.gangScore + player.winall);
            });
            var delayAction = cc.delayTime(1.5);
            var endCallFunc = cc.callFunc(function(){
                 node.visible = false;
            });
            var seqAction = cc.sequence(moveAction, callFunc, delayAction, endCallFunc);
            node.runAction(seqAction);
        },


        /**
         *  胡牌信息展示
         **/
        showEndInfo: function (node, msg, dir) {
            var player = MjClient.playui.getPlayerInfoByName(dir);
            if (!player || player.info.uid != msg.uid) {
                return;
            }

            var gameOverInfo    = MjClient.playui._gameOver;
            var moInfo          = gameOverInfo.getChildByName("mo");
            var chengInfo       = gameOverInfo.getChildByName("cheng");
            var laiyouInfo      = gameOverInfo.getChildByName("laiyou");

            var endCardNode     = MjClient.playui._endCard;
            var endCardImg      = endCardNode.getChildByName("endCardImg");
            endCardNode.visible = false;

            gameOverInfo.visible = true;
            gameOverInfo.scale = 0;

            //下一张牌
            // var endCard = msg.endCard;
            // if (endCard != - 1) {
            //     setCardSprite(endCardImg, parseInt(endCard), 4);
            //     setWgtLayout(endCardNode, [0.2, 0], [0.5, 0.5], [0, 0]);
            //     endCardNode.visible = true;
            // }

            // 摸
            var mo = msg.isYingMo ? "yingmo" : "laimo";
            moInfo.loadTexture("playing/yijiaolaiyou/" + mo + ".png");
            // 撑
            var cheng = msg.cheng;
            if (cheng) {
                chengInfo.visible = true;
                chengInfo.loadTexture("playing/yijiaolaiyou/cheng" + msg.cheng + ".png");
            }
            else {
                chengInfo.visible = false;
            }
            // 癞油
            laiyouInfo.loadTexture("playing/yijiaolaiyou/laiyou.png");
            laiyouInfo.visible = msg.laiYou;
            var nameArr = [gameOverInfo, moInfo, chengInfo, laiyouInfo];
            var func = function (rotate) {
                for (var i = 0; i < nameArr.length; i++) {
                    if (i == 0) {
                        nameArr[i].setRotation(0 - rotate);
                    }
                    else {
                        nameArr[i].setRotation(rotate);
                    }
                }
            };
            switch (dir) {
                case "node_down":
                    setWgtLayout(gameOverInfo, [0.2, 0], [0.5, 0.25], [0, 0]);
                    func(0);
                    break;
                case "node_right":
                    setWgtLayout(gameOverInfo, [0.2, 0], [0.75, 0.5], [0, 0]);
                    func(90);
                    laiyouInfo.x -= 75;
                    chengInfo.x += 75;
                    break;
                case "node_top":
                    setWgtLayout(gameOverInfo, [0.2, 0], [0.5, 0.75], [0, 0]);
                    func(180);
                    break;
                case "node_left":
                    setWgtLayout(gameOverInfo ,[0.2, 0], [0.25, 0.5], [0, 0]);
                    func(270);
                    laiyouInfo.x -= 75;
                    chengInfo.x += 75;
                    break;
            }

            var ani = cc.scaleTo(1, 0.5);
            gameOverInfo.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function(){
                gameOverInfo.visible = false;
            })));
            endCardNode.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function(){
                endCardNode.visible = false;
            })));
        },


        /**
         *  小结算
         **/
        createEndOnePanel: function(){
            return new majiang_winGamePanel_chuoXiaZi();
        },

    });


    /**
     *  Override
     *  是否显示癞子牌
     **/
    majiang_panel_chuoXiaZi.prototype.isHunCardShow = function () {
        return true;
    };

    
    /**
     *  获取朝牌
     **/
    majiang_panel_chuoXiaZi.prototype.getChaoCard = function () {
        return MjClient.data.sData.tData.chaoTianCard;
    };


    /**
     *  Override
     *  是否能添加癞子标识
     **/
    majiang_panel_chuoXiaZi.prototype.isCanAddLaiZiIcon = function (cardTag) {
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
    majiang_panel_chuoXiaZi.prototype.getLaiZiIcon2D = function (cardTag) {
        var laiZiNode = new ccui.ImageView();
        laiZiNode.setName("laiZi");

        var texturePath;
        if (cardTag == this.getHunCard()) {
            texturePath = "playing/MJ/lai.png";
        } else if (cardTag == this.getChaoCard()) {
            texturePath = "playing/MJ/chao.png";
        }
           
        laiZiNode.loadTexture(texturePath);
        return laiZiNode;
    };


    /**
     *  撑癞子动画
     **/
    majiang_panel_chuoXiaZi.prototype.addChengLaiZiAni = function (playerNode, msg) {
        var player = this.getPlayerInfoByName(playerNode.getName());
        cc.log("jcw =   msg = ", JSON.stringify(msg));
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

}());