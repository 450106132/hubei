// 字牌玩法play基类
var jsBind_ziPai = { // base jsBind;
    _event: {
        EZP_layout: function() {
            if (MjClient.data.sData.tData.maxPlayer < 4) {
                MjClient.playui.changeLayout(this);
            }
        },
        DelRoom: function() {
            CheckRoomUiDelete(); // 公用代码todo
        },
        initSceneData: function() {
            CheckRoomUiDelete(); // 公用代码todo
            sendGPS();
            MjClient.checkChangeLocationApp();
        },
        endRoom: function(msg) {
            if (msg.showEnd) {
                this.addChild(MjClient.playui.createGameOverLayer(), 500);
                
                var pl = MjClient.playui.getUIPlayer(0);
                if(pl.shuffled > 0) {
                    MjClient.showToast("因牌局解散，系统已返还洗牌费用");
                }
            } else {
                MjClient.Scene.addChild(new StopRoomView());
            }
        },
        roundEnd: function() {
            var self = this;
            var sData = MjClient.data.sData;
            if (MjClient.data.sData.tData.roundNum <= 0 && !MjClient.playui.isCoinField()) {
                var layer = MjClient.playui.createGameOverLayer();
                layer.setVisible(false);
                self.addChild(layer, 500);
            }

            if (!MjClient.endoneui) {
                self.addChild(MjClient.playui.createEndOneLayer(), 500);
            }
        },
        LeaveGame: function() {
            MjClient.addHomeView();
            MjClient.playui.removeFromParent(true);
            stopEffect(); // 公用代码todo
            playTimeUpEff = null;
            delete MjClient.playui;
            delete MjClient.endoneui;
            delete MjClient.endallui;
            cc.audioEngine.stopAllEffects();
            playMusic("bgMain"); // 公用代码todo
        },
        MJShuffle : function(eD) {
            if (MjClient.rePlayVideo != -1) return; // 回放时候不播

            MjClient.playui.shuffleList.push(eD.uid);
            MjClient.playui.playShuffleEffect();
        },
        onlinePlayer: function(data){
            if(!data.isTrust){
                return;
            }
            var off = MjClient.playui.getUIOffByNodeName("node_down");
            var player = MjClient.playui.getUIPlayer(off);
            if(player.info.uid != data.uid){
                return;
            }
            postEvent("clearCardUI");
            postEvent("clearCardArr");
            if(MjClient.endoneui && cc.sys.isObjectValid(MjClient.endoneui)){
                MjClient.endoneui.removeFromParent(true);
                MjClient.endoneui = null;
            }
        }
    },
    node_backGround: {
        img_backGround: {
            _run: function() {
                MjClient.playui.changeGameBg(this);
            },
            _event: {
                EZP_gameBG: function() {
                    MjClient.playui.changeGameBg(this);
                }
            },
            _layout: [[1, 1], [0.5, 0.5], [0, 0], true],
        },
        LeftBottom: {
            _layout: [[0.1, 0.1], [0.03, 0.045], [0, 0]],
        },
        RightBottom: {
            _layout: [[0.1, 0.1], [0.97, 0.05], [0, 0]],
        },
        RightTop: {
            _layout: [[0.1, 0.1], [0.97, 0.95], [0, 0]],
        },
        leftTop: {
            _layout: [[0.1, 0.1], [0.03, 0.95], [0, 0]],
        }
    },
    text_roundInfo: {
        _layout: [[0.11, 0.11], [0.5, 0.66], [0, 0]],
        _run: function() {
            this.ignoreContentAdaptWithSize(true);
            this.setString(MjClient.playui.getGameCnDesc());
        }
    },
    img_gameName: {
        _layout: [[0.12, 0], [0.5, 0.83], [0, 0]],
        _run: function() {
            cc.log('加载图标...', MjClient.gameType, GameBg[MjClient.gameType])
            this.loadTexture(GameBg[MjClient.gameType]);
        }
    },
    btn_chat: {
        _layout: [[55 / 1280, 0], [0.97, 0.5 - 0.007], [0, -0.2]],
        _run: function() {
            if (MjClient.playui.isCoinField()) {
                this.loadTextureNormal("playing/gameTable/gold/xiaoxi.png");
                this.loadTexturePressed("playing/gameTable/gold/xiaoxi_s.png");
                this.setContentSize(cc.size(65, 74));
            }
            this.changeLayout = function() {
                if (MjClient.playui.getPlayersNum() == 4) {
                    return;
                }
                var type = MjClient.playui.getLayoutType();
                switch (type) {
                    case 0: //偏右
                        setWgtLayout(this, [this.width / 1280, 0], [0.97, 0.187], [0, 0]);
                        break;
                    case 1: //传统
                        setWgtLayout(this, [this.width / 1280, 0], [0.97, 0.5 - 0.007], [0, -0.2]);
                        break;
                }

            }
        },
        _event: {
            initSceneData: function() {
                this.changeLayout();
            },
            EZP_layout: function() {
                this.changeLayout();
            },
        },
        _click: function() {
            var chatlayer = new ChatLayer(); // 公用代码todo
            MjClient.Scene.addChild(chatlayer);
        }
    },
    btn_voice: {
        _layout: [[43 / 1280, 0], [0.91, 0.5], [0, -0.2]],
        _run: function() {
            this.visible = !MjClient.playui.isCoinField();
            initVoiceData(); // 公用代码todo
            cc.eventManager.addListener(getTouchListener(), this);
            if (MjClient.isShenhe) this.visible = false;

            this.changeLayout = function() {
                if (MjClient.playui.getPlayersNum() == 4) {
                    return;
                }
                var type = MjClient.playui.getLayoutType();
                switch (type) {
                    case 0: //偏右
                        setWgtLayout(this, [43 / 1280, 0], [0.91, 0.1875], [0, 0]);
                        break;
                    case 1: //传统
                        setWgtLayout(this, [43 / 1280, 0], [0.91, 0.5], [0, -0.2]);
                        break;
                }
            }
        },
        _touch: function(btn, eT) {
            // 点击开始录音 松开结束录音,并且上传至服务器, 然后通知其他客户端去接受录音消息, 播放
            if (eT == 0) {
                startRecord(); // 公用代码todo
            } else if (eT == 2) {
                endRecord(); // 公用代码todo
            } else if (eT == 3) {
                cancelRecord(); // 公用代码todo
            }
        },
        _event: {
            cancelRecord: function() {
                MjClient.native.HelloOC("cancelRecord !!!");
            },
            uploadRecord: function(filePath) {
                if (filePath) {
                    MjClient.native.HelloOC("upload voice file");
                    MjClient.native.UploadFile(filePath, MjClient.remoteCfg.voiceUrl, "sendVoice");
                } else {
                    MjClient.native.HelloOC("No voice file update");
                }
            },
            sendVoice: function(fullFilePath) {
                if (!fullFilePath) {
                    return;
                }

                var getFileName = /[^\/]+$/;
                var extensionName = getFileName.exec(fullFilePath);
                var fileName = extensionName[extensionName.length - 1];

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "downAndPlayVoice",
                    uid: SelfUid(),
                    type: 3,
                    msg: fileName,
                    num: MjClient.data._JiaheTempTime //录音时长
                });
                MjClient.native.HelloOC("download file");
            },
            downAndPlayVoice: function(msg) {
                MjClient.native.HelloOC("downloadPlayVoice ok");
                MjClient.data._tempMessage = msg;
                MjClient.native.HelloOC("mas is" + JSON.stringify(msg));
                MjClient.native.DownLoadFile(jsb.fileUtils.getWritablePath(), MjClient.playui.getUIOffByUid(msg.uid) + ".mp3", MjClient.remoteCfg.voiceUrl + msg.msg, "playVoice");
            },
            initSceneData: function() {
                this.changeLayout();
            },
            EZP_layout: function() {
                this.changeLayout();
            },
        }
    },
    btn_sort: {
        _layout: [[0.07, 0.07], [0.04, 0.18], [0, 0]],
        _run: function() {
            if (MjClient.playui.isCoinField()) {
                this.loadTextureNormal("playing/gameTable/gold/lipai.png");
                this.loadTexturePressed("playing/gameTable/gold/lipai_s.png");
                this.setContentSize(cc.size(65, 65));
                setWgtLayout(this, [this.width / 1280, 0], [0.04, 0.18], [0, 0]);
            }
        },
        _click: function() {
            if (!MjClient.playui.isInPlay()) {
                return;
            }
            MjClient.HandCardArr = MjClient.majiang.sortByUser();
            MjClient.playui.refreshHandCard(0);
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.checkSortBtnVisible(this);
            },
            mjhand: function() {
                MjClient.playui.checkSortBtnVisible(this);
            },
            roundEnd: function() {
                MjClient.playui.checkSortBtnVisible(this);
            }
        }
    },
    img_cutLine: {
        _run: function() {
            MjClient.playui.changeCutLineLayout(this);
        },
        _event: {
            initSceneData: function() {
                setTimeout(()=>{
                    MjClient.hasPut = false;
                    MjClient.playui.checkCutLineVisible(this);
                }, 0.5);
            },
            HZCheckRaise: function() {
                MjClient.playui.checkCutLineVisible(this);
            },
            HZChiCard: function() {
                MjClient.playui.checkCutLineVisible(this);
            },
            HZTieCard: function() {
                MjClient.playui.checkCutLineVisible(this);
            },
            MJPeng: function() {
                MjClient.playui.checkCutLineVisible(this);
            },
            MJPut: function() {
                MjClient.playui.checkCutLineVisible(this);
            },
            HZWeiCard: function() {
                MjClient.playui.checkCutLineVisible(this);
            },
            HZGangCard: function() {
                MjClient.playui.checkCutLineVisible(this);
            },
            HZLiuCard: function() {
                MjClient.playui.checkCutLineVisible(this);
            },
            waitPut:function () {
                MjClient.playui.checkCutLineVisible(this);
            },
            MJPass: function() {
                MjClient.playui.checkCutLineVisible(this);
            },
            EZP_xuXian: function() {
                MjClient.playui.changeCutLineLayout(this);
            },
            EZP_chuPaiGuide:function () {
                MjClient.playui.checkCutLineVisible(this);
            }
        },
    },
    img_finger: {
        _layout: [[0.18, 0.18], [0.68, 0.3], [0.7, -0.1]],
        _run:function () {
            this.loadTexture("playing/fingerEffer/finger.png");
        },
    },
    layout_waitFriends: {
        _layout: [[0.06, 0.06], [0.5, 0.5], [0, -4]],
        _run: function() {
            var offestY = 20;
            for (var i = 0; i < 9; i++) {
                if (i >= 6) {
                    offestY = 10;
                }

                var img_word = this.getChildByName("img_waitFriend_" + i);
                if (img_word) {
                    img_word.runAction(cc.repeatForever(cc.sequence(cc.delayTime(i * 0.3), cc.moveBy(0.3, 0, offestY), cc.moveBy(0.3, 0, -offestY), cc.delayTime(3 - i * 0.3))));
                }
            }
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.checkInviteVisible(this);
            },
            addPlayer: function() {
                MjClient.playui.checkInviteVisible(this);
            },
            removePlayer: function() {
                MjClient.playui.checkInviteVisible(this);
            }
        }
    },
    btn_inviteFriend: {
        _layout: [[219 / 1280, 0], [0.697, 0.12], [0, 0]],
        _click: function() {
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Yaoqingweixinhaoyou", {
                uid: SelfUid(),
                gameType: MjClient.gameType
            });

            var sData = MjClient.data.sData;
            var tData = sData.tData;
            // 链接地址
            var _urlStr = MjClient.remoteCfg.entreRoomUrl + "?vipTable=" + tData.tableid;
            var clubInfoTable = getClubInfoInTable();
            if (clubInfoTable) {
                _urlStr += ((clubInfoTable.isLMClub ? "&leagueId=":"&clubId=") + clubInfoTable.clubId);
            }
            if (tData.ruleId) {
                _urlStr += "&ruleId=" + tData.ruleId;
            }

            // 标题
            var _titleStr = GameCnName[MjClient.gameType] + " " + tData.tableid;
            var needNum = MjClient.playui.getPlayersNum() - Object.keys(sData.players).length;
            _titleStr += (" 缺" + needNum + "人" + " 点击加入>>>");
            if (clubInfoTable && clubInfoTable.clubId) {
                _titleStr += "亲友圈" + clubInfoTable.clubId;
            }

            // 内容
            var _contentStr = ((clubInfoTable && clubInfoTable.ruleName) ? GameCnName[MjClient.gameType] + "," : "") + MjClient.playui.getGameCnDesc();
            _contentStr += (tData.roundNum + "局") + "," + "速度加入【" + AppCnName[MjClient.getAppType()] + "】";

            MjClient.getInviteUrl(function (_urlStr) {
                MjClient.shareUrlToMultiPlatform(_urlStr, _titleStr, _contentStr);
            });
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.checkInviteVisible(this);
            },
            addPlayer: function() {
                MjClient.playui.checkInviteVisible(this);
            },
            removePlayer: function() {
                MjClient.playui.checkInviteVisible(this);
            }
        }
    },
    btn_ready: {
        _layout: [[219 / 1280, 0], [0.697, 0.12], [0, 0]],
        _click: function() {
            MjClient.gamenet.request("pkroom.handler.tableMsg", {
                cmd: "MJPass"
            });
            this.visible = false;
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.checkReadyBtnVisible(this);
            },
            waitReady: function() {
                MjClient.playui.checkReadyBtnVisible(this);
            },
            onlinePlayer: function() { // 准备了
                MjClient.playui.checkReadyBtnVisible(this);
            },
            removePlayer: function() {
                MjClient.playui.checkReadyBtnVisible(this);
            },
            addPlayer: function() { // 有坑 正常不应该监听(进入准备阶段有人退出再进来 先接收到waitReady(少人)后addPlayer)
                MjClient.playui.checkReadyBtnVisible(this);
            }
        }
    },
    btn_exitTable: {
        _layout: [[219 / 1280, 0], [0.30, 0.12], [0, 0]],
        _click: function() {
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Likaifangjian", {
                uid: SelfUid(),
                gameType: MjClient.gameType
            });

            var tData = MjClient.data.sData.tData;
            var msg = "确定要退出房间吗？";
            if (tData.owner == SelfUid()) {
                msg = "返回大厅房间仍然保留\n赶快去邀请好友吧";
            }

            MjClient.showMsg(msg, function() {
                MjClient.leaveGame();
                if (!MjClient.enterui && !getClubInfoInTable()) {
                    MjClient.Scene.addChild(new EnterRoomLayer());
                }
            }, function() {});
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.checkExitBtnVisible(this);
            },
            removePlayer: function() {
                MjClient.playui.checkExitBtnVisible(this);
            },
            onlinePlayer: function() {
                MjClient.playui.checkExitBtnVisible(this);
            },
            waitJiazhu: function() {
                MjClient.playui.checkExitBtnVisible(this);
            },
            startShuffleCards: function() {
                MjClient.playui.checkExitBtnVisible(this);
            },
            mjhand: function() {
                MjClient.playui.checkExitBtnVisible(this);
            },
            waitReady: function() {
                MjClient.playui.checkExitBtnVisible(this);
            }
        }
    },
    layout_cardNum: {
        _layout: [[0.085, 0.085], [0.5, 0.73], [0, 0]],
        _event: {
            initSceneData: function() {
                this.visible = MjClient.playui.isInPlay() && MjClient.rePlayVideo == -1;
            },
            mjhand: function() {
                this.visible = MjClient.playui.isInPlay();
            },
            roundEnd: function() {
                this.visible = MjClient.playui.isInPlay();
            }
        },
        img_cardBg: {},
        img_card: {
            _run: function() {
                this.refreshCardsTotal = function(isRemove) {
                    var tData = MjClient.data.sData.tData;
                    var cardsTotal = MjClient.playui.getInitDiPaiCount();
                    var left = MjClient.majiang.getAllCardsTotal() - tData.cardNext;
                    if (isRemove) {
                        var children = this.getChildren();
                        var count = this.getChildrenCount();
                        var factRemoveCount = (cardsTotal - left) / (cardsTotal / 20);
                        if (Math.floor(count + factRemoveCount) > 20) {
                            children[count - 1].removeFromParent(true);
                        }
                    } else {
                        this.removeAllChildren();
                        left = left / (cardsTotal / 20);
                        for (var i = 1; i <= left; i++) {
                            var child = ccui.ImageView("playing/ziPaiBanner/paidui.png");
                            child.setPosition(cc.p(this.width / 2, this.height / 2 + i * 0.8));
                            this.addChild(child);
                        }
                    }
                    this.parent.getChildByName("text_cardNum").y = 40 + this.getChildrenCount() * 0.8;
                }
            },
            _event: {
                initSceneData: function() {
                    this.refreshCardsTotal();
                },
                mjhand: function() {
                    this.refreshCardsTotal();
                },
                HZNewCardDelay: function() {
                    this.refreshCardsTotal(true);
                }
            }
        },
        text_cardNum: {
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
                this.refreshText = function() {
                    var tData = MjClient.data.sData.tData;
                    if (tData) {
                        this.setString(MjClient.majiang.getAllCardsTotal() - tData.cardNext);
                    }

                    var img_card = this.getParent().getChildByName("img_card");
                    this.y = 40 + img_card.getChildrenCount() * 0.8;
                };
                this.refreshText();
            },
            _event: {
                initSceneData: function() {
                    this.refreshText();
                },
                mjhand: function() {
                    this.refreshText();
                },
                HZNewCardDelay: function() {
                    this.refreshText();
                },
                HZCardNum: function() {
                    this.refreshText();
                }
            }
        },
    }
};

