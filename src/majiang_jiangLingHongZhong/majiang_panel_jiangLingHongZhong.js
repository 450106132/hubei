//江陵红中麻将
var majiang_panel_jiangLingHongZhong = majiang_panel_hubei.extend({
    jsonFile: "Play_jiangLingHongZhong.json",
    ctor: function(){
        this._super(majiang_panel_jiangLingHongZhong, this.jsonFile);
    },

    //override
    getJsBind: function(){
        var jsBind = {
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
                            }
                        },
                    },
                    img_hunBg: {
                        _event: {
                            mjhand: function(){},
                            initSceneData: function(){
                                this.visible = false;
                            },
                            switch2Dor3D: function(){
                                this.visible = false;
                            },
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
                        changeMJBgEvent: function(){
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
                        this.visible = true;
                        var hunCardNode = this.getChildByName("img_hunCard");
                        var hunCard = MjClient.playui.getHunCard();
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
                _event:{
                    mjhand: function(){
                        MjClient.playui.showPiZiAndLaiZi(this);
                    }
                }
            },

            node_down:{
                layout_head:{
                    node_gangScore:{
                        _run:function(){
                            this.visible = false;
                            this.setUserData({pos:this.getPosition()}); 
                        },
                        _event: {
                            MJGangScore: function(d){
                                MjClient.playui.updateGangScore(this, d);
                            },
                            initSceneData: function(){
                                this.visible = false;
                            }
                        }
                    },
                    atlas_score:{
                        _event: {
                            addPlayer: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_down");
                                if (!player) {
                                    return;
                                }

                                this.visible = true;
                                if (player.gangScore + player.winall) {
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            },
                            removePlayer: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_down");
                                if (!player) {
                                    this.visible = false;
                                    changeAtalsForLabel(this, "");
                                }
                            },
                            mjhand: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_down");
                                if (!player) {
                                    return;
                                }
                                
                                if (player.winall) {
                                    changeAtalsForLabel(this, player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            },
                            roundEnd: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_down");
                                if (!player) {
                                    return;
                                }

                                if (player.winall) {
                                    changeAtalsForLabel(this, player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            },
                            initSceneData: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_down");
                                if (!player) {
                                    return;
                                }

                                if (!MjClient.playui.isInGame()) {
                                    player.gangScore = 0;
                                }

                                if (player.gangScore + player.winall) {
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            }
                        }
                    }
                }
            },
            node_right:{
                layout_head:{
                    node_gangScore:{
                        _run: function(){
                            this.visible = false;
                            this.setUserData({pos:this.getPosition()}); 
                        },
                        _event: {
                            MJGangScore: function(d){
                                MjClient.playui.updateGangScore(this, d);
                            },
                            initSceneData: function(){
                                this.visible = false;
                            }
                        }
                    },
                    atlas_score: {
                        _run: function(){
                            this.setString("");
                        },
                        _event: {
                            addPlayer: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_right");
                                if (!player) {
                                    return;
                                }

                                this.visible = true;
                                if (player.gangScore + player.winall) {
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            },
                            removePlayer: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_right");
                                if (!player) {
                                    this.visible = false;
                                    changeAtalsForLabel(this, "");
                                }
                            },
                            mjhand: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_right");
                                if (!player) {
                                    return;
                                }
                                
                                if (player.winall) {
                                    changeAtalsForLabel(this, player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            },
                            roundEnd: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_right");

                                if (!player) {
                                    return;
                                }

                                if (player.winall) {
                                    changeAtalsForLabel(this, player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            },
                            initSceneData: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_right");
                                if (!player) {
                                    return;
                                }

                                if (!MjClient.playui.isInGame()) {
                                    player.gangScore = 0;
                                }

                                if (player.gangScore + player.winall) {
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            }
                        }
                    },
                }
            },
            node_top:{
                layout_head:{
                    node_gangScore:{
                        _run: function(){
                            this.visible = false;
                            this.setUserData({pos:this.getPosition()}); 
                        },
                        _event: {
                            MJGangScore: function(d){
                                MjClient.playui.updateGangScore(this, d);
                            },
                            initSceneData: function(){
                                this.visible = false;
                            }
                        }
                    },
                    atlas_score: {
                        _visible: true,
                        _run: function(){
                            this.setString("");
                        },
                        _event: {
                            addPlayer: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_top");
                                if (!player) {
                                    return;
                                }

                                this.visible = true;
                                if (player.gangScore + player.winall) {
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            },
                            removePlayer: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_top");
                                if (!player) {
                                    this.visible = false;
                                    changeAtalsForLabel(this, "");
                                }
                            },
                            mjhand: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_top");
                                if (!player) {
                                    return;
                                }
                                
                                if (player.winall) {
                                    changeAtalsForLabel(this, player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            },
                            roundEnd: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_top");
                                if (!player) {
                                    return;
                                }

                                if (player.winall) {
                                    changeAtalsForLabel(this, player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            },
                            initSceneData: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_top");
                                if (!player) {
                                    return;
                                }

                                if (!MjClient.playui.isInGame()) {
                                    player.gangScore = 0;
                                }

                                if (player.gangScore + player.winall) {
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            }
                        }
                    },
                }
            },
            node_left:{
                layout_head:{
                    node_gangScore:{
                        _run: function(){
                            this.visible = false;
                            this.setUserData({pos:this.getPosition()}); 
                        },
                        _event: {
                            MJGangScore: function(d){
                                MjClient.playui.updateGangScore(this, d);
                            },
                            initSceneData: function(){
                                this.visible = false;
                            }
                        }
                    },
                    atlas_score: {
                        _visible: true,
                        _run: function(){
                            this.setString("");
                        },
                        _event: {
                            addPlayer: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_left");
                                if (!player) {
                                    return;
                                }

                                this.visible = true;
                                if (player.gangScore + player.winall) {
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            },
                            removePlayer: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_left");
                                if (!player) {
                                    this.visible = false;
                                    changeAtalsForLabel(this, "");
                                }
                            },
                            mjhand: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_left");
                                if (!player) {
                                    return;
                                }
                                
                                if (player.winall) {
                                    changeAtalsForLabel(this, player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            },
                            roundEnd: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_left");
                                if (!player) {
                                    return;
                                }

                                if (player.winall) {
                                    changeAtalsForLabel(this, player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            },
                            initSceneData: function(){
                                var player = MjClient.playui.getPlayerInfoByName("node_left");
                                if (!player) {
                                    return;
                                }

                                if (!MjClient.playui.isInGame()) {
                                    player.gangScore = 0;
                                }
                                
                                if (player.gangScore + player.winall) {
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                } else {
                                    changeAtalsForLabel(this, 0);
                                }
                            }
                        }
                    },
                }
            }
            
        };
        return jsBind;
    }
});

//动画展示癞子牌
majiang_panel_jiangLingHongZhong.prototype.showPiZiAndLaiZi = function(node, callback){
    var laiZiCard = node.getChildByName("img_hunpai");
    laiZiCard.setHunCard();
   
    var laiZiCardSpineNode = laiZiCard.getChildByName("spineNode");
    if(laiZiCardSpineNode) laiZiCardSpineNode.removeFromParent(true);
    laiZiCard.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
    laiZiCard.setScale(0);
    var pos_offset = cc.p(0,0);
    if(!this.is3DStyle()){
        pos_offset = cc.p(0, laiZiCard.getContentSize().height * laiZiCard.offset_2d);
    }
    var laiZiCardEndPos = cc.pAdd(laiZiCard.originalPos, pos_offset);
    var laiCardAction = cc.sequence(cc.delayTime(0.2),cc.callFunc(function(){
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
        laiZiCard.runAction(cc.spawn(cc.scaleTo(0.2, laiZiCard.originalScale), cc.moveTo(0.2, laiZiCardEndPos)));
        if(callback) callback();
    }));
    laiZiCard.runAction(laiCardAction);
};

//Override 是否能添加癞子标识
majiang_panel_jiangLingHongZhong.prototype.isCanAddLaiZiIcon = function(cardTag){
    var tData = MjClient.data.sData.tData;
    if(cardTag == this.getHunCard()){
        return true;
    }
    return false;
};

//Override 添加癞子标识
majiang_panel_jiangLingHongZhong.prototype.addLaiZiIcon2D = function(cardNode){
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

    if(offIndex == 2 && (cardNode.name == this.HandleCardType.Put)){//顶部玩家的痞子杠和癞子杠,打出去的痞子，癞子图标不旋转

    }else{
        laiZiNode.setRotation(-90 * offIndex);
    }
    cardNode.addChild(laiZiNode);
};

//获取痞子杠癞子杠的图标偏移量
majiang_panel_jiangLingHongZhong.prototype.getPiZiGangIconPositionOffset2D = function(cardNode){
    var playerNodeName = cardNode.getParent().getName();
    
    if(playerNodeName == "node_down"){
        if(cardNode.name == this.HandleCardType.Hand){
            return [-22, -36];
        }
    }
    return [0, 0];
}

//Override 添加癞子标识
majiang_panel_jiangLingHongZhong.prototype.addLaiZiIcon3D = function(cardNode){
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
    if(offIndex == 2 && (cardNode.name == this.HandleCardType.Put)){//顶部玩家的痞子杠和癞子杠,打出去的痞子，癞子图标不旋转

    }else{
        laiZiNode.setRotation(-90 * offIndex);
    }

    cardNode.addChild(laiZiNode);
};

//Override
majiang_panel_jiangLingHongZhong.prototype.getLaiZiIcon2D = function(){
    var laiZiNode = new ccui.ImageView();
    laiZiNode.setName("laiZi");
    laiZiNode.loadTexture("playing/MJ/enshi_lai.png");
    return laiZiNode;
};

//Override 是否显示飘分
majiang_panel_jiangLingHongZhong.prototype.isShowPiao = function(){
	return false;
};

majiang_panel_jiangLingHongZhong.prototype.getHunIconPosition2D = function(){
    return [[60, 107], [52, 70], [40, 104], [74, 68], [40, 78], [61, 77], [22, 30]];
};

//Override 癞子位置偏移比
majiang_panel_jiangLingHongZhong.prototype.getEatAndHandCardsLaiZiIconPosSpcae3D = function(){
    return cc.p(0.88, 1.1);
};

/**
 * 刷新杠分
 */
majiang_panel_jiangLingHongZhong.prototype.updateGangScore = function(node, data){
    if(!node || !cc.sys.isObjectValid(node)) return;

    var sData = MjClient.data.sData;
    if(!sData){
        return;
    }

     var pl = MjClient.playui.getPlayerInfoByName(node.getParent().getParent().getName());
    if(!pl){
        return;
    }
    var score = data.scoreArr[pl.info.uid + ""];
    if(!score || score == 0){
        return;
    }
    node.visible = true;
    node.setPosition(node.getUserData().pos);

    var iconImg = node.getChildByName("img_icon");
    var scoreText = node.getChildByName("text_score");

    pl.winall = pl.winall || 0;

    var iconFileName = score > 0 ? "playground/gang_addIcon.png":"playground/gang_subIcon.png";
    var scoreFileName = score > 0 ? "playground/gang_addText.png":"playground/gang_subText.png";

    iconImg.loadTexture(iconFileName);
    scoreText.setProperty(score, scoreFileName, 50, 73, ".");
    scoreText.ignoreContentAdaptWithSize(true);

    var moveAction = cc.moveBy(0.5,cc.p(0, 10));
    var callFunc = cc.callFunc(function(){
        var parent = node.parent;
        var scoreText = parent.getChildByName("atlas_score");
        changeAtalsForLabel(scoreText, pl.gangScore + pl.winall);
    });
    var delayAction = cc.delayTime(1.5);
    var endCallFunc = cc.callFunc(function(){
        node.visible = false;
    });
    var seqAction = cc.sequence(moveAction, callFunc, delayAction, endCallFunc);
    node.runAction(seqAction);
};