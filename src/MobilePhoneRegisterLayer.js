/**
 * Created by WuXiaoDong on 2019/8/2.
 */

var mobilePhoneRegisterLayer = cc.Layer.extend({
    _type:0,
    ctor: function (data) {
        this._super();
        var UI = ccs.load("registerPhoneNumLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.7,0.85],[0.5,0.5],[0,0]);

        // //关闭按钮
        // var _close = _back.getChildByName("close");
        // _close.addTouchEventListener(function (sender, type) {
        //     if (type == ccui.Widget.TOUCH_ENDED) {
        //         self.removeFromParent();
        //         if (this._closeCallback) {
        //             this._closeCallback();
        //         }
        //     }
        // }, this);

        var self = this;

        //手机号码输入框
        var imageSloves = _back.getChildByName("Image_sloves");
        this._textSlovesInput = new cc.EditBox(cc.size(imageSloves.width,imageSloves.height), new cc.Scale9Sprite("bindPhoneNum/registerPhoneNum/roundedRectangle.png"));
        this._textSlovesInput.setFontColor(cc.color("#89572F"));
        this._textSlovesInput.setPlaceholderFontSize(30);
        this._textSlovesInput.setPlaceholderFontColor(cc.color("#e4ecf0"));
        this._textSlovesInput.setMaxLength(8);
        this._textSlovesInput.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this._textSlovesInput.setPlaceHolder("请输入游戏昵称");
        this._textSlovesInput.setPosition(imageSloves.getContentSize().width/2, imageSloves.getContentSize().height/2);
        imageSloves.addChild(this._textSlovesInput);

        var scrollView = _back.getChildByName("Image_heads_bg").getChildByName("ScrollView");
        var btnHead = _back.getChildByName("Image_heads_bg").getChildByName("btn_head");
        btnHead.setVisible(false);
        var len = data.length;
        var scrollHeight = Math.ceil(len/3)*115;
        scrollView.setInnerContainerSize(cc.size(scrollView.width, scrollHeight));
        for(var i = 0; i<len; i++){
            var item = btnHead.clone();
            item.setVisible(true);
            item.i = i;
            item.setPosition(cc.p(scrollView.width/6+scrollView.width/3*(i%3), scrollView.getInnerContainerSize().height - (115/2+Math.floor(i/3)*115)));
            scrollView.addChild(item);

            var imageGuang = item.getChildByName("Image_guang");
            imageGuang.setSwallowTouches(false);
            imageGuang.setLocalZOrder(2);
            if(this._type == i){
                imageGuang.setVisible(true);
            }else {
                imageGuang.setVisible(false);
            }

            var btn_touch = item.getChildByName("btn_touch");
            btn_touch.i = i;
            btn_touch.setLocalZOrder(3);

            var url = data[i];
            cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
            {
                if(!err&&texture)
                {
                    var clipper = new cc.ClippingNode();
                    var sten = cc.Sprite.create("bindPhoneNum/registerPhoneNum/heaeBg.png");
                    var stenSize = sten.getContentSize();
                    sten.setPosition(cc.p(this.width/2, this.height/2));
                    clipper.setContentSize(stenSize);
                    clipper.setStencil(sten);
                    clipper.setAlphaThreshold(0.5);
                    this.addChild(clipper);

                    var headSprite = new cc.Sprite(texture);
                    headSprite.setName("headSprite");
                    headSprite.setPosition(cc.p(this.width/2, this.height/2));
                    headSprite.setScaleX(this.width/headSprite.getContentSize().width);
                    headSprite.setScaleY(this.height/headSprite.getContentSize().height);
                    clipper.addChild(headSprite);
                }
            }.bind(item));

            btn_touch.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    var itemArr = scrollView.getChildren();
                    cc.log('wxdttttttttttttt'+JSON.stringify(itemArr));
                    for(var i = 0; i<itemArr.length; i++){
                        var imageGuang = itemArr[i].getChildByName("Image_guang");
                        if(itemArr[i].i == sender.i){
                            self._type = sender.i;
                            imageGuang.setVisible(true);
                        }else {
                            imageGuang.setVisible(false);
                        }
                    }
                }
            }, this);
        }

        this._btnRegister = _back.getChildByName("btn_register");
        this._btnRegister.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var loginData = {};

                loginData.nickname = self._textSlovesInput.getString();
                if (loginData.nickname.length <= 0) {
                    MjClient.showToast("请输入正确的昵称");
                    return;
                }

                loginData.headimgurl = data[self._type];

                loginData.mobileNum = MjClient.mobileNum;

                loginData.appVersion = MjClient.native.GetVersionName();
                loginData.resVersion = MjClient.resVersion;
                loginData.app = {appid: AppEnv[MjClient.getAppType()], os: cc.sys.os};
                loginData.remoteIP = MjClient.remoteIP;
                loginData.area = {
                    longitude: MjClient.native.GetLongitudePos(),
                    latitude: MjClient.native.GetLatitudePos()
                };
                loginData.umid = MjClient.native.umengGetUMID();
                loginData.deviceModel = MjClient.native.getDeviceModel();

                MjClient.block();
                MjClient.gamenet.request("pkcon.handler.mobileRegister", loginData, function (rtn) {
                    cc.log("wxd.....pkcon.handler.mobileRegister..." + JSON.stringify(rtn));

                    if (cc.isUndefined(rtn.result))
                    {
                        MjClient.showMsg("登录失败");
                        postEvent("autoLoginFailed");

                    } else if (rtn.result == 0) {
                        self.removeFromParent();

                        try {
                            if (rtn.pinfo.uid) loginData.mail = rtn.pinfo.uid;
                            if (rtn.pinfo.loginCode) loginData.code = rtn.pinfo.loginCode;
                            util.localStorageEncrypt.setStringItem("loginData", JSON.stringify(loginData));
                        }
                        catch (e){}
                        MjClient.getSystemConfig(function(){
                            postEvent("loginOK",rtn);
                        }, function () {
                            postEvent("autoLoginFailed");
                        });
                    } else {
                        MjClient.showToast(rtn.message);
                    }
                    MjClient.unblock();
                })
            }
        },this);

        return true;
    },
});