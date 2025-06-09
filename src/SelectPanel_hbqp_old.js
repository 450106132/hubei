// ------牌友联盟岳阳棋牌（经典版) home--------

var HomeView_hbqp_old = cc.Layer.extend({
    _btnKaiFangGift: null,
    _btnChangCiGift: null,
    _gameListPanelNode: null,
    _gamePanelNode: null,
    _joinRoom: null,
    _createRoom: null,
    _BtnRuturn: null,
    _tileIcon: null,
    _myFuHaoData: null,
    _myQueShenData: null,
    _jueSeNode: null,
    ctor: function () {
        this._super();
        var homeui = ccs.load("Home_old.json");
        this.uiNode = homeui.node;
        //BindUiAndLogic(homeui.node,this.jsBind);
        this.addChild(homeui.node);
        MjClient.homeui = this;
        playMusic("bgMain");
        setMusicVolume(-1);

        UIEventBind(this.jsBind, homeui.node, "logout", function () {
            if (MjClient.homeui) {
                MjClient.homeui.removeFromParent(true);
                delete MjClient.homeui;
            }
        });

        var _back = homeui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0], true);

        this._jueSeNode = _back.getChildByName("juese");
        this._jueSeNode.visible = true;

        var _tilebg = homeui.node.getChildByName("tilebg");
        _tilebg.visible = true;
        setWgtLayout(_tilebg, [1, 0.3], [0.5, 1], [0, 0]);

        //活动伸缩按钮
        var _btnActive = homeui.node.getChildByName("Btn_Active");
        // _Image_light.visible = true;

        function _btnActiveTouchEvent(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (MjClient.systemConfig && MjClient.systemConfig.activity) {
                        var layer = new activityLayer();
                        MjClient.Scene.addChild(layer);
                    }
                    break;
                default:
                    break;
            }
        }

        _btnActive.addTouchEventListener(_btnActiveTouchEvent, this);

        //设置
        var _setting = homeui.node.getChildByName("setting");
        _setting.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var settringLayer = new HomeSettingView_yueyang();
                    settringLayer.setName("HomeClick");
                    MjClient.Scene.addChild(settringLayer);
                    break;
                default:
                    break;
            }
        }, this);

        //右上角的帮助按钮,
        var _BtnHTP = homeui.node.getChildByName("BtnHTP");
        _BtnHTP.visible = true;
        _BtnHTP.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.openWeb({ url: null, help: true });
                    break;
                default:
                    break;
            }
        }, this);

        //战绩
        var _zhanji = homeui.node.getChildByName("zhanji");
        _zhanji.visible = true;
        _zhanji.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    //MjClient.showMsg("暂未开放!");
                    if (!MjClient.data.sData) {
                        MjClient.Scene.addChild(new PlayLogView());
                    }
                    else MjClient.showMsg("正在游戏中，不能查看战绩");
                    break;
                default:
                    break;
            }
        }, this);

        //邮件
        this._youjian = homeui.node.getChildByName("youjian");
        this._youjian.visible = true;
        this._youjian.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var emailLayer = new EmailLayer();
                    MjClient.Scene.addChild(emailLayer);
                    break;
                default:
                    break;
            }
        }, this);
        this._youjian.getChildByName("hongDian").setVisible(false);
        this.updateYoujianCount();

        //标题
        this._tileIcon = homeui.node.getChildByName("title");

        //分享有礼
        var _btnShareGet = homeui.node.getChildByName("fenxiang");

        //推荐有礼
        var _btntuijian = homeui.node.getChildByName("tuijian");

        ////头像
        var _headbg = homeui.node.getChildByName("headbg");

        setWgtLayout(this._youjian, [0.06, 0.13], [1, 1.033], [-5.5, -0.8]);
        setWgtLayout(_zhanji, [0.06, 0.13], [1, 1.033], [-4.17, -0.8]);
        setWgtLayout(_BtnHTP, [0.06, 0.13], [1, 1.033], [-2.88, -0.8]);
        setWgtLayout(_setting, [0.06, 0.13], [1, 1.033], [-1.5, -0.8]);
        setWgtLayout(this._tileIcon, [0.33, 0.14], [0.5, 1.0], [0.035, -0.55]);

        var _BtnShop = homeui.node.getChildByName("Button_store");
        setWgtLayout(_BtnShop , [0.15, 0.15], [0.93, 0.7], [0, 0.0]);
        setWgtLayout(_btntuijian, [0.15, 0.15], [0.93, 0.4], [0, 0.0]);
        setWgtLayout(_btnShareGet, [0.15, 0.15], [0.93, 0.25], [0, 0.0]);
        setWgtLayout(_btnActive, [0.15, 0.15], [0.93, 0.1], [0, 0]);

        setWgtLayout(_headbg, [0.088, 0.14], [0.09, 1], [0.1, -0.03]);

        var _scroll = this._tileIcon.getChildByName("scroll");
        var _msg = _scroll.getChildByName("msg");
        homePageRunText(_msg, []);
        function getMsg() {
            var content = ""+MjClient.systemConfig.homeScroll;
            return MjClient.remoteCfg.guestLogin ? "欢迎来到" + AppCnName[MjClient.getAppType()] : content;
        }
        _msg.setString(getMsg());

        this._scroll = _scroll;
        this._laba_bg = this._tileIcon.getChildByName("laba_bg");

        if (MjClient.remoteCfg.guestLogin == true) {
            _btnShareGet.visible = false;
            _btnShareGet.setTouchEnabled(false);
        }

        _btnShareGet.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    {
                        var _sprite = _btnShareGet.getChildByName("hongDian");
                        MjClient.Scene.addChild(new shareTodayLayer(_sprite.visible));
                    }
                    break;
                default:
                    break;
            }
        }, this);
        var _shareTip = _btnShareGet.getChildByName("fenxiang_tip");
        var _shareTipText = null;
        if (_shareTip) {
            _shareTipText = _shareTip.getChildByName("Text_4");
        }
        _btnShareGet.schedule(function () {
            var _sprite = _btnShareGet.getChildByName("hongDian");
            if (_sprite && _shareTip)
                _shareTip.visible = _sprite.visible;
        }, 1);

        if (_shareTip) {
            if (_btnActive)
                _btnShareGet.setZOrder(_btnActive.getZOrder() + 1);
            _shareTip.setOpacity(0);
            _shareTip.runAction(cc.repeatForever(cc.sequence(
                cc.fadeIn(1),
                cc.repeat(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2)), 5),
                cc.fadeOut(1),
                cc.delayTime(0.5))));
        }

        if (MjClient.remoteCfg.guestLogin == true) {
            _btntuijian.visible = false;
            _btntuijian.setTouchEnabled(false);
        }

        _btntuijian.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = new recommendLayer_active();
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }
        }, this);

        var selfHead = SelfHeadInfo();
        MjClient.loadWxHead(selfHead.uid, selfHead.url);

        var _head = _headbg.getChildByName("head");
        UIEventBind(this.jsBind, _head, "loadWxHead", function (d) {
            if (d.uid == MjClient.data.pinfo.uid) {
                var sp = new cc.Sprite(d.img);
                this.addChild(sp);
                setWgtLayout(sp, [0.93, 0.93], [0.5, 0.5], [0, 0], false, true);
            }
        });

        _head.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.showPlayerInfoBind(MjClient.data.pinfo, true, true);
                    break;
                default:
                    break;
            }
        }, this);
        //
        //昵称
        var _name = _head.getChildByName("name");
        function _getName() {
            var pinfo = MjClient.data.pinfo;
            return unescape(pinfo.nickname );
        }
        _name.setString(getNewName(_getName()));
        _name.ignoreContentAdaptWithSize(true);

        //ID
        var _uid = _head.getChildByName("uid");
        _uid.setString("ID:" + SelfUid());
        _uid.ignoreContentAdaptWithSize(true);
        if (MjClient.remoteCfg.hideMoney) {
            //_uid.y=45;
        }

        var _moneyBack = _head.getChildByName("moneyback");
        _moneyBack.visible = !MjClient.remoteCfg.hideMoney;

        var _money = _moneyBack.getChildByName("money");
        _money.ignoreContentAdaptWithSize(true);

        changeAtalsForLabel(_money, MjClient.data.pinfo.money);
        UIEventBind(this.jsBind, _money, "updateInfo", function () {

            var icurrentMoney = parseInt(_money.getString());
            var lastMoney = parseInt(MjClient.data.pinfo.money);
            if (lastMoney > icurrentMoney) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(_money.getContentSize().width / 2, _money.getContentSize().height / 2);
                _money.addChild(starParticle);
                _money.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            changeAtalsForLabel(_money, MjClient.data.pinfo.money);
        });
        UIEventBind(this.jsBind, _money, "loginOK", function () {
            changeAtalsForLabel(_money, MjClient.data.pinfo.money);
        });


        /*
         商店
         */
        var _BtnShop = homeui.node.getChildByName("Button_store");
        if (MjClient.remoteCfg.hideMoney == true || MjClient.isShenhe == true) {
            _BtnShop.visible = false;
            _BtnShop.setTouchEnabled(false);
        }
        _BtnShop.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = enter_store();
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }
        }, this);
        var _biaoqian = _BtnShop.getChildByName("Image_biaoqian");
        _biaoqian.runAction(cc.sequence(cc.rotateTo(3, 30).easing(cc.easeSineInOut()), cc.rotateTo(2, 0).easing(cc.easeSineInOut())).repeatForever());
        var _store_guang = _BtnShop.getChildByName("Image_guang");
        _store_guang.runAction(cc.sequence(cc.spawn(cc.scaleTo(2, 1.2), cc.fadeOut(2)),
            cc.callFunc(function () { _store_guang.setScale(1); _store_guang.setOpacity(255); })).repeatForever());

        //游戏
        this._gamePanelNode = homeui.node.getChildByName("Panel_game");
        this._gamePanelNode.visible = true;

        this.setGamePanel(this._gamePanelNode);

        //this.showSelectUiPanel();

        return true;
    },
    onEnter: function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function (keyCode, event) {
                if (keyCode == cc.KEY.back) {
                    if (cc.isUndefined(MjClient.exitLayer) || MjClient.exitLayer == null) {
                        MjClient.Scene.addChild(new ExitLayer(), 2000);
                        if (MjClient.webViewLayer != null) {
                            MjClient.webViewLayer.close();
                        }
                    }
                    else {
                        MjClient.exitLayer.removeFromParent();
                        MjClient.exitLayer = null;
                    }
                }
            }
        }, this);


        //检查剪切板
        this.schedule(function () {
            if (MjClient.playui) {
                return;
            }

            var clipboardStr = MjClient.native.doGetPasteBoard();
            if (!cc.isUndefined(clipboardStr) && clipboardStr.length > 0) {
                var tableID = clipboardStr.substring(clipboardStr.indexOf('[') + 1, clipboardStr.indexOf(']'));
                if (tableID.length == 6) {
                    MjClient.showMsg("是否立即加入房间号[" + tableID + "]的房间？", function () {
                        MjClient.joinGame(parseInt(tableID));
                    }, function () { });
                    MjClient.native.doCopyToPasteBoard("");//清空剪切板
                }
                if (tableID.length == 8 && tableID != MjClient.myReplayCode) {
                    MjClient.showMsg("是否立即播放回放码为[" + tableID + "]的比赛？", function () {
                        MjClient.getOtherPlayLog(parseInt(tableID));
                    }, function () { });
                    MjClient.native.doCopyToPasteBoard("");//清空剪切板
                }
            }
        }, 1, cc.REPEAT_FOREVER, 1.5);
    },
    onExit: function () {
        this._super();
        cc.eventManager.removeListeners(cc.EventListener.KEYBOARD);
    },
    showJinbiView:function () {
        goldField_start();
    },
    setGamePanel: function (gamePanelNode) {
        var that = this;
        setWgtLayout(gamePanelNode, [1, 1], [0.5, 0.5], [0, -0.1]);

        ////加入房间
        this._joinRoom = gamePanelNode.getChildByName("joinRoom");
        this._joinRoom.setPressedActionEnabled(true);
        this._joinRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (!MjClient.data.sData) {
                        postEvent("createRoom", {});
                    }
                    else {
                        MjClient.Scene.addChild(new EnterRoomLayer());
                        MjClient.showMsg("房间已经创建,请直接加入房间。");
                    }
                    break;
                default:
                    break;
            }
        }, this);


        //加入房间
        this._createRoom = gamePanelNode.getChildByName("createRoom");
        this._createRoom.setPressedActionEnabled(true);
        this._createRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new EnterRoomLayer());
                    break;
                default:
                    break;
            }
        }, this);
    },
    updateYoujianCount: function () {
        var _sprite = this._youjian.getChildByName("hongDian");
        var _num = _sprite.getChildByName("Text");
        _num.ignoreContentAdaptWithSize(true);
        UIEventBind(null, _sprite, "refresh_mail_list", function () {
            if (MjClient.emailData) {
                var count = MjClient.emailData.length;

                for (var i = 0; i < MjClient.emailData.length; i++) {
                    if (MjClient.emailData[i].type == 1 || MjClient.emailData[i].type == 3) {
                        count--;
                    }
                }
                if (count > 0) {
                    _sprite.setVisible(true);
                    _num.setString(count);
                }
                else {
                    _sprite.setVisible(false);
                }
            }
        });
    },
    showSelectUiPanel: function () {
        var uiIndex = util.localStorageEncrypt.getNumberItem(MjClient.KEY_uiSelect, -1);
        if (uiIndex != -1) {
            return;
        }

        var selectUiBg = this.uiNode.getChildByName("selectUiBg");
        setWgtLayout(selectUiBg, [1, 1], [0.5, 0.5], [0, 0], true);
        selectUiBg.setVisible(true);

        var selectUiPanel = this.uiNode.getChildByName("selectUiPanel");
        setWgtLayout(selectUiPanel, [1, 1], [0.5, 0.5], [0, 0]);
        selectUiPanel.setVisible(true);

        var oldUiBtn = selectUiPanel.getChildByName("oldUiBtn");
        oldUiBtn.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED)
                return;

            util.localStorageEncrypt.setNumberItem(MjClient.KEY_uiSelect, 0);
            this.removeFromParent(true);
            MjClient.homeui = null;
            MjClient.addHomeView();
        }, this);

        var newUiBtn = selectUiPanel.getChildByName("newUiBtn");
        newUiBtn.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED)
                return;

            util.localStorageEncrypt.setNumberItem(MjClient.KEY_uiSelect, 1);
            this.removeFromParent(true);
            MjClient.homeui = null;
            MjClient.addHomeView();
        }, this);

        var setNodeVisible = function (isVisible) {
            var hideNodeNames = ["Panel_game", "fenxiang", "Button_store", "Btn_Active", "tuijian"];
            for (var i = 0; i < hideNodeNames.length; i ++) {
                this.uiNode.getChildByName(hideNodeNames[i]).setVisible(isVisible);
            }
            this._jueSeNode.setVisible(isVisible);
            this._laba_bg.setVisible(isVisible);
        }.bind(this);

        setNodeVisible(false);
    }

});

