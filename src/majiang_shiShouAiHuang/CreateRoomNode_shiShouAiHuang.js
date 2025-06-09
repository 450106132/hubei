var CreateRoomNode_shiShouAiHuang = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_shiShouAiHuang_xiaoHuScore	      = "_shiShouAiHuang_xiaoHuScore";
        this.localStorageKey.KEY_shiShouAiHuang_isFanMa		      = "_shiShouAiHuang_isFanMa";
        this.localStorageKey.KEY_shiShouAiHuang_daHuJiaMa	      = "_shiShouAiHuang_daHuJiaMa";
        this.localStorageKey.KEY_shiShouAiHuang_daDaHuManGuan     = "_shiShouAiHuang_daDaHuManGuan";
        this.localStorageKey.KEY_shiShouAiHuang_autoHu 			  = "_shiShouAiHuang_autoHu";
        this.localStorageKey.KEY_shiShouAiHuang_liuMa 			  = "_shiShouAiHuang_liuMa";
        this.localStorageKey.KEY_shiShouAiHuang_diMa              = "_shiShouAiHuang_diMa";
        this.localStorageKey.KEY_shiShouAiHuang_tuoguan           = "_shiShouAiHuang_tuoguan"; 
        this.localStorageKey.KEY_shiShouAiHuang_isOpenTingTip     = "_shiShouAiHuang_isOpenTingTip";
        this.localStorageKey.KEY_shiShouAiHuang_jiesuan_difen     = "_shiShouAiHuang_difen";
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();

        this.bgNode = ccs.load("bg_shiShouAiHuang.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg");
    },
    initPlayNode: function() {
        var _bgshiShouAiHuangNode = this.bg_node;
        var _play = _bgshiShouAiHuangNode.getChildByName("play");

        var xiaohufenList = [];
        xiaohufenList.push(_play.getChildByName("xiaohufen_0"));
        xiaohufenList.push(_play.getChildByName("xiaohufen_1"));
        this._playNode_xiaohufen_radio = createRadioBoxForCheckBoxs(xiaohufenList, this.radioBoxSelectCB);
        this.addListenerText(xiaohufenList, this._playNode_xiaohufen_radio);
        this.xiaohufenList = xiaohufenList;

        var fanmaList = [];
        fanmaList.push(_play.getChildByName("fanma_0"));
        fanmaList.push(_play.getChildByName("fanma_1"));
        this._playNode_fanma_radio = createRadioBoxForCheckBoxs(fanmaList, this.radioBoxSelectCB);
        this.addListenerText(fanmaList, this._playNode_fanma_radio);
        this.fanmaList = fanmaList;
        
        this.play_dahujiama = _play.getChildByName("dahujiama");
        this.addListenerText(this.play_dahujiama);
        this.play_dahujiama.addEventListener(this.clickCB, this.play_dahujiama);

        this.play_dadahumanguan = _play.getChildByName("dadahumanguan");
        this.addListenerText(this.play_dadahumanguan);
        this.play_dadahumanguan.addEventListener(this.clickCB, this.play_dadahumanguan);
        
        this.play_autohu = _play.getChildByName("autohu");
        this.addListenerText(this.play_autohu);
        this.play_autohu.addEventListener(this.clickCB, this.play_autohu);

        var liumaList = [];
        liumaList.push(_play.getChildByName("liuma_0"));
        liumaList.push(_play.getChildByName("liuma_1"));
        this.playNode_liuma_radio = createRadioBoxForCheckBoxs(liumaList, this.radioBoxSelectCB);
        this.addListenerText(liumaList, this.playNode_liuma_radio);
        this.liumaList = liumaList;

        var diMaList = [];
        for (var index = 0; index < 9; index++) {
            diMaList.push(_play.getChildByName("dima_" + index));
        }
        this.playNode_dima_radio = createRadioBoxForCheckBoxs(diMaList, this.radioBoxSelectCB);
        this.addListenerText(diMaList, this.playNode_dima_radio);
        this.diMaList = diMaList;

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
        this.difenAry = [0.1,0.2,0.3,0.4,0.5,1,2,3,4,5,6,7,8,9,10];
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
        _play.getChildByName("maxPlayer4").getChildByName("text").setTextColor(this._selectColor);

        var xiaoHuScore;
        if (isClub) {
            xiaoHuScore = this.getNumberItem("xiaoHuScore", 1) == 1 ? 0 : 1;
        }else{
            xiaoHuScore = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_shiShouAiHuang_xiaoHuScore, 0);
        }
        this._playNode_xiaohufen_radio.selectItem(xiaoHuScore);
        this.radioBoxSelectCB(xiaoHuScore, this.xiaohufenList[xiaoHuScore], this.xiaohufenList);

        var isFanMa;
        if (isClub)
            isFanMa = this.getNumberItem("isFanMa", 0);
        else
            isFanMa = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_shiShouAiHuang_isFanMa, 0);
        this._playNode_fanma_radio.selectItem(isFanMa);
        this.radioBoxSelectCB(isFanMa, this.fanmaList[isFanMa], this.fanmaList);

        var daHuJiaMa;
        if (isClub)
            daHuJiaMa = this.getBoolItem("daHuJiaMa", false);
        else
            daHuJiaMa = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_shiShouAiHuang_daHuJiaMa, false);
        this.play_dahujiama.setSelected(daHuJiaMa);
        var text = this.play_dahujiama.getChildByName("text");
        this.selectedCB(text, daHuJiaMa);

        var daDaHuManGuan;
        if (isClub)
            daDaHuManGuan = this.getBoolItem("daDaHuManGuan", false);
        else
            daDaHuManGuan = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_shiShouAiHuang_daDaHuManGuan, false);
        this.play_dadahumanguan.setSelected(daDaHuManGuan);
        var text = this.play_dadahumanguan.getChildByName("text");
        this.selectedCB(text, daDaHuManGuan);

        var autoHu;
        if (isClub)
            autoHu = this.getBoolItem("autoHu", true);
        else
            autoHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_shiShouAiHuang_autoHu, true);
        this.play_autohu.setSelected(autoHu);
        var text = this.play_autohu.getChildByName("text");
        this.selectedCB(text, autoHu);

        var liuMa;
        if (isClub)
            liuMa = this.getNumberItem("liuMa", 1);
        else
            liuMa = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_shiShouAiHuang_liuMa, 1);
        this.playNode_liuma_radio.selectItem(liuMa);
        this.radioBoxSelectCB(liuMa, this.liumaList[liuMa], this.liumaList);

        var diMa;
        if (isClub)
            diMa = this.getNumberItem("diMa", 4) - 4;
        else
            diMa = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_shiShouAiHuang_diMa, 0);
        this.playNode_dima_radio.selectItem(diMa);
        this.radioBoxSelectCB(diMa, this.diMaList[diMa], this.diMaList);
        
        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_shiShouAiHuang_tuoguan, 0);
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
            isOpenTingTip = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_shiShouAiHuang_isOpenTingTip, true);
        var tingIndex = isOpenTingTip ? 0 : 1;
        this.tingTipList_radio.selectItem(tingIndex);
        this.radioBoxSelectCB(tingIndex, this.tingTipList[tingIndex], this.tingTipList);
        
        // 积分底分
        var _jieSuanDiFen;
        if(isClub){
            _jieSuanDiFen = this.getNumberItem("jieSuanDiFen", 1);
        }else {
            _jieSuanDiFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_shiShouAiHuang_jiesuan_difen,1);
        }
        var score = this.bg_node.getParent().getChildByName("txt_fen");
        this.difenIndex = this.difenAry.indexOf(_jieSuanDiFen);
        score.setString(_jieSuanDiFen);
    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG;
        para.maxPlayer = 3;

        var xiaoHuScoreIndex = this._playNode_xiaohufen_radio.getSelectIndex();
        var diMaIndex = this.playNode_dima_radio.getSelectIndex();

        para.xiaoHuScore = [1, 2][xiaoHuScoreIndex];
        para.isFanMa = this._playNode_xiaohufen_radio.getSelectIndex();
        para.daHuJiaMa = this.play_dahujiama.isSelected();
        para.daDaHuManGuan = this.play_dadahumanguan.isSelected();
        para.autoHu = this.play_autohu.isSelected();
        para.liuMa = this.playNode_liuma_radio.getSelectIndex();
        para.diMa = diMaIndex + 4;

        //托管
        para.trustTime = 0;//托管
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
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_shiShouAiHuang_xiaoHuScore, xiaoHuScoreIndex);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_shiShouAiHuang_isFanMa, para.isFanMa);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_shiShouAiHuang_daHuJiaMa, para.daHuJiaMa);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_shiShouAiHuang_daDaHuManGuan, para.daDaHuManGuan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_shiShouAiHuang_autoHu, para.autoHu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_shiShouAiHuang_liuMa, para.liuMa);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_shiShouAiHuang_diMa, diMaIndex);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_shiShouAiHuang_tuoguan, para.trustTime);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_shiShouAiHuang_isOpenTingTip, para.isOpenTingTip);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_shiShouAiHuang_jiesuan_difen, para.jieSuanDiFen);
        
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    },

    changePayForPlayerNum:function(select_number){
        this._super(select_number); 
    }, 

});