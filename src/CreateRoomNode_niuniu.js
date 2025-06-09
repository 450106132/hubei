/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_niuniu = CreateRoomNode.extend({
    initAll:function()
    {
        this.localStorageKey.KEY_niuniu_diZhu           = "_NIU_NIU_DI_ZHU";        //底注
        this.localStorageKey.KEY_niuniu_zhuang          = "_NIU_NIU_LUN_ZHUANG";    //轮庄
        this.localStorageKey.KEY_niuniu_roleCount       = "_NIU_NIU_ROLE_COUNT";    //人数选择

        this.bg_node = ccs.load("bg_niuniu.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_niuniu");
    },
    initPlayNode:function()
    {
        var _bgNiuniuNode = this.bg_node;
        var _play = _bgNiuniuNode.getChildByName("play");

        this.diZhuNode_niuniu_0 = _play.getChildByName("DiZhu0");
        this.diZhuNode_niuniu_0.getChildByName("text").ignoreContentAdaptWithSize(true);
        this.diZhuNode_niuniu_0.setSelected(true);
        this.diZhuNode_niuniu_0.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.diZhuNode_niuniu_0.setSelected(true);
                    this.diZhuNode_niuniu_1.setSelected(false);
                    this.diZhuNode_niuniu_2.setSelected(false);
                    break;
            }
        },this);

        this.diZhuNode_niuniu_1 = _play.getChildByName("DiZhu1");
        this.diZhuNode_niuniu_1.getChildByName("text").ignoreContentAdaptWithSize(true);
        this.diZhuNode_niuniu_1.setSelected(false);
        this.diZhuNode_niuniu_1.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.diZhuNode_niuniu_0.setSelected(false);
                    this.diZhuNode_niuniu_1.setSelected(true);
                    this.diZhuNode_niuniu_2.setSelected(false);
                    break;
            }
        },this);

        this.diZhuNode_niuniu_2 = _play.getChildByName("DiZhu2");
        this.diZhuNode_niuniu_2.getChildByName("text").ignoreContentAdaptWithSize(true);
        this.diZhuNode_niuniu_2.setSelected(false);
        this.diZhuNode_niuniu_2.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.diZhuNode_niuniu_0.setSelected(false);
                    this.diZhuNode_niuniu_1.setSelected(false);
                    this.diZhuNode_niuniu_2.setSelected(true);
                    break;
            }
        },this);


        /*
         设置庄
         */
        this.zhuangNode_niuniu_0 = _play.getChildByName("zhuang0");
        this.zhuangNode_niuniu_0.getChildByName("text").ignoreContentAdaptWithSize(true);
        this.zhuangNode_niuniu_0.setSelected(true);
        this.zhuangNode_niuniu_0.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.zhuangNode_niuniu_0.setSelected(true);
                    this.zhuangNode_niuniu_1.setSelected(false);
                    this.zhuangNode_niuniu_2.setSelected(false);
                    this.zhuangNode_niuniu_3.setSelected(false);
                    break;
            }
        },this);

        this.zhuangNode_niuniu_1 = _play.getChildByName("zhuang1");
        this.zhuangNode_niuniu_1.getChildByName("text").ignoreContentAdaptWithSize(true);
        this.zhuangNode_niuniu_1.setSelected(false);
        this.zhuangNode_niuniu_1.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.zhuangNode_niuniu_0.setSelected(false);
                    this.zhuangNode_niuniu_1.setSelected(true);
                    this.zhuangNode_niuniu_2.setSelected(false);
                    this.zhuangNode_niuniu_3.setSelected(false);
                    break;
            }
        },this);

        this.zhuangNode_niuniu_2 = _play.getChildByName("zhuang2");
        this.zhuangNode_niuniu_2.getChildByName("text").ignoreContentAdaptWithSize(true);
        this.zhuangNode_niuniu_2.setSelected(false);
        this.zhuangNode_niuniu_2.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.zhuangNode_niuniu_0.setSelected(false);
                    this.zhuangNode_niuniu_1.setSelected(false);
                    this.zhuangNode_niuniu_2.setSelected(true);
                    this.zhuangNode_niuniu_3.setSelected(false);
                    break;
            }
        },this);

        this.zhuangNode_niuniu_3 = _play.getChildByName("zhuang3");
        this.zhuangNode_niuniu_3.getChildByName("text").ignoreContentAdaptWithSize(true);
        this.zhuangNode_niuniu_3.setSelected(false);
        this.zhuangNode_niuniu_3.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.zhuangNode_niuniu_0.setSelected(false);
                    this.zhuangNode_niuniu_1.setSelected(false);
                    this.zhuangNode_niuniu_2.setSelected(false);
                    this.zhuangNode_niuniu_3.setSelected(true);
                    break;
            }
        },this);


        /*
         设置庄
         */
        this.roleNode_niuniu_1 = _play.getChildByName("roleCount0");
        this.roleNode_niuniu_1.getChildByName("text").ignoreContentAdaptWithSize(true);
        this.roleNode_niuniu_1.setSelected(true);
        this.roleNode_niuniu_1.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.roleNode_niuniu_1.setSelected(true);
                    this.roleNode_niuniu_2.setSelected(false);
                    break;
            }
        },this);

        this.roleNode_niuniu_2 = _play.getChildByName("roleCount1");
        this.roleNode_niuniu_2.getChildByName("text").ignoreContentAdaptWithSize(true);
        this.roleNode_niuniu_2.setSelected(false);
        this.roleNode_niuniu_2.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.roleNode_niuniu_1.setSelected(false);
                    this.roleNode_niuniu_2.setSelected(true);
                    break;
            }
        },this);

    },
    setPlayNodeCurrentSelect:function()
    {
        var _currentDiZhu = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_niuniu_diZhu, 0);
        if(_currentDiZhu == 0)
        {
            this.diZhuNode_niuniu_0.setSelected(true);
            this.diZhuNode_niuniu_1.setSelected(false);
            this.diZhuNode_niuniu_2.setSelected(false);
        }
        else if(_currentDiZhu == 1){
            this.diZhuNode_niuniu_0.setSelected(false);
            this.diZhuNode_niuniu_1.setSelected(true);
            this.diZhuNode_niuniu_2.setSelected(false);
        }
        else if(_currentDiZhu == 2){
            this.diZhuNode_niuniu_0.setSelected(false);
            this.diZhuNode_niuniu_1.setSelected(false);
            this.diZhuNode_niuniu_2.setSelected(true);
        }


        //庄
        var _currentZhuang = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_niuniu_zhuang, 0);
        if(_currentZhuang == 0)
        {
            cc.log(" round 4 ");
            this.zhuangNode_niuniu_0.setSelected(true);
            this.zhuangNode_niuniu_1.setSelected(false);
            this.zhuangNode_niuniu_2.setSelected(false);
            this.zhuangNode_niuniu_3.setSelected(false);
        }
        else if(_currentZhuang == 1){
            this.zhuangNode_niuniu_0.setSelected(false);
            this.zhuangNode_niuniu_1.setSelected(true);
            this.zhuangNode_niuniu_2.setSelected(false);
            this.zhuangNode_niuniu_3.setSelected(false);
        }
        else if(_currentZhuang == 2){
            this.zhuangNode_niuniu_0.setSelected(false);
            this.zhuangNode_niuniu_1.setSelected(false);
            this.zhuangNode_niuniu_2.setSelected(true);
            this.zhuangNode_niuniu_3.setSelected(false);
        }
        else if(_currentZhuang == 3){
            this.zhuangNode_niuniu_0.setSelected(false);
            this.zhuangNode_niuniu_1.setSelected(false);
            this.zhuangNode_niuniu_2.setSelected(false);
            this.zhuangNode_niuniu_3.setSelected(true);
        }

        //人数
        var _currentRoleCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_niuniu_roleCount,4);
        if(_currentRoleCount == 4)
        {
            this.roleNode_niuniu_1.setSelected(true);
            this.roleNode_niuniu_2.setSelected(false);
        }else{
            this.roleNode_niuniu_1.setSelected(false);
            this.roleNode_niuniu_2.setSelected(true);
        }
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.NIU_NIU;
        para.diZhu = 1;
        para.zhuangType = 0;// 0轮庄，1，随庄，2，牛牛抢庄，3，房主坐庄
        para.maxPlayer  = 4;//房间人数

        //底注
        if (this.diZhuNode_niuniu_0.isSelected())
        {
            para.diZhu = 1;
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_niuniu_diZhu, 0);
        }
        else if (this.diZhuNode_niuniu_1.isSelected())
        {
            para.diZhu = 2;
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_niuniu_diZhu, 1);
        }
        else if (this.diZhuNode_niuniu_2.isSelected())
        {
            para.diZhu = 5;
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_niuniu_diZhu, 2);
        }

        //庄
        if (this.zhuangNode_niuniu_0.isSelected())
        {
            para.zhuangType = 0;
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_niuniu_zhuang, para.zhuangType);
        }
        else if (this.zhuangNode_niuniu_1.isSelected())
        {
            para.zhuangType = 1;
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_niuniu_zhuang, para.zhuangType);
        }
        else if (this.zhuangNode_niuniu_2.isSelected())
        {
            para.zhuangType = 2;
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_niuniu_zhuang, para.zhuangType);
        }
        else if (this.zhuangNode_niuniu_3.isSelected())
        {
            para.zhuangType = 3;
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_niuniu_zhuang, para.zhuangType);
        }

        //人数
        if (this.roleNode_niuniu_1.isSelected())
        {
            para.maxPlayer = 4;
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_niuniu_roleCount, para.maxPlayer);
        }
        else if (this.roleNode_niuniu_2.isSelected())
        {
            para.maxPlayer = 3;
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_niuniu_roleCount, para.maxPlayer);
        }



        //cc.log("------gameType localStorageEncrypt: " + _gameType);
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});