/**
 * Created by WuXiaoDong on 2017/9/5.
 */

var roundEndLayer = cc.Layer.extend({
    ctor:function(data){
        this._super();
        var UI = ccs.load("roundEndLayer.json");
        this._rootUI = this.addChild(UI.node);

        MjClient.roundendui=this;
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _background = UI.node.getChildByName("background");
        setWgtLayout(_background, [1, 1], [0.5, 0.5], [0, 0], true);
        if(data){
            _background.setVisible(true);
        }

        var _back = UI.node.getChildByName("back");
        if(isYongZhouProject()){
            setWgtLayout(_back,[0.5, 0.5], [0.5, 0.5], [0, -0.16]);
        }else{
            setWgtLayout(_back,[0.45, 0.45], [0.5, 0.52], [0, -0.16]);
        }

        var textDetail = _back.getChildByName("Text_detail");
        textDetail.setString("本轮比赛结束,请耐心等待其他选手完成比赛以及决定您的名次,祝您好运~");
        var textNum = _back.getChildByName("Text_num");
        textNum.ignoreContentAdaptWithSize(true);
        textNum.setVisible(false);
        var text3 = _back.getChildByName("Text_3");
        text3.setVisible(false);
        var text5 = _back.getChildByName("Text_5");
        text5.setVisible(false);

        if(data && data.leftTableCount){
            textNum.setString(data.leftTableCount);
            textNum.setVisible(true);
            text3.setVisible(true);
            text5.setVisible(true);
        }

        if(isYongZhouProject()){
            UIEventBind(null,this,"leftTable",function(data){
                //num.setString(self._data.condition - data.signUpCount);
                textNum.setString(data.leftTable);
                textNum.setVisible(true);
                text3.setVisible(true);
                text5.setVisible(true);
            });
        }else {
            UIEventBind(null,this,"match_state_refresh",function(data){
                //num.setString(self._data.condition - data.signUpCount);
                textNum.setString(data.leftTableCount);
                textNum.setVisible(true);
                text3.setVisible(true);
                text5.setVisible(true);
            });
        }

        if(MjClient.data.sData && MjClient.data.sData.tData && !isYongZhouProject()){
            var tData = MjClient.data.sData.tData;
            MjClient.gamenet.request("pkplayer.handler.queryMatchState",{matchId:tData.matchId},function(rtn){
                cc.log("wxd pkplayer.handler.queryMatchState:"+JSON.stringify(rtn))
                MjClient.unblock();
                if(rtn.code == -1)
                {
                    MjClient.showToast(rtn.message);
                }else if(rtn.code == 0){
                    if(rtn.data.leftTableCount && textNum){
                        textNum.setString(rtn.data.leftTableCount);
                        textNum.setVisible(true);
                        text3.setVisible(true);
                        text5.setVisible(true);
                    }
                }
            });
        }


        return true;
    }
});