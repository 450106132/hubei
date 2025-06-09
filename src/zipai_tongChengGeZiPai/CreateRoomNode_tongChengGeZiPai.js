/*
* @Author: Administrator
* @Date:   2019-12-23 17:36:49
* @Last Modified by:   zzj
* @Last Modified time: 2020-01-13 10:41:08
*/
//湖北花牌
var CreateRoomNode_tongChengGeZiPai = CreateRoomNode.extend({
    onExit:function()
    {
        this._super();
    },
    initAll:function()
    {
        this._costName = '元宝';
        
        // 单选
        this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_maxPlayer = "_tongChengGeZiPai_maxPlayer";           // 人数
        this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_qiHu      = "_tongChengGeZiPai_qiHu";                // 起胡
        this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_diFen     = "_tongChengGeZiPai_diFen";               // 底分
        this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_huaNum    = "_tongChengGeZiPai_huNum";               // 花数
        this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_paoType   = "_tongChengGeZiPai_paoType";              // 跑类型
        this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_paoFen    = "_tongChengGeZiPai_paoFen";              // 跑分

        // 复选
        this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_isYiPaoDuoXiang   = "_tongChengGeZiPai_isYiPaoDuoXiang";   // 一炮多响
        this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_isKeHuanGuanHu    = "_tongChengGeZiPai_isKeHuanGuanHu";    // 可换观胡

        this.roundNumObj = {roundNum1:8, roundNum2:10};
        this.bg_node = ccs.load("bg_tongChengGeZiPai.json").node;
        this.addChild(this.bg_node);

        //隐藏积分底分
        var diFen = this.bg_node.getChildByName("bg").getChildByName('jieSuanDiFen');
        diFen.visible = false;
        
        this.bg_node = this.bg_node.getChildByName("bg").getChildByName("scroll");
    },
    initPlayNode:function()
    {
        var _play = this.bg_node.getChildByName("play");

        //人数
        var maxPlayerList = [];
        maxPlayerList.push(_play.getChildByName("maxPlayer2"));
        maxPlayerList.push(_play.getChildByName("maxPlayer3"));
        this.initPlayNumNode(maxPlayerList, [3, 4]);
        var maxPlayerCb = function(index, sender) {
            this.setQiHuStates(index);
            this.radioBoxSelectCB(index, sender, this.playerList_node);
        }.bind(this);

        this.maxPlayerList_radio = createRadioBoxForCheckBoxs(maxPlayerList, maxPlayerCb);
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,0,this.maxPlayerList_radio, maxPlayerCb),maxPlayerList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,1,this.maxPlayerList_radio, maxPlayerCb),maxPlayerList[1].getChildByName("text"));
        this.playerList_node = maxPlayerList;

        //起胡
        var qiHuList = [];
        qiHuList.push(_play.getChildByName("qiHu1"));
        qiHuList.push(_play.getChildByName("qiHu2"));
        this.qiHuList_radio = createRadioBoxForCheckBoxs(qiHuList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(qiHuList,0,this.qiHuList_radio),qiHuList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(qiHuList,1,this.qiHuList_radio),qiHuList[1].getChildByName("text"));
        this.qiHuList_node = qiHuList;

        //底分
        var diFenList = [];
        diFenList.push(_play.getChildByName("diFen1"));
        diFenList.push(_play.getChildByName("diFen2"));
        diFenList.push(_play.getChildByName("diFen3"));
        diFenList.push(_play.getChildByName("diFen4"));
        diFenList.push(_play.getChildByName("diFen5"));
        this.diFenList_radio = createRadioBoxForCheckBoxs(diFenList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(diFenList,0,this.diFenList_radio),diFenList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(diFenList,1,this.diFenList_radio),diFenList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(diFenList,2,this.diFenList_radio),diFenList[2].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(diFenList,3,this.diFenList_radio),diFenList[3].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(diFenList,4,this.diFenList_radio),diFenList[4].getChildByName("text"));
        this.diFenList_node = diFenList;

        //花
        var pnlWanFa1 = _play.getChildByName('pnl_wanFa1');
        var huaList = [];
        huaList.push(pnlWanFa1.getChildByName("wanFa1"));
        huaList.push(pnlWanFa1.getChildByName("wanFa2"));
        this.huaList_radio = createRadioBoxForCheckBoxs(huaList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(huaList,0,this.huaList_radio),huaList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(huaList,1,this.huaList_radio),huaList[1].getChildByName("text"));
        this.huaList_node = huaList;

        //带跑.定跑
        var pnlWanFa2 = _play.getChildByName("pnl_wanFa2");
        var paoTypeList = [];
        paoTypeList.push(pnlWanFa2.getChildByName("daiPao"));
        paoTypeList.push(pnlWanFa2.getChildByName("dingPao"));
        var paoTypeCb = function(index, sender) {
            this.setRadioListValid(this.paoFenList_node, this.paoFenList_radio, index == 0, 0);
            this.radioBoxSelectCB(index, sender, this.paoTypeList_node);
        }.bind(this);
        this.paoTypeList_radio = createRadioBoxForCheckBoxs(paoTypeList, paoTypeCb);
        cc.eventManager.addListener(this.setTextClick(paoTypeList,0,this.paoTypeList_radio,paoTypeCb),paoTypeList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(paoTypeList,1,this.paoTypeList_radio,paoTypeCb),paoTypeList[1].getChildByName("text"));
        this.paoTypeList_node = paoTypeList;

        //跑分
        var paoFenList = [];
        paoFenList.push(pnlWanFa2.getChildByName("paoFen1"));
        paoFenList.push(pnlWanFa2.getChildByName("paoFen2"));
        paoFenList.push(pnlWanFa2.getChildByName("paoFen3"));
        this.paoFenList_radio = createRadioBoxForCheckBoxs(paoFenList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(paoFenList,0,this.paoFenList_radio),paoFenList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(paoFenList,1,this.paoFenList_radio),paoFenList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(paoFenList,2,this.paoFenList_radio),paoFenList[2].getChildByName("text"));
        this.paoFenList_node = paoFenList;

        //一炮多响
        this.isYiPaoDuoXiang = pnlWanFa1.getChildByName("yiPaoDuoXiang");
        this.addListenerText(this.isYiPaoDuoXiang);
        this.isYiPaoDuoXiang.addEventListener(this.clickCB, this.isYiPaoDuoXiang);

        //可换观胡
        this.isKeHuanGuanHu = pnlWanFa2.getChildByName("keHuanGuanHu");
        this.addListenerText(this.isKeHuanGuanHu);
        this.isKeHuanGuanHu.addEventListener(this.clickCB, this.isKeHuanGuanHu);
    },

    setPlayNodeCurrentSelect:function(atClub)
    {
        var _play = this.bg_node.getChildByName("play");
        
        //人数
        var _maxPlayer;
        if (atClub){ 
            var temp_maxPlayer = this.getNumberItem("maxPlayer", 4);
            _maxPlayer = [3, 4].indexOf(temp_maxPlayer);
        }
        else {
            _maxPlayer = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_maxPlayer, 1);
        }
        this.maxPlayerList_radio.selectItem(_maxPlayer);
        this.radioBoxSelectCB(_maxPlayer,this.playerList_node[_maxPlayer],this.playerList_node);
        
        //起胡
        var _qiHu;
        if (atClub){ 
            _qiHu = this.getNumberItem("qiHu", 1);
        }
        else {
            _qiHu = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_qiHu, 1);
        }
        if (_maxPlayer == 1) {
            _qiHu = 0; //4人玩法默认选中7胡.且不可选
        }
        this.qiHuList_radio.selectItem(_qiHu);
        this.radioBoxSelectCB(_qiHu,this.qiHuList_node[_qiHu],this.qiHuList_node);
        this.setQiHuStates(_maxPlayer);

        //底分
        var _diFen;
        if(atClub){
            _diFen = [1, 2, 3, 4, 5].indexOf(this.getNumberItem("diFen", 1));
        }
        else{
            _diFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_diFen, 0); 
        }
        this.diFenList_radio.selectItem(_diFen);
        this.radioBoxSelectCB(_diFen,this.diFenList_node[_diFen],this.diFenList_node);

        //花type
        var _hua;
        if(atClub){
            _hua = this.getNumberItem("huaType", 0);
        }
        else{
            _hua = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_huaNum, 0); 
        }
        this.huaList_radio.selectItem(_hua);
        this.radioBoxSelectCB(_hua,this.huaList_node[_hua],this.huaList_node);

        //跑type
        var _pao;
        if (atClub){ 
            _pao = this.getNumberItem("piaoType", 0);
        }
        else {
            _pao = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_paoType, 0);
        }
        this.paoTypeList_radio.selectItem(_pao);
        this.radioBoxSelectCB(_pao,this.paoTypeList_node[_pao],this.paoTypeList_node);
        
        //跑分
        var _paoFen;
        if (atClub){ 
            _paoFen = [1, 2, 3].indexOf(this.getNumberItem("piaoFen", 1));
        }
        else {
            _paoFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_paoFen, 0);
        }
        this.paoFenList_radio.selectItem(_paoFen);
        this.radioBoxSelectCB(_paoFen,this.paoFenList_node[_paoFen],this.paoFenList_node);
        //跑type控制跑分选项
        this.setRadioListValid(this.paoFenList_node, this.paoFenList_radio, _pao == 0, 0);

        //一炮多响
        var isYiPaoDuoXiang;
        if (atClub) 
            isYiPaoDuoXiang = this.getBoolItem("isYiPaoDuoXiang", false);
        else
            isYiPaoDuoXiang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_isYiPaoDuoXiang, false);
        this.isYiPaoDuoXiang.setSelected(isYiPaoDuoXiang);
        this.selectedCB(this.isYiPaoDuoXiang.getChildByName("text"), isYiPaoDuoXiang);

        //可换观胡
        var isKeHuanGuanHu;
        if (atClub) 
            isKeHuanGuanHu = this.getBoolItem("isKeGuanHu", true);
        else
            isKeHuanGuanHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_isKeHuanGuanHu, true);
        this.isKeHuanGuanHu.setSelected(isKeHuanGuanHu);
        this.selectedCB(this.isKeHuanGuanHu.getChildByName("text"), isKeHuanGuanHu);
    },

    setQiHuStates:function(index) {
        var selectColor = this._selectColor;
        var unSelectColor = this._unSelectColor;
        var unEnableColor = cc.color(191,191,191);
        var cur = index == 1 ? 0 : this.qiHuList_radio.getSelectIndex();
        var node = this.qiHuList_node[1];
        this.qiHuList_radio.selectItem(cur);
        this.radioBoxSelectCB(0, this.qiHuList_node[cur], this.qiHuList_node);
        node.setEnabled(index == 0);
        node.getChildByName('text').setTextColor(index == 1 ? unEnableColor : (cur == 1 ? selectColor : unSelectColor));
    },

    setRadioListValid:function(nodeList, radioList, isValid, defaultIdx) {
        if (!nodeList || nodeList.length == 0 || !radioList)
            return;
        if (!isValid) {
            radioList.selectItem(defaultIdx);
        } else {
            var idx = radioList.getSelectIndex() || defaultIdx;
            this.radioBoxSelectCB(idx, nodeList[idx], nodeList);
        }
        for (var i = 0; i < nodeList.length; i++) {
            nodeList[i].setEnabled(isValid);
            var txt =  nodeList[i].getChildByName("text");
            if (!isValid) {
                txt.setTextColor(cc.color(191,191,191)); 
            }
        }
    },

    getSelectedPara:function()
    {
        var para = {};
        var maxPlayerIdx = this.maxPlayerList_radio.getSelectIndex();
        para.maxPlayer = [3, 4][maxPlayerIdx]; 
        para.qiHu = para.maxPlayer == 4 ? 0 : this.qiHuList_radio.getSelectIndex();
        para.diFen = [1,2,3,4,5][this.diFenList_radio.getSelectIndex()];
        para.huaType = this.huaList_radio.getSelectIndex();
        para.piaoType = this.paoTypeList_radio.getSelectIndex();
        para.piaoFen = para.piaoType == 1 ? 1 : [1,2,3][this.paoFenList_radio.getSelectIndex()];
        para.isYiPaoDuoXiang = this.isYiPaoDuoXiang.isSelected();
        para.isKeGuanHu = this.isKeHuanGuanHu.isSelected();

        para.gameType = MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI;
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
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_maxPlayer, this.maxPlayerList_radio.getSelectIndex()); 
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_qiHu, para.qiHu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_diFen, this.diFenList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_huaType, this.huaList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_paoType, this.paoTypeList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_paoFen, this.paoFenList_radio.getSelectIndex());
            
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_isYiPaoDuoXiang, para.isYiPaoDuoXiang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_TONG_CHENG_GE_ZI_PAI_isKeHuanGuanHu, para.isKeGuanHu);
        }
    },

    changeAAPayForPlayerNum:function()
    {
        this.setDiaNumData(this.bg_node);
    }
});