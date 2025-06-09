

var ShopTip = cc.Layer.extend({

    ctor:function () {
        this._super();
        var tipUI = ccs.load("shopTip.json");
        this.addChild(tipUI.node);

        var _block =  tipUI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back =  tipUI.node.getChildByName("back");
        setWgtLayout(_back,[0.5,0.6],[0.5,0.5],[0,0],2);

        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent(true);
                    break;
                default :
                    break;
            }
        }, this);

        var copyBtn = _back.getChildByName("copyBtn");
        copyBtn.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.dailiZixun);
                    MjClient.showToast("复制成功，打开微信查找添加");
                    MjClient.native.openWeixin();
                    break;
                default:
                    break;
            }
        }, this);

        var wxTxt = _back.getChildByName("weixinhao");
        wxTxt.ignoreContentAdaptWithSize(true);
        wxTxt.setString(""+MjClient.systemConfig.dailiZixun);
    },

    copyCb:function (sender, Type) {
        switch (Type) {
            case ccui.Widget.TOUCH_ENDED:
                MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.dailiZixun);
                MjClient.showToast("复制成功，打开微信查找添加");
                MjClient.native.openWeixin();
                break;
            default:
                break;
        }
    }
})
