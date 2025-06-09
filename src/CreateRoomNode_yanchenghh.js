/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_yanchenghh = CreateRoomNode.extend({
    initAll:function()
    {
        this.localStorageKey.KEY_yancheng_gangbao     = "_YAN_CHENG_GANG_BAO";             //杠爆


        this.bg_node = ccs.load("bg_yanchenghh.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_yanchenghh");
    },
    initPlayNode:function()
    {
        var _bgSiyangNode = this.bg_node;

        var _play = _bgSiyangNode.getChildByName("play");

        this.gangBaoNode_yancheng_1 = _play.getChildByName("play_gangbao");

        this.gangBaoNode_yancheng_1.setSelected(true);
        this.gangBaoNode_yancheng_1.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.gangBaoNode_yancheng_1.setSelected(true);
                    this.gangBaoNode_yancheng_2.setSelected(false);
                    break;
            }
        },this);


        this.gangBaoNode_yancheng_2   = _play.getChildByName("play_bugangbao");
        this.gangBaoNode_yancheng_2.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.gangBaoNode_yancheng_1.setSelected(false);
                    this.gangBaoNode_yancheng_2.setSelected(true);
                    break;
            }
        },this);
    },
    setPlayNodeCurrentSelect:function()
    {
        var yangchenghh_xiazui = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_yancheng_gangbao, true);
        if(yangchenghh_xiazui == true)
        {
            this.gangBaoNode_yancheng_1.setSelected(true);
            this.gangBaoNode_yancheng_2.setSelected(false);

        }
        else
        {
            this.gangBaoNode_yancheng_1.setSelected(false);
            this.gangBaoNode_yancheng_2.setSelected(true);
        }
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.YAN_CHENG_HH;
        para.maxPlayer = 4;
        para.gangBao = true;//是否杠爆

        //是否杠爆
        if (this.gangBaoNode_yancheng_1.isSelected())
        {
            para.gangBao = true;

        }
        else if (this.gangBaoNode_yancheng_2.isSelected())
        {
            para.gangBao = false;
        }
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_yancheng_gangbao, para.gangBao);



        //cc.log("------gameType localStorageEncrypt: " + _gameType);
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});