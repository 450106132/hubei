/***
 * 淮安App，通用牌桌文件，淮安玩法继承此文件
 */
var majiang_panel_huaian = majiang_panel.extend({

    getJsBind: function(){
        var jsBind = {
            img_arrow2DBackGround:{
                img_numBg:{
                    _run:function(){
                        this.visible =false;
                    }   
                },
                text_timeNum: {
                    _run: function(){
                        this.setString("00");
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _event: {
                        waitPut:function(){
                            this.stopAllActions();
                            MjClient.playui.updateArrowNumber(this);
                        },
                        MJGang: function(){
                            this.stopAllActions();
                            MjClient.playui.updateArrowNumber(this);
                        },
                        MJPeng:function(){
                            this.stopAllActions();
                            MjClient.playui.updateArrowNumber(this);
                        },
                        MJChi:function(){
                            this.stopAllActions();
                            MjClient.playui.updateArrowNumber(this);
                        },
                        MJPut:function(msg){
                            if (msg.uid == MjClient.playui.getSelfUid()){
                                this.stopAllActions();
                                this.setString("00");
                            }
                        },
                        roundEnd:function(){
                            this.stopAllActions();
                        },
                        LeaveGame:function(){
                            this.stopAllActions();
                        }
                    }
                }
            },
            layout_roundInfo2D:{
                img_roundNum:{
                    text_roundNum:{
                        getRoundInfo: function(){
                            var tData = MjClient.data.sData.tData;
                            var extraNum = tData.extraNum ? tData.extraNum:0;
                            if (tData) {
                                return "剩余"+ (tData.roundNum + extraNum) + "局";
                            }
                            return "";
                        }
                    }
                },
                img_cardNum:{
                    img_card:{
                        _run: function(){
                            this.visible = false;
                        }
                    },
                    text_cardNum:{
                        getCardNum: function(){
                            var tData = MjClient.data.sData.tData;
                            if (tData) {
                                return "剩余" + (MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext) + "张";
                            }
                            return 0;
                        }
                    }
                }
            },
            img_roomInfo2D: {
                layout_timeBg:{
                    _run: function(){
                        var text = new ccui.Text();
                        text.setFontName(MjClient.fzcyfont);
                        text.setFontSize(25);
                        text.setTextColor(cc.color(171,220,208,255));
                        text.setAnchorPoint(0.5, 0.5);
                        text.setPosition(35, 15);
                        this.addChild(text);
                        var that = this;
                        var func = function(){ that.getSystemTime(text);};
                        text.runAction(cc.repeatForever(cc.sequence(cc.callFunc(func), cc.delayTime(1))));
                    }
                }
            },
            node_down:{
                node_animation:{
                    _event:{
                        MJHu: function(data){
                            var player = MjClient.playui.getPlayerInfoByName("node_down");
                            if(player.info.uid !== data.uid){
                                return;
                            }
                            var actType = (player.huWord && player.huWord.indexOf("zimo") > -1) ? MjClient.playui.AnimationType.ZIMO : MjClient.playui.AnimationType.HU;
                            MjClient.playui.showEatActionAnim(this.getParent(), actType);
                            MjClient.playui.showHuCardTypeImage(this, player, "node_down");
                        }
                    }
                }
            },
            node_right:{
                node_animation:{
                    _event:{
                        MJHu: function(data){
                            var player = MjClient.playui.getPlayerInfoByName("node_right");
                            if(player.info.uid !== data.uid){
                                return;
                            }
                            var actType = (player.huWord && player.huWord.indexOf("zimo") > -1) ? MjClient.playui.AnimationType.ZIMO : MjClient.playui.AnimationType.HU;
                            MjClient.playui.showEatActionAnim(this.getParent(), actType);
                            MjClient.playui.showHuCardTypeImage(this, player, "node_right");
                        }
                    }
                }
            },
            node_top:{
                node_animation:{
                    _event:{
                        MJHu: function(data){
                            var player = MjClient.playui.getPlayerInfoByName("node_top");
                            if(player.info.uid !== data.uid){
                                return;
                            }
                            var actType = (player.huWord && player.huWord.indexOf("zimo") > -1) ? MjClient.playui.AnimationType.ZIMO : MjClient.playui.AnimationType.HU;
                            MjClient.playui.showEatActionAnim(this.getParent(), actType);
                            MjClient.playui.showHuCardTypeImage(this, player, "node_top");
                        }
                    }
                }
            },
            node_left:{
                node_animation:{
                    _event:{
                        MJHu: function(data){
                            var player = MjClient.playui.getPlayerInfoByName("node_left");
                            if(player.info.uid !== data.uid){
                                return;
                            }
                            var actType = (player.huWord && player.huWord.indexOf("zimo") > -1) ? MjClient.playui.AnimationType.ZIMO : MjClient.playui.AnimationType.HU;
                            MjClient.playui.showEatActionAnim(this.getParent(), actType);
                            MjClient.playui.showHuCardTypeImage(this, player, "node_left");
                        }
                    }
                }
            }
        };
        return jsBind;
    },

    ctor: function(subObj, jsonFile){
        this._super(majiang_panel_huaian, jsonFile);

        subObj.jsBind = subObj.prototype.getJsBind();
        util.assign(subObj.jsBind, majiang_panel_huaian.jsBind);
        this.jsBind = subObj.jsBind;

        this.initData();
        this.bindPlayUI();
    },

    // @Override 显示小结算
    createEndOnePanel: function(){
        return new majiang_winGamePanel_huaian();
    },

    // @Override 显示大结算
    createGameOverPanel: function(){
        return new majiang_gameOver_huaian();
    },

    // @Override 显示设置界面
    createSettingView: function(){
        return new majiang_settingPanel_huaian();
    },

    // @Override 更换癞子牌贴图
    getLaiZiIcon2D:function(){
        var laiziIcon = this._super();
        laiziIcon.loadTexture("playing/MJ/gong.png");
        return laiziIcon;
    },
    
    isNeedSkipHuTip: function(){
        return true;
    },

    //@Override 癞子牌可以打出
    setLaiZiColor: function(cardNode){
        this._super(cardNode);
        return false;
    },

    // @Override 是否需要灯泡
    isShowTingLight: function(){
        return false;
    },

    // @Override 插牌动画需要 倾斜
    isNeedCardRotateAction: function(){
        return true;
    },

    // @Override 开启摸牌动画
    isCanPlayNewCardAction: function(){
        return true;
    },

    // @Override 开启出牌放大特效
    isOpenPutOutCardAnima: function(){
        return true;
    },

    // @Override 开启插牌动画
    isCanInsertcard: function(){
        return true;
    },

    // @Override 添加3D吃碰牌特效功能
    isNeedEatActionEffect3D: function() {
        return true;
    },

    /**
     *  是否开启显示最多听牌标识
     **/
    isShowMaxTingCards: function(){
        return true;
    },


    // @Override 获取语音名字
    getVoiceNameList: function(){
        return ["普通话", "本地话"];
    },


    // @Override 添加2D癞子标识
    addLaiZiIcon2D: function (cardNode) {
        if(!this.isCanAddLaiZiIcon(cardNode.tag)){
            return;
        }

        var playerNodeName = cardNode.getParent().getName();
        var offIndex = this.getNodeIndexDefaultByName(playerNodeName);
        var cardName = cardNode.getName() || "";
        offIndex = offIndex === -1 ? 0 : offIndex;
        offIndex = cardName === this.HandleCardType.Hand ? 4 : offIndex;
        var laiZiPosArr = this.getHunIconPosition2D();
        var laiZiNode = this.getLaiZiIcon2D();
        laiZiNode.setPosition(laiZiPosArr[offIndex][0], laiZiPosArr[offIndex][1]);
        laiZiNode.setRotation(-90 * offIndex);
        cardNode.addChild(laiZiNode);
    },


    // @Override 设置其他牌大小
    updateOtherCardSize: function(node){
        this._super(node);
        var is3D = MjClient.playui.is3DStyle();
        var maxPlayer = MjClient.playui.getMaxPlayer();
        var nodeName = node.getName();
        var playNodeName = node.getParent().getName();
        switch (playNodeName) {
            case "node_down":
                if(nodeName === "img_putCardOne"){
                    if(!is3D){
                        if(MjClient.size.width / MjClient.size.height >= 1.5){
                            if(maxPlayer === 2)
                                setWgtLayout(node, [0, 0.088], [0.306, 0], [-5, 3.3]);
                            else
                                setWgtLayout(node, [0, 0.088], [0.506, 0], [-5, 3.3]);
                        }else if(this.isIPad()){
                            if(maxPlayer === 2)
                                setWgtLayout(node, [0, 0.075], [0.306, 0], [-6, 2.7]);
                            else
                                setWgtLayout(node, [0, 0.075], [0.506, 0], [-6, 2.7]);
                        }else{
                            if(maxPlayer === 2)
                                setWgtLayout(node, [0, 0.08], [0.306, 0], [-1, 3.3]);
                            else
                                setWgtLayout(node, [0, 0.08], [0.506, 0], [-1, 3.3]);
                        }
                    }
                }
                break;
            case "node_top":
                if(nodeName === "img_putCardOne"){
                    if(!is3D){
                        if(MjClient.size.width / MjClient.size.height >= 1.5){
                            if(maxPlayer === 2)
                                setWgtLayout(node, [0, 0.088], [0.7, 1], [6, -2.6]);
                            else
                                setWgtLayout(node, [0, 0.088], [0.5, 1], [6, -2.6]);
                        }else if(MjClient.playui.isIPad()){
                            if(maxPlayer === 2)
                                setWgtLayout(node, [0, 0.075], [0.75, 1], [4.8, -2.3]);
                            else
                                setWgtLayout(node, [0, 0.075], [0.55, 1], [4.8, -2.3]);
                        }else{
                            if(maxPlayer === 2)
                                setWgtLayout(node, [0, 0.08], [0.7, 1], [4.8, -2.6]);
                            else
                                setWgtLayout(node, [0, 0.08], [0.5, 1], [4.8, -2.6]);
                        }
                    }
                }
                else if(nodeName === "img_eatFrontCard"){
                    if(!is3D){
                        if(this.isIPad())
                            setWgtLayout(node, [0, 0.07], [0.5, 1], [6.32, -1.1]);
                        else
                            setWgtLayout(node, [0, 0.08], [0.5, 1], [8.3, -1.4]);
                    }else{
                        if(maxPlayer === 4){
                            setWgtLayout(node, [0, 0.07], [0.5, 1.015], [6, -1.4]);
                        }else if(maxPlayer === 2){
                            setWgtLayout(node, [0, 0.07], [0.5, 1.033], [6, -1.4]);
                        }
                    }
                }
                break;
        }
    },

    //@Override 刷新玩家操作按钮
    updatePlayerEatBtn: function(){
        this.hideEatNodeChildren();

        var sData = MjClient.data.sData;
        var player = sData.players[MjClient.playui.getSelfUid()];

         if(!this.isTurnMe() && player.mjState !== TableState.waitEat){
            return;
        }

        var eatNodeArr = this.getPlayerEatNode();
        var pct = this.isIPad() ? 0.15 : 0.194;
        var pos = this.isIPad() ? 0.75 : 0.7;
        var space = this.isIPad() ? 0.88 : 1;
        var off_y = this.isIPad() ? 1.4 : 1.62;
        
        for(var i = 0;i < eatNodeArr.length;i++){
            var btn = eatNodeArr[i];
            btn.visible = true;
            setWgtLayout(btn, [0, pct], [pos, 0], [(i - eatNodeArr.length + 1) * space, off_y], false, false);
        }
        MjClient.playui.addLightAniEatBtns(); // 设置麻将的吃碰杠按钮特效
        this.checkBtnWithPlayerFlag();
    },

    //@Override top位置玩家出的牌是否相对down玩家旋转180
    isCardRotationOfTopPlayer: function () {
        return true;
    },

    //是否需要胡牌时，显示胡牌牌型
    isNeedShowHuCardImage: function(){
        return true;
    },

    isShowTextPiao: function(){
        return false;
    },

    isShowTingCards : function(){
       return false;
    },

    isCanAutoPut: function(){
        return false;
    },

    // 胡牌时展示胡牌牌型
    showHuCardTypeImage: function (nodeAnimation, player, playerNodeName) {
        if(!player || !this.isNeedShowHuCardImage()) return;
        var huWords = player.huWords ? player.huWords : player.huWord;
        if (typeof(huWords) != "object" || huWords.length <= 0) return;
        var imageArr = [];
        for(var i = 0; i < huWords.length && i < 3; i ++){
            var url = "spine/" + huWords[i] + "/" + huWords[i] + ".png";
            var image = new ccui.ImageView(url);
            image.setName("HuImg");
            image.setScale(0.40);

            if(playerNodeName !== "node_down" && huWords[i] === "duohu")
                continue;

            nodeAnimation.addChild(image);
            imageArr.push(image);
        }

        var pct = this.isIPhoneX() ? 0.17 : 0.12;
        var pos = this.isIPhoneX() ? 0.20 : this.isIPad() ? 0.12 : 0.15;
        for (var j = 0; j < imageArr.length; j ++) {
            switch (playerNodeName) {
                case "node_down":
                case "node_top":
                    setWgtLayout(imageArr[j],[pct, 0],[j * pos - pos, 0],[0, 0]);
                    break;
                case "node_right":
                case "node_left":
                    setWgtLayout(imageArr[j],[pct, 0],[0, pos - pos * j],[0, 0]);
                    break;
            }
        }
    }
});

//Override
majiang_panel_huaian.prototype.getGameBgList = function(is3D) {
	if(is3D){ // 3dBG资源
		return ["playing/gameTable/beijing3D_1.jpg", "playing/gameTable/beijing3D_2.jpg",
    	"playing/gameTable/beijing3D_3.jpg", "playing/gameTable/beijing3D_4.jpg"];
	}
    return ["playing/gameTable/beijing_1.png", "playing/gameTable/beijing_2.png",
    "playing/gameTable/beijing_3.png", "playing/gameTable/beijing_4.jpg"];
};

//Override 背景名称
majiang_panel_huaian.prototype.getGameBgNameList = function(is3D) {
	if(is3D){
		return ["蓝绿","淡绿","湖蓝","靛蓝"];
	}
	return ["经典","绿色","蓝色","夜间"];
};

//Override 牌背
majiang_panel_huaian.prototype.getCardBgList = function(is3D) {
	if(is3D){
		return ["playing/MJ/MJBg3D1", "playing/MJ/MJBg3D2"];
	}
    return ["playing/MJ","playing/MJ/MJBg1","playing/MJ/MJBg2", "playing/MJ/MJBg3"];
};

//Override 牌背
majiang_panel_huaian.prototype.getCardBgNameList = function(is3D) {
	if(is3D){
		return ["经典", "流行"];
	}
    return ["经典","大气","精致","圆润"];
};

//Override 牌面
majiang_panel_huaian.prototype.getCardFrontList = function(is3D) {
	if(is3D){
		return ["playing/MJ/MJCard3D1", "playing/MJ/MJCard3D2"];
	}
    return ["playing/MJ", "playing/MJ/MJCard1", "playing/MJ/MJCard2", "playing/MJ/MJCard3"];
};


//Override 创建翻鸟view(淮安没有鸟牌翻转所需的纹理资源，因此默认使用移动鸟牌展示动画)
majiang_panel_huaian.prototype.getShowBirdView = function(niaoCards){
    var self = this;
    return new majiang_showBird(niaoCards,function(){
        self.showBalanceLayer();
    }, majiang_showBird.prototype.SHOW_BIRD_TYPE.MOVE_FROM_RIGHT);
};

/**
 *  Override根据麻将背景类型获得对应的缩放比
 **/
majiang_panel_huaian.prototype.getScaleByMjType2D = function(mjBgType){
    mjBgType = mjBgType === undefined ? this.getMaJiangBgType() : mjBgType;
    var scale = 1;
    return scale;
};

/**
 * Override根据麻将类型进行缩放
 */
majiang_panel_huaian.prototype.updateCardNodeScale = function(cardNode){

};

/**
 * Override 获得手牌之间的缩放比
 **/
majiang_panel_huaian.prototype.getHandCardSpaceScale = function(){
    var mjBgType = this.getMaJiangBgType();
    var scale = 0.95;
    if(mjBgType == 0){
        var scale = 0.94;
    }else if(mjBgType == 1){
        var scale = 0.93;
    }else if(mjBgType == 2){
        scale = 0.93;
    }else if(mjBgType == 3){
        scale = 0.91;
    }
    return scale;
};

//Override 是否需要过胡提示
majiang_panel_huaian.prototype.isNeedSkipHuTip = function(){
	return true;
};

/**
 * Override 中间的小转盘，刷新
 * @param arrowbkNode
 * @param name
 */
majiang_panel_huaian.prototype.updateArrowRotation2D = function(arrowNode, nextPlayer){
    if(!this.isInGame()){
        return;
    }
    var tData = MjClient.data.sData.tData;
    var playerNode = this.getUIBind(tData.curPlayer);
    if(nextPlayer != null && !cc.isUndefined(nextPlayer)){
        playerNode = this.getUIBind(nextPlayer);
    }

    var arrowArray = ["img_eastArrow", "img_southArrow", "img_westArrow", "img_northArrow"];
    var iconArray = ["img_east", "img_south", "img_west", "img_north"];

    var imgPath = "playing/gameTable/"
    var arrowPath = "playing/gameTable/arrow_";
    var iconPressArr = ["dir_press_1.png", "dir_press_2.png", "dir_press_3.png", "dir_press_0.png"];
    var iconNormalArr = ["dir_normal_0.png", "dir_normal_1.png", "dir_normal_2.png", "dir_normal_3.png"];
    
    for(var i = 0;i < arrowArray.length;i++){
    	var arrow = arrowNode.getChildByName(arrowArray[i]);
    	arrow.visible = false;
    	arrow.stopAllActions();
        var icon = arrowNode.getChildByName(iconArray[i]);
        var textureFile = imgPath + iconPressArr[icon.originalDir];
    	icon.loadTexture(textureFile);
    }

    var selectIndex = this.DefaultNodeNameArray.indexOf(playerNode.getName());

    var playerIndex = tData.uids.indexOf(this.getSelfUid());
    var playerNodeName = this.NodeNameArray[playerIndex];
    var playerNodeIndex = this.DefaultNodeNameArray.indexOf(playerNodeName);
    playerNodeIndex = (playerNodeIndex + selectIndex) % this.DefaultNodeNameArray.length;
    var selectArrow = arrowNode.getChildByName(arrowArray[selectIndex]);
    selectArrow.visible = true;
    selectArrow.loadTexture(arrowPath + playerNodeIndex + ".png");
    selectArrow.runAction(cc.sequence(cc.fadeOut(0.75), cc.fadeIn(0.75)).repeatForever());

    var selectIcon = arrowNode.getChildByName(iconArray[selectIndex]);
    selectIcon.loadTexture(imgPath + iconNormalArr[selectIcon.originalDir]);
};

/**
 * Override 设置东南西北的方位
 * @param arrowNode
 * @param isVisible
 */
majiang_panel_huaian.prototype.updateArrowIconDirection = function(arrowNode){
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
        arrowIcon.originalDir = iconIndex;
    }
};

/**
 *  Override 刷新手牌大小
 **/
majiang_panel_huaian.prototype.updateHandCardSize = function(node){
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
                setWgtLayout(node, [0, 0.058], [0.5, 1], [7, -1.3]);
            else
                setWgtLayout(node, [0, 0.08], [0.5, 1], [7, -1.3]);
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
 *  Override 展示游戏内置聊天信息
 *  node：玩家的聊天结点
 **/
majiang_panel_huaian.prototype.showGameSoundChatMessage = function(node, playerNodeName, msg) {
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
    var voiceType = MjClient.gameType;
    var content = GameSound4Chat[voiceType];
    if (content) {
        var path = GameSound4Chat[voiceType][this.getRandomRange(0,content.length-1)] + musicNum;
        this.playEffect(path, false, player.info.sex);
    }
    node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
};