/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_guanyun = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_guanyun_flowerCount = "_GUAN_YUN_FLOWER_COUNT"; //花牌个数
        this.localStorageKey.KEY_guanyun_jiesuanWay = "_GUAN_YUN_JIESUAN_WAY"; //一包一，一包三
        this.localStorageKey.KEY_guanyun_isDuoHu = "_GUAN_YUN_IS_DUO_HU"; //是否多胡
        this.localStorageKey.KEY_GUAN_YUN_count  = "_GUAN_YUN_COUNT"; //人数
        this.localStorageKey.KEY_GUAN_YUN_tuoguan             = "_GUAN_YUN_tuoguan";
        this.localStorageKey.KEY_GUAN_YUN_qiduitianhu             = "_GUAN_YUN_qiduitianhu";
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();

        this.bg_node = ccs.load("bg_guanyun.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_guanyun");
    },
    initPlayNode: function() {
        this._super();
        var _bgGuanYunNode = this.bg_node.getChildByName("view");
        _bgGuanYunNode.setScrollBarEnabled(false);

        ////花的选择
        var _playWayNode = _bgGuanYunNode.getChildByName("play_way");
        this._flowerNode4 = _playWayNode.getChildByName("play_flower4");
        this._flowerNode20 = _playWayNode.getChildByName("play_flower20");
        this._flowerNode28 = _playWayNode.getChildByName("play_flower28");
        var nodeList1 = [];
        nodeList1.push(_playWayNode.getChildByName("play_flower4"));
        nodeList1.push(_playWayNode.getChildByName("play_flower20"));
        nodeList1.push(_playWayNode.getChildByName("play_flower28"));
        this._playNode_flower_num_radio = createRadioBoxForCheckBoxs(nodeList1, this.radioBoxSelectCB);
        this.addListenerText(nodeList1, this._playNode_flower_num_radio);


        //一包一，一包三
        this._payOneNode = _playWayNode.getChildByName("play_payOne");
        this._payAllNode = _playWayNode.getChildByName("play_payAll");
        var nodeList = [];
        nodeList.push(_playWayNode.getChildByName("play_payOne"));
        nodeList.push(_playWayNode.getChildByName("play_payAll"));
        this._playNode_play_allone_radio = createRadioBoxForCheckBoxs(nodeList, this.radioBoxSelectCB);
        this.addListenerText(nodeList, this._playNode_play_allone_radio);



        //一炮多响，截胡
        this._payDuoHuNode = _playWayNode.getChildByName("play_DuoHu");
        this._payJieHuNode = _playWayNode.getChildByName("play_JieHu");
        var nodeListhu = [];
        nodeListhu.push(_playWayNode.getChildByName("play_DuoHu"));
        nodeListhu.push(_playWayNode.getChildByName("play_JieHu"));
        this._playNode_player_hu_radio = createRadioBoxForCheckBoxs(nodeListhu, this.radioBoxSelectCB);
        this.addListenerText(nodeListhu, this._playNode_player_hu_radio);

        this.play_qiduitianhu = _playWayNode.getChildByName("play_qiduitianhu");
        this.addListenerText(this.play_qiduitianhu);
        this.play_qiduitianhu.addEventListener(this.clickCB, this.play_qiduitianhu);

        //人数
        this._playNode_maxPlayer0 = _playWayNode.getChildByName("play_count0");
        this._playNode_maxPlayer1 = _playWayNode.getChildByName("play_count1");
        this._playNode_maxPlayer2 = _playWayNode.getChildByName("play_count2");
        this._playNode_maxPlayer3 = _playWayNode.getChildByName("play_count3");
        var nodeCountList1 = [];
        nodeCountList1.push(_playWayNode.getChildByName("play_count0"));
        nodeCountList1.push(_playWayNode.getChildByName("play_count1"));
        nodeCountList1.push(_playWayNode.getChildByName("play_count2"));
        nodeCountList1.push(_playWayNode.getChildByName("play_count3"));
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(nodeCountList1,function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeCountList1[index], nodeCountList1);
        }.bind(this));
        this.addListenerText(nodeCountList1, this._playNode_player_count_radio,this.changePayForPlayerNum.bind(this));
        this._countlist = nodeCountList1;

        this.initPlayNumNode(nodeCountList1, [4, 3, 2, 4]);


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

    },
    setPlayNodeCurrentSelect: function(isClub) {
        this._super();
        var _guanyunflowerCountType;
        if (isClub)
            _guanyunflowerCountType = this.getNumberItem("flowerType", WithFlowerType.dnxbzFlower20);
        else
            _guanyunflowerCountType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_guanyun_flowerCount, WithFlowerType.dnxbzFlower20);
        this._flowerNode4.setSelected(false);
        this._flowerNode20.setSelected(false);
        this._flowerNode28.setSelected(false);
        this._flowerNode4.setSelected(_guanyunflowerCountType == WithFlowerType.zFlower4);
        var text = this._flowerNode4.getChildByName("text");
        this.selectedCB(text,_guanyunflowerCountType == WithFlowerType.zFlower4)

        this._flowerNode28.setSelected(_guanyunflowerCountType == WithFlowerType.dnxbzfbFlower28);
        var text = this._flowerNode28.getChildByName("text");
        this.selectedCB(text,_guanyunflowerCountType == WithFlowerType.dnxbzfbFlower28)

        this._flowerNode20.setSelected(_guanyunflowerCountType == WithFlowerType.dnxbzFlower20);
        var text = this._flowerNode20.getChildByName("text");
        this.selectedCB(text,_guanyunflowerCountType == WithFlowerType.dnxbzFlower20)

        var _payWayStr;
        if (isClub)
            _payWayStr = this.getStringItem("payType", "onePay");
        else
            _payWayStr = util.localStorageEncrypt.getStringItem(this.localStorageKey.KEY_guanyun_jiesuanWay, "onePay");
        var list = [];
        list.push(this._payOneNode);
        list.push(this._payAllNode);       
        var isbool = _payWayStr == "onePay" ? true:false;
        var index = isbool == true ? 0:1;
        this._payOneNode.setSelected(isbool);
        this._payAllNode.setSelected(!isbool);
        this.radioBoxSelectCB(index, list[index], list);

        var guanyun_isDuoHu;
        if (isClub)
            guanyun_isDuoHu = this.getBoolItem("duoHu", false);
        else
            guanyun_isDuoHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_guanyun_isDuoHu, false);
        this._payDuoHuNode.setSelected(guanyun_isDuoHu);
        var text = this._payDuoHuNode.getChildByName("text");
        this.selectedCB(text,guanyun_isDuoHu)
        this._payJieHuNode.setSelected(!guanyun_isDuoHu);
        var text = this._payJieHuNode.getChildByName("text");
        this.selectedCB(text,!guanyun_isDuoHu)

        //人数
        var _currentCount;
        if (isClub)
            if (this.getBoolItem("convertible", false))
                _currentCount = 3;
            else
                _currentCount = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_GUAN_YUN_count, 0);
        cc.log("_currentCount renshu  == " + _currentCount)
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);

        var _trustTime;
        if (isClub)
            _trustTime = [0, 60, 120, 180].indexOf(this.getNumberItem("trustTime", 0));
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_GUAN_YUN_tuoguan, 0);
        this.tuoguanTypeList_radio.selectItem(_trustTime);
        this.radioBoxSelectCB(_trustTime,this.tuoguanList[_trustTime],this.tuoguanList);

        var _qiduitianhu;
        if (isClub)
            _qiduitianhu = this.getBoolItem("qiduiketianhu", false);
        else
            _qiduitianhu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_GUAN_YUN_qiduitianhu, false);
        this.play_qiduitianhu.setSelected(_qiduitianhu);
        var text = this.play_qiduitianhu.getChildByName("text");
        this.selectedCB(text, _qiduitianhu)


        this.changePayForPlayerNum();
    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.GUAN_YUN;
        para.maxPlayer = 4;
        para.trustTime = 0;
        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps
        //花的选项
         if (this._flowerNode4.isSelected())
            para.flowerType = WithFlowerType.zFlower4;
        else if (this._flowerNode20.isSelected())
            para.flowerType = WithFlowerType.dnxbzFlower20;
        else if (this._flowerNode28.isSelected())
            para.flowerType = WithFlowerType.dnxbzfbFlower28;
        //一包一，一包三
        para.payType = this._payOneNode.isSelected() == true ? "onePay" : "allPay" ;

        //一炮多响，截胡
        para.duoHu = this._payDuoHuNode.isSelected() == true ? true :false;
        para.qiduiketianhu = this.play_qiduitianhu.isSelected();

        //人数
        var _countIdx = 0;
        para.convertible = false;
        if (this._playNode_maxPlayer0.isSelected()) {
            para.maxPlayer = 4;
            _countIdx = 0;
        }
        else if (this._playNode_maxPlayer1.isSelected()) {
            para.maxPlayer = 3;
            _countIdx = 1;
        }
        else if (this._playNode_maxPlayer2.isSelected()) {
            para.maxPlayer = 2;
            _countIdx = 2;
        }
        else if (this._playNode_maxPlayer3.isSelected()) {
             para.maxPlayer = 4;
             para.convertible = true;
             _countIdx = 3;
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
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_guanyun_flowerCount,para.flowerType);
            util.localStorageEncrypt.setStringItem(this.localStorageKey.KEY_guanyun_jiesuanWay, para.payType);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_guanyun_isDuoHu, para.duoHu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_GUAN_YUN_count, _countIdx);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_GUAN_YUN_tuoguan, tuoguan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_GUAN_YUN_qiduitianhu, para.qiduiketianhu);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }


});