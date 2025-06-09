(function(){
    var gameTip;
    GameTipView = cc.Layer.extend({
        _closeCallback:null,
        ctor:function ()
        {
            this._super();
            var giui = ccs.load(res.GameTip_json);
            this.addChild(giui.node);
            gameTip = this;
            MjClient.gameTip = gameTip;

            /*
                changed by sking
            */
            var _block =  giui.node.getChildByName("block");
            setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

            var _back =  giui.node.getChildByName("back");
            setWgtLayout(_back,[0.85,0.8],[0.5,0.5],[0,0],2);

            cc.log("------------------close -----game tips ------------");
            var _btnClose = _back.getChildByName("close");
            _btnClose.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        gameTip.removeFromParent(true);
                        if (this._closeCallback)
                        {
                            this._closeCallback();
                        }
                        break;
                    default :
                        break;
                }
            }, this);

            var _ListViewTip = _back.getChildByName("ListViewTip");
            //ListViewTip = _ListViewTip;

            var _tipText = _ListViewTip.getChildByName("tipText");
            function _setText()
            {
                if(typeof(MjClient.systemConfig.gameTip) == "undefined")
                {
                    return "test";
                }

                var endStr = MjClient.systemConfig.gameTip;

                endStr = endStr.replace("\\n","\n");
                endStr = endStr.replace("\\n\\n","\n\n");
                return endStr;
            };
            cc.log(" ============ " + _setText());
            _tipText.setString(_setText());
            //_tipText.setTextAreaSize(_tipText.getVirtualRendererSize());

            return true;
        },
        setCloseCallback:function(callback)
        {
            this._closeCallback = callback;
        }
    });
})();