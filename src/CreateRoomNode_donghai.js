/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_donghai = CreateRoomNode.extend({

    initAll: function(IsFriendCard) {
        if (!IsFriendCard) { //朋友圈
            this.localStorageKey.KEY_donghai_player_num   = "_DONG_HAI_PLAYER_NUM";     // 人数
            this.localStorageKey.KEY_donghai_JiaZhu = "_DONG_HAI_JIA_ZHU"; //加注
            this.localStorageKey.KEY_donghai_duohu = "_DONG_HAI_DUO_HU"; //多胡
            this.localStorageKey.KEY_donghai_tuoguan             = "_DONG_HAI_tuoguan";    //是否开启听牌提示
        }

        this.bg_node = ccs.load("bg_donghai.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_donghai");
    },
    initPlayNode: function() {
        this._super();
        var _bgDongHaiNode = this.bg_node.getChildByName("view");
        var _playNumNode = _bgDongHaiNode.getChildByName("player_num");
        _bgDongHaiNode.setScrollBarEnabled(false);
        
        var _play_way = _bgDongHaiNode.getChildByName("play_way");
        this.jiaZhuNode_donghai_1 = _play_way.getChildByName("jiazhu_1");
        this.jiaZhuNode_donghai_2 = _play_way.getChildByName("jiazhu_2");
        var nodeList1 = [];
        nodeList1.push(_play_way.getChildByName("jiazhu_1"));
        nodeList1.push(_play_way.getChildByName("jiazhu_2"));
        this._list = nodeList1;
        this._playNode_player_jz_radio = createRadioBoxForCheckBoxs(nodeList1, this.radioBoxSelectCB);
        this.addListenerText(nodeList1,this._playNode_player_jz_radio);


        this.duohuNode_donghai_1 = _play_way.getChildByName("jiehu");
        this.duohuNode_donghai_2 = _play_way.getChildByName("duohu");
        var nodeDuoHuList1 = [];
        nodeDuoHuList1.push(_play_way.getChildByName("jiehu"));
        nodeDuoHuList1.push(_play_way.getChildByName("duohu"));
        this._duoHulist = nodeDuoHuList1;
        this._playNode_player_duoHu_radio = createRadioBoxForCheckBoxs(nodeDuoHuList1, this.radioBoxSelectCB);
        this.addListenerText(nodeDuoHuList1,this._playNode_player_duoHu_radio);

        this._playNode_tuoguanType_0 = _play_way.getChildByName("tuoguan0");
        this._playNode_tuoguanType_1 = _play_way.getChildByName("tuoguan1");
        this._playNode_tuoguanType_2 = _play_way.getChildByName("tuoguan2");
        this._playNode_tuoguanType_3 = _play_way.getChildByName("tuoguan3");
        var tuoguanList = [];
        tuoguanList.push(_play_way.getChildByName("tuoguan0"));
        tuoguanList.push(_play_way.getChildByName("tuoguan1"));
        tuoguanList.push(_play_way.getChildByName("tuoguan2"));
        tuoguanList.push(_play_way.getChildByName("tuoguan3"));
        var self = this;
        this.tuoguanTypeList_radio = createRadioBoxForCheckBoxs(tuoguanList, function(index){
            //self.refreshZhuaNiao();
            self.radioBoxSelectCB(index,tuoguanList[index],tuoguanList);
        });
        this.addListenerText(tuoguanList,this.tuoguanTypeList_radio);
        this.tuoguanList = tuoguanList;

        var btn_tuoguanTip = _play_way.getChildByName("btn_tuoguanTip");
        var image_tuoguanTip = _play_way.getChildByName("image_tuoguanTip");
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


        var playNumList = [];
        playNumList.push( _playNumNode.getChildByName("play_count0") );
        playNumList.push( _playNumNode.getChildByName("play_count1") );
        playNumList.push( _playNumNode.getChildByName("play_count2") );
        playNumList.push( _playNumNode.getChildByName("play_count3") );
        this._playNum_radio = createRadioBoxForCheckBoxs(playNumList, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index,playNumList[index],playNumList);
        }.bind(this));
        this.addListenerText(playNumList, this._playNum_radio, this.changePayForPlayerNum.bind(this));
        this._playNumList = playNumList;
	
		this.initPlayNumNode(playNumList, [4, 3, 2, 4]);
    },
    setPlayNodeCurrentSelect: function(isClub) {
        this._super();
        var _jiazhu;
        if (isClub)
            _jiazhu = this.getBoolItem("isJiaZhu", true);
        else
            _jiazhu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_donghai_JiaZhu, true);
        var index = _jiazhu == true ? 0:1;
        this.jiaZhuNode_donghai_1.setSelected(_jiazhu);
        this.jiaZhuNode_donghai_2.setSelected(!_jiazhu);
        this.radioBoxSelectCB(index,this._list[index],this._list);

        var _duohu;
        if (isClub)
            _duohu = this.getBoolItem("duoHu", false);
        else 
            _duohu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_donghai_duohu, false);

        var duohuindex = _duohu == true ? 1:0;
        this.duohuNode_donghai_1.setSelected(!_duohu);
        this.duohuNode_donghai_2.setSelected(_duohu);
        this.radioBoxSelectCB(duohuindex,this._duoHulist[duohuindex],this._duoHulist);

        var _trustTime;
        if (isClub)
        {
            _trustTime = [0, 60, 120, 180].indexOf(this.getNumberItem("trustTime", 0));
        }
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_donghai_tuoguan, 0);
        this.tuoguanTypeList_radio.selectItem(_trustTime);
        this.radioBoxSelectCB(_trustTime,this.tuoguanList[_trustTime],this.tuoguanList);


        var _playnumIndex;
        if (isClub)
            if (this.getBoolItem("convertible", false))
                _playnumIndex = 3;
            else
                _playnumIndex = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            _playnumIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_donghai_player_num, 0);
        this._playNum_radio.selectItem(_playnumIndex);
        var text = this._playNum_radio.getSelectItem().getChildByName("text");
        this.selectedCB(text, _playnumIndex);
    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.DONG_HAI;
        para.maxPlayer = 4;
        para.isJiaZhu = true; //是否加注
        para.duoHu = false; //默认截胡
        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected();
        para.convertible = false;  // 自由人数
        //是否加注
        para.isJiaZhu = this.jiaZhuNode_donghai_1.isSelected() == true ? true :false;

        //是否多胡
        para.duoHu = this.duohuNode_donghai_2.isSelected();

        para.trustTime = 0;

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
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_donghai_JiaZhu, para.isJiaZhu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_donghai_duohu, para.duoHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_donghai_tuoguan, tuoguan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_donghai_player_num, _playnumIndex);
        }
        cc.log("createara: " + JSON.stringify(para));

        return para;
    }
});