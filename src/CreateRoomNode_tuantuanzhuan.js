/**
 * Created by sking on 2017/7/21.
 */


var CreateRoomNode_tuantuanzhuan = CreateRoomNode.extend({
    initAll:function(IsFriendCard)
    {


        this.bg_node = ccs.load("bg_tuantuanzhuan.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_tuantuanzhuan");
    },
    initPlayNode:function()
    {
        if(MjClient.APP_TYPE.QXJSMJ === MjClient.getAppType() || MjClient.APP_TYPE.QXHAMJ === MjClient.getAppType())
        {
            this._super();
        }
    },
    setPlayNodeCurrentSelect:function()
    {
        if(MjClient.APP_TYPE.QXJSMJ === MjClient.getAppType() || MjClient.APP_TYPE.QXHAMJ === MjClient.getAppType())
        {
            this._super();
        }
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN;
        para.maxPlayer = 4;
        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps

        return para;
    }
});