/**
 * Created by WuXiaoDong on 2017/8/31.
 */

var gongGaoLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var UI = ccs.load("GongGaoLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");

        setWgtLayout(_back, [0.5, 0.5], [0.5, 0.5], [0, 0]);

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
        _back.getChildByName("Text_1").setString(""+MjClient.systemConfig.gongzhonghao);
        _back.getChildByName("Text_1").ignoreContentAdaptWithSize(true);
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
            _back.getChildByName("Text_2").setString(""+MjClient.systemConfig.majiangqun);
        else
            _back.getChildByName("Text_2").setString(""+MjClient.systemConfig.suqianDaili);
        _back.getChildByName("Text_2").ignoreContentAdaptWithSize(true);

        var copy1Cb = function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Gonggao_Fuzhi_Youxiwentizixun", {uid:SelfUid()});
                    MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.gongzhonghao);
                    MjClient.showToast("复制成功，打开微信查找添加~~");
                    MjClient.native.openWeixin();
                    break;
                default:
                    break;
            }
        };
        var _btnCopy_1 = _back.getChildByName("btnCopy_1");
        _btnCopy_1.addTouchEventListener(copy1Cb, this);

        var copy2Cb = function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Gonggao_Fuzhi_Dailizixun", {uid:SelfUid()});
					if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
						MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.majiangqun);
        			else
                    	MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.suqianDaili);
                    MjClient.showToast("复制成功，打开微信查找添加~~~~");
                    MjClient.native.openWeixin();
                    break;
                default:
                    break;
            }
        };
        var _btnCopy_2 = _back.getChildByName("btnCopy_2");
        _btnCopy_2.addTouchEventListener(copy2Cb, this);

        //再加两个咨询号
        var text_3 = _back.getChildByName("Text_3");
        if(text_3){
            text_3.setString(""+MjClient.systemConfig.dailiZixun1);
            text_3.ignoreContentAdaptWithSize(true);

            var copy3Cb = function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.dailiZixun1);
                        MjClient.showToast("复制成功，打开微信查找添加~~");
                        MjClient.native.openWeixin();
                        break;
                    default:
                        break;
                }
            };
            var btnCopy_3 = _back.getChildByName("btnCopy_3");
            if(btnCopy_3){
                btnCopy_3.addTouchEventListener(copy3Cb, this);
            }
        }
        
        var text_4 = _back.getChildByName("Text_4");
        if(text_4){
            text_4.setString(""+MjClient.systemConfig.dailiZixun2);
            text_4.ignoreContentAdaptWithSize(true);

            var copy4Cb = function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.dailiZixun2);
                        MjClient.showToast("复制成功，打开微信查找添加~~~~");
                        MjClient.native.openWeixin();
                        break;
                    default:
                        break;
                }
            };
            var btnCopy_4 = _back.getChildByName("btnCopy_4");
            if(btnCopy_4){
                btnCopy_4.addTouchEventListener(copy4Cb, this);
            }
        }
        return true;
    }
});

// 新岳阳换皮 by jiangcw on 2018/07/13
var gongGaoLayer_QXYYQP = cc.Layer.extend({
    ctor: function () {
        this._super();
        var UI = ccs.load("GongGaoLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
       if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
            if (isIPhoneX()) { // IphoneX的恶心齐刘海
                setWgtLayout(_back, [0.75, 0.75], [0, 0.5], [-0.28, 0]);
            }
            else {
                setWgtLayout(_back, [0.75, 0.75], [0, 0.5], [-0.35, 0]);
            }
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            if (isIPhoneX()) { // IphoneX的恶心齐刘海
                setWgtLayout(_back, [0.55, 0.55], [0, 0.5], [0, 0]);
            }
            else {
                setWgtLayout(_back, [0.55, 0.55], [0, 0.5], [-0.1, 0]);
            }
        }

        var _back_1 = _back.getChildByName("back_1");
        var _ImgGan = _back_1.getChildByName("Image_gan");
        _ImgGan.setAnchorPoint(1,0.5);

        // 弹窗拉出动画
        var mixWidth, maxWidth;
        if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
            mixWidth = 200; maxWidth = 675;
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            mixWidth = 0; maxWidth = 432;
        }

        _back_1.width = mixWidth;
        _ImgGan.x = _back_1.width;
        var speed_1 = 10;
        var speed_2 = 10;
        _back_1.runAction(cc.sequence(
            cc.delayTime(0.01), 
            cc.callFunc(function(){
                speed_1 = speed_1 * 1.1;
                _back_1.width += speed_1;
                _ImgGan.x = _back_1.width;
                if (_back_1.width >= maxWidth) {
                    _back_1.width = maxWidth;
                    _ImgGan.x = _back_1.width;
                    _back_1.stopAllActions();
                }
            })
        ).repeatForever());

        var _bg = _back_1.getChildByName("bg");

        // 遮罩蒙层关闭触摸时间
        _block.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                var that = self;
                _back_1.runAction(cc.sequence(
                    cc.delayTime(0.01), 
                    cc.callFunc(function(){
                        speed_2 = speed_2 * 1.1;
                        _back_1.width -= speed_2;
                        _ImgGan.x = _back_1.width;
                        if (_back_1.width <= mixWidth) {
                            _back_1.stopAllActions();

                            that.removeFromParent();
                            if (that._closeCallback) {
                                that._closeCallback();
                            }
                        }
                    })
                ).repeatForever());

            }
        }, this);

        _bg.getChildByName("Text_1").setString(""+MjClient.systemConfig.gongzhonghao);
        _bg.getChildByName("Text_1").ignoreContentAdaptWithSize(true);
        _bg.getChildByName("Text_2").setString(""+MjClient.systemConfig.majiangqun);
        _bg.getChildByName("Text_2").ignoreContentAdaptWithSize(true);

        var copy1Cb = function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Gonggao_Fuzhi_Youxiwentizixun", {uid:SelfUid()});
                    MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.gongzhonghao);
                    MjClient.showToast("复制成功，打开微信查找添加~~");
                    MjClient.native.openWeixin();
                    break;
                default:
                    break;
            }
        };
        var _btnCopy_1 = _bg.getChildByName("btnCopy_1");
        _btnCopy_1.addTouchEventListener(copy1Cb, this);

        var copy2Cb = function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Gonggao_Fuzhi_Dailizixun", {uid:SelfUid()});
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
                        MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.majiangqun);
                    else
                        MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.suqianDaili);
                    MjClient.showToast("复制成功，打开微信查找添加~~~~");
                    MjClient.native.openWeixin();
                    break;
                default:
                    break;
            }
        };
        var _btnCopy_2 = _bg.getChildByName("btnCopy_2");
        _btnCopy_2.addTouchEventListener(copy2Cb, this);


        return true;
    }
});

if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
    gongGaoLayer = gongGaoLayer_QXYYQP;
}