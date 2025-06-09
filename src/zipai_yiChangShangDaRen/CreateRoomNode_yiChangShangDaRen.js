//当阳翻精
var CreateRoomNode_yiChangShangDaRen = CreateRoomNode.extend({
    onExit:function()
    {
        this._super();
    },
    initAll:function()
    {
        this._costName = '元宝';
        
        this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_maxPlayer = "_yiChangShangDaRen_maxPlayer";           // 人数
        this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_diFen     = "_yiChangShangDaRen_diFen";               // 底分
        this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_jiFen     = "_yiChangShangDaRen_jiFen";               // 计分
        this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isBiHu     = "_yiChangShangDaRen_isBiHu";             // 有胡必胡
        this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isZiMoHu     = "_yiChangShangDaRen_isZiMoHu";         // 自摸胡
        this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isMaoKan     = "_yiChangShangDaRen_isMaoKan";         // 不带毛坎
        this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isZiMoYouXi     = "_yiChangShangDaRen_isZiMoYouXi";   // 自摸有喜
        this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isCheAnMao     = "_yiChangShangDaRen_isCheAnMao";     // 扯暗毛
        this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_baoChong   = "_yiChangShangDaRen_baoChong";

        this.setExtraKey({
            jieSuanDiFen: "_yiChangShangDaRen_jieSuanDiFen",  //积分底分
        });

        this.bg_node = ccs.load("bg_yiChangShangDaRen.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg").getChildByName("scroll");
    },
    initPlayNode:function()
    {
        var _play = this.bg_node.getChildByName("play");

        //人数
        var maxPlayerList = [];
        maxPlayerList.push(_play.getChildByName("maxPlayer1"));
        maxPlayerList.push(_play.getChildByName("maxPlayer2"));
        maxPlayerList.push(_play.getChildByName("maxPlayer3"));
        this.initPlayNumNode(maxPlayerList, [2, 3, 3]);

        this.maxPlayerList_radio = createRadioBoxForCheckBoxs(maxPlayerList, (index)=>{
            this.changeAAPayForPlayerNum();
            this.radioBoxSelectCB(index, maxPlayerList[index], maxPlayerList);
        });
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
        diFenList.push(_play.getChildByName("diFen5"));
        this.diFenList_radio = createRadioBoxForCheckBoxs(diFenList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(diFenList,0,this.diFenList_radio),diFenList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(diFenList,1,this.diFenList_radio),diFenList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(diFenList,2,this.diFenList_radio),diFenList[2].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(diFenList,3,this.diFenList_radio),diFenList[3].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(diFenList,4,this.diFenList_radio),diFenList[4].getChildByName("text"));
        this.diFenList_node = diFenList;

        //计分.目前唯一
        var jiFenList = [];
        jiFenList.push(_play.getChildByName("wanFa1"));
        this.jiFenList_radio = createRadioBoxForCheckBoxs(jiFenList, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(jiFenList,0,this.jiFenList_node),jiFenList[0].getChildByName("text"));
        this.jiFenList_node = jiFenList;

        //自摸胡
        this.isZiMoHu = _play.getChildByName("wanFaCb_1");
        this.addListenerText(this.isZiMoHu);
        this.isZiMoHu.addEventListener(this.clickCB, this.isZiMoHu);

        //自摸有喜
        this.isZiMoYouXi = _play.getChildByName("wanFaCb_2");
        this.addListenerText(this.isZiMoYouXi);
        this.isZiMoYouXi.addEventListener(this.clickCB, this.isZiMoYouXi);

        //不带毛坎
        this.isMaoKan = _play.getChildByName("wanFaCb_3"); //勾选时发送false (意义反过来)
        this.addListenerText(this.isMaoKan);
        this.isMaoKan.addEventListener(this.clickCB, this.isMaoKan);

        //有胡必胡
        this.isBiHu = _play.getChildByName("wanFaCb_4");
        this.addListenerText(this.isBiHu);
        this.isBiHu.addEventListener(this.clickCB, this.isBiHu);

        //扯暗毛
        this.isCheAnMao = _play.getChildByName("wanFaCb_5");
        this.addListenerText(this.isCheAnMao);
        this.isCheAnMao.addEventListener(this.clickCB, this.isCheAnMao);

        //包铳
        var baoChongSelectCb = function(index) {
            this.radioBoxSelectCB(index, this.baoChongList_node[index], this.baoChongList_node);
            // 文本提示颜色
            for (var i = 0; i < this.baoChongList_node.length; i++) {
                var text = this.baoChongList_node[i].getChildByName('text');
                var tips = text.getChildByName('text_0');
                if (cc.sys.isObjectValid(tips)) {
                    tips.setTextColor(text.getTextColor());
                }
            }
        }.bind(this);
        var baoChongList = [];
        baoChongList.push(_play.getChildByName("baoChong_1"));
        baoChongList.push(_play.getChildByName("baoChong_2"));
        baoChongList.push(_play.getChildByName("baoChong_3"));
        this.baoChongList_radio = createRadioBoxForCheckBoxs(baoChongList, baoChongSelectCb);
        cc.eventManager.addListener(this.setTextClick(baoChongList,0,this.baoChongList_radio, baoChongSelectCb),baoChongList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(baoChongList,1,this.baoChongList_radio, baoChongSelectCb),baoChongList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(baoChongList,2,this.baoChongList_radio, baoChongSelectCb),baoChongList[2].getChildByName("text"));
        this.baoChongList_node = baoChongList;

        this.initExtraPlayNode(_play);
        this.difenAry = [1,2,3,4,5, 6, 7, 8, 9, 10];
        this.difenIndex = 0;
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
            _maxPlayer = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_maxPlayer, 0);
        }
        this.maxPlayerList_radio.selectItem(_maxPlayer);
        this.radioBoxSelectCB(_maxPlayer,this.playerList_node[_maxPlayer],this.playerList_node);

        //底分
        var diFen = [1, 2, 3, 4, 5];
        var _diFen;
        if (atClub){ 
            _diFen = diFen.indexOf(this.getNumberItem("diFen", 1));
        }
        else {
            _diFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_diFen, 0);
        }
        this.diFenList_radio.selectItem(_diFen);
        this.radioBoxSelectCB(_diFen,this.diFenList_node[_diFen],this.diFenList_node);

        //计分.唯一
        var _jiFen;
        if(atClub){
            _jiFen = this.getNumberItem("jiFen", 0);
        }
        else{
            _jiFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_jiFen, 0); 
        }
        this.jiFenList_radio.selectItem(_jiFen);
        this.radioBoxSelectCB(_jiFen,this.jiFenList_node[_jiFen],this.jiFenList_node);

        //自摸胡
        var isZiMoHu;
        if (atClub) 
            isZiMoHu = this.getBoolItem("isZiMoHu", false);
        else
            isZiMoHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isZiMoHu, false);
        this.isZiMoHu.setSelected(isZiMoHu);
        this.selectedCB(this.isZiMoHu.getChildByName("text"), isZiMoHu);

        //自摸有喜
        var isZiMoYouXi;
        if (atClub) 
            isZiMoYouXi = this.getBoolItem("isZiMoYouXi", true);
        else
            isZiMoYouXi = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isZiMoYouXi, true);
        this.isZiMoYouXi.setSelected(isZiMoYouXi);
        this.selectedCB(this.isZiMoYouXi.getChildByName("text"), isZiMoYouXi);

        //不带毛坎
        var isMaoKan;
        if (atClub) 
            isMaoKan = !this.getBoolItem("isMaoKan", false); //字段名和字面意义需要转换一下
        else
            isMaoKan = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isMaoKan, true);
        this.isMaoKan.setSelected(isMaoKan);
        this.selectedCB(this.isMaoKan.getChildByName("text"), isMaoKan);

        //有胡必胡
        var isBiHu;
        if (atClub) 
            isBiHu = this.getBoolItem("isBiHu", false);
        else
            isBiHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isBiHu, false);
        this.isBiHu.setSelected(isBiHu);
        this.selectedCB(this.isBiHu.getChildByName("text"), isBiHu);

        //扯暗毛
        var isCheAnMao;
        if (atClub) 
            isCheAnMao = this.getBoolItem("isCheAnMao", true);
        else
            isCheAnMao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isCheAnMao, true);
        this.isCheAnMao.setSelected(isCheAnMao);
        this.selectedCB(this.isCheAnMao.getChildByName("text"), isCheAnMao);

        //包铳
        var _baoChong;
        if (atClub) 
            _baoChong = this.getNumberItem("baoChong", 0);
        else 
            _baoChong = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_baoChong, 0);
        this.baoChongList_radio.selectItem(_baoChong);
        this.radioBoxSelectCB(_baoChong, this.baoChongList_node[_baoChong], this.baoChongList_node);
        for (var i = 0; i < this.baoChongList_node.length; i++) {
            var text = this.baoChongList_node[i].getChildByName('text');
            var tips = text.getChildByName('text_0');
            if (cc.sys.isObjectValid(tips)) {
                tips.setTextColor(text.getTextColor());
            }
        }

        this.updateDianChong();

        this.setExtraPlayNodeCurrentSelect(atClub);
    },

    getSelectedPara:function()
    {
        var para = {};
        var maxPlayerIdx = this.maxPlayerList_radio.getSelectIndex();
        para.maxPlayer = [2, 3, 3][maxPlayerIdx];
        para.convertible = maxPlayerIdx == 2;                         // 自由人数

        para.diFen = [1, 2, 3, 4, 5][this.diFenList_radio.getSelectIndex()];
        para.jiFen = this.jiFenList_radio.getSelectIndex();
        para.isBiHu = this.isBiHu.isSelected();
        para.isZiMoHu = this.isZiMoHu.isSelected();
        para.isMaoKan = !this.isMaoKan.isSelected(); //转义
        para.isZiMoYouXi = this.isZiMoYouXi.isSelected();
        para.isCheAnMao = this.isCheAnMao.isSelected();
        para.baoChong = this.baoChongList_radio.getSelectIndex();

        this.getExtraSelectedPara(para);

        para.gameType = MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN;
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
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_maxPlayer, this.maxPlayerList_radio.getSelectIndex()); 
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_diFen, this.diFenList_radio.getSelectIndex()); 
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_jiFen, para.jiFen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isBiHu, para.isBiHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isZiMoHu, para.isZiMoHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isMaoKan, !para.isMaoKan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isZiMoYouXi, para.isZiMoYouXi);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_isCheAnMao, para.isCheAnMao);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YI_CHANG_SHANG_DA_REN_baoChong, para.baoChong);
        }
    },

    changeAAPayForPlayerNum:function(index)
    {
        this.setDiaNumData(this.bg_node);
        this.updateDianChong();
    },
    updateDianChong:function () {
        var index = this.maxPlayerList_radio.getSelectIndex();
        var selectColor = this._selectColor;
        var unSelectColor = this._unSelectColor;
        var unEnableColor = cc.color(191,191,191);
        for (var i in this.baoChongList_node) {
            this.baoChongList_node[i].setEnabled(index != 0);
            var txt =  this.baoChongList_node[i].getChildByName("text");
            var text_0 =  txt.getChildByName("text_0");
            txt.ignoreContentAdaptWithSize(true);
            txt.setTextColor(index == 0 ? unEnableColor: (this.baoChongList_node[i].isSelected()? selectColor:unSelectColor));
            if(text_0){
                text_0.ignoreContentAdaptWithSize(true);
                text_0.setTextColor(index == 0 ? unEnableColor: (this.baoChongList_node[i].isSelected()? selectColor:unSelectColor));
            }
        }
    },
});