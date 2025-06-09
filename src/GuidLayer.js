/**
 * Created by sking on 2017/5/12.
 */
var guidLayer = cc.Layer.extend({
    _guidIdx:1,
    _Btn_up:null,
    _Btn_down:null,
    _closeCallback:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("GuidLayer.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var that = this;

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.95, 0.95], [0.5, 0.5], [0, -0.04]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
            }
        }, this);


        var _path = "Guid/xinshou";
        this._guidIdx = 1;
        var _IdxPageNode = _back.getChildByName("Image_1");
        _IdxPageNode.loadTexture(_path + this._guidIdx + ".png");

        this._Btn_up = _back.getChildByName("Btn_up");
        this._Btn_down = _back.getChildByName("Btn_down");

        this._Btn_up.setTouchEnabled(false);
        this._Btn_up.setBright(false);
        this._Btn_up.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                if(this._guidIdx > 1)
                {
                    this._guidIdx--;
                    _IdxPageNode.loadTexture(_path + this._guidIdx + ".png");
                    this._Btn_down.setTouchEnabled(true);
                    this._Btn_down.setBright(true);
                    cc.log("----------------this._guidIdx =  " + this._guidIdx);
                }
                if(this._guidIdx == 1)
                {
                    this._Btn_up.setTouchEnabled(false);
                    this._Btn_up.setBright(false);
                }

            }
        }, this);



        this._Btn_down.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(this._guidIdx < 8)
                {
                    this._guidIdx++;
                    _IdxPageNode.loadTexture(_path + this._guidIdx + ".png");
                    this._Btn_up.setTouchEnabled(true);
                    this._Btn_up.setBright(true);
                }

                if(this._guidIdx == 8){
                    this._Btn_down.setTouchEnabled(false);
                    this._Btn_down.setBright(false);
                }
            }
        }, this);
    },
    setCloseCallback:function(callback)
    {
        this._closeCallback = callback;
    }
});