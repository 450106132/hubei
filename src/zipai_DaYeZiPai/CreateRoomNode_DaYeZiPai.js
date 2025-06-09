
var CreateRoomNode_DaYeZiPai = CreateRoomNode.extend({
    onExit:function()
    {
        this._super();
    },
    initAll:function()
    {
        this._costName = '元宝';
        
        this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_maxPlayer       = "_DaYeZiPai_maxPlayer";          //几人玩
        this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_yiDuiHong       = "_DaYeZiPai_yiDuiHong";          //一对红
        this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_shuangBaBei       = "_DaYeZiPai_shuangBaBei";      
        this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_fangPaoBaoPei       = "_DaYeZiPai_fangPaoBaoPei";
        this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_jieSuanDiFen       = "_DaYeZiPai_jieSuanDiFen";      
        this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_isManualCutCard       = "_DaYeZiPai_isManualCutCard";      

        this.roundNumObj = {roundNum1:8, roundNum2:12, roundNum3:16};
        this.bg_node = ccs.load("bg_daYeZiPai.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg").getChildByName("view");
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

        var maxPlayerSelectCb = function(index,sender, list){
            this.radioBoxSelectCB(index,sender, maxPlayerList);
            this.updateSelectDiaNum();
            this.updateBaoPei();
        }.bind(this);

        this.maxPlayerList_radio = createRadioBoxForCheckBoxs(maxPlayerList, maxPlayerSelectCb);
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,0,this.maxPlayerList_radio, maxPlayerSelectCb),maxPlayerList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,1,this.maxPlayerList_radio, maxPlayerSelectCb),maxPlayerList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,2,this.maxPlayerList_radio, maxPlayerSelectCb),maxPlayerList[2].getChildByName("text"));

        //一对红
        this.yiDuiHong = _play.getChildByName("yiDuiHong");
        this.yiDuiHong.addEventListener(this._clickCB.bind(this), this.yiDuiHong);
        cc.eventManager.addListener(this.setTextClick(null,null,null,null),this.yiDuiHong.getChildByName("text"));

        //双八倍
        this.shuangBaBei = _play.getChildByName("shuangBaBei");
        this.shuangBaBei.addEventListener(this._clickCB.bind(this), this.shuangBaBei);
        cc.eventManager.addListener(this.setTextClick(null,null,null,null),this.shuangBaBei.getChildByName("text"));

        //放炮包赔
        this.fangPaoBaoPei = _play.getChildByName("fangPaoBaoPei");
        this.fangPaoBaoPei.addEventListener(this._clickCB.bind(this), this.fangPaoBaoPei);
        cc.eventManager.addListener(this.setTextClick(null,null,null,null),this.fangPaoBaoPei.getChildByName("text"));


        var beiShuList = [];
        beiShuList.push(_play.getChildByName("bei1"));
        beiShuList.push(_play.getChildByName("bei2"));
        beiShuList.push(_play.getChildByName("bei3"));
        beiShuList.push(_play.getChildByName("bei4"));
        beiShuList.push(_play.getChildByName("bei5"));
        this.beiShu_radio = createRadioBoxForCheckBoxs(beiShuList, this.radioBoxSelectCB);
        this.addListenerText(beiShuList,this.beiShu_radio);
        this.beiShuList = beiShuList;

        var qiePaiList = [];
        qiePaiList.push(_play.getChildByName("autoCut"));
        qiePaiList.push(_play.getChildByName("manualCut"));
        this.qiePaiList_radio = createRadioBoxForCheckBoxs(qiePaiList, this.radioBoxSelectCB);
        this.addListenerText(qiePaiList,this.qiePaiList_radio);
        this.qiePaiList = qiePaiList;
    },

    _clickCB : function(sender,type){
        switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var txt = sender.getChildByName("text");
                    var selectColor = this._selectColor;
                    var unSelectColor = this._unSelectColor;
                    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
                        selectColor = CREATEROOM_COLOR_WANGWANG_SELECT;
                        unSelectColor = CREATEROOM_COLOR_WANGWANG_UNSELECT;
                    }
                    if(sender.isSelected()){
                        txt.setTextColor(selectColor);
                    }else{
                        txt.setTextColor(unSelectColor);
                    }
                    break;
            }
    },

    setPlayNodeCurrentSelect:function(atClub)
    {
        var _play = this.bg_node.getChildByName("play");
        var list = [];
        index = 0;

        var selectColor = this._selectColor;
        var unSelectColor = this._unSelectColor;
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
            selectColor = CREATEROOM_COLOR_WANGWANG_SELECT;
            unSelectColor = CREATEROOM_COLOR_WANGWANG_UNSELECT;
        }

        var _maxPlayer;
        if (atClub){
            if (this.getBoolItem("convertible", false)) {
                _maxPlayer = 2;
            } else {
                _maxPlayer = [3, 2].indexOf(this.getNumberItem("maxPlayer", 3));
            }
        }else{
            _maxPlayer = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_maxPlayer, 0);
        }
        this.maxPlayerList_radio.selectItem(_maxPlayer);
        list = [];
        list.push(_play.getChildByName("maxPlayer3"));
        list.push(_play.getChildByName("maxPlayer2"));
        list.push(_play.getChildByName("maxPlayer3"))
        this.radioBoxSelectCB(_maxPlayer,list[_maxPlayer],list);

        //一对红
        var _yiDuiHong;
        if (atClub){
            _yiDuiHong = this.getBoolItem("yiDuiHong", true);
        }else{
            _yiDuiHong =  util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_yiDuiHong, true);
        }
        this.yiDuiHong.setSelected(_yiDuiHong);
        var txt = this.yiDuiHong.getChildByName("text");
        txt.setTextColor(_yiDuiHong ? selectColor : unSelectColor);

        //双八倍
        var _shuangBaBei;
        if (atClub){
            _shuangBaBei = this.getBoolItem("shuangBaBei", false);
        }else{
            _shuangBaBei =  util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_shuangBaBei, false);
        }
        this.shuangBaBei.setSelected(_shuangBaBei);
        var txt = this.shuangBaBei.getChildByName("text");
        txt.setTextColor(_shuangBaBei ? selectColor : unSelectColor);

        //放炮包赔
        var _fangPaoBaoPei;
        if (atClub){
            _fangPaoBaoPei = this.getBoolItem("fangPaoBaoPei", false);
        }else{
            _fangPaoBaoPei =  util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_fangPaoBaoPei, false);
        }
        this.fangPaoBaoPei.setSelected(_fangPaoBaoPei);
        var txt = this.fangPaoBaoPei.getChildByName("text");
        txt.setTextColor(_fangPaoBaoPei ? selectColor : unSelectColor);

        var beiShu;
        if (atClub)
            beiShu = this.getNumberItem("jieSuanDiFen", 1);
        else
            beiShu = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_jieSuanDiFen, 1);

        beiShu = [0.5, 1, 2, 3, 5].indexOf(beiShu);
        this.beiShu_radio.selectItem(beiShu);
        this.radioBoxSelectCB(beiShu,this.beiShuList[beiShu],this.beiShuList);

        var qiePai;
        if (atClub)
            qiePai = [false, true].indexOf(this.getBoolItem("isManualCutCard", false));
        else
            qiePai = [false, true].indexOf(util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_isManualCutCard, false));
        this.qiePaiList_radio.selectItem(qiePai);
        this.radioBoxSelectCB(qiePai,this.qiePaiList[qiePai],this.qiePaiList);

        this.updateBaoPei();

        this.setExtraPlayNodeCurrentSelect(atClub);

        // 这一行代码必须在最后，因为他会间接调用getSelectedPara
        this.changeAAPayForPlayerNum();
    },

    updateBaoPei:function () {
        var maxPlayer = [3, 2, 3][parseInt(this.maxPlayerList_radio.getSelectIndex())];
        this.fangPaoBaoPei.setVisible(maxPlayer != 2);
    },

    getSelectedPara:function()
    {
        var para = {};
        para.maxPlayer = [3, 2, 3][parseInt(this.maxPlayerList_radio.getSelectIndex())];
        para.yiDuiHong = this.yiDuiHong.isSelected();
        para.shuangBaBei = this.shuangBaBei.isSelected();
        para.fangPaoBaoPei = this.fangPaoBaoPei.isSelected();
        para.convertible = this.maxPlayerList_radio.getSelectIndex() == 2;
        para.jieSuanDiFen = [0.5, 1, 2, 3, 5][this.beiShu_radio.getSelectIndex()];
        para.isManualCutCard = [false, true][this.qiePaiList_radio.getSelectIndex()];

        para.gameType = MjClient.GAME_TYPE.DA_YE_ZI_PAI;
        cc.log("createara: " + JSON.stringify(para));
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
            util.localStorageEncrypt.setNumberItem( this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_maxPlayer, this.maxPlayerList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_jieSuanDiFen, para.jieSuanDiFen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_yiDuiHong, para.yiDuiHong);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_shuangBaBei, para.shuangBaBei);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_fangPaoBaoPei, para.fangPaoBaoPei);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PAO_HU_ZI_daYeZiPai_isManualCutCard, para.isManualCutCard);
        }
    },

    changeAAPayForPlayerNum:function()
    {
        this.setDiaNumData(this.bg_node, this.roundNumObj, this.fangzhuPay, this.AAPay, this.clubPay);
    },

    setDiaNumData:function(gameNode, roundNumObj,fangzhuPay,AAPay,clubPay)
    { 
        this._super(gameNode, roundNumObj,fangzhuPay,AAPay,clubPay);
    }
});