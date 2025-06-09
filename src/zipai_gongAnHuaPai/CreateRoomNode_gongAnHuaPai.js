/*
* @Author: Administrator
* @Date:   2019-01-04 14:16:49
* @Last Modified by:   zzj
* @Last Modified time: 2020-01-04 16:34:59
*/
//公安花牌
var CreateRoomNode_gongAnHuaPai = CreateRoomNode.extend({
    onExit:function()
    {
        this._super();
    },
    initAll:function()
    {
        this._costName = '元宝';
        
        // 单选
        this.localStorageKey.KEY_GONG_AN_HUA_PAI_maxPlayer = "_gongAnHuaPai_maxPlayer";           // 人数
        this.localStorageKey.KEY_GONG_AN_HUA_PAI_wanFa     = "_gongAnHuaPai_wanFa";               // 玩法
        this.localStorageKey.KEY_GONG_AN_HUA_PAI_jiFen     = "_gongAnHuaPai_jiFen";               // 计分
        this.localStorageKey.KEY_GONG_AN_HUA_PAI_huFen     = "_gongAnHuaPai_huFen";               // 胡分
        this.localStorageKey.KEY_GONG_AN_HUA_PAI_bieGang   = "_gongAnHuaPai_bieGang";             // 别杠
        this.localStorageKey.KEY_GONG_AN_HUA_PAI_dianPao   = "_gongAnHuaPai_dianPao";             // 点炮

        // 复选
        this.localStorageKey.KEY_GONG_AN_HUA_PAI_isNiePai  = "_gongAnHuaPai_isNiePai";            // 捏牌

        this.roundNumObj = {roundNum1:4, roundNum2:8, roundNum3:12};
        this.bg_node = ccs.load("bg_gongAnHuaPai.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg").getChildByName("scroll");
    },
    initPlayNode:function()
    {
        var _play = this.bg_node.getChildByName("play");

        //人数
        var maxPlayerList = [];
        maxPlayerList.push(_play.getChildByName("maxPlayer2"));
        maxPlayerList.push(_play.getChildByName("maxPlayer3"));
        this.initPlayNumNode(maxPlayerList, [2, 3]);
        var maxPlayerCb = function(index, sender) {
            this.setRadioListValid(this.dianPaoList_node, this.dianPaoList_radio, index == 1, 0); //包一家.包二家控制
            this.radioBoxSelectCB(index, sender, this.playerList_node);
        }.bind(this);

        this.maxPlayerList_radio = createRadioBoxForCheckBoxs(maxPlayerList, maxPlayerCb);
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,0,this.maxPlayerList_radio, maxPlayerCb),maxPlayerList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,1,this.maxPlayerList_radio, maxPlayerCb),maxPlayerList[1].getChildByName("text"));
        this.playerList_node = maxPlayerList;

        //玩法
        var wanFaList = [];
        wanFaList.push(_play.getChildByName("wanFa1"));
        wanFaList.push(_play.getChildByName("wanFa2"));
        this.wanFaList_radio = createRadioBoxForCheckBoxs(wanFaList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(wanFaList,0,this.wanFaList_radio),wanFaList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(wanFaList,1,this.wanFaList_radio),wanFaList[1].getChildByName("text"));
        this.wanFaList_node = wanFaList;

        //计分
        var jiFenList = [];
        jiFenList.push(_play.getChildByName("jiFen1"));
        this.jiFenList_radio = createRadioBoxForCheckBoxs(jiFenList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(jiFenList,0,this.jiFenList_radio),jiFenList[0].getChildByName("text"));
        this.jiFenList_node = jiFenList;

        //胡分
        var pnlHuFen = _play.getChildByName("pnl_huFen");
        var huFenList = [];
        huFenList.push(pnlHuFen.getChildByName("huFen1"));
        huFenList.push(pnlHuFen.getChildByName("huFen2"));
        huFenList.push(pnlHuFen.getChildByName("huFen3"));
        this.huFenList_radio = createRadioBoxForCheckBoxs(huFenList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(huFenList,0,this.huFenList_radio),huFenList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(huFenList,1,this.huFenList_radio),huFenList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(huFenList,2,this.huFenList_radio),huFenList[2].getChildByName("text"));
        this.huFenList_node = huFenList;

        //别杠
        var pnlNextOpts = _play.getChildByName("pnl_nextOpts");
        var bieGangList = [];
        bieGangList.push(pnlNextOpts.getChildByName("bieGang1"));
        bieGangList.push(pnlNextOpts.getChildByName("bieGang2"));
        bieGangList.push(pnlNextOpts.getChildByName("bieGang3"));
        this.bieGangList_radio = createRadioBoxForCheckBoxs(bieGangList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(bieGangList,0,this.bieGangList_radio),bieGangList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(bieGangList,1,this.bieGangList_radio),bieGangList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(bieGangList,2,this.bieGangList_radio),bieGangList[2].getChildByName("text"));
        this.bieGangList_node = bieGangList;

        //点炮.包一家/包两家
        var dianPaoList = [];
        dianPaoList.push(pnlNextOpts.getChildByName("dianPao1"));
        dianPaoList.push(pnlNextOpts.getChildByName("dianPao2"));
        this.dianPaoList_radio = createRadioBoxForCheckBoxs(dianPaoList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(dianPaoList,0,this.dianPaoList_radio),dianPaoList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(dianPaoList,1,this.dianPaoList_radio),dianPaoList[1].getChildByName("text"));
        this.dianPaoList_node = dianPaoList;

        //捏牌
        this.isNiePai = pnlNextOpts.getChildByName("niePai");
        this.addListenerText(this.isNiePai);
        this.isNiePai.addEventListener(this.clickCB, this.isNiePai);

        this.difenAry = [0.5, 1, 2, 3, 5, 10, 20, 30, 50];
        this.initExtraPlayNode(_play);
    },

    setPlayNodeCurrentSelect:function(atClub)
    {
        var _play = this.bg_node.getChildByName("play");
        
        //人数
        var _maxPlayer;
        if (atClub){ 
            var temp_maxPlayer = this.getNumberItem("maxPlayer", 2);
            _maxPlayer = [2, 3].indexOf(temp_maxPlayer);
        }
        else {
            _maxPlayer = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_maxPlayer, 0);
        }
        this.maxPlayerList_radio.selectItem(_maxPlayer);
        this.radioBoxSelectCB(_maxPlayer,this.playerList_node[_maxPlayer],this.playerList_node);

        //玩法
        var _wanFa;
        if (atClub){ 
            _wanFa = [3, 5].indexOf(this.getNumberItem("jingNum", 3));
        }
        else {
            _wanFa = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_wanFa, 0);
        }
        this.wanFaList_radio.selectItem(_wanFa);
        this.radioBoxSelectCB(_wanFa,this.wanFaList_node[_wanFa],this.wanFaList_node);

        //计分
        var _jiFen;
        if(atClub){
            //var jiFen = this.getNumberItem("jiHuType", 1); //没有额外取字段.用jiHuType作判断.//计胡类型 1：一胡一分 2：逢1就包 3：2舍3入 4：按坡计分
            //_jiFen = jiFen > 3 ? 0 : (jiFen - 1);
            _jiFen = 0; //单选
        }
        else{
            _jiFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_jiFen, 0); 
        }
        this.jiFenList_radio.selectItem(_jiFen);
        this.radioBoxSelectCB(_jiFen,this.jiFenList_node[_jiFen],this.jiFenList_node);

        //胡分
        var _huFen;
        if(atClub){
            var jiFen = this.getNumberItem("jiHuType", 1);
            _huFen = jiFen > 3 ? 0 : (jiFen - 1);
        }
        else{
            _huFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_huFen, 0); 
        }
        this.huFenList_radio.selectItem(_huFen);
        this.radioBoxSelectCB(_huFen,this.huFenList_node[_huFen],this.huFenList_node);

        //别杠
        var _bieGang;
        if (atClub){ 
            _bieGang = this.getNumberItem("bieGangNum", 0);
        }
        else {
            _bieGang = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_bieGang, 0);
        }
        this.bieGangList_radio.selectItem(_bieGang);
        this.radioBoxSelectCB(_bieGang,this.bieGangList_node[_bieGang],this.bieGangList_node);
        
        //点炮类型.包一家/包两家
        var _dianPao;
        if (atClub){ 
            _dianPao = this.getNumberItem("baoPai", 0);
        }
        else {
            _dianPao = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_dianPao, 0);
        }
        this.dianPaoList_radio.selectItem(_dianPao);
        this.radioBoxSelectCB(_dianPao,this.dianPaoList_node[_dianPao],this.dianPaoList_node);

        //捏牌
        var isNiePai;
        if (atClub) 
            isNiePai = this.getBoolItem("isNiePai", false);
        else
            isNiePai = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_isNiePai, false);
        this.isNiePai.setSelected(isNiePai);
        this.selectedCB(this.isNiePai.getChildByName("text"), isNiePai);

        this.setRadioListValid(this.dianPaoList_node, this.dianPaoList_radio, _maxPlayer == 1, 0); //包一家.包二家控制

        //底分
        this.setExtraPlayNodeCurrentSelect(atClub);
    },

    setNodeValid:function(node, isValid) {
        if (!cc.sys.isObjectValid(node))
            return;
        node.setEnabled(isValid);
        //去掉选中状态
        if (!isValid) {
            node.setSelected(false);
        }
        var selectColor = this._selectColor;
        var unSelectColor = this._unSelectColor;
        var unEnableColor = cc.color(191,191,191);
        var cur = isValid ? (node.isSelected() ? selectColor : unSelectColor) : unEnableColor;
        var txt =  node.getChildByName("text");
        txt.setTextColor(cur); 
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
        para.maxPlayer = [2, 3][maxPlayerIdx]; 

        para.jingNum = [3, 5][this.wanFaList_radio.getSelectIndex()];
        para.jiHuType = this.huFenList_radio.getSelectIndex() + 1;
        para.bieGangNum = this.bieGangList_radio.getSelectIndex();
        para.isNiePai = this.isNiePai.isSelected();
        para.baoPai = para.maxPlayer == 2 ? 0 : this.dianPaoList_radio.getSelectIndex();
        
        this.getExtraSelectedPara(para);

        para.gameType = MjClient.GAME_TYPE.GONG_AN_HUA_PAI;
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
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_maxPlayer, this.maxPlayerList_radio.getSelectIndex()); 
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_wanFa, this.wanFaList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_jiFen, this.jiFenList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_huFen, this.huFenList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_bieGang, this.bieGangList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_dianPao, para.baoPai);
            
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_GONG_AN_HUA_PAI_isNiePai, para.isNiePai);
        }
    },

    changeAAPayForPlayerNum:function()
    {
        this.setDiaNumData(this.bg_node);
    }
});