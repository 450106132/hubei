/**
 * Created by sking on 2017/5/20.
 */

var storeLayer1 = cc.Layer.extend({
    _payNode1:null,
    _payNode3:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("StoreLayer.json");
        this.addChild(UI.node);
        var that = this;
        MjClient.storeLayer = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var diBg = UI.node.getChildByName("img_bg");
        if (diBg) {
            setWgtLayout(diBg,[1, 1], [0.5, 0.5], [0, 0], true);
        }

        var _back = UI.node.getChildByName("back");

        var _girl = UI.node.getChildByName("Image_girl");
        if(_girl)
        {
            //setWgtLayout(_back,[0.92, 0.92], [0.62, 0.49], [0, -0.02]);
            setWgtLayout(_girl,[0.88, 0.88], [0.12, 0], [0, 0]);
        }

        // 晋中、永州换皮
        if (MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) 
        {
            setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0],true);
            //樱花
            var starParticle1 =  new cc.ParticleSystem("Particle/particle_texture.plist");
            starParticle1.setPosition(-20, _back.getContentSize().height+10);
            starParticle1.setScale(1.5);
            starParticle1.setTotalParticles(6);
            _back.addChild(starParticle1,0);
        }
        // 岳阳换皮
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0]);
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
            setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0]);

            var starParticle1 =  new cc.ParticleSystem("ui/Particle/particle_texture.plist");
            starParticle1.setPosition(_back.getContentSize().width*0.05, 60);
            starParticle1.setScale(0.8);
            starParticle1.setTotalParticles(50);
            _back.addChild(starParticle1,10);   


            var starParticle2 =  new cc.ParticleSystem("ui/Particle/particle_texture.plist");
            starParticle2.setPosition(_back.getContentSize().width*0.95, 60);
            starParticle2.setScale(0.8);
            starParticle2.setTotalParticles(50);
            _back.addChild(starParticle2,10);
        }
        else {
            setWgtLayout(_back,[0.92, 0.92], [0.5, 0.49], [0, -0.02]);
            if(isIpadSize()) {
                setWgtLayout(_back,[0.7, 0.7], [0.62, 0.49], [0, -0.02]);
            }
        }

        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);


        this._payNode1 =  _back.getChildByName("Node_pay1");
        this._payNode1.setVisible(false);
        var _payNode2 =  _back.getChildByName("Node_pay2");
        this._payNode3 =  _back.getChildByName("Node_pay3");
        var title_huodong = _back.getChildByName("title_huodong");
        if(title_huodong){
            title_huodong.setVisible(false);
        }
        _payNode2.setVisible(false);
        if(this._payNode3){
            this._payNode3.setVisible(false);
        }

        // 晋中换皮
        var _Text_goldCount = this._payNode1.getChildByName("Text_goldCount");
        if (isJinZhongAPPType()) {
            var _goldBg = _back.getChildByName("goldBg");
            _Text_goldCount = _goldBg.getChildByName("Text_goldCount");
            setWgtLayout(_goldBg, [0.12, 0.12], [0.83, 1], [0, 0], false,true);
        }



        _Text_goldCount.setString("0");


        if(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.money)
        {
            _Text_goldCount.setString(MjClient.data.pinfo.money);
        }

        _Text_goldCount.ignoreContentAdaptWithSize(true);


        _Text_goldCount.schedule(function(){
            var icurrentMoney = parseInt(_Text_goldCount.getString());
            if(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.money)
            {
                var lastMoney = parseInt(MjClient.data.pinfo.money);
                if(lastMoney > icurrentMoney)
                {
                    //成功后，加粒子效果
                    var starParticle =  new cc.ParticleSystem("Particle/diamondtail.plist");
                    starParticle.setPosition(_Text_goldCount.getContentSize().width/2, _Text_goldCount.getContentSize().height/2);
                    _Text_goldCount.addChild(starParticle);
                    _Text_goldCount.runAction(cc.sequence(cc.scaleTo(1,1.5).easing(cc.easeBackOut()),cc.scaleTo(0.3,1)));
                }
                _Text_goldCount.setString(MjClient.data.pinfo.money);
            }
        },1);

        var _close = _back.getChildByName("close");
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            //利用代理按钮
            _close.setEnabled(false);
            var scale = _close.scale;
            var y = _close.y;
            var pnlClose = _back.getChildByName("pnl_close");
            pnlClose.setTouchEnabled(true)
            pnlClose.addTouchEventListener(function (sender, type) {
                switch (type) {
                    case ccui.Widget.TOUCH_BEGAN:
                        _close.setScale(scale * 0.95);
                        _close.y += 5;
                        break;
                    case ccui.Widget.TOUCH_CANCELED:
                        _close.setScale(scale);
                        _close.y -= 5;
                        break;
                    case ccui.Widget.TOUCH_ENDED:
                        that.removeFromParent();
                        break;
                    default :
                        break;
                }
            }, this);
        } else {
            _close.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Close", {uid:SelfUid()});
                    that.removeFromParent();
                }
            }, this);
        }

        var btn_tousu = _back.getChildByName("btn_tousu");
        if(btn_tousu){
            btn_tousu.addTouchEventListener(function (sender, type) {
                if (type == 2) {
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
                    
                }
            }, this);
        }
        


        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            var btnBangdingyouli = _back.getChildByName("btn_bangdingyouli");
            var scale = btnBangdingyouli.scale;
            var y = btnBangdingyouli.y
            btnBangdingyouli.setEnabled(false);
            var pnlBind = _back.getChildByName("pnl_bind");
            pnlBind.setTouchEnabled(true)
            if(btnBangdingyouli){
                UIEventBind(null, btnBangdingyouli, "bangdingyouliVisibleFalse", function () {
                    btnBangdingyouli.setVisible(false);
                    pnlBind.setVisible(false);
                })

                btnBangdingyouli.setVisible(false);
                pnlBind.setVisible(false);
                pnlBind.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_BEGAN:
                            btnBangdingyouli.setScale(scale * 0.95);
                            btnBangdingyouli.y += 5;
                            break;
                        case ccui.Widget.TOUCH_CANCELED:
                            btnBangdingyouli.setScale(scale);
                            btnBangdingyouli.y -= 5;
                            break;
                        case ccui.Widget.TOUCH_ENDED:
                            btnBangdingyouli.setScale(scale);
                            btnBangdingyouli.y -= 5;
                            var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
                            {
                                //that.removeFromParent();
                            });
                            UI.node.addChild(layer);
                            break;
                        default :
                            break;
                    }
                }, this);
            }


            var isShowBind = !(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&!MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP;
            if(isAgent() && isShowBind)
            {
                /*
                 没有绑定
                 */
                btnBangdingyouli.setVisible(true);
                pnlBind.setVisible(true);
                var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
                {
                    //that.removeFromParent();
                });
                that.addChild(layer);

            }
        }
        else {
            var btnBangdingyouli = _back.getChildByName("btn_bangdingyouli");
            if(btnBangdingyouli){
                UIEventBind(null, btnBangdingyouli, "bangdingyouliVisibleFalse", function () {
                    btnBangdingyouli.setVisible(false);
                })

                btnBangdingyouli.setVisible(false);
                btnBangdingyouli.addTouchEventListener(function (sender, type) {
                    if (type == 2) {
                        var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
                        {
                            //that.removeFromParent();
                        });
                        that.addChild(layer);
                    }
                }, this);
            }
        }

        
        var isShowBind = !(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&!MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP;
        if(isAgent() && isShowBind)
        {
            /*
             没有绑定
             */
            btnBangdingyouli.setVisible(true);
            var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
            {
                //that.removeFromParent();
            });
            that.addChild(layer);

        }

        //未实名认证弹实名认证
        var pinfo = MjClient.data.pinfo;
        if(!pinfo.identityNum && MjClient.systemConfig.shiMingRenZhengStore == "true"){
            that.addChild(new shiMingRenZhengLayer());
        }

        function touchEventFun(sender,type)
        {
            if(type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Buy", {uid:SelfUid()});
                
                ////成功后，加粒子效果
                //var starParticle =  new cc.ParticleSystem("Particle/diamondtail.plist");
                //starParticle.setPosition(_Text_goldCount.getContentSize().width/2, _Text_goldCount.getContentSize().height/2);
                //_Text_goldCount.addChild(starParticle);
                //_Text_goldCount.runAction(cc.sequence(cc.scaleTo(1,1.5).easing(cc.easeBackOut()),cc.scaleTo(0.3,1)));

                if(!MjClient.systemConfig ||!MjClient.systemConfig.recharge)
                {
                    return MjClient.showToast("获取支付数据失败");
                }

                var itagID = sender.getTag();
                if (MjClient.systemConfig.recharge.length > 1) {
                    cc.log("rechange 长度 > 1 " + itagID);
                    MjClient.Scene.addChild(new payWayLayer(function(platform){
                        that.recharge(itagID, parseInt(platform));
                    }));
                }
                else {
                    that.recharge(itagID, parseInt(MjClient.systemConfig.recharge[0].platform))
                }
            }
        }


        MjClient.getRechargeLadder(function () {
            if (!cc.sys.isObjectValid(that)) {
                return;
            }
            this._payNode1.setVisible(true);
            if(title_huodong){
                title_huodong.setVisible(true);
            }
            for(var i = 0;i < MjClient.rechargeLadder.length;i++)
            {
                var _itemNode =  this._payNode1.getChildByName("bg_item_" + i);
                if(!_itemNode)
                {
                    continue;
                }
                _itemNode.visible = true;
                _itemNode.addTouchEventListener(touchEventFun,this);


                var _data =  MjClient.rechargeLadder[i];
                _itemNode.setTag(_data.id);


                var _itemIcon = _itemNode.getChildByName("Image_3");
                // _itemIcon.loadTexture("store/yuanbao_" + (i + 1) + ".png");

                if(_data.image)
                {
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        _itemIcon.loadTexture("store/yuanbao_" + (i + 1) + ".png");
                    }else{
                        this.setItemImage(_data.image,_itemIcon);
                    }
                }

                if(!isYongZhouProject()){
                    _itemIcon.ignoreContentAdaptWithSize(true);
                }
                
                var text49 = _itemNode.getChildByName("Text_49");
                if(text49) {
                    text49.setLocalZOrder(201);
                    text49.ignoreContentAdaptWithSize(true);
                }
                var _moneyNode = _itemNode.getChildByName("Text_1");
                _moneyNode.setString(_data.money + "个");
                _moneyNode.setLocalZOrder(201);
                if(_data.discountAmount && _data.total){
                    _moneyNode.setString(_data.total + "个");
                }
                _moneyNode.ignoreContentAdaptWithSize(true);

                var textMoneyDiscount = _itemNode.getChildByName("Text_money_discount");
                if(textMoneyDiscount){
                    textMoneyDiscount.ignoreContentAdaptWithSize(true);
                    textMoneyDiscount.setLocalZOrder(201);
                    if(_data.discountAmount){
                        textMoneyDiscount.setVisible(true);
                        var str = "原价";
                        textMoneyDiscount.setString(str+Number(_data.amount)+"元");
                    }else {
                        textMoneyDiscount.setVisible(false);

                    }
                }

                var _Image_hot = _itemNode.getChildByName("Image_hot");
                _Image_hot.visible = false;
                // 晋中换皮
                if (isJinZhongAPPType()) {
                    _Image_hot.zIndex = 200;
                }
                if(i  == 0)
                {
                    _Image_hot.visible = true;
                }

                if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                    var _amountNode = _itemNode.getChildByName("Text_money");
                    if(_data.discountAmount){
                        _amountNode.setString(Number(_data.discountAmount) + "元");
                    }else {
                        _amountNode.setString(Number(_data.amount) + "元");
                    }
                    _amountNode.ignoreContentAdaptWithSize(true);
                }
                else {
                    var _btn = _itemNode.getChildByName("Button_1");
                    var _amountNode = _btn.getChildByName("Text_money");
                    if(_data.discountAmount){
                        _amountNode.setString(Number(_data.discountAmount) + "元");
                    }else {
                        _amountNode.setString(Number(_data.amount) + "元");
                    }

                    _amountNode.ignoreContentAdaptWithSize(true);
                }

                //if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || isJinZhongAPPType()){
                    if(_data.discountAmount)
                    {
                        var Draw = new cc.DrawNode();
                        Draw.drawSegment(cc.p(20, textMoneyDiscount.height), cc.p(textMoneyDiscount.width-20, 0), 1.5, cc.color("#FF0000"));
                        textMoneyDiscount.addChild(Draw);
                    }
                //}

                if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)//牌友联盟江苏麻将
                {
                    if(parseInt(_data.money) == parseInt(_data.present)&&MjClient.remoteCfg.guestLogin == false)
                    {
                        _Image_hot.loadTexture("store/shuangbei.png");
                        _Image_hot.ignoreContentAdaptWithSize(true);
                        _Image_hot.setScale(1.5);
                        _Image_hot.visible = true;
                    }
                }

                var text5 = _back.getChildByName("Text_5");
                if(text5){
                    if(_data.discountAmount){
                        text5.setVisible(true)
                    }else {
                        text5.setVisible(false)
                    }
                }
            }

            if(MjClient.rechargeLadder.length == 0)
            {
                this._payNode1.visible = false;
                _payNode2.visible = true;
            }
            else
            {
                this._payNode1.visible = true;
                _payNode2.visible = false;
            }

            var title_shop = _back.getChildByName("title_shop");
            if (title_shop && title_huodong) {//初始化
                this._payNode3.visible = false;
                this._payNode1.visible = true;
                title_shop.visible = true;
                title_huodong.visible = false;
            }
            // 条件 控制
            if (title_shop && title_huodong && this._payNode3 && !MjClient.remoteCfg.guestLogin && MjClient.systemConfig.fudaiEnable  == "true") {
                title_shop.visible = false;
                title_huodong.visible = true;
                var btn_fudai = title_huodong.getChildByName("btn_fudai");
                var btn_shop = title_huodong.getChildByName("btn_shop");

                btn_fudai.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        btn_fudai.setOpacity(255);
                        btn_shop.setOpacity(0);
                        this._payNode3.visible = true;
                        this._payNode1.visible = false;
                    }
                }, this);

                btn_shop.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        btn_fudai.setOpacity(0);
                        btn_shop.setOpacity(255);
                        this._payNode3.visible = false;
                        this._payNode1.visible = true;
                    }
                }, this);
                btn_fudai.setOpacity(255);
                btn_shop.setOpacity(0);
                this._payNode3.visible = true;
                this._payNode1.visible = false;

                var _btn = this._payNode3.getChildByName("btn_fudai");
                _btn.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        this.recharge(null, parseInt(MjClient.systemConfig.recharge[0].platform), 5);
                    }

                }, this);
                var _btn_1 = this._payNode3.getChildByName("btn_fudai_1");
                _btn_1.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        this.recharge(null, parseInt(MjClient.systemConfig.recharge[0].platform), 10);
                    }

                }, this);
                // MjClient.data.pinfo.limitMoney Text_fudaiCount
                var Text_fudaiCount = this._payNode3.getChildByName("Text_fudaiCount");
                Text_fudaiCount.setString("0");
                Text_fudaiCount.ignoreContentAdaptWithSize(true);

                if (MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.limitMoney)
                    Text_fudaiCount.setString(MjClient.data.pinfo.limitMoney);
                UIEventBind(null, Text_fudaiCount, "updateInfo", function () {

                    var icurrentMoney = parseInt(Text_fudaiCount.getString());
                    var lastMoney = parseInt(MjClient.data.pinfo.limitMoney);
                    if (lastMoney > icurrentMoney) {
                        //成功后，加粒子效果
                        var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                        starParticle.setPosition(Text_fudaiCount.getContentSize().width / 2, Text_fudaiCount.getContentSize().height / 2);
                        Text_fudaiCount.addChild(starParticle);
                        Text_fudaiCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
                    }
                    Text_fudaiCount.setString(MjClient.data.pinfo.limitMoney);
                });
                Text_fudaiCount.schedule(function() {
                    var icurrentMoney = parseInt(Text_fudaiCount.getString());
                    if (MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.limitMoney) {
                        var lastMoney = parseInt(MjClient.data.pinfo.limitMoney);
                        if (lastMoney > icurrentMoney) {
                            //成功后，加粒子效果
                            var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                            starParticle.setPosition(Text_fudaiCount.getContentSize().width / 2, Text_fudaiCount.getContentSize().height / 2);
                            Text_fudaiCount.addChild(starParticle);
                            Text_fudaiCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
                        }
                        Text_fudaiCount.setString(MjClient.data.pinfo.limitMoney);
                    }
                }, 1);
            }

            var btnRechage = _payNode2.getChildByName("BtnRechage");
            btnRechage.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    //todo...
                    cc.log("按钮充值----------");
                    var _gongzhognhao = "" + MjClient.systemConfig.gongzhonghao;
                    MjClient.showMsg("添加微信公众号:" + _gongzhognhao + " 进行充值\n点击\"确定\"按钮即可复制微信公众号。",
                        function() {
                            MjClient.showToast("复制公众号成功,前往微信添加公众号！");
                            MjClient.native.doCopyToPasteBoard("" + _gongzhognhao);
                            MjClient.native.openWeixin();
                        });
                }
            }, this);
            var a = cc.scaleTo(1, 0.8);
            var a1 = cc.scaleTo(0.8, 1);
            btnRechage.runAction(cc.sequence(a, a1).repeatForever());

            this.scheduleUpdate();
        }.bind(this));
    },
    setItemImage : function(url,sp){
        if (!url) return;
        cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
            if (!err && texture&&cc.sys.isObjectValid(sp)) {

                var _sprite = new cc.Sprite(texture);
                _sprite.setPosition(sp.getPosition());
                sp.setVisible(false);
                sp.getParent().addChild(_sprite);

            }
        });
    },
    setPresetNodeText:function(index, text)
    {
        var _data =  MjClient.rechargeLadder[index];
        var itemNode0 = this._payNode1.getChildByName("bg_item_" + index);
        if(!itemNode0) return;
        var _Image_hot = itemNode0.getChildByName("Image_hot");

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)//牌友联盟江苏麻将
        {
            if(parseInt(_data.money) == parseInt(_data.present)&&MjClient.remoteCfg.guestLogin == false)
            {
                _Image_hot.loadTexture("store/shuangbei.png");
                _Image_hot.ignoreContentAdaptWithSize(true);
                _Image_hot.setScale(1.5);
                _Image_hot.visible = true;
            }
            else
            {
                _Image_hot.visible = false;
            }
        }

        if(index  == 0)
        {
            _Image_hot.visible = true;
        }


        //折扣值
        // if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)
        // {
        //     var _offVaule =  (_data.amount/_data.money)*10;
        //     _offVaule = _offVaule.toFixed(1);
        //     if(!_Image_hot.getChildByName("offText"))
        //     {
        //         var _offIext = new ccui.Text();
        //         _offIext.setString(_offVaule + "折");
        //         _offIext.setFontSize(26);
        //         _offIext.setName("offText");
        //         _Image_hot.addChild(_offIext);
        //         _offIext.setPosition(cc.p(_Image_hot.getContentSize().width/2,_Image_hot.getContentSize().height/2))
        //         _Image_hot.loadTexture("store/sale.png");
        //         _Image_hot.setScale(1.3);
        //         _Image_hot.setVisible(true);
        //     }
        //     else
        //     {
        //         _Image_hot.getChildByName("offText").setString(_offVaule + "折");
        //     }
        // }
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            var _presentNode = itemNode0.getChildByName("Text_song");
            var songBg = itemNode0.getChildByName("Image_8");
             _presentNode.ignoreContentAdaptWithSize(true);
             _presentNode.setString("送" + text + "元宝");
            if(_data.discountAmount){
                songBg.setVisible(false);
                _presentNode.setVisible(false);
            }else {
                if(text == "")
                {
                    songBg.visible = false;
                }
            }
        } else {
            var _presentNode = itemNode0.getChildByName("Text_song");
            _presentNode.ignoreContentAdaptWithSize(true);
            _presentNode.zIndex = 101;
            _presentNode.setString(text);
            var _Image_song = itemNode0.getChildByName("Image_song");
            if(_Image_song){
                _Image_song.zIndex = 100;
                if(text == "")
                {
                    _Image_song.visible = false;
                }
                else
                {
                    _Image_song.visible = true;
                }
            }
            if(_data.discountAmount){
                _presentNode.setVisible(false);
                if(_Image_song) {
                    _Image_song.setVisible(false);
                }
            }
        }
    },
    update:function(dt)
    {
         for(var i = 0;i < MjClient.rechargeLadder.length; i++)
         {
             this.setPresetNodeText(i, MjClient.rechargeLadder[i].title);
         }
    },
    recharge:function(itemId,platform,limitMoney)
    {
        var _sys = "android";
        if( cc.sys.os == cc.sys.OS_IOS)
        {
            _sys = "ios";
        }
        var _data = {};
        if (!limitMoney || isYongZhouProject()) {
            _data = {ladderId:itemId, os:_sys,platform:platform, appid:MjClient.native.GetPackageName(), wx_appid: MjClient.native.getNativeConfig().wx_appId||""};
            MjClient.native.umengEvent4CountWithProperty("ShangchengShangpinClick", {uid:SelfUid(), type:"yuanbao", ladderId:itemId});
        }else{
            _data = {limitMoney:limitMoney, os:_sys,platform:platform, appid:MjClient.native.GetPackageName(), wx_appid: MjClient.native.getNativeConfig().wx_appId||""};
            MjClient.native.umengEvent4CountWithProperty("ShangchengShangpinClick", {uid:SelfUid(), type:"fudai", limitMoney:limitMoney});
        }
         

        MjClient.block();

        MjClient.gamenet.request("pkplayer.handler.recharge",_data,
            function(rtn)
            {
                cc.log(" ====== pkplayer.handler.recharge : ",JSON.stringify(rtn));
                if(rtn.code == 0)
                {
                    MjClient.onRecharge(rtn.data);
                }
                else
                {
                    if(rtn.message)
                    {
                        MjClient.showToast(rtn.message);
                    }
                }
                MjClient.unblock();
            }
        );
    }

});

/**
 * 连云港 新商城，金币，元宝
 */
var storeLayer2 = cc.Layer.extend({
    _yuanbaNode:null,
    _jinbiNode:null,
    _index:0,//进来的展示页面，0元宝，1金币
    ctor: function (index) {
        this._super();
        var UI = ccs.load("StoreLayer_0.json");
        this.addChild(UI.node);
        var that = this;
        if (typeof(index) != "undefined"){ 
            this._index = index;
        }
        //默认展示元宝界面  金币场修改
        this._index = 0;
        
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0]);


        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

        this._yuanbaNode =  _back.getChildByName("Node_yuanbao");
        this._jinbiNode =  _back.getChildByName("Node_jinbi");
        this.showTab(-1);

        var _Text_yuanbaoCount = null;
        var _Text_jinbiCount = null;
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            _Text_yuanbaoCount = _back.getChildByName("Text_goldCount");
            _Text_jinbiCount = _back.getChildByName("Text_goldCount_jinbi");
        }
        else {
            _Text_yuanbaoCount = this._yuanbaNode.getChildByName("Text_goldCount");
            _Text_jinbiCount = this._jinbiNode.getChildByName("Text_goldCount");
        }

        // 自适应显示
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            this._back = _back;
            this.adaptation(); 
        }

        _Text_yuanbaoCount.setString("0");
        _Text_jinbiCount.setString("0");

        if(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.money)
        {
            _Text_yuanbaoCount.setString(MjClient.data.pinfo.money);
            _Text_jinbiCount.preValue = MjClient.data.pinfo.gold;
            _Text_jinbiCount.setString(getJinbiStr(MjClient.data.pinfo.gold));
        }else{
            _Text_jinbiCount.preValue = 0;
        }

        _Text_yuanbaoCount.ignoreContentAdaptWithSize(true);
        _Text_jinbiCount.ignoreContentAdaptWithSize(true);

        UIEventBind(null, _Text_yuanbaoCount, "updateInfo", function () {
            var icurrentMoney = parseInt(_Text_yuanbaoCount.getString());
            var lastMoney = parseInt(MjClient.data.pinfo.money);
            if (lastMoney > icurrentMoney) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(_Text_yuanbaoCount.getContentSize().width / 2, _Text_yuanbaoCount.getContentSize().height / 2);
                _Text_yuanbaoCount.addChild(starParticle);
                _Text_yuanbaoCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            _Text_yuanbaoCount.setString(MjClient.data.pinfo.money+"");
        });
        UIEventBind(null, _Text_jinbiCount, "updateInfo", function () {
            var icurrentMoney = _Text_jinbiCount.preValue;
            var lastMoney = parseInt(MjClient.data.pinfo.gold);
            if (lastMoney > icurrentMoney) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(_Text_jinbiCount.getContentSize().width / 2, _Text_jinbiCount.getContentSize().height / 2);
                _Text_jinbiCount.addChild(starParticle);
                _Text_jinbiCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            _Text_jinbiCount.setString(getJinbiStr(MjClient.data.pinfo.gold));
            _Text_jinbiCount.preValue = MjClient.data.pinfo.gold;
        });

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Close", {uid:SelfUid()});
                that.removeFromParent();
            }
        }, this);

        var btn_tousu = _back.getChildByName("btn_tousu");
        if(btn_tousu){
            btn_tousu.addTouchEventListener(function (sender, type) {
                if (type == 2) {
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
                    
                }
            }, this);
        }

        var Button_jinbi_tab = null, Button_yuanbao_tab = null;
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            Button_jinbi_tab = _back.getChildByName("Button_jinbi_tab");
            Button_yuanbao_tab = _back.getChildByName("Button_yuanbao_tab");
        }
        else {
            Button_jinbi_tab = this._yuanbaNode.getChildByName("Button_jinbi_tab");
            Button_yuanbao_tab = this._jinbiNode.getChildByName("Button_yuanbao_tab");
        }
        
        Button_jinbi_tab.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Coin", {uid:SelfUid()});
                this.showTab(1);
            }
        }, this);

        Button_yuanbao_tab.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold", {uid:SelfUid()});
                this.showTab(0);
            }
        }, this);

        var btnBangdingyouli = _back.getChildByName("btn_bangdingyouli");
        if(btnBangdingyouli){
            UIEventBind(null, btnBangdingyouli, "bangdingyouliVisibleFalse", function () {
                btnBangdingyouli.setVisible(false);
            })

            btnBangdingyouli.setVisible(false);
            btnBangdingyouli.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
                    {
                        //that.removeFromParent();
                    });
                    that.addChild(layer);
                }
            }, this);
        }


        var isShowBind = !(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&!MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP;
        if(isAgent() && isShowBind)
        {
            btnBangdingyouli.setVisible(true);
            this.setBindView(MjClient.data.pinfo.bindHistory);
            this.showIsBindUi(true);
            var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
            {
                //that.removeFromParent();
            });
            that.addChild(layer);
        }else{
            this.showIsBindUi(true)
        }

        //未实名认证弹实名认证
        var pinfo = MjClient.data.pinfo;
        if(!pinfo.identityNum && MjClient.systemConfig.shiMingRenZhengStore == "true"){
            that.addChild(new shiMingRenZhengLayer());
        }

        this.touchEventFun = function touchEventFun(sender,type)
        {
            if(type == 2)
            {
                ////成功后，加粒子效果
                //var starParticle =  new cc.ParticleSystem("Particle/diamondtail.plist");
                //starParticle.setPosition(_Text_goldCount.getContentSize().width/2, _Text_goldCount.getContentSize().height/2);
                //_Text_goldCount.addChild(starParticle);
                //_Text_goldCount.runAction(cc.sequence(cc.scaleTo(1,1.5).easing(cc.easeBackOut()),cc.scaleTo(0.3,1)));

                if (this._index == 0)
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Buy", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Coin_Buy", {uid:SelfUid()});

                if(!MjClient.systemConfig ||!MjClient.systemConfig.recharge)
                {
                    return MjClient.showToast("获取支付数据失败");
                }

                var itagID = sender.getTag();
                if (MjClient.systemConfig.recharge.length > 1) {
                    cc.log("rechange 长度 > 1 " + itagID);
                    MjClient.Scene.addChild(new payWayLayer(function(platform){
                        MjClient.recharge(itagID, parseInt(platform));
                    }, this._index == 0 ? "gold" : "coin"));
                }
                else {
                    MjClient.recharge(itagID, parseInt(MjClient.systemConfig.recharge[0].platform))
                }
            }
        }
        if(this._index == 0){
            this.getYuanBaoTabData()
            this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function()
            {
                that.getJinbiTabData()
            })));
        }else{
            this.getJinbiTabData()
            this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function()
            {
                that.getYuanBaoTabData()
            })));
        }
        
        var text5 = _back.getChildByName("Text_5");
        if(text5){
                text5.setVisible(false)
        }
    },
    adaptation: function() {    // 自适应显示
        var back = this._back;
        var childrens = back.getChildren();

        if (MjClient.size.width / MjClient.size.height > back.width / back.height) {
            var a = (MjClient.size.width / MjClient.size.height) / (back.width / back.height);
            back.width *= a;
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                back.getChildByName("bg_image").width *= a;
                // back.getChildByName("bg_image").x *= a;
                back.getChildByName("Image_1").width *= a;
                back.getChildByName("Image_2").width *= a;
                back.getChildByName("Text_goldCount").width *= a;
                back.getChildByName("Text_goldCount_jinbi").width *= a;
                back.getChildByName("jinbi_icon").width *= a;
                back.getChildByName("yuanbao_1_1").width *= a;
            }
            for (var i = 0; i < childrens.length; i++) {
                if (childrens[i]) {
                    childrens[i].x *= a;
                }
            }

        } else {
            var a = (back.width / back.height) / (MjClient.size.width / MjClient.size.height);
            back.height *= a;
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                back.getChildByName("bg_image").height *= a;
                // back.getChildByName("bg_image").y *= a;
                back.getChildByName("Image_1").height *= a;
                back.getChildByName("Image_2").height *= a;
                back.getChildByName("Text_goldCount").height *= a;
                back.getChildByName("Text_goldCount_jinbi").height *= a;
                back.getChildByName("jinbi_icon").height *= a;
                back.getChildByName("yuanbao_1_1").height *= a;
            }
            for (var i = 0; i < childrens.length; i++) {
                if (childrens[i]) {
                    childrens[i].y *= a;
                }
            }
        }
    },
    getJinbiTabData:function () {
        var that = this;
        MjClient.getJinbiRechargeLadder(function () {
            if (!cc.sys.isObjectValid(that)) {
                return;
            }
            this.showTab(this._index);

            for(var i = 0;i < MjClient.rechargeLadderJinbi.length;i++)
            {
                var _itemNode =  this._jinbiNode.getChildByName("bg_item_" + i);
                if(!_itemNode)
                {
                    continue;
                }
                if(!_itemNode.truePosiTion){
                    _itemNode.truePosiTion = _itemNode.getPosition();
                }
                _itemNode.visible = true;
                _itemNode.addTouchEventListener(this.touchEventFun,this);


                var _data =  MjClient.rechargeLadderJinbi[i];
                _itemNode.setTag(_data.id);


                var _itemIcon = _itemNode.getChildByName("Image_3");
                // _itemIcon.loadTexture("store/yuanbao_" + (i + 1) + ".png");

                if(_data.image)
                {
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ 
                        && (!(!_data.title || _data.title == "") || _data.discountAmount)) {
                        _itemIcon.y = 150;
                    }
                    this.setItemImage(_data.image,_itemIcon);
                }
                _itemIcon.ignoreContentAdaptWithSize(true);

                var _moneyNode = _itemNode.getChildByName("Text_1");
                _moneyNode.setString(_data.money + (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ? "个金币":""));
                _moneyNode.setLocalZOrder(201);
                if(_data.discountAmount && _data.total){
                    _moneyNode.setString(_data.total + (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ? "个金币":""));
                }
                _moneyNode.ignoreContentAdaptWithSize(true);

                var _presentNode = _itemNode.getChildByName("Text_song");
                _presentNode.ignoreContentAdaptWithSize(true);
                _presentNode.zIndex = 101;

                var _Image_song = _itemNode.getChildByName("Image_song");
                if(!_Image_song){
                    _Image_song = _presentNode;
                }
                _Image_song.zIndex = 100;
                if(!_data.title|| _data.title == "")
                {
                    _Image_song.visible = false;
                    _presentNode.visible = false;
                }
                else
                {
                    _presentNode.setString(_data.title);
                    _Image_song.visible = true;
                    _presentNode.visible = true;
                }
                if(_data.discountAmount){
                    _presentNode.setVisible(false);
                    _Image_song.setVisible(false);
                }else {
                    if(MjClient.getAppType() != MjClient.APP_TYPE.QXJSMJ){
                        _Image_song.setPositionY(_Image_song.getPositionY() - 20);
                        _presentNode.setPositionY(_presentNode.getPositionY() - 20);
                    }
                }

                // 按钮
                var _btn = _itemNode.getChildByName("Button_1");
                var _amountNode = _btn.getChildByName("Text_money");
                var yuan = (isJinZhongAPPType() || MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)? "元":"";
                _amountNode.setString(Number(_data.amount) + yuan);
                _amountNode.ignoreContentAdaptWithSize(true);

                // 折扣价格
                var textMoneyDiscount = _itemNode.getChildByName("Text_money_discount");
                textMoneyDiscount.ignoreContentAdaptWithSize(true);
                textMoneyDiscount.setLocalZOrder(201);
                if(_data.discountAmount){
                    textMoneyDiscount.setVisible(true);
                    var str = "";
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) { // 江苏的折扣价格放在按钮上
                        _amountNode.setString(str+Number(_data.discountAmount)+"元");
                        textMoneyDiscount.setString(Number(_data.amount) + yuan);
                    }
                    else {
                        textMoneyDiscount.setString(str+Number(_data.discountAmount)+"元");
                    }
                }else {
                    textMoneyDiscount.setVisible(false);

                }

                /*_Image_song.setPositionX(textMoneyDiscount.getPositionX());
                 _Image_song.setPositionY(textMoneyDiscount.getPositionY()+20);
                 _presentNode.setPositionX(textMoneyDiscount.getPositionX());
                 _presentNode.setPositionY(textMoneyDiscount.getPositionY()+20);*/

                var _Image_hot = _itemNode.getChildByName("Image_hot");
                _Image_hot.visible = false;

                if(_data.discountAmount)
                {
                    var Draw = new cc.DrawNode();
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                        Draw.drawSegment(cc.p(20, _amountNode.height-20), cc.p(_btn.width-20, _btn.height -_amountNode.height+20), 1, cc.color("#CB470D"));
                        Draw.y = 45;
                    }
                    else {
                        Draw.drawSegment(cc.p(20, _amountNode.height-20), cc.p(_btn.width-20, _btn.height -_amountNode.height+20), 2.5, cc.color("#E45A43"));
                    }
                    if (isJinZhongAPPType()) {
                        Draw.y = 20;
                    }
                    _btn.addChild(Draw);
                }
            }

            for(var i = MjClient.rechargeLadderJinbi.length;i < 8;i++){
                var _itemNode =  this._jinbiNode.getChildByName("bg_item_" + i);
                if(!_itemNode)
                {
                    continue;
                }
                _itemNode.setVisible(false);
            }

            if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ && MjClient.rechargeLadderJinbi.length == 6){
                var posX = [266,516,766];
                var poxY = [404.22,188.72];
                for(var i = 0;i < MjClient.rechargeLadderJinbi.length;i++){
                    var _itemNode =  this._jinbiNode.getChildByName("bg_item_" + i);
                    _itemNode.x = posX[i%3];
                    _itemNode.y = poxY[parseInt(i/3)];
                }
            }

        }.bind(this));
    },
    getYuanBaoTabData:function () {
        var that = this;
        MjClient.getRechargeLadder(function () {
            if (!cc.sys.isObjectValid(that)) {
                return;
            }
            this.showTab(this._index);
            for(var i = 0;i < MjClient.rechargeLadder.length;i++)
            {
                var _itemNode =  this._yuanbaNode.getChildByName("bg_item_" + i);
                if(!_itemNode)
                {
                    continue;
                }
                _itemNode.visible = this.isBind;
                _itemNode.addTouchEventListener(this.touchEventFun,this);


                var _data =  MjClient.rechargeLadder[i];
                _itemNode.setTag(_data.id);


                var _itemIcon = _itemNode.getChildByName("Image_3");
                // _itemIcon.loadTexture("store/yuanbao_" + (i + 1) + ".png");

                if(_data.image)
                {
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ 
                        && (!(!_data.title || _data.title == "") || _data.discountAmount)) {
                        _itemIcon.y = 160;
                    }
                    this.setItemImage(_data.image, _itemIcon);
                }
                _itemIcon.ignoreContentAdaptWithSize(true);

                var _moneyNode = _itemNode.getChildByName("Text_1");
                _moneyNode.setString(_data.money + (MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ?"个元宝" : (MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ ? "元宝" : "")));
                _moneyNode.setLocalZOrder(201);
                if(_data.discountAmount && _data.total){
                    _moneyNode.setString(_data.total + (MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ?"个元宝" : (MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ ? "元宝" : "")));
                }
                _moneyNode.ignoreContentAdaptWithSize(true);

                var _presentNode = _itemNode.getChildByName("Text_song");
                _presentNode.ignoreContentAdaptWithSize(true);
                _presentNode.zIndex = 101;
                var _Image_song = _itemNode.getChildByName("Image_song");
                if(!_Image_song){
                    _Image_song = _presentNode;
                }
                _Image_song.zIndex = 100;
                if(!_data.title|| _data.title == "")
                {
                    _Image_song.visible = false;
                    _presentNode.visible = false;
                }
                else
                {
                    _presentNode.setString(_data.title);
                    _Image_song.visible = true;
                    _presentNode.visible = true;
                }
                if(_data.discountAmount){
                    _presentNode.setVisible(false);
                    _Image_song.setVisible(false);
                }else {
                    if(MjClient.getAppType() != MjClient.APP_TYPE.QXJSMJ){
                        _Image_song.setPositionY(_Image_song.getPositionY() - 20);
                        _presentNode.setPositionY(_presentNode.getPositionY() - 20);
                    }
                }

                // 按钮
                var _btn = _itemNode.getChildByName("Button_1");
                var _amountNode = _btn.getChildByName("Text_money");
                var yuan = (isJinZhongAPPType() || MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) ? "元":"";
                _amountNode.setString(Number(_data.amount) + yuan);
                _amountNode.ignoreContentAdaptWithSize(true);

                // 折扣价格
                var textMoneyDiscount = _itemNode.getChildByName("Text_money_discount");
                textMoneyDiscount.ignoreContentAdaptWithSize(true);
                textMoneyDiscount.setLocalZOrder(201);
                if(_data.discountAmount){
                    textMoneyDiscount.setVisible(true);
                    var str = "";
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) { // 江苏的折扣价格放在按钮上
                        _amountNode.setString(str+Number(_data.discountAmount)+"元");
                        textMoneyDiscount.setString(Number(_data.amount) + yuan);
                    }
                    else {
                        textMoneyDiscount.setString(str+Number(_data.discountAmount)+"元");
                    }
                }else {
                    textMoneyDiscount.setVisible(false);
                }

                var _Image_hot = _itemNode.getChildByName("Image_hot");
                _Image_hot.visible = false;

                if(_data.discountAmount)
                {
                    var Draw = new cc.DrawNode();
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                        Draw.drawSegment(cc.p(20, _amountNode.height-20), cc.p(_btn.width-20, _btn.height -_amountNode.height+20), 1, cc.color("#CB470D"));
                        Draw.y = 45;
                    }
                    else {
                        Draw.drawSegment(cc.p(20, _amountNode.height-20), cc.p(_btn.width-20, _btn.height -_amountNode.height+20), 2.5, cc.color("#E45A43"));
                    }
                    if (isJinZhongAPPType()) {
                        Draw.y = 20;
                    }
                    _btn.addChild(Draw);
                }


            }

            for(var i = MjClient.rechargeLadder.length;i < 8;i++){
                var _itemNode =  this._yuanbaNode.getChildByName("bg_item_" + i);
                if(!_itemNode)
                {
                    continue;
                }
                _itemNode.setVisible(false);
            }
        }.bind(this));

    },
    setBindView:function (historyBind) {
        return;
        var that = this;
        var img_msg = this._yuanbaNode.getChildByName("img_msg");
        var _desc = img_msg.getChildByName("Text_1");
        _desc.ignoreContentAdaptWithSize(true);
        if(MjClient.updateCfg)
        {
            _desc.setString("");
            if(!historyBind || historyBind <= 0)
            {
                _desc.setString(""+MjClient.systemConfig.yaoqinmaInfo);
            }
            else
            {
                _desc.setString(""+MjClient.systemConfig.yaoqinmaInfo2);
            }
        }
        _desc.visible = false;
        var str = ""+MjClient.systemConfig.yaoqinmaInfo;
        var str1 = str.split(",")[0];
        var str2 = str.split(",")[1];
        var s1 = str2.split(":")[0] + ": ";
        var s2 = str2.split(":")[1];
        if (str1 && str2 && s1 && s2) {
            // 富文本描述1
            var richText1 = new ccui.RichText();
            richText1.ignoreContentAdaptWithSize(false);
            richText1.setAnchorPoint(0,0);
            richText1.width = 500;
            richText1.height = 30;
            //不同颜色文本
            var re1 = new ccui.RichElementText(1, cc.color("#443333"), 255, str1, "fonts/lanting.TTF", 24);
            richText1.pushBackElement(re1);
            richText1.x = 175;
            richText1.y = 210;
            img_msg.addChild(richText1);

            // 富文本描述2
            var richText2 = new ccui.RichText();
            richText2.ignoreContentAdaptWithSize(false);
            richText2.setAnchorPoint(0,0);
            richText2.width = 500;
            richText2.height = 30;
            //不同颜色文本
            var re2 = new ccui.RichElementText(1, cc.color("#443333"), 255, s1, "fonts/lanting.TTF", 24);
            var re3 = new ccui.RichElementText(2, cc.color("#DE1D1D"), 255, s2, "fonts/lanting.TTF", 24);
            richText2.pushBackElement(re2);
            richText2.pushBackElement(re3);
            richText2.x = 150;
            richText2.y = 170;
            img_msg.addChild(richText2);
        }
        else {
            _desc.visible = true;
        }

        var _TextBg = img_msg.getChildByName("xiaotanchuan_51");

        var edtContentSize= _TextBg.getContentSize();
        this._textFeildName = new cc.EditBox(edtContentSize, new cc.Scale9Sprite("store/dise3.png"));
        this._textFeildName.setPlaceholderFontSize(24);
        this._textFeildName.setFontColor(cc.color("#DE1D1D"));
        this._textFeildName.setPlaceholderFontColor(cc.color("#443333"));
        this._textFeildName.setFontSize(32);

        this._textFeildName.setMaxLength(8);
        this._textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._textFeildName.setPlaceHolder("请输入邀请码...");
        this._textFeildName.setPosition(_TextBg.getContentSize().width/2, _TextBg.getContentSize().height/2);
        _TextBg.addChild(this._textFeildName);

        /*
         绑定
         */
        var _Btn_binding = img_msg.getChildByName("Btn_binding");
        _Btn_binding.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Bindingsure", {uid:SelfUid()});
                var _str = that._textFeildName.getString();
                if(_str.length == 0 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的邀请码");
                    return;
                }


                MjClient.block();
                MjClient.gamenet.request("pkcon.handler.getMemberInfo", {memberId:Number(_str)}, function(rtn)
                {
                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(that)) {
                        return;
                    }
                    if(rtn.code==0)
                    {
                        var layer = new bindingCodeLayer_tips(rtn.data,function()
                        {
                            that.binding(Number(_str));
                        });
                        that.addChild(layer);
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }

                });
            }
        },this);
    },
    binding:function(ID)
    {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.setUserMember",{memberId:ID},
            function(rtn)
            {
                MjClient.unblock();

                if(rtn.code == 0)
                {
                    if (cc.sys.isObjectValid(that)) {
                        that.showIsBindUi(true);
                    }
                }
                if(rtn.message)
                {
                    MjClient.showToast(rtn.message);
                }
            }
        );
    },
    showIsBindUi:function (isBind) {
        this.isBind = isBind;
        return;
        var img_msg = this._yuanbaNode.getChildByName("img_msg");
        if (img_msg){
            img_msg.setVisible(!isBind);
        }
        var gezi = this._yuanbaNode.getChildByName("Image_gezi");
        if (gezi){
            gezi.setVisible(isBind);
        }
        var i = 0;
        while(true){
            var item = this._yuanbaNode.getChildByName("bg_item_"+i);
            if (!item){
                break;
            }
            item.setVisible(isBind);
            i++;
        }
    }
    ,
    showTab:function (index) {
        if (index > -1){
            if (index == 0){
                this._jinbiNode.setVisible(false);
                this._yuanbaNode.setVisible(true);
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                    this._back.getChildByName("Button_jinbi_tab").setEnabled(true);
                    this._back.getChildByName("Button_yuanbao_tab").setEnabled(false);
                }
            }else if(index == 1){
                this._jinbiNode.setVisible(true);
                this._yuanbaNode.setVisible(false);
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                    this._back.getChildByName("Button_jinbi_tab").setEnabled(false);
                    this._back.getChildByName("Button_yuanbao_tab").setEnabled(true);
                }
            }
        }else {
            this._jinbiNode.setVisible(false);
            this._yuanbaNode.setVisible(false);
            return;
        }

        //按钮隐藏  金币场优化
        var Button_jinbi_tab = null, Button_yuanbao_tab = null;
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            Button_jinbi_tab = this._back.getChildByName("Button_jinbi_tab");
            Button_yuanbao_tab = this._back.getChildByName("Button_yuanbao_tab");
            var _leftMask_bg = this._back.getChildByName("leftMask_bg");
            _leftMask_bg.visible = false;
        }
        else {
            Button_jinbi_tab = this._yuanbaNode.getChildByName("Button_jinbi_tab");
            Button_yuanbao_tab = this._jinbiNode.getChildByName("Button_yuanbao_tab");
        }
        Button_jinbi_tab.visible = false;
        Button_yuanbao_tab.visible = false;
    },
    setItemImage : function(url,sp){
        if (!url) return;
        cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
            if (!err && texture&&cc.sys.isObjectValid(sp)) {

                var _sprite = new cc.Sprite(texture);
                _sprite.setPosition(sp.getPosition());
                sp.setVisible(false);
                sp.getParent().addChild(_sprite);

            }
        });
    }
});