jsBind_ziPai.img_banner = {
    _layout: [[0.35, 0.35], [0.5, 1], [0, 0]],
    _run: function() {
        var btn_changeBg = this.getChildByName("btn_changeBg");
        var btn_setting = this.getChildByName("btn_setting");
        var btn_gps = this.getChildByName("btn_gps");
        var btn_trust = this.getChildByName("btn_trust");
        var btn_getGold = this.getChildByName("btn_getGold");
        if (MjClient.playui.isCoinField()) {
            btn_setting.loadTextureNormal("playing/gameTable/gold/shezhi.png");
            btn_setting.loadTexturePressed("playing/gameTable/gold/shezhi_s.png");
            btn_setting.setContentSize(cc.size(65, 74));

            btn_setting.x = btn_gps.x;
            btn_trust.x = btn_setting.x - 100;
            btn_getGold.x = btn_setting.x - 200;
        } else if (MjClient.playui.getPlayersNum() == 2) {
            btn_changeBg.x = btn_setting.x;
            btn_setting.x = btn_gps.x;
        }
    },
    text_time: {
        _run: function() {
            if (MjClient.playui.isCoinField()) {
                this.visible = false;
            } else {
                this.ignoreContentAdaptWithSize(true);
                // this.schedule(function() {
                //     var time = MjClient.getCurrentTime();
                //     var str = (time[3] < 10 ? "0" + time[3] : time[3]) + ":" + (time[4] < 10 ? "0" + time[4] : time[4]);
                //     this.setString(str);
                // });
            }
        }
    },
    bar_powerBar: {
        _run: function() {
            if (MjClient.playui.isCoinField()) {
                this.visible = false;
            } else {
                updateBattery(this); // 公用代码todo
            }
        },
        _event: {
            nativePower: function(d) {
                if (!MjClient.playui.isCoinField()) {
                    this.setPercent(Number(d));
                }
            }
        }
    },
    sp_power: {
        _run: function() {
            this.visible = !MjClient.playui.isCoinField();
        }
    },
    img_wifi: {
        _run: function() {
            if (MjClient.playui.isCoinField()) {
                this.visible = false;
            } else {
                updateWifiState(this); // 公用代码todo
            }
        }
    },
    text_tableTitle: {
        _run: function() {
            if (MjClient.playui.isCoinField()) {
                this.visible = false;
            }
        }
    },
    text_tableId: {
        _run: function() {
            this.ignoreContentAdaptWithSize(true);
            this.visible = !MjClient.playui.isCoinField();
            this.setString(MjClient.data.sData.tData.tableid);
        }
    },
    text_round: {
        _run: function() {
            this.ignoreContentAdaptWithSize(true);

        },
        _event: {
            mjhand: function() {
                MjClient.playui.updateRoundLabel(this);
            },
            initSceneData: function() {
                MjClient.playui.updateRoundLabel(this);
            },
        }
    },
    btn_changeBg: {
        _run: function() {
            this.visible = !MjClient.playui.isCoinField();
        },
        _click: function() {
            MjClient.playui.changeGameBgToNext();
        }
    },
    btn_setting: {
        _click: function() {
            MjClient.Scene.addChild(new setting_ziPai(), 6000);
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi", {
                uid: SelfUid(),
                gameType: MjClient.gameType
            });
        }
    },
    btn_exit: {
        _run: function() {
            this.visible = !MjClient.playui.isCoinField();
        },
        _click: function() {
            var tData = MjClient.data.sData.tData;
            if (tData.owner != SelfUid() && (tData.tState == TableState.waitJoin || tData.tState == TableState.waitReady)) {
                MjClient.showMsg("确定要退出房间吗？",
                    function() {
                        MjClient.leaveGame();
                        if (!MjClient.enterui && !getClubInfoInTable())
                            MjClient.Scene.addChild(new EnterRoomLayer());
                    },
                    function() {});
            } else {
                MjClient.showMsg("是否解散房间？", function() {
                    MjClient.delRoom(true);
                }, function() {}, 1);
            }
        }
    },
    btn_gps: {
        _run: function() {
            this.visible = !MjClient.playui.isCoinField() && MjClient.playui.getPlayersNum() != 2;
        },
        _click: function() {
            if (MjClient.playui.getPlayersNum() == 3) {
                MjClient.Scene.addChild(new showDistance3PlayerLayer());
            } else if (MjClient.playui.getPlayersNum() == 4) {
                MjClient.Scene.addChild(new showDistanceLayer());
            }
        }
    },
    btn_getGold: {
        _run: function() {
            this.setVisible(false); // 隐藏按钮，暂不开放
        },
        _click: function() {
            MjClient.Scene.addChild(new goldStoreLayer());
        }
    },
    btn_trust: {
        _run: function() {
            this.visible = MjClient.playui.isCoinField();
        },
        _click: function() {
            if (!MjClient.playui.isInPlay()) {
                return;
            }

            MjClient.gamenet.request("pkroom.handler.tableMsg", {
                cmd: "beTrust"
            });
        }
    },
};

jsBind_ziPai.node_down = { // down玩家节点
    _event: {
        EZP_cardType: function(eD) {
            if (eD.type == "size") {
                MjClient.playui.changeHandCardSize(this.getChildByName("img_handCard"));
                var layoutHand = this.getChildByName("layout_handCards");
                if (layoutHand) {
                    layoutHand.removeAllChildren();
                }
                MjClient.playui.refreshHandCard(0);
            }
            MjClient.playui.changeCardFrame(this, eD.type);
        }
    },
    sp_ready: {
        _layout: [[0.07, 0.07], [0.5, 0.5], [-2.5, -2.5]],
        _event: {
            initSceneData: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            startShuffleCards: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            waitJiazhu: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            addPlayer: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            removePlayer: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            onlinePlayer: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            mjhand: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            }
        }
    },
    layout_replayCards: {
        _visible: false,
        _layout: [[0.1, 0.1], [0.15, 0.05], [0, 0]],
    },
    layout_eatCards: {
        _visible: true,
        _layout: [[0.14, 0.14], [0.005, 0.23], [0, 0]],
        _run: function() {
            if (isIPhoneX()) { // 公用代码todo
                setWgtLayout(this, [0.14, 0.14], [0.045, 0.23], [0, 0]);
            }
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.initEatCard(this);
            },
            HZChiCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjchi", eD);
            },
            HZTieCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjtie", eD);
            },
            HZGangCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjgang", eD);
            },
            HZLiuCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjgang", eD);
            },
            MJPeng: function(eD) {
                MjClient.playui.updateEatCard(this, "mjpeng", eD);
            },
            HZWeiCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjwei", eD);
            },
            clearCardUI: function() {
                this.removeAllChildren();
            },
            roundEnd : function() {
                this.removeAllChildren();
                MjClient.playui.initEatCard(this, true);
                var pl = MjClient.playui.getUIPlayer(0);
                if(!pl) {
                    return
                }
                MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand, 1);

                var sData = MjClient.data.sData;
                if(sData && sData.tData.currCard == -1) {
                    //跑胡 偎胡
                    MjClient.playui.refreshHandCard(0, true);
                }
            }
        },
    },
    layout_outCards: {
        _visible: true,
        _layout: [[0.14, 0.14], [0.7, 0.5], [0, 0]],
        _event: {
            initSceneData: function() {
                MjClient.playui.initOutCard(this);
            },
            EZP_layout: function() {
                MjClient.playui.initOutCard(this);
            },
            clearCardUI: function() {
                this.removeAllChildren();
            }
        },
    },
    layout_handCards: {
        _event: {
            initSceneData: function() {
                MjClient.playui.calculateHintPutList();
                MjClient.playui.initHandCards(this);
            },
            mjhand: function() {
                MjClient.playui.initHandCards(this);
                if (MjClient.playui.cutCardView) {
                    this.visible = false;

                    //用来执行发牌动画
                    var tempLayout = this.parent.getChildByName("layout_handCards_temp");
                    if(tempLayout && cc.sys.isObjectValid(tempLayout)) {
                        tempLayout.removeFromParent(true);
                    }
                    tempLayout = this.clone();
                    tempLayout.visible = true;
                    tempLayout.setName("layout_handCards_temp");
                    this.parent.addChild(tempLayout);
                    var t = MjClient.playui.getMjhandDelay(); //MjClient.data.sData.tData.areaSelectMode.isManualCutCard ? 2 : 4;
                    var dt = cc.delayTime(t);
                    var cb = cc.callFunc(function(){
                        this.visible = true;
                        tempLayout.removeFromParent(true);
                    }.bind(this));
                    this.runAction(cc.sequence(dt, cb));

                    MjClient.playui.cutCardView.cutCardsEffect();
                }
            },
            HZPickCard: function(eD) {
                MjClient.playui.calculateHintPutList();
                MjClient.playui.updateHandCardByPick(this, eD);
            },
            HZAddCards: function(eD) {
                MjClient.playui.calculateHintPutList();
                MjClient.playui.updateHandCardByAdd(this, eD);
            },
            HZChiCard: function(eD) {
                MjClient.playui.calculateHintPutList();
                MjClient.playui.updateHandCardByEat(this, "mjchi", eD);
            },
            HZTieCard: function(eD) {
                MjClient.playui.calculateHintPutList();
                MjClient.playui.updateHandCardByEat(this, "mjtie", eD);
            },
            MJPeng: function(eD) {
                MjClient.playui.calculateHintPutList();
                MjClient.playui.updateHandCardByEat(this, "mjpeng", eD);
            },
            MJPut: function() {
                MjClient.playui.calculateHintPutList();
                MjClient.playui.updateHandCardByPut(this);
            },
            HZWeiCard: function(eD) {
                MjClient.playui.calculateHintPutList();
                MjClient.playui.updateHandCardByEat(this, "mjwei", eD);
            },
            HZGangCard: function(eD) {
                MjClient.playui.calculateHintPutList();
                MjClient.playui.updateHandCardByEat(this, "mjgang", eD);
            },
            HZLiuCard: function(eD) {
                MjClient.playui.calculateHintPutList();
                MjClient.playui.updateHandCardByEat(this, "mjgang", eD);
            },
            MJPass: function() { // 天胡 提 偎 跑后过胡
                MjClient.playui.calculateHintPutList();
                MjClient.playui.addTingSign();
            },
            waitPut: function() { // 歪胡子 歪后过胡
                MjClient.playui.calculateHintPutList();
                MjClient.playui.addTingSign();
            },
            HZCheckRaise: function() {
                MjClient.playui.calculateHintPutList();
                MjClient.playui.addTingSign();
            },
            EZP_huXi: function() {
                MjClient.playui.refreshHandCard(0);
            },
            clearCardUI: function() {
                this.removeAllChildren();
                var pl = MjClient.playui.getUIPlayer(0);
                if(pl.mjhand) {
                    MjClient.playui.calculateHintPutList();
                    MjClient.playui.refreshHandCard(0);
                }
            },
            EZP_tingPai: function() {
                if (MjClient.playui.getTingPaiType() == 1) { //关闭
                    MjClient.playui.removeTingSign();
                } else { //开启
                    MjClient.playui.calculateHintPutList();
                    MjClient.playui.refreshHandCard(0);
                }
            }
        },
    },
    img_putCard: {
        _visible: false,
        _layout: [[0.35, 0.35], [0.5, 0.6], [0, 0]],
        _run: function() {
            var userData = {
                scale: this.getScale(),
                pos: this.getPosition()
            };
            this.setUserData(userData);
            MjClient.playui.changePutCardLayout(this);
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.updatePutCard(this, null, true);
            },
            MJPut: function() {
                MjClient.playui.updatePutCard(this);
            },
            HZNewCard: function() {
                MjClient.playui.showOutCardAnimation(this);
            },
            HZNewCardDelay: function(eD) {
                MjClient.playui.updatePutCard(this, eD);
            },
            HZPickCard: function(eD) {
                MjClient.playui.showPickCardAnimation(this, eD);
            },
            HZChiCard: function() {
                this.visible = false;
            },
            HZTieCard: function() {
                this.visible = false;
            },
            HZGangCard: function(eD) {
                if (!eD.isGangHand) {
                    this.visible = false;
                }
            },
            HZLiuCard: function(eD) {
                this.visible = false;
            },
            MJPeng: function() {
                this.visible = false;
            },
            HZWeiCard: function() {
                this.visible = false;
            },
            clearCardUI: function() {
                this.visible = false;
            },
            EZP_layout: function() {
                MjClient.playui.changePutCardLayout(this);
            }
        }
    },
    img_outCard: {
        _visible: false
    },
    img_handCard: {
        _visible: false,
        _run: function() {
            this.ignoreContentAdaptWithSize(true);
            MjClient.playui.changeHandCardSize(this);
        }
    },
    layout_head: {
        _layout: [[0.1, 0.1], [0.04, 0.05], [0, 0], true],
        _run: function() {
            this.setTouchEnabled(true);
        },
        _click: function(node) {
            MjClient.playui.showPlayerInfo(node);
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.checkHeadNodeVisible(this);
            },
            addPlayer: function() {
                MjClient.playui.checkHeadNodeVisible(this);
            },
            removePlayer: function() {
                MjClient.playui.checkHeadNodeVisible(this);
            }
        },
        img_noBody: {
            _visible: true,
            _event: {
                loadWxHead: function(d) {
                    MjClient.playui.setWxHeadSprite(this, d);
                },
                initSceneData: function() {
                    MjClient.playui.setWxHead(this);
                },
                addPlayer: function() {
                    MjClient.playui.setWxHead(this);
                },
                removePlayer: function() {
                    MjClient.playui.setWxHead(this);
                }
            }
        },
        img_headFrame: {
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                MJPeng: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZNewCardDelay: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZGangCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZLiuCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZChiCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZTieCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZWeiCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                MJPut: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                trustTime: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                roundEnd: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                }
            }
        },
        img_chuiFlag: { // todo
            _run: function() {
                this.visible = false;
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkChuiFlagVisible(this);
                },
                mjhand: function() {
                    MjClient.playui.checkChuiFlagVisible(this);
                },
                startShuffleCards: function() {
                    MjClient.playui.checkChuiFlagVisible(this);
                },
                roundEnd: function() {
                    this.visible = false;
                },
                waitJiazhu: function() {
                    this.visible = false;
                },
                MJJiazhu: function() {
                    var pl = MjClient.playui.getUIPlayer(0);
                    if (pl && pl.jiachuiNum != -1) {
                        this.visible = false;
                    }
                },
                clearCardUI: function() {
                    this.visible = false;
                }
            }
        },
        img_chatBg: {
            text_chat: {
                _event: {
                    MJChat: function(msg) {
                        MjClient.playui.showUserChat(this, msg);
                    },
                    playVoice: function(voicePath) {
                        MjClient.data._tempMessage.msg = voicePath;
                        MjClient.playui.showUserChat(this, MjClient.data._tempMessage);
                    }
                }
            },
            sp_voice: {

            }
        },
        img_emoji: {},
        img_offLineBg: {
            _visible: false,
            _run: function() {
                MjClient.lastMJTick = Date.now();
                this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function() {
                    if (MjClient.game_on_show) MjClient.tickGame(0);
                }), cc.delayTime(7))));
            },
        },
        img_offLine: {
            _visible: false,
            _run: function() {
                this.y = 80;
                this.zIndex = 99;
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                addPlayer: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                removePlayer: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                onlinePlayer: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                playerStatusChange: function() {
                    MjClient.playui.checkOfflineVisible(this);
                }
            }
        },
        img_fangZhu: {
            _visible: false,
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkFangZhuVisible(this);
                },
                addPlayer: function() {
                    MjClient.playui.checkFangZhuVisible(this);
                },
                removePlayer: function() {
                    MjClient.playui.checkFangZhuVisible(this);
                }
            }
        },
        img_nameBg: {
            _visible: false,
        },
        text_name: {
            _visible: true,
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.setNickName(this);
                },
                addPlayer: function() {
                    MjClient.playui.setNickName(this);
                },
                removePlayer: function() {
                    MjClient.playui.setNickName(this);
                }
            }
        },
        img_zhuang: {
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkZhuangVisible(this);
                },
                mjhand: function() {
                    MjClient.playui.checkZhuangVisible(this);
                }
            }
        },
        img_trustFlag: {
            _run: function() {
                this.visible = false;
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                },
                cancelTrust: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                },
                beTrust: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                },
                roundEnd: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                }
            }
        },
        text_trustCountDown: {
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                MJPeng: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZNewCardDelay: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZGangCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZLiuCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZChiCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZTieCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZWeiCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                MJPut: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                trustTime: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                roundEnd: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                }
            }
        },
        text_coinNum: {
            _visible: true,
            _event: {
                initSceneData: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                addPlayer: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                removePlayer: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                mjhand: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                roundEnd: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                updateInfo: function(d) { // 金币场更新金币
                    if (d && d.gold) {
                        MjClient.playui.setPlayerCoin(this);
                    }
                }
            }
        },
        text_huXiNum: {
            _event: {
                initSceneData: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZPickCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZAddCards: function() {
                    MjClient.playui.updateHuXi(this);
                },
                mjhand: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZChiCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZTieCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                MJPeng: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZGangCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZLiuCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZWeiCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                LY_addHandHuXi: function() {
                    MjClient.playui.updateHuXi(this);
                },
                clearCardUI: function() { // 小结算点准备 清理
                    this.setString("");
                }
            }
        },
        img_waitCountDown: {
            _visible: false
        }
    },
    layout_eatDisplay: {
        _run: function() {
            if (MjClient.playui.isAniParallel()) {
                setWgtLayout(this, [0.2, 0.2], [0.5, 0.45], [0, 0.5]);
            } else {
                setWgtLayout(this, [0.12, 0.12], [0.5, 0.45], [0, 0]);
            }
        },
        img_chi: {
            _visible: false
        },
        img_peng: {
            _visible: false
        },
        img_ti: {
            _visible: false
        },
        img_hu: {
            _visible: false
        },
        img_wei: {
            _visible: false
        },
        img_pao: {
            _visible: false
        },
        _event: {
            HZChiCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjchi", eD);
            },
            HZTieCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjtie", eD);
            },
            HZGangCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjgang", eD);
            },
            HZLiuCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjgang", eD);
            },
            MJPeng: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjpeng", eD);
            },
            HZWeiCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjwei", eD);
            },
            MJHu: function(eD) {
                MjClient.playui.displayEatLabel(this, "hu", eD);
            },
        }
    },
};

