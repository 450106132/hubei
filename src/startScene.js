/**
 * Created by sking on 2017/11/14.
 */

var startLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var _bg = new ccui.ImageView();
        _bg.loadTexture("png/jiankang.jpg");
        setWgtLayout(_bg, [1, 1],[0.5, 0.5],[0, 0],true);
        this.addChild(_bg);
        var that = this;
        var seq = cc.sequence(cc.delayTime(2), cc.fadeOut(0.5),cc.callFunc(function(){
            that.removeFromParent();
        }));
        _bg.runAction(seq);
        return true;
    }
});
