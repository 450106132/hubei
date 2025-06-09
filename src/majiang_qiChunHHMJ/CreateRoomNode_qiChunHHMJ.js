
var CreateRoomNode_qiChunHHMJ = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_qiChunHHMJ_maxPlayer              = "_qiChunHHMJ_MAX_PLAYER";          // 玩家人数
        this.localStorageKey.KEY_qiChunHHMJ_ziyou                  = "_qiChunHHMJ_ZIYOU";               // 自由人数
        this.localStorageKey.KEY_qiChunHHMJ_isOpenTingTip          = "_qiChunHHMJ_isOpenTingTip";       // 是否开启听牌提示
        this.localStorageKey.KEY_qiChunHHMJ_tuoguan                = "_qiChunHHMJ_TUO_GUAN";            // 托管
        // this.localStorageKey.KEY_qiChunHHMJ_difen                  = "_qiChunHHMJ_DI_FEN";              // 底分
        this.localStorageKey.KEY_qiChunHHMJ_daHuHaiDiLao         = "_qiChunHHMJ_DA_HU_HAI_DI_LAO";  // 固定杠类型（0：红中，1：红中和发财）
        this.localStorageKey.KEY_qiChunHHMJ_zhongFaBaiKeDaHu                = "_qiChunHHMJ_ZHONG_FA_BAI_KE_DA_HU";            // 杠上开花

    },

    initAll: function(IsFriendCard) {

        if (!IsFriendCard) this.setKey();

        this.bgNode = ccs.load("bg_qiChunHHMJ.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_qiChunHHMJ").getChildByName("view");

        if (!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_qiChunHHMJ");
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

        // 亮中发白可胡大胡
        this._playNode_zhongFaBaiKeDaHu = _play.getChildByName("play_zhongFaBaiKeDaHu");
        this.addListenerText(this._playNode_zhongFaBaiKeDaHu);
        this._playNode_zhongFaBaiKeDaHu.addEventListener(this.clickCB, this._playNode_zhongFaBaiKeDaHu);

        // 海底捞算大胡
        this._playNode_daHuHaiDiLao = _play.getChildByName("play_daHuHaiDiLao");
        this.addListenerText(this._playNode_daHuHaiDiLao);
        this._playNode_daHuHaiDiLao.addEventListener(this.clickCB, this._playNode_daHuHaiDiLao);

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
        // this._zhuIdx = 1;
        // this._ZhuNum = _bgCYMJNode.getParent().getChildByName("txt_fen");
        // if (this._ZhuNum) {
        //     this._ZhuNum.setString(this._zhuIdx);
        //     this._Button_sub = _bgCYMJNode.getParent().getChildByName("btn_sub");
        //     this._Button_sub.addTouchEventListener(function(sender, type) {
        //         if (type == 2) {
        //             if (this._zhuIdx <= 0.1) {
        //                 this._zhuIdx = 11;
        //             }
        //             if (this._zhuIdx > 0) {
        //                 var step = 0.1;

        //                 if (this._zhuIdx > 1)
        //                     step = 1;
        //                 else if (this._zhuIdx > 0.5)
        //                     step = 0.5;

        //                 this._zhuIdx -= step;
        //                 this._zhuIdx = correctAccuracy(this._zhuIdx,5);
        //                 this._ZhuNum.setString(this._zhuIdx);
        //                 this._Button_add.setTouchEnabled(true);
        //                 this._Button_add.setBright(true);
        //             }
        //         }
        //     }, this);
        //     this._Button_add = _bgCYMJNode.getParent().getChildByName("btn_add");
        //     this._Button_add.addTouchEventListener(function(sender, type) {
        //         if (type == 2) {
        //             if (this._zhuIdx == 10) {
        //                 this._zhuIdx = 0;
        //             }
        //             if (this._zhuIdx < 10) {
        //                 var step = 0.1;

        //                 if (this._zhuIdx >= 1)
        //                     step = 1;
        //                 else if (this._zhuIdx >= 0.5)
        //                     step = 0.5;

        //                 this._zhuIdx += step;
        //                 this._zhuIdx = correctAccuracy(this._zhuIdx,5);
        //                 this._ZhuNum.setString(this._zhuIdx);
        //                 this._Button_sub.setTouchEnabled(true);
        //                 this._Button_sub.setBright(true);
        //             }
        //         }
        //     }, this);
        // }

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
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qiChunHHMJ_maxPlayer, 4);
        cc.log("_currentCount renshu  == " + _currentCount)
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);


        // 托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qiChunHHMJ_tuoguan, 0);
        var index = [0, 60, 120, 180, 300].indexOf(_trustTime);
        this.radioBoxSelectCB(index, this.tuoguanNodeList[index], this.tuoguanNodeList);

        // 亮中发白可胡大胡
        var zhongFaBaiKeDaHu;
        if (isClub)
            zhongFaBaiKeDaHu = this.getBoolItem("zhongFaBaiKeDaHu", false);
        else
            zhongFaBaiKeDaHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunHHMJ_zhongFaBaiKeDaHu, false);
        this._playNode_zhongFaBaiKeDaHu.setSelected(zhongFaBaiKeDaHu);
        var text = this._playNode_zhongFaBaiKeDaHu.getChildByName("text");
        this.selectedCB(text, zhongFaBaiKeDaHu);

        // 海底捞算大胡
        var daHuHaiDiLao;
        if (isClub)
            daHuHaiDiLao = this.getBoolItem("daHuHaiDiLao", false);
        else
            daHuHaiDiLao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_qiChunHHMJ_daHuHaiDiLao, false);
        this._playNode_daHuHaiDiLao.setSelected(daHuHaiDiLao);
        var text = this._playNode_daHuHaiDiLao.getChildByName("text");
        this.selectedCB(text, daHuHaiDiLao);
        
        // 底分
        // if (isClub)
        //     this._zhuIdx = this.getNumberItem("difen", 1);
        // else
        //     this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_qiChunHHMJ_difen, 1);
        // if (this._ZhuNum)
        //     this._ZhuNum.setString(this._zhuIdx + "");


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
        para.gameType = MjClient.GAME_TYPE.QI_CHUN_HH_MJ;
        //人数
        var _countIdx = 0;
        if (this._playNode_maxPlayer0.isSelected()) {
            para.maxPlayer = 4;
            _countIdx = 0;
        } else if (this._playNode_maxPlayer1.isSelected()) {
            para.maxPlayer = 3;
            _countIdx = 1;
        } else if (this._playNode_maxPlayer2.isSelected()) {
            para.maxPlayer = 2;
            _countIdx = 2;
        } else if (this._playNode_maxPlayer3.isSelected()) {
            para.maxPlayer = 4;
            para.convertible = true;
            _countIdx = 3;
        }

        // para.difen = this._zhuIdx;

        // 托管
        para.trustTime = [0, 60, 120, 180, 300][this._playNode_player_tuoguan_radio.getSelectIndex()];

        // 亮中发白可胡大胡
        para.zhongFaBaiKeDaHu = this._playNode_zhongFaBaiKeDaHu.isSelected();
        // 海底捞算大胡
        para.daHuHaiDiLao = this._playNode_daHuHaiDiLao.isSelected();
        // 听牌提示
        // para.isOpenTingTip = this.tingTipList[0].isSelected();
        para.isOpenTingTip = true;

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qiChunHHMJ_maxPlayer, _countIdx);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qiChunHHMJ_tuoguan, para.trustTime);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunHHMJ_zhongFaBaiKeDaHu, para.zhongFaBaiKeDaHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunHHMJ_daHuHaiDiLao, para.daHuHaiDiLao);
            // util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_qiChunHHMJ_difen, para.difen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_qiChunHHMJ_isOpenTingTip, para.isOpenTingTip);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});