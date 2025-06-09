//崇阳麻将

var piaoTypeStr = ["不飘", "飘 1", "飘 2"];

var majiang_panel_chongYangMJ;
(function() {
    majiang_panel_chongYangMJ = majiang_panel_hubei.extend({

        getJsBind: function(){
            var jsBind = {
                node_down: {
                    layout_head: {
                        text_piao: {
                            _visible: false,
                            _run: function () {
                                this.ignoreContentAdaptWithSize(true);
                            },
                            _event: {
                                MJJiazhu: function (data) {
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (player && player.info.uid == data.uid) {
                                        this.visible = true;
                                        this.setString(piaoTypeStr[data.jiazhuNum]);
                                    }
                                },
                                initSceneData: function () {
                                    var tData = MjClient.data.sData.tData;
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (player && (MjClient.playui.isInGame() || tData.tState == TableState.waitJiazhu) && player.jiazhuNum >= 0) {
                                        this.visible = true;
                                        this.setString(piaoTypeStr[player.jiazhuNum]);
                                    }
                                },
                                roundEnd: function () {
                                    this.visible = false;
                                }
                            }
                        },
                        img_zhuang: {
                            _visible: false,
                            _event: {
                                waitJiazhu: function (data) {
                                    var tData = MjClient.data.sData.tData;
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (tData && player && tData.uids[data.zhuang] == player.info.uid) {
                                        this.visible = true;
                                    }
                                    else {
                                        this.visible = false;
                                    }
                                },
                                initSceneData: function () {
                                    var tData = MjClient.data.sData.tData;
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (tData && player && tData.zhuang != -1 && tData.uids[tData.zhuang] == player.info.uid) {
                                        this.visible = true;
                                    }
                                }
                            }
                        }
                    }
                },
                node_right: {
                    layout_head: {
                        text_piao: {
                            _visible: false,
                            _run: function () {
                                this.ignoreContentAdaptWithSize(true);
                            },
                            _event: {
                                MJJiazhu: function (data) {
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (player && player.info.uid == data.uid) {
                                        this.visible = true;
                                        this.setString(piaoTypeStr[data.jiazhuNum]);
                                    }
                                },
                                initSceneData: function () {
                                    var tData = MjClient.data.sData.tData;
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (player && (MjClient.playui.isInGame() || tData.tState == TableState.waitJiazhu) && player.jiazhuNum >= 0) {
                                        this.visible = true;
                                        this.setString(piaoTypeStr[player.jiazhuNum]);
                                    }
                                },
                                roundEnd: function () {
                                    this.visible = false;
                                }
                            }
                        },
                        img_zhuang: {
                            _visible: false,
                            _event: {
                                waitJiazhu: function (data) {
                                    var tData = MjClient.data.sData.tData;
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (tData && player && tData.uids[data.zhuang] == player.info.uid) {
                                        this.visible = true;
                                    }
                                    else {
                                        this.visible = false;
                                    }
                                },
                                initSceneData: function () {
                                    var tData = MjClient.data.sData.tData;
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (tData && player && tData.zhuang != -1 && tData.uids[tData.zhuang] == player.info.uid) {
                                        this.visible = true;
                                    }
                                }
                            }
                        }
                    }
                },
                node_top: {
                    layout_head: {
                        text_piao: {
                            _visible: false,
                            _run: function () {
                                this.ignoreContentAdaptWithSize(true);
                            },
                            _event: {
                                MJJiazhu: function (data) {
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (player && player.info.uid == data.uid) {
                                        this.visible = true;
                                        this.setString(piaoTypeStr[data.jiazhuNum]);
                                    }
                                },
                                initSceneData: function () {
                                    var tData = MjClient.data.sData.tData;
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (player && (MjClient.playui.isInGame() || tData.tState == TableState.waitJiazhu) && player.jiazhuNum >= 0) {
                                        this.visible = true;
                                        this.setString(piaoTypeStr[player.jiazhuNum]);
                                    }
                                },
                                roundEnd: function () {
                                    this.visible = false;
                                }
                            }
                        },
                        img_zhuang: {
                            _visible: false,
                            _event: {
                                waitJiazhu: function (data) {
                                    var tData = MjClient.data.sData.tData;
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (tData && player && tData.uids[data.zhuang] == player.info.uid) {
                                        this.visible = true;
                                    }
                                    else {
                                        this.visible = false;
                                    }
                                },
                                initSceneData: function () {
                                    var tData = MjClient.data.sData.tData;
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (tData && player && tData.zhuang != -1 && tData.uids[tData.zhuang] == player.info.uid) {
                                        this.visible = true;
                                    }
                                }
                            }
                        }
                    }
                },
                node_left: {
                    layout_head: {
                        text_piao: {
                            _visible: false,
                            _run: function () {
                                this.ignoreContentAdaptWithSize(true);
                            },
                            _event: {
                                MJJiazhu: function (data) {
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (player && player.info.uid == data.uid) {
                                        this.visible = true;
                                        this.setString(piaoTypeStr[data.jiazhuNum]);
                                    }
                                },
                                initSceneData: function () {
                                    var tData = MjClient.data.sData.tData;
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (player && (MjClient.playui.isInGame() || tData.tState == TableState.waitJiazhu) && player.jiazhuNum >= 0) {
                                        this.visible = true;
                                        this.setString(piaoTypeStr[player.jiazhuNum]);
                                    }
                                },
                                roundEnd: function () {
                                    this.visible = false;
                                }
                            }
                        },
                        img_zhuang: {
                            _visible: false,
                            _event: {
                                waitJiazhu: function (data) {
                                    var tData = MjClient.data.sData.tData;
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (tData && player && tData.uids[data.zhuang] == player.info.uid) {
                                        this.visible = true;
                                    }
                                    else {
                                        this.visible = false;
                                    }
                                },
                                initSceneData: function () {
                                    var tData = MjClient.data.sData.tData;
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (tData && player && tData.zhuang != -1 && tData.uids[tData.zhuang] == player.info.uid) {
                                        this.visible = true;
                                    }
                                }
                            }
                        }
                    }
                },
                node_selectPiao: {
                    _layout: [[0.22, 0.22], [0.5, 0.45], [0, 0]],
                    _visible: false,
                    btn_piao_0: {
                        _click: function () {
                            selectPiao(0);
                        },
                        _event: {
                            waitJiazhu: function (data) {
                                this.setEnabled(true);
                                var player = MjClient.playui.getPlayerInfoByOff();
                                var tData = MjClient.data.sData.tData;
                                if (tData.uids[data.zhuang] == player.info.uid) {
                                    this.setEnabled(false);
                                }
                            },
                            initSceneData: function () {
                                var player = MjClient.playui.getPlayerInfoByOff();
                                var tData = MjClient.data.sData.tData;
                                if (tData.uids[tData.zhuang] == player.info.uid) {
                                    this.setEnabled(false);
                                }
                            },
                        }
                    },
                    btn_piao_1: {
                        _click: function () {
                            selectPiao(1);
                        }
                    },
                    btn_piao_2: {
                        _click: function () {
                            selectPiao(2);
                        }
                    },
                    _event: {
                        waitJiazhu: function (data) {
                            this.visible = true;
                        },
                        initSceneData: function () {
                            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
                            var tData = MjClient.data.sData.tData;
                            if (tData.tState == TableState.waitJiazhu) {
                                if (player.mjState == TableState.waitJiazhu && player.jiazhuNum == -1) {
                                    this.visible = true;
                                }
                            }
                        },
                        MJJiazhu: function (data) {
                            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
                            if (player && player.info.uid == data.uid) {
                                this.visible = false;
                            }
                        }
                    }
                },
                layout_roundInfo3D: {
                    image_cardNumBg: {
                        text_cardNum: {
                            _event: {
                                waitJiazhu: function() {
                                    var num = MjClient.majiang.getAllCardsTotal();
                                    this.setString(num);
                                },
                            },
                        }
                    }
                },
                layout_roundInfo2D: {
                    img_cardNum: {
                        text_cardNum: {
                            _event: {
                                waitJiazhu: function() {
                                    var num = MjClient.majiang.getAllCardsTotal();
                                    this.setString(num);
                                },
                            },
                        }
                    }
                }
            };
            return jsBind;
        },

        ctor: function() {
            this._super(majiang_panel_chongYangMJ, "Play_majiang_chongYangMJ.json");
            return true;
        },


        /**
         *  小结算
         **/
        createEndOnePanel: function () {
            return new majiang_winGamePanel_chongYangMJ();
        },
    });

    
    var selectPiao = function (num) {
        MjClient.gamenet.request("pkroom.handler.tableMsg", {
            cmd: "MJJiazhu",
            jiazhuNum: num,
        });
    };


    /**
     *  Override
     *  获得癞子标识
     **/
    majiang_panel_chongYangMJ.prototype.getLaiZiIcon2D = function (cardTag) {
        var laiZiNode = new ccui.ImageView();
        laiZiNode.setName("laiZi");
        laiZiNode.loadTexture("playing/MJ/lai.png");
        return laiZiNode;
    };


}());



























