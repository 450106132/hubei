//设置团队预警乐豆
var FriendCard_SXF_WithdrawRecord = cc.Layer.extend({
    onExit:function(){
        this._super();
    },
    ctor: function(clubId, userId) {
        this._super();
        var that = this;
        that.clubId = clubId;
        that.userId = userId;

        var node = ccs.load("friendcard_withdraw_happyBean_record.json").node;
        that.addChild(node);
        that.uinode = node;
        that.panel = node.getChildByName("Panel");
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5,0.5], [0, 0], true);
        setWgtLayout(this.panel, [1, 1], [0.5,0.5], [0, 0]);
        popupAnm(that.panel);

        var _close = that.panel.getChildByName("close");
        closeBtnAddLight(_close);
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2){
                that.removeFromParent();
            }
        }, that);

        that.panel.getChildByName("cell").setVisible(false);
        that.rquestWithdrawRecordList();
    },

    //请求列表
    rquestWithdrawRecordList:function()
    {
        var that = this;
        MjClient.block();
        var api = "pkplayer.handler.ClubWithdrawHappyBeanRecord";

        var sendInfo = {};

        sendInfo.clubId = that.clubId;
        sendInfo.userId = that.userId;
        MjClient.gamenet.request(api, sendInfo,  function(rtn)
        {
            MjClient.unblock();
            if(rtn.code == 0)
            {
                that.data = rtn.data;
                if(sys.isObjectValid(that)){
                     that.refreshWithdrawRecordList(rtn.data);
                }
            }
            else
            {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },


    refreshWithdrawRecordList:function(datas)
    {
        var that = this;
        var listData = datas;
        var cell = that.panel.getChildByName("cell");
        var contentList = that.panel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < listData.length; i++) {
            var data = listData[i];
            var item = cell.clone();
            item.data = data;
            contentList.pushBackCustomItem(item);
            item.getChildByName("text_ID").setString((i + 1) + "");
            item.getChildByName("text_time").setString(MjClient.dateFormat(new Date(parseInt(data.insertTime)), 'yyyy-MM-dd hh:mm:ss'));
            item.getChildByName("text_happybean").setString(data.happyBeanCount + "");
            item.getChildByName("text_remain").setString(0);

        }
        cell.setVisible(false);
    }
});