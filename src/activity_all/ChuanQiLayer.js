/**
 * Created by WuXiaoDong on 2018/12/26.
 */

var ChuanQiLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var UI = ccs.load("ChuanQiLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        this._closeCallback = null;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        if(isJinZhongAPPType()){
            setWgtLayout(_back, [0.85,0.85],[0.5,0.5],[0,0]);
        }else {
            setWgtLayout(_back, [0.75,0.75],[0.5,0.5],[0,0]);
        }

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        var bg = _back.getChildByName("Panel_bg").getChildByName("Image_bg");
        bg.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.log("跳转到传奇来了");
                self.removeFromParent();
                MjClient.native.umengEvent4CountWithProperty("adv_chuanqi_dianji", {uid:SelfUid()});
                var layer = new ChuanQiWebviewLayer(1);
                if (layer.isInitSuccess())
                    MjClient.Scene.addChild(layer);
            }
        }, this);

        var fire1 = cc.Sprite("chuanqi/fire/fire_0.png");
        var ac1 = createAnimation("chuanqi/fire/fire_", 12, cc.rect(0, 0, 150, 80), 0.03);
        fire1.runAction(cc.sequence(ac1).repeatForever());
        fire1.setPosition(75, 30);
        bg.addChild(fire1);

        var fire2 = cc.Sprite("chuanqi/fire/fire_0.png");
        var ac2 = createAnimation("chuanqi/fire/fire_", 12, cc.rect(0, 0, 150, 80), 0.03);
        fire2.runAction(cc.sequence(ac2).repeatForever());
        fire2.setPosition(500, 105);
        bg.addChild(fire2);

        var light = new cc.ParticleSystem("chuanqi/light.plist");
        light.setPosition(350, 800);
        light.setScale(1.5);
        bg.addChild(light,10);

        var particle = new cc.ParticleSystem("chuanqi/particle.plist");
        particle.setPosition(450, 150);
        particle.setScale(0.7);
        particle.setRotation(-90);
        bg.addChild(particle);

        var Image_hujun = bg.getChildByName("Image_hujun");
        Image_hujun.setLocalZOrder(10);
        Image_hujun.runAction(cc.sequence(cc.moveBy(0.3,cc.p(0,2)),cc.moveBy(0.6,cc.p(0,-4)),cc.moveBy(0.3,cc.p(0,2))).repeatForever());
        var Image_light = Image_hujun.getChildByName("Image_light");
        Image_light.runAction(cc.sequence(cc.fadeOut(1),cc.fadeIn(0.5)).repeatForever());
        var Image_light3 = Image_hujun.getChildByName("Image_light_0");
        Image_light3.runAction(cc.sequence(cc.fadeOut(1),cc.fadeIn(0.5)).repeatForever());

        var Image_PK = bg.getChildByName("Image_PK");
        Image_PK.setLocalZOrder(10);
        var Image_start = bg.getChildByName("Image_start");
        Image_start.setLocalZOrder(10);
        Image_start.runAction(cc.sequence(cc.scaleTo(0.25, 1.1), cc.scaleTo(0.25, 1.0)).repeatForever());
        //扫光
        var clipper = new cc.ClippingNode();
        var sten = cc.Sprite.create("chuanqi/niu.png");
        var stenSize = sten.getContentSize();
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        Image_start.addChild(clipper);
        var sprite1 = new cc.Sprite("login/loginAni/saog3.png");
        sprite1.setBlendFunc(cc.ONE,cc.ONE);
        sprite1.setOpacity(255);
        sprite1.setScale(0.7);
        clipper.addChild(sprite1, 1);
        var repeatAction = cc.repeatForever(cc.sequence(
            cc.moveTo(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.moveTo(1, cc.p(sten.width + sten.width, sten.height / 2)),
            cc.delayTime(0.5)));
        sprite1.runAction(repeatAction); //进行向右移动的重复动作
        var sprite2 = new cc.Sprite("login/loginAni/saog3.png");
        sprite2.setBlendFunc(cc.ONE,cc.ONE);
        sprite2.setOpacity(255);
        sprite2.setScale(0.7);
        clipper.addChild(sprite2, 1);
        var repeatAction2 = cc.repeatForever(cc.sequence(
            cc.moveTo(0.0, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.moveTo(1, cc.p(-sten.width, sten.height / 2)),
            cc.delayTime(0.5)));
        sprite2.runAction(repeatAction2); //进行向右移动的重复动作

        var Image_qianren = bg.getChildByName("Image_qianren");
        Image_qianren.setLocalZOrder(10);
        var Image_light1 = Image_qianren.getChildByName("Image_light");
        Image_light1.runAction(cc.sequence(cc.fadeOut(1),cc.fadeIn(0.5)).repeatForever());

        var Image_rexue = bg.getChildByName("Image_rexue");
        Image_rexue.setLocalZOrder(10);
        var Image_light2 = Image_rexue.getChildByName("Image_light");
        Image_light2.runAction(cc.sequence(cc.fadeOut(1),cc.fadeIn(0.5)).repeatForever());

        return true;
    },

    setCloseCallback:function(callback)
    {

        this._closeCallback = callback;

    },
});