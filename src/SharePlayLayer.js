/**
 * Created by WuXiaoDong on 2017/9/27.
 */

var sharePlayLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var UI = ccs.load("ShareLayer.json");
        var selectUiIndex = MjClient.isUseUIv3 && MjClient.isUseUIv3();
        if(selectUiIndex && (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP)){
            UI = ccs.load("ShareLayer_3.0.json");
        }
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var that = this;
        //_block.addTouchEventListener(function (sender, type) {
        //    if (type == 2) {
        //        that.removeFromParent();
        //    }
        //}, this);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.8, 0.8], [0.5, 0.5], [0, -0.04]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        }, this);

        var _btnWenXin = _back.getChildByName("Btn_share1");
        _btnWenXin.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                //分享到微信
                MjClient.native.wxShareImage();
            }
        }, this);


        var _btnFriends = _back.getChildByName("Btn_share2");
        _btnFriends.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                //分享朋友
                MjClient.native.wxShareCaptureScreenToPYQ();
            }
        }, this);

    }
});