jsBind_ziPai.node_right = { // right玩家节点
    _event: {
        EZP_cardType: function(eD) {
            MjClient.playui.changeCardFrame(this, eD.type);
        }
    },
    sp_ready: {
        _layout: [[0.07, 0.07], [0.5, 0.5], [2.5, 2.5]],
        _event: {
            initSceneData: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            startShuffleCards: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            waitJiazhu: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            addPlayer: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            removePlayer: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            onlinePlayer: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            mjhand: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            }
        }
    },
    layout_replayCards: {
        _visible: true,
        _layout: [[0.1, 0.1], [0.85, 0.81], [0, 0]],
        _event: {
            initSceneData: function() {
                MjClient.playui.initHandCards(this);
            },
            mjhand: function() {
                MjClient.playui.initHandCards(this);
            },
            HZPickCard: function(eD) {
                MjClient.playui.updateHandCardByPick(this, eD);
            },
            HZAddCards: function(eD) {
                MjClient.playui.updateHandCardByAdd(this, eD);
            },
            MJPut: function() {
                MjClient.playui.updateHandCardByPut(this);
            },
            HZChiCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjchi", eD);
            },
            HZTieCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjtie", eD);
            },
            MJPeng: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjpeng", eD);
            },
            HZWeiCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjwei", eD);
            },
            HZGangCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjgang", eD);
            },
            HZLiuCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjgang", eD);
            },
        }
    },
    layout_eatCards: {
        _visible: true,
        _layout: [[0.14, 0.14], [1 - 0.005, 0.75], [0, 0]],
        _event: {
            initSceneData: function() {
                MjClient.playui.initEatCard(this);
            },
            HZChiCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjchi", eD);
            },
            HZTieCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjtie", eD);
            },
            HZGangCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjgang", eD);
            },
            HZLiuCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjgang", eD);
            },
            MJPeng: function(eD) {
                MjClient.playui.updateEatCard(this, "mjpeng", eD);
            },
            HZWeiCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjwei", eD);
            },
            clearCardUI: function() {
                this.removeAllChildren();
            },
            roundEnd : function() {
                this.removeAllChildren();
                MjClient.playui.initEatCard(this, true);
            }
        },
    },
    layout_outCards: {
        _visible: true,
        // _layout : [[0.14, 0.14], [1-0.005, 0.835], [0, 0]],
        _run: function() {
            setWgtLayout(this, [0.14, 0.14], [1 - 0.005, 0.83 - 0.005], [0, 0]);
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.initOutCard(this);
            },
            EZP_layout: function() {
                MjClient.playui.initOutCard(this);
            },
            clearCardUI: function() {
                this.removeAllChildren();
            }
        },
    },
    img_putCard: {
        _visible: false,
        _layout: [[0.35, 0.35], [0.73, 0.75], [0, 0]],
        _run: function() {
            var userData = {
                scale: this.getScale(),
                pos: this.getPosition()
            };
            this.setUserData(userData);
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.updatePutCard(this, null, true);
            },
            MJPut: function() {
                MjClient.playui.updatePutCard(this);
            },
            HZNewCard: function() {
                MjClient.playui.showOutCardAnimation(this);
            },
            HZNewCardDelay: function(eD) {
                MjClient.playui.updatePutCard(this, eD);
            },
            HZPickCard: function(eD) {
                MjClient.playui.showPickCardAnimation(this, eD);
            },
            HZChiCard: function() {
                this.visible = false;
            },
            HZTieCard: function() {
                this.visible = false;
            },
            HZGangCard: function(eD) {
                if (!eD.isGangHand) {
                    this.visible = false;
                }
            },
            HZLiuCard: function(eD) {
                this.visible = false;
            },
            MJPeng: function() {
                this.visible = false;
            },
            HZWeiCard: function() {
                this.visible = false;
            },
            clearCardUI: function() {
                this.visible = false;
            }
        }
    },
    img_outCard: {
        _visible: false
    },
    layout_head: {
        _layout: [[0.1, 0.1], [0.96, 0.87], [0, 0], true],
        _run: function() {
            this.setTouchEnabled(true);
        },
        _click: function(node) {
            MjClient.playui.showPlayerInfo(node);
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.checkHeadNodeVisible(this);
            },
            addPlayer: function() {
                MjClient.playui.checkHeadNodeVisible(this);
            },
            removePlayer: function() {
                MjClient.playui.checkHeadNodeVisible(this);
            }
        },
        img_noBody: {
            _visible: true,
            _event: {
                loadWxHead: function(d) {
                    MjClient.playui.setWxHeadSprite(this, d);
                },
                initSceneData: function() {
                    MjClient.playui.setWxHead(this);
                },
                addPlayer: function() {
                    MjClient.playui.setWxHead(this);
                },
                removePlayer: function() {
                    MjClient.playui.setWxHead(this);
                }
            }
        },
        img_headFrame: {
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                MJPeng: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZNewCardDelay: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZGangCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZLiuCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZChiCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZTieCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZWeiCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                MJPut: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                trustTime: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                roundEnd: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                }
            }
        },
        img_chuiFlag: {
            _run: function() {
                this.visible = false;
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkChuiFlagVisible(this);
                },
                mjhand: function() {
                    MjClient.playui.checkChuiFlagVisible(this);
                },
                startShuffleCards: function() {
                    MjClient.playui.checkChuiFlagVisible(this);
                },
                roundEnd: function() {
                    this.visible = false;
                },
                waitJiazhu: function() {
                    this.visible = false;
                },
                MJJiazhu: function() {
                    var pl = MjClient.playui.getUIPlayer(MjClient.playui.getUIOffByNodeName('node_right'));
                    if (pl && pl.jiachuiNum != -1) {
                        this.visible = false;
                    }
                },
                clearCardUI: function() {
                    this.visible = false;
                }
            }
        },
        img_chatBg: {
            text_chat: {
                _event: {
                    MJChat: function(msg) {
                        MjClient.playui.showUserChat(this, msg);
                    },
                    playVoice: function(voicePath) {
                        MjClient.data._tempMessage.msg = voicePath;
                        MjClient.playui.showUserChat(this, MjClient.data._tempMessage);
                    }
                }
            },
            sp_voice: {

            }
        },
        img_emoji: {

        },
        img_offLineBg: {
            _visible: false,
        },
        img_offLine: {
            _visible: false,
            _run: function() {
                this.y = 80;
                this.zIndex = 99;
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                addPlayer: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                removePlayer: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                onlinePlayer: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                playerStatusChange: function() {
                    MjClient.playui.checkOfflineVisible(this);
                }
            }
        },
        img_fangZhu: {
            _visible: false,
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkFangZhuVisible(this);
                },
                addPlayer: function() {
                    MjClient.playui.checkFangZhuVisible(this);
                },
                removePlayer: function() {
                    MjClient.playui.checkFangZhuVisible(this);
                }
            }
        },
        img_nameBg: {
            _visible: false,
        },
        text_name: {
            _visible: true,
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.setNickName(this);
                },
                addPlayer: function() {
                    MjClient.playui.setNickName(this);
                },
                removePlayer: function() {
                    MjClient.playui.setNickName(this);
                }
            }
        },
        img_zhuang: {
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkZhuangVisible(this);
                },
                mjhand: function() {
                    MjClient.playui.checkZhuangVisible(this);
                }
            }
        },
        img_trustFlag: {
            _run: function() {
                this.visible = false;
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                },
                cancelTrust: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                },
                beTrust: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                },
                roundEnd: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                }
            }
        },
        text_trustCountDown: {
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                MJPeng: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZNewCardDelay: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZGangCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZLiuCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZChiCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZTieCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZWeiCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                MJPut: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                trustTime: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                roundEnd: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                }
            }
        },
        text_coinNum: {
            _visible: true,
            _run: function() {
                this.setString("");
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                addPlayer: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                removePlayer: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                mjhand: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                roundEnd: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                updateInfo: function(d) {
                    // 金币场用到
                    if (d && d.gold)
                        MjClient.playui.setPlayerCoin(this);
                }
            }
        },
        text_huXiNum: {
            _event: {
                initSceneData: function() {
                    MjClient.playui.updateHuXi(this);
                },
                mjhand: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZChiCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZTieCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                MJPeng: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZGangCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZLiuCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZWeiCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                clearCardUI: function() { // 小结算点准备 清理
                    this.setString("");
                }
            }
        },
        img_waitCountDown: {
            _visible: false
        }
    },
    layout_eatDisplay: {
        _run: function() {
            if (MjClient.playui.isAniParallel()) {
                setWgtLayout(this, [0.2, 0.2], [0.8, 0.7], [0, 0.5]);
            } else {
                setWgtLayout(this, [0.12, 0.12], [0.95, 0.91], [0, 0]);
            }
        },
        img_chi: {
            _visible: false
        },
        img_peng: {
            _visible: false
        },
        img_ti: {
            _visible: false
        },
        img_hu: {
            _visible: false
        },
        img_wei: {
            _visible: false
        },
        img_pao: {
            _visible: false
        },
        _event: {
            HZChiCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjchi", eD);
            },
            HZTieCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjtie", eD);
            },
            HZGangCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjgang", eD);
            },
            HZLiuCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjgang", eD);
            },
            MJPeng: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjpeng", eD);
            },
            HZWeiCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjwei", eD);
            },
            MJHu: function(eD) {
                MjClient.playui.displayEatLabel(this, "hu", eD);
            },
        }
    },
};

jsBind_ziPai.node_left = { // left玩家节点
    _event: {
        EZP_cardType: function(eD) {
            MjClient.playui.changeCardFrame(this, eD.type);
        },
    },
    sp_ready: {
        _layout: [[0.07, 0.07], [0.5, 0.5], [-2.5, 2.5]],
        _event: {
            initSceneData: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            startShuffleCards: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            waitJiazhu: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            addPlayer: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            removePlayer: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            onlinePlayer: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            mjhand: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            }
        }
    },
    layout_replayCards: {
        visible: true,
        _layout: [[0.1, 0.1], [0.15, 0.81], [0, 0]],
        _event: {
            initSceneData: function() {
                MjClient.playui.initHandCards(this);
            },
            mjhand: function() {
                MjClient.playui.initHandCards(this);
            },
            HZPickCard: function(eD) {
                MjClient.playui.updateHandCardByPick(this, eD);
            },
            HZAddCards: function(eD) {
                MjClient.playui.updateHandCardByAdd(this, eD);
            },
            MJPut: function() {
                MjClient.playui.updateHandCardByPut(this);
            },
            HZChiCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjchi", eD);
            },
            HZTieCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjtie", eD);
            },
            MJPeng: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjpeng", eD);
            },
            HZWeiCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjwei", eD);
            },
            HZGangCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjgang", eD);
            },
            HZLiuCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjgang", eD);
            },
        }
    },
    layout_eatCards: {
        _visible: true,
        _layout: [[0.14, 0.14], [0.005, 0.76], [0, 0]],
        _run: function() {
            if (isIPhoneX()) { // 公用代码todo
                setWgtLayout(this, [0.14, 0.14], [0.045, 0.76], [0, 0]);
            }
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.initEatCard(this);
            },
            HZChiCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjchi", eD);
            },
            HZTieCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjtie", eD);
            },
            HZGangCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjgang", eD);
            },
            HZLiuCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjgang", eD);
            },
            MJPeng: function(eD) {
                MjClient.playui.updateEatCard(this, "mjpeng", eD);
            },
            HZWeiCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjwei", eD);
            },
            clearCardUI: function() {
                this.removeAllChildren();
            },
            roundEnd : function() {
                this.removeAllChildren();
                MjClient.playui.initEatCard(this, true);
            }
        },
    },
    layout_outCards: {
        _visible: true,
        // _layout : [[0.14, 0.14], [0.005, 0.84], [0, 0]],
        _run: function() {
            var ipxSpace = isIPhoneX() ? 0.04 : 0;
            setWgtLayout(this,  [0.14, 0.14], [ipxSpace + 0.005, 0.84 - 0.005], [0, 0]);
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.initOutCard(this);
            },
            EZP_layout: function() {
                MjClient.playui.initOutCard(this);
            },
            clearCardUI: function() {
                this.removeAllChildren();
            }
        },
    },
    img_putCard: {
        _visible: false,
        _layout: [[0.35, 0.35], [0.27, 0.75], [0, 0]],
        _run: function() {
            var userData = {
                scale: this.getScale(),
                pos: this.getPosition()
            };
            this.setUserData(userData);
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.updatePutCard(this, null, true);
            },
            MJPut: function() {
                MjClient.playui.updatePutCard(this);
            },
            HZNewCard: function() {
                MjClient.playui.showOutCardAnimation(this);
            },
            HZNewCardDelay: function(eD) {
                MjClient.playui.updatePutCard(this, eD);
            },
            HZPickCard: function(eD) {
                MjClient.playui.showPickCardAnimation(this, eD);
            },
            HZChiCard: function() {
                this.visible = false;
            },
            HZTieCard: function() {
                this.visible = false;
            },
            HZGangCard: function(eD) {
                if (!eD.isGangHand) {
                    this.visible = false;
                }
            },
            HZLiuCard: function(eD) {
                this.visible = false;
            },
            MJPeng: function() {
                this.visible = false;
            },
            HZWeiCard: function() {
                this.visible = false;
            },
            clearCardUI: function() {
                this.visible = false;
            }
        }
    },
    img_outCard: {
        _visible: false
    },
    layout_head: {
        _layout: [[0.1, 0.1], [0.04, 0.9], [0, 0], true],
        _run: function() {
            this.setTouchEnabled(true);
        },
        _click: function(node) {
            MjClient.playui.showPlayerInfo(node);
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.checkHeadNodeVisible(this);
            },
            addPlayer: function() {
                MjClient.playui.checkHeadNodeVisible(this);
            },
            removePlayer: function() {
                MjClient.playui.checkHeadNodeVisible(this);
            }
        },
        img_noBody: {
            _visible: true,
            _event: {
                loadWxHead: function(d) {
                    MjClient.playui.setWxHeadSprite(this, d);
                },
                initSceneData: function() {
                    MjClient.playui.setWxHead(this);
                },
                addPlayer: function() {
                    MjClient.playui.setWxHead(this);
                },
                removePlayer: function() {
                    MjClient.playui.setWxHead(this);
                }
            }
        },
        img_headFrame: {
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                MJPeng: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZNewCardDelay: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZGangCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZLiuCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZChiCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZTieCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZWeiCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                MJPut: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                trustTime: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                roundEnd: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                }
            }
        },
        img_chuiFlag: {
            _run: function() {
                this.visible = false;
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkChuiFlagVisible(this);
                },
                mjhand: function() {
                    MjClient.playui.checkChuiFlagVisible(this);
                },
                startShuffleCards: function() {
                    MjClient.playui.checkChuiFlagVisible(this);
                },
                roundEnd: function() {
                    this.visible = false;
                },
                waitJiazhu: function() {
                    this.visible = false;
                },
                MJJiazhu: function() {
                    var pl = MjClient.playui.getUIPlayer(MjClient.playui.getUIOffByNodeName('node_left'));
                    if (pl && pl.jiachuiNum != -1) {
                        this.visible = false;
                    }
                },
                clearCardUI: function() {
                    this.visible = false;
                }
            }
        },
        img_chatBg: {
            text_chat: {
                _event: {
                    MJChat: function(msg) {
                        MjClient.playui.showUserChat(this, msg);
                    },
                    playVoice: function(voicePath) {
                        MjClient.data._tempMessage.msg = voicePath;
                        MjClient.playui.showUserChat(this, MjClient.data._tempMessage);
                    }
                }
            },
            sp_voice: {

            }
        },
        img_emoji: {

        },
        img_offLineBg: {
            _visible: false,
        },
        img_offLine: {
            _visible: false,
            _run: function() {
                this.y = 80;
                this.zIndex = 99;
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                addPlayer: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                removePlayer: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                onlinePlayer: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                playerStatusChange: function() {
                    MjClient.playui.checkOfflineVisible(this);
                }
            }
        },
        img_fangZhu: {
            _visible: false,
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkFangZhuVisible(this);
                },
                addPlayer: function() {
                    MjClient.playui.checkFangZhuVisible(this);
                },
                removePlayer: function() {
                    MjClient.playui.checkFangZhuVisible(this);
                }
            }
        },
        img_nameBg: {
            _visible: false,
        },
        text_name: {
            _visible: true,
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.setNickName(this);
                },
                addPlayer: function() {
                    MjClient.playui.setNickName(this);
                },
                removePlayer: function() {
                    MjClient.playui.setNickName(this);
                }
            }
        },
        img_zhuang: {
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkZhuangVisible(this);
                },
                mjhand: function() {
                    MjClient.playui.checkZhuangVisible(this);
                }
            }
        },
        img_trustFlag: {
            _run: function() {
                this.visible = false;
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                },
                cancelTrust: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                },
                beTrust: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                },
                roundEnd: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                }
            }
        },
        text_trustCountDown: {
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                MJPeng: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZNewCardDelay: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZGangCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZLiuCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZChiCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZTieCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZWeiCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                MJPut: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                trustTime: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                roundEnd: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                }
            }
        },
        text_coinNum: {
            _visible: true,
            _run: function() {
                this.setString("");
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                addPlayer: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                removePlayer: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                mjhand: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                roundEnd: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                updateInfo: function(d) {
                    if (d && d.gold) {
                        MjClient.playui.setPlayerCoin(this);
                    }
                }
            }
        },
        text_huXiNum: {
            _event: {
                initSceneData: function() {
                    MjClient.playui.updateHuXi(this);
                },
                mjhand: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZChiCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZTieCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                MJPeng: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZGangCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZLiuCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZWeiCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                clearCardUI: function() { // 小结算点准备 清理
                    this.setString("");
                }
            }
        },
        img_waitCountDown: {
            _visible: false
        }
    },
    layout_eatDisplay: {
        _run: function() {
            if (MjClient.playui.isAniParallel()) {
                setWgtLayout(this, [0.2, 0.2], [0.2, 0.7], [0, 0.5]);
            } else {
                setWgtLayout(this, [0.12, 0.12], [0.04, 0.93], [0, 0]);
            }
        },
        img_chi: {
            _visible: false
        },
        img_peng: {
            _visible: false
        },
        img_ti: {
            _visible: false
        },
        img_hu: {
            _visible: false
        },
        img_wei: {
            _visible: false
        },
        img_pao: {
            _visible: false
        },
        _event: {
            HZChiCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjchi", eD);
            },
            HZTieCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjtie", eD);
            },
            HZGangCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjgang", eD);
            },
            HZLiuCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjgang", eD);
            },
            MJPeng: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjpeng", eD);
            },
            HZWeiCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjwei", eD);
            },
            MJHu: function(eD) {
                MjClient.playui.displayEatLabel(this, "hu", eD);
            },
        }
    }
};

