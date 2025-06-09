
var CreateRoomNode_yiJiaoLaiYouHuBei = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_YIJIAOLAIYOU_laitype                   = "_YIJIAOLAIYOU_HUBEI_LAI_WAY";       		    //赖的方式
        this.localStorageKey.KEY_YIJIAOLAIYOU_yijiaolaiyou              = "_YIJIAOLAIYOU_HUBEI_YI_JIAO_LAI_YOU";        //一脚癞油
        this.localStorageKey.KEY_YIJIAOLAIYOU_diaoyu                    = "_YIJIAOLAIYOU_HUBEI_DIAO_YU";                //钓鱼(见字胡)
        this.localStorageKey.KEY_YIJIAOLAIYOU_gemogehu                  = "_YIJIAOLAIYOU_HUBEI_GE_MO_GE_HU";            //各摸各胡
        this.localStorageKey.KEY_YIJIAOLAIYOU_maima                     = "_YIJIAOLAIYOU_HUBEI_MAI_MA";                 //买马
        this.localStorageKey.KEY_YIJIAOLAIYOU_youzhongyou               = "_YIJIAOLAIYOU_HUBEI_YOU_ZHONG_YOU";          //油中油
        this.localStorageKey.KEY_YIJIAOLAIYOU_tuoguan                   = "_YIJIAOLAIYOU_HUBEI_tuoguan";                //托管
        this.localStorageKey.KEY_YIJIAOLAIYOU_isOpenTingTip             = "_YIJIAOLAIYOU_HUBEI_isOpenTingTip";          //是否开启听牌提示

        // 默认玩法（产品根据竞品删除的玩法，后面可能根据市场情况重新调整，所以暂不删除这些玩法）
        this.localStorageKey.KEY_YIJIAOLAIYOU_liangundaipa              = "_YIJIAOLAIYOU_HUBEI_LIAN_GUN_DAI_PA";        //连滚带爬
        this.localStorageKey.KEY_YIJIAOLAIYOU_silaixifen                = "_YIJIAOLAIYOU_HUBEI_SI_LAI_XI_FEN";          //4赖喜分
        this.localStorageKey.KEY_YIJIAOLAIYOU_qiangganghu               = "_YIJIAOLAIYOU_HUBEI_QIANG_GANG_HU";          //抢杠胡
        this.localStorageKey.KEY_YIJIAOLAIYOU_qianggangquanbao          = "_YIJIAOLAIYOU_HUBEI_QIANG_GANG_QUAN_BAO";    //抢杠全包
        this.localStorageKey.KEY_YIJIAOLAIYOU_youlaizikeqianggang       = "_YIJIAOLAIYOU_HUBEI_YOU_LAI_ZI_KE_QIANG_GANG"; //有赖子可抢杠
        this.localStorageKey.KEY_YIJIAOLAIYOU_piaofen 		            = "_YIJIAOLAIYOU_HUBEI_PIAO_FEN";               //飘分
        this.localStorageKey.KEY_YIJIAOLAIYOU_count                     = "_YIJIAOLAIYOU_HUBEI_COUNT";                  //有赖子可抢杠
        this.localStorageKey.KEY_YIJIAOLAIYOU_difen 		            = "_YIJIAOLAIYOU_HUBEI_DI_FEN";                 //底分
        this.localStorageKey.KEY_YIJIAOLAIYOU_fangGang                  = "_YIJIAOLAIYOU_HUBEI_FANG_GANG";              //放杠
        this.localStorageKey.KEY_YIJIAOLAIYOU_queyimen 		            = "_YIJIAOLAIYOU_HUBEI_QUE_YI_MEN";             //缺一门
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();
        //if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) this._costName = '房卡';
        this.bgNode = ccs.load("bg_yiJiaoLaiYou.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_yiJiaoLaiYou").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_yiJiaoLaiYou");
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

        // 喜分
        // this._playNode_silaiwuxi = _play.getChildByName("play_silaiwuxi");
        // this._playNode_xifen_5 = _play.getChildByName("play_xifen5");
        // this._playNode_xifen_10 = _play.getChildByName("play_xifen10");
        // var xiFenList = [];
        // xiFenList.push(this._playNode_silaiwuxi);
        // xiFenList.push(this._playNode_xifen_5);
        // xiFenList.push(this._playNode_xifen_10);
        // this._playNode_xiFen_radio = createRadioBoxForCheckBoxs(xiFenList, this.radioBoxSelectCB);
        // this.addListenerText(xiFenList, this._playNode_xiFen_radio);
        // this.xiFenList = xiFenList;

        // 飘分
        // this._playNode_piaofen1 = _play.getChildByName("play_piaofen1");
        // this._playNode_piaofen2 = _play.getChildByName("play_piaofen2");
        // this._playNode_piaofen3 = _play.getChildByName("play_piaofen3");
        // this._playNode_piaofen4 = _play.getChildByName("play_piaofen4");
        // this._playNode_bupiao = _play.getChildByName("play_bupiao");
        // this._playNode_ziyouxiapiao = _play.getChildByName("play_ziyouxiapiao");
        // var piaoFenList = [];
        // piaoFenList.push(this._playNode_piaofen1);
        // piaoFenList.push(this._playNode_piaofen2);
        // piaoFenList.push(this._playNode_piaofen3);
        // piaoFenList.push(this._playNode_piaofen4);
        // piaoFenList.push(this._playNode_bupiao);
        // piaoFenList.push(this._playNode_ziyouxiapiao);
        // this._playNode_piaoFen_radio = createRadioBoxForCheckBoxs(piaoFenList, this.radioBoxSelectCB);
        // this.addListenerText(piaoFenList, this._playNode_piaoFen_radio);
        // this.piaoFenList = piaoFenList;

        // 放杠
        // this._playNode_fangGang1=_play.getChildByName("fanggang1");
        // this._playNode_fangGang2=_play.getChildByName("fanggang2");
        // this._playNode_fangGang3=_play.getChildByName("fanggang3");
        // var fangGangList=[];
        // fangGangList.push(this._playNode_fangGang1);
        // fangGangList.push(this._playNode_fangGang2);
        // fangGangList.push(this._playNode_fangGang3);
        // this._playNode_fangGang_radio = createRadioBoxForCheckBoxs(fangGangList,this.radioBoxSelectCB);
        // this.addListenerText(fangGangList,this._playNode_fangGang_radio);
        // this.fangGangList=fangGangList;

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

        // 一脚赖油
        this._playNode_yijiaolaiyou = _play.getChildByName("play_yijiaolaiyou");
        this.addListenerText(this._playNode_yijiaolaiyou);
        this._playNode_yijiaolaiyou.addEventListener(this.clickCB, this._playNode_yijiaolaiyou);

        // 钓鱼（见字胡）
        this._playNode_diaoyu = _play.getChildByName("play_diaoyu");
        this.addListenerText(this._playNode_diaoyu);
        this._playNode_diaoyu.addEventListener(this.clickCB, this._playNode_diaoyu);

        // 各摸各胡
        this._playNode_gemogehu = _play.getChildByName("play_gemogehu");
        this.addListenerText(this._playNode_gemogehu);
        this._playNode_gemogehu.addEventListener(this.clickCB, this._playNode_gemogehu);

        // 买马
        this._playNode_maima = _play.getChildByName("play_maima");
        this.addListenerText(this._playNode_maima);
        this._playNode_maima.addEventListener(this.clickCB, this._playNode_maima);
        this._playNode_maima.schedule(function() {
            this._playNode_maima.setVisible(this._playNode_maxPlayer0.isSelected() || this._playNode_maxPlayer3.isSelected());
        }.bind(this));

        // 油中油
        this._playNode_youzhongyou = _play.getChildByName("play_youzhongyou");
        this.addListenerText(this._playNode_youzhongyou);
        this._playNode_youzhongyou.addEventListener(this.clickCB, this._playNode_youzhongyou);
        this._playNode_youzhongyou.schedule(function() {
            this._playNode_youzhongyou.setVisible(this._playNode_yilaidaodi.isSelected() || this._playNode_banlai.isSelected());
        }.bind(this));

        // 连滚带爬
        // this._playNode_liangundaipa = _play.getChildByName("play_liangundaipa");
        // this.addListenerText(this._playNode_liangundaipa);
        // this._playNode_liangundaipa.addEventListener(this.clickCB, this._playNode_liangundaipa);

        // 抢杠胡
        // this._playNode_qiangganghu = _play.getChildByName("play_qiangganghu");
        // this.addListenerText(this._playNode_qiangganghu);
        // this._playNode_qiangganghu.addEventListener(this.clickCB, this._playNode_qiangganghu);
        // this._playNode_qiangganghu.schedule(function() {
        //     this._playNode_qianggangquanbao.setVisible(this._playNode_qiangganghu.isSelected());
        //     this._playNode_youlaikeqianggang.setVisible(this._playNode_qiangganghu.isSelected());
        // }.bind(this));

        // 抢杠全包
        // this._playNode_qianggangquanbao = _play.getChildByName("play_qianggangquanbao");
        // this.addListenerText(this._playNode_qianggangquanbao);
        // this._playNode_qianggangquanbao.addEventListener(this.clickCB, this._playNode_qianggangquanbao);

        // 有赖子可抢杠
        // this._playNode_youlaikeqianggang = _play.getChildByName("play_youlaikeqianggang");
        // this.addListenerText(this._playNode_youlaikeqianggang);
        // this._playNode_youlaikeqianggang.addEventListener(this.clickCB, this._playNode_youlaikeqianggang);

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

        // 缺一门
        // this._playNode_queyimen = _play.getChildByName("play_queyimen");
        // this.addListenerText(this._playNode_queyimen);
        // this._playNode_queyimen.addEventListener(this.clickCB, this._playNode_queyimen);
        // this._playNode_queyimen.schedule(function() {
        //     this._playNode_queyimen.setVisible(this._playNode_maxPlayer1.isSelected() || 
        //                                         this._playNode_maxPlayer2.isSelected() ||
        //                                         this._playNode_maxPlayer3.isSelected());
        // }.bind(this));

        // 听牌提示
        var tingTipList = [];
        tingTipList.push(_play.getChildByName("tingTip1"));
        tingTipList.push(_play.getChildByName("tingTip2"));
        this.tingTipList_radio = createRadioBoxForCheckBoxs(tingTipList, this.radioBoxSelectCB);
        this.addListenerText(tingTipList, this.tingTipList_radio);
        this.tingTipList = tingTipList;

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
            _laiType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_laitype, 1);
        this._playNode_player_type_radio.selectItem(_laiType);
        this.radioBoxSelectCB(_laiType, this.laiList[_laiType], this.laiList);

        // 喜分
        // var xifen;
        // if (isClub)
        //     xifen = [0,5,10].indexOf(this.getNumberItem("xiFen", 10));
        // else
        //     xifen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_silaixifen, 2);
        // this._playNode_xiFen_radio.selectItem(xifen);
        // this.radioBoxSelectCB(xifen, this.xiFenList[xifen], this.xiFenList);

        // 放杠
        // var fangGang;
        // if (isClub)
        //     fangGang = [1,2,3].indexOf(this.getNumberItem("fangGang", 1));
        // else
        //     fangGang = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_fangGang, 0);
        // this._playNode_fangGang_radio.selectItem(fangGang);
        // this.radioBoxSelectCB(fangGang,this.fangGangList[fangGang],this.fangGangList);

        // 飘分
        // var piaofen;
        // if (isClub)
        //     piaofen = [1,2,3,4,0,6].indexOf(this.getNumberItem("piaoFen", 1));
        // else
        //     piaofen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_piaofen, 0);
        // this._playNode_piaoFen_radio.selectItem(piaofen);
        // this.radioBoxSelectCB(piaofen, this.piaoFenList[piaofen], this.piaoFenList);

        // 一脚癞油
        var _yijiaolaiyou;
        if (isClub)
            _yijiaolaiyou = this.getBoolItem("yijiaolaiyou", true);
        else
            _yijiaolaiyou = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_yijiaolaiyou, true);
        this._playNode_yijiaolaiyou.setSelected(_yijiaolaiyou);
        var text = this._playNode_yijiaolaiyou.getChildByName("text");
        this.selectedCB(text, _yijiaolaiyou);

        // 钓鱼（见字胡）
        var diaoyu;
        if (isClub)
            diaoyu = this.getBoolItem("diaoYu", false);
        else
            diaoyu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_diaoyu, false);
        this._playNode_diaoyu.setSelected(diaoyu);
        var text = this._playNode_diaoyu.getChildByName("text");
        this.selectedCB(text, diaoyu);

        // 各摸各胡
        var _gemogehu;
        if (isClub)
            _gemogehu = this.getBoolItem("gemogehu", false);
        else
            _gemogehu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_gemogehu, false);
        this._playNode_gemogehu.setSelected(_gemogehu);
        var text = this._playNode_gemogehu.getChildByName("text");
        this.selectedCB(text, _gemogehu);

        // 买马
        var _maima;
        if (isClub)
            _maima = this.getBoolItem("maima", false);
        else
            _maima = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_maima, false);
        this._playNode_maima.setSelected(_maima);
        var text = this._playNode_maima.getChildByName("text");
        this.selectedCB(text, _maima);

        // 油中油
        var _youzhongyou;
        if (isClub)
            _youzhongyou = this.getBoolItem("youzhongyou", false);
        else
            _youzhongyou = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_youzhongyou, false);
        this._playNode_youzhongyou.setSelected(_youzhongyou);
        var text = this._playNode_youzhongyou.getChildByName("text");
        this.selectedCB(text, _youzhongyou);

        // 连滚带爬 
        // var liangundaipa;
        // if (isClub)
        //     liangundaipa = this.getBoolItem("lianGunDaiPa", false);
        // else
        //     liangundaipa = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_liangundaipa, false);
        // this._playNode_liangundaipa.setSelected(liangundaipa);
        // var text = this._playNode_liangundaipa.getChildByName("text");
        // this.selectedCB(text, liangundaipa);

        // 抢杠胡
        // var qiangganghu;
        // if (isClub)
        //     qiangganghu = this.getBoolItem("qiangGangHu", true);
        // else
        //     qiangganghu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_qiangganghu, true);
        // this._playNode_qiangganghu.setSelected(qiangganghu);
        // var text = this._playNode_qiangganghu.getChildByName("text");
        // this.selectedCB(text, qiangganghu);

        // 抢杠包胡
        // var qianggangquanbao;
        // if (isClub)
        //     qianggangquanbao = this.getBoolItem("qiangGangQuanBao", true);
        // else
        //     qianggangquanbao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_qianggangquanbao, true);
        // this._playNode_qianggangquanbao.setSelected(qianggangquanbao);
        // var text = this._playNode_qianggangquanbao.getChildByName("text");
        // this.selectedCB(text, qianggangquanbao);

        // 有癞子可抢杠
        // var youlaizikeqianggang;
        // if (isClub)
        //     youlaizikeqianggang = this.getBoolItem("hasLaiCanQiang", true);
        // else
        //     youlaizikeqianggang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_youlaizikeqianggang, true);
        // this._playNode_youlaikeqianggang.setSelected(youlaizikeqianggang);
        // var text = this._playNode_youlaikeqianggang.getChildByName("text");
        // this.selectedCB(text, youlaizikeqianggang);

        //人数
        var _currentCount;
        if (isClub) {
            if (this.getBoolItem("convertible", false))
                _currentCount = 3;
            else
                _currentCount = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        }
        else
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_count, 0);
        cc.log("_currentCount renshu  == " + _currentCount)
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);

        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_tuoguan, 0);
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

        // var queyimen;
        // if (isClub)
        //     queyimen = this.getBoolItem("queYiMen", false);
        // else
        //     queyimen = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_queyimen, false);
        // this._playNode_queyimen.setSelected(queyimen);
        // var text = this._playNode_queyimen.getChildByName("text");
        // this.selectedCB(text, queyimen);

        if (isClub)
            this._zhuIdx = this.getNumberItem("difen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_difen, 1);
        if (this._ZhuNum)
            this._ZhuNum.setString(this._zhuIdx + "");

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
        para.gameType = MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU;
        para.maxPlayer = 4;
        para.difen = this._zhuIdx;
        para.convertible = false; // 是否自由人数
        para.trustTime = 0; // 托管
        para.laiType = 2;

        // para.xiFen = 10;
        // para.fangGang = 1;
        // para.piaoFen = 1;

        if (this._playNode_wulaidaodi.isSelected()) {
            para.laiType = 0;
        } else if (this._playNode_yilaidaodi.isSelected()) {
            para.laiType = 1;
        } else if (this._playNode_lianglaikehu.isSelected()) {
            para.laiType = 2;
        } else if (this._playNode_banlai.isSelected()) {
            para.laiType = 3;
        }

        // var xiFenIndex;
        // if (this._playNode_silaiwuxi.isSelected()) {
        //     para.xiFen = 0;
        //     xiFenIndex = 0;
        // } else if (this._playNode_xifen_5.isSelected()) {
        //     para.xiFen = 5;
        //     xiFenIndex = 1;
        // } else if (this._playNode_xifen_10.isSelected()) {
        //     para.xiFen = 10;
        //     xiFenIndex = 2;
        // }

        // var fangGangIndex;
        // if(this._playNode_fangGang1.isSelected())
        // {
        //     para.fangGang=1;
        //     fangGangIndex=0;
        // }else if(this._playNode_fangGang2.isSelected())
        // {
        //     para.fangGang=2;
        //     fangGangIndex=1;
        // }else if(this._playNode_fangGang3.isSelected())
        // {
        //     para.fangGang=3;
        //     fangGangIndex=2;
        // }

        // var piaoFenIndex;
        // if (this._playNode_piaofen1.isSelected()) {
        //     para.piaoFen = 1;
        //     piaoFenIndex = 0;
        // } else if (this._playNode_piaofen2.isSelected()) {
        //     para.piaoFen = 2;
        //     piaoFenIndex = 1;
        // } else if (this._playNode_piaofen3.isSelected()) {
        //     para.piaoFen = 3;
        //     piaoFenIndex = 2;
        // } else if (this._playNode_piaofen4.isSelected()) {
        //     para.piaoFen = 4;
        //     piaoFenIndex = 3;
        // } else if (this._playNode_bupiao.isSelected()) {
        //     para.piaoFen = 0;
        //     piaoFenIndex = 4;
        // } else if (this._playNode_ziyouxiapiao.isSelected()) {
        //     para.piaoFen = 6;
        //     piaoFenIndex = 5;
        // }

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

        para.yijiaolaiyou = this._playNode_yijiaolaiyou.isSelected();   // 一脚赖油
        para.diaoYu = this._playNode_diaoyu.isSelected();               // 钓鱼（见字胡）
        para.gemogehu = this._playNode_gemogehu.isSelected();         // 各摸各胡
        para.maima = this._playNode_maima.isSelected();                 // 买马
        para.youzhongyou = this._playNode_youzhongyou.isSelected();     // 油中油
        if (!this._playNode_yilaidaodi.isSelected() && !this._playNode_banlai.isSelected()) {
            para.youzhongyou = false;
        }

        // para.lianGunDaiPa = this._playNode_liangundaipa.isSelected(); //连滚带爬

        // para.qiangGangHu = this._playNode_qiangganghu.isSelected(); //抢杠胡
        // if(!this._playNode_qiangganghu.isSelected())
        // {
        //     para.qiangGangQuanBao = false;
        //     para.hasLaiCanQiang = false;
        // }
        // else {
        //     para.qiangGangQuanBao = this._playNode_qianggangquanbao.isSelected();
        //     para.hasLaiCanQiang = this._playNode_youlaikeqianggang.isSelected();
        // }

        // para.queYiMen = this._playNode_queyimen.isSelected(); //缺一门
        // if(!this._playNode_maxPlayer1.isSelected() && 
        //     !this._playNode_maxPlayer2.isSelected() &&
        //     !this._playNode_maxPlayer3.isSelected())
        // {
        //     para.queYiMen = false;
        // }

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
        if (para.maxPlayer < 4) {
            para.maima = false;
        }

        para.isOpenTingTip = this.tingTipList[0].isSelected();

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_laitype, para.laiType);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_count, _countIdx);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_yijiaolaiyou, para.yijiaolaiyou);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_diaoyu, para.diaoYu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_gemogehu, para.gemogehu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_maima, para.maima);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_youzhongyou, para.youzhongyou);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_tuoguan, para.trustTime);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_difen, para.difen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_isOpenTingTip, para.isOpenTingTip);
            // util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_silaixifen, xiFenIndex);
            // util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_piaofen, piaoFenIndex);
            // util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_YIJIAOLAIYOU_fangGang, fangGangIndex);
            // util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_liangundaipa, para.lianGunDaiPa);
            // util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_qiangganghu, para.qiangGangHu);
            // util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_qianggangquanbao, para.qiangGangQuanBao);
            // util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_youlaizikeqianggang, para.hasLaiCanQiang);
            // util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_YIJIAOLAIYOU_queyimen, para.queYiMen);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});