/***
 * 邵阳App麻将玩法牌局界面基类
 * @type {void | Class | *}
 */
var majiang_panel_shaoyang;
(function() {
    majiang_panel_shaoyang = majiang_panel.extend({
        getJsBind: function(){
            var jsBind = {
                img_roomInfo3D: {
                    img_hunpaiBg: {
                        setBaiDaCard3D: function() {
                            var isShowHunCard = MjClient.playui.isHunCardShow3D();
                            var hunCard = MjClient.playui.getHunCard();
                            if (!isShowHunCard || hunCard <= 0) {
                                this.visible = false;
                                return;
                            }

                            this.visible = true;
                            var hunCardNode = this.getChildByName("img_hunCard");
                            hunCardNode.tag = parseInt(hunCard);
                            MjClient.playui.setCardSprite(hunCardNode, hunCard);
                            hunCardNode.setColor(cc.color(255, 255, 255));
                        }
                    }
                },
                node_down: {
                    sprite_ready:{
                        _layout: [[0.06, 0.06], [0.5, 0.5], [-1.1, -3.5]],
                        _event: {
                            mjhand: function(){
                                this.visible = false;
                            },
                            moveHead: function(){
                                this.visible = false;
                            },
                            addPlayer: function(){
                                this.visible = MjClient.playui.isReady("node_down");
                            },
                            removePlayer: function(){
                                this.visible = MjClient.playui.isReady("node_down");
                            },
                            onlinePlayer: function(){
                                this.visible = MjClient.playui.isReady("node_down");
                            },
                            initSceneData: function(){
                                this.visible = MjClient.playui.isReady("node_down");
                            }
                        }
                    },
                    node_animation: {
                        _visible: false,
                        _run: function() {
                            this.zIndex = 1000;
                            this.setPositionX(cc.winSize.width * 0.5);
                            this.setPositionY(cc.winSize.height * 0.25);
                        },
                        _event: {
                            MJHu: function(data){
                                var player = MjClient.playui.getPlayerInfoByName("node_down");
                                if(player.info.uid != data.uid){
                                    return;
                                }

                                if (player.huWord && player.huWord.indexOf("zimo") != -1) {
                                    MjClient.playui.showEatActionAnim(this.getParent(), MjClient.playui.AnimationType.ZIMO);
                                } else {
                                    MjClient.playui.showEatActionAnim(this.getParent(), MjClient.playui.AnimationType.HU);
                                }
                                MjClient.playui.showHuTypeImage(this, player, "node_down");
                            }
                        }
                    }
                },
                node_right: {
                    sprite_ready:{
                        _layout: [[0.06, 0.06], [0.5, 0.5], [1.1, -3.5]],
                        _event: {
                            mjhand: function(){
                                this.visible = false;
                            },
                            moveHead: function(){
                                this.visible = false;
                            },
                            addPlayer: function(){
                                this.visible = MjClient.playui.isReady("node_right");
                            },
                            removePlayer: function(){
                                this.visible = MjClient.playui.isReady("node_right");
                            },
                            onlinePlayer: function(){
                                this.visible = MjClient.playui.isReady("node_right");
                            },
                            initSceneData: function(){
                                this.visible = MjClient.playui.isReady("node_right");
                            }
                        }
                    },
                    node_animation: {
                        _visible: false,
                        _run: function() {
                            this.zIndex = 1000;
                            this.setPositionX(cc.winSize.width * 0.75);
                            this.setPositionY(cc.winSize.height * 0.5);
                        },
                        _event: {
                            MJHu: function(data){
                                var player = MjClient.playui.getPlayerInfoByName("node_right");
                                if(player.info.uid != data.uid){
                                    return;
                                }

                                if (player.huWord && player.huWord.indexOf("zimo") != -1) {
                                    MjClient.playui.showEatActionAnim(this.getParent(), MjClient.playui.AnimationType.ZIMO);
                                } else {
                                    MjClient.playui.showEatActionAnim(this.getParent(), MjClient.playui.AnimationType.HU);
                                }
                                MjClient.playui.showHuTypeImage(this, player, "node_right");
                            }
                        }
                    },
                    img_eatFrontCard:{
                        _layout: [[0, 0.058], [1, 0], [-3.1, 4]],
                        _visible: false,
                        _run: function(){
                            if (MjClient.playui.isIPad()) {
                                setWgtLayout(this, [0, 0.058], [1, 0], [-2.2, 4]);
                            }
                            else {
                                setWgtLayout(this, [0, 0.058], [1, 0], [-3.1, 4]);
                            }
                        }
                    },
                    img_handCard: {
                        _visible: false,
                        _run: function(){
                            if(MjClient.playui.isIPad()) {
                                setWgtLayout(this, [0, 0.085], [1, 0], [-4.5, 3.5]);
                            } else {
                                setWgtLayout(this, [0, 0.1], [0.87, 0], [0, 3]);
                            }

                            this.setFlippedX(false);
                            this.setFlippedY(false);
                            this.setRotation(0);
                            var is3D = MjClient.playui.is3DStyle();
                            if (!is3D) {
                                this.setFlippedX(true);
                            }
                        },
                        _event: {
                            switch2Dor3D: function(data){
                                var flipX = this.isFlippedX();
                                var is3D = data.is3D;
                                if((is3D && flipX) || (!is3D && !flipX)){
                                    this.setFlippedX(!flipX);
                                }
                            }
                        }
                    },
                },
                node_top: {
                    sprite_ready:{
                        _layout: [[0.06, 0.06], [0.5, 0.5], [1.1, 4]],
                        _event: {
                            mjhand: function(){
                                this.visible = false;
                            },
                            moveHead: function(){
                                this.visible = false;
                            },
                            addPlayer: function(){
                                this.visible = MjClient.playui.isReady("node_top");
                            },
                            removePlayer: function(){
                                this.visible = MjClient.playui.isReady("node_top");
                            },
                            onlinePlayer: function(){
                                this.visible = MjClient.playui.isReady("node_top");
                            },
                            initSceneData: function(){
                                this.visible = MjClient.playui.isReady("node_top");
                            }
                        }
                    },
                    node_animation: {
                        _visible: false,
                        _run: function() {
                            this.zIndex = 1000;
                            this.setPositionX(cc.winSize.width * 0.5);
                            this.setPositionY(cc.winSize.height * 0.75);
                        },
                        _event: {
                            MJHu: function(data){
                                var player = MjClient.playui.getPlayerInfoByName("node_top");
                                if(player.info.uid != data.uid){
                                    return;
                                }

                                if (player.huWord && player.huWord.indexOf("zimo") != -1) {
                                    MjClient.playui.showEatActionAnim(this.getParent(), MjClient.playui.AnimationType.ZIMO);
                                } else {
                                    MjClient.playui.showEatActionAnim(this.getParent(), MjClient.playui.AnimationType.HU);
                                }
                                MjClient.playui.showHuTypeImage(this, player, "node_top");
                            }
                        }
                    }
                },
                node_left: {
                    sprite_ready:{
                        _layout: [[0.06, 0.06], [0.5, 0.5], [-1.1, 4]],
                        _event: {
                            mjhand: function(){
                                this.visible = false;
                            },
                            moveHead: function(){
                                this.visible = false;
                            },
                            addPlayer: function(){
                                this.visible = MjClient.playui.isReady("node_left");
                            },
                            removePlayer: function(){
                                this.visible = MjClient.playui.isReady("node_left");
                            },
                            onlinePlayer: function(){
                                this.visible = MjClient.playui.isReady("node_left");
                            },
                            initSceneData: function(){
                                this.visible = MjClient.playui.isReady("node_left");
                            }
                        }
                    },
                    node_animation: {
                        _visible: false,
                        _run: function() {
                            this.zIndex = 1000;
                            this.setPositionX(cc.winSize.width * 0.25);
                            this.setPositionY(cc.winSize.height * 0.5);
                        },
                        _event: {
                            MJHu: function(data){
                                var player = MjClient.playui.getPlayerInfoByName("node_left");
                                if(player.info.uid != data.uid){
                                    return;
                                }

                                if (player.huWord && player.huWord.indexOf("zimo") != -1) {
                                    MjClient.playui.showEatActionAnim(this.getParent(), MjClient.playui.AnimationType.ZIMO);
                                } else {
                                    MjClient.playui.showEatActionAnim(this.getParent(), MjClient.playui.AnimationType.HU);
                                }
                                MjClient.playui.showHuTypeImage(this, player, "node_left");
                            }
                        }
                    },
                    img_handCard: {
                        _run:function(){
                            if(MjClient.playui.isIPad())
                                setWgtLayout(this, [0, 0.085], [0, 1], [5, -2.6]);
                            else
                                setWgtLayout(this, [0, 0.1], [0.13, 1], [0, -1.5]);
                        },
                        _visible: false
                    }
                },
                node_eat: {
                    node_showCards: {
                        _visible: true,
                        img_showCardsBg: {
                            _layout: [[0.3, 0.3], [0.5, 0.16], [0, 0]],
                            _event: {
                                changeMJBgEvent: function(){
                                    var children = this.children;
                                    var mjBgType = MjClient.playui.getMaJiangBgType();
                                    for(var i = 0;i < children.length;i++){
                                        var child = children[i];
                                        if(child.name == MjClient.playui.HandleCardType.Put){
                                            MjClient.playui.updateAfterChangeMjBg(child, mjBgType, 0);
                                        }
                                    }                    
                                }
                            },
                            img_card: {
                                _visible: false,
                                _run: function() {
                                    this.scale = 0.5;
                                }
                            },
                            btn_pass:{
                                _visible: false
                            },
                            btn_back: {
                                _touch: function(sender, eventType){
                                    if(eventType != ccui.Widget.TOUCH_ENDED){
                                        return;
                                    }
                                    sender.getParent().visible = false;
                                    MjClient.playui.hasClickBtn = false;
                                    MjClient.playui.updatePlayerEatBtn();        
                                }
                            },
                            updateSize: function(row, col){
                                var templatCard = this.getChildByName("img_card");
                                var factSize = this.getContentSize();
                                var width = templatCard.width * templatCard.scale * col;
                                var height = templatCard.height * templatCard.scale * row;
                                width = width > factSize.width ? width : factSize.width;
                                height = height > factSize.height ? height : factSize.height;
                                this.setContentSize(width, height);
                            },
                            getStartPos: function(row, col){
                                var templatCard = this.getChildByName("img_card");
                                var factSize = this.getContentSize();
                                var width = templatCard.width * templatCard.scale * col;
                                var height = templatCard.height * templatCard.scale * row;
                                var space_w = (factSize.width - width) / 2;
                                var space_h = (factSize.height - height) / 2;
                                var start_x = space_w + templatCard.width * templatCard.scale / 2;
                                var start_y = space_h + templatCard.height * templatCard.scale / 2;
                                return cc.p(start_x, start_y);
                            },
                            showCards: function(){
                                var children = this.children;
                                for(var i = 0;i < children.length;i++){
                                    var child = children[i];
                                    if(child.name == MjClient.playui.HandleCardType.Put){
                                        child.removeFromParent(true);
                                    }
                                }
                                MjClient.playui.hideEatNodeChildren();
                                this.getParent().visible = true;
                            },
                            hideCards: function(){
                                this.getParent().visible = false;
                                MjClient.playui.updatePlayerEatBtn();
                            },
                            showEatCards: function(){
                                this.showCards();
                                this.visible = true;
                                var cardArr = MjClient.playui.eatCardArray;
                                this.updateSize(cardArr.length, 3);
                                var startPos = this.getStartPos(cardArr.length, 3);
                                var templatCard = this.getChildByName("img_card");
                                var lastPutCard = MjClient.data.sData.tData.lastPutCard;
                                var self = this;
                                for(var i = 0;i < cardArr.length;i++){
                                    for (var j = 0; j < 3; j ++){
                                        var card = util.clone(templatCard);
                                        if (cardArr[i] == j){
                                            card.color = cc.color(255, 255, 0);
                                        }
                                        card.visible = true;
                                        card.setName(MjClient.playui.HandleCardType.Put);
                                        card.tag = cardArr[i];
                                        var x = startPos.x + j * templatCard.width * templatCard.scale * 0.97;
                                        var y = startPos.y + i * templatCard.height * templatCard.scale;
                                        card.setPosition(cc.p(x, y));
                                        this.addChild(card);
                                        MjClient.playui.updateChiGangCards(card, lastPutCard - cardArr[i] + j);

                                        card.addTouchEventListener(function(sender, eventType){
                                            if(eventType == ccui.Widget.TOUCH_ENDED){
                                                MjClient.playui.sendChiToServer(sender.tag);
                                                MjClient.playui.hideEatNodeChildren();
                                                self.visible = false;
                                            }
                                        }, card);
                                    }
                                }
                            },
                            showGangCards: function(){
                                this.showCards();
                                this.visible = true;
                                var cardArr = MjClient.playui.gangCardArray;
                                this.updateSize(cardArr.length, 4);
                                var startPos = this.getStartPos(cardArr.length, 4);
                                var templatCard = this.getChildByName("img_card");
                                var self = this;
                                for(var i = 0;i < cardArr.length;i++){
                                    for (var j = 0; j < 4; j ++){
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
                                                var player = MjClient.playui.getPlayerInfoByOff(0);
                                                if (player.eatFlag & 8) {
                                                    MjClient.showMsg("确认不胡吗?", function(){
                                                        MjClient.playui.sendGangToServer(sender.tag);
                                                        MjClient.playui.hideEatNodeChildren();
                                                        self.getParent().visible = false;
                                                    }, function() {}, "1");
                                                } else {
                                                    MjClient.playui.sendGangToServer(sender.tag);
                                                    MjClient.playui.hideEatNodeChildren();
                                                    self.getParent().visible = false;
                                                }
                                                
                                            }
                                        }, card);
                                    }
                                }
                            }
                        }
                    }
                },
                node_wait: {
                    btn_setting: {
                        _layout: [[0.09, 0.09], [0.97, 0.92], [0, 0]],
                        _click: function(){
                            var settingLayer = MjClient.playui.createSettingView();
                            settingLayer.setName("PlayLayerClick");
                            MjClient.Scene.addChild(settingLayer);
                            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi", {uid:SelfUid(),gameType:MjClient.gameType});
                        }
                    },
                },
                _event:{
                    mjhand: function() {
                        if(MjClient.endoneui && cc.sys.isObjectValid(MjClient.endoneui)){
                            MjClient.endoneui.removeFromParent(true);
                            MjClient.endoneui = null;
                        }

                        MjClient.playui.lastPutCardNode = null;
                        //ScanCheatLayer.showStartOnce();
                        checkCanShowDistance();
                    },
                    MJChat : function(data){
                        if(data.type == 4){
                            //距离位置显示
                            checkCanShowDistance();
                        }
                    },
                    removePlayer: function(eD) {
                        //距离位置显示
                        checkCanShowDistance();
                    },
                    initSceneData: function() {
                        if(MjClient.rePlayVideo != -1) return; //回放的时候，不弹解散窗口
                        var tData = MjClient.data.sData.tData;
                        if(tData.delEnd != 0 && !MjClient.delroomui){
                            MjClient.Scene.addChild(new RemoveRoomView());
                            if (MjClient.webViewLayer != null){
                                MjClient.webViewLayer.close();
                            }
                        }else if(tData.delEnd == 0 && MjClient.delroomui){
                            MjClient.delroomui.removeFromParent(true);
                            delete MjClient.delroomui;
                        }
                        if(MjClient.gemewaitingui && cc.sys.isObjectValid(MjClient.gemewaitingui)){
                            MjClient.gemewaitingui.removeFromParent(true);
                            delete MjClient.gemewaitingui;
                        }
                        if(MjClient.playerChatLayer && cc.sys.isObjectValid(MjClient.playerChatLayer)){
                            MjClient.playerChatLayer.removeFromParent(true);
                            delete MjClient.playerChatLayer;
                        }
                        MjClient.playui.resetPlayerHeadLayout();
                        MjClient.playui.updateGPSData();
                        //距离位置显示
                        checkCanShowDistance();
                    },
                }
            };
            return jsBind;
        },

        ctor: function(subObj, jsonFile){
            this._super(majiang_panel_shaoyang, jsonFile);

            subObj.jsBind = subObj.prototype.getJsBind();
            util.assign(subObj.jsBind, majiang_panel_shaoyang.jsBind);
            this.jsBind = subObj.jsBind;

            this.initData();
            this.bindPlayUI();
            return true;
        },

        // @Override 显示小结算
        createEndOnePanel: function(){
            return new majiang_winGamePanel_shaoyang();
        },

        // @Override 显示大结算
        createGameOverPanel: function(){
            return new majiang_gameOver_shaoyang();
        },

        // @Override 显示设置界面
        createSettingView: function(){
            return new majiang_settingPanel_shaoyang("setting_majiang_shaoyang.json");
        }
    });

    /** ----------------------------------------  游戏功能设置  ------------------------------------------**/

    majiang_panel_shaoyang.prototype.isNeedSkipHuTip = function(){
        return true;
    }

    // @Override 3D吃碰牌特效 开启
    majiang_panel_shaoyang.prototype.isNeedEatActionEffect3D = function() {
        return true;
    };

    // @Override 摸牌动画 开启
    majiang_panel_shaoyang.prototype.isCanPlayNewCardAction = function() {
        return true;
    };

    // @Override 开启出牌放大特效
    majiang_panel_shaoyang.prototype.isOpenPutOutCardAnima = function(){
        return this.getPutCardScaleConfig();
    };

    // @Override 插牌动画 开启
    majiang_panel_shaoyang.prototype.isCanInsertcard = function() {
        return true;
    };

    // @Override 插牌动画倾斜 开启
    majiang_panel_shaoyang.prototype.isNeedCardRotateAction = function(){
        return true;
    };

    // @Override 设置癞子牌颜色 关闭
    majiang_panel_shaoyang.prototype.setLaiZiColor = function(cardNode) {
       return false;
    };

    // @Override top位置玩家出的牌是否相对down玩家旋转180 开启
    majiang_panel_shaoyang.prototype.isCardRotationOfTopPlayer = function(){ 
        return true;
    };

    // 开局检测距离 开启
    majiang_panel_shaoyang.prototype.isCheckDistance = function() {
        return true;
    };

    /** ----------------------------------------  牌局信息初始化  ------------------------------------------**/

    // @Override 初始化游戏数据
    majiang_panel_shaoyang.prototype.initGameData = function() {
        majiang_panel.prototype.initGameData.call(this);
    };

    /** ----------------------------------------  游戏设置相关  ------------------------------------------**/

    // @Override 游戏桌面背景
    majiang_panel_shaoyang.prototype.getGameBgList = function(is3D) {
        if(is3D){ // 3dBG资源
            return ["playing/MJ3D/background/beijing3D_1.jpg", "playing/MJ3D/background/beijing3D_2.jpg",
            "playing/MJ3D/background/beijing3D_3.jpg", "playing/MJ3D/background/beijing3D_4.jpg"];
        }
        return ["playing/MJ/beijing_1.png", "playing/MJ/beijing_2.png",
        "playing/MJ/beijing_3.png", "playing/MJ/beijing_4.png"];
    };

    // @Override 游戏桌面背景名称
    majiang_panel_shaoyang.prototype.getGameBgNameList = function(is3D) {
        if(is3D){
            return ["蓝绿","淡绿","湖蓝","靛蓝"];
        }
        return ["翡翠蓝","经典绿","孔雀绿","碧玉绿"];
    };

    // @Override 获取语音名字
    majiang_panel_shaoyang.prototype.getVoiceNameList = function() {  
        return ["普通话","本地话"];
    };

    // @Override 牌背
    majiang_panel_shaoyang.prototype.getCardBgList = function(is3D) {
        if(is3D){
            return ["playing/MJ/MJBg3D1", "playing/MJ/MJBg3D2"];
        }
        return ["playing/MJ/MJBg1", "playing/MJ/MJBg2", "playing/MJ/MJBg3", "playing/MJ/MJBg4"];
    };

    // @Override 牌背名字
    majiang_panel_shaoyang.prototype.getCardBgNameList = function(is3D) {
        if(is3D){
            return ["经典", "流行"];
        }
        return ["大气","精致","圆润","自然"];
    };

    // @Override 牌面
    majiang_panel_shaoyang.prototype.getCardFrontList = function(is3D) {
        if(is3D){
            return ["playing/MJ/MJCard3D1", "playing/MJ/MJCard3D2"];
        }
        return ["playing/MJ/MJCard1", "playing/MJ/MJCard2", "playing/MJ/MJCard3", "playing/MJ/MJCard4"];
    };

    // @Override 展示游戏内置聊天信息
    majiang_panel_shaoyang.prototype.showGameSoundChatMessage = function(node, playerNodeName, msg) {
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
        var voiceType = MjClient.GAME_TYPE.TY_ZHUANZHUAN;
        var content = GameSound4Chat[voiceType];
        if (content) {
            this.playEffect(GameSound4Chat[voiceType][this.getRandomRange(0,content.length-1)] + musicNum, false, player.info.sex);
        }
        node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
    };

    /** ----------------------------------------  桌面布局相关  ------------------------------------------**/

    // @Override 设置东南西北的方位
    majiang_panel_shaoyang.prototype.updateArrowIconDirection = function(arrowNode) {
        var path = "playing/gameTable/dir_2D/dir_normal_";
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
        }
    };

    // @Override 中间的小转盘，刷新
    majiang_panel_shaoyang.prototype.updateArrowRotation2D = function(arrowNode, nextPlayer) {
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

        var iconNormalPath = "playing/gameTable/dir_2D/dir_normal_";
        var arrowPath = "playing/gameTable/arrow_";
        for(var i = 0;i < arrowArray.length;i++){
            var arrow = arrowNode.getChildByName(arrowArray[i]);
            arrow.visible = false;
            arrow.stopAllActions();
            var icon = arrowNode.getChildByName(iconArray[i]);
            var textureFile = icon.getRenderFile().file;
            textureFile = textureFile.replace("normal", "press");
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
        selectIcon.loadTexture(iconNormalPath + playerNodeIndex + ".png");
    };

    // @Override 设置游戏中，结束位置的头像
    majiang_panel_shaoyang.prototype.setInGameHeadLayout = function(nodeName,layout_head) { 
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
            setWgtLayout(layout_head, headSize, [0.05, 0], [0, 2.8], false, false);
            endPos = layout_head.getPosition();
        }else if(nodeName == "node_right"){
            setWgtLayout(layout_head, headSize, [1, 0.5], [-0.6, 1.7], false, false);
            endPos3D = layout_head.getPosition();
            //3d
            setWgtLayout(layout_head, headSize, [0.98, 0.5], [-0.4, 1.7], false, false);
            endPos = layout_head.getPosition();
        }else if(nodeName == "node_top"){
            var topheadPos = [0.28, 1];
            if(this.is3DStyle() && this.isIPad()){
                topheadPos = [0.22, 1];
            }
            setWgtLayout(layout_head, headSize, topheadPos, [0, -0.65], false, false); 
            endPos3D = layout_head.getPosition();
            //3d
            setWgtLayout(layout_head, headSize, [0.26, 1], [0, -0.65], false, false); 
            endPos = layout_head.getPosition();
        }else if(nodeName == "node_left"){
            setWgtLayout(layout_head, headSize, [0 + addValue, 0.5], [0.6, 1.7], false, false);
            endPos3D = layout_head.getPosition();
            //3d
            setWgtLayout(layout_head, headSize, [0.05, 0.5], [0, 2.35], false, false); 
            endPos = layout_head.getPosition();
        }


        if (this.is3DStyle()) {
            layout_head.setPosition(endPos3D);
        }

        layout_head.setUserData({endPos: endPos, endPos3D: endPos3D});
    };

    // @Override 设置初始值头像位置
    majiang_panel_shaoyang.prototype.setInitHeadLayout = function(nodeName,layout_head) { 
        if(!layout_head || !nodeName) return;

        var headSize = [0.13,0.13];
        if(this.isIPad()){
            headSize = [0.09,0.09];
        }

       // 初始位置
        if (nodeName == "node_right") {
            setWgtLayout(layout_head, headSize, [0.5, 0.5], [2.3, -1.4], false, false);
        }else if(nodeName == "node_top"){
            setWgtLayout(layout_head, headSize, [0.5, 0.5], [2.3, 2], false, false);
        }else if(nodeName == "node_left"){
            setWgtLayout(layout_head, headSize, [0.5, 0.5], [-2.3, 2], false, false);
        }else if(nodeName == "node_down"){
            setWgtLayout(layout_head, headSize, [0.5, 0.5], [-2.3, -1.4], false, false);
        }
    };

    // @Override 设置房主的标识
    majiang_panel_shaoyang.prototype.updateFangZhuIconStatus = function(headNode) {
        var tData = MjClient.data.sData.tData;
        var player = this.getPlayerInfoByName(headNode.getParent().getName());
        if (!player || tData.owner != player.info.uid) {
            headNode.removeChildByName("fangIcon");
            return;
        }

        var fangIcon = headNode.getChildByName("fangIcon");
        if (!fangIcon) {
            var sp = new cc.Sprite("playing/gameTable/fangzhu.png");
            sp.setPosition(headNode.getContentSize().width - 7, 20);
            sp.setAnchorPoint(1,0);
            sp.setName("fangIcon");
            headNode.addChild(sp, 100);
        } else {
            fangIcon.visible = true;
        }
    };

    // @Override 获得癞子标识
    majiang_panel_shaoyang.prototype.getLaiZiIcon2D = function(){
        var laiZiNode = new ccui.ImageView();
        laiZiNode.setName("laiZi");
        laiZiNode.loadTexture("playing/MJ/gong.png");
        return laiZiNode;
    };

    // @Override 添加癞子标识2D
    majiang_panel_shaoyang.prototype.addLaiZiIcon2D = function(cardNode){
        if(!this.isCanAddLaiZiIcon(cardNode.tag)){
            return;
        }

        var playerNodeName = cardNode.getParent().getName();
        var offIndex = this.getNodeIndexDefaultByName(playerNodeName);
        offIndex = offIndex == -1 ? 0 : offIndex;
        var laiZiPosArr = this.getHunIconPosition2D(offIndex, cardNode.name);
        var laiZiNode = this.getLaiZiIcon2D();
        var laiZiPosY = laiZiPosArr[offIndex][1];
        if (cardNode.getName() == this.HandleCardType.Chi) {
            laiZiPosY *= 1.3;
        }

        laiZiNode.setPosition(laiZiPosArr[offIndex][0], laiZiPosY);
        laiZiNode.setRotation(-90 * offIndex);
        cardNode.addChild(laiZiNode);
    };

    // @Override 添加癞子标识3D
    majiang_panel_shaoyang.prototype.addLaiZiIcon3D = function(cardNode) {
        if(!this.isCanAddLaiZiIcon(cardNode.tag)){
            return;
        }

        var offIndex = this.getNodeIndexDefaultByName(cardNode.getParent().getName());
        offIndex = offIndex == -1 ? 0 : offIndex;
        var laiZiPosArr = this.getCardFacePositon3D();
        var laiZiNode = this.getLaiZiIcon2D();
        var pos_x = laiZiPosArr[offIndex][0] * cardNode.width;
        var pos_y = laiZiPosArr[offIndex][1] * cardNode.height;
        laiZiNode.setPosition(pos_x, pos_y);
        laiZiNode.setRotation(-90 * offIndex);
        cardNode.setColor(cc.color(240, 230, 140));
        cardNode.addChild(laiZiNode);
    };

    /**
     * @Override
     * 根据麻将类型进行缩放
     */
    majiang_panel_shaoyang.prototype.updateCardNodeScale = function(cardNode){

    };

    // @Override 获得癞子标识的坐标
    majiang_panel_shaoyang.prototype.getHunIconPosition2D = function(offIndex, cardName) {
        var is3D = this.is3DStyle();
        if (!is3D && offIndex === 0 && cardName && cardName == this.HandleCardType.Put) {
            return [[65, 107]];
        }

        return [[60, 77], [52, 70], [40, 84], [74, 68], [61, 78], [61, 78], [22, 30]];
    };

    // @Override 刷新手牌大小
    majiang_panel_shaoyang.prototype.updateHandCardSize = function(node) {
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
                    setWgtLayout(node, [0, 0.07], [0.5, 1], [8, -1.3]);
                else
                    setWgtLayout(node, [0, 0.09], [0.5, 1], [8, -1.3]);
            }else{
                if(maxPlayer == 4){
                    setWgtLayout(node, [0, 0.07], [0.45, 1], [-6, -0.8]);
                }else if(maxPlayer == 2){
                    setWgtLayout(node, [0, 0.07], [0.5, 1.033], [6, -1.4]);
                } 
            }
        }   
    };

    // @Override 设置其他牌大小
    majiang_panel_shaoyang.prototype.updateOtherCardSize = function(node) {
        var is3D = MjClient.playui.is3DStyle();
        var maxPlayer = MjClient.playui.getMaxPlayer();
        var playNode = node.getParent();
        var _ds = 0;
        if(playNode.getName() == "node_down"){
            if(node.getName() == "img_eatFrontCard"){
                if(!is3D){
                    setWgtLayout(node, [0.05, 0], [0.05, 0], [0, 0.55]);
                }else{
                    setWgtLayout(node, [0.05, 0], [0, 0], [0.8, 0.5]);
                }
            }
            if(node.getName() == "img_putCardOne"){
                if(!is3D){
                    if(MjClient.size.width / MjClient.size.height >= 1.5){
                        if (maxPlayer == 2) {
                            setWgtLayout(node, [0, 0.088], [0.306, 0], [-5, 3.3]);
                        } else {
                            setWgtLayout(node, [0, 0.088], [0.506, 0], [-5, 3.3]);
                        }
                    }
                    else if(MjClient.playui.isIPad())
                    {
                        if (maxPlayer == 2) {
                            setWgtLayout(node, [0, 0.075], [0.306, 0], [-6, 2.7]);
                        } else {
                            setWgtLayout(node, [0, 0.075], [0.506, 0], [-6, 2.7]);
                        }
                    }
                    else{
                        if (maxPlayer == 2) {
                            setWgtLayout(node, [0, 0.08], [0.306, 0], [-1, 3.3]);
                        } else {
                            setWgtLayout(node, [0, 0.08], [0.506, 0], [-1, 3.3]);
                        }
                    }
                }else{
                    var _ds = MjClient.playui.isIPad() ? -0.01 : -0.005;
                    if(maxPlayer == 4){
                        setWgtLayout(node, [0.0, 0.076 + _ds], [0.58, -0.07], [-7, 6.1]);
                    }else if(maxPlayer == 3){
                        setWgtLayout(node, [0.0, 0.076 + _ds], [0.577, -0.03], [-7, 6.1]);
                    }else if(maxPlayer == 2){
                        setWgtLayout(node, [0.0, 0.076 + _ds], [0.506, -0.03], [-7, 6.1]);
                    } 
                } 
            }
        }
        if(playNode.getName() == "node_right"){
            if(node.getName() == "img_putCardOne"){
                if(!is3D){
                    if(MjClient.size.width / MjClient.size.height >= 1.5){
                        setWgtLayout(node, [0, 0.063], [1, 0.5], [-5.8, -3.5]);
                    }else if(this.isIPad()){
                        setWgtLayout(node, [0, 0.053], [1, 0.5], [-5.8, -4.5]);
                    }else{
                        setWgtLayout(node, [0, 0.058], [1, 0.5], [-5.8, -4.5]);
                    }
                }else{
                    _ds = this.isIPad() ? -0.01 : 0;
                    if(maxPlayer == 4){
                        setWgtLayout(node, [0, 0.056+ _ds], [0.9, 0.645], [-5.2, -4.0]);
                    }else if(maxPlayer == 3){
                        setWgtLayout(node, [0, 0.056+ _ds], [0.839, 0.742], [-5.2, -4.0]);
                    } 
                }
            }        
        }
        if(playNode.getName() == "node_top"){
            if(node.getName() == "img_eatFrontCard"){
                if(!is3D){
                    setWgtLayout(node, [0, 0.08], [0.5, 1], [9.2, -1.4]);
                }else{
                    if(maxPlayer == 4){
                        setWgtLayout(node, [0, 0.07], [0.5, 1.015], [6, -1.4]);
                    }else if(maxPlayer == 2){
                        setWgtLayout(node, [0, 0.07], [0.5, 1.033], [6, -1.4]);
                    }
                }            
            }
            if(node.getName() == "img_putCardOne"){
                if(!is3D){
                    if(MjClient.size.width / MjClient.size.height >= 1.5){
                        if (maxPlayer == 2) {
                            setWgtLayout(node, [0, 0.088], [0.7, 1], [6, -2.6]);
                        } else {
                            setWgtLayout(node, [0, 0.088], [0.5, 1], [6, -2.6]);
                        }
                    }
                    else if(MjClient.playui.isIPad())
                    {
                        if (maxPlayer == 2) {
                            setWgtLayout(node, [0, 0.075], [0.75, 1], [4.8, -2.3]);
                        } else {
                            setWgtLayout(node, [0, 0.075], [0.55, 1], [4.8, -2.3]);
                        }
                    }
                    else{
                        if (maxPlayer == 2) {
                            setWgtLayout(node, [0, 0.08], [0.7, 1], [4.8, -2.6]);
                        } else {
                            setWgtLayout(node, [0, 0.08], [0.5, 1], [4.8, -2.6]);
                        }
                    }  
                }else{
                    var _ds = MjClient.playui.isIPad() ? -0.01 : 0;
                    var maxPlayer = MjClient.playui.getMaxPlayer();
                    if(maxPlayer == 4){
                        setWgtLayout(node, [0, 0.07 + _ds], [0.51, 1.02], [4.1, -4.1]);
                    }else if(maxPlayer == 2){
                        setWgtLayout(node, [0, 0.07 + _ds], [0.57, 0.98 ], [4.1, -4.1]);
                    } 
                }
            } 
        }
        if(playNode.getName() == "node_left"){
            if(node.getName() == "img_eatFrontCard"){
                if(!is3D){
                    _ds = this.isIPad() ? -1.1 : -0.2;
                    setWgtLayout(node, [0, 0.058], [0, 1], [3.5 + _ds, -1]); 
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
                        setWgtLayout(node, [0, 0.063], [0.05, 0.5], [4.8, 4.2]);
                    }else if(this.isIPad()){
                        setWgtLayout(node, [0, 0.053], [0.05, 0.55], [4.8, 4.2]);
                    }else{
                        setWgtLayout(node, [0, 0.058], [0.05, 0.5], [4.8, 4.2]);
                    } 
                }else{
                    _ds = this.isIPad() ? -0.01 : 0;
                    if(maxPlayer == 4){
                        setWgtLayout(node, [0, 0.056+ _ds], [0.125, 0.493], [5.2, 4.2]);
                    }else if(maxPlayer == 3){
                        setWgtLayout(node, [0, 0.056+ _ds], [0.182, 0.592], [5.2, 4.2]);
                    }                    
                }
            } 
        }
    };

    // @Override 获得吃碰杠的间距，可能根据分辨率需要调整
    majiang_panel_shaoyang.prototype.getEatCardSpace = function() {
        return cc.winSize.height / 36;
    };

    // @Override 获得手牌之间的缩放比
    majiang_panel_shaoyang.prototype.getHandCardSpaceScale = function() {
        var mjBgType = this.getMaJiangBgType();
        var scale = 0.93;
        if(mjBgType == 0){

        }else if(mjBgType == 1){
            scale = 0.92;
        }else if(mjBgType == 2){
            scale = 0.93;
        }else if(mjBgType == 3){
            scale = 0.94;
        }
        return scale;
    };

    /**
     * @Override
     * 每组吃牌，牌与牌之间的缩放比  down and top
     **/
    majiang_panel_shaoyang.prototype.getDownAndTopNodeEatCardScale = function(mjBgType){
        var scale = 0.93;
        if(mjBgType == 0){
            scale = 0.91;
        }else if(mjBgType == 1){
            
        }else if(mjBgType == 2){
            scale = 0.97;
        }else if(mjBgType == 3){
            scale = 0.93;
        }
        return scale;
    };

    /**
     * @Override
     * 每组吃牌，牌与牌之间的缩放比  right and left
     **/
    majiang_panel_shaoyang.prototype.getRightAndLeftNodeEatCardScale = function(mjBgType){
        var scale = 0.65;
        if(mjBgType == 0){
            scale = 0.66;
        }else if(mjBgType == 1){
            scale = 0.75;
        }else if(mjBgType == 2){
            scale = 0.725;
        }else if(mjBgType == 3){
            scale = 0.7;
        }
        return scale;
    };

    /**
     * @Override
     * 打出的牌，牌与牌之间的缩放比  down and top
     **/
    majiang_panel_shaoyang.prototype.getDownAndTopPutOutCardScale = function(mjBgType){
        var scale_x = 0.9, scale_y = 0.95;
        if(mjBgType == 1){
            scale_x = 0.93;
            scale_y = 0.97;
        }else if(mjBgType == 2){
            scale_x = 0.945;
            scale_y = 0.95;
        }else if(mjBgType == 3){
            scale_x = 0.92;
            scale_y = 0.91;
        }
        return {scale_x : scale_x, scale_y : scale_y};
    };

    /**
     * @Override
     * 打出的牌，牌与牌之间的缩放比  right and left
     **/
    majiang_panel_shaoyang.prototype.getRightAndLeftPutOutCardScale = function(mjBgType){
        var scale_x = 0.95, scale_y = 0.9;
        if(mjBgType == 1){
            scale_x = 0.93;
            scale_y = 0.97;
        }else if(mjBgType == 2){
            scale_x = 0.90;
            scale_y = 0.95;
        }else if(mjBgType == 3){
            scale_x = 0.93;
            scale_y = 1;
        }
        return {scale_x : scale_x, scale_y : scale_y};
    };

    // @Override 获得手牌的牌牌背和牌面对应的坐标
    majiang_panel_shaoyang.prototype.getHandCardFacePosition2D = function(mjBgType) {
        var offSets = [[50, 65], [60, 66], [50, 104], [60, 66], [52, 68], [53, 64], [19, 25]];
        if (mjBgType == 1){
            offSets = [[52, 65], [65, 68], [52, 100], [65, 68], [52, 66], [53, 64], [19, 25]];
        }else if(mjBgType == 2){
            offSets = [[52, 65], [55, 70], [52, 90], [70, 70], [50, 76], [53, 64], [19, 25]];
        }else if(mjBgType == 3){
            offSets = [[52, 70], [65, 68], [52, 100], [65, 68], [50, 66], [53, 64], [19, 25]];
        }
        return offSets;
    };

    /**
     *  是否开启显示最多听牌标识
     **/
    majiang_panel_shaoyang.prototype.isShowMaxTingCards = function(){
        return true;
    };


    // @Override 获得打出的牌牌背和牌面对应的坐标
    majiang_panel_shaoyang.prototype.getPutCardFacePosition2D = function(mjBgType) {
        var offSets = [[50, 100], [60, 71], [50, 100], [60, 71], [52, 68], [53, 64], [19, 25]];
        if (mjBgType == 1){
            offSets = [[52, 90], [65, 68], [52, 88], [65, 68], [52, 66], [53, 64], [19, 25]];
        }else if(mjBgType == 2){
            offSets = [[52, 100], [65, 70], [52, 95], [70, 70], [50, 76], [53, 64], [19, 25]];
        }else if(mjBgType == 3){
            offSets = [[52, 104], [60, 68], [52, 92], [70, 70], [50, 66], [53, 64], [19, 25]];
        }
        return offSets;
    };

    // @Override 根据麻将背景类型获得对应的缩放比
    majiang_panel_shaoyang.prototype.getScaleByMjType2D = function(mjBgType) {
        mjBgType = mjBgType === undefined ? this.getMaJiangBgType() : mjBgType;
        var scale = 0.93;
        if (mjBgType == 1){
            scale = 1;
        }else if(mjBgType == 2){
            scale = 1;
        }else if(mjBgType == 3){
            scale = 1;
        }
        return scale;
    };

    // @Override 吃牌的坐标
    majiang_panel_shaoyang.prototype.setChiPosition2D = function(node, cardArr, pos, index, chiFirstIndex) {
        var cardNode = cardArr[index];
        var chiCardIndex = Math.floor((index - chiFirstIndex) / 3);
        var player = this.getPlayerInfoByName(node.getName());
        var pengchigang = player.pengchigang;
        cardNode.setPosition(pos);

        if (pengchigang && Object.keys(pengchigang).length > 0) {
            var chiData = pengchigang.chi[chiCardIndex];
            if (index >= chiFirstIndex && cardNode.tag == chiData.card) {
                this.setCardArrow(cardNode, chiData.pos, this.getUidIndex(player.info.uid));            
            }

            if (Math.floor((index - chiFirstIndex) % 3) == 2) {
                this.resetChiCardPos(cardArr, index, chiData.card);            
            }
            this.handlerAfterChiPengGang(cardNode);
        }
    };

    // 断线重连时将所吃的牌放在中间
    majiang_panel_shaoyang.prototype.resetChiCardPos = function(cardArr, index, chiCard) {
        var chiCardsGroup = [cardArr[index - 2], cardArr[index - 1], cardArr[index]];
        var midPos = chiCardsGroup[1].getPosition();
        var midZindex = chiCardsGroup[1].zIndex;
        for (var i in chiCardsGroup) {
            if (chiCardsGroup[i].tag == chiCard && i != 1) {
                var tagPos = chiCardsGroup[i].getPosition();
                var tagZindex = chiCardsGroup[i].zIndex;
                chiCardsGroup[i].setPosition(midPos);
                chiCardsGroup[i].zIndex = midZindex;
                chiCardsGroup[1].setPosition(tagPos);
                chiCardsGroup[1].zIndex = tagZindex;
            }
        }
    };

    /** ----------------------------------------  游戏操作  ------------------------------------------**/

    // @Override 发送过的命令给服务器
    majiang_panel_shaoyang.prototype.clickPass = function() {
        var that = this;
        if (that.checkWhenPass()){
            return;
        }
        // 过杠记录存储
        var tData = MjClient.data.sData.tData;
        var roomMsgValue = tData.tableid +":"+tData.roundNum;
        var saveRoomMsgValueG = util.localStorageEncrypt.getStringItem("IGNORE_G_TIP","");
        var player = that.getPlayerInfoByOff(0);
        if (that.isTurnMe()){
            var canGang = that.checkGangBtn(player);
            var passCallBack = function(){
                if(canGang){
                    util.localStorageEncrypt.setStringItem("IGNORE_G_TIP",roomMsgValue);
                    that.clickGangPass = true;
                }
                that.showPassHuTips();
                that.hideEatNodeChildren();
                that.sendPassToServer();
                player.eatFlag = 0;
            } 

            var msg = "确认过 ";
            if (canGang){
                msg += "杠 ";
            }
            if (player.eatFlag & 8){
                msg += "胡 ";
            }else if(canGang){
                // 只有杠就不弹出确认框了
                if(roomMsgValue == saveRoomMsgValueG){
                    passCallBack();
                    return;
                } 
            }
            msg += "吗?";
            MjClient.showMsg(msg, function(){
                passCallBack();
            }, function() {}, "1");
        }else{
            if(player.eatFlag & 8){
                MjClient.showMsg("确认不胡吗?", function(){
                    that.showPassHuTips();
                    that.hideEatNodeChildren();
                    that.sendPassToServer();
                    player.eatFlag = 0;
                }, function() {}, "1");
            }else{
                that.hideEatNodeChildren();
                that.sendPassToServer();
                player.eatFlag = 0;
            }
        }
    };

    //Override
    majiang_panel_shaoyang.prototype.updatePlayerEatBtn = function(){
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
    };

    //Override
    majiang_panel_shaoyang.prototype.handlerWhenCardTouchEnded = function(cardNode, cardTag){
        var that = this;
        var player = MjClient.playui.getPlayerInfoByName("node_down");
        if(player && player.eatFlag & 8){
            MjClient.showMsg("确认不胡吗?", function (data) {
                that.showPassHuTips();
                that.sendPassToServer();
                that.putOutCard(cardNode, cardTag);
            }, function (data) {
                MjClient.movingCard = null;
                that.resetCardLayout(that.getNodeByName("node_down"));
            }, "1");
        }else{
            this.putOutCard(cardNode, cardTag);
        }
    }; 

    /** ----------------------------------------  特效显示相关  ------------------------------------------**/

    //胡牌后牌型贴图展示
    majiang_panel_shaoyang.prototype.showHuTypeImage = function(node, player, playerNodeName) {
        var imgNodes = [];
        var huWords = player.huWords ? player.huWords : player.huWord;
        if (typeof(huWords) != "object" || huWords.length <= 0) {
            return;
        }

        for (var i = 0; i < huWords.length && i < 3; i++) {
            var HuTypeImg = new ccui.ImageView();
            HuTypeImg.setName("HuImg");
            HuTypeImg.loadTexture("spine/" + huWords[i] + "/" + huWords[i] + ".png");
            HuTypeImg.setScale(0.35);
            if(playerNodeName != "node_down" && huWords[i] == "duohu"){
                continue;
            }

            node.addChild(HuTypeImg);
            node.visible = true;
            imgNodes.push(HuTypeImg);
        }

        var off = this.getNodeIndexDefaultByName(playerNodeName);
        for (var m = 0; m < imgNodes.length; m++) {
            var index = Math.floor(imgNodes.length / 2);
            if (huWords.indexOf("duohu") >= 0) {
                index = Math.floor((imgNodes.length - 1) / 2);
            }

            if (huWords[m] == "duohu") {
                var worldPos = node.convertToWorldSpace(imgNodes[m].getPosition());
                imgNodes[m].x = imgNodes[m].x + cc.winSize.width / 2 - worldPos.x;
                imgNodes[m].y = imgNodes[m].y + cc.winSize.height / 2 - worldPos.y;
                continue;
            }

            if (off % 2 != 0) {
                imgNodes[index].x = 50 - (off -1 ) * 50;
                imgNodes[index].y = -20;
                imgNodes[m].x = imgNodes[Math.floor(imgNodes.length / 2)].x;
                if (imgNodes.length % 2 == 0) {
                    imgNodes[m].y = (1 - m * 2) * (imgNodes[m].getContentSize().height /2  * imgNodes[m].getScale() - (1 - m * 2) * 20);
                } else {
                    imgNodes[m].y = imgNodes[index].y - (m -index) * (imgNodes[index].getContentSize().height /2  * imgNodes[index].getScale() +
                                    imgNodes[m].getContentSize().height /2  * imgNodes[m].getScale() + 20);
                }
            } else {
                imgNodes[index].x = 0;
                imgNodes[index].y = -20 + off * 20
                imgNodes[m].y = imgNodes[Math.floor(imgNodes.length / 2)].y;
                if (imgNodes.length  % 2 != 0) {
                    imgNodes[m].x = imgNodes[index].x - (index - m) * (imgNodes[index].getContentSize().width /2  * imgNodes[index].getScale() +
                                    imgNodes[m].getContentSize().width /2  * imgNodes[m].getScale() + 50)
                } else {
                    imgNodes[m].x = 0 + (m * 2 -1) * (imgNodes[m].getContentSize().width /2  * imgNodes[m].getScale() + 50);
                }

            }
        }
    };

    //构造码牌动画层
    majiang_panel_shaoyang.prototype.getShuffleEffectNode = function(){
        var self = this;
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var uid = this.shuffleList[0];
        this.shuffleList.splice(0, 1);

        var layer = new majiang_mapai_shaoyang(MjClient.majiang.getAllCardsTotal(tData), sData.players[uid], function(){
            self.isPlayShuffle = false;
            self.playShuffleEffect();
        });

        return layer;
    };
}());