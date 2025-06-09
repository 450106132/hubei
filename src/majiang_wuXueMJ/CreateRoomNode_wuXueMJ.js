var CreateRoomNode_wuXueMJ = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_wuXueMJ_count        = "_wuXueMJ_COUNT"; 				//人数
        this.localStorageKey.KEY_wuXueMJ_tuoguan      = "_wuXueMJ_TUO_GUAN";
        this.localStorageKey.KEY_wuXueMJ_menqing      = "_wuXueMJ_MEN_QING";
        this.localStorageKey.KEY_wuXueMJ_genpi        = "_wuXueMJ_GEN_PI";
        this.localStorageKey.KEY_wuXueMJ_buyaowan     = "_wuXueMJ_BU_YAO_WAN";
        this.localStorageKey.KEY_wuXueMJ_piaoId       = "_wuXueMJ_PIAO_ID";
        this.localStorageKey.KEY_wuXueMJ_jindingId    = "_wuXueMJ_JINDING_ID";
        this.localStorageKey.KEY_wuXueMJ_piaoFen      = "_wuXueMJ_PIAO_FEN";
        this.localStorageKey.KEY_wuXueMJ_diFen        = "_wuXueMJ_DI_FEN";
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard) this.setKey();
        this.bgNode = ccs.load("bg_wuXueMJ.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_wuXueMJ").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_wuXueMJ");
    },
    initPlayNode: function() {
        var bgNode = this.bg_node;
        var _play = bgNode.getChildByName("play");
        this._playNode_4ren = _play.getChildByName("play_4ren");
        this._playNode_3ren = _play.getChildByName("play_3ren");
        this._playNode_2ren = _play.getChildByName("play_2ren");
        this._playNode_ziyou = _play.getChildByName("play_ziyou");
        // 由于自由人数选3人时，未选择金鼎选项导致后台数据错误，所以屏蔽自由人数
        this._playNode_ziyou.setVisible(false);
        var playerNumList = [this._playNode_4ren, this._playNode_3ren, this._playNode_2ren, this._playNode_ziyou];
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(playerNumList, function(index){
            this.changePayForPlayerNum(index);
            this.specialJinDingShow([4, 3, 2, 4][index]);
            this.specialBuYaoWanShow([4, 3, 2, 4][index]);
            this.radioBoxSelectCB(index, playerNumList[index], playerNumList);
        }.bind(this));
        this.addListenerText(playerNumList, this._playNode_player_count_radio, function (index) {
            this.changePayForPlayerNum(index);
            this.specialJinDingShow([4, 3, 2, 4][index]);
            this.specialBuYaoWanShow([4, 3, 2, 4][index]);
            this.radioBoxSelectCB(index, playerNumList[index], playerNumList);
        }.bind(this));
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

        this._playNode_menqing = _play.getChildByName("play_menqing");
        this.addListenerText(this._playNode_menqing);
        this._playNode_menqing.addEventListener(this.clickCB, this._playNode_menqing);

        this._playNode_genpi = _play.getChildByName("play_genpi");
        this.addListenerText(this._playNode_genpi);
        this._playNode_genpi.addEventListener(this.clickCB, this._playNode_genpi);

        this._playNode_buyaowan = _play.getChildByName("play_buyaowan");
        this.addListenerText(this._playNode_buyaowan);
        this._playNode_buyaowan.addEventListener(this.clickCB, this._playNode_buyaowan);

        this._playNode_bupiao = _play.getChildByName("bupiao");
        this._playNode_piao1 = _play.getChildByName("piao1");
        this._playNode_piao5 = _play.getChildByName("piao5");
        this._playNode_piao10 = _play.getChildByName("piao10");
        this._playNode_piaoNum = _play.getChildByName("piaoNum");
        var piaoIdList = [this._playNode_bupiao, this._playNode_piao1, this._playNode_piao5, this._playNode_piao10, this._playNode_piaoNum];
        this._playNode_piaoId_radio = createRadioBoxForCheckBoxs(piaoIdList, (index) => {
            this.radioBoxSelectCB(index, piaoIdList[index], piaoIdList);
            this.specialPiaoFenSelect(index);
        });
        this.addListenerText(piaoIdList, this._playNode_piaoId_radio, (index) => {
            this.specialPiaoFenSelect(index);
        });
        this.piaoIdList = piaoIdList;


        var bg_piaoNum = this._playNode_piaoNum.getChildByName("bg_piaoNum");
        var editBox_piao = new cc.EditBox(cc.size(bg_piaoNum.width*1.5, bg_piaoNum.height*1.2), new cc.Sprite());
        editBox_piao.setPlaceHolder("1-100");
        editBox_piao.setMaxLength(3);
        editBox_piao.setFontSize(22);
        editBox_piao.setFontColor(cc.color(0, 0, 0));
        editBox_piao.setPlaceholderFontColor(cc.color(0, 0, 0));
        editBox_piao.setAnchorPoint(cc.p(0, 0.5));
        editBox_piao.setPosition(cc.p(0, bg_piaoNum.height/2));
        editBox_piao.setColor(cc.color(0, 0, 0));
        editBox_piao.setDelegate(this);
        bg_piaoNum.addChild(editBox_piao);
        this.editBox_piao = editBox_piao;

        this._text_jinDing = _play.getChildByName("text_jinding");
        this._playNode_jinding = _play.getChildByName("play_jinding");
        this._playNode_xiaojinding = _play.getChildByName("play_xiaojinding");
        this._lineNode = bgNode.getChildByName("line5");
        this.jinDingNodeList = [this._text_jinDing, this._playNode_jinding, this._playNode_xiaojinding, this._lineNode];
        this.jinDingList = [this._playNode_jinding, this._playNode_xiaojinding];
        this._playNode_jinding_radio = createRadioBoxForCheckBoxs(this.jinDingList, this.radioBoxSelectCB);
        this.addListenerText(this.jinDingList, this._playNode_jinding_radio);

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

    editBoxEditingDidBegin: function (editBox) {
        this._playNode_piaoId_radio.selectItem(4);
        this.radioBoxSelectCB(4, this.piaoIdList[4], this.piaoIdList);
        editBox.setString(1);
    },
    editBoxEditingDidEnd: function (editBox) {
        var string = editBox.getString();
        var patrn = /^(1|([1-9]\d{0,1})|100)$/;
        if(patrn.test(string)){
            this.piaoTextNum = string;
        }else{
            this.piaoTextNum = 1;
            editBox.setString(this.piaoTextNum);
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
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_wuXueMJ_count, 0);
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);
        this.specialJinDingShow([4, 3, 2, 4][_currentCount]);
        this.specialBuYaoWanShow([4, 3, 2, 4][_currentCount]);

        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_wuXueMJ_tuoguan, 0);
        var timeArr = [0, 60, 120, 180, 300];
        var idx = timeArr.indexOf(_trustTime);
        this._playNode_player_tuoguan_radio.selectItem(idx);
        this.radioBoxSelectCB(idx, this.tuoguanNodeList[idx], this.tuoguanNodeList);

        var _menqing;
        if (isClub)
            _menqing = this.getBoolItem("menqing", false);
        else
            _menqing = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_wuXueMJ_menqing, false);
        this._playNode_menqing.setSelected(_menqing);
        this.selectedCB(this._playNode_menqing.getChildByName("text"), _menqing);


        var _genpi;
        if (isClub)
            _genpi = this.getBoolItem("genpi", false);
        else
            _genpi = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_wuXueMJ_genpi, false);
        this._playNode_genpi.setSelected(_genpi);
        this.selectedCB(this._playNode_genpi.getChildByName("text"), _genpi);

        var _buyaowan;
        if (isClub)
            _buyaowan = this.getBoolItem("buyaowan", false);
        else
            _buyaowan = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_wuXueMJ_buyaowan, false);
        this._playNode_buyaowan.setSelected(_buyaowan);
        this.selectedCB(this._playNode_buyaowan.getChildByName("text"), _buyaowan);


        var _piaoId;
        if(isClub)
            _piaoId = this.getNumberItem("piaoId", 0);
        else
            _piaoId = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_wuXueMJ_piaoId, 0);
        this._playNode_piaoId_radio.selectItem(_piaoId);
        this.radioBoxSelectCB(_piaoId, this.piaoIdList[_piaoId], this.piaoIdList);


        var _piaoFen;
        if(isClub)
            _piaoFen = this.getNumberItem("piaoFen", 1);
        else
            _piaoFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_wuXueMJ_piaoFen, 1);
        this._piaoFen = _piaoFen;
        if(_piaoId === 4) {
            this.piaoTextNum = _piaoFen;
            this.editBox_piao.setString(_piaoFen.toString());
        }else{
            this.editBox_piao.setString("1-100");
        }

        var _jindingId;
        if(isClub)
            _jindingId = this.getNumberItem("jindingId", 0);
        else
            _jindingId = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_wuXueMJ_jindingId, 0);
        _jindingId = _jindingId === -1 ? 0 : _jindingId;
        this._playNode_jinding_radio.selectItem(_jindingId);
        this.radioBoxSelectCB(_jindingId, this.jinDingList[_jindingId], this.jinDingList);


        //积分底分
        var _diFen;
        if (isClub)
            _diFen = this.getNumberItem("difen", 1);
        else
            _diFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_wuXueMJ_diFen, 1);
        if (this._ZhuNum){
            this._ZhuNum.setString(_diFen);
        }
        this.changePayForPlayerNum();
    },

    specialPiaoFenSelect: function (index) {
        index = Number(index);
        if(index === 4) {
            this.editBox_piao.setString(this._piaoFen);
        }else{
            this.editBox_piao.setString("1-100");
        }
    },

    specialJinDingShow: function (playerCount) {
        if(!this.jinDingNodeList) return;
        for(var i = 0; i < this.jinDingNodeList.length; i ++) {
            this.jinDingNodeList[i].visible = Number(playerCount) === 3;
        }
    },

    specialBuYaoWanShow: function (playerCount) {
        if(!this._playNode_buyaowan) return;
        this._playNode_buyaowan.visible = Number(playerCount) !== 4;
    },

    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.WU_XUE_MJ;
        para.maxPlayer = [4, 3, 2, 4][this._playNode_player_count_radio.getSelectIndex()];
        para.trustTime = [0, 60, 120, 180, 300][this._playNode_player_tuoguan_radio.getSelectIndex()];
        para.convertible = this._playNode_ziyou.isSelected();
        para.menqing = this._playNode_menqing.isSelected();
        para.genpi = this._playNode_genpi.isSelected();
        para.piaoId = this._playNode_piaoId_radio.getSelectIndex();
        para.jindingId = this._playNode_jinding_radio.getSelectIndex();
        para.buyaowan = this._playNode_buyaowan.isSelected();
        para.difen = this._zhuIdx;
        para.piaoFen = 0;
        if(para.piaoId === 4) para.piaoFen = this.piaoTextNum;
        if(para.maxPlayer === 4) para.buyaowan = false;
        if(para.maxPlayer === 4 || para.maxPlayer === 2) para.jindingId = -1;

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_wuXueMJ_count, this._playNode_player_count_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_wuXueMJ_tuoguan, para.trustTime);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_wuXueMJ_piaoId, para.piaoId);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_wuXueMJ_jindingId, para.jindingId);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_wuXueMJ_piaoFen, para.piaoFen);

            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_wuXueMJ_menqing, para.menqing);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_wuXueMJ_genpi, para.genpi);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_wuXueMJ_buyaowan, para.buyaowan);
        }

        cc.log("wuXueMJ   createara: " + JSON.stringify(para));
        return para;
    }
});