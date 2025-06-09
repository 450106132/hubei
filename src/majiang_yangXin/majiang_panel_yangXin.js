//阳新麻将
var majiang_panel_yangXin = majiang_panel_hubei.extend({
    jsonFile: "Play_yangXinMajiang.json",
    ctor: function(){
        this._super(majiang_panel_yangXin, this.jsonFile);
    },

    //override
    getJsBind: function(){
        var jsBind = {
            layout_roundInfo2D:{
                img_cardNum: {
                    text_cardNum:{
                        _event:{
                            MJCanYangCard:function(data){
                                var sData = MjClient.data.sData;
                                if(!sData) return;
                                var tData = sData.tData;
                            
                                if(tData.canYangNum == 0){
                                    this.setString(this.getCardNum());
                                }
                            }, 
                            MJYangCard: function(data){
                                var sData = MjClient.data.sData;
                                if(!sData) return;
                                var tData = sData.tData;
                            
                                if(tData.canYangNum == 0){
                                    this.setString(this.getCardNum());
                                }
                            }
                        }
                    } 
                }
            },
            layout_roundInfo3D: {
                image_cardNumBg:{
                    text_cardNum:{
                        _event:{
                            MJCanYangCard:function(data){
                                var sData = MjClient.data.sData;
                                if(!sData) return;
                                var tData = sData.tData;
                            
                                if(tData.canYangNum == 0){
                                    this.setString(this.getCardNum());
                                }
                            }, 
                            MJYangCard: function(data){
                                var sData = MjClient.data.sData;
                                if(!sData) return;
                                var tData = sData.tData;
                            
                                if(tData.canYangNum == 0){
                                    this.setString(this.getCardNum());
                                }
                            }
                        }
                    }
                }
            },
            img_roomInfo2D:{
                node_hunPai:{
                    _run: function(){
                        this.visible = false
                    },
                    img_hunIcon: {
                        _visible: false
                    },
                    img_hunCard: {
                        _run: function(){
                            this.visible = false;
                        },
                        _event: {
                            mjhand: function(){},
                            initSceneData: function(){
                                this.visible = false;
                            },
                            switch2Dor3D: function(){
                                this.visible = false;
                            }
                        },
                    },
                    img_hunBg: {
                        _event: {
                            mjhand: function(){},
                            initSceneData: function(){
                                this.visible = false;
                            }
                        },
                    }
                }
            },
            img_roomInfo3D:{
                img_hunpaiBg: {
                    _run: function() {
                        this.visible = false;
                    },
                    _event: {
                        clearCardUI: function() {
                            this.visible = false;
                        },
                        initSceneData: function() {
                            this.visible = false;
                        },
                        mjhand: function() {
                            this.visible = false;
                        },
                        changeMJBgEvent: function() {
                            this.visible = false;
                        },
                        switch2Dor3D: function(){
                            this.visible = false;
                        }
                    }
                },
            },
            node_hun:{
                img_hunpai:{
                     _run:function(){
                        if(MjClient.playui.isIPad()){
                            setWgtLayout(this,[0.065, 0.065], [0.03, 0.80], [0, 1.2]);
                            this.offset_2d = 1 * cc.winSize.height / 1024;
                        }else if(MjClient.playui.isIPhoneX()){
                            setWgtLayout(this,[0.08, 0.08], [0.03, 0.80], [0, 0.4]);
                            this.offset_2d = 0.6 * cc.winSize.height / 640;
                        }else{
                            setWgtLayout(this,[0.08, 0.08], [0.03, 0.80], [0, 0.65]);
                            this.offset_2d = 0.7;
                        }
                        this.originalPos = cc.p(this.getPosition());
                        this.originalScale = this.getScale();
                        
                        this.visible = false;
                    },
                    _event:{
                        clearCardUI: function(){
                            this.visible = false;
                        },
                        initSceneData: function(){
                            this.setHunCard();
                        },
                        changeMJBgEvent: function(){
                            this.setHunCard();
                        },
                        switch2Dor3D:function(){
                            if(!MjClient.playui.isInGame()){
                                return;
                            }
 
                            this.setHunCard();
                        }
                    },
                    setHunCard: function(){
                        this.visible = false;
                        if(!MjClient.playui.isInGame()) return;
                        var laiZiCardSpineNode = this.getChildByName("spineNode");
                        if(laiZiCardSpineNode) laiZiCardSpineNode.removeFromParent(true);
                        var hunCard = MjClient.playui.getHunCard();
                        if(!hunCard || hunCard <= 0) return;
                        var hunCardNode = this.getChildByName("img_hunCard");
                        this.visible = true;
                        hunCardNode.tag = hunCard;
                        MjClient.playui.setCardSprite(hunCardNode,hunCard, true);
                        var laiIcon = hunCardNode.getChildByName("laiZi");
                        laiIcon.setPosition(cc.pAdd(laiIcon.getPosition(), cc.p( -20, -33)));
                        var pos_offset = cc.p(0,0);
                        if(!MjClient.playui.is3DStyle()){
                            pos_offset = cc.p(0, this.getContentSize().height * this.offset_2d);
                        }
                        var laiZiCardEndPos = cc.pAdd(this.originalPos, pos_offset);
                        this.setPosition(laiZiCardEndPos);
                    }
                },
                _event: {
                    initSceneData: function(){
                        var laiZiPiCard = this.getChildByName("laiZiPiCard");
                        if(laiZiPiCard && cc.sys.isObjectValid(laiZiPiCard)){
                            laiZiPiCard.removeFromParent(true);
                        }
                    },
                    clearCardUI: function(){
                        var laiZiPiCard = this.getChildByName("laiZiPiCard");
                        if(laiZiPiCard && cc.sys.isObjectValid(laiZiPiCard)){
                            laiZiPiCard.removeFromParent(true);
                        }
                    }
                }
            },
            node_eat:{
                btn_yang:{
                    _visible: false,
                    _touch: function(sender, eventType) {
                        if(eventType == ccui.Widget.TOUCH_BEGAN){
                            MjClient.playui.hasClickBtn = true;
                        }
                        if(eventType == ccui.Widget.TOUCH_CANCELED){
                            MjClient.playui.hasClickBtn = false;
                        }
                        if(eventType == ccui.Widget.TOUCH_ENDED){
                            MjClient.playui.hideEatNodeChildren();
                            MjClient.playui.sendYangToServer(true);
                        }
                    }
                },
                _event:{
                    MJCanYangCard: function(data){
                        var sData = MjClient.data.sData;
                        if(!sData) return;
                        var tData = sData.tData;
                    
                        if(tData.canYangNum == 0){
                            //仰完之后，刷新操作按钮
                            MjClient.playui.updatePlayerEatBtn();
                            return;
                        }
                        
                        var player = MjClient.playui.getPlayerInfoByName("node_down");
                        MjClient.playui.hideEatNodeChildren();
                        if(player.yangStatus > 0){//能仰没仰弹按钮
                            MjClient.playui.updatePlayerEatBtn();
                        }
                    },
                    MJYangCard: function(data){
                        var sData = MjClient.data.sData;
                        MjClient.playui.hasClickBtn = false;
                        if(!sData) return;
                        var tData = sData.tData;
                        var player = MjClient.playui.getPlayerInfoByName("node_down");
                        //所有人都仰了或者自己选择了
                        if(tData.canYangNum == 0 || player.yangStatus == 0){
                            MjClient.playui.hideEatNodeChildren();
                            if(tData.canYangNum == 0){
                                //仰完之后，刷新操作按钮
                                MjClient.playui.updatePlayerEatBtn();
                            }
                        }
                    }
                }
            },
            node_down:{
                layout_head:{
                    img_fanBei:{
                        _visible: false,
                        _event:{
                            initSceneData: function(){
                                MjClient.playui.updatePlayerBeiShu(this);
                            },
                            MJPut: function(data){
                                MjClient.playui.updatePlayerBeiShu(this, data);
                            },
                            MJGang: function(data){
                                MjClient.playui.updatePlayerBeiShu(this, data);
                            },
                            MJHu: function(data){
                                MjClient.playui.updatePlayerBeiShu(this, data);
                            },
                            clearCardUI: function(){
                                this.visible = false;
                            }
                        }
                    },
                    node_fanBeiTip: {
                        _visible: false,
                        _event:{
                            MJPut: function(data){
                                MjClient.playui.showPlayerFanBeiAnim(this);
                            },
                            MJGang: function(data){
                                MjClient.playui.showPlayerFanBeiAnim(this);
                            },
                            MJHu: function(data){
                                MjClient.playui.showPlayerFanBeiAnim(this);
                            },
                            clearCardUI: function(){
                                this.stopAllActions();
                                this.visible = false;
                            }
                        }
                    }
                },
                _event:{
                    MJCanYangCard: function(data){
                        MjClient.playui.moveLaiZiPiToPutCardsHeap(this);
                    },
                    MJYangCard: function(data){
                        MjClient.playui.handlePlayerYangCard(this, data);
                        MjClient.playui.moveLaiZiPiToPutCardsHeap(this);
                    }
                }
            },
            node_top:{
                layout_head:{
                    img_fanBei:{
                        _visible: false,
                        _event:{
                            initSceneData: function(){
                                MjClient.playui.updatePlayerBeiShu(this);
                            },
                            MJPut: function(data){
                                MjClient.playui.updatePlayerBeiShu(this, data);
                            },
                            MJGang: function(data){
                                MjClient.playui.updatePlayerBeiShu(this, data);
                            },
                            MJHu: function(data){
                                MjClient.playui.updatePlayerBeiShu(this, data);
                            },
                            clearCardUI: function(){
                                this.visible = false;
                            }
                        }
                    },
                    node_fanBeiTip: {
                        _visible: false,
                        _event:{
                            MJPut: function(data){
                                MjClient.playui.showPlayerFanBeiAnim(this, data);
                            },
                            MJGang: function(data){
                                MjClient.playui.showPlayerFanBeiAnim(this, data);
                            },
                            MJHu: function(data){
                                MjClient.playui.showPlayerFanBeiAnim(this, data);
                            },
                            clearCardUI: function(){
                                this.stopAllActions();
                                this.visible = false;
                            }
                        }
                    }
                },
                _event:{
                    MJCanYangCard: function(data){
                        MjClient.playui.moveLaiZiPiToPutCardsHeap(this);
                    },
                    MJYangCard: function(data){
                        MjClient.playui.handlePlayerYangCard(this, data);
                        MjClient.playui.moveLaiZiPiToPutCardsHeap(this);
                    }
                }
            },
            node_right:{
                layout_head:{
                    img_fanBei:{
                        _visible: false,
                        _event:{
                            initSceneData: function(){
                                MjClient.playui.updatePlayerBeiShu(this);
                            },
                            MJPut: function(data){
                                MjClient.playui.updatePlayerBeiShu(this, data);
                            },
                            MJGang: function(data){
                                MjClient.playui.updatePlayerBeiShu(this, data);
                            },
                            MJHu: function(data){
                                MjClient.playui.updatePlayerBeiShu(this, data);
                            },
                            clearCardUI: function(){
                                this.visible = false;
                            }
                        }
                    },
                    node_fanBeiTip: {
                        _visible: false,
                        _event:{
                            MJPut: function(data){
                                MjClient.playui.showPlayerFanBeiAnim(this, data);
                            },
                            MJGang: function(data){
                                MjClient.playui.showPlayerFanBeiAnim(this, data);
                            },
                            MJHu: function(data){
                                MjClient.playui.showPlayerFanBeiAnim(this, data);
                            },
                            clearCardUI: function(){
                                this.stopAllActions();
                                this.visible = false;
                            }
                        }
                    }
                },
                _event:{
                    MJCanYangCard: function(data){
                        MjClient.playui.moveLaiZiPiToPutCardsHeap(this);
                    },
                    MJYangCard: function(data){
                        MjClient.playui.handlePlayerYangCard(this, data);
                        MjClient.playui.moveLaiZiPiToPutCardsHeap(this);
                    }
                }
            },
            node_left:{
                layout_head:{
                    img_fanBei:{
                        _visible: false,
                        _event:{
                            initSceneData: function(){
                                MjClient.playui.updatePlayerBeiShu(this);
                            },
                            MJPut: function(data){
                                MjClient.playui.updatePlayerBeiShu(this, data);
                            },
                            MJGang: function(data){
                                MjClient.playui.updatePlayerBeiShu(this, data);
                            },
                            MJHu: function(data){
                                MjClient.playui.updatePlayerBeiShu(this, data);
                            },
                            clearCardUI: function(){
                                this.visible = false;
                            }
                        }
                    },
                    node_fanBeiTip: {
                        _visible: false,
                        _event:{
                            MJPut: function(data){
                                MjClient.playui.showPlayerFanBeiAnim(this, data);
                            },
                            MJGang: function(data){
                                MjClient.playui.showPlayerFanBeiAnim(this, data);
                            },
                            MJHu: function(data){
                                MjClient.playui.showPlayerFanBeiAnim(this, data);
                            },
                            clearCardUI: function(){
                                this.stopAllActions();
                                this.visible = false;
                            }
                        }
                    }
                },
                _event:{
                    MJCanYangCard: function(data){
                        MjClient.playui.moveLaiZiPiToPutCardsHeap(this);
                    },
                    MJYangCard: function(data){
                        MjClient.playui.handlePlayerYangCard(this, data);
                        MjClient.playui.moveLaiZiPiToPutCardsHeap(this);
                    }
                }
            },
        };
        return jsBind;
    }
});

