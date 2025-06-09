var CreateRoomNode_yiChangXueLiu = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_yiChangXueLiu_count        = "_yiChangXueLiu_COUNT"; 				//人数
        this.localStorageKey.KEY_yiChangXueLiu_dingPiao   = "_yiChangXueLiu_DINGPIAO_ID";         //定漂
        this.localStorageKey.KEY_yiChangXueLiu_huanSanZhang = "_yiChangXueLiu_HUANSANZHANG";        //玩法：换三张
        this.localStorageKey.KEY_yiChangXueLiu_puSanZhang   = "_yiChangXueLiu_PUSANZHANG"; 		    //玩法：扑三张
        this.localStorageKey.KEY_yiChangXueLiu_tuoguan      = "_yiChangXueLiu_TUO_GUAN";
        this.localStorageKey.KEY_yiChangXueLiu_difen        = "_yiChangXueLiu_DI_FEN";
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard) this.setKey();
        this.bgNode = ccs.load("bg_yiChangXueLiu.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_yiChangXueLiu").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_yiChangXueLiu");
    },
    initPlayNode: function() {
        var bgNode = this.bg_node;
        var _play = bgNode.getChildByName("play");

        this._playNode_4ren = _play.getChildByName("play_4ren");
        this._playNode_3ren = _play.getChildByName("play_3ren");
        this._playNode_ziyou = _play.getChildByName("play_ziyou");
        var playerNumList = [this._playNode_4ren, this._playNode_3ren, this._playNode_ziyou];
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(playerNumList, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, playerNumList[index], playerNumList);
        }.bind(this));
        this.addListenerText(playerNumList, this._playNode_player_count_radio, this.changePayForPlayerNum.bind(this));
        this._countlist = playerNumList;
        this.initPlayNumNode(playerNumList, [4, 3, 4]);


        this._playNode_dingpiao_0 = _play.getChildByName("budaipiao");
        this._playNode_dingpiao_1 = _play.getChildByName("dai1piao");
        this._playNode_dingpiao_2 = _play.getChildByName("dai2piao");
        this._playNode_dingpiao_3 = _play.getChildByName("dai3piao");
        this._playNode_dingpiao_5 = _play.getChildByName("dai5piao");
        var dingpiaoList = [this._playNode_dingpiao_0, this._playNode_dingpiao_1, this._playNode_dingpiao_2, this._playNode_dingpiao_3, this._playNode_dingpiao_5];
        this._playNode_dingpiao_radio = createRadioBoxForCheckBoxs(dingpiaoList, this.radioBoxSelectCB);
        this.addListenerText(dingpiaoList, this._playNode_dingpiao_radio);
        this.dingpiaoList = dingpiaoList;

        // 换3张默认选中
        this._playNode_huan3zhang = _play.getChildByName("play_huan3zhang");
        this.addListenerText(this._playNode_huan3zhang);
        this._playNode_huan3zhang.addEventListener(this.clickCB, this._playNode_huan3zhang);

        this._playNode_pu3zhang = _play.getChildByName("play_pu3zhang");
        this.addListenerText(this._playNode_pu3zhang);
        this._playNode_pu3zhang.addEventListener(this.clickCB, this._playNode_pu3zhang);

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
        // 人数
        var _currentCount;
        if (isClub) {
            if (this.getBoolItem("convertible", false))
                _currentCount = 2;
            else
                _currentCount = [4, 3].indexOf(this.getNumberItem("maxPlayer", 4));
        }
        else
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_yiChangXueLiu_count, 0);
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);


        var _dingpiao;
        if(isClub)
            _dingpiao = this.getNumberItem("dingPiao", 0);
        else
            _dingpiao = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_yiChangXueLiu_dingPiao, 0);

        var idx = [0, 1, 2, 3, 5].indexOf(_dingpiao);
        this._playNode_dingpiao_radio.selectItem(idx);
        this.radioBoxSelectCB(idx, this.dingpiaoList[idx], this.dingpiaoList);


        var _huan3zhang;
        if (isClub)
            _huan3zhang = this.getBoolItem("huan3zhang", true);
        else
            _huan3zhang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_yiChangXueLiu_huanSanZhang, true);
        this._playNode_huan3zhang.setSelected(_huan3zhang);
        this.selectedCB(this._playNode_huan3zhang.getChildByName("text"), _huan3zhang);


        var _pu3zhang;
        if (isClub)
            _pu3zhang = this.getBoolItem("pu3zhang", false);
        else
            _pu3zhang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_yiChangXueLiu_puSanZhang, false);
        this._playNode_pu3zhang.setSelected(_pu3zhang);
        this.selectedCB(this._playNode_pu3zhang.getChildByName("text"), _pu3zhang);


        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_yiChangXueLiu_tuoguan, 0);
        var timeArr = [0, 60, 120, 180, 300];
        var idx = timeArr.indexOf(_trustTime);
        this._playNode_player_tuoguan_radio.selectItem(idx);
        this.radioBoxSelectCB(idx, this.tuoguanNodeList[idx], this.tuoguanNodeList);


        //积分底分
        var _diFen;
        if (isClub)
            _diFen = this.getNumberItem("diFen", 1);
        else
            _diFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_yiChangXueLiu_difen, 1);
        if (this._ZhuNum){
            this._ZhuNum.setString(_diFen);
        }
        this.changePayForPlayerNum();
    },

    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ;
        para.maxPlayer = [4, 3, 4][this._playNode_player_count_radio.getSelectIndex()];
        para.dingPiao = [0, 1, 2, 3, 5][this._playNode_dingpiao_radio.getSelectIndex()];
        para.huan3zhang = this._playNode_huan3zhang.isSelected();
        para.pu3zhang = this._playNode_pu3zhang.isSelected();
        para.convertible = this._playNode_ziyou.isSelected();
        para.trustTime = [0, 60, 120, 180, 300][this._playNode_player_tuoguan_radio.getSelectIndex()];
        para.diFen = this._zhuIdx;

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_yiChangXueLiu_count, this._playNode_player_count_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_yiChangXueLiu_dingPiao, para.dingPiao);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_yiChangXueLiu_tuoguan, para.trustTime);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_yiChangXueLiu_difen, para.diFen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_yiChangXueLiu_huanSanZhang, para.huan3zhang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_yiChangXueLiu_puSanZhang, para.pu3zhang);
        }
        cc.log("yiChangXueLiu   createara: " + JSON.stringify(para));
        return para;
    }
});