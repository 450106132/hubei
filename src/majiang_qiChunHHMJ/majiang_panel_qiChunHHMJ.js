//蕲春晃晃麻将
var majiang_panel_qiChunHHMJ;

(function() {
    majiang_panel_qiChunHHMJ = majiang_panel_hubei.extend({

        getJsBind: function(){
            var jsBind = {
                node_down: {
                    layout_head: {
                        img_kaikou: {
                            _run: function () {
                                MjClient.playui.setKaiKouShow(this, "node_down");
                            }
                        }
                    },
                    _event: {
                        MJLiangPai: function (data) {
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.LIANG);
                        },
                        MJLiangPaiFinish: function (data) {
                            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
                            if (player.mjhand.length % 3 == 2) {
                                MjClient.data.sData.tData.tState = TableState.waitPut;
                                player.mjState == TableState.waitPut;
                                if (data.eatFlag > 0) {
                                    player.eatFlag = data.eatFlag;
                                    MjClient.playui.updatePlayerEatBtn();
                                }
                                MjClient.playui.hasClickBtn = false;
                                MjClient.playui.resetCardLayout(this);
                                MjClient.playui.searchAllTingCards();
                                MjClient.playui.updateTingTips();
                            }
                        },
                        MJPut: function (data) {
                            if (data.gangCard) {
                                MjClient.playui.dealGDGang(this, data);
                            } else {
                                MjClient.playui.clickGangPass = false;
                                MjClient.playui.clickTingPass = false;
                                MjClient.playui.clickTing = false;
                                MjClient.playui.dealPut(this, data);
                                if(data.uid == MjClient.playui.getSelfUid()){
                                    MjClient.playui.checkHandCards(this);
                                    MjClient.playui.checkPutCards(this);
                                    MjClient.playui.updateTingTips();
                                }
                            }
                        },
                        waitPut: function(data){
                            var tData = MjClient.data.sData.tData;
                            var player = MjClient.playui.getPlayerInfoByName("node_down");
                            if(tData.uids[tData.curPlayer] == player.info.uid){
                                MjClient.playui.updateColoeAfterSelectCard();
                                MjClient.playui.resetCardLayout(this);
                                MjClient.playui.updateTingTips();
                                MjClient.playui.autoPutAfterTing();
                            }
                        },
                        initSceneData: function () {
                            //一炮多响的倒牌
                            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
                            if(player.mjState != TableState.roundFinish){
                                player.isZiMo = false;
                            }
                            //初始化所有数据
                            MjClient.playui.initGameData();
                            MjClient.playui.updatePlayerCards(this);
                            MjClient.playui.updataClickCancelTingBtn();
                            MjClient.playui.updateCardColorAfterTing(true);
                            MjClient.playui.updatePlayerEatBtn();
                            //听牌
                            MjClient.playui.searchAllTingCards();
                            postEvent(MjClient.playui.PlayEventType.SHOW_TING_CARDS);
                            MjClient.playui.updateTingTips();

                            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);
                        },
                        MJChi: function(data) {
                            MjClient.playui.hasClickBtn = false;
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.CHI);
                            MjClient.playui.searchAllTingCards();
                            MjClient.playui.updateTingTips();
                        },
                        MJPeng: function(data) {
                            MjClient.playui.hasClickBtn = false;
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.PENG);
                            MjClient.playui.searchAllTingCards();
                            MjClient.playui.updateTingTips();
                        },
                    }
                },
                node_right: {
                    layout_head: {
                        img_kaikou: {
                            _run: function () {
                                MjClient.playui.setKaiKouShow(this, "node_right");
                            }
                        }
                    },
                    _event: {
                        MJLiangPai: function (data) {
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.LIANG);
                        },
                        MJPut: function(data) {
                            if (data.gangCard) {
                                MjClient.playui.dealGDGang(this, data);
                            }
                            else {
                                MjClient.playui.dealPut(this, data);
                            }
                        },
                    }
                },
                node_top: {
                    layout_head: {
                        img_kaikou: {
                            _run: function () {
                                MjClient.playui.setKaiKouShow(this, "node_top");
                            }
                        }
                    },
                    _event: {
                        MJLiangPai: function(data) {
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.LIANG);
                        },
                        MJPut: function(data) {
                            if (data.gangCard) {
                                MjClient.playui.dealGDGang(this, data);
                            }
                            else {
                                MjClient.playui.dealPut(this, data);
                            }
                        },
                    }
                },
                node_left: {
                    layout_head: {
                        img_kaikou: {
                            _run: function () {
                                MjClient.playui.setKaiKouShow(this, "node_left");
                            }
                        }
                    },
                    _event: {
                        MJLiangPai: function(data) {
                            MjClient.playui.handleCommand(this, data, MjClient.playui.AnimationType.LIANG);
                        },
                        MJPut: function(data) {
                            if (data.gangCard) {
                                MjClient.playui.dealGDGang(this, data);
                            }
                            else {
                                MjClient.playui.dealPut(this, data);
                            }
                        },
                    }
                },
                node_liang: {
                    _visible: false,
                    _layout: [[0.22, 0.22], [0.5, 0.3], [0, 0]],
                    Btn_liang: {
                        _click: function (btnNode) {
                            btnNode.parent.visible = false;
                            MjClient.playui.sendLiangPaiToServer(true);
                        }
                    },
                    Btn_guo: {
                        _click: function (btnNode) {
                            btnNode.parent.visible = false;
                            MjClient.playui.sendLiangPaiToServer(false);
                        }
                    },
                    _event: {
                        waitLiangCard: function () {
                            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
                            var isShow = MjClient.majiang.onCheckHasLiangCard(player);
                            this.visible = isShow;
                        },
                        initSceneData: function () {
                            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
                            var tData = MjClient.data.sData.tData;
                            if (tData.tState == TableState.waitLiangCard && player.mjState == TableState.waitLiangCard) {
                                var isShow = MjClient.majiang.onCheckHasLiangCard(player);
                                this.visible = isShow;
                            }
                        },
                        MJLiangPai: function (data) {
                            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
                            if (player && player.info.uid == data.uid) {
                                this.visible = false;
                            }
                            if (data.liangCards.length > 0) {
                                mylog(data.uid + " 选择亮牌" + JSON.stringify(data.liangCards));
                            }
                            else {
                                mylog(data.uid + " 选择不亮牌");
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
                        MJPut: function() {
                            var tData = MjClient.data.sData.tData;
                            if(MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext == (MjClient.MaxPlayerNum + 10)){
                                MjClient.playui.createFenZhangAni(this);
                            }
                        },
                    }
                }
            };
            return jsBind;
        },

        ctor: function() {
            this._super(majiang_panel_qiChunHHMJ, "Play_majiang_qiChunHHMJ.json");
            return true;
        },

        /**
         *  @Override
         *  添加麻将牌的类型
         **/
        initCardTypeName: function(){
            this._super();
            this.HandleCardType["GDGangCard"] = "GDGangCard";   // 红中发财杠牌
            this.HandleCardType["LiangCard"] = "LiangCard";     // 亮牌
        },

        /**
         *  @Override
         *  吃碰杠的动画类型
         **/
        initAnimationType: function(){
            this._super();
            this.AnimationType["LIANG"] = "liang";              // 亮牌动画
            this.AnimationType["GDGang"] = "gdGang";            // 红中发财杠动画
        },

        /**
         *  @Override
         *  游戏中状态
         **/
        isInGame: function () {
            var tData = MjClient.data.sData.tData;
            if (!tData){
                return false;
            }
            return tData.tState === TableState.waitPut ||
                tData.tState === TableState.waitEat ||
                tData.tState === TableState.waitCard ||
                tData.tState === TableState.waitLiangCard;
        },

        /**
         *  @Override
         *  游戏开始状态
         **/
        isBeganGame: function () {
            var tData = MjClient.data.sData.tData;
            if (!tData){
                return false;
            }
            return tData.tState === TableState.waitPut ||
                tData.tState === TableState.waitEat ||
                tData.tState === TableState.waitCard ||
                tData.tState === TableState.waitSelect ||
                tData.tState === TableState.roundFinish ||
                tData.tState === TableState.waitJiazhu ||
                tData.tState === TableState.waitLiangCard;
        },


        /**
         *  获取固定杠的牌
         **/
        getGuDingGang: function () {
            var tData = MjClient.data.sData.tData;
            if (tData.areaSelectMode["gudinggangType"] == 1) {
                return [71, 81];
            }
            else {
                return [71];
            }
        },


        /**
         *  小结算
         **/
        createEndOnePanel: function () {
            return new majiang_winGamePanel_qiChunHHMJ();
        }

    });


    /**
     *  Override
     *  是否显示癞子牌
     **/
    majiang_panel_qiChunHHMJ.prototype.isHunCardShow = function () {
        return true;
    };


    /**
     *  Override
     *  是否能添加癞子标识
     **/
    majiang_panel_qiChunHHMJ.prototype.isCanAddLaiZiIcon = function (cardTag) {
        var tData = MjClient.data.sData.tData;
        if(cardTag == this.getHunCard()){
            return true;
        }
        return false;
    };


    /**
     *  Override
     *  获得癞子标识
     **/
    majiang_panel_qiChunHHMJ.prototype.getLaiZiIcon2D = function (cardTag) {
        var laiZiNode = new ccui.ImageView();
        laiZiNode.setName("laiZi");

        var texturePath;
        if (cardTag == this.getHunCard()) {
            texturePath = "playing/huangShiHH/lai.png";
        } else if (this.getGuDingGang().indexOf(cardTag) >= 0) {
            texturePath = "playing/huangShiHH/gang.png";
        }
           
        laiZiNode.loadTexture(texturePath);
        return laiZiNode;
    };


    /**
     *  亮牌请求
     **/
    majiang_panel_qiChunHHMJ.prototype.sendLiangPaiToServer = function (selected) {
        if (MjClient.rePlayVideo !== -1){
            return;
        }
        var sendMsg = {
            cmd: "MJLiangPai",
            selected: selected
        };
        MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
    };


    /**
     *  开口提示
     **/
    majiang_panel_qiChunHHMJ.prototype.setKaiKouShow = function (node, dir) {
        node.visible = false;
        var atlas = node.getChildByName("atlas_num");
        atlas.ignoreContentAdaptWithSize(true);

        var setShow = function (player) {
            if (!player) return;
            var num = Math.floor(player.mjchi.length/3) + player.mjpeng.length + player.mjgang0.length;
            if (num > 0) {
                node.visible = true;
                atlas.setString(num + "");
            }
            else {
                node.visible = false;
            }
        };

        UIEventBind(null, atlas, "initSceneData", function(){
            var player = MjClient.playui.getPlayerInfoByName(dir);
            setShow(player);
        });

        UIEventBind(null, atlas, "roundEnd", function(){
            node.visible = false;
        });

        UIEventBind(null, atlas, "MJChi", function(){
            var player = MjClient.playui.getPlayerInfoByName(dir);
            setShow(player);
        });

        UIEventBind(null, atlas, "MJPeng", function(ed){
            var player = MjClient.playui.getPlayerInfoByName(dir);
            setShow(player);
        });

        UIEventBind(null, atlas, "MJGang", function(ed){
            var player = MjClient.playui.getPlayerInfoByName(dir);
            setShow(player);
        });
    };

    //Override
    majiang_panel_qiChunHHMJ.prototype.checkWhenTouchBegan = function(cardNode){
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        if (MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext < (MjClient.MaxPlayerNum + 10)){

            return true;//分张不能出牌
        }
        if(MjClient.movingCard !== null && MjClient.movingCard != cardNode){
            return true;
        }
        var handCount = this.getCardNodeCountByName(cardNode.getParent(), this.HandleCardType.Hand);
        if(!(handCount % 3 == 2 && this.isTurnMe() || handCount % 3 == 1 && !this.isTurnMe())){
            return true;
        }
        // 自动摸打
        var player = MjClient.playui.getPlayerInfoByName("node_down");
        if (player.tPutCard && this.isTurnMe()) {
            if (!MjClient.Scene.ToastNodeArray || MjClient.Scene.ToastNodeArray.length == 0) {
                MjClient.showToast("出牌请先取消自动摸打");
            }
            return true;
        }

        return false;
    };

}());



























