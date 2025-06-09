// ------牌友联盟岳阳棋牌 home 3.0--------
var HomeView_qxyyqp_v3 = cc.Layer.extend({
    _gamePanelNode: null,
    _joinRoom: null,
    _createRoom: null,
    ctor: function() {
        var that = this;
        this._super();
        var homeui = ccs.load("Home_3.0.json");
        this.uiNode = homeui.node;
        //BindUiAndLogic(homeui.node,this.jsBind);
        this.addChild(homeui.node);
        MjClient.homeui = this;
        playMusic("bgMain");
        setMusicVolume(-1);

        UIEventBind(this.jsBind, homeui.node, "logout", function() {
            if (MjClient.homeui) {
                MjClient.homeui.removeFromParent(true);
                delete MjClient.homeui;
            }
        });

        UIEventBind(null, this, "themeChange", function(eD) {
            that.setTheme(eD.themeIdx, eD.sex);
        });

        var _back = homeui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0], true);
        this._back = _back;

        this.initRoleModel();
        this.initTopPanel();
        this.initBottomPanel();
        this.initLaba();
        this.initGamePanel();
        this.initThirdPartyGamePanel();
        // this.initOther();
        this.initActivityBtns(homeui);

        return true;
    },

    initActivityBtns: function(homeui) {
        showHomeActivityIcon(homeui);

        var btnNames = ["btnLucky", "btn_800yuan", "btn_Qiandao", "btnChargePrize", "btnJulebuFuli", "btn_jiayouhongbao", "btn_NewYear", "btn_newPlayerPrize",
            "btn_ZhuaWaWa", "btn_duanwujie", "btn_bangdingshouji", "btn_shimingrenzheng", "btn_yaoqingHB", "btn_jifenShop", "btn_qiandaochoujiang",
            "btn_zhongqiujie88", "btn_zhongQiuJieRank", "btn_actJinBiChang", "btn_mianfeiliquan", "btn_goldInviteRedpacket", "btn_friendsPK",
            "btnLCBX", "btn_chouqian", "btn_flyAKite", "btn_collectSpringBean", "btn_growth"];

        var x = MjClient.size.width * 0.97;
        var y = MjClient.size.height * 0.82;
        var width = Math.min(79 * MjClient.size.width / 1280, 84 * MjClient.size.height / 720);
        for (var i = 0; i < btnNames.length; i ++) {
            var btn = homeui.node.getChildByName(btnNames[i]);
            if (!btn || !btn.isVisible())
                continue;

            btn.setScale(width/btn.width);

            btn.x = x - width * 0.6;
            btn.y = y;
            x -= width * 1.2;
        }
    },

    initRoleModel: function() {
        var roleNode = this._back.getChildByName("roleNode");
        roleNode.visible = false;
        this.spineNode = new cc.Node();
        this._back.addChild(this.spineNode);
        this.spineNode.setZOrder(2);
        var sex = MjClient.getUIThemeRoleSex();
        var themeIdx = MjClient.getUIThemeIndex();
        this.setTheme(themeIdx, sex);
    },
    setRole: function(themeIdx, sex){
        var theme = MjClient.getThemeInfo(themeIdx);
        if (theme.isNewYear) {
            UI30_updateRoteNewYear(this, this.spineNode, themeIdx, sex, false);
            return;
        }

        this.spineNode.removeAllChildren();
        var spine = createSpine("home_3.0/role/spine/"+ theme.role[sex] +".json", "home_3.0/role/spine/"+ theme.role[sex] +".atlas");
        this.spineNode.addChild(spine);
        spine.setAnimation(0, "animation", true);
        spine.setPosition(theme.rolePos[sex]);
        if (theme.role[sex] === "miaozunv") {
            //苗族女,动画做大了，需缩小
            spine.setScale(0.28);
        }

        if (this.roleTouchListener) {
            cc.eventManager.removeListener(this.roleTouchListener);
            this.roleTouchListener = null;
        }

        this.roleTouchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan : function(touch, event){
                if (theme.haveTouchAni[sex]) {
                    spine.setAnimation(0, "touchAni", false);
                    spine.addAnimation(0, "animation", true);
                }
                return true;
            }
        });
        cc.eventManager.addListener(this.roleTouchListener, this);
    },
    setTheme: function(themeIdx, sex){
        if (themeIdx<0) {
            return;
        }
        var theme = MjClient.getThemeInfo(themeIdx);
        var topPanel = this.uiNode.getChildByName("topPanel");
        var rightList = topPanel.getChildByName("rightList");
        var sceneName = rightList.getChildByName("switchSceneBg").getChildByName("sceneName");
        sceneName.ignoreContentAdaptWithSize(true);
        sceneName.setString(theme.homeTitle);
        this._back.loadTexture("home_3.0/bg/" + theme.bg);
        this.setRole(themeIdx, sex);
        //播放粒子特效
        var lizitexiao = this._back.getChildByName("lizitexiao");
        if (!lizitexiao) {
            lizitexiao =  new cc.ParticleSystem();
            lizitexiao.setName("lizitexiao");
            lizitexiao.setZOrder(1);
            this._back.addChild(lizitexiao);
        }
        if (theme.particle) {
            lizitexiao.initWithFile("home_3.0/Particle/" + theme.particle);
            lizitexiao.setPosition(cc.p(this._back.width/2, this._back.height/2));
            lizitexiao.resetSystem();
            lizitexiao.visible = true;
        }
        else{
            lizitexiao.stopSystem();
            lizitexiao.visible = false;
        }  

        //遮挡物
        var Shelter = this._back.getChildByName("Shelter");
        if (!Shelter){
            Shelter = new ccui.ImageView();
            Shelter.setName("Shelter");
            Shelter.setZOrder(3);
            Shelter.setPosition(cc.p(this._back.width/2, this._back.height/2));
            this._back.addChild(Shelter);
        }
        Shelter.visible = false;
        if (theme.shelter) {
            Shelter.visible = true;
            Shelter.loadTexture("res/home_3.0/shelter/" + theme.shelter);
        }        
    },
    initTopPanel: function() {
        var topPanel = this.uiNode.getChildByName("topPanel");
        setWgtLayout(topPanel, [1, 0], [0.5, 1], [0, 0]);
        var headbg = topPanel.getChildByName("headbg");
        var rightList = topPanel.getChildByName("rightList");
        var bg_huobi = rightList.getChildByName("bg_huobi");
        AddGuiZuHeadFrame(headbg);

        // 头像、名称、ID
        this.initUserInfo(headbg);

        // 元宝、钻石、礼券
        this.initMoneyInfo(bg_huobi);

        // 设置
        this.initSetting(rightList);

        // 皮肤切换（新旧切换、地区切换）
        this.initSwitchSkinBtn(rightList);
    },
    playSceneChangeAni: function(){
        var topPanel = this.uiNode.getChildByName("topPanel");
        var thirdPartyGamePanel = this.uiNode.getChildByName("thirdPartyGamePanel");
        var gamePanel = this.uiNode.getChildByName("gamePanel");
        var bottom_bg = this.uiNode.getChildByName("bottom_bg");

        //原位置
        var posArr = [
            topPanel.getPosition(), 
            thirdPartyGamePanel.getPosition(), 
            gamePanel.getPosition(),
            bottom_bg.getPosition()
        ] 

        //动作起始位置
        topPanel.y += 100;
        thirdPartyGamePanel.x -= 200;
        gamePanel.x += 300;
        bottom_bg.y -= 100;
        var moveTime = 0.3;
        var delayTime = 0.2;
        topPanel.runAction(cc.sequence(cc.delayTime(delayTime), cc.moveTo(moveTime, posArr[0]).easing(cc.easeBackOut())));
        thirdPartyGamePanel.runAction(cc.sequence(cc.delayTime(delayTime),cc.moveTo(moveTime, posArr[1]).easing(cc.easeBackOut())));
        gamePanel.runAction(cc.sequence(cc.delayTime(delayTime),cc.moveTo(moveTime, posArr[2]).easing(cc.easeBackOut())));
        bottom_bg.runAction(cc.sequence(cc.delayTime(delayTime),cc.moveTo(moveTime, posArr[3]).easing(cc.easeBackOut())));
    },

    initBottomPanel: function() {
        var bottom_bg = this.uiNode.getChildByName("bottom_bg");
        setWgtLayout(bottom_bg, [1, 0], [0.5, 0], [0, 0]);

        // 商城
        this.initBtnShop(bottom_bg);

        // 客服
        this.initBtnKeFu(bottom_bg);

        // 战绩
        this.initZhanjiBtn(bottom_bg);

        // 活动
        this.initBtnActive(bottom_bg);

        // 分享有礼
        this.initBtnShare(bottom_bg);

        // 代理
        this.initBtnAdv(bottom_bg);
        
        // 创建房间
        this.initCreateRoomBtn(bottom_bg);

        // 加入房间
        this.initJoinRoomBtn(bottom_bg);

        var moreLayer = bottom_bg.getChildByName("moreLayer");
        if (!moreLayer.isInit) {
            moreLayer.isInit = true;
            // 帮助
            this.initBtnHTP(moreLayer);

            // 推荐有礼
            this.initBtnTuijian(moreLayer);

            // 邮件
            this.initYoujianBtn(moreLayer);

            //亲友圈邀请审核
            this.initInviteShenheBtn(moreLayer);

            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: false,
                status: null,
                onTouchBegan: function(touch, event) {
                    if (moreLayer.isVisible()) {
                        moreLayer.runAction(cc.sequence(cc.fadeOut(0.5), cc.hide()));
                        return true;
                    }

                    return false;
                },
            }, moreLayer);
        }

        // 更多
        var btnMore = bottom_bg.getChildByName("btnMore");
        btnMore.addTouchEventListener(function(sender, Type) {
            if (Type != ccui.Widget.TOUCH_ENDED)
                return;

            this.showBottomMorePanel(bottom_bg);
        }, this);
        bottom_bg.getChildByName("moreLayer").setVisible(false);
        this.refreshMoreHongDian(btnMore);
    },

    refreshMoreHongDian: function(btnMore) {
        var hongDian = btnMore.getChildByName("hongDian");
        var text = hongDian.getChildByName("Text");
        
        var that = this;
        var refresh = function() {
            var youjianHongDian = that._youjian.getChildByName("hongDian");
            var tipNum = 0;
            var visible = false;
            if (youjianHongDian)
            {
                if (youjianHongDian.visible) {
                    tipNum += parseInt(youjianHongDian.getChildByName("Text").getString())
                    visible = true;
                }
            }
            if (that._inviteShenheBtn) {
                var inviteHongdian = that._inviteShenheBtn.getChildByName("hongDian");
                if (inviteHongdian.visible) {
                    tipNum += parseInt(inviteHongdian.getChildByName("Text").getString());
                    visible = true;
                }
            }
            hongDian.setVisible(visible);
            text.setString(tipNum);
        }

        hongDian.setVisible(false);
        btnMore.runAction(cc.sequence(cc.delayTime(1.0), cc.callFunc(refresh)).repeatForever());
    },

    showBottomMorePanel: function(parent) {
        var moreLayer = parent.getChildByName("moreLayer");
        moreLayer.setVisible(true);

        moreLayer.setOpacity(0);
        moreLayer.runAction(cc.fadeIn(0.5));
    },

    // 活动按钮
    initBtnActive: function(parent) {
        var _btnActive = parent.getChildByName("Btn_Active");

        function _btnActiveTouchEvent(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Activity", {
                        uid: SelfUid()
                    });
                    updateUserBehavior("活动");
                    if (MjClient.systemConfig && MjClient.systemConfig.activity) {
                        cc.log("-----------0000------suisuisi....................");
                        var layer = new activityLayer();
                        MjClient.Scene.addChild(layer);
                    }
                    break;
                default:
                    break;
            }
        }

        _btnActive.addTouchEventListener(_btnActiveTouchEvent, this);
    },

    // 设置
    initSetting: function(parent) {
        var _setting = parent.getChildByName("setting");
        _setting.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var settringLayer = new HomeSettingView_yueyang_v3();
                    settringLayer.setName("HomeClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi", {
                        uid: SelfUid()
                    });
                    updateUserBehavior("设置");
                    break;
                default:
                    break;
            }
        }, this);
    },

    // 客服按钮
    initBtnKeFu: function(parent) {
        var _BtnKeFu = parent.getChildByName("BtnKeFu");
        _BtnKeFu.visible = true;
        var _BtnKeFu_HongDian = _BtnKeFu.getChildByName("hongDian");
        if (_BtnKeFu_HongDian) {
            _BtnKeFu_HongDian.setVisible(false);
            UIEventBind(null, _BtnKeFu, "QiYuUnreadCount", function(data) {
                if (data.count) {
                    _BtnKeFu_HongDian.setVisible(true);
                    _BtnKeFu_HongDian.getChildByName("Text").setString(data.count);
                } else {
                    _BtnKeFu_HongDian.setVisible(false);
                }
            });
        }
        _BtnKeFu.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:

                    var kefuLayer = new HomeKefuView_yueyang_v3();
                    MjClient.Scene.addChild(kefuLayer);

                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Kefu", {
                        uid: SelfUid()
                    });
                    updateUserBehavior("客服");
                    // if (!isCurrentNativeVersionBiggerThan("14.0.0")) {
                    //     MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                    //         type: 9
                    //     }, function(rtn) {
                    //         if (rtn.code == 0) {
                    //             MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
                    //         } else {
                    //             if (rtn.message) {
                    //                 MjClient.showToast(rtn.message);
                    //             } else {
                    //                 MjClient.showToast("获取数据失败");
                    //             }
                    //         }
                    //     });
                    // } else {
                    //     MjClient.native.showQiYuChatDialog();
                    // }
                    break;
                default:
                    break;
            }
        }, this);
    },

    // 帮助按钮
    initBtnHTP: function(parent) {

        var _BtnHTP = parent.getChildByName("BtnHTP");
        _BtnHTP.visible = true;
        _BtnHTP.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.openWeb({
                        url: null,
                        help: true
                    });
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Wanfa", {
                        uid: SelfUid()
                    });
                    updateUserBehavior("玩法");
                    break;
                default:
                    break;
            }
        }, this);
    },

    // 战绩
    initZhanjiBtn: function(parent) {
        var _zhanji = parent.getChildByName("zhanji");
        _zhanji.visible = true;
        _zhanji.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    updateUserBehavior("战绩");
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji", {
                        uid: SelfUid()
                    });
                    //MjClient.showMsg("暂未开放!");
                    if (!MjClient.data.sData) {
                        MjClient.Scene.addChild(new PlayLogView());
                    } else MjClient.showMsg("正在游戏中，不能查看战绩");
                    break;
                default:
                    break;
            }
        }, this);
    },

    // 邮件
    initYoujianBtn: function(parent) {
        this._youjian = parent.getChildByName("youjian");
        this._youjian.visible = true;
        this._youjian.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var emailLayer = new EmailLayer_v3();
                    MjClient.Scene.addChild(emailLayer);
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_YoujianClick", {
                        uid: SelfUid()
                    });
                    updateUserBehavior("邮件");
                    break;
                default:
                    break;
            }
        }, this);
        this._youjian.getChildByName("hongDian").setVisible(false);
        this.updateYoujianCount();
    },

    //亲友圈邀请审核
    initInviteShenheBtn: function(parent){
        if (isAgent()) {//代理才有的按钮
            parent.x += 75;
            parent.width *= 4/3;
            this._inviteShenheBtn = new ccui.Button("home_3.0/btn_shenghe.png");
           
            var hongDian = new ccui.ImageView("home_3.0/bg_hongdian.png");
            hongDian.setName("hongDian");
            hongDian.setPosition(cc.p(0, this._inviteShenheBtn.height));
            this._inviteShenheBtn.addChild(hongDian);
            var Text = new ccui.Text();
            Text.setName("Text");
            Text.setFontName("fonts/lanting.ttf");
            Text.setFontSize(20);
            Text.setTextColor(cc.color(255,255,255));
            Text.setPosition(19, 23);
            Text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            hongDian.addChild(Text);
            hongDian.visible = false;

            parent.addChild(this._inviteShenheBtn);
            this._inviteShenheBtn.setPosition(cc.p(577.75, 57.6));
            this._inviteShenheBtn.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.Scene.addChild(new Friendcard_Invite_Shenhe());
                        break;
                    default:
                        break;
                }
            }, this);


            UIEventBind(null, this._inviteShenheBtn, "refresh_inviteShenhe_num", function(data) {
                if (typeof(data.num) != "undefined") {
                    if (data.num == 0) {
                        hongDian.visible = false;
                    }else{
                        hongDian.visible = true;
                        Text.setString(data.num);
                    }
                }
            });
        }
    },

    // 广告代理
    initBtnAdv: function(parent) {
        var _btnAdv = parent.getChildByName("btnAdv");
        var daili_qipao = _btnAdv.getChildByName("daili_qipao");
        daili_qipao.runAction(cc.repeatForever(cc.sequence(
            cc.fadeIn(1),
            cc.repeat(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2)), 5),
            cc.fadeOut(1),
            cc.delayTime(0.5))));
        var Text_qipao = daili_qipao.getChildByName("Text_qipao");
        Text_qipao.setString("双11庆典！场次冲一冲，购物车清空！");
        daili_qipao.setVisible(false);
        // if(MjClient.systemConfig.dailiZixun && MjClient.systemConfig.dailiZixun.length > 0){
        //     daili_qipao.setVisible(true);
        //     Text_qipao.setString("申请代理，加我微信："+MjClient.systemConfig.dailiZixun);
        // }
        _btnAdv.visible = true;
        if (MjClient.remoteCfg.guestLogin == true || MjClient.isShenhe == true) {
            _btnAdv.visible = false;
            _btnAdv.setTouchEnabled(false);
        }
        var bAdvShow = true;
        _btnAdv.addTouchEventListener(function(sender, Type) {

            var jumbFunc = function() {
                MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                    type: 1
                }, function(rtn) {
                    if (rtn.code == 0) {
                        // MjClient.native.OpenUrl(rtn.data);
                        var layer = new DaiLiWebviewLayer(rtn.data);
                        if (layer.isInitSuccess())
                            MjClient.Scene.addChild(layer);
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        } else {
                            MjClient.showToast("获取数据失败");
                        }
                    }
                });
            };

            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Daili", {
                        uid: SelfUid()
                    });
                    updateUserBehavior("代理");
                    //是代理
                    if (isAgent()) {
                        jumbFunc();
                    } else {
                        var layer = new BindingCodeLayer3_30();
                        MjClient.Scene.addChild(layer);
                    }

                    break;
                default:
                    break;
            }
        }, this);
    },

    // 跑马灯
    initLaba: function() {

        var laba = this.uiNode.getChildByName("laba_bg");
        setWgtLayout(laba, [laba.width / 1560, laba.height / 720], [0.27, 0.82], [0, 0]);

        var _scroll = laba.getChildByName("scroll");

        var _msg = _scroll.getChildByName("msg");
        var scrollDataArr = [];
        scrollDataArr.push(MjClient.remoteCfg.guestLogin ? "欢迎来到" + AppCnName[MjClient.getAppType()] : MjClient.systemConfig.homeScroll);
        homePageRunText(_msg, scrollDataArr);

        function getMsg() {
            var content = "" + MjClient.systemConfig.homeScroll;
            return MjClient.remoteCfg.guestLogin ? "欢迎来到" + AppCnName[MjClient.getAppType()] : content;
        }
        _msg.setString(getMsg());
        UIEventBind(null, _scroll, "userReportPush", function(scrollData) {
            if (scrollData.length > 0) {
                var scrollDataNew = [];
                for (var i = 0; i < scrollData.length; i++) {
                    scrollDataNew.push("经公司核实，" + unescape(scrollData[i].nickname) + "存在" + unescape(scrollData[i].type) + "等不良行为，已对该用户进行封号处理。")
                }
                homePageRunText(_msg, scrollDataNew);

            }
            _scroll.schedule(function() {
                homePageRunText(_msg, scrollDataArr);
            }, 600);
        });
    },

    initBtnShare: function(parent) {

        //分享有礼
        var _btnShareGet = parent.getChildByName("fenxiang");

        if (MjClient.remoteCfg.guestLogin == true) {
            _btnShareGet.visible = false;
            _btnShareGet.setTouchEnabled(false);
        }

        _btnShareGet.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    {
                        var _sprite = _btnShareGet.getChildByName("hongDian");
                        MjClient.Scene.addChild(new shareTodayLayer(_sprite.visible));
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Share", {
                            uid: SelfUid()
                        });
                        updateUserBehavior("分享");
                    }
                    break;
                default:
                    break;
            }
        }, this);
        var _shareTip = _btnShareGet.getChildByName("fenxiang_tip");
        var checkShareTipFunc = function() {
            var lastStr = MjClient.data.pinfo.lastShareDay;
            var currentStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
            var _sprite = _btnShareGet.getChildByName("hongDian");


            if (currentStr <= lastStr) {
                _sprite.visible = false;
            } else {
                _sprite.visible = true;
            }
            if (_sprite && _shareTip)
                _shareTip.visible = _sprite.visible;

        }
        checkShareTipFunc();
        _btnShareGet.schedule(checkShareTipFunc, 1);

        if (_shareTip) {
            _btnShareGet.setZOrder(1);
            _shareTip.setOpacity(0);
            _shareTip.runAction(cc.repeatForever(cc.sequence(
                cc.fadeIn(1),
                cc.repeat(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2)), 5),
                cc.fadeOut(1),
                cc.delayTime(0.5))));
        }
    },

    initBtnTuijian: function(parent) {
        //推荐有礼
        var _btntuijian = parent.getChildByName("tuijian");

        if (MjClient.remoteCfg.guestLogin == true) {
            _btntuijian.visible = false;
            _btntuijian.setTouchEnabled(false);
        }

        _btntuijian.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite", {
                        uid: SelfUid()
                    });
                    updateUserBehavior("邀请下载");
                    var layer = new recommendLayer_active();
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }
        }, this);
    },

    initUserInfo: function(headParent, huobiParent) {
        var selfHead = SelfHeadInfo();
        MjClient.loadWxHead(selfHead.uid, selfHead.url);

        var head = headParent.getChildByName("head");

        //昵称
        var _name = head.getChildByName("name");
        _name.setString(getNewName(unescape(MjClient.data.pinfo.nickname)));
        _name.ignoreContentAdaptWithSize(true);

        //ID
        var _uid = head.getChildByName("uid");
        _uid.setString("ID:" + SelfUid());
        _uid.ignoreContentAdaptWithSize(true);

        this._headNode = head;
        UIEventBind(this.jsBind, head, "loadWxHead", function(d) {
            if (d.uid == MjClient.data.pinfo.uid) {
                var img = new cc.Sprite(d.img);
                img.setScale(head.getContentSize().width / img.getContentSize().width * 0.9);
                img.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2 + 1);
                head.addChild(img);
            }
        });

        head.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.showPlayerInfoBind(MjClient.data.pinfo, true, true);
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang", {
                        uid: SelfUid()
                    });
                    break;
                default:
                    break;
            }
        }, this);

        this.initHeadGuiZuTag(head);
        this.initHeadRedPointTag(head);
    },

    initHeadGuiZuTag: function(head) {
        var guizuTag = head.getChildByName("guizuTag");

        // 贵族功能不在这里面实现
        guizuTag.setVisible(false);
        return;

        var pinfo = MjClient.data.pinfo;
        var str_gz = pinfo.userGrade > 0 ? pinfo.userGrade : 0;
        guizuTag.loadTexture("userInfo_3.0/guiZu/gz_0" + str_gz + ".png");
    },

    initHeadRedPointTag: function(head) {
        var redPoint = head.getChildByName("redPoint");
        redPoint.setVisible(false);

        UIEventBind(null, redPoint, "user_growth_activity", function(d) {
            var _data = d;
            var isShow = false;
            if (d) {
                if (_data.diamondManageCraveUp && _data.diamondManageCraveUp.isShow) {
                    isShow = true;
                }
                if (_data.dailyLoginEmpirical && _data.dailyLoginEmpirical.isShow) {
                    isShow = true;
                }
            }
            redPoint.visible = isShow;
        });
    },

    initMoneyInfo: function(parent) {

        var btn_yuanbao = parent.getChildByName("btn_yuanbao");
        var btn_zuanshi = parent.getChildByName("btn_zuanshi");
        var btn_liquan = parent.getChildByName("btn_liquan");

        btn_yuanbao.addTouchEventListener(function(sender, type) {
            if (type === 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Gold_Add", {
                    uid: SelfUid()
                });
                this.changeMoney();
                MjClient.Scene.addChild(enter_store());
            }
        }, this);

        btn_zuanshi.addTouchEventListener(function(sender, type) {
            if (type === 2) {
                this.changeMoney();
                MjClient.Scene.addChild(enter_store());
            }
        }, this);

        if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JI_FEN_SHANG_CHENG))
            btn_liquan.setVisible(false);

        btn_liquan.addTouchEventListener(function(sender, type) {
            if (type === 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Liquan_Add", {
                    uid: SelfUid()
                });
                this.changeMoney();
                MjClient.Scene.addChild(new ShopOfJifen_layer_v3());
            }
        }, this);

        this.yuanbaoNumNode = btn_yuanbao.getChildByName("numText");
        this.liquanNumNode = btn_liquan.getChildByName("numText");
        this.zuanshiNumNode = btn_zuanshi.getChildByName("numText");

        this.yuanbaoNumNode.ignoreContentAdaptWithSize(true);
        this.liquanNumNode.ignoreContentAdaptWithSize(true);
        this.zuanshiNumNode.ignoreContentAdaptWithSize(true);

        var that = this;
        UIEventBind(this.jsBind, parent, "updateInfo", function() {
            var lastMoney = parseInt(MjClient.data.pinfo.money);
            var lastZuanshi = parseInt(MjClient.data.pinfo.fangka);
            var lastLiquan = Number(MjClient.data.pinfo.integral);

            var nodes = [that.yuanbaoNumNode, that.zuanshiNumNode, that.liquanNumNode];
            var lastValues = [lastMoney, lastZuanshi, lastLiquan];

            for (var i = 0; i < 3; i++) {
                if (lastValues[i] > nodes[i].preValue) {
                    var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                    starParticle.setPosition(nodes[i].getContentSize().width / 2, nodes[i].getContentSize().height / 2);
                    nodes[i].addChild(starParticle);
                    nodes[i].runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
                }
            }

            MjClient.homeui.changeMoney();
        });

        UIEventBind(this.jsBind, parent, "loginOK", function() {
            MjClient.homeui.changeMoney();
        });

        this.changeMoney();
    },

    initBtnShop: function(parent) {
        //商城
        var _BtnShop = parent.getChildByName("Button_store");
        if (MjClient.remoteCfg.hideMoney == true || MjClient.isShenhe == true) {
            _BtnShop.visible = false;
            _BtnShop.setTouchEnabled(false);
        }
        _BtnShop.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = enter_store();
                    MjClient.Scene.addChild(layer);
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop", {
                        uid: SelfUid()
                    });
                    updateUserBehavior("商城");
                    break;
                default:
                    break;
            }
        }, this);

    },

    initSwitchSkinBtn: function(parent) {
        var switchSkin = parent.getChildByName("switchSkin");
        switchSkin.addTouchEventListener(function(sender, Type) {
            if (Type != ccui.Widget.TOUCH_ENDED)
                return;

            MjClient.setSkinToServer(1, function() {
                if (MjClient.homeui && cc.sys.isObjectValid(MjClient.homeui)) {
                    MjClient.homeui.removeFromParent(true);
                    MjClient.homeui = null;
                    MjClient.addHomeView();
                }
                MjClient.switch_skinFresh();
            });
        });

        var switchSceneBg = parent.getChildByName("switchSceneBg");
        switchSceneBg.addTouchEventListener(function(sender, Type) {
            if (Type != ccui.Widget.TOUCH_ENDED)
                return;
            MjClient.Scene.addChild(new SetTheme());
        });

    },

    onEnter: function() {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function(keyCode, event) {
                if (keyCode == cc.KEY.back) {
                    if (this._keyBackClickedTime && (new Date()).getTime() - this._keyBackClickedTime <= 1 * 1000) {
                        delete this._keyBackClickedTime;
                        showExitGameLayer();
                    } else {
                        if (MjClient.exitLayer && cc.sys.isObjectValid(MjClient.exitLayer)) {
                            MjClient.exitLayer.removeFromParent();
                            MjClient.exitLayer = null;
                        } else {
                            this._keyBackClickedTime = (new Date()).getTime();
                        }
                    }
                }
            }
        }, this);


        //检查剪切板
        this.schedule(function() {
            if (MjClient.playui) {
                return;
            }

            var clipboardStr = MjClient.native.doGetPasteBoard();
            if (!cc.isUndefined(clipboardStr) && clipboardStr.length > 0) {
                var tableID = clipboardStr.substring(clipboardStr.indexOf('[') + 1, clipboardStr.indexOf(']'));
                if (tableID.length == 6) {
                    MjClient.showMsg("是否立即加入房间号[" + tableID + "]的房间？", function() {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fenxiang_Jiaru_sure", {
                            uid: SelfUid()
                        });
                        MjClient.joinGame(parseInt(tableID));
                    }, function() {});
                    MjClient.native.doCopyToPasteBoard(""); //清空剪切板
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fenxiang_Jiaru", {
                        uid: SelfUid()
                    });
                }
                if (tableID.length == 8 && tableID != MjClient.myReplayCode) {
                    MjClient.showMsg("是否立即播放回放码为[" + tableID + "]的比赛？", function() {
                        MjClient.getOtherPlayLog(parseInt(tableID));
                    }, function() {});
                    MjClient.native.doCopyToPasteBoard(""); //清空剪切板
                }
            }
        }, 1, cc.REPEAT_FOREVER, 1.5);
    },
    doShowAction: function() {},

    changeMoney: function() {
        this.yuanbaoNumNode.preValue = MjClient.data.pinfo.money;
        changeAtalsForLabel(this.yuanbaoNumNode, MjClient.data.pinfo.money);

        this.zuanshiNumNode.preValue = MjClient.data.pinfo.fangka;
        changeAtalsForLabel(this.zuanshiNumNode, MjClient.data.pinfo.fangka);

        this.liquanNumNode.preValue = MjClient.data.pinfo.integral;
        changeAtalsForLabel(this.liquanNumNode, MjClient.data.pinfo.integral);
    },
    onExit: function() {
        this._super();
        cc.eventManager.removeListeners(cc.EventListener.KEYBOARD);
        if (this.roleTouchListener) {
            cc.eventManager.removeListener(this.roleTouchListener);
            this.roleTouchListener = null;
        }
    },

    initJoinRoomBtn: function(parent) {
        this._joinRoom = parent.getChildByName("joinRoom");
        this._joinRoom.setPressedActionEnabled(true);
        this._joinRoom.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new EnterRoomLayer());
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian", {
                        uid: SelfUid()
                    });
                    updateUserBehavior("加入房间");
                    break;
                default:
                    break;
            }
        }, this);
    },

    initCreateRoomBtn: function(parent) {
        this._createRoom = parent.getChildByName("createRoom");
        this._createRoom.setPressedActionEnabled(true);
        this._createRoom.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian", {
                        uid: SelfUid()
                    });
                    updateUserBehavior("创建房间");
                    if (!MjClient.data.sData) {
                        postEvent("createRoom", {});
                    } else {
                        MjClient.showMsg("房间已经创建,请直接加入房间。");
                    }
                    break;
                default:
                    break;
            }
        }, this);
    },

    addGoldBtnJiaoBiao: function(goldBtn) {
        var jiaoBiaoDi = new cc.Sprite("home_3.0/jiaobiao1_1.png");
        var jiaoBiao = new cc.Sprite("home_3.0/jiaobiao1.png");
        jiaoBiaoDi.setAnchorPoint(1.0, 0.0);
        jiaoBiao.setAnchorPoint(0.85, 0.05);
        jiaoBiaoDi.setPosition(jiaoBiaoDi.width * 1.25, goldBtn.height - jiaoBiaoDi.height * 0.95);
        jiaoBiao.setPosition(jiaoBiaoDi.width * 1.15, goldBtn.height - jiaoBiaoDi.height * 0.85);
        goldBtn.addChild(jiaoBiaoDi, 101);
        goldBtn.addChild(jiaoBiao, 101);

        jiaoBiao.runAction(cc.sequence(cc.rotateTo(3, 30).easing(cc.easeSineInOut()), cc.rotateTo(2, 0).easing(cc.easeSineInOut())).repeatForever());
    },

    initGamePanel: function() {
        var that = this;

        var gamePanelNode = this.uiNode.getChildByName("gamePanel");
        this._gamePanelNode = gamePanelNode;
        gamePanelNode.setAnchorPoint(0.5, 1.0);
        setWgtLayout(gamePanelNode, [gamePanelNode.width / 1560, gamePanelNode.height / 720], [1, 0.74], [-0.6, 0]);

        //金币场
        var goldBtn = gamePanelNode.getChildByName("goldBtn");
        goldBtn.setPressedActionEnabled(true);

        //goldBtn.setName("soundSelf");
        goldField_updateListener(goldBtn);
        this.addGoldBtnJiaoBiao(goldBtn);
        goldBtn.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.showToast("更多游戏，敬请期待！");
                    // MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinbichang", {
                    //     uid: SelfUid()
                    // });
                    // updateUserBehavior("娱乐场");
                    // goldField_start();
                    break;
                default:
                    break;
            }
        }, this);

        var clubEnter = gamePanelNode.getChildByName("clubEnter");
        clubEnter.visible = MjClient.systemConfig.clubEnable == "true" && MjClient.isShenhe == false;
        clubEnter.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    //reallyPlayEffect("sound/home_click.mp3",false);
                    MjClient.Scene.addChild(new FriendCard_main(null, 1));
                    updateUserBehavior("亲友圈");
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Qinyouquan", {
                        uid: SelfUid()
                    });
                    break;
                default:
                    break;
            }
        }, this);

    },

    initThirdPartyGamePanel: function() {

        var thirdPartyGamePanel = this.uiNode.getChildByName("thirdPartyGamePanel");
        thirdPartyGamePanel.setAnchorPoint(0.5, 1.0);
        setWgtLayout(thirdPartyGamePanel, [thirdPartyGamePanel.width / 1560, thirdPartyGamePanel.height / 720], [0, 0.73], [0.8, 0]);

        //添加第三方应用
        COMMON_UI.addHomeAdvMode(thirdPartyGamePanel, [0.03, 0.52]);
    },

    updateYoujianCount: function() {
        var _sprite = this._youjian.getChildByName("hongDian");
        var _num = _sprite.getChildByName("Text");
        _num.ignoreContentAdaptWithSize(true);
        UIEventBind(null, _sprite, "refresh_mail_list", function() {
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
                } else {
                    _sprite.setVisible(false);
                }
            }
        });
    },
});