//设置癞子皮牌
majiang_panel_yangXin.prototype.setlaiZiPiCard = function(cardNode){
    if(!MjClient.playui.isInGame()) return;
    var spineNode = cardNode.getChildByName("spineNode");
    if(spineNode) spineNode.removeFromParent(true);
    cardNode.visible = true;
    var hunCardNode = cardNode.getChildByName("img_hunCard");
    var hunCard = MjClient.playui.getHunCard();
    var laiZiPi = hunCard - 1;
    if(hunCard > 30){
        if(hunCard == 71){
            laiZiPi = 91;
        }else{
            laiZiPi = hunCard - 10;
        }
    }else{
        var color = Math.floor(hunCard / 10);
        var value = hunCard % 10;
        value -= 1;
        if(value == 0) value = 9;
        laiZiPi = color * 10 + value;
    }
    hunCardNode.tag = laiZiPi;
    MjClient.playui.setCardSprite(hunCardNode, laiZiPi, true);
    var laiIcon = hunCardNode.getChildByName("laiZi");
    if(laiIcon && cc.sys.isObjectValid(laiIcon)) laiIcon.removeFromParent(true);
};

//动画展示癞子牌
majiang_panel_yangXin.prototype.showPiZiAndLaiZi = function(node, mlaiZiPiCard, callback){
    var laiZiCard = node.getChildByName("img_hunpai");
    laiZiCard.setHunCard();
    var laiZiPiCard = node.getChildByName("laiZiPiCard");
    if(laiZiPiCard && cc.sys.isObjectValid(laiZiPiCard)){
        laiZiPiCard.removeFromParent(true);
    }
    laiZiPiCard = laiZiCard.clone();
   
    laiZiPiCard.setName("laiZiPiCard");
    this.setlaiZiPiCard(laiZiPiCard);
    laiZiCard.getParent().addChild(laiZiPiCard);

    let pos = cc.p(cc.winSize.width/2, cc.winSize.height/2);
    laiZiPiCard.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
    laiZiPiCard.setScale(0);
   
    var laiZiCardSpineNode = laiZiCard.getChildByName("spineNode");
    if(laiZiCardSpineNode) laiZiCardSpineNode.removeFromParent(true);
    laiZiCard.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
    laiZiCard.setScale(0);
    var pos_offset = cc.p(0,0);
    if(!this.is3DStyle()){
        pos_offset = cc.p(0, laiZiCard.getContentSize().height * laiZiCard.offset_2d);
    }
    mlaiZiPiCard.visible = false;
    var orininalScale = mlaiZiPiCard.getScale();
    var originalPos = mlaiZiPiCard.getPosition();
    mlaiZiPiCard.setScale(laiZiPiCard.width / mlaiZiPiCard.width);
    mlaiZiPiCard.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
    var laiZiCardEndPos = cc.pAdd(laiZiCard.originalPos, pos_offset);
    var piZiCardAction = cc.sequence(cc.EaseElasticOut.create(cc.scaleTo(0.5, laiZiCard.originalScale + 0.5)), cc.moveTo(0.2, cc.pAdd(pos, cc.p(-100 * cc.winSize.width / 640, 0))));
    laiZiPiCard.runAction(piZiCardAction);
    var laiCardAction = cc.sequence(cc.delayTime(0.7),cc.callFunc(function(){
        var laiZiCardSpineNode = createSpine("spine/yipierlai/chipenggang.json", "spine/yipierlai/chipenggang.atlas");
        laiZiCardSpineNode.setAnimation(0, 'laizi', false);
        laiZiCardSpineNode.setPosition(240,55);
        laiZiCardSpineNode.setTimeScale(1.5);
        laiZiCardSpineNode.setScale(0.5);
        
        laiZiCardSpineNode.setName("spineNode");
        laiZiCardSpineNode.setLocalZOrder(-1);
        laiZiCard.addChild(laiZiCardSpineNode);
    }), cc.EaseElasticOut.create(cc.scaleTo(0.5, laiZiCard.originalScale + 0.5)), cc.delayTime(1.2), cc.callFunc(function(){
        var laiZiCardSpineNode = laiZiCard.getChildByName("spineNode");
        if(laiZiCardSpineNode) laiZiCardSpineNode.removeFromParent(true);
        laiZiPiCard.removeFromParent(true);
        mlaiZiPiCard.visible = true;
        mlaiZiPiCard.runAction(cc.spawn(cc.scaleTo(0.2, orininalScale), cc.moveTo(0.2, originalPos)));
        laiZiCard.runAction(cc.spawn(cc.scaleTo(0.2, laiZiCard.originalScale), cc.moveTo(0.2, laiZiCardEndPos)));
        if(callback) callback();
    }));
    laiZiCard.runAction(laiCardAction);
};

