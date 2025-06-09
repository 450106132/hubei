// ------牌友联盟永州棋牌 home--------

var HomeView_qxyzqp = cc.Layer.extend({
    _btnKaiFangGift: null,
    _btnChangCiGift: null,
    panel_gameListNode: null,
    panel_gameNode: null,
    layout_joinRoom: null,
    layout_createRoom: null,
    _BtnRuturn: null,
    _tileIcon: null,
    _myFuHaoData: null,
    _myQueShenData: null,
    ctor: function() {
        this._super();
        var homeui = ccs.load("Home.json");
        this.addChild(homeui.node);
        MjClient.homeui = this;
        MjClient.homeuiNode = homeui.node;
        playMusic("bgMain");
        setMusicVolume(-1);

        UIEventBind(this.jsBind, homeui.node, "logout", function() {
            if (MjClient.homeui) {
                MjClient.homeui.removeFromParent(true);
                delete MjClient.homeui;
            }
        });

        var _back = homeui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0], true);

        /**********************************主界面特效***********************************/
        /*
        //人物
        var layout_role = _back.getChildByName("roleNode");
        var roleAni = createSpine("spine/home/renwu/koutu.json", "spine/home/renwu/koutu.atlas");
        roleAni.setAnimation(0, 'animation', true);
        roleAni.setPosition(-140,-140);
        roleAni.setScale(0.8);
        layout_role.addChild(roleAni,100);
        layout_role.setTouchEnabled(false);
        if(isIPhoneX())
        {
            roleAni.setPosition(-80,-90);
            roleAni.setScale(0.7);
        }
        */

        //星星
        var star = new cc.ParticleSystem("Particle/star.plist");
        star.setPosition(_back.getContentSize().width * 0.4, _back.getContentSize().height * 0.8);
        _back.addChild(star);

        //灯柱子
        var btn_deng = _back.getChildByName("btn_deng");
        btn_deng.setVisible(false);
        btn_deng.zIndex = 9;
        btn_deng.setAnchorPoint(0, 0.5);
        setWgtLayout(btn_deng, [0.5, 0.5], [-0.03, 0.49], [0, 0], false, true);
        if (isIPhoneX()) {
            setWgtLayout(btn_deng, [0.5, 0.5], [0.03, 0.49], [0, 0], false, true);
        }

        // btnDengzhu 是公告按钮
        btn_deng.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    showAnnouncementPanel();
                    break;
                default:
                    break;
            }
        }, this);

        //灯光若隐若现效果
        var light = new ccui.ImageView();
        light.loadTexture("hall/fire.png");
        light.setPosition(btn_deng.getContentSize().width / 2, btn_deng.getContentSize().height / 2);
        light.runAction(cc.sequence(cc.fadeOut(1), cc.fadeIn(1)).repeatForever());
        btn_deng.addChild(light);

        var qiPaoParticle = new cc.ParticleSystem("Particle/qipao.plist");
        qiPaoParticle.setTotalParticles(10);
        qiPaoParticle.setPosition(light.getContentSize().width / 2, light.getContentSize().height / 2);
        light.addChild(qiPaoParticle, 100);

        //樱花
        var flowerParticle = new cc.ParticleSystem("Particle/particle_texture.plist");
        flowerParticle.setPosition(-20, _back.getContentSize().height + 10);
        flowerParticle.setScale(2);
        flowerParticle.setTotalParticles(8);
        _back.addChild(flowerParticle, 0);

        //桃花樹枝
        var img_flower = _back.getChildByName("image_flower");
        img_flower.zIndex = 9;
        setWgtLayout(img_flower, [0.2, 0.2], [0, 1], [0, 0], false, true);
        img_flower.runAction(cc.sequence(cc.rotateBy(1.8, 4).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(2, -4).easing(cc.easeQuadraticActionInOut())).repeatForever());
        img_flower.addChild(this.createButterfly(cc.p(200, 100), 0.06));

        //蝴蝶軌跡
        var fly1 = this.createButterfly(cc.p(110, 110), 0.03);
        var fly2 = this.createButterfly(cc.p(150, 50), 0.03);
        fly2.setFlippedX(true);
        fly2.setScale(0.7);
        img_flower.addChild(fly1);
        img_flower.addChild(fly2);

        function getflyAction(node) {
            var rx = (cc.random0To1() - 0.5) * 60;
            var ry = (cc.random0To1() - 0.5) * 65;
            var a0 = cc.moveBy(1 * cc.random0To1() + 1, cc.p(rx, ry)).easing(cc.easeQuadraticActionInOut());
            var a1 = cc.moveBy(1 * cc.random0To1() + 1, cc.p(-rx, -ry)).easing(cc.easeQuadraticActionInOut());
            var action = cc.sequence(a0, a1, cc.delayTime(0.5 * cc.random0To1()), cc.callFunc(getflyAction.bind(node, node)));
            node.runAction(action);
        }

        getflyAction(fly1);
        getflyAction(fly2);

        /**********************************右上角按鈕***********************************/
        //退出
        var btn_exit = homeui.node.getChildByName("btn_exit");
        setWgtLayout(btn_exit, [0.1, 0.1], [0.74 + 0.07 * 3, 0.88], [0, 0]);
        btn_exit.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    showExitGameLayer();
                    break;
                default:
                    break;
            }
        }, this);

        //设置
        var btn_setting = homeui.node.getChildByName("btn_setting");
        setWgtLayout(btn_setting, [0.1, 0.1], [0.745 + 0.07 * 2, 0.88], [0, 0]);
        btn_setting.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var settringLayer = new SettingView();
                    settringLayer.setName("HomeClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("ShezhiClick", {
                        uid: SelfUid()
                    });
                    break;
                default:
                    break;
            }
        }, this);

        //幫助按鈕
        var btn_help = homeui.node.getChildByName("btn_help");
        setWgtLayout(btn_help, [0.1, 0.1], [0.74 + 0.07, 0.88], [0, 0]);
        btn_help.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.openWeb({
                        url: null,
                        help: true
                    });
                    MjClient.native.umengEvent4CountWithProperty("WanfaClick", {
                        uid: SelfUid()
                    });
                    break;
                default:
                    break;
            }
        }, this);

        //邮件
        this.btn_youjian = homeui.node.getChildByName("btn_youjian");
        setWgtLayout(this.btn_youjian, [0.1, 0.1], [0.74, 0.88], [0, 0]);
        this.btn_youjian.visible = true;
        this.btn_youjian.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var emailLayer = new EmailLayer();
                    MjClient.Scene.addChild(emailLayer);
                    MjClient.native.umengEvent4CountWithProperty("YoujianClick", {
                        uid: SelfUid()
                    });
                    break;
                default:
                    break;
            }
        }, this);
        this.btn_youjian.getChildByName("hongDian").setVisible(false);
        this.updateYoujianCount();

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
            btnRenzheng.setAnchorPoint(cc.p(0.5, 0));
        }
        btnRenzheng.visible = !MjClient.data.pinfo.identityNum;
        setWgtLayout(btnRenzheng, [0.1, 0.1], [0.67, 0.88], [0,0]);

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
            hongDian.setScale(0.59)
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
        setWgtLayout(btnFriendcardInvite, [65/1280, 0], [0.0465, 0.73], [0,0]);


        //排行榜
        var btn_rank = homeui.node.getChildByName("btn_rank");
        setWgtLayout(btn_rank, [0.1, 0.14], [1, 1.02], [-2.2, -2.2]);
        var starParticle = new cc.ParticleSystem("game_picture/diamondStar.plist");
        starParticle.setPosition(btn_rank.getContentSize().width / 2, btn_rank.getContentSize().height / 2);
        btn_rank.addChild(starParticle);
        if (MjClient.remoteCfg.guestLogin == true || MjClient.systemConfig.bisaiEnable != "true") {
            btn_rank.visible = false;
            btn_rank.setTouchEnabled(false);
        }
        btn_rank.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new rankLayer());
                    break;
                default:
                    break;
            }
        }, this);

        //更多游戏
        var btn_moreGame = homeui.node.getChildByName("moreGame");
        if (MjClient.remoteCfg.guestLogin == true ||
            MjClient.systemConfig.moreGameEnable != "true" ||
            MjClient.isShenhe) {
            btn_moreGame.visible = false;
            btn_moreGame.setTouchEnabled(false);
        }
        btn_moreGame.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.OpenUrl(MjClient.systemConfig.moreGameUrl);
                    break;
                default:
                    break;
            }
        }, this);
        //头像
        var head_bg = homeui.node.getChildByName("head_bg");
        setWgtLayout(head_bg, [0.25, 0.25], [0, 0], [0, -0.03]);
        var selfHead = SelfHeadInfo();
        MjClient.loadWxHead(selfHead.uid, selfHead.url);

        var image_head = head_bg.getChildByName("head");
        UIEventBind(this.jsBind, image_head, "loadWxHead", function(d) {
            if (d.uid == MjClient.data.pinfo.uid) {
                var clippingNode = new cc.ClippingNode();
                var mask = new cc.Sprite("hall/headMask.png");
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);
                var img = new cc.Sprite(d.img);
                img.setScale(mask.getContentSize().width / img.getContentSize().width);
                clippingNode.addChild(img);
                clippingNode.setScale(0.999);
                clippingNode.setPosition(image_head.getContentSize().width / 2, image_head.getContentSize().height / 2);
                image_head.addChild(clippingNode);
            }
        });

        image_head.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.showPlayerInfoBind(MjClient.data.pinfo, true, true);
                    MjClient.native.umengEvent4CountWithProperty("TouxiangClick", {
                        uid: SelfUid()
                    });
                    break;
                default:
                    break;
            }
        }, this);

        var label_name = image_head.getChildByName("name");

        function _getName() {
            var pinfo = MjClient.data.pinfo;
            return unescape(pinfo.nickname );
        }
        label_name.setString(getNewName(_getName()));
        label_name.ignoreContentAdaptWithSize(true);

        var label_uid = image_head.getChildByName("uid");
        label_uid.setString("ID:" + SelfUid());
        label_uid.ignoreContentAdaptWithSize(true);

        var image_moneyback = image_head.getChildByName("moneyback");
        image_moneyback.visible = !MjClient.remoteCfg.hideMoney;

        var label_money = image_moneyback.getChildByName("money");
        label_money.ignoreContentAdaptWithSize(true);

        var btn_addYB = image_moneyback.getChildByName("btn_add");
        btn_addYB.addTouchEventListener(function(sender, type) {
            if (type === 2) {
                MjClient.native.umengEvent4CountWithProperty("Yuanbaozengjia", {
                    uid: SelfUid()
                });
                MjClient.Scene.addChild(enter_store());
                MjClient.native.umengEvent4CountWithProperty("ShangchengClick", {
                    uid: SelfUid()
                });
            }
        }, this);

        changeAtalsForLabel(label_money, MjClient.data.pinfo.money);
        UIEventBind(this.jsBind, label_money, "updateInfo", function() {
            var icurrentMoney = parseInt(label_money.getString());
            var lastMoney = parseInt(MjClient.data.pinfo.money);
            if (lastMoney > icurrentMoney) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(label_money.getContentSize().width / 2, label_money.getContentSize().height / 2);
                label_money.addChild(starParticle);
                label_money.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            changeAtalsForLabel(label_money, MjClient.data.pinfo.money);
        });
        UIEventBind(this.jsBind, label_money, "loginOK", function() {
            changeAtalsForLabel(label_money, MjClient.data.pinfo.money);
        });

        //礼券
        var image_liquanback = image_head.getChildByName("liquanback");
        image_liquanback.visible = MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JI_FEN_SHANG_CHENG);

        var label_liquan = image_liquanback.getChildByName("liquan");
        label_liquan.ignoreContentAdaptWithSize(true);

        var btn_addLQ = image_liquanback.getChildByName("btn_add");
        btn_addLQ.addTouchEventListener(function(sender, type) {
            if (type === 2) {
                MjClient.Scene.addChild(new ShopOfJifen_layer());;
            }
        }, this);

        changeAtalsForLabel(label_liquan, MjClient.data.pinfo.integral);
        UIEventBind(this.jsBind, label_liquan, "updateInfo", function() {
            var icurrentLiquan = parseInt(label_liquan.getString());
            var lastLiquan = parseInt(MjClient.data.pinfo.integral);
            if (lastLiquan > icurrentLiquan) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(label_liquan.getContentSize().width / 2, label_liquan.getContentSize().height / 2);
                label_liquan.addChild(starParticle);
                label_liquan.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            changeAtalsForLabel(label_liquan, MjClient.data.pinfo.integral);
        });
        UIEventBind(this.jsBind, label_liquan, "loginOK", function() {
            changeAtalsForLabel(label_liquan, MjClient.data.pinfo.integral);
        });

        //跑馬燈
        var laba_bg = homeui.node.getChildByName("laba_bg");
        setWgtLayout(laba_bg, [0.4, 0.5], [0.23, 0.95], [0, 0]);
        var msg_scroll = laba_bg.getChildByName("scroll");
        var content_scroll = msg_scroll.getChildByName("msg");
        var scrollDataArr = [];
        scrollDataArr.push(MjClient.remoteCfg.guestLogin ? "欢迎来到" + AppCnName[MjClient.getAppType()] : MjClient.systemConfig.homeScroll);
        homePageRunText(content_scroll,scrollDataArr);
        function getMsg() {
            var content = ""+MjClient.systemConfig.homeScroll;
            return MjClient.remoteCfg.guestLogin ? "欢迎来到" + AppCnName[MjClient.getAppType()] : content;
        }
        content_scroll.setString(getMsg());
        UIEventBind(null, msg_scroll, "userReportPush", function(scrollData) {
            if(scrollData.length > 0){
                var scrollDataNew = [];
                for(var i = 0; i < scrollData.length; i++){
                    scrollDataNew.push("经公司核实，"+unescape(scrollData[i].nickname)+"存在"+unescape(scrollData[i].type)+"等不良行为，已对该用户进行封号处理。")
                }
                homePageRunText(content_scroll,scrollDataNew);

            }
            content_scroll.schedule(function () {
                homePageRunText(content_scroll,scrollDataArr);
            },600);
        });

        showHomeActivityIcon(homeui);

        //公告
        var announcement_panel = homeui.node.getChildByName("Panel_announcement");
        var touch_layer = homeui.node.getChildByName("block");
        touch_layer.setVisible(false);
        setWgtLayout(announcement_panel, [1, 1], [0, 0], [0, 0]);
        setWgtLayout(touch_layer, [1, 1], [0, 0], [0, 0], true);

        var announcementPanel_pos = announcement_panel.getPosition();
        var announcementPanel_width = announcement_panel.getBoundingBox().width;
        var showAnnouncementPanel = function() {
            var x = announcementPanel_width;
            touch_layer.setVisible(true);
            touch_layer.setTouchEnabled(false);
            if (!isIPhoneX()) x = x - announcementPanel_width / 14;
            announcement_panel.setPositionX(announcementPanel_pos.x);
            announcement_panel.stopAllActions();
            announcement_panel.runAction(cc.sequence(cc.moveBy(0.4, cc.p(x, 0)).easing(cc.easeSineOut()),
                cc.callFunc(function() {
                    touch_layer.setTouchEnabled(true);
                })));
        };

        var closeAnnouncementPanel = function() {
            announcement_panel.stopAllActions();
            touch_layer.setTouchEnabled(false);
            touch_layer.setVisible(false);
            announcement_panel.runAction(
                cc.moveBy(0.3, cc.p(-announcementPanel_width, 0)).easing(cc.easeSineIn()));
        };

        if (announcement_panel) {
            if (MjClient.remoteCfg.guestLogin == true || MjClient.isShenhe == true) {
                announcement_panel.setVisible(false);
                announcement_panel.setEnabled(false);
                touch_layer.setVisible(false);
                touch_layer.setEnable(false);
            }
            touch_layer.setLocalZOrder(1);
            announcement_panel.setLocalZOrder(1);
            announcement_panel.getChildByName("txt_WXKeFu").setString("" + MjClient.systemConfig.gongzhonghao);
            announcement_panel.getChildByName("txt_WXKeFu").ignoreContentAdaptWithSize(true);
            announcement_panel.getChildByName("txt_WXDaiLi").setString("" + MjClient.systemConfig.majiangqun);
            announcement_panel.getChildByName("txt_WXDaiLi").ignoreContentAdaptWithSize(true);

            var btn_kefu = announcement_panel.getChildByName("btn_kefu");
            var btn_daili = announcement_panel.getChildByName("btn_daili");
            var kefuCopy = function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.doCopyToPasteBoard("" + MjClient.systemConfig.gongzhonghao);
                        MjClient.showToast("复制成功，打开微信查找添加");
                        MjClient.native.openWeixin();
                        MjClient.native.umengEvent4CountWithProperty("GongzhonghaoCopy", {
                            uid: SelfUid()
                        });
                        break;
                    default:
                        break;
                }
            };


            var dailiCopy = function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.doCopyToPasteBoard("" + MjClient.systemConfig.majiangqun);
                        MjClient.showToast("复制成功，打开微信查找添加");
                        MjClient.native.openWeixin();
                        MjClient.native.umengEvent4CountWithProperty("MajiangqunCopy", {
                            uid: SelfUid()
                        });
                        break;
                    default:
                        break;
                }
            };

            var touchBlock = function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        closeAnnouncementPanel();
                        break;
                    default:
                        break;
                }
            };

            btn_kefu.addTouchEventListener(kefuCopy, this);
            btn_daili.addTouchEventListener(dailiCopy, this);
            touch_layer.addTouchEventListener(touchBlock, this);
        }

        /**********************************底部按鈕***********************************/
        //底部功能按钮
        var bottom_bg = _back.getChildByName("bottom_bg");
        bottom_bg.zIndex = 10;
        bottom_bg.setAnchorPoint(0.5, 0);
        setWgtLayout(bottom_bg, [0.95, 0.95], [0.5, 0], [0, 0], false, true);

        //客服按钮
        var _BtnKeFu = bottom_bg.getChildByName("BtnKeFu");
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
        _BtnKeFu.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
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

        //活动按鈕
        var btn_active = bottom_bg.getChildByName("btn_active");

        function _btnActiveTouchEvent(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (MjClient.systemConfig && MjClient.systemConfig.activity) {
                        var layer = new activityLayer();
                        MjClient.Scene.addChild(layer);
                        MjClient.native.umengEvent4CountWithProperty("HuodongClick", {
                            uid: SelfUid()
                        });
                    }
                    break;
                default:
                    break;
            }
        }
        btn_active.addTouchEventListener(_btnActiveTouchEvent, this);

        //战绩
        var btn_zhanji = bottom_bg.getChildByName("btn_zhanji");
        btn_zhanji.visible = true;
        btn_zhanji.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (!MjClient.data.sData) {
                        MjClient.Scene.addChild(new PlayLogView());
                        MjClient.native.umengEvent4CountWithProperty("ZhanjiClick", {
                            uid: SelfUid()
                        });
                    } else MjClient.showMsg("正在游戏中，不能查看战绩");
                    break;
                default:
                    break;
            }
        }, this);

        var zhanji_star = cc.Sprite.create("hall/effectPic/yaoguang.png");
        zhanji_star.setScale(0);
        zhanji_star.setPosition(25, 75);
        zhanji_star.runAction(cc.sequence(
            cc.spawn(cc.scaleTo(0.3, 1), cc.rotateBy(0.3, 90)),
            cc.spawn(cc.scaleTo(0.3, 0), cc.rotateBy(0.3, 90)),
            cc.delayTime(4)
        ).repeatForever());
        btn_zhanji.addChild(zhanji_star, 1);

        var zhanji_qipao = new cc.ParticleSystem("Particle/qipao.plist");
        zhanji_qipao.setTotalParticles(6);
        zhanji_qipao.setPosition(btn_zhanji.getContentSize().width / 2, btn_zhanji.getContentSize().height / 2);
        btn_zhanji.addChild(zhanji_qipao, 100);

        //广告代理
        var btn_adv = homeui.node.getChildByName("btn_adv");
        var daili_qipao = btn_adv.getChildByName("daili_qipao");
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
        setWgtLayout(btn_adv, [0.2, 0.2], [1, 0.75], [0, 0]);
        if (MjClient.remoteCfg.guestLogin == true ||
            MjClient.systemConfig.moreGameEnable != "true" ||
            MjClient.isShenhe) {
            btn_adv.loadTextureNormal("game_picture/daili_xia.png");
            btn_adv.loadTexturePressed("game_picture/daili_xia_s.png");
            btn_adv.removeAllChildren(true);
        }

        var advStar = cc.Sprite.create("hall/effectPic/yaoguang.png");
        advStar.setScale(0);
        advStar.setPosition(52, 92);
        advStar.runAction(cc.sequence(
            cc.spawn(cc.scaleTo(0.3, 1), cc.rotateBy(0.3, 90)),
            cc.spawn(cc.scaleTo(0.3, 0), cc.rotateBy(0.3, 90)),
            cc.delayTime(3)
        ).repeatForever());
        btn_adv.addChild(advStar, 1);

        btn_adv.addTouchEventListener(function(sender, Type) {
            var jumbFunc = function() {
                MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                    type: 1
                }, function(rtn) {
                    if (rtn.code == 0) {
                        // MjClient.native.OpenUrl(rtn.data);
                        var layer = new DaiLiWebviewLayer(rtn.data);
                        if (layer.isInitSuccess())
                            MjClient.Scene.addChild(layer);
                    } else if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败");
                    }
                });
            };

            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    //是代理
                    if (isAgent()) {
                        jumbFunc();
                    } else {
                        //var layer = new showAdvLayer();
                        var layer = new BindingCodeLayer3();
                        MjClient.Scene.addChild(layer);
                    }
                    break;
                default:
                    break;
            }
        }, this);

        //分享有礼
        var btn_share = bottom_bg.getChildByName("btn_fenxiang");
        if (MjClient.remoteCfg.guestLogin == true) {
            btn_share.visible = false;
            btn_share.setTouchEnabled(false);
        }
        btn_share.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var _sprite = btn_share.getChildByName("hongDian");
                    MjClient.Scene.addChild(new shareTodayLayer(_sprite.visible));
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Fenxiang", {
                        uid: SelfUid()
                    });
                    // if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    //     MjClient.wxShareImageToPYQ = true;
                    //     postEvent("WX_SHARE_SUCCESS", { errCode: 0 });
                    // }
                    // var fileContent = MjClient.getShareImageFileToPYQ();
                    // MjClient.native.wxShareImageToPYQ(fileContent.file, fileContent.content);
                    break;
                default:
                    break;
            }
        }, this);

        var share_tip = btn_share.getChildByName("fenxiang_tip");
        var _shareTipText = null;
        if (share_tip) {
            _shareTipText = share_tip.getChildByName("Text_3");
            _shareTipText.ignoreContentAdaptWithSize(true);
            _shareTipText.setString("100%中奖");
        }
        btn_share.schedule(function() {
            var lastStr = MjClient.data.pinfo.lastShareDay;
            var currentStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
            var sprite_hongdian = btn_share.getChildByName("hongDian");
            if (currentStr == lastStr) {
                sprite_hongdian.visible = false;
            } else {
                sprite_hongdian.visible = true;
            }
            if (sprite_hongdian && share_tip)
                share_tip.visible = sprite_hongdian.visible;

        }, 1);

        if (share_tip) {
            if (btn_adv)
                btn_share.setZOrder(btn_adv.getLocalZOrder() + 1);
            share_tip.setOpacity(0);
            share_tip.runAction(cc.repeatForever(cc.sequence(
                cc.fadeIn(1),
                cc.repeat(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2)), 5),
                cc.fadeOut(1),
                cc.delayTime(0.5))));
        }
        //推荐有礼
        var btn_tuijian = bottom_bg.getChildByName("btn_tuijian");
        if (MjClient.remoteCfg.guestLogin == true) {
            btn_tuijian.visible = false;
            btn_tuijian.setTouchEnabled(false);
        }
        btn_tuijian.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Tuijian", {
                        uid: SelfUid()
                    });
                    var recommendLayer;
                    recommendLayer = new recommendLayer_active();
                    MjClient.Scene.addChild(recommendLayer);
                    break;
                default:
                    break;
            }
        }, this);

        //商城
        var btn_store = bottom_bg.getChildByName("btn_store");
        if (MjClient.remoteCfg.hideMoney == true || MjClient.isShenhe == true) {
            btn_store.visible = false;
            btn_store.setTouchEnabled(false);
        }
        btn_store.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = enter_store();
                    MjClient.Scene.addChild(layer);
                    MjClient.native.umengEvent4CountWithProperty("ShangchengClick", {
                        uid: SelfUid()
                    });
                    break;
                default:
                    break;
            }
        }, this);

        var image_biaoqian = btn_store.getChildByName("Image_biaoqian");
        if (image_biaoqian) {
            image_biaoqian.runAction(cc.sequence(cc.rotateTo(3, 30).easing(cc.easeSineInOut()), cc.rotateTo(2, 0).easing(cc.easeSineInOut())).repeatForever());
            var _store_guang = btn_store.getChildByName("Image_guang");
            _store_guang.runAction(cc.sequence(cc.spawn(cc.scaleTo(2, 1.2), cc.fadeOut(2)),
                cc.callFunc(function() {
                    _store_guang.setScale(1);
                    _store_guang.setOpacity(255);
                })).repeatForever());
        }
        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("store/sc_anniu.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        btn_store.addChild(clipper);
        var sprite = new cc.Sprite("store/shangchengguang.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作

        //游戏列表
        this.panel_gameListNode = homeui.node.getChildByName("Panel_GameList");
        //游戏
        this.panel_gameNode = homeui.node.getChildByName("Panel_game");
        this.panel_gameNode.visible = false;

        this.setGamePanel(this.panel_gameNode);
        this.setGameListPanel(this.panel_gameListNode);
        this.addQiPao(this.panel_gameNode);
        COMMON_UI.addHintText(homeui.node);
        return true;
    },

    addQiPao: function(gamePanelNode) {
        var qiPao = new cc.Sprite("game_picture/qipaokuang.png");
        qiPao.x = 500;
        qiPao.y = 475;
        gamePanelNode.addChild(qiPao);
        var txt = new cc.LabelTTF("跑得快,红中麻将\n斗地主,火爆上线",MjClient.fzcyfont,22);
        txt.textWidth = qiPao.width;
        txt.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        txt.x = qiPao.width * 0.5 - 5;
        txt.y = qiPao.height * 0.5 + 10;
        txt.setColor(cc.color(244,240,200));
        qiPao.addChild(txt);

        qiPao.setCascadeOpacityEnabled(true);
        qiPao.setOpacity(0);
        qiPao.runAction(cc.repeatForever(cc.sequence(
            cc.fadeIn(1),
            cc.repeat(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2)), 5),
            cc.fadeOut(1),
            cc.delayTime(0.5)))); 
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
                    } else if (MjClient.exitLayer && cc.sys.isObjectValid(MjClient.exitLayer)) {
                        MjClient.exitLayer.removeFromParent();
                        MjClient.exitLayer = null;
                    } else {
                        this._keyBackClickedTime = (new Date()).getTime();
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
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fenxiang_Jiaru_sure", {uid: SelfUid()});
                        MjClient.joinGame(parseInt(tableID));
                    }, function() {});
                    MjClient.native.doCopyToPasteBoard(""); //清空剪切板
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fenxiang_Jiaru", {uid: SelfUid()});
                }
                if (tableID.length == 8 && tableID != MjClient.myReplayCode) {
                    MjClient.showMsg("是否立即播放回放码为[" + tableID + "]的比赛？", function() {
                        MjClient.getOtherPlayLog(parseInt(tableID));
                    }, function() {});
                    MjClient.native.doCopyToPasteBoard(""); //清空剪切板
                }
            }
        }, 0.5, cc.REPEAT_FOREVER, 1.5);
    },
    onExit: function() {
        this._super();
        cc.eventManager.removeListeners(cc.EventListener.KEYBOARD);
    },
    setGameListPanel: function(gameListPanelNode) {
        if (this._gonggao) {
            gameListPanelNode.setItemsMargin(60);
            setWgtLayout(gameListPanelNode, [0.6, 0.6], [0.58, 0.5], [0, -0.1]);
        } else {
            setWgtLayout(gameListPanelNode, [0.6, 0.6], [0.5, 0.5], [0, -0.1]);
        }

        var gameClassList = JSON.parse(MjClient.systemConfig.gameClass); //[MjClient.GAME_CLASS.NIU_NIU];//
        for (var i = 0; i < gameClassList.length; i++) {
            var gameClass = gameClassList[i];
            var btn = new ccui.Button(GameClassEnterBtn[gameClass]);
            btn.setTag(gameClass);
            btn.setScale(0.85);
            btn.addTouchEventListener(function(sender, Type) {
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
        }
    },
    setGamePanel: function (gamePanelNode) {
        var that = this;
        setWgtLayout(gamePanelNode, [0.95, 0.95], [0.5, 0.5], [0, 0]);
        if(isIPhoneX())
        {
            setWgtLayout(gamePanelNode, [0.85, 0.85], [0.5, 0.5], [0, 0]);
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
        var goldBtnMask = goldBtn.getChildByName("mask");
        goldBtn.setPressedActionEnabled(true);

        // 设置点击放大效果
        this.setToucheffect(goldBtn, goldBtnMask);
        goldField_updateListener(goldBtn);

        var jiaoBiao = new cc.Sprite("game_picture/mainMenu/jiaobiao2.png");
        jiaoBiao.setPosition(jiaoBiao.width*0.5, goldBtn.height - jiaoBiao.height*0.35);
        goldBtn.addChild(jiaoBiao);

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

        // 金币场的特效
        // var _Image_gold = goldBtn.getChildByName("Image_gold"); //发财这个字
        // _Image_gold.runAction(cc.sequence(cc.moveBy(1.8,cc.p(0,-6)).easing(cc.easeQuadraticActionInOut()), cc.moveBy(2,cc.p(0,6)).easing(cc.easeQuadraticActionInOut())).repeatForever());

        var goldBtnIcon1 = goldBtnMask.getChildByName("icon_1");
        var shaiA1 = cc.moveBy(2,cc.p(0,15)).easing(cc.easeQuadraticActionInOut());
        var shaiB1 = cc.moveBy(2,cc.p(0,-15)).easing(cc.easeQuadraticActionInOut());
        goldBtnIcon1.runAction(cc.sequence(shaiA1,shaiB1).repeatForever());

        var goldBtnIcon2 = goldBtnMask.getChildByName("icon_2");
        var shaiA2 = cc.moveBy(2,cc.p(0,-10)).easing(cc.easeQuadraticActionInOut());
        var shaiB2 = cc.moveBy(2,cc.p(0,10)).easing(cc.easeQuadraticActionInOut());
        goldBtnIcon2.runAction(cc.sequence(shaiA2,shaiB2).repeatForever());

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
        goldBtnMask.addChild(clipper);

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
            goldBtnMask.setVisible(false);
            hongbaoEffect.setVisible(true);
        }else {
            goldBtnMask.setVisible(true);
            hongbaoEffect.setVisible(false);
        }

        // 俱乐部
        var clubEnter = gameBgNode.getChildByName("clubEnter");
        var clubEnterMask = clubEnter.getChildByName("mask");
        // 设置点击放大效果
        this.setToucheffect(clubEnter, clubEnterMask);
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

        var clubEnterIcon1 = clubEnterMask.getChildByName("icon_2");
        var shaiA3 = cc.moveBy(1.8,cc.p(0,15)).easing(cc.easeQuadraticActionInOut());
        var shaiB3 = cc.moveBy(1.8,cc.p(0,-15)).easing(cc.easeQuadraticActionInOut());
        clubEnterIcon1.runAction(cc.sequence(shaiA3,shaiB3).repeatForever());

        var clubEnterIcon2 = clubEnterMask.getChildByName("icon_4");
        var shaiA4 = cc.moveBy(1.8,cc.p(0,-8)).easing(cc.easeQuadraticActionInOut());
        var shaiB4 = cc.moveBy(1.8,cc.p(0,8)).easing(cc.easeQuadraticActionInOut());
        clubEnterIcon2.runAction(cc.sequence(shaiA4,shaiB4).repeatForever());

        var _joinRoomPar =  new cc.ParticleSystem("Particle/joinRoomPar.plist");
        _joinRoomPar.setPosition(clubEnter.getContentSize().width/2, clubEnter.getContentSize().height/3);
        _joinRoomPar.setScale(1);
        clubEnter.addChild(_joinRoomPar,0);

        //添加第三方应用
        COMMON_UI.addHomeAdvMode(advBgNode);

        /*
        gamePanelNode.zIndex = 9;
        var that = this;
        var gamePanelLeftNode = gamePanelNode.getChildByName("Panel_left");
        // var gamePanelRightNode = gamePanelNode.getChildByName("Panel_right");
        var advBgNode  = gamePanelNode.getChildByName("adv_bg");

        setWgtLayout(gamePanelNode, [0.97, 0.97], [0.5, 0.5], [0, 0],false,true);
        if(isIPhoneX())
        {
            setWgtLayout(gamePanelNode, [0.97, 0.97], [0.5, 0.5], [0, 0],false,true);
            gamePanelLeftNode.setPositionX(gamePanelLeftNode.getPositionX() - 60);
            advBgNode.setPositionX(advBgNode.getPositionX() + 50);
        }

        // 新版动画
        // cc.spriteFrameCache.addSpriteFrames("spine/home/new_ani/DTdonghua0.plist", "spine/home/new_ani/DTdonghua0.png");
        // ccs.armatureDataManager.addArmatureFileInfo("spine/home/new_ani/DTdonghua.ExportJson");

        // 加入房间
        this._joinRoom = gamePanelLeftNode.getChildByName("joinRoom");
        var joinRoomMask = this._joinRoom.getChildByName("Panel_mask");

        // this._joinRoom.setTouchEnabled(true);
        // var joinAni = createSpine("spine/home/join/2.json", "spine/home/join/2.atlas");
        // joinAni.setAnimation(0, 'animation', true);
        // joinAni.setTimeScale(0.9);
        // joinAni.setPosition(90,295);
        // this._joinRoom.addChild(joinAni,100);

        // var joinAni = new ccs.Armature("DTdonghua");
        // joinAni.animation.play("jiarufangjian");
        // joinAni.setPosition(cc.p(170/2, 325/2));
        // this._joinRoom.addChild(joinAni, 9999);

        // 设置点击放大效果
        this.setToucheffect(this._joinRoom, joinRoomMask);

        this._joinRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    reallyPlayEffect("sound/button_click.mp3",false);
                    MjClient.Scene.addChild(new EnterRoomLayer());
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);

        // 创建房间
        this._createRoom = gamePanelLeftNode.getChildByName("createRoom");
        var createRoomMask = this._createRoom.getChildByName("Panel_mask");

        // this._createRoom.setTouchEnabled(true)
        // var createAni = createSpine("spine/home/create/3.json", "spine/home/create/3.atlas");
        // createAni.setAnimation(0, 'animation', true);
        // createAni.setPosition(90,295);
        // this._createRoom.addChild(createAni,100);

        // var createAni = new ccs.Armature("DTdonghua");
        // createAni.animation.play("chuangjianfangjian");
        // createAni.animation.setSpeedScale(0.5);
        // createAni.setPosition(cc.p(170/2, 325/2));
        // this._createRoom.addChild(createAni, 9999);

        // 设置点击放大效果
        this.setToucheffect(this._createRoom, createRoomMask);

        this._createRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    // if (MjClient.systemConfig.competeEnable == "true" || MjClient.remoteCfg.guestLogin) {
                    //     MjClient.Scene.addChild(new playgroundLayer());
                    // }
                    // else {
                    //     MjClient.showToast("即将开放,敬请期待");
                    // }
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian", {uid:SelfUid()});
                    reallyPlayEffect("sound/button_click.mp3",false);
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

        // 金币场
        var btn_jinbichang = gamePanelLeftNode.getChildByName("jinbichang");
        var goldBtnMask = btn_jinbichang.getChildByName("Panel_mask");

        var iconJinbi_1 = goldBtnMask.getChildByName("icon_jinbi1");
        var jinbiUp_1 = cc.moveBy(1.2, cc.p(0,10)).easing(cc.easeQuadraticActionInOut());
        var jinbiUp_2 = cc.moveBy(1.2, cc.p(0,-10)).easing(cc.easeQuadraticActionInOut());
        iconJinbi_1.runAction(cc.sequence(jinbiUp_1, jinbiUp_2).repeatForever());

        var iconJinbi_2 = goldBtnMask.getChildByName("icon_jinbi2");
        var jinbiUp_3 = cc.moveBy(1.2, cc.p(0,-8)).easing(cc.easeQuadraticActionInOut());
        var jinbiUp_4 = cc.moveBy(1.2, cc.p(0,8)).easing(cc.easeQuadraticActionInOut());
        iconJinbi_2.runAction(cc.sequence(jinbiUp_3, jinbiUp_4).repeatForever());

        var iconTrophy = goldBtnMask.getChildByName("icon_Trophy");
        var jinbi_star1 = cc.Sprite.create("hall/effectPic/yaoguang.png");
        jinbi_star1.setScale(0);
        jinbi_star1.setPosition(100,75);
        jinbi_star1.runAction(cc.sequence(
            cc.spawn(cc.scaleTo(0.3,1), cc.rotateBy(0.3,90)),
            cc.spawn(cc.scaleTo(0.3,0), cc.rotateBy(0.3,90)),
            cc.delayTime(2)
        ).repeatForever());
        iconTrophy.addChild(jinbi_star1, 1);

        var goldBtnPar =  new cc.ParticleSystem("Particle/joinRoomPar.plist");
        goldBtnPar.setPosition(goldBtnMask.getContentSize().width/2, goldBtnMask.getContentSize().height*0.2);
        goldBtnPar.setScale(1);
        goldBtnMask.addChild(goldBtnPar,0);

        // var jinbichangAni = createSpine("spine/home/jinbichang/4.json", "spine/home/jinbichang/4.atlas");
        // jinbichangAni.setAnimation(0, 'animation', true);
        // jinbichangAni.setTimeScale(0.85);
        // jinbichangAni.setPosition(90,295);
        // btn_jinbichang.addChild(jinbichangAni,100);

        // var jinbichangAni = new ccs.Armature("DTdonghua");
        // jinbichangAni.animation.play("jinbichang");
        // jinbichangAni.animation.setSpeedScale(0.625);
        // jinbichangAni.setPosition(cc.p(170/2, 325/2));
        // btn_jinbichang.addChild(jinbichangAni, 9999);

        // 设置点击放大效果
        this.setToucheffect(btn_jinbichang, goldBtnMask);

        btn_jinbichang.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinbichang", {uid:SelfUid()});
                    that.showJinbiView();
                    break;
                default:
                    break;
            }
        }, this);
        UIEventBind(this.jsBind, btn_jinbichang, "goldfieldchange", function () {
            if(cc.sys.isObjectValid(MjClient.GoldHallLayer)){
                return;
            }
            if (!MjClient._GOLD_FIELD || MjClient._GOLD_FIELD.length == 0){
                MjClient.showToast("金币场暂未开放");
                //that.showNomalHome();
                return;
            }
            // var intoType = 1;
            // if(MjClient.GoldHallLayer){
            //     intoType = 0;
            //     MjClient.GoldHallLayer.removeFromParent(true);
            // }
            // var goldHallLayer = new GoldHallLayer(intoType);
            // that.goldHallLayer = goldHallLayer;
            // that.addChild(goldHallLayer);
            that.doHideAction();
        });
        //金币场回来显示金币场界面
        if (MjClient.data && MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId){
            if(MjClient.GoldHallLayer){
                MjClient.GoldHallLayer.removeFromParent(true);
            }
            var goldHallLayer = new GoldHallLayer();
            that.goldHallLayer = goldHallLayer;
            that.addChild(goldHallLayer);
            that.showJinbiView();
        }

        // 俱乐部
        var clubEnter = gamePanelLeftNode.getChildByName("clubEnter");
        var clubEnterMask = clubEnter.getChildByName("Panel_mask");

        var iconMJ = clubEnterMask.getChildByName("icon_MJ");
        var mjUp1 = cc.moveBy(1, cc.p(0,10)).easing(cc.easeQuadraticActionInOut());
        var mjUp2 = cc.moveBy(1, cc.p(0,-10)).easing(cc.easeQuadraticActionInOut());
        iconMJ.runAction(cc.sequence(mjUp1, mjUp2).repeatForever());

        var iconSZ = clubEnterMask.getChildByName("icon_ShaiZi");
        var szUp1 = cc.moveBy(1.1, cc.p(0,10)).easing(cc.easeQuadraticActionInOut());
        var szUp2 = cc.moveBy(1.1, cc.p(0,-10)).easing(cc.easeQuadraticActionInOut());
        iconSZ.runAction(cc.sequence(szUp1, szUp2).repeatForever());

        var starParticleqp =  new cc.ParticleSystem("Particle/ceate.plist");
        starParticleqp.setPosition(clubEnter.getContentSize().width/2, clubEnter.getContentSize().height*0.6);
        starParticleqp.setScale(0.9);
        clubEnterMask.addChild(starParticleqp,0);

        // clubEnter.setTouchEnabled(true);
        // var clubAni = createSpine("spine/home/club/deng1.json", "spine/home/club/deng1.atlas");
        // clubAni.setAnimation(0, 'animation', true);
        // clubAni.setTimeScale(0.95);
        // clubAni.setPosition(90,295);
        // clubEnter.addChild(clubAni,100);

        // var clubAni = new ccs.Armature("DTdonghua");
        // clubAni.animation.play("qingyouquan");
        // clubAni.animation.setSpeedScale(0.75);
        // clubAni.setPosition(cc.p(170/2, 325/2));
        // clubEnter.addChild(clubAni, 9999);

        // 设置点击放大效果
        this.setToucheffect(clubEnter, clubEnterMask);

        if (MjClient.systemConfig.clubEnable == "true" && MjClient.isShenhe == false)
        {
            clubEnter.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        reallyPlayEffect("sound/button_click.mp3",false);
                        MjClient.Scene.addChild(new FriendCard_main({joinType:"home"}, 1));
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
            if(MjClient.isShenhe == true){
                // this._joinRoom.x += this._joinRoom.width/3;
                // this._createRoom.x += this._createRoom.width/2;
            }else {
                this._joinRoom.x += this._joinRoom.width/2;
                this._createRoom.x += this._createRoom.width/3;
            }
        }
        */

        /*
        // 广告 传奇 入口
        var chuanqiBtn = gamePanelRightNode.getChildByName("chuanqiBtn");
        if (chuanqiBtn) {
            

            var zhezhao = chuanqiBtn.getChildByName("zhezhao");

            var anim = cc.Sprite("chuanqi/anim/0.png");
            var ac = createAnimation("chuanqi/anim/", 20, cc.rect(0, 0, 329, 109), 0.15);
            anim.runAction(cc.sequence(ac).repeatForever());
            anim.setPosition(62, 40);
            anim.setScale(0.9);
            zhezhao.addChild(anim);

            var lightLayer = zhezhao.getChildByName("lightLayer");

            var light = new cc.ParticleSystem("chuanqi/light.plist");
            light.setPosition(0, 330);
            light.setScale(0.5);
            lightLayer.addChild(light);

            //var rw = zhezhao.getChildByName("rw");
            //rw.runAction(cc.sequence(cc.scaleTo(0.5, 0.97), cc.scaleTo(0.5, 1.0)).repeatForever());

            var fireLayer = zhezhao.getChildByName("fireLayer");
            var fire = cc.Sprite("chuanqi/fire/fire_0.png");
            var ac = createAnimation("chuanqi/fire/fire_", 12, cc.rect(0, 0, 150, 80), 0.03);
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

            var light = new cc.ParticleSystem("bazisuanmian/light.plist");
            light.setPosition(0, 250);
            light.setScale(0.5);
            lightLayer.addChild(light);

            var cai = zhezhao.getChildByName("cai");
            cai.runAction(cc.sequence(cc.scaleTo(0.5, 0.95), cc.scaleTo(0.5, 1.1)).repeatForever());

            var particle = new cc.ParticleSystem("chuanqi/particle.plist");
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
    },
    setToucheffect: function (btn, container) {
        btn.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function() {
            container.setScale(btn.getRendererNormal().getScale());
        })).repeatForever());
    },
    setGameType: function(type) {
        if (this._gonggao && MjClient.systemConfig.rankEnable == "true")
            this._gonggao.visible = false;

        this.panel_gameListNode.visible = false;
        this.panel_gameNode.visible = true;
        MjClient.gameClass = type;

        var gameClassList = JSON.parse(MjClient.systemConfig.gameClass);
        if (MjClient.systemConfig.rankEnable == "true") {
            this.gameRankLayer();
        }
    },
    showJinbiView:function () {
        goldField_start();
    },
    //获取细分游戏类型 0:字牌  1：麻將 2：撲克
    getGameTpyeList: function(type) {
        var arr = [];
        switch (type) {
            case 0:
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP) {
                    arr = [MjClient.GAME_TYPE.PAO_HU_ZI, MjClient.GAME_TYPE.LUO_DI_SAO, MjClient.GAME_TYPE.HY_LIU_HU_QIANG,
                        MjClient.GAME_TYPE.HY_SHI_HU_KA, MjClient.GAME_TYPE.JIANG_YONG_15Z
                    ];
                } else {
                    arr = [MjClient.GAME_TYPE.PAO_HU_ZI, MjClient.GAME_TYPE.LUO_DI_SAO, MjClient.GAME_TYPE.HY_LIU_HU_QIANG,
                        MjClient.GAME_TYPE.HY_SHI_HU_KA
                    ];
                }
                break;
            case 1:
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP) {
                    arr = [MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG, MjClient.GAME_TYPE.TY_HONGZHONG, MjClient.GAME_TYPE.YONG_ZHOU_MJ,
                        MjClient.GAME_TYPE.JIANG_HUA_MJ, MjClient.GAME_TYPE.TY_ZHUANZHUAN, MjClient.GAME_TYPE.DAO_ZHOU_MJ,
                        MjClient.GAME_TYPE.CHANG_SHA
                    ];
                } else {
                    arr = [MjClient.GAME_TYPE.TY_HONGZHONG, MjClient.GAME_TYPE.YONG_ZHOU_MJ];
                }
                break;
            case 2:
                arr = [MjClient.GAME_TYPE.DOU_DI_ZHU_TY, MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY];
                break;
                // case 3:
                //     arr = [MjClient.GAME_TYPE.PAO_HU_ZI_SR, MjClient.GAME_TYPE.PAO_HU_ZI_SR_King];
                // break;
                // case 4:
                //     if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP){
                //         arr = [MjClient.GAME_TYPE.LUO_DI_SAO, MjClient.GAME_TYPE.HY_LIU_HU_QIANG, MjClient.GAME_TYPE.JIANG_YONG_15Z];
                //     }else{
                //         arr = [MjClient.GAME_TYPE.LUO_DI_SAO, MjClient.GAME_TYPE.HY_LIU_HU_QIANG];
                //     }

                // break;
                // case 5:
                //     if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP){
                //         arr = [MjClient.GAME_TYPE.DOU_DI_ZHU_TY, MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY,MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG,
                //             MjClient.GAME_TYPE.TY_HONGZHONG, MjClient.GAME_TYPE.YONG_ZHOU_MJ, MjClient.GAME_TYPE.JIANG_HUA_MJ, 
                //             MjClient.GAME_TYPE.TY_ZHUANZHUAN, MjClient.GAME_TYPE.DAO_ZHOU_MJ, MjClient.GAME_TYPE.CHANG_SHA];
                //     }else{ 
                //         arr = [MjClient.GAME_TYPE.DOU_DI_ZHU_TY, MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY,
                //         MjClient.GAME_TYPE.TY_HONGZHONG, MjClient.GAME_TYPE.YONG_ZHOU_MJ];
                //     }

                // break;
        }

        var gameList = MjClient.gameListConfig.paohuziList;
        for (var i = 0; i < arr.length; i++) {
            var arr_type = arr[i];
            if (gameList.indexOf(arr_type) < 0) {
                arr.splice(i, 1);
                i -= 1;
            }
        }
        gameList = MjClient.gameListConfig.doudizhulist;
        for (var i = 0; i < arr.length; i++) {
            var arr_type = arr[i];
            if (gameList.indexOf(arr_type) < 0) {
                arr.splice(i, 1);
                i -= 1;
            }
        }
        return arr;
    },

    updateYoujianCount: function() {
        var sprite_hongdian = this.btn_youjian.getChildByName("hongDian");
        var label_number = sprite_hongdian.getChildByName("Text");
        label_number.ignoreContentAdaptWithSize(true);
        UIEventBind(null, sprite_hongdian, "refresh_mail_list", function() {
            if (MjClient.emailData) {
                var count = MjClient.emailData.length;

                for (var i = 0; i < MjClient.emailData.length; i++) {
                    if (MjClient.emailData[i].type == 1 || MjClient.emailData[i].type == 3) {
                        count--;
                    }
                }
                if (count > 0) {
                    sprite_hongdian.setVisible(true);
                    label_number.setString(count);
                }
                else {
                    sprite_hongdian.setVisible(false);
                }
            }
        });
    },

    /**************
        bagan 排行榜
     *************/
    gameRankLayer: function() {

    },

    //雀神榜
    reqQueShenSeverData: function() {

    },
    rspQueShen: function(data) {

    },

    //富豪榜
    reqFuHaoSeverData: function() {

    },
    rspFuHao: function(data) {

    },

    initSelfInfo: function(MyData) {

    },

    createButterfly: function(pos, speed) {
        cc.spriteFrameCache.addSpriteFrames("spine/home/fly/fly.plist", "spine/home/fly/fly.png");
        var frames = [];
        var prefix = "HUIDIE000";
        var fc = cc.spriteFrameCache;
        for (var i = 1; i < 4; i++) {
            var name = prefix + i + ".png";
            var f = fc.getSpriteFrame(name);
            if (f) {
                frames.push(f);
            }
        }
        var firstFrame = new cc.Sprite("#HUIDIE0001.png");
        var animate = cc.animate(new cc.Animation(frames, speed, 1));
        firstFrame.runAction(animate.repeatForever());
        firstFrame.setPosition(pos);
        return firstFrame;
    }
});