/**
 * 徐州，淮安，海安 新商城
 */
var storeLayer3 = cc.Layer.extend({
    _payNode1:null,
    _payNode3:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("StoreLayer.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");

        var _girl = UI.node.getChildByName("Image_girl");
        if(_girl)
        {
            setWgtLayout(_girl,[0.88, 0.88], [0.12, 0], [0, 0]);
        }

        this._back = _back;
        this.adaptation(); // 自适应显示
        setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0]);

        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);


        this._payNode1 =  _back.getChildByName("Node_pay1");
        this._payNode1.setVisible(false);
        var _payNode2 =  _back.getChildByName("Node_pay2");
        this._payNode3 =  _back.getChildByName("Node_pay3");
        var title_huodong = _back.getChildByName("title_huodong");
        if(title_huodong){
            title_huodong.setVisible(false);
        }
        _payNode2.setVisible(false);
        if(this._payNode3){
            this._payNode3.setVisible(false);
        }

        var _Text_goldCount = _back.getChildByName("Text_goldCount");

        _Text_goldCount.setString("0");


        if(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.money)
        {
            _Text_goldCount.setString(MjClient.data.pinfo.money);
        }

        _Text_goldCount.ignoreContentAdaptWithSize(true);


        _Text_goldCount.schedule(function(){
            var icurrentMoney = parseInt(_Text_goldCount.getString());
            if(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.money)
            {
                var lastMoney = parseInt(MjClient.data.pinfo.money);
                if(lastMoney > icurrentMoney)
                {
                    //成功后，加粒子效果
                    var starParticle =  new cc.ParticleSystem("Particle/diamondtail.plist");
                    starParticle.setPosition(_Text_goldCount.getContentSize().width/2, _Text_goldCount.getContentSize().height/2);
                    _Text_goldCount.addChild(starParticle);
                    _Text_goldCount.runAction(cc.sequence(cc.scaleTo(1,1.5).easing(cc.easeBackOut()),cc.scaleTo(0.3,1)));
                }
                _Text_goldCount.setString(MjClient.data.pinfo.money);
            }
        },1);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Close", {uid:SelfUid()});
                that.removeFromParent();
            }
        }, this);

        var btn_tousu = _back.getChildByName("btn_tousu");
        if(btn_tousu){
            btn_tousu.addTouchEventListener(function (sender, type) {
                if (type == 2) {
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
                    
                }
            }, this);
        }

        var btnBangdingyouli = _back.getChildByName("btn_bangdingyouli");
        if(btnBangdingyouli){
            UIEventBind(null, btnBangdingyouli, "bangdingyouliVisibleFalse", function () {
                btnBangdingyouli.setVisible(false);
            })

            btnBangdingyouli.setVisible(false);
            btnBangdingyouli.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
                    {
                        //that.removeFromParent();
                    });
                    that.addChild(layer);
                }
            }, this);
        }

        
        var isShowBind = !(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&!MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP;
        if(isAgent() && isShowBind)
        {
            /*
             没有绑定
             */
            btnBangdingyouli.setVisible(true);
            var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
            {
                //that.removeFromParent();
            });
            that.addChild(layer);

        }

        //未实名认证弹实名认证
        var pinfo = MjClient.data.pinfo;
        if(!pinfo.identityNum && MjClient.systemConfig.shiMingRenZhengStore == "true"){
            that.addChild(new shiMingRenZhengLayer());
        }

        function touchEventFun(sender,type)
        {
            if(type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Buy", {uid:SelfUid()});
                
                ////成功后，加粒子效果
                //var starParticle =  new cc.ParticleSystem("Particle/diamondtail.plist");
                //starParticle.setPosition(_Text_goldCount.getContentSize().width/2, _Text_goldCount.getContentSize().height/2);
                //_Text_goldCount.addChild(starParticle);
                //_Text_goldCount.runAction(cc.sequence(cc.scaleTo(1,1.5).easing(cc.easeBackOut()),cc.scaleTo(0.3,1)));

                if(!MjClient.systemConfig ||!MjClient.systemConfig.recharge)
                {
                    return MjClient.showToast("获取支付数据失败");
                }

                var itagID = sender.getTag();
                if (MjClient.systemConfig.recharge.length > 1) {
                    cc.log("rechange 长度 > 1 " + itagID);
                    MjClient.Scene.addChild(new payWayLayer(function(platform){
                        that.recharge(itagID, parseInt(platform));
                    }));
                }
                else {
                    that.recharge(itagID, parseInt(MjClient.systemConfig.recharge[0].platform))
                }
            }
        }


        MjClient.getRechargeLadder(function () {
            if (!cc.sys.isObjectValid(that)) {
                return;
            }
            this._payNode1.setVisible(true);
            if(title_huodong){
                title_huodong.setVisible(true);
            }
            for(var i = 0;i < MjClient.rechargeLadder.length;i++)
            {
                var _itemNode =  this._payNode1.getChildByName("bg_item_" + i);
                if(!_itemNode)
                {
                    continue;
                }
                _itemNode.visible = true;
                _itemNode.addTouchEventListener(touchEventFun,this);


                var _data =  MjClient.rechargeLadder[i];
                _itemNode.setTag(_data.id);

                var _itemIcon = _itemNode.getChildByName("Image_3");
                // _itemIcon.loadTexture("store/yuanbao_" + (i + 1) + ".png");
                if(_data.image)
                {
                    if (!(!_data.title || _data.title == "") || _data.discountAmount) {
                        _itemIcon.y = 160;
                    }
                    this.setItemImage(_data.image,_itemIcon);
                }


                _itemIcon.ignoreContentAdaptWithSize(true);

                // var text49 = _itemNode.getChildByName("Text_49");
                // if(text49) {
                //     text49.setLocalZOrder(201);
                //     text49.ignoreContentAdaptWithSize(true);
                // }
                var _moneyNode = _itemNode.getChildByName("Text_1");
                _moneyNode.setString(_data.money + "个");
                _moneyNode.setLocalZOrder(201);
                if(_data.discountAmount && _data.total){
                    _moneyNode.setString(_data.total + "个");
                }
                _moneyNode.ignoreContentAdaptWithSize(true);

                var textMoneyDiscount = _itemNode.getChildByName("Text_money_discount");
                if(textMoneyDiscount){
                    textMoneyDiscount.ignoreContentAdaptWithSize(true);
                    textMoneyDiscount.setLocalZOrder(201);
                    if(_data.discountAmount){
                        textMoneyDiscount.setVisible(true);
                        var str = "原价";
                        textMoneyDiscount.setString(str+Number(_data.amount)+"元");
                    }else {
                        textMoneyDiscount.setVisible(false);

                    }
                }

                var _Image_hot = _itemNode.getChildByName("Image_hot");
                _Image_hot.visible = false;
                if(i  == 0)
                {
                    _Image_hot.visible = true;
                }

                var _btn = _itemNode.getChildByName("Button_1");
                var _amountNode = _btn.getChildByName("Text_money");
                if(_data.discountAmount){
                    _amountNode.setString(Number(_data.discountAmount) + "元");
                }else {
                    _amountNode.setString(Number(_data.amount) + "元");
                }

                _amountNode.ignoreContentAdaptWithSize(true);

                if(_data.discountAmount)
                {
                    var Draw = new cc.DrawNode();
                    Draw.drawSegment(cc.p(-10, _amountNode.height-40), cc.p(_btn.width-25, _btn.height -_amountNode.height+12), 1, cc.color("#CB470D"));
                    textMoneyDiscount.addChild(Draw);
                }

                var text5 = _back.getChildByName("Text_5");
                if(text5){
                    if(_data.discountAmount){
                        text5.setVisible(true)
                    }else {
                        text5.setVisible(false)
                    }
                }
            }

            if(MjClient.rechargeLadder.length == 0)
            {
                this._payNode1.visible = false;
                _payNode2.visible = true;
            }
            else
            {
                this._payNode1.visible = true;
                _payNode2.visible = false;
            }

            var title_shop = _back.getChildByName("title_shop");
            if (title_shop && title_huodong) {//初始化
                this._payNode3.visible = false;
                this._payNode1.visible = true;
                title_shop.visible = true;
                title_huodong.visible = false;
            }
            // 条件 控制
            if (title_shop && title_huodong && this._payNode3 && !MjClient.remoteCfg.guestLogin && MjClient.systemConfig.fudaiEnable  == "true") {
                title_shop.visible = false;
                title_huodong.visible = true;
                var btn_fudai = title_huodong.getChildByName("btn_fudai");
                var btn_shop = title_huodong.getChildByName("btn_shop");

                btn_fudai.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        btn_fudai.setOpacity(255);
                        btn_shop.setOpacity(0);
                        this._payNode3.visible = true;
                        this._payNode1.visible = false;
                    }
                }, this);

                btn_shop.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        btn_fudai.setOpacity(0);
                        btn_shop.setOpacity(255);
                        this._payNode3.visible = false;
                        this._payNode1.visible = true;
                    }
                }, this);
                btn_fudai.setOpacity(255);
                btn_shop.setOpacity(0);
                this._payNode3.visible = true;
                this._payNode1.visible = false;

                var _btn = this._payNode3.getChildByName("btn_fudai");
                _btn.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        this.recharge(null, parseInt(MjClient.systemConfig.recharge[0].platform), 5);
                    }

                }, this);
                var _btn_1 = this._payNode3.getChildByName("btn_fudai_1");
                _btn_1.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        this.recharge(null, parseInt(MjClient.systemConfig.recharge[0].platform), 10);
                    }

                }, this);
                // MjClient.data.pinfo.limitMoney Text_fudaiCount
                var Text_fudaiCount = this._payNode3.getChildByName("Text_fudaiCount");
                Text_fudaiCount.setString("0");
                Text_fudaiCount.ignoreContentAdaptWithSize(true);

                if (MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.limitMoney)
                    Text_fudaiCount.setString(MjClient.data.pinfo.limitMoney);
                UIEventBind(null, Text_fudaiCount, "updateInfo", function () {

                    var icurrentMoney = parseInt(Text_fudaiCount.getString());
                    var lastMoney = parseInt(MjClient.data.pinfo.limitMoney);
                    if (lastMoney > icurrentMoney) {
                        //成功后，加粒子效果
                        var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                        starParticle.setPosition(Text_fudaiCount.getContentSize().width / 2, Text_fudaiCount.getContentSize().height / 2);
                        Text_fudaiCount.addChild(starParticle);
                        Text_fudaiCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
                    }
                    Text_fudaiCount.setString(MjClient.data.pinfo.limitMoney);
                });
                Text_fudaiCount.schedule(function() {
                    var icurrentMoney = parseInt(Text_fudaiCount.getString());
                    if (MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.limitMoney) {
                        var lastMoney = parseInt(MjClient.data.pinfo.limitMoney);
                        if (lastMoney > icurrentMoney) {
                            //成功后，加粒子效果
                            var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                            starParticle.setPosition(Text_fudaiCount.getContentSize().width / 2, Text_fudaiCount.getContentSize().height / 2);
                            Text_fudaiCount.addChild(starParticle);
                            Text_fudaiCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
                        }
                        Text_fudaiCount.setString(MjClient.data.pinfo.limitMoney);
                    }
                }, 1);
            }

            var btnRechage = _payNode2.getChildByName("BtnRechage");
            btnRechage.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    //todo...
                    cc.log("按钮充值----------");
                    var _gongzhognhao = "" + MjClient.systemConfig.gongzhonghao;
                    MjClient.showMsg("添加微信公众号:" + _gongzhognhao + " 进行充值\n点击\"确定\"按钮即可复制微信公众号。",
                        function() {
                            MjClient.showToast("复制公众号成功,前往微信添加公众号！");
                            MjClient.native.doCopyToPasteBoard("" + _gongzhognhao);
                            MjClient.native.openWeixin();
                        });
                }
            }, this);
            var a = cc.scaleTo(1, 0.8);
            var a1 = cc.scaleTo(0.8, 1);
            btnRechage.runAction(cc.sequence(a, a1).repeatForever());

            this.scheduleUpdate();
        }.bind(this));
    },
    adaptation: function() {    // 自适应显示
        var back = this._back;
        var childrens = back.getChildren();

        if (MjClient.size.width / MjClient.size.height > back.width / back.height) {
            var a = (MjClient.size.width / MjClient.size.height) / (back.width / back.height);
            back.width *= a;
            back.getChildByName("Image_1").width *= a;
            back.getChildByName("Text_goldCount").width *= a;
            back.getChildByName("yuanbao_1_1").width *= a;
            for (var i = 0; i < childrens.length; i++) {
                if (childrens[i]) {
                    childrens[i].x *= a;
                }
            }

        } else {
            var a = (back.width / back.height) / (MjClient.size.width / MjClient.size.height);
            back.height *= a;
            back.getChildByName("Image_1").height *= a;
            back.getChildByName("Text_goldCount").height *= a;
            back.getChildByName("yuanbao_1_1").height *= a;
            for (var i = 0; i < childrens.length; i++) {
                if (childrens[i]) {
                    childrens[i].y *= a;
                }
            }
        }
    },
    setItemImage : function(url,sp){
        if (!url) return;
        cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
            if (!err && texture&&cc.sys.isObjectValid(sp)) {

                var _sprite = new cc.Sprite(texture);
                _sprite.setPosition(sp.getPosition());
                sp.setVisible(false);
                sp.getParent().addChild(_sprite);

            }
        });
    },
    setPresetNodeText:function(index, text)
    {
        var _data =  MjClient.rechargeLadder[index];
        var itemNode0 = this._payNode1.getChildByName("bg_item_" + index);
        if(!itemNode0) return;
        var _Image_hot = itemNode0.getChildByName("Image_hot");

        if(index  == 0)
        {
            _Image_hot.visible = true;
        }


        //折扣值
        // if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)
        // {
        //     var _offVaule =  (_data.amount/_data.money)*10;
        //     _offVaule = _offVaule.toFixed(1);
        //     if(!_Image_hot.getChildByName("offText"))
        //     {
        //         var _offIext = new ccui.Text();
        //         _offIext.setString(_offVaule + "折");
        //         _offIext.setFontSize(26);
        //         _offIext.setName("offText");
        //         _Image_hot.addChild(_offIext);
        //         _offIext.setPosition(cc.p(_Image_hot.getContentSize().width/2,_Image_hot.getContentSize().height/2))
        //         _Image_hot.loadTexture("store/sale.png");
        //         _Image_hot.setScale(1.3);
        //         _Image_hot.setVisible(true);
        //     }
        //     else
        //     {
        //         _Image_hot.getChildByName("offText").setString(_offVaule + "折");
        //     }
        // }

        var _presentNode = itemNode0.getChildByName("Text_song");
        _presentNode.ignoreContentAdaptWithSize(true);
        _presentNode.zIndex = 101;
        _presentNode.setString(text);
        var _Image_song = itemNode0.getChildByName("Image_song");
        if(_Image_song){
            _Image_song.zIndex = 100;
            if(text == "")
            {
                _Image_song.visible = false;
            }
            else
            {
                _Image_song.visible = true;
            }
        }
        if(_data.discountAmount){
            _presentNode.setVisible(false);
            if(_Image_song) {
                _Image_song.setVisible(false);
            }
        }
    },
    update:function(dt)
    {
         for(var i = 0;i < MjClient.rechargeLadder.length; i++)
         {
             this.setPresetNodeText(i, MjClient.rechargeLadder[i].title);
         }
    },
    recharge:function(itemId,platform,limitMoney)
    {
        var _sys = "android";
        if( cc.sys.os == cc.sys.OS_IOS)
        {
            _sys = "ios";
        }
        var _data = {};
        if (!limitMoney) {
            _data = {ladderId:itemId, os:_sys,platform:platform, appid:MjClient.native.GetPackageName(), wx_appid: MjClient.native.getNativeConfig().wx_appId||""};
            MjClient.native.umengEvent4CountWithProperty("ShangchengShangpinClick", {uid:SelfUid(), type:"yuanbao", ladderId:itemId});
        }else{
            _data = {limitMoney:limitMoney, os:_sys,platform:platform, appid:MjClient.native.GetPackageName(), wx_appid: MjClient.native.getNativeConfig().wx_appId||""};
            MjClient.native.umengEvent4CountWithProperty("ShangchengShangpinClick", {uid:SelfUid(), type:"fudai", limitMoney:limitMoney});
        }
         

        MjClient.block();

        MjClient.gamenet.request("pkplayer.handler.recharge",_data,
            function(rtn)
            {
                cc.log(" ====== pkplayer.handler.recharge : ",JSON.stringify(rtn));
                if(rtn.code == 0)
                {
                    MjClient.onRecharge(rtn.data);
                }
                else
                {
                    if(rtn.message)
                    {
                        MjClient.showToast(rtn.message);
                    }
                }
                MjClient.unblock();
            }
        );
    }
});


/**
 * 所有元宝和房卡的新商城
 * 上面的商城 一个个 慢慢地删除掉
 * 耒阳  衡阳  永州  湘乡 山西  
 */
