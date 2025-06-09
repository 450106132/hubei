/***
 * 新框架牌桌逻辑
 * @type {void | Class | *}
 */

var majiang_panel_yiChangXueLiu;
(function () {


    majiang_panel_yiChangXueLiu = majiang_panel_hubei.extend({
        jsonFile: "Play_majiang_yiChangXueLiu.json",
        _huanPaiUpNum: 0,
        _puPaiUpNum: 0,
        _huanPaiImageArray: [],
        _puPaiImageArray: [],
        getJsBind: function(){
            var jsBind = {
                _event:{
                    MJHuanPai: function (d) {
                        var selfUid = MjClient.playui.getSelfUid();
                        if(selfUid === d.uid) {
                            postEvent("hideHuanPai");
                            MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_down"));
                        }else{
                            MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_right"));
                            MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_top"));
                            MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_left"));
                        }
                        for (var i = 0; i < MjClient.playui.playerNodeArr.length; i++){
                            MjClient.playui.showHuanPaiAnim(MjClient.playui.playerNodeArr[i]);
                        }
                    },
                    MJHuanPaiFinish: function () {
                        MjClient.playui._huanPaiUpNum = 0;
                        MjClient.playui.updatePlayerEatBtn();
                        MjClient.playui.cleanHuanPaiImageArr();
                        MjClient.playui.playChangeCardsAnim(function () {
                            MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_down"));
                            MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_right"));
                            MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_top"));
                            MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_left"));
                        });
                    },
                    MJPuPai: function (d) {
                        var selfUid = MjClient.playui.getSelfUid();
                        if(selfUid === d.uid) {
                            postEvent("hidePuPai");
                            MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_down"));
                        }else{
                            MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_right"));
                            MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_top"));
                            MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_left"));
                        }
                    },
                    MJPuPaiFinish: function () {
                        MjClient.playui._puPaiUpNum = 0;
                        MjClient.playui.updatePlayerEatBtn();
                        MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_down"));
                        MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_right"));
                        MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_top"));
                        MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_left"));
                    },
                    changeMJBgEvent: function () {
                        MjClient.playui.cleanHuanPaiImageArr();
                        for (var i = 0; i < MjClient.playui.playerNodeArr.length; i++){
                            MjClient.playui.updatePlayerCards(MjClient.playui.playerNodeArr[i]);
                            MjClient.playui.showHuanPaiAnim(MjClient.playui.playerNodeArr[i]);
                        }
                        MjClient.playui.updateTingTips();
                    }
                },
                img_roomInfo2D: {
                    img_huanPaiBg:{
                        _layout:[[2, 2], [-0.4, 0.85], [0, 0], false, true],
                        _visible: false,
                        _event: {
                            MJHuanPaiFinish: function () {
                                MjClient.playui.setHuanPaiInfo(this);
                            },
                            initSceneData: function () {
                                var player = MjClient.playui.getPlayerInfoByOff();
                                if(player && player.huanBefore && player.huanBefore.length > 0) {
                                    MjClient.playui.setHuanPaiInfo(this);
                                }
                            },
                            roundEnd: function () {
                                this.visible = false;
                            }
                        },
                    }
                },
                img_roomInfo3D: {
                    img_huanPaiBg:{
                        _visible: false,
                        _event: {
                            MJHuanPaiFinish: function () {
                                MjClient.playui.setHuanPaiInfo(this);
                            },
                            initSceneData: function () {
                                var player = MjClient.playui.getPlayerInfoByOff();
                                if(player && player.huanBefore && player.huanBefore.length > 0) {
                                    MjClient.playui.setHuanPaiInfo(this);
                                }
                            },
                            roundEnd: function () {
                                this.visible = false;
                            }
                        },
                    }
                },
                node_down: {
                    _event:{
                        mjhand: function() {
                            var tData = MjClient.data.sData.tData;
                            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
                            player.isZiMo = false;
                            MjClient.playui.initGameData();
                            MjClient.playui.updatePlayerEatBtn();
                            MjClient.playui.updatePlayerCards(this);
                            MjClient.playui.searchAllTingCards();
                            postEvent(MjClient.playui.PlayEventType.SHOW_TING_CARDS);
                            // 只选择扑三张要进行特殊处理
                            if(!tData.areaSelectMode["huan3zhang"] && tData.areaSelectMode["pu3zhang"] && player.puCards && player.puCards.length === 0) {
                                MjClient.playui.sendWaitPuPaiToServer();
                            }
                        },
                        waitHuanPai: function () {
                            MjClient.playui._huanPaiUpNum = 0;
                            MjClient.movingCard = null;
                            MjClient.playui.hideEatNodeChildren();
                            // 将手牌触摸事件改为可以提起3张牌
                            MjClient.playui.updatePlayerCards(this);
                            // 提起系统推荐的手牌3张
                            MjClient.playui.raiseRecommendedHands(this);
                        },
                        waitPuPai: function () {
                            MjClient.playui._puPaiUpNum = 0;
                            MjClient.movingCard = null;
                            MjClient.playui.hideEatNodeChildren();
                            // 将手牌触摸事件改为可以提起3张牌
                            MjClient.playui.updatePlayerCards(this);
                        },
                        MJPuPaiFinish: function () {
                            MjClient.playui.checkHandCards(this);
                        },
                        MJHu: function (d) {
                            var player = MjClient.playui.getPlayerInfoByName("node_down");
                            var playerNode = MjClient.playui.getNodeByName("node_down");
                            MjClient.playui.updatePlayerEatBtn();
                            if(player && d.uid === player.info.uid) {
                                MjClient.playui.updatePlayerCards(playerNode);
                                MjClient.playui.updateCardColorAfterTing();
                                MjClient.playui.searchAllTingCards();
                                postEvent("showTingCards");
                            }
                        },
                        initSceneData: function () {
                            //一炮多响的倒牌
                            var tData = MjClient.data.sData.tData;
                            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
                            if (player.mjState !== TableState.roundFinish) {
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

                            if (MjClient.playui.checkIsWaitHuanPai()) {
                                MjClient.playui.updatePlayerCards(this);
                                if(player.huanBefore && player.huanBefore.length === 0) {
                                    MjClient.playui.raiseRecommendedHands(this);
                                }else{
                                    MjClient.playui.showHuanPaiAnim(this);
                                }
                            }

                            if(MjClient.playui.checkIsWaitPuPai()) {
                                MjClient.playui.updatePlayerCards(this);
                            }

                            if(!MjClient.playui.checkIsWaitHuanPai() && !MjClient.playui.checkIsWaitPuPai() && tData.areaSelectMode["pu3zhang"] && player.puCards && player.puCards.length === 0) {
                                MjClient.playui.sendWaitPuPaiToServer();
                            }
                        },
                        switch2Dor3D: function(){
                            if(!MjClient.playui.isInGame()){
                                return;
                            }
                            MjClient.playui.updata2DTo3DData();
                            MjClient.playui.updatePlayerCards(this);
                            MjClient.playui.updateCardColorAfterTing();
                            MjClient.playui.updateTingTips();
                            MjClient.playui.cleanHuanPaiImageArr();
                            MjClient.playui.showHuanPaiAnim(this);
                        },
                        MJPut: function(data) {
                            MjClient.playui.clickGangPass = false;
                            MjClient.playui.clickTingPass = false;
                            MjClient.playui.clickTing = false;
                            MjClient.playui.dealPut(this, data);
                            if(data.uid === MjClient.playui.getSelfUid()){
                                MjClient.playui.checkHandCards(this);
                                MjClient.playui.checkPutCards(this);
                                MjClient.playui.updateTingTips();
                                var player = MjClient.playui.getPlayerInfoByOff();
                                if(player && player.huanAfter.length > 0) {
                                    player.huanAfter = [];
                                    MjClient.playui.updatePlayerCards(this);
                                }
                            }
                        },
                    },
                    huazhu: {
                        _visible: false,
                        _layout:[[0.1, 0.1], [0.07, 0.23], [0, 0]],
                        _index: 1000,
                        _event: {
                            initSceneData: function () {
                                this.visible = MjClient.majiang.isHuaZhu();
                            },
                            mjhand: function () {
                                this.visible = MjClient.majiang.isHuaZhu();
                            },
                            MJPut: function () {
                                this.visible = MjClient.majiang.isHuaZhu();
                            },
                            newCard: function () {
                                this.visible = MjClient.majiang.isHuaZhu();
                            },
                            MJHuanPai: function () {
                                this.visible = MjClient.majiang.isHuaZhu();
                            },
                            MJHuanPaiFinish: function () {
                                this.visible = MjClient.majiang.isHuaZhu();
                            },
                            MJPuPai: function () {
                                this.visible = MjClient.majiang.isHuaZhu();
                            },
                            MJPuPaiFinish: function () {
                                this.visible = MjClient.majiang.isHuaZhu();
                            },
                            roundEnd: function () {
                                this.visible = false;
                            },
                        }
                    },
                    img_huanPaiTip: {
                        _layout:[[0.35, 0.35], [0.5, 0.34], [0, 0]],
                        _visible: false,
                        _event: {
                            hideHuanPai: function () {
                                this.visible = false;
                            },
                            waitHuanPai: function () {
                                this.visible = true;
                            },
                            initSceneData: function () {
                                var player = MjClient.playui.getPlayerInfoByOff();
                                if(player.huanBefore && player.huanBefore.length === 0) {
                                    this.visible = MjClient.playui.checkIsWaitHuanPai();
                                }
                            },
                        },
                        btnOK: {
                            _click: function (btnOk) {
                                var upCardArr = MjClient.playui.getHuanPaiAndPuPaiArr();
                                var playerNode = MjClient.playui.getNodeByOff();
                                var player = MjClient.playui.getPlayerInfoByOff();
                                if(upCardArr.length === 3 && MjClient.majiang.isSameColorCard(upCardArr)) {
                                    MjClient.playui.sendHuanPaiToServer(player.uid, upCardArr);
                                    MjClient.playui.updatePlayerCards(playerNode);
                                    btnOk.parent.visible = false;
                                }
                                else {
                                    MjClient.showToast("请选择3张同花牌");
                                }
                            }
                        }
                    },
                    panel_puPai: {
                        _layout:[[0.7, 0.7], [0.5, 0.34], [0, 0]],
                        _visible: false,
                        _event: {
                            hidePuPai: function () {
                                this.visible = false;
                            },
                            waitPuPai: function () {
                                this.visible = true;
                            },
                            initSceneData: function () {
                                var player = MjClient.playui.getPlayerInfoByOff();
                                if(player.puCards && player.puCards.length === 0) {
                                    this.visible = MjClient.playui.checkIsWaitPuPai();
                                }
                            },
                        },
                        btnNO: {
                            _click: function (btnNO) {
                                var player = MjClient.playui.getPlayerInfoByOff();
                                btnNO.parent.visible = false;
                                MjClient.playui.sendPuPaiToServer(player.info.uid, [-1]);
                            }
                        },
                        btnOK: {
                            _click: function (btnOK) {
                                var upCardArr = MjClient.playui.getHuanPaiAndPuPaiArr();
                                var player = MjClient.playui.getPlayerInfoByOff();
                                if(upCardArr.length === 3){
                                    btnOK.parent.visible = false;
                                    MjClient.playui.sendPuPaiToServer(player.info.uid, upCardArr);
                                }else{
                                    MjClient.showToast("请选择3张进行扑牌");
                                }
                            }
                        },
                    },
                    layout_head: {
                        atlas_score: {
                            _event: {
                                MJHu: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if(player){
                                        changeAtalsForLabel(this, player.winall);
                                    }
                                }
                            }
                        },
                        img_puPaiZhong: {
                            _visible: false,
                            _event: {
                                waitPuPai: function () {
                                    this.visible = true;
                                },
                                MJPuPai: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    this.visible = (MjClient.playui.checkIsWaitPuPai() && player && player.puCards && player.puCards.length === 0);
                                },
                                initSceneData: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    this.visible = (MjClient.playui.checkIsWaitPuPai() && player && player.puCards && player.puCards.length === 0);
                                }
                            }
                        },
                        img_huanPaiZhong: {
                            _visible: false,
                            _event: {
                                waitHuanPai: function () {
                                    this.visible = true;
                                },
                                MJHuanPai: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    this.visible = (MjClient.playui.checkIsWaitHuanPai() && player && player.huanBefore && player.huanBefore.length === 0);
                                },
                                initSceneData: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    this.visible = (MjClient.playui.checkIsWaitHuanPai() && player && player.huanBefore && player.huanBefore.length === 0);
                                }
                            }
                        }
                    },
                    img_score: {
                        _visible: false,
                        _layout: [[0.25, 0.25], [0.5, 0.33], [0, 0]],
                        _index: 1000,
                        _event: {
                            MJHu: function () {
                                MjClient.playui.showHuScore("node_down", this);
                            }
                        }
                    },
                    panel_cha: {
                        _visible: false,
                        _layout: [[0.25, 0.25], [0.5, 0.32], [0, 0]],
                        _index: 1000,
                        _event: {
                            showChaPanel: function () {
                                var player = MjClient.playui.getPlayerInfoByName("node_down");
                                MjClient.playui.showChaHuaZhuAndChaJiao(this, player);
                            }
                        },
                    },
                },
                node_right: {
                    _event: {
                        initSceneData: function () {
                            MjClient.playui.updatePlayerCards(this);
                            MjClient.playui.showHuanPaiAnim(this);
                        },
                        switch2Dor3D: function(){
                            if(!MjClient.playui.isInGame()){
                                return;
                            }
                            MjClient.playui.updatePlayerCards(this);
                            MjClient.playui.showHuanPaiAnim(this);
                        },
                        MJHu: function (d) {
                            var player = MjClient.playui.getPlayerInfoByName("node_right");
                            var playerNode = MjClient.playui.getNodeByName("node_right");
                            if(player && d.uid === player.info.uid) {
                                MjClient.playui.updatePlayerCards(playerNode);
                            }
                        },
                    },
                    layout_head: {
                        atlas_score: {
                            _event: {
                                MJHu: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if(player){
                                        changeAtalsForLabel(this, player.winall);
                                    }
                                }
                            }
                        },
                        img_puPaiZhong: {
                            _visible: false,
                            _event: {
                                waitPuPai: function () {
                                    this.visible = true;
                                },
                                MJPuPai: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    this.visible = (MjClient.playui.checkIsWaitPuPai() && player && player.puCards && player.puCards.length === 0);
                                },
                                initSceneData: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    this.visible = (MjClient.playui.checkIsWaitPuPai() && player && player.puCards && player.puCards.length === 0);
                                }
                            }
                        },
                        img_huanPaiZhong: {
                            _visible: false,
                            _event: {
                                waitHuanPai: function () {
                                    this.visible = true;
                                },
                                MJHuanPai: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    this.visible = (MjClient.playui.checkIsWaitHuanPai() && player && player.huanBefore && player.huanBefore.length === 0);
                                },
                                initSceneData: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    this.visible = (MjClient.playui.checkIsWaitHuanPai() && player && player.huanBefore && player.huanBefore.length === 0);
                                }
                            }
                        }
                    },
                    img_score: {
                        _visible: false,
                        _layout: [[0.25, 0.25], [0.7, 0.55], [0, 0]],
                        _index: 1000,
                        _event: {
                            MJHu: function () {
                                MjClient.playui.showHuScore("node_right", this);
                            }
                        }
                    },
                    panel_cha: {
                        _visible: false,
                        _layout: [[0.25, 0.25], [0.75, 0.55], [0, 0]],
                        _index: 1000,
                        _event: {
                            showChaPanel: function () {
                                var player = MjClient.playui.getPlayerInfoByName("node_right");
                                MjClient.playui.showChaHuaZhuAndChaJiao(this, player);
                            }
                        },
                    },
                },
                node_top: {
                    _event: {
                        initSceneData: function () {
                            MjClient.playui.updatePlayerCards(this);
                            MjClient.playui.showHuanPaiAnim(this);
                        },
                        switch2Dor3D: function(){
                            if(!MjClient.playui.isInGame()){
                                return;
                            }
                            MjClient.playui.updatePlayerCards(this);
                            MjClient.playui.showHuanPaiAnim(this);
                        },
                        MJHu: function (d) {
                            var player = MjClient.playui.getPlayerInfoByName("node_top");
                            var playerNode = MjClient.playui.getNodeByName("node_top");
                            if(player && d.uid === player.info.uid) {
                                MjClient.playui.updatePlayerCards(playerNode);
                            }
                        },
                    },
                    layout_head: {
                        atlas_score: {
                            _event: {
                                MJHu: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if(player){
                                        changeAtalsForLabel(this, player.winall);
                                    }
                                }
                            }
                        },
                        img_puPaiZhong: {
                            _visible: false,
                            _event: {
                                waitPuPai: function () {
                                    this.visible = true;
                                },
                                MJPuPai: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    this.visible = (MjClient.playui.checkIsWaitPuPai() && player && player.puCards && player.puCards.length === 0);
                                },
                                initSceneData: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    this.visible = (MjClient.playui.checkIsWaitPuPai() && player && player.puCards && player.puCards.length === 0);
                                }
                            }
                        },
                        img_huanPaiZhong: {
                            _visible: false,
                            _event: {
                                waitHuanPai: function () {
                                    this.visible = true;
                                },
                                MJHuanPai: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    this.visible = (MjClient.playui.checkIsWaitHuanPai() && player && player.huanBefore && player.huanBefore.length === 0);
                                },
                                initSceneData: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    this.visible = (MjClient.playui.checkIsWaitHuanPai() && player && player.huanBefore && player.huanBefore.length === 0);
                                }
                            }
                        }
                    },
                    img_score: {
                        _visible: false,
                        _layout: [[0.25, 0.25], [0.5, 0.8], [0, 0]],
                        _index: 1000,
                        _event: {
                            MJHu: function () {
                                MjClient.playui.showHuScore("node_top", this);
                            }
                        }
                    },
                    panel_cha: {
                        _visible: false,
                        _layout: [[0.25, 0.25], [0.5, 0.8], [0, 0]],
                        _index: 1000,
                        _event: {
                            showChaPanel: function () {
                                var player = MjClient.playui.getPlayerInfoByName("node_top");
                                MjClient.playui.showChaHuaZhuAndChaJiao(this, player);
                            }
                        },
                    },
                },
                node_left: {
                    _event: {
                        initSceneData: function () {
                            MjClient.playui.updatePlayerCards(this);
                            MjClient.playui.showHuanPaiAnim(this);
                        },
                        switch2Dor3D: function(){
                            if(!MjClient.playui.isInGame()){
                                return;
                            }
                            MjClient.playui.updatePlayerCards(this);
                            MjClient.playui.showHuanPaiAnim(this);
                        },
                        MJHu: function (d) {
                            var player = MjClient.playui.getPlayerInfoByName("node_left");
                            var playerNode = MjClient.playui.getNodeByName("node_left");
                            if(player && d.uid === player.info.uid) {
                                MjClient.playui.updatePlayerCards(playerNode);
                            }
                        },
                    },
                    layout_head: {
                        atlas_score: {
                            _event: {
                                MJHu: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if(player){
                                        changeAtalsForLabel(this, player.winall);
                                    }
                                }
                            }
                        },
                        img_puPaiZhong: {
                            _visible: false,
                            _event: {
                                waitPuPai: function () {
                                    this.visible = true;
                                },
                                MJPuPai: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    this.visible = (MjClient.playui.checkIsWaitPuPai() && player && player.puCards && player.puCards.length === 0);
                                },
                                initSceneData: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    this.visible = (MjClient.playui.checkIsWaitPuPai() && player && player.puCards && player.puCards.length === 0);
                                }
                            }
                        },
                        img_huanPaiZhong: {
                            _visible: false,
                            _event: {
                                waitHuanPai: function () {
                                    this.visible = true;
                                },
                                MJHuanPai: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    this.visible = (MjClient.playui.checkIsWaitHuanPai() && player && player.huanBefore && player.huanBefore.length === 0);
                                },
                                initSceneData: function () {
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    this.visible = (MjClient.playui.checkIsWaitHuanPai() && player && player.huanBefore && player.huanBefore.length === 0);
                                }
                            }
                        }
                    },
                    img_score: {
                        _visible: false,
                        _layout: [[0.25, 0.25], [0.3, 0.55], [0, 0]],
                        _index: 1000,
                        _event: {
                            MJHu: function () {
                                MjClient.playui.showHuScore("node_left", this);
                            }
                        }
                    },
                    panel_cha: {
                        _visible: false,
                        _layout: [[0.25, 0.25], [0.25, 0.55], [0, 0]],
                        _index: 1000,
                        _event: {
                            showChaPanel: function () {
                                var player = MjClient.playui.getPlayerInfoByName("node_left");
                                MjClient.playui.showChaHuaZhuAndChaJiao(this, player);
                            }
                        },
                    },
                },
                img_gameover: {
                    _visible: false,
                    _layout: [[0.5, 0.5], [0.5, 0.55], [0, 0]],
                    _event: {
                        showGameOveImage: function () {
                            this.setVisible(true);
                            this.runAction(cc.sequence(
                                cc.scaleTo(0.3, 2),
                                cc.scaleTo(0.3, 1).easing(cc.easeElasticOut(1)),
                                cc.fadeOut(0.2)
                            ))
                        }
                    }

                }
            };
            return jsBind;
        },

        ctor: function(){
            this._super(majiang_panel_yiChangXueLiu, this.jsonFile);
            return true;
        },

        // override 是否开启显示最多听牌标识
        isShowMaxTingCards: function(){
            return true;
        },

        createEndOnePanel: function(){
            return new majiang_winGamePanel_yiChangXueLiu();
        },

        initCardTypeName: function(){
            this._super();
            this.HandleCardType["PuCard"] = "puCard";
            this.HandleCardType["HuCard"] = "huCard";
        },

        isInGame: function () {
            var tData = MjClient.data.sData.tData;
            if (!tData){
                return false;
            }
            return tData.tState === TableState.waitPut ||
                tData.tState === TableState.waitEat ||
                tData.tState === TableState.waitCard ||
                tData.tState === TableState.waitHuanPai ||
                tData.tState === TableState.waitPuPai;
        },

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
                tData.tState === TableState.waitHuanPai ||
                tData.tState === TableState.waitPuPai;
        },

        checkIsWaitHuanPai: function () {
            var tData = MjClient.data.sData.tData;
            return tData.tState === TableState.waitHuanPai;
        },

        checkIsWaitPuPai: function () {
            var tData = MjClient.data.sData.tData;
            return tData.tState === TableState.waitPuPai;
        },

        isCanPlayNewCardAction: function () {
            var player = MjClient.playui.getPlayerInfoByOff();
            return player.mjput.length !== 0;
        },

        isNeedShowHuCardImage: function () {
            return false;
        },

        showChaHuaZhuAndChaJiao: function (chaPanel, player) {
            var tData = MjClient.data.sData.tData;
            if(!tData ||!player) return;
            var chaHuazhuData = tData.chaHuazhuData;
            var chaDajiaoData = tData.chaDajiaoData;
            var uid = player.info.uid;
            var scale = chaPanel.getScale();
            var dibanHuaZhu = chaPanel.getChildByName("dibanHuaZhu");
            var dibanChaJiao = chaPanel.getChildByName("dibanChaJiao");
            var originUrl = "playing/yiChangXueLiuMaJiang/";
            dibanHuaZhu.setVisible(false);
            if(chaHuazhuData.length > 0) {
                cc.log("Tom ------------------   chaHuazhuData   --------------" + JSON.stringify(chaHuazhuData))
                this.reallyPlayEffect("sound/huazhu.mp3", false);
                var imageHuaZhu = dibanHuaZhu.getChildByName("imageHuaZhu");
                var scoreHuaZhu = dibanHuaZhu.getChildByName("scoreHuaZhu");
                for(var i = 0; i < chaHuazhuData.length; i ++) {
                    var huazhuData = chaHuazhuData[i];
                    if(huazhuData.uid === uid) {
                        dibanHuaZhu.setVisible(true);
                        dibanHuaZhu.loadTexture(Number(huazhuData.score) > 0 ? originUrl + "diban_win" : originUrl + "diban_lose");

                        imageHuaZhu.loadTexture(originUrl + huazhuData.str);
                        imageHuaZhu.ignoreContentAdaptWithSize(true);

                        scoreHuaZhu.ignoreContentAdaptWithSize(true);
                        scoreHuaZhu.setString(Number(huazhuData.score) > 0 ? "+" + huazhuData.score : huazhuData.score);
                        if(Number(huazhuData.score) > 0) {
                            scoreHuaZhu.getVirtualRenderer().setCharMap("playing/yiChangXueLiuMaJiang/num1.png", 30, 39, "+".charCodeAt());
                        }else{
                            scoreHuaZhu.getVirtualRenderer().setCharMap("playing/yiChangXueLiuMaJiang/num0.png", 30, 39, "+".charCodeAt());
                        }
                    }
                }
            }

            dibanChaJiao.setVisible(false);
            if(chaDajiaoData.length > 0) {
                cc.log("Tom ------------------   chaDajiaoData   --------------" + JSON.stringify(chaDajiaoData))
                var imageChaJiao = dibanChaJiao.getChildByName("imageChaJiao");
                var scoreChaJiao = dibanChaJiao.getChildByName("scoreChaJiao");
                for(var i = 0; i < chaDajiaoData.length; i ++) {
                    var chajiaoData = chaDajiaoData[i];
                    if(chajiaoData.uid === uid) {
                        dibanChaJiao.setVisible(true);
                        dibanChaJiao.loadTexture(Number(chajiaoData.score) > 0 ? originUrl + "diban_win" : originUrl + "diban_lose");

                        imageChaJiao.loadTexture(originUrl + chajiaoData.str);
                        imageChaJiao.ignoreContentAdaptWithSize(true);

                        scoreChaJiao.ignoreContentAdaptWithSize(true);
                        scoreChaJiao.setString(Number(chajiaoData.score) > 0 ? "+" + chajiaoData.score : chajiaoData.score);
                        if(Number(chajiaoData.score) > 0) {
                            scoreChaJiao.getVirtualRenderer().setCharMap("playing/yiChangXueLiuMaJiang/num1.png", 30, 39, "+".charCodeAt());
                        }else{
                            scoreChaJiao.getVirtualRenderer().setCharMap("playing/yiChangXueLiuMaJiang/num0.png", 30, 39, "+".charCodeAt());
                        }
                    }
                }
            }

            if(chaHuazhuData.length > 0 || chaDajiaoData.length > 0){
                chaPanel.setVisible(true);
                chaPanel.setScale(0);
                chaPanel.runAction(cc.sequence(
                    cc.scaleTo(0.3, scale * 1.2).easing(cc.easeBackOut()),
                    cc.delayTime(1),
                    cc.scaleTo(0.3, 0)
                ))
            }
        },

        showHuScore: function (nodeName, imageNode) {
            var player = MjClient.playui.getPlayerInfoByName(nodeName);
            if(!player) return;
            var imageHu = imageNode.getChildByName("imageHu");
            var lableNode = imageNode.getChildByName("scoreHu");
            var scale = imageNode.getScale();

            if(player.huWord && jsb.fileUtils.isFileExist("cardType/" + player.huWord + ".png")) {
                imageHu.loadTexture("cardType/" + player.huWord + ".png");
                imageHu.ignoreContentAdaptWithSize(true);
            }

            if(player.huScore && Number(player.huScore) !== 0){
                var huScore = player.huScore;
                if(huScore > 0) {
                    imageHu.setVisible(true);
                    imageNode.loadTexture("playing/yiChangXueLiuMaJiang/diban_win.png");
                    lableNode.setPositionPercent({x: 0.72, y: 0.55});
                    lableNode.getVirtualRenderer().setCharMap("playing/yiChangXueLiuMaJiang/num1.png", 30, 39, "+".charCodeAt());
                }else{
                    imageHu.setVisible(false);
                    imageNode.loadTexture("playing/yiChangXueLiuMaJiang/diban_lose.png");
                    lableNode.setPositionPercent({x: 0.5, y: 0.55});
                    lableNode.getVirtualRenderer().setCharMap("playing/yiChangXueLiuMaJiang/num0.png", 30, 39, "+".charCodeAt());
                }

                lableNode.ignoreContentAdaptWithSize(true);
                lableNode.setString(player.huScore > 0 ? ("+" + player.huScore) : player.huScore);

                imageNode.setVisible(true);
                imageNode.setScale(0);
                imageNode.runAction(cc.sequence(
                    cc.scaleTo(0.3, scale * 1.2).easing(cc.easeBackOut()),
                    cc.delayTime(1),
                    cc.scaleTo(0.3, 0)
                ))
            }
        },

        playChangeCardsAnim: function(callback){
            var tData = MjClient.data.sData.tData;
            var huanType = tData["huanType"];
            var player = MjClient.playui.getPlayerInfoByOff();
            var mjType = MjClient.playui.getMaJiangBgType();
            var folderName = MjClient.playui.is3DStyle() ? "3D" : ("2D_" + mjType);
            var prop = (1280/720) / (cc.winSize.width/cc.winSize.height);
            var scale = MjClient.playui.is3DStyle() ? 0.75 * prop: 0.60 * prop;
            var oo = {
                3:{
                    Json: "spine/huanpai/" + folderName + "/sanren.json",
                    Atlas: "spine/huanpai/" + folderName + "/sanren.atlas"
                },
                4:{
                    Json: "spine/huanpai/" + folderName + "/siren.json",
                    Atlas: "spine/huanpai/" + folderName + "/siren.atlas"
                }
            };
            if(MjClient.playui.isIPad()) scale *= 0.5;

            var jsonFile = oo[tData.maxPlayer].Json;
            var atlasFile = oo[tData.maxPlayer].Atlas;

            var changeCardsSpine = createSpine(jsonFile, atlasFile);
            this.addChild(changeCardsSpine);
            changeCardsSpine.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.55);
            // changeCardsSpine.setTimeScale(0.1);
            changeCardsSpine.setScale(scale);
            changeCardsSpine.runAction(cc.sequence(
                cc.callFunc(function () {
                    changeCardsSpine.setAnimation(0, huanType, false);
                }),
                cc.delayTime(1.3),
                cc.callFunc(function () {
                    callback();
                }),
                cc.callFunc(function () {
                    if(!MjClient.playui.checkIsWaitHuanPai() && tData.areaSelectMode["pu3zhang"] && player.puCards && player.puCards.length === 0) {
                        MjClient.playui.sendWaitPuPaiToServer();
                    }
                }),
                cc.removeSelf()
            ))
        },

        getHuanPaiAndPuPaiArr: function () {
            var res = [];
            var playerNode = this.getNodeByOff();
            var children = playerNode.children;
            var handCard = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
            for(var k = 0; k < children.length; k++) {
                var cardNode = children[k];
                if(cardNode.name === this.HandleCardType.Hand && cardNode.y > handCard.getPositionY()) {
                    res.push(cardNode.tag);
                }
            }
            return res;
        },

        handlerWhenCardTouchBegan: function (selectCard) {
            postEvent(this.PlayEventType.SELECT_HAND_CARD, selectCard);
            //还原之前选中牌的位置
            var downNode = this.getNodeByOff();
            var handCard = downNode.getChildByName(this.CsdDefaultCardType.HandCard);
            var icCanPro = MjClient.selectedCard && cc.sys.isObjectValid(MjClient.selectedCard) && MjClient.selectedCard !== selectCard;
            if(this.checkIsWaitHuanPai()) {
                if(this._huanPaiUpNum === 3 && icCanPro && selectCard.y === handCard.getPositionY()) {
                    MjClient.selectedCard.setPositionY(handCard.getPositionY());
                    this._huanPaiUpNum --;
                }
            }else if(this.checkIsWaitPuPai()){
                if(this._puPaiUpNum === 3 && icCanPro && selectCard.y === handCard.getPositionY()) {
                    MjClient.selectedCard.setPositionY(handCard.getPositionY());
                    this._puPaiUpNum --;
                }
            }else {
                if(icCanPro) {
                    MjClient.selectedCard.setPositionY(handCard.getPositionY());
                }
            }
        },

        recoverUpCardForHuanPaiAndPuPai: function () {
            var downNode = this.getNodeByOff();
            var handCard = downNode.getChildByName(this.CsdDefaultCardType.HandCard);
            if(this.checkIsWaitHuanPai()) {
                if(MjClient.selectedCard && cc.sys.isObjectValid(MjClient.selectedCard)) {
                    MjClient.selectedCard.setPositionY(handCard.getPositionY());
                    this._huanPaiUpNum --;
                }
            }
            if(this.checkIsWaitPuPai()) {
                if(MjClient.selectedCard && cc.sys.isObjectValid(MjClient.selectedCard)) {
                    MjClient.selectedCard.setPositionY(handCard.getPositionY());
                    this._puPaiUpNum --;
                }
            }
        },

        checkWhenTouchBegan: function (cardNode){
            var player = MjClient.playui.getPlayerInfoByOff();
            // 换牌前
            if(this.checkIsWaitHuanPai() && player.huanBefore && player.huanBefore.length > 0) return true;
            // 扑牌前
            if(this.checkIsWaitPuPai() && player.puCards && player.puCards.length > 0) return true;
            if(this.checkIsWaitHuanPai() || this.checkIsWaitPuPai()) {
                return false;
            }
            return this._super(cardNode);
        },

        setTouchCardHandler: function (templateHandCard, handCard) {
            var self = this;

            handCard.addTouchEventListener(function(cardNode, eventType){
                if(MjClient.playui.checkWhenTouchBegan(cardNode)){
                    return;
                }
                if(eventType === ccui.Widget.TOUCH_BEGAN){
                    self.handlerWhenCardTouchBegan(cardNode);
                    self.playEffect("cardClick");
                    MjClient.movingCard = cardNode;
                    MjClient.selectedCard = cardNode;
                    self.cardBeginPos = cardNode.getPosition();
                    self.cardBeginScale = cardNode.getScale();
                    self.cardBeginZIndex = cardNode.zIndex;
                    self.cardIsPut = true;
                    self.cardValidMoved = false;
                    handCard.zIndex = self.cardBeginZIndex + 100;
                }else if(eventType === ccui.Widget.TOUCH_MOVED){
                    if (MjClient.movingCard == null || !self.isTurnMe()){
                        return;
                    }

                    var movePos = cardNode.getTouchMovePosition();
                    movePos.x = movePos.x < 0 ? 0 : movePos.x > MjClient.size.width ? MjClient.size.width : movePos.x;
                    movePos.y = movePos.y < 0 ? 0 : movePos.y > MjClient.size.height ? MjClient.size.height : movePos.y;
                    var dis_y = movePos.y - self.cardBeginPos.y;

                    if(!self.cardValidMoved && dis_y < templateHandCard.height / 2){
                        cardNode.setPosition(self.cardBeginPos);
                    }else{
                        self.cardIsPut = true;
                        self.cardValidMoved = true;
                        cardNode.setPosition(movePos);
                        cardNode.scale = self.cardBeginScale;

                        if(dis_y < templateHandCard.height / 2){
                            self.cardIsPut = false;
                        }
                    }
                }
                else if(eventType === ccui.Widget.TOUCH_ENDED || eventType === ccui.Widget.TOUCH_CANCELED){
                    self.cardValidMoved = false;
                    if (MjClient.movingCard == null || !cc.sys.isObjectValid(MjClient.movingCard)){
                        return;
                    }

                    if(self.checkIsWaitHuanPai() || self.checkIsWaitPuPai()){

                    }else{
                        if(!self.isTurnMe()) {
                            MjClient.movingCard = null;
                            self.updateColoeAfterSelectCard();
                            return;
                        }
                    }
                    cardNode.scale = self.cardBeginScale;
                    cardNode.zIndex  = self.cardBeginZIndex;
                    var dis_endY = Math.round(cardNode.y - templateHandCard.y);
                    //点击杠按钮，命令没回来之前不能点击牌(self.hasClickBtn防止按钮和牌的多点触控导致的多牌)
                    if(!self.cardIsPut || dis_endY < 20 || self.hasClickBtn){
                        MjClient.movingCard = null;
                        cardNode.setPosition(self.cardBeginPos);
                        cardNode.y = templateHandCard.y + 20;
                        if(self.checkIsWaitHuanPai()) {
                            self._huanPaiUpNum ++;
                        }
                        if(self.checkIsWaitPuPai()) {
                            self._puPaiUpNum ++;
                        }
                        return;
                    }
                    self.recoverUpCardForHuanPaiAndPuPai(cardNode);
                    self.handlerWhenCardTouchEnded(cardNode, cardNode.tag);
                }
            }, handCard);
        },

        raiseRecommendedHands: function (downNode) {
            var player = this.getPlayerInfoByOff();
            var card = MjClient.majiang.getRecommendHuanPaiArr(player.mjhand);
            var handModelCard = downNode.getChildByName(this.CsdDefaultCardType.HandCard);
            var children = downNode.children;
            for(var i = 0; i < children.length; i ++) {
                var cardNode = children[i];
                if(cardNode.name === this.HandleCardType.Hand && card.indexOf(cardNode.tag) > -1 && this._huanPaiUpNum < 3) {
                    cardNode.y = handModelCard.y + 20;
                    MjClient.selectedCard = cardNode;
                    this._huanPaiUpNum ++;
                }
            }
        },

        showHuanPaiAnim: function (node) {
            var player = MjClient.playui.getPlayerInfoByName(node.getName());
            if(!this.checkIsWaitHuanPai()) return;
            if(!player || !player.huanBefore || player.huanBefore.length === 0) return;
            var is3D = MjClient.playui.is3DStyle();
            var mjType = MjClient.playui.getMaJiangBgType();
            var huanPaiImageUrl = "", scale = 1;
            var prop = (1280/720) / (cc.winSize.width / cc.winSize.height);
            if(is3D) {
                scale = 0.70 * prop;
                huanPaiImageUrl = "playing/yiChangXueLiuMaJiang/huanPai3D/";
            }else{
                scale = 0.55 * prop;
                huanPaiImageUrl = "playing/yiChangXueLiuMaJiang/huanPai2D_" + mjType + "/";
            }
            if(MjClient.playui.isIPad()) scale *= 0.5;
            var huanPaiImage = ccui.ImageView(huanPaiImageUrl + node.getName() + ".png");
            huanPaiImage.setPosition(node.getChildByName("node_animation").getPosition());
            huanPaiImage.setScale(scale);
            node.addChild(huanPaiImage);
            this._huanPaiImageArray.push(huanPaiImage);
        },

        cleanHuanPaiImageArr: function () {
            var imageArr = this._huanPaiImageArray;
            if(imageArr.length === 0) return;
            for(var i = 0; i < imageArr.length; i ++) {
                if(imageArr[i] && cc.sys.isObjectValid(imageArr[i]))
                    imageArr[i].removeFromParent();
            }
            this._huanPaiImageArray = [];
        },

        setHuanPaiInfo: function (node) {
            if(!this.isInGame()) return;

            node.visible = true;
            var oo = {
                "shunshizhen": "playing/yiChangXueLiuMaJiang/sszhh.png",
                "nishizhen": "playing/yiChangXueLiuMaJiang/nszhh.png",
                "duijia"  : "playing/yiChangXueLiuMaJiang/djh.png",
            };

            var tData = MjClient.data.sData.tData;
            var imgDir = node.getChildByName("img_dir");
            imgDir.loadTexture(oo[tData["huanType"]]);

            var player = MjClient.playui.getPlayerInfoByOff();
            var huanBeforeArr = player.huanBefore;
            var card0 = node.getChildByName("img_huanCard0");
            var card1 = node.getChildByName("img_huanCard1");
            var card2 = node.getChildByName("img_huanCard2");
            MjClient.playui.setCardSprite3D(card0, huanBeforeArr[0]);
            MjClient.playui.setCardSprite3D(card1, huanBeforeArr[1]);
            MjClient.playui.setCardSprite3D(card2, huanBeforeArr[2]);
        },

        handleRoundEnd: function () {
            if(MjClient.playui.isInGame()) return;
            var self = this;
            var tData = MjClient.data.sData.tData;
            var delayTime = (tData.isChaDaJiao || tData.isChaHuaZhu) ? 5 : 0;
            self.runAction(cc.sequence(
                cc.delayTime(0.01),
                cc.callFunc(function () { postEvent("showGameOveImage")}),
                cc.delayTime(1),
                cc.callFunc(function () { postEvent("showChaPanel")}),
                cc.delayTime(delayTime),
                cc.callFunc(function () {self.showMjhandBeforeEndOne()}),
                cc.delayTime(0.8),
                cc.callFunc(function () {self.showBalanceLayer()})
            ));
        }
    });

    majiang_panel_yiChangXueLiu.prototype.sendWaitPuPaiToServer = function () {
        if (MjClient.rePlayVideo !== -1){
            return;
        }
        var sendMsg = {
            cmd: "waitPuPai",
        };
        MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
    };


    majiang_panel_yiChangXueLiu.prototype.sendHuanPaiToServer = function (uid, arr) {
        if (MjClient.rePlayVideo !== -1){
            return;
        }
        var sendMsg = {
            cmd: "MJHuanPai",
            uid: uid,
            arr: arr,
        };

        cc.log("Tom ----------------   sendHuanPaiToServer  ===== " + JSON.stringify(sendMsg))
        MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
    };


    majiang_panel_yiChangXueLiu.prototype.sendPuPaiToServer = function (uid, arr) {
        if (MjClient.rePlayVideo !== -1){
            return;
        }
        var sendMsg = {
            cmd: "MJPuPai",
            uid: uid,
            arr: arr,
        };
        MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
    };

}());


