//蕲春广东麻将
var majiang_panel_qiChunGuangDong = majiang_panel_hubei.extend({
    jsonFile: "Play_qiChunGuangDongMJ.json",

    ctor: function(){
        this._super(majiang_panel_qiChunGuangDong, this.jsonFile);
    },

    getJsBind: function(){
        var jsBind = {
            _event:{
                MJPut:function(data){
                    if(data.genZhuangState){
                        var genZhuangNode =  MjClient.playui.getChildByName("playui").getChildByName("genZhuangNode");
                        if(genZhuangNode && cc.sys.isObjectValid(genZhuangNode)){
                            genZhuangNode.removeAllChildrenWithCleanup(true);
                        }else{
                            genZhuangNode = new cc.Node();
                            genZhuangNode.setName("genZhuangNode");
                            genZhuangNode.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
                            MjClient.playui.getChildByName("playui").addChild(genZhuangNode);
                        }

                        var genZhuangSpineNode = createSpine("spine/genzhuang/yang.json", "spine/genzhuang/yang.atlas");
                        genZhuangSpineNode.setAnimation(0, 'genzhuang', false);
                        genZhuangSpineNode.setPosition(0,0);
                        genZhuangSpineNode.setTimeScale(1.5);
                        genZhuangSpineNode.setScale(0.5);
                        genZhuangNode.addChild(genZhuangSpineNode);
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
                            if(MjClient.rePlayVideo == -1)
                                this.setHunCard();
                        },
                        changeMJBgEvent: function(){
                            this.setHunCard();
                        },
                        switch2Dor3D:function(){
                            if(!MjClient.playui.isInGame()){
                                return;
                            }
                            this.stopAllActions();
                            this.setHunCard();
                        }
                    },
                    setHunCard: function(){
                        this.visible = false;
                        if(!MjClient.playui.isInGame()) return;
                        this.visible = true;
                        var hunCardNode = this.getChildByName("img_hunCard");
                        var hunCard = MjClient.playui.getHunCard();
                        if(hunCard.length == 0) return;
                        hunCardNode.tag = hunCard[0];
                        MjClient.playui.setCardSprite(hunCardNode, hunCard[0], true);
                        var laiIcon = hunCardNode.getChildByName("laiZi");
                        laiIcon.setPosition(cc.pAdd(laiIcon.getPosition(), cc.p( -20, -33)));
                        var pos_offset = cc.p(0,0);
                        if(!MjClient.playui.is3DStyle()){
                            pos_offset = cc.p(0, this.getContentSize().height * this.offset_2d);
                        }
                        var piZiCardEndPos = cc.pAdd(this.originalPos, pos_offset);
                        this.setPosition(piZiCardEndPos);
                    },
                },
                img_hunpai1:{
                     _run:function(){
                        if(MjClient.playui.isIPad()){
                            setWgtLayout(this,[0.065, 0.065], [0.08, 0.8], [0.2, 1.2]);
                            this.offset_2d = 1 * cc.winSize.height / 1024;
                        }else if(MjClient.playui.isIPhoneX()){
                            setWgtLayout(this,[0.08, 0.08], [0.08, 0.8], [0, 0.4]);
                            this.offset_2d = 0.6 * cc.winSize.height / 640;
                        }else{
                            setWgtLayout(this,[0.08, 0.08], [0.08, 0.8], [0.4, 0.65]);
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
                            if(MjClient.rePlayVideo == -1)
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
                        if(hunCard.length < 2) return;
                        this.visible = true;
                        var hunCardNode = this.getChildByName("img_hunCard");
                        hunCardNode.tag = hunCard[1];
                        MjClient.playui.setCardSprite(hunCardNode, hunCard[1], true);
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
                    },
                }
            },
            node_down:{
                layout_head:{
                    atlas_score:{
                        _event: {
                            MJPut:function(){
                                this.updateScore();
                            }
                        },
                        updateScore: function(){
                            var player = MjClient.playui.getPlayerInfoByName("node_down");
                            if (!player) {
                                return false;
                            }
            
                            changeAtalsForLabel(this, player.winall + player.genZhuangScore);
                            return true;              
                        },
                    }
                }
            },
            node_right:{
                layout_head:{
                    atlas_score:{
                        _event: {
                            MJPut:function(){
                                this.updateScore();
                            }
                        },
                        updateScore: function(){
                            var player = MjClient.playui.getPlayerInfoByName("node_right");
                            if (!player) {
                                return false;
                            }
            
                            changeAtalsForLabel(this, player.winall + player.genZhuangScore);
                            return true;              
                        },
                    }
                }
            },
            node_top:{
                layout_head:{
                    atlas_score:{
                        _event: {
                            MJPut:function(){
                                this.updateScore();
                            }
                        },
                        updateScore: function(){
                            var player = MjClient.playui.getPlayerInfoByName("node_top");
                            if (!player) {
                                return false;
                            }
            
                            changeAtalsForLabel(this, player.winall + player.genZhuangScore);
                            return true;              
                        },
                    }
                }
            },
            node_left:{
                layout_head:{
                    atlas_score:{
                        _event: {
                            MJPut:function(){
                                this.updateScore();
                            }
                        },
                        updateScore: function(){
                            var player = MjClient.playui.getPlayerInfoByName("node_left");
                            if (!player) {
                                return false;
                            }
            
                            changeAtalsForLabel(this, player.winall + player.genZhuangScore);
                            return true;              
                        },
                    }
                }
            }
        };

        return jsBind;
    }
});

