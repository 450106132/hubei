/**
 * Created by WuXiaoDong on 2017/8/24.
 */

var shareYuanbaoLayer = cc.Layer.extend({
    ctor:function (text) {
        this._super();
        var UI = ccs.load("shareYuanbaoLayer.json");
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = _block.getChildByName("back");
        //关闭按钮
        _block.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var textDetail = _back.getChildByName("Text_detail");
        textDetail.ignoreContentAdaptWithSize(true);
        textDetail.setString(text);

        

        return true;
    }
});

//金币
var shareJinBiLayer = cc.Layer.extend({
    ctor:function (text) {
        this._super();
        var UI = ccs.load("shareJinBiLayer.json");
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = _block.getChildByName("back");
        //关闭按钮
        _block.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var textDetail = _back.getChildByName("Text_detail");
        textDetail.ignoreContentAdaptWithSize(true);
        textDetail.setString(text);

        

        return true;
    }
});