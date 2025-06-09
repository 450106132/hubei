/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_xiaoGanKaWuXing = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_XIAOGANKAWUXING_playType                 = "_XIAOGANKAWUXING_HUBEI_playType";            //各摸各胡
        this.localStorageKey.KEY_XIAOGANKAWUXING_piaoFen              = "_XIAOGANKAWUXING_HUBEI_piaoFen";          //油中油
        this.localStorageKey.KEY_XIAOGANKAWUXING_tuoguan                   = "_XIAOGANKAWUXING_HUBEI_tuoguan";                //托管
        this.localStorageKey.KEY_XIAOGANKAWUXING_isOpenTingTip             = "_XIAOGANKAWUXING_HUBEI_isOpenTingTip";          //是否开启听牌提示
        this.localStorageKey.KEY_XIAOGANKAWUXING_count                     = "_XIAOGANKAWUXING_HUBEI_COUNT";                  //有赖子可抢杠
        this.localStorageKey.KEY_XIAOGANKAWUXING_difen 		            = "_XIAOGANKAWUXING_HUBEI_DI_FEN";                 //底分
        this.localStorageKey.KEY_XIAOGANKAWUXING_quBaJiu                     = "_XIAOGANKAWUXING_HUBEI_quBaJiu"; 
        this.localStorageKey.KEY_XIAOGANKAWUXING_buDaiFen                     = "_XIAOGANKAWUXING_HUBEI_buDaiFen";  
        this.localStorageKey.KEY_XIAOGANKAWUXING_baSiZhang                     = "_XIAOGANKAWUXING_HUBEI_baSiZhang";  
        this.localStorageKey.KEY_XIAOGANKAWUXING_KaWuX4                     = "_XIAOGANKAWUXING_HUBEI_KaWuX4";  
        this.localStorageKey.KEY_XIAOGANKAWUXING_pengPengX4                     = "_XIAOGANKAWUXING_HUBEI_pengPengX4";  
        this.localStorageKey.KEY_XIAOGANKAWUXING_gangShangHuaX4                     = "_XIAOGANKAWUXING_HUBEI_gangShangHuaX4";                  //底分
        this.localStorageKey.KEY_XIAOGANKAWUXING_liangDuiLiang                     = "_XIAOGANKAWUXING_HUBEI_liangDuiLiang";  
        this.localStorageKey.KEY_XIAOGANKAWUXING_quanLiang                     = "_XIAOGANKAWUXING_HUBEI_quanLiang";  
        this.localStorageKey.KEY_XIAOGANKAWUXING_jianSiX2                     = "_XIAOGANKAWUXING_HUBEI_jianSiX2";  
        this.localStorageKey.KEY_XIAOGANKAWUXING_shuKan                     = "_XIAOGANKAWUXING_HUBEI_shuKan";
        this.localStorageKey.KEY_XIAOGANKAWUXING_chuZi                     = "_XIAOGANKAWUXING_HUBEI_chuZi";  
        this.localStorageKey.KEY_XIAOGANKAWUXING_fengDing                     = "_XIAOGANKAWUXING_HUBEI_fengDing";  
        this.localStorageKey.KEY_XIAOGANKAWUXING_maiMa                     = "_XIAOGANKAWUXING_HUBEI_maiMa";
        this.localStorageKey.KEY_XIAOGANKAWUXING_maiYiSongYi                     = "_XIAOGANKAWUXING_HUBEI_maiYiSongYi";      
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();
        //if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) this._costName = '房卡';
        this.bgNode = ccs.load("bg_xiaoGanKaWuXing.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_xiaoGanKaWuXing").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_xiaoGanKaWuXing");
    },
    initPlayNode: function() {
        var _bgNode = this.bg_node;
        var _play = _bgNode.getChildByName("play");
        var _parent = _bgNode.getParent();

        //人数
        this._playNode_maxPlayer0 = _play.getChildByName("play_count0");
        this._playNode_maxPlayer1 = _play.getChildByName("play_count1");
        var nodeCountList1 = [];
        nodeCountList1.push(_play.getChildByName("play_count0"));
        nodeCountList1.push(_play.getChildByName("play_count1"));
        this.initPlayNumNode(nodeCountList1, [3, 2]);
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(nodeCountList1, function(index) {
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeCountList1[index], nodeCountList1);
        }.bind(this));
        this.addListenerText(nodeCountList1, this._playNode_player_count_radio, this.changePayForPlayerNum.bind(this));
        this._countlist = nodeCountList1;

        this._playNode_quBaJiu = _play.getChildByName("play_quBaJiu");
        this.addListenerText(this._playNode_quBaJiu);
        this._playNode_quBaJiu.addEventListener(this.clickCB, this._playNode_quBaJiu);

        this._playNode_buDaiFeng = _play.getChildByName("play_buDaiFeng");
        this.addListenerText(this._playNode_buDaiFeng);
        this._playNode_buDaiFeng.addEventListener(this.clickCB, this._playNode_buDaiFeng);

        this._playNode_84Zhang = _play.getChildByName("play_84Zhang");
        this.addListenerText(this._playNode_84Zhang);
        this._playNode_84Zhang.addEventListener(this.clickCB, this._playNode_84Zhang);

        this._playNode_maxPlayer0.schedule(function(){
            if (this._playNode_maxPlayer0.isSelected()) {
                this._playNode_quBaJiu.visible = true;
                this._playNode_buDaiFeng.visible = true;
                this._playNode_84Zhang.visible = false;
            }else{
                this._playNode_quBaJiu.visible = false;
                this._playNode_buDaiFeng.visible = false;
                this._playNode_84Zhang.visible = true;
            }
        }.bind(this));

        this._playNode_kaWu4 = _play.getChildByName("play_kaWu4");
        this.addListenerText(this._playNode_kaWu4);
        this._playNode_kaWu4.addEventListener(this.clickCB, this._playNode_kaWu4);

        this._playNode_pengPengHu = _play.getChildByName("play_pengPengHu");
        this.addListenerText(this._playNode_pengPengHu);
        this._playNode_pengPengHu.addEventListener(this.clickCB, this._playNode_pengPengHu);

        this._playNode_gangShangHua = _play.getChildByName("play_gangShangHua");
        this.addListenerText(this._playNode_gangShangHua);
        this._playNode_gangShangHua.addEventListener(this.clickCB, this._playNode_gangShangHua);

        this._playNode_liangDuiLiang = _play.getChildByName("play_liangDuiLiang");
        this.addListenerText(this._playNode_liangDuiLiang);
        this._playNode_liangDuiLiang.addEventListener(this.clickCB, this._playNode_liangDuiLiang);

        this._playNode_quanLiang = _play.getChildByName("play_quanLiang");
        this.addListenerText(this._playNode_quanLiang);
        this._playNode_quanLiang.addEventListener(this.clickCB, this._playNode_quanLiang);

        this._playNode_jian4X2 = _play.getChildByName("play_jian4X2");
        this.addListenerText(this._playNode_jian4X2);
        this._playNode_jian4X2.addEventListener(this.clickCB, this._playNode_jian4X2);

        this._playNode_shuKan = _play.getChildByName("play_shuKan");
        this.addListenerText(this._playNode_shuKan);
        this._playNode_shuKan.addEventListener(this.clickCB, this._playNode_shuKan);

        this._playNode_maiYiSongYi = _play.getChildByName("play_maiYiSongYi");
        this.addListenerText(this._playNode_maiYiSongYi);
        this._playNode_maiYiSongYi.addEventListener(this.clickCB, this._playNode_maiYiSongYi);

        // 飘分
        this._playNode_piaofen0 = _play.getChildByName("play_piaofen0");
        this._playNode_piaofen1 = _play.getChildByName("play_piaofen1");
        this._playNode_piaofen2 = _play.getChildByName("play_piaofen2");
        this._playNode_piaofen_once = _play.getChildByName("play_piaofen3");
        this._playNode_piaofen_every = _play.getChildByName("play_piaofen4");
        var piaoFenList = [];
        piaoFenList.push(this._playNode_piaofen0);
        piaoFenList.push(this._playNode_piaofen1);
        piaoFenList.push(this._playNode_piaofen2);
        piaoFenList.push(this._playNode_piaofen_once);
        piaoFenList.push(this._playNode_piaofen_every);
        this._playNode_piaoFen_radio = createRadioBoxForCheckBoxs(piaoFenList, this.radioBoxSelectCB);
        this.addListenerText(piaoFenList, this._playNode_piaoFen_radio);
        this.piaoFenList = piaoFenList;

        // 
        this._playNode_chuZi0 = _play.getChildByName("play_buChuZi");
        this._playNode_chuZi1 = _play.getChildByName("play_chuDanSuan");
        this._playNode_chuZi2 = _play.getChildByName("play_chuJiaChu");
        var chuZiList = [];
        chuZiList.push(this._playNode_chuZi0);
        chuZiList.push(this._playNode_chuZi1);
        chuZiList.push(this._playNode_chuZi2);
        this._playNode_chuZi_radio = createRadioBoxForCheckBoxs(chuZiList, this.radioBoxSelectCB);
        this.addListenerText(chuZiList, this._playNode_chuZi_radio);
        this.chuZiList = chuZiList;


        // 
        this._playNode_fengDing8 = _play.getChildByName("play_fengDing8");
        this._playNode_fengDing16 = _play.getChildByName("play_fengDing16");
        this._playNode_fengDing0 = _play.getChildByName("play_buFengDing");
        var fengDingList = [];
        fengDingList.push(this._playNode_fengDing8);
        fengDingList.push(this._playNode_fengDing16);
        fengDingList.push(this._playNode_fengDing0);
        this._playNode_fengDing_radio = createRadioBoxForCheckBoxs(fengDingList, this.radioBoxSelectCB);
        this.addListenerText(fengDingList, this._playNode_fengDing_radio);
        this.fengDingList = fengDingList;

        // 
        this._playNode_maiMa0 = _play.getChildByName("play_buMaiMa");
        this._playNode_maiMa1 = _play.getChildByName("play_ziMoMaiMa");
        this._playNode_maiMa2 = _play.getChildByName("play_liangPaiZiMo");
        var maiMaList = [];
        maiMaList.push(this._playNode_maiMa0);
        maiMaList.push(this._playNode_maiMa1);
        maiMaList.push(this._playNode_maiMa2);
        this._playNode_maiMa_radio = createRadioBoxForCheckBoxs(maiMaList, this.radioBoxSelectCB);
        this.addListenerText(maiMaList, this._playNode_maiMa_radio);
        this.maiMaList = maiMaList;

        this._playNode_maiMa0.schedule(function(){
            if (this._playNode_maiMa0.isSelected()) {
                this._playNode_maiYiSongYi.visible = false;
            }else{
                this._playNode_maiYiSongYi.visible = true;
            }
        }.bind(this));

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

        this._zhuIdx = 1;
        this._ZhuNum = _parent.getChildByName("txt_fen");
        //wj 显示问题
        this._ZhuNum.setLocalZOrder(1);
        
        if (this._ZhuNum) {
            this._ZhuNum.setString(this._zhuIdx);
            this._Button_sub = _parent.getChildByName("btn_sub");
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
            this._Button_add = _parent.getChildByName("btn_add");
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
        //人数
        var _currentCount;
        if (isClub) {
            if (this.getBoolItem("convertible", false))
                _currentCount = 3;
            else
                _currentCount = [3, 2].indexOf(this.getNumberItem("maxPlayer", 3));
        }
        else
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_count, 0);
        cc.log("_currentCount renshu  == " + _currentCount)
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);

        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_tuoguan, 0);
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


        //底分
        if (isClub)
            this._zhuIdx = this.getNumberItem("difen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_difen, 1);
        if (this._ZhuNum)
            this._ZhuNum.setString(this._zhuIdx + "");

        

        var piaoindex
        if (isClub)
            piaoindex = [0,1,2,3,4].indexOf(this.getNumberItem("piaoFen", 4));
        else
            piaoindex = [0,1,2,3,4].indexOf(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_piaoFen, 4));
        this._playNode_piaoFen_radio.selectItem(piaoindex);
        this.radioBoxSelectCB(piaoindex, this.piaoFenList[piaoindex], this.piaoFenList);

        var chuZiIndex
        if (isClub)
            chuZiIndex = [0,1,2].indexOf(this.getNumberItem("chuZi", 0));
        else
            chuZiIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_chuZi, 0);
        this._playNode_chuZi_radio.selectItem(chuZiIndex);
        this.radioBoxSelectCB(chuZiIndex, this.chuZiList[chuZiIndex], this.chuZiList);

        var fengDingIndex
        if (isClub)
            fengDingIndex = [8,16,0].indexOf(this.getNumberItem("fengDing", 0));
        else
            fengDingIndex = [8,16,0].indexOf(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_fengDing, 0));
        this._playNode_fengDing_radio.selectItem(fengDingIndex);
        this.radioBoxSelectCB(fengDingIndex, this.fengDingList[fengDingIndex], this.fengDingList);

        var maiMaIndex
        if (isClub)
            maiMaIndex = [0,1,2].indexOf(this.getNumberItem("maiMa", 0));
        else
            maiMaIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_maiMa, 0);
        this._playNode_maiMa_radio.selectItem(maiMaIndex);
        this.radioBoxSelectCB(maiMaIndex, this.maiMaList[maiMaIndex], this.maiMaList);

        var quBaJiu;
        if (isClub)
            quBaJiu = this.getNumberItem("quBaJiu", 0);
        else
            quBaJiu = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_quBaJiu, 0);
        this._playNode_quBaJiu.setSelected(quBaJiu == 1 ? true : false);
        var text = this._playNode_quBaJiu.getChildByName("text");
        this.selectedCB(text, quBaJiu);

        var buDaiFen;
        if (isClub)
            buDaiFen = this.getNumberItem("buDaiFen", 0);
        else
            buDaiFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_buDaiFen, 0);
        this._playNode_buDaiFeng.setSelected(buDaiFen == 1 ? true : false);
        var text = this._playNode_buDaiFeng.getChildByName("text");
        this.selectedCB(text, buDaiFen);

        var baSiZhang;
        if (isClub)
            baSiZhang = this.getNumberItem("baSiZhang", 0);
        else
            baSiZhang = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_baSiZhang, 0);
        this._playNode_84Zhang.setSelected(baSiZhang == 1 ? true : false);
        var text = this._playNode_84Zhang.getChildByName("text");
        this.selectedCB(text, baSiZhang);

        var KaWuX4;
        if (isClub)
            KaWuX4 = this.getNumberItem("KaWuX4", 0);
        else
            KaWuX4 = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_KaWuX4, 0);
        this._playNode_kaWu4.setSelected(KaWuX4 == 1 ? true : false);
        var text = this._playNode_kaWu4.getChildByName("text");
        this.selectedCB(text, KaWuX4);

        var pengPengX4;
        if (isClub)
            pengPengX4 = this.getNumberItem("pengPengX4", 0);
        else
            pengPengX4 = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_pengPengX4, 0);
        this._playNode_pengPengHu.setSelected(pengPengX4 == 1 ? true : false);
        var text = this._playNode_pengPengHu.getChildByName("text");
        this.selectedCB(text, pengPengX4);

        var gangShangHuaX4;
        if (isClub)
            gangShangHuaX4 = this.getNumberItem("gangShangHuaX4", 0);
        else
            gangShangHuaX4 = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_gangShangHuaX4, 0);
        this._playNode_gangShangHua.setSelected(gangShangHuaX4 == 1 ? true : false);
        var text = this._playNode_gangShangHua.getChildByName("text");
        this.selectedCB(text, gangShangHuaX4);

        var liangDuiLiang;
        if (isClub)
            liangDuiLiang = this.getNumberItem("liangDuiLiang", 0);
        else
            liangDuiLiang = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_liangDuiLiang, 0);
        this._playNode_liangDuiLiang.setSelected(liangDuiLiang == 1 ? true : false);
        var text = this._playNode_liangDuiLiang.getChildByName("text");
        this.selectedCB(text, liangDuiLiang);

        var quanLiang;
        if (isClub)
            quanLiang = this.getNumberItem("quanLiang", 0);
        else
            quanLiang = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_quanLiang, 0);
        this._playNode_quanLiang.setSelected(quanLiang == 1 ? true : false);
        var text = this._playNode_quanLiang.getChildByName("text");
        this.selectedCB(text, quanLiang);

        var jianSiX2;
        if (isClub)
            jianSiX2 = this.getNumberItem("jianSiX2", 0);
        else
            jianSiX2 = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_jianSiX2, 0);
        this._playNode_jian4X2.setSelected(jianSiX2 == 1 ? true : false);
        var text = this._playNode_jian4X2.getChildByName("text");
        this.selectedCB(text, jianSiX2);

        var shuKan;
        if (isClub)
            shuKan = this.getNumberItem("shuKan", 0);
        else
            shuKan = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_shuKan, 0);
        this._playNode_shuKan.setSelected(shuKan == 1 ? true : false);
        var text = this._playNode_shuKan.getChildByName("text");
        this.selectedCB(text, shuKan);

        var maiYiSongYi;
        if (isClub)
            maiYiSongYi = this.getNumberItem("maiYiSongYi", 0);
        else
            maiYiSongYi = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_maiYiSongYi, 0);
        this._playNode_maiYiSongYi.setSelected(maiYiSongYi == 1 ? true : false);
        var text = this._playNode_maiYiSongYi.getChildByName("text");
        this.selectedCB(text, maiYiSongYi);


        var isOpenTingTip;
        if (isClub)
            isOpenTingTip = this.getBoolItem("isOpenTingTip", true);
        else
            isOpenTingTip = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_isOpenTingTip, true);
        var tingIndex = isOpenTingTip ? 0 : 1;
        this.tingTipList_radio.selectItem(tingIndex);
        this.radioBoxSelectCB(tingIndex, this.tingTipList[tingIndex], this.tingTipList);

    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING;
        para.maxPlayer = 4;
        para.difen = this._zhuIdx;
        para.convertible = false; // 是否自由人数
        para.trustTime = 0; // 托管
        para.chuZi = [0,1,2][this._playNode_chuZi_radio.getSelectIndex()]; 
        para.fengDing = [8,16,0][this._playNode_fengDing_radio.getSelectIndex()];
        para.maiMa = [0,1,2][this._playNode_maiMa_radio.getSelectIndex()];
        para.piaoFen = [0,1,2,3,4][this._playNode_piaoFen_radio.getSelectIndex()];
        

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
            para.maxPlayer = 3;
            _countIdx = 0;
        } else if (this._playNode_maxPlayer1.isSelected()) {
            para.maxPlayer = 2;
            _countIdx = 1;
        }

        para.isOpenTingTip = this.tingTipList[0].isSelected();
        para.quBaJiu = this._playNode_quBaJiu.isSelected() ? 1 : 0;
        para.buDaiFen = this._playNode_buDaiFeng.isSelected() ? 1 : 0;
        para.baSiZhang = this._playNode_84Zhang.isSelected() ? 1 : 0;
        para.KaWuX4 = this._playNode_kaWu4.isSelected() ? 1 : 0;
        para.pengPengX4 = this._playNode_pengPengHu.isSelected() ? 1 : 0;
        para.gangShangHuaX4 = this._playNode_gangShangHua.isSelected() ? 1 : 0;
        para.liangDuiLiang = this._playNode_liangDuiLiang.isSelected() ? 1 : 0;
        para.quanLiang = this._playNode_quanLiang.isSelected() ? 1 : 0;
        para.jianSiX2 = this._playNode_jian4X2.isSelected() ? 1 : 0;
        para.shuKan = this._playNode_shuKan.isSelected() ? 1 : 0;
        para.maiYiSongYi = this._playNode_maiYiSongYi.isSelected() ? 1 : 0;

        var baSiZhangIndex = para.baSiZhang;

        if (para.maxPlayer != 2) {
            para.baSiZhang = 0;
        }

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_playType, para.playType);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_piaoFen, para.piaoFen);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_count, _countIdx);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_tuoguan, para.trustTime);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_difen, para.difen);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_chuZi, para.chuZi);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_fengDing, para.fengDing);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_maiMa, para.maiMa);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_piaoFen, para.piaoFen);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_quBaJiu, para.quBaJiu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_buDaiFen, para.buDaiFen);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_baSiZhang, baSiZhangIndex);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_KaWuX4, para.KaWuX4);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_pengPengX4, para.pengPengX4);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_gangShangHuaX4, para.gangShangHuaX4);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_liangDuiLiang, para.liangDuiLiang);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_quanLiang, para.quanLiang);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_jianSiX2, para.jianSiX2);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_shuKan, para.shuKan);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_XIAOGANKAWUXING_maiYiSongYi, para.maiYiSongYi);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_XIAOGANKAWUXING_isOpenTingTip, para.isOpenTingTip);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});