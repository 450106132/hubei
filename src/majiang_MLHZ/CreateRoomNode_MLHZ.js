/**
 * Created by maoyu on 2017/7/21.
 */

var CreateRoomNode_MLHZ = CreateRoomNode.extend({
    setKey: function() {
        this.localStorageKey.KEY_MLHZ_niaoTpye                  = "_MLHZ_NIAO_WAY";       		//鸟的方式
        this.localStorageKey.KEY_MLHZ_dianpaohu                 = "_MLHZ_DIAN_PAO_HU";       	//点炮胡
        this.localStorageKey.KEY_MLHZ_qiangganghu               = "_MLHZ_QIANG_GANG_HU";       	//抢杠胡
        this.localStorageKey.KEY_MLHZ_qianggangquanbao          = "_MLHZ_QIANG_GANG_QUAN_BAO";  //抢杠全包
        this.localStorageKey.KEY_MLHZ_8hongzhong                = "_MLHZ_8_HONG_ZHONG";       	//8红中
        this.localStorageKey.KEY_MLHZ_is7dui                    = "_MLHZ_IS_7_DUI";       		//七对可胡
        this.localStorageKey.KEY_MLHZ_youhongzhongbujiepao      = "_MLHZ_HONG_ZHONG_BU_JIE_PAO";//有红中不接炮
        this.localStorageKey.KEY_MLHZ_wuhongzhongjiabeiType     = "_MLHZ_WU_HONG_ZHONG_JIA_BEI_TYPE";// 0 (无红中底分加倍) 1 (无红中总分加倍)
        this.localStorageKey.KEY_MLHZ_youhongzhongkeqiangganghu = "_MLHZ_YOU_HONG_ZHONG_KE_QIANG_GANG_HU";//有红中可抢杠胡
        this.localStorageKey.KEY_MLHZ_wuhongzhongjia2niao       = "_MLHZ_WU_HONG_ZHONG_JIA_2_NIAO";  //无红中加2鸟
        this.localStorageKey.KEY_MLHZ_count 					= "_MLHZ_COUNT"; 				//人数
        this.localStorageKey.KEY_MLHZ_hongzhongkehu 			= "_MLHZ_HONG_ZHONG_KE_HU"; 	// 四红中可胡
        this.localStorageKey.KEY_MLHZ_niaofen 					= "_MLHZ_NIAO_FEN"; 			// 中鸟得分
        this.localStorageKey.KEY_MLHZ_isDuoHu                   = "_MLHZ_IS_DUO_HU";            //是否多胡
        this.localStorageKey.KEY_MLHZ_difen 					= "_MLHZ_difen"; 				//底分
        this.localStorageKey.KEY_MLHZ_piaofen                   = "_MLHZ_piaofen";                //飘分
        this.localStorageKey.KEY_MLHZ_bihu 					    = "_MLHZ_BI_HU"; 			// 有胡必胡
        this.localStorageKey.KEY_MLHZ_zhuangxianfen 		    = "_MLHZ_zhuangxianfen"; 				//庄闲分
        this.localStorageKey.KEY_MLHZ_dahujiafen                = "_MLHZ_dahujiafen";       // 胡七对、碰碰胡、天胡、清一色加1分
        this.localStorageKey.KEY_MLHZ_buZhongSuanQuanZhong      = "_MLZH_buZhongSuanQuanZhong"; //不中算全中（抓鸟）
        this.localStorageKey.KEY_MLHZ_quanzhongfanbei           = "_MLZH_quanzhongfanbei"; //全中翻倍（抓鸟）
        this.localStorageKey.KEY_MLHZ_tuoguan                   = "_MLZH_tuoguan";               //托管
        this.localStorageKey.KEY_MLHZ_isOpenTingTip             = "_MLZH_isOpenTingTip";    //是否开启听牌提示
        this.localStorageKey.KEY_MLHZ_piaoNiao                  = "_MLZH_piaoNiao";          //围一飘鸟
        this.localStorageKey.KEY_MLHZ_dianpaofen                = "_MLZH_dianpaofen";          //点炮分
        this.localStorageKey.KEY_MLHZ_zimofen                   = "_MLZH_zimofen";          //自摸分
        this.localStorageKey.KEY_MLHZ_zuoZhuang                 ="_MLZH_zuoZhuang";    //0 随机， 1 先进来
        this.localStorageKey.KEY_MLHZ_fanbei                    = "_MLZH_FAN_BEI";  //大结算翻倍
        this.localStorageKey.KEY_MLHZ_fanbeiscore               = "_MLZH_FAN_BEI_SCORE";  //少于X分大结算翻倍
        this.localStorageKey.KEY_MLHZ_zhua1zhong10              = "_MLHZ_zhua_1_zhong_10";  //抓1中十鸟

        this.localStorageKey.KEY_MLHZ_huangZhuangGang           = "_MLZH_HUANG_ZHUANG_GANG";          //荒庄杠
        this.localStorageKey.KEY_MLHZ_buKePeng                  = "_MLZH_BU_KE_PENG";          //不可碰
        this.localStorageKey.KEY_MLHZ_huQingYiSeQiDuiJia2Niao   = "_MLZH_HU_QING_YI_SE_QI_DUI_JIA_2_NIAO";  //胡清一色或七对加2鸟
        this.localStorageKey.KEY_MLHZ_zhongHongZhongSuan12      = "_MLZH_ZHONG_HONG_ZHONG_SUAN_12";  //中红中算12

        this.localStorageKey.KEY_MLHZ_queYiMen                  = "_MLHZ_QUE_YI_MKEN";         //缺一门
        this.localStorageKey.KEY_MLHZ_trustWhole                = "_MLHZ_trustWhole";          // 整局托管
        this.localStorageKey.KEY_MLHZ_trustWay                  = "_MLHZ_trustWay";           // 托管方式
        
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
            this.setKey();

        //if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) this._costName = '房卡';
        this.bgNode = ccs.load("bg_MLHZ.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_MLHZ").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_MLHZ");
    },
    initPlayNode: function() {
        var _bgMLHZNode = this.bg_node;

        //抓鸟类型
        var _play = _bgMLHZNode.getChildByName("play");
        this._playNode_niaoType_0 = _play.getChildByName("zhuaniao0");
        this._playNode_niaoType_1 = _play.getChildByName("zhuaniao1");
        this._playNode_niaoType_5 = _play.getChildByName("zhuaniao5");


        var nodeList1 = [];
        nodeList1.push(_play.getChildByName("zhuaniao0"));
        nodeList1.push(_play.getChildByName("zhuaniao1"));
        nodeList1.push(_play.getChildByName("zhuaniao5"));

        this._playNode_player_type_radio = createRadioBoxForCheckBoxs(nodeList1, this.radioBoxSelectCB);
        this.addListenerText(nodeList1, this._playNode_player_type_radio);
        this.niaoList = nodeList1;

        var nodeList234 = [];
        this._playNode_niaoType_2 = _play.getChildByName("zhongNiao159").getChildByName("zhuaniao2");
        this._playNode_niaoType_3 = _play.getChildByName("zhongNiao159").getChildByName("zhuaniao3");
        this._playNode_niaoType_4 = _play.getChildByName("zhongNiao159").getChildByName("zhuaniao4");
        nodeList234.push(_play.getChildByName("zhongNiao159").getChildByName("zhuaniao2"));
        nodeList234.push(_play.getChildByName("zhongNiao159").getChildByName("zhuaniao3"));
        nodeList234.push(_play.getChildByName("zhongNiao159").getChildByName("zhuaniao4"));
        //wj 添加湖北
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
            this._playNode_niaoType_9 = _play.getChildByName("zhongNiao159").getChildByName("zhuaniao9");
            nodeList234.push(_play.getChildByName("zhongNiao159").getChildByName("zhuaniao9"));
        }
        this._playNode_player_type_radio234 = createRadioBoxForCheckBoxs(nodeList234, this.radioBoxSelectCB);
        this.addListenerText(nodeList234, this._playNode_player_type_radio234);
        this.niaoList234 = nodeList234;

        this.zhuaNiao159 = _play.getChildByName("zhongNiao159");         //抓鸟159层
        this.quanZhong1Niao = _play.getChildByName("quanZhong1Niao");     //一鸟全中层


        this._playNode_niaoFen_1 = _play.getChildByName("zhongNiao159").getChildByName("niaofen1");
        this._playNode_niaoFen_2 = _play.getChildByName("zhongNiao159").getChildByName("niaofen2");
        var niaoFenList = [];
        niaoFenList.push(this._playNode_niaoFen_1);
        niaoFenList.push(this._playNode_niaoFen_2);
        this._playNode_niaoFen_radio = createRadioBoxForCheckBoxs(niaoFenList, this.radioBoxSelectCB);
        this.addListenerText(niaoFenList, this._playNode_niaoFen_radio);
        this.niaoFenList = niaoFenList;

        this._playNode_niaoFen_1NiaoQuanZhong_1 = _play.getChildByName("quanZhong1Niao").getChildByName("niaofen1");
        this._playNode_niaoFen_1NiaoQuanZhong_2 = _play.getChildByName("quanZhong1Niao").getChildByName("niaofen2");
        var niaoFenQuanZhongList = [];
        niaoFenQuanZhongList.push(this._playNode_niaoFen_1NiaoQuanZhong_1);
        niaoFenQuanZhongList.push(this._playNode_niaoFen_1NiaoQuanZhong_2);
        this._playNode_niaoFenQuanZhong_radio = createRadioBoxForCheckBoxs(niaoFenQuanZhongList, this.radioBoxSelectCB);
        this.addListenerText(niaoFenQuanZhongList, this._playNode_niaoFenQuanZhong_radio);
        this.niaoFenQuanZhongList = niaoFenQuanZhongList;

        this._playNode_zimo_1 = _play.getChildByName("play_zimo_2");
        this._playNode_zimo_2 = _play.getChildByName("play_zimo_4");
        var zimoList = [];
        zimoList.push(this._playNode_zimo_1);
        zimoList.push(this._playNode_zimo_2);
        this._playNode_zimo_radio = createRadioBoxForCheckBoxs(zimoList, this.radioBoxSelectCB);
        this.addListenerText(zimoList, this._playNode_zimo_radio);
        this.zimoList = zimoList;

        this._playNode_buZhongSuanQuanZhong = _play.getChildByName("zhongNiao159").getChildByName("buZhongSuanQuanZhong");
        this.addListenerText(this._playNode_buZhongSuanQuanZhong);
        this._playNode_buZhongSuanQuanZhong.addEventListener(this.clickCB, this._playNode_buZhongSuanQuanZhong);

        this._playNode_quanzhongfanbei = _play.getChildByName("zhongNiao159").getChildByName("quanzhongfanbei");
        this.addListenerText(this._playNode_quanzhongfanbei);
        this._playNode_quanzhongfanbei.addEventListener(this.clickCB, this._playNode_quanzhongfanbei);

        this.huQingYiSeQiDuiJia2Niao = _play.getChildByName("zhongNiao159").getChildByName("huQingYiSeQiDuiJia2Niao");
        this.addListenerText(this.huQingYiSeQiDuiJia2Niao);
        this.huQingYiSeQiDuiJia2Niao.addEventListener(this.clickCB, this.huQingYiSeQiDuiJia2Niao);

        this._playNode_dianpao = _play.getChildByName("play_dianpao");
        this.addListenerText(this._playNode_dianpao);
        this._playNode_dianpao.addEventListener(this.clickCB, this._playNode_dianpao);

        this._playNode_zhua1zhong10 = _play.getChildByName("quanZhong1Niao").getChildByName("zhua1zhong10");
        this.addListenerText(this._playNode_zhua1zhong10);
        this._playNode_zhua1zhong10.addEventListener(this.clickCB, this._playNode_zhua1zhong10);

        this.zhongHongZhongSuan12 = _play.getChildByName("quanZhong1Niao").getChildByName("zhongHongZhongSuan12");
        this.addListenerText(this.zhongHongZhongSuan12);
        this.zhongHongZhongSuan12.addEventListener(this.clickCB, this.zhongHongZhongSuan12);
        

        this._playNode_qiangganghu = _play.getChildByName("play_qiangganghu");
        this.addListenerText(this._playNode_qiangganghu);
        this._playNode_qiangganghu.addEventListener(this.clickCB, this._playNode_qiangganghu);

        this._playNode_youhongzhongkeqiangganghu = _play.getChildByName("play_youhongzhongkeqiangganghu");
        this.addListenerText(this._playNode_youhongzhongkeqiangganghu);
        this._playNode_youhongzhongkeqiangganghu.addEventListener(this.clickCB, this._playNode_youhongzhongkeqiangganghu);

        if(_play.getChildByName("play_queYiMen")){
            this._playNode_queyimen = _play.getChildByName("play_queYiMen");
            this.addListenerText(this._playNode_queyimen);
            this._playNode_queyimen.addEventListener(this.clickCB, this._playNode_queyimen); 
        }
            


        this._playNode_qianggangquanbao = _play.getChildByName("play_qianggangquanbao");
        this.addListenerText(this._playNode_qianggangquanbao);
        this._playNode_qianggangquanbao.addEventListener(this.clickCB, this._playNode_qianggangquanbao);


        this._playNode_hongzhong8 = _play.getChildByName("play_hongzhong8");
        this.addListenerText(this._playNode_hongzhong8);
        this._playNode_hongzhong8.addEventListener(this.clickCB, this._playNode_hongzhong8);

        this._playNode_qidui = _play.getChildByName("play_qidui");
        this.addListenerText(this._playNode_qidui);
        this._playNode_qidui.addEventListener(this.clickCB, this._playNode_qidui);

        this._playNode_youhongzhongbujiepao = _play.getChildByName("play_youhongzhongbujiepao");
        this.addListenerText(this._playNode_youhongzhongbujiepao);
        this._playNode_youhongzhongbujiepao.addEventListener(this.clickCB, this._playNode_youhongzhongbujiepao);

        this.play_huangZhuangGang = _play.getChildByName("play_huangZhuangGang");
        this.addListenerText(this.play_huangZhuangGang);
        this.play_huangZhuangGang.addEventListener(this.clickCB, this.play_huangZhuangGang);

        this.play_buKePeng = _play.getChildByName("play_buKePeng");
        this.addListenerText(this.play_buKePeng);
        this.play_buKePeng.addEventListener(this.clickCB, this.play_buKePeng);


        //新加飘分
        // this._playNode_piaofen = _play.getChildByName("play_piaofen");
        // var piaofenTextCallback = function(index){
        //     if(this._playNode_piaoNiao){
        //         if(this._playNode_piaofen.isSelected()){
        //             this._playNode_piaoNiao.setSelected(false);
        //         }
        //         this.clickCB(this._playNode_piaoNiao, ccui.CheckBox.EVENT_SELECTED);
        //     }
        //     this.clickCB(this._playNode_piaofen, ccui.CheckBox.EVENT_SELECTED);
        // }.bind(this);
        // this.addListenerText(this._playNode_piaofen, null, piaofenTextCallback);
        // this._playNode_piaofen.addEventListener(piaofenTextCallback, this._playNode_piaofen);  
        
        // 飘分 改版
        this._playNode_piaofen0 = _play.getChildByName("play_piaofen0");  
        this._playNode_piaofen1 = _play.getChildByName("play_piaofen1");
        this._playNode_piaofen2 = _play.getChildByName("play_piaofen2");
        this._playNode_piaofen3 = _play.getChildByName("play_piaofen3");
        this._playNode_piaofen4 = _play.getChildByName("play_piaofen4");
        this._playNode_piaofen5 = _play.getChildByName("play_piaofen5");
        var nodePiaofenList = [];
        nodePiaofenList.push(this._playNode_piaofen0);
        nodePiaofenList.push(this._playNode_piaofen1);
        nodePiaofenList.push(this._playNode_piaofen2);
        nodePiaofenList.push(this._playNode_piaofen3);
        nodePiaofenList.push(this._playNode_piaofen4);
        nodePiaofenList.push(this._playNode_piaofen5);
        this.nodePiaofenList = nodePiaofenList;
        var piaoFenCallback = function(index){
            this._playNode_player_piaofen_radio.selectItem(index);
            this.radioBoxSelectCB(index, this.nodePiaofenList[index], this.nodePiaofenList);
            if (index > 0) {
                if(this._playNode_piaoNiao){
                    if(this._playNode_piaoNiao.isSelected()){
                        this._playNode_piaoNiao.setSelected(false);
                    }
                    this.clickCB(this._playNode_piaoNiao, ccui.CheckBox.EVENT_SELECTED);
                }
            }
        }.bind(this);
        this._playNode_player_piaofen_radio = createRadioBoxForCheckBoxs(nodePiaofenList, function(index) {
            
            piaoFenCallback(index);
        }.bind(this));
        this.addListenerText(nodePiaofenList, this._playNode_player_piaofen_radio, piaoFenCallback);
        this._nodePiaofenList = nodePiaofenList;   

        //围一飘鸟
        this._playNode_piaoNiao = _play.getChildByName("play_piaoniao");
        var piaoNiaoTextCallback = function(index){
            piaoFenCallback(0);
            if(this._playNode_dianpaoerfen){
                if(this._playNode_piaoNiao.isSelected()){
                    this._playNode_dianpaoerfen.setSelected(false);
                }
                this.clickCB(this._playNode_dianpaoerfen, ccui.CheckBox.EVENT_SELECTED);
            }
            if(this._playNode_dianpaoyifen){
                if(this._playNode_piaoNiao.isSelected()){
                    this._playNode_dianpaoyifen.setSelected(false);
                }
                this.clickCB(this._playNode_dianpaoyifen, ccui.CheckBox.EVENT_SELECTED);
            }

            this.clickCB(this._playNode_piaoNiao, ccui.CheckBox.EVENT_SELECTED);
        }.bind(this);
        this.addListenerText(this._playNode_piaoNiao, null, piaoNiaoTextCallback);
        this._playNode_piaoNiao.addEventListener(piaoNiaoTextCallback, this._playNode_piaoNiao); 

        this._playNode_dianpaoyifen = _play.getChildByName("play_dianPao1");
        var dianPao1TextCallback = function(){
            if(this._playNode_piaoNiao){
                if(this._playNode_dianpaoyifen.isSelected()){
                    this._playNode_piaoNiao.setSelected(false);
                }
                this.clickCB(this._playNode_piaoNiao, ccui.CheckBox.EVENT_SELECTED);
            }
            if(this._playNode_dianpaoerfen){
                if(this._playNode_dianpaoyifen.isSelected()){
                    this._playNode_dianpaoerfen.setSelected(false);
                }
                this.clickCB(this._playNode_dianpaoerfen, ccui.CheckBox.EVENT_SELECTED);
            }

            this.clickCB(this._playNode_dianpaoyifen, ccui.CheckBox.EVENT_SELECTED);
        }.bind(this);
        this.addListenerText(this._playNode_dianpaoyifen, null, dianPao1TextCallback);
        this._playNode_dianpaoyifen.addEventListener(dianPao1TextCallback, this._playNode_dianpaoyifen); 

        this._playNode_dianpaoerfen = _play.getChildByName("play_dianPao2");
        var dianPao2TextCallback = function(){
            if(this._playNode_piaoNiao){
                if(this._playNode_dianpaoerfen.isSelected()){
                    this._playNode_piaoNiao.setSelected(false);
                }
                this.clickCB(this._playNode_piaoNiao, ccui.CheckBox.EVENT_SELECTED);
            }
            if(this._playNode_dianpaoyifen){
                if(this._playNode_dianpaoerfen.isSelected()){
                    this._playNode_dianpaoyifen.setSelected(false);
                }
                this.clickCB(this._playNode_dianpaoyifen, ccui.CheckBox.EVENT_SELECTED);
            }

            this.clickCB(this._playNode_dianpaoerfen, ccui.CheckBox.EVENT_SELECTED);
        }.bind(this);
        this.addListenerText(this._playNode_dianpaoerfen, null, dianPao2TextCallback);
        this._playNode_dianpaoerfen.addEventListener(dianPao2TextCallback, this._playNode_dianpaoerfen);

        // 无红中底分加倍   无红中总分加倍
        var huChiCheckBox = function (list) {
            var radio = createRadioBoxForCheckBoxsHuChi(list, function () {
                for(var i = 0; i < list.length; i++) {
                    this.clickCB(list[i], list[i].isSelected() ? ccui.CheckBox.EVENT_SELECTED : ccui.CheckBox.EVENT_UNSELECTED);
                }
            }.bind(this));
            for(var j = 0; j < list.length; j++) {
                let index = j;
                this.addListenerText(list[index], null, function() {
                    radio.selectItem(list[index].isSelected() ? index : -1);
                    for (var i = 0; i < list.length; i++) {
                        this.selectedCB(list[i].getChildByName("text"), list[i].isSelected());
                    }
                }.bind(this));
            }
            return radio;
        }.bind(this);
        this._playNode_whzdifenjiabei = _play.getChildByName("play_whzdifenjiabei");
        this._playNode_whzzongfenjiabei = _play.getChildByName("play_whzzongfenjiabei");
        var whzjiabeiList = [];
        whzjiabeiList.push(this._playNode_whzdifenjiabei);
        whzjiabeiList.push(this._playNode_whzzongfenjiabei);
        this._playNode_whzjiabei_radio = huChiCheckBox(whzjiabeiList);
        this.whzjiabeiList = whzjiabeiList;

        this._playNode_wuhongzhongjia2niao = _play.getChildByName("zhongNiao159").getChildByName("play_wuhongzhongjia2niao");
        this.addListenerText(this._playNode_wuhongzhongjia2niao);
        this._playNode_wuhongzhongjia2niao.addEventListener(this.clickCB, this._playNode_wuhongzhongjia2niao);
        this._playNode_wuhongzhongjia2niao.visible = false;

        this._playNode_hongzhongkehu = _play.getChildByName("play_hongzhongkehu");
        this.addListenerText(this._playNode_hongzhongkehu);
        this._playNode_hongzhongkehu.addEventListener(this.clickCB, this._playNode_hongzhongkehu);

        //有胡必胡
        this._playNode_biHuType = _play.getChildByName("play_bihu");
        if(!this._playNode_biHuType)
        {
            return MjClient.showToast("请添加，有胡必胡的开房选项UI")
        }
        this.addListenerText(this._playNode_biHuType);
        this._playNode_biHuType.addEventListener(this.clickCB, this._playNode_biHuType);

        this._playNode_dahujiafen = _play.getChildByName("play_dahujiafen");
        this.addListenerText(this._playNode_dahujiafen);
        this._playNode_dahujiafen.addEventListener(this.clickCB, this._playNode_dahujiafen);

        //人数
        this._playNode_maxPlayer0 = _play.getChildByName("play_count0");
        this._playNode_maxPlayer1 = _play.getChildByName("play_count1");
        this._playNode_maxPlayer2 = _play.getChildByName("play_count2");
        this._playNode_maxPlayer3 = _play.getChildByName("play_count3");
        this._playNode_maxPlayer4 = _play.getChildByName("play_count4");//自由人數2/3人
        var nodeCountList1 = [];
        nodeCountList1.push(_play.getChildByName("play_count0"));
        nodeCountList1.push(_play.getChildByName("play_count1"));
        nodeCountList1.push(_play.getChildByName("play_count2"));
        nodeCountList1.push(_play.getChildByName("play_count3"));
        nodeCountList1.push(_play.getChildByName("play_count4"));
		this.initPlayNumNode(nodeCountList1, [4, 3, 2, 4, 3]);
		
        cc.log("==== nodeCountList1 = " + JSON.stringify(nodeCountList1))
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
        this._playNode_player_tuoguan_radio = createRadioBoxForCheckBoxs(tuoguanNodeList, function(index){
            this.radioBoxSelectCB(index, tuoguanNodeList[index], tuoguanNodeList);
            this.setTrustWayPanel(index);
        }.bind(this));
        this.addListenerText(tuoguanNodeList, this._playNode_player_tuoguan_radio, this.setTrustWayPanel.bind(this));
        this.tuoguanNodeList = tuoguanNodeList;


         //一炮多响，截胡
        this._payDuoHuNode = _play.getChildByName("play_DuoHu");
        this.addListenerText(this._payDuoHuNode);
        this._payDuoHuNode.addEventListener(this.clickCB, this._payDuoHuNode);

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

        //听牌提示
        var tingTipList = [];
        tingTipList.push(_play.getChildByName("tingTip1"));
        tingTipList.push(_play.getChildByName("tingTip2"));
        this.tingTipList_radio = createRadioBoxForCheckBoxs(tingTipList, this.radioBoxSelectCB);
        this.addListenerText(tingTipList, this.tingTipList_radio);
        this.tingTipList = tingTipList;
        this.text_tishi = _play.getChildByName("text_tishi");

        this._zhuIdx = 1;
        this._ZhuNum = _bgMLHZNode.getParent().getChildByName("txt_fen");
        if (this._ZhuNum) {
            this._ZhuNum.setString(this._zhuIdx);
            this._Button_sub = _bgMLHZNode.getParent().getChildByName("btn_sub");
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
            this._Button_add = _bgMLHZNode.getParent().getChildByName("btn_add");
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

        //庄闲分
        this._playNode_zhuangxianfen = _play.getChildByName("play_zhuangxianfen");
        this.addListenerText(this._playNode_zhuangxianfen);
        this._playNode_zhuangxianfen.addEventListener(this.clickCB, this._playNode_zhuangxianfen);

        //坐庄
        var zuoZhuangList = [_play.getChildByName("zuoZhuang_1"), _play.getChildByName("zuoZhuang_2")];
        this.zuoZhuang_radio = createRadioBoxForCheckBoxs(zuoZhuangList,this.radioBoxSelectCB);
        this.addListenerText(zuoZhuangList, this.zuoZhuang_radio);

        // 大结算翻倍
        if (_play.getChildByName("play_nofanbei")) {
            var nodeListFanBei = [];
            nodeListFanBei.push(_play.getChildByName("play_nofanbei"));
            nodeListFanBei.push(_play.getChildByName("play_lessthan"));
            this.text_fanbei = _play.getChildByName("text_fanbei");
            this.fanbei_radio = createRadioBoxForCheckBoxs(nodeListFanBei, this.fanBeiRadioBoxSelectCB);
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

                    curScore -= 5;
                    if (curScore < 5) {
                        curScore = 100;
                    }

                    scoreLabel.setString(curScore + "分");
                }
            }, this);

            addButton.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var curScore = parseInt(scoreLabel.getString());

                    curScore += 5;
                    if (curScore > 100) {
                        curScore = 5;
                    }

                    scoreLabel.setString(curScore + "分");
                }
            }, this);
        }

        //所有的监听写在一个函数就好了
        this.schedule(function() {
            // this._playNode_niaoFen_1.setVisible(!this._playNode_niaoType_0.isSelected() && !this._playNode_niaoType_9.isSelected());
            // this._playNode_niaoFen_2.setVisible(!this._playNode_niaoType_0.isSelected() && !this._playNode_niaoType_9.isSelected());

            //抓鸟159层和一鸟全中层显示
            this.zhuaNiao159.visible = this._playNode_niaoType_5.isSelected();
            this.quanZhong1Niao.visible = this._playNode_niaoType_1.isSelected();

            //摸几奖几屏蔽两个按钮
            this._playNode_wuhongzhongjia2niao.visible = !this._playNode_niaoType_9.isSelected();
            this.huQingYiSeQiDuiJia2Niao.visible = !this._playNode_niaoType_9.isSelected();

            //隐藏的选项位置不留空，选项上移
            var offset = 0;
            if(this.quanZhong1Niao.isVisible())
            {
                offset = 120;
            }
            else if(!this.zhuaNiao159.isVisible() && !this.quanZhong1Niao.isVisible())
            {
                offset = 315;
            }

            for(var i = 0;i < this.nodeListFanBei.length;i++)
            {
                this.nodeListFanBei[i].y = -1320 + offset;
            }
            this.text_fanbei.y = -1320 + offset;

            for(var i = 0;i < this.tingTipList.length;i++)
            {
                this.tingTipList[i].y = -1382 + offset;
            }
            this.text_tishi.y = -1382 + offset;

            
            var isSelect234Niao =this._playNode_niaoType_2.isSelected() || this._playNode_niaoType_3.isSelected()
                || this._playNode_niaoType_4.isSelected() || this._playNode_niaoType_9.isSelected();
            var isShow = this._playNode_niaoType_5.isSelected();
            // this._playNode_niaoType_2.visible = isShow;
            // this._playNode_niaoType_3.visible = isShow;
            // this._playNode_niaoType_4.visible = isShow;
            if ( !isSelect234Niao && isShow) {
                this._playNode_niaoType_2.setSelected(true);
                this.selectedCB(this._playNode_niaoType_2.getChildByName("text"), true);
            }

            //
            // this._playNode_buZhongSuanQuanZhong.setVisible(isShow);
            // this._playNode_quanzhongfanbei.setVisible(isShow);
            // this._playNode_wuhongzhongjia2niao.setVisible(isShow);

            // this._playNode_zhua1zhong10.setVisible(this._playNode_niaoType_1.isSelected());

            this._playNode_youhongzhongkeqiangganghu.setVisible(this._playNode_qiangganghu.isSelected());
            this._playNode_qianggangquanbao.setVisible(this._playNode_qiangganghu.isSelected());
            this._playNode_youhongzhongbujiepao.setVisible(this._playNode_dianpao.isSelected());
            // var _visible = this._playNode_niaoType_2.isSelected() || this._playNode_niaoType_3.isSelected() || this._playNode_niaoType_4.isSelected();
            this._playNode_dianpaoyifen.setVisible(this._playNode_dianpao.isSelected());
            this._playNode_dianpaoerfen.setVisible(this._playNode_dianpao.isSelected());

            this._playNode_hongzhongkehu.setVisible(!this._playNode_hongzhong8.isSelected());

            if (!this._playNode_piaoNiao.isSelected() && !this._playNode_dianpaoyifen.isSelected() && !this._playNode_dianpaoerfen.isSelected()) {
                this._playNode_dianpaoerfen.setSelected(true);
            }



        }.bind(this));

        //托管方式
        if(MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() && _play.getChildByName("tuoguanType_0")){
            this.trustWatTitle = _play.getChildByName("img_tuoGuanFangShiTip");
            this._playNode_tuoguanWay0 = _play.getChildByName("tuoguanType_0");
            this._playNode_tuoguanWay1 = _play.getChildByName("tuoguanType_1");
            this._playNode_tuoguanWay2 = _play.getChildByName("tuoguanType_2");
            var tuoguanWayNodeList = [];
            tuoguanWayNodeList.push(_play.getChildByName("tuoguanType_0"));
            tuoguanWayNodeList.push(_play.getChildByName("tuoguanType_1"));
            tuoguanWayNodeList.push(_play.getChildByName("tuoguanType_2"));
            this._playNode_player_tuoguanType_radio = createRadioBoxForCheckBoxs(tuoguanWayNodeList, this.radioBoxSelectCB);
            this.addListenerText(tuoguanWayNodeList, this._playNode_player_tuoguanType_radio);
            this.tuoguanWayNodeList = tuoguanWayNodeList;
        }
    },

    setTrustWayPanel: function(trustTimeIdx){
        if(!this.tuoguanWayNodeList) return;
        this.trustWatTitle.visible = trustTimeIdx != 0;
        for(var i = 0; i < this.tuoguanWayNodeList.length; i++){
            this.tuoguanWayNodeList[i].visible =  trustTimeIdx != 0;
        }
    },

    setPlayNodeCurrentSelect: function(isClub) {
        var _play = this.bg_node.getChildByName("play");
        
        var _niaoType;
        if (isClub)
            _niaoType = this.getNumberItem("zhuaniao", 0);
        else
            _niaoType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_niaoTpye, 0);
        this._playNode_niaoType_0.setSelected(false);
        this.selectedCB(this._playNode_niaoType_0.getChildByName("text"), false);
        this._playNode_niaoType_1.setSelected(false);
        this.selectedCB(this._playNode_niaoType_1.getChildByName("text"), false);
        this._playNode_niaoType_2.setSelected(false);
        this.selectedCB(this._playNode_niaoType_2.getChildByName("text"), false);
        this._playNode_niaoType_3.setSelected(false);
        this.selectedCB(this._playNode_niaoType_3.getChildByName("text"), false);
        this._playNode_niaoType_4.setSelected(false);
        this.selectedCB(this._playNode_niaoType_4.getChildByName("text"), false);
        if(this._playNode_niaoType_9){
            this._playNode_niaoType_9.setSelected(false);
            this.selectedCB(this._playNode_niaoType_9.getChildByName("text"), false);
        }

        var index = 0;
        var btn_zhuaniao;
        var is159niao = false;
        if (_niaoType == 0) {
            btn_zhuaniao=this._playNode_niaoType_0;
            
        } else if (_niaoType == 1) {
            btn_zhuaniao=this._playNode_niaoType_1;
            
        } else if (_niaoType == 2) {
            btn_zhuaniao=this._playNode_niaoType_2;
            is159niao = true;
        } else if (_niaoType == 4) {
            btn_zhuaniao=this._playNode_niaoType_3;
            is159niao = true;
        } else if (_niaoType == 6) {
            btn_zhuaniao=this._playNode_niaoType_4;
            is159niao = true;
        }else if(_niaoType == 9 && this._playNode_niaoType_9){
            btn_zhuaniao = this._playNode_niaoType_9;
            is159niao = true;
        }
        btn_zhuaniao.setSelected(true);
        var text = btn_zhuaniao.getChildByName("text");
        this.selectedCB(text, btn_zhuaniao);
        this._playNode_niaoType_5.setSelected(is159niao);
        if (is159niao) {
            var text = this._playNode_niaoType_5.getChildByName("text");
            this.selectedCB(text, true);
        }
        this.selectedCB(this._playNode_niaoType_5.getChildByName("text"), this._playNode_niaoType_5.isSelected());
        

        var niaofen;
        if (isClub)
            niaofen = this.getNumberItem("niaofen", 2);
        else
            niaofen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_niaofen, 2);
        var niaofenIndex = niaofen - 1;
        this._playNode_niaoFen_radio.selectItem(niaofenIndex);
        this.radioBoxSelectCB(niaofenIndex, this.niaoFenList[niaofenIndex], this.niaoFenList);
        this._playNode_niaoFenQuanZhong_radio.selectItem(niaofenIndex);
        this.radioBoxSelectCB(niaofenIndex, this.niaoFenQuanZhongList[niaofenIndex], this.niaoFenQuanZhongList);

        var zimo;
        if (isClub)
            zimo = [2, 4].indexOf(this.getNumberItem("zimo", 2));
        else
            zimo = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_zimofen, 0);
        this._playNode_zimo_radio.selectItem(zimo);
        this.radioBoxSelectCB(zimo, this.zimoList[zimo], this.zimoList);

        var buZhongSuanQuanZhong;
        if (isClub)
            buZhongSuanQuanZhong = this.getBoolItem("buzhongsuanquanzhong", false);
        else
            buZhongSuanQuanZhong = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_buZhongSuanQuanZhong, false);
        this._playNode_buZhongSuanQuanZhong.setSelected(buZhongSuanQuanZhong);
        var text = this._playNode_buZhongSuanQuanZhong.getChildByName("text");
        this.selectedCB(text, buZhongSuanQuanZhong)

        var huQingYiSeQiDuiJia2Niao;
        if (isClub)
            huQingYiSeQiDuiJia2Niao = this.getBoolItem("huQingYiSeQiDuiJia2Niao", false);
        else
            huQingYiSeQiDuiJia2Niao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_huQingYiSeQiDuiJia2Niao, false);
        this.huQingYiSeQiDuiJia2Niao.setSelected(huQingYiSeQiDuiJia2Niao);
        var text = this.huQingYiSeQiDuiJia2Niao.getChildByName("text");
        this.selectedCB(text, huQingYiSeQiDuiJia2Niao)

        var quanzhongfanbei;
        if (isClub)
            quanzhongfanbei = this.getBoolItem("quanzhongfanbei", false);
        else
            quanzhongfanbei = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_quanzhongfanbei, false);
        this._playNode_quanzhongfanbei.setSelected(quanzhongfanbei);
        var text = this._playNode_quanzhongfanbei.getChildByName("text");
        this.selectedCB(text, quanzhongfanbei);

        var huangZhuangGang;
        if (isClub)
            huangZhuangGang = this.getBoolItem("huangZhuangGang", false);
        else
            huangZhuangGang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_huangZhuangGang, false);
        this.play_huangZhuangGang.setSelected(huangZhuangGang);
        var text = this.play_huangZhuangGang.getChildByName("text");
        this.selectedCB(text, huangZhuangGang);

        var buKePeng;
        if (isClub)
            buKePeng = this.getBoolItem("buKePeng", false);
        else
            buKePeng = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_buKePeng, false);
        this.play_buKePeng.setSelected(buKePeng);
        var text = this.play_buKePeng.getChildByName("text");
        this.selectedCB(text, buKePeng);

        if (isClub)
            this._dianpao = this.getBoolItem("dianpao", true);
        else
            this._dianpao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_dianpaohu, true);
        this._playNode_dianpao.setSelected(this._dianpao);
        var text = this._playNode_dianpao.getChildByName("text");
        this.selectedCB(text, this._dianpao);

        

        //新加飘分
        if (isClub){
            this._piaofen = this.getNumberItem("piaofen", 0);
            var _oldData = this.getNumberItem("jiapiao", 0);
            if (_oldData) {
                this._piaofen = 4 ;
            }
        }
        else
            this._piaofen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_piaofen, 0);
        this._playNode_player_piaofen_radio.selectItem(this._piaofen);
        this.radioBoxSelectCB(this._piaofen, this.nodePiaofenList[this._piaofen], this.nodePiaofenList);
        // this._playNode_piaofen.setSelected(this._piaofen);
        // var text = this._playNode_piaofen.getChildByName("text");
        // this.selectedCB(text, this._dpiaofen)


        if(isClub){
            this._piaoNiao = this.getBoolItem("piaoniao", false);
        }else{
            this._piaoNiao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_piaoNiao, false);
        }
        this._piaoNiao = this._piaoNiao && !this._jiaPiao;
        this._playNode_piaoNiao.setSelected(this._piaoNiao);
        var text = this._playNode_piaoNiao.getChildByName("text");
        this.selectedCB(text,this._piaoNiao);

        if(isClub){
            this._dianpaofen = this.getNumberItem("dianpaofen", 2);
        }else{
            this._dianpaofen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_dianpaofen, 2);
        }
        this._dianpaofen = !this._piaoNiao && this._dianpaofen;
        var nodeDPF;
        this._playNode_dianpaoyifen.setSelected(false);
        this._playNode_dianpaoerfen.setSelected(false);
        if (this._dianpaofen == 1) {
            this._playNode_dianpaoyifen.setSelected(true);
            this._playNode_piaoNiao.setSelected(false);
            var text = this._playNode_dianpaoyifen.getChildByName("text");
            this.selectedCB(text,this._playNode_dianpaoyifen);
        }else if(this._dianpaofen == 2){
            this._playNode_dianpaoerfen.setSelected(true);
            this._playNode_piaoNiao.setSelected(false);
            var text = this._playNode_dianpaoerfen.getChildByName("text");
            this.selectedCB(text,this._playNode_dianpaoerfen);
        }

        if (isClub)
            this._qiangganghu = this.getBoolItem("qianggang", true);
        else
            this._qiangganghu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_qiangganghu, true);
        this._playNode_qiangganghu.setSelected(this._qiangganghu);
        var text = this._playNode_qiangganghu.getChildByName("text");
        this.selectedCB(text, this._playNode_qiangganghu.isSelected());

        var youhongzhongkeqiangganghu;
        if (isClub)
            youhongzhongkeqiangganghu = this.getBoolItem("youhongzhongkeqiangganghu", true);
        else
            youhongzhongkeqiangganghu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_youhongzhongkeqiangganghu, true);
        this._playNode_youhongzhongkeqiangganghu.setSelected(youhongzhongkeqiangganghu);
        var text = this._playNode_youhongzhongkeqiangganghu.getChildByName("text");
        this.selectedCB(text, this._playNode_youhongzhongkeqiangganghu.isSelected());
        
        if (isClub)
            this._qianggangquanbao = this.getBoolItem("qianggangquanbao", false);
        else
            this._qianggangquanbao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_qianggangquanbao, false);
        this._playNode_qianggangquanbao.setSelected(this._qianggangquanbao);
        var text = this._playNode_qianggangquanbao.getChildByName("text");
        this.selectedCB(text,this._qianggangquanbao)

        var _8hongzhong;
        if (isClub)
            _8hongzhong = this.getBoolItem("hongzhong8", false);
        else
            _8hongzhong = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_8hongzhong, false);
        this._playNode_hongzhong8.setSelected(_8hongzhong);
        var text = this._playNode_hongzhong8.getChildByName("text");
        this.selectedCB(text,_8hongzhong)

        if (isClub)
            this._is7dui = this.getBoolItem("qidui", true);
        else
            this._is7dui = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_is7dui, true);
        this._playNode_qidui.setSelected(this._is7dui);
        var text = this._playNode_qidui.getChildByName("text");
        this.selectedCB(text, this._is7dui)

        if (isClub)
            this._hongzhongbujiepao = this.getBoolItem("youhongzhongbujiepao",true);
        else
            this._hongzhongbujiepao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_youhongzhongbujiepao,true);
        this._playNode_youhongzhongbujiepao.setSelected(this._hongzhongbujiepao);
        var text = this._playNode_youhongzhongbujiepao.getChildByName("text");
        this.selectedCB(text,this._hongzhongbujiepao)


        // whzjiabeiType = -1 (两个都不选)
        // whzjiabeiType = 0 (无红中底分加倍)
        // whzjiabeiType = 1 (无红中总分加倍)
        var _whzjiabeiType;
        if (isClub)
            _whzjiabeiType = this.getNumberItem("whzjiabeiType", 0);
        else
            _whzjiabeiType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_wuhongzhongjiabeiType, 0);
        if(_whzjiabeiType !== -1) {
            this._playNode_whzjiabei_radio.selectItem(_whzjiabeiType);
            this.radioBoxSelectCB(_whzjiabeiType, this.whzjiabeiList[_whzjiabeiType], this.whzjiabeiList);
        }

        if (isClub)
            this._wuhongzhongjia2niao = this.getBoolItem("wuhongzhongjia2niao", false);
        else
            this._wuhongzhongjia2niao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_wuhongzhongjia2niao, false);
        this._playNode_wuhongzhongjia2niao.setSelected(this._wuhongzhongjia2niao);
        var text = this._playNode_wuhongzhongjia2niao.getChildByName("text");
        this.selectedCB(text, this._wuhongzhongjia2niao);

        var _zhua1Zhong10;
        if (isClub)
            _zhua1Zhong10 = this.getBoolItem("zhua1Zhong10", false);
        else
            _zhua1Zhong10 = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_zhua1zhong10, false);
        this._playNode_zhua1zhong10.setSelected(_zhua1Zhong10);
        var text = this._playNode_zhua1zhong10.getChildByName("text");
        this.selectedCB(text, _zhua1Zhong10);

        var zhongHongZhongSuan12;
        if (isClub)
            zhongHongZhongSuan12 = this.getBoolItem("zhongHongZhongSuan12", false);
        else
            zhongHongZhongSuan12 = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_zhongHongZhongSuan12, false);
        this.zhongHongZhongSuan12.setSelected(zhongHongZhongSuan12);
        var text = this.zhongHongZhongSuan12.getChildByName("text");
        this.selectedCB(text, zhongHongZhongSuan12);


        var hongzhongkehu;
        if (isClub)
            hongzhongkehu = this.getBoolItem("hongzhongkehu", true);
        else
            hongzhongkehu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_hongzhongkehu, true);
	    this._playNode_hongzhongkehu.setSelected(hongzhongkehu);
        var text = this._playNode_hongzhongkehu.getChildByName("text");
        this.selectedCB(text, hongzhongkehu);

        //人数
        var _currentCount;
        var _isConvertible = false;
        if (isClub) {
            if (this.getBoolItem("convertible", false)){
                _currentCount = this.getNumberItem("maxPlayer") == 3 ? 4 : 3;
                _isConvertible = true;
            }
            else{
                _currentCount = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
            }
        }
        else{
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_count, 0);
            _isConvertible = _currentCount == 3 || _currentCount == 4; //自由人数

        }
        cc.log("_currentCount renshu  == " + _currentCount)
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);


        if(this._playNode_queyimen){
            if(isClub){
               this._queyimen = this.getBoolItem("queYiMen", false);
            }else{
                this._queyimen = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_queYiMen, false);
            }
            this._playNode_queyimen.setSelected(this._queyimen);
            var text = this._playNode_queyimen.getChildByName("text");
            this.selectedCB(text,this._queyimen); 
            this._playNode_queyimen.visible = (_currentCount == 2 || _isConvertible);
        }

        //托管
        var _trustTime;
        if (isClub)
            _trustTime = this.getNumberItem("trustTime", 0);
        else
            _trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_tuoguan, 0);
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

        // 一炮多响，截胡
        var _isDuoHu;
        if (isClub)
            _isDuoHu = this.getBoolItem("duoHu", false);
        else
            _isDuoHu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_isDuoHu, false);
        this._payDuoHuNode.setSelected(_isDuoHu);
        var text = this._payDuoHuNode.getChildByName("text");
        this.selectedCB(text, _isDuoHu);

        if (isClub)
            this._zhuIdx = this.getNumberItem("difen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_difen, 1);
        if (this._ZhuNum)
            this._ZhuNum.setString(this._zhuIdx + "");


        // 有胡必胡
        var bihu;
        if (isClub)
            bihu = this.getBoolItem("bihuType", false);
	    else
	        bihu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_bihu, false);

        this._playNode_biHuType.setSelected(bihu);
        var text = this._playNode_biHuType.getChildByName("text");
        this.selectedCB(text, bihu);
        //庄闲分
        var zhuangxianfen;
        if (isClub)
            zhuangxianfen = this.getBoolItem("zhuangxianfen", false);
        else
            zhuangxianfen = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_zhuangxianfen, false);
        this._playNode_zhuangxianfen.setSelected(zhuangxianfen);
        var text = this._playNode_zhuangxianfen.getChildByName("text");
        this.selectedCB(text, zhuangxianfen);

        //胡七对、碰碰胡、天胡、清一色加1分
        var dahujiafen;
        if (isClub)
            dahujiafen = this.getNumberItem("qdpphthqysjf", 0);
        else
            dahujiafen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_dahujiafen, 0);
        this._playNode_dahujiafen.setSelected(dahujiafen == 1);
        var text = this._playNode_dahujiafen.getChildByName("text");
        this.selectedCB(text, dahujiafen);

        var isOpenTingTip;
        if (isClub)
            isOpenTingTip = this.getBoolItem("isOpenTingTip", true);
        else
            isOpenTingTip = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_MLHZ_isOpenTingTip, true);
        var tingIndex = isOpenTingTip ? 0 : 1;
        this.tingTipList_radio.selectItem(tingIndex);
        this.radioBoxSelectCB(tingIndex, this.tingTipList[tingIndex], this.tingTipList);

        var _zuoZhuang;
        if (isClub){
            _zuoZhuang = this.getNumberItem("zuoZhuang", 1);
        }else{
            _zuoZhuang = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_zuoZhuang, 1);
        }
        var list = [_play.getChildByName("zuoZhuang_1"), _play.getChildByName("zuoZhuang_2")];
        this.zuoZhuang_radio.selectItem(_zuoZhuang);
        this.radioBoxSelectCB(_zuoZhuang, list[_zuoZhuang], list);

        if (this.fanbei_radio) {
            // 大结算翻倍
            var fanBeiOption;
            var fanBeiScore;
            if (isClub) {
                fanBeiScore = this.getNumberItem("fanBeiScore", 10);
                fanBeiOption = this.getNumberItem("fanBei", 0);
            }
            else {
                fanBeiOption = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_fanbei, 0);
                fanBeiScore = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_fanbeiscore, 10);
            }
            this.fanbei_radio.selectItem(fanBeiOption)
            this.nodeListFanBei[1].getChildByName("score").setString(fanBeiScore + "分");
            this.fanBeiRadioBoxSelectCB(fanBeiOption, this.nodeListFanBei[fanBeiOption], this.nodeListFanBei);
        }

        //托管方式
        if(MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() &&  this.tuoguanWayNodeList){
            var trustWay;
            if(isClub){
                trustWay = this.getNumberItem("trustWay", 0);
            }else{
                trustWay = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_MLHZ_trustWay, 0);
            }
            this._playNode_player_tuoguanType_radio.selectItem(trustWay);
            this.radioBoxSelectCB(trustWay, this.tuoguanWayNodeList[trustWay], this.tuoguanWayNodeList);
            this.setTrustWayPanel(index);
        }

        this.changePayForPlayerNum(_currentCount);
    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.ML_HONGZHONG;
        para.maxPlayer = 4;
        para.flowerType = WithFlowerType.noFlower;
        para.zhuaniao = 1; //抓鸟
        para.niaofen = 1;
        para.buZhongSuanQuanZhong = false;// 不中算全中
        para.quanzhongfanbei = false;// 全中翻倍
        para.dianpao = true; //点炮胡
        para.qianggang = true; //抢杠胡
        // para.qianggangquanbao = true;//抢杠全包
        //para.hongzhong8 = true;//8红中
        para.qidui = true; //七对可胡
        para.youhongzhongbujiepao = true;//有红中不接炮
        para.whzjiabeiType = 0; // 0 (无红中底分加倍)   1 (无红中总分加倍)
        para.wuhongzhongjia2niao = false; //无红中加2鸟
        
        para.difen = this._zhuIdx;
        para.bihuType = false;//有胡必胡
        para.convertible = false;//是否自由人数
        para.trustTime = 0;//托管

        if (this._playNode_niaoType_0.isSelected()) {
            para.zhuaniao = 0;
        } else if (this._playNode_niaoType_1.isSelected()) {
            para.zhuaniao = 1;
        } else if (this._playNode_niaoType_2.isSelected()) {
            para.zhuaniao = 2;
        } else if (this._playNode_niaoType_3.isSelected()) {
            para.zhuaniao = 4;
        } else if (this._playNode_niaoType_4.isSelected()) {
            para.zhuaniao = 6;
        }else if(this._playNode_niaoType_9.isSelected()){
            para.zhuaniao = 9;
        }
        if (this._playNode_dianpaoyifen.isSelected()) {
            para.dianpaofen = 1;
        }else if (this._playNode_dianpaoerfen.isSelected()) {
            para.dianpaofen = 2;
        }else{
            para.dianpaofen = 0;
        }
        para.jiapiao = 0; 

        var zimoIndex = this._playNode_zimo_radio.getSelectIndex();
        var niaofenIndex = 0;
        if(this.zhuaNiao159.isVisible())
        {
            niaofenIndex = this._playNode_niaoFen_radio.getSelectIndex();
        }
        else if(this.quanZhong1Niao.isVisible())
        {
            niaofenIndex = this._playNode_niaoFenQuanZhong_radio.getSelectIndex();
        }
        para.niaofen = niaofenIndex + 1;
        if(!this._playNode_niaoFen_1.visible && !this._playNode_niaoFen_1NiaoQuanZhong_1.visible){
            // 如果被隐藏了，就肯定是1分
            para.niaofen = 1;
        }

        para.buzhongsuanquanzhong = this._playNode_niaoType_5.isSelected() && this._playNode_buZhongSuanQuanZhong.isSelected();
        para.quanzhongfanbei = this._playNode_niaoType_5.isSelected() && this._playNode_quanzhongfanbei.isSelected();

        para.hongzhongkehu = this._playNode_hongzhongkehu.isVisible() && this._playNode_hongzhongkehu.isSelected();

        para.dianpao = this._playNode_dianpao.isSelected(); //点炮胡
        para.qianggang = this._playNode_qiangganghu.isSelected(); //抢杠胡
        para.qianggangquanbao = para.qianggang && this._playNode_qianggangquanbao.isSelected();//抢杠全包
        para.hongzhong8 = this._playNode_hongzhong8.isSelected();//8红中
        para.qidui = this._playNode_qidui.isSelected(); //七对可胡
        para.youhongzhongbujiepao = this._playNode_youhongzhongbujiepao.isSelected();//有红中不接炮
        para.whzjiabeiType = this._playNode_whzjiabei_radio.getSelectIndex();

        para.wuhongzhongjia2niao = this._playNode_niaoType_5.isSelected() && this._playNode_wuhongzhongjia2niao.isSelected(); //无红中加2鸟
        para.youhongzhongkeqiangganghu = para.qianggang && this._playNode_youhongzhongkeqiangganghu.isSelected(); // 有红中可抢杠胡
        para.bihuType = this._playNode_biHuType.isSelected();//有胡必胡
        para.qdpphthqysjf = this._playNode_dahujiafen.isSelected() ? 1 : 0;//胡七对、碰碰胡、天胡、清一色加1分
        para.zimo = [2, 4][zimoIndex];

        para.huQingYiSeQiDuiJia2Niao =  this._playNode_niaoType_5.isSelected() && this.huQingYiSeQiDuiJia2Niao.isSelected();
        para.huangZhuangGang = this.play_huangZhuangGang.isSelected();
        para.buKePeng = this.play_buKePeng.isSelected();
        para.zhongHongZhongSuan12 = this._playNode_niaoType_1.isSelected() && this.zhongHongZhongSuan12.isSelected();

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
        para.trustWay = 0;
        if(MjClient.APP_TYPE.QXYYQP == MjClient.getAppType()){
            para.trustWay       = para.trustTime == 0 ? 0 : this._playNode_player_tuoguanType_radio.getSelectIndex();
            para.isTrustWhole   = para.trustWay != 0;
        }

         //一炮多响，截胡
        para.duoHu = this._payDuoHuNode.isSelected() ? true : false;
        para.zhuangxianfen = this._playNode_zhuangxianfen.isSelected();//庄闲分
        para.isOpenTingTip = this.tingTipList[0].isSelected();
        para.zuoZhuang = this.zuoZhuang_radio.getSelectIndex(); //0 随机， 1 先进来
        //飘分
        para.piaofen = this._playNode_player_piaofen_radio.getSelectIndex();
        para.piaoniao = this._playNode_piaoNiao.isSelected();

        if (this.fanbei_radio) {
            para.fanBeiScore = parseInt(this.nodeListFanBei[1].getChildByName("score").getString());
            para.fanBei = this.fanbei_radio.getSelectIndex();
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
        }else if(this._playNode_maxPlayer4.isSelected()){
            para.maxPlayer = 3;
            para.convertible = true;
            _countIdx = 4;
        }
        if(this._playNode_zhua1zhong10){
            para.zhua1Zhong10 = this._playNode_zhua1zhong10.isSelected() && this._playNode_niaoType_1.isSelected();
        }

        para.queYiMen = false;
        if(this._playNode_queyimen && (_countIdx == 2 || para.convertible)){
            // 二人玩法，缺一门 条子
            para.queYiMen = this._playNode_queyimen.isSelected();//缺一门 
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_queYiMen, para.queYiMen); 
        }


        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_MLHZ_niaoTpye, para.zhuaniao);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_isDuoHu, para.duoHu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_piaofen, para.piaofen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_piaoNiao, para.piaoniao);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_buZhongSuanQuanZhong, para.buzhongsuanquanzhong);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_quanzhongfanbei, para.quanzhongfanbei);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_dianpaohu, para.dianpao);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_qiangganghu, para.qianggang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_youhongzhongkeqiangganghu, this._playNode_youhongzhongkeqiangganghu.isSelected());
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_qianggangquanbao, this._playNode_qianggangquanbao.isSelected());
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_8hongzhong,para.hongzhong8);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_is7dui, para.qidui);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_youhongzhongbujiepao,para.youhongzhongbujiepao);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_MLHZ_wuhongzhongjiabeiType, para.whzjiabeiType);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_wuhongzhongjia2niao, para.wuhongzhongjia2niao);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_hongzhongkehu, para.hongzhongkehu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_MLHZ_niaofen, para.niaofen);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_MLHZ_difen, para.difen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_bihu,para.bihuType);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_MLHZ_count, _countIdx)
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_zhuangxianfen, para.zhuangxianfen)
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_MLHZ_dahujiafen, para.qdpphthqysjf)
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_MLHZ_tuoguan, para.trustTime)
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_isOpenTingTip, para.isOpenTingTip);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_dianpaofen, para.dianpaofen);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_MLHZ_zuoZhuang, para.zuoZhuang);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_MLHZ_zimofen, zimoIndex);

            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_buKePeng, para.buKePeng);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_huangZhuangGang, para.huangZhuangGang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_huQingYiSeQiDuiJia2Niao, para.huQingYiSeQiDuiJia2Niao);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_zhongHongZhongSuan12, para.zhongHongZhongSuan12);
            if(this._playNode_zhua1zhong10){
                util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_MLHZ_zhua1zhong10, para.zhua1Zhong10);
            }
            // 大结算翻倍
            if (this.fanbei_radio) {
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_MLHZ_fanbei, para.fanBei);
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_MLHZ_fanbeiscore, para.fanBeiScore);
            }

            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_MLHZ_trustWay, para.trustWay);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    },

    changePayForPlayerNum:function(select_number)
    {
        this._super(select_number); 
        if(this._playNode_queyimen){
            var maxPlayer = 4 - select_number; 
            this._playNode_queyimen.setVisible(maxPlayer == 2 || maxPlayer == 1 || maxPlayer == 0); 
        }  
    }, 
    
    fanBeiRadioBoxSelectCB : function(index, sender, list){
        if(sender){
            var selectColor = MjClient.createRoomNode._selectColor;
            var unSelectColor = MjClient.createRoomNode._unSelectColor;
            var len = list.length;
            for(var i = 0; i < len; i++){
                var radioBox = list[i];
                var bSelected = (radioBox === sender && sender.isSelected());

                if (i == 0) {
                    var txt = radioBox.getChildByName("text");
                    txt.ignoreContentAdaptWithSize(true);
                    txt.setTextColor(bSelected ? selectColor : unSelectColor);
                } else {
                    var textNames = ["text","score"];
                    for (var j = 0; j < textNames.length; j++) {
                        var txt = radioBox.getChildByName(textNames[j]);
                        txt.ignoreContentAdaptWithSize(true);
                        txt.setTextColor(bSelected ? selectColor : unSelectColor);
                    }

                    var buttonNames = ["btn_add","btn_sub"];
                    for (var j = 0; j < buttonNames.length; j++) {
                        var button = radioBox.getChildByName(buttonNames[j]);
                        button.setTouchEnabled(bSelected);
                        button.setBright(bSelected);
                    }
                }
            }
        }
    },
});