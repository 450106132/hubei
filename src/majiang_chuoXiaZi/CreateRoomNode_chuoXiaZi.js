
var CreateRoomNode_chuoXiaZi = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_CHUOXIAZI_laitype                      = "_CHUOXIAZI_HUBEI_LAI_WAY";       		 //赖的方式
        this.localStorageKey.KEY_CHUOXIAZI_jinpenggang                  = "_CHUOXIAZI_HUBEI_jin_peng_gang";          //末3张禁碰杠
        this.localStorageKey.KEY_CHUOXIAZI_youzhongyou                  = "_CHUOXIAZI_HUBEI_YOU_ZHONG_YOU";          //油中油
        this.localStorageKey.KEY_CHUOXIAZI_tuoguan                      = "_CHUOXIAZI_HUBEI_tuoguan";                //托管

            //缺一门
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();
        //if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) this._costName = '房卡';
        this.bgNode = ccs.load("bg_chuoXiaZi.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_chuoXiaZi").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_chuoXiaZi");
    },
    initPlayNode: function() {
        var _bgYJLYNode = this.bg_node;
        var _play = _bgYJLYNode.getChildByName("play");

        //人数
        this._playNode_maxPlayer0 = _play.getChildByName("play_count0");
        var nodeCountList1 = [];
        nodeCountList1.push(this._playNode_maxPlayer0);
        this.initPlayNumNode(nodeCountList1, [3]);
        cc.log("==== nodeCountList1 = " + JSON.stringify(nodeCountList1))
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(nodeCountList1, function(index) {
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeCountList1[index], nodeCountList1);
        }.bind(this));
        this.addListenerText(nodeCountList1, this._playNode_player_count_radio, this.changePayForPlayerNum.bind(this));
        this._countlist = nodeCountList1;

        //赖的类型
        this._playNode_wulaidaodi = _play.getChildByName("play_wulaidaodi");
        this._playNode_yilaidaodi = _play.getChildByName("play_yilaidaodi");
        this._playNode_lianglaikehu = _play.getChildByName("play_lianglaikehu");
        this._playNode_banlai = _play.getChildByName("play_banlai");
        var nodeList1 = [];
        nodeList1.push(_play.getChildByName("play_wulaidaodi"));
        nodeList1.push(_play.getChildByName("play_yilaidaodi"));
        nodeList1.push(_play.getChildByName("play_lianglaikehu"));
        nodeList1.push(_play.getChildByName("play_banlai"));
        this._playNode_player_type_radio = createRadioBoxForCheckBoxs(nodeList1, this.radioBoxSelectCB);
        this.addListenerText(nodeList1, this._playNode_player_type_radio);
        this.laiList = nodeList1;

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


        // 末3张禁碰杠
        this._playNode_jinpenggang = _play.getChildByName("play_jinpenggang");
        this.addListenerText(this._playNode_jinpenggang);
        this._playNode_jinpenggang.addEventListener(this.clickCB, this._playNode_jinpenggang);


        // 油中油
        this._playNode_youzhongyou = _play.getChildByName("play_youzhongyou");
        this.addListenerText(this._playNode_youzhongyou);
        this._playNode_youzhongyou.addEventListener(this.clickCB, this._playNode_youzhongyou);
        this._playNode_youzhongyou.schedule(function() {
            this._playNode_youzhongyou.setVisible(this._playNode_yilaidaodi.isSelected() || this._playNode_banlai.isSelected());
        }.bind(this));


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


        // 底分
        this._zhuIdx = 1;
        this._ZhuNum = _bgYJLYNode.getParent().getChildByName("txt_fen");
        if (this._ZhuNum) {
            this._ZhuNum.setString(this._zhuIdx);
            this._Button_sub = _bgYJLYNode.getParent().getChildByName("btn_sub");
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
            this._Button_add = _bgYJLYNode.getParent().getChildByName("btn_add");
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
        var _laiType;
        if (isClub)
            _laiType = this.getNumberItem("laiType", 0);
        else
            _laiType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_CHUOXIAZI_laitype, 1);
        this._playNode_player_type_radio.selectItem(_laiType);
        this.radioBoxSelectCB(_laiType, this.laiList[_laiType], this.laiList);

        // 末3张禁碰杠
        var _jinpenggang;
        if (isClub)
            _jinpenggang = this.getBoolItem("mosanzhangbupenggang", false);
        else
            _jinpenggang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_CHUOXIAZI_jinpenggang, false);
        this._playNode_jinpenggang.setSelected(_jinpenggang);
        var text = this._playNode_jinpenggang.getChildByName("text");
        this.selectedCB(text, _jinpenggang);

        // 油中油
        var _youzhongyou;
        if (isClub)
            _youzhongyou = this.getBoolItem("youzhongyou", false);
        else
            _youzhongyou = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_CHUOXIAZI_youzhongyou, false);
        this._playNode_youzhongyou.setSelected(_youzhongyou);
        var text = this._playNode_youzhongyou.getChildByName("text");
        this.selectedCB(text, _youzhongyou);

        //人数
        var _currentCount;
        if (isClub) {
            _currentCount = [3].indexOf(this.getNumberItem("maxPlayer", 3));
        }
        else
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_CHUOXIAZI_count, 0);
        cc.log("_currentCount renshu  == " + _currentCount)
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);

        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_CHUOXIAZI_tuoguan, 0);
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

        // 底分
        if (isClub)
            this._zhuIdx = this.getNumberItem("difen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_CHUOXIAZI_difen, 1);
        if (this._ZhuNum)
            this._ZhuNum.setString(this._zhuIdx + "");

    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.CHUO_XIA_ZI;
        para.maxPlayer = 3;
        para.difen = this._zhuIdx;
        para.convertible = false; // 是否自由人数
        para.trustTime = 0; // 托管
        para.laiType = 2;

        if (this._playNode_wulaidaodi.isSelected()) {
            para.laiType = 0;
        } else if (this._playNode_yilaidaodi.isSelected()) {
            para.laiType = 1;
        } else if (this._playNode_lianglaikehu.isSelected()) {
            para.laiType = 2;
        } else if (this._playNode_banlai.isSelected()) {
            para.laiType = 3;
        }


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

        para.mosanzhangbupenggang = this._playNode_jinpenggang.isSelected();           // 末3张禁碰杠
        para.youzhongyou = this._playNode_youzhongyou.isSelected();     // 油中油
        if (!this._playNode_yilaidaodi.isSelected() && !this._playNode_banlai.isSelected()) {
            para.youzhongyou = false;
        }

        //人数
        var _countIdx = 0;
        if (this._playNode_maxPlayer0.isSelected()) {
            para.maxPlayer = 3;
            _countIdx = 0;
        }


        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_CHUOXIAZI_laitype, para.laiType);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_CHUOXIAZI_count, _countIdx);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_CHUOXIAZI_jinpenggang, para.mosanzhangbupenggang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_CHUOXIAZI_youzhongyou, para.youzhongyou);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_CHUOXIAZI_tuoguan, para.trustTime);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_CHUOXIAZI_difen, para.difen);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});