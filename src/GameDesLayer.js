/**
 * Created by WuXiaoDong on 2017/8/31.
 */

var gameDesLayer = cc.Layer.extend({
    _ScrollView:null,
    _data:null,
    ctor: function (data) {
        this._super();
        var UI = ccs.load("gameDesLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        this._data = data;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.75, 0.75], [0.5, 0.5], [0, 0]);

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

        this._scrollView = _back.getChildByName("ScrollView");

        this.initTextScrollView();
        return true;
    },

    initTextScrollView:function () {
        var textReward = this._scrollView.getChildByName("Text_reward");
        var item = this._scrollView.getChildByName("item");
        item.getChildByName("Text_2").setVisible(false);
        var textR = this._scrollView.getChildByName("Text_r");
        var textRule = this._scrollView.getChildByName("Text_rule");
        var textS = this._scrollView.getChildByName("Text_s");
        var textState = this._scrollView.getChildByName("Text_state");

        cc.log("wxd..................._data"+JSON.stringify(this._data));

        var size = 0;
        if(this._data.rewords){
            size = this._data.rewords.length;
        }

        this._scrollView.setInnerContainerSize(cc.size(720, 150+40*(size + 1)+117+500));
        var posY = this._scrollView.getInnerContainerSize().height;
        textReward.y = posY;
        item.y = posY - (textReward.height + 10);

        for(var i=0; i<size; i++){
            var itemReward = item.clone();
            itemReward.y = posY - (textReward.height + 10) - (item.height + 5)*(i + 1);
            var text0 = itemReward.getChildByName("Text_0");
            var text1 = itemReward.getChildByName("Text_1");
            var text2 = itemReward.getChildByName("Text_2");
            text2.setVisible(false);
            if(this._data.rewords[i].ranking){
                text0.setString("第" + this._data.rewords[i].ranking + "名");
            }else {
                text0.setString("");
            }
            var strType = "";
            if(this._data.rewords[i].awardType){
                switch (this._data.rewords[i].awardType){
                    case 1:
                        strType = "元宝";
                        break;
                    case 2:
                        strType = "元现金";
                        break;
                    case 3:
                        strType = "元话费";
                        break;
                    default:
                        strType = "元宝";
                        break;
                }
                text1.setString(this._data.rewords[i].awardCount + strType);
            }else {
                text2.setString("0");
            }
            if(this._data.rewords[i].awardType && this._data.rewords[i].awardType == 2){
                text2.setString(this._data.rewords[i].awardCount);
            }else {
                text2.setString("0");
            }

            this._scrollView.addChild(itemReward);
        }

        textR.y = posY - (textReward.height + 10) - (item.height + 5)*(size + 1) -10;
        textRule.y = posY - (textReward.height + 10)*2 - (item.height + 5)*(size + 1) -10;
        textS.y = posY - (textReward.height + 10)*2 - (item.height + 5)*(size + 1) -10 - 117;
        textState.y = posY - (textReward.height + 10)*3 - (item.height + 5)*(size + 1) -10 - 117;

        //规则
        // var ruleData = {};
        // if(this._data.rule){
        //     ruleData = JSON.parse(this._data.rule);
        // }
        // cc.log("wxd.............ruleData:"+JSON.stringify(ruleData));
        // var _sumStr = getPlaySelectPara(ruleData.gameType, ruleData);
        // _sumStr = _sumStr.substr(0,_sumStr.length-1);
        textRule.setString("        " + this._data.ruleDesc);
        
        textState.setString(this._data.content);
    }
})