jsBind_ziPai.node_xing = { // xing玩家节点
    _event: {
        EZP_cardType: function(eD) {
            MjClient.playui.changeCardFrame(this, eD.type);
        }
    },
    sp_ready: {
        _layout: [[0.07, 0.07], [0.5, 0.5], [2.5, -2.5]],
        _event: {
            initSceneData: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            startShuffleCards: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            waitJiazhu: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            addPlayer: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            removePlayer: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            onlinePlayer: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            },
            mjhand: function() {
                MjClient.playui.checkReadyFlagVisible(this);
            }
        }
    },
    layout_replayCards: {
        _visible: true,
        _layout: [[0.1, 0.1], [0.85, 0.05], [0, 0]],
        _event: {
            initSceneData: function() {
                MjClient.playui.initHandCards(this);
            },
            mjhand: function() {
                MjClient.playui.initHandCards(this);
            },
            HZPickCard: function(eD) {
                MjClient.playui.updateHandCardByPick(this, eD);
            },
            HZAddCards: function(eD) {
                MjClient.playui.updateHandCardByAdd(this, eD);
            },
            MJPut: function() {
                MjClient.playui.updateHandCardByPut(this);
            },
            HZChiCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjchi", eD);
            },
            HZTieCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjtie", eD);
            },
            MJPeng: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjpeng", eD);
            },
            HZWeiCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjwei", eD);
            },
            HZGangCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjgang", eD);
            },
            HZLiuCard: function(eD) {
                MjClient.playui.updateHandCardByEat(this, "mjgang", eD);
            },
        }
    },
    layout_eatCards: {
        _visible: true,
        _layout: [[0.14, 0.14], [1 - 0.005, 0.23], [0, 0]],
        _event: {
            initSceneData: function() {
                MjClient.playui.initEatCard(this);
            },
            HZChiCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjchi", eD);
            },
            HZTieCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjtie", eD);
            },
            HZGangCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjgang", eD);
            },
            HZLiuCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjgang", eD);
            },
            MJPeng: function(eD) {
                MjClient.playui.updateEatCard(this, "mjpeng", eD);
            },
            HZWeiCard: function(eD) {
                MjClient.playui.updateEatCard(this, "mjwei", eD);
            },
            clearCardUI: function() {
                this.removeAllChildren();
            },
            roundEnd: function() {
                this.removeAllChildren();
                MjClient.playui.initEatCard(this, true);
            }

        },
    },
    layout_outCards: {
        _visible: true,
        // _layout : [[0.14, 0.14], [1-0.005, 0.15], [0, 0]],
        _run: function() {
            setWgtLayout(this, [0.14, 0.14], [1 - 0.005, 0.15], [0, 0]);

        },
        _event: {
            initSceneData: function() {
                MjClient.playui.initOutCard(this);
            },
            EZP_layout: function() {
                MjClient.playui.initOutCard(this);
            },
            clearCardUI: function() {
                this.removeAllChildren();
            }
        },
    },
    img_putCard: {
        _visible: false,
        _layout: [[0.35, 0.35], [0.73, 0.6], [0, 0]],
        _run: function() {
            var userData = {
                scale: this.getScale(),
                pos: this.getPosition()
            };
            this.setUserData(userData);
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.updatePutCard(this, null, true);
            },
            MJPut: function() {
                MjClient.playui.updatePutCard(this);
            },
            HZNewCard: function() {
                MjClient.playui.showOutCardAnimation(this);
            },
            HZNewCardDelay: function(eD) {
                MjClient.playui.updatePutCard(this, eD);
            },
            HZPickCard: function(eD) {
                MjClient.playui.showPickCardAnimation(this, eD);
            },
            HZChiCard: function() {
                this.visible = false;
            },
            HZTieCard: function() {
                this.visible = false;
            },
            HZGangCard: function(eD) {
                if (!eD.isGangHand) {
                    this.visible = false;
                }
            },
            HZLiuCard: function(eD) {
                this.visible = false;
            },
            MJPeng: function() {
                this.visible = false;
            },
            HZWeiCard: function() {
                this.visible = false;
            },
            clearCardUI: function() {
                this.visible = false;
            }
        }
    },
    img_outCard: {
        _visible: false
    },
    layout_head: {
        _layout: [[0.1, 0.1], [0.96, 0.05], [0, 0], true],
        _run: function() {
            this.setTouchEnabled(true);
        },
        _click: function(node) {
            MjClient.playui.showPlayerInfo(node);
        },
        _event: {
            initSceneData: function() {
                MjClient.playui.checkHeadNodeVisible(this);
            },
            addPlayer: function() {
                MjClient.playui.checkHeadNodeVisible(this);
            },
            removePlayer: function() {
                MjClient.playui.checkHeadNodeVisible(this);
            }
        },
        img_noBody: {
            _visible: true,
            _event: {
                loadWxHead: function(d) {
                    MjClient.playui.setWxHeadSprite(this, d);
                },
                initSceneData: function() {
                    MjClient.playui.setWxHead(this);
                },
                addPlayer: function() {
                    MjClient.playui.setWxHead(this);
                },
                removePlayer: function() {
                    MjClient.playui.setWxHead(this);
                }
            }
        },
        img_headFrame: {
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                MJPeng: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZNewCardDelay: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZGangCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZLiuCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZChiCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZTieCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                HZWeiCard: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                MJPut: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                trustTime: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                },
                roundEnd: function() {
                    MjClient.playui.checkHeadEffectVisible(this);
                }
            }
        },
        img_chuiFlag: {
            _run: function() {
                this.visible = false;
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkChuiFlagVisible(this);
                },
                mjhand: function() {
                    MjClient.playui.checkChuiFlagVisible(this);
                },
                startShuffleCards: function() {
                    MjClient.playui.checkChuiFlagVisible(this);
                },
                roundEnd: function() {
                    this.visible = false;
                },
                waitJiazhu: function() {
                    this.visible = false;
                },
                MJJiazhu: function() {
                    var pl = MjClient.playui.getUIPlayer(MjClient.playui.getUIOffByNodeName('node_xing'));
                    if (pl && pl.jiachuiNum != -1) {
                        this.visible = false;
                    }
                },
                clearCardUI: function() {
                    this.visible = false;
                }
            }
        },
        img_chatBg: {
            text_chat: {
                _event: {
                    MJChat: function(msg) {
                        MjClient.playui.showUserChat(this, msg);
                    },
                    playVoice: function(voicePath) {
                        MjClient.data._tempMessage.msg = voicePath;
                        MjClient.playui.showUserChat(this, MjClient.data._tempMessage);
                    }
                }
            },
            sp_voice: {

            }
        },
        img_emoji: {

        },
        img_offLineBg: {
            _visible: false,
        },
        img_offLine: {
            _visible: false,
            _run: function() {
                this.y = 80;
                this.zIndex = 99;
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                addPlayer: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                removePlayer: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                onlinePlayer: function() {
                    MjClient.playui.checkOfflineVisible(this);
                },
                playerStatusChange: function() {
                    MjClient.playui.checkOfflineVisible(this);
                }
            }
        },
        img_fangZhu: {
            _visible: false,
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkFangZhuVisible(this);
                },
                addPlayer: function() {
                    MjClient.playui.checkFangZhuVisible(this);
                },
                removePlayer: function() {
                    MjClient.playui.checkFangZhuVisible(this);
                }
            }
        },
        img_nameBg: {
            _visible: false,
        },
        text_name: {
            _visible: true,
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.setNickName(this);
                },
                addPlayer: function() {
                    MjClient.playui.setNickName(this);
                },
                removePlayer: function() {
                    MjClient.playui.setNickName(this);
                }
            }
        },
        img_zhuang: {
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkZhuangVisible(this);
                },
                mjhand: function() {
                    MjClient.playui.checkZhuangVisible(this);
                }
            }
        },
        img_trustFlag: {
            _run: function() {
                this.visible = false;
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                },
                cancelTrust: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                },
                beTrust: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                },
                roundEnd: function() {
                    MjClient.playui.checkTrustFlagVisible(this);
                }
            }
        },
        text_trustCountDown: {
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                MJPeng: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZNewCardDelay: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZGangCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZLiuCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZChiCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZTieCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                HZWeiCard: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                MJPut: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                trustTime: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                },
                roundEnd: function() {
                    MjClient.playui.checkTrustCountDownVisible(this);
                }
            }
        },
        text_coinNum: {
            _visible: true,
            _run: function() {
                this.setString("");
            },
            _event: {
                initSceneData: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                addPlayer: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                removePlayer: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                mjhand: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                roundEnd: function() {
                    MjClient.playui.setCoinAndScore(this);
                },
                updateInfo: function(d) {
                    // 金币场用到
                    if (d && d.gold)
                        MjClient.playui.setPlayerCoin(this);
                }
            }
        },
        text_huXiNum: {
            _event: {
                initSceneData: function() {
                    MjClient.playui.updateHuXi(this);
                },
                mjhand: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZChiCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZTieCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                MJPeng: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZGangCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZLiuCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                HZWeiCard: function() {
                    MjClient.playui.updateHuXi(this);
                },
                clearCardUI: function() { // 小结算点准备 清理
                    this.setString("");
                }
            }
        },
        img_waitCountDown: {
            _visible: false
        }
    },
    layout_eatDisplay: {
        _run: function() {
            if (MjClient.playui.isAniParallel()) {
                setWgtLayout(this, [0.2, 0.2], [0.8, 0.25], [0, 0.5]);
            } else {
                setWgtLayout(this, [0.12, 0.12], [0.95, 0.10], [0, 0]);
            }
        },
        img_chi: {
            _visible: false
        },
        img_peng: {
            _visible: false
        },
        img_ti: {
            _visible: false
        },
        img_hu: {
            _visible: false
        },
        img_wei: {
            _visible: false
        },
        img_pao: {
            _visible: false
        },
        _event: {
            HZChiCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjchi", eD);
            },
            HZTieCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjtie", eD);
            },
            HZGangCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjgang", eD);
            },
            HZLiuCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjgang", eD);
            },
            MJPeng: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjpeng", eD);
            },
            HZWeiCard: function(eD) {
                MjClient.playui.displayEatLabel(this, "mjwei", eD);
            },
            MJHu: function(eD) {
                MjClient.playui.displayEatLabel(this, "hu", eD);
            },
        }
    }
};

jsBind_ziPai.node_eatChoice = {
    btn_guo: {
        _visible: false,
        _layout: [[0, 0.1], [0.5, 0], [4.6, 2.5]],
        _touch: function(btn, eT) {
            if (eT == 2) {
                var tData = MjClient.data.sData.tData;
                var msg = {
                    cmd: "MJPass",
                    cardNext: tData.cardNext,
                    card: tData.lastPutCard,
                    eatFlag: MjClient.playui.getSelfEatFlag()
                };
                if (MjClient.data.sData.players[SelfUid()].eatFlag & 32) {
                    MjClient.showMsg("确定过胡吗？", function() {
                        MjClient.playui.hideEatBtns();
                        MjClient.gamenet.request("pkroom.handler.tableMsg", msg);
                    }, function() {}, "1");
                } else {
                    MjClient.playui.hideEatBtns();
                    MjClient.gamenet.request("pkroom.handler.tableMsg", msg);
                }
            }
        }
    },
    btn_hu: {
        _visible: false,
        _layout: [[0, 0.1], [0.5, 0], [-3, 2.5]],
        bg_img: {
            _run: function() {
                MjClient.playui.doBtnLightAction(this);
            }
        },
        _click: function() {
            MjClient.playui.hideEatBtns();

            MjClient.gamenet.request("pkroom.handler.tableMsg", {
                cmd: "MJHu",
                eatFlag: MjClient.playui.getSelfEatFlag()
            });
        }
    },
    btn_peng: {
        _visible: false,
        _layout: [[0, 0.1], [0.5, 0], [0, 2.5]],
        bg_img: {
            _run: function() {
                MjClient.playui.doBtnLightAction(this);
            }
        },
        _click: function() {
            if (MjClient.data.sData.players[SelfUid()].eatFlag & 32) {
                MjClient.showMsg("选择碰后视为过胡，确定碰吗？", function() {
                    MjClient.playui.hideEatBtns();
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "MJPeng"
                    });
                }, function() {}, "1");
            } else {
                MjClient.playui.hideEatBtns();
                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJPeng"
                });
            }
        }
    },
    btn_chi: {
        _visible: false,
        _layout: [[0, 0.1], [0.5, 0], [1.3, 3.8]],
        bg_img: {
            run: function() {
                MjClient.playui.doBtnLightAction(this);
            }
        },
        _click: function() {
            var getFastEatCard = function() {
                if (MjClient.playui.getFastEatType()) {
                    // 快速吃牌
                    var sData = MjClient.data.sData;
                    var putCard = sData.tData.lastPutCard;
                    var pl = sData.players[SelfUid()];
                    var chiSet =MjClient.playui.getChiCards();
                    if (chiSet.length == 1) {
                        var eatCards = chiSet[0];
                        var copy = eatCards.slice();
                        copy.splice(copy.indexOf(putCard), 1);
                        if (pl.mjhand.indexOf(putCard) < 0 || copy.indexOf(putCard) >= 0) {
                            return eatCards;
                        }
                    }
                }
            };

            var eatCards = getFastEatCard();
            if (eatCards) {
                MjClient.playui.commitEatCard(eatCards);
            } else {
                MjClient.playui.showSelectEatCards();
            }
        }
    },
    btn_cancel: {
        _visible: false,
        _layout: [[0, 0.16], [0.78, 0.1], [0, 1.12]],
        _run: function() {
            this.changeLayout = function() {
                if (MjClient.playui.getPlayersNum() == 4) {
                    return;
                }
                var type = MjClient.playui.getLayoutType();
                switch (type) {
                    case 0: //偏右
                        setWgtLayout(this, [0, 0.16], [0.78, 0.3], [0, 1.12]);
                        break;
                    case 1: //传统
                        setWgtLayout(this, [0, 0.16], [0.78, 0.1], [0, 1.12]);
                        break;
                }

            }
            this.changeLayout();
        },
        _event: {
            initSceneData: function() {
                this.changeLayout();
            },
            EZP_layout: function() {
                this.changeLayout();
            }
        },
        _click: function(btn, eT) {
            MjClient.playui.updateEatBtns();
        }
    },
    img_chiSelect: {
        _visible: false,
        _run: function() {
            setWgtLayout(this, [0, 0.38], [0.5, 0.76], [0, 0]);
            this.initChiBgSize = this.getContentSize();
            this.initChiBgScale = this.scale;
        }
    },
    img_biSelect: {
        _visible: false,
        _layout: [[0, 0.38], [0.5, 0.76], [0, 0]],
    },
    img_biSelect1: {
        _visible: false,
        _layout: [[0, 0.38], [0.5, 0.76], [0, 0]],
    },
    _event: {
        clearCardUI: function() {
            MjClient.playui.updateEatBtns();
        },
        MJPass: function(data) {
            var pl = MjClient.playui.getUIPlayer(0);
            if(pl && pl.passHu){
                MjClient.showToast("你选择了过，暂时放弃胡牌");
            }
            MjClient.playui.updateEatBtns(data);
        },
        mjhand: function(data) {
            MjClient.playui.updateEatBtns(data);
        },
        HZNewCardDelay: function(data) {
            MjClient.playui.updateEatBtns(data);
        },
        MJPut: function(data) {
            MjClient.playui.updateEatBtns(data);
        },
        HZGangCard: function(data) {
            MjClient.playui.updateEatBtns(data);
        },
        HZLiuCard: function(data) {
            MjClient.playui.updateEatBtns(data);
        },
        MJPeng: function(data) {
            MjClient.playui.updateEatBtns(data);
        },
        HZChiCard: function(data) {
            MjClient.playui.updateEatBtns(data);
        },
        HZTieCard: function(data) {
            MjClient.playui.updateEatBtns(data);
        },
        HZWeiCard: function(eD) {
            MjClient.playui.updateEatBtns(eD);
        },
        MJHu: function(eD) {
            MjClient.playui.updateEatBtns(eD);
        },
        roundEnd: function(eD) {
            MjClient.playui.updateEatBtns(eD);
        },
        initSceneData: function(eD) {
            MjClient.playui.updateEatBtns(eD);
        },
        HZCheckRaise: function(data) {
            MjClient.playui.updateEatBtns(data);
        },
        HZUpdateEatFlag: function(data) {
            MjClient.playui.updateEatBtns(data);
        },
        waitLiu:function (data) {
            MjClient.playui.updateEatBtns(data);
        },
        EZP_layout: function() {
            MjClient.playui.updateEatBtns();
        }
    }
};

util.deepFreeze(jsBind_ziPai); // 冻结

var playLayer_ziPai = cc.Layer.extend({
    getJsBind: function() {
        return {};
    },
    ctor: function(json) {
        this.shuffleList = [];  //洗牌玩家
        this.initSpriteFrame();
        this._super();
        this.initDefaultSettingKey();
        var playui = ccs.load(json);
        MjClient.playui = this;

        playMusic("bgHongZi");

        this.jsBind = this.getJsBind();
        util.assign(this.jsBind, jsBind_ziPai); // 拷贝base jsBind
        var list = ["node_xing", "node_left", "node_right"]; // 屏蔽用不到的玩家节点
        for (var i = 0; i < list.length; i++) {
            var name = list[i];
            if (this.getUIOffByNodeName(name) == -1) {
                this.jsBind[name] = {
                    _visible: false
                }
            }
        }

        BindUiAndLogic(playui.node, this.jsBind);
        this.addChild(playui.node);

        if (this.getPlayersNum() < 4) {
            this.changeLayout(playui.node);
        }

        // 切牌发牌
        if (MjClient.rePlayVideo == -1 && this.isNeedShuffle()) {
            this.cutCardView = new Shuffle_ZiPai();
            playui.node.addChild(this.cutCardView);
        }

        // 听牌提示
        var tingLayer = this.isCheckTingStats() ? new tingPanel_ziPai() : new tingLayer_ziPai();
        playui.node.addChild(tingLayer);

        // 听牌提示(出牌时)
        if (this.hasTingByPut()) {
            var tingByPutLayer = new tingByPutLayer_ziPai();
            this.addChild(tingByPutLayer);
        }

        //绑定4个玩家节点
        this._downNode = playui.node.getChildByName('node_down');
        this._rightNode = playui.node.getChildByName('node_right');
        this._topNode = playui.node.getChildByName('node_left');
        this._xingNode = playui.node.getChildByName('node_xing');
        this._AniNode = playui.node.getChildByName('node_eatChoice');
        this._AniNode.setLocalZOrder(1);

        addClubYaoqingBtn(5); // 亲友圈邀请圈友
        addClub_BackHallBtn(true, [[0.036, 0], [0.84, 0.95], [0, 0]], [[0.036, 0], [0.84, 0.95], [0, 0]]); // 亲友圈返回大厅 by_jcw

        var node_proxy = new cc.Node(); // 延时发牌事件转发 节点
        this.addChild(node_proxy);
        BindUiAndLogic(node_proxy, {
            _event: {
                initSceneData: function() {
                    this.stopAllActions();
                },
                HZNewCard: function(eD) {
                    MjClient.playui.checkDelayNewCard(this, eD);
                },
                HZNewCardDelay: function(eD) {
                    if (!MjClient.playui.isShowCardBack(eD)) {
                        playEffectInPlay(eD.newCard);
                    }
                },
            }
        });

        if (this.isHasTrust()) {
            //托管层
            this.trustLayer = new TrustLayer_ziPai();
            this.addChild(this.trustLayer);
            this.trustLayer.visible = false;
        }
        return true;
    }
});

// 是否需要切牌动画
playLayer_ziPai.prototype.isNeedShuffle = function() {
    return true;
};

// 是否满员
playLayer_ziPai.prototype.isTableFull = function() {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    return Object.keys(sData.players).length == tData.maxPlayer;
};

// 是否在对战中 (可操作牌)
playLayer_ziPai.prototype.isInPlay = function() {
    var tData = MjClient.data.sData.tData;
    if (tData.tState == TableState.waitCard || tData.tState == TableState.waitPut || tData.tState == TableState.waitEat) {
        return true;
    }

    return false;
};

// 2人布局 对家在左上还是右上
playLayer_ziPai.prototype.isLeftTop = function() {
    return true;
};

// 是否当前操作玩家
// @para off 相对down位置偏移量
playLayer_ziPai.prototype.isCurPlayer = function(off) {
    return this.getIndexInUids(off) == MjClient.data.sData.tData.curPlayer;
};

// 是否当前吃牌玩家
playLayer_ziPai.prototype.isCurEatPlayer = function(msg, off) {
    if (msg && msg.isGangHand) {
        return (msg.cpginfo.uid == this.getUIPlayer(off).info.uid);
    } else {
        return this.isCurPlayer(off);
    }
};