//动画展示痞子牌和癞子牌
majiang_panel_qiChunGuangDong.prototype.showPiZiAndLaiZi = function(node){
    var hunCards = this.getHunCard();
    if(hunCards.length == 0) return;
    var piZiCard = node.getChildByName("img_hunpai");
    var laiZiCard = node.getChildByName("img_hunpai1");
    piZiCard.setHunCard();
    laiZiCard.setHunCard();
    let pos = cc.p(cc.winSize.width/2, cc.winSize.height/2);
    var piZiCardSpineNode = piZiCard.getChildByName("spineNode");
    if(piZiCardSpineNode) piZiCardSpineNode.removeFromParent(true);
    piZiCard.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
    piZiCard.setScale(0);

    var laiZiCardSpineNode = laiZiCard.getChildByName("spineNode");
    if(laiZiCardSpineNode) laiZiCardSpineNode.removeFromParent(true);
    
    var pos_offset = cc.p(0,0);
    if(!this.is3DStyle()){
        pos_offset = cc.p(0, piZiCard.getContentSize().height * piZiCard.offset_2d);
    }

    if(hunCards.length == 2){
        laiZiCard.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
        laiZiCard.setScale(0);
    }

    var piZiCardEndPos = cc.pAdd(piZiCard.originalPos, pos_offset);
    var laiZiCardEndPos = cc.pAdd(laiZiCard.originalPos, pos_offset);

    var piCardAction = cc.sequence(cc.EaseElasticOut.create(cc.scaleTo(0.5, laiZiCard.originalScale + 0.5)), cc.callFunc(function(){
        if(hunCards.length == 1){
            piZiCard.runAction(cc.spawn(cc.scaleTo(0.2, piZiCard.originalScale), cc.moveTo(0.2, piZiCardEndPos)));
        }else{
            piZiCard.runAction(cc.moveTo(0.2, cc.pAdd(pos, cc.p(-100 * cc.winSize.width / 640, 0))));
        }
    }));
    piZiCard.runAction(piCardAction);

    if(hunCards.length == 2){
        var laiCardAction = cc.sequence(cc.delayTime(0.5), cc.EaseElasticOut.create(cc.scaleTo(0.5, laiZiCard.originalScale + 0.5)), cc.delayTime(0.5), cc.callFunc(function(){
            piZiCard.runAction(cc.spawn(cc.scaleTo(0.2, piZiCard.originalScale), cc.moveTo(0.2, piZiCardEndPos)));
            laiZiCard.runAction(cc.spawn(cc.scaleTo(0.2, laiZiCard.originalScale), cc.moveTo(0.2, laiZiCardEndPos)));
        }));
        laiZiCard.runAction(laiCardAction);
    }
};

majiang_panel_qiChunGuangDong.prototype.getHunCard = function(){
    var tData = MjClient.data.sData.tData;
    if(tData.areaSelectMode.hunType == 0){
        return [];
    }

    var hunCards = [];
    if(tData.areaSelectMode.hunType >= 1){
        hunCards.push(tData.hunCard);
        if(tData.areaSelectMode.hunType == 2){
            hunCards.push(tData.hunCard1);
        }
    }
    return hunCards;
};

