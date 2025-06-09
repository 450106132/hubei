// ------牌友联盟江苏麻将 home--------

var HomeView_qxjsmj = cc.Layer.extend({
    _gamePanelLeftNode: null,
    _advPanelRightNode: null,
    _joinRoom: null,
    _createRoom: null,
    _clubRoom: null,
    _playGroundRoom: null,
    _guangbo: null,
    _myFuHaoData: null,
    _myQueShenData: null,
    ctor: function () {
        this._super();

        var homeui = ccs.load(res.Home_json);
        this.uiNode = homeui.node;
        //BindUiAndLogic(homeui.node,this.jsBind);
        this.addChild(homeui.node);
        MjClient.homeui = this;
        playMusic("bgMain");
        setMusicVolume(-1);

        UIEventBind(null, homeui.node, "logout", function () {
            if (MjClient.homeui) {
                MjClient.homeui.removeFromParent(true);
                delete MjClient.homeui;
            }
        });

        var _back = homeui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0], true);

        //小姐姐
        var _girlPanel = _back.getChildByName("Panel_girl");
        this._girlPanel = _girlPanel;
        this._girlPanel.setVisible(false);
        // var _girlSprite = _girlPanel.getChildByName("girl");
        // if(_girlSprite) _girlSprite.visible = false;
        // var _girlBone = createSpine("spine/home/girl/renwunv.json", "spine/home/girl/renwunv.atlas");
        // _girlBone.setAnimation(0, 'animation', true);
        // setWgtLayout(_girlPanel, [0.4, 0.4], [0.54, -0.10], [0, 0], false, true);
        // _girlPanel.addChild(_girlBone, 1);

        // ccs.armatureDataManager.addArmatureFileInfo("spine/home/beijing/100.ExportJson");
        // var pAr = new ccs.Armature("100");
        // pAr.getAnimation().play("Animation1");
        // pAr.setPosition(500,500);
        // _back.addChild(pAr,1000);

        //底部按钮的地板
        this._Panel_bottom = _back.getChildByName("Panel_bottom");
        this._Panel_bottom.zIndex = 200;
        this._Panel_bottom.visible = true;
        setWgtLayout(this._Panel_bottom, [1, 1], [0.5, 0], [0, 0], false,true);

        var _tilebg = homeui.node.getChildByName("tilebg");
        _tilebg.visible = true;
        this._titlePanel = _tilebg;
        setWgtLayout(_tilebg, [1, 1], [0.5, 1], [0, 0]);

        // function runLightEffectAction(lightNode) {
        //     var _Image_light_scale = lightNode.getScale();
        //     var a = cc.scaleTo(1, _Image_light_scale * 0.6);
        //     var a1 = cc.scaleTo(0.8, _Image_light_scale * 0.3);
        //     lightNode.runAction(cc.sequence(a, a1).repeatForever());
        // }

        //var _Image_light = homeui.node.getChildByName("Image_light");

        //活动伸缩按钮
        var _btnActive = this._Panel_bottom.getChildByName("Btn_Active");
        //_Image_light.visible = true;

        function _btnActiveTouchEvent(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    updateUserBehavior("活动");
                    if (MjClient.systemConfig && MjClient.systemConfig.activity)
                    {
                        var layer = new activityLayer();
                        MjClient.Scene.addChild(layer);
                        MjClient.native.umengEvent4CountWithProperty("HuodongClick", {uid:SelfUid()});
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
                    MjClient.native.umengEvent4CountWithProperty("ShezhiClick", {uid:SelfUid()});
                    updateUserBehavior("设置");
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

        // 活动按钮
        showHomeActivityIcon(homeui);

        //右上角的帮助按钮,
        var _BtnHTP = _tilebg.getChildByName("BtnHTP");
        _BtnHTP.visible = true;
        _BtnHTP.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.openWeb({ url: null, help: true });
                    MjClient.native.umengEvent4CountWithProperty("WanfaClick", {uid:SelfUid()});
                    updateUserBehavior("玩法");
                    break;
                default:
                    break;
            }
        }, this);

        //战绩
        var _zhanji = this._Panel_bottom.getChildByName("zhanji");
        _zhanji.visible = true;
        _zhanji.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    //MjClient.showMsg("暂未开放!");
                    if (!MjClient.data.sData) {
                        MjClient.Scene.addChild(new PlayLogView());
                        MjClient.native.umengEvent4CountWithProperty("ZhanjiClick", {uid: SelfUid()});
                        updateUserBehavior("战绩");
                    }else
                        MjClient.showMsg("正在游戏中，不能查看战绩");
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
                    MjClient.native.umengEvent4CountWithProperty("YoujianClick", {uid:SelfUid()});
                    updateUserBehavior("邮件");
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
                    updateUserBehavior("客服");
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
        Text_qipao.setString("双11庆典！场次冲一冲，购物车清空！");
        daili_qipao.setVisible(false);
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
                    updateUserBehavior("代理");
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

        //推荐有礼
        var _btntuijian = this._Panel_bottom.getChildByName("tuijian");

        //头像
        var _headbg = homeui.node.getChildByName("headbg");
        this._headPanel = _headbg;

        //shagn商城
        var _BtnShop  = this._Panel_bottom.getChildByName("Button_store");

        //要新
        var _btnDaiLi = homeui.node.getChildByName("btnDaiLi");

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


        cc.spriteFrameCache.addSpriteFrames("home/pao.plist", "home/pao.png");


        // setWgtLayout(_zhanji, [0.12, 0.12], [0.75, 0.93], [0, 0]);
        // setWgtLayout(this._youjian,[0.12, 0.12], [0.82, 0.93], [0, 0]);
        // setWgtLayout(_BtnHTP, [0.12, 0.12], [0.89, 0.93], [0,0]);
        // setWgtLayout(_setting, [0.12, 0.12], [0.96, 0.93], [0, 0]);
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
        btnRenzheng.setPosition(cc.p(855,65))


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


        if(MjClient.remoteCfg.guestLogin == true){
            setWgtLayout(this._youjian, [0.06, 0.13], [0.06, 0.74], [0, 0]);
            setWgtLayout(_zhanji, [0.06, 0.13], [0.06, 0.56], [0, 0]);
            setWgtLayout(_BtnHTP, [0.06, 0.13], [0.06, 0.38], [0, 0]);
            setWgtLayout(_setting, [0.06, 0.13], [0.06, 0.2], [0, 0]);
        }

        setWgtLayout(this._guangbo, [0.5, 0.5], [0.45, 0.86], [0, 0]);
        if(isIPhoneX()) setWgtLayout(this._guangbo, [0.4, 0.4], [0.41, 0.8365], [0, 0]);
        setWgtLayout(_btnRank, [0.1, 0.14], [1, 1.02], [-2.2, -2.2]);

        setWgtLayout(_btnHongBao_bg, [0.14, 0.14], [0.9, 1.03], [-0.6, -2]);
        setWgtLayout(_btnHongBao, [0.14, 0.14], [0.9, 1.03], [-0.6, -2]);

        _btnHongBao_bg.setVisible(false);
        _btnHongBao_bg.setTouchEnabled(false);
        _btnHongBao.setVisible(false);
        _btnHongBao.setTouchEnabled(false);

        //樱花
        // var starParticle1 =  new cc.ParticleSystem("Particle/particle_texture.plist");
        // starParticle1.setPosition(_back.getContentSize().width/2, _back.getContentSize().height+20);
        // starParticle1.setScale(2);
        // starParticle1.setTotalParticles(8);
        // _back.addChild(starParticle1);


        var _hongbaoText = _btnHongBao.getChildByName("Image_1");

        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("game_picture/wenzi.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        _btnHongBao.addChild(clipper);

        var sprite = new cc.Sprite("game_picture/saoguang.png");
        clipper.setPositionY(-_hongbaoText.getPositionY() / 3);
        clipper.addChild(sprite, 1);

        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(3.0)));
        sprite.runAction(repeatAction);//进行向右移动的重复动作



        var _ra = cc.rotateBy(3, 360);
        _btnHongBao_bg.runAction(_ra.repeatForever());
        _btnHongBao.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 5, index: 0 }, function (rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0 && rtn.data.length > 0) {
                            //MjClient.native.OpenUrl(rtn.data);
                            MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
                        }
                    });
                    break;
                default:
                    break;
            }
        }, this);

        var bShow = true;
        //if (MjClient.remoteCfg.guestLogin == true )
        {
            _btnDaiLi.visible = false;
            _btnDaiLi.setTouchEnabled(false);
        }
        _btnDaiLi.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhejiemian_Daili", {uid:SelfUid()});
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 4 }, function (rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            //MjClient.native.OpenUrl(rtn.data);
                            MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
                        }
                    });
                    break;
                default:
                    break;
            }
        }, this);

        //setWgtLayout(_Image_light, [1, 1], [0.97, 0.04], [0, 0]);

        setWgtLayout(_headbg, [0.13, 0.13], [0.02, 0.86], [0, 0]);



        setWgtLayout(_btnjulebu, [0.12, 0.12], [0.3, 0], [0, 0.6]);
        setWgtLayout(_btnmoreGame, [0.1, 0.1], [0.8, 0.93], [0,0]);
        //setWgtLayout(_btnShareGet, [0.07, 0.07], [0.7, 0.023], [0, -0.03]);
        //runLightEffectAction(_Image_light);//右边活动的光



        // if(MjClient.systemConfig.showOtherGameUrl && MjClient.systemConfig.showOtherGameUrl != "")
        // {
        //     var _advShowNode = this.getAdvShow();
        //     setWgtLayout(_advShowNode, [0.13, 0.13], [0.055, 0.15], [0,0]);
        //     homeui.node.addChild(_advShowNode);
        // }



        var _scroll = this._guangbo.getChildByName("scroll");
        var _msg = _scroll.getChildByName("msg");
        var scrollDataArr = [];
        scrollDataArr.push(MjClient.remoteCfg.guestLogin ? "欢迎来到牌友联盟江苏棋牌，快和朋友一起对战吧！" : MjClient.systemConfig.homeScroll);
        homePageRunText(_msg,scrollDataArr);
        function getMsg() {
            var content = ""+MjClient.systemConfig.homeScroll;
            return MjClient.remoteCfg.guestLogin ? "欢迎来到牌友联盟江苏棋牌，快和朋友一起对战吧！" : content;
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
        // if (MjClient.remoteCfg.guestLogin == true ||
        //     MjClient.systemConfig.clubEnable != "true") {
        //     _btnjulebu.visible = false;
        //     _btnjulebu.setTouchEnabled(false);
        // }
        _btnjulebu.visible = false;
        _btnjulebu.setTouchEnabled(false);
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
            cc.log("-------------1111-----------------------");
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
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Fenxiang", {uid:SelfUid()});
                        updateUserBehavior("分享");
                    }
                    break;
                default:
                    break;
            }
        }, this);

        // var bg_share = _btnShareGet.getChildByName("bg_img");
        // bg_share.runAction(cc.sequence(cc.scaleTo(1,0.8),cc.scaleTo(1,1.1)).repeatForever());
        var _shareTip = _btnShareGet.getChildByName("fenxiang_tip");
        _shareTip.setVisible(false);
        var _shareTipText = null;
        if (_shareTip) {
            _shareTipText = _shareTip.getChildByName("Text_4");
        }
        _btnShareGet.schedule(function () {
            var lastStr = MjClient.data.pinfo.lastShareDay;
            var currentStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
            var _sprite = _btnShareGet.getChildByName("hongDian");
            var start_day = parseInt(currentStr + "00");
            var zhong_day = parseInt(currentStr + "12");
            
            // 0:00-12:00
            if (lastStr < start_day) {
                // 今天还没分享过
                _sprite.visible = true;
                if (0 <= (new Date().getHours()) && (new Date().getHours()) < 12) {
                    //上午
                    if (_shareTip) {
                        _shareTipText.setString("100%得元宝");
                    }
                } else {
                    //下午
                    if (_shareTip) {
                        _shareTipText.setString("100%中奖");
                    }
                }
            } else if (lastStr < zhong_day) {
                // 上午已经分享过
                if (0 <= (new Date().getHours()) && (new Date().getHours()) < 12) {
                    //上午
                    _sprite.visible = false;
                    // bg_share.stopAllActions();
                    // bg_share.setScale(1);

                } else {
                    //下午
                    _sprite.visible = true;
                    if (_shareTip) {
                        _shareTipText.setString("分享抽大奖");
                    }
                }
            } else {
                _sprite.visible = false;
                // bg_share.stopAllActions();
                // bg_share.setScale(1);
            }
            
            if (_sprite && _shareTip)
                _shareTip.visible = _sprite.visible;

            // if(lastStr >= currentStr){
            //     _sprite.setVisible(false);
            //     _shareTip.setVisible(false);
            // }else {
            //     _sprite.setVisible(true);
            //     _shareTip.setVisible(true);
            //     _shareTipText.setString("分享得2元宝");
            // }

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
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Tuijian", {uid:SelfUid()});
                    updateUserBehavior("邀请下载");
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

        var _head = _headbg.getChildByName("head");
        UIEventBind(this.jsBind, _head, "loadWxHead", function (d) {
            if (d.uid === MjClient.data.pinfo.uid) {
                var stencil = new cc.Sprite("hallSkin/top/avatar_mask.png");
                var clip = new cc.ClippingNode(stencil);
                clip.setAlphaThreshold(0);
                var avatar = new cc.Sprite(d.img);
                clip.addChild(avatar);
                clip.setPosition(_head.width/2 , _head.height/2);
                _head.addChild(clip);
            }
        });



        _head.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.showPlayerInfoBind(MjClient.data.pinfo, true, true);
                    MjClient.native.umengEvent4CountWithProperty("TouxiangClick", {uid:SelfUid()});
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
                MjClient.native.umengEvent4CountWithProperty("Yuanbaozengjia", {uid:SelfUid()});
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

        //礼券
        var _liquanBack = _head.getChildByName("liquanback");
        _liquanBack.visible = MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JI_FEN_SHANG_CHENG);
        var _liquan = _liquanBack.getChildByName("liquan");
        _liquan.ignoreContentAdaptWithSize(true);
        var btn_addLJ = _liquanBack.getChildByName("btn_add");
        btn_addLJ.addTouchEventListener(function(sender,type){
            if(type === 2){
                MjClient.native.umengEvent4CountWithProperty("Liquanzengjia", {uid:SelfUid()});
                MjClient.Scene.addChild(new ShopOfJifen_layer());;
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
        if (MjClient.remoteCfg.hideMoney == true) {
            _BtnShop.visible = false;
            _BtnShop.setTouchEnabled(false);
        }
        //_BtnShop.runAction(cc.sequence(cc.rotateBy(1, 20), cc.rotateBy(1, -20)).repeatForever());
        _BtnShop.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = enter_store();
                    MjClient.Scene.addChild(layer);
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop", {uid:SelfUid()});
                    updateUserBehavior("商城");
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


        //金币场回来显示金币场界面
        if (MjClient.data && MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId){
            if(MjClient.GoldHallLayer){
                MjClient.GoldHallLayer.removeFromParent(true);
            }
            var goldHallLayer = new GoldHallLayer();
            this.goldHallLayer = goldHallLayer;
            this.addChild(goldHallLayer);
            this.showJinbiView();

        }

        // var _dataList2 = [
        //     ["仅需是UI哦牛噢耶"  , "fonts/lanting.TTF", 25, "#ff0000"],
        //     ["发范德萨范德萨范德萨范德萨范德萨" , MjClient.fzcyfont, 36, "#00ff00"],
        //     ["范德萨范德萨"]
        // ];
        // var _richText = COMMON_UI.RichText(_dataList2);
        // _richText.setPosition(cc.p(640,200));
        // _richText.setLocalZOrder(10);
        // this.addChild(_richText);
        

        return true;
    },
    showNomalHome:function () {
        MjClient.homeui._gamePanelNode.setVisible(true);
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
    showJinbiView:function () {
        goldField_start();
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

        //dX,dY是增加偏移
        var topActionList = [];
        var tilebg = this.uiNode.getChildByName("tilebg");
        var headbg = this.uiNode.getChildByName("headbg");
        tilebg._dY = tilebg.height;
        headbg._dY = headbg.height;
        topActionList.push(this.uiNode.getChildByName("tilebg"));
        topActionList.push(this.uiNode.getChildByName("headbg"));

        var bottomActionList = [];
        this._Panel_bottom._dY = this._Panel_bottom.height;
        bottomActionList.push(this._Panel_bottom);

        var leftActionList = [];
        this._girlPanel._dX = this._girlPanel.width * 2;
        leftActionList.push(this._girlPanel);
        this._gamePanelLeftNode._dX = this._gamePanelLeftNode.width;
        leftActionList.push(this._gamePanelLeftNode);

        var rightActionList = [];
        this._advPanelRightNode._dX = this._advPanelRightNode.width;
        rightActionList.push(this._advPanelRightNode);


        //其余的通过计算估算动画
        var childrens = this.uiNode.getChildren();
        for(var i in childrens){
            if(topActionList.indexOf(childrens[i]) !== -1||
                bottomActionList.indexOf(childrens[i]) !== -1||
                leftActionList.indexOf(childrens[i]) !== -1||
                rightActionList.indexOf(childrens[i])!== -1 ){
                continue;
            }
            if(childrens[i].name === "back"){
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
    setPanel: function (leftPanel, rightPanel) {
        var that = this;
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

        // 创建房间相关
        this._createRoom = gamePanel.getChildByName("createRoom");
        this._createRoom.setZoomScale(0.05);

        // var newPlayTip = this._createRoom.getChildByName("newplay_tip");
        // newPlayTip.runAction(cc.repeatForever(cc.sequence(
        //     cc.fadeIn(1),
        //     cc.repeat(cc.sequence(cc.moveBy(0.7, cc.p(0, -3)), cc.moveBy(0.5, cc.p(0, 6)), cc.moveBy(0.7, cc.p(0, -3))), 5),
        //     cc.fadeOut(1),
        //     cc.delayTime(0.5)
        // )));

        this._createRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian", {uid:SelfUid()});
                    updateUserBehavior("创建房间");
                    if (!MjClient.data.sData) {
                        postEvent("createRoom",{});
                    } else {
                        MjClient.showMsg("房间已经创建,请直接加入房间。");
                    }
                    break;
                default:
                    break;
            }
        }, this);

        // 加入房间相关
        this._joinRoom = gamePanel.getChildByName("joinRoom");
        this._joinRoom.setZoomScale(0.05);
        this._joinRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new EnterRoomLayer());
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian", {uid:SelfUid()});
                    updateUserBehavior("加入房间");
                    break;
                default:
                    break;
            }
        }, this);


        // 娱乐场相关
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

        UIEventBind(this.jsBind, this._playGroundRoom, "goldfieldchange", function () {
                if(cc.sys.isObjectValid(MjClient.GoldHallLayer)){
                    return;
                }
                if (!MjClient._GOLD_FIELD || MjClient._GOLD_FIELD.length === 0){
                    MjClient.showToast("金币场暂未开放");
                    that.showNomalHome();
                    return;
                }
                that.doHideAction();
	    });

        goldField_updateListener(this._playGroundRoom);

        var jiaoBiao = new cc.Sprite("game_picture/mainMenu/jiaobiao2.png");
        jiaoBiao.setPosition(jiaoBiao.width*0.52, this._playGroundRoom.height - jiaoBiao.height*0.4);
        this._playGroundRoom.addChild(jiaoBiao);

        this._playGroundRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinbichang", {uid:SelfUid()});
                    updateUserBehavior("娱乐场");
                    //that.showJinbiView();
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
                    updateUserBehavior("亲友圈");
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Qinyouquan", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);



        //添加第三方应用
        COMMON_UI.addHomeAdvMode(advePanel);
    },
    setGameType: function (type) {
        if (this._gonggao && MjClient.systemConfig.rankEnable == "true")
            this._gonggao.visible = false;

        this._gamePanelNode.visible = true;
        MjClient.gameClass = type;

        // this._joinRoom.loadTextureNormal(JoinRoomBtn[MjClient.gameClass]);
        // this._createRoom.loadTextureNormal(CreateRoomBtn[MjClient.gameClass]);

        if(MjClient.gameClass == MjClient.GAME_CLASS.PAO_DE_KUAI ||
            MjClient.gameClass == MjClient.GAME_CLASS.DOU_DI_ZHU ||
            MjClient.gameClass == MjClient.GAME_CLASS.TUAN_TUAN_ZHUAN)
        {
            this._joinRoom.loadTextureNormal("game_picture/jion_nantonh.png");
        }
        else
        {
            this._joinRoom.loadTextureNormal("game_picture/jion.png");
        }

        this._createRoom.loadTextureNormal("game_picture/chuangjian.png");



        // var gameClassList = JSON.parse(MjClient.systemConfig.gameClass);
        // if (gameClassList.length > 1) {
        //     this._tileIcon.loadTexture(GameClassTitleIcon[MjClient.gameClass]);
        // }
        // else {
        //     this._tileIcon.loadTexture("game_picture/logo_home.png");
        // }
        if (MjClient.systemConfig.rankEnable === "true") this.gameRankLayer();
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
        // var parentNode = this._rank_bg;
        // this._ListViewQueShen = parentNode.getChildByName("ListView_queshen");
        // this._ListViewQueShen.removeAllChildren();
        // this._ListViewTuHao = parentNode.getChildByName("ListView_tuhao");
        // this._ListViewTuHao.removeAllChildren();
        //
        // this._cell_queshen = parentNode.getChildByName("cell_queshen");
        // this._cell_queshen.visible = false;
        // this._textDesc = parentNode.getChildByName("Text_30");
        // this._textDesc.ignoreContentAdaptWithSize(true);
        //
        // var that = this;
        // var _btnTip = parentNode.getChildByName("shang_xuanxiang_2").getChildByName("Image_7");
        // this.myNode = parentNode.getChildByName("selfCell");
        //
        // that._btnQueShen = parentNode.getChildByName("queshen");
        // that._btnQueShen.setTouchEnabled(true);
        //
        // //
        // // this._btnTipIcon  =  parentNode.getChildByName("queshen");
        // cc.log("MjClient.gameClass = " + MjClient.gameClass);
        // switch (MjClient.gameClass) {
        //     case MjClient.GAME_CLASS.MA_JIANG:
        //     case MjClient.GAME_CLASS.CHANG_PAI:
        //         that._btnQueShen.loadTexture("gameRank/queshenbang.png");
        //         break;
        //     case MjClient.GAME_CLASS.NIU_NIU:
        //         break;
        //     case MjClient.GAME_CLASS.GUAN_DAN:
        //         that._btnQueShen.loadTexture("gameRank/guanDanWang.png");
        //         break;
        //     case MjClient.GAME_CLASS.PAO_HU_ZI:
        //         break;
        //     case MjClient.GAME_CLASS.PAO_DE_KUAI:
        //         that._btnQueShen.loadTexture("gameRank/kuaipaoWang.png");
        //         break;
        // }
        //
        // function queShenEventCallBack(sender, type) {
        //     if (type == 2) {
        //         var childrenCount = that._ListViewQueShen.getItems().length;
        //         if (childrenCount == 0) {
        //             switch (MjClient.gameClass) {
        //                 case MjClient.GAME_CLASS.MA_JIANG:
        //                 case MjClient.GAME_CLASS.CHANG_PAI:
        //                     that.reqQueShenSeverData();
        //                     break;
        //                 case MjClient.GAME_CLASS.NIU_NIU:
        //                     break;
        //                 case MjClient.GAME_CLASS.GUAN_DAN:
        //                     that.reqGuanDanSeverData();
        //                     break;
        //                 case MjClient.GAME_CLASS.PAO_HU_ZI:
        //                     break;
        //                 case MjClient.GAME_CLASS.PAO_DE_KUAI:
        //                     that.reqPaoDeKuaiSeverData();
        //                     break;
        //             }
        //         }
        //         _btnTip.setPosition(277.32, 27.21);
        //         that._ListViewQueShen.visible = true;
        //         that._ListViewTuHao.visible = false;
        //         that._textDesc.setString("昨日胜局数前十名排行榜,每日24点更新");
        //         if (that._myQueShenData) {
        //             that.initSelfInfo(that._myQueShenData);
        //         }
        //     }
        // }
        //
        // that._btnQueShen.addTouchEventListener(queShenEventCallBack, this);
        //
        // that._btnTuHao = parentNode.getChildByName("tuhao");
        // that._btnTuHao.setTouchEnabled(true);
        // switch (MjClient.gameClass) {
        //     case MjClient.GAME_CLASS.MA_JIANG:
        //     case MjClient.GAME_CLASS.CHANG_PAI:
        //     case MjClient.GAME_CLASS.GUAN_DAN:
        //     case MjClient.GAME_CLASS.PAO_HU_ZI:
        //     case MjClient.GAME_CLASS.NIU_NIU:
        //         that._btnTuHao.loadTexture("gameRank/tuhaobang.png");
        //         break;
        //     case MjClient.GAME_CLASS.PAO_DE_KUAI:
        //         that._btnTuHao.loadTexture("gameRank/guanDanWang.png");
        //         break;
        // }
        //
        //
        //
        // function fuHaoEventCallBack(sender, type) {
        //     if (type == 2) {
        //         var childrenCount = that._ListViewTuHao.getItems().length;
        //         if (childrenCount == 0) {
        //             switch (MjClient.gameClass) {
        //                 case MjClient.GAME_CLASS.MA_JIANG:
        //                 case MjClient.GAME_CLASS.NIU_NIU:
        //                 case MjClient.GAME_CLASS.GUAN_DAN:
        //                     that.reqFuHaoSeverData();
        //                     that._textDesc.setString("昨日充值前十名排行榜,每日24点更新");
        //                     break;
        //                 case MjClient.GAME_CLASS.PAO_DE_KUAI:
        //                     that.reqGuanDanSeverData();
        //                     that._textDesc.setString("昨日胜局数前十名排行榜,每日24点更新");
        //                     break;
        //             }
        //         }
        //         _btnTip.setPosition(100.94, 27.21);
        //         that._ListViewQueShen.visible = false;
        //         that._ListViewTuHao.visible = true;
        //         if (that._myFuHaoData) {
        //             that.initSelfInfo(that._myFuHaoData);
        //         }
        //     }
        // }
        // that._btnTuHao.addTouchEventListener(fuHaoEventCallBack, this);
        //
        // // this._queshenList = _back.getChildByName("ListView");
        // // this._zijiNode = _back.getChildByName("Image_ziji");
        //
        // //初始化，土豪排行榜,去掉富豪榜，跑得快的富豪榜是掼蛋王
        // if (MjClient.gameClass == MjClient.GAME_CLASS.PAO_DE_KUAI) {
        //     that._btnTuHao.visible = true;
        //     that._btnTuHao.setTouchEnabled(true);
        //     that._btnQueShen.setTouchEnabled(true);
        //     that._btnTuHao.setUserData(1);
        //     //_btnTip.ignoreContentAdaptWithSize(true);
        //     _btnTip.setAnchorPoint(0.5, 0.5);
        //     _btnTip.setPosition(277.32, 27.21);
        //     _btnTip.setContentSize(187.00, 44.00);
        //     //_btnTip.loadTexture("rank/shang_anniu.png");
        //     that._btnQueShen.x = 295;
        //     fuHaoEventCallBack(that._btnTuHao, 2);
        // }
        // else {
        //
        //     queShenEventCallBack(that._btnQueShen, 2);
        //     that._btnQueShen.setTouchEnabled(false);
        //     that._btnTuHao.setTouchEnabled(false);
        //     that._btnTuHao.setUserData(0);
        //     that._btnTuHao.visible = false;
        //
        //     _btnTip.setAnchorPoint(0.5, 0.5);
        //     _btnTip.setPosition(189, 27.21);
        //     //_btnTip.loadTexture("rank/kuangchang.png");
        //     //_btnTip.ignoreContentAdaptWithSize(true);
        //     _btnTip.setContentSize(365.00, 44.00);
        //     that._btnQueShen.x = 214;
        // }
        //

    },

    //雀神榜
    reqQueShenSeverData: function () {
        // var that = this;
        // that._btnQueShen.setTouchEnabled(false);
        // MjClient.gamenet.request("pkplayer.handler.rankListMJ", { index: 1, pageNum: 10 },
        //     function (rtn) {
        //         if (that._btnQueShen.getUserData()) {
        //             that._btnQueShen.setTouchEnabled(true);
        //         }
        //
        //         if (rtn.code == 0) {
        //             that.rspQueShen(rtn.data);
        //         }
        //     }
        // );
    },
    rspQueShen: function (data) {
        // //保存自己的数据
        // this._myQueShenData = { myRank: data.mine_today_rank, winCount: data.mine_win_count + "局", QueShenCount: (data.mine_number > 0 ? "雀神次数×" + data.mine_number : "") };
        // var that = this;
        //
        // function _createQueShenOneCell(oneData) {
        //     var copyNode = that._cell_queshen.clone();
        //     copyNode.visible = true;
        //     copyNode.setTouchEnabled(true);
        //     copyNode.addTouchEventListener(function (sender, Type) {
        //         if (Type == 2) {
        //             MjClient.showPlayerInfo(oneData, false, false);
        //         }
        //     });
        //     var headicon = copyNode.getChildByName("nobody");
        //     var url = oneData.headimgurl;
        //     if (!url) url = "png/default_headpic.png";
        //     cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
        //         if (!err && texture&&cc.sys.isObjectValid(headicon)) {
        //             var headSprite = new cc.Sprite(texture);
        //             headSprite.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
        //             headSprite.setScale((headicon.getContentSize().width - 8) / headSprite.getContentSize().width);
        //             headicon.addChild(headSprite);
        //         }
        //     });
        //
        //     var _rankText = copyNode.getChildByName("Text_rank");
        //     _rankText.visible = false;
        //     _rankText.ignoreContentAdaptWithSize(true);
        //
        //     var _rankImage = copyNode.getChildByName("image_rank");
        //     _rankImage.visible = false;
        //     var _pathIcon = "gameRank/"
        //     var rank = oneData.rank;
        //
        //     if (rank == 1)
        //         copyNode.loadTexture("gameRank/DK_diyiming.png");
        //
        //     if (rank >= 1 && rank <= 3) {
			// 	var imageArray = ["one.png", "two.png", "three.png"];
        //         _rankImage.visible = true;
        //         _rankImage.loadTexture(_pathIcon + imageArray[rank - 1]);
        //
        //         var txk = new cc.Sprite("gameRank/txk_" + (rank - 1) + ".png");
        //         txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
        //         txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
        //         headicon.addChild(txk, 10);
        //     }
        //     else {
        //         _rankText.visible = true;
        //         _rankText.setString("" + rank);
        //     }
        //
        //     var _Text_name = copyNode.getChildByName("Text_name");
        //     var _nameStr = unescape(oneData.nickname);
        //     _Text_name.setString(getNewName(_nameStr, 8));
        //
        //     var _winCount = copyNode.getChildByName("Text_winCount");
        //     _winCount.ignoreContentAdaptWithSize(true);
        //     _winCount.setString("");
        //     _winCount.setString(oneData.winCount + "局");
        //
        //     //雀神次数
        //     var _queCount = copyNode.getChildByName("Text_queshen");
        //     _queCount.ignoreContentAdaptWithSize(true);
        //     _queCount.setString("");
        //     if (oneData.number && oneData.number > 1) {
        //         _queCount.setString("雀神称号×" + oneData.number);
        //     }
        //
        //     return copyNode;
        // }
        //
        // var _rankList = data.list;
        // for (var i = 0; i < _rankList.length ; i++) {
        //     that._ListViewQueShen.pushBackCustomItem(_createQueShenOneCell(_rankList[i]));
        // }
        //
        // that.initSelfInfo(that._myQueShenData);
    },

    //富豪榜
    reqFuHaoSeverData: function () {
        // var that = this;
        // that._btnTuHao.setTouchEnabled(false);
        // MjClient.gamenet.request("pkplayer.handler.rankListRecharge", { index: 1, pageNum: 10 },
        //     function (rtn) {
        //         that._btnTuHao.setTouchEnabled(true);
        //         if (rtn.code == 0) {
        //
        //             that.rspFuHao(rtn.data);
        //         }
        //     }
        // );
    },
    rspFuHao: function (data) {
        // this._myFuHaoData = { myRank: data.mine_today_rank, winCount: data.mine_recharge + "元", QueShenCount: (data.mine_number > 0 ? "富豪次数×" + data.mine_number : "") };
        // var that = this;
        // function _createFuHaoOneCell(oneData) {
        //     var copyNode = that._cell_queshen.clone();
        //     copyNode.visible = true;
        //     copyNode.setTouchEnabled(true);
        //     copyNode.addTouchEventListener(function (sender, Type) {
        //         if (Type == 2) {
        //             MjClient.showPlayerInfo(oneData, false, false);
        //         }
        //     });
        //     var headicon = copyNode.getChildByName("nobody");
        //     var url = oneData.headimgurl;
        //     if (!url) url = "png/default_headpic.png";
        //     cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
        //         if (!err && texture&&cc.sys.isObjectValid(headicon)) {
        //             var headSprite = new cc.Sprite(texture);
        //             headSprite.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
        //             headSprite.setScale((headicon.getContentSize().width - 8) / headSprite.getContentSize().width);
        //             headicon.addChild(headSprite);
        //         }
        //     });
        //
        //     var _rankText = copyNode.getChildByName("Text_rank");
        //     _rankText.visible = false;
        //     _rankText.ignoreContentAdaptWithSize(true);
        //
        //     var _rankImage = copyNode.getChildByName("image_rank");
        //     _rankImage.visible = false;
        //     var _pathIcon = "gameRank/"
        //     var rank = oneData.rank;
        //     if (rank == 1)
        //         copyNode.loadTexture("gameRank/DK_diyiming.png");
        //
        //     if (rank >= 1 && rank <= 3) {
			// 	var imageArray = ["one.png", "two.png", "three.png"];
        //         _rankImage.visible = true;
        //         _rankImage.loadTexture(_pathIcon + imageArray[rank - 1]);
        //
        //
        //         var txk = new cc.Sprite("gameRank/txk_" + (rank - 1) + ".png");
        //         txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
        //         txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
        //         headicon.addChild(txk, 10);
        //     }
        //     else {
        //         _rankText.visible = true;
        //         _rankText.setString("" + rank);
        //     }
        //
        //     var _Text_name = copyNode.getChildByName("Text_name");
        //     var _nameStr = unescape(oneData.nickname);
        //     _Text_name.setString(getNewName(_nameStr, 8));
        //
        //     var _winCount = copyNode.getChildByName("Text_winCount");
        //     _winCount.ignoreContentAdaptWithSize(true);
        //     _winCount.setString("0");
        //     _winCount.setString(oneData.recharge + "元");
        //
        //     //雀神次数
        //     var _queCount = copyNode.getChildByName("Text_queshen");
        //     _queCount.ignoreContentAdaptWithSize(true);
        //     _queCount.setString("");
        //     if (oneData.number && oneData.number > 1) {
        //         _queCount.setString("富豪称号×" + oneData.number);
        //     }
        //
        //     return copyNode;
        //
        // }
        //
        // var _rankList = data.list;
        // for (var i = 0; i < _rankList.length ; i++) {
        //     this._ListViewTuHao.pushBackCustomItem(_createFuHaoOneCell(_rankList[i]));
        // }
        //
        // this.initSelfInfo(this._myFuHaoData);
    },

    //掼蛋排行榜
    reqGuanDanSeverData: function () {
        // var that = this;
        // that._btnTuHao.setTouchEnabled(false);
        //
        // MjClient.gamenet.request("pkplayer.handler.rankListGD", { index: 1, pageNum: 10 },
        //     function (rtn) {
        //         that._btnTuHao.setTouchEnabled(true);
        //
        //         if (rtn.code == 0) {
        //
        //             that.rspGuanDan(rtn.data);
        //         }
        //         else {
        //
        //         }
        //     }
        // );
    },
    rspGuanDan: function (data) {
        // //保存自己的数据
        // this._myFuHaoData = { myRank: data.mine_today_rank, winCount: data.mine_win_count + "局", QueShenCount: (data.mine_number > 0 ? "掼蛋王次数×" + data.mine_number : "") };
        // var that = this;
        //
        // function _createQueShenOneCell(oneData) {
        //     var copyNode = that._cell_queshen.clone();
        //     copyNode.visible = true;
        //     copyNode.setTouchEnabled(true);
        //     copyNode.addTouchEventListener(function (sender, Type) {
        //         if (Type == 2) {
        //             MjClient.showPlayerInfo(oneData, false, false);
        //         }
        //     });
        //     var headicon = copyNode.getChildByName("nobody");
        //     var url = oneData.headimgurl;
        //     if (!url) url = "png/default_headpic.png";
        //     cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
        //         if (!err && texture&&cc.sys.isObjectValid(headicon)) {
        //             var headSprite = new cc.Sprite(texture);
        //             headSprite.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
        //             headSprite.setScale((headicon.getContentSize().width - 8) / headSprite.getContentSize().width);
        //             headicon.addChild(headSprite);
        //         }
        //     });
        //
        //     var _rankText = copyNode.getChildByName("Text_rank");
        //     _rankText.visible = false;
        //     _rankText.ignoreContentAdaptWithSize(true);
        //
        //     var _rankImage = copyNode.getChildByName("image_rank");
        //     _rankImage.visible = false;
        //     var _pathIcon = "gameRank/"
        //     var rank = oneData.rank;
        //     if (rank == 1) {
        //         _rankImage.visible = true;
        //         _rankImage.loadTexture(_pathIcon + "one.png");
        //         copyNode.loadTexture("gameRank/DK_diyiming.png");
        //
        //         var txk = new cc.Sprite("gameRank/txk_0.png");
        //         txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
        //         txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
        //         headicon.addChild(txk, 10);
        //     }
        //     else if (rank == 2) {
        //         _rankImage.visible = true;
        //         _rankImage.loadTexture(_pathIcon + "two.png");
        //
        //         var txk = new cc.Sprite("gameRank/txk_1.png");
        //         txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
        //         txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
        //         headicon.addChild(txk, 10);
        //     }
        //     else if (rank == 3) {
        //         _rankImage.visible = true;
        //         _rankImage.loadTexture(_pathIcon + "three.png");
        //
        //         var txk = new cc.Sprite("gameRank/txk_2.png");
        //         txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
        //         txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
        //         headicon.addChild(txk, 10);
        //     }
        //     else {
        //         _rankText.visible = true;
        //         _rankText.setString("" + rank);
        //     }
        //
        //
        //     var _Text_name = copyNode.getChildByName("Text_name");
        //     var _nameStr = unescape(oneData.nickname);
        //     _Text_name.setString(getNewName(_nameStr, 8));
        //
        //     var _winCount = copyNode.getChildByName("Text_winCount");
        //     _winCount.ignoreContentAdaptWithSize(true);
        //     _winCount.setString("");
        //     _winCount.setString(oneData.winCount + "局");
        //
        //     //雀神次数
        //     var _queCount = copyNode.getChildByName("Text_queshen");
        //     _queCount.ignoreContentAdaptWithSize(true);
        //     _queCount.setString("");
        //     if (oneData.number && oneData.number > 1) {
        //         _queCount.setString("掼蛋王×" + oneData.number);
        //     }
        //
        //
        //     return copyNode;
        // }
        //
        // var _rankList = data.list;
        // for (var i = 0; i < _rankList.length ; i++) {
        //     that._ListViewTuHao.pushBackCustomItem(_createQueShenOneCell(_rankList[i]));
        // }
        //
        // that.initSelfInfo(that._myFuHaoData);
    },

    //跑得快排行榜
    reqPaoDeKuaiSeverData: function () {
        // var that = this;
        // that._btnQueShen.setTouchEnabled(false);
        // MjClient.gamenet.request("pkplayer.handler.rankListPDK", { index: 1, pageNum: 10 },
        //     function (rtn) {
        //         that._btnQueShen.setTouchEnabled(true);
        //         if (rtn.code == 0) {
        //
        //             that.rspPaoDeKuai(rtn.data);
        //         }
        //         else {
        //
        //         }
        //     }
        // );
    },
    rspPaoDeKuai: function (data) {
        // //保存自己的数据
        // this._myQueShenData = { myRank: data.mine_today_rank, winCount: data.mine_win_count + "局", QueShenCount: (data.mine_number > 0 ? "快跑王次数×" + data.mine_number : "") };
        // var that = this;
        //
        // function _createQueShenOneCell(oneData) {
        //     var copyNode = that._cell_queshen.clone();
        //     copyNode.visible = true;
        //     copyNode.setTouchEnabled(true);
        //     copyNode.addTouchEventListener(function (sender, Type) {
        //         if (Type == 2) {
        //             MjClient.showPlayerInfo(oneData, false, false);
        //         }
        //     });
        //     var headicon = copyNode.getChildByName("nobody");
        //     var url = oneData.headimgurl;
        //     if (!url) url = "png/default_headpic.png";
        //     cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
        //         if (!err && texture&&cc.sys.isObjectValid(headicon)) {
        //             var headSprite = new cc.Sprite(texture);
        //             headSprite.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
        //             headSprite.setScale((headicon.getContentSize().width - 8) / headSprite.getContentSize().width);
        //             headicon.addChild(headSprite);
        //         }
        //     });
        //
        //     var _rankText = copyNode.getChildByName("Text_rank");
        //     _rankText.visible = false;
        //     _rankText.ignoreContentAdaptWithSize(true);
        //
        //     var _rankImage = copyNode.getChildByName("image_rank");
        //     _rankImage.visible = false;
        //     var _pathIcon = "gameRank/"
        //     var rank = oneData.rank;
        //     if (rank == 1) {
        //         _rankImage.visible = true;
        //         _rankImage.loadTexture(_pathIcon + "one.png");
        //         copyNode.loadTexture("gameRank/DK_diyiming.png");
        //
        //         var txk = new cc.Sprite("gameRank/txk_0.png");
        //         txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
        //         txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
        //         headicon.addChild(txk, 10);
        //     }
        //     else if (rank == 2) {
        //         _rankImage.visible = true;
        //         _rankImage.loadTexture(_pathIcon + "two.png");
        //
        //         var txk = new cc.Sprite("gameRank/txk_1.png");
        //         txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
        //         txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
        //         headicon.addChild(txk, 10);
        //     }
        //     else if (rank == 3) {
        //         _rankImage.visible = true;
        //         _rankImage.loadTexture(_pathIcon + "three.png");
        //
        //         var txk = new cc.Sprite("gameRank/txk_2.png");
        //         txk.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
        //         txk.setScale(headicon.getContentSize().width / txk.getContentSize().width);
        //         headicon.addChild(txk, 10);
        //     }
        //     else {
        //         _rankText.visible = true;
        //         _rankText.setString("" + rank);
        //     }
			//
        //     var _Text_name = copyNode.getChildByName("Text_name");
        //     var _nameStr = unescape(oneData.nickname);
        //     _Text_name.setString(getNewName(_nameStr, 8));
        //
        //     var _winCount = copyNode.getChildByName("Text_winCount");
        //     _winCount.ignoreContentAdaptWithSize(true);
        //     _winCount.setString("");
        //     _winCount.setString(oneData.winCount + "局");
        //
        //     //雀神次数
        //     var _queCount = copyNode.getChildByName("Text_queshen");
        //     _queCount.ignoreContentAdaptWithSize(true);
        //     _queCount.setString("");
        //     if (oneData.number && oneData.number > 1) {
        //         _queCount.setString("快跑王×" + oneData.number);
        //     }
        //
        //
        //     return copyNode;
        // }
        //
        // var _rankList = data.list;
        // for (var i = 0; i < _rankList.length ; i++) {
        //     that._ListViewQueShen.pushBackCustomItem(_createQueShenOneCell(_rankList[i]));
        // }
        //
        // that.initSelfInfo(that._myQueShenData);
    },

    initSelfInfo: function (MyData) {
        // var zijiNode = this.myNode
        // var _myHead = zijiNode.getChildByName("nobody");
        // var url = SelfHeadInfo().url;
        // if (!url) url = "png/default_headpic.png";
        // cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
        //     if (!err && texture&&cc.sys.isObjectValid(_myHead)) {
        //         var headSprite = new cc.Sprite(texture);
        //         headSprite.setPosition(_myHead.getContentSize().width / 2, _myHead.getContentSize().height / 2);
        //         headSprite.setScale((_myHead.getContentSize().width - 8) / headSprite.getContentSize().width);
        //         _myHead.addChild(headSprite);
        //     }
        // });
        //
        // function _getName() {
        //     var pinfo = MjClient.data.pinfo;
        //     return unescape(pinfo.nickname );
        // }
        //
        // var _name = zijiNode.getChildByName("Text_name");
        // _name.setString(getNewName(_getName(), 7));
        //
        // var _rankText = zijiNode.getChildByName("Text_rank");
        // _rankText.ignoreContentAdaptWithSize(true);
        // _rankText.visible = false;
        //
        // //我的今日排名
        // var _rankImage = zijiNode.getChildByName("image_rank");
        // _rankImage.visible = false;
        // var _pathIcon = "gameRank/";
        // var rank = MyData.myRank;//我的排名
        // if (rank) {
        //     if (rank == 1) {
        //         _rankImage.visible = true;
        //         _rankImage.loadTexture(_pathIcon + "one.png");
        //
        //         var txk = new cc.Sprite("gameRank/txk_0.png");
        //         txk.setPosition(_myHead.getContentSize().width / 2, _myHead.getContentSize().height / 2);
        //         txk.setScale(_myHead.getContentSize().width / txk.getContentSize().width);
        //         _myHead.addChild(txk, 10);
        //     }
        //     else if (rank == 2) {
        //         _rankImage.visible = true;
        //         _rankImage.loadTexture(_pathIcon + "two.png");
        //
        //         var txk = new cc.Sprite("gameRank/txk_1.png");
        //         txk.setPosition(_myHead.getContentSize().width / 2, _myHead.getContentSize().height / 2);
        //         txk.setScale(_myHead.getContentSize().width / txk.getContentSize().width);
        //         _myHead.addChild(txk, 10);
        //     }
        //     else if (rank == 3) {
        //         _rankImage.visible = true;
        //         _rankImage.loadTexture(_pathIcon + "three.png");
        //
        //         var txk = new cc.Sprite("gameRank/txk_2.png");
        //         txk.setPosition(_myHead.getContentSize().width / 2, _myHead.getContentSize().height / 2);
        //         txk.setScale(_myHead.getContentSize().width / txk.getContentSize().width);
        //         _myHead.addChild(txk, 10);
        //     }
        //     else {
        //         _rankText.visible = true;
        //         _rankText.setString("" + rank);
        //     }
        // }
        // else {
        //     _rankText.visible = true;
        //     _rankText.setString("无");
        // }
        //
        // //我的胜利场次
        // var _text_winCount = zijiNode.getChildByName("Text_winCount");
        // _text_winCount.ignoreContentAdaptWithSize(true);
        // _text_winCount.setString(MyData.winCount);
        //
        // //我的胜利场次
        // var _Text_queshen = zijiNode.getChildByName("Text_queshen");
        // _Text_queshen.ignoreContentAdaptWithSize(true);
        // _Text_queshen.setString(MyData.QueShenCount);
    },

    /****************
        end of 排行榜
    *****************/

    /*
    显示广告小图标  by sking 2018.4.19
 */
    getAdvShow:function(){
        cc.spriteFrameCache.addSpriteFrames("png/adv/menghuan.plist","png/adv/menghuan.png");
        var _path = "png/adv/pic_";
        var _image = new ccui.ImageView();
        _image.loadTexture("png/adv/menghuan_bg.png");
        _image.setTouchEnabled(true);
        _image.addTouchEventListener(function(sender,type){
            if(type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Guanggaowei", {uid:SelfUid()});
                //todo...跳转地址
                //cc.log("======================show adv url = " + MjClient.systemConfig.showAdvUrl);
                if(MjClient.systemConfig.showOtherGameUrl)
                {
                    MjClient.native.OpenUrl(MjClient.systemConfig.showOtherGameUrl);
                }
                else
                {
                    cc.log("======================show adv url = " + MjClient.systemConfig.showOtherGameUrl);
                }
            }
        },_image);


        var frames = [];
        var prefix = "menghuan_";
        var fc = cc.spriteFrameCache;
        for (var i = 0; i < 8; i++) {
            var name = prefix + i + ".png";
            var f = fc.getSpriteFrame(name);
            if(f)
            {
                frames.push(f);
            }
        }
        var firstFrame = new cc.Sprite("#menghuan_0.png");
        var animate = cc.sequence(cc.animate(new cc.Animation(frames, 0.08, 1)), cc.delayTime(3));
        firstFrame.runAction(animate.repeatForever());
        firstFrame.setPosition(_image.getContentSize().width/2,_image.getContentSize().height/6);
        _image.addChild(firstFrame);
        return _image;
    }


});

