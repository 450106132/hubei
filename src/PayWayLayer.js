/**
 * Created by sking on 2017/6/2.
 */



var payWayLayer = cc.Layer.extend({
    ctor: function (cb, sourceName, isBaoXiang, rechargeName) {
        this._super();
        var UI = ccs.load("PayWayLayer.json");
        this.addChild(UI.node);
        var that = this;
        MjClient.payWayLayerui = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var that = this;
        MjClient.payWayLayerui = this;
        //_block.addTouchEventListener(function (sender, type) {
        //    if (type == 2) {
        //        that.removeFromParent();
        //    }
        //}, this);

        var _back = UI.node.getChildByName("back");
        if(isYongZhouProject()){
            setWgtLayout(_back,[0.8, 0.8], [0.5, 0.5], [0, -0.04]);
        }else{
            setWgtLayout(_back,[0.7, 0.7], [0.5, 0.5], [0, -0.04]);
        }

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (sourceName == "coin")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Coin_Buy_Close", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Buy_Close", {uid:SelfUid()});
                    
                that.removeFromParent();
            }
        }, this);



        function payFunction(sender,type)
        {
            if(type === 2)
            {
                var tag = sender.getTag();//平台
                cc.log("=========current touch " + tag);
                if (sourceName == "coin") {
                    if (tag == PayPlatformType.WEIXIN)
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Coin_Buy_Choosechannel_Wechat", {uid:SelfUid()});
                    else if (tag == PayPlatformType.ALIPAY)
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Coin_Buy_Choosechannel_Alipay", {uid:SelfUid()});
                }
                else {
                    if (tag == PayPlatformType.WEIXIN)
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Buy_Choosechannel_Wechat", {uid:SelfUid()});
                    else if (tag == PayPlatformType.ALIPAY)
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shop_Gold_Buy_Choosechannel_Alipay", {uid:SelfUid()});
                }
               
                if(cb)
                {
                    cb(tag);
                }
                that.removeFromParent();
            }
        }

        var btnLenth  =  MjClient.systemConfig.recharge.length;

        var _btnPay0 = _back.getChildByName("Btn_play0");
        _btnPay0.visible = false;
        var _btnPay1 = _back.getChildByName("Btn_play1");
        _btnPay1.visible = false;
        var _btnPay2 = _back.getChildByName("Btn_play2");
        _btnPay2.visible = false;

        var haveWeixinGhz = false;
        for(var i = 0 ;i < btnLenth;i++)
        {
            if (parseInt(MjClient.systemConfig.recharge[i].platform) == PayPlatformType.WEIXIN_GZH || 
                parseInt(MjClient.systemConfig.recharge[i].platform) == PayPlatformType.WEIXIN_GZH_XY) {
                haveWeixinGhz = true;
                break;
            }
        }       

        for(var i = 0 ;i < btnLenth;i++)
        {
            var _btnPay = _back.getChildByName("Btn_play" + i);
            var platform = parseInt(MjClient.systemConfig.recharge[i].platform);
            var _iconPath =  "store/pay-Other.png";
            switch (platform)
            {
                case PayPlatformType.WEIXIN:
                case PayPlatformType.WEIXIN_GZH_XY:
                case PayPlatformType.WEIXIN_GZH:
                case PayPlatformType.WEIXIN_WEB:
                    _iconPath =  "store/pay-WeiXin.png";
                    if (platform == PayPlatformType.WEIXIN_GZH || platform == PayPlatformType.WEIXIN_GZH_XY) {
                        _btnPay.y += 30;
                        var discountText = ccui.Text("1.分享支付链接到微信\n2.点击支付链接发起充值", "fonts/lanting.TTF", 24);
                        var _textY = _btnPay.getChildByName("Text_1").y;
                        discountText.setPosition(cc.p(_btnPay.width / 2, _textY - 60));
                        discountText.setTextColor(cc.color("#FF0000"))
                        _btnPay.addChild(discountText);

                        var pinfo = MjClient.data.pinfo;
                        if (!pinfo.openid || pinfo.openid.indexOf("openid") != -1) {
                           that. showBindWeixin(_btnPay, discountText);
                        }
                    }
                    break;
                case PayPlatformType.ALIPAY:
                case PayPlatformType.ALIPAY_WEB:
                case PayPlatformType.ALIPAY_WEB_XY:
                    _iconPath =  "store/pay-Zhifubao.png";
                    if(haveWeixinGhz) {
                        _btnPay.y += 30;
                        var discountText = ccui.Text("点击跳转到支付宝支付", "fonts/lanting.TTF", 24);
                        var _textY = _btnPay.getChildByName("Text_1").y;
                        discountText.setPosition(cc.p(_btnPay.width / 2, _textY - 60));
                        discountText.setTextColor(cc.color("#FF0000"))
                        _btnPay.addChild(discountText);
                    }
                    break;
                case PayPlatformType.APPLE:
                    _iconPath =  "store/pay-PG.png";
                    break;
                default:
                    break;
            }
            _btnPay.loadTextureNormal(_iconPath);
            _btnPay.visible = true;
            _btnPay.addTouchEventListener(payFunction,this);
            _btnPay.setTag(platform);


            var _text = _btnPay.getChildByName("Text_1");
            _text.setPositionX(_btnPay.getContentSize().width/2);
            _text.setString(MjClient.systemConfig.recharge[i].title + "");
            _text.ignoreContentAdaptWithSize(true);

            var bgContent = _back.getContentSize().width;
            _btnPay.setPositionX((i + 1)*bgContent/(btnLenth + 1));
            if(i == 0)
            {
                _btnPay.setPositionX(_btnPay.getPositionX() - 35);
            }
            else if(i == (btnLenth - 1))
            {
                _btnPay.setPositionX(_btnPay.getPositionX() + 35);
            }
        }

    },
    showBindWeixin: function(_btnPay, discountText) {
        discountText.setString("绑定微信，订单异常可追溯");
        discountText.y += 25;

        if (jsb.fileUtils.isFileExist("userInfo_3.0/btn_qubangding.png"))
            var btnBindWeixin = new ccui.Button("userInfo_3.0/btn_qubangding.png");
        else
            var btnBindWeixin = new ccui.Button("usernfo/btn_qubangding.png");
        btnBindWeixin.setPosition(cc.p(discountText.x, discountText.y - 50));
        _btnPay.addChild(btnBindWeixin);
        btnBindWeixin.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.native.wxLogin("userInfo");
            }
        }, this);

        //register event weChat login call back  注册函数 ，微信登录成功回调
        UIEventBind(null, btnBindWeixin, "WX_USER_LOGIN", function(para) {
            if (cc.isString(para)) {
                para = JSON.parse(para);
            }

            if (para.openid) {
                cc.loader.loadTxt(jsb.fileUtils.getWritablePath() + "nickname.txt",
                    function(er, txt) {
                        if (txt) {
                            para.nickname = escape(txt);
                        }
                        LoginByWeChatAccountUser(para);
                    });
            } else {
                MjClient.showToastDelay("绑定微信失败，请重试");
            }
        });

         UIEventBind(null, btnBindWeixin, "WX_BIND_RESULT", function(isOK) {
            if (isOK) {
                discountText.setString("1.分享支付链接到微信\n2.点击支付链接发起充值");
                discountText -= 25;
                btnBindWeixin.setVisible(false);
            }
        });
    }
});