var storeLayer4 = cc.Layer.extend({
    _yuanbaNode:null,
    _fangkaNode:null,
    _index:0,//进来的展示页面，0元宝，1房卡
    ctor: function (index) {
        cc.log(" ======================= storeLayer4 ============================")
        this._super();
        var UI = ccs.load("StoreLayer_0.json");
        this.addChild(UI.node);
        var self = this;
               
        
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0]);
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) {
            setWgtLayout(_back,[0.62, 0.9], [0.58, 0.47], [0, -0.02]);
        }
        if (MjClient.getAppType() === MjClient.APP_TYPE.DQSHANXIMJ) {
            setWgtLayout(_back,[0.91, 0.91], [0.5, 0.5], [0, 0]);
        }
        var _girl = UI.node.getChildByName("Image_girl");
        if(_girl)
        {
            //setWgtLayout(_back,[0.92, 0.92], [0.62, 0.49], [0, -0.02]);
            setWgtLayout(_girl,[0.88, 0.88], [0.12, 0], [0, 0]);
        }



        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

        this._yuanbaNode =  _back.getChildByName("Node_yuanbao");
        this._fangkaNode =  _back.getChildByName("Node_fangka");
        this.showTab(-1);

        var _Text_yuanbaoCount = null;
        var _Text_fangkaCount = null;
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            this._back = _back;
            this.adaptation(); // 自适应显示
            _Text_yuanbaoCount = _back.getChildByName("Text_goldCount");
            _Text_fangkaCount = _back.getChildByName("Text_goldCount_fangka");
        }
        else {
            _Text_yuanbaoCount = this._yuanbaNode.getChildByName("Text_goldCount");
            _Text_fangkaCount = this._fangkaNode.getChildByName("Text_goldCount");
        }
        

        _Text_yuanbaoCount.setString("0");
        _Text_fangkaCount.setString("0");

        if(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.money)
        {
            _Text_yuanbaoCount.setString(MjClient.data.pinfo.money);
            _Text_fangkaCount.preValue = MjClient.data.pinfo.fangka;
            _Text_fangkaCount.setString(MjClient.data.pinfo.fangka);
        }else{
            _Text_fangkaCount.preValue = 0;
        }

        _Text_yuanbaoCount.ignoreContentAdaptWithSize(true);
        _Text_fangkaCount.ignoreContentAdaptWithSize(true);

        UIEventBind(null, _Text_yuanbaoCount, "updateInfo", function () {
            var icurrentMoney = parseInt(_Text_yuanbaoCount.getString());
            var lastMoney = parseInt(MjClient.data.pinfo.money);
            var icurrentMoney2 = _Text_fangkaCount.preValue;
            var lastMoney2 = parseInt(MjClient.data.pinfo.fangka);
            if (lastMoney > icurrentMoney) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(_Text_yuanbaoCount.getContentSize().width / 2, _Text_yuanbaoCount.getContentSize().height / 2);
                _Text_yuanbaoCount.addChild(starParticle);
                _Text_yuanbaoCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            if (lastMoney2 > icurrentMoney2) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(_Text_fangkaCount.getContentSize().width / 2, _Text_fangkaCount.getContentSize().height / 2);
                _Text_fangkaCount.addChild(starParticle);
                _Text_fangkaCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            _Text_yuanbaoCount.setString(MjClient.data.pinfo.money+"");
            _Text_fangkaCount.setString(MjClient.data.pinfo.fangka + "");
            _Text_fangkaCount.preValue = MjClient.data.pinfo.fangka;
        });

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Close", {uid:SelfUid()});
                self.removeFromParent();
            }
        }, this);

        var btn_tousu = _back.getChildByName("btn_tousu");
        if(btn_tousu){
            btn_tousu.addTouchEventListener(function (sender, type) {
                if (type == 2) {
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
                    
                }
            }, this);
        }


        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            this.Button_fangka_tab = _back.getChildByName("Button_switch_tab");
            this.Button_yuanbao_tab = _back.getChildByName("Button_switch_tab");
        }
        else {
            this.Button_fangka_tab = _back.getChildByName("Button_switch_fk");
            this.Button_yuanbao_tab = _back.getChildByName("Button_switch_yb");
        }
        this.localStorageKey = {};
        this.localStorageKey.KEY_STORE_TYPE = "KEY_STORE_TYPE";
        if (typeof(index) != "undefined"){ 
            this._index = index;
            if(MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ || cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
                if(this._index != 0){
					var _posYB = this.Button_yuanbao_tab.getPosition();
                    this.Button_fangka_tab.setPosition(_posYB);
                    this.Button_yuanbao_tab.visible = false;
                }
            }
        }else{
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ
            || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP){
                this._index = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_STORE_TYPE, 1);
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_STORE_TYPE, this._index);
            }
            
        }
        
        this.Button_fangka_tab.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Fangka", {uid:SelfUid()});
                this.showTab(1);
                var pinfo = MjClient.data.pinfo;
                var dayStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
                var timeNum = util.localStorageEncrypt.getNumberItem("_TIME_NUM"+dayStr, 0);
                if(!pinfo.mobileNum && timeNum < 3){
                    MjClient.Scene.addChild(new bindPhoneNumNewLayer());
                    timeNum++;
                    util.localStorageEncrypt.setNumberItem("_TIME_NUM"+dayStr, timeNum);
                }
            }
        }, this);

        this.Button_yuanbao_tab.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold", {uid:SelfUid()});
                this.showTab(0);
            }
        }, this);

        var btnBangdingyouli = _back.getChildByName("btn_bangdingyouli");
        if(btnBangdingyouli){
            UIEventBind(null, btnBangdingyouli, "bangdingyouliVisibleFalse", function () {
                btnBangdingyouli.setVisible(false);
            })

            btnBangdingyouli.setVisible(false);
            btnBangdingyouli.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
                    {
                        //self.removeFromParent();
                    });
                    self.addChild(layer);
                }
            }, this);
        }


        var isShowBind = !(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&!MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP;
        if(isAgent() && isShowBind)
        {
            btnBangdingyouli.setVisible(true);
            this.setBindView(MjClient.data.pinfo.bindHistory);
            this.showIsBindUi(true);
            var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
            {
                //self.removeFromParent();
            });
            self.addChild(layer);
        }else{
            this.showIsBindUi(true)
        }

        //未实名认证弹实名认证
        var pinfo = MjClient.data.pinfo;
        if(!pinfo.identityNum && MjClient.systemConfig.shiMingRenZhengStore == "true"){
            self.addChild(new shiMingRenZhengLayer());
        }

        this.touchEventFun = function touchEventFun(sender,type)
        {
            if(type == 2)
            {
                ////成功后，加粒子效果
                //var starParticle =  new cc.ParticleSystem("Particle/diamondtail.plist");
                //starParticle.setPosition(_Text_goldCount.getContentSize().width/2, _Text_goldCount.getContentSize().height/2);
                //_Text_goldCount.addChild(starParticle);
                //_Text_goldCount.runAction(cc.sequence(cc.scaleTo(1,1.5).easing(cc.easeBackOut()),cc.scaleTo(0.3,1)));

                if (this._index == 0)
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Buy", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Fangka_Buy", {uid:SelfUid()});

                if(!MjClient.systemConfig ||!MjClient.systemConfig.recharge)
                {
                    return MjClient.showToast("获取支付数据失败");
                }

                var itagID = sender.getTag();
                if (MjClient.systemConfig.recharge.length > 1) {
                    cc.log("rechange 长度 > 1 " + itagID);
                    MjClient.Scene.addChild(new payWayLayer(function(platform){
                        MjClient.recharge(itagID, parseInt(platform));
                    }, this._index == 0 ? "gold" : "coin", null, sender.rechargeName));
                }
                else {
                    MjClient.recharge(itagID, parseInt(MjClient.systemConfig.recharge[0].platform))
                }
            }
        }
        if(this._index == 0){
            this.getYuanBaoTabData()
            this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function()
            {
                self.getFangkaTabData()
            })));
        }else{
            this.getFangkaTabData()
            this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function()
            {
                self.getYuanBaoTabData()
            })));
        }
        
        var text5 = _back.getChildByName("Text_5");
        if(text5){
                text5.setVisible(false)
        }
        this._diaoXian = _back.getChildByName("Image_bg")
        if(this._diaoXian){
            this.schedule(function(){
                this._diaoXian.visible = self.Button_fangka_tab.visible;
            });
    
            if(index){
                this._diaoXian.setScale9Enabled(true);
                this._diaoXian.height *= 0.7;
            }
        }
        
    },
    //江苏  永利  代码~~~~
    adaptation: function() {    // 自适应显示
        var back = this._back;
        var childrens = back.getChildren();

        if (MjClient.size.width / MjClient.size.height > back.width / back.height) {
            var a = (MjClient.size.width / MjClient.size.height) / (back.width / back.height);
            var width_dis =  back.width - back.width *a;
            back.width *= a;
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                back.getChildByName("bg_image").width *= a;
                // back.getChildByName("bg_image").x *= a;
                back.getChildByName("Image_1").width *= a;
                back.getChildByName("Image_2").width *= a;
                back.getChildByName("Text_goldCount").width *= a;
                back.getChildByName("Text_goldCount_fangka").width *= a;
                back.getChildByName("jinbi_icon").width *= a;
                back.getChildByName("yuanbao_1_1").width *= a;
            }else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                this.Button_fangka_tab.x += width_dis / 2;
                this.Button_yuanbao_tab.x += width_dis / 2;
            }
            
            for (var i = 0; i < childrens.length; i++) {
                if (childrens[i]) {
                    childrens[i].x *= a;
                }
            }

        } else {
            var a = (back.width / back.height) / (MjClient.size.width / MjClient.size.height);
            back.height *= a;
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                back.getChildByName("bg_image").height *= a;
                // back.getChildByName("bg_image").y *= a;
                back.getChildByName("Image_1").height *= a;
                back.getChildByName("Image_2").height *= a;
                back.getChildByName("Text_goldCount").height *= a;
                back.getChildByName("Text_goldCount_fangka").height *= a;
                back.getChildByName("jinbi_icon").height *= a;
                back.getChildByName("yuanbao_1_1").height *= a;
            }
            
            for (var i = 0; i < childrens.length; i++) {
                if (childrens[i]) {
                    childrens[i].y *= a;
                }
            }
        }
    },
    getFangkaTabData:function () {
        var self = this;
        MjClient.getFangkaRechargeLadder(function () {
            if (!cc.sys.isObjectValid(self)) {
                return;
            }
            this.showTab(this._index);
            cc.log(" ========== MjClient.rechargeLadderFangka ",JSON.stringify(MjClient.rechargeLadderFangka));
            
            var fangkaListView = this._fangkaNode.getChildByName("fangkaListView");
            var rowLayout = this._fangkaNode.getChildByName("rowLayout");
            var colIndex = 0;
            var rowItem = null;
            var colMax = MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ? 3 : 4;

            fangkaListView.setScrollBarAutoHideEnabled(false);
            fangkaListView.setScrollBarEnabled(true);
            rowLayout.setVisible(false);
            for (var i = 0; i < colMax; i++) {
                rowLayout.getChildByName("bg_item_" + i).setVisible(false);
            }

            for (var i = 0; i < MjClient.rechargeLadderFangka.length; i++, colIndex++) {
                colIndex = colIndex % colMax;
                if (colIndex == 0) {
                    rowItem = rowLayout.clone();
                    rowItem.setVisible(true);
                    fangkaListView.pushBackCustomItem(rowItem);
                }

                var _itemNode = rowItem.getChildByName("bg_item_" + colIndex);
                _itemNode.setVisible(true);
                _itemNode.addTouchEventListener(this.touchEventFun, this);

                var _data = MjClient.rechargeLadderFangka[i];
                _itemNode.setTag(_data.id);
                _itemNode.rechargeName = "fangka";

                var _itemIcon = _itemNode.getChildByName("Image_3");
                // _itemIcon.loadTexture("store/fk_" + (i + 1) + ".png");

                if (_data.image) {
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ &&
                        (!(!_data.title || _data.title == "") || _data.discountAmount)) {
                        _itemIcon.y = 150;
                    }
                    this.setItemImage(_data.image, _itemIcon);
                }
                if (MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP && MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP) {
                    _itemIcon.ignoreContentAdaptWithSize(true);
                }


                var _moneyNode = _itemNode.getChildByName("Text_1");
                _moneyNode.setString(_data.money + "钻石");
                _moneyNode.setLocalZOrder(201);
                if (_data.discountAmount && _data.total) {
                    _moneyNode.setString(_data.total + "钻石");
                }
                _moneyNode.ignoreContentAdaptWithSize(true);

                var _presentNode = _itemNode.getChildByName("Text_song");
                _presentNode.ignoreContentAdaptWithSize(true);
                _presentNode.zIndex = 101;

                var _Image_song = _itemNode.getChildByName("Image_song");
                if (!_Image_song) {
                    _Image_song = _presentNode;
                }
                _Image_song.zIndex = 100;
                if (!_data.title || _data.title == "") {
                    _Image_song.visible = false;
                    _presentNode.visible = false;
                } else {
                    _presentNode.setString(_data.title);
                    _Image_song.visible = true;
                    _presentNode.visible = true;
                }
                if (_data.discountAmount) {
                    _presentNode.setVisible(false);
                    _Image_song.setVisible(false);
                } else {
                    if (MjClient.getAppType() !== MjClient.APP_TYPE.QXJSMJ &&
                        MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
                        MjClient.getAppType() !== MjClient.APP_TYPE.QXXXGHZ) {
                        _Image_song.setPositionY(_Image_song.getPositionY() - 20);
                        _presentNode.setPositionY(_presentNode.getPositionY() - 20);
                    }

                }

                // 按钮
                var _btn = _itemNode.getChildByName("Button_1");
                var _amountNode = _btn.getChildByName("Text_money");
                _amountNode.setString(Number(_data.amount) + "元");
                _amountNode.ignoreContentAdaptWithSize(true);

                var _yuan = _amountNode.getChildByName("yuan");
                if (_yuan) _yuan.x = _amountNode.width;

                // 折扣价格
                var textMoneyDiscount = _itemNode.getChildByName("Text_money_discount");
                textMoneyDiscount.ignoreContentAdaptWithSize(true);
                textMoneyDiscount.setLocalZOrder(201);
                if (_data.discountAmount) {
                    textMoneyDiscount.setVisible(true);
                    var str = "";
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) { // 江苏的折扣价格放在按钮上
                        _amountNode.setString(str + Number(_data.discountAmount) + "元");
                        textMoneyDiscount.setString(Number(_data.amount) + "元");
                    } else {
                        textMoneyDiscount.setString(str + Number(_data.discountAmount) + "元");
                    }
                } else {
                    textMoneyDiscount.setVisible(false);
                }

                /*_Image_song.setPositionX(textMoneyDiscount.getPositionX());
                 _Image_song.setPositionY(textMoneyDiscount.getPositionY()+20);
                 _presentNode.setPositionX(textMoneyDiscount.getPositionX());
                 _presentNode.setPositionY(textMoneyDiscount.getPositionY()+20);*/

                var _Image_hot = _itemNode.getChildByName("Image_hot");
                _Image_hot.visible = i < 2;

                if (_data.discountAmount) {
                    var Draw = new cc.DrawNode();
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                        Draw.drawSegment(cc.p(20, _amountNode.height - 20), cc.p(_btn.width - 20, _btn.height - _amountNode.height + 20), 1, cc.color("#CB470D"));
                        Draw.y = 45;
                    } else {
                        Draw.drawSegment(cc.p(20, _amountNode.height - 20), cc.p(_btn.width - 20, _btn.height - _amountNode.height + 20), 2.5, cc.color("#E45A43"));
                    }
                    if (MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
                        Draw.y = 20;
                    }
                    _btn.addChild(Draw);
                }
            }

        }.bind(this));
    },
    getYuanBaoTabData:function () {
        var self = this;
        MjClient.getRechargeLadder(function () {
            if (!cc.sys.isObjectValid(self)) {
                return;
            }
            this.showTab(this._index);
            for(var i = 0;i < MjClient.rechargeLadder.length;i++)
            {
                var _itemNode =  this._yuanbaNode.getChildByName("bg_item_" + i);
                if(!_itemNode)
                {
                    continue;
                }
                _itemNode.visible = this.isBind;
                _itemNode.addTouchEventListener(this.touchEventFun,this);


                var _data =  MjClient.rechargeLadder[i];
                _itemNode.setTag(_data.id);


                var _itemIcon = _itemNode.getChildByName("Image_3");
                // _itemIcon.setZOrder(0);
                // _itemIcon.loadTexture("store/yuanbao_" + (i + 1) + ".png");

                if(_data.image)
                {
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ 
                        && (!(!_data.title || _data.title == "") || _data.discountAmount)) {
                        _itemIcon.y = 160;
                    }
                    this.setItemImage(_data.image, _itemIcon);
                }
                if (MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP && MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP) {
                    _itemIcon.ignoreContentAdaptWithSize(true);
                }
                

                var _moneyNode = _itemNode.getChildByName("Text_1");
                _moneyNode.setString(_data.money + "个");
                _moneyNode.setLocalZOrder(201);
                if(_data.discountAmount && _data.total){
                    _moneyNode.setString(_data.total + "个");
                }
                _moneyNode.ignoreContentAdaptWithSize(true);

                var _presentNode = _itemNode.getChildByName("Text_song");
                _presentNode.ignoreContentAdaptWithSize(true);
                _presentNode.zIndex = 101;
                var _Image_song = _itemNode.getChildByName("Image_song");
                if(!_Image_song){
                    _Image_song = _presentNode;
                }
                _Image_song.zIndex = 100;
                if(!_data.title|| _data.title == "")
                {
                    _Image_song.visible = false;
                    _presentNode.visible = false;
                }
                else
                {
                    _presentNode.setString(_data.title);
                    _Image_song.visible = true;
                    _presentNode.visible = true;
                }
                if(_data.discountAmount){
                    _presentNode.setVisible(false);
                    _Image_song.setVisible(false);
                }else {
                    if(MjClient.getAppType() != MjClient.APP_TYPE.QXJSMJ && 
                        MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
                        MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ){
                        _Image_song.setPositionY(_Image_song.getPositionY() - 20);
                        _presentNode.setPositionY(_presentNode.getPositionY() - 20);
                    }
                }

                // 按钮
                var _btn = _itemNode.getChildByName("Button_1");
                var _amountNode = _btn.getChildByName("Text_money");
                _amountNode.setString(Number(_data.amount) + "元");
                _amountNode.ignoreContentAdaptWithSize(true);

                // 折扣价格
                var textMoneyDiscount = _itemNode.getChildByName("Text_money_discount");
                textMoneyDiscount.ignoreContentAdaptWithSize(true);
                textMoneyDiscount.setLocalZOrder(201);
                if(_data.discountAmount){
                    textMoneyDiscount.setVisible(true);
                    var str = "";
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) { // 江苏的折扣价格放在按钮上
                        _amountNode.setString(str+Number(_data.discountAmount)+"元");
                        textMoneyDiscount.setString(Number(_data.amount) + "元");
                    }
                    else {
                        textMoneyDiscount.setString(str+Number(_data.discountAmount)+"元");
                    }
                }else {
                    textMoneyDiscount.setVisible(false);
                }

                var yuanIcon = _amountNode.getChildByName("yuan");
                if (yuanIcon) {
                    yuanIcon.setPositionX(_amountNode.getContentSize().width);
                }

                var _Image_hot = _itemNode.getChildByName("Image_hot");
                _Image_hot.visible = false;

                if(_data.discountAmount)
                {
                    var Draw = new cc.DrawNode();
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                        Draw.drawSegment(cc.p(20, _amountNode.height-20), cc.p(_btn.width-20, _btn.height -_amountNode.height+20), 1, cc.color("#CB470D"));
                        Draw.y = 45;
                    }
                    else {
                        Draw.drawSegment(cc.p(20, _amountNode.height-20), cc.p(_btn.width-20, _btn.height -_amountNode.height+20), 2.5, cc.color("#E45A43"));
                    }
                    if (MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ|| MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
                        Draw.y = 20;
                    }
                    _btn.addChild(Draw);
                }


            }

            for(var i = MjClient.rechargeLadder.length;i < 8;i++){
                var _itemNode =  this._yuanbaNode.getChildByName("bg_item_" + i);
                if(!_itemNode)
                {
                    continue;
                }
                _itemNode.setVisible(false);
            }
        }.bind(this));

    },
    setBindView:function (historyBind) {
        return;
        var self = this;
        var img_msg = this._yuanbaNode.getChildByName("img_msg");
        var _desc = img_msg.getChildByName("Text_1");
        _desc.ignoreContentAdaptWithSize(true);
        if(MjClient.updateCfg)
        {
            _desc.setString("");
            if(!historyBind || historyBind <= 0)
            {
                _desc.setString(""+MjClient.systemConfig.yaoqinmaInfo);
            }
            else
            {
                _desc.setString(""+MjClient.systemConfig.yaoqinmaInfo2);
            }
        }
        _desc.visible = false;
        var str = ""+MjClient.systemConfig.yaoqinmaInfo;
        var str1 = str.split(",")[0];
        var str2 = str.split(",")[1];
        var s1 = str2.split(":")[0] + ": ";
        var s2 = str2.split(":")[1];
        if (str1 && str2 && s1 && s2) {
            // 富文本描述1
            var richText1 = new ccui.RichText();
            richText1.ignoreContentAdaptWithSize(false);
            richText1.setAnchorPoint(0,0);
            richText1.width = 500;
            richText1.height = 30;
            //不同颜色文本
            var re1 = new ccui.RichElementText(1, cc.color("#443333"), 255, str1, "fonts/lanting.TTF", 24);
            richText1.pushBackElement(re1);
            richText1.x = 175;
            richText1.y = 210;
            img_msg.addChild(richText1);

            // 富文本描述2
            var richText2 = new ccui.RichText();
            richText2.ignoreContentAdaptWithSize(false);
            richText2.setAnchorPoint(0,0);
            richText2.width = 500;
            richText2.height = 30;
            //不同颜色文本
            var re2 = new ccui.RichElementText(1, cc.color("#443333"), 255, s1, "fonts/lanting.TTF", 24);
            var re3 = new ccui.RichElementText(2, cc.color("#DE1D1D"), 255, s2, "fonts/lanting.TTF", 24);
            richText2.pushBackElement(re2);
            richText2.pushBackElement(re3);
            richText2.x = 150;
            richText2.y = 170;
            img_msg.addChild(richText2);
        }
        else {
            _desc.visible = true;
        }

        var _TextBg = img_msg.getChildByName("xiaotanchuan_51");

        var edtContentSize= _TextBg.getContentSize();
        this._textFeildName = new cc.EditBox(edtContentSize, new cc.Scale9Sprite("store/dise3.png"));
        this._textFeildName.setPlaceholderFontSize(24);
        this._textFeildName.setFontColor(cc.color("#DE1D1D"));
        this._textFeildName.setPlaceholderFontColor(cc.color("#443333"));
        this._textFeildName.setFontSize(32);

        this._textFeildName.setMaxLength(8);
        this._textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._textFeildName.setPlaceHolder("请输入邀请码...");
        this._textFeildName.setPosition(_TextBg.getContentSize().width/2, _TextBg.getContentSize().height/2);
        _TextBg.addChild(this._textFeildName);

        /*
         绑定
         */
        var _Btn_binding = img_msg.getChildByName("Btn_binding");
        _Btn_binding.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Bindingsure", {uid:SelfUid()});
                var _str = self._textFeildName.getString();
                if(_str.length == 0 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的邀请码");
                    return;
                }


                MjClient.block();
                MjClient.gamenet.request("pkcon.handler.getMemberInfo", {memberId:Number(_str)}, function(rtn)
                {
                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(self)) {
                        return;
                    }
                    if(rtn.code==0)
                    {
                        var layer = new bindingCodeLayer_tips(rtn.data,function()
                        {
                            self.binding(Number(_str));
                        });
                        self.addChild(layer);
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }

                });
            }
        },this);
    },
    binding:function(ID)
    {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.setUserMember",{memberId:ID},
            function(rtn)
            {
                MjClient.unblock();

                if(rtn.code == 0)
                {
                    if (cc.sys.isObjectValid(self)) {
                        self.showIsBindUi(true);
                    }
                }
                if(rtn.message)
                {
                    MjClient.showToast(rtn.message);
                }
            }
        );
    },
    showIsBindUi:function (isBind) {
        this.isBind = isBind;
        return;
        var img_msg = this._yuanbaNode.getChildByName("img_msg");
        if (img_msg){
            img_msg.setVisible(!isBind);
        }
        var gezi = this._yuanbaNode.getChildByName("Image_gezi");
        if (gezi){
            gezi.setVisible(isBind);
        }
        var i = 0;
        while(true){
            var item = this._yuanbaNode.getChildByName("bg_item_"+i);
            if (!item){
                break;
            }
            item.setVisible(isBind);
            i++;
        }
    }
    ,
    showTab:function (index) {
        if (index > -1) {  
            if (index == 0) {
                this._fangkaNode.setVisible(false);
                this._yuanbaNode.setVisible(true);

                this.Button_yuanbao_tab.setTouchEnabled(false);
                this.Button_fangka_tab.setTouchEnabled(true);

                this.Button_fangka_tab.loadTextureNormal("store/btn_fangka_n.png");
                this.Button_yuanbao_tab.loadTextureNormal("store/btn_yuanbao_s.png");

                if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                    this._back.getChildByName("Button_jinbi_tab").setEnabled(true);
                    this._back.getChildByName("Button_yuanbao_tab").setEnabled(false);
                }
            } else if (index == 1) {
                this._fangkaNode.setVisible(true);
                this._yuanbaNode.setVisible(false);

                this.Button_yuanbao_tab.setTouchEnabled(true);
                this.Button_fangka_tab.setTouchEnabled(false);

                this.Button_fangka_tab.loadTextureNormal("store/btn_fangka_s.png");
                this.Button_yuanbao_tab.loadTextureNormal("store/btn_yuanbao_n.png");

                if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                    this._back.getChildByName("Button_jinbi_tab").setEnabled(false);
                    this._back.getChildByName("Button_yuanbao_tab").setEnabled(true);
                }
            } 
        } else {
            if(MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ || cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
                this._fangkaNode.setVisible(false);
                this._yuanbaNode.setVisible(false);
            }
            return;
        }
        //按钮隐藏 优化
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            var _leftMask_bg = this._back.getChildByName("leftMask_bg");
            _leftMask_bg.visible = false;
        }

        if (!FriendCard_Common.IsOpenRoomCardPay()) {
            this.Button_fangka_tab.visible = false;
            this.Button_yuanbao_tab.visible = false;
        }

        util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_STORE_TYPE, index);
    },
    setItemImage : function(url,sp){
        if (!url) return;
        cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
            if (!err && texture&&cc.sys.isObjectValid(sp)) {

                var _sprite = new cc.Sprite(texture);
                _sprite.setPosition(sp.getPosition());
                sp.setVisible(false);
                sp.getParent().addChild(_sprite);

            }
        });
    }
});

