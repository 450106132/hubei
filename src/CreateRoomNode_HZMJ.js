/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_HZMJ = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_HZMJ_moma    = "_HZMJ_MOMA";       //摸马
        this.localStorageKey.KEY_HZMJ_daiHZ   = "_HZMJ_DAI_HZ";     //带红中
        this.localStorageKey.KEY_HZMJ_qiangGangHu     = "_HZMJ_QIANG_GUANG_HU";   //抢杠胡
        this.localStorageKey.KEY_HZMJ_tuoguan     = "_HZMJ_tuoguan_TYPE";          //听胡的类型
    },
    initAll:function(IsFriendCard)
    {   
        if (!IsFriendCard)
            this.setKey();

        this.bg_node = ccs.load("bg_HZMJ.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_HZMJ");
    },
    initPlayNode:function()
    {
        if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType())
        {
            this._super();
        }
        //摸马
        var _play = this.bg_node.getChildByName("play");
        var motypeList = [];
        motypeList.push(_play.getChildByName("motype1"));
        motypeList.push(_play.getChildByName("motype2"));
        motypeList.push(_play.getChildByName("motype3"));
        motypeList.push(_play.getChildByName("motype4"));
        this.motypeList_radio = createRadioBoxForCheckBoxs(motypeList,this.radioBoxSelectCB);
        this.addListenerText(motypeList,this.motypeList_radio);
        this._list = motypeList;

        this._playNode_tuoguanType_0 = _play.getChildByName("tuoguan0");
        this._playNode_tuoguanType_1 = _play.getChildByName("tuoguan1");
        this._playNode_tuoguanType_2 = _play.getChildByName("tuoguan2");
        this._playNode_tuoguanType_3 = _play.getChildByName("tuoguan3");
        var tuoguanList = [];
        tuoguanList.push(_play.getChildByName("tuoguan0"));
        tuoguanList.push(_play.getChildByName("tuoguan1"));
        tuoguanList.push(_play.getChildByName("tuoguan2"));
        tuoguanList.push(_play.getChildByName("tuoguan3"));
        var self = this;
        this.tuoguanTypeList_radio = createRadioBoxForCheckBoxs(tuoguanList, function(index){
            //self.refreshZhuaNiao();
            self.radioBoxSelectCB(index,tuoguanList[index],tuoguanList);
        });
        this.addListenerText(tuoguanList,this.tuoguanTypeList_radio);
        this.tuoguanList = tuoguanList;

        var btn_tuoguanTip = _play.getChildByName("btn_tuoguanTip");
        var image_tuoguanTip = _play.getChildByName("image_tuoguanTip");
        var text = image_tuoguanTip.getChildByName("Text_10");
        text.setFlippedX(true);
        btn_tuoguanTip.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                image_tuoguanTip.setVisible(true);
            }
        }, btn_tuoguanTip);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            status: null,
            onTouchBegan: function(touch, event) {
                if (image_tuoguanTip.isVisible()) {
                    image_tuoguanTip.setVisible(false);
                    return true;
                } else {
                    return false;
                }
            },
        }, image_tuoguanTip);

        this.daiHZ = _play.getChildByName("daiHZ");
        this.addListenerText(this.daiHZ);
        this.daiHZ.addEventListener(this.clickCB, this.daiHZ);

        this.qiangGangHu = _play.getChildByName("qiangGangHu");
        this.addListenerText(this.qiangGangHu);
        this.qiangGangHu.addEventListener(this.clickCB, this.qiangGangHu);
    },
    setPlayNodeCurrentSelect:function(isClub)
    {
        if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType())
        {
            this._super();
        }
        var _moma;
        if (isClub)
            _moma = [0, 2, 4, 6].indexOf(this.getNumberItem("zhuaMaNum", 0));
        else
            _moma = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HZMJ_moma, 0);
        this.motypeList_radio.selectItem(_moma);
        this.radioBoxSelectCB(_moma,this._list[_moma],this._list);

        var _daiHZ;
        if (isClub)
            _daiHZ = this.getBoolItem("daihongzhong", true);
        else
            _daiHZ = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HZMJ_daiHZ, true);
        this.daiHZ.setSelected(_daiHZ);
        var text = this.daiHZ.getChildByName("text");
        this.selectedCB(text,_daiHZ)


        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 1);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HZMJ_tuoguan, 1);
        this.tuoguanTypeList_radio.selectItem(_trustTime);
        this.radioBoxSelectCB(_trustTime,this.tuoguanList[_trustTime],this.tuoguanList);

        var _qiangGangHu;
        if (isClub)
            _qiangGangHu = this.getBoolItem("qiangganghu", true);
        else
            _qiangGangHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HZMJ_qiangGangHu, true);
        this.qiangGangHu.setSelected(_qiangGangHu);
        var text = this.qiangGangHu.getChildByName("text");
        this.selectedCB(text,_qiangGangHu)
    },
    getSelectedPara:function()
    {
        var moma = this.motypeList_radio.getSelectIndex();

        var para = {};
        para.gameType = MjClient.GAME_TYPE.XIN_PU_HZ;
        para.maxPlayer = 4;
        para.trustTime = 0;
        para.zhuaMaNum = [0, 2, 4, 6][moma];
        para.daihongzhong = this.daiHZ.isSelected();
        para.qiangganghu = this.qiangGangHu.isSelected();


        var tuoguan = 0;
        if (this._playNode_tuoguanType_0.isSelected()) {
           para.trustTime = 0;
            tuoguan = 0;
        }
        else if (this._playNode_tuoguanType_1.isSelected()) {
           para.trustTime = 60;
            tuoguan = 1;
        }
        else if (this._playNode_tuoguanType_2.isSelected()) {
           para.trustTime = 120;
            tuoguan = 2;
        }
        else if (this._playNode_tuoguanType_3.isSelected()) {
           para.trustTime = 180;
            tuoguan = 3;
        }

        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps
        cc.log("createara: " + JSON.stringify(para));
        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HZMJ_moma, moma);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HZMJ_tuoguan, tuoguan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HZMJ_daiHZ, para.daihongzhong);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HZMJ_qiangGangHu, para.qiangganghu);
        }
        return para;
    }
});