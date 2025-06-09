
var CreateRoomNode_huangShiHHMJ = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_huangShiHHMJ_maxPlayer              = "_huangShiHHMJ_MAX_PLAYER";          // 玩家人数
        this.localStorageKey.KEY_huangShiHHMJ_ziyou                  = "_huangShiHHMJ_ZIYOU";               // 自由人数
        this.localStorageKey.KEY_huangShiHHMJ_isOpenTingTip          = "_huangShiHHMJ_isOpenTingTip";       // 是否开启听牌提示
        this.localStorageKey.KEY_huangShiHHMJ_tuoguan                = "_huangShiHHMJ_TUO_GUAN";            // 托管
        this.localStorageKey.KEY_huangShiHHMJ_difen                  = "_huangShiHHMJ_DI_FEN";              // 底分
        this.localStorageKey.KEY_huangShiHHMJ_gudinggangType         = "_huangShiHHMJ_GUO_DING_GANG_TYPE";  // 固定杠类型（0：红中，1：红中和发财）
        this.localStorageKey.KEY_huangShiHHMJ_gangkai                = "_huangShiHHMJ_GANG_KAI";            // 杠上开花
        this.localStorageKey.KEY_huangShiHHMJ_fanpaobaofen           = "_huangShiHHMJ_FANG_PAO_BAO_FEN";    // 放炮一家出（谁放炮，谁承担）
        this.localStorageKey.KEY_huangShiHHMJ_jinding                = "_huangShiHHMJ_JIN_DING";            // 金顶
        this.localStorageKey.KEY_huangShiHHMJ_liangpaikedahu         = "_huangShiHHMJ_LIANG_PAI_KE_DA_HU";  // 亮中发白可胡大胡
    },

    initAll: function(IsFriendCard) {

        if (!IsFriendCard) this.setKey();

        this.bgNode = ccs.load("bg_huangShiHHMJ.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_huangShiHHMJ").getChildByName("view");

        if (!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_huangShiHHMJ");
    },

    initPlayNode: function() {
        var _bgCYMJNode = this.bg_node;
        var _play = _bgCYMJNode.getChildByName("play");


        // 人数
        this._playNode_maxPlayer0 = _play.getChildByName("play_count0");
        this._playNode_maxPlayer1 = _play.getChildByName("play_count1");
        this._playNode_maxPlayer2 = _play.getChildByName("play_count2");
        this._playNode_maxPlayer3 = _play.getChildByName("play_count3");
        var nodeCountList1 = [];
        nodeCountList1.push(this._playNode_maxPlayer0);
        nodeCountList1.push(this._playNode_maxPlayer1);
        nodeCountList1.push(this._playNode_maxPlayer2);
        nodeCountList1.push(this._playNode_maxPlayer3);
        this.initPlayNumNode(nodeCountList1, [4, 3, 2, 4]);
        cc.log("==== nodeCountList1 = " + JSON.stringify(nodeCountList1))
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(nodeCountList1, function(index) {
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeCountList1[index], nodeCountList1);
        }.bind(this));
        this.addListenerText(nodeCountList1, this._playNode_player_count_radio, this.changePayForPlayerNum.bind(this));
        this._countlist = nodeCountList1;


        // 托管提示
        var btn_tuoguanTip = _play.getChildByName("btn_tuoguanTip");
        var image_tuoguanTip = _play.getChildByName("image_tuoguanTip");
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


        // 固定杠类型（0：红中，1：红中和发财）
        this._playNode_hongzhong = _play.getChildByName("play_hongzhong");
        this._playNode_facai = _play.getChildByName("play_facai");
        var gudingGangTypeList = [];
        gudingGangTypeList.push(this._playNode_hongzhong);
        gudingGangTypeList.push(this._playNode_facai);
        this._playNode_player_gudinggangType_radio = createRadioBoxForCheckBoxs(gudingGangTypeList, this.radioBoxSelectCB);
        this.addListenerText(gudingGangTypeList, this._playNode_player_gudinggangType_radio);
        this.gudingGangTypeList = gudingGangTypeList;

        // 金顶
        this._playNode_jinding_0 = _play.getChildByName("jinding_0");
        this._playNode_jinding_1 = _play.getChildByName("jinding_1");
        this._playNode_jinding_2 = _play.getChildByName("jinding_2");
        this._playNode_jinding_3 = _play.getChildByName("jinding_3");
        this._playNode_jinding_4 = _play.getChildByName("jinding_4");
        var jindingList = [];
        jindingList.push(this._playNode_jinding_0);
        jindingList.push(this._playNode_jinding_1);
        jindingList.push(this._playNode_jinding_2);
        jindingList.push(this._playNode_jinding_3);
        jindingList.push(this._playNode_jinding_4);
        this._playNode_player_jinding_radio = createRadioBoxForCheckBoxs(jindingList, this.radioBoxSelectCB);
        this.addListenerText(jindingList, this._playNode_player_jinding_radio);
        this.jindingList = jindingList;


        // 杠上开花
        this._playNode_gangkai = _play.getChildByName("play_gangkai");
        this.addListenerText(this._playNode_gangkai);
        this._playNode_gangkai.addEventListener(this.clickCB, this._playNode_gangkai);


        // 放炮一家出（谁放炮，谁承担）
        this._playNode_fanpaobaofen = _play.getChildByName("play_fanpaobaofen");
        this.addListenerText(this._playNode_fanpaobaofen);
        this._playNode_fanpaobaofen.addEventListener(this.clickCB, this._playNode_fanpaobaofen);

        // 亮中发白可胡大胡
        this._playNode_liangpaikedahu = _play.getChildByName("play_liangpaikedahu");
        this.addListenerText(this._playNode_liangpaikedahu);
        this._playNode_liangpaikedahu.addEventListener(this.clickCB, this._playNode_liangpaikedahu);


        // 托管
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


        // // 听牌提示
        // var tingTipList = [];
        // tingTipList.push(_play.getChildByName("tingTip1"));
        // tingTipList.push(_play.getChildByName("tingTip2"));
        // this.tingTipList_radio = createRadioBoxForCheckBoxs(tingTipList, this.radioBoxSelectCB);
        // this.addListenerText(tingTipList, this.tingTipList_radio);
        // this.tingTipList = tingTipList;


        // 底分
        this._zhuIdx = 1;
        this._ZhuNum = _bgCYMJNode.getParent().getChildByName("txt_fen");
        if (this._ZhuNum) {
            this._ZhuNum.setString(this._zhuIdx);
            this._Button_sub = _bgCYMJNode.getParent().getChildByName("btn_sub");
            this._Button_sub.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (this._zhuIdx <= 0.1) {
                        this._zhuIdx = 11;
                    }
                    if (this._zhuIdx > 0) {
                        var step = 0.1;

                        if (this._zhuIdx > 1)
                            step = 1;
                        else if (this._zhuIdx > 0.5)
                            step = 0.5;

                        this._zhuIdx -= step;
                        this._zhuIdx = correctAccuracy(this._zhuIdx,5);
                        this._ZhuNum.setString(this._zhuIdx);
                        this._Button_add.setTouchEnabled(true);
                        this._Button_add.setBright(true);
                        this.setRoomCardModeFree();
                    }
                }
            }, this);
            this._Button_add = _bgCYMJNode.getParent().getChildByName("btn_add");
            this._Button_add.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (this._zhuIdx == 10) {
                        this._zhuIdx = 0;
                    }
                    if (this._zhuIdx < 10) {
                        var step = 0.1;

                        if (this._zhuIdx >= 1)
                            step = 1;
                        else if (this._zhuIdx >= 0.5)
                            step = 0.5;

                        this._zhuIdx += step;
                        this._zhuIdx = correctAccuracy(this._zhuIdx,5);
                        this._ZhuNum.setString(this._zhuIdx);
                        this._Button_sub.setTouchEnabled(true);
                        this._Button_sub.setBright(true);
                        this.setRoomCardModeFree();
                    }
                }
            }, this);
        }

    },
    setPlayNodeCurrentSelect: function(isClub) {
        // 人数
        var _currentCount;
        if (isClub) {
            if (this.getBoolItem("convertible", false))
                _currentCount = 3;
            else
                _currentCount = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        }
        else
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huangShiHHMJ_maxPlayer, 4);
        cc.log("_currentCount renshu  == " + _currentCount)
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);


        // 托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huangShiHHMJ_tuoguan, 0);
        var index = [0, 60, 120, 180, 300].indexOf(_trustTime);
        this.radioBoxSelectCB(index, this.tuoguanNodeList[index], this.tuoguanNodeList);


        // 固定杠类型（0：红中，1：红中和发财）
        var _gudinggangType;
        if (isClub)
            _gudinggangType = this.getNumberItem("gudinggangType", 0);
        else
            _gudinggangType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huangShiHHMJ_gudinggangType, 0);
        this._playNode_player_gudinggangType_radio.selectItem(_gudinggangType);
        this.radioBoxSelectCB(_gudinggangType, this.gudingGangTypeList[_gudinggangType], this.gudingGangTypeList);


        // 金顶
        var _jinding;
        if (isClub)
            _jinding = this.getNumberItem("jinding", 100);
        else
            _jinding = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huangShiHHMJ_jinding, 100);
        _jinding = [25, 50, 100, 150, 200].indexOf(_jinding);
        this._playNode_player_jinding_radio.selectItem(_jinding);
        this.radioBoxSelectCB(_jinding, this.jindingList[_jinding], this.jindingList);


        // 杠上开花
        var _gangkai;
        if (isClub)
            _gangkai = this.getBoolItem("gangkai", false);
        else
            _gangkai = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huangShiHHMJ_gangkai, false);
        this._playNode_gangkai.setSelected(_gangkai);
        var text = this._playNode_gangkai.getChildByName("text");
        this.selectedCB(text, _gangkai);

        // 放炮一家出（谁放炮，谁承担）
        var _fanpaobaofen;
        if (isClub)
            _fanpaobaofen = this.getBoolItem("fanpaobaofen", false);
        else
            _fanpaobaofen = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huangShiHHMJ_fanpaobaofen, false);
        this._playNode_fanpaobaofen.setSelected(_fanpaobaofen);
        var text = this._playNode_fanpaobaofen.getChildByName("text");
        this.selectedCB(text, _fanpaobaofen);

        // 亮中发白可胡大胡
        var _liangpaikedahu;
        if (isClub)
            _liangpaikedahu = this.getBoolItem("liangpaikedahu", false);
        else
            _liangpaikedahu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huangShiHHMJ_liangpaikedahu, false);
        this._playNode_liangpaikedahu.setSelected(_liangpaikedahu);
        var text = this._playNode_liangpaikedahu.getChildByName("text");
        this.selectedCB(text, _liangpaikedahu);
        
        // 底分
        if (isClub)
            this._zhuIdx = this.getNumberItem("difen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huangShiHHMJ_difen, 1);
        if (this._ZhuNum)
            this._ZhuNum.setString(this._zhuIdx + "");


        // 听牌提示
        // var isOpenTingTip;
        // if (isClub)
        //     isOpenTingTip = this.getBoolItem("isOpenTingTip", true);
        // else
        //     isOpenTingTip = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_isOpenTingTip, true);
        // var tingIndex = isOpenTingTip ? 0 : 1;
        // this.tingTipList_radio.selectItem(tingIndex);
        // this.radioBoxSelectCB(tingIndex, this.tingTipList[tingIndex], this.tingTipList);

    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.HUANG_SHI_HH_MJ;

        // 人数
        para.maxPlayer = [4, 3, 2, 4][this._playNode_player_count_radio.getSelectIndex()];

        // 是否自由人数
        para.convertible = this._playNode_maxPlayer3.isSelected();

        // 底分
        para.difen = this._zhuIdx;

        // 托管
        para.trustTime = [0, 60, 120, 180, 300][this._playNode_player_tuoguan_radio.getSelectIndex()];

        // 金顶
        para.jinding = [25, 50, 100, 150, 200][this._playNode_player_jinding_radio.getSelectIndex()];

        // 固定杠类型（0：红中，1：红中和发财）
        para.gudinggangType = [0, 1][this._playNode_player_gudinggangType_radio.getSelectIndex()];

        // 杠上开花
        para.gangkai = this._playNode_gangkai.isSelected();

        // 放炮一家出（谁放炮，谁承担）
        para.fanpaobaofen = this._playNode_fanpaobaofen.isSelected();

        // 亮中发白可胡大胡
        para.liangpaikedahu = this._playNode_liangpaikedahu.isSelected();

        // 听牌提示
        // para.isOpenTingTip = this.tingTipList[0].isSelected();
        para.isOpenTingTip = true;

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huangShiHHMJ_maxPlayer, para.maxPlayer);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huangShiHHMJ_gudinggangType, para.gudinggangType);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huangShiHHMJ_gangkai, para.gangkai);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huangShiHHMJ_fanpaobaofen, para.fanpaobaofen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huangShiHHMJ_jinding, para.jinding);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huangShiHHMJ_tuoguan, para.trustTime);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huangShiHHMJ_liangpaikedahu, para.liangpaikedahu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huangShiHHMJ_difen, para.difen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huangShiHHMJ_isOpenTingTip, para.isOpenTingTip);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});