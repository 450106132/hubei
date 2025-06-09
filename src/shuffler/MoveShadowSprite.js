var MoveShadowSprite = cc.Node.extend({

    _icon : null,
    _src : null,
    _oldX : 0,
    _oldY : 0,
    ctor : function(src,dt){
        this._super();
        this.setAnchorPoint(0.5,0.5);
        dt = dt === undefined ? 0.02 : dt;
        this._src = src;

        this._icon = new cc.Sprite(src);
        this.addChild(this._icon);
        this.width = this._icon.width;
        this.height = this._icon.height;
        this._icon.x = this.width * 0.5;
        this._icon.y = this.height * 0.5;

        this._oldX = this.x;
        this._oldY = this.y;
        this.schedule(this.updateUI,dt);
    },

    update : function (dt) {

    },

    updateUI : function(dt){
        if(this._oldX != this.x || this._oldY != this.y){
            this._oldX = this.x;
            this._oldY = this.y;

            var sp = new cc.Sprite(this._src);
            sp.x = this.x;
            sp.y = this.y;
            sp.setAnchorPoint(0.5,0.5);
            sp.setOpacity(this.getOpacity() * 0.8);
            sp.setScale(this.getScale());
            this.parent.addChild(sp,-1);
            // setWgtLayout(sp,[sp.width / 1280 * 0.5,0],[0.5,0.6],[0,0]);
            var ac = cc.fadeOut(0.2);
            var cb = cc.callFunc(function(){
                this.removeFromParent(true);
            }.bind(sp));
            sp.runAction(cc.sequence(ac, cb));
        }
    }
})