/**
 * Created by WuXiaoDong on 2019/2/27.
 */

var alipayRedPaketLayer = cc.Layer.extend({
    _back:null,
    _closeCallback:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("Active_alipay_redpacket.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.85, 0.85], [0.5, 0.5], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        var logo = this._back.getChildByName("logo");
        logo.ignoreContentAdaptWithSize(true);

        var textDes = this._back.getChildByName("Text_des");
        textDes.ignoreContentAdaptWithSize(true);
        if(MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ){
            textDes.setString("天星游戏联合支付宝");
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
            textDes.setString("北斗游戏联合支付宝");
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            textDes.setString("天天游戏联合支付宝");
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
            textDes.setString("旺旺游戏联合支付宝");
        }
        else {
            textDes.setString("牌友联盟游戏联合支付宝");
        }

        var textNum = this._back.getChildByName("Text_num");
        textNum.ignoreContentAdaptWithSize(true);

        var btnCopy = this._back.getChildByName("btn_copy");
        btnCopy.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.native.doCopyToPasteBoard(textNum.getString());
                MjClient.native.openAlipay();
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clickStatistics", {type:2}, function (rtn) {
                    MjClient.unblock();
                    if (rtn.code == 0) {

                    }
                    else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        }
                        else {
                            MjClient.showToast("统计失败");
                        }
                    }
                });
            }
        }, this);

        return true;
    },

    setCloseCallback: function(callback) {
        this._closeCallback = callback;
    }
});