//癞子皮添加到庄家出牌
majiang_panel_yangXin.prototype.moveLaiZiPiToPutCardsHeap = function(playerNode){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if(tData.canYangNum > 0) return;
    var player = this.getPlayerInfoByName(playerNode.getName());
    if(tData.zhuang != tData.uids.indexOf(player.info.uid)) return;

    this.createCard(playerNode, this.CsdDefaultCardType.PutCardOne, this.HandleCardType.Put, player.mjput[0]);
    
    var callback = function(playerNode){
        if(playerNode.lastPutCardNode && cc.sys.isObjectValid(playerNode.lastPutCardNode)){
            cc.log("癞子皮的牌被找到了");
            this.showPiZiAndLaiZi(this.getChildByName("playui").getChildByName("node_hun"), playerNode.lastPutCardNode, function(){

                //正常牌局只刷新自己的手牌
                if(MjClient.rePlayVideo == -1){
                    this.resetCardLaiIcon(this.getUIBind(tData.uids.indexOf(this.getSelfUid())));
                    this.resetCardLayout(this.getUIBind(tData.uids.indexOf(this.getSelfUid())));
                    return;
                }

                //回放刷新所有人的手牌
                if(MjClient.rePlayVideo != -1){
                    for(var i = 0; i < tData.uids.length; i++){
                        this.resetCardLaiIcon(this.getUIBind(tData.uids.indexOf(tData.uids[i])));
                        this.resetCardLayout(this.getUIBind(tData.uids.indexOf(tData.uids[i])));
                    }
                }
            }.bind(this));
        }
    };

    var is3D = this.is3DStyle();
    if(is3D){
        this.resetPutCards3D(playerNode, callback.bind(this, playerNode));
    }else{
        this.resetPutCards2D(playerNode, callback.bind(this, playerNode));
    }  
   
};

