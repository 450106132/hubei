/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_siyanghh = CreateRoomNode.extend({
    initAll: function(IsFriendCard) {
        if (!IsFriendCard) {
            this.localStorageKey.KEY_siyanghh_fennum = "_SI_YANGHH_FEN_NUM"; //分数
            this.localStorageKey.KEY_siyanghh_qGangHu = "_SI_YANGHH_QIANG_GANG_HU"; //抢杠胡
            this.localStorageKey.KEY_siyanghh_tuoguan = "_SI_YANGHH_tuoguan"; //抢杠胡
        }

        this.bg_node = ccs.load("bg_siyanghh.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_siyanghh");
    },
    initPlayNode: function() {
        this._super();
        var _bgSiyangNode = this.bg_node;
        var _play = _bgSiyangNode.getChildByName("play");
        this.fenNode_siyanghh_5 = _play.getChildByName("play_5fen");
        this.fenNode_siyanghh_10 = _play.getChildByName("play_10fen");
        var nodeList = [];
        nodeList.push(_play.getChildByName("play_5fen"));
        nodeList.push(_play.getChildByName("play_10fen"));
        this._playNode_player_fen_radio = createRadioBoxForCheckBoxs(nodeList,this.radioBoxSelectCB);
        this.addListenerText(nodeList, this._playNode_player_fen_radio);
        this.list = nodeList;
        this.fenNode_siyanghh_ganghu = _play.getChildByName("play_qGangHu");
        this.addListenerText(this.fenNode_siyanghh_ganghu);
        this.fenNode_siyanghh_ganghu.addEventListener(this.clickCB, this.fenNode_siyanghh_ganghu);

        this._playNode_tuoguanType_0 = _play.getChildByName("tuoguan0");
        this._playNode_tuoguanType_1 = _play.getChildByName("tuoguan1");
        this._playNode_tuoguanType_2 = _play.getChildByName("tuoguan2");
        this._playNode_tuoguanType_3 = _play.getChildByName("tuoguan3");
        var tuoguanList = [];
        tuoguanList.push(_play.getChildByName("tuoguan0"));
        tuoguanList.push(_play.getChildByName("tuoguan1"));
        tuoguanList.push(_play.getChildByName("tuoguan2"));
        tuoguanList.push(_play.getChildByName("tuoguan3"));
        var self = this;
        this.tuoguanTypeList_radio = createRadioBoxForCheckBoxs(tuoguanList, function(index){
            //self.refreshZhuaNiao();
            self.radioBoxSelectCB(index,tuoguanList[index],tuoguanList);
        });
        this.addListenerText(tuoguanList,this.tuoguanTypeList_radio);
        this.tuoguanList = tuoguanList;

        var btn_tuoguanTip = _play.getChildByName("btn_tuoguanTip");
        var image_tuoguanTip = _play.getChildByName("image_tuoguanTip");
        var text = image_tuoguanTip.getChildByName("Text_10");
        text.setFlippedX(true);
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

    },
    setPlayNodeCurrentSelect: function(isClub) {
        this._super();
        var siyanghh_fennum;
        if (isClub)
            siyanghh_fennum = this.getNumberItem("baseScore", 5);
        else
            siyanghh_fennum = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_siyanghh_fennum, 5);
        var index = siyanghh_fennum == 5 ? 0 : 1;
        this.fenNode_siyanghh_5.setSelected(siyanghh_fennum == 5);
        this.fenNode_siyanghh_10.setSelected(siyanghh_fennum != 5);
        this.radioBoxSelectCB(index, this.list[index], this.list);

        var _trustTime;
        if (isClub)
            _trustTime = [0, 60, 120, 180].indexOf(this.getNumberItem("trustTime", 0));
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_siyanghh_tuoguan, 0);
        this.tuoguanTypeList_radio.selectItem(_trustTime);
        this.radioBoxSelectCB(_trustTime,this.tuoguanList[_trustTime],this.tuoguanList);

        var siyanghh_qGangHu;
        if (isClub)
            siyanghh_qGangHu = this.getBoolItem("qiangganghu", false);
        else
            siyanghh_qGangHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_siyanghh_qGangHu, false);
        this.fenNode_siyanghh_ganghu.setSelected(siyanghh_qGangHu);
        var text = this.fenNode_siyanghh_ganghu.getChildByName("text");
        this.selectedCB(text, siyanghh_qGangHu)
    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.SI_YANG_HH;
        para.maxPlayer = 4;
        para.baseScore = 5; //几分
        para.trustTime = 0;
        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps
        //是否加注
        para.baseScore = this.fenNode_siyanghh_5.isSelected() == true ? 5 : 10;

        var tuoguan = 0;
        if (this._playNode_tuoguanType_0.isSelected()) {
           para.trustTime = 0;
            tuoguan = 0;
        }
        else if (this._playNode_tuoguanType_1.isSelected()) {
           para.trustTime = 60;
            tuoguan = 1;
        }
        else if (this._playNode_tuoguanType_2.isSelected()) {
           para.trustTime = 120;
            tuoguan = 2;
        }
        else if (this._playNode_tuoguanType_3.isSelected()) {
           para.trustTime = 180;
            tuoguan = 3;
        }

        var isQiangGangHu = this.fenNode_siyanghh_ganghu.isSelected();
        para.qiangganghu = isQiangGangHu;

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_siyanghh_fennum, para.baseScore);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_siyanghh_qGangHu, isQiangGangHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_siyanghh_tuoguan, tuoguan);
        }
        //cc.log("------gameType localStorageEncrypt: " + _gameType);
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});