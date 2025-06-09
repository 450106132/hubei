/**
 * Created by maoyu on 2017/7/21.
 */

var CreateRoomNode_enShi = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_enShi_count 					= "_enShi_COUNT"; 				//人数
        this.localStorageKey.KEY_enShi_ziyou                    = "_enShi_ZIYOU";               //自由人数 
        this.localStorageKey.KEY_enShi_tuoguan                  = "_MLZH_tuoguan";              //托管
        this.localStorageKey.KEY_enShi_fenShu 					= "_enShi_fenshu"; 				//分数
        this.localStorageKey.KEY_enShi_laiZiType 			    = "_enShi_laiZiType"; 			//癞子类型（多癞、一癞到底）
        this.localStorageKey.KEY_enShi_taiZhuang 			    = "_enShi_taiZhuang"; 			//抬庄
        this.localStorageKey.KEY_enShi_gangShangPao 			= "_enShi_gangShangPao"; 	    //杠上炮
        this.localStorageKey.KEY_enShi_daPiJinHu 			    = "_enShi_daPiJinHu"; 	        //打痞禁胡
        this.localStorageKey.KEY_enShi_daLaiJinHu 			    = "_enShi_daLaiJinHu"; 	        //打癞禁胡
        this.localStorageKey.KEY_enShi_jinZhiYangPi			    = "_enShi_jinZhiYangPi"; 	    //禁止养痞
        this.localStorageKey.KEY_enShi_meiJuHuanZuo		        = "_enShi_meiJuHuanZuo"; 	    //每局换座
        this.localStorageKey.KEY_enShi_isOpenTingTip            = "_MLZH_isOpenTingTip";        //是否开启听牌提示
        
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();

        this.bgNode = ccs.load("bg_enShiMaJiang.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg");
    },
    initPlayNode: function() {
        var _bgenShiNode = this.bg_node;
        var _play = _bgenShiNode.getChildByName("play");

        //人数
        this._playNode_maxPlayer0 = _play.getChildByName("maxPlayer4");
        this._playNode_maxPlayer1 = _play.getChildByName("maxPlayer3");
        this._playNode_maxPlayer2 = _play.getChildByName("maxPlayer2");
        this._playNode_maxPlayer3 = _play.getChildByName("maxPlayer0");//自由人數
        var nodeCountList1 = [];
        nodeCountList1.push(this._playNode_maxPlayer0);
        nodeCountList1.push(this._playNode_maxPlayer1);
        nodeCountList1.push(this._playNode_maxPlayer2);
        nodeCountList1.push(this._playNode_maxPlayer3);
        this.initPlayNumNode(nodeCountList1, [4, 3, 2, 4]);
        
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(nodeCountList1, function(index) { 
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeCountList1[index], nodeCountList1);
        }.bind(this));
        this.addListenerText(nodeCountList1, this._playNode_player_count_radio, this.changePayForPlayerNum.bind(this));
        this._countlist = nodeCountList1;

        //托管
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

        var btn_tuoguanTip = _bgenShiNode.getChildByName("btn_tuoguanTip");
        var image_tuoguanTip = _bgenShiNode.getChildByName("image_tuoguanTip");
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


        //分数
        this._playNode_fenshu_0 = _play.getChildByName("fenshu1");
        this._playNode_fenshu_1 = _play.getChildByName("fenshu2");
        this._playNode_fenshu_2 = _play.getChildByName("fenshu3");
        this._playNode_fenshu_3 = _play.getChildByName("fenshu4");
        var fenShuNodeList = [];
        fenShuNodeList.push(_play.getChildByName("fenshu1"));
        fenShuNodeList.push(_play.getChildByName("fenshu2"));
        fenShuNodeList.push(_play.getChildByName("fenshu3"));
        fenShuNodeList.push(_play.getChildByName("fenshu4"));
        this._playNode_player_fenshu_radio = createRadioBoxForCheckBoxs(fenShuNodeList, this.radioBoxSelectCB);
        this.addListenerText(fenShuNodeList, this._playNode_player_fenshu_radio);
        this.fenShuNodeList = fenShuNodeList;

        //癞子类型
        this._playNode_laizi_0 = _play.getChildByName("laizi1");
        this._playNode_laizi_1 = _play.getChildByName("laizi2");
        var laiZiNodeList = [];
        laiZiNodeList.push(_play.getChildByName("laizi1"));
        laiZiNodeList.push(_play.getChildByName("laizi2"));
        this._playNode_player_laiZi_radio = createRadioBoxForCheckBoxs(laiZiNodeList, this.radioBoxSelectCB);
        this.addListenerText(laiZiNodeList, this._playNode_player_laiZi_radio);
        this.laiZiNodeList = laiZiNodeList;
        
        //抬庄
        this.play_taiZhuang = _play.getChildByName("taiZhuang");
        this.addListenerText(this.play_taiZhuang);
        this.play_taiZhuang.addEventListener(this.clickCB, this.play_taiZhuang);

        //杠上炮
        this.play_gangShangPao = _play.getChildByName("gangShangPao");
        this.addListenerText(this.play_gangShangPao);
        this.play_gangShangPao.addEventListener(this.clickCB, this.play_gangShangPao);
        
        //打痞禁胡
        this.play_daPiJinHu = _play.getChildByName("daPiJinHu");
        this.addListenerText(this.play_gangShangPao);
        this.play_daPiJinHu.addEventListener(this.clickCB, this.play_daPiJinHu);

        //打癞禁胡
        this.play_daLaiJinHu = _play.getChildByName("daLaiJinHu");
        this.addListenerText(this.play_daLaiJinHu);
        this.play_daLaiJinHu.addEventListener(this.clickCB, this.play_daLaiJinHu);

        //禁止养痞
        this.play_jinZhiYangPi = _play.getChildByName("jinZhiYangPi");
        this.addListenerText(this.play_jinZhiYangPi);
        this.play_jinZhiYangPi.addEventListener(this.clickCB, this.play_jinZhiYangPi);

        //每局换座
        this.play_meiJuHuanZuo = _play.getChildByName("meiJuHuanZuo");
        this.play_meiJuHuanZuo.setVisible(false);
        this.addListenerText(this.play_meiJuHuanZuo);
        this.play_meiJuHuanZuo.addEventListener(this.clickCB, this.play_meiJuHuanZuo);

        //听牌提示
        var tingTipList = [];
        tingTipList.push(_play.getChildByName("tingTip1"));
        tingTipList.push(_play.getChildByName("tingTip2"));
        this.tingTipList_radio = createRadioBoxForCheckBoxs(tingTipList, this.radioBoxSelectCB);
        this.addListenerText(tingTipList, this.tingTipList_radio);
        this.tingTipList = tingTipList;
        this.text_tishi = _play.getChildByName("text_tishi");
    },

    setPlayNodeCurrentSelect: function(isClub) {
        var _play = this.bg_node.getChildByName("play");

        //人数
        var _currentCount;
        var _isConvertible = false;
        if (isClub) {
            if (this.getBoolItem("convertible", false)){
                _currentCount = this.getNumberItem("maxPlayer", 4);
                _isConvertible = true;
            }
            else{
                _currentCount = this.getNumberItem("maxPlayer", 4);
            }
        }
        else{
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_enShi_count, 4);
            _isConvertible = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_enShi_ziyou, false);
        }
        var seleIdx = _isConvertible ? 3 : [4, 3, 2].indexOf(_currentCount);
        this._playNode_player_count_radio.selectItem(seleIdx);
        this.radioBoxSelectCB(seleIdx, this._countlist[seleIdx], this._countlist);

        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_enShi_tuoguan, 0);
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

        //分数
        var _currentFenShu;
        if (isClub) {
            _currentFenShu = this.getNumberItem("fenShu", 1);
        }else{
            _currentFenShu = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_enShi_fenShu, 1);
        }
        var seleIdx = [0.5, 1, 2.5, 5].indexOf(_currentFenShu);
        this._playNode_player_fenshu_radio.selectItem(seleIdx);
        this.radioBoxSelectCB(seleIdx, this.fenShuNodeList[seleIdx], this.fenShuNodeList);

        //听牌提示
        var isOpenTingTip;
        if (isClub)
            isOpenTingTip = this.getBoolItem("isOpenTingTip", true);
        else
            isOpenTingTip = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_enShi_isOpenTingTip, true);
        var tingIndex = isOpenTingTip ? 0 : 1;
        this.tingTipList_radio.selectItem(tingIndex);
        this.radioBoxSelectCB(tingIndex, this.tingTipList[tingIndex], this.tingTipList);

        //癞子类型
        var currLaiZiType;
        if(isClub){
            currLaiZiType = this.getNumberItem("playStyle", 0);
        }else{
            currLaiZiType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_enShi_laiZiType, 0);
        }
        var seleIdx = [0, 1].indexOf(currLaiZiType);
        this._playNode_player_laiZi_radio.selectItem(seleIdx);
        this.radioBoxSelectCB(seleIdx, this.laiZiNodeList[tingIndex], this.laiZiNodeList);
       
        //抬庄
        var taiZhuang;
        if (isClub)
            taiZhuang = this.getBoolItem("taiZhuang", true);
        else
            taiZhuang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_enShi_taiZhuang, true);
        this.play_taiZhuang.setSelected(taiZhuang);
        var text = this.play_taiZhuang.getChildByName("text");
        this.selectedCB(text, taiZhuang);

        //杠上炮
        var gangShangPao;
        if (isClub)
            gangShangPao = this.getBoolItem("gangShangPao", true);
        else
            gangShangPao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_enShi_gangShangPao, true);
        this.play_gangShangPao.setSelected(gangShangPao);
        var text = this.play_gangShangPao.getChildByName("text");
        this.selectedCB(text, gangShangPao);

        //打痞禁胡
        var daPiJinHu;
        if (isClub)
            daPiJinHu = this.getBoolItem("daPiJinHu", true);
        else
            daPiJinHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_enShi_daPiJinHu, true);
        this.play_daPiJinHu.setSelected(daPiJinHu);
        var text = this.play_daPiJinHu.getChildByName("text");
        this.selectedCB(text, daPiJinHu);

        //打癞禁胡
        var daLaiJinHu;
        if (isClub)
            daLaiJinHu = this.getBoolItem("daLaiJinHu", true);
        else
            daLaiJinHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_enShi_daLaiJinHu, true);
        this.play_daLaiJinHu.setSelected(daLaiJinHu);
        var text = this.play_daLaiJinHu.getChildByName("text");
        this.selectedCB(text, daLaiJinHu);

        //禁止养痞
        var jinZhiYangPi;
        if (isClub)
            jinZhiYangPi = this.getBoolItem("jinZhiYangPi", true);
        else
            jinZhiYangPi = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_enShi_jinZhiYangPi, true);
        this.play_jinZhiYangPi.setSelected(jinZhiYangPi);
        var text = this.play_jinZhiYangPi.getChildByName("text");
        this.selectedCB(text, jinZhiYangPi);

        //每局换座
        var huanZuo;
        if (isClub)
        huanZuo = this.getBoolItem("meiJuHuanZuo", true);
        else
        huanZuo = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_enShi_meiJuHuanZuo, true);
        this.play_meiJuHuanZuo.setSelected(huanZuo);
        var text = this.play_meiJuHuanZuo.getChildByName("text");
        this.selectedCB(text, huanZuo);
    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.EN_SHI_MA_JIANG;
        para.maxPlayer = 4;
        para.convertible = false;//是否自由人数
        para.trustTime = 0;//托管
        para.fenShu = 1;//分数
        para.playStyle = 0;//癞子玩法
        para.taiZhuang = true;//抬庄
        para.gangShangPao = true;//杠上炮
        para.daPiJinHu = true;//打痞禁胡
        para.daLaiJinHu = true;//打癞禁胡
        para.jinZhiYangPi = true;//禁止养痞
        para.meiJuHuanZuo = false;//每局换座

        //人数
        var _countIdx = 0;
        if(this._playNode_maxPlayer0.isSelected()) {
            para.maxPlayer = 4;
        }else if (this._playNode_maxPlayer1.isSelected()) {
            para.maxPlayer = 3;
        }else if (this._playNode_maxPlayer2.isSelected()) {
            para.maxPlayer = 2;
        }else if (this._playNode_maxPlayer3.isSelected()) {
            para.maxPlayer = 4;
            para.convertible = true;
        }

        //托管
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

        //分数
        if (this._playNode_fenshu_0.isSelected()) {
            para.fenShu = 0.5;
        } else if (this._playNode_fenshu_1.isSelected()) {
            para.fenShu = 1;
        } else if (this._playNode_fenshu_2.isSelected()) {
            para.fenShu = 2.5;
        } else if (this._playNode_fenshu_3.isSelected()) {
            para.fenShu = 5;
        }

        //癞子
        if (this._playNode_laizi_0.isSelected()) {
            para.playStyle = 0;
        } else if (this._playNode_laizi_1.isSelected()) {
            para.playStyle = 1;
        }

        //抬庄
        para.taiZhuang = this.play_taiZhuang.isSelected();

        //杠上炮
        para.gangShangPao = this.play_gangShangPao.isSelected();

        //打痞禁胡
        para.daPiJinHu = this.play_daPiJinHu.isSelected();

        //打癞禁胡
        para.daLaiJinHu = this.play_daLaiJinHu.isSelected();

        //禁止养痞
        para.jinZhiYangPi = this.play_jinZhiYangPi.isSelected();

        //每局换座
        para.meiJuHuanZuo = this.play_meiJuHuanZuo.isSelected();

        //听牌提示
        para.isOpenTingTip = this.tingTipList[0].isSelected();

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_enShi_count,  para.maxPlayer);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_enShi_ziyou, para.convertible);

            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_enShi_tuoguan, para.trustTime);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_enShi_isOpenTingTip, para.isOpenTingTip);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_enShi_fenShu, para.fenShu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_enShi_laiZiType, para.playStyle);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_enShi_taiZhuang, para.taiZhuang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_enShi_gangShangPao, para.gangShangPao);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_enShi_daPiJinHu, para.daPiJinHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_enShi_daLaiJinHu, para.daLaiJinHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_enShi_jinZhiYangPi, para.jinZhiYangPi);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_enShi_meiJuHuanZuo, para.meiJuHuanZuo);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    },

    changePayForPlayerNum:function(select_number){
        this._super(select_number); 
    }, 

});