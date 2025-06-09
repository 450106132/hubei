/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_LYG = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_LYG_IsTing         = "_LIAN_YUN_GANG_TING";        //是否可听
        this.localStorageKey.KEY_LYG_AutoZhuang     = "_LIAN_YUN_GANG_AUTOZHUANG";  //随机坐庄
        this.localStorageKey.KEY_LYG_ThreeKou       = "_LIAN_YUN_GANG_THRESS";      //三口是否翻4倍
        this.localStorageKey.KEY_LYG_GangKai        = "_LIAN_YUN_GANG_KAI";         //开杠
        this.localStorageKey.KEY_LYG_count          = "_LIAN_YUN_GANG_COUNT";       //人数
        this.localStorageKey.KEY_LYG_count_1        = "_LIAN_YUN_GANG_COUNT1";      //备用读取人数的地方 如果count==2 在读取count_1
        this.localStorageKey.KEY_LYG_WuWanFeng      = "_LIAN_YUN_GANG_WUWANFENG";   //无万风
        this.localStorageKey.KEY_LYG_tuoguan        = "_LIAN_YUN_GANG_tuoguan";
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();

        this.bg_node = ccs.load("bg_lianyungang.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_lianyungang");
    },
    initPlayNode: function() {
        this._super();
        var _bgLianYunGangNode = this.bg_node.getChildByName("view");
        _bgLianYunGangNode.setScrollBarEnabled(false);
        //不听牌
        var _play = _bgLianYunGangNode.getChildByName("play");
        this.playNode_LYG_6 = _play.getChildByName("play_6");
        //可听牌
        this.playNode_LYG_7 = _play.getChildByName("play_7");
        var nodeList1 = [];
        nodeList1.push(_play.getChildByName("play_6"));
        nodeList1.push(_play.getChildByName("play_7"));
        this._playNode_player_ting_radio = createRadioBoxForCheckBoxs(nodeList1,this.radioBoxSelectCB);
        this.addListenerText(nodeList1, this._playNode_player_ting_radio);
        this._list = nodeList1;

        //随机坐庄
        this.play_autoZhuangNode = _play.getChildByName("play_suijizuozhuang");
        this.addListenerText(this.play_autoZhuangNode);
        this.play_autoZhuangNode.addEventListener(this.clickCB, this.play_autoZhuangNode);

        //设置三口,不翻倍
        this.play_threeYesNode = _play.getChildByName("play_threeYes");
        this.addListenerText(this.play_threeYesNode);
        this.play_threeYesNode.addEventListener(this.clickCB, this.play_threeYesNode);

        //杠开，翻四倍
        this.play_gangKaiNode = _play.getChildByName("play_gangkai");
        this.addListenerText(this.play_gangKaiNode);
        this.play_gangKaiNode.addEventListener(this.clickCB, this.play_gangKaiNode);

        //无万风
        this.play_wuWanFengNode = _play.getChildByName("play_wuWanFeng");
        this.addListenerText(this.play_wuWanFengNode);
        this.play_wuWanFengNode.addEventListener(this.clickCB, this.play_wuWanFengNode);


        //人数
        this._playNode_maxPlayer0 = _play.getChildByName("play_count0");
        this._playNode_maxPlayer1 = _play.getChildByName("play_count1");
        this._playNode_maxPlayer2 = _play.getChildByName("play_count2");
        this._playNode_maxPlayer3 = _play.getChildByName("play_count3");
        //this._playNode_maxPlayer2.visible = false;
        var nodeCountList1 = [];
        nodeCountList1.push(_play.getChildByName("play_count0"));
        nodeCountList1.push(_play.getChildByName("play_count1"));
        nodeCountList1.push(_play.getChildByName("play_count2"));
        nodeCountList1.push(_play.getChildByName("play_count3"));
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(nodeCountList1, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeCountList1[index], nodeCountList1);
        }.bind(this));
        this.addListenerText(nodeCountList1, this._playNode_player_count_radio,this.changePayForPlayerNum.bind(this));
        this._countlist = nodeCountList1;
		
		this.initPlayNumNode(nodeCountList1, [4, 3, 2, 4]);


		// 2人玩法增加[无万风选项]
        var that = this;
        this._playNode_maxPlayer2.schedule(function ()
        {
            if(that._playNode_maxPlayer2.isSelected())
            {
                that.play_wuWanFengNode.visible = true;
            }else{
                that.play_wuWanFengNode.visible = false;
            }
        });

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
    setPlayNodeCurrentSelect: function(isClub) {
        this._super();
        //设置上次创建房间时的默认选项
        
        var _currentTingState;
        if (isClub)
            _currentTingState = this.getNumberItem("tingType", TingCardType.commonTing) == TingCardType.commonTing;
        else
            _currentTingState = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_LYG_IsTing, true);
        var index = _currentTingState == true ? 1 : 0;
        this._playNode_player_ting_radio.selectItem(index);
        this.radioBoxSelectCB(index, this._list[index], this._list);

        var _autoZhuangState;
        if (isClub)
            _autoZhuangState = this.getBoolItem("AutoZhuang", false);
        else
            _autoZhuangState = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_LYG_AutoZhuang, false);
        this.play_autoZhuangNode.setSelected(_autoZhuangState);
        var text = this.play_autoZhuangNode.getChildByName("text");
        this.selectedCB(text, _autoZhuangState);

        var _currentThressState;
        if (isClub)
            _currentThressState = this.getBoolItem("IsThreeKouDouble", false);
        else
            _currentThressState = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_LYG_ThreeKou, false);
        this.play_threeYesNode.setSelected(_currentThressState);
        var text = this.play_threeYesNode.getChildByName("text");
        this.selectedCB(text, _currentThressState);

        var _gangKaiState;
        if (isClub)
            _gangKaiState = this.getBoolItem("gangkai4bei", false);
        else
            _gangKaiState = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_LYG_GangKai, false);
        this.play_gangKaiNode.setSelected(_gangKaiState);
        var text = this.play_gangKaiNode.getChildByName("text");
        this.selectedCB(text, _gangKaiState)

        var _wuWanFeng;
        if (isClub)
            _wuWanFeng = this.getBoolItem("wuWanFeng", false);
        else
            _wuWanFeng = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_LYG_WuWanFeng, false);
        this.play_wuWanFengNode.setSelected(_wuWanFeng);
        var text = this.play_wuWanFengNode.getChildByName("text");
        this.selectedCB(text, _wuWanFeng);

        var _trustTime;
        if (isClub)
            _trustTime = [0, 60, 120, 180].indexOf(this.getNumberItem("trustTime", 0));
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_LYG_tuoguan, 0);
        this.tuoguanTypeList_radio.selectItem(_trustTime);
        this.radioBoxSelectCB(_trustTime,this.tuoguanList[_trustTime],this.tuoguanList);

        //人数
        var _currentCount;
        if (isClub)
            if (this.getBoolItem("convertible", false))
                _currentCount = 3;
            else
                _currentCount = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_LYG_count, 0);
        if(_currentCount  == 2 )
        {
            _currentCount =  util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_LYG_count_1,0) == 1 ? 1:0 ;
        }
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);

        this.changePayForPlayerNum();
    },
    getSelectedPara: function() {
        var para = {};
        para.canDuiDuiHu = false;
        para.withWind = true;
        para.flowerType = WithFlowerType.noFlower;
        para.duoHu = true;
        para.zhuangFan = false;
        para.tingType = TingCardType.commonTing;
        para.gameType = MjClient.GAME_TYPE.LIAN_YUN_GANG;
        para.maxPlayer = 4;
        para.zmdpdouble = false;
        para.AutoZhuang = false; // 随机坐庄
        para.IsThreeKouDouble = false; //三口是否翻2倍
        para.gangkai4bei = false; //杠开4倍
        para.wuWanFeng = false;
        para.trustTime = 0;

        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps
        cc.log("create room -- by sking");
        //玩法


        //现在只有这一种选择 ， add by sking
        if (this.playNode_LYG_6.isSelected()) {
            para.tingType = TingCardType.noTing; //不要听
            if (!this._isFriendCard) {
                util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG_IsTing, false);
            }
        } else if (this.playNode_LYG_7.isSelected()) {
            para.tingType = TingCardType.commonTing; //可听牌
            if (!this._isFriendCard) {
                util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG_IsTing, true);
            }
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

        // 随机坐庄
        para.AutoZhuang = this.play_autoZhuangNode.isSelected();

        //三口是否翻4倍 add by sking
        para.IsThreeKouDouble = this.play_threeYesNode.isSelected(); //翻倍

        //杠开4倍 add by sking
        para.gangkai4bei = this.play_gangKaiNode.isSelected(); //翻倍

        if(this._playNode_maxPlayer2.isSelected())
        {
            para.wuWanFeng = this.play_wuWanFengNode.isSelected();   //无万风
            if (!this._isFriendCard) {
                util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG_WuWanFeng, para.wuWanFeng);
            }
        }


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
        if (!this._isFriendCard) {
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG_AutoZhuang, para.AutoZhuang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG_ThreeKou, para.IsThreeKouDouble);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG_GangKai, para.gangkai4bei);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_LYG_count, _countIdx)
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_LYG_count_1, _countIdx)
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG_tuoguan, tuoguan);
        }
        cc.log("------gameType localStorageEncrypt: " + para.gameType);
        cc.log("xinpu  createara: " + JSON.stringify(para));
        return para;
    }
});


