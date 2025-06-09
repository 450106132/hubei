/**
 * Created by WuXiaoDong on 2019/10/26.
 */


var Active_double11_Layer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var UI = ccs.load("Active_double11.json");
        this.addChild(UI.node);
        var self = this;
        this._closeCallback = null;
        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        var closeBtn = this._back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (self._closeCallback) {
                    self._closeCallback();
                }
                self.removeFromParent();
            }
        });

        this.getclubMonthActivityInfo();
        this._btn_baoming = this._back.getChildByName("btn_baoming");
        this._btn_baoming.setVisible(false);
    },

    initUI:function (data) {
        var self = this;
        this._btn_baoming.setVisible(true);
        if(data.isSignUp){
            this._btn_baoming.loadTextureNormal("active/active_double11/btn_chakanxiangqing.png")
        }else {
            this._btn_baoming.loadTextureNormal("active/active_double11/btn_mashangbaoming.png")
        }
        this._btn_baoming.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if(data.isSignUp){
                    self.openBrowser();
                }else {
                    self.clubMonthActivitySignUp()
                }
            }
        }, this);
    },

    getclubMonthActivityInfo:function () {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.clubMonthActivityInfo", {},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== clubMonthActivityInfo ===   " + JSON.stringify(rtn));
                    self.initUI(rtn.data);
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }

                }

            }
        );
    },

    clubMonthActivitySignUp:function () {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.clubMonthActivitySignUp", {},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== clubMonthActivitySignUp ===   " + JSON.stringify(rtn));
                    MjClient.showToast(rtn.message);
                    self.getclubMonthActivityInfo();
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }

                }

            }
        );
    },

    openBrowser:function () {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.openBrowser", {type:7},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== openBrowser ===   " + JSON.stringify(rtn));
                    MjClient.native.OpenUrl(rtn.data);
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }

                }

            }
        );
    },

    setCloseCallback: function(callback) {

        this._closeCallback = callback;

    },
});