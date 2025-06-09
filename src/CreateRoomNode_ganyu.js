/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_ganyu = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_ganyu_jiaoTing      = "_GAN_YU_JIAO_TING";     //叫听
        this.localStorageKey.KEY_ganyu_duohu         = "_GAN_YU_DUO_HU";        //胡
        this.localStorageKey.KEY_ganyu_chi           = "_GAN_YU_CHI";           //可吃
        this.localStorageKey.KEY_ganyu_flowerCount   = "_GAN_YU_FLOWER_COUNT";  //花数
        this.localStorageKey.KEY_ganyu_diFen        = "_GAN_YU_DI_FEN";         //底分
        this.localStorageKey.KEY_ganyu_count          = "_GAN_YU_COUNT"; //人数
        this.localStorageKey.KEY_ganyu_tuoguan             = "_GAN_YU_tuoguan";
    },
    initAll:function(IsFriendCard)
    {   
        if (!IsFriendCard)
            this.setKey();

        this.bg_node = ccs.load("bg_ganyu.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_ganyu");
    },
    initPlayNode:function()
    {
        this._super();
        var _bgganyuNode = this.bg_node.getChildByName("view");
        _bgganyuNode.setScrollBarEnabled(false);

        //花
        var _play = _bgganyuNode.getChildByName("play");
        this._playNode_ting_1 = _play.getChildByName("ting");
        this._playNode_ting_2 = _play.getChildByName("noTing");
        var nodeListTing = [];
        nodeListTing.push( _play.getChildByName("ting") );
        nodeListTing.push( _play.getChildByName("noTing") );
        this._playNode_player_ting_radio = createRadioBoxForCheckBoxs(nodeListTing,this.radioBoxSelectCB);
        this.addListenerText(nodeListTing,this._playNode_player_ting_radio);


        //花
        var _play = _bgganyuNode.getChildByName("play");
        this._playNode_flower36 = _play.getChildByName("flower36");
        this._playNode_flower20 = _play.getChildByName("flower20");
        var nodeList1 = [];
        nodeList1.push( _play.getChildByName("flower36") );
        nodeList1.push( _play.getChildByName("flower20") );
        this._playNode_player_flower_radio = createRadioBoxForCheckBoxs(nodeList1,this.radioBoxSelectCB);
        this.addListenerText(nodeList1,this._playNode_player_flower_radio);



        //底分
        this._playNode_difen1 = _play.getChildByName("difen1");
        this._playNode_difen2 = _play.getChildByName("difen2");
        var nodeList = [];
        nodeList.push( _play.getChildByName("difen1") );
        nodeList.push( _play.getChildByName("difen2") );
        this._playNode_player_zf_radio = createRadioBoxForCheckBoxs(nodeList,this.radioBoxSelectCB);
        this.addListenerText(nodeList,this._playNode_player_zf_radio);


        this._playNode_duohu = _play.getChildByName("duohu");
        this.addListenerText(this._playNode_duohu);
        this._playNode_duohu.addEventListener(this.clickCB, this._playNode_duohu);

        this._playNode_chi = _play.getChildByName("chi");
        this.addListenerText(this._playNode_chi);
        this._playNode_chi.addEventListener(this.clickCB, this._playNode_chi);


        //人数
        this._playNode_maxPlayer0 = _play.getChildByName("play_count0");
        this._playNode_maxPlayer1 = _play.getChildByName("play_count1");
        this._playNode_maxPlayer2 = _play.getChildByName("play_count2");
        this._playNode_maxPlayer3 = _play.getChildByName("play_count3");
        var nodeCountList1 = [];
        nodeCountList1.push(_play.getChildByName("play_count0"));
        nodeCountList1.push(_play.getChildByName("play_count1"));
        nodeCountList1.push(_play.getChildByName("play_count2"));
        nodeCountList1.push(_play.getChildByName("play_count3"));
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(nodeCountList1, function(index){
            cc.log("------gan yu index = " + index);
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeCountList1[index], nodeCountList1);
        }.bind(this));
        this.addListenerText(nodeCountList1, this._playNode_player_count_radio,this.changePayForPlayerNum.bind(this));
        this._countlist = nodeCountList1;

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

		this.initPlayNumNode(nodeCountList1, [4, 3, 2, 4]);

    },
    setPlayNodeCurrentSelect:function(isClub)
    {
        this._super();
        var _tingType;
        if (isClub)
            _tingType = this.getNumberItem("tingType", TingCardType.commonTing);
        else
            _tingType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_ganyu_jiaoTing,TingCardType.commonTing);
        var list = [];
        list.push(this._playNode_ting_1);
        list.push(this._playNode_ting_2);
        var index = 0;
        var isbool = _tingType === TingCardType.commonTing ? true:false;
        this._playNode_ting_1.setSelected(isbool);
        this._playNode_ting_2.setSelected(!isbool);
        index =  isbool == true ? 0 : 1;
        this.radioBoxSelectCB(index,list[index],list);

        var _flowerCount;
        if (isClub)
            _flowerCount = this.getNumberItem("flowerCount", 20);
        else
            _flowerCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_ganyu_flowerCount,20);
        var list = [];
        list.push(this._playNode_flower36);
        list.push(this._playNode_flower20);
        var index = _flowerCount === 36 ? 0:1;
        var isbool = _flowerCount === 36 ? true:false;
        this._playNode_flower36.setSelected(isbool);
        this._playNode_flower20.setSelected(!isbool);
        this.radioBoxSelectCB(index,list[index],list);

        var _difen;
        if (isClub)
            _difen = this.getNumberItem("difen", 2);
        else 
            _difen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_ganyu_diFen,2);
        var list = [];
        list.push(this._playNode_difen1);
        list.push(this._playNode_difen2);
        var index = _difen === 2 ? 0 : 1;
        var isbool = _difen === 2 ? true:false;
        this._playNode_difen1.setSelected(isbool);
        this._playNode_difen2.setSelected(!isbool);
        this.radioBoxSelectCB(index,list[index],list);

        var _isDuohu;
        if (isClub)
            _isDuohu = this.getBoolItem("duoHu", false);
        else
            _isDuohu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_ganyu_duohu,false);
        this._playNode_duohu.setSelected(_isDuohu);
        var text = this._playNode_duohu.getChildByName("text");
        this.selectedCB(text,_isDuohu)

        var _trustTime;
        if (isClub)
            _trustTime = [0, 60, 120, 180].indexOf(this.getNumberItem("trustTime", 0));
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_ganyu_tuoguan, 0);
        this.tuoguanTypeList_radio.selectItem(_trustTime);
        this.radioBoxSelectCB(_trustTime,this.tuoguanList[_trustTime],this.tuoguanList);

        var _ischi;
        if (isClub)
            _ischi = this.getBoolItem("canChi", true);
        else
            _ischi = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_ganyu_chi,true);
        this._playNode_chi.setSelected(_ischi);
        var text = this._playNode_chi.getChildByName("text");
        this.selectedCB(text,_ischi)

        //人数
        var _currentCount;
        if (isClub)
            if (this.getBoolItem("convertible", false))
                _currentCount = 3;
            else
                _currentCount = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_ganyu_count, 0);
        cc.log("_currentCount renshu  == " + _currentCount)
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);

        this.changePayForPlayerNum();

    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.GAN_YU;
        para.maxPlayer = 4;
        // para.flowerType = WithFlowerType.commonFlower; // 没有的选项不要乱加，后台返回会带错误或累赘信息
        para.tingType = TingCardType.commonTing;//可听
        para.flowerCount = 20;//花数
        para.duoHu = false;
        para.canChi = true;
        para.difen = 2;
        para.trustTime = 0;
        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected();// add by sking for creat room need gps
        //是否可听
        para.tingType  = this._playNode_ting_1.isSelected() == true ? TingCardType.commonTing: TingCardType.noTing;

        //花数
        para.flowerCount = this._playNode_flower36.isSelected() == true ? 36:20;

        //底分
        para.difen = this._playNode_difen1.isSelected() == true ? 2:5;

        para.duoHu = this._playNode_duohu.isSelected();

        para.canChi = this._playNode_chi.isSelected();

        //人数
        para.convertible = false;
        var _countIdx = 0;
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
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_ganyu_jiaoTing,para.tingType);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_ganyu_flowerCount,para.flowerCount);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_ganyu_diFen,para.difen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_ganyu_duohu,para.duoHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_ganyu_chi,para.canChi);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_ganyu_count, _countIdx);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_ganyu_tuoguan, tuoguan);
        }

        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});