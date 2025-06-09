/**
 * Created by my on 2017/4/8/008.
 */

//重启提示面板
(function () {

    RestartGameTip = cc.Layer.extend({

        ctor:function () {
            this._super();
            MjClient.restartTip = this;
            var tipUI = ccs.load(res.RestartTip_json);
            this.addChild(tipUI.node);

            var _block =  tipUI.node.getChildByName("block");
            setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

            var _back =  tipUI.node.getChildByName("back");
            setWgtLayout(_back,[0.85,0.8],[0.5,0.5],[0,0],2);

            var _btnClose = _back.getChildByName("close");
            _btnClose.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.restartTip.removeFromParent(true);
                        MjClient.restartTip = null;
                        break;
                    default :
                        break;
                }
            }, this);


            var _tipText = _back.getChildByName("tipText");
            _tipText.setString(MjClient.updateCfg.severRestart);

            //注册函数
            UIEventBind(null,tipUI.node,"cfgUpdate",function(changeValue)
            {
                if (changeValue.severRestart)
                {
                    _tipText.setString(changeValue.severRestart);
                }
            });

            return true;
        }
    })
})();
