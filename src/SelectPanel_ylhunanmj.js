// ------永利湖南竞技棋牌 home （copy 牌友联盟岳阳棋牌 by sking )--------

var HomeView_ylhunanmj = cc.Layer.extend({
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
    _matchBtn:null,
    _yuepaiBtn:null,
    ctor: function () {
        this._super();
        var homeui = ccs.load(res.Home_json);
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

        /*

        //飞鸟
        var _flyNode = _back.getChildByName("Panel_flyBire");
        setWgtLayout(_flyNode, [0.06, 0.06], [0.65, 0.9], [0, 0], false,true);
        var path = "hall/homeEffect/birdfly";
        var skyfly = COMMON_UI.creatFrameAni(path,"daniao_",198);
        _flyNode.addChild(skyfly);

        // 烟花（帧动画）
        // var _flyNode = _back.getChildByName("Panel_flyBire");
        // setWgtLayout(_flyNode, [0.08, 0.08], [0.5, 0.9], [0, 0], false,true);
        // var path = "hall/homeEffect/fireFlower";
        // var yanhua = COMMON_UI.creatFrameAni(path, "firework_", 25);
        // _flyNode.addChild(yanhua);

        // 烟花（粒子动画）
        var starParticle_yanhua =  new cc.ParticleSystem("hall/homeEffect/particle_texture.plist");
        starParticle_yanhua.setPosition(_back.getContentSize().width/2, _back.getContentSize().height*5/6);
        // starParticle_yanhua.setScale(1);
        // starParticle_yanhua.setTotalParticles(10);
        _back.addChild(starParticle_yanhua);

        //一群蝴蝶
        var _buterflysNode = _back.getChildByName("Panel_buterflys");
        setWgtLayout(_buterflysNode, [0.05, 0.05], [0.98, 0.5], [0, 0], false,true);
        var path = "hall/homeEffect/buterflys";
        var butterflys = COMMON_UI.creatFrameAni(path,"huidie_",32);
        _buterflysNode.addChild(butterflys);

        */

        /*
        //人物
        var _roleNode = _back.getChildByName("Panel_role");
        this._roleNode = _roleNode;
        setWgtLayout(_roleNode, [0.25, 0.25], [0.5, 0], [0, 0], false,true);
        var roleAni = createSpine("spine/home/renwu/chaifen.json", "spine/home/renwu/chaifen.atlas");
        roleAni.setAnimation(0, 'idle', true);
        roleAni.setPosition(20, 0);
        roleAni.setScale(1);
        roleAni.setTimeScale(0.7);
        _roleNode.addChild(roleAni,100);
        */

        /*
        // 新版人物，静态图片
        setWgtLayout(_roleNode, [0.25, 0.25], [0.5, 0], [0, 0], false,true);
        var roleAni = ccui.ImageView("game_picture/juese.png");
        roleAni.setAnchorPoint(0.5,0.5);
        roleAni.setPosition(0,360);
        _roleNode.addChild(roleAni,100);
        */

        // 顶部个人信息，头像
        var _headbg = _back.getChildByName("headbg");
        setWgtLayout(_headbg, [1, 0.456], [0, 1.005], [0, 0], false, true);

        // 底部功能按钮
        var _bottom_bg = _back.getChildByName("bottom_bg");
        this._bottom_bg = _bottom_bg;
        _bottom_bg.setAnchorPoint(0.5,0);
        setWgtLayout(_bottom_bg, [1, 1], [0.5, 0], [0, 0], false,true);

        //樱花
        var starParticle1 =  new cc.ParticleSystem("Particle/particle_texture.plist");
        starParticle1.setPosition(-20, _back.getContentSize().height+10);
        starParticle1.setScale(2);
        starParticle1.setTotalParticles(8);
        _back.addChild(starParticle1,0);

        /*
        //桃花樹枝
        var _Image_flower = _back.getChildByName("Image_flower");
        _Image_flower.zIndex = 9;
        setWgtLayout(_Image_flower, [0.2, 0.2], [0, 1], [0, 0], false,true);
        _Image_flower.runAction(cc.sequence(cc.rotateBy(1.8,4).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(2,-4).easing(cc.easeQuadraticActionInOut())).repeatForever());
        */

        //活动伸缩按钮
        var _btnActive = _bottom_bg.getChildByName("Btn_Active");
        // _Image_light.visible = true;

        function _btnActiveTouchEvent(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Activity", {uid:SelfUid()});
                    if (MjClient.systemConfig && MjClient.systemConfig.activity)
                    {
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

        //设置
        var _setting = homeui.node.getChildByName("setting");
        //setWgtLayout(_setting, [0.06, 0.13], [1, 1.02], [-0.6, -0.8]);
        _setting.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var settringLayer = new HomeSettingView_yueyang();
                    settringLayer.setName("HomeClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);

        //右上角的客服按钮
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
        if (MjClient.remoteCfg.guestLogin == true||MjClient.isShenhe == true) {
            _btnAdv.visible = false;
            _btnAdv.setTouchEnabled(false);
        }
        var bAdvShow = true;
        // _btnAdv.schedule(function () {
        //     if (bAdvShow) {
        //         _btnAdv.loadTextureNormal("game_picture/btn_adv_normal.png");
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

        // 跑马灯
        this._tileIcon = homeui.node.getChildByName("laba_bg");
        if (isIPhoneX()) {
            setWgtLayout(this._tileIcon, [0.5, 0.5], [0.43, 0.86], [0, 0]);
        }
        else {
            setWgtLayout(this._tileIcon, [0.5, 0.5], [0.435, 0.83], [0, 0]);
        }

        //排行榜
        var _btnRank = homeui.node.getChildByName("btnRank");
        var starParticle = new cc.ParticleSystem("game_picture/diamondStar.plist");
        starParticle.setPosition(_btnRank.getContentSize().width / 2, _btnRank.getContentSize().height / 2);
        _btnRank.addChild(starParticle);


        //更多游戏
        var _btnmoreGame = homeui.node.getChildByName("moreGame");

        //分享有礼
        var _btnShareGet = _bottom_bg.getChildByName("fenxiang");

        //推荐有礼
        var _btntuijian = _bottom_bg.getChildByName("tuijian");

        var creatFrameAni = function(resPath,frameName,frameCount,dt,dealyTime)
        {
            dt = dt || 1;
            dealyTime = dealyTime || 0;
            cc.spriteFrameCache.addSpriteFrames(resPath + ".plist",resPath + ".png");
            var frames = [];
            var prefix = frameName; //"HDH000";
            var fc = cc.spriteFrameCache;
            var count = 0;
            for (var i = dt; count <  frameCount; i++) {
                var k = i%frameCount + 1;
                var name = prefix + k + ".png";
                var f = fc.getSpriteFrame(name);
                if(f)
                {
                    frames.push(f);
                }
                count++;
            }
            var firstFrame = new cc.Sprite("#" + frameName + "1.png");
            var ani = cc.animate(new cc.Animation(frames, 0.06, 1));
            var animate = cc.sequence(ani.repeat(3),cc.delayTime(dealyTime));
            firstFrame.runAction(animate.repeatForever());
            return firstFrame;
        }


        var path = "hall/homeEffect/headfly";
        var headButterfly = creatFrameAni(path,"zihudie_",9,1,2);
        headButterfly.setPosition(cc.p(-120,113.6));
        _headbg.addChild(headButterfly);

        // 返回
        //this._BtnRuturn = homeui.node.getChildByName("BtnRuturn");

        //商城
        var _BtnShop  = _bottom_bg.getChildByName("Button_store");

        //炮神榜
        //var _btnPao   = homeui.node.getChildByName("btnPao");


        //要新
        var _btnYaoXin = homeui.node.getChildByName("btnYaoXin");

        //红包背景
        var _btnHongBao_bg = homeui.node.getChildByName("btnHongBao_bg");

        //红包
        var _btnHongBao = homeui.node.getChildByName("btnHongBao");

        showHomeActivityIcon(homeui); 

    

        //公告按钮
        var btn_gonggao = _headbg.getChildByName("btn_gonggao");
        if (btn_gonggao)
        {
            btn_gonggao.setVisible(false);
            //btn_gonggao.setName("soundSelf");
            btn_gonggao.runAction(cc.sequence(cc.rotateBy(1,-3).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(1.2,3).easing(cc.easeQuadraticActionInOut())).repeatForever());
            //setWgtLayout(btn_gonggao, [0.25, 0.25], [0.12, 1], [0, 0]);
            if (MjClient.remoteCfg.guestLogin == true) {
                btn_gonggao.setVisible(false);
            }
            btn_gonggao.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Gonggao", {uid:SelfUid()});
                    //reallyPlayEffect("sound/home_click.mp3",false);
                    MjClient.Scene.addChild(new gongGaoLayer());
                }
            },this)
        }

        //公告
        var _gonggao = homeui.node.getChildByName("Image_gonggao");
        if (_gonggao) {
            if (MjClient.remoteCfg.guestLogin == true|| MjClient.isShenhe == true) {
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

            var _text_3 = _gonggao.getChildByName("Text_3");
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

        setWgtLayout(_btnAdv, [0.06, 0.13], [1, 1.03], [-5.1, -0.9]);
        setWgtLayout(this._youjian, [0.06, 0.13], [1, 1.03], [-3.7, -0.9]);
        setWgtLayout(_BtnHTP, [0.06, 0.13], [1, 1.03], [-2.3, -0.9]);
        setWgtLayout(_setting, [0.06, 0.13], [1, 1.03], [-0.9, -0.9]);

        if(isIPhoneX()){
            setWgtLayout(_btnAdv, [0.06, 0.13], [1, 1.03], [-5.7, -0.9]);
            setWgtLayout(this._youjian, [0.06, 0.13], [1, 1.03], [-4.1, -0.9]);
            setWgtLayout(_BtnHTP, [0.06, 0.13], [1, 1.03], [-2.5, -0.9]);
            setWgtLayout(_setting, [0.06, 0.13], [1, 1.03], [-0.9, -0.9]);
        }

        //setWgtLayout(_btnAdv, [0.068, 0.121 ], [0.34, 0.025], [0, 0.0]);
        //setWgtLayout(_btnRank, [0.1, 0.14], [1, 1.02], [-2.2, -2.2]);
        setWgtLayout(_gonggao, [0.22, 0.32], [0.22, 0.506], [0.0, 0.0]);

        //setWgtLayout(_Image_light, [0.5, 0.5], [0.9, 0.1], [0.14, -0.05]);
        //setWgtLayout(_btnActive, [0.15, 0.15], [0.5, 0], [0, 0]);
        //setWgtLayout(_BtnShop , [0.068, 0.121], [0.25, 0.025], [0, 0]);

        setWgtLayout(_btnmoreGame, [0.12, 0.12], [-0.5, -0.5], [0, 0.6]);
        //setWgtLayout(_btntuijian, [0.12, 0.12], [0.6, 0.025], [0, 0.0]);
        //setWgtLayout(_btnShareGet, [0.12, 0.12], [0.7, 0.025], [0, -0.03]);
        //setWgtLayout(_headbg, [0.078, 0.14], [0.17, 0.99], [0, -0.025]);
        //setWgtLayout(this._BtnRuturn, [0.065, 0.132], [0.08, 0.99], [0, -0.025]);

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

        if (MjClient.remoteCfg.guestLogin == true ||
            MjClient.systemConfig.moreGameEnable != "true" ||
            MjClient.isShenhe) {
            _btnmoreGame.visible = false;
            _btnmoreGame.setTouchEnabled(false);
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
        var _shareTipText = null;
        if (_shareTip) {
            _shareTipText = _shareTip.getChildByName("Text_4");
            _shareTipText.ignoreContentAdaptWithSize(true);
            _shareTipText.setString("100%中奖");
        }
        var checkShareTipFunc = function () {
            var lastStr = MjClient.data.pinfo.lastShareDay;
            var currentStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
            var _sprite = _btnShareGet.getChildByName("hongDian");


            if (currentStr <= lastStr) {
                _sprite.visible = false;
            }else{
                _sprite.visible = true;
            }
            if (_sprite && _shareTip)
                _shareTip.visible = _sprite.visible;

        }
        checkShareTipFunc();
        _btnShareGet.schedule(checkShareTipFunc, 1);

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
        this._headNode = _head;
        UIEventBind(this.jsBind, _head, "loadWxHead", function (d) {
            if (d.uid == MjClient.data.pinfo.uid) {
                // var sp = new cc.Sprite(d.img);
                // this.addChild(sp);
                // setWgtLayout(sp, [0.93, 0.93], [0.5, 0.5], [0, 0], false, true);

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

        var arr = ["bg2", "liquanNum", "liquan", "btn_add_liquan"];
        if(!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JI_FEN_SHANG_CHENG) && cc.sys.isObjectValid(_head))
        {
            for(var i = 0; i < arr.length; i++)
            {
                _head.getChildByName(arr[i]).setVisible(false);
            }
        }


        var moneyNum = _head.getChildByName("moneyNum");
        moneyNum.ignoreContentAdaptWithSize(true);


        var liquanNum = _head.getChildByName("liquanNum");
        liquanNum.ignoreContentAdaptWithSize(true);

        var btn_addYB = _head.getChildByName("btn_add_money");
        var btn_addLQ = _head.getChildByName("btn_add_liquan");
        btn_addYB.addTouchEventListener(function(sender,type){
            if(type === 2){
				MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Gold_Add", {uid:SelfUid()});
                this.changeMoney();
                MjClient.Scene.addChild(enter_store());
            }
        },this);
        btn_addLQ.addTouchEventListener(function(sender,type){
            if(type === 2){
				MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Liquan_Add", {uid:SelfUid()});
                this.changeMoney();
                MjClient.Scene.addChild(new ShopOfJifen_layer());
            }
        },this);
        UIEventBind(this.jsBind, _head, "updateInfo", function () {
            var icurrentMoney = parseInt(moneyNum.preValue);
            var lastMoney = parseInt(MjClient.data.pinfo.money);
            var icurrentLiquan = parseInt(liquanNum.preValue);
            var lastLiquan = Number(MjClient.data.pinfo.integral);

            var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
            starParticle.setPosition(moneyNum.getContentSize().width / 2, moneyNum.getContentSize().height / 2);

            if (lastMoney > icurrentMoney)
            {
                moneyNum.addChild(starParticle);
                moneyNum.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            else if (lastLiquan > icurrentLiquan)
            {
                liquanNum.addChild(starParticle);
                liquanNum.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            MjClient.homeui.changeMoney();
        });

        UIEventBind(this.jsBind, _head, "loginOK", function () {
            MjClient.homeui.changeMoney();
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


        if(_BtnShop){
            var lightNode = _bottom_bg.getChildByName("Button_store_light");
            lightNode.runAction(cc.sequence(cc.fadeOut(1), cc.fadeIn(1)).repeatForever());
        }



        //游戏列表
        //this._gameListPanelNode = homeui.node.getChildByName("Panel_GameList");
        //游戏
        this._gamePanelNode = homeui.node.getChildByName("Panel_game");

        //金币场
        this.setGamePanel(this._gamePanelNode);
        //this.setGameListPanel(this._gameListPanelNode);

        this.changeMoney();
        //比赛场
        this._matchBtn = homeui.node.getChildByName("matchBtn");
        if(isIPhoneX()){
            setWgtLayout(this._matchBtn, [0.35, 0.35], [0, 0.5], [0, 0]);
        }else {
            setWgtLayout(this._matchBtn, [0.35, 0.35], [-0.045, 0.5], [0, 0]);
        }
        this._matchBtn.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    //reallyPlayEffect("sound/home_click.mp3",false);
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_BisaichangClick", {uid:SelfUid()});
                    if (MjClient.systemConfig.matchRoomEnable == "true") {
                        MjClient.Scene.addChild(new playgroundLayer());
                    }
                    else {
                        MjClient.showToast("即将开放,敬请期待");
                    }
                    break;
                default:
                    break;
            }
        }, this);
        this._matchBtn.visible = false;
        //约牌
        this._yuepaiBtn = homeui.node.getChildByName("yuepaiBtn");
        this._yuepaiBtn.setVisible(false);
        if(isIPhoneX()){
            setWgtLayout(this._yuepaiBtn, [0.35, 0.35], [0, 0.5], [0, 0]);
        }else {
            setWgtLayout(this._yuepaiBtn, [0.35, 0.35], [-0.045, 0.5], [0, 0]);
        }
        this._yuepaiBtn.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    //reallyPlayEffect("sound/home_click.mp3",false);
                    this.showNomalHome();
                    break;
                default:
                    break;
            }
        }, this);


        return true;
    },

    showNomalHome:function () {
        MjClient.homeui._matchBtn.setVisible(false);
        MjClient.homeui._yuepaiBtn.setVisible(false);
        MjClient.homeui._gamePanelNode.setVisible(true);
        this.changeMoney();
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
    // 金币场和大厅，元宝和礼券都显示
    // 金币场： 元宝：gold     礼券：integral
    // 大厅：   元宝：money    礼券：integral
    changeMoney:function () {
        var liquanNum = this._headNode.getChildByName("liquanNum");
        var moneyNum = this._headNode.getChildByName("moneyNum");
        moneyNum.preValue = MjClient.data.pinfo.money;
        changeAtalsForLabel(moneyNum, MjClient.data.pinfo.money);
        liquanNum.preValue = MjClient.data.pinfo.integral;
        changeAtalsForLabel(liquanNum, MjClient.data.pinfo.integral);
    },
    showJinbiView:function () {
        goldField_start();
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

        var gameClassList = [];
        if(MjClient.systemConfig && MjClient.systemConfig.gameClass){
            gameClassList = JSON.parse(MjClient.systemConfig.gameClass);//[MjClient.GAME_CLASS.NIU_NIU];//
        } else {
            this.scheduleOnce(function(){
                MjClient.showMsg("网络开小差，请重启游戏或者联系客服\n systemConfig.gameClass no gameClass");
            } , 0.1);
            
            cc.log('error MjClient.systemConfig no gameClass', JSON.stringify(MjClient.systemConfig) );
        }
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
        var gamePanelLeftNode = gamePanelNode.getChildByName("game_bg");
        // var gamePanelRightNode = gamePanelNode.getChildByName("Panel_right");
        var advBgNode  = gamePanelNode.getChildByName("adv_bg");

        setWgtLayout(gamePanelNode, [0.9, 0.9], [0.5, 0.5], [0, 0]);
        if(isIPhoneX())
        {
            gamePanelLeftNode.setPositionX(gamePanelLeftNode.getPositionX() - 180);
            // gamePanelRightNode.setPositionX(gamePanelRightNode.getPositionX() + 160);
        }
        else {
            gamePanelLeftNode.setPositionX(gamePanelLeftNode.getPositionX() - 60);
            // gamePanelRightNode.setPositionX(gamePanelRightNode.getPositionX() + 80);
        }

        //创建房间， 《与加入房间位置互换了》
        this._joinRoom = gamePanelLeftNode.getChildByName("joinRoom");
        var sazi = this._joinRoom.getChildByName("Image_14");
        sazi.runAction(cc.sequence(cc.moveBy(2,cc.p(0,-5)).easing(cc.easeQuadraticActionInOut()), cc.moveBy(1,cc.p(0,5)).easing(cc.easeQuadraticActionInOut())).repeatForever());


        this._joinRoom.setPressedActionEnabled(true);
        // 设置点击放大效果
        //this.setToucheffect(this._joinRoom, joinRoomMask);
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
        /*创建房间特效*/
        // var img1 = joinRoomMask.getChildByName("img1");
        // var up01 = cc.moveBy(1,cc.p(0,3)).easing(cc.easeQuadraticActionInOut());
        // var up02 = cc.moveBy(1,cc.p(0,-3)).easing(cc.easeQuadraticActionInOut());
        // img1.runAction(cc.sequence(up01,up02).repeatForever());
        //
        // var img2 = joinRoomMask.getChildByName("img2");
        // var up11 = cc.moveBy(1.1,cc.p(0,5)).easing(cc.easeQuadraticActionInOut());
        // var up12 = cc.moveBy(1.1,cc.p(0,-5)).easing(cc.easeQuadraticActionInOut());
        // img2.runAction(cc.sequence(up11,up12).repeatForever());
        //
        // var img3 = joinRoomMask.getChildByName("img3");
        // var up21 = cc.moveBy(1.2,cc.p(0,6)).easing(cc.easeQuadraticActionInOut());
        // var up22 = cc.moveBy(1.2,cc.p(0,-6)).easing(cc.easeQuadraticActionInOut());
        // img3.runAction(cc.sequence(up21,up22).repeatForever());


        
        //加入房间， 《与创建房间位置互换了》
        this._createRoom = gamePanelLeftNode.getChildByName("createRoom");
        this._createRoom.setPressedActionEnabled(true);
        var Image_ka = this._createRoom.getChildByName("Image_ka");
        Image_ka.runAction(cc.sequence(cc.moveBy(2,cc.p(0,-6)).easing(cc.easeQuadraticActionInOut()), cc.moveBy(1.2,cc.p(0,6)).easing(cc.easeQuadraticActionInOut())).repeatForever());

        var Image_star = this._createRoom.getChildByName("Image_star");
        Image_star.runAction(cc.sequence(cc.moveBy(1.5,cc.p(0,4)).easing(cc.easeQuadraticActionInOut()), cc.moveBy(1,cc.p(0,-4)).easing(cc.easeQuadraticActionInOut())).repeatForever());


        // var starParticle1 =  new cc.ParticleSystem("game_picture/diamondStar.plist");
        // starParticle1.setPosition(this._createRoom.getContentSize().width/2, this._createRoom.getContentSize().height/2 - 30);
        // this._createRoom.addChild(starParticle1);

        // 设置点击放大效果
        //this.setToucheffect(this._createRoom, createRoomMask);
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
        /* 加入房间特效*/
        // var _creatName = createRoomMask.getChildByName("Image_22");
        // _creatName.setLocalZOrder(20);
        //
        // var card0 = createRoomMask.getChildByName("Image_card0");
        // var card1 = createRoomMask.getChildByName("Image_card1");
        // var upA0 = cc.moveBy(1,cc.p(0,5)).easing(cc.easeQuadraticActionInOut());
        // var upA1 = cc.moveBy(1,cc.p(0,-5)).easing(cc.easeQuadraticActionInOut());
        // card0.runAction(cc.sequence(upA0,upA1).repeatForever());
        //
        // var upA2 = cc.moveBy(1.1,cc.p(0,6)).easing(cc.easeQuadraticActionInOut());
        // var upA3 = cc.moveBy(1.1,cc.p(0,-6)).easing(cc.easeQuadraticActionInOut());
        // card1.runAction(cc.sequence(upA2,upA3).repeatForever());

        /* end of 创建房间特效*/


        //金币场
        var goldBtn = gamePanelLeftNode.getChildByName("goldBtn");
        goldBtn.setPressedActionEnabled(true);
        var panelMask = goldBtn.getChildByName("Panel_mask");
        var Image_gold = panelMask.getChildByName("Image_gold");
        Image_gold.runAction(cc.sequence(cc.moveBy(1.8,cc.p(0,-6)).easing(cc.easeQuadraticActionInOut()), cc.moveBy(2,cc.p(0,6)).easing(cc.easeQuadraticActionInOut())).repeatForever());

        var Image_cup = panelMask.getChildByName("Image_cup");
        Image_cup.runAction(cc.sequence(cc.moveBy(1,cc.p(0,4)).easing(cc.easeQuadraticActionInOut()), cc.moveBy(2,cc.p(0,-4)).easing(cc.easeQuadraticActionInOut())).repeatForever());

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
            panelMask.setVisible(false);
            hongbaoEffect.setVisible(true);
        }else {
            panelMask.setVisible(true);
            hongbaoEffect.setVisible(false);
        }

        // 粒子效果
        var _goldBtnPar =  new cc.ParticleSystem("Particle/joinRoomPar.plist");
        _goldBtnPar.setPosition(goldBtn.getContentSize().width/3, goldBtn.getContentSize().height/6);
        _goldBtnPar.setScale(1);
        //_goldBtnPar.setTotalParticles(5);
        panelMask.addChild(_goldBtnPar, 0);

        //goldBtn.setName("soundSelf");

        // 设置点击放大效果
        //this.setToucheffect(goldBtn, goldBtnMask);
        goldField_updateListener(goldBtn);
        goldBtn.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinbichang", {uid:SelfUid()});
                    goldField_start();
                    break;
                default:
                    break;
            }
        }, this);
        // /* 金币场的特效*/
        // var _matchNameIcon = goldBtnMask.getChildByName("Image_23");
        // _matchNameIcon.setLocalZOrder(10);
        // var _light = goldBtnMask.getChildByName("light");
        // _light.runAction(cc.rotateBy(10,360).repeatForever());
        //
        // //扫光
        // var clipper = new cc.ClippingNode();
        // var sten = cc.Sprite.create("game_picture/gold/gold.png");
        // var sten1 = cc.Sprite.create("game_picture/gold/gold.png");
        // var stenSize = sten.getContentSize();
        // sten.setPosition(80, 90);
        // sten1.setPosition(sten.getPosition());
        // clipper.setContentSize(stenSize);
        // clipper.setStencil(sten);
        // clipper.addChild(sten1);
        // clipper.setAlphaThreshold(0.5);
        // clipper.runAction(cc.sequence(
        //     cc.moveBy(1.2, 0, 10).easing(cc.easeSineInOut()),
        //     cc.moveBy(1.2, 0, -10).easing(cc.easeSineInOut())
        // ).repeatForever());
        // clipper.setPosition(goldBtnMask.getContentSize().height*0.48, 20);
        // goldBtnMask.addChild(clipper,5);

        //四个角的元宝
        // var gold1 = goldBtnMask.getChildByName("gold_1");
        // var gold2 = goldBtnMask.getChildByName("gold_2");
        // gold1.zIndex = 6;
        // gold2.zIndex = 4;
        // function getMoveAction1(beganPos,endPos)
        // {
        //     var a0 = cc.moveBy(1.5,beganPos).easing(cc.easeQuadraticActionInOut());
        //     var a1 = cc.moveBy(1.5,endPos).easing(cc.easeQuadraticActionInOut());
        //     var seq = cc.sequence(a0,a1).repeatForever();
        //     return seq;
        // }
        // gold1.runAction(getMoveAction1(cc.p(-10,-10),cc.p(10,10)));
        // gold2.runAction(getMoveAction1(cc.p(-8,8),cc.p(8,-8)));
        //
        // var sprite1 = new cc.Sprite("game_picture/match/liuguang_01.png");
        // sprite1.setBlendFunc(cc.ONE,cc.ONE);
        // sprite1.setOpacity(255*0.9);
        // clipper.addChild(sprite1, 1);
        // var repeatAction = cc.repeatForever(cc.sequence(
        //     cc.moveTo(0.0, cc.p(-sten.width / 2, sten.height / 2)),
        //     cc.moveTo(1.8, cc.p(sten.width + sten.width, sten.height / 2)),
        //     cc.delayTime(1.5)));
        // sprite1.runAction(repeatAction); //进行向右移动的重复动作
        //
        // var sprite3 = new cc.Sprite("game_picture/match/liuguang_02.png");
        // sprite3.setBlendFunc(cc.ONE,cc.ONE);
        // sprite3.setOpacity(255*0.9);
        // clipper.addChild(sprite3, 1);
        // var repeatAction3 = cc.repeatForever(cc.sequence(
        //     cc.moveTo(0.0, cc.p(sten.width + sten.width / 2, sten.height)),
        //     cc.moveTo(1.8, cc.p(-sten.width, 0)),
        //     cc.delayTime(1.5)));
        // sprite3.runAction(repeatAction3); //进行向右移动的重复动作
        //
        // var sprite_star2 = cc.Sprite.create("game_picture/match/yaoguang.png");
        // sprite_star2.setScale(0);
        // sprite_star2.setPosition(52,165);
        // sprite_star2.runAction(cc.sequence(
        //     cc.spawn(cc.scaleTo(0.5,1), cc.rotateBy(0.5,180)),
        //     cc.spawn(cc.scaleTo(0.5,0), cc.rotateBy(0.5,180)),
        //     cc.delayTime(2)
        // ).repeatForever());
        // clipper.addChild(sprite_star2, 6);

        
        /* end of 金币场的特效*/
        // var Image_qianghongbao_gold = goldBtnMask.getChildByName("Image_qianghongbao_gold");
        // Image_qianghongbao_gold.visible = isGoldActivityOpen();
        //
        // var lizitexiao =  new cc.ParticleSystem("Particle/hongbao.plist");
        // lizitexiao.setPosition(Image_qianghongbao_gold.width/2, Image_qianghongbao_gold.height/2);
        // lizitexiao.setScale(1);
        // lizitexiao.setBlendFunc(cc.SRC_ALPHA,cc.ONE_MINUS_SRC_ALPHA)
        // Image_qianghongbao_gold.addChild(lizitexiao,-1);


        // 俱乐部
        var clubEnter = gamePanelLeftNode.getChildByName("clubEnter");
        var card1 = clubEnter.getChildByName("card1");
        card1.runAction(cc.sequence(cc.moveBy(2,cc.p(0,-10)).easing(cc.easeQuadraticActionInOut()), cc.moveBy(1.5,cc.p(0,10)).easing(cc.easeQuadraticActionInOut())).repeatForever());

        var card0 = clubEnter.getChildByName("card0");
        card0.runAction(cc.sequence(cc.moveBy(1,cc.p(0,4)).easing(cc.easeQuadraticActionInOut()), cc.moveBy(2,cc.p(0,-4)).easing(cc.easeQuadraticActionInOut())).repeatForever());

        //
        // // 粒子效果
        var clubEnterPar =  new cc.ParticleSystem("Particle/ceate.plist");
        clubEnterPar.setPosition(clubEnter.getContentSize().width/2, clubEnter.getContentSize().height*0.7);
        clubEnterPar.setScale(0.9);
        clubEnter.addChild(clubEnterPar,0);

        // 设置点击放大效果
        //this.setToucheffect(clubEnter, clubEnterMask);
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

        //this._gameListPanelNode.visible = false;
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

        // var gameClassList = JSON.parse(MjClient.systemConfig.gameClass);
        // if (gameClassList.length > 1) {
        //     this._tileIcon.loadTexture(GameClassTitleIcon[MjClient.gameClass]);
        // }
        // else {
        //     this._tileIcon.loadTexture("game_picture/logo_home.png");
        // }
        // if (MjClient.systemConfig.rankEnable == "true")
        //     this.gameRankLayer();
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

    }

    /****************
        end of 排行榜
    *****************/

});

