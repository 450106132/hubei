/*
* @Author: Administrator
* @Date:   2019-12-23 17:36:49
* @Last Modified by:   zzj
* @Last Modified time: 2020-01-02 15:54:08
*/
//湖北花牌
var CreateRoomNode_huBeiHuaPai = CreateRoomNode.extend({
    onExit:function()
    {
        this._super();
    },
    initAll:function()
    {
        this._costName = '元宝';
        
        // 单选
        this.localStorageKey.KEY_HU_BEI_HUA_PAI_maxPlayer = "_huBeiHuaPai_maxPlayer";           // 人数
        this.localStorageKey.KEY_HU_BEI_HUA_PAI_wanFa     = "_huBeiHuaPai_wanFa";               // 玩法
        this.localStorageKey.KEY_HU_BEI_HUA_PAI_jiFen     = "_huBeiHuaPai_jiFen";               // 计分
        this.localStorageKey.KEY_HU_BEI_HUA_PAI_huFen     = "_huBeiHuaPai_huFen";               // 胡分
        this.localStorageKey.KEY_HU_BEI_HUA_PAI_bieGang   = "_huBeiHuaPai_bieGang";             // 别杠
        this.localStorageKey.KEY_HU_BEI_HUA_PAI_jiaJing   = "_huBeiHuaPai_jiaJing";             // 加精

        // 复选
        this.localStorageKey.KEY_HU_BEI_HUA_PAI_isBiHu    = "_huBeiHuaPai_isBiHu";              // 有胡必胡
        this.localStorageKey.KEY_HU_BEI_HUA_PAI_isZiMo    = "_huBeiHuaPai_isZiMo";              // 自摸胡
        this.localStorageKey.KEY_HU_BEI_HUA_PAI_isGanTa   = "_huBeiHuaPai_isGanTa";             // 赶踏不胡
        this.localStorageKey.KEY_HU_BEI_HUA_PAI_isDeskJing  = "_huBeiHuaPai_isDeskJing";        // 桌面精不算主精
        this.localStorageKey.KEY_HU_BEI_HUA_PAI_isBaoChong  = "_huBeiHuaPai_isBaoChong";        // 包铳

        this.roundNumObj = {roundNum1:4, roundNum2:8, roundNum3:12};
        this.bg_node = ccs.load("bg_huBeiHuaPai.json").node;
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
            //this.isBaoChong.visible = index == 1;  //不用显隐, 改为置灰
            this.setBaoChongValid();
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
        var wanFaCb = function(index, sender) {
            //this.isDeskJing.visible = index == 1;  //不用显隐, 改为置灰
            this.setDeskJingValid();
            this.radioBoxSelectCB(index, sender, this.wanFaList_node);
        }.bind(this);
        this.wanFaList_radio = createRadioBoxForCheckBoxs(wanFaList, wanFaCb);
        cc.eventManager.addListener(this.setTextClick(wanFaList,0,this.wanFaList_radio,wanFaCb),wanFaList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(wanFaList,1,this.wanFaList_radio,wanFaCb),wanFaList[1].getChildByName("text"));
        this.wanFaList_node = wanFaList;

        //计分
        var jiFenList = [];
        jiFenList.push(_play.getChildByName("jiFen1"));
        jiFenList.push(_play.getChildByName("jiFen2"));
        var jiFenCb = function(index, sender) {
            this.setRadioListValid(this.huFenList_node, this.huFenList_radio, index == 0, 0);
            this.radioBoxSelectCB(index, sender, this.jiFenList_node);
        }.bind(this);
        this.jiFenList_radio = createRadioBoxForCheckBoxs(jiFenList, jiFenCb);
        cc.eventManager.addListener(this.setTextClick(jiFenList,0,this.jiFenList_radio,jiFenCb),jiFenList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(jiFenList,1,this.jiFenList_radio,jiFenCb),jiFenList[1].getChildByName("text"));
        this.jiFenList_node = jiFenList;

        //胡分
        var pnlHuFen = _play.getChildByName("pnl_huFen");
        //this.pnlHuFen = pnlHuFen;
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
        //this.pnlNextOpts = pnlNextOpts;
        var bieGangList = [];
        bieGangList.push(pnlNextOpts.getChildByName("bieGang1"));
        bieGangList.push(pnlNextOpts.getChildByName("bieGang2"));
        bieGangList.push(pnlNextOpts.getChildByName("bieGang3"));
        var bieGangCb = function(index, sender) {
            this.updateBieGangEnable(index != 0);
            this.radioBoxSelectCB(index, sender, this.bieGangList_node);
        }.bind(this);
        this.bieGangList_radio = createRadioBoxForCheckBoxs(bieGangList, bieGangCb);
        cc.eventManager.addListener(this.setTextClick(bieGangList,0,this.bieGangList_radio,bieGangCb),bieGangList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(bieGangList,1,this.bieGangList_radio,bieGangCb),bieGangList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(bieGangList,2,this.bieGangList_radio,bieGangCb),bieGangList[2].getChildByName("text"));
        this.bieGangList_node = bieGangList;

        //加精
        var jiaJingList = [];
        jiaJingList.push(pnlNextOpts.getChildByName("jiaJing1"));
        jiaJingList.push(pnlNextOpts.getChildByName("jiaJing2"));
        jiaJingList.push(pnlNextOpts.getChildByName("jiaJing3"));
        this.jiaJingList_radio = createRadioBoxForCheckBoxs(jiaJingList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(jiaJingList,0,this.jiaJingList_radio),jiaJingList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(jiaJingList,1,this.jiaJingList_radio),jiaJingList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(jiaJingList,2,this.jiaJingList_radio),jiaJingList[2].getChildByName("text"));
        this.jiaJingList_node = jiaJingList;

        //有胡必胡
        this.isBiHu = pnlNextOpts.getChildByName("youHuBiHu");
        this.addListenerText(this.isBiHu);
        this.isBiHu.addEventListener(this.clickCB, this.isBiHu);

        //自摸胡
        this.isZiMo = pnlNextOpts.getChildByName("ziMoHu");
        this.addListenerText(this.isZiMo);
        this.isZiMo.addEventListener(this.clickCB, this.isZiMo);

        //赶踏不胡
        this.isGanTa = pnlNextOpts.getChildByName("ganTaBuHu");
        this.addListenerText(this.isGanTa);
        this.isGanTa.addEventListener(this.clickCB, this.isGanTa);

        //桌面精
        this.isDeskJing = pnlNextOpts.getChildByName("zhuoMianJing"); 
        this.addListenerText(this.isDeskJing);
        this.isDeskJing.addEventListener(this.clickCB, this.isDeskJing);

        //包铳
        this.isBaoChong = pnlNextOpts.getChildByName("baoChong");
        this.addListenerText(this.isBaoChong);
        this.isBaoChong.addEventListener(this.clickCB, this.isBaoChong);

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
            _maxPlayer = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_maxPlayer, 0);
        }
        this.maxPlayerList_radio.selectItem(_maxPlayer);
        this.radioBoxSelectCB(_maxPlayer,this.playerList_node[_maxPlayer],this.playerList_node);
        //this.isBaoChong.visible = _maxPlayer == 1;
        
        //玩法
        var _wanFa;
        if (atClub){ 
            _wanFa = [3, 5].indexOf(this.getNumberItem("jingNum", 3));
        }
        else {
            _wanFa = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_wanFa, 0);
        }
        this.wanFaList_radio.selectItem(_wanFa);
        this.radioBoxSelectCB(_wanFa,this.wanFaList_node[_wanFa],this.wanFaList_node);
        //this.isDeskJing.visible = _wanFa == 1;

        //计分
        var _jiFen;
        if(atClub){
            var jiFen = this.getNumberItem("jiHuType", 1); //没有额外取字段.用jiHuType作判断.//计胡类型 1：一胡一分 2：逢1就包 3：2舍3入 4：按坡计分
            _jiFen = jiFen == 4 ? 1 : 0;
        }
        else{
            _jiFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_jiFen, 0); 
        }
        this.jiFenList_radio.selectItem(_jiFen);
        this.radioBoxSelectCB(_jiFen,this.jiFenList_node[_jiFen],this.jiFenList_node);

        //胡分
        var _huFen;
        if(atClub){
            var jiFen = this.getNumberItem("jiHuType", 1);
            _huFen = jiFen == 4 ? 0 : (jiFen - 1);
        }
        else{
            _huFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_huFen, 0); 
        }
        this.huFenList_radio.selectItem(_huFen);
        this.radioBoxSelectCB(_huFen,this.huFenList_node[_huFen],this.huFenList_node);

        //根据计分和胡分决定胡分选项的状态
        this.setRadioListValid(this.huFenList_node, this.huFenList_radio, _jiFen == 0, 0);

        //别杠
        var _bieGang;
        if (atClub){ 
            _bieGang = this.getNumberItem("bieGangNum", 0);
        }
        else {
            _bieGang = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_bieGang, 0);
        }
        this.bieGangList_radio.selectItem(_bieGang);
        this.radioBoxSelectCB(_bieGang,this.bieGangList_node[_bieGang],this.bieGangList_node);
        
        //加精
        var _jiaJing;
        if (atClub){ 
            var jiaJingNum = this.getNumberItem("beginJingNum", 0);
            _jiaJing = [0, 3, 2].indexOf(jiaJingNum);
        }
        else {
            _jiaJing = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_jiaJing, 0);
        }
        this.jiaJingList_radio.selectItem(_jiaJing);
        this.radioBoxSelectCB(_jiaJing,this.jiaJingList_node[_jiaJing],this.jiaJingList_node);

        //有胡必胡
        var isBiHu;
        if (atClub) 
            isBiHu = this.getBoolItem("isBiHu", false);
        else
            isBiHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_isBiHu, false);
        this.isBiHu.setSelected(isBiHu);
        this.selectedCB(this.isBiHu.getChildByName("text"), isBiHu);

        //自摸胡
        var isZiMo;
        if (atClub) 
            isZiMo = this.getBoolItem("isZiMo", false);
        else
            isZiMo = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_isZiMo, false);
        this.isZiMo.setSelected(isZiMo);
        this.selectedCB(this.isZiMo.getChildByName("text"), isZiMo);

        //赶踏不胡
        var isGanTaBuHu;
        if (atClub) 
            isGanTaBuHu = this.getBoolItem("isGanTaBuHu", false);
        else
            isGanTaBuHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_isGanTa, false);
        this.isGanTa.setSelected(isGanTaBuHu);
        this.selectedCB(this.isGanTa.getChildByName("text"), isGanTaBuHu);

        //桌面精不算主精
        var isDeskJing;
        if (atClub) 
            isDeskJing = this.getBoolItem("isNotDeskJing", false); 
        else
            isDeskJing = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_isDeskJing, false);
        this.isDeskJing.setSelected(isDeskJing);
        this.selectedCB(this.isDeskJing.getChildByName("text"), isDeskJing);

        //包铳
        var isBaoChong;
        if (atClub) 
            isBaoChong = this.getBoolItem("isBaoChong", false);
        else
            isBaoChong = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_isBaoChong, false);
        this.isBaoChong.setSelected(isBaoChong);
        this.selectedCB(this.isBaoChong.getChildByName("text"), isBaoChong);

        //目前更新别杠的接口包含了所有随变节点的处理，所以直接调这个接口就可以设置其它随变的节点
        this.updateBieGangEnable(_bieGang != 0);

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

    // 包铳的激活受多个节点影响
    setBaoChongValid:function() {
        var playerIdx = this.maxPlayerList_radio.getSelectIndex();
        var bieGangIdx = this.bieGangList_radio.getSelectIndex();
        var isValid = playerIdx == 1 && bieGangIdx == 0;
        this.setNodeValid(this.isBaoChong, isValid);
    },

    // 桌面精的激活受多个节点影响
    setDeskJingValid:function() {
        var wanFaIdx = this.wanFaList_radio.getSelectIndex();
        var bieGangIdx = this.bieGangList_radio.getSelectIndex();
        var isValid = wanFaIdx == 1 && bieGangIdx == 0;
        this.setNodeValid(this.isDeskJing, isValid);
    },

    // param.isEnabled = true表示勾选了别杠
    updateBieGangEnable:function(isEnabled) {
        //勾选别杠时，加精、胡法、特殊 三栏不可用
        this.setRadioListValid(this.jiaJingList_node, this.jiaJingList_radio, !isEnabled, 0);
        
        this.setNodeValid(this.isBiHu, !isEnabled);
        this.setNodeValid(this.isZiMo, !isEnabled);
        this.setNodeValid(this.isGanTa, !isEnabled);

        this.setDeskJingValid();
        this.setBaoChongValid();
    },

    getSelectedPara:function()
    {
        var para = {};
        var maxPlayerIdx = this.maxPlayerList_radio.getSelectIndex();
        para.maxPlayer = [2, 3][maxPlayerIdx]; 

        para.jingNum = [3, 5][this.wanFaList_radio.getSelectIndex()];
        var jiFen = this.jiFenList_radio.getSelectIndex();
        para.jiHuType = jiFen == 1 ? 4 : (this.huFenList_radio.getSelectIndex() + 1);
        para.bieGangNum = this.bieGangList_radio.getSelectIndex();
        para.beginJingNum = [0, 3, 2][this.jiaJingList_radio.getSelectIndex()];  //起手精牌数量
        para.isBiHu = para.bieGangNum == 0 ? this.isBiHu.isSelected() : false;
        para.isZiMo = para.bieGangNum == 0 ? this.isZiMo.isSelected() : false;
        para.isGanTaBuHu = para.bieGangNum == 0 ? this.isGanTa.isSelected() : false; 
        para.isNotDeskJing = this.isDeskJing.isSelected();
        if (para.jingNum == 3 || para.bieGangNum > 0) {
            para.isNotDeskJing = false; //三精玩法 || 选了别杠 此选项不生效
        }
        para.isBaoChong = this.isBaoChong.isSelected();
        if (para.maxPlayer == 2 || para.bieGangNum > 0) {
            para.isBaoChong = false; //2人 || 选了别杠 此选项不生效
        }
        
        this.getExtraSelectedPara(para);

        para.gameType = MjClient.GAME_TYPE.HU_BEI_HUA_PAI;
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
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_maxPlayer, this.maxPlayerList_radio.getSelectIndex()); 
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_wanFa, this.wanFaList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_jiFen, this.jiFenList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_huFen, this.huFenList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_bieGang, this.bieGangList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_jiaJing, this.jiaJingList_radio.getSelectIndex());
            
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_isBiHu, para.isBiHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_isZiMo, para.isZiMo);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_isGanTa, para.isGanTaBuHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_isDeskJing, para.isNotDeskJing);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HU_BEI_HUA_PAI_isBaoChong, para.isBaoChong);
        }
    },

    changeAAPayForPlayerNum:function()
    {
        this.setDiaNumData(this.bg_node);
    }
});