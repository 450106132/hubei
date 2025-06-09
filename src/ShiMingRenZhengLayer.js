/**
 * Created by Administrator on 2018/6/20.
 */

var shiMingRenZhengLayer = cc.Layer.extend({
    ctor: function (sourceName) {
        this._super();
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
            var UI = ccs.load("ShiMingRenZheng_3.0.json");
        else
            var UI = ccs.load("ShiMingRenZheng.json");

        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        this._closeCallback = null;
        var appType = MjClient.getAppType();

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.6,0.75],[0.5,0.5],[0,0]);

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
            setWgtLayout(_back, [1, 1],[0.5,0.5],[0,0]);
        }

        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.setVisible(true);
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (sourceName == "autoPop")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinrutanchuang_Shimingrenzheng_Close", {uid:SelfUid()});
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);
        

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP){
            if(MjClient.systemConfig.verifiedOpen == 1 && cc.sys.os != cc.sys.OS_WINDOWS){
                _close.addTouchEventListener(function (sender, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        MjClient.logout();
                        this.removeFromParent();
                        if(MjClient.homeSetUi)
                        {
                            MjClient.homeSetUi.removeFromParent(true);
                            MjClient.homeSetUi = null;
                        }
                    }
                }, this);
            }
        }

        // 耒阳，南通，牌友联盟永州，淮安 QXNTQP QXYZQP QXHAMJ QXLYQP
        var title = _back.getChildByName("title");
        if(title){
            title.setTouchEnabled(true);
            this.count = 0;
            title.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    if(this.count<4){
                        this.count++;
                        return;
                    }
                    this.removeFromParent();
                    
                }
            }, this);
        }

        

        this._phoneLoginPanel = _back.getChildByName("Node_phoneLogin");

        var self = this;
        var defaultColor1 = cc.color("#9f6a36");
        var defaultColor2 = cc.color("#9f6a36");
        if(appType === MjClient.APP_TYPE.QXYYQP || appType == MjClient.APP_TYPE.HUBEIMJ ||appType == MjClient.APP_TYPE.YLHUNANMJ)
        {
            defaultColor1 = cc.color("#d3260e");
            defaultColor2 = cc.color("#ffffff");
        } else if(appType == MjClient.APP_TYPE.BDHYZP) {
            defaultColor1 = cc.color("#db1500");
            defaultColor2 = cc.color("#ffffff");
        } else if (appType === MjClient.APP_TYPE.DQSHANXIMJ) {
            defaultColor1 = cc.color("#ffffff");
            defaultColor2 = cc.color("#7292C2");
        }

        var textphone = this._phoneLoginPanel.getChildByName("Text_phone");
        var textSecurityCode = this._phoneLoginPanel.getChildByName("Text_securityCode");
        textphone.ignoreContentAdaptWithSize(true);
        textSecurityCode.ignoreContentAdaptWithSize(true);
        //手机号码输入框
        var imagePhoneNum = this._phoneLoginPanel.getChildByName("Image_phoneNum");
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("ui/shiMingRenZheng/shuru.png"));
        }else {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("store/into_number.png"));
        }

        this._bindPhoneNum0.setFontColor(defaultColor1);
        this._bindPhoneNum0.setPlaceholderFontSize(28);
        if(appType == MjClient.APP_TYPE.BDHYZP) {
            this._bindPhoneNum0.setFontSize(24);
        }
        this._bindPhoneNum0.setPlaceholderFontColor(defaultColor2);
        this._bindPhoneNum0.setMaxLength(10);
        this._bindPhoneNum0.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this._bindPhoneNum0.setPlaceHolder("请填写姓名");
        this._bindPhoneNum0.setPosition(imagePhoneNum.getContentSize().width/2, imagePhoneNum.getContentSize().height/2);
        imagePhoneNum.addChild(this._bindPhoneNum0);

        //验证码
        var imageSecurityCode = this._phoneLoginPanel.getChildByName("Image_securityCode");
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("ui/shiMingRenZheng/shuru.png"));
        }else {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("store/into_number.png"));
        }
        this._hintNum0.setFontColor(cc.color(defaultColor1));
        this._hintNum0.setPlaceholderFontSize(28);
        if(appType == MjClient.APP_TYPE.BDHYZP) {
            this._hintNum0.setFontSize(24);
        }
        this._hintNum0.setPlaceholderFontColor(defaultColor2);
        this._hintNum0.setMaxLength(18);
        this._hintNum0.setInputMode(cc.EDITBOX_INPUT_MODE_EMAILADDR);
        this._hintNum0.setPlaceHolder("请输入身份证号");
        this._hintNum0.setPosition(imageSecurityCode.getContentSize().width/2, imageSecurityCode.getContentSize().height/2);
        imageSecurityCode.addChild(this._hintNum0);


        // 岳阳不隐藏提示语
        var textHint = this._phoneLoginPanel.getChildByName("Text_hint");
        textHint.ignoreContentAdaptWithSize(true);
        if(appType !== MjClient.APP_TYPE.QXYYQP && appType !== MjClient.APP_TYPE.HUBEIMJ &&   appType !== MjClient.APP_TYPE.YLHUNANMJ) textHint.setVisible(false);

        var textHint0 = this._phoneLoginPanel.getChildByName("Text_hint_0");
        textHint0.ignoreContentAdaptWithSize(true);
        if(appType !== MjClient.APP_TYPE.QXYYQP && appType !== MjClient.APP_TYPE.HUBEIMJ  &&  appType !== MjClient.APP_TYPE.YLHUNANMJ) textHint0.setVisible(false);

        var textHint1 = this._phoneLoginPanel.getChildByName("Text_hint_1");
        textHint1.ignoreContentAdaptWithSize(true);

        var btnSureBind = this._phoneLoginPanel.getChildByName("btn_sureBind");
        btnSureBind.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (sourceName == "autoPop")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinrutanchuang_Shimingrenzheng_Sure", {uid:SelfUid()});
                var mobileNum = self._bindPhoneNum0.getString();
                if(mobileNum.length == 0)
                {
                    MjClient.showToast("请输入正确的姓名");
                    return;
                }

                var verifyCode = self._hintNum0.getString();
                if(verifyCode.length != 18 || parseInt(verifyCode) == 0)
                {
                    MjClient.showToast("请输入正确的身份证号码");
                    return;
                }

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.updateInfo", {realname:mobileNum, identityNum:verifyCode}, function(rtn)
                {
                    if(rtn.code==0)
                    {
                        MjClient.showToast(rtn.message);
                        self.removeFromParent();
                        if(MjClient.homeui._btn_shimingrenzheng){
                            MjClient.homeui._btn_shimingrenzheng.setVisible(false);
                        }
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


        return true;
    },

    setCloseCallback:function(callback)
    {
        
        this._closeCallback = callback;

    },

});