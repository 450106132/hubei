// ------牌友联盟湘乡 home--------

var HomeView_qxxxghz = cc.Layer.extend({
    _btnKaiFangGift: null,
    _btnChangCiGift: null,
    _gameListPanelNode: null,
    _gamePanelNode: null,
    _joinRoom: null,
    _createRoom: null,
    _BtnReturn: null,
    _tileIcon: null,
    _myFuHaoData: null,
    _myQueShenData: null,
    _jueSeNode: null,
    ctor: function () {
        this._super();
        var homeui = ccs.load("Home.json");
        //BindUiAndLogic(homeui.node,this.jsBind);
        this.uiNode = homeui.node;
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

        this._yeziAction(_back);

        /*
        // 小姐姐
        var _roleNode = _back.getChildByName("Panel_role");
        this._roleNode = _roleNode;
        var _bgBone = createSpine("spine/home/girl/renwunv.json", "spine/home/girl/renwunv.atlas");
        _bgBone.setAnimation(0, 'animation', true);
        _bgBone.setPosition(cc.p(60, -400));
        _bgBone.setScale(0.4);
        _roleNode.addChild(_bgBone, 1);
        if (isIPhoneX()) {
            _bgBone.setScale(0.35);
            _bgBone.setPosition(cc.p(60, -370));
        }
        */

        this._jueSeNode = _back.getChildByName("juese");
        this._jueSeNode.visible = false;

        var _tilebg = homeui.node.getChildByName("tilebg");
        setWgtLayout(_tilebg, [1, 1], [0.5, 1], [0, 0]);

        var _greenTip = homeui.node.getChildByName("green_tip");
        setWgtLayout(_greenTip, [0.2, 0.2], [0.8, 0.8], [0, 0]);

        var _diBg = homeui.node.getChildByName("diBg");
        setWgtLayout(_diBg, [1, 1], [0.5, 0], [0, 0]);
        //活动按钮
        var _btnActive = homeui.node.getChildByName("btn_active");
        this._setBtnPostionAndEvent(_btnActive);

        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("game_picture/btn_huodong.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        _btnActive.addChild(clipper);
        var sprite = new cc.Sprite("game_picture/shaoguang.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(2)));
        sprite.runAction(repeatAction);
        //设置按钮
        var _btnSetting = homeui.node.getChildByName("btn_setting");
        this._setBtnPostionAndEvent(_btnSetting);
        //帮助按钮
        var _btnHelp = homeui.node.getChildByName("btn_help");
        this._setBtnPostionAndEvent(_btnHelp);
        //战绩按钮
        var _btnZhanji = homeui.node.getChildByName("btn_zhanji");
        _btnZhanji._btnZhanji = true;
        this._setBtnPostionAndEvent(_btnZhanji);
        //邮件按钮
        this._youjian = homeui.node.getChildByName("btn_youjian");
        this._youjian.visible = true;
        this._setBtnPostionAndEvent(this._youjian);
        this._youjian.getChildByName("hongDian").setVisible(false);
        this.updateYoujianCount();

        //代理按钮
        var _btnAdv = homeui.node.getChildByName("btn_daili");
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
        //         _btnAdv.loadTextureNormal("game_picture/btn_adv_show.png");
        //         bAdvShow = false;
        //     }else {
        //         bAdvShow = true;
        //         _btnAdv.loadTextureNormal("game_picture/btn_adv_normal.png");
        //     }
        // }, 0.5);
        this._setBtnPostionAndEvent(_btnAdv);
        //更多游戏按钮
        var _btnmoreGame = homeui.node.getChildByName("btn_more");
        if (MjClient.remoteCfg.guestLogin == true ||
            MjClient.systemConfig.moreGameEnable != "true" ||
            MjClient.isShenhe) {
            _btnmoreGame.visible = false;
            _btnmoreGame.setTouchEnabled(false);
        }
        _btnmoreGame.visible = true;
        this._setBtnPostionAndEvent(_btnmoreGame);
        //分享按钮
        var _btnFenXiang = homeui.node.getChildByName("btn_fenxiang");
        if (MjClient.remoteCfg.guestLogin == true) {
            _btnFenXiang.visible = false;
            _btnFenXiang.setTouchEnabled(false);
        }
        this._setBtnPostionAndEvent(_btnFenXiang); 

        var _shareTip = _btnFenXiang.getChildByName("fenxiang_tip");
        var _shareTipText = null;
        if (_shareTip) {
            _shareTipText = _shareTip.getChildByName("Text_3");
            _shareTipText.ignoreContentAdaptWithSize(true);
            _shareTipText.setString("100%中奖");
        }
        _btnFenXiang.schedule(function () {
            var lastStr = MjClient.data.pinfo.lastShareDay;
            var currentStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
            var _sprite = _btnFenXiang.getChildByName("hongDian");
            if (currentStr == lastStr) {
                _sprite.visible = false;
            }else{
                _sprite.visible = true;
            }
            if (_sprite && _shareTip)
                _shareTip.visible = _sprite.visible;
        }, 1);

        if (_shareTip) {
            _shareTip.setOpacity(0);
            _shareTip.runAction(cc.repeatForever(cc.sequence(
                cc.fadeIn(1),
                cc.repeat(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2)), 5),
                cc.fadeOut(1),
                cc.delayTime(0.5))));
        }      
        //推荐按钮
        var _btntuijian = homeui.node.getChildByName("btn_tuijian");
        this._setBtnPostionAndEvent(_btntuijian);
        //邀请码
        var _btnBinding = homeui.node.getChildByName("btn_binding");
        if (MjClient.remoteCfg.hideMoney == true) {
            _btnBinding.visible = false;
            _btnBinding.setTouchEnabled(false);
        }
        _btnBinding.setVisible(false);
        this._btnBinding = _btnBinding;
        this._setBtnPostionAndEvent(_btnBinding);
        //商城
        var _btnShop = homeui.node.getChildByName("btn_store");
        _btnShop.visible = true;
        // if(MjClient.isShenhe){
        //     _btnShop.visible = false;
        //     _btnShop.setTouchEnabled(false);
        // }
        this._btnShop = _btnShop;
        this._setBtnPostionAndEvent(_btnShop);

        if(!(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&
            !MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP){
            // _btnBinding.setVisible(true);
            // _btnShop.setVisible(false);
        }else {
            // _btnBinding.setVisible(false);
            // _btnShop.setVisible(true);
        }

        var children = _btnShop.getChildren();
        for(var index in children){
            var child = children[index];
            var seqAction = cc.Sequence.create(cc.FadeTo.create(1,0),cc.DelayTime.create(1),cc.FadeTo.create(1,255));
            child.runAction(cc.RepeatForever.create(seqAction));
        }

        //客服
        var _BtnKeFu = homeui.node.getChildByName("BtnKeFu");
        this._setBtnPostionAndEvent(_BtnKeFu);
        if (MjClient.remoteCfg.guestLogin == true) {
            _BtnKeFu.setVisible(false);
        }
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

        //实名认证
        var btnRenzheng = homeui.node.getChildByName("btnRenzheng");
        if (!btnRenzheng) {
            btnRenzheng =  new ccui.Button("game_picture/renzheng.png", "game_picture/renzheng_s.png","game_picture/renzheng_s.png");
            btnRenzheng.setName("btnRenzheng");
            btnRenzheng.addTouchEventListener(function (sender, type) {
                if (type === ccui.Widget.TOUCH_ENDED) {
                    MjClient.Scene.addChild(new shiMingRenZhengLayer());
                }
            },this)
            homeui.node.addChild(btnRenzheng);
        }
        btnRenzheng.visible = !MjClient.data.pinfo.identityNum;
        setWgtLayout(btnRenzheng, [56/1280, 0], [0.67, 0.93], [0,0]);

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
        }
        btnFriendcardInvite.visible = isAgent();
        setWgtLayout(btnFriendcardInvite, [72/1280, 0], [0.0465, 0.73], [0,0]);

        //标题
        this._tileIcon = homeui.node.getChildByName("title");
        this._setBtnPostionAndEvent(this._tileIcon);
        this._tileIcon.getChildByName("laba_bg").getChildByName("Image_2").setVisible(false);
        //头像
        var _headbg = homeui.node.getChildByName("headbg");
        this._setBtnPostionAndEvent(_headbg);
        //客服
        var _btnKefu = _headbg.getChildByName("btn_kefu");
        _btnKefu.setVisible(false);
        _btnKefu.runAction(cc.sequence(cc.rotateBy(1,-3).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(1.2,3).easing(cc.easeQuadraticActionInOut())).repeatForever());
        this._setBtnPostionAndEvent(_btnKefu);
        if (MjClient.remoteCfg.guestLogin == true) {
            _btnKefu.setVisible(false);
        }

        //退出游戏
        // this._BtnReturn = homeui.node.getChildByName("btn_return");
        // this._setBtnPostionAndEvent(this._BtnReturn);

        showHomeActivityIcon(homeui);  

        //公告
        var _gonggao = homeui.node.getChildByName("Image_gonggao");
        _gonggao.setVisible(false);
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
        }
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
                MjClient.native.umengEvent4CountWithProperty("ShangchengClick", {uid:SelfUid()});
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
        _liquanBack.visible = MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JI_FEN_SHANG_CHENG)
        var _liquan = _liquanBack.getChildByName("liquan");
        _liquan.ignoreContentAdaptWithSize(true);
        var btn_addLJ = _liquanBack.getChildByName("btn_add");
        btn_addLJ.addTouchEventListener(function(sender,type){
            if(type === 2){
                MjClient.native.umengEvent4CountWithProperty("Liquanzengjia", {uid:SelfUid()});
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

        UIEventBind(this.jsBind, _money, "loginOK", function () {
            changeAtalsForLabel(_money, MjClient.data.pinfo.money);
        });

        //游戏列表
        this._gameListPanelNode = homeui.node.getChildByName("Panel_GameList");
        //游戏
        this._gamePanelNode = homeui.node.getChildByName("Panel_game");
        this._gamePanelNode.visible = false;

        this.setGamePanel(this._gamePanelNode);
        this.setGameListPanel(this._gameListPanelNode);
        this.addQiPao(this._gamePanelNode);
        //金币场回来显示金币场界面
        if (MjClient.data && MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId){

            if(MjClient.data.sData.tData.fieldType == 1){//快速赛回到快速赛大厅
                this.showQuickMatchHall();
            }else{//金币场大厅
                if(MjClient.GoldHallLayer){
                    MjClient.GoldHallLayer.removeFromParent(true);
                }
                var goldHallLayer = new GoldHallLayer();
                this.goldHallLayer = goldHallLayer;
                this.addChild(goldHallLayer);

                MjClient.goldfield(false);
            }
        }
        return true;
    },

    addQiPao: function(gamePanelNode) {
        var qiPao = new cc.Sprite("game_picture/qipaokuang.png");
        qiPao.x = 500;
        qiPao.y = 475;
        gamePanelNode.addChild(qiPao);
        gamePanelNode.zIndex = 9999;
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
 
    _setUIPosition:function(btn){
        var name = btn.getName();
        switch(name){
            case "btn_active":
                setWgtLayout(btn, [0.15,0.15], [0.5, 0], [0, 0]);
                break;
            case "btn_setting":
                setWgtLayout(btn, [100/1280, 0], [0.94, 0.93], [0,0]);
                break;
            case "btn_help":
                setWgtLayout(btn, [100/1280, 0], [0.85, 0.93], [0,0]);
                break;
            case "btn_more":
                setWgtLayout(btn, [100/1280, 0], [0.76, 0.93], [0,0]);
                break;
            case "btn_zhanji":
                setWgtLayout(btn, [104/1280, 0], [0.735, 0.04], [0, 0]);
                break;
            case "btn_youjian":
                setWgtLayout(btn, [104/1280, 0], [0.64, 0.04], [0,0]);
                break;
            case "btn_daili":
                setWgtLayout(btn, [104/1280, 0], [0.185, 0.04], [0,0]);
                break;
            case "btn_tuijian":
                setWgtLayout(btn, [104/1280, 0], [0.875, 0.04], [0, 0]);
                break; 
            case "btn_binding":
                // setWgtLayout(btn , [104/1280, 0], [0.5, 0.0632], [0, 0]);
                break;
            case "btn_store":
                setWgtLayout(btn , [143/1280, 0], [0.11, 0.07], [0, 0]);
                break;     
            case "btn_kefu":
                // setWgtLayout(btn , [78/1280, 0], [0.025, 0.6], [0, 0]);
                break;
            case "BtnKeFu":
                setWgtLayout(btn , [104/1280, 0], [0.325, 0.04], [0, 0]);
                break;
            case "title":
                if (isIPhoneX()) {
                    setWgtLayout(btn, [0.33, 0.11], [0.5, 0.96], [0, 0]);
                } else {
                    setWgtLayout(btn, [0.33, 0.11], [0.5, 0.98], [0, 0]);
                }
                break;     
            case "headbg":
                setWgtLayout(btn, [0.088, 0.14], [0.04, 0.99], [0, 0]);
                break;   
            case "btn_fenxiang":
                setWgtLayout(btn, [100/1280, 0], [0.72, 0.86], [0,0]);
                break;
            case "btn_return":
                setWgtLayout(btn, [0.088, 0.14], [0.05, 0.75], [0,0]);
                break;     
            default:
                break;
        }
    },
        
    _setBtnPostionAndEvent:function(btn){
        var touchEvent = function(sender, enevtType){
            if(enevtType != ccui.Widget.TOUCH_ENDED){
                return;
            }
            var name = sender.getName();
            switch(name){
                case "btn_return":
                    //退出游戏按钮
                    showExitGameLayer();
                    break;
                case "btn_active":
                    //活动按钮
                    var layer = new activityLayer();
                    MjClient.Scene.addChild(layer);
                    MjClient.native.umengEvent4CountWithProperty("HuodongClick", {uid:SelfUid()});
                    break;
                case "btn_setting":
                    //设置按钮
                    var settringLayer = new SettingView("setting_common.json");
                    settringLayer.setName("HomeClick");
                    MjClient.Scene.addChild(settringLayer);
                    MjClient.native.umengEvent4CountWithProperty("ShezhiClick", {uid:SelfUid()});
                    break; 
                case "btn_help":
                    //帮助按钮
                    MjClient.openWeb({ url: null, help: true });
                    MjClient.native.umengEvent4CountWithProperty("WanfaClick", {uid:SelfUid()});
                    break;
                case "btn_zhanji":
                    //战绩按钮
                    if (!MjClient.data.sData) {
                        MjClient.Scene.addChild(new PlayLogView());
                        MjClient.native.umengEvent4CountWithProperty("ZhanjiClick", {uid:SelfUid()});
                    }else{
                        MjClient.showMsg("正在游戏中，不能查看战绩");
                    }
                    break; 
                case "btn_youjian":
                    //邮件按钮
                    var emailLayer = new EmailLayer();
                    MjClient.Scene.addChild(emailLayer);
                    MjClient.native.umengEvent4CountWithProperty("YoujianClick", {uid:SelfUid()});
                    break;  
                case "btn_daili":
                    //代理按钮

                    if (MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.myMemberId && parseInt(MjClient.data.pinfo.myMemberId) > 0) {
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
                    }else {
                        //var layer = new showAdvLayer();
                        var layer = new BindingCodeLayer3();
                        MjClient.Scene.addChild(layer);
                    }
                    break;
                case "btn_more":
                    //更多按钮
                    MjClient.native.OpenUrl(MjClient.systemConfig.moreGameUrl);
                    break;  
                case "btn_binding":
                    //推荐按钮
                    var layer = new recommendLayer_active();
                    MjClient.Scene.addChild(layer);
                    break;   
                case "btn_store":
                    //商城按钮
                    var layer = enter_store();
                    MjClient.Scene.addChild(layer);
                    MjClient.native.umengEvent4CountWithProperty("ShangchengClick", {uid:SelfUid()});
                    break;
                case "btn_kefu":
                    MjClient.Scene.addChild(new gongGaoLayer());
                    break;
                case "BtnKeFu":
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
                case "btn_fenxiang":
                    var _sprite = sender.getChildByName("hongDian");
                    MjClient.Scene.addChild(new shareTodayLayer(_sprite.visible));
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Fenxiang", {uid:SelfUid()});
                    //分享有礼
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
        };
        this._setUIPosition(btn);
        btn.addTouchEventListener(touchEvent, btn);
    },
    update:function(dt)
    {
         if(!(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&
            !MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP){
            // this._btnBinding.setVisible(true);
            // this._btnShop.setVisible(false);
        }else {
            // this._btnBinding.setVisible(false);
            // this._btnShop.setVisible(true);
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
            //this._BtnReturn.visible = false;
        }
    },
    setGamePanel: function (gamePanelNode) {
        var that = this;
        setWgtLayout(gamePanelNode, [0.95, 0.95], [0.5, 0.42], [0, 0]);
        if(isIPhoneX())
        {
            setWgtLayout(gamePanelNode, [0.85, 0.85], [0.5, 0.43], [0, 0]);
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
        jiaoBiao.setPosition(jiaoBiao.width*0.5, goldBtn.height - jiaoBiao.height*0.4);
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

        var clubEnterIcon1 = clubEnterMask.getChildByName("icon_1");
        var shaiA1 = cc.moveBy(2,cc.p(0,15)).easing(cc.easeQuadraticActionInOut());
        var shaiB1 = cc.moveBy(2,cc.p(0,-15)).easing(cc.easeQuadraticActionInOut());
        clubEnterIcon1.runAction(cc.sequence(shaiA1,shaiB1).repeatForever());

        var clubEnterIcon2 = clubEnterMask.getChildByName("icon_2");
        var shaiA2 = cc.moveBy(2,cc.p(0,-10)).easing(cc.easeQuadraticActionInOut());
        var shaiB2 = cc.moveBy(2,cc.p(0,10)).easing(cc.easeQuadraticActionInOut());
        clubEnterIcon2.runAction(cc.sequence(shaiA2,shaiB2).repeatForever());

        var _joinRoomPar =  new cc.ParticleSystem("Particle/joinRoomPar.plist");
        _joinRoomPar.setPosition(clubEnter.getContentSize().width/2, clubEnter.getContentSize().height/3);
        _joinRoomPar.setScale(1);
        clubEnter.addChild(_joinRoomPar,0);

        //添加第三方应用
        COMMON_UI.addHomeAdvMode(advBgNode);

        /*
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


        // 排行榜
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
       
        // 设置点击放大效果
        this.setToucheffect(this._goldFieldBtn, goldFieldMask);
        this._goldFieldBtn.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
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

        var yanSprite = clubEnter.getChildByName("yan");
        var percent = 100;
        yanSprite.setPercent(percent);
        
        // var callFunc = cc.CallFunc.create(function(){
        //     if(percent >= 100){
        //         percent = 0;
        //     }
        //     percent += 2;
        //     yanSprite.setPercent(percent);
        //     if(percent >= 100){
        //         yanSprite.runAction(cc.DelayTime.create(3));
        //     }
        // });
        // var delayAction1 = cc.DelayTime.create(0.05);
        // var seqAction = cc.Sequence(delayAction1,callFunc);
        // yanSprite.runAction(cc.RepeatForever.create(seqAction));
        
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

    },
    showQuickMatchHall: function(){
        if(MjClient.goldMatchHallLayer){
            MjClient.goldMatchHallLayer = null;
            MjClient.goldMatchHallLayer.removeFromParent(true);
        }
        var goldMatchHallLayer = new GoldMatchHallLayer();
        this.goldMatchHallLayer = goldMatchHallLayer;
        this.addChild(goldMatchHallLayer);
        MjClient.goldfield_quick(true);
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

        //dX,dY是增加偏移
        var bottomActionList = [];

        var leftActionList = [];

        // this._roleNode._dX = this._roleNode.width * 0.6;
        // leftActionList.push(this._roleNode);
        
        leftActionList.push(this._gamePanelNode.getChildByName("Panel_left"));
        var rightActionList = [];
        rightActionList.push(this._gamePanelNode.getChildByName("adv_bg"));
        // rightActionList.push(this._gamePanelNode);

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
            MjClient.goldHallLayer = goldHallLayer;
            MjClient.Scene.addChild(goldHallLayer);

        }.bind(this))));
    },
    setToucheffect: function (btn, container) {
        btn.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function() {
            container.setScale(btn.getRendererNormal().getScale());
        })).repeatForever());
    },
    showJinbiView:function () {
        goldField_start();
    },
    setGameType: function (type) {
        if (this._gonggao && MjClient.systemConfig.rankEnable == "true")
            this._gonggao.visible = false;

        this._gameListPanelNode.visible = false;
        this._gamePanelNode.visible = true;
        this._jueSeNode.visible = true;
        MjClient.gameClass = type;
        cc.log("=================type =  " + type);

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

    //获取细分游戏类型 1:打筒子  2：字牌 3：斗地主 4：跑得快 5：麻将
    getGameTpyeList : function(type){
        var arr = [];
        switch(type){
            case 1:
                arr = [MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG];
            break;
            case 2:
                arr = [MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI, MjClient.GAME_TYPE.SHAO_YANG_BO_PI];
            break;
            case 3:
                arr = [MjClient.GAME_TYPE.DOU_DI_ZHU_TY];
            break;
            case 4:
                arr = [MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY];
            break;
            case 5:
                arr = [MjClient.GAME_TYPE.TY_ZHUANZHUAN];
            break;
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

    _yeziAction:function(parent){
        var posArr = [];
        var array = [];
        var size = parent.getCustomSize();
        var width = size.width;
        var height = size.height;
        var y_endRange = [height/4,height/2];
        var dropAction = function(sprite){
            var pos = sprite.getPosition();
            var moveAction = cc.MoveBy.create(5,cc.p(0,height/2 - pos.y));
            var callFunc1 = cc.CallFunc.create(function(){
                sprite.setVisible(false);
            });
            var delayAction = cc.DelayTime.create(3);
            var callFunc2 = cc.CallFunc.create(function(){
                sprite.setPosition(createPosition());
                sprite.setVisible(true);
                dropAction(sprite);
            });
            sprite.runAction(cc.Sequence.create(moveAction,callFunc1,delayAction,callFunc2));
        };

        var createYeZi = function(){
            sprite = new cc.Sprite();
            sprite.initWithSpriteFrame(array[0]);
            spriteArr.push(sprite);
            var pos = createPosition();
            cc.log(JSON.stringify(pos));
            sprite.setPosition(pos);
            dropAction(sprite);
            parent.addChild(sprite,99);
        };

        var createPosition = function(){
            var x = Math.random() * width;
            x = x < 20 ? 20 : x;
            var y = height - Math.random()*height/4;
            return cc.p(x,y);
        };

        cc.spriteFrameCache.addSpriteFrames("joinGame/yezi.plist","joinGame/yezi.png");
        for(var i = 1; i < 5; i++)
        {
            var frame = cc.spriteFrameCache.getSpriteFrame("ye" + i + ".png");
            if(frame)
            {
                array.push(frame);
            }
        }

        var spriteArr = [];
        var sprite = null;
        for(var i = 1; i <= 5;i++){ 
            createYeZi();
        }
    }
});