//Override 是否能添加癞子标识
majiang_panel_qiChunGuangDong.prototype.isCanAddLaiZiIcon = function(cardTag){
    var tData = MjClient.data.sData.tData;
    var hunCards = [];
    if(tData.areaSelectMode.hunType >= 1){
        hunCards.push(tData.hunCard);
        if(tData.areaSelectMode.hunType == 2){
            hunCards.push(tData.hunCard1);
        }
    }
    return hunCards.indexOf(cardTag) != -1;
};

//Override 添加癞子标识
majiang_panel_qiChunGuangDong.prototype.addLaiZiIcon2D = function(cardNode){
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
majiang_panel_qiChunGuangDong.prototype.getPiZiGangIconPositionOffset2D = function(cardNode){
    var playerNodeName = cardNode.getParent().getName();
    
    if(playerNodeName == "node_down"){
        if(cardNode.name == this.HandleCardType.Hand){
            return [-22, -36];
        }
        if(cardNode.name == this.HandleCardType.Peng || cardNode.name == this.HandleCardType.AnGang 
            || cardNode.name == this.HandleCardType.MingGang || cardNode.name == this.HandleCardType.PengGang){
            return [-22, 0];
        }
    }
    return [0, 0];
};

//Override 添加癞子标识
majiang_panel_qiChunGuangDong.prototype.addLaiZiIcon3D = function(cardNode){
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

majiang_panel_qiChunGuangDong.prototype.getLaiZiIconOff3D = function(cardNode){
    var nodeName = cardNode.getParent().getName();
    if(nodeName == "node_down"){
        if(cardNode.name == this.HandleCardType.Chi){
            return cc.p(-20, -5);
        }
    }
    return cc.p(0, 0);
};

//Override
majiang_panel_qiChunGuangDong.prototype.getLaiZiIcon2D = function(){
    var laiZiNode = new ccui.ImageView();
    laiZiNode.setName("laiZi");
    laiZiNode.loadTexture("playing/MJ/gui.png");
    return laiZiNode;
};

//Override 是否显示飘分
majiang_panel_qiChunGuangDong.prototype.isShowPiao = function(){
	return false;
};

majiang_panel_qiChunGuangDong.prototype.getHunIconPosition2D = function(){
    return [[60, 107], [52, 70], [40, 104], [74, 68], [40, 78], [61, 77], [22, 30]];
};

//Override 癞子位置偏移比
majiang_panel_qiChunGuangDong.prototype.getEatAndHandCardsLaiZiIconPosSpcae3D = function(){
    return cc.p(0.88, 1.1);
};


// Override 获得3D癞子牌标签位置
majiang_panel_qiChunGuangDong.prototype.getLaiZiIconPosition3D = function (cardNode) {
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

majiang_panel_qiChunGuangDong.prototype.getLaiZiIconPosition3DOfRight = function(cardNode){
    return cc.p(cardNode.width * 0.53, cardNode.width * 0.55);
};

majiang_panel_qiChunGuangDong.prototype.getLaiZiIconPosition3DOfLeft = function(cardNode){
    return cc.p(cardNode.width * 0.49, cardNode.width * 0.515);
};

majiang_panel_qiChunGuangDong.prototype.getLaiZiIconPosition3DOfTop = function(cardNode){
    return cc.p(cardNode.width * 0.45, cardNode.height * 0.6);
};

majiang_panel_qiChunGuangDong.prototype.getIsZhongBird = function(cd){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var winPlayerIdx;
    //只展示第一个胡牌玩家的中鸟
    for(var i = 0; i < tData.uids.length; i++){
        var pl = sData.players[tData.uids[i]];
        if(pl.winType > 0){
            winPlayerIdx = i;
            break;
        }
    }

    var niaoArr;
    var offset = (winPlayerIdx + tData.maxPlayer - tData.zhuang) % tData.maxPlayer
    if(tData.maxPlayer == 4){
        if(tData.areaSelectMode.maCount == 1){
            return tData.areaSelectMode.maCount == 1;
        }

        if(offset == 0){
            niaoArr = [1,11,21,5,15,25,9,19,29,31, 71];
        }else if(offset == 1){
            niaoArr = [2,12,22,6,16,26,41, 81];
        }else if(offset == 2){
            niaoArr = [3,13,23,7,17,27,51, 91];
        }else if(offset == 3){
            niaoArr = [4,14,24,8,18,28, 61];
        }
        return niaoArr.indexOf(cd) != -1;
    }else if(tData.maxPlayer == 3 || tData.maxPlayer == 2){
        return tData.areaSelectMode.maCount == 1;
    }
    return false;
};