//附带 赠送房卡的 商城  岳阳 邵阳 贵州
var storeLayer5 = cc.Layer.extend({
    _yuanbaNode:null,
    _fangkaNode:null,
    _isSupportFriendShop:false,
    _index:0,//进来的展示页面，0元宝，1房卡,2赠送,3亲友圈商城 ,canCheck是否有审核亲友圈订单权限
    ctor: function (index,openFriendShop,canCheck) {
        cc.log(" ======================= 元宝和房卡的新商城 ============================")
        this._super();
        var UI = ccs.load("StoreLayer_0.json");
        this.addChild(UI.node);
        var self = this;
        if (typeof(index) != "undefined"){ 
            this._index = index;
        }
        this._isSupportFriendShop = FriendCard_Common.isOpenFriendShop();
        this._isOpenFriendShop = openFriendShop;
        this._canCheck = canCheck;
        this._zengSongID =  null;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0]);
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) {
            setWgtLayout(_back,[0.92, 0.92], [0.62, 0.49], [0, -0.02]);
        }

        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

        this._yuanbaNode =  _back.getChildByName("Node_yuanbao");
        this._fangkaNode =  _back.getChildByName("Node_fangka");
        this._zengsongNode =  _back.getChildByName("Node_zengsong");
        //_panelNodes index对应showTab的index
        this._panelNodes = [
            this._yuanbaNode,
            this._fangkaNode,
            this._zengsongNode,
        ]
        this._zengsongText = this._fangkaNode.getChildByName("bg_zengsong");
        this._zengsongText.visible = false;
        this._zengsongNode.visible = false;

        var _Text_yuanbaoCount = this._yuanbaNode.getChildByName("Text_goldCount");
        var _Text_fangkaCount = this._fangkaNode.getChildByName("Text_goldCount");

        _Text_yuanbaoCount.setString("0");
        _Text_fangkaCount.setString("0");

        if(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.money)
        {
            _Text_yuanbaoCount.setString(MjClient.data.pinfo.money);
            _Text_fangkaCount.preValue = MjClient.data.pinfo.fangka;
            _Text_fangkaCount.setString(MjClient.data.pinfo.fangka);
        }else{
            _Text_fangkaCount.preValue = 0;
        }

        _Text_yuanbaoCount.ignoreContentAdaptWithSize(true);
        _Text_fangkaCount.ignoreContentAdaptWithSize(true);

        UIEventBind(null, _Text_yuanbaoCount, "updateInfo", function () {
            var icurrentMoney = parseInt(_Text_yuanbaoCount.getString());
            var lastMoney = parseInt(MjClient.data.pinfo.money);
            var icurrentMoney2 = _Text_fangkaCount.preValue;
            var lastMoney2 = parseInt(MjClient.data.pinfo.fangka);
            if (lastMoney > icurrentMoney) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(_Text_yuanbaoCount.getContentSize().width / 2, _Text_yuanbaoCount.getContentSize().height / 2);
                _Text_yuanbaoCount.addChild(starParticle);
                _Text_yuanbaoCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            if (lastMoney2 > icurrentMoney2) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(_Text_fangkaCount.getContentSize().width / 2, _Text_fangkaCount.getContentSize().height / 2);
                _Text_fangkaCount.addChild(starParticle);
                _Text_fangkaCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            _Text_yuanbaoCount.setString(MjClient.data.pinfo.money+"");
            _Text_fangkaCount.setString(MjClient.data.pinfo.fangka + "");
            _Text_fangkaCount.preValue = MjClient.data.pinfo.fangka;
        });

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Close", {uid:SelfUid()});
                self.removeFromParent();
            }
        }, this);

        var btn_tousu = _back.getChildByName("btn_tousu");
        if(btn_tousu){
            btn_tousu.addTouchEventListener(function (sender, type) {
                if (type == 2) {
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
                    
                }
            }, this);
        }

        this.Button_yuanbao_tab = _back.getChildByName("Button_switch_yb");
        this.Button_fangka_tab = _back.getChildByName("Button_switch_fk");
        this.Button_zengsong_tab = _back.getChildByName("Button_switch_zs");
        
        this._yuanbaNode._bindBtn = this.Button_yuanbao_tab;
        this._fangkaNode._bindBtn = this.Button_fangka_tab;
        this._zengsongNode._bindBtn = this.Button_zengsong_tab;
        
        //按顺序的坐标位置
        this._btnTabPosArr = [
            this.Button_yuanbao_tab.getPosition(),
            this.Button_fangka_tab.getPosition(),
            this.Button_zengsong_tab.getPosition()
        ]
        if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            this.adaptation();
        }
        this.localStorageKey={};
        this.localStorageKey.KEY_STORE_TYPE = "KEY_STORE_TYPE";
        if (typeof(index) != "undefined"){ 
            this._index = index;
            if(this._index != 0){
                this.Button_fangka_tab.setPosition(this._btnTabPosArr[0]);
                this.Button_zengsong_tab.setPosition(this._btnTabPosArr[1]);
                this.Button_yuanbao_tab.visible = false;
            }
        }else{
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ
                || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP){
                this._index = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_STORE_TYPE, 1);
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_STORE_TYPE, this._index);
            }
            
        }
        //是否支持亲友圈商场
        if(this._isSupportFriendShop){
            this.Button_switch_friendhShop = _back.getChildByName("Button_switch_friendhShop");
            this._friendShopNode = _back.getChildByName("Node_friendShop");
            this._friendShopNode._bindBtn = this.Button_switch_friendhShop;
            this._friendShopNode.visible = false;

            this.Button_switch_friendShop_shenhe = _back.getChildByName("Button_switch_friendShop_shenhe");
            this._friendShopShenheNode = _back.getChildByName("Node_friendShop_shenhe");
            this._friendShopShenheNode._bindBtn = this.Button_switch_friendShop_shenhe;
            this._friendShopShenheNode.visible = false;
            if(cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && this._isOpenFriendShop){
                //亲友圈打开展示亲友圈商场
                this._clubInfo = FriendCard_Common.getClubInfo();
                this._panelNodes.push(this._friendShopNode);
                this._panelNodes.push(this._friendShopShenheNode);

                this._btnTabPosArr.push(this.Button_switch_friendShop_shenhe.getPosition());
                if(this._canCheck){
                    this.Button_switch_friendhShop.setPosition(this._btnTabPosArr[1]);
                    this.Button_switch_friendShop_shenhe.setPosition(this._btnTabPosArr[2]);
                    this.Button_zengsong_tab.setPosition(this._btnTabPosArr[3]);
                    this.Button_switch_friendShop_shenhe.visible = true;
                }else{
                    this.Button_switch_friendhShop.setPosition(this._btnTabPosArr[1]);
                    this.Button_zengsong_tab.setPosition(this._btnTabPosArr[2]);
                    this.Button_switch_friendShop_shenhe.visible = false;
                }
                this.Button_switch_friendhShop.visible = true;
                this.Button_switch_friendhShop.addTouchEventListener(function (sender, type) {
                    if (type == 2) {
                        this.showTab(3);
                    }
                }, this);

                this.Button_switch_friendShop_shenhe.addTouchEventListener(function (sender, type) {
                    if (type == 2) {
                        this.showTab(4);
                    }
                }, this);
            }else{
                this.Button_switch_friendhShop.visible = false;
                this.Button_switch_friendShop_shenhe.visible = false;
            }
        } else{
            this.Button_switch_friendhShop = _back.getChildByName("Button_switch_friendhShop");
            if(this.Button_switch_friendhShop){
                this.Button_switch_friendhShop.visible = false;
                this._friendShopNode = _back.getChildByName("Node_friendShop");
                this._friendShopNode._bindBtn = this.Button_switch_friendhShop;
                this._friendShopNode.visible = false;

                this.Button_switch_friendShop_shenhe = _back.getChildByName("Button_switch_friendShop_shenhe");
                this.Button_switch_friendShop_shenhe.visible = false;
                this._friendShopShenheNode = _back.getChildByName("Node_friendShop_shenhe");
                this._friendShopShenheNode._bindBtn = this.Button_switch_friendShop_shenhe;
                this._friendShopShenheNode.visible = false;
            }
        }
        
        this.Button_fangka_tab.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Fangka", {uid:SelfUid()});
                this.showTab(1);
                var pinfo = MjClient.data.pinfo;
                var dayStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
                var timeNum = util.localStorageEncrypt.getNumberItem("_TIME_NUM"+dayStr, 0);
                if(!pinfo.mobileNum && timeNum < 3){
                    MjClient.Scene.addChild(new bindPhoneNumNewLayer());
                    timeNum++;
                    util.localStorageEncrypt.setNumberItem("_TIME_NUM"+dayStr, timeNum);
                }
            }
        }, this);

        this.Button_yuanbao_tab.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold", {uid:SelfUid()});
                this.showTab(0);
            }
        }, this);

        this.Button_zengsong_tab.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Zengsong", {uid:SelfUid()});
                this.showTab(2);
            }
        }, this);

        var btnBangdingyouli = _back.getChildByName("btn_bangdingyouli");
        if(btnBangdingyouli){
            UIEventBind(null, btnBangdingyouli, "bangdingyouliVisibleFalse", function () {
                btnBangdingyouli.setVisible(false);
            })

            btnBangdingyouli.setVisible(false);
            btnBangdingyouli.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
                    {
                        //self.removeFromParent();
                    });
                    self.addChild(layer);
                }
            }, this);
        }

        var isShowBind = !(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&!MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP;
        if(isAgent() && isShowBind)
        {
            btnBangdingyouli.setVisible(true);
            this.setBindView(MjClient.data.pinfo.bindHistory);
            this.showIsBindUi(true);
            var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
            {
                //self.removeFromParent();
            });
            self.addChild(layer);
        }else{
            this.showIsBindUi(true)
        }

        //未实名认证弹实名认证
        var pinfo = MjClient.data.pinfo;
        if(!pinfo.identityNum && MjClient.systemConfig.shiMingRenZhengStore == "true"){
            self.addChild(new shiMingRenZhengLayer());
        }

        this.touchEventFun = function touchEventFun(sender,type)
        {
            if(type == 2)
            {
                ////成功后，加粒子效果
                //var starParticle =  new cc.ParticleSystem("Particle/diamondtail.plist");
                //starParticle.setPosition(_Text_goldCount.getContentSize().width/2, _Text_goldCount.getContentSize().height/2);
                //_Text_goldCount.addChild(starParticle);
                //_Text_goldCount.runAction(cc.sequence(cc.scaleTo(1,1.5).easing(cc.easeBackOut()),cc.scaleTo(0.3,1)));

                if (this._index == 0)
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Buy", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Fangka_Buy", {uid:SelfUid()});

                if(!MjClient.systemConfig ||!MjClient.systemConfig.recharge)
                {
                    return MjClient.showToast("获取支付数据失败");
                }
                // MjClient.showToast("==== 赠送给ID："+self._zengSongID)
                var itagID = sender.getTag();
                if (MjClient.systemConfig.recharge.length > 1) {
                    cc.log("rechange 长度 > 1 " + itagID);
                    MjClient.Scene.addChild(new payWayLayer(function(platform){
                        MjClient.recharge(itagID, parseInt(platform), null, null, {receiverId:self._zengSongID});
                    }, this._index == 0 ? "gold" : "coin", null, sender.rechargeName));
                }
                else {
                    MjClient.recharge(itagID, parseInt(MjClient.systemConfig.recharge[0].platform), null, null, 
                        {receiverId:self._zengSongID})
                }
            }
        }
        
        
        var text5 = _back.getChildByName("Text_5");
        if(text5){
            text5.setVisible(false)
        }
        
        this._diaoXian = _back.getChildByName("Image_bg")
        if(this._diaoXian){
            // this._diaoXian.setAnchorPoint(cc.p(0.5, 1));
            this.schedule(function(){
                self.Button_zengsong_tab.visible = self.Button_fangka_tab.visible;
                this._diaoXian.visible = self.Button_fangka_tab.visible;
            });
    
            if(index){
                this._diaoXian.setScale9Enabled(true);
                this._diaoXian.height *= 0.8;
                this._diaoXian.y += 60;
            }
        }else{
            this.schedule(function(){
                self.Button_zengsong_tab.visible = self.Button_fangka_tab.visible;
            });
        }

        //处理一下btn Disabled图片
        for(var i = 0 ; i < this._panelNodes.length;i++){
            this._panelNodes[i]._bindBtn.loadTextureDisabled(this._panelNodes[i]._bindBtn.getPressedFile().file);
        }

        if(this._index && this._index > -1 && this._panelNodes[this._index] && this._panelNodes[this._index]._bindBtn.visible){
            this.showTab(this._index);
        }else{
            var hasFind = false;
            for(var i = 0 ;i < this._panelNodes.length; i++){
                if(this._panelNodes[i]._bindBtn.visible){
                    hasFind = true;
                    this.showTab(i);
                    break;
                }
            }
            if(!hasFind){
                this.showTab(0);
            }
        }

        this.showKeFuBtn();
    },
    showKeFuBtn: function() {
        var filePath = "store/kefuBtn.png";
        if (!jsb.fileUtils.isFileExist(filePath))
            return;

        var keFuBtn = new ccui.Button(filePath);
        this._back.addChild(keFuBtn);
        keFuBtn.setPosition(192.67, this._back.height - keFuBtn.height / 2);

        keFuBtn.addTouchEventListener(function(sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED)
                return;

            if (!isCurrentNativeVersionBiggerThan("14.0.0")) {
                MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                    type: 9
                }, function(rtn) {
                    if (rtn.code == 0) {
                        MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        } else {
                            MjClient.showToast("获取数据失败");
                        }
                    }
                });
            } else {
                MjClient.native.showQiYuChatDialog();
            }
        });
    },
    showTab: function (index, type) {
        cc.log("showTab index",index)
        if(type !== 1){
            this._zengSongID =  null;
        }
        for(var i = 0 ; i < this._panelNodes.length; i++){
            this._panelNodes[i].visible = (i == index);
            this._panelNodes[i]._bindBtn.setTouchEnabled((i != index));
            this._panelNodes[i]._bindBtn.setBright((i != index))
        }

        if (index > -1) {
            if(this._isSupportFriendShop && this._isOpenFriendShop){
                if(index !== 3 && index !== 4){
                    this._back.loadTexture("store/bg1_jinbi.png")
                }else{
                    this._back.loadTexture("store/bg_friendShop.png")
                }
            }
            this._zengsongText.setVisible(false);
            if (index == 0) {//元宝商场
                this.getYuanBaoTabData();
            } else if (index == 1) {//钻石商场
                this._zengsongText.setVisible(type == 1);
                this.getFangkaTabData();
            } else if (index == 2) {//赠送
                this._zengsongText.setVisible(true);
                this.InitZengSongNode();
            } else if (index == 3) {//亲友圈钻石商场
                this.initFriendShopNode();
            } else if (index == 4) {//亲友圈钻石订单审核
                this.initFriendShopShenheNode();
            }
	       util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_STORE_TYPE, index);
        }else {
            return;
        }
        if (!FriendCard_Common.IsOpenRoomCardPay()) {
            this.Button_fangka_tab.visible = false;
            this.Button_yuanbao_tab.visible = false;
        }
    },
    //江苏  永利  代码~~~~
    adaptation: function() {    // 自适应显示
        var back = this._back;
        var childrens = back.getChildren();

        if (MjClient.size.width / MjClient.size.height > back.width / back.height) {
            var a = (MjClient.size.width / MjClient.size.height) / (back.width / back.height);
            var width_dis =  back.width - back.width *a;
            back.width *= a;
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                back.getChildByName("bg_image").width *= a;
                // back.getChildByName("bg_image").x *= a;
                back.getChildByName("Image_1").width *= a;
                back.getChildByName("Image_2").width *= a;
                back.getChildByName("Text_goldCount").width *= a;
                back.getChildByName("Text_goldCount_fangka").width *= a;
                back.getChildByName("jinbi_icon").width *= a;
                back.getChildByName("yuanbao_1_1").width *= a;
            }else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                this.Button_fangka_tab.x += width_dis / 2;
                this.Button_yuanbao_tab.x += width_dis / 2;
            }
            
            for (var i = 0; i < childrens.length; i++) {
                if (childrens[i]) {
                    childrens[i].x *= a;
                }
            }

        } else {
            var a = (back.width / back.height) / (MjClient.size.width / MjClient.size.height);
            back.height *= a;
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                back.getChildByName("bg_image").height *= a;
                // back.getChildByName("bg_image").y *= a;
                back.getChildByName("Image_1").height *= a;
                back.getChildByName("Image_2").height *= a;
                back.getChildByName("Text_goldCount").height *= a;
                back.getChildByName("Text_goldCount_fangka").height *= a;
                back.getChildByName("jinbi_icon").height *= a;
                back.getChildByName("yuanbao_1_1").height *= a;
            }
            
            for (var i = 0; i < childrens.length; i++) {
                if (childrens[i]) {
                    childrens[i].y *= a;
                }
            }
        }
    },
    getFangkaTabData: function() {
        var self = this;
        if (this._hasInitFangkaTabData) {
            return;
        }
        this._panelNodes[1].visible = false;
        MjClient.getFangkaRechargeLadder(function() {
            if (!cc.sys.isObjectValid(self)) {
                return;
            }
            this._hasInitFangkaTabData = true;
            this._panelNodes[1].visible = true;

            var fangkaListView = this._fangkaNode.getChildByName("fangkaListView");
            var rowLayout = this._fangkaNode.getChildByName("rowLayout");
            var colIndex = 0;
            var rowItem = null;

            fangkaListView.setScrollBarAutoHideEnabled(false);
            fangkaListView.setScrollBarEnabled(true);
            rowLayout.setVisible(false);
            for (var i = 0; i < 4; i++) {
                rowLayout.getChildByName("bg_item_" + i).setVisible(false);
            }

            for (var i = 0; i < MjClient.rechargeLadderFangka.length; i++, colIndex++) {
                colIndex = colIndex % 4;
                if (colIndex == 0) {
                    rowItem = rowLayout.clone();
                    rowItem.setVisible(true);
                    fangkaListView.pushBackCustomItem(rowItem);
                }

                var _itemNode = rowItem.getChildByName("bg_item_" + colIndex);
                _itemNode.setVisible(true);
                _itemNode.addTouchEventListener(this.touchEventFun, this);

                var _data = MjClient.rechargeLadderFangka[i];
                _itemNode.setTag(_data.id);
                _itemNode.rechargeName = "fangka";

                var _itemIcon = _itemNode.getChildByName("Image_3");
                // _itemIcon.loadTexture("store/fk_" + (i + 1) + ".png");

                if (_data.image) {
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ &&
                        (!(!_data.title || _data.title == "") || _data.discountAmount)) {
                        _itemIcon.y = 150;
                    }
                    this.setItemImage(_data.image, _itemIcon);
                }
                if (MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP && MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP) {
                    _itemIcon.ignoreContentAdaptWithSize(true);
                }


                var _moneyNode = _itemNode.getChildByName("Text_1");
                _moneyNode.setString(_data.money + "钻石");
                _moneyNode.setLocalZOrder(201);
                if (_data.discountAmount && _data.total) {
                    _moneyNode.setString(_data.total + "钻石");
                }
                _moneyNode.ignoreContentAdaptWithSize(true);

                var _presentNode = _itemNode.getChildByName("Text_song");
                _presentNode.ignoreContentAdaptWithSize(true);
                _presentNode.zIndex = 101;

                var _Image_song = _itemNode.getChildByName("Image_song");
                if (!_Image_song) {
                    _Image_song = _presentNode;
                }
                _Image_song.zIndex = 100;
                if (!_data.title || _data.title == "") {
                    _Image_song.visible = false;
                    _presentNode.visible = false;
                } else {
                    _presentNode.setString(_data.title);
                    _Image_song.visible = true;
                    _presentNode.visible = true;
                }
                if (_data.discountAmount) {
                    _presentNode.setVisible(false);
                    _Image_song.setVisible(false);
                } else {
                    if (MjClient.getAppType() !== MjClient.APP_TYPE.QXJSMJ &&
                        MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
                        MjClient.getAppType() !== MjClient.APP_TYPE.QXXXGHZ) {
                        _Image_song.setPositionY(_Image_song.getPositionY() - 20);
                        _presentNode.setPositionY(_presentNode.getPositionY() - 20);
                    }

                }

                // 按钮
                var _btn = _itemNode.getChildByName("Button_1");
                var _amountNode = _btn.getChildByName("Text_money");
                _amountNode.setString(Number(_data.amount) + "元");
                _amountNode.ignoreContentAdaptWithSize(true);

                var _yuan = _amountNode.getChildByName("yuan");
                if (_yuan) _yuan.x = _amountNode.width;

                // 折扣价格
                var textMoneyDiscount = _itemNode.getChildByName("Text_money_discount");
                textMoneyDiscount.ignoreContentAdaptWithSize(true);
                textMoneyDiscount.setLocalZOrder(201);
                if (_data.discountAmount) {
                    textMoneyDiscount.setVisible(true);
                    var str = "";
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) { // 江苏的折扣价格放在按钮上
                        _amountNode.setString(str + Number(_data.discountAmount) + "元");
                        textMoneyDiscount.setString(Number(_data.amount) + "元");
                    } else {
                        textMoneyDiscount.setString(str + Number(_data.discountAmount) + "元");
                    }
                } else {
                    textMoneyDiscount.setVisible(false);
                }

                /*_Image_song.setPositionX(textMoneyDiscount.getPositionX());
                 _Image_song.setPositionY(textMoneyDiscount.getPositionY()+20);
                 _presentNode.setPositionX(textMoneyDiscount.getPositionX());
                 _presentNode.setPositionY(textMoneyDiscount.getPositionY()+20);*/

                var _Image_hot = _itemNode.getChildByName("Image_hot");
                _Image_hot.visible = i < 2;

                if (_data.discountAmount) {
                    var Draw = new cc.DrawNode();
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                        Draw.drawSegment(cc.p(20, _amountNode.height - 20), cc.p(_btn.width - 20, _btn.height - _amountNode.height + 20), 1, cc.color("#CB470D"));
                        Draw.y = 45;
                    } else {
                        Draw.drawSegment(cc.p(20, _amountNode.height - 20), cc.p(_btn.width - 20, _btn.height - _amountNode.height + 20), 2.5, cc.color("#E45A43"));
                    }
                    if (MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
                        Draw.y = 20;
                    }
                    _btn.addChild(Draw);
                }
            }

        }.bind(this));
    },
    getYuanBaoTabData:function () {
        var self = this;
        if(this._hasInitYuanBaoTabData){
            return;
        }
        this._panelNodes[0].visible = false;
        MjClient.getRechargeLadder(function () {
            if (!cc.sys.isObjectValid(self)) {
                return;
            }
            this._hasInitYuanBaoTabData = true;
            this._panelNodes[0].visible = true;
            for(var i = 0;i < MjClient.rechargeLadder.length;i++)
            {
                var _itemNode =  this._yuanbaNode.getChildByName("bg_item_" + i);
                if(!_itemNode)
                {
                    continue;
                }
                _itemNode.visible = this.isBind;
                _itemNode.addTouchEventListener(this.touchEventFun,this);


                var _data =  MjClient.rechargeLadder[i];
                _itemNode.setTag(_data.id);


                var _itemIcon = _itemNode.getChildByName("Image_3");
                // _itemIcon.setZOrder(0);
                // _itemIcon.loadTexture("store/yuanbao_" + (i + 1) + ".png");

                if(_data.image)
                {
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ 
                        && (!(!_data.title || _data.title == "") || _data.discountAmount)) {
                        _itemIcon.y = 160;
                    }
                    this.setItemImage(_data.image, _itemIcon);
                }
                if (MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP && MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP) {
                    _itemIcon.ignoreContentAdaptWithSize(true);
                }
                

                var _moneyNode = _itemNode.getChildByName("Text_1");
                _moneyNode.setString(_data.money + "个");
                _moneyNode.setLocalZOrder(201);
                if(_data.discountAmount && _data.total){
                    _moneyNode.setString(_data.total + "个");
                }
                _moneyNode.ignoreContentAdaptWithSize(true);

                var _presentNode = _itemNode.getChildByName("Text_song");
                _presentNode.ignoreContentAdaptWithSize(true);
                _presentNode.zIndex = 101;
                var _Image_song = _itemNode.getChildByName("Image_song");
                if(!_Image_song){
                    _Image_song = _presentNode;
                }
                _Image_song.zIndex = 100;
                if(!_data.title|| _data.title == "")
                {
                    _Image_song.visible = false;
                    _presentNode.visible = false;
                }
                else
                {
                    _presentNode.setString(_data.title);
                    _Image_song.visible = true;
                    _presentNode.visible = true;
                }
                if(_data.discountAmount){
                    _presentNode.setVisible(false);
                    _Image_song.setVisible(false);
                }else {
                    if(MjClient.getAppType() != MjClient.APP_TYPE.QXJSMJ && 
                        MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
                        MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ){
                        _Image_song.setPositionY(_Image_song.getPositionY() - 20);
                        _presentNode.setPositionY(_presentNode.getPositionY() - 20);
                    }
                }

                // 按钮
                var _btn = _itemNode.getChildByName("Button_1");
                var _amountNode = _btn.getChildByName("Text_money");
                _amountNode.setString(Number(_data.amount) + "元");
                _amountNode.ignoreContentAdaptWithSize(true);

                // 折扣价格
                var textMoneyDiscount = _itemNode.getChildByName("Text_money_discount");
                textMoneyDiscount.ignoreContentAdaptWithSize(true);
                textMoneyDiscount.setLocalZOrder(201);
                if(_data.discountAmount){
                    textMoneyDiscount.setVisible(true);
                    var str = "";
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) { // 江苏的折扣价格放在按钮上
                        _amountNode.setString(str+Number(_data.discountAmount)+"元");
                        textMoneyDiscount.setString(Number(_data.amount) + "元");
                    }
                    else {
                        textMoneyDiscount.setString(str+Number(_data.discountAmount)+"元");
                    }
                }else {
                    textMoneyDiscount.setVisible(false);
                }

                var yuanIcon = _amountNode.getChildByName("yuan");
                if (yuanIcon) {
                    yuanIcon.setPositionX(_amountNode.getContentSize().width);
                }

                var _Image_hot = _itemNode.getChildByName("Image_hot");
                _Image_hot.visible = false;

                if(_data.discountAmount)
                {
                    var Draw = new cc.DrawNode();
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                        Draw.drawSegment(cc.p(20, _amountNode.height-20), cc.p(_btn.width-20, _btn.height -_amountNode.height+20), 1, cc.color("#CB470D"));
                        Draw.y = 45;
                    }
                    else {
                        Draw.drawSegment(cc.p(20, _amountNode.height-20), cc.p(_btn.width-20, _btn.height -_amountNode.height+20), 2.5, cc.color("#E45A43"));
                    }
                    if (MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
                        Draw.y = 20;
                    }
                    _btn.addChild(Draw);
                }


            }

            for(var i = MjClient.rechargeLadder.length;i < 8;i++){
                var _itemNode =  this._yuanbaNode.getChildByName("bg_item_" + i);
                if(!_itemNode)
                {
                    continue;
                }
                _itemNode.setVisible(false);
            }
        }.bind(this));

    },
    InitZengSongNode: function () {
        var self = this;
        this._zengSongID = null;
        var node_find = this._zengsongNode.getChildByName("node_find");
        var node_info = this._zengsongNode.getChildByName("node_info");
        var node_list = this._zengsongNode.getChildByName("node_list");
        node_find.visible = true;
        node_info.visible = false;
        node_list.visible = false;
        var self = this;
        var Image_search = node_find.getChildByName("input_id");
        var edtContentSize = Image_search.getContentSize();
        if(this.edt_input){
            this.edt_input.removeFromParent();
        }
        this.edt_input = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
        var edt_input = this.edt_input;
        edt_input.setFontColor(cc.color("#2B344C"));
        edt_input.setPlaceholderFontColor(cc.color(0xFF, 0xFF, 0xFF));
        edt_input.setMaxLength(10);
        edt_input.setFontSize(34);
        edt_input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        edt_input.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        edt_input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        edt_input.setPlaceHolder("");
        edt_input.setString("");
        if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ){
            edt_input.setFontColor(cc.color("#ffffff"));
        }
        // edt_input.setPlaceholderFontColor(cc.color("#ffffff"));
        // edt_input.setPlaceholderFontName("fonts/lanting.TTF");
        // edt_input.setPlaceholderFontSize(30);
        edt_input.setPosition(edtContentSize.width / 2, edtContentSize.height / 2);
        Image_search.addChild(edt_input);
        var hintTxt = new ccui.Text();
        hintTxt.setFontName("fonts/lanting.TTF");
        hintTxt.setName("hintTxt");
        hintTxt.setFontSize(26);
        hintTxt.setString("请输入好友ID（仅支持为好友充值钻石）");
        hintTxt.defaultText = "请输入好友ID（仅支持为好友充值钻石）";
        hintTxt.defaultColor = cc.color("#b7b7b6");
        if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ){
            hintTxt.defaultColor = cc.color("#ffffff");
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ){
            hintTxt.defaultColor = cc.color("#000000");
        }
        hintTxt.setColor(hintTxt.defaultColor);
        hintTxt.setAnchorPoint(0, 0.5);
        hintTxt.setPosition(0 + 10, edt_input.height / 2);
        edt_input.addChild(hintTxt);
        edt_input.setDelegate(this);
        this.edt_input.unscheduleAllCallbacks();
        this.edt_input.schedule(function(){
            hintTxt.setVisible(!edt_input.getString());
        })
        var btn_find = node_find.getChildByName("btn_find");
        btn_find.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var idStr = edt_input.getString();
                var id = Number(idStr);
                if (!id || id < 1000) {
                    MjClient.showToast("请输入正确的玩家id！");
                    return;
                }
                edt_input.setString("");
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.chargeUserInfo", { userId: id }, function (rtn) {
                    if (rtn.code == 0 && rtn.data) {
                        self.setSearChUserView(rtn.data);
                        node_find.visible = false;
                        node_info.visible = true;
                        node_list.visible = false;
                    }else{
                        MjClient.showToast(rtn.message);
                    }
                    MjClient.unblock();
                });
                MjClient.native.umengEvent4CountWithProperty("ZengSong_FangKa_Chazhao", { uid: SelfUid() });
            }
        }, this);

        this.listView_record = node_list.getChildByName("listView_record");
        this.cell_list = node_list.getChildByName("cell_list");
        this.cell_list.visible = false;
        var _listViewState = 0;
        this.listView_record.addCCSEventListener(function (sender, type) {
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState == 0) {
                        _listViewState = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1) {
                        self.reqRecord();
                    }
                    _listViewState = 0;
                    break;
            }
        });

        var btn_back = node_list.getChildByName("btn_back");
        btn_back.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                node_find.visible = true;
                node_info.visible = false;
                node_list.visible = false;
            }
        }, this);

        var btn_record = this._zengsongNode.getChildByName("btn_record");
        if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ){
            btn_record = node_find.getChildByName("btn_record");
        }
        btn_record.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.reqRecord();
            }
        }, this);
        this._lastId = 0;
        this.reqRecord = function () {
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.rechargeGiveList", { offset: self._lastId, length: 20 }, function (rtn) {
                if (rtn.code == 0 && rtn.data) {
                    node_find.visible = false;
                    node_info.visible = false;
                    node_list.visible = true;
                    // MjClient.showToast(" ==== jilu~~~~ id " + self._lastId);
                    self.addRecord(rtn.data);
                }
                MjClient.unblock();
            });
        }

        this.addRecord = function (data) {
            if (!this._lastId) this.listView_record.removeAllItems();
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                this.listView_record.pushBackCustomItem(this.addItemRecord(element, index + 1));

            }
            if (!this.tipTxt) {
                this.tipTxt = new ccui.Text();
                this.tipTxt.setFontName("fonts/lanting.TTF");
                this.tipTxt.setFontSize(30);
                this.tipTxt.setString("您暂时没有记录");
                this.tipTxt.setPosition(cc.p(610, 290));
                node_list.addChild(this.tipTxt);

            }
            this.tipTxt.visible = this._lastId == 0;


        }.bind(this);
        this.addItemRecord = function (oneData, index) {
            if (!cc.sys.isObjectValid(this.cell_list)) return;
            var copyNode = this.cell_list.clone();
            copyNode.visible = true;
            var _time = copyNode.getChildByName("text_time");

            var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy/MM/dd hh:mm:ss');
            _time.ignoreContentAdaptWithSize(true);
            _time.setString(_timeStr);
            var text_id = copyNode.getChildByName("text_id");
            text_id.setString("玩家ID：" + oneData.userId)
            var text_num = copyNode.getChildByName("text_num");
            text_num.setString("" + oneData.title)
            var text_ok = copyNode.getChildByName("text_ok");
            text_ok.setString("" + oneData.isPay == 1 ? "成功" : "未支付");
            if(MjClient.getAppType() === MjClient.APP_TYPE.AYGUIZHOUMJ) {
                if(oneData.isPay == 1){
                    text_ok.setColor(cc.color("#01aa30"));
                }else{
                    text_ok.setColor(cc.color("#e55100"));
                }
            }

            this._lastId = index;
            return copyNode;
        }.bind(this);


        this.setSearChUserView = function (playerData) {
            var Text_name = node_info.getChildByName("Text_name");
            var Text_id = node_info.getChildByName("Text_ID");
            Text_name.setString(getNewName(unescape(playerData.nickname)));
            Text_name.setFontName("Arial");
            Text_name.setFontSize(Text_name.getFontSize()); //不知道为什么要重新设置一遍 否则字体很小
            Text_id.setString("ID:" + playerData.userId);
            this.addMemberLastUserId = playerData.userId;
            this._zengsongText.getChildByName("Text_zs").setString("赠送给ID:" + playerData.userId);
            this._zengSongID = playerData.userId;

            var head1 = node_info.getChildByName("Image_head");
            head1.visible = false;
            var headicon = node_info.getChildByName("headbg");
            headicon.isMask = true;
            var url = playerData.headimgurl ? playerData.headimgurl : "png/default_headpic.png"
            cc.loader.loadImg(url, {
                isCrossOrigin: true
            }, function (err, texture) {
                if (!err && texture && cc.sys.isObjectValid(headicon)) {
                    var headSprite = new cc.Sprite(texture);
                    headSprite.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                    headSprite.setScale((headicon.getContentSize().width - 7) / headSprite.getContentSize().width);
                    headicon.addChild(headSprite);
                }
            });

        }

        var btn_zengsong = node_info.getChildByName("btn_zengsong");
        btn_zengsong.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.showTab(1, 1);
            }
        }, this);

    },
    initFriendShopNode: function () {
        var that = this;
        if(this._hasInitFriendShopNode){
            return;
        }
        this._friendShopNode.visible = false;

        this._friendShopNode._text_zuanshiCount = this._friendShopNode.getChildByName("Text_zuanshiCount");
        
        var _text_zuanshiCount = this._friendShopNode._text_zuanshiCount;
        _text_zuanshiCount.ignoreContentAdaptWithSize(true);
        _text_zuanshiCount.setString(MjClient.data.pinfo.fangka+"");
        _text_zuanshiCount.schedule(function(){
            _text_zuanshiCount.setString(MjClient.data.pinfo.fangka+"");
        },1);

        var button_send = this._friendShopNode.getChildByName("Button_send");
        if(!isAgent()){
            button_send.visible = false;
        }
        button_send.addTouchEventListener(function(sender,type){
            if(type == 2){
                that.addChild(new Friendcard_shop_send());
            }
        })
        var Image_search = this._friendShopNode.getChildByName("Image_search");
        var btn_find = Image_search.getChildByName("Button_find");
        var edtContentSize = Image_search.getContentSize();
        edtContentSize.width -= (btn_find.width + 10);
        this._friendShopNode._edt_input = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
        var edt_input = this._friendShopNode._edt_input;
        edt_input.setFontColor(cc.color("#dab761"));
        edt_input.setPlaceholderFontColor(cc.color("#dab761"));
        edt_input.setMaxLength(10);
        edt_input.setFontSize(20);
        edt_input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        edt_input.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        edt_input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        edt_input.setPlaceHolder("输入玩家ID搜索其他商城");
        edt_input.setString("");
        edt_input.setPosition(edtContentSize.width / 2, edtContentSize.height / 2);
        Image_search.addChild(edt_input);
        
        btn_find.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var idStr = edt_input.getString();
                var id = Number(idStr);
                if (!id || id < 1000) {
                    MjClient.showToast("请输入正确的玩家id！");
                    return;
                }
                this._reqFriendShopData();
            }
        }, this);
        this._friendShopNode._Text_empty_tip = this._friendShopNode.getChildByName("Text_empty_tip");
        this._friendShopNode._Text_empty_tip.ignoreContentAdaptWithSize(true);
        this._reflashFriendShop = function(){
            var data  = this._friendShopNode._data;
            var Text_name = this._friendShopNode.getChildByName("name");
            Text_name.ignoreContentAdaptWithSize(true);
            Text_name.setString("")
            var Text_id = this._friendShopNode.getChildByName("uid");
            Text_id.ignoreContentAdaptWithSize(true);
            Text_id.setString("")
            var _head = this._friendShopNode.getChildByName("head");
            var _headBg = this._friendShopNode.getChildByName("headBg");
            _head.visible = false;
            _headBg.visible = false;
            _head.removeAllChildren();
            var itemLength = data.list ? data.list.length : 0; 
            for(var i = 0 ; i < itemLength; i++){
                var itemData = data.list[i];
                var itemNode = this._friendShopNode.getChildByName("bg_item_"+i);
                itemNode.removeChildByName("goodServerImg");
                itemNode.visible = true;
                itemNode._data = itemData;
                var zuanshiNumTxt = itemNode.getChildByName("Text_1");
                zuanshiNumTxt.ignoreContentAdaptWithSize(true);
                if(!zuanshiNumTxt._standFontSize){
                    zuanshiNumTxt._standFontSize = zuanshiNumTxt.getFontSize();
                }
                var zuanshiMoneyText = itemNode.getChildByName("Button_1").getChildByName("Text_money");
                zuanshiMoneyText.ignoreContentAdaptWithSize(true);
                var zuanshiZengSongBg = itemNode.getChildByName("Image_song");
                var zuanshiZengSongText = itemNode.getChildByName("Text_song");
                zuanshiZengSongText.ignoreContentAdaptWithSize(true);

                zuanshiNumTxt.setFontSize(zuanshiNumTxt._standFontSize-2)
                if(itemData.amount >= 1000){
                    zuanshiNumTxt.setFontSize(zuanshiNumTxt._standFontSize-4)
                }
                zuanshiNumTxt.setString(itemData.amount+"钻石");
                zuanshiMoneyText.setString(""+itemData.price);
                if(itemData.present){
                    zuanshiZengSongBg.visible = true;
                    zuanshiZengSongText.visible = true;
                    zuanshiZengSongBg.zIndex = 1;
                    zuanshiZengSongText.zIndex = 2;
                    zuanshiZengSongText.setString("赠送"+itemData.present);
                }else{
                    zuanshiZengSongBg.visible = false;
                    zuanshiZengSongText.visible = false;
                }
                var imgIcon = itemNode.getChildByName("Image_3");
                imgIcon.visible = true;
                if(itemData.image){
                    this.setItemImage(itemData.image,imgIcon,"goodServerImg");
                }
                itemNode.addTouchEventListener(function(sender,type){
                    if(type == 2){
                        that._reqBuyFriendShopItem(sender._data);
                    }
                })
            }
            for(var i = itemLength ; i < 8; i++){
                this._friendShopNode.getChildByName("bg_item_"+i).visible = false;
            }
            if(data.userId){
                Text_name.setString(unescape(data.nickname))
                Text_id.setString(unescape(data.userId))
                _head.visible = true;
                _headBg.visible = true;
                var url = data.headimgurl ? data.headimgurl : "png/default_headpic.png"
                cc.loader.loadImg(url, {
                    isCrossOrigin: true
                }, function (err, texture) {
                    if (!err && texture && cc.sys.isObjectValid(_head)) {
                        var clippingNode = new cc.ClippingNode();
                        var mask = new cc.Sprite("hall/headMask.png");
                        clippingNode.setAlphaThreshold(0);
                        clippingNode.setStencil(mask);
                        var img = new cc.Sprite(texture);
                        img.setScale(mask.getContentSize().width/img.getContentSize().width);
                        clippingNode.addChild(img);
                        clippingNode.setScale(0.999);
                        clippingNode.setPosition(_head.getContentSize().width/2,_head.getContentSize().height/2);
                        //遮罩框
                        _head.addChild(clippingNode);
                    }
                });
            }else{
                _head.visible = false;
                _headBg.visible = false;
            }
            if(data.list && data.list.length > 0){
                this._friendShopNode._Text_empty_tip.visible = false;
            }else{
                //显示空
                this._friendShopNode._Text_empty_tip.visible = true;
            }
            var Image_gezi = this._friendShopNode.getChildByName("Image_gezi");
            var imgFriendShopAd = this._friendShopNode.getChildByName("imgFriendShopAd");
            if(itemLength < 1){
                if(!imgFriendShopAd){
                    if(!isAgent()){
                        imgFriendShopAd = new ccui.ImageView("store/imgn_friend_shop_normal_ad.jpg");
                    }else{
                        imgFriendShopAd = new ccui.ImageView("store/img_friend_shop_agent_ad.jpg");
                        var btn_AdClose = imgFriendShopAd.getChildByName("btn_AdClose");
                        if (!btn_AdClose) {
                            btn_AdClose = new ccui.Button("store/btn_AdClose.png");
                            btn_AdClose.setAnchorPoint(1,1);
                            btn_AdClose.setName("btn_AdClose");
                            btn_AdClose.setPosition(imgFriendShopAd.width-50, imgFriendShopAd.height-30);
                            imgFriendShopAd.addChild(btn_AdClose);
                        }
                        btn_AdClose.addTouchEventListener(function(sender,type){
                            if(type === 2){
                                imgFriendShopAd.visible = false;
                                var date = new Date();
                                util.localStorageEncrypt.setNumberItem("KEY_FRIENDSHOPAD_CLOSETIME",date.getTime())
                               
                            }
                        },this);
                    }
                    imgFriendShopAd.setName("imgFriendShopAd");
                    imgFriendShopAd.setPosition(Image_gezi.getPosition())
                    this._friendShopNode.addChild(imgFriendShopAd);

                    
                    
                }
                imgFriendShopAd.setTouchEnabled(true);
                imgFriendShopAd.zIndex = 1;
                imgFriendShopAd.visible = true;

                var oldTime = util.localStorageEncrypt.getNumberItem("KEY_FRIENDSHOPAD_CLOSETIME", 0);
                if (oldTime != 0) {
                    oldTime = new Date(oldTime);
                    var nowDate = new Date();
                    if (isAgent() && nowDate.getDate() == oldTime.getDate() && nowDate.getMonth() == oldTime.getMonth()) {
                        imgFriendShopAd.visible = false;
                    }
                }

                Image_gezi.visible = false;

                imgFriendShopAd.addTouchEventListener(function(sender,type){
                    if(type == 2){
                        if(!isAgent()){
                            return;
                        }
                        MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                            type: 17
                        }, function(rtn) {
                            if (rtn.code == 0) {
                                var layer = new DaiLiWebviewLayer(rtn.data);
                                if (layer.isInitSuccess()){
                                    MjClient.Scene.addChild(layer);

                                }
                            } else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                } else {
                                    MjClient.showToast("获取数据失败");
                                }
                            }
                        });
                    }
                })
            }else{
                Image_gezi.visible = true;
                if(imgFriendShopAd){
                    imgFriendShopAd.visible = false;
                }
            }

        }
        this._reqBuyFriendShopItem = function(itemData){
            var that = this;
            this.addChild(new Friendcard_shop_commit_sheet(itemData,function(){
                MjClient.block();
                var sendInfo = {
                    userId:that._friendShopNode._data.userId,
                    goodsId:itemData.id
                }
                MjClient.gamenet.request("pkplayer.handler.userStoreOrder", sendInfo, function (rtn) {
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(that)){
                        true;
                    }
                    if (rtn.code == 0) {
                        MjClient.showToast("下单成功，请联系代理处理")
                    }else{
                        if(rtn.message){
                            MjClient.showToast(rtn.message + "")
                        }else{
                            MjClient.showToast("下单失败")
                        }
                    }
                });
            }))
        }
        this._reqFriendShopData = function(){
            MjClient.block();
            var sendInfo = {}
            if(this._friendShopNode._edt_input.getString()){
                sendInfo.userId = this._friendShopNode._edt_input.getString();
            }else{
                if(this._clubInfo.leagueId){
                    sendInfo.leagueId = this._clubInfo.leagueId;
                }else{
                    sendInfo.clubId = this._clubInfo.clubId;
                }
            }
            cc.log("memberClubStore sendInfo",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.memberClubStore", sendInfo, function (rtn) {
                MjClient.unblock();
                if (rtn.code == 0 && rtn.data) {
                    that._hasInitFriendShopNode = true;
                    that._friendShopNode.visible = true;
                    that._friendShopNode._data = rtn.data;
                    that._reflashFriendShop();
                }else{
                    if(rtn.message){
                        MjClient.showToast(rtn.message + "")
                    }else{
                        MjClient.showToast("获取亲友圈商城失败")
                    }
                }
            });
        }
        this._reqFriendShopData();

    },

    initFriendShopShenheNode: function () {
        var that = this;
        if(this._hasInitFriendShopShenheNode){
            this._reqFriendShopShenheData();
            return;
        }
        var _panel = this._friendShopShenheNode;
         _panel._hasMoreData = true;
        _panel._data = [];
        _panel._data.list = [];
        _panel._prePageLength = 5;//本地测试分页
        if (cc.sys.OS_WINDOWS != cc.sys.os) {
            _panel._prePageLength = 50;
        } 
        _panel._text_zuanshiCount = _panel.getChildByName("Text_zuanshiCount");
        var _text_zuanshiCount = _panel._text_zuanshiCount;
        _text_zuanshiCount.ignoreContentAdaptWithSize(true);
        _text_zuanshiCount.setString(MjClient.data.pinfo.fangka+"");
        _text_zuanshiCount.schedule(function(){
            _text_zuanshiCount.setString(MjClient.data.pinfo.fangka+"");
        },1);
        _panel._btn_setShenheMember = _panel.getChildByName("Button_setShenheMember");
        _panel._btn_setAuditFreeMember = _panel.getChildByName("Button_setAuditFreeMember");
        if(!isAgent()){
            _panel._btn_setShenheMember.visible = false;
            _panel._btn_setAuditFreeMember.visible = false;
        }
        _panel._btn_setShenheMember.addTouchEventListener(function(sender,type){
            if(type == 2){
                that.addChild(new Friendcard_shop_manager());
            }
        })
        _panel._btn_setAuditFreeMember.addTouchEventListener(function(sender,type){
            if(type == 2){
                that.addChild(new Friendcard_shop_audit_free());
            }
        })
        _panel._listView =  _panel.getChildByName("listView");
        _panel._cell = _panel.getChildByName("Cell");
        _panel._cell.visible = false;

        _panel._Text_empty_tip = _panel.getChildByName("Text_empty_tip");
        _panel._Text_empty_tip.ignoreContentAdaptWithSize(true);
        this._createFriendShopShenheItem = function(item,index,itemData){
            var head = item.getChildByName("Image_head");
            head.isMask = true;
            COMMON_UI.refreshHead(this, itemData.headimgurl ? itemData.headimgurl : "png/default_headpic.png", head);
            // 名称
            var name = item.getChildByName("Text_name");
            name.ignoreContentAdaptWithSize(true);
            name.setString(getNewName(unescape(itemData.nickname),5));

            // 玩家ID
            var id = item.getChildByName("Text_ID");
            id.ignoreContentAdaptWithSize(true);
            id.setString(unescape(itemData.userId));

            var text_content = item.getChildByName("Text_content");
            var contentStr = "在ID"+itemData.sellerId+"的商城购买"+itemData.amount+"颗钻石";
            if(itemData.present){
                contentStr += ",加送"+itemData.present+"颗钻石";
            }
            text_content.setString(contentStr);

            var btn_tongGuo = item.getChildByName("Button_tongGuo");
            btn_tongGuo.addTouchEventListener(function (sender, type)
            {
                if (type != 2){
                    return;
                }
                that.addChild(new Friendcard_shop_confirm_sheet(itemData,1,function(){
                    that._reqDealShopSheet(itemData,1,index)
                }))
                
            })
            var btn_jujue = item.getChildByName("Button_jujue");
            btn_jujue.addTouchEventListener(function (sender, type)
            {
                if (type != 2){
                    return;
                }
                that.addChild(new Friendcard_shop_confirm_sheet(itemData,0,function(){
                    that._reqDealShopSheet(itemData,0,index)
                }))
            })
        }
        this._reflashFriendShopShenhe = function(shouldClear){
            
            var preItemNum = _panel._listView.getItems().length;
            var curentPoint = _panel._listView.getInnerContainerPosition();
            if(curentPoint.y > 0){
                curentPoint.y = 0;
            }
            var initPointY = _panel._listView.height - _panel._listView.getInnerContainerSize().height;
            var cell = _panel._cell;
            cell.visible = false;
            if(shouldClear || (_panel._data.list.length <= 0)){
                _panel._listView.removeAllItems();
                preItemNum = 0;
            }
            if(_panel._data.list.length <= 0){
                _panel._Text_empty_tip.visible = true;
                return;
            }else{
                _panel._Text_empty_tip.visible = false;
            }
            for (var i = 0; i < _panel._data.list.length; i ++){
                var item = _panel._listView.getItems()[i];
                if(!item){
                    item = cell.clone();
                    _panel._listView.pushBackCustomItem(item);
                }
                item.visible = true;
                this._createFriendShopShenheItem(item,i,_panel._data.list[i])
                item.dataIndex = i
            }
            
            for(var i = preItemNum - 1; i >= _panel._data.list.length; i--){
                _panel._listView.getItems()[i].removeFromParent(true);
            }
            FriendCard_UI.addListBottomTipUi(_panel._listView,_panel._hasMoreData ? 2 : 3)
            _panel._listView.forceDoLayout();
            if(preItemNum > 0){
                curentPoint.y = curentPoint.y + _panel._listView.getInnerContainerPosition().y - initPointY;
                var totalY = (_panel._listView.height - _panel._listView.getInnerContainerSize().height);
                if(totalY == 0){
                    var percent = 0;
                }else{
                    var percent = 100 - curentPoint.y * 100 / totalY;
                }
                _panel._listView.jumpToPercentVertical(percent)
            }
        }
        this._reqDealShopSheet = function(itemData,opt,index){
            var that = this;
            MjClient.block();
            var sendInfo = {
                orderId:itemData.id,
                status:opt
            }
            cc.log("auditDiamondOrder sendInfo",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.auditDiamondOrder", sendInfo, function (rtn) {
                MjClient.unblock();
                if(!cc.sys.isObjectValid(that)){
                    return;
                }
                if (rtn.code == 0) {
                    _panel._data.list.splice(index, 1);
                    that._reflashFriendShopShenhe(false);
                    MjClient.showToast("处理订单成功")
                }else{
                    if(rtn.message){
                        MjClient.showToast(rtn.message + "")
                    }else{
                        MjClient.showToast("处理订单失败")
                    }
                }
            });
        }
        this._reqFriendShopShenheData = function(lastId){
            MjClient.block();
            var sendInfo = {
                status:1,
                pageId:lastId,
                pageLen:_panel._prePageLength
            }
            cc.log("listDiamondOrderForSeller sendInfo",JSON.stringify(sendInfo));
            var alreadyCount = lastId ? _panel._data.list.length : 0;
            _panel._isLoadingData = true;
            MjClient.gamenet.request("pkplayer.handler.listDiamondOrderForSeller", sendInfo, function (rtn) {
                MjClient.unblock();
                if(!cc.sys.isObjectValid(that)){
                    true;
                }
                _panel._isLoadingData = false;
                if (rtn.code == 0 && rtn.data) {
                    var dataLength =rtn.data.length;
                    _panel._hasMoreData = dataLength >= _panel._prePageLength;
                    if (alreadyCount == 0){
                        _panel._data.list = [];
                    }
                    _panel._data.list = _panel._data.list.concat(rtn.data);
                    that._reflashFriendShopShenhe(alreadyCount == 0 ? true: false);
                }else{
                    if(rtn.message){
                        MjClient.showToast(rtn.message + "")
                    }else{
                        MjClient.showToast("获取亲友圈商城审核列表失败")
                    }
                }
            });
        }
        FriendCard_UI.setListAutoLoadMore(_panel._listView,function(){
            FriendCard_UI.addListBottomTipUi(_panel._listView,1)
            that._reqFriendShopShenheData(_panel._data.list[_panel._data.list.length-1].id);
        },function(){
            if (!_panel._isLoadingData &&
                _panel._hasMoreData && 
                (_panel._data.list.length > 0)){
                return true;
            }
            return false
        })

        that._hasInitFriendShopShenheNode = true;

        this._reqFriendShopShenheData();

    },
    setBindView:function (historyBind) {
        return;
        var self = this;
        var img_msg = this._yuanbaNode.getChildByName("img_msg");
        var _desc = img_msg.getChildByName("Text_1");
        _desc.ignoreContentAdaptWithSize(true);
        if(MjClient.updateCfg)
        {
            _desc.setString("");
            if(!historyBind || historyBind <= 0)
            {
                _desc.setString(""+MjClient.systemConfig.yaoqinmaInfo);
            }
            else
            {
                _desc.setString(""+MjClient.systemConfig.yaoqinmaInfo2);
            }
        }
        _desc.visible = false;
        var str = ""+MjClient.systemConfig.yaoqinmaInfo;
        var str1 = str.split(",")[0];
        var str2 = str.split(",")[1];
        var s1 = str2.split(":")[0] + ": ";
        var s2 = str2.split(":")[1];
        if (str1 && str2 && s1 && s2) {
            // 富文本描述1
            var richText1 = new ccui.RichText();
            richText1.ignoreContentAdaptWithSize(false);
            richText1.setAnchorPoint(0,0);
            richText1.width = 500;
            richText1.height = 30;
            //不同颜色文本
            var re1 = new ccui.RichElementText(1, cc.color("#443333"), 255, str1, "fonts/lanting.TTF", 24);
            richText1.pushBackElement(re1);
            richText1.x = 175;
            richText1.y = 210;
            img_msg.addChild(richText1);

            // 富文本描述2
            var richText2 = new ccui.RichText();
            richText2.ignoreContentAdaptWithSize(false);
            richText2.setAnchorPoint(0,0);
            richText2.width = 500;
            richText2.height = 30;
            //不同颜色文本
            var re2 = new ccui.RichElementText(1, cc.color("#443333"), 255, s1, "fonts/lanting.TTF", 24);
            var re3 = new ccui.RichElementText(2, cc.color("#DE1D1D"), 255, s2, "fonts/lanting.TTF", 24);
            richText2.pushBackElement(re2);
            richText2.pushBackElement(re3);
            richText2.x = 150;
            richText2.y = 170;
            img_msg.addChild(richText2);
        }
        else {
            _desc.visible = true;
        }

        var _TextBg = img_msg.getChildByName("xiaotanchuan_51");

        var edtContentSize= _TextBg.getContentSize();
        this._textFeildName = new cc.EditBox(edtContentSize, new cc.Scale9Sprite("store/dise3.png"));
        this._textFeildName.setPlaceholderFontSize(24);
        this._textFeildName.setFontColor(cc.color("#DE1D1D"));
        this._textFeildName.setPlaceholderFontColor(cc.color("#443333"));
        this._textFeildName.setFontSize(32);

        this._textFeildName.setMaxLength(8);
        this._textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._textFeildName.setPlaceHolder("请输入邀请码...");
        this._textFeildName.setPosition(_TextBg.getContentSize().width/2, _TextBg.getContentSize().height/2);
        _TextBg.addChild(this._textFeildName);

        /*
         绑定
         */
        var _Btn_binding = img_msg.getChildByName("Btn_binding");
        _Btn_binding.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Bindingsure", {uid:SelfUid()});
                var _str = self._textFeildName.getString();
                if(_str.length == 0 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的邀请码");
                    return;
                }


                MjClient.block();
                MjClient.gamenet.request("pkcon.handler.getMemberInfo", {memberId:Number(_str)}, function(rtn)
                {
                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(self)) {
                        return;
                    }
                    if(rtn.code==0)
                    {
                        var layer = new bindingCodeLayer_tips(rtn.data,function()
                        {
                            self.binding(Number(_str));
                        });
                        self.addChild(layer);
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }

                });
            }
        },this);
    },
    binding:function(ID)
    {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.setUserMember",{memberId:ID},
            function(rtn)
            {
                MjClient.unblock();

                if(rtn.code == 0)
                {
                    if (cc.sys.isObjectValid(self)) {
                        self.showIsBindUi(true);
                    }
                }
                if(rtn.message)
                {
                    MjClient.showToast(rtn.message);
                }
            }
        );
    },
    showIsBindUi:function (isBind) {
        this.isBind = isBind;
        return;
        var img_msg = this._yuanbaNode.getChildByName("img_msg");
        if (img_msg){
            img_msg.setVisible(!isBind);
        }
        var gezi = this._yuanbaNode.getChildByName("Image_gezi");
        if (gezi){
            gezi.setVisible(isBind);
        }
        var i = 0;
        while(true){
            var item = this._yuanbaNode.getChildByName("bg_item_"+i);
            if (!item){
                break;
            }
            item.setVisible(isBind);
            i++;
        }
    },
    setItemImage : function(url,sp){
        if (!url) return;
        cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
            if (!err && texture&&cc.sys.isObjectValid(sp)) {

                var _sprite = new cc.Sprite(texture);
                _sprite.setPosition(sp.getPosition());
                sp.setVisible(false);
                sp.getParent().addChild(_sprite);

            }
        });
    }
});


