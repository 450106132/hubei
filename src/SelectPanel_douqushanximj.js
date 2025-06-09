// ------逗趣山西麻将 home--------

var HomeView_douqushanxi= cc.Layer.extend({
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
        this.uiNode = homeui.node;
        //BindUiAndLogic(homeui.node,this.jsBind);


        this.addChild(homeui.node);
        MjClient.homeui = this;
        var that = this;
        playMusic("bgMain");
        setMusicVolume(-1);

        UIEventBind(this.jsBind, homeui.node, "logout", function () {
            if (MjClient.homeui) {
                MjClient.homeui.removeFromParent(true);
                delete MjClient.homeui;
            }
        });

        UIEventBind(this.jsBind, homeui.node, "novice_guide_user", function (eD) {
            cc.log("新用户登录----------------------");
            var layer = new guidLayer_home();
            var layer1 = this.getChildByTag(2018717);
            if (layer1) layer1.removeFromParent(true);
            this.addChild(layer);
            layer.setTag(2018717);
        });

        UIEventBind(this.jsBind, homeui.node, "novice_guide_member", function (eD) {
            cc.log("新代理登录----------------------");
            var layer = new guidLayer_home();
            var layer1 = this.getChildByTag(2018717);
            if (layer1) layer1.removeFromParent(true);
            this.addChild(layer);
            layer.setTag(2018717);
        });


        var _back = homeui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0], true);


        //灯柱子
        var btnDengzhu = _back.getChildByName("btn_deng");
        btnDengzhu.setVisible(false);
        btnDengzhu.zIndex = 9;
        btnDengzhu.setAnchorPoint(0,0.5);
        setWgtLayout(btnDengzhu, [0.5, 0.5], [-0.03, 0.49], [0, 0], false, true);
        if(isIPhoneX())
        {
            setWgtLayout(btnDengzhu, [0.5, 0.5], [0.03, 0.49], [0, 0], false, true);
        }


        var star111 = new cc.ParticleSystem("Particle/xeuk.plist");
        star111.setPosition(_back.getContentSize().width * 0.5, _back.getContentSize().height);
        star111.setScale(1.2);
        _back.addChild(star111);



        //灯光若隐若现效果
        var light = new ccui.ImageView();
        light.loadTexture("hall/fire.png");
        light.setPosition(btnDengzhu.getContentSize().width/2,btnDengzhu.getContentSize().height/2);
        btnDengzhu.addChild(light);
        light.runAction(cc.sequence(cc.fadeOut(1), cc.fadeIn(1)).repeatForever());



        // btnDengzhu 是公告按钮
        btnDengzhu.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Gonggao", {uid:SelfUid()});
                    showAnnouncementPanel();
                    break;
                default:

                    break;
            }
        }, this);

        var starParticle1 =  new cc.ParticleSystem("Particle/qipao.plist");
        starParticle1.setTotalParticles(10);
        starParticle1.setPosition(light.getContentSize().width/2, light.getContentSize().height/2);
        light.addChild(starParticle1,100);


        //樱花
        // var starParticle1 =  new cc.ParticleSystem("Particle/particle_texture.plist");
        // starParticle1.setPosition(-20, _back.getContentSize().height+10);
        // starParticle1.setScale(2);
        // starParticle1.setTotalParticles(8);
        // _back.addChild(starParticle1,0);


        //底部功能按钮
        var _bottom_bg = _back.getChildByName("bottom_bg");
        this._bottom_bg = _bottom_bg;
        _bottom_bg.zIndex = 10;
        //for iphone x
        _bottom_bg.setAnchorPoint(0.5,0);
        setWgtLayout(_bottom_bg, [1, 0], [0.5, 0], [0, 0], false,true);

        //活动伸缩按钮
        var _btnActive = _bottom_bg.getChildByName("Btn_Active");

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


        // 绿色游戏 禁止赌博
        var hintTextNode = homeui.node.getChildByName("hintText");
        setWgtLayout(hintTextNode, [0.13, 0], [0.02, 0.95], [0, 0]);


        // 跑马灯
        var laba_bg = homeui.node.getChildByName("laba_bg");
        setWgtLayout(laba_bg, [0.45, 0], [0.24, 0.95], [0, 0]);
        var _scroll = laba_bg.getChildByName("scroll");
        var _msg = _scroll.getChildByName("msg");
        var scrollDataArr = [];
        scrollDataArr.push(MjClient.remoteCfg.guestLogin ? "欢迎来到" + AppCnName[MjClient.getAppType()] : MjClient.systemConfig.homeScroll);
        homePageRunText(_msg, scrollDataArr);
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
                homePageRunText(_msg, scrollDataNew);

            }
            _scroll.schedule(function () {
                homePageRunText(_msg, scrollDataArr);
            }, 600);
        });


        // 顶部按钮组
        var topGroup = homeui.node.getChildByName("Top_group");
        setWgtLayout(topGroup, [0.5, 0], [1, 1], [0, 0]);


        // 右上角的帮助按钮
        var _BtnHTP = topGroup.getChildByName("BtnHTP");
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


        //邮件
        this._youjian = topGroup.getChildByName("youjian");
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


        //设置
        var _setting = topGroup.getChildByName("setting");
        _setting.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var settringLayer = new HomeSettingView_shanxi();
                    settringLayer.setName("HomeClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);

        //实名认证
        var btnRenzheng = topGroup.getChildByName("btnRenzheng");
        if (!btnRenzheng) {
            btnRenzheng =  new ccui.Button("game_picture/renzheng.png");
            btnRenzheng.setName("btnRenzheng");
            btnRenzheng.addTouchEventListener(function (sender, type) {
                if (type === ccui.Widget.TOUCH_ENDED) {
                    MjClient.Scene.addChild(new shiMingRenZhengLayer());
                }
            },this)
            topGroup.addChild(btnRenzheng);
            btnRenzheng.setPosition(cc.p(314, 40));
        }
        btnRenzheng.visible = !MjClient.data.pinfo.identityNum;
        
        //客服按钮
        var _BtnKeFu = _bottom_bg.getChildByName("BtnKeFu");
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


        //战绩
        var _zhanji = _bottom_bg.getChildByName("zhanji");
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

        var sprite_star1 = cc.Sprite.create("hall/effectPic/yaoguang.png");
        sprite_star1.setScale(0);
        sprite_star1.setPosition(25,75);
        sprite_star1.runAction(cc.sequence(
            cc.spawn(cc.scaleTo(0.3,1), cc.rotateBy(0.3,90)),
            cc.spawn(cc.scaleTo(0.3,0), cc.rotateBy(0.3,90)),
            cc.delayTime(4)
        ).repeatForever());
        _zhanji.addChild(sprite_star1, 1);

        var starpao =  new cc.ParticleSystem("Particle/qipao.plist");
        starpao.setTotalParticles(6);
        starpao.setPosition(_zhanji.getContentSize().width/2, _zhanji.getContentSize().height/2);
        _zhanji.addChild(starpao,100);


        //广告代理
        var _btnAdv = homeui.node.getChildByName("btnAdv");
        var daili_qipao = _btnAdv.getChildByName("daili_qipao");
        daili_qipao.setVisible(false);
        // daili_qipao.runAction(cc.repeatForever(cc.sequence(
        //     cc.fadeIn(1),
        //     cc.repeat(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2)), 5),
        //     cc.fadeOut(1),
        //     cc.delayTime(0.5))));
        // var Text_qipao = daili_qipao.getChildByName("Text_qipao");
        // Text_qipao.setString("双11庆典！场次冲一冲，购物车清空！");
        var sprite_star1 = cc.Sprite.create("hall/effectPic/yaoguang.png");
        sprite_star1.setScale(0);
        sprite_star1.setPosition(52,92);
        sprite_star1.runAction(cc.sequence(
            cc.spawn(cc.scaleTo(0.3,1), cc.rotateBy(0.3,90)),
            cc.spawn(cc.scaleTo(0.3,0), cc.rotateBy(0.3,90)),
            cc.delayTime(3)
        ).repeatForever());
        _btnAdv.addChild(sprite_star1, 1);

        _btnAdv.visible = true;
        if (MjClient.remoteCfg.guestLogin == true||MjClient.isShenhe == true) {
            _btnAdv.visible = false;
            _btnAdv.setTouchEnabled(false);
        }
        // var bAdvShow = true;
        // _btnAdv.schedule(function () {
        //     if (bAdvShow) {
        //         _btnAdv.loadTextureNormal("game_picture/btn_adv_show.png");
        //         bAdvShow = false;
        //     }
        //     else {
        //         bAdvShow = true;
        //         _btnAdv.loadTextureNormal("game_picture/btn_adv_normal.png");
        //     }
        // }, 0.5);
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


        // //标题
        // this._tileIcon = homeui.node.getChildByName("title");

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
        var _btnShareGet = _bottom_bg.getChildByName("fenxiang");
        // var _tagIcon = _btnShareGet.getChildByName("hongDian");
        // _tagIcon.opacity = 255;
        // var _act = cc.sequence(cc.fadeIn(1),cc.delayTime(5),cc.fadeOut(0.5),cc.delayTime(10));
        // _tagIcon.runAction(_act.repeatForever());

        //推荐有礼
        var _btntuijian = _bottom_bg.getChildByName("tuijian");
        var _tagIcon1 = _btntuijian.getChildByName("hongDian");
        _tagIcon1.opacity = 0;
        _tagIcon1.schedule(function () {
            this.unscheduleAllCallbacks();
            this.runAction(cc.repeatForever(cc.sequence(
                cc.fadeIn(1),
                cc.repeat(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2)), 4),
                cc.fadeOut(1),
                cc.delayTime(2))));
        }.bind(_tagIcon1),2);

        ////头像
        var _headbg = homeui.node.getChildByName("head_bg");
        setWgtLayout(_headbg, [0.5, 0], [0, 0], [0, 0]);



        //商城
        var _BtnShop  = _bottom_bg.getChildByName("Button_store");

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("game_picture/shangcheng.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        _BtnShop.addChild(clipper);
        var sprite = new cc.Sprite("game_picture/shangchengguang.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction);//进行向右移动的重复动作


        //炮神榜
        //var _btnPao   = homeui.node.getChildByName("btnPao");


        //要新
        var _btnYaoXin = homeui.node.getChildByName("btnYaoXin");

        //红包背景
        var _btnHongBao_bg = homeui.node.getChildByName("btnHongBao_bg");

        //红包
        var _btnHongBao = homeui.node.getChildByName("btnHongBao");

        //公告 - by Tom
        var _announcementPanel = homeui.node.getChildByName("Panel_announcement");
        _announcementPanel.zIndex = 20;//比红包活的层级要高一点
        var _block = homeui.node.getChildByName("block");
        var _bg = _announcementPanel.getChildByName("anno_bg");
        _block.setVisible(false);
        setWgtLayout(_announcementPanel, [1, 1], [0, 0], [0, 0]);
        setWgtLayout(_block, [1, 1], [0, 0], [0, 0], true);


        var _announcementPanelPos = _announcementPanel.getPosition();
        var _announcementPanelWidth = _announcementPanel.getBoundingBox().width;
        var showAnnouncementPanel = function()
        {
            var x = _announcementPanelWidth;
            _block.setVisible(true);
            _block.setTouchEnabled(false);
            if(!isIPhoneX()) x = x - _announcementPanelWidth/14;
            _announcementPanel.setPositionX(_announcementPanelPos.x);
            _announcementPanel.stopAllActions();
            _announcementPanel.runAction(cc.sequence(cc.moveBy(0.4, cc.p(x, 0)).easing(cc.easeSineOut()),
                cc.callFunc(function () {
                    _block.setTouchEnabled(true);
                })));
        };

        var closeAnnouncementPanel = function()
        {
            _announcementPanel.stopAllActions();
            _block.setTouchEnabled(false);
            _block.setVisible(false);
            _announcementPanel.runAction(
                cc.moveBy(0.3, cc.p(-_announcementPanelWidth, 0)).easing(cc.easeSineIn()));
        };

        if(_announcementPanel)
        {
            if (MjClient.remoteCfg.guestLogin == true|| MjClient.isShenhe == true)
            {
                _announcementPanel.setVisible(false);
                _announcementPanel.setEnabled(false);
                _block.setVisible(false);
                _block.setEnable(false);
            }
            _block.setLocalZOrder(1);
            _announcementPanel.setLocalZOrder(1);
            _announcementPanel.getChildByName("txt_WXKeFu").setString("" + MjClient.systemConfig.gongzhonghao);
            _announcementPanel.getChildByName("txt_WXKeFu").ignoreContentAdaptWithSize(true);
            _announcementPanel.getChildByName("txt_WXDaiLi").setString("" + MjClient.systemConfig.majiangqun);
            _announcementPanel.getChildByName("txt_WXDaiLi").ignoreContentAdaptWithSize(true);

            var _btnCopy_kefu = _announcementPanel.getChildByName("btn_kefu");
            var _btnCopy_daili = _announcementPanel.getChildByName("btn_daili");
            var _bg = _announcementPanel.getChildByName("anno_bg");

            var copy1Cb = function (sender, Type)
            {
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.doCopyToPasteBoard("" + MjClient.systemConfig.gongzhonghao);
                        MjClient.showToast("复制成功，打开微信查找添加");
                        MjClient.native.openWeixin();
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Gonggao_Fuzhi_Youxiwentizixun", {uid:SelfUid()});
                        break;
                    default:
                        break;
                }
            };


            var copy2Cb = function (sender, Type)
            {
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.doCopyToPasteBoard("" + MjClient.systemConfig.majiangqun);
                        MjClient.showToast("复制成功，打开微信查找添加");
                        MjClient.native.openWeixin();
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Gonggao_Fuzhi_Dailizixun", {uid:SelfUid()});
                        break;
                    default:
                        break;
                }
            };

            var touchBlock = function (sender, Type)
            {
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        closeAnnouncementPanel();
                        break;
                    default:
                        break;
                }
            };

            _btnCopy_kefu.addTouchEventListener(copy1Cb, this);
            _btnCopy_daili.addTouchEventListener(copy2Cb, this);
            _block.addTouchEventListener(touchBlock, this);
        }

        setWgtLayout(_btnAdv, [0.18, 0.18], [0.95, 0.68], [0, 0]);
        setWgtLayout(_btnRank, [0.1, 0.14], [1, 1.02], [-2.2, -2.2]);

        setWgtLayout(_btnjulebu, [0.12, 0.12], [0.3, 0], [0, 0.6]);
        setWgtLayout(_btnmoreGame, [0.12, 0.12], [-0.5, -0.5], [0, 0.6]);


        showHomeActivityIcon(homeui);
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

                    //reallyPlayEffect("sound/button_click.mp3",false);
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
            _btnAdv.loadTextureNormal("game_picture/daili_xia.png")
            _btnAdv.loadTexturePressed("game_picture/daili_xia_s.png")
            _btnAdv.removeAllChildren(true);
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

        _btnShareGet.addTouchEventListener(function (sender, Type) {
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
        var _shareTip = _btnShareGet.getChildByName("fenxiang_tip");
        _btnShareGet.schedule(function () {
            var lastStr = MjClient.data.pinfo.lastShareDay;
            var currentStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
            var _sprite = _btnShareGet.getChildByName("hongDian");


            if (currentStr == lastStr) {
                _sprite.visible = false;
            }else{
                _sprite.visible = true;
            }
            if (_sprite && _shareTip)
                _shareTip.visible = _sprite.visible;

        }, 1);

        if (_shareTip) {
            if (_btnActive)
                _btnShareGet.setZOrder(_btnActive.getZOrder() + 1);
            _shareTip.setOpacity(0);
            _shareTip.runAction(cc.repeatForever(cc.sequence(
                cc.fadeIn(1),
                cc.repeat(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2)), 4),
                cc.fadeOut(1),
                cc.delayTime(2))));
        }

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
                /*
                var clippingNode = new cc.ClippingNode();
                var mask = new cc.Sprite("hall/headMask.png");
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);
                var img = new cc.Sprite(d.img);
                img.setScale(mask.getContentSize().width/img.getContentSize().width);
                clippingNode.addChild(img);
                clippingNode.setScale(0.999);

                clippingNode.setPosition(_head.getContentSize().width/2,_head.getContentSize().height/2);

                //遮罩框
                _head.addChild(clippingNode);
                */

                var sp = new cc.Sprite(d.img);
                sp.setPosition(_head.getContentSize().width/2,_head.getContentSize().height/2);
                sp.setScale(_head.getContentSize().width/sp.getContentSize().width);
                _head.addChild(sp);
            }
        });

        _head.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.showPlayerInfoBind(MjClient.data.pinfo, true, true);
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang", {uid:SelfUid()});
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

        //礼券
        var _liquanBack = _head.getChildByName("liquanback");
        _liquanBack.visible = MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JI_FEN_SHANG_CHENG);
        var _liquan = _liquanBack.getChildByName("liquan");
        _liquan.ignoreContentAdaptWithSize(true);
        var btn_addLQ = _liquanBack.getChildByName("btn_add");
        btn_addLQ.addTouchEventListener(function(sender,type){
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


        var _biaoqian = _BtnShop.getChildByName("Image_biaoqian");
        if(_biaoqian)
        {
            _biaoqian.runAction(cc.sequence(cc.rotateTo(3, 30).easing(cc.easeSineInOut()), cc.rotateTo(2, 0).easing(cc.easeSineInOut())).repeatForever());
            var _store_guang = _BtnShop.getChildByName("Image_guang");
            _store_guang.runAction(cc.sequence(cc.spawn(cc.scaleTo(2, 1.2), cc.fadeOut(2)),
                cc.callFunc(function () { _store_guang.setScale(1); _store_guang.setOpacity(255); })).repeatForever());
        }

        //游戏列表
        this._gameListPanelNode = homeui.node.getChildByName("Panel_GameList");
        //游戏
        this._gamePanelNode = homeui.node.getChildByName("Panel_game");
        this._gamePanelNode.visible = false;




        this.setGamePanel(this._gamePanelNode);
        this.setGameListPanel(this._gameListPanelNode);


        COMMON_UI.addHintText(homeui.node);
        // COMMON_UI.addExitGame(homeui.node);
        return true;
    },
    showJinbiView:function () {
        goldField_start();
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
    doShowAction:function () {

        var topActionList = this._topActionList || [];
        var bottomActionList = this._bottomActionList || [];
        var rightActionList = this._rightActionList || [];
        var leftActionList = this._leftActionList || [];

        var actionTime1 = 0.3;
        var actionTime2 = 0.1;
        for(var i = 0 ; i < topActionList.length; i ++){
            topActionList[i].runAction(cc.sequence(cc.moveTo(actionTime1,cc.p(topActionList[i].truePosition.x,topActionList[i].truePosition.y * 0.99)),cc.moveTo(actionTime2,topActionList[i].truePosition)));
        }

        for(var i = 0 ; i < bottomActionList.length; i ++){
            bottomActionList[i].runAction(cc.sequence(cc.moveTo(actionTime1,cc.p(bottomActionList[i].truePosition.x,bottomActionList[i].truePosition.y * 1.01)),cc.moveTo(actionTime2,bottomActionList[i].truePosition)));
        }

        for(var i = 0 ; i < rightActionList.length; i ++){
            rightActionList[i].runAction(cc.sequence(cc.moveTo(actionTime1,cc.p(rightActionList[i].truePosition.x * 0.95,rightActionList[i].truePosition.y)),cc.moveTo(actionTime2,rightActionList[i].truePosition)));
        }

        for(var i = 0 ; i < leftActionList.length; i ++){
            leftActionList[i].runAction(cc.sequence(cc.moveTo(actionTime1,cc.p(leftActionList[i].truePosition.x * 1.05,leftActionList[i].truePosition.y)),cc.moveTo(actionTime2,leftActionList[i].truePosition)));
        }
        this._isShowingGoldHall = false;
    },
    doHideAction:function () {
        if(this._isShowingGoldHall){
            return;
        }
        this._isShowingGoldHall = true;
        var that = this;
        var topActionList = [];
        // topActionList.push(this.uiNode.getChildByName("back").getChildByName("headbg"));
        topActionList.push(this.uiNode.getChildByName("Top_group").getChildByName("youjian"));
        topActionList.push(this.uiNode.getChildByName("Top_group").getChildByName("BtnHTP"));
        topActionList.push(this.uiNode.getChildByName("Top_group").getChildByName("setting"));
        // topActionList.push(this.uiNode.getChildByName("laba_bg"))
        // topActionList.push(this.uiNode.getChildByName("btnAdv"))

        //dX,dY是增加偏移
        var bottomActionList = [];
        this._bottom_bg._dY = this._bottom_bg.height * 2;
        bottomActionList.push(this._bottom_bg);

        var leftActionList = [];
        
        // 左边功能按钮
        leftActionList.push(this._gamePanelNode.getChildByName("adv_bg"));

        var rightActionList = [];
        // 右边功能按钮
        rightActionList.push(this._gamePanelNode.getChildByName("game_bg"));

        //其余的通过计算估算动画
        var childrens = this.uiNode.getChildren();
        for(var i in childrens){
            if( topActionList.indexOf(childrens[i]) != -1||
                bottomActionList.indexOf(childrens[i]) != -1||
                leftActionList.indexOf(childrens[i]) != -1||
                rightActionList.indexOf(childrens[i])!= -1 ){
                continue;
            }
            if(childrens[i].name == "back" || childrens[i].name == "Panel_game"){
                continue;
            }
            var centerPoint = cc.p((childrens[i].x + (childrens[i].getAnchorPoint().x-0.5) * childrens[i].width),(childrens[i].y + (childrens[i].getAnchorPoint().y-0.5) * childrens[i].height));
            if(centerPoint.y >= MjClient.size.height * 0.9){
                //加到顶部
                topActionList.push(childrens[i]);
            }else if(centerPoint.y <= MjClient.size.height * 0.1){
                //加到底部
                bottomActionList.push(childrens[i]);
            }else if(centerPoint.x <= MjClient.size.width * 0.5){
                //加到左边
                leftActionList.push(childrens[i]);
            }else {
                //加到右边
                rightActionList.push(childrens[i]);
            }
        }
        this._topActionList = topActionList;
        this._bottomActionList = bottomActionList;
        this._rightActionList = rightActionList;
        this._leftActionList = leftActionList;


        var windowSize = {width: 1280, height: 720};
        windowSize.width = MjClient.size.width > windowSize.width ? MjClient.size.width : windowSize.width;
        windowSize.height = MjClient.size.height > windowSize.height ? MjClient.size.height : windowSize.height;
        
        var actionTime1 = 0.3;
        var actionTime2 = 0.1;
        for(var i = 0 ; i < topActionList.length; i ++){
            topActionList[i].truePosition = topActionList[i].getPosition();
            topActionList[i].hidePosition = cc.p(topActionList[i].getPositionX(),windowSize.height + (topActionList[i].height/2 + Math.abs( 0.5-topActionList[i].getAnchorPoint().y) * topActionList[i].height+(topActionList[i]._dY?topActionList[i]._dY:0))*topActionList[i].scale);
            topActionList[i].runAction(cc.sequence(cc.moveTo(actionTime1,topActionList[i].hidePosition)));
        }

        for(var i = 0 ; i < bottomActionList.length; i ++){
            bottomActionList[i].truePosition = bottomActionList[i].getPosition();
            bottomActionList[i].hidePosition = cc.p(bottomActionList[i].getPositionX(),(- bottomActionList[i].height/2 - Math.abs( bottomActionList[i].getAnchorPoint().y-0.5) * bottomActionList[i].height-(bottomActionList[i]._dY?bottomActionList[i]._dY:0))*bottomActionList[i].scale);
            bottomActionList[i].runAction(cc.sequence(cc.moveTo(actionTime1,bottomActionList[i].hidePosition)));
        }

        for(var i = 0 ; i < rightActionList.length; i ++){
            rightActionList[i].truePosition = rightActionList[i].getPosition();
            rightActionList[i].hidePosition = cc.p(windowSize.width + (rightActionList[i].width/2 + Math.abs( 0.5-rightActionList[i].getAnchorPoint().x) * rightActionList[i].width+(rightActionList[i]._dX?rightActionList[i]._dX:0))*rightActionList[i].scale,rightActionList[i].getPositionY());
            rightActionList[i].runAction(cc.sequence(cc.moveTo(actionTime1,rightActionList[i].hidePosition)));
        }

        for(var i = 0 ; i < leftActionList.length; i ++){
            leftActionList[i].truePosition = leftActionList[i].getPosition();
            leftActionList[i].hidePosition = cc.p((- leftActionList[i].width/2 - Math.abs( leftActionList[i].getAnchorPoint().x-0.5) * leftActionList[i].width-(leftActionList[i]._dX?leftActionList[i]._dX:0))*leftActionList[i].scale,leftActionList[i].getPositionY());
            leftActionList[i].runAction(cc.sequence(cc.moveTo(actionTime1,leftActionList[i].hidePosition)));
        }
        this.runAction(cc.sequence(cc.delayTime(actionTime1),cc.callFunc(function () {
            var intoType = 1;
            if(MjClient.GoldHallLayer){
                intoType = 0;
                MjClient.GoldHallLayer.removeFromParent(true);
            }
            var goldHallLayer = new GoldHallLayer(intoType);
            that.goldHallLayer = goldHallLayer;
            that.addChild(goldHallLayer);

        }.bind(this))));
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

        cc.log("================gameClass = " + JSON.stringify(MjClient.systemConfig.gameClass));
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
            //this._BtnRuturn.visible = false;
        }
    },
    setGamePanel: function (gamePanelNode) {
        var that = this;
        setWgtLayout(gamePanelNode, [0.95, 0.95], [0.5, 0.5], [0, 0]);
        if(isIPhoneX())
        {
            setWgtLayout(gamePanelNode, [0.8, 0.8], [0.5, 0.54], [0, 0]);
        }

        var gameBgNode = gamePanelNode.getChildByName("game_bg");

        var advBgNode  = gamePanelNode.getChildByName("adv_bg");

        // 加入房间
        this._joinRoom = gameBgNode.getChildByName("joinRoom");
        this._joinRoom.setPressedActionEnabled(true);
        this._joinRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new EnterRoomLayer());
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);

        // 创建房间
        this._createRoom = gameBgNode.getChildByName("createRoom");
        this._createRoom.setPressedActionEnabled(true);
        this._createRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian", {uid:SelfUid()});
                    if (!MjClient.data.sData)
                    {
                        postEvent("createRoom",{});
                    }
                    else
                    {
                        MjClient.showMsg("房间已经创建,请直接加入房间。");
                    }
                    break;
                default:
                    break;
            }
        }, this);


        //金币场
        var goldBtn = gameBgNode.getChildByName("goldBtn");
        goldBtn.setPressedActionEnabled(true);

        UIEventBind(this.jsBind, goldBtn, "goldfieldchange", function () {
            if(cc.sys.isObjectValid(MjClient.GoldHallLayer)){
                return;
            }
            if (!MjClient._GOLD_FIELD || MjClient._GOLD_FIELD.length == 0){
                MjClient.showToast("金币场暂未开放");
                that.showNomalHome();
                return;
            }
            that.doHideAction();
        });
        goldField_updateListener(goldBtn);

        var jiaoBiao = new cc.Sprite("game_picture/mainMenu/jiaobiao2.png");
        jiaoBiao.setPosition(jiaoBiao.width*0.55, goldBtn.height - jiaoBiao.height*0.5);
        goldBtn.addChild(jiaoBiao);

        goldBtn.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinbichang", {uid:SelfUid()});
                    goldField_start();
                    //that.showJinbiView();
                    break;
                default:
                    break;
            }
        }, this);

        // 金币场的特效
        // var _Image_gold = goldBtn.getChildByName("Image_gold"); //发财这个字
        // _Image_gold.runAction(cc.sequence(cc.moveBy(1.8,cc.p(0,-6)).easing(cc.easeQuadraticActionInOut()), cc.moveBy(2,cc.p(0,6)).easing(cc.easeQuadraticActionInOut())).repeatForever());

        //扫光
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("game_picture/mainMenu/yule_di.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        var sprite = new cc.Sprite("game_picture/mainMenu/saoguang.png");
        sprite.setScale(1.5);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(2, cc.p(sten.width + 100,sten.height / 2)),
            cc.delayTime(1.5)));
        sprite.runAction(repeatAction);//进行向右移动的重复动作
        clipper.addChild(sprite, 1);
        goldBtn.addChild(clipper);

        var hongbaoEffect = goldBtn.getChildByName("Node_hongbaoEffect");
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
            hongbaoEffect.setVisible(true);
        }else {
            hongbaoEffect.setVisible(false);
        }

        // 俱乐部
        var clubEnter = gameBgNode.getChildByName("clubEnter");
        if (MjClient.systemConfig.clubEnable == "true" && MjClient.isShenhe == false)
        {
            clubEnter.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        //reallyPlayEffect("sound/home_click.mp3",false);
                         MjClient.Scene.addChild(new FriendCard_main(null, 1));
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Qinyouquan", {uid:SelfUid()});
                        break;
                    default:
                        break;
                }
            }, this);
        }
        else
        {
            clubEnter.visible = false;
            this._joinRoom.x += this._joinRoom.width+50;
            this._joinRoom.setScale(1.5);
            // this._createRoom.x += this._createRoom.width/3;
        }

        // var _pocker = clubEnter.getChildByName("Image_poker");
        // _pocker.runAction(cc.sequence(cc.rotateBy(1.8,-6).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(2,6).easing(cc.easeQuadraticActionInOut())).repeatForever());

        var _joinRoomPar =  new cc.ParticleSystem("Particle/joinRoomPar.plist");
        _joinRoomPar.setPosition(clubEnter.getContentSize().width/2, clubEnter.getContentSize().height/3);
        _joinRoomPar.setScale(1);
        clubEnter.addChild(_joinRoomPar,0);

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
        // if (gameClassList.length > 1) {
        //     this._tileIcon.loadTexture(GameClassTitleIcon[MjClient.gameClass]);
        // }
        // else {
        //     this._tileIcon.loadTexture("game_picture/logo_home.png");
        // }

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

    /**************
        bagan 排行榜
     *************/
    gameRankLayer: function () {

    },

    //雀神榜
    reqQueShenSeverData: function () {

    },
    rspQueShen: function (data) {

    },

    //富豪榜
    reqFuHaoSeverData: function () {

    },
    rspFuHao: function (data) {

    },

    initSelfInfo: function (MyData) {

    },

    /****************
        end of 排行榜
    *****************/

    createButterfly:function(pos,speed){
        cc.spriteFrameCache.addSpriteFrames("spine/home/fly/fly.plist","spine/home/fly/fly.png");
        //var _image = new ccui.ImageView();
        //_image.loadTexture("png/adv/menghuan_bg.png");

        var frames = [];
        var prefix = "HUIDIE000";
        var fc = cc.spriteFrameCache;
        for (var i = 1; i < 4; i++) {
            var name = prefix + i + ".png";
            var f = fc.getSpriteFrame(name);
            if(f)
            {
                frames.push(f);
            }
        }
        var firstFrame = new cc.Sprite("#HUIDIE0001.png");
        var animate = cc.animate(new cc.Animation(frames, speed, 1));
        firstFrame.runAction(animate.repeatForever());
        firstFrame.setPosition(pos);
        return firstFrame;
    },


    getAdvShow:function(){

        var _image = new ccui.ImageView();
        _image.loadTexture("home/hongbao.png");
        _image.setTouchEnabled(true);
        _image.addTouchEventListener(function(sender,type){
            if(type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Guanggaowei", {uid:SelfUid()});
                if(MjClient.systemConfig.showOtherGameUrl)
                {
                    MjClient.native.OpenUrl(MjClient.systemConfig.showOtherGameUrl);
                }
                else
                {

                }
            }
        },_image);


        var lizitexiao =  new cc.ParticleSystem("Particle/hongbao.plist");
        lizitexiao.setPosition(_image.width*0.8, _image.height/2);
        lizitexiao.setScale(1);
        lizitexiao.setBlendFunc(cc.SRC_ALPHA,cc.ONE_MINUS_SRC_ALPHA)
        _image.addChild(lizitexiao);


        return _image;
    }


});

