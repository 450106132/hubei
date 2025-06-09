/**
 * Created by WuXiaoDong on 2017/8/28.
 */

var loseGameLayer = cc.Layer.extend({
    ctor:function(data){
        this._super();
        var UI = ccs.load("loseGameLayer.json");
        this._rootUI = this.addChild(UI.node);

        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.7, 0.7], [0.5, 0.5], [0, -0.08]);

        //关闭按钮
        _block.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.leaveGame();
                if(cc.sys.isObjectValid(MjClient.playgroundui)){
                    //MjClient.playgroundui.getPlayListData();
                    if(isYongZhouProject()){
                        MjClient.playgroundui.getPlayDetailData();
                    }else{
                        MjClient.playgroundui.getPlaygroundData();
                    }
                }
                self.removeFromParent();
            }
        }, this);

        var textDetail = _back.getChildByName("Text_detail");
        textDetail.setVisible(false);
        if(data.matchName){
            textDetail.setVisible(true);
            textDetail.setString(data.matchName);
        }

        var textRank = _back.getChildByName("Text_rank");
        textRank.setString(data.round);

        return true;
    }
});