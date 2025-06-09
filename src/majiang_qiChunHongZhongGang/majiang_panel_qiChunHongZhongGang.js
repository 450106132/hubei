//蕲春红中杠
var majiang_panel_qiChunHongZhongGang = majiang_panel_hubei.extend({
    jsonFile: "Play_qiChunHongZhongGang.json",
    GANG_TYPE:{ ////杠类型
        NORMAL: 0,
        PI_ZI_GANG: 1,
        LAI_ZI_GANG: 2,  
    },
    //动画名称映射
    ExpandEatActionType:{
        JinDing:            "jinding",//金顶
        LaiZiGang:          "lazigang",//癞子杠
        PiZiGang:           "pizigang",//痞子杠
    },
    PI_ZAI_CARD_TYPE: 0,//痞子牌类型
    LAI_ZI_CARD_TYPE: 1,//癞子牌类型

    ctor: function(){
        this._super(majiang_panel_qiChunHongZhongGang, this.jsonFile);
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
                            if(MjClient.rePlayVideo == -1){
                                this.setPiZiCard();
                            }
                          
                        },
                        changeMJBgEvent: function(){
                            this.setPiZiCard();
                        },
                        switch2Dor3D:function(){
                            if(!MjClient.playui.isInGame()){
                                return;
                            }
                            this.stopAllActions();
                            this.setPiZiCard();
                        }
                    },
                    setPiZiCard: function(){
                        this.visible = false;
                        if(!MjClient.playui.isInGame()) return;
                        var hunCard = MjClient.playui.getPiZiCard();
                        if(!hunCard || hunCard <=0) return;
                        this.visible = true;
                        var hunCardNode = this.getChildByName("img_hunCard");
                        hunCardNode.tag = hunCard;
                        MjClient.playui.setCardSprite(hunCardNode,hunCard, true);
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
                        if(!hunCard && hunCard <= 0) return;
                        this.visible = true;
                        var hunCardNode = this.getChildByName("img_hunCard");
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
                    },
                }
            },
            node_down:{
                img_piZiGang:{
                    _visible: false,
                    _run: function(){
                        MjClient.playui.updateOtherCardSize(this);
                    },
                    _event: {
                        switch2Dor3D: function(){
                            MjClient.playui.updateOtherCardSize(this);              
                        }
                    }
                },
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
                        _visible: true,
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
                }
            },
            node_top:{
                img_piZiGang:{
                    _visible: false,
                    _run: function(){
                        MjClient.playui.updateOtherCardSize(this);
                    },
                    _event: {
                        switch2Dor3D: function(){
                            MjClient.playui.updateOtherCardSize(this);              
                        }
                    }
                },
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
                }
            },
            node_right:{
                img_piZiGang:{
                    _visible: false,
                    _run: function(){
                        MjClient.playui.updateOtherCardSize(this);
                    },
                    _event: {
                        switch2Dor3D: function(){
                            MjClient.playui.updateOtherCardSize(this);              
                        }
                    }
                },
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
                img_eatFrontCard: {
                    _run: function(){
                        if(MjClient.playui.isIPad()){
                            setWgtLayout(this, [0, 0.058], [1, 0], [-2.4, 4]);
                        }else if(MjClient.playui.isIPhoneX()){
                            setWgtLayout(this, [0, 0.058], [1, 0], [-3.5, 4]);
                        }else{
                            setWgtLayout(this, [0, 0.058], [1, 0], [-3.2, 3.5]);
                        }
                    }
                },
                img_handCard:{
                    _run: function(){
                        if(MjClient.playui.isIPad() || MjClient.playui.isIPhoneX())
                            setWgtLayout(this, [0, 0.085], [1, 0], [-4.5, 3.5]);
                        else
                            setWgtLayout(this, [0, 0.1], [1, 0], [-5, 3]);

                        this.setFlippedX(false);
                        this.setFlippedY(false);
                        this.setRotation(0);
                        var is3D = MjClient.playui.is3DStyle();
                        if(!is3D){
                            this.setFlippedX(true);
                        }
                    }
                }
            },
            node_left:{
                img_piZiGang:{
                    _visible: false,
                    _run: function(){
                        MjClient.playui.updateOtherCardSize(this);
                    },
                    _event: {
                        switch2Dor3D: function(){
                            MjClient.playui.updateOtherCardSize(this);              
                        }
                    }
                },
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
                img_handCard: {
                    _run: function(){
                        if(MjClient.playui.isIPad())
                            setWgtLayout(this, [0, 0.085], [0, 1], [5, -2.6]);
                        else if(MjClient.playui.isIPhoneX()){
                            setWgtLayout(this, [0, 0.1], [0, 1], [6, -1.5]);
                        }else{
                            setWgtLayout(this, [0, 0.1], [0, 1], [5.1, -1.5]);
                        }
                            
                    }
                }
            },
            node_ani:{
                _layout:[[0.3,0.3],[0.5,0.55],[0,0]],
                _run: function() {
                    this.visible = false;
                },
                _event:{
                    newCard: function() {
                        var tData = MjClient.data.sData.tData;
                        if(MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext == (MjClient.MaxPlayerNum + 10)){
                            MjClient.playui.createFenZhangAni(this);
                        }
                    },
                }
            }
        };

        return jsBind;
    }
});

//获取痞子牌
majiang_panel_qiChunHongZhongGang.prototype.getPiZiCard = function(){
    return MjClient.data.sData.tData.piZiCard;
};

//动画展示痞子牌和癞子牌
majiang_panel_qiChunHongZhongGang.prototype.showPiZiAndLaiZi = function(node){
    var piZiCard = node.getChildByName("img_hunpai");
    var laiZiCard = node.getChildByName("img_hunpai1");
    piZiCard.setPiZiCard();
    laiZiCard.setHunCard();
    let pos = cc.p(cc.winSize.width/2, cc.winSize.height/2);
    piZiCard.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
    piZiCard.setScale(0);
   
    var laiZiCardSpineNode = laiZiCard.getChildByName("spineNode");
    if(laiZiCardSpineNode) laiZiCardSpineNode.removeFromParent(true);
    laiZiCard.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
    laiZiCard.setScale(0);
    var pos_offset = cc.p(0,0);
    if(!this.is3DStyle()){
        pos_offset = cc.p(0, piZiCard.getContentSize().height * piZiCard.offset_2d);
    }
    var piZiCardEndPos = cc.pAdd(piZiCard.originalPos, pos_offset);
    var laiZiCardEndPos = cc.pAdd(laiZiCard.originalPos, pos_offset);
    var piZiCardAction = cc.sequence(cc.EaseElasticOut.create(cc.scaleTo(0.5, piZiCard.originalScale + 0.5)), cc.moveTo(0.2, cc.pAdd(pos, cc.p(-100 * cc.winSize.width / 640, 0))));
    piZiCard.runAction(piZiCardAction);
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
        piZiCard.runAction(cc.spawn(cc.scaleTo(0.2, piZiCard.originalScale), cc.moveTo(0.2, piZiCardEndPos)));
        laiZiCard.runAction(cc.spawn(cc.scaleTo(0.2, laiZiCard.originalScale), cc.moveTo(0.2, laiZiCardEndPos)));
    }));
    laiZiCard.runAction(laiCardAction);
};

//Override 是否能添加癞子标识
majiang_panel_qiChunHongZhongGang.prototype.isCanAddLaiZiIcon = function(cardTag){
    var tData = MjClient.data.sData.tData;
    if(cardTag == this.getHunCard() || cardTag == this.getPiZiCard() || cardTag == 71){
        return true;
    }
    return false;
};

