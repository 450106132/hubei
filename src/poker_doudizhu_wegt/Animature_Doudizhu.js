var Animature_doudizhu = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.CARDTPYE = MjClient.majiang.CARDTPYE;
        this.cardType = null;
        this.cardTypeAni = "";
        this.cardTypeSound = "";
        this.screenScale = Math.min(MjClient.size.width/1280, MjClient.size.height/720);
        this.delayTime = 0.0;
        this.isChuntian = false;
        this.loadResource();
    },
    loadResource: function () {
        cc.spriteFrameCache.addSpriteFrames("spine/ani_doudizhu/SKdapaidonghua0.plist", "spine/ani_doudizhu/SKdapaidonghua0.png");
        cc.spriteFrameCache.addSpriteFrames("spine/ani_doudizhu/SKdapaidonghua1.plist", "spine/ani_doudizhu/SKdapaidonghua1.png");
        cc.spriteFrameCache.addSpriteFrames("spine/ani_doudizhu/SKdapaidonghua2.plist", "spine/ani_doudizhu/SKdapaidonghua2.png");
        cc.spriteFrameCache.addSpriteFrames("spine/ani_doudizhu/SKdapaidonghua3.plist", "spine/ani_doudizhu/SKdapaidonghua3.png");
        ccs.armatureDataManager.addArmatureFileInfo("spine/ani_doudizhu/SKdapaidonghua.ExportJson");
        cc.spriteFrameCache.addSpriteFrames("playing/cardTable/chuntian.plist", "playing/cardTable/chuntian.png");
    },
    loadCardTypeAni: function (cardType, pos, off, isChuntian) {
        this.cardType = cardType;
        this.isChuntian = isChuntian;
        switch (cardType) {
            case this.CARDTPYE.huojian:
                this.cardTypeAni = "SKdapaiwangzha01";
                this.cardTypeSound = "ani_huojian";
                this.delayTime = 1.9;
                break;
            case this.CARDTPYE.zhadan:
            case this.CARDTPYE.ruanzha2:
            case this.CARDTPYE.ruanzha:
                this.cardTypeAni = "SKdapaizhadan";
                this.cardTypeSound = "ani_zhadan";
                this.delayTime = 1.6;
                break;
            case this.CARDTPYE.feiji:
            case this.CARDTPYE.feiji2:
            case this.CARDTPYE.sanshun:
                this.cardTypeAni = "SKdapaifeiji" + (off == 2 || off == 3 ? 2 : "");
                this.cardTypeSound = "ani_feiji";
                this.delayTime = 1.2;
                break;
            case this.CARDTPYE.shunzi:
                this.cardTypeAni = "SKdapaishunzi";
                this.cardTypeSound = "ani_shunzi";
                this.delayTime = 1.2;
                break;
            case this.CARDTPYE.liandui:
                this.cardTypeAni = "SKdapailiandui";
                this.cardTypeSound = "ani_liandui";
                this.delayTime = 1.2;
                break;
            default:
                this.cardTypeAni = "";
                this.cardTypeSound = "";
                this.delayTime = 0.0;
                break;
        }
        if (this.cardTypeAni != "") {
            if (cardType == this.CARDTPYE.zhadan || cardType == this.CARDTPYE.ruanzha || cardType == this.CARDTPYE.ruanzha2) {
                this.createBompAct(pos, off);
            } else {
                this.createCardTypeAni(pos);
            }
        } else {
            this.playCardAniChunTian();
        }
    },
    getBompSrcPos: function (off) {
        var srcBompPos;
        if (off == 0)
            srcBompPos = cc.p(MjClient.size.width * 0.7, 0);
        else if (off == 1)
            srcBompPos = cc.p(MjClient.size.width, MjClient.size.height * 0.9);
        else if (off == 2)
            srcBompPos = cc.p(0, MjClient.size.height * 0.9);
        else if (off == 3)
            srcBompPos = cc.p(0, MjClient.size.height * 0.9);
        return srcBompPos;
    },
    createBompAct: function (pos, off) {
        var startP = this.getBompSrcPos(off), endPos = pos;
        var bompPic = cc.Sprite("spine/ani_doudizhu/SKzhandantubiao.png");
        bompPic.setPosition(startP);
        bompPic.setScale(0.5 * this.screenScale);
        this.addChild(bompPic,1000);
        var that = this;
        bompPic.runAction(cc.sequence(
            cc.spawn(
                cc.rotateBy(0.3,720),
                cc.scaleTo(0.3,this.screenScale),
                cc.bezierTo(0.3 , [startP, cc.p((startP.x + endPos.y)/2, (startP.y + endPos.y)/2), endPos])
            ),
            cc.delayTime(0.1),
            cc.callFunc(function () {
                that.createCardTypeAni(pos);
            }),
            cc.removeSelf()
        ));
    },
    createCardTypeAni: function (pos) {
        playEffectInPlay(this.cardTypeSound);
        var ani = new ccs.Armature("SKdapaidonghua");
        ani.animation.play(this.cardTypeAni, -1, 0);
        ani.setPosition(pos);
        ani.setScale(this.screenScale);
        this.addChild(ani, 1000);
        var seq;
        var that = this;
        if (this.cardType == this.CARDTPYE.huojian) { //火箭动画分为两个部分
            seq = cc.sequence(cc.delayTime(0.7), cc.callFunc(function () {
                that.playHuoJian2(pos);
            }), cc.removeSelf());
        } else {
            seq = cc.sequence(cc.delayTime(1.2), cc.removeSelf(), cc.callFunc(function () {
                that.playCardAniChunTian();
            }));
        }
        ani.runAction(seq);
    },
    playHuoJian2:function(pos) {
        var ani = new ccs.Armature("SKdapaidonghua");
        ani.animation.play("SKdapaiwangzha02", -1, 0);
        ani.setPosition(pos);
        ani.setScale(this.screenScale);
        this.addChild(ani, 1000);
        var that = this;
        var seq = cc.sequence(cc.delayTime(1.2), cc.removeSelf(), cc.callFunc(function () {
            that.playCardAniChunTian();
        }));
        ani.runAction(seq);
    },
    playCardAniChunTian: function () {
        if (!this.isChuntian) { return ; }
        var _frames = [];
        var prefix = "lord_anim_spring_";
        var fc = cc.spriteFrameCache;
        for (var i = 1; i <= 17; i++) {
            var name = prefix + i + ".png";
            var f = fc.getSpriteFrame(name);
            if (f) {
                _frames.push(f);
            }
        }
        var _sprite = cc.Sprite();
        _sprite.initWithSpriteFrame(_frames[0]);
        var _animate = cc.animate(new cc.Animation(_frames, 1.2 / 18, 1));
        _sprite.runAction(cc.sequence(_animate, cc.removeSelf()));
        _sprite.setScale(1.5 * this.screenScale);
        _sprite.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this.addChild(_sprite, 1000);
    },
    getAniTime: function () {
        var totalTime = this.delayTime + (this.isChuntian ? 1.2 : 0);
        return totalTime > 0.0 ? totalTime: null;
    }
})