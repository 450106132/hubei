//新版剥皮
var playPanel_DaYeZiPai = playLayer_ziPai.extend({
	ctor: function() {
		this._super("Play_daYeZiPai.json");

        if (MjClient.data.sData.tData.areaSelectMode["convertible"] && MjClient.rePlayVideo == -1){
            addFreeNumberBtn([0.5, 0.4]);
        }
        MjClient.playui.jsBind._node.addChild(new roundRule_ziPai(roundRule_ziPai.getRoundRules()));
	},

	getJsBind: function() {
		var jsBind = {
			_event: {
				// startShuffleCards: function(d) {
				// 	MjClient.playui.checkCanShowDistance();
				// },
				// mjhand: function() {
				// 	MjClient.playui.checkCanShowDistance([[0.25, 0.25], [0.5, 0.5], [0, 0]]);
				// },
				// initSceneData: function() {
				// 	CheckRoomUiDelete();
				// 	sendGPS();
				// 	MjClient.checkChangeLocationApp();
				// 	MjClient.playui.checkCanShowDistance([[0.25, 0.25], [0.5, 0.5], [0, 0]]);
				// },
    //             HZSelectPut: function() {
    //                 // MjClient.playui.checkCutLineVisible(this);
    //             },
				// MJChat: function(data) {
				// 	if (data.type == 4) {
				// 		MjClient.playui.checkCanShowDistance([[0.25, 0.25], [0.5, 0.5], [0, 0]]);
				// 	}
				// },
				// removePlayer: function(eD) {
				// 	MjClient.playui.checkCanShowDistance([[0.25, 0.25], [0.5, 0.5], [0, 0]]);
				// },
			},
            text_roundInfo: {
			    _run:function () {
                  this.visible = false;
                },
                _event: {
                    mjhand : function() {
                        this.setString(MjClient.playui.getGameCnDesc());
                    }
                }
            },
			img_banner: {
				// btn_setting: {
				// 	_click: function() {
				// 		MjClient.Scene.addChild(new settingPanel_DaZiBoPi(), 6000);
				// 		MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi", {
				// 			uid: SelfUid(),
				// 			gameType: MjClient.gameType
				// 		});
				// 	}
				// },
                btn_changeBg:{
                    _run: function() {
                        this.loadTextureNormal("playing/ziPaiBanner/wenhao.png");
                        this.setContentSize(this.getNormalTextureSize());
                    },
                    _click: function() {
                        postEvent("EZP_rule");
                    }
                },
			},
            btn_sort: {
                _click: function () {
                    if (!MjClient.playui.isInPlay()) {
                        return;
                    }
                    var pl = MjClient.playui.getUIPlayer(0);
                    MjClient.HandCardArr = MjClient.majiang.sortByUser();
                    MjClient.playui.refreshHandCard(0);
                }
            },
			node_jiaChui: {
				_event: {
					initSceneData: function() {
						this.visible = false;
						var pl = MjClient.playui.getUIPlayer(0);
						var tData = MjClient.data.sData.tData;
						if (tData.tState == TableState.waitJiazhu && pl.jiachuiNum == -1) {
							this.visible = true;
						}
					},
					waitJiazhu: function() {
						this.visible = true;
					},
					MJJiazhu: function() {
						var pl = MjClient.playui.getUIPlayer(0);
						if (pl.jiachuiNum != -1) {
							this.visible = false;
						}
					}
				},
				btn_jiaChui: {
					_layout: [
	                    [0.12, 0.12],
	                    [0.4, 0.4],
	                    [0, 0]
	                ],
					_click: function(btn) {
						MjClient.gamenet.request("pkroom.handler.tableMsg", {
							cmd: "MJJiazhu",
							jiachuiNum: 1,
						});
					}
				},
				btn_buChui: {
					_layout: [
	                    [0.12, 0.12],
	                    [0.6, 0.4],
	                    [0, 0]
	                ],
					_click: function(btn) {
						MjClient.gamenet.request("pkroom.handler.tableMsg", {
							cmd: "MJJiazhu",
							jiachuiNum: 0,
						});
					}
				}
			},
            node_left:{
                layout_eatDisplay: {
                    _layout: [[0.12, 0.12], [0.04, 0.93], [0, 0]],
                },
                layout_head: {
                    img_jiachuiText : {
                        _run:function() {
                            MjClient.playui.showOrHideJiachuiText(this, MjClient.playui.getUIOffByNode(this));
                        },
                        _event:{
                            initSceneData: function() {
                                MjClient.playui.showOrHideJiachuiText(this, MjClient.playui.getUIOffByNode(this));
                            },
                            MJJiazhu: function() {
                                MjClient.playui.showOrHideJiachuiText(this, MjClient.playui.getUIOffByNode(this));
                            },
                            mjhand: function() {
                                this.visible = false;
                            }
                        }
                    }
                }
            },
            node_right:{
                layout_eatDisplay: {
                    _layout: [[0.12, 0.12], [0.95, 0.91], [0, 0]],
                },
                layout_head: {
                    img_jiachuiText : {
                        _run:function() {
                            MjClient.playui.showOrHideJiachuiText(this, MjClient.playui.getUIOffByNode(this));
                        },
                        _event:{
                            initSceneData: function() {
                                MjClient.playui.showOrHideJiachuiText(this, MjClient.playui.getUIOffByNode(this));
                            },
                            MJJiazhu: function() {
                                MjClient.playui.showOrHideJiachuiText(this, MjClient.playui.getUIOffByNode(this));
                            },
                            mjhand: function() {
                                this.visible = false;
                            }
                        }
                    }
                }
            },
            node_down:{
                layout_eatDisplay: {
                    _layout: [[0.12, 0.12], [0.5, 0.45], [0, 0]],
                },
                img_putCard: {
                    _layout: [[0.35, 0.35], [0.65, 0.6], [0, 0]]
                },
                layout_head: {
                    img_jiachuiText : {
                        _run:function() {
                            MjClient.playui.showOrHideJiachuiText(this, MjClient.playui.getUIOffByNode(this));
                        },
                        _event:{
                            initSceneData: function() {
                                MjClient.playui.showOrHideJiachuiText(this, MjClient.playui.getUIOffByNode(this));
                            },
                            MJJiazhu: function() {
                                MjClient.playui.showOrHideJiachuiText(this, MjClient.playui.getUIOffByNode(this));
                            },
                            mjhand: function() {
                                this.visible = false;
                            }
                        }
                    },
                    text_huXiNum: {
                        _event: {
                            HZFanJiang: function() {
                                MjClient.playui.updateHuXi(this);
                            }
                        }
                    },
                }
            },
            node_xing:{
                layout_eatDisplay: {
                    _layout: [[0.12, 0.12], [0.95, 0.10], [0, 0]],
                },
                layout_head: {
                    img_jiachuiText : {
                        _run:function() {
                            MjClient.playui.showOrHideJiachuiText(this, MjClient.playui.getUIOffByNode(this));
                        },
                        _event:{
                            initSceneData: function() {
                                MjClient.playui.showOrHideJiachuiText(this, MjClient.playui.getUIOffByNode(this));
                            },
                            MJJiazhu: function() {
                                MjClient.playui.showOrHideJiachuiText(this, MjClient.playui.getUIOffByNode(this));
                            },
                            mjhand: function() {
                                this.visible = false;
                            }
                        }
                    }
                }
            },
            layout_cardNum: {
                text_cardNum: {
                    _event: {
                        HZFanJiang: function() {
                            this.refreshText();
                        }
                    }
                },
                img_jiangCard: {
                    _run: function() {
                        this.visible = false;
                        this.showJiangCard = function() {
                            this.visible = false;
                            var tData = MjClient.data.sData.tData;
                            cc.log("=========showJiangCard==========", tData.jiangCard)
                            if(tData.jiangCard) {
                                var src = MjClient.playui.getCardSrc("out", tData.jiangCard, false);
                                cc.log(src);
                                this.loadTexture(src);
                                this.visible = true;
                            }
                        }
                    },
                    _event: {
                        initSceneData: function() {
                            this.showJiangCard();
                        },
                        HZFanJiang: function() {
                            this.showJiangCard();
                        }
                    }
                }
            },
            node_selectPut: {
                btn_guo: {
                    _layout: [[0, 0.2], [0.8, 0.5], [0, 0]],
                    _click: function(btn, eT) {
                        this.visible = false;
                        var pl = MjClient.playui.getUIPlayer(0);
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd:"HZSelectPut", selectPutState: 0});
                    },
                    _event: {
                        HZSelectPut: function(eD) {
                            this.visible = false;
                            var pl = MjClient.playui.getUIPlayer(0);
                            if(pl.selectPutState == -1) {
                                this.visible = true;
                            }
                        },
                    },
                },
                btn_chu: {
                    _layout: [[0, 0.2], [0.65, 0.5], [0, 0]],
                    _event: {
                        HZSelectPut: function(eD) {
                            this.visible = false;
                            var pl = MjClient.playui.getUIPlayer(0);
                            if(pl.selectPutState == -1) {
                                this.visible = true;
                            }
                        },
                    },
                    _click: function() {
                        this.visible = false;
                        var pl = MjClient.playui.getUIPlayer(0);
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd:"HZSelectPut", selectPutState: 1});
                    }
                },
                _event: {
                    clearCardUI: function() {
                        this.visible = false;
                    },

                    initSceneData: function(eD) {
                        this.visible = false;
                        var pl = MjClient.playui.getUIPlayer(0);
                        if(pl.selectPutState == -1) {
                            this.visible = true;
                        }
                    },

                    HZSelectPut: function(eD) {
                        this.visible = false;
                        var pl = MjClient.playui.getUIPlayer(0);
                        if(pl.selectPutState == -1) {
                            this.visible = true;
                        }
                    },

                    HZNewCard: function() {
                        this.visible = false;
                    }
                }
            },
            img_cutLine: {
                _event: {
                    HZNewCard: function() {
                        MjClient.playui.checkCutLineVisible(this);
                    },

                    HZSelectPut: function(eD) {
                        MjClient.playui.checkCutLineVisible(this);
                    }
                },
            },
		};

		return jsBind;
	},

    //@Override
    updateRoundLabel : function(node) {
        node.visible = false;
        var tData = MjClient.data.sData.tData;
        if (MjClient.playui.isCoinField()) {
            return;
        }

        if (!this.isInPlay() && tData.tState != TableState.roundFinish) {
            return;
        }

        node.visible = true;
        node.setString("第" + (tData.roundAll - (tData.roundNum - 1)) + "局");
    }
});

