/**
 * Created by wangyang on 2019/12/18.
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
var majiang_piaoFen = cc.Layer.extend({
    ctor: function (param) {
        this._super();

        var layer_param = param || {file: "PiaoFen.json", list:[0, 1, 2, 3], cmd:"MJJiazhu", callfunc:function(){}};
        var filePath = layer_param.file;
        cc.log(" layer_param.file  ",layer_param.file,JSON.stringify(layer_param));
        var UI = ccs.load(filePath);
        this.addChild(UI.node);
        var that = this;

        this.block = UI.node.getChildByName("block");
        this.back = UI.node.getChildByName("back");
        this.tip = this.back.getChildByName("Image_1");
        this.tip.visible = MjClient.playui.PiaoFenMore();
        setWgtLayout(this.block,[1, 1], [0.5, 0.5], [0, 0]);
        setWgtLayout(this.back,[0.5, 0.5], [0.5, 0.15], [0, 0]);

        var tData = MjClient.data.sData.tData;
        
        var selfuid = MjClient.playui.getSelfUid();
        this.enTouchIndex =  MjClient.data.sData.players[selfuid].jiazhuNum || 0;
        this.piaoFenList = layer_param.list;
        var param_cmd = layer_param.cmd;
        var param_cb = layer_param.callfunc;
        cc.log(" tData.jiazhuNum,",JSON.stringify(MjClient.data.sData.players[selfuid]));
        var dataMsg = tData.lastWinner || [];
        if (dataMsg && dataMsg.indexOf(selfuid) >= 0) {
            this.initPiaoFenNode(selfuid);
        }else{
            this.initPiaoFenNode();
        }
        var btn_TiJiao = this.back.getChildByName("btn_tijiao");
        btn_TiJiao.addTouchEventListener(function(sender,type){
            if (type == 2) {
                 MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: param_cmd,
                    jiazhuNum: this.piaoFenList[this.piaoFenRadioBox.getSelectIndex()],
                });
                param_cb();
            }
        }.bind(this));

        UIEventBind(null, this, "initSceneData", function(){
            var tData = MjClient.data.sData.tData;
            if (tData.tState != TableState.waitJiazhu) {
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
        UIEventBind(null, this, "MJJiazhu", function(ed){
            cc.log("  ed   ",JSON.stringify(ed));
            if (ed.uid == MjClient.playui.getSelfUid()) {
                that.removeFromParent();
            }
        });
    },
    initPiaoFenNode:function(uid){
        var piaoFenList = this.piaoFenList || [];
        var that = this;
        this.piaoFenNodeList = [];
        for (var j = 0; j < 6; j++) {
            var piaoFenNode = that.back.getChildByName("checkBox" + j);
            if (piaoFenNode) piaoFenNode.visible = false;
        }
        for (var i = 0; i < piaoFenList.length; i++) {
            var piaoFenNode = that.back.getChildByName("checkBox" + piaoFenList[i]);
            piaoFenNode.setEnabled(true);
            piaoFenNode.visible = true;
            var imgTouch = piaoFenNode.getChildByName("Image");
            imgTouch.tag = i;
            imgTouch.addTouchEventListener(function(sender,type){
                if (type == 2) {
                    cc.log(" checkBox  触摸图片");
                    this.piaoFenRadioBox.selectItem(sender.tag);
                }
            }.bind(this));
            if (uid &&  uid == MjClient.playui.getSelfUid() && i < this.enTouchIndex) {
                piaoFenNode.setEnabled(false);
            }
            this.piaoFenNodeList.push(piaoFenNode);
        }
        this.piaoFenRadioBox = createRadioBoxForCheckBoxs(this.piaoFenNodeList);
        this.piaoFenRadioBox.selectItem(this.enTouchIndex);
    }
});