//岳阳3.0商城 岳阳 邵阳 湖北  
var storeLayer_30 = cc.Layer.extend({
    _yuanbaNode:null,
    _fangkaNode:null,
    _isSupportFriendShop:false,
    _index:0,//进来的展示页面，0元宝，1房卡,2赠送,3亲友圈商城 ,canCheck是否有审核亲友圈订单权限
    ctor: function (index,openFriendShop,canCheck) {
        cc.log(" ======================= 元宝和房卡的新商城 ============================")
        this._super();
        var UI = ccs.load("StoreLayer_3.0.json");
        this.addChild(UI.node);
        var self = this;
        if (typeof(index) != "undefined"){
            this._index = index;
        }
        this._isSupportFriendShop = FriendCard_Common.isOpenFriendShop();
        this._isOpenFriendShop = openFriendShop;
        this._canCheck = canCheck;
        this._zengSongID =  null;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0], true);

        this._panelTitle = UI.node.getChildByName("Panel_title");
        setWgtLayout(this._panelTitle,[1, 0.83], [0.5, 1], [0, 0]);

        var panel = UI.node.getChildByName("panel");
        panel.setScale(Math.min(MjClient.size.width/1280, MjClient.size.height/720));
        panel.width = MjClient.size.width / panel.getScaleX();
        panel.height = (MjClient.size.height - this._panelTitle.height * this._panelTitle.getScaleY()) / panel.getScaleY();

        this._panelLeftBtn = panel.getChildByName("Panel_leftBtn");
        this._panelLeftBtn.setPosition(0, panel.height);

        this._btnBangdingyouli = panel.getChildByName("btn_bangdingyouli");
        this._btnBangdingyouli.setPosition(panel.width, panel.height/2);

        this._panelMain = panel.getChildByName("Panel_main");
        this._panelMain.setContentSize(panel.width - this._panelLeftBtn.width - this._btnBangdingyouli.width - 10, panel.height);

        this._yuanbaNode =  this._panelMain.getChildByName("Node_yuanbao");
        this._fangkaNode =  this._panelMain.getChildByName("Node_fangka");
        this._zengsongNode =  this._panelMain.getChildByName("Node_zengsong");
        this._zhuangBanNode =  this._panelMain.getChildByName("Node_zhuangBan");
        var yuanbaoBg = this._panelTitle.getChildByName("Image_yuanbao_bg");
        var fangkaBg = this._panelTitle.getChildByName("Image_fangka_bg");
        var lebiBg = this._panelTitle.getChildByName("Image_lebi_bg");
        
        if(lebiBg){
            var btn_lebi = lebiBg.getChildByName("btn_lebi");
            btn_lebi.addTouchEventListener(function(sender, type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    this.addChild(new storeLayer_lebiAccount());
                }
            },this)
            var btn_exchange = this._zhuangBanNode.getChildByName("btn_exchange");
            btn_exchange.addTouchEventListener(function(sender, type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    this.addChild(new UserInfo_exChangeMoney());
                }
            },this)

        }
        
        


        this._searchLayout = this._panelTitle.getChildByName("Image_search");
        if(this._searchLayout){
            var btn_find = this._searchLayout.getChildByName("Button_find");
            var edtContentSize = this._searchLayout.getContentSize();
            edtContentSize.width -= (btn_find.width);
            this._searchLayout._edt_input = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
            var edt_input = this._searchLayout._edt_input;
            edt_input.setFontColor(cc.color("#dab761"));
            edt_input.setPlaceholderFontColor(cc.color("#dab761"));
            edt_input.setPlaceholderFontSize(20);

            edt_input.setMaxLength(10);
            edt_input.setFontSize(20);
            edt_input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            edt_input.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            edt_input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            edt_input.setPlaceHolder("输入玩家ID搜索其他商城");
            edt_input.setString("");
            edt_input.setPosition(edtContentSize.width / 2 + btn_find.width, edtContentSize.height / 2);
            this._searchLayout.addChild(edt_input);
            this._searchLayout.visible = false;
        }
        

        //_panelNodes index对应showTab的index
        this._panelNodes = [
            this._yuanbaNode,
            this._fangkaNode,
            this._zengsongNode,
        ]
        this._zengsongText = this._fangkaNode.getChildByName("bg_zengsong");
        this._zengsongText.visible = false;
        this._zengsongNode.visible = false;

        var _Text_yuanbaoCount = yuanbaoBg.getChildByName("Text_goldCount");
        var _Text_fangkaCount = fangkaBg.getChildByName("Text_goldCount");
        
        if(lebiBg){
            var _Text_lebiCount = lebiBg.getChildByName("Text_goldCount");
            _Text_lebiCount.setString("0");
            _Text_lebiCount.setString(MjClient.data.pinfo.happyCy);
            _Text_lebiCount.ignoreContentAdaptWithSize(true);
        }
        

        _Text_yuanbaoCount.setString("0");
        _Text_fangkaCount.setString("0");
        

        if(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.money)
        {
            _Text_yuanbaoCount.setString(MjClient.data.pinfo.money);
            _Text_fangkaCount.preValue = MjClient.data.pinfo.fangka;
            _Text_fangkaCount.setString(MjClient.data.pinfo.fangka);
            if(lebiBg){
                _Text_lebiCount.setString(MjClient.data.pinfo.happyCy);               
            }
            
        }else{
            _Text_fangkaCount.preValue = 0;
        }

        _Text_yuanbaoCount.ignoreContentAdaptWithSize(true);
        _Text_fangkaCount.ignoreContentAdaptWithSize(true);
        

        UIEventBind(null, _Text_yuanbaoCount, "updateInfo", function () {
            var icurrentMoney = parseInt(_Text_yuanbaoCount.getString());
            var lastMoney = parseInt(MjClient.data.pinfo.money);      
            var icurrentMoney2 = _Text_fangkaCount.preValue;
            var lastMoney2 = parseInt(MjClient.data.pinfo.fangka);
            if (lastMoney > icurrentMoney) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(_Text_yuanbaoCount.getContentSize().width / 2, _Text_yuanbaoCount.getContentSize().height / 2);
                _Text_yuanbaoCount.addChild(starParticle);
                _Text_yuanbaoCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            if (lastMoney2 > icurrentMoney2) {
                //成功后，加粒子效果
                var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(_Text_fangkaCount.getContentSize().width / 2, _Text_fangkaCount.getContentSize().height / 2);
                _Text_fangkaCount.addChild(starParticle);
                _Text_fangkaCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
            }
            if(lebiBg){
                var icurrentLebi = parseInt(_Text_lebiCount.getString());
                var lastLebi = parseInt(MjClient.data.pinfo.happyCy);
                if (lastLebi > icurrentLebi) {
                    //成功后，加粒子效果
                    var starParticle = new cc.ParticleSystem("Particle/diamondtail.plist");
                    starParticle.setPosition(_Text_lebiCount.getContentSize().width / 2, _Text_lebiCount.getContentSize().height / 2);
                    _Text_lebiCount.addChild(starParticle);
                    _Text_lebiCount.runAction(cc.sequence(cc.scaleTo(1, 1.5).easing(cc.easeBackOut()), cc.scaleTo(0.3, 1)));
                }
                _Text_lebiCount.setString(MjClient.data.pinfo.happyCy + "");
            }
            


            _Text_yuanbaoCount.setString(MjClient.data.pinfo.money+"");
            _Text_fangkaCount.setString(MjClient.data.pinfo.fangka + "");
            _Text_fangkaCount.preValue = MjClient.data.pinfo.fangka;
            
        });

        var _close = this._panelTitle.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Close", {uid:SelfUid()});
                self.removeFromParent();
            }
        }, this);

        var btn_tousu = this._panelLeftBtn.getChildByName("btn_tousu");
        if(btn_tousu){
            btn_tousu.addTouchEventListener(function (sender, type) {
                if (type == 2) {
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
                    
                }
            }, this);
        }

        this.Button_yuanbao_tab = this._panelLeftBtn.getChildByName("Button_switch_yb");
        this.Button_fangka_tab = this._panelLeftBtn.getChildByName("Button_switch_fk");
        this.Button_zengsong_tab = this._panelLeftBtn.getChildByName("Button_switch_zs");
        this.Button_zhuangBan_tab = this._panelLeftBtn.getChildByName("Button_switch_zhuangBan");

        this._yuanbaNode._bindBtn = this.Button_yuanbao_tab;
        this._fangkaNode._bindBtn = this.Button_fangka_tab;
        this._zengsongNode._bindBtn = this.Button_zengsong_tab;
        if(this.Button_zhuangBan_tab)
            this._zhuangBanNode._bindBtn = this.Button_zhuangBan_tab;

        //按顺序的坐标位置
        this._btnTabPosArr = [
            this.Button_yuanbao_tab.getPosition(),
            this.Button_fangka_tab.getPosition(),
            this.Button_zengsong_tab.getPosition()
        ]
        if(this.Button_zhuangBan_tab){
            this._btnTabPosArr.push(this.Button_zhuangBan_tab.getPosition());
        }
        if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            this.adaptation();
        }
        this.localStorageKey={};
        this.localStorageKey.KEY_STORE_TYPE = "KEY_STORE_TYPE";
        cc.log(" ==== index --- ",index )
        if (typeof(index) != "undefined"){
            this._index = index;
            if(index != 0){
                this.Button_fangka_tab.setPosition(this._btnTabPosArr[0]);
                this.Button_zengsong_tab.setPosition(this._btnTabPosArr[1]);
                this.Button_yuanbao_tab.visible = false;
            }
        }else{
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ
                || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP){
                this._index = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_STORE_TYPE, 1);
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_STORE_TYPE, this._index);
            }

        }
        
        //是否支持亲友圈商场
        cc.log(" ===== this._isSupportFriendShop",this._isSupportFriendShop)
        if(this._isSupportFriendShop){
            if(this.Button_zhuangBan_tab)
                this.Button_zhuangBan_tab.visible = false;
            this.Button_switch_friendhShop = this._panelLeftBtn.getChildByName("Button_switch_friendhShop");
            this._friendShopNode = this._panelMain.getChildByName("Node_friendShop");
            this._friendShopNode._bindBtn = this.Button_switch_friendhShop;
            this._friendShopNode.visible = false;

            this.Button_switch_friendShop_shenhe = this._panelLeftBtn.getChildByName("Button_switch_friendShop_shenhe");
            this._friendShopShenheNode = this._panelMain.getChildByName("Node_friendShop_shenhe");
            this._friendShopShenheNode._bindBtn = this.Button_switch_friendShop_shenhe;
            this._friendShopShenheNode.visible = false;
            if(cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && this._isOpenFriendShop){
                //亲友圈打开展示亲友圈商场
                this._clubInfo = FriendCard_Common.getClubInfo();
                this._panelNodes.push(this._friendShopNode);
                this._panelNodes.push(this._friendShopShenheNode);

                this._btnTabPosArr.push(this.Button_switch_friendShop_shenhe.getPosition());
                if(this._canCheck){
                    this.Button_switch_friendhShop.setPosition(this._btnTabPosArr[1]);
                    this.Button_switch_friendShop_shenhe.setPosition(this._btnTabPosArr[2]);
                    this.Button_zengsong_tab.setPosition(this._btnTabPosArr[3]);
                    this.Button_switch_friendShop_shenhe.visible = true;
                }else{
                    this.Button_switch_friendhShop.setPosition(this._btnTabPosArr[1]);
                    this.Button_zengsong_tab.setPosition(this._btnTabPosArr[2]);
                    this.Button_switch_friendShop_shenhe.visible = false;
                }
                this.Button_switch_friendhShop.visible = true;
                this.Button_switch_friendhShop.addTouchEventListener(function (sender, type) {
                    if (type == 2) {
                        this.showTab(3);
                    }
                }, this);

                this.Button_switch_friendShop_shenhe.addTouchEventListener(function (sender, type) {
                    if (type == 2) {
                        this.showTab(4);
                    }
                }, this);
            }else{
                if(this.Button_zhuangBan_tab){
                    this._btnTabPosArr.push(this.Button_zhuangBan_tab.getPosition());
                    this.Button_zhuangBan_tab.visible = true;
                }
                
                this.Button_switch_friendhShop.visible = false;
                this.Button_switch_friendShop_shenhe.visible = false;

            }
        } else{
            this.Button_switch_friendhShop = this._panelLeftBtn.getChildByName("Button_switch_friendhShop");
            if(this.Button_switch_friendhShop){
                this.Button_switch_friendhShop.visible = false;
                this._friendShopNode = this._panelMain.getChildByName("Node_friendShop");
                this._friendShopNode._bindBtn = this.Button_switch_friendhShop;
                this._friendShopNode.visible = false;

                this.Button_switch_friendShop_shenhe = this._panelLeftBtn.getChildByName("Button_switch_friendShop_shenhe");
                this.Button_switch_friendShop_shenhe.visible = false;
                this._friendShopShenheNode = this._panelMain.getChildByName("Node_friendShop_shenhe");
                this._friendShopShenheNode._bindBtn = this.Button_switch_friendShop_shenhe;
                this._friendShopShenheNode.visible = false;
            }
            if(this.Button_zhuangBan_tab)
                this.Button_zhuangBan_tab.visible = true;

        }
        this._panelNodes.push(this._zhuangBanNode);

        this.Button_fangka_tab.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Fangka", {uid:SelfUid()});
                this.showTab(1);
                var pinfo = MjClient.data.pinfo;
                var dayStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
                var timeNum = util.localStorageEncrypt.getNumberItem("_TIME_NUM"+dayStr, 0);
                if(!pinfo.mobileNum && timeNum < 3){
                    MjClient.Scene.addChild(new bindPhoneNumNewLayer());
                    timeNum++;
                    util.localStorageEncrypt.setNumberItem("_TIME_NUM"+dayStr, timeNum);
                }
            }
        }, this);

        this.Button_yuanbao_tab.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold", {uid:SelfUid()});
                this.showTab(0);
            }
        }, this);

        if(this.Button_zhuangBan_tab){
            this.Button_zhuangBan_tab.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    this.showTab(5);
                    this.initZhuangBanNode();
                }
            }, this);
            
        }
        

        this.Button_zengsong_tab.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Zengsong", {uid:SelfUid()});
                this.showTab(2);
            }
        }, this);

        if(this._btnBangdingyouli){
            var self = this;
            UIEventBind(null, this._btnBangdingyouli, "bangdingyouliVisibleFalse", function () {
                self._btnBangdingyouli.setVisible(false);
            })

            this._btnBangdingyouli.setVisible(false);
            this._btnBangdingyouli.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
                    {
                        //self.removeFromParent();
                    });
                    self.addChild(layer);
                }
            }, this);
        }

        var isShowBind = !(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&!MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP;
        if(isAgent() && isShowBind)
        {
            this._btnBangdingyouli.setVisible(true);
            this.setBindView(MjClient.data.pinfo.bindHistory);
            this.showIsBindUi(true);
            var layer = new bindingCodeLayer(MjClient.data.pinfo.bindHistory,function()
            {
                //self.removeFromParent();
            });
            self.addChild(layer);
        }else{
            this.showIsBindUi(true)
        }

        //未实名认证弹实名认证
        var pinfo = MjClient.data.pinfo;
        if(!pinfo.identityNum && MjClient.systemConfig.shiMingRenZhengStore == "true"){
            self.addChild(new shiMingRenZhengLayer());
        }

        this.touchEventFun = function touchEventFun(sender,type)
        {
            if(type == 2)
            {
                ////成功后，加粒子效果
                //var starParticle =  new cc.ParticleSystem("Particle/diamondtail.plist");
                //starParticle.setPosition(_Text_goldCount.getContentSize().width/2, _Text_goldCount.getContentSize().height/2);
                //_Text_goldCount.addChild(starParticle);
                //_Text_goldCount.runAction(cc.sequence(cc.scaleTo(1,1.5).easing(cc.easeBackOut()),cc.scaleTo(0.3,1)));

                if (this._index == 0)
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Buy", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Fangka_Buy", {uid:SelfUid()});

                if(!MjClient.systemConfig ||!MjClient.systemConfig.recharge)
                {
                    return MjClient.showToast("获取支付数据失败");
                }
                // MjClient.showToast("==== 赠送给ID："+self._zengSongID)
                var itagID = sender.id;
                if (MjClient.systemConfig.recharge.length > 1) {
                    cc.log("rechange 长度 > 1 " + itagID);
                    MjClient.Scene.addChild(new payWayLayer(function(platform){
                        MjClient.recharge(itagID, parseInt(platform), null, null, {receiverId:self._zengSongID});
                    }, this._index == 0 ? "gold" : "coin", null, sender.rechargeName));
                }
                else {
                    MjClient.recharge(itagID, parseInt(MjClient.systemConfig.recharge[0].platform), null, null,
                        {receiverId:self._zengSongID})
                }
            }
        }


        var text5 = _back.getChildByName("Text_5");
        if(text5){
            text5.setVisible(false)
        }

        this._diaoXian = _back.getChildByName("Image_bg")
        
        if(this._diaoXian){
            // this._diaoXian.setAnchorPoint(cc.p(0.5, 1));
            this.schedule(function(){
                self.Button_zengsong_tab.visible = self.Button_fangka_tab.visible;
                this._diaoXian.visible = false;
            });

            if(index){
                this._diaoXian.setScale9Enabled(true);
                this._diaoXian.height *= 0.8;
                this._diaoXian.y += 60;
            }
        }else{
            this.schedule(function(){
                self.Button_zengsong_tab.visible = self.Button_fangka_tab.visible;
            });
        }

        //处理一下btn Disabled图片
        for(var i = 0 ; i < this._panelNodes.length;i++){
            if(!this._panelNodes[i]) continue;
            this._panelNodes[i]._bindBtn.loadTextureDisabled(this._panelNodes[i]._bindBtn.getPressedFile().file);
        }
        this.showKeFuBtn();
        if (MjClient.jumpToStoreData) {
            if (MjClient.jumpToStoreData.bPack) {
                this.showTab(5);
                this.initZhuangBanNode();
                return;
            }
        }

        if(this._index && this._index > -1 && this._panelNodes[this._index] && this._panelNodes[this._index]._bindBtn.visible){
            this.showTab(this._index);
        }else{
            var hasFind = false;
            for(var i = 0 ;i < this._panelNodes.length; i++){
                if(this._panelNodes[i]._bindBtn.visible){
                    hasFind = true;
                    this.showTab(i);
                    break;
                }
            }
            if(!hasFind){
                this.showTab(0);
            }
        }

        
    },
    onExit: function() {
        this._super();
        delete(MjClient.jumpToStoreData);//其它界面跳转到商城界面的数据
    },
    showKeFuBtn: function() {
        var filePath = "store_3.0/btn_kefu.png";
        if (!jsb.fileUtils.isFileExist(filePath))
            return;

        var keFuBtn = new ccui.Button(filePath);
        keFuBtn.setName("btn_kefu");
        this._btn_kefu = keFuBtn;
        this._panelTitle.addChild(keFuBtn);
        keFuBtn.setPosition(1020, this._panelTitle.height - keFuBtn.height / 2);

        keFuBtn.addTouchEventListener(function(sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED)
                return;

            if (!isCurrentNativeVersionBiggerThan("14.0.0")) {
                MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                    type: 9
                }, function(rtn) {
                    if (rtn.code == 0) {
                        MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        } else {
                            MjClient.showToast("获取数据失败");
                        }
                    }
                });
            } else {
                MjClient.native.showQiYuChatDialog();
            }
        });
    },
    showTab: function (index, type) {
        cc.log("showTab index",index,this._panelNodes.length)
        if(type !== 1){
            this._zengSongID =  null;
        }
        for(var i = 0 ; i < this._panelNodes.length; i++){
            if(!this._panelNodes[i]) continue;
            this._panelNodes[i].visible = (i == index);
            this._panelNodes[i]._bindBtn.setTouchEnabled((i != index));
            this._panelNodes[i]._bindBtn.setBright((i != index))
        }
        if(this._searchLayout){
            this._searchLayout.visible = false;
        }
        if(this._btn_kefu){
            if(index == 3){
                this._btn_kefu.visible = false;
            }else{
                this._btn_kefu.visible = true;
            }
        }
        var yuanbaoBg = this._panelTitle.getChildByName("Image_yuanbao_bg");
        var lebiBg = this._panelTitle.getChildByName("Image_lebi_bg");
        if(lebiBg) lebiBg.visible = false;
        yuanbaoBg.visible = true;
        
        if (index > -1) {
            this._zengsongText.setVisible(false);
            if (index == 0) {//元宝商场
                this.getYuanBaoTabData();
            } else if (index == 1) {//钻石商场
                this._zengsongText.setVisible(type == 1);
                this.getFangkaTabData();
            } else if (index == 2) {//赠送
                this._zengsongText.setVisible(true);
                this.InitZengSongNode();
            } else if (index == 3) {//亲友圈钻石商场
                this.initFriendShopNode();
            } else if (index == 4) {//亲友圈钻石订单审核
                this.initFriendShopShenheNode();
            }else if(index == 5){
                this._panelNodes[3].visible = true;
                this._panelNodes[3]._bindBtn.setTouchEnabled(false);
                this._panelNodes[3]._bindBtn.setBright(false);
                yuanbaoBg.visible = false;
                lebiBg.visible = true;
                //MjClient.showToast(" zhuangban shangcheng ");

            }
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_STORE_TYPE, index);
        }else {
            return;
        }
        cc.log(" == !FriendCard_Common.IsOpenRoomCardPay() ",!FriendCard_Common.IsOpenRoomCardPay());
        if (!FriendCard_Common.IsOpenRoomCardPay()) {
            this.Button_fangka_tab.visible = false;
            this.Button_yuanbao_tab.visible = false;
            this.Button_zhuangBan_tab.visible = false;
        }
    },
    //江苏  永利  代码~~~~
    adaptation: function() {    // 自适应显示
        var back = this._back;
        var childrens = back.getChildren();

        if (MjClient.size.width / MjClient.size.height > back.width / back.height) {
            var a = (MjClient.size.width / MjClient.size.height) / (back.width / back.height);
            var width_dis =  back.width - back.width *a;
            back.width *= a;
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                back.getChildByName("bg_image").width *= a;
                // back.getChildByName("bg_image").x *= a;
                back.getChildByName("Image_1").width *= a;
                back.getChildByName("Image_2").width *= a;
                back.getChildByName("Text_goldCount").width *= a;
                back.getChildByName("Text_goldCount_fangka").width *= a;
                back.getChildByName("jinbi_icon").width *= a;
                back.getChildByName("yuanbao_1_1").width *= a;
            }else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                this.Button_fangka_tab.x += width_dis / 2;
                this.Button_yuanbao_tab.x += width_dis / 2;
            }

            for (var i = 0; i < childrens.length; i++) {
                if (childrens[i]) {
                    childrens[i].x *= a;
                }
            }

        } else {
            var a = (back.width / back.height) / (MjClient.size.width / MjClient.size.height);
            back.height *= a;
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                back.getChildByName("bg_image").height *= a;
                // back.getChildByName("bg_image").y *= a;
                back.getChildByName("Image_1").height *= a;
                back.getChildByName("Image_2").height *= a;
                back.getChildByName("Text_goldCount").height *= a;
                back.getChildByName("Text_goldCount_fangka").height *= a;
                back.getChildByName("jinbi_icon").height *= a;
                back.getChildByName("yuanbao_1_1").height *= a;
            }

            for (var i = 0; i < childrens.length; i++) {
                if (childrens[i]) {
                    childrens[i].y *= a;
                }
            }
        }
    },
    getFangkaTabData: function() {
        var self = this;
        if (this._hasInitFangkaTabData) {
            return;
        }
        this._panelNodes[1].visible = false;
        MjClient.getFangkaRechargeLadder(function() {
            if (!cc.sys.isObjectValid(self)) {
                return;
            }
            this._hasInitFangkaTabData = true;
            this._panelNodes[1].visible = true;

            var tempItem = this._fangkaNode.getChildByName("bg_item_0");
            var scrollView = this._fangkaNode.getChildByName("scrollView");
            scrollView.setScrollBarEnabled(false);
            scrollView.setContentSize(this._panelMain.width + 30, this._panelMain.height);
            tempItem.setVisible(false);
            var maxColumn = Math.floor(this._panelMain.width/ (tempItem.width + 10));
            var spaceX = (this._panelMain.width - tempItem.width * maxColumn) / maxColumn;
            var spaceY = 15;
            var col = 0;
            var row = 0;
            var minY = 0;
            var items = [];
            for (var i = 0; i < MjClient.rechargeLadderFangka.length; i++) {
                var _itemNode = tempItem.clone();
                _itemNode.setVisible(true);
                _itemNode.setPosition(spaceX/2 + (tempItem.width + spaceX)*col + tempItem.width/2, 
                    this._panelMain.height - 30 - (tempItem.height + spaceY)*row - tempItem.height/2);
                minY = _itemNode.y - _itemNode.height/2 - spaceY;
                items.push(_itemNode);
                if (col < maxColumn - 1) {
                    col ++;
                } else {
                    col = 0;
                    row ++;
                }

                scrollView.addChild(_itemNode);
                _itemNode.setVisible(true);
                _itemNode.addTouchEventListener(this.touchEventFun, this);

                var _data = MjClient.rechargeLadderFangka[i];
                _itemNode.id = _data.id;
                _itemNode.rechargeName = "fangka";

                var _moneyNode = _itemNode.getChildByName("Text_1");
                _moneyNode.setString(_data.money + "钻石");
                var zuanshi = _data.money;
                _moneyNode.setLocalZOrder(201);
                if (_data.discountAmount && _data.total) {
                    _moneyNode.setString(_data.total + "钻石");
                    zuanshi = _data.total;
                }
                _moneyNode.ignoreContentAdaptWithSize(true);

                var _itemIcon = _itemNode.getChildByName("Image_3");
                // _itemIcon.loadTexture("store/fk_" + (i + 1) + ".png");
                if(zuanshi<=100){
                    _itemIcon.loadTexture("store_3.0/icon_zuanshi_1.png");
                }else if(zuanshi>100 && zuanshi<=150){
                    _itemIcon.loadTexture("store_3.0/icon_zuanshi_2.png");
                }else if(zuanshi>150 && zuanshi<=250){
                    _itemIcon.loadTexture("store_3.0/icon_zuanshi_3.png");
                }else if(zuanshi>250 && zuanshi<=350){
                    _itemIcon.loadTexture("store_3.0/icon_zuanshi_4.png");
                }else if(zuanshi>350 && zuanshi<=850){
                    _itemIcon.loadTexture("store_3.0/icon_zuanshi_5.png");
                }else if(zuanshi>850 && zuanshi<=1650){
                    _itemIcon.loadTexture("store_3.0/icon_zuanshi_6.png");
                }else if(zuanshi>1650 && zuanshi<=3650){
                    _itemIcon.loadTexture("store_3.0/icon_zuanshi_7.png");
                }else if(zuanshi>3650){
                    _itemIcon.loadTexture("store_3.0/icon_zuanshi_8.png");
                }

                var _presentNode = _itemNode.getChildByName("Text_song");
                _presentNode.ignoreContentAdaptWithSize(true);
                _presentNode.zIndex = 101;

                var _Image_song = _itemNode.getChildByName("Image_song");
                if (!_Image_song) {
                    _Image_song = _presentNode;
                }
                _Image_song.zIndex = 100;
                if (!_data.title || _data.title == "") {
                    _Image_song.visible = false;
                    _presentNode.visible = false;
                } else {
                    _presentNode.setString(_data.title);
                    _Image_song.visible = true;
                    _presentNode.visible = true;
                }
                if (_data.discountAmount) {
                    _presentNode.setVisible(false);
                    _Image_song.setVisible(false);
                } else {
                    if (MjClient.getAppType() !== MjClient.APP_TYPE.QXJSMJ &&
                        MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
                        MjClient.getAppType() !== MjClient.APP_TYPE.QXXXGHZ) {
                        // _Image_song.setPositionY(_Image_song.getPositionY() - 20);
                        // _presentNode.setPositionY(_presentNode.getPositionY() - 20);
                    }

                }

                // 按钮
                var _btn = _itemNode.getChildByName("Button_1");
                var _amountNode = _btn.getChildByName("Text_money");
                _amountNode.setString(Number(_data.amount) + "元");
                _amountNode.ignoreContentAdaptWithSize(true);
                _btn.id = _data.id;
                _btn.addTouchEventListener(this.touchEventFun, this);

                var _yuan = _amountNode.getChildByName("yuan");
                if (_yuan) _yuan.x = _amountNode.width;

                // 折扣价格
                var ImageDiscount = _itemNode.getChildByName("Image_discount");
                var textMoneyDiscount = _itemNode.getChildByName("Text_money_discount");
                textMoneyDiscount.ignoreContentAdaptWithSize(true);
                textMoneyDiscount.setLocalZOrder(201);
                if (_data.discountAmount) {
                    textMoneyDiscount.setVisible(true);
                    ImageDiscount.setVisible(true);
                    var str = "";
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) { // 江苏的折扣价格放在按钮上
                        _amountNode.setString(str + Number(_data.discountAmount) + "元");
                        textMoneyDiscount.setString(Number(_data.amount) + "元");
                    } else {
                        textMoneyDiscount.setString(str + Number(_data.discountAmount) + "元");
                    }
                } else {
                    textMoneyDiscount.setVisible(false);
                    ImageDiscount.setVisible(false);
                }

                /*_Image_song.setPositionX(textMoneyDiscount.getPositionX());
                 _Image_song.setPositionY(textMoneyDiscount.getPositionY()+20);
                 _presentNode.setPositionX(textMoneyDiscount.getPositionX());
                 _presentNode.setPositionY(textMoneyDiscount.getPositionY()+20);*/

                var _Image_hot = _itemNode.getChildByName("Image_hot");
                _Image_hot.visible = i < 2;

                if (_data.discountAmount) {
                    var Draw = new cc.DrawNode();
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                        Draw.drawSegment(cc.p(20, _amountNode.height - 20), cc.p(_btn.width - 20, _btn.height - _amountNode.height + 20), 1, cc.color("#CB470D"));
                        Draw.y = 45;
                    } else {
                        Draw.drawSegment(cc.p(20, _amountNode.height - 20), cc.p(_btn.width - 20, _btn.height - _amountNode.height + 20), 2.5, cc.color("#E45A43"));
                    }
                    if (MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
                        Draw.y = 20;
                    }
                    _btn.addChild(Draw);
                }
            }

            if (minY > 0) {
                minY = 0;
            }
            else {
                for (var i = 0; i < items.length; i++) {
                    items[i].y -= minY;
                }
            }
            scrollView.setInnerContainerSize(cc.size(scrollView.width, scrollView.height - minY));

        }.bind(this));
    },
    getYuanBaoTabData:function () {
        var self = this;
        if(this._hasInitYuanBaoTabData){
            return;
        }
        this._panelNodes[0].visible = false;
        MjClient.getRechargeLadder(function () {
            if (!cc.sys.isObjectValid(self)) {
                return;
            }
            this._hasInitYuanBaoTabData = true;
            this._panelNodes[0].visible = true;
            var tempItem = this._yuanbaNode.getChildByName("bg_item_0");
            var scrollView = this._yuanbaNode.getChildByName("scrollView");
            scrollView.setScrollBarEnabled(false);
            scrollView.setContentSize(this._panelMain.width + 30, this._panelMain.height);
            tempItem.setVisible(false);
            var maxColumn = Math.floor(this._panelMain.width/ (tempItem.width + 10));
            var spaceX = (this._panelMain.width - tempItem.width * maxColumn) / maxColumn;
            var spaceY = 15;
            var col = 0;
            var row = 0;
            var minY = 0;
            var items = [];
            for(var i = 0;i < MjClient.rechargeLadder.length;i++)
            {
                var _itemNode = tempItem.clone();
                _itemNode.setVisible(true);
                _itemNode.setPosition(spaceX/2 + (tempItem.width + spaceX)*col + tempItem.width/2, 
                    this._panelMain.height - 30 - (tempItem.height + spaceY)*row - tempItem.height/2);
                minY = _itemNode.y - _itemNode.height/2 - spaceY;
                items.push(_itemNode);
                if (col < maxColumn - 1) {
                    col ++;
                } else {
                    col = 0;
                    row ++;
                }

                scrollView.addChild(_itemNode);
                _itemNode.visible = this.isBind;
                _itemNode.addTouchEventListener(this.touchEventFun,this);

                var _data =  MjClient.rechargeLadder[i];
                _itemNode.id = _data.id;

                // if(_data.image)
                // {
                //     if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ
                //         && (!(!_data.title || _data.title == "") || _data.discountAmount)) {
                //         _itemIcon.y = 160;
                //     }
                //     this.setItemImage(_data.image, _itemIcon);
                // }
                // if (MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP && MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP) {
                //     _itemIcon.ignoreContentAdaptWithSize(true);
                // }


                var _moneyNode = _itemNode.getChildByName("Text_1");
                _moneyNode.setString(_data.money + "个");
                var yuanbao = _data.money;
                _moneyNode.setLocalZOrder(201);
                if(_data.discountAmount && _data.total){
                    _moneyNode.setString(_data.total + "个");
                    yuanbao = _data.total;
                }
                _moneyNode.ignoreContentAdaptWithSize(true);

                var _itemIcon = _itemNode.getChildByName("Image_3");
                if(yuanbao<=500){
                    _itemIcon.loadTexture("store_3.0/icon_yuanbao_1.png");
                }else if(yuanbao>500 && yuanbao<=1280){
                    _itemIcon.loadTexture("store_3.0/icon_yuanbao_2.png");
                }else if(yuanbao>1280 && yuanbao<=2480){
                    _itemIcon.loadTexture("store_3.0/icon_yuanbao_3.png");
                }else if(yuanbao>2480 && yuanbao<=6680){
                    _itemIcon.loadTexture("store_3.0/icon_yuanbao_4.png");
                }else if(yuanbao>6680 && yuanbao<=11988){
                    _itemIcon.loadTexture("store_3.0/icon_yuanbao_5.png");
                }else if(yuanbao>11988 && yuanbao<=21880){
                    _itemIcon.loadTexture("store_3.0/icon_yuanbao_6.png");
                }else if(yuanbao>21880 && yuanbao<=41980){
                    _itemIcon.loadTexture("store_3.0/icon_yuanbao_7.png");
                }else if(yuanbao>41980){
                    _itemIcon.loadTexture("store_3.0/icon_yuanbao_8.png");
                }

                var _presentNode = _itemNode.getChildByName("Text_song");
                _presentNode.ignoreContentAdaptWithSize(true);
                _presentNode.zIndex = 101;
                var _Image_song = _itemNode.getChildByName("Image_song");
                if(!_Image_song){
                    _Image_song = _presentNode;
                }
                _Image_song.zIndex = 100;
                if(!_data.title|| _data.title == "")
                {
                    _Image_song.visible = false;
                    _presentNode.visible = false;
                }
                else
                {
                    _presentNode.setString(_data.title);
                    _Image_song.visible = true;
                    _presentNode.visible = true;
                }
                if(_data.discountAmount){
                    _presentNode.setVisible(false);
                    _Image_song.setVisible(false);
                }else {
                    if(MjClient.getAppType() != MjClient.APP_TYPE.QXJSMJ &&
                        MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
                        MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ){
                        // _Image_song.setPositionY(_Image_song.getPositionY() - 20);
                        // _presentNode.setPositionY(_presentNode.getPositionY() - 20);
                    }
                }

                // 按钮
                var _btn = _itemNode.getChildByName("Button_1");
                var _amountNode = _btn.getChildByName("Text_money");
                _amountNode.setString(Number(_data.amount) + "元");
                _amountNode.ignoreContentAdaptWithSize(true);
                _btn.id = _data.id;
                _btn.addTouchEventListener(this.touchEventFun, this);

                // 折扣价格
                var ImageDiscount = _itemNode.getChildByName("Image_discount");
                var textMoneyDiscount = _itemNode.getChildByName("Text_money_discount");
                textMoneyDiscount.ignoreContentAdaptWithSize(true);
                textMoneyDiscount.setLocalZOrder(201);
                if(_data.discountAmount){
                    textMoneyDiscount.setVisible(true);
                    ImageDiscount.setVisible(true);
                    var str = "";
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) { // 江苏的折扣价格放在按钮上
                        _amountNode.setString(str+Number(_data.discountAmount)+"元");
                        textMoneyDiscount.setString(Number(_data.amount) + "元");
                    }
                    else {
                        textMoneyDiscount.setString(str+Number(_data.discountAmount)+"元");
                    }
                }else {
                    textMoneyDiscount.setVisible(false);
                    ImageDiscount.setVisible(false);
                }

                var yuanIcon = _amountNode.getChildByName("yuan");
                if (yuanIcon) {
                    yuanIcon.setPositionX(_amountNode.getContentSize().width);
                }

                var _Image_hot = _itemNode.getChildByName("Image_hot");
                _Image_hot.visible = false;

                if(_data.discountAmount)
                {
                    var Draw = new cc.DrawNode();
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                        Draw.drawSegment(cc.p(20, _amountNode.height-20), cc.p(_btn.width-20, _btn.height -_amountNode.height+20), 1, cc.color("#CB470D"));
                        Draw.y = 45;
                    }
                    else {
                        Draw.drawSegment(cc.p(20, _amountNode.height-20), cc.p(_btn.width-20, _btn.height -_amountNode.height+20), 2.5, cc.color("#E45A43"));
                    }
                    if (MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
                        Draw.y = 20;
                    }
                    _btn.addChild(Draw);
                }


            }

            if (minY > 0) {
                minY = 0;
            }
            else {
                for (var i = 0; i < items.length; i++) {
                    items[i].y -= minY;
                }
            }
            scrollView.setInnerContainerSize(cc.size(scrollView.width, scrollView.height - minY));
        }.bind(this));

    },
    InitZengSongNode: function () {
        var self = this;
        this._zengSongID = null;
        var node_find = this._zengsongNode.getChildByName("node_find");
        var node_info = this._zengsongNode.getChildByName("node_info");
        var node_list = this._zengsongNode.getChildByName("node_list");
        node_find.visible = true;
        node_info.visible = false;
        node_list.visible = false;
        var self = this;
        var Image_search = node_find.getChildByName("input_id");
        var edtContentSize = Image_search.getContentSize();
        if(this.edt_input){
            this.edt_input.removeFromParent();
        }
        this.edt_input = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
        var edt_input = this.edt_input;
        edt_input.setFontColor(cc.color("#ffffff"));
        edt_input.setPlaceholderFontColor(cc.color(0xFF, 0xFF, 0xFF));
        edt_input.setMaxLength(10);
        edt_input.setFontSize(34);
        edt_input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        edt_input.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        edt_input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        edt_input.setPlaceHolder("");
        edt_input.setString("");
        if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ){
            edt_input.setFontColor(cc.color("#ffffff"));
        }
        // edt_input.setPlaceholderFontColor(cc.color("#ffffff"));
        // edt_input.setPlaceholderFontName("fonts/lanting.TTF");
        // edt_input.setPlaceholderFontSize(30);
        edt_input.setPosition(edtContentSize.width / 2, edtContentSize.height / 2);
        Image_search.addChild(edt_input);
        var hintTxt = new ccui.Text();
        hintTxt.setFontName("fonts/lanting.TTF");
        hintTxt.setName("hintTxt");
        hintTxt.setFontSize(26);
        hintTxt.setString("请输入好友ID（仅支持为好友充值钻石）");
        hintTxt.defaultText = "请输入好友ID（仅支持为好友充值钻石）";
        hintTxt.defaultColor = cc.color("#b7b7b6");
        if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ){
            hintTxt.defaultColor = cc.color("#ffffff");
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ){
            hintTxt.defaultColor = cc.color("#000000");
        }
        hintTxt.setColor(hintTxt.defaultColor);
        hintTxt.setAnchorPoint(0, 0.5);
        hintTxt.setPosition(0 + 10, edt_input.height / 2);
        edt_input.addChild(hintTxt);
        edt_input.setDelegate(this);
        this.edt_input.unscheduleAllCallbacks();
        this.edt_input.schedule(function(){
            hintTxt.setVisible(!edt_input.getString());
        })
        var btn_find = node_find.getChildByName("btn_find");
        btn_find.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var idStr = edt_input.getString();
                var id = Number(idStr);
                if (!id || id < 1000) {
                    MjClient.showToast("请输入正确的玩家id！");
                    return;
                }
                edt_input.setString("");
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.chargeUserInfo", { userId: id }, function (rtn) {
                    if (rtn.code == 0 && rtn.data) {
                        self.setSearChUserView(rtn.data);
                        node_find.visible = false;
                        node_info.visible = true;
                        node_list.visible = false;
                    }else{
                        MjClient.showToast(rtn.message);
                    }
                    MjClient.unblock();
                });
                MjClient.native.umengEvent4CountWithProperty("ZengSong_FangKa_Chazhao", { uid: SelfUid() });
            }
        }, this);

        this.listView_record = node_list.getChildByName("listView_record");
        this.cell_list = node_list.getChildByName("cell_list");
        this.cell_list.visible = false;
        var _listViewState = 0;
        this.listView_record.addCCSEventListener(function (sender, type) {
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState == 0) {
                        _listViewState = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1) {
                        self.reqRecord();
                    }
                    _listViewState = 0;
                    break;
            }
        });

        var btn_back = node_list.getChildByName("btn_back");
        btn_back.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                node_find.visible = true;
                node_info.visible = false;
                node_list.visible = false;
            }
        }, this);

        var btn_record = this._zengsongNode.getChildByName("btn_record");
        if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ){
            btn_record = node_find.getChildByName("btn_record");
        }
        btn_record.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.reqRecord();
            }
        }, this);
        this._lastId = 0;
        this.reqRecord = function () {
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.rechargeGiveList", { offset: self._lastId, length: 20 }, function (rtn) {
                if (rtn.code == 0 && rtn.data) {
                    node_find.visible = false;
                    node_info.visible = false;
                    node_list.visible = true;
                    // MjClient.showToast(" ==== jilu~~~~ id " + self._lastId);
                    self.addRecord(rtn.data);
                }
                MjClient.unblock();
            });
        }

        this.addRecord = function (data) {
            if (!this._lastId) this.listView_record.removeAllItems();
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                this.listView_record.pushBackCustomItem(this.addItemRecord(element, index + 1));

            }
            if (!this.tipTxt) {
                this.tipTxt = new ccui.Text();
                this.tipTxt.setFontName("fonts/lanting.TTF");
                this.tipTxt.setFontSize(30);
                this.tipTxt.setString("您暂时没有记录");
                this.tipTxt.setPosition(cc.p(610, 290));
                node_list.addChild(this.tipTxt);

            }
            this.tipTxt.visible = this._lastId == 0;


        }.bind(this);
        this.addItemRecord = function (oneData, index) {
            if (!cc.sys.isObjectValid(this.cell_list)) return;
            var copyNode = this.cell_list.clone();
            copyNode.visible = true;
            var _time = copyNode.getChildByName("text_time");

            var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy/MM/dd hh:mm:ss');
            _time.ignoreContentAdaptWithSize(true);
            _time.setString(_timeStr);
            var text_id = copyNode.getChildByName("text_id");
            text_id.setString("玩家ID：" + oneData.userId)
            var text_num = copyNode.getChildByName("text_num");
            text_num.setString("" + oneData.title)
            var text_ok = copyNode.getChildByName("text_ok");
            text_ok.setString("" + oneData.isPay == 1 ? "成功" : "未支付");
            if(MjClient.getAppType() === MjClient.APP_TYPE.AYGUIZHOUMJ) {
                if(oneData.isPay == 1){
                    text_ok.setColor(cc.color("#01aa30"));
                }else{
                    text_ok.setColor(cc.color("#e55100"));
                }
            }

            this._lastId = index;
            return copyNode;
        }.bind(this);


        this.setSearChUserView = function (playerData) {
            var Text_name = node_info.getChildByName("Text_name");
            var Text_id = node_info.getChildByName("Text_ID");
            Text_name.setString(getNewName(unescape(playerData.nickname)));
            Text_name.setFontName("Arial");
            Text_name.setFontSize(Text_name.getFontSize()); //不知道为什么要重新设置一遍 否则字体很小
            Text_id.setString("ID:" + playerData.userId);
            this.addMemberLastUserId = playerData.userId;
            this._zengsongText.getChildByName("Text_zs").setString("赠送给ID:" + playerData.userId);
            this._zengSongID = playerData.userId;

            var head1 = node_info.getChildByName("Image_head");
            head1.visible = false;
            var headicon = node_info.getChildByName("headbg");
            headicon.isMask = true;
            var url = playerData.headimgurl ? playerData.headimgurl : "png/default_headpic.png"
            cc.loader.loadImg(url, {
                isCrossOrigin: true
            }, function (err, texture) {
                if (!err && texture && cc.sys.isObjectValid(headicon)) {
                    var headSprite = new cc.Sprite(texture);
                    headSprite.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                    headSprite.setScale((headicon.getContentSize().width - 7) / headSprite.getContentSize().width);
                    headicon.addChild(headSprite);
                }
            });

        }

        var btn_zengsong = node_info.getChildByName("btn_zengsong");
        btn_zengsong.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.showTab(1, 1);
            }
        }, this);

    },
    initFriendShopNode: function () {
        var self = this;
        if(this._hasInitFriendShopNode){
            return;
        }
        this._friendShopNode.visible = false;
        var button_send = this._friendShopNode.getChildByName("Button_send");
        if(!isAgent()){
            button_send.visible = false;
        }
        button_send.addTouchEventListener(function(sender,type){
            if(type == 2){
                self.addChild(new Friendcard_shop_send());
            }
        })

        this._searchLayout.visible = true;
        this._searchLayout.getChildByName("Button_find").addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var idStr = this._searchLayout._edt_input.getString();
                var id = Number(idStr);
                if (!id || id < 1000) {
                    MjClient.showToast("请输入正确的玩家id！");
                    return;
                }
                this._reqFriendShopData();
            }
        }, this);
        this._friendShopNode._Text_empty_tip = this._friendShopNode.getChildByName("Text_empty_tip");
        this._friendShopNode._Text_empty_tip.ignoreContentAdaptWithSize(true);
        this._reflashFriendShop = function(){
            var data  = this._friendShopNode._data;
            var Text_name = this._friendShopNode.getChildByName("name");
            Text_name.ignoreContentAdaptWithSize(true);
            Text_name.setString("")
            var Text_id = this._friendShopNode.getChildByName("uid");
            var Image_icon = this._friendShopNode.getChildByName("Image_icon");
            Text_id.ignoreContentAdaptWithSize(true);
            Text_id.setString("")
            var _head = this._friendShopNode.getChildByName("head");
            var _headBg = this._friendShopNode.getChildByName("headBg");
            _head.visible = false;
            _headBg.visible = false;
            if(Image_icon){
                Image_icon.visible = false;
            }
            _head.removeAllChildren();
            var itemLength = data.list ? data.list.length : 0;
            for(var i = 0 ; i < itemLength; i++){
                var itemData = data.list[i];
                var itemNode = this._friendShopNode.getChildByName("bg_item_"+i);
                itemNode.removeChildByName("goodServerImg");
                itemNode.visible = true;
                itemNode._data = itemData;
                var zuanshiNumTxt = itemNode.getChildByName("Text_1");
                zuanshiNumTxt.ignoreContentAdaptWithSize(true);
                if(!zuanshiNumTxt._standFontSize){
                    zuanshiNumTxt._standFontSize = zuanshiNumTxt.getFontSize();
                }
                var zuanshiMoneyText = itemNode.getChildByName("Button_1").getChildByName("Text_money");
                zuanshiMoneyText.ignoreContentAdaptWithSize(true);
                var zuanshiZengSongBg = itemNode.getChildByName("Image_song");
                var zuanshiZengSongText = itemNode.getChildByName("Text_song");
                zuanshiZengSongText.ignoreContentAdaptWithSize(true);

                zuanshiNumTxt.setFontSize(zuanshiNumTxt._standFontSize-2)
                if(itemData.amount >= 1000){
                    zuanshiNumTxt.setFontSize(zuanshiNumTxt._standFontSize-4)
                }
                zuanshiNumTxt.setString(itemData.amount+"钻石");
                zuanshiMoneyText.setString(""+itemData.price);
                if(itemData.present){
                    zuanshiZengSongBg.visible = true;
                    zuanshiZengSongText.visible = true;
                    zuanshiZengSongBg.zIndex = 1;
                    zuanshiZengSongText.zIndex = 2;
                    zuanshiZengSongText.setString("赠送"+itemData.present);
                }else{
                    zuanshiZengSongBg.visible = false;
                    zuanshiZengSongText.visible = false;
                }
                var imgIcon = itemNode.getChildByName("Image_3");
                imgIcon.visible = true;
                if(itemData.image){
                    this.setItemImage(itemData.image,imgIcon,"goodServerImg");
                }
                itemNode.addTouchEventListener(function(sender,type){
                    if(type == 2){
                        self._reqBuyFriendShopItem(sender._data);
                    }
                })
            }
            for(var i = itemLength ; i < 8; i++){
                this._friendShopNode.getChildByName("bg_item_"+i).visible = false;
            }
            if(data.userId){
                Text_name.setString(unescape(data.nickname))
                Text_id.setString(unescape(data.userId))
                _head.visible = true;
                _headBg.visible = true;
                if(Image_icon){
                    Image_icon.visible = true;
                }
                var url = data.headimgurl ? data.headimgurl : "png/default_headpic.png"
                cc.loader.loadImg(url, {
                    isCrossOrigin: true
                }, function (err, texture) {
                    if (!err && texture && cc.sys.isObjectValid(_head)) {
                        var img = new cc.Sprite(texture);
                        img.setScale(_head.getContentSize().width/img.getContentSize().width);
                        _head.addChild(img);
                    }
                });
            }else{
                if(Image_icon){
                    Image_icon.visible = false;
                }
                _head.visible = false;
                _headBg.visible = false;
            }
            if(data.list && data.list.length > 0){
                this._friendShopNode._Text_empty_tip.visible = false;
            }else{
                //显示空
                this._friendShopNode._Text_empty_tip.visible = true;
            }
            var imgFriendShopAd = this._friendShopNode.getChildByName("imgFriendShopAd");
            if(itemLength < 1){
                if(!imgFriendShopAd){
                    if(!isAgent()){
                        imgFriendShopAd = new ccui.ImageView("store/imgn_friend_shop_normal_ad.jpg");
                        imgFriendShopAd.ignoreContentAdaptWithSize(false)
                        imgFriendShopAd.width = this._panelMain.width;
                        imgFriendShopAd.height = this._panelMain.height;
                    }else{
                        imgFriendShopAd = new ccui.ImageView("store/img_friend_shop_agent_ad.jpg");
                        imgFriendShopAd.ignoreContentAdaptWithSize(false)
                        imgFriendShopAd.width = this._panelMain.width;
                        imgFriendShopAd.height = this._panelMain.height;
                        var btn_AdClose = imgFriendShopAd.getChildByName("btn_AdClose");
                        if (!btn_AdClose) {
                            btn_AdClose = new ccui.Button("store/btn_AdClose.png");
                            btn_AdClose.setAnchorPoint(1,1);
                            btn_AdClose.setName("btn_AdClose");
                            btn_AdClose.setPosition(imgFriendShopAd.width-50, imgFriendShopAd.height-30);
                            imgFriendShopAd.addChild(btn_AdClose);
                        }
                        btn_AdClose.addTouchEventListener(function(sender,type){
                            if(type === 2){
                                imgFriendShopAd.visible = false;
                                var date = new Date();
                                util.localStorageEncrypt.setNumberItem("KEY_FRIENDSHOPAD_CLOSETIME",date.getTime())

                            }
                        },this);
                    }
                    imgFriendShopAd.setName("imgFriendShopAd");

                    imgFriendShopAd.setPosition(this._panelMain.width/2,this._panelMain.height/2)
                    this._friendShopNode.addChild(imgFriendShopAd);
                }
                imgFriendShopAd.setTouchEnabled(true);
                imgFriendShopAd.zIndex = 1;
                imgFriendShopAd.visible = true;

                var oldTime = util.localStorageEncrypt.getNumberItem("KEY_FRIENDSHOPAD_CLOSETIME", 0);
                if (oldTime != 0) {
                    oldTime = new Date(oldTime);
                    var nowDate = new Date();
                    if (isAgent() && nowDate.getDate() == oldTime.getDate() && nowDate.getMonth() == oldTime.getMonth()) {
                        imgFriendShopAd.visible = false;
                    }
                }

                imgFriendShopAd.addTouchEventListener(function(sender,type){
                    if(type == 2){
                        if(!isAgent()){
                            return;
                        }
                        MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                            type: 17
                        }, function(rtn) {
                            if (rtn.code == 0) {
                                var layer = new DaiLiWebviewLayer(rtn.data);
                                if (layer.isInitSuccess()){
                                    MjClient.Scene.addChild(layer);

                                }
                            } else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                } else {
                                    MjClient.showToast("获取数据失败");
                                }
                            }
                        });
                    }
                })
            }else{
                if(imgFriendShopAd){
                    imgFriendShopAd.visible = false;
                }
            }

        }
        this._reqBuyFriendShopItem = function(itemData){
            var self = this;
            this.addChild(new Friendcard_shop_commit_sheet(itemData,function(){
                MjClient.block();
                var sendInfo = {
                    userId:self._friendShopNode._data.userId,
                    goodsId:itemData.id
                }
                MjClient.gamenet.request("pkplayer.handler.userStoreOrder", sendInfo, function (rtn) {
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(self)){
                        true;
                    }
                    if (rtn.code == 0) {
                        MjClient.showToast("下单成功，请联系代理处理")
                    }else{
                        if(rtn.message){
                            MjClient.showToast(rtn.message + "")
                        }else{
                            MjClient.showToast("下单失败")
                        }
                    }
                });
            }))
        }
        this._reqFriendShopData = function(){
            MjClient.block();
            var sendInfo = {}
            if(this._searchLayout._edt_input.getString()){
                sendInfo.userId = this._searchLayout._edt_input.getString();
            }else{
                if(this._clubInfo.leagueId){
                    sendInfo.leagueId = this._clubInfo.leagueId;
                }else{
                    sendInfo.clubId = this._clubInfo.clubId;
                }
            }
            cc.log("memberClubStore sendInfo",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.memberClubStore", sendInfo, function (rtn) {
                MjClient.unblock();
                if (rtn.code == 0 && rtn.data) {
                    self._hasInitFriendShopNode = true;
                    self._friendShopNode.visible = true;
                    self._friendShopNode._data = rtn.data;
                    self._reflashFriendShop();
                }else{
                    if(rtn.message){
                        MjClient.showToast(rtn.message + "")
                    }else{
                        MjClient.showToast("获取亲友圈商城失败")
                    }
                }
            });
        }
        this._reqFriendShopData();

    },

    initFriendShopShenheNode: function () {
        var self = this;
        if(this._hasInitFriendShopShenheNode){
            this._reqFriendShopShenheData();
            return;
        }
        var _panel = this._friendShopShenheNode;
        _panel._hasMoreData = true;
        _panel._data = [];
        _panel._data.list = [];
        _panel._prePageLength = 5;//本地测试分页
        if (cc.sys.OS_WINDOWS != cc.sys.os) {
            _panel._prePageLength = 50;
        }
        
        _panel._btn_setShenheMember = _panel.getChildByName("Button_setShenheMember");
        _panel._btn_setAuditFreeMember = _panel.getChildByName("Button_setAuditFreeMember");
        if(!isAgent()){
            _panel._btn_setShenheMember.visible = false;
            _panel._btn_setAuditFreeMember.visible = false;
        }
        _panel._btn_setShenheMember.addTouchEventListener(function(sender,type){
            if(type == 2){
                self.addChild(new Friendcard_shop_manager());
            }
        })
        _panel._btn_setAuditFreeMember.addTouchEventListener(function(sender,type){
            if(type == 2){
                self.addChild(new Friendcard_shop_audit_free());
            }
        })
        _panel._listView =  _panel.getChildByName("listView");
        _panel._cell = _panel.getChildByName("Cell");
        _panel._cell.visible = false;

        _panel._Text_empty_tip = _panel.getChildByName("Text_empty_tip");
        _panel._Text_empty_tip.ignoreContentAdaptWithSize(true);
        this._createFriendShopShenheItem = function(item,index,itemData){
            var head = item.getChildByName("Image_head");
            head.isMask = true;
            COMMON_UI.refreshHead(this, itemData.headimgurl ? itemData.headimgurl : "png/default_headpic.png", head);
            // 名称
            var name = item.getChildByName("Text_name");
            name.ignoreContentAdaptWithSize(true);
            name.setString(getNewName(unescape(itemData.nickname),5));

            // 玩家ID
            var id = item.getChildByName("Text_ID");
            id.ignoreContentAdaptWithSize(true);
            id.setString(unescape(itemData.userId));

            var text_content = item.getChildByName("Text_content");
            var contentStr = "在ID"+itemData.sellerId+"的商城购买"+itemData.amount+"颗钻石";
            if(itemData.present){
                contentStr += ",加送"+itemData.present+"颗钻石";
            }
            text_content.setString(contentStr);

            var btn_tongGuo = item.getChildByName("Button_tongGuo");
            btn_tongGuo.addTouchEventListener(function (sender, type)
            {
                if (type != 2){
                    return;
                }
                self.addChild(new Friendcard_shop_confirm_sheet(itemData,1,function(){
                    self._reqDealShopSheet(itemData,1,index)
                }))

            })
            var btn_jujue = item.getChildByName("Button_jujue");
            btn_jujue.addTouchEventListener(function (sender, type)
            {
                if (type != 2){
                    return;
                }
                self.addChild(new Friendcard_shop_confirm_sheet(itemData,0,function(){
                    self._reqDealShopSheet(itemData,0,index)
                }))
            })
        }
        this._reflashFriendShopShenhe = function(shouldClear){

            var preItemNum = _panel._listView.getItems().length;
            var curentPoint = _panel._listView.getInnerContainerPosition();
            if(curentPoint.y > 0){
                curentPoint.y = 0;
            }
            var initPointY = _panel._listView.height - _panel._listView.getInnerContainerSize().height;
            var cell = _panel._cell;
            cell.visible = false;
            if(shouldClear || (_panel._data.list.length <= 0)){
                _panel._listView.removeAllItems();
                preItemNum = 0;
            }
            if(_panel._data.list.length <= 0){
                _panel._Text_empty_tip.visible = true;
                return;
            }else{
                _panel._Text_empty_tip.visible = false;
            }
            for (var i = 0; i < _panel._data.list.length; i ++){
                var item = _panel._listView.getItems()[i];
                if(!item){
                    item = cell.clone();
                    _panel._listView.pushBackCustomItem(item);
                }
                item.visible = true;
                this._createFriendShopShenheItem(item,i,_panel._data.list[i])
                item.dataIndex = i
            }

            for(var i = preItemNum - 1; i >= _panel._data.list.length; i--){
                _panel._listView.getItems()[i].removeFromParent(true);
            }
            FriendCard_UI.addListBottomTipUi(_panel._listView,_panel._hasMoreData ? 2 : 3)
            _panel._listView.forceDoLayout();
            if(preItemNum > 0){
                curentPoint.y = curentPoint.y + _panel._listView.getInnerContainerPosition().y - initPointY;
                var totalY = (_panel._listView.height - _panel._listView.getInnerContainerSize().height);
                if(totalY == 0){
                    var percent = 0;
                }else{
                    var percent = 100 - curentPoint.y * 100 / totalY;
                }
                _panel._listView.jumpToPercentVertical(percent)
            }
        }
        this._reqDealShopSheet = function(itemData,opt,index){
            var self = this;
            MjClient.block();
            var sendInfo = {
                orderId:itemData.id,
                status:opt
            }
            cc.log("auditDiamondOrder sendInfo",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.auditDiamondOrder", sendInfo, function (rtn) {
                MjClient.unblock();
                if(!cc.sys.isObjectValid(self)){
                    return;
                }
                if (rtn.code == 0) {
                    _panel._data.list.splice(index, 1);
                    self._reflashFriendShopShenhe(false);
                    MjClient.showToast("处理订单成功")
                }else{
                    if(rtn.message){
                        MjClient.showToast(rtn.message + "")
                    }else{
                        MjClient.showToast("处理订单失败")
                    }
                }
            });
        }
        this._reqFriendShopShenheData = function(lastId){
            MjClient.block();
            var sendInfo = {
                status:1,
                pageId:lastId,
                pageLen:_panel._prePageLength
            }
            cc.log("listDiamondOrderForSeller sendInfo",JSON.stringify(sendInfo));
            var alreadyCount = lastId ? _panel._data.list.length : 0;
            _panel._isLoadingData = true;
            MjClient.gamenet.request("pkplayer.handler.listDiamondOrderForSeller", sendInfo, function (rtn) {
                MjClient.unblock();
                if(!cc.sys.isObjectValid(self)){
                    true;
                }
                _panel._isLoadingData = false;
                if (rtn.code == 0 && rtn.data) {
                    var dataLength =rtn.data.length;
                    _panel._hasMoreData = dataLength >= _panel._prePageLength;
                    if (alreadyCount == 0){
                        _panel._data.list = [];
                    }
                    _panel._data.list = _panel._data.list.concat(rtn.data);
                    self._reflashFriendShopShenhe(alreadyCount == 0 ? true: false);
                }else{
                    if(rtn.message){
                        MjClient.showToast(rtn.message + "")
                    }else{
                        MjClient.showToast("获取亲友圈商城审核列表失败")
                    }
                }
            });
        }
        FriendCard_UI.setListAutoLoadMore(_panel._listView,function(){
            FriendCard_UI.addListBottomTipUi(_panel._listView,1)
            self._reqFriendShopShenheData(_panel._data.list[_panel._data.list.length-1].id);
        },function(){
            if (!_panel._isLoadingData &&
                _panel._hasMoreData &&
                (_panel._data.list.length > 0)){
                return true;
            }
            return false
        })

        self._hasInitFriendShopShenheNode = true;

        this._reqFriendShopShenheData();

    },

    initZhuangBanNode:function(){
        if(!this.Button_zhuangBan_tab){
            return;
        }
        var self = this;
        
        var btn_all = this._zhuangBanNode.getChildByName("btn_all");
        var btn_recommend = this._zhuangBanNode.getChildByName("btn_recommend");
        var btn_headFream = this._zhuangBanNode.getChildByName("btn_headFream");
        var btn_chatEmoji = this._zhuangBanNode.getChildByName("btn_chatEmoji");
        var btn_tools = this._zhuangBanNode.getChildByName("btn_tools");
        var btn_action = this._zhuangBanNode.getChildByName("btn_action");
        //btn_action.visible = false;
        this._pageList = [btn_all,btn_chatEmoji,btn_tools,btn_headFream,btn_action,btn_recommend];

        for (let index = 0; index < this._pageList.length; index++) {
            this._pageList[index].setTag(index);
            this._pageList[index].addTouchEventListener(function(sender, type){
                if(type != ccui.Widget.TOUCH_ENDED)
                    return;
                this.showPage(sender.tag);
                this.reqZhuangBanData(sender.tag);
            },this);
        }
        //scrollViewRecommend
        var scrollViewAll = this._zhuangBanNode.getChildByName("scrollViewAll");
        var scrollViewRecommend = this._zhuangBanNode.getChildByName("scrollViewRecommend");
        var scrollViewHeadFream = this._zhuangBanNode.getChildByName("scrollViewHeadFream");
        var scrollViewChatEmoji = this._zhuangBanNode.getChildByName("scrollViewChatEmoji");
        var scrollViewTools = this._zhuangBanNode.getChildByName("scrollViewTools");
        var scrollViewAction = this._zhuangBanNode.getChildByName("scrollViewAction");
        this.zhuangBanView = [scrollViewAll,scrollViewChatEmoji,scrollViewTools,scrollViewHeadFream,scrollViewAction,scrollViewRecommend];
        
        this.scrollViewAll = scrollViewAll;
        this.cell_zhuangBan = this._zhuangBanNode.getChildByName("bg_item_0");
        this.cell_zhuangBan.visible = false;
        this.ScrollView_headFrame = scrollViewHeadFream;
        this.ScrollView_biaoqing = scrollViewChatEmoji;
        this.ScrollView_daoju = scrollViewTools;
        this.ScrollView_dongHua = scrollViewAction;
        this.ScrollView_tuijian = scrollViewRecommend;

        var _listViewState = 0;
        this._allId = 0;
        // 这里只做 总的分页加载 其它页面 不可能超过100个  超过了 再优化
        this.scrollViewAll.addCCSEventListener(function(sender,type){
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState == 0)
                    {
                        _listViewState = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1)
                    {
                        //MjClient.showToast("----lms ---")
                        self.reqZhuangBanData(0);
                    }
                    _listViewState = 0;
                    break;
            }
        });
        self.allDataLen = 0;
        self.allDataLenBefore = 1;

        if(!self._zhuangBandata){
            this.reqZhuangBanData(5);
            this.showPage(5);
        } 

    },
    init_zhuangBanPage:function(data, type){
        if(!cc.sys.isObjectValid(this) || !data) return;
        var self = this;
        var addItems = function(oneData, index){
            var copyNode = this.cell_zhuangBan.clone();
            copyNode.visible = true;
            var title = copyNode.getChildByName("title");
            title.ignoreContentAdaptWithSize(true);
            title.setString(oneData.title);

            var Image_zhekou = copyNode.getChildByName("Image_zhekou");
            var Text_zhekou = Image_zhekou.getChildByName("Text_zhekou");
            Text_zhekou.ignoreContentAdaptWithSize(true);
            Text_zhekou.setString(oneData.extend.discount * 10 + " 折");
            Image_zhekou.visible = !!oneData.extend.discount;

            var Text_zs = copyNode.getChildByName("Text_zs");
            Text_zs.ignoreContentAdaptWithSize(true);
            Text_zs.setString(oneData.extend.price);

            var Text_lb = copyNode.getChildByName("Text_lb");
            Text_lb.ignoreContentAdaptWithSize(true);
            Text_lb.setString(oneData.extend.consume);
            //oneData.isLocked    img_libao
            var img_unLock = copyNode.getChildByName("img_unLock");
            img_unLock.setVisible(oneData.isLocked == 1);
            
            var img_libao = copyNode.getChildByName("img_libao");
            img_libao.setVisible(oneData.propType == 5);
            if(oneData.propType == 5) Image_zhekou.visible = false;

            var Image_lebi = copyNode.getChildByName("Image_lebi");
            var Text_zsMoney = Image_lebi.getChildByName("Text_zsMoney");
            Text_zsMoney.ignoreContentAdaptWithSize(true);
            Text_zsMoney.setString(oneData.extend.discountPrice);
            Image_lebi.visible = !!oneData.extend.discountPrice;
            copyNode.getChildByName("Image_line").visible = !!oneData.extend.discountPrice;



            var imge_frame = copyNode.getChildByName("mainImg");
            if(oneData.propType == 4){
                imge_frame.loadTexture("userInfo_3.0/zhuangBan/cartoon/" + oneData.aliasId + ".png")
            }else if(oneData.propType == 3){
                imge_frame.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + oneData.aliasId +".png");
            }else if(oneData.propType == 1){
                imge_frame.loadTexture("userInfo_3.0/zhuangBan/chat_emoji/" + oneData.aliasId + ".png")
            }else if(oneData.propType == 2){
                imge_frame.loadTexture("userInfo_3.0/zhuangBan/tools/" + oneData.aliasId + ".png")
            }else if(oneData.propType == 5){
                imge_frame.loadTexture("userInfo_3.0/zhuangBan/gifts/" + "LB1" + ".png")
            }
            imge_frame.setTouchEnabled(true);
            imge_frame.data = oneData;
            imge_frame.addTouchEventListener(function(sender, type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    if(sender.data.propType == 5){
                        this.addChild(new CosPlayShopSelectGift(sender.data));
                    }else{
                        this.addChild(new CosPlayShopSelect(sender.data));
                    }
                    
                }
            },this);

            if (MjClient.jumpToStoreData) {
                if(MjClient.jumpToStoreData.propId && MjClient.jumpToStoreData.propId == oneData.propId){
                    this.addChild(new CosPlayShopSelect(oneData));
                    delete(MjClient.jumpToStoreData);
                }else if (oneData.propType==5 && oneData.extend && oneData.extend.propPack) {//礼包，遍历礼包内物品
                    var pack = oneData.extend.propPack;
                    for(var i =0; i<pack.length; i++){
                        if (pack[i].propId == MjClient.jumpToStoreData.propId) {
                            this.addChild(new CosPlayShopSelectGift(oneData));
                            delete(MjClient.jumpToStoreData);
                            break;
                        }
                    }
                }
            }



            var btn_zs = copyNode.getChildByName("btn_zs");
            btn_zs.price = oneData.extend.price;
            btn_zs.discountPrice = oneData.extend.discountPrice;
            btn_zs.data = oneData;
            btn_zs.addTouchEventListener(function(sender, type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    if(!sender.price){
                        MjClient.showToast("此商品不能用钻石购买");
                        return;
                    }
                    var _price = sender.discountPrice ? sender.discountPrice:sender.price;
                    MjClient.showMsg("确定使用" + _price + "钻石来购买该物品吗？", function() {
                        self.reqZhuangBanUnlock(2,sender.data.id,sender.data.propType);
                    }, function() {}, "1");
                    
                }
            },this);

            var btn_lb = copyNode.getChildByName("btn_lb");
            btn_lb.data = oneData;
            btn_lb.price = oneData.extend.consume
            btn_lb.addTouchEventListener(function(sender, type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    if(!sender.price){
                        MjClient.showToast("此商品不能用乐币购买");
                        return;
                    }
                    self.reqZhuangBanUnlock(1,sender.data.id,sender.data.propType);
                    
                }
            },this);
            
            if(!type) this._allId = oneData.id

            return copyNode;

        }.bind(this);
        var _list = this.scrollViewAll;
        if(type == 3){
            _list = this.ScrollView_headFrame;
        }else if(type == 1){
            _list = this.ScrollView_biaoqing;
        }else if(type == 2){
            _list = this.ScrollView_daoju;

        }else if(type == 4){
            _list = this.ScrollView_dongHua;
        }else if(type == 5){
            _list = this.ScrollView_tuijian;
        }
        
        var pai = Math.ceil(data.length / 4);

        if(type){
            _list.removeAllChildren();
        } 
        if (!type) {
            //cc.log(" ----self.allDataLen ",self.allDataLen)
            pai = Math.ceil(self.allDataLen / 4);
            _list.setInnerContainerSize(cc.size(1000, 325 * pai))
            //cc.log(" ----pai ",pai)
        }
        else {
            _list.setInnerContainerSize(cc.size(1000, 325 * pai))
        }
        
        var _height = _list.getInnerContainerSize().height;
        var index = 1;
        if(!type){
            index = self.allDataLenBefore;
            self.allDataLenBefore += data.length;

        }
        for (; index <= data.length; index++) {
            var lie = index % 4;
            var pai = Math.ceil(index / 4);
            var pos_x = 148 + (lie-1) * 250;
            var pos_y = (_height - 150) - (pai - 1) * 325;
            if(lie == 0) pos_x = 148 + 250*3;
            var item = addItems(data[(index - 1)], index);
            item.x = pos_x;
            item.y = pos_y;
            _list.addChild(item);

        }

        if((type && data.length == 0) ||(!type && self.allDataLen == 0)){
            var nullPic = new ccui.ImageView("common_3.0/bg_kong.png");
            nullPic.setPosition(cc.p(500, 285));
            _list.addChild(nullPic);
        }
        
    },
    showPage:function(number){
        cc.log(" ====== number ",number);
        for (let index = 0; index < this._pageList.length; index++) {

            this._pageList[index].setBright(number != index);
            this.zhuangBanView[index].visible = number == index;
        }
        

    },
    //  pkplayer.handler.userHappyCyMall
    reqZhuangBanData: function (type,isReFresh) {
        var self = this;
        if (!isReFresh) {
            if ((type == 1 && self._zhuangBandata1) || (type == 2 && self._zhuangBandata2) || (type == 3 && self._zhuangBandata3)
                || (type == 4 && self._zhuangBandata4) || (type == 5 && self._zhuangBandata5)) {
                return;
            }
        }
        
        var lastIndex = this._allId;
        if(type) lastIndex = 0;
        
        MjClient.block();
        var sendInfo = { propType: type, length:100, lastIndex:lastIndex};
        if(type == 5){
            sendInfo.isRcmd = 1;
        }
        MjClient.gamenet.request("pkplayer.handler.userHappyCyMall", sendInfo,
            function (rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(self)) {
                    return;
                }
                cc.log(" ----type ",type);
                cc.log("pkplayer.handler.userHappyCyMall",JSON.stringify(rtn));

                if (rtn.code == 0) {
                    
                    switch (type) {
                        case 1:
                            self._zhuangBandata1 = rtn.data;
                            
                            break;
                        case 2:
                            self._zhuangBandata2 = rtn.data;
                            
                            break;
                        case 3:
                            self._zhuangBandata3 = rtn.data;
                            
                            break;
                        case 4:
                            self._zhuangBandata4 = rtn.data;
                            
                            break;
                        case 5:
                            self._zhuangBandata5 = rtn.data;
                            
                            break;

                        default:
                            self.allDataLen += rtn.data.length;
                            self._zhuangBandata = rtn.data;
                            break;
                    }
                    self.init_zhuangBanPage(rtn.data,type);

                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message + "")
                    }
                }

            });

    },
    reqZhuangBanUnlock: function (type,propId, type2) {
        var self = this;
        MjClient.block();

        var sendInfo = { propId: propId,exchangeType:type };
        MjClient.gamenet.request("pkplayer.handler.userDressCurrencyUnlock", sendInfo,
            function (rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(self)) {
                    return;
                }
                cc.log("pkplayer.handler.userDressCurrencyUnlock",JSON.stringify(rtn));
                if (rtn.code == 0) {
                    MjClient.showToast("购买成功");
                } else{
                    if (rtn.message) {
                        MjClient.showToast(rtn.message + "")
                    }
                }
                
                var isReFresh = true;
                self.reqZhuangBanData(type2, isReFresh);

            });

    },
    setBindView:function (historyBind) {
        return;
        var self = this;
        var img_msg = this._yuanbaNode.getChildByName("img_msg");
        img_msg.setPosition(this._panelMain.width/2 - this._panelLeftBtn.width/2, this._panelMain.height/2);
        var _desc = img_msg.getChildByName("Text_1");
        _desc.ignoreContentAdaptWithSize(true);
        if(MjClient.updateCfg)
        {
            _desc.setString("");
            if(!historyBind || historyBind <= 0)
            {
                _desc.setString(""+MjClient.systemConfig.yaoqinmaInfo);
            }
            else
            {
                _desc.setString(""+MjClient.systemConfig.yaoqinmaInfo2);
            }
        }
        _desc.visible = false;
        var str = ""+MjClient.systemConfig.yaoqinmaInfo;
        var str1 = str.split(",")[0];
        var str2 = str.split(",")[1];
        var s1 = str2.split(":")[0] + ": ";
        var s2 = str2.split(":")[1];
        if (str1 && str2 && s1 && s2) {
            // 富文本描述1
            var richText1 = new ccui.RichText();
            richText1.ignoreContentAdaptWithSize(false);
            richText1.setAnchorPoint(0,0);
            richText1.width = 500;
            richText1.height = 30;
            //不同颜色文本
            var re1 = new ccui.RichElementText(1, cc.color("#443333"), 255, str1, "fonts/lanting.TTF", 24);
            richText1.pushBackElement(re1);
            richText1.x = 175;
            richText1.y = 210;
            img_msg.addChild(richText1);

            // 富文本描述2
            var richText2 = new ccui.RichText();
            richText2.ignoreContentAdaptWithSize(false);
            richText2.setAnchorPoint(0,0);
            richText2.width = 500;
            richText2.height = 30;
            //不同颜色文本
            var re2 = new ccui.RichElementText(1, cc.color("#443333"), 255, s1, "fonts/lanting.TTF", 24);
            var re3 = new ccui.RichElementText(2, cc.color("#DE1D1D"), 255, s2, "fonts/lanting.TTF", 24);
            richText2.pushBackElement(re2);
            richText2.pushBackElement(re3);
            richText2.x = 150;
            richText2.y = 170;
            img_msg.addChild(richText2);
        }
        else {
            _desc.visible = true;
        }

        var _TextBg = img_msg.getChildByName("xiaotanchuan_51");

        var edtContentSize= _TextBg.getContentSize();
        this._textFeildName = new cc.EditBox(edtContentSize, new cc.Scale9Sprite("store/dise3.png"));
        this._textFeildName.setPlaceholderFontSize(24);
        this._textFeildName.setFontColor(cc.color("#DE1D1D"));
        this._textFeildName.setPlaceholderFontColor(cc.color("#443333"));
        this._textFeildName.setFontSize(32);

        this._textFeildName.setMaxLength(8);
        this._textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._textFeildName.setPlaceHolder("请输入邀请码...");
        this._textFeildName.setPosition(_TextBg.getContentSize().width/2, _TextBg.getContentSize().height/2);
        _TextBg.addChild(this._textFeildName);

        /*
         绑定
         */
        var _Btn_binding = img_msg.getChildByName("Btn_binding");
        _Btn_binding.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Bindingsure", {uid:SelfUid()});
                var _str = self._textFeildName.getString();
                if(_str.length == 0 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的邀请码");
                    return;
                }


                MjClient.block();
                MjClient.gamenet.request("pkcon.handler.getMemberInfo", {memberId:Number(_str)}, function(rtn)
                {
                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(self)) {
                        return;
                    }
                    if(rtn.code==0)
                    {
                        var layer = new bindingCodeLayer_tips(rtn.data,function()
                        {
                            self.binding(Number(_str));
                        });
                        self.addChild(layer);
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }

                });
            }
        },this);
    },
    binding:function(ID)
    {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.setUserMember",{memberId:ID},
            function(rtn)
            {
                MjClient.unblock();

                if(rtn.code == 0)
                {
                    if (cc.sys.isObjectValid(self)) {
                        self.showIsBindUi(true);
                    }
                }
                if(rtn.message)
                {
                    MjClient.showToast(rtn.message);
                }
            }
        );
    },
    showIsBindUi:function (isBind) {
        this.isBind = isBind;
        return;
        var img_msg = this._yuanbaNode.getChildByName("img_msg");
        if (img_msg){
            img_msg.setVisible(!isBind);
        }
        var gezi = this._yuanbaNode.getChildByName("Image_gezi");
        if (gezi){
            gezi.setVisible(isBind);
        }
        var i = 0;
        while(true){
            var item = this._yuanbaNode.getChildByName("bg_item_"+i);
            if (!item){
                break;
            }
            item.setVisible(isBind);
            i++;
        }
    },
    setItemImage : function(url,sp){
        if (!url) return;
        cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, texture) {
            if (!err && texture&&cc.sys.isObjectValid(sp)) {

                var _sprite = new cc.Sprite(texture);
                _sprite.setPosition(sp.getPosition());
                sp.setVisible(false);
                sp.getParent().addChild(_sprite);

            }
        });
    }
});



