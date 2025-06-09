/***
 * 湖北App，通用牌桌文件，湖北玩法继承此文件
 * 大小结算，设置界面公用一个
 * @type {void | Class | *}
 */
var majiang_panel_hubei;
(function() {
    majiang_panel_hubei = majiang_panel.extend({

        // 过胡提示弹窗【本局不再提醒】，右下角checkBox key值
        guoHuTipPopup: "guoHuTipPopup",

        getJsBind: function(){
            var jsBind = {
                img_gameName:{
                    _layout: [[0.25, 0.25],[0.5, 0.62],[0, 1.2]],
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
                },
                img_roomInfo2D: {
                    node_hunPai:{
                        _run: function(){
                            this.visible = MjClient.playui.isHunCardShow();
                            this.setPosition(cc.p(-225, 2));
                        },
                        img_hunIcon: {
                            _visible: false
                        },
                        img_hunCard: {
                            _run: function(){
                                this.visible = MjClient.playui.isInGame();
                                this.parent.getChildByName("img_hunBg").visible = MjClient.playui.isInGame();
                            },
                            _event: {
                                clearCardUI: function() {
                                    this.onSetCardAndBgShow(false);
                                },
                                mjhand: function(){
                                    this.cardAction();
                                    MjClient.playui.playHunCardAnim(this);
                                },
                                initSceneData: function(){
                                    this.cardAction();
                                },
                                switch2Dor3D: function () {
                                    this.cardAction();
                                }
                            },
                            cardAction: function(){
                                this.onSetCardAndBgShow(false);
                                var hunCard = MjClient.playui.getHunCard();
                                if (hunCard <= 0 || !MjClient.playui.isInGame()){
                                    return;
                                }
                                this.onSetCardAndBgShow(true);
                                this.tag = parseInt(hunCard);
                                MjClient.playui.setCardSprite(this, parseInt(hunCard), true);
                                var cardImg = this.getChildByName("cardImg");
                                if(cardImg) {
                                    cardImg.setScale(1);
                                    cardImg.setPosition(this.width * 0.53, this.height * 0.44);
                                }
                                this.runAction(cc.sequence(cc.delayTime(1), cc.spawn(cc.scaleTo(0.6,0.5))));
                            },
                            onSetCardAndBgShow: function (isShow) {
                                var hunBg = this.parent.getChildByName("img_hunBg");
                                this.visible = isShow;
                                hunBg.visible = isShow;
                            },
                        }
                    },
                },
                img_roomInfo3D: {
                    img_hunpaiBg: {
                        _run: function() {
                            this.visible = false;
                        },
                        _event: {
                            clearCardUI: function() {
                                this.visible = false;
                            },
                            initSceneData: function() {
                                this.setBaiDaCard3D();
                            },
                            mjhand: function() {
                                this.setBaiDaCard3D();
                                MjClient.playui.playHunCardAnim(this);
                            },
                            changeMJBgEvent: function() {
                                this.setBaiDaCard3D();
                            },
                            switch2Dor3D: function() {
                                this.setBaiDaCard3D();
                            },
                        },
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
                            MjClient.playui.setCardSprite(hunCardNode, hunCard, true);
                        }
                    },
                }
            };
            return jsBind;
        },

        ctor: function(subObj, jsonFile){
            this._super(majiang_panel_hubei, jsonFile);

            subObj.jsBind = subObj.prototype.getJsBind();
            util.assign(subObj.jsBind, majiang_panel_hubei.jsBind);
            this.jsBind = subObj.jsBind;

            this.initData();
            this.bindPlayUI();
        },

        // @Override down节点每次发手牌初始化数据
        initGameData: function(){
            this._super();
            util.localStorageEncrypt.setBoolItem(this.guoHuTipPopup, true);
        },


        // @Override 显示小结算
        createEndOnePanel: function(){
            return new majiang_winGamePanel_hubei();
        },

        // @Override 显示大结算
        createGameOverPanel: function(){
            return new majiang_gameOver_hubei();
        },

        // @Override 显示设置界面
        createSettingView: function(){
            return new majiang_settingPanel_hubei();
        },

        initCardTypeName: function(){
            this._super();
            this.HandleCardType["ShowHunCard"] = "img_hunCard";   // 牌桌左上角显示的癞子牌
        },

        getVoiceType: function(){
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJ_VOICE_TYPE, 0);
        },

        /**************************************    癞子牌设置相关    ***********************************************/
        //@Override 癞子牌可以打出, 如果癞子牌不能打出，直接return false
        setLaiZiColor: function(cardNode){
            this._super(cardNode);
            return false;
        },

        // @Override 更换癞子牌贴图
        getLaiZiIcon2D:function(){
            var laiZiNode = new ccui.ImageView();
            laiZiNode.setName("laiZi");
            laiZiNode.loadTexture("playing/MJ/lai.png");
            return laiZiNode;
        },

        // @Override 添加2D癞子标识
        addLaiZiIcon2D: function (cardNode) {
            if(!this.isCanAddLaiZiIcon(cardNode.tag)){
                return;
            }
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

        // @Override 获取2D癞子牌标签位置
        getHunIconPosition2D: function (cardNode) {
            if(!cardNode) return;
            var cardName = cardNode.getName();
            var size = cardNode.getContentSize();
            var pos;
            switch (cardName) {
                case this.HandleCardType.Hand:
                    pos = cc.p(size.width * 0.58, size.height * 0.48);
                    break;
                case this.HandleCardType.Chi:
                case this.HandleCardType.Peng:
                case this.HandleCardType.AnGang:
                case this.HandleCardType.MingGang:
                case this.HandleCardType.PengGang:
                case this.HandleCardType.Put:
                case this.HandleCardType.GDGangCard:
                case this.HandleCardType.LiangCard:
                    pos = cc.p(size.width * 0.58, size.height * 0.63);
                    break;
                default:
                    pos = cc.p(size.width * 0.58, size.height * 0.48);
                    break;
            }
            return pos;
        },

        addLaiZiIcon3D: function (cardNode) {
            if(!this.isCanAddLaiZiIcon(cardNode.tag)){
                return;
            }
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

        // @Override 获得3D癞子牌标签位置
        getLaiZiIconPosition3D: function (cardNode) {
            if(!cardNode) return;
            var cardName = cardNode.getName();
            var size = cardNode.getContentSize();
            var pos;
            switch (cardName) {
                case this.HandleCardType.Hand:
                    pos = cc.p(size.width * 0.58, size.height * 0.48);
                    break;
                case this.HandleCardType.Chi:
                case this.HandleCardType.Peng:
                case this.HandleCardType.AnGang:
                case this.HandleCardType.MingGang:
                case this.HandleCardType.PengGang:
                case this.HandleCardType.Put:
                case this.HandleCardType.GDGangCard:
                case this.HandleCardType.LiangCard:
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
        },

        // 23D癞子牌飞行动画
        playHunCardAnim: function (hunNode) {
            var isShowHunCard = MjClient.playui.isHunCardShow3D();
            var hunCard = MjClient.playui.getHunCard();
            if (!isShowHunCard || hunCard <= 0) return;

            var endScale = hunNode.getScale();
            var endPos = hunNode.getPosition();
            var startPos = hunNode.parent.convertToNodeSpace(cc.p(cc.winSize.width/2, cc.winSize.height * 0.75));
            hunNode.setPosition(startPos);
            hunNode.setScale(endScale * 2);

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
            hunNode.parent.addChild(sprite);
            sprite.setPosition(startPos);
            sprite.runAction(cc.sequence(
                cc.delayTime(0.03),
                cc.animate(createFanZhuanAction()),
                cc.removeSelf()
            ));

            hunNode.setOpacity(0);
            hunNode.runAction(cc.sequence(
                cc.delayTime(0.4),
                cc.fadeIn(0),
                cc.delayTime(1),
                cc.spawn(
                    cc.MoveTo(0.5, endPos),
                    cc.scaleTo(0.5, endScale)
                )
            ))
        },
        /**************************************    癞子牌设置相关  End  ***********************************************/


        // @Override  end事件的处理, 湖北定制【拖出去牌过胡提示】
        handlerWhenCardTouchEnded: function (cardNode, cardTag) {
            var that = this;
            var tData = MjClient.data.sData.tData;
            var player = MjClient.playui.getPlayerInfoByName("node_down");
            var isShow = util.localStorageEncrypt.getBoolItem(this.guoHuTipPopup, true);
            if(isShow && player && player.eatFlag & 8){
                var roomMsgValue = tData.tableid +":"+tData.roundNum;
                MjClient.showMsg("确定不胡吗?", function (data) {
                    if(data) util.localStorageEncrypt.setBoolItem(that.guoHuTipPopup, !data.isSelect);
                    util.localStorageEncrypt.setStringItem("IGNORE_H_TIP", roomMsgValue);
                    that.showPassHuTips();
                    that.sendPassToServer();
                    that.putOutCard(cardNode, cardTag);
                }, function (data) {
                    if(data) util.localStorageEncrypt.setBoolItem(that.guoHuTipPopup, !data.isSelect);
                    util.localStorageEncrypt.setStringItem("IGNORE_H_TIP", "");
                    MjClient.movingCard = null;
                    that.resetCardLayout(that.getNodeByName("node_down"));
                }, "3");
            }else{
                if(this.isNeedSkipHuTip())
                    that.showPassHuTips();
                this.putOutCard(cardNode, cardTag);
            }
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
                                setWgtLayout(node, [0, 0.08], [0.5, 1], [10, -1.1]);
                            else
                                setWgtLayout(node, [0, 0.08], [0.5, 1], [10, -1.4]);
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
            var pct = this.isIPad() ? 0.12 : 0.16;
            var pos = this.isIPad() ? 0.75 : 0.70;
            var space = this.isIPad() ? 1.4 : 1.5;
            var off_y = this.isIPad() ? 1.7 : 2.0;
            for(var i = 0;i < eatNodeArr.length;i++){
                var btn = eatNodeArr[i];
                btn.visible = true;
                setWgtLayout(btn, [0, pct], [pos, 0], [(i - eatNodeArr.length + 1) * space, off_y], false, false);
            }
            MjClient.playui.addLightAniEatBtns(); // 设置麻将的吃碰杠按钮特效
            this.checkBtnWithPlayerFlag();
        },

        // 胡牌时展示胡牌牌型
        showHuCardTypeImage: function (nodeAnimation, player, playerNodeName) {
            if(!player || !this.isNeedShowHuCardImage()) return;
            var huWords = player.huWords ? player.huWords : [].concat(player.huWord);
            if (typeof(huWords) != "object" || huWords.length <= 0) return;
            var imageArr = [];
            for(var i = 0; i < huWords.length && i < 3; i ++){
                var url = "cardType/" + huWords[i] + ".png";
                var image = new ccui.ImageView(url);
                image.setName("HuImg");
                image.setScale(0.40);

                if(playerNodeName !== "node_down" && huWords[i] === "duohu")
                    continue;

                nodeAnimation.addChild(image);
                imageArr.push(image);
            }

            var pct = this.isIPhoneX() ? 0.17 : 0.15;
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
        },

        // @Override 获取语音名字
        getVoiceNameList: function(){
            return ["普通话", "本地话"];
        },

        //@Override top位置玩家出的牌是否相对down玩家旋转180
        isCardRotationOfTopPlayer: function () {
            return true;
        },

        //是否需要胡牌时，显示胡牌牌型
        isNeedShowHuCardImage: function(){
            return true;
        },

        isNeedSkipHuTip: function(){
            return true;
        },


        // @Override 是否需要灯泡
        isShowTingLight: function(){
            return true;
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

        // @Override 是否开启显示最多听牌标识
        isShowMaxTingCards: function(){
            return true;
        }
    });

        /**
     *  发送过的命令给服务器
     *  return {void}
     **/
    majiang_panel_hubei.prototype.clickPass = function(){
        if (this.checkWhenPass()){
            return;
        }
        var tData =  MjClient.data.sData.tData;
        var player = this.getPlayerInfoByOff(0);
        if (this.isTurnMe()){
            var roomMsgValue = tData.tableid +":"+tData.roundNum;
            var saveRoomMsgValueG = util.localStorageEncrypt.getStringItem("IGNORE_G_TIP","");
            var saveRoomMsgValueH = util.localStorageEncrypt.getStringItem("IGNORE_H_TIP","");

            var canGang = this.checkGangBtn(player);

            var passCb = function(isRemerber){
                if(canGang) this.clickGangPass = true;

                if(canGang && isRemerber)
                    util.localStorageEncrypt.setStringItem("IGNORE_G_TIP", roomMsgValue);

                if(player.eatFlag & 8 && isRemerber){//选择过胡
                    util.localStorageEncrypt.setStringItem("IGNORE_H_TIP", roomMsgValue);
                    util.localStorageEncrypt.setBoolItem(this.guoHuTipPopup, !isRemerber);
                }

                this.showPassHuTips();
                this.hideEatNodeChildren();
                MjClient.playui.sendPassToServer();
            }

            if((canGang &&  (saveRoomMsgValueG.length > 0 && saveRoomMsgValueG == roomMsgValue))
                || (player.eatFlag & 8 && (saveRoomMsgValueH.length > 0 && saveRoomMsgValueH == roomMsgValue))){//可过杠或者可过胡
                    passCb.call(this);
                    return;
            }

            var msg = "确认过 ";
            if (canGang && saveRoomMsgValueG != roomMsgValue){
                msg += "杠 ";
            }
            if (player.eatFlag & 8 && saveRoomMsgValueG != roomMsgValue){
                msg += "胡 ";
            }
            msg += "吗?";
            MjClient.showMsg(msg, function(result){
               passCb.call(this, result && result.isSelect);
            }.bind(this), function(result) {
                if(result) util.localStorageEncrypt.setBoolItem(this.guoHuTipPopup, !result.isSelect);
            }.bind(this), "3");
        }else{
            var handleAutoPass = function(){
                this.showPassHuTips();
                this.hideEatNodeChildren();
                this.sendPassToServer();
            }.bind(this);
            if(player.eatFlag & 8){
                var roomMsgValue = tData.tableid +":"+tData.roundNum;
                var saveRoomMsgValueH = util.localStorageEncrypt.getStringItem("IGNORE_H_TIP","");
               
                if(saveRoomMsgValueH.length > 0 && saveRoomMsgValueH == roomMsgValue){
                    handleAutoPass();
                    return;
                }
                MjClient.showMsg("确认不胡吗?", function(result){
                    if(result && result.isSelect){
                        //选择了不在提示,
                        util.localStorageEncrypt.setStringItem("IGNORE_H_TIP",roomMsgValue);
                        util.localStorageEncrypt.setBoolItem(this.guoHuTipPopup, !result.isSelect);
                    }
                    handleAutoPass();                    
                }.bind(this), function(result) {
                    if(result) util.localStorageEncrypt.setBoolItem(this.guoHuTipPopup, !result.isSelect);
                }.bind(this), "3");
            }else{
                handleAutoPass();
            }
        }
    };
}());