// Override 获取玩法描述(桌面 邀请 结算)
playPanel_DaYeZiPai.prototype.getGameCnDesc = function(ignoreType) {
    ignoreType = ignoreType || 0; // 只能默认0

    var tData = MjClient.data.sData.tData;
    var areaSelectMode = JSON.parse(JSON.stringify(tData.areaSelectMode));
    var ignoreMode = this.getIgnoreMode(ignoreType);
    for (var i = 0; i < ignoreMode.length; i++) {
        delete areaSelectMode[ignoreMode[i]];
    }

    var desc = "";
    for (var k in areaSelectMode) {
        var str = getGameCnDesc(tData.gameType, k, areaSelectMode[k], areaSelectMode);
        if(k == "isMaiPai" && tData.maxPlayer != 2 && this.isInPlay()) {
            continue;
        }
        if (str) {
            desc += str + ",";
        }
    }
    desc = desc.replace(/,$/, "");

    return desc;
};

playPanel_DaYeZiPai.prototype.showOrHideJiachuiText = function(node, off) {
    node.visible = false;
    var tData = MjClient.data.sData.tData;
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return;
    }
    if (tData.tState == TableState.waitJiazhu) {
        if (pl.jiachuiNum == 0) {
            node.loadTexture("playing/other/jiachui_text_0.png");
            node.visible = true;
        } 
        else {
            if (pl.jiachuiNum == 1) {
                node.loadTexture("playing/other/jiachui_text_1.png");
                node.visible = true;
            } 
        }    
    }
}

