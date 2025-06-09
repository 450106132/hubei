/***
 * 汨罗红中，新框架牌桌逻辑
 * @type {void | Class | *}
 */

var majiang_panel_MLHZ;
(function () {
    majiang_panel_MLHZ = majiang_panel_yueyang.extend({

        jsonFile: "Play_MLHZ_new.json",
        getJsBind: function(){
            var jsBind = {
                node_eat:{
                    btn_peng: {
                        _visible: false,
                        _touch: function (sender, eventType) {
                            if(eventType === ccui.Widget.TOUCH_ENDED){
                                var player = MjClient.playui.getPlayerInfoByOff(0);
                                if(sender.checkPeng()) return;
                                if (player.eatFlag & 8) {
                                    MjClient.showMsg("确认不胡吗?", function(){
                                        MjClient.playui.sendPengToServer();
                                        MjClient.playui.hideEatNodeChildren();
                                    }, function() {}, "1");
                                } else {
                                    MjClient.playui.sendPengToServer();
                                    MjClient.playui.hideEatNodeChildren();
                                }
                            }
                        },
                        checkPeng: function(){
                            var player = MjClient.playui.getPlayerInfoByOff(0);
                            var tData = MjClient.data.sData.tData;
                            if (tData.areaSelectMode.bihuType && player.eatFlag & 8) {
                                MjClient.showToast("有胡必胡");
                                return true;
                            }
                            return false;
                        }
                    },
                    btn_gang: {
                        _visible: false,
                        _touch: function(sender, eventType) {
                            if (eventType === ccui.Widget.TOUCH_BEGAN) {
                                MjClient.playui.hasClickBtn = true;
                            }
                            if (eventType === ccui.Widget.TOUCH_CANCELED) {
                                MjClient.playui.hasClickBtn = false;
                            }
                            if (eventType === ccui.Widget.TOUCH_ENDED) {
                                if (sender.checkGang()) {
                                    return;
                                }
                                if (MjClient.playui.gangCardArray.length > 1) {
                                    var showCardsNode = MjClient.playui.jsBind.node_eat.node_showCards._node;
                                    showCardsNode.getChildByName("img_showCardsBg").showGangCards();
                                    return;
                                }

                                var player = MjClient.playui.getPlayerInfoByName("node_down");
                                if (player.eatFlag & 8) {
                                    MjClient.showMsg("确认不胡吗?", function () {
                                        MjClient.playui.sendGangToServer(MjClient.playui.gangCardArray[0]);
                                        MjClient.playui.hideEatNodeChildren();
                                    }, function () {}, "1");
                                } else {
                                    MjClient.playui.sendGangToServer(MjClient.playui.gangCardArray[0]);
                                    MjClient.playui.hideEatNodeChildren();
                                }
                            }
                        },
                        checkGang: function () {
                            return MjClient.playui.refuseGangWhenHu(MjClient.playui.gangCardArray[0]);
                        }
                    },
                    
                },
                panel_jiaPiao:{
                    _layout: [[1, 1], [0.5, 0.3], [0, 0]],
                    _event:{
                        initSceneData: function () {
                            this.setVisible(MjClient.playui.isShowPiaoFenPanel());
                        },
                        waitJiazhu: function(){
                            this.setVisible(MjClient.playui.isShowPiaoFenPanel());
                        },
                        clearCardUI: function () {
                            this.setVisible(false);
                        },
                    },
                    btn_buPiao:{
                        _click: function (sender) {
                            MjClient.playui.handelPiaoFenAndPiaoNiao(0, sender);
                        }
                    },
                    btn_piao1:{
                        _click: function (sender) {
                            MjClient.playui.handelPiaoFenAndPiaoNiao(1, sender);
                        }
                    },
                    btn_piao2:{
                        _click: function (sender) {
                            MjClient.playui.handelPiaoFenAndPiaoNiao(2, sender);
                        }
                    },
                    btn_piao3:{
                        _click: function (sender) {
                            MjClient.playui.handelPiaoFenAndPiaoNiao(3, sender);
                        }
                    },
                },
                panel_piaoNiao:{
                    _layout: [[1, 1], [0.5, 0.3], [0, 0]],
                    _event:{
                        initSceneData: function () {
                            this.setVisible(MjClient.playui.isShowPiaoNiaoPanel());
                            MjClient.playui.processPiaoNiaoPanel(this);
                        },
                        waitJiazhu: function(msg){
                            this.setVisible(MjClient.playui.isShowPiaoNiaoPanel(msg));
                            MjClient.playui.processPiaoNiaoPanel(this, msg);
                        },
                        clearCardUI: function () {
                            this.setVisible(false);
                        },
                    },
                    btn_buchuo:{
                        _click: function (sender) {
                            MjClient.playui.handelPiaoFenAndPiaoNiao(0, sender);
                        }
                    },
                    btn_chuoda:{
                        _click: function (sender) {
                            MjClient.playui.handelPiaoFenAndPiaoNiao(2, sender);
                        }
                    },
                },
                text_waitOtherJiaZhu:{
                    _layout: [[0.32, 0.32], [0.5, 0.65], [0, 0]],
                    _visible: false,
                    _event:{
                        initSceneData: function () {
                            var sData = MjClient.data.sData;
                            var tData = sData.tData;
                            var player = MjClient.playui.getPlayerInfoByName("node_down");
                            if(tData.tState === TableState.waitJiazhu && player.mjState !== TableState.waitJiazhu){
                                this.setVisible(true);
                            }
                        },
                        moveHead:function () {
                            this.setVisible(false);
                        },
                        clearCardUI: function () {
                            this.setVisible(false);
                        },
                        showTextWaitOtherJiaZhu: function () {
                            this.setVisible(true);
                        }
                    }
                }
            };
            return jsBind;
        },

        ctor: function(){
            var jsonFile = this.jsonFile;
            this._super(majiang_panel_MLHZ, jsonFile);
            this.bindShowInfo();
            return true;
        },

        // override 是否显示红中癞子牌
        isHunCardShow: function(){
            return false;
        },

        // override 是否显示红中癞子牌
        isHunCardShow3D: function(){
            return true;
        },

        // override 是否开启显示最多听牌标识
        isShowMaxTingCards: function(){
            return true;
        },

        // 返回是否显示飘分层牌【自由下飘, 首局定飘】
        isShowPiaoFenPanel: function () {
            var sData = MjClient.data.sData;
            var tData = sData.tData;
            var player = MjClient.playui.getPlayerInfoByName(this.NodeNameArray[0]);
            var isShow = (tData.areaSelectMode.piaofen === 4 || tData.areaSelectMode.piaofen === 5);
            return !!(isShow && tData.tState === TableState.waitJiazhu && player && player.mjState === TableState.waitJiazhu);
        },

        // 返回是否显示飘鸟层牌【围一飘鸟】
        isShowPiaoNiaoPanel: function(msg){
            var player = MjClient.playui.getPlayerInfoByName(this.NodeNameArray[0]);
            if(!player) return;
            var sData = MjClient.data.sData;
            var tData = sData.tData;
            var isShow = tData.areaSelectMode.piaoniao;
            if(isShow && player && player.mjState === TableState.waitJiazhu && tData.tState === TableState.waitJiazhu){
                return !(msg && cc.isArray(msg.chuoId) && msg.chuoId.indexOf(player.info.uid) >= 0 && player.jiazhuNum === 4);
            }
        },

        // 处理飘鸟层按钮【首局 扎鸟 不扎】【次局 戳哒 不戳】
        processPiaoNiaoPanel: function(piaoNiaoPanel, msg){
            var player = MjClient.playui.getPlayerInfoByName(this.NodeNameArray[0]);
            if(!player) return;
            var selfUid = player.info.uid;
            var btnBuChuo = piaoNiaoPanel.getChildByName("btn_buchuo");
            var btnChuoDa = piaoNiaoPanel.getChildByName("btn_chuoda");
            if((msg && cc.isArray(msg.chuoId) && msg.chuoId.indexOf(selfUid) >= 0 && player.jiazhuNum === 2) || !msg && player.jiazhuNum > 0){
                btnBuChuo.loadTextures("playing/gameTable/buchuo_n.png", "playing/gameTable/buchuo_s.png");
                btnChuoDa.loadTextures("playing/gameTable/chuoda_n.png", "playing/gameTable/chuoda_s.png");
            }else{
                btnBuChuo.loadTextures("playing/gameTable/buzha_n.png", "playing/gameTable/buzha_s.png");
                btnChuoDa.loadTextures("playing/gameTable/zhaniao_n.png", "playing/gameTable/zhaniao_s.png");
            }
        },


        // 飘分,飘鸟按钮回调【统称为jiazhu】
        handelPiaoFenAndPiaoNiao: function(index, sender){
            MjClient.playui.sendJiaZhuToServer(index, MjClient.playui.getSelfUid());
            sender.parent.setVisible(false);
            postEvent("showTextWaitOtherJiaZhu");
            this.getPlayerInfoByName("node_down").mjState = TableState.isReady;
        },

        // 绑定头像下部飘分
        bindShowInfo: function(){
            for(var i = 0; i < this.NodeNameArray.length; i++){
                var nodeName = this.NodeNameArray[i];
                this.handelTextPiao(nodeName);
            }
        },

        // 处理点飘显示
        handelTextPiao: function (nodeName) {

            var playerNode = MjClient.playui.getNodeByName(nodeName);

            var showTextPiao = function (textNode, needAnim) {
                var tData = MjClient.data.sData.tData;
                var player = MjClient.playui.getPlayerInfoByName(nodeName);
                var string;
                if(!tData || !player || tData.tState === TableState.waitJiazhu || player.jiazhuNum === undefined || player.jiazhuNum <= 0){
                    return textNode.visible = false;
                }

                textNode.visible = true;
                if(tData.areaSelectMode.piaoniao){
                    string = "鸟" + player.jiazhuNum + "分";
                }else{
                    string = "飘" + player.jiazhuNum + "分";
                }
                textNode.ignoreContentAdaptWithSize(true);
                textNode.setString(string);

                var palyerNode = textNode.getParent().getParent();
                if(cc.sys.isObjectValid(palyerNode) && needAnim){
                    var endPos = textNode.getPosition();
                    var anim = palyerNode.getChildByName("node_animation");
                    var worldPos = anim.convertToWorldSpace(palyerNode.getPosition());
                    var startPos = textNode.convertToNodeSpace(worldPos);
                    textNode.setPosition(startPos);
                    textNode.runAction(cc.sequence(
                        cc.fadeIn(0.01),
                        cc.scaleTo(0.01, 2),
                        cc.delayTime(2),
                        cc.spawn(
                            cc.moveTo(0.3, endPos),
                            cc.scaleTo(0.3, 1)
                        )
                    ));
                }
            };

            var jsBind = {
                layout_head:{
                    text_piao:{
                        _visible: false,
                        _event:{
                            clearCardUI: function() {
                                this.visible = false;
                            },
                            mjhand: function () {
                                showTextPiao(this, true);
                            },
                            initSceneData: function () {
                                showTextPiao(this);
                            }
                        }
                    }
                }
            };
            util.bindUiAndLogicMajiang(playerNode, jsBind);
        },


        // @Override  end事件的处理,【拖出去牌过胡提示, 红中打出去需要提示】
        handlerWhenCardTouchEnded: function (cardNode, cardTag) {
            var that = this;
            var player = MjClient.playui.getPlayerInfoByName("node_down");
            var isShow = util.localStorageEncrypt.getBoolItem(this.guoHuTipPopup, true);
            if(isShow && player && player.eatFlag & 8){
                MjClient.showMsg("确定不胡吗?", function (data) {
                    if(data) util.localStorageEncrypt.setBoolItem(that.guoHuTipPopup, !data.isSelect);
                    that.showPassHuTips();
                    that.putOutCard(cardNode, cardTag);
                    that.sendPassToServer();
                }, function (data) {
                    if(data) util.localStorageEncrypt.setBoolItem(that.guoHuTipPopup, !data.isSelect);
                    MjClient.movingCard = null;
                    that.resetCardLayout(that.getNodeByName("node_down"));
                }, "3");

            }else if(this.isHunCard(cardNode.tag)){

                MjClient.showMsg("确定要打出红中吗? ", function () {
                    that.putOutCard(cardNode, cardTag);
                }, function () {
                    MjClient.movingCard = null;
                    that.resetCardLayout(that.getNodeByName("node_down"));
                }, "1");

            }else{
                this.putOutCard(cardNode, cardTag);
            }
        },


        //@Override 获得玩家可操作的按钮
        getPlayerEatNode: function() {
            var sData = MjClient.data.sData;
            var tData = sData.tData;
            var player = sData.players[this.getSelfUid()];
            var eat = MjClient.playui.jsBind.node_eat;
            var bihuType = tData.areaSelectMode.bihuType;
            var nodeArr = [];
            this.gangCardArray = [];
            player.isZiMoHu = false;
            if(this.isTurnMe()){
                //杠
                if(this.checkGangBtn(player) && !this.clickGangPass){
                    nodeArr.push(eat.btn_gang._node);
                }

                //胡
                if (player.eatFlag & 8) {
                    nodeArr.push(eat.btn_hu._node);
                    if(bihuType && player.isNew) player.isZiMoHu = true;
                }
            }else{
                if (player.eatFlag & 8) {
                    nodeArr.push(eat.btn_hu._node);
                }

                if (player.eatFlag & 4 ) {
                    nodeArr.push(eat.btn_gang._node);
                    this.gangCardArray.push(tData.lastPutCard);
                }

                if (player.eatFlag & 2) {
                    nodeArr.push(eat.btn_peng._node);
                }
            }

            if(nodeArr.length > 0){
                nodeArr.push(eat.btn_guo._node);
            }

            if(player.eatFlag & 8 && bihuType){
                nodeArr.splice(-1, 1);
            }
            this.reloadBtnTexture(nodeArr);
            return nodeArr;
        },

        // @override 点过的时候验证
        checkWhenPass: function () {
            var tData = MjClient.data.sData.tData;
            var player = this.getPlayerInfoByName("node_down");
            if(player.isZiMoHu){
                MjClient.showToast("自摸必须胡牌");
                return true;
            }

            if (tData.areaSelectMode.bihuType && player.eatFlag & 8){
                MjClient.showToast("有胡必胡");
                return true;
            }
            return false;
        },

        // @override began事件时的验证
        checkWhenTouchBegan: function (cardNode) {
            var tData = MjClient.data.sData.tData;
            var player = this.getPlayerInfoByName("node_down");
            if(player.isZiMoHu){
                MjClient.showToast("自摸必须胡牌");
                return true;
            }

            if(tData.areaSelectMode.bihuType && (player.eatFlag & 8)){
                MjClient.showToast("有胡必胡");
                return true;
            }

            return this._super(cardNode);
        },
        
        // override 获得听牌和听牌数量
        getTingCardsWithCount: function(cardArr, cardTag){
            var tData = MjClient.data.sData.tData;
            var cardNum = tData.areaSelectMode.hongzhong8 ? 8 : 4;
            var tingCards = this.getTingCards(cardTag);
            if(Object.keys(tingCards).length === 0){
                return tingCards;
            }

            for (var card in tingCards) {
                var existCount = cardArr[card] ? cardArr[card] : 0;
                existCount = (cardNum - existCount >= 0) ? (cardNum - existCount) : 0;
                tingCards[card] = existCount;
                if(existCount === 0){
                    // delete tingCards[card];
                }
            }
            return tingCards;
        },


        // 可以胡牌时的禁止gang操作
        refuseGangWhenHu: function (cardTag) {
            var player = MjClient.playui.getPlayerInfoByName("node_down");
            var tData = MjClient.data.sData.tData;
            var canHuAfterGang = MjClient.majiang.canHuAfterGang(player.mjhand, cardTag, tData.hunCard);
            if( player && player.isZiMoHu && !canHuAfterGang){
                MjClient.showToast("自摸必须胡牌");
                return true;
            }else if(tData.areaSelectMode.bihuType && player.eatFlag & 8){
                MjClient.showToast("有胡必胡");
                return true;
            }
            return false;
        },

        /**
         * [createEndOnePanel 创建小结算界面]
         */
        createEndOnePanel: function(){
            return new majiang_winGamePanel_MLHZ();
        },
    });
}());




























