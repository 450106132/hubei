
var CreateRoomNode_qianJiangHHMJ = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_qianJiangHHMJ_maxPlayer              = "_qianJiangHHMJ_MAX_PLAYER";        // 玩家人数
        // this.localStorageKey.KEY_qianJiangHHMJ_ziyou                  = "_qianJiangHHMJ_ZIYOU";             // 自由人数
        this.localStorageKey.KEY_qianJiangHHMJ_isOpenTingTip          = "_qianJiangHHMJ_isOpenTingTip";     // 是否开启听牌提示
        this.localStorageKey.KEY_qianJiangHHMJ_tuoguan                = "_qianJiangHHMJ_TUO_GUAN";          // 托管
        this.localStorageKey.KEY_qianJiangHHMJ_difen                  = "_qianJiangHHMJ_DI_FEN";            // 底分

        this.localStorageKey.KEY_qianJiangHHMJ_gameTypes              = "_qianJiangHHMJ_GAME_TYPES";        // 玩法类型 0 ：土豪必杠 1：潜江癞晃 2：铁三角 3：三三晃晃 4：硬铁三角
        this.localStorageKey.KEY_qianJiangHHMJ_angangfan              = "_qianJiangHHMJ_AN_GANG_FAN";       // 暗杠番
        this.localStorageKey.KEY_qianJiangHHMJ_xifan                  = "_qianJiangHHMJ_XI_FAN";            // 喜番

        this.localStorageKey.KEY_qianJiangHHMJ_shuangdahu             = "_qianJiangHHMJ_SHUANG_DA_HU";      // 双大胡
        this.localStorageKey.KEY_qianJiangHHMJ_zimohu                 = "_qianJiangHHMJ_ZI_MO_HU";          // 只能自摸胡
        this.localStorageKey.KEY_qianJiangHHMJ_rechong                = "_qianJiangHHMJ_RE_CHONG";          // 热铳
    },

    initAll: function(IsFriendCard) {

        if (!IsFriendCard) this.setKey();

        this.bgNode = ccs.load("bg_qianJiangHHMJ.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_qianJiangHHMJ").getChildByName("view");

        if (!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_qianJiangHHMJ");
    },

    initPlayNode: function() {
        var _bgCYMJNode = this.bg_node;
        var _play = _bgCYMJNode.getChildByName("play");

        // 游戏玩法类型
        this._play_tuhaobigang          = _play.getChildByName("play_tuhaobigang");
        this._play_qianjianglaihuang    = _play.getChildByName("play_qianjianglaihuang");
        this._play_tiesanjiao           = _play.getChildByName("play_tiesanjiao");
        this._play_sansanhh             = _play.getChildByName("play_sansanhh");
        this._play_yingtiesanjiao       = _play.getChildByName("play_yingtiesanjiao");
        var gameTypesList = [];
        gameTypesList.push(this._play_tuhaobigang);
        gameTypesList.push(this._play_qianjianglaihuang);
        gameTypesList.push(this._play_tiesanjiao);
        gameTypesList.push(this._play_sansanhh);
        gameTypesList.push(this._play_yingtiesanjiao);
        this._playNode_player_gameTypes_radio = createRadioBoxForCheckBoxs(gameTypesList, this.radioBoxSelectCB);
        this.addListenerText(gameTypesList, this._playNode_player_gameTypes_radio);
        this.gameTypesList = gameTypesList;

        // 暗杠
        this._play_angang4 = _play.getChildByName("play_angang4");
        this._play_angang2 = _play.getChildByName("play_angang2");
        var angangfanList = [];
        angangfanList.push(this._play_angang4);
        angangfanList.push(this._play_angang2);
        this._playNode_player_angangfan_radio = createRadioBoxForCheckBoxs(angangfanList, this.radioBoxSelectCB);
        this.addListenerText(angangfanList, this._playNode_player_angangfan_radio);
        this.angangfanList = angangfanList;

        // 喜
        this._play_xifan1 = _play.getChildByName("play_xifan1");
        this._play_xifan2 = _play.getChildByName("play_xifan2");
        this._play_xifan3 = _play.getChildByName("play_xifan3");
        var xifanList = [];
        xifanList.push(this._play_xifan1);
        xifanList.push(this._play_xifan2);
        xifanList.push(this._play_xifan3);
        this._playNode_player_xifan_radio = createRadioBoxForCheckBoxs(xifanList, this.radioBoxSelectCB);
        this.addListenerText(xifanList, this._playNode_player_xifan_radio);
        this.xifanList = xifanList;

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


        // 双大胡
        this._playNode_shuangdahu = _play.getChildByName("play_shuangdahu");
        this.addListenerText(this._playNode_shuangdahu);
        this._playNode_shuangdahu.addEventListener(this.clickCB, this._playNode_shuangdahu);

        // 只能自摸胡
        this._playNode_zimohu = _play.getChildByName("play_zimohu");
        this.addListenerText(this._playNode_zimohu);
        this._playNode_zimohu.addEventListener(this.clickCB, this._playNode_zimohu);
        this._playNode_zimohu.schedule(function(){
            if (this._play_sansanhh.isSelected()) {
                this._playNode_zimohu.setSelected(true);
                this.selectedCB(this._playNode_zimohu.getChildByName("text"), true);
            }
        }.bind(this));

        // 热铳
        this._playNode_rechong = _play.getChildByName("play_rechong");
        this.addListenerText(this._playNode_rechong);
        this._playNode_rechong.addEventListener(this.clickCB, this._playNode_rechong);


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
                    if (this._zhuIdx <= 1) {
                        this._zhuIdx = 11;
                    }
                    if (this._zhuIdx > 0) {
                        var step = 1;

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
                        var step = 1;

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

        // 游戏玩法类型
        var _gameTypes;
        if (isClub)
            _gameTypes = this.getNumberItem("gameTypes", 1);
        else
            _gameTypes = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qianJiangHHMJ_gameTypes, 1);
        _gameTypes = [0, 1, 2, 3, 4].indexOf(_gameTypes);
        this._playNode_player_gameTypes_radio.selectItem(_gameTypes);
        this.radioBoxSelectCB(_gameTypes, this.gameTypesList[_gameTypes], this.gameTypesList);

        // 暗杠番
        var _angangfan;
        if (isClub)
            _angangfan = this.getNumberItem("angangfan", 4);
        else
            _angangfan = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qianJiangHHMJ_angangfan, 4);
        _angangfan = [4, 2].indexOf(_angangfan);
        this._playNode_player_angangfan_radio.selectItem(_angangfan);
        this.radioBoxSelectCB(_angangfan, this.angangfanList[_angangfan], this.angangfanList);

        // 喜
        var _xifan;
        if (isClub)
            _xifan = this.getNumberItem("xifan", 10);
        else
            _xifan = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qianJiangHHMJ_xifan, 10);
        _xifan = [10, 20, 30].indexOf(_xifan);
        this._playNode_player_xifan_radio.selectItem(_xifan);
        this.radioBoxSelectCB(_xifan, this.xifanList[_xifan], this.xifanList);

        // 托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qianJiangHHMJ_tuoguan, 0);
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

        // 只能自摸胡
        var _zimohu;
        if (isClub)
            _zimohu = this.getBoolItem("zimohu", false);
        else
            _zimohu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qianJiangHHMJ_zimohu, false);
        this._playNode_zimohu.setSelected(_zimohu);
        var text = this._playNode_zimohu.getChildByName("text");
        this.selectedCB(text, _zimohu);

        // 双大胡
        var _shuangdahu;
        if (isClub)
            _shuangdahu = this.getBoolItem("shuangdahu", true);
        else
            _shuangdahu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qianJiangHHMJ_shuangdahu, true);
        this._playNode_shuangdahu.setSelected(_shuangdahu);
        var text = this._playNode_shuangdahu.getChildByName("text");
        this.selectedCB(text, _shuangdahu);

        // 热铳
        var _rechong;
        if (isClub)
            _rechong = this.getBoolItem("rechong", true);
        else
            _rechong = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qianJiangHHMJ_rechong, true);
        this._playNode_rechong.setSelected(_rechong);
        var text = this._playNode_rechong.getChildByName("text");
        this.selectedCB(text, _rechong);

        
        // 底分
        if (isClub)
            this._zhuIdx = this.getNumberItem("difen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qianJiangHHMJ_difen, 1);
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
        para.gameType = MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ;

        // 游戏玩法类型
        para.gameTypes = [0, 1, 2, 3, 4][this._playNode_player_gameTypes_radio.getSelectIndex()];

        // 人数
        if ([2, 4].indexOf(para.gameTypes) >= 0) {
            para.maxPlayer = 3;
        }
        else {
            para.maxPlayer = 4;
        }

        // 暗杠番
        para.angangfan = [4, 2][this._playNode_player_angangfan_radio.getSelectIndex()];

        // 喜
        para.xifan = [10, 20, 30][this._playNode_player_xifan_radio.getSelectIndex()];

        // 底分
        para.difen = this._zhuIdx;

        // 是否自由人数
        para.convertible = false;
        
        // 托管
        para.trustTime = [0, 60, 120, 180, 300][this._playNode_player_tuoguan_radio.getSelectIndex()];

        // 双大胡
        para.shuangdahu = this._playNode_shuangdahu.isSelected();

        // 只能自摸胡
        para.zimohu = this._playNode_zimohu.isSelected();

        // 热铳
        para.rechong = this._playNode_rechong.isSelected();

        // 听牌提示
        // para.isOpenTingTip = this.tingTipList[0].isSelected();
        para.isOpenTingTip = true;

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qianJiangHHMJ_gameTypes, para.gameTypes);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qianJiangHHMJ_angangfan, para.angangfan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qianJiangHHMJ_xifan, para.xifan);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qianJiangHHMJ_maxPlayer, para.maxPlayer);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qianJiangHHMJ_shuangdahu, para.shuangdahu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qianJiangHHMJ_zimohu, para.zimohu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qianJiangHHMJ_rechong, para.rechong);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qianJiangHHMJ_tuoguan, para.trustTime);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qianJiangHHMJ_difen, para.difen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qianJiangHHMJ_isOpenTingTip, para.isOpenTingTip);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});