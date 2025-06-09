/***
 * 岳阳App，通用牌桌文件，岳阳玩法继承此文件
 * 大小结算，设置界面公用一个
 * @type {void | Class | *}
 */
var majiang_panel_yueyang;
(function() {
    majiang_panel_yueyang = majiang_panel.extend({

        // 过胡提示弹窗【本局不再提醒】，右下角checkBox key值
        guoHuTipPopup: "guoHuTipPopup",

        getJsBind: function(){
            var jsBind = {
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
            this._super(majiang_panel_yueyang, jsonFile);
            playMusic("bgFight");

            subObj.jsBind = subObj.prototype.getJsBind();
            util.assign(subObj.jsBind, majiang_panel_yueyang.jsBind);
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
            return new majiang_winGamePanel_yueyang();
        },

        // @Override 显示大结算
        createGameOverPanel: function(){
            return new majiang_gameOver_yueyang();
        },

        // @Override 显示设置界面
        createSettingView: function(){
            return new majiang_settingPanel_yueyang();
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


        // @Override  end事件的处理, 岳阳定制【拖出去牌过胡提示】
        handlerWhenCardTouchEnded: function (cardNode, cardTag) {
            var that = this;
            var player = MjClient.playui.getPlayerInfoByName("node_down");
            var isShow = util.localStorageEncrypt.getBoolItem(this.guoHuTipPopup, true);
            if(isShow && player && player.eatFlag & 8){
                MjClient.showMsg("确定不胡吗?", function (data) {
                    if(data) util.localStorageEncrypt.setBoolItem(that.guoHuTipPopup, !data.isSelect);
                    that.showPassHuTips();
                    that.sendPassToServer();
                    that.putOutCard(cardNode, cardTag);
                }, function (data) {
                    if(data) util.localStorageEncrypt.setBoolItem(that.guoHuTipPopup, !data.isSelect);
                    MjClient.movingCard = null;
                    that.resetCardLayout(that.getNodeByName("node_down"));
                }, "3");
            }else{
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

        //@Override top位置玩家出的牌是否相对down玩家旋转180
        isCardRotationOfTopPlayer: function () {
            return true;
        },

        //是否需要胡牌时，显示胡牌牌型
        isNeedShowHuCardImage: function(){
            return true;
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
}());