//重置玩家吃碰杠和手牌的癞子标志
majiang_panel_yangXin.prototype.resetCardLaiIcon = function(playerNode){
    var player = this.getPlayerInfoByName(playerNode.getName());
    if(!player){
        return;
    }

    if(!player.mjhand){
        return;
    }
    var children = playerNode.children;
    var tData = MjClient.data.sData.tData;

    for(i = 0;i < children.length;i++){
        var child = children[i];
        if(MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(child.tag, tData.hunCard)){
            var is3D = this.is3DStyle();
            if(is3D){
                this.addLaiZiIcon3D(child);
            }else{
                this.addLaiZiIcon2D(child);
            }
            this.setLaiZiColor(child);
        }
    }    
};

//Override 是否能添加癞子标识
majiang_panel_yangXin.prototype.isCanAddLaiZiIcon = function(cardTag){
    var tData = MjClient.data.sData.tData;
    if(cardTag == this.getHunCard()){
        return true;
    }
    return false;
};

//Override 添加癞子标识
majiang_panel_yangXin.prototype.addLaiZiIcon2D = function(cardNode){
    if(!this.isCanAddLaiZiIcon(cardNode.tag)){
        return;
    }

    var playerNodeName = cardNode.getParent().getName();
    var offIndex = this.getNodeIndexDefaultByName(playerNodeName);
    offIndex = offIndex == -1 ? 0 : offIndex;
    var laiZiPosArr = this.getHunIconPosition2D();
    var laiZiNode = this.getLaiZiIcon2D(cardNode.tag);
    var posOffset = this.getPiZiGangIconPositionOffset2D(cardNode);
    laiZiNode.setPosition(laiZiPosArr[offIndex][0] + posOffset[0], laiZiPosArr[offIndex][1] + posOffset[1]);

    if(offIndex == 2 && (cardNode.name == this.HandleCardType.Chi || cardNode.name == this.HandleCardType.Put)){//顶部玩家的，癞子图标不旋转

    }else{
        laiZiNode.setRotation(-90 * offIndex);
    }

    cardNode.addChild(laiZiNode);
};