// 商城 乐币流水 
var storeLayer_lebiAccount = cc.Layer.extend({
    jsBind:{
        back:{
            mainBg:{
                headImg:{
                    _event: {
                        loadWxHead: function (d) {
                            var sp = new cc.Sprite(d.img);
                            var _pos = {
                                "x": this.getContentSize().width / 2,
                                "y": this.getContentSize().height / 2
                            };
                            sp.setPosition(_pos);
                            sp.setScaleX((this.width) / sp.width);
                            sp.setScaleY((this.height) / sp.height);
                            this.addChild(sp);
                            // setWgtLayout(sp, [0.88, 0.88], [0.5, 0.5], [0, 0], false, true);
                        }
                    }
                },
                headFrame:{
                    _event: {
                        loadWxHead: function (d) {                         
                            //遮罩框 用来 替换不同的头像框
                            var _strKuang = MjClient.data.pinfo.aliasId || "TX0";
                            this.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + _strKuang +".png")
                            
                        }
                    }
                },
                img_gztq:{
                    _event: {
                        loadWxHead: function (d) {                        
                            var pinfo = MjClient.data.pinfo;
                            var str_gz = pinfo.userGrade > 0 ? pinfo.userGrade : 0;
                            this.loadTexture("userInfo_3.0/guiZu/gz_0" + str_gz + ".png")
                            
                        }
                    }
                },
            },
            
        }
    },
    _color1: cc.color("#2bae48"),
    _color2: cc.color("#fa7120"),
    ctor: function () {
        this._super();
        var UI = ccs.load("StoreLayerAcccount.json");
        this.addChild(UI.node);
        BindUiAndLogic(UI.node,this.jsBind);
        var pinfo = MjClient.data.pinfo; 
        MjClient.loadWxHead(pinfo.uid,pinfo.headimgurl);

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");

        this._back = _back;
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);
 
        this.initUI();

    },

    initUI:function(){
        var self = this;
        var _back = this._back.getChildByName("mainBg");
        var _close = _back.getChildByName("close");
        _close.setTouchEnabled(true);
        _close.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                this.removeFromParent();
            }
        },this);

        // Image_fanLB  Text_beishu  

        var pinfo = MjClient.data.pinfo;
        var str_gz = pinfo.userGrade > 0 ? pinfo.userGrade : 0;
        var grade = [0, 1, 1, 1.5, 1.5, 1.5, 2, 2, 2, 3];
        var Text_beishu =  _back.getChildByName("Image_fanLB").getChildByName("Text_beishu");
        Text_beishu.setString(grade[str_gz]);
        Text_beishu.ignoreContentAdaptWithSize(true);

        var list_record =  _back.getChildByName("list_record");
        var cell_record =  _back.getChildByName("cell_record");
        cell_record.visible = false;

        var initRecordItem = function(oneData){
            if (!cc.sys.isObjectValid(this)) return;
            var copyNode = cell_record.clone();
            copyNode.visible = true;
            var getList = ["充值","代充","在代理商城购买钻石","祈福袋扣取","祈福袋获得","夺宝扣取","解锁道具扣取","钻石兑换乐币"]
            
            var textGet = copyNode.getChildByName("textGet");
            textGet.ignoreContentAdaptWithSize(true);
            textGet.setString(getList[(oneData.method - 1)]);
            textGet.visible = false;
            
            var _str = oneData.type == 1 ? "(获得)":"(扣取)"
            var _dataList2 = [
                [getList[(oneData.method - 1)], "fonts/lanting.TTF", 20,"#738857"],
                //[_str , "fonts/lanting.TTF", 20, "#fa7120"],
            ];

            if(oneData.method == 7 &&oneData.extend &&oneData.extend.title && oneData.extend.propType){
                var _list =["聊天表情","互动表情","头像框","入场动画"];
                _dataList2 = [
                    ["购买", "fonts/lanting.TTF", 20,"#738857"],
                    [oneData.extend.title, "fonts/lanting.TTF", 20,"#fa7120"],
                    [_list[(oneData.extend.propType-1)], "fonts/lanting.TTF", 20,"#738857"],
                    //[_str , "fonts/lanting.TTF", 20, "#fa7120"],
                ];
            }
            var _richText = COMMON_UI.RichText(_dataList2);
            _richText.setPosition(cc.p(textGet.x,textGet.y + 10))
            copyNode.addChild(_richText);

            var text_lbNumber = copyNode.getChildByName("text_lbNumber");
            text_lbNumber.ignoreContentAdaptWithSize(true);
            var expNumber = oneData.type == 1 ? "+" + oneData.happyCy : "-" + oneData.happyCy;
            text_lbNumber.setString(expNumber);
            if(oneData.type == 1){
                text_lbNumber.setTextColor(cc.color("#2bae48"));
            }else{
                text_lbNumber.setTextColor(cc.color("#fa7120"));
            }

            var text_expTotal = copyNode.getChildByName("text_expTotal");
            text_expTotal.ignoreContentAdaptWithSize(true);
            text_expTotal.setString(oneData.curHappyCy + "乐币");

            var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy-MM-dd hh:mm:ss');
            var text_time = copyNode.getChildByName("text_time");
            text_time.ignoreContentAdaptWithSize(true);
            text_time.setString(_timeStr);

            return copyNode;

        }.bind(this);
        
        var reqRecordData = function(){
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.userHappyCyRecord",{},function(rtn){
                cc.log(" pkplayer.handler.userHappyCyRecord ",JSON.stringify(rtn))
                if(rtn.code==0)
                {
                    var _data = rtn.data;
                    list_record.removeAllItems();
                    for (var i = 0; i < _data.length; i++) {
                        list_record.pushBackCustomItem(initRecordItem(_data[i]));
                        
                    }

                }
                else
                {
                    if (rtn.message)
                        MjClient.showToast(rtn.message);
                    else
                        MjClient.showToast("数据读取失败，请重试");
                }
                MjClient.unblock();
            });
        }.bind(this);

        
        
        //list_record
        reqRecordData();



    },

});

