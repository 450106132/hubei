/**
 * Created by WuXiaoDong on 2017/9/26.
 */

var getRewardLayer = cc.Layer.extend({
    ctor:function(str){
        this._super();
        var UI = ccs.load("getRewardLayer.json");
        this._rootUI = this.addChild(UI.node);

        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.5, 0.5], [0.5, 0.5], [0, 0]);

        var textDetail = _back.getChildByName("Text_detail");
        if(str){
            textDetail.setString(str);
        }

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
            }
        }, this);

        return true;
    }
});