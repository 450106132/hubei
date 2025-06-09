//蕲春红中杠
var CreateRoomNode_qiChunHongZhongGang = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_qiChunHongZhongGang_count 					= "_qiChunHongZhongGang_COUNT"; 				//人数
        this.localStorageKey.KEY_qiChunHongZhongGang_ziyou                    = "_qiChunHongZhongGang_ZIYOU";               //自由人数 
        this.localStorageKey.KEY_qiChunHongZhongGang_tuoguan                  = "_qiChunHongZhongGang_tuoguan";              //托管
        this.localStorageKey.KEY_qiChunHongZhongGang_fenShu 					= "_qiChunHongZhongGang_fenshu"; 				//分数
        this.localStorageKey.KEY_qiChunHongZhongGang_huPaiType 			    = "_qiChunHongZhongGang_huType"; 			//胡牌类型（258将、乱将）
        this.localStorageKey.KEY_qiChunHongZhongGang_isOpenTingTip            = "_qiChunHongZhongGang_isOpenTingTip";        //是否开启听牌提示
    },

    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();

        this.bgNode = ccs.load("bg_qiChunHongZhongGangMaJiang.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg");
    },
    initPlayNode: function() {
        var _bgqiChunHongZhongGangNode = this.bg_node;
        var _play = _bgqiChunHongZhongGangNode.getChildByName("play");

        //人数
        this._playNode_maxPlayer0 = _play.getChildByName("maxPlayer4");
        this._playNode_maxPlayer1 = _play.getChildByName("maxPlayer3");
        this._playNode_maxPlayer2 = _play.getChildByName("maxPlayer2");
        this._playNode_maxPlayer3 = _play.getChildByName("maxPlayer0");//自由人數
        var nodeCountList1 = [];
        nodeCountList1.push(this._playNode_maxPlayer0);
        nodeCountList1.push(this._playNode_maxPlayer1);
        nodeCountList1.push(this._playNode_maxPlayer2);
        nodeCountList1.push(this._playNode_maxPlayer3);
        this.initPlayNumNode(nodeCountList1, [4, 3, 2, 4]);
        
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(nodeCountList1, function(index) { 
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeCountList1[index], nodeCountList1);
        }.bind(this));
        this.addListenerText(nodeCountList1, this._playNode_player_count_radio, this.changePayForPlayerNum.bind(this));
        this._countlist = nodeCountList1;

        //托管
        this._playNode_tuoguanType_0 = _play.getChildByName("tuoguan0");
        this._playNode_tuoguanType_1 = _play.getChildByName("tuoguan1");
        this._playNode_tuoguanType_2 = _play.getChildByName("tuoguan2");
        this._playNode_tuoguanType_3 = _play.getChildByName("tuoguan3");
        this._playNode_tuoguanType_4 = _play.getChildByName("tuoguan4");
        var tuoguanNodeList = [];
        tuoguanNodeList.push(_play.getChildByName("tuoguan0"));
        tuoguanNodeList.push(_play.getChildByName("tuoguan1"));
        tuoguanNodeList.push(_play.getChildByName("tuoguan2"));
        tuoguanNodeList.push(_play.getChildByName("tuoguan3"));
        tuoguanNodeList.push(_play.getChildByName("tuoguan4"));
        this._playNode_player_tuoguan_radio = createRadioBoxForCheckBoxs(tuoguanNodeList, this.radioBoxSelectCB);
        this.addListenerText(tuoguanNodeList, this._playNode_player_tuoguan_radio);
        this.tuoguanNodeList = tuoguanNodeList;

        var btn_tuoguanTip = _bgqiChunHongZhongGangNode.getChildByName("btn_tuoguanTip");
        var image_tuoguanTip = _bgqiChunHongZhongGangNode.getChildByName("image_tuoguanTip");
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


        //分数
        this._playNode_fenshu_0 = _play.getChildByName("fenshu1");
        this._playNode_fenshu_1 = _play.getChildByName("fenshu2");
        this._playNode_fenshu_2 = _play.getChildByName("fenshu3");
        var fenShuNodeList = [];
        fenShuNodeList.push(_play.getChildByName("fenshu1"));
        fenShuNodeList.push(_play.getChildByName("fenshu2"));
        fenShuNodeList.push(_play.getChildByName("fenshu3"));
        this._playNode_player_fenshu_radio = createRadioBoxForCheckBoxs(fenShuNodeList, this.radioBoxSelectCB);
        this.addListenerText(fenShuNodeList, this._playNode_player_fenshu_radio);
        this.fenShuNodeList = fenShuNodeList;

        //胡牌类型
        this._playNode_huType_0 = _play.getChildByName("huType1");
        this._playNode_huType_1 = _play.getChildByName("huType2");
        var huPaiTypeNodeList = [];
        huPaiTypeNodeList.push(_play.getChildByName("huType1"));
        huPaiTypeNodeList.push(_play.getChildByName("huType2"));
        this._playNode_player_huPaiType_radio = createRadioBoxForCheckBoxs(huPaiTypeNodeList, this.radioBoxSelectCB);
        this.addListenerText(huPaiTypeNodeList, this._playNode_player_huPaiType_radio);
        this.huPaiTypeNodeList = huPaiTypeNodeList;
        

        //听牌提示
        var tingTipList = [];
        tingTipList.push(_play.getChildByName("tingTip1"));
        tingTipList.push(_play.getChildByName("tingTip2"));
        this.tingTipList_radio = createRadioBoxForCheckBoxs(tingTipList, this.radioBoxSelectCB);
        this.addListenerText(tingTipList, this.tingTipList_radio);
        this.tingTipList = tingTipList;
        this.text_tishi = _play.getChildByName("text_tishi");
    },

    setPlayNodeCurrentSelect: function(isClub) {
        var _play = this.bg_node.getChildByName("play");

        //人数
        var _currentCount;
        var _isConvertible = false;
        if (isClub) {
            if (this.getBoolItem("convertible", false)){
                _currentCount = this.getNumberItem("maxPlayer", 4);
                _isConvertible = true;
            }
            else{
                _currentCount = this.getNumberItem("maxPlayer", 4);
            }
        }
        else{
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qiChunHongZhongGang_count, 4);
            _isConvertible = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunHongZhongGang_ziyou, false);
        }
        var seleIdx = _isConvertible ? 3 : [4, 3, 2].indexOf(_currentCount);
        this._playNode_player_count_radio.selectItem(seleIdx);
        this.radioBoxSelectCB(seleIdx, this._countlist[seleIdx], this._countlist);

        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qiChunHongZhongGang_tuoguan, 0);
        this._playNode_tuoguanType_0.setSelected(false);
        this._playNode_tuoguanType_1.setSelected(false);
        this._playNode_tuoguanType_2.setSelected(false);
        this._playNode_tuoguanType_3.setSelected(false);
        this._playNode_tuoguanType_4.setSelected(false);
        var index = 0;
        if (_trustTime == 0) {
            this._playNode_tuoguanType_0.setSelected(true);
            index = 0;
        } else if (_trustTime == 60) {
            this._playNode_tuoguanType_1.setSelected(true);
            index = 1;
        } else if (_trustTime == 120) {
            this._playNode_tuoguanType_2.setSelected(true);
            index = 2;
        } else if (_trustTime == 180) {
            this._playNode_tuoguanType_3.setSelected(true);
            index = 3;
        } else if (_trustTime == 300) {
            this._playNode_tuoguanType_4.setSelected(true);
            index = 4;
        }
        this.radioBoxSelectCB(index, this.tuoguanNodeList[index], this.tuoguanNodeList);

        //分数
        var _currentFenShu;
        if (isClub) {
            _currentFenShu = this.getNumberItem("fenShu", 0.5);
        }else{
            _currentFenShu = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qiChunHongZhongGang_fenShu, 0.5);
        }
        var seleIdx = [0.5, 1, 2].indexOf(_currentFenShu);
        this._playNode_player_fenshu_radio.selectItem(seleIdx);
        this.radioBoxSelectCB(seleIdx, this.fenShuNodeList[seleIdx], this.fenShuNodeList);

        //听牌提示
        var isOpenTingTip;
        if (isClub)
            isOpenTingTip = this.getBoolItem("isOpenTingTip", true);
        else
            isOpenTingTip = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunHongZhongGang_isOpenTingTip, true);
        var tingIndex = isOpenTingTip ? 0 : 1;
        this.tingTipList_radio.selectItem(tingIndex);
        this.radioBoxSelectCB(tingIndex, this.tingTipList[tingIndex], this.tingTipList);

        //胡牌类型
        var currHuPaiType;
        if(isClub){
            currHuPaiType = this.getNumberItem("playStyle", 0);
        }else{
            currHuPaiType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qiChunHongZhongGang_huPaiType, 0);
        }
        var seleIdx = [0, 1].indexOf(currHuPaiType);
        this._playNode_player_huPaiType_radio.selectItem(seleIdx);
        this.radioBoxSelectCB(seleIdx, this.huPaiTypeNodeList[tingIndex], this.huPaiTypeNodeList);
    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG;
        para.maxPlayer = 4;
        para.convertible = false;//是否自由人数
        para.trustTime = 0;//托管
        para.fenShu = 0.5;//分数
        para.playStyle = 0;//胡牌类型

        //人数
        var _countIdx = 0;
        if(this._playNode_maxPlayer0.isSelected()) {
            para.maxPlayer = 4;
        }else if (this._playNode_maxPlayer1.isSelected()) {
            para.maxPlayer = 3;
        }else if (this._playNode_maxPlayer2.isSelected()) {
            para.maxPlayer = 2;
        }else if (this._playNode_maxPlayer3.isSelected()) {
            para.maxPlayer = 4;
            para.convertible = true;
        }

        //托管
        if (this._playNode_tuoguanType_0.isSelected()) {
            para.trustTime = 0;
        } else if (this._playNode_tuoguanType_1.isSelected()) {
            para.trustTime = 60;
        } else if (this._playNode_tuoguanType_2.isSelected()) {
            para.trustTime = 120;
        } else if (this._playNode_tuoguanType_3.isSelected()) {
            para.trustTime = 180;
        } else if (this._playNode_tuoguanType_4.isSelected()) {
            para.trustTime = 300;
        }

        //分数
        if (this._playNode_fenshu_0.isSelected()) {
            para.fenShu = 0.5;
        } else if (this._playNode_fenshu_1.isSelected()) {
            para.fenShu = 1;
        } else if (this._playNode_fenshu_2.isSelected()) {
            para.fenShu = 2;
        }

        //胡类型
        if (this._playNode_huType_0.isSelected()) {
            para.playStyle = 0;
        } else if (this._playNode_huType_1.isSelected()) {
            para.playStyle = 1;
        }

        //听牌提示
        para.isOpenTingTip = this.tingTipList[0].isSelected();

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qiChunHongZhongGang_count,  para.maxPlayer);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunHongZhongGang_ziyou, para.convertible);

            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qiChunHongZhongGang_tuoguan, para.trustTime);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunHongZhongGang_isOpenTingTip, para.isOpenTingTip);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qiChunHongZhongGang_fenShu, para.fenShu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qiChunHongZhongGang_huPaiType, para.playStyle);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    },

    changePayForPlayerNum:function(select_number){
        this._super(select_number); 
    }, 

});