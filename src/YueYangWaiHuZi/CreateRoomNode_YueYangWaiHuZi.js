
var CreateRoomNode_YueYangWaiHuZi = CreateRoomNode.extend({

    setKey:function()
    {
        this.localStorageKey.KEY_YYWHZ_MAX_PLAYER     = "_YYWHZ_MAX_PLAYER";       //几人玩
        this.localStorageKey.KEY_YYWHZ_MAI_PAI     = "_YYWHZ_MAI_PAI";       //埋牌
        this.localStorageKey.KEY_YYWHZ_MAI_PAI_NUM     = "_YYWHZ_MAI_PAI_NUM";       //埋牌数量
        this.localStorageKey.KEY_YYWHZ_KA_WAI     = "_YYWHZ_KA_WAI";       //卡歪
        this.localStorageKey.KEY_YYWHZ_DI_HU     = "_YYWHZ_DI_HU";       //地胡
        this.localStorageKey.KEY_YYWHZ_ZHUANG_JIA_DI_HU     = "_YYWHZ_ZHUANG_JIA_DI_HU";       //庄家地胡
        this.localStorageKey.KEY_YYWHZ_HU_FIRST     = "_YYWHZ_HU_FIRST";       //胡先
        this.localStorageKey.KEY_YYWHZ_SUI_JI_ZHUANG     = "_YYWHZ_SUI_JI_ZHUANG";       //随机庄
        this.localStorageKey.KEY_YYWHZ_HAO_FEN     = "_YYWHZ_HAO_FEN";       //豪
        this.localStorageKey.KEY_YYWHZ_MING_TANG     = "_YYWHZ_MING_TANG";       //名堂
        this.localStorageKey.KEY_YYWHZ_PIAO_FEN     = "_YYWHZ_PIAO_FEN";       //飘分
        this.localStorageKey.KEY_YYWHZ_QIE_PAI     = "_YYWHZ_QIE_PAI";       //切牌
        this.localStorageKey.KEY_YYWHZ_TUO_GUAN     = "_YYWHZ_TUO_GUAN";       //切牌

        this.setExtraKey({
            fanBei: "_YYWHZ_FAN_BEI",  //大结算翻倍
            fanBeiScore: "_YYWHZ_FAN_BEI_SCORE",  //少于X分大结算翻倍
            jieSuanDiFen: "_YYWHZ_JIE_SUAN_DI_FEN",  //少于X分大结算翻倍
        });
    },

    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();

        this.bgNode = ccs.load("bg_yueyangwaihuzi.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_hongZi");
    },
    changePayForPlayerNum:function (index) {
        this.setDiaNumData(this.bg_node);
        // this.maiPai.visible = index == 0 ? false : true;
        var selectColor = this._selectColor;
        var unSelectColor = this._unSelectColor;
        var unEnableColor = cc.color(191,191,191);
        if (this.maxPlayerList_radio.getSelectIndex() == 1){
            for (var i in this.maiPaiList) {
                this.maiPaiList[i].setEnabled(true);
                var txt =  this.maiPaiList[i].getChildByName("text");
                txt.setTextColor(this.maiPaiList[i].isSelected()? selectColor:unSelectColor);
            }
        }else{
            for (var i in this.maiPaiList) {
                this.maiPaiList[i].setEnabled(false);
                var txt =  this.maiPaiList[i].getChildByName("text");
                txt.setTextColor(unEnableColor);
            }
        }
    },
    initPlayNode:function()
    {
        var _play = this.bg_node.getChildByName("view").getChildByName("play");
        //几人玩
        var maxPlayerList = [];
        maxPlayerList.push(_play.getChildByName("maxPlayer3"));
        maxPlayerList.push(_play.getChildByName("maxPlayer2"));
        this.maxPlayerList_radio = createRadioBoxForCheckBoxs(maxPlayerList, function(index) {
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, maxPlayerList[index], maxPlayerList);
        }.bind(this));
		this.initPlayNumNode(maxPlayerList, [3, 2]);
        this.addListenerText(maxPlayerList,this.maxPlayerList_radio,this.changePayForPlayerNum.bind(this));
        this.maxPlayerList = maxPlayerList;

        this.maiPai = _play.getChildByName("maiPai");
        this.maiPai.visible = false;
        this.addListenerText(this.maiPai);
        this.maiPai.addEventListener(this.clickCB_hongzi.bind(this), this.maiPai);

        var maiPaiList = [];
        maiPaiList.push(_play.getChildByName("maipai0")); 
        maiPaiList.push(_play.getChildByName("maipai1"));
        maiPaiList.push(_play.getChildByName("maipai2"));
        this.maiPaiList_radio = createRadioBoxForCheckBoxs(maiPaiList,this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(maiPaiList,0,this.maiPaiList_radio),maiPaiList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(maiPaiList,1,this.maiPaiList_radio),maiPaiList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(maiPaiList,2,this.maiPaiList_radio),maiPaiList[2].getChildByName("text"));
        this.maiPaiList = maiPaiList;

        var kaiWaiList = [];
        kaiWaiList.push(_play.getChildByName("kawai_yes"));
        kaiWaiList.push(_play.getChildByName("kawai_no"));
        this.kaiWaiList_radio = createRadioBoxForCheckBoxs(kaiWaiList, this.radioBoxSelectCB);
        this.addListenerText(kaiWaiList,this.kaiWaiList_radio);
        this.kaiWaiList = kaiWaiList;

        this.diHu = _play.getChildByName("dihu");
        this.addListenerText(this.diHu);
        this.diHu.addEventListener(this.clickCB_hongzi.bind(this), this.diHu);

        this.zhuangJiaDiHu = _play.getChildByName("zhuangjiadihu");
        this.addListenerText(this.zhuangJiaDiHu);
        this.zhuangJiaDiHu.addEventListener(this.clickCB_hongzi.bind(this), this.zhuangJiaDiHu);

        this.suiJiZhuang = _play.getChildByName("suiJiZhuang");
        this.addListenerText(this.suiJiZhuang);
        this.suiJiZhuang.addEventListener(this.clickCB_hongzi.bind(this), this.suiJiZhuang);

        this.huFirst = _play.getChildByName("huFirst");
        this.addListenerText(this.huFirst);
        this.huFirst.addEventListener(this.clickCB_hongzi.bind(this), this.huFirst);

        var haoFenList = [];
        haoFenList.push(_play.getChildByName("haofen1"));
        haoFenList.push(_play.getChildByName("haofen2"));
        this.haoFenList_radio = createRadioBoxForCheckBoxs(haoFenList, this.radioBoxSelectCB);
        this.addListenerText(haoFenList,this.haoFenList_radio);
        this.haoFenList = haoFenList;

        var mingTangList = [];
        mingTangList.push(_play.getChildByName("mingtang1"));
        mingTangList.push(_play.getChildByName("mingtang2"));
        this.mingTangList_radio = createRadioBoxForCheckBoxs(mingTangList, this.radioBoxSelectCB);
        this.addListenerText(mingTangList,this.mingTangList_radio);
        this.mingTangList = mingTangList;

        var piaoFenList = [];
        piaoFenList.push(_play.getChildByName("piaoFen1"));
        piaoFenList.push(_play.getChildByName("piaoFen2"));
        piaoFenList.push(_play.getChildByName("piaoFen3"));
        this.piaoFenList_radio = createRadioBoxForCheckBoxs(piaoFenList, this.radioBoxSelectCB);
        this.addListenerText(piaoFenList,this.piaoFenList_radio);
        this.piaoFenList = piaoFenList;

        var qiePaiList = [];
        qiePaiList.push(_play.getChildByName("qiePai1"));
        qiePaiList.push(_play.getChildByName("qiePai2"));
        this.qiePaiList_radio = createRadioBoxForCheckBoxs(qiePaiList, this.radioBoxSelectCB);
        this.addListenerText(qiePaiList,this.qiePaiList_radio);
        this.qiePaiList = qiePaiList;

        var tuoGuanList = [];
        tuoGuanList.push(_play.getChildByName("tuoGuan1"));
        tuoGuanList.push(_play.getChildByName("tuoGuan2"));
        tuoGuanList.push(_play.getChildByName("tuoGuan3"));
        tuoGuanList.push(_play.getChildByName("tuoGuan4"));
        tuoGuanList.push(_play.getChildByName("tuoGuan5"));
        this.tuoGuanList_radio = createRadioBoxForCheckBoxs(tuoGuanList, this.radioBoxSelectCB);
        this.addListenerText(tuoGuanList,this.tuoGuanList_radio);
        this.tuoGuanList = tuoGuanList;

        var btn_tuoGuanTip = _play.getChildByName("btn_tuoGuanTip");
        var tuoGuanTip = _play.getChildByName("tuoGuanTip");
        btn_tuoGuanTip.addClickEventListener(function(btn){
            tuoGuanTip.visible = !tuoGuanTip.visible;
        });

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            status: null,
            onTouchBegan: function(touch, event) {
                if (tuoGuanTip.isVisible()) {
                    tuoGuanTip.setVisible(false);
                    return true;
                } else {
                    return false;
                }
            },
        }), tuoGuanTip);

        this.initExtraPlayNode(_play);
    },

    initExtraPlayNode:function(_playWay)
    {
        // 大结算翻倍
        if (_playWay.getChildByName("play_nofanbei")) {
            var nodeListFanBei = [];
            nodeListFanBei.push(_playWay.getChildByName("play_nofanbei"));
            nodeListFanBei.push(_playWay.getChildByName("play_lessthan"));
            this.fanbei_radio = createRadioBoxForCheckBoxs(nodeListFanBei, this.fanBeiRadioBoxSelectCB.bind(this));
            var that = this;
            this.addListenerText(nodeListFanBei, this.fanbei_radio, function (index,sender) {
                that.fanBeiRadioBoxSelectCB(index, sender,nodeListFanBei);
            });
            this.nodeListFanBei = nodeListFanBei;

            var subButton = nodeListFanBei[1].getChildByName("btn_sub");
            var addButton = nodeListFanBei[1].getChildByName("btn_add");
            var scoreLabel = nodeListFanBei[1].getChildByName("score");
            subButton.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var curScore = parseInt(scoreLabel.getString());

                    curScore -= 10;
                    if (curScore < 30) {
                        curScore = 100;
                    }

                    scoreLabel.setString(curScore + "分");
                }
            }, this);

            addButton.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var curScore = parseInt(scoreLabel.getString());

                    curScore += 10;
                    if (curScore > 100) {
                        curScore = 30;
                    }

                    scoreLabel.setString(curScore + "分");
                }
            }, this);
        }

        //积分底分
        var i = 3;
        var jieSuanDiFenParent = _playWay;
        while(i >= 0){
            this.jieSuanDiFen = jieSuanDiFenParent.getChildByName("jieSuanDiFen");
            if(this.jieSuanDiFen){
                break;
            }
            jieSuanDiFenParent = jieSuanDiFenParent.getParent();
            if(!jieSuanDiFenParent){
                break;
            }
            i--;
        }
        if(this.jieSuanDiFen){
            var text_diFen = this.jieSuanDiFen.getChildByName("text_diFen");
            var btn_sub = this.jieSuanDiFen.getChildByName("btn_sub");
            var btn_add = this.jieSuanDiFen.getChildByName("btn_add");
            this.difenAry = [0.1,0.2,0.3,0.4,0.5,1,2,3,4,5,6,7,8,9,10];
            this.difenIndex = 0;
            var _this = this;
            btn_sub.addClickEventListener(function (btn) {
                _this.difenIndex--;
                if (_this.difenIndex < 0)_this.difenIndex = _this.difenAry.length -1;
                text_diFen.setString(_this.difenAry[_this.difenIndex]);
            });
            btn_add.addClickEventListener(function (btn) {
                _this.difenIndex++;
                if (_this.difenIndex > _this.difenAry.length -1)_this.difenIndex = 0;
                text_diFen.setString(_this.difenAry[_this.difenIndex]);
            });
        }
    },

    clickCB_hongzi:function(sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
            case ccui.CheckBox.EVENT_UNSELECTED:
                var txt = sender.getChildByName("text");
                if (sender.isSelected()) {
                    txt.setTextColor(this._selectColor);
                } else {
                    txt.setTextColor(this._unSelectColor);
                }
                break;
        }
    },

    setPlayNodeCurrentSelect:function(isClub)
    { 
        var maxPlayer;
        if (isClub)
            maxPlayer = [3, 2].indexOf(this.getNumberItem("maxPlayer", 3));
        else
            maxPlayer = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YYWHZ_MAX_PLAYER, 0);
        this.maxPlayerList_radio.selectItem(maxPlayer);
        this.radioBoxSelectCB(maxPlayer,this.maxPlayerList[maxPlayer],this.maxPlayerList);

        var isMaiPai;
        var maiPaiNum;
        if (isClub){
            isMaiPai = this.getBoolItem("isMaiPai", false);
            maiPaiNum = this.getNumberItem("maiPaiNum", 20);
        }
        else{
            isMaiPai = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YYWHZ_MAI_PAI, false);
            maiPaiNum = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_CSMJ_maiPaiNum, 20);
        }
        maiPaiNum = isMaiPai ? maiPaiNum : 0;
        var maiPaiSel = [0,10,20].indexOf(maiPaiNum);
        if(maiPaiSel < 0){
            maiPaiSel = 0;
        }
        this.maiPaiList_radio.selectItem(maiPaiSel);
        this.radioBoxSelectCB(maiPaiSel,this.maiPaiList[maiPaiSel],this.maiPaiList);
 
        // this.maiPai.setSelected(isMaiPai);
        // var text = this.maiPai.getChildByName("text");
        // this.selectedCB(text,isMaiPai);

        var isKaWai;
        if (isClub)
            isKaWai = this.getBoolItem("isKaWai", true);
        else
            isKaWai = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YYWHZ_KA_WAI, true);
        this.kaiWaiList_radio.selectItem([true, false].indexOf(isKaWai));
        this.radioBoxSelectCB(maxPlayer,this.kaiWaiList[[true, false].indexOf(isKaWai)],this.kaiWaiList);

        var isDiHu;
        if (isClub)
            isDiHu = this.getBoolItem("isDiHu", true);
        else
            isDiHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YYWHZ_DI_HU, true);
        this.diHu.setSelected(isDiHu);
        var text = this.diHu.getChildByName("text");
        this.selectedCB(text,isDiHu);

        var isZhuangJiaDiHu;
        if (isClub)
            isZhuangJiaDiHu = this.getBoolItem("isZhuangJiaDiHu", true);
        else
            isZhuangJiaDiHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YYWHZ_ZHUANG_JIA_DI_HU, true);
        this.zhuangJiaDiHu.setSelected(isZhuangJiaDiHu);
        var text = this.zhuangJiaDiHu.getChildByName("text");
        this.selectedCB(text,isZhuangJiaDiHu);

        var isSuiJiZhuang;
        if (isClub)
            isSuiJiZhuang = this.getBoolItem("isRandomZhuang", false);
        else
            isSuiJiZhuang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YYWHZ_SUI_JI_ZHUANG, false);
        this.suiJiZhuang.setSelected(isSuiJiZhuang);
        var text = this.suiJiZhuang.getChildByName("text");
        this.selectedCB(text,isSuiJiZhuang);

        var isHuFirst;
        if (isClub)
            isHuFirst = this.getBoolItem("isHuFirst", false);
        else
            isHuFirst = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YYWHZ_HU_FIRST, false);
        this.huFirst.setSelected(isHuFirst);
        var text = this.huFirst.getChildByName("text");
        this.selectedCB(text,isHuFirst);

        var haoFen;
        if (isClub)
            haoFen = this.getNumberItem("haoFen", 0);
        else
            haoFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YYWHZ_HAO_FEN, 0);
        this.haoFenList_radio.selectItem(haoFen);
        this.radioBoxSelectCB(haoFen,this.haoFenList[haoFen],this.haoFenList);

        var mingTang;
        if (isClub)
            mingTang = this.getNumberItem("mingTang", 0);
        else
            mingTang = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YYWHZ_MING_TANG, 0);
        this.mingTangList_radio.selectItem(mingTang);
        this.radioBoxSelectCB(mingTang,this.mingTangList[mingTang],this.mingTangList);

        var piaoFen;
        if (isClub)
            piaoFen = this.getNumberItem("piaoFen", 0);
        else
            piaoFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YYWHZ_PIAO_FEN, 0);
        this.piaoFenList_radio.selectItem(piaoFen);
        this.radioBoxSelectCB(piaoFen,this.piaoFenList[piaoFen],this.piaoFenList);

        var qiePai;
        if (isClub)
            qiePai = [false, true].indexOf(this.getBoolItem("isManualCutCard", false));
        else
            qiePai = [false, true].indexOf(util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YYWHZ_QIE_PAI, false));
        this.qiePaiList_radio.selectItem(qiePai);
        this.radioBoxSelectCB(qiePai,this.qiePaiList[qiePai],this.qiePaiList);

        var tuoGuan;
        if (isClub)
            tuoGuan = [-1, 60, 120, 180, 300].indexOf(this.getNumberItem("trustTime", -1));
        else
            tuoGuan = [-1, 60, 120, 180, 300].indexOf(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YYWHZ_TUO_GUAN, -1));
        this.tuoGuanList_radio.selectItem(tuoGuan);
        this.radioBoxSelectCB(tuoGuan,this.tuoGuanList[tuoGuan],this.tuoGuanList);

        this.setExtraPlayNodeCurrentSelect(isClub);

        // 这一行代码必须在最后，因为他会间接调用getSelectedPara
        this.changePayForPlayerNum(maxPlayer);
    },

    setExtraPlayNodeCurrentSelect:function(isClub)
    {
        if (this.fanbei_radio) {
            // 大结算翻倍
            var fanBeiOption;
            var fanBeiScore;
            if (isClub) {
                fanBeiScore = this.getNumberItem("fanBeiScore", 40);
                fanBeiOption = this.getNumberItem("fanBei", 0);
            }
            else {
                fanBeiOption = util.localStorageEncrypt.getNumberItem(this.localStorageKey.fanBei, 0);
                fanBeiScore = util.localStorageEncrypt.getNumberItem(this.localStorageKey.fanBeiScore, 40);
            }
            this.fanbei_radio.selectItem(fanBeiOption)
            this.nodeListFanBei[1].getChildByName("score").setString(fanBeiScore + "分");
            this.fanBeiRadioBoxSelectCB(fanBeiOption, this.nodeListFanBei[fanBeiOption], this.nodeListFanBei);
        }

        //积分底分
        if(this.jieSuanDiFen){
            var diFen;
            if (isClub){
                diFen = this.getNumberItem("jieSuanDiFen", 1);
            }else {
                diFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.jieSuanDiFen, 1);
            }
            this.difenIndex = this.difenAry.indexOf(diFen);
            if (this.difenIndex < 0) this.difenIndex = 1;
            var text_diFen = this.jieSuanDiFen.getChildByName("text_diFen");
            text_diFen.setString(this.difenAry[this.difenIndex] + "");
        }
    },

    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI;
        para.maxPlayer = [3, 2][this.maxPlayerList_radio.getSelectIndex()];     // 人数
        // para.isMaiPai = (para.maxPlayer == 2 && this.maiPai.isSelected());
        para.maiPaiNum = para.maxPlayer == 2 ? [0,10,20][this.maiPaiList_radio.getSelectIndex()] : 0;
        para.isMaiPai = para.maiPaiNum > 0 ? true : false;
        para.isKaWai = [true,false][this.kaiWaiList_radio.getSelectIndex()];   // 卡歪
        para.isDiHu = this.diHu.isSelected();
        para.isZhuangJiaDiHu = this.zhuangJiaDiHu.isSelected();
        para.isRandomZhuang = this.suiJiZhuang.isSelected();
        para.isHuFirst = this.huFirst.isSelected();
        para.haoFen = this.haoFenList_radio.getSelectIndex();
        para.mingTang = this.mingTangList_radio.getSelectIndex();
        para.piaoFen = this.piaoFenList_radio.getSelectIndex();
        para.isManualCutCard = [false, true][this.qiePaiList_radio.getSelectIndex()];
        para.trustTime = [-1, 60, 120, 180, 300][this.tuoGuanList_radio.getSelectIndex()];

        this.getExtraSelectedPara(para);

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YYWHZ_MAX_PLAYER, this.maxPlayerList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YYWHZ_MAI_PAI_NUM, para.maiPaiNum);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YYWHZ_MAI_PAI, para.isMaiPai);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YYWHZ_KA_WAI, para.isKaWai);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YYWHZ_DI_HU, para.isDiHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YYWHZ_ZHUANG_JIA_DI_HU, para.isZhuangJiaDiHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YYWHZ_SUI_JI_ZHUANG, para.isRandomZhuang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YYWHZ_HU_FIRST, para.isHuFirst);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YYWHZ_HAO_FEN, this.haoFenList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YYWHZ_MING_TANG, this.mingTangList_radio.getSelectIndex());
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YYWHZ_PIAO_FEN, this.piaoFenList_radio.getSelectIndex());
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YYWHZ_QIE_PAI, para.isManualCutCard);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YYWHZ_TUO_GUAN, para.trustTime);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }

});