// 装扮 商城 选择 购买
var CosPlayShopSelect = cc.Layer.extend({
    ctor: function (data) {
        this._super();
        var UI = ccs.load("StoreZhuangBanTip.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        //mainBg
        this._back = back.getChildByName("mainBg");
        //关闭按钮
        var close = this._back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        cosPlayTableInfo(this);

        var title = this._back.getChildByName("Image_title").getChildByName("msg");
        

        var Text_name = this._back.getChildByName("Text_name");
        Text_name.ignoreContentAdaptWithSize(true);
        Text_name.setString(data.title);

        var imge_frame = this._back.getChildByName("img_txk");
        imge_frame.visible = false;
        var img_bg = this._back.getChildByName("img_bg");
        
        if(data.propType == 4){
            title.setString("入场动画");
            var img_dh = img_bg;
            if(this.RCDH_tab && this.RCDH_tab[data.aliasId]){
                var _json = "userInfo_3.0/zhuangBan/cartoon/" + this.RCDH_tab[data.aliasId] + "/" + this.RCDH_tab[data.aliasId] + ".json";
                var _atlas = "userInfo_3.0/zhuangBan/cartoon/" + this.RCDH_tab[data.aliasId] + "/" + this.RCDH_tab[data.aliasId] + ".atlas";
                var projNode = createSpine(_json, _atlas);
                projNode.setAnimation(0, 'animation', true);
                projNode.setPosition(cc.p(img_dh.width * 0.5,img_dh.height * 0.3));
                projNode.setScale(0.4);
                projNode.setName("animation");
                img_dh.addChild(projNode, 9);
            }else{
                var _icon  = ccui.ImageView("userInfo_3.0/zhuangBan/cartoon/" + data.aliasId +".png");
                _icon.setPosition(cc.p(img_dh.width/2,img_dh.height/2));
                _icon.setName("icon_dh");
                img_dh.addChild(_icon);

            }
        }else if(data.propType == 3){
            imge_frame.visible = true;
            imge_frame.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + data.aliasId +".png");
            title.setString("头像框");
        }else if(data.propType == 1){
            var img_biaoqing = img_bg;
            title.setString("聊天表情");
            var _json = "userInfo_3.0/zhuangBan/chat_emoji/" + this.LTBQ_tab[data.aliasId] + "/" + this.LTBQ_tab[data.aliasId] + ".json";
            var _atlas = "userInfo_3.0/zhuangBan/chat_emoji/" + this.LTBQ_tab[data.aliasId] + "/" + this.LTBQ_tab[data.aliasId] + ".atlas";
            var projNode = createSpine(_json, _atlas);
            projNode.setAnimation(0, 'animation', true);
            projNode.setPosition(img_biaoqing.width/2, img_biaoqing.height * 0.2);
            projNode.setScale(0.6);
            projNode.setName("animation");
            img_biaoqing.addChild(projNode, 9);
        }else if(data.propType == 2){
            var img_daoju = img_bg;
            title.setString("互动道具");
            if(this.HDDJ_tab[data.aliasId]){
                var _json = "userInfo_3.0/zhuangBan/tools/" + this.HDDJ_tab[data.aliasId] + "/" + this.HDDJ_tab[data.aliasId] + ".json";
                var _atlas = "userInfo_3.0/zhuangBan/tools/" + this.HDDJ_tab[data.aliasId] + "/" + this.HDDJ_tab[data.aliasId] + ".atlas";
                var projNode = createSpine(_json, _atlas);
                projNode.setAnimation(0, 'animation', true);
                projNode.setPosition(cc.p(img_daoju.width * 0.5,img_daoju.height * 0.4));
                projNode.setScale(1);
                projNode.setName("animation");
                img_daoju.addChild(projNode, 9);
            }else{
                var _icon  = ccui.ImageView("userInfo_3.0/zhuangBan/tools/" + data.aliasId +".png");
                _icon.setPosition(cc.p(img_daoju.width/2,img_daoju.height/2));
                _icon.setName("icon_daoju");
                img_daoju.addChild(_icon);


            }
        }

        var btn_lb = this._back.getChildByName("btn_lb");
        var lb_num = btn_lb.getChildByName("Text_1");
        lb_num.ignoreContentAdaptWithSize(true);
        lb_num.setString(data.extend.consume);
        lb_num.setAnchorPoint(cc.p(0, 0.5));
        btn_lb.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(!data.extend.consume){
                    MjClient.showToast("此商品不能用乐币购买");
                    return;
                }
                self.reqZhuangBanUnlock(1,data.id);
            }
        }, this);

        var btn_zs = this._back.getChildByName("btn_zs");
        var zs_num = btn_zs.getChildByName("Text_1");
        zs_num.ignoreContentAdaptWithSize(true);
        zs_num.setAnchorPoint(cc.p(0, 0.5));
        zs_num.setString(data.extend.discountPrice || data.extend.price);

        var Image_zhekou = btn_zs.getChildByName("Image_zhekou");
        var Text_zk = Image_zhekou.getChildByName("Text_zk");
        Text_zk.ignoreContentAdaptWithSize(true);
        Text_zk.setString(data.extend.discount*10 + " 折");
        Image_zhekou.visible = !!data.extend.discount;
        
        var Text_yuanjia = this._back.getChildByName("Text_yuanjia");
        Text_yuanjia.ignoreContentAdaptWithSize(true);
        Text_yuanjia.setString("原价:" + data.extend.price +"钻石");
        Text_yuanjia.visible = !!data.extend.price;
        
        
        btn_zs.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(!data.extend.price){
                    MjClient.showToast("此商品不能用钻石购买");
                    return;
                }
                self.reqZhuangBanUnlock(2,data.id);
            }
        }, this);
       

        return true;
    },
    reqZhuangBanUnlock: function (type,propId) {
        var self = this;
        MjClient.block();

        var sendInfo = { propId: propId,exchangeType:type };
        MjClient.gamenet.request("pkplayer.handler.userDressCurrencyUnlock", sendInfo,
            function (rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(self)) {
                    return;
                }
                cc.log("pkplayer.handler.userHappyCyMall",JSON.stringify(rtn));
                if (rtn.code == 0) {
                    self.removeFromParent();
                } 
                if (rtn.message) {
                    MjClient.showToast(rtn.message + "")
                }
                

            });

    },
});

// 装扮 商城  礼包    
var CosPlayShopSelectGift = cc.Layer.extend({
    ctor: function (data) {
          this._super();
          var UI = ccs.load("StoreZhuangBanLiBao.json");
          this._rootUI = UI.node;
          this.addChild(this._rootUI);
          var self = this;

          var _block = UI.node.getChildByName("block");
          setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

          var back = UI.node.getChildByName("back");
          setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
          //mainBg
          this._back = back.getChildByName("mainBg");
          //关闭按钮
          var close = this._back.getChildByName("close");
          close.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                      self.removeFromParent();
                }
          }, this);
          cosPlayTableInfo(this);

          

          //var imge_frame = this._back.getChildByName("img_txk");
          //imge_frame.visible = false;
          var img_bg = this._back.getChildByName("img_bg");
          img_bg.visible = false;
          var listView_libao = this._back.getChildByName("listView_libao");
          this.listView_libao = listView_libao;
          this.cell = img_bg;
          listView_libao.removeAllItems();
          var _pro = data.extend.propPack;
          for (let index = 0; index < _pro.length; index++) {
                listView_libao.pushBackCustomItem(this.addItems(_pro[index],index))
                
          }

          

          var btn_lb = this._back.getChildByName("btn_lb");
          var lb_num = btn_lb.getChildByName("Text_1");
          lb_num.ignoreContentAdaptWithSize(true);
          lb_num.setString(data.extend.consume);
          lb_num.setAnchorPoint(cc.p(0, 0.5));
          btn_lb.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                      if (!data.extend.consume) {
                            MjClient.showToast("此商品不能用乐币购买");
                            return;
                      }
                      self.reqZhuangBanUnlock(1, data.id);
                }
          }, this);

          var btn_zs = this._back.getChildByName("btn_zs");
          var zs_num = btn_zs.getChildByName("Text_1");
          zs_num.ignoreContentAdaptWithSize(true);
          zs_num.setAnchorPoint(cc.p(0, 0.5));
          zs_num.setString(data.extend.discountPrice || data.extend.price);

          var Image_zhekou = btn_zs.getChildByName("Image_zhekou");
          var Text_zk = Image_zhekou.getChildByName("Text_zk");
          Text_zk.ignoreContentAdaptWithSize(true);
          Text_zk.setString(data.extend.discount * 10 + " 折");
          Image_zhekou.visible = !!data.extend.discount;

          var Text_yuanjia = this._back.getChildByName("Text_yuanjia");
          Text_yuanjia.ignoreContentAdaptWithSize(true);
          Text_yuanjia.setString("原价:" + data.extend.price + "钻石");
          Text_yuanjia.visible = !!data.extend.price;


          btn_zs.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                      if (!data.extend.price) {
                            MjClient.showToast("此商品不能用钻石购买");
                            return;
                      }
                      self.reqZhuangBanUnlock(2, data.id);
                }
          }, this);


          return true;
    },

    addItems: function (data, index) {
          var img_bg = this.cell.clone();
          img_bg.visible = true;
          var imge_frame = img_bg.getChildByName("img_txk");
          imge_frame.visible = false;
          var title = img_bg.getChildByName("Image_title").getChildByName("msg");

          var Text_name = img_bg.getChildByName("Text_name");
          Text_name.ignoreContentAdaptWithSize(true);
          Text_name.setString(data.title);

          if (data.propType == 4) {
                title.setString("入场动画");
                var img_dh = img_bg;
                if (this.RCDH_tab && this.RCDH_tab[data.aliasId]) {
                      var _json = "userInfo_3.0/zhuangBan/cartoon/" + this.RCDH_tab[data.aliasId] + "/" + this.RCDH_tab[data.aliasId] + ".json";
                      var _atlas = "userInfo_3.0/zhuangBan/cartoon/" + this.RCDH_tab[data.aliasId] + "/" + this.RCDH_tab[data.aliasId] + ".atlas";
                      var projNode = createSpine(_json, _atlas);
                      projNode.setAnimation(0, 'animation', true);
                      projNode.setPosition(cc.p(img_dh.width * 0.5, img_dh.height * 0.3));
                      projNode.setScale(0.4);
                      projNode.setName("animation");
                      img_dh.addChild(projNode, 9);
                } else {
                      var _icon = ccui.ImageView("userInfo_3.0/zhuangBan/cartoon/" + data.aliasId + ".png");
                      _icon.setPosition(cc.p(img_dh.width / 2, img_dh.height / 2));
                      _icon.setName("icon_dh");
                      img_dh.addChild(_icon);

                }
          } else if (data.propType == 3) {
                imge_frame.visible = true;
                imge_frame.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + data.aliasId + ".png");
                title.setString("头像框");
          } else if (data.propType == 1) {
                var img_biaoqing = img_bg;
                title.setString("聊天表情");
                var _json = "userInfo_3.0/zhuangBan/chat_emoji/" + this.LTBQ_tab[data.aliasId] + "/" + this.LTBQ_tab[data.aliasId] + ".json";
                var _atlas = "userInfo_3.0/zhuangBan/chat_emoji/" + this.LTBQ_tab[data.aliasId] + "/" + this.LTBQ_tab[data.aliasId] + ".atlas";
                var projNode = createSpine(_json, _atlas);
                projNode.setAnimation(0, 'animation', true);
                projNode.setPosition(img_biaoqing.width / 2, img_biaoqing.height * 0.2);
                projNode.setScale(0.6);
                projNode.setName("animation");
                img_biaoqing.addChild(projNode, 9);
          } else if (data.propType == 2) {
                var img_daoju = img_bg;
                title.setString("互动道具");
                if (this.HDDJ_tab[data.aliasId]) {
                      var _json = "userInfo_3.0/zhuangBan/tools/" + this.HDDJ_tab[data.aliasId] + "/" + this.HDDJ_tab[data.aliasId] + ".json";
                      var _atlas = "userInfo_3.0/zhuangBan/tools/" + this.HDDJ_tab[data.aliasId] + "/" + this.HDDJ_tab[data.aliasId] + ".atlas";
                      var projNode = createSpine(_json, _atlas);
                      projNode.setAnimation(0, 'animation', true);
                      projNode.setPosition(cc.p(img_daoju.width * 0.5, img_daoju.height * 0.4));
                      projNode.setScale(0.6);
                      projNode.setName("animation");
                      img_daoju.addChild(projNode, 9);
                } else {
                      var _icon = ccui.ImageView("userInfo_3.0/zhuangBan/tools/" + data.aliasId + ".png");
                      _icon.setPosition(cc.p(img_daoju.width / 2, img_daoju.height / 2));
                      _icon.setName("icon_daoju");
                      img_daoju.addChild(_icon);


                }
          } else if (data.propType == 6) {
              var img_daoju = img_bg;
              title.setString("大厅主题");
              //cc.log(" ==== this.DTCJ_tab[data.aliasId] ",this.DTCJ_tab[data.aliasId])
              if (this.DTCJ_tab[data.aliasId]) {
                  var _json = "home_3.0/role/spine/" + this.DTCJ_tab[data.aliasId] + ".json";
                  var _atlas = "home_3.0/role/spine/" + this.DTCJ_tab[data.aliasId] + ".atlas";
                  var projNode = createSpine(_json, _atlas);
                  projNode.setAnimation(0, 'animation', true);
                  projNode.setPosition(cc.p(img_daoju.width * 0.5, img_daoju.height * 0.2));
                  projNode.setScale(0.32);
                  projNode.setName("animation");
                  img_daoju.addChild(projNode, 9);
              }
          }
         



          return img_bg;

    },
    reqZhuangBanUnlock: function (type, propId) {
          var self = this;
          MjClient.block();

          var sendInfo = { propId: propId, exchangeType: type };
          MjClient.gamenet.request("pkplayer.handler.userDressCurrencyUnlock", sendInfo,
                function (rtn) {
                      MjClient.unblock();
                      if (!cc.sys.isObjectValid(self)) {
                            return;
                      }
                      cc.log("pkplayer.handler.userHappyCyMall", JSON.stringify(rtn));
                      if (rtn.code == 0) {
                            self.removeFromParent();
                      }
                      if (rtn.message) {
                            MjClient.showToast(rtn.message + "")
                      }


                });

    },

});

var storeLayer = storeLayer1;

//岳阳已经是新房卡模式 不要添加到这个判断了  加代码之前看看 整个 if 判断语句
if (MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ ){
    storeLayer = storeLayer2;
}
else if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
         MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
         MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
{
    storeLayer = storeLayer3;
}
else if (  MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
    MjClient.getAppType() === MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
    storeLayer = storeLayer4;
}
else if (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
    MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ ||
    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
    MjClient.getAppType() === MjClient.APP_TYPE.AYGUIZHOUMJ) {
    storeLayer = storeLayer5;
}