// 摸牌是否显示牌背
playLayer_ziPai.prototype.isShowCardBack = function(msg, node, isReconnect) {
    return msg && SelfUid() != msg.uid && (msg.isDrawCard || (msg.mjHide && msg.mjHide.indexOf(msg.newCard) >= 0));
};

// 是否金币场
playLayer_ziPai.prototype.isCoinField = function() {
    return MjClient.data.sData.tData.fieldId;
};

// 是否托管中
playLayer_ziPai.prototype.isInTrust = function(uid) {
    return MjClient.data.sData.players[uid].trust && MjClient.data.sData.tData.areaSelectMode.trustTime > 0
};

// 是否放偎
playLayer_ziPai.prototype.isOtherWei = function(card) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    for (var i = 0; i < tData.uids.length; ++i) {
        var uid = tData.uids[i];
        var pl = sData.players[uid];
        if (uid == SelfUid()) {
            continue;
        }

        for (var j = 0; j < pl.mjwei.length; ++j) {
            if (pl.mjwei[j] == card && this.getCardShowType(card, this.getUIOffByUid(uid)) != 0) {
                return true;
            }
        }

    }

    return false;
};

playLayer_ziPai.prototype.getPlayersNum = function() {
    return MjClient.data.sData.tData.maxPlayer;
};

// 获取玩家index
// @param off 相对down位置偏移量
playLayer_ziPai.prototype.getIndexInUids = function(off) {
    var tData = MjClient.data.sData.tData;
    return (tData.uids.indexOf(SelfUid()) + off) % this.getPlayersNum();
};

// @param off 相对down位置偏移量 （坐醒玩法重载）
playLayer_ziPai.prototype.getUIPlayer = function(off) {
    if ([0, 1, 2, 3].indexOf(off) < 0) {
        return null;
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var idx = (tData.uids.indexOf(SelfUid()) + off) % this.getPlayersNum();

    return sData.players[tData.uids[idx]];
};

// 获取玩家节点
// @param off 相对down位置偏移量
playLayer_ziPai.prototype.getUINode = function(off) {
    var jsBind = MjClient.playui.jsBind;
    var bindList = [];
    switch (this.getPlayersNum()) {
        case 2:
            if (this.isLeftTop()) {
                bindList = [jsBind.node_down, jsBind.node_left];
            } else {
                bindList = [jsBind.node_down, jsBind.node_right];
            }
            break;
        case 3:
            bindList = [jsBind.node_down, jsBind.node_right, jsBind.node_left];
            break;
        case 4: // 坐醒玩法 另外重载
            bindList = [jsBind.node_down, jsBind.node_xing, jsBind.node_right, jsBind.node_left];
            break;
    }
    return bindList[off]._node;
};

// 获取相对down位置偏移量 
// @param uid
playLayer_ziPai.prototype.getUIOffByUid = function(uid) {
    var tData = MjClient.data.sData.tData;
    var off = (tData.uids.indexOf(uid) + tData.maxPlayer - tData.uids.indexOf(SelfUid())) % tData.maxPlayer;
    return off;
};

// 获取玩家节点 
// @param uid
playLayer_ziPai.prototype.getUINodeByUid = function(uid) {
    var off = this.getUIOffByUid(uid);
    return this.getUINode(off);
};

// 获取相对down位置偏移量  
// @param name  玩家节点名字
playLayer_ziPai.prototype.getUIOffByNodeName = function(name) {
    var off = -1;
    switch (name) {
        case 'node_down':
            off = 0;
            break;
        case 'node_xing':
            if (this.getPlayersNum() == 4) {
                off = 1;
            }
            break;
        case 'node_right':
            if (this.getPlayersNum() == 2) {
                if (!this.isLeftTop()) {
                    off = 1;
                }
            } else {
                off = this.getPlayersNum() - 2;
            }
            break;
        case 'node_left':
            if (this.getPlayersNum() == 2) {
                if (this.isLeftTop()) {
                    off = 1;
                }
            } else {
                off = this.getPlayersNum() - 1;
            }
            break;
    }

    return off;
};

// 获取相对down位置偏移量  
// @param 节点(玩家节点 或其下层节点)
playLayer_ziPai.prototype.getUIOffByNode = function(node) {
    var nameList = ["node_down", "node_xing", "node_right", "node_left"];
    var name = node.getName();
    var level = 3;

    while (level--) { // 遍历找上层的玩家节点
        if (nameList.indexOf(name) >= 0) {
            break;
        }

        node = node.getParent();
        if (!cc.sys.isObjectValid(node)) {
            break;
        }
        name = node.getName();
    }

    return this.getUIOffByNodeName(name);
};

// 局数
playLayer_ziPai.prototype.updateRoundLabel = function(node) {
    node.visible = false;
    var tData = MjClient.data.sData.tData;
    if (MjClient.playui.isCoinField()) {
        return;
    }

    if (!this.isInPlay() && tData.tState != TableState.roundFinish) {
        return;
    }

    node.visible = true;
    var extraNum = tData.extraNum ? tData.extraNum:0;
    node.setString((tData.roundAll - tData.roundNum + 1 + extraNum) + "/" + tData.roundAll + "局");
};

// 理牌按钮 
playLayer_ziPai.prototype.checkSortBtnVisible = function(node) {
    node.visible = false;

    if (this.isInPlay()) {
        node.visible = true;
    }
};

// 准备按钮
playLayer_ziPai.prototype.checkReadyBtnVisible = function(node) {
    node.visible = false;
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    if (!this.isTableFull()) {
        return;
    }

    var pl = this.getUIPlayer(0);
    if (pl.mjState == TableState.waitReady && tData.tState == TableState.waitReady) {
        node.visible = true;
    }
};

// 邀请好友按钮 等待玩家加入动画
playLayer_ziPai.prototype.checkInviteVisible = function(node) {
    node.visible = false;

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if (tData.fieldId) {
        return;
    }
    node.visible = !this.isTableFull();
};

// 退出房间按钮
playLayer_ziPai.prototype.checkExitBtnVisible = function(node) {
    node.visible = false;

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if (!this.isTableFull()) {
        node.visible = true;
        return;
    }

    var pl = this.getUIPlayer(0);
    if (pl.mjState == TableState.waitReady) {
        node.visible = true;
    }
};

// 出牌线&出牌手指动画
playLayer_ziPai.prototype.checkCutLineVisible = function(node) {
    var cutLine = node || this.jsBind.img_cutLine._node;
    var finger = this.jsBind.img_finger._node

    cutLine.visible = false;
    finger.visible = false;
    if (MjClient.hasPut) {
        return;
    }

    var tData = MjClient.data.sData.tData;
    if (IsTurnToMe()) {
        var status = (tData.tState == TableState.waitPut || this.checkPutSpecil());
        cutLine.visible = status;

        finger.visible = status && this.getChuPaiGuide() == 0;

        if(!finger.getChildByName("animSprite")){
            var animSprite = new cc.Sprite("playing/fingerEffer/finger0.png");
            animSprite.x = 120;
            animSprite.y = 120;
            finger.addChild(animSprite);
            animSprite.setName("animSprite");
            var action = createAnimation("playing/fingerEffer/finger",13,cc.rect(0, 0,166,195),0.07);
            animSprite.runAction(cc.sequence([action]).repeatForever());
        }
    }
};

// 准备标志
playLayer_ziPai.prototype.checkReadyFlagVisible = function(node) {
    node.visible = false;
    if (MjClient.rePlayVideo != -1) {
        return;
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if (!this.isTableFull()) {
        return;
    }

    if (!this.isInPlay() && tData.tState != TableState.waitReady && tData.tState != TableState.roundFinish) {
        return;
    }

    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl || pl.mjState != TableState.isReady) {
        return;
    }

    node.visible = true;
};

// 整个头像节点是否可见
playLayer_ziPai.prototype.checkHeadNodeVisible = function(node) {
    var off = this.getUIOffByNode(node);
    node.setVisible(this.getUIPlayer(off));
};

//设置微信头像纹理 (这里没合并到setWxHeadSprite, 是考虑到可以同步logic中loadWxHead接口)
playLayer_ziPai.prototype.setWxHead = function(node) {
    var off = this.getUIOffByNode(node);
    var pl = MjClient.playui.getUIPlayer(off);
    if (pl && pl.info) {
        MjClient.loadWxHead(pl.info.uid, pl.info.headimgurl);
    }
};

//真正设置微信头像
playLayer_ziPai.prototype.setWxHeadSprite = function(node, d) {
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl || !pl.info) {
        return;
    }
    if (d.uid == pl.info.uid) {
        var wxHead = node.getChildByName("WxHead");
        if (wxHead)
            wxHead.removeFromParent();

        var sp = new cc.Sprite(d.img);
        sp.setName("WxHead");
        node.addChild(sp);
        setWgtLayout(sp, [0.87, 0.87], [0.5, 0.5], [0, 0], false, true);
    }
};

// 昵称
playLayer_ziPai.prototype.setNickName = function(node) {
    node.setString("");
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl || !pl.info) {
        return;
    }
    var name = unescape(pl.info.nickname);
    node.setString(getNewName(name));
};

// 头像转圈动画
playLayer_ziPai.prototype.checkHeadEffectVisible = function(node) {
    var tData = MjClient.data.sData.tData;
    if (tData.tState == TableState.waitReady || tData.tState == TableState.roundFinish) {
        return;
    }
    var head = node;
    if (!cc.sys.isObjectValid(head)) {
        return;
    }
    var off = this.getUIOffByNode(node);
    if (off == -1) {
        node.visible = false;
        return;
    }

    node.visible = true;
    var tag1 = 2018322;
    var tag2 = 2018323;
    head.removeChildByTag(tag1, true);
    head.removeChildByTag(tag2, true);
    if (this.isCurPlayer(off)) {
        cc.spriteFrameCache.addSpriteFrames("playing/paohuzi/effect/head_particle.plist", "playing/paohuzi/effect/head_particle.png");
        var createHeadAnimate = function (preName, count, dt) {
            var frames = [];
            for(var i = 1; i <= count; i++){
                frames.push(cc.spriteFrameCache.getSpriteFrame(preName + i + ".png"));
            }
            return new cc.Animate(new cc.Animation(frames, dt));
        };
        var time = 12;
        var deayTime = 2;
        var head_effect = new cc.ProgressTimer(new cc.Sprite("playing/paohuzi/effect/djs0001.png"));
        head_effect.setPosition(head.width / 2, head.height / 2);
        head_effect.type = cc.ProgressTimer.TYPE_RADIAL;
        head_effect.setTag(tag1);
        head_effect.scale = node.width / head_effect.width;
        head_effect.setPercentage(100);
        head_effect.setReverseDirection(true);
        head.addChild(head_effect);
        head_effect.runAction(cc.sequence(cc.progressFromTo(time, 100, 0), cc.callFunc(function () {
            head_effect.setPercentage(100);
            head_effect.opacity = 0;
            head_effect.runAction(cc.fadeTo(deayTime, 255));
        }), cc.delayTime(deayTime)).repeatForever());

        var head_particle = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("head_paticler_1.png"));
        head.addChild(head_particle);
        head_particle.setTag(tag2);
        head_particle.x = node.width / 2;
        head_particle.y = node.height + 3;
        head_particle.scale = node.width / head_particle.width - 0.2;
        head_particle.runAction(createHeadAnimate("head_paticler_", 13, 0.05).repeatForever());
        head_particle.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
            var ac1 = cc.moveBy(time / 8, cc.p(node.width / 2, 0));
            var ac2 = cc.moveBy(time / 4, cc.p(0, -node.height));
            var ac3 = cc.moveBy(time / 4, cc.p(-node.width, 0));
            var ac4 = cc.moveBy(time / 4, cc.p(0, node.height));
            var ac5 = cc.moveBy(time / 8, cc.p(node.width / 2, 0));
            var ac6 = cc.delayTime(deayTime);
            head_particle.runAction(cc.sequence(ac1, ac2, ac3, ac4, ac5, ac6).repeatForever());
        })));
    }
};

playLayer_ziPai.prototype.checkTrustCountDownVisible = function(node) {
    var off = this.getUIOffByNode(node);
    node.setString("");
    node.unscheduleAllCallbacks();
    if (!this.isInPlay() || MjClient.rePlayVideo != -1) {
        return;
    }
    if (this.isCurPlayer(off)) {
        node.visible = true;
        var time = util.Timer.getCountdownByTime(MjClient.data.sData.tData.trustEnd);
        if (time > 0) {
            node.schedule(function() {
                var time = util.Timer.getCountdownByTime(MjClient.data.sData.tData.trustEnd);
                this.setString("" + time);
                if (time <= 0) {
                    this.setString("");
                    this.unscheduleAllCallbacks();
                }
            }, 1);
        }
    }
};

// 房主
playLayer_ziPai.prototype.checkFangZhuVisible = function(node) {
    node.visible = false;
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl || !pl.info) {
        return;
    }

    var tData = MjClient.data.sData.tData;
    node.visible = tData.owner == pl.info.uid;
};

// 庄
playLayer_ziPai.prototype.checkZhuangVisible = function(node) {
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
        node.visible = true;
    }
};

// 加锤标志
playLayer_ziPai.prototype.checkChuiFlagVisible = function(node) {
    node.visible = false;
};

// 托管标志
playLayer_ziPai.prototype.checkTrustFlagVisible = function(node) {
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return;
    }

    var tData = MjClient.data.sData.tData;
    node.visible = !!pl.trust;
    if (this.trustLayer && off == 0) {
        this.trustLayer.visible = false;
        if (!pl || !pl.trust) {
            return;
        }
        var isShow = false;
        if (tData.tState != TableState.roundFinish) {
            isShow = true;
        } else {
            // roundEnd时  整场托管 && 非回放
            if (tData.areaSelectMode.isTrustWhole && MjClient.rePlayVideo == -1) {
                isShow = true;
            }
        }
        if (isShow) {
            this.trustLayer.visible = true;
            if(MjClient.movingCard_paohuzi && cc.sys.isObjectValid(MjClient.movingCard_paohuzi)){
                MjClient.movingCard_paohuzi.removeFromParent(true);
                MjClient.movingCard_paohuzi = null;
                delete MjClient.moveCard;
                MjClient.playui.refreshHandCard(0);
            }

        }
    }
};

// 离线状态
playLayer_ziPai.prototype.checkOfflineVisible = function(node) {
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return;
    }

    node.visible = !pl.onLine;

    node.unscheduleAllCallbacks();
    if (!pl.onLine) {
        node.visible = true;
        node.schedule(function() {
            var _timeNode = node.getChildByName("offLineTime");
            if (!_timeNode) {
                _timeNode = new ccui.Text();
                _timeNode.setName("offLineTime");
                _timeNode.setFontSize(22);
                node.addChild(_timeNode);
            } else {
                _timeNode.visible = true;
            }

            _timeNode.setPosition(cc.p(node.getContentSize().width / 2, node.getContentSize().height * 0.8));
            if (pl.offLineTime) {
                var _currentTime = new Date().getTime();
                var _showTime = _currentTime - pl.offLineTime;
                _timeNode.setString(MjClient.dateFormat(new Date(_showTime), "mm:ss"));
            } else {
                _timeNode.setString("");
            }
        });
    }
};

// 设置玩家金币
playLayer_ziPai.prototype.setPlayerCoin = function(node) {
    var head = node.getParent();
    if (!cc.sys.isObjectValid(head))
        return;

    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return;
    }

    var tData = MjClient.data.sData.tData;

    //金币场添加金币，金币图标
    var showJinBi = tData.fieldId;
    var jinbiIcon = head.getChildByName("jinbiIcon");
    var jinbi = head.getChildByName("jinbi");
    if (!showJinBi) {
        return;
    }

    node.setString("");
    if (!jinbiIcon) {
        var jinbiBg = ccui.ImageView("playing/gameTable/gold/di_jinbi.png");
        jinbiBg.setAnchorPoint(0, 0.5);
        head.addChild(jinbiBg);

        jinbiIcon = ccui.ImageView("playing/gameTable/jinbi.png");
        jinbiIcon.setAnchorPoint(0.5, 0.5);
        jinbiIcon.setPosition(node.getPositionX() + 10, node.getPositionY());
        if (node.getName() == "node_right") {
            jinbiIcon.setPosition(node.getPositionX() - 90, node.getPositionY());
        }
        jinbiIcon.setName("jinbiIcon");
        head.addChild(jinbiIcon);

        jinbiBg.x = jinbiIcon.x - 10;
        jinbiBg.y = jinbiIcon.y;
    }
    if (!jinbi) {
        jinbi = new ccui.Text();
        jinbi.setFontSize(20);
        jinbi.setAnchorPoint(0.5, 0.5);
        jinbi.setPosition(node.getPositionX() + 5, node.getPositionY());
        jinbi.setName("jinbi");
        head.addChild(jinbi);
    }
    jinbi.ignoreContentAdaptWithSize(true);
    if (tData.fieldFee) {
        if (tData.roundNum <= 0) { //结算后台费已经扣了不用再减去台费
            jinbi.setString(getJinbiStr(Number(pl.info.gold)));
        } else {
            jinbi.setString(getJinbiStr(Number(pl.info.gold - tData.fieldFee)));
        }
    } else {
        jinbi.setString(getJinbiStr(pl.info.gold));
    }
    jinbi.setPositionX(jinbiIcon.getPositionX() + jinbi.width / 2 + jinbiIcon.width / 2 + 10);
};

// 设置玩家分数
playLayer_ziPai.prototype.setPlayerScore = function(node) {
    var head = node.getParent();
    if (!cc.sys.isObjectValid(head))
        return;

    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return;
    }

    var tData = MjClient.data.sData.tData;

    //先判断移除金币，金币图标
    var showJinBi = tData.fieldId;
    head.removeChildByName("jinbiIcon")
    head.removeChildByName("jinbi")

    if (showJinBi) {
        return;
    }

    //分数
    var score = this.getPlayerScore(off);
    node.setString(score);
    node.ignoreContentAdaptWithSize(true);
    //node.width += 36; //防止显示不完整
};

// 分数
playLayer_ziPai.prototype.getPlayerScore = function(off) {
    var pl = this.getUIPlayer(off);
    if (!pl)
        return;
    var tData = MjClient.data.sData.tData;
    var score = tData.initCoin + pl.winall;
    if (tData.isFanBei) {
        score = tData.initCoin + pl.winall * 0.5;
    }

    return score;
};

//设置玩家牌局中头像的金币和分数
playLayer_ziPai.prototype.setCoinAndScore = function(node) {
    if (MjClient.data.sData.tData.fieldId) {
        this.setPlayerCoin(node);
    } else {
        this.setPlayerScore(node);
    }
};

// 胡息
playLayer_ziPai.prototype.updateHuXi = function(node) {
    node.setString("");
    if (!this.isInPlay()) {
        return;
    }

    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return;
    }

    node.setVisible(true);
    var huXi = this.calculateHuXi(off);
    node.setString("胡息:" + huXi);
};

