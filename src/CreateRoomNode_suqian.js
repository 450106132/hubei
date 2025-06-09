/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_suqian = CreateRoomNode.extend({
    initAll:function(IsFriendCard)
    {   
        if (!IsFriendCard){
            this.localStorageKey.KEY_suqian_player_num   = "CF_SU_QIAN_PLAYER_NUM";     // 人数
            this.localStorageKey.KEY_suqian_lazhuang     = "_SU_QIAN_LA_ZHUANG";          //拉庄
            this.localStorageKey.KEY_suqian_tinghuType     = "_SU_QIAN_TING_HU_TYPE";          //听胡的类型
            this.localStorageKey.KEY_suqian_tuoguan     = "_SU_QIAN_tuoguan_TYPE";          //听胡的类型
        }

        this.bg_node = ccs.load("bg_suqian.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_suqian");
    },
    initPlayNode:function()
    {
        this._super();
        var _bgSuqianNode = this.bg_node.getChildByName("view");
        _bgSuqianNode.setScrollBarEnabled(false);
        var _playNumNode = _bgSuqianNode.getChildByName("player_num");

        var _play = _bgSuqianNode.getChildByName("play");
        this._playNodeBulazhuang_suqian = _play.getChildByName("play_bulazhuang");
        this._playNodeLazhuang_suqian   = _play.getChildByName("play_lazhuang");

        var nodeList = [];
        nodeList.push( _play.getChildByName("play_bulazhuang") );
        nodeList.push( _play.getChildByName("play_lazhuang") );   
        var that = this;    
        this._playNode_player_la_radio = createRadioBoxForCheckBoxs(nodeList, function(index){
            that.select_Lazhuang(index);
            this.radioBoxSelectCB(index,nodeList[index],nodeList);
        }.bind(this));
        this.addListenerText(nodeList,this._playNode_player_la_radio,this.select_Lazhuang.bind(this));
        this.list1 = nodeList;

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


        this._playNodeLazhuangfen1_suqian   = _play.getChildByName("play_lazhuangfen1");
        this._playNodeLazhuangfen2_suqian   = _play.getChildByName("play_lazhuangfen2");
        var nodeListfen = [];
        nodeListfen.push( _play.getChildByName("play_lazhuangfen1") );
        nodeListfen.push( _play.getChildByName("play_lazhuangfen2") );       
        this._playNode_player_fen_radio = createRadioBoxForCheckBoxs(nodeListfen,this.radioBoxSelectCB);
        this.addListenerText(nodeListfen,this._playNode_player_fen_radio);
        this.list2 = nodeListfen;

        this._playNodeButingKehu_suqian = _play.getChildByName("play_butingkehu");
        this._playNodeButingBuKehu_suqian   = _play.getChildByName("play_butingbukehu");
        var nodeListTing = [];
        nodeListTing.push( _play.getChildByName("play_butingkehu") );
        nodeListTing.push( _play.getChildByName("play_butingbukehu") ); 
        this.list3 = nodeListTing;      
        this._playNode_player_ting_radio = createRadioBoxForCheckBoxs(nodeListTing,this.radioBoxSelectCB);
        this.addListenerText(nodeListTing,this._playNode_player_ting_radio);

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
        this._playNumList = nodeList;
		
		this.initPlayNumNode(playNumList, [4, 3, 2, 4]);
    },

    select_Lazhuang:function(index){
        if (index == 1) {
                this._playNodeBulazhuang_suqian.setSelected(false);
                this._playNodeLazhuang_suqian.setSelected(true);
                this._playNodeLazhuangfen1_suqian.visible = true;
                this._playNodeLazhuangfen2_suqian.visible = true;
                this._playNodeLazhuangfen1_suqian.setSelected(true);
                this._playNodeLazhuangfen2_suqian.setSelected(false);
                var text = this._playNodeLazhuangfen1_suqian.getChildByName("text");
                this.selectedCB(text,true)
                var text = this._playNodeLazhuangfen2_suqian.getChildByName("text");
                this.selectedCB(text,false)

            }else{
                this._playNodeBulazhuang_suqian.setSelected(true);
                this._playNodeLazhuang_suqian.setSelected(false);
                this._playNodeLazhuangfen1_suqian.visible = false;
                this._playNodeLazhuangfen2_suqian.visible = false;
                this._playNodeLazhuangfen1_suqian.setSelected(false);
                this._playNodeLazhuangfen2_suqian.setSelected(false);
            }

    },

    setPlayNodeCurrentSelect:function(isClub)
    {
        this._super();
        var suqian_lazhuang;
        if (isClub)
            suqian_lazhuang = this.getNumberItem("lazhuangFen", 0);
        else
            suqian_lazhuang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_suqian_lazhuang, false);
        var index = 0;
        if(suqian_lazhuang == false)
        {
            this._playNodeBulazhuang_suqian.setSelected(true);
            this._playNodeLazhuang_suqian.setSelected(false);
            this._playNodeLazhuangfen1_suqian.visible = false;
            this._playNodeLazhuangfen2_suqian.visible = false;
            index = 0;

        }
        else
        {
            this._playNodeBulazhuang_suqian.setSelected(false);
            this._playNodeLazhuang_suqian.setSelected(true);
            this._playNodeLazhuangfen1_suqian.visible = true;
            this._playNodeLazhuangfen2_suqian.visible = true;
            this._playNodeLazhuangfen1_suqian.setSelected(true);
            this._playNodeLazhuangfen2_suqian.setSelected(false);
            index = 1;
            this.select_Lazhuang(index);
        }
        if (isClub) {
            this._playNodeLazhuangfen1_suqian.setSelected(suqian_lazhuang == 100);
            this._playNodeLazhuangfen2_suqian.setSelected(suqian_lazhuang == 200);
        }
        this.radioBoxSelectCB(index,this.list1[index],this.list1);

        var suqian_tinghuType;
        if (isClub)
            suqian_tinghuType = this.getNumberItem("tingHuType", 0);
        else
            suqian_tinghuType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_suqian_tinghuType, 0);
        var index = suqian_tinghuType == 0 ? 0:1;
        this._playNode_player_ting_radio.selectItem(index)
        this.radioBoxSelectCB(index,this.list3[index],this.list3);

        var _trustTime;
        if (isClub)
            _trustTime = [0, 60, 120, 180].indexOf(this.getNumberItem("trustTime", 0));
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_suqian_tuoguan, 0);
        this.tuoguanTypeList_radio.selectItem(_trustTime);
        this.radioBoxSelectCB(_trustTime,this.tuoguanList[_trustTime],this.tuoguanList);

        var _playnumIndex;
        if (isClub)
            if (this.getBoolItem("convertible", false))
                _playnumIndex = 3;
            else
                _playnumIndex = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            _playnumIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_suqian_player_num, 0);
        this._playNum_radio.selectItem(_playnumIndex);
        var text = this._playNum_radio.getSelectItem().getChildByName("text");
        this.selectedCB(text, _playnumIndex);
    },

    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.SU_QIAN;
        para.maxPlayer = 4;
        para.lazhuangFen = 0;
        para.tingHuType = 0;
        para.trustTime = 0;
        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps
        var lazhuang = false;
        if(this._playNodeLazhuang_suqian.isSelected())
        {
            lazhuang = true;
            if(this._playNodeLazhuangfen1_suqian.isSelected())
            {
                para.lazhuangFen = 100;
            }
            else
            {
                para.lazhuangFen = 200;
            }
        }else{
            para.lazhuangFen = 0;
            lazhuang = false;
        }
        para.tingHuType = this._playNodeButingKehu_suqian.isSelected() == true ?  0:1;
        cc.log("createara: " + JSON.stringify(para));

                // 人数
        para.convertible = false;  // 自由人数
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
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_suqian_lazhuang,lazhuang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_suqian_tuoguan, tuoguan);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_suqian_tinghuType,para.tingHuType);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_suqian_player_num, _playnumIndex);
        }
        return para;
    }
});