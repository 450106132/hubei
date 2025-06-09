var CreateRoomNode_tongCheng = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_tongCheng_count        = "_tongCheng_COUNT"; 				//人数
        this.localStorageKey.KEY_tongCheng_tuoguan      = "_tongCheng_TUO_GUAN";
        this.localStorageKey.KEY_tongCheng_jiangId      = "_tongCheng_JIANG_ID";            //将牌： 0:258做将    1:乱将
        this.localStorageKey.KEY_tongCheng_laizi        = "_tongCheng_LAIZI";
        this.localStorageKey.KEY_tongCheng_zimofanbei   = "_tongCheng_ZIMOFANBEI";
        this.localStorageKey.KEY_tongCheng_queyise      = "_tongCheng_QUEYISE";
        this.localStorageKey.KEY_tongCheng_piaoId       = "_tongCheng_PIAO_ID";
        this.localStorageKey.KEY_tongCheng_piaoFen      = "_tongCheng_PIAO_FEN";
        this.localStorageKey.KEY_tongCheng_diFen        = "_tongCheng_DI_FEN";
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard) this.setKey();
        this.bgNode = ccs.load("bg_tongCheng.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_tongCheng").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_tongCheng");
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

        this._playNode_laizi = _play.getChildByName("play_youlaizi");
        this.addListenerText(this._playNode_laizi);
        this._playNode_laizi.addEventListener(this.clickCB, this._playNode_laizi);

        this._playNode_zimofanbei = _play.getChildByName("play_zimofanbei");
        this.addListenerText(this._playNode_zimofanbei);
        this._playNode_zimofanbei.addEventListener(this.clickCB, this._playNode_zimofanbei);

        this._playNode_queyise = _play.getChildByName("play_queyise");
        this.addListenerText(this._playNode_queyise);
        this._playNode_queyise.addEventListener(this.clickCB, this._playNode_queyise);

        this._playNode_daipiao = _play.getChildByName("daipiao");
        this._playNode_dingpiao = _play.getChildByName("dingpiao");
        this._playNode_taipiao = _play.getChildByName("taipiao");
        this._playNode_zhuipiao = _play.getChildByName("zhuipiao");
        this._playNode_bupiao = _play.getChildByName("bupiao");
        var piaoIdList = [this._playNode_daipiao, this._playNode_dingpiao, this._playNode_taipiao, this._playNode_zhuipiao, this._playNode_bupiao];
        this._playNode_piaoId_radio = createRadioBoxForCheckBoxs(piaoIdList, (index) => {
            this.radioBoxSelectCB(index, piaoIdList[index], piaoIdList);
            this.specialPiaoFenSelect(index);
        });
        this.addListenerText(piaoIdList, this._playNode_piaoId_radio, (index) => {
            this.specialPiaoFenSelect(index);
        });
        this.piaoIdList = piaoIdList;


        this._playNode_piao1 = _play.getChildByName("piao1");
        this._playNode_piao2 = _play.getChildByName("piao2");
        this._playNode_piao3 = _play.getChildByName("piao3");
        var piaoFenList = [this._playNode_piao1, this._playNode_piao2, this._playNode_piao3];
        this._playNode_piaoFen_radio = createRadioBoxForCheckBoxs(piaoFenList, this.radioBoxSelectCB);
        this.addListenerText(piaoFenList, this._playNode_piaoFen_radio);
        this.piaoFenList = piaoFenList;


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
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tongCheng_count, 0);
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);


        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tongCheng_tuoguan, 0);
        var timeArr = [0, 60, 120, 180, 300];
        var idx = timeArr.indexOf(_trustTime);
        this._playNode_player_tuoguan_radio.selectItem(idx);
        this.radioBoxSelectCB(idx, this.tuoguanNodeList[idx], this.tuoguanNodeList);


        var _jiangId;
        if(isClub)
            _jiangId = this.getNumberItem("jiangId", 0);
        else
            _jiangId = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tongCheng_jiangId, 0);
        this._playNode_jiangId_radio.selectItem(_jiangId);
        this.radioBoxSelectCB(_jiangId, this.jiangIdList[_jiangId], this.jiangIdList);


        var _laizi;
        if (isClub)
            _laizi = this.getBoolItem("laizi", true);
        else
            _laizi = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tongCheng_laizi, true);
        this._playNode_laizi.setSelected(_laizi);
        this.selectedCB(this._playNode_laizi.getChildByName("text"), _laizi);


        var _zimofanbei;
        if (isClub)
            _zimofanbei = this.getBoolItem("zimofanbei", false);
        else
            _zimofanbei = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tongCheng_zimofanbei, false);
        this._playNode_zimofanbei.setSelected(_zimofanbei);
        this.selectedCB(this._playNode_zimofanbei.getChildByName("text"), _zimofanbei);


        var _queyise;
        if (isClub)
            _queyise = this.getBoolItem("queyise", false);
        else
            _queyise = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tongCheng_queyise, false);
        this._playNode_queyise.setSelected(_queyise);
        this.selectedCB(this._playNode_queyise.getChildByName("text"), _queyise);


        var _piaoId;
        if(isClub)
            _piaoId = this.getNumberItem("piaoId", 0);
        else
            _piaoId = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tongCheng_piaoId, 0);
        this._playNode_piaoId_radio.selectItem(_piaoId);
        this.radioBoxSelectCB(_piaoId, this.piaoIdList[_piaoId], this.piaoIdList);


        var _piaoFen;
        if(isClub)
            _piaoFen = this.getNumberItem("piaoFen", 0);
        else
            _piaoFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tongCheng_piaoFen, 0);
        _piaoFen = _piaoFen === 0 ? 1 : _piaoFen;
        var idx = [1, 2, 3].indexOf(_piaoFen);
        this._playNode_piaoFen_radio.selectItem(idx);
        this.radioBoxSelectCB(idx, this.piaoFenList[idx], this.piaoFenList);
        this.specialPiaoFenSelect(_piaoId);

        //积分底分
        var _diFen;
        if (isClub)
            _diFen = this.getNumberItem("difen", 1);
        else
            _diFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tongCheng_diFen, 1);
        if (this._ZhuNum){
            this._ZhuNum.setString(_diFen);
        }
        this.changePayForPlayerNum();
    },

    specialPiaoFenSelect: function (index) {
        index = Number(index);
        if(!this._playNode_piaoId_radio || !this._playNode_piaoFen_radio || !this.piaoIdList) return;

        var piaoFenList = this.piaoFenList;

        //选择不漂，追票，抬票时，隐藏飘分列表，选择带漂和定漂，显示飘分选项
        for(var i = 0; i < piaoFenList.length; i ++) {
            piaoFenList[i].setVisible(index === 0 || index === 1);
        }

        //选择【带漂】时，默认选择【漂三分】
        if(index === 0) this._playNode_piaoFen_radio.selectItem(2);

        //选择【定漂】时，默认选择【漂一分】
        if(index === 1) this._playNode_piaoFen_radio.selectItem(0);

        //设置漂分文字颜色
        var selectColor = MjClient.createRoomNode._selectColor;
        var unSelectColor = MjClient.createRoomNode._unSelectColor;
        for(var j = 0; j < piaoFenList.length; j ++) {
            piaoFenList[j].getChildByName("text").setTextColor(piaoFenList[j].isSelected() ? selectColor : unSelectColor);
        }
    },

    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.TONG_CHENG_MJ;
        para.maxPlayer = [4, 3, 2, 4][this._playNode_player_count_radio.getSelectIndex()];
        para.trustTime = [0, 60, 120, 180, 300][this._playNode_player_tuoguan_radio.getSelectIndex()];
        para.convertible = this._playNode_ziyou.isSelected();
        para.jiangId = this._playNode_jiangId_radio.getSelectIndex();
        para.laizi = this._playNode_laizi.isSelected();
        para.zimofanbei = this._playNode_zimofanbei.isSelected();
        para.queyise = this._playNode_queyise.isSelected();
        para.piaoId = this._playNode_piaoId_radio.getSelectIndex();
        para.difen = this._zhuIdx;
        para.piaoFen = 0;
        if(para.piaoId === 0 || para.piaoId === 1) {
            para.piaoFen = [1, 2, 3][this._playNode_piaoFen_radio.getSelectIndex()];
        }

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_tongCheng_count, this._playNode_player_count_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_tongCheng_tuoguan, para.trustTime);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_tongCheng_jiangId, para.jiangId);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_tongCheng_piaoId, para.piaoId);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_tongCheng_piaoFen, para.piaoFen);

            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tongCheng_laizi, para.laizi);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tongCheng_zimofanbei, para.zimofanbei);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tongCheng_queyise, para.queyise);
        }

        cc.log("tongCheng   createara: " + JSON.stringify(para));
        return para;
    }
});