playLayer_ziPai.prototype.calculateHuXi = function(off) {
    var pl = this.getUIPlayer(off);
    //var huxi = MjClient.huzi.getHuxi({}, pl, null, false);
    var huxi = this.getTableHuXi(off);

    if (off == 0) {
        huxi += MjClient.majiang.getHandHuxi(MjClient.HandCardArr);
    }

    return huxi;
};

playLayer_ziPai.prototype.getTableHuXi = function(off) {
    var pl = this.getUIPlayer(off);
    if (!pl) {
        return 0;
    }

    var score = 0;
    // 提
    for (var i = 0; i < pl.mjgang1.length; i++) {
        if (this.getCardShowType(pl.mjgang1[i], off) != 0) {
            score += pl.mjgang1[i] < 20 ? 9 : 12;
        }
    }

    // 跑
    for (var i = 0; i < pl.mjgang0.length; i++) {
        score += pl.mjgang0[i] < 20 ? 6 : 9;
    }

    // 偎
    pl.mjwei = pl.mjwei || [];
    for (var i = 0; i < pl.mjwei.length; i++) {
        if (this.getCardShowType(pl.mjwei[i], off) != 0) {
            score += pl.mjwei[i] < 20 ? 3 : 6;
        }
    }

    // 碰
    pl.mjpeng = pl.mjpeng || [];
    for (var i = 0; i < pl.mjpeng.length; i++) {
        score += pl.mjpeng[i] < 20 ? 1 : 3;
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


// 显示玩家个人信息
playLayer_ziPai.prototype.showPlayerInfo = function(node) {
    var pl = this.getUIPlayer(this.getUIOffByNode(node));
    if (!pl || !pl.info) {
        return;
    }

    if (pl.info.uid == SelfUid()) {
        MjClient.showPlayerInfo(pl.info, false, true);
    } else {
        MjClient.showPlayerInfoPlaying(pl.info, false, true);
    }
};

// 显示玩家聊天文字
playLayer_ziPai.prototype.showUserChat = function(node, msg) {
    var off = this.getUIOffByNode(node);
    var tData = MjClient.data.sData.tData;
    if (msg.type == 4 && off == 0 && tData.roundNum == tData.roundAll) { //位置截取
        var geogData = [];
        for (var i = 0; i < tData.uids.length; i++) {
            var pl = MjClient.data.sData.players[tData.uids[i]];
            if (pl && pl.locationMsg) {
                geogData.push(pl.locationMsg);
            }
        }

        if (geogData.length == tData.maxPlayer) {
            var displayCount = 0;
            for (var i = 0; i < geogData.length; i++) {
                for (var j = i + 1; j < geogData.length; j++) {
                    var plyoneV = new Array();
                    var plytwoV = new Array();
                    plyoneV = geogData[i].split(";");
                    plytwoV = geogData[j].split(";");

                    var plone = getUIPlayerByUID(plyoneV[3]); // 公用代码todo
                    var _oneLatitude = plone.info.location.latitude;
                    var _oneLongitude = plone.info.location.longitude;
                    if (!_oneLatitude) _oneLatitude = plyoneV[0];
                    if (!_oneLongitude) _oneLongitude = plyoneV[1];

                    var pltwo = getUIPlayerByUID(plytwoV[3]); // 公用代码todo
                    var _twoLatitude = pltwo.info.location.latitude;
                    var _twoLongitude = pltwo.info.location.longitude;
                    if (!_twoLatitude) _twoLatitude = plytwoV[0];
                    if (!_twoLongitude) _twoLongitude = plytwoV[1];

                    var distance = MjClient.native.CalculateLineDistance(_oneLatitude, _oneLongitude, _twoLatitude, _twoLongitude);
                    if (distance < 50 && distance >= 0) {
                        displayCount++;
                        break;
                    }
                }

                if (displayCount > 0) {
                    break;
                }
            }

            //当有人距离小于500米 时候提示
            if (displayCount >= 1 && !tData.matchId && tData.maxPlayer > 2) {
                if (tData.maxPlayer == 3)
                    MjClient.Scene.addChild(new showDistance3PlayerLayer());
                else
                    MjClient.Scene.addChild(new showDistanceLayer());
            }
        }

        return;
    }

    var pl = this.getUIPlayer(off);
    var type = msg.type;
    var message = "";
    if (msg.msg.text) {
        message = msg.msg.text;
    } else {
        message = msg.msg;
    }
    var num = msg.num;

    if (pl && msg.uid == pl.info.uid) {
        if (type == 0) {
            node.getParent().visible = true;
            node.setString(message);
            var callback = function() {
                node.getParent().visible = false;
            };

            node.getParent().width = node.stringLength * node.fontSize + 72;
            node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
        } else if (type == 1) {
            node.getParent().visible = true;
            node.setString(message);
            var callback = function() {
                node.getParent().visible = false;
            };

            var musicnum = msg.num + 1;

            node.getParent().width = node.stringLength * node.fontSize + 72;
            var voiceType = MjClient.gameType;
            playEffect(GameSound4Chat[voiceType][getRandomRange(0, GameSound4Chat[voiceType].length - 1)] + musicnum, false, pl.info.sex); // 公用代码todo
            node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
        } else if (type == 2) {
            var em_node = node.getParent().getParent().getChildByName("img_emoji");
            PlayEmojiAct(em_node, msg.num); // 公用代码todo
        } else if (type == 3) { //播放录音
            playRecord(node, num, message); // 公用代码todo
        }
        else if (type == 5) // 转运道具
        {
            var em_node = node.getParent().getParent().getChildByName("img_emoji");
            playZhuanYunPropAct(em_node, msg.num);
        }
    }
};


// 获取提、偎牌的显示类型
playLayer_ziPai.prototype.getCardShowType = function(card, off) {
    var indexInUids = this.getIndexInUids(off);
    var pl = MjClient.data.sData.players[MjClient.data.sData.tData.uids[indexInUids]];
    // 展示
    if (!(pl.mjHide && pl.mjHide.indexOf(card) >= 0)) {
        return 2;
    }
    // 隐藏牌 提偎牌玩家自己展示
    if (pl.info.uid == SelfUid()) {
        return 1;
    }

    return 0;
};
/**
 * 取提/偎展示牌展示的idx（默认最上面一张）
 * @param eatType 吃牌类型
 * @param off 位置偏移
 * @returns {number}
 */
playLayer_ziPai.prototype.getShowCardIndex = function(eatType, off) {
    var uiNode = this.getUINode(off);
    var index = 0;
    if (uiNode.getName() == "node_down" || uiNode.getName() == "node_xing") {
        if (eatType == "mjwei") {
            index = 2;
        } else if (eatType == "mjgang1") {
            index = 3;
        }
    }
    return index;
};

/**
 * 获取吃牌的展示类型（0：不可见   1：蒙层   2 可见  3 置灰）
 * @param eatType 吃牌类型
 * @param card 显示的牌
 * @param cardIndex 吃牌列中位置
 * @param off 位置偏移
 * @returns {number}
 */
playLayer_ziPai.prototype.getEatCardShowType = function(eatType, card, cardIndex, off) {
    var showType = 2;
    if (eatType == "mjchi") {
        showType = cardIndex < 2 ? 2 : 3;
    } else if (eatType == "mjwei" || eatType == "mjgang1") {
        showType = this.getCardShowType(card, off);
        if (showType == 2) {
            showType = this.getShowCardIndex(eatType, off) == cardIndex ? 2 : 0;
        }
    }
    return showType;
};

/**
 * 获取各个方位的吃牌/落牌的的递进方位和牌的锚点信息
 * @param off 位置偏移
 * @returns {{dx: number, dy: number, anchorX: number, anchorY: number}}
 */
playLayer_ziPai.prototype.getEatCardOrientation = function(off) {
    var uiNode = this.getUINode(off);
    var orientation = {
        dx: 1,
        dy: 1,
        anchorX: 0,
        anchorY: 0
    };

    if (uiNode.getName() == "node_left") {
        orientation.dy = -1;
        orientation.anchorY = 1;
    } else if (uiNode.getName() == "node_right") {
        orientation.dx = -1;
        orientation.dy = -1;
        orientation.anchorX = 1;
        orientation.anchorY = 1;
    } else if (uiNode.getName() == "node_xing") {
        orientation.dx = -1;
        orientation.anchorX = 1;
    }
    return orientation;
};

/**
 * 获取各个方位的吃牌展示的起始位置和递进方位信息
 * @param off 位置偏移
 * @returns {{dx: number, x: number, y: number}}
 */
playLayer_ziPai.prototype.getEatCardPoint = function(off) {
    var uiNode = this.getUINode(off);
    var layout_eatCards = uiNode.getChildByName("layout_eatCards");
    var point = {
        dx: 1,
        x: 0,
        y: 0
    };
    if (uiNode.getName() == "node_left") {
        point.y = layout_eatCards.height;
    } else if (uiNode.getName() == "node_right") {
        point.dx = -1;
        point.x = layout_eatCards.width;
        point.y = layout_eatCards.height;
    } else if (uiNode.getName() == "node_xing") {
        point.dx = -1;
        point.x = layout_eatCards.width;
    }
    return point;
};

/**
 * 添加阴影遮罩层
 * @param img_card 需要添加的牌
 */
playLayer_ziPai.prototype.addShaderForCard = function(img_card) {
    var shade = new cc.Sprite("playing/paohuzi/huxiBG1.png");
    shade.opacity = 100;
    shade.x = shade.width / 2;
    shade.y = shade.height / 2;
    img_card.addChild(shade);
};

/**
 * 获取吃牌数据中牌的显示位置index
 * @param eatType 吃牌类型
 * @param totalCount 一列显示总牌数
 * @param cardIndex 数据中index
 * @param off 位置偏移
 * @returns {*}
 */
playLayer_ziPai.prototype.getEatCardOffest = function(eatType, totalCount, cardIndex, off) {
    var uiNode = this.getUINode(off);
    if (eatType == "mjchi" && (uiNode.getName() == "node_left" || uiNode.getName() == "node_right")) {
        return totalCount - cardIndex;
    } else {
        return cardIndex;
    }
};

/**
 * 获取一个吃牌列节点
 * @param eatType 吃牌类型
 * @param cardArr 显示的数据（二维数组）
 * @param off 位置偏移
 * @returns {*}
 */
playLayer_ziPai.prototype.getEatCardNode = function(eatType, cardArr, off) {
    var uiNode = this.getUINode(off);
    var orientation = this.getEatCardOrientation(off);

    var eatCardNode = new cc.Node();
    for (var i = 0; i < cardArr.length; i++) {
        for (var j = 0; j < cardArr[i].length; j++) {
            var showType = this.getEatCardShowType(eatType, cardArr[i][j], j, off);
            var card = this.getNewCard("out", cardArr[i][j], off, showType == 0);
            if (showType == 1) {
                this.addShaderForCard(card);
            } else if (showType == 3) {
                card.setColor(cc.color(170, 170, 170));
            }

            if (orientation.dy == -1 && eatType != "mjchi") {
                eatCardNode.addChild(card);
            } else {
                eatCardNode.addChild(card, cardArr[i].length - j);
            }

            //card.anchorX = orientation.anchorX;
            //card.anchorY = orientation.anchorY;
            card.x = orientation.dx * (i + 0.5) * card.width * card.scaleX;
            card.y = orientation.dy * (this.getEatCardOffest(eatType, cardArr[i].length - 1, j, off) + 0.5) * card.height * card.scaleY;
            eatCardNode.cardWidth = eatCardNode.cardWidth || card.width * card.scaleX;
        }
    }
    return eatCardNode;
};


/**
 * 显示一个吃牌列节点
 * @param eatCardNode 吃牌列节点
 * @param lastLineCount 已有的吃牌列总数
 * @param isInit 是否牌桌初始化
 * @param eatType 吃牌类型
 * @param off 位置偏移
 */
playLayer_ziPai.prototype.dislpayEatCardNode = function(eatCardNode, lastLineCount, isInit, eatType, off) {
    var layout_eatCards = this.getUINode(off).getChildByName("layout_eatCards");
    var point = this.getEatCardPoint(off);
    var targetY = point.y;
    var targetX = point.x + point.dx * lastLineCount * eatCardNode.cardWidth;
    if (!isInit && (eatType == "mjgang0" || eatType == "mjgang1")) {
        var card = this.getEatCard(eatType, off);;
        var children = layout_eatCards.children;
        for (var i = 0; i < children.length; i++) {
            var cardParent = children[i];
            if (cardParent.children[0].tag == card) {
                targetX = cardParent.targetX != undefined ? cardParent.targetX : cardParent.x;
                break;
            }
        }
    }

    eatCardNode.x = eatCardNode.targetX = targetX;
    eatCardNode.y = targetY;
    layout_eatCards.addChild(eatCardNode);

    if (!isInit) {
        var aniTime = this.getAniTimeByType("eat");
        if (this.isAniParallel()) { // 1段
            eatCardNode.x = targetX + point.dx * 3 * eatCardNode.cardWidth;
            eatCardNode.runAction(cc.moveTo(aniTime, targetX, targetY));
        } else { // 3段动画
            var card = eatCardNode.children[0];
            var targetScale = card.scale;
            for (var i = 0; i < eatCardNode.children.length; i++) {
                card = eatCardNode.children[i];
                card.scale = targetScale * 1.7;
                card.runAction(cc.scaleTo(aniTime[0], targetScale));
            }

            eatCardNode.x = point.x + point.dx * 7.5 * eatCardNode.cardWidth;
            var action = cc.sequence(
                cc.delayTime(aniTime[0] + aniTime[1]),
                cc.moveTo(aniTime[2], targetX, targetY).easing(cc.easeSineIn())
            );
            eatCardNode.runAction(action);
        }
    }
};

/**
 * 获取当前吃牌列的总数
 * @param curLineCount 当前吃牌列的总数（吃牌有比牌）
 * @param off 位置偏移
 * @returns {number}
 */
playLayer_ziPai.prototype.getLastEatNodeLineCount = function(curLineCount, off) {
    var indexInUids = this.getIndexInUids(off);
    var pl = MjClient.data.sData.players[MjClient.data.sData.tData.uids[indexInUids]];
    var totalLinesCount = pl.mjpeng.length + pl.mjwei.length + pl.mjgang0.length + pl.mjgang1.length + (pl.mjgang2 ? pl.mjgang2.length : 0);
    for (var i = 0; i < pl.mjchi.length; i++) {
        totalLinesCount += 1;
        if (pl.mjchi[i].biCards) {
            totalLinesCount += pl.mjchi[i].biCards.length;
        }
    }
    return totalLinesCount - curLineCount;
};

/**
 * 获取吃碰效果图
 * @param eatType
 */
playLayer_ziPai.prototype.getEatLabel = function(eatType) {
    return null;
};
/**
 * 展示吃牌特效字
 * @param eatType 吃牌类型
 * @param off 位置偏移
 */
playLayer_ziPai.prototype.displayEatLabel = function(node, eatType, msg) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurEatPlayer(msg, off)) {
        return;
    }
    var eatType = this.apartGangType(eatType, msg);
    var uiNode = this.getUINode(off);
    var layout_eatCards = uiNode.getChildByName("layout_eatDisplay");
    var labels = {
        mjchi: "img_chi",
        mjpeng: "img_peng",
        mjgang0: "img_pao",
        mjwei: "img_wei",
        mjgang1: "img_ti",
        mjgang2: "img_ti",
        hu: "img_hu"
    };
    var eatLabel = layout_eatCards.getChildByName(labels[eatType]);
    eatLabel.visible = true;

    if(this.getEatLabel(eatType)){
        eatLabel.loadTexture(this.getEatLabel(eatType));
    }

    if (this.isAniParallel()) {
        eatLabel.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
            eatLabel.visible = false;
        })));
    } else {
        if (eatLabel.getUserData()) {
            eatLabel.scale = eatLabel.getUserData().scale;
        } else {
            eatLabel.setUserData({
                scale: eatLabel.scale
            });
        }

        var initScale = eatLabel.scale;
        eatLabel.runAction(cc.sequence(cc.scaleTo(0.3, initScale * 1.5), cc.delayTime(0.5), cc.scaleTo(0.3, initScale), cc.callFunc(() => {
            eatLabel.visible = false;
        })));
    }
};

/**
 * 获取吃牌比牌的数据
 * @param off 位置偏移
 * @param pos 数据index
 * @returns {Array} 二维数组
 */
playLayer_ziPai.prototype.getChiCardArr = function(off, pos) {
    var cardArr = [];
    var pl = this.getUIPlayer(off);
    var pos = typeof(pos) == "undefined" ? (pl.mjchi.length - 1) : pos;
    var curEatAndBiCards = pl.mjchi[pos];
    cardArr.push(curEatAndBiCards.eatCards);
    var biCards = curEatAndBiCards.biCards;
    if (biCards) {
        for (var i = 0; i < biCards.length; i++) {
            cardArr.push(biCards[i]);
        }
    }
    return cardArr;
};

/**
 * 获取碰/跑/偎/提的数据
 * @param card 碰/跑/偎/提的牌
 * @param count 每一列数据的个数
 * @returns {Array} 二维数组
 */
playLayer_ziPai.prototype.getOtherEatCardArr = function(eatType, off, pos) {
    var card = this.getEatCard(eatType, off, pos);
    var countArr = {
        mjpeng: 3,
        mjgang0: 4,
        mjwei: 3,
        mjgang1: 4,
        mjgang2: 4,
    };
    var cardArr = [];
    var tempArr = [];
    for (var i = 0; i < countArr[eatType]; i++) {
        tempArr.push(card);
    }
    cardArr.push(tempArr);
    return cardArr;
};

/**
 * 获取拓展类型的数据
 * @param eatType 吃牌类型
 * @param off 位置偏移
 */
playLayer_ziPai.prototype.getExtendEatCardArr = function(eatType, off, pos) {

};

/**
 * 获取所有吃牌类型的数据
 * @param eatType 吃牌类型
 * @param card 吃的牌
 * @param off 位置偏移
 * @param pos 数据的index
 */
playLayer_ziPai.prototype.getEatCardArr = function(eatType, off, pos) {
    if (eatType == "mjchi") {
        return this.getChiCardArr(off, pos);
    } else if (eatType == "mjpeng" || eatType == "mjgang0" || eatType == "mjwei" || eatType == "mjgang1" || eatType == "mjgang2") {
        return this.getOtherEatCardArr(eatType, off, pos);
    } else {
        return this.getExtendEatCardArr(eatType, off, pos);
    }
};

/**
 * 获取当前吃的牌
 * @param eatType 吃牌类型
 * @param off 位置偏移
 * @param pos 数据的index
 * @returns {*}
 */
playLayer_ziPai.prototype.getEatCard = function(eatType, off, pos) {
    var pl = this.getUIPlayer(off);
    var eatAll = {
        mjchi: pl.mjchiCard,
        mjpeng: pl.mjpeng,
        mjgang0: pl.mjgang0,
        mjwei: pl.mjwei,
        mjgang1: pl.mjgang1,
        mjgang2: pl.mjgang2,
    };
    var eatArr = eatAll[eatType];
    var pos = typeof(pos) == "undefined" ? (eatArr.length - 1) : pos;
    return eatArr[pos];
};

