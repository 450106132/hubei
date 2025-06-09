/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_jingshan = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_JINGSHAN_playType                 = "_JINGSHAN_HUBEI_playType";            //各摸各胡
        this.localStorageKey.KEY_JINGSHAN_piaoFen              = "_JINGSHAN_HUBEI_piaoFen";          //油中油
        this.localStorageKey.KEY_JINGSHAN_tuoguan                   = "_JINGSHAN_HUBEI_tuoguan";                //托管
        this.localStorageKey.KEY_JINGSHAN_isOpenTingTip             = "_JINGSHAN_HUBEI_isOpenTingTip";          //是否开启听牌提示
        this.localStorageKey.KEY_JINGSHAN_count                     = "_JINGSHAN_HUBEI_COUNT";                  //有赖子可抢杠
        this.localStorageKey.KEY_JINGSHAN_difen 		            = "_JINGSHAN_HUBEI_DI_FEN";                 //底分
        this.localStorageKey.KEY_JINGSHAN_qufeng                     = "_JINGSHAN_HUBEI_qufen";                 //底分


    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();
        //if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) this._costName = '房卡';
        this.bgNode = ccs.load("bg_jingshan.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_jingshan").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_jingshan");
    },
    initPlayNode: function() {
        var _bgYJLYNode = this.bg_node;
        var _play = _bgYJLYNode.getChildByName("play");

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

        //玩法的类型
        this._playNode_playType0 = _play.getChildByName("play_bangandengyan");
        this._playNode_playType1 = _play.getChildByName("play_duolai");
        this._playNode_playType2 = _play.getChildByName("play_gandengyan");
        var nodeList1 = [];
        nodeList1.push(this._playNode_playType0);
        nodeList1.push(this._playNode_playType1);
        nodeList1.push(this._playNode_playType2);
        this._playNode_playtype_radio = createRadioBoxForCheckBoxs(nodeList1, this.radioBoxSelectCB);
        this.addListenerText(nodeList1, this._playNode_playtype_radio);
        this.playTypeList = nodeList1;

        // 飘分
        this._playNode_piaofen2 = _play.getChildByName("play_piaofen0");
        this._playNode_piaofen4 = _play.getChildByName("play_piaofen1");
        this._playNode_piaofen6 = _play.getChildByName("play_piaofen2");
        this._playNode_piaofen_free = _play.getChildByName("play_piaofen3");
        this._playNode_bupiao = _play.getChildByName("play_piaofen4");
        var piaoFenList = [];
        piaoFenList.push(this._playNode_piaofen2);
        piaoFenList.push(this._playNode_piaofen4);
        piaoFenList.push(this._playNode_piaofen6);
        piaoFenList.push(this._playNode_piaofen_free);
        piaoFenList.push(this._playNode_bupiao);
        this._playNode_piaoFen_radio = createRadioBoxForCheckBoxs(piaoFenList, this.radioBoxSelectCB);
        this.addListenerText(piaoFenList, this._playNode_piaoFen_radio);
        this.piaoFenList = piaoFenList;

        // 
        this._playNode_qufeng0 = _play.getChildByName("play_buqufen");
        this._playNode_qufeng1 = _play.getChildByName("play_qufen");
        var qufengList = [];
        qufengList.push(this._playNode_qufeng0);
        qufengList.push(this._playNode_qufeng1);
        this._playNode_qufeng_radio = createRadioBoxForCheckBoxs(qufengList, this.radioBoxSelectCB);
        this.addListenerText(qufengList, this._playNode_qufeng_radio);
        this.qufengList = qufengList;

        this._playNode_maxPlayer2.schedule(function(){
            if (this._playNode_maxPlayer2.isSelected()) {
                this._playNode_qufeng0.visible = true;
                this._playNode_qufeng1.visible = true;
            }else{
                this._playNode_qufeng0.visible = false;
                this._playNode_qufeng1.visible = false;
            }
        }.bind(this));

        // 飘分
        this._playNode_difen1 = _play.getChildByName("play_difen0");
        this._playNode_difen2 = _play.getChildByName("play_difen1");
        this._playNode_difen3 = _play.getChildByName("play_difen2");
        this._playNode_difen5  = _play.getChildByName("play_difen3");
        this._playNode_difen10  = _play.getChildByName("play_difen4");
        this._playNode_difen20  = _play.getChildByName("play_difen5");
        var diFenList = [];
        diFenList.push(this._playNode_difen1);
        diFenList.push(this._playNode_difen2);
        diFenList.push(this._playNode_difen3);
        diFenList.push(this._playNode_difen5);
        diFenList.push(this._playNode_difen10);
        diFenList.push(this._playNode_difen20);
        this._playNode_diFen_radio = createRadioBoxForCheckBoxs(diFenList, this.radioBoxSelectCB);
        this.addListenerText(diFenList, this._playNode_diFen_radio);
        this.diFenList = diFenList;


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

        // 听牌提示
        var tingTipList = [];
        tingTipList.push(_play.getChildByName("tingTip1"));
        tingTipList.push(_play.getChildByName("tingTip2"));
        this.tingTipList_radio = createRadioBoxForCheckBoxs(tingTipList, this.radioBoxSelectCB);
        this.addListenerText(tingTipList, this.tingTipList_radio);
        this.tingTipList = tingTipList;
    },
    setPlayNodeCurrentSelect: function(isClub) {
        //人数
        var _currentCount;
        if (isClub) {
            if (this.getBoolItem("convertible", false))
                _currentCount = 3;
            else
                _currentCount = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 3));
        }
        else
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_JINGSHAN_count, 1);
        cc.log("_currentCount renshu  == " + _currentCount)
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);

        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_JINGSHAN_tuoguan, 0);
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


        if (isClub)
            this._zhuIdx = [1,2,3,5,10,20].indexOf(this.getNumberItem("difen", 1));
        else
            this._zhuIdx = [1,2,3,5,10,20].indexOf(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_JINGSHAN_difen, 1));
        this._playNode_diFen_radio.selectItem(this._zhuIdx);
        this.radioBoxSelectCB(this._zhuIdx, this.diFenList[this._zhuIdx], this.diFenList);

        var piaoindex
        if (isClub)
            piaoindex = [2,4,6,10,0].indexOf(this.getNumberItem("piaoFen", 10));
        else
            piaoindex = [2,4,6,10,0].indexOf(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_JINGSHAN_piaoFen, 10));
        cc.log("  piaoindex   ",piaoindex);
        this._playNode_piaoFen_radio.selectItem(piaoindex);
        this.radioBoxSelectCB(piaoindex, this.piaoFenList[piaoindex], this.piaoFenList);

        var playindex
        if (isClub)
            playindex = this.getNumberItem("playType", 0);
        else
            playindex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_JINGSHAN_playType, 0);
        this._playNode_playtype_radio.selectItem(playindex);
        this.radioBoxSelectCB(playindex, this.playTypeList[playindex], this.playTypeList);

        var qufengindex
        if (isClub)
            qufengindex = this.getNumberItem("quFeng", 0);
        else
            qufengindex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_JINGSHAN_qufeng, 0);
        this._playNode_qufeng_radio.selectItem(qufengindex);
        this.radioBoxSelectCB(qufengindex, this.qufengList[qufengindex], this.qufengList);

        var isOpenTingTip;
        if (isClub)
            isOpenTingTip = this.getBoolItem("isOpenTingTip", true);
        else
            isOpenTingTip = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_JINGSHAN_isOpenTingTip, true);
        var tingIndex = isOpenTingTip ? 0 : 1;
        this.tingTipList_radio.selectItem(tingIndex);
        this.radioBoxSelectCB(tingIndex, this.tingTipList[tingIndex], this.tingTipList);

    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ;
        para.maxPlayer = 4;
        para.difen = 1;
        para.convertible = false; // 是否自由人数
        para.trustTime = 0; // 托管
        para.playType = this._playNode_playtype_radio.getSelectIndex(); // 0 : 半干瞪眼  1：平胡多赖  2 ： 全干瞪眼
        para.quFeng = this._playNode_qufeng_radio.getSelectIndex();
        para.difen = [1,2,3,5,10,20][this._playNode_diFen_radio.getSelectIndex()];
        para.piaoFen = [2,4,6,10,0][this._playNode_piaoFen_radio.getSelectIndex()];//10: 自由飘分
        cc.log(" this._playNode_piaoFen_radio.getSelectIndex()     11  ",this._playNode_piaoFen_radio.getSelectIndex());

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
        }
        else if (this._playNode_maxPlayer3.isSelected()) {
            para.maxPlayer = 4;
            para.convertible = true;
            _countIdx = 3;
        }
        if (para.maxPlayer != 2) {
            para.quFeng = 0;
        }

        para.isOpenTingTip = this.tingTipList[0].isSelected();

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_JINGSHAN_playType, para.playType);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_JINGSHAN_piaoFen, para.piaoFen);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_JINGSHAN_count, _countIdx);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_JINGSHAN_tuoguan, para.trustTime);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_JINGSHAN_difen, para.difen);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_JINGSHAN_qufeng, para.quFeng);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_JINGSHAN_isOpenTingTip, para.isOpenTingTip);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});