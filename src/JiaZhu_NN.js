/**
 * Created by sking on 2017/6/7.
 */

var jiaZhu_NNLayer = cc.Layer.extend({
    ctor: function (cb) {
        this._super();
        var UI = ccs.load("XiaZhu_NN.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        /*
         加注
         */

        function jiaZhuTouchEvent(sender,type)
        {
            if(type == 2) {
                playEffectInPlay("betChip");
                var itag = sender.getTag();
                if(cb)
                {
                    var _zhuNum = sender.getChildByName("Text_num");
                    var _value = _zhuNum.getString();
                    cb(parseInt(_value));

                    //todo.... 加注数量。。。itag
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "MJJiazhu",
                        uid: SelfUid(),
                        jiazhuNum: parseInt(_value),
                    });
                }
                that.removeFromParent();
            }
        }
        var tData = MjClient.data.sData.tData;
        var zhuNum = tData.areaSelectMode.diZhu;

        var _value = [1*zhuNum,2*zhuNum,3*zhuNum,4*zhuNum,5*zhuNum];

        for(var i =  0;i < 5;i ++)
        {

            var _Button = _block.getChildByName("btn_Ya_" + i);
            var _zhuNum = _Button.getChildByName("Text_num");
            _zhuNum.setString(_value[i] + "");
            _zhuNum.ignoreContentAdaptWithSize(true);


            _Button.addTouchEventListener(jiaZhuTouchEvent,this);
            _Button.setTag(i);

        }

        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
    }
});