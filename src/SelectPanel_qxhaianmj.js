// ------牌友联盟海安麻将 home--------

var HomeView_qxhaianmj = cc.Layer.extend({
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
        var homeui = ccs.load(res.Home_json);
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

        //底框
        var _bottombg = homeui.node.getChildByName("ringt1");
        var _right2 = homeui.node.getChildByName("right2");
        var _left1 = homeui.node.getChildByName("left1");

        setWgtLayout(_bottombg, [1, 1], [0.5, 0], [0, 0]);
        setWgtLayout(_right2, [0.4, 0.4], [1, 1], [0, 0]);
        setWgtLayout(_left1, [0.4, 0.4], [0, 1], [0, 0]);
        //for iphone x
        var _bottomImage = _back.getChildByName("Image_4");
        _bottomImage.setAnchorPoint(0.5,0);
        setWgtLayout(_bottomImage, [0.7, 0.9], [0.5, 0], [0, 0], false,true);

        // var _tilebg = homeui.node.getChildByName("tilebg");
        // _tilebg.visible = false;
        // setWgtLayout(_tilebg, [0.5, 0.5], [0.5, 0.7], [0, 0]);

        // function runLightEffectAction(lightNode) {
        //     var _Image_light_scale = lightNode.getScale();
        //     var a = cc.scaleTo(1, _Image_light_scale * 0.6);
        //     var a1 = cc.scaleTo(0.8, _Image_light_scale * 0.3);
        //     lightNode.runAction(cc.sequence(a, a1).repeatForever());
        // }

        // var _Image_light = homeui.node.getChildByName("Image_light");

        //活动伸缩按钮
        var _btnActive = homeui.node.getChildByName("Btn_Active");
        // _Image_light.visible = true;

        function _btnActiveTouchEvent(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Activity", {uid:SelfUid()});
                    if (MjClient.systemConfig && MjClient.systemConfig.activity)
                    {
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
        //setWgtLayout(_setting, [0.06, 0.13], [1, 1.02], [-0.6, -0.8]);
        _setting.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var settringLayer = new HomeSettingView_nantong();
                    settringLayer.setName("HomeClick");
                    MjClient.Scene.addChild(settringLayer);
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);


        //咨询
        var btnZiXun = homeui.node.getChildByName("btnZiXun");
        if(btnZiXun) {
            btnZiXun.setVisible(false);
            btnZiXun.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        var ziXunLayer = new HomeZiXunLayer();
                        ziXunLayer.setName("HomeZiXunLayer");
                        MjClient.Scene.addChild(ziXunLayer);
                        MjClient.native.umengEvent4CountWithProperty("ZiXunClick", {uid:SelfUid()});
                        break;
                    default:
                        break;
                }
            }, this);

            var x = isIPhoneX() ? 0.04 : 0;
            setWgtLayout(btnZiXun, [0.4, 0.4], [x, 0.5], [0, 0]);
        }


        //右上角的帮助按钮,
        var _BtnHTP = homeui.node.getChildByName("BtnHTP");
        _BtnHTP.visible = true;
        _BtnHTP.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.openWeb({ url: null, help: true });
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Wanfa", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);

        //飞鸟
        var _flyNode = _back.getChildByName("Panel_flyBire");
        setWgtLayout(_flyNode, [0.4, 0.4], [0.6, 0.8], [0, 0], false, true);
        var path = "Particle/birdfly";
        var skyfly = COMMON_UI.creatFrameAni(path, "daniao_", 198);
        _flyNode.addChild(skyfly);

        // 湖面水痕粒子效果
        var shuibo_panel = _back.getChildByName("Panel_shuiwen");
        var waterParticle = new cc.ParticleSystem("Particle/shuibowen.plist");
        setWgtLayout(shuibo_panel, [0.9, 0.9], [0.48, 0.48], [0, 0], false, true);
        waterParticle.setPosition(0, 0);
        waterParticle.setScale(0.25);
        shuibo_panel.addChild(waterParticle);

        //湖面波光粼粼
        var _lackPanel = _back.getChildByName("Panel_lack");
        setWgtLayout(_lackPanel, [0.15, 0.15], [0.45, 0.43], [0, 0], false, true);
        var boGuangParticle = new cc.ParticleSystem("Particle/boguanglinlin.plist");
        boGuangParticle.setPosition(0, 0);
        _lackPanel.addChild(boGuangParticle);

        //战绩
        var _zhanji = homeui.node.getChildByName("zhanji");
        _zhanji.visible = true;
        _zhanji.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji", {uid:SelfUid()});
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
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_YoujianClick", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);
        this._youjian.getChildByName("hongDian").setVisible(false);
        this.updateYoujianCount();

        //客服按钮
        var _BtnKeFu = homeui.node.getChildByName("BtnKeFu");
        setWgtLayout(_BtnKeFu, [0.12,0.12], [0.28, 0], [0, 0.5]);
        _BtnKeFu.visible = true;
        var _BtnKeFu_HongDian = _BtnKeFu.getChildByName("hongDian");
        if(_BtnKeFu_HongDian){
            _BtnKeFu_HongDian.setVisible(false);
            UIEventBind(null, _BtnKeFu, "QiYuUnreadCount", function(data) {
                if(data.count) {
                    _BtnKeFu_HongDian.setVisible(true);
                    _BtnKeFu_HongDian.getChildByName("Text").setString(data.count);
                }else {
                    _BtnKeFu_HongDian.setVisible(false);
                }
            });
        }
        _BtnKeFu.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Kefu", {uid:SelfUid()});
                    if (!isCurrentNativeVersionBiggerThan("14.0.0"))
                    {
                        MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 9 }, function (rtn) {
                            if (rtn.code == 0) {
                                MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
                            }
                            else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                }
                                else {
                                    MjClient.showToast("获取数据失败");
                                }
                            }
                        });
                    }
                    else
                    {
                        MjClient.native.showQiYuChatDialog();
                    }
                    break;
                default:
                    break;
            }
        }, this);

        //广告代理
        var _btnAdv = homeui.node.getChildByName("btnAdv");
        var daili_qipao = _btnAdv.getChildByName("daili_qipao");
        daili_qipao.runAction(cc.repeatForever(cc.sequence(
                cc.fadeIn(1),
                cc.repeat(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2)), 5),
                cc.fadeOut(1),
                cc.delayTime(0.5))));
        var Text_qipao = daili_qipao.getChildByName("Text_qipao");
        daili_qipao.setVisible(false);
        if(MjClient.systemConfig.memberIconBubble && MjClient.systemConfig.memberIconBubble.length > 0){
            daili_qipao.setVisible(true);
            Text_qipao.setString(MjClient.systemConfig.memberIconBubble);
        }
        _btnAdv.visible = true;
        if (MjClient.remoteCfg.guestLogin == true) {
            _btnAdv.visible = false;
            _btnAdv.setTouchEnabled(false);
        }
        var bAdvShow = true;
        _btnAdv.schedule(function () {
            if(MjClient.systemConfig.moreGameEnable != "true")
            {
                return _btnAdv.loadTextureNormal("game_picture/daili_xia.png")
            }

            // if (bAdvShow) {
            //     _btnAdv.loadTextureNormal("game_picture/btn_adv_normal.png");
            //     bAdvShow = false;
            // }
            // else {
            //     bAdvShow = true;
            //     _btnAdv.loadTextureNormal("game_picture/btn_adv_normal.png");
            // }
        }, 0.5);
        _btnAdv.addTouchEventListener(function (sender, Type) {

            var jumbFunc = function () {
                MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 1 }, function (rtn) {
                    if (rtn.code == 0) {
                        // MjClient.native.OpenUrl(rtn.data);
                        var layer = new DaiLiWebviewLayer(rtn.data);
                        if (layer.isInitSuccess())
                            MjClient.Scene.addChild(layer);
                    }
                    else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        }
                        else {
                            MjClient.showToast("获取数据失败");
                        }
                    }
                });
            };

            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Daili", {uid:SelfUid()});
                    //是代理
                    if (isAgent()) {
                        jumbFunc();
                    }
                    else {
                        var layer = new BindingCodeLayer3();
                        MjClient.Scene.addChild(layer);
                    }

                    break;
                default:
                    break;
            }
        }, this);


        //标题
        this._tileIcon = homeui.node.getChildByName("title");

        //排行榜
        var _btnRank = homeui.node.getChildByName("btnRank");
        var starParticle = new cc.ParticleSystem("game_picture/diamondStar.plist");
        starParticle.setPosition(_btnRank.getContentSize().width / 2, _btnRank.getContentSize().height / 2);
        _btnRank.addChild(starParticle);
        //亲友圈
        var _btnjulebu = homeui.node.getChildByName("julebu");

        //更多游戏
        var _btnmoreGame = homeui.node.getChildByName("moreGame");

        //分享有礼
        var _btnShareGet = homeui.node.getChildByName("fenxiang");

        //推荐有礼
        var _btntuijian = homeui.node.getChildByName("tuijian");

        ////头像
        var _headbg = homeui.node.getChildByName("headbg");

        //商城
        var _BtnShop  = homeui.node.getChildByName("Button_store");

        //商城扫光和星光
        var _IconShop = _BtnShop.getChildByName("Image_guang");
        var starParticle = new cc.ParticleSystem("Particle/shopStar.plist");
        starParticle.setPosition(_IconShop.width/2, _IconShop.height/2);
        starParticle.setScale(1.2);
        _IconShop.addChild(starParticle);
        
        var shopBg = _BtnShop.getChildByName("Panel_shopBg");
        var shopClipper = new cc.ClippingNode();
        var shopSten = cc.Sprite.create("game_picture/xuanzhong_bg.png");
        var shopStenSize = shopSten.getContentSize();
        shopSten.setPosition(shopStenSize.width/2, shopStenSize.height/2);
        shopClipper.setContentSize(shopStenSize);
        shopClipper.setStencil(shopSten);
        shopClipper.setAlphaThreshold(0.03);
        shopBg.addChild(shopClipper);
        var shopScanningLight = new cc.Sprite("Particle/saoguang1.png");
        shopScanningLight.setBlendFunc(cc.ONE,cc.ONE);
        shopScanningLight.setOpacity(149);
        shopScanningLight.setScale(1.5);
        shopClipper.addChild(shopScanningLight);
        var shopRepeatAction = cc.repeatForever(cc.sequence(
            cc.moveTo(0.0, cc.p(-shopSten.width / 2, shopSten.height / 2)),
            cc.moveTo(3, cc.p(shopSten.width + shopSten.width, shopSten.height / 2)),
            cc.delayTime(0.3)));
        shopScanningLight.runAction(shopRepeatAction); //进行向右移动的重复动作

        //炮神榜
        //var _btnPao   = homeui.node.getChildByName("btnPao");

        //要新
        var _btnYaoXin = homeui.node.getChildByName("btnYaoXin");

        //红包背景
        var _btnHongBao_bg = homeui.node.getChildByName("btnHongBao_bg");

        //红包
        var _btnHongBao = homeui.node.getChildByName("btnHongBao");


        showHomeActivityIcon(homeui); 

        //公告
        var _gonggao = homeui.node.getChildByName("Image_gonggao");
        if (_gonggao) {
            if (MjClient.remoteCfg.guestLogin == true) {
                _gonggao.setVisible(false);
                _gonggao.setEnabled(false);
            }
            this._gonggao = _gonggao;
            _gonggao.getChildByName("Text_1").setString(""+MjClient.systemConfig.gongzhonghao);
            _gonggao.getChildByName("Text_1").ignoreContentAdaptWithSize(true);
            _gonggao.getChildByName("Text_2").setString(""+MjClient.systemConfig.majiangqun);
            _gonggao.getChildByName("Text_2").ignoreContentAdaptWithSize(true);
            var _btnCopy_1 = _gonggao.getChildByName("btnCopy_1");
            var _btnCopy_2 = _gonggao.getChildByName("btnCopy_2");
            var copy1Cb = function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.gongzhonghao);
                        MjClient.showToast("复制成功，打开微信查找添加");
                        MjClient.native.openWeixin();
                        MjClient.native.umengEvent4CountWithProperty("GongzhonghaoCopy", {uid:SelfUid()});
                        break;
                    default:
                        break;
                }
            };
            var copy2Cb = function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.majiangqun);
                        MjClient.showToast("复制成功，打开微信查找添加");
                        MjClient.native.openWeixin();
						MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Gonggao_Fuzhi_Youxiwentizixun", {uid:SelfUid()});
                        break;
                    default:
                        break;
                }
            };

            _btnCopy_1.addTouchEventListener(copy1Cb, this);
            _btnCopy_2.addTouchEventListener(copy2Cb, this);

            var _text_3 = _gonggao.getChildByName("Text_3")
            if (_text_3) {
                _text_3.setString(""+MjClient.systemConfig.dailiZixun);
                _text_3.ignoreContentAdaptWithSize(true);
                var copy3Cb = function (sender, Type) {
                    switch (Type) {
                        case ccui.Widget.TOUCH_ENDED:
                            MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.dailiZixun);
                            MjClient.showToast("复制成功，打开微信查找添加");
                            MjClient.native.openWeixin();
							MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Gonggao_Fuzhi_Dailizixun", {uid:SelfUid()});
                            break;
                        default:
                            break;
                    }
                };

                _gonggao.getChildByName("btnCopy_3").addTouchEventListener(copy3Cb, this);
            }
        }
        
        //实名认证
        var btnRenzheng = homeui.node.getChildByName("btnRenzheng");
        if (!btnRenzheng) {
            btnRenzheng =  new ccui.Button("game_picture/renzheng.png");
            btnRenzheng.setName("btnRenzheng");
            btnRenzheng.addTouchEventListener(function (sender, type) {
                if (type === ccui.Widget.TOUCH_ENDED) {
                    MjClient.Scene.addChild(new shiMingRenZhengLayer());
                }
            },this)
            homeui.node.addChild(btnRenzheng);
        }
        btnRenzheng.visible = !MjClient.data.pinfo.identityNum;
        setWgtLayout(btnRenzheng, [0.06, 0.13], [0.72, 0.93], [0, 0]);

        //亲友圈邀请审核
        var btnFriendcardInvite = homeui.node.getChildByName("btnFriendcardInvite");
        if (!btnFriendcardInvite) {
            btnFriendcardInvite =  new ccui.Button("game_picture/shenhe.png");
            btnFriendcardInvite.setName("btnFriendcardInvite");
            btnFriendcardInvite.addTouchEventListener(function (sender, type) {
                if (type === ccui.Widget.TOUCH_ENDED) {
                    MjClient.Scene.addChild(new Friendcard_Invite_Shenhe());
                }
            },this)
            homeui.node.addChild(btnFriendcardInvite);
            var hongDian = new ccui.ImageView("hall/hongdian-home.png");
            hongDian.setName("hongDian");
            hongDian.setPosition(cc.p(btnFriendcardInvite.width*0.1, btnFriendcardInvite.height*0.9));
            hongDian.setScale(0.6)
            btnFriendcardInvite.addChild(hongDian);
            var Text = new ccui.Text();
            Text.setName("Text");
            Text.setFontName("fonts/lanting.ttf");
            Text.setFontSize(30);
            Text.setTextColor(cc.color(255,255,255));
            Text.setPosition(hongDian.width/2, hongDian.height/2);
            Text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            Text.ignoreContentAdaptWithSize(true);
            hongDian.addChild(Text);
            hongDian.visible = false;
            UIEventBind(null, btnFriendcardInvite, "refresh_inviteShenhe_num", function(data) {
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
        btnFriendcardInvite.visible = isAgent();
        setWgtLayout(btnFriendcardInvite, [72/1280, 0], [0.0465, 0.73], [0,0]);


        setWgtLayout(this._youjian, [0.06, 0.13], [0.88, 0.93], [0,0]);
        setWgtLayout(_zhanji, [0.12, 0.12], [0.69, 0], [0,0.5]);
        setWgtLayout(_BtnHTP, [0.06, 0.13], [0.80, 0.93], [0, 0]);
        setWgtLayout(_setting, [0.06, 0.13], [0.96, 0.93], [0, 0]);

        setWgtLayout(_btnAdv, [0.12, 0.12], [0.806, 0], [0, 0.5]);
        setWgtLayout(this._tileIcon, [0.33, 0.20], [0.50, 0.97], [0.035, -0.55]);
        setWgtLayout(_btnRank, [0.1, 0.14], [1, 1.02], [-2.2, -2.2]);
        setWgtLayout(_gonggao, [0.258, 0.542], [0.145, 0.45], [0.0, 0.0]);

        //setWgtLayout(_Image_light, [0.5, 0.5], [0.9, 0.1], [0.14, -0.05]);
        setWgtLayout(_btnActive, [0.12, 0.12], [0.56, 0], [0, 0.5]);
        setWgtLayout(_BtnShop , [0.203, 0.203], [0.1, 0], [0, 0.5]);


        setWgtLayout(_btnjulebu, [0.12, 0.12], [0.3, 0], [0, 0.6]);
        setWgtLayout(_btnmoreGame, [0.12, 0.12], [-0.5, -0.5], [0, 0.6]);
        setWgtLayout(_btntuijian, [0.12, 0.12], [0.42, 0], [0, 0.5]);
        setWgtLayout(_btnShareGet, [0.12, 0.12], [0.92, 0], [0, 0.5]);
        // setWgtLayout(_headbg, [0.078, 0.14], [0.1, 0.99], [0, -0.025]);

        //runLightEffectAction(_Image_light);//右边活动的光

        var _scroll = this._tileIcon.getChildByName("scroll");
        var _msg = _scroll.getChildByName("msg");
        var scrollDataArr = [];
        scrollDataArr.push(MjClient.remoteCfg.guestLogin ? "欢迎来到" + AppCnName[MjClient.getAppType()] : MjClient.systemConfig.homeScroll);
        homePageRunText(_msg,scrollDataArr);
        function getMsg() {
            var content = ""+MjClient.systemConfig.homeScroll;
            return MjClient.remoteCfg.guestLogin ? "欢迎来到" + AppCnName[MjClient.getAppType()] : content;
        }
        _msg.setString(getMsg());
        UIEventBind(null, _scroll, "userReportPush", function(scrollData) {
            if(scrollData.length > 0){
                var scrollDataNew = [];
                for(var i = 0; i < scrollData.length; i++){
                    scrollDataNew.push("经公司核实，"+unescape(scrollData[i].nickname)+"存在"+unescape(scrollData[i].type)+"等不良行为，已对该用户进行封号处理。")
                }
                homePageRunText(_msg,scrollDataNew);

            }
            _scroll.schedule(function () {
                homePageRunText(_msg,scrollDataArr);
            },600);
        });


        //排行榜
        if (MjClient.remoteCfg.guestLogin == true || MjClient.systemConfig.bisaiEnable != "true") {
            _btnRank.visible = false;
            _btnRank.setTouchEnabled(false);
        }
        _btnRank.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new rankLayer());
                    break;
                default:
                    break;
            }
        }, this);

        //亲友圈不显示
        //if (MjClient.remoteCfg.guestLogin == true || MjClient.systemConfig.clubEnable != "true")
        {
            _btnjulebu.visible = false;
            _btnjulebu.setTouchEnabled(false);
        }
        _btnjulebu.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:

                    //要判断是否绑定了亲友圈，弹窗提示
                    if (!(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.clubId && parseInt(MjClient.data.pinfo.clubId) > 0)) {

                        /*
                         没有绑定
                      */
                        MjClient.Scene.addChild(new clubindingCodeLayer());

                    } else {

                        MjClient.Scene.addChild(new clubLayer());
                    }
                    break;
                default:
                    break;
            }
        }, this);


        if (MjClient.remoteCfg.guestLogin == true ||
            MjClient.systemConfig.moreGameEnable != "true" ||
            MjClient.isShenhe) {
            _btnmoreGame.visible = false;
            _btnmoreGame.setTouchEnabled(false);
            setWgtLayout(_btnAdv, [0.12, 0.12], [0.33, 0.050], [0, 0.0]);
            _btnAdv.removeAllChildren(true);
            _btnAdv.loadTextureNormal("game_picture/daili_xia.png")
            _btnAdv.loadTexturePressed("game_picture/daili_xia_s.png")
        }
        _btnmoreGame.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    //更多游戏
                    MjClient.native.OpenUrl(MjClient.systemConfig.moreGameUrl);
                    break;
                default:
                    break;
            }
        }, this);


        if (MjClient.remoteCfg.guestLogin == true) {
            _btnShareGet.visible = false;
            _btnShareGet.setTouchEnabled(false);
        }

        var btn_share = _btnShareGet.getChildByName("btn_1"); 
        btn_share.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    {
                        var _sprite = _btnShareGet.getChildByName("hongDian");
                        MjClient.Scene.addChild(new shareTodayLayer(_sprite.visible));
						MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Share", {uid:SelfUid()});
                    }
                    break;
                default:
                    break;
            }
        }, this);
        var bg_share = _btnShareGet.getChildByName("bg_img");
        bg_share.runAction(cc.sequence(cc.scaleTo(1,0.8),cc.scaleTo(1,1.1)).repeatForever());
        // var _shareTip = _btnShareGet.getChildByName("fenxiang_tip");
        // var _shareTipText = null;
        // if (_shareTip) {
        //     _shareTipText = _shareTip.getChildByName("Text_4");
        //     _shareTipText.ignoreContentAdaptWithSize(true);
        //     _shareTipText.setString("分享有元宝~");
        // }
        _btnShareGet.schedule(function () {
            var lastStr = MjClient.data.pinfo.lastShareDay;
            var currentStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
            var _sprite = _btnShareGet.getChildByName("hongDian");


            if (currentStr == lastStr) {
                _sprite.visible = false;
                bg_share.stopAllActions();
                bg_share.setScale(1);
            }else{
                _sprite.visible = true;
            }
            // if (_sprite && _shareTip)
            //     _shareTip.visible = _sprite.visible;

        }, 1);

        // if (_shareTip) {
        //     if (_btnActive)
        //         _btnShareGet.setZOrder(_btnActive.getZOrder() + 1);
        //     _shareTip.setOpacity(0);
        //     _shareTip.runAction(cc.repeatForever(cc.sequence(
        //         cc.fadeIn(1),
        //         cc.repeat(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2)), 5),
        //         cc.fadeOut(1),
        //         cc.delayTime(0.5))));
        // }

        if (MjClient.remoteCfg.guestLogin == true) {
            _btntuijian.visible = false;
            _btntuijian.setTouchEnabled(false);
        }

        _btntuijian.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite", {uid:SelfUid()});
                    var layer = new recommendLayer_active();
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }
        }, this);

        var selfHead = SelfHeadInfo();
        MjClient.loadWxHead(selfHead.uid, selfHead.url);

        ////房卡
        //var _fangKa = _headbg.getChildByName("fangKa");
        //_fangKa.visible = true;

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
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang", {uid:SelfUid()});
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

        var btn_addYB = _moneyBack.getChildByName("btn_add");
        btn_addYB.addTouchEventListener(function(sender,type){
            if(type === 2){
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Gold_Add", {uid:SelfUid()});
                MjClient.Scene.addChild(enter_store());
            }
        },this);
        
        changeAtalsForLabel(_money, MjClient.data.pinfo.money);
        UIEventBind(this.jsBind, _money, "updateInfo", function () {

            var icurrentMoney = parseInt(_money.getString());
            var lastMoney = parseInt(MjClient.data.pinfo.money);
            if (lastMoney > icurrentMoney) {
                if (MjClient.HaiAnShare_ui) { // 海安分享 特殊处理
                    //成功后，加粒子效果                   
                    _money.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                        var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                        starParticle.setPosition(_money.getContentSize().width / 2, _money.getContentSize().height / 2);
                        _money.addChild(starParticle);
                        changeAtalsForLabel(_money, MjClient.data.pinfo.money);
                    }),cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
                    
                }else{
                    //成功后，加粒子效果
                    var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                    starParticle.setPosition(_money.getContentSize().width / 2, _money.getContentSize().height / 2);
                    _money.addChild(starParticle);
                    _money.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
                    changeAtalsForLabel(_money, MjClient.data.pinfo.money);
                }
                
            }else{
                changeAtalsForLabel(_money, MjClient.data.pinfo.money);
            }
            
        });
        UIEventBind(this.jsBind, _money, "loginOK", function () {
            changeAtalsForLabel(_money, MjClient.data.pinfo.money);
        });


         //礼券
        var _liquanBack = _head.getChildByName("liquanback");
        // _liquanBack.visible = MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JI_FEN_SHANG_CHENG)
        var _liquan = _liquanBack.getChildByName("liquan");
        _liquan.ignoreContentAdaptWithSize(true);
        var btn_addLJ = _liquanBack.getChildByName("btn_add");
        btn_addLJ.addTouchEventListener(function(sender,type){
            if(type === 2){
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Liquan_Add", {uid:SelfUid()});
                MjClient.Scene.addChild(new ShopOfJifen_layer());
            }
        },this);

        changeAtalsForLabel(_liquan, MjClient.data.pinfo.integral);
        UIEventBind(this.jsBind, _liquan, "updateInfo", function () {
            var icurrentIntegral = parseInt(_liquan.getString());
            var lastIntegral = parseInt(MjClient.data.pinfo.integral);
            if (lastIntegral > icurrentIntegral) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(_liquan.getContentSize().width / 2, _liquan.getContentSize().height / 2);
                _liquan.addChild(starParticle);
                _liquan.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            changeAtalsForLabel(_liquan, MjClient.data.pinfo.integral);
        });

        
        /*
         商店
         */
        //var _BtnShop = _headbg.getChildByName("Button_store");
        if (MjClient.remoteCfg.hideMoney == true||MjClient.isShenhe == true) {
            _BtnShop.visible = false;
            _BtnShop.setTouchEnabled(false);
        }
        _BtnShop.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = enter_store();
                    MjClient.Scene.addChild(layer);
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);
        // var _biaoqian = _BtnShop.getChildByName("Image_biaoqian");
        // _biaoqian.runAction(cc.sequence(cc.rotateTo(3, 30).easing(cc.easeSineInOut()), cc.rotateTo(2, 0).easing(cc.easeSineInOut())).repeatForever());
        // var _store_guang = _BtnShop.getChildByName("Image_guang");
        // _store_guang.runAction(cc.sequence(cc.spawn(cc.scaleTo(2, 1.2), cc.fadeOut(2)),
        //     cc.callFunc(function () { _store_guang.setScale(1); _store_guang.setOpacity(255); })).repeatForever());


        //游戏列表
        this._gameListPanelNode = homeui.node.getChildByName("Panel_GameList");
        //游戏
        this._gamePanelNode = homeui.node.getChildByName("Panel_game");
        this._gamePanelNode.visible = false;

        this.setGamePanel(this._gamePanelNode);
        this.setGameListPanel(this._gameListPanelNode);

        COMMON_UI.addHintText(homeui.node);
        COMMON_UI.addExitGame(homeui.node);
        return true;
    },
    onEnter: function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function (keyCode, event) {
                if (keyCode == cc.KEY.back) {
                    if (this._keyBackClickedTime && (new Date()).getTime() - this._keyBackClickedTime <= 1*1000)
                    {
                        delete this._keyBackClickedTime;
                        showExitGameLayer();
                    }
                    else
                    {
                        if (MjClient.exitLayer && cc.sys.isObjectValid(MjClient.exitLayer))
                        {
                            MjClient.exitLayer.removeFromParent();
                            MjClient.exitLayer = null;
                        }
                        else
                        {
                            this._keyBackClickedTime = (new Date()).getTime();
                        }
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
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fenxiang_Jiaru_sure", {uid: SelfUid()});
                        MjClient.joinGame(parseInt(tableID));
                    }, function () { });
                    MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fenxiang_Jiaru", {uid: SelfUid()});
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
    setGameListPanel: function (gameListPanelNode) {
        if (this._gonggao) {
            gameListPanelNode.setItemsMargin(60);
            setWgtLayout(gameListPanelNode, [0.6, 0.6], [0.58, 0.5], [0, -0.1]);
        }
        else {
            setWgtLayout(gameListPanelNode, [0.6, 0.6], [0.5, 0.5], [0, -0.1]);
        }

        var gameClassList = JSON.parse(MjClient.systemConfig.gameClass);//[MjClient.GAME_CLASS.NIU_NIU];//
        cc.log("================gameClassList = " + JSON.stringify(gameClassList));
        for (var i = 0; i < gameClassList.length; i++) {
            var gameClass = gameClassList[i];
            var btn = new ccui.Button(GameClassEnterBtn[gameClass]);
            btn.setTag(gameClass);
            btn.setScale(0.85);
            btn.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        var gameclass = sender.getTag();
                        this.setGameType(gameclass);
                        break;
                    default:
                        break;
                }
            }, this);
            gameListPanelNode.pushBackCustomItem(btn);
        }
        if (gameClassList.length == 1 || MjClient.isAroundBeijing() || MjClient.isShenhe) {
            this.setGameType(gameClassList[0]);
            // this._BtnRuturn.visible = false;
        }
    },
    setGamePanel: function (gamePanelNode) {
        var that = this;

        var gamePanelLeftNode = gamePanelNode.getChildByName("Panel_left");
        var advBgNode  = gamePanelNode.getChildByName("adv_bg");
        // var gamePanelRightNode = gamePanelNode.getChildByName("Panel_right");

        setWgtLayout(gamePanelNode, [0.97, 0.97], [0.5, 0.45], [0, 0]);
        gamePanelLeftNode.setPositionX(gamePanelLeftNode.getPositionX() - 20);
        advBgNode.setPositionX(advBgNode.getPositionX() - 20);
        if(isIPhoneX())
        {
            gamePanelLeftNode.setPositionX(gamePanelLeftNode.getPositionX() - 80);
            // gamePanelRightNode.setPositionX(gamePanelRightNode.getPositionX() + 100);
        }


        /*
         排行榜
         */
        this._rank_bg = gamePanelNode.getChildByName("rank_bg");

        if (MjClient.systemConfig.rankEnable != "true") {
            this._rank_bg.setVisible(false);
            this._rank_bg.setEnabled(false);
        }
        else
        {
            this.gameRankLayer();
        }

        // 创建房间
        this._goldFieldBtn = gamePanelLeftNode.getChildByName("goldBtn");
        var goldFieldMask = this._goldFieldBtn.getChildByName("Panel_mask");

        // 粒子
        var goldFieldPar =  new cc.ParticleSystem("Particle/joinRoomPar.plist");
        goldFieldPar.setPosition(this._goldFieldBtn.getContentSize().width/2, this._goldFieldBtn.getContentSize().height*0.2);
        goldFieldPar.setScale(0.8);
        goldFieldMask.addChild(goldFieldPar,0);

        // 动画
        var iconTrophy = goldFieldMask.getChildByName("icon_Trophy");
        var star1 = cc.Sprite.create("game_picture/gameBtn/yaoguang.png");
        star1.setScale(0);
        star1.setPosition(85,118);
        star1.runAction(cc.sequence(
            cc.spawn(cc.scaleTo(0.3,1), cc.rotateBy(0.3,90)),
            cc.spawn(cc.scaleTo(0.3,0), cc.rotateBy(0.3,90))
        ).repeatForever());
        iconTrophy.addChild(star1, 1);

        //扫光
        var clipper_bei = cc.ClippingNode.create();
        var sten = cc.Sprite.create("game_picture/gameBtn/icon_bei.png");
        var stenSize = sten.getContentSize();
        clipper_bei.setContentSize(stenSize);
        clipper_bei.setStencil(sten);
        clipper_bei.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        var sprite = new cc.Sprite("game_picture/gameBtn/icon_light.png");
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(2, cc.p(sten.width ,sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction);//进行向右移动的重复动作
        clipper_bei.addChild(sprite, 1);
        iconTrophy.addChild(clipper_bei);

        var hongbaoEffect = this._goldFieldBtn.getChildByName("Node_hongbaoEffect");
        for(var i = 0; i < 5; i++){
            var hongbao = hongbaoEffect.getChildByName("hongbao_"+i);
            hongbao.runAction(cc.sequence(
                cc.delayTime(0.2*i),
                cc.moveBy(1.0, cc.p(0, 6)).easing(cc.easeSineInOut()),
                cc.moveBy(1.0, cc.p(0, -6)).easing(cc.easeSineInOut())
            ).repeatForever());
            var light = hongbaoEffect.getChildByName("light_"+i);
            light.setScale(0);
            light.runAction(cc.sequence(
                cc.delayTime(0.2*i),
                cc.scaleTo(0.2, 1),
                cc.delayTime(0.2),
                cc.scaleTo(0.2, 0),
                cc.delayTime(0.8 - 0.2*i)
            ).repeatForever());
        }

        if(MjClient.systemConfig.fieldRedpacketActivityOpen){
            goldFieldMask.setVisible(false);
            hongbaoEffect.setVisible(true);
        }else {
            goldFieldMask.setVisible(true);
            hongbaoEffect.setVisible(false);
        }
       
        // 设置点击放大效果
        this.setToucheffect(this._goldFieldBtn, goldFieldMask);
        goldField_updateListener(this._goldFieldBtn);

        var jiaoBiao = new cc.Sprite("game_picture/mainMenu/jiaobiao2.png");
        jiaoBiao.setPosition(jiaoBiao.width*0.52, this._goldFieldBtn.height - jiaoBiao.height*0.4);
        this._goldFieldBtn.addChild(jiaoBiao);

        this._goldFieldBtn.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinbichang", {uid:SelfUid()});
                    goldField_start();
                    break;
                default:
                    break;
            }
        }, this);

        // 加入房间
        this._joinRoom = gamePanelLeftNode.getChildByName("joinRoom");
        var joinRoomMask = this._joinRoom.getChildByName("Panel_mask");
        // 粒子
        var joinRoomPar =  new cc.ParticleSystem("Particle/joinRoomPar.plist");
        joinRoomPar.setPosition(this._joinRoom.getContentSize().width/2, this._joinRoom.getContentSize().height*0.2);
        joinRoomPar.setScale(0.8);
        joinRoomMask.addChild(joinRoomPar,0);
        this.setToucheffect(this._joinRoom, joinRoomMask);
        this._joinRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (!MjClient.data.sData) {
                        postEvent("createRoom", {});
                        MjClient.native.umengEvent4CountWithProperty("ChuangjianfangjianClick", {uid:SelfUid()});
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
        // 创建房间
        this._createRoom = gamePanelLeftNode.getChildByName("createRoom");
        var createRoomMask = this._createRoom.getChildByName("Panel_mask");
        // 粒子
        var createRoomPar =  new cc.ParticleSystem("Particle/joinRoomPar.plist");
        createRoomPar.setPosition(this._createRoom.getContentSize().width/2, this._createRoom.getContentSize().height*0.2);
        createRoomPar.setScale(0.8);
        createRoomMask.addChild(createRoomPar,0);

        // this._createRoom.setPressedActionEnabled(true);
        
        // 设置点击放大效果
        this.setToucheffect(this._createRoom, createRoomMask);

        this._createRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new EnterRoomLayer());
                    MjClient.native.umengEvent4CountWithProperty("JiarufangjianClick", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);

        // 俱乐部
        var clubEnter = gamePanelLeftNode.getChildByName("clubEnter");
        var clubEnterMask = clubEnter.getChildByName("Panel_mask");

        // 动画
        var iconMJ = clubEnterMask.getChildByName("icon_mj");
        var mjUp1 = cc.moveBy(1.5, cc.p(0,10)).easing(cc.easeQuadraticActionInOut());
        var mjUp2 = cc.moveBy(1.5, cc.p(0,-10)).easing(cc.easeQuadraticActionInOut());
        iconMJ.runAction(cc.sequence(mjUp1, mjUp2).repeatForever());

        var iconShui = clubEnterMask.getChildByName("icon_shui");
        var shuiUp1 = cc.fadeOut(0);
        var shuiUp2 = cc.scaleTo(0.2, 0.8).easing(cc.easeQuadraticActionInOut());
        var shuiUp3 = cc.fadeIn(0);
        var shuiUp4 = cc.scaleTo(2.8, 1.5).easing(cc.easeQuadraticActionInOut());
        var shuiUp5 = cc.fadeOut(2.8).easing(cc.easeQuadraticActionInOut());
        iconShui.runAction(cc.sequence(shuiUp1, shuiUp2, shuiUp3, cc.spawn(shuiUp4, shuiUp5)).repeatForever());

        // 粒子
        var starParticleqp =  new cc.ParticleSystem("Particle/ceate.plist");
        starParticleqp.setPosition(clubEnter.getContentSize().width/2, clubEnter.getContentSize().height*0.7);
        starParticleqp.setScale(1);
        clubEnterMask.addChild(starParticleqp,0);
        this.setToucheffect(clubEnter, clubEnterMask);
        if (MjClient.systemConfig.clubEnable == "true" && MjClient.isShenhe == false)
        {
            clubEnter.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.Scene.addChild(new FriendCard_main(null, 1));
                        MjClient.native.umengEvent4CountWithProperty("JulebuClick", {uid:SelfUid()});
                        break;
                    default:
                        break;
                }
            }, this);
        }
        else
        {
            clubEnter.visible = false;
            if(MjClient.isShenhe){
                this._joinRoom.x += this._joinRoom.width/2.3;
                this._createRoom.x += this._createRoom.width/1.5;
            }else {
                this._joinRoom.x += this._joinRoom.width/3;
                this._createRoom.x += this._createRoom.width/2;
            }
        }

        /*
        // 广告 传奇 入口
        var chuanqiBtn = gamePanelRightNode.getChildByName("chuanqiBtn");
        if (chuanqiBtn) {
            

            var zhezhao = chuanqiBtn.getChildByName("zhezhao");

            var anim = cc.Sprite("game_picture/advBtn/anim/0.png");
            var ac = createAnimation("game_picture/advBtn/anim/", 20, cc.rect(0, 0, 329, 109), 0.15);
            anim.runAction(cc.sequence(ac).repeatForever());
            anim.setPosition(62, 40);
            anim.setScale(0.9);
            zhezhao.addChild(anim);

            var lightLayer = zhezhao.getChildByName("lightLayer");

            var light = new cc.ParticleSystem("game_picture/advBtn/light.plist");
            light.setPosition(0, 330);
            light.setScale(0.5);
            lightLayer.addChild(light);

            //var rw = zhezhao.getChildByName("rw");
            //rw.runAction(cc.sequence(cc.scaleTo(0.5, 0.97), cc.scaleTo(0.5, 1.0)).repeatForever());

            var fireLayer = zhezhao.getChildByName("fireLayer");
            var fire = cc.Sprite("game_picture/advBtn/fire/fire_0.png");
            var ac = createAnimation("game_picture/advBtn/fire/fire_", 12, cc.rect(0, 0, 150, 80), 0.03);
            fire.runAction(cc.sequence(ac).repeatForever());
            fire.setPosition(0, fire.height / 2 - 10);
            fireLayer.addChild(fire);

            // var start = zhezhao.getChildByName("start");
            // start.runAction(cc.sequence(cc.scaleTo(0.2, 1.05), cc.scaleTo(0.2, 0.95)).repeatForever());

            var clippingNode = new cc.ClippingNode();
            var mask = new cc.Sprite("game_picture/advBtn/mask.png");
            clippingNode.setAlphaThreshold(0);
            clippingNode.setStencil(mask);

            zhezhao.removeFromParent(false);
            clippingNode.setPosition(chuanqiBtn.width / 2, chuanqiBtn.height / 2 + 8);
            zhezhao.setPosition(0, 0)
            clippingNode.addChild(zhezhao);
            chuanqiBtn.addChild(clippingNode);

            chuanqiBtn.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function() {
                clippingNode.setScale(chuanqiBtn.getRendererNormal().getScale());
            })).repeatForever());

            chuanqiBtn.addTouchEventListener(function(sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED)
                {
                    MjClient.native.umengEvent4CountWithProperty("zhujiemian_chuanqi_dianji", {uid:SelfUid()});
                    MjClient.Scene.addChild(new ChuanQiWebviewLayer());
                }
            });
        }

        // 广告 八字算命 入口
        var baZisuanMianBtn = gamePanelRightNode.getChildByName("bazisuanmianBtn");
        if (baZisuanMianBtn) {
            

            var zhezhao = baZisuanMianBtn.getChildByName("zhezhao");
            var lightLayer = zhezhao.getChildByName("lightLayer");

            var light = new cc.ParticleSystem("game_picture/advBtn/light.plist");
            light.setPosition(0, 250);
            light.setScale(0.5);
            lightLayer.addChild(light);

            var cai = zhezhao.getChildByName("cai");
            cai.runAction(cc.sequence(cc.scaleTo(0.5, 0.95), cc.scaleTo(0.5, 1.1)).repeatForever());

            var particle = new cc.ParticleSystem("game_picture/advBtn/particle.plist");
            particle.setPosition(zhezhao.width/2, 20);
            particle.setScale(0.3);
            zhezhao.addChild(particle);

            var clippingNode2 = new cc.ClippingNode();
            var mask = new cc.Sprite("game_picture/advBtn/mask.png");
            clippingNode2.setAlphaThreshold(0);
            clippingNode2.setStencil(mask);

            zhezhao.removeFromParent(false);
            clippingNode2.setPosition(baZisuanMianBtn.width / 2, baZisuanMianBtn.height / 2 + 8);
            zhezhao.setPosition(0, 0)
            clippingNode2.addChild(zhezhao);
            baZisuanMianBtn.addChild(clippingNode2);

            baZisuanMianBtn.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function() {
                clippingNode2.setScale(baZisuanMianBtn.getRendererNormal().getScale());
            })).repeatForever());

            baZisuanMianBtn.addTouchEventListener(function(sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED)
                {
                    MjClient.native.umengEvent4CountWithProperty("zhujiemian_bazisuanmian_dianji", {uid:SelfUid()});
                    MjClient.Scene.addChild(new BaZiSuanMianWebviewLayer());
                }
            });
        }

        // 热血合击
        var rexueHejiBtn = gamePanelRightNode.getChildByName("rexueHejiBtn");
        if (rexueHejiBtn) {
            var rexueHejiBtnMask = rexueHejiBtn.getChildByName("Panel_mask");
            // 设置点击放大效果
            this.setToucheffect(rexueHejiBtn, rexueHejiBtnMask);
            rexueHejiBtn.addTouchEventListener(function(sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED)
                {
                    MjClient.native.umengEvent4CountWithProperty("zhujiemian_rexueheji_dianji", {uid:SelfUid()});
                    MjClient.Scene.addChild(new RexueHejiWebviewLayer());
                }
            });

            cc.spriteFrameCache.addSpriteFrames("game_picture/advBtn/rexue.plist","game_picture/advBtn/rexue.png");
            var rexueAniBG = rexueHejiBtnMask.getChildByName("rexue");
            var frames = [];
            var prefix = "cq_0000";
            var fc = cc.spriteFrameCache;
            for (var i = 0; i < 9; i++) {
                var name = prefix + i + ".png";
                var f = fc.getSpriteFrame(name);
                if(f)
                {
                    frames.push(f);
                }
            }
            var firstFrame = new cc.Sprite("#cq_00000.png");
            var animate = cc.sequence(cc.animate(new cc.Animation(frames, 0.08, 1)));
            firstFrame.runAction(animate.repeatForever());
            firstFrame.setPosition(rexueAniBG.getContentSize().width/2,rexueAniBG.getContentSize().height/2);
            rexueAniBG.addChild(firstFrame);

        }

        // 捕鱼
        var buyuBtn = gamePanelRightNode.getChildByName("buyuBtn");
        if (buyuBtn) {

            var isBuYu = true;
            var buyuBtnMask = buyuBtn.getChildByName("Panel_mask");
            // 设置点击放大效果
            this.setToucheffect(buyuBtn, buyuBtnMask);

            buyuBtn.addTouchEventListener(function(sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED)
                {
                    if (isBuYu) {
                        MjClient.native.umengEvent4CountWithProperty("zhujiemian_buyu_dianji", {uid:SelfUid()});
                        MjClient.Scene.addChild(new BuyuWebviewLayer());
                    }
                    else {
                        MjClient.showToast("即将开放,敬请期待");
                    }
                    
                }
            });

            var jjkf = buyuBtnMask.getChildByName("jjkf");
            jjkf.setVisible(false);
            if (isBuYu) {
                // 金币
                var iconJinbi1 = buyuBtnMask.getChildByName("icon_jinbi1");
                var jinbiUp1 = cc.moveBy(1.2, cc.p(0,10)).easing(cc.easeQuadraticActionInOut());
                var jinbiUp2 = cc.moveBy(1.2, cc.p(0,-10)).easing(cc.easeQuadraticActionInOut());
                iconJinbi1.runAction(cc.sequence(jinbiUp1, jinbiUp2).repeatForever());

                var iconJinbi2 = buyuBtnMask.getChildByName("icon_jinbi2");
                var jinbiUp3 = cc.moveBy(1.2, cc.p(0,-5)).easing(cc.easeQuadraticActionInOut());
                var jinbiUp4 = cc.moveBy(1.2, cc.p(0,5)).easing(cc.easeQuadraticActionInOut());
                iconJinbi2.runAction(cc.sequence(jinbiUp3, jinbiUp4).repeatForever());

                //扫光
                var _tile = buyuBtnMask.getChildByName("icon2");
                var clipper = cc.ClippingNode.create();
                var sten = cc.Sprite.create("game_picture/advBtn/buyu_zi.png");
                var stenSize = sten.getContentSize();
                clipper.setContentSize(stenSize);
                clipper.setStencil(sten);
                clipper.setAlphaThreshold(0.5);
                sten.setPosition(stenSize.width / 2, stenSize.height / 2);
                var sprite = new cc.Sprite("game_picture/advBtn/btn_800yuan_gx.png");
                var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
                    cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
                    cc.MoveTo.create(1.3, cc.p(sten.width ,sten.height / 2)),
                    cc.delayTime(0.8)));
                sprite.runAction(repeatAction);//进行向右移动的重复动作
                clipper.addChild(sprite, 1);
                _tile.addChild(clipper);
            }
            else {
                jjkf.setVisible(true);
            }
        }

        // 王者战神
        var wangzheZhanshenBtn = gamePanelRightNode.getChildByName("wangzheZhanshenBtn");
        if (wangzheZhanshenBtn) {
            wangzheZhanshenBtn.addTouchEventListener(function(sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED)
                {
                    MjClient.native.umengEvent4CountWithProperty("zhujiemian_wangzhezhanshen_dianji", {uid:SelfUid()});
                    MjClient.Scene.addChild(new WangzheZhanshenWebviewLayer());
                }
            });
        }
        */
       
        //添加第三方应用
        COMMON_UI.addHomeAdvMode(advBgNode);
        
    },
    setToucheffect: function (btn, container) {
        btn.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function() {
            container.setScale(btn.getRendererNormal().getScale());
        })).repeatForever());
    },
    setGameType: function (type) {
        if (this._gonggao && MjClient.systemConfig.rankEnable == "true")
            this._gonggao.visible = false;

        this._gameListPanelNode.visible = false;
        this._gamePanelNode.visible = true;
        //this._jueSeNode.visible = true;
        MjClient.gameClass = type;
        cc.log("=================type =  " + type);

        // 闪光效果
        // var clipper = cc.ClippingNode.create();
        // var sten = cc.Sprite.create("joinGame/createRoom.png");
        // var stenSize = sten.getContentSize();
        // clipper.setContentSize(stenSize);
        // clipper.setStencil(sten);
        // clipper.setAlphaThreshold(0.5);
        // sten.setPosition(stenSize.width / 2, stenSize.height / 2);

        // this._joinRoom.addChild(clipper);

        // var sprite = new cc.Sprite("joinGame/guangxiao.png");
        // clipper.addChild(sprite, 1);

        // var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
        //     cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
        //     cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
        //     cc.delayTime(3.0)));
        // sprite.runAction(repeatAction);//进行向右移动的重复动作

        var gameClassList = JSON.parse(MjClient.systemConfig.gameClass);
        if (gameClassList.length > 1) {
            this._tileIcon.loadTexture(GameClassTitleIcon[MjClient.gameClass]);
        }
        else {
            this._tileIcon.loadTexture("game_picture/logo_home.png");
        }
        if (MjClient.systemConfig.rankEnable == "true")
            this.gameRankLayer();
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
    showJinbiView:function () {
        goldField_start();
    },
    /**************
        bagan 排行榜
     *************/
    gameRankLayer: function () {
        var parentNode = this._rank_bg;
        this._ListViewQueShen = parentNode.getChildByName("ListView_queshen");
        this._ListViewQueShen.removeAllChildren();
        this._ListViewTuHao = parentNode.getChildByName("ListView_tuhao");
        this._ListViewTuHao.removeAllChildren();

        this._cell_queshen = parentNode.getChildByName("cell_queshen");
        this._cell_queshen.visible = false;
        this._textDesc = parentNode.getChildByName("Text_30");
        this._textDesc.ignoreContentAdaptWithSize(true);

        var that = this;
        var _btnTip = parentNode.getChildByName("shang_xuanxiang_2").getChildByName("Image_7");
        this.myNode = parentNode.getChildByName("selfCell");

        that._btnQueShen = parentNode.getChildByName("queshen");
        that._btnQueShen.setTouchEnabled(true);

        //
        // this._btnTipIcon  =  parentNode.getChildByName("queshen");
        cc.log("MjClient.gameClass = " + MjClient.gameClass);
        switch (MjClient.gameClass) {
            case MjClient.GAME_CLASS.MA_JIANG:
            case MjClient.GAME_CLASS.CHANG_PAI:
                that._btnQueShen.loadTexture("gameRank/queshenbang.png");
                break;
            case MjClient.GAME_CLASS.NIU_NIU:
                break;
            case MjClient.GAME_CLASS.GUAN_DAN:
                that._btnQueShen.loadTexture("gameRank/guanDanWang.png");
                break;
            case MjClient.GAME_CLASS.PAO_HU_ZI:
                break;
            case MjClient.GAME_CLASS.PAO_DE_KUAI:
                that._btnQueShen.loadTexture("gameRank/kuaipaoWang.png");
                break;
        }

        function queShenEventCallBack(sender, type) {
            if (type == 2) {
                var childrenCount = that._ListViewQueShen.getItems().length;
                if (childrenCount == 0) {
                    switch (MjClient.gameClass) {
                        case MjClient.GAME_CLASS.MA_JIANG:
                        case MjClient.GAME_CLASS.CHANG_PAI:
                            that.reqQueShenSeverData();
                            break;
                        case MjClient.GAME_CLASS.NIU_NIU:
                            break;
                        case MjClient.GAME_CLASS.GUAN_DAN:
                            that.reqGuanDanSeverData();
                            break;
                        case MjClient.GAME_CLASS.PAO_HU_ZI:
                            break;
                        case MjClient.GAME_CLASS.PAO_DE_KUAI:
                            that.reqPaoDeKuaiSeverData();
                            break;
                    }
                }
                _btnTip.setPosition(277.32, 27.21);
                that._ListViewQueShen.visible = true;
                that._ListViewTuHao.visible = false;
                that._textDesc.setString("昨日胜局数前十名排行榜,每日24点更新");
                if (that._myQueShenData) {
                    that.initSelfInfo(that._myQueShenData);
                }
            }
        }

        that._btnQueShen.addTouchEventListener(queShenEventCallBack, this);

        that._btnTuHao = parentNode.getChildByName("tuhao");
        that._btnTuHao.setTouchEnabled(true);

        function fuHaoEventCallBack(sender, type) {
            if (type == 2) {
                var childrenCount = that._ListViewTuHao.getItems().length;
                if (childrenCount == 0) {
                    that.reqFuHaoSeverData();
                    that._textDesc.setString("昨日充值前十名排行榜,每日24点更新");
                }
                _btnTip.setPosition(100.94, 27.21);
                that._ListViewQueShen.visible = false;
                that._ListViewTuHao.visible = true;
                if (that._myFuHaoData) {
                    that.initSelfInfo(that._myFuHaoData);
                }
            }
        }
        that._btnTuHao.addTouchEventListener(fuHaoEventCallBack, this);

        // this._queshenList = _back.getChildByName("ListView");
        // this._zijiNode = _back.getChildByName("Image_ziji");

        //初始化排行榜
        queShenEventCallBack(that._btnQueShen, 2);
        that._btnQueShen.setTouchEnabled(false);
        that._btnTuHao.setTouchEnabled(false);
        that._btnTuHao.setUserData(0);
        that._btnTuHao.visible = false;

        _btnTip.setAnchorPoint(0.5, 0.5);
        _btnTip.setPosition(189, 27.21);
        //_btnTip.loadTexture("rank/kuangchang.png");
        //_btnTip.ignoreContentAdaptWithSize(true);
        _btnTip.setContentSize(365.00, 44.00);
        that._btnQueShen.x = 214;
    },

    //雀神榜
    reqQueShenSeverData: function () {
        var that = this;
        that._btnQueShen.setTouchEnabled(false);
        MjClient.gamenet.request("pkplayer.handler.rankListMJ", { index: 1, pageNum: 10 },
            function (rtn) {
                if (that._btnQueShen.getUserData()) {
                    that._btnQueShen.setTouchEnabled(true);
                }

                if (rtn.code == 0) {
                    that.rspQueShen(rtn.data);
                }
            }
        );
    },
    rspQueShen: function (data) {
        //保存自己的数据
        this._myQueShenData = { myRank: data.mine_today_rank, winCount: data.mine_win_count + "局", QueShenCount: (data.mine_number > 0 ? "雀神次数×" + data.mine_number : "") };
        var that = this;

        function _createQueShenOneCell(oneData) {
            var copyNode = that._cell_queshen.clone();
            copyNode.visible = true;
            copyNode.setTouchEnabled(true);
            copyNode.addTouchEventListener(function (sender, Type) {
                if (Type == 2) {
                    MjClient.showPlayerInfo(oneData, false, false);
                }
            });
            var headicon = copyNode.getChildByName("nobody");
            var url = oneData.headimgurl;
            if (!url) url = "png/default_headpic.png";
            cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
                if (!err && texture&&cc.sys.isObjectValid(headicon)) {
                    var headSprite = new cc.Sprite(texture);
                    headSprite.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                    headSprite.setScale((headicon.getContentSize().width - 8) / headSprite.getContentSize().width);
                    headicon.addChild(headSprite);
                }
            });

            var _rankText = copyNode.getChildByName("Text_rank");
            _rankText.visible = false;
            _rankText.ignoreContentAdaptWithSize(true);

            var _rankImage = copyNode.getChildByName("image_rank");
            _rankImage.visible = false;
            var _pathIcon = "gameRank/"
            var rank = oneData.rank;
            if (rank == 1) {
                _rankImage.visible = true;
                _rankImage.loadTexture(_pathIcon + "one.png");
                copyNode.loadTexture("gameRank/DK_diyiming.png");

                var txk = new cc.Sprite("gameRank/txk_0.png");
                txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
                headicon.addChild(txk, 10);
            }
            else if (rank == 2) {
                _rankImage.visible = true;
                _rankImage.loadTexture(_pathIcon + "two.png");

                var txk = new cc.Sprite("gameRank/txk_1.png");
                txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
                headicon.addChild(txk, 10);
            }
            else if (rank == 3) {
                _rankImage.visible = true;
                _rankImage.loadTexture(_pathIcon + "three.png");

                var txk = new cc.Sprite("gameRank/txk_2.png");
                txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
                headicon.addChild(txk, 10);
            }
            else {
                _rankText.visible = true;
                _rankText.setString("" + rank);
            }


            var _Text_name = copyNode.getChildByName("Text_name");
            var _nameStr = unescape(oneData.nickname);
            _Text_name.setString(getNewName(_nameStr, 8));

            var _winCount = copyNode.getChildByName("Text_winCount");
            _winCount.ignoreContentAdaptWithSize(true);
            _winCount.setString("");
            _winCount.setString(oneData.winCount + "局");

            //雀神次数
            var _queCount = copyNode.getChildByName("Text_queshen");
            _queCount.ignoreContentAdaptWithSize(true);
            _queCount.setString("");
            if (oneData.number && oneData.number > 1) {
                _queCount.setString("雀神称号×" + oneData.number);
            }

            return copyNode;
        }

        var _rankList = data.list;
        for (var i = 0; i < _rankList.length ; i++) {
            that._ListViewQueShen.pushBackCustomItem(_createQueShenOneCell(_rankList[i]));
        }

        that.initSelfInfo(that._myQueShenData);
    },

    //富豪榜
    reqFuHaoSeverData: function () {
        var that = this;
        that._btnTuHao.setTouchEnabled(false);
        MjClient.gamenet.request("pkplayer.handler.rankListRecharge", { index: 1, pageNum: 10 },
            function (rtn) {
                that._btnTuHao.setTouchEnabled(true);
                if (rtn.code == 0) {

                    that.rspFuHao(rtn.data);
                }
            }
        );
    },
    rspFuHao: function (data) {
        this._myFuHaoData = { myRank: data.mine_today_rank, winCount: data.mine_recharge + "元", QueShenCount: (data.mine_number > 0 ? "富豪次数×" + data.mine_number : "") };
        var that = this;
        function _createFuHaoOneCell(oneData) {
            var copyNode = that._cell_queshen.clone();
            copyNode.visible = true;
            copyNode.setTouchEnabled(true);
            copyNode.addTouchEventListener(function (sender, Type) {
                if (Type == 2) {
                    MjClient.showPlayerInfo(oneData, false, false);
                }
            });
            var headicon = copyNode.getChildByName("nobody");
            var url = oneData.headimgurl;
            if (!url) url = "png/default_headpic.png";
            cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
                if (!err && texture&&cc.sys.isObjectValid(headicon)) {
                    var headSprite = new cc.Sprite(texture);
                    headSprite.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                    headSprite.setScale((headicon.getContentSize().width - 8) / headSprite.getContentSize().width);
                    headicon.addChild(headSprite);
                }
            });

            var _rankText = copyNode.getChildByName("Text_rank");
            _rankText.visible = false;
            _rankText.ignoreContentAdaptWithSize(true);

            var _rankImage = copyNode.getChildByName("image_rank");
            _rankImage.visible = false;
            var _pathIcon = "gameRank/"
            var rank = oneData.rank;
            if (rank == 1) {
                _rankImage.visible = true;
                _rankImage.loadTexture(_pathIcon + "one.png");
                copyNode.loadTexture("gameRank/DK_diyiming.png");

                var txk = new cc.Sprite("gameRank/txk_0.png");
                txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
                headicon.addChild(txk, 10);
            }
            else if (rank == 2) {
                _rankImage.visible = true;
                _rankImage.loadTexture(_pathIcon + "two.png");

                var txk = new cc.Sprite("gameRank/txk_1.png");
                txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
                headicon.addChild(txk, 10);
            }
            else if (rank == 3) {
                _rankImage.visible = true;
                _rankImage.loadTexture(_pathIcon + "three.png");

                var txk = new cc.Sprite("gameRank/txk_2.png");
                txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
                headicon.addChild(txk, 10);
            }
            else {
                _rankText.visible = true;
                _rankText.setString("" + rank);
            }


            var _Text_name = copyNode.getChildByName("Text_name");
            var _nameStr = unescape(oneData.nickname);
            _Text_name.setString(getNewName(_nameStr, 8));

            var _winCount = copyNode.getChildByName("Text_winCount");
            _winCount.ignoreContentAdaptWithSize(true);
            _winCount.setString("0");
            _winCount.setString(oneData.recharge + "元");

            //雀神次数
            var _queCount = copyNode.getChildByName("Text_queshen");
            _queCount.ignoreContentAdaptWithSize(true);
            _queCount.setString("");
            if (oneData.number && oneData.number > 1) {
                _queCount.setString("富豪称号×" + oneData.number);
            }

            return copyNode;

        }

        var _rankList = data.list;
        for (var i = 0; i < _rankList.length ; i++) {
            this._ListViewTuHao.pushBackCustomItem(_createFuHaoOneCell(_rankList[i]));
        }

        this.initSelfInfo(this._myFuHaoData);
    },

    initSelfInfo: function (MyData) {
        var zijiNode = this.myNode
        var _myHead = zijiNode.getChildByName("nobody");
        var url = SelfHeadInfo().url;
        if (!url) url = "png/default_headpic.png";
        cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
            if (!err && texture&&cc.sys.isObjectValid(_myHead)) {
                var headSprite = new cc.Sprite(texture);
                headSprite.setPosition(_myHead.getContentSize().width / 2, _myHead.getContentSize().height / 2);
                headSprite.setScale((_myHead.getContentSize().width - 8) / headSprite.getContentSize().width);
                _myHead.addChild(headSprite);
            }
        });

        function _getName() {
            var pinfo = MjClient.data.pinfo;
            return unescape(pinfo.nickname );
        }

        var _name = zijiNode.getChildByName("Text_name");
        _name.setString(getNewName(_getName(), 7));

        var _rankText = zijiNode.getChildByName("Text_rank");
        _rankText.ignoreContentAdaptWithSize(true);
        _rankText.visible = false;

        //我的今日排名
        var _rankImage = zijiNode.getChildByName("image_rank");
        _rankImage.visible = false;
        var _pathIcon = "gameRank/";
        var rank = MyData.myRank;//我的排名
        if (rank) {
            if (rank == 1) {
                _rankImage.visible = true;
                _rankImage.loadTexture(_pathIcon + "one.png");

                var txk = new cc.Sprite("gameRank/txk_0.png");
                txk.setPosition(_myHead.getContentSize().width / 2, _myHead.getContentSize().height / 2);
                txk.setScale(_myHead.getContentSize().width / txk.getContentSize().width);
                _myHead.addChild(txk, 10);
            }
            else if (rank == 2) {
                _rankImage.visible = true;
                _rankImage.loadTexture(_pathIcon + "two.png");

                var txk = new cc.Sprite("gameRank/txk_1.png");
                txk.setPosition(_myHead.getContentSize().width / 2, _myHead.getContentSize().height / 2);
                txk.setScale(_myHead.getContentSize().width / txk.getContentSize().width);
                _myHead.addChild(txk, 10);
            }
            else if (rank == 3) {
                _rankImage.visible = true;
                _rankImage.loadTexture(_pathIcon + "three.png");

                var txk = new cc.Sprite("gameRank/txk_2.png");
                txk.setPosition(_myHead.getContentSize().width / 2, _myHead.getContentSize().height / 2);
                txk.setScale(_myHead.getContentSize().width / txk.getContentSize().width);
                _myHead.addChild(txk, 10);
            }
            else {
                _rankText.visible = true;
                _rankText.setString("" + rank);
            }
        }
        else {
            _rankText.visible = true;
            _rankText.setString("无");
        }

        //我的胜利场次
        var _text_winCount = zijiNode.getChildByName("Text_winCount");
        _text_winCount.ignoreContentAdaptWithSize(true);
        _text_winCount.setString(MyData.winCount);

        //我的胜利场次
        var _Text_queshen = zijiNode.getChildByName("Text_queshen");
        _Text_queshen.ignoreContentAdaptWithSize(true);
        _Text_queshen.setString(MyData.QueShenCount);
    }

    /****************
        end of 排行榜
    *****************/

});