//Override
majiang_panel_qiChunHongZhongGang.prototype.getLaiZiIcon2D = function(cardTag){
    var laiZiNode = new ccui.ImageView();
    laiZiNode.setName("laiZi");
    var texturePath;
    if(cardTag == this.getHunCard()){
        texturePath = "playing/MJ/enshi_lai.png";
    }else if(cardTag == this.getPiZiCard() || cardTag == 71){
        texturePath = "playing/MJ/enshi_pi.png";
    }
       
    laiZiNode.loadTexture(texturePath);
    return laiZiNode;
};

//Override 是否显示飘分
majiang_panel_qiChunHongZhongGang.prototype.isShowPiao = function(){
	return false;
};

majiang_panel_qiChunHongZhongGang.prototype.getHunIconPosition2D = function(){
    return [[60, 107], [52, 70], [40, 104], [74, 68], [40, 78], [61, 77], [22, 30]];
};

//Override 癞子位置偏移比
majiang_panel_qiChunHongZhongGang.prototype.getEatAndHandCardsLaiZiIconPosSpcae3D = function(){
    return cc.p(0.88, 1.1);
};


//Override [createEndOnePanel 创建小结算界面]
majiang_panel_qiChunHongZhongGang.prototype.createEndOnePanel = function(){
    return new majiang_winGamePanel_qiChunHongZhongGang();
};

//Override 处理麻将杠牌
majiang_panel_qiChunHongZhongGang.prototype.dealGang = function(playerNode, msg) {
    majiang_panel.prototype.dealGang.call(this, playerNode, msg);
    this.dealPiZiGangOrLaiZiGang(playerNode, msg);
};

//处理麻将痞子杠和癞子杠
majiang_panel_qiChunHongZhongGang.prototype.dealPiZiGangOrLaiZiGang = function(playerNode, msg) {
    if(msg.cpginfo.gangType == 1 || msg.cpginfo.gangType == 2){//痞子杠和癞子杠
        var gangCard = msg.card;
    
        if (MjClient.rePlayVideo != -1) {
            this.removeCard(playerNode, this.HandleCardType.Hand, gangCard, 1);
        } else {
            var player = this.getPlayerInfoByName(playerNode.getName());
            if(playerNode.getName() != "node_down" || (player.tPutCard || player.trust)){//自己手动出牌时，已经在出牌的时候把牌删了，所以不用再次删
                this.removeCard(playerNode, this.HandleCardType.Hand, null, 1);
            }   
        }

        var gangType = this.HandleCardType.PiZiGang;
        if(msg.cpginfo.gangType == 2){
            gangType = this.HandleCardType.LaiZiGang;
        }

        this.createCard(playerNode, this.CsdDefaultCardType.PiZiGang, gangType, gangCard);
        this.resetCardLayout(playerNode);
        
        var sData = MjClient.data.sData;
        var tData = sData.tData;
       
        this.showEatActionAnim(playerNode, this.AnimationType.GANG);
    }
};

