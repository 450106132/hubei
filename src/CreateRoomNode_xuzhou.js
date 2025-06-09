/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_xuzhou = CreateRoomNode.extend({
    initAll: function() {
        if (!this._isFriendCard) {
            this.localStorageKey.KEY_xuzhou_player_num = "_XU_ZHOU_PLAYER_NUM";     // 人数
            this.localStorageKey.KEY_xuzhou_xiazhu = "_XU_ZHOU_XIA_ZHU"; //xiazhu
            this.localStorageKey.KEY_xuzhou_duohu = "_XU_ZHOU_CAN_DUO_HU"; //多胡
            this.localStorageKey.KEY_xuzhou_xiayizui = "_XU_ZHOU_XIA_YI_ZUI"; //xia
            this.localStorageKey.KEY_xuzhou_tuoguan   = "_XU_ZHOU_tuoguan";
        }

        this.bg_node = ccs.load("bg_xuzhou.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_xuzhou");
    },
    initPlayNode: function() {
        var _bgXuzhouNode = this.bg_node;
        var _play = _bgXuzhouNode.getChildByName("play");

        this.jiaZhuNode_xuzhou_1 = _play.getChildByName("play_xiazui");
        this.jiaZhuNode_xuzhou_2 = _play.getChildByName("play_buxiazui");
        this.jiaZhuNode_xuzhou_3 = _play.getChildByName("play_xiayizui");
        var nodeList1 = [];
        nodeList1.push(_play.getChildByName("play_xiazui"));
        nodeList1.push(_play.getChildByName("play_buxiazui"));
        nodeList1.push(_play.getChildByName("play_xiayizui"));
        this._playNode_xz_radio = createRadioBoxForCheckBoxs(nodeList1,this.radioBoxSelectCB);
        this.addListenerText(nodeList1, this._playNode_xz_radio);
        this.list1 = nodeList1;
        //是否多胡
        this._playNode_isDuohu_1 = _play.getChildByName("jiehu");
        this._playNode_isDuohu_2 = _play.getChildByName("duohu");
        var nodeListHu = [];
        nodeListHu.push(_play.getChildByName("jiehu"));
        nodeListHu.push(_play.getChildByName("duohu"));
        this._playNode_hu_radio = createRadioBoxForCheckBoxs(nodeListHu,this.radioBoxSelectCB);
        this.addListenerText(nodeListHu, this._playNode_hu_radio);
        this.list2 = nodeListHu;

        var playNumList = [];
        playNumList.push( _play.getChildByName("play_count0") );
        playNumList.push( _play.getChildByName("play_count1") );
        playNumList.push( _play.getChildByName("play_count2") );
        this._playNum_radio = createRadioBoxForCheckBoxs(playNumList, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index,playNumList[index],playNumList);
        }.bind(this));
        this.addListenerText(playNumList, this._playNum_radio, this.changePayForPlayerNum.bind(this));
        this._playNumList = playNumList;
		
		this.initPlayNumNode(playNumList, [4, 3, 2]);



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

    },
    initRoundNode: function() {
        this._super();
        //var _round = this.bg_node.getChildByName("round");
        //this.roundNode_1 = _round.getChildByName("round_1");
        //this.roundNode_1.setSelected(true);
        //if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ) //徐州取消4局的
        //{
        //    this.roundNode_1.setSelected(false);
        //    this.roundNode_1.visible = false;
        //    this.roundNode_1.setTouchEnabled(false);
        //
        //}

        // //徐州取消4局的
        // var roundNode = this.roundNodeArray[0];
        // if (cc.sys.isObjectValid(roundNode))
        // {
        //     roundNode.setSelected(false);
        //     roundNode.visible = false;
        //     roundNode.setTouchEnabled(false);
        // }
    },
    setPlayNodeCurrentSelect: function(isClub) {
        var xuzhou_xiazui;

        if (isClub)
        {
            var isXiaZui = this.getBoolItem("isJiaZhu", false);
            if(isXiaZui == false)
            {
                xuzhou_xiazui = 1 //不下嘴
            }
            else
            {
                var isXiaYiZui = this.getBoolItem("isJiaZhuyizui", false);
                if(isXiaYiZui == false)
                {
                    xuzhou_xiazui = 0; //下嘴
                }
                else {
                    xuzhou_xiazui = 2; //最多下一嘴
                }

            }

        }
        else
            xuzhou_xiazui = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_xuzhou_xiazhu, 0);

        this.jiaZhuNode_xuzhou_1.setSelected(false);
        this.jiaZhuNode_xuzhou_2.setSelected(false);
        this.jiaZhuNode_xuzhou_3.setSelected(false);
        if(xuzhou_xiazui == 0)
        {
            this.jiaZhuNode_xuzhou_1.setSelected(true);
        }else if(xuzhou_xiazui == 1)
        {
            this.jiaZhuNode_xuzhou_2.setSelected(true);
        }
        else
        {
            this.jiaZhuNode_xuzhou_3.setSelected(true);
        }
        //
        // this.jiaZhuNode_xuzhou_1.setSelected(xuzhou_xiazui == true);
        // this.jiaZhuNode_xuzhou_2.setSelected(xuzhou_xiazui != true);
        // var index =  xuzhou_xiazui == true ? 0 : 1;
        this.radioBoxSelectCB(xuzhou_xiazui,this.list1[xuzhou_xiazui],this.list1);

        var _huaianduohu;
        if (isClub)
            _huaianduohu = this.getBoolItem("duoHu", true);
        else
            _huaianduohu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_xuzhou_duohu, true);
        this._playNode_isDuohu_1.setSelected(_huaianduohu != true);
        this._playNode_isDuohu_2.setSelected(_huaianduohu == true);
        var index =  _huaianduohu != true ? 0 : 1;
        this.radioBoxSelectCB(index,this.list2[index],this.list2);

        var _playnumIndex;
        if (isClub)
            _playnumIndex = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            _playnumIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_xuzhou_player_num, 0);
        this._playNum_radio.selectItem(_playnumIndex);
        var text = this._playNum_radio.getSelectItem().getChildByName("text");
        this.radioBoxSelectCB(_playnumIndex, this._playNumList[_playnumIndex], this._playNumList);

        var _trustTime;
        if (isClub)
            _trustTime = [0, 60, 120, 180].indexOf(this.getNumberItem("trustTime", 0));
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_xuzhou_tuoguan, 0);
        this.tuoguanTypeList_radio.selectItem(_trustTime);
        this.radioBoxSelectCB(_trustTime,this.tuoguanList[_trustTime],this.tuoguanList);

    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.XU_ZHOU;
        para.maxPlayer = 4;
        para.isJiaZhu = false; //是否下嘴
        para.duoHu = true; //是否多胡

        para.isJiaZhuyizui = false; //最多下一嘴
        para.trustTime = 0;
        //是否加注

        para.isJiaZhu = this.jiaZhuNode_xuzhou_1.isSelected() || this.jiaZhuNode_xuzhou_3.isSelected(); //下嘴，和 最多下一嘴 都是下嘴

        para.isJiaZhuyizui = this.jiaZhuNode_xuzhou_3.isSelected(); //最多下一嘴
        var _xiazuiIdx = 0;
        if(this.jiaZhuNode_xuzhou_1.isSelected())
        {
            _xiazuiIdx = 0;
        }else if(this.jiaZhuNode_xuzhou_2.isSelected())
        {
            _xiazuiIdx = 1;
        }
        else
        {
            _xiazuiIdx = 2;
        }
        para.duoHu = this._playNode_isDuohu_2.isSelected() == true ? true : false; //多胡

        // 人数
        var indexToNum = {0:4, 1:3, 2:2};
        var _playnumIndex = this._playNum_radio.getSelectIndex();
        para.maxPlayer = indexToNum[_playnumIndex];


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
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_xuzhou_xiazhu, _xiazuiIdx);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_xuzhou_duohu, para.duoHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_xuzhou_player_num, _playnumIndex);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_xuzhou_tuoguan, tuoguan);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    },
    setRoundNodeCurrentSelect:function()
    {
        this._super();

        var pPriceCfg = this.getPriceCfg();
        if(!pPriceCfg) return false;
        var selectItemNum = Object.keys(pPriceCfg).length;
        var _currentRoundState;

        if (this._isFriendCard && this.clubRule) {
            var roundNumObj = Object.keys(pPriceCfg).sort(function(a, b) {
                return a - b
            });
            _currentRoundState = roundNumObj.indexOf(this.clubRule.round + "");
            if (_currentRoundState != -1)
                _currentRoundState ++;
            else
                _currentRoundState = 2;
        }
        else {
            if (!this._isFriendCard){
                _currentRoundState = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_RondType, 2);
            }else{
                _currentRoundState = 2
            }
            if(_currentRoundState > selectItemNum) _currentRoundState = selectItemNum;
            if(_currentRoundState == 1) _currentRoundState = 2;
        }

        for (var i=0; i<this.roundNodeArray.length && i<selectItemNum; i++)
        {
            var roundNode = this.roundNodeArray[i];
            if (cc.sys.isObjectValid(roundNode))
            {
                if (i+1 == _currentRoundState)
                {
                    roundNode.setSelected(true);
                    var text = roundNode.getChildByName("text");
                    this.selectedCB(text,true);
                }
                else
                {
                    roundNode.setSelected(false);
                }
            }
        }


        // 支付方式选项   默认选择_payWay
        var _payWay = 0;
        if (this._isFriendCard)
            _payWay = this.getNumberItem("payWay", 0);
        else
            _payWay = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PayWay, 0);

        if(_payWay == 2)
            _payWay = 0;
        
        for (var i=0; i<this.payWayNodeArray.length; i++)
        {
            var payWayNode = this.payWayNodeArray[i];
            if (cc.sys.isObjectValid(payWayNode))
            {
                if (i == _payWay)
                {
                    payWayNode.setSelected(true);
                    var text = payWayNode.getChildByName("text");
                    this.selectedCB(text,true);
                }
                else
                {
                    payWayNode.setSelected(false);
                }
            }
        }

        cc.log("=======================xuzhou..=");
    }
});