//获取痞子杠癞子杠的图标偏移量
majiang_panel_yangXin.prototype.getPiZiGangIconPositionOffset2D = function(cardNode){
    var playerNodeName = cardNode.getParent().getName();
    
    if(playerNodeName == "node_down"){
        if(cardNode.name == this.HandleCardType.Hand){
            return [-22, -36];
        }
        if(cardNode.name == this.HandleCardType.Chi){
            return [-22, 0];
        }
    }
    return [0, 0];
};

majiang_panel_yangXin.prototype.getLaiZiIconOff3D = function(cardNode){
   var nodeName = cardNode.getParent().getName();
   if(nodeName == "node_down"){
       if(cardNode.name == this.HandleCardType.Chi){
           return cc.p(-20, -5);
       }
   }
   return cc.p(0, 0);
};

//Override 添加癞子标识
majiang_panel_yangXin.prototype.addLaiZiIcon3D = function(cardNode){
    if(!this.isCanAddLaiZiIcon(cardNode.tag)){
        return;
    }

    var offIndex = this.getNodeIndexDefaultByName(cardNode.getParent().getName());
    offIndex = offIndex == -1 ? 0 : offIndex;
    var laiZiPosArr = this.getCardFacePositon3D();
    var laiZiNode = this.getLaiZiIcon2D(cardNode.tag);
    var pos_x = laiZiPosArr[offIndex][0] * cardNode.width;
    var pos_y = laiZiPosArr[offIndex][1] * cardNode.height;
    var pos = cc.pAdd(cc.p(pos_x, pos_y), this.getLaiZiIconOff3D(cardNode));
    laiZiNode.setPosition(pos);
    if(offIndex == 2 && (cardNode.name == this.HandleCardType.Put || cardNode.name == this.HandleCardType.Chi)){//顶部玩家的仰，癞子图标不旋转

    }else{
        laiZiNode.setRotation(-90 * offIndex);
    }

    cardNode.addChild(laiZiNode);
};