//Override 
majiang_panel_qiChunHongZhongGang.prototype.getPlayerEatNode = function(){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var player = sData.players[this.getSelfUid()];
    var eat = MjClient.playui.jsBind.node_eat;
    var nodeArr = [];
    this.gangCardArray = [];
    if(this.isTurnMe()){
        //杠
        if(this.checkGangBtn(player) && !this.clickGangPass && (MjClient.majiang.getAllCardsTotal(tData) - 10 - tData.maxPlayer >= tData.cardNext)){
            nodeArr.push(eat.btn_gang._node);
        }

        //胡
        if (player.eatFlag & 8) {
            nodeArr.push(eat.btn_hu._node);
        }
    }else{
        if (player.eatFlag & 4 ) {
            nodeArr.push(eat.btn_gang._node);
            this.gangCardArray.push(tData.lastPutCard);
        }
        if (player.eatFlag & 8) {
            nodeArr.push(eat.btn_hu._node);
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

//Override 所有的牌进行排序
majiang_panel_qiChunHongZhongGang.prototype.getCardSortArray2D = function(node, newCardTag){
    var tData = MjClient.data.sData.tData;
    var handArr = [], anGangArr = [], mingGangArr = [], pengGangArr = [],pengArr = [], chiArr = [], laiZiArr = [], piZiArr = [], hongZhongArr = [];
    var children = node.children;
    var i, newCard = null;
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
            if(child.tag == this.getHunCard()){
                laiZiArr.push(child);
                continue;
            }
            if(child.tag == this.getPiZiCard()){
                piZiArr.push(child);
                continue;
            }

            if(child.tag == 71){
                hongZhongArr.push(child);
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
    if(this.getNodeIndexDefaultByName(node.getName()) == 1){
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
    for(i = 0;i < piZiArr.length;i++){
        handArr.unshift(piZiArr[i]);
    }

    for(i = 0; i < hongZhongArr.length; i++){
        handArr.unshift(hongZhongArr[i]);
    }

    return [].concat(anGangArr, mingGangArr, pengGangArr,pengArr, chiArr, handArr);
};

//Override 所有的牌进行排序
majiang_panel_qiChunHongZhongGang.prototype.getCardSortArray3D = function(node, newCardTag){
    var tData = MjClient.data.sData.tData;
    var handArr = [], anGangArr = [], mingGangArr = [], pengArr = [], chiArr = [], laiZiArr = [], piZiArr = [], hongZhongArr = [];
    var children = node.children;
    var i, newCard = null;
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
            if(child.tag == this.getHunCard()){
                laiZiArr.push(child);
                continue;
            }
            if(child.tag == this.getPiZiCard()){
                piZiArr.push(child);
                continue;
            }

            if(child.tag == 71){
                hongZhongArr.push(child);
                continue;
            }
            handArr.push(child);
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
    for(i = 0;i < laiZiArr.length;i++){
        handArr.unshift(laiZiArr[i]);
    }
    for(i = 0;i < piZiArr.length;i++){
        handArr.unshift(piZiArr[i]);
    }

    for(i = 0;i < hongZhongArr.length;i++){
        handArr.unshift(hongZhongArr[i]);
    }

    var cardArray = [].concat(anGangArr, mingGangArr, pengArr, chiArr, handArr);
    var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
    if(nodeIndex == 1 || nodeIndex == 2){
        cardArray.reverse();
    }    
    return cardArray;
};

//Override发送杠的命令
majiang_panel_qiChunHongZhongGang.prototype.sendGangToServer = function (card){
    if (MjClient.rePlayVideo != -1) {
    	return;
    }
    this.sendAutoPutToServer(false);
    var gangType = this.GANG_TYPE.NORMAL;

    if(card == this.getPiZiCard() || card == 71){
        gangType = this.GANG_TYPE.PI_ZI_GANG;
    }else if(card == this.getHunCard()){
        gangType = this.GANG_TYPE.LAI_ZI_GANG;
    }
    var sendMsg = {
    	cmd: "MJGang",
        card: card,
        gangType: gangType,
    	eatFlag: this.getEatFlag()
    };

    MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
};

//设置其他牌大小
majiang_panel_qiChunHongZhongGang.prototype.updateOtherCardSize = function(node){
    var is3D = MjClient.playui.is3DStyle();
    var maxPlayer = MjClient.playui.getMaxPlayer();
    var playNode = node.getParent();
    var _ds = 0;
    if(playNode.getName() == "node_down"){
        if(node.getName() == "img_eatFrontCard"){
            if(!is3D){
                setWgtLayout(node, [0.05, 0], [0.05, 0], [2, 0.55]);
            }else{
                setWgtLayout(node, [0.043, 0], [0, 0], [1, 0.5]);
            }
        }
        if(node.getName() == "img_putCardOne"){
            if(!is3D){
                if(MjClient.size.width / MjClient.size.height >= 1.5){
                    if(maxPlayer === 2)
                        setWgtLayout(node, [0, 0.088], [0.306, 0], [-5, 4]);
                    else if(maxPlayer === 3){
                        setWgtLayout(node, [0, 0.088], [0.506, 0], [-5, 3.7]);
                    }else{
                        setWgtLayout(node, [0, 0.088], [0.506, 0], [-5, 4]);
                    }
                }else if(this.isIPad()){
                    if(maxPlayer === 2)
                        setWgtLayout(node, [0, 0.075], [0.306, 0], [-6, 3.4]);
                    else if(maxPlayer === 3){
                        setWgtLayout(node, [0, 0.075], [0.306, 0], [-6, 3.4]);
                    }else{
                        setWgtLayout(node, [0, 0.075], [0.506, 0], [-6, 3.4]);
                    } 
                }else{
                    if(maxPlayer === 2)
                        setWgtLayout(node, [0, 0.08], [0.306, 0], [-1, 4]);
                    else if(maxPlayer == 3){
                        setWgtLayout(node, [0, 0.08], [0.506, 0], [-1, 4]);
                    }else{
                        setWgtLayout(node, [0, 0.08], [0.506, 0], [-1, 4]);
                    }  
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
        if(node.getName() == "img_piZiGang"){
            if(!is3D){
                if(MjClient.size.width / MjClient.size.height >= 1.5){
                    if(maxPlayer == 3){
                        setWgtLayout(node, [0, 0.088], [0.4, 0], [0, 2.8]);
                    }else if(maxPlayer == 4){
                        setWgtLayout(node, [0, 0.088], [0.4, 0], [0, 2.8]);
                    }else{
                        setWgtLayout(node, [0, 0.088], [0.306, 0], [0, 2.9]);
                    }
                }else if(this.isIPad()){
                    setWgtLayout(node, [0, 0.075], [0.306, 0], [-6, 1.9]);
                }else{
                    setWgtLayout(node, [0, 0.08], [0.306, 0], [-1, 2.5]);
                }
            }else{
                _ds = this.isIPad() ? -0.01 : -0.005;
                if(maxPlayer == 4){
                    if(this.isIPad()){
                        setWgtLayout(node, [0.0, 0.08 + _ds], [0.506, -0.03], [-7, 2.6]);
                    }else{
                        setWgtLayout(node, [0.0, 0.08 + _ds], [0.506, -0.03], [-7, 3.1]);
                    }
                }else if(maxPlayer == 3){
                    setWgtLayout(node, [0.0, 0.08 + _ds], [0.506, -0.03], [-7, 3.1]);
                }else if(maxPlayer == 2){
                    setWgtLayout(node, [0.0, 0.08 + _ds], [0.506, -0.03], [-7, 3.1]);
                } 
            } 
        }
    }
    if(playNode.getName() == "node_right"){
        if(node.getName() == "img_putCardOne"){
            if(!is3D){
                if(MjClient.size.width / MjClient.size.height >= 1.5){
                    setWgtLayout(node, [0, 0.063], [1, 0.5], [-6.4, -3.5]);
                }else if(this.isIPad()){
                    setWgtLayout(node, [0, 0.053], [1, 0.5], [-6.4, -4.5]);
                }else{
                    setWgtLayout(node, [0, 0.058], [1, 0.5], [-6.4, -4.5]);
                }
            }else{
                _ds = this.isIPad() ? -0.01 : 0;
                if(maxPlayer == 4){
                    setWgtLayout(node, [0, 0.056+ _ds], [0.9, 0.645], [-5.4, -4.0]);
                }else if(maxPlayer == 3){
                    setWgtLayout(node, [0, 0.056+ _ds], [0.839, 0.742], [-5.2, -4.0]);
                }else{
                    setWgtLayout(node, [0, 0.056+ _ds], [0.9, 0.645], [-5.4, -4.0]);
                }
            }
        }
        
        if(node.getName() == "img_piZiGang"){
            if(!is3D){
                if(MjClient.size.width / MjClient.size.height >= 1.5){
                    setWgtLayout(node, [0, 0.063], [1, 0.5], [-4.3, -3.5]);
                }else if(this.isIPad()){
                    setWgtLayout(node, [0, 0.053], [1, 0.5], [-3.8, -2]);
                }else{
                    setWgtLayout(node, [0, 0.058], [1, 0.5], [-4.3, -4.5]);
                }
            }else{
                _ds = this.isIPad() ? -0.01 : 0;
                if(maxPlayer == 4){
                    if(this.isIPad()){
                        setWgtLayout(node, [0, 0.056+ _ds], [0.9, 0.645], [-2.4, -4.0]);
                    }else if(this.isIPhoneX()){
                        setWgtLayout(node, [0, 0.056+ _ds], [0.9, 0.645], [-2.9, -4.0]);
                    }else{
                        setWgtLayout(node, [0, 0.056+ _ds], [0.9, 0.645], [-2.05, -4.0]);
                    }
                }else if(maxPlayer == 3){
                    setWgtLayout(node, [0, 0.056+ _ds], [0.903, 0.60], [-2.9, -4.0]);
                } 
            }
        }
    }
    if(playNode.getName() == "node_top"){
        if(node.getName() == "img_eatFrontCard"){
            if(!is3D){
                if(this.isIPad()){
                    setWgtLayout(node, [0, 0.075], [0.5, 1], [10, -1.05]);
                }else{
                    setWgtLayout(node, [0, 0.075], [0.5, 1], [10, -1.29]);
                }
            }else{
                if(maxPlayer == 4){
                    if(this.isIPad()){
                        setWgtLayout(node, [0, 0.07], [0.5, 1.015], [6, -1]);
                    }else{
                        setWgtLayout(node, [0, 0.07], [0.5, 1.015], [6, -1.4]);
                    }
                }else if(maxPlayer == 2){
                    setWgtLayout(node, [0, 0.07], [0.5, 1.033], [6, -1.4]);
                }
            }            
        }
        if(node.getName() == "img_putCardOne"){
            if(!is3D){
                if(MjClient.size.width / MjClient.size.height >= 1.5){
                    if(maxPlayer === 2)
                        setWgtLayout(node, [0, 0.088], [0.7, 1], [6, -3]);
                    else
                        setWgtLayout(node, [0, 0.088], [0.5, 1], [6, -3]);
                }else if(MjClient.playui.isIPad()){
                    if(maxPlayer === 2)
                        setWgtLayout(node, [0, 0.075], [0.75, 1], [4.8, -3.0]);
                    else
                        setWgtLayout(node, [0, 0.075], [0.55, 1], [4.8, -3.0]);
                }else{
                    if(maxPlayer === 2)
                        setWgtLayout(node, [0, 0.08], [0.7, 1], [4.8, -3]);
                    else
                        setWgtLayout(node, [0, 0.08], [0.5, 1], [4.8, -3]);
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
        if(node.getName() == "img_piZiGang"){
            if(!is3D){
                if(MjClient.size.width / MjClient.size.height >= 1.5){
                    if(maxPlayer === 2)
                        setWgtLayout(node, [0, 0.075], [0.7, 1], [0, -2.4]);
                    else
                        setWgtLayout(node, [0, 0.075], [0.5, 1], [0, -2.4]);
                }else if(MjClient.playui.isIPad()){
                    if(maxPlayer === 2)
                        setWgtLayout(node, [0, 0.07], [0.75, 1], [4.8, -3.2]);
                    else
                        setWgtLayout(node, [0, 0.07], [0.45, 1], [4.8, -2.2]);
                }else{
                    if(maxPlayer === 2)
                        setWgtLayout(node, [0, 0.075], [0.7, 1], [4.8, -3.5]);
                    else
                        setWgtLayout(node, [0, 0.075], [0.5, 1], [4.8, -3.5]);
                }
            }else{
                _ds = MjClient.playui.isIPad() ? -0.01 : 0;
                if(maxPlayer == 4){
                    setWgtLayout(node, [0, 0.07 + _ds], [0.57, 0.98], [0.5, -1.5]);
                }else if(maxPlayer == 2){
                    setWgtLayout(node, [0, 0.07 + _ds], [0.57, 0.98 ], [0.5, -1.5]);
                } 
            }
        }
    }
    if(playNode.getName() == "node_left"){
        if(node.getName() == "img_eatFrontCard"){
            if(!is3D){
                if(this.isIPad()){
                    setWgtLayout(node, [0, 0.058], [0.011, 1], [2.5, -2]); 
                }else if(this.isIPhoneX()){
                    setWgtLayout(node, [0, 0.058], [0.011, 1], [3.5, -1]); 
                }else{
                    setWgtLayout(node, [0, 0.058], [0.011, 1], [3.1, -1]); 
                }
                
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
                    setWgtLayout(node, [0, 0.063], [0.05, 0.5], [6.4, 4.2]);
                }else if(this.isIPad()){
                    setWgtLayout(node, [0, 0.053], [0.05, 0.55], [6.4, 4.2]);
                }else{
                    setWgtLayout(node, [0, 0.058], [0.05, 0.5], [6.4, 4.2]);
                } 
            }else{
                _ds = this.isIPad() ? -0.01 : 0;
                if(maxPlayer == 4){
                    setWgtLayout(node, [0, 0.056+ _ds], [0.125, 0.493], [5.4, 4.2]);
                }else if(maxPlayer == 3){
                    setWgtLayout(node, [0, 0.056+ _ds], [0.182, 0.592], [5.2, 4.2]);
                }           
            }
        } 
        if(node.getName() == "img_piZiGang"){
            if(!is3D){
                if(MjClient.size.width / MjClient.size.height >= 1.5){
                    setWgtLayout(node, [0, 0.063], [0.05, 0.5], [3.2, 4.2]);
                }else if(this.isIPad()){
                    setWgtLayout(node, [0, 0.053], [0.05, 0.55], [3.0, 3]);
                }else{
                    setWgtLayout(node, [0, 0.058], [0.05, 0.5], [3.2, 3.5]);
                } 
            }else{
                _ds = this.isIPad() ? -0.01 : 0;
                if(maxPlayer == 4){
                    if(this.isIPad()){
                        setWgtLayout(node, [0, 0.056+ _ds], [0.125, 0.493], [2.4, 4.2]);
                    }else if(this.isIPhoneX()){
                        setWgtLayout(node, [0, 0.056+ _ds], [0.125, 0.493], [3.2, 4.2]);
                    }else{
                        setWgtLayout(node, [0, 0.056+ _ds], [0.125, 0.493], [2.4, 4.2]);
                    }
                }else if(maxPlayer == 3){
                    setWgtLayout(node, [0, 0.056+ _ds], [0.125, 0.493], [3.2, 4.2]);
                }else{
                    setWgtLayout(node, [0, 0.056+ _ds], [0.125, 0.493], [3.2, 4.2]);
                }       
            }
        }
    }
};

//Override 计算打牌插牌位置
majiang_panel_qiChunHongZhongGang.prototype.getInsertCardPosIndex = function (handcardUI, index) {
    var tagValue = handcardUI[index].tag;

    //红中
    if(this.newCardNode && this.newCardNode.tag == 71){
        return 0;
    }

    //痞子
    if(this.newCardNode && this.newCardNode.tag == this.getPiZiCard()){
        if(tagValue == 71){
            return -1;
        }
        return index;
    }

    //癞子牌
    if(this.newCardNode && this.newCardNode.tag == this.getHunCard()){
        if(tagValue == 71 || tagValue == this.getPiZiCard()){
            return -1;
        }

        return index;
    }

    //不是痞子也不是癞子
    if(this.newCardNode){
        if(tagValue == 71 || tagValue == this.getPiZiCard() || tagValue == this.getHunCard()){
            return -1;
        }
        if(tagValue >= this.newCardNode.tag){
            return index;
        }
    }
    
    return -1;
};

/**
 *  Override 常量定义
 **/
majiang_panel_qiChunHongZhongGang.prototype.initCardTypeName = function(){
    majiang_panel.prototype.initCardTypeName.call(this);
    this.CsdDefaultCardType["PiZiGang"] = "img_piZiGang";
    this.HandleCardType["PiZiGang"] = "piZiGang";
    this.HandleCardType["LaiZiGang"] = "laiZiGang";
};

/**
 *  Override 刷新手牌大小
 **/
majiang_panel_qiChunHongZhongGang.prototype.updateHandCardSize = function(node){
    var playNode = node.getParent();
    var is3D = this.is3DStyle();
    var maxPlayer = MjClient.playui.getMaxPlayer();
    var sizeType = this.getCardSizeType();
    if(playNode.getName() == "node_down"){
        if (sizeType == 0) {
            if (!is3D) {
                setWgtLayout(node, [0.06, 0], [0.11, 0], [0.5, 0.55]);
            } else {
                setWgtLayout(node, [0.043, 0], [0.5, 0], [8, 0.72]);
            }
        } else {
            if (!is3D) {
                setWgtLayout(node, [0.062, 0], [0.11, 0], [0.5, 0.55]);
            } else {
                setWgtLayout(node, [0.044, 0], [0.5, 0], [8, 0.72]);
            }
        } 
    }else if(playNode.getName() == "node_top"){
        if(!is3D){
            if(this.isIPad())
                setWgtLayout(node, [0, 0.07], [0.5, 1], [8, -1.1]);
            else
                setWgtLayout(node, [0, 0.075], [0.5, 1], [8, -1.3]);
        }else{
            if(maxPlayer == 4){
                setWgtLayout(node, [0, 0.07], [0.45, 1.04], [-6, -1.4]);
            }else if(maxPlayer == 2){
                setWgtLayout(node, [0, 0.07], [0.5, 1.04], [6, -1.4]);
            } 
        }
    }   
};

/**
 *  Override 根据牌的类型获得牌与牌之间的距离
 **/
majiang_panel_qiChunHongZhongGang.prototype.getMoveDistance2D = function(node, cardArr, index, chiFirstIndex){
    if(index == 0){
        return 0;
    }
    var handCard = node.getChildByName("img_handCard");
    var eatFrontCard = node.getChildByName("img_eatFrontCard");
    var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
    var cardNode = cardArr[index];
    var offSetScale = this.getCardOffSetScaleByType(cardNode.getParent());
    var handCardSpaceScale = this.getHandCardSpaceScale();
    var add_offSet = cardNode.name == this.HandleCardType.Hand ? 
                    handCard.width * handCard.scale * handCardSpaceScale : eatFrontCard.width * eatFrontCard.scale * offSetScale;
    if(nodeIndex % 2 != 0){
        add_offSet = (cardNode.name == this.HandleCardType.Hand && MjClient.rePlayVideo == -1) ? 
                    handCard.height * handCard.scale * 0.4 : eatFrontCard.height * eatFrontCard.scale * offSetScale;        
    }

    var eatCardSpace = this.getEatCardSpace();        //获得吃碰杠的间距
    if(cardNode.getName() == this.HandleCardType.AnGang || cardNode.getName() == this.HandleCardType.MingGang || cardNode.getName() == this.HandleCardType.PengGang){
        if(cardArr[index + 1] && cardArr[index + 1].tag != cardNode.tag){
            add_offSet = 0;
        }
        if(cardArr[index - 1] && cardArr[index - 1].tag != cardNode.tag){
            add_offSet += eatCardSpace;
        }
    }else if(cardNode.getName() == this.HandleCardType.Peng){
        if(cardArr[index - 1] && cardArr[index - 1].tag != cardNode.tag){
            add_offSet += eatCardSpace;
        }        
    }else if(cardNode.getName() == this.HandleCardType.Hand || (cardNode.name == this.HandleCardType.Chi && cardNode.isCut)){
        var mult = nodeIndex % 2 == 0 ? 1 : nodeIndex == 1 ? 3 : 2;
        if(cardArr[index - 1] && cardArr[index - 1].name != cardNode.name){
            add_offSet += eatCardSpace * mult;
        }           
    }else if(cardNode.getName() == this.HandleCardType.Chi){
        if((cardArr[index - 1] && cardArr[index - 1].name != cardNode.name) ||
            (chiFirstIndex != -1 && (index - chiFirstIndex) % 3 == 0))
        {
            add_offSet += eatCardSpace;
        }

    } 
    return add_offSet;  
};

/**
 *  Override刷新牌
 **/
majiang_panel_qiChunHongZhongGang.prototype.resetCardLayout2D = function(node){
    majiang_panel.prototype.resetCardLayout2D.call(this, node);
    //刷新痞子杠和癞子杠
    var player = this.getPlayerInfoByName(node.getName());
    if(!player){
        return;
    }
    if(player.mjPiZiGang.length == 0) return;

    var piZiGangArr = [];
    var children = node.children;
    var i;
    for(i = 0;i < children.length;i++){
        var child = children[i];
        
        if(child.name == this.HandleCardType.PiZiGang || child.name == this.HandleCardType.LaiZiGang){
            piZiGangArr.push(child);
        }
    }
  
    var templateCard = node.getChildByName("img_piZiGang");
    var start_x = templateCard.x, start_y = templateCard.y;
    var nodeName = node.getName();
    var nodeIndex = this.getNodeIndexDefaultByName(nodeName);

    piZiGangArr.sort(function(a,b){
        return a.upIdx - b.upIdx;
    });

    for(var i = 0;i < piZiGangArr.length; i++){
        var cardNode = piZiGangArr[i];
        cardNode.visible = true;
        cardNode.zIndex = 100 + (nodeIndex != 1 ? i : piZiGangArr.length - i);
        
        var offset_x = 0, offset_y = 0;
        if(nodeIndex % 2 == 0){
            offset_x = templateCard.width * templateCard.scale * i;
            if(nodeIndex == 2)
                offset_x *= -1;
        }else{
            offset_y =  templateCard.height * templateCard.scale * i;
            if(nodeIndex == 3){
                offset_y *= -1;
            }

            if(i != 0){
                offset_y *= 0.76;
            }
        }
        cardNode.setPosition(cc.p(start_x + offset_x, start_y + offset_y));
    }
};

/**
 *  Override 刷新牌,待完成
 **/
majiang_panel_qiChunHongZhongGang.prototype.resetCardLayout3D = function(node){
    majiang_panel.prototype.resetCardLayout3D.call(this, node);
    var player = this.getPlayerInfoByName(node.getName());
    if(!player){
        return;
    }
    if(player.mjPiZiGang.length == 0) return;
    
    var piZiGangArr = [];
    var children = node.children;
    var i;
    for(i = 0;i < children.length;i++){
        var child = children[i];
        
        if(child.name == this.HandleCardType.PiZiGang || child.name == this.HandleCardType.LaiZiGang){
            piZiGangArr.push(child);
        }
    }

    piZiGangArr.sort(function(a, b){
        return a.upIdx - b.upIdx;
    });
    
    var nodeIndex = this.getNodeIndexDefaultByName(node.getName());
    switch(nodeIndex){
        case 0:
            this.updateDownPiZiGangCards3D(node, piZiGangArr);
            break;
        case 1:
            this.updateRightPiZiGangCards3D(node, piZiGangArr);
            break;
        case 2:
            this.updateTopPiZiGangCards3D(node, piZiGangArr);
            break;
        case 3:
            this.updateLeftPiZiGangCards3D(node, piZiGangArr);
            break;
    }
};

//更新node_down玩家的痞子杠和癞子杠
majiang_panel_qiChunHongZhongGang.prototype.updateDownPiZiGangCards3D = function(node, piZiGangArr){
    var templetCard = node.getChildByName(this.CsdDefaultCardType.PiZiGang);
    var scale = templetCard.getScale() * 1.3;

    //cardNode
    var textureIndexArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //平行四边形拉伸度
    var skewArray = [5, 4, 3, 2, 1, -2, -4, -5, -6,-7];
    //x 位置偏移度
    var posOffSetArr =  [0.52, 0.53, 0.53,0.52, 0.55, 0.55, 0.55, 0.57, 0.57, 0.52];

    var col = 0, row = 0;
    for(var k = 0;k < piZiGangArr.length;k++){
        var cardNode = piZiGangArr[k];
        cardNode.ignoreContentAdaptWithSize(true);
        cardNode.setScale(scale * 1.5);
        cardNode.visible = true;
        var textureIndex =  textureIndexArray[col + 2];
        cardNode.loadTexture("playing/MJ3D/downCard/out2-" + textureIndex + ".png");
        var pos_x = templetCard.x + templetCard.width * templetCard.scale * 1.3 * col * 0.66;
        var pos_y = templetCard.y;
        cardNode.setPosition(pos_x, pos_y);
        cardNode.zIndex = 100 + col * (col > 4 ? -1 : 1);
        var skewValue = skewArray[col + 1];
        var posValue = posOffSetArr[col + 1];
        var children = cardNode.children;
        for(var j = 0; j < children.length; j++){
            var child = children[j];
            if (child.ignoreContentAdaptWithSize) {
                child.ignoreContentAdaptWithSize(true);
            }
            child.setScale(0.45);
            child.setSkewX(skewValue);
            if(child.getName() == "laiZi"){
                child.setPosition(cc.pAdd(this.getPutCardsLaiZiIconPosSpcae3D(cardNode), cc.p(-12 , 0)));
            }
            if(child.name == "cardImg"){
                child.setPosition(cardNode.width * 0.9 * posValue, 45);
            }
        }
        col++;
    }
};

//更新node_right玩家的痞子杠和癞子杠
majiang_panel_qiChunHongZhongGang.prototype.updateRightPiZiGangCards3D = function(node, piZiGangArr){
    var templetCard = node.getChildByName(this.CsdDefaultCardType.PiZiGang);
    var scale = templetCard.getScale() * 1.3;

    var col = 0, row = 0;
    for(var k = 0;k < piZiGangArr.length;k++){
        var cardNode = piZiGangArr[k];
        cardNode.ignoreContentAdaptWithSize(true);
        cardNode.setScale(scale * 1.5);
        cardNode.visible = true;
        var rowIndex = 5;
        if(rowIndex > 7) rowIndex = 7; //图片的引索只有3列，如果大于3列的，第四列还是用第三列的图片 marked by sking
        cardNode.loadTexture("playing/MJ3D/rightCard/1-" + rowIndex + ".png");
        cardNode.setScale(cardNode.getScale() * (1 - 0.02 * col));
        var changePos_x = 1 -  0.0036 * col;
        var changePos_y = 1 - (0.0001 + col / 2000) * col;
        var offSet_x = 0, offSet_y = 0;

        var pos_x = offSet_x + templetCard.x * changePos_x;
        var pos_y = offSet_y + templetCard.y * changePos_y + cardNode.height * cardNode.scale * col * 0.65;
        cardNode.setPosition(pos_x, pos_y);
        cardNode.zIndex = 100 - col;

        var children = cardNode.children;
        for(var j = 0; j < children.length; j++){
            var child = children[j];
            if (child.ignoreContentAdaptWithSize) {
                child.ignoreContentAdaptWithSize(true);
            }
            child.setScale(0.45);
            child.setSkewY(6);
            if(child.getName() == "laiZi"){
                child.setPosition(cc.pAdd(this.getPutCardsLaiZiIconPosSpcae3D(cardNode), cc.p(0 , 0)));
            }
            if(child.name == "cardImg"){
                child.setPosition(cc.p(35 ,34));
            }
        }
        col++;
    }
}

//更新node_top玩家的痞子杠和癞子杠
majiang_panel_qiChunHongZhongGang.prototype.updateTopPiZiGangCards3D = function(node, piZiGangArr){
    var templetCard = node.getChildByName(this.CsdDefaultCardType.PiZiGang);
    var scale = templetCard.getScale() * 1.3;

     //cardNode
     var textureIndexArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
     //平行四边形拉伸度
     var skewArray = [-6, -4.5, -2.5, -2, -1, 0, 3, 3, 5, 5];
     //x 位置偏移度
     var posOffSetArr =  [0.55, 0.55, 0.55, 0.55, 0.55, 0.58, 0.58, 0.58, 0.57, 0.58, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55];

    var col = 0, row = 0;
    for(var k = 0;k < piZiGangArr.length;k++){
        var cardNode = piZiGangArr[k];
        cardNode.ignoreContentAdaptWithSize(true);
        cardNode.setScale(scale * 1.5);
        cardNode.visible = true;
        var textureIndex =  10 - col - 2;
        cardNode.loadTexture("playing/MJ3D/downCard/out2-" + textureIndexArray[textureIndex] + ".png");
        var pos_x = templetCard.x - templetCard.width * templetCard.scale * 1.3 * col * 0.66;
        var pos_y = templetCard.y;
        cardNode.setPosition(pos_x, pos_y);
        cardNode.zIndex = 100 + col * (col > 4 ? -1 : 1);
        var skewValue = skewArray[col + 1];
        if(textureIndex >= textureIndexArray.length ) {
            textureIndex = textureIndexArray.length - 1;
        }
        var children = cardNode.children;
        for(var j = 0; j < children.length; j++){
            var child = children[j];
            if (child.ignoreContentAdaptWithSize) {
                child.ignoreContentAdaptWithSize(true);
            }
            child.setScale(0.45);
            child.setSkewX(skewValue);
            if(child.getName() == "laiZi"){
                child.setPosition(cc.pAdd(this.getPutCardsLaiZiIconPosSpcae3D(cardNode), cc.p(0 , 0)));
            }
            if(child.name == "cardImg"){
                child.setPosition(50 * posOffSetArr[textureIndex], 45);
            }
        }
        col++;
    }
}

//更新node_left玩家的痞子杠和癞子杠
majiang_panel_qiChunHongZhongGang.prototype.updateLeftPiZiGangCards3D = function(node, piZiGangArr){
    var templetCard = node.getChildByName(this.CsdDefaultCardType.PiZiGang);
    var scale = templetCard.getScale() * 1.3;

    var col = 0, row = 0;
    for(var k = 0;k < piZiGangArr.length;k++){
        var cardNode = piZiGangArr[k];
        cardNode.ignoreContentAdaptWithSize(true);
        cardNode.setScale(scale * 1.5);
        cardNode.visible = true;
        var rowIndex = 4;
        if(rowIndex < 2) rowIndex = 2; //图片的引索只有3列，如果大于3列的，第四列还是用第三列的图片 marked by sking
        cardNode.loadTexture("playing/MJ3D/left/1-" + rowIndex + ".png");
        var changeScale = 1 - (8 - col) * 0.01;
        cardNode.setScale(cardNode.getScale() * (1 - 0.02 * col));

        var offSet_x = 0, offSet_y = 0;
        var changePos_x = 1 - 0.01 * col;


        var pos_x = offSet_x + templetCard.x * changePos_x;
        var pos_y = offSet_y + templetCard.y - cardNode.height * cardNode.scale * col * (0.65 - col * 0.008 );
        cardNode.setPosition(pos_x, pos_y);
        cardNode.zIndex = 100 + col;

        var children = cardNode.children;
        for(var j = 0; j < children.length; j++){
            var child = children[j];
            if (child.ignoreContentAdaptWithSize) {
                child.ignoreContentAdaptWithSize(true);
            }
            child.setScale(0.45);
            child.setSkewY(-6);
            if(child.getName() == "laiZi"){
                child.setPosition(cc.pAdd(this.getPutCardsLaiZiIconPosSpcae3D(cardNode), cc.p(-2 , -2)));
            }
            if(child.name == "cardImg"){
                child.setPosition(cc.p(35 ,34));
            }
        }
        col++;
    }
}

//Override 更新玩家的牌
majiang_panel_qiChunHongZhongGang.prototype.updatePlayerCards = function (node){
    var player = this.getPlayerInfoByName(node.getName());
    if(!player){
        return;
    }

    this.removeAllCards(node);
    this.removePutCardTip();
    if (!this.isInGame()){
        return;
    }

    var i,j;
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
    if(player.mjgang2)
    {
        for(i = 0; i < player.mjgang2.length; i++){
            for(j = 0; j < 4; j++){
                this.createCard(node, this.CsdDefaultCardType.EatCardFront, this.HandleCardType.PengGang, player.mjgang2[i]);
            }
        }
    }

    //添加痞子杠
    if(player.mjPiZiGang){
        for(i = 0; i < player.mjPiZiGang.length; i++){
            var gangType = this.GANG_TYPE.PI_ZI_GANG;
            var gangName = this.HandleCardType.PiZiGang;
            if(player.mjPiZiGang[i] == this.getHunCard()){
                gangType = this.GANG_TYPE.LAI_ZI_GANG;
                gangName = this.HandleCardType.LaiZiGang;
            }
            this.createCard(node, this.CsdDefaultCardType.PiZiGang, gangName, player.mjPiZiGang[i]);
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
        if(player.mjhand && this.NodeNameArray.indexOf(node.getName()) == 0){
            for(i = 0; i < player.mjhand.length; i++){
                this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand, player.mjhand[i]);
            }
        }else{
            var CardCount = 0;
            var tData = MjClient.data.sData.tData;
            if(tData.tState == TableState.waitPut && tData.uids[tData.curPlayer] == player.info.uid){
                CardCount = 14;
            }else {
                CardCount = 13;
            }

            CardCount = CardCount - ((player.mjpeng.length + player.mjgang0.length + player.mjgang1.length) * 3 + player.mjchi.length);
            for(i = 0; i < CardCount; i++){
                this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand);
            }
        }
    }else if(player.mjhand){
        for (i = 0; i < player.mjhand.length; i++) {
            this.createCard(node, this.CsdDefaultCardType.HandCard, this.HandleCardType.Hand, player.mjhand[i]);
        }
    }

    this.switchUpdate2DAnd3D(node);
};

/**
 *  添加癞子标识
 **/
majiang_panel_qiChunHongZhongGang.prototype.addLaiZiIcon2D = function(cardNode){
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

    if(offIndex == 2 && (cardNode.name == this.HandleCardType.PiZiGang || cardNode.name == this.HandleCardType.LaiZiGang || cardNode.name == this.HandleCardType.Put)){//顶部玩家的痞子杠和癞子杠,打出去的痞子，癞子图标不旋转

    }else{
        laiZiNode.setRotation(-90 * offIndex);
    }
    cardNode.addChild(laiZiNode);
};

//获取痞子杠癞子杠的图标偏移量
majiang_panel_qiChunHongZhongGang.prototype.getPiZiGangIconPositionOffset2D = function(cardNode){
    var playerNodeName = cardNode.getParent().getName();
    
    if(playerNodeName == "node_down"){
        if(cardNode.name == this.HandleCardType.PiZiGang || cardNode.name == this.HandleCardType.LaiZiGang){
            return [-20, 0];
        }else if(cardNode.name == this.HandleCardType.Hand){
            return [-22, -36];
        }
       
    }
    return [0, 0];
}

/**
 *  Override 添加癞子标识
 **/
majiang_panel_qiChunHongZhongGang.prototype.addLaiZiIcon3D = function(cardNode){
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
    if(offIndex == 2 && (cardNode.name == this.HandleCardType.PiZiGang || cardNode.name == this.HandleCardType.LaiZiGang || cardNode.name == this.HandleCardType.Put)){//顶部玩家的痞子杠和癞子杠,打出去的痞子，癞子图标不旋转

    }else{
        laiZiNode.setRotation(-90 * offIndex);
    }

    cardNode.addChild(laiZiNode);
};

/**
 *  Override 获得手牌的牌牌背和牌面对应的坐标
 **/
majiang_panel_qiChunHongZhongGang.prototype.getHandCardFacePosition3D = function(mjBgType){
    var offSets = [[0.5, 0.43], [60, 66], [50, 104], [60, 66], [52, 68], [53, 64], [19, 25]];
    return offSets;
};

/**
 *  Override 获得牌面的坐标(提出来方便重写)
 *  mjBgType: 麻将牌背类型
 *  return {Array}
 **/
majiang_panel_qiChunHongZhongGang.prototype.getCardFacePositon2D = function(mjBgType, cardNode){
    var cardTypeName = cardNode.getName();
    cardTypeName = cardTypeName === undefined ? this.HandleCardType.Hand : cardTypeName;
    if(MjClient.rePlayVideo != -1 && cardNode.getParent() && cardNode.getParent().getName() == "node_top" && cardTypeName == this.HandleCardType.Hand){
        cardTypeName = this.HandleCardType.Put;
    }
    var offSets = this.getHandCardFacePosition2D(mjBgType);
    switch(cardTypeName){
        case this.HandleCardType.Hand:
            offSets = this.getHandCardFacePosition2D(mjBgType);
            break;
        case this.HandleCardType.Chi:
        case this.HandleCardType.Peng:
        case this.HandleCardType.AnGang:
        case this.HandleCardType.MingGang:
        case this.HandleCardType.PengGang:
        case this.HandleCardType.Put:
        case this.HandleCardType.PiZiGang:
        case this.HandleCardType.LaiZiGang:
            offSets = this.getPutCardFacePosition2D(mjBgType);
            break;
    }
    return offSets;
};

//Override 
majiang_panel_qiChunHongZhongGang.prototype.getPutCardsLaiZiIconPosSpcae3D = function(cardNode){
    var parentName = cardNode.getParent().getName();
    if(parentName == "node_down"){
        return cc.p(cardNode.width * 0.6, 45)
    }else if(parentName == "node_right"){
        return cc.p(28, 35);
    }else if(parentName == "node_top"){
        return cc.p(cardNode.width * 0.4, 45);
    }else if(parentName == "node_left"){
        return cc.p(38, 35);
    }
    return cc.p(0, 0);
};

//获取3d玩家吃碰杠手牌的起始位置
majiang_panel_qiChunHongZhongGang.prototype.getEatAndHandCardsStartPos3D = function(node_name, firstCardType){
    if(node_name == "node_down"){
        if(firstCardType == this.HandleCardType.Hand){
            return cc.p(cc.winSize.width * 0.12, 0);
        }
        return cc.p(cc.winSize.width * 0.10, 0);
    }
    return cc.p(0, 0);
};

/**
 *  改变麻将风格之后，刷新牌背、牌面以及牌面坐标调整
 **/
majiang_panel_qiChunHongZhongGang.prototype.updateChiGangCards3D = function(cardNode, cardTag){
    majiang_panel.prototype.updateChiGangCards3D.call(this, cardNode, cardTag);
    
    var piZiImg = cardNode.getChildByName("laiZi");
    if(piZiImg && piZiImg.visible){
        piZiImg.setPosition(cc.pAdd(piZiImg.getPosition(), cc.p(-11, 35)));
    }
};

// 设置游戏中，结束位置的头像
majiang_panel_qiChunHongZhongGang.prototype.setInGameHeadLayout = function(nodeName, layout_head){ 
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
        setWgtLayout(layout_head, headSize, [0 + addValue, 0.5], [0.6, 1.2], false, false);
        endPos3D = layout_head.getPosition();
        //3d
        setWgtLayout(layout_head, headSize, [0, 0.5], [0.9, 1.9], false, false);
        endPos = layout_head.getPosition();
    }

    if (this.is3DStyle()) {
        layout_head.setPosition(endPos3D);
    }

    layout_head.setUserData({endPos: endPos, endPos3D: endPos3D});
};

//更新番数
majiang_panel_qiChunHongZhongGang.prototype.updatePlayerBeiShu = function(node, data){
    if(!node) return;
    var fabBeiText = node.getChildByName("text");
    var playerNode =  node.getParent().getParent();
    var player = this.getPlayerInfoByName(playerNode.getName());
    if(!player || !player.hasOwnProperty("curFanCount") || player.curFanCount <= 0){
        node.visible = false;
        return;
    }
    node.visible = true;
    fabBeiText.setString(player.curFanCount);//设置于番数
};

//番数动画
majiang_panel_qiChunHongZhongGang.prototype.showPlayerFanBeiAnim = function(node, data){
    node.visible = false;
    if(!node || !data) return;
    
    var player = this.getPlayerInfoByName(node.getParent().getParent().getName());
    if(!player || player.info.uid !=  data.uid) return;
    if((data.hasOwnProperty("curAddFan") &&  data.curAddFan > 0) || 
        (data.hasOwnProperty("cpginfo") && data.cpginfo.hasOwnProperty("curAddFan") && data.cpginfo.curAddFan > 0)){
            var str;
            if(data.hasOwnProperty("curAddFan") &&  data.curAddFan > 0){
                str = data.curAddFan;
            }else{
                str = data.cpginfo.curAddFan;
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
 *	处理结算
 **/
majiang_panel_qiChunHongZhongGang.prototype.handleRoundEnd = function(){
    var tData = MjClient.data.sData.tData;
    var sData = MjClient.data.sData;
    var self = this;

    if(MjClient.playui.isInGame()) return;

    var showEndCards = function(){
        self.showBalanceLayer();
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

/**
 *  Override began事件时的验证
 **/
majiang_panel_qiChunHongZhongGang.prototype.checkWhenTouchBegan = function(cardNode){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    //自己能摸到的最后一张牌，不允许打出
    if(MjClient.majiang.getAllCardsTotal(tData) - 10 - tData.maxPlayer < tData.cardNext){
        if (!MjClient.Scene.ToastNodeArray || MjClient.Scene.ToastNodeArray.length == 0) {
            MjClient.showToast("当前不允许出牌");
        }
        return true;
    }

    var result = majiang_panel.prototype.checkWhenTouchBegan.call(this, cardNode);
    return result;
};

//Override 
majiang_panel_qiChunHongZhongGang.prototype.handlerWhenCardTouchEnded = function(cardNode, cardTag){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    
     //自己能摸到的最后一张牌，不允许打出
    if(MjClient.majiang.getAllCardsTotal(tData) - 10 - tData.maxPlayer < tData.cardNext){
        if (!MjClient.Scene.ToastNodeArray || MjClient.Scene.ToastNodeArray.length == 0) {
            MjClient.showToast("当前不允许出牌");
        }
        return;
    }

    majiang_panel.prototype.handlerWhenCardTouchEnded.call(this, cardNode, cardTag);
};

//Override 获取吃碰杠的最后一张牌和手牌第一张的间距比例
majiang_panel_qiChunHongZhongGang.prototype.getHandAndEatCardSpcae3D = function(){
    return 1.7;
};

//Override
majiang_panel_qiChunHongZhongGang.prototype.getAllTouchCards = function(){
    var cardArr = majiang_panel.prototype.getAllTouchCards.call(this);
    cardArr = cardArr || {};

    for(var i = 0; i < this.NodeNameArray.length; i++){
        var nodeName = this.NodeNameArray[i];
        var player = this.getPlayerInfoByName(nodeName);
        if(!player) continue;
        var piZiGangCards = player.mjPiZiGang;
        if(!piZiGangCards || piZiGangCards.length == 0){
            continue;
        }
        for(var j = 0; j < piZiGangCards.length; j++){
            cardArr[piZiGangCards[j]] = cardArr[piZiGangCards[j]] ? cardArr[piZiGangCards[j]] + 1 : 1;
        }
    }
    return cardArr;
};

 //Override 获取自己视角下有吃碰牌时胡牌倒牌的手牌与吃碰牌的距离比例
 majiang_panel_qiChunHongZhongGang.prototype.getDisScaleOfFirstCutDownBetweenEatCard2D = function(){
    return 1;
};

majiang_panel_qiChunHongZhongGang.prototype.isSpeicalGang = function(cardTag){
    return cardTag == this.getPiZiCard() || cardTag == this.getHunCard() || cardTag == 71;
}

//Override
majiang_panel_qiChunHongZhongGang.prototype.putOutCard = function (cardNode, cardTag, autoput){
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

    var copyNode;
    //痞子杠和癞子杠不走出牌放大
    if(!this.isSpeicalGang(cardTag)){
        copyNode = this.createCard(playerNode, this.CsdDefaultCardType.PutCardOne, this.HandleCardType.Put, cardTag);
        //设置为隐藏是为了可以在显示之前，进行一些其他操作
        copyNode.visible = false;
        //自己出牌时前端先行
        this.putOutSelfFirst(cardTag);
    }
    if(MjClient.rePlayVideo == -1){
    	player.isNew = false;
        this.doBeforeAddPutOutCard(copyNode);
        var self = this;
        if(!this.isSpeicalGang(cardTag)){
            this.addPutCard(copyNode, function(){
                if(self.isOpenPutOutCardAnima() && MjClient.playui.getPutCardScaleConfig()){
                    self.playPutOutCardAnima(copyNode,startPos);
                }else{
                    self.addPutCardTip(copyNode);
                } 
            }, true);
        }
        
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

majiang_panel_qiChunHongZhongGang.prototype.createFenZhangAni = function(aniNode){
    aniNode.visible = true;
    var fenZhang1 = aniNode.getChildByName("fenZhang1");
    var fenZhang2 = aniNode.getChildByName("fenZhang2");
    var fenZhangAni = function (node,isTopDown) {
        var middleX = cc.winSize.width / 2;
        var middleY = cc.winSize.height / 2;
        var beginPos = node.parent.convertToNodeSpace(cc.p(-100,middleY));
        node.setPosition(beginPos);
        var aniFadeIn = cc.fadeIn(0.5);
        var finalPos = node.parent.convertToNodeSpace(cc.p(middleX,middleY));
        var moveToMiddle = cc.moveTo(0.5,finalPos);
        node.runAction(cc.sequence(cc.spawn(aniFadeIn,moveToMiddle),cc.callFunc(function() {
            var fen = node.getChildByName("fen");
            var zhang = node.getChildByName("zhang");
            fen.visible = true;
            zhang.visible = true;
            fen.setPosition(cc.p(50,100));
            zhang.setPosition(cc.p(150,100));
            var aniFadeOut1 = cc.fadeOut(0.5);
            var aniFadeOut2 = cc.fadeOut(0.5);
            if(isTopDown){
                var fenPos = node.convertToNodeSpace(cc.p(middleX, middleY * 1.5));
                var zhangPos = node.convertToNodeSpace(cc.p(middleX, middleY * 0.5));
                var fenMove = cc.moveTo(0.5,fenPos);
                var zhangMove = cc.moveTo(0.5,zhangPos);
                fen.runAction(cc.spawn(aniFadeOut1,fenMove));
                zhang.runAction(cc.spawn(aniFadeOut2,zhangMove));
            }else {
                var fenPos = node.convertToNodeSpace(cc.p(middleX * 0.5, middleY));
                var zhangPos = node.convertToNodeSpace(cc.p(middleX * 1.5, middleY));
                var fenMove = cc.moveTo(0.5,fenPos);
                var zhangMove = cc.moveTo(0.5,zhangPos);
                fen.runAction(cc.spawn(aniFadeOut1,fenMove));
                zhang.runAction(cc.spawn(aniFadeOut2,zhangMove));
            }
        })));
    }
    fenZhangAni(fenZhang1,true);
    fenZhangAni(fenZhang2,false);
};

//Override 
majiang_panel_qiChunHongZhongGang.prototype.sendPutToServer = function(cardTag){
    //痞子杠癞子杠走杠消息，因为走put消息没有put回包，导致消息队列阻塞，从而引起客户端重连
    if(cardTag == this.getPiZiCard() || cardTag == this.getHunCard() || cardTag == 71){
        this.sendGangToServer(cardTag);
        return;
    };
    majiang_panel.prototype.sendPutToServer.call(this, cardTag);
};

//Override 2d小结算之前手牌倒牌
majiang_panel_qiChunHongZhongGang.prototype.showMjhandBeforeEndOne2D = function(playerNodeName) {
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
        mjhand.length % 3 === 2 && !player.isZiMo && tData.cardNext > (MjClient.majiang.getAllCardsTotal(tData) - 10 - tData.maxPlayer))
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
majiang_panel_qiChunHongZhongGang.prototype.showMjhandBeforeEndOne3D = function(nodeName){
    var player = this.getPlayerInfoByName(nodeName);
    if (!player || !player.mjhand || MjClient.rePlayVideo !== -1) return;
    //删除手牌，重新添加手牌(以吃牌作为模板，然后重新刷新)
    var playerNode = this.getNodeByName(nodeName);
    this.removeCardsByName(playerNode, this.HandleCardType.Hand);

    var tData = MjClient.data.sData.tData;
    var mjhand = player.mjhand.slice();
    //当点炮时，不显示点炮的牌
    if ((MjClient.data.sData.tData.tState === TableState.waitEat || MjClient.data.sData.tData.tState === TableState.roundFinish) && 
        mjhand.length % 3 === 2 && !player.isZiMo && tData.cardNext > (MjClient.majiang.getAllCardsTotal(tData) - 10 - tData.maxPlayer)) 
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