// //检测距离信息
// playPanel_DaYeZiPai.prototype.checkCanShowDistance = function(layoutData) {
// 	var disLayer = this.disLayer;
// 	if (disLayer) {
// 		disLayer.removeFromParent();
// 		this.disLayer = null;
// 	}

// 	var tState = MjClient.data.sData.tData.tState;
// 	if (!tState || tState > TableState.waitReady) {
// 		return;
// 	}
// 	if (MjClient.data.sData.tData.fieldId) {
// 		return;
// 	}
// 	if (MjClient.timeoutShowDistanceID) {
// 		clearTimeout(MjClient.timeoutShowDistanceID);
// 		MjClient.timeoutShowDistanceID = null;
// 	}

// 	if (this.getPlayersNum() == 3) {
// 		disLayer = new Distance3PlayerLayer(layoutData);
// 	} else if (this.getPlayersNum() == 4) {
// 		disLayer = new DistanceLayer(layoutData);
// 	} else {
// 		return;
// 	}
// 	this.disLayer = disLayer;
// 	this.addChild(disLayer);
// };

playPanel_DaYeZiPai.prototype.getDefaultSetting = function() {
    return {
        layout: 1,
        bg: 0,
        pai: 1,
        fastEat: 0,
        huXi: 1,
        xuXian: 0,
        suDu: 0,
        size: 0,
        voice: 1,
        ting: 0,
        chuBtn: 0,
        dblClick: 1,
        chuGuide:0,
    };
};

