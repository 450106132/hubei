//阳新麻将
var CreateRoomNode_qiChunGuangDong = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_qiChunGuangDong_count 					= "_qiChunGuangDong_COUNT"; 				//人数
        this.localStorageKey.KEY_qiChunGuangDong_ziyou                    = "_qiChunGuangDong_ZIYOU";               //自由人数
        this.localStorageKey.KEY_qiChunGuangDong_guiPai					= "_qiChunGuangDong_guiPai"; 			//鬼牌
        this.localStorageKey.KEY_qiChunGuangDong_daiFeng					= "_qiChunGuangDong_daiFeng"; 			//带风
        this.localStorageKey.KEY_qiChunGuangDong_qiangGangHu					= "_qiChunGuangDong_qiangGangHu"; 			//抢杠胡
        this.localStorageKey.KEY_qiChunGuangDong_qiangGangQuanBao					= "_qiChunGuangDong_qiangGangQuanBao"; 			//抢杠全包
        this.localStorageKey.KEY_qiChunGuangDong_gangBaoQuanBao					= "_qiChunGuangDong_gangBaoQuanBao"; 			//杠爆全包
        this.localStorageKey.KEY_qiChunGuangDong_onlyZiMo					= "_qiChunGuangDong_onlyZiMo"; 			//只能自摸
        this.localStorageKey.KEY_qiChunGuangDong_qiDui					= "_qiChunGuangDong_qiDui"; 			//胡七对
        this.localStorageKey.KEY_qiChunGuangDong_qiDuiJiaBei					= "_qiChunGuangDong_qiDuiJiaBei"; 			//七对加倍
        this.localStorageKey.KEY_qiChunGuangDong_genZhuang					= "_qiChunGuangDong_genZhuang"; 			//跟庄
        this.localStorageKey.KEY_qiChunGuangDong_daHu					= "_qiChunGuangDong_daHu"; 			//大胡
        this.localStorageKey.KEY_qiChunGuangDong_maCount					= "_qiChunGuangDong_maCount"; 			//买马
        this.localStorageKey.KEY_qiChunGuangDong_tuoguan                  = "_qiChunGuangDong_tuoguan";              //托管
        this.localStorageKey.KEY_qiChunGuangDong_isOpenTingTip            = "_MLZH_isOpenTingTip";        //是否开启听牌提示
        this.localStorageKey.KEY_qiChunGuangDong_jiesuan_difen         =  "_qiChunGuangDong_difen"; // 积分底分
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();

        this.bgNode = ccs.load("bg_qiChunGuangDong.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg");
    },
    initPlayNode: function() {
        var _bgqiChunGuangDongNode = this.bg_node;
        var _play = _bgqiChunGuangDongNode.getChildByName("play");

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

        //鬼牌
        this._playNode_guiPai_0 = _play.getChildByName("guiPai0");
        this._playNode_guiPai_1 = _play.getChildByName("guiPai1");
        this._playNode_guiPai_2 = _play.getChildByName("guiPai2");
        this._playNode_guiPai_3 = _play.getChildByName("guiPai3");
        var guiPaiNodeList = [];
        guiPaiNodeList.push(_play.getChildByName("guiPai0"));
        guiPaiNodeList.push(_play.getChildByName("guiPai1"));
        guiPaiNodeList.push(_play.getChildByName("guiPai2"));
        guiPaiNodeList.push(_play.getChildByName("guiPai3"));
        this._playNode_player_guiPai_radio = createRadioBoxForCheckBoxs(guiPaiNodeList, this.radioBoxSelectCB);
        this.addListenerText(guiPaiNodeList, this._playNode_player_guiPai_radio);
        this.guiPaiNodeList = guiPaiNodeList;

        //风牌
        this._playNode_fengPai_0 = _play.getChildByName("fengPai0");
        this._playNode_fengPai_1 = _play.getChildByName("fengPai1");
        var fengPaiNodeList = [];
        fengPaiNodeList.push(_play.getChildByName("fengPai0"));
        fengPaiNodeList.push(_play.getChildByName("fengPai1"));
        this._playNode_player_fengPai_radio = createRadioBoxForCheckBoxs(fengPaiNodeList, this.radioBoxSelectCB);
        this.addListenerText(fengPaiNodeList, this._playNode_player_fengPai_radio);
        this.fengPaiNodeList = fengPaiNodeList;
        
        //抢杠胡
        this._playNode_qiangGangHu = _play.getChildByName("qiangGangHu");
        this.addListenerText(this._playNode_qiangGangHu, null, function(index, sender){
            this._playNode_qiangGangQuanBao.setVisible(sender.isSelected());
        }.bind(this));
        this._playNode_qiangGangHu.addEventListener(function(sender, type){
            this._playNode_qiangGangQuanBao.setVisible(type == ccui.CheckBox.EVENT_SELECTED);
            this.clickCB(sender, type);
        }.bind(this), this._playNode_qiangGangHu);

        //抢杠全包
        this._playNode_qiangGangQuanBao = _play.getChildByName("qiangGangQuanBao");
        this.addListenerText(this._playNode_qiangGangQuanBao);
        this._playNode_qiangGangQuanBao.addEventListener(this.clickCB, this._playNode_qiangGangQuanBao);

        //杠爆全包
        this._playNode_GangBaoQuanBao = _play.getChildByName("gangBaoQuanBao");
        this.addListenerText(this._playNode_GangBaoQuanBao);
        this._playNode_GangBaoQuanBao.addEventListener(this.clickCB, this._playNode_GangBaoQuanBao);

        //只能自摸
        this._playNode_onlyZiMo = _play.getChildByName("zhiNengZiMo");
        this.addListenerText(this._playNode_onlyZiMo);
        this._playNode_onlyZiMo.addEventListener(this.clickCB, this._playNode_onlyZiMo);

        //可胡七对
        this._playNode_keHuQiDui = _play.getChildByName("keHuQiDui");
        this.addListenerText(this._playNode_keHuQiDui, null, function(index, sender){
            this._playNode_qiDuiJiaBei.setVisible(sender.isSelected());
        }.bind(this));
        this._playNode_keHuQiDui.addEventListener(function(sender, type){
            this._playNode_qiDuiJiaBei.setVisible(type == ccui.CheckBox.EVENT_SELECTED);
            this.clickCB(sender, type);
        }.bind(this), this._playNode_keHuQiDui);
           
        //七对加倍
        this._playNode_qiDuiJiaBei = _play.getChildByName("qiDuiJiaBei");
        this.addListenerText(this._playNode_qiDuiJiaBei);
        this._playNode_qiDuiJiaBei.addEventListener(this.clickCB, this._playNode_qiDuiJiaBei);

        //跟庄
        this._playNode_genZhuang = _play.getChildByName("genZhuang");
        this.addListenerText(this._playNode_genZhuang);
        this._playNode_genZhuang.addEventListener(this.clickCB, this._playNode_genZhuang);

        //大胡玩法
        this._playNode_daHu = _play.getChildByName("daHu");
        this.addListenerText(this._playNode_daHu);
        this._playNode_daHu.addEventListener(this.clickCB, this._playNode_daHu);

        //买马
        this._playNode_maiMa_0 = _play.getChildByName("maiMa0");
        this._playNode_maiMa_1 = _play.getChildByName("maiMa1");
        this._playNode_maiMa_2 = _play.getChildByName("maiMa2");
        this._playNode_maiMa_3 = _play.getChildByName("maiMa3");
        this._playNode_maiMa_4 = _play.getChildByName("maiMa4");
        this._playNode_maiMa_5 = _play.getChildByName("maiMa5");
        this._playNode_maiMa_5.originalPos = this._playNode_maiMa_5.getPosition();
        var maiMaNodeList = [];
        maiMaNodeList.push(_play.getChildByName("maiMa0"));
        maiMaNodeList.push(_play.getChildByName("maiMa1"));
        maiMaNodeList.push(_play.getChildByName("maiMa2"));
        maiMaNodeList.push(_play.getChildByName("maiMa3"));
        maiMaNodeList.push(_play.getChildByName("maiMa4"));
        maiMaNodeList.push(_play.getChildByName("maiMa5"));
        this._playNode_player_maiMa_radio = createRadioBoxForCheckBoxs(maiMaNodeList, this.radioBoxSelectCB);
        this.addListenerText(maiMaNodeList, this._playNode_player_maiMa_radio);
        this.maiMaNodeList = maiMaNodeList;

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
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qiChunGuangDong_count, 4);
            _isConvertible = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunGuangDong_ziyou, false);
        }
        var playerSeleIdx = _isConvertible ? 3 : [4, 3, 2].indexOf(_currentCount);
        this._playNode_player_count_radio.selectItem(playerSeleIdx);
        this.radioBoxSelectCB(playerSeleIdx, this._countlist[playerSeleIdx], this._countlist);

        //鬼牌
        var guiPai;
        if (isClub) {
            guiPai = this.getNumberItem("hunType", 1);
        }else{
            guiPai = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qiChunGuangDong_guiPai, 1);
        }
        this._playNode_player_guiPai_radio.selectItem(guiPai);
        this.radioBoxSelectCB(guiPai, this.guiPaiNodeList[guiPai], this.guiPaiNodeList);

        //带风
        var daiFeng;
        if (isClub) {
            daiFeng = this.getBoolItem("windCard", true);
        }else{
            daiFeng = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunGuangDong_daiFeng, true);
        }
        var seleIdx = daiFeng == true ? 1 : 0;
        this._playNode_player_fengPai_radio.selectItem(seleIdx);
        this.radioBoxSelectCB(seleIdx, this.fengPaiNodeList[seleIdx], this.fengPaiNodeList);

        //抢杠胡
        var qiangGangHu;
        if (isClub)
            qiangGangHu = this.getBoolItem("canRob", false);
        else
            qiangGangHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunGuangDong_qiangGangHu, false);
        this._playNode_qiangGangHu.setSelected(qiangGangHu);
        var text = this._playNode_qiangGangHu.getChildByName("text");
        this.selectedCB(text, qiangGangHu);

        //抢杠全包
        var qiangGangQuanBao;
        if (isClub)
            qiangGangQuanBao = this.getBoolItem("qiangGangQuanBao", false);
        else
            qiangGangQuanBao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunGuangDong_qiangGangQuanBao, false);

        if(!qiangGangHu){
            qiangGangQuanBao = false;
        }
        this._playNode_qiangGangQuanBao.setSelected(qiangGangQuanBao);
        var text = this._playNode_qiangGangQuanBao.getChildByName("text");
        this.selectedCB(text, qiangGangQuanBao);
        this._playNode_qiangGangQuanBao.setVisible(qiangGangHu);

        //杠爆全包
        var gangBaoQuanBao;
        if (isClub)
            gangBaoQuanBao = this.getBoolItem("gangBaoQuanBao", true);
        else
            gangBaoQuanBao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunGuangDong_gangBaoQuanBao, true);
        this._playNode_GangBaoQuanBao.setSelected(gangBaoQuanBao);
        var text = this._playNode_GangBaoQuanBao.getChildByName("text");
        this.selectedCB(text, gangBaoQuanBao);

        //只能自摸
        var onlyZiMo;
        if (isClub)
            onlyZiMo = this.getBoolItem("onlyZiMoHu", false);
        else
            onlyZiMo = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunGuangDong_onlyZiMo, false);
        this._playNode_onlyZiMo.setSelected(onlyZiMo);
        var text = this._playNode_onlyZiMo.getChildByName("text");
        this.selectedCB(text, onlyZiMo);

        //可胡七对
        var huQiDui;
        if (isClub)
            huQiDui = this.getBoolItem("isQiDui", true);
        else
            huQiDui = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunGuangDong_qiDui, true);
        this._playNode_keHuQiDui.setSelected(huQiDui);
        var text = this._playNode_keHuQiDui.getChildByName("text");
        this.selectedCB(text, huQiDui);

        //七对加倍
        var qiDuiJiaBei;
        if (isClub)
            qiDuiJiaBei = this.getBoolItem("qiDuiJiaBei", true);
        else
            qiDuiJiaBei = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunGuangDong_qiDuiJiaBei, true);
        this._playNode_qiDuiJiaBei.setSelected(qiDuiJiaBei);
        var text = this._playNode_qiDuiJiaBei.getChildByName("text");
        this.selectedCB(text, qiDuiJiaBei);
        this._playNode_qiDuiJiaBei.setVisible(huQiDui);

        //跟庄
        var genZhuang;
        if (isClub)
            genZhuang = this.getBoolItem("genZhuang", true);
        else
            genZhuang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunGuangDong_genZhuang, true);
        this._playNode_genZhuang.setSelected(genZhuang);
        var text = this._playNode_genZhuang.getChildByName("text");
        this.selectedCB(text, genZhuang);
        this._playNode_genZhuang.setVisible(playerSeleIdx != 2);

        //大胡算法
        var daHu;
        if (isClub)
            daHu = this.getBoolItem("daHu", false);
        else
            daHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunGuangDong_daHu, false);
        this._playNode_daHu.setSelected(daHu);
        var text = this._playNode_daHu.getChildByName("text");
        this.selectedCB(text, daHu);

        //买马
        var maiMa;
        if (isClub) {
            maiMa = this.getNumberItem("maCount", 0);
        }else{
            maiMa = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qiChunGuangDong_maCount, 0);
        }
        var maiMaSeleIdx = [0, 2, 4, 6, 8, 1].indexOf(maiMa);
        this._playNode_player_maiMa_radio.selectItem(maiMaSeleIdx);
        this.radioBoxSelectCB(maiMaSeleIdx, this.maiMaNodeList[maiMaSeleIdx], this.maiMaNodeList);
        this.updateMaiMaItem(playerSeleIdx == 0);

        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qiChunGuangDong_tuoguan, 0);
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

        //听牌提示
        var isOpenTingTip;
        if (isClub)
            isOpenTingTip = this.getBoolItem("isOpenTingTip", true);
        else
            isOpenTingTip = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunGuangDong_isOpenTingTip, true);
        var tingIndex = isOpenTingTip ? 0 : 1;
        this.tingTipList_radio.selectItem(tingIndex);
        this.radioBoxSelectCB(tingIndex, this.tingTipList[tingIndex], this.tingTipList);
        
        // 积分底分
        var _jieSuanDiFen;
        if(isClub){
            _jieSuanDiFen = this.getNumberItem("jieSuanDiFen", 1);
        }else {
            _jieSuanDiFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qiChunGuangDong_jiesuan_difen,1);
        }
        var score = this.bg_node.getParent().getChildByName("txt_fen");
        this.difenIndex = this.difenAry.indexOf(_jieSuanDiFen);
        score.setString(_jieSuanDiFen);
    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.QI_CHUN_GD_MJ;
        para.maxPlayer = 4;
        para.convertible = false;//是否自由人数
        para.trustTime = 0;//托管


        //人数
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

        //鬼牌
        var guiPaiIndex = 0;
        if(this._playNode_guiPai_0.isSelected()) {
            guiPaiIndex = 0;
            para.hunType = 0;
        }else if (this._playNode_guiPai_1.isSelected()) {
            guiPaiIndex = 1;
            para.hunType = 1;
        }else if (this._playNode_guiPai_2.isSelected()) {
            guiPaiIndex = 2;
            para.hunType = 2;
        }else if (this._playNode_guiPai_3.isSelected()) {
            guiPaiIndex = 3;
            para.hunType = 3;
        }

        //风牌
        if(this._playNode_fengPai_0.isSelected()){
            para.windCard = false;
        }else{
            para.windCard = true;
        }
       
        //抢杠胡
        para.canRob = this._playNode_qiangGangHu.isSelected();
        //抢杠全包
        para.qiangGangQuanBao = para.canRob && this._playNode_qiangGangQuanBao.isSelected() && this._playNode_qiangGangQuanBao.isVisible();
        //杠爆全包
        para.gangBaoQuanBao = this._playNode_GangBaoQuanBao.isSelected();
        //只能自摸
        para.onlyZiMoHu = this._playNode_onlyZiMo.isSelected();
        //可胡七对
        para.isQiDui = this._playNode_keHuQiDui.isSelected();
        //七对加倍
        para.qiDuiJiaBei = this._playNode_qiDuiJiaBei.isSelected() && this._playNode_qiDuiJiaBei.isVisible();
        //跟庄
        para.genZhuang = this._playNode_genZhuang.isSelected() && this._playNode_genZhuang.isVisible();
        //大胡
        para.daHu = this._playNode_daHu.isSelected();

        //买马
        if (this._playNode_maiMa_0.isSelected()) {
            para.maCount = 0;
        } else if (this._playNode_maiMa_1.isSelected()) {
            para.maCount = 2;
        } else if (this._playNode_maiMa_2.isSelected()) {
            para.maCount = 4;
        } else if (this._playNode_maiMa_3.isSelected()) {
            para.maCount = 6;
        } else if (this._playNode_maiMa_4.isSelected()) {
            para.maCount = 8;
        } else if (this._playNode_maiMa_5.isSelected()) {
            para.maCount = 1;
        }
        if(para.maxPlayer != 4 && para.maCount > 1){
            para.maCount = 1;
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

        //听牌提示
        para.isOpenTingTip = this.tingTipList[0].isSelected();

        //积分底分
        var score = this.bg_node.getParent().getChildByName("txt_fen"); 
        para.jieSuanDiFen = Number(score.getString());
        
        this.getExtraSelectedPara(para);

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qiChunGuangDong_count,  para.maxPlayer);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunGuangDong_ziyou, para.convertible);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qiChunGuangDong_guiPai,  para.hunType);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunGuangDong_daiFeng,  para.windCard);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunGuangDong_qiangGangHu,  para.canRob);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunGuangDong_qiangGangQuanBao,  para.qiangGangQuanBao);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunGuangDong_gangBaoQuanBao,  para.gangBaoQuanBao);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunGuangDong_onlyZiMo,  para.onlyZiMoHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunGuangDong_qiDui,  para.isQiDui);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunGuangDong_qiDuiJiaBei,  para.qiDuiJiaBei);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunGuangDong_genZhuang,  para.genZhuang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunGuangDong_daHu,  para.daHu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qiChunGuangDong_maCount,  para.maCount);

            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qiChunGuangDong_tuoguan, para.trustTime);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunGuangDong_isOpenTingTip, para.isOpenTingTip);
            //底分
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qiChunGuangDong_jiesuan_difen, para.jieSuanDiFen);
        
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    },

    changePayForPlayerNum:function(select_number){
        this._super(select_number); 
        this._playNode_genZhuang.setVisible(select_number != 2);
        this.updateMaiMaItem(select_number == 0);
    }, 

    updateMaiMaItem: function(isShowAll){
        this._playNode_maiMa_1.setVisible(isShowAll);
        this._playNode_maiMa_2.setVisible(isShowAll);
        this._playNode_maiMa_3.setVisible(isShowAll);
        this._playNode_maiMa_4.setVisible(isShowAll);
        this._playNode_maiMa_5.setPosition(isShowAll ? this._playNode_maiMa_5.originalPos : this._playNode_maiMa_3.getPosition());
        if(!isShowAll && !this._playNode_maiMa_0.isSelected() && !this._playNode_maiMa_5.isSelected()){
            this._playNode_player_maiMa_radio.selectItem(5);
            this.radioBoxSelectCB(5, this.maiMaNodeList[5], this.maiMaNodeList);
        }
    }

});