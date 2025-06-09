//阳新麻将
var CreateRoomNode_YangXin = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_yangXin_count 					= "_yangXin_COUNT"; 				//人数
        this.localStorageKey.KEY_yangXin_ziyou                    = "_yangXin_ZIYOU";               //自由人数 
        this.localStorageKey.KEY_yangXin_tuoguan                  = "_yangXin_tuoguan";              //托管
        this.localStorageKey.KEY_yangXin_fengDing					= "_yangXin_fengDing"; 			//封顶
        this.localStorageKey.KEY_yangXin_huType		        = "_yangXin_huType"; 			//胡牌类型
        this.localStorageKey.KEY_yangXin_sanShouFan	        = "_yangXin_sanShouFan"; 			//三手翻
        this.localStorageKey.KEY_yangXin_pengPengHu 			    = "_yangXin_pengPengHu "; 			//碰碰胡
        this.localStorageKey.KEY_yangXin_gangShangHua 			= "_yangXin_gangShangHua"; 	    //杠上花
        this.localStorageKey.KEY_yangXin_liangZhongFaPaiDaHu 			= "_yangXin_liangZhongFaPaiDaHu"; 	    //亮中发白大胡
        this.localStorageKey.KEY_yangXin_isOpenTingTip            = "_yangXin_isOpenTingTip";        //是否开启听牌提示
        this.localStorageKey.KEY_yangXin_jiesuan_difen         =  "_yangXin_difen"; // 积分底分
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();

        this.bgNode = ccs.load("bg_yangXinMaJiang.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg");
    },
    initPlayNode: function() {
        var _bgyangXinNode = this.bg_node;
        var _play = _bgyangXinNode.getChildByName("play");

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


        //胡牌类型
        this._playNode_huType_0 = _play.getChildByName("258Jiang");
        this._playNode_huType_1 = _play.getChildByName("luanJiang");
        var huTypeNodeList = [];
        huTypeNodeList.push(_play.getChildByName("258Jiang"));
        huTypeNodeList.push(_play.getChildByName("luanJiang"));
        this._playNode_huType_radio = createRadioBoxForCheckBoxs(huTypeNodeList, this.radioBoxSelectCB);
        this.addListenerText(huTypeNodeList, this._playNode_huType_radio);
        this.huTypeNodeList = huTypeNodeList;

        //三手翻
        this._playNode_sanShouFan = _play.getChildByName("sanShouFan");
        this.addListenerText(this._playNode_sanShouFan);
        this._playNode_sanShouFan.addEventListener(this.clickCB, this._playNode_sanShouFan);

        //封顶
        this._playNode_fengDing_0 = _play.getChildByName("fenshu1");
        this._playNode_fengDing_1 = _play.getChildByName("fenshu2");
        this._playNode_fengDing_2 = _play.getChildByName("fenshu3");
        this._playNode_fengDing_3 = _play.getChildByName("fenshu4");
        var fengDingNodeList = [];
        fengDingNodeList.push(_play.getChildByName("fenshu1"));
        fengDingNodeList.push(_play.getChildByName("fenshu2"));
        fengDingNodeList.push(_play.getChildByName("fenshu3"));
        fengDingNodeList.push(_play.getChildByName("fenshu4"));
        this._playNode_player_fengDing_radio = createRadioBoxForCheckBoxs(fengDingNodeList, this.radioBoxSelectCB);
        this.addListenerText(fengDingNodeList, this._playNode_player_fengDing_radio);
        this.fengDingNodeList = fengDingNodeList;
        
        //碰碰胡
        this.play_pengPengHu = _play.getChildByName("pengPengHu");
        this.addListenerText(this.play_pengPengHu);
        this.play_pengPengHu.addEventListener(this.clickCB, this.play_pengPengHu);

        //杠上花
        this.play_gangShangHua = _play.getChildByName("gangShangKaiHua");
        this.addListenerText(this.play_gangShangHua);
        this.play_gangShangHua.addEventListener(this.clickCB, this.play_gangShangHua);
        
        //亮中发白可大胡
        this.play_liangZhongFaBai = _play.getChildByName("liangZhongFaPaiDaHu");
        this.addListenerText(this.play_liangZhongFaBai);
        this.play_liangZhongFaBai.addEventListener(this.clickCB, this.play_liangZhongFaBai);

        //听牌提示
        var tingTipList = [];
        tingTipList.push(_play.getChildByName("tingTip1"));
        tingTipList.push(_play.getChildByName("tingTip2"));
        this.tingTipList_radio = createRadioBoxForCheckBoxs(tingTipList, this.radioBoxSelectCB);
        this.addListenerText(tingTipList, this.tingTipList_radio);
        this.tingTipList = tingTipList;
        this.text_tishi = _play.getChildByName("text_tishi");

        //积分底分
        this.difenAry = [0.1,0.2,0.3,0.4,0.5,1,2,3,4,5,6,7,8,9,10];
        this.difenIndex = 0;
        var _this = this;
        
        var score = this.bg_node.getParent().getChildByName("txt_fen");
        var addBtn = this.bg_node.getParent().getChildByName("btn_add");
        var subBtn = this.bg_node.getParent().getChildByName("btn_sub");
        //wj 俱乐部UI显示问题
        this.bg_node.getParent().getChildByName("txt_fen").x -= 30;
        this.bg_node.getParent().getChildByName("btn_sub").x -= 30;
        this.bg_node.getParent().getChildByName("Image_3").x -= 30;
        this.bg_node.getParent().getChildByName("btn_add").x -= 30;

        addBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                _this.difenIndex++;
                if (_this.difenIndex > _this.difenAry.length -1)_this.difenIndex = 0;
                score.setString(_this.difenAry[_this.difenIndex]);
                this.setRoomCardModeFree(_this.difenAry[_this.difenIndex]);
            }
        }, this);

        subBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                _this.difenIndex--;
                if (_this.difenIndex < 0)_this.difenIndex = _this.difenAry.length -1;
                score.setString(_this.difenAry[_this.difenIndex]);
                this.setRoomCardModeFree(_this.difenAry[_this.difenIndex]);
            }
        }, this);
        
        this.initExtraPlayNode(_play);
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
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_yangXin_count, 4);
            _isConvertible = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_yangXin_ziyou, false);
        }
        var seleIdx = _isConvertible ? 3 : [4, 3, 2].indexOf(_currentCount);
        this._playNode_player_count_radio.selectItem(seleIdx);
        this.radioBoxSelectCB(seleIdx, this._countlist[seleIdx], this._countlist);

        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_yangXin_tuoguan, 0);
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

        //胡牌类型
        var huType;
        if (isClub) {
            huType = this.getNumberItem("huType", 0);
        }else{
            huType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_yangXin_huType, 0);
        }
        this._playNode_huType_radio.selectItem(huType);
        this.radioBoxSelectCB(huType, this.huTypeNodeList[seleIdx], this.huTypeNodeList);

        //三手翻
        var sanShouFan;
        if (isClub)
            sanShouFan = this.getBoolItem("sanShouFan", false);
        else
            sanShouFan = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_yangXin_sanShouFan, false);
        this._playNode_sanShouFan.setSelected(sanShouFan);
        var text = this._playNode_sanShouFan.getChildByName("text");
        this.selectedCB(text, sanShouFan);

        //碰碰胡
        var pengPengHu;
        if (isClub)
            pengPengHu = this.getBoolItem("pengPengHu", false);
        else
            pengPengHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_yangXin_pengPengHu, false);
        this.play_pengPengHu.setSelected(pengPengHu);
        var text = this.play_pengPengHu.getChildByName("text");
        this.selectedCB(text, pengPengHu);

        //杠上花
        var gangShangHua;
        if (isClub)
            gangShangHua = this.getBoolItem("gangShangKaiHua", false);
        else
            gangShangHua = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_yangXin_gangShangHua, false);
        this.play_gangShangHua.setSelected(gangShangHua);
        var text = this.play_gangShangHua.getChildByName("text");
        this.selectedCB(text, gangShangHua);

        //亮中发牌大胡
        var zhongFaBaiDaHu;
        if (isClub)
            zhongFaBaiDaHu = this.getBoolItem("canDaHu", false);
        else
            zhongFaBaiDaHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_yangXin_liangZhongFaPaiDaHu, false);
        this.play_liangZhongFaBai.setSelected(zhongFaBaiDaHu);
        var text = this.play_liangZhongFaBai.getChildByName("text");
        this.selectedCB(text, zhongFaBaiDaHu);

        //封顶
        var _currentFenShu;
        if (isClub) {
            _currentFenShu = this.getNumberItem("fengDing", 0);
        }else{
            _currentFenShu = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_yangXin_fengDing, 0);
        }
        var seleIdx = [0, 30, 50, 100].indexOf(_currentFenShu);
        this._playNode_player_fengDing_radio.selectItem(seleIdx);
        this.radioBoxSelectCB(seleIdx, this.fengDingNodeList[seleIdx], this.fengDingNodeList);

        //听牌提示
        var isOpenTingTip;
        if (isClub)
            isOpenTingTip = this.getBoolItem("isOpenTingTip", true);
        else
            isOpenTingTip = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_yangXin_isOpenTingTip, true);
        var tingIndex = isOpenTingTip ? 0 : 1;
        this.tingTipList_radio.selectItem(tingIndex);
        this.radioBoxSelectCB(tingIndex, this.tingTipList[tingIndex], this.tingTipList);
        
        // 积分底分
        var _jieSuanDiFen;
        if(isClub){
            _jieSuanDiFen = this.getNumberItem("jieSuanDiFen", 1);
        }else {
            _jieSuanDiFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_yangXin_jiesuan_difen,1);
        }
        var score = this.bg_node.getParent().getChildByName("txt_fen");
        this.difenIndex = this.difenAry.indexOf(_jieSuanDiFen);
        score.setString(_jieSuanDiFen);
    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.YANG_XIN_MA_JIANG;
        para.maxPlayer = 4;
        para.convertible = false;//是否自由人数
        para.trustTime = 0;//托管
        para.fengDing = 0;//分数
        para.huType = 0;//胡牌类型
        para.sanShouFan = false;
        para.pengPengHu = false;
        para.gangShangKaiHua = false;
        para.canDaHu = false;


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

        //封顶
        if (this._playNode_fengDing_0.isSelected()) {
            para.fengDing = 0;
        } else if (this._playNode_fengDing_1.isSelected()) {
            para.fengDing = 30;
        } else if (this._playNode_fengDing_2.isSelected()) {
            para.fengDing = 50;
        } else if (this._playNode_fengDing_3.isSelected()) {
            para.fengDing = 100;
        }

        //胡牌类型
        if (this._playNode_huType_0.isSelected()) {
            para.huType = 0;
        } else if (this._playNode_huType_1.isSelected()) {
            para.huType = 1;
        }

        //三手翻
        para.sanShouFan = this._playNode_sanShouFan.isSelected();
        //碰碰胡
        para.pengPengHu = this.play_pengPengHu.isSelected();
        //杠上花
        para.gangShangKaiHua = this.play_gangShangHua.isSelected();
        //亮中发白大胡
        para.canDaHu = this.play_liangZhongFaBai.isSelected();

        //听牌提示
        para.isOpenTingTip = this.tingTipList[0].isSelected();

        //积分底分
        var score = this.bg_node.getParent().getChildByName("txt_fen"); 
        para.jieSuanDiFen = Number(score.getString());
        
        this.getExtraSelectedPara(para);

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_yangXin_count,  para.maxPlayer);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_yangXin_ziyou, para.convertible);

            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_yangXin_tuoguan, para.trustTime);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_yangXin_isOpenTingTip, para.isOpenTingTip);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_yangXin_fengDing, para.fengDing);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_yangXin_huType, para.huType);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_yangXin_sanShouFan, para.sanShouFan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_yangXin_pengPengHu, para.pengPengHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_yangXin_gangShangHua, para.gangShangKaiHua);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_yangXin_liangZhongFaPaiDaHu, para.canDaHu);
            //底分
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_yangXin_jiesuan_difen, para.jieSuanDiFen);
        
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    },

    changePayForPlayerNum:function(select_number){
        this._super(select_number); 
    }, 

});