playPanel_DaYeZiPai.prototype.getGameBgList = function() {
    return ["playing/ziPaiTable/beijing_1.jpg", "playing/ziPaiTable/beijing_2.jpg", "playing/ziPaiTable/beijing_3.jpg"];
};

//字牌字体列表
playPanel_DaYeZiPai.prototype.getCardFontList = function() {
    return ["type1", "type2", "type3"];
};

//Override
playPanel_DaYeZiPai.prototype.getInitDiPaiCount = function() {
	var tData = MjClient.data.sData.tData;
    return MjClient.majiang.getAllCardsTotal() - tData.maxPlayer * 14;
};

//Override
playPanel_DaYeZiPai.prototype.checkChuiFlagVisible = function(node) {
	var off = this.getUIOffByNode(node);
	var pl = this.getUIPlayer(off);
	var tData = MjClient.data.sData.tData;
	if (!pl || !tData.areaSelectMode.isJiaChui) {
		node.visible = false;
		return;
	}

	node.visible = true;
	if (pl.jiachuiNum == 1) {
		node.loadTexture("playing/ziPaiBanner/chui.png");
	} else {
		if (pl.jiachuiNum == -1) {
			node.visible = false;
		}
		node.loadTexture("playing/ziPaiBanner/buchui.png");
	}
};

//Override
playPanel_DaYeZiPai.prototype.isShowLongCard = function() {
	return true;
};

//获取听的牌
playPanel_DaYeZiPai.prototype.getTingCards = function(sData, pl, putCard) {
	return MjClient.huzi.getTingCards(sData, pl, putCard);
};

/**
 * 计算听牌提示
 */
playPanel_DaYeZiPai.prototype.calculateHintPutList = function() {
	MjClient.hintPutList_ziPai = MjClient.huzi.hintPutCardsToTing();
};

//Override
playPanel_DaYeZiPai.prototype.createGameOverLayer = function(type) {
	return new GameOverLayer_DaYeZiPai();
};

//Override
playPanel_DaYeZiPai.prototype.createEndOneLayer = function(type) {
	return new EndOneView_DaYeZiPai();
};

//字牌字体idx
playPanel_DaYeZiPai.prototype.getCardFontIdx = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 2);
};

//布局类型
playPanel_DaYeZiPai.prototype.getLayoutType = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT, 0);
};

// //Override
// playPanel_DaYeZiPai.prototype.getGameBgList = function() {
// 	return ["playing/gameTable/beijing_1.jpg", "playing/gameTable/beijing_2.jpg", "playing/gameTable/beijing_3.jpg"];
// };

playPanel_DaYeZiPai.prototype.isAniParallel = function() {
    return false;
};

// 发牌间隔
playPanel_DaYeZiPai.prototype.getSendCardInterval = function() {
    var areaSelectMode = MjClient.data.sData.tData.areaSelectMode;
    if ([0, 1, 2].indexOf(areaSelectMode.faPai) < 0) {
        return 1;
    }

    return [1.5, 1.1, 0.8][areaSelectMode.faPai];
};

playPanel_DaYeZiPai.prototype.changeEatBtnLayout = function(btnNode, len, idx) {
    var scale = 0.20;
    if(btnNode.name == "btn_guo"){
        scale = 103 / 720;
    }else if(btnNode.name == "btn_hu"){
        scale = 149 / 720;
    }
    var type = this.getLayoutType();
    switch (type) {
        case 1:
            setWgtLayout(btnNode, [0, scale], [0.5, 0.18], [(idx - (len - 1) / 2) * 1.3 * 0.20 / scale, 1.8 * 0.20 / scale], false, false);
            break;
        case 0:
            setWgtLayout(btnNode, [0, scale], [0.88 - (len - 1 - idx) * 0.12 * 0.20 / scale, 0.11], [0, 1.8 * 0.20 / scale], false, false);
            break;
    }
};

playPanel_DaYeZiPai.prototype.isCheckTingStats = function() {
    return true;
}

playPanel_DaYeZiPai.prototype.isUpdateXingPlayer = function (off) {
    return this.getIndexInUids(off) == MjClient.data.sData.tData.xingPlayer && MjClient.data.sData.tData.curPlayer == MjClient.data.sData.tData.zhuang;
};

