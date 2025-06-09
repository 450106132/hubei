var CreateRoomNode_tongShanHuangHuang = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_tongShanHuangHuang_count        = "_tongShanHuangHuang_COUNT"; 				//人数
        this.localStorageKey.KEY_tongShanHuangHuang_tuoguan      = "_tongShanHuangHuang_TUO_GUAN";
        this.localStorageKey.KEY_tongShanHuangHuang_jiangId      = "_tongShanHuangHuang_JIANG_ID";            //将牌： 0:258做将    1:乱将
        this.localStorageKey.KEY_tongShanHuangHuang_fengDingId   = "_tongShanHuangHuang_FENGDING_ID";         //0: 48分封顶  1: 不封顶
        this.localStorageKey.KEY_tongShanHuangHuang_jianZiHuQG   = "_tongShanHuangHuang_JIANZIHU_QG";
        this.localStorageKey.KEY_tongShanHuangHuang_gangKaiJYF   = "_tongShanHuangHuang_GANGKAI_JYF";
        this.localStorageKey.KEY_tongShanHuangHuang_diFen        = "_tongShanHuangHuang_DI_FEN";
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard) this.setKey();
        this.bgNode = ccs.load("bg_tongShanHuangHuang.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_tongShanHuangHuang").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_tongShanHuangHuang");
    },
    initPlayNode: function() {
        var bgNode = this.bg_node;
        var _play = bgNode.getChildByName("play");
        this._playNode_4ren = _play.getChildByName("play_4ren");
        this._playNode_3ren = _play.getChildByName("play_3ren");
        this._playNode_2ren = _play.getChildByName("play_2ren");
        this._playNode_ziyou = _play.getChildByName("play_ziyou");
        var playerNumList = [this._playNode_4ren, this._playNode_3ren, this._playNode_2ren, this._playNode_ziyou];
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(playerNumList, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, playerNumList[index], playerNumList);
        }.bind(this));
        this.addListenerText(playerNumList, this._playNode_player_count_radio, this.changePayForPlayerNum.bind(this));
        this._countlist = playerNumList;
        this.initPlayNumNode(playerNumList, [4, 3, 2, 4]);


        //托管
        this._playNode_tuoguanType_0 = _play.getChildByName("tuoguan0");
        this._playNode_tuoguanType_1 = _play.getChildByName("tuoguan1");
        this._playNode_tuoguanType_2 = _play.getChildByName("tuoguan2");
        this._playNode_tuoguanType_3 = _play.getChildByName("tuoguan3");
        this._playNode_tuoguanType_4 = _play.getChildByName("tuoguan4");
        var tuoguanNodeList = [this._playNode_tuoguanType_0, this._playNode_tuoguanType_1, this._playNode_tuoguanType_2, this._playNode_tuoguanType_3, this._playNode_tuoguanType_4];
        this._playNode_player_tuoguan_radio = createRadioBoxForCheckBoxs(tuoguanNodeList, this.radioBoxSelectCB);
        this.addListenerText(tuoguanNodeList, this._playNode_player_tuoguan_radio);
        this.tuoguanNodeList = tuoguanNodeList;
        var btn_tuoguanTip = _play.getChildByName("btn_tuoguanTip");
        var image_tuoguanTip = _play.getChildByName("image_tuoguanTip");
        btn_tuoguanTip.addTouchEventListener(function(sender, type) {
            if (type === ccui.Widget.TOUCH_ENDED) {
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


        this._playNode_258jiang = _play.getChildByName("258jiang");
        this._playNode_luanjiang = _play.getChildByName("luanjiang");
        var jiangIdList = [this._playNode_258jiang, this._playNode_luanjiang];
        this._playNode_jiangId_radio = createRadioBoxForCheckBoxs(jiangIdList, this.radioBoxSelectCB);
        this.addListenerText(jiangIdList, this._playNode_jiangId_radio);
        this.jiangIdList = jiangIdList;

        this._playNode_jianZiHuQG = _play.getChildByName("play_jianzihu");
        this.addListenerText(this._playNode_jianZiHuQG);
        this._playNode_jianZiHuQG.addEventListener(this.clickCB, this._playNode_jianZiHuQG);

        this._playNode_gangKaiJYF = _play.getChildByName("play_gangkai");
        this.addListenerText(this._playNode_gangKaiJYF);
        this._playNode_gangKaiJYF.addEventListener(this.clickCB, this._playNode_gangKaiJYF);


        this._playNode_fengding0 = _play.getChildByName("fengding");
        this._playNode_fengding1 = _play.getChildByName("bufengding");
        var fengDingList = [this._playNode_fengding0, this._playNode_fengding1];
        this._playNode_fengDing_radio = createRadioBoxForCheckBoxs(fengDingList, this.radioBoxSelectCB);
        this.addListenerText(fengDingList, this._playNode_fengDing_radio);
        this.fengDingList = fengDingList;


        this._zhuIdx = 1;
        this._ZhuNum = bgNode.getParent().getChildByName("txt_fen");
        if (this._ZhuNum) {
            this._ZhuNum.setString(this._zhuIdx);
            this._Button_sub = bgNode.getParent().getChildByName("btn_sub");
            this._Button_sub.addTouchEventListener(function(sender, type) {
                if (type === ccui.Widget.TOUCH_ENDED) {
                    if (this._zhuIdx === 1) {
                        this._zhuIdx = 11;
                    }
                    if (this._zhuIdx > 1) {
                        this._zhuIdx--;
                        this._ZhuNum.setString(this._zhuIdx);
                        this._Button_add.setTouchEnabled(true);
                        this._Button_add.setBright(true);
                        this.setRoomCardModeFree();
                    }
                }
            }, this);
            this._Button_add = bgNode.getParent().getChildByName("btn_add");
            this._Button_add.addTouchEventListener(function(sender, type) {
                if (type === ccui.Widget.TOUCH_ENDED) {

                    if (this._zhuIdx === 10) {
                        this._zhuIdx = 0;
                    }
                    if (this._zhuIdx < 10) {
                        this._zhuIdx++;
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
        var _currentCount;
        if (isClub) {
            if (this.getBoolItem("convertible", false))
                _currentCount = 3;
            else
                _currentCount = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        }
        else
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tongShanHuangHuang_count, 0);
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);


        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tongShanHuangHuang_tuoguan, 0);
        var timeArr = [0, 60, 120, 180, 300];
        var idx = timeArr.indexOf(_trustTime);
        this._playNode_player_tuoguan_radio.selectItem(idx);
        this.radioBoxSelectCB(idx, this.tuoguanNodeList[idx], this.tuoguanNodeList);


        var _jiangId;
        if(isClub)
            _jiangId = this.getNumberItem("jiangId", 0);
        else
            _jiangId = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tongShanHuangHuang_jiangId, 0);
        this._playNode_jiangId_radio.selectItem(_jiangId);
        this.radioBoxSelectCB(_jiangId, this.jiangIdList[_jiangId], this.jiangIdList);


        var _jianZiHuQG;
        if (isClub)
            _jianZiHuQG = this.getBoolItem("jianZiHuQG", true);
        else
            _jianZiHuQG = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tongShanHuangHuang_jianZiHuQG, true);
        this._playNode_jianZiHuQG.setSelected(_jianZiHuQG);
        this.selectedCB(this._playNode_jianZiHuQG.getChildByName("text"), _jianZiHuQG);


        var _gangKaiJYF;
        if (isClub)
            _gangKaiJYF = this.getBoolItem("gangKaiJiaYiFan", true);
        else
            _gangKaiJYF = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tongShanHuangHuang_gangKaiJYF, true);
        this._playNode_gangKaiJYF.setSelected(_gangKaiJYF);
        this.selectedCB(this._playNode_gangKaiJYF.getChildByName("text"), _gangKaiJYF);

        var _fengDingId;
        if(isClub)
            _fengDingId = this.getNumberItem("fengDingId", 0);
        else
            _fengDingId = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tongShanHuangHuang_fengDingId, 0);
        this._playNode_fengDing_radio.selectItem(_fengDingId);
        this.radioBoxSelectCB(_fengDingId, this.fengDingList[_fengDingId], this.fengDingList);


        //积分底分
        var _diFen;
        if (isClub)
            _diFen = this.getNumberItem("difen", 1);
        else
            _diFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tongShanHuangHuang_diFen, 1);
        if (this._ZhuNum){
            this._ZhuNum.setString(_diFen);
        }
        this.changePayForPlayerNum();
    },

    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.TONG_SHAN_HH_MJ;
        para.maxPlayer = [4, 3, 2, 4][this._playNode_player_count_radio.getSelectIndex()];
        para.trustTime = [0, 60, 120, 180, 300][this._playNode_player_tuoguan_radio.getSelectIndex()];
        para.convertible = this._playNode_ziyou.isSelected();
        para.jiangId = this._playNode_jiangId_radio.getSelectIndex();
        para.jianZiHuQG = this._playNode_jianZiHuQG.isSelected();
        para.gangKaiJiaYiFan = this._playNode_gangKaiJYF.isSelected();
        para.fengDingId = this._playNode_fengDing_radio.getSelectIndex();
        para.difen = this._zhuIdx;

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_tongShanHuangHuang_count, this._playNode_player_count_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_tongShanHuangHuang_tuoguan, para.trustTime);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_tongShanHuangHuang_jiangId, para.jiangId);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_tongShanHuangHuang_fengDingId, para.fengDingId);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tongShanHuangHuang_jianZiHuQG, para.jianZiHuQG);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tongShanHuangHuang_gangKaiJYF, para.gangKaiJiaYiFan);
        }

        cc.log("tongShanHuangHuang   createara: " + JSON.stringify(para));
        return para;
    }
});