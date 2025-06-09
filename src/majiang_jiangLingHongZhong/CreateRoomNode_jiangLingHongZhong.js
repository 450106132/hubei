//江陵红中麻将
var CreateRoomNode_jiangLingHongZhong = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_jiangLingHongZhong_count 					= "_jiangLingHongZhong_COUNT"; 				//人数
        this.localStorageKey.KEY_jiangLingHongZhong_tuoguan                  = "_inZhongHongZhong_tuoguan";              //托管
        this.localStorageKey.KEY_jiangLingHongZhong_zhaMa					= "_jiangLingHongZhong_jiaMa"; 			//加码
        this.localStorageKey.KEY_jiangLingHongZhong_yingHuJiaMa		        = "_jiangLingHongZhong_yingHuJiaMa"; 			//硬胡加码
        this.localStorageKey.KEY_jiangLingHongZhong_isOpenTingTip            = "_jiangLingHongZhong_isOpenTingTip";        //是否开启听牌提示
        this.localStorageKey.KEY_jiangLingHongZhong_jiesuan_difen         =  "_jiangLingHongZhong_difen"; // 积分底分
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();

        this.bgNode = ccs.load("bg_jiangLingHongZhong.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg");
    },
    initPlayNode: function() {
        var _bgjjiangLingHongZhongNode = this.bg_node;
        var _play = _bgjjiangLingHongZhongNode.getChildByName("play");

        //扎码
        this._playNode_zhaMa0 = _play.getChildByName("zhaMa1");
        this._playNode_zhaMa1 = _play.getChildByName("zhaMa2");
        this._playNode_zhaMa2 = _play.getChildByName("zhaMa3");
        this._playNode_zhaMa3 = _play.getChildByName("zhaMa4");
        var nodeZhaMaList1 = [];
        nodeZhaMaList1.push(this._playNode_zhaMa0);
        nodeZhaMaList1.push(this._playNode_zhaMa1);
        nodeZhaMaList1.push(this._playNode_zhaMa2);
        nodeZhaMaList1.push(this._playNode_zhaMa3);
        
        this._playNode_zhaMa_count_radio = createRadioBoxForCheckBoxs(nodeZhaMaList1, this.radioBoxSelectCB);
        this.addListenerText(nodeZhaMaList1, this._playNode_zhaMa_count_radio);
        this._zhaMalist = nodeZhaMaList1;

        //托管
        this._playNode_tuoguanType_0 = _play.getChildByName("tuoguan_0");
        this._playNode_tuoguanType_1 = _play.getChildByName("tuoguan_1");
        this._playNode_tuoguanType_2 = _play.getChildByName("tuoguan_2");
        this._playNode_tuoguanType_3 = _play.getChildByName("tuoguan_3");
        this._playNode_tuoguanType_4 = _play.getChildByName("tuoguan_4");
        var tuoguanNodeList = [];
        tuoguanNodeList.push(_play.getChildByName("tuoguan_0"));
        tuoguanNodeList.push(_play.getChildByName("tuoguan_1"));
        tuoguanNodeList.push(_play.getChildByName("tuoguan_2"));
        tuoguanNodeList.push(_play.getChildByName("tuoguan_3"));
        tuoguanNodeList.push(_play.getChildByName("tuoguan_4"));
        this._playNode_player_tuoguan_radio = createRadioBoxForCheckBoxs(tuoguanNodeList, this.radioBoxSelectCB);
        this.addListenerText(tuoguanNodeList, this._playNode_player_tuoguan_radio);
        this.tuoguanNodeList = tuoguanNodeList;

        var btn_tuoguanTip = this.bg_node.getChildByName("btn_tuoguanTip");
        var image_tuoguanTip = this.bg_node.getChildByName("image_tuoguanTip");
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

        //硬胡加码
        this._playNode_yingHuJiaMa = _play.getChildByName("yingHuJiaMa");
        this.addListenerText(this._playNode_yingHuJiaMa);
        this._playNode_yingHuJiaMa.addEventListener(this.clickCB, this._playNode_yingHuJiaMa);

        //听牌提示
        var tingTipList = [];
        tingTipList.push(_play.getChildByName("tingTip1"));
        tingTipList.push(_play.getChildByName("tingTip2"));
        this.tingTipList_radio = createRadioBoxForCheckBoxs(tingTipList, this.radioBoxSelectCB);
        this.addListenerText(tingTipList, this.tingTipList_radio);
        this.tingTipList = tingTipList;
        this.text_tishi = _play.getChildByName("text_tishi");

        //积分底分
        this.difenAry = [1,2,5,10];
        this.difenIndex = 0;
        var _this = this;
        
        var score = this.bg_node.getParent().getChildByName("txt_fen");
        var addBtn = this.bg_node.getParent().getChildByName("btn_add");
        var subBtn = this.bg_node.getParent().getChildByName("btn_sub");
        //wj UI显示问题
        this.bg_node.getParent().getChildByName("txt_fen").x -= 40;
        this.bg_node.getParent().getChildByName("btn_sub").x -= 40;
        this.bg_node.getParent().getChildByName("Image_3").x -= 40;
        this.bg_node.getParent().getChildByName("btn_add").x -= 40;

        addBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                _this.difenIndex++;
                if (_this.difenIndex > _this.difenAry.length -1)_this.difenIndex = 0;
                score.setString(_this.difenAry[_this.difenIndex]);
                _this.setRoomCardModeFree(_this.difenAry[_this.difenIndex]);
            }
        }, this);

        subBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                _this.difenIndex--;
                if (_this.difenIndex < 0)_this.difenIndex = _this.difenAry.length -1;
                score.setString(_this.difenAry[_this.difenIndex]);
                _this.setRoomCardModeFree(_this.difenAry[_this.difenIndex]);
            }
        }, this);
        
        this.initExtraPlayNode(_play);
    },

    setPlayNodeCurrentSelect: function(isClub) {
        var _play = this.bg_node.getChildByName("play");

        //扎码
        var _currentZhaMa;
        if (isClub) {
            _currentZhaMa = this.getNumberItem("zhaMa", 2);
        }
        else{
            _currentZhaMa = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_jiangLingHongZhong_zhaMa, 2);
        }
        var seleIdx = [2, 4, 6, 8].indexOf(_currentZhaMa);
        this._playNode_zhaMa_count_radio.selectItem(seleIdx);
        this.radioBoxSelectCB(seleIdx, this._zhaMalist[seleIdx], this._zhaMalist);

        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_jiangLingHongZhong_tuoguan, 0);
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

        //硬胡加码
        var yingHuJiaMa;
        if (isClub)
            yingHuJiaMa = this.getBoolItem("yingHuJiaMa", true);
        else
            yingHuJiaMa = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_jiangLingHongZhong_yingHuJiaMa, true);
        this._playNode_yingHuJiaMa.setSelected(yingHuJiaMa);
        var text = this._playNode_yingHuJiaMa.getChildByName("text");
        this.selectedCB(text, yingHuJiaMa);

        //听牌提示
        var isOpenTingTip;
        if (isClub)
            isOpenTingTip = this.getBoolItem("isOpenTingTip", true);
        else
            isOpenTingTip = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_jiangLingHongZhong_isOpenTingTip, true);
        var tingIndex = isOpenTingTip ? 0 : 1;
        this.tingTipList_radio.selectItem(tingIndex);
        this.radioBoxSelectCB(tingIndex, this.tingTipList[tingIndex], this.tingTipList);
        
        // 积分底分
        var _jieSuanDiFen;
        if(isClub){
            _jieSuanDiFen = this.getNumberItem("jieSuanDiFen", 1);
        }else {
            _jieSuanDiFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_jiangLingHongZhong_jiesuan_difen,1);
        }
        var score = this.bg_node.getParent().getChildByName("txt_fen");
        this.difenIndex = this.difenAry.indexOf(_jieSuanDiFen);
        score.setString(_jieSuanDiFen);
    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.JIANG_LING_HONGZHONG;
        para.maxPlayer = 3;
        para.convertible = false;//是否自由人数
        para.trustTime = 0;//托管


        //扎码
        if(this._playNode_zhaMa0.isSelected()) {
            para.zhaMa = 2;
        }else if (this._playNode_zhaMa1.isSelected()) {
            para.zhaMa = 4;
        }else if (this._playNode_zhaMa2.isSelected()) {
            para.zhaMa = 6;
        }else if (this._playNode_zhaMa3.isSelected()) {
            para.zhaMa = 8;
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

        //硬胡加码
        para.yingHuJiaMa = this._playNode_yingHuJiaMa.isSelected();
        //听牌提示
        para.isOpenTingTip = this.tingTipList[0].isSelected();

        //积分底分
        var score = this.bg_node.getParent().getChildByName("txt_fen"); 
        para.jieSuanDiFen = Number(score.getString());
        
        this.getExtraSelectedPara(para);

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_jiangLingHongZhong_count,  para.maxPlayer);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_jiangLingHongZhong_zhaMa, para.zhaMa);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_jiangLingHongZhong_tuoguan, para.trustTime);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_jiangLingHongZhong_yingHuJiaMa, para.yingHuJiaMa);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_jiangLingHongZhong_isOpenTingTip, para.isOpenTingTip);
            //底分
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_jiangLingHongZhong_jiesuan_difen, para.jieSuanDiFen);
        
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    },

    changePayForPlayerNum:function(select_number){
        this._super(select_number); 
    }, 

});