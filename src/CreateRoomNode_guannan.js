/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_guannan = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_guannan_player_num   = "_GUAN_NAN_PLAYER_NUM";     // 人数
        this.localStorageKey.KEY_guannan_isDuoHu      = "_GUAN_NAN_IS_DUO_HU";     //是否多胡
        this.localStorageKey.KEY_guannan_isDaJue7DuiXianHu = "_GUAN_NAN_IS_DAJUE_7DUI_XIANHU";  // 大绝七对先胡
        this.localStorageKey.KEY_guannan_zhuang_2     = "_GUAN_NAN_ZHUANG_2";     // 0:庄闲同分   1:庄2闲1千胡翻倍   2:庄2闲1千胡不翻倍 
        this.localStorageKey.KEY_guannan_tuoguan             = "_GUAN_NAN_tuoguan";
    },
    initAll:function(IsFriendCard)
    {   
        if (!IsFriendCard)
            this.setKey();

        this.bg_node = ccs.load("bg_guannan.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_guannan");
    },
    initPlayNode:function()
    {
        this._super();
        var viewNode = this.bg_node.getChildByName("view");
        viewNode.setScrollBarEnabled(false);
        var _playWayNode = viewNode.getChildByName("play_way");
        var _playNumNode = viewNode.getChildByName("player_num");

        //一炮多响，截胡
        this._payDuoHuNode = _playWayNode.getChildByName("play_DuoHu");
        this._payJieHuNode = _playWayNode.getChildByName("play_JieHu");
        var nodeList1 = [];
        nodeList1.push( _playWayNode.getChildByName("play_DuoHu") );
        nodeList1.push( _playWayNode.getChildByName("play_JieHu") );
        var that = this;
        this._playNode_player_hu_radio = createRadioBoxForCheckBoxs(nodeList1, function(index){
            that.select_JieHu(index);
            this.radioBoxSelectCB(index, nodeList1[index], nodeList1);
        }.bind(this));
        this.addListenerText(nodeList1,this._playNode_player_hu_radio,that.select_JieHu.bind(this));

        // 大绝七对先胡
        this._playJieHuOptionCheckBox = _playWayNode.getChildByName("play_JieHuOption");
        this.addListenerText(this._playJieHuOptionCheckBox);
        this._playJieHuOptionCheckBox.addEventListener(this.clickCB, this._playJieHuOptionCheckBox);

        // 庄2闲1 庄闲同分
        this._zhuang_2 = _playWayNode.getChildByName("play_Zhuang2");
        this._zhuang_1 = _playWayNode.getChildByName("play_Zhuang1");
        this._zhuang_3 = _playWayNode.getChildByName("play_Zhuang3");
        var nodeList = [];
        nodeList.push( _playWayNode.getChildByName("play_Zhuang1") );
        nodeList.push( _playWayNode.getChildByName("play_Zhuang2") );
        nodeList.push( _playWayNode.getChildByName("play_Zhuang3") );
        this._playNode_player_zx_radio = createRadioBoxForCheckBoxs(nodeList,this.radioBoxSelectCB);
        this.addListenerText(nodeList,this._playNode_player_zx_radio);
        this._nodeList = nodeList;

        var playNumList = [];
        playNumList.push( _playNumNode.getChildByName("play_count0") );
        playNumList.push( _playNumNode.getChildByName("play_count1") );
        playNumList.push( _playNumNode.getChildByName("play_count2") );
        playNumList.push( _playNumNode.getChildByName("play_count3") );
        this.initPlayNumNode(playNumList, [4, 3, 2, 4]);   // playNumList[选项1， 选项2， 选项x3 ] 对应 [4人， 3人, 2人]

        this._playNode_tuoguanType_0 = _playWayNode.getChildByName("tuoguan0");
        this._playNode_tuoguanType_1 = _playWayNode.getChildByName("tuoguan1");
        this._playNode_tuoguanType_2 = _playWayNode.getChildByName("tuoguan2");
        this._playNode_tuoguanType_3 = _playWayNode.getChildByName("tuoguan3");
        var tuoguanList = [];
        tuoguanList.push(_playWayNode.getChildByName("tuoguan0"));
        tuoguanList.push(_playWayNode.getChildByName("tuoguan1"));
        tuoguanList.push(_playWayNode.getChildByName("tuoguan2"));
        tuoguanList.push(_playWayNode.getChildByName("tuoguan3"));
        var self = this;
        this.tuoguanTypeList_radio = createRadioBoxForCheckBoxs(tuoguanList, function(index){
            //self.refreshZhuaNiao();
            self.radioBoxSelectCB(index,tuoguanList[index],tuoguanList);
        });
        this.addListenerText(tuoguanList,this.tuoguanTypeList_radio);
        this.tuoguanList = tuoguanList;

        var btn_tuoguanTip = _playWayNode.getChildByName("btn_tuoguanTip");
        var image_tuoguanTip = _playWayNode.getChildByName("image_tuoguanTip");
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

        this._playNum_radio = createRadioBoxForCheckBoxs(playNumList, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index,playNumList[index],playNumList);
        }.bind(this));
        this.addListenerText(playNumList, this._playNum_radio, this.changePayForPlayerNum.bind(this));
        this._playNumList = playNumList;
    },
    select_JieHu:function(index, isClub){
        if (index == 1) {
            this._payDuoHuNode.setSelected(false);
            this._payJieHuNode.setSelected(true);
            this._playJieHuOptionCheckBox.visible = true;
            var isDajueQiduiXianHu;
            if (isClub) 
                isDajueQiduiXianHu = this.getBoolItem("daJue7DuiXianHu", false);
            else
                isDajueQiduiXianHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_guannan_isDaJue7DuiXianHu, false);
            this._playJieHuOptionCheckBox.setSelected(isDajueQiduiXianHu);
            if (isDajueQiduiXianHu){
                var text = this._playJieHuOptionCheckBox.getChildByName("text");
                this.selectedCB(text,true)
            }
        }else{
            this._payDuoHuNode.setSelected(true);
            this._payJieHuNode.setSelected(false);
            this._playJieHuOptionCheckBox.visible = false;
            this._playJieHuOptionCheckBox.setSelected(false);
        }
    },
    setPlayNodeCurrentSelect: function(isClub) {
        this._super();
        var guannan_isDuoHu;
        if (isClub)
            guannan_isDuoHu = this.getBoolItem("duoHu", false);
        else
            guannan_isDuoHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_guannan_isDuoHu, false);
        this._payDuoHuNode.setSelected(guannan_isDuoHu);
        var text = this._payDuoHuNode.getChildByName("text");
        this.selectedCB(text, guannan_isDuoHu);

        this._payJieHuNode.setSelected(!guannan_isDuoHu);
        var text = this._payJieHuNode.getChildByName("text");
        this.selectedCB(text, !guannan_isDuoHu);

        var index = 0;
        if(guannan_isDuoHu == false)
        {
            index = 1;
        }
        this.select_JieHu(index, isClub);

        var _zhuang;
        if (isClub)
            _zhuang = this.getNumberItem("zhuang2", 1);
        else
            _zhuang = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_guannan_zhuang_2, 1);
        this._playNode_player_zx_radio.selectItem(_zhuang);
        var text = this._playNode_player_zx_radio.getSelectItem().getChildByName("text");
        this.selectedCB(text,_zhuang);

        var _trustTime;
        if (isClub)
            _trustTime = [0, 60, 120, 180].indexOf(this.getNumberItem("trustTime", 0));
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_guannan_tuoguan, 0);
        this.tuoguanTypeList_radio.selectItem(_trustTime);
        this.radioBoxSelectCB(_trustTime,this.tuoguanList[_trustTime],this.tuoguanList);

        var _playnumIndex;
        if (isClub)
            if (this.getBoolItem("convertible", false))
                _playnumIndex = 3;
            else
                _playnumIndex = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            _playnumIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_guannan_player_num, 0);
        this._playNum_radio.selectItem(_playnumIndex);
        var text = this._playNum_radio.getSelectItem().getChildByName("text");
        this.selectedCB(text, _playnumIndex);
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.GUAN_NAN;
        para.maxPlayer = 4;
        para.duoHu = false; //是否多胡
        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps
        //一炮多响，截胡
        para.duoHu = this._payDuoHuNode.isSelected() == true ? true :false;
        para.daJue7DuiXianHu = this._playJieHuOptionCheckBox.isSelected() == true ? true :false;
        para.trustTime = 0;

        // 0:庄闲同分   1:庄2闲1千胡翻倍   2:庄2闲1千胡不翻倍 
        para.zhuang2 = this._playNode_player_zx_radio.getSelectIndex();

        // 人数
        var indexToNum = {0:4, 1:3, 2:2, 3:4};
        var _playnumIndex = this._playNum_radio.getSelectIndex();
        para.maxPlayer = indexToNum[_playnumIndex];
        if (_playnumIndex == 3) 
        {
            para.convertible = true;
        }

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

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_guannan_isDuoHu, para.duoHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_guannan_isDaJue7DuiXianHu, para.daJue7DuiXianHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_guannan_tuoguan, tuoguan);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_guannan_zhuang_2, para.zhuang2);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_guannan_player_num, _playnumIndex);
        }
        cc.log("createara================: " + JSON.stringify(para));

        return para;
    }
});