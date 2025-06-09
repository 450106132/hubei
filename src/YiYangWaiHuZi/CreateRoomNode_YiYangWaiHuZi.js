
var CreateRoomNode_YiYangWaiHuZi = CreateRoomNode.extend({

    setKey:function()
    {
        this.localStorageKey.KEY_YIYANGWAIHUZI_maxPlayer    = "_YIYANGWAIHUZI_maxPlayer";                       //几人玩
        this.localStorageKey.KEY_YIYANGWAIHUZI_maiPai     = "_YIYANGWAIHUZI_maiPai";                            //埋牌
        this.localStorageKey.KEY_YIYANGWAIHUZI_chiPai     = "_YIYANGWAIHUZI_chiPai";                            //不可吃
        this.localStorageKey.KEY_YIYANGWAIHUZI_chiPaiDuiJia     = "_YIYANGWAIHUZI_chiPaiDuiJia";                //不可吃
        this.localStorageKey.KEY_YIYANGWAIHUZI_daXiaoZiHu     = "_YIYANGWAIHUZI_daXiaoZiHu";                    //大小字胡
        this.localStorageKey.KEY_YIYANGWAIHUZI_tianHuBaoTing     = "_YIYANGWAIHUZI_tianHuBaoTing";              //天胡报听
        this.localStorageKey.KEY_YIYANGWAIHUZI_mingTang     = "_YIYANGWAIHUZI_mingTang";                        //名堂
        this.localStorageKey.KEY_YIYANGWAIHUZI_huaHu     = "_YIYANGWAIHUZI_huaHu";                              //花胡子
        this.localStorageKey.KEY_YIYANGWAIHUZI_shouLunSuiJiZhuang     = "_YIYANGWAIHUZI_shouLunSuiJiZhuang";    //首轮随机庄
        this.localStorageKey.KEY_YIYANGWAIHUZI_jiaXi     = "_YIYANGWAIHUZI_jiaXi";                              //胡牌加1息
        this.localStorageKey.KEY_YIYANGWAIHUZI_menZiFanFan     = "_YIYANGWAIHUZI_menZiFanFan";                  //门子翻番
        this.localStorageKey.KEY_YIYANGWAIHUZI_neiYuanBuKeJian     = "_YIYANGWAIHUZI_neiYuanBuKeJian";          //内元不可见
        this.localStorageKey.KEY_YIYANGWAIHUZI_siShou     = "_YIYANGWAIHUZI_siShou";                            //吃臭打臭死手
        this.localStorageKey.KEY_YIYANGWAIHUZI_fengDing     = "_YIYANGWAIHUZI_fengDing";                        // 封顶
        this.localStorageKey.KEY_YIYANGWAIHUZI_qiHu     = "_YIYANGWAIHUZI_qiHu";                                //起胡
        this.localStorageKey.KEY_YIYANGWAIHUZI_fanShen     = "_YIYANGWAIHUZI_fanShen";                          //翻神
        this.localStorageKey.KEY_YIYANGWAIHUZI_qiePai    = "_YIYANGWAIHUZI_qiePai";                             //切牌
        this.localStorageKey.KEY_YIYANGWAIHUZI_fanBei    = "_YIYANGWAIHUZI_fanBei";                             //翻倍
        this.localStorageKey.KEY_YIYANGWAIHUZI_fanBeiScore    = "_YIYANGWAIHUZI_fanBeiScore";                   //翻倍分数
        this.localStorageKey.KEY_YIYANGWAIHUZI_haiDiLao    = "_YIYANGWAIHUZI_haiDiLao";                         //海底捞
        this.localStorageKey.KEY_YIYANGWAIHUZI_maiPaiNum  = "_YIYANGWAIHUZI_MAIPAI_NUM";                        // 埋牌数
        this.localStorageKey.KEY_YIYANGWAIHUZI_tuoGuan  = "_YIYANGWAIHUZI_tuoGuan";                             // 托管

        this.setExtraKey({
            jieSuanDiFen: "_YIYANGWAIHUZI_JIE_SUAN_DI_FEN",  //积分底分
        });
    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();

        this.bgNode = ccs.load("bg_YiYangWaiHuZi.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("back");
    },
    changePayForPlayerNum:function (index) {
        this.setDiaNumData(this.bg_node);
        this.checkSelect();
        // if(index == 2){
        //     this.maiPai.visible = true;
        //     this.maiPai.getChildByName("text").setString("2人埋牌20张");
        // }else if(index == 1){
        //     this.maiPai.visible = true;
        //     this.maiPai.getChildByName("text").setString("埋牌20张");
        // }else{
        //     this.maiPai.visible = false;
        // }
    },
    initPlayNode:function()
    {
        var _play = this.bg_node.getChildByName("view").getChildByName("play");
        //几人玩
        var maxPlayerList = [];
        maxPlayerList.push(_play.getChildByName("maxPlayer3"));
        maxPlayerList.push(_play.getChildByName("maxPlayer2"));
        maxPlayerList.push(_play.getChildByName("maxPlayerFree"));
        this.maxPlayerList_radio = createRadioBoxForCheckBoxs(maxPlayerList, function(index) {
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, maxPlayerList[index], maxPlayerList);
        }.bind(this));
		this.initPlayNumNode(maxPlayerList, [3, 2, 3]);
        this.addListenerText(maxPlayerList,this.maxPlayerList_radio,this.changePayForPlayerNum.bind(this));
        this.maxPlayerList = maxPlayerList;

        this.maiPai = _play.getChildByName("maiPai");
        this.maiPai.visible = false;
        // this.addListenerText(this.maiPai);
        // this.maiPai.addEventListener(this.clickCB_YiYangWaiHuZi, this.maiPai);

        //埋牌
        var maiPaiList = [];
        maiPaiList.push(_play.getChildByName("maipai0")); 
        maiPaiList.push(_play.getChildByName("maipai1"));
        maiPaiList.push(_play.getChildByName("maipai2"));
        this.maiPaiList_radio = createRadioBoxForCheckBoxs(maiPaiList,this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(maiPaiList,0,this.maiPaiList_radio),maiPaiList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(maiPaiList,1,this.maiPaiList_radio),maiPaiList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(maiPaiList,2,this.maiPaiList_radio),maiPaiList[2].getChildByName("text"));
        this.maiPaiList = maiPaiList;

        var chiPaiCb1 = function () {
            if(this.chiPai.isSelected()){
                this.chiPaiDuiJia.setSelected(false);
                this.chiPaiDuiJia.getChildByName("text").setTextColor(this._unSelectColor);
            }
        }.bind(this);
        var chiPaiCbEx1 = function (sender, type) {
            this.clickCB_YiYangWaiHuZi(sender, type);
            chiPaiCb1();
        }.bind(this);
        this.chiPai = _play.getChildByName("chiPai");
        this.addListenerText(this.chiPai, null, chiPaiCb1);
        this.chiPai.addEventListener(chiPaiCbEx1, this.chiPai);

        var chiPaiCb2 = function () {
            if(this.chiPaiDuiJia.isSelected()){
                this.chiPai.setSelected(false);
                this.chiPai.getChildByName("text").setTextColor(this._unSelectColor);
            }
        }.bind(this);
        var chiPaiCbEx2 = function (sender, type) {
            this.clickCB_YiYangWaiHuZi(sender, type);
            chiPaiCb2();
        }.bind(this);
        this.chiPaiDuiJia = _play.getChildByName("chiPaiDuiJia");
        this.addListenerText(this.chiPaiDuiJia, null, chiPaiCb2);
        this.chiPaiDuiJia.addEventListener(chiPaiCbEx2, this.chiPaiDuiJia);

        this.daXiaoZiHu = _play.getChildByName("daXiaoZiHu");
        this.addListenerText(this.daXiaoZiHu);
        this.daXiaoZiHu.addEventListener(this.clickCB_YiYangWaiHuZi.bind(this), this.daXiaoZiHu);

        this.tianHuBaoTing = _play.getChildByName("tianHuBaoTing");
        this.addListenerText(this.tianHuBaoTing);
        this.tianHuBaoTing.addEventListener(this.clickCB_YiYangWaiHuZi.bind(this), this.tianHuBaoTing);

        this.mingTang = _play.getChildByName("mingTang");
        this.addListenerText(this.mingTang);
        this.mingTang.addEventListener(this.clickCB_YiYangWaiHuZi.bind(this), this.mingTang);

        this.huaHu = _play.getChildByName("huaHu");
        this.addListenerText(this.huaHu);
        this.huaHu.addEventListener(this.clickCB_YiYangWaiHuZi.bind(this), this.huaHu);

        this.shouLunSuiJiZhuang = _play.getChildByName("shouLunSuiJiZhuang");
        this.addListenerText(this.shouLunSuiJiZhuang);
        this.shouLunSuiJiZhuang.addEventListener(this.clickCB_YiYangWaiHuZi.bind(this), this.shouLunSuiJiZhuang);

        this.jiaXi = _play.getChildByName("jiaXi");
        this.addListenerText(this.jiaXi);
        this.jiaXi.addEventListener(this.clickCB_YiYangWaiHuZi.bind(this), this.jiaXi);

        this.menZiFanFan = _play.getChildByName("menZiFanFan");
        this.addListenerText(this.menZiFanFan);
        this.menZiFanFan.addEventListener(this.clickCB_YiYangWaiHuZi.bind(this), this.menZiFanFan);

        this.neiYuanBuKeJian = _play.getChildByName("neiYuanBuKeJian");
        this.addListenerText(this.neiYuanBuKeJian);
        this.neiYuanBuKeJian.addEventListener(this.clickCB_YiYangWaiHuZi.bind(this), this.neiYuanBuKeJian);

        this.siShou = _play.getChildByName("siShou");
        this.addListenerText(this.siShou);
        this.siShou.addEventListener(this.clickCB_YiYangWaiHuZi.bind(this), this.siShou);

        var fengDingList = [];
        fengDingList.push(_play.getChildByName("fengDing1"));
        fengDingList.push(_play.getChildByName("fengDing2"));
        fengDingList.push(_play.getChildByName("fengDing3"));
        fengDingList.push(_play.getChildByName("fengDing4"));
        this.fengDingList_radio = createRadioBoxForCheckBoxs(fengDingList, this.radioBoxSelectCB);
        this.addListenerText(fengDingList,this.fengDingList_radio);
        this.fengDingList = fengDingList;

        var qiHuList = [];
        qiHuList.push(_play.getChildByName("qiHu1"));
        qiHuList.push(_play.getChildByName("qiHu2"));
        this.qiHuList_radio = createRadioBoxForCheckBoxs(qiHuList, this.radioBoxSelectCB);
        this.addListenerText(qiHuList,this.qiHuList_radio);
        this.qiHuList = qiHuList;

        var fanShenList = [];
        fanShenList.push(_play.getChildByName("fanShen2"));
        fanShenList.push(_play.getChildByName("fanShen1"));
        this.fanShenList_radio = createRadioBoxForCheckBoxs(fanShenList, this.radioBoxSelectCB);
        this.addListenerText(fanShenList,this.fanShenList_radio);
        this.fanShenList = fanShenList;

        var qiePaiList = [];
        qiePaiList.push(_play.getChildByName("qiePai1"));
        qiePaiList.push(_play.getChildByName("qiePai2"));
        this.qiePaiList_radio = createRadioBoxForCheckBoxs(qiePaiList, this.radioBoxSelectCB);
        this.addListenerText(qiePaiList,this.qiePaiList_radio);
        this.qiePaiList = qiePaiList;

        this.fanBeiScore = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_fanBeiScore, 50);
        var fanBeiList = [];
        fanBeiList.push(_play.getChildByName("fanBei1"));
        fanBeiList.push(_play.getChildByName("fanBei2"));
        var btn_sub = _play.getChildByName("fanBei2").getChildByName("sub");
        var btn_add = _play.getChildByName("fanBei2").getChildByName("add");
        var score_text = _play.getChildByName("fanBei2").getChildByName("score");
        this.fanBeiList_radio = createRadioBoxForCheckBoxs(fanBeiList, function (index) {
            this.radioBoxSelectCB(index, fanBeiList[index], fanBeiList);
            this.setFanBeiButton(index);
        }.bind(this));
        this.addListenerText(fanBeiList,this.fanBeiList_radio, function (index) {
            this.setFanBeiButton(index);
        }.bind(this));
        this.fanBeiList = fanBeiList;
        this.btn_sub = btn_sub;
        this.btn_add = btn_add;
        this.score_text = score_text;

        if(this.isUseUIV3){
            var score_bg = _play.getChildByName("fanBei2").getChildByName("score_bg");
            var text = _play.getChildByName("fanBei2").getChildByName("text");
            text.setString("少于                              翻倍");
            score_bg.loadTexture("common_3.0/bg_jiajiandi.png");
            score_bg.setContentSize(new cc.Sprite("common_3.0/bg_jiajiandi.png").getContentSize());

            btn_add.loadTextures(
                "common_3.0/btn_jia.png",
                "common_3.0/btn_jia_liang.png",
                "common_3.0/btn_jia_hui.png"
            );
            btn_add.setContentSize(new cc.Sprite("common_3.0/btn_jia.png").getContentSize());

            btn_sub.loadTextures(
                "common_3.0/btn_jian.png",
                "common_3.0/btn_jian_liang.png",
                "common_3.0/btn_jian_hui.png"
            );
            btn_sub.setContentSize(new cc.Sprite("common_3.0/btn_jian.png").getContentSize());
        }

        btn_sub.addClickEventListener(function () {
            if(this.fanBeiScore == 50){
                this.fanBeiScore = 200;
            }else{
                this.fanBeiScore -= 50;
            }
            score_text.setString(this.fanBeiScore  + "分");
        }.bind(this));
        btn_add.addClickEventListener(function () {
            if(this.fanBeiScore == 200){
                this.fanBeiScore = 50;
            }else{
                this.fanBeiScore += 50;
            }
            score_text.setString(this.fanBeiScore  + "分");
        }.bind(this));

        var haiDiLaoList = [];
        haiDiLaoList.push(_play.getChildByName("haiDiLao1"));
        haiDiLaoList.push(_play.getChildByName("haiDiLao2"));
        this.haiDiLaoList_radio = createRadioBoxForCheckBoxs(haiDiLaoList, this.radioBoxSelectCB);
        this.addListenerText(haiDiLaoList,this.haiDiLaoList_radio);
        this.haiDiLaoList = haiDiLaoList;

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
                var pos = touch.getLocation();
                pos = btn_tuoGuanTip.parent.convertToNodeSpace(pos);
                if (tuoGuanTip.isVisible() && !cc.rectContainsPoint(btn_tuoGuanTip.getBoundingBox(), pos)) {
                    tuoGuanTip.setVisible(false);
                    return true;
                } else {
                    return false;
                }
            },
        }), tuoGuanTip);

        this.difenAry = [0.1,0.2,0.3,0.4,0.5,1,2,3,4,5,6,7,8,9,10];
        this.initExtraPlayNode(_play);
    },
    setFanBeiButton:function (index) {
        this.btn_sub.setTouchEnabled(index == 1);
        this.btn_sub.setBright(index == 1);
        this.btn_add.setTouchEnabled(index == 1);
        this.btn_add.setBright(index == 1);
        this.score_text.setTextColor(index == 1 ? this._selectColor : this._unSelectColor);
    },
    checkSelect : function(){
        var idx = this.maxPlayerList_radio.getSelectIndex();//人数
        var selectColor = this._selectColor;
        var unSelectColor = this._unSelectColor;
        var unEnableColor = cc.color(191,191,191);
        if (idx != 0){
            for (var i in this.maiPaiList) {
                this.maiPaiList[i].setEnabled(true);
                var txt =  this.maiPaiList[i].getChildByName("text");
                txt.ignoreContentAdaptWithSize(true);
                txt.setTextColor(this.maiPaiList[i].isSelected()? selectColor:unSelectColor);
                if(idx == 2) {
                    txt.setString(i==0 ? "不埋牌" : ("2人埋牌" + i*10 + "张"));
                }else {
                    txt.setString(i==0 ? "不埋牌" : ("埋牌" + i*10 + "张"))
                }
            }
        }else{
            for (var i in this.maiPaiList) {
                this.maiPaiList[i].setEnabled(false);
                var txt =  this.maiPaiList[i].getChildByName("text");
                txt.setTextColor(unEnableColor);
                txt.ignoreContentAdaptWithSize(true);
                txt.setString(i==0 ? "不埋牌" : ("埋牌" + i*10 + "张"));
            }
        }
    },
    clickCB_YiYangWaiHuZi:function(sender, type) {
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

    setPlayNodeCurrentSelect:function(isClub) {
        var maxPlayer;
        if (isClub){
            if (this.getBoolItem("convertible", false)) {
                maxPlayer = 2;
            } else {
                maxPlayer = [3, 2].indexOf(this.getNumberItem("maxPlayer", 3));
            }
        }
        else
            maxPlayer = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_maxPlayer, 0);
        this.maxPlayerList_radio.selectItem(maxPlayer);
        this.radioBoxSelectCB(maxPlayer,this.maxPlayerList[maxPlayer],this.maxPlayerList);

        // var isMaiPai;
        // if (isClub)
        //     isMaiPai = this.getBoolItem("isMaiPai", false);
        // else
        //     isMaiPai = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_maiPai, false);
        // this.maiPai.setSelected(isMaiPai);
        // var text = this.maiPai.getChildByName("text");
        // this.selectedCB(text,isMaiPai);

        var isMaiPai;
        var maiPaiNum;
        if(isClub){
            maiPaiNum = this.getNumberItem("maiPaiNum", 0);
            isMaiPai = this.getBoolItem("isMaiPai", false);
        }
        else{
            maiPaiNum = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_maiPaiNum, 0);
            isMaiPai = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_maiPai, false);
        }
        if(isMaiPai && maiPaiNum == 0) {
            maiPaiNum = 20;  //兼容之前的已埋牌
        }
        var maiPaiSel = [0,10,20].indexOf(maiPaiNum);
        if(maiPaiSel < 0){
            maiPaiSel = 0;
        }
        this.maiPaiList_radio.selectItem(maiPaiSel);
        this.radioBoxSelectCB(maiPaiSel,this.maiPaiList[maiPaiSel],this.maiPaiList);

        var isChiPai;
        if (isClub)
            isChiPai = this.getBoolItem("isBuKeChi", false);
        else
            isChiPai = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_chiPai, false);
        this.chiPai.setSelected(isChiPai);
        var text = this.chiPai.getChildByName("text");
        this.selectedCB(text,isChiPai);

        var isChiPaiDuiJia;
        if (isClub)
            isChiPaiDuiJia = this.getBoolItem("isBuKeChiDuiJia", false);
        else
            isChiPaiDuiJia = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_chiPaiDuiJia, false);
        this.chiPaiDuiJia.setSelected(isChiPaiDuiJia);
        var text = this.chiPaiDuiJia.getChildByName("text");
        this.selectedCB(text,isChiPaiDuiJia);

        var isDaXiaoZiHu;
        if (isClub)
            isDaXiaoZiHu = this.getBoolItem("isDaXiaoZiHu", false);
        else
            isDaXiaoZiHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_daXiaoZiHu, false);
        this.daXiaoZiHu.setSelected(isDaXiaoZiHu);
        var text = this.daXiaoZiHu.getChildByName("text");
        this.selectedCB(text,isDaXiaoZiHu);

        var isTianHuBaoTing;
        if (isClub)
            isTianHuBaoTing = this.getBoolItem("isTianHuBaoTing", false);
        else
            isTianHuBaoTing = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_tianHuBaoTing, false);
        this.tianHuBaoTing.setSelected(isTianHuBaoTing);
        var text = this.tianHuBaoTing.getChildByName("text");
        this.selectedCB(text,isTianHuBaoTing);

        var isMingTang;
        if (isClub)
            isMingTang = this.getBoolItem("isMingTang", false);
        else
            isMingTang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_mingTang, false);
        this.mingTang.setSelected(isMingTang);
        var text = this.mingTang.getChildByName("text");
        this.selectedCB(text,isMingTang);

        var isHuaHu;
        if (isClub)
            isHuaHu = this.getBoolItem("isHuaHu", false);
        else
            isHuaHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_huaHu, false);
        this.huaHu.setSelected(isHuaHu);
        var text = this.huaHu.getChildByName("text");
        this.selectedCB(text,isHuaHu);

        var isShouLunSuiJiZhuang;
        if (isClub)
            isShouLunSuiJiZhuang = this.getBoolItem("isRandomZhuang", false);
        else
            isShouLunSuiJiZhuang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_shouLunSuiJiZhuang, false);
        this.shouLunSuiJiZhuang.setSelected(isShouLunSuiJiZhuang);
        var text = this.shouLunSuiJiZhuang.getChildByName("text");
        this.selectedCB(text,isShouLunSuiJiZhuang);

        var isJiaXi;
        if (isClub)
            isJiaXi = this.getBoolItem("isHuJiaYiXi", false);
        else
            isJiaXi = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_jiaXi, false);
        this.jiaXi.setSelected(isJiaXi);
        var text = this.jiaXi.getChildByName("text");
        this.selectedCB(text,isJiaXi);

        var isMenZiFanFan;
        if (isClub)
            isMenZiFanFan = this.getBoolItem("isMenZiFanFan", true);
        else
            isMenZiFanFan = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_menZiFanFan, true);
        this.menZiFanFan.setSelected(isMenZiFanFan);
        var text = this.menZiFanFan.getChildByName("text");
        this.selectedCB(text,isMenZiFanFan);

        var isNeiYuanBuKeJian;
        if (isClub)
            isNeiYuanBuKeJian = this.getBoolItem("isNeiYuanBuKeJian", false);
        else
            isNeiYuanBuKeJian = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_neiYuanBuKeJian, false);
        this.neiYuanBuKeJian.setSelected(isNeiYuanBuKeJian);
        var text = this.neiYuanBuKeJian.getChildByName("text");
        this.selectedCB(text,isNeiYuanBuKeJian);

        var isSiShou;
        if (isClub)
            isSiShou = this.getBoolItem("isSiShou", true);
        else
            isSiShou = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_siShou, true);
        this.siShou.setSelected(isSiShou);
        var text = this.siShou.getChildByName("text");
        this.selectedCB(text,isSiShou);

        var fengDing;
        if (isClub)
            fengDing = this.getNumberItem("fengDing", 0);
        else
            fengDing = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_fengDing, 0);
        this.fengDingList_radio.selectItem(fengDing);
        this.radioBoxSelectCB(fengDing,this.fengDingList[fengDing],this.fengDingList);

        var qiHu;
        if (isClub)
            qiHu = this.getNumberItem("minHuXi", 0);
        else
            qiHu = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_qiHu, 0);
        this.qiHuList_radio.selectItem(qiHu);
        this.radioBoxSelectCB(qiHu,this.qiHuList[qiHu],this.qiHuList);

        var fanShen;
        if (isClub)
            fanShen = this.getNumberItem("fanShen", 1);
        else
            fanShen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_fanShen, 1);
        this.fanShenList_radio.selectItem(fanShen);
        this.radioBoxSelectCB(qiHu,this.fanShenList[fanShen],this.fanShenList);

        var qiePai;
        if (isClub)
            qiePai = [false, true].indexOf(this.getBoolItem("isManualCutCard", false));
        else
            qiePai = [false, true].indexOf(util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_qiePai, false));
        this.qiePaiList_radio.selectItem(qiePai);
        this.radioBoxSelectCB(qiePai,this.qiePaiList[qiePai],this.qiePaiList);

        var fanBei;
        var fanBeiIndex;
        if (isClub)
            fanBei = this.getNumberItem("fanBei", 0);
        else
            fanBei = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_fanBei, 0);
        fanBeiIndex = fanBei == 0 ? 0 : 1;
        this.fanBeiScore = fanBei == 0 ? (this.fanBeiScore ? this.fanBeiScore : util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_fanBeiScore, 50)) : fanBei;
        this.fanBeiList_radio.selectItem(fanBeiIndex);
        this.radioBoxSelectCB(fanBeiIndex,this.fanBeiList[fanBeiIndex],this.fanBeiList);
        this.setFanBeiButton(fanBeiIndex);
        if(isNaN(this.fanBeiScore)){
            this.fanBeiScore = 50;
        }
        this.score_text.setText(this.fanBeiScore + "分");

        var haiDiLao;
        if (isClub)
            haiDiLao = this.getNumberItem("haiDiLaoScore", 0);
        else
            haiDiLao = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_haiDiLao, 0);
        this.haiDiLaoList_radio.selectItem(haiDiLao);
        this.radioBoxSelectCB(haiDiLao,this.haiDiLaoList[haiDiLao],this.haiDiLaoList);

        var tuoGuan;
        if (isClub)
            tuoGuan = [-1, 60, 120, 180, 300].indexOf(this.getNumberItem("trustTime", -1));
        else
            tuoGuan = [-1, 60, 120, 180, 300].indexOf(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_tuoGuan, -1));
        this.tuoGuanList_radio.selectItem(tuoGuan);
        this.radioBoxSelectCB(tuoGuan,this.tuoGuanList[tuoGuan],this.tuoGuanList);

        this.setExtraPlayNodeCurrentSelect(isClub);

        // 这一行代码必须在最后，因为他会间接调用getSelectedPara
        this.changePayForPlayerNum(maxPlayer);
        this.checkSelect();
    },

    getSelectedPara:function()
    {
        var playerIdx = this.maxPlayerList_radio.getSelectIndex();
        var para = {};
        para.gameType = MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI;
        para.maxPlayer = [3, 2, 3][playerIdx];     // 人数
        para.convertible = this.maxPlayerList_radio.getSelectIndex() == 2;//自由人数
        //para.isMaiPai = (this.maxPlayerList_radio.getSelectIndex() != 0 && this.maiPai.isSelected());
        para.isBuKeChi = this.chiPai.isSelected();
        para.isBuKeChiDuiJia = this.chiPaiDuiJia.isSelected();
        para.isDaXiaoZiHu = this.daXiaoZiHu.isSelected();
        para.isTianHuBaoTing = this.tianHuBaoTing.isSelected();
        para.isMingTang = this.mingTang.isSelected();
        para.isHuaHu = this.huaHu.isSelected();
        para.isRandomZhuang = this.shouLunSuiJiZhuang.isSelected();
        para.isHuJiaYiXi = this.jiaXi.isSelected();
        para.isMenZiFanFan = this.menZiFanFan.isSelected();
        para.isNeiYuanBuKeJian = this.neiYuanBuKeJian.isSelected();
        para.isSiShou = this.siShou.isSelected();
        para.fengDing = this.fengDingList_radio.getSelectIndex();
        para.minHuXi = this.qiHuList_radio.getSelectIndex();
        para.fanShen = this.fanShenList_radio.getSelectIndex();
        para.isManualCutCard = [false, true][this.qiePaiList_radio.getSelectIndex()];
        if(isNaN(this.fanBeiScore)){
            this.fanBeiScore = 50;
        }
        para.fanBei = this.fanBeiList_radio.getSelectIndex() == 1 ? this.fanBeiScore : 0;
        para.haiDiLaoScore = this.haiDiLaoList_radio.getSelectIndex();
        para.maiPaiNum = playerIdx == 0 ? 0 : [0,10,20][this.maiPaiList_radio.getSelectIndex()];
        para.isMaiPai = para.maiPaiNum > 0;
        para.trustTime = [-1, 60, 120, 180, 300][this.tuoGuanList_radio.getSelectIndex()];

        this.getExtraSelectedPara(para);

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_maxPlayer, this.maxPlayerList_radio.getSelectIndex());
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_maiPai, para.isMaiPai);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_chiPai, para.isBuKeChi);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_chiPaiDuiJia, para.isBuKeChiDuiJia);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_daXiaoZiHu, para.isDaXiaoZiHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_tianHuBaoTing, para.isTianHuBaoTing);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_mingTang, para.isMingTang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_huaHu, para.isHuaHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_shouLunSuiJiZhuang, para.isRandomZhuang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_jiaXi, para.isHuJiaYiXi);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_menZiFanFan, para.isMenZiFanFan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_neiYuanBuKeJian, para.isNeiYuanBuKeJian);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_siShou, para.isSiShou);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_fengDing, para.fengDing);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_qiHu, para.minHuXi);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_fanShen, para.fanShen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIYANGWAIHUZI_qiePai, para.isManualCutCard);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_fanBei, para.fanBei);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_fanBeiScore, this.fanBeiScore);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_haiDiLao, this.haiDiLaoScore);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_maiPaiNum, para.maiPaiNum);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIYANGWAIHUZI_tuoGuan, para.trustTime);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }

});