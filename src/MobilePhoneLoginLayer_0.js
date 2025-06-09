/**
 * Created by Administrator on 2018/6/20.
 */

var mobilePhoneLoginLayer_0 = cc.Layer.extend({
    ctor: function (callback) {
        this._super();
        var UI = ccs.load("mobilePhoneLogin_0.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.6,0.75],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        this._phoneLoginPanel = _back.getChildByName("Node_phoneLogin");

        var self = this;

        //手机号码输入框
        var imagePhoneNum = this._phoneLoginPanel.getChildByName("Image_phoneNum");
        //this._bindPhoneNum0 = new cc.EditBox(cc.size(460,60), new cc.Scale9Sprite("store/into_number.png"));
        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("ui/playRecord/shurukuang.png"));
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("bindPhoneNum/input.png"));
        }
        else if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite());
        }
        else {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("store/into_number.png"));
        }

        if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
            this._bindPhoneNum0.setFontColor(cc.color("#ff6f20"));
            this._bindPhoneNum0.setPlaceholderFontSize(26);
            this._bindPhoneNum0.setPlaceholderFontColor(cc.color("#b6b6b5"));
        }
        else {
            this._bindPhoneNum0.setFontColor(cc.color("#ffe28c"));
            this._bindPhoneNum0.setPlaceholderFontSize(28);
            this._bindPhoneNum0.setPlaceholderFontColor(cc.color("#e4ecf0"));
        }
        this._bindPhoneNum0.setMaxLength(11);
        this._bindPhoneNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._bindPhoneNum0.setPlaceHolder("请输入手机号码");
        this._bindPhoneNum0.setPosition(imagePhoneNum.getContentSize().width/2, imagePhoneNum.getContentSize().height/2);
        imagePhoneNum.addChild(this._bindPhoneNum0);

        //密码
        var imageSecurityCode = this._phoneLoginPanel.getChildByName("Image_securityCode");
        //this._hintNum0 = new cc.EditBox(cc.size(330,60), new cc.Scale9Sprite("store/into_number.png"));
        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("ui/playRecord/shurukuang.png"));
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("bindPhoneNum/input.png"));
        }
        else if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite());
        }
        else {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("store/into_number.png"));
        }
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
            this._hintNum0.setFontColor(cc.color("#ff6f20"));
            this._hintNum0.setPlaceholderFontSize(26);
            this._hintNum0.setPlaceholderFontColor(cc.color("#b6b6b5"));
        }
        else {
            this._hintNum0.setFontColor(cc.color("#ffe28c"));
            this._hintNum0.setPlaceholderFontSize(28);
            this._hintNum0.setPlaceholderFontColor(cc.color("#e4ecf0"));
        }
        this._hintNum0.setMaxLength(6);
        this._hintNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._hintNum0.setPlaceHolder("请输密码");
        this._hintNum0.setPosition(imageSecurityCode.getContentSize().width/2, imageSecurityCode.getContentSize().height/2);
        imageSecurityCode.addChild(this._hintNum0);

        // if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || 
        //     MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) 
        // {
        //     this._bindPhoneNum0.setContentSize(cc.size(404,42));
        //     this._hintNum0.setContentSize(cc.size(270,42));
        // }
        // else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
        //     this._bindPhoneNum0.setContentSize(cc.size(508,42));
        //     this._hintNum0.setContentSize(cc.size(270,42));
        // }

        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._bindPhoneNum0.setFontColor(cc.color("#db1500"));
            this._hintNum0.setFontColor(cc.color("#db1500"));
            this._bindPhoneNum0.setFontName("fonts/lanting.TTF");
            this._hintNum0.setFontName("fonts/lanting.TTF");
        }

        var btnSureBind = this._phoneLoginPanel.getChildByName("btn_sureBind");
        btnSureBind.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var mobileNum = self._bindPhoneNum0.getString();
                if(mobileNum.length != 11 || parseInt(mobileNum) == 0)
                {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }
                if (isValidMobileNum(mobileNum) == false){
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }
                var verifyCode = self._hintNum0.getString();

                MjClient.mobileNum = mobileNum;
                MjClient.verifyCode = verifyCode;

                var info = {
                    mobileNum: mobileNum,
                    verifyCode: verifyCode,
                    isRegister: 0,
                }

                if (callback) callback(info);
            }
        },this);

        var btnRegister = this._phoneLoginPanel.getChildByName("btn_register");
        btnRegister.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self.addChild(new MobilePhoneRegisterLayer_0(callback));
            }
        },this);

        return true;
    },
});