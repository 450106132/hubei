/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_HA14D = CreateRoomNode.extend({
    initAll:function()
    {
        this.localStorageKey.KEY_huaian14dun_duohu        = "_HUAI_AN_14_DUN_CAN_DUO_HU";   //多胡
        this.localStorageKey.KEY_huaian14dun_zhongfabai   = "_HUAI_AN_14_DUN_ZHONG_FA_BAI";   //中发白
        this.localStorageKey.KEY_huaian14dun_canGang        = "_HUAI_AN_14_DUN_CAN_GANG_SCORE";   //杠牌有分
        this.localStorageKey.KEY_huaian14dun_getGang   = "_HUAI_AN_14_DUN_GET_GANG_SCORE";   //杠牌直接得分

        this.bg_node = ccs.load("bg_HA14D.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_HA14D");
    },
    initPlayNode:function()
    {
        var _bgHuaian14dunNode = this.bg_node;


        //是否多胡
        var _play = _bgHuaian14dunNode.getChildByName("play");
        this._playNode_isDuohu_1 = _play.getChildByName("jiehu");
        this._playNode_isDuohu_1.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this._playNode_isDuohu_1.setSelected(true);
                    this._playNode_isDuohu_2.setSelected(false);
                    break;
            }
        },this);

        this._playNode_isDuohu_2 = _play.getChildByName("duohu");
        this._playNode_isDuohu_2.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this._playNode_isDuohu_1.setSelected(false);
                    this._playNode_isDuohu_2.setSelected(true);
                    break;
            }
        },this);


        //中发白
        this._playNode_zhongfabai1 = _play.getChildByName("zhongfabai_1");
        this._playNode_zhongfabai1.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this._playNode_zhongfabai1.setSelected(true);
                    this._playNode_zhongfabai2.setSelected(false);
                    this._playNode_zhongfabai3.setSelected(false);
                    break;
            }
        },this);

        this._playNode_zhongfabai2 = _play.getChildByName("zhongfabai_2");
        this._playNode_zhongfabai2.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this._playNode_zhongfabai1.setSelected(false);
                    this._playNode_zhongfabai2.setSelected(true);
                    this._playNode_zhongfabai3.setSelected(false);
                    break;
            }
        },this);

        this._playNode_zhongfabai3 = _play.getChildByName("zhongfabai_3");
        this._playNode_zhongfabai3.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this._playNode_zhongfabai1.setSelected(false);
                    this._playNode_zhongfabai2.setSelected(false);
                    this._playNode_zhongfabai3.setSelected(true);
                    break;
            }
        },this);

        //杠牌有分
        this._playNode_canGang = _play.getChildByName("canGang");
        //杠牌直接得分
        this._playNode_getGang = _play.getChildByName("getGang");

        this._playNode_canGang.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    this._playNode_getGang.setVisible(true);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this._playNode_getGang.setVisible(false);
                    this._playNode_getGang.setSelected(false);
                    break;
            }
        },this);
    },
    setPlayNodeCurrentSelect:function()
    {
        var _huaianduohu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaian14dun_duohu,false);
        if(_huaianduohu)
        {
            this._playNode_isDuohu_1.setSelected(false);
            this._playNode_isDuohu_2.setSelected(true);
        }
        else
        {
            this._playNode_isDuohu_1.setSelected(true);
            this._playNode_isDuohu_2.setSelected(false);
        }

        var _huaianzhongfabai = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaian14dun_zhongfabai,1);
        if(_huaianzhongfabai == 1)
        {
            this._playNode_zhongfabai1.setSelected(true);
            this._playNode_zhongfabai2.setSelected(false);
            this._playNode_zhongfabai3.setSelected(false);
        }else if(_huaianzhongfabai == 2){
            this._playNode_zhongfabai1.setSelected(false);
            this._playNode_zhongfabai2.setSelected(true);
            this._playNode_zhongfabai3.setSelected(false);
        }else {
            this._playNode_zhongfabai1.setSelected(false);
            this._playNode_zhongfabai2.setSelected(false);
            this._playNode_zhongfabai3.setSelected(true);
        }

        var _huaianCanGang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaian14dun_canGang,false);
        if(_huaianCanGang)
        {
            this._playNode_canGang.setSelected(true);
            this._playNode_getGang.setVisible(true);
        }else{
            this._playNode_canGang.setSelected(false);
            this._playNode_getGang.setVisible(false);
            this._playNode_getGang.setSelected(false);
        }

        var _huaianGetGang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaian14dun_getGang,false);
        if(_huaianGetGang)
        {
            this._playNode_getGang.setSelected(true);
        }else{
            this._playNode_getGang.setSelected(false);
        }

    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.HA_14DUN;
        para.maxPlayer = 4;
        //para.flowerType = WithFlowerType.noFlower;
        para.duoHu = false;//是否多胡
        para.zhongfabai = 1;//是否带中发白
        para.canGangScore = false;//杠牌有分
        para.getGangScore = false;//杠牌直接得分


        if(this._playNode_isDuohu_1.isSelected())
        {
            para.duoHu = false;
        }
        else if(this._playNode_isDuohu_2.isSelected())
        {
            para.duoHu = true;//多胡
        }
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huaian14dun_duohu,para.duoHu);

        //中发白
        if(this._playNode_zhongfabai1.isSelected()){
            para.zhongfabai = 1;
        }else if(this._playNode_zhongfabai2.isSelected()){
            para.zhongfabai = 2;
        }else {
            para.zhongfabai = 3;
        }
        util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaian14dun_zhongfabai,para.zhongfabai);

        //杠牌有分
        para.canGangScore = this._playNode_canGang.isSelected();
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huaian14dun_canGang,para.canGangScore);

        //杠牌直接得分
        para.getGangScore = this._playNode_getGang.isSelected();
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huaian14dun_getGang,para.getGangScore);

        //cc.log("------gameType localStorageEncrypt: " + _gameType);
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});