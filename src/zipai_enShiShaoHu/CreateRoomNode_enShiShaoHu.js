/*
* @Author: Administrator
* @Date:   2019-01-04 14:16:49
* @Last Modified by:   zzj
* @Last Modified time: 2020-01-04 16:34:59
*/
//公安花牌
var CreateRoomNode_enShiShaoHu = CreateRoomNode.extend({
    onExit:function()
    {
        this._super();
    },
    initAll:function()
    {
        this._costName = '元宝';
        
        // 单选
        this.localStorageKey.KEY_EN_SHI_SHAO_HU_maxPlayer = "_enShiShaoHu_maxPlayer";           // 人数
        this.localStorageKey.KEY_EN_SHI_SHAO_HU_qiangShu     = "_enShiShaoHu_qiangShu";               // 枪数

        this.bg_node = ccs.load("bg_enShiShaoHu.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg").getChildByName("scroll");
    },
    initPlayNode:function()
    {
        var _play = this.bg_node.getChildByName("play");

        //人数
        var maxPlayerList = [];
        maxPlayerList.push(_play.getChildByName("maxPlayer1"));

        this.maxPlayerList_radio = createRadioBoxForCheckBoxs(maxPlayerList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,0,this.maxPlayerList_radio),maxPlayerList[0].getChildByName("text"));
        this.maxPlayerList = maxPlayerList;

        //人数
        var maxPlayerList = [];
        maxPlayerList.push(_play.getChildByName("maxPlayer1"));
        this.initPlayNumNode(maxPlayerList, [3]);

        var maxPlayerSelectCb = function(index,sender, list){
            this.radioBoxSelectCB(index,sender, maxPlayerList);
        }.bind(this);

        this.maxPlayerList_radio = createRadioBoxForCheckBoxs(maxPlayerList, maxPlayerSelectCb);
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,0,this.maxPlayerList_radio, maxPlayerSelectCb),maxPlayerList[0].getChildByName("text"));

        var qiangShuList = [];
        qiangShuList.push(_play.getChildByName("qiangshu1"));
        qiangShuList.push(_play.getChildByName("qiangshu2"));
        qiangShuList.push(_play.getChildByName("qiangshu3"));
        this.qiangShuList_radio = createRadioBoxForCheckBoxs(qiangShuList,this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(qiangShuList,0,this.qiangShuList_radio),qiangShuList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(qiangShuList,1,this.qiangShuList_radio),qiangShuList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(qiangShuList,2,this.qiangShuList_radio),qiangShuList[2].getChildByName("text"));
        this.qiangShuList = qiangShuList;
    },

    setPlayNodeCurrentSelect:function(atClub)
    {
        var _play = this.bg_node.getChildByName("play");
        
        //人数
        var _maxPlayerIndex;
        if (atClub){
            _maxPlayerIndex = [3].indexOf(this.getNumberItem("maxPlayer", 3));
        }
        else {
            _maxPlayerIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_EN_SHI_SHAO_HU_maxPlayer, 0);
        }
        this.maxPlayerList_radio.selectItem(_maxPlayerIndex);
        this.radioBoxSelectCB(_maxPlayerIndex,this.maxPlayerList[_maxPlayerIndex],this.maxPlayerList);

        //人数
        var qiangShuIndex;
        if (atClub){
            qiangShuIndex = this.getNumberItem("hongQiangType", 0);
        }
        else {
            qiangShuIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_EN_SHI_SHAO_HU_qiangShu, 0);
        }
        this.qiangShuList_radio.selectItem(qiangShuIndex);
        this.radioBoxSelectCB(qiangShuIndex,this.qiangShuList[qiangShuIndex],this.qiangShuList);
    },

    getSelectedPara:function()
    {
        var para = {};
        para.maxPlayer = [3][this.maxPlayerList_radio.getSelectIndex()];
        para.hongQiangType = this.qiangShuList_radio.getSelectIndex();
        para.gameType = MjClient.GAME_TYPE.EN_SHI_SHAO_HU;
        return para;
    },
    createRoom:function()
    {
        var para = this.getSelectedPara();
        this.savePara(para);
        this._super();
    },

    savePara : function(para){
        if (!this._isFriendCard){
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_EN_SHI_SHAO_HU_maxPlayer, this.maxPlayerList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_EN_SHI_SHAO_HU_qiangShu, this.qiangShuList_radio.getSelectIndex());
        }
    },

    changeAAPayForPlayerNum:function()
    {
        this.setDiaNumData(this.bg_node);
    }
});