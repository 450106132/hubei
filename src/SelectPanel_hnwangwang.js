// ------湖南旺旺 home--------

var HomeView_hnwangwang = cc.Layer.extend({
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
        var homeui = ccs.load("Home.json");
        this.uiNode = homeui.node;
        //BindUiAndLogic(homeui.node,this.jsBind);
        this.addChild(homeui.node);
        MjClient.homeui = this;
        MjClient.homeuiNode = homeui.node;
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

        /*
        // 烟花（粒子动画）
        var starParticle_yanhua =  new cc.ParticleSystem("hall/homeEffect/particle_texture.plist");
        starParticle_yanhua.setPosition(_back.getContentSize().width/2, _back.getContentSize().height*5/6);
        // starParticle_yanhua.setScale(1);
        // starParticle_yanhua.setTotalParticles(10);
        _back.addChild(starParticle_yanhua);
        */

        //一群蝴蝶
        var _buterflysNode = _back.getChildByName("Panel_buterflys");
        setWgtLayout(_buterflysNode, [0.05, 0.05], [0.98, 0.5], [0, 0], false,true);
        var path = "hall/homeEffect/buterflys";
        var butterflys = COMMON_UI.creatFrameAni(path,"huidie_",32);
        _buterflysNode.addChild(butterflys);

        /*
        //人物
        var _roleNode = _back.getChildByName("Panel_role");
        this._roleNode = _roleNode;
        setWgtLayout(_roleNode, [0.23, 0.23], [0.45, 0], [0, 0], false,true);
        var roleAni = createSpine("spine/home/renwu/ren.json", "spine/home/renwu/ren.atlas");
        roleAni.setAnimation(0, 'animation', true);
        roleAni.setPosition(-215,-500);
        roleAni.setScale(1);
        roleAni.setTimeScale(0.7);
        _roleNode.addChild(roleAni,100);
        */

        //底部功能按钮
        var panel = _back.getChildByName("panel")
        var _bottom_bg = _back.getChildByName("bottom_bg");
        this._bottom_bg = _bottom_bg;
        _bottom_bg.setAnchorPoint(1,0);
        setWgtLayout(_bottom_bg, [0.6, 0.6], [1, 0], [0, 0], false,true);
        
        //樱花
        var starParticle1 =  new cc.ParticleSystem("Particle/particle_texture.plist");
        starParticle1.setPosition(-20, _back.getContentSize().height+10);
        starParticle1.setScale(2);
        starParticle1.setTotalParticles(8);
        _back.addChild(starParticle1,0);

        //桃花樹枝
        // var _Image_flower = _back.getChildByName("Image_flower");
        // _Image_flower.zIndex = 9;
        // setWgtLayout(_Image_flower, [0.2, 0.2], [0, 1], [0, 0], false,true);
        // _Image_flower.runAction(cc.sequence(cc.rotateBy(1.8,4).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(2,-4).easing(cc.easeQuadraticActionInOut())).repeatForever());


        // function runLightEffectAction(lightNode) {
        //     var _Image_light_scale = lightNode.getScale();
        //     var a = cc.scaleTo(1, _Image_light_scale * 0.6);
        //     var a1 = cc.scaleTo(0.8, _Image_light_scale * 0.3);
        //     lightNode.runAction(cc.sequence(a, a1).repeatForever());
        // }
        //
        // var _Image_light = homeui.node.getChildByName("Image_light");

        //活动伸缩按钮
        var _btnActive = _bottom_bg.getChildByName("Btn_Active");
        // _Image_light.visible = true;

        function _btnActiveTouchEvent(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = new activityLayer();
                    MjClient.Scene.addChild(layer);
                    MjClient.native.umengEvent4CountWithProperty("HuodongClick", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }

        _btnActive.addTouchEventListener(_btnActiveTouchEvent, this);





        //设置
        var _setting = homeui.node.getChildByName("setting");
        // setWgtLayout(_setting, [0.08, 0.12], [1, 1.02], [-0.6, -0.8]);
        _setting.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var settringLayer = new HomeSettingView_shaoyang();
                    settringLayer.setName("HomeClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("ShezhiClick", {uid:SelfUid()});
                    // MjClient.Scene.addChild(new ZiPaiTestPanel(),100);
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
                    MjClient.native.umengEvent4CountWithProperty("WanfaClick", {uid:SelfUid()});
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
                    //MjClient.showMsg("暂未开放!");
                    if (!MjClient.data.sData) {
                        MjClient.Scene.addChild(new PlayLogView_daTongZi());
                        MjClient.native.umengEvent4CountWithProperty("ZhanjiClick", {uid:SelfUid()});
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
                    MjClient.native.umengEvent4CountWithProperty("YoujianClick", {uid:SelfUid()});
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
        this._btnAdv = _btnAdv;
        _btnAdv.visible = true;
        if (MjClient.remoteCfg.guestLogin == true||MjClient.isShenhe == true) {
            _btnAdv.visible = false;
            _btnAdv.setTouchEnabled(false);
        }
        var bAdvShow = true;
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
                    // if (MjClient.mode == 1) // 邀请码模式
                    // {
                    //     //没有绑定邀请码
                    //     if (!(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0)) {
                    //         MjClient.Scene.addChild(new BindingCodeLayer2());
                    //     }
                    //     else {
                    //         jumbFunc();
                    //     }
                    // }
                    // else// if (MjClient.mode == 2) // 房卡模式
                    // {
                    //     //是代理
                    //     if (MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.myMemberId && parseInt(MjClient.data.pinfo.myMemberId) > 0) {
                    //         jumbFunc();
                    //     }
                    //     else {
                    //         var layer = new showAdvLayer();
                    //         MjClient.Scene.addChild(layer);
                    //     }
                    // }
                    //是代理
                    if (MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.myMemberId && parseInt(MjClient.data.pinfo.myMemberId) > 0) {
                        jumbFunc();
                    }
                    else {
                        //var layer = new showAdvLayer();
                        var layer = new BindingCodeLayer3();
                        MjClient.Scene.addChild(layer);
                    }
                    break;
                default:
                    break;
            }
        }, this);


        //标题
        this._tileIcon = homeui.node.getChildByName("laba_bg");

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

        //推荐有礼
        var _btntuijian = _bottom_bg.getChildByName("tuijian");
        


        //炮神榜
        //var _btnPao   = homeui.node.getChildByName("btnPao");


        //要新
        var _btnYaoXin = homeui.node.getChildByName("btnYaoXin");

        //红包背景

        var _btnHongBao_bg = homeui.node.getChildByName("btnHongBao_bg");

        //红包
        var _btnHongBao = homeui.node.getChildByName("btnHongBao");

        //绿色游戏
        var tipMsg = homeui.node.getChildByName("tipMsg");


        showHomeActivityIcon(homeui);  


        // var _gongGaoNode = _back.getChildByName("Image_flower");
        // var btn_gonggao = _gongGaoNode.getChildByName("btn_gonggao");
        var btnZX = homeui.node.getChildByName("btnZX");
        if (btnZX)
        {
            btnZX.runAction(cc.sequence(cc.rotateBy(1,-3).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(1.2,3).easing(cc.easeQuadraticActionInOut())).repeatForever());
            if (MjClient.remoteCfg.guestLogin == true) {
                btnZX.setVisible(false);
            }
            btnZX.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    MjClient.Scene.addChild(new QuestLayer());
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
                        MjClient.native.umengEvent4CountWithProperty("MajiangqunCopy", {uid:SelfUid()});
                        break;
                    default:
                        break;
                }
            };

            _btnCopy_1.addTouchEventListener(copy1Cb, this);
            _btnCopy_2.addTouchEventListener(copy2Cb, this);

            var _text_3 = _gonggao.getChildByName("Text_3")
            if (_text_3) {
                _text_3.setString(""+MjClient.systemConfig.suqianDaili);
                _text_3.ignoreContentAdaptWithSize(true);
                var copy3Cb = function (sender, Type) {
                    switch (Type) {
                        case ccui.Widget.TOUCH_ENDED:
                            MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.suqianDaili);
                            MjClient.showToast("复制成功，打开微信查找添加");
                            MjClient.native.openWeixin();
                            MjClient.native.umengEvent4CountWithProperty("SuqiandailiCopy", {uid:SelfUid()});
                            break;
                        default:
                            break;
                    }
                };

                _gonggao.getChildByName("btnCopy_3").addTouchEventListener(copy3Cb, this);
            }

            //隐藏公告
            _gonggao.setVisible(false);
        }

        setWgtLayout(this._youjian, [68/1280, 0], [0.7982, 0.9222], [0,0]);
        // setWgtLayout(_btnmoreGame, [98/1280, 0], [0.2940, 0.0666], [0,0]);
        setWgtLayout(_BtnHTP, [68/1280, 0], [0.8656, 0.9222], [0,0]);
        setWgtLayout(_setting, [68/1280, 0], [0.9344, 0.9222], [0,0]);
        setWgtLayout(_btnAdv, [68/1280, 0], [0.7281, 0.9222], [0,0]);
        setWgtLayout(btnZX, [68/1280, 0], [0.6595, 0.9222], [0,0]);
        setWgtLayout(this._tileIcon, [0.4, 0.4], [0.23, 0.05], [0, 0.00]);
        setWgtLayout(_btnRank, [0.1, 0.14], [1, 1.02], [-1.1, -3.5]);
        setWgtLayout(_gonggao, [341/1280, 0], [0.1111, 0.5546], [0.0, 0.0]);
        //setWgtLayout(_Image_light, [1, 1], [0.97, 0.04], [0, 0]);
        // setWgtLayout(_btnActive, [107/1280,0], [0.9016, 0.08], [0, 0]);
        var _BtnShop = _bottom_bg.getChildByName("Button_store");
        // setWgtLayout(_BtnShop , [100/1280, 0], [0.1125, 0.0638], [0, 0]);
        var _BtnBinding = _bottom_bg.getChildByName("Button_binding");
        _BtnBinding.x = _BtnShop.x;
        _BtnBinding.y = _BtnShop.y;
        // setWgtLayout(_BtnBinding , [87/1280, 0], [0.1112, 0.0632], [0, 0]);
        setWgtLayout(_btnjulebu, [0.12, 0.12], [0.7, 0], [0, 0.6]);

        // setWgtLayout(_btntuijian, [98/1280, 0], [0.4646, 0.07], [0, 0]);
        // setWgtLayout(_zhanji, [98/1280, 0], [0.3053, 0.07], [0, 0]);
        // setWgtLayout(_btnShareGet, [98/1280, 0], [0.6622, 0.07], [0, 0]);
        // setWgtLayout(_headbg, [0.088, 0.14], [0.09, 1], [0.1, -0.03]);
        setWgtLayout(tipMsg, [213/1280, 0], [0.0659, 0.8517], [0,0]);
        // setWgtLayout(questBtn, [57/1280, 0], [0, 0.5], [0,0]);
        // if(isIPhoneX()){
        //     setWgtLayout(questBtn, [57/1280, 0], [0.031, 0.5], [0,0]);
        // }

        // questBtn.addTouchEventListener(function (sender, Type) {
        //     switch (Type) {
        //         case ccui.Widget.TOUCH_ENDED:
        //             {
        //                 MjClient.Scene.addChild(new QuestLayer());
        //             }
        //             break;
        //         default:
        //             break;
        //     }
        // }, this);

        // runLightEffectAction(_Image_light);//右边活动的光

        var _scroll = this._tileIcon.getChildByName("scroll");
        var _msg = _scroll.getChildByName("msg");
        var scrollDataArr = [];
        scrollDataArr.push((MjClient.remoteCfg.guestLogin||MjClient.isShenhe) ? "欢迎来到" + AppCnName[MjClient.getAppType()] : MjClient.systemConfig.homeScroll);
        homePageRunText(_msg,scrollDataArr);
        function getMsg() {
            var content = ""+MjClient.systemConfig.homeScroll;
            return (MjClient.remoteCfg.guestLogin||MjClient.isShenhe) ? "欢迎来到" + AppCnName[MjClient.getAppType()] : content;
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
            _btnjulebu.visible = false;
            _btnjulebu.setTouchEnabled(false);
        // }
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
        _btnmoreGame.visible = false;

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
                        // if (cc.sys.OS_WINDOWS == cc.sys.os) {
                        //     MjClient.wxShareImageToPYQ = true;
                        //     postEvent("WX_SHARE_SUCCESS", { errCode: 0 });
                        //     //MjClient.Scene.addChild(new shareRedPacketLayer(0.3));
                        // }


                        // var fileContent = MjClient.getShareImageFileToPYQ();
                        // MjClient.native.wxShareImageToPYQ(fileContent.file, fileContent.content);
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
        // _btnShareGet.schedule(function () {
        //     var _sprite = _btnShareGet.getChildByName("hongDian");
        //     if (_sprite && _shareTip)
        //         _shareTip.visible = _sprite.visible;
        // }, 1);
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

        ////头像
        var _headbg = _back.getChildByName("headBg");
        // _headbg.setAnchorPoint(0, 1);
        setWgtLayout(_headbg, [0.1, 0.1], [0.05, 0.95], [0, 0],false, true);
        if(isIPhoneX()){
            setWgtLayout(_headbg, [0.15, 0.15], [0.05, 0.92], [0, 0],false, true);
        }

        var _head = _headbg.getChildByName("head");
        UIEventBind(this.jsBind, _head, "loadWxHead", function (d) {
            if (d.uid == MjClient.data.pinfo.uid) {
                // var sp = new cc.Sprite(d.img);
                // this.addChild(sp);
                // setWgtLayout(sp, [0.93, 0.93], [0.5, 0.5], [0, 0], false, true);
                var clippingNode = new cc.ClippingNode();

                var mask = new cc.Sprite("ui/hall/headMask.png");
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
        _uid.setString("ID:" + MjClient.data.pinfo.uid);
        _uid.ignoreContentAdaptWithSize(true);
        if (MjClient.remoteCfg.hideMoney) {
            //_uid.y=45;
        }

        var _money = _head.getChildByName("moneyNum");
        _money.ignoreContentAdaptWithSize(true);

        var btn_addYB = _head.getChildByName("btn_add_money");
        btn_addYB.addTouchEventListener(function(sender,type){
            if(type === 2){
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
        var img_liquan = _head.getChildByName("liquan");
        var liquanNum = _head.getChildByName("liquanNum");
        var btn_addLQ = _head.getChildByName("btn_add_liquan");
        var lq_di = _head.getChildByName("lijuan_di");

        //礼券是否显示
        var liquanIsShow = MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JI_FEN_SHANG_CHENG);
        img_liquan.visible = liquanIsShow;
        liquanNum.visible = liquanIsShow;
        btn_addLQ.visible = liquanIsShow;
        lq_di.visible = liquanIsShow;

        liquanNum.ignoreContentAdaptWithSize(true);
        btn_addLQ.addTouchEventListener(function(sender,type){
            if(type === 2){
                MjClient.Scene.addChild(new ShopOfJifen_layer());;
            }
        },this);

        changeAtalsForLabel(liquanNum, MjClient.data.pinfo.integral);
        UIEventBind(this.jsBind, liquanNum, "updateInfo", function () {
            var icurrentIntegral = parseInt(liquanNum.getString());
            var lastIntegral = parseInt(MjClient.data.pinfo.integral);
            if (lastIntegral > icurrentIntegral) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(liquanNum.getContentSize().width / 2, liquanNum.getContentSize().height / 2);
                liquanNum.addChild(starParticle);
                liquanNum.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            changeAtalsForLabel(liquanNum, MjClient.data.pinfo.integral);
        });

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

        /*
         绑定按钮
         */
        var _BtnBinding = _bottom_bg.getChildByName("Button_binding");
        // if (_BtnBinding) {
        //     _BtnBinding.visible = false;
        // }
        this._BtnBinding = _BtnBinding;
        if (MjClient.remoteCfg.hideMoney == true) {
            _BtnBinding.visible = false;
            _BtnBinding.setTouchEnabled(false);
        }
        _BtnBinding.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    //if (MjClient.rechargeLadder) {
                        var layer = enter_store();
                        MjClient.Scene.addChild(layer);
                    // } else {
                    //     MjClient.getRechargeLadder();
                    //     MjClient.showMsg("获取商品失败，请重试！");
                    // }
                    break;
                default:
                    break;
            }
        }, this);
        /*
         商店
         */
        var _BtnShop = _bottom_bg.getChildByName("Button_store");
        this._BtnShop = _BtnShop;
        _BtnShop.visible = true;
        if(MjClient.isShenhe){
            _BtnShop.visible = false;
            _BtnShop.setTouchEnabled(false);
        }
        if (MjClient.remoteCfg.hideMoney == true) {
            _BtnShop.visible = false;
            _BtnShop.setTouchEnabled(false);
        }
        _BtnShop.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = enter_store();
                    MjClient.Scene.addChild(layer);
                    MjClient.native.umengEvent4CountWithProperty("ShangchengClick", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);

        // if(!(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&
        //     !MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP){
        //     _BtnBinding.setVisible(true);
        //     _BtnShop.setVisible(false);
        // }else {
            _BtnBinding.setVisible(false);
            _BtnShop.setVisible(true);
        // }
        if(MjClient.isShenhe){
            _BtnBinding.setVisible(false);
            _BtnShop.setVisible(false);
        }

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

        // this._test();

        this._btntuijian = _btntuijian;
        this._zhanji = _zhanji;
        this._btnShareGet = _btnShareGet;
        this._btnActive = _btnActive;
        this._BtnHTP = _BtnHTP;
        this._setting = _setting;
        this.fixIPhoneX();

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

        return true;
    },

    //打筒子
    _test : function () {
        var card = new daTongZi.Card();
        this.addChild(card);
        card.x = cc.winSize.width - card.width*0.5;
        card.y = 100;
        card.setScale(0.4);
        // setWgtLayout(card, [0.0, 0.167], [1, 1], [-0.5, -2.7]);
        card.x = card.width * card.scale * 0.5;
        setTimeout(function () {
            card.rotateAction();
        },3000);

        var arr = [];
        for(var i = 0; i < 44; i++){
            var info = new daTongZi.CardInfo();
            info.type = 105;
            arr.push(info);
        }
        var cardList = new daTongZi.CardListLayer();
        this.addChild(cardList);
        cardList.addCards(arr,true);
        cardList.setScale(0.4);
    },
    update:function(dt)
    {
        //  if(!(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&
        //     !MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP){
        //     this._BtnBinding.setVisible(true);
        //     this._BtnShop.setVisible(false);
        // }else {
        //     this._BtnBinding.setVisible(false);
        //     this._BtnShop.setVisible(true);
        // }
        if(MjClient.isShenhe){
            this._BtnBinding.setVisible(false);
            this._BtnShop.setVisible(false);
        }
    },
    onEnter: function () {
        this._super();
        this.scheduleUpdate();
        
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
        setWgtLayout(gamePanelNode, [0.95, 0.95], [0.5, 0.5], [0, 0]);
        if(isIPhoneX())
        {
            setWgtLayout(gamePanelNode, [0.85, 0.85], [0.5, 0.45], [0, 0]);
        }

        var gameBgNode = gamePanelNode.getChildByName("game_bg");

        var advBgNode  = gamePanelNode.getChildByName("adv_bg");

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


        this._joinRoom = gameBgNode.getChildByName("joinRoom");
        this._joinRoom.setPressedActionEnabled(true);
        this._joinRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new EnterRoomLayer());
                    MjClient.native.umengEvent4CountWithProperty("JiarufangjianClick", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);


        this._createRoom = gameBgNode.getChildByName("createRoom");
        this._createRoom.setPressedActionEnabled(true);
        if(MjClient.isShenhe){
            this._createRoom.setPosition(cc.p(640, 170));
            this._createRoom.ignoreContentAdaptWithSize(true);
            this._createRoom.setScale(1.4);
        }
        this._createRoom.addTouchEventListener(function (sender, Type) {
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


        //金币场
        var goldBtn = gameBgNode.getChildByName("goldBtn");
        goldBtn.setPressedActionEnabled(true);

        UIEventBind(this.jsBind, goldBtn, "goldfieldchange", function () {
            if(cc.sys.isObjectValid(MjClient.GoldHallLayer)){
                return;
            }
            if (!MjClient._GOLD_FIELD || MjClient._GOLD_FIELD.length == 0){
                MjClient.showToast("金币场暂未开放");
                return;
            }
            that.doHideAction();
        });

        //goldBtn.setName("soundSelf");
        goldBtn.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinbichang", {uid:SelfUid()});
                    this.showJinbiView();
                    break;
                default:
                    break;
            }
        }, this);

        /* 金币场的特效*/
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
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width*1.5 ,sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction);//进行向右移动的重复动作
        clipper.addChild(sprite, 1);
        goldBtn.addChild(clipper);
        /* end of 金币场的特效*/
        // clipper.visible = isGoldActivityOpen();



        var clubEnter = gameBgNode.getChildByName("clubEnter");
        if (MjClient.systemConfig.clubEnable == "true" && MjClient.isShenhe == false)
        {
            clubEnter.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.Scene.addChild(new FriendCard_main(null, 1));
                        MjClient.native.umengEvent4CountWithProperty("JulebuClick", {uid:SelfUid()});
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
                this._joinRoom.x += this._joinRoom.width/3;
                this._createRoom.x += this._createRoom.width/2;
            }
        }

        var shaizi = clubEnter.getChildByName("Image_shaizi");
        shaizi.runAction(cc.sequence(cc.rotateBy(1.8,-6).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(2,6).easing(cc.easeQuadraticActionInOut())).repeatForever());

        var fa = clubEnter.getChildByName("Image_fa");
        fa.runAction(cc.sequence(cc.scaleTo(1,1.1), cc.scaleTo(1,1)).repeatForever());

        var _joinRoomPar =  new cc.ParticleSystem("Particle/joinRoomPar.plist");
        _joinRoomPar.setPosition(clubEnter.getContentSize().width/2, clubEnter.getContentSize().height/3);
        _joinRoomPar.setScale(1);
        clubEnter.addChild(_joinRoomPar,0);

       
        //添加第三方应用
        COMMON_UI.addHomeAdvMode(advBgNode);

        //细分类型按钮
        //打筒子
        // var srchzBtn = gamePanelNode.getChildByName("daTongZiBtn");
        // if(MjClient.isShenhe){
        //     srchzBtn.setPosition(cc.p(640, 380));
        //     srchzBtn.ignoreContentAdaptWithSize(true)
        //     srchzBtn.setScale(1.4);
        // }
        // srchzBtn.addTouchEventListener(function (sender, Type) {
        //     switch (Type) {
        //         case ccui.Widget.TOUCH_ENDED:
        //             var list = this.getGameTpyeList(1);
        //             postEvent("createRoom", {IsFriendCard:false, isShowTitleCreate:true, typeList: list});
        //             break;
        //         default:
        //             break;
        //     }
        // }, this);

        // //字牌
        // var erdtBtn = gamePanelNode.getChildByName("ziPaiBtn");
        // if(MjClient.isShenhe){
        //     erdtBtn.setVisible(false);
        // }
        // erdtBtn.addTouchEventListener(function (sender, Type) {
        //     switch (Type) {
        //         case ccui.Widget.TOUCH_ENDED:
        //             var list = this.getGameTpyeList(2);
        //             postEvent("createRoom", {IsFriendCard:false, isShowTitleCreate:true, typeList: list});
        //             break;
        //         default:
        //             break;
        //     }
        // }, this);

        // //斗地主
        // var srzxBtn = gamePanelNode.getChildByName("douDiZhuBtn");
        // if(MjClient.isShenhe){
        //     srzxBtn.setVisible(false);
        // }
        // srzxBtn.addTouchEventListener(function (sender, Type) {
        //     switch (Type) {
        //         case ccui.Widget.TOUCH_ENDED:
        //             var list = this.getGameTpyeList(3);
        //             postEvent("createRoom", {IsFriendCard:false, isShowTitleCreate:true, typeList: list});
        //             break;
        //         default:
        //             break;
        //     }
        // }, this);

        // //跑得快
        // var ldsBtn = gamePanelNode.getChildByName("paoDeKuaiBtn");
        // if(MjClient.isShenhe){
        //     ldsBtn.setVisible(false);
        // }
        // ldsBtn.addTouchEventListener(function (sender, Type) {
        //     switch (Type) {
        //         case ccui.Widget.TOUCH_ENDED:
        //             var list = this.getGameTpyeList(4);
        //             postEvent("createRoom", {IsFriendCard:false, isShowTitleCreate:true, typeList: list});
        //             break;
        //         default:
        //             break;
        //     }
        // }, this);

        // //麻将
        // var mjpkBtn = gamePanelNode.getChildByName("maJiangBtn");
        // if(MjClient.isShenhe){
        //     mjpkBtn.setVisible(false);
        // }
        // mjpkBtn.addTouchEventListener(function (sender, Type) {
        //     switch (Type) {
        //         case ccui.Widget.TOUCH_ENDED:
        //             var list = this.getGameTpyeList(5);
        //             postEvent("createRoom", {IsFriendCard:false, isShowTitleCreate:true, typeList: list});
        //             break;
        //         default:
        //             break;
        //     }
        // }, this);
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
        var topActionList = [];
        topActionList.push(this.uiNode.getChildByName("youjian"));
        topActionList.push(this.uiNode.getChildByName("BtnHTP"));
        topActionList.push(this.uiNode.getChildByName("setting"));
        topActionList.push(this.uiNode.getChildByName("laba_bg"));
        topActionList.push(this.uiNode.getChildByName("btnAdv"));

        //dX,dY是增加偏移
        var bottomActionList = [];
        this._bottom_bg._dY = this._bottom_bg.height * 0.2;
        bottomActionList.push(this._bottom_bg);

        var leftActionList = [];

        // this._roleNode._dX = this._roleNode.width * 0.6;
        // leftActionList.push(this._roleNode);
        
        // 左边功能按钮
        this._gamePanelNode.getChildByName("game_bg")._dX = this._gamePanelNode.getChildByName("game_bg").width * 2;
        leftActionList.push(this._gamePanelNode.getChildByName("game_bg"));

        var rightActionList = [];
        // rightActionList.push(this._gamePanelNode);
        // 右边功能按钮
        this._gamePanelNode.getChildByName("adv_bg")._dX = this._gamePanelNode.getChildByName("adv_bg").width * 2;
        rightActionList.push(this._gamePanelNode.getChildByName("adv_bg"));
         
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
    setGameType: function (type) {
        if (this._gonggao && MjClient.systemConfig.rankEnable == "true")
            this._gonggao.visible = false;

        this._gameListPanelNode.visible = false;
        this._gamePanelNode.visible = true;
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
        //
        // this._joinRoom.addChild(clipper);
        //
        // var sprite = new cc.Sprite("joinGame/guangxiao.png");
        // clipper.addChild(sprite, 1);
        //
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

    //获取细分游戏类型 1:打筒子  2：字牌 3：放炮罚 4：跑得快/斗地主/霸炸弹 5：麻将
    getGameTpyeList : function(type){
        var arr = [];
        switch(type){
            case 1:
                arr = [MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG, MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA];
            break;
            case 2:
                arr = [MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI, MjClient.GAME_TYPE.SHAO_YANG_BO_PI,MjClient.GAME_TYPE.HY_SHI_HU_KA,MjClient.GAME_TYPE.HY_LIU_HU_QIANG,MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN,MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI];
            break;
            case 3:
                arr = [MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA, MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO];
            break;
            case 4:
                arr = [MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY,MjClient.GAME_TYPE.DOU_DI_ZHU_TY,MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN];
            break;
            case 5:
                arr = [MjClient.GAME_TYPE.TY_ZHUANZHUAN,MjClient.GAME_TYPE.TY_HONGZHONG,MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG,MjClient.GAME_TYPE.XIN_NING_MA_JIANG,MjClient.GAME_TYPE.CHANG_SHA];
            break;
        }

        var gameList = MjClient.gameListConfig.paohuziList; 
        for(var i = 0; i < arr.length; i++){
            var type = arr[i];
            if(gameList.indexOf(type) < 0){
                arr.splice(i,1);
                i -= 1;
            }
        }

        return arr;
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
                else {
                    // if(rtn.message)
                    // {
                    //     MjClient.showToast(rtn.message);
                    // }
                    // else
                    // {
                    //     MjClient.showToast("获取数据失败,请重新打开");
                    // }
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
                if (!err && texture&&headicon&&headicon.getParent()) {
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
                else {
                    // if(rtn.message)
                    // {
                    //     MjClient.showToast(rtn.message);
                    // }
                    // else
                    // {
                    //     MjClient.showToast("获取数据失败,请重新打开");
                    // }
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
                if (!err && texture&&headicon&&headicon.getParent()) {
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
            if (!err && texture&&_myHead&&_myHead.getParent()) {
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
    },

    /****************
        end of 排行榜
    *****************/

    fixIPhoneX : function(){
        // if(isIPhoneX()){
        //     setWgtLayout(this._gamePanelNode, [0.88, 0.88], [0.5, 0.45], [0, 0]);

        //     setWgtLayout(this._btnAdv, [120/1280 * 0.75, 0], [0.9523, 0.7886], [0,0]);
        //     // setWgtLayout(this._btntuijian, [98/1280 * 0.89, 0], [0.4646, 0.07], [0, 0]);
        //     // setWgtLayout(this._zhanji, [98/1280 * 0.89, 0], [0.3053, 0.07], [0, 0]);
        //     // setWgtLayout(this._btnShareGet, [98/1280 * 0.89, 0], [0.6622, 0.07], [0, 0]);
        //     // setWgtLayout(this._btnActive, [107/1280 * 0.89,0], [0.9016, 0.08], [0, 0]);
        //     setWgtLayout(this._youjian, [72/1280 * 0.89, 0], [0.7853, 0.9345], [0,0]);
        //     setWgtLayout(this._BtnHTP, [72/1280 * 0.89, 0], [0.8575, 0.9337], [0,0]);
        //     setWgtLayout(this._setting, [72/1280 * 0.89, 0], [0.9293, 0.9345], [0,0]);
        // }
    }

});

