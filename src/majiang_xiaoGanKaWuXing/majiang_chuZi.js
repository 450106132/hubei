/**
 * Created by wangyang on 2019/1/7.
 */
//

// 飘分
/* param :{
    file:"PiaoFen.json"
    list:[0,1,2,3]//飘分 0:不飘分
    cmd: "MJJiazhu"
    callfunc: function
}
*/
var majiang_chuZi = cc.Layer.extend({
    ctor: function (param) {
        this._super();
        var UI = ccs.load("ChuZiUI.json");
        this.addChild(UI.node);
        var that = this;

        this.block = UI.node.getChildByName("block");
        this.back = UI.node.getChildByName("back");

        setWgtLayout(this.block,[1, 1], [0.5, 0.5], [0, 0]);
        setWgtLayout(this.back,[0.5, 0.5], [0.5, 0.5], [0, 0]);

        var tData = MjClient.data.sData.tData;
        
        var selfuid = MjClient.playui.getSelfUid();
        this.chuZiArray = [];
        this.hasSelectedCards = [];

        this.initPiaoFenNode();
        this.initNodeAddRefresh();
        var btn_TiJiao = this.back.getChildByName("btn_tijiao");
        btn_TiJiao.addTouchEventListener(function(sender,type){
            if (type == 2) {
                this.chuZiArray = this.getPlayerChoose();
                 MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJChuzi",
                    chuZi: this.chuZiArray,
                });
            }
        }.bind(this));

        UIEventBind(null, this, "initSceneData", function(){
            var tData = MjClient.data.sData.tData;
            if (tData.tState != TableState.waitChooseCard) {
                that.removeFromParent();
            }
        });
        UIEventBind(null, this, "clearCardUI", function(){
            that.removeFromParent();
        });
        UIEventBind(null, this, "roundEnd", function(){
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function(){
            that.removeFromParent();
        });
        UIEventBind(null, this, "endRoom", function(){
            that.removeFromParent();
        });
        UIEventBind(null, this, "MJChuzi", function(ed){
            cc.log(" MJChuzi   ",JSON.stringify(ed));
            if (ed.uid == selfuid) {
                if (ed.chuZi == -1) {
                    that.initNodeAddRefresh();
                }else{
                     that.removeFromParent();
                }
            }else{
                that.refreshNode(ed.chuZi);
            }
        });
    },
    initPiaoFenNode:function(){
        var that = this;
        this.checkBoxNodeList = [];
        for (var i = 0; i < 12; i++) {
            var piaoFenNode = that.back.getChildByName("card" + i);
            var checkBox = piaoFenNode.getChildByName("CheckBox");
            if (checkBox) {
                checkBox.chooseValue = i + 1;
                if (i == 9) {
                    checkBox.chooseValue = 71;
                }else if (i == 10) {
                    checkBox.chooseValue = 81;
                }else if (i == 11) {
                    checkBox.chooseValue = 91;
                }
                this.checkBoxNodeList.push(checkBox);
            }
        } 
        for (var j = 0; j < this.checkBoxNodeList.length; j++) {
            var checkBoxNode = this.checkBoxNodeList[j];
            checkBoxNode.setSelected(false);
            checkBoxNode.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                    case ccui.CheckBox.EVENT_UNSELECTED:
                            that.showBox();
                        break;
                }
            }, checkBoxNode);
        }
    },
    showBox:function(bool){
        for (var i = 0; i < this.checkBoxNodeList.length; i++) {
            var checkBoxNode = this.checkBoxNodeList[i];
            var chooseValueArray = this.getPlayerChoose();
            if (chooseValueArray.length > 2 || checkBoxNode.isforbid) {
                checkBoxNode.visible = checkBoxNode.isSelected();
            }else{
                checkBoxNode.visible = true;
            }
        }
    },
    getPlayerChoose:function() {
        var chuZiArray = [];
        for (var i = 0; i < this.checkBoxNodeList.length; i++) {
            if (this.checkBoxNodeList[i].isSelected()) {
                chuZiArray.push(this.checkBoxNodeList[i].chooseValue);
            }
        }
        return chuZiArray;
    },
    initNodeAddRefresh:function(){
        this.hasSelectedCards = [];
        for (var i = 1; i <= 3; i++) {
            var player = MjClient.playui.getPlayerInfoByOff(i);
            if (!player || !player.chuZi) continue;
            this.hasSelectedCards = this.hasSelectedCards.concat(player.chuZi);
        }
        this.refreshNode();
    },
    refreshNode:function(array) {
        if (!this.hasSelectedCards || this.hasSelectedCards.length == 0) {
            this.hasSelectedCards = [];
        }
        if (array) {
            this.hasSelectedCards = this.hasSelectedCards.concat(array);
        }
        var cards = this.hasSelectedCards.slice();
        for (var i = 0; i < cards.length; i++) {
            if (cards[i] == 71) {
                cards[i] = 10;
            }else if (cards[i] == 81) {
                cards[i] = 11;
            }else if (cards[i] == 91) {
                cards[i] = 12;
            }  
        }
        var tipcount = 0;
        for (var j = 0; j < this.checkBoxNodeList.length; j++) {
            if (cards.indexOf(j + 1) >= 0) {
                var checkBoxNode = this.checkBoxNodeList[j];
                cc.log("cards ",cards,j);
                checkBoxNode.getParent().setColor(cc.color(190, 190, 190));
                checkBoxNode.visible = false;
                if (checkBoxNode.isSelected()) {
                    tipcount ++
                    checkBoxNode.setSelected(false);
                }
                if (tipcount == 1) {
                    MjClient.showToast("请重新选择出字");
                }
                checkBoxNode.isforbid = true;
            }
        }
        this.showBox();
    }
});