// 删除手牌
playLayer_ziPai.prototype.removeHandCard = function(card, off) {
    if (MjClient.rePlayVideo == -1 && off != 0) {
        return;
    }

    var cardArr = MjClient.HandCardArr;
    if (off != 0) {
        cardArr = MjClient.OtherHandArr[off];
    }

    for (var i = 0; i < cardArr.length; i++) {
        var groupList = cardArr[i];
        for (var k = 0; k < groupList.length; k++) {
            if (groupList[k] == card) {
                groupList.splice(k, 1);
                if (groupList.length == 0) {
                    cardArr.splice(i, 1);
                }
                return;
            }
        }
    }
};

/**
 * 移除手牌中的此次吃牌比牌
 * @param cardArr 吃牌比牌数据
 * @param card 吃的牌
 * @param off 位置偏移
 */
playLayer_ziPai.prototype.removeChiFromHand = function(cardArr, card, off) {
    var isSplice = false;
    for (var i = 0; i < cardArr.length; i++) {
        for (var j = 0; j < cardArr[i].length; j++) {
            if (cardArr[i][j] == card && !isSplice) {
                isSplice = true;
                continue;
            }
            this.removeHandCard(cardArr[i][j], off);
        }
    }
};

/**
 * 移除手牌中的此次碰牌
 * @param card 吃的牌
 * @param off 位置偏移
 */
playLayer_ziPai.prototype.removePengFromHand = function(card, off) {
    for (var i = 0; i < 2; i++) {
        this.removeHandCard(card, off);
    }
};

/**
 * 移除手牌中的此次跑/提牌
 * @param eatType 吃牌类型
 * @param card 吃的牌
 * @param off 位置偏移
 */
playLayer_ziPai.prototype.removeGangFromHand = function(eatType, card, off) {
    for (var i = 0; i < 4; i++) {
        this.removeHandCard(card, off);
    }
};

/**
 * 移除手牌中的此次偎牌
 * @param card 吃的牌
 * @param msg 后端返回的偎牌信息（如手牌偎）
 * @param off 位置偏移
 */
playLayer_ziPai.prototype.removeWeiFromHand = function(card, msg, off) {
    for (var i = 0; i < 2; i++) {
        this.removeHandCard(card, off);
    }
};

/**
 * 移除手牌中的此次拓展类型牌
 * @param eatType 吃牌类型
 * @param cardArr 拓展牌数据
 * @param card 吃的牌
 * @param msg 后端返回的偎牌信息（如手牌偎）
 * @param off 位置偏移
 */
playLayer_ziPai.prototype.removeExtendFromHand = function(eatType, cardArr, card, msg, off) {

};

/**
 * 移除手牌中的此次吃牌
 * @param eatType 吃牌类型
 * @param cardArr 吃牌数据
 * @param card 吃的牌
 * @param msg 后端返回吃牌信息
 * @param off 位置偏移
 */
playLayer_ziPai.prototype.removeEatArrFromHand = function(eatType, cardArr, msg, off) {
    var card = this.getEatCard(eatType, off);
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

/**
 * 区分跑/提
 * @param eatType 吃牌类型
 * @param msg 后端返回的杠信息
 * @returns {*} 杠子类型
 */
playLayer_ziPai.prototype.apartGangType = function(eatType, msg) {
    var eatType = eatType;
    if (eatType == "mjgang") {
        if (msg.type == 1) {
            eatType = "mjgang1";
        } else {
            eatType = "mjgang0";
        }
    }
    return eatType;
};

// 更新吃牌(吃/碰/跑/偎/提) 
// @param eatType 吃牌类型
playLayer_ziPai.prototype.updateEatCard = function(node, eatType, msg) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurEatPlayer(msg, off)) {
        return;
    }
    eatType = this.apartGangType(eatType, msg);
    var cardArr = this.getEatCardArr(eatType, off);
    var eatCardNode = this.getEatCardNode(eatType, cardArr, off);
    var lastLineCount = this.getLastEatNodeLineCount(cardArr.length, off);
    this.dislpayEatCardNode(eatCardNode, lastLineCount, false, eatType, off);
};

// 更新手牌(收入亮张)
playLayer_ziPai.prototype.updateHandCardByPick = function(node, msg) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurPlayer(off)) {
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
            MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand, 1);
        }
        self.initHandCards(node, msg);
        setTimeout(()=>{
            MjClient.hasPut = false;
        }, 0.3);
    }, this.getActionTime());
};

// 更新手牌(补牌)
playLayer_ziPai.prototype.updateHandCardByAdd = function(node, msg) {
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
        MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand, 1);
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

// 更新手牌 (出牌)
playLayer_ziPai.prototype.updateHandCardByPut = function(node) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurPlayer(off)) {
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
    if (MjClient.rePlayVideo == -1 && off == 0 && !this.isInTrust(SelfUid())) {
        if(this.checkHandCardByPut(off)){
            this.refreshHandCard(off);
        }
        return;
    }

    // 移除手牌
    this.removeHandCard(MjClient.data.sData.tData.currCard, off);
    this.checkHandCardByPut(off);
    this.refreshHandCard(off);
};

// todo
playLayer_ziPai.prototype.updateHandCardByEat = function(node, eatType, msg) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurEatPlayer(msg, off)) {
        return;
    }

    eatType = this.apartGangType(eatType, msg);
    var cardArr = this.getEatCardArr(eatType, off);
    this.removeEatArrFromHand(eatType, cardArr, msg, off);
    this.refreshHandCard(off);
};

/**
 * 获取长牌背景
 * @param putType
 * @returns {string}
 */
playLayer_ziPai.prototype.getPutCardBg = function (putType) {
    return putType == 0 ? "playing/paohuzi/chupai_bj.png" : "playing/paohuzi/mopai_bj.png";
};

// 更新展示牌(背光跟牌)
playLayer_ziPai.prototype.updatePutCard = function(node, msg, isReconnect) {
    var tData = MjClient.data.sData.tData;
    var putType = tData.putType;
    var card = tData.currCard;

    if(node.isPick){
        delete node.isPick;
    }

    var off = this.getUIOffByNode(node);
    if (!this.isCurPlayer(off) || card == -1 || !this.isInPlay()) {
        return;
    }

    // 牌局中自己手动出牌
    if (putType == 0 && off == 0 && MjClient.rePlayVideo == -1 && !this.isInTrust(SelfUid()) && !isReconnect) {
        if(!node.visible){
            node.visible = true;
        }
        return;
    }

    node.loadTexture(this.getPutCardBg(putType));
    node.visible = true;
    node.opacity = 255;

    var putCard = node.getChildByName("img_card"); // 牌
    var src = this.getCardSrc("put", card, this.isShowCardBack(msg, node, isReconnect));

    putCard.loadTexture(src, 0);

    this.showPutCardAnimation(node);
};

// 收入亮张动画
playLayer_ziPai.prototype.showPickCardAnimation = function(node) {
    var off = this.getUIOffByNode(node);
    if (!this.isCurPlayer(off)) {
        return;
    }

    var pos;
    if (off == 0 && !(MjClient.rePlayVideo == -1 && this.getPlayersNum() == 4)) { // 大手牌
        pos = cc.p(node.getUserData().pos.x, node.getUserData().pos.y - 200);
    } else {
        var uiNode = this.getUINode(off);
        pos = uiNode.getChildByName("layout_head").getPosition();
    }

    node.isPick = true;
    node.runAction(cc.sequence(cc.spawn(cc.scaleTo(this.getActionTime(), 0), cc.moveTo(this.getActionTime(), pos.x, pos.y)).easing(cc.easeCubicActionOut()), cc.callFunc(()=>{
        node.opacity = 0;
        node.isPick = false;
    })));
};

// 展示牌动画
playLayer_ziPai.prototype.showPutCardAnimation = function(node) {
    var off = this.getUIOffByNode(node);
    var putType = MjClient.data.sData.tData.putType;

    var pos; // 起始位置
    if (putType == 1) { // 摸牌
        pos = MjClient.playui.jsBind.layout_cardNum._node.getPosition();
    } else if (putType == 0) { // 出牌
        if (off == 0) {
            pos = cc.p(cc.winSize.width / 2, cc.winSize.height / 2 - 120);
        } else {
            pos = this.getUINode(off).getChildByName("layout_head").getPosition();
        }
    } else {
        return;
    }

    var actTime = this.getAniTimeByType("send");
    node.setPosition(pos);
    node.stopAllActions();
    node.setScale(0);
    var seq = cc.sequence(
        cc.DelayTime(0.05),
        cc.spawn(cc.scaleTo(actTime, node.getUserData().scale), cc.moveTo(actTime, node.getUserData().pos)),
        cc.callFunc(function() {})
    );
    node.runAction(seq);
};

// 落牌动画
playLayer_ziPai.prototype.showOutCardAnimation = function(node) {
    if(node.isPick){
        delete node.isPick;
        return;
    }
    var off = this.getUIOffByNode(node);
    var tData = MjClient.data.sData.tData;
    if (this.getIndexInUids(off) != (tData.curPlayer - 1 + tData.maxPlayer) % tData.maxPlayer) { // 不是发牌玩家上家
        return;
    }

    var pl = this.getUIPlayer(off);
    var uiNode = this.getUINode(off);

    if (!node.isVisible()) { // 没有展示牌
        return;
    }

    if (pl.mjput.length <= 0) {
        return;
    }

    var endPos = this.getOutCardPos(off);
    var outLayout = uiNode.getChildByName("layout_outCards");
    var outCard = this.getNewCard("out", pl.mjput[pl.mjput.length - 1], off, false);
    outCard.setPosition(endPos);
    outLayout.addChild(outCard);

    var anmEndPos = outLayout.convertToWorldSpace(cc.p(endPos.x, endPos.y)); // 动画结束坐标
    var actTime = this.getAniTimeByType("land");
    outCard.setOpacity(0);
    outCard.setScale(0.4);
    var spa = cc.spawn(cc.fadeIn(0.05), cc.scaleTo(0.05, 1));
    outCard.runAction(cc.sequence(cc.delayTime(actTime - 0.05), spa, cc.callFunc(function() {
        outCard.visible = true;
        this.addOutFrame(outCard, pl, pl.mjput.length - 1);
    }.bind(this))));

    // 播放缩小动画到outcard的所在位置
    var scy = (outCard.height * outCard.scaleY) / node.height;
    var spa = cc.spawn(cc.scaleTo(actTime, scy), cc.fadeTo(actTime, 255 * 0.6), cc.moveTo(actTime, cc.p(anmEndPos)))
    var seq = cc.sequence(spa, cc.callFunc(function() {
        node.setOpacity(255);
        node.visible = false;

    }));

    node.stopAllActions();
    node.runAction(seq);

    this.outCardExp(pl, outCard, pl.mjput.length - 1);
};

//弃牌扩展接口
playLayer_ziPai.prototype.outCardExp = function(pl, outCard, idx) {

};

// 初始化手牌
playLayer_ziPai.prototype.initHandCards = function(node, msg) {
    var tData = MjClient.data.sData.tData;
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);

    if (!pl || !this.isInPlay()) {
        return;
    }
    if (MjClient.rePlayVideo != -1 && off != 0) {
        if (!MjClient.OtherHandArr) {
            MjClient.OtherHandArr = {};
        }
        if(msg){
            var hand = [];
            for(var i = 0; i < MjClient.OtherHandArr[off].length; i++){
                hand = hand.concat(MjClient.OtherHandArr[off][i]);
            }
            hand.push(msg.card);
            MjClient.OtherHandArr[off] = MjClient.majiang.sortCard(hand, 1);
        }else{
            MjClient.OtherHandArr[off] = MjClient.majiang.sortCard(pl.mjhand || [], 1);
        }
    }
    //数据在NetCallBack中处理，此处为容错处理
    if (MjClient.rePlayVideo == -1 && off == 0 && (!MjClient.HandCardArr || MjClient.HandCardArr.length == 0)) {
        MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], 1);
    }
    this.refreshHandCard(off);
};

// 初始化吃牌
playLayer_ziPai.prototype.initEatCard = function(node, isRoundEndMsg) {
    if ((MjClient.rePlayVideo != -1 || !this.isInPlay()) && !isRoundEndMsg) {
        return;
    }

    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    var lastLineCount = 0;

    //跑胡需要走这里 但游戏未开始时需要规避
    if (!pl || !pl.mjsort) {return;}
    
    for (var i = 0; i < pl.mjsort.length; i++) {
        var mjSort = pl.mjsort[i];
        var cardArr = this.getEatCardArr(mjSort.name, off, mjSort.pos);
        var eatCardNode = this.getEatCardNode(mjSort.name, cardArr, off);
        this.dislpayEatCardNode(eatCardNode, lastLineCount, true, mjSort.name, off);
        lastLineCount += cardArr.length;
    }
};

// 初始化弃牌
playLayer_ziPai.prototype.initOutCard = function(node) {
    if (!this.isInPlay()) return;
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    node.removeAllChildren();
    var putLen = pl.mjput.length;
    if (this.isCurPlayer(off) && pl.mjput.length > 0 && MjClient.data.sData.tData.currCard == pl.mjput[pl.mjput.length - 1]) {
        putLen -= 1;
    }
    for (var i = 0; i < putLen; i++) {
        var pos = this.getOutCardPos(off);
        var orientation = this.getOutCardOrientation(off, true);
        var outCard = this.getNewCard("out", pl.mjput[i], off, false);
        outCard.setPosition(pos);
        outCard.visible = true;
        node.addChild(outCard);

        this.addOutFrame(outCard, pl, i);

        this.outCardExp(pl, outCard, i);
    }
};

/**
 * 获取各个方位的吃牌/落牌的的递进方位和牌的锚点信息
 * @param off 位置偏移
 * @returns {{dx: number, dy: number, anchorX: number, anchorY: number}}
 */
playLayer_ziPai.prototype.getOutCardOrientation = function(off, isOutCard) {
    var uiNode = this.getUINode(off);
    var orientation = {
        dx: 1,
        dy: 1,
        anchorX: 0,
        anchorY: 0
    };

    if (uiNode.getName() == "node_left") {
        orientation.dy = 1;
        orientation.anchorY = 1;
    } else if (uiNode.getName() == "node_right") {
        orientation.dx = -1;
        orientation.dy = 1;
        orientation.anchorX = 1;
        orientation.anchorY = 1;
    } else if (uiNode.getName() == "node_xing") {
        orientation.dx = -1;
        orientation.anchorX = 1;
        orientation.anchorY = 1;
    } else if (isOutCard) {
        orientation = {
            dx: -1,
            dy: 1,
            anchorX: 0,
            anchorY: 0
        };
    }
    return orientation;
};

// 获取落牌位置
playLayer_ziPai.prototype.getOutCardPos = function(off) {
    var pos = cc.p(0, 0);
    var orientation = this.getOutCardOrientation(off, true);
    var uiNode = this.getUINode(off);
    var layout_outCards = uiNode.getChildByName("layout_outCards");
    var childNum = layout_outCards.getChildrenCount();

    var type = this.getLayoutType();
    var outCard = uiNode.getChildByName("img_outCard");

    // 设置一行的数量
    function setMultiNum(num) {
        pos.x += (childNum % num + 0.5) * outCard.width * orientation.dx;
        pos.y += (Math.floor(childNum / num) + 0.5) * outCard.height * orientation.dy;
        if (uiNode.getName() == "node_left") {
            pos.y += layout_outCards.height - outCard.height;
        } else if (uiNode.getName() == "node_right") {
            pos.x += layout_outCards.width;
            pos.y += layout_outCards.height - outCard.height;
        } else if (uiNode.getName() == "node_xing") {
            pos.x += layout_outCards.width;
        } else {
            pos.x += layout_outCards.width;
        }
    }

    // 每行的数量
    var lineNum = (type == 0 || off == 0) ? 6 : 30;
    setMultiNum(lineNum);

    return pos;
};

// 隐藏所有操作按钮
playLayer_ziPai.prototype.hideEatBtns = function() {
    var eat = MjClient.playui.jsBind.node_eatChoice._node;
    var children = eat.getChildren();
    for (var i = 0; i < children.length; ++i) {
        var child = children[i];
        child.visible = false;
    }
};

// 判断吃、碰、胡、过操作按钮的状态
playLayer_ziPai.prototype.updateEatBtns = function(msg) {
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid() + ""];
    if (!pl) {
        MjClient.gamenet.request("pkroom.handler.tableMsg", {
            cmd: "checkBtnWithFlag",
            mjState: pl.mjState,
            eatFlag: pl.eatFlag,
            tableid: sData.tData.tableid,
            pl: "pl not find:" +　SelfUid()
        });
        return;
    }

    //重置吃碰隐藏
    this.hideEatBtns();
    //吃碰杠胡
    var showEatNodes = this.getShowEatNodes();

    //重新加载下按钮资源（尝试修复按钮不见）
    this.reloadBtns(showEatNodes);

    //吃碰杠胡过处理
    if (showEatNodes && showEatNodes.length > 0) {
        this.showEatSpecialDeal();
        for (var i = 0; i < showEatNodes.length; i++) {
            var btnNode = showEatNodes[i];
            btnNode.visible = true;
            this.changeEatBtnLayout(btnNode, showEatNodes.length, i);
        }
    }
    this.checkBtnWithPlayerFlag();
};

playLayer_ziPai.prototype.reloadBtns = function(showEatNodes) {
    if (showEatNodes && showEatNodes.length > 0) {
        for (var i = 0; i < showEatNodes.length; i++) {
            var btnNode = showEatNodes[i];
            if(btnNode && cc.sys.isObjectValid(btnNode)) {
                var obj = btnNode.getNormalFile();
                if(obj && obj.file) {
                    console.log("btn file:", obj.file);
                    btnNode.loadTextureNormal(obj.file);
                }
            }
        }
    }
};

playLayer_ziPai.prototype.changeEatBtnLayout = function(btnNode, len, idx) {
    var type = this.getLayoutType();
    switch (type) {
        case 1:
            setWgtLayout(btnNode, [0, 0.20], [0.5, 0.18], [(idx - (len - 1) / 2) * 1.3, 1.8], false, false);
            break;
        case 0:
            setWgtLayout(btnNode, [0, 0.20], [0.88 - (len - 1 - idx) * 0.12, 0.11], [0, 1.8], false, false);
            break;
    }
};

// 获取操作按钮数组
playLayer_ziPai.prototype.getShowEatNodes = function() {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var eat = MjClient.playui.jsBind.node_eatChoice;
    var pl = sData.players[SelfUid() + ""];
    if (!pl || (pl.eatFlag & 16) || (pl.eatFlag & 8)) {
        return;
    }

    if (tData.tState == TableState.roundFinish) {
        return [];
    }

    var vnode = [];
    if (pl.eatFlag & 1) { // 吃
        vnode.push(eat.btn_chi._node);
    }

    if (pl.eatFlag & 2) { // 碰
        vnode.push(eat.btn_peng._node);
    }

    if (pl.eatFlag & 32) { // 胡
        vnode.push(eat.btn_hu._node);
    }

    if (vnode.length > 0) { // 过
        vnode.push(eat.btn_guo._node);
    }

    return vnode;
};