var enter_store = function (...arge) {
    var selectUiIndex = MjClient.isUseUIv3 && MjClient.isUseUIv3();
    if(selectUiIndex && MjClient.isFriendCardUseUIv3()){
        return new storeLayer_30(...arge);
    }
    return new storeLayer(...arge);
}

/*
    绑定邀请码，获取房卡
 */
var bindingCodeLayer = cc.Layer.extend({
    _textFeildName:null,
    ctor: function (historyBind,closeCallback) {
        this._super();
        var isUseUIv3 = MjClient.isUseUIv3 && MjClient.isUseUIv3();
        if(cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
            isUseUIv3 = false;
        }
        this.isUseUIv3 = isUseUIv3;
        if(isUseUIv3){
            var UI = ccs.load("StoreBindingLayer_3.0.json");
        }else{
            var UI = ccs.load("StoreBindingLayer.json");
        }
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        if(this.isUseUIv3){
            setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0], false);
        }else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) {
            setWgtLayout(_back, [0.75, 0.75], [0.5, 0.55], [0, -0.03]);
        }else if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
            setWgtLayout(_back,[0.7, 0.7], [0.5, 0.50], [0, 0]);
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            setWgtLayout(_back,[0.7, 0.7], [0.5, 0.5], [0, -0.03]);
        }
        else if (isJinZhongAPPType()) {
            setWgtLayout(_back,[0.7, 0.7], [0.5, 0.55], [0, -0.03]);
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            setWgtLayout(_back,[0.7, 0.7], [0.5, 0.50], [0, 0]);
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            setWgtLayout(_back,[0.55, 0.55], [0.5, 0.5], [0, 0]);
        }
        else {
            setWgtLayout(_back,[0.8, 0.8], [0.5, 0.5], [0, -0.03]);
        }

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
                if (closeCallback)
                    closeCallback();
            }
        }, this);
        
        //描述
        var _desc = _back.getChildByName("Text_1");
        //_desc.ignoreContentAdaptWithSize(true);
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            _desc.ignoreContentAdaptWithSize(false);  //衡阳自定义尺寸
        }
        _desc.setString("");
        if(MjClient.updateCfg)
        {
            if(!historyBind || historyBind <= 0)
            {
                _desc.setString(""+MjClient.systemConfig.yaoqinmaInfo);
            }
            else
            {
                _desc.setString(""+MjClient.systemConfig.yaoqinmaInfo2);
            }
        }

        if (isJinZhongAPPType() ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) 
        {
            _desc.visible = false;
            var str = ""+MjClient.systemConfig.yaoqinmaInfo;
            var str1 = str.split(",")[0];
            var str2 = str.split(",")[1];

            var res = /\d+/;         // 一个或多个数字

            var s_num = (res.exec(str1))[0];
            var str3 = str1.replace(res, ",");

            var s1 = str3.split(",")[0];
            var s2 = str3.split(",")[1];

            var weixin_tip = str2.split(":")[0] + ": ";
            var weixin_str = str2.split(":")[1];

            if (str1 && str2 && s_num && str3 && s1 && s2) {
                // 富文本描述1
                var richText1 = new ccui.RichText();
                richText1.ignoreContentAdaptWithSize(false);
                richText1.setAnchorPoint(0,0);
                richText1.width = 500;
                richText1.height = 30;

                //不同颜色文本
                var re1 = new ccui.RichElementText(1, cc.color(66,94,112), 255, s1, "fonts/lanting.TTF", 26);
                var re2 = new ccui.RichElementText(2, cc.color(208,88,60), 255, s_num, "fonts/lanting.TTF", 26);
                var re3 = new ccui.RichElementText(3, cc.color(66,94,112), 255, s2, "fonts/lanting.TTF", 26);
                richText1.pushBackElement(re1);
                // richText1.insertElement(re2, 1);
                richText1.pushBackElement(re2);
                richText1.pushBackElement(re3);
                richText1.x = 170;
                richText1.y = 240;
                if(MjClient.getAppType() === MjClient.APP_TYPE.DQSHANXIMJ) richText1.y = 340;
                _back.addChild(richText1);

                // 富文本描述2
                var richText2 = new ccui.RichText();
                richText2.ignoreContentAdaptWithSize(false);
                richText2.setAnchorPoint(0,0);
                richText2.width = 500;
                richText2.height = 30;
                //不同颜色文本
                var re4 = new ccui.RichElementText(4, cc.color(66,94,112), 255, weixin_tip, "fonts/lanting.TTF", 26);
                var re5 = new ccui.RichElementText(5, cc.color(208,88,60), 255, weixin_str, "fonts/lanting.TTF", 26);
                richText2.pushBackElement(re4);
                richText2.pushBackElement(re5);
                richText2.x = 170;
                richText2.y = 210;
                if(MjClient.getAppType() === MjClient.APP_TYPE.DQSHANXIMJ) richText2.y = 310;
                _back.addChild(richText2);
            }
            else {
                _desc.visible = true;
            }
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) 
        {
            _desc.visible = false;
            var str = ""+MjClient.systemConfig.yaoqinmaInfo;
            var str1 = str.split(",")[0];
            var str2 = str.split(",")[1];
            var s1 = str2 ? (str2.split(":")[0] + ": ") : "";
            var s2 = str2 ? str2.split(":")[1] : "";
            if (str1 && str2 && s1 && s2) {
                // 富文本描述1
                var richText1 = new ccui.RichText();
                richText1.ignoreContentAdaptWithSize(false);
                richText1.setAnchorPoint(0,0);
                richText1.width = (this.isUseUIv3) ? _desc.width :500;
                richText1.height = 30;

                var color1=  (this.isUseUIv3) ? "#738875" : "#443333";
                var color2=  (this.isUseUIv3) ? "#ff6f20" : "#DE1D1D";
                var fontSize = (this.isUseUIv3) ? 30 : 24;
                //不同颜色文本
                var re1 = new ccui.RichElementText(1, cc.color(color1), 255, str1, "fonts/lanting.TTF", fontSize);
                richText1.pushBackElement(re1);
                richText1.x = 175;
                richText1.y = 210;
                if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                    richText1.x = 230;
                    richText1.y = 260;
                }
                else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
                    richText1.x = 200;
                    richText1.y = 240;
                }
                if(this.isUseUIv3){
                    richText1.x = _desc.x;
                    richText1.y = _desc.y - fontSize/2;
                }
                _back.addChild(richText1);

                // 富文本描述2
                var richText2 = new ccui.RichText();
                richText2.ignoreContentAdaptWithSize(false);
                richText2.setAnchorPoint(0,0);
                richText2.width = (this.isUseUIv3) ? _desc.width :500;
                richText2.height = 30;
                //不同颜色文本
                var re2 = new ccui.RichElementText(1, cc.color(color1), 255, s1, "fonts/lanting.TTF", fontSize);
                var re3 = new ccui.RichElementText(2, cc.color(color2), 255, s2, "fonts/lanting.TTF", fontSize);
                richText2.pushBackElement(re2);
                richText2.pushBackElement(re3);
                richText2.x = 150;
                richText2.y = 170;
                if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                    richText2.x = 190;
                    richText2.y = 220;
                }
                else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
                    richText2.x = 120;
                    richText2.y = 200;
                }
                if(this.isUseUIv3){
                    richText2.x = _desc.x;
                    richText2.y = _desc.y - fontSize - 2  - fontSize/2;
                }
                _back.addChild(richText2);
            }
            else {
                _desc.visible = true;
            }
        }

        var _Image_2 = _back.getChildByName("Image_2");
        if(_Image_2){
            var starParticle1 =  new cc.ParticleSystem("game_picture/diamondStar.plist");
            starParticle1.setPosition(_Image_2.getContentSize().width/2, _Image_2.getContentSize().height/2);
            _Image_2.addChild(starParticle1);
        }

        var _TextBg = _back.getChildByName("xiaotanchuan_51");
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ || 
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
            this._textFeildName = new cc.EditBox(cc.size(420,60), new cc.Scale9Sprite("store/into_number.png"));
            this._textFeildName.setFontColor(cc.color(159,106,54));
            this._textFeildName.setPlaceholderFontSize(26);
            this._textFeildName.setPlaceholderFontColor(cc.color(159,106,54));
        }
        else if (isJinZhongAPPType()) {
            this._textFeildName = new cc.EditBox(cc.size(_TextBg.width, _TextBg.height), new cc.Scale9Sprite("store/into_number.png"));
            this._textFeildName.setPlaceholderFontName(MjClient.fzcyfont);
            this._textFeildName.setFontName(MjClient.fzcyfont);
            this._textFeildName.setPlaceholderFontSize(30);
            this._textFeildName.setFontSize(50);
            this._textFeildName.setFontColor(cc.color(208,88,60));
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            if(this.isUseUIv3){
                this._textFeildName = new cc.EditBox(_TextBg.getContentSize(), new cc.Scale9Sprite());
                this._textFeildName.setPlaceholderFontSize(26);
                this._textFeildName.setFontColor(cc.color("#b6b6b5"));
                this._textFeildName.setPlaceholderFontColor(cc.color("#b6b6b5"));
                this._textFeildName.setFontSize(26);
            }else{
                this._textFeildName = new cc.EditBox(cc.size(300,45), new cc.Scale9Sprite("store/into_number.png"));
                this._textFeildName.setPlaceholderFontSize(24);
                this._textFeildName.setFontColor(cc.color("#DE1D1D"));
                this._textFeildName.setPlaceholderFontColor(cc.color("#443333"));
                this._textFeildName.setFontSize(30);
            }
            
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            this._textFeildName = new cc.EditBox(cc.size(310,60), new cc.Scale9Sprite("store/into_number.png"));
            this._textFeildName.setPlaceholderFontSize(24);
            this._textFeildName.setFontColor(cc.color("#DE1D1D"));
            this._textFeildName.setPlaceholderFontColor(cc.color("#443333"));
            this._textFeildName.setFontSize(30);
        }
        else {
            this._textFeildName = new cc.EditBox(cc.size(274,53), new cc.Scale9Sprite("store/into_number.png"));
            this._textFeildName.setFontColor(cc.color(0,0,0));
        }
        if(isYongZhouProject()){
            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                this._textFeildName = new cc.EditBox(cc.size(_TextBg.width,_TextBg.height), new cc.Scale9Sprite("ui/store/shuru.png"));
            }
            else {
                this._textFeildName = new cc.EditBox(cc.size(_TextBg.width,_TextBg.height), new cc.Scale9Sprite("store/into_number.png"));
            }
            this._textFeildName.setFontColor(cc.color(0,0,0));
        }
        this._textFeildName.setMaxLength(8);
        this._textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._textFeildName.setPlaceHolder("请输入邀请码...");
        this._textFeildName.setPosition(_TextBg.getContentSize().width/2, _TextBg.getContentSize().height/2);
        _TextBg.addChild(this._textFeildName);

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
            this._textFeildName.setContentSize(300, 45);
            this._textFeildName.setPlaceholderFontSize(24);
            this._textFeildName.setFontColor(cc.color("#DE1D1D"));
            this._textFeildName.setPlaceholderFontColor(cc.color("#443333"));
            this._textFeildName.setFontSize(30);
        }

        /*
         绑定
         */
        var _Btn_binding = _back.getChildByName("Btn_binding");
        if(_Btn_binding.getChildByName("Text")){
            _Btn_binding.getChildByName("Text").ignoreContentAdaptWithSize(true);
        }
        _Btn_binding.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var key = "Zhujiemian_Shop_Gold_Bindingsure";
                if (isYongZhouProject()) {
                    key = "Shangcheng_Bangdingdanniu";
                }
                MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                var _str = that._textFeildName.getString();
                if(_str.length == 0 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的邀请码");
                    return;
                }

                MjClient.block();
                MjClient.gamenet.request("pkcon.handler.getMemberInfo", {memberId:Number(_str)}, function(rtn)
                {
                    if(rtn.code==0)
                    {
                        var layer = new bindingCodeLayer_tips(rtn.data,function()
                        {
                            that.binding(Number(_str));
                        });
                        UI.node.addChild(layer);
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);
    },
    binding:function(ID)
    {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.setUserMember",{memberId:ID},
            function(rtn)
            {
                if(rtn.code == 0)
                {
                    that.removeFromParent();
                    postEvent("bangdingyouliVisibleFalse",{});
                }

                if(rtn.message)
                {
                    MjClient.showToast(rtn.message);
                }
                MjClient.unblock();
            }
        );
    }
});


/*
    
 */
var BindingCodeLayer2 = cc.Layer.extend({
    _textFeildName:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("BindingCodeLayer.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        // 晋中/岳阳换皮
        if (isJinZhongAPPType() ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) 
        {
            setWgtLayout(_back, [0.75, 0.75], [0.5, 0.55], [0, -0.03]);
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            setWgtLayout(_back, [0.7, 0.7], [0.5, 0.5], [0, 0]);
        }
        else {
            setWgtLayout(_back, [0.8, 0.8], [0.5, 0.5], [0, -0.03]);
        }

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Daili_Close", {uid:SelfUid()});
                that.removeFromParent();
            }
        }, this);

        //描述
        var _gzh_text = _back.getChildByName("box").getChildByName("gzh_text");
        var _boardMsg = ""+MjClient.systemConfig.gongzhonghao;
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
        {
            _boardMsg = ""+MjClient.systemConfig.dailiZixun;
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
        {
            _boardMsg = ""+MjClient.systemConfig.shenqingdaili;
        }
        else if (isJinZhongAPPType())
        {
            _boardMsg = ""+MjClient.systemConfig.majiangqun;
        }

        _gzh_text.setString(_boardMsg);
        _gzh_text.ignoreContentAdaptWithSize(true);

        var _btnCopy = _back.getChildByName("Btn_copy");
        var _copyCb = function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var _boardMsg = ""+MjClient.systemConfig.gongzhonghao;
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ)
                    {
                        _boardMsg = ""+MjClient.systemConfig.dailiZixun;
                    }
                    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
                    {
                        _boardMsg = ""+MjClient.systemConfig.shenqingdaili;
                    }
                    MjClient.native.doCopyToPasteBoard(_boardMsg);
                    MjClient.showToast("复制成功，打开微信查找添加");
                    MjClient.native.openWeixin();
                    var key = "Zhujiemian_Daili_Fuzhi";
                    if(isYongZhouProject()){
                        key = "Daili_Fuzhi";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                    break;
                default :
                    break;
            }
        };
        _btnCopy.addTouchEventListener(_copyCb, this);
    }
});

var BindingCodeLayer3 = cc.Layer.extend({
    _textFeildName:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("BindingCodeNewLayer.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.8, 0.8], [0.5, 0.5], [0, 0]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        }, this);

        //描述
        // var Text_weixin = _back.getChildByName("Text_weixin");
        // var _boardMsg = ""+MjClient.systemConfig.dailiZixun;
        // Text_weixin.setString("请添加官方微信号成为代理：" + _boardMsg);
        // Text_weixin.ignoreContentAdaptWithSize(true);

        // var _btnCopy = _back.getChildByName("Btn_copy");
        // var _copyCb = function (sender, Type) {
        //     switch (Type) {
        //         case ccui.Widget.TOUCH_ENDED:
        //             var _boardMsg = ""+MjClient.systemConfig.dailiZixun;
        //             MjClient.native.doCopyToPasteBoard(_boardMsg);
        //             MjClient.showToast("复制成功，打开微信查找添加");
        //             MjClient.native.openWeixin();
        //             var key = "Zhujiemian_Daili_Fuzhi";
        //             if(isYongZhouProject()){
        //                 key = "Daili_Fuzhi";
        //             }
        //             MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
        //             break;
        //         default :
        //             break;
        //     }
        // };
        // _btnCopy.addTouchEventListener(_copyCb, this);

        var input1 = _back.getChildByName("input1");
        this._bindWeiXin = new cc.EditBox(cc.size(input1.width,input1.height), new cc.Scale9Sprite("agency/btn_touming.png"));

        this._bindWeiXin.setFontColor(cc.color("#771600"));
        this._bindWeiXin.setPlaceholderFontSize(24);
        this._bindWeiXin.setFontSize(24);
        this._bindWeiXin.setPlaceholderFontColor(cc.color("#ffecbe"));
        this._bindWeiXin.setMaxLength(20);
        this._bindWeiXin.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this._bindWeiXin.setPlaceHolder("请输入手机号或微信号，稍后我们会联系您...");
        this._bindWeiXin.setPosition(input1.getContentSize().width/2, input1.getContentSize().height/2);
        input1.addChild(this._bindWeiXin);

        this._btn_commit = _back.getChildByName("btn_commit");
        this._btn_commit.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(that._bindWeiXin.getString().length <= 0){
                    MjClient.showToast("请输入正确的手机号或微信号");
                    return;
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.addSuggest",{content:that._bindWeiXin.getString(), key:1},function(rtn){
                    cc.log("wxd pkplayer.handler.addSuggest :"+JSON.stringify(rtn));
                    MjClient.unblock();
                    if(rtn.code == 0) {
                        MjClient.showToast("提交成功");
                        that._btn_commit.setTouchEnabled(false);
                        that._btn_commit.setBright(false);
                        if(!(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&
                            !MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP) {
                            MjClient.Scene.addChild(new BindingCodeEnterLayer());
                        }else{
                            MjClient.block();
                            MjClient.gamenet.request("pkplayer.handler.addMember",{}, function(rtn) {
                                MjClient.unblock();
                                if(rtn.code == 0) {
                                    MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 1 }, function (rtn) {
                                        if (rtn.code == 0) {
                                            // MjClient.native.OpenUrl(rtn.data);
                                            var layer = new DaiLiWebviewLayer(rtn.data);
                                            if (layer.isInitSuccess())
                                                MjClient.Scene.addChild(layer);
                                            self.removeFromParent();
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
                                if(rtn.message)
                                {
                                    MjClient.showToast(rtn.message);
                                }
                            });
                        }
                    }else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        }, this);

        // this._btn_conect = _back.getChildByName("btn_conect");
        // this._btn_conect.addTouchEventListener(function (sender, type) {
        //     if (type == 2) {
        //         if (!isCurrentNativeVersionBiggerThan("14.0.0"))
        //         {
        //             MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 9 }, function (rtn) {
        //                 if (rtn.code == 0) {
        //                     MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
        //                 }
        //                 else {
        //                     if (rtn.message) {
        //                         MjClient.showToast(rtn.message);
        //                     }
        //                     else {
        //                         MjClient.showToast("获取数据失败");
        //                     }
        //                 }
        //             });
        //         }
        //         else
        //         {
        //             MjClient.native.showQiYuChatDialog();
        //         }
        //     }
        // }, this);

        this.isTijiao();
    },

    isTijiao:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.suggestJudge",{},function(rtn){
            cc.log("wxd pkplayer.handler.suggestJudge :"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                if(rtn.data) {
                    self._btn_commit.setTouchEnabled(false);
                    self._btn_commit.setBright(false);
                    // self._bindWeiXin.setString(rtn.data);
                    // self._bindWeiXin.setTouchEnabled(false);
                }
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    }
});

var BindingCodeLayer3_30 = cc.Layer.extend({
    _textFeildName:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("BindingCodeNewLayer_3.0.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.9, 0.9], [0.5, 0.5], [0, 0]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        }, this);

        //灯泡
        for(var i = 0; i < 5; i++) {
            var deng = _back.getChildByName("deng_"+i);
            deng.runAction(cc.repeatForever(cc.sequence(
                cc.delayTime(0.1*i),
                cc.fadeTo(0.5,150),
                cc.delayTime(0.2),
                cc.fadeTo(0.3,255)
            )))
        }

        for(var i = 0; i < 4; i++) {
            var xdeng = _back.getChildByName("xdeng_"+i);
            xdeng.runAction(cc.repeatForever(cc.sequence(
                cc.delayTime(0.1*i),
                cc.fadeTo(0.5,150),
                cc.delayTime(0.2),
                cc.fadeTo(0.3,255)
            )))
        }

        var input1 = _back.getChildByName("input1");
        this._bindWeiXin = new cc.EditBox(cc.size(input1.width,input1.height), new cc.Scale9Sprite("agency/btn_touming.png"));

        this._bindWeiXin.setFontColor(cc.color("#771600"));
        this._bindWeiXin.setPlaceholderFontSize(20);
        this._bindWeiXin.setFontSize(20);
        this._bindWeiXin.setPlaceholderFontColor(cc.color("#a3a39f"));
        this._bindWeiXin.setMaxLength(20);
        this._bindWeiXin.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this._bindWeiXin.setPlaceHolder("请输入手机号或微信号，稍后我们会联系您...");
        this._bindWeiXin.setPosition(input1.getContentSize().width/2, input1.getContentSize().height/2);
        input1.addChild(this._bindWeiXin);

        this._btn_commit = _back.getChildByName("btn_commit");
        this._btn_commit.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(that._bindWeiXin.getString().length <= 0){
                    MjClient.showToast("请输入正确的手机号或微信号");
                    return;
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.addSuggest",{content:that._bindWeiXin.getString(), key:1},function(rtn){
                    cc.log("wxd pkplayer.handler.addSuggest :"+JSON.stringify(rtn));
                    MjClient.unblock();
                    if(rtn.code == 0) {
                        MjClient.showToast("提交成功");
                        that._btn_commit.setTouchEnabled(false);
                        that._btn_commit.setBright(false);
                        if(!(MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0) &&
                            !MjClient.remoteCfg.guestLogin && MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP) {
                            MjClient.Scene.addChild(new BindingCodeEnterLayer());
                        }else{
                            MjClient.block();
                            MjClient.gamenet.request("pkplayer.handler.addMember",{}, function(rtn) {
                                MjClient.unblock();
                                if(rtn.code == 0) {
                                    MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 1 }, function (rtn) {
                                        if (rtn.code == 0) {
                                            // MjClient.native.OpenUrl(rtn.data);
                                            var layer = new DaiLiWebviewLayer(rtn.data);
                                            if (layer.isInitSuccess())
                                                MjClient.Scene.addChild(layer);
                                            self.removeFromParent();
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
                                if(rtn.message)
                                {
                                    MjClient.showToast(rtn.message);
                                }
                            });
                        }
                    }else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        }, this);

        this.isTijiao();
    },

    isTijiao:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.suggestJudge",{},function(rtn){
            cc.log("wxd pkplayer.handler.suggestJudge :"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                if(rtn.data) {
                    self._btn_commit.setTouchEnabled(false);
                    self._btn_commit.setBright(false);
                }
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    }
});

/*
 绑定邀请码，二级确认弹窗
 */
var bindingCodeLayer_tips = cc.Layer.extend({
    _textFeildName:null,
    ctor: function (data,comfirmCallback) {
        this._super();
        var UI = ccs.load("bindingCodeLayer_tipss.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            setWgtLayout(_back,[0.65, 0.65], [0.5, 0.5], [0, -0.03]);
        }
        else {
            setWgtLayout(_back,[0.8, 0.8], [0.5, 0.5], [0, -0.03]);
        }



        var _name = _back.getChildByName("name");
        _name.ignoreContentAdaptWithSize(true);
        if(data.nickname)
        {
            var _nameStr = unescape(data.nickname);
            _name.setString(getNewName(_nameStr,11));
        }


        var _ID = _back.getChildByName("ID");
        _ID.ignoreContentAdaptWithSize(true);
        if(data.gameId)
        {
            _ID.setString("ID: " + data.gameId);
        }

        var _yaoqingma = _back.getChildByName("yaoqingma");
        _yaoqingma.ignoreContentAdaptWithSize(true);
        if(data.memberId)
        {
            _yaoqingma.setString("邀请码: " + data.memberId);
        }

        var _beizhu = _back.getChildByName("beizhu");
        _beizhu.ignoreContentAdaptWithSize(true);
        if(data.remark)
        {
            var _remark =  unescape(data.remark);
            _beizhu.setString("备注:" + _remark);
        }
        else
        {
            _beizhu.visible = false;
        }

        var _headImg = _back.getChildByName("headImg");
        var _headImgContentSize = _headImg.getContentSize();

        //显示头像
        var url = data.avatar;
        if(!url) url="png/default_headpic.png";
        cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
        {
            if(!err&&texture&&cc.sys.isObjectValid(_headImg))
            {
                if(isJinZhongAPPType() ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) 
                {
                    var clippingNode = new cc.ClippingNode();
                    var mask = new cc.Sprite("home/zhezhao.png");
                    clippingNode.setAlphaThreshold(0);
                    clippingNode.setStencil(mask);
                    var img = new cc.Sprite(texture);
                    img.setScale(mask.getContentSize().width / img.getContentSize().width);
                    clippingNode.addChild(img);
                    if(isJinZhongAPPType()){
                        clippingNode.setScale(0.98);
                        clippingNode.setPosition(_headImg.getContentSize().width / 2, _headImg.getContentSize().height / 2);
                    }else{
                        clippingNode.setPosition(_headImg.getContentSize().width / 2 + 16, _headImg.getContentSize().height / 2);
                    }

                    //遮罩框
                    var hideblock = new cc.Sprite("home/homeHeadCusPic.png");
                    if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                        clippingNode.setScale(1.42);
                        clippingNode.setPosition(_headImg.getContentSize().width/2,_headImg.getContentSize().height/2 - 8);
                        hideblock.setTexture("ui/userInfo/touxiangk_01.png");
                    }
                    hideblock.setPosition(hideblock.getContentSize().width / 2, hideblock.getContentSize().height / 2);
                    _headImg.addChild(clippingNode);
                    _headImg.addChild(hideblock);
                }
                else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                    var clippingNode = new cc.ClippingNode();
                    var mask = new cc.Sprite("home/zhezhao.png");
                    clippingNode.setAlphaThreshold(0);
                    clippingNode.setStencil(mask);
                    var img = new cc.Sprite(texture);
                    img.setScale(mask.getContentSize().width / img.getContentSize().width);
                    clippingNode.addChild(img);
                    clippingNode.setPosition(_headImg.getContentSize().width / 2, _headImg.getContentSize().height / 2);
                    //遮罩框
                    var hideblock = new cc.Sprite("home/homeHeadCusPic.png");
                    hideblock.setPosition(hideblock.getContentSize().width / 2, hideblock.getContentSize().height / 2);
                    _headImg.addChild(clippingNode);
                    _headImg.addChild(hideblock);
                }
                else {
                    var headSprite = new cc.Sprite(texture);
                    headSprite.setPosition(_headImgContentSize.width/2, _headImgContentSize.height/2);
                    headSprite.setScale((_headImgContentSize.width-8)/headSprite.getContentSize().width);
                    _headImg.addChild(headSprite);
                }
            }
        });



        var _Button_sure = _back.getChildByName("Button_sure");
        _Button_sure.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (comfirmCallback)
                    comfirmCallback();
                that.removeFromParent();
            }
        },this);

        var _Button_cancel = _back.getChildByName("Button_cancel");
        _Button_cancel.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        }, this);

        var tempX = _Button_sure.x;
        var tempY = _Button_sure.y;
        _Button_sure.x = _Button_cancel.x;
        _Button_sure.y = _Button_cancel.y;
        _Button_cancel.x = tempX;
        _Button_cancel.y = tempY;
    },

});


/*
 自动绑定邀请码，二级确认弹窗
 */
var autoBindingCodeLayer_tips = cc.Layer.extend({
    _closeCallback:null,
    _bindingCode:0,
    ctor: function (bindingCode) {
        this._super();
        var UI = ccs.load("bindingCodeLayer_tipss.json");
        this.addChild(UI.node);
        var that = this;
        this._bindingCode = bindingCode;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.8, 0.8], [0.5, 0.5], [0, -0.03]);




        this._name = _back.getChildByName("name");
        this._name.ignoreContentAdaptWithSize(true);
        this._name.setString("");


        this._ID = _back.getChildByName("ID");
        this._ID.ignoreContentAdaptWithSize(true);


        this._yaoqingma = _back.getChildByName("yaoqingma");
        this._yaoqingma.ignoreContentAdaptWithSize(true);


        this._beizhu = _back.getChildByName("beizhu");
        this._beizhu.ignoreContentAdaptWithSize(true);


        this._headImg = _back.getChildByName("headImg");




        var _Button_sure = _back.getChildByName("Button_sure");
        _Button_sure.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.setUserMember",{memberId:bindingCode},
                    function(rtn)
                    {
                        if(rtn.code == 0)
                        {
                            that.removeFromParent();
                            if (MjClient.bingdingbtn) 
                            {
                                MjClient.bingdingbtn.removeFromParent();
                            }
                            if (that._closeCallback)
                                that._closeCallback();
                        }
                        else
                        {
                            if(rtn.message)
                            {
                                MjClient.showToast(rtn.message);
                            }
                        }

                        MjClient.unblock();
                    }
                );
            }
        },this);

        var _Button_cancel = _back.getChildByName("Button_cancel");
        _Button_cancel.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
                if (that._closeCallback)
                    that._closeCallback();
            }
        }, this);
    },
    onEnter:function()
    {
        this._super();
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkcon.handler.getMemberInfo", {memberId:this._bindingCode}, function(rtn)
        {
            if(rtn.code==0)
            {
                var data = rtn.data;
                if(data.nickname)
                {
                    var _nameStr = unescape(data.nickname);
                    that._name.setString(getNewName(_nameStr,11));
                }


                if(data.gameId)
                {
                    that._ID.setString("ID:" + data.gameId);
                }

                if(data.memberId)
                {
                    that._yaoqingma.setString("邀请码:" + data.memberId);
                }

                if(data.remark)
                {
                    var _remark =  unescape(data.remark);
                    that._beizhu.setString("备注:" + _remark);
                }else{
                    that._beizhu.visible = false;
                }

                //显示头像
                var url = data.avatar;
                if(!url) url="png/default_headpic.png";
                cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
                {
                    if(!err&&texture&&cc.sys.isObjectValid(that._headImg))
                    {
                        var headSprite = new cc.Sprite(texture);
                        headSprite.setPosition(that._headImg.getContentSize().width/2, that._headImg.getContentSize().height/2);
                        headSprite.setScale((that._headImg.getContentSize().width-8)/headSprite.getContentSize().width);
                        that._headImg.addChild(headSprite);
                    }
                });
            }
            else
            {
                var text = "获取邀请码对应用户失败";
                if (!cc.isUndefined(rtn.message)) text = rtn.message;
                MjClient.showMsg(text, function(){
                    that.removeFromParent();
                    if (that._closeCallback)
                        that._closeCallback();
                });
            }
            MjClient.unblock();
        });
    },
    setCloseCallback:function(callback)
    {
        this._closeCallback = callback;
    }

});

/*
绑定邀请码输入界面
 */
var BindingCodeEnterLayer = cc.Layer.extend({
    _entercode:[],
    ctor: function () {
        this._super();
        this._isUseUIv3 = MjClient.isUseUIv3 && MjClient.isUseUIv3();
        if(this._isUseUIv3){
            var UI = ccs.load("BindingCodeEnterLayer_3.0.json");
        }
        else {
            var UI = ccs.load("BindingCodeEnterLayer.json");
        }

        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0],false);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self.removeFromParent();
            }
        }, this);

        //数字按键
        var _num = _back.getChildByName("num");
        function numBtnTouchEvent(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var itag = sender.getTag();
                self.inputRoomNumber(itag);
            }
        }
        for (var i = 0; i <= 9; i++) {
            var _btnNum = _num.getChildByName("Button_" + i);
            _btnNum.setTag(i);
            _btnNum.addTouchEventListener(numBtnTouchEvent, this);
        }

        //清除所有
        var _clear =  _num.getChildByName("clear");
        _clear.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    self.inputRoomNumber(-2);
                    break;
                default :
                    break;
            }
        }, this);

        //删除
        var _del =  _num.getChildByName("del");
        _del.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    self.inputRoomNumber(-1);;
                    break;
                default :
                    break;
            }
        }, this);

        //this.isTijiao();
    },

    isTijiao:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.suggestJudge",{},function(rtn){
            cc.log("wxd pkplayer.handler.suggestJudge :"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                if(rtn.data) {
                    self._btn_commit.setTouchEnabled(false);
                    self._btn_commit.setBright(false);
                    // self._bindWeiXin.setString(rtn.data);
                    // self._bindWeiXin.setTouchEnabled(false);
                }
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    inputRoomNumber:function(n) {
        var self = this;
        var change=true;
        if(n>=0&&this._entercode.length<6)       this._entercode.push(n);
        else if(n==-1&&this._entercode.length>0) this._entercode.length=this._entercode.length-1;
        else if(n==-2&&this._entercode.length>0) this._entercode.length=0;
        else change=false;
        if(change) {
            for(var i = 0; i < 6; i++){
                var text = this._back.getChildByName("Text_num_"+i);
                if(i < this._entercode.length){
                    text.setString(this._entercode[i]);
                }else {
                    text.setString("    ");
                }
            }
            if(this._entercode.length==6)
            {
                var entercode=this._entercode;
                var tableid=0;
                for(var i=0;i<entercode.length;i++)
                {
                    tableid=tableid*10+entercode[i];
                }

                if(tableid.length == 0 || parseInt(tableid) == 0)
                {
                    MjClient.showToast("请输入正确的邀请码");
                    return;
                }

                MjClient.block();
                MjClient.gamenet.request("pkcon.handler.getMemberInfo", {memberId:Number(tableid)}, function(rtn)
                {
                    if(rtn.code==0)
                    {
                        var layer = new bindingCodeLayer_tips(rtn.data,function()
                        {
                            self.binding(Number(tableid), rtn.data.remoteIP);
                        });
                        self.addChild(layer);
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        }
    },

    binding:function(ID, remoteIP)
    {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.setUserMember",{memberId:ID, remoteIP:remoteIP},
            function(rtn)
            {
                MjClient.unblock();
                if(rtn.code == 0) {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.addMember",{}, function(rtn) {
                        MjClient.unblock();
                        if(rtn.code == 0) {
                            MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 1 }, function (rtn) {
                                if (rtn.code == 0) {
                                    // MjClient.native.OpenUrl(rtn.data);
                                    var layer = new DaiLiWebviewLayer(rtn.data);
                                    if (layer.isInitSuccess())
                                        MjClient.Scene.addChild(layer);
                                    self.removeFromParent();
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
                        if(rtn.message)
                        {
                            MjClient.showToast(rtn.message);
                        }
                    });
                }
                if(rtn.message)
                {
                    MjClient.showToast(rtn.message);
                }
            }
        );
    }
});


var StoreTipDialog = cc.Layer.extend({
    _payNode1:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("StoreTip.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.7, 0.7], [0.5, 0.5], [0, 0]);
        
        var _weixin = _back.getChildByName("weixin");
        _weixin.ignoreContentAdaptWithSize(true);

        _weixin.setString(""+MjClient.systemConfig.dailiZixun);

        var _copy_btn = _back.getChildByName("copy_btn");
        _copy_btn.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.log("" + _weixin.getString());
                    MjClient.native.doCopyToPasteBoard(_weixin.getString());
                    MjClient.showToast("复制成功，打开微信查找添加");
                    MjClient.native.openWeixin();
                    MjClient.native.umengEvent4CountWithProperty("ShangchengCopyClick", {uid:SelfUid()});
                    break;
                default :
                    break;
            }
        }, this);  

        var _close_btn = _back.getChildByName("close");
        _close_btn.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent();
                    break;
                default :
                    break;
            }
        }, this);       
    }
});