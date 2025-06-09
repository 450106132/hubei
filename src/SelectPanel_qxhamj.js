// ------牌友联盟淮安麻将 home--------

var HomeView_qxhamj = cc.Layer.extend({
    _gamePanelLeftNode: null,
    _advPanelRightNode: null,
    _joinRoom: null,
    _createRoom: null,
    _BtnRuturn: null,
    _guangbo: null,
    _myFuHaoData: null,
    _myQueShenData: null,
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

        // 小姐姐
        var _girlPanel = _back.getChildByName("Panel_girl");
        this._girlPanel = _girlPanel;
        this._girlPanel.setVisible(false);
        // var _girlBone = createSpine("spine/home/girl/renwunv.json", "spine/home/girl/renwunv.atlas");
        // _girlBone.setAnimation(0, 'animation', true);
        // setWgtLayout(_girlPanel, [0.4, 0.4], [0.54, -0.10], [0, 0], false, true);
        // _girlPanel.addChild(_girlBone, 1);

        /*
        // //骨骼动画背景
        var _bgBone = createSpine("spine/home/zhuzilllll/zhuzia.json", "spine/home/zhuzilllll/zhuzia.atlas");
        _bgBone.setAnimation(5, 'animation', true);
        _bgBone.setPosition(0,0);

        //girlAni.setScale(0.5);
        _back.addChild(_bgBone,0);


        var _bgBone = createSpine("spine/home/zhuzirrrrr/zhuzib.json", "spine/home/zhuzirrrrr/zhuzib.atlas");
        _bgBone.setAnimation(0, 'animation', true);
        _bgBone.setPosition(0,0);
        //girlAni.setScale(0.5);
        _back.addChild(_bgBone,0);
        */

        // 飘雪动画
        // var starParticle_snow =  new cc.ParticleSystem("spine/home/snow/particle_texture.plist");
        // starParticle_snow.setPosition(_back.getContentSize().width/2, _back.getContentSize().height);
        // starParticle_snow.setScale(1);
        // starParticle_snow.setTotalParticles(10);
        // _back.addChild(starParticle_snow);

        // ccs.armatureDataManager.addArmatureFileInfo("spine/home/beijing/100.ExportJson");
        // var pAr = new ccs.Armature("100");
        // pAr.getAnimation().play("Animation1");
        // pAr.setPosition(500,500);
        // _back.addChild(pAr,1000);

        //for iphone x
        var _bottomImage = _back.getChildByName("Image_16");
        setWgtLayout(_bottomImage, [1, 1], [0.5, 0], [0, 0], false,true);


        //底部按钮的地板
        this._Panel_bottom = _back.getChildByName("Panel_bottom");
        this._Panel_bottom.zIndex = 200 ;
        this._Panel_bottom.visible = true;
        setWgtLayout(this._Panel_bottom, [1, 1], [0.5, 0], [0, 0], false,true);


        var _tilebg = homeui.node.getChildByName("tilebg");
        _tilebg.visible = true;
        this._titlePanel = _tilebg;
        setWgtLayout(_tilebg, [1, 1], [0.5, 1], [0, 0]);

        //头像
        var _headbg = homeui.node.getChildByName("headbg");
        this._headPanel = _headbg;
        setWgtLayout(_headbg, [0.135, 0.135], [0.02, 0.86], [0, 0]);

        //活动伸缩按钮
        var _btnActive = this._Panel_bottom.getChildByName("Btn_Active");
        //_Image_light.visible = true;

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
        var _setting = _tilebg.getChildByName("setting");
        //setWgtLayout(_setting, [0.08, 0.12], [1, 1.02], [-0.6, -0.8]);
        _setting.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var settringLayer = new HomeSettingView();
                    settringLayer.setName("HomeClick");
                    MjClient.Scene.addChild(settringLayer);
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);

        //咨询
        var btnZiXun = this._Panel_bottom.getChildByName("btnZiXun");
        if(btnZiXun) {
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
        }

        //右上角的帮助按钮,
        var _BtnHTP = _tilebg.getChildByName("BtnHTP");
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
        this._youjian = _tilebg.getChildByName("youjian");
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
        var _BtnKeFu = this._Panel_bottom.getChildByName("BtnKeFu");
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
        var _btnAdv = _tilebg.getChildByName("btnAdv");
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
        if (MjClient.remoteCfg.guestLogin == true) {
            _btnAdv.visible = false;
            _btnAdv.setTouchEnabled(false);
        }
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
                    if (MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.myMemberId && parseInt(MjClient.data.pinfo.myMemberId) > 0) {
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


        //广播
        this._guangbo = homeui.node.getChildByName("guangbo");
        setWgtLayout(this._guangbo, [0.5, 0.5], [0.45, 0.86], [0, 0]);
        if(isIPhoneX()) setWgtLayout(this._guangbo, [0.4, 0.4], [0.41, 0.8365], [0, 0]);

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
        var _btnShareGet = this._Panel_bottom.getChildByName("fenxiang");
        //_btnShareGet.visible = false;

        //推荐有礼
        var _btntuijian = this._Panel_bottom.getChildByName("tuijian");

        /*
        // 返回
        this._BtnRuturn = _back.getChildByName("BtnRuturn");
        this._BtnRuturn.visible = false;
        //返回主界面
        this._BtnRuturn.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (cc.isUndefined(MjClient.exitLayer) || MjClient.exitLayer == null) {
                        MjClient.Scene.addChild(new ExitLayer());
                        if (MjClient.webViewLayer != null) {
                            MjClient.webViewLayer.close();
                        }
                    }
                    break;
                default:
                    break;
            }
        }, this);
        */

        //shagn商城
        var _BtnShop  = this._Panel_bottom.getChildByName("Button_store");
        // //骨骼 亲友圈
        // var _shopBone = createSpine("spine/home/shop/shangcheng.json", "spine/home/shop/shangcheng.atlas");
        // _shopBone.setAnimation(0, 'animation', true);
        // _shopBone.setPosition(0,0);
        // //girlAni.setScale(0.5);
        // _BtnShop.addChild(_shopBone,100);

        //战绩
        var _zhanji = this._Panel_bottom.getChildByName("zhanji");
        _zhanji.visible = true;
        _zhanji.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    //MjClient.showMsg("暂未开放!");
                    if (!MjClient.data.sData) {
                        MjClient.Scene.addChild(new PlayLogView());
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji", {uid:SelfUid()});
                    }else
                        MjClient.showMsg("正在游戏中，不能查看战绩");
                    break;
                default:
                    break;
            }
        }, this);


        //炮神榜
        //var _btnPao   = homeui.node.getChildByName("btnPao");


        //要新
        var _btnYaoXin = homeui.node.getChildByName("btnYaoXin");

        //红包背景
        var _btnHongBao_bg = homeui.node.getChildByName("btnHongBao_bg");

        //红包
        var _btnHongBao = homeui.node.getChildByName("btnHongBao");

        //公告按钮
        var btn_gonggao = this._Panel_bottom.getChildByName("btn_gonggao");
        if (btn_gonggao) {

            //btn_gonggao.setAnchorPoint(1,0.5);
            if (MjClient.remoteCfg.guestLogin == true) {
                btn_gonggao.setVisible(false);
            }
            btn_gonggao.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Gonggao", {uid:SelfUid()});
                    MjClient.Scene.addChild(new gongGaoLayer());
                }
            },this)
        }
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

        var btnRenzheng = _tilebg.getChildByName("btnRenzheng");
        if (!btnRenzheng) {
            btnRenzheng =  new ccui.Button("game_picture/activeBtn/renzheng.png", "game_picture/activeBtn/renzheng_s.png","game_picture/activeBtn/renzheng_s.png");
            btnRenzheng.setName("btnRenzheng");
            btnRenzheng.addTouchEventListener(function (sender, type) {
                if (type === ccui.Widget.TOUCH_ENDED) {
                    MjClient.Scene.addChild(new shiMingRenZhengLayer());
                }
            },this)
            _tilebg.addChild(btnRenzheng);
        }
        btnRenzheng.visible = !MjClient.data.pinfo.identityNum;
        btnRenzheng.setPosition(cc.p(789.65,65));


        //亲友圈邀请审核
        var btnFriendcardInvite = _tilebg.getChildByName("btnFriendcardInvite");
        if (!btnFriendcardInvite) {
            btnFriendcardInvite =  new ccui.Button("game_picture/activeBtn/shenhe.png");
            btnFriendcardInvite.setName("btnFriendcardInvite");
            btnFriendcardInvite.addTouchEventListener(function (sender, type) {
                if (type === ccui.Widget.TOUCH_ENDED) {
                    MjClient.Scene.addChild(new Friendcard_Invite_Shenhe());
                }
            },this)
            _tilebg.addChild(btnFriendcardInvite);
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
        btnFriendcardInvite.setPosition(cc.p(66.6,-65))

        //setWgtLayout(this._youjian, [0.06, 0.13], [1, 1.03], [-5.5, -0.8]);
        //setWgtLayout(_zhanji, [0.06, 0.13], [1, 1.03], [-4.2, -0.8]);
        //setWgtLayout(_BtnHTP, [0.06, 0.13], [1, 1.03], [-2.88, -0.8]);
        //setWgtLayout(_setting, [0.06, 0.13], [1, 1.03], [-1.5, -0.8]);

        setWgtLayout(_btnRank, [0.1, 0.14], [1, 1.02], [-1.1, -3.5]);
        setWgtLayout(_gonggao, [0.24, 0.53], [0.0, 0.42], [0.1, 0.0]);


        //樱花
        var starParticle1 =  new cc.ParticleSystem("Particle/particle_texture.plist");
        starParticle1.setPosition(_back.getContentSize().width/2, _back.getContentSize().height+20);
        starParticle1.setScale(2);
        starParticle1.setTotalParticles(8);
        _back.addChild(starParticle1);

        var _scroll = this._guangbo.getChildByName("scroll");
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
        if (MjClient.remoteCfg.guestLogin == true ||
            MjClient.systemConfig.clubEnable != "true") {
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

        var _shareTip = _btnShareGet.getChildByName("fenxiang_tip");
        _shareTip.setVisible(false);
        var _shareTipText = null;
        if (_shareTip) {
            _shareTipText = _shareTip.getChildByName("Text_4");
            _shareTipText.ignoreContentAdaptWithSize(true);
            _shareTipText.setString("100%送2元宝")
        }

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

        //var bg_share = _btnShareGet.getChildByName("bg_img");
        //bg_share.runAction(cc.sequence(cc.scaleTo(1,0.8),cc.scaleTo(1,1.1)).repeatForever());
        _btnShareGet.schedule(function () {
            var lastStr = MjClient.data.pinfo.lastShareDay;
            var currentStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
            var _sprite = _btnShareGet.getChildByName("hongDian");


            if (currentStr == lastStr) {
                _sprite.visible = false;
                // bg_share.stopAllActions();
                // bg_share.setScale(1);
            }else{
                _sprite.visible = true;
            }

            if (_sprite && _shareTip)
                _shareTip.visible = _sprite.visible;
        }, 1);

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

        if (MjClient.remoteCfg.guestLogin == true) {
            _btntuijian.visible = false;
            _btntuijian.setTouchEnabled(false);
        }

        _btntuijian.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite", {uid:SelfUid()});
                    var layer = null;
                    layer = new recommendLayer_active();
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
                var mask = new cc.Sprite("game_picture/head/avatar_mask.png");
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

        this._moneyShow = _money;

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
        _liquanBack.visible = MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JI_FEN_SHANG_CHENG)
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

        UIEventBind(this.jsBind, _money, "loginOK", function () {//这里监听这个事件没用，数据还没刷新呢，刷新数据在scene的绑定事件里
            changeAtalsForLabel(_money, MjClient.data.pinfo.money);
        });
        /*
         商店
         */
        if (MjClient.remoteCfg.hideMoney == true||MjClient.isShenhe==true) {
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

        //设置游戏Panel和广告Panel
        this._gamePanelLeftNode = _back.getChildByName("Panel_left");
        this._advPanelRightNode = _back.getChildByName("Panel_right");
        this.setPanel(this._gamePanelLeftNode, this._advPanelRightNode);

        COMMON_UI.addHintText(homeui.node);

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


        this._Panel_bottom.setOpacity(0);
        this._titlePanel.setOpacity(0);
        this._headPanel.setOpacity(0);
        this._guangbo.setOpacity(0);
        var p0 = this._gamePanelLeftNode._movePoint;
        var p1 = this._advPanelRightNode._movePoint;
        var p2 = this._Panel_bottom._movePoint;
        var p3 = this._girlPanel._movePoint;
        var p4 = this._titlePanel._movePoint;
        var p5 = this._headPanel._movePoint;
        var p6 = this._guangbo._movePoint;
        this._gamePanelLeftNode.runAction(cc.moveTo(0.6, p0).easing(cc.easeBackOut()));
        this._advPanelRightNode.runAction(cc.moveTo(0.6, p1).easing(cc.easeBackOut()));
        this._girlPanel.runAction(cc.moveTo(0.6, p3).easing(cc.easeBackOut()));
        this._Panel_bottom.runAction(cc.spawn(cc.moveTo(1, p2).easing(cc.easeSineOut()), cc.fadeIn(1.3)));
        this._titlePanel.runAction(cc.spawn(cc.moveTo(1, p4).easing(cc.easeSineOut()), cc.fadeIn(1.3)));
        this._headPanel.runAction(cc.spawn(cc.moveTo(1, p5).easing(cc.easeSineOut()), cc.fadeIn(1.3)));
        this._guangbo.runAction(cc.spawn(cc.moveTo(1, p6).easing(cc.easeSineOut()), cc.fadeIn(1.3)));
    },
    onExit: function () {
        this._super();
        cc.eventManager.removeListeners(cc.EventListener.KEYBOARD);
    },
    saveActionPosition: function(){

        this._gamePanelLeftNode._movePoint = this._gamePanelLeftNode.getPosition();
        this._gamePanelLeftNode.setPositionX(-this._gamePanelLeftNode.width);

        this._advPanelRightNode._movePoint = this._advPanelRightNode.getPosition();
        this._advPanelRightNode.setPositionX(MjClient.size.width + this._advPanelRightNode.width);

        this._Panel_bottom._movePoint = this._Panel_bottom.getPosition();
        var oldBottomPanelh = this._Panel_bottom.height;
        this._Panel_bottom.setPositionY(-oldBottomPanelh);

        this._girlPanel._movePoint = this._girlPanel.getPosition();
        this._girlPanel.setPositionX(-1280);

        this._titlePanel._movePoint = this._titlePanel.getPosition();
        var oldTitlePanelh = this._titlePanel.height;
        this._titlePanel.setPositionY(oldTitlePanelh + MjClient.size.height);

        this._headPanel._movePoint = this._headPanel.getPosition();
        var oldHeadPanelh = this._headPanel.height;
        this._headPanel.setPositionY(oldHeadPanelh + MjClient.size.height);

        this._guangbo._movePoint = this._guangbo.getPosition();
        var oldGuangBoh = this._guangbo.height;
        this._headPanel.setPositionY(oldGuangBoh + MjClient.size.height);
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
    setPanel: function (leftPanel, rightPanel) {
        var headPanel = this._headPanel;
        var girlPanel = this._girlPanel;
        var gamePanel = leftPanel || this._gamePanelLeftNode;
        var advePanel = rightPanel || this._advPanelRightNode;
        var gamePanelPosX = isIPhoneX() ? 0.05 : 0;
        var advePanelPosX = isIPhoneX() ? 0.95 : 1;
        setWgtLayout(gamePanel, [0.7, 0.7], [gamePanelPosX, 0.5], [0, 0], false, true);
        setWgtLayout(advePanel, [0.7, 0.7], [advePanelPosX, 0.5], [0, 0], false, true);

        if(isIPad()){
            setWgtLayout(gamePanel, [0.5, 0.5], [-0.02, 0.5], [0, 0], false, true);
            setWgtLayout(advePanel, [0.68, 0.68], [1.03, 0.5], [0, 0], false, true);
            setWgtLayout(girlPanel, [0.25, 0.25], [0.67, 0.07], [0, 0], false, false);
            setWgtLayout(headPanel, [0.1, 0.1], [0.01, 0.90], [0, 0], false, false);
        }

        this.saveActionPosition();

        this._createRoom = gamePanel.getChildByName("createRoom");
        this._createRoom.setZoomScale(0.05);

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



        this._joinRoom = gamePanel.getChildByName("joinRoom");
        this._joinRoom.setZoomScale(0.05);
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


        // 金币场相关
        this._playGroundRoom = gamePanel.getChildByName("playGroundRoom");
        this._playGroundRoom.setVisible(MjClient.systemConfig.matchRoomEnable === "true");
        this._playGroundRoom.setZoomScale(0.05);

        var actMajiang = this._playGroundRoom.getChildByName("majiang");
        actMajiang.runAction(cc.sequence(
            cc.delayTime(0.01),
            cc.moveBy(0.8, cc.p(0, 10)).easing(cc.easeSineInOut()),
            cc.moveBy(1.0, cc.p(0, -10)).easing(cc.easeSineInOut())
        ).repeatForever());

        var actFan = this._playGroundRoom.getChildByName("fan");
        actFan.runAction(cc.sequence(
            cc.delayTime(0.09),
            cc.moveBy(1.0, cc.p(0, 6)).easing(cc.easeSineInOut()),
            cc.moveBy(1.0, cc.p(0, -6)).easing(cc.easeSineInOut())
        ).repeatForever());

        var hongbaoEffect = this._playGroundRoom.getChildByName("Node_hongbaoEffect");
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
            actMajiang.setVisible(false);
            actFan.setVisible(false);
            hongbaoEffect.setVisible(true);
        }else {
            actMajiang.setVisible(true);
            actFan.setVisible(true);
            hongbaoEffect.setVisible(false);
        }

        goldField_updateListener(this._playGroundRoom);

        var jiaoBiao = new cc.Sprite("game_picture/mainMenu/jiaobiao2.png");
        jiaoBiao.setPosition(jiaoBiao.width*0.52, this._playGroundRoom.height - jiaoBiao.height*0.4);
        this._playGroundRoom.addChild(jiaoBiao);

        this._playGroundRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinbichang", {uid:SelfUid()});
                    goldField_start();
                    break;
                default:
                    break;
            }
        }, this);

        // 亲友圈相关
        this._clubRoom = gamePanel.getChildByName("clubRoom");
        this._clubRoom.setZoomScale(0.05);
        this._clubRoom.setVisible(MjClient.systemConfig.clubEnable === "true");

        var clubActMajiang = this._clubRoom.getChildByName("majiang");
        clubActMajiang.runAction(cc.sequence(
            cc.moveBy(1.5, 0, 5).easing(cc.easeSineInOut()),
            cc.moveBy(1.5, 0, -5).easing(cc.easeSineInOut())
        ).repeatForever());


        this._clubRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new FriendCard_main(null, 1));
                	MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Qinyouquan", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);

        //添加第三方应用
        COMMON_UI.addHomeAdvMode(advePanel);
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
        this._gameListPanelNode.visible = false;
        MjClient.gameClass = type;
        cc.log("=================type =  " + type);
        // this._joinRoom.loadTextureNormal(JoinRoomBtn[MjClient.gameClass]);
        // this._createRoom.loadTextureNormal(CreateRoomBtn[MjClient.gameClass]);

        // this._joinRoom.loadTextureNormal("game_picture/jion.png");
        // this._createRoom.loadTextureNormal("game_picture/chuangjian.png");
        this._joinRoom.ignoreContentAdaptWithSize(true);
        this._createRoom.ignoreContentAdaptWithSize(true);

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



var newPlayerLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        var UI = ccs.load("newPlayer.json");
        this.addChild(UI.node);
        this._closeCallback = null;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0], true);

        if (MjClient.homeui) {
            MjClient.homeui._moneyShow.setString("0");
        }
        var close = _back.getChildByName("btn_ok");
        close.addTouchEventListener(function(sender,type){
            if (type ==2 ) {
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
                // updateInfo
                postEvent("updateInfo");
                this.removeFromParent();
            }
            
        },this)
        cc.log(" ============== newPlayer 00000000 =====");
        cc.spriteFrameCache.addSpriteFrames("playing/other/newPlayer.plist","playing/other/newPlayer.png");
        var _frames = [];
        var prefix = "new_";
        var fc = cc.spriteFrameCache;
        for (var i = 1; i <= 4; i++) {
            var name = prefix + i + ".png";
            var f = fc.getSpriteFrame(name);
            if(f)
            {
                _frames.push(f);
            }
        }

        var _sprite = cc.Sprite();
        var _animate = cc.animate(new cc.Animation(_frames, 0.2, 1));
        _sprite.runAction(_animate);
        _sprite.initWithSpriteFrame(_frames[0]);
        var _node = _back.getChildByName("node_1");
        _node.addChild(_sprite,9999);

        return true;
    },
    setCloseCallback:function(callback)
    {
        this._closeCallback = callback;
    },

    
});