//显示操作按钮时的特殊操作
playLayer_ziPai.prototype.showEatSpecialDeal = function(){
};

//验证按钮显示与玩家eatFlag是否能对应上
playLayer_ziPai.prototype.checkBtnWithPlayerFlag = function(){
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid() + ""];
    if(!pl){
        return;
    }
    var btnArray = [];
    if (pl.eatFlag & 1) {
        btnArray.push("btn_chi");
    }
    if (pl.eatFlag & 2) {
        btnArray.push("btn_peng");
    }
    if (pl.eatFlag & 32) {
        btnArray.push("btn_hu");
    }
    var eat = MjClient.playui.jsBind.node_eatChoice;
    for(var i = 0;i < btnArray.length;i++){
        var btnName = btnArray[i];
        if(!eat[btnName]._node.visible){
            MjClient.gamenet.request("pkroom.handler.tableMsg", {
                cmd: "checkBtnWithFlag",
                mjState: pl.mjState,
                eatFlag: pl.eatFlag,
                tableid: sData.tData.tableid,
            });   
            break;          
        }
    }
};

// 获取自己eatFlag
playLayer_ziPai.prototype.getSelfEatFlag = function() {
    return this.getUIPlayer(0).eatFlag;
};

//操作按钮的背景动画
playLayer_ziPai.prototype.doBtnLightAction = function(lightNode) {
    var initScale = lightNode.getScale();
    var a11 = cc.scaleTo(0.5, initScale * 1.0);
    var a12 = cc.fadeIn(0.5);
    var a21 = cc.scaleTo(1, initScale * 1.3);
    var a22 = cc.fadeOut(1);
    var a30 = cc.callFunc(function() {
        this.setScale(initScale * 0.95);
    }.bind(lightNode));

    lightNode.runAction(cc.sequence(cc.spawn(a11, a12), cc.spawn(a21, a22).easing(cc.easeCubicActionOut()), a30, cc.delayTime(0.2)).repeatForever());
};

//吃牌
playLayer_ziPai.prototype.commitEatCard = function(eatCards, biArr) {
    var self = this;
    var tData = MjClient.data.sData.tData;
    var msg = {
        cmd: "MJChi",
        eatCards: eatCards,
        cardNext: tData.cardNext,
        card: tData.lastPutCard
    };
    if (biArr) {
        msg.biCards = biArr;
    }

    if (MjClient.data.sData.players[SelfUid()].eatFlag & 32) {
        MjClient.showMsg("吃牌后视为过胡，确定吃吗？", function() {
            self.hideEatBtns();
            MjClient.gamenet.request("pkroom.handler.tableMsg", msg);
        }, function() {}, "1");
    } else {
        self.hideEatBtns();
        MjClient.gamenet.request("pkroom.handler.tableMsg", msg);
    }
};

//@brief 吃牌比牌选择动画 只关心x轴 支持两种布局
//@param arr     array  not null     值为[chi]或[chi, bi]或[chi, bi, bi]
//       isScale bool   default:true 表示arr中最后一个元素节点是否展示缩放动画
playLayer_ziPai.prototype.doSelectEatAction = function(arr, isScale) {
    if (!arr || arr.length == 0) {
        return;
    }
    var gap = 5;
    isScale = isScale === undefined ? true : isScale;
    var len = arr.length;
    var w = 0;
    for (var i = 0; i < len; i++) {
        var node = arr[i];
        if (node && node.width) {
            w += node.width * node.scale;
            w += gap;
        }
    }

    //初始的缩放值
    var initChiBgScale = MjClient.playui.jsBind.node_eatChoice.img_chiSelect._node.initChiBgScale;
    var scaleActionNode = arr[len - 1];

    if (this.getLayoutType() == 0) { //偏右布局右侧需要空隙一点位置
        var width = cc.winSize.width * 0.91;
        var beginX = width < w ? 0 : (width - w);
        arr.reverse();
    } else { //传统布局整体居中
        var width = cc.winSize.width;
        var beginX = width < w ? (width - w) : ((width - w) * 0.5);
    }

    for (var i = 0; i < len; i++) {
        var node = arr[i];
        if (node) {
            beginX += node.width * 0.5 * initChiBgScale + gap;
            //最后一个节点缩放
            if (node == scaleActionNode) {
                node.x = beginX;
                if (isScale) {
                    node.scale = 0.1;
                    var ac = cc.scaleTo(0.1, initChiBgScale).easing(cc.easeExponentialOut(0.1));
                    node.stopAllActions();
                    node.runAction(ac);
                }
                //其他节点位移
            } else {
                node.scale = initChiBgScale;
                var p = cc.p(beginX, node.y);
                var ac = cc.moveTo(0.2, p).easing(cc.easeExponentialOut(0.2));
                node.stopAllActions();
                node.runAction(ac);
            }
            beginX += node.width * 0.5 * initChiBgScale;
        }
    }
};

//排序 吃牌放最上面
playLayer_ziPai.prototype.sortSelectEatCards = function(cards) {
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];
    var putCard = sData.tData.lastPutCard;
    cards = cards.slice();
    if(cards.indexOf(putCard) >= 0) {
            cards.splice(cards.indexOf(putCard), 1);
            cards.push(putCard);
    }
    return cards;
}

//填充一组吃牌或比牌
playLayer_ziPai.prototype.addSelectEatBtns = function(selectBg, selectCards) {
    var selectBtns = [];
    var children = selectBg.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].getName() == "cloneBtn") {
            children[i].removeFromParent(true);
        }
    }

    var off_x = 5;
    var selectBtn = selectBg.getChildByName("btn_select");
    var startPos = selectBtn.getPosition();

    var initChiBgSize = MjClient.playui.jsBind.node_eatChoice.img_chiSelect._node.initChiBgSize;
    var off_width = (initChiBgSize.width - selectBtn.width) / 2;
    selectBg.width = selectBtn.width * selectCards.length + (selectCards.length - 1) * off_x + off_width * 2;

    for (var i = 0; i < selectCards.length; i++) {
        var cardList = this.sortSelectEatCards(selectCards[i]);
        var cloneBtn = selectBtn.clone();
        cloneBtn.visible = true;
        cloneBtn.setName("cloneBtn");
        for (var k = 0; k < cardList.length; k++) {
            var card = cardList[k];
            var cardNode = cloneBtn.getChildByName("img_card" + k);
            cardNode.visible = true;
            var src = this.getCardSrc("hand", card)
            //cardNode.loadTexture(src, this.getResType());
            this.loadCardTexture(cardNode, src, this.getResType());
            cardNode.zIndex = cardList.length - k;
            if(k == cardList.length - 1) {
                cardNode.setColor(cc.color(170, 170, 170));
            }
        }

        cloneBtn.setPosition(cc.p(startPos.x + (cloneBtn.width + off_x) * i, startPos.y));
        selectBg.addChild(cloneBtn);
        selectBtns.push(cloneBtn);
    }
    return selectBtns;
};

//显示吃牌选择
playLayer_ziPai.prototype.showSelectEatCards = function() {
    var self = this;
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];
    var putCard = sData.tData.lastPutCard;

    this.hideEatBtns();
    MjClient.playui.jsBind.node_eatChoice.btn_cancel._node.visible = true;

    var selectBgArr = [MjClient.playui.jsBind.node_eatChoice.img_chiSelect._node,
                       MjClient.playui.jsBind.node_eatChoice.img_biSelect._node,
                       MjClient.playui.jsBind.node_eatChoice.img_biSelect1._node];

    var selectedCardsArr = [];  //记录选择的组合
    var bShowEatCardsScaleAction = false;   //是否执行缩放动画

    //添加一组可以吃或比的牌
    var addSelectEatCardsRow = function(handCardArr) {
        var selectBg = selectBgArr[selectedCardsArr.length];
        selectBg.visible = true;
        selectBg.x = cc.winSize.width * 0.5;

        if (selectedCardsArr.length == 0) {
            var optionCards = self.getChiCards();
        } else {
            var optionCards = MjClient.majiang.getBiCards(handCardArr, putCard);
        }
        if (!optionCards || optionCards.length == 0) {
            return;
        }

        var optionBtns = self.addSelectEatBtns(selectBg, optionCards);
        for (var i = 0; i < optionBtns.length; ++i) {
            var btn = optionBtns[i];
            (function(tag, cards) {
                btn.addClickEventListener(function(btn) {
                    bShowEatCardsScaleAction = (tag + 1) > selectedCardsArr.length;
                    selectedCardsArr = selectedCardsArr.slice(0, tag);
                    selectedCardsArr.push(cards);

                    for (var i = selectedCardsArr.length; i < selectBgArr.length; ++i) {
                        selectBgArr[i].visible = false;
                    }

                    for (var m = 0; m < optionBtns.length; m++) {
                        optionBtns[m].setBright(true);
                    }
                    btn.setBright(false);

                    var tmpHandCardArr = handCardArr.slice();
                    var tmpCards = cards.slice();
                    if (selectedCardsArr.length == 3) {
                        return self.commitEatCard(selectedCardsArr[0], selectedCardsArr.slice(1, selectedCardsArr.length));
                    } else if (selectedCardsArr.length == 1) {
                        tmpCards.splice(tmpCards.indexOf(putCard), 1);
                    }

                    for (var i = 0; i < tmpCards.length; i++) {
                        tmpHandCardArr.splice(tmpHandCardArr.indexOf(tmpCards[i]), 1);
                    }

                    if (tmpHandCardArr.indexOf(putCard) < 0 || !self.checkBiCards()) {
                        self.commitEatCard(selectedCardsArr[0], selectedCardsArr.length == 1 ? null : selectedCardsArr.slice(1, selectedCardsArr.length));
                    } else {
                        addSelectEatCardsRow(tmpHandCardArr);
                    }
                });
            })(selectedCardsArr.length, optionCards[i]);
        }
        self.doSelectEatAction(selectBgArr.slice(0, selectedCardsArr.length + 1), bShowEatCardsScaleAction);
    };
    addSelectEatCardsRow(pl.mjhand.slice());
};

// @param type 0默认 1桌面 2邀请 3结算
playLayer_ziPai.prototype.getIgnoreMode = function(type) {
    if (type == 1 || type == 3) {
        // return ["payWay", "mingLong", "zuoZhuang", "isManualCutCard"];
    }

    return [];
};

// 获取玩法描述(桌面 邀请 结算)
playLayer_ziPai.prototype.getGameCnDesc = function(ignoreType) {
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
        if (str) {
            desc += str + ",";
        }
    }
    desc = desc.replace(/,$/, "");

    return desc;
};

//总结算面板
playLayer_ziPai.prototype.createGameOverLayer = function(type) {
    return new GameOverLayer_ahPaoHuZi();
};

//小结算面板
playLayer_ziPai.prototype.createEndOneLayer = function(type) {
    return MjClient.playui.isCoinField() ? (new EndOneView_ahPaoHuZiGold()) : (new EndOneView_ahPaoHuZi());
};

//获取牌堆总数
playLayer_ziPai.prototype.getInitDiPaiCount = function() {
    return MjClient.majiang.getAllCardsTotal() - MjClient.data.sData.tData.maxPlayer * this.getHandCount();
};

// 发牌间隔
playLayer_ziPai.prototype.getSendCardInterval = function() {
    var areaSelectMode = MjClient.data.sData.tData.areaSelectMode;
    if ([0, 1, 2].indexOf(areaSelectMode.faPai) < 0) {
        return [0.9, 0.7, 1.1, 0.3][this.getSuDuType()]; // todo
    }

    return [1.5, 1.1, 0.8][areaSelectMode.faPai];
};

// 动画是否同时(落牌与发牌) 吃牌动画是否只1段
playLayer_ziPai.prototype.isAniParallel = function() {
    return true;
};

//@brief 获取动画时间
//@param type send|land|eat
//@author evan
playLayer_ziPai.prototype.getAniTimeByType = function(type) {
    if (this.isAniParallel()) { //旧版动画
        return this.getActionTime();
    }

    var cfg = [
        { //标准 
            send: 0.20,
            land: 0.20,
            eat: [0.20, 0.16, 0.16]
        },
        { //快
            send: 0.16,
            land: 0.16,
            eat: [0.16, 0.13, 0.13]
        },
        { //慢
            send: 0.25,
            land: 0.25,
            eat: [0.25, 0.25, 0.25]
        },
        { //极快
            send: 0.13,
            land: 0.13,
            eat: [0.13, 0.10, 0.10]
        }
    ];

    //在建房选项勾选“急速”情况下 并且不是旧的动画 游戏内的功能设置默认选择“极快”
    var suDuType = MjClient.data.sData.tData.areaSelectMode.faPai == 2 ? 3 : this.getSuDuType();
    return cfg[suDuType][type];
};

// 是否需要延时发牌
playLayer_ziPai.prototype.shouldDealyNewCard = function() {
    if (this.isAniParallel()) {
        return false;
    }

    var tData = MjClient.data.sData.tData;
    var off = (tData.curPlayer - 1 - tData.uids.indexOf(SelfUid()) + tData.maxPlayer) % tData.maxPlayer;

    if (this.getUIPlayer(off).mjput.length <= 0) {
        return false;
    }

    var imgPutCard = this.getUINode(off).getChildByName("img_putCard");
    if (!imgPutCard.isVisible()) { // 无展示牌
        return false;
    }

    return true;
};

// 落牌 发牌节奏控制
playLayer_ziPai.prototype.checkDelayNewCard = function(node, msg) {
    if (this.shouldDealyNewCard()) {
        var delayTime = (this.getSendCardInterval() - this.getAniTimeByType("send") - this.getAniTimeByType("land")) * 0.5 + this.getAniTimeByType("land");
        node.runAction(cc.sequence(cc.delayTime(delayTime), cc.CallFunc(function() {
            postEvent("HZNewCardDelay", msg);
        })));
    } else {
        postEvent("HZNewCardDelay", msg);
    }
};

playLayer_ziPai.prototype.initSpriteFrame = function () {
    if(this.getResType() == 1){
        var resList = this.getCardFontList();
        for(var i = 0; i < resList.length; i++){
            var fPlist = "plist/" + resList[i] + ".plist";
            var fPng = "plist/" + resList[i] + ".png";
            cc.spriteFrameCache.addSpriteFrames(fPlist, fPng);
            if(!jsb.fileUtils.isFileExist(fPlist) || !jsb.fileUtils.isFileExist(fPng)){
                MjClient.native.umengEvent4CountWithProperty("playLayer_ziPai_fileError", {uid:SelfUid(), type:resList[i]});
            }else{
                if(!cc.spriteFrameCache.getSpriteFrame("big/" + resList[i] + "/hand1.png")){
                    MjClient.native.umengEvent4CountWithProperty("playLayer_ziPai_FrameError", {uid:SelfUid(), type:resList[i]});
                }
            }
        }
    }
};

playLayer_ziPai.prototype.loadCardTexture = function (node, src, type) {
    if (node.toString() != "[object ImageView]") {
        return;
    }
    //cc.log("chow loadCardTexture", "src = " + src + " type = " + type);
    if(type == 1){
        if(src.indexOf("playing/ziPai/") >= 0){
            src = src.replace("playing/ziPai/", "");
        }
        if(cc.spriteFrameCache.getSpriteFrame(src)){
            node.loadTexture(src, 1);
            //cc.log("chow loadCardTexture 11111 = " + node.getRenderFile().file);
        }else{
            /*if(src.indexOf("playing/ziPai/") < 0){
                node.loadTexture("playing/ziPai/" + src);
            }else{
                node.loadTexture(src);
            }*/
            node.loadTexture("playing/ziPai/" + src);
            //cc.log("chow loadCardTexture 22222 = ", node.getRenderFile().file);
        }
    }else{
        node.loadTexture(src);
        //cc.log("chow loadCardTexture 33333 = ", node.getRenderFile().file);
    }
};

//打出的牌添加角标
playLayer_ziPai.prototype.addOutFlag = function (node, flag) {
    if(cc.sys.isObjectValid(node) && flag == 0){
        var frame = new ccui.ImageView("playing/paohuziTable/putCardFrame_new.png");
        frame.x = node.width / 2;
        frame.y = node.height / 2;
        node.addChild(frame);
    }
};

//手牌张数 
playLayer_ziPai.prototype.getHandCount = function() {
    return 20;
};

/**
 * 是否需要比牌
 * @returns {boolean}
 */
playLayer_ziPai.prototype.checkBiCards = function () {
  return true;
};

/**
 * 获取吃牌列表
 */
playLayer_ziPai.prototype.getChiCards = function () {
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];
    var putCard = sData.tData.lastPutCard;
    return MjClient.majiang.getChiCards(pl.mjhand, putCard);
};

/**
 * 牌堆标记
 * @param outCard
 * @param index
 */
playLayer_ziPai.prototype.addOutFrame = function (outCard, pl, index) {

}

//出牌摸牌布局
playLayer_ziPai.prototype.changePutCardLayout = function(node) {
    if(!cc.sys.isObjectValid(node) || !this.isPutCardLayout()) {
        return;
    }

    var type = this.getLayoutType();
    switch (type) {
        case 0:
            setWgtLayout(node, [0.35, 0.35], [0.65, 0.6], [0, 0]);
            break;
        case 1:
            setWgtLayout(node, [0.35, 0.35], [0.5, 0.6], [0, 0]);
            break;
    }

    var userData = {
        scale: node.getScale(),
        pos: node.getPosition()
    };
    node.setUserData(userData);
}

//出牌摸牌的位置是否适配偏右、传统布局
playLayer_ziPai.prototype.isPutCardLayout = function() {
    return false;
};

playLayer_ziPai.prototype.getMjhandDelay = function() {
     return (MjClient.data.sData.tData.areaSelectMode.isManualCutCard || this.isChargeShuffle()) ? 2 : 4;
};

playLayer_ziPai.prototype.isChargeShuffle = function() {
    return false;
};

playLayer_ziPai.prototype.playShuffleEffect = function() {
    if(this.isPlayShuffle || this.shuffleList.length <= 0) {
        return;
    }

    this.isPlayShuffle = true;
    if(!this.shuffleNode) {
        this.shuffleNode = new ShuffleEffectLayer();
        this.jsBind._node.addChild(this.shuffleNode, 499);
    }

    this.shuffleNode.visible = true;
    var uid = this.shuffleList[0];
    this.shuffleList.splice(0, 1);
    this.shuffleNode.playEffect(uid);

    this.scheduleOnce(function(){
        this.isPlayShuffle = false;
        if(this.shuffleNode) {
            this.shuffleNode.visible = false;
        }
        this.playShuffleEffect();
    }, 1.6);
};

playLayer_ziPai.prototype.removeShuffleNode = function() {
    this.shuffleNode.removeFromParent(true);
    this.shuffleNode = null;
};