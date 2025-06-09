/**
 * Created by WuXiaoDong on 2017/8/24.
 */

var shareCaishenLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var UI = ccs.load("shareCaishenLayer.json");
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        _back.getChildByName("Image_23").setVisible(false);
        _back.setOpacity(0);
        _back.runAction(cc.sequence(cc.fadeIn(1), cc.callFunc(function(){
            _back.getChildByName("Image_23").setVisible(true);
        })));
        setWgtLayout(_back,[0.5, 0.5], [0.5, 0.5], [0, 0.1]);
        var rand = Math.floor(Math.random()*(5-0+1)+0);
        _back.loadTexture("share/caishen_"+rand+".png");

        //关闭按钮
        _block.addTouchEventListener(function (sender, type) {
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