
/**create by cyc * @DateTime:     2017-12-18  */

CreateView = cc.Layer.extend({
    _isFriendCard:false,
    _gameTypeList:[[], []],
    _lastGameType: [-1, -1],
    _curTabIndex: 0,
    _gameBtnList:null,
    _back:null,
    _data:null,
    clickButton: function(target)
    {
        cc.log("clickButton:");

        var oldType = this._lastGameType[this._curTabIndex];
        var _oldBtn = this._gameBtnList.getChildByTag(oldType);
        if (_oldBtn)
        {
            _oldBtn.touchEnabled = true;
            _oldBtn.bright = true;
        }
        var oldRoomNode = this._back.getChildByTag(oldType);
        if (oldRoomNode)
        {
            oldRoomNode.visible = false;
        }

        var newType = target.getTag();
        var newBtn = this._gameBtnList.getChildByTag(newType);
        newBtn.touchEnabled = false;
        newBtn.bright = false;


        var newRoomNode = this._back.getChildByTag(newType);
        cc.log(" ==== newRoomNode  11111 ",newRoomNode)
        if (newRoomNode)
        {
            newRoomNode.visible = true;
        }
        else
        {
            newRoomNode = this.initCreateRoomNode(newType, this._data);
            cc.log("==== newRoomNode 22222ssss ",newRoomNode);
            if (newRoomNode)
            {
                newRoomNode.setTag(newType);
                newRoomNode.setName("room");
                newRoomNode.setPosition(440, 45.5);
                if(MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ){//临汾需要偏移
                    newRoomNode.setPosition(540, 45.5);
                }

                this._back.addChild(newRoomNode);
            }
            else
            {
                cc.log("error CreateView.clickButton: initCreateRoomNode fail, gameType=", newType)
            }
        }

        this._lastGameType[this._curTabIndex] = newType;
    },
    initCreateRoomNode:function(gameType,datas)
    {
        var node = null;
        var data = MjClient.deepClone(datas);
        data.gameType = gameType;
        cc.log("===========gameType===", gameType);
        switch (gameType)
        {
            case 1994: //2人新浦
                data.gameType = MjClient.GAME_TYPE.LIAN_YUN_GANG;
                node = new CreateRoomNode_LYG2(this,data);
                break;
            case 1995: //2人跑得快
                data.gameType = MjClient.GAME_TYPE.PAO_DE_KUAI;
                node = new CreateRoomNode_paodekuai2(this,data);
                break;
            case MjClient.GAME_TYPE.LIAN_YUN_GANG:
                node = new CreateRoomNode_LYG(this,data);
                break;
            case MjClient.GAME_TYPE.SHU_YANG:
                node = new CreateRoomNode_shuyang(this,data);
                break;
            case MjClient.GAME_TYPE.GUAN_YUN:
                node = new CreateRoomNode_guanyun(this,data);
                break;
            case MjClient.GAME_TYPE.GUAN_NAN:
                node = new CreateRoomNode_guannan(this,data);
                break;
            case MjClient.GAME_TYPE.DONG_HAI:
                node = new CreateRoomNode_donghai(this,data);
                break;
            case MjClient.GAME_TYPE.NAN_JING:
                node = new CreateRoomNode_nanjing(this,data);
                break;
            case MjClient.GAME_TYPE.SU_QIAN:
                node = new CreateRoomNode_suqian(this,data);
                break;
            //牛牛
            case MjClient.GAME_TYPE.NIU_NIU:
                node = new CreateRoomNode_niuniu(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_AN:
                node = new CreateRoomNode_huaian(this,data);
                break;
            case MjClient.GAME_TYPE.HA_HONGZHONG:
                node = new CreateRoomNode_HAHZ(this,data);
                break;
            case MjClient.GAME_TYPE.HA_14DUN:
                node = new CreateRoomNode_HA14D(this,data);
                break;
            case MjClient.GAME_TYPE.XIN_PU_HZ:
                node = new CreateRoomNode_HZMJ(this,data);
                break;
            case MjClient.GAME_TYPE.NTHZ:
                node = new CreateRoomNode_NTHZ(this,data);
                break;
            case MjClient.GAME_TYPE.XU_ZHOU:
                node = new CreateRoomNode_xuzhou(this,data);
                break;
            case MjClient.GAME_TYPE.TONG_HUA:
                node = new CreateRoomNode_tonghua(this,data);
                break;
            case MjClient.GAME_TYPE.JIANG_YONG_15Z:
                node = new CreateRoomNode_jyShiWuZhang(this,data);
                break;
            case MjClient.GAME_TYPE.CHANG_SHA:
                data.isErRen = false;
                node = new CreateRoomNode_changSha(this,data);
                break;
            case MjClient.GAME_TYPE.CHANG_SHA_ER_REN:
                data.isErRen = true;
                node = new CreateRoomNode_changSha(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU:
                node = new CreateRoomNode_xiangyintuidaohu(this,data);
                break;
            case MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO:
                node = new CreateRoomNode_pingjiangzhaniao(this,data);
                break;
            case MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN:
                node = new CreateRoomNode_tuantuanzhuan(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI:
                node = new CreateRoomNode_paodekuai(this,data);
                break;
            case MjClient.GAME_TYPE.JIANG_HUA_MJ:
                node = new CreateRoomNode_jianghuaMJ(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_LYG:
                node = new CreateRoomNode_PaoDeKuaiLYG(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI:
                node = new CreateRoomNode_PaoDeKuaiXS(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
                node = new CreateRoomNode_PaoDeKuaiTY(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
                node = new CreateRoomNode_PaoDeKuai11(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO:
                node = new CreateRoomNode_PaoDeKuaiZERO(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU:
                node = new CreateRoomNode_paodekuaiXuzhou(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_JZ:
                node = new CreateRoomNode_PaoDeKuaiJZ(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_HA:
                node = new CreateRoomNode_PaoDeKuaiHuaian(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW:
                node = new CreateRoomNode_PaoDeKuaiHuaianNew(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN:
                node = new CreateRoomNode_paodekuaiHaian(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_NT:
                node = new CreateRoomNode_paodekuaiNT(this,data);
                break;
            case MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI:
                node = new CreateRoomNode_baoPaiYZ(this,data);
                break;
            case MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO:
                node = new CreateRoomNode_chongYangHuaQuanJiao(this,data);
                break;
            case MjClient.GAME_TYPE.SAN_DA_HA:
                node = new CreateRoomNode_sanDaHa(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA:
                node = new CreateRoomNode_sanDaHaXiangTan(this,data);
                break;
            case MjClient.GAME_TYPE.SAN_DA_HA_NEW:
                node = new CreateRoomNode_sanDaHaNew(this,data);
                break;
            case MjClient.GAME_TYPE.LV_LIANG_DA_QI:
                node = new CreateRoomNode_daQi(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_HU_ZI:
                node = new CreateRoomNode_paohuzi(this,data);
                break;
            case MjClient.GAME_TYPE.SI_YANG:
                node = new CreateRoomNode_siyang(this,data);
                break;
            case MjClient.GAME_TYPE.XIN_SI_YANG:
                node = new CreateRoomNode_siyang_new(this,data);
                break;
            case MjClient.GAME_TYPE.SI_YANG_HH:
                node = new CreateRoomNode_siyanghh(this,data);
                break;
            case MjClient.GAME_TYPE.YAN_CHENG_HH:
                node = new CreateRoomNode_yanchenghh(this,data);
                break;
            case MjClient.GAME_TYPE.RU_GAO:
                node = new CreateRoomNode_rugao(this,data);
                break;
            case MjClient.GAME_TYPE.GAN_YU:
                node = new CreateRoomNode_ganyu(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_AN_TTZ:
                node = new CreateRoomNode_huaianTTZ(this,data);
                break;
            case MjClient.GAME_TYPE.RU_GAO_MJH:
                node = new CreateRoomNode_rugao_MJH(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_AN_CC:
                node = new CreateRoomNode_huaianCC(this,data);
                break;
            case MjClient.GAME_TYPE.HZ_TUI_DAO_HU:
                node = new CreateRoomNode_HZTDH(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_AN_ERZ:
                node = new CreateRoomNode_huaianERZ(this,data);
                break;
            case MjClient.GAME_TYPE.LUO_DI_SAO:
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    node = new CreateRoomNode_syliuhusao(this, data);
                }else{
                    node = new CreateRoomNode_liuhusao(this,data);
                }
                break;
            case MjClient.GAME_TYPE.PAO_HU_ZI_SR:
                node = new CreateRoomNode_paohuziSR(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_NT:
                node = new CreateRoomNode_doudizhu(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU:
                node = new CreateRoomNode_doudizhuHuaiAn(this,data);
                break;
            case MjClient.GAME_TYPE.LIAN_SHUI:
                cc.log(" ========LIAN_SHUI ")
                node = new CreateRoomNode_lianshui(this,data);
                break;
            case MjClient.GAME_TYPE.TY_HONGZHONG:
                node = new CreateRoomNode_TYHZ(this,data);
                break;
            case MjClient.GAME_TYPE.ML_HONGZHONG:
                node = new CreateRoomNode_MLHZ(this,data);
                break;
            case MjClient.GAME_TYPE.ML_HONGZHONG_ZERO:
                node = new CreateRoomNode_MLHZ_AI(this,data);
                break;
            case MjClient.GAME_TYPE.CHEN_ZHOU:
                node = new CreateRoomNode_chenzhou(this,data);
                break;
            case MjClient.GAME_TYPE.NING_XIANG_MJ:
                node = new CreateRoomNode_ningxiang(this,data);
                break;
            case MjClient.GAME_TYPE.YUAN_JIANG_MJ:
                node = new CreateRoomNode_yuanjiang(this,data);
                break;
            case MjClient.GAME_TYPE.NAN_XIAN_MJ:
                node = new CreateRoomNode_nanxian(this,data);
                break;
            case MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI:
                node = new CreateRoomNode_zhuoxiazi(this,data);
                break;
            case MjClient.GAME_TYPE.CHAO_GU_MJ:
                node = new CreateRoomNode_chaogu(this,data);
                break;
            case MjClient.GAME_TYPE.WU_XUE_GE_BAN:
                node = new CreateRoomNode_wuXueGeBan(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_TY:
                node = new CreateRoomNode_doudizhuTY(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY:
                node = new CreateRoomNode_doudizhuHBTY(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_QC:
                node = new CreateRoomNode_doudizhuQC(this,data);
                break;
            case MjClient.GAME_TYPE.TY_ZHUANZHUAN:
                node = new CreateRoomNode_TYZZ(this,data);
                break;
            case MjClient.GAME_TYPE.BAI_PU_LIN_ZI:
                node = new CreateRoomNode_BPLZ(this,data);
                break;
            case MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG:
                node = new CreateRoomNode_rugao_SJ(this,data);
                break;
            case MjClient.GAME_TYPE.HAI_AN_MJ:
                node = new CreateRoomNode_haian(this,data);
                break;
            case MjClient.GAME_TYPE.XUE_ZHAN:
                node = new CreateRoomNode_xuezhanMJ(this,data);
                break;
            case MjClient.GAME_TYPE.XUE_LIU:
                node = new CreateRoomNode_xueliu(this,data);
                break;
            case MjClient.GAME_TYPE.HAI_AN_BAI_DA:
                node = new CreateRoomNode_haianbaida(this,data);
                break;
            case MjClient.GAME_TYPE.JIN_ZHONG_MJ:
                node = new CreateRoomNode_jinzhong(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_JZ:
                node = new CreateRoomNode_doudizhuJZ(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_GZ:
                node = new CreateRoomNode_doudizhuGZ(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO:
                node = new CreateRoomNode_doudizhuZERO(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG:
                node = new CreateRoomNode_doudizhuDaTong(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU:
                node = new CreateRoomNode_doudizhuXZ(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_HA:
                node = new CreateRoomNode_doudizhuHA(this,data);
                break;
            case MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG:
                node = new CreateRoomNode_rudong(this,data);
                break;
            case MjClient.GAME_TYPE.JIN_ZHONG_KD:
                node = new CreateRoomNode_koudian(this,data);
                break;
            case MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN:
                node = new CreateRoomNode_yunchengtiejin(this,data);
                break;
            case MjClient.GAME_TYPE.HE_JIN_KUN_JIN:
                node = new CreateRoomNode_hejinkunjin(this,data);
                break;
            case MjClient.GAME_TYPE.LV_LIANG_MA_JIANG:
                node = new CreateRoomNode_lvliangmajiang(this,data);
                break;
            case MjClient.GAME_TYPE.ZHUO_HAO_ZI:
                node = new CreateRoomNode_zhuohaozi(this,data);
                break;
            case MjClient.GAME_TYPE.RU_GAO_ER:
                node = new CreateRoomNode_rugaoER(this,data);
                break;
            case MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU:
                node = new CreateRoomNode_tuidaohu(this,data);
                break;
            case MjClient.GAME_TYPE.LING_SHI_BIAN_LONG:
                node = new CreateRoomNode_lingshibianlong(this,data);
                break;
            case MjClient.GAME_TYPE.LING_SHI_BAN_MO:
                node = new CreateRoomNode_lingshibanmo(this,data);
                break;
            case MjClient.GAME_TYPE.PING_YAO_KOU_DIAN:
                node = new CreateRoomNode_pingyaokoudian(this,data);
                break;
            case MjClient.GAME_TYPE.PING_YAO_MA_JIANG:
                node = new CreateRoomNode_pingyaomajiang(this,data);
                break;
            case MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3:
                node = new CreateRoomNode_jiexiuyidiansan(this,data);
                break;
            case MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN:
                node = new CreateRoomNode_jiexiukoudian(this,data);
                break;
            case MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO:
                node = new CreateRoomNode_guaisanjiao(this,data);
                break;
            case MjClient.GAME_TYPE.SHOU_YANG_QUE_KA:
                node = new CreateRoomNode_shouyangqueka(this,data);
                break;
            case MjClient.GAME_TYPE.JIN_ZHONG_LI_SI:
                node = new CreateRoomNode_jinzhonglisi(this,data);
                break;
            case MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN:
                node = new CreateRoomNode_lvliangkoudian(this,data);
                break;
            case MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI:
                node = new CreateRoomNode_linfenyingsanzui(this,data);
                break;
            case MjClient.GAME_TYPE.HONG_TONG_WANG_PAI:
                node = new CreateRoomNode_hongtongwangpai(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN:
                node = new CreateRoomNode_doudizhuLF(this,data);
                break;
            case MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI:
                node = new CreateRoomNode_linfenyimenzi(this,data);
                break;
            case MjClient.GAME_TYPE.FEN_XI_YING_KOU:
                node = new CreateRoomNode_fenxiyingkou(this,data);
                break;
            case MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG:
                node = new CreateRoomNode_linfenjixian(this,data);
                break;
            case MjClient.GAME_TYPE.ML_HONG_ZI:
                node = new CreateRoomNode_HongZi(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI:
                node = new CreateRoomNode_YueYangWaiHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI:
                node = new CreateRoomNode_YiYangWaiHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI:
                node = new CreateRoomNode_NanXianGuiHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI:
                node = new CreateRoomNode_YuanJiangGuiHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI:
                node = new CreateRoomNode_xyHongZi(this,data);
                break;
            case MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN:
                node = new CreateRoomNode_xiangningshuaijin(this,data);
                break;
            case MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI:
                node = new CreateRoomNode_linfenkoudianfengzuizi(this,data);
                break;
            case MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN:
                node = new CreateRoomNode_jinzhongcaishen(this,data);
                break;
            case MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN:
                node = new CreateRoomNode_xiaoyikoudian(this,data);
                break;
			case MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN:
				node = new CreateRoomNode_xuzhoupeixian(this,data);
				break;
            case MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG:
                cc.log("MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG===========================")
                node = new CreateRoomNode_yueyanghongzhong(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA:
                node = new CreateRoomNode_sanDaHaYueyang(this,data);
                break;
            case MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA:
                node = new CreateRoomNode_sanDaHaYongLi(this,data);
                break;
            case MjClient.GAME_TYPE.WU_TAI_KOU_DIAN:
                node = new CreateRoomNode_wutaikoudian(this,data);
                break;
            case MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER:
                node = new CreateRoomNode_XinZhouSanDaEr(this,data);
                break;
            case MjClient.GAME_TYPE.FEN_YANG_QUE_MEN:
                node = new CreateRoomNode_fenyangquemen(this,data);
                break;
            case MjClient.GAME_TYPE.JING_LE_KOU_DIAN:
                node = new CreateRoomNode_jingle(this,data);
                break;
            case MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO:
                node = new CreateRoomNode_datongguaisanjiao(this,data);
                break;
            case MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI:
                node = new CreateRoomNode_ahPaoHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.LUAN_GUA_FENG:
                node = new CreateRoomNode_luanguafeng(this,data);
                break;
            case MjClient.GAME_TYPE.AN_HUA_MA_JIANG:
                node = new CreateRoomNode_anhuaMaJiang(this,data);
                break;
            case MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW:
                node = new CreateRoomNode_anhuaMaJiangSW(this,data);
                break;
            case MjClient.GAME_TYPE.NING_XIANG_KAI_WANG:
                node = new CreateRoomNode_ningXiangKaiWang(this,data);
                break;
            case MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI:
                node = new CreateRoomNode_chenZhouZiPai(this,data);
                break;
            case MjClient.GAME_TYPE.GUI_YANG_ZI_PAI:
                node = new CreateRoomNode_guiYangZiPai(this,data);
                break;
            case MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI:
                node = new CreateRoomNode_daTongZhaGuZi(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE:
                node = new CreateRoomNode_NiuShiBieYueYang(this,data);
                break;
            case MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI:
                node = new CreateRoomNode_DaMaZiZhuZhou(this,data);
                break;
            case MjClient.GAME_TYPE.CHONG_YANG_DA_GUN:
                node = new CreateRoomNode_chongYangDaGun(this,data);
                break;
            case MjClient.GAME_TYPE.DA_YE_DA_GONG:
                node = new CreateRoomNode_daYeDaGong(this,data);
                break;
            case MjClient.GAME_TYPE.TONG_SHAN_DA_GONG:
                node = new CreateRoomNode_tongShanDaGong(this,data);
                break;
            case MjClient.GAME_TYPE.DA_YE_510K:
                node = new CreateRoomNode_daYe510K(this,data);
                break;
            case MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN:
                node = new CreateRoomNode_qianJiangQianFen(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI:
                node = new CreateRoomNode_xxGaoHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI:
                node = new CreateRoomNode_xiangtanPHZ(this,data);
                break;
            case MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI:
                node = new CreateRoomNode_ningXiangPaoHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG:
                node = new CreateRoomNode_taoJiang(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU:
                node = new CreateRoomNode_yiJiaoLaiYou(this,data);
                break;
            case MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU:
                node = new CreateRoomNode_yiJiaoLaiYouHuBei(this,data);
                break;
            case MjClient.GAME_TYPE.CHUO_XIA_ZI:
                node = new CreateRoomNode_chuoXiaZi(this,data);
                break;
            case MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ:
                node = new CreateRoomNode_jingshan(this,data);
                break;
            case MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING:
                node = new CreateRoomNode_xiaoGanKaWuXing(this,data);
                break;
            case MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING:
                node = new CreateRoomNode_suiZhouKaWuXing(this,data);
                break;
            case MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN:
                node = new CreateRoomNode_daYeKaiKouFan(this,data);
                break;
            case MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG:
                node = new CreateRoomNode_hongZhongLaiZiGang(this,data);
                break;
            case MjClient.GAME_TYPE.DIAN_TUO:
                node = new CreateRoomNode_diantuo(this,data);
                break;
            case MjClient.GAME_TYPE.YI_YANG_MA_JIANG:
                node = new CreateRoomNode_yiYangMJ(this, data);
                break;
            case MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI:
                cc.log("chen zhou mao hu zi panel======");
                node = new CreateRoomNode_chenZhouMaoHuZi(this, data);
                break;
            case MjClient.GAME_TYPE.XIANG_XI_2710:
                cc.log("chen zhou mao hu zi panel======");
                node = new CreateRoomNode_xiangXiRQS(this, data);
                break;
            case MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI:
                node = new CreateRoomNode_changDePaoHuZi(this, data);
                break;
            case MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI:
                node = new CreateRoomNode_shiMenPaoHuZi(this, data);
                break;
            case MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI:
                node = new CreateRoomNode_hanShouPaoHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI:
                node = new CreateRoomNode_yunChengFengHaoZi(this,data);
                break;
            case MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI:
                node = new CreateRoomNode_jishanniuyezi(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA:
                node = new CreateRoomNode_sanDaHaXiangXiang(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG:
                node = new CreateRoomNode_XXHZ(this, data);
                break;
            case MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA:
                node = new CreateRoomNode_loudifpf(this,data);
                break;
            case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                node = new CreateRoomNode_PaoDeKuaiYZTY(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI:
                node = new CreateRoomNode_xiangxiangPHZ(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_SHUI_MJ:
                node = new CreateRoomNode_xiangshui(this,data);
                break;
            case MjClient.GAME_TYPE.QU_TANG_23_ZHANG:
                node = new CreateRoomNode_qutang_23zhang_(this,data);
                break;
            case MjClient.GAME_TYPE.HONG_ZE_MA_JIANG:
                node = new CreateRoomNode_hongZeMaJiang(this, data);
                break;
            case MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN:
                node = new CreateRoomNode_GanDengYan(this,data);
                break;
            case MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ:
                node = new CreateRoomNode_yiChangXueLiu(this, data);
                break;
            case MjClient.GAME_TYPE.EN_SHI_MA_JIANG:
                node = new CreateRoomNode_enShi(this, data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY:
                node = new CreateRoomNode_PaoDeKuaiHBTY(this, data);
                break;
            case MjClient.GAME_TYPE.YANG_XIN_MA_JIANG:
                    node = new CreateRoomNode_YangXin(this, data);
                    break;
            case MjClient.GAME_TYPE.JIANG_LING_HONGZHONG:
                node = new CreateRoomNode_jiangLingHongZhong(this, data);
                break;
            case MjClient.GAME_TYPE.QI_CHUN_GD_MJ:
                node = new CreateRoomNode_qiChunGuangDong(this, data);
                break;
            default:
                break;
        }
        return node;
    },
    loadItemTexture:function(item, index)
    {
        var textureNormal,texturePress;
        var preStr = GameButton[index];
        textureNormal = preStr + "_n.png";
        texturePress = preStr + "_s.png";
        item.loadTextures(textureNormal,texturePress,texturePress);
    },
    refreshGameListUI:function(){
    	cc.log("refreshGameListUI: curTabIndex=" + this._curTabIndex + " lastGameType=" + this._lastGameType[this._curTabIndex]);

        if (this._gameTypeList[this._curTabIndex].indexOf(this._lastGameType[this._curTabIndex]) == -1)
            this._lastGameType[this._curTabIndex] = this._gameTypeList[this._curTabIndex][0];

        // 清理item
        this._gameBtnList.removeAllChildren();

		// 把所有右侧room隐藏
        var childrens = this._back.getChildren();
        for (var i = 0; i < childrens.length; i ++)
        {
            if (childrens[i].getName() != "room")
                continue;

            childrens[i].visible = false;
        }

        // 创建左侧list
        var gameItem = this._gameBtnList.getParent().getChildByName("item");
        gameItem.visible = false;
        var gameList = this._gameTypeList[this._curTabIndex];
        var lastGameType = this._lastGameType[this._curTabIndex];
        if( MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)
        {
            if(lastGameType == MjClient.GAME_TYPE.LIAN_YUN_GANG && util.localStorageEncrypt.getNumberItem("_LIAN_YUN_GANG_COUNT", 0) == 2)
                lastGameType = 1994
            if(lastGameType == MjClient.GAME_TYPE.PAO_DE_KUAI && util.localStorageEncrypt.getNumberItem("_PAO_DE_KUAI_PLAYER_NUMBER", 0) == 2)
                lastGameType = 1995
        }

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) //江苏新加 二人斗地主 二人新浦
        {
            if(this._curTabIndex == 0)
            {
                var _newBtn = gameItem.clone();
                var textureNormal,texturePress;
                _newBtn.setTag(1994)//(MjClient.GAME_TYPE.LIAN_YUN_GANG);
                _newBtn.visible = true;
                textureNormal = "createNewPng/xinpu2_hot_n.png";
                texturePress = "createNewPng/xinpu2_hot_s.png";
                _newBtn.loadTextures(textureNormal,texturePress,texturePress);
                _newBtn.addClickEventListener(function(target) {that.clickButton(target);});
                this._gameBtnList.pushBackCustomItem(_newBtn)
                _newBtn.touchEnabled = gameType != lastGameType;
                _newBtn.bright = gameType != lastGameType;
            }
            else if(this._curTabIndex == 1)
            {
               var _newBtn = gameItem.clone();
                var textureNormal,texturePress;
                _newBtn.setTag(1995)//(MjClient.GAME_TYPE.LIAN_YUN_GANG);
                _newBtn.visible = true;
                textureNormal = "createNewPng/pdk2_hot_n.png";
                texturePress = "createNewPng/pdk2_hot_s.png";
                _newBtn.loadTextures(textureNormal,texturePress,texturePress);
                _newBtn.addClickEventListener(function(target) {that.clickButton(target);});
                this._gameBtnList.pushBackCustomItem(_newBtn)
                _newBtn.touchEnabled = gameType != lastGameType;
                _newBtn.bright = gameType != lastGameType;
            }
        }
        cc.log("加载玩法按钮   ~~~   ",gameList);
        for (var i = 0; i < gameList.length; i++)
        {

            var gameType = gameList[i];
            var newBtn = gameItem.clone();
            newBtn.visible = true;
            this.loadItemTexture(newBtn, gameType);
            newBtn.setTag(gameType);//根据类型设置item tag
            var that = this;
            newBtn.addClickEventListener(function(target) {that.clickButton(target);});
            this._gameBtnList.pushBackCustomItem(newBtn);

            newBtn.touchEnabled = gameType != lastGameType;
            newBtn.bright = gameType != lastGameType;
        }

        if (gameList.indexOf(lastGameType) > 5)
        {
            this._gameBtnList.jumpToBottom();
        }
        this.clickButton(this._gameBtnList.getChildByTag(lastGameType));
    },
    ctor: function (data) {
        //isFriendCard,data.isShowTitleCreate,data.typeList
        this._super();
        this._data = data;
        this._isFriendCard = data.IsFriendCard;
        var isFriendCard  = data.IsFriendCard;

        if (isFriendCard && MjClient.RuleParam && MjClient.RuleParam["rule" + this._data.ruleNumer] && MjClient.RuleParam["rule" + this._data.ruleNumer] != "delete")
            this._data.clubRule = MjClient.RuleParam["rule" + this._data.ruleNumer];

        //细分游戏类型时要显示标题
        var isShowTitleCreate = data.isShowTitleCreate;
        //细分游戏类型
        var typeList = data.typeList;
        MjClient.createui = this;

        // 获得游戏列表：
        this._gameTypeList = getAllGameListArray()._gameTypeList;

        var lastGameType = util.localStorageEncrypt.getNumberItem("KEY_GAME_TYPE", -1);
        if (this._data && this._data.clubRule)
            lastGameType = this._data.clubRule.gameType;

        //晋中app里面的灵石麻将和平遥麻将和介休麻将，两个玩法共用一个入口
        if (lastGameType == MjClient.GAME_TYPE.LING_SHI_BAN_MO)
        {
            //灵石半摸用灵石编龙的入口
            lastGameType = MjClient.GAME_TYPE.LING_SHI_BIAN_LONG;
        }
        if (lastGameType == MjClient.GAME_TYPE.PING_YAO_KOU_DIAN)
        {
            //平遥扣点用平遥麻将的入口
            lastGameType = MjClient.GAME_TYPE.PING_YAO_MA_JIANG;
        }
        if (lastGameType == MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN)
        {
            //介休扣点用介休1点3的入口
            lastGameType = MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3;
        }

        if (lastGameType == MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN)
        {
            //晋中财神用晋中麻将的
            lastGameType = MjClient.GAME_TYPE.JIN_ZHONG_MJ;
        }


        if (this._gameTypeList[1].indexOf(lastGameType) != -1)
        {
            this._curTabIndex = 1;
            this._lastGameType[1] = lastGameType;
            this._lastGameType[0] = -1;
        }
        else
        {
            this._curTabIndex = 0;
            this._lastGameType[1] = -1;
            if (this._gameTypeList[0].indexOf(lastGameType) != -1)
                this._lastGameType[0] = lastGameType;
            else
            	this._lastGameType[0] = this._gameTypeList[0][0];
        }

        var jsonui = ccs.load(res.Create_json);
        //BindUiAndLogic(jsonui.node, this.jsBind);
        this.addChild(jsonui.node);

        if (MjClient.createRoomLayer) {
            MjClient.createRoomLayer.setVisible(false);
        }

        var _block = jsonui.node.getChildByName("block");
        setWgtLayout(_block,[1, 1],[0.5,0.5],[0,0],2);

        this._back = jsonui.node.getChildByName("back");
        setWgtLayout(this._back,[0.95, 0.95], [0.54, 0.5], [-0.035, 0]);
        if(isJinZhongAPPType() ||
            MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() ||
            MjClient.APP_TYPE.QXNTQP == MjClient.getAppType() ||
            MjClient.getAppType() === MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
            setWgtLayout(this._back,[1, 1], [0.5, 0.5], [0, 0]);

        var _item = this._back.getChildByName("item");
        if(_item) _item.visible = false;


        var titleImg = this._back.getChildByName("titleCreate");
        var titleImg_2 = this._back.getChildByName("titleCreate_2");

        var switchTab = null;
        var node_friendCard = this._back.getChildByName("node_friendCard");
        if (this._gameTypeList[0].length == 0 || this._gameTypeList[1].length == 0 || !node_friendCard)
        {
            if (node_friendCard)
                node_friendCard.visible = false;

            if (titleImg)
                titleImg.visible = !isFriendCard;

            if (titleImg_2)
                titleImg_2.visible = isFriendCard;
        }
        else if (node_friendCard)
        {
            node_friendCard.visible = true;
            if (titleImg)
                titleImg.visible = false;
            if (titleImg_2)
                titleImg_2.visible = false;

            var btn_mj = node_friendCard.getChildByName("btn_mj");
            var btn_poke = node_friendCard.getChildByName("btn_poke");
            var title_1 = btn_mj.getTitleRenderer();
            var title_2 = btn_poke.getTitleRenderer();
            var posY = title_1.getPositionY() + 3;
            title_1.setPositionY(posY);
            title_2.setPositionY(posY);
            var that = this;
            var switchTab = function(tabIndex)
            {
            	cc.log("switchTab: tabIndex=" + tabIndex);
                btn_mj.enabled = tabIndex != 0;
                btn_poke.enabled = tabIndex != 1;
                btn_mj.setTitleColor(tabIndex != 0 ? cc.color(116,60,19) : cc.color(255, 255, 255));
                btn_poke.setTitleColor(tabIndex != 1 ? cc.color(116,60,19) : cc.color(255, 255, 255));

                that._curTabIndex = tabIndex;
                if(isShowTitleCreate){
                    //特殊判断，在细分的创建界面
                    that._curTabIndex = 0;

                }

                that.refreshGameListUI();
            };

            btn_mj.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        switchTab(0)
                        break;
                    default:
                        break;
                }
            }, this);

            btn_poke.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        switchTab(1);
                        break;
                    default:
                        break;
                }
            }, this);
        }


        //细分的创建房间界面
        if(isShowTitleCreate){
            if (titleImg){
                titleImg.visible = true;
            }
            if (titleImg_2){
                titleImg_2.visible = false;
            }
            if(node_friendCard){
                node_friendCard.visible = false;
            }
            if(typeList){
                // compare to server config ,if only have config, show
                var t = []
                if (MjClient.gameListConfig.majiangList.length > 0){
                    for (var i = 0; i < typeList.length; i++){
                        var index = MjClient.gameListConfig.majiangList.indexOf(typeList[i])
                        if (index > -1){
                            t.push(typeList[i])
                        }
                    }
                }
                this._gameTypeList[0] = t;
                // this._gameTypeList[0] = typeList;
                this._gameTypeList[1] = [];
            }

        }

        //关闭按钮
        var btnGoHome = this._back.getChildByName("goHome");
        btnGoHome.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (isFriendCard)
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Shezhi_Tianjiawanfa_Close", {uid:SelfUid()});
                    else
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Guanbi", {uid:SelfUid()});

                    if (MjClient.createRoomLayer) {
                        MjClient.createRoomLayer.setVisible(true);
                    }

                    postEvent("createRoomPanel_Close");
                    this.removeFromParent();
                    break;
                default:
                    break;
            }
        }, this);
        //游戏列表
        this._gameBtnList = this._back.getChildByName("gameList");
        //江苏麻将去掉列表滚动条
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
        ) this._gameBtnList.setScrollBarEnabled(false);


        if (switchTab)
            switchTab(this._curTabIndex);
        else
            this.refreshGameListUI();

        return true;
    },
    onExit:function()
    {
        this._super();
        MjClient.createui = null;
    },
});

//山西，湖北，岳阳的玩法分页，2018.4.24
var CreateView2 = cc.Layer.extend({
    _isFriendCard:false,
    _gameTypeList:[],
    _lastGameType: [-1, -1],
    _curTabIndex: 0,
    _gameBtnList:null,
    _back:null,
    _data:null,
    addHotImage: function(btn, gameType) {
        if(gameType === MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ||
            gameType === MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN ||
            gameType === MjClient.GAME_TYPE.CHANG_SHA_ER_REN) {
            if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
                var url = "createRoom_3.0/bg_huobao.png";
                this.createButtonHotImageV3(btn, url);
            }
            else {
                var url = "createNewPng/hot.png";
                this.createButtonHotImage(btn, url);
            }
        }
    },
    createButtonHotImage: function(btn, imageUrl) {
        if (!jsb.fileUtils.isFileExist(imageUrl)) return;
        var hotImage = new ccui.ImageView(imageUrl);
        hotImage.setPosition(btn.width * 0.92, btn.height * 0.8);
        btn.addChild(hotImage);

    },
    createButtonHotImageV3: function(btn, imageUrl) {
        if (!jsb.fileUtils.isFileExist(imageUrl)) return;
        var hotImage = new ccui.ImageView(imageUrl);
        hotImage.setPosition(btn.width * 0.82, btn.height * 0.85);
        btn.addChild(hotImage);
    },
    clickButton: function(target)
    {
        cc.log("clickButton:");

        var oldType = this._lastGameType[this._curTabIndex];
        var _oldBtn = this._gameBtnList.getChildByTag(oldType);
        if (_oldBtn)
        {
            _oldBtn.touchEnabled = true;
            _oldBtn.bright = true;

            if (_oldBtn.normalText && _oldBtn.selectText) {
                _oldBtn.normalText.setVisible(true);
                _oldBtn.selectText.setVisible(false);
            }
        }
        var oldRoomNode = this._back.getChildByTag(oldType);
        if (oldRoomNode)
        {
            oldRoomNode.visible = false;
        }

        // 永利三打哈合并相关
        if (this._mergeArr && this._mergeArr.indexOf(oldType) >= 0) {
            for (var i = 0; i < this._mergeArr.length; i++) {
                var oldRoomNode = this._back.getChildByTag(this._mergeArr[i]);
                if (oldRoomNode)
                {
                    oldRoomNode.visible = false;
                }
            }
        }

        var newType = target.getTag();
        var newBtn = this._gameBtnList.getChildByTag(newType);
        newBtn.touchEnabled = false;
        newBtn.bright = false;

        if (newBtn.normalText && newBtn.selectText) {
            newBtn.normalText.setVisible(false);
            newBtn.selectText.setVisible(true);
        }

        // 永利三打哈合并
        if (this._mergeArr && this._mergeArr.indexOf(newType) >= 0 && this.realGameType) {
            newType = this.realGameType;
            newBtn.setTag(newType);
        }

        var newRoomNode = this._back.getChildByTag(newType);
        cc.log(" ==== newRoomNode  11111 ",newRoomNode)
        if (newRoomNode)
        {
            newRoomNode.visible = true;
            if (newRoomNode.initGameTypeNode)
                newRoomNode.initGameTypeNode(this.getGameTypesMerged());
        }
        else
        {
            newRoomNode = this.initCreateRoomNode(newType, this._data);
            cc.log("==== newRoomNode 22222 ",newRoomNode);
            if (newRoomNode)
            {
                if (newRoomNode.initGameTypeNode)
                    newRoomNode.initGameTypeNode(this.getGameTypesMerged());

                newRoomNode.setTag(newType);
                newRoomNode.setName("room");
                if (this.isUseUIV3)
                    newRoomNode.setPosition(550, 30);
                else
                    newRoomNode.setPosition(510, 55);
                this._back.addChild(newRoomNode);
            }
            else
            {
                cc.log("error CreateView.clickButton: initCreateRoomNode fail, gameType=", newType)
            }
        }

        this._lastGameType[this._curTabIndex] = newType;
    },
    initCreateRoomNode:function(gameType,datas)
    {
        var node = null;
        var data = MjClient.deepClone(datas);
        data.gameType = gameType;
        cc.log("=================++gameType====================== yy " + gameType);

        switch (gameType)
        {
            case MjClient.GAME_TYPE.LIAN_YUN_GANG:
                node = new CreateRoomNode_LYG(this,data);
                break;
            case MjClient.GAME_TYPE.SHU_YANG:
                node = new CreateRoomNode_shuyang(this,data);
                break;
            case MjClient.GAME_TYPE.GUAN_YUN:
                node = new CreateRoomNode_guanyun(this,data);
                break;
            case MjClient.GAME_TYPE.GUAN_NAN:
                node = new CreateRoomNode_guannan(this,data);
                break;
            case MjClient.GAME_TYPE.DONG_HAI:
                node = new CreateRoomNode_donghai(this,data);
                break;
            case MjClient.GAME_TYPE.NAN_JING:
                node = new CreateRoomNode_nanjing(this,data);
                break;
            case MjClient.GAME_TYPE.SU_QIAN:
                node = new CreateRoomNode_suqian(this,data);
                break;
            //牛牛
            case MjClient.GAME_TYPE.NIU_NIU:
                node = new CreateRoomNode_niuniu(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_AN:
                node = new CreateRoomNode_huaian(this,data);
                break;
            case MjClient.GAME_TYPE.HA_HONGZHONG:
                node = new CreateRoomNode_HAHZ(this,data);
                break;
            case MjClient.GAME_TYPE.JIANG_YONG_15Z:
                node = new CreateRoomNode_jyShiWuZhang(this,data);
                break;
            case MjClient.GAME_TYPE.HA_14DUN:
                node = new CreateRoomNode_HA14D(this,data);
                break;
            case MjClient.GAME_TYPE.XIN_PU_HZ:
                node = new CreateRoomNode_HZMJ(this,data);
                break;
            case MjClient.GAME_TYPE.NTHZ:
                node = new CreateRoomNode_NTHZ(this,data);
                break;
            case MjClient.GAME_TYPE.XU_ZHOU:
                node = new CreateRoomNode_xuzhou(this,data);
                break;
            case MjClient.GAME_TYPE.TONG_HUA:
                node = new CreateRoomNode_tonghua(this,data);
                break;
            case MjClient.GAME_TYPE.CHANG_SHA:
                data.isErRen = false;
                node = new CreateRoomNode_changSha(this, data);
                break;
            case MjClient.GAME_TYPE.CHANG_SHA_ER_REN:
                data.isErRen = true;
                node = new CreateRoomNode_changSha(this, data);
                break;
            case MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU:
                node = new CreateRoomNode_xiangyintuidaohu(this,data);
                break;
            case MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO:
                node = new CreateRoomNode_pingjiangzhaniao(this,data);
                break;
            case MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN:
                node = new CreateRoomNode_tuantuanzhuan(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI:
                node = new CreateRoomNode_paodekuai(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_LYG:
                node = new CreateRoomNode_PaoDeKuaiLYG(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI:
                node = new CreateRoomNode_PaoDeKuaiXS(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO:
                node = new CreateRoomNode_PaoDeKuaiZERO(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
                node = new CreateRoomNode_PaoDeKuaiTY(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
                node = new CreateRoomNode_PaoDeKuai11(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU:
                node = new CreateRoomNode_paodekuaiXuzhou(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_JZ:
                node = new CreateRoomNode_PaoDeKuaiJZ(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_HA:
                node = new CreateRoomNode_PaoDeKuaiHuaian(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW:
                node = new CreateRoomNode_PaoDeKuaiHuaianNew(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN:
                node = new CreateRoomNode_paodekuaiHaian(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_NT:
                node = new CreateRoomNode_paodekuaiNT(this,data);
                break;
            case MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI:
                cc.log("++++fggfgfgfgfhfg++++++++")
                node = new CreateRoomNode_baoPaiYZ(this,data);
                break;
            case MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO:
                node = new CreateRoomNode_chongYangHuaQuanJiao(this,data);
                break;
            case MjClient.GAME_TYPE.SAN_DA_HA:
                node = new CreateRoomNode_sanDaHa(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA:
                node = new CreateRoomNode_sanDaHaXiangTan(this,data);
                break;
            case MjClient.GAME_TYPE.SAN_DA_HA_NEW:
                node = new CreateRoomNode_sanDaHaNew(this,data);
                break;
            case MjClient.GAME_TYPE.LV_LIANG_DA_QI:
                node = new CreateRoomNode_daQi(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_HU_ZI:
                node = new CreateRoomNode_paohuzi(this,data);
                break;
            case MjClient.GAME_TYPE.SI_YANG:
                node = new CreateRoomNode_siyang(this,data);
                break;
            case MjClient.GAME_TYPE.XIN_SI_YANG:
                node = new CreateRoomNode_siyang_new(this,data);
                break;
            case MjClient.GAME_TYPE.SI_YANG_HH:
                node = new CreateRoomNode_siyanghh(this,data);
                break;
            case MjClient.GAME_TYPE.YAN_CHENG_HH:
                node = new CreateRoomNode_yanchenghh(this,data);
                break;
            case MjClient.GAME_TYPE.RU_GAO:
                node = new CreateRoomNode_rugao(this,data);
                break;
            case MjClient.GAME_TYPE.GAN_YU:
                node = new CreateRoomNode_ganyu(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_AN_TTZ:
                node = new CreateRoomNode_huaianTTZ(this,data);
                break;
            case MjClient.GAME_TYPE.RU_GAO_MJH:
                node = new CreateRoomNode_rugao_MJH(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_AN_CC:
                node = new CreateRoomNode_huaianCC(this,data);
                break;
            case MjClient.GAME_TYPE.HZ_TUI_DAO_HU:
                node = new CreateRoomNode_HZTDH(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_AN_ERZ:
                node = new CreateRoomNode_huaianERZ(this,data);
                break;
            case MjClient.GAME_TYPE.LUO_DI_SAO:
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    node = new CreateRoomNode_syliuhusao(this, data);
                }else{
                    node = new CreateRoomNode_liuhusao(this,data);
                }
                break;
            case MjClient.GAME_TYPE.PAO_HU_ZI_SR:
                node = new CreateRoomNode_paohuziSR(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_NT:
                node = new CreateRoomNode_doudizhu(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU:
                node = new CreateRoomNode_doudizhuHuaiAn(this,data);
                break;
            case MjClient.GAME_TYPE.LIAN_SHUI:
                node = new CreateRoomNode_lianshui(this,data);
                break;
            case MjClient.GAME_TYPE.TY_HONGZHONG:
                node = new CreateRoomNode_TYHZ(this,data);
                break;
            case MjClient.GAME_TYPE.ML_HONGZHONG:
                node = new CreateRoomNode_MLHZ(this,data);
                break;
            case MjClient.GAME_TYPE.ML_HONGZHONG_ZERO:
                node = new CreateRoomNode_MLHZ_AI(this,data);
                break;
            case MjClient.GAME_TYPE.CHEN_ZHOU:
                node = new CreateRoomNode_chenzhou(this,data);
                break;
            case MjClient.GAME_TYPE.NING_XIANG_MJ:
                node = new CreateRoomNode_ningxiang(this,data);
                break;
            case MjClient.GAME_TYPE.YUAN_JIANG_MJ:
                node = new CreateRoomNode_yuanjiang(this,data);
                break;
            case MjClient.GAME_TYPE.NAN_XIAN_MJ:
                node = new CreateRoomNode_nanxian(this,data);
                break;
            case MjClient.GAME_TYPE.CHAO_GU_MJ:
                node = new CreateRoomNode_chaogu(this,data);
                break;
            case MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI:
                node = new CreateRoomNode_zhuoxiazi(this,data);
                break;
            case MjClient.GAME_TYPE.WU_XUE_GE_BAN:
                node = new CreateRoomNode_wuXueGeBan(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_TY:
                node = new CreateRoomNode_doudizhuTY(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY:
                node = new CreateRoomNode_doudizhuHBTY(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_QC:
                node = new CreateRoomNode_doudizhuQC(this,data);
                break;
            case MjClient.GAME_TYPE.TY_ZHUANZHUAN:
                node = new CreateRoomNode_TYZZ(this,data);
                break;
            case MjClient.GAME_TYPE.BAI_PU_LIN_ZI:
                node = new CreateRoomNode_BPLZ(this,data);
                break;
            case MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG:
                node = new CreateRoomNode_rugao_SJ(this,data);
                break;
            case MjClient.GAME_TYPE.HAI_AN_MJ:
                node = new CreateRoomNode_haian(this,data);
                break;
            case MjClient.GAME_TYPE.XUE_ZHAN:
                node = new CreateRoomNode_xuezhanMJ(this,data);
                break;
            case MjClient.GAME_TYPE.XUE_LIU:
                node = new CreateRoomNode_xueliu(this,data);
                break;
            case MjClient.GAME_TYPE.HAI_AN_BAI_DA:
                node = new CreateRoomNode_haianbaida(this,data);
                break;
            case MjClient.GAME_TYPE.JIN_ZHONG_MJ:
                node = new CreateRoomNode_jinzhong(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_JZ:
                node = new CreateRoomNode_doudizhuJZ(this,data);
                break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_GZ:
                node = new CreateRoomNode_doudizhuGZ(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO:
                node = new CreateRoomNode_doudizhuZERO(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG:
                node = new CreateRoomNode_doudizhuDaTong(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU:
                node = new CreateRoomNode_doudizhuXZ(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_HA:
                node = new CreateRoomNode_doudizhuHA(this,data);
                break;
            case MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG:
                node = new CreateRoomNode_rudong(this,data);
                break;
            case MjClient.GAME_TYPE.JIN_ZHONG_KD:
                node = new CreateRoomNode_koudian(this,data);
                break;
            case MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN:
                node = new CreateRoomNode_yunchengtiejin(this,data);
                break;
            case MjClient.GAME_TYPE.HE_JIN_KUN_JIN:
                node = new CreateRoomNode_hejinkunjin(this,data);
                break;
            case MjClient.GAME_TYPE.LV_LIANG_MA_JIANG:
                node = new CreateRoomNode_lvliangmajiang(this,data);
                break;
            case MjClient.GAME_TYPE.ZHUO_HAO_ZI:
                node = new CreateRoomNode_zhuohaozi(this,data);
                break;
            case MjClient.GAME_TYPE.RU_GAO_ER:
                node = new CreateRoomNode_rugaoER(this,data);
                break;
            case MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU:
                node = new CreateRoomNode_tuidaohu(this,data);
                break;
            case MjClient.GAME_TYPE.LING_SHI_BIAN_LONG:
                node = new CreateRoomNode_lingshibianlong(this,data);
                break;
            case MjClient.GAME_TYPE.LING_SHI_BAN_MO:
                node = new CreateRoomNode_lingshibanmo(this,data);
                break;
            case MjClient.GAME_TYPE.PING_YAO_KOU_DIAN:
                node = new CreateRoomNode_pingyaokoudian(this,data);
                break;
            case MjClient.GAME_TYPE.PING_YAO_MA_JIANG:
                node = new CreateRoomNode_pingyaomajiang(this,data);
                break;
            case MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3:
                node = new CreateRoomNode_jiexiuyidiansan(this,data);
                break;
            case MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN:
                node = new CreateRoomNode_jiexiukoudian(this,data);
                break;
            case MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO:
                node = new CreateRoomNode_guaisanjiao(this,data);
                break;
            case MjClient.GAME_TYPE.SHOU_YANG_QUE_KA:
                node = new CreateRoomNode_shouyangqueka(this,data);
                break;
            case MjClient.GAME_TYPE.JIN_ZHONG_LI_SI:
                node = new CreateRoomNode_jinzhonglisi(this,data);
                break;
            case MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN:
                node = new CreateRoomNode_lvliangkoudian(this,data);
                break;
            case MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI:
                node = new CreateRoomNode_linfenyingsanzui(this,data);
                break;
            case MjClient.GAME_TYPE.HONG_TONG_WANG_PAI:
                node = new CreateRoomNode_hongtongwangpai(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN:
                node = new CreateRoomNode_doudizhuLF(this,data);
                break;
            case MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI:
                node = new CreateRoomNode_linfenyimenzi(this,data);
                break;
            case MjClient.GAME_TYPE.FEN_XI_YING_KOU:
                node = new CreateRoomNode_fenxiyingkou(this,data);
                break;
            case MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG:
                node = new CreateRoomNode_linfenjixian(this,data);
                break;
            case MjClient.GAME_TYPE.ML_HONG_ZI:
                node = new CreateRoomNode_HongZi(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI:
                node = new CreateRoomNode_YueYangWaiHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI:
                node = new CreateRoomNode_YiYangWaiHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI:
                node = new CreateRoomNode_NanXianGuiHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI:
                node = new CreateRoomNode_YuanJiangGuiHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI:
                node = new CreateRoomNode_xyHongZi(this,data);
                break;
            case MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN:
                node = new CreateRoomNode_xiangningshuaijin(this,data);
                break;
            case MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI:
                node = new CreateRoomNode_linfenkoudianfengzuizi(this,data);
                break;
            case MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN:
                node = new CreateRoomNode_jinzhongcaishen(this,data);
                break;
            case MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN:
                node = new CreateRoomNode_xiaoyikoudian(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG:
                node = new CreateRoomNode_doudizhuLVLIANG(this,data);
                break;
            case MjClient.GAME_TYPE.FAN_SHI_XIA_YU:
                node = new CreateRoomNode_fanshixiayu(this,data);
                break;
            case MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG:
                node = new CreateRoomNode_daixian(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG:
                node = new CreateRoomNode_yueyanghongzhong(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA:
                node = new CreateRoomNode_sanDaHaYueyang(this,data);
                break;
            case MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA:
                node = new CreateRoomNode_sanDaHaYongLi(this,data);
                break;
            case MjClient.GAME_TYPE.WU_TAI_KOU_DIAN:
                node = new CreateRoomNode_wutaikoudian(this,data);
                break;
            case MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER:
                node = new CreateRoomNode_XinZhouSanDaEr(this,data);
                break;
            case MjClient.GAME_TYPE.DA_NING_SHUAI_JIN:
                node = new CreateRoomNode_daningshuaijin(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU:
                node = new CreateRoomNode_FuLuShou(this, data);
                break;
            case MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG:
                node = new CreateRoomNode_FuLuShouErShiZhang(this, data);
                break;
            case MjClient.GAME_TYPE.FEN_YANG_QUE_MEN:
                node = new CreateRoomNode_fenyangquemen(this, data);
                break;
            case MjClient.GAME_TYPE.JING_LE_KOU_DIAN:
                node = new CreateRoomNode_jingle(this,data);
                break;
            case MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO:
                node = new CreateRoomNode_datongguaisanjiao(this,data);
                break;
            case MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI:
                node = new CreateRoomNode_ahPaoHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.LUAN_GUA_FENG:
                node = new CreateRoomNode_luanguafeng(this,data);
                break;
            case MjClient.GAME_TYPE.AN_HUA_MA_JIANG:
                node = new CreateRoomNode_anhuaMaJiang(this,data);
                break;
            case MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW:
                node = new CreateRoomNode_anhuaMaJiangSW(this,data);
                break;
            case MjClient.GAME_TYPE.NING_XIANG_KAI_WANG:
                node = new CreateRoomNode_ningXiangKaiWang(this,data);
                break;
            case MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI:
                node = new CreateRoomNode_chenZhouZiPai(this,data);
                break;
            case MjClient.GAME_TYPE.GUI_YANG_ZI_PAI:
                node = new CreateRoomNode_guiYangZiPai(this,data);
                break;
            case MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI:
                node = new CreateRoomNode_daTongZhaGuZi(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE:
                node = new CreateRoomNode_NiuShiBieYueYang(this,data);
                break;
            case MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI:
                node = new CreateRoomNode_DaMaZiZhuZhou(this,data);
                break;
            case MjClient.GAME_TYPE.CHONG_YANG_DA_GUN:
                node = new CreateRoomNode_chongYangDaGun(this,data);
                break;
            case MjClient.GAME_TYPE.DA_YE_DA_GONG:
                node = new CreateRoomNode_daYeDaGong(this,data);
                break;
            case MjClient.GAME_TYPE.TONG_SHAN_DA_GONG:
                node = new CreateRoomNode_tongShanDaGong(this,data);
                break;
            case MjClient.GAME_TYPE.DA_YE_510K:
                node = new CreateRoomNode_daYe510K(this,data);
                break;
            case MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN:
                node = new CreateRoomNode_qianJiangQianFen(this,data);
                break;
            case MjClient.GAME_TYPE.QI_CHUN_DA_GONG:
                node = new CreateRoomNode_qiChunDaGong(this,data);
                break;
            case MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI:
                node = new CreateRoomNode_ningXiangPaoHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_PENG_HU:
                node = new CreateRoomNode_yueYangPengHu(this,data);
                break;
            case MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG:
                node = new CreateRoomNode_taoJiang(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU:
                node = new CreateRoomNode_yiJiaoLaiYou(this,data);
                break;
            case MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU:
                node = new CreateRoomNode_yiJiaoLaiYouHuBei(this,data);
                break;
            case MjClient.GAME_TYPE.CHUO_XIA_ZI:
                node = new CreateRoomNode_chuoXiaZi(this,data);
                break;
            case MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ:
                node = new CreateRoomNode_jingshan(this,data);
                break;
            case MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING:
                node = new CreateRoomNode_xiaoGanKaWuXing(this,data);
                break;
            case MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING:
                node = new CreateRoomNode_suiZhouKaWuXing(this,data);
                break;
            case MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN:
                node = new CreateRoomNode_daYeKaiKouFan(this,data);
                break;
            case MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG:
                node = new CreateRoomNode_hongZhongLaiZiGang(this,data);
                break;
			case MjClient.GAME_TYPE.HY_LIU_HU_QIANG:
                node = new CreateRoomNode_liuHuQiang(this,data);
                break;
            case MjClient.GAME_TYPE.DIAN_TUO:
                node = new CreateRoomNode_diantuo(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN:
                node = new CreateRoomNode_daZhaDan(this,data);
                break;
            case MjClient.GAME_TYPE.YI_YANG_MA_JIANG:
                node = new CreateRoomNode_yiYangMJ(this, data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN:
                node = new CreateRoomNode_RuanJiangQianFenYueYang(this,data);
                break;
            case MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI:
                node = new CreateRoomNode_chenZhouMaoHuZi(this, data);
                break;
            case MjClient.GAME_TYPE.XIANG_XI_2710:
                node = new CreateRoomNode_xiangXiRQS(this, data);
                break;
            case MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI:
                node = new CreateRoomNode_changDePaoHuZi(this, data);
                break;
            case MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI:
                node = new CreateRoomNode_shiMenPaoHuZi(this, data);
                break;
			case MjClient.GAME_TYPE.ZP_LY_CHZ:
                if(isYongZhouProject()){
                    node = new CreateRoomNode_zplychz(this,data);
                }else{
                    node = new CreateRoomNode_zplychz_lyg(this,data);
                }
                
                break;
            case MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI:
                node = new CreateRoomNode_xxGaoHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI:
                node = new CreateRoomNode_xiangtanPHZ(this,data);
                break;
            case MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI:
                node = new CreateRoomNode_hanShouPaoHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI:
                node = new CreateRoomNode_yunChengFengHaoZi(this,data);
                break;
            case MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI:
                node = new CreateRoomNode_jiShanNiuYeZi(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI:
                node = new CreateRoomNode_xiangxiangPHZ(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_SHUI_MJ:
                node = new CreateRoomNode_xiangshui(this,data);
                break;
            case MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG:
                node = new CreateRoomNode_wangdiaoMJ(this,data);
                break;
            case MjClient.GAME_TYPE.DAO_ZHOU_MJ:
                node = new CreateRoomNode_daozhouMJ(this,data);
                break;
            case MjClient.GAME_TYPE.YONG_ZHOU_MJ:
                node = new CreateRoomNode_yongZhouGMJ(this,data);
                break;
            case MjClient.GAME_TYPE.JIANG_HUA_MJ:
                node = new CreateRoomNode_jianghuaMJ(this,data);
                break;
            case MjClient.GAME_TYPE.HY_SHI_HU_KA:
                if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
                    node = new CreateRoomNode_ylShiHuKa(this,data);
                }else{
                    node = new CreateRoomNode_BDHYShiHuKa(this,data);
                }
                break;
            case MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE:
                node = new CreateRoomNode_anXiangWeiMaQue(this,data);
                break;
            case MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ:
                node = new CreateRoomNode_guizhoupuding(this,data);
                break;
            case MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI:
                node = new CreateRoomNode_guizhouSanDingGuai(this,data);
                break;
            case MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI:
                node = new CreateRoomNode_guizhouErDingGuai(this,data);
                break;
            case MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ:
                node = new CreateRoomNode_guizhouAnShun(this,data);
                break;
            case MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG:
                node = new CreateRoomNode_guizhouSanDingLiangFang(this,data);
                break;
            case MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG:
                node = new CreateRoomNode_guizhouLiangDingLiangFang(this,data);
                break;
            case MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI:
                node = new CreateRoomNode_guizhouXMYGuiYangZhuoJi(this, data);
                break;
            case MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI:
                node = new CreateRoomNode_guizhouGuiYangZhuoJi(this, data);
                break;
            case MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU:
                node = new CreateRoomNode_guizhouMenHuXueLiu(this, data);
                break;
            case MjClient.GAME_TYPE.XIANG_XI_96POKER:
                node = new CreateRoomNode_96poker(this, data);
                break;
            case MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ:
                node = new CreateRoomNode_erRenYiFang(this, data);
                break;
            case MjClient.GAME_TYPE.HONG_ZE_MA_JIANG:
                node = new CreateRoomNode_hongZeMaJiang(this, data);
                break;
            case MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN:
                node = new CreateRoomNode_GanDengYan(this,data);
                break;
            case MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ:
                node = new CreateRoomNode_yiChangXueLiu(this, data);
                break;
            case MjClient.GAME_TYPE.EN_SHI_MA_JIANG:
                node = new CreateRoomNode_enShi(this, data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY:
                node = new CreateRoomNode_PaoDeKuaiHBTY(this, data);
                break;
            case MjClient.GAME_TYPE.DANG_YANG_FAN_JING:
                node = new CreateRoomNode_dangYangFanJing(this, data);
                break;
            case MjClient.GAME_TYPE.DA_YE_ZI_PAI:
                node = new CreateRoomNode_DaYeZiPai(this, data);
                break;
            case MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG:
                node = new createRoomNode_JingZhouMaJiang(this, data);
                break;
            case MjClient.GAME_TYPE.CHONG_YANG_MJ:
                node = new CreateRoomNode_chongYangMJ(this,data);
                break;
            case MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ:
                node = new CreateRoomNode_qianJiangHHMJ(this,data);
                break;
            case MjClient.GAME_TYPE.HUANG_SHI_HH_MJ:
                node = new CreateRoomNode_huangShiHHMJ(this,data);
                break;
            case MjClient.GAME_TYPE.QI_CHUN_HH_MJ:
                node = new CreateRoomNode_qiChunHHMJ(this,data);
                break;
            case MjClient.GAME_TYPE.TONG_CHENG_MJ:
                node = new CreateRoomNode_tongCheng(this, data);
                break;
            case MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN:
                node = new CreateRoomNode_yiChangShangDaRen(this, data);
                break;
            case MjClient.GAME_TYPE.HU_BEI_HUA_PAI:
                node = new CreateRoomNode_huBeiHuaPai(this, data);
                break;
            case MjClient.GAME_TYPE.TONG_SHAN_HH_MJ:
                node = new CreateRoomNode_tongShanHuangHuang(this, data);
                break;
            case MjClient.GAME_TYPE.YANG_XIN_MA_JIANG:
                node = new CreateRoomNode_YangXin(this, data);
                break;
            case MjClient.GAME_TYPE.JIANG_LING_HONGZHONG:
                node = new CreateRoomNode_jiangLingHongZhong(this, data);
                break;
            case MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG:
                node = new CreateRoomNode_shiShouAiHuang(this, data);
                break;
            case MjClient.GAME_TYPE.QI_CHUN_GD_MJ:
                    node = new CreateRoomNode_qiChunGuangDong(this, data);
                    break;
            case MjClient.GAME_TYPE.GONG_AN_HUA_PAI:
                node = new CreateRoomNode_gongAnHuaPai(this, data);
                break;
            case MjClient.GAME_TYPE.WU_XUE_MJ:
                node = new CreateRoomNode_wuXueMJ(this, data);
                break;
            case MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI:
                node = new CreateRoomNode_tongChengGeZiPai(this, data);
                break;
            case MjClient.GAME_TYPE.EN_SHI_SHAO_HU:
                node = new CreateRoomNode_enShiShaoHu(this, data);
                break;
            case MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG:
                node = new CreateRoomNode_qiChunHongZhongGang(this, data);
                break;
            case MjClient.GAME_TYPE.WU_XUE_510K:
                node = new CreateRoomNode_wuXue510K(this, data);
                break;
            default:
                break;
        }
        return node;
    },
    loadItemTexture:function(item, index)
    {
        if (this.isUseUIV3) {
            item.normalText = item.getChildByName("normalText");
            item.selectText = item.getChildByName("selectText");
            item.normalText.ignoreContentAdaptWithSize(true);
            item.selectText.ignoreContentAdaptWithSize(true);
            item.normalText.setString(GameCnName[index]);
            item.selectText.setString(GameCnName[index]);
        }
        else {
            var textureNormal,texturePress;
            var preStr = GameButton[index];
            textureNormal = preStr + "_n.png";
            texturePress = preStr + "_s.png";
            item.loadTextures(textureNormal,texturePress,texturePress);
        }
    },
    refreshGameListUI:function(){

        // if (this._gameTypeList[this._curTabIndex].indexOf(this._lastGameType[this._curTabIndex]) == -1)
        //     this._lastGameType[this._curTabIndex] = this._gameTypeList[this._curTabIndex][0];

        // 清理item
        this._gameBtnList.removeAllChildren();

        // 把所有右侧room隐藏
        var childrens = this._back.getChildren();
        for (var i = 0; i < childrens.length; i ++)
        {
            if (childrens[i].getName() != "room")
                continue;

            childrens[i].visible = false;
        }

        // 创建左侧list
        var gameItem = this._gameBtnList.getParent().getChildByName("item");

        var gameList = this._gameTypeList[this._curTabIndex];
        var lastGameType = this._lastGameType[this._curTabIndex];

        if(lastGameType == 2017032 && this._data.clubRule && this._data.clubRule.isErRen ){
            lastGameType = 2019209;
        }

        if (gameList.indexOf(lastGameType) < 0 && gameList.length > 0)
            lastGameType = gameList[0];

        // 永利合并三打哈相关
        var indexSpecial = -1;

        for (var i = 0; i < gameList.length; i++)
        {
            var gameType = gameList[i];

            // 永利合并三打哈相关
            if (this._mergeArr) {
                var typeIndex = this._mergeArr.indexOf(gameType);

                if (indexSpecial >= 0 && typeIndex >= 0)
                    continue;

                if (typeIndex >= 0) {
                    indexSpecial = typeIndex;

                    if (this._mergeArr.indexOf(lastGameType) >= 0) {
                        this.realGameType = lastGameType;
                        lastGameType = this._mergeArr[indexSpecial];
                    }
                }
            }

            var newBtn = gameItem.clone();
            this.loadItemTexture(newBtn, gameType);
            this.addHotImage(newBtn, gameType); // 特殊玩法增加火爆图标
            newBtn.setTag(gameType);  // 根据类型设置item tag
            var that = this;
            this._gameBtnList.pushBackCustomItem(newBtn);

            newBtn.touchEnabled = gameType != lastGameType;
            newBtn.bright = gameType != lastGameType;

            //俱乐部自主创房时,不能选择其他玩法
            if(this._isFriendCard && this._data.isCreateRoom)
            {
                newBtn.addTouchEventListener(function (sender, type) {
                    if (type == 2)
                        MjClient.showToast("无法操作");
                }, this);
            }
            else
            {
                newBtn.addClickEventListener(function(target) {that.clickButton(target);});
            }
        }

        if (gameList.indexOf(lastGameType) > 5)
        {
            this._gameBtnList.jumpToBottom();
        }

        if (gameList.indexOf(lastGameType) >= 0)
            this.clickButton(this._gameBtnList.getChildByTag(lastGameType));
    },

    jsBind:{
        _event: {
            changeRoomNodeByType: function(params) {
                var oldRoomNode = this._back.getChildByTag(params.oldType);
                if (oldRoomNode) {
                    oldRoomNode.visible = false;
                }

                this.realGameType = params.newType;

                var tabBtn = this._gameBtnList.getChildByTag(params.oldType);
                if (tabBtn)
                    tabBtn.setTag(params.newType);

                this._lastGameType[this._curTabIndex] = params.newType;

                var newRoomNode = this._back.getChildByTag(params.newType);
                if (newRoomNode) {
                    newRoomNode.visible = true;
                    newRoomNode.initGameTypeNode(this.getGameTypesMerged());
                } else {
                    newRoomNode = this.initCreateRoomNode(params.newType, this._data);

                    if (newRoomNode) {
                        newRoomNode.initGameTypeNode(this.getGameTypesMerged());
                        newRoomNode.setTag(params.newType);
                        newRoomNode.setName("room");
                        newRoomNode.setPosition(510, 55);
                        this._back.addChild(newRoomNode);
                    }
                }
            }
        }
    },

    ctor: function (data) {
        //isFriendCard,data.isShowTitleCreate,data.typeList
        this._super();
        this._data = data;
        this._isFriendCard = data.IsFriendCard;
        var isFriendCard  = data.IsFriendCard;

        // 永利三打哈合并
        if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            this._mergeArr = [
                MjClient.GAME_TYPE.SAN_DA_HA,
                MjClient.GAME_TYPE.SAN_DA_HA_NEW,
                MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA,
                MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA
            ];
        }

        if (isFriendCard && MjClient.RuleParam && MjClient.RuleParam["rule" + this._data.ruleNumer] && MjClient.RuleParam["rule" + this._data.ruleNumer] != "delete")
            this._data.clubRule = MjClient.RuleParam["rule" + this._data.ruleNumer];
        else if (isFriendCard && data.isCreateRoom && data.info)
            this._data.clubRule = data.info;

        //细分游戏类型时要显示标题
        var isShowTitleCreate = data.isShowTitleCreate;
        //细分游戏类型
        var typeList = data.typeList;
        MjClient.createui = this;

        // 获得游戏列表，按钮位置，按钮名称
        var _all = getAllGameListArray();

        cc.log("=========================getAllGameListArray ===_all = " + JSON.stringify(_all));
        var _allGameListArray =  _all._allGameListArray;
        var _btnPosArray = _all._btnPosArray;
        var _btnPicArray = _all._btnPicArray;
        this._gameTypeList = _all._gameTypeList;

        var lastGameType = util.localStorageEncrypt.getNumberItem("KEY_GAME_TYPE", -1);
        if (this._data && this._data.clubRule)
            lastGameType = this._data.clubRule.gameType;

        //晋中app里面的灵石麻将和平遥麻将和介休麻将，两个玩法共用一个入口
        if (lastGameType == MjClient.GAME_TYPE.LING_SHI_BAN_MO)
        {
            //灵石半摸用灵石编龙的入口
            lastGameType = MjClient.GAME_TYPE.LING_SHI_BIAN_LONG;
        }
        if (lastGameType == MjClient.GAME_TYPE.PING_YAO_KOU_DIAN)
        {
            //平遥扣点用平遥麻将的入口
            lastGameType = MjClient.GAME_TYPE.PING_YAO_MA_JIANG;
        }
        if (lastGameType == MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN)
        {
            //介休扣点用介休1点3的入口
            lastGameType = MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3;
        }

        if (lastGameType == MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN)
        {
            //晋中财神用晋中麻将的
            lastGameType = MjClient.GAME_TYPE.JIN_ZHONG_MJ;
        }

        for(var i = 0;i < this._gameTypeList.length;i++)
        {
            this._lastGameType[i] = this._gameTypeList[i][0];
            if (this._gameTypeList[i].indexOf(lastGameType) != -1)
            {
                this._lastGameType[i] = lastGameType;
            }
        }

        this._curTabIndex = util.localStorageEncrypt.getNumberItem("KEY_GAME_LIST",0);

        if(!this._curTabIndex  || this._curTabIndex >= this._gameTypeList.length)
        {
            this._curTabIndex = 0;
        }

        if (this._data && this._data.clubRule) {
            for (var i = this._gameTypeList.length - 1; i >= 0; i --) {
                if (this._gameTypeList[i].indexOf(lastGameType) != -1) {
                    this._curTabIndex = i;
                    break;
                }
            }
        }

        this.isUseUIV3 = MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3();
        if (this.isUseUIV3)
            var jsonui = ccs.load("createHomeTotal_3.0.json");
        else
            var jsonui = ccs.load(res.Create_json);
        this.addChild(jsonui.node);

        if (MjClient.createRoomLayer) {
            MjClient.createRoomLayer.setVisible(false);
        }

        var _block = jsonui.node.getChildByName("block");
        setWgtLayout(_block,[1, 1],[0.5, 0.5],[0,0],2);

        this._back = jsonui.node.getChildByName("back");
        setWgtLayout(this._back,[1, 1], [0.5, 0.5], [0, 0]);
        if(MjClient.getAppType() === MjClient.APP_TYPE.DQSHANXIMJ) {
            setWgtLayout(this._back,[0.95, 0.95], [0.5, 0.5], [0, 0]);
        }

        var _suizi = this._back.getChildByName("suizi");

        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(this._back);

        var titleImg = this._back.getChildByName("titleCreate");
        var titleImg_2 = this._back.getChildByName("titleCreate_2");

        var switchTab = null;
        var node_friendCard = this._back.getChildByName("node_friendCard");
        //wj
        // node_friendCard.getChildByName("btn_1").visible = false;
        // node_friendCard.getChildByName("btn_2").visible = false;
        //wj 隐藏选择地区
        jsonui.node.getChildByName("back").getChildByName("area").visible = false;

        this.node_friendCard = node_friendCard;
        node_friendCard.setLocalZOrder(1);

        var des = node_friendCard.getDescription();
        if(des === "ListView") node_friendCard.setScrollBarEnabled(false);

        if(this._gameTypeList.length == 0 || !node_friendCard)
        {
            if (node_friendCard)
                node_friendCard.visible = false;

            if (titleImg)
                titleImg.visible = !isFriendCard;

            if (titleImg_2)
                titleImg_2.visible = isFriendCard;
        }
        else if (node_friendCard)
        {
            node_friendCard.visible = true;
            if (titleImg)
                titleImg.visible = true;
            if (titleImg_2)
                titleImg_2.visible = false;

            var _path = "createNewPng/gameTypeBtn/";
            var that = this;
            var _btnNodeArray = [];

            var switchTab = function(tabIndex)
            {
                cc.log("switchTab: tabIndex=" + tabIndex + "        _btnNodeArray.length" + _btnNodeArray.length);

                if (that.isUseUIV3) {
                    for(var i = 0;i < _btnNodeArray.length;i++)
                    {
                        _btnNodeArray[i].setEnabled(tabIndex != i);
                        _btnNodeArray[i].getChildByName("normalImg").setVisible(tabIndex != i);
                        _btnNodeArray[i].getChildByName("selectImg").setVisible(tabIndex == i);
                    }
                }
                else {
                    for(var i = 0;i < _btnNodeArray.length;i++)
                    {
                        if(tabIndex != i)  {
                            _btnNodeArray[i].setTitleColor(cc.color(116,60,19));
                            _btnNodeArray[i].loadTextureNormal(_path + _btnPicArray[i] + "_s" + ".png");
                            _btnNodeArray[i].loadTexturePressed(_path + _btnPicArray[i] + "_s" + ".png");
                        }
                        else
                        {
                            _btnNodeArray[i].setTitleColor(cc.color(255,255,255));
                            _btnNodeArray[i].loadTextureNormal(_path + _btnPicArray[i] + ".png");
                            _btnNodeArray[i].loadTexturePressed(_path + _btnPicArray[i] + ".png");
                        }
                    }
                }

                that._curTabIndex = tabIndex;
                util.localStorageEncrypt.setNumberItem("KEY_GAME_LIST",tabIndex);
                if(isShowTitleCreate){
                    //特殊判断，在细分的创建界面
                    that._curTabIndex = 0;
                }
               that.refreshGameListUI();
            };

            for(var i  = 0;i < _btnPosArray.length;i++) //五个按钮
            {
                _btnNodeArray[i] = node_friendCard.getChildByName("btn_" + i);
                if(_btnNodeArray[i])
                {
                    if(i >= _btnPicArray.length)
                    {
                        _btnNodeArray[i].visible = false;
                        break;
                    }
                    // _btnNodeArray[i].loadTextureNormal()
                    _btnNodeArray[i].setTag(i);
                    //俱乐部自主创房时,不能选择其他玩法
                    if(isFriendCard && this._data.isCreateRoom)
                    {
                        _btnNodeArray[i].addTouchEventListener(function (sender, type) {
                            if (type == 2)
                                MjClient.showToast("无法操作");
                        }, this);
                    }
                    else
                    {
                        _btnNodeArray[i].addTouchEventListener(function(sender, Type) {
                            switch (Type) {
                                case ccui.Widget.TOUCH_ENDED:
                                    var idx = sender.getTag();
                                    switchTab(idx);
                                    break;
                                default:
                                    break;
                            }
                        }, this);
                    }
                }
            }
        }


        //细分的创建房间界面
        if(isShowTitleCreate){
            if (titleImg){
                titleImg.visible = true;
            }
            if (titleImg_2){
                titleImg_2.visible = false;
            }
            if(node_friendCard){
                node_friendCard.visible = false;
            }
            if(typeList){
                // compare to server config ,if only have config, show
                var t = []
                if (MjClient.gameListConfig.majiangList.length > 0){
                    for (var i = 0; i < typeList.length; i++){
                        var index = MjClient.gameListConfig.majiangList.indexOf(typeList[i])
                        if (index > -1){
                            t.push(typeList[i])
                        }
                    }
                }
                this._gameTypeList[0] = t;
                this._gameTypeList[1] = [];
            }

        }

        if (MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() || isJinZhongAPPType() || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() === MjClient.APP_TYPE.HUBEIMJ ) {
            if (this.isUseUIV3)
                this.refreshAreaSelect_v3();
            else
                this.refreshAreaSelect();

            UIEventBind(null, this, "selectArea", function() {
                if (this.isUseUIV3)
                    this.refreshAreaSelect_v3();
                else
                    this.refreshAreaSelect();
                if (switchTab)
                    switchTab(this._curTabIndex);
                else
                    this.refreshGameListUI();
            });
        }

        //关闭按钮
        var btnGoHome = this._back.getChildByName("goHome");
        btnGoHome.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (MjClient.createRoomLayer) {
                        MjClient.createRoomLayer.setVisible(true);
                    }

                    postEvent("createRoomPanel_Close");
                    this.removeFromParent();
                    break;
                default:
                    break;
            }
        }, this);
        //游戏列表
        this._gameBtnList = this._back.getChildByName("gameList");
        this._gameBtnList.setScrollBarEnabled(false);
        if (switchTab)
            // switchTab(this._curTabIndex);
            //wj
            switchTab(0);
        else
            // this.refreshGameListUI();
            switchTab(0);

        // 永利滑动的指示器箭头提示
        var arrow = this._back.getChildByName("arrow");
        if(arrow){
            var act = cc.sequence(
                cc.delayTime(0.5),
                cc.spawn(
                    cc.moveBy(1, cc.p(0, -300)).easing(cc.easeSineOut()),
                    cc.fadeTo(1, 0)),
                cc.removeSelf()
            );
            arrow.runAction(act);
        }

        BindUiAndLogic(this,this.jsBind);

        return true;
    },
        
    getGameTypesMerged: function() {
        var gameTypes = [];

        var gameList = this._gameTypeList[this._curTabIndex];
        if (this._mergeArr) {
            for (var i = 0; i < this._mergeArr.length; i++) {
                if (gameList.indexOf(this._mergeArr[i]) >= 0)
                    gameTypes.push(this._mergeArr[i]);
            }
        }

        return gameTypes;
    },
    onExit:function()
    {
        this._super();
        MjClient.createui = null;
    },
});

/**
 * 永州项目创建界面
 **/
CreateViewNew = cc.Layer.extend({
    _isFriendCard:false,
    _gameTypeList:[[], []],
    _lastGameType: [-1, -1],
    _curTabIndex: 0,
    _gameBtnList:null,
    _back:null,
    _data:null,

    addHotImage: function(btn, gameType) {
        if(gameType === MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ ||
            gameType === MjClient.GAME_TYPE.DA_ZI_BO_PI||
            gameType === MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN) {
            if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
                var url = "createRoom_3.0/bg_huobao.png";
                this.createButtonHotImageV3(btn, url);
            }
            else {
                var url = "createNewPng/hot.png";
                this.createButtonHotImage(btn, url);
            }
        }
    },

    createButtonHotImage: function(btn, imageUrl) {
        if(!jsb.fileUtils.isFileExist(imageUrl)) return;
        var hotImage = new ccui.ImageView(imageUrl);
        hotImage.setPosition(btn.width*0.92, btn.height*0.8);
        btn.addChild(hotImage);
    },

    createButtonHotImageV3: function(btn, imageUrl) {
        if (!jsb.fileUtils.isFileExist(imageUrl)) return;
        var hotImage = new ccui.ImageView(imageUrl);
        hotImage.setPosition(btn.width * 0.82, btn.height * 0.85);
        btn.addChild(hotImage);
    },

    clickButton: function(target)
    {
        var selectColor = cc.color("#255662");
        var unSelectColor = cc.color("#ffffff");
        var oldType = this._lastGameType[this._curTabIndex];
        if(oldType != target.tag){
            var _oldBtn = this._gameBtnList.getChildByTag(oldType);
            if (_oldBtn){
                _oldBtn.touchEnabled = true;
                _oldBtn.bright = true;
                if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                    _oldBtn.setTitleColor(unSelectColor);
                }

                if (_oldBtn.normalText && _oldBtn.selectText) {
                    _oldBtn.normalText.setVisible(true);
                    _oldBtn.selectText.setVisible(false);
                }
            }
            var oldRoomNode = this._back.getChildByTag(oldType);
            if (oldRoomNode){
                oldRoomNode.visible = false;
            }
        }
        target.touchEnabled = false;
        target.bright = false;
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            target.setTitleColor(selectColor);
        }

        if (target.normalText && target.selectText) {
            target.normalText.setVisible(false);
            target.selectText.setVisible(true);
        }

        var newRoomNode = this._back.getChildByTag(target.tag);
        if (newRoomNode){
            newRoomNode.visible = true;
        }else{
            newRoomNode = this.initCreateRoomNode(target.tag, this._data);
            if (newRoomNode){
                newRoomNode.setTag(target.tag);
                newRoomNode.setName("room");
                newRoomNode.setPosition(320, 63);
                if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                    newRoomNode.setPosition(386, 110);
                }
                if (this.isUseUIV3)
                    newRoomNode.setPosition(550, 30);
                this._back.addChild(newRoomNode);
            }else{
                cc.log("error CreateView.clickButton: initCreateRoomNode fail, gameType=", target.tag);
            }
        }
        this._lastGameType[this._curTabIndex] = target.tag;
    },
    initCreateRoomNode:function(gameType,datas)
    {
        var node = null;
        var data = MjClient.deepClone(datas);
        data.gameType = gameType;
        switch (gameType)
        {
            case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
                node = new CreateRoomNode_PaoDeKuai11(this,data);
                break;
            case MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI:
                node = new CreateRoomNode_baoPaiYZ(this,data);
                break;
            case MjClient.GAME_TYPE.LIAN_YUN_GANG:
                node = new CreateRoomNode_LYG(this,data);
                break;
            case MjClient.GAME_TYPE.SHU_YANG:
                node = new CreateRoomNode_shuyang(this,data);
                break;
            case MjClient.GAME_TYPE.GUAN_YUN:
                node = new CreateRoomNode_guanyun(this,data);
                break;
            case MjClient.GAME_TYPE.GUAN_NAN:
                node = new CreateRoomNode_guannan(this,data);
                break;
            case MjClient.GAME_TYPE.DONG_HAI:
                node = new CreateRoomNode_donghai(this,data);
                break;
            case MjClient.GAME_TYPE.NAN_JING:
                node = new CreateRoomNode_nanjing(this,data);
                break;
            case MjClient.GAME_TYPE.SU_QIAN:
                node = new CreateRoomNode_suqian(this,data);
                break;
            //牛牛
            case MjClient.GAME_TYPE.NIU_NIU:
                node = new CreateRoomNode_niuniu(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_AN:
                node = new CreateRoomNode_huaian(this,data);
                break;
            case MjClient.GAME_TYPE.HA_HONGZHONG:
                node = new CreateRoomNode_HAHZ(this,data);
                break;
            case MjClient.GAME_TYPE.HA_14DUN:
                node = new CreateRoomNode_HA14D(this,data);
                break;
            case MjClient.GAME_TYPE.HZMJ:
                node = new CreateRoomNode_HZMJ(this,data);
                break;
            case MjClient.GAME_TYPE.NTHZ:
                node = new CreateRoomNode_NTHZ(this,data);
                break;
            case MjClient.GAME_TYPE.LEI_YANG_GMJ:
                if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    node = new CreateRoomNode_hyLeiyangGMJ(this,data);
                }else{
                    node = new CreateRoomNode_leiyangGMJ(this,data);
                }
                break;
            case MjClient.GAME_TYPE.XU_ZHOU:
                node = new CreateRoomNode_xuzhou(this,data);
                break;
            case MjClient.GAME_TYPE.ZP_LY_CHZ:
                if(isYongZhouProject()){
                    node = new CreateRoomNode_zplychz(this,data);
                }else{
                    node = new CreateRoomNode_zplychz_lyg(this,data);
                }
                break;
            case MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN:
                node = new CreateRoomNode_tuantuanzhuan(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_DE_KUAI:
                node = new CreateRoomNode_paodekuai(this,data);
                break;
            case MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG:
                node = new CreateRoomNode_wangdiaoMJ(this,data);
                break;
            case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                node = new CreateRoomNode_PaoDeKuaiYZTY(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_HU_ZI_ER:
                node = new CreateRoomNode_paohuzi_new(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_HU_ZI:
                node = new CreateRoomNode_paohuzi_new(this,data);
                break;
            case MjClient.GAME_TYPE.SI_YANG:
                node = new CreateRoomNode_siyang(this,data);
                break;
            case MjClient.GAME_TYPE.XIN_SI_YANG:
                node = new CreateRoomNode_siyang_new(this,data);
                break;
            case MjClient.GAME_TYPE.SI_YANG_HH:
                node = new CreateRoomNode_siyanghh(this,data);
                break;
            case MjClient.GAME_TYPE.YAN_CHENG_HH:
                node = new CreateRoomNode_yanchenghh(this,data);
                break;
            case MjClient.GAME_TYPE.RU_GAO:
                node = new CreateRoomNode_rugao(this,data);
                break;
            case MjClient.GAME_TYPE.GAN_YU:
                node = new CreateRoomNode_ganyu(this,data);
                break;
            case MjClient.GAME_TYPE.HUAIAN_TTZ:
                node = new CreateRoomNode_huaianTTZ(this,data);
                break;
            case MjClient.GAME_TYPE.RU_GAO_MJH:
                node = new CreateRoomNode_rugao_MJH(this,data);
                break;
            case MjClient.GAME_TYPE.HUAIAN_CC:
                node = new CreateRoomNode_huaianCC(this,data);
                break;
            case MjClient.GAME_TYPE.LUO_DI_SAO:
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    node = new CreateRoomNode_syliuhusao(this, data);
                }else{
                    node = new CreateRoomNode_liuhusao(this,data);
                }
                break;
            case MjClient.GAME_TYPE.PAO_HU_ZI_SR:
                node = new CreateRoomNode_paohuzi_new(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI:
                node = new CreateRoomNode_xxGaoHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI:
                node = new CreateRoomNode_xiangxiangPHZ(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI:
                node = new CreateRoomNode_xiangtanPHZ(this,data);
                break;
            case MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA:
                node = new CreateRoomNode_SYloudifpf(this,data);
                break;
            case MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA:
                node = new CreateRoomNode_HYFangPaoFa(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN:
                node = new CreateRoomNode_hhHongGuaiWan(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_NT:
                node = new CreateRoomNode_doudizhu(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_HU_ZI_King:
                node = new CreateRoomNode_paohuzi_new(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_HU_ZI_SR_King:
                node = new CreateRoomNode_paohuzi_new(this,data);
                break;
            case MjClient.GAME_TYPE.PAO_HU_ZI_LR_King:
                node = new CreateRoomNode_paohuzi_new(this,data);
                break;
            case MjClient.GAME_TYPE.WU_XUE_GE_BAN:
                node = new CreateRoomNode_wuXueGeBan(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_TY:
                node = new CreateRoomNode_doudizhuTY(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY:
                node = new CreateRoomNode_doudizhuHBTY(this,data);
                break;
            case MjClient.GAME_TYPE.DOU_DI_ZHU_QC:
                node = new CreateRoomNode_doudizhuQC(this,data);
                break;
            case MjClient.GAME_TYPE.TY_HONGZHONG:
                node = new CreateRoomNode_TYHZ(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG:
                node = new CreateRoomNode_XXHZ(this, data);
                break;
            case MjClient.GAME_TYPE.HY_LIU_HU_QIANG:
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ){
                    node = new CreateRoomNode_LiuHuQiang(this,data);
                }else if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                    node = new CreateRoomNode_BDHYLiuHuQiang(this,data);
                }else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    node = new CreateRoomNode_syLiuHuQiang(this,data);
                }
                else{
                    node = new CreateRoomNode_HYLiuHuQiang(this,data);
                }
                break;
            case MjClient.GAME_TYPE.HY_SHI_HU_KA:
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ){
                    node = new CreateRoomNode_ShiHuKa(this,data);
                }else if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                    node = new CreateRoomNode_BDHYShiHuKa(this,data);
                }else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    node = new CreateRoomNode_syShiHuKa(this,data);
                }
                else{
                    node = new CreateRoomNode_HYShiHuKa(this,data);
                }
                break;
            case MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI:
                if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    node = new CreateRoomNode_syShiWuHu(this,data);
                }
                else{
                    node = new CreateRoomNode_HYShiWuHu(this,data);
                }
                break;
            case MjClient.GAME_TYPE.YONG_ZHOU_MJ:
                node = new CreateRoomNode_yongZhouGMJ(this,data);
                break;
            case MjClient.GAME_TYPE.JIANG_HUA_MJ:
                node = new CreateRoomNode_jianghuaMJ(this,data);
                break;
            case MjClient.GAME_TYPE.JIANG_YONG_15Z:
                node = new CreateRoomNode_jyShiWuZhang(this,data);
                break;
            case MjClient.GAME_TYPE.TY_ZHUANZHUAN:
                node = new CreateRoomNode_TYZZ(this,data);
                break;
            case MjClient.GAME_TYPE.DAO_ZHOU_MJ:
                node = new CreateRoomNode_daozhouMJ(this,data);
                break;
            case MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG:
                node = new CreateRoomNode_DaTongZi(this,data);
                break;
            case MjClient.GAME_TYPE.SHAO_YANG_BO_PI:
                node = new CreateRoomNode_syBoPi(this,data);
                break;
            case MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI:
                node = new CreateRoomNode_syZiPai(this,data);
                break;
            case MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG:
                node = new CreateRoomNode_SYMJ(this,data);
                break;
            case MjClient.GAME_TYPE.CHANG_SHA:
                data.isErRen = false;
                node = new CreateRoomNode_changSha(this, data);
                break;
            case MjClient.GAME_TYPE.CHANG_SHA_ER_REN:
                data.isErRen = true;
                node = new CreateRoomNode_changSha(this, data);
                break;
            case MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI:
                node = new CreateRoomNode_yuanLingPaoHuZi(this, data);
                break;
            case MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA:
                node = new CreateRoomNode_hengyangChangSha(this,data);
                break;
            case MjClient.GAME_TYPE.XIN_NING_MA_JIANG:
                node = new CreateRoomNode_XNMJ(this,data);
                break;
            case MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN:
                node = new CreateRoomNode_BaZhaDan(this,data);
                break;
            case MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO:
                node = new CreateRoomNode_yongZhouLaoChuo(this,data);
                break;
            case MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI:
                if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    node = new CreateRoomNode_syERenPaoHuZi(this,data);
                }
                else{
                    node = new CreateRoomNode_BDHYERenPaoHuZi(this, data);
                }
                break;
            case MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI:
                node = new CreateRoomNode_ahPaoHuZi(this,data);
                break;
            case MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA:
                node = new CreateRoomNode_BanBianTianZha(this,data);
                break;
            case MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO:
                node = new CreateRoomNode_LSJShiHuDao(this,data);
                break;
            case MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA:
                node = new CreateRoomNode_sanDaHaHengYang(this,data);
                break;
            case MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA:
                node = new CreateRoomNode_sanDaHaShaoYang(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA:
                node = new CreateRoomNode_sanDaHaXiangXiang(this,data);
                break;
            case MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG:
                node = new CreateRoomNode_huaihuaMaJiang(this,data);
                break;
            case MjClient.GAME_TYPE.AN_HUA_MA_JIANG:
                node = new CreateRoomNode_anhuaMaJiang(this,data);
                break;
            case MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA:
                node = new CreateRoomNode_loudifpf(this,data);
                break;
            case MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA:
                node = new CreateRoomNode_sanDaHaXiangTan(this,data);
                break;
            case MjClient.GAME_TYPE.SAN_DA_HA_NEW:
                node = new CreateRoomNode_sanDaHaNew(this,data);
                break;
            case MjClient.GAME_TYPE.YUE_YANG_PENG_HU:
                node = new CreateRoomNode_yueYangPengHu(this,data);
                break;
            case MjClient.GAME_TYPE.XU_PU_LAO_PAI:
                node = new CreateRoomNode_xuPuLaoPai(this,data);
                break;
            case MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI:
                node = new CreateRoomNode_xuPuPaoHuZi(this, data);
                break;
            case MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ:
                node = new CreateRoomNode_erRenYiFang(this, data);
                break;
            case MjClient.GAME_TYPE.DA_ZI_BO_PI:
                node = new CreateRoomNode_DaZiBoPi(this,data);
                break;
            case MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG:
                    node = new createRoomNode_JingZhouMaJiang(this, data);
                    break;
            default:
                break;
        }
        return node;
    },
    loadItemTexture:function(item, index)
    {
        if (this.isUseUIV3) {
            item.normalText = item.getChildByName("normalText");
            item.selectText = item.getChildByName("selectText");
            item.normalText.ignoreContentAdaptWithSize(true);
            item.selectText.ignoreContentAdaptWithSize(true);
            item.normalText.setString(GameCnName[index]);
            item.selectText.setString(GameCnName[index]);
        }
        else {
            var textureNormal,texturePress;
            var preStr = GameButton[index];
            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                preStr = "ui/createRoom/game"
                item.setTitleText(GameCnName[index]);
                item.setTitleColor(cc.color("#ffffff"));
            }
            textureNormal = preStr + "_n.png";
            texturePress = preStr + "_s.png";
            cc.log("loadItemTexture:", jsb.fileUtils.fullPathForFilename(texturePress));
            item.loadTextures(textureNormal,texturePress,texturePress);
        }
    },
    refreshGameListUI:function(){
        this._gameBtnList.removeAllChildren();
        // 把所有右侧room隐藏
        var childrens = this._back.getChildren();
        for (var i = 0; i < childrens.length; i ++)
        {
            if (childrens[i].getName() != "room")
                continue;

            childrens[i].visible = false;
        }

        // 创建左侧list
        var gameItem = this._gameBtnList.getParent().getChildByName("item");
        var gameList = this._gameTypeList[this._curTabIndex];
        var lastGameType = this._lastGameType[this._curTabIndex];
        for (var i = 0; i < gameList.length; i++){
            var gameType = gameList[i];
            if(this._mergeArr.indexOf(gameType) >= 0){
                continue;
            }
            var newBtn = gameItem.clone();
            this.loadItemTexture(newBtn, gameType);
            this.addHotImage(newBtn, gameType);
            newBtn.setTag(gameType);//根据类型设置item tag
            var that = this;
            newBtn.addClickEventListener(function(target) {that.clickButton(target);});
            this._gameBtnList.pushBackCustomItem(newBtn);
        }
        cc.log("gameList:" + JSON.stringify(gameList));
        if (gameList.indexOf(lastGameType) < 0 && gameList.length > 0)
            lastGameType = gameList[0];
        var selectGameBtn = this._gameBtnList.getChildByTag(lastGameType);
        var newType = lastGameType;
        if(this._mergeArr.indexOf(lastGameType) >= 0){
            newType = MjClient.GAME_TYPE.PAO_HU_ZI;
            selectGameBtn = this._gameBtnList.getChildByTag(newType);
            selectGameBtn.setTag(lastGameType);
        }
        if (gameList.indexOf(newType) > 5){
            this._gameBtnList.jumpToBottom();
        }
        this.clickButton(selectGameBtn);
    },
    ctor: function (data) {
        this._super();
        this._data = data;
        this._isFriendCard = data.IsFriendCard;
        this._mergeArr = [MjClient.GAME_TYPE.PAO_HU_ZI_SR, MjClient.GAME_TYPE.PAO_HU_ZI_King,
                MjClient.GAME_TYPE.PAO_HU_ZI_SR_King ,MjClient.GAME_TYPE.PAO_HU_ZI_ER, MjClient.GAME_TYPE.PAO_HU_ZI_LR_King];
        //细分游戏类型时要显示标题
        var isShowTitleCreate = data.isShowTitleCreate;

        if (this._isFriendCard && MjClient.RuleParam && MjClient.RuleParam["rule" + this._data.ruleNumer] && MjClient.RuleParam["rule" + this._data.ruleNumer] != "delete")
            this._data.clubRule = MjClient.RuleParam["rule" + this._data.ruleNumer];

        //细分游戏类型
        var typeList = data.typeList;
        MjClient.createui = this;
        var type_arr = ["ziPai","maJiang","puKe"];
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP){
            type_arr = ["zipai","majiang","puKe"]; //大小写害死人。。。
        }
        this._gameTypeList = getAllGameListArray()._gameTypeList;
        cc.log("_gameTypeList11111111111:", JSON.stringify(this._gameTypeList));
        var lastGameType = util.localStorageEncrypt.getNumberItem("KEY_GAME_TYPE", -1);
        if (this._data && this._data.clubRule)
            lastGameType = this._data.clubRule.gameType;

        for(var i = 0;i < this._gameTypeList.length;i++)
        {
            this._lastGameType[i] = this._gameTypeList[i][0];
            if (this._gameTypeList[i].indexOf(lastGameType) != -1)
            {
                this._lastGameType[i] = lastGameType;
            }
        }

        this._curTabIndex = util.localStorageEncrypt.getNumberItem("KEY_GAME_LIST",0);
        if(this._curTabIndex >= type_arr.length){
            this._curTabIndex = 0;
        }
        if (this._data && this._data.clubRule) {
            for (var i = this._gameTypeList.length - 1; i >= 0; i --) {
                if (this._gameTypeList[i].indexOf(lastGameType) != -1) {
                    this._curTabIndex = i;
                    break;
                }
            }
        }

        this.isUseUIV3 = MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3();
        if (this.isUseUIV3)
            var jsonui = ccs.load("createHomeTotal_3.0.json");
        else
            var jsonui = ccs.load(res.Create_json);
        this.addChild(jsonui.node);

        if (MjClient.createRoomLayer) {
            MjClient.createRoomLayer.setVisible(false);
        }

        var _block = jsonui.node.getChildByName("block");
        setWgtLayout(_block,[1, 1],[0.5,0.5],[0,0],2);

        this._back = jsonui.node.getChildByName("back");
        setWgtLayout(this._back,[1, 1], [0.5, 0.5], [0, 0]);

        //穗子动画 (邵阳有)
        var _suizi = this._back.getChildByName("suizi");
        if(_suizi)
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(this._back);

        var titleImg = this._back.getChildByName("titleCreate");
        var titleImg_2 = this._back.getChildByName("titleCreate_2");

        var switchTab = null;
        var node_friendCard = this._back.getChildByName("node_friendCard");
        if (this._gameTypeList[0].length == 0 || this._gameTypeList[1].length == 0 || !node_friendCard)
        {
            if (node_friendCard)
                node_friendCard.visible = false;

            if (titleImg)
                titleImg.visible = !this._isFriendCard;

            if (titleImg_2)
                titleImg_2.visible = this._isFriendCard;
        }
        else if (node_friendCard)
        {
            node_friendCard.visible = true;
            if (titleImg)
                titleImg.visible = false;
            if (titleImg_2)
                titleImg_2.visible = false;

            var that = this;
            var children = node_friendCard.children;
            var _path = "createNewPng/gameTypeBtn/";
            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                _path = "ui/createRoom/";
            }
            var switchTab = function(tabIndex)
            {
                if (that.isUseUIV3) {
                    for(var i = 0;i < children.length;i++){
                        var childBtn = children[i];
                        childBtn.setEnabled(tabIndex != i);
                        childBtn.getChildByName("normalImg").setVisible(tabIndex != i);
                        childBtn.getChildByName("selectImg").setVisible(tabIndex == i);
                    }
                }
                else {
                    for(var i = 0;i < children.length;i++){
                        var childBtn = children[i];
                        if(i == tabIndex){
                            childBtn.touchEnabled = false;
                            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                                childBtn.loadTextureNormal(_path + "type_s.png");
                                childBtn.loadTexturePressed(_path + "type_s.png");
                                childBtn.getChildByName("img_text").loadTexture(_path + type_arr[i] + "_s" + ".png");
                            } else {
                                childBtn.loadTextureNormal(_path + type_arr[i] + "_s" + ".png");
                                childBtn.loadTexturePressed(_path + type_arr[i] + "_s" + ".png");
                            }
                        }else{
                            childBtn.touchEnabled = true;
                            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                                childBtn.loadTextureNormal(_path + "type_n.png");
                                childBtn.loadTexturePressed(_path + "type_s.png");
                                childBtn.getChildByName("img_text").loadTexture(_path + type_arr[i] + "_n" + ".png");
                            } else {
                                childBtn.loadTextureNormal(_path + type_arr[i] + "_n" + ".png");
                                childBtn.loadTexturePressed(_path + type_arr[i] + "_s" + ".png");
                            }
                        }
                    }
                }

                that._curTabIndex = tabIndex;
                util.localStorageEncrypt.setNumberItem("KEY_GAME_LIST",tabIndex);
                if(isShowTitleCreate){
                    //特殊判断，在细分的创建界面
                    that._curTabIndex = 0;
                }
                that.refreshGameListUI();
            };

            for(var i = 0;i < children.length;i++){
                var childBtn = children[i];
                childBtn.setTag(i);
                if(i == this._curTabIndex){
                    if (that.isUseUIV3) {
                        childBtn.setEnabled(false);
                        childBtn.getChildByName("normalImg").setVisible(false);
                        childBtn.getChildByName("selectImg").setVisible(true);
                    } else {
                        childBtn.touchEnabled = false;
                        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                            childBtn.loadTextureNormal(_path + "type_s.png");
                            childBtn.loadTexturePressed(_path + "type_s.png");
                            childBtn.getChildByName("img_text").loadTexture(_path + type_arr[i] + "_s" + ".png");
                        } else {


                            childBtn.loadTextureNormal(_path + type_arr[i] + "_s" + ".png");
                            childBtn.loadTexturePressed(_path + type_arr[i] + "_s" + ".png");
                        }
                    }
                }
                childBtn.addTouchEventListener(function(sender, Type) {
                    switch (Type) {
                        case ccui.Widget.TOUCH_ENDED:
                            switchTab(sender.tag);
                            break;
                        default:
                            break;
                    }
                }, this);
            }
        }
        //细分的创建房间界面
        if(isShowTitleCreate){
            if (titleImg){
                titleImg.visible = true;
            }
            if (titleImg_2){
                titleImg_2.visible = false;
            }
            if(node_friendCard){
                node_friendCard.visible = false;
            }
            if(typeList){
                this._gameTypeList[0] = typeList;
                this._gameTypeList[1] = [];
            }
        }
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            if (titleImg)
                titleImg.visible = !this._isFriendCard;

            if (titleImg_2)
                titleImg_2.visible = this._isFriendCard;
        }

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
            if (this.isUseUIV3)
                this.refreshAreaSelect_v3();
            else
                this.refreshAreaSelect();

            UIEventBind(null, this, "selectArea", function() {
                if (this.isUseUIV3)
                    this.refreshAreaSelect_v3();
                else
                    this.refreshAreaSelect();
                if (switchTab)
                    switchTab(this._curTabIndex);
                else
                    this.refreshGameListUI();
            });
        }

        //关闭按钮
        var btnGoHome = this._back.getChildByName("goHome");
        btnGoHome.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (MjClient.createRoomLayer) {
                        MjClient.createRoomLayer.setVisible(true);
                    }
                    postEvent("createRoomPanel_Close");
                    this.removeFromParent();
                    break;
                default:
                    break;
            }
        }, this);
        //游戏列表
        this._gameBtnList = this._back.getChildByName("gameList");
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._gameBtnList.setScrollBarEnabled(false);
        }
        if (switchTab)
            switchTab(this._curTabIndex);
        else
            this.refreshGameListUI();

        return true;
    },
    onExit:function()
    {
        this._super();
        MjClient.createui = null;
    },
});

var refreshAreaSelect = function() {
    var area = this._back.getChildByName("area");
    if (!area)
        return;

    var curAreaName = util.localStorageEncrypt.getStringItem("KEY_selectArea", "");
    var areaCnName = "";
    if (isJinZhongAPPType()) {
        var all = getAllGameListArray();

        var node_friendCard = this.node_friendCard;


        for (var i = 1; i < all._btnPosArray.length; i++) {
            var btn = node_friendCard.getChildByName("btn_" + i);
            if (!btn || i >= all._btnPicArray.length)
                continue;

            if (curAreaName != "") {
                if (curAreaName == all._btnPicArray[i]) {
                    btn.visible = true;
                    btn.retain();
                    node_friendCard.removeChild(btn, false);
                    node_friendCard.insertCustomItem(btn, 1);
                    btn.release();
                    areaCnName = all._btnNameArray[i];
                    if (this._curTabIndex != 0)
                        this._curTabIndex = i;
                } else {
                    btn.visible = false;
                }
            } else {
                btn.visible = true;
                btn.retain();
                node_friendCard.removeChild(btn, false);
                node_friendCard.insertCustomItem(btn, i);
                btn.release();
            }
        }
    } else {

        //不需要选择地区 by sking
        // var node_friendCard = this.node_friendCard;
        // node_friendCard.visible = false;
        // area.visible = false;

        initSelectAreaData();
        var curAreaName = util.localStorageEncrypt.getStringItem("KEY_selectArea", "");
        var curAreaGameList = null;
        var curAreaData = getSelectAreaData(curAreaName);
        if (curAreaData) {
            curAreaGameList = curAreaData.gameTypes;
            areaCnName = curAreaData[curAreaName];
        }

        if (!this._allAreaGameTypeList)
            this._allAreaGameTypeList = this._gameTypeList;
        this._gameTypeList = [];

        if (curAreaGameList) {
            for (var i = 0; i < curAreaGameList.length; i++) {
                for (var j = 0; j < this._allAreaGameTypeList.length; j++) {
                    if (!this._gameTypeList[j])
                        this._gameTypeList[j] = [];

                    if (this._allAreaGameTypeList[j].indexOf(curAreaGameList[i]) >= 0)
                        this._gameTypeList[j].push(curAreaGameList[i]);
                }
            }
        } else {
            for (var j = 0; j < this._allAreaGameTypeList.length; j++) {
                if (!this._gameTypeList[j])
                    this._gameTypeList[j] = [];

                this._gameTypeList[j] = this._allAreaGameTypeList[j].slice();
            }
        }

        cc.log("curAreaGameList=" + JSON.stringify(curAreaGameList));
        cc.log("_allAreaGameTypeList=" + JSON.stringify(this._allAreaGameTypeList));
        cc.log("_gameTypeList=" + JSON.stringify(this._gameTypeList));
    }

    var tagBtn = area.getChildByName("tagBtn");
    var selectBtn = area.getChildByName("selectBtn");
    selectBtn.addTouchEventListener(function(sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED)
            return;

        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Xuanzediqu", {
            uid: SelfUid()
        });
        MjClient.Scene.addChild(new SelectAreaLayer(""));
    });

    var areaNameLabel = area.getChildByName("areaNameLabel");
    var switchBtn = area.getChildByName("switchBtn");
    switchBtn.addTouchEventListener(function(sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED)
            return;

        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Xuanzediqu", {
            uid: SelfUid()
        });
        MjClient.Scene.addChild(new SelectAreaLayer(curAreaName));
    });

    areaNameLabel.ignoreContentAdaptWithSize(true);
    if (areaCnName == "") {
        areaNameLabel.setVisible(false);
        switchBtn.setVisible(false);
        tagBtn.setVisible(true);
        selectBtn.setVisible(true);
    } else {
        areaNameLabel.setString(areaCnName);
        areaNameLabel.setVisible(true);
        switchBtn.setVisible(true);
        tagBtn.setVisible(false);
        selectBtn.setVisible(false);
    }
}

// 岳阳APP UI 3.0
var refreshAreaSelect_v3 = function() {
    var switchAreaBtn = this._back.getChildByName("switchAreaBtn");
    if (!switchAreaBtn)
        return;

    var curAreaName = util.localStorageEncrypt.getStringItem("KEY_selectArea", "");
    var areaCnName = "";
   
    initSelectAreaData();
    var curAreaName = util.localStorageEncrypt.getStringItem("KEY_selectArea", "");
    var curAreaGameList = null;
    var curAreaData = getSelectAreaData(curAreaName);
    if (curAreaData) {
        curAreaGameList = curAreaData.gameTypes;
        areaCnName = curAreaData[curAreaName];
    }

    if (!this._allAreaGameTypeList)
        this._allAreaGameTypeList = this._gameTypeList;
    this._gameTypeList = [];

    if (curAreaGameList) {
        for (var i = 0; i < curAreaGameList.length; i++) {
            for (var j = 0; j < this._allAreaGameTypeList.length; j++) {
                if (!this._gameTypeList[j])
                    this._gameTypeList[j] = [];

                if (this._allAreaGameTypeList[j].indexOf(curAreaGameList[i]) >= 0)
                    this._gameTypeList[j].push(curAreaGameList[i]);
            }
        }
    } else {
        for (var j = 0; j < this._allAreaGameTypeList.length; j++) {
            if (!this._gameTypeList[j])
                this._gameTypeList[j] = [];

            this._gameTypeList[j] = this._allAreaGameTypeList[j].slice();
        }
    }

    cc.log("curAreaGameList=" + JSON.stringify(curAreaGameList));
    cc.log("_allAreaGameTypeList=" + JSON.stringify(this._allAreaGameTypeList));
    cc.log("_gameTypeList=" + JSON.stringify(this._gameTypeList));

    switchAreaBtn.addTouchEventListener(function(sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED)
            return;

        MjClient.Scene.addChild(new SelectAreaLayer(curAreaName));
    });

    var areaNameLabel = switchAreaBtn.getChildByName("areaNameLabel");

    areaNameLabel.ignoreContentAdaptWithSize(true);
    areaNameLabel.setString(areaCnName == "" ? "未选择" : areaCnName);
}

CreateView2.prototype.refreshAreaSelect = refreshAreaSelect;
CreateViewNew.prototype.refreshAreaSelect = refreshAreaSelect;

CreateView2.prototype.refreshAreaSelect_v3 = refreshAreaSelect_v3;
CreateViewNew.prototype.refreshAreaSelect_v3 = refreshAreaSelect_v3;