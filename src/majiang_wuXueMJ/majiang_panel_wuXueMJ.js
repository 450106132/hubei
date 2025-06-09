/***
 * 新框架牌桌逻辑
 * @type {void | Class | *}
 */

var majiang_panel_wuXueMJ;
(function () {

    majiang_panel_wuXueMJ = majiang_panel_hubei.extend({
        jsonFile: "Play_majiang_wuXueMJ.json",
        getJsBind: function(){
            var jsBind = {
                _event: {
                    MJPut: function (msg) {
                        if (msg.isLaiZiGang) {
                            var playerNode = MjClient.playui.getNodeByUid(msg.uid);
                            MjClient.playui.showEatActionAnim(playerNode, MjClient.playui.AnimationType.GANG);
                        }
                    },
                    showLaiZiPi: function (msg) {
                        var playerNode = MjClient.playui.getNodeByUid(msg.zhuangUid);
                        var cardNode = MjClient.playui.createCard(playerNode, MjClient.playui.CsdDefaultCardType.PutCardOne, MjClient.playui.HandleCardType.Put, msg.laiZiPiCard);
                        MjClient.playui.addPutCard(cardNode, null, true);
                        MjClient.playui.resetCardLayout(playerNode);

                        var sData = MjClient.data.sData;
                        var player = sData.players[msg.zhuangUid];
                        player.mjput.push(msg.laiZiPiCard);
                    }
                },
                node_piaoFen: {
                    _event: {
                        initSceneData: function () {
                            MjClient.playui.processShowPiaoFen();
                        },
                        mjhand: function () {
                            MjClient.playui.processShowPiaoFen();
                        }
                    }
                },
                img_roomInfo2D: {
                    node_hunPai: {
                        _run: function () {
                            this.visible = MjClient.playui.isHunCardShow();
                            this.setPosition(cc.p(-180, 2));
                        },
                        panel_laiZiPi: {
                            _run: function () {
                                this.visible = MjClient.playui.isInGame();
                            },
                            _event: {
                                clearCardUI: function () {
                                    this.onSetCardAndBgShow(false);
                                },
                                mjhand: function () {
                                    this.cardAction();
                                },
                                initSceneData: function () {
                                    this.cardAction();
                                },
                                switch2Dor3D: function () {
                                    this.cardAction();
                                }
                            },
                            cardAction: function () {
                                this.onSetCardAndBgShow(false);
                                var tData = MjClient.data.sData.tData;
                                var laiZiPiArr = tData.laiZiPi;
                                if (!MjClient.playui.isInGame() || laiZiPiArr.length !== 2) {
                                    return;
                                }
                                this.onSetCardAndBgShow(true);
                                var laiZiPiNode0 = this.getChildByName("img_laiZiPi0");
                                var laiZiPiNode1 = this.getChildByName("img_laiZiPi1");
                                laiZiPiNode0.tag = laiZiPiArr[0];
                                laiZiPiNode1.tag = laiZiPiArr[1];
                                MjClient.playui.setCardSprite(laiZiPiNode0, parseInt(laiZiPiArr[0]), true);
                                MjClient.playui.setCardSprite(laiZiPiNode1, parseInt(laiZiPiArr[1]), true);
                                var cardImg0 = laiZiPiNode0.getChildByName("cardImg");
                                var cardImg1 = laiZiPiNode1.getChildByName("cardImg");
                                if (cardImg0 && cardImg1) {
                                    cardImg0.setScale(1);
                                    cardImg1.setScale(1);
                                    cardImg0.setPosition(cc.p(laiZiPiNode0.width * 0.53, laiZiPiNode0.height * 0.44));
                                    cardImg1.setPosition(cc.p(laiZiPiNode1.width * 0.53, laiZiPiNode1.height * 0.44));
                                }
                            },
                            onSetCardAndBgShow: function (isShow) {
                                var hunBg = this.parent.getChildByName("img_hunBg");
                                this.visible = isShow;
                                hunBg.visible = isShow;
                            },
                        }
                    }
                },
                img_roomInfo3D: {
                    img_hunpaiBg: {
                        _run: function () {
                            this.visible = false;
                        },
                        _event: {
                            clearCardUI: function () {
                                this.visible = false;
                            },
                            initSceneData: function () {
                                this.setBaiDaCard3D();
                            },
                            mjhand: function () {
                                this.setBaiDaCard3D();
                                MjClient.playui.playHunCardAnim(this.getChildByName("img_hunCard"));
                            },
                            changeMJBgEvent: function () {
                                this.setBaiDaCard3D();
                            },
                            switch2Dor3D: function () {
                                this.setBaiDaCard3D();
                            },
                        },
                        setBaiDaCard3D: function () {
                            var isShowHunCard = MjClient.playui.isHunCardShow3D();
                            var hunCard = MjClient.playui.getHunCard();
                            var tData = MjClient.data.sData.tData;
                            var laiZiPi = tData.laiZiPi;
                            if (!isShowHunCard || hunCard <= 0) {
                                this.visible = false;
                                return;
                            }

                            this.visible = true;
                            var hunCardNode = this.getChildByName("img_hunCard");
                            var laiZiPiNode0 = this.getChildByName("img_laiZiPi0");
                            var laiZiPiNode1 = this.getChildByName("img_laiZiPi1");
                            hunCardNode.tag = parseInt(hunCard);
                            laiZiPiNode0.tag = parseInt(laiZiPi[0]);
                            laiZiPiNode1.tag = parseInt(laiZiPi[1]);
                            MjClient.playui.setCardSprite(hunCardNode, hunCard, true);
                            MjClient.playui.setCardSprite(laiZiPiNode0, laiZiPi[0], true);
                            MjClient.playui.setCardSprite(laiZiPiNode1, laiZiPi[1], true);
                        }
                    },
                    img_gameover: {
                        _visible: false,
                        _layout: [[0.5, 0.5], [0.5, 0.55], [0, 0]],
                        _event: {
                            roundEnd: function () {
                                this.setVisible(true);
                                this.runAction(cc.sequence(
                                    cc.scaleTo(0.3, 2),
                                    cc.scaleTo(0.3, 1).easing(cc.easeElasticOut(1)),
                                    cc.fadeOut(0.2)
                                ))
                            }
                        }
                    }
                }
            };
            return jsBind;
        },

        ctor: function () {
            this._super(majiang_panel_wuXueMJ, this.jsonFile);
            return true;
        },

        isLaiZiPiCard: function (cardTag) {
            var tData = MjClient.data.sData.tData;
            return tData.laiZiPi.indexOf(cardTag) > -1;
        },

        setLaiZiColor: function (cardNode) {
            var tData = MjClient.data.sData.tData;
            if(cardNode.tag === tData.hunCard) {
                cardNode.setColor(cc.color(255, 255, 63));
            }
            if(this.isLaiZiPiCard(cardNode.tag)){
                cardNode.setColor(cc.color(255, 204, 102));
            }
            var laiZiNoNeedTouch = false;   // 癞子需要点击事件
            return laiZiNoNeedTouch;
        },

        addLaiZiIcon2D: function (cardNode) {
            if(!this.isLaiZiPiCard(cardNode.tag) && !this.isCanAddLaiZiIcon(cardNode.tag)) return;
            var playerNodeName = cardNode.getParent().getName();
            var offIndex = this.getNodeIndexDefaultByName(playerNodeName);
            offIndex = offIndex === -1 ? 0 : offIndex;
            var laiZiPos = this.getHunIconPosition2D(cardNode);
            var laiZiNode = this.getLaiZiIcon2D(cardNode.tag);
            laiZiNode.setPosition(laiZiPos);
            if (offIndex !== 2) {
                laiZiNode.setRotation(-90 * offIndex);
            }
            cardNode.addChild(laiZiNode);
        },

        addLaiZiIcon3D: function (cardNode) {
            if(!this.isLaiZiPiCard(cardNode.tag) && !this.isCanAddLaiZiIcon(cardNode.tag)) return;
            var offIndex = this.getNodeIndexDefaultByName(cardNode.getParent().getName());
            offIndex = offIndex === -1 ? 0 : offIndex;
            var laiZiPos = this.getLaiZiIconPosition3D(cardNode);
            var laiZiNode = this.getLaiZiIcon2D(cardNode.tag);
            laiZiNode.setPosition(laiZiPos);
            if (offIndex !== 2) {
                laiZiNode.setRotation(-90 * offIndex);
            }
            cardNode.addChild(laiZiNode);
        },

        getLaiZiIcon2D: function (cardTag) {
            var tData = MjClient.data.sData.tData;
            var laiZiNode = new ccui.ImageView();
            if(tData.laiZiPi.indexOf(cardTag) > -1) {
                laiZiNode.loadTexture("playing/MJ/pi.png");
            }else{
                laiZiNode.loadTexture("playing/MJ/lai.png");
            }
            laiZiNode.setName("laiZi");
            return laiZiNode;
        },

        playHunCardAnim: function (hunNode) {
            var showNode = hunNode.getParent();
            var endPos = showNode.getPosition();
            var endScale = showNode.getScale();

            var startPos = showNode.parent.convertToNodeSpace(cc.p(cc.winSize.width/2, cc.winSize.height * 0.75));
            showNode.setPosition(startPos);
            showNode.setScale(endScale * 1.5);

            var createFanZhuanAction = function () {
                var anim = new cc.Animation();
                anim.setDelayPerUnit(0.1);
                var path = "playing/MJ/hunCardAni/";
                anim.addSpriteFrameWithFile(path + "hunCard_0.png");
                anim.addSpriteFrameWithFile(path + "hunCard_1.png");
                anim.addSpriteFrameWithFile(path + "hunCard_2.png");
                anim.addSpriteFrameWithFile(path + "hunCard_3.png");
                return anim;
            };

            var sprite = new cc.Sprite();
            showNode.parent.addChild(sprite);
            sprite.setScale(0.68);
            sprite.setPosition(startPos);
            sprite.runAction(cc.sequence(
                cc.delayTime(0.05),
                cc.animate(createFanZhuanAction()),
                cc.removeSelf()
            ));

            showNode.setOpacity(0);
            showNode.runAction(cc.sequence(
                cc.delayTime(0.4),
                cc.fadeIn(0),
                cc.delayTime(1),
                cc.spawn(
                    cc.MoveTo(0.5, endPos),
                    cc.scaleTo(0.5, endScale)
                )
            ))
        },

        getCardSortArray2D: function (node, newCardTag) {
            var tData = MjClient.data.sData.tData;
            var handArr = [], anGangArr = [], mingGangArr = [], pengGangArr = [],pengArr = [], chiArr = [], laiZiArr = [], laiZiPiArr = [];
            var children = node.children;
            var i, newCard = null;
            if(newCardTag > 0 ){
                this.newCardNode  = null;
            }

            for(i = 0; i < children.length; i++){
                var child = children[i];
                if(child.name === this.HandleCardType.Hand || (child.name === this.HandleCardType.Chi && child.isCut)){
                    if(!newCard && Number(child.tag) === Number(newCardTag) && !child.isGray){
                        newCard = child;
                        this.newCardNode  = child;
                        this.newCardNode.isNew = true;
                        continue;
                    }
                    if(MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(child.tag, tData.hunCard)){
                        laiZiArr.push(child);
                        continue;
                    }
                    if(tData.laiZiPi.indexOf(child.tag) > -1) {
                        laiZiPiArr.push(child);
                        continue;
                    }
                    handArr.push(child);
                }else if(child.name === this.HandleCardType.AnGang){
                    anGangArr.push(child);
                }else if(child.name === this.HandleCardType.MingGang){
                    mingGangArr.push(child);
                }else if(child.name === this.HandleCardType.PengGang){
                    pengGangArr.push(child);
                }else if(child.name === this.HandleCardType.Peng){
                    pengArr.push(child);
                }else if(child.name === this.HandleCardType.Chi){
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
            laiZiPiArr.sort(function(a, b){
                return a.tag - b.tag;
            });
            for(i = 0; i < laiZiArr.length; i++){
                handArr.unshift(laiZiArr[i]);
            }
            for(i = 0; i < laiZiPiArr.length; i++){
                handArr.unshift(laiZiPiArr[i]);
            }
            return [].concat(anGangArr, mingGangArr, pengGangArr, pengArr, chiArr, handArr);
        },

        getCardSortArray3D: function (node, newCardTag) {
            var tData = MjClient.data.sData.tData;
            var handArr = [], anGangArr = [], mingGangArr = [], pengArr = [], chiArr = [], laiZiArr = [], laiZiPiArr = [];
            var children = node.children;
            var i, newCard = null;
            if(newCardTag > 0){
                this.newCardNode  = null;
            }

            for(i = 0;i < children.length;i++){
                var child = children[i];
                if(child.name === this.HandleCardType.Hand || (child.name === this.HandleCardType.Chi && child.isCut)){
                    if(!newCard && Number(child.tag) === Number(newCardTag) && !child.isGray){
                        newCard = child;
                        this.newCardNode  = child;
                        this.newCardNode.isNew = true;
                        continue;
                    }
                    if(MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(child.tag, tData.hunCard)){
                        laiZiArr.push(child);
                        continue;
                    }
                    if(tData.laiZiPi.indexOf(child.tag) > -1) {
                        laiZiPiArr.push(child);
                        continue;
                    }
                    handArr.push(child);
                }else if(child.name === this.HandleCardType.AnGang){
                    anGangArr.push(child);
                }else if(child.name === this.HandleCardType.MingGang){
                    mingGangArr.push(child);
                }else if(child.name === this.HandleCardType.PengGang){
                    mingGangArr.push(child);
                }else if(child.name === this.HandleCardType.Peng){
                    pengArr.push(child);
                }else if(child.name === this.HandleCardType.Chi){
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
            laiZiPiArr.sort(function(a, b){
                return a.tag - b.tag;
            });
            for(i = 0; i < laiZiArr.length; i++){
                handArr.unshift(laiZiArr[i]);
            }
            for(i = 0; i < laiZiPiArr.length; i++){
                handArr.unshift(laiZiPiArr[i]);
            }
            var cardArray = [].concat(anGangArr, mingGangArr, pengArr, chiArr, handArr);
            var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
            if(nodeIndex == 1 || nodeIndex == 2){
                cardArray.reverse();
            }
            return cardArray;
        },

        processShowPiaoFen: function () {
            var tData = MjClient.data.sData.tData;
            if(!tData) return;
            var uids = tData.uids;
            var roomSelect = tData.areaSelectMode;
            var piaoId = roomSelect.piaoId;
            var piaoFenArr = [0, 1, 5, 10, roomSelect.piaoFen];
            var piaoFen = piaoFenArr[piaoId];
            for(var i = 0; i < uids.length; i ++) {
                var off = getUiOffByUid(uids[i]);
                var node = MjClient.playui.getNodeByOff(off);
                var player = MjClient.playui.getPlayerInfoByOff(off);
                if(!node || !player) continue;
                var layoutHead = node.getChildByName("layout_head");
                var textPiao = layoutHead.getChildByName("text_piaoFen");
                textPiao.ignoreContentAdaptWithSize(true);
                textPiao.setVisible(true);
                textPiao.setString(piaoFen !== 0 ? "漂" + piaoFen + "分" : "");
            }
        },

        updataClickCancelTingBtn: function () {
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
            var tData = MjClient.data.sData.tData;
            for(var i = 0;i < children.length;i++){
                var cardNode = children[i];
                if(cardNode.name === this.HandleCardType.Hand){
                    var tingSign = cardNode.getChildByName("tingSign");
                    if(!cc.sys.isObjectValid(tingSign) || (tingSign && !tingSign.visible)){
                        if(MjClient.majiang.isHunCard(cardNode.tag, tData.hunCard) || this.isLaiZiPiCard(cardNode.tag))
                            continue;
                        cardNode.setColor(cc.color(255,255,255));
                        this.setTouchCardHandler(copyNode, cardNode);
                    }
                }
            }
        },

        createEndOnePanel: function(){
            return new majiang_winGamePanel_wuXueMJ();
        },
    });
}());



