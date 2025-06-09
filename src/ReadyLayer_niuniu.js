 /**
 * Created by sking on 2017/5/2.
 */

var readyLayer_niuniu = cc.Layer.extend({
    ctor: function (callback) {
        this._super();
        var UI = ccs.load("niuniuReadyLayer.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var that = this;

        var cow_0 = _block.getChildByName("cow_0");
        var cow_1 = _block.getChildByName("cow_1");
        var begintx_circle = _block.getChildByName("begintx_circle");
        var poker_sg = _block.getChildByName("poker_sg");
        var begintx_lbl = _block.getChildByName("begintx_lbl");

        begintx_circle.setScale(0);
        begintx_circle.visible = false;
        begintx_lbl.setScale(0);
        begintx_lbl.visible = false;

        cc.spriteFrameCache.addSpriteFrames("niuniu/tx_plist_1.plist","niuniu/tx_plist_1.png");


        var frames_poker_sg = [];
        var prefix = "poker_sg_";
        var fc = cc.spriteFrameCache;
        for (var i = 1; i <= 5; i++) {
            var name = prefix + i + ".png";
            var f = fc.getSpriteFrame(name);
            if(f)
            {
                frames_poker_sg.push(f);
            }
        }







        var frames = [];
        var prefix = "begintx_cow_";
        var fc = cc.spriteFrameCache;
        for (var i = 1; i <= 8; i++) {
            var name = prefix + i + ".png";
            var f = fc.getSpriteFrame(name);
            if(f)
            {
                frames.push(f);
            }
        }
        var animate = cc.animate(new cc.Animation(frames, 0.5/8, 1));
        cow_0.runAction(cc.sequence( cc.spawn(cc.moveTo(0.5, _block.getContentSize().width/2, cow_0.y).easing(cc.easeQuinticActionIn()), animate), cc.fadeOut(0.5)));

        var animate = cc.animate(new cc.Animation(frames, 0.5/8, 1));
        cow_1.runAction(cc.sequence( cc.spawn(cc.moveTo(0.5, _block.getContentSize().width/2, cow_1.y).easing(cc.easeQuinticActionIn()), animate), cc.callFunc(function () {
            var animate_poker_sg = cc.animate(new cc.Animation(frames_poker_sg, 0.1, 1));
            poker_sg.runAction(cc.sequence( animate_poker_sg,cc.removeSelf()));

            begintx_circle.runAction(cc.sequence(cc.scaleTo(0.3, 1), cc.fadeOut(0.5)));
            begintx_circle.visible = true;

            begintx_lbl.runAction(cc.sequence(cc.scaleTo(0.2, 2), cc.scaleTo(0.3, 1), cc.fadeOut(0.5) ));
            begintx_lbl.visible = true;
        }), cc.fadeOut(0.5), cc.delayTime(0.5), cc.callFunc(function () {
            if (callback)
                callback();
        })));
    }
});