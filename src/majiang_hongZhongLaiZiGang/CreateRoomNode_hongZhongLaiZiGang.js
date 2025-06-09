/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_hongZhongLaiZiGang = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_HONGZHONGLAIZIGANG_tuoguan                   = "_HONGZHONGLAIZIGANG_HUBEI_tuoguan";                //托管
        this.localStorageKey.KEY_HONGZHONGLAIZIGANG_fanshu                   = "_HONGZHONGLAIZIGANG_HUBEI_FUSHU";           //庄加番
        this.localStorageKey.KEY_HONGZHONGLAIZIGANG_difen 		            = "_HONGZHONGLAIZIGANG_HUBEI_DI_FEN";                 //底分
        this.localStorageKey.KEY_HONGZHONGLAIZIGANG_count                     = "_HONGZHONGLAIZIGANG_HUBEI_COUNT";
        this.localStorageKey.KEY_HONGZHONGLAIZIGANG_playType                   = "_HONGZHONGLAIZIGANG_HUBEI_PLAYTYPE";        //玩法
        this.localStorageKey.KEY_HONGZHONGLAIZIGANG_bukaikou                   = "_HONGZHONGLAIZIGANG_HUBEI_BUKAIKOU";
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();
        //if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) this._costName = '房卡';
        this.bgNode = ccs.load("bg_hongZhongLaiZiGang.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_hongZhongLaiZiGang").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_hongZhongLaiZiGang");
    },
    initPlayNode: function() {
        var _play = this.bg_node.getChildByName("play");

        //人数
        this._playNode_maxPlayer0 = _play.getChildByName("play_count0");
        this._playNode_maxPlayer1 = _play.getChildByName("play_count1");
        this._playNode_maxPlayer2 = _play.getChildByName("play_count2");
        this._playNode_maxPlayer3 = _play.getChildByName("play_count3");
        var nodeCountList1 = [];
        nodeCountList1.push(_play.getChildByName("play_count0"));
        nodeCountList1.push(_play.getChildByName("play_count1"));
        nodeCountList1.push(_play.getChildByName("play_count2"));
        nodeCountList1.push(_play.getChildByName("play_count3"));
        this.initPlayNumNode(nodeCountList1, [4, 3, 2, 4]);
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(nodeCountList1, function(index) {
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeCountList1[index], nodeCountList1);
        }.bind(this));
        this.addListenerText(nodeCountList1, this._playNode_player_count_radio, this.changePayForPlayerNum.bind(this));
        this._countlist = nodeCountList1;

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

        // 番数
        this._playNode_qiHu3Fan = _play.getChildByName("qiHu3Fan");
        this._playNode_qiHu4Fan = _play.getChildByName("qiHu4Fan");
        this._playNode_qiHu5Fan = _play.getChildByName("qiHu5Fan");
        this._playNode_buXianFan = _play.getChildByName("buXianFan");
        var fanShuNodeList = [];
        fanShuNodeList.push(_play.getChildByName("qiHu3Fan"));
        fanShuNodeList.push(_play.getChildByName("qiHu4Fan"));
        fanShuNodeList.push(_play.getChildByName("qiHu5Fan"));
        fanShuNodeList.push(_play.getChildByName("buXianFan"));
        this._playNode_fan_shu_radio = createRadioBoxForCheckBoxs(fanShuNodeList, this.radioBoxSelectCB);
        this.addListenerText(fanShuNodeList, this._playNode_fan_shu_radio);
        this.fanShuNodeList = fanShuNodeList;

        // 玩法
        this._playNode_buDaiFaCaiBaiBan = _play.getChildByName("play_buDaiFaCaiBaiBan");
        this._playNode_daiFaCaiBaiBan = _play.getChildByName("play_daiFaCaiBaiBan");
        var playTypeNodeList = [];
        playTypeNodeList.push(_play.getChildByName("play_buDaiFaCaiBaiBan"));
        playTypeNodeList.push(_play.getChildByName("play_daiFaCaiBaiBan"));
        this._playNode_play_type_radio = createRadioBoxForCheckBoxs(playTypeNodeList, this.radioBoxSelectCB);
        this.addListenerText(playTypeNodeList, this._playNode_play_type_radio);
        this.playTypeNodeList = playTypeNodeList;

        this._play_buKaiKouKeHu = _play.getChildByName("play_buKaiKouKeHu");
        this.addListenerText(this._play_buKaiKouKeHu);
        this._play_buKaiKouKeHu.addEventListener(this.clickCB, this._play_buKaiKouKeHu);

        // 底分
        this.diFenArr = [1,2,5,10];
        this._zhuIdx = 1;
        this._ZhuNum = this.bg_node.getParent().getChildByName("txt_fen");
        //wj UI显示问题
        this._ZhuNum.setLocalZOrder(1);
        this.bg_node.getParent().getChildByName("text_difen").x -= 40;
        this.bg_node.getParent().getChildByName("txt_fen").x -= 75;
        this.bg_node.getParent().getChildByName("btn_sub").x -= 75;
        this.bg_node.getParent().getChildByName("Image_3").x -= 75;
        this.bg_node.getParent().getChildByName("btn_add").x -= 75;
        
        if (this._ZhuNum) {
            this._ZhuNum.setString(this._zhuIdx);
            this._Button_sub = this.bg_node.getParent().getChildByName("btn_sub");
            this._Button_sub.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (this._zhuIdx <= 0) {
                        return;
                    }
                    this._zhuIdx--;
                    this._ZhuNum.setString(this.diFenArr[this._zhuIdx]);
                    this._Button_add.setTouchEnabled(true);
                    this._Button_add.setBright(true);
                    this.setRoomCardModeFree();
                }
            }, this);
            this._Button_add = this.bg_node.getParent().getChildByName("btn_add");
            this._Button_add.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (this._zhuIdx >= (this.diFenArr.length - 1)) {
                        return
                    }
                    this._zhuIdx++;
                    this._ZhuNum.setString(this.diFenArr[this._zhuIdx]);
                    this._Button_sub.setTouchEnabled(true);
                    this._Button_sub.setBright(true);
                    this.setRoomCardModeFree();
                }
            }, this);
        }
    },
    setPlayNodeCurrentSelect: function(isClub) {
        //人数
        var _currentCount;
        if (isClub) {
            if (this.getBoolItem("convertible", false))
                _currentCount = 3;
            else
                _currentCount = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        }
        else
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HONGZHONGLAIZIGANG_count, 0);
        cc.log("_currentCount renshu  == " + _currentCount)
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);

        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HONGZHONGLAIZIGANG_tuoguan, 0);
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

        //番数
        var fanShu;
        if (isClub)
            fanShu = this.getNumberItem("qiHuFan", 3);
        else
            fanShu = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HONGZHONGLAIZIGANG_fanshu, 3);
        this._playNode_qiHu3Fan.setSelected(false);
        this._playNode_qiHu4Fan.setSelected(false);
        this._playNode_qiHu5Fan.setSelected(false);
        this._playNode_buXianFan.setSelected(false);
        var index = 0;
        if (fanShu == 0) {
            this._playNode_buXianFan.setSelected(true);
            index = 3;
        } else if (fanShu == 3) {
            this._playNode_qiHu3Fan.setSelected(true);
            index = 0;
        } else if (fanShu == 4) {
            this._playNode_qiHu4Fan.setSelected(true);
            index = 1;
        } else if (fanShu == 5) {
            this._playNode_qiHu5Fan.setSelected(true);
            index = 2;
        }
        this.radioBoxSelectCB(index, this.fanShuNodeList[index], this.fanShuNodeList);

        //玩法
        var playType;
        if (isClub)
            playType = this.getNumberItem("playType", 1);
        else
            playType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HONGZHONGLAIZIGANG_playType, 1);
        this._playNode_buDaiFaCaiBaiBan.setSelected(false);
        this._playNode_daiFaCaiBaiBan.setSelected(false);
        if (playType == 0) {
            this._playNode_buDaiFaCaiBaiBan.setSelected(true);
        } else if (playType == 1) {
            this._playNode_daiFaCaiBaiBan.setSelected(true);
        }
        this.radioBoxSelectCB(index, this.playTypeNodeList[playType], this.playTypeNodeList);

        //不开口可胡
        var buKaiKouKeHu;
        if (isClub)
            buKaiKouKeHu = this.getNumberItem("buKaiKouKeHu", 0);
        else
            buKaiKouKeHu = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HONGZHONGLAIZIGANG_bukaikou, 0);
        this._play_buKaiKouKeHu.setSelected(buKaiKouKeHu == 1 ? true : false);
        var text = this._play_buKaiKouKeHu.getChildByName("text");
        this.selectedCB(text, buKaiKouKeHu);

        // 底分
        if (isClub)
            this._zhuIdx = this.getNumberItem("difen", 0);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HONGZHONGLAIZIGANG_difen, 0);
        if (this._ZhuNum)
            this._ZhuNum.setString(this.diFenArr[this._zhuIdx]);
    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG;
        para.maxPlayer = 4;
        para.difen = this.diFenArr[this._zhuIdx];
        para.convertible = false; // 是否自由人数
        para.trustTime = 0; // 托管
        para.buKaiKou = this._play_buKaiKouKeHu.isSelected() ? 1 : 0;

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

        //番数
        if (this._playNode_qiHu3Fan.isSelected()) {
            para.qiHuFan = 3;
        } else if (this._playNode_qiHu4Fan.isSelected()) {
            para.qiHuFan = 4;
        } else if (this._playNode_qiHu5Fan.isSelected()) {
            para.qiHuFan = 5;
        } else if (this._playNode_buXianFan.isSelected()) {
            para.qiHuFan = 0;
        }

        //玩法
        if (this._playNode_buDaiFaCaiBaiBan.isSelected()) {
            para.playType = 0;
        } else if (this._playNode_daiFaCaiBaiBan.isSelected()) {
            para.playType = 1;
        }

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HONGZHONGLAIZIGANG_count, _countIdx);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HONGZHONGLAIZIGANG_tuoguan, para.trustTime);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HONGZHONGLAIZIGANG_difen, this._zhuIdx);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HONGZHONGLAIZIGANG_fanshu, para.qiHuFan);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HONGZHONGLAIZIGANG_playType, para.playType);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HONGZHONGLAIZIGANG_bukaikou, para.buKaiKou);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});