var CreateRoomNode_LYG2 = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_LYG2_AutoZhuang    = "_LIAN_YUN_GANG2_AUTOZHUANG";     //随机坐庄
        this.localStorageKey.KEY_LYG2_IsTing        = "_LIAN_YUN_GANG2_TING";           //是否可听
        this.localStorageKey.KEY_LYG2_ThreeKou      = "_LIAN_YUN_GANG2_THRESS";         //三口是否翻4倍
        this.localStorageKey.KEY_LYG2_GangKai       = "_LIAN_YUN_GANG2_KAI";            //开杠
        this.localStorageKey.KEY_LYG2_count         = "_LIAN_YUN_GANG_COUNT";           //人数
        this.localStorageKey.KEY_LYG2_WuWanFeng     = "_LIAN_YUN_GANG2_WUWANFENG";      //无万风
        this.localStorageKey.KEY_LYG2_tuoguan       = "_LIAN_YUN2_GANG_tuoguan";
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();

        this.bg_node = ccs.load("bg_lianyungang2.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_lianyungang");
    },
    initPlayNode: function() {
        this._super();
        var _bgLianYunGangNode = this.bg_node;
        //不听牌
        var _play = _bgLianYunGangNode.getChildByName("play");
        this.playNode_LYG_6 = _play.getChildByName("play_6");
        //可听牌
        this.playNode_LYG_7 = _play.getChildByName("play_7");
        var nodeList1 = [];
        nodeList1.push(_play.getChildByName("play_6"));
        nodeList1.push(_play.getChildByName("play_7"));
        this._playNode_player_ting_radio = createRadioBoxForCheckBoxs(nodeList1,this.radioBoxSelectCB);
        this.addListenerText(nodeList1, this._playNode_player_ting_radio);
        this._list = nodeList1;

        //随机坐庄
        this.play_autoZhuangNode = _play.getChildByName("play_suijizuozhuang");
        this.addListenerText(this.play_autoZhuangNode);
        this.play_autoZhuangNode.addEventListener(this.clickCB, this.play_autoZhuangNode);

        //设置三口,不翻倍
        this.play_threeYesNode = _play.getChildByName("play_threeYes");
        this.addListenerText(this.play_threeYesNode);
        this.play_threeYesNode.addEventListener(this.clickCB, this.play_threeYesNode);

        //杠开，翻四倍
        this.play_gangKaiNode = _play.getChildByName("play_gangkai");
        this.addListenerText(this.play_gangKaiNode);
        this.play_gangKaiNode.addEventListener(this.clickCB, this.play_gangKaiNode);

        //无万风
        this.play_wuWanFengNode = _play.getChildByName("play_wuWanFeng");
        this.addListenerText(this.play_wuWanFengNode);
        this.play_wuWanFengNode.addEventListener(this.clickCB, this.play_wuWanFengNode);


       /* //人数
        this._playNode_maxPlayer0 = _play.getChildByName("play_count0");
        this._playNode_maxPlayer1 = _play.getChildByName("play_count1");
        this._playNode_maxPlayer2 = _play.getChildByName("play_count2");
        var nodeCountList1 = [];
        nodeCountList1.push(_play.getChildByName("play_count0"));
        nodeCountList1.push(_play.getChildByName("play_count1"));
        nodeCountList1.push(_play.getChildByName("play_count2"));

        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(nodeCountList1, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeCountList1[index], nodeCountList1);
        }.bind(this));
        this.addListenerText(nodeCountList1, this._playNode_player_count_radio,this.changePayForPlayerNum.bind(this));
        this._countlist = nodeCountList1;
        this.initPlayNumNode(nodeCountList1, [4, 3, 2]);

        if(this._data.isTwoPlayer)
        {
            for(var i = 0;i< nodeCountList1.length;i++)
            {
                nodeCountList1[i].visible = false;
            }
            _bgLianYunGangNode.getChildByName("play").getChildByName("text_1_2")
        }*/
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
    setPlayNodeCurrentSelect: function(isClub) {
        this._super();
        //设置上次创建房间时的默认选项
        var _currentTingState;
        if (isClub)
            _currentTingState = this.getNumberItem("tingType", TingCardType.commonTing) == TingCardType.commonTing;
        else
            _currentTingState = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_LYG2_IsTing, true);
        var index = _currentTingState == true ? 1 : 0;
        this._playNode_player_ting_radio.selectItem(index);
        this.radioBoxSelectCB(index, this._list[index], this._list);

        var _autoZhuangState;
        if (isClub)
            _autoZhuangState = this.getBoolItem("AutoZhuang", false);
        else
            _autoZhuangState = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_LYG2_AutoZhuang, false);
        this.play_autoZhuangNode.setSelected(_autoZhuangState);
        var text = this.play_autoZhuangNode.getChildByName("text");
        this.selectedCB(text, _autoZhuangState);

        var _currentThressState;
        if (isClub)
            _currentThressState = this.getBoolItem("IsThreeKouDouble", false);
        else
            _currentThressState = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_LYG2_ThreeKou, false);
        this.play_threeYesNode.setSelected(_currentThressState);
        var text = this.play_threeYesNode.getChildByName("text");
        this.selectedCB(text, _currentThressState)

        var _gangKaiState;
        if (isClub)
            _gangKaiState = this.getBoolItem("gangkai4bei", false);
        else
            _gangKaiState = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_LYG2_GangKai, false);
        this.play_gangKaiNode.setSelected(_gangKaiState);
        var text = this.play_gangKaiNode.getChildByName("text");
        this.selectedCB(text, _gangKaiState)

        var _trustTime;
        if (isClub)
            _trustTime = [0, 60, 120, 180].indexOf(this.getNumberItem("trustTime", 0));
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_LYG_tuoguan, 0);
        this.tuoguanTypeList_radio.selectItem(_trustTime);
        this.radioBoxSelectCB(_trustTime,this.tuoguanList[_trustTime],this.tuoguanList);

        var _wuWanFeng;
        if (isClub)
            _wuWanFeng = this.getBoolItem("wuWanFeng", false);
        else
            _wuWanFeng = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_LYG2_WuWanFeng, false);
        this.play_wuWanFengNode.setSelected(_wuWanFeng);
        var text = this.play_wuWanFengNode.getChildByName("text");
        this.selectedCB(text, _wuWanFeng);


        this.changePayForPlayerNum();
    },
    getSelectedPara: function() {
        var para = {};
        para.canDuiDuiHu = false;
        para.withWind = true;
        para.flowerType = WithFlowerType.noFlower;
        para.duoHu = true;
        para.zhuangFan = false;
        para.tingType = TingCardType.commonTing;
        para.gameType = MjClient.GAME_TYPE.LIAN_YUN_GANG;
        para.maxPlayer = 4;
        para.zmdpdouble = false;
        para.AutoZhuang = false; // 随机坐庄
        para.IsThreeKouDouble = false; //三口是否翻2倍
        para.gangkai4bei = false; //杠开4倍
        para.wuWanFeng = false;
        para.trustTime = 0;
        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps
        cc.log("create room -- by sking");
        //玩法


        //现在只有这一种选择 ， add by sking
        if (this.playNode_LYG_6.isSelected()) {
            para.tingType = TingCardType.noTing; //不要听
            if (!this._isFriendCard) {
                util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG2_IsTing, false);
            }
        } else if (this.playNode_LYG_7.isSelected()) {
            para.tingType = TingCardType.commonTing; //可听牌
            if (!this._isFriendCard) {
                util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG2_IsTing, true);
            }
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

        // 随机坐庄
        para.AutoZhuang = this.play_autoZhuangNode.isSelected();

        //三口是否翻4倍 add by sking
        para.IsThreeKouDouble = this.play_threeYesNode.isSelected(); //翻倍

        //杠开4倍 add by sking
        para.gangkai4bei = this.play_gangKaiNode.isSelected(); //翻倍

       
        para.wuWanFeng = this.play_wuWanFengNode.isSelected();   //无万风
        if (!this._isFriendCard) {
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG2_AutoZhuang, para.AutoZhuang);
            //util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG2_IsTing, para.IsThreeKouDouble);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG2_ThreeKou, para.IsThreeKouDouble);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG2_GangKai, para.gangkai4bei);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_LYG2_count, 2);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_LYG2_tuoguan, tuoguan);
        }

        //人数
        para.maxPlayer = 2;
        cc.log("------gameType localStorageEncrypt: " + para.gameType);
        cc.log("xinpu  createara: " + JSON.stringify(para));
        return para;
    }
});