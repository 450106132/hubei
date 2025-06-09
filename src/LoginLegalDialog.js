// 用户必知弹框 add by cyc

var LoginLegalDialog = cc.Layer.extend({
    ctor: function(yesCallBack, noCallBack) {
        this._super();
        cc.log("-----LoginLegalDialog------");

        var UI = ccs.load("LoginLegalDialog.json");
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
            UI = ccs.load("LoginLegalDialog_3.0.json");
        }
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
            setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);
        } else {
            setWgtLayout(_back, [0.8, 0.85], [0.5, 0.5], [0, 0]);
        }

        // 游戏用户协议
        var userProtocolBtn = _back.getChildByName("userProtocolBtn");
        userProtocolBtn.addTouchEventListener(function(sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                var url = "www.baidu.com";
                if (MjClient.updateCfg)
                {
                    url = MjClient.updateCfg.userProtocol;
                }
                MjClient.openWeb({url:url,help:false});
            }
        });

        // 隐私保护指引
        var privacyProtocolBtn = _back.getChildByName("privacyProtocolBtn");
        privacyProtocolBtn.addTouchEventListener(function(sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                var url = "www.baidu.com";
                if (MjClient.updateCfg)
                {
                    url = MjClient.updateCfg.privacyProtocol;
                }
                MjClient.openWeb({url:url,help:false});
            }
        });

        // 拒绝
        var noBtn = _back.getChildByName("noBtn");
        noBtn.addTouchEventListener(function(sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (noCallBack)
                    noCallBack();
                self.removeFromParent();
            }
        });

        var yesBtn = _back.getChildByName("yesBtn");
        yesBtn.addTouchEventListener(function(sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                util.localStorageEncrypt.setBoolItem("_agree_user_protocol", true);
                if (yesCallBack)
                    yesCallBack();
                self.removeFromParent();
            }
        });

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (noCallBack)
                    noCallBack();
                self.removeFromParent();
            }
        });

        return true;
    },
});