// 更新手牌(收入亮张)
playPanel_DaYeZiPai.prototype.updateHandCardByPick = function(node, msg) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurPlayer(off) && !this.isUpdateXingPlayer(off)) {
        if (off == 0) {
            this.refreshHandCard(off);
        }
        return;
    }

    if (MjClient.rePlayVideo == -1 && off != 0) {
        return;
    }

    MjClient.hasPut = true; // 屏蔽出牌
    var self = this;
    setTimeout(function() {
        if (off == 0) {
            var pl = self.getUIPlayer(off);
            if(self.isUpdateXingPlayer(off)){
                pl.mjhand.push(msg.card);
            }
            MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand, 1);
        }
        self.initHandCards(node, msg);
        setTimeout(()=>{
            MjClient.hasPut = false;
        }, 0.3);
    }, this.getActionTime());
};


// 更新手牌 (出牌)
playPanel_DaYeZiPai.prototype.updateHandCardByPut = function(node) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurPlayer(off) && !this.isUpdateXingPlayer(off)) {
        return;
    }

    if (off == 0) {
        this.removeTingSign();
    }

    // 牌局中别人出牌
    if (MjClient.rePlayVideo == -1 && off != 0) {
        return;
    }

    MjClient.hasPut = false; // todo
    // 牌局中自己手动出牌
    if (MjClient.rePlayVideo == -1 && off == 0 && !this.isInTrust(SelfUid()) && !this.isUpdateXingPlayer(off)) {
        return;
    }

    // 移除手牌
    this.removeHandCard(MjClient.data.sData.tData.currCard, off);
    this.refreshHandCard(off);
};

playPanel_DaYeZiPai.prototype.updateHandCardByEat = function(node, eatType, msg) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurEatPlayer(msg, off) && !this.isUpdateXingPlayer(off)) {
        return;
    }

    eatType = this.apartGangType(eatType, msg);
    if(this.isUpdateXingPlayer(off)){
        var tData = MjClient.data.sData.tData;
        var zhuangOff = this.getUIOffByUid(tData.uids[tData.zhuang]);
        var cardArr = this.getEatCardArr(eatType, zhuangOff);
        this.removeXingHandCardByEat(eatType, cardArr, msg, off, zhuangOff);
    }else{
        var cardArr = this.getEatCardArr(eatType, off);
        this.removeEatArrFromHand(eatType, cardArr, msg, off);
    }
    this.refreshHandCard(off);
};

playPanel_DaYeZiPai.prototype.removeXingHandCardByEat = function(eatType, cardArr, msg, off, zhuangOff) {
    var card = this.getEatCard(eatType, zhuangOff);
    if (eatType == "mjchi") {
        this.removeChiFromHand(cardArr, card, off);
    } else if (eatType == "mjpeng") {
        this.removePengFromHand(card, off);
    } else if (eatType == "mjgang0" || eatType == "mjgang1" || eatType == "mjgang2") {
        this.removeGangFromHand(eatType, card, off);
    } else if (eatType == "mjwei") {
        this.removeWeiFromHand(card, msg, off);
    } else {
        this.removeExtendFromHand(eatType, cardArr, card, msg, off);
    }
};

// 更新手牌(补牌)
playPanel_DaYeZiPai.prototype.updateHandCardByAdd = function(node, msg) {
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl || msg.uid != pl.info.uid) {
        return;
    }

    // 牌局中别人补牌
    if (MjClient.rePlayVideo == -1 && off != 0) {
        return;
    }

    if (off == 0) {
        if(this.isUpdateXingPlayer(off)){
            MjClient.HandCardArr.push(msg.cardList);
            var mjhand = [];
            for(var i = 0; i < MjClient.HandCardArr.length; i++){
                mjhand = mjhand.concat(MjClient.HandCardArr[i]);
            }
            MjClient.HandCardArr = MjClient.majiang.sortCard(mjhand, 1);
        }else{
            MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand, 1);
        }
    } else {
        MjClient.OtherHandArr[off].push(msg.cardList);
        var mjhand = [];
        for(var i = 0; i < MjClient.OtherHandArr[off].length; i++){
            mjhand = mjhand.concat(MjClient.OtherHandArr[off][i]);
        }
        MjClient.OtherHandArr[off] = MjClient.majiang.sortCard(mjhand, 1);
    }
    this.refreshHandCard(off);
};

