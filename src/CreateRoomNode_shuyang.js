/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_shuyang = CreateRoomNode.extend({
    
    initAll:function(IsFriendCard)
    {   
        if (!IsFriendCard){
            this.localStorageKey.KEY_shuyang_flowerCount = "_SHU_YANG_FLOWER_COUNT"; //底花点数
            this.localStorageKey.KEY_shuyang_Pie         = "_SHU_YANG_PIE";             //撇的方式
            this.localStorageKey.KEY_SHU_YANG_count  = "_SHU_YANG_COUNT"; //人数
        }

        this.bg_node = ccs.load("bg_shuyang.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_shuyang");
    },
    initPlayNode:function()
    {
        this._super();
        var _bgShuYangNode = this.bg_node.getChildByName("view");
        _bgShuYangNode.setScrollBarEnabled(false);

        //胡牌底花
        var _play_point = _bgShuYangNode.getChildByName("play_point");
        this.flowerPonit_3 = _play_point.getChildByName("play_3");
        this.flowerPonit_5 = _play_point.getChildByName("play_5");
        var nodeList1 = [];
        nodeList1.push( _play_point.getChildByName("play_3") );
        nodeList1.push( _play_point.getChildByName("play_5") );       
        this._playNode_play_radio = createRadioBoxForCheckBoxs(nodeList1,this.radioBoxSelectCB);
        this.addListenerText(nodeList1,this._playNode_play_radio);
        this.list1 = nodeList1;
        //大撇
        this.pie_1 = _play_point.getChildByName("play_pie");
        this.pie_2 = _play_point.getChildByName("play_noPie");
        var nodeList = [];
        nodeList.push( _play_point.getChildByName("play_pie") );
        nodeList.push( _play_point.getChildByName("play_noPie") );       
        this._playNode_player_pie_radio = createRadioBoxForCheckBoxs(nodeList,this.radioBoxSelectCB);
        this.addListenerText(nodeList,this._playNode_player_pie_radio);
        this.list2 = nodeList;

        this._playNode_tuoguanType_0 = _play_point.getChildByName("tuoguan0");
        this._playNode_tuoguanType_1 = _play_point.getChildByName("tuoguan1");
        this._playNode_tuoguanType_2 = _play_point.getChildByName("tuoguan2");
        this._playNode_tuoguanType_3 = _play_point.getChildByName("tuoguan3");
        var tuoguanList = [];
        tuoguanList.push(_play_point.getChildByName("tuoguan0"));
        tuoguanList.push(_play_point.getChildByName("tuoguan1"));
        tuoguanList.push(_play_point.getChildByName("tuoguan2"));
        tuoguanList.push(_play_point.getChildByName("tuoguan3"));
        var self = this;
        this.tuoguanTypeList_radio = createRadioBoxForCheckBoxs(tuoguanList, function(index){
            //self.refreshZhuaNiao();
            self.radioBoxSelectCB(index,tuoguanList[index],tuoguanList);
        });
        this.addListenerText(tuoguanList,this.tuoguanTypeList_radio);
        this.tuoguanList = tuoguanList;

        var btn_tuoguanTip = _play_point.getChildByName("btn_tuoguanTip");
        var image_tuoguanTip = _play_point.getChildByName("image_tuoguanTip");
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

        //人数
        this._playNode_maxPlayer0 = _play_point.getChildByName("play_count0");
        this._playNode_maxPlayer1 = _play_point.getChildByName("play_count1");
        this._playNode_maxPlayer2 = _play_point.getChildByName("play_count2");
        this._playNode_maxPlayer3 = _play_point.getChildByName("play_count3");
        var nodeCountList1 = [];
        nodeCountList1.push(_play_point.getChildByName("play_count0"));
        nodeCountList1.push(_play_point.getChildByName("play_count1"));
        nodeCountList1.push(_play_point.getChildByName("play_count2"));
        nodeCountList1.push(_play_point.getChildByName("play_count3"));
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(nodeCountList1,function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeCountList1[index], nodeCountList1);
        }.bind(this));
        this.addListenerText(nodeCountList1, this._playNode_player_count_radio,this.changePayForPlayerNum.bind(this));
        this._countlist = nodeCountList1;
		
		this.initPlayNumNode(nodeCountList1, [4, 3, 2, 4]);
    },
    setPlayNodeCurrentSelect:function(isClub)
    {
        this._super();
        var _flowerPonit_shuyang;
        if (isClub)
            _flowerPonit_shuyang = this.getNumberItem("flowerCount", 2);
        else
            _flowerPonit_shuyang = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_shuyang_flowerCount, 2);
        var index = _flowerPonit_shuyang == 2 ? 0 : 1;
        this.flowerPonit_3.setSelected(_flowerPonit_shuyang == 2);
        this.flowerPonit_5.setSelected(_flowerPonit_shuyang != 2);
        this.radioBoxSelectCB(index,this.list1[index],this.list1);

        var _pie;
        if (isClub)
            _pie = this.getBoolItem("dapie", false);
        else
            _pie = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_shuyang_Pie,false);
        var list = [];
        list.push(this.pie_1);
        list.push(this.pie_2);
        var index = _pie == true ? 0:1;
        this.pie_1.setSelected(_pie);
        this.pie_2.setSelected(!_pie);
        this.radioBoxSelectCB(index,list[index],list);

        var _trustTime;
        if (isClub)
            _trustTime = [0, 60, 120, 180].indexOf(this.getNumberItem("trustTime", 0));
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_siyang__tuoguan, 0);
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
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_SHU_YANG_count, 0);
        cc.log("_currentCount renshu  == " + _currentCount)
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);


        this.changePayForPlayerNum();
        },
    getSelectedPara:function()
    {
        var para = {};
        para.canDuiDuiHu = true;
        para.withWind = false;
        para.flowerType = WithFlowerType.commonFlower;//东西南北春夏秋冬梅兰竹菊
        para.duoHu = false;
        para.zhuangFan = false;
        para.tingType = TingCardType.commonTing;
        para.gameType = MjClient.GAME_TYPE.SHU_YANG;
        para.maxPlayer = 4;
        para.zmdpdouble = false;
        para.trustTime = 0;
        para.flowerCount = 2;//底花选项
        para.dapie  = false;// 撇
        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps
        cc.log("create room **************************** SHUYANG-- by sking");
        //底花
        para.flowerCount = this.flowerPonit_3.isSelected() == true ? 2:5;
        //撇
        para.dapie = this.pie_1.isSelected() == true ? true:false;

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
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_shuyang_flowerCount, para.flowerCount);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_shuyang_Pie, para.dapie);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_shuyang_tuoguan, tuoguan);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_SHU_YANG_count, _countIdx)
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});