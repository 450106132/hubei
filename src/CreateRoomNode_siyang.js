/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_siyang = CreateRoomNode.extend({

    initAll: function(IsFriendCard) {
        if (!IsFriendCard) {
            this.localStorageKey.KEY_siyang_maxPlayer     = "_CF_SI_YANG_MAX_PLAYER";       //几人玩
            this.localStorageKey.KEY_siyang_zuizi = "_SI_YANG_ZUI_ZI"; //嘴子
            this.localStorageKey.KEY_siyang_jiaoting = "_SI_YANG_JIAO_TING"; //是否必须叫听
            this.localStorageKey.KEY_siyang_tuoguan             = "_SI_YANG_tuoguan";
            this.localStorageKey.KEY_siyang_difen             = "_SI_YANG_difen";
            this.localStorageKey.KEY_siyang_qiaogang             = "_SI_YANG_qiaogang";
            this.localStorageKey.KEY_siyang_putoutSpeed             = "_SI_YANG_putoutSpeed";
        }

        this.bg_node = ccs.load("bg_siyang.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_siyang");
    },

    selectPay: function(roundNumObj, str_type, str_pay) {
        for (var i=0; i<this.roundNodeArray.length; i++) {
            var roundNode = this.roundNodeArray[i];
            if (cc.sys.isObjectValid(roundNode) ) {
                if (! roundNumObj[i] || !str_pay || (str_pay[i] && str_pay[i]<0)) {
                    roundNode.visible = false;
                    cc.log('warn 局数按钮隐藏 selectPay no roundNumObj', roundNumObj, i, str_pay);
                    continue;
                }

                var text = roundNode.getChildByName("text");
                var text_0 = roundNode.getChildByName("text_0");
                if (text_0) {
                    text.setString(roundNumObj[i] + "局");
                    var maxPlayerIndex = this.maxPlayerList_radio.getSelectIndex();
                    if (maxPlayerIndex == 3) {
                        // 自由人数（价格显示调整：显示选择不同人数时，最小和最大消耗元宝的区间范围）
                        var paySection = this.getMinPlayerStrPay(str_pay);
                        text_0.setString("(" + paySection[i] + this._costName + ")");
                    }
                    else {
                        text_0.setString("(" + str_pay[i] + this._costName + ")");
                    }
                    if (this._isRoomCardMode) {
                        text_0.visible = false;
                    }
                }
            }
        }
    },

    getMinPlayerStrPay: function (str_pay) {
        // 获取最小人数的价格配置
        var pGameType = this._data.gameType;
        var minPlayerNum = 2; // 最小人数
        var pPriceCfg = MjClient.data.gamePrice;
        var totalPayWayArray = pPriceCfg[pGameType][minPlayerNum];

        // 根据已选择的付费方式，取出相应的价格配置
        var str_pay_min = [];
        for (var i = 0; i < this.payWayNodeArray.length; i++) {
            var payWayNode = this.payWayNodeArray[i];
            if (cc.sys.isObjectValid(payWayNode) && payWayNode.isSelected()) {
                var roundNumObj = this.getRoundNumObj();
                var payWayArr = [];
                for (var j in roundNumObj) {
                    var __roundNum = roundNumObj[j];
                    var __payWay = totalPayWayArray[__roundNum];
                    if ( __payWay[i] || __payWay[i] == 0) payWayArr.push(__payWay[i]);
                }
                if (payWayArr.length > 0) str_pay_min = payWayArr;
            }
        }

        // 求取价格区间范围
        var paySection = [];
        for (var i = 0; i < str_pay.length; i++) {
            paySection[i] = str_pay[i] + "";
            if (str_pay[i] != str_pay_min[i]) {
                paySection[i] = str_pay_min[i] + "~" + str_pay[i];
            }
        }

        return paySection;
    },

    initPlayNode: function() {
        this._super();
        var _bgSiyangNode = this.bg_node.getChildByName("view");
        _bgSiyangNode.setScrollBarEnabled(false);
        var _play = _bgSiyangNode.getChildByName("play");


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

        this._playNode_difen0 = _play.getChildByName("difen0");
        this._playNode_difen1 = _play.getChildByName("difen1");
        var difenList = [];
        difenList.push(_play.getChildByName("difen0"));
        difenList.push(_play.getChildByName("difen1"));
        this.difenList_radio = createRadioBoxForCheckBoxs(difenList, function(index){
            self.radioBoxSelectCB(index,difenList[index],difenList);
        });
        this.addListenerText(difenList,this.difenList_radio);
        this.difenList = difenList;

        this._playNode__putoutSpeed0 = _play.getChildByName("play_putoutSpeed1");
        this._playNode__putoutSpeed1 = _play.getChildByName("play_putoutSpeed2");
        var speedList = [];
        speedList.push(this._playNode__putoutSpeed0);
        speedList.push(this._playNode__putoutSpeed1);
        this.speedList_radio = createRadioBoxForCheckBoxs(speedList, function(index){
            self.radioBoxSelectCB(index,speedList[index],speedList);
        });
        this.addListenerText(speedList,this.speedList_radio);
        this.speedList = speedList;

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

        //几人玩
        var maxPlayerList = [];
        maxPlayerList.push(_play.getChildByName("maxPlayer4"));
        maxPlayerList.push(_play.getChildByName("maxPlayer3"));
        maxPlayerList.push(_play.getChildByName("maxPlayer2"));
        maxPlayerList.push(_play.getChildByName("maxPlayer1"));
        this.maxPlayerList_radio = createRadioBoxForCheckBoxs(maxPlayerList, function(index) {
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, maxPlayerList[index], maxPlayerList);
        }.bind(this));
        this.addListenerText(maxPlayerList, this.maxPlayerList_radio, this.changePayForPlayerNum.bind(this));
        this.maxPlayerList = maxPlayerList;
		this.initPlayNumNode(maxPlayerList, [4, 3, 2, 4])
		
        this.jiaZhuNode_siyang_1 = _play.getChildByName("play_xiazui");
        this.jiaZhuNode_siyang_2 = _play.getChildByName("play_buxiazui");
        this.jiaZhuNode_siyang_3 = _play.getChildByName("play_xiazui4");
        var nodeList = [];
        nodeList.push(_play.getChildByName("play_xiazui"));
        nodeList.push(_play.getChildByName("play_xiazui4"));
        nodeList.push(_play.getChildByName("play_buxiazui"));
        //this._playNode_player_xia_radio = createRadioBoxForCheckBoxs(nodeList,this.radioBoxSelectCB);
        this._playNode_player_xia_radio = createRadioBoxForCheckBoxs(nodeList, function(index) {
            this.radioBoxSelectCB(index, nodeList[index], nodeList);
        }.bind(this));
        this.addListenerText(nodeList, this._playNode_player_xia_radio);
        this.list = nodeList;
        this.getSelectNum(nodeList,[2, 4, 0]);

        this.jiaotingNode_siyang = _play.getChildByName("play_bixujiaoting");
        this.addListenerText(this.jiaotingNode_siyang);
        this.jiaotingNode_siyang.addEventListener(this.clickCB, this.jiaotingNode_siyang);

        this.qiaogangNode_siyang = _play.getChildByName("play_qiaogang");
        this.addListenerText(this.qiaogangNode_siyang);
        this.qiaogangNode_siyang.addEventListener(this.clickCB, this.qiaogangNode_siyang);
        this.qiaogangNode_siyang.visible = false;

        var that = this;
        this.qiaogangNode_siyang.schedule(function() {
            that.qiaogangNode_siyang.visible = that.jiaotingNode_siyang.isSelected();
        })
    },

    setPlayNodeCurrentSelect: function(isClub) {
        this._super();
        
        var maxPlayer;
        if (isClub)
            if (this.getBoolItem("convertible", false))
                maxPlayer = 3;
            else
                maxPlayer = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            maxPlayer = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_siyang_maxPlayer, 0);
        this.maxPlayerList_radio.selectItem(maxPlayer);
        this.radioBoxSelectCB(maxPlayer, this.maxPlayerList[maxPlayer], this.maxPlayerList);

        var siyang_xiazui;
        if (isClub)
            siyang_xiazui = [2, 4, 0].indexOf(this.getNumberItem("zuizi", 2));
        else
            siyang_xiazui = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_siyang_zuizi, 0);

        cc.log("记忆选中---------------  ",siyang_xiazui);
        this._playNode_player_xia_radio.selectItem(siyang_xiazui);
        this.radioBoxSelectCB(siyang_xiazui, this.list[siyang_xiazui], this.list);

        var siyang_difen;
        if (isClub)
            siyang_difen = [0.5, 1].indexOf(this.getNumberItem("difen", 1));
        else
            siyang_difen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_siyang_difen, 1);
        this.difenList_radio.selectItem(siyang_difen);
        this.radioBoxSelectCB(siyang_difen, this.difenList[siyang_difen], this.difenList);

        var siyang_quickly;
        if (isClub)
            siyang_quickly = [0, 1].indexOf(this.getNumberItem("quickly", 0));
        else
            siyang_quickly = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_siyang_putoutSpeed, 0);
        this.speedList_radio.selectItem(siyang_quickly);
        this.radioBoxSelectCB(siyang_quickly, this.speedList[siyang_quickly], this.speedList);


        var siyang_jiaoting;
        if (isClub)
            siyang_jiaoting = this.getBoolItem("mustTing", false);
        else
            siyang_jiaoting = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_siyang_jiaoting, false);
        this.jiaotingNode_siyang.setSelected(siyang_jiaoting);
        var text = this.jiaotingNode_siyang.getChildByName("text");
        this.selectedCB(text, siyang_jiaoting)

        var siyang_qiaogang;
        if (isClub)
            siyang_qiaogang = this.getBoolItem("mustTing", false);
        else
            siyang_qiaogang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_siyang_qiaogang, false);
        this.qiaogangNode_siyang.setSelected(siyang_qiaogang);
        var text = this.qiaogangNode_siyang.getChildByName("text");
        this.selectedCB(text, siyang_qiaogang)

        var _trustTime;
        if (isClub)
            _trustTime = [0, 60, 120, 180].indexOf(this.getNumberItem("trustTime", 0));
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_siyang__tuoguan, 0);
        this.tuoguanTypeList_radio.selectItem(_trustTime);
        this.radioBoxSelectCB(_trustTime,this.tuoguanList[_trustTime],this.tuoguanList);

        // 这一行代码必须在最后，因为他会间接调用getSelectedPara
        this.changePayForPlayerNum();
    },

    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.SI_YANG;
        para.convertible = false;
        var maxPlayerIndex = this.maxPlayerList_radio.getSelectIndex();
        para.maxPlayer = [4, 3, 2, 4][maxPlayerIndex];     // 人数
        para.trustTime = 0;
        para.difen = 1;
        para.qiaogang = this.qiaogangNode_siyang.isSelected();
        if (maxPlayerIndex == 3) 
        {
            para.convertible = true;
        }
        var difenindex = 1;
        if (this._playNode_difen0.isSelected()){
            para.difen = 0.5;
            difenindex = 0;
        }else if (this._playNode_difen1.isSelected()){
            para.difen = 1;
            difenindex = 1;
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
        if (this._playNode__putoutSpeed0.isSelected()){
            para.quickly = 0;
        }else if (this._playNode__putoutSpeed1.isSelected()){
            para.quickly = 1;
        }
        para.zuizi = true; //是否带嘴
        para.mustTing = this.jiaotingNode_siyang.isSelected();
        if (!para.mustTing) para.qiaogang = false;
        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps
        //是否加注
        var zuiziIndex = this._playNode_player_xia_radio.getSelectIndex();
        para.zuizi = [2, 4, 0][zuiziIndex];     // 人数

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_siyang_maxPlayer, maxPlayerIndex);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_siyang_zuizi, zuiziIndex);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_siyang_tuoguan, tuoguan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_siyang_jiaoting, para.mustTing);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_siyang_qiaogang, para.qiaogang);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_siyang_difen, difenindex);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_siyang_putoutSpeed, para.quickly);
        }
        //cc.log("------gameType localStorageEncrypt: " + _gameType);
        cc.log("createara: " + JSON.stringify(para));
        return para;
    },

    getSelectNum : function(node,nums) {
        var playnum = 4;
        for(var i in node) {

            if(node[i].isSelected()) playnum = [nums[i]];
        }
        return playnum;
    }
});