// Override 获得3D癞子牌标签位置
majiang_panel_yangXin.prototype.getLaiZiIconPosition3D = function (cardNode) {
    if(!cardNode) return;
    var cardName = cardNode.getName();
    var size = cardNode.getContentSize();
    var pos;
    switch (cardName) {
        case this.HandleCardType.Hand:
            pos = cc.p(size.width * 0.58, size.height * 0.48);
            break;
        case this.HandleCardType.Chi:
            pos = cc.p(size.width * 0.41, size.height * 0.62);
            break;
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

majiang_panel_yangXin.prototype.getLaiZiIconPosition3DOfRight = function(cardNode){
    return cc.p(cardNode.width * 0.53, cardNode.width * 0.55);
};

majiang_panel_yangXin.prototype.getLaiZiIconPosition3DOfLeft = function(cardNode){
    return cc.p(cardNode.width * 0.49, cardNode.width * 0.515);
};

majiang_panel_yangXin.prototype.getLaiZiIconPosition3DOfTop = function(cardNode){
    return cc.p(cardNode.width * 0.45, cardNode.height * 0.6);
};

//Override
majiang_panel_yangXin.prototype.getLaiZiIcon2D = function(){
    var laiZiNode = new ccui.ImageView();
    laiZiNode.setName("laiZi");
    laiZiNode.loadTexture("playing/MJ/enshi_lai.png");
    return laiZiNode;
};

//Override 是否显示飘分
majiang_panel_yangXin.prototype.isShowPiao = function(){
	return false;
};

majiang_panel_yangXin.prototype.getHunIconPosition2D = function(){
    return [[60, 107], [52, 70], [40, 104], [74, 68], [40, 78], [61, 77], [22, 30]];
};

//Override 癞子位置偏移比
majiang_panel_yangXin.prototype.getEatAndHandCardsLaiZiIconPosSpcae3D = function(){
    return cc.p(0.88, 1.1);
};

//更新翻倍
majiang_panel_yangXin.prototype.updatePlayerBeiShu = function(node, data){
    if(!node) return;
    var fabBeiText = node.getChildByName("text");
    var playerNode =  node.getParent().getParent();
    var player = this.getPlayerInfoByName(playerNode.getName());
    if(!player || !player.hasOwnProperty("allGangMul") || player.allGangMul <= 1){
        node.visible = false;
        return;
    }
    node.visible = true;
    fabBeiText.setString(player.allGangMul);//设置于翻倍文本
};

//翻倍动画
majiang_panel_yangXin.prototype.showPlayerFanBeiAnim = function(node, data){
    node.visible = false;
    if(!node || !data) return;
    if((data.hasOwnProperty("curGangMul") &&  data.curGangMul > 1) || 
        (data.hasOwnProperty("cpginfo") && data.cpginfo.hasOwnProperty("curGangMul") && data.cpginfo.curGangMul > 0)){
            var str;
            if(data.hasOwnProperty("curGangMul") &&  data.curGangMul > 1){
                str = data.curGangMul;
            }else{
                str = data.cpginfo.curGangMul;
            }
            var text = node.getChildByName("text_fanBeiTip");
            text.setString(str);//设置当前翻倍
            node.setScale(0);
            node.visible = true;
            var action = cc.sequence(cc.EaseElasticOut.create(cc.scaleTo(1, 1)), cc.delayTime(0.2), cc.callFunc(function(){
                node.visible = false;
            }));
         node.runAction(action);
    }
};

/**
 *  Override began事件时的验证
 **/
majiang_panel_yangXin.prototype.checkWhenTouchBegan = function(cardNode){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    //仰牌阶段禁止出牌
    if(tData.canYangNum > 0) {
        if (!MjClient.Scene.ToastNodeArray || MjClient.Scene.ToastNodeArray.length == 0) {
            MjClient.showToast("仰牌阶段结束后才能出牌");
        }
        return true;
    }

    //自己能摸到的最后一张牌，不允许打出
    if(MjClient.majiang.getAllCardsTotal(tData) - 14 - tData.maxPlayer < tData.cardNext){
        if (!MjClient.Scene.ToastNodeArray || MjClient.Scene.ToastNodeArray.length == 0) {
            MjClient.showToast("当前不允许出牌");
        }
        return true;
    }

    var result = majiang_panel.prototype.checkWhenTouchBegan.call(this, cardNode);
    return result;
};

//Override 
majiang_panel_yangXin.prototype.handlerWhenCardTouchEnded = function(cardNode, cardTag){
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    //仰牌阶段禁止出牌
    if(tData.canYangNum > 0){
        if (!MjClient.Scene.ToastNodeArray || MjClient.Scene.ToastNodeArray.length == 0) {
            MjClient.showToast("仰牌阶段结束后才能出牌");
        }
        return;
    }

    //自己能摸到的最后一张牌，不允许打出
    if(MjClient.majiang.getAllCardsTotal(tData) - 14 - tData.maxPlayer < tData.cardNext){
        if (!MjClient.Scene.ToastNodeArray || MjClient.Scene.ToastNodeArray.length == 0) {
            MjClient.showToast("当前不允许出牌");
        }
        return;
    }


    majiang_panel.prototype.handlerWhenCardTouchEnded.call(this, cardNode, cardTag);
};

//Override 刷新玩家操作按钮
majiang_panel_yangXin.prototype.updatePlayerEatBtn = function(){
    this.hideEatNodeChildren();
    
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var player = sData.players[this.getSelfUid()];

    if(!this.isTurnMe() && player.mjState != TableState.waitEat && tData.canYangNum == 0){
        return;
    }

    var eatNodeArr = this.getPlayerEatNode();
    var btnScale = this.isIPad() ? 0.12 : 0.18;
    // var spaceScale = this.isIPad() ? 1.4 : 1.5;
    var off_y = this.isIPad() ? 1.7 : 2.0;

    var bigWidth = 0;
    for(var i = 0;i < eatNodeArr.length;i++){ 
        var eatBtn = eatNodeArr[i];
        if(eatBtn.width * btnScale > bigWidth){
            bigWidth = eatBtn.width * btnScale;
        }
    }
    
    var space = MjClient.size.width / 10;
    var totalSpace = (eatNodeArr.length - 1) * space;
    var totaWidth = bigWidth * eatNodeArr.length + totalSpace;
    var firstPos_x = (MjClient.size.width - totaWidth) / 2;
    for(var k = 0;k < eatNodeArr.length;k++){
        var btn = eatNodeArr[k];
        btn.visible = true;
        var pct = (firstPos_x + k * (space + bigWidth)) / MjClient.size.width;
        setWgtLayout(btn, [0, btnScale], [pct, 0], [0, off_y], false, false);
    }
    MjClient.playui.addLightAniEatBtns(); // 设置麻将的吃碰杠按钮特效
    this.checkBtnWithPlayerFlag();
};

//Override 获得玩家可操作按钮
majiang_panel_yangXin.prototype.getPlayerEatNode = function(){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var player = sData.players[this.getSelfUid()];
    var eat = MjClient.playui.jsBind.node_eat;
    var nodeArr = [];
    this.gangCardArray = [];

    //选仰阶段
    if(tData.canYangNum > 0){
        if(player.yangStatus > 0){
            nodeArr.push(eat.btn_yang._node);
            nodeArr.push(eat.btn_guo._node);
        }
        this.reloadBtnTexture(nodeArr);
        return nodeArr;
    }

    if(this.isTurnMe()){
        //胡
        if (player.eatFlag & 8) {
            nodeArr.push(eat.btn_hu._node);
        }

        //杠
        if(this.checkGangBtn(player) && !this.clickGangPass && (MjClient.majiang.getAllCardsTotal(tData) - 14 - tData.maxPlayer >= tData.cardNext)){
            nodeArr.push(eat.btn_gang._node);
        }
    }else{
        if (player.eatFlag & 8) {
            nodeArr.push(eat.btn_hu._node);
        }
        if (player.eatFlag & 4) {
            nodeArr.push(eat.btn_gang._node);
            this.gangCardArray.push(tData.lastPutCard);
        }
        if (player.eatFlag & 2) {
            nodeArr.push(eat.btn_peng._node);
        }
        if (player.eatFlag & 1){
            nodeArr.push(eat.btn_chi._node);
            this.eatCardArray = MjClient.majiang.canChi(player.mjhand, tData.lastPutCard, tData.hunCard);
        }

    }

    if(nodeArr.length > 0){
        nodeArr.push(eat.btn_guo._node);
    }
    this.reloadBtnTexture(nodeArr);
    return nodeArr;
};

//发送仰消息
majiang_panel_yangXin.prototype.sendYangToServer = function(isYang){
    if (MjClient.rePlayVideo != -1) {
    	return;
    }

    var sendMsg = {
        cmd: "MJYangCard",
        uid: this.getSelfUid(),
        isYang: isYang,
    };
    MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
};

//Override
majiang_panel_yangXin.prototype.clickPass = function(){
    var that = this;
    
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var player = this.getPlayerInfoByName("node_down");

    //仰牌阶段选择过
    if(tData.canYangNum > 0 && player.yangStatus > 0){
        this.hideEatNodeChildren();
        this.sendYangToServer(false);
        return;
    }

    majiang_panel.prototype.clickPass.call(this);
};

//处理玩家仰牌
majiang_panel_yangXin.prototype.handlePlayerYangCard = function(playerNode, data){
    var sData = MjClient.data.sData;
    if(!sData) return;
    var tData = sData.tData;
    var player = this.getPlayerInfoByName(playerNode.getName());
    if(data.uid != player.info.uid) return;
    //自己仰牌了
    if(player.yangStatus == 0 && player.mjchi.length > 0){
        var yangCardlen = player.mjchi.length;
        var yangCards = player.mjchi;
        for(var i = 0; i < yangCardlen; i++){
            this.removeCard(playerNode, this.HandleCardType.Hand, (MjClient.rePlayVideo != -1 || playerNode.getName() == "node_down") ? yangCards[i] : undefined);
        }

        for(var j = 0; j < yangCardlen; j++){
            this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront,  this.HandleCardType.Chi, yangCards[j]);
        }
        
    }
    this.resetCardLayout(playerNode);
    if(player.yangStatus == 0 && player.mjchi.length > 0){
        this.showExpandEatActionAnim(playerNode, this.AnimationType.YANG);
    }
};

/**
 *  吃碰杠的动画类型
 **/
majiang_panel_yangXin.prototype.initAnimationType = function(){
    majiang_panel.prototype.initAnimationType.call(this);
    this.AnimationType["YANG"] = "yang";//仰动画
};

//扩展的eat动画
majiang_panel_yangXin.prototype.showExpandEatActionAnim = function(playerNode, actType, param){
    param = param || {};
    var timeScale = param.timeScale || 1.5;
    var delayTime = param.delayTime || 1.2;
    var animateNode = playerNode.getChildByName("node_animation");
    var callback = function (){
        animateNode.visible = false;
    };
    var atlasSrc = "spine/yang/yang.atlas";
    var jsonSrc = "spine/yang/yang.json";
    var projNode = createSpine(jsonSrc, atlasSrc);
    _scale = cc.winSize.height / 640;
    projNode.setAnimation(0, actType, false);
    projNode.setTimeScale(timeScale);
    projNode.setScale(_scale);
    animateNode.visible = true;
    animateNode.removeAllChildren();
    animateNode.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
    animateNode.addChild(projNode);
};

//Override 是否可以自动摸打
majiang_panel_yangXin.prototype.isCanAutoPut = function(){
    //仰牌阶段不能自动摸打
    var tData = MjClient.data.sData.tData;
    return tData.canYangNum == 0;
};

//Override 2d小结算之前手牌倒牌
majiang_panel_yangXin.prototype.showMjhandBeforeEndOne2D = function(playerNodeName) {
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
    var tData = MjClient.data.sData.tData;
     var mjhand = player.mjhand.slice();
     //分张的时候玩家手牌模3后是2，此时不能删除手牌
    if ((MjClient.data.sData.tData.tState === TableState.waitEat || MjClient.data.sData.tData.tState === TableState.roundFinish) && 
        mjhand.length % 3 === 2 && !player.isZiMo && tData.cardNext > (MjClient.majiang.getAllCardsTotal(tData) - 14 - tData.maxPlaye))
    {
        mjhand = mjhand.slice(0, mjhand.length - 1);
    }
    for(var k = 0;k < mjhand.length;k++){
        var cardNode = this.createCard(playerNode, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.Chi, mjhand[k]);
        cardNode.isCut = true;
    }

    this.resetCardLayout2D(playerNode);
};

//3D小结算之前的摊牌效果
majiang_panel_yangXin.prototype.showMjhandBeforeEndOne3D = function(nodeName){
    var player = this.getPlayerInfoByName(nodeName);
    if (!player || !player.mjhand || MjClient.rePlayVideo !== -1) return;
    //删除手牌，重新添加手牌(以吃牌作为模板，然后重新刷新)
    var playerNode = this.getNodeByName(nodeName);
    this.removeCardsByName(playerNode, this.HandleCardType.Hand);

    var tData = MjClient.data.sData.tData;
    var mjhand = player.mjhand.slice();
    //当点炮时，不显示点炮的牌
    if ((MjClient.data.sData.tData.tState === TableState.waitEat || MjClient.data.sData.tData.tState === TableState.roundFinish) && 
        mjhand.length % 3 === 2 && !player.isZiMo && tData.cardNext > (MjClient.majiang.getAllCardsTotal(tData) - 14 - tData.maxPlaye)) 
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