// 庄
playPanel_DaYeZiPai.prototype.checkZhuangVisible = function(node) {
    var tData = MjClient.data.sData.tData;
    node.visible = false;
    if (!this.isInPlay()) {
        return;
    }

    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return;
    }

    if (tData.uids[tData.zhuang] == pl.info.uid) {
        node.loadTexture("playing/ziPaiBanner/zhuang.png");
        node.visible = true;
    }else if(tData.uids[tData.xingPlayer] == pl.info.uid){
        node.loadTexture("playing/ziPaiBanner/xing.png");
        node.visible = true;
    }
};

playPanel_DaYeZiPai.prototype.updatePutCard = function(node, msg, isReconnect) {
    playLayer_ziPai.prototype.updatePutCard.apply(this, [node, msg, isReconnect]);
    var img_flg = node.getChildByName("img_flg");
    if(!img_flg) {
        return;
    }

    if(MjClient.data.sData.tData.putType == 0) {
        img_flg.loadTexture("daYe/da.png");
    } else {
        img_flg.loadTexture("daYe/mo.png");
    }
};

playPanel_DaYeZiPai.prototype.outCardExp = function(pl, outCard, idx) {
    console.log("=========outCardExp=======");
    var img_flg = outCard.getChildByName("img_jiaoBiao");
    if(img_flg) {
        img_flg.visible = false;
        if(pl.putCardDir[idx] && pl.putCardDir[idx].putType == 1) {
            img_flg.visible = true;
        }
    }
};

playPanel_DaYeZiPai.prototype.getJiangCardNext = function() {
    var jiangCard = MjClient.data.sData.tData.jiangCard;
    var ret = jiangCard;
    if (ret % 10 == 0)
        ret = jiangCard - 9;
    else
        ret = jiangCard + 1;

    return ret;
};

playPanel_DaYeZiPai.prototype.getTableHuXi = function(off) {
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return 0;
    }

    var score = 0;
    /// 提
    for (var i = 0; i < pl.mjgang1.length ; i++)
    {
        if(MjClient.majiang.isJingNextCard(pl.mjgang1[i])) {
            score += pl.mjgang1[i] < 20 ? 12 : 24;
        }else {
            score += pl.mjgang1[i] < 20 ? 9 : 12;
        }
        
    }

    // 跑
    for (var i = 0; i < pl.mjgang0.length ; i++)
    {
        if(MjClient.majiang.isJingNextCard(pl.mjgang0[i])) {
            score += pl.mjgang0[i] < 20 ? 9: 18;
        }else {
            score += pl.mjgang0[i] < 20 ? 6 : 9;
        }
        
    }

    // 偎
    for (var i = 0; i < pl.mjwei.length ; i++)
    {
        if(MjClient.majiang.isJingNextCard(pl.mjwei[i])) {
            score += pl.mjwei[i] < 20 ? 6 : 12;
        }else {
            score += pl.mjwei[i] < 20 ? 3 : 6;
        }
        
    }

    // 碰
    for (var i = 0; i < pl.mjpeng.length ; i++)
    {
        if(MjClient.majiang.isJingNextCard(pl.mjpeng[i])) {
            score += pl.mjpeng[i] < 20 ? 3 : 6;
        }else {
            score += pl.mjpeng[i] < 20 ? 1 : 3;
        }
    }

    function getRowHuxi(chiRow) {
        var score = 0;
        chiRow = [].concat(chiRow);

        chiRow.sort(function(a, b) {
            return a - b
        });

        if (chiRow[0] == 1 && chiRow[1] == 2 && chiRow[2] == 3) {
            score += 3;
        } else if (chiRow[0] == 21 && chiRow[1] == 22 && chiRow[2] == 23) {
            score += 6;
        } else if (chiRow[0] == 2 && chiRow[1] == 7 && chiRow[2] == 10) {
            score += 3;
        } else if (chiRow[0] == 22 && chiRow[1] == 27 && chiRow[2] == 30) {
            score += 6;
        } else if (chiRow[0] == 1 && chiRow[1] == 5 && chiRow[2] == 10) {
            score += 3;
        } else if (chiRow[0] == 21 && chiRow[1] == 25 && chiRow[2] == 30) {
            score += 6;
        }
        return score;
    }
    
    // 吃
    for (var i = 0; i < pl.mjchi.length; i++) {
        var chiRow = pl.mjchi[i].eatCards;
        score += getRowHuxi(chiRow);

        var biCards = pl.mjchi[i].biCards;
        if (biCards) {
            for (var j = 0; j < biCards.length; j++) {
                var biRow = biCards[j];
                score += getRowHuxi(biRow);
            }
        }
    }
    
    return score;
};