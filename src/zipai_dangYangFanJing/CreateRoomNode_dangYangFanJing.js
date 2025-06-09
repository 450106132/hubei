//当阳翻精
var CreateRoomNode_dangYangFanJing = CreateRoomNode.extend({
    onExit:function()
    {
        this._super();
    },
    initAll:function()
    {
        this._costName = '元宝';
        
        this.localStorageKey.KEY_DANG_YANG_FAN_JING_maxPlayer = "_dangYangFanJing_maxPlayer";           // 人数
        this.localStorageKey.KEY_DANG_YANG_FAN_JING_diFen     = "_dangYangFanJing_diFen";               // 底分
        this.localStorageKey.KEY_DANG_YANG_FAN_JING_jiFen     = "_dangYangFanJing_jiFen";               // 计分
        this.localStorageKey.KEY_DANG_YANG_FAN_JING_isBiHu     = "_dangYangFanJing_isBiHu";             // 有胡必胡
        this.localStorageKey.KEY_DANG_YANG_FAN_JING_isZiMoHu     = "_dangYangFanJing_isZiMoHu";         // 自摸胡
        this.localStorageKey.KEY_DANG_YANG_FAN_JING_isMaoKan     = "_dangYangFanJing_isMaoKan";         // 不带毛坎
        this.localStorageKey.KEY_DANG_YANG_FAN_JING_isHaiDiLao     = "_dangYangFanJing_isHaiDiLao";     // 海底胡加分
        this.localStorageKey.KEY_DANG_YANG_FAN_JING_isShangBaHu     = "_dangYangFanJing_isShangBaHu";   // 上8胡

        this.roundNumObj = {roundNum1:4, roundNum2:8};
        this.bg_node = ccs.load("bg_dangYangFanJing.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg").getChildByName("scroll");
    },
    initPlayNode:function()
    {
        var _play = this.bg_node.getChildByName("play");

        //人数
        var maxPlayerList = [];
        maxPlayerList.push(_play.getChildByName("maxPlayer3"));
        maxPlayerList.push(_play.getChildByName("maxPlayer2"));
        maxPlayerList.push(_play.getChildByName("maxPlayer1"));
        this.initPlayNumNode(maxPlayerList, [3, 2, 3]);

        this.maxPlayerList_radio = createRadioBoxForCheckBoxs(maxPlayerList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,0,this.maxPlayerList_radio, this.changeAAPayForPlayerNum.bind(this)),maxPlayerList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,1,this.maxPlayerList_radio, this.changeAAPayForPlayerNum.bind(this)),maxPlayerList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,2,this.maxPlayerList_radio, this.changeAAPayForPlayerNum.bind(this)),maxPlayerList[2].getChildByName("text"));
        this.playerList_node = maxPlayerList;

        //底分
        var diFenList = [];
        diFenList.push(_play.getChildByName("diFen1"));
        diFenList.push(_play.getChildByName("diFen2"));
        diFenList.push(_play.getChildByName("diFen3"));
        diFenList.push(_play.getChildByName("diFen4"));
        this.diFenList_radio = createRadioBoxForCheckBoxs(diFenList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(diFenList,0,this.diFenList_radio),diFenList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(diFenList,1,this.diFenList_radio),diFenList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(diFenList,2,this.diFenList_radio),diFenList[2].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(diFenList,3,this.diFenList_radio),diFenList[3].getChildByName("text"));
        this.diFenList_node = diFenList;

        //计分.目前唯一
        var jiFenList = [];
        jiFenList.push(_play.getChildByName("wanFa1"));
        this.jiFenList_radio = createRadioBoxForCheckBoxs(jiFenList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(jiFenList,0,this.jiFenList_node),jiFenList[0].getChildByName("text"));
        this.jiFenList_node = jiFenList;

        //有胡必胡
        this.isBiHu = _play.getChildByName("wanFaCb_1");
        this.addListenerText(this.isBiHu);
        this.isBiHu.addEventListener(this.clickCB, this.isBiHu);

        //自摸胡
        this.isZiMoHu = _play.getChildByName("wanFaCb_2");
        this.addListenerText(this.isZiMoHu);
        this.isZiMoHu.addEventListener(this.clickCB, this.isZiMoHu);

        //不带毛坎
        this.isMaoKan = _play.getChildByName("wanFaCb_3"); //勾选时发送false (意义反过来)
        this.addListenerText(this.isMaoKan);
        this.isMaoKan.addEventListener(this.clickCB, this.isMaoKan);

        //海底胡加分
        this.isHaiDiLao = _play.getChildByName("wanFaCb_4");
        this.addListenerText(this.isHaiDiLao);
        this.isHaiDiLao.addEventListener(this.clickCB, this.isHaiDiLao);

        //上8胡
        this.isShangBaHu = _play.getChildByName("wanFaCb_5");
        this.addListenerText(this.isShangBaHu);
        this.isShangBaHu.addEventListener(this.clickCB, this.isShangBaHu);
    },

    setPlayNodeCurrentSelect:function(atClub)
    {
        var _play = this.bg_node.getChildByName("play");
        
        //人数
        var _maxPlayer;
        if (atClub){ 
            if (this.getBoolItem("convertible", false))
                _maxPlayer = 2;  //俱乐部默认最大人数
            else {
                var temp_maxPlayer = this.getNumberItem("maxPlayer", 3);
                _maxPlayer = [3, 2].indexOf(temp_maxPlayer);
            }
        }
        else {
            _maxPlayer = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_maxPlayer, 0);
        }
        this.maxPlayerList_radio.selectItem(_maxPlayer);
        this.radioBoxSelectCB(_maxPlayer,this.playerList_node[_maxPlayer],this.playerList_node);

        //底分
        var diFen = [1, 2, 3, 5];
        var _diFen;
        if (atClub){ 
            _diFen = diFen.indexOf(this.getNumberItem("diFen", 1));
        }
        else {
            _diFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_diFen, 0);
        }
        this.diFenList_radio.selectItem(_diFen);
        this.radioBoxSelectCB(_diFen,this.diFenList_node[_diFen],this.diFenList_node);

        //计分.唯一
        var _jiFen;
        if(atClub){
            _jiFen = this.getNumberItem("jiFen", 0);
        }
        else{
            _jiFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_jiFen, 0); 
        }
        this.jiFenList_radio.selectItem(_jiFen);
        this.radioBoxSelectCB(_jiFen,this.jiFenList_node[_jiFen],this.jiFenList_node);

        //有胡必胡
        var isBiHu;
        if (atClub) 
            isBiHu = this.getBoolItem("isBiHu", false);
        else
            isBiHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_isBiHu, false);
        this.isBiHu.setSelected(isBiHu);
        this.selectedCB(this.isBiHu.getChildByName("text"), isBiHu);

        //自摸胡
        var isZiMoHu;
        if (atClub) 
            isZiMoHu = this.getBoolItem("isZiMoHu", false);
        else
            isZiMoHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_isZiMoHu, false);
        this.isZiMoHu.setSelected(isZiMoHu);
        this.selectedCB(this.isZiMoHu.getChildByName("text"), isZiMoHu);

        //不带毛坎
        var isMaoKan;
        if (atClub) 
            isMaoKan = !this.getBoolItem("isMaoKan", true); //字段名和字面意义需要转换一下
        else
            isMaoKan = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_isMaoKan, false);
        this.isMaoKan.setSelected(isMaoKan);
        this.selectedCB(this.isMaoKan.getChildByName("text"), isMaoKan);

        //海底胡加分
        var isHaiDiLao;
        if (atClub) 
            isHaiDiLao = this.getBoolItem("isHaiDiLao", false);
        else
            isHaiDiLao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_isHaiDiLao, false);
        this.isHaiDiLao.setSelected(isHaiDiLao);
        this.selectedCB(this.isHaiDiLao.getChildByName("text"), isHaiDiLao);

        //上8胡
        var isShangBaHu;
        if (atClub) 
            isShangBaHu = this.getBoolItem("isShangBaHu", false);
        else
            isShangBaHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_isShangBaHu, false);
        this.isShangBaHu.setSelected(isShangBaHu);
        this.selectedCB(this.isShangBaHu.getChildByName("text"), isShangBaHu);
    },

    getSelectedPara:function()
    {
        var para = {};
        var maxPlayerIdx = this.maxPlayerList_radio.getSelectIndex();
        para.maxPlayer = [3, 2, 3][maxPlayerIdx]; 
        para.convertible = maxPlayerIdx == 2;                         // 自由人数

        para.diFen = [1, 2, 3, 5][this.diFenList_radio.getSelectIndex()];
        para.jiFen = this.jiFenList_radio.getSelectIndex();
        para.isBiHu = this.isBiHu.isSelected();
        para.isZiMoHu = this.isZiMoHu.isSelected();
        para.isMaoKan = !this.isMaoKan.isSelected(); //转义
        para.isHaiDiLao = this.isHaiDiLao.isSelected();
        para.isShangBaHu = this.isShangBaHu.isSelected();

        para.gameType = MjClient.GAME_TYPE.DANG_YANG_FAN_JING;
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
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_maxPlayer, this.maxPlayerList_radio.getSelectIndex()); 
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_diFen, this.diFenList_radio.getSelectIndex()); 
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_jiFen, para.jiFen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_isBiHu, para.isBiHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_isZiMoHu, para.isZiMoHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_isMaoKan, !para.isMaoKan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_isHaiDiLao, para.isHaiDiLao);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DANG_YANG_FAN_JING_isShangBaHu, para.isShangBaHu);
        }
    },

    changeAAPayForPlayerNum:function()
    {
        this.setDiaNumData(this.bg_node);
    }
});